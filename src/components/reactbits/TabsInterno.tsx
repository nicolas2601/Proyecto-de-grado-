import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export default function TabsInterno({
  tabs,
  initial,
  className = '',
  panelClassName = '',
}: {
  tabs: TabItem[];
  initial?: string;
  className?: string;
  panelClassName?: string;
}) {
  const [active, setActive] = useState<string>(initial ?? tabs[0]?.id ?? '');
  const current = tabs.find((t) => t.id === active);

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        className="flex flex-wrap items-stretch gap-0 mb-10 border-b border-ink-black"
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                'relative inline-flex items-center font-condensed text-[14px] uppercase tracking-[0.1em] px-5 py-3 transition-colors',
                idx > 0 && 'border-l border-ink-black',
                isActive ? 'text-ink-black' : 'text-grey-300 hover:text-ink-black',
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-grey-500 mr-3">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  aria-hidden
                  className="absolute inset-0 border border-ink-black bg-canvas-white -z-0 pointer-events-none"
                  style={{ borderBottomColor: 'transparent' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className={cn('bg-canvas-white', panelClassName)}
        >
          {current?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
