import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import CountUp from '@/components/reactbits/CountUp';

const EASE = [0.16, 1, 0.3, 1] as const;

type LensId = 'sexo' | 'edad' | 'localizacion' | 'periodo';

const LENS_OPTIONS: { id: LensId; label: string }[] = [
  { id: 'sexo', label: 'Sexo' },
  { id: 'edad', label: 'Edad' },
  { id: 'localizacion', label: 'Localización' },
  { id: 'periodo', label: 'Período' },
];

// ──────────────────────────────────────────────────────────────────────────
// MINI CHARTS — Achromatic with ink + accent green spots
// ──────────────────────────────────────────────────────────────────────────

function ChartSexo() {
  const max = 140;
  const men = 133;
  const women = 118.2;
  const w = (v: number) => `${(v / max) * 100}%`;
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 items-center gap-3" style={{ minHeight: 44 }}>
        <span
          className="col-span-3 font-mono"
          style={{ fontSize: 13, color: 'var(--color-ash-gray)', letterSpacing: '-0.36px' }}
        >
          hombres
        </span>
        <div className="col-span-7 relative" style={{ height: 32 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              width: w(men),
              background: 'var(--color-midnight-ink)',
              borderRadius: 8,
            }}
          />
        </div>
        <span
          className="col-span-2 font-mono tabular-nums text-right"
          style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-midnight-ink)' }}
        >
          133,0
        </span>
      </div>

      <div className="mt-3 grid grid-cols-12 items-center gap-3" style={{ minHeight: 44 }}>
        <span
          className="col-span-3 font-mono"
          style={{ fontSize: 13, color: 'var(--color-ash-gray)', letterSpacing: '-0.36px' }}
        >
          mujeres
        </span>
        <div className="col-span-7 relative" style={{ height: 32 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              width: w(women),
              background: 'var(--color-fog-gray)',
              borderRadius: 8,
            }}
          />
        </div>
        <span
          className="col-span-2 font-mono tabular-nums text-right"
          style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-midnight-ink)' }}
        >
          118,2
        </span>
      </div>

      <div className="mt-6 flex items-baseline justify-between">
        <span className="eyebrow-up">Delta · hombres − mujeres</span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: 14, color: 'var(--color-midnight-ink)', fontWeight: 500 }}
        >
          + 14,8 / 100K · año
        </span>
      </div>
    </div>
  );
}

