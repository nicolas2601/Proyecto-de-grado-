// ─────────────────────────────────────────────────────────────────────────
// §09 · Avances y resultados esperados · slate-warm cream con datos EDA.
//
// 1. Hero · estado actual TRL 4
// 2. Estado de Fase 1 · checklist + porcentaje
// 3. Datos del EDA · HAM10000 / BCN20000 / CO2Wounds-V2 con gráficas SVG
// 4. Resultados esperados · 4 dimensiones (técnico / comparativo / funcional / TRL)
// 5. TRL ladder visual
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

// ─── EDA · HAM10000 ─────────────────────────────────────────────────
const HAM10000_CLASES = [
  { code: 'nv', label: 'Nevus melanocítico', count: 6705, pct: 66.95, tipo: 'Benigna', color: '#abcbf9' },
  { code: 'mel', label: 'Melanoma', count: 1113, pct: 11.11, tipo: 'Maligna', color: '#bf3a3a' },
  { code: 'bkl', label: 'Queratosis benigna', count: 1099, pct: 10.97, tipo: 'Benigna', color: '#abcbf9' },
  { code: 'bcc', label: 'Carcinoma basocelular', count: 514, pct: 5.13, tipo: 'Maligna', color: '#bf3a3a' },
  { code: 'akiec', label: 'Queratosis actínica', count: 327, pct: 3.27, tipo: 'Pre', color: '#fce88b' },
  { code: 'vasc', label: 'Lesiones vasculares', count: 142, pct: 1.42, tipo: 'Benigna', color: '#abcbf9' },
  { code: 'df', label: 'Dermatofibroma', count: 115, pct: 1.15, tipo: 'Benigna', color: '#abcbf9' },
] as const;

// ─── Datasets · resumen ────────────────────────────────────────────
const DATASETS = [
  {
    id: 'ham',
    nombre: 'HAM10000',
    fuente: 'Tschandl et al. 2018',
    total: '10.015',
    res: '600 × 450 px',
    clases: '7',
    shannon: '1,63',
    gini: '0,64',
    rol: 'Pre-entrenamiento SSL · benchmark',
    accent: '#0d4ea8',
  },
  {
    id: 'bcn',
    nombre: 'BCN20000',
    fuente: 'ISIC · Combalia 2019',
    total: '18.946',
    res: '1024 × 1024 px',
    clases: '10',
    shannon: '2,41',
    gini: '0,42',
    rol: 'Cobertura ampliada · evaluación',
    accent: '#8a3f85',
  },
  {
    id: 'co2',
    nombre: 'CO2Wounds-V2',
    fuente: 'Sánchez et al. 2024 · UIS',
    total: '764',
    res: 'Variable (smartphone)',
    clases: 'Segmentación',
    shannon: '—',
    gini: '—',
    rol: 'Dominio local · transferencia regional',
    accent: '#00543d',
  },
] as const;

const FASE_1_ACTIVIDADES = [
  { label: 'Caracterización del problema clínico regional', done: true },
  { label: 'Revisión exhaustiva de la literatura', done: true },
  { label: 'Consolidación del estado del arte', done: true },
  { label: 'Selección de datasets (HAM10000, BCN20000, CO2Wounds-V2)', done: true },
  { label: 'Análisis y caracterización preliminar del EDA', done: true },
  { label: 'Pipeline de preprocesamiento (Actividad 5)', done: false },
] as const;

const RESULTADOS = [
  {
    n: '01',
    rol: 'Técnico',
    accent: '#0d4ea8',
    titulo: 'Algoritmo SSL entrenado',
    body: 'Modelo SSL con desempeño comparable o superior a líneas base supervisadas en escenarios de etiquetado limitado.',
  },
  {
    n: '02',
    rol: 'Comparativo',
    accent: '#8a3f85',
    titulo: 'Informe contra supervisado',
    body: 'Comparación bajo mismo backbone con métricas AUC-ROC, F1 y matrices de confusión por clase.',
  },
  {
    n: '03',
    rol: 'Funcional',
    accent: '#a68a00',
    titulo: 'Prototipo de apoyo',
    body: 'Sistema que recibe la imagen, genera predicción y muestra explícitamente las métricas de desempeño.',
  },
  {
    n: '04',
    rol: 'Madurez',
    accent: '#00543d',
    titulo: 'TRL 4 validado en laboratorio',
    body: 'Validación en entorno controlado. TRL 5 como extensión natural si hay articulación clínica posterior.',
  },
] as const;

const TRL_LADDER = [
  { n: 1, label: 'Principios observados', state: 'past' },
  { n: 2, label: 'Concepto formulado', state: 'past' },
  { n: 3, label: 'Prueba experimental', state: 'past' },
  { n: 4, label: 'Validación en laboratorio', state: 'target' },
  { n: 5, label: 'Validación en entorno relevante', state: 'future' },
  { n: 6, label: 'Demostración entorno relevante', state: 'future' },
  { n: 7, label: 'Demostración entorno operacional', state: 'future' },
  { n: 8, label: 'Sistema completo cualificado', state: 'future' },
  { n: 9, label: 'Sistema probado en operación', state: 'future' },
] as const;

