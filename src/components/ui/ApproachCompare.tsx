// ─────────────────────────────────────────────────────────────────────────
// Comparativa visual Supervisado vs SSL, por eje. No afirma resultados:
// muestra el contraste cualitativo descrito en la literatura. Cada eje
// trae un indicador (mejor / dependiente / limitado) basado en keywords
// del propio dato. Hover sobre eje resalta el contraste.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

export type CompareRow = {
  eje: string;
  supervisado: string;
  ssl: string;
};

type Verdict = 'ventaja-ssl' | 'paridad' | 'ventaja-sup' | 'neutro';

function classifyRow(row: CompareRow): { sup: Verdict; ssl: Verdict } {
  const s = row.supervisado.toLowerCase();
  const x = row.ssl.toLowerCase();
  const sslPositive = /aprend|aprovech|superior|reducid|sin etiqueta|menor|bajo/;
  const sslNegative = /limitad|alto|requiere|dependiente|exhaustiv/;
  const supPositive = /superior|preciso|exhaustiv/;
  const supNegative = /alto|limitad|requiere|dependiente|exhaustiv/;
  return {
    sup: supNegative.test(s)
      ? 'ventaja-sup' // no, we want sup-negative -> sup is the limited one
      : supPositive.test(s)
      ? 'ventaja-sup'
      : 'neutro',
    ssl: sslPositive.test(x)
      ? 'ventaja-ssl'
      : sslNegative.test(x)
      ? 'paridad'
      : 'neutro',
  };
}

// Asigna un "score" simbólico (0..4) basado en valencia, solo para llenar la barra.
function barLevels(row: CompareRow): { sup: number; ssl: number } {
  const s = row.supervisado.toLowerCase();
  const x = row.ssl.toLowerCase();
  let sup = 2;
  let ssl = 2;
  if (/alto|requiere|exhaustiv/.test(s)) sup = 4;
  if (/limitad|dependiente/.test(s)) sup = 3;
  if (/bajo|sin etiqueta|menor/.test(x)) ssl = 1;
  if (/aprende|aprovech|superior|reducid/.test(x)) ssl = 1;
  if (/limitad/.test(x)) ssl = 3;
  return { sup, ssl };
}

const verdictMeta: Record<
  Verdict,
  { label: string; color: string; bg: string }
> = {
  'ventaja-ssl': {
    label: 'ventaja SSL',
    color: '#1F8C88',
    bg: 'rgba(31,140,136,0.10)',
  },
  paridad: {
    label: 'paridad',
    color: '#4D5B6D',
    bg: 'rgba(15,44,69,0.06)',
  },
  'ventaja-sup': {
    label: 'requiere',
    color: '#F26B3A',
    bg: 'rgba(242,107,58,0.10)',
  },
  neutro: {
    label: 'descriptivo',
    color: '#4D5B6D',
    bg: 'rgba(15,44,69,0.05)',
  },
};

export default function ApproachCompare({
  rows,
  refs,
}: {
  rows: readonly CompareRow[];
  refs?: readonly string[];
}) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-line)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: 'minmax(150px, 1.1fr) 1fr 1fr 110px',
          padding: '16px 22px',
          background: 'rgba(15,44,69,0.025)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          Eje
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-orange)',
          }}
        >
          Supervisado
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-teal)',
          }}
        >
          Autosupervisado · SSL
        </span>
        <span
          className="font-mono uppercase text-right"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-graphite)',
          }}
        >
          Lectura
        </span>
      </div>

      {/* Rows */}
      {rows.map((r, i) => {
        const lvl = barLevels(r);
        const verdict = classifyRow(r);
        const meta = verdictMeta[verdict.ssl];
        const active = hover === i;
        const dimmed = hover !== null && !active;
        return (
          <motion.div
            key={r.eje}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.65, ease: ENTER, delay: 0.15 + i * 0.1 }}
            className="grid items-center"
            style={{
              gridTemplateColumns: 'minmax(150px, 1.1fr) 1fr 1fr 110px',
              padding: '18px 22px',
              borderBottom:
                i < rows.length - 1 ? '1px solid var(--color-line)' : 'none',
              background: active ? 'rgba(31,140,136,0.04)' : '#FFFFFF',
              opacity: dimmed ? 0.45 : 1,
              transition:
                'background-color 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-navy)',
                  letterSpacing: '-0.005em',
                  marginBottom: 4,
                }}
              >
                {r.eje}
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((b) => (
                  <span
                    key={b}
                    style={{
                      width: 16,
                      height: 4,
                      borderRadius: 2,
                      background:
                        b <= Math.max(lvl.sup, lvl.ssl)
                          ? b <= lvl.sup
                            ? 'rgba(242,107,58,0.55)'
                            : 'rgba(31,140,136,0.55)'
                          : 'rgba(15,44,69,0.08)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                lineHeight: 1.5,
                color: 'var(--color-ink-soft)',
                paddingRight: 12,
              }}
            >
              {r.supervisado}
            </div>

            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5,
                lineHeight: 1.5,
                color: 'var(--color-navy)',
                fontWeight: 500,
                paddingRight: 12,
              }}
            >
              {r.ssl}
            </div>

            <div className="flex justify-end">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 9.5,
                  letterSpacing: '0.16em',
                  color: meta.color,
                  background: meta.bg,
                  border: `1px solid ${meta.color}33`,
                  borderRadius: 9999,
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {meta.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Footer · refs */}
      {refs && refs.length > 0 && (
        <div
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            padding: '14px 22px',
            background: 'rgba(15,44,69,0.025)',
            borderTop: '1px solid var(--color-line)',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            Marco de referencia
          </span>
          <Cite refs={refs as string[]} tone="paper" />
        </div>
      )}
    </div>
  );
}
