import { motion } from 'framer-motion';
import { coverageMatrix } from '@/data/eda';

type CoverageValue = 'covered' | 'partial' | 'absent';

// ─────────────────────────────────────────────────────────────────────
// DAYOS · Coverage matrix
// covered → ink solid · partial → green hatch · absent → empty paper
// Rounded 6px cells, 1px hairline borders.
// ─────────────────────────────────────────────────────────────────────
function Cell({ value }: { value: CoverageValue }) {
  return (
    <div
      className="relative h-9 w-full overflow-hidden transition-transform duration-200 hover:scale-105"
      style={{
        borderRadius: 6,
        border: '1px solid rgba(0, 0, 0, 0.08)',
        background: '#ffffff',
      }}
    >
      {value === 'covered' && (
        <div className="absolute inset-0" style={{ background: '#000000', borderRadius: 5 }} />
      )}
      {value === 'partial' && (
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="covHatch"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="#d1ffca" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#000000" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#covHatch)" rx="5" ry="5" />
        </svg>
      )}
    </div>
  );
}

export default function CoverageMatrix() {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <span className="eyebrow-up">── COBERTURA · 10 PATOLOGÍAS × 3 DATASETS</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#979797',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {coverageMatrix.length} · ROW
        </span>
      </div>

      {/* Column header */}
      <div
        className="grid gap-2 pb-3 mb-2"
        style={{
          gridTemplateColumns: '1fr 70px 70px 70px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div />
        {['HAM', 'BCN', 'CO2W'].map((label) => (
          <div
            key={label}
            className="text-center"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#444444',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {coverageMatrix.map((row, i) => (
          <motion.div
            key={row.pathology}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="grid gap-2 items-center"
            style={{ gridTemplateColumns: '1fr 70px 70px 70px' }}
          >
            <div className="flex items-baseline justify-between pr-3 min-w-0">
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#000000',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.pathology}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.05em',
                  color: '#979797',
                  textTransform: 'uppercase',
                  marginLeft: 8,
                  flexShrink: 0,
                }}
              >
                · {row.priority}
              </span>
            </div>
            {(['ham', 'bcn', 'co2'] as const).map((col) => (
              <Cell key={col} value={row[col] as CoverageValue} />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div
        className="mt-5 pt-4 flex flex-wrap items-center gap-4"
        style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}
      >
        {[
          { label: 'cubierta', kind: 'solid' as const },
          { label: 'parcial',  kind: 'hatch' as const },
          { label: 'ausente',  kind: 'empty' as const },
        ].map((entry) => (
          <span key={entry.label} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              style={{
                position: 'relative',
                display: 'inline-block',
                width: 16,
                height: 12,
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.08)',
                background:
                  entry.kind === 'solid'
                    ? '#000000'
                    : entry.kind === 'hatch'
                    ? 'repeating-linear-gradient(45deg, #d1ffca 0 2px, #000000 2px 3px)'
                    : '#ffffff',
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.05em',
                color: '#444444',
              }}
            >
              {entry.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
