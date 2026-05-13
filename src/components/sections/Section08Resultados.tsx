import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RESULTADOS, METRICAS, PUNTOS_ESTRATEGICOS } from '@/data/content';
import { Cite } from '@/components/ui/Cite';

const ENTER = [0.22, 1, 0.36, 1] as const;
const MOVE = [0.25, 1, 0.5, 1] as const;

// ── Counter animado 0→target ───────────────────────────
function CounterMega({ target, reduced }: { target: number; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [val, setVal] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: ENTER,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduced]);

  return (
    <span
      ref={ref}
      className="font-display tabular-nums"
      style={{
        fontSize: 'clamp(120px, 14vw, 180px)',
        lineHeight: 0.85,
        color: 'var(--color-teal-soft)',
        fontWeight: 700,
        letterSpacing: '-0.05em',
      }}
    >
      {val}
    </span>
  );
}

export default function Section07Resultados() {
  const reduced = useReducedMotion() ?? false;
  const trlRef = useRef<HTMLDivElement | null>(null);

  // TRL band parallax scale 0.98 → 1 → 0.98
  const { scrollYProgress: trlProgress } = useScroll({
    target: trlRef,
    offset: ['start end', 'end start'],
  });
  const trlScaleRaw = useTransform(trlProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const trlScale = useSpring(trlScaleRaw, { stiffness: 120, damping: 24, mass: 0.6 });

  // ── Bento 7+5 (clip-path reveal lateral) ──
  const bentoLeft = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, clipPath: 'inset(0 100% 0 0)', x: -16 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          transition: { duration: 0.85, ease: ENTER },
        },
  };
  const bentoRight = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, clipPath: 'inset(0 0 0 100%)', x: 16 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          clipPath: 'inset(0 0 0 0%)',
          x: 0,
          transition: { duration: 0.85, ease: ENTER },
        },
  };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.7, ease: ENTER, delay },
  });

  return (
    <section
      id="resultados"
      className="section relative overflow-hidden"
      style={{ background: 'var(--color-paper)' }}
    >
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} />

      <div className="container relative">
        <motion.div {...fadeIn(0)} className="eyebrow-num mb-6">
          §16 / Resultados esperados
        </motion.div>

        <motion.h2
          {...fadeIn(0.06)}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '22ch',
            color: 'var(--color-navy)',
          }}
        >
          Resultados medibles,{' '}
          <span className="font-serif-it" style={{ color: 'var(--color-orange)' }}>
            no promesas.
          </span>
        </motion.h2>

        {/* ── Bento 7+5 superior ───────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0 } } }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6"
        >
          <motion.div
            variants={bentoLeft}
            className="card-paper lg:col-span-7"
            style={{
              padding: 36,
              minHeight: 240,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              willChange: 'transform, clip-path',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                Entregable técnico
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'var(--color-mist)',
                }}
              >
                01
              </span>
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(31,140,136,0.10)',
                color: 'var(--color-teal)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M7 8h10M7 12h7M7 16h4" />
                <path d="M16 14l3 3-3 3" />
              </svg>
            </div>
            <p
              style={{
                fontSize: 'clamp(18px, 1.5vw, 20px)',
                lineHeight: 1.5,
                color: 'var(--color-navy)',
                fontWeight: 500,
                maxWidth: '50ch',
              }}
            >
              {RESULTADOS.tecnico}
            </p>
          </motion.div>

          <motion.div
            variants={bentoRight}
            className="card-teal lg:col-span-5"
            style={{
              padding: 36,
              minHeight: 240,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              willChange: 'transform, clip-path',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="eyebrow"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                Entregable funcional
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                02
              </span>
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.16)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M3 9h18" />
                <circle cx="7" cy="7" r="0.7" fill="currentColor" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <p
              style={{
                fontSize: 'clamp(17px, 1.4vw, 19px)',
                lineHeight: 1.5,
                color: '#ffffff',
                fontWeight: 500,
                maxWidth: '40ch',
              }}
            >
              {RESULTADOS.funcional}
            </p>
          </motion.div>
        </motion.div>

        {/* ── TRL band · card navy con parallax scale ──── */}
        <motion.div
          ref={trlRef}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.85, ease: ENTER, delay: 0.1 }}
          style={{
            scale: reduced ? 1 : trlScale,
            willChange: 'transform',
          }}
          className="card-navy mt-5 lg:mt-6"
        >
          <div
            style={{ padding: 'clamp(28px, 4vw, 56px)' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
          >
            <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
              <CounterMega target={4} reduced={reduced} />
            </div>
            <div className="lg:col-span-8">
              <div
                className="eyebrow"
                style={{ color: 'var(--color-teal-soft)', marginBottom: 12 }}
              >
                Madurez tecnológica / TRL 4
              </div>
              <p
                style={{
                  fontSize: 'clamp(18px, 1.6vw, 22px)',
                  lineHeight: 1.45,
                  color: '#ffffff',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  maxWidth: '52ch',
                }}
              >
                {RESULTADOS.trl.descripcion}
              </p>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-5%' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['TRL 1', 'TRL 2', 'TRL 3', 'TRL 4', 'TRL 5', 'TRL 6'].map((trl, i) => {
                  const active = trl === 'TRL 4';
                  const passed = i < 3;
                  return (
                    <motion.span
                      key={trl}
                      variants={{
                        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 },
                        show: reduced
                          ? { opacity: 1, transition: { duration: 0.3 } }
                          : {
                              opacity: 1,
                              y: 0,
                              scale: active ? 1.04 : 1,
                              transition: { duration: 0.5, ease: ENTER },
                            },
                      }}
                      animate={
                        !reduced && active
                          ? {
                              scale: [1.04, 1.08, 1.04],
                              transition: {
                                duration: 2.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1.2,
                              },
                            }
                          : undefined
                      }
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        padding: '6px 12px',
                        borderRadius: 9999,
                        background: active
                          ? 'var(--color-teal)'
                          : passed
                          ? 'rgba(255,255,255,0.08)'
                          : 'transparent',
                        color: active
                          ? '#ffffff'
                          : passed
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(255,255,255,0.35)',
                        border: active
                          ? '1px solid var(--color-teal)'
                          : '1px solid rgba(255,255,255,0.18)',
                        fontWeight: active ? 600 : 400,
                        display: 'inline-block',
                        transformOrigin: 'center',
                      }}
                    >
                      {trl}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── 4 MÉTRICAS · grid 4-col ───────────────────────── */}
        <motion.div {...fadeIn(0.05)} className="mt-12 mb-6">
          <span
            className="eyebrow"
            style={{ color: 'var(--color-graphite)' }}
          >
            Métricas de evaluación
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {METRICAS.map((m, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={m.nombre}
                variants={{
                  hidden: reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, scale: 0.96 },
                  show: reduced
                    ? { opacity: 1, transition: { duration: 0.4 } }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.7, ease: ENTER },
                      },
                }}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }
                }
                className={featured ? 'card-teal-soft' : 'card-paper'}
                style={{
                  padding: 24,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  borderRadius: 20,
                  border: featured
                    ? '2px solid var(--color-teal)'
                    : '1px solid var(--color-line)',
                  background: featured ? 'var(--color-teal-soft)' : 'var(--color-paper-warm)',
                  position: 'relative',
                  willChange: 'transform',
                }}
              >
                {/* Glow teal pulsante para AUC-ROC destacada */}
                {featured && !reduced && (
                  <motion.span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: 22,
                      pointerEvents: 'none',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(31,140,136,0)',
                        '0 0 0 10px rgba(31,140,136,0.10)',
                        '0 0 0 0 rgba(31,140,136,0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className="eyebrow"
                    style={{
                      color: 'var(--color-teal)',
                      fontWeight: 600,
                    }}
                  >
                    {m.rol}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      color: featured ? 'var(--color-navy)' : 'var(--color-mist)',
                      opacity: 0.6,
                    }}
                  >
                    M{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(22px, 1.8vw, 28px)',
                    color: 'var(--color-navy)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}
                >
                  {m.nombre}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: featured ? 'var(--color-navy)' : 'var(--color-ink-soft)',
                    maxWidth: '32ch',
                  }}
                >
                  {m.detalle}
                </p>
                {'refs' in m && Array.isArray((m as any).refs) && (m as any).refs.length > 0 ? (
                  <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Cite refs={(m as any).refs} tone="paper" />
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── 3 puntos estratégicos ───────────────────── */}
        <motion.div {...fadeIn(0.05)} className="mt-12 mb-6">
          <span
            className="eyebrow"
            style={{ color: 'var(--color-graphite)' }}
          >
            Puntos estratégicos
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
        >
          {PUNTOS_ESTRATEGICOS.map((p, i) => (
            <motion.div
              key={p.titulo}
              variants={{
                hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
                show: reduced
                  ? { opacity: 1, transition: { duration: 0.4 } }
                  : { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
              }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }
              }
              className="card-paper"
              style={{
                padding: 28,
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderRadius: 20,
                borderTop: '3px solid var(--color-teal)',
                willChange: 'transform',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: 'var(--color-teal)',
                    fontWeight: 600,
                  }}
                >
                  PE-0{i + 1}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(18px, 1.5vw, 20px)',
                  color: 'var(--color-navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}
              >
                {p.titulo}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--color-ink-soft)',
                }}
              >
                {p.texto}
              </p>
              {'refs' in p && Array.isArray((p as any).refs) && (p as any).refs.length > 0 ? (
                <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <Cite refs={(p as any).refs} tone="paper" />
                </div>
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer hairline */}
        <motion.div
          {...fadeIn(0.1)}
          className="hairline mt-14 pt-6 flex flex-wrap items-center justify-between gap-3"
        >
          <span
            className="font-serif-it"
            style={{
              fontSize: 14,
              color: 'var(--color-graphite)',
              maxWidth: '60ch',
            }}
          >
            El prototipo reporta las métricas al usuario médico para que conozca capacidades y limitaciones antes de cualquier decisión clínica.
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-teal)',
            }}
          >
            §16 / resultados esperados
          </span>
        </motion.div>
      </div>
    </section>
  );
}
