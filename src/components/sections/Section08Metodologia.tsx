// ─────────────────────────────────────────────────────────────────────────
// §08 · Metodología CRISP-DM + Cronograma temporal.
//
// 1. Hero
// 2. Diagrama CRISP-DM premium · anillos concéntricos · interactivo
// 3. Cronograma Feb–Nov 2026 · timeline horizontal con 4 fases
// 4. Métricas de evaluación
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

const FASES = [
  {
    n: '01',
    oe: 'OE 1',
    titulo: 'Análisis y preparación de datos',
    accent: '#0d4ea8',
    sub: 'Caracterizar corpus dermatoscópicos',
    activities: [
      { name: 'Caracterización del problema clínico regional', state: 'done' },
      { name: 'Revisión de literatura · estado del arte', state: 'done' },
      { name: 'Selección de corpus (HAM10000, ISIC)', state: 'done' },
      { name: 'Análisis preliminar de corpus', state: 'done' },
      { name: 'Pipeline de preprocesamiento', state: 'progress' },
    ],
  },
  {
    n: '02',
    oe: 'OE 2',
    titulo: 'Diseño del algoritmo SSL',
    accent: '#8a3f85',
    sub: 'Pre-entrenamiento + fine-tuning',
    activities: [
      { name: 'Selección del backbone visual', state: 'pending' },
      { name: 'Entrenamiento SSL sin etiquetas', state: 'pending' },
      { name: 'Fine-tuning supervisado', state: 'pending' },
      { name: 'Ajuste de hiperparámetros', state: 'pending' },
    ],
  },
  {
    n: '03',
    oe: 'OE 3',
    titulo: 'Evaluación del desempeño',
    accent: '#a68a00',
    sub: 'SSL vs supervisado · mismo backbone',
    activities: [
      { name: 'Diseño experimental controlado', state: 'pending' },
      { name: 'Evaluación AUC-ROC · F1 · matrices de confusión', state: 'pending' },
      { name: 'Comparativa frente al estado del arte', state: 'pending' },
      { name: 'Análisis estadístico', state: 'pending' },
    ],
  },
  {
    n: '04',
    oe: 'OE 4',
    titulo: 'Implementación del prototipo',
    accent: '#00543d',
    sub: 'Carga → predicción → visualización',
    activities: [
      { name: 'Integración del modelo entrenado', state: 'pending' },
      { name: 'Interfaz de carga de imagen', state: 'pending' },
      { name: 'Visualización de métricas y predicción', state: 'pending' },
      { name: 'Documentación y manual de uso', state: 'pending' },
    ],
  },
] as const;

const MESES = ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'] as const;

// Cada fase tiene rango [mesStartIdx, mesEndIdx] dentro de MESES
const FASE_RANGE: Record<string, { start: number; end: number }> = {
  '01': { start: 0, end: 4 }, // Feb–May (in-progress, terminando)
  '02': { start: 4, end: 6 }, // Jun–Jul
  '03': { start: 6, end: 8 }, // Ago–Sep
  '04': { start: 8, end: 10 }, // Oct–Nov
};

// Hoy: mediados de mayo 2026 → idx 3.5 (entre May y Jun)
const HOY_IDX = 3.5;

const METRICAS = [
  {
    sigla: 'AUC-ROC',
    rol: 'Métrica principal',
    accent: '#0d4ea8',
    desc: 'Discrimina entre clases en todos los umbrales. Robusta frente a desbalance.',
  },
  {
    sigla: 'F1-score',
    rol: 'Balance precision/recall',
    accent: '#8a3f85',
    desc: 'Combina precisión y exhaustividad. Relevante cuando las clases están desbalanceadas.',
  },
  {
    sigla: 'Exactitud por clase',
    rol: 'Desagregación clínica',
    accent: '#a68a00',
    desc: 'Desempeño individual por tipo de lesión: melanoma, basocelular, nevo.',
  },
  {
    sigla: 'Matriz de confusión',
    rol: 'FP · FN críticos',
    accent: '#00543d',
    desc: 'Atención a falsos positivos por impacto clínico del diagnóstico erróneo.',
  },
] as const;

