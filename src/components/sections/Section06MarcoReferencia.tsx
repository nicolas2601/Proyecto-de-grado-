// ─────────────────────────────────────────────────────────────────────────
// §06 · Marco de Referencia · slate dark con 3 frentes teóricos.
//
// 1. Fundamento clínico · lesiones · ABCDE interactivo · melanoma
// 2. Fundamento técnico · CNN · ResNet · ViT con diagramas SVG
// 3. Self-Supervised Learning · SimCLR vs DINO con diagramas
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sup from '@/components/ui/Sup';

const ENTER = [0.22, 1, 0.36, 1] as const;

// ── DATA · ABCDE ───────────────────────────────────────────────────
const ABCDE = [
  {
    letra: 'A',
    nombre: 'Asimetría',
    desc: 'Una mitad no coincide con la otra. Las lesiones malignas pierden la simetría que conservan las benignas.',
    accent: '#abcbf9',
  },
  {
    letra: 'B',
    nombre: 'Borde',
    desc: 'Bordes irregulares, dentados o difusos. Las malignas suelen presentar contornos festoneados.',
    accent: '#7ed1be',
  },
  {
    letra: 'C',
    nombre: 'Color',
    desc: 'Variación cromática dentro de la lesión. Mezclas de marrón, negro, rojo o azul levantan sospecha.',
    accent: '#ffbbfc',
  },
  {
    letra: 'D',
    nombre: 'Diámetro',
    desc: 'Diámetros mayores a 6 mm elevan la sospecha. El tamaño por sí solo no es diagnóstico.',
    accent: '#fce88b',
  },
  {
    letra: 'E',
    nombre: 'Evolución',
    desc: 'Cambios en tamaño, forma, color o síntomas (picor, sangrado). El criterio dinámico más sensible.',
    accent: '#ffaa88',
  },
] as const;

// ── DATA · ARQUITECTURAS ───────────────────────────────────────────
const ARQUITECTURAS = [
  {
    id: 'resnet',
    nombre: 'ResNet',
    anio: '2015',
    autor: 'He et al.',
    paradigma: 'Convolucional · residual',
    detalle:
      'Apila bloques convolucionales con conexiones residuales que permiten profundidad sin degradación. Cada bloque suma entrada y transformación.',
    fortalezas: ['Bias inductivo para imágenes', 'Estable en profundidad', 'Eficiente en cómputo'],
    limitaciones: ['Campo receptivo local', 'Limitado para relaciones globales'],
    accent: '#abcbf9',
  },
  {
    id: 'vit',
    nombre: 'Vision Transformer (ViT)',
    anio: '2020',
    autor: 'Dosovitskiy et al.',
    paradigma: 'Transformer · atención',
    detalle:
      'Divide la imagen en parches y los procesa como tokens con atención multi-cabeza. Cada token atiende a todos los demás capturando relaciones globales.',
    fortalezas: ['Atención global desde la primera capa', 'Escalable a grandes corpus', 'Representaciones más generales'],
    limitaciones: ['Demanda más datos', 'Mayor costo computacional'],
    accent: '#ffbbfc',
  },
] as const;

