import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

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
  phaseLabel: string; // F1 / F2 / F3 / F4
  deliverableLabel: string;
  bullets: string[];
};

const OBJECTIVES: Objective[] = [
  {
    n: 1,
    title: 'Analizar conjuntos de datos dermatológicos',
    description:
      'Analizar conjuntos de datos de imágenes dermatológicas representativos para el contexto clínico de Santander.',
    status: 'DONE',
    phaseLabel: 'F1',
    deliverableLabel: 'Caracterización del dataset · criterios de inclusión, distribución de clases, esquema de partición.',
    bullets: [
      'HAM10000 + BCN20000 + CO2Wounds-V2 caracterizados',
      '13 figuras analíticas producidas',
      'Siete clases núcleo confirmadas para el SSL',
      'Matriz de cobertura cruzada patología × dataset',
      'Sesgos demográficos y dimensionales documentados',
    ],
  },
  {
    n: 2,
    title: 'Diseñar el algoritmo SSL',
    description:
      'Diseñar un algoritmo de detección de lesiones cutáneas basado en aprendizaje autosupervisado.',
    status: 'ACTIVE',
    phaseLabel: 'F2',
    deliverableLabel: 'Algoritmo SSL configurado y reproducible para detección de lesiones cutáneas.',
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
    title: 'Evaluar el desempeño',
    description:
      'Evaluar el desempeño del algoritmo propuesto mediante métricas reportadas en la literatura científica.',
    status: 'NEXT',
    phaseLabel: 'F3',
    deliverableLabel: 'Informe comparativo con tablas, matrices de confusión y análisis estadístico vs. estado del arte.',
    bullets: [
      'Métricas core: accuracy · F1 macro · AUC · recall por clase',
      'Matriz de confusión 7 clases',
      'Comparación rigurosa contra baseline supervisado (misma arquitectura y dataset)',
      'Análisis de error desagregado por clase y por origen',
      'Test estadístico de significancia entre modelos',
    ],
  },
  {
    n: 4,
    title: 'Implementar prototipo de aplicación',
    description:
      'Implementar un prototipo de aplicación que integre el algoritmo desarrollado para apoyo en el análisis de imágenes.',
    status: 'NEXT',
    phaseLabel: 'F4',
    deliverableLabel: 'Prototipo funcional documentado con manual de uso, alcance TRL 4.',
    bullets: [
      'Interfaz web para carga de imagen dermatológica',
      'Inferencia local con el modelo entrenado',
      'Visualización de predicción + confianza por clase',
      'Documentación técnica + manual de uso',
      'Trazabilidad: versión del modelo, hash de pesos, fecha',
    ],
  },
];

const INCLUYE = [
  'Diseño, implementación y validación del modelo SSL',
  'Análisis de lesiones de mayor incidencia en Santander',
  'Comparación rigurosa vs. modelo supervisado convencional (misma arquitectura y dataset)',
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
      <span className="inline-flex items-center gap-2 bg-ink-black text-canvas-white px-3 h-[26px] font-condensed text-[12px] tracking-[0.2em] uppercase">
        <span className="block w-[6px] h-[6px] bg-canvas-white" />
        DONE
      </span>
    );
  }
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-2 border border-ink-black px-3 h-[26px] font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
        <span className="pulse-dot" />
        ACTIVE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3 h-[26px] font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500"
      style={{ border: '1px dashed var(--color-grey-300)' }}>
      <span className="block w-[6px] h-[6px] border border-grey-300" />
      NEXT
    </span>
  );
}

// ── card ──────────────────────────────────────────────────────────────

