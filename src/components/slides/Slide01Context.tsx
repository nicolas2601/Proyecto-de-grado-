import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { epidemioKPIs, problemTree, researchCore } from '@/data/eda';
import { cn } from '@/lib/utils';
import { ArrowDown, AlertCircle, TrendingUp, Activity } from 'lucide-react';

// Animated counter — count up from 0 when in view
function AnimatedNumber({ value, suffix = '', delay = 0 }: { value: string; suffix?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="inline-block"
    >
      {value}
      {suffix && <span className="text-xs text-muted-stone ml-1">{suffix}</span>}
    </motion.span>
  );
}

function TreeBranch({
  side,
  label,
  items,
  accent,
  delay = 0,
}: {
  side: 'left' | 'right';
  label: string;
  items: string[];
  accent: 'cause' | 'effect';
  delay?: number;
}) {
  const isCause = accent === 'cause';
  return (
    <div className="flex-1 min-w-0">
      <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-3 flex items-baseline gap-2"
      >
        <span className={cn('h-2 w-2 rounded-full', isCause ? 'bg-terracotta' : 'bg-chart-1')} />
        <span className="eyebrow">{label}</span>
      </motion.div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: side === 'left' ? -20 : 20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: delay + 0.1 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, x: side === 'left' ? -3 : 3 }}
            className={cn(
              'group relative p-3 rounded-xl text-xs leading-snug cursor-default transition-colors',
              isCause
                ? 'bg-canvas border border-terracotta/20 hover:border-terracotta/60 hover:shadow-md hover:bg-warm-mist/40'
                : 'bg-canvas border border-chart-1/20 hover:border-chart-1/60 hover:shadow-md hover:bg-chart-1/5'
            )}
          >
            <span className={cn(
              'absolute -top-1 -left-1 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold',
              isCause ? 'bg-terracotta text-canvas' : 'bg-chart-1 text-canvas'
            )}>
              {i + 1}
            </span>
            <p className="text-ink/90 pl-3">{it}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ kpi, idx }: { kpi: (typeof epidemioKPIs)[number]; idx: number }) {
  const accent =
    kpi.severity === 'high'
      ? 'border-l-terracotta'
      : kpi.severity === 'medium'
      ? 'border-l-chart-2'
      : 'border-l-chart-3';
  const Icon = kpi.severity === 'high' ? AlertCircle : kpi.severity === 'medium' ? TrendingUp : Activity;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * idx, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn('card border-l-4 p-4 h-full cursor-default relative overflow-hidden', accent)}
    >
      <div className="absolute -top-6 -right-6 opacity-[0.04] pointer-events-none">
        <Icon size={120} strokeWidth={1.2} />
      </div>

      <span className="eyebrow text-[10px]">{kpi.region}</span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-[36px] leading-none text-ink">
          <AnimatedNumber value={kpi.value} delay={0.1 * idx} />
        </span>
        <span className="text-xs text-muted-stone">{kpi.unit}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-ink">{kpi.label}</p>
      <p className="mt-1.5 text-xs text-muted-stone leading-snug">{kpi.detail}</p>
      <p className="mt-3 text-[10px] text-light-steel font-mono">
        Fuente · {kpi.source}
      </p>
    </motion.div>
  );
}

