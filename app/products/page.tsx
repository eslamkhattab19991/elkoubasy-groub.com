'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerFadeIn, killAllTriggers } from '@/lib/animations';

export default function Products() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fadeInUp('.products-header');
    staggerFadeIn('.products-grid-container', '.product-card-wrapper', 0.1);
    return () => killAllTriggers();
  }, [lang, activeCategory]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return t.products.items;
    return t.products.items.filter(p => p.category === activeCategory);
  }, [activeCategory, t.products.items]);

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-12 bg-brand-light dark:bg-white/5">
        <div className="container-custom text-center products-header">
          <SectionHeading 
            title={t.products.title}
            subtitle={t.products.subtitle}
            center
          />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === 'all' 
                ? 'bg-brand-green text-white shadow-lg' 
                : 'bg-white dark:bg-white/10 text-brand-muted hover:text-brand-green'
              }`}
            >
              {t.products.filter_all}
            </button>
            {t.products.categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat.id 
                  ? 'bg-brand-green text-white shadow-lg' 
                  : 'bg-white dark:bg-white/10 text-brand-muted hover:text-brand-green'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <SectionWrapper className="products-grid-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard 
                id={product.id}
                name={product.name}
                desc={product.desc}
                category={t.products.categories.find(c => c.id === product.category)?.label || ''}
                imageSrc={`/assets/catagory/imgi_${
                  product.category === 'juices' ? 1 : 
                  product.category === 'vegetables' ? 2 : 3
                }_category.webp`}
              />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-brand-muted italic">
            No products found in this category.
          </div>
        )}
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark className="mb-20 rounded-[60px] mx-6 md:mx-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
            Need a Custom Quote for Bulk Orders?
          </h2>
          <p className="text-lg text-brand-muted mb-12">
            We provide tailored solutions for wholesalers, retailers, and food service providers worldwide.
          </p>
          <Link href="/quote" className="px-12 py-6 rounded-2xl bg-brand-gold text-brand-dark font-black text-xl hover:scale-105 transition-transform">
            Request Business Quote
          </Link>
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
