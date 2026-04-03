'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import QuoteForm from '@/components/ui/QuoteForm';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, killAllTriggers } from '@/lib/animations';

export default function Quote() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    fadeInUp('.quote-content-entrance');
    return () => killAllTriggers();
  }, [lang]);

  return (
    <main>
      <Navbar />
      
      <section className="pt-48 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 quote-content-entrance">
              <SectionHeading 
                title={t.quote.title}
                subtitle={t.quote.subtitle}
              />
              <div className="p-8 md:p-12 rounded-[40px] bg-white dark:bg-white/5 border border-border/50 shadow-2xl">
                <QuoteForm />
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
               {/* Visual Card */}
               <div className="relative h-[300px] w-full rounded-[40px] overflow-hidden shadow-2xl group">
                  <Image 
                    src="/assets/new/Flavors.png" 
                    alt="Contact ElKoubasy" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 rtl:right-10 rtl:left-auto">
                    <span className="text-brand-gold font-bold text-sm uppercase tracking-widest">Global Supply</span>
                    <h3 className="text-2xl font-bold text-white mt-2">Ready to Export</h3>
                  </div>
               </div>

               {/* Contact Info */}
               <div className="p-10 rounded-[40px] bg-brand-dark text-white border border-white/5">
                 <h4 className="text-xl font-bold mb-8 text-brand-lime">Contact Details</h4>
                 <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-6 rtl:ml-6 flex-shrink-0">
                         📍
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/40 uppercase mb-1">Our Facility</div>
                        <div className="text-sm font-medium">{t.footer.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-6 rtl:ml-6 flex-shrink-0">
                         📞
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/40 uppercase mb-1">Phone & WhatsApp</div>
                        <div className="text-sm font-medium">{t.footer.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-6 rtl:ml-6 flex-shrink-0">
                         ✉️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/40 uppercase mb-1">Email Inquiry</div>
                        <div className="text-sm font-medium">{t.footer.email}</div>
                      </div>
                    </div>
                 </div>
               </div>

               {/* Trust Badges */}
               <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
                  <div className="relative h-10 w-20">
                    <Image src="/assets/certificate/imgi_1_certificate.webp" alt="ISO" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="relative h-10 w-20">
                    <Image src="/assets/certificate/imgi_2_certificate.webp" alt="NFSA" fill style={{ objectFit: 'contain' }} />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
