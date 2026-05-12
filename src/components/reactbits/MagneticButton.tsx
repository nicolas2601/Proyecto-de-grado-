import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

/**
 * MagneticButton — el botón se mueve sutilmente hacia el cursor cuando está cerca.
 * Spring suave. Reset al salir. Aplica también a links / íconos.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.32,
  as: Tag = 'button',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 230, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 230, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[Tag] as any;
  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <motion.span
        style={{
          x: useSpring(useMotionValue(0), { stiffness: 200, damping: 20 }),
          y: useSpring(useMotionValue(0), { stiffness: 200, damping: 20 }),
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </MotionTag>
  );
}
