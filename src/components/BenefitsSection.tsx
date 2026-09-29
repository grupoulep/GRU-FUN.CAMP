import React from 'react';
import {
  Award,
  Clock,
  GraduationCap,
  CheckCircle2,
  CreditCard,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import heroStudentsImg from '../assets/images/hero_students_ulep_1786064095670.jpg';
import shortCoursesImg from '../assets/images/short_courses_ulep_1786064117554.jpg';
import vocationalTrainingImg from '../assets/images/vocational_training_ulep_1786064108299.jpg';

interface BenefitsSectionProps {
  onCtaClick: () => void;
}

export default function BenefitsSection({ onCtaClick }: BenefitsSectionProps) {
  return (
    <section id="beneficios" className="py-10 sm:py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* SECTION HEADER - Big, Impactful & Elegant */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.15]">
            Beneficios Exclusivos y Becas{' '}
            <span className="text-[#0035ab] block sm:inline">
              Fundación ULEP
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Impulsamos tu crecimiento profesional con subsidios directos a tu matrícula, facilidades de pago en cuotas fijas sin bancos y horarios flexibles que se adaptan a tu vida.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* FILA 1: CUADRO A LA IZQUIERDA / IMAGEN A LA DERECHA */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5">
          {/* Cuadro Izquierda */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#0035ab] block">
                Financiamiento Directo & Subsidios
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
                Programa Institucional de Becas y Subsidios Educativos
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              En la <strong className="text-slate-900 font-bold">Fundación ULEP</strong> creemos que el dinero no debe ser un obstáculo para salir adelante. Ofrecemos becas de descuento directo en mensualidades y facilidades para que inicies tu formación técnica o curso corto inmediatamente, sin intermediación bancaria.
            </p>

            {/* Puntos Explicativos */}
            <div className="space-y-2.5 pt-1">
              <div className="border-l-3 border-[#0035ab] pl-3.5 py-0.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Beca de Apoyo Económico
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Subsidios institucionales directos aplicables a la mensualidad de tu programa.
                </p>
              </div>

              <div className="border-l-3 border-[#0035ab] pl-3.5 py-0.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  $0 Costo de Formulario de Inscripción
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Postúlate de forma gratuita y sin trámites complejos.
                </p>
              </div>

              <div className="border-l-3 border-[#0035ab] pl-3.5 py-0.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Sin Intermediarios Bancarios
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trato directo con la Fundación ULEP sin revisiones crediticias.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#0035ab]/20 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Postularme a una Beca por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Imagen Derecha */}
          <div className="lg:col-span-6 h-full min-h-[280px] sm:min-h-[360px] relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={heroStudentsImg}
              alt="Estudiantes beneficiarios de becas en Fundación ULEP"
              className="w-full h-full object-cover min-h-[280px] sm:min-h-[360px] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <span className="text-white text-xs font-bold bg-[#0035ab] px-3 py-1 rounded-lg shadow-sm">
                Convocatoria Educativa ULEP
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILA 2: IMAGEN A LA IZQUIERDA / CUADRO A LA DERECHA (INTERCALADO) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5">
          {/* Imagen Izquierda (en móvil abajo por order, en desktop a la izquierda) */}
          <div className="lg:col-span-6 order-2 lg:order-1 h-full min-h-[280px] sm:min-h-[360px] relative rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
              alt="Facilidades de pago en cuotas ULEP"
              className="w-full h-full object-cover min-h-[280px] sm:min-h-[360px] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <span className="text-white text-xs font-bold bg-blue-600 px-3 py-1 rounded-lg shadow-sm">
                Pagos Cómodos Sin Bancos
              </span>
            </div>
          </div>

          {/* Cuadro Derecha */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 block">
                Economía Solidaria
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
                Pagos en Cuotas Cómodas y Directas
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Paga tu capacitación mes a mes sin intereses ocultos ni letras bancarias. Diseñado para que cualquier persona con deseos de superarse pueda trabajar y estudiar al mismo tiempo sin desestabilizar su presupuesto familiar.
            </p>

            {/* Puntos Explicativos */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cuotas fijas mensuales pactadas desde el inicio</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cero intereses bancarios abusivos ni intermediarios</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Facilidad de pago en línea, transferencias o consignación</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Aprobación directa el mismo día de tu postulación</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Consultar Planes de Pago</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILA 3: CUADRO A LA IZQUIERDA / IMAGEN A LA DERECHA (INTERCALADO) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5">
          {/* Cuadro Izquierda */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                Flexibilidad Total
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
                Modalidades Adapta-Tu-Tiempo
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Elige cómo estudiar según tu horario y ubicación: 100% Virtual con acceso a nuestro campus las 24 horas del día, o clases Presenciales y Semipresenciales con talleres prácticos.
            </p>

            {/* Puntos Explicativos */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Campus Virtual disponible 24/7 desde cualquier dispositivo</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Jornadas en sábados, diurnas o nocturnas para quienes trabajan</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Acompañamiento y tutorías permanentes con instructores</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Clases grabadas y material descargable siempre disponible</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <Clock className="w-4 h-4 text-slate-950" />
                <span>Elegir Horario y Modalidad</span>
              </button>
            </div>
          </div>

          {/* Imagen Derecha */}
          <div className="lg:col-span-6 h-full min-h-[280px] sm:min-h-[360px] relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={shortCoursesImg}
              alt="Estudiante en campus virtual y modalidades ULEP"
              className="w-full h-full object-cover min-h-[280px] sm:min-h-[360px] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <span className="text-white text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-lg shadow-sm">
                Virtual, Presencial y Semipresencial
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILA 4: IMAGEN A LA IZQUIERDA / CUADRO A LA DERECHA (INTERCALADO) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-900/5">
          {/* Imagen Izquierda (en móvil abajo por order, en desktop a la izquierda) */}
          <div className="lg:col-span-6 order-2 lg:order-1 h-full min-h-[280px] sm:min-h-[360px] relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={vocationalTrainingImg}
              alt="Certificación oficial y formación laboral práctica ULEP"
              className="w-full h-full object-cover min-h-[280px] sm:min-h-[360px] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
              <span className="text-white text-xs font-bold bg-emerald-600 px-3 py-1 rounded-lg shadow-sm">
                Certificación por Competencias Laborales
              </span>
            </div>
          </div>

          {/* Cuadro Derecha */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block">
                Validez y Empleabilidad
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
                Certificación Oficial para el Empleo
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nuestra metodología se enfoca en que aprendas haciendo. Al finalizar satisfactoriamente tu programa, recibes tu certificación con respaldo institucional de la Fundación ULEP y GRUPO ULEP para que demuestres tus competencias ante cualquier empleador.
            </p>

            {/* Puntos Explicativos */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enfoque 100% práctico aplicado a empresas</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificados con respaldo institucional verificable</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Desarrollo de competencias altamente demandadas</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Orientación y vinculación con la red de aliados</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Conocer Más de la Certificación</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BLOQUE DE ATENCIÓN DIRECTA Y ASESORÍA (TAL CUAL COMO ESTABA) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 border border-blue-200 p-8 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#0035ab]">
              Atención Personalizada
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              ¿Tienes dudas sobre los planes de pago o las becas?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Un asesor de la Fundación ULEP te responderá de inmediato para ayudarte a elegir la mejor opción de estudio adaptada a tu presupuesto.
            </p>
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-black text-xs sm:text-sm shadow-lg shadow-[#0035ab]/20 transition-all hover:scale-[1.02] shrink-0 flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
          >
            <HeartHandshake className="w-4 h-4 text-white" />
            <span>Hablar con un Asesor de Becas</span>
          </button>
        </div>

      </div>
    </section>
  );
}
