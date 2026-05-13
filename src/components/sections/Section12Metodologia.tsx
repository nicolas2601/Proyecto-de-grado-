import { motion } from 'framer-motion';
import { METODOLOGIA } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// ── Marcadores de estado de actividades ─────────────────────────────
function StatusMarker({ estado }: { estado: string }) {
  if (estado === 'COMPLETADO') {
    return (
      <span
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
      </span>
    );
  }
  if (estado === 'EN CURSO') {
    return (
      <span
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
      </span>
    );
  }
  return (
    <span
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
}: {
  fase: (typeof METODOLOGIA.fases)[number];
  active: boolean;
  position: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        position: 'absolute',
        top: 110,
        left: `${position}%`,
        transform: 'translateX(-50%)',
        width: 220,
        zIndex: 2,
      }}
    >
      <div
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
      </div>
    </motion.div>
  );
}

export default function Section12Metodologia() {
  const fases = METODOLOGIA.fases;
  // posiciones horizontales para las 4 fases (porcentaje)
  const positions = [14, 38, 62, 86];

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
          §12 / ASPECTOS METODOLÓGICOS
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

        <motion.div variants={fadeUp} className="mt-6">
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
            {METODOLOGIA.paradigma} / {METODOLOGIA.citaFuente}
          </span>
        </motion.div>
      </motion.div>

      {/* DIAGRAMA DE LAS 4 FASES · ciclo iterativo */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mb-20"
      >
        <motion.div variants={fadeUp} className="eyebrow mb-6">
          Diagrama del ciclo iterativo / 4 fases
        </motion.div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 600,
            background: '#ffffff',
            borderRadius: 24,
            border: '1px solid var(--color-line)',
            boxShadow: 'var(--sh-sm)',
            overflow: 'hidden',
          }}
        >
          {/* SVG capa de conectores */}
          <svg
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrowNavy"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-navy)" />
              </marker>
              <marker
                id="arrowTeal"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-teal)" />
              </marker>
            </defs>

            {/* Conectores horizontales entre fases */}
            <line
              x1="200"
              y1="320"
              x2="345"
              y2="320"
              stroke="var(--color-navy)"
              strokeWidth="1.4"
              markerEnd="url(#arrowNavy)"
              opacity="0.45"
            />
            <line
              x1="440"
              y1="320"
              x2="585"
              y2="320"
              stroke="var(--color-navy)"
              strokeWidth="1.4"
              markerEnd="url(#arrowNavy)"
              opacity="0.45"
            />
            <line
              x1="680"
              y1="320"
              x2="825"
              y2="320"
              stroke="var(--color-navy)"
              strokeWidth="1.4"
              markerEnd="url(#arrowNavy)"
              opacity="0.45"
            />

            {/* Conector de retorno · F4 → F1 · curvado debajo · dashed teal */}
            <path
              d="M860 460 C 860 540, 140 540, 140 460"
              stroke="var(--color-teal)"
              strokeWidth="1.6"
              strokeDasharray="5 6"
              fill="none"
              markerEnd="url(#arrowTeal)"
            />

            {/* Etiqueta sobre el conector de retorno */}
            <text
              x="500"
              y="532"
              textAnchor="middle"
              fill="var(--color-teal)"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="11"
              letterSpacing="0.08em"
            >
              CICLO ITERATIVO / RETORNO A FASE PREVIA
            </text>
          </svg>

          {/* Etiqueta superior */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3,
              textAlign: 'center',
            }}
          >
            <div
              className="eyebrow"
              style={{
                color: 'var(--color-teal)',
                fontSize: 11,
              }}
            >
              CRISP-DM / Wirth & Hipp · 2000
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--color-navy)',
                letterSpacing: '-0.01em',
              }}
            >
              Cada fase puede retornar a la anterior si los riesgos lo exigen.
            </div>
          </div>

          {/* Cards de fase posicionadas absolutamente */}
          {fases.map((fase, i) => (
            <PhaseDiagramCard
              key={fase.codigo}
              fase={fase}
              active={i === 0}
              position={positions[i]}
            />
          ))}
        </div>
      </motion.div>

      {/* DETALLE DE ACTIVIDADES POR FASE */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
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

                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {fase.actividades.map((act, idx) => {
                    const estado = fase.estadoActividades[idx];
                    return (
                      <li
                        key={idx}
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
                      </li>
                    );
                  })}
                </ul>
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
