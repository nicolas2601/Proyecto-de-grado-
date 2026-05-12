import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Check, Loader2, Circle, ChevronRight, Sparkles } from 'lucide-react';
import { objetivoGeneral, objetivosEspecificos } from '@/data/eda';
import { cn } from '@/lib/utils';

const STATUS_ICON = {
  done: Check,
  'in-progress': Loader2,
  pending: Circle,
};

const STATUS_LABEL = {
  done: 'Completado',
  'in-progress': 'En curso',
  pending: 'Planeado',
};

const STATUS_RING = {
  done: 'bg-chart-3 text-canvas ring-chart-3/30',
  'in-progress': 'bg-terracotta text-canvas ring-terracotta/30 animate-pulse',
  pending: 'bg-canvas text-muted-stone ring-ink/15',
};

export default function Slide03Objectives() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Parallax bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[8%] left-[3%] w-[380px] h-[380px] rounded-full bg-warm-mist/40 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-[460px] h-[460px] rounded-full bg-chart-1/8 blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        <span className="eyebrow">3 · Justificación · Alcance · Objetivos</span>
        <h2 className="mt-3 font-display text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-tight text-ink max-w-3xl">
          Por qué <span className="italic text-terracotta">ahora</span>, por qué{' '}
          <span className="italic">aquí</span>.
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Justificación + Alcance (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow">Justificación</span>
              <ul className="mt-3 space-y-2.5">
                <Bullet>Carga epidemiológica documentada (CBC, melanoma, leishmaniasis).</Bullet>
                <Bullet>Bucaramanga es uno de los 4 registros poblacionales nacionales de cáncer.</Bullet>
                <Bullet>Escasez de datos etiquetados regionales → SSL como respuesta natural.</Bullet>
                <Bullet>Apoyo al médico general / dermatólogo, no reemplazo del juicio clínico.</Bullet>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="card-fog"
            >
              <span className="eyebrow">Alcance · qué sí, qué no</span>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[11.5px]">
                <Tag positive>Datasets públicos</Tag>
                <Tag positive>Fine-tuning literatura</Tag>
                <Tag positive>Baseline supervisado</Tag>
                <Tag positive>Webapp prototipo</Tag>
                <Tag>No recolección clínica</Tag>
                <Tag>No pacientes reales</Tag>
                <Tag>No integración hospitalaria</Tag>
                <Tag>No validación clínica formal</Tag>
              </div>
            </motion.div>
          </div>

          {/* Objetivos (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* General */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="card-warm relative overflow-hidden cursor-default"
            >
              <Sparkles
                className="absolute top-4 right-4 text-terracotta/25"
                size={28}
              />
              <span className="eyebrow text-terracotta">Objetivo general</span>
              <p className="mt-3 text-[16px] text-ink leading-relaxed pr-12">
                {objetivoGeneral}
              </p>
            </motion.div>

            {/* Objetivos específicos en grid 2x2 con timeline diagonal */}
            <div>
              <span className="eyebrow mb-4 block">Objetivos específicos · 4 hitos</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objetivosEspecificos.map((obj, i) => {
                  const Icon = STATUS_ICON[obj.status];
                  return (
                    <motion.div
                      key={obj.n}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.55 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                      className={cn(
                        'relative card p-5 cursor-default group',
                        obj.status === 'done' && 'border-l-4 border-l-chart-3',
                        obj.status === 'in-progress' && 'border-l-4 border-l-terracotta',
                      )}
                    >
                      {/* Status badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={cn(
                            'h-10 w-10 rounded-xl flex items-center justify-center ring-4',
                            STATUS_RING[obj.status]
                          )}
                        >
                          <Icon size={18} className={obj.status === 'in-progress' ? 'animate-spin' : ''} />
                        </div>
                        <span className="font-display text-3xl text-light-steel/40 italic">
                          OE-{obj.n}
                        </span>
                      </div>
                      <h4 className="text-base font-medium text-ink mb-1">{obj.title}</h4>
                      <p className="text-[13px] text-muted-stone leading-snug mb-3">{obj.body}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-ink/8">
                        <span
                          className={cn(
                            'text-[10px] uppercase tracking-wider font-mono font-semibold',
                            obj.status === 'done' && 'text-chart-3',
                            obj.status === 'in-progress' && 'text-terracotta',
                            obj.status === 'pending' && 'text-light-steel'
                          )}
                        >
                          {STATUS_LABEL[obj.status]}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-light-steel group-hover:translate-x-1 group-hover:text-terracotta transition-all"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      whileHover={{ x: 2 }}
      className="flex items-start gap-3 text-sm text-ink/85 leading-relaxed group cursor-default"
    >
      <span className="mt-2 inline-block h-px w-4 bg-terracotta group-hover:w-8 transition-all duration-300" />
      <span>{children}</span>
    </motion.li>
  );
}

function Tag({ children, positive = false }: { children: React.ReactNode; positive?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors',
        positive
          ? 'bg-chart-3/12 text-chart-3 border border-chart-3/25 hover:bg-chart-3/20'
          : 'bg-canvas text-light-steel border border-ink/10 line-through decoration-light-steel/40 hover:border-ink/25'
      )}
    >
      {children}
    </span>
  );
}
