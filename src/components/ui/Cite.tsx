import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getCitations, type Citation } from '@/data/citations';

// ─────────────────────────────────────────────────────────────────────────
// <Cite refs={['uribe-2018']} /> · badge inline minimal con popover de cita
// Variantes: 'badge' (default, dot + count) | 'inline' (autor · año) | 'sup' (¹)
// Accesibilidad: tabindex, aria-expanded, Esc cierra, click fuera cierra.
// ─────────────────────────────────────────────────────────────────────────

type Variant = 'badge' | 'inline' | 'sup';

export function Cite({
  refs,
  variant = 'badge',
  tone = 'navy',
}: {
  refs: string | string[];
  variant?: Variant;
  tone?: 'navy' | 'paper' | 'white';
}) {
  const ids = typeof refs === 'string' ? [refs] : refs;
  const items = getCitations(ids);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; flipUp: boolean } | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcula posición · viewport-aware con flip up/left si va a salir.
  useLayoutEffect(() => {
    if (!open || !rootRef.current) return;
    const compute = () => {
      const r = rootRef.current!.getBoundingClientRect();
      const POP_W = 340;
      const POP_H_EST = 220;
      const margin = 12;
      // X · prefiero alinear izquierda del trigger; flip a derecha si sale
      let left = r.left;
      if (left + POP_W + margin > window.innerWidth) {
        left = Math.max(margin, r.right - POP_W);
      }
      if (left < margin) left = margin;
      // Y · prefiero abajo; flip arriba si no cabe
      const spaceBelow = window.innerHeight - r.bottom;
      const flipUp = spaceBelow < POP_H_EST + margin && r.top > POP_H_EST + margin;
      const top = flipUp ? r.top - 8 : r.bottom + 8;
      setPos({ top, left, flipUp });
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        rootRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (items.length === 0) return null;

  // ── colores por tono ──
  const palette =
    tone === 'navy'
      ? { fg: 'rgba(255,255,255,0.72)', bg: 'rgba(255,255,255,0.08)', hov: 'rgba(255,255,255,0.16)', border: 'rgba(255,255,255,0.18)' }
      : tone === 'white'
      ? { fg: '#FFFFFF', bg: 'rgba(255,255,255,0.12)', hov: 'rgba(255,255,255,0.22)', border: 'rgba(255,255,255,0.28)' }
      : { fg: '#1F8C88', bg: 'rgba(31,140,136,0.08)', hov: 'rgba(31,140,136,0.16)', border: 'rgba(31,140,136,0.22)' };

  // ── label del trigger ──
  const triggerLabel =
    variant === 'inline'
      ? items.map((c) => c.short).join(' · ')
      : variant === 'sup'
      ? `[${items.length}]`
      : `${items.length}`;

  return (
    <span ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        title={items.map((c) => c.short).join(' · ')}
        style={{
          appearance: 'none',
          background: open ? palette.hov : palette.bg,
          color: palette.fg,
          border: `1px solid ${palette.border}`,
          borderRadius: variant === 'sup' ? 4 : 9999,
          padding:
            variant === 'inline'
              ? '2px 8px'
              : variant === 'sup'
              ? '1px 5px'
              : '1px 7px 1px 5px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: variant === 'sup' ? 9 : 10,
          letterSpacing: '0.02em',
          lineHeight: 1.1,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          verticalAlign: 'middle',
          marginInline: 3,
          transition: 'background-color 160ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {variant === 'badge' && (
          <span
            aria-hidden
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: palette.fg,
              opacity: 0.6,
            }}
          />
        )}
        <span>{triggerLabel}</span>
      </button>

      {mounted && pos
        ? createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  id={popoverId}
                  role="dialog"
                  ref={popoverRef}
                  initial={{ opacity: 0, y: pos.flipUp ? -6 : 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: pos.flipUp ? -4 : 4,
                    scale: 0.97,
                    transition: { duration: 0.14 },
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'fixed',
                    top: pos.flipUp ? undefined : pos.top,
                    bottom: pos.flipUp ? window.innerHeight - pos.top : undefined,
                    left: pos.left,
                    zIndex: 9999,
                    width: 340,
                    maxWidth: 'calc(100vw - 24px)',
                    background: '#FFFFFF',
                    border: '1px solid rgba(15, 44, 69, 0.12)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    boxShadow:
                      '0 18px 40px -16px rgba(15,44,69,0.36), 0 2px 6px -2px rgba(15,44,69,0.16)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#4D5B6D',
                      marginBottom: 10,
                    }}
                  >
                    Fuente{items.length > 1 ? 's' : ''} · {items.length}
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      maxHeight: 320,
                      overflowY: 'auto',
                    }}
                  >
                    {items.map((c) => (
                      <CitationRow key={c.id} c={c} />
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </span>
  );
}

function CitationRow({ c }: { c: Citation }) {
  return (
    <li style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span
        style={{
          fontSize: 11,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#1F8C88',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {c.short}
      </span>
      <span style={{ fontSize: 12.5, lineHeight: 1.45, color: '#1A2332' }}>
        {c.full}
      </span>
      {c.url && (
        <a
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#4D5B6D',
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            wordBreak: 'break-all',
            marginTop: 2,
          }}
        >
          {c.url}
        </a>
      )}
    </li>
  );
}

// ── Stat con cita integrada · uso común en cards de cifras
export function Stat({
  value,
  label,
  refs,
  tone = 'navy',
  size = 'md',
}: {
  value: React.ReactNode;
  label: string;
  refs?: string | string[];
  tone?: 'navy' | 'paper' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizes = {
    sm: { num: 28, label: 10 },
    md: { num: 44, label: 11 },
    lg: { num: 64, label: 12 },
    xl: { num: 88, label: 13 },
  } as const;
  const s = sizes[size];
  const numColor =
    tone === 'navy' || tone === 'white' ? '#FFFFFF' : '#0F2C45';
  const labelColor =
    tone === 'navy' || tone === 'white' ? 'rgba(255,255,255,0.65)' : '#4D5B6D';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: s.num,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: numColor,
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
        }}
      >
        {value}
        {refs && <Cite refs={refs} tone={tone} />}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: s.label,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: labelColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}
