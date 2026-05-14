// ─────────────────────────────────────────────────────────────────────────
// §03 · Pregunta + Hipótesis · v3 · cream paper editorial.
//
// Fondo: cream paper warm (#f4f1e8) · tono académico sobrio.
// Jerarquía:
//   1. Pregunta hero a la izquierda · meta a la derecha.
//   2. Hipótesis como pull-quote académica con border-top moss.
//   3. Tabla de delimitación: Alcance (60%) + Fuera (40%) en split.
//   4. Supuestos como footnote-table horizontal full-width.
// ─────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import Sup from '@/components/ui/Sup';

const ENTER = [0.22, 1, 0.36, 1] as const;

const ALCANCE = [
  'Aprendizaje autosupervisado sobre datasets dermatoscópicos públicos.',
  'Pre-entrenamiento de un encoder visual sin uso de etiquetas.',
  'Evaluación cuantitativa en HAM10000, BCN20000 y CO2Wounds-V2.',
  'Discusión orientada al contexto clínico santandereano.',
];

const FUERA = [
  'Sustitución del juicio del especialista.',
  'Diagnóstico definitivo, biopsia o intervención invasiva.',
  'Despliegue en sistemas hospitalarios.',
  'Estudios prospectivos con pacientes.',
];

const SUPUESTOS = [
  { n: '01', head: 'Acceso a los datasets', body: 'Los tres conjuntos de imágenes mantienen acceso público bajo licencias académicas durante el desarrollo del proyecto.' },
  { n: '02', head: 'Reproducibilidad', body: 'Los métodos SSL contrastivos publicados son reproducibles bajo entornos académicos similares a los de los autores originales.' },
  { n: '03', head: 'Comparabilidad visual', body: 'Las lesiones representadas en los datasets internacionales son visualmente comparables a las observadas en población santandereana.' },
  { n: '04', head: 'Cronograma viable', body: 'El cronograma del proyecto permite completar el ciclo de pre-entrenamiento, fine-tuning y evaluación dentro del semestre académico.' },
] as const;

