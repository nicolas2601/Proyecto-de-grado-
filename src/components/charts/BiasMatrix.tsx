import { motion } from 'framer-motion';
import { biasMatrix } from '@/data/eda';

type Severity = 'high' | 'medium' | 'low';

// ─────────────────────────────────────────────────────────────────────
// DAYOS · Bias severity bars
// high → ink · medium → ash · low → fog
// Action-green dot marker on every row for visual rhythm.
// ─────────────────────────────────────────────────────────────────────
const SEVERITY_FILL: Record<Severity, string> = {
  high: '#000000',
  medium: '#444444',
  low: '#979797',
};

const SEVERITY_LABEL: Record<Severity, string> = {
  high: 'alto',
  medium: 'medio',
  low: 'bajo',
};

const SEVERITY_WIDTH: Record<Severity, string> = {
  high: '92%',
  medium: '58%',
  low: '30%',
};

export default function BiasMatrix() {
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <span className="eyebrow-up">── SESGOS · 7</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#979797',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          severidad · ink ramp
        </span>
      </div>

      <div className="space-y-4">
        {biasMatrix.map((b, i) => {
          const sev = b.severity as Severity;
          return (
            <motion.div
              key={b.bias}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              {/* Row header */}
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: sev === 'high' ? '#000000' : '#d1ffca',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#000000',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {b.bias}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: SEVERITY_FILL[sev],
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {SEVERITY_LABEL[sev]}
                </span>
              </div>

              {/* Severity bar */}
              <div
                className="relative w-full"
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: SEVERITY_WIDTH[sev] }}
                  transition={{
                    delay: 0.2 + i * 0.04,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  style={{
                    height: '100%',
                    background: SEVERITY_FILL[sev],
                    borderRadius: 4,
                  }}
                />
              </div>

              {/* Description */}
              <p
                className="mt-2"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 12,
                  color: '#444444',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                {b.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
