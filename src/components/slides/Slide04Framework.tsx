import { motion } from 'framer-motion';
import TabsInterno, { type TabItem } from '@/components/reactbits/TabsInterno';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── data ──────────────────────────────────────────────────────────────

type SSLFamily = {
  id: string;
  rank: string;
  name: string;
  method: string;
  desc: string;
  diagram: 'contrast' | 'mae' | 'distill';
  variant: 'paper' | 'accent' | 'solid';
};

const SSL_FAMILIES: SSLFamily[] = [
  {
    id: 'contrastive',
    rank: 'FAMILIA · 01 / 03',
    name: 'CONTRASTIVO',
    method: 'SimCLR · BYOL',
    desc: 'Empareja vistas aumentadas de la misma imagen y separa pares negativos en el espacio latente. Aprende invariancias sin etiquetas.',
    diagram: 'contrast',
    variant: 'paper',
  },
  {
    id: 'generative',
    rank: 'FAMILIA · 02 / 03',
    name: 'GENERATIVO',
    method: 'MAE',
    desc: 'Reconstruye porciones enmascaradas de la imagen. La representación emerge del esfuerzo de predecir lo oculto.',
    diagram: 'mae',
    variant: 'accent',
  },
  {
    id: 'distill',
    rank: 'FAMILIA · 03 / 03',
    name: 'DESTILACIÓN',
    method: 'DINO',
    desc: 'Una red estudiante imita un teacher EMA de sí misma. Sin negativos, ViT-friendly, atención semánticamente coherente.',
    diagram: 'distill',
    variant: 'solid',
  },
];

const BACKBONES = ['ResNet-50', 'EfficientNet-B0', 'EfficientNet-B2', 'ViT-B/16', 'ViT-L/16'];

type Pilar = {
  n: string;
  sigla: string;
  name: string;
  year: string;
  quote: string;
};

const PILARES: Pilar[] = [
  {
    n: '01',
    sigla: 'GDPR',
    name: 'Reglamento General de Protección de Datos',
    year: 'UE · 2016',
    quote: 'Tratamiento lícito, leal y transparente de datos personales · incluida la categoría salud.',
  },
  {
    n: '02',
    sigla: 'Helsinki',
    name: 'Declaración de Ética Médica',
    year: 'AMM · 2013',
    quote: 'Principios éticos para investigación médica con seres humanos y datos derivados.',
  },
  {
    n: '03',
    sigla: 'AI Act',
    name: 'Reglamento UE de IA',
    year: 'UE · 2024',
    quote: 'IA médica clasificada como alto riesgo: documentación, trazabilidad y supervisión humana.',
  },
  {
    n: '04',
    sigla: 'UNESCO',
    name: 'Recomendación sobre la Ética de la IA',
    year: 'UNESCO · 2021',
    quote: 'IA al servicio del bienestar, los derechos humanos y la equidad global.',
  },
  {
    n: '05',
    sigla: 'Ley 1581',
    name: 'Protección de Datos Personales',
    year: 'CO · 2012',
    quote: 'Dato sensible (salud) requiere autorización expresa y finalidad explícita.',
  },
  {
    n: '06',
    sigla: 'Ley 1419',
    name: 'Telesalud Colombia',
    year: 'CO · 2010',
    quote: 'Marco para apoyo diagnóstico a distancia y servicios de telesalud.',
  },
  {
    n: '07',
    sigla: 'MinTIC',
    name: 'Marco Ético para la IA en Colombia',
    year: 'CO · 2021',
    quote: 'Principios éticos · transparencia, equidad, privacidad y responsabilidad.',
  },
  {
    n: '08',
    sigla: 'CONPES 4144',
    name: 'Política Nacional de IA',
    year: 'DNP · 2023',
    quote: 'Lineamientos nacionales para desarrollo, adopción y uso responsable de IA.',
  },
];

type Antecedent = {
  idx: string;
  author: string;
  meta: string;
  finding: string;
  metric: string;
  source: string;
  highlight?: 'green' | 'yellow';
};

