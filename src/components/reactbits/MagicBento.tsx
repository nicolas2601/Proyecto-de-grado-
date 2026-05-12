import { useRef, type ReactNode } from 'react';

/**
 * MagicBento — wrapper que añade spotlight radial siguiendo el mouse a CADA card hija.
 * Las cards deben tener `data-bento` para ser tracked. Usa CSS custom props.
 */
export default function MagicBento({
  children,
  className = '',
  glowColor = '186, 80, 49',
  radius = 240,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const root = ref.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>('[data-bento]');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={className}
      style={{
        // expose css vars for children
        ['--bento-glow' as any]: glowColor,
        ['--bento-radius' as any]: `${radius}px`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * BentoCard — card con spotlight radial nativo. Usa CSS vars del parent MagicBento.
 */
export function BentoCard({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-bento
      className={`relative overflow-hidden group ${className}`}
      style={{
        // @ts-expect-error css vars
        '--mx': '50%',
        '--my': '50%',
      }}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(var(--bento-radius, 240px) circle at var(--mx) var(--my), rgba(var(--bento-glow, 186 80 49), 0.18), transparent 60%)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
