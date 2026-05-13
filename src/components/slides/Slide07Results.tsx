import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { trlLevels } from '@/data/eda';
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

// ─────────────────────────────────────────────────────────────────────
// TRL · labels textbook + detail
// ─────────────────────────────────────────────────────────────────────
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
  'Observación de fenómenos físicos y reportes iniciales. La revisión epidemiológica de Santander cubrió este nivel.',
  'Concepto tecnológico formulado: hipótesis y aplicación clínica concreta documentadas en el anteproyecto.',
  'Prueba experimental de principios: EDA cruzado HAM + BCN + CO2W con 13 figuras y métricas reproducibles.',
  'Prototipo SSL entrenado + evaluado + integrado en app funcional validada en laboratorio. Objetivo PG II.',
  'Si el prototipo recibe feedback de profesionales en entorno simulado, escalamos a TRL 5 — meta extendida.',
  'Sistema demostrado en entorno relevante con datos del Hospital Internacional. Proyecto siguiente.',
  'Sistema demostrado en operación real con flujo asistencial. Fuera del alcance de Proyecto de Grado.',
  'Sistema completo, calificado y certificado para uso clínico — requiere INVIMA / certificación.',
  'Sistema en producción dentro de un servicio dermatológico real con seguimiento longitudinal.',
];

// ─────────────────────────────────────────────────────────────────────
// ENTREGABLES · 4 por objetivo
// ─────────────────────────────────────────────────────────────────────
const DELIVERABLES = [
  {
    n: 1,
    title: 'Caracterización formal de datasets',
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
    detail: 'Accuracy · F1 macro · AUC · matriz de confusión · análisis desagregado',
    phase: 'F3',
  },
  {
    n: 4,
    title: 'Prototipo funcional con manual',
    detail: 'Webapp Streamlit · carga imagen → predicción + Grad-CAM · manual incluido',
    phase: 'F4',
  },
];