const ANTECEDENTS: Antecedent[] = [
  {
    idx: '01',
    author: 'Fabian et al.',
    meta: '2024 · Suiza · DINO + ResNet18',
    finding:
      'Clustering ugly duckling sobre 90 pacientes con FotoFinder ATBM. SSL detecta lesiones atípicas sin etiquetas.',
    metric: 'n = 90 pacientes',
    source: 'Computers in Biology and Medicine',
  },
  {
    idx: '02',
    author: 'Harczos et al.',
    meta: '2024 · Alemania · Barlow Twins + ResNet-50',
    finding:
      'SSL supera al supervisado en ISIC 2019 (25.331 imágenes). El aprendizaje sin etiquetas gana margen.',
    metric: 'acc 0.703 vs 0.663 · +4.0 pp',
    source: 'Diagnostics',
  },
  {
    idx: '03',
    author: 'Yan et al. · PanDerm',
    meta: '2025 · Australia · Masked latent + CLIP',
    finding:
      'Modelo fundacional con 2M imágenes y 11 instituciones. SOTA en 28 benchmarks · +10.2 pp en melanoma temprano.',
    metric: 'SOTA 28 benchmarks',
    source: 'Nature Medicine',
  },
  {
    idx: '04',
    author: 'Calderón, Sánchez & Argüello',
    meta: '2021 · Colombia · CNN bilineal ResNet50 + VGG16 + Xception',
    finding:
      'Arquitectura bilineal sobre HAM10000 7 clases. Co-autoría asesora del proyecto (Karen Sánchez).',
    metric: 'acc 0.9321 · AUC 0.9810',
    source: 'IEEE',
    highlight: 'green',
  },
  {
    idx: '05',
    author: 'Ríos-Duarte et al.',
    meta: '2024 · Uniandes · CNN comparativo',
    finding:
      'Compara imágenes clínicas vs. dermatoscópicas vs. combinadas para melanoma. Dermatoscopía supera clínicas.',
    metric: 'Estudio comparativo',
    source: 'Skin Research and Technology',
  },
  {
    idx: '06',
    author: 'Flórez Fuentes et al.',
    meta: '2022 · Colombia · SVM / KNN / NN / Trees',
    finding:
      'Modelos clásicos sobre HAM10000. Alta precisión en clases balanceadas, alta variabilidad entre clases.',
    metric: 'Precisión hasta 100% balanceadas',
    source: 'Rev. Colombiana Tec. Avanzada',
  },
  {
    idx: '07',
    author: 'Torres Ospina et al.',
    meta: '2025 · Colombia · Revisión PRISMA · 25 estudios',
    finding:
      'Revisión sistemática de IA en cáncer de piel en Colombia. Cero estudios usan SSL · vacío nacional confirmado.',
    metric: '0 / 25 con SSL',
    source: 'Ibero Ciencias',
    highlight: 'yellow',
  },
  {
    idx: '08',
    author: 'Himel et al.',
    meta: '2024 · ViT SkinTrans · HAM10000',
    finding:
      'Vision Transformer especializado en clasificación de 7 tipos de lesión cutánea sobre HAM10000.',
    metric: 'acc 94.3% · 7 clases',
    source: 'Sensors',
  },
];

// ── inline diagrams ───────────────────────────────────────────────────

function DiagramContrast({ stroke = '#000' }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
      <rect x="6" y="14" width="36" height="36" rx="6" stroke={stroke} strokeWidth="1" fill="none" />
      <rect x="6" y="36" width="36" height="36" rx="6" stroke={stroke} strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <line x1="48" y1="32" x2="92" y2="40" stroke={stroke} strokeWidth="1" />
      <line x1="48" y1="56" x2="92" y2="42" stroke={stroke} strokeWidth="1" />
      <circle cx="96" cy="40" r="4" fill={stroke} />
      <text x="106" y="44" fontFamily="IBM Plex Mono" fontSize="9" fill={stroke}>pull +</text>
      <line x1="120" y1="40" x2="160" y2="22" stroke={stroke} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="120" y1="40" x2="160" y2="62" stroke={stroke} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="164" cy="22" r="3" fill="none" stroke={stroke} />
      <circle cx="164" cy="62" r="3" fill="none" stroke={stroke} />
      <text x="172" y="26" fontFamily="IBM Plex Mono" fontSize="8" fill={stroke} opacity="0.6">push −</text>
      <text x="172" y="66" fontFamily="IBM Plex Mono" fontSize="8" fill={stroke} opacity="0.6">push −</text>
    </svg>
  );
}

function DiagramMae({ stroke = '#000' }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
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
              rx="2"
              fill={masked ? stroke : 'none'}
              stroke={stroke}
              strokeWidth="1"
            />
          );
        })}
      </g>
      <line x1="74" y1="40" x2="118" y2="40" stroke={stroke} strokeWidth="1" />
      <polygon points="118,36 124,40 118,44" fill={stroke} />
      <text x="84" y="32" fontFamily="IBM Plex Mono" fontSize="9" fill={stroke}>recon</text>
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
              rx="2"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
            />
          );
        })}
      </g>
    </svg>
  );
}

