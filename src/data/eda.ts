// ─────────────────────────────────────────────────────────────────────────
// Datos del Análisis Exploratorio Cruzado · Notebook objetivo1_eda_COLAB
// Epidemiología Santander × Datasets dermatológicos (HAM10000, BCN20000,
// CO2Wounds-V2). Cifras verificadas en el notebook original.
// ─────────────────────────────────────────────────────────────────────────

// Ranking de prioridad para el modelo SSL (tabla 9.6 del notebook)
export const SSL_RANKING = [
  { rank: 1, lesion: 'Carcinoma basocelular',  category: 'Maligna',       priority: 'CRÍTICA' as const, justification: '124,2/100k personas-año · 86,8 % cara y cuello (Uribe et al. 2018)', refs: ['uribe-2018'] },
  { rank: 2, lesion: 'Carcinoma escamocelular', category: 'Maligna',       priority: 'CRÍTICA' as const, justification: 'Parte del 15 % del cáncer de piel HIC (FCV 2024)',                       refs: ['el-frente-2024'] },
  { rank: 3, lesion: 'Melanoma',                category: 'Maligna',       priority: 'CRÍTICA' as const, justification: '54 % invasivo · 80 % de mortalidad por cáncer de piel (INC 2019)',     refs: ['cac-2025'] },
  { rank: 4, lesion: 'Leishmaniasis ulcerosa',  category: 'Parasitaria',   priority: 'ALTA' as const,    justification: 'Brote 2025 +338 % vs 2024 · Landázuri Santander (SIVIGILA/INS)',          refs: [] },
  { rank: 5, lesion: 'Acné inflamatorio',       category: 'Inflamatoria',  priority: 'MEDIA' as const,   justification: 'Alta consulta en jóvenes · asociación SOP (UNAB/Foscal)',                refs: [] },
  { rank: 6, lesion: 'Dermatitis atópica',      category: 'Inflamatoria',  priority: 'MEDIA' as const,   justification: 'GPC nacional 2024 · única en Latinoamérica (Asocolderma)',               refs: [] },
  { rank: 7, lesion: 'Lesiones por presión',    category: 'Hospitalaria',  priority: 'MEDIA' as const,   justification: 'Carga hospitalaria significativa en HIC',                                refs: ['el-frente-2024'] },
  { rank: 8, lesion: 'Hidradenitis supurativa', category: 'Inflamatoria',  priority: 'BAJA' as const,    justification: 'Crónica · menor frecuencia · alto impacto en calidad de vida',           refs: [] },
  { rank: 9, lesion: 'Maskné / perioral',       category: 'Inflamatoria',  priority: 'BAJA' as const,    justification: 'Post-COVID · decreciente · UDES Cúcuta 2020-2021',                       refs: [] },
] as const;

// HAM10000 · 10.015 imágenes · 7 clases · resolución uniforme 600×450
export const HAM10000 = {
  name: 'HAM10000',
  source: 'Tschandl, Rosendahl, Kittler · Sci. Data 2018',
  size: 10_015,
  width: 600,
  height: 450,
  shannonEntropy: 1.63,
  shannonMax: 2.81,
  shannonEfficiencyPct: 58,
  gini: 0.64,
  refs: ['ham10000-2018'] as readonly string[],
  classes: [
    { code: 'nv',    label: 'Nevus melanocítico',    count: 6705, pct: 66.95, type: 'Benigna' },
    { code: 'mel',   label: 'Melanoma',              count: 1113, pct: 11.11, type: 'Maligna' },
    { code: 'bkl',   label: 'Queratosis benigna',    count: 1099, pct: 10.97, type: 'Benigna' },
    { code: 'bcc',   label: 'Carcinoma basocelular', count: 514,  pct: 5.13,  type: 'Maligna' },
    { code: 'akiec', label: 'Queratosis actínica',   count: 327,  pct: 3.27,  type: 'Precancerosa' },
    { code: 'vasc',  label: 'Lesiones vasculares',   count: 142,  pct: 1.42,  type: 'Benigna' },
    { code: 'df',    label: 'Dermatofibroma',        count: 115,  pct: 1.15,  type: 'Benigna' },
  ],
} as const;

