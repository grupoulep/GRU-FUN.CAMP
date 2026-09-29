import React from 'react';
import { Building2, Award, Handshake, CheckCircle2 } from 'lucide-react';

export default function AgreementsSection() {
  const convenios = [
    {
      name: 'FUNDACIÓN ULEP',
      badge: 'Educación para el Trabajo',
      subtitle: 'Entidad de Formación Laboral y Desarrollo Humano',
      description: 'Diseño e impartición de Cursos y Técnicos Laborales orientados a la empleabilidad, competencias laborales reales e inclusión social en Colombia.',
      icon: Award,
    },
    {
      name: 'GRUPO ULEP',
      badge: 'Respaldo Institucional',
      subtitle: 'Infraestructura Tecnológica y Financiación',
      description: 'Garantía de calidad académica, soporte del Campus Virtual 24/7 y programas de financiación directa sin intermediación bancaria.',
      icon: Building2,
    },
  ];

  return (
    <section className="py-6 sm:py-8 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Header Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0035ab] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#0035ab] uppercase tracking-widest block">
                  Respaldo Institucional
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Alianza de Calidad y Compromiso Educativo
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Certificación Oficial Verificable</span>
            </div>
          </div>

          {/* Convenios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6">
            {convenios.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 transition-all hover:bg-white hover:border-[#0035ab]/30 hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[#0035ab] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 font-display tracking-tight">
                          {item.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-[#0035ab]">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
