import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — cuenta de 0 al valor objetivo cuando entra en viewport.
 * Soporta decimales, separador miles y sufijos.
 */
export default function CountUp({
  value,
  duration = 1.6,
  decimals = 0,
  separator = '.',
  prefix = '',
  suffix = '',
  className = '',
  start = 0,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  start?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const from = start;
    const to = value;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, start]);

  const formatted = display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
