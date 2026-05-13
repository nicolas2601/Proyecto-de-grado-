// ─────────────────────────────────────────────────────────────────────────
// Cards expandibles para supuestos de la hipótesis. Cada card muestra:
// id, texto, badge "validable", mecanismo de validación, refs y un
// indicador visual de método (no afirma resultados, solo plan de validación).
// Hover/focus expande con altura suave; mobile siempre expandido.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

export type Supuesto = {
  id: string;
  texto: string;
  validacion: string;
  refs: readonly string[] | string[];
};

// Heurística mínima · marca tipo de método de validación a partir de
// keywords en el texto de validación. Solo afecta el icono y la barra
// indicativa, no cambia el contenido.
function detectMethod(texto: string): {
  label: string;
  bars: number; // 1..4 (relación de complejidad de la validación)
  hue: string;
} {
  const t = texto.toLowerCase();
  if (t.includes('auc') || t.includes('f1')) {
    return { label: 'comparación métrica', bars: 4, hue: '#1F8C88' };
  }
  if (t.includes('submuestra') || t.includes('controlada')) {
    return { label: 'ablación · submuestras', bars: 3, hue: '#F2B842' };
  }
  if (t.includes('cruce') || t.includes('registro')) {
    return { label: 'cruce de clases', bars: 2, hue: '#F26B3A' };
  }
  return { label: 'validación empírica', bars: 3, hue: '#1F8C88' };
}

export default function HypothesisCards({
  supuestos,
}: {
  supuestos: readonly Supuesto[];
}) {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {supuestos.map((s, i) => {
        const method = detectMethod(s.validacion);
        const isExpanded = expanded === s.id;
        return (
          <motion.article
            key={s.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: i * 0.1 }}
            onMouseEnter={() => setExpanded(s.id)}
            onMouseLeave={() => setExpanded(null)}
            onFocus={() => setExpanded(s.id)}
            onBlur={() => setExpanded(null)}
            tabIndex={0}
            style={{
              position: 'relative',
              background: '#FFFFFF',
              border: `1px solid ${
                isExpanded ? 'rgba(31,140,136,0.45)' : 'rgba(15,44,69,0.10)'
              }`,
              borderRadius: 16,
              padding: '22px 22px 24px',
              boxShadow: isExpanded
                ? '0 18px 38px -22px rgba(31,140,136,0.4), 0 4px 10px -4px rgba(15,44,69,0.08)'
                : '0 1px 2px rgba(15,44,69,0.04)',
              transition:
                'border-color 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isExpanded
                ? 'translateY(-3px)'
                : 'translateY(0)',
              cursor: 'default',
              outline: 'none',
            }}
          >
            {/* Header · ID + badge */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-mono"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--color-teal)',
                  letterSpacing: '0.04em',
                }}
              >
                {s.id}
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  color: 'var(--color-teal)',
                  background: 'rgba(31,140,136,0.08)',
                  border: '1px solid rgba(31,140,136,0.18)',
                  borderRadius: 9999,
                  padding: '3px 8px',
                }}
              >
                validable
              </span>
            </div>

            {/* Texto del supuesto */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.45,
                color: 'var(--color-navy)',
                letterSpacing: '-0.005em',
                marginBottom: 18,
                minHeight: 95,
              }}
            >
              {s.texto}
            </p>

            {/* Método · barras visuales (indicativo) */}
            <div className="mb-3">
              <div
                className="flex items-center justify-between mb-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-graphite)',
                }}
              >
                <span>método</span>
                <span style={{ color: method.hue }}>{method.label}</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((b) => (
                  <motion.span
                    key={b}
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={
                      reduced ? undefined : { scaleX: b <= method.bars ? 1 : 0.2 }
                    }
                    viewport={{ once: true, margin: '-6%' }}
                    transition={{
                      duration: 0.55,
                      ease: ENTER,
                      delay: 0.35 + i * 0.1 + b * 0.06,
                    }}
                    style={{
                      flex: 1,
                      height: 5,
                      borderRadius: 3,
                      background: b <= method.bars ? method.hue : 'rgba(15,44,69,0.08)',
                      transformOrigin: 'left',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Validación · expandible */}
            <motion.div
              animate={{
                opacity: isExpanded ? 1 : 0.65,
              }}
              transition={{ duration: 0.3, ease: ENTER }}
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: '1px dashed rgba(15,44,69,0.12)',
              }}
            >
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 9.5,
                  letterSpacing: '0.18em',
                  color: 'var(--color-graphite)',
                  marginBottom: 6,
                }}
              >
                Validación esperada
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: 'var(--color-ink-soft)',
                  marginBottom: 12,
                }}
              >
                {s.validacion}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-graphite)',
                  }}
                >
                  Fuente
                </span>
                <Cite refs={s.refs as string[]} tone="paper" />
              </div>
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
}
