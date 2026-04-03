'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const ClientCarousel = () => {
  const { t } = useLanguage();
  
  // Create a double list for seamless loop
  const clientIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const list = [...clientIndices, ...clientIndices];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-white dark:bg-white/5 border-y border-border/30">
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
        {list.map((idx, i) => (
          <div 
            key={`${idx}-${i}`} 
            className="flex-shrink-0 mx-10 w-32 h-16 relative grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 cursor-pointer"
          >
            <Image 
              src={`/assets/clints/imgi-client (${idx}).webp`} 
              alt={`Client ${idx}`} 
              fill 
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
      
      {/* Side Fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
};

export default ClientCarousel;