export default function Slide01Context() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const treeScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.96, 1, 1.02]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[12%] right-[6%] w-[420px] h-[420px] rounded-full bg-warm-mist/40 blur-3xl" />
        <div className="absolute bottom-[20%] left-[3%] w-[360px] h-[360px] rounded-full bg-chart-1/8 blur-3xl" />
        <div className="absolute top-[55%] right-[35%] w-[280px] h-[280px] rounded-full bg-terracotta/8 blur-3xl" />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        {/* Header */}
        <motion.div style={{ y: titleY }} className="mb-16 max-w-3xl">
          <span className="eyebrow">1 · Planteamiento del problema</span>
          <h2 className="mt-3 font-display text-[clamp(40px,5.5vw,84px)] leading-[1.02] tracking-tight text-ink">
            Las lesiones cutáneas{' '}
            <span className="italic text-terracotta">se diagnostican tarde</span>{' '}
            en Santander.
          </h2>
          <p className="mt-5 text-[15px] text-muted-stone leading-relaxed max-w-2xl">
            La detección y clasificación oportuna depende de la experiencia clínica
            (62–80 % de exactitud con el método ABCDE), de la biopsia —invasiva y
            costosa— y de la disponibilidad regional de dermatólogos. La IA aplicada
            a imágenes sigue siendo marginal en la región.
          </p>
        </motion.div>

        {/* Árbol del problema — 5 niveles */}
        <motion.div
          style={{ scale: treeScale }}
          className="relative card-fog p-6 md:p-10 mb-16"
        >
          <div className="flex items-baseline justify-between mb-8">
            <span className="eyebrow">Árbol del problema · 5 niveles</span>
            <span className="text-[10px] text-light-steel font-mono">causas ↑ · efectos ↓</span>
          </div>

          {/* Layer 1 — Consecuencias indirectas (top) */}
          <ConsecuenciaLayer
            title="Consecuencias indirectas"
            sub="impacto sistémico de largo plazo"
            items={problemTree.consecuenciasIndirectas}
            tone="cool-strong"
            delay={0}
          />

          {/* Connector */}
          <FlowArrow direction="up" />

          {/* Layer 2 — Consecuencias directas */}
          <ConsecuenciaLayer
            title="Consecuencias directas"
            sub="efectos inmediatos en el acto clínico"
            items={problemTree.consecuenciasDirectas}
            tone="cool"
            delay={0.15}
          />

          {/* Connector */}
          <FlowArrow direction="up" />

          {/* Layer 3 — PROBLEMA CENTRAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative my-6"
          >
            {/* Glow pulse */}
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-terracotta/20 blur-2xl rounded-3xl"
            />
            <div className="relative bg-ink text-canvas rounded-3xl p-8 md:p-10 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-warm-mist flex items-center justify-center">
                    <AlertCircle className="text-terracotta" size={24} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-warm-mist/80 font-medium">
                    Problema central
                  </span>
                  <p className="mt-2 font-display text-[clamp(22px,2.6vw,34px)] leading-[1.15] text-canvas italic">
                    {problemTree.problemaCentral}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <FlowArrow direction="down" />

          {/* Layer 4 — Causas directas */}
          <ConsecuenciaLayer
            title="Causas directas"
            sub="factores inmediatos que originan el problema"
            items={problemTree.causasDirectas}
            tone="warm"
            delay={0.55}
          />

          {/* Connector */}
          <FlowArrow direction="down" />

          {/* Layer 5 — Causas indirectas */}
          <ConsecuenciaLayer
            title="Causas indirectas"
            sub="condiciones estructurales subyacentes"
            items={problemTree.causasIndirectas}
            tone="warm-strong"
            delay={0.7}
          />
        </motion.div>

        {/* Pregunta problema — transición a Slide 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="card-warm relative overflow-hidden p-8 md:p-12 mb-16"
        >
          <div className="absolute top-0 right-0 font-display italic text-terracotta/15 text-[180px] leading-none pointer-events-none select-none">
            ?
          </div>
          <span className="eyebrow text-terracotta">Pregunta problema</span>
          <p className="relative mt-4 font-display text-[clamp(20px,2.4vw,32px)] leading-[1.2] text-ink max-w-5xl">
            <span className="italic">¿Cómo diseñar</span> un algoritmo de inteligencia
            artificial basado en{' '}
            <span className="italic text-terracotta">aprendizaje autosupervisado</span>{' '}
            para la detección de lesiones cutáneas a partir de imágenes dermatológicas
            que apoye el diagnóstico clínico en{' '}
            <span className="italic">centros médicos del departamento de Santander</span>?
          </p>
        </motion.div>

        {/* KPIs epidemiológicos */}
        <div>
          <div className="flex items-baseline justify-between mb-5">
            <span className="eyebrow">Evidencia epidemiológica · Santander</span>
            <span className="text-[10px] text-light-steel font-mono">6 fuentes · 2018 – 2025</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {epidemioKPIs.map((k, i) => (
              <KpiCard key={k.id} kpi={k} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowArrow({ direction }: { direction: 'up' | 'down' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex justify-center my-4"
    >
      <div className="relative h-10 w-[2px] bg-gradient-to-b from-ink/10 via-ink/30 to-ink/10">
        <ArrowDown
          size={18}
          className={cn(
            'absolute left-1/2 -translate-x-1/2 text-ink/60',
            direction === 'up' ? 'rotate-180 -top-1' : '-bottom-1'
          )}
        />
      </div>
    </motion.div>
  );
}

function ConsecuenciaLayer({
  title,
  sub,
  items,
  tone,
  delay,
}: {
  title: string;
  sub: string;
  items: string[];
  tone: 'cool-strong' | 'cool' | 'warm' | 'warm-strong';
  delay: number;
}) {
  const TONES = {
    'cool-strong': { dot: 'bg-chart-4', text: 'text-chart-4', card: 'border-chart-4/25 hover:border-chart-4/55 hover:bg-chart-4/5' },
    cool: { dot: 'bg-chart-1', text: 'text-chart-1', card: 'border-chart-1/25 hover:border-chart-1/55 hover:bg-chart-1/5' },
    warm: { dot: 'bg-chart-2', text: 'text-chart-2', card: 'border-chart-2/25 hover:border-chart-2/55 hover:bg-chart-2/5' },
    'warm-strong': { dot: 'bg-terracotta', text: 'text-terracotta', card: 'border-terracotta/25 hover:border-terracotta/55 hover:bg-warm-mist/40' },
  };
  const t = TONES[tone];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.55 }}
        viewport={{ once: true }}
        className="mb-3 flex items-baseline gap-2"
      >
        <span className={cn('h-2 w-2 rounded-full', t.dot)} />
        <span className={cn('eyebrow', t.text)}>{title}</span>
        <span className="text-[10px] text-light-steel italic ml-1">— {sub}</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: delay + 0.08 + i * 0.06, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={cn(
              'relative bg-canvas rounded-xl p-3 text-[12px] leading-snug border cursor-default transition-all',
              t.card
            )}
          >
            <span
              className={cn(
                'absolute -top-1.5 -left-1.5 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-canvas',
                t.dot
              )}
            >
              {i + 1}
            </span>
            <p className="text-ink/90 pl-2">{it}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
