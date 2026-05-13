import { motion } from 'framer-motion';
import { useState } from 'react';

type Phase = { n: number; name: string; detail: string };

/**
 * MONO X7 CRISP-DM wheel.
 * - completed segments  → filled #292929, white text
 * - active segment      → 1px solid ink border, no fill, ink text
 * - pending segments    → 1px dashed ink border, grey-300 text
 *
 * NO color, NO gradient, NO blur, NO drop shadow.
 */
export default function CrispWheel({
  phases,
  activePhase = 3,
  doneUpTo = 2,
}: {
  phases: Phase[];
  activePhase?: number;
  doneUpTo?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const cx = 180;
  const cy = 180;
  const rOuter = 160;
  const rInner = 70;
  const n = phases.length;

  const INK = '#292929';
  const GREY_300 = '#b4b8b4';
  const WHITE = '#ffffff';

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 360 360" className="w-full h-auto">
        {/* outer hairline ring */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 8}
          fill="none"
          stroke={INK}
          strokeWidth={1}
        />

        {phases.map((p, i) => {
          const startAngle = (i / n) * 2 * Math.PI - Math.PI / 2;
          const endAngle = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
          const x1 = cx + Math.cos(startAngle) * rOuter;
          const y1 = cy + Math.sin(startAngle) * rOuter;
          const x2 = cx + Math.cos(endAngle) * rOuter;
          const y2 = cy + Math.sin(endAngle) * rOuter;
          const xi1 = cx + Math.cos(startAngle) * rInner;
          const yi1 = cy + Math.sin(startAngle) * rInner;
          const xi2 = cx + Math.cos(endAngle) * rInner;
          const yi2 = cy + Math.sin(endAngle) * rInner;

          const midAngle = (startAngle + endAngle) / 2;
          const labelR = (rOuter + rInner) / 2;
          const lx = cx + Math.cos(midAngle) * labelR;
          const ly = cy + Math.sin(midAngle) * labelR;

          const phaseNumber = p.n;
          const isDone = phaseNumber <= doneUpTo;
          const isActive = phaseNumber === activePhase;
          const isHovered = hovered === phaseNumber;

          let fill = WHITE;
          let textColor = INK;
          let stroke = INK;
          let dash: string | undefined;

          if (isDone) {
            fill = INK;
            textColor = WHITE;
            stroke = INK;
          } else if (isActive) {
            fill = WHITE;
            textColor = INK;
            stroke = INK;
          } else {
            fill = WHITE;
            textColor = GREY_300;
            stroke = GREY_300;
            dash = '4 4';
          }

          const sectorPath = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 0 0 ${xi1} ${yi1} Z`;

          return (
            <motion.g
              key={p.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(phaseNumber)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <path
                d={sectorPath}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                strokeDasharray={dash}
                opacity={isHovered && !isDone && !isActive ? 0.7 : 1}
              />
              {/* number · Bebas Neue */}
              <text
                x={lx}
                y={ly - 4}
                fontSize="22"
                textAnchor="middle"
                fontFamily="Bebas Neue, Impact, sans-serif"
                fontWeight={400}
                fill={textColor}
                style={{ pointerEvents: 'none', letterSpacing: '0' }}
              >
                {String(phaseNumber).padStart(2, '0')}
              </text>
              {/* mini label · Oswald */}
              <text
                x={lx}
                y={ly + 12}
                fontSize="7.5"
                textAnchor="middle"
                fontFamily="Oswald, Impact, sans-serif"
                fontWeight={400}
                fill={textColor}
                style={{ pointerEvents: 'none', letterSpacing: '1.2px', textTransform: 'uppercase' }}
              >
                {truncate(p.name.toUpperCase(), 14)}
              </text>
            </motion.g>
          );
        })}

        {/* hub */}
        <circle cx={cx} cy={cy} r={rInner - 4} fill={WHITE} stroke={INK} strokeWidth={1} />
        <text
          x={cx}
          y={cy - 10}
          fontSize="22"
          textAnchor="middle"
          fontFamily="Bebas Neue, Impact, sans-serif"
          fontWeight={400}
          fill={INK}
        >
          CRISP-DM
        </text>
        <text
          x={cx}
          y={cy + 6}
          fontSize="8"
          textAnchor="middle"
          fontFamily="Oswald, Impact, sans-serif"
          fontWeight={400}
          fill={INK}
          style={{ letterSpacing: '1.6px', textTransform: 'uppercase' }}
        >
          SPRINT ACTUAL
        </text>
        <text
          x={cx}
          y={cy + 22}
          fontSize="9"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontWeight={500}
          fill={INK}
          style={{ letterSpacing: '0.5px' }}
        >
          F{activePhase} / {n}
        </text>
      </svg>

      {hovered !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-2 max-w-[320px] bg-ink-black text-canvas-white text-[12px] leading-snug px-3 py-2 pointer-events-none border border-ink-black"
        >
          <span className="font-condensed uppercase tracking-[0.2em] text-[9px] block mb-1">
            FASE {String(hovered).padStart(2, '0')} · {phases[hovered - 1]?.name}
          </span>
          <span className="font-nh">{phases[hovered - 1]?.detail}</span>
        </motion.div>
      )}
    </div>
  );
}

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}
