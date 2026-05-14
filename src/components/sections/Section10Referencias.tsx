// ─────────────────────────────────────────────────────────────────────────
// §10 · Referencias · bibliografía APA 7 con filtro por categoría.
// ─────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ENTER = [0.22, 1, 0.36, 1] as const;

type Categoria = 'all' | 'deep-learning' | 'ssl' | 'dataset' | 'clinico' | 'epidemiologia-colombia';

interface Ref {
  id: string;
  tipo: string;
  autores: string;
  anio: string;
  titulo: string;
  venue: string;
  doi: string;
  categoria: Categoria;
}

const REFS: Ref[] = [
  {
    id: 'asocolderma-2023',
    tipo: 'Informe',
    autores: 'Asociación Colombiana de Dermatología y Cirugía Dermatológica (Asocolderma)',
    anio: '2023',
    titulo: 'Panorama de la dermatología en Colombia: Distribución de especialistas y acceso regional',
    venue: 'Asocolderma, Bogotá D.C.',
    doi: 'https://asocolderma.org.co/',
    categoria: 'clinico',
  },
  {
    id: 'azizi-2021',
    tipo: 'Conferencia',
    autores: 'Azizi, S., Mustafa, B., Ryan, F., Beaver, Z., Freyberg, J., Deaton, J., Loh, A., Karthikesalingam, A., Kornblith, S., Chen, T., Natarajan, V., & Norouzi, M.',
    anio: '2021',
    titulo: 'Big self-supervised models advance medical image classification',
    venue: 'Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), 3478–3488',
    doi: '10.1109/ICCV48922.2021.00346',
    categoria: 'ssl',
  },
  {
    id: 'cac-2025',
    tipo: 'Informe',
    autores: 'Cuenta de Alto Costo (CAC)',
    anio: '2025',
    titulo: 'Situación del cáncer en la población adulta atendida en el SGSSS de Colombia 2024',
    venue: 'Fondo Colombiano de Enfermedades de Alto Costo, Bogotá D.C.',
    doi: 'https://cuentadealtocosto.org/cancer/',
    categoria: 'epidemiologia-colombia',
  },
  {
    id: 'caron-2021',
    tipo: 'Conferencia',
    autores: 'Caron, M., Touvron, H., Misra, I., Jégou, H., Mairal, J., Bojanowski, P., & Joulin, A.',
    anio: '2021',
    titulo: 'Emerging properties in self-supervised vision transformers',
    venue: 'Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), 9650–9660',
    doi: '10.1109/ICCV48922.2021.00951',
    categoria: 'ssl',
  },
  {
    id: 'chaturvedi-2020',
    tipo: 'Artículo',
    autores: 'Chaturvedi, S. S., Tembhurne, J. V., & Diwan, T.',
    anio: '2020',
    titulo: 'A multi-class skin cancer classification using deep convolutional neural networks',
    venue: 'Multimedia Tools and Applications, 79(39–40), 28477–28498',
    doi: '10.1007/s11042-020-09388-2',
    categoria: 'clinico',
  },
  {
    id: 'chen-2020',
    tipo: 'Conferencia',
    autores: 'Chen, T., Kornblith, S., Norouzi, M., & Hinton, G.',
    anio: '2020',
    titulo: 'A simple framework for contrastive learning of visual representations',
    venue: 'Proceedings of the 37th International Conference on Machine Learning (ICML), PMLR 119, 1597–1607',
    doi: '10.48550/arXiv.2002.05709',
    categoria: 'ssl',
  },
  {
    id: 'codella-2018',
    tipo: 'Conferencia',
    autores: 'Codella, N. C. F., Gutman, D., Celebi, M. E., Helba, B., Marchetti, M. A., Dusza, S. W., Kalloo, A., Liopyris, K., Mishra, N., Kittler, H., & Halpern, A.',
    anio: '2018',
    titulo: 'Skin lesion analysis toward melanoma detection: A challenge at the 2017 International Symposium on Biomedical Imaging (ISBI), hosted by the International Skin Imaging Collaboration (ISIC)',
    venue: '2018 IEEE 15th International Symposium on Biomedical Imaging (ISBI), 168–172',
    doi: '10.1109/ISBI.2018.8363547',
    categoria: 'dataset',
  },
  {
    id: 'dosovitskiy-2021',
    tipo: 'Conferencia',
    autores: 'Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N.',
    anio: '2021',
    titulo: 'An image is worth 16x16 words: Transformers for image recognition at scale',
    venue: 'International Conference on Learning Representations (ICLR)',
    doi: '10.48550/arXiv.2010.11929',
    categoria: 'deep-learning',
  },
  {
    id: 'esteva-2017',
    tipo: 'Artículo',
    autores: 'Esteva, A., Kuprel, B., Novoa, R. A., Ko, J., Swetter, S. M., Blau, H. M., & Thrun, S.',
    anio: '2017',
    titulo: 'Dermatologist-level classification of skin cancer with deep neural networks',
    venue: 'Nature, 542(7639), 115–118',
    doi: '10.1038/nature21056',
    categoria: 'deep-learning',
  },
  {
    id: 'he-2016',
    tipo: 'Conferencia',
    autores: 'He, K., Zhang, X., Ren, S., & Sun, J.',
    anio: '2016',
    titulo: 'Deep residual learning for image recognition',
    venue: 'Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 770–778',
    doi: '10.1109/CVPR.2016.90',
    categoria: 'deep-learning',
  },
  {
    id: 'krishnan-2022',
    tipo: 'Artículo',
    autores: 'Krishnan, R., Rajpurkar, P., & Topol, E. J.',
    anio: '2022',
    titulo: 'Self-supervised learning in medicine and healthcare',
    venue: 'Nature Biomedical Engineering, 6(12), 1346–1352',
    doi: '10.1038/s41551-022-00914-1',
    categoria: 'ssl',
  },
  {
    id: 'sanchez-2024',
    tipo: 'Conferencia',
    autores: 'Sánchez, K., Hinojosa, C., Mieles, O., Zhao, C., Ghanem, B., & Arguello, H.',
    anio: '2024',
    titulo: 'CO2Wounds-V2: Extended chronic wounds dataset from leprosy patients',
    venue: '2024 IEEE International Conference on Image Processing (ICIP), 2151–2157',
    doi: '10.1109/ICIP51287.2024.10647641',
    categoria: 'dataset',
  },
  {
    id: 'tschandl-2018',
    tipo: 'Artículo',
    autores: 'Tschandl, P., Rosendahl, C., & Kittler, H.',
    anio: '2018',
    titulo: 'The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions',
    venue: 'Scientific Data, 5, 180161',
    doi: '10.1038/sdata.2018.161',
    categoria: 'dataset',
  },
  {
    id: 'uribe-2018',
    tipo: 'Artículo',
    autores: 'Uribe, C. J., Osma, S. F., & Herrera, V. M.',
    anio: '2018',
    titulo: 'Carcinoma basocelular en el Área Metropolitana de Bucaramanga, Colombia: Incidencia y características clínico-patológicas',
    venue: 'Revista de la Asociación Colombiana de Dermatología y Cirugía Dermatológica, 26(1), 22–31',
    doi: 'https://revista.asocolderma.org.co/',
    categoria: 'clinico',
  },
];

