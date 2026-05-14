import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ENTER } from '@/lib/motion';

// ─────────────────────────────────────────────────────────────────────────
// §00 INICIO · hero cinematográfico full-bleed
// Video dermatoscopia · headline centrado · subtitle Courier mono · CTA
// magnético · brand footer con autores + dirección · scroll cue inferior
// ─────────────────────────────────────────────────────────────────────────

export default function Section00Inicio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.05]);

  // Video fade-in · revela en cuanto haya el primer frame disponible
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Si ya está cargado (cache, HMR), revelar de inmediato
    if (v.readyState >= 2) {
      setVideoLoaded(true);
    }
    const onLoadedData = () => setVideoLoaded(true);
    v.addEventListener('loadeddata', onLoadedData);
    v.play().catch(() => {});
    return () => v.removeEventListener('loadeddata', onLoadedData);
  }, []);

  const scrollNext = () => {
    const next = document.querySelector('[data-section-idx="1"]');
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: '#050505',
        minHeight: '100dvh',
        height: '100dvh',
      }}
    >
      {/* ── BACKGROUND VIDEO · full-bleed ───────────────────── */}
      <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/media/hero-lesion.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Dermatoscopia · imagen clínica de referencia"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1)',
            filter: 'saturate(0.85) contrast(1.05)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.35) 35%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.88) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,5,0.32) 70%, rgba(5,5,5,0.62) 100%)',
          }}
        />
      </motion.div>

      {/* ── HERO CONTENT ──────────────────────────────────── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 h-full w-full flex flex-col items-center justify-center px-5 sm:px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: ENTER }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 32,
          }}
        >
          §00 · Proyecto de Grado I · UNAB · 2026
        </motion.span>

        {/* Headline · 2 líneas */}
        <motion.h1
          className="text-white font-normal leading-[1.08] tracking-tight max-w-4xl"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 4.2rem)',
            letterSpacing: '-0.025em',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: ENTER }}
            className="block"
          >
            Aprendizaje autosupervisado
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.62, ease: ENTER }}
            className="block"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            para lesiones cutáneas en{' '}
            <span style={{ color: '#FFFFFF' }}>Santander</span>
          </motion.span>
        </motion.h1>

        {/* Subtitle · Courier mono */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: ENTER }}
          className="mt-5 md:mt-7 text-white/55 text-sm md:text-base leading-relaxed max-w-md"
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            letterSpacing: '0.01em',
          }}
        >
          un puente entre imágenes dermatológicas
          <br className="hidden sm:block" />
          {' '}y diagnóstico asistido por IA
        </motion.p>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={scrollNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0, ease: ENTER }}
          className="absolute bottom-5 md:bottom-6 left-0 right-0 flex items-center justify-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200"
          style={{
            background: 'transparent',
            border: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          <span>scroll</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v16M6 14l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

