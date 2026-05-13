import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { OBJETIVOS } from '@/data/content';

const ENTER = [0.22, 1, 0.36, 1] as const;
const MOVE = [0.25, 1, 0.5, 1] as const;

type ActividadEstado = 'COMPLETADO' | 'EN CURSO' | 'PENDIENTE';
type Objetivo = typeof OBJETIVOS.especificos[number];

// ── Estilos por card según índice (0=F1 ... 3=F4) ────────────────
const CARD_STYLES = [
  {
    background: 'var(--color-paper-warm)',
    accent: 'var(--color-teal)',
    numColor: 'var(--color-teal)',
    border: '1px solid var(--color-line)',
    track: 'rgba(31,140,136,0.12)',
    fill: 'var(--color-teal)',
    isDark: false,
  },
  {
    background: 'var(--color-paper-soft)',
    accent: 'var(--color-graphite)',
    numColor: 'var(--color-graphite)',
    border: '1px solid var(--color-line)',
    track: 'rgba(11,30,52,0.08)',
    fill: 'var(--color-navy)',
    isDark: false,
  },
  {
    background: 'var(--color-teal-soft)',
    accent: 'var(--color-teal)',
    numColor: 'var(--color-teal)',
    border: '1px solid rgba(31,140,136,0.25)',
    track: 'rgba(31,140,136,0.18)',
    fill: 'var(--color-teal)',
    isDark: false,
  },
  {
    background: 'var(--color-navy)',
    accent: '#ffffff',
    numColor: 'rgba(255,255,255,0.95)',
    border: '1px solid var(--color-navy)',
    track: 'rgba(255,255,255,0.16)',
    fill: 'var(--color-teal-soft)',
    isDark: true,
  },
];

function progresoDe(actividades: readonly { estado: string }[]) {
  const completed = actividades.filter((a) => a.estado === 'COMPLETADO').length;
  const inProgress = actividades.filter((a) => a.estado === 'EN CURSO').length;
  const total = actividades.length;
  const pct = Math.round(((completed + inProgress * 0.5) / total) * 100);
  return { pct, completed, inProgress, total };
}

function StatusChip({ estado, dark = false }: { estado: string; dark?: boolean }) {
  const isCurrent = estado === 'EN CURSO';
  if (isCurrent) {
    return (
      <span className="status-current relative" style={{ background: dark ? 'rgba(255,255,255,0.22)' : undefined }}>
        <span className="dot-pulse" style={{ background: '#ffffff' }} />
        <motion.span
          aria-hidden
          style={{ position: 'absolute', inset: 0, borderRadius: 9999, pointerEvents: 'none' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(31,140,136,0)',
              '0 0 0 6px rgba(31,140,136,0.18)',
              '0 0 0 0 rgba(31,140,136,0)',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {estado}
      </span>
    );
  }
  return (
    <span
      className="status-pending"
      style={{
        color: dark ? 'rgba(255,255,255,0.85)' : undefined,
        borderColor: dark ? 'rgba(255,255,255,0.4)' : undefined,
      }}
    >
      {estado}
    </span>
  );
}

function IconArrowDown() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 5v22M9 20l7 7 7-7" />
    </svg>
  );
}

function IconCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.2l3.4 3.4L13 4.6" />
    </svg>
  );
}

function IconChevron({ open, color }: { open: boolean; color: string }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.4, ease: ENTER }}
    >
      <path d="M5 7.5l5 5 5-5" />
    </motion.svg>
  );
}

// ── Contador animado de porcentaje ───────────────────
function CountUp({ to, inView, suffix = '%', duration = 1.2 }: { to: number; inView: boolean; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, inView, duration]);
  return <span className="tabular-nums">{val}{suffix}</span>;
}