// BCN20000 · 18.946 imágenes · taxonomía multi-nivel
export const BCN20000 = {
  name: 'BCN20000',
  source: 'Hospital Clínic Barcelona 2025',
  size: 18_946,
  widthMedian: 1024,
  heightMedian: 1024,
  shannonEntropy: 2.41,
  shannonMax: 3.32,
  gini: 0.42,
  refs: [] as readonly string[],
  binary: [
    { name: 'Benigno',       value: 8869, pct: 46.8 },
    { name: 'Maligno',       value: 8869, pct: 46.8 },
    { name: 'Indeterminado', value: 1208, pct: 6.4  },
  ],
  granular: [
    { label: 'Nevus',                   value: 6800 },
    { label: 'Carcinoma basocelular',   value: 2800 },
    { label: 'Melanoma',                value: 2700 },
    { label: 'Queratosis actínica',     value: 1600 },
    { label: 'Queratosis seborreica',   value: 1300 },
    { label: 'Carcinoma escamocelular', value: 900  },
    { label: 'Léntigo solar',           value: 700  },
    { label: 'Lesión vascular',         value: 500  },
    { label: 'Dermatofibroma',          value: 350  },
    { label: 'Indeterminada',           value: 1208 },
  ],
} as const;

// CO2Wounds-V2 · dataset local Santander · heridas crónicas de lepra
export const CO2WOUNDS = {
  name: 'CO2Wounds-V2',
  source: 'Sánchez K. et al. · IEEE ICIP 2024',
  size: 764,
  patients: 96,
  site: 'Contratación, Santander',
  capture: 'Cámara de celular',
  task: 'Segmentación binaria de herida',
  format: 'COCO · máscara + bbox',
  metrics: { mIoU: 70.13, f1: 79.44 },
  license: 'CC BY-NC-ND',
  highlight: 'Autora principal Karen Sánchez Quiroga · asesora del proyecto (KAUST)',
  refs: [] as readonly string[],
} as const;

// Matriz cruzada de cobertura · patología × dataset
export type CoverageLevel = 'covered' | 'partial' | 'absent';
export const COVERAGE_MATRIX: {
  pathology: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA' | 'FUTURO';
  ham: CoverageLevel;
  bcn: CoverageLevel;
  co2: CoverageLevel;
}[] = [
  { pathology: 'Carcinoma basocelular',      priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent'  },
  { pathology: 'Carcinoma escamocelular',    priority: 'CRÍTICA', ham: 'partial', bcn: 'covered', co2: 'absent'  },
  { pathology: 'Melanoma',                   priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent'  },
  { pathology: 'Queratosis seborreica',      priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent'  },
  { pathology: 'Leishmaniasis cutánea',      priority: 'ALTA',    ham: 'absent',  bcn: 'absent',  co2: 'absent'  },
  { pathology: 'Acné inflamatorio',          priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'absent'  },
  { pathology: 'Dermatitis atópica',         priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'absent'  },
  { pathology: 'Lesiones por presión / LRC', priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'partial' },
  { pathology: 'Heridas crónicas / lepra',   priority: 'FUTURO',  ham: 'absent',  bcn: 'absent',  co2: 'covered' },
  { pathology: 'Hidradenitis supurativa',    priority: 'BAJA',    ham: 'absent',  bcn: 'absent',  co2: 'absent'  },
];

// Comparativa dimensional HAM vs BCN (Figura 12 del notebook)
export const DIMENSIONAL_COMPARE = [
  { metric: 'Ancho (px)',          ham: 600,  bcn: 1024 },
  { metric: 'Alto (px)',           ham: 450,  bcn: 1024 },
  { metric: 'Megapíxeles',         ham: 0.27, bcn: 1.05 },
  { metric: 'Tamaño archivo (KB)', ham: 48,   bcn: 320  },
] as const;

// Sesgos identificados en el análisis cruzado
export const BIAS_MATRIX = [
  { bias: 'Cobertura',    desc: '6 patologías santandereanas ausentes en datasets dermatoscópicos', severity: 'high' as const },
  { bias: 'Adquisición',  desc: 'Dermatoscopia estandarizada vs cámara de celular en campo',         severity: 'high' as const },
  { bias: 'Fenotípico',   desc: 'Fototipos I-III europeos predominan en HAM/BCN',                   severity: 'high' as const },
  { bias: 'Desbalance',   desc: 'Nevus = 67 % de HAM10000 · Gini 0,64',                              severity: 'medium' as const },
  { bias: 'Resolución',   desc: '600×450 uniforme (HAM) vs heterogénea mediana 1024 (BCN)',          severity: 'medium' as const },
  { bias: 'Geográfico',   desc: 'Datasets europeos vs perfil epidemiológico Santander',              severity: 'medium' as const },
  { bias: 'Temporal',     desc: 'Imágenes 2018 (HAM) vs realidad clínica 2025',                      severity: 'low' as const },
] as const;
