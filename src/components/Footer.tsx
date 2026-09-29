import React, { useState } from 'react';
import { X, GraduationCap, Lock, HeartHandshake } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab?: (tab: TabType) => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onSelectTab, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLegalClick = (e: React.MouseEvent, docName: string) => {
    e.preventDefault();
    setActiveModal(docName);
  };

  const handleTabClick = (e: React.MouseEvent, tab: TabType) => {
    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid: 1 col Phone, 2 cols Tablet, 12 cols Desktop PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 pb-10 sm:pb-12 border-b border-slate-100">
          
          {/* Brand Col - 5 Cols Desktop, full width Phone */}
          <div className="sm:col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0035ab] text-white flex items-center justify-center font-bold shadow-md shadow-[#0035ab]/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Fundación <span className="text-[#0035ab]">ULEP</span>
                </span>
                <span className="block text-[8px] sm:text-[9px] text-[#0035ab] font-bold tracking-widest uppercase">
                  GRUPO ULEP
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Institución de Educación para el Trabajo y el Desarrollo Humano. Formación por competencias en Cursos Cortos y Programas Técnicos Laborales con respaldo institucional.
            </p>
          </div>

          {/* Links - 3 Cols Desktop, 1 Col Phone/Tablet */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0035ab]">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-bold">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleTabClick(e, 'inicio')}
                  className="hover:text-[#0035ab] transition-colors cursor-pointer py-1 inline-block"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#programas"
                  onClick={(e) => handleTabClick(e, 'programas')}
                  className="hover:text-[#0035ab] transition-colors cursor-pointer py-1 inline-block"
                >
                  Cursos y Técnicos
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  onClick={(e) => handleTabClick(e, 'beneficios')}
                  className="hover:text-[#0035ab] transition-colors cursor-pointer py-1 inline-block"
                >
                  Beneficios y Becas
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => handleTabClick(e, 'nosotros')}
                  className="hover:text-[#0035ab] transition-colors cursor-pointer py-1 inline-block"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#inscripciones"
                  onClick={(e) => handleTabClick(e, 'inscripciones')}
                  className="hover:text-[#0035ab] transition-colors cursor-pointer py-1 inline-block"
                >
                  Inscripciones
                </a>
              </li>
              {/* Admin Button */}
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-[#0035ab] transition-colors py-1 cursor-pointer group"
                    title="Acceso exclusivo para administradores"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0035ab]" />
                    <span>Admin</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Col - 4 Cols Desktop, 1 Col Phone/Tablet */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0035ab]">
              Contacto y Modalidades
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p>
                <strong className="text-slate-800">WhatsApp Oficial:</strong> +57 316 900 8561
              </p>
              <p>
                <strong className="text-slate-800">Modalidades:</strong> Virtual, Presencial y Semipresencial
              </p>
              <p>
                <strong className="text-slate-800">Atención:</strong> Lunes a Sábado • 8:00 AM - 6:00 PM
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Fundación ULEP en convenio y respaldo con GROUP ULEP.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar: Stacked on Phone, Row on Tablet & PC */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {currentYear} Fundación ULEP. Todos los derechos reservados.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
            <a
              href="#terminos"
              onClick={(e) => handleLegalClick(e, 'terminos')}
              className="hover:text-[#0035ab] transition-colors cursor-pointer py-1"
            >
              Términos de Servicio
            </a>
            <a
              href="#privacidad"
              onClick={(e) => handleLegalClick(e, 'privacidad')}
              className="hover:text-[#0035ab] transition-colors cursor-pointer py-1"
            >
              Política de Privacidad
            </a>
            <a
              href="#habeas-data"
              onClick={(e) => handleLegalClick(e, 'habeas-data')}
              className="hover:text-[#0035ab] transition-colors cursor-pointer py-1"
            >
              Habeas Data
            </a>
          </div>
        </div>

      </div>

      {/* Legal Document Modal: Full width responsive for Mobile, Tablet, PC */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-black text-lg text-slate-900">
                {activeModal === 'terminos' && 'Términos y Condiciones Institucionales'}
                {activeModal === 'privacidad' && 'Política de Privacidad de Datos'}
                {activeModal === 'habeas-data' && 'Política de Habeas Data'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Cerrar ventana legal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Fundación ULEP</strong> opera conforme a la normatividad de Educación para el Trabajo y el Desarrollo Humano en Colombia.
              </p>
              <p>
                Toda la información académica, pre-inscripciones y consultas suministradas por los postulantes son tratadas con estricta confidencialidad y utilizadas exclusivamente para trámites educativos y de orientación vocacional.
              </p>
              <p>
                Para cualquier consulta referente a tus datos o solicitar rectificación, puedes comunicarte a nuestra línea oficial de atención institucional.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer min-h-[44px]"
              >
                Entendido y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
