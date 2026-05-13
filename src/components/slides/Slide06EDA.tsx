import { motion, AnimatePresence } from 'framer-motion';
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
// STORY STEPS · scrollytelling content
// ─────────────────────────────────────────────────────────────────────
type StoryStep = {
  id: string;
  eyebrow: string;
  display: string;
  displaySub?: string;
  body: string;
  visualKey: 'ham' | 'ham-focus' | 'bcn' | 'co2' | 'core';
  accent?: string; // word inside `display` to wrap in accent-hl
};

const STORY: StoryStep[] = [
  {
    id: 's1',
    eyebrow: '01 · HAM10000',
    display: 'HAM10000',
    displaySub: '10.015 imágenes · 7 clases',
    body:
      'Tschandl, Rosendahl y Kittler (2018) · Scientific Data. Dermatoscopia estandarizada, 7 clases clínicas, base recurrente en literatura SSL de lesiones cutáneas.',
    visualKey: 'ham',
  },
  {
    id: 's2',
    eyebrow: '02 · SESGO CRÍTICO',
    display: '67 %',
    displaySub: 'nevus melanocítico',
    body:
      'Nevus domina HAM. SSL contrastivo aprovecha esa clase ancla, pero el desbalance se ataca con focal loss y muestreo balanceado durante modelado.',
    visualKey: 'ham-focus',
    accent: '67 %',
  },
  {
    id: 's3',
    eyebrow: '03 · BCN20000',
    display: 'BCN20000',
    displaySub: '18.946 imágenes · binario',
    body:
      'Hospital Clínic Barcelona (2025). Etiquetado binario benigno/maligno cercano a 50/50. Compensa el desbalance nevus de HAM y aporta resolución mediana 1024×1024.',
    visualKey: 'bcn',
  },
  {
    id: 's4',
    eyebrow: '04 · CO2WOUNDS-V2',
    display: '96 pacientes',
    displaySub: 'Santander · cohorte regional',
    body:
      'Sánchez et al. 2024 · capturado con celular en Contratación. Ancla regional con distribución de dominio distinta al núcleo dermatoscópico. Entra como trabajo futuro de transferencia.',
    visualKey: 'co2',
    accent: '96 pacientes',
  },
  {
    id: 's5',
    eyebrow: '05 · DECISIÓN',
    display: 'HAM + BCN',
    displaySub: '28.961 imágenes combinadas',
    body:
      'Suficiente para preentrenamiento autosupervisado contrastivo. SimCLR, BYOL, DINO y MAE evaluados sobre ResNet-50 y ViT-B/16.',
    visualKey: 'core',
    accent: 'HAM + BCN',
  },
];

