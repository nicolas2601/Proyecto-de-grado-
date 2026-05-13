import { motion } from 'framer-motion';
import {
  PROBLEMA,
  EVIDENCIA_PROBLEMA,
  ARBOL_PROBLEMA,
} from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

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
  // Pin de mapa estilizado
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
        <motion.div {...fade(0)} className="eyebrow-num">
          §02 · PLANTEAMIENTO DEL PROBLEMA
        </motion.div>

        <motion.h2
          {...fade(0.08)}
          className="mt-4"
          style={{
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            maxWidth: '20ch',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--color-navy)',
          }}
        >
          De lo global a lo regional
        </motion.h2>

        <motion.p
          {...fade(0.16)}
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

        {/* ─── Bento 3-col contexto ─────────────────────── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Global */}
          <motion.div {...fade(0.24)} className="card">
            <IconGlobe />
            <div className="eyebrow mt-4">Contexto Global</div>
            <p
              className="mt-3"
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                color: 'var(--color-charcoal)',
              }}
            >
              El cáncer de piel es una de las neoplasias más frecuentes en el
              mundo.
            </p>
          </motion.div>

          {/* Nacional */}
          <motion.div
            {...fade(0.32)}
            className="card-paper"
            style={{ borderColor: 'rgba(31,140,136,0.4)' }}
          >
            <IconColombia />
            <div
              className="eyebrow mt-4"
              style={{ color: 'var(--color-teal)' }}
            >
              Contexto Nacional
            </div>
            <div
              className="font-display tabular-nums mt-3"
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                color: 'var(--color-navy)',
                lineHeight: 1,
              }}
            >
              11.064
            </div>
            <p
              className="mt-2"
              style={{
                fontSize: 14,
                lineHeight: 1.45,
                color: 'var(--color-ink-soft)',
              }}
            >
              Casos reportados en Colombia durante 2024 · Cuenta de Alto
              Costo.
            </p>
          </motion.div>

          {/* Regional */}
          <motion.div {...fade(0.4)} className="card-navy relative">
            <IconHospital />
            <div
              className="eyebrow mt-4"
              style={{ color: '#B7E1DF' }}
            >
              Contexto Regional (HIC)
            </div>
            <div
              className="font-display tabular-nums mt-3"
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                color: '#F26B3A',
                lineHeight: 1,
              }}
            >
              3.060
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
            <div className="mt-4 flex items-center gap-2">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: '#F26B3A',
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.4,
                }}
              >
                64,82 % corresponde a Carcinoma Basocelular (BCC)
              </span>
            </div>
          </motion.div>
        </div>

        {/* ─── Banda paradoja del melanoma ──────────────── */}
        <motion.div
          {...fade(0.48)}
          className="card-orange mt-6 flex flex-col md:flex-row items-start md:items-center gap-4"
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
            <strong style={{ fontWeight: 700 }}>
              LA PARADOJA DEL MELANOMA
            </strong>
            : Representa solo el 13,66 % de los casos regionales, pero causa
            el 80 % de las muertes.
          </p>
        </motion.div>

        {/* ─── EVIDENCIA DEL PROBLEMA ─────────────────── */}
        <div className="mt-20">
          <motion.div
            {...fade(0)}
            className="hairline pt-6 flex items-center gap-3"
          >
            <span className="eyebrow">
              evidencia del problema · 3 puntos
            </span>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {EVIDENCIA_PROBLEMA.map((ev, i) => (
              <motion.div
                key={ev.id}
                {...fade(0.16 + i * 0.08)}
                className="card-paper"
              >
                <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                  {ev.titulo}
                </div>
                <div
                  className="font-display mt-3 tabular-nums"
                  style={{
                    fontSize: 'clamp(28px, 3.2vw, 40px)',
                    color: 'var(--color-navy)',
                    lineHeight: 1,
                  }}
                >
                  {ev.valor}
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
          </div>
        </div>

        {/* ─── ÁRBOL DEL PROBLEMA · system architecture ───── */}
        <div className="mt-20">
          <motion.div {...fade(0)} className="eyebrow-num">
            Árbol del problema
          </motion.div>

          <motion.h3
            {...fade(0.08)}
            className="mt-3 font-display"
            style={{
              fontSize: 'clamp(22px, 2.4vw, 32px)',
              color: 'var(--color-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              maxWidth: '40ch',
            }}
          >
            System Architecture: Limitaciones en la detección cutánea
          </motion.h3>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* CAUSAS / INPUTS */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="eyebrow flex items-center gap-2">
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-teal)',
                    fontWeight: 700,
                  }}
                >
                  ← Inputs
                </span>
                <span>Causas</span>
              </div>
              {ARBOL_PROBLEMA.causas.map((c, i) => (
                <motion.div
                  key={c.codigo}
                  {...fade(0.12 + i * 0.06)}
                  className="card"
                  style={{
                    padding: 20,
                    borderLeft: '2px solid var(--color-teal)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: 'var(--color-teal)',
                        fontWeight: 600,
                      }}
                    >
                      {c.codigo}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--color-navy)',
                        lineHeight: 1.25,
                      }}
                    >
                      {c.titulo}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: 'var(--color-ink-soft)',
                      maxWidth: '30ch',
                    }}
                  >
                    {c.detalle}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* PROBLEMA CENTRAL */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <motion.div
                {...fade(0.2)}
                className="card-teal flex flex-col items-center justify-center text-center"
                style={{
                  minHeight: 280,
                  padding: 32,
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  Problema central
                </div>
                <p
                  className="mt-4"
                  style={{
                    fontSize: 'clamp(18px, 1.8vw, 22px)',
                    lineHeight: 1.35,
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {ARBOL_PROBLEMA.problemaCentral}
                </p>
                {/* Connectors hint */}
                <div className="mt-6 flex items-center gap-2">
                  <span
                    style={{
                      width: 24,
                      height: 1,
                      background: 'rgba(255,255,255,0.45)',
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.7)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    NODO CENTRAL
                  </span>
                  <span
                    style={{
                      width: 24,
                      height: 1,
                      background: 'rgba(255,255,255,0.45)',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* CONSECUENCIAS / OUTPUTS */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div
                className="eyebrow flex items-center gap-2"
                style={{ justifyContent: 'flex-end' }}
              >
                <span>Consecuencias</span>
                <span
                  className="font-mono"
                  style={{
                    color: 'var(--color-orange)',
                    fontWeight: 700,
                  }}
                >
                  Outputs →
                </span>
              </div>
              {ARBOL_PROBLEMA.consecuencias.map((e, i) => (
                <motion.div
                  key={e.codigo}
                  {...fade(0.12 + i * 0.06)}
                  className="card-orange-soft"
                  style={{ padding: 20 }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: 'var(--color-orange)',
                        fontWeight: 700,
                      }}
                    >
                      {e.codigo}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--color-navy-deep)',
                        lineHeight: 1.25,
                      }}
                    >
                      {e.titulo}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: 'var(--color-ink-soft)',
                      maxWidth: '30ch',
                    }}
                  >
                    {e.detalle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
