// Datos extraídos del notebook objetivo1_eda_COLAB.ipynb (29 celdas)
// Todas las cifras provienen del documento integrador Santander 2018-2025
// y del análisis directo de HAM10000 + BCN20000 + CO2Wounds-V2

export const projectMeta = {
  title:
    'Algoritmo de aprendizaje autosupervisado para la detección de lesiones cutáneas en imágenes dermatológicas aplicado al contexto clínico de Santander',
  shortTitle: 'Aprendizaje autosupervisado para lesiones cutáneas · Santander',
  authors: ['Nicolás Santiago Moreno Monroy', 'María Paula Saavedra Martínez'],
  director: 'Andrés Felipe Jerez Ariza',
  advisor: 'Karen Yaneth Sánchez Quiroga',
  advisorAffiliation: 'King Abdullah University of Science and Technology (KAUST)',
  university: 'Universidad Autónoma de Bucaramanga · Ingeniería de Sistemas',
  course: 'Proyecto de Grado I · 2026',
};

// ---------------------------------------------------------------------------
// Slide 1 · Epidemiología Santander
// ---------------------------------------------------------------------------
export const epidemioKPIs = [
  {
    id: 'cbc',
    label: 'Carcinoma basocelular',
    value: '124,2',
    unit: '/100k personas-año',
    region: 'Bucaramanga AMB',
    source: 'Uribe et al. 2018',
    detail: '86,8 % localizados en cara y cuello · n=1.669',
    severity: 'high' as const,
  },
  {
    id: 'piel-hic',
    label: 'Cáncer de piel HIC',
    value: '15 %',
    unit: 'del total oncológico',
    region: 'HIC / FCV 2016–2023',
    source: 'FCV 2024',
    detail: '3.060 / 19.764 diagnósticos · pico en 2021',
    severity: 'high' as const,
  },
  {
    id: 'melanoma',
    label: 'Melanoma',
    value: '54 %',
    unit: 'invasivo',
    region: 'Colombia 2019',
    source: 'INC',
    detail: '5.255 casos nuevos · 80 % de la mortalidad por cáncer de piel',
    severity: 'high' as const,
  },
  {
    id: 'leishmaniasis',
    label: 'Leishmaniasis Landázuri',
    value: '+338 %',
    unit: 'vs 2024',
    region: 'Santander rural 2025',
    source: 'SIVIGILA / INS',
    detail: '114 casos en 21 semanas · 63,9 % hombres · mediana 20 años',
    severity: 'medium' as const,
  },
  {
    id: 'maskne',
    label: 'Maskné / bioseguridad',
    value: '67,5 %',
    unit: 'estudiantes UDES',
    region: 'Norte de Santander',
    source: 'UDES 2020–2021',
    detail: '45 % desarrolló acné mecánico post-COVID',
    severity: 'low' as const,
  },
  {
    id: 'atopica',
    label: 'Dermatitis atópica',
    value: 'GPC 2024',
    unit: 'única en Latinoamérica',
    region: 'Nacional',
    source: 'Asocolderma',
    detail: '29,3 % de dermatólogos diagnostica por presentación clínica únicamente',
    severity: 'low' as const,
  },
];

// Tabla 9.6 · Ranking de prioridad para el modelo SSL
export const ssLRanking = [
  { rank: 1, lesion: 'Carcinoma basocelular',  justification: '124,2/100k + 86,8 % cara y cuello · lesión más frecuente', priority: 'CRÍTICA' as const, category: 'Maligna' },
  { rank: 2, lesion: 'Carcinoma escamocelular', justification: 'Parte del 15 % de cáncer de piel HIC',                    priority: 'CRÍTICA' as const, category: 'Maligna' },
  { rank: 3, lesion: 'Melanoma',                justification: '54 % invasivo · alta letalidad si tardío',                priority: 'CRÍTICA' as const, category: 'Maligna' },
  { rank: 4, lesion: 'Leishmaniasis ulcerosa',  justification: 'Brote 2025 +338 % · relevancia regional crítica',          priority: 'ALTA' as const,    category: 'Parasitaria' },
  { rank: 5, lesion: 'Acné inflamatorio',       justification: 'Alta consulta jóvenes · asociación SOP en mujeres',        priority: 'MEDIA' as const,   category: 'Inflamatoria' },
  { rank: 6, lesion: 'Dermatitis atópica',      justification: 'Prevalencia general alta · GPC nacional 2024',             priority: 'MEDIA' as const,   category: 'Inflamatoria' },
  { rank: 7, lesion: 'Lesiones por presión',    justification: 'Carga hospitalaria significativa',                         priority: 'MEDIA' as const,   category: 'Hospitalaria' },
  { rank: 8, lesion: 'Hidradenitis supurativa', justification: 'Crónica, menor frecuencia, alto impacto QoL',              priority: 'BAJA' as const,    category: 'Inflamatoria' },
  { rank: 9, lesion: 'Maskné / perioral',       justification: 'Post-COVID, decreciente',                                  priority: 'BAJA' as const,    category: 'Inflamatoria' },
];

