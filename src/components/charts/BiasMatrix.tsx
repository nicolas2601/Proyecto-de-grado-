import { motion } from 'framer-motion';
import { biasMatrix } from '@/data/eda';

type Severity = 'high' | 'medium' | 'low';

const SEVERITY_FILL: Record<Severity, string> = {
  high: '#292929',
  medium: 'url(#biasHatch)',
  low: '#b4b8b4',
};

const SEVERITY_LABEL: Record<Severity, string> = {
  high: 'Crítico',
  medium: 'Medio',
  low: 'Bajo',
};

const SEVERITY_WIDTH: Record<Severity, string> = {
  high: '92%',
  medium: '58%',
  low: '30%',
};

export default function BiasMatrix() {
  return (
    <div className="w-full">
      {/* Header rule */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#292929]">
        <span aria-hidden className="block h-px w-6 bg-[#292929]" />
        <span
          style={{
            fontFamily: "'Oswald', Impact, sans-serif",
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#292929',
          }}
        >
          Sesgos identificados · Severidad
        </span>
      </div>

      {/* Inline SVG defs for hatch pattern (reused per row) */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <pattern
            id="biasHatch"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <rect width="6" height="6" fill="#ffffff" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#292929" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      <div className="space-y-2.5">
        {biasMatrix.map((b, i) => {
          const sev = b.severity as Severity;
          return (
            <motion.div
              key={b.bias}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-[110px_1fr_70px] items-center gap-3"
            >
              {/* Bias name */}
              <span
                style={{
                  fontFamily: "'Oswald', Impact, sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#292929',
                  lineHeight: 1.15,
                }}
              >
                {b.bias}
              </span>

              {/* Severity bar · 1px ink frame, hard-edged fill */}
              <div
                className="relative h-3 border border-[#292929]"
                style={{ borderRadius: 0, background: '#ffffff' }}
              >
                <motion.svg
                  initial={{ width: 0 }}
                  whileInView={{ width: SEVERITY_WIDTH[sev] }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="absolute inset-y-0 left-0 h-full"
                  preserveAspectRatio="none"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill={SEVERITY_FILL[sev]}
                    style={{ borderRadius: 0 }}
                  />
                </motion.svg>
              </div>

              {/* Severity label */}
              <span
                className="text-right"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#292929',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {SEVERITY_LABEL[sev]}
              </span>

              {/* Description spans full row */}
              <span
                className="col-span-3 -mt-1"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 11,
                  color: '#292929',
                  lineHeight: 1.4,
                }}
              >
                {b.desc}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {(['high', 'medium', 'low'] as Severity[]).map((sev) => (
          <span
            key={sev}
            className="inline-flex items-center gap-2 px-2 py-1 border border-[#292929]"
            style={{ borderRadius: 0 }}
          >
            <span
              aria-hidden
              className="relative block h-3 w-4 border border-[#292929]"
              style={{ borderRadius: 0 }}
            >
              {sev === 'high' && (
                <span className="absolute inset-0" style={{ background: '#292929' }} />
              )}
              {sev === 'medium' && (
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`biasLegendHatch-${sev}`}
                      patternUnits="userSpaceOnUse"
                      width="4"
                      height="4"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y1="0" x2="0" y2="4" stroke="#292929" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#biasLegendHatch-${sev})`} />
                </svg>
              )}
              {sev === 'low' && (
                <span className="absolute inset-0" style={{ background: '#b4b8b4' }} />
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
              {SEVERITY_LABEL[sev]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
