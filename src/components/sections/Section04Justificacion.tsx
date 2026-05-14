// ─────────────────────────────────────────────────────────────────────────
// §04 · Justificación · cream paper + Scroll Stack interactivo
//
// Estructura DIFERENTE a §00-§03:
//   1. Hero claro · número grande "04" en deep moss
//   2. SCROLL STACK · 5 dimensiones se apilan a medida que haces scroll
//      (position: sticky con offsets crecientes · z-index ascendente)
//   3. COMPARACIÓN · SSL vs Supervisado con barras animadas
//   4. BENEFICIARIOS · 4 tarjetas con hover state
//   5. ALCANCE · binario qué logrará / qué no
// ─────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import Sup from '@/components/ui/Sup';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const ENTER = [0.22, 1, 0.36, 1] as const;

const DIMENSIONES = [
  {
    n: '01',
    titulo: 'Relevancia',
    pregunta: '¿Por qué ahora?',
    accent: '#0d4ea8',
    accentSoft: '#abcbf9',
    body: 'La IA médica supervisada exige grandes volúmenes de imágenes anotadas por especialistas. En Colombia ese recurso no se ha consolidado a la escala que el problema clínico requiere.',
    highlight: 'Brecha estructural de datos anotados.',
  },
  {
    n: '02',
    titulo: 'Pertinencia',
    pregunta: '¿A qué responde?',
    accent: '#8a3f85',
    accentSoft: '#ffbbfc',
    body: 'El proyecto atiende una carga clínica documentada (11.064 casos reportados en Colombia 2024) y se inscribe en la agenda nacional de transformación digital en salud.',
    highlight: 'Carga documentada y agenda nacional.',
  },
  {
    n: '03',
    titulo: 'Valor agregado',
    pregunta: '¿Qué lo diferencia?',
    accent: '#a68a00',
    accentSoft: '#fce88b',
    body: 'El aprendizaje autosupervisado aprende representaciones a partir de imágenes sin etiquetar. Esta propiedad lo hace aplicable en escenarios donde la anotación experta es escasa o costosa.',
    highlight: 'Representaciones sin anotación experta.',
  },
  {
    n: '04',
    titulo: 'Viabilidad',
    pregunta: '¿Es realizable?',
    accent: '#00543d',
    accentSoft: '#7ed1be',
    body: 'Tres datasets públicos bajo licencia académica (HAM10000, BCN20000, CO2Wounds-V2) e implementaciones SSL de código abierto hacen el alcance compatible con los tiempos del trabajo de grado.',
    highlight: 'Datasets públicos y código abierto.',
  },
  {
    n: '05',
    titulo: 'Formación profesional',
    pregunta: '¿Qué construye?',
    accent: '#b35135',
    accentSoft: '#ffaa88',
    body: 'Consolida competencias en sistemas inteligentes, visión por computador aplicada a imagen médica y métodos de aprendizaje automático con enfoque clínico, dentro del perfil del programa.',
    highlight: 'Perfil técnico con enfoque clínico.',
  },
] as const;

const COMPARACION = [
  { metrica: 'Necesidad de etiquetas expertas', sup: 90, ssl: 30 },
  { metrica: 'Costo de anotación', sup: 85, ssl: 25 },
  { metrica: 'Aprovechamiento de imágenes sin anotar', sup: 15, ssl: 90 },
  { metrica: 'Generalización a dominios cercanos', sup: 45, ssl: 75 },
  { metrica: 'Replicabilidad regional', sup: 30, ssl: 80 },
] as const;

