import { motion } from 'framer-motion';
import { INTRODUCCION } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

export default function Section01Introduccion() {
  return (
    <section id="introduccion" className="section bg-soft-navy relative">
      <div className="container">
        <motion.div {...fade(0)} className="eyebrow-num">
          §01 · INTRODUCCIÓN
        </motion.div>

        <motion.h2
          {...fade(0.08)}
          className="mt-4"
          style={{
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            maxWidth: '20ch',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: 'var(--color-navy)',
          }}
        >
          Las lesiones cutáneas son un reto de diagnóstico,{' '}
          <span className="hl-teal">
            especialmente donde el especialista escasea
          </span>
          .
        </motion.h2>

        {/* Pregunta evaluador */}
        <motion.div
          {...fade(0.16)}
          className="mt-6 flex items-center gap-3"
        >
          <span className="pill-ghost" style={{ fontSize: 12 }}>
            pregunta del evaluador
          </span>
          <span
            className="font-serif-it"
            style={{ color: 'var(--color-graphite)', fontSize: 18 }}
          >
            "¿de qué trata el proyecto?"
          </span>
        </motion.div>

        {/* Bento 7 + 5 */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            {...fade(0.24)}
            className="lg:col-span-7 card"
          >
            <div className="eyebrow">qué son · qué importan</div>
            <p
              className="mt-4"
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                maxWidth: '65ch',
                color: 'var(--color-charcoal)',
              }}
            >
              {INTRODUCCION.texto}
            </p>
          </motion.div>

          <motion.div
            {...fade(0.32)}
            className="lg:col-span-5 card-teal relative"
          >
            <div
              className="eyebrow"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              nuestra propuesta
            </div>
            <p
              className="mt-4"
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: '#ffffff',
                fontWeight: 400,
              }}
            >
              {INTRODUCCION.propuesta}
            </p>
            <div
              className="absolute"
              style={{ bottom: 24, right: 24 }}
            >
              <span className="pill-amber" style={{ fontSize: 12, padding: '6px 12px' }}>
                TRL 4
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer hairline + mini stats */}
        <motion.div
          {...fade(0.4)}
          className="mt-12 hairline pt-6 flex flex-wrap items-center gap-x-10 gap-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="dot-pulse" />
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                letterSpacing: '0.06em',
                color: 'var(--color-graphite)',
              }}
            >
              15 min · sustentación
            </span>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.06em',
              color: 'var(--color-graphite)',
            }}
          >
            4 fases CRISP-DM
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.06em',
              color: 'var(--color-teal)',
              fontWeight: 600,
            }}
          >
            OBJ-01 en curso
          </span>
        </motion.div>
      </div>
    </section>
  );
}
