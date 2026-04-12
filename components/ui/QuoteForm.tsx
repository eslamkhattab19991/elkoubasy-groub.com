'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const QuoteForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', product: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-green/10 p-10 rounded-3xl border border-brand-green/20 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4">{t.quote.success_title}</h3>
        <p className="text-brand-muted">{t.quote.success_body}</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-bold text-brand-green hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.name}</label>
          <input 
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" 
            placeholder={t.quote.fields.name_placeholder}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.company}</label>
          <input 
            required
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text" 
            placeholder={t.quote.fields.company_placeholder}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.email}</label>
          <input 
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email" 
            placeholder={t.quote.fields.email_placeholder}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.phone}</label>
          <input 
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel" 
            placeholder={t.quote.fields.phone_placeholder}
            className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.product}</label>
        <select 
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green outline-none transition-all"
        >
          <option value="">{t.products.filter_all}</option>
          {t.products.categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-brand-muted">{t.quote.fields.message}</label>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder={t.quote.fields.message_placeholder}
          className="w-full px-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-border focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all resize-none"
        />
      </div>

      <button 
        disabled={isSubmitting}
        type="submit"
        className="w-full py-5 rounded-2xl bg-brand-green text-white font-bold text-lg shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse"
      >
        {isSubmitting ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>{t.quote.fields.submit}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default QuoteForm;