// Árbol del problema completo · 5 niveles
export const problemTree = {
  problemaCentral:
    'Limitaciones en la detección oportuna de lesiones cutáneas en centros clínicos del departamento de Santander',
  consecuenciasIndirectas: [
    'Diagnóstico tardío de cáncer de piel',
    'Incremento en la mortalidad asociada a lesiones malignas como el melanoma',
    'Mayores costos en tratamientos médicos debido a detección tardía',
    'Sobrecarga en los servicios especializados de dermatología',
  ],
  consecuenciasDirectas: [
    'Dificultad para identificar tempranamente lesiones cutáneas malignas',
    'Diagnósticos clínicos con variabilidad según la experiencia del especialista',
    'Retrasos en la confirmación diagnóstica mediante biopsia',
    'Limitaciones en la capacidad de apoyo diagnóstico en centros clínicos',
  ],
  causasDirectas: [
    'Dependencia de métodos clínicos tradicionales cuya precisión depende de la experiencia del especialista',
    'Uso limitado de herramientas computacionales de apoyo al diagnóstico dermatológico',
    'Procesos de confirmación diagnóstica basados en biopsias invasivas, costosas y con tiempos prolongados',
    'Escasa implementación de modelos de inteligencia artificial en entornos clínicos regionales',
  ],
  causasIndirectas: [
    'Escasez de conjuntos de datos dermatológicos etiquetados por especialistas',
    'Alto costo y complejidad del proceso de anotación médica de imágenes dermatológicas',
    'Limitaciones tecnológicas y de infraestructura para el desarrollo de sistemas de diagnóstico asistido',
    'Brecha en la adopción de herramientas de inteligencia artificial en el sector salud regional',
  ],
};

// ---------------------------------------------------------------------------
// Slide 2 · Pregunta + Hipótesis
// ---------------------------------------------------------------------------
export const researchCore = {
  question:
    '¿Cómo diseñar un algoritmo de IA basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas que apoye el diagnóstico clínico en centros médicos de Santander?',
  hypothesis:
    'Un algoritmo basado en aprendizaje autosupervisado, entrenado con un corpus combinado HAM10000 + BCN20000, puede alcanzar un desempeño comparable al de un baseline supervisado equivalente para las clases de mayor incidencia epidemiológica en Santander ·carcinoma basocelular, escamocelular y melanoma· mitigando la escasez de datos etiquetados característica del contexto regional.',
};

// ---------------------------------------------------------------------------
// Slide 3 · Objetivos
// ---------------------------------------------------------------------------
export const objetivoGeneral =
  'Desarrollar un algoritmo de IA basado en aprendizaje autosupervisado (SSL) para la detección de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en Santander.';

export const objetivosEspecificos = [
  {
    n: 1,
    title: 'Identificar conjuntos de datos',
    body: 'Identificar conjuntos de datos de imágenes dermatológicas representativos para el contexto clínico de Santander.',
    status: 'done' as const,
  },
  {
    n: 2,
    title: 'Diseñar el algoritmo SSL',
    body: 'Diseñar un algoritmo de detección basado en aprendizaje autosupervisado.',
    status: 'in-progress' as const,
  },
  {
    n: 3,
    title: 'Evaluar el desempeño',
    body: 'Evaluar el desempeño mediante métricas reportadas en literatura científica.',
    status: 'pending' as const,
  },
  {
    n: 4,
    title: 'Prototipo de aplicación',
    body: 'Implementar un prototipo de aplicación que integre el algoritmo para apoyo en análisis de imágenes.',
    status: 'pending' as const,
  },
];

