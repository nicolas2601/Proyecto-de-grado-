import { useEffect, useRef } from 'react';

/**
 * Global cursor spotlight — radial gradient sigue el mouse.
 * Se monta una vez en el shell. Respeta prefers-reduced-motion.
 */
export default function SpotlightCursor({
  color = 'rgba(186, 80, 49, 0.10)',
  size = 520,
}: { color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] mix-blend-multiply"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
        willChange: 'transform',
      }}
    />
  );
}
