import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Send,
  HelpCircle,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  CreditCard
} from 'lucide-react';
import { getStoredCourses } from '../utils/adminStorage';

export default function AdmissionsSection() {
  const courses = getStoredCourses();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.title || 'Auxiliar Administrativo');
  const [modality, setModality] = useState('Virtual');
  const [wantsScholarship, setWantsScholarship] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitPreRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Por favor completa tu nombre y número de WhatsApp');
      return;
    }

    const waNumber = '573169008561';
    const msg = `*SOLICITUD DE PRE-INSCRIPCIÓN - FUNDACIÓN ULEP*\n\n` +
      `👤 *Aspirante:* ${fullName}\n` +
      `📱 *WhatsApp:* ${phone}\n` +
      `📍 *Ciudad:* ${city || 'Colombia'}\n` +
      `🎓 *Programa:* ${selectedCourse}\n` +
      `💻 *Modalidad:* ${modality}\n` +
      `⭐ *Aplica a Beca ULEP:* ${wantsScholarship ? 'SÍ, solicito subsidio/beca' : 'No'}\n\n` +
      `_Deseo recibir la información oficial para legalizar mi cupo e iniciar clases._`;

    setIsSubmitted(true);
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const steps = [
    {
      num: '01',
      title: 'Elige tu Programa',
      desc: 'Selecciona el curso corto o técnico laboral de tu interés según tus metas laborales.',
    },
    {
      num: '02',
      title: 'Pre-inscripción en Línea',
      desc: 'Completa el formulario breve con tus datos de contacto sin costo de inscripción.',
    },
    {
      num: '03',
      title: 'Asignación de Beca o Cuotas',
      desc: 'Nuestro equipo de bienestar te asigna el subsidio o define tu plan de cuotas sin bancos.',
    },
    {
      num: '04',
      title: 'Legalización e Inicio',
      desc: 'Recibes tus accesos al Campus Virtual o indicaciones para clases presenciales y comienzas tu formación.',
    },
  ];

  const requirements = [
    'Documento de identidad legible (Cédula de Ciudadanía, Tarjeta de Identidad o Cédula de Extranjería).',
    'Certificado de escolaridad básica o acta de grado de bachiller (según el programa requerido).',
    'Disponibilidad horaria para la modalidad elegida (Virtual o Presencial).',
    'Dispositivo con acceso a internet (celular, tablet o computador) para programas virtuales.',
  ];

  const faqs = [
    {
      q: '¿El formulario de inscripción tiene algún costo?',
      a: 'No. El proceso de pre-inscripción y postulación a becas en la Fundación ULEP es 100% gratuito.',
    },
    {
      q: '¿Revisan centrales de riesgo para financiar mi matrícula?',
      a: 'No. La Fundación ULEP maneja financiación directa solidaria sin intermediarios bancarios ni reportes en Datacrédito.',
    },
    {
      q: '¿Cuándo inician las clases?',
      a: 'Tenemos convocatorias con aperturas mensuales y semestrales continuas, tanto en modalidad virtual como presencial.',
    },
    {
      q: '¿Cómo recibo mi certificación al culminar?',
      a: 'Recibirás tu certificación oficial verificable por competencias respaldada por la Fundación ULEP y GRUPO ULEP.',
    },
  ];

  return (
    <section id="inscripciones" className="py-12 sm:py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0035ab] block">
            Admisiones y Matrículas 2026
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Inscripciones Abiertas: Asegura tu Cupo Hoy
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            El proceso de ingreso es ágil, transparente y sin trámites bancarios complejos. Sigue los pasos y postula a tu beca o plan de cuotas directas.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-2xl font-black font-display text-[#0035ab]">
                  {st.num}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 font-display">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Paso indispensable</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Interactive Enrollment Section: Requirements on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Requirements & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#0035ab] block">
                  Requisitos de Ingreso
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                  ¿Qué necesitas para matricularte?
                </h3>
              </div>

              <ul className="space-y-3 pt-1">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0035ab] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-extrabold text-slate-900 block">
                  Beneficios al Inscribirte:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cuotas sin bancos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Horarios flexibles</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Beca directa</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Certificado ULEP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                  ¿Prefieres atención telefónica?
                </h4>
                <p className="text-[11px] text-slate-600">
                  Nuestra línea de admisiones te guía en tiempo real.
                </p>
              </div>
              <a
                href="https://wa.me/573169008561?text=Hola%20Fundación%20ULEP,%20quisiera%20asesoría%20para%20inscribirme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0035ab] hover:bg-[#002477] text-white text-xs font-bold rounded-xl shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contactar</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pre-registration Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5 space-y-6">
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">
                Formulario Oficial
              </span>
              <h3 className="text-2xl font-black font-display text-slate-900">
                Pre-inscripción Rápida 2026
              </h3>
              <p className="text-xs text-slate-600">
                Diligencia tus datos para apartar tu cupo y solicitar tu descuento de beca institucional.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-slate-900 font-display">
                  ¡Pre-inscripción enviada con éxito!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Se ha abierto la conversación con el equipo de admisiones en WhatsApp para confirmar tus datos y legalizar tu cupo.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitPreRegistration} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Carlos Andrés Gómez"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Número de WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 316 000 0000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ciudad o Municipio
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej. Bogotá, Medellín, Cali, etc."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Modalidad Preferida
                    </label>
                    <select
                      value={modality}
                      onChange={(e) => setModality(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                    >
                      <option value="Virtual">100% Virtual (Campus 24/7)</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Semipresencial">Semipresencial (Sábados)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Programa de Interés
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.type === 'tecnico' ? '[Técnico]' : '[Curso]'} {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="becaCheck"
                    checked={wantsScholarship}
                    onChange={(e) => setWantsScholarship(e.target.checked)}
                    className="w-4 h-4 text-[#0035ab] rounded border-slate-300 focus:ring-[#0035ab] cursor-pointer"
                  />
                  <label htmlFor="becaCheck" className="text-xs font-bold text-amber-950 cursor-pointer select-none">
                    Deseo postularme al subsidio de Beca ULEP y plan de pago en cuotas fijas sin bancos.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#0035ab]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Enviar Pre-inscripción por WhatsApp</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-[#0035ab]" />
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
              Preguntas Frecuentes sobre el Proceso de Admisión
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {f.q}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