// ── Item de actividad (al expandir) ──────────────────
function ActividadItem({
  actividad,
  index,
  isDark,
  accent,
}: {
  actividad: { label: string; estado: string };
  index: number;
  isDark: boolean;
  accent: string;
}) {
  const isDone = actividad.estado === 'COMPLETADO';
  const isCurrent = actividad.estado === 'EN CURSO';
  const baseText = isDark ? 'rgba(255,255,255,0.92)' : 'var(--color-navy)';
  const mutedText = isDark ? 'rgba(255,255,255,0.55)' : 'var(--color-graphite)';

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: ENTER, delay: index * 0.06 }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '12px 0',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-line)',
        position: 'relative',
      }}
    >
      {/* Icono de estado */}
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 9999,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
          background: isDone
            ? accent
            : isCurrent
            ? 'transparent'
            : isDark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(11,30,52,0.04)',
          border: isCurrent
            ? `2px solid ${accent}`
            : isDone
            ? `2px solid ${accent}`
            : isDark
            ? '1.5px dashed rgba(255,255,255,0.3)'
            : '1.5px dashed var(--color-mist)',
          color: isDone ? (isDark ? 'var(--color-navy)' : '#ffffff') : accent,
          position: 'relative',
        }}
      >
        {isDone && <IconCheck size={12} />}
        {isCurrent && (
          <>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: accent,
              }}
            />
            <motion.span
              aria-hidden
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: 9999,
                pointerEvents: 'none',
              }}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${accent}00`,
                  `0 0 0 6px ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(31,140,136,0.18)'}`,
                  `0 0 0 0 ${accent}00`,
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14.5,
            lineHeight: 1.5,
            color: isDone ? mutedText : baseText,
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: mutedText,
            textDecorationThickness: '1px',
            fontWeight: isCurrent ? 500 : 400,
          }}
        >
          {actividad.label}
        </div>
        {isCurrent && (
          <div
            className="font-mono"
            style={{
              marginTop: 4,
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: accent,
              fontWeight: 700,
            }}
          >
            ◉ En curso ahora
          </div>
        )}
      </div>

      <span
        className="font-mono"
        style={{
          fontSize: 9.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isDone ? accent : mutedText,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 4,
          opacity: isCurrent ? 0 : 1,
        }}
      >
        {isDone ? '✓ Listo' : 'Pendiente'}
      </span>
    </motion.li>
  );
}