export default function Section06MarcoReferencia() {
  const [abcdeActive, setAbcdeActive] = useState(0);
  const [archActive, setArchActive] = useState<'resnet' | 'vit'>('resnet');
  const [sslView, setSslView] = useState<'simclr' | 'dino'>('simclr');

  return (
    <section
      id="section-marco"
      aria-labelledby="marco-h"
      style={{
        background: '#0e1014',
        color: '#ffffff',
        paddingBlock: 'clamp(72px, 9vw, 128px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* atmósfera */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 8% 8%, rgba(171,203,249,0.06) 0%, transparent 45%), radial-gradient(ellipse at 92% 92%, rgba(255,187,252,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      {/* grid sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
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
            borderBottom: '1px solid rgba(255,255,255,0.22)',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: 13, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.82)', fontWeight: 700 }}
          >
            §06 · marco de referencia
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}
          >
            clínico · técnico · SSL
          </span>
        </div>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{ marginBottom: 'clamp(72px, 9vw, 120px)' }}
        >
          <h2
            id="marco-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(38px, 5.6vw, 80px)',
              lineHeight: 1.02,
              letterSpacing: '-0.028em',
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
              maxWidth: '20ch',
            }}
          >
            Tres frentes teóricos sostienen el modelo.
          </h2>
          <div
            style={{
              display: 'flex',
              gap: 'clamp(12px, 1.6vw, 24px)',
              marginTop: 32,
              flexWrap: 'wrap',
            }}
          >
            {[
              { tag: '01', label: 'Fundamento clínico', color: '#abcbf9' },
              { tag: '02', label: 'Fundamento técnico', color: '#fce88b' },
              { tag: '03', label: 'Self-Supervised Learning', color: '#ffbbfc' },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 10,
                  padding: '10px 18px',
                  border: `1px solid ${c.color}55`,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 12, color: c.color, fontWeight: 700, letterSpacing: '0.06em' }}
                >
                  {c.tag}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13.5,
                    color: '#ffffff',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 01 · FUNDAMENTO CLÍNICO                                     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <FrenteHeader n="01" titulo="Fundamento clínico" color="#abcbf9" descripcion="Lesiones cutáneas · método ABCDE · melanoma." />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: 'clamp(24px, 3vw, 48px)',
            marginBottom: 48,
            alignItems: 'start',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.86)',
              margin: 0,
              letterSpacing: '-0.005em',
              maxWidth: '42ch',
            }}
          >
            El <span style={{ color: '#abcbf9', fontWeight: 500 }}>melanoma</span> concentra la mortalidad del cáncer de piel por su capacidad metastásica. La detección temprana es el factor pronóstico determinante
            <Sup n={1} refs={['cac-2025']} tone="white" />.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.72)',
              margin: 0,
              letterSpacing: '-0.003em',
              maxWidth: '46ch',
            }}
          >
            El método <span style={{ color: '#abcbf9', fontWeight: 600 }}>ABCDE</span> sistematiza cinco criterios visuales para diferenciar lesiones benignas de sospechosas. Cada criterio es cuantificable, lo que lo vuelve apto para análisis computacional.
          </p>
        </motion.div>

        {/* ABCDE interactivo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.42fr) minmax(0, 1.58fr)',
            gap: 'clamp(20px, 2.8vw, 40px)',
            marginBottom: 'clamp(64px, 8vw, 112px)',
          }}
        >
          {/* tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ABCDE.map((item, i) => {
              const isActive = abcdeActive === i;
              return (
                <button
                  key={item.letra}
                  type="button"
                  onClick={() => setAbcdeActive(i)}
                  style={{
                    appearance: 'none',
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: `1px solid ${isActive ? item.accent : 'rgba(255,255,255,0.14)'}`,
                    borderRadius: 12,
                    padding: 'clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 24px)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 16,
                    alignItems: 'baseline',
                    transition: 'all 220ms ease-out',
                    color: 'inherit',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 40px)',
                      fontWeight: 200,
                      color: isActive ? item.accent : 'rgba(255,255,255,0.6)',
                      letterSpacing: '-0.04em',
                      lineHeight: 0.85,
                      transition: 'color 220ms',
                    }}
                  >
                    {item.letra}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(15px, 1.4vw, 17px)',
                      fontWeight: 500,
                      color: '#ffffff',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {item.nombre}
                  </span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 16,
              padding: 'clamp(28px, 3.4vw, 48px)',
              minHeight: 320,
              position: 'relative',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={abcdeActive}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: ENTER }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: '0.32em',
                    color: ABCDE[abcdeActive].accent,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  Criterio · {ABCDE[abcdeActive].letra}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    fontWeight: 500,
                    color: '#ffffff',
                    margin: 0,
                    marginBottom: 18,
                    letterSpacing: '-0.022em',
                    lineHeight: 1.1,
                  }}
                >
                  {ABCDE[abcdeActive].nombre}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(16px, 1.5vw, 19px)',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.86)',
                    margin: 0,
                    letterSpacing: '-0.005em',
                    maxWidth: '54ch',
                  }}
                >
                  {ABCDE[abcdeActive].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 02 · FUNDAMENTO TÉCNICO                                     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <FrenteHeader n="02" titulo="Fundamento técnico" color="#fce88b" descripcion="Redes profundas · convolucionales y transformers." />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.84)',
            margin: '0 0 40px 0',
            letterSpacing: '-0.005em',
            maxWidth: '62ch',
          }}
        >
          Las redes profundas aprenden representaciones jerárquicas: las capas tempranas detectan bordes; las profundas capturan estructuras complejas. Dos familias dominan el campo: las{' '}
          <span style={{ color: '#fce88b', fontWeight: 500 }}>convolucionales</span> (ResNet) y los{' '}
          <span style={{ color: '#fce88b', fontWeight: 500 }}>transformers visuales</span> (ViT).
        </motion.p>

        {/* Arquitectura toggle + diagrama */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            marginBottom: 'clamp(64px, 8vw, 112px)',
          }}
        >
          {/* tab header */}
          <div
            role="tablist"
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            {ARQUITECTURAS.map((arq) => {
              const isActive = archActive === arq.id;
              return (
                <button
                  key={arq.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setArchActive(arq.id as 'resnet' | 'vit')}
                  style={{
                    flex: 1,
                    appearance: 'none',
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: 'none',
                    padding: 'clamp(18px, 2.2vw, 28px) clamp(20px, 2.4vw, 32px)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'inherit',
                    borderBottom: isActive ? `3px solid ${arq.accent}` : '3px solid transparent',
                    transition: 'all 220ms ease-out',
                  }}
                >
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.28em',
                      color: isActive ? arq.accent : 'rgba(255,255,255,0.5)',
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {arq.paradigma}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: 500,
                      color: '#ffffff',
                      letterSpacing: '-0.014em',
                    }}
                  >
                    {arq.nombre}
                  </div>
                </button>
              );
            })}
          </div>

          {/* content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={archActive}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: ENTER }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
                gap: 'clamp(20px, 3vw, 40px)',
                padding: 'clamp(28px, 3.4vw, 48px)',
              }}
            >
              {/* SVG diagram */}
              <div>
                {archActive === 'resnet' ? <ResNetDiagram /> : <ViTDiagram />}
              </div>

              {/* text */}
              {(() => {
                const arq = ARQUITECTURAS.find((a) => a.id === archActive)!;
                return (
                  <div>
                    <div
                      className="font-mono uppercase"
                      style={{
                        fontSize: 11.5,
                        letterSpacing: '0.32em',
                        color: arq.accent,
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {arq.autor} · {arq.anio}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(15px, 1.4vw, 17px)',
                        lineHeight: 1.55,
                        color: 'rgba(255,255,255,0.86)',
                        margin: '0 0 24px 0',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {arq.detalle}
                    </p>
                    <div style={{ display: 'grid', gap: 14 }}>
                      <FortDebList items={arq.fortalezas} title="Fortalezas" color="#7ed1be" />
                      <FortDebList items={arq.limitaciones} title="Limitaciones" color="rgba(255,255,255,0.6)" muted />
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* 03 · SSL                                                    */}
        {/* ════════════════════════════════════════════════════════════ */}
        <FrenteHeader n="03" titulo="Self-Supervised Learning" color="#ffbbfc" descripcion="Sin etiquetas · SimCLR contrastivo · DINO student–teacher." />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.84)',
            margin: '0 0 40px 0',
            letterSpacing: '-0.005em',
            maxWidth: '64ch',
          }}
        >
          El aprendizaje autosupervisado define una tarea pretexto a partir de las imágenes mismas, sin etiquetas externas. Las{' '}
          <span style={{ color: '#ffbbfc', fontWeight: 500 }}>representaciones aprendidas</span> se transfieren después a tareas posteriores con pocas etiquetas
          <Sup n={1} refs={['krishnan-2022']} tone="white" />.
        </motion.p>

        {/* SSL view toggle */}
        <div style={{ marginBottom: 28 }}>
          <div
            role="tablist"
            aria-label="Método SSL"
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 999,
              padding: 3,
              gap: 2,
            }}
          >
            {[
              { id: 'simclr' as const, label: 'SimCLR · Contrastive' },
              { id: 'dino' as const, label: 'DINO · Student–Teacher' },
            ].map((opt) => {
              const active = sslView === opt.id;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSslView(opt.id)}
                  style={{
                    appearance: 'none',
                    background: active ? '#ffffff' : 'transparent',
                    color: active ? '#0a0b0c' : '#ffffff',
                    border: 'none',
                    borderRadius: 999,
                    padding: '10px 22px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            padding: 'clamp(28px, 3.4vw, 48px)',
            marginBottom: 48,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={sslView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: ENTER }}
            >
              {sslView === 'simclr' ? <SimCLRBlock /> : <DINOBlock />}
            </motion.div>
          </AnimatePresence>
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
            borderTop: '1px solid rgba(255,255,255,0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 500,
          }}
        >
          <span>clínico · técnico · SSL</span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>continúa en §07</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

function FrenteHeader({ n, titulo, color, descripcion }: { n: string; titulo: string; color: string; descripcion: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: ENTER }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.22fr) minmax(0, 1.78fr)',
        gap: 'clamp(20px, 3vw, 40px)',
        alignItems: 'baseline',
        marginBottom: 'clamp(28px, 3vw, 44px)',
        paddingTop: 32,
        borderTop: `1px solid ${color}40`,
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 'clamp(56px, 7vw, 100px)',
          fontWeight: 200,
          color: color,
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
        }}
      >
        {n}
      </div>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 500,
            color: '#ffffff',
            letterSpacing: '-0.022em',
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {titulo}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            color: 'rgba(255,255,255,0.65)',
            margin: '10px 0 0 0',
            letterSpacing: '-0.003em',
          }}
        >
          {descripcion}
        </p>
      </div>
    </motion.div>
  );
}

