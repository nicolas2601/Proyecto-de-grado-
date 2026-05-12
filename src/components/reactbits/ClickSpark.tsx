import { useEffect, useRef } from 'react';

/**
 * ClickSpark — chispitas radiales al hacer click en cualquier parte.
 * Canvas overlay global, sin DOM extra por click.
 */
export default function ClickSpark({
  sparkColor = '#ba5031',
  sparkSize = 9,
  sparkRadius = 16,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
}: {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Array<{ x: number; y: number; angle: number; startTime: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const setSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const easeFn = (t: number) => {
      switch (easing) {
        case 'linear': return t;
        case 'ease-in': return t * t;
        case 'ease-in-out': return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        default: return 1 - Math.pow(1 - t, 3);
      }
    };

    let raf = 0;
    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter(s => {
        const elapsed = now - s.startTime;
        if (elapsed >= duration) return false;
        const p = elapsed / duration;
        const eased = easeFn(p);
        const r = sparkRadius * eased;
        const x1 = s.x + r * Math.cos(s.angle);
        const y1 = s.y + r * Math.sin(s.angle);
        const x2 = s.x + (r + sparkSize) * Math.cos(s.angle);
        const y2 = s.y + (r + sparkSize) * Math.sin(s.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 1 - p;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / sparkCount,
          startTime: now,
        });
      }
    };
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(raf);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
