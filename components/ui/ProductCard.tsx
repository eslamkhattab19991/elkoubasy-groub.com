'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
  id: string;
  name: string;
  desc: string;
  category: string;
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, desc, category, imageSrc }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-green/10 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-brand-light dark:bg-brand-dark/20 overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={name} 
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto px-3 py-1 bg-brand-gold/90 text-white text-[10px] uppercase font-bold tracking-wider rounded-lg backdrop-blur-sm">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-green transition-colors">
          {name}
        </h3>
        <p className="text-sm text-brand-muted line-clamp-2 mb-6">
          {desc}
        </p>
        
        <Link 
          href={`/quote?product=${id}`}
          className="flex items-center justify-between w-full px-4 py-3 bg-brand-green/5 dark:bg-white/5 hover:bg-brand-green transition-all duration-300 rounded-xl group/btn"
        >
          <span className="text-sm font-bold group-hover/btn:text-white transition-colors">
            {t.products.enquire}
          </span>
          <svg className="w-5 h-5 group-hover/btn:text-white transition-all transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
