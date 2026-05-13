// ─────────────────────────────────────────────────────────────────────────
// Coherencia problema → respuesta · grilla bipartita con líneas SVG
// que se dibujan al scroll. Hover sobre un par resalta su conexión y
// atenúa el resto. Mobile colapsa a stack vertical con flechas.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ENTER } from '@/lib/motion';

export type CoherencePair = {
  problema: string;
  respuesta: string;
};

export default function CoherenceBridge({
  pairs,
  tone = 'navy',
}: {
  pairs: readonly CoherencePair[];
  tone?: 'navy' | 'paper';
}) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<{ d: string; idx: number }[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  const onNavy = tone === 'navy';
  const palette = onNavy
    ? {
        cellBg: 'rgba(255,255,255,0.04)',
        cellBgActive: 'rgba(124,209,206,0.12)',
        cellBorder: 'rgba(255,255,255,0.10)',
        cellBorderActive: '#7CD1CE',
        problemText: 'rgba(255,255,255,0.78)',
        answerText: '#FFFFFF',
        line: 'rgba(255,255,255,0.18)',
        lineActive: '#7CD1CE',
        lineDim: 'rgba(255,255,255,0.06)',
        label: 'rgba(255,255,255,0.5)',
        labelActive: '#7CD1CE',
      }
    : {
        cellBg: '#ffffff',
        cellBgActive: 'rgba(31,140,136,0.06)',
        cellBorder: 'var(--color-line)',
        cellBorderActive: 'var(--color-teal)',
        problemText: 'var(--color-ink-soft)',
        answerText: 'var(--color-navy)',
        line: 'rgba(15,44,69,0.18)',
        lineActive: 'var(--color-teal)',
        lineDim: 'rgba(15,44,69,0.06)',
        label: 'var(--color-graphite)',
        labelActive: 'var(--color-teal)',
      };

  // Recalcula los paths cuando cambia el layout (resize/scroll, ya que el
  // wrapper se moverá al hacer scroll).
  useEffect(() => {
    const recompute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wrapRect = wrap.getBoundingClientRect();
      const newPaths: { d: string; idx: number }[] = [];
      pairs.forEach((_, i) => {
        const a = problemRefs.current[i];
        const b = answerRefs.current[i];
        if (!a || !b) return;
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        const x1 = ar.right - wrapRect.left;
        const y1 = ar.top + ar.height / 2 - wrapRect.top;
        const x2 = br.left - wrapRect.left;
        const y2 = br.top + br.height / 2 - wrapRect.top;
        const cx = (x1 + x2) / 2;
        const d = `M ${x1},${y1} C ${cx},${y1} ${cx},${y2} ${x2},${y2}`;
        newPaths.push({ d, idx: i });
      });
      setPaths(newPaths);
    };
    recompute();
    window.addEventListener('resize', recompute);
    const ro = new ResizeObserver(recompute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener('resize', recompute);
      ro.disconnect();
    };
  }, [pairs]);

  return (
    <div ref={wrapRef} className="relative">
      {/* SVG overlay con líneas · oculto en mobile */}
      <svg
        aria-hidden
        className="hidden md:block pointer-events-none absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        {paths.map(({ d, idx }) => {
          const active = hover === idx;
          const dimmed = hover !== null && hover !== idx;
          return (
            <motion.path
              key={idx}
              d={d}
              stroke={
                active ? palette.lineActive : dimmed ? palette.lineDim : palette.line
              }
              strokeWidth={active ? 2 : 1.2}
              fill="none"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 1.1,
                ease: ENTER,
                delay: 0.4 + idx * 0.12,
              }}
              style={{
                transition: 'stroke 220ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          );
        })}
      </svg>

      {/* Header de columnas · solo md+ */}
      <div
        className="hidden md:grid mb-4"
        style={{ gridTemplateColumns: '1fr 96px 1fr' }}
      >
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            color: palette.label,
          }}
        >
          Problema observado
        </div>
        <div />
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            color: palette.label,
          }}
        >
          Respuesta del proyecto
        </div>
      </div>

      {/* Filas */}
      <div className="relative" style={{ zIndex: 1 }}>
        {pairs.map((p, i) => {
          const active = hover === i;
          const dimmed = hover !== null && hover !== i;
          return (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: ENTER, delay: 0.18 + i * 0.1 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="grid items-center gap-3 md:gap-0 mb-3 md:mb-4"
              style={{
                gridTemplateColumns: '1fr',
              }}
            >
              <div
                className="grid items-center"
                style={{
                  gridTemplateColumns: '1fr',
                }}
              >
                {/* Desktop · 3 cols */}
                <div
                  className="hidden md:grid items-stretch"
                  style={{
                    gridTemplateColumns: '1fr 96px 1fr',
                  }}
                >
                  <div
                    ref={(el) => {
                      problemRefs.current[i] = el;
                    }}
                    style={{
                      background: active ? palette.cellBgActive : palette.cellBg,
                      border: `1px solid ${
                        active ? palette.cellBorderActive : palette.cellBorder
                      }`,
                      borderRadius: 14,
                      padding: '18px 22px',
                      transition:
                        'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: dimmed ? 0.4 : 1,
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: active ? palette.labelActive : palette.label,
                        marginBottom: 6,
                      }}
                    >
                      P · {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14.5,
                        lineHeight: 1.5,
                        color: palette.problemText,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {p.problema}
                    </div>
                  </div>

                  {/* Bridge column · cuenta */}
                  <div
                    className="flex items-center justify-center"
                    style={{ position: 'relative' }}
                  >
                    <span
                      className="font-mono"
                      aria-hidden
                      style={{
                        fontSize: 9,
                        color: active ? palette.labelActive : palette.label,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        background: onNavy ? '#0F2C45' : 'var(--color-paper)',
                        padding: '2px 8px',
                        borderRadius: 9999,
                        border: `1px solid ${
                          active ? palette.cellBorderActive : palette.cellBorder
                        }`,
                        zIndex: 2,
                        opacity: dimmed ? 0.4 : 1,
                        transition:
                          'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      sostiene
                    </span>
                  </div>

                  <div
                    ref={(el) => {
                      answerRefs.current[i] = el;
                    }}
                    style={{
                      background: active ? palette.cellBgActive : palette.cellBg,
                      border: `1px solid ${
                        active ? palette.cellBorderActive : palette.cellBorder
                      }`,
                      borderRadius: 14,
                      padding: '18px 22px',
                      transition:
                        'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: dimmed ? 0.4 : 1,
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: active ? palette.labelActive : palette.label,
                        marginBottom: 6,
                      }}
                    >
                      R · {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 15,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: palette.answerText,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {p.respuesta}
                    </div>
                  </div>
                </div>

                {/* Mobile · stack */}
                <div className="md:hidden">
                  <div
                    style={{
                      background: palette.cellBg,
                      border: `1px solid ${palette.cellBorder}`,
                      borderRadius: 12,
                      padding: '14px 16px',
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 9,
                        color: palette.label,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      P · {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: palette.problemText,
                      }}
                    >
                      {p.problema}
                    </div>
                  </div>
                  <div
                    aria-hidden
                    style={{
                      textAlign: 'center',
                      padding: '6px 0',
                      color: palette.labelActive,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                    }}
                  >
                    ↓
                  </div>
                  <div
                    style={{
                      background: palette.cellBgActive,
                      border: `1px solid ${palette.cellBorderActive}`,
                      borderRadius: 12,
                      padding: '14px 16px',
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 9,
                        color: palette.labelActive,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      R · {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: palette.answerText,
                      }}
                    >
                      {p.respuesta}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
