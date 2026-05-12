import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { trlLevels, expectedDeliverables, risks } from '@/data/eda';
import { cn } from '@/lib/utils';
import { Target, AlertTriangle, Rocket, ShieldCheck } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import TiltedCard from '@/components/reactbits/TiltedCard';
import MagicBento, { BentoCard } from '@/components/reactbits/MagicBento';

const LEVEL_STYLE = {
  Alto: 'border-l-terracotta bg-terracotta/8',
  Medio: 'border-l-chart-2 bg-chart-2/8',
  Bajo: 'border-l-chart-3 bg-chart-3/8',
};

export default function Slide07Results() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[15%] left-[5%] w-[420px] h-[420px] rounded-full bg-warm-mist/40 blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] w-[380px] h-[380px] rounded-full bg-terracotta/8 blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        <span className="eyebrow">7 · Entregables · Plan de contingencia</span>
        <h2 className="mt-3 font-display text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-tight text-ink max-w-4xl">
          <SplitText
            text="Cuatro entregables comprometidos."
            as="span"
            trigger="scroll"
            stagger={0.014}
          />
          <br />
          <span className="italic text-terracotta">
            <SplitText
              text="Siete contingencias controladas."
              as="span"
              trigger="scroll"
              stagger={0.014}
              delay={0.35}
            />
          </span>
        </h2>
        <ScrollReveal delay={0.6} direction="up" distance={14}>
          <p className="mt-5 text-[15px] text-muted-stone leading-relaxed max-w-2xl flex items-center gap-2">
            <ShieldCheck size={15} className="text-terracotta shrink-0" strokeWidth={1.8} />
            Cada riesgo trae un plan de retorno explícito a la fase CRISP-DM
            correspondiente — no improvisación.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TRL + entregables (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="card relative overflow-hidden"
            >
              <Rocket
                size={120}
                strokeWidth={1}
                className="absolute -top-6 -right-6 text-terracotta/8 pointer-events-none"
              />
              <div className="relative flex items-baseline justify-between mb-3">
                <span className="eyebrow flex items-center gap-1.5">
                  <Target size={13} />
                  Madurez tecnológica (TRL)
                </span>
                <span className="text-[10px] text-light-steel font-mono">
                  target TRL 4 · stretch TRL 5
                </span>
              </div>
              <div className="space-y-1.5 relative">
                {trlLevels.map((t, i) => (
                  <motion.div
                    key={t.level}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.45 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-default',
                      t.target
                        ? 'bg-terracotta text-canvas shadow-md'
                        : t.active
                        ? 'bg-warm-mist text-ink'
                        : t.stretch
                        ? 'bg-fog text-ink/85 border border-dashed border-terracotta/40'
                        : 'bg-fog text-light-steel'
                    )}
                  >
                    <span className="font-display text-2xl w-7 italic">{t.level}</span>
                    <span className="text-[12.5px] flex-1 leading-snug">{t.label}</span>
                    {t.target && (
                      <span className="text-[9px] uppercase tracking-wider font-bold bg-canvas/20 px-2 py-0.5 rounded-full">
                        target
                      </span>
                    )}
                    {t.stretch && (
                      <span className="text-[9px] uppercase tracking-wider font-bold text-terracotta">
                        stretch
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="card-fog"
            >
              <span className="eyebrow">Entregables principales</span>
              <ul className="mt-3 space-y-2.5">
                {expectedDeliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 text-sm cursor-default group"
                  >
                    <span className="font-display text-terracotta text-xl shrink-0 w-7 italic group-hover:scale-110 transition-transform">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink/90 leading-relaxed">{d}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Risks (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between mb-4">
              <span className="eyebrow flex items-center gap-1.5">
                <AlertTriangle size={13} />
                Riesgos identificados · 7 contingencias
              </span>
              <span className="text-[10px] text-light-steel font-mono">CRISP-DM retorno</span>
            </div>
            <MagicBento
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              glowColor={'186, 80, 49'}
              radius={200}
            >
              {risks.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <TiltedCard intensity={5} glare={false} scale={1.01} className="h-full">
                    <BentoCard
                      className={cn(
                        'border-l-4 rounded-lg p-4 cursor-default h-full transition-shadow hover:shadow-md',
                        LEVEL_STYLE[r.level]
                      )}
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-display text-2xl text-ink italic">{r.id}</span>
                        <h4 className="text-[13.5px] font-medium text-ink flex-1 leading-snug">
                          {r.name}
                        </h4>
                        <span
                          className={cn(
                            'text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shrink-0',
                            r.level === 'Alto' ? 'bg-terracotta text-canvas' : 'bg-chart-2 text-canvas'
                          )}
                        >
                          {r.level}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-muted-stone leading-snug pl-10">
                        <span className="text-ink/70 font-medium">Plan · </span>
                        {r.plan}
                      </p>
                    </BentoCard>
                  </TiltedCard>
                </motion.div>
              ))}
            </MagicBento>
          </div>
        </div>
      </div>
    </div>
  );
}