function FortDebList({ title, items, color, muted = false }: { title: string; items: readonly string[]; color: string; muted?: boolean }) {
  return (
    <div>
      <div
        className="font-mono uppercase"
        style={{ fontSize: 10.5, letterSpacing: '0.28em', color, fontWeight: 700, marginBottom: 8 }}
      >
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(13.5px, 1.2vw, 15px)',
              color: muted ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.88)',
              lineHeight: 1.4,
              letterSpacing: '-0.003em',
              paddingLeft: 14,
              position: 'relative',
            }}
          >
            <span style={{ position: 'absolute', left: 0, color, fontWeight: 700 }}>·</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResNetDiagram() {
  return (
    <svg viewBox="0 0 480 260" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="rn-block" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#abcbf9" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#abcbf9" stopOpacity="0.06" />
        </linearGradient>
        <marker id="rn-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0,0 L10,6 L0,12 z" fill="#abcbf9" />
        </marker>
      </defs>

      {/* input */}
      <rect x="20" y="110" width="60" height="40" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <text x="50" y="135" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">image</text>

      {/* blocks */}
      {[110, 200, 290, 380].map((x, i) => (
        <g key={i}>
          <rect x={x} y="90" width="60" height="80" rx="6" fill="url(#rn-block)" stroke="#abcbf9" strokeOpacity="0.6" strokeWidth="1" />
          <text x={x + 30} y="120" textAnchor="middle" fill="#abcbf9" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">Conv</text>
          <text x={x + 30} y="138" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="9">+BN</text>
          <text x={x + 30} y="154" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="9">+ReLU</text>
        </g>
      ))}

      {/* skip connections */}
      {[110, 200, 290].map((x, i) => (
        <path
          key={`skip-${i}`}
          d={`M ${x + 60} 130 Q ${x + 105} 60, ${x + 150} 130`}
          stroke="#7ed1be"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 3"
        />
      ))}

      {/* arrows */}
      {[80, 170, 260, 350].map((x, i) => (
        <line key={`a-${i}`} x1={x} y1="130" x2={x + 30} y2="130" stroke="#abcbf9" strokeWidth="1.4" markerEnd="url(#rn-arrow)" />
      ))}

      {/* output */}
      <text x="440" y="130" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">→ feat</text>

      {/* skip label */}
      <text x="240" y="50" textAnchor="middle" fill="#7ed1be" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" letterSpacing="0.1em">
        SKIP CONNECTIONS
      </text>

      {/* caption */}
      <text x="240" y="220" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter, sans-serif" fontSize="11">
        Bloques convolucionales con residual: y = F(x) + x
      </text>
    </svg>
  );
}

