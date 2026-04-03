'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import CertificateGrid from '@/components/ui/CertificateGrid';
import ClientCarousel from '@/components/ui/ClientCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerFadeIn, imageReveal, killAllTriggers } from '@/lib/animations';

export default function About() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    fadeInUp('.about-header');
    imageReveal(document.querySelector('.about-image-reveal'));
    staggerFadeIn('.stats-grid', '.stat-box', 0.2);
    fadeInUp('.certificates-section');
    return () => killAllTriggers();
  }, [lang]);

  return (
    <main>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-light dark:bg-white/5">
        <div className="container-custom about-header">
           <SectionHeading 
            title={t.about.title}
            center
          />
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed italic">
              "We strive to be the global leader in the manufacture and distribution of natural juices and frozen produce, setting the benchmark for quality and safety."
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="about-image-reveal relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
             <Image 
              src="/assets/new/Organic Juice  Mockup.png" 
              alt="Our Story" 
              fill 
              className="object-contain p-12 bg-white dark:bg-white/5"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              A Legacy of Natural Purity 
              <span className="text-brand-green"> Since 1999</span>
            </h2>
            <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
              <p>{t.about.body}</p>
              <div className="stats-grid grid grid-cols-2 gap-6 pt-10">
                <div className="stat-box p-8 rounded-3xl bg-brand-light dark:bg-brand-dark/50 border border-border/50">
                   <div className="text-3xl font-black text-brand-green mb-1">{t.about.founded_year}</div>
                   <div className="text-xs font-bold uppercase tracking-widest">{t.about.founded_label}</div>
                </div>
                <div className="stat-box p-8 rounded-3xl bg-brand-green text-white shadow-xl shadow-brand-green/20">
                   <div className="text-xl font-bold mb-1 leading-tight">{t.about.chairman_name}</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-brand-lime">{t.about.chairman_label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Certificates */}
      <SectionWrapper id="certificates" className="certificates-section bg-brand-dark text-white rounded-[60px] mx-6 md:mx-16 mb-20">
        <SectionHeading 
          title={t.certificates.title}
          subtitle={t.certificates.subtitle}
          dark
          center
        />
        <div className="mt-16">
          <CertificateGrid items={t.certificates.items} />
        </div>
      </SectionWrapper>

      {/* Clients */}
      <div className="py-20">
        <div className="container-custom mb-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.clients.title}</h3>
            <p className="text-brand-muted">{t.clients.subtitle}</p>
        </div>
        <ClientCarousel />
      </div>

      {/* Locations */}
      <SectionWrapper className="bg-brand-light dark:bg-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div>
             <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-green font-bold text-2xl">01</div>
             <h4 className="text-xl font-bold mb-2">Headquarters</h4>
             <p className="text-brand-muted">{t.about.location}</p>
           </div>
           <div>
             <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-green font-bold text-2xl">02</div>
             <h4 className="text-xl font-bold mb-2">Support</h4>
             <p className="text-brand-muted">{t.footer.phone}</p>
           </div>
           <div>
             <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-green font-bold text-2xl">03</div>
             <h4 className="text-xl font-bold mb-2">Email</h4>
             <p className="text-brand-muted">{t.footer.email}</p>
           </div>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
