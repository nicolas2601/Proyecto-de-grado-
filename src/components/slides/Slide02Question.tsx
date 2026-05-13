import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from '@/components/reactbits/Marquee';

const EASE = [0.16, 1, 0.3, 1] as const;

const QUESTION =
  '¿Cómo diseñar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas que apoye el diagnóstico clínico en centros médicos del departamento de Santander?';

// Words to render with green inline highlight (.accent-hl)
const HIGHLIGHT_WORDS = new Set(['autosupervisado', 'Santander']);

const KEYWORDS = [
  'SSL',
  'Contrastive Learning',
  'DINO',
  'MAE',
  'Vision Transformer',
  'Dermatoscopia',
  'HAM10000',
  'BCN20000',
  'F1-Macro',
  'Clinical-Split',
  'KAUST',
  'UNAB',
];

// ──────────────────────────────────────────────────────────────────────────
// TYPED QUESTION · char-by-char, inline highlights via accent-hl
// ──────────────────────────────────────────────────────────────────────────

function TypedQuestion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(QUESTION.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= QUESTION.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const done = count >= QUESTION.length;

  // Tokenize for inline accent rendering
  const tokens = useMemo(() => {
    const visible = QUESTION.slice(0, count);
    return visible.split(/(\s+)/);
  }, [count]);

  return (
    <div ref={ref} className="relative">
      <p
        className="font-suisse"
        style={{
          fontSize: 'clamp(28px, 4.4vw, 72px)',
          lineHeight: 1.12,
          letterSpacing: '-1.6px',
          fontWeight: 500,
          color: 'var(--color-midnight-ink)',
        }}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const clean = tok.replace(/[¿?.,]/g, '');
          const isHighlight = HIGHLIGHT_WORDS.has(clean);
          return (
            <span
              key={i}
              className={isHighlight ? 'accent-hl' : ''}
              style={isHighlight ? { fontWeight: 600 } : undefined}
            >
              {tok}
            </span>
          );
        })}
        {!done && (
          <span
            aria-hidden
            className="inline-block ml-1"
            style={{
              width: '0.5ch',
              height: '0.9em',
              verticalAlign: '-0.05em',
              background: 'var(--color-midnight-ink)',
              animation: 'q2caret 1.05s steps(1) infinite',
              borderRadius: 2,
            }}
          />
        )}
      </p>
      <style>{`@keyframes q2caret { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SLIDE
// ──────────────────────────────────────────────────────────────────────────

export default function Slide02Question() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: 'var(--color-canvas-ice)',
        color: 'var(--color-midnight-ink)',
      }}
    >
      <div className="absolute inset-0 gradient-architectural pointer-events-none" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-[clamp(24px,5vw,64px)] py-[clamp(56px,8vw,96px)]">
        {/* ── HEADER ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <span className="eyebrow-up">02 · PREGUNTA DE INVESTIGACIÓN</span>
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: 0.36,
              textTransform: 'uppercase',
              color: 'var(--color-ash-gray)',
            }}
          >
            Q.001
          </span>
        </motion.div>

        {/* ── PREGUNTA LITERAL ──────────────────────────── */}
        <div className="mt-[clamp(40px,5vw,72px)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="pulse-dot-ink" aria-hidden />
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                letterSpacing: '-0.36px',
                color: 'var(--color-ash-gray)',
              }}
            >
              &gt;_ Cita literal del anteproyecto · página 23
            </span>
          </div>
          <TypedQuestion />
        </div>

        {/* ── HIPÓTESIS + FALSACIÓN ─────────────────────── */}
        <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-1 lg:grid-cols-12 gap-[clamp(16px,2vw,24px)]">
          {/* HIPÓTESIS · col 7 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
            className="card lg:col-span-7 flex flex-col"
            style={{ padding: 'clamp(32px,3.5vw,48px)' }}
          >
            <div className="flex items-baseline justify-between">
              <span className="eyebrow-up">── Hipótesis · H1</span>
              <span
                className="pill-accent"
                style={{ fontSize: 11 }}
              >
                falsable
              </span>
            </div>

            <p
              className="font-suisse mt-6"
              style={{
                fontSize: 'clamp(20px, 2vw, 28px)',
                lineHeight: 1.3,
                fontWeight: 450,
                letterSpacing: '-0.72px',
                color: 'var(--color-midnight-ink)',
              }}
            >
              Un modelo SSL preentrenado sobre el corpus{' '}
              <span style={{ fontWeight: 600 }}>HAM10000 + BCN20000</span> supera
              al baseline supervisado en al menos{' '}
              <span className="accent-hl" style={{ fontWeight: 600 }}>5 pp</span> de
              F1-macro sobre el split clínico.
            </p>

            <div
              className="mt-8"
              style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
            >
              {[
                { k: 'Métrica', v: 'F1-macro' },
                { k: 'Delta mínimo', v: '+ 5,00 pp' },
                { k: 'Split', v: 'Clinical' },
              ].map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: EASE }}
                  viewport={{ once: true }}
                  className="grid grid-cols-12 items-center"
                  style={{
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    minHeight: 56,
                  }}
                >
                  <span
                    className="col-span-6 font-mono"
                    style={{
                      fontSize: 12,
                      letterSpacing: 0.36,
                      textTransform: 'uppercase',
                      color: 'var(--color-ash-gray)',
                    }}
                  >
                    {row.k}
                  </span>
                  <span
                    className="col-span-6 text-right font-suisse tabular-nums"
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      letterSpacing: '-0.42px',
                      color: 'var(--color-midnight-ink)',
                    }}
                  >
                    {row.v}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FALSACIÓN · col 5 · ink */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            viewport={{ once: true }}
            className="card-solid lg:col-span-5 flex flex-col justify-between"
            style={{ padding: 'clamp(32px,3.5vw,48px)' }}
          >
            <div>
              <div className="flex items-baseline justify-between">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.36,
                    textTransform: 'uppercase',
                    color: 'var(--color-fog-gray)',
                  }}
                >
                  ── Falsación
                </span>
                <span
                  className="pill-yellow"
                  style={{ fontSize: 11 }}
                >
                  rechazo
                </span>
              </div>

              <p
                className="mt-6 font-display tabular-nums"
                style={{
                  fontSize: 'clamp(72px, 10vw, 130px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-alert-yellow)',
                }}
              >
                Δ &lt; 5,00 PP
              </p>

              <p
                className="mt-6 font-suisse"
                style={{
                  fontSize: 'clamp(15px, 1.3vw, 18px)',
                  lineHeight: 1.45,
                  fontWeight: 450,
                  letterSpacing: '-0.36px',
                  color: 'var(--color-fog-gray)',
                  maxWidth: '36ch',
                }}
              >
                Si el delta queda por debajo del umbral en al menos{' '}
                <span style={{ color: 'var(--color-paper-white)', fontWeight: 500 }}>
                  3 corridas independientes
                </span>
                , la hipótesis se rechaza y el proyecto pivota a fine-tuning
                supervisado puro.
              </p>
            </div>

            <div
              className="mt-10 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: 0.36,
                  textTransform: 'uppercase',
                  color: 'var(--color-fog-gray)',
                  display: 'block',
                }}
              >
                Corridas independientes
              </span>
              <div className="mt-4 flex items-center gap-6 flex-wrap">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="pulse-dot" aria-hidden />
                    <span
                      className="font-mono tabular-nums"
                      style={{
                        fontSize: 13,
                        color: 'var(--color-paper-white)',
                        letterSpacing: '-0.36px',
                      }}
                    >
                      RUN · {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CRITERIO STRIP ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          viewport={{ once: true }}
          className="card-fog mt-[clamp(24px,3vw,40px)] flex items-center justify-between flex-wrap gap-y-3"
          style={{
            padding: 'clamp(20px,2vw,28px) clamp(28px,3vw,40px)',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: 0.36,
              textTransform: 'uppercase',
              color: 'var(--color-ash-gray)',
            }}
          >
            Umbral de decisión
          </span>
          <span
            className="font-mono tabular-nums"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              letterSpacing: '-0.36px',
              color: 'var(--color-midnight-ink)',
              fontWeight: 500,
            }}
          >
            Δ ≥ 5,00 pp · F1-macro · Clinical-Split · 3 runs independientes
          </span>
          <span className="pill-accent" style={{ fontSize: 11 }}>
            criterio único
          </span>
        </motion.div>

        {/* ── KEYWORDS TICKER ──────────────────────────── */}
        <div className="mt-[clamp(40px,5vw,72px)]">
          <div className="flex items-baseline justify-between mb-6">
            <span className="eyebrow-up">Conceptos clave</span>
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: 0.36,
                textTransform: 'uppercase',
                color: 'var(--color-ash-gray)',
              }}
            >
              12 nodos · loop
            </span>
          </div>

          <div
            className="py-3"
            style={{
              borderTop: '1px solid rgba(0,0,0,0.08)',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Marquee duration={42} fade pauseOnHover>
              {KEYWORDS.map((kw) => (
                <span
                  key={kw}
                  className="pill"
                  style={{
                    fontSize: 13,
                    marginInline: 8,
                    background: 'var(--color-paper-white)',
                    color: 'var(--color-midnight-ink)',
                  }}
                >
                  <span
                    className="pulse-dot-ink"
                    style={{ width: 5, height: 5 }}
                    aria-hidden
                  />
                  {kw}
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <div className="mt-12 flex items-baseline justify-between flex-wrap gap-y-3">
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '-0.36px',
              color: 'var(--color-ash-gray)',
            }}
          >
            → Marco metodológico · §03
          </span>
          <span
            className="font-mono inline-flex items-center gap-2"
            style={{
              fontSize: 12,
              letterSpacing: '-0.36px',
              color: 'var(--color-ash-gray)',
            }}
          >
            navegar <span className="kbd">←</span><span className="kbd">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
