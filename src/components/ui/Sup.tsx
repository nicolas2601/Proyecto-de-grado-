// ─────────────────────────────────────────────────────────────────────────
// Sup · superíndice académico [n] clickeable. Numeración manual por
// sección. Al activarse, abre un popover con la cita completa desde
// citations.ts. Cumple regla: "todo dato numérico va con superíndice de
// referencia [n]".
// ─────────────────────────────────────────────────────────────────────────

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getCitations, type Citation } from '@/data/citations';

export type SupProps = {
  /** Número del superíndice tal como aparece en la sección. */
  n: number;
  /** IDs del catálogo de citations.ts asociados a este superíndice. */
  refs: string | string[];
  /** Tono visual del superíndice. */
  tone?: 'graphite' | 'sky' | 'moss' | 'white';
  /** Tamaño relativo. */
  size?: 'sm' | 'md';
};

export default function Sup({ n, refs, tone = 'graphite', size = 'sm' }: SupProps) {
  const ids = typeof refs === 'string' ? [refs] : refs;
  const items = getCitations(ids);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; flipUp: boolean } | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const compute = () => {
      const r = triggerRef.current!.getBoundingClientRect();
      const POP_W = 360;
      const POP_H_EST = 220;
      const margin = 12;
      let left = r.left;
      if (left + POP_W + margin > window.innerWidth) {
        left = Math.max(margin, r.right - POP_W);
      }
      if (left < margin) left = margin;
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
        triggerRef.current?.contains(e.target as Node) ||
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

  const colorByTone: Record<string, string> = {
    graphite: 'var(--ada-graphite)',
    sky: 'var(--ada-sky)',
    moss: 'var(--ada-moss)',
    white: 'rgba(255,255,255,0.85)',
  };

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
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
          background: 'transparent',
          border: 0,
          padding: 0,
          margin: 0,
          marginInlineStart: 1,
          color: colorByTone[tone] ?? colorByTone.graphite,
          font: 'inherit',
          fontFeatureSettings: '"sups" 1',
          fontSize: size === 'md' ? '0.75em' : '0.65em',
          verticalAlign: 'super',
          lineHeight: 0,
          cursor: 'pointer',
          fontWeight: 500,
          opacity: 0.7,
          transition: 'opacity 160ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = open ? '1' : '0.7';
        }}
      >
        [{n}]
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
                    width: 360,
                    maxWidth: 'calc(100vw - 24px)',
                    background: 'var(--ada-vapor)',
                    border: '1px solid var(--ada-mist)',
                    borderRadius: 8,
                    padding: '16px 18px',
                    boxShadow:
                      '0 18px 40px -16px rgba(10,11,12,0.18), 0 2px 6px -2px rgba(10,11,12,0.06)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      color: 'var(--ada-graphite)',
                      opacity: 0.55,
                      marginBottom: 12,
                    }}
                  >
                    Referencia [{n}] · {items.length} fuente{items.length > 1 ? 's' : ''}
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      maxHeight: 340,
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
    </>
  );
}

function CitationRow({ c }: { c: Citation }) {
  return (
    <li style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--ada-moss)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {c.short}
      </span>
      <span
        style={{
          fontSize: 13,
          lineHeight: 1.45,
          color: 'var(--ada-graphite)',
        }}
      >
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
            color: 'var(--ada-graphite)',
            opacity: 0.55,
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
