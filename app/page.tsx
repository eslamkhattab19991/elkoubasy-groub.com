'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import CategoryCard from '@/components/ui/CategoryCard';
import ClientCarousel from '@/components/ui/ClientCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerFadeIn, imageReveal, killAllTriggers } from '@/lib/animations';

export default function Home() {
  const { t, lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animations
    fadeInUp('.hero-content', 0.2);
    imageReveal(document.querySelector('.hero-image'));
    staggerFadeIn('.trust-grid', '.trust-item', 0.15);
    fadeInUp('.solutions-header');
    staggerFadeIn('.solutions-grid', '.solution-card', 0.2);
    staggerFadeIn('.products-grid', '.category-card', 0.2);

    return () => killAllTriggers();
  }, [lang]); // Re-run on language change to ensure text is animated

  return (
    <main className="relative">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-dark">
        {/* Background Parallax Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/assets/random/imgi_ref (1).webp" 
            alt="Nature Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hero-content">
            <div className="inline-flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 rounded-full bg-brand-green/20 border border-brand-green/30 mb-8 text-brand-lime text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span>International Food Safety Standards</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              {t.hero.tagline.split(', ').map((part, i) => (
                <span key={i} className={i === 1 ? 'text-brand-gold' : ''}>
                  {part}{i === 0 ? ',' : ''} <br className="hidden md:block" />
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-brand-muted max-w-xl mb-12 leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Link href="/products" className="px-10 py-5 rounded-2xl bg-brand-green text-white font-bold text-lg hover:bg-brand-green/90 transition-all hover:shadow-2xl hover:shadow-brand-green/20 text-center">
                {t.hero.cta_primary}
              </Link>
              <Link href="/quote" className="px-10 py-5 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all text-center">
                {t.hero.cta_secondary}
              </Link>
            </div>
          </div>
          
          <div className="hero-image relative h-[500px] lg:h-[700px] hidden lg:block">
             {/* Floating Bottle or Lineup */}
             <Image 
              src="/assets/new/hero_png.png" 
              alt="ElKoubasy Products" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <div ref={trustRef} className="bg-white dark:bg-brand-dark/50 border-y border-border/10 py-12">
        <div className="container-custom">
          <div className="trust-grid grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="trust-item text-center">
                <div className="text-3xl md:text-4xl font-black text-brand-green mb-1">
                  {(t.trust as any)[`stat${i}_value`]}
                </div>
                <div className="text-xs uppercase font-bold tracking-widest text-brand-muted">
                  {(t.trust as any)[`stat${i}_label`]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SOLUTIONS PREVIEW */}
      <SectionWrapper ref={solutionsRef} id="solutions" className="py-12 md:py-28">
        <div className="solutions-header">
          <SectionHeading 
            title={t.solutions.title}
            subtitle={t.solutions.subtitle}
            center
          />
        </div>
        
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.solutions.items.map((item) => (
            <div key={item.id} className="solution-card group p-10 rounded-[40px] bg-white dark:bg-white/5 border border-border/50 hover:border-brand-green/30 transition-all duration-500 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-8 group-hover:bg-brand-green transition-colors duration-500 text-brand-green group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
              <Link href="/solutions" className="text-xs font-bold text-brand-green uppercase tracking-widest flex items-center">
                Learn More 
                <svg className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. PRODUCTS PREVIEW */}
      <SectionWrapper id="products" dark className="rounded-t-[60px] py-16 md:py-32">
        <SectionHeading 
          title={t.products.title}
          subtitle={t.products.subtitle}
          dark
          className="mb-32 md:mb-48"
        />
        
        <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.products.categories.slice(0, 3).map((cat, idx) => (
             <div key={cat.id} className="category-card">
                <CategoryCard 
                  id={cat.id} 
                  label={cat.label} 
                  imageSrc={`/assets/catagory/imgi_${idx + 1}_category.webp`}
                />
             </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/products" className="inline-flex items-center px-10 py-5 rounded-full border border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
            {t.products.cta}
          </Link>
        </div>
      </SectionWrapper>

      {/* 5. ABOUT PREVIEW */}
      <SectionWrapper id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl skew-y-3">
             <Image 
              src="/assets/random/imgi_ref (3).webp" 
              alt="Production Quality" 
              fill 
              className="object-cover"
            />
            {/* Visual Accent */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-brand-gold/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-bold text-brand-dark uppercase">Since</span>
                <span className="text-2xl font-black text-brand-dark">1999</span>
            </div>
          </div>
          
          <div>
            <SectionHeading 
              title={t.about.title}
            />
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              {t.about.body}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <span className="block text-brand-green font-bold text-lg mb-1">{t.about.chairman_label}</span>
                <span className="text-brand-muted">{t.about.chairman_name}</span>
              </div>
              <div>
                <span className="block text-brand-green font-bold text-lg mb-1">{t.about.location}</span>
                <span className="text-brand-muted">6th October City</span>
              </div>
            </div>
            
            <Link href="/about" className="inline-flex items-center px-8 py-4 rounded-xl bg-brand-dark text-white font-bold hover:bg-brand-green transition-colors">
              {t.about.cta}
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 6. INDUSTRIES CAROUSEL */}
      <div className="py-20 bg-brand-light dark:bg-white/5">
        <div className="container-custom mb-16">
          <SectionHeading 
             title={t.industries.title}
             center
          />
        </div>
        <ClientCarousel />
      </div>

      {/* 7. FINAL CTA */}
      <SectionWrapper id="cta-banner" className="pb-0 pt-10">
        <div className="relative overflow-hidden bg-brand-green rounded-[60px] p-12 md:p-24 text-center text-white shadow-3xl">
          {/* Decorative image */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
             <Image src="/assets/new/Organic Juice  Mockup.png" alt="Overlay" fill className="object-contain" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {t.cta_banner.heading}
            </h2>
            <p className="text-xl text-brand-lime font-medium mb-12">
              {t.cta_banner.sub}
            </p>
            <Link href="/quote" className="inline-block px-12 py-6 rounded-2xl bg-white text-brand-green font-black text-xl hover:scale-105 transition-transform shadow-2xl">
              {t.cta_banner.button}
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
