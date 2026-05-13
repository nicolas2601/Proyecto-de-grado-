// ─────────────────────────────────────────────────────────────────────────
// CONTENIDO VERBATIM · sustentación · proyecto de grado I · UNAB 2026
// Fuente: guion entregado por los autores con base en los 2 documentos del
// anteproyecto. Toda la información acá es citable y defendible.
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
// §00 · INTRODUCCIÓN (breve)
// ─────────────────────────────────────────────────────────────────────────

export const INTRODUCCION = {
  texto:
    'Las lesiones cutáneas son alteraciones visibles de la piel que pueden originarse por factores genéticos, ambientales o como manifestación de enfermedades sistémicas. Su clasificación entre benignas y malignas es clínicamente fundamental, puesto que determina el curso del tratamiento y el pronóstico del paciente. A pesar de su alta prevalencia a nivel mundial, su diagnóstico oportuno sigue siendo un reto, especialmente en regiones con acceso limitado a servicios especializados.',
  propuesta:
    'Este proyecto propone el desarrollo de un prototipo de apoyo diagnóstico basado en aprendizaje autosupervisado, orientado a fortalecer las capacidades de identificación de lesiones cutáneas y reducir la dependencia de datos etiquetados en contextos clínicos con recursos limitados como Santander.',
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §01 · PLANTEAMIENTO DEL PROBLEMA · de lo global a lo regional
// ─────────────────────────────────────────────────────────────────────────

export const PROBLEMA = {
  global: {
    titulo: 'Contexto global y nacional',
    texto:
      'El cáncer de piel es una de las neoplasias más frecuentes en el mundo. En Colombia, la situación es crítica: solo en 2024 se reportaron 11.064 casos.',
    cifras: [
      { valor: '11.064', etiqueta: 'casos · Colombia 2024' },
    ],
  },
  regional: {
    titulo: 'Situación en Santander',
    texto:
      'Entre 2016 y 2023 se registraron 3.060 casos en el Instituto de Cáncer del HIC. El carcinoma basocelular es el más frecuente (64,82 %), pero el melanoma causa el 80 % de las muertes pese a ser menos común.',
    cifras: [
      { valor: '3.060', etiqueta: 'casos HIC · 2016-2023' },
      { valor: '64,82 %', etiqueta: 'predominio BCC' },
      { valor: '80 %', etiqueta: 'muertes por melanoma' },
    ],
  },
  deficiencia: {
    titulo: 'La deficiencia diagnóstica',
    texto:
      'El diagnóstico actual depende de la experiencia del especialista (exactitud del 62 % al 80 %) y de biopsias que son invasivas, costosas y lentas.',
  },
  tecnico: {
    titulo: 'El problema técnico',
    texto:
      'Los sistemas de IA actuales (aprendizaje supervisado) requieren miles de imágenes etiquetadas por expertos, un recurso escaso y costoso de obtener en Santander.',
  },
  impacto: {
    titulo: 'Impacto negativo',
    texto:
      'Esta carencia tecnológica deriva en diagnósticos tardíos, mayor mortalidad y sobrecarga en los servicios de dermatología de la región.',
  },
};

export const EVIDENCIA_PROBLEMA = [
  {
    id: 'experto',
    titulo: 'Dependencia del experto',
    valor: '62 % – 80 %',
    detalle:
      'Precisión del diagnóstico clínico según experiencia: 62 % entre 3-5 años de experiencia, hasta 80 % con más de 10 años.',
  },
  {
    id: 'biopsia',
    titulo: 'Barreras económicas',
    valor: 'biopsias invasivas',
    detalle:
      'Procedimientos costosos y lentos, dificultan el diagnóstico oportuno en entornos con recursos limitados como Santander.',
  },
  {
    id: 'datos',
    titulo: 'Limitación tecnológica',
    valor: 'datos etiquetados escasos',
    detalle:
      'Los modelos de IA actuales dependen de grandes volúmenes de datos etiquetados por especialistas, un recurso escaso y costoso en el departamento.',
  },
] as const;

export const ARBOL_PROBLEMA = {
  problemaCentral:
    'Limitaciones en la detección oportuna de lesiones cutáneas en centros clínicos de Santander.',
  causas: [
    {
      codigo: 'C1',
      titulo: 'Dependencia del experto',
      detalle:
        'La exactitud diagnóstica varía entre 62 % y 80 % según la experiencia del especialista.',
    },
    {
      codigo: 'C2',
      titulo: 'Diagnóstico invasivo',
      detalle:
        'Las biopsias son costosas y lentas, no aptas para tamizaje masivo en regiones con recursos limitados.',
    },
    {
      codigo: 'C3',
      titulo: 'Escasez de datos etiquetados',
      detalle:
        'Los modelos supervisados requieren miles de imágenes anotadas por especialistas, un recurso costoso y escaso en Santander.',
    },
    {
      codigo: 'C4',
      titulo: 'Modelos extranjeros poco transferibles',
      detalle:
        'Los sistemas internacionales fueron desarrollados en poblaciones caucásicas y requieren cómputo inasequible para clínicas regionales.',
    },
  ],
  consecuencias: [
    {
      codigo: 'E1',
      titulo: 'Diagnóstico tardío',
      detalle:
        'Las lesiones se detectan en etapas avanzadas, reduciendo el pronóstico clínico.',
    },
    {
      codigo: 'E2',
      titulo: 'Mayor mortalidad',
      detalle:
        'El melanoma causa el 80 % de las muertes pese a ser menos común que el carcinoma basocelular.',
    },
    {
      codigo: 'E3',
      titulo: 'Sobrecarga del sistema',
      detalle:
        'Los servicios de dermatología de Santander operan saturados, con tiempos de espera prolongados.',
    },
    {
      codigo: 'E4',
      titulo: 'Brecha tecnológica',
      detalle:
        'Sin método regional, la oportunidad clínica de la IA se queda en investigaciones extranjeras.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §02 · PREGUNTA E HIPÓTESIS DE INVESTIGACIÓN
// ─────────────────────────────────────────────────────────────────────────

export const PREGUNTA = {
  central:
    '¿Cómo diseñar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado (SSL) para la detección de lesiones cutáneas que apoye el diagnóstico clínico en Santander?',
  alcance:
    'El proyecto busca desarrollar una herramienta de apoyo, no un sustituto del juicio clínico, aprovechando datos no etiquetados para reducir la brecha tecnológica.',
  supuestos: [
    'Las técnicas de SSL permiten extraer representaciones visuales robustas de imágenes dermatológicas sin necesidad de etiquetas exhaustivas.',
    'El paradigma autosupervisado supera las limitaciones del aprendizaje supervisado convencional en escenarios de datos escasos.',
    'Los datasets públicos (HAM10000, ISIC) cubren las clases priorizadas por epidemiología regional.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// §03 · JUSTIFICACIÓN
// ─────────────────────────────────────────────────────────────────────────

export const JUSTIFICACION = [
  {
    titulo: 'Relevancia y necesidad',
    texto:
      'Responde a la necesidad de herramientas tecnológicas que apoyen al médico general y al especialista en regiones con recursos limitados.',
  },
  {
    titulo: 'Pertinencia e impacto',
    texto:
      'El proyecto se alinea con las políticas de transformación digital en salud de Colombia y busca reducir las brechas de acceso a tecnologías de punta en el territorio.',
  },
  {
    titulo: 'Valor agregado · innovación',
    texto:
      'A diferencia de otros trabajos en Colombia que usan métodos tradicionales o supervisados, este proyecto utiliza Aprendizaje Autosupervisado (SSL). Esto permite que el modelo aprenda de imágenes sin etiquetas, eliminando el cuello de botella del costo de anotación médica.',
    destacado: true,
  },
  {
    titulo: 'Viabilidad',
    texto:
      'Es totalmente realizable mediante el uso de datasets públicos (HAM10000, ISIC) y herramientas de código abierto, incluso se espera la prueba en entornos locales pero aún no está definido, ya sea en la universidad, minimizando la inversión económica.',
  },
  {
    titulo: 'Formación profesional',
    texto:
      'Fortalece competencias críticas en diseño de sistemas inteligentes, procesamiento de imágenes médicas y desarrollo de software aplicado a la salud.',
  },
] as const;

export const JUSTIFICACION_RESUMEN = {
  importancia:
    'Responde a la necesidad de fortalecer el diagnóstico regional y se alinea con la transformación digital en salud de Colombia.',
  pertenencia: {
    tecnica: 'Uso de SSL como paradigma actual de aprendizaje no supervisado.',
    academica:
      'Formación en ingeniería de sistemas y procesamiento de imágenes médicas.',
    social: 'Mejora en procesos clínicos del departamento.',
  },
  beneficiarios: 'Médicos generales y dermatólogos de Santander.',
  alcanceCorto:
    'Diseño, implementación y validación de un prototipo funcional (TRL 4) utilizando datasets públicos (HAM10000, ISIC). No incluye pruebas con pacientes reales ni integración en sistemas hospitalarios actuales.',
};

// ─────────────────────────────────────────────────────────────────────────
// §04 · ALCANCE Y DELIMITACIÓN
// ─────────────────────────────────────────────────────────────────────────

export const ALCANCE = {
  incluye: [
    'Diseño, implementación y validación de un algoritmo SSL para detectar lesiones cutáneas.',
    'Caracterización de los datos dermatológicos regionales.',
    'Algoritmo entrenado bajo el paradigma SSL.',
    'Informe comparativo de desempeño frente a modelos supervisados.',
    'Prototipo funcional para que médicos carguen imágenes y obtengan una predicción de apoyo.',
  ],
  delimitacion: [
    {
      eje: 'Datos',
      detalle:
        'No se recolectarán imágenes nuevas en hospitales. Se usarán únicamente repositorios públicos.',
    },
    {
      eje: 'Pruebas clínicas',
      detalle:
        'No se realizarán pruebas con pacientes reales ni validaciones médicas formales.',
    },
    {
      eje: 'Integración',
      detalle:
        'El aplicativo es un prototipo independiente. No se conectará con historias clínicas electrónicas ni bases de datos hospitalarias externas.',
    },
    {
      eje: 'Recursos',
      detalle:
        'El desarrollo se limita al uso de herramientas gratuitas y al tiempo estipulado para el trabajo de grado.',
    },
    {
      eje: 'Madurez',
      detalle:
        'El proyecto alcanza un nivel TRL 4 (validación en entorno de laboratorio).',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §05 · OBJETIVOS
// ─────────────────────────────────────────────────────────────────────────

export const OBJETIVOS = {
  general:
    'Desarrollar un algoritmo de inteligencia artificial basado en aprendizaje autosupervisado para la detección de lesiones cutáneas a partir de imágenes dermatológicas, orientado al apoyo del diagnóstico clínico en el contexto del departamento de Santander.',
  especificos: [
    {
      id: 1,
      texto:
        'Analizar conjuntos de datos públicos de imágenes dermatológicas con base en el perfil epidemiológico de Santander.',
      fase: 'Fase 1',
      estado: 'EN CURSO',
    },
    {
      id: 2,
      texto:
        'Diseñar y entrenar un algoritmo de detección bajo el paradigma de aprendizaje autosupervisado.',
      fase: 'Fase 2',
      estado: 'PENDIENTE',
    },
    {
      id: 3,
      texto:
        'Evaluar el desempeño del modelo SSL contra una línea base supervisada bajo condiciones experimentales equivalentes.',
      fase: 'Fase 3',
      estado: 'PENDIENTE',
    },
    {
      id: 4,
      texto:
        'Implementar un prototipo funcional que integre el algoritmo desarrollado, con interfaz para cargar imágenes y consultar predicciones.',
      fase: 'Fase 4',
      estado: 'PENDIENTE',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §06 · RESULTADOS ESPERADOS Y MADUREZ TRL
// ─────────────────────────────────────────────────────────────────────────

export const RESULTADOS = {
  tecnico:
    'Algoritmo SSL entrenado y un informe comparativo que demuestre un desempeño similar o superior a los modelos supervisados tradicionales en escenarios de datos limitados.',
  funcional:
    'Un prototipo funcional documentado (interfaz aún no definida específicamente) que permita al especialista cargar una imagen, recibir la predicción del modelo y consultar las métricas de desempeño y limitaciones del sistema.',
  trl: {
    nivel: 'TRL 4',
    descripcion:
      'La tecnología está validada en un entorno de laboratorio bajo condiciones controladas.',
  },
};

export const METRICAS = [
  {
    nombre: 'AUC-ROC',
    rol: 'Métrica principal',
    detalle:
      'Mide la capacidad del modelo para distinguir entre clases (lesiones benignas vs. malignas) a través de diferentes umbrales de decisión. Fundamental en contextos clínicos.',
  },
  {
    nombre: 'F1-Score',
    rol: 'Métrica complementaria',
    detalle:
      'Equilibrio entre precisión y sensibilidad. Especialmente valioso ante desbalance de clases (menor prevalencia del melanoma frente al carcinoma basocelular).',
  },
  {
    nombre: 'Exactitud (Accuracy)',
    rol: 'Desagregada por clase',
    detalle:
      'Reportada por tipo de lesión (BCC, MEL). Muestra el desempeño específico por clase relevante en Santander.',
  },
  {
    nombre: 'Matrices de Confusión',
    rol: 'Herramienta visual',
    detalle:
      'Permiten observar dónde ocurren los errores de clasificación (falsos positivos o falsos negativos), vital para la seguridad del paciente.',
  },
] as const;

export const PUNTOS_ESTRATEGICOS = [
  {
    titulo: 'Línea base comparativa',
    texto:
      'Los números del modelo SSL se contrastan con un modelo supervisado convencional entrenado con la misma arquitectura y datos para demostrar el valor real del enfoque autosupervisado en escenarios de datos limitados.',
  },
  {
    titulo: 'Criterio de éxito',
    texto:
      'Alcanzar valores de desempeño comparables a los reportados en la literatura científica para tareas similares de clasificación dermatológica con pocos datos etiquetados.',
  },
  {
    titulo: 'Transparencia',
    texto:
      'El prototipo informará explícitamente estas métricas al usuario médico, garantizando que el especialista conozca las capacidades y limitaciones reales del sistema antes de tomar una decisión clínica.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// §07 · MARCO TEÓRICO-CONCEPTUAL · 3 pilares
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_TEORICO = [
  {
    pilar: 'Fundamento clínico',
    titulo: 'Lesiones cutáneas',
    contenido:
      'Clasificación entre benignas (nevos, queratosis seborreica) y malignas (Melanoma, Carcinoma Basocelular). El melanoma causa el 80 % de las muertes pese a ser menos común. Se basa en el método ABCDE y la dermatoscopía como estándares de detección.',
  },
  {
    pilar: 'Fundamento técnico de IA',
    titulo: 'Del ML tradicional al Deep Learning',
    contenido:
      'Transición desde Machine Learning tradicional hacia Deep Learning con arquitecturas como ResNet y Vision Transformers (ViT).',
  },
  {
    pilar: 'Eje central · SSL',
    titulo: 'Aprendizaje autosupervisado',
    contenido:
      'Permite al sistema extraer características visuales de imágenes dermatológicas sin etiquetas manuales mediante estrategias contrastivas (como SimCLR) y de destilación (como DINO).',
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

// ─────────────────────────────────────────────────────────────────────────
// §08 · MARCO NORMATIVO
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_NORMATIVO = {
  nacional: [
    {
      sigla: 'Ley 1581 · 2012',
      titulo: 'Protección de datos personales',
      detalle:
        'Marco legal colombiano para tratamiento de datos personales y sensibles.',
    },
    {
      sigla: 'Ley 1419 · 2010',
      titulo: 'Telesalud',
      detalle:
        'Establece los lineamientos para el desarrollo de la telesalud en Colombia.',
    },
    {
      sigla: 'Marco Ético IA Colombia · 2021',
      titulo: 'Min Ciencias',
      detalle:
        'Exige transparencia, reducción de sesgos y responsabilidad en sistemas de IA.',
    },
  ],
  internacional: [
    {
      sigla: 'GDPR · UE 2016',
      titulo: 'Protección de datos biométricos',
      detalle:
        'Reglamento europeo para el manejo de datos biométricos y de salud.',
    },
    {
      sigla: 'Declaración de Helsinki',
      titulo: 'Ética en investigación médica',
      detalle:
        'Principios éticos internacionales para la investigación médica en seres humanos.',
    },
  ],
  etica:
    'El proyecto utiliza solo datasets públicos anonimizados (HAM10000, ISIC). Se declara explícitamente que el prototipo es una herramienta de apoyo y no reemplaza el juicio del médico.',
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §09 · ANTECEDENTES Y ESTADO DEL ARTE
// ─────────────────────────────────────────────────────────────────────────

export const ANTECEDENTES_NIVEL = {
  internacional: {
    titulo: 'A nivel internacional · SSL',
    estudios: [
      {
        nombre: 'DINO',
        origen: 'Suiza · 2024',
        aporte:
          'Agrupa lesiones sin etiquetas. Demostró capacidad de aprendizaje no supervisado en dermatología.',
        destacado: false,
      },
      {
        nombre: 'Barlow Twins',
        origen: 'Alemania · 2024',
        aporte:
          'Supera al aprendizaje supervisado cuando hay pocos datos. Evidencia directa del valor del SSL.',
        destacado: false,
      },
      {
        nombre: 'PanDerm',
        origen: 'Nature Medicine · 2025',
        aporte:
          'Modelo fundacional masivo · 2 millones de imágenes · 11 instituciones. Referente más avanzado.',
        destacado: true,
      },
      {
        nombre: 'IEEE 10647641',
        origen: 'IEEE Xplore',
        url: 'https://ieeexplore.ieee.org/abstract/document/10647641',
        aporte:
          'Aplicación de aprendizaje autosupervisado en imágenes médicas dermatológicas.',
        destacado: true,
      },
    ],
    limitacion:
      'Se enfocan en poblaciones caucásicas y requieren recursos computacionales inasequibles para clínicas regionales.',
  },
  nacional: {
    titulo: 'A nivel nacional · Colombia',
    texto:
      'Investigaciones de la Universidad de los Andes (2024) y otros estudios locales se han limitado al Aprendizaje Supervisado (CNN) y Machine Learning tradicional.',
  },
  valorAgregado: {
    titulo: 'El valor agregado de este proyecto',
    texto:
      'El proyecto es innovador al ser, según la literatura revisada, la primera aplicación de Aprendizaje Autosupervisado (SSL) en el contexto colombiano. Busca adaptar estas tecnologías globales a las capacidades computacionales locales y a los fototipos de piel de la región.',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §10 · MARCO CONTEXTUAL
// ─────────────────────────────────────────────────────────────────────────

export const MARCO_CONTEXTUAL = {
  institucional: {
    titulo: 'Contexto institucional',
    detalle:
      'Universidad Autónoma de Bucaramanga · Facultad de Ingeniería · Programa de Ingeniería de Sistemas. Proyecto de Grado I 2026.',
  },
  regional: {
    titulo: 'Contexto regional',
    detalle:
      'Departamento de Santander, Colombia. Bucaramanga cuenta con registros poblacionales de cáncer disponibles a través del Hospital Internacional de Colombia (HIC) y la Cuenta de Alto Costo.',
  },
  poblacional: {
    titulo: 'Contexto poblacional',
    detalle:
      'Médicos generales y dermatólogos de Santander, con foco en BCC · SCC · MEL como lesiones priorizadas por epidemiología regional.',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §11 · REVISIÓN DE LITERATURA · ya cubierta por §07 y §09
// ─────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────
// §12 · ASPECTOS METODOLÓGICOS · CRISP-DM 4 fases
// ─────────────────────────────────────────────────────────────────────────

export const METODOLOGIA = {
  paradigma: 'CRISP-DM iterativo',
  citaFuente: 'Wirth & Hipp · 2000',
  nota:
    'El proyecto adapta CRISP-DM a 4 fases que mapean directamente a los 4 objetivos específicos.',
  fases: [
    {
      codigo: 'F1',
      label: 'Análisis y caracterización de datos',
      objetivo: 'Objetivo 1',
      actividades: [
        'Caracterización de datasets HAM10000 e ISIC.',
        'Contraste con el perfil epidemiológico de Santander.',
        'Definición de criterios de inclusión y clases priorizadas.',
        'Preprocesamiento y análisis exploratorio.',
        'Construcción del pipeline de preparación de datos.',
      ],
      estadoActividades: [
        'COMPLETADO',
        'COMPLETADO',
        'COMPLETADO',
        'COMPLETADO',
        'EN CURSO',
      ],
    },
    {
      codigo: 'F2',
      label: 'Diseño y entrenamiento del algoritmo SSL',
      objetivo: 'Objetivo 2',
      actividades: [
        'Diseño de la arquitectura SSL.',
        'Entrenamiento con datos no etiquetados.',
        'Fine-tuning con datos etiquetados.',
        'Documentación de hiperparámetros y decisiones.',
      ],
      estadoActividades: ['PENDIENTE', 'PENDIENTE', 'PENDIENTE', 'PENDIENTE'],
    },
    {
      codigo: 'F3',
      label: 'Evaluación rigurosa',
      objetivo: 'Objetivo 3',
      actividades: [
        'Cálculo de AUC-ROC, F1-score y exactitud desagregada.',
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
        'Integración del modelo en un prototipo funcional.',
        'Documentación del manual de uso.',
        'Reporte de métricas y limitaciones al usuario médico.',
      ],
      estadoActividades: ['PENDIENTE', 'PENDIENTE', 'PENDIENTE'],
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────
// §13 · CRONOGRAMA · diagrama por fases
// ─────────────────────────────────────────────────────────────────────────

export const CRONOGRAMA = [
  {
    fase: 'F1',
    label: 'Análisis y caracterización',
    objetivo: 'OBJ-01',
    estado: 'EN CURSO',
    duracion: 'Semestre 1',
  },
  {
    fase: 'F2',
    label: 'Diseño y entrenamiento SSL',
    objetivo: 'OBJ-02',
    estado: 'PENDIENTE',
    duracion: 'Semestre 1-2',
  },
  {
    fase: 'F3',
    label: 'Evaluación rigurosa',
    objetivo: 'OBJ-03',
    estado: 'PENDIENTE',
    duracion: 'Semestre 2',
  },
  {
    fase: 'F4',
    label: 'Prototipo funcional',
    objetivo: 'OBJ-04',
    estado: 'PENDIENTE',
    duracion: 'Semestre 2',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// §14 · AVANCES DEL TRABAJO · OBJ-01 sin actividad 5
// ─────────────────────────────────────────────────────────────────────────

export const AVANCES = {
  estado: 'Anteproyecto · Fase 1 (OBJ-01) en curso',
  realizado: [
    'Definición y caracterización del problema clínico regional.',
    'Revisión exhaustiva de la literatura y el estado del arte.',
    'Selección inicial de los datasets dermatológicos (HAM10000, ISIC).',
    'Análisis exploratorio y caracterización de los datos.',
  ],
  pendiente: [
    'Construcción del pipeline completo de preparación de datos (actividad 5).',
    'Definición de la técnica específica de SSL (corresponde al OBJ-02).',
    'Diseño y entrenamiento del modelo (OBJ-02).',
    'Evaluación vs línea base (OBJ-03).',
    'Prototipo funcional (OBJ-04).',
  ],
  notaImportante:
    'La técnica específica de SSL todavía no se ha definido. Esa decisión corresponde al Objetivo 2 del proyecto.',
};

// ─────────────────────────────────────────────────────────────────────────
// §15 · REFERENCIAS BIBLIOGRÁFICAS · agrupadas, expandibles
// ─────────────────────────────────────────────────────────────────────────

export const REFERENCIAS = [
  {
    grupo: 'Epidemiología',
    items: [
      'El Frente. (2024). Alerta para Santander: El 15 % de los diagnósticos de cáncer en el HIC son de piel.',
      'Uribe, C. J., Anaya-Reyes, K. C., Céspedes, A. M., et al. (2018). Carcinoma basocelular de piel en el área metropolitana de Bucaramanga, Colombia: Una mirada epidemiológica. Revista de la Asociación Colombiana de Dermatología y Cirugía Dermatológica, 26(1), 18-23.',
      'Cuenta de Alto Costo. (2025). Día mundial del melanoma cutáneo 2025.',
    ],
  },
  {
    grupo: 'Antecedentes técnicos · SSL',
    items: [
      'Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5(1), 180161.',
      'Krishnan, R., Rajpurkar, P., & Topol, E. J. (2022). Self-supervised learning in medicine and healthcare. Nature Biomedical Engineering, 6(12), 1346-1352.',
      'Hammimou, A., Ezzahori, H., Boudaoud, A., & Aqil, M. (2025). From traditional to deep learning methods for skin lesion segmentation: A literature review. Scientific African, 29, e02783.',
      'IEEE 10647641 · https://ieeexplore.ieee.org/abstract/document/10647641 · Aplicación de SSL en imágenes médicas dermatológicas.',
    ],
  },
  {
    grupo: 'Deep Learning · dermatología',
    items: [
      'Chaturvedi, S. S., Tembhurne, J. V., & Diwan, T. (2020). A multi-class skin cancer classification using deep convolutional neural networks. Multimedia Tools and Applications, 79(39), 28477-28498.',
      'Omiye, J. A., Rao, B. K., Razi, S., et al. (2025). Automated detection of benign and malignant skin lesions from reflectance confocal microscopy images using deep learning. JID Innovations, 5(6), 100404.',
      'Sauter, D., Lodde, G., Nensa, F., et al. (2023). Deep learning in computational dermatopathology of melanoma: A technical systematic literature review. Computers in Biology and Medicine, 163, 107083.',
      'Wang, G., Luo, X., Gu, R., et al. (2023). PyMIC: A deep learning toolkit for annotation-efficient medical image segmentation. Computer Methods and Programs in Biomedicine, 231, 107398.',
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
      'Wirth, R., & Hipp, J. (2000). CRISP-DM: Towards a standard process model for data mining.',
    ],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────
// NAVEGACIÓN · 15 secciones
// ─────────────────────────────────────────────────────────────────────────

export const SECCIONES = [
  { id: 0, slug: 'inicio', label: 'Inicio' },
  { id: 1, slug: 'introduccion', label: 'Introducción' },
  { id: 2, slug: 'problema', label: 'Problema' },
  { id: 3, slug: 'pregunta', label: 'Pregunta' },
  { id: 4, slug: 'justificacion', label: 'Justificación' },
  { id: 5, slug: 'alcance', label: 'Alcance' },
  { id: 6, slug: 'objetivos', label: 'Objetivos' },
  { id: 7, slug: 'resultados', label: 'Resultados' },
  { id: 8, slug: 'marco-teorico', label: 'Marco teórico' },
  { id: 9, slug: 'marco-normativo', label: 'Marco normativo' },
  { id: 10, slug: 'antecedentes', label: 'Antecedentes' },
  { id: 11, slug: 'contexto', label: 'Contexto' },
  { id: 12, slug: 'metodologia', label: 'Metodología' },
  { id: 13, slug: 'cronograma', label: 'Cronograma' },
  { id: 14, slug: 'avances', label: 'Avances' },
  { id: 15, slug: 'referencias', label: 'Referencias' },
] as const;

export const TOTAL_SECONDS = 15 * 60; // 15 minutos
