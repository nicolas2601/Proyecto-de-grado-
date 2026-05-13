import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { projectMeta } from '@/data/eda';
import SplitText from '@/components/reactbits/SplitText';

const EASE = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────
// Repository + QR
// ─────────────────────────────────────────────────────────────────────
const REPO_URL = 'github.com/nicolas2601/Proyecto-de-grado-';
const REPO_FULL = `https://${REPO_URL}`;
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
  REPO_FULL,
)}&qzone=1&format=svg`;

// ─────────────────────────────────────────────────────────────────────
// Referencias · 20 verbatim del anteproyecto
// ─────────────────────────────────────────────────────────────────────
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
    source: 'Rev Asoc Colomb Dermatol 26(1)',
    doi: 'asocolderma.org.co',
    category: 'EPIDEMIO',
  },
  {
    n: 2,
    author: 'FCV / HIC',
    year: '2024',
    title: 'El 15 % de los diagnósticos oncológicos del HIC son de piel',
    source: 'Comunicado FCV',
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
    title: 'HAM10000 · Multi-source dermatoscopic images of common pigmented lesions',
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

// ─────────────────────────────────────────────────────────────────────
// SLIDE 08
// ─────────────────────────────────────────────────────────────────────
export default function Slide08Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('TODAS');
  const [ruleDone, setRuleDone] = useState(false);

  const filteredRefs = useMemo(() => {
    if (filter === 'TODAS') return REFS;
    return REFS.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <div
      ref={ref}
      className="slide relative w-full"
      style={{ overflow: 'clip', background: '#e5e7eb' }}
    >
      <div className="slide-narrow relative">
        {/* HEADER ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="eyebrow-up">08 · CIERRE · Q&amp;A</span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.04em',
              color: '#444444',
            }}
          >
            END OF DOC · 09 / 09 · 2026.05.13
          </span>
        </div>

        {/* HERO HEADLINE ───────────────────────────────────── */}
        <div className="mt-16 md:mt-24 text-center">
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(72px, 11vw, 180px)',
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              color: '#000000',
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

          {/* Animated rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            onAnimationComplete={() => setRuleDone(true)}
            transition={{ delay: 1.5, duration: 0.85, ease: EASE }}
            viewport={{ once: true }}
            className="mx-auto mt-12"
            style={{
              width: '60%',
              maxWidth: 720,
              height: 1,
              background: '#000000',
              transformOrigin: 'left center',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={ruleDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-8 mx-auto"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.6vw, 28px)',
              lineHeight: 1.4,
              color: '#000000',
              maxWidth: '60ch',
              letterSpacing: '-0.01em',
            }}
          >
            El primer objetivo deja una base reproducible. Lo que viene se construye sobre estos datos.
          </motion.p>
        </div>

        {/* BENTO 7 + 5 ───────────────────────────────────── */}
        <div className="bento mt-20 md:mt-28">
          {/* LEFT 7 · Agradecimientos */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            viewport={{ once: true }}
            className="card"
            style={{ gridColumn: 'span 7', padding: 0, overflow: 'hidden' }}
          >
            <div
              className="flex items-baseline justify-between"
              style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <span className="eyebrow-up">── AGRADECIMIENTOS</span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: '#979797',
                }}
              >
                03 personas
              </span>
            </div>

            {[
              {
                role: 'dirección',
                name: 'Andrés Felipe Jerez Ariza',
                affiliation: 'UNAB · Ingeniería de Sistemas',
                pill: null as string | null,
              },
              {
                role: 'asesoría · co-directora',
                name: 'Karen Yaneth Sánchez Quiroga',
                affiliation: projectMeta.advisorAffiliation,
                pill: 'KAUST',
              },
              {
                role: 'jurado',
                name: 'Comité evaluador · Proyecto de Grado I',
                affiliation: 'Por la rigurosidad y disponibilidad',
                pill: null as string | null,
              },
            ].map((p, i, arr) => (
              <div
                key={p.role}
                className="magnet-frame"
                style={{
                  padding: '24px 28px',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <p className="eyebrow-up">{p.role}</p>
                <p
                  className="mt-2 flex items-baseline gap-3 flex-wrap"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 22,
                    lineHeight: 1.25,
                    fontWeight: 500,
                    color: '#000000',
                    letterSpacing: '-0.015em',
                  }}
                >
                  <span>{p.name}</span>
                  {p.pill && (
                    <span className="pill-accent" style={{ padding: '4px 10px', fontSize: 11 }}>
                      {p.pill}
                    </span>
                  )}
                </p>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily:
                      p.role === 'jurado'
                        ? "'Instrument Serif', serif"
                        : "'Inter', system-ui, sans-serif",
                    fontStyle: p.role === 'jurado' ? 'italic' : 'normal',
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: '#444444',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.affiliation}
                </p>
                {i === arr.length - 1 && null}
              </div>
            ))}

            {/* Contacto card-solid interna */}
            <div
              className="card-solid"
              style={{
                margin: 20,
                padding: 24,
                borderRadius: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                ── CONTACTO
              </span>
              <div className="mt-3 grid gap-2">
                {[
                  ['mail.a', 'nmoreno@unab.edu.co'],
                  ['mail.b', 'psaavedra@unab.edu.co'],
                  ['repo  ', REPO_URL],
                  ['tel   ', '+57 ·· UNAB Bucaramanga'],
                ].map(([k, v]) => (
                  <p
                    key={k}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 13,
                      color: '#ffffff',
                      lineHeight: 1.5,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <span style={{ opacity: 0.5 }}>{k} · </span>
                    {v}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT 5 · QR + repositorio */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
            viewport={{ once: true }}
            style={{ gridColumn: 'span 5' }}
          >
            <div
              className="card magnet-frame"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              >
                <span className="eyebrow-up">── REPOSITORIO + COLAB</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.04em',
                    color: '#000000',
                    padding: '4px 12px',
                    borderRadius: 9999,
                    background: '#d1ffca',
                  }}
                >
                  SCAN ↗
                </span>
              </div>

              {/* QR */}
              <div style={{ padding: 28 }}>
                <div
                  className="mx-auto"
                  style={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    maxWidth: 320,
                    borderRadius: 20,
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'grid',
                    placeItems: 'center',
                    padding: 16,
                  }}
                >
                  <img
                    src={QR_SRC}
                    alt={`QR code · ${REPO_URL}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              </div>

              {/* URL */}
              <div
                style={{
                  padding: '20px 28px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    lineHeight: 1.4,
                    fontWeight: 500,
                    color: '#000000',
                    wordBreak: 'break-all',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {REPO_URL}
                </p>
              </div>

              {/* License chips */}
              <div className="flex flex-wrap gap-2" style={{ padding: 20 }}>
                {[
                  ['code', 'MIT'],
                  ['data', 'CC-BY-NC 4.0'],
                  ['proto', 'STREAMLIT'],
                ].map(([k, v]) => (
                  <span
                    key={k}
                    className="pill"
                    style={{
                      padding: '6px 14px',
                      fontSize: 11,
                      fontFamily: "'IBM Plex Mono', monospace",
                      letterSpacing: '0.04em',
                    }}
                  >
                    <span style={{ color: '#979797' }}>{k}</span>
                    <span style={{ color: '#000000', fontWeight: 500 }}>{v}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* REFERENCES RAIL ────────────────────────────────── */}
        <div className="mt-20 card" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            className="flex items-center flex-wrap gap-3 justify-between"
            style={{ padding: '20px 28px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          >
            <span className="eyebrow-up">
              ── REFERENCIAS · {String(REFS.length).padStart(2, '0')}+
            </span>
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
            className="relative"
            style={{
              overflowX: 'auto',
              touchAction: 'pan-x pan-y',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,0,0,0.16) transparent',
              padding: '24px 28px',
            }}
          >
            <div className="flex items-stretch gap-4">
              {filteredRefs.map((r, i) => (
                <motion.article
                  key={r.n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.4, ease: EASE }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="card-fog flex flex-col magnet-frame"
                  style={{
                    flexShrink: 0,
                    padding: 20,
                    minWidth: 300,
                    maxWidth: 320,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 32,
                        lineHeight: 0.9,
                        color: '#000000',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      [{String(r.n).padStart(2, '0')}]
                    </span>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        letterSpacing: '0.04em',
                        color: '#000000',
                        padding: '3px 10px',
                        borderRadius: 9999,
                        background: '#ffffff',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {r.category}
                    </span>
                  </div>

                  <div
                    className="mt-3"
                    style={{ height: 1, background: 'rgba(0,0,0,0.08)' }}
                  />

                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: '#000000',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {r.author} · {r.year}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: '#000000',
                      letterSpacing: '-0.015em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {r.title}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: 12,
                      lineHeight: 1.4,
                      color: '#444444',
                    }}
                  >
                    {r.source}
                  </p>
                  <p
                    className="mt-auto pt-3"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                      lineHeight: 1.4,
                      color: '#979797',
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

          {/* drag hint */}
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{
              padding: '16px 28px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              arrastrar para navegar
            </span>
            <span style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: '#979797',
                letterSpacing: '0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {filteredRefs.length} / {REFS.length}
            </span>
          </div>
        </div>

        {/* FIN MARKER ───────────────────────────────────── */}
        <div className="mt-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="eyebrow-up">── UNIVERSIDAD</span>
            <p
              className="mt-3"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: '#000000',
                letterSpacing: '-0.01em',
              }}
            >
              {projectMeta.university}
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.04em',
                color: '#444444',
              }}
            >
              {projectMeta.course}
            </p>
          </div>

          <div className="text-right">
            <span className="eyebrow-up">── FIN DE LA SUSTENTACIÓN</span>
            <div
              className="mt-3"
              style={{
                height: 1,
                background: '#000000',
                width: 220,
                marginLeft: 'auto',
              }}
            />
            <p
              className="mt-3"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.04em',
                color: '#000000',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              01 completado · 03 pendientes · TRL 4 objetivo
            </p>
          </div>
        </div>

        {/* Footer kbd hints */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="kbd">N</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              notas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">T</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              timer
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kbd">R</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#444444',
                letterSpacing: '0.04em',
              }}
            >
              reset
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
