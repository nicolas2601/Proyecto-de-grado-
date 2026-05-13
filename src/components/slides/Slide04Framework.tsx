import { motion } from 'framer-motion';
import { useRef } from 'react';
import TabsInterno, { type TabItem } from '@/components/reactbits/TabsInterno';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── data ──────────────────────────────────────────────────────────────

type SSLFamily = {
  id: string;
  rank: string; // 01 / 03
  name: string;
  method: string; // shown in Bebas Neue
  desc: string;
  diagram: 'contrast' | 'mae' | 'distill';
};

const SSL_FAMILIES: SSLFamily[] = [
  {
    id: 'contrastive',
    rank: 'FAMILIA · 01 / 03',
    name: 'CONTRASTIVO',
    method: 'SimCLR / BYOL',
    desc: 'Empareja vistas aumentadas de la misma imagen y separa pares negativos en el espacio latente. Aprende invariancias sin etiquetas.',
    diagram: 'contrast',
  },
  {
    id: 'generative',
    rank: 'FAMILIA · 02 / 03',
    name: 'GENERATIVO',
    method: 'MAE',
    desc: 'Reconstruye porciones enmascaradas de la imagen. La representación emerge del esfuerzo de predecir lo oculto.',
    diagram: 'mae',
  },
  {
    id: 'distill',
    rank: 'FAMILIA · 03 / 03',
    name: 'DESTILACIÓN',
    method: 'DINO',
    desc: 'Una red estudiante imita un teacher EMA de sí misma. Sin negativos, ViT-friendly, atención semánticamente coherente.',
    diagram: 'distill',
  },
];

const BACKBONES = ['RESNET-50', 'EFFICIENTNET-B0', 'EFFICIENTNET-B2', 'VIT-B/16', 'VIT-L/16'];

type Pilar = {
  n: string;
  sigla: string;
  name: string;
  year: string;
  region: 'EU' | 'CO' | 'INT';
  quote: string;
};

const PILARES: Pilar[] = [
  {
    n: '01',
    sigla: 'GDPR',
    name: 'Reglamento General de Protección de Datos',
    year: 'UE · 2016',
    region: 'EU',
    quote: 'Tratamiento lícito, leal y transparente de datos personales · incluida la categoría salud.',
  },
  {
    n: '02',
    sigla: 'Helsinki',
    name: 'Declaración de Ética Médica',
    year: 'AMM · 2013',
    region: 'INT',
    quote: 'Principios éticos para investigación médica con seres humanos y datos derivados.',
  },
  {
    n: '03',
    sigla: 'AI Act',
    name: 'Reglamento UE de IA',
    year: 'UE · 2024',
    region: 'EU',
    quote: 'IA médica clasificada como alto riesgo: documentación, trazabilidad y supervisión humana.',
  },
  {
    n: '04',
    sigla: 'UNESCO',
    name: 'Recomendación sobre la Ética de la IA',
    year: 'UNESCO · 2021',
    region: 'INT',
    quote: 'IA al servicio del bienestar, los derechos humanos y la equidad global.',
  },
  {
    n: '05',
    sigla: 'Ley 1581',
    name: 'Protección de Datos Personales',
    year: 'CO · 2012 + Decreto 1377/2013',
    region: 'CO',
    quote: 'Dato sensible (salud) requiere autorización expresa y finalidad explícita.',
  },
  {
    n: '06',
    sigla: 'Ley 1419',
    name: 'Telesalud Colombia',
    year: 'CO · 2010 + Res. 2654/2019',
    region: 'CO',
    quote: 'Marco para apoyo diagnóstico a distancia y servicios de telesalud.',
  },
  {
    n: '07',
    sigla: 'MinTIC',
    name: 'Marco Ético para la IA en Colombia',
    year: 'CO · 2021',
    region: 'CO',
    quote: 'Principios éticos: transparencia, equidad, privacidad y responsabilidad.',
  },
  {
    n: '08',
    sigla: 'CONPES 4144',
    name: 'Política Nacional de Inteligencia Artificial',
    year: 'DNP · 2023',
    region: 'CO',
    quote: 'Lineamientos nacionales para desarrollo, adopción y uso responsable de IA.',
  },
];

type Antecedent = {
  idx: string;
  author: string;
  meta: string; // year + country + arch
  finding: string;
  metric: string;
  source: string;
};

