# Contexto consolidado · Sustentación Objetivo 1

> **Proyecto** · Algoritmo de aprendizaje autosupervisado para la detección
> de lesiones cutáneas en imágenes dermatológicas aplicado al contexto
> clínico de Santander · UNAB 2026
>
> **Autores** · Nicolás Santiago Moreno Monroy · María Paula Saavedra Martínez
> **Director** · Andrés Felipe Jerez Ariza
> **Asesora** · Karen Yaneth Sánchez Quiroga · KAUST

Este documento centraliza TODA la información disponible para que cualquier
sección de la página pueda referenciarla sin reinventar contenido. Fuentes:

| ID | Fuente | Origen | Ubicación local |
|----|--------|--------|-----------------|
| **A** | Anteproyecto de Trabajo de Grado (12 secciones) | `.docx` enviado por Nicolas | `docs/anteproyecto-raw.txt` |
| **B** | Epidemiología Santander + análisis de datasets · 14 secciones (incluye tablas 9.1-9.6 + riesgos + propuesta refinada de clases) | Google Doc `148WzHz4...` | aquí (sección 2 de este archivo) |
| **C** | EDA cruzado · notebook Jupyter `objetivo1_eda_COLAB.ipynb` · semilla 42 | local Documentos | `/home/nicolas/Documentos/objetivo1_eda_COLAB.ipynb` |
| **D** | Design System `Ada — Precise Analytical Blueprint` | `DESIGN (4).md` enviado | `docs/design-system-ada.md` |
| **E** | Catálogo de citas APA | `src/data/citations.ts` | repo |
| **F** | Datos cuantitativos del EDA | `src/data/eda.ts` | repo |

---

## 1 · ANTEPROYECTO (Fuente A)

### 1.1 Introducción

El cáncer de piel es una de las neoplasias más frecuentes en el mundo y su
detección temprana es determinante para la supervivencia del paciente. En
Colombia, y particularmente en Santander, esta detección enfrenta una doble
barrera: la dependencia de la experiencia del especialista y la escasez de
herramientas tecnológicas adaptadas al contexto local.

- Precisión del diagnóstico clínico convencional: **62 %–80 %** según la
  experiencia (Chaturvedi et al., 2020).
- Alternativas como la biopsia son invasivas, costosas y lentas para un
  sistema de salud con recursos limitados.
- La detección oportuna del melanoma sigue dependiendo casi exclusivamente
  del criterio clínico.

### 1.2 Planteamiento del Problema

**Contexto global y nacional**
- En 2024 se reportaron **11.064 casos** de cáncer de piel en Colombia.

**Situación en Santander**
- Entre 2016 y 2023 se registraron **3.060 casos** de cáncer de piel en el
  Instituto de Cáncer del Hospital Universitario de Santander (HUS).
- El carcinoma basocelular es el tipo más frecuente: **64,82 %**.
- El melanoma representa el **80 %** de las muertes pese a menor prevalencia.

**Deficiencias del diagnóstico actual**
1. Dependencia del experto (62 %–80 % según experiencia).
2. Barreras económicas (biopsias invasivas, costosas, lentas).
3. Limitación tecnológica (modelos supervisados requieren miles de imágenes
   etiquetadas, escasas en la región).

### 1.3 Pregunta de investigación

> ¿Cómo diseñar un algoritmo de inteligencia artificial basado en
> aprendizaje autosupervisado (SSL) para la detección de lesiones cutáneas
> que apoye el diagnóstico clínico en el departamento de Santander?

**Supuesto**: las técnicas SSL permiten extraer representaciones visuales
robustas sin etiquetas exhaustivas, superando las limitaciones del
aprendizaje supervisado en escenarios de datos escasos. Es **herramienta de
apoyo al juicio clínico**, no sustituto del especialista.

### 1.4 Justificación · 5 dimensiones

1. **Relevancia** · La mayoría de modelos de IA en salud están diseñados
   para contextos con datos abundantes; Colombia no cumple esa condición.
2. **Pertinencia** · Responde a una necesidad clínica santandereana y se
   alinea con los lineamientos de transformación digital en salud del
   MinSalud.
3. **Valor agregado** · Primera aplicación documentada de SSL en Colombia
   para clasificación de lesiones cutáneas.
4. **Viabilidad** · Datasets públicos (HAM10000, ISIC) + técnicas SSL
   probadas + herramientas open source.
5. **Formación profesional** · Fortalece competencias en diseño de sistemas
   inteligentes, procesamiento de imágenes médicas y modelos de ML.

### 1.5 Objetivos

**General**
> Desarrollar un algoritmo de IA basado en aprendizaje autosupervisado para
> la clasificación de lesiones cutáneas a partir de imágenes dermatológicas,
> orientado al apoyo del diagnóstico clínico en el contexto del departamento
> de Santander.

