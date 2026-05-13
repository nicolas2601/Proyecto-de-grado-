import { motion, useReducedMotion } from 'framer-motion';
import { ANTECEDENTES_NIVEL } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import type { ReactNode } from 'react';

const ENTER = [0.22, 1, 0.36, 1] as const;
const MOVE = [0.25, 1, 0.5, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

type Row = {
  enfoque: string;
  enfoqueBold?: boolean;
  tecnologia: string;
  datos: string;
  contexto: ReactNode;
  highlight?: boolean;
  refs?: readonly string[];
};

const TABLA_ROWS: Row[] = [
  {
    enfoque: 'PanDerm / DINO (Yan et al., 2025)',
    tecnologia: 'Arquitecturas SSL multimodales',
    datos: 'Requiere recursos masivos (2 M imágenes)',
    contexto: (
      <>
        Estado del Arte mundial, pero evaluado principalmente en poblaciones{' '}
        <strong style={{ fontWeight: 600 }}>caucásicas</strong> y hospitales de primer nivel.
      </>
    ),
    refs: ['panderm-2025', 'dino-2024'],
  },
  {
    enfoque: 'U. Andes / U. Pamplona',
    tecnologia: 'Machine Learning clásico (SVM, KNN) y CNN',
    datos: 'Dependencia absoluta de etiquetas',
    contexto:
      'Logran alta precisión teórica, pero los procesos de anotación experta son costosos e inescalables en Colombia.',
    refs: ['chaturvedi-2020', 'hammimou-2025'],
  },
  {
    enfoque: 'Algoritmo de Tesis (Santander)',
    enfoqueBold: true,
    tecnologia: 'Algoritmo SSL + Fine-Tuning (TRL 4)',
    datos: 'Entrenado sin etiquetas masivas',
    contexto: (
      <>
        <strong style={{ fontWeight: 700, color: 'var(--navy)' }}>EL VACÍO CLÍNICO:</strong>{' '}
        Aplicación de SSL para superar la escasez de datos dermatológicos en entornos regionales de bajos recursos.
      </>
    ),
    highlight: true,
    refs: ['krishnan-2022', 'barlow-2024', 'ham10000-2018'],
  },
];

const HEADERS = [
  'Enfoque de investigación',
  'Tecnología principal',
  'Requisito de datos',
  'Contexto y limitaciones',
];

export default function Section10Antecedentes() {
  const reduced = useReducedMotion() ?? false;

  // ── Row variants: stagger 200ms ──
  const rowVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
  };

  // ── Highlight row · border draw ──
  const highlightBorder = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 28 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.85, ease: ENTER },
        },
  };

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow-num mb-6">
            §11 / ANTECEDENTES
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              maxWidth: '20ch',
            }}
          >
            Estado del arte: <span className="hl-orange">un vacío que cubrir</span>.
          </motion.h2>
        </motion.div>

        {/* ── TABLA COMPARATIVA con stagger 200ms ──── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
          }}
          className="mb-24"
        >
          <div className="hidden md:block">
            <motion.div
              variants={rowVariants}
              className="card card-navy"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr',
                padding: '18px 24px',
                gap: '16px',
                borderRadius: '14px 14px 0 0',
              }}
            >
              {HEADERS.map((h) => (
                <div key={h} className="eyebrow" style={{ color: 'rgba(199,232,230,0.95)' }}>{h}</div>
              ))}
            </motion.div>

            {TABLA_ROWS.map((row, idx) => (
              <motion.div
                key={row.enfoque}
                variants={row.highlight ? highlightBorder : rowVariants}
                className={row.highlight ? 'card card-teal-soft' : 'card card-paper'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr',
                  padding: '22px 24px',
                  gap: '16px',
                  borderRadius: idx === TABLA_ROWS.length - 1 ? '0 0 14px 14px' : 0,
                  border: row.highlight ? '2px solid var(--teal)' : '1px solid rgba(15,44,69,0.1)',
                  borderTop: idx === 0 ? 'none' : undefined,
                  position: 'relative',
                  willChange: 'transform',
                }}
              >
                {/* Glow pulse en la row destacada */}
                {row.highlight && !reduced && (
                  <motion.span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: 14,
                      pointerEvents: 'none',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(31,140,136,0)',
                        '0 0 0 10px rgba(31,140,136,0.10)',
                        '0 0 0 0 rgba(31,140,136,0)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  />
                )}
                <div style={{ fontSize: '15px', fontWeight: row.enfoqueBold ? 700 : 600, color: 'var(--navy)', lineHeight: 1.35, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
                  <span>{row.enfoque}</span>
                  {row.refs && row.refs.length > 0 && (
                    <Cite refs={row.refs as string[]} tone="paper" />
                  )}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.45, color: 'var(--charcoal)' }}>{row.tecnologia}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.45, color: 'var(--charcoal)' }}>{row.datos}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.5, color: row.highlight ? 'var(--navy)' : 'var(--charcoal)' }}>
                  {row.highlight ? (
                    <>
                      <motion.strong
                        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                        whileInView={
                          reduced
                            ? { opacity: 1 }
                            : { opacity: 1, scale: 1 }
                        }
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: ENTER, delay: 0.7 }}
                        animate={
                          !reduced
                            ? {
                                textShadow: [
                                  '0 0 0px rgba(31,140,136,0)',
                                  '0 0 8px rgba(31,140,136,0.4)',
                                  '0 0 0px rgba(31,140,136,0)',
                                ],
                              }
                            : undefined
                        }
                        style={{ fontWeight: 700, color: 'var(--navy)', display: 'inline-block' }}
                      >
                        EL VACÍO CLÍNICO:
                      </motion.strong>{' '}
                      Aplicación de SSL para superar la escasez de datos dermatológicos en entornos regionales de bajos recursos.
                    </>
                  ) : (
                    row.contexto
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {TABLA_ROWS.map((row) => (
              <motion.div
                key={row.enfoque}
                variants={row.highlight ? highlightBorder : rowVariants}
                className={row.highlight ? 'card card-teal-soft' : 'card card-paper'}
                style={{
                  padding: '18px',
                  border: row.highlight ? '2px solid var(--teal)' : '1px solid rgba(15,44,69,0.1)',
                  willChange: 'transform',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: row.enfoqueBold ? 700 : 600, color: 'var(--navy)', marginBottom: 12 }}>
                  {row.enfoque}
                </div>
                <div className="flex flex-col gap-2" style={{ fontSize: '13px' }}>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Tecnología</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.tecnologia}</div>
                  </div>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Datos</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.datos}</div>
                  </div>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Contexto</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.contexto}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── BLOQUE 1 · Estudios internacionales · grid uniforme ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          className="mb-8"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-baseline justify-between flex-wrap gap-3"
          >
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                fontWeight: 600,
                color: 'var(--navy)',
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              {ANTECEDENTES_NIVEL.internacional.titulo}
            </h3>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--color-graphite)',
              }}
            >
              {String(
                ANTECEDENTES_NIVEL.internacional.estudios.length
              ).padStart(2, '0')}{' '}
              · estudios
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ANTECEDENTES_NIVEL.internacional.estudios.map((e) => (
              <motion.div
                key={e.nombre}
                variants={{
                  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
                  show: reduced
                    ? { opacity: 1, transition: { duration: 0.4 } }
                    : { opacity: 1, y: 0, transition: { duration: 0.6, ease: ENTER } },
                }}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        y: -3,
                        transition: { type: 'spring', stiffness: 320, damping: 22 },
                      }
                }
                className="card card-paper p-5 flex flex-col gap-3"
                style={{
                  ...(e.destacado ? { borderLeft: '3px solid var(--teal)' } : {}),
                  willChange: 'transform',
                  minHeight: 200,
                }}
              >
                <span
                  className="pill"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    alignSelf: 'flex-start',
                    background: 'rgba(15,44,69,0.06)',
                    color: 'var(--navy)',
                    fontSize: 11,
                    padding: '3px 9px',
                  }}
                >
                  {e.origen}
                </span>
                <h4
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'var(--navy)',
                  }}
                >
                  {e.nombre}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: 'var(--charcoal)',
                    flex: 1,
                  }}
                >
                  {e.aporte}
                </p>
                {'refs' in e && Array.isArray(e.refs) && e.refs.length > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 4,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Cite refs={e.refs as string[]} tone="paper" />
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── BLOQUE 2 · Limitación · Nacional · Valor Agregado · alturas iguales ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ alignItems: 'stretch' }}
        >
          {/* Limitación internacional */}
          <motion.div
            variants={fadeUp}
            className="card card-orange-soft p-6 flex flex-col gap-3"
            style={{ border: '1px solid rgba(242,107,58,0.25)' }}
          >
            <div className="eyebrow" style={{ color: 'var(--orange)' }}>
              Limitación internacional
            </div>
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--navy)',
                lineHeight: 1.25,
              }}
            >
              Sesgo poblacional documentado
            </h4>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                color: 'var(--charcoal)',
              }}
            >
              {ANTECEDENTES_NIVEL.internacional.limitacion}
            </p>
          </motion.div>

          {/* Nacional */}
          <motion.div
            variants={fadeUp}
            whileHover={
              reduced
                ? undefined
                : { y: -3, transition: { type: 'spring', stiffness: 320, damping: 22 } }
            }
            className="card card-paper p-6 flex flex-col gap-4"
            style={{ willChange: 'transform' }}
          >
            <div className="eyebrow" style={{ color: 'var(--teal)' }}>
              {ANTECEDENTES_NIVEL.nacional.titulo}
            </div>
            <p
              style={{
                fontSize: 15.5,
                lineHeight: 1.55,
                color: 'var(--charcoal)',
                flex: 1,
              }}
            >
              {ANTECEDENTES_NIVEL.nacional.texto}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="pill pill-ghost" style={{ fontSize: 12 }}>
                CNN supervisado
              </span>
              <span className="pill pill-ghost" style={{ fontSize: 12 }}>
                ML tradicional
              </span>
              <span className="pill pill-orange" style={{ fontSize: 12 }}>
                sin SSL
              </span>
            </div>
          </motion.div>

          {/* Valor agregado · card-teal */}
          <motion.div
            variants={fadeUp}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 24 }
            }
            whileInView={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: ENTER, delay: 0.35 }}
            animate={
              !reduced
                ? {
                    boxShadow: [
                      '0 0 0 0 rgba(31,140,136,0)',
                      '0 0 0 12px rgba(31,140,136,0.18)',
                      '0 0 0 0 rgba(31,140,136,0)',
                    ],
                  }
                : undefined
            }
            className="card card-teal p-6 flex flex-col gap-4"
            style={{ willChange: 'transform' }}
          >
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {ANTECEDENTES_NIVEL.valorAgregado.titulo}
            </div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: '#fff',
                flex: 1,
              }}
            >
              {ANTECEDENTES_NIVEL.valorAgregado.texto}
            </p>
            <span className="pill pill-amber self-start">
              primera aplicación en Colombia
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
