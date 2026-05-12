import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import Aurora from '@/components/reactbits/Aurora';
import SplitText from '@/components/reactbits/SplitText';
import ShinyText from '@/components/reactbits/ShinyText';
import DecryptedText from '@/components/reactbits/DecryptedText';
import { projectMeta } from '@/data/eda';

export default function Slide00Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const auroraOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden bg-canvas">
      {/* Aurora WebGL background */}
      <motion.div
        style={{ opacity: auroraOpacity, scale: auroraScale }}
        className="absolute inset-0 origin-center"
        aria-hidden
      >
        <Aurora
          colorStops={['#fbe1d1', '#ba5031', '#5d2a1a']}
          amplitude={0.85}
          blend={0.45}
        />
      </motion.div>

      {/* Warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 0%, rgba(251,247,242,0.35) 70%, rgba(251,247,242,0.85) 100%)',
        }}
        aria-hidden
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none opacity-50" aria-hidden />

      {/* Top eyebrow chip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[clamp(28px,5vh,56px)] left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-2 rounded-full bg-ink/5 backdrop-blur-md border border-ink/10 px-4 py-1.5 text-[11px] font-medium text-ink/80">
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
          <SplitText
            text="Aprendizaje "
            as="span"
            stagger={0.018}
            delay={0.3}
          />
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

        {/* Authors block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 text-[13px]"
        >
          <div className="text-left md:text-right">
            <span className="eyebrow block text-[10px]">Autores</span>
            <p className="mt-1.5 text-ink font-medium leading-snug">
              {projectMeta.authors[0]}
            </p>
            <p className="text-ink/75 leading-snug">{projectMeta.authors[1]}</p>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="h-12 w-px bg-ink/15" aria-hidden />
          </div>

          <div className="text-left md:text-left">
            <span className="eyebrow block text-[10px]">Director · Asesora</span>
            <p className="mt-1.5 text-ink font-medium leading-snug">
              {projectMeta.director}
            </p>
            <p className="text-ink/75 leading-snug">{projectMeta.advisor}</p>
            <p className="text-light-steel text-[11px] mt-0.5 leading-tight">
              {projectMeta.advisorAffiliation}
            </p>
          </div>
        </motion.div>

        {/* Course footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-[clamp(40px,8vh,80px)] left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-light-steel font-mono no-print"
        >
          <DecryptedText
            text={`${projectMeta.university}  ·  ${projectMeta.course}`}
            speed={28}
          />
        </motion.div>

        {/* Down hint */}
        <motion.button
          type="button"
          onClick={() => {
            const next = document.querySelector('[data-slide-idx="1"]');
            if (next) next.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          whileHover={{ y: 4 }}
          className="absolute bottom-[clamp(12px,3vh,28px)] right-[clamp(20px,4vw,60px)] flex items-center gap-2 text-[10px] font-mono text-light-steel hover:text-terracotta transition-colors no-print group"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} strokeWidth={1.5} />
          </motion.span>
          scroll
        </motion.button>
      </motion.div>
    </div>
  );
}
