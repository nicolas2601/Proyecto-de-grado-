import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * DecryptedText · texto que se "decifra" letra por letra desde caracteres aleatorios.
 * Se dispara en viewport. Útil para títulos cortos / labels.
 */
export default function DecryptedText({
  text,
  speed = 32,
  className = '',
  preserveSpaces = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  preserveSpaces?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const [out, setOut] = useState(() => text.split('').map(() => '·'));

  useEffect(() => {
    if (!inView) return;
    const target = text.split('');
    let idx = 0;
    let scramble = 0;
    let raf = 0;

    const tick = () => {
      scramble++;
      setOut(prev =>
        prev.map((_, i) => {
          if (i < idx) return target[i];
          if (preserveSpaces && target[i] === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );
      if (scramble >= 2) {
        scramble = 0;
        idx++;
      }
      if (idx <= target.length) {
        raf = setTimeout(tick, speed) as unknown as number;
      } else {
        setOut(target);
      }
    };
    raf = setTimeout(tick, speed) as unknown as number;
    return () => clearTimeout(raf as unknown as ReturnType<typeof setTimeout>);
  }, [inView, text, speed, preserveSpaces]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out.join('')}</span>
    </span>
  );
}
