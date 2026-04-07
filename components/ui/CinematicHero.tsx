'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });

export default function CinematicHero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 176 frames from 001 to 176
    const frameCount = 176;
    const currentFrame = (index: number) => {
      const actualIndex = index + 1;
      const paddedId = actualIndex.toString().padStart(3, '0');
      return `/assets/sequence_hero/ezgif-frame-${paddedId}.jpg`;
    };

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };
    let loadedCount = 0;

    // Preload frames
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1) render(); // render first frame instantly
            if (loadedCount === frameCount) setImagesLoaded(true);
        };
    }

    const render = () => {
      const img = images[sequence.frame];
      if (img && img.complete && canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Use Max ratio for "cover" style filling, maintaining aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); 
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(
          img, 
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
    };

    // Hero GSAP Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3500', // Scroll length for the entire sequence + text animation
        scrub: 1.2, // Smooth scrubbing
        pin: true, // Scrub through entire sequence smoothly
        anticipatePin: 1
      }
    });

    // 1. Image Sequence Animation (animates throughout the scroll duration)
    tl.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      duration: 1
    }, 0);

    // 2. Text Animations Tied to Scroll (starts simultaneously with the sequence)
    
    // Animate Heading (Fade in + Move UP + Letter-spacing expansion)
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 150, letterSpacing: '0px' },
      { opacity: 1, y: 0, letterSpacing: '8px', ease: 'power2.out', duration: 0.3 },
      0.1
    );

    // Subtle parallax shift up during rest of scroll
    tl.to(headingRef.current, { y: -80, letterSpacing: '14px', opacity: 0, duration: 0.5 }, 0.5);

    // Animate Subtitle (Fade in + slide up)
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.25 },
      0.2
    );

    // Fade out subtitle towards end
    tl.to(subtitleRef.current, { y: -50, opacity: 0, duration: 0.4 }, 0.6);

    // Animate CTA (Slide in + Scale slightly + Fade in)
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.25 },
      0.3
    );

    // Fade out CTA towards end
    tl.to(ctaRef.current, { y: -30, opacity: 0, duration: 0.4 }, 0.6);

    // Subtle canvas slow scale up for cinematic depth
    tl.to(canvas, { scale: 1.15, ease: 'power1.inOut', duration: 1 }, 0);

    const handleResize = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            render();
        }
    }
    
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 50);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === containerRef.current) t.kill();
      });
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center pointer-events-auto">
      {/* Sequence Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full object-cover opacity-90 transition-opacity duration-1000" style={{ opacity: imagesLoaded ? 0.9 : 0 }} />
        
        {/* Soft Vignette Blending to text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />
        
        {/* Parallax Depth / Gentle Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] z-[1]" />
      </div>

      {/* Main Text Content */}
      <div 
        ref={textContainerRef} 
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-6 mt-16 pointer-events-none"
      >
        <h1 
          ref={headingRef}
          className={`${playfair.className} text-5xl md:text-7xl lg:text-[7.5rem] font-black text-white leading-tight md:leading-[1.1] mb-6 md:mb-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] px-4 opacity-0`}
        >
          {t.hero.tagline.split(', ').map((part: string, i: number) => (
            <span key={i} className={i === 1 ? 'text-brand-gold' : ''}>
              {part}{i === 0 ? ',' : ''} <br className="hidden md:block" />
            </span>
          ))}
        </h1>

        <div className="flex flex-col items-center w-full max-w-3xl px-4">
           <p 
             ref={subtitleRef}
             className="text-lg md:text-3xl text-white/95 mb-10 md:mb-14 leading-relaxed drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)] font-light tracking-wide opacity-0"
           >
             {t.hero.subtitle}
           </p>
           
           <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 md:gap-8 opacity-0 pointer-events-auto">
             <Link href="/products" className="px-10 md:px-14 py-4 md:py-5 rounded-full bg-brand-gold/95 backdrop-blur-md text-black font-black text-base md:text-xl hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-[0_0_50px_rgba(255,215,0,0.4)] text-center tracking-wide uppercase">
               {t.hero.cta_primary}
             </Link>
             <Link href="/quote" className="px-10 md:px-14 py-4 md:py-5 rounded-full border border-white/50 backdrop-blur-sm text-white font-bold text-base md:text-xl hover:bg-white/10 hover:border-white transition-all duration-300 text-center tracking-wide uppercase">
               {t.hero.cta_secondary}
             </Link>
           </div>
        </div>
      </div>
      
      {/* Fixed Scrolling Indicator that fades out quickly */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
        <span className="text-[10px] md:text-xs text-brand-gold uppercase tracking-[0.4em] mb-4 drop-shadow-lg font-bold">Scroll Experience</span>
        <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-brand-gold via-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

