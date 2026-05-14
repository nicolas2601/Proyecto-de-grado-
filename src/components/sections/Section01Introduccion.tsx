// ─────────────────────────────────────────────────────────────────────────
// §01 · Introducción · v5 · solo problema + necesidad
//
// Contenido literal del anteproyecto §1 (Fuente A).
// SIN solución (SSL · prototipo · Santander como propósito → eso es §05+).
//
// Estructura:
//  · Headline · enuncia la necesidad o la doble barrera
//  · Bloque visual de la "doble barrera" · 2 ramas que dificultan el
//    diagnóstico oportuno · diagrama SVG
//  · Nodo central con la cifra 62-80 % [chaturvedi-2020] (única cifra
//    permitida porque está en el párrafo de introducción del anteproyecto)
//  · Cierre · transición a §02 donde se desarrolla el problema
// ─────────────────────────────────────────────────────────────────────────

import { Fragment, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Sup from '@/components/ui/Sup';

const ENTER = [0.22, 1, 0.36, 1] as const;
const MOVE = [0.25, 1, 0.5, 1] as const;

// ── WordReveal · clip-path mask vertical ────────────────────────────────
function WordReveal({
  text,
  delay = 0,
  stagger = 0.045,
  highlight,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  highlight?: string;
}) {
  const reduced = useReducedMotion();
  const tokens = text.split(' ');
  if (reduced) return <>{text}</>;
  return (
    <span style={{ display: 'inline' }} aria-label={text}>
      {tokens.map((w, i) => {
        const isHL = highlight && w.toLowerCase().includes(highlight.toLowerCase());
        return (
          <Fragment key={i}>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                paddingBlock: '0.18em',
                marginBlock: '-0.18em',
                verticalAlign: 'top',
              }}
            >
              <motion.span
                style={{
                  display: 'inline-block',
                  willChange: 'transform',
                  color: isHL ? 'var(--ada-moss)' : 'inherit',
                  fontWeight: isHL ? 500 : 400,
                  position: 'relative',
                }}
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.95, ease: ENTER, delay: delay + i * stagger }}
              >
                {w}
                {isHL && (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{
                      duration: 0.7,
                      ease: ENTER,
                      delay: delay + tokens.length * stagger + 0.2,
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: '0.04em',
                      height: 2,
                      background: 'var(--ada-moss)',
                      transformOrigin: 'left',
                      willChange: 'transform',
                    }}
                  />
                )}
              </motion.span>
            </span>
            {i < tokens.length - 1 ? ' ' : ''}
          </Fragment>
        );
      })}
    </span>
  );
}

// ── CountUp para la cifra 62-80 % ───────────────────────────────────────
function CountUp({
  to,
  duration = 1.6,
  format = (v: number) => Math.round(v).toLocaleString('es-CO'),
}: {
  to: number;
  duration?: number;
  format?: (v: number) => string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(val)}
    </span>
  );
}

// ── Ícono SVG · médico con interrogación (dependencia del experto) ─────
function IconExpert({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <motion.circle
        cx="22"
        cy="16"
        r="6"
        stroke={color}
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: ENTER, delay: 0.2 }}
      />
      <motion.path
        d="M 10 36 C 10 28, 16 24, 22 24 C 28 24, 34 28, 34 36"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: ENTER, delay: 0.6 }}
      />
      <motion.text
        x="22"
        y="20"
        textAnchor="middle"
        fill={color}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 8,
          fontWeight: 600,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.4, ease: ENTER, delay: 1.1 }}
      >
        ?
      </motion.text>
    </svg>
  );
}

// ── Ícono SVG · herramienta tachada (herramientas no adaptadas) ───────
function IconTools({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <motion.rect
        x="10"
        y="14"
        width="24"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.0, ease: ENTER, delay: 0.2 }}
      />
      <motion.line
        x1="14"
        y1="20"
        x2="22"
        y2="20"
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.4, ease: ENTER, delay: 0.9 }}
      />
      <motion.line
        x1="14"
        y1="24"
        x2="18"
        y2="24"
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.4, ease: ENTER, delay: 1.0 }}
      />
      <motion.line
        x1="6"
        y1="38"
        x2="38"
        y2="6"
        stroke="#F26B3A"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: ENTER, delay: 1.2 }}
      />
    </svg>
  );
}

