import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { crispPhases, ganttPhases, TOTAL_WEEKS } from '@/data/eda';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const CURRENT_WEEK = 14;
const SEM_BOUNDARY = 16;
const ACTIVE_PHASE_DEFAULT = 3;
const DONE_UP_TO = 2;

// ─────────────────────────────────────────────────────────────────────
// Objective ↔ CRISP-DM phase mapping
// ─────────────────────────────────────────────────────────────────────
type ObjStatus = 'done' | 'active' | 'next';
const OBJECTIVES: {
  n: number;
  label: string;
  phases: number[];
  status: ObjStatus;
  deliverable: string;
  shortDeliverable: string;
}[] = [
  {
    n: 1,
    label: 'Identificar conjuntos de datos',
    phases: [1, 2, 3],
    status: 'done',
    deliverable: 'EDA cruzado · 3 datasets · 13 figuras · ranking 9 lesiones',
    shortDeliverable: 'EDA cruzado',
  },
  {
    n: 2,
    label: 'Diseñar algoritmo SSL',
    phases: [4],
    status: 'active',
    deliverable: 'SimCLR / BYOL / DINO / MAE · ResNet-50 vs ViT-B/16',
    shortDeliverable: 'Modelado SSL',
  },
  {
    n: 3,
    label: 'Evaluar el desempeño',
    phases: [5],
    status: 'next',
    deliverable: 'Accuracy · F1 macro · AUC · matriz de confusión',
    shortDeliverable: 'Evaluación',
  },
  {
    n: 4,
    label: 'Prototipo de aplicación',
    phases: [6],
    status: 'next',
    deliverable: 'Webapp TRL 4 · carga de imagen + predicción + métricas',
    shortDeliverable: 'Prototipo',
  },
];

// Phase short names + short descriptions for hub display
const PHASE_META: Record<number, { short: string; oneLiner: string }> = {
  1: { short: 'BU', oneLiner: 'Comprender el problema clínico y los objetivos.' },
  2: { short: 'DU', oneLiner: 'EDA cruzado sobre HAM, BCN y CO2Wounds.' },
  3: { short: 'DP', oneLiner: 'Normalización, augmentations y partición train/val.' },
  4: { short: 'MOD', oneLiner: 'Entrenar SSL contrastivo sobre el núcleo HAM+BCN.' },
  5: { short: 'EV', oneLiner: 'Métricas vs baseline supervisado equivalente.' },
  6: { short: 'DEP', oneLiner: 'Prototipo TRL 4 con interfaz de carga de imagen.' },
};

