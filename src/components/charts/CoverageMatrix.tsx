import { motion } from 'framer-motion';
import { coverageMatrix } from '@/data/eda';

type CoverageValue = 'covered' | 'partial' | 'absent';

// MONO X7 cell renderer · solid black, diagonal hatch pattern, or empty
function CoverageCell({ value }: { value: CoverageValue }) {
  return (
    <div
      className="relative h-7 w-full border border-[#292929] overflow-hidden transition-[outline] duration-150 hover:outline hover:outline-2 hover:outline-black"
      style={{ borderRadius: 0 }}
    >
      {value === 'covered' && (
        <div className="absolute inset-0" style={{ background: '#292929' }} />
      )}
      {value === 'partial' && (
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="coverageHatch"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="#292929" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coverageHatch)" />
        </svg>
      )}
      {/* absent → empty white, no fill */}
    </div>
  );
}

export default function CoverageMatrix() {
  return (
    <div className="w-full font-[Oswald]">
      {/* Column header · ink bottom border */}
      <div
        className="grid grid-cols-[1fr_repeat(3,68px)] gap-1 pb-1.5 mb-1.5 border-b"
        style={{ borderColor: '#292929', borderWidth: '0 0 1px 0' }}
      >
        <div />
        {['HAM', 'BCN', 'CO2W'].map((label) => (
          <div
            key={label}
            className="text-center"
            style={{
              fontFamily: "'Oswald', Impact, sans-serif",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#292929',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {coverageMatrix.map((row, i) => (
          <motion.div
            key={row.pathology}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-[1fr_repeat(3,68px)] gap-1 items-center"
          >
            {/* Row label · ink right border */}
            <div
              className="flex items-center gap-2 pr-2 border-r"
              style={{ borderColor: '#292929', borderWidth: '0 1px 0 0', minHeight: 28 }}
            >
              <span
                style={{
                  fontFamily: "'Oswald', Impact, sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#292929',
                  lineHeight: 1.1,
                }}
              >
                {row.pathology}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#646464',
                  marginLeft: 'auto',
                }}
              >
                · {row.priority}
              </span>
            </div>
            {(['ham', 'bcn', 'co2'] as const).map((col) => (
              <CoverageCell key={col} value={row[col] as CoverageValue} />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-5">
        {[
          { label: 'Cubierta', kind: 'solid' as const },
          { label: 'Parcial', kind: 'hatch' as const },
          { label: 'Ausente', kind: 'empty' as const },
        ].map((entry) => (
          <span key={entry.label} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="relative block h-3 w-4 border border-[#292929]"
              style={{ borderRadius: 0 }}
            >
              {entry.kind === 'solid' && (
                <span className="absolute inset-0" style={{ background: '#292929' }} />
              )}
              {entry.kind === 'hatch' && (
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`legendHatch-${entry.label}`}
                      patternUnits="userSpaceOnUse"
                      width="4"
                      height="4"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y1="0" x2="0" y2="4" stroke="#292929" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#legendHatch-${entry.label})`} />
                </svg>
              )}
            </span>
            <span
              style={{
                fontFamily: "'Oswald', Impact, sans-serif",
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#292929',
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
