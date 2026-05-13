import { motion } from 'framer-motion';
import { PREGUNTA } from '@/data/content';
import CoherenceBridge from '@/components/ui/CoherenceBridge';
import { ENTER } from '@/lib/motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: ENTER, delay },
});


export default function Section03Pregunta() {
  return (
    <section
      id="pregunta"
      className="section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #061A2C 0%, #0F2C45 60%, #0A2238 100%)',
        color: '#ffffff',
      }}
    >
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0"
        style={{ opacity: 0.35 }}
      />
      {/* Soft teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: '-30%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(circle, rgba(31,140,136,0.16) 0%, transparent 60%)',
          filter: 'blur(48px)',
        }}
      />

      <div className="container relative">
        {/* Header limpio */}
        <motion.div
          {...fadeUp(0)}
          className="eyebrow-num"
          style={{ color: '#7CD1CE' }}
        >
          §03 · PREGUNTA DE INVESTIGACIÓN
        </motion.div>

        {/* Pregunta central · una sola pieza tipográfica · respira */}
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            lineHeight: 1.25,
            color: '#FFFFFF',
            maxWidth: '32ch',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          ¿Cómo diseñar un algoritmo de inteligencia artificial basado en{' '}
          <span
            style={{
              color: '#7CD1CE',
              fontWeight: 600,
              borderBottom: '2px solid #7CD1CE',
              paddingBottom: 2,
            }}
          >
            aprendizaje autosupervisado
          </span>{' '}
          (SSL) para la detección de lesiones cutáneas que apoye el diagnóstico
          clínico en{' '}
          <span
            style={{
              color: '#7CD1CE',
              fontWeight: 600,
              borderBottom: '2px solid #7CD1CE',
              paddingBottom: 2,
            }}
          >
            Santander
          </span>
          ?
        </motion.h2>

        {/* Alcance · card-teal-soft sin animación clip-path */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10"
          style={{
            background: 'rgba(124,209,206,0.10)',
            border: '1px solid rgba(124,209,206,0.28)',
            borderRadius: 14,
            padding: '20px 24px',
            maxWidth: 880,
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: '#7CD1CE',
              marginBottom: 8,
            }}
          >
            Alcance de la pregunta
          </div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
            }}
          >
            {PREGUNTA.alcance}
          </p>
        </motion.div>

        {/* Tabla coherencia · problema → respuesta */}
        <div className="mt-14">
          <motion.div
            {...fadeUp(0.34)}
            className="flex items-baseline justify-between mb-5 flex-wrap gap-3"
          >
            <span
              className="eyebrow"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Coherencia · problema → respuesta
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.42)',
              }}
            >
              {String(PREGUNTA.coherencia.length).padStart(2, '0')} · pares
            </span>
          </motion.div>

          <CoherenceBridge pairs={PREGUNTA.coherencia} tone="navy" />
        </div>

        {/* Footer · enfoque + next */}
        <motion.div
          {...fadeUp(0.7)}
          className="mt-14 flex items-center justify-between flex-wrap gap-3"
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Enfoque · {PREGUNTA.enfoque}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            → §04 hipótesis y supuestos
          </span>
        </motion.div>
      </div>
    </section>
  );
}
