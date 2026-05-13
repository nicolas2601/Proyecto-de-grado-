import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MARCO_NORMATIVO } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import RegulatoryTimeline from '@/components/ui/RegulatoryTimeline';

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

// ── Internacional card con hover-reveal del detalle ──
function InternacionalCard({
  n,
  reduced,
}: {
  n: { sigla: string; titulo: string; detalle: string };
  reduced: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={
        reduced
          ? undefined
          : { y: -2, transition: { duration: 0.32, ease: MOVE } }
      }
      className="card card-paper p-6 flex flex-col gap-3"
      style={{ willChange: 'transform', overflow: 'hidden' }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="pill"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'rgba(15,44,69,0.06)',
            color: 'var(--navy)',
            fontSize: '12px',
          }}
        >
          {n.sigla}
        </span>
        <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--navy)' }}>{n.titulo}</span>
        {'refs' in n && Array.isArray((n as any).refs) && (n as any).refs.length > 0 ? (
          <Cite refs={(n as any).refs} tone="paper" />
        ) : null}
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--charcoal)' }}>{n.detalle}</p>
      <AnimatePresence>
        {hover && !reduced && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: ENTER }}
            style={{
              fontSize: '12px',
              lineHeight: 1.5,
              color: 'var(--teal)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              borderTop: '1px solid rgba(31,140,136,0.18)',
              paddingTop: 8,
              marginTop: 2,
            }}
          >
            {n.sigla} · referente normativo internacional
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Section09MarcoNormativo() {
  const reduced = useReducedMotion() ?? false;

  // ── Shield columns variants ──
  const columnVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
  };

  // Pill scale 0.85 → 1 (después del padre)
  const pillVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: ENTER, delay: 0.2 },
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
            §09 / MARCO NORMATIVO
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
            Datos sensibles, <span className="hl-teal">regulación clara</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6"
            style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--charcoal)', maxWidth: '55ch' }}
          >
            El proyecto cumple normativa colombiana e internacional para el manejo ético de imágenes médicas.
          </motion.p>
        </motion.div>

        {/* ── TIMELINE NORMATIVO · vista de tiempo interactiva ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: ENTER }}
          className="mb-16"
        >
          <RegulatoryTimeline
            nacional={MARCO_NORMATIVO.nacional}
            internacional={MARCO_NORMATIVO.internacional}
          />
        </motion.div>

        {/* ── ESCUDO (shield) con outline animado y 3 columnas ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2, delayChildren: 0.1 },
            },
          }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mx-auto relative" style={{ maxWidth: 980 }}>
            <div
              className="card card-paper relative overflow-hidden"
              style={{
                padding: 0,
                borderRadius: 24,
                border: '1px solid rgba(15,44,69,0.18)',
                position: 'relative',
              }}
            >
              {/* Shield outline trazado con strokeDashoffset */}
              {!reduced && (
                <motion.svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <motion.rect
                    x="0.5"
                    y="0.5"
                    width="99"
                    height="99"
                    rx="6"
                    fill="none"
                    stroke="var(--teal)"
                    strokeWidth="0.4"
                    pathLength={1}
                    strokeDasharray="1"
                    initial={{ strokeDashoffset: 1, opacity: 0 }}
                    whileInView={{ strokeDashoffset: 0, opacity: 0.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.8, ease: ENTER, delay: 0.1 }}
                  />
                </motion.svg>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div variants={columnVariants} style={{ background: 'var(--navy)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>Privacidad y datos sensibles</div>
                </motion.div>
                <motion.div variants={columnVariants} style={{ background: 'var(--teal)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.9)' }}>Marco de telesalud</div>
                </motion.div>
                <motion.div variants={columnVariants} style={{ background: 'var(--orange)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.95)' }}>Ética y mitigación de sesgos</div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                  variants={columnVariants}
                  className="p-7 flex flex-col gap-4"
                  style={{ borderRight: '1px solid rgba(15,44,69,0.12)' }}
                >
                  <motion.span
                    variants={pillVariants}
                    className="pill flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      alignSelf: 'flex-start',
                      background: 'rgba(15,44,69,0.08)',
                      color: 'var(--navy)',
                      fontSize: '12px',
                      transformOrigin: 'left center',
                    }}
                  >
                    Ley 1581 · 2012
                    <Cite refs={['ley-1581-2012']} tone="paper" />
                  </motion.span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--navy)' }}>·</span><span>El modelo algorítmico no requiere datos identificables del paciente.</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--navy)' }}>·</span><span>El prototipo de laboratorio no almacenará las imágenes una vez evaluadas.</span></li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={columnVariants}
                  className="p-7 flex flex-col gap-4"
                  style={{ borderRight: '1px solid rgba(15,44,69,0.12)' }}
                >
                  <motion.span
                    variants={pillVariants}
                    className="pill flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      alignSelf: 'flex-start',
                      background: 'rgba(31,140,136,0.12)',
                      color: 'var(--teal)',
                      fontSize: '12px',
                      transformOrigin: 'left center',
                    }}
                  >
                    Ley 1419 · 2010
                    <Cite refs={['ley-1419-2010']} tone="paper" />
                  </motion.span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--teal)' }}>·</span><span>La herramienta se enmarca estrictamente como "apoyo a la decisión clínica".</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--teal)' }}>·</span><span>La responsabilidad diagnóstica final y vinculante recae siempre en el médico especialista humano.</span></li>
                  </ul>
                </motion.div>

                <motion.div variants={columnVariants} className="p-7 flex flex-col gap-4">
                  <motion.span
                    variants={pillVariants}
                    className="pill flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      alignSelf: 'flex-start',
                      background: 'rgba(242,107,58,0.12)',
                      color: 'var(--orange)',
                      fontSize: '12px',
                      transformOrigin: 'left center',
                    }}
                  >
                    Marco Ético IA · MinCiencias 2021
                    <Cite refs={['minciencias-2021']} tone="paper" />
                  </motion.span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--orange)' }}>·</span><span>Reconocimiento transparente del sesgo demográfico inherente en los datasets públicos.</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--orange)' }}>·</span><span>Identificación de la subrepresentación de fototipos oscuros (IV-V) prevalentes en la población colombiana.</span></li>
                  </ul>
                </motion.div>
              </div>

              <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute left-0 right-0 mx-auto" style={{ bottom: -22, width: 160, height: 30, filter: 'drop-shadow(0 4px 6px rgba(15,44,69,0.08))' }} aria-hidden="true">
                <path d="M0 0 L200 0 L100 40 Z" fill="var(--paper)" stroke="rgba(15,44,69,0.18)" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* ── REFERENTES INTERNACIONALES (hover-reveal) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow mb-6">Referentes internacionales</motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARCO_NORMATIVO.internacional.map((n) => (
              <InternacionalCard key={n.sigla} n={n} reduced={reduced} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── ÉTICA APLICADA · clip-path reveal horizontal ── */}
        <motion.div
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
          }
          whileInView={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: ENTER }}
          style={{ willChange: 'clip-path' }}
        >
          <div className="card card-navy p-8 md:p-10">
            <div className="eyebrow mb-4" style={{ color: 'rgba(199, 232, 230, 0.9)' }}>Ética aplicada</div>
            <p style={{ fontSize: 'clamp(18px, 1.4vw, 20px)', lineHeight: 1.5, color: '#fff', maxWidth: '70ch' }}>
              {MARCO_NORMATIVO.etica}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
