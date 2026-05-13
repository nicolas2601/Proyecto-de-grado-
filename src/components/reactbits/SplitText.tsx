import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SplitText · char-by-char reveal con GSAP, trigger por scroll o mount.
 * Preserva spans para subrayados/italics interpolados (children as ReactNode).
 */
export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
  ease = 'power3.out',
  trigger = 'mount',
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'scroll';
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>('[data-char]');
    gsap.set(chars, { yPercent: 110, opacity: 0 });

    const tween = () =>
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
      });

    if (trigger === 'scroll') {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => tween(),
      });
      return () => st.kill();
    }

    const tw = tween();
    return () => {
      tw.kill();
    };
  }, [text, delay, duration, stagger, ease, trigger]);

  const words = text.split(/(\s+)/);

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`s-${wi}`} aria-hidden style={{ whiteSpace: 'pre' }}>
              {word}
            </span>
          );
        }
        return (
          <span
            key={`w-${wi}`}
            aria-hidden
            className="inline-block"
            style={{ whiteSpace: 'nowrap' }}
          >
            {word.split('').map((ch, ci) => (
              <span key={ci} data-char className="inline-block">
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
