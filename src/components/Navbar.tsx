import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Home, GraduationCap, Award, Users2, FileText } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  onJoinClick?: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export default function Navbar({ activeTab, onSelectTab }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll only when mobile menu is open on small screens
  useEffect(() => {
    if (isMobileMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleTabClick = (tab: TabType) => {
    setIsMobileMenuOpen(false);
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'programas', label: 'Cursos y Técnicos', icon: GraduationCap },
    { id: 'beneficios', label: 'Beneficios y Becas', icon: Award },
    { id: 'nosotros', label: 'Nosotros', icon: Users2 },
    { id: 'inscripciones', label: 'Inscripciones', icon: FileText },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md shadow-slate-900/5 py-2.5 sm:py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleTabClick('inicio')}
          className="flex items-center gap-2 group text-left cursor-pointer shrink-0 min-h-[44px] focus:outline-none"
        >
          <div>
            <span className="font-display text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#0035ab] leading-none">
              Fundación <span className="text-[#002477]">ULEP</span>
            </span>
            <span className="block text-[8px] sm:text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
              GRUPO ULEP
            </span>
          </div>
        </button>

        {/* Center Navigation Tabs (Tablet & Desktop PC) */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                  isActive
                    ? 'bg-[#0035ab] text-white shadow-sm shadow-[#0035ab]/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="https://groupulep.github.io/credito/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 lg:px-4 py-1.5 rounded-full border border-[#0035ab]/30 hover:border-[#0035ab] text-[#0035ab] font-bold text-xs hover:bg-[#0035ab]/5 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[36px]"
          >
            <LogIn className="w-3.5 h-3.5 text-[#0035ab] shrink-0" />
            <span>Campus Virtual</span>
          </a>
        </div>

        {/* Mobile Hamburger / Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 sm:px-3 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0035ab]/30 border ${
              isMobileMenuOpen
                ? 'bg-[#0035ab] text-white border-[#0035ab] shadow-md shadow-[#0035ab]/20'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
            }`}
            aria-label={isMobileMenuOpen ? 'Cerrar panel de navegación' : 'Abrir panel de navegación'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-5 h-5 text-white" />
                <span className="text-xs font-bold hidden sm:inline text-white">Cerrar</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5 text-slate-800" />
                <span className="text-xs font-bold hidden sm:inline text-slate-800">Menú</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DROPDOWN NAVIGATION PANEL (100% VISIBLE CUANDO SE ABRE, LIMPIO) */}
      {isMobileMenuOpen && (
        <div
          id="panel-navegacion-desplegable"
          className="absolute top-full left-0 right-0 w-full bg-white border-b-2 border-[#0035ab] shadow-2xl z-[70] max-h-[85vh] overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0035ab]">
              Secciones de la Página
            </span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 px-2 py-0.5 rounded cursor-pointer"
            >
              Cerrar ✕
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-left font-bold py-3 px-4 rounded-2xl transition-all flex items-center justify-between min-h-[48px] cursor-pointer ${
                    isActive
                      ? 'bg-[#0035ab] text-white shadow-md shadow-[#0035ab]/20'
                      : 'text-slate-800 bg-slate-50 hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-extrabold">{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] uppercase font-black bg-white/20 px-2.5 py-0.5 rounded-full">
                      Pestaña Activa
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Campus Virtual Link */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href="https://groupulep.github.io/credito/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-blue-50 border border-blue-200 text-[#0035ab] font-extrabold text-center hover:bg-blue-100 flex items-center justify-center gap-2 text-xs min-h-[44px]"
            >
              <LogIn className="w-4 h-4 text-[#0035ab]" />
              <span>Campus Virtual / Iniciar Sesión</span>
            </a>
            <p className="text-center text-[10px] text-slate-500 font-semibold">
              Fundación ULEP • Educación para el Trabajo y Desarrollo Humano
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
