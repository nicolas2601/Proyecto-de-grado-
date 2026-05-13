import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

/**
 * ScrollReveal · wrapper unificado. Reveal direccional con stagger nativo.
 * `as` permite usar section/div/li/etc. `delay` y `direction` opcionales.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 24,
  once = true,
  margin = '-10% 0px',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  once?: boolean;
  margin?: string;
}) {
  const offsets: Record<typeof direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    fade: {},
  };

  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[direction] },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once, margin: margin as any }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
