import { motion } from 'framer-motion';
import { JUSTIFICACION, JUSTIFICACION_RESUMEN } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

// ── Icon set inline SVG 32px ──────────────────────────
function IconUsers({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="4" />
      <circle cx="22" cy="13" r="3" />
      <path d="M3 26c0-4 4-7 8-7s8 3 8 7" />
      <path d="M19 26c0-3 3-5 6-5s4 2 4 5" />
    </svg>
  );
}

function IconNetwork({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="8" r="2.4" />
      <circle cx="6" cy="24" r="2.4" />
      <circle cx="16" cy="16" r="2.6" />
      <circle cx="26" cy="8" r="2.4" />
      <circle cx="26" cy="24" r="2.4" />
      <path d="M8.3 9.4l5.5 5.2M8.3 22.6l5.5-5.2M18.2 14.6l5.6-5.2M18.2 17.4l5.6 5.2" />
    </svg>
  );
}

function IconDatabase({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="16" cy="8" rx="10" ry="3.5" />
      <path d="M6 8v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5V8" />
      <path d="M6 16v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-8" />
    </svg>
  );
}

function IconGearSpark({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="4" />
      <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.5 6.5l2.2 2.2M23.3 23.3l2.2 2.2M6.5 25.5l2.2-2.2M23.3 8.7l2.2-2.2" />
    </svg>
  );
}

function IconGraduation({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l14-6 14 6-14 6L2 12z" />
      <path d="M8 15v6c0 2 3.6 4 8 4s8-2 8-4v-6" />
      <path d="M28 13v8" />
    </svg>
  );
}

const QUAD_ICONS = [IconUsers, IconNetwork, IconGearSpark, IconDatabase];

export default function Section04Justificacion() {
  const cuadrantes = JUSTIFICACION.slice(0, 4);
  const formacion = JUSTIFICACION[4];

  return (
    <section
      id="justificacion"
      className="section relative overflow-hidden bg-soft-navy"
    >
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0" style={{ opacity: 0.35 }} />

      <div className="container relative">
        {/* Header */}
        <motion.div {...fade(0)} className="eyebrow-num mb-6">
          §04 / Justificación
        </motion.div>

        <motion.h2
          {...fade(0.08)}
          className="font-display"
          style={{
            color: 'var(--color-navy)',
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.05,
            maxWidth: '22ch',
          }}
        >
          Por qué este proyecto,{' '}
          <span className="font-serif-it" style={{ color: 'var(--color-teal)' }}>
            por qué ahora.
          </span>
        </motion.h2>

        <motion.p
          {...fade(0.16)}
          className="mt-6"
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '60ch',
          }}
        >
          Una respuesta directa a una necesidad regional documentada.
        </motion.p>

        {/* ── GRID 2x2 BENTO ─────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cuadrantes.map((item, i) => {
            const Icon = QUAD_ICONS[i];
            const destacado = 'destacado' in item && item.destacado;
            return (
              <motion.div
                key={item.titulo}
                {...fade(0.22 + i * 0.07)}
                className={destacado ? 'card-teal' : 'card-paper'}
                style={{
                  padding: 36,
                  minHeight: 240,
                  position: 'relative',
                  borderColor: destacado ? 'transparent' : 'var(--color-line)',
                }}
              >
                {/* Index micro tag */}
                <div
                  className="font-mono"
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: destacado ? 'rgba(255,255,255,0.6)' : 'var(--color-mist)',
                  }}
                >
                  0{i + 1}
                </div>

                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: destacado ? 'rgba(255,255,255,0.14)' : 'rgba(31,140,136,0.10)',
                    color: destacado ? '#ffffff' : 'var(--color-teal)',
                    marginBottom: 20,
                  }}
                >
                  <Icon />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(22px, 2vw, 28px)',
                    lineHeight: 1.2,
                    color: destacado ? '#ffffff' : 'var(--color-navy)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.titulo}
                </h3>

                <p
                  className="mt-3"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: destacado ? 'rgba(255,255,255,0.92)' : 'var(--color-ink-soft)',
                    maxWidth: '46ch',
                  }}
                >
                  {item.texto}
                </p>

                {destacado && (
                  <div
                    className="mt-5"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      color: '#ffffff',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: 9999,
                      display: 'inline-flex',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Valor agregado
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Formación profesional · card ancho completo ───── */}
        {formacion && (
          <motion.div
            {...fade(0.55)}
            className="card-paper mt-5 lg:mt-6"
            style={{
              padding: 32,
              borderLeft: '4px solid var(--color-teal)',
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(31,140,136,0.10)',
                color: 'var(--color-teal)',
                flexShrink: 0,
              }}
            >
              <IconGraduation />
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                Eje transversal
              </div>
              <h3
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(22px, 1.8vw, 26px)',
                  color: 'var(--color-navy)',
                  letterSpacing: '-0.02em',
                }}
              >
                {formacion.titulo}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: 'var(--color-ink-soft)',
                  maxWidth: '72ch',
                }}
              >
                {formacion.texto}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Resumen estratégico · card navy ──────────────── */}
        <motion.div
          {...fade(0.65)}
          className="card-navy mt-10"
          style={{ padding: 48 }}
        >
          <div
            className="eyebrow"
            style={{ color: 'var(--color-teal-soft)', marginBottom: 28 }}
          >
            Resumen estratégico
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Importancia */}
            <div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                Importancia
              </h4>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.importancia}
              </p>
            </div>

            {/* Pertenencia */}
            <div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                Pertenencia
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Técnica
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.tecnica}
                  </div>
                </li>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Académica
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.academica}
                  </div>
                </li>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Social
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.social}
                  </div>
                </li>
              </ul>
            </div>

            {/* Beneficiarios */}
            <div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                Beneficiarios
              </h4>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.beneficiarios}
              </p>
            </div>

            {/* Alcance corto */}
            <div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                }}
              >
                Alcance corto
              </h4>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.alcanceCorto}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
