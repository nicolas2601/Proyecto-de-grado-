// ─────────────────────────────────────────────────────────────────────────
// Motion infrastructure · Lenis smooth scroll + GSAP ScrollTrigger registry
// + magnetic cursor + page reveal sequence.
// All gated on prefers-reduced-motion. transform/opacity only.
// ─────────────────────────────────────────────────────────────────────────

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisRef: Lenis | null = null;
let booted = false;

// Curva enter canónica (cubic-bezier(0.22, 1, 0.36, 1))
export const ENTER = [0.22, 1, 0.36, 1] as const;
// Curva move canónica (cubic-bezier(0.25, 1, 0.5, 1))
export const MOVE = [0.25, 1, 0.5, 1] as const;
// Curva drawer (cubic-bezier(0.32, 0.72, 0, 1))
export const DRAWER = [0.32, 0.72, 0, 1] as const;

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function bootMotion(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (booted) return lenisRef;
  booted = true;

  const reduced = isReducedMotion();

  if (!reduced) {
    lenisRef = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    });

    gsap.registerPlugin(ScrollTrigger);
    lenisRef.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenisRef!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    gsap.registerPlugin(ScrollTrigger);
  }

  return lenisRef;
}

export function teardownMotion() {
  if (lenisRef) {
    lenisRef.destroy();
    lenisRef = null;
  }
  booted = false;
}

export function scrollToSection(idx: number) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector(`[data-section-idx="${idx}"]`);
  if (!el) return;
  if (lenisRef) {
    lenisRef.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Magnetic cursor · ink dot follows pointer with mix-blend-mode difference
// Visible on both navy and paper. Grows on interactive hover.
// ─────────────────────────────────────────────────────────────────────────

export function mountCursor() {
  if (typeof window === 'undefined') return () => {};
  if (isReducedMotion()) return () => {};
  if (window.matchMedia('(hover: none)').matches) return () => {};

  const dot = document.createElement('div');
  dot.setAttribute('aria-hidden', 'true');
  dot.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #FFFFFF;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform, width, height, opacity;
    transition: opacity 280ms cubic-bezier(0.22, 1, 0.36, 1),
                width 220ms cubic-bezier(0.22, 1, 0.36, 1),
                height 220ms cubic-bezier(0.22, 1, 0.36, 1);
  `;
  document.body.appendChild(dot);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let dx = mx;
  let dy = my;
  let raf = 0;
  let hovering = false;

  const isInteractive = (el: Element | null): boolean => {
    if (!el) return false;
    let n: Element | null = el;
    while (n && n !== document.body) {
      const t = n.tagName;
      if (t === 'A' || t === 'BUTTON' || t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || t === 'LABEL') return true;
      const role = (n as HTMLElement).getAttribute?.('role');
      if (role === 'button') return true;
      if ((n as HTMLElement).dataset?.cursor === 'magnetic') return true;
      n = n.parentElement;
    }
    return false;
  };

  const onMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    hovering = isInteractive(e.target as Element);
  };
  const onEnter = () => { dot.style.opacity = '1'; };
  const onLeave = () => { dot.style.opacity = '0'; };

  const loop = () => {
    dx += (mx - dx) * 0.32;
    dy += (my - dy) * 0.32;
    const size = hovering ? 44 : 18;
    const half = size / 2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.transform = `translate3d(${dx - half}px, ${dy - half}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseenter', onEnter);
  document.addEventListener('mouseleave', onLeave);
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseenter', onEnter);
    document.removeEventListener('mouseleave', onLeave);
    dot.remove();
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Magnetic attraction helper · applies subtle pull on hover targets
// Use on buttons or CTA elements via React ref:
//   useEffect(() => { const off = magneticPull(ref.current, 18); return off; }, []);
// ─────────────────────────────────────────────────────────────────────────

export function magneticPull(el: HTMLElement | null, strength = 20): () => void {
  if (!el || typeof window === 'undefined') return () => {};
  if (isReducedMotion()) return () => {};
  if (window.matchMedia('(hover: none)').matches) return () => {};

  let rect = el.getBoundingClientRect();
  const updateRect = () => { rect = el.getBoundingClientRect(); };

  const onMove = (e: MouseEvent) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };
  const onLeave = () => {
    el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = 'translate3d(0, 0, 0)';
    window.setTimeout(() => { el.style.transition = ''; }, 440);
  };
  const onEnter = () => {
    updateRect();
    el.style.transition = '';
  };

  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  window.addEventListener('resize', updateRect);
  window.addEventListener('scroll', updateRect, { passive: true });

  return () => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('resize', updateRect);
    window.removeEventListener('scroll', updateRect);
    el.style.transform = '';
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Page reveal · first paint curtain wipe
// Runs once on initial load (sessionStorage flag to skip on repeat visits)
// ─────────────────────────────────────────────────────────────────────────

export function pageReveal() {
  if (typeof window === 'undefined') return;
  if (isReducedMotion()) return;
  const seen = sessionStorage.getItem('reveal_seen_2026_05_13');
  if (seen) return;

  const curtain = document.createElement('div');
  curtain.setAttribute('aria-hidden', 'true');
  curtain.style.cssText = `
    position: fixed; inset: 0; z-index: 9998;
    background: #0F2C45;
    transform-origin: bottom center;
    will-change: transform, opacity;
  `;
  curtain.innerHTML = `
    <div style="
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      color: #FFFFFF;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0;
      animation: curtainTextIn 280ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards;
    ">UNAB · 2026</div>
    <style>
      @keyframes curtainTextIn { to { opacity: 0.86; } }
    </style>
  `;
  document.body.appendChild(curtain);

  // Wait one frame, then animate out
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      curtain.animate(
        [
          { transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
          { transform: 'translateY(-100%)', clipPath: 'inset(100% 0 0 0)' },
        ],
        { duration: 950, easing: 'cubic-bezier(0.85, 0, 0.15, 1)', delay: 580 }
      ).onfinish = () => {
        curtain.remove();
        sessionStorage.setItem('reveal_seen_2026_05_13', '1');
      };
    });
  });
}