// ─────────────────────────────────────────────────────────────────────
// CRISP wheel · interactive
// ─────────────────────────────────────────────────────────────────────
function InteractiveCrispWheel({
  active,
  onSelect,
  highlightPhases,
}: {
  active: number;
  onSelect: (n: number) => void;
  highlightPhases: number[];
}) {
  const cx = 180;
  const cy = 180;
  const rOuter = 160;
  const rInner = 78;
  const n = crispPhases.length;

  const INK = '#292929';
  const GREY_300 = '#b4b8b4';
  const WHITE = '#ffffff';

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <svg viewBox="0 0 360 360" className="w-full h-auto">
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 8}
          fill="none"
          stroke={INK}
          strokeWidth={1}
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
          const labelR = (rOuter + rInner) / 2;
          const lx = cx + Math.cos(midAngle) * labelR;
          const ly = cy + Math.sin(midAngle) * labelR;

          const phaseNumber = p.n;
          const isDone = phaseNumber <= DONE_UP_TO;
          const isActive = phaseNumber === active;
          const isHighlighted = highlightPhases.includes(phaseNumber);

          let fill = WHITE;
          let textColor = INK;
          let stroke = INK;
          let dash: string | undefined;
          let hatch = false;

          if (isDone) {
            fill = INK;
            textColor = WHITE;
            stroke = INK;
          } else if (isActive) {
            fill = WHITE;
            textColor = INK;
            stroke = INK;
            hatch = true;
          } else {
            fill = WHITE;
            textColor = GREY_300;
            stroke = GREY_300;
            dash = '4 4';
          }

          const sectorPath = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 0 0 ${xi1} ${yi1} Z`;
          const patternId = `hatch-${phaseNumber}`;

          return (
            <motion.g
              key={p.n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
              onClick={() => onSelect(phaseNumber)}
              className="cursor-pointer"
              role="button"
              aria-label={`Fase ${phaseNumber} ${p.name}`}
            >
              <defs>
                <pattern
                  id={patternId}
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="1" />
                </pattern>
              </defs>

              <path
                d={sectorPath}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                strokeDasharray={dash}
              />

              {hatch && (
                <path d={sectorPath} fill={`url(#${patternId})`} opacity={0.35} />
              )}

              {isHighlighted && !isActive && !isDone && (
                <path
                  d={sectorPath}
                  fill="none"
                  stroke={INK}
                  strokeWidth={2}
                />
              )}

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
              <text
                x={lx}
                y={ly + 12}
                fontSize="8"
                textAnchor="middle"
                fontFamily="Oswald, Impact, sans-serif"
                fontWeight={400}
                fill={textColor}
                style={{
                  pointerEvents: 'none',
                  letterSpacing: '1.4px',
                  textTransform: 'uppercase',
                }}
              >
                {PHASE_META[phaseNumber].short}
              </text>
            </motion.g>
          );
        })}

        {/* Hub */}
        <circle cx={cx} cy={cy} r={rInner - 4} fill={WHITE} stroke={INK} strokeWidth={1} />

        <text
          x={cx}
          y={cy - 22}
          fontSize="8"
          textAnchor="middle"
          fontFamily="Oswald, Impact, sans-serif"
          fontWeight={400}
          fill={INK}
          style={{ letterSpacing: '1.6px', textTransform: 'uppercase' }}
        >
          FASE {String(active).padStart(2, '0')}
        </text>

        <text
          x={cx}
          y={cy + 4}
          fontSize="22"
          textAnchor="middle"
          fontFamily="Bebas Neue, Impact, sans-serif"
          fontWeight={400}
          fill={INK}
          style={{ letterSpacing: 0 }}
        >
          {PHASE_META[active].short}
        </text>

        {/* one-liner · wrap manually */}
        {(() => {
          const txt = PHASE_META[active].oneLiner;
          // simple word-wrap into 2 lines max
          const words = txt.split(' ');
          const lines: string[] = ['', ''];
          let li = 0;
          for (const w of words) {
            if ((lines[li] + ' ' + w).trim().length > 24 && li === 0) li = 1;
            lines[li] = (lines[li] + ' ' + w).trim();
          }
          return (
            <>
              <text
                x={cx}
                y={cy + 22}
                fontSize="7.5"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={300}
                fill={INK}
              >
                {lines[0]}
              </text>
              <text
                x={cx}
                y={cy + 32}
                fontSize="7.5"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={300}
                fill={INK}
              >
                {lines[1]}
              </text>
            </>
          );
        })()}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Gantt · 4 lanes, one per objective