function ViTDiagram() {
  return (
    <svg viewBox="0 0 480 260" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <marker id="vt-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0,0 L10,6 L0,12 z" fill="#ffbbfc" />
        </marker>
      </defs>

      {/* image grid (4x4 patches) */}
      <g transform="translate(20, 40)">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`p-${row}-${col}`}
              x={col * 22}
              y={row * 22}
              width="20"
              height="20"
              fill={`rgba(255,187,252,${0.1 + (row + col) * 0.04})`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
            />
          ))
        )}
        <text x="44" y="115" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="9">
          16 patches
        </text>
      </g>

      {/* arrow to tokens */}
      <line x1="115" y1="80" x2="160" y2="80" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#vt-arrow)" />
      <text x="137" y="70" textAnchor="middle" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">linear</text>

      {/* token sequence */}
      <g transform="translate(170, 50)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`t-${i}`}>
            <rect x={i * 18} y="0" width="14" height="60" rx="2" fill="rgba(255,187,252,0.18)" stroke="#ffbbfc" strokeWidth="0.7" strokeOpacity="0.6" />
            <text x={i * 18 + 7} y="36" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontSize="8">t{i}</text>
          </g>
        ))}
        <text x="55" y="78" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="9">
          token seq
        </text>
      </g>

      {/* arrow to attention */}
      <line x1="290" y1="80" x2="330" y2="80" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#vt-arrow)" />

      {/* multi-head attention */}
      <g transform="translate(340, 30)">
        <rect x="0" y="0" width="100" height="100" rx="8" fill="rgba(255,187,252,0.06)" stroke="#ffbbfc" strokeWidth="1" />
        {[0, 1, 2].map((i) => (
          <line
            key={`h-${i}`}
            x1="20"
            y1={30 + i * 20}
            x2="80"
            y2={30 + i * 20}
            stroke="#ffbbfc"
            strokeWidth="1"
            strokeOpacity="0.5 - i*0.1"
          />
        ))}
        <text x="50" y="20" textAnchor="middle" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
          MHA
        </text>
        <text x="50" y="118" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="9">
          multi-head attn
        </text>
      </g>

      {/* labels */}
      <text x="240" y="200" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontFamily="Inter, sans-serif" fontSize="11">
        Imagen → patches → tokens → atención global
      </text>
    </svg>
  );
}

