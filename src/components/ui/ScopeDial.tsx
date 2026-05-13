// ─────────────────────────────────────────────────────────────────────────
// Dial de alcance · hemisferio teal (incluye) + hemisferio navy (delimita),
// con TRL 4 al centro. Rayos hacia cada ítem en cada hemisferio. Hover
// resalta el sector correspondiente. Mobile colapsa a grid 2-col bajo el
// dial.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ENTER } from '@/lib/motion';

export type ScopeDialProps = {
  incluye: readonly string[];
  delimitacion: readonly { eje: string; detalle: string }[];
  trl?: { nivel: string; descripcion: string };
};

const W = 1040;
const H = 600;
const CX = W / 2;
const CY = H / 2 + 10;
const R = 145;
const RAY_END = 260;
const LABEL_W = 250;
const LABEL_PAD = 14;

export default function ScopeDial({
  incluye,
  delimitacion,
  trl = {
    nivel: 'TRL 4',
    descripcion: 'Prototipo validado en laboratorio',
  },
}: ScopeDialProps) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<
    | { side: 'inc' | 'del'; idx: number }
    | null
  >(null);

  const incCount = incluye.length;
  const delCount = delimitacion.length;

  // angulos: incluye en arco superior izquierdo · delimita en arco superior derecho.
  // angulo 180° = izquierda · 0° = derecha · 270° = arriba.
  // Distribuyo incluye en arco (180°→260°) clockwise y delimita (-80°→0°)
  function incAngle(i: number) {
    const start = 200;
    const end = 340;
    return start + ((end - start) * i) / Math.max(1, incCount - 1);
  }
  function delAngle(i: number) {
    const start = 20;
    const end = 160;
    return start + ((end - start) * i) / Math.max(1, delCount - 1);
  }

  function pointOnCircle(angleDeg: number, r: number) {
    const a = (angleDeg * Math.PI) / 180;
    // Redondeo a 2 decimales para evitar hydration mismatch SSR/CSR.
    return {
      x: Math.round((CX + Math.cos(a) * r) * 100) / 100,
      y: Math.round((CY - Math.sin(a) * r) * 100) / 100,
    };
  }

  return (
    <div className="relative">
      {/* Desktop SVG dial */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full h-auto select-none"
          role="img"
          aria-label="Dial de alcance: incluye y delimitación, con TRL 4 al centro"
        >
          <defs>
            <radialGradient id="scopeCore" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#2BAFAA" />
              <stop offset="100%" stopColor="#0F2C45" />
            </radialGradient>
            <filter id="scopeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Ring exterior */}
          <circle
            cx={CX}
            cy={CY}
            r={R + 18}
            fill="none"
            stroke="rgba(15,44,69,0.12)"
            strokeWidth={1}
            strokeDasharray="3 6"
          />

          {/* Hemisferio teal (incluye) · arco superior izq */}
          <path
            d={`M ${CX - R - 8} ${CY} A ${R + 8} ${R + 8} 0 0 1 ${CX + R + 8} ${CY} Z`}
            fill="rgba(31,140,136,0.06)"
            stroke="rgba(31,140,136,0.16)"
            strokeWidth={1}
          />

          {/* Etiquetas hemisferios */}
          <text
            x={CX - R + 6}
            y={CY - R - 14}
            textAnchor="start"
            style={{
              fill: '#1F8C88',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            ↑ incluye
          </text>
          <text
            x={CX + R - 6}
            y={CY + R + 22}
            textAnchor="end"
            style={{
              fill: '#0F2C45',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            ↓ delimita
          </text>

          {/* Rayos · incluye */}
          {incluye.map((item, i) => {
            const a = incAngle(i);
            const start = pointOnCircle(a, R + 4);
            const end = pointOnCircle(a, RAY_END);
            const active = hover?.side === 'inc' && hover.idx === i;
            const dim = hover !== null && !active;
            const labelLeft = end.x < CX;
            // Clamp labelX para que el rectángulo quepa siempre dentro del viewBox.
            const rawLeftX = end.x - LABEL_PAD - LABEL_W;
            const rawRightX = end.x + LABEL_PAD;
            const labelXBox = labelLeft
              ? Math.max(4, rawLeftX)
              : Math.min(W - LABEL_W - 4, rawRightX);
            const labelAnchor: 'start' | 'end' = labelLeft ? 'end' : 'start';
            return (
              <g
                key={`inc-${i}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHover({ side: 'inc', idx: i })}
                onMouseLeave={() => setHover(null)}
              >
                <motion.line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={active ? '#1F8C88' : 'rgba(31,140,136,0.32)'}
                  strokeWidth={active ? 1.8 : 1}
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={reduced ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, ease: ENTER, delay: 0.4 + i * 0.06 }}
                  style={{ opacity: dim ? 0.18 : 1, transition: 'all 200ms' }}
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={active ? 5 : 3.5}
                  fill={active ? '#1F8C88' : '#2BAFAA'}
                  style={{ opacity: dim ? 0.2 : 1, transition: 'all 200ms' }}
                />
                <foreignObject
                  x={labelXBox}
                  y={end.y - 22}
                  width={LABEL_W}
                  height={50}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 13.5,
                      lineHeight: 1.35,
                      color: active ? '#0F2C45' : '#2D3B4F',
                      fontWeight: active ? 600 : 500,
                      textAlign: labelAnchor === 'end' ? 'right' : 'left',
                      opacity: dim ? 0.3 : 1,
                      transition: 'opacity 200ms',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* Rayos · delimita */}
          {delimitacion.map((item, i) => {
            const a = delAngle(i);
            const start = pointOnCircle(a, R + 4);
            const end = pointOnCircle(a, RAY_END);
            const active = hover?.side === 'del' && hover.idx === i;
            const dim = hover !== null && !active;
            const labelLeft = end.x < CX;
            // Clamp labelX para que el rectángulo quepa siempre dentro del viewBox.
            const rawLeftX = end.x - LABEL_PAD - LABEL_W;
            const rawRightX = end.x + LABEL_PAD;
            const labelXBox = labelLeft
              ? Math.max(4, rawLeftX)
              : Math.min(W - LABEL_W - 4, rawRightX);
            const labelAnchor: 'start' | 'end' = labelLeft ? 'end' : 'start';
            return (
              <g
                key={`del-${i}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHover({ side: 'del', idx: i })}
                onMouseLeave={() => setHover(null)}
              >
                <motion.line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={active ? '#0F2C45' : 'rgba(15,44,69,0.28)'}
                  strokeWidth={active ? 1.8 : 1}
                  strokeDasharray={active ? '0' : '3 4'}
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={reduced ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, ease: ENTER, delay: 0.6 + i * 0.06 }}
                  style={{ opacity: dim ? 0.18 : 1, transition: 'all 200ms' }}
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r={active ? 5 : 3.5}
                  fill={active ? '#0F2C45' : '#4D5B6D'}
                  style={{ opacity: dim ? 0.2 : 1, transition: 'all 200ms' }}
                />
                <foreignObject
                  x={labelXBox}
                  y={end.y - 22}
                  width={LABEL_W}
                  height={50}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11.5,
                      lineHeight: 1.3,
                      color: active ? '#0F2C45' : '#4D5B6D',
                      fontWeight: active ? 600 : 500,
                      textAlign: labelAnchor === 'end' ? 'right' : 'left',
                      opacity: dim ? 0.3 : 1,
                      transition: 'opacity 200ms',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    <strong style={{ fontWeight: 600 }}>{item.eje}</strong>
                    <span style={{ color: '#8C99A8' }}> · {item.detalle}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* Centro · TRL 4 */}
          <motion.g
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: ENTER, delay: 0.2 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={R + 6}
              fill="rgba(31,140,136,0.08)"
              filter="url(#scopeGlow)"
            />
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="url(#scopeCore)"
              stroke="#2BAFAA"
              strokeWidth={1.5}
            />
            <foreignObject
              x={CX - R + 10}
              y={CY - R + 10}
              width={R * 2 - 20}
              height={R * 2 - 20}
            >
              <div
                className="flex h-full w-full flex-col items-center justify-center text-center"
                style={{ color: '#FFFFFF', padding: '0 12px' }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  Madurez
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', 'Lyon Text', Georgia, serif",
                    fontStyle: 'italic',
                    fontSize: 52,
                    lineHeight: 1,
                    margin: '4px 0 8px',
                  }}
                >
                  {trl.nivel}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11.5,
                    lineHeight: 1.3,
                    color: 'rgba(255,255,255,0.78)',
                    maxWidth: 180,
                  }}
                >
                  {trl.descripcion}
                </div>
              </div>
            </foreignObject>
          </motion.g>
        </svg>
      </div>

      {/* Mobile · listado simple en 2 columnas */}
      <div className="md:hidden">
        <div
          className="mb-6 text-center"
          style={{
            background: '#0F2C45',
            color: '#fff',
            padding: '20px 24px',
            borderRadius: 16,
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Madurez objetivo
          </div>
          <div
            style={{
              fontFamily: "'Instrument Serif', 'Lyon Text', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 42,
              lineHeight: 1,
              margin: '4px 0 6px',
            }}
          >
            {trl.nivel}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
            {trl.descripcion}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-[12px]">
          <div>
            <div
              className="font-mono uppercase mb-2"
              style={{ color: 'var(--color-teal)', letterSpacing: '0.18em', fontSize: 10 }}
            >
              Incluye
            </div>
            <ul className="space-y-1 list-disc pl-4">
              {incluye.map((x, i) => (
                <li key={i} style={{ color: 'var(--color-navy)', lineHeight: 1.4 }}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="font-mono uppercase mb-2"
              style={{ color: 'var(--color-navy)', letterSpacing: '0.18em', fontSize: 10 }}
            >
              Delimita
            </div>
            <ul className="space-y-1 list-disc pl-4">
              {delimitacion.map((x, i) => (
                <li key={i} style={{ color: 'var(--color-ink-soft)', lineHeight: 1.4 }}>
                  <strong>{x.eje}</strong> · {x.detalle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
