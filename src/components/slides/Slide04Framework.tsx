import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { sslConstellation, normativeFramework, antecedents } from '@/data/eda';
import gsap from 'gsap';
import { BookOpen, Scale, Award } from 'lucide-react';

function Constellation() {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll('.constellation-node');
    const lines = containerRef.current.querySelectorAll('.constellation-line');

    gsap.from(lines, {
      strokeDashoffset: 200,
      duration: 1.6,
      stagger: 0.05,
      ease: 'power2.out',
    });
    gsap.from(nodes, {
      scale: 0,
      transformOrigin: 'center center',
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'back.out(1.7)',
      delay: 0.4,
    });
  }, []);

  const cx = 340;
  const cy = 240;
  const r = 165;
  const nodes = sslConstellation.map((n, i) => {
    const angle = (i / sslConstellation.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });

  const FAMILY_COLOR: Record<string, string> = {
    Contrastive: '#0173b2',
    'Self-distill': '#029e73',
    Generative: '#d55e00',
    Backbone: '#5d2a1a',
    Explainability: '#de8f05',
  };

  return (
    <svg ref={containerRef} viewBox="0 0 680 480" className="w-full h-auto">
      <defs>
        <radialGradient id="ssl-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5d2a1a" />
          <stop offset="100%" stopColor="#17191c" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connecting lines */}
      <g>
        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            className="constellation-line"
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={FAMILY_COLOR[n.family] ?? '#777b86'}
            strokeWidth={0.9}
            strokeDasharray="200"
            opacity={0.6}
          />
        ))}
      </g>

      {/* Pulsing center */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={52}
        fill="url(#ssl-center)"
        filter="url(#glow)"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <text
        x={cx}
        y={cy - 3}
        fontSize="22"
        fontFamily="Instrument Serif"
        fontStyle="italic"
        textAnchor="middle"
        fill="#ffffff"
      >
        SSL
      </text>
      <text x={cx} y={cy + 15} fontSize="10" textAnchor="middle" fill="#fbe1d1">
        autosupervisado
      </text>

      {/* Nodes with pulse */}
      <g>
        {nodes.map((n, i) => (
          <g key={`node-${i}`} className="constellation-node">
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={38}
              fill="#ffffff"
              stroke={FAMILY_COLOR[n.family] ?? '#777b86'}
              strokeWidth={1.5}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <text x={n.x} y={n.y + 2} fontSize="11.5" textAnchor="middle" fontWeight={600} fill="#17191c">
              {n.name}
            </text>
            <text
              x={n.x}
              y={n.y + 16}
              fontSize="8"
              textAnchor="middle"
              fill={FAMILY_COLOR[n.family] ?? '#777b86'}
              fontStyle="italic"
            >
              {n.family}
            </text>
          </g>
        ))}
      </g>

      {/* Legend */}
      <g transform="translate(20, 460)">
        {Object.entries(FAMILY_COLOR).map(([fam, col], i) => (
          <g key={fam} transform={`translate(${i * 130}, 0)`}>
            <circle cx={4} cy={4} r={4} fill={col} />
            <text x={13} y={7} fontSize="9.5" fill="#4c4c4c" fontWeight={500}>
              {fam}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Slide04Framework() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-chart-1/8 blur-3xl" />
        <div className="absolute bottom-[15%] left-[8%] w-[350px] h-[350px] rounded-full bg-warm-mist/50 blur-3xl" />
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] py-20">
        <span className="eyebrow">4 · Marco de referencia</span>
        <h2 className="mt-3 font-display text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-tight text-ink max-w-3xl">
          Sobre qué <span className="italic text-terracotta">cimientos</span> se construye.
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 card-fog p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow flex items-center gap-2">
                <BookOpen size={14} />
                Constelación conceptual
              </span>
              <span className="text-[10px] text-light-steel font-mono">
                7 técnicas · 5 familias
              </span>
            </div>
            <Constellation />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="card cursor-default"
            >
              <span className="eyebrow flex items-center gap-2">
                <Scale size={13} />
                Marco normativo
              </span>
              <div className="mt-4 space-y-4">
                {normativeFramework.map((nf) => (
                  <div key={nf.region}>
                    <p className="text-[10px] font-bold text-terracotta mb-1.5 uppercase tracking-wider">
                      {nf.region}
                    </p>
                    <ul className="space-y-1">
                      {nf.items.map((it) => (
                        <motion.li
                          key={it}
                          whileHover={{ x: 2 }}
                          className="flex items-start gap-2 text-xs text-ink/85 leading-relaxed cursor-default"
                        >
                          <span className="mt-1.5 h-px w-3 bg-ink/30 inline-block shrink-0" />
                          {it}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="card cursor-default"
            >
              <span className="eyebrow flex items-center gap-2">
                <Award size={13} />
                Antecedentes · UIS y co-asesoría
              </span>
              <ul className="mt-3 space-y-2.5">
                {antecedents.map((a, i) => (
                  <motion.li
                    key={a.author}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-warm-mist pl-3 hover:border-terracotta transition-colors"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-sm text-terracotta italic">{a.year}</span>
                      <span className="font-medium text-ink text-[12.5px]">{a.author}</span>
                    </div>
                    <p className="text-muted-stone text-[11.5px] leading-snug">
                      {a.contribution}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
