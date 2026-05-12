import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ham10000, bcn20000, co2wounds, ssLRanking } from '@/data/eda';
import HamClassChart from '@/components/charts/HamClassChart';
import BcnDonutChart from '@/components/charts/BcnDonutChart';
import DatasetCompareChart from '@/components/charts/DatasetCompareChart';
import CoverageMatrix from '@/components/charts/CoverageMatrix';
import BiasMatrix from '@/components/charts/BiasMatrix';
import { cn } from '@/lib/utils';
import { Database, GraduationCap, TrendingDown, CheckCircle } from 'lucide-react';

const PRIO_BADGE: Record<string, string> = {
  CRÍTICA: 'bg-terracotta text-canvas',
  ALTA: 'bg-chart-4 text-canvas',
  MEDIA: 'bg-chart-2 text-canvas',
  BAJA: 'bg-ink/8 text-muted-stone',
};

export default function Slide06EDA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax bg accents */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[5%] right-[6%] w-[450px] h-[450px] rounded-full bg-warm-mist/35 blur-3xl" />
        <div className="absolute top-[50%] left-[4%] w-[380px] h-[380px] rounded-full bg-chart-1/8 blur-3xl" />
        <div className="absolute bottom-[8%] right-[15%] w-[320px] h-[320px] rounded-full bg-terracotta/8 blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        {/* Hero header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <span className="eyebrow text-terracotta flex items-center gap-2">
              <CheckCircle size={14} />
              6 · Avances · Objetivo Específico 1 — COMPLETADO
            </span>
            <h2 className="mt-3 font-display text-[clamp(40px,5.5vw,82px)] leading-[1.02] tracking-tight text-ink">
              Análisis exploratorio <span className="italic text-terracotta">cruzado</span>.
            </h2>
            <p className="mt-3 text-[15px] text-muted-stone max-w-2xl leading-relaxed">
              13 figuras a 300 DPI · 3 datasets analizados · 29 celdas de notebook
              ejecutadas end-to-end en Google Colab · 0 errores.
            </p>
          </div>
          <div className="flex gap-2">
            <StatBox value="13" label="figuras" />
            <StatBox value="3" label="datasets" />
            <StatBox value="29" label="celdas" />
          </div>
        </div>

        {/* Row 1 — Three dataset cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* HAM10000 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="card p-6 relative overflow-hidden cursor-default"
          >
            <Database
              size={110}
              strokeWidth={1}
              className="absolute -top-4 -right-4 text-chart-1/8 pointer-events-none"
            />
            <div className="relative flex items-baseline justify-between mb-2">
              <div>
                <span className="eyebrow text-chart-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-1" />
                  {ham10000.name}
                </span>
                <p className="text-[10px] text-muted-stone mt-1">{ham10000.source}</p>
              </div>
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="font-display text-3xl text-ink"
              >
                {ham10000.size.toLocaleString('es-CO')}
              </motion.span>
            </div>
            <HamClassChart />
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] pt-3 border-t border-ink/8">
              <Metric label="Shannon" value={`${ham10000.shannonEntropy}`} sub={`/${ham10000.shannonMax}`} />
              <Metric label="Gini" value={`${ham10000.gini}`} />
              <Metric label="Res" value={`${ham10000.width}×${ham10000.height}`} />
            </div>
          </motion.div>

          {/* BCN20000 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="card p-6 relative overflow-hidden cursor-default"
          >
            <Database
              size={110}
              strokeWidth={1}
              className="absolute -top-4 -right-4 text-chart-2/10 pointer-events-none"
            />
            <div className="relative flex items-baseline justify-between mb-2">
              <div>
                <span className="eyebrow text-chart-2 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-chart-2" />
                  {bcn20000.name}
                </span>
                <p className="text-[10px] text-muted-stone mt-1">{bcn20000.source}</p>
              </div>
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                viewport={{ once: true }}
                className="font-display text-3xl text-ink"
              >
                {bcn20000.size.toLocaleString('es-CO')}
              </motion.span>
            </div>
            <BcnDonutChart />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-ink/8">
              <Metric label="Gini" value={`${bcn20000.gini}`} />
              <Metric label="Res mediana" value={`~${bcn20000.widthMedian}px`} />
            </div>
          </motion.div>

          {/* CO2Wounds-V2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="card-warm p-6 border-l-4 border-l-terracotta relative overflow-hidden cursor-default"
          >
            <GraduationCap
              size={110}
              strokeWidth={1}
              className="absolute -top-4 -right-4 text-terracotta/15 pointer-events-none"
            />
            <div className="relative flex items-baseline justify-between mb-3">
              <div>
                <span className="eyebrow text-terracotta flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-terracotta" />
                  {co2wounds.name}
                </span>
                <p className="text-[10px] text-muted-stone mt-1">{co2wounds.source}</p>
              </div>
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                viewport={{ once: true }}
                className="font-display text-3xl text-ink"
              >
                {co2wounds.size}
              </motion.span>
            </div>
            <div className="relative space-y-1.5 text-[11.5px]">
              {[
                ['Pacientes', `${co2wounds.patients} (cohorte lepra)`],
                ['Sitio', co2wounds.site],
                ['Captura', co2wounds.capture],
                ['Tarea', co2wounds.task],
                ['Mejor mIoU', `${co2wounds.mIoU} %`],
                ['Mejor F1', `${co2wounds.f1} %`],
                ['Licencia', co2wounds.license],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-terracotta/10 pb-1">
                  <span className="text-muted-stone">{k}</span>
                  <span className="text-ink font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
            <p className="relative mt-3 text-[10.5px] italic text-terracotta leading-snug">
              🎓 {co2wounds.highlight}
            </p>
          </motion.div>
        </div>

        {/* Row 2 — Comparativa + cobertura + sesgos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="lg:col-span-4 card-fog p-5 cursor-default"
          >
            <span className="eyebrow">Comparación dimensional</span>
            <p className="text-[11px] text-muted-stone mt-1 mb-2 leading-snug">
              HAM uniforme vs BCN heterogéneo — diferencia ~4× en megapíxeles.
            </p>
            <DatasetCompareChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="lg:col-span-5 card p-5 cursor-default"
          >
            <span className="eyebrow">Cobertura epidemiológica × datasets</span>
            <p className="text-[11px] text-muted-stone mt-1 mb-3 leading-snug">
              4 patologías CRÍTICAS cubiertas · 6 ausentes (incluye leishmaniasis brote 2025).
            </p>
            <CoverageMatrix />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="lg:col-span-3 card p-5 cursor-default"
          >
            <span className="eyebrow flex items-center gap-1.5">
              <TrendingDown size={12} />
              Sesgos identificados
            </span>
            <p className="text-[11px] text-muted-stone mt-1 mb-3 leading-snug">
              7 sesgos · 3 críticos para mitigar en Objetivo 2.
            </p>
            <BiasMatrix />
          </motion.div>
        </div>

        {/* Row 3 — Decision callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-6 card-warm p-6 md:p-8 flex items-start gap-6 relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-32 -right-32 w-72 h-72 border border-terracotta/20 rounded-full pointer-events-none"
          />
          <div className="font-display text-[64px] text-terracotta leading-none italic shrink-0 relative">
            →
          </div>
          <div className="flex-1 relative">
            <span className="eyebrow text-terracotta">Decisión · núcleo del modelo SSL</span>
            <p className="mt-2 text-[15px] text-ink leading-relaxed">
              <strong className="font-medium">HAM10000 + BCN20000</strong> como corpus
              de preentrenamiento autosupervisado (~29.000 imágenes dermatoscópicas),{' '}
              <strong className="font-medium">7 clases HAM10000</strong> como tarea
              downstream. CO2Wounds-V2 + leishmaniasis = trabajo futuro de
              transferencia de dominio.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {ssLRanking.slice(0, 7).map((r) => (
                <motion.span
                  key={r.rank}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-[10.5px] px-2.5 py-1 rounded-full font-medium cursor-default',
                    PRIO_BADGE[r.priority]
                  )}
                >
                  <span className="opacity-70">#{r.rank}</span>
                  {r.lesion}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="card-fog px-4 py-3 text-center min-w-[80px] cursor-default"
    >
      <p className="font-display text-2xl text-ink leading-none">{value}</p>
      <p className="text-[10px] text-muted-stone mt-1 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-light-steel">{label}</p>
      <p className="text-ink font-medium">
        {value}
        {sub && <span className="text-light-steel">{sub}</span>}
      </p>
    </div>
  );
}
