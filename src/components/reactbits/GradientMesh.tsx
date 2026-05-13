import { motion } from 'framer-motion';

/**
 * GradientMesh · fondo animado tipo "aurora" de manchas pastel que flotan.
 * Más visible que Aurora WebGL en hardware básico. CSS puro.
 */
export default function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      <motion.div
        animate={{
          x: ['-15%', '20%', '-10%', '-15%'],
          y: ['-10%', '15%', '20%', '-10%'],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(186,80,49,0.42) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          x: ['20%', '-15%', '30%', '20%'],
          y: ['10%', '-20%', '15%', '10%'],
          scale: [1, 0.85, 1.2, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-0 w-[55vw] h-[55vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,225,209,0.65) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
      />
      <motion.div
        animate={{
          x: ['-10%', '25%', '-20%', '-10%'],
          y: ['30%', '5%', '40%', '30%'],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(93,42,26,0.18) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          x: ['30%', '-5%', '25%', '30%'],
          y: ['20%', '35%', '-5%', '20%'],
          scale: [1, 0.9, 1.25, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-1/4 left-1/2 w-[40vw] h-[40vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(1,115,178,0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
