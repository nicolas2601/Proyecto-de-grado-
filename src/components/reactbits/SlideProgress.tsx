import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * SlideProgress · barra de progreso global animada con spring + porcentaje numérico.
 * Reemplaza la barra estática actual.
 */
export default function SlideProgress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });
  const width = useTransform(spring, [0, 1], ['0%', '100%']);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const u = spring.on('change', (v) => setPct(Math.round(v * 100)));
    return () => u();
  }, [spring]);

  return (
    <>
      <div className="no-print fixed top-0 left-0 right-0 z-50 h-[3px] bg-dark-charcoal/5 overflow-hidden">
        <motion.div
          style={{ width }}
          className="h-full"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #0081c0 30%, #41a1cf 70%, #0081c0 100%)',
              backgroundSize: '200% 100%',
              animation: 'shineSlide 3s linear infinite',
            }}
          />
        </motion.div>
      </div>
      <div className="no-print fixed top-1.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <motion.span
          className="text-[10px] font-mono tracking-[0.18em] text-dark-charcoal/50"
          animate={{ opacity: pct > 1 ? 1 : 0 }}
        >
          {String(pct).padStart(2, '0')} %
        </motion.span>
      </div>
      <style>{`
        @keyframes shineSlide {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </>
  );
}
