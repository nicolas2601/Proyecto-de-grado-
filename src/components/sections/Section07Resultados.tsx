import { motion } from 'framer-motion';
import { RESULTADOS, METRICAS, PUNTOS_ESTRATEGICOS } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

export default function Section07Resultados() {
  return (
    <section
      id="resultados"
      className="section relative overflow-hidden"
      style={{ background: 'var(--color-paper)' }}
    >
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} />

      <div className="container relative">
        <motion.div {...fade(0)} className="eyebrow-num mb-6">
          §07 / Resultados esperados
        </motion.div>

        <motion.h2
          {...fade(0.08)}
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
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Col 7 · Entregable técnico */}
          <motion.div
            {...fade(0.18)}
            className="card-paper lg:col-span-7"
            style={{
              padding: 36,
              minHeight: 240,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
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

          {/* Col 5 · Entregable funcional */}
          <motion.div
            {...fade(0.26)}
            className="card-teal lg:col-span-5"
            style={{
              padding: 36,
              minHeight: 240,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
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
        </div>

        {/* ── TRL band · card navy ───────────────────────── */}
        <motion.div
          {...fade(0.35)}
          className="card-navy mt-5 lg:mt-6"
          style={{ padding: 'clamp(28px, 4vw, 56px)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
              <span
                className="font-display tabular-nums"
                style={{
                  fontSize: 'clamp(120px, 14vw, 180px)',
                  lineHeight: 0.85,
                  color: 'var(--color-teal-soft)',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                }}
              >
                4
              </span>
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
              <div className="mt-6 flex flex-wrap gap-2">
                {['TRL 1', 'TRL 2', 'TRL 3', 'TRL 4', 'TRL 5', 'TRL 6'].map((trl, i) => {
                  const active = trl === 'TRL 4';
                  const passed = i < 3;
                  return (
                    <span
                      key={trl}
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
                      }}
                    >
                      {trl}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 4 MÉTRICAS · grid 4-col ───────────────────────── */}
        <motion.div {...fade(0.45)} className="mt-12 mb-6">
          <span
            className="eyebrow"
            style={{ color: 'var(--color-graphite)' }}
          >
            Métricas de evaluación
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {METRICAS.map((m, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={m.nombre}
                {...fade(0.5 + i * 0.06)}
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
                }}
              >
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
              </motion.div>
            );
          })}
        </div>

        {/* ── 3 puntos estratégicos ───────────────────── */}
        <motion.div {...fade(0.65)} className="mt-12 mb-6">
          <span
            className="eyebrow"
            style={{ color: 'var(--color-graphite)' }}
          >
            Puntos estratégicos
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {PUNTOS_ESTRATEGICOS.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...fade(0.7 + i * 0.06)}
              className="card-paper"
              style={{
                padding: 28,
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderRadius: 20,
                borderTop: '3px solid var(--color-teal)',
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
            </motion.div>
          ))}
        </div>

        {/* Footer hairline */}
        <motion.div
          {...fade(0.88)}
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
            El prototipo informa explícitamente estas métricas al usuario médico, transparencia como principio de seguridad.
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
            §07 / resultados esperados
          </span>
        </motion.div>
      </div>
    </section>
  );
}
