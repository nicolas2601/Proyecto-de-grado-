// ─────────────────────────────────────────────────────────────────────────
// §02 · Planteamiento del Problema · v3
//
// Estilo DIFERENTE al §01:
//  · §01 usa headline cinemático + grid 2-col + cita editorial
//  · §02 usa estructura "zoom out" + clasificación visual + flow interactivo
//
// Contenido literal del anteproyecto §2 (lenguaje: "lesiones cutáneas",
// no "cáncer de piel" en headlines).
//
// De pequeño a grande:
//  1. Anatomía · qué es una lesión cutánea · 5 tipos (Mel, BCC, SCC, Nevos, Queratosis)
//  2. Escala · paciente → región → país
//  3. Las tres barreras del diagnóstico actual
//  4. Árbol del problema interactivo (reactflow)
//
// Espaciado reducido · más denso que §01 (paddingBlock 64-112).
// ─────────────────────────────────────────────────────────────────────────

import { Fragment, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import Sup from '@/components/ui/Sup';
import ProblemTreeD3 from '@/components/ui/ProblemTreeD3';

const ENTER = [0.22, 1, 0.36, 1] as const;

// ── CountUp ─────────────────────────────────────────────────────────
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
  const inView = useInView(ref, { once: true, margin: '-10%' });
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

// ── ProblemTreeSection · vista editorial única ─────────────────────
function ProblemTreeSection() {
  return (
    <div style={{ marginTop: 64 }}>
      <div className="mb-5">
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'rgba(10,11,12,0.72)',
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          Vista de sistema
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--ada-graphite)',
            margin: 0,
            maxWidth: '32ch',
          }}
        >
          Árbol del problema · causas raíz, directas y consecuencias
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.5, ease: ENTER }}
      >
        <ProblemTreeD3 />
      </motion.div>
    </div>
  );
}

// Lesiones · 5 tipos · benigna vs maligna
const LESIONS = [
  { code: 'NEV', label: 'Nevo melanocítico', type: 'benigna', dot: '#abcbf9' },
  { code: 'SK',  label: 'Queratosis seborreica', type: 'benigna', dot: '#abcbf9' },
  { code: 'MEL', label: 'Melanoma', type: 'maligna', dot: '#00543d', tag: 'Mel' },
  { code: 'BCC', label: 'Carcinoma basocelular', type: 'maligna', dot: '#00543d', tag: 'BCC' },
  { code: 'SCC', label: 'Carcinoma escamocelular', type: 'maligna', dot: '#00543d', tag: 'SCC' },
] as const;

