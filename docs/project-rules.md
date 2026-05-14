# Reglas del proyecto · sustentación SSL Santander

> Reglas **proyecto-específicas** acordadas con Nicolas. Aplican siempre,
> a cada sección, a cada commit. Esta es la fuente de verdad para
> cualquier decisión de diseño, contenido o stack.

---

## 1 · Skills obligatorias · activas SIEMPRE

Antes de mutar cualquier archivo, el set base activo es:

| # | Skill | Etapa |
|---|---|---|
| 1 | `taste-design` | Brief + DESIGN.md antes de tocar código |
| 2 | `impeccable` | Gate de shape/craft/polish/audit · sin shape brief no se muta |
| 3 | `high-end-visual-design` | Bloquea defaults baratos · fuerza fuentes, sombras, motion premium |
| 4 | `frontend-design` | Componentes distintivos · evita boilerplate AI |
| 5 | `tailwind` | Tokens @theme correctos · variants v4 |
| 6 | `motion` + `ui-animation` | Springs naturales · motion with purpose |
| 7 | `vercel-react-best-practices` | React 19 · accesibilidad · perf |
| 8 | `self-critique` + `comprehensive-review` | Anti-complacencia antes de cerrar |

**Set complementario** según contexto:

- `gsap` + `gsap-scrolltrigger` + `gsap-timeline` + `gsap-performance` → scroll-driven storytelling
- `radix-primitives` → overlays accesibles (Dialog, Popover, Tooltip)
- `playwright` → QA visual por sección
- `redesign-existing-projects` → refactor de algo existente
- `nano-banana-pro` → generar imágenes hero / mockups dermatológicos
- `three` + `react-three-fiber` → fondos AI (partículas, embeddings, redes)
- `vercel-react-view-transitions` → transiciones entre secciones
- `million-view-transitions` → view transitions performantes
- `scroll-scrub-canvas` → hero estilo Apple AirPods con scroll
- `shadcn-ui` → componentes base + charts
- `magic-mcp-21st` → componentes generados bajo demanda
- `find-skills` → si no hay capacidad, buscar e integrar nuevas

**Regla** · si al diseñar una sección detecto que falta una capacidad
(p. ej. visualización avanzada), corro `/find-skills` antes de improvisar.

---

## 2 · Reglas duras de contenido

1. **Poco texto, datos con propósito.** No párrafos largos. Cada palabra
   gana su lugar. Síntesis > narrativa.
2. **Todo dato numérico, afirmación clínica/técnica y estadística va con
   superíndice de referencia `[n]`** vinculado al catálogo de
   `src/data/citations.ts`. Si el dato no tiene fuente, no se publica.
3. **Las referencias bibliográficas se conectan dinámicamente** con las
   citas dentro del contenido (click en `[n]` → resalta en bibliografía).
4. **El usuario explora una experiencia interactiva de investigación**, no
   lee un documento estático.
5. **Tono neutral académico estricto · sin adjetivos calificativos.**
   - Prohibido: "innovador", "revolucionario", "increíble", "potente",
     "robusto" (como cualidad), "sorprendente", "elegante", "moderno",
     "premium", "espectacular", "impresionante", "fundamental" (como
     adjetivo enfático), "crítico" sin medida, "urgente" sin medida.
   - Prohibido: "vale la pena", "necesario", "imprescindible",
     "fascinante", "interesante".
   - Permitido: descripción factual + cifras con referencia. Verbos en
     tercera persona o infinitivo. Sustantivos técnicos. Estructura
     "qué/cómo/dónde/cuándo" antes que valorativa.
   - Si una frase tiene un adjetivo que es opinión, se elimina o se
     reemplaza con un dato verificable.

6. **Cada sección tiene un propósito único · no duplicar contenido.**
   El contenido vive en UNA sola sección, no se reparte:

   | Sección | Contenido único |
   |---|---|
   | §01 Introducción | Contexto narrativo + por qué importa · SIN cifras puntuales · SIN viz técnica · SIN datasets · SIN TRL |
   | §02 Problema | Cifras epidemiológicas (11.064, 3.060, 64,82 %, 80 %) + paradoja melanoma · árbol causal |
   | §05 Justificación | Beneficios, alineación con políticas, valor agregado |
   | §06 Alcance | TRL 4, qué incluye, qué delimita |
   | §08 Marco Teórico | SSL, ResNet, ViT, SimCLR, DINO · viz embedding |
   | §10 Revisión Lit | Datasets HAM10000/ISIC/BCN20000 + matriz cobertura |
   | §11 Antecedentes | PanDerm, Co2Wounds, U.Andes |
   | §12 Contexto | UNAB, HUS, asesora KAUST · población objetivo |

   Si un dato encaja en dos secciones, va en la más específica. La
   introducción es solo prosa narrativa.

