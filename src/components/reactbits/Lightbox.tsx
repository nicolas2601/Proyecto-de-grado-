import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Lightbox({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(41, 41, 41, 0.78)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? 'Vista ampliada'}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-canvas-white max-h-[88vh] overflow-auto"
            style={{
              border: '1px solid #292929',
              borderRadius: 0,
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="font-condensed absolute top-4 right-4 inline-flex items-center justify-center bg-canvas-white text-ink-black hover:bg-ink-black hover:text-canvas-white transition-colors"
              style={{
                border: '1px solid #292929',
                borderRadius: 0,
                height: 32,
                paddingInline: 14,
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              [ Cerrar · ESC ]
            </button>
            {title && (
              <div className="mb-6 flex items-end gap-4">
                <span className="eyebrow">{title}</span>
                <span className="flex-1 h-px bg-ink-black/100" style={{ background: '#292929' }} />
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