export default function Section03Pregunta() {
  return (
    <section
      id="section-pregunta"
      aria-labelledby="pregunta-h"
      style={{
        background: '#f4f1e8',
        color: '#0a0b0c',
        paddingBlock: 'clamp(72px, 9vw, 128px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* atmósfera sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 12% 0%, rgba(0,84,61,0.06) 0%, transparent 50%), radial-gradient(ellipse at 88% 100%, rgba(166,138,0,0.05) 0%, transparent 50%)',
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
            style={{ fontSize: 12, letterSpacing: '0.32em', color: '#0a0b0c', fontWeight: 700 }}
          >
            §03 · pregunta de investigación
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.55)', fontWeight: 500 }}
          >
            UNAB · 2026
          </span>
        </div>

        {/* ── BLOQUE 1 · PREGUNTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: ENTER }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 0.6fr)',
            gap: 'clamp(20px, 3vw, 56px)',
            alignItems: 'baseline',
            marginBottom: 72,
          }}
        >
          <h2
            id="pregunta-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(30px, 4.4vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.026em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '22ch',
            }}
          >
            ¿Cómo diseñar un algoritmo de aprendizaje autosupervisado que apoye la detección de lesiones cutáneas en el contexto clínico de Santander?
          </h2>

          <aside
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(10,11,12,0.55)',
              lineHeight: 1.9,
              fontWeight: 500,
              borderLeft: '1px solid rgba(10,11,12,0.18)',
              paddingLeft: 18,
              paddingTop: 6,
            }}
          >
            Pregunta · 01<br />
            Contexto · Santander<br />
            Marco · SSL
          </aside>
        </motion.div>

        {/* ── BLOQUE 2 · HIPÓTESIS · pull-quote académica ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, ease: ENTER, delay: 0.1 }}
          style={{
            marginBottom: 88,
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 'clamp(24px, 3vw, 48px)',
            paddingRight: 'clamp(24px, 3vw, 48px)',
            borderTop: '2px solid #00543d',
            borderBottom: '1px solid rgba(10,11,12,0.18)',
            background: 'rgba(255,255,255,0.5)',
          }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 11,
              letterSpacing: '0.32em',
              color: '#00543d',
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Hipótesis · 01
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              lineHeight: 1.34,
              letterSpacing: '-0.012em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '52ch',
            }}
          >
            El aprendizaje autosupervisado puede generar representaciones visuales transferibles a partir de imágenes dermatoscópicas, reduciendo la dependencia de grandes volúmenes de imágenes anotadas
            <Sup n={1} refs={['krishnan-2022']} tone="graphite" />.
          </p>
        </motion.div>

        {/* ── BLOQUE 3 · DELIMITACIÓN · Alcance 60% / Fuera 40% ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Delimitación del estudio
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
            >
              Alcance · exclusiones
            </span>
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
            gap: 0,
            marginBottom: 80,
            border: '1px solid rgba(10,11,12,0.18)',
            background: '#ffffff',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {/* Alcance · prominente */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.2 }}
            style={{
              padding: 'clamp(24px, 3vw, 40px)',
              borderRight: '1px solid rgba(10,11,12,0.12)',
            }}
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.32em',
                color: '#00543d',
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              ✓ Alcance · qué cubre
            </div>
            <ol
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {ALCANCE.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr',
                    gap: 16,
                    alignItems: 'baseline',
                    paddingBottom: i < ALCANCE.length - 1 ? 14 : 0,
                    borderBottom: i < ALCANCE.length - 1 ? '1px dashed rgba(10,11,12,0.14)' : 'none',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 'clamp(20px, 1.8vw, 24px)',
                      color: '#00543d',
                      fontWeight: 200,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(15px, 1.4vw, 17px)',
                      lineHeight: 1.4,
                      color: '#0a0b0c',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Fuera · secundario */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
            style={{
              padding: 'clamp(24px, 3vw, 40px)',
              background: '#fafaf6',
            }}
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.32em',
                color: 'rgba(10,11,12,0.6)',
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              ✗ Fuera · qué excluye
            </div>
            <ol
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {FUERA.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr',
                    gap: 14,
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      color: 'rgba(10,11,12,0.4)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textDecoration: 'line-through',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(14px, 1.3vw, 15.5px)',
                      lineHeight: 1.38,
                      color: 'rgba(10,11,12,0.65)',
                      fontWeight: 400,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* ── BLOQUE 4 · SUPUESTOS · footnote-table horizontal ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.2 }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Supuestos del proyecto
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
            >
              S·01 → S·04
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 1,
              background: 'rgba(10,11,12,0.18)',
              border: '1px solid rgba(10,11,12,0.18)',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {SUPUESTOS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.5, ease: ENTER, delay: 0.3 + i * 0.06 }}
                style={{
                  background: '#ffffff',
                  padding: 'clamp(18px, 2vw, 26px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  minHeight: 200,
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(11px, 1vw, 12px)',
                    letterSpacing: '0.16em',
                    color: '#a68a00',
                    fontWeight: 700,
                  }}
                >
                  S·{s.n}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(16px, 1.4vw, 18px)',
                    fontWeight: 500,
                    lineHeight: 1.22,
                    color: '#0a0b0c',
                    margin: 0,
                    letterSpacing: '-0.012em',
                  }}
                >
                  {s.head}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(13px, 1.2vw, 14.5px)',
                    lineHeight: 1.45,
                    color: 'rgba(10,11,12,0.7)',
                    margin: 0,
                    letterSpacing: '-0.003em',
                  }}
                >
                  {s.body}
                  {'refs' in s && s.refs?.map((r, j) => (
                    <Sup key={r} n={j + 1} refs={[r]} tone="graphite" />
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cierre · pie de página editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 64,
            paddingTop: 16,
            borderTop: '1px solid rgba(10,11,12,0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,11,12,0.55)',
            fontWeight: 500,
          }}
        >
          <span>pregunta · hipótesis · delimitación · supuestos</span>
          <span style={{ color: 'rgba(10,11,12,0.7)', fontWeight: 600 }}>
            continúa en §04
          </span>
        </motion.div>
      </div>
    </section>
  );
}
