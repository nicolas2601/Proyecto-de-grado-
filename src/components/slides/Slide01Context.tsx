import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { epidemioKPIs, problemTree } from '@/data/eda';
import { cn } from '@/lib/utils';
import { AlertCircle, TrendingUp, Activity } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import CountUp from '@/components/reactbits/CountUp';
import TiltedCard from '@/components/reactbits/TiltedCard';
import MagicBento, { BentoCard } from '@/components/reactbits/MagicBento';

// ─────────────────────────────────────────────────────────────────
// KPI card with parsed numeric + suffix for CountUp
// ─────────────────────────────────────────────────────────────────
function parseValue(v: string): { num: number; suffix: string; prefix: string; decimals: number } {
  // Examples: "124,2", "15 %", "+338 %", "54 %", "67,5 %", "GPC 2024"
  const m = v.match(/^(\+?)([\d.,]+)\s*(.*)$/);
  if (!m) return { num: 0, suffix: v, prefix: '', decimals: 0 };
  const prefix = m[1] || '';
  const raw = m[2].replace(/\./g, '').replace(',', '.');
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return { num: 0, suffix: v, prefix: '', decimals: 0 };
  const decimals = (raw.split('.')[1] || '').length;
  return { num, suffix: m[3].trim(), prefix, decimals };
}

function KpiCard({ kpi, idx }: { kpi: (typeof epidemioKPIs)[number]; idx: number }) {
  const parsed = useMemo(() => parseValue(kpi.value), [kpi.value]);
  const accent =
    kpi.severity === 'high'
      ? 'border-l-terracotta'
      : kpi.severity === 'medium'
      ? 'border-l-chart-2'
      : 'border-l-chart-3';
  const Icon = kpi.severity === 'high' ? AlertCircle : kpi.severity === 'medium' ? TrendingUp : Activity;
  const glow =
    kpi.severity === 'high'
      ? '186, 80, 49'
      : kpi.severity === 'medium'
      ? '202, 130, 60'
      : '93, 130, 80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * idx, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="h-full"
    >
      <TiltedCard intensity={6} glare={false} scale={1.012} className="h-full">
        <BentoCard
          className={cn('card border-l-4 p-4 h-full cursor-default rounded-xl bg-canvas', accent)}
          style={{ ['--bento-glow' as any]: glow }}
        >
          <Icon
            size={120}
            strokeWidth={1.2}
            className="absolute -top-6 -right-6 opacity-[0.04] pointer-events-none"
          />

          <span className="eyebrow text-[10px]">{kpi.region}</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-[clamp(28px,3.4vw,40px)] leading-none text-ink tabular-nums">
              {parsed.num > 0 ? (
                <CountUp
                  value={parsed.num}
                  decimals={parsed.decimals}
                  prefix={parsed.prefix}
                  separator=","
                  duration={1.4}
                />
              ) : (
                kpi.value
              )}
            </span>
            <span className="text-xs text-muted-stone">{parsed.suffix || kpi.unit}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-ink leading-snug">{kpi.label}</p>
          <p className="mt-1.5 text-xs text-muted-stone leading-snug">{kpi.detail}</p>
          <p className="mt-3 text-[10px] text-light-steel font-mono">Fuente · {kpi.source}</p>
        </BentoCard>
      </TiltedCard>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FISHBONE DIAGRAM — causas (izq) → problema (centro) → consecuencias (der)
// ─────────────────────────────────────────────────────────────────

function FishboneItem({
  text,
  side,
  delay,
  accent,
}: {
  text: string;
  side: 'left' | 'right';
  delay: number;
  accent: 'warm' | 'cool' | 'warm-strong' | 'cool-strong';
}) {
  const TONES = {
    warm: 'border-chart-2/30 hover:border-chart-2/70 hover:bg-chart-2/5',
    'warm-strong': 'border-terracotta/30 hover:border-terracotta/70 hover:bg-warm-mist/50',
    cool: 'border-chart-1/30 hover:border-chart-1/70 hover:bg-chart-1/5',
    'cool-strong': 'border-chart-4/30 hover:border-chart-4/70 hover:bg-chart-4/5',
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ x: side === 'left' ? -6 : 6, scale: 1.015 }}
      className={cn(
        'group relative rounded-lg border bg-canvas/95 backdrop-blur-sm p-2.5 text-[11.5px] leading-snug cursor-default text-ink/90 shadow-sm transition-colors',
        TONES[accent],
        side === 'left' ? 'text-right' : 'text-left'
      )}
    >
      {text}
    </motion.div>
  );
}

