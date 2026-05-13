import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import CountUp from '@/components/reactbits/CountUp';

const EASE = [0.16, 1, 0.3, 1] as const;

type LensId = 'sexo' | 'edad' | 'localizacion' | 'periodo';

const LENS_OPTIONS: { id: LensId; label: string }[] = [
  { id: 'sexo', label: 'POR SEXO' },
  { id: 'edad', label: 'POR EDAD' },
  { id: 'localizacion', label: 'POR LOCALIZACIÓN' },
  { id: 'periodo', label: 'POR PERÍODO' },
];

// ──────────────────────────────────────────────────────────────────────────
// MINI CHARTS · MONO, sin color, hatch para diferenciar
// ──────────────────────────────────────────────────────────────────────────

function ChartSexo() {
  const max = 140;
  const men = 133;
  const women = 118.2;
  const w = (v: number) => `${(v / max) * 100}%`;
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 items-center" style={{ minHeight: '40px' }}>
        <div
          className="col-span-2 font-condensed uppercase"
          style={{ fontSize: '13px', letterSpacing: '0.18em', color: '#292929' }}
        >
          HOMBRES
        </div>
        <div className="col-span-8 relative" style={{ height: '28px' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="hatch-ink absolute inset-y-0 left-0 origin-left"
            style={{ width: w(men), border: '1px solid #292929' }}
          />
        </div>
        <div
          className="col-span-2 text-right font-mono tabular-nums"
          style={{ fontSize: '15px', color: '#292929', fontWeight: 500 }}
        >
          133,0
        </div>
      </div>
      <div className="grid grid-cols-12 items-center mt-3" style={{ minHeight: '40px' }}>
        <div
          className="col-span-2 font-condensed uppercase"
          style={{ fontSize: '13px', letterSpacing: '0.18em', color: '#292929' }}
        >
          MUJERES
        </div>
        <div className="col-span-8 relative" style={{ height: '28px' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="absolute inset-y-0 left-0 origin-left bg-ink-black"
            style={{ width: w(women) }}
          />
        </div>
        <div
          className="col-span-2 text-right font-mono tabular-nums"
          style={{ fontSize: '15px', color: '#292929', fontWeight: 500 }}
        >
          118,2
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <span
          className="font-condensed uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#646464' }}
        >
          DELTA H − M
        </span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: '13px', color: '#292929', letterSpacing: '0.02em' }}
        >
          + 14,8 /100K · AÑO
        </span>
      </div>
    </div>
  );
}

function ChartEdad() {
  // grupos sintetizados · el dominante 70-79 con 26.6 %
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
      <div className="grid grid-cols-5 items-end gap-0" style={{ height: '160px' }}>
        {groups.map((g, i) => {
          const dominant = g.label === '70-79';
          return (
            <div
              key={g.label}
              className="relative flex items-end justify-center h-full"
              style={{
                borderRight: i === groups.length - 1 ? 'none' : '1px solid #e6e6e6',
              }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
                className="w-[70%] origin-bottom"
                style={{
                  height: `${(g.pct / max) * 100}%`,
                  background: dominant ? '#292929' : '#b4b8b4',
                  border: dominant ? '2px solid #292929' : '1px solid #292929',
                }}
              />
              <span
                className="absolute top-1 left-1/2 -translate-x-1/2 font-mono tabular-nums"
                style={{
                  fontSize: '12px',
                  color: dominant ? '#292929' : '#646464',
                  fontWeight: dominant ? 500 : 400,
                }}
              >
                {g.pct}%
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="mt-2 grid grid-cols-5 gap-0"
        style={{ borderTop: '1px solid #292929' }}
      >
        {groups.map((g) => (
          <div
            key={g.label}
            className="text-center font-condensed uppercase py-2"
            style={{
              fontSize: '12px',
              letterSpacing: '0.16em',
              color: g.label === '70-79' ? '#292929' : '#646464',
              fontWeight: g.label === '70-79' ? 500 : 400,
            }}
          >
            {g.label}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span
          className="font-condensed uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#646464' }}
        >
          GRUPO DOMINANTE
        </span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: '13px', color: '#292929', letterSpacing: '0.02em' }}
        >
          70-79 AÑOS · 26,6 % · EDAD MEDIA 68,2
        </span>
      </div>
    </div>
  );
}

function ChartLocalizacion() {
  const head = 86.8;
  const other = 13.2;
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;
  const stroke = 26;
  const circ = 2 * Math.PI * r;
  const headLen = (head / 100) * circ;
  const otherLen = (other / 100) * circ;

  return (
    <div className="w-full grid grid-cols-12 items-center gap-6">
      <div className="col-span-5 flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <pattern
              id="hatchGrey"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="#b4b8b4" strokeWidth="1" />
            </pattern>
          </defs>
          {/* base ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={stroke}
          />
          {/* head + neck · solid ink */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#292929"
            strokeWidth={stroke}
            strokeDasharray={`${headLen} ${circ}`}
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          {/* others · hatch grey */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#hatchGrey)"
            strokeWidth={stroke}
            strokeDasharray={`${otherLen} ${circ}`}
            strokeDashoffset={-headLen}
            transform={`rotate(-90 ${cx} ${cy})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontFamily="Bebas Neue, Impact, sans-serif"
            fontSize="42"
            fill="#292929"
          >
            86,8
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            fontFamily="Oswald, sans-serif"
            fontSize="11"
            letterSpacing="2.5"
            fill="#646464"
          >
            % CARA + CUELLO
          </text>
        </svg>
      </div>
      <div className="col-span-7">
        <div className="flex items-center gap-3" style={{ minHeight: '32px' }}>
          <span
            className="block bg-ink-black"
            style={{ width: '20px', height: '12px' }}
            aria-hidden
          />
          <span
            className="font-condensed uppercase"
            style={{ fontSize: '13px', letterSpacing: '0.16em', color: '#292929' }}
          >
            CARA + CUELLO
          </span>
          <span
            className="ml-auto font-mono tabular-nums"
            style={{ fontSize: '14px', color: '#292929', fontWeight: 500 }}
          >
            86,8 %
          </span>
        </div>
        <div
          className="flex items-center gap-3 mt-2"
          style={{ minHeight: '32px', borderTop: '1px solid #e6e6e6', paddingTop: '8px' }}
        >
          <span
            className="block hatch-grey"
            style={{ width: '20px', height: '12px', border: '1px solid #b4b8b4' }}
            aria-hidden
          />
          <span
            className="font-condensed uppercase"
            style={{ fontSize: '13px', letterSpacing: '0.16em', color: '#646464' }}
          >
            OTRAS LOCALIZACIONES
          </span>
          <span
            className="ml-auto font-mono tabular-nums"
            style={{ fontSize: '14px', color: '#646464' }}
          >
            13,2 %
          </span>
        </div>
        <p
          className="mt-5 font-nh"
          style={{
            fontSize: '14px',
            lineHeight: 1.4,
            color: '#646464',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            maxWidth: '36ch',
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
  // serie sintetizada · tendencia ascendente 2000–2014 (Uribe 2018 reporta período)
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
  const w = 560;
  const h = 160;
  const padX = 32;
  const padY = 18;
  const maxV = 125;
  const xs = points.map(
    (_, i) => padX + (i * (w - padX * 2)) / (points.length - 1),
  );
  const ys = points.map((p) => h - padY - (p.v / maxV) * (h - padY * 2));
  const path = xs
    .map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`)
    .join(' ');

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '160px' }}
      >
        {/* axes */}
        <line
          x1={padX}
          y1={h - padY}
          x2={w - padX}
          y2={h - padY}
          stroke="#292929"
          strokeWidth="1"
        />
        <line
          x1={padX}
          y1={padY}
          x2={padX}
          y2={h - padY}
          stroke="#292929"
          strokeWidth="1"
        />
        {/* grid horizontals */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padX}
            y1={h - padY - p * (h - padY * 2)}
            x2={w - padX}
            y2={h - padY - p * (h - padY * 2)}
            stroke="#e6e6e6"
            strokeWidth="1"
          />
        ))}
        {/* trend line */}
        <motion.path
          d={path}
          fill="none"
          stroke="#292929"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {/* dots */}
        {xs.map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={ys[i]}
            r="3"
            fill="#292929"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.04, duration: 0.3 }}
          />
        ))}
        {/* axis labels */}
        {points.map((p, i) => (
          <text
            key={p.y}
            x={xs[i]}
            y={h - 4}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="#646464"
          >
            {p.y}
          </text>
        ))}
      </svg>
      <div className="mt-2 flex items-baseline justify-between">
        <span
          className="font-condensed uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#646464' }}
        >
          CASOS ESTIMADOS · BUCARAMANGA AMB
        </span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: '13px', color: '#292929', letterSpacing: '0.02em' }}
        >
          ↑ ASCENDENTE SOSTENIDO · 2000–2014
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// KPI CARDS · hover-reveal + invert
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
    bigSuffix: '%',
    label: 'CÁNCER DE PIEL · CARGA ONCOLÓGICA',
    detail: '3.060 / 19.764 diagnósticos · pico en 2021',
    meta: 'FCV / HIC · 2016 – 2023',
  },
  {
    big: '338',
    bigDecimals: 0,
    bigPrefix: '+',
    bigSuffix: '%',
    label: 'LEISHMANIASIS · BROTE LANDÁZURI',
    detail: '114 casos en 21 semanas epidemiológicas · 63,9 % hombres · mediana 20 años',
    meta: 'SIVIGILA / INS · 2025',
  },
  {
    big: '54',
    bigDecimals: 0,
    bigSuffix: '%',
    label: 'MELANOMA · INVASIVO',
    detail: '5.255 casos nuevos · 80 % de la mortalidad por cáncer de piel',
    meta: 'INC · Colombia 2019',
  },
];

