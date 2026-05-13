import { motion } from 'framer-motion';
import { PROJECT } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

export default function Section00Inicio() {
  return (
    <section
      id="inicio"
      className="section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0F2C45 0%, #061A2C 100%)',
        color: '#ffffff',
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0"
        style={{ opacity: 0.4 }}
      />
      {/* Soft teal glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(circle, rgba(31,140,136,0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Col 8 izquierda ───────────────────────── */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <motion.div
              {...fade(0)}
              className="eyebrow-num"
              style={{ color: '#1F8C88' }}
            >
              Proyecto de Grado I · UNAB · 2026
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="font-display"
              style={{
                color: '#ffffff',
                fontSize: 'clamp(40px, 5.4vw, 72px)',
                lineHeight: 1.05,
                maxWidth: '22ch',
              }}
            >
              {PROJECT.title}
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              className="font-serif-it"
              style={{
                color: '#B7E1DF',
                fontSize: 'clamp(20px, 2vw, 28px)',
                lineHeight: 1.25,
                maxWidth: '36ch',
              }}
            >
              Aplicación de Inteligencia Artificial en el Contexto Clínico
              del Departamento de Santander
            </motion.p>

            <motion.div
              {...fade(0.24)}
              style={{
                width: '50%',
                height: 1,
                background: 'rgba(255,255,255,0.18)',
              }}
            />

            {/* Mini-cards autores / dirección / institución */}
            <motion.div
              {...fade(0.32)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Autores */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="eyebrow"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Autores
                </div>
                <div
                  className="mt-2 flex flex-col gap-1"
                  style={{ color: '#ffffff', fontSize: 14, lineHeight: 1.4 }}
                >
                  <span>{PROJECT.authors[0]}</span>
                  <span>{PROJECT.authors[1]}</span>
                </div>
              </div>

              {/* Dirección */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="eyebrow"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Dirección
                </div>
                <div
                  className="mt-2 flex flex-col gap-2"
                  style={{ color: '#ffffff', fontSize: 14, lineHeight: 1.4 }}
                >
                  <span>
                    {PROJECT.director}{' '}
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                      · Director
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span>{PROJECT.advisor}</span>
                    <span className="pill-teal" style={{ fontSize: 11 }}>
                      KAUST · Co-Dir
                    </span>
                  </span>
                </div>
              </div>

              {/* Institución */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="eyebrow"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Institución
                </div>
                <div
                  className="mt-2 flex flex-col gap-1"
                  style={{ color: '#ffffff', fontSize: 14, lineHeight: 1.4 }}
                >
                  <span>{PROJECT.university}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {PROJECT.program}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Col 4 derecha · video card ───────────────────── */}
          <motion.div
            {...fade(0.18)}
            className="col-span-12 lg:col-span-4"
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '4 / 5',
                borderRadius: 32,
                background: '#0F2C45',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 32px 80px -20px rgba(0,0,0,0.5)',
              }}
            >
              <video
                src="/media/hero-lesion.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Tag flotante */}
              <div
                className="absolute"
                style={{
                  bottom: 16,
                  left: 16,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  background: 'rgba(6,26,44,0.72)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <span className="dot-pulse" />
                <span
                  className="font-mono"
                  style={{
                    color: '#ffffff',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                  }}
                >
                  dermatoscopia · referencia
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          {...fade(0.44)}
          className="mt-16 flex flex-wrap items-center justify-between gap-4"
          style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="pill-teal-solid" style={{ padding: '8px 16px' }}>
            {PROJECT.duration} · sustentación
          </span>
          <span
            className="font-mono"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 12,
              letterSpacing: '0.06em',
            }}
          >
            scroll para iniciar →
          </span>
        </motion.div>
      </div>
    </section>
  );
}