const ANTECEDENTS: Antecedent[] = [
  {
    idx: '01',
    author: 'Fabian et al. 2024',
    meta: 'Suiza · DINO + ResNet18',
    finding:
      'Clustering ugly duckling sobre 90 pacientes con FotoFinder ATBM; SSL detecta lesiones atípicas sin etiquetas.',
    metric: 'n=90 pacientes',
    source: 'Computers in Biology and Medicine',
  },
  {
    idx: '02',
    author: 'Harczos et al. 2024',
    meta: 'Alemania · Barlow Twins + ResNet-50',
    finding:
      'SSL supera al supervisado en ISIC 2019 (25.331 imágenes). Aprendizaje sin etiquetas gana margen.',
    metric: 'acc 0.703 vs 0.663 · +4.0 pp',
    source: 'Diagnostics',
  },
  {
    idx: '03',
    author: 'Yan et al. 2025 · PanDerm',
    meta: 'Australia · Masked latent modeling + CLIP',
    finding:
      'Modelo fundacional con 2M imágenes / 11 instituciones / 4 modalidades. SOTA en 28 benchmarks; +10.2 pp en melanoma temprano vs clínicos.',
    metric: 'SOTA 28 benchmarks',
    source: 'Nature Medicine',
  },
  {
    idx: '04',
    author: 'Calderón, Sánchez & Argüello 2021',
    meta: 'Colombia · CNN bilineal (ResNet50 + VGG16 + Xception)',
    finding:
      'Arquitectura bilineal sobre HAM10000 7 clases. Co-autoría asesora del proyecto (Karen Sánchez).',
    metric: 'acc 0.9321 · AUC 0.9810 · +2.7 pp SOTA',
    source: 'Co-autoría: Karen Sánchez (KAUST)',
  },
  {
    idx: '05',
    author: 'Ríos-Duarte et al. 2024',
    meta: 'Colombia · Uniandes · CNN comparativo',
    finding:
      'Compara imágenes clínicas vs dermatoscópicas vs combinadas para melanoma. Dermatoscopía supera clínicas; combinación no aporta.',
    metric: 'Estudio comparativo',
    source: 'Skin Research and Technology',
  },
  {
    idx: '06',
    author: 'Flórez Fuentes et al. 2022',
    meta: 'Colombia · SVM / KNN / NN / Trees',
    finding:
      'Modelos clásicos sobre HAM10000. Alta precisión en clases balanceadas, alta variabilidad entre clases.',
    metric: 'Precisión hasta 100 % balanceadas',
    source: 'Rev. Colombiana de Tecnologías de Avanzada',
  },
  {
    idx: '07',
    author: 'Torres Ospina et al. 2025',
    meta: 'Colombia · Revisión PRISMA · 25 estudios',
    finding:
      'Revisión sistemática de IA en cáncer de piel en Colombia. Cero estudios usan SSL · vacío nacional.',
    metric: '0 / 25 con SSL',
    source: 'Ibero Ciencias',
  },
  {
    idx: '08',
    author: 'Himel et al. 2024',
    meta: 'Vision Transformer (SkinTrans) · HAM10000',
    finding:
      'ViT especializado en clasificación de 7 tipos de lesión cutánea sobre HAM10000.',
    metric: 'acc 94.3 % · 7 clases',
    source: 'Sensors',
  },
];

// ── inline diagrams ───────────────────────────────────────────────────

function DiagramContrast() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
      <rect x="6" y="14" width="36" height="36" stroke="#292929" strokeWidth="1" fill="none" />
      <rect x="6" y="36" width="36" height="36" stroke="#292929" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <line x1="48" y1="32" x2="92" y2="40" stroke="#292929" strokeWidth="1" />
      <line x1="48" y1="56" x2="92" y2="42" stroke="#292929" strokeWidth="1" />
      <circle cx="96" cy="40" r="4" fill="#292929" />
      <text x="106" y="44" fontFamily="Oswald" fontSize="9" letterSpacing="2" fill="#292929">PULL +</text>
      <line x1="120" y1="40" x2="160" y2="22" stroke="#292929" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="120" y1="40" x2="160" y2="62" stroke="#292929" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="164" cy="22" r="3" fill="none" stroke="#292929" />
      <circle cx="164" cy="62" r="3" fill="none" stroke="#292929" />
      <text x="172" y="26" fontFamily="Oswald" fontSize="8" letterSpacing="2" fill="#646464">PUSH −</text>
      <text x="172" y="66" fontFamily="Oswald" fontSize="8" letterSpacing="2" fill="#646464">PUSH −</text>
    </svg>
  );
}