// ---------------------------------------------------------------------------
// Slide 4 · Marco de Referencia
// ---------------------------------------------------------------------------
export const sslConstellation = [
  { id: 'simclr',   name: 'SimCLR',   family: 'Contrastive',  detail: 'NT-Xent loss · augmentations · projection head' },
  { id: 'byol',     name: 'BYOL',     family: 'Self-distill', detail: 'Sin negativos · online vs target network' },
  { id: 'dino',     name: 'DINO',     family: 'Self-distill', detail: 'Teacher-student · ViT-friendly' },
  { id: 'mae',      name: 'MAE',      family: 'Generative',   detail: 'Masked patches · reconstrucción asimétrica' },
  { id: 'resnet',   name: 'ResNet-50', family: 'Backbone',    detail: 'CNN clásica · pre-entrenable en ImageNet' },
  { id: 'vit',      name: 'ViT-B/16',  family: 'Backbone',    detail: 'Vision Transformer · patches 16×16' },
  { id: 'gradcam',  name: 'Grad-CAM',  family: 'Explainability', detail: 'Mapas de calor por gradiente' },
];

export const normativeFramework = [
  { region: 'Internacional', items: ['GDPR (UE)', 'Declaración de Helsinki', 'AI Act (UE 2024)'] },
  { region: 'Colombia',      items: ['Ley 1581/2012 · datos personales', 'Ley 1419/2010 · telesalud', 'Resolución 2654/2019', 'Marco Ético IA 2021', 'CONPES 4144'] },
];

export const antecedents = [
  { author: 'Rueda Rivera',     year: 2024, contribution: 'SSL para HAM10000 con SimCLR · UIS' },
  { author: 'González & Rivera', year: 2022, contribution: 'CNN supervisada · comparativo HAM10000' },
  { author: 'Díaz, Camargo, Peña', year: 2024, contribution: 'Dermatoscopio comercial portátil · UIS' },
  { author: 'Sánchez Quiroga',  year: 2023, contribution: 'Transferencia de dominio en imágenes médicas · Doctorado UIS' },
];

// ---------------------------------------------------------------------------
// Slide 5 · Metodología CRISP-DM + Cronograma
// ---------------------------------------------------------------------------
export const crispPhases = [
  { n: 1, name: 'Comprensión del problema',  detail: 'Revisión epidemiológica + estado del arte' },
  { n: 2, name: 'Comprensión de datos',      detail: 'EDA cruzado · 3 datasets · 13 figuras' },
  { n: 3, name: 'Preparación de datos',      detail: 'Normalización · augmentations · partición' },
  { n: 4, name: 'Modelado',                  detail: 'SimCLR / BYOL / DINO / MAE · ResNet50 vs ViT-B/16' },
  { n: 5, name: 'Evaluación',                detail: 'Accuracy · F1 macro · AUC · matriz de confusión' },
  { n: 6, name: 'Despliegue',                detail: 'Prototipo TRL 4 · webapp para carga de imagen' },
];

// Cronograma 2 semestres · 16 semanas c/u · Proyecto de Grado I (2026-I) + II (2026-II)
export const ganttPhases = [
  { phase: 'Objetivo 1 · EDA cruzado',            start: 0,  span: 6,  status: 'done' as const,    semester: 'I' as const },
  { phase: 'Marco teórico + estado del arte',     start: 2,  span: 7,  status: 'done' as const,    semester: 'I' as const },
  { phase: 'Redacción anteproyecto + correcciones', start: 6, span: 8, status: 'active' as const,  semester: 'I' as const },
  { phase: 'Sustentación anteproyecto',           start: 14, span: 2,  status: 'active' as const,  semester: 'I' as const },
  { phase: 'Objetivo 2 · Diseño algoritmo SSL',   start: 16, span: 5,  status: 'pending' as const, semester: 'II' as const },
  { phase: 'Objetivo 3 · Entrenamiento + evaluación', start: 19, span: 7, status: 'pending' as const, semester: 'II' as const },
  { phase: 'Objetivo 4 · Prototipo aplicación',   start: 24, span: 5,  status: 'pending' as const, semester: 'II' as const },
  { phase: 'Documento final + sustentación',      start: 28, span: 4,  status: 'pending' as const, semester: 'II' as const },
];