function ObjectiveCard({ obj, isOpen, onToggle, index }: { obj: Objective; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      viewport={{ once: true }}
      className="border border-ink-black bg-canvas-white"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`obj-body-${obj.n}`}
        className="w-full text-left px-5 py-5 flex items-start gap-5 hover:bg-grey-50 transition-colors"
      >
        {/* number */}
        <div className="shrink-0 flex flex-col">
          <span className="font-display text-[64px] leading-[0.85] text-ink-black tabular-nums">
            {String(obj.n).padStart(2, '0')}
          </span>
          <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-grey-500 uppercase">
            OBJ · {obj.phaseLabel}
          </span>
        </div>

        {/* title + status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="font-condensed text-[16px] tracking-[0.1em] uppercase text-ink-black">
              {obj.title}
            </span>
            <StatusChip status={obj.status} />
          </div>
          <p className="mt-2 font-nh font-light text-[15px] leading-[1.4] text-grey-500">
            {obj.description}
          </p>
        </div>

        {/* chevron */}
        <span aria-hidden className="shrink-0 font-mono text-[16px] text-ink-black mt-1 select-none">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`obj-body-${obj.n}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-ink-black px-5 py-5">
              <p className="font-nh font-light text-[18px] leading-[1.55] text-ink-black">
                {obj.description}
              </p>

              <div className="mt-5 border-t border-ink-black pt-4">
                <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
                  ── ENTREGABLE
                </span>
                <p className="mt-2 font-nh text-[16px] leading-[1.5] text-ink-black">
                  {obj.deliverableLabel}
                </p>

                <ul className="mt-4 space-y-2">
                  {obj.bullets.map((b, i) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 font-nh text-[16px] leading-[1.5] text-ink-black"
                    >
                      <span className="font-mono text-[12px] text-grey-500 shrink-0 mt-[5px] tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-ink-black pt-4 flex items-baseline justify-between">
                <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-ink-black">
                  ── FASE CRISP-DM
                </span>
                <span className="font-display text-[32px] leading-none text-ink-black tabular-nums">
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
  const ref = useRef<HTMLDivElement>(null);
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([2])); // ACTIVE abierto por default

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
    <div ref={ref} className="slide relative w-full overflow-hidden bg-canvas-white">
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />

      <div className="slide-narrow relative">
        {/* ── header ─────────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between border-b border-ink-black pb-3 gap-6 flex-wrap">
          <span className="eyebrow">03 · OBJETIVOS</span>
          <div className="flex items-center gap-3">
            <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black tabular-nums">
              {completed} / {total} COMPLETADO
            </span>
            <div className="relative h-[6px] w-[200px] border border-ink-black bg-canvas-white overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full bg-ink-black"
              />
            </div>
          </div>
        </div>

        {/* ── headline ──────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 font-nh font-light text-[clamp(34px,4.4vw,52px)] leading-[1.08] tracking-[-0.02em] text-ink-black max-w-4xl"
        >
          Cuatro objetivos específicos.<br />
          Una ruta verificable hacia un algoritmo SSL para dermatología.
        </motion.h2>

        {/* ── OBJETIVO GENERAL ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="mt-12 card-dark"
          style={{ padding: '28px 28px' }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-canvas-white">
              ── OBJETIVO GENERAL
            </span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-grey-300">
              OG · MASTER SCOPE
            </span>
          </div>
          <p className="mt-5 font-nh font-light text-[clamp(28px,2.6vw,42px)] leading-[1.18] tracking-[-0.01em] text-canvas-white">
            {OBJ_GENERAL}
          </p>
        </motion.div>

        {/* ── OBJETIVOS ESPECÍFICOS · grid 2x2 expandible ─────── */}
        <div className="mt-14">
          <div className="flex items-baseline justify-between border-b border-ink-black pb-3 mb-8 gap-3 flex-wrap">
            <span className="eyebrow">OBJETIVOS ESPECÍFICOS · OE-01 → OE-04</span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500 uppercase">
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

        {/* ── STRIP ALCANCE ──────────────────────────────────────── */}
        <div className="mt-14">
          <div className="flex items-baseline justify-between border-b border-ink-black pb-3 mb-6">
            <span className="eyebrow">ALCANCE · SCOPE</span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500">
              5 IN · 5 OUT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-ink-black">
            {/* INCLUYE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
              className="bg-canvas-white p-7"
            >
              <div className="flex items-baseline justify-between border-b border-ink-black pb-2 mb-4">
                <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
                  ── INCLUYE
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500">+05</span>
              </div>
              <ul className="space-y-3">
                {INCLUYE.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.04, ease: EASE }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 font-nh text-[18px] leading-[1.5] text-ink-black"
                  >
                    <span className="font-mono text-[13px] text-grey-500 shrink-0 mt-[6px] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{it}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* NO INCLUYE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              viewport={{ once: true }}
              className="card-dark p-7 border-l border-ink-black"
              style={{ padding: '28px' }}
            >
              <div className="flex items-baseline justify-between border-b border-canvas-white/30 pb-2 mb-4">
                <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-canvas-white">
                  ── NO INCLUYE
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-grey-300">−05</span>
              </div>
              <ul className="space-y-3">
                {NO_INCLUYE.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.04, ease: EASE }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 font-nh text-[18px] leading-[1.5] text-canvas-white"
                  >
                    <span className="font-mono text-[13px] text-grey-300 shrink-0 mt-[6px] tabular-nums">
                      ─
                    </span>
                    <span className="line-through decoration-canvas-white/40">{it}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER keyboard hint ─────────────────────────────── */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-3 border-t border-grey-100 pt-4">
          <div className="flex items-center gap-3">
            <span className="kbd">Click</span>
            <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
              EXPANDIR OBJETIVOS
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500 uppercase">
            04 / 09 · UNAB · INGENIERÍA DE SISTEMAS
          </span>
        </div>
      </div>
    </div>
  );
}
