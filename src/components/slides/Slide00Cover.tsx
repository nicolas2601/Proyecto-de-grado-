import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { scrollToSlide } from '@/lib/scroll';
import SplitText from '@/components/reactbits/SplitText';
import DecryptedText from '@/components/reactbits/DecryptedText';
import Marquee from '@/components/reactbits/Marquee';
import MagneticButton from '@/components/reactbits/MagneticButton';
import CountUp from '@/components/reactbits/CountUp';
import Typewriter from '@/components/reactbits/Typewriter';
import { projectMeta, ham10000, bcn20000, co2wounds } from '@/data/eda';

const MARQUEE_TAGS = [
  'SSL',
  'SIMCLR',
  'DINO',
  'MAE',
  'HAM10000',
  'BCN20000',
  'CO2WOUNDS-V2',
  'SANTANDER',
  'COLOMBIA',
  'UNAB · 2026',
  'VISION TRANSFORMER',
  'DIAGNÓSTICO ASISTIDO',
  'PROYECTO DE GRADO I',
];

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_IMAGES = ham10000.size + bcn20000.size;

// Brutalist info-sheet spec table · every row is a verifiable fact
const SPEC_ROWS: Array<{ k: string; v: string; mono?: boolean }> = [
  { k: 'DOC-ID', v: 'SSL · OBJ-1 · SUSTENTACIÓN', mono: true },
  { k: 'REV', v: 'A · 2026.05.12', mono: true },
  { k: 'CAMPUS', v: 'UNAB · BUCARAMANGA · SANTANDER' },
  { k: 'CURSO', v: 'Proyecto de Grado I · 2026-I' },
  { k: 'FASE CRISP-DM', v: 'F3 · PREPARACIÓN · EN CURSO' },
  { k: 'VENTANA', v: '32 SEMANAS · 2 SEMESTRES · 2026-I → 2026-II' },
  { k: 'TRL OBJETIVO', v: 'TRL 4 · (TRL 5 STRETCH)' },
  { k: 'CORPUS', v: 'HAM10000 + BCN20000 + CO2WOUNDS-V2' },
];

