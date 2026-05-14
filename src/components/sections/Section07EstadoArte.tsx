// ─────────────────────────────────────────────────────────────────────────
// §07 · Estado del arte · cream journal con tinte verdoso.
//
// 1. Hero · título crítico
// 2. Panorama internacional · 5 papers landmark
// 3. Panorama nacional · 3 observaciones críticas
// 4. Comparación crítica · pull-quote
// 5. Vacío investigativo · split problema/propuesta
// ─────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

const PAPERS = [
  {
    autor: 'Esteva et al.',
    anio: '2017',
    venue: 'Nature',
    tag: 'CNN landmark',
    aporte: 'Inception v3 iguala a 21 dermatólogos sobre 129.450 imágenes.',
    accent: '#0d4ea8',
  },
  {
    autor: 'Tschandl et al.',
    anio: '2018',
    venue: 'Sci. Data',
    tag: 'Dataset HAM10000',
    aporte: '10.015 dermatoscopias multicéntricas. Referencia obligada para evaluar.',
    accent: '#8a3f85',
  },
  {
    autor: 'He et al.',
    anio: '2016',
    venue: 'CVPR',
    tag: 'ResNet',
    aporte: 'Conexiones residuales: profundidad sin degradación.',
    accent: '#00543d',
  },
  {
    autor: 'Chen et al.',
    anio: '2020',
    venue: 'ICML',
    tag: 'SimCLR · contrastivo',
    aporte: 'Representaciones sin etiquetas igualan al supervisado en ImageNet.',
    accent: '#a68a00',
  },
  {
    autor: 'Azizi et al.',
    anio: '2021',
    venue: 'ICCV',
    tag: 'SSL médico',
    aporte: 'SSL contrastivo supera transferencia desde ImageNet en imagen médica.',
    accent: '#b35135',
  },
] as const;

const OBSERVACIONES_NACIONAL = [
  {
    title: 'Foco fuera de dermatología',
    body: 'La investigación nacional en deep learning médico apunta sobre todo a radiología y patología. Dermatología queda relativamente al margen.',
  },
  {
    title: 'Dataset local · dominio cercano',
    body: 'CO2-Wounds-V2 (UIS) aporta imágenes colombianas de heridas crónicas captadas con celulares. Dominio cercano a dermatología, calidad heterogénea frente al estándar dermatoscópico.',
  },
  {
    title: 'SSL · producción emergente',
    body: 'El grupo HDSP-UIS (Arguello, Sanchez) ha publicado trabajo en SSL e imagen biomédica regional, pero no constituye aún línea curricular consolidada.',
  },
] as const;

