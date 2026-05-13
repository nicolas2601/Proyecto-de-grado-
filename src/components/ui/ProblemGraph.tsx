// ─────────────────────────────────────────────────────────────────────────
// Constelación causal · 5 capas (causas indirectas → directas → problema
// central → consecuencias directas → indirectas). Layout d3-force, hover
// resalta vecindario, fallback mobile en columnas verticales.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';
import { Cite } from '@/components/ui/Cite';

export type TreeItem = string | { label: string; refs?: string[] };

export type ProblemTree = {
  problemaCentral: string;
  causasIndirectas: TreeItem[];
  causasDirectas: TreeItem[];
  consecuenciasDirectas: TreeItem[];
  consecuenciasIndirectas: TreeItem[];
};

type Layer = 'ci' | 'cd' | 'core' | 'kd' | 'ki';

type GNode = {
  id: string;
  label: string;
  refs?: string[];
  layer: Layer;
  layerIndex: number;
  radius: number;
  isCore?: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

type GLink = {
  source: string | GNode;
  target: string | GNode;
};

const WIDTH = 1100;
const HEIGHT = 880;
// Padding lateral en el viewBox para que los labels de ci/ki no se recorten.
const PAD_X = 240;
const VB_W = WIDTH + PAD_X * 2;

const LAYER_X: Record<Layer, number> = {
  ci: WIDTH * 0.08,
  cd: WIDTH * 0.3,
  core: WIDTH * 0.52,
  kd: WIDTH * 0.74,
  ki: WIDTH * 0.96,
};

const LAYER_META: Record<Layer, { title: string; sub: string }> = {
  ci: { title: 'Causas indirectas', sub: 'condiciones estructurales' },
  cd: { title: 'Causas directas', sub: 'factores inmediatos' },
  core: { title: 'Problema central', sub: '' },
  kd: { title: 'Consecuencias directas', sub: 'efectos inmediatos' },
  ki: { title: 'Consecuencias indirectas', sub: 'impacto sistémico' },
};

function normItem(t: TreeItem): { label: string; refs?: string[] } {
  return typeof t === 'string' ? { label: t } : { label: t.label, refs: t.refs };
}

function buildGraph(tree: ProblemTree): { nodes: GNode[]; links: GLink[] } {
  const nodes: GNode[] = [];
  const links: GLink[] = [];

  const ci = tree.causasIndirectas.map((t, i) => {
    const it = normItem(t);
    return {
      id: `ci-${i}`,
      label: it.label,
      refs: it.refs,
      layer: 'ci' as Layer,
      layerIndex: i,
      radius: 24,
    };
  });
  const cd = tree.causasDirectas.map((t, i) => {
    const it = normItem(t);
    return {
      id: `cd-${i}`,
      label: it.label,
      refs: it.refs,
      layer: 'cd' as Layer,
      layerIndex: i,
      radius: 26,
    };
  });
  const core: GNode = {
    id: 'core',
    label: tree.problemaCentral,
    layer: 'core',
    layerIndex: 0,
    radius: 92,
    isCore: true,
  };
  const kd = tree.consecuenciasDirectas.map((t, i) => {
    const it = normItem(t);
    return {
      id: `kd-${i}`,
      label: it.label,
      refs: it.refs,
      layer: 'kd' as Layer,
      layerIndex: i,
      radius: 26,
    };
  });
  const ki = tree.consecuenciasIndirectas.map((t, i) => {
    const it = normItem(t);
    return {
      id: `ki-${i}`,
      label: it.label,
      refs: it.refs,
      layer: 'ki' as Layer,
      layerIndex: i,
      radius: 24,
    };
  });

  nodes.push(...ci, ...cd, core, ...kd, ...ki);

  // Conexiones 1-a-1 por posición para evitar el enredo del full-bipartite.
  // Cada causa indirecta cae sobre su causa directa correspondiente; cada
  // consecuencia directa fluye hacia su consecuencia indirecta.
  const n = Math.min(ci.length, cd.length);
  for (let i = 0; i < n; i++) links.push({ source: ci[i].id, target: cd[i].id });

  cd.forEach((a) => links.push({ source: a.id, target: 'core' }));
  kd.forEach((b) => links.push({ source: 'core', target: b.id }));

  const m = Math.min(kd.length, ki.length);
  for (let i = 0; i < m; i++) links.push({ source: kd[i].id, target: ki[i].id });

  return { nodes, links };
}

function buildPath(a: GNode, b: GNode): string {
  const mx = (a.x! + b.x!) / 2;
  return `M ${a.x},${a.y} C ${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
}

export default function ProblemGraph({ tree }: { tree: ProblemTree }) {
  const { nodes: initialNodes, links: initialLinks } = useMemo(
    () => buildGraph(tree),
    [tree]
  );
  const reduceMotion = useReducedMotion();

  const [layout, setLayout] = useState<{ nodes: GNode[]; links: GLink[] } | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const nodes: GNode[] = initialNodes.map((n) => ({ ...n }));
    const links: GLink[] = initialLinks.map((l) => ({ ...l }));

    // Layout determinístico: cada layer distribuye sus nodos uniformemente
    // sobre el eje Y. Garantiza alineación 1-a-1 entre layers adyacentes y
    // elimina cruces entre conectores.
    const layers: Record<string, GNode[]> = {
      ci: [],
      cd: [],
      core: [],
      kd: [],
      ki: [],
    };
    nodes.forEach((n) => {
      layers[n.layer].push(n);
    });

    Object.entries(layers).forEach(([layer, list]) => {
      if (layer === 'core') return;
      const count = list.length;
      const top = 90;
      const bottom = HEIGHT - 90;
      const span = bottom - top;
      list.forEach((n, i) => {
        n.x = LAYER_X[n.layer];
        n.y = count === 1 ? HEIGHT / 2 : top + (span * i) / (count - 1);
      });
    });
    // core fijo al centro
    layers.core.forEach((n) => {
      n.x = LAYER_X.core;
      n.y = HEIGHT / 2;
    });

    setLayout({ nodes, links });
  }, [initialNodes, initialLinks, isMobile]);

  // Cadena causal completa · expansión bidireccional desde el nodo hover.
  // No se limita a vecinos inmediatos: sigue todos los caminos hacia atrás
  // (causas) y hacia adelante (consecuencias) hasta agotar el grafo.
  const linkedNodeIds = useMemo(() => {
    if (!hoverId || !layout) return new Set<string>();
    const adjOut = new Map<string, string[]>();
    const adjIn = new Map<string, string[]>();
    layout.links.forEach((l) => {
      const s = typeof l.source === 'string' ? l.source : l.source.id;
      const t = typeof l.target === 'string' ? l.target : l.target.id;
      if (!adjOut.has(s)) adjOut.set(s, []);
      adjOut.get(s)!.push(t);
      if (!adjIn.has(t)) adjIn.set(t, []);
      adjIn.get(t)!.push(s);
    });
    const set = new Set<string>([hoverId]);
    // BFS hacia adelante
    const q = [hoverId];
    while (q.length) {
      const n = q.shift()!;
      (adjOut.get(n) ?? []).forEach((m) => {
        if (!set.has(m)) {
          set.add(m);
          q.push(m);
        }
      });
    }
    // BFS hacia atrás
    const q2 = [hoverId];
    while (q2.length) {
      const n = q2.shift()!;
      (adjIn.get(n) ?? []).forEach((m) => {
        if (!set.has(m)) {
          set.add(m);
          q2.push(m);
        }
      });
    }
    return set;
  }, [hoverId, layout]);

  if (isMobile) {
    return (
      <div className="space-y-6">
        {(['ci', 'cd', 'core', 'kd', 'ki'] as Layer[]).map((layer) => {
          const items: TreeItem[] =
            layer === 'core'
              ? [tree.problemaCentral]
              : layer === 'ci'
              ? tree.causasIndirectas
              : layer === 'cd'
              ? tree.causasDirectas
              : layer === 'kd'
              ? tree.consecuenciasDirectas
              : tree.consecuenciasIndirectas;

          return (
            <div key={layer} className="relative">
              <div className="mb-2 flex items-baseline gap-2">
                <span
                  className="font-mono uppercase"
                  style={{
                    color: 'var(--color-teal)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                  }}
                >
                  {LAYER_META[layer].title}
                </span>
                {LAYER_META[layer].sub && (
                  <span
                    className="italic"
                    style={{ fontSize: 10, color: 'var(--color-mist)' }}
                  >
                    · {LAYER_META[layer].sub}
                  </span>
                )}
              </div>
              <ul
                className="space-y-2 pl-4"
                style={{ borderLeft: '1px solid var(--color-line)' }}
              >
                {items.map((t, i) => {
                  const it = normItem(t);
                  return (
                    <li
                      key={i}
                      className={cn('leading-snug')}
                      style={
                        layer === 'core'
                          ? {
                              background: 'var(--color-navy)',
                              color: '#fff',
                              padding: '8px 12px',
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 500,
                            }
                          : {
                              color: 'var(--color-charcoal)',
                              fontSize: 13,
                            }
                      }
                    >
                      {it.label}
                      {it.refs && it.refs.length > 0 && layer !== 'core' && (
                        <Cite refs={it.refs} tone="paper" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  if (!layout) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height: 620 }}
      >
        <div
          className="font-mono uppercase"
          style={{
            color: 'var(--color-mist)',
            fontSize: 11,
            letterSpacing: '0.18em',
          }}
        >
          Calculando constelación…
        </div>
      </div>
    );
  }

  const nodeById = new Map(layout.nodes.map((n) => [n.id, n] as const));

  return (
    <div ref={containerRef} className="relative w-full">
      <style>{`
        @keyframes pgFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
      `}</style>
      <svg
        viewBox={`${-PAD_X} 0 ${VB_W} ${HEIGHT}`}
        className="block h-auto w-full select-none"
        role="img"
        aria-label="Constelación causal: causas indirectas, causas directas, problema central, consecuencias directas, consecuencias indirectas"
      >
        <defs>
          <radialGradient id="problemCoreGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#2BAFAA" />
            <stop offset="100%" stopColor="#1F8C88" />
          </radialGradient>
          <filter id="problemCoreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Marker para flecha direccional al final de cada link · indica causalidad */}
          <marker
            id="arrowDim"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(31,140,136,0.4)" />
          </marker>
          <marker
            id="arrowActive"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F8C88" />
          </marker>
        </defs>

        {/* Layer guides */}
        {(['ci', 'cd', 'kd', 'ki'] as Layer[]).map((l) => (
          <line
            key={`guide-${l}`}
            x1={LAYER_X[l]}
            x2={LAYER_X[l]}
            y1={24}
            y2={HEIGHT - 24}
            stroke="#D3DAE0"
            strokeWidth={1}
            strokeDasharray="2 6"
            opacity={0.5}
          />
        ))}

        {/* Layer captions */}
        {(['ci', 'cd', 'core', 'kd', 'ki'] as Layer[]).map((l) => (
          <text
            key={`cap-${l}`}
            x={LAYER_X[l]}
            y={24}
            textAnchor="middle"
            style={{
              fill: '#4D5B6D',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {LAYER_META[l].title}
          </text>
        ))}

        {/* Links · con flecha direccional + flow marching ants en hover */}
        <g>
          {layout.links.map((l, i) => {
            const s = typeof l.source === 'string' ? nodeById.get(l.source)! : l.source;
            const t = typeof l.target === 'string' ? nodeById.get(l.target)! : l.target;
            if (!s || !t) return null;
            const involved = hoverId
              ? linkedNodeIds.has(s.id) && linkedNodeIds.has(t.id)
              : false;
            const dimmed = hoverId && !involved;
            // Acortar el path antes del nodo destino para que la flecha no se incruste en el círculo
            const dx = (t.x ?? 0) - (s.x ?? 0);
            const dy = (t.y ?? 0) - (s.y ?? 0);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const trim = t.radius + 6;
            const ratio = dist > 0 ? (dist - trim) / dist : 1;
            const endX = (s.x ?? 0) + dx * ratio;
            const endY = (s.y ?? 0) + dy * ratio;
            const trimmed: GNode = { ...t, x: endX, y: endY };
            return (
              <motion.path
                key={`link-${i}`}
                d={buildPath(s, trimmed)}
                fill="none"
                stroke={involved ? '#1F8C88' : 'rgba(31,140,136,0.32)'}
                strokeWidth={involved ? 2.2 : 1.2}
                strokeLinecap="round"
                strokeDasharray={involved ? '6 6' : undefined}
                markerEnd={involved ? 'url(#arrowActive)' : 'url(#arrowDim)'}
                style={{
                  opacity: dimmed ? 0.08 : 1,
                  animation: involved && !reduceMotion ? 'pgFlow 1.4s linear infinite' : undefined,
                }}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  reduceMotion
                    ? undefined
                    : { pathLength: 1, opacity: dimmed ? 0.08 : 1 }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.4 + (i % 8) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {layout.nodes.map((n, i) => {
            const active = hoverId === n.id;
            const involved = hoverId ? linkedNodeIds.has(n.id) : false;
            const dimmed = hoverId && !involved;

            if (n.isCore) {
              return (
                <motion.g
                  key={n.id}
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px`, opacity: dimmed ? 0.25 : 1 }}
                  onMouseEnter={() => setHoverId(n.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.radius + 14}
                    fill="rgba(31,140,136,0.10)"
                    filter="url(#problemCoreGlow)"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.radius}
                    fill="url(#problemCoreGradient)"
                    stroke="#2BAFAA"
                    strokeWidth={1.5}
                  />
                  <foreignObject
                    x={(n.x ?? 0) - n.radius + 6}
                    y={(n.y ?? 0) - n.radius + 6}
                    width={n.radius * 2 - 12}
                    height={n.radius * 2 - 12}
                  >
                    <div className="flex h-full w-full items-center justify-center text-center">
                      <span
                        className="px-2 leading-[1.25]"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#ffffff',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {n.label}
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>
              );
            }

            // ── label positioning · ci/cd a la izquierda del círculo,
            //    kd/ki a la derecha. Ancho fijo, line-clamp 3.
            const onLeft = n.layer === 'ci' || n.layer === 'cd';
            const labelW = 215;
            const labelX = onLeft
              ? (n.x ?? 0) - n.radius - 12 - labelW
              : (n.x ?? 0) + n.radius + 12;
            const labelY = (n.y ?? 0) - 42;

            return (
              <motion.g
                key={n.id}
                initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.05 + i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformOrigin: `${n.x}px ${n.y}px`,
                  opacity: dimmed ? 0.18 : 1,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.radius}
                  fill={active || involved ? 'rgba(31,140,136,0.08)' : '#ffffff'}
                  stroke={active ? '#1F8C88' : involved ? '#0F2C45' : '#D3DAE0'}
                  strokeWidth={active ? 2 : 1.2}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={4}
                  fill={active ? '#1F8C88' : '#4D5B6D'}
                />
                <foreignObject
                  x={labelX}
                  y={labelY}
                  width={labelW}
                  height={92}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      lineHeight: 1.32,
                      color: active ? '#0F2C45' : '#2D3B4F',
                      fontWeight: active ? 600 : 500,
                      textAlign: onLeft ? 'right' : 'left',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordBreak: 'normal',
                      hyphens: 'auto',
                    }}
                  >
                    {n.label}
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </g>

      </svg>

      {/* Tooltip · fuera del SVG para que el popover del Cite no se recorte */}
      {hoverId &&
        (() => {
          const n = nodeById.get(hoverId);
          if (!n || n.isCore) return null;
          const isLeftSide = (n.x ?? 0) < WIDTH / 2;
          const xPct = (((n.x ?? 0) + PAD_X) / VB_W) * 100;
          const yPct = ((n.y ?? 0) / HEIGHT) * 100;
          const isCause = n.layer === 'ci' || n.layer === 'cd';
          const arrow = isCause ? '→ apunta a problema central' : '← consecuencia del problema';
          const chainSize = linkedNodeIds.size;
          return (
            <div
              onMouseEnter={() => setHoverId(n.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                position: 'absolute',
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: isLeftSide
                  ? 'translate(28px, -50%)'
                  : 'translate(calc(-100% - 28px), -50%)',
                width: 280,
                pointerEvents: 'auto',
                zIndex: 5,
                border: '1px solid var(--color-teal)',
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '12px 16px',
                borderRadius: 14,
                fontSize: 12,
                lineHeight: 1.4,
                color: 'var(--color-charcoal)',
                boxShadow:
                  '0 18px 40px -16px rgba(31,140,136,0.32), 0 2px 6px -2px rgba(15,44,69,0.12)',
              }}
            >
              <div
                className="font-mono uppercase flex items-baseline justify-between gap-2 flex-wrap"
                style={{
                  marginBottom: 6,
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color: 'var(--color-teal)',
                }}
              >
                <span>{LAYER_META[n.layer].title}</span>
                <span style={{ color: 'var(--color-mist)' }}>
                  · cadena · {chainSize} nodos
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  color: 'var(--color-navy)',
                  marginBottom: 8,
                }}
              >
                {n.label}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.04em',
                  color: 'var(--color-graphite)',
                  marginBottom: n.refs?.length ? 10 : 0,
                }}
              >
                {arrow}
              </div>
              {n.refs && n.refs.length > 0 && (
                <div
                  style={{
                    paddingTop: 8,
                    borderTop: '1px dashed rgba(15,44,69,0.14)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      color: 'var(--color-graphite)',
                    }}
                  >
                    Fuente
                  </span>
                  <Cite refs={n.refs} tone="paper" />
                </div>
              )}
            </div>
          );
        })()}
    </div>
  );
}