function DiagramDistill({ stroke = '#000' }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-[80px]" aria-hidden>
      <rect x="8" y="18" width="56" height="44" rx="8" stroke={stroke} strokeWidth="1" fill="none" />
      <text x="36" y="40" fontFamily="IBM Plex Mono" fontSize="9" fill={stroke} textAnchor="middle">teacher</text>
      <text x="36" y="52" fontFamily="IBM Plex Mono" fontSize="8" fill={stroke} opacity="0.55" textAnchor="middle">EMA</text>
      <line x1="68" y1="40" x2="128" y2="40" stroke={stroke} strokeWidth="1" />
      <polygon points="128,36 134,40 128,44" fill={stroke} />
      <text x="98" y="34" fontFamily="IBM Plex Mono" fontSize="8" fill={stroke} textAnchor="middle">distill</text>
      <rect x="136" y="18" width="56" height="44" rx="8" stroke={stroke} strokeWidth="1" fill="none" strokeDasharray="3 2" />
      <text x="164" y="44" fontFamily="IBM Plex Mono" fontSize="9" fill={stroke} textAnchor="middle">student</text>
    </svg>
  );
}

function Diagram({ kind, stroke }: { kind: SSLFamily['diagram']; stroke?: string }) {
  if (kind === 'contrast') return <DiagramContrast stroke={stroke} />;
  if (kind === 'mae') return <DiagramMae stroke={stroke} />;
  return <DiagramDistill stroke={stroke} />;
}

// ── SSL panel ─────────────────────────────────────────────────────────