export default function Section09Avances() {
  const [activeDataset, setActiveDataset] = useState(0);

  // Fase 1 progreso
  const fase1Done = FASE_1_ACTIVIDADES.filter((a) => a.done).length;
  const fase1Total = FASE_1_ACTIVIDADES.length;
  const fase1Pct = Math.round((fase1Done / fase1Total) * 100);

  return (
    <section
      id="section-avances"
      aria-labelledby="av-h"
      style={{
        background: '#f3efe6',
        color: '#0a0b0c',
        paddingBlock: 'clamp(72px, 9vw, 128px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 5% 0%, rgba(0,84,61,0.07) 0%, transparent 50%), radial-gradient(ellipse at 95% 100%, rgba(166,138,0,0.06) 0%, transparent 55%)',
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
        {/* Masthead */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 14,
            marginBottom: 56,
            borderBottom: '2px solid #0a0b0c',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: 13, letterSpacing: '0.32em', color: '#0a0b0c', fontWeight: 700 }}
          >
            §09 · avances · resultados esperados
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.62)', fontWeight: 600 }}
          >
            TRL 4 · validado en laboratorio
          </span>
        </div>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{
            marginBottom: 'clamp(64px, 8vw, 112px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 0.5fr)',
            gap: 'clamp(20px, 3vw, 48px)',
            alignItems: 'end',
          }}
        >
          <div>
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 12.5,
                letterSpacing: '0.32em',
                color: '#00543d',
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              Hoja de ruta · mayo 2026
            </div>
            <h2
              id="av-h"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(40px, 5.6vw, 76px)',
                lineHeight: 1.0,
                letterSpacing: '-0.028em',
                fontWeight: 400,
                color: '#0a0b0c',
                margin: 0,
                maxWidth: '20ch',
              }}
            >
              Avances medibles. <span style={{ color: '#00543d', fontWeight: 500 }}>Resultados proyectados.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                lineHeight: 1.5,
                color: 'rgba(10,11,12,0.72)',
                margin: '20px 0 0 0',
                maxWidth: '50ch',
                letterSpacing: '-0.005em',
              }}
            >
              Estado actual del proyecto, hallazgos del análisis exploratorio y horizonte tecnológico esperado en TRL 4.
            </p>
          </div>

          {/* Logo UNAB lateral */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <img
              src="/media/logo-unab.png"
              alt="Universidad Autónoma de Bucaramanga"
              style={{
                maxWidth: 'clamp(96px, 12vw, 160px)',
                height: 'auto',
                opacity: 0.85,
              }}
            />
          </div>
        </motion.div>

        {/* ── ESTADO ACTUAL · FASE 1 ── */}
        <div style={{ marginBottom: 'clamp(64px, 8vw, 112px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="flex items-baseline justify-between flex-wrap gap-3 mb-6"
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Estado actual · Fase 1
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
            >
              {fase1Done}/{fase1Total} actividades · {fase1Pct}%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.15 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(10,11,12,0.14)',
              borderRadius: 16,
              padding: 'clamp(28px, 3.4vw, 44px)',
              boxShadow: '0 18px 40px -24px rgba(10,11,12,0.10)',
            }}
          >
            {/* progress bar */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  height: 10,
                  background: 'rgba(10,11,12,0.08)',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${fase1Pct}%` }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 1.1, ease: ENTER, delay: 0.4 }}
                  style={{
                    height: '100%',
                    background: '#0d4ea8',
                    borderRadius: 6,
                  }}
                />
              </div>
            </div>

            {/* checklist */}
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FASE_1_ACTIVIDADES.map((act, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-4%' }}
                  transition={{ duration: 0.45, ease: ENTER, delay: 0.5 + i * 0.06 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr auto',
                    gap: 14,
                    alignItems: 'baseline',
                  }}
                >
                  <CheckGlyph done={act.done} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(15px, 1.4vw, 17px)',
                      lineHeight: 1.45,
                      color: '#0a0b0c',
                      letterSpacing: '-0.005em',
                      opacity: act.done ? 0.7 : 1,
                      fontWeight: act.done ? 400 : 500,
                    }}
                  >
                    {act.label}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: '0.22em',
                      color: act.done ? 'rgba(10,11,12,0.55)' : '#0d4ea8',
                      fontWeight: 700,
                    }}
                  >
                    {act.done ? '✓ done' : 'in progress'}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* DATOS DEL EDA · 3 datasets + gráfica HAM10000                 */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 'clamp(64px, 8vw, 112px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="flex items-baseline justify-between flex-wrap gap-3 mb-6"
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Análisis Exploratorio · 3 datasets caracterizados
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
            >
              click para detalle
            </span>
          </motion.div>

          {/* 3 mini-stat cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
              marginBottom: 36,
            }}
          >
            {DATASETS.map((d, i) => {
              const isActive = activeDataset === i;
              return (
                <motion.button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDataset(i)}
                  onMouseEnter={() => setActiveDataset(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.55, ease: ENTER, delay: 0.1 + i * 0.08 }}
                  style={{
                    appearance: 'none',
                    background: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    border: `1px solid ${isActive ? d.accent : 'rgba(10,11,12,0.14)'}`,
                    borderRadius: 14,
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 280ms ease-out',
                    boxShadow: isActive ? `0 18px 40px -22px ${d.accent}40` : 'none',
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: 11, letterSpacing: '0.28em', color: d.accent, fontWeight: 700 }}
                    >
                      {d.fuente}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(22px, 2.2vw, 28px)',
                      fontWeight: 500,
                      color: '#0a0b0c',
                      margin: '0 0 12px 0',
                      letterSpacing: '-0.018em',
                    }}
                  >
                    {d.nombre}
                  </h4>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(28px, 3vw, 38px)',
                      fontWeight: 200,
                      color: d.accent,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                      marginBottom: 8,
                    }}
                  >
                    {d.total}
                  </div>
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
                  >
                    imágenes · {d.clases} {d.id === 'co2' ? '' : 'clases'}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* detalle del dataset activo · gráfica */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.6, ease: ENTER, delay: 0.2 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(10,11,12,0.14)',
              borderRadius: 16,
              padding: 'clamp(28px, 3.4vw, 44px)',
              boxShadow: '0 18px 40px -24px rgba(10,11,12,0.10)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDataset}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: ENTER }}
              >
                {activeDataset === 0 && <HAMDistribution />}
                {activeDataset === 1 && <BCNStats data={DATASETS[1]} />}
                {activeDataset === 2 && <CO2Stats data={DATASETS[2]} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* GRÁFICAS COMPARATIVAS EDA · estilo paper IEEE                */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 'clamp(64px, 8vw, 112px)' }}>
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(26px, 2.8vw, 36px)',
              fontWeight: 400,
              letterSpacing: '-0.022em',
              color: '#0a0b0c',
              margin: '0 0 32px 0',
            }}
          >
            Hallazgos cruzados del EDA
          </motion.h3>

          {/* Figura 1 · Composición clínica (full-width) */}
          <PaperFigure
            num="Figura 1"
            titulo="Composición clínica por dataset"
            caption="Distribución de imágenes según naturaleza de la lesión. HAM10000 presenta mayor proporción benigna por la dominancia de la clase nv. BCN20000 muestra balance maligno/benigno cercano a la simetría."
            n={36}
          >
            <CompositionStack />
          </PaperFigure>

          {/* Figura 2 · Entropía y eficiencia */}
          <PaperFigure
            num="Figura 2"
            titulo="Entropía de Shannon y eficiencia distributiva"
            caption="Comparación entre la entropía observada y el máximo teórico log₂(k). HAM10000 alcanza una eficiencia distributiva del 58 %; BCN20000 del 73 %, lo que indica una distribución más uniforme entre clases."
            n={36}
          >
            <EntropyEfficiency />
          </PaperFigure>

          {/* Figura 3 · HAM10000 distribución acumulada (Lorenz-like) */}
          <PaperFigure
            num="Figura 3"
            titulo="Curva de concentración de clases · HAM10000"
            caption="Cuatro clases concentran más del 95 % del volumen total. La pendiente acusada en el segmento inferior izquierdo evidencia el desbalance que motiva el uso de muestreo ponderado y SSL en pre-entrenamiento."
            n={36}
          >
            <LorenzCurve />
          </PaperFigure>

          {/* Figura 4 · Heterogeneidad dimensional */}
          <PaperFigure
            num="Figura 4"
            titulo="Heterogeneidad dimensional inter-dataset"
            caption="Resoluciones nominales reportadas. La comparación dimensional directa entre los tres datasets no es válida sin un protocolo común de redimensionamiento y normalización de canales."
            n={36}
          >
            <DimensionTable />
          </PaperFigure>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RESULTADOS ESPERADOS · 4 dimensiones                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 'clamp(64px, 8vw, 112px)' }}>
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(26px, 2.8vw, 36px)',
              fontWeight: 400,
              letterSpacing: '-0.022em',
              color: '#0a0b0c',
              margin: '0 0 32px 0',
            }}
          >
            Resultados esperados · cuatro dimensiones
          </motion.h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
            }}
          >
            {RESULTADOS.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.6, ease: ENTER, delay: 0.05 + i * 0.08 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(10,11,12,0.14)',
                  borderRadius: 14,
                  padding: 'clamp(24px, 2.8vw, 32px)',
                  borderTop: `3px solid ${r.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 240,
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 10.5, letterSpacing: '0.28em', color: r.accent, fontWeight: 700 }}
                  >
                    {r.rol}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: 14, color: r.accent, fontWeight: 200, letterSpacing: '-0.04em' }}
                  >
                    {r.n}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(20px, 1.9vw, 24px)',
                    fontWeight: 500,
                    color: '#0a0b0c',
                    margin: 0,
                    letterSpacing: '-0.018em',
                    lineHeight: 1.15,
                  }}
                >
                  {r.titulo}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(14px, 1.3vw, 15.5px)',
                    lineHeight: 1.5,
                    color: 'rgba(10,11,12,0.78)',
                    margin: 0,
                    letterSpacing: '-0.003em',
                  }}
                >
                  {r.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* TRL LADDER                                                  */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="flex items-baseline justify-between flex-wrap gap-3 mb-8"
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(26px, 2.8vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Madurez tecnológica · TRL 4
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
            >
              meta · entorno laboratorio
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.15 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(10,11,12,0.14)',
              borderRadius: 14,
              padding: 'clamp(20px, 2.4vw, 32px)',
              marginBottom: 56,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
                gap: 'clamp(4px, 0.8vw, 8px)',
              }}
            >
              {TRL_LADDER.map((trl, i) => {
                const isPast = trl.state === 'past';
                const isTarget = trl.state === 'target';
                return (
                  <motion.div
                    key={trl.n}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-4%' }}
                    transition={{ duration: 0.4, ease: ENTER, delay: 0.3 + i * 0.05 }}
                    style={{
                      padding: 'clamp(10px, 1.4vw, 14px) clamp(8px, 1.2vw, 12px)',
                      background: isTarget ? '#0d4ea8' : isPast ? 'rgba(10,11,12,0.06)' : 'transparent',
                      border: isTarget ? 'none' : `1px solid ${isPast ? 'rgba(10,11,12,0.18)' : 'rgba(10,11,12,0.12)'}`,
                      borderRadius: 8,
                      borderStyle: !isPast && !isTarget ? 'dashed' : 'solid',
                      minHeight: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      position: 'relative',
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        fontWeight: 200,
                        color: isTarget ? '#ffffff' : isPast ? 'rgba(10,11,12,0.55)' : 'rgba(10,11,12,0.4)',
                        letterSpacing: '-0.04em',
                        lineHeight: 0.85,
                      }}
                    >
                      {trl.n}
                    </div>
                    <div
                      className="font-mono uppercase"
                      style={{
                        fontSize: 8.5,
                        letterSpacing: '0.18em',
                        color: isTarget ? 'rgba(255,255,255,0.78)' : isPast ? 'rgba(10,11,12,0.6)' : 'rgba(10,11,12,0.45)',
                        fontWeight: 600,
                        lineHeight: 1.25,
                      }}
                    >
                      {trl.label}
                    </div>
                    {isTarget && (
                      <div
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: 6,
                          background: '#fce88b',
                          color: '#0a0b0c',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8,
                          letterSpacing: '0.18em',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          textTransform: 'uppercase',
                        }}
                      >
                        Meta
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* cierre */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            paddingTop: 18,
            borderTop: '1px solid rgba(10,11,12,0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,11,12,0.55)',
            fontWeight: 500,
          }}
        >
          <span>fase 1 · 3 datasets · 4 resultados · TRL 4</span>
          <span style={{ color: 'rgba(10,11,12,0.75)', fontWeight: 600 }}>continúa →</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Glyphs ─────────────────────────────────────────────────────────

function CheckGlyph({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginTop: 2 }}>
        <circle cx="10" cy="10" r="9" fill="#00543d" />
        <path d="M5.5 10.5 L8.5 13.3 L14 6.8" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginTop: 2 }}>
      <circle cx="10" cy="10" r="9" fill="none" stroke="#0d4ea8" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="10" cy="10" r="3.5" fill="#0d4ea8">
        <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── HAM10000 Distribution Chart ────────────────────────────────────