function GroupLabel({
  title,
  sub,
  accent,
  side,
  delay,
}: {
  title: string;
  sub: string;
  accent: 'warm' | 'cool' | 'warm-strong' | 'cool-strong';
  side: 'left' | 'right';
  delay: number;
}) {
  const COLOR = {
    warm: 'text-chart-2',
    'warm-strong': 'text-terracotta',
    cool: 'text-chart-1',
    'cool-strong': 'text-chart-4',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        'mb-2 flex items-baseline gap-2',
        side === 'left' ? 'justify-end' : 'justify-start'
      )}
    >
      <span className={cn('eyebrow text-[10px]', COLOR[accent])}>{title}</span>
      <span className="text-[9px] text-light-steel italic font-normal hidden md:inline">— {sub}</span>
    </motion.div>
  );
}

function FishboneDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <div ref={ref} className="relative w-full">
      {/* SVG connectors layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="lineWarm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ba5031" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ba5031" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="lineCool" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0173b2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0173b2" stopOpacity="0.12" />
          </linearGradient>
          <filter id="glowCenter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* LEFT side connectors — causas → centro */}
        {[100, 175, 250, 325, 425, 500].map((y, i) => (
          <motion.path
            key={`L${i}`}
            d={`M 200 ${y} C 350 ${y}, 400 300, 500 300`}
            stroke="url(#lineWarm)"
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* RIGHT side connectors — centro → consecuencias */}
        {[100, 175, 250, 325, 425, 500].map((y, i) => (
          <motion.path
            key={`R${i}`}
            d={`M 500 300 C 600 300, 650 ${y}, 800 ${y}`}
            stroke="url(#lineCool)"
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Central glow */}
        <motion.circle
          cx="500"
          cy="300"
          r="60"
          fill="#ba5031"
          fillOpacity="0.06"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          filter="url(#glowCenter)"
        />
      </svg>

      {/* 3-column layout: causas | problema | consecuencias */}
      <div className="relative grid grid-cols-12 gap-3 md:gap-5 items-stretch min-h-[600px]">
        {/* LEFT — Causas */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6 justify-center">
          <div>
            <GroupLabel
              title="Causas indirectas"
              sub="condiciones estructurales"
              accent="warm-strong"
              side="left"
              delay={0.1}
            />
            <div className="flex flex-col gap-1.5">
              {problemTree.causasIndirectas.map((c, i) => (
                <FishboneItem
                  key={`ci-${i}`}
                  text={c}
                  side="left"
                  delay={0.2 + i * 0.06}
                  accent="warm-strong"
                />
              ))}
            </div>
          </div>
          <div>
            <GroupLabel
              title="Causas directas"
              sub="factores inmediatos"
              accent="warm"
              side="left"
              delay={0.5}
            />
            <div className="flex flex-col gap-1.5">
              {problemTree.causasDirectas.map((c, i) => (
                <FishboneItem
                  key={`cd-${i}`}
                  text={c}
                  side="left"
                  delay={0.55 + i * 0.06}
                  accent="warm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — Problema */}
        <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-terracotta/40"
              aria-hidden
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
              className="absolute inset-0 rounded-full border border-terracotta/30"
              aria-hidden
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-6 rounded-full bg-terracotta/15 blur-2xl"
              aria-hidden
            />

            <div className="relative w-[260px] h-[260px] rounded-full bg-ink text-canvas shadow-2xl flex flex-col items-center justify-center text-center p-7">
              <div className="h-10 w-10 rounded-full bg-warm-mist/95 flex items-center justify-center mb-3">
                <AlertCircle className="text-terracotta" size={20} strokeWidth={2} />
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-warm-mist/80 font-medium">
                Problema central
              </span>
              <p className="mt-2 font-display text-[13px] leading-[1.25] text-canvas italic">
                {problemTree.problemaCentral}
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Consecuencias */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6 justify-center">
          <div>
            <GroupLabel
              title="Consecuencias directas"
              sub="efectos inmediatos"
              accent="cool"
              side="right"
              delay={0.1}
            />
            <div className="flex flex-col gap-1.5">
              {problemTree.consecuenciasDirectas.map((c, i) => (
                <FishboneItem
                  key={`cd2-${i}`}
                  text={c}
                  side="right"
                  delay={0.2 + i * 0.06}
                  accent="cool"
                />
              ))}
            </div>
          </div>
          <div>
            <GroupLabel
              title="Consecuencias indirectas"
              sub="impacto sistémico"
              accent="cool-strong"
              side="right"
              delay={0.5}
            />
            <div className="flex flex-col gap-1.5">
              {problemTree.consecuenciasIndirectas.map((c, i) => (
                <FishboneItem
                  key={`ci2-${i}`}
                  text={c}
                  side="right"
                  delay={0.55 + i * 0.06}
                  accent="cool-strong"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function Slide01Context() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[12%] right-[6%] w-[420px] h-[420px] rounded-full bg-warm-mist/40 blur-3xl" />
        <div className="absolute bottom-[20%] left-[3%] w-[360px] h-[360px] rounded-full bg-chart-1/10 blur-3xl" />
        <div className="absolute top-[55%] right-[35%] w-[280px] h-[280px] rounded-full bg-terracotta/8 blur-3xl" />
      </motion.div>

      <div className="absolute inset-0 grain pointer-events-none opacity-60" aria-hidden />

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        {/* Header */}
        <motion.div style={{ y: titleY }} className="mb-14 max-w-4xl">
          <span className="eyebrow">1 · Planteamiento del problema</span>
          <h2 className="mt-3 font-display text-[clamp(38px,5.4vw,80px)] leading-[1.02] tracking-tight text-ink">
            <SplitText text="Las lesiones cutáneas " as="span" trigger="scroll" stagger={0.012} />
            <span className="italic text-terracotta">
              <SplitText text="se diagnostican tarde" as="span" trigger="scroll" stagger={0.012} delay={0.15} />
            </span>{' '}
            <SplitText text="en Santander." as="span" trigger="scroll" stagger={0.012} delay={0.35} />
          </h2>
          <ScrollReveal delay={0.4} direction="up" distance={16}>
            <p className="mt-5 text-[15px] text-muted-stone leading-relaxed max-w-2xl">
              La detección oportuna depende de la experiencia clínica (62–80 % de
              exactitud con el método ABCDE), de la biopsia —invasiva y costosa— y de
              la disponibilidad regional de dermatólogos. La IA aplicada a imágenes
              sigue siendo marginal en la región.
            </p>
          </ScrollReveal>
        </motion.div>

        {/* Fishbone — causas / problema / consecuencias */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative card-fog p-6 md:p-10 mb-16"
        >
          <div className="flex items-baseline justify-between mb-6">
            <span className="eyebrow">Causas · problema · consecuencias</span>
            <span className="text-[10px] text-light-steel font-mono hidden md:inline">
              ← causas estructurales · efectos sistémicos →
            </span>
          </div>
          <FishboneDiagram />
        </motion.div>

        {/* Pregunta problema */}
        <ScrollReveal direction="up" delay={0} distance={28}>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            className="card-warm relative overflow-hidden p-8 md:p-12 mb-16 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 font-display italic text-terracotta/15 text-[180px] leading-none pointer-events-none select-none"
            >
              ?
            </motion.div>
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
        </ScrollReveal>

        {/* KPIs */}
        <div>
          <div className="flex items-baseline justify-between mb-5">
            <span className="eyebrow">Evidencia epidemiológica · Santander</span>
            <span className="text-[10px] text-light-steel font-mono">6 fuentes · 2018 – 2025</span>
          </div>
          <MagicBento className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {epidemioKPIs.map((k, i) => (
              <KpiCard key={k.id} kpi={k} idx={i} />
            ))}
          </MagicBento>
        </div>
      </div>
    </div>
  );
}