function SslFamilyCard({ f, idx }: { f: SSLFamily; idx: number }) {
  const isPaper = f.variant === 'paper';
  const isAccent = f.variant === 'accent';
  const isSolid = f.variant === 'solid';

  const baseClass = isPaper ? 'card' : isAccent ? 'card-accent' : 'card-solid';
  const textColor = isSolid ? 'var(--color-paper-white)' : 'var(--color-midnight-ink)';
  const mutedColor = isSolid ? 'var(--color-fog-gray)' : 'var(--color-ash-gray)';
  const diagramStroke = isSolid ? '#fff' : '#000';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.06, ease: EASE }}
      viewport={{ once: true }}
      className={`${baseClass} hover-reveal flex flex-col`}
      style={{ minHeight: 380 }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span
          className="font-mono"
          style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: mutedColor }}
        >
          {f.rank}
        </span>
      </div>

      <div className="mt-2">
        <span
          className="font-mono uppercase block"
          style={{ fontSize: '12px', letterSpacing: '0.18em', color: mutedColor, marginBottom: 12 }}
        >
          {f.name}
        </span>
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 4vw, 56px)',
            lineHeight: 0.9,
            color: textColor,
          }}
        >
          {f.method}
        </div>
      </div>

      <p
        className="font-suisse mt-5"
        style={{
          fontSize: '16px',
          lineHeight: 1.5,
          letterSpacing: '-0.42px',
          color: textColor,
          flex: 1,
        }}
      >
        {f.desc}
      </p>

      <div
        data-reveal
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: `1px solid ${isSolid ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <span
          className="font-mono uppercase block mb-2"
          style={{ fontSize: '10px', letterSpacing: '0.18em', color: mutedColor }}
        >
          ── pretexto
        </span>
        <Diagram kind={f.diagram} stroke={diagramStroke} />
      </div>
    </motion.div>
  );
}

function SslPanel() {
  return (
    <div>
      <p
        className="font-suisse"
        style={{
          fontSize: '18px',
          lineHeight: 1.5,
          letterSpacing: '-0.42px',
          color: 'var(--color-ash-gray)',
          maxWidth: '60ch',
          marginBottom: 40,
        }}
      >
        Tres familias de pretexto autosupervisado dominan la literatura. El
        proyecto evaluará un representante por familia.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {SSL_FAMILIES.map((f, idx) => (
          <SslFamilyCard key={f.id} f={f} idx={idx} />
        ))}
      </div>

      {/* backbones strip */}
      <div className="card-fog" style={{ marginTop: 40 }}>
        <div className="flex items-baseline justify-between gap-3 mb-5 flex-wrap">
          <span className="eyebrow-up">── BACKBONES CANDIDATOS · 5</span>
          <span
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
          >
            CNN + VIT · ARQUITECTURAS BASE
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {BACKBONES.map((b, i) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: EASE }}
              viewport={{ once: true }}
              className="pill"
              style={{ fontSize: '13px' }}
            >
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      <p
        className="font-serif italic"
        style={{
          marginTop: 24,
          fontSize: '15px',
          lineHeight: 1.5,
          color: 'var(--color-ash-gray)',
          textAlign: 'right',
        }}
      >
        “Representaciones extraídas sin intervención experta” · Chaitanya et al., 2023
      </p>
    </div>
  );
}

// ── Normativa panel ───────────────────────────────────────────────────

function NormativaPanel() {
  return (
    <div>
      <p
        className="font-suisse"
        style={{
          fontSize: '18px',
          lineHeight: 1.5,
          letterSpacing: '-0.42px',
          color: 'var(--color-ash-gray)',
          maxWidth: '60ch',
          marginBottom: 40,
        }}
      >
        Ocho instrumentos delimitan el espacio normativo del proyecto. Pasa el
        cursor sobre cada pilar para revelar la cita clave.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PILARES.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
            viewport={{ once: true }}
            className="card hover-reveal invert-on-hover relative overflow-hidden flex flex-col"
            style={{ minHeight: 220, padding: '24px' }}
          >
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span
                className="font-display tabular-nums"
                style={{ fontSize: '44px', lineHeight: 0.88, color: 'var(--color-midnight-ink)' }}
              >
                {p.n}
              </span>
            </div>

            <div
              style={{
                paddingTop: 12,
                borderTop: '1px solid rgba(0,0,0,0.08)',
                flex: 1,
              }}
            >
              <span
                className="font-suisse block"
                style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '-0.42px', color: 'var(--color-midnight-ink)' }}
              >
                {p.sigla}
              </span>
              <p
                data-mute
                className="font-suisse"
                style={{ fontSize: '13px', lineHeight: 1.4, letterSpacing: '-0.42px', color: 'var(--color-ash-gray)', marginTop: 6 }}
              >
                {p.name}
              </p>
            </div>

            <span
              data-mute
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em', marginTop: 12 }}
            >
              {p.year}
            </span>

            <div
              data-reveal
              className="absolute inset-0 flex flex-col justify-between"
              style={{
                background: 'var(--color-midnight-ink)',
                color: 'var(--color-paper-white)',
                padding: '24px',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <span
                className="eyebrow-up"
                style={{ color: 'var(--color-fog-gray)' }}
              >
                {p.sigla} · {p.year}
              </span>
              <p
                className="font-suisse"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.5,
                  letterSpacing: '-0.42px',
                  color: 'var(--color-paper-white)',
                }}
              >
                {p.quote}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: 40 }}>
        {[
          { label: 'Datos sensibles', body: 'Salud requiere autorización expresa, finalidad explícita y trazabilidad.' },
          { label: 'IA alto riesgo', body: 'AI Act clasifica IA médica como alto riesgo · documentación + supervisión humana.' },
          { label: 'Alcance del proyecto', body: 'TRL 4 sobre datasets públicos · sin captura primaria ni validación clínica.' },
        ].map((c) => (
          <div key={c.label} className="card-fog">
            <span className="eyebrow-up block mb-3">── {c.label.toUpperCase()}</span>
            <p
              className="font-suisse"
              style={{ fontSize: '15px', lineHeight: 1.5, letterSpacing: '-0.42px', color: 'var(--color-midnight-ink)' }}
            >
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Antecedentes panel ────────────────────────────────────────────────

function AntecedentCard({ a, i }: { a: Antecedent; i: number }) {
  const isHighlight = !!a.highlight;
  const highlightBorder =
    a.highlight === 'green'
      ? '2px solid var(--color-action-green)'
      : a.highlight === 'yellow'
      ? '2px solid var(--color-alert-yellow)'
      : '1px solid rgba(0,0,0,0.04)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
      viewport={{ once: true }}
      className="card flex flex-col"
      style={{
        border: highlightBorder,
        minHeight: 280,
      }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="eyebrow-up">[{a.idx}]</span>
        {isHighlight && (
          <>
            {a.highlight === 'green' && (
              <span className="pill-accent">
                <span className="font-mono">Asesora · Karen Sánchez · KAUST</span>
              </span>
            )}
            {a.highlight === 'yellow' && (
              <span className="pill-yellow">
                <span className="font-mono">Cero SSL en Colombia</span>
              </span>
            )}
          </>
        )}
      </div>

      <div
        className="font-display"
        style={{ fontSize: '28px', lineHeight: 0.95, color: 'var(--color-midnight-ink)' }}
      >
        {a.author}
      </div>
      <p
        className="font-mono"
        style={{ fontSize: '12px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em', marginTop: 8 }}
      >
        {a.meta}
      </p>

      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid rgba(0,0,0,0.08)',
          flex: 1,
        }}
      >
        <p
          className="font-suisse"
          style={{ fontSize: '15px', lineHeight: 1.5, letterSpacing: '-0.42px', color: 'var(--color-midnight-ink)' }}
        >
          {a.finding}
        </p>
      </div>

      <div className="flex items-baseline justify-between gap-3 mt-4 flex-wrap">
        <span
          className="pill"
          style={{ fontSize: '12px' }}
        >
          <span className="font-mono">{a.metric}</span>
        </span>
        <span
          className="font-mono italic"
          style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.04em' }}
        >
          {a.source}
        </span>
      </div>
    </motion.div>
  );
}

function AntecedentesPanel() {
  return (
    <div>
      <p
        className="font-suisse"
        style={{
          fontSize: '18px',
          lineHeight: 1.5,
          letterSpacing: '-0.42px',
          color: 'var(--color-ash-gray)',
          maxWidth: '65ch',
          marginBottom: 40,
        }}
      >
        Ocho estudios anclan el marco académico · tres internacionales validan
        SSL en dermatología, cuatro colombianos sobre HAM10000 con métodos
        supervisados, una revisión PRISMA confirma el vacío nacional.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ANTECEDENTS.map((a, i) => (
          <AntecedentCard key={a.idx} a={a} i={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        viewport={{ once: true }}
        className="card-accent"
        style={{ marginTop: 40 }}
      >
        <span className="eyebrow-up block mb-4">── VACÍO IDENTIFICADO</span>
        <p
          className="font-serif italic"
          style={{
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            lineHeight: 1.25,
            color: 'var(--color-midnight-ink)',
            maxWidth: '38ch',
          }}
        >
          Ninguno de los antecedentes nacionales emplea SSL.{' '}
          <span className="font-suisse" style={{ fontStyle: 'normal', fontWeight: 500 }}>
            Es el espacio que ocupa este proyecto.
          </span>
        </p>
        <p
          className="font-mono"
          style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em', marginTop: 20 }}
        >
          · Torres Ospina et al., 2025 · Revisión PRISMA · 25 estudios
        </p>
      </motion.div>
    </div>
  );
}

// ── slide ─────────────────────────────────────────────────────────────

export default function Slide04Framework() {
  const tabs: TabItem[] = [
    { id: 'ssl', label: 'SSL · TÉCNICA', content: <SslPanel /> },
    { id: 'normativa', label: 'NORMATIVA · 8 INSTRUMENTOS', content: <NormativaPanel /> },
    { id: 'antecedentes', label: 'ANTECEDENTES · 8 ESTUDIOS', content: <AntecedentesPanel /> },
  ];

  return (
    <div
      className="slide relative w-full overflow-hidden"
      style={{ background: 'var(--color-canvas-ice)', minHeight: '100dvh' }}
    >
      <div className="slide-narrow relative">
        {/* ── header ───────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-6 flex-wrap">
          <span className="eyebrow-up">04 · MARCO CONCEPTUAL</span>
          <span className="pill-yellow">
            <span className="font-mono">8 antecedentes · 8 normativos</span>
          </span>
        </header>

        {/* ── headline ─────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="font-display"
          style={{
            marginTop: 56,
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.92,
            color: 'var(--color-midnight-ink)',
            maxWidth: '22ch',
          }}
        >
          Por qué autosupervisado,
          <br />
          por qué ahora, por qué aquí.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="font-suisse"
          style={{
            marginTop: 24,
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            lineHeight: 1.45,
            letterSpacing: '-0.42px',
            color: 'var(--color-ash-gray)',
            maxWidth: '60ch',
          }}
        >
          Tres pilares · técnica SSL, normativa internacional + nacional, y
          antecedentes verificados.{' '}
          <span className="accent-yellow">Cero usan SSL en Colombia.</span>
        </motion.p>

        {/* ── tabs ─────────────────────────────────────────────── */}
        <div style={{ marginTop: 64 }}>
          <TabsInterno tabs={tabs} initial="ssl" />
        </div>

        {/* ── footer ───────────────────────────────────────────── */}
        <footer
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span className="eyebrow-up" style={{ marginLeft: 8 }}>
              navegar entre tabs
            </span>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: '11px', color: 'var(--color-ash-gray)', letterSpacing: '0.06em' }}
          >
            05 / 09 · TRES PILARES
          </span>
        </footer>
      </div>
    </div>
  );
}
