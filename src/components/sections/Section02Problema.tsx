import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  PROBLEMA,
  EVIDENCIA_PROBLEMA,
  ARBOL_TREE,
} from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import ProblemGraph from '@/components/ui/ProblemGraph';
import { ENTER } from '@/lib/motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: ENTER, delay },
});

// ── WordReveal · clip-path mask
function WordReveal({
  text,
  delay = 0,
  stagger = 0.035,
  className,
  style,
  as: As = 'h2',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  if (reduced) {
    return (
      <As className={className} style={style}>
        {text}
      </As>
    );
  }
  return (
    <As className={className} style={{ ...style, display: 'block' }} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            paddingBlock: '0.15em',
            marginBlock: '-0.15em',
            verticalAlign: 'top',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.85,
              ease: ENTER,
              delay: delay + i * stagger,
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </As>
  );
}

// ── Counter · scroll-triggered ticker for stats
function Counter({
  to,
  duration = 1.4,
  format = 'int',
  scrambleOnHover = false,
  className,
  style,
}: {
  to: number;
  duration?: number;
  format?: 'int' | 'percent';
  scrambleOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);
  const [scramble, setScramble] = useState(false);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const easeOutExpo = (x: number) =>
      x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const e = easeOutExpo(p);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  // Scramble hover sequence
  useEffect(() => {
    if (!scramble || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = (now - t0) / 400;
      if (p >= 1) {
        setVal(to);
        setScramble(false);
        return;
      }
      // random scramble factor
      setVal(to * (0.6 + Math.random() * 0.8));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scramble, to, reduced]);

  const display =
    format === 'percent'
      ? val.toFixed(2).replace('.', ',') + ' %'
      : Math.round(val).toLocaleString('es-CO');

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={scrambleOnHover ? () => setScramble(true) : undefined}
    >
      {display}
    </span>
  );
}

// ─── Inline SVG icons ────────────────────────────────────
function IconGlobe() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="#0F2C45"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="16" cy="16" r="12" />
      <ellipse cx="16" cy="16" rx="5" ry="12" />
      <path d="M4 16h24" />
      <path d="M6 9.5c2.5 1.5 6.2 2.5 10 2.5s7.5-1 10-2.5" />
      <path d="M6 22.5c2.5-1.5 6.2-2.5 10-2.5s7.5 1 10 2.5" />
    </svg>
  );
}

function IconColombia() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="#1F8C88"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 28s-9-9.4-9-16a9 9 0 1 1 18 0c0 6.6-9 16-9 16Z" />
      <circle cx="16" cy="12" r="3.2" />
    </svg>
  );
}

function IconHospital() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="#B7E1DF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="6" width="22" height="22" rx="2" />
      <path d="M16 11v10" />
      <path d="M11 16h10" />
      <path d="M5 12h22" />
    </svg>
  );
}

