'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function HeroSequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Based on user files ezgif-frame-009 to 032
    // total 24 frames
    const frameCount = 24;
    // Padded string e.g., 009, 010... etc
    const currentFrame = (index: number) => {
      const actualIndex = index + 9;
      const paddedId = actualIndex.toString().padStart(3, '0');
      return `/assets/sequence/ezgif-frame-${paddedId}.jpg`;
    };

    const images: HTMLImageElement[] = [];
    const airpods = {
      frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    const render = () => {
      const img = images[airpods.frame];
      if (img && img.complete && canvas && context) {
        // clear and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // draw to center/contain or cover? Let's contain to avoid cutting the frames
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio); // Use min for contain, max for cover
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    images[0].onload = () => {
        handleResize(); // Render first frame when loaded
    };

    // Scroll trigger - note: we won't pin the whole hero if we just want the canvas to animate on scroll while viewing hero.
    // However, typical scrolltelling pins the element so it scrubs before moving to next section.
    // In our case we will pin the container (the right side of hero or hero itself).
    // Let's create a trigger based on the section
    const heroSection = document.querySelector('.hero-section-trigger');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection || containerRef.current,
        start: 'top top',
        end: '+=1000', // Scrubs for 1000px of scrolling
        scrub: 0.5, // smooth scrubbing
        pin: true, // pin the section so user scrolls through frames before proceeding
        anticipatePin: 1
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render
    });

    // Handle resize
    const handleResize = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            render();
        }
    }
    
    window.addEventListener('resize', handleResize);
    // initial set
    setTimeout(handleResize, 100);

    return () => {
      tl.kill();
      // We manually clear scrolltriggers created here
      ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === heroSection || t.trigger === containerRef.current) {
              t.kill();
          }
      });
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full object-contain drop-shadow-2xl mix-blend-screen" />
    </div>
  );
}
