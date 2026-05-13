import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ENTER } from '@/lib/motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: ENTER, delay },
});

export default function Section01Introduccion() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="introduccion"
      className="section bg-soft-navy relative"
    >
      <div className="container">
        <motion.div {...fadeUp(0)} className="eyebrow-num">
          §01 · INTRODUCCIÓN
        </motion.div>

        {/* Header 2-col · título izquierda + card definitoria derecha */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.h2
            {...fadeUp(0.1)}
            className="lg:col-span-7"
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.12,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-navy)',
              margin: 0,
            }}
          >
            Aprendizaje autosupervisado para detección de lesiones cutáneas en Santander.
          </motion.h2>

          <motion.p
            {...fadeUp(0.24)}
            className="lg:col-span-5"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--color-ink-soft)',
              margin: 0,
              alignSelf: 'center',
            }}
          >
            En Santander el acceso a dermatología especializada es limitado y los modelos de IA disponibles dependen de miles de imágenes anotadas. Este proyecto explora una alternativa <strong style={{ color: 'var(--color-navy)' }}>autosupervisada</strong> que reduce la dependencia de etiquetas y se ajusta al perfil clínico regional.
          </motion.p>
        </div>

        {/* Cierre · transición */}
        <motion.div
          {...fadeUp(0.42)}
          className="mt-14 hairline pt-5 flex flex-wrap items-center justify-between gap-3"
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--color-graphite)',
            }}
          >
            15 min · sustentación · 17 secciones
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.04em',
              color: 'var(--color-teal)',
              fontWeight: 600,
            }}
          >
            → §02 planteamiento del problema
          </span>
        </motion.div>
      </div>
    </section>
  );
}
