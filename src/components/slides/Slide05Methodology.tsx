import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { crispPhases, ganttPhases, ganttSemesters, TOTAL_WEEKS } from '@/data/eda';
import { cn } from '@/lib/utils';

function CrispWheel() {
  const cx = 220;
  const cy = 220;
  const rOuter = 180;
  const rInner = 80;
  const n = crispPhases.length;
  const palette = ['#0173b2', '#de8f05', '#029e73', '#d55e00', '#cc78bc', '#5d2a1a'];

  return (
    <svg viewBox="0 0 440 440" className="w-full h-auto">
      <defs>
        <radialGradient id="crisp-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe1d1" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
      </defs>

      {/* Slow rotation indicator (decorative outer ring) */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={rOuter + 14}
        fill="none"
        stroke="#5d2a1a"
        strokeWidth={0.6}
        strokeDasharray="4 8"
        opacity={0.35}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {crispPhases.map((p, i) => {
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
        const labelR = (rOuter + rInner) / 2 + 6;
        const lx = cx + Math.cos(midAngle) * labelR;
        const ly = cy + Math.sin(midAngle) * labelR;

        const isDone = i < 2;
        const isActive = i === 2;

        return (
          <motion.g
            key={p.n}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            whileHover={{ scale: 1.04 }}
          >
            <path
              d={`M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 0 0 ${xi1} ${yi1} Z`}
              fill={palette[i]}
              opacity={isDone ? 0.9 : isActive ? 0.6 : 0.18}
              stroke="#ffffff"
              strokeWidth={1.5}
            />
            <text
              x={lx}
              y={ly}
              fontSize="11"
              textAnchor="middle"
              fontWeight={700}
              fill={isDone ? '#ffffff' : '#17191c'}
            >
              {p.n.toString().padStart(2, '0')}
            </text>
          </motion.g>
        );
      })}

      {/* Pulsing center */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={rInner - 6}
        fill="url(#crisp-center)"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <text x={cx} y={cy - 6} fontSize="13" textAnchor="middle" fontFamily="Instrument Serif" fontStyle="italic" fill="#5d2a1a">
        CRISP-DM
      </text>
      <text x={cx} y={cy + 10} fontSize="9" textAnchor="middle" fill="#4c4c4c">
        ciclo iterativo
      </text>
      <text x={cx} y={cy + 24} fontSize="8" textAnchor="middle" fill="#777b86" fontStyle="italic">
        (Wirth & Hipp, 2000)
      </text>
    </svg>
  );
}

function GanttSemestral() {
  const week1End = 16;

  return (
    <div className="relative">
      {/* Semester header */}
      <div className="grid grid-cols-[200px_1fr] gap-3 mb-3">
        <div />
        <div className="relative grid grid-cols-2 text-[10px] font-mono">
          {ganttSemesters.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'pb-2 border-b-2',
                i === 0 ? 'pr-2 border-chart-1' : 'pl-2 border-terracotta'
              )}
              style={{ borderColor: s.color }}
            >
              <p className="text-ink font-semibold" style={{ color: s.color }}>
                {s.label}
              </p>
              <p className="text-light-steel text-[9px]">{s.weeks} semanas</p>
            </div>
          ))}
        </div>
      </div>

      {/* Week ticks */}
      <div className="grid grid-cols-[200px_1fr] gap-3 mb-2">
        <div />
        <div className="relative h-3">
          {Array.from({ length: 8 }, (_, i) => i * 4 + 4).map((w) => (
            <span
              key={w}
              className="absolute top-0 text-[9px] text-light-steel font-mono -translate-x-1/2"
              style={{ left: `${(w / TOTAL_WEEKS) * 100}%` }}
            >
              s{w}
            </span>
          ))}
        </div>
      </div>

      {/* Phase bars */}
      <div className="space-y-2.5">
        {ganttPhases.map((g, i) => {
          const widthPct = (g.span / TOTAL_WEEKS) * 100;
          const leftPct = (g.start / TOTAL_WEEKS) * 100;
          const color =
            g.status === 'done'
              ? 'bg-chart-3 text-canvas'
              : g.status === 'active'
              ? 'bg-terracotta text-canvas'
              : g.semester === 'I'
              ? 'bg-chart-1/30 text-chart-1'
              : 'bg-terracotta/15 text-terracotta';
          return (
            <motion.div
              key={g.phase}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              viewport={{ once: true }}
              className="grid grid-cols-[200px_1fr] gap-3 items-center group"
            >
              <span className="text-[12.5px] text-ink/85 truncate group-hover:text-ink transition-colors">
                {g.phase}
              </span>
              <div className="relative h-7 rounded-lg bg-fog overflow-visible">
                {/* Semester divider */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-ink/15 z-10"
                  style={{ left: `${(week1End / TOTAL_WEEKS) * 100}%` }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPct}%` }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={cn(
                    'absolute top-0 h-full rounded-lg flex items-center px-2.5 shadow-sm group-hover:shadow-md transition-shadow',
                    color
                  )}
                  style={{ left: `${leftPct}%` }}
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    {g.status === 'done' ? '✓ hecho' : g.status === 'active' ? '● en curso' : `${g.span} sem`}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-4 text-[10.5px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-chart-3" /> completado
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-terracotta" /> en curso
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-chart-1/30" /> sem I planeado
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-terracotta/15" /> sem II planeado
        </span>
      </div>
    </div>
  );
}

export default function Slide05Methodology() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgRot = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax accent */}
      <motion.div
        style={{ y: bgY, rotate: bgRot }}
        className="absolute top-[10%] -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-warm-mist/50 to-transparent blur-3xl pointer-events-none"
        aria-hidden
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-[10%] -left-32 w-[400px] h-[400px] rounded-full bg-chart-1/8 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        <span className="eyebrow">5 · Metodología · Cronograma</span>
        <h2 className="mt-3 font-display text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-tight text-ink max-w-3xl">
          Un proceso <span className="italic text-terracotta">iterativo</span>, no lineal.
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CRISP wheel (5 cols) */}
          <div className="lg:col-span-5 card-fog p-6 md:p-8">
            <span className="eyebrow mb-2 block">Fases CRISP-DM</span>
            <CrispWheel />
            <div className="mt-4 grid grid-cols-1 gap-1.5 text-[11px]">
              {crispPhases.map((p, i) => {
                const palette = ['#0173b2', '#de8f05', '#029e73', '#d55e00', '#cc78bc', '#5d2a1a'];
                const isDone = i < 2;
                return (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <span
                      className="mt-0.5 h-3 w-3 rounded shrink-0"
                      style={{ background: palette[i], opacity: isDone ? 1 : 0.35 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-ink font-medium leading-tight">{p.name}</p>
                      <p className="text-muted-stone text-[10px] truncate">{p.detail}</p>
                    </div>
                    {isDone && (
                      <span className="text-[9px] text-chart-3 font-mono uppercase tracking-wider shrink-0">
                        ✓
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Gantt (7 cols) */}
          <div className="lg:col-span-7 card p-6 md:p-8">
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <span className="eyebrow">Cronograma macro</span>
                <p className="text-[11px] text-muted-stone mt-0.5">
                  2 semestres · {TOTAL_WEEKS} semanas · UNAB Proyecto de Grado I + II
                </p>
              </div>
            </div>
            <GanttSemestral />
          </div>
        </div>

        {/* Highlight current state */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 card-warm p-6 flex items-start gap-5"
        >
          <div className="font-display text-[64px] text-terracotta leading-none italic shrink-0">→</div>
          <div>
            <span className="eyebrow text-terracotta">Estado actual</span>
            <p className="mt-1.5 text-[15px] text-ink leading-relaxed">
              Semestre <strong>2026-I</strong> en curso. Objetivo 1 (EDA cruzado) +
              marco teórico <strong>completados</strong>. Redacción del anteproyecto
              y correcciones del jurado en proceso, con sustentación al cierre del
              semestre. La fase de modelado (Objetivos 2–4) abre en 2026-II.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
