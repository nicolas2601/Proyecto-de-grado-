// ─────────────────────────────────────────────────────────────────────────
// Timeline normativo · eje horizontal con normas posicionadas por año.
// Click sobre un punto expande detalle + refs. Hover preview.
// ─────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

export type Norma = {
  sigla: string;
  titulo: string;
  detalle: string;
  refs?: readonly string[];
};

export type TimelineItem = Norma & {
  year: number;
  scope: 'nacional' | 'internacional';
};

function parseYear(sigla: string, fallback: number): number {
  const m = sigla.match(/(19|20)\d{2}/);
  return m ? Number(m[0]) : fallback;
}

export default function RegulatoryTimeline({
  nacional,
  internacional,
}: {
  nacional: readonly Norma[];
  internacional: readonly Norma[];
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const items: TimelineItem[] = useMemo(() => {
    const list: TimelineItem[] = [
      ...nacional.map((n, i) => ({
        ...n,
        year: parseYear(n.sigla, 2010 + i),
        scope: 'nacional' as const,
      })),
      ...internacional.map((n, i) => ({
        ...n,
        year: parseYear(n.sigla, 2014 + i),
        scope: 'internacional' as const,
      })),
    ];
    list.sort((a, b) => a.year - b.year);
    return list;
  }, [nacional, internacional]);

  const years = items.map((i) => i.year);
  const minY = Math.min(...years) - 1;
  const maxY = Math.max(...years) + 1;
  const span = maxY - minY;

  function xPct(year: number) {
    return ((year - minY) / span) * 100;
  }

  // Asigna sub-lane (0 o 1) cuando dos items del mismo scope estén a menos
  // del threshold% horizontal, para que las cajas no se solapen.
  function assignSubLanes(scope: 'nacional' | 'internacional'): Map<string, number> {
    const m = new Map<string, number>();
    const list = items.filter((i) => i.scope === scope);
    const threshold = 16; // % del eje
    let lastLane = 0;
    let lastX = -Infinity;
    list.forEach((it) => {
      const x = xPct(it.year);
      if (x - lastX < threshold) {
        lastLane = 1 - lastLane;
      } else {
        lastLane = 0;
      }
      m.set(it.sigla, lastLane);
      lastX = x;
    });
    return m;
  }
  const subLaneNacional = assignSubLanes('nacional');
  const subLaneInternacional = assignSubLanes('internacional');

  // Distribuye items en 2 carriles (nacional arriba, internacional abajo)
  // para evitar superposición. Ya separados por scope.

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-line)',
        borderRadius: 24,
        padding: 'clamp(20px, 3vw, 36px)',
        position: 'relative',
      }}
    >
      <div className="mb-6 flex items-baseline justify-between flex-wrap gap-3">
        <h3
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 17,
            fontWeight: 600,
            color: 'var(--color-navy)',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Línea de tiempo normativa · {items.length} marcos
        </h3>
        <div className="flex items-center gap-4">
          <span
            className="font-mono uppercase flex items-center gap-2"
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--color-teal)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: 'var(--color-teal)',
              }}
            />
            Nacional
          </span>
          <span
            className="font-mono uppercase flex items-center gap-2"
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--color-orange)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: 'var(--color-orange)',
              }}
            />
            Internacional
          </span>
        </div>
      </div>

      {/* Timeline · 2 carriles + eje central */}
      <div className="relative" style={{ height: 280, marginBottom: 12 }}>
        {/* Eje central */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 1,
            background: 'var(--color-line)',
          }}
        />

        {/* Marcas de año */}
        {Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i)
          .filter((y) => y % 2 === 0)
          .map((y) => (
            <div
              key={y}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${xPct(y)}%`,
                transform: 'translate(-50%, 14px)',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 1,
                  height: 8,
                  background: 'var(--color-line)',
                  margin: '0 auto -4px',
                }}
              />
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.04em',
                  color: 'var(--color-mist)',
                  marginTop: 4,
                  textAlign: 'center',
                }}
              >
                {y}
              </div>
            </div>
          ))}

        {/* Items · nacionales arriba */}
        {items
          .filter((it) => it.scope === 'nacional')
          .map((it, i) => {
            const x = xPct(it.year);
            const isActive = active === it.sigla;
            const subLane = subLaneNacional.get(it.sigla) ?? 0;
            return (
              <ItemPoint
                key={it.sigla}
                item={it}
                xPct={x}
                position="top"
                subLane={subLane}
                color="var(--color-teal)"
                isActive={isActive}
                onToggle={() =>
                  setActive((prev) => (prev === it.sigla ? null : it.sigla))
                }
                reduced={reduced ?? false}
                delay={0.25 + i * 0.1}
              />
            );
          })}

        {/* Items · internacionales abajo */}
        {items
          .filter((it) => it.scope === 'internacional')
          .map((it, i) => {
            const x = xPct(it.year);
            const isActive = active === it.sigla;
            const subLane = subLaneInternacional.get(it.sigla) ?? 0;
            return (
              <ItemPoint
                key={it.sigla}
                item={it}
                xPct={x}
                position="bottom"
                subLane={subLane}
                color="var(--color-orange)"
                isActive={isActive}
                onToggle={() =>
                  setActive((prev) => (prev === it.sigla ? null : it.sigla))
                }
                reduced={reduced ?? false}
                delay={0.4 + i * 0.1}
              />
            );
          })}
      </div>

      {/* Panel detalle · solo si hay activo */}
      <AnimatePresence>
        {active && (() => {
          const it = items.find((i) => i.sigla === active);
          if (!it) return null;
          return (
            <motion.div
              key={it.sigla}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: ENTER }}
              style={{ overflow: 'hidden', marginTop: 16 }}
            >
              <div
                style={{
                  border: `1px solid ${
                    it.scope === 'nacional'
                      ? 'rgba(31,140,136,0.3)'
                      : 'rgba(242,107,58,0.3)'
                  }`,
                  background:
                    it.scope === 'nacional'
                      ? 'rgba(31,140,136,0.04)'
                      : 'rgba(242,107,58,0.04)',
                  borderRadius: 14,
                  padding: '18px 22px',
                }}
              >
                <div className="flex items-baseline justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <span
                      className="font-mono uppercase"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        color:
                          it.scope === 'nacional'
                            ? 'var(--color-teal)'
                            : 'var(--color-orange)',
                      }}
                    >
                      {it.scope} · {it.year}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'var(--color-navy)',
                        letterSpacing: '-0.01em',
                        margin: '6px 0 0',
                      }}
                    >
                      {it.sigla} · {it.titulo}
                    </h4>
                  </div>
                  {it.refs && it.refs.length > 0 && (
                    <Cite refs={it.refs as string[]} tone="paper" />
                  )}
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'var(--color-ink-soft)',
                    margin: 0,
                  }}
                >
                  {it.detalle}
                </p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {!active && (
        <div
          className="font-mono uppercase mt-2"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--color-mist)',
            textAlign: 'center',
          }}
        >
          click sobre un marcador para ver el detalle
        </div>
      )}
    </div>
  );
}

function ItemPoint({
  item,
  xPct,
  position,
  subLane,
  color,
  isActive,
  onToggle,
  reduced,
  delay,
}: {
  item: TimelineItem;
  xPct: number;
  position: 'top' | 'bottom';
  subLane: number;
  color: string;
  isActive: boolean;
  onToggle: () => void;
  reduced: boolean;
  delay: number;
}) {
  const isTop = position === 'top';
  // Si está en sub-lane 1, alarga el conector vertical para separar la caja.
  const connectorH = subLane === 1 ? 56 : 20;
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        appearance: 'none',
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        zIndex: 2,
      }}
      aria-pressed={isActive}
      aria-label={`${item.sigla} · ${item.titulo}`}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isTop ? 'column' : 'column-reverse',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {/* Caja con texto */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: isTop ? -10 : 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-6%' }}
          transition={{ duration: 0.55, ease: ENTER, delay }}
          style={{
            background: isActive ? color : '#FFFFFF',
            color: isActive ? '#FFFFFF' : color,
            border: `1px solid ${color}`,
            borderRadius: 9999,
            padding: '4px 10px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transition:
              'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {item.sigla}
        </motion.div>
        {/* Conector vertical · más largo si está en sub-lane 1 */}
        <span
          aria-hidden
          style={{
            width: 1,
            height: connectorH,
            background: color,
            opacity: isActive ? 1 : 0.6,
          }}
        />
        {/* Punto sobre la línea */}
        <span
          aria-hidden
          style={{
            display: 'block',
            width: isActive ? 14 : 11,
            height: isActive ? 14 : 11,
            borderRadius: '50%',
            background: color,
            boxShadow: isActive
              ? `0 0 0 5px ${color}33`
              : 'none',
            transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </button>
  );
}
