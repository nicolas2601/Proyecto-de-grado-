import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ham10000,
  bcn20000,
  co2wounds,
  ssLRanking,
  biasMatrix,
} from '@/data/eda';
import HamClassChart from '@/components/charts/HamClassChart';
import BcnDonutChart from '@/components/charts/BcnDonutChart';
import DatasetCompareChart from '@/components/charts/DatasetCompareChart';
import CoverageMatrix from '@/components/charts/CoverageMatrix';
import BiasMatrix from '@/components/charts/BiasMatrix';
import CountUp from '@/components/reactbits/CountUp';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────
// HERO METRICS · full-width 3 cells
// ─────────────────────────────────────────────────────────────────────
function HeroMetricCell({
  value,
  unit,
  label,
  divider,
  delay = 0,
}: {
  value: number;
  unit?: string;
  label: string;
  divider?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      viewport={{ once: true }}
      className="p-6 md:p-8"
      style={{ borderLeft: divider ? '1px solid #292929' : 'none' }}
    >
      <p
        className="font-display text-ink-black tabular-nums leading-[0.85] number-rise"
        style={{ fontSize: 'clamp(72px, 11vw, 120px)', letterSpacing: '-0.02em' }}
      >
        <CountUp value={value} duration={1.6} />
        {unit && (
          <span
            className="font-condensed align-middle ml-3 text-ink-black"
            style={{ fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {unit}
          </span>
        )}
      </p>
      <span
        aria-hidden
        className="block my-4 h-px w-12 bg-ink-black"
      />
      <p
        className="font-condensed text-ink-black"
        style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase' }}
      >
        {label}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCROLLYTELLING · 5 sticky story steps
// ─────────────────────────────────────────────────────────────────────
type StoryStep = {
  id: string;
  eyebrow: string;
  display: string;
  displaySub?: string;
  body: string;
  visualKey: 'ham' | 'ham-focus' | 'bcn' | 'co2' | 'core';
};

const STORY: StoryStep[] = [
  {
    id: 's1',
    eyebrow: 'STEP 01 · HAM10000',
    display: 'HAM10000',
    displaySub: '10.015 imágenes · 7 clases',
    body:
      'Publicado por Tschandl, Rosendahl y Kittler (2018) en Scientific Data. Dermatoscopia estandarizada, 7 clases clínicas, base de prácticamente todo paper de SSL en lesiones cutáneas en los últimos 5 años.',
    visualKey: 'ham',
  },
  {
    id: 's2',
    eyebrow: 'STEP 02 · SESGO CRÍTICO',
    display: '67 %',
    displaySub: 'nevus melanocítico',
    body:
      'Nevus domina HAM. SSL contrastivo necesita esta clase anchor masiva, pero el desbalance se ataca con focal loss y muestreo balanceado durante la fase de modelado.',
    visualKey: 'ham-focus',
  },
  {
    id: 's3',
    eyebrow: 'STEP 03 · BCN20000',
    display: 'BCN20000',
    displaySub: '18.946 imágenes · binario',
    body:
      'Hospital Clínic Barcelona (2025). Etiquetado binario benigno/maligno cercano a 50/50 · compensa el desbalance nevus de HAM y aporta resolución mediana 1024×1024.',
    visualKey: 'bcn',
  },
  {
    id: 's4',
    eyebrow: 'STEP 04 · CO2WOUNDS-V2',
    display: '96 PACIENTES',
    displaySub: 'Santander · cohorte regional',
    body:
      'Cohorte Sánchez et al. 2024 · capturada con celular en Contratación (Santander). Ancla regional invaluable, distribución de dominio distinta al núcleo dermatoscópico. Entra como trabajo futuro de transferencia de dominio.',
    visualKey: 'co2',
  },
  {
    id: 's5',
    eyebrow: 'STEP 05 · DECISIÓN NÚCLEO',
    display: 'HAM + BCN',
    displaySub: '28.961 imágenes combinadas',
    body:
      'Suficiente para preentrenamiento autosupervisado contrastivo. SimCLR, BYOL, DINO y MAE evaluados sobre ResNet-50 y ViT-B/16 · fase 04 del ciclo CRISP-DM.',
    visualKey: 'core',
  },
];

function StoryVisual({ visualKey }: { visualKey: StoryStep['visualKey'] }) {
  // single visual swap per active step · ALL branches return a width:100% wrapper
  // so ResponsiveContainer (recharts) gets a measurable parent box on mount
  switch (visualKey) {
    case 'ham':
    case 'ham-focus':
      return (
        <div
          className={cn('relative w-full', visualKey === 'ham-focus' && 'is-focus')}
          style={{ width: '100%', minHeight: 260 }}
        >
          <HamClassChart />
          {visualKey === 'ham-focus' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute top-1 right-1 border border-ink-black bg-canvas-white px-2 py-1 pointer-events-none"
            >
              <span className="font-condensed text-[9px] tracking-[0.2em] uppercase text-ink-black">
                NEVUS · 67%
              </span>
            </motion.div>
          )}
        </div>
      );
    case 'bcn':
      return (
        <div className="w-full" style={{ width: '100%', minHeight: 320 }}>
          <BcnDonutChart />
        </div>
      );
    case 'co2':
      return (
        <div
          className="border border-ink-black p-6 bg-canvas-white w-full"
          style={{ width: '100%' }}
        >
          <span
            className="font-condensed text-ink-black block"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            ── DATA SHEET · CO2WOUNDS-V2
          </span>
          <p
            className="font-display text-ink-black mt-3 leading-none"
            style={{ fontSize: 40, letterSpacing: 0 }}
          >
            {co2wounds.name}
          </p>
          <p className="font-mono text-[11px] text-grey-500 mt-2">{co2wounds.source}</p>

          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2.5">
            {[
              ['SIZE', `${co2wounds.size} img`],
              ['PACIENTES', String(co2wounds.patients)],
              ['SITIO', co2wounds.site.split(',')[0]],
              ['CAPTURA', co2wounds.capture],
              ['mIoU', `${co2wounds.mIoU} %`],
              ['F1 MACRO', `${co2wounds.f1} %`],
              ['TAREA', co2wounds.task],
              ['LICENCIA', co2wounds.license],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-3 pb-1.5"
                style={{ borderBottom: '1px solid #e6e6e6' }}
              >
                <dt
                  className="font-condensed text-ink-black"
                  style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {k}
                </dt>
                <dd className="font-mono text-ink-black text-[12px] font-medium text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 pt-4 border-t border-ink-black">
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ── NOTA
            </span>
            <p className="mt-2 font-nh text-[12.5px] leading-snug text-ink-black">
              {co2wounds.highlight}.
            </p>
          </div>
        </div>
      );
    case 'core':
      return (
        <div className="w-full" style={{ width: '100%', minHeight: 260 }}>
          <DatasetCompareChart />
        </div>
      );
  }
}

function Scrollytelling() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // honor prefers-reduced-motion · falls back to stacked layout
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // skip observer when stacked layout is used
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepsRef.current.findIndex((el) => el === entry.target);
            if (idx >= 0) setActiveStep(idx);
          }
        });
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    );

    stepsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reducedMotion]);

  // reduced-motion fallback · stacked, no sticky, no IO, no AnimatePresence
  if (reducedMotion) {
    return (
      <div className="mt-20 border-y border-ink-black">
        <div className="p-6 space-y-10">
          {STORY.map((step, i) => (
            <div key={step.id} className="border border-ink-black p-6">
              <span
                className="font-condensed text-ink-black block"
                style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                STEP {String(i + 1).padStart(2, '0')} · {step.eyebrow.replace(/^STEP \d+ · /, '')}
              </span>
              <h3
                className="font-display text-ink-black mt-4 leading-[0.92]"
                style={{ fontSize: 'clamp(48px, 6vw, 72px)', letterSpacing: '-0.01em' }}
              >
                {step.display}
              </h3>
              {step.displaySub && (
                <p
                  className="font-condensed text-ink-black mt-3"
                  style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {step.displaySub}
                </p>
              )}
              <p
                className="mt-5 font-nh font-light text-ink-black"
                style={{ fontSize: 18, lineHeight: 1.45, maxWidth: '60ch' }}
              >
                {step.body}
              </p>
              <div className="mt-6">
                <StoryVisual visualKey={step.visualKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 border-y border-ink-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT · story column */}
        <div className="lg:col-span-7 lg:border-r border-ink-black">
          {/* stepper rail + content */}
          <div className="relative">
            {/* vertical line */}
            <div
              aria-hidden
              className="absolute left-6 top-0 bottom-0 w-px bg-ink-black hidden lg:block"
            />

            {STORY.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="min-h-[80vh] flex items-center px-6 lg:pl-16 lg:pr-10 py-12 relative"
                >
                  {/* stepper dot · only on lg */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center">
                    <div
                      className={cn(
                        'h-12 w-12 border flex items-center justify-center bg-canvas-white transition-colors',
                        isActive ? 'border-ink-black bg-ink-black' : 'border-grey-300',
                      )}
                    >
                      <span
                        className={cn(
                          'font-display tabular-nums leading-none',
                          isActive ? 'text-canvas-white' : 'text-grey-500',
                        )}
                        style={{ fontSize: 22, letterSpacing: 0 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="w-full max-w-xl">
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="font-condensed text-ink-black block"
                      style={{
                        fontSize: 13,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step.eyebrow}
                    </motion.span>

                    <motion.h3
                      animate={{ opacity: isActive ? 1 : 0.25, y: isActive ? 0 : 4 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="font-display text-ink-black mt-4 leading-[0.92]"
                      style={{
                        fontSize: 'clamp(56px, 7vw, 96px)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.display}
                    </motion.h3>

                    {step.displaySub && (
                      <motion.p
                        animate={{ opacity: isActive ? 1 : 0.3 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                        className="font-condensed text-ink-black mt-3"
                        style={{
                          fontSize: 14,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {step.displaySub}
                      </motion.p>
                    )}

                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                      className="mt-6 font-nh font-light text-ink-black"
                      style={{ fontSize: 22, lineHeight: 1.45, maxWidth: '60ch' }}
                    >
                      {step.body}
                    </motion.p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT · sticky visual */}
        <div className="lg:col-span-5 hidden lg:block">
          <div
            className="scrolly-stick p-8 h-screen flex flex-col"
            style={{ minHeight: '100vh' }}
          >
            <div className="flex items-baseline justify-between border-b border-ink-black pb-2 mb-5">
              <span
                className="font-condensed text-ink-black"
                style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                ── VISUAL · STEP {String(activeStep + 1).padStart(2, '0')} / 05
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-grey-500">
                {STORY[activeStep].id.toUpperCase()}
              </span>
            </div>

            <div
              className="flex-1 flex items-center w-full"
              style={{ minHeight: '60vh' }}
            >
              <div className="w-full" style={{ minHeight: 320 }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={STORY[activeStep].visualKey}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="w-full"
                    style={{ width: '100%' }}
                  >
                    <StoryVisual visualKey={STORY[activeStep].visualKey} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* horizontal step ticker */}
            <div className="mt-6 grid grid-cols-5 gap-1">
              {STORY.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-px transition-colors',
                    i <= activeStep ? 'bg-ink-black' : 'bg-grey-300',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* mobile fallback · show all visuals stacked */}
        <div className="lg:hidden border-t border-ink-black p-6 space-y-8">
          {STORY.map((step, i) => (
            <div key={step.id} className="border border-ink-black p-5">
              <span
                className="font-condensed text-ink-black block"
                style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                STEP {String(i + 1).padStart(2, '0')}
              </span>
              <StoryVisual visualKey={step.visualKey} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// COMPARATOR · drag slider between HAM and BCN
// ─────────────────────────────────────────────────────────────────────
function Comparator() {
  const [pos, setPos] = useState(50); // 0..100, 50 = balanced
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onPointerMove = (clientX: number) => {
    const t = trackRef.current;
    if (!t) return;
    const rect = t.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPos((x / rect.width) * 100);
  };

  useEffect(() => {
    function up() {
      isDragging.current = false;
    }
    function move(e: MouseEvent) {
      if (isDragging.current) onPointerMove(e.clientX);
    }
    function touchMove(e: TouchEvent) {
      if (isDragging.current && e.touches[0]) onPointerMove(e.touches[0].clientX);
    }
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchend', up);
    window.addEventListener('touchmove', touchMove);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchend', up);
      window.removeEventListener('touchmove', touchMove);
    };
  }, []);

  // 0..100 · leftPct increases → HAM emphasized, BCN dim
  const hamOpacity = Math.max(0.3, pos / 100);
  const bcnOpacity = Math.max(0.3, 1 - pos / 100);

  return (
    <div className="mt-20 border border-ink-black">
      <div className="flex items-baseline justify-between border-b border-ink-black p-4">
        <span
          className="font-condensed text-ink-black"
          style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          ── COMPARADOR HAM × BCN
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-grey-500">
          DRAG · HAM ← → BCN
        </span>
      </div>

      <div className="grid grid-cols-2 gap-0 divide-x divide-ink-black">
        <motion.div
          animate={{ opacity: hamOpacity }}
          transition={{ duration: 0.15 }}
          className="p-6"
        >
          <div className="flex items-baseline justify-between mb-4">
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              HAM10000 · 10.015 IMG
            </span>
            <span className="font-mono text-[10px] text-grey-500">
              {(pos).toFixed(0)}%
            </span>
          </div>
          <HamClassChart />
        </motion.div>

        <motion.div
          animate={{ opacity: bcnOpacity }}
          transition={{ duration: 0.15 }}
          className="p-6"
        >
          <div className="flex items-baseline justify-between mb-4">
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              BCN20000 · 18.946 IMG
            </span>
            <span className="font-mono text-[10px] text-grey-500">
              {(100 - pos).toFixed(0)}%
            </span>
          </div>
          <BcnDonutChart />
        </motion.div>
      </div>

      {/* slider track */}
      <div className="border-t border-ink-black p-6">
        <div
          ref={trackRef}
          className="relative h-9 select-none touch-none"
          onMouseDown={(e) => {
            isDragging.current = true;
            onPointerMove(e.clientX);
          }}
          onTouchStart={(e) => {
            isDragging.current = true;
            if (e.touches[0]) onPointerMove(e.touches[0].clientX);
          }}
        >
          {/* track */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink-black" />
          {/* ticks */}
          {[0, 25, 50, 75, 100].map((t) => (
            <div
              key={t}
              className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-ink-black"
              style={{ left: `${t}%` }}
            />
          ))}
          {/* handle */}
          <motion.div
            animate={{ left: `${pos}%` }}
            transition={{ duration: 0.05 }}
            className="absolute top-0 -translate-x-1/2 h-9 w-3 bg-ink-black cursor-ew-resize"
            style={{ left: `${pos}%` }}
          />
          {/* labels */}
          <span
            className="absolute -bottom-6 left-0 font-condensed text-ink-black"
            style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            HAM ◄
          </span>
          <span
            className="absolute -bottom-6 right-0 font-condensed text-ink-black"
            style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            ► BCN
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SORTABLE RANKING TABLE
// ─────────────────────────────────────────────────────────────────────
type SortKey = 'rank' | 'lesion' | 'priority' | 'category';
type SortDir = 'asc' | 'desc';

const PRIORITY_ORDER = { CRÍTICA: 0, ALTA: 1, MEDIA: 2, BAJA: 3 } as const;

function RankingTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function setSort(k: SortKey) {
    if (k === sortKey) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(k);
      setSortDir('asc');
    }
  }

  const sorted = useMemo(() => {
    const arr = [...ssLRanking];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'rank') cmp = a.rank - b.rank;
      else if (sortKey === 'lesion') cmp = a.lesion.localeCompare(b.lesion);
      else if (sortKey === 'priority') {
        cmp =
          (PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] ?? 99) -
          (PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] ?? 99);
      } else if (sortKey === 'category') cmp = a.category.localeCompare(b.category);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [sortKey, sortDir]);

  const headers: { key: SortKey; label: string; align: 'left' | 'right' }[] = [
    { key: 'rank', label: '#', align: 'left' },
    { key: 'lesion', label: 'LESIÓN', align: 'left' },
    { key: 'priority', label: 'PRIORIDAD', align: 'left' },
    { key: 'category', label: 'CATEGORÍA', align: 'left' },
  ];

  return (
    <div className="border border-ink-black">
      <div className="grid grid-cols-[48px_1fr_140px_140px] border-b border-ink-black bg-grey-50">
        {headers.map((h) => (
          <button
            key={h.key}
            onClick={() => setSort(h.key)}
            className={cn(
              'px-3 py-3 font-condensed text-ink-black text-left transition-colors hover:bg-grey-100',
              'flex items-center gap-1.5',
            )}
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            {h.label}
            <span
              className="font-mono text-[10px] text-ink-black"
              style={{ opacity: sortKey === h.key ? 1 : 0.25 }}
            >
              {sortKey === h.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
            </span>
          </button>
        ))}
      </div>

      <div>
        {sorted.map((r, i) => {
          const isCritical = r.priority === 'CRÍTICA';
          const isHigh = r.priority === 'ALTA';
          const isMedium = r.priority === 'MEDIA';

          return (
            <motion.div
              key={r.rank}
              layout
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.35, ease: EASE }}
              className={cn(
                'grid grid-cols-[48px_1fr_140px_140px] items-center transition-colors',
                isCritical && 'bg-ink-black text-canvas-white',
                !isCritical && i % 2 === 0 && 'bg-canvas-white',
                !isCritical && i % 2 === 1 && 'bg-grey-50',
              )}
              style={{ borderBottom: '1px solid #292929' }}
            >
              <div className="px-3 py-4">
                <span
                  className={cn(
                    'font-display tabular-nums leading-none',
                    isCritical ? 'text-canvas-white' : 'text-ink-black',
                  )}
                  style={{ fontSize: 28, letterSpacing: 0 }}
                >
                  {String(r.rank).padStart(2, '0')}
                </span>
              </div>
              <div className="px-3 py-4 min-w-0">
                <p
                  className={cn(
                    'font-nh text-[15px] font-medium leading-tight',
                    isCritical ? 'text-canvas-white' : 'text-ink-black',
                  )}
                >
                  {r.lesion}
                </p>
                <p
                  className={cn(
                    'font-nh text-[12px] leading-snug mt-1',
                    isCritical ? 'text-canvas-white/85' : 'text-ink-black/70',
                  )}
                >
                  {r.justification}
                </p>
              </div>
              <div className="px-3 py-4">
                <span
                  className={cn(
                    'font-condensed inline-flex items-center px-2.5 py-1 whitespace-nowrap',
                  )}
                  style={{
                    border: isCritical
                      ? '1px solid #ffffff'
                      : isHigh
                      ? '1px solid #292929'
                      : isMedium
                      ? '1px solid #646464'
                      : '1px dashed #b4b8b4',
                    background: isCritical ? '#ffffff' : 'transparent',
                    color: isCritical ? '#292929' : '#292929',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {r.priority}
                </span>
              </div>
              <div className="px-3 py-4">
                <span
                  className={cn(
                    'font-condensed',
                    isCritical ? 'text-canvas-white' : 'text-ink-black',
                  )}
                  style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {r.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// COVERAGE READ-OUT CARD
// ─────────────────────────────────────────────────────────────────────
function CoverageReadout() {
  const rows = [
    {
      head: '4 CRÍTICAS CUBIERTAS',
      detail: 'BCC, SCC, melanoma y queratosis seborreica están en HAM y BCN.',
    },
    {
      head: '6 SANTANDEREANAS AUSENTES',
      detail: 'Leishmaniasis, dermatitis atópica, acné, LRC, hidradenitis, maskné.',
    },
    {
      head: 'CO2WOUNDS · HERIDAS CRÓNICAS',
      detail: 'Cubre dominio fuera del dermatoscópico · trabajo futuro de transferencia.',
    },
  ];

  return (
    <ul>
      {rows.map((r, i, arr) => (
        <li
          key={i}
          className="hover-reveal flex items-start gap-3 py-3 cursor-default"
          style={{
            borderTop: '1px solid #292929',
            borderBottom: i === arr.length - 1 ? '1px solid #292929' : 'none',
          }}
        >
          <span
            aria-hidden
            className="block w-1.5 h-3 bg-ink-black mt-1.5 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p
              className="font-condensed text-ink-black"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              {r.head}
            </p>
            <p
              data-reveal=""
              className="mt-1 font-nh text-[12.5px] leading-snug text-ink-black"
            >
              {r.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SLIDE
// ─────────────────────────────────────────────────────────────────────
export default function Slide06EDA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const decisionWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="slide relative w-full bg-canvas-white" style={{ overflow: 'clip' }}>
      <div className="slide-narrow relative">
        {/* HEADER */}
        <div className="flex items-baseline justify-between border-b border-ink-black pb-3">
          <span className="eyebrow">06 · OBJETIVO 1 · ANÁLISIS EXPLORATORIO</span>
          <div className="flex items-center gap-3">
            <span className="pulse-dot" aria-hidden />
            <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
              13 FIGURAS · 3 DATASETS
            </span>
          </div>
        </div>

        {/* HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 font-nh font-light text-ink-black"
          style={{
            fontSize: 'clamp(44px, 5.4vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '24ch',
          }}
        >
          Tres datasets. Trece figuras.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="mt-2 font-display text-ink-black leading-[0.9]"
          style={{ fontSize: 'clamp(72px, 9vw, 96px)', letterSpacing: 0 }}
        >
          UNA DECISIÓN.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          viewport={{ once: true }}
          className="mt-6 font-nh font-light text-ink-black"
          style={{ fontSize: 22, lineHeight: 1.45, maxWidth: '60ch' }}
        >
          HAM10000 + BCN20000 forman el núcleo de entrenamiento autosupervisado.
          CO2Wounds-V2 (Sánchez 2024) entra como trabajo futuro · ancla regional Santander.
        </motion.p>
      </div>

      {/* HERO METRICS BAR · full-width */}
      <div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-[1400px]"
        style={{
          borderTop: '1px solid #292929',
          borderBottom: '1px solid #292929',
        }}
      >
        <HeroMetricCell value={28961} label="IMÁGENES NÚCLEO · HAM + BCN" delay={0} />
        <HeroMetricCell value={7} label="CLASES NÚCLEO · HAM10000" divider delay={0.1} />
        <HeroMetricCell value={96} label="PACIENTES SANTANDER · CO2W" divider delay={0.2} />
      </div>

      {/* SCROLLYTELLING */}
      <div className="slide-narrow relative">
        <Scrollytelling />

        {/* COMPARATOR */}
        <Comparator />

        {/* COVERAGE + BIAS · coverage section */}
        <div className="mt-20 mb-8 flex items-end gap-6">
          <span
            className="font-display text-ink-black leading-none tabular-nums shrink-0"
            style={{ fontSize: 'clamp(56px, 7vw, 80px)', letterSpacing: 0 }}
          >
            01
          </span>
          <div className="flex-1 pb-3" style={{ borderBottom: '1px solid #292929' }}>
            <h3
              className="font-nh font-light text-ink-black leading-tight"
              style={{ fontSize: 30, letterSpacing: '-0.02em' }}
            >
              Cobertura cruzada
            </h3>
            <p
              className="font-condensed text-ink-black mt-2"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ¿qué patologías cubren los datasets?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink-black">
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-ink-black">
            <CoverageMatrix />
          </div>
          <div className="lg:col-span-5 p-6 card-fog">
            <span
              className="font-condensed text-ink-black block"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ── LECTURA CLÍNICA · COBERTURA
            </span>
            <p
              className="mt-4 font-nh text-ink-black"
              style={{ fontSize: 18, lineHeight: 1.5, maxWidth: '60ch' }}
            >
              Las cuatro patologías <strong className="font-medium">críticas</strong> están
              cubiertas por HAM y BCN. Las seis ausentes son trabajo futuro: dataset propio o
              transferencia de dominio.
            </p>
            <div className="mt-6">
              <CoverageReadout />
            </div>
          </div>
        </div>

        {/* SESGOS section */}
        <div className="mt-20 mb-8 flex items-end gap-6">
          <span
            className="font-display text-ink-black leading-none tabular-nums shrink-0"
            style={{ fontSize: 'clamp(56px, 7vw, 80px)', letterSpacing: 0 }}
          >
            02
          </span>
          <div className="flex-1 pb-3" style={{ borderBottom: '1px solid #292929' }}>
            <h3
              className="font-nh font-light text-ink-black leading-tight"
              style={{ fontSize: 30, letterSpacing: '-0.02em' }}
            >
              Sesgos identificados
            </h3>
            <p
              className="font-condensed text-ink-black mt-2"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              siete sesgos · tres de severidad alta
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink-black">
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-ink-black">
            <BiasMatrix />
          </div>
          <div className="lg:col-span-5 p-8 card-dark flex flex-col">
            <span
              className="font-condensed text-canvas-white block"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ── RESUMEN
            </span>
            <p
              className="mt-4 font-nh font-light text-canvas-white"
              style={{ fontSize: 18, lineHeight: 1.5, maxWidth: '60ch' }}
            >
              Tres sesgos de severidad <strong className="font-medium">alta</strong> ·
              adquisición, fenotípico y cobertura · concentran el riesgo metodológico.
              Los cuatro restantes se mitigan con augmentación, normalización y reporte
              desagregado.
            </p>

            <div
              className="mt-auto pt-6 grid grid-cols-3"
              style={{ borderTop: '1px solid #ffffff' }}
            >
              {(['high', 'medium', 'low'] as const).map((sev, i) => {
                const count = biasMatrix.filter((b) => b.severity === sev).length;
                const label = sev === 'high' ? 'ALTOS' : sev === 'medium' ? 'MEDIOS' : 'BAJOS';
                return (
                  <div
                    key={sev}
                    className="py-4 px-2"
                    style={{ borderLeft: i === 0 ? 'none' : '1px solid #ffffff' }}
                  >
                    <p
                      className="font-display text-canvas-white leading-none tabular-nums"
                      style={{ fontSize: 48, letterSpacing: 0 }}
                    >
                      {String(count).padStart(2, '0')}
                    </p>
                    <p
                      className="font-condensed text-canvas-white mt-2"
                      style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RANKING TABLE */}
        <div className="mt-20 mb-8 flex items-end gap-6">
          <span
            className="font-display text-ink-black leading-none tabular-nums shrink-0"
            style={{ fontSize: 'clamp(56px, 7vw, 80px)', letterSpacing: 0 }}
          >
            03
          </span>
          <div className="flex-1 pb-3" style={{ borderBottom: '1px solid #292929' }}>
            <h3
              className="font-nh font-light text-ink-black leading-tight"
              style={{ fontSize: 30, letterSpacing: '-0.02em' }}
            >
              Ranking de prioridad clínica
            </h3>
            <p
              className="font-condensed text-ink-black mt-2"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ── 9 lesiones · jerarquía SSL · click en headers para ordenar
            </p>
          </div>
        </div>

        <RankingTable />

        {/* DECISION CALLOUT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-20 card-dark p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <span
                className="font-condensed text-canvas-white block"
                style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase' }}
              >
                ── DECISIÓN · NÚCLEO DE ENTRENAMIENTO
              </span>
              <p
                className="mt-6 font-display text-canvas-white leading-[0.9]"
                style={{ fontSize: 'clamp(64px, 8vw, 96px)', letterSpacing: 0 }}
              >
                HAM10000<br />+ BCN20000
              </p>
              <p
                className="mt-6 font-nh font-light text-canvas-white"
                style={{ fontSize: 22, lineHeight: 1.45, maxWidth: '50ch' }}
              >
                28.961 imágenes · 7 clases núcleo · balance suficiente para SSL contrastivo.
                CO2Wounds-V2 entra como trabajo futuro de transferencia de dominio.
              </p>

              {/* progress bar driven by scroll */}
              <div className="mt-8 h-px bg-canvas-white/30 max-w-md overflow-hidden">
                <motion.div className="h-full bg-canvas-white" style={{ width: decisionWidth }} />
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:pl-8" style={{ borderColor: '#ffffff' }}>
              <span
                className="font-condensed text-canvas-white block"
                style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                ── FICHA TÉCNICA
              </span>
              <dl className="mt-5">
                {[
                  ['IMÁGENES', '28.961'],
                  ['CLASES', '7 núcleo + 1 binaria'],
                  ['BACKBONE', 'ResNet-50 · ViT-B/16'],
                  ['PRETEXTO', 'SimCLR / BYOL / DINO / MAE'],
                  ['SPRINT', 'F4 · MODELADO'],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 py-3"
                    style={{
                      borderTop: '1px solid #ffffff',
                      borderBottom: i === arr.length - 1 ? '1px solid #ffffff' : 'none',
                    }}
                  >
                    <dt
                      className="font-condensed text-canvas-white"
                      style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}
                    >
                      {k}
                    </dt>
                    <dd className="font-mono text-canvas-white text-[12.5px] font-medium text-right">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>

        {/* FOOTER kbd hints */}
        <div className="mt-8 flex items-center gap-3 flex-wrap">
          <span className="kbd">↓</span>
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black mr-4">
            SCROLL · ACTIVAR STEPS
          </span>
          <span className="kbd">SHIFT</span>
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black -ml-2">
            +
          </span>
          <span className="kbd">DRAG</span>
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
            COMPARADOR HAM × BCN
          </span>
        </div>

        {/* Source citations */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 pt-4 border-t border-grey-100">
          <p className="font-mono text-[10px] tracking-[0.05em] text-grey-500">
            ▸ HAM10000 · {ham10000.source}
          </p>
          <p className="font-mono text-[10px] tracking-[0.05em] text-grey-500">
            ▸ BCN20000 · {bcn20000.source}
          </p>
          <p className="font-mono text-[10px] tracking-[0.05em] text-grey-500">
            ▸ CO2Wounds-V2 · {co2wounds.source}
          </p>
        </div>
      </div>
    </div>
  );
}
