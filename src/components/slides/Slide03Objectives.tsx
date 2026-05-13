import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── data ──────────────────────────────────────────────────────────────

const OBJ_GENERAL =
  'Desarrollar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en el contexto del departamento de Santander.';

type Status = 'DONE' | 'ACTIVE' | 'NEXT';

type Objective = {
  n: number;
  title: string;
  description: string;
  status: Status;
  phaseLabel: string;
  deliverableLabel: string;
  bullets: string[];
};

const OBJECTIVES: Objective[] = [
  {
    n: 1,
    title: 'Análisis de datasets',
    description:
      'Analizar conjuntos de datos de imágenes dermatológicas representativos para el contexto clínico de Santander.',
    status: 'DONE',
    phaseLabel: 'F1',
    deliverableLabel:
      'Caracterización de datasets · criterios de inclusión, distribución de clases y esquema de partición.',
    bullets: [
      'HAM10000, BCN20000 y CO2Wounds-V2 caracterizados',
      'Trece figuras analíticas producidas',
      'Siete clases núcleo confirmadas para el SSL',
      'Matriz de cobertura cruzada patología × dataset',
      'Sesgos demográficos y dimensionales documentados',
    ],
  },
  {
    n: 2,
    title: 'Diseño del algoritmo SSL',
    description:
      'Diseñar un algoritmo de detección de lesiones cutáneas basado en aprendizaje autosupervisado.',
    status: 'ACTIVE',
    phaseLabel: 'F2',
    deliverableLabel:
      'Algoritmo SSL configurado y reproducible para detección de lesiones cutáneas.',
    bullets: [
      'Selección de familia SSL (contrastivo · generativo · destilación)',
      'Selección de backbone (ResNet-50 vs EfficientNet vs ViT)',
      'Pipeline de pre-entrenamiento sin etiquetas',
      'Esquema de fine-tuning sobre clases núcleo',
      'Especificación de hiperparámetros y semillas',
    ],
  },
  {
    n: 3,
    title: 'Evaluación de desempeño',
    description:
      'Evaluar el desempeño del algoritmo propuesto mediante métricas reportadas en la literatura científica.',
    status: 'NEXT',
    phaseLabel: 'F3',
    deliverableLabel:
      'Informe comparativo con tablas, matrices de confusión y análisis estadístico vs. estado del arte.',
    bullets: [
      'Métricas core · accuracy, F1 macro, AUC, recall por clase',
      'Matriz de confusión 7 clases',
      'Comparación rigurosa contra baseline supervisado',
      'Análisis de error desagregado por clase y por origen',
      'Test estadístico de significancia entre modelos',
    ],
  },
  {
    n: 4,
    title: 'Prototipo de aplicación',
    description:
      'Implementar un prototipo de aplicación que integre el algoritmo desarrollado para apoyo en el análisis de imágenes.',
    status: 'NEXT',
    phaseLabel: 'F4',
    deliverableLabel:
      'Prototipo funcional documentado con manual de uso, alcance TRL 4.',
    bullets: [
      'Interfaz web para carga de imagen dermatológica',
      'Inferencia local con el modelo entrenado',
      'Visualización de predicción + confianza por clase',
      'Documentación técnica + manual de uso',
      'Trazabilidad · versión del modelo, hash de pesos, fecha',
    ],
  },
];

const INCLUYE = [
  'Diseño, implementación y validación del modelo SSL',
  'Análisis de lesiones de mayor incidencia en Santander',
  'Comparación rigurosa vs. modelo supervisado (misma arquitectura y dataset)',
  'Caracterización formal de los datasets seleccionados',
  'Prototipo funcional con interfaz para cargar imagen y ver predicción',
];

const NO_INCLUYE = [
  'Recolección de datos en instituciones clínicas',
  'Pruebas con pacientes reales',
  'Implementación en entornos hospitalarios',
  'Certificación como herramienta médica',
  'Validación clínica formal',
];

// ── status chip ───────────────────────────────────────────────────────

function StatusChip({ status }: { status: Status }) {
  if (status === 'DONE') {
    return (
      <span className="pill-accent">
        <span className="block w-[6px] h-[6px] rounded-full bg-[var(--color-midnight-ink)]" />
        DONE
      </span>
    );
  }
  if (status === 'ACTIVE') {
    return (
      <span className="pill-ink" style={{ padding: '6px 14px' }}>
        <span className="pulse-dot" />
        <span className="font-mono text-[12px]">ACTIVE</span>
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        background: 'transparent',
        border: '1px solid var(--color-fog-gray)',
        color: 'var(--color-ash-gray)',
        borderRadius: 'var(--radius-pill)',
        padding: '6px 14px',
        fontFamily: 'var(--font-suisseintlmono)',
        fontSize: '12px',
        letterSpacing: '-0.36px',
      }}
    >
      <span
        className="block w-[6px] h-[6px] rounded-full"
        style={{ border: '1px solid var(--color-fog-gray)' }}
      />
      NEXT
    </span>
  );
}

