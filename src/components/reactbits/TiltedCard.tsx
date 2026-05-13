import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltedCard · perspective tilt 3D que sigue al mouse.
 * Spring suave + glare opcional. Reactiva por hover.
 */
export default function TiltedCard({
  children,
  className = '',
  intensity = 8,
  glare = true,
  scale = 1.015,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 250, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 250, damping: 22 });

  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={{ scale }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      transition={{ scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="relative h-full w-full">
        {children}
      </div>
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`
            ) as any,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </motion.div>
  );
}
