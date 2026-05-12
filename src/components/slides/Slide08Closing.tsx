import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { references, projectMeta } from '@/data/eda';

export default function Slide08Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden grain">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[10%] right-[8%] w-[500px] h-[500px] rounded-full bg-warm-mist/45 blur-3xl" />
        <div className="absolute bottom-[15%] left-[5%] w-[420px] h-[420px] rounded-full bg-terracotta/10 blur-3xl" />
      </motion.div>

      {/* Decorative big italic Q */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-[15%] right-[3%] font-display italic text-terracotta text-[clamp(180px,30vw,460px)] leading-none pointer-events-none select-none"
      >
        ?
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="eyebrow">8 · Cierre</span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-3 font-display text-[clamp(48px,6.5vw,96px)] leading-[1] tracking-tight text-ink"
          >
            <span className="italic text-terracotta">Gracias</span>
            <br />
            por su atención.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10 space-y-4"
          >
            <p className="text-sm text-muted-stone leading-relaxed max-w-md">
              Quedo atento a las preguntas, observaciones y sugerencias del jurado
              para fortalecer el desarrollo del{' '}
              <strong className="text-ink">Objetivo 2</strong> — diseño del algoritmo
              SSL.
            </p>

            <div className="pt-6 border-t border-ink/8 max-w-md">
              <p className="text-[10px] uppercase tracking-[0.18em] text-light-steel mb-2 font-medium">
                Equipo
              </p>
              <p className="text-sm text-ink font-medium">{projectMeta.authors[0]}</p>
              <p className="text-sm text-ink/80">{projectMeta.authors[1]}</p>
              <p className="text-xs text-muted-stone mt-3">
                Director · {projectMeta.director}
              </p>
              <p className="text-xs text-muted-stone">
                Asesora · {projectMeta.advisor} · KAUST
              </p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-fog"
          >
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-ink/8">
              <span className="eyebrow">Referencias bibliográficas</span>
              <span className="text-[10px] text-light-steel font-mono">
                {references.length} fuentes
              </span>
            </div>
            <ol className="space-y-1.5 overflow-y-auto pr-2" style={{ maxHeight: '70vh' }}>
              {references.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02 * i, duration: 0.35 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 2 }}
                  className="flex gap-3 text-[12px] leading-relaxed group rounded-md py-1.5 px-2 -mx-2 hover:bg-canvas transition-colors cursor-default"
                >
                  <span className="font-mono text-light-steel shrink-0 group-hover:text-terracotta transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink/85">{r}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
