import { motion, useReducedMotion } from 'framer-motion';
import { MARCO_CONTEXTUAL, PROJECT } from '@/data/content';
import BucaramangaMap from '@/components/ui/BucaramangaMap';
import { ENTER } from '@/lib/motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ENTER } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// Stagger 200ms entre las 3 cards principales
const triStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
};

const cardRise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: ENTER } },
};

// Card-navy con clip-path bottom→top
const navyReveal = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  show: {
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.78, ease: ENTER },
  },
};

const pillStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const pillItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: ENTER } },
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

// SVG Santander con animaciones path-draw + marker pulse + AMB zone
function SantanderMap({ reduced }: { reduced: boolean }) {
  // dasharray suficiente para el contorno
  const D = 900;
  const pathVariants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { strokeDashoffset: D, opacity: 0.6 },
        show: {
          strokeDashoffset: 0,
          opacity: 1,
          transition: { duration: 1.4, ease: ENTER },
        },
      };

  const ambVariants = reduced
    ? { hidden: { opacity: 0.6, scale: 1 }, show: { opacity: 0.6, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.94 },
        show: {
          opacity: 0.6,
          scale: 1,
          transition: { duration: 0.7, ease: ENTER, delay: 1.0 },
        },
      };

  const markerVariants = reduced
    ? { hidden: { opacity: 1, scale: 1 }, show: { opacity: 1, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: ENTER, delay: 1.3 },
        },
      };

  const labelVariants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5, ease: ENTER, delay: 1.5 } },
      };

  return (
    <motion.svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mapa de Santander"
      style={{ width: '100%', height: 'auto', maxWidth: 320 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.path
        d="M80 30 L130 20 L180 28 L220 50 L240 90 L235 140 L210 180 L170 210 L120 215 L70 195 L50 160 L45 110 L60 60 Z"
        fill="rgba(15,44,69,0.04)"
        stroke="var(--navy)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        style={{ strokeDasharray: D }}
        variants={pathVariants}
      />

      {/* AMB zona destacada teal */}
      <motion.g variants={ambVariants} style={{ transformOrigin: '140px 105px' }}>
        <ellipse
          cx="140"
          cy="105"
          rx="28"
          ry="20"
          fill="rgba(31,140,136,0.18)"
          stroke="var(--teal)"
          strokeWidth="1.4"
          strokeDasharray="3 4"
        />
      </motion.g>

      {/* Marker Bucaramanga con pulse infinite */}
      <motion.g variants={markerVariants} style={{ transformOrigin: '140px 105px' }}>
        <circle cx="140" cy="105" r="5" fill="var(--orange)" />
        {!reduced && (
          <motion.circle
            cx="140"
            cy="105"
            r="9"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="1.2"
            animate={{
              r: [9, 16, 9],
              opacity: [0.55, 0, 0.55],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
        {reduced && (
          <circle cx="140" cy="105" r="9" fill="none" stroke="var(--orange)" strokeWidth="1.2" opacity="0.4" />
        )}
      </motion.g>

      <motion.text
        x="155"
        y="100"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--navy)', fontWeight: 600 }}
        variants={labelVariants}
      >
        BUCARAMANGA
      </motion.text>
      <motion.text
        x="155"
        y="112"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'var(--teal)' }}
        variants={labelVariants}
      >
        AMB
      </motion.text>
      <motion.text
        x="80"
        y="50"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--navy)', opacity: 0.5 }}
        variants={labelVariants}
      >
        SANTANDER
      </motion.text>
    </motion.svg>
  );
}

export default function Section11Contexto() {
  const reduced = useReducedMotion() ?? false;

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
            §12 / MARCO CONTEXTUAL
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

        {/* 3 cards stagger 200ms */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={triStagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.article variants={cardRise} className="card card-paper p-8 flex flex-col gap-4">
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

          <motion.article variants={cardRise} className="card card-teal-soft p-8 flex flex-col gap-4">
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

          {/* Card navy con clip-path bottom→top + pills stagger */}
          <motion.article
            variants={navyReveal}
            className="card card-navy p-8 flex flex-col gap-4"
          >
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
            <motion.div
              className="flex flex-wrap gap-2 mt-auto"
              variants={pillStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {['BCC', 'SCC', 'MEL'].map((p) => (
                <motion.span
                  key={p}
                  variants={pillItem}
                  className="pill"
                  style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', fontSize: '11px' }}
                >
                  {p}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-10"
        >
          <div className="mb-5 flex items-baseline justify-between flex-wrap gap-3">
            <div>
              <div className="eyebrow" style={{ color: 'var(--teal)' }}>
                Localización geográfica
              </div>
              <h4
                style={{
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'var(--navy)',
                  marginTop: 4,
                }}
              >
                Área Metropolitana de Bucaramanga
              </h4>
            </div>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--color-graphite)',
              }}
            >
              7.12° N · 73.12° W · ~1.150 m s.n.m.
            </span>
          </div>
          <BucaramangaMap />
          <p
            style={{
              marginTop: 16,
              fontSize: 16,
              lineHeight: 1.55,
              color: 'var(--charcoal)',
              maxWidth: '64ch',
            }}
          >
            El proyecto se ancla en Santander, con foco en el AMB —
            Bucaramanga, Floridablanca, Girón y Piedecuesta— como principal
            área de aplicación clínica.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="hairline mb-4" />
          <p className="font-serif-it" style={{ fontSize: '16px', lineHeight: 1.55, color: 'var(--charcoal)', fontStyle: 'italic' }}>
            El contexto define el alcance · el alcance define los entregables.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