export const ganttSemesters = [
  { id: 'I',  label: '2026-I · Proyecto de Grado I',  weeks: 16, color: '#0173b2' },
  { id: 'II', label: '2026-II · Proyecto de Grado II', weeks: 16, color: '#5d2a1a' },
];

// Total: 32 semanas (16 + 16)
export const TOTAL_WEEKS = 32;

// ---------------------------------------------------------------------------
// Slide 6 · Avances Objetivo 1 (EDA) · PLATO FUERTE
// ---------------------------------------------------------------------------
export const ham10000 = {
  name: 'HAM10000',
  source: 'Tschandl, Rosendahl, Kittler (2018) · Sci. Data',
  size: 10_015,
  shannonEntropy: 1.63,
  shannonMax: 2.81,
  shannonEfficiencyPct: 58,
  gini: 0.64,
  width: 600,
  height: 450,
  classes: [
    { code: 'nv',    label: 'Nevus melanocítico',     count: 6705, pct: 66.95 },
    { code: 'mel',   label: 'Melanoma',                count: 1113, pct: 11.11 },
    { code: 'bkl',   label: 'Queratosis benigna',      count: 1099, pct: 10.97 },
    { code: 'bcc',   label: 'Carcinoma basocelular',   count: 514,  pct: 5.13 },
    { code: 'akiec', label: 'Queratosis actínica',     count: 327,  pct: 3.27 },
    { code: 'vasc',  label: 'Lesiones vasculares',     count: 142,  pct: 1.42 },
    { code: 'df',    label: 'Dermatofibroma',          count: 115,  pct: 1.15 },
  ],
};

export const bcn20000 = {
  name: 'BCN20000',
  source: 'Hospital Clínic Barcelona (2025)',
  size: 18_946,
  shannonEntropy: 2.41,
  shannonMax: 3.32,
  gini: 0.42,
  widthMedian: 1024,
  heightMedian: 1024,
  binary: [
    { name: 'Benigno',       value: 8869, pct: 46.8 },
    { name: 'Maligno',       value: 8869, pct: 46.8 },
    { name: 'Indeterminado', value: 1208, pct: 5.7  },
  ],
  granular: [
    { label: 'Nevus',                  value: 6800 },
    { label: 'Carcinoma basocelular',  value: 2800 },
    { label: 'Melanoma',               value: 2700 },
    { label: 'Queratosis actínica',    value: 1600 },
    { label: 'Queratosis seborreica',  value: 1300 },
    { label: 'Carcinoma escamocelular',value: 900 },
    { label: 'Léntigo solar',          value: 700 },
    { label: 'Lesión vascular',        value: 500 },
    { label: 'Dermatofibroma',         value: 350 },
    { label: 'Indeterminada',          value: 1208 },
  ],
};

export const co2wounds = {
  name: 'CO2Wounds-V2',
  source: 'Sánchez K. et al. · ICIP 2024',
  size: 764,
  patients: 96,
  site: 'Contratación, Santander',
  capture: 'Cámara de celular',
  task: 'Segmentación binaria',
  format: 'COCO · máscara + bbox',
  mIoU: 70.13,
  f1: 79.44,
  license: 'CC BY-NC-ND',
  highlight: 'Autora principal = asesora del proyecto',
};

