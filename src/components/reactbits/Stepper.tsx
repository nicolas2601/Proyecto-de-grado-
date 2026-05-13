import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type StepStatus = 'done' | 'in-progress' | 'pending';

export interface StepItem {
  n: number;
  title: string;
  body: string;
  status: StepStatus;
  progress?: number;
  deliverables?: string[];
}

const STATUS_LABEL: Record<StepStatus, string> = {
  done: 'DONE',
  'in-progress': 'IN PROGRESS',
  pending: 'PENDING',
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Stepper({
  items,
  className = '',
}: {
  items: StepItem[];
  className?: string;
}) {
  return (
    <ol className={cn('relative flex flex-col', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const pct =
          typeof item.progress === 'number'
            ? item.progress
            : item.status === 'done'
            ? 100
            : item.status === 'in-progress'
            ? 35
            : 0;

        const statusText =
          item.status === 'in-progress' ? `IN PROGRESS · ${pct}%` : STATUS_LABEL[item.status];

        return (
          <motion.li
            key={item.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
            viewport={{ once: true, margin: '-10% 0px' }}
            className="relative grid grid-cols-[64px_1fr_auto] items-stretch"
          >
            {/* number tile */}
            <div className="relative flex flex-col">
              <div
                className={cn(
                  'h-16 w-16 flex items-center justify-center font-display text-[32px] leading-none',
                  item.status === 'done'
                    ? 'bg-ink-black text-canvas-white border border-ink-black'
                    : item.status === 'in-progress'
                    ? 'bg-canvas-white text-ink-black border border-ink-black'
                    : 'bg-canvas-white text-grey-300 border border-grey-300',
                )}
              >
                {String(item.n).padStart(2, '0')}
              </div>
              {!isLast && (
                <div
                  aria-hidden
                  className={cn(
                    'mx-auto w-px flex-1 my-0',
                    item.status === 'pending' ? 'bg-grey-300' : 'bg-ink-black',
                  )}
                />
              )}
            </div>

            {/* content */}
            <div className="border-l border-ink-black px-5 pb-10">
              <div className="font-condensed text-[14px] tracking-[0.1em] uppercase text-ink-black">
                OE-{String(item.n).padStart(2, '0')} · {item.title}
              </div>
              <p className="mt-2 font-nh text-[16px] leading-[1.5] text-ink-black max-w-2xl">
                {item.body}
              </p>

              {item.deliverables && item.deliverables.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {item.deliverables.map((d, j) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + i * 0.05 + j * 0.04,
                        ease: EASE,
                      }}
                      viewport={{ once: true }}
                      className="font-mono text-[12px] leading-[1.4] text-ink-black"
                    >
                      <span className="text-grey-500">› </span>
                      {d}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* status badge */}
            <div className="pl-4 pt-1">
              <span
                className={cn(
                  'inline-flex items-center font-condensed text-[11px] tracking-[0.2em] uppercase px-2 py-1 whitespace-nowrap',
                  item.status === 'done' &&
                    'bg-ink-black text-canvas-white border border-ink-black',
                  item.status === 'in-progress' &&
                    'bg-canvas-white text-ink-black border border-ink-black',
                  item.status === 'pending' &&
                    'bg-canvas-white text-grey-300 border border-grey-300',
                )}
              >
                {statusText}
              </span>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