export default function Section08Metodologia() {
  const [activeFase, setActiveFase] = useState(0);

  return (
    <section
      id="section-metodologia"
      aria-labelledby="met-h"
      style={{
        background: '#eef1f5',
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
            'radial-gradient(ellipse at 90% 10%, rgba(13,78,168,0.08) 0%, transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(0,84,61,0.07) 0%, transparent 55%)',
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
            §08 · metodología
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
          >
            CRISP-DM · cronograma · métricas
          </span>
        </div>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{ marginBottom: 'clamp(56px, 7vw, 96px)' }}
        >
          <h2
            id="met-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              lineHeight: 1.0,
              letterSpacing: '-0.028em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '16ch',
            }}
          >
            <span style={{ color: '#0d4ea8', fontWeight: 500 }}>CRISP-DM</span>, cuatro fases.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(17px, 1.7vw, 21px)',
              lineHeight: 1.5,
              color: 'rgba(10,11,12,0.72)',
              margin: '20px 0 0 0',
              maxWidth: '46ch',
              letterSpacing: '-0.005em',
            }}
          >
            Cada fase del estándar CRISP-DM mapea a un objetivo específico del proyecto.
          </p>
        </motion.div>

        {/* ── DIAGRAMA CRISP-DM PREMIUM ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{
            marginBottom: 'clamp(64px, 8vw, 112px)',
            background: '#ffffff',
            border: '1px solid rgba(10,11,12,0.14)',
            borderRadius: 20,
            padding: 'clamp(28px, 3.4vw, 56px)',
            boxShadow: '0 24px 60px -32px rgba(13,78,168,0.22)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: 'clamp(20px, 3vw, 48px)',
              alignItems: 'center',
            }}
          >
            <CrispDmDiagram active={activeFase} onSelect={setActiveFase} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFase}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: ENTER }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.32em',
                    color: FASES[activeFase].accent,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Fase {FASES[activeFase].n} · {FASES[activeFase].oe}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(24px, 2.8vw, 36px)',
                    fontWeight: 500,
                    color: '#0a0b0c',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.022em',
                    lineHeight: 1.08,
                  }}
                >
                  {FASES[activeFase].titulo}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(16px, 1.5vw, 18px)',
                    lineHeight: 1.45,
                    color: 'rgba(10,11,12,0.72)',
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {FASES[activeFase].sub}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {FASES[activeFase].activities.map((a, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '20px 1fr',
                        gap: 12,
                        alignItems: 'baseline',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(14px, 1.3vw, 15.5px)',
                        lineHeight: 1.45,
                        color: '#0a0b0c',
                        letterSpacing: '-0.003em',
                      }}
                    >
                      <StateGlyph state={a.state} accent={FASES[activeFase].accent} />
                      <span style={{ opacity: a.state === 'done' ? 0.55 : 1 }}>{a.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CRONOGRAMA · timeline Feb–Nov 2026                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 'clamp(72px, 8vw, 112px)' }}>
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
              Cronograma · febrero a noviembre 2026
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
            >
              hoy · mayo
            </span>
          </motion.div>

          <CronogramaTimeline activeFase={activeFase} setActiveFase={setActiveFase} />
        </div>

        {/* ── MÉTRICAS DE EVALUACIÓN ── */}
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
              Métricas de evaluación
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
            >
              fase 03 · OE 3
            </span>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
              marginBottom: 56,
            }}
          >
            {METRICAS.map((m, i) => (
              <motion.div
                key={m.sigla}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.6, ease: ENTER, delay: 0.05 + i * 0.08 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(10,11,12,0.14)',
                  borderRadius: 14,
                  padding: 'clamp(22px, 2.6vw, 30px)',
                  borderTop: `3px solid ${m.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  minHeight: 200,
                }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: '0.28em',
                    color: m.accent,
                    fontWeight: 700,
                  }}
                >
                  {m.rol}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(22px, 2vw, 26px)',
                    fontWeight: 500,
                    color: '#0a0b0c',
                    margin: 0,
                    letterSpacing: '-0.018em',
                    lineHeight: 1.1,
                  }}
                >
                  {m.sigla}
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
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
          <span>4 fases · 10 meses · 4 métricas</span>
          <span style={{ color: 'rgba(10,11,12,0.75)', fontWeight: 600 }}>continúa →</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── State glyph (done/progress/pending) ────────────────────────────

function StateGlyph({ state, accent }: { state: string; accent: string }) {
  if (state === 'done') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 2 }}>
        <circle cx="8" cy="8" r="7" fill={accent} opacity="0.85" />
        <path d="M4.5 8.2 L7 10.5 L11.5 5.8" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === 'progress') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 2 }}>
        <circle cx="8" cy="8" r="7" fill="none" stroke={accent} strokeWidth="2" />
        <circle cx="8" cy="8" r="3" fill={accent}>
          <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 2 }}>
      <circle cx="8" cy="8" r="7" fill="none" stroke="rgba(10,11,12,0.3)" strokeWidth="1.4" strokeDasharray="2 2" />
    </svg>
  );
}

// ─── CRISP-DM Premium Diagram ───────────────────────────────────────

function CrispDmDiagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const CX = 220;
  const CY = 220;
  const R_OUTER = 175;
  const R_INNER = 95;
  const labels = [
    { n: '01', label: 'Datos', accent: '#0d4ea8', oe: 'OE 1' },
    { n: '02', label: 'SSL', accent: '#8a3f85', oe: 'OE 2' },
    { n: '03', label: 'Eval', accent: '#a68a00', oe: 'OE 3' },
    { n: '04', label: 'Prototipo', accent: '#00543d', oe: 'OE 4' },
  ];

  return (
    <svg viewBox="-40 -40 520 520" style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 560 }}>
      <defs>
        <marker id="cd-arrow-big" markerWidth="14" markerHeight="14" refX="7" refY="7" orient="auto">
          <path d="M0,0 L12,7 L0,14 L3,7 z" fill="rgba(10,11,12,0.55)" />
        </marker>
        <radialGradient id="cd-core">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f3f8" />
        </radialGradient>
        <filter id="cd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* círculos guía concéntricos */}
      <circle cx={CX} cy={CY} r={R_OUTER + 12} fill="none" stroke="rgba(10,11,12,0.06)" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="rgba(10,11,12,0.14)" strokeWidth={1} strokeDasharray="3 5" />
      <circle cx={CX} cy={CY} r={R_INNER + 6} fill="none" stroke="rgba(10,11,12,0.10)" strokeWidth={1} />

      {/* sectores · 4 cuadrantes pintados sutilmente */}
      {labels.map((l, i) => {
        const startDeg = -135 + i * 90;
        const endDeg = startDeg + 90;
        const startRad = toRad(startDeg);
        const endRad = toRad(endDeg);
        const xs1 = CX + R_OUTER * Math.cos(startRad);
        const ys1 = CY + R_OUTER * Math.sin(startRad);
        const xs2 = CX + R_OUTER * Math.cos(endRad);
        const ys2 = CY + R_OUTER * Math.sin(endRad);
        const xi1 = CX + R_INNER * Math.cos(endRad);
        const yi1 = CY + R_INNER * Math.sin(endRad);
        const xi2 = CX + R_INNER * Math.cos(startRad);
        const yi2 = CY + R_INNER * Math.sin(startRad);
        const isActive = active === i;
        return (
          <path
            key={`sector-${i}`}
            d={`M ${xs1.toFixed(2)} ${ys1.toFixed(2)} A ${R_OUTER} ${R_OUTER} 0 0 1 ${xs2.toFixed(2)} ${ys2.toFixed(2)} L ${xi1.toFixed(2)} ${yi1.toFixed(2)} A ${R_INNER} ${R_INNER} 0 0 0 ${xi2.toFixed(2)} ${yi2.toFixed(2)} Z`}
            fill={l.accent}
            fillOpacity={isActive ? 0.16 : 0.05}
            stroke={l.accent}
            strokeOpacity={isActive ? 0.5 : 0.18}
            strokeWidth={isActive ? 1.4 : 1}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            style={{ cursor: 'pointer', transition: 'all 280ms ease-out' }}
          />
        );
      })}

      {/* arcos conectores con flechas (entre nodos) */}
      {[0, 1, 2, 3].map((i) => {
        const startAngle = -90 + i * 90 + 22;
        const endAngle = -90 + (i + 1) * 90 - 22;
        const s = toRad(startAngle);
        const e = toRad(endAngle);
        const r = R_OUTER + 18;
        const x1 = CX + r * Math.cos(s);
        const y1 = CY + r * Math.sin(s);
        const x2 = CX + r * Math.cos(e);
        const y2 = CY + r * Math.sin(e);
        return (
          <path
            key={`arc-${i}`}
            d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
            stroke="rgba(10,11,12,0.55)"
            strokeWidth={1.4}
            fill="none"
            markerEnd="url(#cd-arrow-big)"
          />
        );
      })}

      {/* 4 nodos · top, right, bottom, left */}
      {labels.map((l, i) => {
        const angle = -90 + i * 90;
        const rad = toRad(angle);
        const x = CX + R_OUTER * Math.cos(rad);
        const y = CY + R_OUTER * Math.sin(rad);
        const isActive = active === i;
        const isCurrent = i === 0; // Fase 1 actual
        return (
          <g
            key={l.n}
            onClick={() => onSelect(i)}
            onMouseEnter={() => onSelect(i)}
            style={{ cursor: 'pointer' }}
          >
            {/* halo pulsante en activo */}
            {isActive && (
              <circle cx={x} cy={y} r={56} fill="none" stroke={l.accent} strokeWidth={1.6} opacity={0.4}>
                <animate attributeName="r" values="50;72;50" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.05;0.5" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            {/* fondo glow */}
            {isActive && (
              <circle cx={x} cy={y} r={48} fill={l.accent} opacity={0.18} filter="url(#cd-glow)" />
            )}
            {/* círculo principal */}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 50 : 42}
              fill={isActive ? l.accent : '#ffffff'}
              stroke={l.accent}
              strokeWidth={isActive ? 2.6 : 2}
              style={{ transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
            {/* indicador "actual" (fase 1) — pequeño dot dorado */}
            {isCurrent && (
              <circle cx={x + 30} cy={y - 30} r={6} fill="#fce88b" stroke="#a68a00" strokeWidth={1.2}>
                <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <text
              x={x}
              y={y - 5}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 200,
                fill: isActive ? '#ffffff' : l.accent,
                letterSpacing: '-0.04em',
                pointerEvents: 'none',
                transition: 'fill 280ms',
              }}
            >
              {l.n}
            </text>
            <text
              x={x}
              y={y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                fill: isActive ? 'rgba(255,255,255,0.88)' : 'rgba(10,11,12,0.7)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
              }}
            >
              {l.label}
            </text>
            <text
              x={x}
              y={y + 28}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                fontWeight: 600,
                fill: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(10,11,12,0.5)',
                letterSpacing: '0.18em',
                pointerEvents: 'none',
              }}
            >
              {l.oe}
            </text>
          </g>
        );
      })}

      {/* core central */}
      <circle cx={CX} cy={CY} r={R_INNER} fill="url(#cd-core)" stroke="rgba(10,11,12,0.18)" strokeWidth={1} />
      <text
        x={CX}
        y={CY - 14}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 700,
          fill: '#0a0b0c',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        CRISP-DM
      </text>
      <text
        x={CX}
        y={CY + 8}
        textAnchor="middle"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11.5,
          fill: 'rgba(10,11,12,0.6)',
        }}
      >
        ciclo iterativo
      </text>
      <text
        x={CX}
        y={CY + 26}
        textAnchor="middle"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          fontWeight: 600,
          fill: 'rgba(10,11,12,0.45)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        4 fases · 4 OE
      </text>
    </svg>
  );
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

// ─── Cronograma Timeline ────────────────────────────────────────────

function CronogramaTimeline({
  activeFase,
  setActiveFase,
}: {
  activeFase: number;
  setActiveFase: (i: number) => void;
}) {
  const W = 1200;
  const H = 380;
  const PAD_LEFT = 220;
  const PAD_RIGHT = 32;
  const TRACK_TOP = 60;
  const TRACK_HEIGHT = 60;
  const TRACK_GAP = 16;
  const usableW = W - PAD_LEFT - PAD_RIGHT;
  const monthW = usableW / MESES.length;

  const monthX = (idx: number) => PAD_LEFT + idx * monthW;
  const hoyX = PAD_LEFT + HOY_IDX * monthW;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(10,11,12,0.14)',
        borderRadius: 16,
        padding: 'clamp(18px, 2vw, 28px)',
        boxShadow: '0 12px 32px -20px rgba(10,11,12,0.12)',
        overflowX: 'auto',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', minWidth: 760 }}>
        {/* months header */}
        {MESES.map((m, i) => {
          const x = monthX(i) + monthW / 2;
          const isPast = i + 0.5 < HOY_IDX;
          return (
            <g key={m}>
              <text
                x={x}
                y={32}
                textAnchor="middle"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  fill: isPast ? 'rgba(10,11,12,0.45)' : '#0a0b0c',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {m}
              </text>
              {/* vertical guide */}
              <line
                x1={monthX(i)}
                y1={42}
                x2={monthX(i)}
                y2={H - 30}
                stroke="rgba(10,11,12,0.08)"
                strokeWidth={1}
              />
            </g>
          );
        })}
        {/* última guide */}
        <line
          x1={monthX(MESES.length)}
          y1={42}
          x2={monthX(MESES.length)}
          y2={H - 30}
          stroke="rgba(10,11,12,0.08)"
          strokeWidth={1}
        />

        {/* row labels + barras */}
        {FASES.map((fase, i) => {
          const range = FASE_RANGE[fase.n];
          const x = monthX(range.start) + 4;
          const w = monthW * (range.end - range.start) - 8;
          const y = TRACK_TOP + i * (TRACK_HEIGHT + TRACK_GAP);
          const isActive = activeFase === i;
          const isCurrent = i === 0;

          return (
            <g key={fase.n}>
              {/* label izquierdo */}
              <text
                x={PAD_LEFT - 20}
                y={y + 22}
                textAnchor="end"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  fontWeight: 700,
                  fill: isActive ? fase.accent : 'rgba(10,11,12,0.55)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  transition: 'fill 280ms',
                }}
              >
                FASE {fase.n}
              </text>
              <text
                x={PAD_LEFT - 20}
                y={y + 40}
                textAnchor="end"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12.5,
                  fontWeight: 500,
                  fill: '#0a0b0c',
                  letterSpacing: '-0.005em',
                }}
              >
                {fase.titulo}
              </text>
              <text
                x={PAD_LEFT - 20}
                y={y + 55}
                textAnchor="end"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  fontWeight: 600,
                  fill: 'rgba(10,11,12,0.5)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {fase.oe}
              </text>

              {/* track de fondo */}
              <rect
                x={PAD_LEFT}
                y={y + 12}
                width={usableW}
                height={TRACK_HEIGHT - 24}
                rx={4}
                fill="rgba(10,11,12,0.04)"
              />

              {/* barra de actividad · grupo clickeable */}
              <g
                onClick={() => setActiveFase(i)}
                onMouseEnter={() => setActiveFase(i)}
                style={{ cursor: 'pointer' }}
              >
                <motion.rect
                  x={x}
                  y={y + 12}
                  width={w}
                  height={TRACK_HEIGHT - 24}
                  rx={6}
                  fill={fase.accent}
                  fillOpacity={isCurrent ? 0.92 : 0.18}
                  stroke={fase.accent}
                  strokeWidth={isActive ? 2 : 1}
                  initial={{ width: 0 }}
                  whileInView={{ width: w }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.9, ease: ENTER, delay: 0.15 + i * 0.1 }}
                  style={{ transition: 'stroke-width 220ms, fill-opacity 220ms' }}
                />

                {/* progreso interno · solo en fase actual */}
                {isCurrent && (
                  <motion.rect
                    x={x}
                    y={y + 12}
                    width={w * 0.78}
                    height={TRACK_HEIGHT - 24}
                    rx={6}
                    fill={fase.accent}
                    initial={{ width: 0 }}
                    whileInView={{ width: w * 0.78 }}
                    viewport={{ once: true, margin: '-6%' }}
                    transition={{ duration: 1.1, ease: ENTER, delay: 0.4 + i * 0.1 }}
                  />
                )}

                {/* texto sobre barra */}
                <text
                  x={x + 14}
                  y={y + TRACK_HEIGHT / 2 - 2}
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 700,
                    fill: isCurrent ? '#ffffff' : fase.accent,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                  }}
                >
                  {isCurrent ? 'in progress · 78%' : 'pending'}
                </text>
              </g>
            </g>
          );
        })}

        {/* línea HOY · vertical destacada */}
        <line
          x1={hoyX}
          y1={42}
          x2={hoyX}
          y2={H - 30}
          stroke="#a68a00"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <rect x={hoyX - 26} y={H - 26} width={52} height={20} rx={4} fill="#a68a00" />
        <text
          x={hoyX}
          y={H - 12}
          textAnchor="middle"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            fill: '#ffffff',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          hoy
        </text>

        {/* leyenda */}
        <g transform={`translate(${PAD_LEFT}, ${H - 22})`}>
          <g>
            <rect x={0} y={-8} width={14} height={14} rx={3} fill="#0d4ea8" />
            <text x={22} y={3} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, fill: '#0a0b0c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>en curso</text>
          </g>
          <g transform="translate(120, 0)">
            <rect x={0} y={-8} width={14} height={14} rx={3} fill="#0d4ea8" fillOpacity={0.18} stroke="#0d4ea8" strokeWidth={1} />
            <text x={22} y={3} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, fill: '#0a0b0c', letterSpacing: '0.12em', textTransform: 'uppercase' }}>planificado</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
