import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { scrollToSlide } from '@/lib/scroll';
import GradientMesh from '@/components/reactbits/GradientMesh';
import ThreeBlob from '@/components/reactbits/ThreeBlob';
import SplitText from '@/components/reactbits/SplitText';
import ShinyText from '@/components/reactbits/ShinyText';
import DecryptedText from '@/components/reactbits/DecryptedText';
import Marquee from '@/components/reactbits/Marquee';
import MagneticButton from '@/components/reactbits/MagneticButton';
import { projectMeta } from '@/data/eda';

const MARQUEE_TAGS = [
  'Aprendizaje autosupervisado',
  'SimCLR · DINO · MAE',
  'HAM10000 · BCN20000 · CO2Wounds-V2',
  'Santander · Colombia',
  'UNAB 2026',
  'Vision Transformer',
  'Diagnóstico asistido',
  'Proyecto de Grado I',
];

export default function Slide00Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const meshOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const meshScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const marqueeY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden bg-canvas">
      {/* Gradient mesh background — visible y animated */}
      <motion.div
        style={{ opacity: meshOpacity, scale: meshScale }}
        className="absolute inset-0 origin-center"
        aria-hidden
      >
        <GradientMesh />
      </motion.div>

      {/* Three.js blob — top-right corner, mouse-reactive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -top-32 -right-32 w-[55vh] h-[55vh] pointer-events-none lg:pointer-events-auto"
      >
        <ThreeBlob />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 0%, rgba(251,247,242,0.30) 70%, rgba(251,247,242,0.85) 100%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" aria-hidden />

      {/* Top eyebrow chip — glass */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[clamp(28px,5vh,56px)] left-1/2 -translate-x-1/2 z-20"
      >
        <div className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium text-ink/80 shadow-sm">
          <Sparkles size={12} className="text-terracotta" strokeWidth={2} />
          <ShinyText text="Sustentación · Proyecto de Grado I · UNAB 2026" speed={6} />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: titleY, scale: heroScale }}
        className="relative z-10 w-full h-full min-h-screen flex flex-col items-center justify-center px-[clamp(24px,6vw,120px)] py-24 text-center"
      >
        <h1 className="font-display text-[clamp(36px,7.5vw,108px)] leading-[0.98] tracking-[-0.02em] text-ink max-w-[18ch]">
          <SplitText text="Aprendizaje " as="span" stagger={0.018} delay={0.3} />
          <span className="italic text-terracotta">
            <SplitText text="autosupervisado" as="span" stagger={0.018} delay={0.45} />
          </span>
          <br />
          <SplitText text="para lesiones cutáneas" as="span" stagger={0.018} delay={0.7} />
          <br />
          <span className="text-ink/70 italic font-normal">
            <SplitText text="en Santander." as="span" stagger={0.018} delay={0.95} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[58ch] text-[15px] md:text-[16px] leading-relaxed text-ink/70 font-mono"
          style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
        >
          Un algoritmo que aprende{' '}
          <span className="text-terracotta">sin etiquetas masivas</span>{' '}
          para apoyar el diagnóstico clínico en centros médicos de Santander.
        </motion.p>

        {/* Authors block — glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 text-[13px]"
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-4 text-left md:text-right shadow-sm cursor-default"
          >
            <span className="eyebrow block text-[10px]">Autores</span>
            <p className="mt-1.5 text-ink font-medium leading-snug">{projectMeta.authors[0]}</p>
            <p className="text-ink/75 leading-snug">{projectMeta.authors[1]}</p>
          </motion.div>

          <div className="hidden md:flex items-center justify-center">
            <motion.div
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="h-12 w-px bg-terracotta/50 origin-center"
              aria-hidden
            />
          </div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-4 text-left shadow-sm cursor-default"
          >
            <span className="eyebrow block text-[10px]">Director · Asesora</span>
            <p className="mt-1.5 text-ink font-medium leading-snug">{projectMeta.director}</p>
            <p className="text-ink/75 leading-snug">{projectMeta.advisor}</p>
            <p className="text-light-steel text-[11px] mt-0.5 leading-tight">
              {projectMeta.advisorAffiliation}
            </p>
          </motion.div>
        </motion.div>

        {/* CTA + course footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <MagneticButton
            as="button"
            strength={0.4}
            onClick={() => scrollToSlide(1)}
            className="group relative overflow-hidden rounded-full bg-ink text-canvas px-7 py-3 text-[13px] font-medium tracking-wide shadow-xl hover:shadow-terracotta/30 transition-shadow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Iniciar sustentación
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={14} strokeWidth={2} className="rotate-[-90deg]" />
              </motion.span>
            </span>
            <span
              className="absolute inset-0 bg-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden
            />
          </MagneticButton>

          <span className="text-[10px] uppercase tracking-[0.25em] text-light-steel font-mono">
            <DecryptedText
              text={`${projectMeta.university}  ·  ${projectMeta.course}`}
              speed={28}
            />
          </span>
        </motion.div>
      </motion.div>

      {/* Marquee infinito — bottom */}
      <motion.div
        style={{ y: marqueeY }}
        className="absolute bottom-0 left-0 right-0 z-10 pb-6 select-none pointer-events-none"
      >
        <Marquee duration={42} className="text-[clamp(34px,5.5vw,72px)] font-display italic text-ink/8">
          {MARQUEE_TAGS.map((tag, i) => (
            <span key={i} className="mx-8 flex items-center gap-8">
              <span>{tag}</span>
              <span className="text-terracotta/40">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Down hint - corner */}
      <motion.button
        type="button"
        onClick={() => scrollToSlide(1)}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 1 }}
        whileHover={{ y: 4, scale: 1.05 }}
        className="absolute bottom-[clamp(12px,3vh,28px)] right-[clamp(20px,4vw,60px)] z-20 flex items-center gap-2 text-[10px] font-mono text-light-steel hover:text-terracotta transition-colors no-print group"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
        scroll
      </motion.button>
    </div>
  );
}
