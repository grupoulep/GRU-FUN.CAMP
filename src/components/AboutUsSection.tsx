import React from 'react';
import {
  Building2,
  Award,
  Users2,
  Target,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import heroStudentsImg from '../assets/images/hero_students_ulep_1786064095670.jpg';

interface AboutUsSectionProps {
  onExplorePrograms: () => void;
  onExploreAdmissions: () => void;
}

export default function AboutUsSection({
  onExplorePrograms,
  onExploreAdmissions,
}: AboutUsSectionProps) {
  const pillars = [
    {
      icon: Target,
      title: 'Enfoque en Competencias Laborales',
      description:
        'Nuestros planes de estudio no se limitan a la teoría; capacitamos a los estudiantes en las destrezas que las empresas y el sector productivo solicitan hoy.',
    },
    {
      icon: HeartHandshake,
      title: 'Inclusión Social y Educación Accesible',
      description:
        'Creemos que el dinero no debe ser un obstáculo. Proveemos becas directas y financiamiento propio sin intermediación bancaria ni requisitos excluyentes.',
    },
    {
      icon: Users2,
      title: 'Docentes Expertos del Sector',
      description:
        'Aprenderás con instructores y profesionales activos en sus respectivas áreas, lo que garantiza conocimientos actualizados y aplicados.',
    },
    {
      icon: Building2,
      title: 'Respaldo Integral GRUPO ULEP',
      description:
        'Contamos con el soporte tecnológico, el Campus Virtual 24/7 y la infraestructura educativa del GRUPO ULEP para asegurar la máxima calidad formativa.',
    },
  ];

  return (
    <section id="nosotros" className="py-12 sm:py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0035ab] block">
            Nuestra Institución
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Fundación ULEP: Educación para el Trabajo y Desarrollo Humano
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Somos una entidad comprometida con la transformación social a través de la formación técnica laboral, cursos prácticos y oportunidades reales de progreso en Colombia.
          </p>
        </div>

        {/* Hero Banner with Identity Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-900/5">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-black uppercase tracking-wider text-[#0035ab] block">
              Trayectoria y Compromiso
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 leading-tight">
              Formamos el Talento Humano que Transforma el País
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              La <strong className="text-slate-900 font-bold">Fundación ULEP</strong> nació con la firme convicción de que la educación técnica y la capacitación laboral son las herramientas más efectivas para mejorar la calidad de vida de las familias y dinamizar la economía de nuestras regiones.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              A través de alianzas con empresas, gremios y el respaldo tecnológico de <strong>GRUPO ULEP</strong>, brindamos programas con pertinencia laboral, certificación verificable y horarios adaptados a quienes trabajan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onExplorePrograms}
                className="px-6 py-3.5 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Explorar Nuestros Programas</span>
              </button>
              <button
                type="button"
                onClick={onExploreAdmissions}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceso de Inscripción</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md relative">
            <img
              src={heroStudentsImg}
              alt="Comunidad estudiantil Fundación ULEP"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-xs font-extrabold block">Comunidad Educativa ULEP</span>
                <span className="text-[11px] text-blue-200">Formando líderes en Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0035ab] flex items-center justify-center shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                Nuestra Misión
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Ofrecer educación para el trabajo y el desarrollo humano de alta calidad, incluyente, accesible y flexible, formando personas competentes, éticas e idóneas para desempeñarse con éxito en el sector laboral y emprender con visión de futuro.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0035ab]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Compromiso con el progreso social</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                Nuestra Visión
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Ser reconocidos a nivel nacional como una institución líder en educación técnica laboral y continua, destacada por sus egresados de alto nivel de empleabilidad, su sólida red de aliados institucionales y su modelo de inclusión con becas directas.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Innovación y calidad formativa hacia el futuro</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Pedagogical Model */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0035ab]">
              Pilares Fundamentales
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              El Modelo Educativo de la Fundación ULEP
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0035ab] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 font-display">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
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
