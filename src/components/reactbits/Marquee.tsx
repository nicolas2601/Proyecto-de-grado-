import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

/**
 * Marquee — banda horizontal con loop infinito. Tipografía cinemática.
 * Útil para títulos de sección, eyebrow infinito, lista de tags.
 */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  className = '',
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }
          : undefined
      }
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
        style={{
          animationPlayState: pauseOnHover ? undefined : 'running',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
