import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Fade up + reveal on scroll */
export function fadeInUp(el: Element | string | null, delay = 0) {
  if (!el) return;
  return gsap.fromTo(
    el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el as Element,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Stagger multiple children on scroll */
export function staggerFadeIn(
  parent: Element | string | null,
  childSelector: string,
  stagger = 0.12
) {
  if (!parent) return;
  const els = typeof parent === 'string'
    ? document.querySelectorAll(`${parent} ${childSelector}`)
    : (parent as Element).querySelectorAll(childSelector);
  return gsap.fromTo(
    els,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent as Element,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Clip-path image reveal (left to right) */
export function imageReveal(el: Element | null) {
  if (!el) return;
  return gsap.fromTo(
    el,
    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Parallax background element */
export function parallaxBg(el: Element | null, speed = 30) {
  if (!el) return;
  return gsap.to(el, {
    yPercent: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/** Fade in from left */
export function fadeInLeft(el: Element | null, delay = 0) {
  if (!el) return;
  return gsap.fromTo(
    el,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Fade in from right */
export function fadeInRight(el: Element | null, delay = 0) {
  if (!el) return;
  return gsap.fromTo(
    el,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Kill all ScrollTrigger instances (use in useEffect cleanup) */
export function killAllTriggers() {
  ScrollTrigger.getAll().forEach((t: globalThis.ScrollTrigger) => t.kill());
}
