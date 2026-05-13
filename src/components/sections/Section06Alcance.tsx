import { motion, useReducedMotion } from 'framer-motion';
import { ALCANCE } from '@/data/content';
import ScopeDial from '@/components/ui/ScopeDial';
import { ENTER, MOVE } from '@/lib/motion';

const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: ENTER, delay },
});

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

export default function Section05Alcance() {
  const reduced = useReducedMotion();

  return (
    <section
      id="alcance"
      className="section relative overflow-hidden"
      style={{ background: 'var(--color-paper)' }}
    >
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} />

      <div className="container relative">
        <motion.div {...fadeUp(0)} className="eyebrow-num mb-6">
          §06 / Alcance y delimitación
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '20ch',
          }}
        >
          <span className="hl-teal">Lo que sí contempla.</span>
          <br />
          <span style={{ color: 'var(--color-charcoal)' }}>Lo que no contempla.</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.16)}
          className="mt-6"
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '62ch',
          }}
        >
          Los límites son tan importantes como los entregables. El alcance es un contrato con los jurados.
        </motion.p>

        {/* ── DIAL · síntesis visual scope + TRL al centro ──────── */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-14"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-line)',
            borderRadius: 24,
            padding: 'clamp(20px, 3vw, 36px)',
            overflow: 'visible',
          }}
        >
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--color-graphite)',
              }}
            >
              Mapa de alcance · {ALCANCE.incluye.length} inclusiones · {ALCANCE.delimitacion.length} delimitaciones
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--color-mist)',
              }}
            >
              hover sobre un rayo para resaltar
            </span>
          </div>
          <ScopeDial
            incluye={ALCANCE.incluye}
            delimitacion={ALCANCE.delimitacion as readonly { eje: string; detalle: string }[]}
          />
        </motion.div>

        {/* ── GRID 2-col · clip-path desde lados opuestos ──────── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* ── COL IZQUIERDA · LO QUE SÍ CONTEMPLA ─────── */}
          <motion.div
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
            transition={{ duration: 0.85, ease: MOVE, delay: 0.18 }}
            style={{ willChange: 'clip-path' }}
          >
            <motion.div {...fadeUp(0.22)} className="flex items-center gap-3 mb-6">
              <span className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                Lo que sí contempla
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: 'var(--color-teal)',
                  opacity: 0.3,
                }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
              }}
            >
              {ALCANCE.incluye.map((item, i) => {
                const isHighlight = i === 4;
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.65, ease: ENTER },
                      },
                    }}
                    whileHover={
                      reduced
                        ? undefined
                        : { y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }
                    }
                    className={isHighlight ? 'card-teal' : 'card-paper'}
                    style={{
                      padding: 22,
                      borderRadius: 16,
                      border: isHighlight ? 'none' : '2px solid var(--color-teal)',
                      background: isHighlight ? 'var(--color-teal)' : 'rgba(183, 225, 223, 0.18)',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: 9999,
                        background: isHighlight ? 'rgba(255,255,255,0.18)' : 'var(--color-teal)',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconCheck />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: isHighlight ? 'rgba(255,255,255,0.7)' : 'var(--color-teal)',
                          marginBottom: 4,
                          fontWeight: 600,
                        }}
                      >
                        Inc {String(i + 1).padStart(2, '0')}
                      </div>
                      <p
                        style={{
                          fontSize: 17,
                          lineHeight: 1.5,
                          color: isHighlight ? '#ffffff' : 'var(--color-navy)',
                          fontWeight: isHighlight ? 500 : 400,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Highlight box TRL 4 · pulse scale al entrar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: [0.96, 1.02, 1] }
              }
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.1, ease: ENTER, delay: 0.85, times: [0, 0.6, 1] }}
              className="card-teal mt-6"
              style={{
                padding: 28,
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                borderRadius: 20,
                willChange: 'transform',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(48px, 5vw, 72px)',
                  lineHeight: 0.9,
                  color: 'rgba(255,255,255,0.95)',
                  flexShrink: 0,
                }}
              >
                4
              </div>
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.75)',
                    marginBottom: 4,
                  }}
                >
                  Madurez objetivo
                </div>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.45,
                    color: '#ffffff',
                    fontWeight: 500,
                  }}
                >
                  Alcanzar un nivel de madurez <strong>TRL 4</strong>: prototipo
                  tecnológico validado computacionalmente en un entorno de laboratorio.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── COL DERECHA · LO QUE NO CONTEMPLA · clip desde right ─── */}
          <motion.div
            initial={
              reduced
                ? { opacity: 0 }
                : { clipPath: 'inset(0 0 0 100%)', opacity: 1 }
            }
            whileInView={
              reduced
                ? { opacity: 1 }
                : { clipPath: 'inset(0 0% 0 0%)', opacity: 1 }
            }
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.85, ease: MOVE, delay: 0.18 }}
            style={{ willChange: 'clip-path' }}
          >
            <motion.div {...fadeUp(0.22)} className="flex items-center gap-3 mb-6">
              <span className="eyebrow" style={{ color: 'var(--color-charcoal)' }}>
                Lo que no contempla
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: 'var(--color-charcoal)',
                  opacity: 0.3,
                }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
              }}
            >
              {ALCANCE.delimitacion.map((item) => (
                <motion.div
                  key={item.eje}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.65, ease: ENTER },
                    },
                  }}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }
                  }
                  className="card-paper"
                  style={{
                    padding: 22,
                    borderRadius: 16,
                    border: '2px solid var(--color-navy)',
                    background: '#ffffff',
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                      background: 'var(--color-navy)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconX />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="eyebrow"
                      style={{
                        color: 'var(--color-navy)',
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      {item.eje}
                    </div>
                    <p
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.5,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {item.detalle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer hairline */}
        <motion.div
          {...fadeUp(0.7)}
          className="hairline mt-16 pt-6 flex flex-wrap items-center justify-between gap-3"
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-graphite)',
            }}
          >
            los límites son tan importantes como los entregables
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
            el alcance es un contrato con los jurados
          </span>
        </motion.div>
      </div>
    </section>
  );
}
