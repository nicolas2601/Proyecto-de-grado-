import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';

type ProblemTree = {
  problemaCentral: string;
  causasIndirectas: string[];
  causasDirectas: string[];
  consecuenciasDirectas: string[];
  consecuenciasIndirectas: string[];
};

type Layer = 'ci' | 'cd' | 'core' | 'kd' | 'ki';

type GNode = {
  id: string;
  label: string;
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
const HEIGHT = 620;

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

function buildGraph(tree: ProblemTree): { nodes: GNode[]; links: GLink[] } {
  const nodes: GNode[] = [];
  const links: GLink[] = [];

  const ci = tree.causasIndirectas.map((t, i) => ({
    id: `ci-${i}`,
    label: t,
    layer: 'ci' as Layer,
    layerIndex: i,
    radius: 20,
  }));
  const cd = tree.causasDirectas.map((t, i) => ({
    id: `cd-${i}`,
    label: t,
    layer: 'cd' as Layer,
    layerIndex: i,
    radius: 22,
  }));
  const core: GNode = {
    id: 'core',
    label: tree.problemaCentral,
    layer: 'core',
    layerIndex: 0,
    radius: 78,
    isCore: true,
  };
  const kd = tree.consecuenciasDirectas.map((t, i) => ({
    id: `kd-${i}`,
    label: t,
    layer: 'kd' as Layer,
    layerIndex: i,
    radius: 22,
  }));
  const ki = tree.consecuenciasIndirectas.map((t, i) => ({
    id: `ki-${i}`,
    label: t,
    layer: 'ki' as Layer,
    layerIndex: i,
    radius: 20,
  }));

  nodes.push(...ci, ...cd, core, ...kd, ...ki);

  ci.forEach((a) => cd.forEach((b) => links.push({ source: a.id, target: b.id })));
  cd.forEach((a) => links.push({ source: a.id, target: 'core' }));
  kd.forEach((b) => links.push({ source: 'core', target: b.id }));
  kd.forEach((a) => ki.forEach((b) => links.push({ source: a.id, target: b.id })));

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

    nodes.forEach((n) => {
      n.x = LAYER_X[n.layer];
      if (n.layer === 'core') {
        n.y = HEIGHT / 2;
        n.fx = LAYER_X.core;
        n.fy = HEIGHT / 2;
      } else {
        n.y = HEIGHT / 2;
      }
    });

    const sim = d3
      .forceSimulation<GNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GNode, GLink>(links)
          .id((d) => d.id)
          .distance((l) => {
            const s = l.source as GNode;
            const t = l.target as GNode;
            if (s.isCore || t.isCore) return 220;
            return 180;
          })
          .strength(0.12)
      )
      .force('charge', d3.forceManyBody<GNode>().strength(-280))
      .force(
        'x',
        d3.forceX<GNode>((d) => LAYER_X[d.layer]).strength(1.4)
      )
      .force('y', d3.forceY<GNode>(HEIGHT / 2).strength(0.06))
      .force(
        'collide',
        d3.forceCollide<GNode>().radius((d) => d.radius + 18).strength(0.95)
      )
      .stop();

    for (let i = 0; i < 320; i++) sim.tick();

    nodes.forEach((n) => {
      n.y = Math.max(n.radius + 16, Math.min(HEIGHT - n.radius - 16, n.y ?? HEIGHT / 2));
    });

    setLayout({ nodes, links });
  }, [initialNodes, initialLinks, isMobile]);

  const linkedNodeIds = useMemo(() => {
    if (!hoverId || !layout) return new Set<string>();
    const set = new Set<string>([hoverId]);
    layout.links.forEach((l) => {
      const s = typeof l.source === 'string' ? l.source : l.source.id;
      const t = typeof l.target === 'string' ? l.target : l.target.id;
      if (s === hoverId) set.add(t);
      if (t === hoverId) set.add(s);
    });
    return set;
  }, [hoverId, layout]);

  if (isMobile) {
    return (
      <div className="space-y-6">
        {(['ci', 'cd', 'core', 'kd', 'ki'] as Layer[]).map((layer) => {
          const items =
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
                <span className="font-mono uppercase tracking-[0.14em] text-[11px] text-cofounder-blue">
                  {LAYER_META[layer].title}
                </span>
                {LAYER_META[layer].sub && (
                  <span className="text-[10px] italic text-light-gray">
                    · {LAYER_META[layer].sub}
                  </span>
                )}
              </div>
              <ul className="space-y-2 border-l border-steel-gray pl-4">
                {items.map((t, i) => (
                  <li
                    key={i}
                    className={cn(
                      'text-[13px] leading-snug',
                      layer === 'core'
                        ? 'rounded-lg bg-night-sky px-3 py-2 font-medium text-canvas-white'
                        : 'text-charcoal'
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="flex h-[620px] w-full items-center justify-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-light-gray">
          Calculando constelación…
        </div>
      </div>
    );
  }

  const nodeById = new Map(layout.nodes.map((n) => [n.id, n] as const));

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="block h-auto w-full select-none"
        role="img"
        aria-label="Constelación causal: causas indirectas, causas directas, problema central, consecuencias directas, consecuencias indirectas"
      >
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#41a1cf" />
            <stop offset="100%" stopColor="#0081c0" />
          </radialGradient>
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer guides */}
        {(['ci', 'cd', 'kd', 'ki'] as Layer[]).map((l) => (
          <line
            key={`guide-${l}`}
            x1={LAYER_X[l]}
            x2={LAYER_X[l]}
            y1={24}
            y2={HEIGHT - 24}
            stroke="#dee2de"
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
            y={18}
            textAnchor="middle"
            className="fill-medium-gray font-mono"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            {LAYER_META[l].title}
          </text>
        ))}

        {/* Links */}
        <g>
          {layout.links.map((l, i) => {
            const s = typeof l.source === 'string' ? nodeById.get(l.source)! : l.source;
            const t = typeof l.target === 'string' ? nodeById.get(l.target)! : l.target;
            if (!s || !t) return null;
            const involved = hoverId
              ? linkedNodeIds.has(s.id) && linkedNodeIds.has(t.id)
              : false;
            const dimmed = hoverId && !involved;
            return (
              <motion.path
                key={`link-${i}`}
                d={buildPath(s, t)}
                fill="none"
                stroke={involved ? '#41a1cf' : 'rgba(0,129,192,0.32)'}
                strokeWidth={involved ? 2 : 1.2}
                strokeLinecap="round"
                style={{ opacity: dimmed ? 0.08 : 1 }}
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
                    fill="rgba(0,129,192,0.10)"
                    filter="url(#coreGlow)"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.radius}
                    fill="url(#coreGradient)"
                    stroke="#41a1cf"
                    strokeWidth={1.5}
                  />
                  <foreignObject
                    x={(n.x ?? 0) - n.radius + 6}
                    y={(n.y ?? 0) - n.radius + 6}
                    width={n.radius * 2 - 12}
                    height={n.radius * 2 - 12}
                  >
                    <div className="flex h-full w-full items-center justify-center text-center">
                      <span className="px-1 text-[10.5px] font-medium leading-[1.2] text-canvas-white">
                        {n.label}
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>
              );
            }

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
                  fill={active || involved ? 'rgba(0,129,192,0.08)' : '#ffffff'}
                  stroke={active ? '#41a1cf' : involved ? '#0081c0' : '#dee2de'}
                  strokeWidth={active ? 2 : 1.2}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={4}
                  fill={active ? '#0081c0' : '#646464'}
                />
              </motion.g>
            );
          })}
        </g>

        {/* Tooltip */}
        {hoverId &&
          (() => {
            const n = nodeById.get(hoverId);
            if (!n || n.isCore) return null;
            const isLeftSide = (n.x ?? 0) < WIDTH / 2;
            const tipW = 260;
            const tipH = 76;
            const tx = isLeftSide
              ? (n.x ?? 0) + n.radius + 12
              : (n.x ?? 0) - n.radius - 12 - tipW;
            const ty = Math.max(8, Math.min(HEIGHT - tipH - 8, (n.y ?? 0) - tipH / 2));
            return (
              <foreignObject x={tx} y={ty} width={tipW} height={tipH}>
                <div
                  className="rounded-2xl border border-steel-gray bg-canvas-white/90 px-3 py-2 text-[12px] leading-snug text-dark-charcoal shadow-[rgba(0,0,0,0.08)_0px_4px_12px]"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cofounder-blue">
                    {LAYER_META[n.layer].title}
                  </div>
                  <div>{n.label}</div>
                </div>
              </foreignObject>
            );
          })()}
      </svg>
    </div>
  );
}
