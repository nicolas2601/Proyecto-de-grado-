import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Typewriter · texto que se "tipea" con caret parpadeante.
 * Loop opcional con pausa entre ciclos. Respeta prefers-reduced-motion.
 */
export default function Typewriter({
  text,
  speed = 38,
  startDelay = 0,
  loop = false,
  loopPause = 4000,
  className = '',
  caretClassName = '',
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  loop?: boolean;
  loopPause?: number;
  className?: string;
  caretClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: !loop, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState('');

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(text);
      return;
    }

    let cancelled = false;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setShown('');
      const start = () => {
        for (let i = 0; i <= text.length; i++) {
          const id = setTimeout(() => {
            if (!cancelled) setShown(text.slice(0, i));
          }, i * speed);
          timeouts.push(id);
        }
        if (loop) {
          const tail = setTimeout(() => {
            if (!cancelled) runCycle();
          }, text.length * speed + loopPause);
          timeouts.push(tail);
        }
      };
      const startId = setTimeout(start, startDelay);
      timeouts.push(startId);
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
      timeouts = [];
    };
  }, [inView, text, speed, startDelay, loop, loopPause, reduced]);

  return (
    <span ref={ref} className={className}>
      {shown}
      <span
        className={`inline-block align-baseline ${caretClassName}`}
        aria-hidden
        style={{
          width: '0.55ch',
          marginLeft: '1px',
          borderRight: '2px solid currentColor',
          animation: 'caret-blink 1.05s steps(1) infinite',
          color: 'inherit',
          opacity: 0.85,
        }}
      />
      <style>{`
        @keyframes caret-blink {
          0%, 49% { border-right-color: currentColor; }
          50%, 100% { border-right-color: transparent; }
        }
      `}</style>
    </span>
  );
}
