// ─────────────────────────────────────────────────────────────────────────
// §05 · Objetivos · timeline metodológico vertical.
//
// Estructura DIFERENTE a §00-§04:
//   1. Masthead
//   2. Objetivo general · deck statement grande con sello "G"
//   3. Timeline vertical de 4 fases metodológicas:
//      · 01 Preparación de datos
//      · 02 Implementación SSL
//      · 03 Evaluación comparativa
//      · 04 Validación funcional
//   Cada fase: número grande, fase metodológica, descripción literal del anteproyecto.
//   Conector vertical con dot que se ilumina al hover.
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

const OBJETIVO_GENERAL =
  'Desarrollar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado para la clasificación de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en el contexto del departamento de Santander.';

const OBJETIVOS_ESPECIFICOS = [
  {
    n: '01',
    fase: 'Preparación de datos',
    accent: '#0d4ea8',
    verbo: 'Analizar',
    body: 'Analizar conjuntos de datos de imágenes dermatológicas representativos de lesiones cutáneas relevantes para el contexto clínico del departamento de Santander.',
  },
  {
    n: '02',
    fase: 'Implementación SSL',
    accent: '#8a3f85',
    verbo: 'Diseñar',
    body: 'Diseñar un algoritmo de clasificación de lesiones cutáneas basado en aprendizaje autosupervisado utilizando imágenes dermatológicas.',
  },
  {
    n: '03',
    fase: 'Evaluación comparativa',
    accent: '#a68a00',
    verbo: 'Evaluar',
    body: 'Evaluar el desempeño del algoritmo propuesto mediante métricas reportadas en la literatura científica para tareas de análisis de imágenes médicas.',
  },
  {
    n: '04',
    fase: 'Validación funcional',
    accent: '#00543d',
    verbo: 'Implementar',
    body: 'Implementar un prototipo de aplicación que integre el algoritmo desarrollado para el apoyo en el análisis de imágenes dermatológicas.',
  },
] as const;

