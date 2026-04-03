'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import IndustryCard from '@/components/ui/IndustryCard';
import ClientCarousel from '@/components/ui/ClientCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, killAllTriggers } from '@/lib/animations';

export default function Industries() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    fadeInUp('.industries-header');
    return () => killAllTriggers();
  }, [lang]);

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 bg-brand-dark">
        <div className="container-custom text-center industries-header">
          <SectionHeading 
            title={t.industries.title}
            subtitle={t.industries.subtitle}
            center
            dark
          />
        </div>
      </section>

      {/* Industry Blocks */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          {t.industries.items.map((item, idx) => (
            <IndustryCard 
              key={item.id}
              id={item.id}
              title={item.title}
              desc={item.desc}
              index={idx}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Social Proof */}
      <div className="py-20 bg-brand-light dark:bg-white/5 border-t border-border/10">
        <div className="container-custom mb-16 text-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">{t.clients.title}</h3>
            <p className="text-brand-muted">{t.clients.subtitle}</p>
        </div>
        <ClientCarousel />
      </div>

      <Footer />
    </main>
  );
}
