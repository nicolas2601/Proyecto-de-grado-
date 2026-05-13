import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from '@/components/reactbits/Marquee';

const EASE = [0.16, 1, 0.3, 1] as const;

const QUESTION =
  '¿Cómo diseñar un algoritmo de IA basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas que apoye el diagnóstico clínico en centros médicos de Santander?';

// Palabras que rompen con un peso tipográfico distinto (Inter 300 vs Roboto Thin 100)
const ACCENT_WORDS = new Set([
  'autosupervisado',
  'Santander?',
  'Santander',
  'apoye',
]);

const KEYWORDS = [
  'SSL',
  'CONTRASTIVE LEARNING',
  'DINO',
  'MAE',
  'VISION TRANSFORMER',
  'DERMATOSCOPIA',
  'HAM10000',
  'BCN20000',
  'F1-MACRO',
  'CLINICAL-SPLIT',
  'KAUST',
  'UNAB',
];

// ──────────────────────────────────────────────────────────────────────────
// TYPED QUESTION · char-by-char, mantiene acentos via runtime weight swap
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
    }, 22);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const done = count >= QUESTION.length;

  // Tokenizamos el texto visible por palabra, manteniendo espacios
  const tokens = useMemo(() => {
    const visible = QUESTION.slice(0, count);
    return visible.split(/(\s+)/);
  }, [count]);

  return (
    <div ref={ref} className="relative">
      <p
        className="font-ev"
        style={{
          fontSize: 'clamp(36px, 4.6vw, 72px)',
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          fontWeight: 100,
          color: '#292929',
        }}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const clean = tok.replace(/[¿?.,]/g, '');
          const isAccent = ACCENT_WORDS.has(clean) || ACCENT_WORDS.has(tok);
          return (
            <span
              key={i}
              className={isAccent ? 'font-nh' : ''}
              style={
                isAccent
                  ? {
                      fontFamily:
                        "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",
                      fontWeight: 300,
                      letterSpacing: '-0.025em',
                    }
                  : undefined
              }
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
              width: '0.45ch',
              height: '0.9em',
              verticalAlign: '-0.05em',
              background: '#292929',
              animation: 'q2caret 1.05s steps(1) infinite',
            }}
          />
        )}
        {done && (
          <span
            aria-hidden
            className="inline-block ml-1"
            style={{
              width: '0.45ch',
              height: '0.9em',
              verticalAlign: '-0.05em',
              background: '#292929',
              animation: 'q2caret 1.5s steps(1) infinite',
            }}
          />
        )}
      </p>
      <style>{`@keyframes q2caret { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────

export default function Slide02Question() {
  const ref = useRef<HTMLDivElement>(null);
  const inViewMain = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-canvas-white text-ink-black">
      {/* Vertical rules */}
      <div
        className="absolute top-0 bottom-0 left-[clamp(24px,5vw,80px)] w-px bg-grey-100 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-0 bottom-0 right-[clamp(24px,5vw,80px)] w-px bg-grey-100 pointer-events-none"
        aria-hidden
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(40px,7vw,120px)] py-[clamp(36px,5vw,64px)]">
        {/* ── TOP BAR ────────────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="eyebrow"
            style={{ fontSize: '13px' }}
          >
            02 · PREGUNTA DE INVESTIGACIÓN
          </motion.span>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#646464',
            }}
          >
            Q.001
          </span>
        </div>

        <div className="mt-4 h-px bg-ink-black" aria-hidden />

        {/* ── PREGUNTA GIGANTE ───────────────────────────────────────── */}
        <div className="mt-8">
          <span
            className="font-condensed uppercase inline-flex items-center gap-3"
            style={{
              fontSize: '12px',
              letterSpacing: '0.22em',
              color: '#646464',
              fontWeight: 400,
            }}
          >
            <span className="pulse-dot" aria-hidden />
            FORMULACIÓN · ANTEPROYECTO
          </span>
          <div className="mt-4">
            <TypedQuestion />
          </div>

          {/* Rule scaleX al final del tipeo */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inViewMain ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 2.3, ease: EASE }}
            className="mt-8 h-px bg-ink-black origin-left"
            aria-hidden
          />
        </div>

        {/* ── HIPÓTESIS + FALSACIÓN ──────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* LEFT · HIPÓTESIS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
            className="lg:col-span-7 card"
            style={{
              padding: 'clamp(24px, 3vw, 36px)',
              borderRight: 'none',
            }}
          >
            <div className="flex items-baseline justify-between">
              <span
                className="font-condensed uppercase"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.22em',
                  color: '#292929',
                  fontWeight: 500,
                }}
              >
                ── HIPÓTESIS · H1
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: '#646464',
                }}
              >
                FALSABLE
              </span>
            </div>

            <div className="mt-5 h-px bg-ink-black" aria-hidden />

            <div className="relative mt-7 overflow-hidden">
              <motion.p
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.4, delay: 2.5, ease: EASE }}
                viewport={{ once: true }}
                className="font-nh"
                style={{
                  fontSize: 'clamp(22px, 2vw, 32px)',
                  lineHeight: 1.25,
                  color: '#292929',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                }}
              >
                Un modelo SSL preentrenado sobre el corpus{' '}
                <span style={{ fontWeight: 500 }}>HAM10000 + BCN20000</span>{' '}
                supera al baseline supervisado en al menos{' '}
                <span style={{ fontWeight: 500 }}>5 pp de F1-macro</span> sobre el
                split clínico.
              </motion.p>
            </div>

            {/* Tabla compacta */}
            <div
              className="mt-8"
              style={{ borderTop: '1px solid #292929' }}
            >
              {[
                { k: 'MÉTRICA', v: 'F1-MACRO' },
                { k: 'DELTA MÍN.', v: '+ 5,00 pp' },
                { k: 'SPLIT', v: 'CLINICAL' },
              ].map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 + i * 0.08, ease: EASE }}
                  viewport={{ once: true }}
                  className="grid grid-cols-12 items-center"
                  style={{
                    borderBottom: '1px solid #292929',
                    minHeight: '56px',
                  }}
                >
                  <div
                    className="col-span-5 font-condensed uppercase"
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.2em',
                      color: '#646464',
                      fontWeight: 400,
                      paddingLeft: '4px',
                    }}
                  >
                    {row.k}
                  </div>
                  <div
                    className="col-span-7 font-mono tabular-nums text-right"
                    style={{
                      fontSize: '18px',
                      letterSpacing: '0.02em',
                      color: '#292929',
                      fontWeight: 500,
                      paddingRight: '4px',
                    }}
                  >
                    {row.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT · FALSACIÓN */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            viewport={{ once: true }}
            className="lg:col-span-5 card-dark flex flex-col justify-between"
            style={{
              padding: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <div>
              <span
                className="font-condensed uppercase"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.22em',
                  color: '#b4b8b4',
                  fontWeight: 400,
                }}
              >
                ── FALSACIÓN
              </span>

              <p
                className="mt-4 font-display tabular-nums"
                style={{
                  fontSize: 'clamp(40px, 4.6vw, 64px)',
                  lineHeight: 0.95,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                Δ &lt; 5,00 PP
              </p>

              <p
                className="mt-6 font-nh"
                style={{
                  fontSize: 'clamp(18px, 1.4vw, 20px)',
                  lineHeight: 1.45,
                  color: '#ffffff',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                }}
              >
                Si el delta queda por debajo del umbral en al menos{' '}
                <span style={{ fontWeight: 500 }}>3 corridas independientes</span>,
                la hipótesis se rechaza y el proyecto pivotea a fine-tuning
                supervisado puro.
              </p>
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid #646464' }}>
              <span
                className="font-condensed uppercase block"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  color: '#b4b8b4',
                  fontWeight: 400,
                }}
              >
                CORRIDAS INDEPENDIENTES
              </span>
              <div className="mt-4 flex items-center gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="relative inline-block"
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#ffffff',
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute"
                        style={{
                          inset: '-4px',
                          border: '1px solid #ffffff',
                          opacity: 0,
                          animation: `q2pulse 2s ease-out infinite`,
                          animationDelay: `${i * 0.35}s`,
                        }}
                      />
                    </span>
                    <span
                      className="font-mono tabular-nums"
                      style={{
                        fontSize: '13px',
                        color: '#ffffff',
                        letterSpacing: '0.04em',
                      }}
                    >
                      RUN · {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
              <style>{`@keyframes q2pulse {
                0% { opacity: 1; transform: scale(0.8); }
                100% { opacity: 0; transform: scale(2.4); }
              }`}</style>
            </div>
          </motion.div>
        </div>

        {/* ── CRITERIO DE FALSABILIDAD STRIP ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          viewport={{ once: true }}
          className="mt-8 origin-left flex items-center justify-between"
          style={{
            border: '1px solid #292929',
            padding: '14px 20px',
            background: '#ffffff',
          }}
        >
          <span
            className="font-mono tabular-nums"
            style={{
              fontSize: '14px',
              color: '#292929',
              letterSpacing: '0.06em',
              fontWeight: 500,
            }}
          >
            Δ ≥ 5,00 PP · F1-MACRO · CLINICAL-SPLIT
          </span>
          <span
            className="font-condensed uppercase"
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: '#646464',
            }}
          >
            UMBRAL DE DECISIÓN
          </span>
        </motion.div>

        {/* ── KEYWORDS TICKER ────────────────────────────────────────── */}
        <div className="mt-12">
          <div className="flex items-baseline justify-between">
            <span
              className="font-condensed uppercase"
              style={{
                fontSize: '13px',
                letterSpacing: '0.22em',
                color: '#292929',
                fontWeight: 500,
              }}
            >
              ── CONCEPTOS CLAVE
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: '#646464',
              }}
            >
              12 NODOS · LOOP
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
            className="mt-6"
            style={{
              borderTop: '1px solid #292929',
              borderBottom: '1px solid #292929',
              paddingBlock: '14px',
            }}
          >
            <Marquee duration={36} fade pauseOnHover>
              {KEYWORDS.map((kw) => (
                <span
                  key={kw}
                  className="font-condensed uppercase inline-flex items-center"
                  style={{
                    fontSize: '13px',
                    letterSpacing: '0.22em',
                    color: '#292929',
                    fontWeight: 400,
                    padding: '0 28px',
                    height: '28px',
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block"
                    style={{
                      width: '4px',
                      height: '4px',
                      background: '#292929',
                      marginRight: '14px',
                    }}
                  />
                  {kw}
                </span>
              ))}
            </Marquee>
          </motion.div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <div className="mt-12 flex items-baseline justify-between flex-wrap gap-y-3">
          <span
            className="font-mono"
            style={{
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: '#646464',
            }}
          >
            END OF SECTION 02 · GOTO §03 ↓
          </span>
          <span
            className="font-condensed uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.22em',
              color: '#292929',
              fontWeight: 400,
            }}
          >
            → MARCO METODOLÓGICO
          </span>
        </div>
      </div>
    </div>
  );
}