function ChartEdad() {
  const groups = [
    { label: '40-49', pct: 9.6 },
    { label: '50-59', pct: 15.4 },
    { label: '60-69', pct: 22.1 },
    { label: '70-79', pct: 26.6 },
    { label: '80+', pct: 18.3 },
  ];
  const max = 28;
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 items-end gap-3" style={{ height: 180 }}>
        {groups.map((g, i) => {
          const dominant = g.label === '70-79';
          return (
            <div key={g.label} className="relative flex flex-col items-center justify-end h-full">
              <span
                className="font-mono tabular-nums mb-2"
                style={{
                  fontSize: 12,
                  color: dominant ? 'var(--color-midnight-ink)' : 'var(--color-ash-gray)',
                  fontWeight: dominant ? 500 : 400,
                }}
              >
                {g.pct}%
              </span>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
                className="w-full origin-bottom"
                style={{
                  height: `${(g.pct / max) * 100}%`,
                  background: dominant
                    ? 'var(--color-midnight-ink)'
                    : 'var(--color-fog-gray)',
                  borderRadius: '12px 12px 0 0',
                }}
              />
              <span
                className="font-mono mt-2"
                style={{
                  fontSize: 11,
                  color: dominant ? 'var(--color-midnight-ink)' : 'var(--color-ash-gray)',
                  fontWeight: dominant ? 500 : 400,
                  letterSpacing: '-0.36px',
                }}
              >
                {g.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-baseline justify-between">
        <span className="eyebrow-up">Grupo dominante</span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: 14, color: 'var(--color-midnight-ink)', fontWeight: 500 }}
        >
          70-79 años · 26,6 % · edad media 68,2
        </span>
      </div>
    </div>
  );
}

function ChartLocalizacion() {
  const head = 86.8;
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const stroke = 22;
  const circ = 2 * Math.PI * r;
  const headLen = (head / 100) * circ;

  return (
    <div className="w-full grid grid-cols-12 items-center gap-6">
      <div className="col-span-12 md:col-span-5 flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--color-midnight-ink)"
            strokeWidth={stroke}
            strokeDasharray={`${headLen} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontFamily="Bebas Neue, sans-serif"
            fontSize="56"
            fill="var(--color-midnight-ink)"
            letterSpacing="-1"
          >
            86,8
          </text>
          <text
            x={cx}
            y={cy + 22}
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            letterSpacing="1.8"
            fill="var(--color-ash-gray)"
          >
            % CARA + CUELLO
          </text>
        </svg>
      </div>
      <div className="col-span-12 md:col-span-7 space-y-4">
        <div className="flex items-center gap-3">
          <span
            className="block"
            style={{
              width: 20,
              height: 12,
              background: 'var(--color-midnight-ink)',
              borderRadius: 4,
            }}
            aria-hidden
          />
          <span
            className="font-suisse"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--color-midnight-ink)',
              letterSpacing: '-0.42px',
            }}
          >
            cara + cuello
          </span>
          <span
            className="ml-auto font-mono tabular-nums"
            style={{ fontSize: 15, color: 'var(--color-midnight-ink)', fontWeight: 500 }}
          >
            86,8 %
          </span>
        </div>
        <div
          className="flex items-center gap-3 pt-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <span
            className="block"
            style={{
              width: 20,
              height: 12,
              background: 'rgba(0,0,0,0.12)',
              borderRadius: 4,
            }}
            aria-hidden
          />
          <span
            className="font-suisse"
            style={{
              fontSize: 14,
              color: 'var(--color-ash-gray)',
              letterSpacing: '-0.36px',
            }}
          >
            otras localizaciones
          </span>
          <span
            className="ml-auto font-mono tabular-nums"
            style={{ fontSize: 14, color: 'var(--color-ash-gray)' }}
          >
            13,2 %
          </span>
        </div>
        <p
          className="font-suisse pt-3"
          style={{
            fontSize: 14,
            lineHeight: 1.4,
            color: 'var(--color-ash-gray)',
            letterSpacing: '-0.36px',
            maxWidth: '38ch',
            borderTop: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          Zona fotoexpuesta dominante · coherente con etiología solar acumulada en
          climas tropicales de altura.
        </p>
      </div>
    </div>
  );
}

function ChartPeriodo() {
  const points = [
    { y: 2000, v: 18 },
    { y: 2002, v: 24 },
    { y: 2004, v: 32 },
    { y: 2006, v: 41 },
    { y: 2008, v: 53 },
    { y: 2010, v: 68 },
    { y: 2012, v: 89 },
    { y: 2014, v: 118 },
  ];
  const w = 640;
  const h = 180;
  const padX = 32;
  const padY = 20;
  const maxV = 125;
  const xs = points.map((_, i) => padX + (i * (w - padX * 2)) / (points.length - 1));
  const ys = points.map((p) => h - padY - (p.v / maxV) * (h - padY * 2));
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ');
  const fillPath = `${path} L ${xs[xs.length - 1]} ${h - padY} L ${xs[0]} ${h - padY} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 180 }}>
        <defs>
          <linearGradient id="periodoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padX}
            y1={h - padY - p * (h - padY * 2)}
            x2={w - padX}
            y2={h - padY - p * (h - padY * 2)}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        ))}
        <motion.path
          d={fillPath}
          fill="url(#periodoFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-midnight-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {xs.map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={ys[i]}
            r={i === xs.length - 1 ? 5 : 3}
            fill={i === xs.length - 1 ? 'var(--color-action-green)' : 'var(--color-midnight-ink)'}
            stroke={i === xs.length - 1 ? 'var(--color-midnight-ink)' : 'none'}
            strokeWidth={i === xs.length - 1 ? 2 : 0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.04, duration: 0.3 }}
          />
        ))}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={p.y}
              x={xs[i]}
              y={h - 4}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11"
              fill="var(--color-ash-gray)"
            >
              {p.y}
            </text>
          ) : null,
        )}
      </svg>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="eyebrow-up">Casos estimados · Bucaramanga AMB</span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: 14, color: 'var(--color-midnight-ink)', fontWeight: 500 }}
        >
          ↑ ascendente sostenido · 2000–2014
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// KPI CARDS
// ──────────────────────────────────────────────────────────────────────────

