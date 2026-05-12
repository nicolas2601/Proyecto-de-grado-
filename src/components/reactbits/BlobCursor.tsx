import { useEffect, useRef } from 'react';

/**
 * BlobCursor — círculo grande que sigue el mouse con difference blend.
 * MUCHO más visible que el spotlight tenue. Se queda como pegote rosa/terracotta.
 */
export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
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

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onEnter = () => {
      if (blobRef.current) blobRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (blobRef.current) blobRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onDown = () => {
      if (blobRef.current) blobRef.current.style.transform += ' scale(0.78)';
    };
    const onUp = () => {
      // reset transform; loop will rewrite next frame
    };

    const loop = () => {
      // blob lags more
      bx += (mx - bx) * 0.12;
      by += (my - by) * 0.12;
      // dot lags less
      dx += (mx - dx) * 0.4;
      dy += (my - dy) * 0.4;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${bx - 28}px, ${by - 28}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
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
        ref={blobRef}
        className="fixed top-0 left-0 pointer-events-none z-[60] no-print"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(186, 80, 49, 0.55)',
          mixBlendMode: 'multiply',
          filter: 'blur(2px)',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[61] no-print"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#17191c',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden
      />
    </>
  );
}
