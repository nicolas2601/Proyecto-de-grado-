// ─────────────────────────────────────────────────────────────────────────
// Matriz de cobertura · patologías priorizadas × datasets disponibles.
// Heatmap categórico de 3 niveles · cubierto / parcial / ausente.
// Datos exactos del notebook objetivo1_eda_COLAB · Tabla 11.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { COVERAGE_MATRIX, type CoverageLevel } from '@/data/eda';
import { ENTER } from '@/lib/motion';

const PRIORITY_COLOR: Record<string, string> = {
  CRÍTICA: '#E63946',
  ALTA: '#F26B3A',
  MEDIA: '#F2B842',
  BAJA: '#8C99A8',
  FUTURO: '#4D5B6D',
};

const COVERAGE_META: Record<
  CoverageLevel,
  { label: string; bg: string; fg: string; icon: string }
> = {
  covered: {
    label: 'Cubierta',
    bg: 'var(--color-teal)',
    fg: '#FFFFFF',
    icon: '✓',
  },
  partial: {
    label: 'Parcial',
    bg: '#F2B842',
    fg: '#0F2C45',
    icon: '◐',
  },
  absent: {
    label: 'Ausente',
    bg: 'rgba(15,44,69,0.06)',
    fg: 'var(--color-mist)',
    icon: '—',
  },
};

const DATASETS = [
  { key: 'ham', label: 'HAM10000', size: '10.015' },
  { key: 'bcn', label: 'BCN20000', size: '18.946' },
  { key: 'co2', label: 'CO2Wounds-V2', size: '764' },
] as const;

export default function CoverageMatrix() {
  const reduced = useReducedMotion();
  const [hoverRow, setHoverRow] = useState<number | null>(null);

  // Resumen agregado
  const totals = DATASETS.map((d) => {
    const key = d.key as 'ham' | 'bcn' | 'co2';
    const cov = COVERAGE_MATRIX.filter((r) => r[key] === 'covered').length;
    const par = COVERAGE_MATRIX.filter((r) => r[key] === 'partial').length;
    return { ...d, covered: cov, partial: par, total: COVERAGE_MATRIX.length };
  });

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-line)',
        borderRadius: 18,
        padding: 'clamp(20px, 2.5vw, 32px)',
        overflowX: 'auto',
      }}
    >
      <div className="mb-5 flex items-baseline justify-between flex-wrap gap-3">
        <h4
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 19,
            fontWeight: 600,
            color: 'var(--color-navy)',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Cobertura cruzada · patologías Santander × datasets
        </h4>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          {COVERAGE_MATRIX.length} patologías × {DATASETS.length} datasets
        </span>
      </div>

      <div style={{ minWidth: 720 }}>
        {/* Header */}
        <div
          className="grid items-end pb-3 mb-2"
          style={{
            gridTemplateColumns: '1.5fr 90px repeat(3, 1fr)',
            gap: 8,
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            Patología
          </div>
          <div
            className="font-mono uppercase text-center"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            Prioridad
          </div>
          {DATASETS.map((d) => (
            <div
              key={d.key}
              className="text-center"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--color-navy)',
              }}
            >
              {d.label}
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.04em',
                  color: 'var(--color-mist)',
                  fontWeight: 400,
                  marginTop: 2,
                }}
              >
                n = {d.size}
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {COVERAGE_MATRIX.map((row, ri) => {
          const active = hoverRow === ri;
          return (
            <motion.div
              key={row.pathology}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-4%' }}
              transition={{ duration: 0.55, ease: ENTER, delay: ri * 0.05 }}
              onMouseEnter={() => setHoverRow(ri)}
              onMouseLeave={() => setHoverRow(null)}
              className="grid items-center"
              style={{
                gridTemplateColumns: '1.5fr 90px repeat(3, 1fr)',
                gap: 8,
                padding: '12px 0',
                borderBottom: '1px solid rgba(15,44,69,0.05)',
                background: active ? 'rgba(31,140,136,0.04)' : 'transparent',
                borderRadius: 6,
                transition: 'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14.5,
                  fontWeight: active ? 600 : 500,
                  color: 'var(--color-navy)',
                  paddingLeft: 8,
                }}
              >
                {row.pathology}
              </div>
              <div className="flex justify-center">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                    background: PRIORITY_COLOR[row.priority] ?? '#8C99A8',
                    padding: '4px 10px',
                    borderRadius: 9999,
                  }}
                >
                  {row.priority}
                </span>
              </div>
              {(['ham', 'bcn', 'co2'] as const).map((key) => {
                const cov = row[key];
                const meta = COVERAGE_META[cov];
                return (
                  <div key={key} className="flex justify-center">
                    <motion.span
                      initial={reduced ? false : { scale: 0, opacity: 0 }}
                      whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-4%' }}
                      transition={{
                        duration: 0.45,
                        ease: ENTER,
                        delay: 0.2 + ri * 0.05 + 0.04,
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: meta.bg,
                        color: meta.fg,
                        borderRadius: 9999,
                        padding: '5px 12px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        minWidth: 88,
                        justifyContent: 'center',
                      }}
                    >
                      <span aria-hidden style={{ fontSize: 13 }}>
                        {meta.icon}
                      </span>
                      {meta.label}
                    </motion.span>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {/* Footer · resumen */}
        <div
          className="grid items-center mt-4 pt-4"
          style={{
            gridTemplateColumns: '1.5fr 90px repeat(3, 1fr)',
            gap: 8,
            borderTop: '2px solid var(--color-navy)',
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-navy)',
              fontWeight: 700,
              paddingLeft: 8,
            }}
          >
            Cobertura total
          </div>
          <div />
          {totals.map((t) => (
            <div
              key={t.key}
              className="text-center font-mono"
              style={{
                fontSize: 14,
                color: 'var(--color-navy)',
                fontWeight: 700,
              }}
            >
              {t.covered}
              <span style={{ color: 'var(--color-mist)', fontWeight: 400 }}>
                {' '}
                / {t.total}
              </span>
              {t.partial > 0 && (
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--color-graphite)',
                    fontWeight: 500,
                    marginLeft: 6,
                  }}
                >
                  (+{t.partial} parcial)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div
        className="mt-4 pt-4 flex items-center gap-4 flex-wrap"
        style={{ borderTop: '1px solid var(--color-line)' }}
      >
        {(Object.entries(COVERAGE_META) as [CoverageLevel, typeof COVERAGE_META[CoverageLevel]][]).map(
          ([key, meta]) => (
            <span
              key={key}
              className="font-mono flex items-center gap-2"
              style={{
                fontSize: 11,
                color: 'var(--color-graphite)',
              }}
            >
              <span
                aria-hidden
                style={{
                  display: 'inline-flex',
                  width: 18,
                  height: 18,
                  background: meta.bg,
                  color: meta.fg,
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {meta.icon}
              </span>
              {meta.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
