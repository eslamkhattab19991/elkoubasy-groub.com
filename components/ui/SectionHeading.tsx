'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  center = false, 
  dark = false,
  className = ''
}) => {
  const { lang } = useLanguage();
  
  const hasMargin = className.includes('mb-');
  
  return (
    <div className={`${hasMargin ? '' : 'mb-12 md:mb-16'} ${center ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      <div className={`flex items-center mb-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-1 w-12 bg-brand-gold rounded-full mr-4 rtl:ml-4" />
        <span className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? 'text-brand-lime' : 'text-brand-green'}`}>
          ElKoubasy Group
        </span>
      </div>
      
      <h2 className={`text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight ${dark ? 'text-white' : 'text-brand-dark'}`}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-lg md:text-xl leading-relaxed ${dark ? 'text-brand-muted' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
