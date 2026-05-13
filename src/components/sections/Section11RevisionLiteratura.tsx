import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { REVISION_LITERATURA } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import EvidenceMatrix from '@/components/ui/EvidenceMatrix';
import PriorityRanking from '@/components/ui/PriorityRanking';
import DatasetClassChart from '@/components/ui/DatasetClassChart';
import CoverageMatrix from '@/components/ui/CoverageMatrix';
import { ENTER } from '@/lib/motion';

// ─────────────────────────────────────────────────────────────────────────
// §11 · REVISIÓN DE LITERATURA
// Metodología de revisión · bases consultadas · hallazgos · brechas
// Estructura: hero con resumen + grid metodología + grid bases + tabla
// hallazgos + lista brechas. Tono neutral académico. Refs en cada hallazgo.
// ─────────────────────────────────────────────────────────────────────────

function WordReveal({
  text,
  delay = 0,
  stagger = 0.035,
  className,
  style,
  as: As = 'h2',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  if (reduced) return <As className={className} style={style}>{text}</As>;
  return (
    <As className={className} style={{ ...style, display: 'block' }} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', overflow: 'hidden', paddingBlock: '0.16em', marginBlock: '-0.16em', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.85, ease: ENTER, delay: delay + i * stagger }}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </As>
  );
}

export default function Section11RevisionLiteratura() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: '#0F2C45',
        color: '#FFFFFF',
        paddingBlock: 'clamp(56px, 7vw, 104px)',
        overflow: 'clip',
      }}
    >
      {/* ── Ambient mesh gradient ─────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 22%, rgba(31,140,136,0.18) 0%, transparent 55%), radial-gradient(ellipse at 82% 78%, rgba(242,107,58,0.10) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Eyebrow ──────────────────────────────────── */}
        <motion.div
          style={{ y: headerY }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: ENTER }}
            className="flex items-center gap-3 mb-8"
          >
            <span style={eyebrowDigit}>§10</span>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.22)' }} />
            <span style={{ ...eyebrowDigit, color: '#7CD1CE' }}>Revisión de literatura</span>
          </motion.div>

          <WordReveal
            text="Cómo y dónde buscamos para llegar a este proyecto."
            as="h2"
            className="font-serif-it"
            style={{
              fontFamily: "'Instrument Serif', 'Lyon Text', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.9rem, 4.4vw, 3.4rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              maxWidth: '20ch',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
            className="mt-7"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '58ch',
              fontWeight: 400,
              letterSpacing: '-0.005em',
            }}
          >
            {REVISION_LITERATURA.resumen}
          </motion.p>
        </motion.div>

        {/* ── Bloque 1 · Metodología (4 pasos) ──────────── */}
        <div className="mb-20">
          <SubHeader title="Metodología empleada" count="04" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVISION_LITERATURA.metodologia.map((m, i) => (
              <motion.div
                key={m.paso}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, ease: ENTER, delay: i * 0.08 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 14,
                  padding: '22px 22px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 16,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.32)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13.5,
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    color: '#FFFFFF',
                    marginBottom: 10,
                  }}
                >
                  {m.paso}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.72)',
                  }}
                >
                  {m.detalle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bloque 2 · Bases de datos consultadas ─────── */}
        <div className="mb-20">
          <SubHeader title="Bases consultadas" count={String(REVISION_LITERATURA.bases.length).padStart(2, '0')} />
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {REVISION_LITERATURA.bases.map((b, i) => (
              <motion.div
                key={b.nombre}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.55, ease: ENTER, delay: i * 0.05 }}
                className="grid grid-cols-[42px_1fr_1.6fr] md:grid-cols-[60px_220px_1fr] items-center"
                style={{
                  padding: '16px 18px',
                  borderBottom:
                    i < REVISION_LITERATURA.bases.length - 1
                      ? '1px solid rgba(255,255,255,0.06)'
                      : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.42)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {b.nombre}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.5,
                  }}
                >
                  {b.alcance}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bloque 3 · Matriz de evidencia · interactiva ────────── */}
        <div className="mb-12">
          <SubHeader
            title="Cruce hallazgos × referencias"
            count={String(REVISION_LITERATURA.hallazgos.length).padStart(2, '0')}
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER }}
          >
            <EvidenceMatrix rows={REVISION_LITERATURA.hallazgos} tone="navy" />
          </motion.div>
        </div>

        {/* ── Bloque 4 · Hallazgos clave · detalle ─────────────── */}
        <div className="mb-20">
          <SubHeader title="Hallazgos por eje" count={String(REVISION_LITERATURA.hallazgos.length).padStart(2, '0')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVISION_LITERATURA.hallazgos.map((h, i) => (
              <motion.article
                key={h.eje}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.75, ease: ENTER, delay: i * 0.07 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16,
                  padding: '24px 26px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#7CD1CE',
                    }}
                  >
                    Eje · {String(i + 1).padStart(2, '0')}
                  </span>
                  <Cite refs={h.refs} tone="navy" />
                </div>
                <h4
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: '#FFFFFF',
                    margin: 0,
                  }}
                >
                  {h.eje}
                </h4>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.78)',
                    margin: 0,
                  }}
                >
                  {h.sintesis}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Bloque EDA · Análisis exploratorio cruzado · datos del notebook ── */}
        <div className="mb-20">
          <SubHeader title="Análisis exploratorio cruzado · Santander × datasets" count="03" />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.6, ease: ENTER }}
            className="mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '70ch',
            }}
          >
            EDA reproducible · notebook <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, color: '#7CD1CE' }}>objetivo1_eda_COLAB.ipynb</code> · semilla 42 · fuente epidemiológica integrada Santander 2018–2025.
          </motion.p>

          {/* 1 · Ranking santander */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="mb-6"
          >
            <PriorityRanking />
          </motion.div>

          {/* 2 · Distribución de clases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.1 }}
            className="mb-6"
          >
            <DatasetClassChart />
          </motion.div>

          {/* 3 · Matriz de cobertura */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.2 }}
          >
            <CoverageMatrix />
          </motion.div>
        </div>

        {/* ── Bloque 5 · Brechas identificadas ──────────── */}
        <div>
          <SubHeader title="Brechas que sustentan el proyecto" count={String(REVISION_LITERATURA.brechas.length).padStart(2, '0')} />
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REVISION_LITERATURA.brechas.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.55, ease: ENTER, delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '16px 20px',
                  background: 'rgba(242,107,58,0.08)',
                  border: '1px solid rgba(242,107,58,0.20)',
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#F26B3A',
                    letterSpacing: '0.04em',
                    minWidth: 22,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.86)',
                  }}
                >
                  {b}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const eyebrowDigit: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
};

function SubHeader({ title, count }: { title: string; count: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between flex-wrap gap-3">
      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: '-0.01em',
          color: '#FFFFFF',
        }}
      >
        {title}
      </h3>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        {count} · ítems
      </span>
    </div>
  );
}
