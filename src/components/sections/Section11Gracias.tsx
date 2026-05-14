// ─────────────────────────────────────────────────────────────────────────
// §11 · Gracias por ver · QR + cierre cinematográfico.
// ─────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

export default function Section11Gracias() {
  return (
    <section
      id="section-gracias"
      aria-labelledby="thx-h"
      style={{
        background: '#0a0b0c',
        color: '#ffffff',
        paddingBlock: 'clamp(96px, 12vw, 168px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,84,61,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(252,232,139,0.08) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          width: '100%',
          marginInline: 'auto',
          paddingInline: 'clamp(20px, 4vw, 56px)',
        }}
      >
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 14,
            marginBottom: 64,
            borderBottom: '1px solid rgba(255,255,255,0.22)',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: 13, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.82)', fontWeight: 700 }}
          >
            §11 · cierre
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}
          >
            UNAB · 2026
          </span>
        </motion.div>

        {/* Layout · texto izq + QR der */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.9fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Texto */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: ENTER }}
            >
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 13,
                  letterSpacing: '0.36em',
                  color: '#fce88b',
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                ◆ Sustentación · Proyecto de Grado I
              </div>
              <h2
                id="thx-h"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(48px, 7vw, 112px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.034em',
                  fontWeight: 400,
                  color: '#ffffff',
                  margin: 0,
                  maxWidth: '14ch',
                }}
              >
                Gracias por <span style={{ color: '#fce88b', fontWeight: 500 }}>ver</span>.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(17px, 1.8vw, 22px)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.75)',
                  margin: '28px 0 0 0',
                  maxWidth: '44ch',
                  letterSpacing: '-0.008em',
                }}
              >
                Algoritmo de aprendizaje autosupervisado para la detección de lesiones cutáneas aplicado al contexto clínico de Santander.
              </p>
            </motion.div>

            {/* autores */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: ENTER, delay: 0.25 }}
              style={{
                marginTop: 48,
                paddingTop: 20,
                borderTop: '1px solid rgba(255,255,255,0.22)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 24,
              }}
            >
              {[
                { rol: 'Autor', nombre: 'Nicolás Moreno' },
                { rol: 'Co-autora', nombre: 'María Paula Saavedra' },
                { rol: 'Asesora externa', nombre: 'Karen Sánchez · KAUST' },
              ].map((p) => (
                <div key={p.nombre}>
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: '0.28em',
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {p.rol}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#ffffff',
                      letterSpacing: '-0.008em',
                    }}
                  >
                    {p.nombre}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* QR + logo UNAB */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: ENTER, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: 'clamp(20px, 2.4vw, 32px)',
                borderRadius: 18,
                boxShadow: '0 32px 80px -32px rgba(252,232,139,0.45), 0 18px 48px -28px rgba(0,84,61,0.55)',
                position: 'relative',
              }}
            >
              <img
                src="/media/qr-sustentacion.png"
                alt="QR · Acceso a la presentación"
                style={{
                  display: 'block',
                  width: 'clamp(180px, 22vw, 280px)',
                  height: 'clamp(180px, 22vw, 280px)',
                  borderRadius: 8,
                }}
              />
            </div>
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.32em',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Escanea · accede al proyecto
            </div>

            {/* Logo UNAB */}
            <img
              src="/media/logo-unab-full.png"
              alt="Universidad Autónoma de Bucaramanga"
              style={{
                marginTop: 16,
                maxWidth: 'clamp(140px, 16vw, 200px)',
                height: 'auto',
                opacity: 0.78,
                filter: 'invert(1) brightness(1.4)',
              }}
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.5 }}
          style={{
            marginTop: 'clamp(56px, 7vw, 96px)',
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.22)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 500,
          }}
        >
          <span>Ingeniería de sistemas · UNAB · 2026</span>
          <span style={{ color: '#fce88b', fontWeight: 700 }}>fin</span>
        </motion.div>
      </div>
    </section>
  );
}
