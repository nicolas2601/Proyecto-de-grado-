import { useEffect, useRef } from 'react';

/**
 * MONO X7 cursor — ink square with mix-blend-mode: difference.
 * Inverts the underlying content so it stays visible on both white sections
 * and inverted (.card-dark) zones without ever looking decorative.
 * Grows when hovering interactive elements (a, button, [role="button"], [data-cursor="magnetic"]).
 */
export default function BlobCursor() {
  const blockRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx;
    let by = my;
    let dx = mx;
    let dy = my;
    let raf = 0;
    let hovering = false;
    let pressed = false;

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'LABEL') return true;
      if ((el as HTMLElement).dataset.cursor === 'magnetic') return true;
      if ((el as HTMLElement).getAttribute('role') === 'button') return true;
      if ((el as HTMLElement).getAttribute('tabindex') === '0') return true;
      return false;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      let n: Element | null = e.target as Element | null;
      let h = false;
      while (n && n !== document.body) {
        if (isInteractive(n)) { h = true; break; }
        n = n.parentElement;
      }
      hovering = h;
    };
    const onEnter = () => {
      if (blockRef.current) blockRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (blockRef.current) blockRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onDown = () => { pressed = true; };
    const onUp = () => { pressed = false; };

    const loop = () => {
      bx += (mx - bx) * 0.18;
      by += (my - by) * 0.18;
      dx += (mx - dx) * 0.42;
      dy += (my - dy) * 0.42;

      if (blockRef.current) {
        const baseSize = hovering ? 56 : 22;
        const size = pressed ? baseSize * 0.78 : baseSize;
        const half = size / 2;
        blockRef.current.style.width = `${size}px`;
        blockRef.current.style.height = `${size}px`;
        blockRef.current.style.transform = `translate3d(${bx - half}px, ${by - half}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx - 2}px, ${dy - 2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={blockRef}
        className="fixed top-0 left-0 pointer-events-none z-[60] no-print"
        style={{
          width: 22,
          height: 22,
          borderRadius: 0,
          background: '#ffffff',
          mixBlendMode: 'difference',
          willChange: 'transform, width, height',
          opacity: 0,
          transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), width 220ms cubic-bezier(0.16, 1, 0.3, 1), height 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[61] no-print"
        style={{
          width: 4,
          height: 4,
          borderRadius: 0,
          background: '#ffffff',
          mixBlendMode: 'difference',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden
      />
    </>
  );
}