export default function Section04Justificacion() {

  return (
    <section
      id="section-justificacion"
      aria-labelledby="just-h"
      style={{
        background: '#f4f1e8',
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
            'radial-gradient(ellipse at 0% 0%, rgba(166,138,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(0,84,61,0.06) 0%, transparent 55%)',
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
            §04 · justificación
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.55)', fontWeight: 500 }}
          >
            scroll · revela 5 dimensiones
          </span>
        </div>

        {/* ── HERO · solo título ── */}
        <motion.h2
          id="just-h"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(44px, 7vw, 96px)',
            lineHeight: 0.98,
            letterSpacing: '-0.034em',
            fontWeight: 400,
            color: '#0a0b0c',
            margin: '0 0 96px 0',
            maxWidth: '14ch',
          }}
        >
          Fundamentación del proyecto.
        </motion.h2>

        {/* ── BLOQUE 1 · SCROLL STACK ── */}
        <div style={{ marginBottom: 96 }}>
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
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#0a0b0c',
                margin: 0,
              }}
            >
              Cinco dimensiones de la justificación
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
            >
              scroll · stack
            </span>
          </motion.div>

          <div style={{ height: '100vh', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(10,11,12,0.14)', background: '#f4f1e8' }}>
          <ScrollStack
            itemDistance={120}
            itemScale={0.03}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.85}
          >
            {DIMENSIONES.map((dim) => (
              <ScrollStackItem key={dim.n}>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(10,11,12,0.14)',
                    borderRadius: 20,
                    padding: 'clamp(36px, 4vw, 64px)',
                    minHeight: 'clamp(380px, 52vh, 520px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 32px 80px -40px rgba(10,11,12,0.22), 0 -4px 12px -4px rgba(10,11,12,0.04)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 0.55fr) minmax(0, 1.45fr)',
                      gap: 'clamp(20px, 3vw, 48px)',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 'clamp(96px, 11vw, 160px)',
                          fontWeight: 200,
                          color: dim.accent,
                          lineHeight: 0.85,
                          letterSpacing: '-0.05em',
                          marginBottom: 20,
                        }}
                      >
                        {dim.n}
                      </div>
                      <div
                        className="font-mono uppercase"
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.32em',
                          color: dim.accent,
                          fontWeight: 700,
                          marginBottom: 12,
                        }}
                      >
                        Dimensión {dim.n}
                      </div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(32px, 3.4vw, 48px)',
                          fontWeight: 500,
                          color: '#0a0b0c',
                          lineHeight: 1.02,
                          letterSpacing: '-0.024em',
                          margin: 0,
                          marginBottom: 10,
                        }}
                      >
                        {dim.titulo}
                      </h4>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(15px, 1.4vw, 17px)',
                          fontStyle: 'italic',
                          color: 'rgba(10,11,12,0.55)',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {dim.pregunta}
                      </div>
                    </div>

                    <div
                      style={{
                        paddingLeft: 'clamp(16px, 2vw, 32px)',
                        borderLeft: `3px solid ${dim.accentSoft}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(20px, 2vw, 26px)',
                          lineHeight: 1.4,
                          color: '#0a0b0c',
                          margin: 0,
                          letterSpacing: '-0.012em',
                          maxWidth: '40ch',
                          fontWeight: 400,
                        }}
                      >
                        {dim.body}
                      </p>
                    </div>
                  </div>

                  {/* footer · highlight tag */}
                  <div
                    style={{
                      marginTop: 32,
                      paddingTop: 18,
                      borderTop: `1px dashed ${dim.accentSoft}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: 16,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      className="font-mono uppercase"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: '0.28em',
                        color: 'rgba(10,11,12,0.45)',
                        fontWeight: 600,
                      }}
                    >
                      Núcleo
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(15px, 1.4vw, 17px)',
                        color: dim.accent,
                        fontWeight: 600,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {dim.highlight}
                    </span>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
          </div>
        </div>

        {/* ── BLOQUE 2 · COMPARACIÓN SSL vs SUPERVISADO ── */}
        <div style={{ marginBottom: 96 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="mb-6"
          >
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
              Aprendizaje autosupervisado frente al enfoque supervisado
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(13.5px, 1.2vw, 15px)',
                color: 'rgba(10,11,12,0.62)',
                margin: '10px 0 0 0',
                letterSpacing: '-0.003em',
              }}
            >
              Estimación cualitativa basada en la literatura revisada<Sup n={1} refs={['krishnan-2022']} tone="graphite" />.
            </p>
          </motion.div>

          <div
            style={{
              border: '1px solid rgba(10,11,12,0.18)',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#ffffff',
            }}
          >
            {/* header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)',
                padding: 'clamp(14px, 1.6vw, 20px) clamp(18px, 2vw, 28px)',
                borderBottom: '1px solid rgba(10,11,12,0.14)',
                background: '#fafaf6',
                gap: 16,
              }}
            >
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.6)', fontWeight: 700 }}
              >
                Dimensión
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.55)', fontWeight: 600 }}
              >
                Supervisado
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.22em', color: '#00543d', fontWeight: 700 }}
              >
                SSL · propuesta
              </span>
            </div>

            {COMPARACION.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-4%' }}
                transition={{ duration: 0.5, ease: ENTER, delay: i * 0.06 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)',
                  padding: 'clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 28px)',
                  borderBottom: i < COMPARACION.length - 1 ? '1px solid rgba(10,11,12,0.08)' : 'none',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(14px, 1.3vw, 16px)',
                    fontWeight: 500,
                    color: '#0a0b0c',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {row.metrica}
                </span>
                <Bar value={row.sup} color="rgba(10,11,12,0.4)" />
                <Bar value={row.ssl} color="#00543d" highlight />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 56,
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
          <span>5 dimensiones · comparación SSL</span>
          <span style={{ color: '#0a0b0c', fontWeight: 600 }}>continúa en §05</span>
        </motion.div>
      </div>
    </section>
  );
}

function Bar({ value, color, highlight = false }: { value: number; color: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 8,
          background: 'rgba(10,11,12,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: '-6%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{
            height: '100%',
            background: color,
            borderRadius: 4,
            boxShadow: highlight ? `0 0 12px ${color}55` : 'none',
          }}
        />
      </div>
      <span
        className="font-mono tabular-nums"
        style={{
          fontSize: 12,
          color,
          fontWeight: 700,
          minWidth: 32,
          textAlign: 'right',
          letterSpacing: '0.02em',
        }}
      >
        {value}%
      </span>
    </div>
  );
}