// ─────────────────────────────────────────────────────────────────────
function ObjectiveGantt({
  selectedObj,
  onHoverTask,
  onSelectObj,
}: {
  selectedObj: number;
  onHoverTask: (i: number | null) => void;
  onSelectObj: (n: number) => void;
}) {
  const [tip, setTip] = useState<number | null>(null);

  // Map each gantt task to an objective lane (by index in ganttPhases)
  // Manual mapping based on data semantics:
  // 0: Obj1 EDA · 1: Obj1 marco · 2: Obj1 redacción · 3: Obj1 sustentación
  // 4: Obj2 · 5: Obj3 · 6: Obj4 · 7: Obj4 doc final
  const taskToObj = useMemo<number[]>(() => [1, 1, 1, 1, 2, 3, 4, 4], []);

  const tickWeeks = [1, 4, 8, 12, 16, 20, 24, 28, 32];

  const lanes = [1, 2, 3, 4];

  return (
    <div className="relative">
      {/* week ticks */}
      <div className="grid grid-cols-[112px_1fr] gap-x-3 mb-2">
        <div />
        <div className="relative h-6 border-b border-ink-black">
          {tickWeeks.map((w) => (
            <div
              key={w}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${(w / TOTAL_WEEKS) * 100}%` }}
            >
              <span className="font-condensed text-[10px] tracking-[0.1em] uppercase text-grey-500">
                S{String(w).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AHORA label row */}
      <div className="grid grid-cols-[112px_1fr] gap-x-3 mb-2">
        <div />
        <div className="relative h-5">
          <div
            className="absolute top-0 flex items-center gap-1"
            style={{
              left: `${(CURRENT_WEEK / TOTAL_WEEKS) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="font-condensed text-[10px] tracking-[0.2em] uppercase bg-deep-black text-canvas-white px-2 py-[2px] whitespace-nowrap">
              SEM 14 · AHORA
            </span>
          </div>
          {/* sem boundary label */}
          <div
            className="absolute top-0 flex items-center gap-1"
            style={{
              left: `${(SEM_BOUNDARY / TOTAL_WEEKS) * 100}%`,
              transform: 'translateX(0)',
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-grey-500 whitespace-nowrap pl-1">
              ▏2026-II
            </span>
          </div>
        </div>
      </div>

      {/* lanes · one per objective */}
      <div className="border border-ink-black divide-y divide-ink-black">
        {lanes.map((objN) => {
          const obj = OBJECTIVES.find((o) => o.n === objN)!;
          const isSelected = selectedObj === objN;

          return (
            <div
              key={objN}
              className={cn(
                'grid grid-cols-[112px_1fr] gap-x-3 cursor-pointer transition-colors',
                isSelected && 'bg-grey-50',
              )}
              onClick={() => onSelectObj(objN)}
            >
              {/* lane label */}
              <div className="border-r border-ink-black px-3 py-3 flex flex-col justify-center">
                <span className="font-condensed text-[10px] tracking-[0.2em] uppercase text-ink-black">
                  OBJ · {String(objN).padStart(2, '0')}
                </span>
                <span className="font-nh text-[10.5px] leading-tight text-ink-black mt-1">
                  {obj.shortDeliverable}
                </span>
                <span
                  className={cn(
                    'mt-1.5 font-condensed text-[9px] tracking-[0.2em] uppercase inline-block w-fit',
                    obj.status === 'done' && 'bg-ink-black text-canvas-white px-1.5',
                    obj.status === 'active' && 'border border-ink-black text-ink-black px-1.5',
                    obj.status === 'next' && 'text-grey-500',
                  )}
                >
                  {obj.status === 'done' ? 'DONE' : obj.status === 'active' ? 'ACTIVE' : 'NEXT'}
                </span>
              </div>

              {/* bars row */}
              <div className="relative h-[58px]">
                {/* semester boundary */}
                <div
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-grey-300"
                  style={{ left: `${(SEM_BOUNDARY / TOTAL_WEEKS) * 100}%` }}
                />
                {/* now line */}
                <div
                  aria-hidden
                  className="absolute -top-1 -bottom-1 w-px bg-deep-black pointer-events-none z-10"
                  style={{ left: `${(CURRENT_WEEK / TOTAL_WEEKS) * 100}%` }}
                />

                {/* bars belonging to this objective */}
                {ganttPhases.map((g, i) => {
                  if (taskToObj[i] !== objN) return null;
                  const widthPct = (g.span / TOTAL_WEEKS) * 100;
                  const leftPct = (g.start / TOTAL_WEEKS) * 100;

                  return (
                    <motion.div
                      key={g.phase}
                      initial={{ opacity: 0, scaleX: 0.6 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        duration: 0.6,
                        ease: EASE,
                      }}
                      viewport={{ once: true }}
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        top: '14px',
                        transformOrigin: 'left center',
                      }}
                      className={cn(
                        'absolute h-7 border',
                        g.status === 'done' && 'bg-ink-black border-ink-black',
                        g.status === 'active' && 'bg-canvas-white border-ink-black',
                        g.status === 'pending' && 'bg-canvas-white border-grey-300 border-dashed',
                      )}
                      onMouseEnter={() => {
                        setTip(i);
                        onHoverTask(i);
                      }}
                      onMouseLeave={() => {
                        setTip(null);
                        onHoverTask(null);
                      }}
                    >
                      {g.status === 'active' && (
                        <div
                          aria-hidden
                          className="absolute inset-0 pointer-events-none hatch-ink opacity-30"
                        />
                      )}
                      <span
                        className={cn(
                          'absolute inset-0 flex items-center px-2 font-condensed text-[9.5px] tracking-[0.15em] uppercase truncate',
                          g.status === 'done' ? 'text-canvas-white' : 'text-ink-black',
                        )}
                      >
                        {g.phase.replace(/^Objetivo \d+ · /, '').replace(/^Objetivo \d+/, '')}
                      </span>

                      {tip === i && (
                        <div
                          className="absolute -top-9 left-1/2 -translate-x-1/2 z-10 max-w-[260px] bg-ink-black px-2 py-1 font-condensed text-[10px] leading-tight tracking-[0.1em] uppercase text-canvas-white pointer-events-none border border-ink-black text-center"
                          style={{ whiteSpace: 'normal' }}
                        >
                          {g.phase} · {g.span} SEM
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-5 font-condensed text-[10px] tracking-[0.2em] uppercase text-ink-black">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 bg-ink-black border border-ink-black" />
          DONE
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 border border-ink-black bg-canvas-white relative overflow-hidden">
            <span aria-hidden className="absolute inset-0 hatch-ink opacity-30" />
          </span>
          ACTIVE
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 border border-grey-300 border-dashed bg-canvas-white" />
          PENDING
        </span>
        <span className="inline-flex items-center gap-2 ml-auto">
          <span className="h-3 w-px bg-deep-black" />
          NOW · SEM 14
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Slide
// ─────────────────────────────────────────────────────────────────────
export default function Slide05Methodology() {
  const ref = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<number>(ACTIVE_PHASE_DEFAULT);
  const [selectedObj, setSelectedObj] = useState<number>(2); // OBJ 2 active

  // Keyboard 1..6 → phase
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = Number(e.key);
      if (Number.isInteger(k) && k >= 1 && k <= 6) {
        setActivePhase(k);
        const obj = OBJECTIVES.find((o) => o.phases.includes(k));
        if (obj) setSelectedObj(obj.n);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // When user clicks objective, pick first phase of that obj
  function selectObj(n: number) {
    setSelectedObj(n);
    const obj = OBJECTIVES.find((o) => o.n === n);
    if (obj) setActivePhase(obj.phases[0]);
  }

  // When user clicks phase in wheel, pick corresponding obj
  function selectPhase(p: number) {
    setActivePhase(p);
    const obj = OBJECTIVES.find((o) => o.phases.includes(p));
    if (obj) setSelectedObj(obj.n);
  }

  const selectedObjData = OBJECTIVES.find((o) => o.n === selectedObj)!;
  const highlightPhases = selectedObjData.phases;

  return (
    <div ref={ref} className="slide relative w-full overflow-hidden bg-canvas-white">
      <div aria-hidden className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="slide-narrow relative">
        {/* header */}
        <div className="flex items-baseline justify-between border-b border-ink-black pb-3">
          <span className="eyebrow">05 · METODOLOGÍA · CRISP-DM</span>
          <div className="flex items-center gap-3">
            <span className="pulse-dot" aria-hidden />
            <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
              SPRINT ACTIVO · F{activePhase}
            </span>
          </div>
        </div>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 font-nh font-light text-ink-black"
          style={{
            fontSize: 'clamp(44px, 5.4vw, 72px)',
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            maxWidth: '24ch',
          }}
        >
          Seis fases canónicas. Cuatro entregables. Una iteración por sprint.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          viewport={{ once: true }}
          className="mt-5 font-nh font-light text-ink-black"
          style={{ fontSize: 22, lineHeight: 1.4, maxWidth: '60ch' }}
        >
          CRISP-DM 1.0 (Wirth &amp; Hipp 2000), adaptado a los cuatro objetivos del proyecto
          académico de la Universidad Autónoma de Bucaramanga.
        </motion.p>

        {/* main grid · 5/12 + 7/12 */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink-black">
          {/* LEFT · wheel + objectives list */}
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-ink-black">
            <div className="flex items-baseline justify-between border-b border-ink-black pb-2 mb-5">
              <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
                ── CRISP-DM · 6 FASES
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-grey-500">
                CLICK / 1–6
              </span>
            </div>

            <InteractiveCrispWheel
              active={activePhase}
              onSelect={selectPhase}
              highlightPhases={highlightPhases}
            />

            <div className="mt-7">
              <div className="flex items-baseline justify-between border-b border-ink-black pb-2 mb-3">
                <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
                  ── 4 OBJETIVOS · MAPEO
                </span>
              </div>

              <ul className="divide-y divide-grey-100 border-t border-grey-100">
                {OBJECTIVES.map((o, i) => {
                  const isSelected = selectedObj === o.n;
                  return (
                    <motion.li
                      key={o.n}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease: EASE }}
                      className={cn(
                        'hover-reveal flex items-start gap-3 py-3 px-2 cursor-pointer transition-colors',
                        isSelected && 'bg-grey-50',
                      )}
                      onClick={() => selectObj(o.n)}
                    >
                      <span
                        className={cn(
                          'inline-flex h-6 w-6 items-center justify-center font-mono text-[10px] shrink-0 border',
                          o.status === 'done' && 'bg-ink-black text-canvas-white border-ink-black',
                          o.status === 'active' &&
                            'bg-canvas-white text-ink-black border-ink-black',
                          o.status === 'next' &&
                            'bg-canvas-white text-grey-500 border-grey-300 border-dashed',
                        )}
                      >
                        {String(o.n).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-condensed text-[11.5px] tracking-[0.1em] uppercase leading-tight text-ink-black">
                          {o.label}
                        </p>
                        <p
                          className="font-mono text-[10px] tracking-[0.05em] text-grey-500 mt-0.5"
                          data-hide=""
                        >
                          {o.phases.map((p) => `F${p}·${PHASE_META[p].short}`).join(' · ')}
                        </p>
                        <p
                          data-reveal=""
                          className="absolute-not font-nh text-[11.5px] leading-snug text-ink-black mt-0.5"
                        >
                          {o.deliverable}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'font-condensed text-[9px] tracking-[0.2em] uppercase shrink-0 mt-1',
                          o.status === 'done' && 'text-ink-black',
                          o.status === 'active' && 'text-ink-black',
                          o.status === 'next' && 'text-grey-500',
                        )}
                      >
                        {o.status === 'done' ? 'DONE' : o.status === 'active' ? 'ACTIVE' : 'NEXT'}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT · Gantt */}
          <div className="lg:col-span-7 p-6 overflow-hidden">
            <div className="flex items-baseline justify-between border-b border-ink-black pb-2 mb-5">
              <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
                ── CRONOGRAMA · 32 SEMANAS · 2 SEMESTRES
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-grey-500">
                UNAB · 2026-I / 2026-II
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={selectedObj}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="font-nh text-[14px] leading-[1.5] text-ink-black mb-5"
                style={{ maxWidth: '60ch' }}
              >
                <span className="font-condensed text-[11px] tracking-[0.2em] uppercase mr-2">
                  OBJ {String(selectedObj).padStart(2, '0')} →
                </span>
                {selectedObjData.deliverable}
              </motion.p>
            </AnimatePresence>

            <ObjectiveGantt
              selectedObj={selectedObj}
              onHoverTask={() => {}}
              onSelectObj={selectObj}
            />

            {/* bottom strip · 3 stat blocks */}
            <div className="mt-7 border border-ink-black grid grid-cols-3 divide-x divide-ink-black">
              {[
                { num: '06', label: 'FASES CRISP-DM' },
                { num: '32', label: 'SEMANAS' },
                { num: '04', label: 'ENTREGABLES' },
              ].map((m) => (
                <div key={m.label} className="p-4">
                  <span className="font-display text-ink-black leading-none block tabular-nums" style={{ fontSize: 56, letterSpacing: 0 }}>
                    {m.num}
                  </span>
                  <span className="font-condensed text-[10px] tracking-[0.2em] uppercase text-ink-black block mt-2">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRÓXIMOS HITOS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 card-dark p-6"
        >
          <span className="font-condensed text-[11px] tracking-[0.2em] uppercase text-canvas-white block">
            ── PRÓXIMOS HITOS · 2026
          </span>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-canvas-white/40">
            {[
              {
                sem: 'SEM 16',
                title: 'Sustentación anteproyecto',
                detail: 'Cierre 2026-I · jurado UNAB · entrega documento anteproyecto.',
              },
              {
                sem: 'SEM 24',
                title: 'Evaluación SSL · F5',
                detail: 'Cierre Obj 3 · métricas vs baseline supervisado · matrices de confusión.',
              },
              {
                sem: 'SEM 32',
                title: 'Sustentación final',
                detail: 'Cierre Obj 4 · prototipo TRL 4 · documento final + defensa.',
              },
            ].map((h, i) => (
              <div key={h.sem} className={cn('px-4 py-3', i === 0 ? 'md:pl-0' : '', i === 2 ? 'md:pr-0' : '')}>
                <span className="font-condensed text-[10px] tracking-[0.25em] uppercase text-canvas-white/70 block">
                  {h.sem}
                </span>
                <p
                  className="font-display text-canvas-white mt-2 leading-none"
                  style={{ fontSize: 32, letterSpacing: 0 }}
                >
                  {h.title}
                </p>
                <p className="mt-3 font-nh font-light text-[13px] leading-[1.45] text-canvas-white/85" style={{ maxWidth: '32ch' }}>
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* footer kbd hints */}
        <div className="mt-8 flex items-center gap-3 flex-wrap">
          <span className="kbd">1</span>
          <span className="kbd">2</span>
          <span className="kbd">3</span>
          <span className="kbd">4</span>
          <span className="kbd">5</span>
          <span className="kbd">6</span>
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black ml-2">
            seleccionar fase CRISP-DM
          </span>
        </div>
      </div>
    </div>
  );
}
