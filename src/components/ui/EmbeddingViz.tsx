// ─────────────────────────────────────────────────────────────────────────
// EmbeddingViz · SVG interactivo que explica el aprendizaje
// autosupervisado · puntos sin etiqueta migran a 3 clusters de color.
//
// Mejoras v2:
//  · Trigger por scroll (useInView) en vez de setTimeout
//  · Cada punto entra con scale 0 → 1 + posición inicial dispersa
//  · Líneas conectoras dentro de cada cluster al finalizar
//  · Halo radial en el cluster activo al hover
//  · Tono neutral en labels
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type Point = {
  id: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
  cluster: 0 | 1 | 2;
};

const W = 720;
const H = 380;

// 3 clusters · paleta Ada (hex directo · CSS vars no resuelven siempre en SVG)
const CLUSTER_CENTERS: { x: number; y: number; color: string; label: string }[] = [
  { x: 170, y: 200, color: '#abcbf9', label: 'Lesiones benignas' },
  { x: 360, y: 140, color: '#00543d', label: 'Lesiones malignas' },
  { x: 550, y: 220, color: '#d491cd', label: 'Precursoras' },
];

function seededRand(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPoints(): Point[] {
  const rand = seededRand(42);
  const pts: Point[] = [];
  let id = 0;
  CLUSTER_CENTERS.forEach((c, ci) => {
    const n = 4;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 + rand() * 0.4;
      const r = 30 + rand() * 24;
      pts.push({
        id: id++,
        start: {
          x: 70 + rand() * (W - 140),
          y: 50 + rand() * (H - 100),
        },
        end: {
          x: c.x + Math.cos(angle) * r,
          y: c.y + Math.sin(angle) * r,
        },
        cluster: ci as 0 | 1 | 2,
      });
    }
  });
  return pts;
}