function DiagramMae() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
      {/* masked grid 4x4 */}
      <g transform="translate(8 12)">
        {Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const masked = [1, 4, 7, 10, 13].includes(i);
          return (
            <rect
              key={i}
              x={col * 14}
              y={row * 14}
              width="13"
              height="13"
              fill={masked ? '#292929' : 'none'}
              stroke="#292929"
              strokeWidth="1"
            />
          );
        })}
      </g>
      <line x1="74" y1="40" x2="118" y2="40" stroke="#292929" strokeWidth="1" />
      <polygon points="118,36 124,40 118,44" fill="#292929" />
      <text x="84" y="32" fontFamily="Oswald" fontSize="9" letterSpacing="2" fill="#292929">RECON</text>
      <g transform="translate(128 12)">
        {Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <rect
              key={i}
              x={col * 14}
              y={row * 14}
              width="13"
              height="13"
              fill="none"
              stroke="#292929"
              strokeWidth="1"
            />
          );
        })}
      </g>
    </svg>
  );
}

function DiagramDistill() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
      <rect x="8" y="18" width="56" height="44" stroke="#292929" strokeWidth="1" fill="none" />
      <text x="36" y="44" fontFamily="Oswald" fontSize="10" letterSpacing="2" fill="#292929" textAnchor="middle">TEACHER</text>
      <text x="36" y="56" fontFamily="JetBrains Mono" fontSize="8" fill="#646464" textAnchor="middle">EMA</text>
      <line x1="68" y1="40" x2="128" y2="40" stroke="#292929" strokeWidth="1" />
      <polygon points="128,36 134,40 128,44" fill="#292929" />
      <text x="98" y="34" fontFamily="Oswald" fontSize="8" letterSpacing="2" fill="#292929" textAnchor="middle">DISTILL</text>
      <rect x="136" y="18" width="56" height="44" stroke="#292929" strokeWidth="1" fill="none" strokeDasharray="3 2" />
      <text x="164" y="44" fontFamily="Oswald" fontSize="10" letterSpacing="2" fill="#292929" textAnchor="middle">STUDENT</text>
    </svg>
  );
}

function Diagram({ kind }: { kind: SSLFamily['diagram'] }) {
  if (kind === 'contrast') return <DiagramContrast />;
  if (kind === 'mae') return <DiagramMae />;
  return <DiagramDistill />;
}

// ── SSL panel ─────────────────────────────────────────────────────────

function SslPanel() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-ink-black pb-3 mb-6 flex-wrap gap-3">
        <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
          PILAR · I · TÉCNICO
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500">
          3 FAMILIAS · 5 BACKBONES CANDIDATOS
        </span>
      </div>

      <p className="font-nh font-light text-[18px] leading-[1.55] text-ink-black max-w-3xl mb-8">
        Tres familias de pretexto autosupervisado dominan la literatura. El proyecto evaluará un
        representante por familia y elegirá la combinación familia + backbone con mejor desempeño
        sobre las clases núcleo identificadas en Santander.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ink-black">
        {SSL_FAMILIES.map((f, idx) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: idx * 0.06, ease: EASE }}
            viewport={{ once: true }}
            className={
              'relative p-6 hover-reveal bg-canvas-white ' +
              (idx > 0 ? 'border-t md:border-t-0 md:border-l border-ink-black' : '')
            }
            style={{ minHeight: 280 }}
          >
            <span className="font-condensed text-[11px] tracking-[0.2em] uppercase text-grey-500">
              {f.rank}
            </span>

            <div className="mt-3 border-t border-ink-black pt-3">
              <span className="font-condensed text-[14px] tracking-[0.15em] uppercase text-ink-black">
                {f.name}
              </span>
              <div className="font-display text-[clamp(40px,4vw,56px)] leading-[0.9] mt-2 text-ink-black">
                {f.method}
              </div>
            </div>

            <p className="mt-4 font-nh text-[16px] leading-[1.5] text-ink-black">
              {f.desc}
            </p>

            <div
              data-reveal
              className="mt-5 border-t border-ink-black pt-4"
            >
              <span className="font-condensed text-[11px] tracking-[0.2em] uppercase text-grey-500 block mb-2">
                ── PRETEXTO
              </span>
              <Diagram kind={f.diagram} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* backbones strip */}
      <div className="mt-10 border border-ink-black">
        <div className="bg-ink-black text-canvas-white px-5 py-3 flex items-baseline justify-between flex-wrap gap-3">
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase">
            ── BACKBONES CANDIDATOS
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-grey-300">
            5 ARQUITECTURAS · CNN + VIT
          </span>
        </div>
        <div className="p-5 flex flex-wrap gap-2">
          {BACKBONES.map((b, i) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: EASE }}
              viewport={{ once: true }}
              className="inline-flex items-center border border-ink-black px-3 h-[30px] font-condensed text-[13px] tracking-[0.1em] uppercase text-ink-black"
            >
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      {/* claim strip */}
      <div className="mt-6 border border-ink-black p-5 flex items-baseline justify-between flex-wrap gap-3">
        <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
          ── LAS REPRESENTACIONES SE EXTRAEN SIN INTERVENCIÓN EXPERTA
        </span>
        <span className="font-nh italic font-light text-[18px] leading-[1.4] text-ink-black">
          “Chaitanya et al., 2023”
        </span>
      </div>
    </div>
  );
}