function HAMDistribution() {
  const max = HAM10000_CLASES[0].count;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
        <div>
          <div
            className="font-mono uppercase"
            style={{ fontSize: 11.5, letterSpacing: '0.32em', color: '#0d4ea8', fontWeight: 700, marginBottom: 8 }}
          >
            HAM10000 · distribución de clases
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 2.2vw, 28px)',
              fontWeight: 500,
              color: '#0a0b0c',
              margin: 0,
              letterSpacing: '-0.018em',
            }}
          >
            7 clases · alta inequidad
          </h4>
        </div>
        <div className="flex gap-6">
          <Stat label="Shannon H" value="1,63" />
          <Stat label="Gini" value="0,64" />
          <Stat label="Imágenes" value="10.015" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {HAM10000_CLASES.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-2%' }}
            transition={{ duration: 0.5, ease: ENTER, delay: 0.05 + i * 0.06 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 0.5fr) minmax(0, 2fr) auto auto',
              gap: 'clamp(12px, 1.6vw, 24px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: '0.18em', color: '#0a0b0c', fontWeight: 700, textTransform: 'uppercase' }}
              >
                {c.code}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'rgba(10,11,12,0.75)',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.25,
                }}
              >
                {c.label}
              </div>
            </div>
            <div
              style={{
                height: 22,
                background: 'rgba(10,11,12,0.05)',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(c.count / max) * 100}%` }}
                viewport={{ once: true, margin: '-2%' }}
                transition={{ duration: 0.9, ease: ENTER, delay: 0.15 + i * 0.06 }}
                style={{
                  height: '100%',
                  background: c.color,
                  borderRadius: 4,
                }}
              />
            </div>
            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#0a0b0c',
                minWidth: 64,
                textAlign: 'right',
              }}
            >
              {c.count.toLocaleString('es-CO')}
            </span>
            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'rgba(10,11,12,0.6)',
                minWidth: 48,
                textAlign: 'right',
              }}
            >
              {c.pct.toFixed(2)}%
            </span>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: '1px dashed rgba(10,11,12,0.2)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13.5,
          lineHeight: 1.5,
          color: 'rgba(10,11,12,0.7)',
          letterSpacing: '-0.003em',
        }}
      >
        La clase <span style={{ color: '#0a0b0c', fontWeight: 600 }}>nv</span> domina con 66,95%; las 6 restantes suman 33,05%. Este desbalance motiva el uso de SSL y estrategias de muestreo ponderado.
      </div>
    </div>
  );
}

function BCNStats({ data }: { data: typeof DATASETS[number] }) {
  const cls = [
    { n: 'Nevus', count: 6800, pct: 35.9, color: '#abcbf9' },
    { n: 'CBC', count: 2800, pct: 14.8, color: '#bf3a3a' },
    { n: 'Melanoma', count: 2700, pct: 14.2, color: '#bf3a3a' },
    { n: 'Q. actínica', count: 1600, pct: 8.4, color: '#fce88b' },
    { n: 'Q. seborreica', count: 1300, pct: 6.9, color: '#abcbf9' },
    { n: 'Indeterminada', count: 1208, pct: 6.4, color: 'rgba(10,11,12,0.4)' },
    { n: 'CEC', count: 900, pct: 4.7, color: '#bf3a3a' },
    { n: 'Léntigo', count: 700, pct: 3.7, color: '#abcbf9' },
    { n: 'Vascular', count: 500, pct: 2.6, color: '#abcbf9' },
    { n: 'Dermatofibroma', count: 350, pct: 1.8, color: '#abcbf9' },
  ];
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
        <div>
          <div
            className="font-mono uppercase"
            style={{ fontSize: 11.5, letterSpacing: '0.32em', color: data.accent, fontWeight: 700, marginBottom: 8 }}
          >
            BCN20000 · distribución multinivel
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 2.2vw, 28px)',
              fontWeight: 500,
              color: '#0a0b0c',
              margin: 0,
              letterSpacing: '-0.018em',
            }}
          >
            10 clases · cobertura ampliada
          </h4>
        </div>
        <div className="flex gap-6">
          <Stat label="Shannon H" value="2,41" />
          <Stat label="Gini" value="0,42" />
          <Stat label="Imágenes" value="18.946" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {cls.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-2%' }}
            transition={{ duration: 0.45, ease: ENTER, delay: 0.05 + i * 0.04 }}
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.6)',
              border: `1px solid rgba(10,11,12,0.10)`,
              borderLeft: `3px solid ${c.color}`,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(10,11,12,0.55)', fontWeight: 700, textTransform: 'uppercase' }}>
              {c.n}
            </div>
            <div className="font-mono tabular-nums" style={{ fontSize: 18, fontWeight: 200, color: '#0a0b0c', letterSpacing: '-0.04em' }}>
              {c.count.toLocaleString('es-CO')}
            </div>
            <div className="font-mono tabular-nums" style={{ fontSize: 11, color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}>
              {c.pct.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          paddingTop: 14,
          borderTop: '1px dashed rgba(10,11,12,0.2)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13.5,
          lineHeight: 1.5,
          color: 'rgba(10,11,12,0.7)',
          letterSpacing: '-0.003em',
        }}
      >
        Distribución binaria: <span style={{ color: '#0a0b0c', fontWeight: 600 }}>46,8 % benigno / 46,8 % maligno / 6,4 % indeterminado</span>. Entropía y Gini reflejan mejor balance que HAM10000.
      </div>
    </div>
  );
}

function CO2Stats({ data }: { data: typeof DATASETS[number] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
        <div>
          <div
            className="font-mono uppercase"
            style={{ fontSize: 11.5, letterSpacing: '0.32em', color: data.accent, fontWeight: 700, marginBottom: 8 }}
          >
            CO2Wounds-V2 · dataset local Santander
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 2.2vw, 28px)',
              fontWeight: 500,
              color: '#0a0b0c',
              margin: 0,
              letterSpacing: '-0.018em',
            }}
          >
            Heridas crónicas · captura clínica
          </h4>
        </div>
        <div className="flex gap-6">
          <Stat label="Imágenes" value="764" />
          <Stat label="Pacientes" value="96" />
          <Stat label="mIoU" value="70,13" />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(14px, 2vw, 20px)',
          marginBottom: 20,
        }}
      >
        {[
          { label: 'Origen', value: 'Contratación, Santander' },
          { label: 'Captura', value: 'Smartphone · campo clínico' },
          { label: 'Patología', value: 'Lepra (Hansen) · heridas' },
          { label: 'Licencia', value: 'CC BY-NC-ND' },
          { label: 'Tarea', value: 'Segmentación binaria · F1 79,44' },
          { label: 'Asesoría', value: 'Karen Sánchez · KAUST · UIS' },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(10,11,12,0.10)',
              borderRadius: 8,
            }}
          >
            <div
              className="font-mono uppercase"
              style={{ fontSize: 10.5, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 700, marginBottom: 6 }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14.5,
                fontWeight: 500,
                color: '#0a0b0c',
                letterSpacing: '-0.005em',
                lineHeight: 1.3,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 12,
          paddingTop: 14,
          borderTop: '1px dashed rgba(10,11,12,0.2)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13.5,
          lineHeight: 1.5,
          color: 'rgba(10,11,12,0.7)',
          letterSpacing: '-0.003em',
        }}
      >
        Resoluciones heterogéneas frente al estándar dermatoscópico. Rol del dataset: validar viabilidad metodológica en condiciones de captura locales, no comparación directa con HAM10000 ni BCN20000.
      </div>
    </div>
  );
}

// ─── Paper figure wrapper · estilo IEEE/Nature ──────────────────────

function PaperFigure({ num, titulo, caption, n, children }: { num: string; titulo: string; caption: string; n: number; children: React.ReactNode }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.6, ease: ENTER }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(10,11,12,0.18)',
        borderRadius: 4,
        padding: 'clamp(28px, 3.4vw, 48px)',
        marginBottom: 'clamp(20px, 2.4vw, 32px)',
      }}
    >
      <div
        style={{
          marginBottom: 28,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(10,11,12,0.18)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 10.5,
              letterSpacing: '0.32em',
              color: 'rgba(10,11,12,0.55)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {num}
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(19px, 1.8vw, 23px)',
              fontWeight: 500,
              color: '#0a0b0c',
              margin: 0,
              letterSpacing: '-0.018em',
              lineHeight: 1.2,
            }}
          >
            {titulo}
          </h4>
        </div>
        <span
          className="font-mono uppercase"
          style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.5)', fontWeight: 600 }}
        >
          n = {n}
        </span>
      </div>
      <div style={{ marginBottom: 22 }}>{children}</div>
      <figcaption
        style={{
          paddingTop: 14,
          borderTop: '1px solid rgba(10,11,12,0.12)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          lineHeight: 1.5,
          color: 'rgba(10,11,12,0.7)',
          letterSpacing: '-0.003em',
          fontStyle: 'italic',
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 600, color: '#0a0b0c' }}>{num}.</span>{' '}
        {caption}
      </figcaption>
    </motion.figure>
  );
}

// ─── Figura 1 · Composición clínica stack ───────────────────────────

function CompositionStack() {
  const data = [
    {
      label: 'HAM10000',
      n: '10.015',
      seg: [
        { name: 'Benigna', pct: 81.43, color: '#0a0b0c' },
        { name: 'Maligna', pct: 15.40, color: 'rgba(10,11,12,0.55)' },
        { name: 'Precancerosa', pct: 3.27, color: 'rgba(10,11,12,0.25)' },
      ],
    },
    {
      label: 'BCN20000',
      n: '18.946',
      seg: [
        { name: 'Benigna', pct: 46.8, color: '#0a0b0c' },
        { name: 'Maligna', pct: 46.8, color: 'rgba(10,11,12,0.55)' },
        { name: 'Indeterminada', pct: 6.4, color: 'rgba(10,11,12,0.25)' },
      ],
    },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data.map((d, i) => (
          <div key={d.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 12, letterSpacing: '0.22em', color: '#0a0b0c', fontWeight: 700 }}
              >
                {d.label}
              </span>
              <span
                className="font-mono tabular-nums"
                style={{ fontSize: 12, color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
              >
                n = {d.n}
              </span>
            </div>
            <div style={{ display: 'flex', height: 32, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(10,11,12,0.12)' }}>
              {d.seg.map((s, j) => (
                <motion.div
                  key={j}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.pct}%` }}
                  viewport={{ once: true, margin: '-2%' }}
                  transition={{ duration: 0.9, ease: ENTER, delay: 0.15 + i * 0.1 + j * 0.05 }}
                  style={{
                    background: s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.color === 'rgba(10,11,12,0.25)' ? '#0a0b0c' : '#ffffff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.pct >= 8 ? `${s.pct.toFixed(1)}%` : ''}
                </motion.div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 8, flexWrap: 'wrap' }}>
              {d.seg.map((s) => (
                <span
                  key={s.name}
                  className="font-mono uppercase"
                  style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(10,11,12,0.7)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span style={{ width: 10, height: 10, background: s.color, display: 'inline-block', borderRadius: 1 }} />
                  {s.name} · {s.pct.toFixed(1)}%
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Figura 2 · Eficiencia entrópica ────────────────────────────────

function EntropyEfficiency() {
  const data = [
    { label: 'HAM10000', H: 1.63, Hmax: 2.81, eff: 58 },
    { label: 'BCN20000', H: 2.41, Hmax: 3.32, eff: 73 },
  ];
  return (
    <svg viewBox="0 0 720 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* eje Y */}
      <line x1="80" y1="30" x2="80" y2="190" stroke="#0a0b0c" strokeWidth="1" />
      {/* eje X */}
      <line x1="80" y1="190" x2="700" y2="190" stroke="#0a0b0c" strokeWidth="1" />

      {/* ticks Y */}
      {[0, 1, 2, 3, 4].map((v) => {
        const y = 190 - (v / 4) * 160;
        return (
          <g key={v}>
            <line x1="76" y1={y} x2="80" y2={y} stroke="#0a0b0c" strokeWidth="1" />
            <text x={70} y={y + 3} textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: 'rgba(10,11,12,0.65)' }}>
              {v}
            </text>
            <line x1="80" y1={y} x2="700" y2={y} stroke="rgba(10,11,12,0.08)" strokeWidth="0.5" strokeDasharray="2 4" />
          </g>
        );
      })}

      {/* label eje Y */}
      <text
        transform="rotate(-90 24 110)"
        x={24}
        y={110}
        textAnchor="middle"
        style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 11, fill: 'rgba(10,11,12,0.7)' }}
      >
        Entropía · bits
      </text>

      {/* barras paired · H observado y Hmax teórico */}
      {data.map((d, i) => {
        const cx = 180 + i * 280;
        const barW = 90;
        const hObs = (d.H / 4) * 160;
        const hMax = (d.Hmax / 4) * 160;
        return (
          <g key={d.label}>
            {/* Hmax · barra contorno */}
            <motion.rect
              x={cx}
              y={190 - hMax}
              width={barW}
              height={hMax}
              fill="rgba(10,11,12,0.04)"
              stroke="#0a0b0c"
              strokeWidth={1}
              strokeDasharray="4 3"
              initial={{ height: 0, y: 190 }}
              whileInView={{ height: hMax, y: 190 - hMax }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.8, ease: ENTER, delay: 0.2 + i * 0.1 }}
            />
            {/* H observada · barra sólida */}
            <motion.rect
              x={cx + barW + 12}
              y={190 - hObs}
              width={barW}
              height={hObs}
              fill="#0a0b0c"
              initial={{ height: 0, y: 190 }}
              whileInView={{ height: hObs, y: 190 - hObs }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.8, ease: ENTER, delay: 0.4 + i * 0.1 }}
            />
            {/* etiquetas valores */}
            <text x={cx + barW / 2} y={190 - hMax - 8} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#0a0b0c' }}>
              {d.Hmax.toFixed(2)}
            </text>
            <text x={cx + barW + 12 + barW / 2} y={190 - hObs - 8} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#0a0b0c' }}>
              {d.H.toFixed(2)}
            </text>
            {/* eficiencia */}
            <text x={cx + barW + 6} y={208} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#00543d', letterSpacing: '0.04em' }}>
              η = {d.eff}%
            </text>
            {/* dataset label */}
            <text x={cx + barW + 6} y={228} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#0a0b0c', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {d.label}
            </text>
          </g>
        );
      })}

      {/* leyenda */}
      <g transform="translate(560, 30)">
        <rect x={0} y={-7} width={12} height={12} fill="rgba(10,11,12,0.04)" stroke="#0a0b0c" strokeWidth={1} strokeDasharray="3 2" />
        <text x={18} y={3} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, fill: 'rgba(10,11,12,0.7)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
          H máx · log₂(k)
        </text>
        <rect x={0} y={13} width={12} height={12} fill="#0a0b0c" />
        <text x={18} y={23} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, fill: 'rgba(10,11,12,0.7)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
          H observada
        </text>
      </g>
    </svg>
  );
}