export default function EmbeddingViz() {
  const points = useMemo(buildPoints, []);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { once: false, margin: '-15%' });

  const [phase, setPhase] = useState<0 | 1>(reduced ? 1 : 0);
  const [hoverCluster, setHoverCluster] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);

  // Trigger automático al entrar al viewport · solo una vez por replay
  useEffect(() => {
    if (reduced) {
      setPhase(1);
      return;
    }
    if (!inView) return;
    setPhase(0);
    const t = setTimeout(() => setPhase(1), 450);
    return () => clearTimeout(t);
  }, [inView, replayKey, reduced]);

  function replay() {
    if (reduced) return;
    setReplayKey((k) => k + 1);
  }

  // Líneas conectoras dentro de cada cluster
  const connectors = useMemo(() => {
    const lines: { id: string; x1: number; y1: number; x2: number; y2: number; cluster: number }[] = [];
    [0, 1, 2].forEach((ci) => {
      const cluster = points.filter((p) => p.cluster === ci);
      for (let i = 0; i < cluster.length; i++) {
        for (let j = i + 1; j < cluster.length; j++) {
          lines.push({
            id: `${ci}-${i}-${j}`,
            x1: cluster[i].end.x,
            y1: cluster[i].end.y,
            x2: cluster[j].end.x,
            y2: cluster[j].end.y,
            cluster: ci,
          });
        }
      }
    });
    return lines;
  }, [points]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{
        background: 'var(--ada-cloud)',
        border: '1px solid var(--ada-mist)',
        borderRadius: 8,
        padding: 'clamp(20px, 2.4vw, 28px)',
      }}
    >
      {/* Caption superior */}
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
        <div>
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ada-graphite)',
              opacity: 0.55,
              fontWeight: 500,
            }}
          >
            Demostración interactiva
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(17px, 1.5vw, 20px)',
              fontWeight: 500,
              color: 'var(--ada-graphite)',
              letterSpacing: '-0.01em',
              margin: '6px 0 0',
            }}
          >
            Agrupamiento sin etiquetas previas
          </h4>
        </div>
        <button
          type="button"
          onClick={replay}
          style={{
            appearance: 'none',
            background: 'transparent',
            color: 'var(--ada-graphite)',
            border: '1px solid var(--ada-mist)',
            borderRadius: 9999,
            padding: '7px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--ada-vapor)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#0a0b0c';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ada-mist)';
          }}
          aria-label="Reproducir animación de embedding"
        >
          ↻ Reproducir
        </button>
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto select-none"
        role="img"
        aria-label="Visualización: 12 puntos sin etiqueta migran a 3 clusters representando el aprendizaje autosupervisado"
      >
        <defs>
          <pattern id="embGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d8d8d8" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <radialGradient id="embHalo0">
            <stop offset="0%" stopColor="#abcbf9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#abcbf9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="embHalo1">
            <stop offset="0%" stopColor="#00543d" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#00543d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="embHalo2">
            <stop offset="0%" stopColor="#d491cd" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#d491cd" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#embGrid)" />

        {/* Halos radiales · aparecen en fase 1 al hover */}
        {[0, 1, 2].map((ci) => (
          <motion.circle
            key={`halo-${ci}`}
            cx={CLUSTER_CENTERS[ci].x}
            cy={CLUSTER_CENTERS[ci].y}
            r={86}
            fill={`url(#embHalo${ci})`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 1 && hoverCluster === ci ? 1 : 0,
              scale: phase === 1 && hoverCluster === ci ? 1.08 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              pointerEvents: 'none',
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Líneas conectoras dentro de cluster · feedback visual sutil */}
        {phase === 1 &&
          connectors.map((l) => {
            const active = hoverCluster === l.cluster;
            const dimmed = hoverCluster !== null && !active;
            return (
              <motion.line
                key={l.id}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={CLUSTER_CENTERS[l.cluster].color}
                strokeWidth={active ? 1.2 : 0.6}
                strokeOpacity={dimmed ? 0.04 : active ? 0.55 : 0.18}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.5 + l.cluster * 0.12,
                }}
                style={{ transition: 'stroke-opacity 240ms cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            );
          })}

        {/* Etiquetas de cluster · aparecen tras la migración */}
        {CLUSTER_CENTERS.map((c, i) => (
          <motion.g
            key={`label-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity:
                phase === 1
                  ? hoverCluster === null || hoverCluster === i
                    ? 1
                    : 0.28
                  : 0,
              y: phase === 1 ? 0 : 6,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
          >
            <line
              x1={c.x}
              y1={c.y + 64}
              x2={c.x}
              y2={c.y + 86}
              stroke={c.color}
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            <text
              x={c.x}
              y={c.y + 104}
              textAnchor="middle"
              fill="#0a0b0c"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {c.label}
            </text>
          </motion.g>
        ))}

        {/* Puntos · entrada con scale 0 → 1, migración a clusters, hover scale up */}
        {points.map((p, i) => {
          const target = phase === 1 ? p.end : p.start;
          const isActive = hoverCluster === null || hoverCluster === p.cluster;
          return (
            <motion.circle
              key={`${p.id}-${replayKey}`}
              r={6}
              initial={{
                cx: p.start.x,
                cy: p.start.y,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                cx: target.x,
                cy: target.y,
                scale: hoverCluster === p.cluster ? 1.35 : 1,
                opacity: isActive ? 1 : 0.18,
              }}
              transition={{
                cx: {
                  duration: phase === 1 ? 1.2 : 0.45,
                  delay: phase === 1 ? 0.5 + (i % 4) * 0.06 + p.cluster * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1],
                },
                cy: {
                  duration: phase === 1 ? 1.2 : 0.45,
                  delay: phase === 1 ? 0.5 + (i % 4) * 0.06 + p.cluster * 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: {
                  duration: 0.5,
                  delay: phase === 1 ? 0 : i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              fill={phase === 1 ? CLUSTER_CENTERS[p.cluster].color : '#4D5B6D'}
              stroke={phase === 1 ? CLUSTER_CENTERS[p.cluster].color : '#0a0b0c'}
              strokeWidth={phase === 1 ? 0 : 1}
              style={{
                cursor: 'pointer',
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: 'fill 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={() => setHoverCluster(p.cluster)}
              onMouseLeave={() => setHoverCluster(null)}
            />
          );
        })}
      </svg>

      {/* Caption inferior · narrativa de fase */}
      <div
        className="mt-4 flex items-center justify-between flex-wrap gap-2"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13.5,
          color: 'var(--ada-graphite)',
        }}
      >
        <motion.span
          key={phase}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {phase === 0 ? (
            <>
              <strong style={{ fontWeight: 500 }}>Antes ·</strong> imágenes
              dermatológicas dispersas sin etiqueta asignada
            </>
          ) : (
            <>
              <strong style={{ fontWeight: 500 }}>Después ·</strong> el modelo
              agrupa por similitud visual sin supervisión externa
            </>
          )}
        </motion.span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            opacity: 0.5,
            fontWeight: 500,
          }}
        >
          12 muestras · 3 clusters
        </span>
      </div>
    </div>
  );
}
