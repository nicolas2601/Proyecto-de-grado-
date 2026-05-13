import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { scrollToSlide } from '@/lib/scroll';
import SplitText from '@/components/reactbits/SplitText';
import Marquee from '@/components/reactbits/Marquee';
import MagneticButton from '@/components/reactbits/MagneticButton';
import CountUp from '@/components/reactbits/CountUp';
import { projectMeta, ham10000, bcn20000, co2wounds } from '@/data/eda';

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_IMAGES = ham10000.size + bcn20000.size + co2wounds.size;

const MARQUEE_TAGS = [
  'SSL',
  'Contrastive Learning',
  'DINO',
  'MAE',
  'HAM10000',
  'BCN20000',
  'CO2WOUNDS-V2',
  'Santander',
  'Vision Transformer',
  'Diagnóstico asistido',
  'CRISP-DM',
  'UNAB · 2026',
];

const HERO_SPECS: { k: string; v: string }[] = [
  { k: 'DOC-ID', v: 'SSL · OBJ-1' },
  { k: 'REV', v: 'A · 2026.05.13' },
  { k: 'FASE', v: 'CRISP-DM · F3' },
  { k: 'TRL', v: '4 · OBJETIVO' },
  { k: 'CORPUS', v: 'HAM + BCN + CO2W' },
  { k: 'VENTANA', v: '32 SEMANAS' },
];

