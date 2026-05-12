import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { researchCore } from '@/data/eda';
import { Lightbulb, Compass } from 'lucide-react';

export default function Slide02Question() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const decoY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const decoX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden">
      {/* Floating decorative SVG marks */}
      <motion.div
        style={{ y: decoY, x: decoX }}
        className="absolute top-[8%] right-[6%] pointer-events-none opacity-[0.06]"
        aria-hidden
      >
        <svg width="320" height="320" viewBox="0 0 320 320">
          <text x="0" y="280" fontFamily="Instrument Serif" fontStyle="italic" fontSize="320" fill="#5d2a1a">
            ¿
          </text>
        </svg>
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-40%']) }}
        className="absolute bottom-[10%] left-[4%] pointer-events-none opacity-[0.05]"
        aria-hidden
      >
        <svg width="280" height="280" viewBox="0 0 280 280">
          <text x="0" y="240" fontFamily="Instrument Serif" fontStyle="italic" fontSize="280" fill="#17191c">
            ?
          </text>
        </svg>
      </motion.div>

      {/* Bg gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(251,225,209,0.35) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(1,115,178,0.06) 0%, transparent 45%)',
        }}
      />

      <div className="relative w-full max-w-[1500px] mx-auto px-[clamp(24px,5vw,80px)] py-[clamp(60px,8vw,120px)] flex flex-col justify-center min-h-screen">
        <motion.div style={{ y: titleY }}>
          <span className="eyebrow mb-12 block">2 · Pregunta · Hipótesis</span>
        </motion.div>

        {/* Pregunta */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20 relative"
        >
          <div className="flex items-start gap-8 max-w-6xl">
            {/* Big italic ¿ */}
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="font-display text-terracotta text-[clamp(72px,9vw,140px)] leading-[0.85] italic shrink-0"
            >
              ¿
            </motion.span>

            <div>
              <span className="eyebrow text-terracotta">Pregunta de investigación</span>
              <p className="mt-3 font-display text-[clamp(28px,3.8vw,56px)] leading-[1.12] tracking-tight text-ink">
                <span className="italic">Cómo diseñar</span> un algoritmo de IA basado en{' '}
                <span className="italic text-terracotta">aprendizaje autosupervisado</span> para la
                detección de lesiones cutáneas a partir de imágenes dermatológicas que apoye el
                diagnóstico clínico en{' '}
                <span className="italic">centros médicos del departamento de Santander</span>?
              </p>
            </div>
          </div>

          {/* Divider with animated line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mt-12 h-px bg-gradient-to-r from-terracotta/40 via-ink/15 to-transparent origin-left"
          />
        </motion.div>

        {/* Hipótesis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          viewport={{ once: true }}
          className="relative max-w-5xl"
        >
          <div className="card-warm relative overflow-hidden border-l-4 border-l-terracotta p-8 md:p-10">
            <Lightbulb
              className="absolute top-6 right-6 text-terracotta/15 -rotate-12"
              size={140}
              strokeWidth={1}
            />
            <span className="eyebrow text-terracotta flex items-center gap-2">
              <Lightbulb size={14} />
              Hipótesis de trabajo
            </span>
            <p className="relative mt-4 text-[clamp(16px,1.6vw,22px)] leading-[1.55] text-ink">
              {researchCore.hypothesis}
            </p>
          </div>
        </motion.div>

        {/* Supuestos / enfoque */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl"
        >
          <SupuestoCard
            icon={<Compass size={18} />}
            label="Supuesto 1"
            text="Existe regularidad estructural en los datos dermatoscópicos públicos que un esquema autosupervisado puede capturar."
          />
          <SupuestoCard
            icon={<Compass size={18} />}
            label="Supuesto 2"
            text="La representación aprendida se transfiere a un conjunto pequeño de etiquetas relevantes para Santander."
          />
          <SupuestoCard
            icon={<Compass size={18} />}
            label="Supuesto 3"
            text="Las clases de mayor incidencia regional (CBC, CEC, melanoma) están suficientemente representadas en HAM10000 + BCN20000."
          />
        </motion.div>
      </div>
    </div>
  );
}

function SupuestoCard({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card p-5 group cursor-default"
    >
      <div className="flex items-center gap-2 text-light-steel group-hover:text-terracotta transition-colors">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.18em] font-medium">{label}</span>
      </div>
      <p className="mt-3 text-[13.5px] text-ink/85 leading-relaxed">{text}</p>
    </motion.div>
  );
}