export default function Section07EstadoArte() {
  return (
    <section
      id="section-estado-arte"
      aria-labelledby="art-h"
      style={{
        background: '#eef0ec',
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
            'radial-gradient(ellipse at 95% 0%, rgba(0,84,61,0.06) 0%, transparent 50%), radial-gradient(ellipse at 5% 100%, rgba(166,138,0,0.05) 0%, transparent 55%)',
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
            §07 · estado del arte
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
          >
            internacional · nacional · vacío
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
            id="art-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '14ch',
            }}
          >
            Una década de avances. <span style={{ color: '#00543d', fontWeight: 500 }}>Una brecha local.</span>
          </h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 01 · PANORAMA INTERNACIONAL                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <FrenteHeader n="01" titulo="Panorama internacional" color="#0d4ea8" descripcion="Cinco trabajos landmark · supervisado · datasets · SSL." />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            lineHeight: 1.5,
            color: '#0a0b0c',
            margin: '0 0 40px 0',
            letterSpacing: '-0.008em',
            maxWidth: '46ch',
          }}
        >
          La clasificación con redes profundas se consolidó tras 2017. La transición al <span style={{ color: '#00543d', fontWeight: 500 }}>SSL</span> responde a la escasez de etiquetas expertas.
        </motion.p>

        {/* papers grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(14px, 2vw, 24px)',
            marginBottom: 'clamp(64px, 8vw, 112px)',
          }}
        >
          {PAPERS.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.6, ease: ENTER, delay: 0.05 + i * 0.08 }}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(10,11,12,0.14)',
                borderRadius: 14,
                padding: 'clamp(24px, 2.8vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 260,
              }}
            >
              {/* año mega-numeral en background */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 'clamp(-8px, -1vw, -18px)',
                  right: 'clamp(-4px, -0.4vw, -8px)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(72px, 9vw, 130px)',
                  fontWeight: 200,
                  color: `${p.accent}18`,
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {p.anio}
              </div>

              {/* venue + dot */}
              <div className="flex items-center gap-2" style={{ position: 'relative', zIndex: 1 }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: p.accent,
                    display: 'inline-block',
                  }}
                />
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.28em',
                    color: p.accent,
                    fontWeight: 700,
                  }}
                >
                  {p.venue}
                </span>
              </div>

              {/* autor */}
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(20px, 1.9vw, 24px)',
                  fontWeight: 500,
                  color: '#0a0b0c',
                  margin: 0,
                  letterSpacing: '-0.018em',
                  lineHeight: 1.15,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.autor}
              </h4>

              {/* tag */}
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: '#0a0b0c',
                  fontWeight: 600,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderTop: '1px solid rgba(10,11,12,0.18)',
                  borderBottom: '1px solid rgba(10,11,12,0.18)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.tag}
              </div>

              {/* aporte */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  lineHeight: 1.45,
                  color: '#0a0b0c',
                  margin: 0,
                  letterSpacing: '-0.005em',
                  position: 'relative',
                  zIndex: 1,
                  marginTop: 'auto',
                }}
              >
                {p.aporte}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 02 · PANORAMA NACIONAL                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <FrenteHeader n="02" titulo="Panorama nacional" color="#8a3f85" descripcion="Producción colombiana en SSL dermatológico · diagnóstico crítico." />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            lineHeight: 1.5,
            color: '#0a0b0c',
            margin: '0 0 40px 0',
            letterSpacing: '-0.008em',
            maxWidth: '48ch',
          }}
        >
          Revisión en SciELO, Redalyc y repositorios institucionales: producción local <span style={{ color: '#8a3f85', fontWeight: 500 }}>limitada</span> en SSL dermatológico.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(14px, 2vw, 24px)',
            marginBottom: 'clamp(64px, 8vw, 112px)',
          }}
        >
          {OBSERVACIONES_NACIONAL.map((obs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.6, ease: ENTER, delay: 0.1 + i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(138,63,133,0.25)',
                borderRadius: 14,
                padding: 'clamp(24px, 2.8vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 'clamp(40px, 4.6vw, 64px)',
                  fontWeight: 200,
                  color: '#8a3f85',
                  letterSpacing: '-0.045em',
                  lineHeight: 0.85,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(18px, 1.6vw, 21px)',
                  fontWeight: 500,
                  color: '#0a0b0c',
                  margin: 0,
                  letterSpacing: '-0.014em',
                  lineHeight: 1.18,
                }}
              >
                {obs.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14.5px, 1.3vw, 16px)',
                  lineHeight: 1.5,
                  color: 'rgba(10,11,12,0.75)',
                  margin: 0,
                  letterSpacing: '-0.003em',
                }}
              >
                {obs.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 03 · COMPARACIÓN CRÍTICA · pull-quote                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: ENTER }}
          style={{
            margin: '0 0 clamp(64px, 8vw, 112px) 0',
            padding: 'clamp(40px, 5vw, 72px) clamp(28px, 3.4vw, 56px)',
            border: '1px solid rgba(10,11,12,0.18)',
            borderRadius: 16,
            background: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* comilla decorativa gigante */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 'clamp(-16px, -1.6vw, -24px)',
              left: 'clamp(16px, 2.4vw, 32px)',
              fontFamily: 'serif',
              fontSize: 'clamp(160px, 18vw, 280px)',
              color: 'rgba(10,11,12,0.06)',
              lineHeight: 0.85,
              pointerEvents: 'none',
              userSelect: 'none',
              fontWeight: 700,
            }}
          >
            “
          </div>

          <div
            className="font-mono uppercase"
            style={{
              fontSize: 12.5,
              letterSpacing: '0.32em',
              color: '#0a0b0c',
              fontWeight: 700,
              marginBottom: 24,
              position: 'relative',
              zIndex: 1,
            }}
          >
            ◆ Comparación crítica
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(24px, 3vw, 56px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div>
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10.5,
                  letterSpacing: '0.32em',
                  color: '#00543d',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Afuera
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.014em',
                  fontWeight: 400,
                  color: '#0a0b0c',
                  margin: 0,
                }}
              >
                Representaciones autosupervisadas multimodales sobre HAM10000 e ISIC.
              </p>
            </div>
            <div>
              <div
                className="font-mono uppercase"
                style={{
                  fontSize: 10.5,
                  letterSpacing: '0.32em',
                  color: '#8a3f85',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Aquí
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.014em',
                  fontWeight: 400,
                  color: '#0a0b0c',
                  margin: 0,
                }}
              >
                Rezago metodológico, sin cohortes locales, sin diálogo clínica–ingeniería.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              paddingTop: 18,
              borderTop: '1px dashed rgba(10,11,12,0.2)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              lineHeight: 1.5,
              color: 'rgba(10,11,12,0.7)',
              letterSpacing: '-0.003em',
              position: 'relative',
              zIndex: 1,
              fontStyle: 'italic',
            }}
          >
            La brecha es estructural, no sólo técnica.
          </div>
        </motion.blockquote>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 04 · VACÍO INVESTIGATIVO · split                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <FrenteHeader n="03" titulo="Vacío investigativo" color="#00543d" descripcion="Lo que falta · cómo este proyecto aporta." />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 0,
            border: '1px solid rgba(10,11,12,0.16)',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#ffffff',
            marginBottom: 56,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.1 }}
            style={{
              padding: 'clamp(28px, 3vw, 44px)',
              borderRight: '1px solid rgba(10,11,12,0.12)',
              borderTop: '3px solid rgba(10,11,12,0.5)',
            }}
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 12,
                letterSpacing: '0.32em',
                color: 'rgba(10,11,12,0.7)',
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              ◌ Problema central
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(19px, 1.8vw, 23px)',
                lineHeight: 1.4,
                color: '#0a0b0c',
                margin: 0,
                letterSpacing: '-0.012em',
                fontWeight: 400,
              }}
            >
              La literatura revisada no documenta aplicaciones SSL en <span style={{ fontWeight: 600 }}>lesiones pigmentarias / melanoma</span> con foco santandereano. Existe trabajo afín en heridas crónicas (CO2-Wounds-V2, UIS) que valida la viabilidad metodológica regional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.7, ease: ENTER, delay: 0.2 }}
            style={{
              padding: 'clamp(28px, 3vw, 44px)',
              background: '#fafaf6',
              borderTop: '3px solid #00543d',
            }}
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: 12,
                letterSpacing: '0.32em',
                color: '#00543d',
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              ◆ Propuesta del proyecto
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(19px, 1.8vw, 23px)',
                lineHeight: 1.4,
                color: '#0a0b0c',
                margin: 0,
                letterSpacing: '-0.012em',
                fontWeight: 400,
              }}
            >
              Adaptar <span style={{ color: '#00543d', fontWeight: 600 }}>SSL contrastivo</span> al dominio dermatoscópico usando HAM10000 como base. Medir cómo se comporta al aplicarlo al contexto santandereano.
            </p>
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
          <span>5 papers · 3 observaciones · 1 vacío</span>
          <span style={{ color: 'rgba(10,11,12,0.75)', fontWeight: 600 }}>continúa →</span>
        </motion.div>
      </div>
    </section>
  );
}

function FrenteHeader({
  n,
  titulo,
  color,
  descripcion,
}: {
  n: string;
  titulo: string;
  color: string;
  descripcion: string;
}) {
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
        borderTop: `1px solid ${color}50`,
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
            fontSize: 'clamp(26px, 3vw, 38px)',
            fontWeight: 500,
            color: '#0a0b0c',
            letterSpacing: '-0.022em',
            margin: 0,
            lineHeight: 1.06,
          }}
        >
          {titulo}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            color: 'rgba(10,11,12,0.62)',
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