export default function Section05Objetivos() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <section
      id="section-objetivos"
      aria-labelledby="obj-h"
      style={{
        background: '#f6f4ee',
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
            'radial-gradient(ellipse at 100% 0%, rgba(13,78,168,0.06) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(0,84,61,0.05) 0%, transparent 55%)',
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
            §05 · objetivos
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.62)', fontWeight: 600 }}
          >
            01 general · 04 específicos
          </span>
        </div>

        {/* ── HERO · OBJETIVO GENERAL · card manifiesto ── */}
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(10,11,12,0.14)',
            borderRadius: 20,
            padding: 'clamp(32px, 4vw, 64px)',
            marginBottom: 112,
            boxShadow: '0 24px 64px -32px rgba(13,78,168,0.18), 0 2px 8px -2px rgba(10,11,12,0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* accent stripe top */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: '#0d4ea8',
            }}
          />

          {/* badges row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 'clamp(28px, 3.4vw, 44px)',
            }}
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 12.5,
                letterSpacing: '0.32em',
                color: '#0d4ea8',
                fontWeight: 700,
              }}
            >
              ◆ Objetivo general · único
            </div>
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 11.5,
                letterSpacing: '0.28em',
                color: 'rgba(10,11,12,0.55)',
                fontWeight: 600,
              }}
            >
              UNAB · 2026
            </div>
          </div>

          {/* statement */}
          <h2
            id="obj-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              lineHeight: 1.18,
              letterSpacing: '-0.022em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '40ch',
            }}
          >
            <span style={{ color: '#0d4ea8', fontWeight: 500 }}>Desarrollar</span> un algoritmo de inteligencia artificial basado en <span style={{ color: '#0d4ea8', fontWeight: 500 }}>aprendizaje autosupervisado</span> para la clasificación de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en el contexto del departamento de <span style={{ color: '#0d4ea8', fontWeight: 500 }}>Santander</span>.
          </h2>

          {/* footer · conceptos clave extraídos */}
          <div
            style={{
              marginTop: 'clamp(32px, 4vw, 56px)',
              paddingTop: 24,
              borderTop: '1px solid rgba(10,11,12,0.14)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(16px, 2.4vw, 36px)',
            }}
          >
            {[
              { label: 'Verbo', value: 'Desarrollar' },
              { label: 'Enfoque', value: 'Aprendizaje autosupervisado' },
              { label: 'Territorio', value: 'Santander' },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.32em',
                    color: 'rgba(10,11,12,0.55)',
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.5vw, 18px)',
                    fontWeight: 500,
                    color: '#0a0b0c',
                    letterSpacing: '-0.008em',
                    lineHeight: 1.3,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        {/* ── OBJETIVOS ESPECÍFICOS · timeline vertical ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: ENTER }}
            className="flex items-baseline justify-between flex-wrap gap-3 mb-10"
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
              Objetivos específicos · cuatro fases metodológicas
            </h3>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 12.5, letterSpacing: '0.22em', color: 'rgba(10,11,12,0.62)', fontWeight: 600 }}
            >
              datos → SSL → evaluación → validación
            </span>
          </motion.div>

          {/* timeline container */}
          <div
            style={{
              position: 'relative',
              paddingLeft: 'clamp(40px, 6vw, 88px)',
            }}
          >
            {/* línea vertical de la timeline */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 'clamp(19px, 2.8vw, 41px)',
                top: 20,
                bottom: 20,
                width: 2,
                background: 'linear-gradient(180deg, #0d4ea8 0%, #8a3f85 33%, #a68a00 66%, #00543d 100%)',
                opacity: 0.35,
              }}
            />

            {OBJETIVOS_ESPECIFICOS.map((obj, i) => {
              const isHover = hoverIdx === i;
              const isDim = hoverIdx !== null && hoverIdx !== i;
              return (
                <motion.article
                  key={obj.n}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.7, ease: ENTER, delay: 0.15 + i * 0.1 }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  style={{
                    position: 'relative',
                    marginBottom: i < OBJETIVOS_ESPECIFICOS.length - 1 ? 48 : 0,
                    cursor: 'default',
                    opacity: isDim ? 0.4 : 1,
                    transition: 'opacity 280ms ease-out',
                  }}
                >
                  {/* dot en la línea */}
                  <motion.div
                    aria-hidden
                    animate={{
                      scale: isHover ? 1.4 : 1,
                      backgroundColor: isHover ? obj.accent : '#ffffff',
                    }}
                    transition={{ duration: 0.3, ease: ENTER }}
                    style={{
                      position: 'absolute',
                      left: 'clamp(-30px, -4vw, -53px)',
                      top: 16,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: `3px solid ${obj.accent}`,
                      zIndex: 2,
                    }}
                  />

                  <div
                    style={{
                      background: isHover ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      border: `1px solid ${isHover ? obj.accent : 'rgba(10,11,12,0.14)'}`,
                      borderRadius: 16,
                      padding: 'clamp(32px, 3.6vw, 48px)',
                      transition: 'all 280ms ease-out',
                      boxShadow: isHover
                        ? `0 22px 48px -20px ${obj.accent}45`
                        : '0 4px 14px -6px rgba(10,11,12,0.06)',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 0.42fr) minmax(0, 1.58fr)',
                      gap: 'clamp(20px, 2.8vw, 48px)',
                      alignItems: 'start',
                    }}
                  >
                    {/* left · número + fase */}
                    <div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: 'clamp(64px, 7vw, 104px)',
                          fontWeight: 200,
                          color: obj.accent,
                          lineHeight: 0.85,
                          letterSpacing: '-0.05em',
                          marginBottom: 16,
                        }}
                      >
                        {obj.n}
                      </div>
                      <div
                        className="font-mono uppercase"
                        style={{
                          fontSize: 12,
                          letterSpacing: '0.3em',
                          color: obj.accent,
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        Fase {obj.n}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(20px, 2vw, 26px)',
                          fontWeight: 500,
                          color: '#0a0b0c',
                          lineHeight: 1.15,
                          letterSpacing: '-0.018em',
                        }}
                      >
                        {obj.fase}
                      </div>
                    </div>

                    {/* right · verbo + body */}
                    <div>
                      <div
                        className="font-mono uppercase"
                        style={{
                          fontSize: 11.5,
                          letterSpacing: '0.32em',
                          color: 'rgba(10,11,12,0.55)',
                          fontWeight: 700,
                          marginBottom: 14,
                        }}
                      >
                        Verbo · {obj.verbo.toLowerCase()}
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(17px, 1.7vw, 20.5px)',
                          lineHeight: 1.5,
                          color: '#0a0b0c',
                          margin: 0,
                          letterSpacing: '-0.008em',
                          maxWidth: '52ch',
                          fontWeight: 400,
                        }}
                      >
                        <span style={{ color: obj.accent, fontWeight: 600 }}>{obj.verbo}</span>
                        {obj.body.slice(obj.verbo.length)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
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
            marginTop: 72,
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
          <span>general · 4 específicos · 4 fases metodológicas</span>
          <span style={{ color: 'rgba(10,11,12,0.7)', fontWeight: 600 }}>continúa en §06</span>
        </motion.div>
      </div>
    </section>
  );
}
