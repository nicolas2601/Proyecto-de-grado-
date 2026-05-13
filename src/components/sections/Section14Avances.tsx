import { motion } from 'framer-motion';
import { AVANCES } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function IconCheck() {
  return (
    <span
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
    </span>
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

export default function Section14Avances() {
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
          §14 / AVANCES DEL TRABAJO
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
          <span style={{ fontWeight: 700 }}>Anteproyecto · Fase 1</span> en curso
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

      {/* Bento 7 + 5 */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10"
      >
        {/* Col 7 · Realizado */}
        <motion.div
          variants={fadeUp}
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

          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 6,
            }}
          >
            {AVANCES.realizado.map((item, i) => (
              <li
                key={i}
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
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 5 · Pendiente */}
        <motion.div
          variants={fadeUp}
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

          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginTop: 6,
            }}
          >
            {AVANCES.pendiente.map((item, i) => (
              <li
                key={i}
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
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Nota metodológica · destacada */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mb-12"
      >
        <motion.div
          variants={fadeUp}
          className="card-orange-soft"
          style={{
            padding: 32,
            display: 'flex',
            gap: 24,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
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

      {/* Progress bar global */}
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
            initial={{ width: 0 }}
            whileInView={{ width: '25%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            style={{
              height: '100%',
              background: 'var(--color-teal)',
              borderRadius: 9999,
              boxShadow: '0 0 0 1px rgba(31,140,136,0.18) inset',
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-graphite)',
              letterSpacing: '0.04em',
            }}
            className="tabular-nums"
          >
            25 % / 100 %
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
