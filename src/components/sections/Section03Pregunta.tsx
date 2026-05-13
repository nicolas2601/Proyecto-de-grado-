import { motion } from 'framer-motion';
import { PREGUNTA } from '@/data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.7, ease: easeOut, delay },
});

// Renderiza la pregunta central con highlights inline en las palabras
// "aprendizaje autosupervisado" y "Santander"
function PreguntaHighlighted({ text }: { text: string }) {
  const targets = ['aprendizaje autosupervisado', 'Santander'];
  // Tokenizamos manteniendo separadores
  let parts: Array<{ s: string; hl: boolean }> = [{ s: text, hl: false }];
  for (const t of targets) {
    const next: typeof parts = [];
    for (const p of parts) {
      if (p.hl) {
        next.push(p);
        continue;
      }
      const segs = p.s.split(new RegExp(`(${t})`, 'g'));
      for (const seg of segs) {
        if (seg === t) next.push({ s: seg, hl: true });
        else if (seg.length) next.push({ s: seg, hl: false });
      }
    }
    parts = next;
  }
  return (
    <>
      {parts.map((p, i) =>
        p.hl ? (
          <span
            key={i}
            style={{
              color: '#4FB8B4',
              fontWeight: 600,
            }}
          >
            {p.s}
          </span>
        ) : (
          <span key={i}>{p.s}</span>
        )
      )}
    </>
  );
}

export default function Section03Pregunta() {
  return (
    <section
      id="pregunta"
      className="section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #061A2C 0%, #0F2C45 60%, #0A2238 100%)',
        color: '#ffffff',
      }}
    >
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0"
        style={{ opacity: 0.35 }}
      />
      {/* Soft teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: '-30%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background:
            'radial-gradient(circle, rgba(31,140,136,0.16) 0%, transparent 60%)',
          filter: 'blur(48px)',
        }}
      />

      <div className="container relative">
        {/* Header */}
        <motion.div
          {...fade(0)}
          className="eyebrow-num"
          style={{ color: '#1F8C88' }}
        >
          §03 · PREGUNTA E HIPÓTESIS
        </motion.div>

        <motion.div {...fade(0.08)} className="mt-4 flex items-center gap-3">
          <span
            className="pill-ghost"
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.65)',
              borderColor: 'rgba(255,255,255,0.3)',
            }}
          >
            pregunta del evaluador
          </span>
          <span
            className="font-serif-it"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 18,
            }}
          >
            "¿qué pregunta concreta van a responder?"
          </span>
        </motion.div>

        {/* Pregunta central GIGANTE */}
        <motion.h2
          {...fade(0.18)}
          className="mt-10"
          style={{
            fontSize: 'clamp(32px, 5.6vw, 72px)',
            lineHeight: 1.12,
            color: '#ffffff',
            maxWidth: '32ch',
            fontWeight: 500,
            letterSpacing: '-0.025em',
          }}
        >
          <PreguntaHighlighted text={PREGUNTA.central} />
        </motion.h2>

        {/* Alcance */}
        <motion.div
          {...fade(0.3)}
          className="mt-12 card-teal-soft"
          style={{ maxWidth: 880 }}
        >
          <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
            alcance
          </div>
          <p
            className="mt-3"
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              color: 'var(--color-navy-deep)',
            }}
          >
            {PREGUNTA.alcance}
          </p>
        </motion.div>

        {/* 3 supuestos */}
        <div className="mt-12">
          <motion.div
            {...fade(0.38)}
            className="eyebrow"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            supuestos · 3
          </motion.div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Supuesto 01 — paper white */}
            <motion.div {...fade(0.46)} className="card">
              <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                supuesto 01
              </div>
              <p
                className="mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'var(--color-charcoal)',
                }}
              >
                {PREGUNTA.supuestos[0]}
              </p>
            </motion.div>

            {/* Supuesto 02 — paper soft */}
            <motion.div {...fade(0.54)} className="card-paper">
              <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                supuesto 02
              </div>
              <p
                className="mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'var(--color-charcoal)',
                }}
              >
                {PREGUNTA.supuestos[1]}
              </p>
            </motion.div>

            {/* Supuesto 03 — teal soft */}
            <motion.div {...fade(0.62)} className="card-teal-soft">
              <div className="eyebrow" style={{ color: 'var(--color-teal)' }}>
                supuesto 03
              </div>
              <p
                className="mt-3"
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'var(--color-navy-deep)',
                }}
              >
                {PREGUNTA.supuestos[2]}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          {...fade(0.7)}
          className="mt-16 flex items-center justify-end"
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            → continúa con la justificación
          </span>
        </motion.div>
      </div>
    </section>
  );
}
