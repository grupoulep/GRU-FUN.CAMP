import React, { useState, useEffect } from 'react';
import { AllyLogo, getStoredAllies } from '../utils/adminStorage';

export default function AlliesMarquee() {
  const [allies, setAllies] = useState<AllyLogo[]>([]);

  useEffect(() => {
    setAllies(getStoredAllies());

    const handleUpdate = () => {
      setAllies(getStoredAllies());
    };

    window.addEventListener('ulep_admin_allies_updated', handleUpdate);
    return () => window.removeEventListener('ulep_admin_allies_updated', handleUpdate);
  }, []);

  const activeAllies = allies.filter((a) => a.active);
  if (activeAllies.length === 0) return null;

  // Duplicate items sufficiently for seamless smooth continuous loop
  const marqueeItems = [...activeAllies, ...activeAllies, ...activeAllies, ...activeAllies];

  return (
    <div className="w-full py-3.5 sm:py-5 bg-white/80 backdrop-blur-xs border-y border-slate-200/60 overflow-hidden relative group select-none">
      {/* Marquee Track Container with Gradient Edge Masks */}
      <div className="relative w-full overflow-hidden">
        
        {/* Softened side fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous Slower Scrolling Row - SOLO LOGOS SIN TEXTOS NI BORDES */}
        <div className="flex items-center gap-10 sm:gap-16 w-max animate-marquee group-hover:[animation-play-state:paused] py-1">
          {marqueeItems.map((ally, index) => (
            <div
              key={`${ally.id}-${index}`}
              className="h-10 sm:h-12 flex items-center justify-center shrink-0 cursor-default opacity-80 hover:opacity-100 transition-opacity"
              title={ally.name}
            >
              <img
                src={ally.imageUrl}
                alt={ally.name}
                className="max-h-10 sm:max-h-12 w-auto max-w-[130px] sm:max-w-[170px] object-contain filter grayscale-20 hover:grayscale-0 transition-all select-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
