import { motion, useReducedMotion } from 'framer-motion';
import { METODOLOGIA } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// Stagger 250ms entre las 4 fases del diagrama
const phaseStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};

const phaseEnter = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: ENTER } },
};

// Stagger 150ms para detalle de actividades por fase
const detailStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// Stagger 40ms para actividades internas
const activityStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const activityItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ENTER } },
};

// Check con spring stiffness 280
const checkSpring = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 18 },
  },
};

// ── Marcadores de estado de actividades ─────────────────────────────
function StatusMarker({ estado }: { estado: string }) {
  if (estado === 'COMPLETADO') {
    return (
      <motion.span
        variants={checkSpring}
        aria-hidden
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: 'var(--color-teal)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.2L4.8 8.5L9.5 3.5"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    );
  }
  if (estado === 'EN CURSO') {
    return (
      <motion.span
        variants={activityItem}
        aria-hidden
        style={{
          width: 18,
          height: 18,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          position: 'relative',
        }}
      >
        <span className="dot-pulse" />
      </motion.span>
    );
  }
  return (
    <motion.span
      variants={activityItem}
      aria-hidden
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        border: '1px dashed var(--color-mist)',
        flexShrink: 0,
        marginTop: 2,
      }}
    />
  );
}

// ── Card de fase dentro del diagrama del ciclo ──────────────────────
function PhaseDiagramCard({
  fase,
  active,
  position,
  reduced,
}: {
  fase: (typeof METODOLOGIA.fases)[number];
  active: boolean;
  position: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      variants={phaseEnter}
      style={{
        position: 'absolute',
        top: 110,
        left: `${position}%`,
        transform: 'translateX(-50%)',
        width: 220,
        zIndex: 2,
      }}
    >
      <motion.div
        className={active ? 'card-teal-soft' : 'card-paper'}
        style={{
          padding: 20,
          border: active
            ? '2px solid var(--color-teal)'
            : '1px solid var(--color-line)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          minHeight: 220,
        }}
        // Glow infinite SOLO en card activa
        animate={
          active && !reduced
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(31,140,136,0.0)',
                  '0 0 32px 4px rgba(31,140,136,0.35)',
                  '0 0 0 0 rgba(31,140,136,0.0)',
                ],
              }
            : undefined
        }
        transition={
          active && !reduced
            ? {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }
            : undefined
        }
      >
        <span
          className="pill"
          style={{
            fontFamily: 'var(--font-mono)',
            alignSelf: 'flex-start',
            background: active ? 'var(--color-teal)' : 'rgba(15,44,69,0.06)',
            color: active ? '#fff' : 'var(--color-navy)',
            border: 0,
            fontSize: 13,
            fontWeight: 600,
            padding: '5px 12px',
          }}
        >
          {fase.codigo}
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 17,
            lineHeight: 1.2,
            color: 'var(--color-navy)',
            letterSpacing: '-0.01em',
          }}
        >
          {fase.label}
        </h4>
        <span
          style={{
            fontSize: 13,
            color: 'var(--color-graphite)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
          }}
        >
          {fase.objetivo}
        </span>
        <span
          className={active ? 'status-current' : 'status-pending'}
          style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
        >
          {active ? (
            <>
              <span className="dot-pulse" />
              EN CURSO
            </>
          ) : (
            'PENDIENTE'
          )}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Section12Metodologia() {
  const reduced = useReducedMotion() ?? false;
  const fases = METODOLOGIA.fases;
  // posiciones horizontales para las 4 fases (porcentaje)
  const positions = [14, 38, 62, 86];

  // longitudes de paths para draw
  const LINE_LEN = 145;
  const RETURN_LEN = 980;

  const lineDraw = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 0.45 } }
    : {
        hidden: { strokeDashoffset: LINE_LEN, opacity: 0.45 },
        show: {
          strokeDashoffset: 0,
          opacity: 0.45,
          transition: { duration: 0.6, ease: ENTER },
        },
      };

  const returnDraw = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { strokeDashoffset: RETURN_LEN, opacity: 0 },
        show: {
          strokeDashoffset: 0,
          opacity: 1,
          transition: { duration: 1.4, ease: ENTER, delay: 1.1 },
        },
      };

  const returnLabel = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: ENTER, delay: 2.3 },
        },
      };

  return (
    <div className="container">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-12"
      >
        <motion.div variants={fadeUp} className="eyebrow-num mb-6">
          §13 / ASPECTOS METODOLÓGICOS
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: 'var(--color-navy)',
            maxWidth: '22ch',
          }}
        >
          <span style={{ fontWeight: 700 }}>CRISP-DM iterativo</span>, adaptado a
          cuatro fases.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6"
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '55ch',
          }}
        >
          {METODOLOGIA.nota}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2 flex-wrap">
          <span
            className="pill"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(15,44,69,0.06)',
              color: 'var(--color-navy)',
              border: 0,
              fontSize: 12,
              letterSpacing: '0.04em',
            }}
          >
            {METODOLOGIA.paradigma} · {METODOLOGIA.citaFuente}
          </span>
          {'refs' in METODOLOGIA && Array.isArray((METODOLOGIA as any).refs) ? (
            <Cite refs={(METODOLOGIA as any).refs} tone="paper" />
          ) : null}
        </motion.div>
      </motion.div>

      {/* DIAGRAMA DE LAS 4 FASES · ciclo iterativo · re-diseñado */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={phaseStagger}
        className="mb-20"
      >
        <motion.div
          variants={fadeUp}
          className="mb-6 flex items-baseline justify-between flex-wrap gap-3"
        >
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--color-navy)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Ciclo CRISP-DM · 4 fases iterativas
          </h3>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            Wirth &amp; Hipp · 2000
          </span>
        </motion.div>

        <div
          style={{
            position: 'relative',
            background: '#FFFFFF',
            border: '1px solid var(--color-line)',
            borderRadius: 24,
            padding: 'clamp(28px, 4vw, 48px)',
          }}
        >
          {/* Grid de 4 fases · números gigantes + nombre corto */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative"
            style={{ zIndex: 2 }}
          >
            {fases.map((fase, i) => {
              const active = i === 0;
              return (
                <motion.div
                  key={fase.codigo}
                  variants={phaseEnter}
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          y: -4,
                          transition: { type: 'spring', stiffness: 280, damping: 22 },
                        }
                  }
                  style={{
                    position: 'relative',
                    background: active ? 'var(--color-navy)' : '#FFFFFF',
                    color: active ? '#FFFFFF' : 'var(--color-navy)',
                    border: active
                      ? '2px solid var(--color-teal)'
                      : '1px solid var(--color-line)',
                    borderRadius: 18,
                    padding: '24px 22px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    minHeight: 220,
                    overflow: 'hidden',
                    boxShadow: active
                      ? '0 18px 38px -18px rgba(31,140,136,0.4)'
                      : '0 2px 4px rgba(15,44,69,0.04)',
                  }}
                >
                  {/* Número gigante de fondo */}
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 14,
                      fontFamily: "'Instrument Serif', 'Lyon Text', Georgia, serif",
                      fontStyle: 'italic',
                      fontSize: 96,
                      lineHeight: 0.9,
                      color: active
                        ? 'rgba(124,209,206,0.18)'
                        : 'rgba(15,44,69,0.05)',
                      fontWeight: 400,
                      pointerEvents: 'none',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Pill F1..F4 */}
                  <span
                    className="font-mono"
                    style={{
                      alignSelf: 'flex-start',
                      background: active
                        ? 'var(--color-teal)'
                        : 'rgba(15,44,69,0.06)',
                      color: active ? '#FFFFFF' : 'var(--color-navy)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {fase.codigo}
                  </span>

                  {/* Título corto */}
                  <h4
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 18,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: active ? '#FFFFFF' : 'var(--color-navy)',
                      position: 'relative',
                      zIndex: 2,
                      marginTop: 6,
                    }}
                  >
                    {fase.label}
                  </h4>

                  {/* Objetivo */}
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      color: active
                        ? 'rgba(255,255,255,0.7)'
                        : 'var(--color-graphite)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {fase.objetivo}
                  </span>

                  <div style={{ flex: 1 }} />

                  {/* Status */}
                  <span
                    className="font-mono"
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 10.5,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: active
                        ? '#7CD1CE'
                        : 'var(--color-graphite)',
                      background: active
                        ? 'rgba(124,209,206,0.12)'
                        : 'rgba(15,44,69,0.06)',
                      border: active
                        ? '1px solid rgba(124,209,206,0.3)'
                        : '1px solid rgba(15,44,69,0.12)',
                      borderRadius: 9999,
                      padding: '4px 10px',
                      position: 'relative',
                      zIndex: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {active && (
                      <span
                        aria-hidden
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#7CD1CE',
                          animation: 'phaseDot 1.6s ease-in-out infinite',
                        }}
                      />
                    )}
                    {active ? 'EN CURSO' : 'PENDIENTE'}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Flecha de ciclo · curva debajo que sale de F4 y regresa a F1 */}
          <div
            style={{
              position: 'relative',
              marginTop: 28,
              paddingTop: 12,
            }}
          >
            <motion.svg
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: 80 }}
              aria-hidden
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <defs>
                <marker
                  id="arrowTealHead"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-teal)" />
                </marker>
              </defs>
              <motion.path
                d="M 940 12 C 940 90, 60 90, 60 18"
                stroke="var(--color-teal)"
                strokeWidth="2"
                strokeDasharray="6 6"
                fill="none"
                markerEnd="url(#arrowTealHead)"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: ENTER, delay: 0.4 }}
              />
            </motion.svg>

            <motion.div
              variants={returnLabel}
              className="font-mono uppercase"
              style={{
                position: 'absolute',
                left: '50%',
                top: 28,
                transform: 'translateX(-50%)',
                fontSize: 12,
                letterSpacing: '0.18em',
                color: 'var(--color-teal)',
                background: '#FFFFFF',
                padding: '8px 16px',
                border: '1px solid rgba(31,140,136,0.3)',
                borderRadius: 9999,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(31,140,136,0.12)',
              }}
            >
              ↺ Ciclo iterativo · retorna a fase previa
            </motion.div>
          </div>

          <style>{`
            @keyframes phaseDot {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.4); }
            }
          `}</style>
        </div>
      </motion.div>

      {/* DETALLE DE ACTIVIDADES POR FASE */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={detailStagger}
      >
        <motion.div variants={fadeUp} className="eyebrow mb-6">
          Detalle de actividades por fase
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fases.map((fase, i) => {
            const active = i === 0;
            return (
              <motion.article
                key={fase.codigo}
                variants={fadeUp}
                className="card-paper"
                style={{
                  padding: 24,
                  border: active
                    ? '2px solid var(--color-teal)'
                    : '1px solid var(--color-line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <span
                  className="pill"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'var(--color-teal)'
                      : 'rgba(15,44,69,0.06)',
                    color: active ? '#fff' : 'var(--color-navy)',
                    border: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '5px 12px',
                  }}
                >
                  {fase.codigo}
                </span>

                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 19,
                    lineHeight: 1.2,
                    color: 'var(--color-navy)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {fase.label}
                </h4>

                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--color-graphite)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {fase.objetivo}
                </span>

                <div className="hairline" style={{ marginBlock: 4 }} />

                <div
                  className="eyebrow"
                  style={{
                    color: active ? 'var(--color-teal)' : 'var(--color-graphite)',
                    fontSize: 10,
                  }}
                >
                  Actividades
                </div>

                <motion.ul
                  variants={activityStagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {fase.actividades.map((act, idx) => {
                    const estado = fase.estadoActividades[idx];
                    return (
                      <motion.li
                        key={idx}
                        variants={activityItem}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                        }}
                      >
                        <StatusMarker estado={estado} />
                        <span
                          style={{
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: 'var(--color-charcoal)',
                          }}
                        >
                          {act}
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.article>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div variants={fadeUp} className="mt-10">
          <div className="hairline" style={{ marginBottom: 16 }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-graphite)',
              letterSpacing: '0.04em',
              textTransform: 'lowercase',
            }}
          >
            f1 en curso con 4 de 5 actividades completadas / f2-f4 pendientes
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
