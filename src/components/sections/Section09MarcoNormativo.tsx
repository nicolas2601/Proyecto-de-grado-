import { motion } from 'framer-motion';
import { MARCO_NORMATIVO } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Section09MarcoNormativo() {
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
            §09 / MARCO NORMATIVO
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
            Datos sensibles, <span className="hl-teal">regulación clara</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6"
            style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--charcoal)', maxWidth: '55ch' }}
          >
            El proyecto cumple normativa colombiana e internacional para el manejo ético de imágenes médicas.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mx-auto relative" style={{ maxWidth: 980 }}>
            <div className="card card-paper relative overflow-hidden" style={{ padding: 0, borderRadius: 24, border: '1px solid rgba(15,44,69,0.18)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div style={{ background: 'var(--navy)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>Privacidad y datos sensibles</div>
                </div>
                <div style={{ background: 'var(--teal)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.9)' }}>Marco de telesalud</div>
                </div>
                <div style={{ background: 'var(--orange)', padding: '20px 24px' }}>
                  <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.95)' }}>Ética y mitigación de sesgos</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-7 flex flex-col gap-4" style={{ borderRight: '1px solid rgba(15,44,69,0.12)' }}>
                  <span className="pill" style={{ fontFamily: 'var(--font-mono)', alignSelf: 'flex-start', background: 'rgba(15,44,69,0.08)', color: 'var(--navy)', fontSize: '12px' }}>
                    Ley 1581 / 2012
                  </span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--navy)' }}>—</span><span>El modelo algorítmico no requiere datos identificables del paciente.</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--navy)' }}>—</span><span>El prototipo de laboratorio no almacenará las imágenes una vez evaluadas.</span></li>
                  </ul>
                </div>

                <div className="p-7 flex flex-col gap-4" style={{ borderRight: '1px solid rgba(15,44,69,0.12)' }}>
                  <span className="pill" style={{ fontFamily: 'var(--font-mono)', alignSelf: 'flex-start', background: 'rgba(31,140,136,0.12)', color: 'var(--teal)', fontSize: '12px' }}>
                    Ley 1419 / 2010
                  </span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--teal)' }}>—</span><span>La herramienta se enmarca estrictamente como "apoyo a la decisión clínica".</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--teal)' }}>—</span><span>La responsabilidad diagnóstica final y vinculante recae siempre en el médico especialista humano.</span></li>
                  </ul>
                </div>

                <div className="p-7 flex flex-col gap-4">
                  <span className="pill" style={{ fontFamily: 'var(--font-mono)', alignSelf: 'flex-start', background: 'rgba(242,107,58,0.12)', color: 'var(--orange)', fontSize: '12px' }}>
                    Marco MinTIC / UNESCO
                  </span>
                  <ul className="flex flex-col gap-3" style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--charcoal)' }}>
                    <li className="flex gap-2"><span style={{ color: 'var(--orange)' }}>—</span><span>Reconocimiento transparente del sesgo demográfico inherente en los datasets públicos.</span></li>
                    <li className="flex gap-2"><span style={{ color: 'var(--orange)' }}>—</span><span>Identificación de la subrepresentación de fototipos oscuros (IV-V) prevalentes en la población colombiana.</span></li>
                  </ul>
                </div>
              </div>

              <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute left-0 right-0 mx-auto" style={{ bottom: -22, width: 160, height: 30, filter: 'drop-shadow(0 4px 6px rgba(15,44,69,0.08))' }} aria-hidden="true">
                <path d="M0 0 L200 0 L100 40 Z" fill="var(--paper)" stroke="rgba(15,44,69,0.18)" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow mb-6">Referentes internacionales</motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MARCO_NORMATIVO.internacional.map((n) => (
              <motion.div
                key={n.sigla}
                variants={fadeUp}
                className="card card-paper p-6 flex flex-col gap-3 hover-reveal"
                data-reveal={n.detalle}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(15,44,69,0.06)', color: 'var(--navy)', fontSize: '12px' }}>
                    {n.sigla}
                  </span>
                  <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--navy)' }}>{n.titulo}</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--charcoal)' }}>{n.detalle}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="card card-navy p-8 md:p-10">
            <div className="eyebrow mb-4" style={{ color: 'rgba(199, 232, 230, 0.9)' }}>Ética aplicada</div>
            <p style={{ fontSize: 'clamp(18px, 1.4vw, 20px)', lineHeight: 1.5, color: '#fff', maxWidth: '70ch' }}>
              {MARCO_NORMATIVO.etica}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
