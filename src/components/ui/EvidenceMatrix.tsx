// ─────────────────────────────────────────────────────────────────────────
// Matriz de evidencia · ejes (filas) × referencias únicas (columnas).
// Marca con dot dónde una referencia sostiene un eje. Hover sobre celda
// muestra la cita completa con Cite. Hover sobre fila resalta sus refs;
// hover sobre columna resalta los ejes que apoya.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CITATIONS } from '@/data/citations';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

export type EvidenceRow = {
  eje: string;
  refs: readonly string[] | string[];
};

export default function EvidenceMatrix({
  rows,
  tone = 'navy',
}: {
  rows: readonly EvidenceRow[];
  tone?: 'navy' | 'paper';
}) {
  const reduced = useReducedMotion();
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  // Columnas: refs únicos, ordenados por aparición.
  const cols = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    rows.forEach((r) => {
      r.refs.forEach((ref) => {
        if (!seen.has(ref)) {
          seen.add(ref);
          list.push(ref);
        }
      });
    });
    return list;
  }, [rows]);

  const presence = useMemo(() => {
    return rows.map((r) => {
      const set = new Set(r.refs as string[]);
      return cols.map((c) => set.has(c));
    });
  }, [rows, cols]);

  const onNavy = tone === 'navy';
  const palette = onNavy
    ? {
        bg: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.12)',
        text: 'rgba(255,255,255,0.86)',
        textMuted: 'rgba(255,255,255,0.55)',
        textFaint: 'rgba(255,255,255,0.32)',
        accent: '#7CD1CE',
        dot: '#7CD1CE',
        dotOff: 'rgba(255,255,255,0.08)',
        cellHover: 'rgba(124,209,206,0.08)',
        rowHover: 'rgba(255,255,255,0.04)',
      }
    : {
        bg: 'var(--color-paper-warm)',
        border: 'var(--color-line)',
        text: 'var(--color-charcoal)',
        textMuted: 'var(--color-graphite)',
        textFaint: 'var(--color-mist)',
        accent: 'var(--color-teal)',
        dot: 'var(--color-teal)',
        dotOff: 'rgba(15,44,69,0.08)',
        cellHover: 'rgba(31,140,136,0.08)',
        rowHover: 'rgba(15,44,69,0.03)',
      };

  const colWidth = 78;
  const rowHeight = 64;
  const gridTemplateColumns = `minmax(220px, 280px) repeat(${cols.length}, ${colWidth}px) auto`;

  return (
    <div
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        padding: 18,
        overflowX: 'auto',
      }}
    >
      {/* Caption */}
      <div
        className="mb-4 flex flex-wrap items-baseline justify-between gap-3"
        style={{ minWidth: 600 }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13.5,
            color: palette.text,
            fontWeight: 600,
          }}
        >
          Matriz de evidencia · ejes × referencias
        </div>
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: palette.textMuted,
          }}
        >
          {rows.length} ejes · {cols.length} refs
        </div>
      </div>

      <div style={{ minWidth: 600 }}>
        {/* Header · refs */}
        <div
          className="grid items-end"
          style={{
            gridTemplateColumns,
            gap: 4,
            paddingBottom: 8,
            borderBottom: `1px solid ${palette.border}`,
          }}
        >
          <div />
          {cols.map((c, ci) => {
            const meta = CITATIONS[c];
            const colActive = hoverCol === ci;
            return (
              <button
                key={c}
                type="button"
                onMouseEnter={() => setHoverCol(ci)}
                onMouseLeave={() => setHoverCol(null)}
                onFocus={() => setHoverCol(ci)}
                onBlur={() => setHoverCol(null)}
                title={meta?.full ?? c}
                style={{
                  appearance: 'none',
                  background: 'transparent',
                  border: 0,
                  padding: 0,
                  cursor: 'pointer',
                  height: 110,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    transform: 'rotate(-48deg)',
                    transformOrigin: 'bottom center',
                    whiteSpace: 'nowrap',
                    fontSize: 13,
                    letterSpacing: '0.02em',
                    color: colActive ? palette.accent : palette.textMuted,
                    fontWeight: colActive ? 600 : 500,
                    transition: 'color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {meta?.short ?? c}
                </span>
              </button>
            );
          })}
          <div />
        </div>

        {/* Rows */}
        {rows.map((row, ri) => {
          const rowActive = hoverRow === ri;
          return (
            <motion.div
              key={row.eje}
              className="grid items-center"
              style={{
                gridTemplateColumns,
                gap: 4,
                background: rowActive ? palette.rowHover : 'transparent',
                borderRadius: 8,
                transition: 'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.55, ease: ENTER, delay: ri * 0.07 }}
              onMouseEnter={() => setHoverRow(ri)}
              onMouseLeave={() => setHoverRow(null)}
            >
              {/* Row label · eje */}
              <div
                style={{
                  padding: '14px 12px 14px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  minHeight: rowHeight,
                  justifyContent: 'center',
                }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    color: rowActive ? palette.accent : palette.textFaint,
                  }}
                >
                  Eje · {String(ri + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15.5,
                    lineHeight: 1.3,
                    fontWeight: 600,
                    color: palette.text,
                  }}
                >
                  {row.eje}
                </div>
              </div>

              {/* Cells */}
              {cols.map((c, ci) => {
                const has = presence[ri][ci];
                const colActive = hoverCol === ci;
                const dim = (hoverRow !== null && !rowActive) || (hoverCol !== null && !colActive);
                return (
                  <div
                    key={c}
                    onMouseEnter={() => setHoverCol(ci)}
                    onMouseLeave={() => setHoverCol(null)}
                    style={{
                      height: rowHeight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        has && (rowActive || colActive) ? palette.cellHover : 'transparent',
                      borderRadius: 6,
                      transition: 'background-color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: dim ? 0.45 : 1,
                    }}
                  >
                    {has ? (
                      <motion.span
                        aria-hidden
                        initial={reduced ? false : { scale: 0 }}
                        whileInView={reduced ? undefined : { scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          ease: ENTER,
                          delay: 0.2 + ri * 0.05 + ci * 0.02,
                        }}
                        style={{
                          display: 'block',
                          width: rowActive || colActive ? 12 : 9,
                          height: rowActive || colActive ? 12 : 9,
                          borderRadius: '50%',
                          background: palette.dot,
                          boxShadow:
                            rowActive || colActive
                              ? `0 0 0 4px ${onNavy ? 'rgba(124,209,206,0.18)' : 'rgba(31,140,136,0.18)'}`
                              : 'none',
                          transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        style={{
                          display: 'block',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: palette.dotOff,
                        }}
                      />
                    )}
                  </div>
                );
              })}

              {/* Row trailing · Cite */}
              <div style={{ paddingLeft: 8 }}>
                <Cite refs={row.refs as string[]} tone={tone === 'navy' ? 'navy' : 'paper'} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer · leyenda */}
      <div
        className="mt-4 flex flex-wrap items-center gap-4"
        style={{
          paddingTop: 12,
          borderTop: `1px solid ${palette.border}`,
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          color: palette.textMuted,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span
            aria-hidden
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: palette.dot,
              display: 'inline-block',
            }}
          />
          referencia sostiene el eje
        </span>
        <span style={{ color: palette.textFaint }}>
          · hover sobre eje o referencia para resaltar el cruce
        </span>
      </div>
    </div>
  );
}