function SimCLRBlock() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: 'clamp(20px, 3vw, 40px)',
        alignItems: 'start',
      }}
    >
      <div>
        <SimCLRDiagram />
      </div>
      <div>
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 11.5,
            letterSpacing: '0.32em',
            color: '#ffbbfc',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Chen et al. · 2020
        </div>
        <h4
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 500,
            color: '#ffffff',
            margin: '0 0 14px 0',
            letterSpacing: '-0.018em',
            lineHeight: 1.1,
          }}
        >
          Contrastive Learning
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.86)',
            margin: 0,
            letterSpacing: '-0.005em',
          }}
        >
          Genera dos vistas aumentadas de cada imagen. La pérdida acerca las vistas de la misma imagen y aleja las de imágenes distintas. Requiere batch grande para muestrear negativos.
        </p>
      </div>
    </div>
  );
}

function SimCLRDiagram() {
  return (
    <svg viewBox="0 0 460 280" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <marker id="sc-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0,0 L10,6 L0,12 z" fill="#ffbbfc" />
        </marker>
      </defs>

      {/* source image */}
      <rect x="20" y="120" width="50" height="50" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <text x="45" y="150" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">img</text>

      {/* augmentations split */}
      <line x1="70" y1="145" x2="110" y2="70" stroke="rgba(255,187,252,0.6)" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />
      <line x1="70" y1="145" x2="110" y2="220" stroke="rgba(255,187,252,0.6)" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />
      <text x="78" y="105" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">aug</text>
      <text x="78" y="195" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">aug</text>

      {/* augmented views */}
      <rect x="120" y="50" width="46" height="46" rx="4" fill="rgba(255,187,252,0.12)" stroke="#ffbbfc" strokeWidth="1" />
      <text x="143" y="77" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="9">v₁</text>

      <rect x="120" y="200" width="46" height="46" rx="4" fill="rgba(255,187,252,0.12)" stroke="#ffbbfc" strokeWidth="1" />
      <text x="143" y="227" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="9">v₂</text>

      {/* encoder */}
      <rect x="190" y="50" width="60" height="46" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <text x="220" y="76" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">encoder</text>

      <rect x="190" y="200" width="60" height="46" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <text x="220" y="226" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">encoder</text>

      <line x1="166" y1="73" x2="190" y2="73" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />
      <line x1="166" y1="223" x2="190" y2="223" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />

      {/* projector */}
      <rect x="270" y="50" width="56" height="46" rx="6" fill="rgba(255,187,252,0.10)" stroke="#ffbbfc" strokeWidth="1" />
      <text x="298" y="76" textAnchor="middle" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">proj</text>

      <rect x="270" y="200" width="56" height="46" rx="6" fill="rgba(255,187,252,0.10)" stroke="#ffbbfc" strokeWidth="1" />
      <text x="298" y="226" textAnchor="middle" fill="#ffbbfc" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">proj</text>

      <line x1="250" y1="73" x2="270" y2="73" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />
      <line x1="250" y1="223" x2="270" y2="223" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />

      {/* embeddings */}
      <circle cx="360" cy="73" r="10" fill="#ffbbfc" />
      <text x="360" y="77" textAnchor="middle" fill="#0a0b0c" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">z₁</text>
      <circle cx="360" cy="223" r="10" fill="#ffbbfc" />
      <text x="360" y="227" textAnchor="middle" fill="#0a0b0c" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">z₂</text>

      <line x1="326" y1="73" x2="350" y2="73" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />
      <line x1="326" y1="223" x2="350" y2="223" stroke="#ffbbfc" strokeWidth="1.4" markerEnd="url(#sc-arrow)" />

      {/* contrastive loss */}
      <path d="M 360 83 Q 410 148, 360 213" stroke="#fce88b" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <text x="430" y="152" textAnchor="middle" fill="#fce88b" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
        sim
      </text>
      <text x="430" y="165" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="9">
        z₁ ≈ z₂
      </text>
    </svg>
  );
}

