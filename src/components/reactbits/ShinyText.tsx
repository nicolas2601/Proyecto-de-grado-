import type { CSSProperties } from 'react';

/**
 * ShinyText — gradient con shine sweep infinito. CSS puro.
 * Útil para subtítulos / eyebrows que necesiten un toque premium.
 */
export default function ShinyText({
  text,
  speed = 5,
  className = '',
  baseColor = 'rgba(23, 25, 28, 0.55)',
  shineColor = 'rgba(23, 25, 28, 1)',
}: {
  text: string;
  speed?: number;
  className?: string;
  baseColor?: string;
  shineColor?: string;
}) {
  const style: CSSProperties = {
    color: 'transparent',
    backgroundImage: `linear-gradient(110deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
    backgroundSize: '200% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `shinyText ${speed}s linear infinite`,
  };

  return (
    <>
      <style>{`
        @keyframes shinyText {
          0%   { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>
      <span className={className} style={style}>
        {text}
      </span>
    </>
  );
}