function SecondaryKpi({ kpi, idx, total }: { kpi: Kpi; idx: number; total: number }) {
  const isLast = idx === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.06 * idx, ease: EASE }}
      viewport={{ once: true }}
      className="hover-reveal invert-on-hover relative flex flex-col bg-canvas-white"
      style={{
        borderTop: '1px solid #292929',
        borderBottom: '1px solid #292929',
        borderLeft: '1px solid #292929',
        borderRight: isLast ? '1px solid #292929' : 'none',
        padding: '28px 24px',
        minHeight: '280px',
      }}
      tabIndex={0}
    >
      <span
        className="font-mono"
        style={{
          fontSize: '12px',
          letterSpacing: '0.04em',
          color: '#646464',
        }}
        data-mute
      >
        KPI · {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="metric-display tabular-nums">
          {kpi.bigPrefix ?? ''}
          <CountUp
            value={parseFloat(kpi.big)}
            decimals={kpi.bigDecimals}
            duration={1.6}
          />
          {kpi.bigSuffix ?? ''}
        </span>
      </div>

      <div className="mt-3 h-px bg-ink-black" aria-hidden />

      <span
        className="mt-3 font-condensed uppercase"
        style={{
          fontSize: '13px',
          letterSpacing: '0.18em',
          fontWeight: 500,
        }}
      >
        {kpi.label}
      </span>

      <div className="mt-auto" style={{ paddingTop: '20px', minHeight: '64px' }}>
        <p
          data-reveal
          className="font-nh"
          style={{
            fontSize: '15px',
            lineHeight: 1.45,
            fontWeight: 300,
            letterSpacing: '-0.01em',
          }}
        >
          {kpi.detail}
        </p>
        <p
          data-reveal
          className="mt-3 font-mono"
          style={{
            fontSize: '11px',
            letterSpacing: '0.04em',
          }}
        >
          {kpi.meta}
        </p>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN SLIDE
// ──────────────────────────────────────────────────────────────────────────

export default function Slide01Context() {
  const ref = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<LensId>('sexo');
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-canvas-white text-ink-black"
    >
      {/* Vertical rules */}
      <div
        className="absolute top-0 bottom-0 left-[clamp(24px,5vw,80px)] w-px bg-grey-100 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-0 bottom-0 right-[clamp(24px,5vw,80px)] w-px bg-grey-100 pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-[clamp(40px,7vw,120px)] py-[clamp(56px,8vw,96px)]">
        {/* ── EYEBROW + INDEX ─────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="eyebrow"
            style={{ fontSize: '13px' }}
          >
            01 · CONTEXTO CLÍNICO · SANTANDER
          </motion.span>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#646464',
            }}
          >
            §01 / 09
          </span>
        </div>

        <div className="mt-4 h-px bg-ink-black" aria-hidden />

        {/* ── TITULAR ────────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="mt-10 font-nh max-w-[22ch]"
          style={{
            fontSize: 'clamp(44px, 5.4vw, 72px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            fontWeight: 300,
            color: '#292929',
          }}
        >
          En Bucaramanga, el carcinoma basocelular ya no es una excepción.
        </motion.h2>

        {/* ── HERO METRIC ROW ────────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-12 gap-0 items-start">
          {/* Big number · left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 flex flex-col"
          >
            <span
              className="font-condensed uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.22em',
                color: '#646464',
              }}
            >
              TASA ESTANDARIZADA · CBC
            </span>
            <div className="mt-2 flex items-baseline">
              <span className={reduced ? '' : 'number-rise'}>
                <span className="metric-mega" style={{ fontSize: 'clamp(140px, 18vw, 220px)' }}>
                  <CountUp value={124.2} decimals={1} duration={2.0} />
                </span>
              </span>
            </div>
            <span
              className="mt-1 font-condensed uppercase"
              style={{
                fontSize: '14px',
                letterSpacing: '0.22em',
                color: '#292929',
                fontWeight: 500,
              }}
            >
              / 100K · PERSONAS · AÑO
            </span>
            <span
              className="mt-3 font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.04em',
                color: '#646464',
              }}
            >
              URIBE ET AL. · 2018 · n = 1.669
            </span>
          </motion.div>

          {/* Vertical rule + reading */}
          <div className="col-span-12 lg:col-span-7 mt-12 lg:mt-0 lg:pl-[clamp(24px,3vw,56px)]">
            <div
              className="lg:border-l lg:pl-[clamp(24px,3vw,56px)]"
              style={{ borderColor: '#292929' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                viewport={{ once: true }}
                className="font-condensed uppercase"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.22em',
                  color: '#292929',
                  fontWeight: 500,
                }}
              >
                ── LECTURA EXPLICATIVA
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                viewport={{ once: true }}
                className="mt-4 font-nh"
                style={{
                  fontSize: 'clamp(18px, 1.5vw, 22px)',
                  lineHeight: 1.45,
                  color: '#292929',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  maxWidth: '40ch',
                }}
              >
                124 casos por cada 100.000 habitantes-año. Tasa estandarizada por
                edad sobre <span style={{ fontWeight: 500 }}>1.669 pacientes</span>{' '}
                seguidos en el área metropolitana · la cohorte más amplia jamás
                documentada en el AMB.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
                viewport={{ once: true }}
                className="mt-6 grid grid-cols-2 gap-0"
                style={{ borderTop: '1px solid #292929' }}
              >
                <div
                  className="py-3 pr-4"
                  style={{ borderRight: '1px solid #292929' }}
                >
                  <span
                    className="font-condensed uppercase block"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      color: '#646464',
                    }}
                  >
                    EDAD MEDIA
                  </span>
                  <span
                    className="mt-1 inline-block font-display tabular-nums"
                    style={{ fontSize: '32px', lineHeight: 1, color: '#292929' }}
                  >
                    68,2
                  </span>
                  <span
                    className="ml-2 font-condensed uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      color: '#646464',
                    }}
                  >
                    AÑOS
                  </span>
                </div>
                <div className="py-3 pl-4">
                  <span
                    className="font-condensed uppercase block"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      color: '#646464',
                    }}
                  >
                    DISTRIBUCIÓN
                  </span>
                  <span
                    className="mt-1 inline-block font-display tabular-nums"
                    style={{ fontSize: '32px', lineHeight: 1, color: '#292929' }}
                  >
                    54,5
                  </span>
                  <span
                    className="ml-2 font-condensed uppercase"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      color: '#646464',
                    }}
                  >
                    % MUJERES
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE LENS ROW ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-y-3">
            <span
              className="font-condensed uppercase"
              style={{
                fontSize: '13px',
                letterSpacing: '0.22em',
                color: '#292929',
                fontWeight: 500,
              }}
            >
              ── DESGLOSE DE LA TASA
            </span>
            <div className="seg" role="group" aria-label="Cambiar lente">
              {LENS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={lens === opt.id}
                  onClick={() => setLens(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-6"
            style={{
              border: '1px solid #292929',
              padding: 'clamp(24px, 3vw, 40px)',
              minHeight: '280px',
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

        {/* ── SECONDARY KPIs ─────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between">
            <span
              className="font-condensed uppercase"
              style={{
                fontSize: '13px',
                letterSpacing: '0.22em',
                color: '#292929',
                fontWeight: 500,
              }}
            >
              ── CARGA SECUNDARIA · MÁS ALLÁ DEL CBC
            </span>
            <span
              className="font-mono uppercase"
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: '#646464',
              }}
            >
              HOVER · 3 FUENTES
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-0">
            {SECONDARY_KPIS.map((k, i) => (
              <SecondaryKpi
                key={k.label}
                kpi={k}
                idx={i}
                total={SECONDARY_KPIS.length}
              />
            ))}
          </div>
        </div>

        {/* ── VACÍOS IDENTIFICADOS ───────────────────────────────────── */}
        <div className="mt-20">
          <span
            className="font-condensed uppercase"
            style={{
              fontSize: '13px',
              letterSpacing: '0.22em',
              color: '#292929',
              fontWeight: 500,
            }}
          >
            ── VACÍOS IDENTIFICADOS
          </span>
          <div className="mt-4" style={{ borderTop: '1px solid #292929' }}>
            {[
              {
                title: 'CERO INVESTIGACIONES SSL EN COLOMBIA',
                meta: 'Torres Ospina et al. 2025 · revisión PRISMA · n = 25 papers',
              },
              {
                title: 'SESGO HACIA FOTOTIPOS IV-V EN DATASETS PÚBLICOS',
                meta: 'Daneshjou et al. 2022 · auditoría ISIC',
              },
              {
                title: 'PANDERM (2 M IMÁGENES) FUERA DE ALCANCE REGIONAL',
                meta: 'Yan et al. 2025 · Nature Medicine',
              },
            ].map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                viewport={{ once: true }}
                className="grid grid-cols-12 items-center"
                style={{
                  borderBottom: '1px solid #292929',
                  minHeight: '64px',
                }}
              >
                <div
                  className="col-span-1 flex items-center justify-center font-mono"
                  style={{
                    fontSize: '12px',
                    color: '#646464',
                    borderRight: '1px solid #292929',
                    alignSelf: 'stretch',
                    display: 'flex',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  className="col-span-7 px-5 font-condensed uppercase"
                  style={{
                    fontSize: '16px',
                    letterSpacing: '0.14em',
                    color: '#292929',
                    fontWeight: 500,
                  }}
                >
                  ── {row.title}
                </div>
                <div
                  className="col-span-4 px-5 font-mono text-right"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.02em',
                    color: '#646464',
                    borderLeft: '1px solid #e6e6e6',
                    alignSelf: 'stretch',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  {row.meta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CIERRE NARRATIVO ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          viewport={{ once: true }}
          className="mt-16 card-dark"
          style={{ padding: 'clamp(32px, 4vw, 56px)' }}
        >
          <span
            className="font-condensed uppercase block"
            style={{
              fontSize: '12px',
              letterSpacing: '0.22em',
              color: '#b4b8b4',
              fontWeight: 400,
            }}
          >
            ── DECISIÓN
          </span>
          <p
            className="mt-5 font-display"
            style={{
              fontSize: 'clamp(56px, 6vw, 72px)',
              lineHeight: 0.98,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            HAY DATOS. HAY CARGA. FALTA EL MÉTODO.
          </p>
          <p
            className="mt-6 font-nh max-w-3xl"
            style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              lineHeight: 1.45,
              color: '#ffffff',
              fontWeight: 300,
              letterSpacing: '-0.015em',
            }}
          >
            Un modelo autosupervisado puede aprender de imágenes{' '}
            <span style={{ fontWeight: 500 }}>sin etiquetar</span> · exactamente lo
            que sobra en Santander.
          </p>
        </motion.div>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <div className="mt-12 flex items-baseline justify-between flex-wrap gap-y-3">
          <span
            className="font-mono"
            style={{
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: '#646464',
            }}
          >
            END OF SECTION 01 · GOTO §02
          </span>
          <span
            className="inline-flex items-center font-condensed uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              color: '#292929',
            }}
          >
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span className="ml-2">PARA NAVEGAR</span>
          </span>
        </div>
      </div>
    </div>
  );
}