// ─── Figura 3 · Curva de concentración (Lorenz) · HAM10000 ──────────

function LorenzCurve() {
  // ordenados ascendentes por count: df 1.15, vasc 1.42, akiec 3.27, bcc 5.13, bkl 10.97, mel 11.11, nv 66.95
  const sorted = [
    { code: 'df', pct: 1.15 },
    { code: 'vasc', pct: 1.42 },
    { code: 'akiec', pct: 3.27 },
    { code: 'bcc', pct: 5.13 },
    { code: 'bkl', pct: 10.97 },
    { code: 'mel', pct: 11.11 },
    { code: 'nv', pct: 66.95 },
  ];
  const k = sorted.length;
  // acumulado
  let acc = 0;
  const pts = sorted.map((s, i) => {
    acc += s.pct;
    return { x: ((i + 1) / k) * 100, y: acc, code: s.code };
  });
  pts.unshift({ x: 0, y: 0, code: '' });

  const W = 720;
  const H = 240;
  const PAD = 60;
  const innerW = W - PAD * 2;
  const innerH = H - PAD - 30;

  function toX(v: number) {
    return PAD + (v / 100) * innerW;
  }
  function toY(v: number) {
    return PAD + innerH - (v / 100) * innerH;
  }

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)}`).join(' ');
  const equality = `M ${toX(0)} ${toY(0)} L ${toX(100)} ${toY(100)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* grid */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={PAD} y1={toY(v)} x2={W - PAD} y2={toY(v)} stroke="rgba(10,11,12,0.08)" strokeWidth="0.5" strokeDasharray="2 4" />
          <text x={PAD - 8} y={toY(v) + 4} textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: 'rgba(10,11,12,0.65)' }}>
            {v}
          </text>
          <line x1={toX(v)} y1={PAD} x2={toX(v)} y2={PAD + innerH} stroke="rgba(10,11,12,0.08)" strokeWidth="0.5" strokeDasharray="2 4" />
          <text x={toX(v)} y={PAD + innerH + 16} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: 'rgba(10,11,12,0.65)' }}>
            {v}
          </text>
        </g>
      ))}
      {/* axes */}
      <line x1={PAD} y1={PAD + innerH} x2={W - PAD} y2={PAD + innerH} stroke="#0a0b0c" strokeWidth="1" />
      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + innerH} stroke="#0a0b0c" strokeWidth="1" />
      {/* eje labels */}
      <text x={W / 2} y={H - 8} textAnchor="middle" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 11, fill: 'rgba(10,11,12,0.7)' }}>
        % acumulado de clases (ordenadas ascendente)
      </text>
      <text transform={`rotate(-90 16 ${H / 2})`} x={16} y={H / 2} textAnchor="middle" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 11, fill: 'rgba(10,11,12,0.7)' }}>
        % acumulado de imágenes
      </text>

      {/* equality line · referencia ideal */}
      <path d={equality} stroke="rgba(10,11,12,0.45)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <text x={toX(50) + 6} y={toY(50) - 6} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: 'rgba(10,11,12,0.55)', fontStyle: 'italic' }}>
        equidad teórica
      </text>

      {/* curva observada */}
      <motion.path
        d={path}
        stroke="#0a0b0c"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-2%' }}
        transition={{ duration: 1.4, ease: ENTER }}
      />

      {/* puntos */}
      {pts.slice(1).map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={toX(p.x)}
            cy={toY(p.y)}
            r={4}
            fill="#0a0b0c"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-2%' }}
            transition={{ duration: 0.4, ease: ENTER, delay: 0.6 + i * 0.08 }}
          />
          <text x={toX(p.x) + 8} y={toY(p.y) - 8} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, fill: '#0a0b0c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {p.code}
          </text>
        </g>
      ))}

      {/* Gini annotation */}
      <text x={W - PAD - 8} y={PAD + 20} textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#0a0b0c' }}>
        Gini = 0,64
      </text>
    </svg>
  );
}

