// ─────────────────────────────────────────────────────────────────────────
// Ranking de patologías priorizadas para el modelo SSL · Santander.
// Lista ordenada por prioridad (CRÍTICA / ALTA / MEDIA / BAJA) con
// justificación epidemiológica y referencias. Tabla 9.6 del notebook.
// ─────────────────────────────────────────────────────────────────────────

import { motion, useReducedMotion } from 'framer-motion';
import { SSL_RANKING } from '@/data/eda';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

const PRIORITY_COLOR: Record<string, string> = {
  CRÍTICA: '#E63946',
  ALTA: '#F26B3A',
  MEDIA: '#F2B842',
  BAJA: '#8C99A8',
};

const CATEGORY_COLOR: Record<string, string> = {
  Maligna: '#E63946',
  Parasitaria: '#F2B842',
  Inflamatoria: '#41a1cf',
  Hospitalaria: '#9b6dff',
};

export default function PriorityRanking() {
  const reduced = useReducedMotion();

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-line)',
        borderRadius: 18,
        padding: 'clamp(20px, 2.5vw, 32px)',
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
          Patologías priorizadas para el modelo · Santander
        </h4>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          {SSL_RANKING.length} patologías · 4 niveles
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {SSL_RANKING.map((row, i) => {
          const catColor = CATEGORY_COLOR[row.category] ?? '#8C99A8';
          const prioColor = PRIORITY_COLOR[row.priority] ?? '#8C99A8';
          return (
            <motion.div
              key={row.rank}
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-4%' }}
              transition={{ duration: 0.5, ease: ENTER, delay: i * 0.05 }}
              className="grid items-center gap-3"
              style={{
                gridTemplateColumns: '40px 1fr 110px',
                padding: '14px 16px',
                background:
                  row.priority === 'CRÍTICA'
                    ? 'rgba(230,57,70,0.04)'
                    : 'rgba(15,44,69,0.02)',
                border: `1px solid ${
                  row.priority === 'CRÍTICA'
                    ? 'rgba(230,57,70,0.18)'
                    : 'var(--color-line)'
                }`,
                borderLeft: `4px solid ${catColor}`,
                borderRadius: 10,
              }}
            >
              {/* Rank */}
              <div
                className="tabular-nums font-mono"
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: catColor,
                  textAlign: 'center',
                }}
              >
                {String(row.rank).padStart(2, '0')}
              </div>

              {/* Texto */}
              <div>
                <div
                  className="flex items-baseline gap-2 flex-wrap"
                  style={{ marginBottom: 4 }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--color-navy)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {row.lesion}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      color: catColor,
                      background: `${catColor}18`,
                      padding: '2px 8px',
                      borderRadius: 9999,
                    }}
                  >
                    {row.category}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 flex-wrap"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  <span>{row.justification}</span>
                  {row.refs.length > 0 && (
                    <Cite refs={row.refs as string[]} tone="paper" />
                  )}
                </div>
              </div>

              {/* Prioridad pill */}
              <div className="flex justify-end">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#FFFFFF',
                    background: prioColor,
                    padding: '5px 12px',
                    borderRadius: 9999,
                  }}
                >
                  {row.priority}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Leyenda de categorías */}
      <div
        className="mt-4 pt-4 flex items-center gap-4 flex-wrap"
        style={{ borderTop: '1px solid var(--color-line)' }}
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          Categorías
        </span>
        {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
          <span
            key={cat}
            className="font-mono flex items-center gap-2"
            style={{ fontSize: 12, color: 'var(--color-charcoal)' }}
          >
            <span
              aria-hidden
              style={{
                width: 12,
                height: 4,
                background: color,
                borderRadius: 2,
              }}
            />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
