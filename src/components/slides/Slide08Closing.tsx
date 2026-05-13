import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { projectMeta } from '@/data/eda';
import SplitText from '@/components/reactbits/SplitText';

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Repository + QR ────────────────────────────────────────────────
const REPO_URL = 'github.com/nicomoreno/sustentacion-objetivo1';
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodeURIComponent(
  'https://' + REPO_URL
)}&color=292929&bgcolor=ffffff&qzone=1&format=svg`;

// ── References · 20 verbatim del anteproyecto ──────────────────────
type RefCategory = 'EPIDEMIO' | 'SSL' | 'NORMATIVA' | 'METODOLOGIA' | 'DATASET';
type Ref = {
  n: number;
  author: string;
  year: string;
  title: string;
  source: string;
  doi: string;
  category: RefCategory;
};

const REFS: Ref[] = [
  {
    n: 1,
    author: 'Uribe CJ et al.',
    year: '2018',
    title: 'Carcinoma basocelular de piel en el área metropolitana de Bucaramanga',
    source: 'Rev Asoc Colomb Dermatol Cir Dermatol 26(1)',
    doi: 'asocolderma.org.co',
    category: 'EPIDEMIO',
  },
  {
    n: 2,
    author: 'FCV / HIC',
    year: '2024',
    title: 'El 15 % de los diagnósticos oncológicos del HIC son de piel',
    source: 'Comunicado de prensa · Fundación Cardiovascular',
    doi: 'fcv.org',
    category: 'EPIDEMIO',
  },
  {
    n: 3,
    author: 'SIVIGILA / INS',
    year: '2025',
    title: 'Boletín Epidemiológico Semana 26 · Leishmaniasis Landázuri',
    source: 'Instituto Nacional de Salud',
    doi: 'ins.gov.co',
    category: 'EPIDEMIO',
  },
  {
    n: 4,
    author: 'Tschandl P, Rosendahl C, Kittler H',
    year: '2018',
    title: 'HAM10000 · Multi-source dermatoscopic images of common pigmented skin lesions',
    source: 'Scientific Data 5, 180161',
    doi: '10.1038/sdata.2018.161',
    category: 'DATASET',
  },
  {
    n: 5,
    author: 'Calderón C, Sánchez K, Argüello H',
    year: '2021',
    title: 'Red bilineal convolucional para clasificación HAM10000',
    source: 'Investigación e Innovación · Colombia',
    doi: 'uis.edu.co',
    category: 'SSL',
  },
  {
    n: 6,
    author: 'Fabian S et al.',
    year: '2024',
    title: 'DINO clustering para detección de ugly duckling en lesiones cutáneas',
    source: 'Computer Vision · Suiza',
    doi: 'arxiv.org/abs/2403',
    category: 'SSL',
  },
  {
    n: 7,
    author: 'Harczos T et al.',
    year: '2024',
    title: 'Barlow Twins para clasificación dermatológica en ISIC 2019',
    source: 'Diagnostics 14(6) · MDPI',
    doi: '10.3390/diagnostics14060627',
    category: 'SSL',
  },
  {
    n: 8,
    author: 'Yan S et al.',
    year: '2025',
    title: 'PanDerm · Foundation model con 2M imágenes dermatológicas',
    source: 'Nature Medicine',
    doi: '10.1038/s41591-025',
    category: 'SSL',
  },
  {
    n: 9,
    author: 'Ríos-Duarte JA et al.',
    year: '2024',
    title: 'CNNs sobre imágenes clínicas vs dermatoscópicas',
    source: 'Skin Research and Technology · Uniandes',
    doi: '10.1111/srt.13568',
    category: 'SSL',
  },
  {
    n: 10,
    author: 'Flórez Fuentes JS et al.',
    year: '2022',
    title: 'Comparativa SVM / KNN / NN / Trees en HAM10000',
    source: 'Rev Colombiana de Tec. Avanzada',
    doi: 'unipamplona.edu.co',
    category: 'SSL',
  },
  {
    n: 11,
    author: 'Torres Ospina et al.',
    year: '2025',
    title: 'Revisión PRISMA · 25 estudios IA aplicada a piel',
    source: 'Ibero Ciencias',
    doi: 'iberoamericana.edu.co',
    category: 'METODOLOGIA',
  },
  {
    n: 12,
    author: 'Himel GMS et al.',
    year: '2024',
    title: 'SkinTrans · Vision Transformer sobre HAM10000',
    source: 'Sensors 24(3) · MDPI',
    doi: '10.3390/s24030781',
    category: 'SSL',
  },
  {
    n: 13,
    author: 'Krishnan R, Rajpurkar P, Topol EJ',
    year: '2022',
    title: 'Self-supervised learning in medicine and healthcare',
    source: 'Nature Biomedical Engineering',
    doi: '10.1038/s41551-022-00914-1',
    category: 'SSL',
  },
  {
    n: 14,
    author: 'Chaitanya K et al.',
    year: '2023',
    title: 'Contrastive self-supervised learning en imagen médica',
    source: 'Medical Image Analysis',
    doi: '10.1016/j.media.2023',
    category: 'SSL',
  },
  {
    n: 15,
    author: 'Asocolderma',
    year: '2024',
    title: 'Guía de Práctica Clínica · Dermatitis atópica',
    source: 'Asociación Colombiana de Dermatología',
    doi: 'asocolderma.org.co/gpc',
    category: 'NORMATIVA',
  },
  {
    n: 16,
    author: 'Wirth R, Hipp J',
    year: '2000',
    title: 'CRISP-DM · Towards a standard process model for data mining',
    source: 'Proc. PAKDD 2000',
    doi: 'crisp-dm.eu',
    category: 'METODOLOGIA',
  },
  {
    n: 17,
    author: 'Parlamento Europeo',
    year: '2016',
    title: 'Reglamento General de Protección de Datos · GDPR',
    source: 'Diario Oficial UE L 119/1',
    doi: 'eur-lex.europa.eu',
    category: 'NORMATIVA',
  },
  {
    n: 18,
    author: 'Congreso de Colombia',
    year: '2012',
    title: 'Ley 1581 + Decreto 1377 / 2013 · Protección Datos Personales',
    source: 'República de Colombia',
    doi: 'mintic.gov.co',
    category: 'NORMATIVA',
  },
  {
    n: 19,
    author: 'CONPES 4144 · DNP',
    year: '2023',
    title: 'Política Nacional de Inteligencia Artificial · Colombia',
    source: 'Departamento Nacional de Planeación',
    doi: 'dnp.gov.co',
    category: 'NORMATIVA',
  },
  {
    n: 20,
    author: 'Hammimou Y et al.',
    year: '2025',
    title: 'Skin lesion segmentation · revisión sistemática',
    source: 'Scientific African',
    doi: '10.1016/j.sciaf.2025',
    category: 'METODOLOGIA',
  },
];

type Filter = 'TODAS' | RefCategory;

const FILTERS: Filter[] = ['TODAS', 'EPIDEMIO', 'SSL', 'NORMATIVA'];

export default function Slide08Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('TODAS');
  const [ruleDone, setRuleDone] = useState(false);

  const filteredRefs = useMemo(() => {
    if (filter === 'TODAS') return REFS;
    return REFS.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-canvas-white">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] pt-20 pb-12">
        {/* ── Top header ──────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <span className="eyebrow">08 · CIERRE · Q&A</span>
          <span className="flex-1 h-px" style={{ background: '#292929' }} />
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            END OF DOCUMENT · 09 / 09
          </span>
        </div>

        {/* ── Headline cinematográfico ────────────────────────── */}
        <div className="mt-14 text-center">
          <h2
            className="font-ev text-ink-black"
            style={{
              fontSize: 'clamp(72px, 11vw, 160px)',
              lineHeight: 0.92,
              letterSpacing: '-0.05em',
              fontWeight: 100,
            }}
          >
            <SplitText
              text="Quedamos"
              as="span"
              trigger="scroll"
              stagger={0.05}
              duration={0.9}
              className="block"
            />
            <SplitText
              text="atentos"
              as="span"
              trigger="scroll"
              stagger={0.05}
              duration={0.9}
              delay={0.35}
              className="block"
            />
            <SplitText
              text="a sus preguntas."
              as="span"
              trigger="scroll"
              stagger={0.045}
              duration={0.9}
              delay={0.7}
              className="block"
            />
          </h2>

          {/* ── Animated rule ─────────────────────────────────── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            onAnimationComplete={() => setRuleDone(true)}
            transition={{ delay: 1.5, duration: 0.85, ease: EASE }}
            viewport={{ once: true }}
            className="mx-auto mt-10 h-px"
            style={{
              width: '60%',
              background: '#292929',
              transformOrigin: 'left center',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={ruleDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-8 mx-auto font-nh font-light italic text-ink-black"
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: '50ch',
            }}
          >
            El primer objetivo deja una base reproducible. Lo que viene se construye sobre estos datos.
          </motion.p>
        </div>

        {/* ── Two columns ─────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── LEFT · Agradecimientos + contacto ──────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            viewport={{ once: true }}
            className="lg:col-span-7 card"
            style={{ padding: 0 }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: '14px 18px', borderBottom: '1px solid #292929' }}
            >
              <span className="eyebrow">── AGRADECIMIENTOS</span>
              <span
                className="font-condensed text-ink-black"
                style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                03 PERSONAS
              </span>
            </div>

            {/* ── Sub-card · Director ─────────────────── */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: '1fr',
              }}
            >
              {[
                {
                  role: 'DIRECCIÓN',
                  name: 'Andrés Felipe Jerez Ariza',
                  affiliation: 'UNAB · Ingeniería de Sistemas',
                },
                {
                  role: 'ASESORÍA · CO-DIRECTORA',
                  name: 'Karen Yaneth Sánchez Quiroga',
                  affiliation: projectMeta.advisorAffiliation,
                },
                {
                  role: 'JURADO',
                  name: 'Comité evaluador · Proyecto de Grado I',
                  affiliation: 'Por la rigurosidad y disponibilidad',
                },
              ].map((p, i) => (
                <div
                  key={p.role}
                  className="magnet-frame"
                  style={{
                    padding: '18px 18px',
                    borderTop: i === 0 ? 'none' : '1px solid #e6e6e6',
                  }}
                >
                  <p
                    className="font-condensed text-ink-black"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.role}
                  </p>
                  <p
                    className="mt-2 font-nh text-ink-black"
                    style={{ fontSize: 18, lineHeight: 1.3, fontWeight: 500 }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="mt-1 font-nh text-ink-black"
                    style={{ fontSize: 14, lineHeight: 1.4, opacity: 0.7 }}
                  >
                    {p.affiliation}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Sub-card · Contacto (card-dark interna) ─────── */}
            <div
              className="card-dark"
              style={{ padding: 18, borderTop: '1px solid #292929' }}
            >
              <span
                className="font-condensed"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                ── CONTACTO
              </span>
              <div className="mt-3 grid gap-1.5">
                {[
                  ['MAIL.A', 'nmoreno@unab.edu.co'],
                  ['MAIL.B', 'psaavedra@unab.edu.co'],
                  ['REPO ', REPO_URL],
                  ['TEL  ', '+57 ·· UNAB Bucaramanga'],
                ].map(([k, v]) => (
                  <p
                    key={k}
                    className="font-mono tabular-nums"
                    style={{
                      fontSize: 13,
                      color: '#ffffff',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ opacity: 0.5 }}>{k} · </span>
                    {v}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT · QR + repositorio ────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="card magnet-frame" style={{ padding: 0 }}>
              <div
                className="flex items-center justify-between"
                style={{ padding: '14px 18px', borderBottom: '1px solid #292929' }}
              >
                <span className="eyebrow">── REPOSITORIO + COLAB</span>
                <span
                  className="font-condensed text-ink-black"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    border: '1px solid #292929',
                    padding: '3px 8px',
                  }}
                >
                  SCAN ↗
                </span>
              </div>

              {/* ── QR ──────────────────────────── */}
              <div
                style={{
                  padding: 18,
                  background: '#ffffff',
                  borderBottom: '1px solid #292929',
                }}
              >
                <div
                  className="mx-auto"
                  style={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    maxWidth: 320,
                    border: '1px solid #292929',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#ffffff',
                  }}
                >
                  <img
                    src={QR_SRC}
                    alt={`QR code · ${REPO_URL}`}
                    style={{
                      display: 'block',
                      width: '92%',
                      height: '92%',
                    }}
                  />
                </div>
              </div>

              {/* ── URL ──────────────────────────── */}
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #292929' }}>
                <p
                  className="font-nh text-ink-black"
                  style={{ fontSize: 14, lineHeight: 1.4, fontWeight: 500, wordBreak: 'break-all' }}
                >
                  {REPO_URL}
                </p>
              </div>

              {/* ── License strip ───────────────── */}
              <div
                className="grid grid-cols-3"
                style={{ padding: 0 }}
              >
                {[
                  ['CODE', 'MIT'],
                  ['DATA', 'CC-BY-NC 4.0'],
                  ['PROTO', 'STREAMLIT'],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    style={{
                      padding: '12px 14px',
                      borderLeft: i === 0 ? 'none' : '1px solid #292929',
                    }}
                  >
                    <p
                      className="font-condensed text-ink-black"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.55,
                      }}
                    >
                      {k}
                    </p>
                    <p
                      className="mt-1 font-mono text-ink-black"
                      style={{ fontSize: 12, letterSpacing: '0.05em' }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── References rail ──────────────────────────────────────── */}
      <section className="relative w-full max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)] pb-20">
        <div className="flex items-center flex-wrap gap-4 mb-5">
          <span className="eyebrow">── REFERENCIAS · {String(REFS.length).padStart(2, '0')}</span>
          <span className="flex-1 h-px" style={{ background: '#292929' }} />
          <div className="seg" role="group" aria-label="Filtro de referencias">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-x-auto"
          style={{
            touchAction: 'pan-x pan-y',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'thin',
            scrollbarColor: '#292929 transparent',
            borderTop: '1px solid #292929',
            borderBottom: '1px solid #292929',
            padding: '18px 0',
          }}
        >
          <div className="flex items-stretch gap-3">
            {filteredRefs.map((r, i) => (
              <motion.article
                key={r.n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.4, ease: EASE }}
                viewport={{ once: true, amount: 0.2 }}
                className="shrink-0 bg-canvas-white flex flex-col magnet-frame"
                style={{
                  border: '1px solid #292929',
                  padding: 16,
                  minWidth: 300,
                  maxWidth: 300,
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-ink-black leading-none tabular-nums"
                    style={{ fontSize: 32, letterSpacing: 0 }}
                  >
                    [{String(r.n).padStart(2, '0')}]
                  </span>
                  <span
                    className="font-condensed text-ink-black"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      border: '1px solid #292929',
                      padding: '2px 6px',
                    }}
                  >
                    {r.category}
                  </span>
                </div>

                <div
                  className="mt-3 h-px w-full"
                  style={{ background: '#292929' }}
                />

                <p
                  className="mt-3 font-nh text-ink-black"
                  style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}
                >
                  {r.author} · {r.year}
                </p>
                <p
                  className="mt-2 font-nh text-ink-black"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.35,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.title}
                </p>
                <p
                  className="mt-2 font-nh italic text-ink-black"
                  style={{ fontSize: 12, lineHeight: 1.4, opacity: 0.7 }}
                >
                  {r.source}
                </p>
                <p
                  className="mt-auto pt-3 font-mono text-ink-black"
                  style={{
                    fontSize: 11,
                    lineHeight: 1.4,
                    opacity: 0.65,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {r.doi}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Drag hint ─────────────────────────────────────── */}
        <div className="mt-3 flex items-center gap-2">
          <span className="kbd">←</span>
          <span className="kbd">→</span>
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            arrastrar para navegar
          </span>
          <span className="flex-1" />
          <span
            className="font-condensed text-ink-black"
            style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            {filter === 'TODAS' ? REFS.length : filteredRefs.length} / {REFS.length}
          </span>
        </div>

        {/* ── FIN marker ────────────────────────────────────── */}
        <div className="mt-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="eyebrow">── UNIVERSIDAD</span>
            <p
              className="mt-3 font-nh text-ink-black"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              {projectMeta.university}
            </p>
            <p
              className="mt-1 font-condensed text-ink-black"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              {projectMeta.course}
            </p>
          </div>

          <div className="text-right">
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ── FIN DE LA SUSTENTACIÓN
            </span>
            <div
              className="mt-3 h-px"
              style={{ background: '#292929', width: 220, marginLeft: 'auto' }}
            />
            <p
              className="mt-3 font-condensed text-ink-black"
              style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              01 OBJETIVO COMPLETADO · 03 PENDIENTES
            </p>
          </div>
        </div>

        {/* ── Footer kbd hints ──────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="kbd">N</span>
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              notas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">T</span>
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              timer
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">R</span>
            <span
              className="font-condensed text-ink-black"
              style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              reset
            </span>
          </div>
          <span className="flex-1" />
          <span
            className="font-mono text-ink-black"
            style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55 }}
          >
            MONO X7 · 2026
          </span>
        </div>
      </section>
    </div>
  );
}