## 2.bis · Reglas de redacción (Skill: writing-academic-natural)

Aplicar a todos los textos largos (introducciones, justificaciones,
síntesis):

1. **Conectar con el lector desde el inicio** · primera frase
   contextualiza al humano que va a leer.
2. **Explicar por qué el problema importa** sin recurrir a cifras
   puntuales (las cifras viven en su sección).
3. **Justificar la relevancia del proyecto** en términos del aporte
   metodológico o aplicado.
4. **Mostrar el impacto o beneficio** que puede generar de manera
   concreta y verificable.
5. **Dejar claro por qué se aborda el reto** · vínculo con la formación
   y con el contexto.
6. **Tono académico-profesional pero natural**, no robótico ni
   genérico. Evitar:
   - Frases puente vacías ("En primer lugar…", "Cabe destacar…",
     "Es importante mencionar…").
   - Fórmulas marketing ("Bienvenido a…", "Descubre cómo…").
   - Listas de bullets cuando se puede hilar en prosa.
   - Repetir el título dentro del párrafo.
7. **Párrafos cortos (3-5 líneas)** · estructura sujeto-verbo-objeto
   clara, sin oraciones de 4 líneas seguidas.
8. **Extensión típica de introducción** · 2 a 3 párrafos · 80 a 140
   palabras totales.

## 3 · Reglas duras de diseño visual

1. **Design System Ada es ley** (`docs/design-system-ada.md`):
   - Paleta tokens · Vapor White / Midnight Graphite / Sky Blue / Deep
     Moss / Lavender Bloom / Goldenrod Glint
   - **Tipografía única Roobert 400**
   - Radii: cards 8px · inputs 4px · botones **pill 9999px** · nav 32px
   - Max-width 1280px · section gap 24px · card padding 32px
2. **Premium aesthetic moderno** (referencia Awwwards / Apple / Linear /
   Vercel / Notion AI):
   - Smooth scroll
   - Parallax sutil
   - Microinteracciones
   - Scroll reveals
   - Tipografía cinemática
   - Gradientes dinámicos sutiles
   - Glassmorphism puntual
   - 3D ligero
3. **Sin shadows decorativos** — solo background shifts y bordes sutiles.
4. **Sin gradient text** (`background-clip: text`) y sin animaciones
   exageradas. Motion with purpose.
5. **Jerarquía visual clara** — títulos fuertes, bloques compactos,
   separación limpia entre secciones.
6. **Coherencia total** en tipografía, colores, espaciado y componentes.

## 4 · Reglas duras técnicas / responsive

1. **Responsive obligatorio** · pantalla completa, laptops y tablets.
   Diseño mobile-first.
2. **Optimizado para pantalla completa** · que use todo el ancho con
   gracia, no contenido encogido al centro.
3. **Performance es regla** · sin layout thrashing · transforms only ·
   `will-change` selectivo · animaciones a 60fps.
4. **Navegación fluida** · scroll suave (Lenis) · transiciones
   coreografiadas, no saltos.

## 5 · Reglas duras de animación

1. **Motion with purpose** — movimiento suave, elegante, útil, optimizado.
2. **Las animaciones nunca son decorativas únicamente** · aportan
   narrativa visual y comprensión del contenido.
3. **Stack autorizado**:
   - **Framer Motion / motion.dev** (declarativo React)
   - **GSAP + ScrollTrigger + Timeline** (scroll-driven)
   - **Lenis** (smooth scroll)
   - **Three.js / R3F** (fondos AI, partículas, embeddings)
   - **Anime.js** (timelines si aplica)
   - **Web Animations API** (animaciones nativas)
4. **Las transiciones entre secciones se sienten naturales y
   coreografiadas** · no simples cambios de pantalla.
5. **Elementos reactivos a scroll / hover / focus / navegación.**
6. **Microinteracciones** en botones, cards, tabs, componentes
   interactivos para sensación de calidad.
7. **Profundidad visual** · motion blur suave · parallax · capas
   dinámicas cuando aportan valor.

## 6 · Reglas duras de visualización (gráficos)

1. **SVG interactivo en todos los gráficos, diagramas y esquemas.** No
   imágenes estáticas, no PNG, no canvas plano. SVG con eventos.
2. **Diagramas técnicos explorables** · hover/click sobre componentes
   muestra explicaciones contextualizadas.
3. **Timelines animados progresivos** · muestran avance visual.
4. **Métricas y resultados con visualizaciones dinámicas y
   comparativas** · no listas de números.
5. **SVG interactivos explicativos** · animaciones funcionales que
   explican procesos, relaciones o flujos.
6. **Coherencia con el tema médico-tecnológico** · redes neuronales,
   embeddings, flujo de datos, visión computacional, ML — pero
   científico, no decorativo.

