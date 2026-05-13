import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;
let initialized = false;

/**
 * Singleton Lenis instance · solo se monta una vez por sesión.
 * Wires GSAP ScrollTrigger ticker para que ambas librerías compartan el frame loop.
 */
export function getLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: reduced ? 0 : 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduced,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    infinite: false,
  });

  if (!initialized) {
    gsap.registerPlugin(ScrollTrigger);
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    initialized = true;
  }

  return lenisInstance;
}

/**
 * Smooth scroll a un slide específico · usa Lenis si está activo, fallback nativo.
 */
export function scrollToSlide(idx: number) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector(`[data-slide-idx="${idx}"]`) as HTMLElement | null;
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
