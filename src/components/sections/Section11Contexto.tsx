import { motion } from 'framer-motion';
import { MARCO_CONTEXTUAL, PROJECT } from '@/data/content';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const IconBuilding = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="8" y="10" width="24" height="24" stroke={color} strokeWidth="1.4" />
    <rect x="13" y="15" width="4" height="4" stroke={color} strokeWidth="1" />
    <rect x="23" y="15" width="4" height="4" stroke={color} strokeWidth="1" />
    <rect x="13" y="23" width="4" height="4" stroke={color} strokeWidth="1" />
    <rect x="23" y="23" width="4" height="4" stroke={color} strokeWidth="1" />
    <path d="M4 34h32" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M20 4l-8 6h16z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const IconMap = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M20 4C13 4 9 9 9 14.5c0 7 11 21 11 21s11-14 11-21C31 9 27 4 20 4z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="20" cy="14.5" r="3.5" stroke={color} strokeWidth="1.4" />
  </svg>
);

const IconDoctor = ({ color }: { color: string }) => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="12" r="5" stroke={color} strokeWidth="1.4" />
    <path d="M8 34c0-6 5-10 12-10s12 4 12 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M20 24v6M17 27h6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SantanderMap = () => (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa de Santander" style={{ width: '100%', height: 'auto', maxWidth: 320 }}>
    <path d="M80 30 L130 20 L180 28 L220 50 L240 90 L235 140 L210 180 L170 210 L120 215 L70 195 L50 160 L45 110 L60 60 Z" fill="rgba(15,44,69,0.04)" stroke="var(--navy)" strokeWidth="1.2" strokeLinejoin="round" />
    <ellipse cx="140" cy="105" rx="28" ry="20" fill="rgba(31,140,136,0.18)" stroke="var(--teal)" strokeWidth="1.4" strokeDasharray="3 4" />
    <circle cx="140" cy="105" r="5" fill="var(--orange)" />
    <circle cx="140" cy="105" r="9" fill="none" stroke="var(--orange)" strokeWidth="1.2" opacity="0.4" />
    <text x="155" y="100" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--navy)', fontWeight: 600 }}>BUCARAMANGA</text>
    <text x="155" y="112" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--teal)' }}>AMB</text>
    <text x="80" y="50" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--navy)', opacity: 0.5 }}>SANTANDER</text>
  </svg>
);

export default function Section11Contexto() {
  return (
    <section className="section bg-soft-navy">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="eyebrow-num mb-6">
            §11 / MARCO CONTEXTUAL
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              maxWidth: '24ch',
            }}
          >
            <strong style={{ fontWeight: 700 }}>Dónde, con quién y para quién.</strong>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.article variants={fadeUp} className="card card-paper p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="eyebrow" style={{ color: 'var(--teal)' }}>Contexto institucional</div>
              <div style={{ color: 'var(--navy)', opacity: 0.8 }}><IconBuilding color="currentColor" /></div>
            </div>
            <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--navy)' }}>
              Universidad Autónoma de Bucaramanga
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--charcoal)' }}>
              {MARCO_CONTEXTUAL.institucional.detalle}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(15,44,69,0.06)', color: 'var(--navy)', fontSize: '11px' }}>{PROJECT.program}</span>
              <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(15,44,69,0.06)', color: 'var(--navy)', fontSize: '11px' }}>{PROJECT.course}</span>
            </div>
          </motion.article>

          <motion.article variants={fadeUp} className="card card-teal-soft p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="eyebrow" style={{ color: 'var(--teal)' }}>Contexto regional</div>
              <div style={{ color: 'var(--teal)' }}><IconMap color="currentColor" /></div>
            </div>
            <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--navy)' }}>
              Santander / Colombia
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--navy)' }}>
              {MARCO_CONTEXTUAL.regional.detalle}
            </p>
            <span className="pill pill-orange self-start mt-auto" style={{ fontSize: '12px' }}>HIC / Hospital Internacional</span>
          </motion.article>

          <motion.article variants={fadeUp} className="card card-navy p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="eyebrow" style={{ color: 'rgba(199,232,230,0.9)' }}>Beneficiarios</div>
              <div style={{ color: 'rgba(255,255,255,0.85)' }}><IconDoctor color="currentColor" /></div>
            </div>
            <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#fff' }}>
              Médicos generales y dermatólogos
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
              {MARCO_CONTEXTUAL.poblacional.detalle}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', fontSize: '11px' }}>BCC</span>
              <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', fontSize: '11px' }}>SCC</span>
              <span className="pill" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', fontSize: '11px' }}>MEL</span>
            </div>
          </motion.article>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="card card-paper p-8 mb-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div style={{ flex: '0 0 auto' }}>
            <SantanderMap />
          </div>
          <div className="flex flex-col gap-3">
            <div className="eyebrow" style={{ color: 'var(--teal)' }}>Localización geográfica</div>
            <h4 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.2, color: 'var(--navy)' }}>
              Área Metropolitana de Bucaramanga
            </h4>
            <p style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--charcoal)', maxWidth: '50ch' }}>
              El proyecto se ancla en el departamento de Santander, con foco en el AMB como principal área de aplicación clínica del prototipo.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="hairline mb-4" />
          <p className="font-serif-it" style={{ fontSize: '16px', lineHeight: 1.55, color: 'var(--charcoal)', fontStyle: 'italic' }}>
            El contexto define el alcance / el alcance define los entregables.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
