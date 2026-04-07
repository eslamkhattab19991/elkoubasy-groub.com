'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });

export default function CinematicProductRange() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Refs for the floating categories
  const cat1Ref = useRef<HTMLDivElement>(null);
  const cat2Ref = useRef<HTMLDivElement>(null);
  const cat3Ref = useRef<HTMLDivElement>(null);
  const cat4Ref = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 120; // 001 to 120

    const currentFrame = (index: number) => {
      const actualIndex = index + 1;
      const paddedId = actualIndex.toString().padStart(3, '0');
      return `/assets/sequence3/ezgif-frame-${paddedId}.jpg`;
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=4000', // Scroll length for the entire sequence
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. Image Sequence Animation
    tl.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
      duration: 1
    }, 0);

    // 2. Floating Categories Animation synced with the scroll
    const categories = [cat1Ref, cat2Ref, cat3Ref, cat4Ref];
    const segment = 1 / categories.length; // 0.25 duration each

    categories.forEach((cat, index) => {
      const start = segment * index;
      const mid = start + (segment / 2);
      const end = start + segment;

      // Animate In
      tl.fromTo(cat.current, 
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: segment * 0.4, ease: "power2.out" },
        start
      );

      // Float mid
      tl.to(cat.current, 
        { y: -20, duration: segment * 0.2, ease: "none" },
        start + (segment * 0.4)
      );

      // Animate Out
      tl.to(cat.current,
        { opacity: 0, y: -50, scale: 1.05, duration: segment * 0.4, ease: "power2.in" },
        mid + (segment * 0.1)
      );
    });

    // 3. Button Appearance (Fade in towards the second half of the sequence and stay)
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" },
      0.5 // Start appearing halfway through the scroll
    );

    tl.to(canvas, { scale: 1.1, ease: 'power1.inOut', duration: 1 }, 0);

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
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-[1]" />
        
        {/* Parallax Depth / Gentle Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] z-[1]" />
      </div>

      {/* Floating Category Labels */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full pointer-events-none">
        
        {/* Frozen Vegetables */}
        <div ref={cat1Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 w-full">
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-black text-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] tracking-wider`}>
               Frozen Vegetables
            </h2>
        </div>

        {/* Frozen Frites */}
        <div ref={cat2Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 w-full">
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-black text-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] tracking-wider`}>
               Frozen Frites
            </h2>
        </div>

        {/* Juice */}
        <div ref={cat3Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 w-full">
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-black text-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] tracking-wider`}>
               Premium Juice
            </h2>
        </div>

        {/* Ice Cream */}
        <div ref={cat4Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 w-full">
            <h2 className={`${playfair.className} text-4xl md:text-6xl font-black text-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] tracking-wider`}>
               Ice Cream
            </h2>
        </div>

        {/* Call To Action Button (Matches Hero Section CTA exactly) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full flex justify-center z-20 pointer-events-none">
           <div ref={ctaRef} className="opacity-0 pointer-events-auto flex flex-col sm:flex-row gap-5 md:gap-8">
             <Link href="/products" className="px-10 md:px-14 py-4 md:py-5 rounded-full bg-brand-gold/95 backdrop-blur-md text-black font-black text-base md:text-xl hover:bg-white hover:scale-[1.03] transition-all duration-300 shadow-[0_0_50px_rgba(255,215,0,0.4)] text-center tracking-wide uppercase">
               Explore Full Range
             </Link>
           </div>
        </div>

      </div>
    </section>
  );
}
