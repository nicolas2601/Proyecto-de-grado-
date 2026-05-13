import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { JUSTIFICACION, JUSTIFICACION_RESUMEN } from '@/data/content';
import { Cite } from '@/components/ui/Cite';
import { ENTER } from '@/lib/motion';

const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: ENTER, delay },
});

// ── Icon set inline SVG 32px ──────────────────────────
function IconUsers({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="4" />
      <circle cx="22" cy="13" r="3" />
      <path d="M3 26c0-4 4-7 8-7s8 3 8 7" />
      <path d="M19 26c0-3 3-5 6-5s4 2 4 5" />
    </svg>
  );
}

function IconNetwork({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="8" r="2.4" />
      <circle cx="6" cy="24" r="2.4" />
      <circle cx="16" cy="16" r="2.6" />
      <circle cx="26" cy="8" r="2.4" />
      <circle cx="26" cy="24" r="2.4" />
      <path d="M8.3 9.4l5.5 5.2M8.3 22.6l5.5-5.2M18.2 14.6l5.6-5.2M18.2 17.4l5.6 5.2" />
    </svg>
  );
}

function IconDatabase({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="16" cy="8" rx="10" ry="3.5" />
      <path d="M6 8v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5V8" />
      <path d="M6 16v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-8" />
    </svg>
  );
}

function IconGearSpark({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="4" />
      <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.5 6.5l2.2 2.2M23.3 23.3l2.2 2.2M6.5 25.5l2.2-2.2M23.3 8.7l2.2-2.2" />
    </svg>
  );
}

function IconGraduation({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l14-6 14 6-14 6L2 12z" />
      <path d="M8 15v6c0 2 3.6 4 8 4s8-2 8-4v-6" />
      <path d="M28 13v8" />
    </svg>
  );
}

const QUAD_ICONS = [IconUsers, IconNetwork, IconGearSpark, IconDatabase];

// ── TiltCard · 3D tilt sutil basado en posición del mouse
function TiltCard({
  children,
  className,
  style,
  index,
  destacado,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index: number;
  destacado?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22 });
  const sy = useSpring(my, { stiffness: 220, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduced) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Diagonal stagger TL -> BR (index order 0,1,2,3 maps fine)
  const delay = 0.22 + index * 0.1;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: ENTER, delay }}
      style={{
        ...style,
        rotateX: reduced ? 0 : (rotateX as any),
        rotateY: reduced ? 0 : (rotateY as any),
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={className}
      // Avoid additional whileHover to keep tilt + entry isolated
    >
      <div style={{ transform: 'translateZ(0)' }}>{children}</div>
      {/* subtle border glow for destacado on hover handled inline by CSS */}
      {destacado && null}
    </motion.div>
  );
}

export default function Section04Justificacion() {
  const cuadrantes = JUSTIFICACION.slice(0, 4);
  const formacion = JUSTIFICACION[4];

  return (
    <section
      id="justificacion"
      className="section relative overflow-hidden bg-soft-navy"
    >
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0" style={{ opacity: 0.35 }} />

      <div className="container relative">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="eyebrow-num mb-6">
          §05 / Justificación
        </motion.div>

        <motion.h2
          {...fadeUp(0.08)}
          className="font-display"
          style={{
            color: 'var(--color-navy)',
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.05,
            maxWidth: '22ch',
          }}
        >
          Por qué este proyecto,{' '}
          <span className="font-serif-it" style={{ color: 'var(--color-teal)' }}>
            por qué ahora.
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.16)}
          className="mt-6"
          style={{
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            maxWidth: '60ch',
          }}
        >
          Una respuesta directa a una necesidad regional documentada.
        </motion.p>

        {/* ── GRID 2x2 BENTO con tilt 3D + stagger diagonal ──────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cuadrantes.map((item, i) => {
            const Icon = QUAD_ICONS[i];
            const destacado = 'destacado' in item && item.destacado;
            return (
              <TiltCard
                key={item.titulo}
                index={i}
                destacado={!!destacado}
                className={destacado ? 'card-teal' : 'card-paper'}
                style={{
                  padding: 36,
                  minHeight: 240,
                  position: 'relative',
                  borderColor: destacado ? 'transparent' : 'var(--color-line)',
                }}
              >
                {/* Index micro tag */}
                <div
                  className="font-mono"
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: destacado ? 'rgba(255,255,255,0.6)' : 'var(--color-mist)',
                  }}
                >
                  0{i + 1}
                </div>

                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: destacado ? 'rgba(255,255,255,0.14)' : 'rgba(31,140,136,0.10)',
                    color: destacado ? '#ffffff' : 'var(--color-teal)',
                    marginBottom: 20,
                  }}
                >
                  <Icon />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(22px, 2vw, 28px)',
                    lineHeight: 1.2,
                    color: destacado ? '#ffffff' : 'var(--color-navy)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.titulo}
                </h3>

                <p
                  className="mt-3"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: destacado ? 'rgba(255,255,255,0.92)' : 'var(--color-ink-soft)',
                    maxWidth: '46ch',
                  }}
                >
                  {item.texto}
                </p>

                {'refs' in item && Array.isArray((item as any).refs) && (item as any).refs.length > 0 ? (
                  <div className="mt-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Cite refs={(item as any).refs} tone={destacado ? 'white' : 'paper'} />
                  </div>
                ) : null}

                {destacado && (
                  <div
                    className="mt-5"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      color: '#ffffff',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: 9999,
                      display: 'inline-flex',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Diferenciación
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>

        {/* ── Formación profesional · card ancho completo con clip-path ─ */}
        {formacion && (
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.95, ease: ENTER, delay: 0.55 }}
            className="card-paper mt-5 lg:mt-6"
            style={{
              padding: 32,
              borderLeft: '4px solid var(--color-teal)',
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              willChange: 'clip-path',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(31,140,136,0.10)',
                color: 'var(--color-teal)',
                flexShrink: 0,
              }}
            >
              <IconGraduation />
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                Eje transversal
              </div>
              <h3
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(22px, 1.8vw, 26px)',
                  color: 'var(--color-navy)',
                  letterSpacing: '-0.02em',
                }}
              >
                {formacion.titulo}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: 'var(--color-ink-soft)',
                  maxWidth: '72ch',
                }}
              >
                {formacion.texto}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Resumen estratégico · card navy con y:40 entry ──── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.85, ease: ENTER, delay: 0.2 }}
          className="card-navy mt-10"
          style={{ padding: 48 }}
        >
          <div
            className="eyebrow"
            style={{ color: 'var(--color-teal-soft)', marginBottom: 28 }}
          >
            Resumen estratégico
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
            }}
          >
            <ResumenCol title="Importancia">
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.importancia}
              </p>
            </ResumenCol>

            <ResumenCol title="Pertenencia">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Técnica
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.tecnica}
                  </div>
                </li>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Académica
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.academica}
                  </div>
                </li>
                <li>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-teal-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Social
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                    {JUSTIFICACION_RESUMEN.pertenencia.social}
                  </div>
                </li>
              </ul>
            </ResumenCol>

            <ResumenCol title="Beneficiarios">
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.beneficiarios}
              </p>
            </ResumenCol>

            <ResumenCol title="Alcance corto">
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {JUSTIFICACION_RESUMEN.alcanceCorto}
              </p>
            </ResumenCol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ResumenCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: ENTER },
        },
      }}
    >
      <h4
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.01em',
          marginBottom: 12,
        }}
      >
        {title}
      </h4>
      {children}
    </motion.div>
  );
}