// ── objective card ────────────────────────────────────────────────────

function ObjectiveCard({
  obj,
  isOpen,
  onToggle,
  index,
}: {
  obj: Objective;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      viewport={{ once: true }}
      className="card overflow-hidden"
      style={{ padding: 0 }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`obj-body-${obj.n}`}
        className="w-full text-left flex items-start gap-6"
        style={{ padding: '32px' }}
      >
        <div className="shrink-0 flex flex-col items-start">
          <span
            className="font-display text-[var(--color-midnight-ink)] tabular-nums"
            style={{ fontSize: '64px', lineHeight: 0.88 }}
          >
            {String(obj.n).padStart(2, '0')}
          </span>
        </div>

        <div
          aria-hidden
          className="shrink-0 w-px self-stretch"
          style={{ background: 'rgba(0,0,0,0.08)' }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <span className="eyebrow-up block mb-2">
                OBJ · {String(obj.n).padStart(2, '0')} · {obj.phaseLabel}
              </span>
              <h3
                className="font-suisse text-[var(--color-midnight-ink)]"
                style={{ fontSize: '22px', lineHeight: 1.2, letterSpacing: '-0.42px', fontWeight: 500 }}
              >
                {obj.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StatusChip status={obj.status} />
              <span
                aria-hidden
                className="font-mono text-[20px] select-none"
                style={{
                  color: 'var(--color-ash-gray)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                +
              </span>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`obj-body-${obj.n}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 32px 32px 32px' }}>
              <div
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  paddingTop: 24,
                }}
              >
                <p
                  className="font-suisse text-[var(--color-midnight-ink)]"
                  style={{ fontSize: '18px', lineHeight: 1.55, letterSpacing: '-0.42px', maxWidth: '60ch' }}
                >
                  {obj.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  paddingTop: 20,
                  marginTop: 24,
                }}
              >
                <span className="eyebrow-up block mb-3">── ENTREGABLE</span>
                <p
                  className="font-suisse text-[var(--color-ash-gray)]"
                  style={{ fontSize: '15px', lineHeight: 1.55, letterSpacing: '-0.42px', marginBottom: 16, maxWidth: '60ch' }}
                >
                  {obj.deliverableLabel}
                </p>

                <ul className="space-y-2">
                  {obj.bullets.map((b, i) => (
                    <li
                      key={b}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="font-mono shrink-0 tabular-nums"
                        style={{
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          color: 'var(--color-fog-gray)',
                          paddingTop: 4,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-suisse text-[var(--color-midnight-ink)]"
                        style={{ fontSize: '15px', lineHeight: 1.5, letterSpacing: '-0.42px' }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  paddingTop: 20,
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <span className="eyebrow-up">── FASE CRISP-DM</span>
                <span
                  className="font-display text-[var(--color-midnight-ink)] tabular-nums"
                  style={{ fontSize: '32px', lineHeight: 0.88 }}
                >
                  {obj.phaseLabel}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── slide ─────────────────────────────────────────────────────────────

export default function Slide03Objectives() {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([2]));

  const toggle = (n: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const completed = OBJECTIVES.filter((o) => o.status === 'DONE').length;
  const total = OBJECTIVES.length;
  const progressPct = (completed / total) * 100;

  return (
    <div
      className="slide relative w-full overflow-hidden"
      style={{ background: 'var(--color-canvas-ice)', minHeight: '100dvh' }}
    >
      <div className="slide-narrow relative">
        {/* ── header ───────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-6 flex-wrap">
          <span className="eyebrow-up">03 · OBJETIVOS DEL PROYECTO</span>
          <div className="flex items-center gap-4">
            <span
              className="font-mono tabular-nums"
              style={{ fontSize: '12px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
            >
              {completed} / {total} COMPLETADO
            </span>
            <div
              className="relative overflow-hidden"
              style={{
                width: 200,
                height: 6,
                background: 'rgba(0,0,0,0.06)',
                borderRadius: 999,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                viewport={{ once: true }}
                className="h-full"
                style={{ background: 'var(--color-midnight-ink)', borderRadius: 999 }}
              />
            </div>
          </div>
        </header>

        {/* ── headline ─────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="font-display"
          style={{
            marginTop: 56,
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.92,
            color: 'var(--color-midnight-ink)',
            maxWidth: '20ch',
          }}
        >
          Cuatro objetivos específicos.
          <br />
          Una ruta verificable.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="font-suisse"
          style={{
            marginTop: 24,
            fontSize: 'clamp(20px, 1.8vw, 24px)',
            lineHeight: 1.45,
            letterSpacing: '-0.42px',
            color: 'var(--color-ash-gray)',
            maxWidth: '65ch',
          }}
        >
          Cada objetivo entrega un artefacto verificable y mapea a una fase
          CRISP-DM concreta del cronograma académico.
        </motion.p>

        {/* ── OBJETIVO GENERAL · hero-top card ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          viewport={{ once: true }}
          className="card-hero-top relative"
          style={{ marginTop: 64 }}
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-6">
            <span
              className="eyebrow-up"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              OBJETIVO GENERAL · MASTER SCOPE
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em' }}
            >
              UNAB · ING SISTEMAS · 2026
            </span>
          </div>

          <p
            className="font-suisse"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.2,
              letterSpacing: '-0.72px',
              color: 'var(--color-paper-white)',
              fontWeight: 400,
              maxWidth: '38ch',
            }}
          >
            {OBJ_GENERAL}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 32,
            }}
          >
            <span className="pill-accent">
              <span className="font-mono">F1 · F2 · F3 · F4</span>
            </span>
          </div>
        </motion.div>

        {/* ── OBJETIVOS · grid 2x2 bento expandible ───────────── */}
        <div style={{ marginTop: 64 }}>
          <div
            className="flex items-baseline justify-between gap-3 flex-wrap"
            style={{ paddingBottom: 16, marginBottom: 24 }}
          >
            <span className="eyebrow-up">OBJETIVOS ESPECÍFICOS · OE-01 → OE-04</span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
            >
              01 DONE · 01 ACTIVE · 02 NEXT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {OBJECTIVES.map((obj, i) => (
              <ObjectiveCard
                key={obj.n}
                obj={obj}
                index={i}
                isOpen={openIds.has(obj.n)}
                onToggle={() => toggle(obj.n)}
              />
            ))}
          </div>
        </div>

        {/* ── STRIP ALCANCE ────────────────────────────────────── */}
        <div style={{ marginTop: 80 }}>
          <div
            className="flex items-baseline justify-between gap-3 flex-wrap"
            style={{ paddingBottom: 16, marginBottom: 24 }}
          >
            <span className="eyebrow-up">ALCANCE · SCOPE</span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
            >
              5 IN · 5 OUT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* INCLUYE — card paper */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              viewport={{ once: true }}
              className="card hover-reveal"
            >
              <div className="flex items-baseline justify-between gap-3 mb-6">
                <span className="eyebrow-up">INCLUYE · 05</span>
                <span
                  className="font-display tabular-nums"
                  style={{ fontSize: '32px', lineHeight: 0.88, color: 'var(--color-midnight-ink)' }}
                >
                  +05
                </span>
              </div>

              <ul className="space-y-4">
                {INCLUYE.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.04, ease: EASE }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="font-mono tabular-nums shrink-0"
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-fog-gray)',
                        paddingTop: 4,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-suisse text-[var(--color-midnight-ink)]"
                      style={{ fontSize: '17px', lineHeight: 1.5, letterSpacing: '-0.42px' }}
                    >
                      {it}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* NO INCLUYE — card solid ink */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              viewport={{ once: true }}
              className="card-solid"
            >
              <div className="flex items-baseline justify-between gap-3 mb-6">
                <span
                  className="eyebrow-up"
                  style={{ color: 'var(--color-fog-gray)' }}
                >
                  NO INCLUYE · 05
                </span>
                <span
                  className="font-display tabular-nums"
                  style={{ fontSize: '32px', lineHeight: 0.88, color: 'var(--color-paper-white)' }}
                >
                  −05
                </span>
              </div>

              <ul className="space-y-4">
                {NO_INCLUYE.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.04, ease: EASE }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="font-mono shrink-0"
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-fog-gray)',
                        paddingTop: 4,
                        letterSpacing: '0.06em',
                      }}
                    >
                      ─
                    </span>
                    <span
                      className="font-suisse"
                      style={{
                        fontSize: '17px',
                        lineHeight: 1.5,
                        letterSpacing: '-0.42px',
                        color: 'var(--color-paper-white)',
                        textDecoration: 'line-through',
                        textDecorationColor: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {it}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="kbd">Click</span>
            <span className="eyebrow-up">expandir objetivos</span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
          >
            04 / 09 · UNAB · INGENIERÍA DE SISTEMAS
          </span>
        </footer>
      </div>
    </div>
  );
}