// ─── Figura 4 · Tabla dimensional sobria ────────────────────────────

function DimensionTable() {
  const rows = [
    { ds: 'HAM10000', res: '600 × 450 px', uniform: 'uniforme', captura: 'Dermatoscopio clínico', n: '10.015' },
    { ds: 'BCN20000', res: '1024 × 1024 px (mediana)', uniform: 'heterogéneo', captura: 'Dermatoscopio multicéntrico', n: '18.946' },
    { ds: 'CO2Wounds-V2', res: 'Variable · smartphone', uniform: 'heterogéneo', captura: 'Cámara de teléfono en campo', n: '764' },
  ];
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        fontFamily: 'var(--font-sans)',
      }}
    >
      <thead>
        <tr>
          {['Dataset', 'Resolución', 'Uniformidad', 'Captura', 'n'].map((h) => (
            <th
              key={h}
              style={{
                textAlign: h === 'n' ? 'right' : 'left',
                padding: '10px 12px',
                borderBottom: '2px solid #0a0b0c',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: '0.22em',
                color: '#0a0b0c',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <motion.tr
            key={r.ds}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-2%' }}
            transition={{ duration: 0.4, ease: ENTER, delay: 0.05 + i * 0.06 }}
          >
            <td style={cellStyle(i, rows.length)}>
              <span className="font-mono uppercase" style={{ fontSize: 12, letterSpacing: '0.16em', fontWeight: 700 }}>
                {r.ds}
              </span>
            </td>
            <td style={cellStyle(i, rows.length)}>{r.res}</td>
            <td style={cellStyle(i, rows.length)}>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  color: r.uniform === 'uniforme' ? '#00543d' : 'rgba(10,11,12,0.6)',
                }}
              >
                {r.uniform === 'uniforme' ? '✓ uniforme' : '· heterogéneo'}
              </span>
            </td>
            <td style={cellStyle(i, rows.length)}>{r.captura}</td>
            <td style={{ ...cellStyle(i, rows.length), textAlign: 'right' }}>
              <span className="font-mono tabular-nums" style={{ fontWeight: 700 }}>
                {r.n}
              </span>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}

function cellStyle(i: number, total: number): React.CSSProperties {
  return {
    padding: '14px 12px',
    fontSize: 14.5,
    color: '#0a0b0c',
    letterSpacing: '-0.003em',
    borderBottom: i < total - 1 ? '1px solid rgba(10,11,12,0.12)' : 'none',
  };
}

// ─── (componentes anteriores conservados por compat) ────────────────

function BalanceChart() {
  const data = [
    { name: 'HAM10000', H: 1.63, gini: 0.64, color: '#0d4ea8' },
    { name: 'BCN20000', H: 2.41, gini: 0.42, color: '#8a3f85' },
  ];
  const maxH = 2.81; // entropía máxima teórica
  return (
    <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* eje */}
      <line x1="50" y1="170" x2="340" y2="170" stroke="rgba(10,11,12,0.3)" strokeWidth="1" />
      <line x1="50" y1="30" x2="50" y2="170" stroke="rgba(10,11,12,0.3)" strokeWidth="1" />

      {/* ticks Y · Shannon */}
      {[0, 1, 2].map((v) => {
        const y = 170 - (v / 3) * 140;
        return (
          <g key={`y-${v}`}>
            <line x1="47" y1={y} x2="50" y2={y} stroke="rgba(10,11,12,0.3)" strokeWidth="1" />
            <text x="42" y={y + 3} textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: 'rgba(10,11,12,0.6)' }}>
              {v}
            </text>
          </g>
        );
      })}

      {/* grupos de barras */}
      {data.map((d, i) => {
        const gx = 90 + i * 140;
        const hHeight = (d.H / 3) * 140;
        const giniHeight = d.gini * 140;
        return (
          <g key={d.name}>
            {/* Shannon bar */}
            <motion.rect
              x={gx}
              y={170 - hHeight}
              width="42"
              height={hHeight}
              fill={d.color}
              initial={{ height: 0, y: 170 }}
              whileInView={{ height: hHeight, y: 170 - hHeight }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.9, ease: ENTER, delay: 0.2 + i * 0.1 }}
              rx={2}
            />
            <text
              x={gx + 21}
              y={170 - hHeight - 6}
              textAnchor="middle"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: d.color }}
            >
              {d.H.toFixed(2)}
            </text>

            {/* Gini bar */}
            <motion.rect
              x={gx + 52}
              y={170 - giniHeight}
              width="42"
              height={giniHeight}
              fill={d.color}
              fillOpacity={0.35}
              stroke={d.color}
              strokeWidth={1}
              initial={{ height: 0, y: 170 }}
              whileInView={{ height: giniHeight, y: 170 - giniHeight }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.9, ease: ENTER, delay: 0.4 + i * 0.1 }}
              rx={2}
            />
            <text
              x={gx + 73}
              y={170 - giniHeight - 6}
              textAnchor="middle"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: d.color }}
            >
              {d.gini.toFixed(2)}
            </text>

            {/* label */}
            <text
              x={gx + 47}
              y={188}
              textAnchor="middle"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                fill: '#0a0b0c',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {d.name}
            </text>
          </g>
        );
      })}

      {/* legenda */}
      <g transform="translate(50, 14)">
        <rect x={0} y={-6} width={10} height={10} fill="#0d4ea8" />
        <text x={16} y={3} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, fill: 'rgba(10,11,12,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Shannon
        </text>
        <rect x={88} y={-6} width={10} height={10} fill="#0d4ea8" fillOpacity={0.35} stroke="#0d4ea8" strokeWidth={1} />
        <text x={104} y={3} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600, fill: 'rgba(10,11,12,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Gini
        </text>
      </g>
    </svg>
  );
}

