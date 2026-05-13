import { motion } from 'framer-motion';
import { OBJETIVOS } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

// ── Estilos del peldaño según índice ────────────────
const STEP_STYLES = [
  { background: 'var(--color-paper-warm)', color: 'var(--color-navy)', numColor: 'var(--color-mist)', border: '1px solid var(--color-line)' },
  { background: 'var(--color-paper-soft)', color: 'var(--color-navy)', numColor: 'var(--color-graphite)', border: '1px solid var(--color-line)' },
  { background: 'var(--color-teal-soft)', color: 'var(--color-navy)', numColor: 'var(--color-teal)', border: '1px solid rgba(31,140,136,0.25)' },
  { background: 'var(--color-teal)', color: '#ffffff', numColor: 'rgba(255,255,255,0.95)', border: '1px solid var(--color-teal)' },
];

const STEP_WIDTHS = ['72%', '82%', '92%', '100%'];

function StatusChip({ estado, dark = false }: { estado: string; dark?: boolean }) {
  const isCurrent = estado === 'EN CURSO';
  if (isCurrent) {
    return (
      <span className="status-current" style={{ background: dark ? 'rgba(255,255,255,0.22)' : undefined }}>
        <span className="dot-pulse" style={{ background: '#ffffff' }} />
        {estado}
      </span>
    );
  }
  return (
    <span
      className="status-pending"
      style={{
        color: dark ? 'rgba(255,255,255,0.85)' : undefined,
        borderColor: dark ? 'rgba(255,255,255,0.4)' : undefined,
      }}
    >
      {estado}
    </span>
  );
}

function IconArrowDown() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 5v22M9 20l7 7 7-7" />
    </svg>
  );
}

export default function Section06Objetivos() {
  const stepsReversed = [...OBJETIVOS.especificos].reverse();

  return (
    <section
      id="objetivos"
      className="section relative overflow-hidden bg-soft-navy"
    >
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" style={{ opacity: 0.35 }} />

      <div className="container relative">
        <motion.div {...fade(0)} className="eyebrow-num mb-6">
          §06 / Objetivos
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
          Un objetivo general.{' '}
          <span className="font-serif-it" style={{ color: 'var(--color-teal)' }}>
            Cuatro pasos verificables.
          </span>
        </motion.h2>

        {/* ── OBJETIVO GENERAL · cumbre ──────────────── */}
        <motion.div
          {...fade(0.18)}
          className="card-navy mt-14 relative"
          style={{
            padding: 36,
            maxWidth: '100%',
            zIndex: 2,
          }}
        >
          <div className="flex flex-wrap items-start gap-6">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(31,140,136,0.22)',
                color: 'var(--color-teal-soft)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <div
                className="eyebrow"
                style={{ color: 'var(--color-teal-soft)', marginBottom: 8 }}
              >
                Objetivo general
              </div>
              <p
                style={{
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {OBJETIVOS.general}
              </p>
            </div>
          </div>

          {/* Flecha conectora hacia abajo */}
          <div
            aria-hidden
            className="hidden md:flex"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -28,
              transform: 'translateX(-50%)',
              width: 48,
              height: 48,
              borderRadius: 9999,
              background: 'var(--color-teal)',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px -8px rgba(31,140,136,0.5)',
              border: '3px solid var(--color-paper)',
              zIndex: 3,
            }}
          >
            <IconArrowDown />
          </div>
        </motion.div>

        {/* ── ESCALERA ASCENDENTE ───────────────────────── */}
        <div
          className="mt-14 flex flex-col gap-3 lg:gap-4"
          style={{ alignItems: 'stretch' }}
        >
          {stepsReversed.map((step, displayIndex) => {
            const styleIdx = step.id - 1;
            const styles = STEP_STYLES[styleIdx];
            const width = STEP_WIDTHS[styleIdx];
            const isDark = step.id === 4;

            return (
              <motion.div
                key={step.id}
                {...fade(0.28 + displayIndex * 0.08)}
                style={{
                  width,
                  maxWidth: '100%',
                  marginLeft: 0,
                  background: styles.background,
                  color: styles.color,
                  border: styles.border,
                  borderRadius: 20,
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  position: 'relative',
                  boxShadow: isDark ? '0 18px 48px -16px rgba(31,140,136,0.35)' : 'var(--sh-sm)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Número mega */}
                <div
                  className="font-display tabular-nums"
                  style={{
                    fontSize: 'clamp(64px, 7vw, 96px)',
                    lineHeight: 0.9,
                    color: styles.numColor,
                    flexShrink: 0,
                    minWidth: 80,
                    fontWeight: 700,
                  }}
                >
                  {step.id}
                </div>

                <div style={{ flex: 1, minWidth: 240 }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isDark ? 'rgba(255,255,255,0.75)' : 'var(--color-graphite)',
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    OBJ-0{step.id} / {step.fase}
                  </div>
                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.45,
                      color: styles.color,
                      fontWeight: isDark ? 500 : 400,
                      maxWidth: '60ch',
                    }}
                  >
                    {step.texto}
                  </p>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <StatusChip estado={step.estado} dark={isDark} />
                </div>

                {/* Connector dashed line (entre peldaños) */}
                {displayIndex < stepsReversed.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 60,
                      bottom: -16,
                      width: 2,
                      height: 14,
                      borderLeft: '2px dashed var(--color-teal)',
                      opacity: 0.5,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Status legend ───────────────────────── */}
        <motion.div
          {...fade(0.7)}
          className="hairline mt-14 pt-6 flex flex-wrap items-center gap-4"
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
            Estado actual
          </span>
          <span className="status-current">
            <span className="dot-pulse" />
            OBJ-01 en curso
          </span>
          <span className="status-pending">
            OBJ-02 / 03 / 04 pendientes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