function StoryVisual({ visualKey }: { visualKey: StoryStep['visualKey'] }) {
  switch (visualKey) {
    case 'ham':
    case 'ham-focus':
      return (
        <div className="relative w-full" style={{ width: '100%', minHeight: 280 }}>
          <HamClassChart />
          {visualKey === 'ham-focus' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute pointer-events-none"
              style={{
                top: 8,
                right: 8,
                padding: '6px 12px',
                borderRadius: 9999,
                background: '#d1ffca',
                border: '1px solid rgba(0,0,0,0.08)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.08em',
                color: '#000000',
              }}
            >
              nevus · 67%
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
          className="card-fog w-full"
          style={{ width: '100%', padding: 24 }}
        >
          <span className="eyebrow-up">── DATA SHEET · CO2WOUNDS-V2</span>
          <p
            className="mt-3"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              lineHeight: 0.92,
              color: '#000000',
              letterSpacing: '-0.02em',
            }}
          >
            {co2wounds.name}
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#979797',
            }}
          >
            {co2wounds.source}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
            {[
              ['size', `${co2wounds.size} img`],
              ['pacientes', String(co2wounds.patients)],
              ['sitio', co2wounds.site.split(',')[0]],
              ['captura', co2wounds.capture],
              ['mIoU', `${co2wounds.mIoU} %`],
              ['F1 macro', `${co2wounds.f1} %`],
              ['tarea', co2wounds.task],
              ['licencia', co2wounds.license],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-3"
                style={{ paddingBottom: 6, borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                <dt
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: '#444444',
                  }}
                >
                  {k}
                </dt>
                <dd
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'right',
                  }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-5 pt-4"
            style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
          >
            <span className="eyebrow-up">── NOTA</span>
            <p
              className="mt-2"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                lineHeight: 1.45,
                color: '#000000',
              }}
            >
              {co2wounds.highlight}.
            </p>
          </div>
        </div>
      );
    case 'core':
      return (
        <div className="w-full" style={{ width: '100%', minHeight: 280 }}>
          <DatasetCompareChart />
        </div>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────
// SCROLLYTELLING
// ─────────────────────────────────────────────────────────────────────
function Scrollytelling() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
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

  // Reduced-motion fallback · stacked cards, no sticky
  if (reducedMotion) {
    return (
      <div className="mt-16 grid grid-cols-1 gap-6">
        {STORY.map((step, i) => (
          <div key={step.id} className="card">
            <span className="eyebrow-up">{step.eyebrow}</span>
            <h3
              className="mt-3"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 56,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
              {step.display}
            </h3>
            {step.displaySub && (
              <p
                className="mt-2"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: '#444444',
                  letterSpacing: '0.04em',
                }}
              >
                {step.displaySub}
              </p>
            )}
            <p
              className="mt-5"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                lineHeight: 1.5,
                color: '#000000',
                maxWidth: '60ch',
              }}
            >
              {step.body}
            </p>
            <div className="mt-6">
              <StoryVisual visualKey={step.visualKey} />
            </div>
            {i < STORY.length - 1 && (
              <div className="mt-6 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-16 relative">
      {/* Step indicator (vertical dots) — desktop only */}
      <div
        className="hidden lg:flex flex-col items-center gap-3"
        style={{
          position: 'absolute',
          left: -8,
          top: '15vh',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        {STORY.map((_, i) => {
          const isActive = i === activeStep;
          return (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.04em',
                  color: isActive ? '#000000' : '#979797',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  borderRadius: '50%',
                  background: isActive ? '#000000' : 'transparent',
                  border: isActive ? 'none' : '1px solid #979797',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT · story column · scrolls */}
        <div className="lg:col-span-7">
          {STORY.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className="min-h-[80vh] flex items-center py-12"
              >
                <div className="w-full max-w-xl">
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="eyebrow-up block"
                  >
                    {step.eyebrow}
                  </motion.span>

                  <motion.h3
                    animate={{ opacity: isActive ? 1 : 0.25, y: isActive ? 0 : 4 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mt-4"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(64px, 8vw, 112px)',
                      lineHeight: 0.92,
                      letterSpacing: '-0.02em',
                      color: '#000000',
                    }}
                  >
                    {step.accent ? (
                      <>
                        {step.display.split(step.accent)[0]}
                        <span className="accent-hl">{step.accent}</span>
                        {step.display.split(step.accent)[1]}
                      </>
                    ) : (
                      step.display
                    )}
                  </motion.h3>

                  {step.displaySub && (
                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                      className="mt-4"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 13,
                        letterSpacing: '0.04em',
                        color: '#444444',
                      }}
                    >
                      {step.displaySub}
                    </motion.p>
                  )}

                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                    className="mt-6"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 22,
                      lineHeight: 1.45,
                      color: '#000000',
                      maxWidth: '54ch',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.body}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT · sticky visual card */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="scrolly-stick">
            <div
              className="card"
              style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                padding: 28,
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="eyebrow-up">
                  ── visual · 0{activeStep + 1} / 05
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.05em',
                    color: '#979797',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {STORY[activeStep].id.toUpperCase()}
                </span>
              </div>

              <div className="flex-1 flex items-center w-full">
                <div className="w-full" style={{ minHeight: 320 }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={STORY[activeStep].visualKey}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ width: '100%' }}
                    >
                      <StoryVisual visualKey={STORY[activeStep].visualKey} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* horizontal progress ticker */}
              <div className="mt-6 grid grid-cols-5 gap-1.5">
                {STORY.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 3,
                      borderRadius: 9999,
                      background: i <= activeStep ? '#000000' : 'rgba(0,0,0,0.08)',
                      transition: 'background 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* mobile fallback */}
        <div className="lg:hidden mt-4 grid grid-cols-1 gap-4">
          {STORY.map((step) => (
            <div key={step.id} className="card-fog">
              <span className="eyebrow-up">{step.eyebrow}</span>
              <div className="mt-4">
                <StoryVisual visualKey={step.visualKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// COMPARATOR · drag HAM × BCN
// ─────────────────────────────────────────────────────────────────────
function Comparator() {
  const [pos, setPos] = useState(50);
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

  const hamOpacity = Math.max(0.3, pos / 100);
  const bcnOpacity = Math.max(0.3, 1 - pos / 100);

  return (
    <div className="mt-20 card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        className="flex items-baseline justify-between"
        style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <span className="eyebrow-up">── COMPARADOR HAM × BCN</span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.04em',
            color: '#979797',
          }}
        >
          drag · {pos.toFixed(0)} / {(100 - pos).toFixed(0)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          animate={{ opacity: hamOpacity }}
          transition={{ duration: 0.15 }}
          style={{ padding: 28, borderRight: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="eyebrow-up">HAM10000 · 10.015 img</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: '#979797',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {pos.toFixed(0)}%
            </span>
          </div>
          <HamClassChart />
        </motion.div>

        <motion.div
          animate={{ opacity: bcnOpacity }}
          transition={{ duration: 0.15 }}
          style={{ padding: 28 }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="eyebrow-up">BCN20000 · 18.946 img</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: '#979797',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {(100 - pos).toFixed(0)}%
            </span>
          </div>
          <BcnDonutChart />
        </motion.div>
      </div>

      {/* slider track */}
      <div style={{ padding: '24px 28px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div
          ref={trackRef}
          className="relative select-none touch-none"
          style={{ height: 36, cursor: 'ew-resize' }}
          onMouseDown={(e) => {
            isDragging.current = true;
            onPointerMove(e.clientX);
          }}
          onTouchStart={(e) => {
            isDragging.current = true;
            if (e.touches[0]) onPointerMove(e.touches[0].clientX);
          }}
        >
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
            style={{ height: 2, background: 'rgba(0,0,0,0.12)', borderRadius: 9999 }}
          />
          {[0, 25, 50, 75, 100].map((t) => (
            <div
              key={t}
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: `${t}%`,
                width: 1,
                height: 8,
                background: 'rgba(0,0,0,0.16)',
              }}
            />
          ))}
          {/* handle pill */}
          <motion.div
            animate={{ left: `${pos}%` }}
            transition={{ duration: 0.05 }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{
              height: 28,
              width: 56,
              background: '#000000',
              color: '#ffffff',
              borderRadius: 9999,
              cursor: 'ew-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {pos.toFixed(0)}
          </motion.div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.04em',
              color: '#444444',
            }}
          >
            HAM ←
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.04em',
              color: '#444444',
            }}
          >
            → BCN
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RANKING TABLE · sortable
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

  const headers: { key: SortKey; label: string }[] = [
    { key: 'rank', label: '#' },
    { key: 'lesion', label: 'lesión' },
    { key: 'priority', label: 'prioridad' },
    { key: 'category', label: 'categoría' },
  ];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        className="flex items-baseline justify-between"
        style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <span className="eyebrow-up">
          ── RANKING DE PRIORIDAD CLÍNICA · 9 LESIONES
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: '#979797',
            letterSpacing: '0.04em',
          }}
        >
          click headers · sort
        </span>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: '64px 1fr 160px 160px',
          background: '#f3f3f3',
        }}
      >
        {headers.map((h) => (
          <button
            key={h.key}
            onClick={() => setSort(h.key)}
            className="transition-colors hover:bg-white text-left flex items-center gap-2"
            style={{
              padding: '14px 18px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#000000',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {h.label}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: sortKey === h.key ? '#000000' : '#979797',
                opacity: sortKey === h.key ? 1 : 0.5,
              }}
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
              className={cn('grid items-center')}
              style={{
                gridTemplateColumns: '64px 1fr 160px 160px',
                background: isCritical ? '#000000' : i % 2 === 0 ? '#ffffff' : '#f9f9f9',
                color: isCritical ? '#ffffff' : '#000000',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ padding: '18px' }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 32,
                    lineHeight: 0.9,
                    color: isCritical ? '#ffffff' : '#000000',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {String(r.rank).padStart(2, '0')}
                </span>
              </div>
              <div style={{ padding: '18px', minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: isCritical ? '#ffffff' : '#000000',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {r.lesion}
                  {r.lesion === 'Leishmaniasis ulcerosa' && (
                    <span
                      className="pill-yellow"
                      style={{
                        marginLeft: 10,
                        padding: '3px 9px',
                        fontSize: 10,
                        verticalAlign: 'middle',
                      }}
                    >
                      trabajo futuro
                    </span>
                  )}
                </p>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 12.5,
                    color: isCritical ? 'rgba(255,255,255,0.7)' : '#444444',
                    lineHeight: 1.4,
                  }}
                >
                  {r.justification}
                </p>
              </div>
              <div style={{ padding: '18px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 12px',
                    borderRadius: 9999,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    border: isCritical
                      ? '1px solid #ffffff'
                      : isHigh
                      ? '1px solid #000000'
                      : isMedium
                      ? '1px solid rgba(0,0,0,0.3)'
                      : '1px dashed rgba(0,0,0,0.25)',
                    background: isCritical ? '#ffffff' : 'transparent',
                    color: isCritical ? '#000000' : '#000000',
                  }}
                >
                  {r.priority}
                </span>
              </div>
              <div style={{ padding: '18px' }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: isCritical ? 'rgba(255,255,255,0.85)' : '#444444',
                  }}
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
// COVERAGE READOUT (3 hover-reveal rows)
// ─────────────────────────────────────────────────────────────────────
function CoverageReadout() {
  const rows = [
    {
      head: '4 críticas cubiertas',
      detail: 'BCC, SCC, melanoma y queratosis seborreica están en HAM y BCN.',
    },
    {
      head: '6 santandereanas ausentes',
      detail: 'Leishmaniasis, dermatitis atópica, acné, LRC, hidradenitis, maskné.',
    },
    {
      head: 'CO2Wounds · heridas crónicas',
      detail: 'Cubre dominio fuera del dermatoscópico — trabajo futuro de transferencia.',
    },
  ];

  return (
    <ul>
      {rows.map((r, i) => (
        <li
          key={i}
          className="hover-reveal flex items-start gap-3"
          style={{
            padding: '14px 0',
            cursor: 'default',
            borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 1,
              height: 14,
              background: '#000000',
              marginTop: 6,
              flexShrink: 0,
            }}
          />
          <div className="min-w-0 flex-1">
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: '#000000',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              {r.head}
            </p>
            <p
              data-reveal=""
              className="mt-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                lineHeight: 1.4,
                letterSpacing: '0.02em',
              }}
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
// SLIDE 06
// ─────────────────────────────────────────────────────────────────────
export default function Slide06EDA() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="slide relative w-full"
      style={{
        overflow: 'clip', // critical · NOT overflow-hidden, so position:sticky works in descendants
        background: '#e5e7eb',
      }}
    >
      <div className="slide-narrow relative">
        {/* HEADER ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="eyebrow-up">06 · OBJETIVO 1 · ANÁLISIS EXPLORATORIO</span>
          <span className="pill-yellow">13 figuras · 3 datasets · done</span>
        </div>

        {/* HEADLINE ──────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-12"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(40px, 5.2vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#000000',
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
          className="mt-1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(96px, 14vw, 180px)',
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            color: '#000000',
          }}
        >
          UNA <span className="accent-hl">DECISIÓN</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          viewport={{ once: true }}
          className="mt-8"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: 22,
            lineHeight: 1.45,
            color: '#000000',
            maxWidth: '60ch',
            letterSpacing: '-0.01em',
          }}
        >
          HAM10000 + BCN20000 forman el núcleo de entrenamiento autosupervisado.
          CO2Wounds-V2 (Santander, n=96) entra como trabajo futuro de transferencia de dominio.
        </motion.p>

        {/* HERO METRICS BENTO · 6 + 3 + 3 ──────────────────── */}
        <div className="bento mt-16">
          {/* Big card · 28.961 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="card-solid"
            style={{
              gridColumn: 'span 6',
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              ── núcleo total
            </span>
            <div>
              <p
                className="number-rise"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(112px, 16vw, 180px)',
                  lineHeight: 0.86,
                  color: '#ffffff',
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <CountUp value={28961} duration={1.8} />
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                imágenes núcleo · HAM10000 + BCN20000
              </p>
            </div>
          </motion.div>

          {/* 7 classes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="card-accent"
            style={{
              gridColumn: 'span 3',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              ── clases
            </span>
            <div>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(96px, 12vw, 130px)',
                  lineHeight: 0.86,
                  color: '#000000',
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <CountUp value={7} duration={1.4} />
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#000000',
                  letterSpacing: '-0.01em',
                }}
              >
                clases núcleo · HAM10000
              </p>
            </div>
          </motion.div>

          {/* 96 pacientes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            viewport={{ once: true }}
            className="card"
            style={{
              gridColumn: 'span 3',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 280,
            }}
          >
            <span className="eyebrow-up">── santander</span>
            <div>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(96px, 12vw, 130px)',
                  lineHeight: 0.86,
                  color: '#000000',
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <CountUp value={96} duration={1.4} />
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#000000',
                  letterSpacing: '-0.01em',
                }}
              >
                pacientes Santander · CO2W
              </p>
            </div>
          </motion.div>
        </div>

        {/* SCROLLYTELLING ───────────────────────────────────── */}
        <Scrollytelling />

        {/* COMPARATOR ───────────────────────────────────────── */}
        <Comparator />

        {/* COBERTURA BENTO 7 + 5 ─────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 40,
                lineHeight: 1.05,
                color: '#000000',
                letterSpacing: '-0.025em',
              }}
            >
              Cobertura cruzada
            </h3>
            <span className="eyebrow-up">¿qué patologías cubren los datasets?</span>
          </div>

          <div className="bento">
            <div className="card" style={{ gridColumn: 'span 7', padding: 32 }}>
              <CoverageMatrix />
            </div>
            <div className="card-fog" style={{ gridColumn: 'span 5', padding: 32 }}>
              <span className="eyebrow-up">── LECTURA CLÍNICA · COBERTURA</span>
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: '#000000',
                  letterSpacing: '-0.01em',
                  maxWidth: '40ch',
                }}
              >
                Las cuatro patologías <span className="accent-hl">críticas</span> están
                cubiertas por HAM y BCN. Las seis ausentes son trabajo futuro:
                dataset propio o transferencia de dominio.
              </p>
              <div className="mt-6">
                <CoverageReadout />
              </div>
            </div>
          </div>
        </div>

        {/* SESGOS BENTO 7 + 5 ──────────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 40,
                lineHeight: 1.05,
                color: '#000000',
                letterSpacing: '-0.025em',
              }}
            >
              Sesgos identificados
            </h3>
            <span className="eyebrow-up">siete sesgos · tres de severidad alta</span>
          </div>

          <div className="bento">
            <div className="card" style={{ gridColumn: 'span 7', padding: 32 }}>
              <BiasMatrix />
            </div>
            <div
              className="card-solid"
              style={{
                gridColumn: 'span 5',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                ── RESUMEN
              </span>
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  maxWidth: '40ch',
                }}
              >
                Tres sesgos de severidad{' '}
                <span style={{ fontWeight: 500 }}>alta</span> — adquisición, fenotípico y
                cobertura — concentran el riesgo metodológico. Los cuatro restantes se
                mitigan con augmentación, normalización y reporte desagregado.
              </p>

              <div
                className="mt-auto pt-6 grid grid-cols-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.16)' }}
              >
                {(['high', 'medium', 'low'] as const).map((sev, i) => {
                  const count = biasMatrix.filter((b) => b.severity === sev).length;
                  const label = sev === 'high' ? 'altos' : sev === 'medium' ? 'medios' : 'bajos';
                  return (
                    <div
                      key={sev}
                      style={{
                        padding: '20px 12px 0',
                        borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.16)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 64,
                          lineHeight: 0.86,
                          color: '#ffffff',
                          fontVariantNumeric: 'tabular-nums',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {String(count).padStart(2, '0')}
                      </p>
                      <p
                        className="mt-2"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 10,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RANKING TABLE ──────────────────────────────────── */}
        <div className="mt-20">
          <RankingTable />
        </div>

        {/* DECISION BENTO 7 + 5 ─────────────────────────── */}
        <div className="bento mt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="card-hero-top"
            style={{
              gridColumn: 'span 7',
              padding: 'clamp(40px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 400,
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              ── DECISIÓN · NÚCLEO DE ENTRENAMIENTO
            </span>
            <p
              className="mt-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(72px, 10vw, 130px)',
                lineHeight: 0.86,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              <span className="accent-hl">HAM10000</span>
              <br />+ <span className="accent-hl">BCN20000</span>
            </p>
            <p
              className="mt-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: 22,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '50ch',
                letterSpacing: '-0.01em',
              }}
            >
              28.961 imágenes · 7 clases núcleo · balance suficiente para SSL contrastivo.
              CO2Wounds-V2 entra como trabajo futuro de transferencia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="card-accent"
            style={{
              gridColumn: 'span 5',
              padding: 'clamp(28px, 4vw, 40px)',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.55)',
              }}
            >
              ── FICHA TÉCNICA
            </span>
            <dl className="mt-5 flex-1">
              {[
                ['imágenes', '28.961'],
                ['clases', '7 núcleo + 1 binaria'],
                ['backbone', 'ResNet-50 · ViT-B/16'],
                ['pretexto SSL', 'SimCLR · BYOL · DINO · MAE'],
                ['sprint', 'F4 · MODELADO'],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4"
                  style={{
                    padding: '14px 0',
                    borderTop: i === 0 ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(0,0,0,0.06)',
                    borderBottom: i === arr.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                      letterSpacing: '0.04em',
                      color: '#000000',
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 13,
                      color: '#000000',
                      fontWeight: 500,
                      fontVariantNumeric: 'tabular-nums',
                      textAlign: 'right',
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* FOOTER ─────────────────────────────────────────── */}
        <div className="mt-12 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="kbd">↓</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              scroll · activar steps
            </span>
            <span style={{ width: 16 }} />
            <span className="kbd">shift</span>
            <span className="kbd">drag</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              comparator
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: '#979797',
                letterSpacing: '0.04em',
              }}
            >
              HAM · {ham10000.source}
            </span>
            <span style={{ width: 1, height: 10, background: 'rgba(0,0,0,0.16)' }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: '#979797',
                letterSpacing: '0.04em',
              }}
            >
              BCN · {bcn20000.source}
            </span>
            <span style={{ width: 1, height: 10, background: 'rgba(0,0,0,0.16)' }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: '#979797',
                letterSpacing: '0.04em',
              }}
            >
              CO2W · {co2wounds.source}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