export default function Slide00Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-8%']);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden bg-canvas-white text-ink-black"
    >
      {/* Architectural grid backplate */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />

      {/* Left + right vertical rules · gutter rhythm */}
      <div
        className="absolute top-0 bottom-0 left-[clamp(24px,5vw,80px)] w-px pointer-events-none"
        style={{ background: '#e6e6e6' }}
        aria-hidden
      />
      <div
        className="absolute top-0 bottom-0 right-[clamp(24px,5vw,80px)] w-px pointer-events-none"
        style={{ background: '#e6e6e6' }}
        aria-hidden
      />

      {/* §00.0 · TOP METADATA BAND */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="absolute top-[clamp(20px,3.5vh,40px)] left-[clamp(24px,5vw,80px)] z-20"
      >
        <div className="inline-flex items-stretch" style={{ border: '1px solid #292929' }}>
          <span
            className="px-3 py-1.5 font-condensed uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#292929',
              fontWeight: 400,
              borderRight: '1px solid #292929',
            }}
          >
            UNAB · 2026
          </span>
          <span
            className="px-3 py-1.5 font-condensed uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#292929',
              fontWeight: 500,
            }}
          >
            PROYECTO DE GRADO I
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        className="absolute top-[clamp(20px,3.5vh,40px)] right-[clamp(24px,5vw,80px)] z-20"
      >
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5" style={{ border: '1px solid #292929' }}>
          <span
            className="inline-block"
            style={{ width: 4, height: 4, background: '#292929' }}
            aria-hidden
          />
          <span
            className="font-condensed uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#292929',
              fontWeight: 500,
            }}
          >
            LIVE · SUSTENTACIÓN
          </span>
        </div>
      </motion.div>

      {/* Top horizontal rule under header */}
      <div
        className="absolute top-[clamp(64px,8vh,96px)] left-[clamp(24px,5vw,80px)] right-[clamp(24px,5vw,80px)] h-px pointer-events-none"
        style={{ background: '#292929' }}
        aria-hidden
      />

      {/* MAIN CONTENT · section §00.1 · §00.5 */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 w-full min-h-screen flex flex-col px-[clamp(40px,7vw,120px)] pt-[clamp(108px,15vh,160px)] pb-[clamp(48px,8vh,96px)]"
      >
        {/* §00.1 · SECTION MARKER + TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="flex items-baseline gap-4 mb-6"
        >
          <span
            className="font-condensed uppercase"
            style={{ fontSize: 11, letterSpacing: '0.2em', color: '#646464', fontWeight: 400 }}
          >
            §00 · MANIFIESTO TÉCNICO
          </span>
          <span className="flex-1 h-px" style={{ background: '#e6e6e6' }} aria-hidden />
          <span
            className="font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: '0.18em', color: '#b4b8b4' }}
          >
            PAGE 01 / 09
          </span>
        </motion.div>

        <h1
          className="font-nh text-ink-black"
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: 0.96,
            letterSpacing: '-0.025em',
            fontWeight: 200,
            maxWidth: '20ch',
          }}
        >
          <SplitText text="Aprendizaje" as="span" stagger={0.022} delay={0.28} />
          <br />
          <span style={{ fontWeight: 300, letterSpacing: '-0.035em' }}>
            <SplitText text="autosupervisado" as="span" stagger={0.022} delay={0.5} />
          </span>{' '}
          <SplitText
            text="para lesiones cutáneas"
            as="span"
            stagger={0.02}
            delay={0.8}
          />
          <br />
          <span style={{ fontWeight: 200 }}>
            <SplitText text="en " as="span" stagger={0.02} delay={1.1} />
            <span style={{ fontWeight: 400, letterSpacing: '-0.03em' }}>
              <SplitText text="Santander" as="span" stagger={0.022} delay={1.18} />
            </span>
            <SplitText text="." as="span" stagger={0.02} delay={1.32} />
          </span>
        </h1>

        {/* Headline subtitle · Roboto Thin */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
          className="font-ev mt-6"
          style={{
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            lineHeight: 1.35,
            letterSpacing: '-0.025em',
            fontWeight: 100,
            color: '#646464',
            maxWidth: '54ch',
          }}
        >
          Objetivo 1 · análisis exploratorio de tres datasets dermatológicos como
          fundamento para el preentrenamiento autosupervisado aplicado al
          contexto clínico santandereano.
        </motion.p>

        {/* §00.2 · TWO-COLUMN: SPEC TABLE  /  ABSTRACT */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* SPEC TABLE · 7/12 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span
                className="font-condensed uppercase"
                style={{ fontSize: 11, letterSpacing: '0.2em', color: '#292929', fontWeight: 500 }}
              >
                §00.2 · ESPECIFICACIONES
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: '0.18em', color: '#b4b8b4' }}
              >
                TABLE 01
              </span>
            </div>

            <table className="w-full" style={{ borderTop: '1px solid #292929', borderCollapse: 'collapse' }}>
              <tbody>
                {SPEC_ROWS.map((row, i) => (
                  <motion.tr
                    key={row.k}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 1.65 + i * 0.04, ease: EASE }}
                    style={{ borderBottom: '1px solid #e6e6e6' }}
                  >
                    <td
                      className="font-condensed uppercase align-top"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        color: '#646464',
                        fontWeight: 400,
                        padding: '10px 16px 10px 0',
                        width: '34%',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.k}
                    </td>
                    <td
                      className={row.mono ? 'font-mono tabular-nums' : 'font-nh'}
                      style={{
                        fontSize: row.mono ? 13 : 14,
                        lineHeight: 1.35,
                        letterSpacing: row.mono ? 0 : '-0.01em',
                        color: '#292929',
                        fontWeight: 500,
                        padding: '10px 0',
                      }}
                    >
                      {row.v}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* ABSTRACT block · 5/12 cols, flush against table (shared border) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.7, ease: EASE }}
            className="lg:col-span-5 lg:pl-10 lg:ml-10 lg:border-l"
            style={{ borderColor: '#292929' }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <span
                className="font-condensed uppercase"
                style={{ fontSize: 11, letterSpacing: '0.2em', color: '#292929', fontWeight: 500 }}
              >
                §00.3 · ABSTRACT
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: '0.18em', color: '#b4b8b4' }}
              >
                EN
              </span>
            </div>

            <div style={{ borderTop: '1px solid #292929', paddingTop: 16 }}>
              <p
                className="font-mono"
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#292929',
                  fontWeight: 400,
                }}
              >
                <span style={{ color: '#b4b8b4', userSelect: 'none' }}>&gt; </span>
                <Typewriter
                  text='"...the lack of large, publicly available datasets of dermatoscopic images has been a major obstacle..."'
                  speed={26}
                  startDelay={1800}
                  loop
                  loopPause={5500}
                />
              </p>
              <p
                className="mt-4 font-condensed uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#646464',
                  fontWeight: 400,
                }}
              >
                · TSCHANDL · ROSENDAHL · KITTLER · 2018 · SCIENTIFIC DATA
              </p>
            </div>
          </motion.div>
        </div>

        {/* §00.4 · METRICS BAND, flush with 1px ink top + bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95, ease: EASE }}
          className="mt-14"
        >
          <div className="flex items-baseline justify-between mb-3">
            <span
              className="font-condensed uppercase"
              style={{ fontSize: 11, letterSpacing: '0.2em', color: '#292929', fontWeight: 500 }}
            >
              §00.4 · MÉTRICAS DEL CORPUS
            </span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: '0.18em', color: '#b4b8b4' }}
            >
              LIVE
            </span>
          </div>

          <div
            className="grid grid-cols-3 gap-0"
            style={{ borderTop: '1px solid #292929', borderBottom: '1px solid #292929' }}
          >
            <Metric
              number={<CountUp value={7} duration={1.4} />}
              label="CLASES DERMATOLÓGICAS"
              right
            />
            <Metric
              number={<CountUp value={TOTAL_IMAGES} duration={2.2} separator="." />}
              label="IMÁGENES CURADAS"
              right
            />
            <Metric
              number={<CountUp value={co2wounds.patients} duration={1.6} />}
              label="PACIENTES SANTANDER"
            />
          </div>
        </motion.div>

        {/* §00.5 · AUTHORSHIP + CTA  (3-col flush data sheet row) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 2.1, ease: EASE }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* AUTHORS · 4 cols */}
          <div
            className="lg:col-span-4 p-5"
            style={{ border: '1px solid #292929', borderRight: 'none' }}
          >
            <span
              className="block font-condensed uppercase mb-3"
              style={{ fontSize: 11, letterSpacing: '0.2em', color: '#646464', fontWeight: 400 }}
            >
              AUTORES · 02
            </span>
            <p
              className="font-nh"
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.35,
                color: '#292929',
                letterSpacing: '-0.01em',
              }}
            >
              {projectMeta.authors[0]}
            </p>
            <p
              className="mt-1 font-nh"
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.35,
                color: '#292929',
                letterSpacing: '-0.01em',
              }}
            >
              {projectMeta.authors[1]}
            </p>
          </div>

          {/* DIRECTOR + ADVISOR · 5 cols */}
          <div
            className="lg:col-span-5 p-5"
            style={{ border: '1px solid #292929', borderRight: 'none' }}
          >
            <span
              className="block font-condensed uppercase mb-3"
              style={{ fontSize: 11, letterSpacing: '0.2em', color: '#646464', fontWeight: 400 }}
            >
              DIRECCIÓN · ASESORÍA
            </span>
            <p
              className="font-nh"
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.35,
                color: '#292929',
                letterSpacing: '-0.01em',
              }}
            >
              {projectMeta.director}
            </p>
            <p
              className="mt-1 font-nh"
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 1.35,
                color: '#292929',
                letterSpacing: '-0.01em',
              }}
            >
              {projectMeta.advisor}
            </p>
            <p
              className="mt-2 font-mono"
              style={{
                fontSize: 11,
                lineHeight: 1.35,
                color: '#646464',
              }}
            >
              {projectMeta.advisorAffiliation}
            </p>
          </div>

          {/* CTA cell · 3 cols, full ink-fill on hover */}
          <div
            className="lg:col-span-3 flex"
            style={{ border: '1px solid #292929' }}
          >
            <MagneticButton
              as="button"
              strength={0.3}
              onClick={() => scrollToSlide(1)}
              className="group w-full h-full inline-flex flex-col justify-between p-5 transition-colors"
              style={{
                background: 'transparent',
                color: '#292929',
                fontFamily: "'Oswald', Impact, sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#646464', letterSpacing: '0.2em' }}>
                INICIAR
              </span>
              <span className="flex items-baseline justify-between">
                <span style={{ fontSize: 14 }}>SUSTENTACIÓN</span>
                <span style={{ fontSize: 18, marginLeft: 8 }}>↓</span>
              </span>
            </MagneticButton>
          </div>
        </motion.div>

        {/* §00.6 · UNIVERSITY footer, decrypted */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.45, duration: 1 }}
          className="mt-8"
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.32em',
              color: '#646464',
            }}
          >
            <DecryptedText
              text={`${projectMeta.university}  ·  ${projectMeta.course}`}
              speed={28}
            />
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom horizontal rule */}
      <div
        className="absolute bottom-[clamp(56px,9vh,110px)] left-[clamp(24px,5vw,80px)] right-[clamp(24px,5vw,80px)] h-px pointer-events-none"
        style={{ background: '#292929' }}
        aria-hidden
      />

      {/* Footer marquee · thin grey */}
      <div className="absolute bottom-[clamp(20px,4vh,48px)] left-0 right-0 z-[5] select-none pointer-events-none">
        <Marquee duration={70} fade className="text-ink-black">
          {MARQUEE_TAGS.map((tag, i) => (
            <span
              key={i}
              className="font-condensed uppercase"
              style={{
                marginInline: '28px',
                fontSize: 11,
                letterSpacing: '0.24em',
                color: '#646464',
                fontWeight: 400,
              }}
            >
              {tag}
              <span style={{ marginLeft: '28px', color: '#b4b8b4' }}>·</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* SCROLL HINT */}
      <motion.button
        type="button"
        onClick={() => scrollToSlide(1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.9 }}
        className="absolute bottom-[clamp(20px,4vh,48px)] right-[clamp(24px,5vw,80px)] z-20 inline-flex items-center gap-2 px-3 py-1.5 no-print transition-colors hover:bg-ink-black hover:text-canvas-white"
        style={{
          border: '1px solid #292929',
          background: 'transparent',
          fontFamily: "'Oswald', Impact, sans-serif",
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#292929',
          fontWeight: 400,
        }}
      >
        SCROLL <span>↓</span>
      </motion.button>
    </div>
  );
}

function Metric({
  number,
  label,
  right,
}: {
  number: React.ReactNode;
  label: string;
  right?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-2 px-5 py-5"
      style={right ? { borderRight: '1px solid #292929' } : undefined}
    >
      <span
        className="font-display tabular-nums"
        style={{
          fontSize: 'clamp(48px, 5.5vw, 72px)',
          lineHeight: 0.95,
          color: '#292929',
          fontWeight: 400,
          letterSpacing: '0.005em',
        }}
      >
        {number}
      </span>
      <span
        className="font-condensed uppercase"
        style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#646464',
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}