export default function Section02Problema() {
  void PROBLEMA;
  const reduced = useReducedMotion();

  return (
    <section
      id="problema"
      className="section relative"
      style={{ background: 'var(--color-paper)' }}
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0"
        style={{ opacity: 0.5 }}
      />

      <div className="container relative">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="eyebrow-num">
          §02 · PLANTEAMIENTO DEL PROBLEMA
        </motion.div>

        <WordReveal
          as="h2"
          text="De lo global a lo regional"
          delay={0.1}
          stagger={0.05}
          className="mt-4"
          style={{
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            maxWidth: '20ch',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--color-navy)',
          }}
        />

        <motion.p
          {...fadeUp(0.4)}
          className="mt-4"
          style={{
            fontSize: 22,
            lineHeight: 1.45,
            maxWidth: '55ch',
            color: 'var(--color-ink-soft)',
          }}
        >
          Tres escalas convergen en una misma deficiencia diagnóstica.
        </motion.p>

        {/* ─── Bento 3-col contexto con stagger 120ms ───────── */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
          }}
        >
          {/* Global */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: ENTER },
              },
            }}
            whileHover={
              reduced
                ? undefined
                : { y: -4, transition: { type: 'spring', stiffness: 280, damping: 22 } }
            }
            className="card"
          >
            <IconGlobe />
            <div className="eyebrow mt-4 flex items-center gap-2 flex-wrap">
              <span>Contexto Global</span>
              <Cite refs={['yang-2024']} tone="paper" />
            </div>
            <p
              className="mt-3"
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                color: 'var(--color-charcoal)',
              }}
            >
              El cáncer de piel es una de las neoplasias más frecuentes en el mundo.
            </p>
          </motion.div>

          {/* Nacional */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: ENTER },
              },
            }}
            whileHover={
              reduced
                ? undefined
                : { y: -4, transition: { type: 'spring', stiffness: 280, damping: 22 } }
            }
            className="card-paper"
            style={{ borderColor: 'rgba(31,140,136,0.4)' }}
          >
            <IconColombia />
            <div
              className="eyebrow mt-4 flex items-center gap-2 flex-wrap"
              style={{ color: 'var(--color-teal)' }}
            >
              <span>Contexto Nacional</span>
              <Cite refs={['cac-2025']} tone="paper" />
            </div>
            <div
              className="font-display tabular-nums mt-3 flex items-baseline gap-2 flex-wrap"
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                color: 'var(--color-navy)',
                lineHeight: 1,
              }}
            >
              <Counter to={11064} scrambleOnHover />
            </div>
            <p
              className="mt-2"
              style={{
                fontSize: 14,
                lineHeight: 1.45,
                color: 'var(--color-ink-soft)',
              }}
            >
              Casos reportados en Colombia durante 2024 · Cuenta de Alto Costo.
            </p>
          </motion.div>

          {/* Regional */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: ENTER },
              },
            }}
            whileHover={
              reduced
                ? undefined
                : { y: -4, transition: { type: 'spring', stiffness: 280, damping: 22 } }
            }
            className="card-navy relative"
          >
            <IconHospital />
            <div
              className="eyebrow mt-4 flex items-center gap-2 flex-wrap"
              style={{ color: '#B7E1DF' }}
            >
              <span>Contexto Regional (HIC)</span>
              <Cite refs={['uribe-2018', 'el-frente-2024']} tone="navy" />
            </div>
            <div
              className="font-display tabular-nums mt-3"
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                color: '#F26B3A',
                lineHeight: 1,
              }}
            >
              <Counter to={3060} scrambleOnHover />
            </div>
            <p
              className="mt-2"
              style={{
                fontSize: 14,
                lineHeight: 1.45,
                color: '#ffffff',
              }}
            >
              Casos registrados en Santander (2016-2023).
            </p>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: '#F26B3A',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.4,
                }}
              >
                <Counter to={64.82} format="percent" /> corresponde a Carcinoma
                Basocelular (BCC)
              </span>
              <Cite refs={['uribe-2018']} tone="navy" />
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Banda paradoja del melanoma · clip-path reveal horizontal ─ */}
        <motion.div
          className="card-orange mt-6 flex flex-col md:flex-row items-start md:items-center gap-4"
          initial={
            reduced
              ? { opacity: 0 }
              : { clipPath: 'inset(0 100% 0 0)', opacity: 1 }
          }
          whileInView={
            reduced
              ? { opacity: 1 }
              : { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
          }
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.95, ease: ENTER, delay: 0.2 }}
          style={{ willChange: 'clip-path' }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            ⚠ Paradoja
          </span>
          <p
            style={{
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.25,
              color: '#ffffff',
              fontWeight: 500,
              letterSpacing: '-0.015em',
            }}
          >
            <strong style={{ fontWeight: 700 }}>LA PARADOJA DEL MELANOMA</strong>
            : Representa solo el 13,66 % de los casos regionales, pero causa el{' '}
            <Counter to={80} format="int" />% de las muertes.
          </p>
          <Cite refs={['cac-2025', 'uribe-2018']} tone="white" />
        </motion.div>

        {/* ─── EVIDENCIA DEL PROBLEMA ─────────────────── */}
        <div className="mt-20">
          <motion.div
            {...fadeUp(0)}
            className="hairline pt-6 flex items-center gap-3"
          >
            <span className="eyebrow">evidencia del problema · 3 puntos</span>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
            }}
          >
            {EVIDENCIA_PROBLEMA.map((ev) => (
              <motion.div
                key={ev.id}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: ENTER },
                  },
                }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -4, transition: { type: 'spring', stiffness: 280, damping: 22 } }
                }
                className="card-paper"
              >
                <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                  {ev.titulo}
                </div>
                <div
                  className="font-display mt-3 tabular-nums flex items-baseline gap-2 flex-wrap"
                  style={{
                    fontSize: 'clamp(28px, 3.2vw, 40px)',
                    color: 'var(--color-navy)',
                    lineHeight: 1,
                  }}
                >
                  <span>{ev.valor}</span>
                  {'refs' in ev && Array.isArray((ev as any).refs) && (ev as any).refs.length > 0 ? (
                    <Cite refs={(ev as any).refs} tone="paper" />
                  ) : null}
                </div>
                <p
                  className="mt-3"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  {ev.detalle}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── ÁRBOL DEL PROBLEMA · constelación causal · 5 capas ─── */}
        <div className="mt-20">
          <motion.div {...fadeUp(0)} className="eyebrow-num">
            Árbol del problema
          </motion.div>

          <motion.h3
            {...fadeUp(0.08)}
            className="mt-3 font-display"
            style={{
              fontSize: 'clamp(22px, 2.4vw, 32px)',
              color: 'var(--color-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              maxWidth: '40ch',
            }}
          >
            Constelación causal: de las condiciones estructurales al impacto sistémico
          </motion.h3>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-3"
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: 'var(--color-graphite)',
              maxWidth: '64ch',
            }}
          >
            Pasa el cursor sobre cada nodo para resaltar su vecindario causal y consultar la fuente.
            Lectura izquierda→derecha: causas indirectas → causas directas → problema central →
            consecuencias directas → consecuencias indirectas.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 relative"
            style={{
              border: '1px solid var(--color-line)',
              background: 'var(--color-paper-warm)',
              borderRadius: 24,
              padding: '24px 16px',
              overflow: 'visible',
            }}
          >
            <ProblemGraph tree={ARBOL_TREE} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
