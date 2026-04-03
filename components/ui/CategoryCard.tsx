'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  label: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, label, imageSrc }) => {
  return (
    <Link href={`/products?category=${id}`} className="group relative block h-[300px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-lg bg-brand-dark/50">
      <Image 
        src={imageSrc} 
        alt={label} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent group-hover:via-brand-green/30 transition-all duration-500" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="h-[2px] w-8 bg-brand-gold" />
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
            Discovery
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {label}
        </h3>
        
        <div className="inline-flex items-center text-sm font-bold text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Explore Collection
          <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
