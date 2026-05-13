import { motion, useReducedMotion } from 'framer-motion';
import { MARCO_TEORICO, CLASES_DERMATOLOGICAS, COMPARATIVA_SUPERVISADO_SSL } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import ApproachCompare from '@/components/ui/ApproachCompare';

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

function pillForTipo(tipo: string) {
  if (tipo === 'Maligna') return 'pill pill-orange';
  if (tipo === 'Precancerosa') return 'pill pill-amber';
  return 'pill pill-teal-soft';
}

const IconLupa = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="17" cy="17" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M25 25l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 17h8M17 13v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const IconNeural = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="8" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="28" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="28" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 12L17.5 19M10.5 28L17.5 21M22.5 19L29.5 12M22.5 21L29.5 28" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
);

const IconBranches = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 11v3M20 14L8 21M20 14v7M20 14l12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M5 32h6M17 32h6M29 32h6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

// ── Siglas priorizadas BCC/SCC/MEL (pulse soft) ──
const PRIORITIZED = new Set(['BCC', 'SCC', 'MEL']);

export default function Section08MarcoTeorico() {
  const reduced = useReducedMotion() ?? false;

  // ── Pilares: SSL (destacada) recibe delay extra ──
  const pillarVariant = (isHighlight: boolean) => ({
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 28, scale: 0.96 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.78,
            ease: ENTER,
            delay: isHighlight ? 0.2 : 0,
          },
        },
  });

  // ── Fases evolutivo: stagger 250ms ──
  const phaseVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
  };

  // ── Tabla 8 clases: wave horizontal left → right ──
  // grid 4x2 → idx 0,1,2,3 (row 1) y 4,5,6,7 (row 2)
  const classWave = (i: number) => ({
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: -16, y: 12, scale: 0.96 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: ENTER,
            delay: (i % 4) * 0.08,
          },
        },
  });

  return (
    <section className="section bg-soft-navy">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow-num mb-6">
            §08 / MARCO TEÓRICO-CONCEPTUAL
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
            Tres pilares para entender la solución
          </motion.h2>
        </motion.div>

        {/* ── 3 PILARES con SSL delay extra ───────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          {MARCO_TEORICO.map((p) => {
            const isHighlight = 'destacado' in p && p.destacado;
            if (isHighlight) {
              return (
                <motion.article
                  key={p.titulo}
                  variants={pillarVariant(true)}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }
                  }
                  animate={
                    !reduced
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(31,140,136,0)',
                            '0 0 0 12px rgba(31,140,136,0.10)',
                            '0 0 0 0 rgba(31,140,136,0)',
                          ],
                        }
                      : undefined
                  }
                  transition={
                    !reduced
                      ? { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }
                      : undefined
                  }
                  className="card card-teal p-8 flex flex-col gap-4"
                  style={{ willChange: 'transform' }}
                >
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.pilar}</div>
                  <h3 style={{ fontSize: 'clamp(24px, 2vw, 28px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#fff' }}>{p.titulo}</h3>
                  <p style={{ fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.92)' }}>{p.contenido}</p>
                  {'refs' in p && Array.isArray((p as any).refs) && (p as any).refs.length > 0 ? (
                    <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      <Cite refs={(p as any).refs} tone="white" />
                    </div>
                  ) : null}
                  <span className="pill pill-amber mt-auto self-start">Eje central del proyecto</span>
                </motion.article>
              );
            }
            return (
              <motion.article
                key={p.titulo}
                variants={pillarVariant(false)}
                whileHover={
                  reduced
                    ? undefined
                    : { y: -3, transition: { type: 'spring', stiffness: 280, damping: 22 } }
                }
                className="card card-paper p-8 flex flex-col gap-4"
                style={{ willChange: 'transform' }}
              >
                <div className="eyebrow" style={{ color: 'var(--teal)' }}>{p.pilar}</div>
                <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--navy)' }}>{p.titulo}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.55, color: 'var(--charcoal)' }}>{p.contenido}</p>
                {'refs' in p && Array.isArray((p as any).refs) && (p as any).refs.length > 0 ? (
                  <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Cite refs={(p as any).refs} tone="paper" />
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── ESPECTRO EVOLUTIVO ─────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.25, delayChildren: 0.05 } },
          }}
          className="mb-24"
        >
          <motion.h3
            variants={fadeUp}
            className="font-display mb-12"
            style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'var(--navy)',
              maxWidth: '20ch',
            }}
          >
            Espectro Evolutivo del Diagnóstico
          </motion.h3>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <motion.div
                variants={phaseVariants}
                whileHover={
                  reduced ? undefined : { y: -2, transition: { duration: 0.32, ease: MOVE } }
                }
                className="card card-paper p-7 flex flex-col gap-4"
                style={{ border: '1px solid var(--navy)', willChange: 'transform' }}
              >
                <div className="flex items-center justify-between">
                  <div className="eyebrow" style={{ color: 'var(--navy)' }}>Fase 1</div>
                  <div style={{ color: 'var(--navy)', opacity: 0.7 }}><IconLupa /></div>
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.2, color: 'var(--navy)' }}>Método Clínico</h4>
                <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--charcoal)' }}>
                  Inspección visual (Regla ABCDE) y biopsias. Lento, invasivo y altamente subjetivo.
                </p>
                <div className="mt-auto pt-2">
                  <Cite refs={['pathania-2022']} tone="paper" />
                </div>
              </motion.div>

              <motion.div
                variants={phaseVariants}
                whileHover={
                  reduced ? undefined : { y: -2, transition: { duration: 0.32, ease: MOVE } }
                }
                className="card card-paper p-7 flex flex-col gap-4"
                style={{ border: '1px solid var(--navy)', willChange: 'transform' }}
              >
                <div className="flex items-center justify-between">
                  <div className="eyebrow" style={{ color: 'var(--navy)' }}>Fase 2</div>
                  <div style={{ color: 'var(--navy)', opacity: 0.7 }}><IconNeural /></div>
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.2, color: 'var(--navy)' }}>IA Supervisada</h4>
                <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--charcoal)' }}>
                  Precisión superior al 90 %, pero exige miles de imágenes etiquetadas manualmente por dermatólogos, lo cual es costoso y escaso.
                </p>
                <div className="mt-auto pt-2">
                  <Cite refs={['chaturvedi-2020', 'sauter-2023']} tone="paper" />
                </div>
              </motion.div>

              <motion.div
                variants={phaseVariants}
                whileHover={
                  reduced ? undefined : { y: -2, transition: { duration: 0.32, ease: MOVE } }
                }
                animate={
                  !reduced
                    ? {
                        boxShadow: [
                          '0 0 0 0 rgba(31,140,136,0)',
                          '0 0 0 14px rgba(31,140,136,0.12)',
                          '0 0 0 0 rgba(31,140,136,0)',
                        ],
                      }
                    : undefined
                }
                transition={
                  !reduced
                    ? { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }
                    : undefined
                }
                className="card card-teal-soft p-7 flex flex-col gap-4 relative"
                style={{ border: '2px solid var(--teal)', willChange: 'transform' }}
              >
                <div className="flex items-center justify-between">
                  <div className="eyebrow" style={{ color: 'var(--teal)' }}>Fase 3</div>
                  <div style={{ color: 'var(--teal)' }}><IconBranches /></div>
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.2, color: 'var(--navy)' }}>
                  Aprendizaje Autosupervisado / Nuestra Base
                </h4>
                <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--navy)' }}>
                  Extrae representaciones y patrones morfológicos subyacentes desde imágenes crudas y no etiquetadas mediante estrategias contrastivas. Es la solución técnica ideal para entornos con escasez de datos.
                </p>
                <div className="mt-auto pt-2">
                  <Cite refs={['krishnan-2022', 'dino-2024', 'ieee-10647641']} tone="paper" />
                </div>
              </motion.div>
            </div>

            {/* SVG flecha animada strokeDashoffset (fase 2 → fase 3) */}
            <motion.svg
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { delay: 0.55 } },
              }}
              viewBox="0 0 1000 30"
              preserveAspectRatio="none"
              className="hidden md:block w-full mt-4"
              style={{ height: 30 }}
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="15"
                x2="970"
                y2="15"
                stroke="var(--navy)"
                strokeWidth="1"
                strokeDasharray="970"
                variants={{
                  hidden: { strokeDashoffset: 970 },
                  show: reduced
                    ? { strokeDashoffset: 0, transition: { duration: 0.3 } }
                    : { strokeDashoffset: 0, transition: { duration: 1.4, ease: ENTER } },
                }}
                opacity="0.35"
              />
              <motion.path
                d="M970 15 L955 8 L955 22 Z"
                fill="var(--teal)"
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  show: reduced
                    ? { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                    : { opacity: 1, scale: 1, transition: { duration: 0.4, ease: ENTER, delay: 1.2 } },
                }}
                style={{ transformOrigin: '963px 15px' }}
              />
            </motion.svg>
          </div>
        </motion.div>

        {/* ── TABLA 8 CLASES · wave horizontal ─────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="eyebrow mb-6">
            Clasificación de lesiones / Tabla 1 del anteproyecto
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {CLASES_DERMATOLOGICAS.map((c, i) => {
              const isPriority = PRIORITIZED.has(c.sigla);
              return (
                <motion.div
                  key={c.sigla}
                  variants={classWave(i)}
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          scale: 1.04,
                          transition: { type: 'spring', stiffness: 320, damping: 22 },
                        }
                  }
                  animate={
                    !reduced && isPriority
                      ? {
                          opacity: [0.85, 1, 0.85],
                        }
                      : undefined
                  }
                  transition={
                    !reduced && isPriority
                      ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 + i * 0.1 }
                      : undefined
                  }
                  className="card card-paper p-4 flex flex-col gap-2"
                  style={{ willChange: 'transform', cursor: 'default' }}
                >
                  <span
                    className="pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      alignSelf: 'flex-start',
                      background: 'rgba(15, 44, 69, 0.06)',
                      color: 'var(--navy)',
                      fontSize: '12px',
                    }}
                  >
                    {c.sigla}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.25, color: 'var(--navy)' }}>
                    {c.nombre}
                  </span>
                  <span className={pillForTipo(c.tipo)} style={{ alignSelf: 'flex-start', fontSize: '11px', padding: '2px 8px' }}>
                    {c.tipo}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3" style={{ fontSize: '15px', color: 'var(--charcoal)' }}>
            <span className="pill pill-teal-solid" style={{ fontFamily: 'var(--font-mono)' }}>BCC / SCC / MEL</span>
            <span>son las clases priorizadas por epidemiología regional.</span>
          </motion.div>
        </motion.div>

        {/* Comparativa Supervisado vs SSL · tabla técnica · 4 ejes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTER }}
          className="mt-16"
        >
          <div className="mb-5 flex items-baseline justify-between flex-wrap gap-3">
            <h3
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--navy)',
              }}
            >
              Por qué SSL y no aprendizaje supervisado tradicional
            </h3>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--charcoal)',
              }}
            >
              {String(COMPARATIVA_SUPERVISADO_SSL.length).padStart(2, '0')} · ejes
            </span>
          </div>
          <ApproachCompare
            rows={COMPARATIVA_SUPERVISADO_SSL}
            refs={['krishnan-2022', 'hammimou-2025', 'ieee-10647641']}
          />
        </motion.div>
      </div>
    </section>
  );
}