## 7 · Inspiración y recursos externos autorizados

Sitios de referencia (premium scientific storytelling):

- **Awwwards** · estética de referencia
- **Apple** · cinematografía de scroll
- **Linear** · UI minimalista de producto
- **Vercel** · landing técnica
- **Notion AI** · onboarding interactivo

Catálogos de componentes/inspo (consultar y adaptar al Design Ada):

- **21st.dev** · https://21st.dev/home — Magic MCP integrado
- **animate-ui.com** · https://animate-ui.com/ — componentes animados
- **reactbits.dev** · https://reactbits.dev/ — bloques React con motion
- **shadcn charts** · https://ui.shadcn.com/charts/area — viz oficiales

**Regla** · cualquier componente que se copie de estos catálogos se
reescribe con tokens Ada (Roobert 400, Vapor White, Sky Blue accent) —
no se importa estética ajena tal cual.

## 8 · Lo que NO se hace

- ❌ Diseños genéricos tipo dashboard básico o slide PowerPoint.
- ❌ Página estática o plana.
- ❌ Animaciones decorativas sin narrativa.
- ❌ Cards genéricas idénticas en grid infinito.
- ❌ Hero-metric template (número grande + label pequeño + stats).
- ❌ Side-stripe borders (`border-left` 4px de color).
- ❌ Gradient text.
- ❌ Glassmorphism como default.
- ❌ Modales como primera opción (usar inline / progresivo primero).
- ❌ Emojis en código o copy (solo si Nicolas pide explícito).
- ❌ Em dashes (`—` o `--`) · usar comas, dos puntos, paréntesis.
- ❌ Más de una familia tipográfica · solo Roobert 400.

## 9 · Workflow por sección

Cada nueva sección sigue este lifecycle (SDD adaptado):

1. **Explore** · leer `docs/context.md` + identificar la sección target
2. **Shape brief** (`/impeccable shape`) · 1 párrafo de qué pasa visual y
   narrativamente · pedir confirmación de Nicolas
3. **Design** · DESIGN.md tokens · referencias 21st / reactbits ·
   propuesta de layout SVG + motion
4. **Spec** · qué datos consume de `content.ts` / `eda.ts` · qué refs usa
   · qué interacciones tiene
5. **Implementación** · React 19 + Tailwind v4 + Framer Motion / GSAP /
   SVG nativo · respeta Design Ada
6. **QA visual** (Playwright) · screenshots multiplataforma
7. **Self-critique + comprehensive-review** · 3 puntos donde podría
   estar peor
8. **Polish** (`/impeccable polish`) · pase final antes de cerrar
9. **Commit + push** solo cuando Nicolas lo pide

---

## 10 · Referencia rápida · cómo escribo cada cifra

Antes:

```jsx
<p>El cáncer de piel afecta al 64,82 % de los casos santandereanos.</p>
```

Ahora:

```jsx
<p>
  El cáncer de piel afecta al{' '}
  <Stat refs={['uribe-2018']}>64,82 %</Stat> de los casos santandereanos.
</p>
```

Donde `Stat` es un componente que renderiza el dato + el superíndice
`[n]` clickeable que abre el popover de cita y al mismo tiempo resalta
la referencia en la sección §17.

---

## 11 · Recordatorios automáticos

Estas reglas se cargan automáticamente:

- Vía `CLAUDE.md` del proyecto (que apunta a este archivo).
- Vía `docs/context.md` (sección de design system).
- En cada sesión, al detectar `cwd` del proyecto, debo leer este archivo
  antes de cualquier mutación de UI.

---

## 12 · Lecciones aprendidas durante esta sesión

Compiladas de feedback directo de Nicolas. Estas reglas TIENEN PRIORIDAD
sobre cualquier otra inferencia.

### 12.1 · No adelantarse a la solución en la introducción

La §01 Introducción es **problema + necesidad**, NO solución. La solución
(SSL, prototipo, datasets) pertenece a §05+ (Justificación, Marco Teórico,
Metodología). En la intro:

- ❌ NO mencionar SSL, aprendizaje autosupervisado, modelo, algoritmo
- ❌ NO mencionar prototipo, TRL, datasets HAM10000/ISIC
- ❌ NO viz técnica (embedding, clusters)
- ❌ NO "propósito del proyecto" como solución
- ✅ SÍ problema clínico (cáncer de piel, supervivencia)
- ✅ SÍ necesidad u origen (doble barrera, dependencia del especialista)
- ✅ SÍ una cifra clave SI está en el párrafo del anteproyecto (ej. 62-80 %)
- ✅ SÍ consecuencia regional sin saltar a la solución

### 12.2 · Fuente única de verdad por sección

Cada sección consume SU párrafo correspondiente del `docs/anteproyecto-raw.txt`.
No inventar, no parafrasear hacia la solución, no adelantar contenido.

