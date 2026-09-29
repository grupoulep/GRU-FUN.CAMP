import React from 'react';
import { ArrowRight, BookOpen, Award, ShieldCheck, CheckCircle2, Sparkles, Users } from 'lucide-react';
import FoundationBannerSlider from './FoundationBannerSlider';

interface HeroSectionProps {
  onCtaClick?: () => void;
  onExplorePrograms?: () => void;
  onExploreBenefits?: () => void;
  heroImage?: string;
}

export default function HeroSection({
  onExplorePrograms,
  onExploreBenefits,
}: HeroSectionProps) {
  return (
    <section id="inicio" className="relative pt-[52px] sm:pt-[60px] pb-12 sm:pb-16 overflow-hidden bg-transparent text-slate-900">
      {/* Background Subtle Ambient Light */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-blue-500/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-amber-500/5 blur-[120px] -z-10 pointer-events-none" />

      {/* Edge-to-Edge Panoramic Foundation Banner (No text, pure visual slider) */}
      <FoundationBannerSlider />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 pt-4 sm:pt-6">
        
        {/* Main Headline Structured with High Contrast and Clear Focus */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0035ab] block">
            Institución de Educación para el Trabajo y el Desarrollo Humano
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 leading-[1.15]">
            Formación Práctica en{' '}
            <span className="text-[#0035ab] inline-block">
              Cursos y Técnicos
            </span>{' '}
            con Respaldo Institucional
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal pt-1">
            En la <strong className="text-slate-900 font-bold">Fundación ULEP</strong> impulsamos tu futuro laboral mediante programas aplicados a las exigencias del mercado, con horarios adaptados a tu tiempo y facilidades de pago directo sin intermediarios bancarios.
          </p>
        </div>

        {/* Dual Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          {onExplorePrograms && (
            <button
              onClick={onExplorePrograms}
              className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-xl bg-[#0035ab] hover:bg-[#002477] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#0035ab]/25 transition-all hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <BookOpen className="w-4 h-4 text-white" />
              <span>Ver Cursos y Técnicos</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          )}

          {onExploreBenefits && (
            <button
              onClick={onExploreBenefits}
              className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-extrabold text-xs sm:text-sm shadow-sm transition-all hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Conocer Beneficios y Becas</span>
            </button>
          )}
        </div>

        {/* 3 Value Proposition Blocks */}
        <div className="pt-6 sm:pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left">
          <div
            onClick={onExplorePrograms}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-[#0035ab]/40 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0035ab] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 font-display">
              Cursos Prácticos
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Capacitación ágil de 3 a 6 meses enfocada 100% en destrezas aplicables al empleo.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-[#0035ab] mt-3 group-hover:translate-x-1 transition-transform">
              Explorar programas →
            </span>
          </div>

          <div
            onClick={onExplorePrograms}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-[#0035ab]/40 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0035ab] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 font-display">
              Técnicos Laborales
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Programas formales por competencias con certificación oficial y prácticas productivas.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-[#0035ab] mt-3 group-hover:translate-x-1 transition-transform">
              Ver técnicos →
            </span>
          </div>

          <div
            onClick={onExploreBenefits}
            className="bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 p-5 sm:p-6 rounded-2xl border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 font-display">
              Becas y Financiación
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Subsidios directos a tu mensualidad y planes de pago en cuotas cómodas sin bancos.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-amber-800 mt-3 group-hover:translate-x-1 transition-transform">
              Solicitar beca →
            </span>
          </div>
        </div>

        {/* Quiet Trust Bar (Unboxed text with separators) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Certificación Oficial
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Virtual, Presencial y Semipresencial
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Financiamiento Directo
          </span>
        </div>

      </div>
    </section>
  );
}