**Específicos**
1. Analizar conjuntos de datos de imágenes dermatológicas representativos
   para Santander.
2. Diseñar un algoritmo de clasificación bajo el paradigma SSL.
3. Evaluar el desempeño con métricas estándar de la literatura.
4. Implementar un prototipo de aplicación que integre el algoritmo.

### 1.6 Alcance y Delimitación

**Alcance** · Diseño, implementación y validación de un algoritmo SSL ·
prototipo TRL 4 validado en laboratorio · beneficiarios: médicos generales
y dermatólogos de Santander.

**Delimitación**
- Datos · solo HAM10000 e ISIC públicos (no se recolectan imágenes nuevas).
- Pruebas clínicas · no se realizan con pacientes reales.
- Integración · prototipo independiente (sin HCE).
- Madurez · TRL 4 (sin despliegue en producción).

### 1.7 Antecedentes y Estado del Arte

**Contexto internacional**
- **DINO (2024)** · agrupa lesiones cutáneas sin etiquetas.
- **Barlow Twins (2024)** · supera al supervisado con datos limitados.
- **PanDerm (Nature Medicine 2025)** · modelo fundacional, millones de
  imágenes dermatológicas.

Limitaciones de estos modelos para el contexto regional: poblaciones
caucásicas predominantes + infraestructura computacional inasequible.

**Contexto nacional · Colombia**
- Trabajos limitados a aprendizaje supervisado (CNN + ML tradicional).
- **Sánchez K. et al. (UIS, IEEE ICIP 2024)** · `Co2Wounds-V2`, dataset
  extendido de heridas crónicas en lepra. Una coinvestigadora codirige este
  trabajo de grado (Karen Sánchez Quiroga · KAUST).

**Vacío investigativo** · no existe aplicación de SSL en el contexto
colombiano para clasificación de lesiones cutáneas. Este proyecto llena ese
vacío adaptando tecnología global a capacidades computacionales locales y
fototipos regionales.

### 1.8 Marco Teórico y Conceptual

**Fundamento clínico**
- Lesiones benignas: nevos melanocíticos, queratosis seborreica.
- Lesiones malignas: melanoma, carcinoma basocelular, carcinoma
  escamocelular.
- El melanoma causa el 80 % de las muertes por cáncer de piel pese a su
  menor proporción de casos.
- Estándares diagnósticos: criterio **ABCDE** + **dermatoscopía**.

**Fundamento técnico · Deep Learning**
- **ResNet** · línea base sólida en clasificación de imágenes.
- **Vision Transformers (ViT)** · mecanismos de atención para patrones
  dermatológicos complejos.

**Eje central · Aprendizaje Autosupervisado (SSL)**
- Métodos contrastivos (**SimCLR**) · distinguir representaciones de
  distintas vistas aumentadas de una misma imagen.
- Métodos de destilación (**DINO**) · red estudiante aprende de red maestra
  sin etiquetas ni pares negativos.

### 1.9 Marco Normativo y Consideraciones Éticas

- **Ley 1581 de 2012** · protección de datos personales en Colombia.
- **Ley 1419 de 2010** · marco regulatorio para la telesalud.
- **Marco Ético IA Colombia (2021)** · transparencia algorítmica y
  reducción de sesgos.
- **GDPR europeo** · referente internacional para datos biométricos.
- **Declaración de Helsinki** · ética en investigación médica.

El proyecto usa exclusivamente datasets públicos anonimizados (HAM10000,
ISIC) y declara que es herramienta de apoyo, no sustituto del especialista.

### 1.10 Diseño Metodológico · CRISP-DM 4 fases

**Fase 1 · Análisis y preparación de datos (OE1)**
- Revisar y caracterizar datasets públicos.
- Contrastar la distribución con el perfil epidemiológico de Santander.
- Entregable: caracterización formal + partición estratificada.

**Fase 2 · Diseño del algoritmo SSL (OE2)**
- Seleccionar arquitectura backbone + estrategia SSL.
- Entrenamiento sin etiquetas + fine-tuning con datos etiquetados.
- Entregable: algoritmo SSL con hiperparámetros documentados.

**Fase 3 · Evaluación del desempeño (OE3)**
- Evaluar sobre conjuntos de prueba vs modelos supervisados de referencia.
- Métricas: **AUC-ROC (principal)**, **F1-Score**, exactitud desagregada
  por clase, matrices de confusión. Atención especial a falsos positivos.
- Entregable: informe comparativo.

**Fase 4 · Implementación del prototipo (OE4)**
- Prototipo funcional con carga de imagen → predicción → métricas visibles.
- Entregable: prototipo documentado con manual de uso.