function DINOBlock() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: 'clamp(20px, 3vw, 40px)',
        alignItems: 'start',
      }}
    >
      <div>
        <DINODiagram />
      </div>
      <div>
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 11.5,
            letterSpacing: '0.32em',
            color: '#fce88b',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Caron et al. · 2021
        </div>
        <h4
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 500,
            color: '#ffffff',
            margin: '0 0 14px 0',
            letterSpacing: '-0.018em',
            lineHeight: 1.1,
          }}
        >
          Student–Teacher
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.86)',
            margin: 0,
            letterSpacing: '-0.005em',
          }}
        >
          Student aprende por gradiente. Teacher se actualiza con media móvil exponencial (EMA) del student. El student predice la salida del teacher. No requiere pares negativos.
        </p>
      </div>
    </div>
  );
}

function DINODiagram() {
  return (
    <svg viewBox="0 0 460 280" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <marker id="dn-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0,0 L10,6 L0,12 z" fill="#fce88b" />
        </marker>
        <marker id="dn-ema" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L8,5 L0,10 z" fill="#7ed1be" />
        </marker>
      </defs>

      {/* image */}
      <rect x="20" y="120" width="50" height="50" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <text x="45" y="150" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">img</text>

      {/* 2 augmentations */}
      <line x1="70" y1="135" x2="110" y2="60" stroke="#fce88b" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />
      <line x1="70" y1="160" x2="110" y2="220" stroke="#fce88b" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />
      <text x="78" y="95" fill="#fce88b" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">aug</text>
      <text x="78" y="195" fill="#fce88b" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">aug</text>

      {/* views */}
      <rect x="120" y="40" width="44" height="44" rx="4" fill="rgba(252,232,139,0.16)" stroke="#fce88b" strokeWidth="1" />
      <text x="142" y="66" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="9">v₁</text>

      <rect x="120" y="200" width="44" height="44" rx="4" fill="rgba(252,232,139,0.16)" stroke="#fce88b" strokeWidth="1" />
      <text x="142" y="226" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="JetBrains Mono, monospace" fontSize="9">v₂</text>

      {/* STUDENT branch (top) */}
      <rect x="200" y="40" width="80" height="44" rx="6" fill="rgba(252,232,139,0.10)" stroke="#fce88b" strokeWidth="1" />
      <text x="240" y="59" textAnchor="middle" fill="#fce88b" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">STUDENT</text>
      <text x="240" y="74" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontSize="8">gradient</text>

      <line x1="164" y1="62" x2="200" y2="62" stroke="#fce88b" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />

      {/* TEACHER branch (bottom) */}
      <rect x="200" y="200" width="80" height="44" rx="6" fill="rgba(126,209,190,0.10)" stroke="#7ed1be" strokeWidth="1" />
      <text x="240" y="219" textAnchor="middle" fill="#7ed1be" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">TEACHER</text>
      <text x="240" y="234" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontSize="8">EMA · frozen</text>

      <line x1="164" y1="222" x2="200" y2="222" stroke="#7ed1be" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />

      {/* outputs */}
      <circle cx="320" cy="62" r="10" fill="#fce88b" />
      <text x="320" y="66" textAnchor="middle" fill="#0a0b0c" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">p₁</text>
      <line x1="280" y1="62" x2="310" y2="62" stroke="#fce88b" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />

      <circle cx="320" cy="222" r="10" fill="#7ed1be" />
      <text x="320" y="226" textAnchor="middle" fill="#0a0b0c" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">q₂</text>
      <line x1="280" y1="222" x2="310" y2="222" stroke="#7ed1be" strokeWidth="1.4" markerEnd="url(#dn-arrow)" />

      {/* cross-entropy loss between p1 and q2 */}
      <path d="M 320 72 Q 380 142, 320 212" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <text x="400" y="138" textAnchor="middle" fill="#ffffff" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
        CE
      </text>
      <text x="400" y="152" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="9">
        p₁ ↔ q₂
      </text>

      {/* EMA update arrow from student to teacher */}
      <path d="M 240 84 Q 150 145, 240 200" stroke="#7ed1be" strokeWidth="1" fill="none" strokeDasharray="2 4" markerEnd="url(#dn-ema)" opacity="0.55" />
      <text x="118" y="140" textAnchor="middle" fill="#7ed1be" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">
        EMA
      </text>
      <text x="118" y="152" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="8">
        update
      </text>
    </svg>
  );
}