// Mapeo cruzado patologías × datasets (Figura 11)
type Coverage = 'covered' | 'partial' | 'absent';
export const coverageMatrix: {
  pathology: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA' | 'FUTURO';
  ham: Coverage;
  bcn: Coverage;
  co2: Coverage;
}[] = [
  { pathology: 'Carcinoma basocelular',     priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent' },
  { pathology: 'Carcinoma escamocelular',   priority: 'CRÍTICA', ham: 'partial', bcn: 'covered', co2: 'absent' },
  { pathology: 'Melanoma',                  priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent' },
  { pathology: 'Queratosis seborreica',     priority: 'CRÍTICA', ham: 'covered', bcn: 'covered', co2: 'absent' },
  { pathology: 'Leishmaniasis cutánea',     priority: 'ALTA',    ham: 'absent',  bcn: 'absent',  co2: 'absent' },
  { pathology: 'Acné inflamatorio',         priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'absent' },
  { pathology: 'Dermatitis atópica',        priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'absent' },
  { pathology: 'Lesiones por presión / LRC',priority: 'MEDIA',   ham: 'absent',  bcn: 'absent',  co2: 'partial' },
  { pathology: 'Heridas crónicas / lepra',  priority: 'FUTURO',  ham: 'absent',  bcn: 'absent',  co2: 'covered' },
  { pathology: 'Hidradenitis supurativa',   priority: 'BAJA',    ham: 'absent',  bcn: 'absent',  co2: 'absent' },
];

// Comparación dimensional HAM vs BCN (Figura 12)
export const dimensionalCompare = [
  { metric: 'Ancho (px)',          ham: 600,  bcn: 1024 },
  { metric: 'Alto (px)',           ham: 450,  bcn: 1024 },
  { metric: 'Megapíxeles',         ham: 0.27, bcn: 1.05 },
  { metric: 'Tamaño archivo (KB)', ham: 48,   bcn: 320  },
];

// Sesgos identificados (matriz 7×3)
export const biasMatrix = [
  { bias: 'Adquisición',  desc: 'Dermatoscopia estandarizada vs celular en campo', severity: 'high' as const },
  { bias: 'Fenotípico',   desc: 'Fototipos I-III europeos predominan en HAM/BCN',   severity: 'high' as const },
  { bias: 'Cobertura',    desc: '6 patologías santandereanas ausentes',             severity: 'high' as const },
  { bias: 'Desbalance',   desc: 'Nevus = 67 % de HAM10000 · Gini 0,64',             severity: 'medium' as const },
  { bias: 'Resolución',   desc: '600×450 uniforme vs heterogénea mediana 1024',     severity: 'medium' as const },
  { bias: 'Temporal',     desc: 'Imágenes antiguas (HAM 2018) vs realidad 2025',    severity: 'low' as const },
  { bias: 'Geográfico',   desc: 'Datasets europeos/brasileños vs Santander',         severity: 'medium' as const },
];

// ---------------------------------------------------------------------------
// Slide 7 · Resultados esperados + Riesgos
// ---------------------------------------------------------------------------
export const trlLevels = [
  { level: 1, label: 'Principios básicos observados', active: false },
  { level: 2, label: 'Concepto tecnológico formulado', active: false },
  { level: 3, label: 'Prueba experimental de concepto', active: true },
  { level: 4, label: 'Validación en entorno controlado', active: true, target: true },
  { level: 5, label: 'Validación en entorno relevante', active: false, stretch: true },
  { level: 6, label: 'Demostración en entorno relevante', active: false },
];

export const expectedDeliverables = [
  'Caracterización formal de los conjuntos de datos seleccionados',
  'Algoritmo de detección entrenado bajo paradigma autosupervisado',
  'Evaluación de desempeño con métricas de literatura + baseline supervisado',
  'Prototipo funcional para carga de imagen + predicción + métricas',
];

export const risks = [
  { id: 'R1', name: 'Desempeño insuficiente del modelo SSL',  level: 'Alto'   as const, plan: 'Arquitecturas SSL alternativas + aumentación · Retorno Fase 3 → 2', phase: 3 },
  { id: 'R2', name: 'Desbalance severo de clases',             level: 'Alto'   as const, plan: 'SMOTE / pesos por clase / focal loss · Retorno Fase 2',             phase: 2 },
  { id: 'R3', name: 'Limitaciones de cómputo (GPU/memoria)',   level: 'Medio'  as const, plan: 'Backbone más ligero (EfficientNet) · Retorno Fase 2',                phase: 2 },
  { id: 'R4', name: 'Sesgo fototipos IV-V en datasets',        level: 'Medio'  as const, plan: 'Documentar + desempeño desagregado + trabajo futuro',                phase: 0 },
  { id: 'R5', name: 'Cobertura vs perfil epidemiológico',      level: 'Medio'  as const, plan: 'Combinar datasets compatibles · Retorno Fase 1',                     phase: 1 },
  { id: 'R6', name: 'Pérdida de trazabilidad de experimentos', level: 'Medio'  as const, plan: 'MLflow / WandB · versionado Git · Control transversal',             phase: 0 },
  { id: 'R7', name: 'Discrepancia laboratorio vs prototipo',   level: 'Medio'  as const, plan: 'Pruebas funcionales · alinear preprocesamiento · Fase 4 → 3',        phase: 4 },
];

// ---------------------------------------------------------------------------
// Slide 8 · Referencias
// ---------------------------------------------------------------------------
export const references = [
  'Uribe CJ et al. (2018). Carcinoma basocelular de piel en el área metropolitana de Bucaramanga, Colombia. Rev Asoc Colomb Dermatol 26(1).',
  'Fundación Cardiovascular de Colombia (2024). Un 15 % de los diagnósticos de cáncer en el HIC son de piel.',
  'Revista Hospitalaria del Sector Salud · ACHC (2025). Tendencia de cáncer de piel en Colombia. N.° 64.',
  'Instituto Nacional de Cancerología (2024). Cáncer en cifras.',
  'Asocolderma (2024). Cáncer de piel en Colombia: cifras del INC.',
  'Revista Salud UIS (2025). La epidemia invisible: Leishmaniasis cutánea en Santander.',
  'INS (2025). Boletín Epidemiológico Semanal, semana 26 / 2025.',
  'Min Salud (2025). Lineamientos clínicos integrales para Leishmaniasis en Colombia.',
  'Asocolderma (2024). GPC Dermatitis atópica · Actualización 2024.',
  'Asocolderma (2024). Encuesta a dermatólogos sobre dermatitis atópica.',
  'Revista Biomédica (2024). Epidemiología y recursos en dermatitis atópica, 2015-2020.',
  'Asocolderma (2024). Prevalencia SOP en mujeres con acné adulto (UNAB / Foscal).',
  'Tschandl P., Rosendahl C., Kittler H. (2018). HAM10000 dataset. Scientific Data 5, 180161.',
  'Hospital Clínic Barcelona (2025). BCN20000: Dermoscopic Lesions in the Wild.',
  'Sánchez K., Hinojosa C., Mieles O., Zhao C., Ghanem B., Arguello H. (2024). CO2Wounds-V2. IEEE ICIP, pp. 69-75.',
  'Chen T., Kornblith S., Norouzi M., Hinton G. (2020). A Simple Framework for Contrastive Learning (SimCLR). ICML.',
  'Grill J.B. et al. (2020). BYOL: Bootstrap Your Own Latent. NeurIPS.',
  'Caron M. et al. (2021). DINO: Emerging Properties in Self-Supervised Vision Transformers. ICCV.',
  'He K. et al. (2022). Masked Autoencoders Are Scalable Vision Learners (MAE). CVPR.',
  'Wirth R., Hipp J. (2000). CRISP-DM: Towards a standard process model for data mining.',
];

// ---------------------------------------------------------------------------
// Configuración de slides
// ---------------------------------------------------------------------------
export const slideTimings = [
  { id: 0, name: 'Portada',            seconds: 20 },
  { id: 1, name: 'Contexto + Problema', seconds: 150 },
  { id: 2, name: 'Pregunta + Hipótesis', seconds: 60 },
  { id: 3, name: 'Justificación + Objetivos', seconds: 120 },
  { id: 4, name: 'Marco de Referencia', seconds: 90 },
  { id: 5, name: 'Metodología + Cronograma', seconds: 90 },
  { id: 6, name: 'Avances Objetivo 1 · EDA', seconds: 270 },
  { id: 7, name: 'Resultados + Riesgos', seconds: 90 },
  { id: 8, name: 'Cierre + Referencias', seconds: 10 },
];

export const TOTAL_SECONDS = slideTimings.reduce((a, s) => a + s.seconds, 0);
