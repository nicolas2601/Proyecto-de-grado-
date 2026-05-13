import { motion } from 'framer-motion';
import { CRONOGRAMA, METODOLOGIA } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// Configuración de cada barra de Gantt por fase
const BAR_LAYOUT: Record<
  string,
  { x1: number; x2: number; variant: 'solid' | 'dashed-teal' | 'dashed-grey' }
> = {
  F1: { x1: 5, x2: 48, variant: 'solid' },
  F2: { x1: 38, x2: 72, variant: 'dashed-teal' },
  F3: { x1: 55, x2: 85, variant: 'dashed-grey' },
  F4: { x1: 72, x2: 95, variant: 'dashed-grey' },
};

function GanttBar({
  variant,
  x1,
  x2,
}: {
  variant: 'solid' | 'dashed-teal' | 'dashed-grey';
  x1: number;
  x2: number;
}) {
  const width = `${x2 - x1}%`;
  const left = `${x1}%`;

  if (variant === 'solid') {
    return (
      <div
        style={{
          position: 'absolute',
          left,
          width,
          top: '50%',
          transform: 'translateY(-50%)',
          height: 22,
          background: 'var(--color-teal)',
          borderRadius: 9999,
          boxShadow: '0 4px 12px -4px rgba(31,140,136,0.45)',
        }}
      />
    );
  }
  if (variant === 'dashed-teal') {
    return (
      <div
        style={{
          position: 'absolute',
          left,
          width,
          top: '50%',
          transform: 'translateY(-50%)',
          height: 22,
          border: '1.5px dashed var(--color-teal)',
          borderRadius: 9999,
          background: 'rgba(31,140,136,0.06)',
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        left,
        width,
        top: '50%',
        transform: 'translateY(-50%)',
        height: 22,
        border: '1.5px dashed var(--color-mist)',
        borderRadius: 9999,
        background: 'transparent',
      }}
    />
  );
}

export default function Section13Cronograma() {
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
          §13 / CRONOGRAMA
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
          Diagrama de tiempos del proyecto
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
          Plan operativo distribuido en dos semestres académicos.
        </motion.p>
      </motion.div>

      {/* DIAGRAMA GANTT-LIKE */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.div variants={fadeUp} className="eyebrow mb-4">
          Distribución temporal por fase
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            background: '#ffffff',
            borderRadius: 24,
            border: '1px solid var(--color-line)',
            boxShadow: 'var(--sh-sm)',
            padding: 28,
            position: 'relative',
          }}
        >
          {/* Header eje X · semestres */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 140px',
              gap: 16,
              alignItems: 'center',
              paddingBottom: 14,
              borderBottom: '1px solid var(--color-line)',
              marginBottom: 8,
            }}
          >
            <div
              className="eyebrow"
              style={{ color: 'var(--color-graphite)', fontSize: 11 }}
            >
              Fase / Objetivo
            </div>
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                color: 'var(--color-graphite)',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ paddingLeft: 4 }}>Semestre 1</span>
              <span
                style={{
                  paddingLeft: 16,
                  borderLeft: '1px solid var(--color-line)',
                }}
              >
                Semestre 2
              </span>
            </div>
            <div
              className="eyebrow"
              style={{
                color: 'var(--color-graphite)',
                fontSize: 11,
                textAlign: 'right',
              }}
            >
              Estado
            </div>
          </div>

          {/* Lanes de Gantt */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {CRONOGRAMA.map((hito, i) => {
              const layout = BAR_LAYOUT[hito.fase];
              const isActive = hito.estado === 'EN CURSO';
              const altBg = i % 2 === 1;

              return (
                <motion.div
                  key={hito.fase}
                  variants={fadeUp}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr 140px',
                    gap: 16,
                    alignItems: 'center',
                    height: 72,
                    background: altBg ? 'var(--color-paper-warm)' : 'transparent',
                    borderRadius: 12,
                    paddingInline: 12,
                  }}
                >
                  {/* Etiqueta inicio lane */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <span
                      className="pill"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        alignSelf: 'flex-start',
                        background: isActive
                          ? 'var(--color-teal)'
                          : 'rgba(15,44,69,0.06)',
                        color: isActive ? '#fff' : 'var(--color-navy)',
                        border: 0,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 9px',
                      }}
                    >
                      {hito.fase} / {hito.objetivo}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: 14,
                        color: 'var(--color-navy)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {hito.label}
                    </span>
                  </div>

                  {/* Track + barra */}
                  <div
                    style={{
                      position: 'relative',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '50% 0 auto 0',
                        height: 2,
                        background: 'var(--color-line)',
                        opacity: 0.6,
                        transform: 'translateY(-50%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: 6,
                        bottom: 6,
                        width: 1,
                        background: 'var(--color-line)',
                        opacity: 0.7,
                      }}
                    />
                    <GanttBar
                      variant={layout.variant}
                      x1={layout.x1}
                      x2={layout.x2}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: 4,
                        bottom: 4,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--color-graphite)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {hito.duracion}
                    </span>
                  </div>

                  {/* Status chip */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span
                      className={isActive ? 'status-current' : 'status-pending'}
                    >
                      {isActive ? (
                        <>
                          <span className="dot-pulse" />
                          EN CURSO
                        </>
                      ) : (
                        'PENDIENTE'
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Vertical line "AHORA" · ubicada al final del Semestre 1 */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 'calc(220px + 16px + 28px + ((100% - 220px - 16px - 140px - 16px - 56px) * 0.5))',
              top: 56,
              bottom: 28,
              width: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 2,
                background: 'var(--color-teal)',
                opacity: 0.55,
                transform: 'translateX(-1px)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: -2,
                left: 0,
                transform: 'translate(-50%, -50%)',
                width: 10,
                height: 10,
                background: 'var(--color-teal)',
                borderRadius: 999,
                boxShadow: '0 0 0 4px rgba(31,140,136,0.18)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: -22,
                left: 0,
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                color: 'var(--color-teal)',
                background: '#fff',
                padding: '3px 9px',
                borderRadius: 9999,
                border: '1px solid rgba(31,140,136,0.25)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              Actualidad
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* TABLA DE ACTIVIDADES POR FASE */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="eyebrow mb-6">
          Actividades planeadas por fase
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METODOLOGIA.fases.map((fase) => {
            const active = fase.codigo === 'F1';
            return (
              <motion.div
                key={fase.codigo}
                variants={fadeUp}
                className="card-paper"
                style={{
                  padding: 22,
                  border: active
                    ? '2px solid var(--color-teal)'
                    : '1px solid var(--color-line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    className="pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: active
                        ? 'var(--color-teal)'
                        : 'rgba(15,44,69,0.06)',
                      color: active ? '#fff' : 'var(--color-navy)',
                      border: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '4px 10px',
                    }}
                  >
                    {fase.codigo}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 16,
                      color: 'var(--color-navy)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {fase.label}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                  }}
                >
                  {fase.actividades.map((act, idx) => (
                    <span
                      key={idx}
                      className="pill"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        padding: '4px 9px',
                        background: '#fff',
                        color: 'var(--color-charcoal)',
                        border: '1px solid var(--color-line)',
                        letterSpacing: '0',
                        textTransform: 'none',
                        lineHeight: 1.3,
                      }}
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div variants={fadeUp} className="mt-10">
          <div className="hairline" style={{ marginBottom: 16 }} />
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: 'var(--color-charcoal)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'var(--color-teal)',
              }}
            >
              OBJ-01
            </span>{' '}
            en curso, actividades 1-4 completadas, actividad 5 (pipeline) en
            curso.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