function DonutBenignoMaligno() {
  const data = [
    { name: 'Benigno', pct: 46.8, color: '#abcbf9', deg: 0 },
    { name: 'Maligno', pct: 46.8, color: '#bf3a3a', deg: 46.8 * 3.6 },
    { name: 'Indeterminado', pct: 6.4, color: 'rgba(10,11,12,0.35)', deg: 93.6 * 3.6 },
  ];
  const CX = 100;
  const CY = 100;
  const R = 70;
  const r2 = 42;

  function arcPath(startDeg: number, pct: number) {
    const sweep = pct * 3.6;
    const endDeg = startDeg + sweep;
    const sRad = ((startDeg - 90) * Math.PI) / 180;
    const eRad = ((endDeg - 90) * Math.PI) / 180;
    const x1 = CX + R * Math.cos(sRad);
    const y1 = CY + R * Math.sin(sRad);
    const x2 = CX + R * Math.cos(eRad);
    const y2 = CY + R * Math.sin(eRad);
    const x3 = CX + r2 * Math.cos(eRad);
    const y3 = CY + r2 * Math.sin(eRad);
    const x4 = CX + r2 * Math.cos(sRad);
    const y4 = CY + r2 * Math.sin(sRad);
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${r2} ${r2} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 1fr', gap: 16, alignItems: 'center' }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 200 }}>
        {data.map((d) => (
          <motion.path
            key={d.name}
            d={arcPath(d.deg, d.pct)}
            fill={d.color}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-2%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
        <text x={CX} y={CY - 4} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, fill: '#0a0b0c', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          BCN
        </text>
        <text x={CX} y={CY + 12} textAnchor="middle" style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fill: 'rgba(10,11,12,0.55)' }}>
          18.946
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map((d) => (
          <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '14px 1fr auto', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 12, height: 12, background: d.color, borderRadius: 2, display: 'inline-block' }} />
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10.5, letterSpacing: '0.18em', color: '#0a0b0c', fontWeight: 600 }}
            >
              {d.name}
            </span>
            <span
              className="font-mono tabular-nums"
              style={{ fontSize: 12, fontWeight: 700, color: '#0a0b0c' }}
            >
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResolutionChart() {
  const data = [
    { name: 'HAM10000', res: '600 × 450', uniform: true, color: '#0d4ea8', bar: 100 },
    { name: 'BCN20000', res: '1024 × 1024+', uniform: false, color: '#8a3f85', bar: 75 },
    { name: 'CO2Wounds-V2', res: 'Variable smartphone', uniform: false, color: '#00543d', bar: 35 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {data.map((d, i) => (
        <motion.div
          key={d.name}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-2%' }}
          transition={{ duration: 0.5, ease: ENTER, delay: 0.1 + i * 0.08 }}
        >
          <div className="flex items-baseline justify-between mb-1">
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10.5, letterSpacing: '0.18em', color: '#0a0b0c', fontWeight: 700 }}
            >
              {d.name}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11, color: d.color, fontWeight: 600 }}
            >
              {d.res}
            </span>
          </div>
          <div style={{ height: 10, background: 'rgba(10,11,12,0.06)', borderRadius: 5, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${d.bar}%` }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.9, ease: ENTER, delay: 0.2 + i * 0.08 }}
              style={{ height: '100%', background: d.color, opacity: d.uniform ? 1 : 0.6, borderRadius: 5 }}
            />
          </div>
          <div
            className="font-mono uppercase"
            style={{ fontSize: 9.5, letterSpacing: '0.18em', color: d.uniform ? '#00543d' : 'rgba(10,11,12,0.5)', fontWeight: 700, marginTop: 4 }}
          >
            {d.uniform ? '✓ uniforme' : '· heterogéneo'}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Coverage Matrix · 7 patologías × 3 datasets ────────────────────

function CoverageMatrix() {
  const datasets = [
    { id: 'ham', label: 'HAM10000', accent: '#0d4ea8' },
    { id: 'bcn', label: 'BCN20000', accent: '#8a3f85' },
    { id: 'co2', label: 'CO2Wounds', accent: '#00543d' },
  ];
  const patologias = [
    { code: 'mel', name: 'Melanoma', priority: 'Crítica', ham: 'full', bcn: 'full', co2: 'none' },
    { code: 'bcc', name: 'Carcinoma basocelular', priority: 'Crítica', ham: 'full', bcn: 'full', co2: 'none' },
    { code: 'scc', name: 'Carcinoma escamocelular (akiec)', priority: 'Crítica', ham: 'partial', bcn: 'full', co2: 'none' },
    { code: 'nv', name: 'Nevus melanocítico', priority: 'Alta', ham: 'full', bcn: 'full', co2: 'none' },
    { code: 'bkl', name: 'Queratosis benigna', priority: 'Media', ham: 'full', bcn: 'full', co2: 'none' },
    { code: 'vasc', name: 'Lesión vascular', priority: 'Baja', ham: 'partial', bcn: 'partial', co2: 'none' },
    { code: 'wound', name: 'Heridas crónicas / lepra', priority: 'Local', ham: 'none', bcn: 'none', co2: 'full' },
  ];

  function cellFill(level: string) {
    if (level === 'full') return '#00543d';
    if (level === 'partial') return 'rgba(0,84,61,0.45)';
    return 'rgba(10,11,12,0.06)';
  }
  function cellLabel(level: string) {
    if (level === 'full') return '✓';
    if (level === 'partial') return '~';
    return '—';
  }
  function priorityColor(p: string) {
    if (p === 'Crítica') return '#bf3a3a';
    if (p === 'Alta') return '#a68a00';
    if (p === 'Media') return '#0d4ea8';
    if (p === 'Local') return '#00543d';
    return 'rgba(10,11,12,0.5)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.7, ease: ENTER }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(10,11,12,0.14)',
        borderRadius: 16,
        padding: 'clamp(24px, 3vw, 36px)',
        boxShadow: '0 18px 40px -24px rgba(10,11,12,0.10)',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          width: '100%',
          minWidth: 640,
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontFamily: 'var(--font-sans)',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: '0.22em',
                color: 'rgba(10,11,12,0.55)',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(10,11,12,0.18)',
              }}
            >
              Patología
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: '0.22em',
                color: 'rgba(10,11,12,0.55)',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(10,11,12,0.18)',
              }}
            >
              Prioridad
            </th>
            {datasets.map((d) => (
              <th
                key={d.id}
                style={{
                  textAlign: 'center',
                  padding: '12px 10px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: d.accent,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(10,11,12,0.18)',
                }}
              >
                {d.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patologias.map((p, i) => (
            <motion.tr
              key={p.code}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-2%' }}
              transition={{ duration: 0.45, ease: ENTER, delay: 0.05 + i * 0.05 }}
            >
              <td
                style={{
                  padding: '14px 14px',
                  fontSize: 14.5,
                  fontWeight: 500,
                  color: '#0a0b0c',
                  letterSpacing: '-0.005em',
                  borderBottom: i < patologias.length - 1 ? '1px solid rgba(10,11,12,0.08)' : 'none',
                }}
              >
                <div className="font-mono" style={{ fontSize: 10, color: 'rgba(10,11,12,0.5)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 3 }}>
                  {p.code}
                </div>
                {p.name}
              </td>
              <td
                style={{
                  padding: '14px 14px',
                  borderBottom: i < patologias.length - 1 ? '1px solid rgba(10,11,12,0.08)' : 'none',
                }}
              >
                <span
                  className="font-mono uppercase"
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: `${priorityColor(p.priority)}18`,
                    color: priorityColor(p.priority),
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    borderRadius: 4,
                  }}
                >
                  {p.priority}
                </span>
              </td>
              {[p.ham, p.bcn, p.co2].map((lvl, j) => (
                <td
                  key={j}
                  style={{
                    padding: '14px 10px',
                    textAlign: 'center',
                    borderBottom: i < patologias.length - 1 ? '1px solid rgba(10,11,12,0.08)' : 'none',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      background: cellFill(lvl),
                      color: lvl === 'full' || lvl === 'partial' ? '#ffffff' : 'rgba(10,11,12,0.4)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 18,
                      fontWeight: 700,
                      borderRadius: 8,
                    }}
                  >
                    {cellLabel(lvl)}
                  </span>
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* leyenda */}
      <div style={{ display: 'flex', gap: 24, marginTop: 20, paddingTop: 16, borderTop: '1px dashed rgba(10,11,12,0.18)', flexWrap: 'wrap' }}>
        {[
          { label: 'Cobertura completa', sym: '✓', color: '#00543d' },
          { label: 'Parcial · revisar volumen', sym: '~', color: 'rgba(0,84,61,0.45)' },
          { label: 'No cubierto', sym: '—', color: 'rgba(10,11,12,0.4)' },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 22,
                height: 22,
                background: l.color,
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {l.sym}
            </span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(10,11,12,0.65)', fontWeight: 600 }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="font-mono uppercase"
        style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 700, marginBottom: 4 }}
      >
        {label}
      </div>
      <div
        className="font-mono tabular-nums"
        style={{ fontSize: 18, fontWeight: 200, color: '#0a0b0c', letterSpacing: '-0.04em', lineHeight: 0.9 }}
      >
        {value}
      </div>
    </div>
  );
}
