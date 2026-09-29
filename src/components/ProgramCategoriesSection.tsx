import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Search,
  Laptop,
  Building,
  Award,
  Calendar,
  X,
  ShieldCheck,
  Send
} from 'lucide-react';
import { CourseData, getStoredCourses } from '../utils/adminStorage';

interface ProgramCategoriesSectionProps {
  onSelectCategory: (type: 'curso' | 'tecnico') => void;
}

export default function ProgramCategoriesSection({ onSelectCategory }: ProgramCategoriesSectionProps) {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'curso' | 'tecnico'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<CourseData | null>(null);

  useEffect(() => {
    setCourses(getStoredCourses());

    const handleUpdate = () => {
      setCourses(getStoredCourses());
    };

    window.addEventListener('ulep_admin_courses_updated', handleUpdate);
    return () => window.removeEventListener('ulep_admin_courses_updated', handleUpdate);
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesType = filterType === 'all' || course.type === filterType;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleEnrollWhatsApp = (courseTitle: string) => {
    const waNumber = '573169008561';
    const waMessage = `Hola Fundación ULEP, quisiera más información sobre el programa "${courseTitle}" y cómo iniciar mi inscripción con facilidades de pago o beca.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  return (
    <section id="programas" className="py-12 sm:py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0035ab] block">
            Catálogo Oficial de Formación para el Trabajo
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Cursos y Programas Técnicos Laborales
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Estructurados bajo el modelo de educación por competencias para el trabajo y el desarrollo humano. Diseñados para que adquieras habilidades aplicables de inmediato al sector productivo.
          </p>
        </div>

        {/* Value Highlights Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-base sm:text-lg font-black text-[#0035ab] block">100%</span>
            <span className="text-[11px] font-semibold text-slate-600">Práctico y Aplicado</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-base sm:text-lg font-black text-[#0035ab] block">24/7</span>
            <span className="text-[11px] font-semibold text-slate-600">Campus Virtual</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-base sm:text-lg font-black text-[#0035ab] block">Sin Bancos</span>
            <span className="text-[11px] font-semibold text-slate-600">Pagos en Cuotas</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
            <span className="text-base sm:text-lg font-black text-[#0035ab] block">Oficial</span>
            <span className="text-[11px] font-semibold text-slate-600">Certificación ULEP</span>
          </div>
        </div>

        {/* Filter and Search Bar Control */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Segmented Filter Buttons */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({courses.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('curso')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'curso'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cursos Cortos
            </button>
            <button
              type="button"
              onClick={() => setFilterType('tecnico')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'tecnico'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Técnicos Laborales
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar programa..."
              className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0035ab] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No se encontraron programas</h3>
            <p className="text-xs text-slate-500">Prueba con otra búsqueda o selecciona "Todos los programas".</p>
            <button
              onClick={() => {
                setFilterType('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0035ab] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredCourses.map((course) => {
              const isTecnico = course.type === 'tecnico';
              const Icon = isTecnico ? GraduationCap : BookOpen;

              return (
                <div
                  key={course.id}
                  className="bg-white border border-slate-200 hover:border-[#0035ab]/50 rounded-3xl transition-all hover:-translate-y-1 shadow-md hover:shadow-xl shadow-slate-900/5 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Header with Responsive Height */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-5">
                      <div className="text-white space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 block">
                          {isTecnico ? 'Programa Técnico Laboral' : 'Curso Práctico para el Trabajo'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white leading-tight">
                          {course.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Meta Information Bar */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 gap-2 flex-wrap">
                        <span className="font-extrabold text-[#0035ab] flex items-center gap-1.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{course.subtitle}</span>
                        </span>
                        {course.duration && (
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{course.duration}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {course.description}
                      </p>

                      {/* Key features */}
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                          Habilidades que desarrollarás:
                        </p>
                        <ul className="space-y-1.5">
                          {course.features.map((feat, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleEnrollWhatsApp(course.title)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs shadow-md shadow-[#0035ab]/20 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      >
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Inscribirme por WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCourseForModal(course)}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer min-h-[44px] text-center"
                      >
                        Ver Ficha
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Course Details */}
        {selectedCourseForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedCourseForModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0035ab]">
                  {selectedCourseForModal.type === 'tecnico' ? 'Técnico Laboral' : 'Curso para el Trabajo'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 leading-tight">
                  {selectedCourseForModal.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedCourseForModal.subtitle}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden h-40">
                <img
                  src={selectedCourseForModal.imageUrl}
                  alt={selectedCourseForModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>{selectedCourseForModal.description}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Competencias y beneficios incluidos:
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedCourseForModal.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleEnrollWhatsApp(selectedCourseForModal.title);
                    setSelectedCourseForModal(null);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Inscribirme con Beca ULEP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCourseForModal(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
