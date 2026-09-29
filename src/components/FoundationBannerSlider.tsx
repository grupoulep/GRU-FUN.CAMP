import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FoundationBanner, getStoredFoundationBanners } from '../utils/adminStorage';

export default function FoundationBannerSlider() {
  const [banners, setBanners] = useState<FoundationBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe tracking for Phone & Tablet
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const loadBanners = () => {
      const stored = getStoredFoundationBanners();
      const active = stored.filter((b) => b.active);
      setBanners(active.length > 0 ? active : stored);
    };

    loadBanners();

    window.addEventListener('ulep_admin_foundation_banners_updated', loadBanners);
    return () => window.removeEventListener('ulep_admin_foundation_banners_updated', loadBanners);
  }, []);

  // Autoplay rotation every 5 seconds
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex] || banners[0];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  // Touch handlers for mobile and tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // px

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next slide
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous slide
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      id="banner-fundacion-principal"
      className="w-full relative overflow-hidden group select-none mb-6 sm:mb-8 md:mb-10 bg-slate-100/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Edge-to-Edge Panoramic Image Canvas with Responsive Height for Phone, Tablet, PC */}
      <div className="relative w-full h-[200px] xs:h-[240px] sm:h-[320px] md:h-[390px] lg:h-[460px] xl:h-[500px] overflow-hidden">
        <img
          key={currentBanner.id}
          src={currentBanner.imageUrl}
          alt={currentBanner.name || 'Banner Fundación ULEP'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center animate-in fade-in duration-700"
        />

        {/* Softened Gradient Edges (Upper, Lower, Sides) */}
        <div className="absolute inset-x-0 top-0 h-10 sm:h-14 md:h-16 bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 md:h-20 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-6 sm:w-12 md:w-16 bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-6 sm:w-12 md:w-16 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none z-10" />

        {/* Navigation Arrows (Touch targets minimum 44px for Phones/Tablets) */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 active:bg-black/80 text-white flex items-center justify-center transition-all opacity-75 sm:opacity-60 sm:group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-md z-20 min-h-[44px] min-w-[44px]"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 active:bg-black/80 text-white flex items-center justify-center transition-all opacity-75 sm:opacity-60 sm:group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-md z-20 min-h-[44px] min-w-[44px]"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Minimalist Bottom Indicator Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-black/30 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
            {banners.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer min-h-[16px] min-w-[16px] flex items-center justify-center`}
                aria-label={`Ir a imagen ${idx + 1}`}
              >
                <span
                  className={`block rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-white shadow-sm'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