// ── Card de objetivo (con expand/collapse) ───────────
function ObjetivoCard({
  obj,
  index,
  forceOpen,
  reduced,
}: {
  obj: Objetivo;
  index: number;
  forceOpen: boolean;
  reduced: boolean;
}) {
  const styles = CARD_STYLES[index];
  const [open, setOpen] = useState(forceOpen);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, margin: '-15%' });
  const { pct, completed, inProgress, total } = progresoDe(obj.actividades);

  // Spring para barra de progreso
  const target = inView ? pct / 100 : 0;
  const progress = useSpring(0, { stiffness: 60, damping: 18, mass: 0.6 });
  useEffect(() => {
    progress.set(target);
  }, [target, progress]);
  const widthPct = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);

  return (
    <motion.div
      ref={cardRef}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={inView ? (reduced ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
      transition={{ duration: 0.7, ease: ENTER, delay: 0.05 + index * 0.08 }}
      whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.32, ease: MOVE } }}
      style={{
        background: styles.background,
        color: styles.isDark ? '#ffffff' : 'var(--color-navy)',
        border: styles.border,
        borderRadius: 22,
        padding: 0,
        overflow: 'hidden',
        boxShadow: open
          ? styles.isDark
            ? '0 24px 56px -20px rgba(11,30,52,0.55)'
            : '0 18px 46px -18px rgba(11,30,52,0.18)'
          : 'var(--sh-sm)',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {/* Header clickeable ─────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`obj-${obj.id}-panel`}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          padding: '26px 26px 22px',
          color: 'inherit',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="objcard-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, 1fr) minmax(120px, max-content)',
            alignItems: 'flex-start',
            columnGap: 22,
            rowGap: 14,
            width: '100%',
          }}
        >
          {/* Número grande */}
          <div
            className="font-display tabular-nums"
            style={{
              fontSize: 'clamp(56px, 6vw, 84px)',
              lineHeight: 0.85,
              color: styles.numColor,
              minWidth: 70,
              fontWeight: 700,
              gridColumn: '1',
              gridRow: '1',
            }}
          >
            {obj.id}
          </div>

          {/* Bloque texto */}
          <div style={{ minWidth: 0, gridColumn: '2', gridRow: '1' }}>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: styles.isDark ? 'rgba(255,255,255,0.72)' : 'var(--color-graphite)',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              OBJ-0{obj.id} · {obj.fase}
            </div>
            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.45,
                color: styles.isDark ? '#ffffff' : 'var(--color-navy)',
                fontWeight: styles.isDark ? 500 : 400,
                maxWidth: '60ch',
                marginBottom: 14,
              }}
            >
              {obj.texto}
            </p>

            {/* Barra de progreso ─────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: '1 1 220px',
                  height: 8,
                  borderRadius: 9999,
                  background: styles.track,
                  overflow: 'hidden',
                  position: 'relative',
                  minWidth: 160,
                }}
              >
                <motion.div
                  style={{
                    width: widthPct,
                    height: '100%',
                    background: styles.fill,
                    borderRadius: 9999,
                    position: 'relative',
                  }}
                >
                  {pct > 0 && pct < 100 && (
                    <motion.span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translate(50%, -50%)',
                        width: 12,
                        height: 12,
                        borderRadius: 9999,
                        background: styles.fill,
                        boxShadow: styles.isDark
                          ? '0 0 0 4px rgba(255,255,255,0.18)'
                          : '0 0 0 4px rgba(31,140,136,0.18)',
                      }}
                      animate={{
                        scale: [1, 1.18, 1],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <span
                  className="font-display tabular-nums"
                  style={{
                    fontSize: 22,
                    lineHeight: 1,
                    color: styles.isDark ? '#ffffff' : 'var(--color-navy)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <CountUp to={pct} inView={inView} />
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: styles.isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-graphite)',
                    fontWeight: 600,
                  }}
                >
                  {completed}/{total}
                </span>
              </div>
            </div>
          </div>

          {/* Status + chevron ─────── */}
          <div
            data-objcard-status
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 10,
              gridColumn: '3',
              gridRow: '1',
              justifySelf: 'end',
              maxWidth: '100%',
            }}
          >
            <StatusChip estado={obj.estado} dark={styles.isDark} />
            <span
              className="font-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: styles.isDark ? 'rgba(255,255,255,0.78)' : 'var(--color-graphite)',
                fontWeight: 600,
              }}
            >
              {open ? 'Ocultar' : 'Ver actividades'}
              <IconChevron open={open} color={styles.isDark ? '#ffffff' : 'var(--color-navy)'} />
            </span>
          </div>
        </div>
      </button>

      {/* Panel expandible ─────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`obj-${obj.id}-panel`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: ENTER },
              opacity: { duration: 0.32, ease: ENTER, delay: 0.08 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '4px 28px 26px',
                borderTop: styles.isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid var(--color-line)',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: styles.isDark ? 'rgba(255,255,255,0.62)' : 'var(--color-graphite)',
                  fontWeight: 600,
                  padding: '18px 0 6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <span>Actividades · {total} totales</span>
                <span>
                  {completed > 0 && <span style={{ color: styles.accent }}>{completed} completadas</span>}
                  {completed > 0 && inProgress > 0 && <span> · </span>}
                  {inProgress > 0 && <span style={{ color: styles.accent }}>{inProgress} en curso</span>}
                  {completed === 0 && inProgress === 0 && <span>0 iniciadas</span>}
                </span>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {obj.actividades.map((act, i) => (
                  <ActividadItem
                    key={i}
                    actividad={act}
                    index={i}
                    isDark={styles.isDark}
                    accent={styles.accent}
                  />
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Section06Objetivos() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cumbreInView = useInView(sectionRef, { once: true, margin: '-15%' });

  // SVG line draw
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineDraw = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);

  // Progreso global
  const allActs = OBJETIVOS.especificos.flatMap((o) => o.actividades);
  const globalDone = allActs.filter((a) => a.estado === 'COMPLETADO').length;
  const globalCurr = allActs.filter((a) => a.estado === 'EN CURSO').length;
  const globalTotal = allActs.length;
  const globalPct = Math.round(((globalDone + globalCurr * 0.5) / globalTotal) * 100);

  return (
    <section
      id="objetivos"
      ref={sectionRef}
      className="section relative overflow-hidden bg-soft-navy"
    >
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" style={{ opacity: 0.35 }} />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: ENTER }}
          className="eyebrow-num mb-6"
        >
          §07 / Objetivos
        </motion.div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.06 }}
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '22ch',
              color: 'var(--color-navy)',
              flex: '1 1 480px',
            }}
          >
            Un objetivo general.{' '}
            <span className="font-serif-it" style={{ color: 'var(--color-teal)' }}>
              Cuatro pasos verificables.
            </span>
          </motion.h2>

          {/* Badge de progreso global */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.18 }}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 6,
              padding: '14px 18px',
              border: '1px solid var(--color-line)',
              borderRadius: 14,
              background: 'var(--color-paper)',
              minWidth: 200,
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-graphite)',
                fontWeight: 600,
              }}
            >
              Progreso global
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span
                className="font-display tabular-nums"
                style={{
                  fontSize: 38,
                  lineHeight: 1,
                  color: 'var(--color-navy)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                <CountUp to={globalPct} inView={cumbreInView} />
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-graphite)',
                  fontWeight: 600,
                }}
              >
                {globalDone}/{globalTotal} actividades
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 4,
                borderRadius: 9999,
                background: 'rgba(31,140,136,0.12)',
                overflow: 'hidden',
                marginTop: 4,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={cumbreInView ? { width: `${globalPct}%` } : { width: 0 }}
                transition={{ duration: 1.4, ease: ENTER, delay: 0.4 }}
                style={{
                  height: '100%',
                  background: 'var(--color-teal)',
                  borderRadius: 9999,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── OBJETIVO GENERAL · cumbre ──────────────── */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
          animate={
            cumbreInView
              ? reduced
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
              : undefined
          }
          transition={{ duration: 0.85, ease: ENTER, delay: 0.18 }}
          className="card-navy mt-14 relative"
          style={{
            padding: 36,
            maxWidth: '100%',
            zIndex: 2,
            willChange: 'transform',
          }}
        >
          <div className="flex flex-wrap items-start gap-6">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'rgba(31,140,136,0.22)',
                color: 'var(--color-teal-soft)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <div
                className="eyebrow"
                style={{ color: 'var(--color-teal-soft)', marginBottom: 8 }}
              >
                Objetivo general
              </div>
              <p
                style={{
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {OBJETIVOS.general}
              </p>
            </div>
          </div>

          {/* Flecha conectora */}
          <div
            aria-hidden
            className="hidden md:flex"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -28,
              transform: 'translateX(-50%)',
              width: 48,
              height: 48,
              borderRadius: 9999,
              background: 'var(--color-teal)',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px -8px rgba(31,140,136,0.5)',
              border: '3px solid var(--color-paper)',
              zIndex: 3,
            }}
          >
            <IconArrowDown />
          </div>
        </motion.div>

        {/* ── SVG conector ─────────────── */}
        {!reduced && (
          <motion.svg
            aria-hidden
            className="hidden md:block mx-auto mt-2"
            width="2"
            height="40"
            viewBox="0 0 2 40"
            style={{ display: 'block', overflow: 'visible' }}
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="40"
              stroke="var(--color-teal)"
              strokeWidth="2"
              strokeDasharray="40"
              style={{ strokeDashoffset: useTransform(lineDraw, (v) => v * 40) }}
              opacity="0.55"
            />
          </motion.svg>
        )}

        {/* ── CARDS DE OBJETIVOS ─────────────── */}
        <div
          className="mt-12 lg:mt-16"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {OBJETIVOS.especificos.map((obj, i) => (
            <ObjetivoCard
              key={obj.id}
              obj={obj}
              index={i}
              forceOpen={obj.estado === 'EN CURSO'}
              reduced={reduced}
            />
          ))}
        </div>

        {/* ── Footer summary ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: ENTER, delay: 0.4 }}
          className="hairline mt-14 pt-6"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-graphite)',
            }}
          >
            Estado actual
          </span>
          <span className="status-current">
            <span className="dot-pulse" />
            Fase 1 · Pipeline en curso
          </span>
          <span className="status-pending">Fases 2 · 3 · 4 pendientes</span>
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-teal)',
              fontWeight: 600,
              marginLeft: 'auto',
            }}
          >
            {globalDone} de {globalTotal} actividades completadas · {globalPct}% global
          </span>
        </motion.div>
      </div>
    </section>
  );
}