const CATEGORIAS: { id: Categoria; label: string; accent: string }[] = [
  { id: 'all', label: 'Todas', accent: '#0a0b0c' },
  { id: 'deep-learning', label: 'Deep Learning', accent: '#0d4ea8' },
  { id: 'ssl', label: 'SSL', accent: '#8a3f85' },
  { id: 'dataset', label: 'Corpus', accent: '#a68a00' },
  { id: 'clinico', label: 'Clínico', accent: '#00543d' },
  { id: 'epidemiologia-colombia', label: 'Epidemiología', accent: '#b35135' },
];

function getAccent(cat: Categoria): string {
  return CATEGORIAS.find((c) => c.id === cat)?.accent ?? '#0a0b0c';
}

function isExternalLink(doi: string): boolean {
  return doi.startsWith('http');
}

function buildLink(doi: string): string {
  if (isExternalLink(doi)) return doi;
  return `https://doi.org/${doi}`;
}

export default function Section10Referencias() {
  const [filter, setFilter] = useState<Categoria>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return REFS;
    return REFS.filter((r) => r.categoria === filter);
  }, [filter]);

  return (
    <section
      id="section-referencias"
      aria-labelledby="ref-h"
      style={{
        background: '#f7f5ee',
        color: '#0a0b0c',
        paddingBlock: 'clamp(72px, 9vw, 128px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 95% 0%, rgba(13,78,168,0.06) 0%, transparent 50%), radial-gradient(ellipse at 5% 100%, rgba(138,63,133,0.06) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          marginInline: 'auto',
          paddingInline: 'clamp(20px, 4vw, 56px)',
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 14,
            marginBottom: 56,
            borderBottom: '2px solid #0a0b0c',
          }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: 13, letterSpacing: '0.32em', color: '#0a0b0c', fontWeight: 700 }}
          >
            §10 · referencias
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, letterSpacing: '0.28em', color: 'rgba(10,11,12,0.6)', fontWeight: 600 }}
          >
            APA 7 · {REFS.length} fuentes
          </span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: ENTER }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <h2
            id="ref-h"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              lineHeight: 1.0,
              letterSpacing: '-0.028em',
              fontWeight: 400,
              color: '#0a0b0c',
              margin: 0,
              maxWidth: '16ch',
            }}
          >
            Bibliografía consultada.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              lineHeight: 1.5,
              color: 'rgba(10,11,12,0.7)',
              margin: '20px 0 0 0',
              maxWidth: '54ch',
              letterSpacing: '-0.005em',
            }}
          >
            Fuentes citadas en el documento, agrupadas por dominio temático.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER }}
          role="tablist"
          aria-label="Filtros de bibliografía"
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {CATEGORIAS.map((c) => {
            const isActive = filter === c.id;
            const count =
              c.id === 'all' ? REFS.length : REFS.filter((r) => r.categoria === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(c.id)}
                style={{
                  appearance: 'none',
                  background: isActive ? c.accent : '#ffffff',
                  color: isActive ? '#ffffff' : '#0a0b0c',
                  border: `1px solid ${isActive ? c.accent : 'rgba(10,11,12,0.18)'}`,
                  borderRadius: 999,
                  padding: '9px 18px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 8,
                  transition: 'all 200ms ease-out',
                }}
              >
                <span>{c.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Lista de referencias */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 56 }}>
          {filtered.map((r, i) => {
            const accent = getAccent(r.categoria);
            const linkHref = buildLink(r.doi);
            const linkLabel = isExternalLink(r.doi) ? 'URL' : `DOI · ${r.doi}`;
            return (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-2%' }}
                transition={{ duration: 0.45, ease: ENTER, delay: 0.02 + i * 0.04 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(10,11,12,0.14)',
                  borderRadius: 12,
                  padding: 'clamp(20px, 2.2vw, 28px) clamp(22px, 2.4vw, 32px)',
                  borderLeft: `3px solid ${accent}`,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 0.16fr) minmax(0, 1.84fr)',
                  gap: 'clamp(14px, 2vw, 28px)',
                  alignItems: 'start',
                }}
              >
                {/* Year + tipo */}
                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 'clamp(28px, 3vw, 38px)',
                      fontWeight: 200,
                      color: accent,
                      letterSpacing: '-0.045em',
                      lineHeight: 0.85,
                    }}
                  >
                    {r.anio}
                  </div>
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: accent,
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    {r.tipo}
                  </div>
                </div>

                {/* Cuerpo */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(13.5px, 1.25vw, 15px)',
                      color: 'rgba(10,11,12,0.72)',
                      letterSpacing: '-0.003em',
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {r.autores} ({r.anio}).
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(15.5px, 1.5vw, 18px)',
                      fontWeight: 500,
                      color: '#0a0b0c',
                      margin: 0,
                      lineHeight: 1.32,
                      letterSpacing: '-0.012em',
                    }}
                  >
                    {r.titulo}
                  </h4>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(13.5px, 1.2vw, 14.5px)',
                      fontStyle: 'italic',
                      color: 'rgba(10,11,12,0.7)',
                      letterSpacing: '-0.003em',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.venue}
                  </div>
                  <a
                    href={linkHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono uppercase"
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      color: accent,
                      fontWeight: 700,
                      textDecoration: 'underline',
                      textUnderlineOffset: 4,
                    }}
                  >
                    {linkLabel}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* cierre */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: ENTER, delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-3"
          style={{
            paddingTop: 18,
            borderTop: '1px solid rgba(10,11,12,0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,11,12,0.55)',
            fontWeight: 500,
          }}
        >
          <span>{REFS.length} fuentes · APA 7</span>
          <span style={{ color: 'rgba(10,11,12,0.75)', fontWeight: 600 }}>fin del documento</span>
        </motion.div>
      </div>
    </section>
  );
}
