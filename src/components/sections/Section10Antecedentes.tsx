import { motion } from 'framer-motion';
import { ANTECEDENTES_NIVEL } from '@/data/content';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

type Row = {
  enfoque: string;
  enfoqueBold?: boolean;
  tecnologia: string;
  datos: string;
  contexto: ReactNode;
  highlight?: boolean;
};

const TABLA_ROWS: Row[] = [
  {
    enfoque: 'PanDerm / DINO (Yan et al., 2025)',
    tecnologia: 'Arquitecturas SSL multimodales',
    datos: 'Requiere recursos masivos (2 M imágenes)',
    contexto: (
      <>
        Estado del Arte mundial, pero evaluado principalmente en poblaciones{' '}
        <strong style={{ fontWeight: 600 }}>caucásicas</strong> y hospitales de primer nivel.
      </>
    ),
  },
  {
    enfoque: 'U. Andes / U. Pamplona',
    tecnologia: 'Machine Learning clásico (SVM, KNN) y CNN',
    datos: 'Dependencia absoluta de etiquetas',
    contexto:
      'Logran alta precisión teórica, pero los procesos de anotación experta son costosos e inescalables en Colombia.',
  },
  {
    enfoque: 'Algoritmo de Tesis (Santander)',
    enfoqueBold: true,
    tecnologia: 'Algoritmo SSL + Fine-Tuning (TRL 4)',
    datos: 'Entrenado sin etiquetas masivas',
    contexto: (
      <>
        <strong style={{ fontWeight: 700, color: 'var(--navy)' }}>EL VACÍO CLÍNICO:</strong>{' '}
        Aplicación de SSL para superar la escasez de datos dermatológicos en entornos regionales de bajos recursos.
      </>
    ),
    highlight: true,
  },
];

const HEADERS = [
  'Enfoque de investigación',
  'Tecnología principal',
  'Requisito de datos',
  'Contexto y limitaciones',
];

export default function Section10Antecedentes() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow-num mb-6">
            §10 / ANTECEDENTES
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              maxWidth: '20ch',
            }}
          >
            Estado del arte: <span className="hl-orange">un vacío que cubrir</span>.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mb-24"
        >
          <div className="hidden md:block">
            <motion.div
              variants={fadeUp}
              className="card card-navy"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr',
                padding: '18px 24px',
                gap: '16px',
                borderRadius: '14px 14px 0 0',
              }}
            >
              {HEADERS.map((h) => (
                <div key={h} className="eyebrow" style={{ color: 'rgba(199,232,230,0.95)' }}>{h}</div>
              ))}
            </motion.div>

            {TABLA_ROWS.map((row, idx) => (
              <motion.div
                key={row.enfoque}
                variants={fadeUp}
                className={row.highlight ? 'card card-teal-soft' : 'card card-paper'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr',
                  padding: '22px 24px',
                  gap: '16px',
                  borderRadius: idx === TABLA_ROWS.length - 1 ? '0 0 14px 14px' : 0,
                  border: row.highlight ? '2px solid var(--teal)' : '1px solid rgba(15,44,69,0.1)',
                  borderTop: idx === 0 ? 'none' : undefined,
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: row.enfoqueBold ? 700 : 600, color: 'var(--navy)', lineHeight: 1.35 }}>
                  {row.enfoque}
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.45, color: 'var(--charcoal)' }}>{row.tecnologia}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.45, color: 'var(--charcoal)' }}>{row.datos}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.5, color: row.highlight ? 'var(--navy)' : 'var(--charcoal)' }}>
                  {row.contexto}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {TABLA_ROWS.map((row) => (
              <motion.div
                key={row.enfoque}
                variants={fadeUp}
                className={row.highlight ? 'card card-teal-soft' : 'card card-paper'}
                style={{ padding: '18px', border: row.highlight ? '2px solid var(--teal)' : '1px solid rgba(15,44,69,0.1)' }}
              >
                <div style={{ fontSize: '16px', fontWeight: row.enfoqueBold ? 700 : 600, color: 'var(--navy)', marginBottom: 12 }}>
                  {row.enfoque}
                </div>
                <div className="flex flex-col gap-2" style={{ fontSize: '13px' }}>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Tecnología</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.tecnologia}</div>
                  </div>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Datos</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.datos}</div>
                  </div>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--teal)' }}>Contexto</span>
                    <div style={{ color: 'var(--charcoal)', marginTop: 2 }}>{row.contexto}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="eyebrow" style={{ color: 'var(--teal)' }}>{ANTECEDENTES_NIVEL.internacional.titulo}</div>
            <div className="flex flex-col gap-3">
              {ANTECEDENTES_NIVEL.internacional.estudios.map((e) => (
                <div
                  key={e.nombre}
                  className="card card-paper p-5 flex flex-col gap-2"
                  style={e.destacado ? { borderLeft: '3px solid var(--teal)' } : undefined}
                >
                  <span className="pill" style={{ fontFamily: 'var(--font-mono)', alignSelf: 'flex-start', background: 'rgba(15,44,69,0.06)', color: 'var(--navy)', fontSize: '11px', padding: '2px 8px' }}>
                    {e.origen}
                  </span>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.2, color: 'var(--navy)' }}>{e.nombre}</h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--charcoal)' }}>{e.aporte}</p>
                  {'url' in e && e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--teal)', textDecoration: 'none', alignSelf: 'flex-start' }}
                    >
                      ieeexplore.ieee.org →
                    </a>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="card card-orange-soft p-5 mt-2" style={{ border: '1px solid rgba(242,107,58,0.25)' }}>
              <div className="eyebrow mb-2" style={{ color: 'var(--orange)' }}>Limitación</div>
              <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                {ANTECEDENTES_NIVEL.internacional.limitacion}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="eyebrow" style={{ color: 'var(--teal)' }}>{ANTECEDENTES_NIVEL.nacional.titulo}</div>
            <div className="card card-paper p-6 flex flex-col gap-4">
              <p style={{ fontSize: '16px', lineHeight: 1.55, color: 'var(--charcoal)' }}>
                {ANTECEDENTES_NIVEL.nacional.texto}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="pill pill-ghost" style={{ fontSize: '12px' }}>CNN supervisado</span>
                <span className="pill pill-ghost" style={{ fontSize: '12px' }}>ML tradicional</span>
                <span className="pill pill-orange" style={{ fontSize: '12px' }}>sin SSL</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="eyebrow" style={{ color: 'var(--teal)' }}>{ANTECEDENTES_NIVEL.valorAgregado.titulo}</div>
            <div className="card card-teal p-6 flex flex-col gap-4">
              <p style={{ fontSize: '17px', lineHeight: 1.55, color: '#fff' }}>
                {ANTECEDENTES_NIVEL.valorAgregado.texto}
              </p>
              <span className="pill pill-amber self-start">primera aplicación en Colombia</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
