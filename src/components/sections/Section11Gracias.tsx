// ─────────────────────────────────────────────────────────────────────────
// §11 · Gracias por ver · QR centrado · cierre minimalista.
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
          width: '100%',
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'clamp(20px, 4vw, 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(32px, 4vw, 56px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          className="font-mono uppercase"
          style={{
            fontSize: 13,
            letterSpacing: '0.36em',
            color: '#fce88b',
            fontWeight: 700,
          }}
        >
          ◆ Sustentación · Proyecto de Grado I
        </motion.div>

        <motion.h2
          id="thx-h"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(56px, 9vw, 144px)',
            lineHeight: 0.95,
            letterSpacing: '-0.034em',
            fontWeight: 400,
            color: '#ffffff',
            margin: 0,
            maxWidth: '16ch',
          }}
        >
          Gracias por <span style={{ color: '#fce88b', fontWeight: 500 }}>ver</span>.
        </motion.h2>

        {/* QR centrado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER, delay: 0.3 }}
          style={{
            background: '#ffffff',
            padding: 'clamp(22px, 2.6vw, 36px)',
            borderRadius: 20,
            boxShadow: '0 32px 80px -32px rgba(252,232,139,0.45), 0 18px 48px -28px rgba(0,84,61,0.55)',
          }}
        >
          <img
            src="/media/qr-sustentacion.png"
            alt="QR · Acceso al proyecto"
            style={{
              display: 'block',
              width: 'clamp(220px, 26vw, 320px)',
              height: 'clamp(220px, 26vw, 320px)',
              borderRadius: 10,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.5 }}
          className="font-mono uppercase"
          style={{
            fontSize: 12,
            letterSpacing: '0.32em',
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 700,
          }}
        >
          Escanea · accede al proyecto
        </motion.div>
      </div>
    </section>
  );
}
