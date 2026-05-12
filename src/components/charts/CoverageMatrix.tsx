import { motion } from 'framer-motion';
import { coverageMatrix } from '@/data/eda';
import { cn } from '@/lib/utils';

const CELL: Record<string, { bg: string; text: string; label: string }> = {
  covered: { bg: 'bg-chart-3', text: 'text-canvas', label: 'Sí' },
  partial: { bg: 'bg-chart-2', text: 'text-canvas', label: 'P' },
  absent: { bg: 'bg-ink/8', text: 'text-light-steel', label: '·' },
};

const PRIO_COLOR: Record<string, string> = {
  CRÍTICA: 'text-terracotta',
  ALTA: 'text-chart-4',
  MEDIA: 'text-chart-2',
  BAJA: 'text-light-steel',
  FUTURO: 'text-chart-1',
};

export default function CoverageMatrix() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[1fr_repeat(3,68px)] gap-1 mb-1.5 text-[10px] uppercase tracking-wider text-light-steel font-medium">
        <div />
        <div className="text-center">HAM</div>
        <div className="text-center">BCN</div>
        <div className="text-center">CO2W</div>
      </div>

      {/* Rows */}
      <div className="space-y-0.5">
        {coverageMatrix.map((row, i) => (
          <motion.div
            key={row.pathology}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-[1fr_repeat(3,68px)] gap-1 items-center"
          >
            <div className="text-[11.5px] flex items-center gap-1.5">
              <span className="text-ink leading-tight">{row.pathology}</span>
              <span
                className={cn(
                  'text-[9px] font-mono uppercase tracking-wider shrink-0',
                  PRIO_COLOR[row.priority]
                )}
              >
                · {row.priority}
              </span>
            </div>
            {(['ham', 'bcn', 'co2'] as const).map((col) => {
              const v = row[col];
              const c = CELL[v];
              return (
                <div
                  key={col}
                  className={cn(
                    'h-7 rounded flex items-center justify-center text-[11px] font-semibold',
                    c.bg,
                    c.text
                  )}
                >
                  {c.label}
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex gap-3 text-[10px] text-muted-stone">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-chart-3" /> cubierta
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-chart-2" /> parcial
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-3 rounded-sm bg-ink/15" /> ausente
        </span>
      </div>
    </div>
  );
}