export default function Section01Introduccion() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      id="section-introduccion"
      aria-labelledby="intro-h"
      style={{
        background: 'var(--ada-vapor)',
        color: 'var(--ada-graphite)',
        paddingBlock: 'clamp(96px, 12vw, 168px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradiente decorativo · profundidad sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70vh',
          background:
            'radial-gradient(ellipse at 25% 0%, rgba(171,203,249,0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 8%, rgba(242,107,58,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(216,216,216,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,216,216,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.18) 0%, transparent 65%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'clamp(20px, 4vw, 56px)',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          style={{ y: eyebrowY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          className="flex items-center gap-3"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 28 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: ENTER, delay: 0.4 }}
            aria-hidden
            style={{ height: 1, background: 'var(--ada-graphite)', opacity: 0.4 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ada-graphite)',
              fontWeight: 500,
            }}
          >
            §01 · Introducción
          </span>
        </motion.div>

        {/* Headline · enuncia la necesidad, no la solución */}
        <h2
          id="intro-h"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(36px, 5.6vw, 68px)',
            lineHeight: 1.06,
            letterSpacing: '-0.028em',
            fontWeight: 400,
            color: 'var(--ada-graphite)',
            maxWidth: '22ch',
            marginTop: 32,
            marginBottom: 0,
          }}
        >
          <WordReveal
            text="El desafío no es solo detectar lesiones, sino hacerlo a tiempo."
            highlight="especialista"
            stagger={0.05}
            delay={0.15}
          />
        </h2>

        {/* Subline corta · contextualiza la magnitud */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: ENTER, delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(17px, 1.5vw, 20px)',
            lineHeight: 1.5,
            color: 'var(--ada-graphite)',
            opacity: 0.75,
            maxWidth: '52ch',
            marginTop: 28,
            marginBottom: 0,
          }}
        >
          Las lesiones de piel figuran entre las neoplasias de mayor incidencia,
          y su detección temprana condiciona la supervivencia del paciente.
        </motion.p>

        {/* Bloque visual · DOBLE BARRERA · diagrama SVG */}
        <div style={{ marginTop: 80, position: 'relative' }}>
          {/* Etiqueta de bloque */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: ENTER }}
            className="font-mono uppercase mb-6"
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ada-moss)',
              fontWeight: 500,
            }}
          >
            La doble barrera que limita el diagnóstico oportuno
          </motion.div>

          {/* SVG connector central · 2 ramas que salen de un punto */}
          <svg
            aria-hidden
            className="hidden md:block pointer-events-none"
            style={{
              position: 'absolute',
              top: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 280,
              height: 80,
              zIndex: 0,
            }}
            viewBox="0 0 280 80"
          >
            <motion.path
              d="M 140 10 L 140 30 L 30 30"
              stroke="var(--ada-mist)"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: ENTER, delay: 0.4 }}
            />
            <motion.path
              d="M 140 10 L 140 30 L 250 30"
              stroke="var(--ada-mist)"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: ENTER, delay: 0.55 }}
            />
          </svg>

          {/* 2 nodos · cada uno una barrera */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
            style={{ zIndex: 1 }}
          >
            {/* Barrera 1 · Dependencia del experto · con cifra 62-80 % */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.85, ease: ENTER, delay: 0.15 }}
              style={{
                background: 'var(--ada-vapor)',
                border: '1px solid var(--ada-mist)',
                borderRadius: 8,
                padding: 'clamp(24px, 2.6vw, 36px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 3,
                  height: 40,
                  background: 'var(--ada-moss)',
                }}
              />
              <div className="flex items-start justify-between mb-5">
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    color: 'var(--ada-graphite)',
                    opacity: 0.55,
                    fontWeight: 500,
                  }}
                >
                  Barrera 01
                </span>
                <span style={{ color: 'var(--ada-moss)' }}>
                  <IconExpert />
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                  color: 'var(--ada-graphite)',
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                Dependencia de la experiencia del especialista
              </h3>

              {/* Cifra cinemática · única permitida en intro porque está en el párrafo del anteproyecto */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  flexWrap: 'wrap',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(40px, 5vw, 60px)',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: 'var(--ada-graphite)',
                  }}
                >
                  <CountUp to={62} />
                  <span style={{ opacity: 0.4, margin: '0 8px' }}>–</span>
                  <CountUp to={80} />
                  <span> %</span>
                </span>
                <Sup n={1} refs={['chaturvedi-2020']} />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: 'var(--ada-graphite)',
                  opacity: 0.7,
                  margin: 0,
                  maxWidth: '42ch',
                }}
              >
                Rango de precisión del diagnóstico clínico convencional,
                determinado por la experiencia del especialista.
              </p>
            </motion.div>

            {/* Barrera 2 · Herramientas no adaptadas al contexto local */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.85, ease: ENTER, delay: 0.3 }}
              style={{
                background: 'var(--ada-vapor)',
                border: '1px solid var(--ada-mist)',
                borderRadius: 8,
                padding: 'clamp(24px, 2.6vw, 36px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 3,
                  height: 40,
                  background: '#F26B3A',
                }}
              />
              <div className="flex items-start justify-between mb-5">
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    color: 'var(--ada-graphite)',
                    opacity: 0.55,
                    fontWeight: 500,
                  }}
                >
                  Barrera 02
                </span>
                <span style={{ color: 'var(--ada-graphite)' }}>
                  <IconTools />
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                  color: 'var(--ada-graphite)',
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                Escasez de herramientas tecnológicas adaptadas
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  flexWrap: 'wrap',
                  marginBottom: 12,
                  minHeight: 60,
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 14,
                    letterSpacing: '0.18em',
                    color: 'var(--ada-graphite)',
                    opacity: 0.75,
                    fontWeight: 500,
                  }}
                >
                  Contexto local
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: 'var(--ada-graphite)',
                  opacity: 0.7,
                  margin: 0,
                  maxWidth: '42ch',
                }}
              >
                Las alternativas confirmatorias resultan invasivas, costosas
                y lentas para un sistema de salud con recursos limitados.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Consecuencia regional · alineada al ancho del grid de barreras */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: ENTER, delay: 0.5 }}
          style={{
            marginTop: 24,
            padding: 'clamp(20px, 2.4vw, 32px) clamp(24px, 2.6vw, 36px)',
            borderLeft: '2px solid var(--ada-moss)',
            background: 'rgba(0,84,61,0.04)',
            border: '1px solid var(--ada-mist)',
            borderLeftWidth: 2,
            borderLeftColor: 'var(--ada-moss)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'baseline',
            gap: 'clamp(16px, 2vw, 28px)',
            flexWrap: 'wrap',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ada-moss)',
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Consecuencia regional
          </span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(16px, 1.45vw, 19px)',
              lineHeight: 1.5,
              color: 'var(--ada-graphite)',
              margin: 0,
              letterSpacing: '-0.005em',
              flex: 1,
              minWidth: '40ch',
            }}
          >
            En Santander la situación se agudiza: la disponibilidad de
            especialistas se reduce y las herramientas de apoyo diagnóstico
            no se ajustan a las condiciones del sistema de salud local.
          </p>
        </motion.div>

        {/* Cierre · transición */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: MOVE, delay: 0.5 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 72,
            paddingTop: 20,
            borderTop: '1px solid var(--ada-mist)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ada-graphite)',
          }}
        >
          <span style={{ opacity: 0.55 }}>magnitud · doble barrera · consecuencia regional</span>
          <span style={{ color: 'var(--ada-moss)', fontWeight: 600 }}>
            → §02 planteamiento del problema
          </span>
        </motion.div>
      </div>
    </section>
  );
}