export default function Section02Problema() {
  return (
    <section
      id="section-problema"
      aria-labelledby="problema-h"
      style={{
        background: 'var(--ada-cloud)',
        color: 'var(--ada-graphite)',
        paddingBlock: 'clamp(64px, 8vw, 112px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradiente decorativo sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 80% 0%, rgba(212,145,205,0.08) 0%, transparent 50%), radial-gradient(ellipse at 10% 100%, rgba(0,84,61,0.06) 0%, transparent 60%)',
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
        {/* ── Hero compacto · estilo invertido (dark) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="md:col-span-7"
          >
            <div
              className="flex items-center gap-3 mb-5"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(10,11,12,0.62)',
                fontWeight: 500,
              }}
            >
              <span aria-hidden style={{ width: 28, height: 1, background: 'rgba(10,11,12,0.3)' }} />
              <span>§02 · Planteamiento</span>
            </div>
            <h2
              id="problema-h"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(32px, 4.6vw, 56px)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                color: 'var(--ada-graphite)',
                margin: 0,
                maxWidth: '24ch',
              }}
            >
              Lesiones cutáneas · una patología frecuente con diagnóstico desigual.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.15 }}
            className="md:col-span-5"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.5,
              color: 'rgba(10,11,12,0.72)',
              margin: 0,
              maxWidth: '44ch',
            }}
          >
            La Organización Mundial de la Salud reconoce el cáncer de piel
            entre las neoplasias más frecuentes
            <Sup n={1} refs={['cac-2025']} tone="graphite" />.
            La detección depende del especialista, recurso desigual entre
            territorios.
          </motion.p>
        </div>

        {/* ── BLOQUE 1 · Anatomía del problema · clasificación de lesiones ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, ease: ENTER }}
          style={{
            marginTop: 56,
            background: '#ffffff',
            border: '1px solid var(--ada-mist)',
            borderRadius: 8,
            padding: 'clamp(20px, 2.4vw, 32px)',
          }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                fontWeight: 500,
                color: 'var(--ada-graphite)',
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Clasificación clínica
            </h3>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(10,11,12,0.72)',
              }}
            >
              05 tipos priorizados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {LESIONS.map((l, i) => (
              <motion.div
                key={l.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.55, ease: ENTER, delay: 0.1 + i * 0.06 }}
                whileHover={{ y: -2, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                style={{
                  background: '#ffffff',
                  border: `1px solid ${l.type === 'maligna' ? 'rgba(0,84,61,0.5)' : 'rgba(171,203,249,0.35)'}`,
                  borderRadius: 6,
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  minHeight: 110,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: l.dot,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.18em',
                      color: l.type === 'maligna' ? '#7CD1CE' : 'rgba(171,203,249,0.85)',
                      fontWeight: 600,
                    }}
                  >
                    {l.type}
                  </span>
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 14,
                    color: 'var(--ada-graphite)',
                    letterSpacing: '0.04em',
                    fontWeight: 500,
                  }}
                >
                  {l.code}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    lineHeight: 1.35,
                    color: 'rgba(10,11,12,0.72)',
                  }}
                >
                  {l.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── BLOQUE 2 · Escala · paciente → región → país ── */}
        <div style={{ marginTop: 48 }}>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                fontWeight: 500,
                color: 'var(--ada-graphite)',
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Escalas de incidencia
            </h3>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(10,11,12,0.72)',
              }}
            >
              Hospital → País
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--ada-mist)', borderRadius: 8, overflow: 'hidden' }}>
            {[
              {
                k: 'Hospital · HUS',
                period: '2016–2023',
                big: <><CountUp to={3060} /></>,
                unit: 'casos',
                desc: 'Casos registrados en el HUS Bucaramanga.',
                refs: ['el-frente-2024', 'uribe-2018'],
                accent: '#d491cd',
              },
              {
                k: 'País · Colombia',
                period: '2024',
                big: <><CountUp to={11064} /></>,
                unit: 'casos',
                desc: 'Cuenta de Alto Costo, tendencia creciente.',
                refs: ['cac-2025'],
                accent: '#00543d',
              },
              {
                k: 'Tipo · Basocelular',
                period: 'Mortalidad melanoma',
                big: (
                  <>
                    <CountUp to={64.82} format={(v) => v.toFixed(2).replace('.', ',')} /><span style={{ fontSize: '0.6em', opacity: 0.85 }}> %</span>
                  </>
                ),
                unit: 'incidencia regional',
                desc: 'Basocelular domina; melanoma origina 80 % de muertes.',
                refs: ['uribe-2018', 'cac-2025'],
                accent: '#7CD1CE',
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.7, ease: ENTER, delay: i * 0.1 }}
                style={{
                  background: '#ffffff',
                  padding: 'clamp(18px, 2.2vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  minHeight: 220,
                  position: 'relative',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 3,
                    height: 32,
                    background: s.accent,
                  }}
                />
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color: 'rgba(10,11,12,0.72)',
                      fontWeight: 500,
                    }}
                  >
                    {s.k}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: s.accent,
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                    }}
                  >
                    {s.period}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(40px, 4.6vw, 56px)',
                    fontWeight: 400,
                    lineHeight: 0.95,
                    letterSpacing: '-0.035em',
                    color: 'var(--ada-graphite)',
                  }}
                >
                  {s.big}
                </div>
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: '0.18em',
                    color: 'rgba(10,11,12,0.68)',
                  }}
                >
                  {s.unit}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.4vw, 17px)',
                    lineHeight: 1.45,
                    color: '#0a0b0c',
                    margin: 0,
                    flex: 1,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {s.desc}
                  {s.refs.map((r, j) => (
                    <Sup key={r} n={j + 1} refs={[r]} tone="graphite" />
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BLOQUE 3 · 3 barreras del diagnóstico actual · diseño compacto ── */}
        <div style={{ marginTop: 48 }}>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                fontWeight: 500,
                color: 'var(--ada-graphite)',
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Tres barreras estructurales
            </h3>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(10,11,12,0.72)',
              }}
            >
              Experto · economía · tecnología
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                num: '01',
                title: 'Dependencia del experto',
                metric: '62–80 %',
                metricLabel: 'precisión',
                desc: 'Precisión clínica varía con la experiencia del especialista.',
                refs: ['chaturvedi-2020'],
                accent: '#abcbf9',
                metricColor: '#0d4ea8',
              },
              {
                num: '02',
                title: 'Barreras económicas y de acceso',
                metric: 'Invasiva',
                metricLabel: 'biopsia · lenta',
                desc: 'Biopsias costosas y lentas en entornos con recursos limitados.',
                refs: [],
                accent: '#d491cd',
                metricColor: '#8a3f85',
              },
              {
                num: '03',
                title: 'Limitación tecnológica',
                metric: 'Etiquetas',
                metricLabel: 'recurso escaso',
                desc: 'IA supervisada exige miles de imágenes anotadas, recurso costoso aquí.',
                refs: ['krishnan-2022'],
                accent: '#7CD1CE',
                metricColor: '#00543d',
              },
            ].map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.6, ease: ENTER, delay: i * 0.08 }}
                whileHover={{
                  x: 4,
                  transition: { type: 'spring', stiffness: 280, damping: 22 },
                }}
                className="grid items-center"
                style={{
                  gridTemplateColumns: 'minmax(0, 56px) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 2fr)',
                  gap: 'clamp(16px, 2.4vw, 32px)',
                  background: '#ffffff',
                  border: '1px solid var(--ada-mist)',
                  borderLeft: `3px solid ${b.accent}`,
                  borderRadius: 6,
                  padding: 'clamp(16px, 2vw, 24px)',
                  cursor: 'default',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 13,
                    letterSpacing: '0.06em',
                    color: 'rgba(10,11,12,0.45)',
                    fontWeight: 500,
                  }}
                >
                  {b.num}
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 500,
                    lineHeight: 1.22,
                    color: 'var(--ada-graphite)',
                    margin: 0,
                    letterSpacing: '-0.012em',
                  }}
                >
                  {b.title}
                </h4>
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(24px, 2.6vw, 32px)',
                      fontWeight: 500,
                      letterSpacing: '-0.028em',
                      color: b.metricColor,
                      lineHeight: 1,
                    }}
                  >
                    {b.metric}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: '0.18em',
                      color: 'rgba(10,11,12,0.68)',
                    }}
                  >
                    {b.metricLabel}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.4vw, 17px)',
                    lineHeight: 1.4,
                    color: '#0a0b0c',
                    margin: 0,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {b.desc}
                  {b.refs.map((r, j) => (
                    <Sup key={r} n={j + 1} refs={[r]} tone="graphite" />
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BLOQUE 4 · Árbol del problema · 2 vistas comparables ── */}
        <ProblemTreeSection />

        {/* Cierre · transición compacta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 56,
            paddingTop: 18,
            borderTop: '1px solid var(--ada-mist)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(10,11,12,0.72)',
          }}
        >
          <span>clasificación · escala · barreras · cadena causal</span>
          <span style={{ color: '#7CD1CE', fontWeight: 600 }}>
            → §03 pregunta de investigación
          </span>
        </motion.div>
      </div>
    </section>
  );
}
