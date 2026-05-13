import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AVANCES } from '@/data/content';
import { ENTER } from '@/lib/motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// Headline word-by-word
const wordStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const wordReveal = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.6, ease: ENTER } },
};

// Col 7 + Col 5 clip-path simultáneo
const colLeft = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.82, ease: ENTER },
  },
};

const colRight = {
  hidden: { clipPath: 'inset(0 0 0 100%)', opacity: 0 },
  show: {
    clipPath: 'inset(0 0 0 0%)',
    opacity: 1,
    transition: { duration: 0.82, ease: ENTER },
  },
};

// Stagger 80ms realizado · check spring
const realizedStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const realizedItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: ENTER } },
};

const checkSpring = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 18 },
  },
};

// Stagger 60ms pendiente
const pendingStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const pendingItem = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: ENTER } },
};

// Nota orange con pulse box-shadow loop
const noteEnter = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: ENTER },
  },
};

function IconCheck() {
  return (
    <motion.span
      variants={checkSpring}
      aria-hidden
      style={{
        width: 22,
        height: 22,
        borderRadius: 999,
        background: 'var(--color-teal)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2L4.8 8.5L9.5 3.5"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

function IconSquare() {
  return (
    <span
      aria-hidden
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        border: '1px dashed rgba(255,255,255,0.45)',
        flexShrink: 0,
        marginTop: 3,
      }}
    />
  );
}

// Headline word-by-word con clip-path mask vertical
function HeadlineWords({ reduced }: { reduced: boolean }) {
  const fragments = [
    { text: 'Anteproyecto · Fase 1', bold: true },
    { text: ' en curso', bold: false },
  ];

  if (reduced) {
    return (
      <>
        <span style={{ fontWeight: 700 }}>Anteproyecto · Fase 1</span> en curso
      </>
    );
  }

  return (
    <motion.span
      variants={wordStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{ display: 'inline-block' }}
    >
      {fragments.map((frag, fi) =>
        frag.text.split(' ').map((word, wi) => (
          <span
            key={`${fi}-${wi}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              marginRight: word.trim() ? '0.28em' : 0,
            }}
          >
            <motion.span
              variants={wordReveal}
              style={{
                display: 'inline-block',
                fontWeight: frag.bold ? 700 : 600,
              }}
            >
              {word.trim() || ' '}
            </motion.span>
          </span>
        ))
      )}
    </motion.span>
  );
}

// Counter 0→25
function PercentCounter({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [value, setValue] = useState(reduced ? 25 : 0);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - k, 3);
      setValue(Math.round(eased * 25));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--color-graphite)',
        letterSpacing: '0.04em',
      }}
    >
      {value} % / 100 %
    </span>
  );
}

export default function Section14Avances() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="container">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-12"
      >
        <motion.div variants={fadeUp} className="eyebrow-num mb-6">
          §15 / AVANCES DEL TRABAJO
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: 'var(--color-navy)',
            maxWidth: '22ch',
          }}
        >
          <HeadlineWords reduced={reduced} />
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6"
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '55ch',
          }}
        >
          {AVANCES.estado}
        </motion.p>
      </motion.div>

      {/* Bento 7 + 5 · clip-path simultáneo */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10"
      >
        {/* Col 7 · Realizado · entra desde left */}
        <motion.div
          variants={colLeft}
          className="lg:col-span-7 card-teal-soft"
          style={{
            padding: 36,
            border: '2px solid var(--color-teal)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: 'var(--color-teal)' }}
          >
            REALIZADO / 4 de 5 actividades
          </div>

          <motion.ul
            variants={realizedStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 6,
            }}
          >
            {AVANCES.realizado.map((item, i) => (
              <motion.li
                key={i}
                variants={realizedItem}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <IconCheck />
                <span
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: 'var(--color-navy)',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Col 5 · Pendiente · entra desde right */}
        <motion.div
          variants={colRight}
          className="lg:col-span-5 card-navy"
          style={{
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: 'var(--color-teal-soft)' }}
          >
            PENDIENTE / próximos pasos
          </div>

          <motion.ul
            variants={pendingStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginTop: 6,
            }}
          >
            {AVANCES.pendiente.map((item, i) => (
              <motion.li
                key={i}
                variants={pendingItem}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <IconSquare />
                <span
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Nota metodológica · destacada · scale + pulse box-shadow */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mb-12"
      >
        <motion.div
          variants={noteEnter}
          className="card-orange-soft"
          style={{
            padding: 32,
            display: 'flex',
            gap: 24,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
          animate={
            reduced
              ? undefined
              : {
                  boxShadow: [
                    '0 0 0 0 rgba(242,107,58,0.0)',
                    '0 0 28px 2px rgba(242,107,58,0.22)',
                    '0 0 0 0 rgba(242,107,58,0.0)',
                  ],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.9,
                }
          }
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(242,107,58,0.15)',
              color: 'var(--color-orange)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5" />
              <circle cx="12" cy="16.5" r="0.8" fill="currentColor" />
            </svg>
          </div>

          <div style={{ flex: '1 1 320px' }}>
            <div
              className="eyebrow"
              style={{ color: 'var(--color-orange)', marginBottom: 8 }}
            >
              Nota metodológica
            </div>
            <p
              style={{
                fontSize: 'clamp(17px, 1.6vw, 20px)',
                lineHeight: 1.5,
                color: 'var(--color-navy-deep)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                maxWidth: '70ch',
              }}
            >
              {AVANCES.notaImportante}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress bar global · scaleX con transform-origin left */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="eyebrow mb-4">
          Progreso global / 4 objetivos
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            position: 'relative',
            width: '100%',
            height: 12,
            background: 'var(--color-paper-soft)',
            borderRadius: 9999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: ENTER, delay: 0.2 }}
            style={{
              width: '25%',
              height: '100%',
              background: 'var(--color-teal)',
              borderRadius: 9999,
              boxShadow: '0 0 0 1px rgba(31,140,136,0.18) inset',
              transformOrigin: 'left center',
            }}
          />
          {/* dividers cada 25% */}
          {[25, 50, 75].map((p) => (
            <div
              key={p}
              style={{
                position: 'absolute',
                left: `${p}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'rgba(15,44,69,0.18)',
              }}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-4"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className="status-current">
              <span className="dot-pulse" />
              OBJ-01 EN CURSO
            </span>
            <span
              className="pill-ghost"
              style={{
                fontFamily: 'var(--font-mono)',
                padding: '4px 11px',
                fontSize: 11,
                letterSpacing: '0.08em',
              }}
            >
              OBJ-02-04 PENDIENTES
            </span>
          </div>
          <PercentCounter reduced={reduced} />
        </motion.div>
      </motion.div>
    </div>
  );
}
