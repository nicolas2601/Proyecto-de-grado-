import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { crispPhases, ganttPhases, TOTAL_WEEKS } from '@/data/eda';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const CURRENT_WEEK = 14;
const SEM_BOUNDARY = 16;
const ACTIVE_PHASE_DEFAULT = 3;
const DONE_UP_TO = 2;

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
    label: 'Análisis de datasets',
    phases: [1, 2, 3],
    status: 'done',
    deliverable: 'EDA cruzado · 3 datasets · 13 figuras · ranking 9 lesiones',
    shortDeliverable: 'EDA cruzado',
  },
  {
    n: 2,
    label: 'Diseño algoritmo SSL',
    phases: [4],
    status: 'active',
    deliverable: 'SimCLR / BYOL / DINO / MAE · ResNet-50 vs ViT-B/16',
    shortDeliverable: 'Modelado SSL',
  },
  {
    n: 3,
    label: 'Evaluación de desempeño',
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

const PHASE_META: Record<number, { short: string; oneLiner: string }> = {
  1: { short: 'BU', oneLiner: 'Comprender el problema clínico y los objetivos.' },
  2: { short: 'DU', oneLiner: 'EDA cruzado · HAM, BCN y CO2Wounds.' },
  3: { short: 'DP', oneLiner: 'Normalización, augmentations y partición train/val.' },
  4: { short: 'MOD', oneLiner: 'Entrenar SSL contrastivo sobre el núcleo HAM+BCN.' },
  5: { short: 'EV', oneLiner: 'Métricas vs baseline supervisado equivalente.' },
  6: { short: 'DEP', oneLiner: 'Prototipo TRL 4 con interfaz de carga de imagen.' },
};

// ─────────────────────────────────────────────────────────────────────
// CRISP wheel — Dayos paper aesthetic
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
  const rOuter = 162;
  const rInner = 82;
  const n = crispPhases.length;

  const INK = '#000000';
  const GREY = '#979797';
  const PAPER = '#ffffff';
  const ACCENT = '#d1ffca';

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <svg viewBox="0 0 360 360" className="w-full h-auto">
        <defs>
          {crispPhases.map((p) => (
            <pattern
              key={p.n}
              id={`hatch-${p.n}`}
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke={ACCENT} strokeWidth="2" />
            </pattern>
          ))}
        </defs>

        {/* outer hairline */}
        <circle cx={cx} cy={cy} r={rOuter + 6} fill="none" stroke={INK} strokeOpacity="0.08" strokeWidth={1} />

        {crispPhases.map((p, i) => {
          const gap = 0.012;
          const startAngle = (i / n) * 2 * Math.PI - Math.PI / 2 + gap;
          const endAngle = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2 - gap;
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

          let fill = PAPER;
          let textColor = INK;
          let stroke = 'rgba(0,0,0,0.08)';
          let dash: string | undefined;
          let showHatch = false;

          if (isDone) {
            fill = INK;
            textColor = PAPER;
            stroke = INK;
          } else if (isActive) {
            fill = PAPER;
            textColor = INK;
            stroke = INK;
            showHatch = true;
          } else {
            fill = PAPER;
            textColor = GREY;
            stroke = GREY;
            dash = '3 4';
          }

          const sectorPath = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 0 0 ${xi1} ${yi1} Z`;

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
              <path
                d={sectorPath}
                fill={fill}
                stroke={stroke}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={dash}
              />
              {showHatch && <path d={sectorPath} fill={`url(#hatch-${phaseNumber})`} opacity={0.55} />}
              {isHighlighted && !isActive && !isDone && (
                <path d={sectorPath} fill="none" stroke={INK} strokeWidth={1.5} />
              )}

              <text
                x={lx}
                y={ly - 2}
                fontSize="24"
                textAnchor="middle"
                fontFamily="Bebas Neue, Impact, sans-serif"
                fontWeight={400}
                fill={textColor}
                style={{ pointerEvents: 'none' }}
              >
                {String(phaseNumber).padStart(2, '0')}
              </text>
              <text
                x={lx}
                y={ly + 14}
                fontSize="8"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight={400}
                fill={textColor}
                style={{
                  pointerEvents: 'none',
                  letterSpacing: '1.6px',
                  textTransform: 'uppercase',
                }}
              >
                {PHASE_META[phaseNumber].short}
              </text>
            </motion.g>
          );
        })}

        {/* Hub */}
        <circle cx={cx} cy={cy} r={rInner - 6} fill={PAPER} stroke="rgba(0,0,0,0.06)" strokeWidth={1} />

        <text
          x={cx}
          y={cy - 26}
          fontSize="9"
          textAnchor="middle"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight={400}
          fill={GREY}
          style={{ letterSpacing: '1.6px', textTransform: 'uppercase' }}
        >
          fase {String(active).padStart(2, '0')}
        </text>

        <text
          x={cx}
          y={cy + 2}
          fontSize="32"
          textAnchor="middle"
          fontFamily="Bebas Neue, Impact, sans-serif"
          fontWeight={400}
          fill={INK}
          style={{ letterSpacing: 0 }}
        >
          {PHASE_META[active].short}
        </text>

        {(() => {
          const txt = PHASE_META[active].oneLiner;
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
                y={cy + 24}
                fontSize="8"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={400}
                fill={INK}
              >
                {lines[0]}
              </text>
              <text
                x={cx}
                y={cy + 36}
                fontSize="8"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontWeight={400}
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
// Gantt — Dayos paper aesthetic
// ─────────────────────────────────────────────────────────────────────
function ObjectiveGantt({
  selectedObj,
  onSelectObj,
}: {
  selectedObj: number;
  onSelectObj: (n: number) => void;
}) {
  const [tip, setTip] = useState<number | null>(null);

  const taskToObj = useMemo<number[]>(() => [1, 1, 1, 1, 2, 3, 4, 4], []);

  const tickWeeks = [1, 4, 8, 12, 16, 20, 24, 28, 32];

  const lanes = [1, 2, 3, 4];

  return (
    <div className="relative">
      {/* week ticks */}
      <div className="grid grid-cols-[100px_1fr] gap-x-3 mb-2">
        <div />
        <div className="relative h-5">
          {tickWeeks.map((w) => (
            <div
              key={w}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${(w / TOTAL_WEEKS) * 100}%` }}
            >
              <span
                className="font-mono tabular-nums"
                style={{ fontSize: '10px', letterSpacing: '0.04em', color: 'var(--color-ash-gray)' }}
              >
                S{String(w).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AHORA pill */}
      <div className="grid grid-cols-[100px_1fr] gap-x-3 mb-3">
        <div />
        <div className="relative h-7">
          <div
            className="absolute top-0"
            style={{
              left: `${(CURRENT_WEEK / TOTAL_WEEKS) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span
              className="pill-ink"
              style={{
                padding: '4px 10px',
                fontSize: '10px',
                whiteSpace: 'nowrap',
                letterSpacing: '0.06em',
              }}
            >
              <span className="pulse-dot" />
              <span className="font-mono">AHORA · SEM 14</span>
            </span>
          </div>
          <div
            className="absolute top-1.5"
            style={{
              left: `${(SEM_BOUNDARY / TOTAL_WEEKS) * 100}%`,
              transform: 'translateX(0)',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '9px',
                color: 'var(--color-ash-gray)',
                letterSpacing: '0.06em',
                paddingLeft: 6,
                whiteSpace: 'nowrap',
              }}
            >
              · 2026-II
            </span>
          </div>
        </div>
      </div>

      {/* lanes */}
      <div
        style={{
          background: 'var(--color-paper-white)',
          borderRadius: 'var(--radius-card)',
          padding: '12px',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        {lanes.map((objN, laneIdx) => {
          const obj = OBJECTIVES.find((o) => o.n === objN)!;
          const isSelected = selectedObj === objN;

          return (
            <div
              key={objN}
              className={cn(
                'grid grid-cols-[100px_1fr] gap-x-3 cursor-pointer transition-colors',
              )}
              style={{
                borderTop: laneIdx === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                background: isSelected ? 'var(--color-faint-mist)' : 'transparent',
                borderRadius: laneIdx === 0 ? '20px 20px 0 0' : laneIdx === lanes.length - 1 ? '0 0 20px 20px' : 0,
              }}
              onClick={() => onSelectObj(objN)}
            >
              {/* lane label */}
              <div
                className="flex flex-col justify-center"
                style={{ padding: '14px 12px' }}
              >
                <span
                  className="font-mono tabular-nums"
                  style={{ fontSize: '10px', color: 'var(--color-ash-gray)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  OBJ · {String(objN).padStart(2, '0')}
                </span>
                <span
                  className="font-suisse"
                  style={{
                    fontSize: '12px',
                    lineHeight: 1.25,
                    color: 'var(--color-midnight-ink)',
                    fontWeight: 500,
                    marginTop: 4,
                    letterSpacing: '-0.42px',
                  }}
                >
                  {obj.shortDeliverable}
                </span>
                <span
                  className={cn('mt-2 inline-flex items-center w-fit')}
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-suisseintlmono)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background:
                      obj.status === 'done'
                        ? 'var(--color-action-green)'
                        : obj.status === 'active'
                        ? 'var(--color-midnight-ink)'
                        : 'transparent',
                    color:
                      obj.status === 'done'
                        ? 'var(--color-midnight-ink)'
                        : obj.status === 'active'
                        ? 'var(--color-paper-white)'
                        : 'var(--color-fog-gray)',
                    border: obj.status === 'next' ? '1px solid var(--color-fog-gray)' : 'none',
                  }}
                >
                  {obj.status === 'done' ? 'DONE' : obj.status === 'active' ? 'ACTIVE' : 'NEXT'}
                </span>
              </div>

              {/* bars row */}
              <div className="relative h-[64px]" style={{ padding: '6px 0' }}>
                {/* semester boundary */}
                <div
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px"
                  style={{ background: 'rgba(0,0,0,0.08)', left: `${(SEM_BOUNDARY / TOTAL_WEEKS) * 100}%` }}
                />
                {/* now line */}
                <div
                  aria-hidden
                  className="absolute -top-1 -bottom-1 w-px pointer-events-none z-10"
                  style={{ background: 'var(--color-midnight-ink)', left: `${(CURRENT_WEEK / TOTAL_WEEKS) * 100}%` }}
                />

                {ganttPhases.map((g, i) => {
                  if (taskToObj[i] !== objN) return null;
                  const widthPct = (g.span / TOTAL_WEEKS) * 100;
                  const leftPct = (g.start / TOTAL_WEEKS) * 100;

                  const isDone = g.status === 'done';
                  const isActive = g.status === 'active';

                  return (
                    <motion.div
                      key={g.phase}
                      initial={{ opacity: 0, scaleX: 0.7 }}
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
                        top: '18px',
                        transformOrigin: 'left center',
                        height: 28,
                        background: isDone
                          ? 'var(--color-midnight-ink)'
                          : isActive
                          ? 'var(--color-paper-white)'
                          : 'transparent',
                        border: isDone
                          ? '1px solid var(--color-midnight-ink)'
                          : isActive
                          ? '1px solid var(--color-midnight-ink)'
                          : '1px dashed var(--color-fog-gray)',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                      className="absolute"
                      onMouseEnter={() => setTip(i)}
                      onMouseLeave={() => setTip(null)}
                    >
                      {isActive && (
                        <div
                          aria-hidden
                          className="absolute inset-0 pointer-events-none hatch-green opacity-60"
                          style={{ borderRadius: 999 }}
                        />
                      )}
                      <span
                        className="absolute inset-0 flex items-center px-3 font-suisse truncate"
                        style={{
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '-0.42px',
                          color: isDone ? 'var(--color-paper-white)' : 'var(--color-midnight-ink)',
                        }}
                      >
                        {g.phase.replace(/^Objetivo \d+ · /, '').replace(/^Objetivo \d+/, '')}
                      </span>

                      {tip === i && (
                        <div
                          className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                          style={{
                            background: 'var(--color-midnight-ink)',
                            color: 'var(--color-paper-white)',
                            padding: '6px 12px',
                            borderRadius: 12,
                            fontFamily: 'var(--font-suisseintlmono)',
                            fontSize: '11px',
                            letterSpacing: '-0.36px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {g.phase} · {g.span} sem
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
      <div
        className="mt-5 flex flex-wrap items-center gap-5"
        style={{ fontSize: '11px', color: 'var(--color-ash-gray)', fontFamily: 'var(--font-suisseintlmono)', letterSpacing: '0.06em' }}
      >
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block"
            style={{ height: 12, width: 22, background: 'var(--color-midnight-ink)', borderRadius: 999 }}
          />
          done
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block relative overflow-hidden"
            style={{
              height: 12,
              width: 22,
              border: '1px solid var(--color-midnight-ink)',
              borderRadius: 999,
              background: 'var(--color-paper-white)',
            }}
          >
            <span aria-hidden className="absolute inset-0 hatch-green opacity-60" />
          </span>
          active
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block"
            style={{
              height: 12,
              width: 22,
              border: '1px dashed var(--color-fog-gray)',
              borderRadius: 999,
            }}
          />
          pending
        </span>
        <span className="inline-flex items-center gap-2 ml-auto">
          <span
            className="inline-block"
            style={{ height: 14, width: 2, background: 'var(--color-midnight-ink)' }}
          />
          now · sem 14
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Slide
// ─────────────────────────────────────────────────────────────────────
export default function Slide05Methodology() {
  const [activePhase, setActivePhase] = useState<number>(ACTIVE_PHASE_DEFAULT);
  const [selectedObj, setSelectedObj] = useState<number>(2);

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

  function selectObj(n: number) {
    setSelectedObj(n);
    const obj = OBJECTIVES.find((o) => o.n === n);
    if (obj) setActivePhase(obj.phases[0]);
  }

  function selectPhase(p: number) {
    setActivePhase(p);
    const obj = OBJECTIVES.find((o) => o.phases.includes(p));
    if (obj) setSelectedObj(obj.n);
  }

  const selectedObjData = OBJECTIVES.find((o) => o.n === selectedObj)!;
  const highlightPhases = selectedObjData.phases;

  return (
    <div
      className="slide relative w-full overflow-hidden"
      style={{ background: 'var(--color-canvas-ice)', minHeight: '100dvh' }}
    >
      <div className="slide-narrow relative">
        {/* ── header ───────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-6 flex-wrap">
          <span className="eyebrow-up">05 · METODOLOGÍA · CRISP-DM</span>
          <span className="pill-accent">
            <span className="pulse-dot" />
            <span className="font-mono">Sprint F3 · Sem 14</span>
          </span>
        </header>

        {/* ── headline ─────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="font-display"
          style={{
            marginTop: 56,
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.92,
            color: 'var(--color-midnight-ink)',
            maxWidth: '20ch',
          }}
        >
          Seis fases canónicas.
          <br />
          Cuatro entregables.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="font-suisse"
          style={{
            marginTop: 24,
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            lineHeight: 1.45,
            letterSpacing: '-0.42px',
            color: 'var(--color-ash-gray)',
            maxWidth: '60ch',
          }}
        >
          CRISP-DM 1.0 (Wirth &amp; Hipp, 2000) adaptado a 4 objetivos académicos
          de la Universidad Autónoma de Bucaramanga.
        </motion.p>

        {/* ── main grid · 7 + 5 ─────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          style={{ marginTop: 64 }}
        >
          {/* LEFT · wheel + objectives list */}
          <div className="lg:col-span-7">
            <div className="card">
              <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
                <span className="eyebrow-up">── CRISP-DM · 6 FASES</span>
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
                >
                  click / 1–6
                </span>
              </div>

              <InteractiveCrispWheel
                active={activePhase}
                onSelect={selectPhase}
                highlightPhases={highlightPhases}
              />

              <div style={{ marginTop: 32 }}>
                <span className="eyebrow-up block mb-3">── 4 OBJETIVOS · MAPEO A FASES</span>

                <ul
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {OBJECTIVES.map((o, i) => {
                    const isSelected = selectedObj === o.n;
                    return (
                      <motion.li
                        key={o.n}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease: EASE }}
                        className="hover-reveal cursor-pointer transition-colors"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '40px 1fr auto',
                          gap: 16,
                          alignItems: 'center',
                          padding: '14px 8px',
                          borderBottom: '1px solid rgba(0,0,0,0.06)',
                          background: isSelected ? 'var(--color-faint-mist)' : 'transparent',
                          borderRadius: 12,
                        }}
                        onClick={() => selectObj(o.n)}
                      >
                        <span
                          className="font-display tabular-nums shrink-0"
                          style={{ fontSize: '24px', lineHeight: 0.88, color: 'var(--color-midnight-ink)' }}
                        >
                          {String(o.n).padStart(2, '0')}
                        </span>

                        <div className="min-w-0">
                          <p
                            className="font-suisse"
                            style={{
                              fontSize: '15px',
                              fontWeight: 500,
                              lineHeight: 1.25,
                              letterSpacing: '-0.42px',
                              color: 'var(--color-midnight-ink)',
                            }}
                          >
                            {o.label}
                          </p>
                          <p
                            data-hide
                            className="font-mono"
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-ash-gray)',
                              letterSpacing: '0.04em',
                              marginTop: 4,
                            }}
                          >
                            OBJ · {String(o.n).padStart(2, '0')} → {o.phases.map((p) => `F${p} · ${PHASE_META[p].short}`).join(' · ')}
                          </p>
                          <p
                            data-reveal
                            className="font-suisse"
                            style={{
                              fontSize: '12px',
                              color: 'var(--color-midnight-ink)',
                              lineHeight: 1.4,
                              letterSpacing: '-0.42px',
                              marginTop: 4,
                              position: 'absolute',
                              left: 64,
                              right: 110,
                            }}
                          >
                            → {o.deliverable}
                          </p>
                        </div>

                        <span
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-suisseintlmono)',
                            padding: '4px 10px',
                            borderRadius: 9999,
                            background:
                              o.status === 'done'
                                ? 'var(--color-action-green)'
                                : o.status === 'active'
                                ? 'var(--color-midnight-ink)'
                                : 'transparent',
                            color:
                              o.status === 'done'
                                ? 'var(--color-midnight-ink)'
                                : o.status === 'active'
                                ? 'var(--color-paper-white)'
                                : 'var(--color-fog-gray)',
                            border: o.status === 'next' ? '1px solid var(--color-fog-gray)' : 'none',
                          }}
                        >
                          {o.status === 'done' ? 'DONE' : o.status === 'active' ? 'ACTIVE' : 'NEXT'}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT · Gantt */}
          <div className="lg:col-span-5">
            <div className="card" style={{ height: '100%' }}>
              <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
                <span className="eyebrow-up">── CRONOGRAMA · 32 SEMANAS</span>
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
                >
                  2026-I / 2026-II
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedObj}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="font-suisse"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    letterSpacing: '-0.42px',
                    color: 'var(--color-midnight-ink)',
                    marginBottom: 24,
                    maxWidth: '52ch',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ash-gray)',
                      marginRight: 8,
                    }}
                  >
                    OBJ · {String(selectedObj).padStart(2, '0')} →
                  </span>
                  {selectedObjData.deliverable}
                </motion.p>
              </AnimatePresence>

              <ObjectiveGantt selectedObj={selectedObj} onSelectObj={selectObj} />

              {/* bottom stat row */}
              <div
                className="grid grid-cols-3"
                style={{
                  marginTop: 24,
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  paddingTop: 16,
                }}
              >
                {[
                  { num: '06', label: 'Fases CRISP-DM' },
                  { num: '32', label: 'Semanas' },
                  { num: '04', label: 'Entregables' },
                ].map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      padding: '8px 16px',
                      borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <span
                      className="font-display tabular-nums block"
                      style={{ fontSize: '56px', lineHeight: 0.88, color: 'var(--color-midnight-ink)' }}
                    >
                      {m.num}
                    </span>
                    <span
                      className="font-mono uppercase block"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                        color: 'var(--color-ash-gray)',
                        marginTop: 8,
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PRÓXIMOS HITOS · banda card-accent ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="card-accent"
          style={{ marginTop: 40 }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
            <span className="eyebrow-up">── PRÓXIMOS HITOS · 2026</span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
            >
              3 milestones · 18 semanas restantes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                sem: 'SEM 16',
                title: 'Sustentación anteproyecto',
                detail: 'Cierre 2026-I · jurado UNAB · entrega documento anteproyecto.',
              },
              {
                sem: 'SEM 24',
                title: 'Evaluación SSL · F3',
                detail: 'Cierre OBJ-03 · métricas vs baseline supervisado · matrices de confusión.',
              },
              {
                sem: 'SEM 32',
                title: 'Sustentación final',
                detail: 'Cierre OBJ-04 · prototipo TRL 4 · documento final + defensa.',
              },
            ].map((h, i) => (
              <div
                key={h.sem}
                style={{
                  padding: i === 0 ? '0 24px 0 0' : i === 2 ? '0 0 0 24px' : '0 24px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.12)',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ash-gray)',
                  }}
                >
                  {h.sem}
                </span>
                <p
                  className="font-display"
                  style={{ fontSize: '36px', lineHeight: 0.92, color: 'var(--color-midnight-ink)', marginTop: 12 }}
                >
                  {h.title}
                </p>
                <p
                  className="font-suisse"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.45,
                    letterSpacing: '-0.42px',
                    color: 'var(--color-midnight-ink)',
                    marginTop: 12,
                    maxWidth: '32ch',
                  }}
                >
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── footer ──────────────────────────────────────────── */}
        <footer
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="kbd">1</span>
            <span className="kbd">2</span>
            <span className="kbd">3</span>
            <span className="kbd">4</span>
            <span className="kbd">5</span>
            <span className="kbd">6</span>
            <span className="eyebrow-up" style={{ marginLeft: 8 }}>
              seleccionar fase de la rueda
            </span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
          >
            06 / 09 · CRISP-DM · UNAB
          </span>
        </footer>
      </div>
    </div>
  );
}