type Kpi = {
  big: string;
  bigDecimals: number;
  bigPrefix?: string;
  bigSuffix?: string;
  label: string;
  detail: string;
  meta: string;
};

const SECONDARY_KPIS: Kpi[] = [
  {
    big: '15',
    bigDecimals: 0,
    bigSuffix: ' %',
    label: 'Cáncer de piel · carga oncológica',
    detail: '3.060 / 19.764 diagnósticos · pico en 2021',
    meta: 'FCV / HIC · 2016 – 2023',
  },
  {
    big: '338',
    bigDecimals: 0,
    bigPrefix: '+',
    bigSuffix: ' %',
    label: 'Leishmaniasis · brote Landázuri',
    detail:
      '114 casos en 21 semanas epidemiológicas · 63,9 % hombres · mediana 20 años',
    meta: 'SIVIGILA / INS · 2025',
  },
  {
    big: '54',
    bigDecimals: 0,
    bigSuffix: ' %',
    label: 'Melanoma · invasivo',
    detail: '5.255 casos nuevos · 80 % de la mortalidad por cáncer de piel',
    meta: 'INC · Colombia 2019',
  },
];

function SecondaryKpi({ kpi, idx }: { kpi: Kpi; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.06 * idx, ease: EASE }}
      viewport={{ once: true }}
      className="card hover-reveal flex flex-col"
      style={{
        padding: 'clamp(24px,2.4vw,32px)',
        minHeight: 260,
      }}
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow-up">
          KPI · {String(idx + 1).padStart(2, '0')} / 03
        </span>
        <span
          className="pill-accent"
          style={{ fontSize: 11 }}
          data-hide
        >
          hover
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="metric-display tabular-nums">
          {kpi.bigPrefix ?? ''}
          <CountUp value={parseFloat(kpi.big)} decimals={kpi.bigDecimals} duration={1.6} />
          {kpi.bigSuffix ?? ''}
        </span>
      </div>

      <span
        className="mt-4 font-suisse"
        style={{
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: '-0.42px',
          color: 'var(--color-midnight-ink)',
        }}
      >
        {kpi.label}
      </span>

      <div className="mt-auto pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p
          data-reveal
          className="font-suisse"
          style={{
            fontSize: 14,
            lineHeight: 1.45,
            fontWeight: 450,
            letterSpacing: '-0.36px',
            color: 'var(--color-ash-gray)',
          }}
        >
          {kpi.detail}
        </p>
        <p
          data-reveal
          className="mt-3 font-mono"
          style={{
            fontSize: 11,
            letterSpacing: 0.36,
            textTransform: 'uppercase',
            color: 'var(--color-ash-gray)',
          }}
        >
          {kpi.meta}
        </p>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// VACÍO CARD
// ──────────────────────────────────────────────────────────────────────────

type Vacio = {
  n: string;
  title: string;
  detail: string;
  source: string;
};

const VACIOS: Vacio[] = [
  {
    n: '01',
    title: 'Cero SSL en Colombia',
    detail:
      'Revisión sistemática PRISMA sobre 25 papers nacionales · ningún trabajo aplica aprendizaje autosupervisado a dermatología.',
    source: 'Torres Ospina et al. · 2025',
  },
  {
    n: '02',
    title: 'Sesgo fototipos IV-V',
    detail:
      'Auditoría ISIC mostró representación insuficiente de piel oscura · falsos negativos sistemáticos en piel latina.',
    source: 'Daneshjou et al. · 2022',
  },
  {
    n: '03',
    title: 'PanDerm fuera de alcance',
    detail:
      '2 millones de imágenes y cómputo de frontera · arquitectura inalcanzable para grupos regionales de Santander.',
    source: 'Yan et al. · 2025 · Nature Medicine',
  },
];

