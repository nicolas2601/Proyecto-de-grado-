// ─────────────────────────────────────────────────────────────────────────
// CONTENIDO · sustentación · proyecto de grado I · UNAB 2026
// Toda cifra trae `refs` apuntando a IDs de citations.ts.
// El tono es académico-neutral: describe, no califica.
// ─────────────────────────────────────────────────────────────────────────

export const PROJECT = {
  title:
    'Algoritmo de aprendizaje autosupervisado para la detección de lesiones cutáneas en imágenes dermatológicas aplicado al contexto clínico de Santander',
  shortTitle: 'Aprendizaje autosupervisado · lesiones cutáneas · Santander',
  authors: [
    'Nicolás Santiago Moreno Monroy',
    'María Paula Saavedra Martínez',
  ] as const,
  director: 'Andrés Felipe Jerez Ariza',
  advisor: 'Karen Yaneth Sánchez Quiroga',
  advisorAffiliation:
    'King Abdullah University of Science and Technology · KAUST',
  university: 'Universidad Autónoma de Bucaramanga',
  program: 'Ingeniería de Sistemas',
  course: 'Proyecto de Grado I · 2026',
  duration: '15 minutos',
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §01 · INTRODUCCIÓN
// ─────────────────────────────────────────────────────────────────────────

export const INTRODUCCION = {
  texto:
    'Las lesiones cutáneas son alteraciones visibles de la piel que pueden originarse por factores genéticos, ambientales o como manifestación de enfermedades sistémicas. Su clasificación entre benignas y malignas determina el curso del tratamiento y el pronóstico del paciente.',
  propuesta:
    'El proyecto desarrolla un prototipo de apoyo diagnóstico basado en aprendizaje autosupervisado para fortalecer la identificación de lesiones cutáneas en contextos clínicos con datos etiquetados limitados, como el departamento de Santander.',
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §02 · PLANTEAMIENTO DEL PROBLEMA
// ─────────────────────────────────────────────────────────────────────────

export const PROBLEMA = {
  global: {
    titulo: 'Contexto nacional',
    texto:
      'En Colombia se reportaron 11.064 casos de cáncer de piel en 2024.',
    cifras: [
      { valor: '11.064', etiqueta: 'casos · Colombia 2024', refs: ['cac-2025'] },
    ],
  },
  regional: {
    titulo: 'Situación en Santander',
    texto:
      'Entre 2016 y 2023 se registraron 3.060 casos en el Instituto de Cáncer del HIC. El carcinoma basocelular concentra el 64,82 % de los casos; el melanoma corresponde al 80 % de las muertes registradas.',
    cifras: [
      { valor: '3.060', etiqueta: 'casos HIC · 2016–2023', refs: ['el-frente-2024'] },
      { valor: '64,82 %', etiqueta: 'predominio BCC', refs: ['uribe-2018'] },
      { valor: '80 %', etiqueta: 'muertes · melanoma', refs: ['cac-2025'] },
    ],
  },
  deficiencia: {
    titulo: 'Limitación del diagnóstico clínico',
    texto:
      'La exactitud diagnóstica reportada varía entre 62 % y 80 % en función de la experiencia del especialista; la biopsia continúa siendo el estándar pero implica costo e invasividad.',
    refs: ['pathania-2022'],
  },
  tecnico: {
    titulo: 'Limitación técnica',
    texto:
      'Los modelos de IA supervisada requieren grandes volúmenes de imágenes etiquetadas por expertos, recurso escaso en el contexto regional.',
    refs: ['hammimou-2025', 'krishnan-2022'],
  },
  impacto: {
    titulo: 'Consecuencias documentadas',
    texto:
      'La literatura describe diagnósticos tardíos, mortalidad asociada al melanoma y saturación del sistema dermatológico regional.',
    refs: ['cac-2025', 'uribe-2018'],
  },
};

export const EVIDENCIA_PROBLEMA = [
  {
    id: 'experto',
    titulo: 'Dependencia del especialista',
    valor: '62 % – 80 %',
    detalle:
      'Rango de exactitud diagnóstica reportado en la literatura, en función de los años de experiencia clínica.',
    refs: ['pathania-2022'],
  },
  {
    id: 'biopsia',
    titulo: 'Barrera económica del estándar',
    valor: 'biopsia · invasiva',
    detalle:
      'La biopsia tiene costo elevado y tiempos de procesamiento prolongados; no es apta para tamizaje masivo en regiones con recursos limitados.',
    refs: ['pathania-2022'],
  },
  {
    id: 'datos',
    titulo: 'Limitación de datos etiquetados',
    valor: 'recurso escaso',
    detalle:
      'Los modelos supervisados dependen de miles de imágenes anotadas por especialistas, recurso escaso y costoso en el departamento.',
    refs: ['krishnan-2022', 'hammimou-2025'],
  },
] as const;

// Constelación causal · 4 capas + nodo central, con citaciones por nodo.
// Consumido por <ProblemGraph tree={ARBOL_TREE} />
export const ARBOL_TREE = {
  problemaCentral:
    'Limitaciones en la detección oportuna de lesiones cutáneas en centros clínicos de Santander',
  causasIndirectas: [
    {
      label: 'Escasez de datasets dermatológicos etiquetados por especialistas',
      refs: ['krishnan-2022'],
    },
    {
      label: 'Alto costo y complejidad de la anotación médica de imágenes',
      refs: ['krishnan-2022', 'hammimou-2025'],
    },
    {
      label: 'Limitaciones de infraestructura para diagnóstico asistido en la región',
      refs: ['el-frente-2024'],
    },
    {
      label: 'Brecha en la adopción de IA en el sector salud regional',
      refs: ['yang-2024'],
    },
  ],
  causasDirectas: [
    {
      label:
        'Dependencia de métodos clínicos cuya precisión depende de la experiencia del especialista',
      refs: ['pathania-2022'],
    },
    {
      label: 'Uso limitado de herramientas computacionales de apoyo al diagnóstico',
      refs: ['yang-2024'],
    },
    {
      label: 'Confirmación basada en biopsias invasivas, costosas y de tiempos prolongados',
      refs: ['pathania-2022'],
    },
    {
      label: 'Escasa implementación de modelos de IA en entornos clínicos regionales',
      refs: ['panderm-2025', 'yang-2024'],
    },
  ],
  consecuenciasDirectas: [
    {
      label: 'Dificultad para identificar tempranamente lesiones malignas',
      refs: ['cac-2025'],
    },
    {
      label: 'Variabilidad diagnóstica según la experiencia del especialista',
      refs: ['pathania-2022'],
    },
    {
      label: 'Retrasos en la confirmación diagnóstica mediante biopsia',
      refs: ['pathania-2022'],
    },
    {
      label: 'Limitaciones en la capacidad de apoyo diagnóstico en centros clínicos',
      refs: ['el-frente-2024'],
    },
  ],
  consecuenciasIndirectas: [
    {
      label: 'Diagnóstico tardío de cáncer de piel',
      refs: ['cac-2025'],
    },
    {
      label: 'Mayor mortalidad asociada a melanoma',
      refs: ['cac-2025'],
    },
    {
      label: 'Mayores costos en tratamientos por detección tardía',
      refs: ['cac-2025'],
    },
    {
      label: 'Sobrecarga en servicios especializados de dermatología',
      refs: ['el-frente-2024'],
    },
  ],
} as const;

export const ARBOL_PROBLEMA = {
  problemaCentral:
    'Limitaciones en la detección oportuna de lesiones cutáneas en centros clínicos de Santander.',
  causas: [
    {
      codigo: 'C1',
      titulo: 'Dependencia del especialista',
      detalle: 'Exactitud diagnóstica reportada entre 62 % y 80 % según la experiencia.',
      refs: ['pathania-2022'],
    },
    {
      codigo: 'C2',
      titulo: 'Diagnóstico invasivo',
      detalle: 'La biopsia es costosa y no apta para tamizaje masivo.',
      refs: ['pathania-2022'],
    },
    {
      codigo: 'C3',
      titulo: 'Escasez de datos etiquetados',
      detalle: 'Los modelos supervisados requieren miles de imágenes anotadas.',
      refs: ['krishnan-2022'],
    },
    {
      codigo: 'C4',
      titulo: 'Modelos extranjeros poco transferibles',
      detalle: 'Sistemas internacionales desarrollados en poblaciones caucásicas y con requerimientos computacionales elevados.',
      refs: ['yang-2024', 'panderm-2025'],
    },
  ],
  consecuencias: [
    {
      codigo: 'E1',
      titulo: 'Diagnóstico tardío',
      detalle: 'Detección en etapas avanzadas, asociada a peor pronóstico.',
      refs: ['cac-2025'],
    },
    {
      codigo: 'E2',
      titulo: 'Mortalidad asociada al melanoma',
      detalle: '80 % de las muertes pese a su menor incidencia frente al BCC.',
      refs: ['cac-2025'],
    },
    {
      codigo: 'E3',
      titulo: 'Saturación del sistema',
      detalle: 'Tiempos de espera prolongados en servicios de dermatología regionales.',
      refs: ['el-frente-2024'],
    },
    {
      codigo: 'E4',
      titulo: 'Brecha tecnológica',
      detalle: 'Ausencia documentada de adaptaciones regionales de IA dermatológica.',
      refs: ['yang-2024'],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §03 · PREGUNTA DE INVESTIGACIÓN (sin hipótesis · ver §04)
// ─────────────────────────────────────────────────────────────────────────

export const PREGUNTA = {
  central:
    '¿Cómo diseñar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado (SSL) para la detección de lesiones cutáneas que apoye el diagnóstico clínico en Santander?',
  alcance:
    'La pregunta delimita el desarrollo de una herramienta de apoyo al diagnóstico, no un sustituto del juicio clínico. Aprovecha datos no etiquetados como vía para reducir la dependencia de anotaciones especializadas.',
  enfoque: 'Cualitativo · conceptual',
  coherencia: [
    {
      problema: 'Datos etiquetados escasos en Santander',
      respuesta: 'SSL · entrena sin etiquetas exhaustivas',
    },
    {
      problema: 'Diagnóstico clínico dependiente de experiencia',
      respuesta: 'Algoritmo como apoyo objetivo y reproducible',
    },
    {
      problema: 'Modelos extranjeros poco transferibles',
      respuesta: 'Adaptación al perfil epidemiológico regional',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §04 · HIPÓTESIS Y SUPUESTOS (sección NUEVA · separada de Pregunta)
// ─────────────────────────────────────────────────────────────────────────

export const HIPOTESIS = {
  enunciado:
    'El uso de aprendizaje autosupervisado en imágenes dermatológicas permite obtener representaciones visuales útiles para la clasificación de lesiones cutáneas sin requerir un volumen extenso de datos etiquetados.',
  enfoque: 'Cualitativo · conceptual',
  supuestos: [
    {
      id: 'S1',
      texto:
        'Las técnicas de SSL extraen representaciones visuales robustas de imágenes dermatológicas sin etiquetas exhaustivas.',
      validacion: 'Comparación contra línea base supervisada en métricas AUC-ROC y F1-Score.',
      refs: ['krishnan-2022', 'ieee-10647641'],
    },
    {
      id: 'S2',
      texto:
        'El paradigma autosupervisado supera limitaciones del aprendizaje supervisado en escenarios de datos escasos.',
      validacion: 'Evaluación con submuestras controladas del dataset etiquetado.',
      refs: ['barlow-2024', 'krishnan-2022'],
    },
    {
      id: 'S3',
      texto:
        'Los datasets públicos HAM10000 e ISIC cubren las clases priorizadas por la epidemiología regional.',
      validacion: 'Cruce de clases del dataset contra registro HIC 2016–2023.',
      refs: ['ham10000-2018', 'uribe-2018'],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §05 · JUSTIFICACIÓN Y ALCANCE
// ─────────────────────────────────────────────────────────────────────────

export const JUSTIFICACION = [
  {
    titulo: 'Relevancia',
    texto:
      'Aporta una herramienta de apoyo al médico general y al especialista en regiones con datos etiquetados limitados.',
    refs: ['yang-2024'],
  },
  {
    titulo: 'Pertinencia institucional',
    texto:
      'Se alinea con las políticas de transformación digital en salud de Colombia y con el Marco Ético de IA del MinCiencias.',
    refs: ['minciencias-2021'],
  },
  {
    titulo: 'Diferenciación metodológica',
    texto:
      'Frente a trabajos previos en Colombia que utilizan aprendizaje supervisado o ML tradicional, este proyecto aplica SSL para reducir la dependencia de anotaciones médicas.',
    refs: ['krishnan-2022', 'ieee-10647641'],
    destacado: true,
  },
  {
    titulo: 'Viabilidad',
    texto:
      'Se utilizan datasets públicos (HAM10000, ISIC) y herramientas de código abierto. La prueba en entornos universitarios queda sujeta a confirmación.',
    refs: ['ham10000-2018'],
  },
  {
    titulo: 'Formación profesional',
    texto:
      'Incluye competencias en diseño de sistemas inteligentes, procesamiento de imágenes médicas y desarrollo de software aplicado a salud.',
  },
] as const;

export const JUSTIFICACION_RESUMEN = {
  importancia:
    'Aborda una necesidad documentada de apoyo diagnóstico regional. Se alinea con la política nacional de transformación digital en salud.',
  pertenencia: {
    tecnica: 'SSL como paradigma actual de aprendizaje no supervisado.',
    academica: 'Formación en ingeniería de sistemas y procesamiento de imágenes médicas.',
    social: 'Apoyo a procesos clínicos del departamento de Santander.',
  },
  beneficiarios: 'Médicos generales y dermatólogos de Santander.',
  alcanceCorto:
    'Diseño, implementación y validación de un prototipo funcional (TRL 4) sobre datasets públicos. No incluye pruebas con pacientes reales ni integración hospitalaria.',
};

// ─────────────────────────────────────────────────────────────────────────
// §06 · ALCANCE Y DELIMITACIÓN
// ─────────────────────────────────────────────────────────────────────────

export const ALCANCE = {
  incluye: [
    'Diseño, implementación y validación de un algoritmo SSL para clasificación de lesiones cutáneas.',
    'Caracterización de datos dermatológicos públicos contrastados con el perfil regional.',
    'Algoritmo entrenado bajo el paradigma SSL.',
    'Informe comparativo de desempeño frente a una línea base supervisada.',
    'Prototipo funcional para carga de imágenes y consulta de predicciones.',
  ],
  delimitacion: [
    {
      eje: 'Datos',
      detalle: 'Uso exclusivo de repositorios públicos (HAM10000, ISIC). No se recolectan imágenes en hospitales.',
      refs: ['ham10000-2018'],
    },
    {
      eje: 'Pruebas clínicas',
      detalle: 'No se realizan pruebas con pacientes reales ni validación médica formal.',
    },
    {
      eje: 'Integración',
      detalle: 'Prototipo independiente. No se conecta con HCE ni bases de datos hospitalarias.',
    },
    {
      eje: 'Recursos',
      detalle: 'Limitado a herramientas gratuitas y al cronograma del trabajo de grado.',
    },
    {
      eje: 'Madurez tecnológica',
      detalle: 'TRL 4 · validación en entorno de laboratorio bajo condiciones controladas.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §07 · OBJETIVOS
// ─────────────────────────────────────────────────────────────────────────

export const OBJETIVOS = {
  general:
    'Desarrollar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en el departamento de Santander.',
  especificos: [
    {
      id: 1,
      texto:
        'Analizar conjuntos de datos públicos de imágenes dermatológicas con base en el perfil epidemiológico de Santander.',
      fase: 'Fase 1',
      estado: 'EN CURSO',
      actividades: [
        { label: 'Caracterización de HAM10000 e ISIC.', estado: 'COMPLETADO' },
        { label: 'Contraste con el perfil epidemiológico de Santander.', estado: 'COMPLETADO' },
        { label: 'Definición de criterios de inclusión y clases priorizadas.', estado: 'COMPLETADO' },
        { label: 'Preprocesamiento y análisis exploratorio.', estado: 'COMPLETADO' },
        { label: 'Construcción del pipeline de preparación.', estado: 'EN CURSO' },
      ],
    },
    {
      id: 2,
      texto:
        'Diseñar y entrenar un algoritmo de detección bajo el paradigma de aprendizaje autosupervisado.',
      fase: 'Fase 2',
      estado: 'PENDIENTE',
      actividades: [
        { label: 'Diseño de la arquitectura SSL.', estado: 'PENDIENTE' },
        { label: 'Entrenamiento con datos no etiquetados.', estado: 'PENDIENTE' },
        { label: 'Fine-tuning con datos etiquetados.', estado: 'PENDIENTE' },
        { label: 'Documentación de hiperparámetros.', estado: 'PENDIENTE' },
      ],
    },
    {
      id: 3,
      texto:
        'Evaluar el desempeño del modelo SSL contra una línea base supervisada bajo condiciones experimentales equivalentes.',
      fase: 'Fase 3',
      estado: 'PENDIENTE',
      actividades: [
        { label: 'Cálculo de AUC-ROC, F1-Score y exactitud por clase.', estado: 'PENDIENTE' },
        { label: 'Comparación contra línea base supervisada.', estado: 'PENDIENTE' },
        { label: 'Generación de matrices de confusión.', estado: 'PENDIENTE' },
        { label: 'Informe comparativo final.', estado: 'PENDIENTE' },
      ],
    },
    {
      id: 4,
      texto:
        'Implementar un prototipo funcional que integre el algoritmo desarrollado, con interfaz para cargar imágenes y consultar predicciones.',
      fase: 'Fase 4',
      estado: 'PENDIENTE',
      actividades: [
        { label: 'Integración del modelo en prototipo funcional.', estado: 'PENDIENTE' },
        { label: 'Documentación del manual de uso.', estado: 'PENDIENTE' },
        { label: 'Reporte de métricas y limitaciones al usuario.', estado: 'PENDIENTE' },
      ],
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §08 · RESULTADOS ESPERADOS Y MADUREZ TRL
// ─────────────────────────────────────────────────────────────────────────

export const RESULTADOS = {
  tecnico:
    'Algoritmo SSL entrenado e informe comparativo de desempeño frente a una línea base supervisada bajo condiciones experimentales equivalentes.',
  funcional:
    'Prototipo funcional documentado que permite cargar una imagen, recibir la predicción del modelo y consultar las métricas de desempeño y limitaciones del sistema. La interfaz específica queda por definir.',
  trl: {
    nivel: 'TRL 4',
    descripcion:
      'Tecnología validada en entorno de laboratorio bajo condiciones controladas.',
  },
};

export const METRICAS = [
  {
    nombre: 'AUC-ROC',
    rol: 'Métrica principal',
    detalle:
      'Mide la capacidad del modelo para distinguir entre clases (benignas vs. malignas) a través de distintos umbrales de decisión.',
    refs: ['sauter-2023'],
  },
  {
    nombre: 'F1-Score',
    rol: 'Métrica complementaria',
    detalle:
      'Equilibrio entre precisión y sensibilidad. Aplicable ante desbalance de clases (menor prevalencia de melanoma frente a BCC).',
    refs: ['chaturvedi-2020'],
  },
  {
    nombre: 'Exactitud por clase',
    rol: 'Desagregada por lesión',
    detalle:
      'Reportada por tipo de lesión (BCC, MEL). Muestra desempeño específico por clase priorizada.',
    refs: ['chaturvedi-2020'],
  },
  {
    nombre: 'Matriz de confusión',
    rol: 'Diagnóstico de errores',
    detalle:
      'Permite observar la distribución de falsos positivos y falsos negativos por clase.',
    refs: ['sauter-2023'],
  },
] as const;

export const PUNTOS_ESTRATEGICOS = [
  {
    titulo: 'Línea base comparativa',
    texto:
      'Los resultados del modelo SSL se contrastan contra un modelo supervisado convencional entrenado con la misma arquitectura y datos para aislar el efecto del paradigma autosupervisado.',
    refs: ['krishnan-2022'],
  },
  {
    titulo: 'Criterio de éxito',
    texto:
      'Obtener valores de desempeño comparables a los reportados en la literatura para tareas similares con pocos datos etiquetados.',
    refs: ['hammimou-2025', 'ieee-10647641'],
  },
  {
    titulo: 'Transparencia clínica',
    texto:
      'El prototipo reporta las métricas al usuario médico para que conozca capacidades y limitaciones del sistema antes de cualquier decisión.',
    refs: ['minciencias-2021'],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// §09 · MARCO TEÓRICO-CONCEPTUAL
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_TEORICO = [
  {
    pilar: 'Fundamento clínico',
    titulo: 'Lesiones cutáneas',
    contenido:
      'Clasificación entre benignas (nevos, queratosis seborreica) y malignas (melanoma, carcinoma basocelular). El melanoma corresponde al 80 % de las muertes registradas pese a menor incidencia. Estándares de detección: método ABCDE y dermatoscopía.',
    refs: ['pathania-2022', 'cac-2025'],
  },
  {
    pilar: 'Fundamento técnico',
    titulo: 'Del ML tradicional al deep learning',
    contenido:
      'Transición desde Machine Learning tradicional hacia Deep Learning con arquitecturas como ResNet y Vision Transformers (ViT).',
    refs: ['chaturvedi-2020', 'sauter-2023'],
  },
  {
    pilar: 'Eje central',
    titulo: 'Aprendizaje autosupervisado · SSL',
    contenido:
      'Extrae características visuales sin etiquetas manuales mediante estrategias contrastivas (p. ej. SimCLR) y de destilación (p. ej. DINO).',
    refs: ['krishnan-2022', 'dino-2024'],
    destacado: true,
  },
] as const;

export const CLASES_DERMATOLOGICAS = [
  { sigla: 'BCC', nombre: 'Carcinoma basocelular', tipo: 'Maligna' },
  { sigla: 'SCC', nombre: 'Carcinoma escamocelular', tipo: 'Maligna' },
  { sigla: 'MEL', nombre: 'Melanoma', tipo: 'Maligna' },
  { sigla: 'ACK', nombre: 'Queratosis actínica', tipo: 'Precancerosa' },
  { sigla: 'NEV', nombre: 'Nevo melanocítico', tipo: 'Benigna' },
  { sigla: 'SEK', nombre: 'Queratosis seborreica', tipo: 'Benigna' },
  { sigla: 'DF', nombre: 'Dermatofibroma', tipo: 'Benigna' },
  { sigla: 'VASC', nombre: 'Lesiones vasculares', tipo: 'Benigna' },
] as const;

export const COMPARATIVA_SUPERVISADO_SSL = [
  {
    eje: 'Etiquetas',
    supervisado: 'Requiere etiquetas exhaustivas',
    ssl: 'Aprende sin etiquetas en pre-entrenamiento',
  },
  {
    eje: 'Costo de anotación',
    supervisado: 'Alto · especialistas',
    ssl: 'Bajo · solo en fine-tuning',
  },
  {
    eje: 'Datos en escenarios escasos',
    supervisado: 'Limitado',
    ssl: 'Reportado como superior en literatura',
  },
  {
    eje: 'Transferibilidad regional',
    supervisado: 'Dependiente de dataset',
    ssl: 'Pre-entrenamiento aprovechable',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// §10 · MARCO NORMATIVO
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_NORMATIVO = {
  nacional: [
    {
      sigla: 'Ley 1581 · 2012',
      titulo: 'Protección de datos personales',
      detalle: 'Marco legal colombiano para tratamiento de datos personales y sensibles.',
      refs: ['ley-1581-2012'],
    },
    {
      sigla: 'Ley 1419 · 2010',
      titulo: 'Telesalud',
      detalle: 'Lineamientos para el desarrollo de la telesalud en Colombia.',
      refs: ['ley-1419-2010'],
    },
    {
      sigla: 'Marco Ético IA · 2021',
      titulo: 'MinCiencias',
      detalle: 'Transparencia, reducción de sesgos y responsabilidad en sistemas de IA.',
      refs: ['minciencias-2021'],
    },
  ],
  internacional: [
    {
      sigla: 'GDPR · UE 2016',
      titulo: 'Datos biométricos y de salud',
      detalle: 'Reglamento europeo para el manejo de datos sensibles.',
      refs: ['gdpr-2016'],
    },
    {
      sigla: 'Helsinki',
      titulo: 'Ética en investigación médica',
      detalle: 'Principios éticos para investigación médica en seres humanos.',
      refs: ['helsinki'],
    },
  ],
  etica:
    'El proyecto utiliza únicamente datasets públicos anonimizados (HAM10000, ISIC). El prototipo se declara como herramienta de apoyo, no sustituto del juicio clínico.',
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §11 · REVISIÓN DE LITERATURA (sección NUEVA)
// ─────────────────────────────────────────────────────────────────────────

export const REVISION_LITERATURA = {
  resumen:
    'Revisión orientada a caracterizar el estado del arte en aprendizaje autosupervisado aplicado a dermatología y a identificar vacíos en el contexto colombiano.',
  metodologia: [
    {
      paso: 'Pregunta guía',
      detalle: '¿Qué métodos de SSL se han aplicado en clasificación de lesiones cutáneas con datos limitados?',
    },
    {
      paso: 'Criterios de inclusión',
      detalle: 'Estudios 2018–2025, en inglés o español, con métricas reportadas y datasets dermatológicos públicos.',
    },
    {
      paso: 'Criterios de exclusión',
      detalle: 'Trabajos sin métricas comparables, sin acceso a metodología o anteriores a 2018.',
    },
    {
      paso: 'Selección',
      detalle: 'Revisión por título · resumen · texto completo · síntesis temática.',
    },
  ],
  bases: [
    { nombre: 'IEEE Xplore', alcance: 'Computación e ingeniería' },
    { nombre: 'ScienceDirect', alcance: 'Ciencias aplicadas e ingeniería' },
    { nombre: 'Nature Family', alcance: 'Biomedicina · Nature Medicine · Nature Communications · Scientific Data' },
    { nombre: 'PubMed', alcance: 'Investigación biomédica' },
    { nombre: 'Repositorios institucionales', alcance: 'Universidades colombianas · Uniandes · UNAB' },
  ],
  hallazgos: [
    {
      eje: 'SSL en dermatología',
      sintesis: 'Estudios internacionales muestran que SSL alcanza desempeño comparable o superior al supervisado con menos etiquetas.',
      refs: ['krishnan-2022', 'barlow-2024', 'ieee-10647641'],
    },
    {
      eje: 'Modelos fundacionales',
      sintesis: 'PanDerm establece un referente con 2 M de imágenes y 11 instituciones, pero con costo computacional elevado.',
      refs: ['panderm-2025'],
    },
    {
      eje: 'Sesgo poblacional',
      sintesis: 'La literatura reporta sesgo hacia fototipos caucásicos y baja generalización a poblaciones de ingreso medio-bajo.',
      refs: ['yang-2024'],
    },
    {
      eje: 'Trabajos en Colombia',
      sintesis: 'Investigaciones nacionales se limitan a aprendizaje supervisado y ML tradicional · ausencia documentada de SSL.',
      refs: ['hammimou-2025'],
    },
  ],
  brechas: [
    'Ausencia de aplicación de SSL en datasets dermatológicos colombianos.',
    'Falta de adaptación a fototipos y perfil epidemiológico regional.',
    'Carencia de prototipos funcionales que reporten métricas y limitaciones al usuario clínico.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §12 · ANTECEDENTES Y ESTADO DEL ARTE
// ─────────────────────────────────────────────────────────────────────────

export const ANTECEDENTES_NIVEL = {
  internacional: {
    titulo: 'Nivel internacional · SSL',
    estudios: [
      {
        nombre: 'DINO',
        origen: 'Suiza · 2024',
        aporte: 'Agrupación de lesiones sin etiquetas mediante destilación auto-supervisada.',
        refs: ['dino-2024'],
        destacado: false,
      },
      {
        nombre: 'Barlow Twins',
        origen: 'Alemania · 2024',
        aporte: 'Reporta desempeño superior al supervisado con datos limitados.',
        refs: ['barlow-2024'],
        destacado: false,
      },
      {
        nombre: 'PanDerm',
        origen: 'Nature Medicine · 2025',
        aporte: 'Modelo fundacional con 2 M de imágenes y 11 instituciones.',
        refs: ['panderm-2025'],
        destacado: true,
      },
      {
        nombre: 'IEEE 10647641',
        origen: 'IEEE Xplore',
        aporte: 'Aplicación de SSL en imágenes médicas dermatológicas.',
        refs: ['ieee-10647641'],
        destacado: true,
      },
    ],
    limitacion:
      'Los estudios reportados se enfocan en poblaciones caucásicas y requieren recursos computacionales no asequibles para clínicas regionales.',
    refs: ['yang-2024'],
  },
  nacional: {
    titulo: 'Nivel nacional · Colombia',
    texto:
      'Investigaciones de la Universidad de los Andes (2024) y otros estudios locales se han concentrado en aprendizaje supervisado (CNN) y ML tradicional. No se documenta aplicación previa de SSL.',
    refs: ['hammimou-2025'],
  },
  valorAgregado: {
    titulo: 'Diferenciación del proyecto',
    texto:
      'Según la literatura revisada, corresponde a la primera aplicación documentada de aprendizaje autosupervisado dermatológico en el contexto colombiano. Busca adaptar las tecnologías existentes a las capacidades computacionales locales y al perfil epidemiológico regional.',
    refs: ['krishnan-2022', 'ieee-10647641'],
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §13 · MARCO CONTEXTUAL
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_CONTEXTUAL = {
  institucional: {
    titulo: 'Contexto institucional',
    detalle:
      'Universidad Autónoma de Bucaramanga · Facultad de Ingeniería · Programa de Ingeniería de Sistemas · Proyecto de Grado I 2026.',
  },
  regional: {
    titulo: 'Contexto regional',
    detalle:
      'Departamento de Santander, Colombia. Bucaramanga cuenta con registros poblacionales de cáncer disponibles a través del Hospital Internacional de Colombia (HIC) y la Cuenta de Alto Costo.',
    refs: ['el-frente-2024', 'cac-2025'],
  },
  poblacional: {
    titulo: 'Contexto poblacional',
    detalle:
      'Médicos generales y dermatólogos de Santander; foco en BCC · SCC · MEL como lesiones priorizadas por epidemiología regional.',
    refs: ['uribe-2018'],
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §14 · ASPECTOS METODOLÓGICOS · CRISP-DM 4 fases
// ─────────────────────────────────────────────────────────────────────────

export const METODOLOGIA = {
  paradigma: 'CRISP-DM iterativo',
  citaFuente: 'Wirth & Hipp · 2000',
  refs: ['wirth-hipp-2000'],
  nota: 'CRISP-DM se adapta a 4 fases que mapean uno-a-uno a los objetivos específicos.',
  fases: [
    {
      codigo: 'F1',
      label: 'Análisis y caracterización de datos',
      objetivo: 'Objetivo 1',
      actividades: [
        'Caracterización de HAM10000 e ISIC.',
        'Contraste con el perfil epidemiológico de Santander.',
        'Definición de criterios de inclusión y clases priorizadas.',
        'Preprocesamiento y análisis exploratorio.',
        'Construcción del pipeline de preparación.',
      ],
      estadoActividades: ['COMPLETADO', 'COMPLETADO', 'COMPLETADO', 'COMPLETADO', 'EN CURSO'],
    },
    {
      codigo: 'F2',
      label: 'Diseño y entrenamiento del algoritmo SSL',
      objetivo: 'Objetivo 2',
      actividades: [
        'Diseño de la arquitectura SSL.',
        'Entrenamiento con datos no etiquetados.',
        'Fine-tuning con datos etiquetados.',
        'Documentación de hiperparámetros.',
      ],
      estadoActividades: ['PENDIENTE', 'PENDIENTE', 'PENDIENTE', 'PENDIENTE'],
    },
    {
      codigo: 'F3',
      label: 'Evaluación rigurosa',
      objetivo: 'Objetivo 3',
      actividades: [
        'Cálculo de AUC-ROC, F1-Score y exactitud por clase.',
        'Comparación contra línea base supervisada.',
        'Generación de matrices de confusión.',
        'Informe comparativo final.',
      ],
      estadoActividades: ['PENDIENTE', 'PENDIENTE', 'PENDIENTE', 'PENDIENTE'],
    },
    {
      codigo: 'F4',
      label: 'Implementación del prototipo',
      objetivo: 'Objetivo 4',
      actividades: [
        'Integración del modelo en prototipo funcional.',
        'Documentación del manual de uso.',
        'Reporte de métricas y limitaciones al usuario.',
      ],
      estadoActividades: ['PENDIENTE', 'PENDIENTE', 'PENDIENTE'],
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §15 · CRONOGRAMA
// ─────────────────────────────────────────────────────────────────────────

export const CRONOGRAMA = [
  { fase: 'F1', label: 'Análisis y caracterización', objetivo: 'OBJ-01', estado: 'EN CURSO', duracion: 'Semestre 1' },
  { fase: 'F2', label: 'Diseño y entrenamiento SSL', objetivo: 'OBJ-02', estado: 'PENDIENTE', duracion: 'Semestre 1-2' },
  { fase: 'F3', label: 'Evaluación rigurosa', objetivo: 'OBJ-03', estado: 'PENDIENTE', duracion: 'Semestre 2' },
  { fase: 'F4', label: 'Prototipo funcional', objetivo: 'OBJ-04', estado: 'PENDIENTE', duracion: 'Semestre 2' },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// §16 · AVANCES DEL TRABAJO
// ─────────────────────────────────────────────────────────────────────────

export const AVANCES = {
  estado: 'Anteproyecto · Fase 1 (OBJ-01) en curso',
  realizado: [
    'Caracterización del problema clínico regional.',
    'Revisión de literatura y estado del arte.',
    'Selección inicial de datasets (HAM10000, ISIC).',
    'Análisis exploratorio y caracterización de los datos.',
  ],
  pendiente: [
    'Construcción del pipeline completo de preparación (actividad 5 del OBJ-01).',
    'Definición de la técnica específica de SSL (OBJ-02).',
    'Diseño y entrenamiento del modelo (OBJ-02).',
    'Evaluación contra línea base (OBJ-03).',
    'Prototipo funcional (OBJ-04).',
  ],
  notaImportante:
    'La técnica específica de SSL todavía no ha sido definida. Esa decisión corresponde al Objetivo 2.',
};

// ─────────────────────────────────────────────────────────────────────────
// §17 · REFERENCIAS BIBLIOGRÁFICAS · agrupadas
// ─────────────────────────────────────────────────────────────────────────

export const REFERENCIAS = [
  {
    grupo: 'Epidemiología',
    items: [
      'El Frente. (2024). Alerta para Santander: el 15 % de los diagnósticos de cáncer en el HIC son de piel.',
      'Uribe, C. J., Anaya-Reyes, K. C., Céspedes, A. M., et al. (2018). Carcinoma basocelular de piel en el área metropolitana de Bucaramanga, Colombia: una mirada epidemiológica. Revista de la Asociación Colombiana de Dermatología y Cirugía Dermatológica, 26(1), 18-23.',
      'Cuenta de Alto Costo. (2025). Día mundial del melanoma cutáneo 2025.',
    ],
  },
  {
    grupo: 'Antecedentes técnicos · SSL',
    items: [
      'Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5(1), 180161.',
      'Krishnan, R., Rajpurkar, P., & Topol, E. J. (2022). Self-supervised learning in medicine and healthcare. Nature Biomedical Engineering, 6(12), 1346-1352.',
      'Hammimou, A., Ezzahori, H., Boudaoud, A., & Aqil, M. (2025). From traditional to deep learning methods for skin lesion segmentation: a literature review. Scientific African, 29, e02783.',
      'IEEE 10647641 · https://ieeexplore.ieee.org/abstract/document/10647641 · Aplicación de SSL en imágenes médicas dermatológicas.',
    ],
  },
  {
    grupo: 'Deep learning · dermatología',
    items: [
      'Chaturvedi, S. S., Tembhurne, J. V., & Diwan, T. (2020). A multi-class skin cancer classification using deep convolutional neural networks. Multimedia Tools and Applications, 79(39), 28477-28498.',
      'Omiye, J. A., Rao, B. K., Razi, S., et al. (2025). Automated detection of benign and malignant skin lesions from reflectance confocal microscopy images using deep learning. JID Innovations, 5(6), 100404.',
      'Sauter, D., Lodde, G., Nensa, F., et al. (2023). Deep learning in computational dermatopathology of melanoma: a technical systematic literature review. Computers in Biology and Medicine, 163, 107083.',
      'Wang, G., Luo, X., Gu, R., et al. (2023). PyMIC: a deep learning toolkit for annotation-efficient medical image segmentation. Computer Methods and Programs in Biomedicine, 231, 107398.',
    ],
  },
  {
    grupo: 'Diagnóstico clínico',
    items: [
      'Pathania, Y. S., Apalla, Z., Salerni, G., et al. (2022). Non-invasive diagnostic techniques in pigmentary skin disorders and skin cancer. Journal of Cosmetic Dermatology, 21(2), 444-450.',
    ],
  },
  {
    grupo: 'IA en sistemas de salud',
    items: [
      'Yang, J., Dung, N. T., Thach, P. N., et al. & Clifton, D. A. (2024). Generalizability assessment of AI models across hospitals in a low-middle and high income country. Nature Communications, 15(1), 8270.',
    ],
  },
  {
    grupo: 'Normativa',
    items: [
      'Ministerio de Ciencia, Tecnología e Innovación. (2021). Marco ético para la Inteligencia Artificial en Colombia.',
      'Ley 1581 de 2012 · Congreso de la República de Colombia · Protección de datos personales.',
      'Ley 1419 de 2010 · Congreso de la República de Colombia · Lineamientos para la telesalud.',
      'Reglamento General de Protección de Datos · UE 2016 · GDPR.',
      'Declaración de Helsinki · Asociación Médica Mundial.',
    ],
  },
  {
    grupo: 'Metodología',
    items: [
      'Wirth, R., & Hipp, J. (2000). CRISP-DM: towards a standard process model for data mining.',
    ],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// NAVEGACIÓN · 18 secciones (00 Inicio + 17 contenido)
// ─────────────────────────────────────────────────────────────────────────

export const SECCIONES = [
  { id: 0,  slug: 'inicio',              label: 'Inicio' },
  { id: 1,  slug: 'introduccion',        label: 'Introducción' },
  { id: 2,  slug: 'problema',            label: 'Problema' },
  { id: 3,  slug: 'pregunta',            label: 'Pregunta' },
  { id: 4,  slug: 'hipotesis',           label: 'Hipótesis' },
  { id: 5,  slug: 'justificacion',       label: 'Justificación' },
  { id: 6,  slug: 'alcance',             label: 'Alcance' },
  { id: 7,  slug: 'objetivos',           label: 'Objetivos' },
  { id: 8,  slug: 'marco-teorico',       label: 'Marco teórico' },
  { id: 9,  slug: 'marco-normativo',     label: 'Marco normativo' },
  { id: 10, slug: 'revision-literatura', label: 'Revisión literatura' },
  { id: 11, slug: 'antecedentes',        label: 'Antecedentes' },
  { id: 12, slug: 'contexto',            label: 'Contexto' },
  { id: 13, slug: 'metodologia',         label: 'Metodología' },
  { id: 14, slug: 'cronograma',          label: 'Cronograma' },
  { id: 15, slug: 'avances',             label: 'Avances' },
  { id: 16, slug: 'resultados',          label: 'Resultados esperados' },
  { id: 17, slug: 'referencias',         label: 'Referencias' },
] as const;

export const TOTAL_SECONDS = 15 * 60; // 15 minutos