export default function Slide00Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-6%']);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{ background: 'var(--color-canvas-ice)', color: 'var(--color-midnight-ink)' }}
    >
      {/* Ambient radial wash */}
      <div className="absolute inset-0 gradient-architectural pointer-events-none" aria-hidden />

      {/* ─── TOP NAV BAND ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="relative z-20 flex items-center justify-between px-[clamp(24px,5vw,64px)] pt-[clamp(20px,3.5vh,40px)]"
      >
        <span className="eyebrow-up">00 · SUSTENTACIÓN · PROYECTO DE GRADO I</span>
        <span className="eyebrow-up" style={{ color: 'var(--color-fog-gray)' }}>
          2026.05.13 · UNAB · ING. SISTEMAS
        </span>
      </motion.div>

      {/* ─── HERO FOLD ──────────────────────────────────────────── */}
      <motion.section
        style={{ y: heroY }}
        className="relative z-10 px-[clamp(24px,5vw,64px)] pt-[clamp(48px,8vh,96px)] pb-[clamp(40px,6vh,72px)]"
      >
        {/* Headline mega · Bebas */}
        <div className="relative">
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(72px, 14vw, 200px)',
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              color: 'var(--color-midnight-ink)',
            }}
          >
            <span className="block overflow-hidden">
              <SplitText text="APRENDIZAJE" as="span" stagger={0.025} delay={0.2} />
            </span>
            <span className="block overflow-hidden" style={{ marginTop: '-0.04em' }}>
              <SplitText text="AUTOSUPERVISADO" as="span" stagger={0.022} delay={0.5} />
            </span>
            <span
              className="block overflow-hidden font-suisse"
              style={{
                marginTop: '0.18em',
                fontSize: 'clamp(28px, 3.6vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 450,
                textTransform: 'none',
                color: 'var(--color-ash-gray)',
                maxWidth: '24ch',
              }}
            >
              <SplitText
                text="para lesiones cutáneas en Santander."
                as="span"
                stagger={0.012}
                delay={0.95}
              />
            </span>
          </h1>
        </div>

        {/* Subtitle + CTAs row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
          className="mt-[clamp(40px,6vh,72px)] grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,3vw,40px)] items-end"
        >
          <p
            className="lg:col-span-7"
            style={{
              fontSize: 'clamp(18px, 1.6vw, 24px)',
              lineHeight: 1.4,
              fontWeight: 450,
              letterSpacing: '-0.42px',
              color: 'var(--color-ash-gray)',
              maxWidth: '58ch',
            }}
          >
            Detección de carcinoma basocelular, escamocelular y melanoma a partir de
            imágenes dermatológicas. Contexto clínico de Santander, Colombia ·
            preentrenamiento sobre tres corpus sin etiquetar antes del fine-tuning
            diagnóstico.
          </p>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
            <MagneticButton
              as="button"
              strength={0.25}
              onClick={() => scrollToSlide(1)}
              className="btn-primary"
            >
              Iniciar sustentación
              <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              strength={0.2}
              href="https://github.com"
              className="btn-ghost"
            >
              Ver proyecto en GitHub
            </MagneticButton>
            <span
              className="pill-accent"
              style={{ marginLeft: 4 }}
              aria-label="Estado en vivo"
            >
              <span className="pulse-dot" aria-hidden />
              LIVE · EN VIVO
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* ─── HERO CARD TOP-ROUNDED (ink slab) ─────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease: EASE }}
        className="relative z-10 px-[clamp(24px,5vw,64px)]"
      >
        <div className="card-hero-top" style={{ padding: 'clamp(40px,6vw,80px)' }}>
          <div className="flex items-baseline justify-between mb-[clamp(32px,4vw,56px)]">
            <span
              className="eyebrow-up"
              style={{ color: 'var(--color-fog-gray)' }}
            >
              CORPUS NÚCLEO · ESPECIFICACIONES
            </span>
            <span
              className="eyebrow-up"
              style={{ color: 'var(--color-fog-gray)' }}
            >
              TABLE · 01
            </span>
          </div>

          {/* 3 mega metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[clamp(16px,2vw,32px)]">
            <HeroMetric
              colSpan={4}
              value={<CountUp value={TOTAL_IMAGES} duration={2.2} separator="." />}
              label="imágenes núcleo"
              caption="HAM10000 + BCN20000 + CO2W"
            />
            <HeroMetric
              colSpan={4}
              value={<CountUp value={7} duration={1.4} />}
              label="clases dermatológicas"
              caption="taxonomía unificada"
            />
            <HeroMetric
              colSpan={4}
              value={
                <>
                  <CountUp value={co2wounds.patients} duration={1.6} />
                </>
              }
              label="pacientes Santander"
              caption="CO2WOUNDS-V2 · UIS"
            />
          </div>

          {/* Inline KV mini-stats row */}
          <div
            className="mt-[clamp(40px,5vw,72px)] pt-[clamp(24px,3vw,32px)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            {HERO_SPECS.map((row) => (
              <div key={row.k} className="flex flex-col gap-1">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.36,
                    color: 'var(--color-fog-gray)',
                    textTransform: 'uppercase',
                  }}
                >
                  {row.k}
                </span>
                <span
                  className="font-suisse"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--color-paper-white)',
                    letterSpacing: '-0.36px',
                  }}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── AUTHORS BLOCK · 2-col bento ─────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        viewport={{ once: true }}
        className="relative z-10 px-[clamp(24px,5vw,64px)] mt-[clamp(40px,6vh,72px)] grid grid-cols-1 lg:grid-cols-12 gap-[clamp(16px,2vw,24px)]"
      >
        {/* AGRADECIMIENTOS · col 7 */}
        <div className="card lg:col-span-7" style={{ padding: 'clamp(32px,3.5vw,48px)' }}>
          <div className="flex items-center justify-between mb-6">
            <span className="eyebrow-up">Agradecimientos · equipo</span>
            <span className="pill">3 personas</span>
          </div>
          <div className="space-y-5">
            <Person
              role="DIRECTOR"
              name={projectMeta.director}
              meta="UNAB · Ingeniería de Sistemas"
            />
            <div className="h-px" style={{ background: 'rgba(0,0,0,0.06)' }} aria-hidden />
            <Person
              role="ASESORA"
              name={projectMeta.advisor}
              meta={projectMeta.advisorAffiliation}
            />
            <div className="h-px" style={{ background: 'rgba(0,0,0,0.06)' }} aria-hidden />
            <Person
              role="CO-AUTORA"
              name={projectMeta.authors[1]}
              meta="UNAB · co-investigadora"
            />
          </div>
        </div>

        {/* ABSTRACT card-accent · col 5 */}
        <div className="card-accent lg:col-span-5" style={{ padding: 'clamp(32px,3.5vw,48px)' }}>
          <div className="flex items-center justify-between mb-6">
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: 0.36,
                textTransform: 'uppercase',
                color: 'var(--color-midnight-ink)',
              }}
            >
              Abstract · referencia
            </span>
            <span
              className="pill-ink"
              style={{ fontSize: 11 }}
            >
              EN
            </span>
          </div>

          <p
            className="font-suisse"
            style={{
              fontSize: 17,
              lineHeight: 1.5,
              fontWeight: 450,
              letterSpacing: '-0.36px',
              color: 'var(--color-midnight-ink)',
              maxWidth: '36ch',
            }}
          >
            Aprendizaje autosupervisado aplicado al dominio dermatológico, evaluado
            sobre un split clínico santandereano construido desde cero · Objetivo 1
            cubre el análisis exploratorio del corpus.
          </p>

          <div
            className="mt-6 pt-6"
            style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: 15,
                lineHeight: 1.45,
                color: 'var(--color-midnight-ink)',
                fontStyle: 'italic',
                maxWidth: '36ch',
              }}
            >
              “…the lack of large, publicly available datasets of dermatoscopic
              images has been a major obstacle…”
            </p>
            <p
              className="mt-3 font-mono"
              style={{
                fontSize: 11,
                letterSpacing: 0.36,
                textTransform: 'uppercase',
                color: 'var(--color-deep-smoke)',
              }}
            >
              Tschandl · Rosendahl · Kittler · 2018
            </p>
          </div>
        </div>
      </motion.section>

      {/* ─── DISCREET MARQUEE ──────────────────────────────────── */}
      <div className="relative z-10 mt-[clamp(40px,6vh,72px)] pb-[clamp(24px,4vh,40px)]">
        <div
          className="py-3"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <Marquee duration={64} fade>
            {MARQUEE_TAGS.map((tag, i) => (
              <span
                key={i}
                className="font-mono"
                style={{
                  marginInline: 24,
                  fontSize: 13,
                  letterSpacing: '-0.36px',
                  color: 'var(--color-fog-gray)',
                  textTransform: 'none',
                }}
              >
                {tag}
                <span style={{ marginLeft: 24, color: 'rgba(0,0,0,0.18)' }}>·</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* ─── SCROLL HINT (bottom-right) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-[clamp(20px,4vh,32px)] right-[clamp(24px,5vw,48px)] inline-flex items-center gap-3 no-print"
      >
        <span
          className="font-mono"
          style={{
            fontSize: 12,
            color: 'var(--color-ash-gray)',
            letterSpacing: '-0.36px',
          }}
        >
          presiona
        </span>
        <span className="kbd">→</span>
        <span
          className="font-mono"
          style={{
            fontSize: 12,
            color: 'var(--color-ash-gray)',
            letterSpacing: '-0.36px',
          }}
        >
          para continuar
        </span>
      </motion.div>
    </div>
  );
}

function HeroMetric({
  colSpan,
  value,
  label,
  caption,
}: {
  colSpan: number;
  value: React.ReactNode;
  label: string;
  caption: string;
}) {
  return (
    <div
      className="flex flex-col"
      style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
    >
      <span
        className="font-display tabular-nums"
        style={{
          fontSize: 'clamp(64px, 9vw, 130px)',
          lineHeight: 0.86,
          letterSpacing: '-0.04em',
          fontWeight: 400,
          color: 'var(--color-paper-white)',
        }}
      >
        {value}
      </span>
      <span
        className="mt-3 font-mono"
        style={{
          fontSize: 12,
          letterSpacing: 0.36,
          textTransform: 'uppercase',
          color: 'var(--color-action-green)',
        }}
      >
        {label}
      </span>
      <span
        className="mt-1 font-mono"
        style={{
          fontSize: 11,
          color: 'var(--color-fog-gray)',
          letterSpacing: '-0.36px',
          textTransform: 'none',
        }}
      >
        {caption}
      </span>
    </div>
  );
}

function Person({
  role,
  name,
  meta,
}: {
  role: string;
  name: string;
  meta: string;
}) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-3">
      <span className="col-span-3 eyebrow-up">{role}</span>
      <div className="col-span-9">
        <p
          className="font-suisse"
          style={{
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '-0.42px',
            color: 'var(--color-midnight-ink)',
          }}
        >
          {name}
        </p>
        <p
          className="font-mono mt-0.5"
          style={{
            fontSize: 12,
            color: 'var(--color-ash-gray)',
            letterSpacing: '-0.36px',
          }}
        >
          {meta}
        </p>
      </div>
    </div>
  );
}
