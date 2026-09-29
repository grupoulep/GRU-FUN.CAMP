import React, { useState, useEffect } from 'react';
import { ProgramType, TabType } from './types';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgreementsSection from './components/AgreementsSection';
import AlliesMarquee from './components/AlliesMarquee';
import ProgramCategoriesSection from './components/ProgramCategoriesSection';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminModal from './components/AdminModal';
import { getStoredImages } from './utils/adminStorage';
import { ArrowRight, BookOpen, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [heroImage, setHeroImage] = useState<string>('');

  useEffect(() => {
    setHeroImage(getStoredImages().heroImage);

    const handleImageUpdate = () => {
      setHeroImage(getStoredImages().heroImage);
    };

    window.addEventListener('ulep_admin_images_updated', handleImageUpdate);
    return () => window.removeEventListener('ulep_admin_images_updated', handleImageUpdate);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToEnrollment = (category?: ProgramType) => {
    const waNumber = '573169008561';
    const catName =
      category === 'tecnico'
        ? 'Técnicos para el Trabajo'
        : category === 'curso'
        ? 'Cursos para el Trabajo'
        : 'los programas educativos y becas';
    const waMessage = `Hola Fundación ULEP, quisiera solicitar información e inscribirme a ${catName}.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0035ab] selection:text-white scroll-smooth antialiased relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambient Blurs */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#0035ab]/5 rounded-full filter blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-[#0035ab]/5 rounded-full filter blur-[140px] pointer-events-none -z-10" />

      {/* Main Top Navigation with Integrated Tabs */}
      <Navbar
        onJoinClick={() => handleScrollToEnrollment()}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

      {/* Main Tab Content Area */}
      <main className="flex-1">
        {/* PESTAÑA 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="animate-in fade-in duration-300 space-y-2">
            <HeroSection
              onCtaClick={() => handleScrollToEnrollment()}
              onExplorePrograms={() => handleTabChange('programas')}
              onExploreBenefits={() => handleTabChange('beneficios')}
              heroImage={heroImage}
            />

            {/* Scrolling Banner with Allies Logos */}
            <AlliesMarquee />

            <AgreementsSection />

            {/* Quick Tab Jump Cards on Home */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
              <div className="text-center mb-8 sm:mb-10 space-y-2">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0035ab] block">
                  Explora Nuestra Oferta
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  Todo lo que la Fundación ULEP tiene para ti
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Selecciona una de las secciones principales para descubrir los programas y las oportunidades de becas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <button
                  type="button"
                  onClick={() => handleTabChange('programas')}
                  className="bg-white hover:bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#0035ab]/50 shadow-md hover:shadow-xl shadow-slate-900/5 text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0035ab] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                        Cursos y Técnicos Laborales
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        Conoce el catálogo completo de formación práctica por competencias: Cursos cortos de rápida salida y programas técnicos oficiales.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0035ab]">
                    <span>Explorar catálogo de programas</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange('beneficios')}
                  className="bg-white hover:bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl shadow-slate-900/5 text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                        Beneficios y Becas ULEP
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        Descubre los subsidios a la matrícula, planes de pago en cuotas cómodas sin intermediación bancaria y horarios adaptados a tu tiempo.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>Conocer beneficios y becas</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: CURSOS Y TÉCNICOS */}
        {activeTab === 'programas' && (
          <div className="animate-in fade-in duration-300">
            <ProgramCategoriesSection
              onSelectCategory={(type) => handleScrollToEnrollment(type)}
            />

            {/* Tab Footer Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-200/80 pt-6 sm:pt-8 text-center sm:text-left">
              <button
                type="button"
                onClick={() => handleTabChange('inicio')}
                className="py-2.5 px-4 text-xs font-bold text-slate-600 hover:text-[#0035ab] transition-colors cursor-pointer min-h-[44px] flex items-center justify-center sm:justify-start"
              >
                ← Volver al Inicio
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('beneficios')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#0035ab] text-white text-xs font-extrabold hover:bg-[#002477] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer min-h-[48px]"
              >
                <span>Ver Siguiente: Beneficios y Becas ULEP</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: BENEFICIOS Y BECAS */}
        {activeTab === 'beneficios' && (
          <div className="animate-in fade-in duration-300">
            <BenefitsSection
              onCtaClick={() => handleScrollToEnrollment()}
            />

            {/* Tab Footer Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-200/80 pt-6 sm:pt-8 text-center sm:text-left">
              <button
                type="button"
                onClick={() => handleTabChange('programas')}
                className="py-2.5 px-4 text-xs font-bold text-slate-600 hover:text-[#0035ab] transition-colors cursor-pointer min-h-[44px] flex items-center justify-center sm:justify-start"
              >
                ← Volver a Cursos y Técnicos
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('inicio')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#0035ab] text-white text-xs font-extrabold hover:bg-[#002477] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer min-h-[48px]"
              >
                <span>Volver al Inicio</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer with Tab Selectors & Admin Link */}
      <Footer
        onSelectTab={handleTabChange}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Admin Panel Modal (Password Protected) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
