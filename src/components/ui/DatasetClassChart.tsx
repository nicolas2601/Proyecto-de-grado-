// ─────────────────────────────────────────────────────────────────────────
// Distribución de clases diagnósticas en HAM10000 · barplot horizontal
// con anotación de count + % y métricas Shannon/Gini en caption.
// Datos exactos del notebook objetivo1_eda_COLAB.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HAM10000, BCN20000 } from '@/data/eda';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

type Dataset = 'ham' | 'bcn';

const TYPE_COLOR: Record<string, string> = {
  Maligna: '#E63946',
  Benigna: '#1F8C88',
  Precancerosa: '#F2B842',
  Indeterminada: '#8C99A8',
};

export default function DatasetClassChart() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Dataset>('ham');

  const ds = active === 'ham' ? HAM10000 : BCN20000;
  const items =
    active === 'ham'
      ? HAM10000.classes.map((c) => ({
          label: c.label,
          code: c.code,
          count: c.count,
          pct: c.pct,
          type: c.type,
        }))
      : BCN20000.granular.map((c) => ({
          label: c.label,
          code: '',
          count: c.value,
          pct: (c.value / BCN20000.size) * 100,
          type: c.label.match(/Carcinoma|Melanoma|Queratosis actínica/)
            ? 'Maligna'
            : c.label.match(/Indetermin/)
            ? 'Indeterminada'
            : 'Benigna',
        }));

  const sorted = [...items].sort((a, b) => b.count - a.count);
  const maxCount = sorted[0]?.count ?? 1;

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-line)',
        borderRadius: 18,
        padding: 'clamp(20px, 2.5vw, 32px)',
      }}
    >
      {/* Header con tabs */}
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        <div>
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
            Distribución de clases · {ds.name}
          </h4>
          <div
            className="font-mono uppercase mt-1"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            {ds.size.toLocaleString('es-CO')} imágenes · Shannon {ds.shannonEntropy} bit / {ds.shannonMax} máx · Gini {ds.gini}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tab active={active === 'ham'} onClick={() => setActive('ham')}>
            HAM10000
          </Tab>
          <Tab active={active === 'bcn'} onClick={() => setActive('bcn')}>
            BCN20000
          </Tab>
        </div>
      </div>

      {/* Barplot horizontal */}
      <div className="flex flex-col gap-2.5">
        {sorted.map((c, i) => {
          const pctOfMax = (c.count / maxCount) * 100;
          const color = TYPE_COLOR[c.type] ?? '#8C99A8';
          return (
            <motion.div
              key={c.label + i}
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.55, ease: ENTER, delay: i * 0.06 }}
              className="grid items-center gap-3"
              style={{
                gridTemplateColumns: 'minmax(150px, 200px) 1fr 110px',
              }}
            >
              {/* Label */}
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-navy)',
                  lineHeight: 1.25,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 6,
                }}
              >
                {c.code && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--color-mist)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {c.code}
                  </span>
                )}
                <span>{c.label}</span>
              </div>

              {/* Bar */}
              <div
                style={{
                  position: 'relative',
                  height: 22,
                  background: 'rgba(15,44,69,0.04)',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={reduced ? { width: `${pctOfMax}%` } : { width: 0 }}
                  whileInView={
                    reduced ? undefined : { width: `${pctOfMax}%` }
                  }
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{
                    duration: 0.85,
                    ease: ENTER,
                    delay: 0.25 + i * 0.06,
                  }}
                  style={{
                    height: '100%',
                    background: color,
                    borderRadius: 6,
                  }}
                />
              </div>

              {/* Count + % */}
              <div
                className="tabular-nums"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12.5,
                  color: 'var(--color-charcoal)',
                  textAlign: 'right',
                  fontWeight: 600,
                }}
              >
                {c.count.toLocaleString('es-CO')}{' '}
                <span style={{ color: 'var(--color-mist)', fontWeight: 400 }}>
                  ({c.pct.toFixed(1)} %)
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer · meta + refs */}
      <div
        className="mt-5 pt-4 flex items-center justify-between flex-wrap gap-3"
        style={{ borderTop: '1px solid var(--color-line)' }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          {Object.entries(TYPE_COLOR).map(([type, color]) => (
            <span
              key={type}
              className="font-mono uppercase flex items-center gap-2"
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                color: 'var(--color-graphite)',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: color,
                }}
              />
              {type}
            </span>
          ))}
        </div>
        <div
          className="font-mono uppercase flex items-center gap-2"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          <span>{ds.source}</span>
          {ds.refs.length > 0 && <Cite refs={ds.refs as string[]} tone="paper" />}
        </div>
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        background: active ? 'var(--color-navy)' : 'transparent',
        color: active ? '#FFFFFF' : 'var(--color-graphite)',
        border: `1px solid ${active ? 'var(--color-navy)' : 'var(--color-line)'}`,
        borderRadius: 9999,
        padding: '6px 14px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}
