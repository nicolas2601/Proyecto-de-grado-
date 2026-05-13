import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REFERENCIAS } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Section15Referencias() {
  // Estado · qué grupos están expandidos
  const [expanded, setExpanded] = useState<boolean[]>(
    () => REFERENCIAS.map(() => false)
  );
  // Filtro · 'all' o nombre de grupo
  const [filter, setFilter] = useState<string>('all');

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const grupos = useMemo(() => REFERENCIAS.map((r) => r.grupo), []);

  const totalRefs = useMemo(
    () => REFERENCIAS.reduce((acc, g) => acc + g.items.length, 0),
    []
  );

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
          §15 / REFERENCIAS BIBLIOGRÁFICAS
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
          <span style={{ fontWeight: 700 }}>Bibliografía agrupada</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6"
          style={{
            fontSize: 'clamp(18px, 1.5vw, 20px)',
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '60ch',
          }}
        >
          Click en cada grupo para expandir las referencias completas.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-6"
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
        >
          <span
            className="pill"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(15,44,69,0.06)',
              color: 'var(--color-navy)',
              border: 0,
              fontSize: 12,
            }}
          >
            {REFERENCIAS.length} grupos
          </span>
          <span
            className="pill"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(31,140,136,0.10)',
              color: 'var(--color-teal)',
              border: 0,
              fontSize: 12,
            }}
          >
            {totalRefs} referencias
          </span>
        </motion.div>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mb-8"
      >
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'pill-navy' : 'pill-ghost'}
            style={{
              appearance: 'none',
              cursor: 'pointer',
              padding: '7px 14px',
              borderRadius: 9999,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Todas
          </button>
          {grupos.map((g) => {
            const active = filter === g;
            return (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={active ? 'pill-navy' : 'pill-ghost'}
                style={{
                  appearance: 'none',
                  cursor: 'pointer',
                  padding: '7px 14px',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {g}
              </button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Acordeón */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
        className="flex flex-col gap-3 mb-20"
      >
        {REFERENCIAS.map((grupo, i) => {
          if (filter !== 'all' && filter !== grupo.grupo) return null;
          const isOpen = expanded[i];
          return (
            <motion.div
              key={grupo.grupo}
              variants={fadeUp}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid var(--color-line)',
                boxShadow: 'var(--sh-sm)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  appearance: 'none',
                  background: isOpen
                    ? 'var(--color-paper-warm)'
                    : 'transparent',
                  border: 0,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '20px 24px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    className="pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: isOpen
                        ? 'var(--color-teal)'
                        : 'rgba(15,44,69,0.06)',
                      color: isOpen ? '#fff' : 'var(--color-navy)',
                      border: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '4px 11px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 18,
                      color: 'var(--color-navy)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {grupo.grupo}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: 'var(--color-graphite)',
                    }}
                  >
                    {grupo.items.length}{' '}
                    {grupo.items.length === 1 ? 'referencia' : 'referencias'}
                  </span>
                </div>

                <span
                  aria-hidden
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: isOpen ? 'var(--color-teal)' : '#fff',
                    border: isOpen
                      ? '1px solid var(--color-teal)'
                      : '1px solid var(--color-line)',
                    color: isOpen ? '#fff' : 'var(--color-navy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition:
                      'transform 280ms cubic-bezier(0.16, 1, 0.3, 1), background 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '24px 28px 28px 28px',
                        borderTop: '1px solid var(--color-line)',
                      }}
                    >
                      <ul
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {grupo.items.map((cita, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: 'flex',
                              gap: 14,
                              alignItems: 'flex-start',
                              paddingBlock: 14,
                              borderBottom:
                                idx < grupo.items.length - 1
                                  ? '1px solid var(--color-line)'
                                  : 'none',
                            }}
                          >
                            <span
                              className="pill"
                              style={{
                                fontFamily: 'var(--font-mono)',
                                background: 'rgba(15,44,69,0.06)',
                                color: 'var(--color-navy)',
                                border: 0,
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '3px 8px',
                                flexShrink: 0,
                                minWidth: 38,
                                justifyContent: 'center',
                              }}
                            >
                              [{String(idx + 1).padStart(2, '0')}]
                            </span>
                            <span
                              style={{
                                fontSize: 14.5,
                                lineHeight: 1.6,
                                color: 'var(--color-charcoal)',
                              }}
                            >
                              {cita}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Cierre cinematográfico */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="hairline-strong" style={{ marginBottom: 40 }} />

        <motion.div
          variants={fadeUp}
          className="card-navy-deep"
          style={{
            padding: 'clamp(48px, 8vw, 80px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <h3
            className="font-serif-it"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              maxWidth: '26ch',
              margin: 0,
            }}
          >
            Quedamos atentos
            <br />a sus preguntas.
          </h3>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '50ch',
              margin: 0,
            }}
          >
            La sustentación cubre el cierre del primer objetivo / el segundo
            objetivo se desarrolla en el siguiente sprint del proyecto.
          </p>

          <div
            style={{
              width: '100%',
              maxWidth: 540,
              height: 1,
              background: 'rgba(255,255,255,0.15)',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 32,
              width: '100%',
              maxWidth: 680,
              textAlign: 'left',
            }}
          >
            <div>
              <div
                className="eyebrow"
                style={{ color: 'var(--color-teal-soft)', marginBottom: 8 }}
              >
                Dirección
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#ffffff',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                Andrés Felipe Jerez Ariza / UNAB
              </div>
            </div>

            <div>
              <div
                className="eyebrow"
                style={{ color: 'var(--color-teal-soft)', marginBottom: 8 }}
              >
                Asesoría
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#ffffff',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                Karen Yaneth Sánchez Quiroga / KAUST
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 8,
            }}
          >
            <span
              className="pill-teal-solid"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                padding: '6px 13px',
                borderRadius: 9999,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              v2026.05.13
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                padding: '6px 13px',
                borderRadius: 9999,
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px dashed rgba(255,255,255,0.25)',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              OBJ-01 EN CURSO
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
