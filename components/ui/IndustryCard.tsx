'use client';

import React from 'react';
import Image from 'next/image';

interface IndustryCardProps {
  id: string;
  title: string;
  desc: string;
  index: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ id, title, desc, index }) => {
  return (
    <div className="group flex flex-col md:flex-row items-center gap-10 py-16 border-b border-border/10 last:border-0">
      <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
        <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src={`/assets/random/imgi_ref (${(index % 3) + 1}).webp`} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-green/10" />
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <span className="text-6xl font-black text-brand-green/10 mb-4 font-sans tracking-tighter">
          0{index + 1}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-brand-green transition-colors">
          {title}
        </h3>
        <p className="text-lg text-brand-muted leading-relaxed">
          {desc}
        </p>
        
        <div className="h-1 w-12 bg-brand-gold mt-10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-500" />
      </div>
    </div>
  );
};

export default IndustryCard;
