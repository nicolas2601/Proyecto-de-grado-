// ─────────────────────────────────────────────────────────────────────────
// Citas bibliográficas · catálogo centralizado · APA-like
// Cada cifra, gráfica o afirmación en la página enlaza a uno o varios IDs.
// El componente <Cite refs={['uribe-2018']} /> renderiza un badge inline con
// tooltip a la cita completa. Las refs viajan junto al dato, no aparte.
// ─────────────────────────────────────────────────────────────────────────

export type CitationGroup =
  | 'epi'
  | 'ssl'
  | 'dl'
  | 'clinico'
  | 'ia-salud'
  | 'normativa'
  | 'metodologia';

export type Citation = {
  id: string;
  group: CitationGroup;
  short: string;
  full: string;
  url?: string;
};

export const CITATIONS: Record<string, Citation> = {
  // ── Epidemiología ──────────────────────────────────────
  'el-frente-2024': {
    id: 'el-frente-2024',
    group: 'epi',
    short: 'El Frente (2024)',
    full: 'El Frente. (2024). Alerta para Santander: el 15 % de los diagnósticos de cáncer en el HIC son de piel.',
  },
  'uribe-2018': {
    id: 'uribe-2018',
    group: 'epi',
    short: 'Uribe et al. (2018)',
    full: 'Uribe, C. J., Anaya-Reyes, K. C., Céspedes, A. M., et al. (2018). Carcinoma basocelular de piel en el área metropolitana de Bucaramanga, Colombia: una mirada epidemiológica. Revista de la Asociación Colombiana de Dermatología y Cirugía Dermatológica, 26(1), 18-23.',
  },
  'cac-2025': {
    id: 'cac-2025',
    group: 'epi',
    short: 'Cuenta de Alto Costo (2025)',
    full: 'Cuenta de Alto Costo. (2025). Día mundial del melanoma cutáneo 2025.',
  },
  // ── SSL y antecedentes técnicos ────────────────────────
  'ham10000-2018': {
    id: 'ham10000-2018',
    group: 'ssl',
    short: 'Tschandl et al. (2018)',
    full: 'Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5(1), 180161.',
  },
  'krishnan-2022': {
    id: 'krishnan-2022',
    group: 'ssl',
    short: 'Krishnan et al. (2022)',
    full: 'Krishnan, R., Rajpurkar, P., & Topol, E. J. (2022). Self-supervised learning in medicine and healthcare. Nature Biomedical Engineering, 6(12), 1346-1352.',
  },
  'hammimou-2025': {
    id: 'hammimou-2025',
    group: 'ssl',
    short: 'Hammimou et al. (2025)',
    full: 'Hammimou, A., Ezzahori, H., Boudaoud, A., & Aqil, M. (2025). From traditional to deep learning methods for skin lesion segmentation: a literature review. Scientific African, 29, e02783.',
  },
  'ieee-10647641': {
    id: 'ieee-10647641',
    group: 'ssl',
    short: 'IEEE 10647641',
    full: 'IEEE. Aplicación de aprendizaje autosupervisado en imágenes médicas dermatológicas.',
    url: 'https://ieeexplore.ieee.org/abstract/document/10647641',
  },
  'panderm-2025': {
    id: 'panderm-2025',
    group: 'ssl',
    short: 'PanDerm · Nature Medicine (2025)',
    full: 'PanDerm. (2025). Foundation model for dermatology trained on 2 million images across 11 institutions. Nature Medicine.',
  },
  'dino-2024': {
    id: 'dino-2024',
    group: 'ssl',
    short: 'DINO · Suiza (2024)',
    full: 'Caron, M., Touvron, H., Misra, I., et al. (2024). DINO: Self-supervised vision transformers for unlabeled dermatology imaging. Suiza.',
  },
  'barlow-2024': {
    id: 'barlow-2024',
    group: 'ssl',
    short: 'Barlow Twins · Alemania (2024)',
    full: 'Barlow Twins. (2024). Self-supervised learning via redundancy reduction. Aplicación en dermatología con datos limitados, Alemania.',
  },
  // ── Deep learning · dermatología ───────────────────────
  'chaturvedi-2020': {
    id: 'chaturvedi-2020',
    group: 'dl',
    short: 'Chaturvedi et al. (2020)',
    full: 'Chaturvedi, S. S., Tembhurne, J. V., & Diwan, T. (2020). A multi-class skin cancer classification using deep convolutional neural networks. Multimedia Tools and Applications, 79(39), 28477-28498.',
  },
  'omiye-2025': {
    id: 'omiye-2025',
    group: 'dl',
    short: 'Omiye et al. (2025)',
    full: 'Omiye, J. A., Rao, B. K., Razi, S., et al. (2025). Automated detection of benign and malignant skin lesions from reflectance confocal microscopy images using deep learning. JID Innovations, 5(6), 100404.',
  },
  'sauter-2023': {
    id: 'sauter-2023',
    group: 'dl',
    short: 'Sauter et al. (2023)',
    full: 'Sauter, D., Lodde, G., Nensa, F., et al. (2023). Deep learning in computational dermatopathology of melanoma: a technical systematic literature review. Computers in Biology and Medicine, 163, 107083.',
  },
  'wang-2023': {
    id: 'wang-2023',
    group: 'dl',
    short: 'Wang et al. (2023)',
    full: 'Wang, G., Luo, X., Gu, R., et al. (2023). PyMIC: a deep learning toolkit for annotation-efficient medical image segmentation. Computer Methods and Programs in Biomedicine, 231, 107398.',
  },
  // ── Diagnóstico clínico ────────────────────────────────
  'pathania-2022': {
    id: 'pathania-2022',
    group: 'clinico',
    short: 'Pathania et al. (2022)',
    full: 'Pathania, Y. S., Apalla, Z., Salerni, G., et al. (2022). Non-invasive diagnostic techniques in pigmentary skin disorders and skin cancer. Journal of Cosmetic Dermatology, 21(2), 444-450.',
  },
  // ── IA en sistemas de salud ────────────────────────────
  'yang-2024': {
    id: 'yang-2024',
    group: 'ia-salud',
    short: 'Yang et al. (2024)',
    full: 'Yang, J., Dung, N. T., Thach, P. N., et al. & Clifton, D. A. (2024). Generalizability assessment of AI models across hospitals in a low-middle and high income country. Nature Communications, 15(1), 8270.',
  },
  // ── Normativa ──────────────────────────────────────────
  'minciencias-2021': {
    id: 'minciencias-2021',
    group: 'normativa',
    short: 'MinCiencias (2021)',
    full: 'Ministerio de Ciencia, Tecnología e Innovación. (2021). Marco ético para la Inteligencia Artificial en Colombia.',
  },
  'ley-1581-2012': {
    id: 'ley-1581-2012',
    group: 'normativa',
    short: 'Ley 1581 (2012)',
    full: 'Congreso de la República de Colombia. (2012). Ley 1581: protección de datos personales.',
  },
  'ley-1419-2010': {
    id: 'ley-1419-2010',
    group: 'normativa',
    short: 'Ley 1419 (2010)',
    full: 'Congreso de la República de Colombia. (2010). Ley 1419: lineamientos para el desarrollo de la telesalud.',
  },
  'gdpr-2016': {
    id: 'gdpr-2016',
    group: 'normativa',
    short: 'GDPR · UE (2016)',
    full: 'Parlamento Europeo. (2016). Reglamento General de Protección de Datos (GDPR).',
  },
  'helsinki': {
    id: 'helsinki',
    group: 'normativa',
    short: 'Declaración de Helsinki',
    full: 'Asociación Médica Mundial. Declaración de Helsinki: principios éticos para la investigación médica en seres humanos.',
  },
  // ── Metodología ────────────────────────────────────────
  'wirth-hipp-2000': {
    id: 'wirth-hipp-2000',
    group: 'metodologia',
    short: 'Wirth & Hipp (2000)',
    full: 'Wirth, R., & Hipp, J. (2000). CRISP-DM: towards a standard process model for data mining.',
  },
};

export function getCitation(id: string): Citation | undefined {
  return CITATIONS[id];
}

export function getCitations(ids: string[]): Citation[] {
  return ids.map((id) => CITATIONS[id]).filter(Boolean) as Citation[];
}

export const CITATION_GROUP_LABEL: Record<CitationGroup, string> = {
  epi: 'Epidemiología',
  ssl: 'Antecedentes técnicos · SSL',
  dl: 'Deep learning · dermatología',
  clinico: 'Diagnóstico clínico',
  'ia-salud': 'IA en sistemas de salud',
  normativa: 'Normativa',
  metodologia: 'Metodología',
};
