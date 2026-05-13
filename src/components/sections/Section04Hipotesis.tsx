import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HIPOTESIS } from '@/data/content';
import HypothesisCards from '@/components/ui/HypothesisCards';
import { ENTER } from '@/lib/motion';

// ─────────────────────────────────────────────────────────────────────────
// §04 · HIPÓTESIS Y SUPUESTOS
// Hero · enunciado editorial · tabla 3 supuestos × validación esperada con refs
// Skills: impeccable, ui-animation (word-stagger), high-end-visual-design (eyebrow,
// double-bezel), minimalist-ui (editorial serif + monospace data), gsap-scrolltrigger
// ─────────────────────────────────────────────────────────────────────────

function WordReveal({
  text,
  delay = 0,
  stagger = 0.045,
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
  if (reduced) {
    return (
      <As className={className} style={style}>
        {text}
      </As>
    );
  }
  return (
    <As className={className} style={{ ...style, display: 'block' }} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', overflow: 'hidden', paddingBlock: '0.18em', marginBlock: '-0.18em', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.95, ease: ENTER, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </As>
  );
}

export default function Section04Hipotesis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: '#F1F4F4',
        color: '#0F2C45',
        paddingBlock: 'clamp(56px, 7vw, 104px)',
        overflow: 'clip',
      }}
    >
      {/* ── Grid texture · ambient ─────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,44,69,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,44,69,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Eyebrow ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: ENTER }}
          className="flex items-center gap-3 mb-12"
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#4D5B6D',
            }}
          >
            §04
          </span>
          <span style={{ width: 32, height: 1, background: 'rgba(15,44,69,0.25)' }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#1F8C88',
            }}
          >
            Hipótesis y supuestos
          </span>
        </motion.div>

        {/* ── Enunciado · editorial serif ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 mb-20">
          <WordReveal
            text={HIPOTESIS.enunciado}
            as="h2"
            stagger={0.028}
            className="font-serif-it"
            style={{
              fontFamily: "'Instrument Serif', 'Lyon Text', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.7rem, 4.2vw, 3rem)',
              letterSpacing: '-0.015em',
              lineHeight: 1.12,
              color: '#0F2C45',
              maxWidth: '22ch',
            }}
          />
          <motion.aside
            style={{ y: parallax }}
            className="hidden lg:block self-end"
          >
            <div
              style={{
                padding: '20px 22px',
                background: 'rgba(15,44,69,0.04)',
                border: '1px solid rgba(15,44,69,0.10)',
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#4D5B6D',
                  marginBottom: 8,
                }}
              >
                Enfoque
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#0F2C45',
                }}
              >
                {HIPOTESIS.enfoque}
              </div>
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(15,44,69,0.08)',
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: '#4D5B6D',
                }}
              >
                La hipótesis es conceptual; los supuestos se validan empíricamente en las fases experimentales.
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ── Tabla supuestos · 3 × validación ─────── */}
        <div className="mb-6 flex items-center justify-between">
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: '-0.01em',
              color: '#0F2C45',
            }}
          >
            Supuestos operativos
          </h3>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4D5B6D',
            }}
          >
            03 · validables
          </span>
        </div>

        <HypothesisCards supuestos={HIPOTESIS.supuestos} />

        {/* ── Footer note ──────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.4 }}
          className="mt-10"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            lineHeight: 1.6,
            color: '#4D5B6D',
            maxWidth: '62ch',
          }}
        >
          Los supuestos S1 y S2 son específicos al paradigma SSL; S3 es un supuesto operativo sobre los datasets disponibles. Cada uno tiene un mecanismo de validación trazable a los objetivos específicos del proyecto.
        </motion.p>
      </div>
    </div>
  );
}