### 1.11 Resultados Esperados y Madurez Tecnológica

- **Técnico** · algoritmo SSL con desempeño comparable o superior a modelos
  supervisados convencionales en escenarios de datos limitados.
- **Comparativo** · informe contra líneas base supervisadas bajo las mismas
  condiciones y arquitectura.
- **Funcional** · prototipo que informa explícitamente las métricas al
  especialista.
- **Madurez** · **TRL 4** validado en laboratorio. TRL 5 como meta de
  extensión natural si hay articulación clínica.

### 1.12 Estado Actual del Proyecto

Actualmente en **Fase 1 (OE1)**. Completado:
- Definición y caracterización del problema clínico regional.
- Revisión exhaustiva de la literatura y consolidación del estado del arte.
- Selección inicial de datasets (HAM10000, ISIC).
- Análisis y caracterización preliminar de los datasets.

Pendiente de Fase 1: ejecución del pipeline de preprocesamiento (Actividad 5).

### 1.13 Referencias Clave del anteproyecto

- Sánchez K., Hinojosa C., Mieles O., Zhao C., Ghanem B. y Arguello H.
  (2024). Co2Wounds-V2 · IEEE ICIP, Abu Dhabi, pp. 69–75.
  [10.1109/ICIP51287.2024.10647641](https://doi.org/10.1109/ICIP51287.2024.10647641)
- Harczos T. et al. (2024). Self-supervised learning strategies for
  dermatological image analysis.
- Huang Y. et al. (2023). Fine-tuning pretrained models for skin lesion
  classification.
- Tschandl P. et al. (2018). HAM10000 dataset · Scientific Data.
- ISIC Archive · https://www.isic-archive.com

---

## 2 · EPIDEMIOLOGÍA SANTANDER · DATASETS · PROPUESTA REFINADA (Fuente B)

### 2.1 Carcinoma basocelular en el AMB · Uribe et al. 2018

> "El cáncer de piel no melanoma, y en particular el carcinoma basocelular
> (CBC), es la neoplasia cutánea con mayor incidencia documentada en el
> área metropolitana de Bucaramanga."

| Atributo | Valor |
|---|---|
| Diseño | Observacional retrospectivo de corte transversal |
| Muestra | **1.669 pacientes** con diagnóstico confirmado |
| Edad media | 68,2 años |
| Distribución por sexo | 54,5 % mujeres · 45,5 % hombres |
| Grupo etario predominante | 70-79 años (26,6 %) |
| **Tasa estandarizada por edad** | **124,2 / 100.000 personas-año** (133 hombres · 118,2 mujeres) |
| Localización anatómica | cara y cuello en **86,8 %** |
| Variantes histológicas frecuentes | sólida y mixta |
| Tendencia 2000–2014 | ascendente, con casos atípicos en hombres < 40 años |

**Cita** · Uribe CJ et al. (2018). Rev Asoc Colomb Dermatol Cir Dermatol.
26(1).

### 2.2 Carga institucional HIC / FCV · Bucaramanga 2016–2023

- Total de diagnósticos oncológicos (2016-2023) · **19.764 casos**.
- Cáncer de piel diagnosticado (excluido melanoma) · **3.060 casos**.
- Proporción del cáncer de piel sobre el total · **15 %**.
- Año pico · **2021**.
- Vocera técnica · Dra. María Alejandra Rodríguez Flórez (HIC).

**Grupos de riesgo** · adultos mayores con exposición UV laboral acumulada
(agricultores, conductores, construcción), adultos jóvenes con exposición
recreativa, usuarios de cámaras de bronceado.

**Recomendaciones HIC** · evitar exposición solar 9:00–15:00, FPS 50+ con
reaplicación cada 4 horas en exteriores.

### 2.3 Contexto nacional · cifras 2025

- Casos nuevos de melanoma en 2019 · **5.255** (en 22 M de asegurados).
- Melanoma in situ · 45 %. Melanoma invasivo · **54 %**. Mujeres · 60 %.
- Variabilidad regional · 0,6–53 casos / 100.000 hab. según departamento.
- "Santander, con altitudes hasta 3.000 m s. n. m., presenta exposición UV
  elevada."
- Registros poblacionales nacionales · 4 (Cali, Pasto, Bucaramanga,
  Manizales).

### 2.4 Leishmaniasis cutánea · brote 2025 Landázuri

- Período · 21 primeras semanas epidemiológicas de 2025.
- Casos notificados al SIVIGILA · **114 confirmados**.
- Incremento · **+338 %** vs 2024 · **+776 %** vs 2019.
- Distribución · 63,9 % hombres · mediana de edad 20 años.
- Hipótesis etiológica · factores sociales, económicos y ambientales
  (deforestación, minería informal, desplazamiento rural).
- Tendencia nacional (década) · −5,8 % anual.

### 2.5 Patologías inflamatorias y crónicas

**Dermatitis atópica** · GPC nacional 2024 (Asocolderma, única en
Latinoamérica). Integra terapias biológicas (dupilumab, crisaborole) e
inhibidores Janus (abrocitinib, upadacitinib, baricitinib). Encuesta a 68
dermatólogos: 29,3 % diagnostica por presentación clínica únicamente.

**Acné** · UNAB / Foscal · asociación documentada entre acné persistente
en mujeres adultas y síndrome de ovario poliquístico (SOP).

**Hidradenitis supurativa** · Revista Asocolderma vol. 32 n.° 1 (2024).

**Maskné · UDES Cúcuta (2020–2021)** · 67,5 % de estudiantes presentó
alergias por bioseguridad · 45 % desarrolló acné mecánico.

**LRC** (lesiones por cuidados) · alta morbilidad/mortalidad hospitalaria.

### 2.6 Tabla 9.6 · Ranking de prioridad para el modelo SSL

| # | Lesión | Justificación | Prioridad |
|---|--------|--------------|-----------|
| 1 | Carcinoma basocelular | 124,2/100k + 86,8 % cara/cuello — lesión más frecuente | ALTA |
| 2 | Carcinoma escamocelular | Parte del 15 % de cáncer piel HIC | ALTA |
| 3 | Melanoma | 54 % invasivo — alta letalidad si tardío | ALTA |
| 4 | Leishmaniasis ulcerosa | Brote 2025 +338 % — relevancia regional crítica | ALTA |
| 5 | Acné inflamatorio / nodular | Alta consulta en jóvenes · asociación SOP | MEDIA |
| 6 | Dermatitis atópica | Prevalencia general alta · GPC nacional 2024 | MEDIA |
| 7 | Lesiones por presión / LRC | Carga hospitalaria significativa | MEDIA |
| 8 | Hidradenitis supurativa | Crónica, menor frecuencia, alto impacto QoL | BAJA |
| 9 | Maskné / dermatitis perioral | Post-COVID, decreciente | BAJA |

### 2.7 Análisis de factibilidad técnica × datasets públicos

| Lesión (ranking original) | HAM10000 / ISIC / BCN20000 | Alternativas | Factibilidad SSL |
|---|---|---|---|
| Carcinoma basocelular | Sí (`bcc` HAM10000) | ISIC, PAD-UFES-20 | ALTA |
| CEC / actínico | Sí (`akiec` HAM10000) | ISIC, PAD-UFES-20 | ALTA |
| Melanoma | Sí (`mel` HAM10000) | ISIC, PH2 | ALTA |
| Leishmaniasis | NO | Atlas Brasileño OMS, Bossa et al. (datasets <500 imgs) | BAJA |
| Acné | NO en dermatoscópicos | ACNE04, DermNet, Fitzpatrick17k | MEDIA (imagen clínica) |
| Dermatitis atópica | NO | Fitzpatrick17k, DermNet | MEDIA |
| LRC | NO | Datasets clínicos hospitalarios | BAJA |
| Hidradenitis | NO | DermNet (escasa) | BAJA |
| Maskné | NO | Sin dataset etiquetado | NULA |

### 2.8 Propuesta final priorizada (versión refinada de la Tabla 9.6)

| Prioridad | Clase | Origen | Alineación epidemiológica |
|---|---|---|---|
| **CRÍTICA** | Carcinoma basocelular (`bcc`) | HAM10000 | Lesión maligna #1 en Bucaramanga (124,2/100k) |
| **CRÍTICA** | Melanoma (`mel`) | HAM10000 + ISIC | Mayor letalidad nacional · 5.255 casos/año |
| **CRÍTICA** | Queratosis actínica / CEC in situ (`akiec`) | HAM10000 | Precursora CEC · UV elevada en Santander |
| **ALTA** | Nevus melanocítico (`nv`) | HAM10000 | Clase abundante · anclaje para SSL |
| **ALTA** | Queratosis seborreica (`bkl`) | HAM10000 | Diferenciador clave vs CBC en > 60 años |
| **MEDIA** | Lesiones vasculares (`vasc`) | HAM10000 | Diferenciador vs melanoma amelanótico |
| **MEDIA** | Dermatofibroma (`df`) | HAM10000 | Balance de clases benignas |
| **OPCIONAL** | Acné inflamatorio | DermNet / ACNE04 | Si se extiende a imagen clínica |
| **TRABAJO FUTURO** | Leishmaniasis cutánea | Datasets externos curados | Diferenciador contextual Santander |

### 2.9 Justificación técnica de la propuesta refinada

1. **Coherencia con TRL 4** · las 7 clases de HAM10000 son estándar en la
   literatura SSL dermatológica (BYOL, SimCLR, MAE-Derm) → comparación
   directa con benchmarks publicados.
2. **Mitiga R5 (cobertura epidemiológica)** · mantiene CBC, CEC y melanoma
   sin depender de datasets imposibles de conseguir.
3. **Aprovecha la clase masiva `nv` (>6.000 imágenes)** como pretexto
   autosupervisado.
4. **Reduce R2 (desbalance)** · estrategias documentadas (SMOTE, focal
   loss, weighted sampling).
5. **Defendible ante evaluadores** · al usar HAM10000 estándar, el debate
   se centra en la metodología SSL, no en la curación.
6. **Compatible con captura local** · validar las 7 clases con dermatoscopio
   comercial portátil (propuesta Díaz, Camargo y Peña · UIS 2024).
7. **Permite incluir leishmaniasis como narrativa diferenciadora** sin
   comprometer la entrega · documentada como trabajo futuro.

### 2.10 Recomendación final

> "Adoptar las 7 clases del HAM10000 como núcleo del modelo SSL,
> incorporar la leishmaniasis cutánea como caso de extensión documentado
> en trabajo futuro. Esto preserva el rigor epidemiológico santandereano,
> mantiene la factibilidad técnica del TRL 4 y deja abierta la línea de
> investigación sobre transferencia de dominio a lesiones tropicales
> endémicas — eje diferenciador único respecto a los trabajos UIS previos
> (Rueda Rivera 2024, González y Rivera 2022)."

### 2.11 Riesgos del proyecto · 7 riesgos clasificados

| Riesgo | Nivel | Plan de contingencia | Retorno CRISP-DM |
|--------|-------|----------------------|------------------|
| R1 · Desempeño insuficiente del SSL | Alto | Explorar arquitecturas SSL alternativas · modificar aumentación | Fase 3 → Fase 2 |
| R2 · Desbalance severo de clases | Alto | SMOTE / pesos por clase en la pérdida | Fase 2 |
| R3 · Limitaciones de cómputo (GPU/memoria) | Medio | Arquitecturas más ligeras como backbone | Fase 2 |
| R4 · Sesgo de fototipos IV-V | Medio | Documentar como limitación · desempeño desagregado | — |
| R5 · Cobertura clases vs perfil regional | Medio | Combinar datasets compatibles · ajustar inclusión | Fase 1 |
| R6 · Pérdida de trazabilidad experimental | Medio | MLflow / W&B · versionar código con Git | Transversal |
| R7 · Discrepancia laboratorio vs prototipo | Medio | Pruebas con imágenes externas · alinear preprocesamiento | Fase 4 → Fase 3 |

### 2.12 Referencias consolidadas (Fuente B · 19 referencias)

1. Uribe CJ et al. (2018) · Rev Asoc Colomb Dermatol Cir Dermatol 26(1).
2. FCV / HIC (junio 2024) · 15 % cáncer piel HIC.
3. Revista Hospitalaria del Sector Salud · ACHC n.° 64 jun-ago 2025.
4. INC · Cáncer en cifras.
5. Asocolderma · Cáncer de piel en Colombia.
6. Revista Salud UIS · Leishmaniasis cutánea Santander.
7. INS · Boletín Epidemiológico Semanal sem 26/2025.
8. MinSalud · Lineamientos clínicos Leishmaniasis.
9. Asocolderma · GPC Dermatitis atópica 2024.
10. Asocolderma · Encuesta 68 dermatólogos.
11. Revista Biomédica · Epidemiología y recursos dermatitis atópica
    2015-2020.
12. Asocolderma · Prevalencia SOP en mujeres con acné adulto (UNAB/Foscal).
13. Asocolderma · Panorama Colombia dermatología.
14. Asocolderma · Conocimiento comunitario cáncer de piel en Santander.
15. UDES · Lesiones cutáneas por tapabocas Cúcuta 2020-2021.
16. Redalyc · LRC prevalencia Colombia.
17. Dialnet · Hidradenitis supurativa epidemiológica.
18. SciELO · Leishmaniasis cutánea diseminada Santander.
19. SIVIGILA-INS · Sistema de vigilancia.

---

## 3 · EDA NOTEBOOK · CRUZADO HAM10000 / BCN20000 / CO2WOUNDS (Fuente C)

> **Notebook** · `objetivo1_eda_COLAB.ipynb` · semilla 42 · estándar gráfico
> IEEE/Nature Sci. Reports.

### 3.1 HAM10000 · distribución de clases

- Total · **10.015 imágenes** dermatoscópicas
- Resolución uniforme · **600 × 450 px**
- Shannon H = **1,63** / máx 2,81 (eficiencia 58 %) · Gini = **0,64**

| Código | Clase | Count | % | Tipo |
|--------|-------|------:|--:|------|
| `nv` | Nevus melanocítico | 6.705 | 66,95 | Benigna |
| `mel` | Melanoma | 1.113 | 11,11 | Maligna |
| `bkl` | Queratosis benigna | 1.099 | 10,97 | Benigna |
| `bcc` | Carcinoma basocelular | 514 | 5,13 | Maligna |
| `akiec` | Queratosis actínica / CEC in situ | 327 | 3,27 | Precancerosa |
| `vasc` | Lesiones vasculares | 142 | 1,42 | Benigna |
| `df` | Dermatofibroma | 115 | 1,15 | Benigna |

### 3.2 BCN20000 · distribución multinivel

- Total · **18.946 imágenes** dermatoscópicas
- Resolución mediana · **1024 × 1024 px** (heterogénea)
- Shannon H = **2,41** / máx 3,32 · Gini = **0,42**

**Distribución binaria** · Benigno 8.869 (46,8 %) · Maligno 8.869 (46,8 %)
· Indeterminado 1.208 (6,4 %).

**Distribución granular (10 clases)** · Nevus 6.800 · CBC 2.800 · Melanoma
2.700 · Queratosis actínica 1.600 · Queratosis seborreica 1.300 · CEC 900
· Léntigo solar 700 · Lesión vascular 500 · Dermatofibroma 350 ·
Indeterminada 1.208.

### 3.3 CO2Wounds-V2 · dataset local Santander

- **764 imágenes** RGB con segmentación · **96 pacientes** con lepra
  (Hansen).
- Captura · cámara de teléfono celular en campo clínico.
- Localización · Contratación, Santander.
- Tarea · segmentación binaria (mIoU 70,13 · F1 79,44).
- Licencia · CC BY-NC-ND.
- **Autora principal** · Karen Sánchez Quiroga (KAUST) — asesora del
  proyecto de grado.

### 3.4 Cobertura cruzada · 10 patologías × 3 datasets

| Patología | Prioridad | HAM | BCN | CO2 |
|-----------|-----------|:---:|:---:|:---:|
| Carcinoma basocelular | CRÍTICA | ✓ | ✓ | — |
| Carcinoma escamocelular | CRÍTICA | ◐ | ✓ | — |
| Melanoma | CRÍTICA | ✓ | ✓ | — |
| Queratosis seborreica | CRÍTICA | ✓ | ✓ | — |
| Leishmaniasis cutánea | ALTA | — | — | — |
| Acné inflamatorio | MEDIA | — | — | — |
| Dermatitis atópica | MEDIA | — | — | — |
| Lesiones por presión / LRC | MEDIA | — | — | ◐ |
| Heridas crónicas / lepra | FUTURO | — | — | ✓ |
| Hidradenitis supurativa | BAJA | — | — | — |

### 3.5 Comparativa dimensional HAM10000 vs BCN20000

| Métrica | HAM10000 | BCN20000 |
|---|--:|--:|
| Ancho (px) | 600 | 1024 |
| Alto (px) | 450 | 1024 |
| Megapíxeles | 0,27 | 1,05 |
| Tamaño archivo (KB) | 48 | 320 |

### 3.6 Sesgos identificados · matriz 7 × 3

| Sesgo | Descripción | Severidad |
|---|---|---|
| Cobertura | 6 patologías santandereanas ausentes en datasets dermatoscópicos | Alta |
| Adquisición | Dermatoscopia estandarizada vs cámara de celular en campo | Alta |
| Fenotípico | Fototipos I-III europeos predominan en HAM/BCN | Alta |
| Desbalance | Nevus = 67 % de HAM10000 · Gini 0,64 | Medio |
| Resolución | 600×450 uniforme (HAM) vs heterogénea 1024 (BCN) | Medio |
| Geográfico | Datasets europeos vs perfil epidemiológico Santander | Medio |
| Temporal | Imágenes 2018 (HAM) vs realidad clínica 2025 | Bajo |

### 3.7 Síntesis del EDA (sección 6 del notebook)

1. **Cobertura núcleo CRÍTICA confirmada** · las 4 patologías de prioridad
   CRÍTICA están cubiertas por HAM10000 y BCN20000 con clases explícitas y
   volumen suficiente para preentrenamiento autosupervisado.
2. **Brecha local persistente** · ninguna patología parasitaria
   (leishmaniasis cutánea) ni inflamatoria crónica colombiana está cubierta
   por los datasets dermatoscópicos públicos.
3. **Sesgo de adquisición triple** · HAM (600×450 uniforme) y BCN20000
   (heterogéneas >1500) son dermatoscópicos · CO2Wounds-V2 es captura
   clínica con cámara de celular. La comparación dimensional directa entre
   los tres NO es válida.

---

## 4 · DESIGN SYSTEM · Ada Precise Analytical Blueprint (Fuente D)

> Light theme · clean white canvas · balanced geometric typography ·
> functional pops of color.

### 4.1 Paleta de colores · roles funcionales

| Token | Hex | Rol |
|-------|-----|-----|
| `--color-midnight-graphite` | `#0a0b0c` | Texto primario, bordes oscuros, input text |
| `--color-vapor-white` | `#ffffff` | Background de página, cards primarias |
| `--color-cloud-gray` | `#f9f9f9` | Background secundario alternado |
| `--color-concrete-mist` | `#d8d8d8` | Bordes input, divisores sutiles |
| `--color-deep-moss` | `#00543d` | Accent botones · bordes prominentes |
| `--color-sky-blue` | `#abcbf9` | Primary action buttons · highlights |
| `--color-lavender-bloom` | `#ffbbfc` | Bordes de cards categorizadas |
| `--color-goldenrod-glint` | `#fce88b` | Bordes de cards distintivas |
| `--color-dark-plum` | `#392c38` | Decorative background |
| `--color-neutral-green` | `#95b7ae` | Backgrounds muted |
| `--color-pale-magenta` | `#fbe0fa` | Backgrounds muted |
| `--color-dusty-blue` | `#dae7f9` | Backgrounds muted |

### 4.2 Tipografía · Roobert 400 (única)

- Familia única · `'Roobert', system-ui, ...`
- Pesos · **400** (regular)
- Escala · 12 / 14 / 15 / 16 / 18 / 20 / 24 / 32 / 36 / 48 / 60 / 72 px

| Rol | Size | Line height |
|-----|-----:|------------:|
| caption | 12 | 1.56 |
| body | 16 | 1.43 |
| subheading | 24 | 1.33 |
| heading | 36 | 1.25 |
| heading-lg | 48 | 1.11 |
| display | 72 | 1.00 |

### 4.3 Spacing & layout

- **Base unit** · 4 px
- **Spacing scale** · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 36 · 40 · 48 · 72 · 96 · 112 · 120 · 160 · 176
- **Page max-width** · 1280 px
- **Section gap** · 24 px
- **Card padding** · 16 px (default) / 32 px (densidad cómoda)
- **Element gap** · 4 px

### 4.4 Radii

- Cards · **8 px**
- Inputs · **4 px**
- Buttons · **9999 px** (pill — NO usar literal 1.67e+07)
- Navigation · **32 px**

### 4.5 Componentes canónicos

- **Primary Action Button** · Sky Blue bg · Midnight Graphite text · pill ·
  padding 4 vertical / 20 horizontal izq / 4 derecha · Roobert 400.
- **Ghost Navigation Button** · transparente · Midnight Graphite text · pill ·
  sin border · padding 0 vertical / 16 horizontal.
- **Navigation Link Button** · transparente · sin border · sin padding ·
  square corners.
- **Neutral Card** · Vapor White · radius 8 · padding 32 · sin shadow.
- **Bordered Card · Sky Blue / Lavender / Deep Moss / Goldenrod** ·
  transparente · radius 8 · border de color · sin padding · sin shadow.
- **Form Input Field** · transparente · radius 4 · border Concrete Mist ·
  padding 8 vertical / 16 horizontal.
- **Product Feature Card** · transparente con overlay sutil Dark Plum ·
  radius 8 · sin padding · sin shadow.

### 4.6 Reglas (Do / Don't)

**Do**
- Single font Roobert 400 para todo.
- Vapor White default + Cloud Gray para alternar secciones.
- Pill radius 9999 px para botones.
- Limit chromatic colors a highlights funcionales.
- Card padding 32 px (vertical) + 16 px (horizontal interno).
- Card radius 8 px · input radius 4 px.
- Max-width 1280 px centrado.

**Don't**
- No introducir otras fuentes o pesos.
- Evitar shadows decorativos · usar background shifts + bordes sutiles.
- No usar colores saturados como background grande.
- No usar bordes sólidos en inputs · solo Concrete Mist.
- Hero sin gradiente sutil = no permitido.

### 4.7 Surfaces

| Nivel | Nombre | Hex | Propósito |
|---|---|---|---|
| 0 | Vapor White Canvas | `#ffffff` | Base + cards |
| 1 | Cloud Gray Section | `#f9f9f9` | Alternating breaks |
| 2 | Muted Accent Cards | `#95b7ae` | Soft thematic tint |

### 4.8 Imagery

Combina product screenshots + photography candid + iconos outlined
monocromáticos. Funcional, no decorativa. Evitar full-bleed lifestyle.

### 4.9 Layout reference

- Centered, max-width 1280 px.
- Hero · full-bleed background + gradiente sutil + centered text + CTA.
- Section rhythm · alternar Vapor White / Cloud Gray con 24 px vertical.
- Content · vertical stacks + grids 2-3 col para features/stats.
- Sticky top bar con menú + CTA accesible.

### 4.10 Quick color reference (agent prompt)

```
text:           #0a0b0c
background:     #ffffff
border:         #d8d8d8
accent:         #00543d
primary action: #abcbf9 (filled)
```

---

## 5 · CATÁLOGO DE CITAS DISPONIBLES (Fuente E)

> Catálogo en `src/data/citations.ts`. Cada ID se usa así:
> `<Cite refs={['uribe-2018']} tone="paper|navy|white" />`

| ID | Cita corta | Grupo |
|----|-----------|-------|
| `el-frente-2024` | El Frente (2024) | epi |
| `uribe-2018` | Uribe et al. (2018) | epi |
| `cac-2025` | Cuenta de Alto Costo (2025) | epi |
| `ham10000-2018` | Tschandl et al. (2018) | ssl |
| `krishnan-2022` | Krishnan et al. (2022) | ssl |
| `hammimou-2025` | Hammimou et al. (2025) | ssl |
| `ieee-10647641` | Sánchez K. et al. (2024) · CO2Wounds-V2 | ssl |
| `barlow-2024` | Barlow Twins (2024) | ssl |
| `dino-2024` | DINO (2024) | ssl |
| `panderm-2025` | PanDerm (Nature Medicine 2025) | ssl |
| `chaturvedi-2020` | Chaturvedi et al. (2020) | dl |
| `sauter-2023` | Sauter et al. (2023) | dl |
| `pathania-2022` | Pathania et al. (2022) | clinico |
| `yang-2024` | Yang et al. (2024) | ia-salud |
| `minciencias-2021` | MinCiencias (2021) Marco Ético IA | normativa |
| `ley-1581-2012` | Ley 1581 de 2012 · Datos personales | normativa |
| `ley-1419-2010` | Ley 1419 de 2010 · Telesalud | normativa |
| `gdpr-2016` | GDPR · UE 2016 | normativa |
| `helsinki` | Declaración de Helsinki | normativa |

---

## 6 · ESTRUCTURA SUGERIDA · 15 minutos de sustentación

Orden propuesto (la implementación previa lo aplicó):

| § | Sección | Tiempo target | Fuentes |
|---|---------|--------------:|---------|
| 00 | Inicio · Hero | 30 s | — |
| 01 | Introducción | 60 s | A.1, B.1 |
| 02 | Planteamiento del Problema | 90 s | A.2, B.2.1-2.5 |
| 03 | Pregunta de Investigación | 45 s | A.3 |
| 04 | Hipótesis y Supuestos | 45 s | A.3 |
| 05 | Justificación | 60 s | A.4 |
| 06 | Alcance y Delimitación | 45 s | A.6 |
| 07 | Objetivos | 45 s | A.5 |
| 08 | Marco Teórico | 90 s | A.8 |
| 09 | Marco Normativo | 45 s | A.9 |
| 10 | Revisión de Literatura + EDA cruzado | 120 s | A.7, B.2.6-2.10, C |
| 11 | Antecedentes | 60 s | A.7, B.2.7-2.8 |
| 12 | Marco Contextual | 45 s | A.2.2 |
| 13 | Metodología CRISP-DM | 90 s | A.10 |
| 14 | Cronograma | 30 s | — |
| 15 | Avances actuales | 60 s | A.12 |
| 16 | Resultados Esperados | 90 s | A.11, B.12 |
| 17 | Referencias | 15 s | — |

**Total** · ≈ 14 min + 1 min buffer.

---

## 7 · CONTEXTO DEL EQUIPO

- **Universidad** · Universidad Autónoma de Bucaramanga (UNAB).
- **Programa** · Ingeniería de Sistemas.
- **Asignatura** · Proyecto de Grado I · 2026.
- **Sustentación** · 15 minutos.
- **Asesora externa** · Karen Sánchez Quiroga, KAUST (autora principal de
  Co2Wounds-V2 publicado en IEEE ICIP 2024).
- **Vínculo regional** · Hospital Universitario de Santander (HUS) y
  Fundación Cardiovascular de Colombia (HIC) como referentes epidemiológicos.
