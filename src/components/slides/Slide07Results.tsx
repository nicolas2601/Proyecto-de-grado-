import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { trlLevels, risks } from '@/data/eda';
import {
  Cpu,
  BarChart3,
  Server,
  Eye,
  Database,
  GitBranch,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import ScrollReveal from '@/components/reactbits/ScrollReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── TRL · labels textbook (verbatim de PG)
const TRL_LABELS = [
  'Principios básicos observados',
  'Concepto tecnológico formulado',
  'Prueba experimental de concepto',
  'Prototipo validado en laboratorio',
  'Prototipo validado en entorno relevante',
  'Sistema demostrado en entorno relevante',
  'Sistema demostrado en entorno operacional',
  'Sistema completo y calificado',
  'Sistema operando en entorno real',
];

const TRL_DETAIL = [
  'Observación de fenómenos físicos y reportes iniciales que sustentan la idea. La revisión epidemiológica de Santander cubrió este nivel.',
  'Concepto tecnológico formulado en términos de objetivos, hipótesis y aplicación clínica concreta. Anteproyecto sustenta esta formulación.',
  'Prueba experimental de los principios: EDA cruzado HAM10000 + BCN20000 + CO2Wounds-V2 con 13 figuras y métricas reproducibles.',
  'Prototipo SSL entrenado + evaluado + integrado en una app funcional validada en laboratorio. Este es el TRL que comprometemos para PG II.',
  'Si el prototipo recibe feedback de profesionales en entorno simulado clínico, escalamos a TRL 5 · meta extendida.',
  'Sistema demostrado en entorno relevante con datos del Hospital Internacional. Pertenece a un proyecto siguiente.',
  'Sistema demostrado en operación real con flujo asistencial. Fuera del alcance de Proyecto de Grado.',
  'Sistema completo, calificado y certificado para uso clínico · requiere INVIMA / certificación regulatoria.',
  'Sistema en producción dentro de un servicio dermatológico real con seguimiento longitudinal.',
];

// ── Entregables firmes (1 por objetivo)
const DELIVERABLES = [
  {
    n: 1,
    title: 'Caracterización formal de los datasets',
    detail: 'HAM10000 + BCN20000 + CO2Wounds-V2 · 13 figuras · entropía / Gini / cobertura',
    phase: 'F1',
  },
  {
    n: 2,
    title: 'Algoritmo SSL entrenado',
    detail: 'Backbone + estrategia contrastiva · pesos exportables · reproducible',
    phase: 'F2',
  },
  {
    n: 3,
    title: 'Evaluación vs línea base supervisada',
    detail: 'Accuracy · F1 macro · AUC · matriz confusión · análisis desagregado',
    phase: 'F3',
  },
  {
    n: 4,
    title: 'Prototipo funcional con manual de uso',
    detail: 'Webapp Streamlit · carga imagen → predicción + Grad-CAM · manual incluido',
    phase: 'F4',
  },
];

// ── Risk metadata enriquecida
type Severity = 'ALTO' | 'MEDIO' | 'BAJO';
type RiskMeta = {
  id: string;
  name: string;
  severity: Severity;
  phaseLabel: string; // F1 / F2 / F3 / F4 / TRANSV
  returnArrow: string; // 'F3 → F2' etc.
  plan: string;
  icon: LucideIcon;
};

const RISK_META: RiskMeta[] = [
  {
    id: 'R1',
    name: 'Desempeño insuficiente del modelo SSL',
    severity: 'ALTO',
    phaseLabel: 'F3',
    returnArrow: 'F3 → F2',
    plan: 'Explorar arquitecturas SSL alternativas; modificar estrategia de aumentación; ajustar curriculum de entrenamiento.',
    icon: Cpu,
  },
  {
    id: 'R2',
    name: 'Desbalance severo de clases en el dataset',
    severity: 'ALTO',
    phaseLabel: 'F2',
    returnArrow: 'F2',
    plan: 'SMOTE o pesos por clase en la función de pérdida; pondera focal loss; rebalancea batches por sampler estratificado.',
    icon: BarChart3,
  },
  {
    id: 'R3',
    name: 'Limitaciones de cómputo (memoria / GPU)',
    severity: 'MEDIO',
    phaseLabel: 'F2',
    returnArrow: 'F2',
    plan: 'Adoptar arquitecturas más ligeras como backbone (EfficientNet / MobileNet), priorizando viabilidad sobre tamaño.',
    icon: Server,
  },
  {
    id: 'R4',
    name: 'Sesgo de fototipos IV-V en datasets públicos',
    severity: 'MEDIO',
    phaseLabel: 'TRANSV',
    returnArrow: 'TRANSV',
    plan: 'Documentar como limitación; reportar desempeño desagregado por fototipo; proponer trabajo futuro con datos regionales de Santander.',
    icon: Eye,
  },
  {
    id: 'R5',
    name: 'Cobertura de clases vs perfil epidemiológico regional',
    severity: 'MEDIO',
    phaseLabel: 'F1',
    returnArrow: 'F1',
    plan: 'Combinar varios datasets compatibles; ajustar criterios de inclusión; priorizar las 4 patologías críticas de Santander.',
    icon: Database,
  },
  {
    id: 'R6',
    name: 'Pérdida de trazabilidad de experimentos',
    severity: 'MEDIO',
    phaseLabel: 'TRANSV',
    returnArrow: 'TRANSV',
    plan: 'Registrar en plataforma de seguimiento (MLflow / WandB); versionar código y datasets con Git + DVC.',
    icon: GitBranch,
  },
  {
    id: 'R7',
    name: 'Discrepancia laboratorio vs prototipo',
    severity: 'MEDIO',
    phaseLabel: 'F4',
    returnArrow: 'F4 → F3',
    plan: 'Pruebas funcionales con imágenes externas; alinear pipeline de preprocesamiento entre training y inference.',
    icon: Layers,
  },
];

// ── Map data file → display status
function trlStatus(level: number): 'done' | 'target' | 'stretch' | 'future' {
  const t = trlLevels.find((x) => x.level === level);
  if (level <= 3) return 'done';
  if (t?.target) return 'target';
  if (t?.stretch) return 'stretch';
  return 'future';
}

export default function Slide07Results() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  function toggleFlip(id: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div ref={ref} className="slide relative w-full overflow-hidden bg-canvas-white">
      <div className="slide-narrow relative">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <span className="eyebrow">07 · ENTREGABLES + CONTINGENCIA</span>
          <span className="flex-1 h-px" style={{ background: '#292929' }} />
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            7 RIESGOS · 4 ENTREGABLES
          </span>
        </div>

        {/* ── Headline ───────────────────────────────────────────────── */}
        <h2
          className="mt-10 font-nh font-light text-ink-black"
          style={{
            fontSize: 'clamp(44px, 5.4vw, 72px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            maxWidth: '24ch',
          }}
        >
          <SplitText
            text="Cuatro entregables firmes."
            as="span"
            trigger="scroll"
            stagger={0.014}
          />
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 200 }}>
            <SplitText
              text="Siete frentes con plan B sobre la mesa."
              as="span"
              trigger="scroll"
              stagger={0.014}
              delay={0.32}
            />
          </span>
        </h2>

        <ScrollReveal delay={0.35} direction="up" distance={12}>
          <p
            className="mt-6 font-nh font-light text-ink-black"
            style={{ fontSize: 22, lineHeight: 1.4, maxWidth: '60ch' }}
          >
            Cada riesgo tiene un punto de retorno CRISP-DM ya documentado en el anteproyecto.
          </p>
        </ScrollReveal>

        {/* ── Body grid ─────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ── LEFT · TRL ladder + entregables (5/12) ───────────── */}
          <div className="lg:col-span-5 space-y-10">
            {/* ── TRL ladder ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
              style={{ border: '1px solid #292929' }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ padding: '14px 18px', borderBottom: '1px solid #292929' }}
              >
                <span className="eyebrow">── TRL · MADUREZ TECNOLÓGICA</span>
                <span
                  className="font-condensed text-ink-black"
                  style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  9 NIVELES
                </span>
              </div>

              <div>
                {TRL_LABELS.map((label, idx) => {
                  const level = idx + 1;
                  const status = trlStatus(level);
                  const isTarget = status === 'target';
                  const isStretch = status === 'stretch';
                  const isDone = status === 'done';
                  const isFuture = status === 'future';
                  const opacity = isFuture ? 0.46 : 1;

                  const statusLabel =
                    status === 'target'
                      ? 'TARGET'
                      : status === 'stretch'
                      ? 'STRETCH'
                      : status === 'done'
                      ? 'DONE'
                      : '──';

                  // Row border logic · target is band-wrapped with 2px ink rules
                  const borderTop = isTarget
                    ? '2px solid #292929'
                    : level === 1
                    ? '1px solid #e6e6e6'
                    : '1px solid #e6e6e6';
                  const borderBottom = isTarget ? '2px solid #292929' : 'none';

                  return (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity, x: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.4, ease: EASE }}
                      viewport={{ once: true }}
                      className="hover-reveal"
                      style={{
                        borderTop,
                        borderBottom,
                        background: isTarget ? '#f4f4f4' : 'transparent',
                        cursor: 'default',
                      }}
                    >
                      <div
                        className="grid items-center"
                        style={{
                          gridTemplateColumns: '56px 1px 1fr auto',
                          gap: 14,
                          padding: '12px 18px',
                        }}
                      >
                        <span
                          className="font-display text-ink-black leading-none tabular-nums"
                          style={{ fontSize: 32, letterSpacing: 0 }}
                        >
                          {String(level).padStart(2, '0')}
                        </span>
                        <span style={{ width: 1, height: 26, background: '#292929' }} />
                        <span
                          className="font-condensed text-ink-black"
                          style={{
                            fontSize: 14,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                          }}
                        >
                          {label}
                        </span>
                        <span
                          className="font-condensed whitespace-nowrap"
                          style={{
                            border:
                              isTarget
                                ? '1px solid #292929'
                                : isStretch
                                ? '1px dashed #292929'
                                : isDone
                                ? '1px solid #292929'
                                : 'none',
                            background: isTarget ? '#292929' : 'transparent',
                            color: isTarget
                              ? '#ffffff'
                              : isStretch
                              ? '#292929'
                              : isDone
                              ? '#292929'
                              : '#b4b8b4',
                            padding: isTarget || isStretch || isDone ? '4px 10px' : '4px 0',
                            fontSize: 10,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            minWidth: 76,
                            textAlign: 'center',
                          }}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      <div
                        data-reveal
                        style={{
                          padding: '0 18px 14px 88px',
                          maxWidth: '50ch',
                        }}
                      >
                        <p
                          className="font-nh text-ink-black"
                          style={{ fontSize: 14, lineHeight: 1.5 }}
                        >
                          {TRL_DETAIL[idx]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Entregables · 4 numbered ─────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="eyebrow">── ENTREGABLES · 4</span>
                <span className="flex-1 h-px" style={{ background: '#292929' }} />
                <span
                  className="font-condensed text-ink-black"
                  style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  UNO POR OBJETIVO
                </span>
              </div>

              <ul>
                {DELIVERABLES.map((d, i) => (
                  <motion.li
                    key={d.n}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                    viewport={{ once: true }}
                    style={{
                      padding: '18px 0',
                      borderTop: i === 0 ? '1px solid #292929' : '1px solid #e6e6e6',
                      borderBottom: i === DELIVERABLES.length - 1 ? '1px solid #292929' : 'none',
                    }}
                  >
                    <div
                      className="grid items-start"
                      style={{ gridTemplateColumns: '80px 1px 1fr auto', gap: 16 }}
                    >
                      <span
                        className="font-display text-ink-black leading-none tabular-nums"
                        style={{ fontSize: 64, letterSpacing: 0 }}
                      >
                        {String(d.n).padStart(2, '0')}
                      </span>
                      <span style={{ width: 1, height: 56, background: '#292929' }} />
                      <div>
                        <p
                          className="font-nh text-ink-black"
                          style={{ fontSize: 18, lineHeight: 1.3, fontWeight: 500 }}
                        >
                          {d.title}
                        </p>
                        <p
                          className="mt-2 font-nh text-ink-black"
                          style={{ fontSize: 14, lineHeight: 1.45, opacity: 0.78 }}
                        >
                          {d.detail}
                        </p>
                      </div>
                      <span
                        className="font-mono text-ink-black"
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          border: '1px solid #292929',
                          padding: '3px 8px',
                          alignSelf: 'start',
                        }}
                      >
                        {d.phase}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── RIGHT · Risk flip grid (7/12) ───────────────────── */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="eyebrow">── 7 FRENTES CON PLAN B</span>
              <span className="flex-1 h-px" style={{ background: '#292929' }} />
              <span
                className="font-condensed text-ink-black"
                style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                HOVER PARA VER PLAN
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RISK_META.map((r, i) => {
                const Icon = r.icon;
                const isHigh = r.severity === 'ALTO';
                const isMedium = r.severity === 'MEDIO';
                const isLast = i === RISK_META.length - 1;
                const isFlipped = flipped.has(r.id);

                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.45, ease: EASE }}
                    viewport={{ once: true }}
                    className={`flip-3d ${isFlipped ? 'is-flipped' : ''}`}
                    style={{
                      gridColumn: isLast ? '1 / -1' : 'auto',
                      minHeight: 220,
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleFlip(r.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFlip(r.id);
                      }
                    }}
                    aria-pressed={isFlipped}
                    aria-label={`Riesgo ${r.id}: ${r.name}. Click para ver plan de contingencia.`}
                  >
                    <div className="flip-3d-inner" style={{ minHeight: 220 }}>
                      {/* ── FRONT ─────────────────────────── */}
                      <article
                        className="flip-3d-front overflow-hidden"
                        style={{ padding: 18 }}
                      >
                        <Icon
                          size={64}
                          strokeWidth={1}
                          className="absolute pointer-events-none text-ink-black"
                          style={{
                            opacity: 0.08,
                            bottom: 14,
                            right: 14,
                          }}
                        />

                        <div className="relative flex items-start justify-between gap-2">
                          <span
                            className="font-display text-ink-black leading-none"
                            style={{ fontSize: 32, letterSpacing: 0 }}
                          >
                            {r.id}
                          </span>
                          <span
                            className="font-condensed whitespace-nowrap"
                            style={{
                              border: isHigh
                                ? '1px solid #292929'
                                : isMedium
                                ? '1px solid #292929'
                                : '1px dashed #b4b8b4',
                              background: isHigh ? '#292929' : 'transparent',
                              color: isHigh ? '#ffffff' : isMedium ? '#292929' : '#646464',
                              padding: '3px 9px',
                              fontSize: 11,
                              letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {r.severity}
                          </span>
                        </div>

                        <h4
                          className="relative mt-4 font-nh font-medium text-ink-black"
                          style={{ fontSize: 18, lineHeight: 1.25, maxWidth: '26ch' }}
                        >
                          {r.name}
                        </h4>

                        <div
                          className="relative mt-5 h-px w-full"
                          style={{ background: '#292929' }}
                        />

                        <div className="relative mt-4 flex items-center gap-2">
                          <span
                            className="font-condensed text-ink-black"
                            style={{
                              border: '1px solid #292929',
                              padding: '3px 9px',
                              fontSize: 11,
                              letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {r.phaseLabel}
                          </span>
                          <span
                            className="font-condensed text-ink-black"
                            style={{
                              fontSize: 10,
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              opacity: 0.55,
                            }}
                          >
                            Fase de retorno CRISP-DM
                          </span>
                        </div>
                      </article>

                      {/* ── BACK ─────────────────────────── */}
                      <article
                        className="flip-3d-back overflow-hidden"
                        style={{ padding: 18 }}
                      >
                        <span
                          className="font-condensed"
                          style={{
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                          }}
                        >
                          ── PLAN DE CONTINGENCIA
                        </span>
                        <p
                          className="mt-3 font-nh"
                          style={{
                            fontSize: 16,
                            lineHeight: 1.4,
                            color: '#ffffff',
                            maxWidth: '34ch',
                          }}
                        >
                          {r.plan}
                        </p>
                        <div
                          className="mt-5 h-px w-full"
                          style={{ background: '#b4b8b4', opacity: 0.5 }}
                        />
                        <span
                          className="mt-4 block font-condensed"
                          style={{
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#b4b8b4',
                          }}
                        >
                          ── RETORNO CRISP-DM
                        </span>
                        <p
                          className="mt-2 font-display tabular-nums"
                          style={{
                            fontSize: 32,
                            letterSpacing: 0,
                            color: '#ffffff',
                            lineHeight: 1,
                          }}
                        >
                          {r.returnArrow}
                        </p>
                      </article>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Commitment band ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          viewport={{ once: true }}
          className="mt-16 card-dark"
          style={{ padding: 0, border: 'none' }}
        >
          <div
            style={{
              padding: 'clamp(22px, 3vw, 32px) clamp(28px, 4vw, 44px)',
              borderBottom: '1px solid #ffffff',
            }}
          >
            <span
              className="font-condensed"
              style={{
                fontSize: 13,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              ── COMPROMISO PÚBLICO
            </span>
            <p
              className="mt-4 font-nh font-light italic"
              style={{
                fontSize: 24,
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                maxWidth: '52ch',
              }}
            >
              Cada retroceso CRISP-DM está documentado en el anteproyecto. No hay improvisación.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '09', label: 'SEMANAS COMPLETADAS' },
              { value: '32', label: 'SEMANAS TOTALES' },
              { value: 'TRL 4', label: 'OBJETIVO' },
              { value: 'TRL 5', label: 'STRETCH' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: 'clamp(20px, 2.8vw, 30px) clamp(24px, 3.4vw, 36px)',
                  borderLeft: i === 0 ? 'none' : '1px solid #ffffff',
                }}
              >
                <div
                  className="font-display tabular-nums"
                  style={{
                    fontSize: 56,
                    letterSpacing: 0,
                    color: '#ffffff',
                    lineHeight: 0.92,
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-3 font-condensed"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer hints ──────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="kbd">Hover</span>
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            voltear riesgo
          </span>
          <span style={{ width: 18 }} />
          <span className="kbd">Click</span>
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            expandir TRL
          </span>
          {reduced && (
            <span
              className="ml-auto font-condensed text-ink-black"
              style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55 }}
            >
              reduced-motion · estado estático
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
