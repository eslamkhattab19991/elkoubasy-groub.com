'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { fadeInUp } from '@/lib/animations';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the homepage, hero is pinned for ~3500px, keep it transparent. 
      // Otherwise, assume a standard 20px threshold.
      const threshold = pathname === '/' ? 3500 : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger early check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.solutions, href: '/solutions' },
    { name: t.nav.products, href: '/products' },
    { name: t.nav.industries, href: '/industries' },
    { name: t.nav.about, href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-brand-dark/80 border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-32 md:h-12 md:w-40 transition-transform hover:scale-105">
          <Image 
            src="/assets/Logo/imgi_logo_.webp" 
            alt="ElKoubasy Group" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-brand-lime"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          
          <Link 
            href="/quote"
            className="ml-4 px-5 py-2.5 rounded-full bg-brand-green text-white text-sm font-semibold transition-all hover:bg-brand-green/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.quote}
          </Link>

          {/* Controls */}
          <div className="flex items-center ml-6 rtl:mr-6 space-x-4 rtl:space-x-reverse border-l rtl:border-r border-border pl-6 rtl:pr-6">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-lime transition-colors"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="p-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-lg font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/quote"
              className="w-full text-center py-3 rounded-xl bg-brand-green text-white text-sm font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.quote}
            </Link>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button 
                onClick={() => {
                  setLang(lang === 'en' ? 'ar' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold uppercase text-white"
              >
                {lang === 'en' ? 'Arabic Version' : 'English Version'}
              </button>
              <button onClick={toggleTheme} className="text-white text-xs font-bold uppercase">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
