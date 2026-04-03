'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerFadeIn, imageReveal, killAllTriggers } from '@/lib/animations';

export default function Solutions() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    fadeInUp('.solutions-hero-text');
    staggerFadeIn('.solutions-detailed', '.solution-block', 0.3);
    return () => killAllTriggers();
  }, [lang]);

  return (
    <main>
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/assets/new/Guava Juice  Mockup.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center solutions-hero-text">
          <SectionHeading 
            title={t.solutions.title}
            subtitle={t.solutions.subtitle}
            center
            dark
          />
        </div>
      </section>

      {/* Solutions blocks */}
      <SectionWrapper className="solutions-detailed">
        <div className="space-y-32">
          {t.solutions.items.map((item, idx) => (
            <div key={item.id} className={`solution-block flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] md:h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
                   <Image 
                    src={`/assets/new/${idx === 0 ? 'Strawberry Juice Mockup' : idx === 1 ? 'Organic Juice  Mockup' : idx === 2 ? 'Cuava shot' : 'Flavors'}.png`} 
                    alt={item.title} 
                    fill 
                    className="object-contain p-12 bg-brand-light dark:bg-white/5"
                  />
                  <div className="absolute top-8 right-8 rtl:left-8 rtl:right-auto w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center font-black text-brand-dark text-xl">
                    0{idx + 1}
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl text-brand-muted leading-relaxed mb-10">
                  {item.desc}
                </p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Link href="/products" className="px-8 py-4 rounded-xl bg-brand-green text-white font-bold hover:shadow-xl transition-all">
                    View Related Products
                  </Link>
                  <Link href="/quote" className="px-8 py-4 rounded-xl border border-border font-bold hover:bg-brand-light transition-all">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
