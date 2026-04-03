'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t, lang } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-dark text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block relative h-12 w-44 mb-6">
              <Image 
                src="/assets/Logo/imgi_logo_.webp" 
                alt="ElKoubasy Group" 
                fill
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">{t.footer.links_title}</h4>
            <ul className="space-y-4 text-sm text-brand-muted">
              <li><Link href="/" className="hover:text-brand-lime transition-colors">{t.nav.home}</Link></li>
              <li><Link href="/solutions" className="hover:text-brand-lime transition-colors">{t.nav.solutions}</Link></li>
              <li><Link href="/products" className="hover:text-brand-lime transition-colors">{t.nav.products}</Link></li>
              <li><Link href="/industries" className="hover:text-brand-lime transition-colors">{t.nav.industries}</Link></li>
              <li><Link href="/about" className="hover:text-brand-lime transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">{t.products.title}</h4>
            <ul className="space-y-4 text-sm text-brand-muted">
              {t.products.categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.id}`} className="hover:text-brand-lime transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">{t.footer.contact_title}</h4>
            <ul className="space-y-4 text-sm text-brand-muted italic">
              <li className="flex items-start">
                <span className="mr-3 rtl:ml-3">📍</span>
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 rtl:ml-3">📞</span>
                <a href={`tel:${t.footer.phone}`} className="hover:text-brand-lime">{t.footer.phone}</a>
              </li>
              <li className="flex items-center">
                <span className="mr-3 rtl:ml-3">✉️</span>
                <a href={`mailto:${t.footer.email}`} className="hover:text-brand-lime">{t.footer.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clients Strip - Small */}
        <div className="border-t border-white/10 pt-10 flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-700">
           {/* Showing just 4 for the footer */}
           {[1, 2, 3, 4].map(idx => (
             <div key={idx} className="relative h-8 w-24">
                <Image 
                  src={`/assets/clints/imgi-client (${idx}).webp`} 
                  alt="Client" 
                  fill 
                  style={{ objectFit: 'contain' }}
                />
             </div>
           ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <p>{t.footer.rights} {currentYear}</p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