// ─────────────────────────────────────────────────────────────────────
// RIESGOS
// ─────────────────────────────────────────────────────────────────────
type Severity = 'ALTO' | 'MEDIO' | 'BAJO';
type RiskMeta = {
  id: string;
  name: string;
  severity: Severity;
  phaseLabel: string;
  returnArrow: string;
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
    name: 'Desbalance severo de clases',
    severity: 'ALTO',
    phaseLabel: 'F2',
    returnArrow: 'F2',
    plan: 'SMOTE o pesos por clase en la pérdida; focal loss; batches estratificados por sampler balanceado.',
    icon: BarChart3,
  },
  {
    id: 'R3',
    name: 'Limitaciones de cómputo (memoria / GPU)',
    severity: 'MEDIO',
    phaseLabel: 'F2',
    returnArrow: 'F2',
    plan: 'Adoptar arquitecturas más ligeras como backbone (EfficientNet · MobileNet), priorizando viabilidad sobre tamaño.',
    icon: Server,
  },
  {
    id: 'R4',
    name: 'Sesgo fototipos IV-V en datasets',
    severity: 'MEDIO',
    phaseLabel: 'TRANSV',
    returnArrow: 'TRANSV',
    plan: 'Documentar como limitación; reporte desagregado por fototipo; trabajo futuro con datos regionales de Santander.',
    icon: Eye,
  },
  {
    id: 'R5',
    name: 'Cobertura vs perfil epidemiológico',
    severity: 'MEDIO',
    phaseLabel: 'F1',
    returnArrow: 'F1',
    plan: 'Combinar varios datasets compatibles; ajustar criterios de inclusión; priorizar las 4 patologías críticas.',
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

function trlStatus(level: number): 'done' | 'target' | 'stretch' | 'future' {
  const t = trlLevels.find((x) => x.level === level);
  if (level <= 3) return 'done';
  if (t?.target) return 'target';
  if (t?.stretch) return 'stretch';
  return 'future';
}

// ─────────────────────────────────────────────────────────────────────
// SLIDE 07
// ─────────────────────────────────────────────────────────────────────
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
    <div
      ref={ref}
      className="slide relative w-full"
      style={{ overflow: 'clip', background: '#e5e7eb' }}
    >
      <div className="slide-narrow relative">
        {/* HEADER ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="eyebrow-up">07 · ENTREGABLES + CONTINGENCIA</span>
          <span className="pill-yellow">7 riesgos · 4 entregables</span>
        </div>

        {/* HEADLINE ──────────────────────────────────────────── */}
        <h2
          className="mt-12"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 7vw, 112px)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#000000',
            maxWidth: '20ch',
          }}
        >
          <SplitText
            text="CUATRO ENTREGABLES FIRMES."
            as="span"
            trigger="scroll"
            stagger={0.014}
          />
          <br />
          <span style={{ color: '#444444', fontWeight: 400 }}>
            <SplitText
              text="SIETE FRENTES CON PLAN B."
              as="span"
              trigger="scroll"
              stagger={0.014}
              delay={0.32}
            />
          </span>
        </h2>

        <ScrollReveal delay={0.35} direction="up" distance={12}>
          <p
            className="mt-8"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 22,
              lineHeight: 1.45,
              color: '#000000',
              maxWidth: '60ch',
              letterSpacing: '-0.01em',
            }}
          >
            Cada riesgo tiene un punto de retorno CRISP-DM documentado en el anteproyecto.
          </p>
        </ScrollReveal>

        {/* BENTO 5 + 7 ────────────────────────────────────── */}
        <div className="bento mt-16">
          {/* LEFT col 5 · TRL ladder + entregables */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {/* TRL ladder card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                <span className="eyebrow-up">── TRL · MADUREZ TECNOLÓGICA</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: '#979797',
                  }}
                >
                  9 niveles
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

                  const statusLabel =
                    status === 'target'
                      ? 'TARGET'
                      : status === 'stretch'
                      ? 'STRETCH'
                      : status === 'done'
                      ? 'DONE'
                      : '──';

                  return (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: isFuture ? 0.5 : 1, x: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.4, ease: EASE }}
                      viewport={{ once: true }}
                      className="hover-reveal"
                      style={{
                        borderTop: '1px solid rgba(0,0,0,0.04)',
                        background: isTarget ? '#f3f3f3' : 'transparent',
                        cursor: 'default',
                      }}
                    >
                      <div
                        className="grid items-center"
                        style={{
                          gridTemplateColumns: '48px 1px 1fr auto',
                          gap: 14,
                          padding: '14px 24px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 32,
                            lineHeight: 0.9,
                            color: '#000000',
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {String(level).padStart(2, '0')}
                        </span>
                        <span
                          style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.08)' }}
                        />
                        <span
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 14,
                            color: '#000000',
                            fontWeight: 500,
                            lineHeight: 1.2,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: isDone || isTarget || isStretch ? '4px 12px' : '4px 0',
                            borderRadius: 9999,
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 10,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            background: isTarget
                              ? '#000000'
                              : isDone
                              ? '#d1ffca'
                              : 'transparent',
                            color: isTarget
                              ? '#ffffff'
                              : isDone
                              ? '#000000'
                              : isStretch
                              ? '#000000'
                              : '#979797',
                            border: isTarget
                              ? 'none'
                              : isStretch
                              ? '1px dashed rgba(0,0,0,0.4)'
                              : isDone
                              ? '1px solid rgba(0,0,0,0.04)'
                              : 'none',
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
                          padding: '0 24px 14px 86px',
                          maxWidth: '50ch',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: '#444444',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {TRL_DETAIL[idx]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Entregables card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                <span className="eyebrow-up">── ENTREGABLES · 4</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: '#979797',
                  }}
                >
                  uno por objetivo
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
                      padding: '20px 24px',
                      borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.04)',
                    }}
                  >
                    <div
                      className="grid items-start"
                      style={{ gridTemplateColumns: '72px 1px 1fr auto', gap: 16 }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 48,
                          lineHeight: 0.9,
                          color: '#000000',
                          fontVariantNumeric: 'tabular-nums',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {String(d.n).padStart(2, '0')}
                      </span>
                      <span
                        style={{ width: 1, height: 44, background: 'rgba(0,0,0,0.08)' }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 16,
                            lineHeight: 1.3,
                            fontWeight: 500,
                            color: '#000000',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {d.title}
                        </p>
                        <p
                          className="mt-1.5"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 13,
                            lineHeight: 1.45,
                            color: '#444444',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {d.detail}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          letterSpacing: '0.04em',
                          color: '#000000',
                          padding: '4px 12px',
                          borderRadius: 9999,
                          background: '#f3f3f3',
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

          {/* RIGHT col 7 · Risk flip cards */}
          <div style={{ gridColumn: 'span 7' }}>
            <div className="flex items-baseline justify-between gap-3 mb-5 flex-wrap">
              <span className="eyebrow-up">── 7 FRENTES CON PLAN B</span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: '#979797',
                }}
              >
                hover · ver plan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RISK_META.map((r, i) => {
                const Icon = r.icon;
                const isHigh = r.severity === 'ALTO';
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
                      minHeight: 240,
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
                    aria-label={`Riesgo ${r.id}: ${r.name}.`}
                  >
                    <div className="flip-3d-inner" style={{ minHeight: 240 }}>
                      {/* FRONT */}
                      <article
                        className="flip-3d-front"
                        style={{ padding: 24, overflow: 'hidden' }}
                      >
                        <Icon
                          size={120}
                          strokeWidth={1}
                          style={{
                            position: 'absolute',
                            opacity: 0.05,
                            bottom: -8,
                            right: -8,
                            color: '#000000',
                            pointerEvents: 'none',
                          }}
                        />

                        <div className="relative flex items-start justify-between gap-2">
                          <span
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: 32,
                              lineHeight: 0.9,
                              color: '#000000',
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {r.id}
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '4px 12px',
                              borderRadius: 9999,
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 10,
                              letterSpacing: '0.16em',
                              textTransform: 'uppercase',
                              background: isHigh ? '#000000' : 'transparent',
                              color: isHigh ? '#ffffff' : '#000000',
                              border: isHigh
                                ? 'none'
                                : '1px solid rgba(0,0,0,0.16)',
                            }}
                          >
                            {r.severity}
                          </span>
                        </div>

                        <h4
                          className="relative mt-5"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 18,
                            lineHeight: 1.25,
                            fontWeight: 500,
                            color: '#000000',
                            maxWidth: '26ch',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {r.name}
                        </h4>

                        <div
                          className="relative mt-6"
                          style={{ height: 1, background: 'rgba(0,0,0,0.08)' }}
                        />

                        <div className="relative mt-4 flex items-center gap-2">
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 11,
                              letterSpacing: '0.04em',
                              color: '#000000',
                              padding: '4px 12px',
                              borderRadius: 9999,
                              background: '#f3f3f3',
                            }}
                          >
                            {r.phaseLabel}
                          </span>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 10,
                              letterSpacing: '0.04em',
                              color: '#979797',
                            }}
                          >
                            fase de retorno
                          </span>
                        </div>
                      </article>

                      {/* BACK */}
                      <article
                        className="flip-3d-back"
                        style={{ padding: 24, overflow: 'hidden' }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 11,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.55)',
                          }}
                        >
                          ── PLAN DE CONTINGENCIA
                        </span>
                        <p
                          className="mt-3"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: 15,
                            lineHeight: 1.45,
                            color: '#ffffff',
                            maxWidth: '34ch',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {r.plan}
                        </p>
                        <div
                          className="mt-5"
                          style={{ height: 1, background: 'rgba(255,255,255,0.16)' }}
                        />
                        <span
                          className="mt-4 block"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 11,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.55)',
                          }}
                        >
                          ── RETORNO CRISP-DM
                        </span>
                        <p
                          className="mt-2"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 32,
                            lineHeight: 1,
                            color: '#d1ffca',
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '-0.02em',
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

        {/* CIERRE · compromiso público ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          viewport={{ once: true }}
          className="card-hero-top mt-16"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <div
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              borderBottom: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              ── COMPROMISO PÚBLICO
            </span>
            <p
              className="mt-5"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(24px, 3.2vw, 36px)',
                lineHeight: 1.25,
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
              { value: '09', label: 'semanas completadas' },
              { value: '32', label: 'semanas totales' },
              { value: 'TRL 4', label: 'objetivo' },
              { value: 'TRL 5', label: 'stretch' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: 'clamp(24px, 3vw, 36px) clamp(20px, 3vw, 32px)',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.16)',
                  borderTop:
                    i >= 2 && typeof window !== 'undefined' && window.innerWidth < 768
                      ? '1px solid rgba(255,255,255,0.16)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    lineHeight: 0.9,
                    color: '#ffffff',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER ────────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="kbd">hover</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              voltear riesgo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">click</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              expandir TRL
            </span>
          </div>
          {reduced && (
            <span
              className="ml-auto"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: '#979797',
                letterSpacing: '0.04em',
                opacity: 0.7,
              }}
            >
              reduced-motion · estado estático
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