| § anteproyecto | § sustentación |
|---|---|
| 1. Introducción | §01 Introducción |
| 2. Planteamiento Problema | §02 Problema |
| 3. Pregunta + Hipótesis | §03 Pregunta · §04 Hipótesis |
| 4. Justificación | §05 Justificación |
| 5. Objetivos | §07 Objetivos |
| 6. Alcance | §06 Alcance |
| 7. Antecedentes | §11 Antecedentes |
| 8. Marco Teórico | §08 Marco Teórico |
| 9. Marco Normativo | §09 Marco Normativo |
| 10. Metodología | §13 Metodología |
| 11. Resultados | §16 Resultados |
| 12. Estado actual | §15 Avances |

### 12.3 · Bugs visuales a evitar (recurrentes)

- **WordReveal con palabras pegadas** · siempre poner el espacio FUERA
  del span clip-path, usando `<Fragment>`. Reproducible si se mete `{' '}`
  dentro del `motion.span` con `display: inline-block; overflow: hidden`.
- **CountUp en 0,0** · cuando `inView` dispara después del scroll rápido,
  la animación tarda en arrancar. Considerar `initial={to}` cuando
  `useReducedMotion()` o cuando la duración es corta.
- **Hydration mismatch en SVG** · Math.cos/sin generan strings con
  precisión distinta SSR/CSR. Redondear a 2 decimales:
  `Math.round(v * 100) / 100`.
- **CSS vars en SVG `fill`** · no siempre resuelven en runtime.
  Usar hex directo en atributos SVG, no var(--token).
- **Popover de Cite cortado** · usar React Portal a `document.body` con
  position fixed + cálculo viewport-aware. Nunca `position: absolute`
  dentro del trigger.
- **Doble padding entre secciones** · si la sección global ya tiene
  padding, el wrapper Shell no debe añadir más.

### 12.4 · Alignment / grids consistentes

Cuando hay un grid 2-col arriba y un bloque editorial debajo (regional,
nota, etc), el bloque editorial debe ocupar **el mismo ancho** que el
grid arriba. Layouts asimétricos no se permiten.

- Si el grid tiene `maxWidth: 1280` y `gap: 24`, el bloque debajo va al
  mismo `maxWidth`, mismo padding interno.
- Nunca limitar con `maxWidth: 78ch` si el grid arriba es full container.
- `marginTop` entre bloques relacionados = 24-32 px (no más).

### 12.5 · Skills de redacción · aplicar siempre

Las skills instaladas son obligatorias en cada texto largo:

| Skill | Aplicación |
|---|---|
| `writing-clearly-and-concisely` (Strunk) | Omit needless words · use definite specific concrete language · use active voice · put statements in positive form |
| `academic-writing` | Tono académico-profesional natural |
| `humanize-academic-writing` | Evita frases puente vacías ("Cabe destacar…", "En primer lugar…"), evita robótica |

Antes de cerrar una sección, releer cada párrafo preguntando:
1. ¿Hay palabra que no aporte? → cortar.
2. ¿Hay frase puente? → cortar.
3. ¿Hay adjetivo de opinión? → reemplazar por dato o cortar.
4. ¿Suena natural si lo lees en voz alta? → reescribir si no.
5. ¿Más de 14 palabras en una línea de hero/card? → reescribir.

### 12.6 · Estructura "más gráfico que texto"

Cada sección debe representar la información mayoritariamente con
**recursos visuales antes que con prosa**:

- Iconos SVG conceptuales (no decorativos · cada uno explica algo).
- Cifras grandes tipográficas con superíndice [n].
- Diagramas SVG interactivos con hover.
- Conectores con `pathLength` animado.
- Etiquetas mono-spaced cortas.
- Prosa solo cuando una imagen no transmite el matiz.

Métrica · si una sección tiene más de 3 párrafos seguidos de >40
palabras, hay que rediseñarla.

### 12.7 · Pre-flight check antes de declarar una sección "lista"

Lista de verificación obligatoria · si una falla, no se cierra:

- [ ] El contenido pertenece a esta sección (no se adelanta a otra)
- [ ] Las cifras tienen [n] que apunta a un ID válido de citations.ts
- [ ] No hay adjetivos calificativos ("innovador", "potente", etc.)
- [ ] Los grids están alineados (mismo ancho que su contexto)
- [ ] WordReveal usa Fragment para los espacios
- [ ] Las animaciones tienen propósito narrativo, no decorativo
- [ ] Tipografía Roobert 400 única (sin otras familias)
- [ ] Paleta Ada (Vapor White / Sky Blue / Deep Moss / etc.)
- [ ] Probado con Playwright en viewport 1440×900
- [ ] Self-critique: 3 puntos donde podría estar peor