// ── Normativa panel · 8 pilares ───────────────────────────────────────

function NormativaPanel() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-ink-black pb-3 mb-6 flex-wrap gap-3">
        <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
          PILAR · II · LEGAL · ÉTICO
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500">
          08 INSTRUMENTOS · UE + COLOMBIA + INTERNACIONAL
        </span>
      </div>

      <p className="font-nh font-light text-[18px] leading-[1.55] text-ink-black max-w-3xl mb-8">
        Ocho instrumentos delimitan el espacio normativo del proyecto: tratamiento de datos
        sensibles, IA de alto riesgo médico y telesalud. Pasa el cursor sobre cada pilar para
        revelar la cita clave.
      </p>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-0 border border-ink-black min-w-[820px]">
          {PILARES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
              viewport={{ once: true }}
              className={
                'relative p-4 hover-reveal invert-on-hover bg-canvas-white flex flex-col ' +
                (i > 0 ? 'border-l border-ink-black ' : '') +
                (i >= 4 ? 'border-t lg:border-t-0 ' : '')
              }
              style={{ minHeight: 220 }}
            >
              <span className="font-display text-[44px] leading-none text-ink-black tabular-nums">
                {p.n}
              </span>

              <div className="mt-3 border-t border-ink-black pt-3 flex-1">
                <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black leading-tight block">
                  {p.sigla}
                </span>
                <p data-mute className="mt-2 font-nh text-[14px] leading-[1.4] text-grey-500">
                  {p.name}
                </p>
              </div>

              <span data-mute className="mt-3 font-mono text-[11px] tracking-[0.1em] uppercase text-grey-500">
                {p.year}
              </span>

              <div data-reveal className="absolute inset-0 bg-ink-black text-canvas-white p-4 flex flex-col justify-between">
                <span className="font-condensed text-[11px] tracking-[0.2em] uppercase text-canvas-white">
                  {p.sigla}
                </span>
                <p className="font-nh text-[13px] leading-[1.45] text-canvas-white">
                  {p.quote}
                </p>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-grey-300">
                  {p.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-0 border border-ink-black">
        <div className="p-5">
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
            ── DATOS SENSIBLES
          </span>
          <p className="mt-2 font-nh text-[15px] leading-[1.45] text-ink-black">
            Salud requiere autorización expresa, finalidad explícita y trazabilidad.
          </p>
        </div>
        <div className="p-5 border-t md:border-t-0 md:border-l border-ink-black">
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
            ── IA ALTO RIESGO
          </span>
          <p className="mt-2 font-nh text-[15px] leading-[1.45] text-ink-black">
            AI Act clasifica IA médica como alto riesgo: documentación + supervisión humana obligatoria.
          </p>
        </div>
        <div className="p-5 border-t md:border-t-0 md:border-l border-ink-black">
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
            ── ALCANCE PROYECTO
          </span>
          <p className="mt-2 font-nh text-[15px] leading-[1.45] text-ink-black">
            TRL 4 sobre datasets públicos · sin captura primaria ni validación clínica.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Antecedentes panel · 8 estudios ──────────────────────────────────

function AntecedentesPanel() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-ink-black pb-3 mb-6 flex-wrap gap-3">
        <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-ink-black">
          PILAR · III · ACADÉMICO
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500">
          08 ANTECEDENTES · INT + CO
        </span>
      </div>

      <p className="font-nh font-light text-[18px] leading-[1.55] text-ink-black max-w-3xl mb-8">
        Ocho estudios clave anclan el marco académico: tres internacionales que validan SSL
        en dermatología, cuatro colombianos sobre HAM10000 con métodos supervisados, una
        revisión PRISMA nacional que confirma el vacío.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-ink-black">
        {ANTECEDENTS.map((a, i) => {
          const isLastRow = i >= ANTECEDENTS.length - 2;
          const isRightCol = i % 2 === 1;
          return (
            <motion.div
              key={a.idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
              viewport={{ once: true }}
              className={
                'p-6 bg-canvas-white ' +
                (isRightCol ? 'md:border-l border-ink-black ' : '') +
                (i > 0 && !isRightCol ? 'border-t border-ink-black ' : '') +
                (i > 1 && isRightCol ? 'border-t border-ink-black ' : '') +
                (i === 1 ? 'border-t md:border-t-0 border-ink-black ' : '') +
                (isLastRow ? '' : '')
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500">
                  [{a.idx}]
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-grey-500">
                  {a.source}
                </span>
              </div>

              <div className="mt-3 font-display text-[28px] leading-[0.95] text-ink-black">
                {a.author}
              </div>
              <div className="mt-2 font-nh text-[14px] leading-[1.4] text-grey-500">
                {a.meta}
              </div>

              <div className="mt-4 border-t border-ink-black pt-4">
                <p className="font-nh text-[15px] leading-[1.5] text-ink-black">
                  {a.finding}
                </p>
                <div className="mt-3 inline-flex items-center border border-ink-black px-3 h-[26px] font-condensed text-[12px] tracking-[0.1em] uppercase text-ink-black">
                  {a.metric}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* vacío identificado */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        viewport={{ once: true }}
        className="mt-8 border border-ink-black grid grid-cols-1 md:grid-cols-[220px_1fr]"
      >
        <div className="bg-ink-black text-canvas-white p-5 flex flex-col justify-between">
          <span className="font-condensed text-[12px] tracking-[0.2em] uppercase">
            ── VACÍO IDENTIFICADO
          </span>
          <span className="font-display text-[40px] leading-none mt-4">GAP</span>
        </div>
        <div className="p-6">
          <p className="font-nh italic font-light text-[clamp(20px,2vw,28px)] leading-[1.3] text-ink-black max-w-3xl">
            “Ninguno de los antecedentes nacionales emplea SSL. Es el espacio que ocupa este
            proyecto.”
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.1em] uppercase text-grey-500">
            · Torres Ospina et al. 2025 · Revisión PRISMA · 25 estudios
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── slide ─────────────────────────────────────────────────────────────

export default function Slide04Framework() {
  const ref = useRef<HTMLDivElement>(null);

  const tabs: TabItem[] = [
    { id: 'ssl', label: 'SSL · TÉCNICA', content: <SslPanel /> },
    { id: 'normativa', label: 'NORMATIVA · 8 INSTRUMENTOS', content: <NormativaPanel /> },
    { id: 'antecedentes', label: 'ANTECEDENTES · 8 ESTUDIOS', content: <AntecedentesPanel /> },
  ];

  return (
    <div ref={ref} className="slide relative w-full overflow-hidden bg-canvas-white">
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />

      <div className="slide-narrow relative">
        {/* ── header ─────────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between border-b border-ink-black pb-3 gap-6 flex-wrap">
          <span className="eyebrow">04 · MARCO CONCEPTUAL</span>
          <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-grey-500">
            TRES PILARES TÉCNICO-NORMATIVOS
          </span>
        </div>

        {/* ── headline ──────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 font-nh font-light text-[clamp(44px,5.4vw,72px)] leading-[1.04] tracking-[-0.02em] text-ink-black max-w-5xl"
        >
          Por qué autosupervisado, por qué ahora, por qué aquí.
        </motion.h2>

        {/* ── tabs ──────────────────────────────────────────────── */}
        <div className="mt-12">
          <TabsInterno tabs={tabs} initial="ssl" />
        </div>

        {/* ── footer ────────────────────────────────────────────── */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-3 border-t border-grey-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span className="font-condensed text-[12px] tracking-[0.2em] uppercase text-grey-500 ml-2">
              NAVEGAR ENTRE TABS
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.1em] text-grey-500 uppercase">
            05 / 09 · TRES PILARES
          </span>
        </div>
      </div>
    </div>
  );
}