function VacioCard({ v, idx }: { v: Vacio; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.08 * idx, ease: EASE }}
      viewport={{ once: true }}
      className="card-fog flex flex-col"
      style={{ padding: 'clamp(28px,2.6vw,40px)', minHeight: 280 }}
    >
      <div className="flex items-baseline justify-between">
        <span
          className="font-display"
          style={{
            fontSize: 64,
            lineHeight: 1,
            color: 'var(--color-midnight-ink)',
            letterSpacing: '-0.03em',
          }}
        >
          {v.n}
        </span>
        <span
          className="pill"
          style={{ fontSize: 11 }}
        >
          vacío
        </span>
      </div>

      <p
        className="mt-6 font-suisse"
        style={{
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '-0.72px',
          color: 'var(--color-midnight-ink)',
          lineHeight: 1.2,
        }}
      >
        {v.title}
      </p>

      <p
        className="mt-3 font-suisse"
        style={{
          fontSize: 14,
          fontWeight: 450,
          lineHeight: 1.45,
          letterSpacing: '-0.36px',
          color: 'var(--color-ash-gray)',
          maxWidth: '34ch',
        }}
      >
        {v.detail}
      </p>

      <p
        className="mt-auto pt-5 font-mono"
        style={{
          fontSize: 11,
          letterSpacing: 0.36,
          textTransform: 'uppercase',
          color: 'var(--color-deep-smoke)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {v.source}
      </p>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SLIDE
// ──────────────────────────────────────────────────────────────────────────

export default function Slide01Context() {
  const ref = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<LensId>('sexo');

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--color-canvas-ice)', color: 'var(--color-midnight-ink)' }}
    >
      <div className="absolute inset-0 gradient-architectural pointer-events-none" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-[clamp(24px,5vw,64px)] py-[clamp(56px,8vw,96px)]">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <span className="eyebrow-up">01 · CONTEXTO CLÍNICO · SANTANDER</span>
          <span className="pill-yellow">Datos epidemiológicos verificados</span>
        </motion.div>

        {/* ── HEADLINE ─────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="font-display mt-[clamp(40px,5vw,72px)]"
          style={{
            fontSize: 'clamp(56px, 9vw, 130px)',
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            color: 'var(--color-midnight-ink)',
          }}
        >
          EN BUCARAMANGA, EL
          <br />
          CARCINOMA BASOCELULAR
          <br />
          <span style={{ color: 'var(--color-ash-gray)' }}>YA NO ES UNA EXCEPCIÓN.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          viewport={{ once: true }}
          className="mt-8 font-suisse"
          style={{
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            lineHeight: 1.4,
            fontWeight: 450,
            letterSpacing: '-0.42px',
            color: 'var(--color-ash-gray)',
            maxWidth: '62ch',
          }}
        >
          Tres datasets epidemiológicos verificados confirman la escala regional
          del problema · datos públicos suficientes para justificar el método.
        </motion.p>

        {/* ── MEGA HERO + KPI STACK ──────────────────────── */}
        <div className="mt-[clamp(48px,7vw,96px)] grid grid-cols-1 lg:grid-cols-12 gap-[clamp(16px,2vw,24px)] items-stretch">
          {/* MEGA HERO · col 7 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            viewport={{ once: true }}
            className="card-solid lg:col-span-7 flex flex-col"
            style={{ padding: 'clamp(32px,3.5vw,56px)' }}
          >
            <div className="flex items-baseline justify-between">
              <span
                className="font-mono"
                style={{
                  fontSize: 12,
                  letterSpacing: 0.36,
                  textTransform: 'uppercase',
                  color: 'var(--color-fog-gray)',
                }}
              >
                Tasa estandarizada · CBC
              </span>
              <span className="pill-accent">
                <span className="pulse-dot" aria-hidden />
                verificado
              </span>
            </div>

            <div className="mt-8 flex items-baseline gap-3">
              <span
                className="font-display tabular-nums"
                style={{
                  fontSize: 'clamp(120px, 16vw, 220px)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-action-green)',
                }}
              >
                <CountUp value={124.2} decimals={1} duration={2.0} />
              </span>
            </div>
            <span
              className="mt-2 font-mono"
              style={{
                fontSize: 14,
                letterSpacing: 0.36,
                textTransform: 'uppercase',
                color: 'var(--color-paper-white)',
              }}
            >
              / 100K · personas-año
            </span>
            <p
              className="mt-4 font-suisse"
              style={{
                fontSize: 16,
                lineHeight: 1.45,
                fontWeight: 450,
                letterSpacing: '-0.42px',
                color: 'var(--color-fog-gray)',
                maxWidth: '48ch',
              }}
            >
              Tasa estandarizada por edad · cohorte más amplia documentada en
              Bucaramanga AMB · Uribe et al. 2018, n = 1.669 pacientes.
            </p>

            {/* Segmented toggle */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: 0.36,
                  textTransform: 'uppercase',
                  color: 'var(--color-fog-gray)',
                }}
              >
                desglose
              </span>
              <div
                className="seg"
                role="group"
                aria-label="Desglose de la tasa"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              >
                {LENS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={lens === opt.id}
                    onClick={() => setLens(opt.id)}
                    style={
                      lens === opt.id
                        ? {
                            background: 'var(--color-action-green)',
                            color: 'var(--color-midnight-ink)',
                          }
                        : { color: 'var(--color-fog-gray)' }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inline mini-chart */}
            <div
              className="mt-6 rounded-2xl"
              style={{
                background: 'var(--color-paper-white)',
                padding: 'clamp(20px,2.2vw,32px)',
                color: 'var(--color-midnight-ink)',
                minHeight: 220,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lens}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {lens === 'sexo' && <ChartSexo />}
                  {lens === 'edad' && <ChartEdad />}
                  {lens === 'localizacion' && <ChartLocalizacion />}
                  {lens === 'periodo' && <ChartPeriodo />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* KPI STACK · col 5 */}
          <div className="lg:col-span-5 flex flex-col gap-[clamp(16px,2vw,24px)]">
            {SECONDARY_KPIS.map((k, i) => (
              <SecondaryKpi key={k.label} kpi={k} idx={i} />
            ))}
          </div>
        </div>

        {/* ── VACÍOS IDENTIFICADOS ──────────────────────── */}
        <div className="mt-[clamp(56px,7vw,96px)]">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-8">
            <div>
              <span className="eyebrow-up">Vacíos identificados</span>
              <h3
                className="font-suisse mt-2"
                style={{
                  fontSize: 'clamp(28px,3vw,40px)',
                  fontWeight: 500,
                  letterSpacing: '-1.12px',
                  color: 'var(--color-midnight-ink)',
                  lineHeight: 1.05,
                }}
              >
                Lo que falta en el estado del arte regional.
              </h3>
            </div>
            <span
              className="pill"
              style={{ fontSize: 12 }}
            >
              3 hallazgos · revisión 2022 – 2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(16px,2vw,24px)]">
            {VACIOS.map((v, i) => (
              <VacioCard key={v.n} v={v} idx={i} />
            ))}
          </div>
        </div>

        {/* ── CIERRE CARD-ACCENT ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          viewport={{ once: true }}
          className="card-accent mt-[clamp(56px,7vw,96px)]"
          style={{ padding: 'clamp(40px,5vw,80px)' }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                letterSpacing: 0.36,
                textTransform: 'uppercase',
                color: 'var(--color-midnight-ink)',
              }}
            >
              Conclusión sección
            </span>
            <span
              className="pill-ink"
              style={{ fontSize: 11 }}
            >
              §01 → §02
            </span>
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: 'clamp(56px, 9vw, 130px)',
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              color: 'var(--color-midnight-ink)',
            }}
          >
            HAY DATOS.
            <br />
            HAY CARGA.
            <br />
            FALTA EL MÉTODO.
          </h3>
          <p
            className="mt-8 font-suisse"
            style={{
              fontSize: 18,
              lineHeight: 1.4,
              fontWeight: 500,
              letterSpacing: '-0.42px',
              color: 'var(--color-midnight-ink)',
              maxWidth: '54ch',
            }}
          >
            Un modelo autosupervisado puede aprender de imágenes sin etiquetar ·
            exactamente lo que sobra en Santander.
          </p>
        </motion.div>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <div className="mt-12 flex items-baseline justify-between flex-wrap gap-y-3">
          <span
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: '-0.36px',
              color: 'var(--color-ash-gray)',
            }}
          >
            → pregunta de investigación · §02
          </span>
          <span
            className="font-mono inline-flex items-center gap-2"
            style={{
              fontSize: 12,
              letterSpacing: '-0.36px',
              color: 'var(--color-ash-gray)',
            }}
          >
            navegar <span className="kbd">←</span><span className="kbd">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
