import { motion } from 'framer-motion';
import { biasMatrix } from '@/data/eda';
import { cn } from '@/lib/utils';

const SEVERITY = {
  high:   { bar: 'bg-terracotta', dot: 'bg-terracotta', label: 'Crítico' },
  medium: { bar: 'bg-chart-2',    dot: 'bg-chart-2',    label: 'Medio' },
  low:    { bar: 'bg-chart-3',    dot: 'bg-chart-3',    label: 'Bajo' },
};

export default function BiasMatrix() {
  return (
    <div className="space-y-1.5">
      {biasMatrix.map((b, i) => {
        const s = SEVERITY[b.severity];
        return (
          <motion.div
            key={b.bias}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-[100px_1fr_60px] items-center gap-2"
          >
            <span className="text-[11.5px] font-medium text-ink">{b.bias}</span>
            <div className="relative h-1.5 bg-ink/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: b.severity === 'high' ? '92%' : b.severity === 'medium' ? '58%' : '30%',
                }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={cn('h-full rounded-full', s.bar)}
              />
            </div>
            <span className="text-[9px] uppercase tracking-wider text-muted-stone font-mono text-right">
              {s.label}
            </span>
            <span className="col-span-3 text-[11px] text-muted-stone leading-snug -mt-1 ml-0">
              {b.desc}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
