# Prompt · generar componente "Árbol del problema" para sustentación UNAB

Copia este documento entero en otra IA (ChatGPT, Gemini, Claude Web, Cursor, etc.).
Pídele que produzca un **único componente React** listo para producción que
sustituya a `ProblemTreeFlow.tsx` / `ProblemTreeD3.tsx` con algo objetivamente
mejor. Las 5 implementaciones internas (flow / editorial / ishikawa / radial /
vertical) ya existen y fueron consideradas insuficientes; queremos otra
aproximación distinta.

---

## 1 · Contexto del proyecto

- **Universidad**: Universidad Autónoma de Bucaramanga (UNAB) · Colombia.
- **Programa**: Ingeniería de Sistemas, sustentación 2026.
- **Tesis**: Algoritmo de aprendizaje **autosupervisado** (SSL) para la
  detección de lesiones cutáneas en imágenes dermatológicas aplicado al
  contexto clínico de **Santander**.
- **Autores**: Nicolás Moreno + María Paula Saavedra.
- **Datasets de entrenamiento**: HAM10000, BCN20000, CO2Wounds-V2.
- La página es una sustentación interactiva web (no slides).
- El "Árbol del problema" es una de las piezas centrales de la sección §02
  (planteamiento del problema). Debe verse profesional, académico, premium —
  no infantil, no genérico, no "ppt corporativo".

## 2 · Stack técnico

- **Framework**: Astro 6 islands · React 19 · TypeScript.
- **Estilos**: Tailwind v4 (con `@theme` y CSS variables) + estilos inline en
  React donde sea necesario.
- **Animación**: Framer Motion (`motion`, `useInView`, `useReducedMotion`).
  Está disponible y se usa en todo el proyecto.
- **No** se quieren instalar nuevas dependencias salvo que el resultado sea
  notable. Cualquiera de las siguientes ya está disponible: `framer-motion`,
  `d3` (full), `reactflow`, `gsap`, `lenis`.
- El componente debe ser **client-only** (`'use client'` no aplica en Astro,
  pero se monta vía islands — código React puro está bien).
- Compatible SSR: el primer render debe ser estable (cuidado con
  `Math.random()`, dimensiones de window, etc.).

## 3 · Sistema de diseño "Ada"

```css
/* Tokens disponibles en :root */
--ada-graphite:   #0a0b0c;   /* texto principal, líneas */
--ada-vapor:      #ffffff;   /* fondo claro */
--ada-cloud:      #f9f9f9;   /* fondo sutil de sección */
--ada-mist:       #d8d8d8;   /* bordes finos */
--ada-moss:       #00543d;   /* verde profundo, problema central */
--ada-sky:        #abcbf9;   /* azul claro, causas */
--ada-lavender:   #ffbbfc;   /* magenta claro, consecuencias */
--ada-gold:       #fce88b;   /* acento opcional */
```

Tipografía global: Inter 17px/1.55 + JetBrains Mono para tags/etiquetas
(uppercase + letter-spacing 0.18-0.24em).

Bordes: `border-radius: 8px` por default, pill (9999px) para botones/toggles.
**No** sombras decorativas; sólo sombras funcionales con `drop-shadow` o
`box-shadow` de baja opacidad.

## 4 · Datos canónicos · usa estos exactos

```ts
export const ARBOL_TREE = {
  problemaCentral:
    'En Santander el diagnóstico temprano de lesiones cutáneas depende de un recurso especializado limitado y de modelos de IA supervisada que requieren conjuntos anotados costosos.',
  // Capa C·R (causas raíz)
  causasIndirectas: [
    { label: 'Concentración geográfica de la oferta médica especializada en Bucaramanga.', refs: ['cac-2025'] },
    { label: 'Costo y latencia de la biopsia como prueba confirmatoria.', refs: [] },
    { label: 'Dependencia histórica de modelos supervisados con miles de imágenes anotadas.', refs: ['krishnan-2022'] },
    { label: 'Brecha entre la investigación académica y la práctica clínica regional.', refs: [] },
  ],
  // Capa C·D (causas directas)
  causasDirectas: [
    { label: 'Escasez de dermatólogos en municipios fuera del área metropolitana.', refs: ['cac-2025'] },
    { label: 'Precisión clínica que varía entre 62% y 80% según experiencia.', refs: ['chaturvedi-2020'] },
    { label: 'Requisito de grandes corpus anotados para entrenar IA supervisada.', refs: ['krishnan-2022'] },
    { label: 'Falta de prototipos clínicos adaptados al contexto local.', refs: [] },
  ],
  // Capa K·D (consecuencias directas)
  consecuenciasDirectas: [
    { label: 'Demoras significativas entre la consulta y el diagnóstico definitivo.', refs: [] },
    { label: 'Diagnósticos tardíos especialmente en zonas rurales.', refs: ['cac-2025'] },
    { label: 'Tratamientos más invasivos cuando la lesión avanza.', refs: [] },
    { label: 'Subutilización de imágenes dermatológicas regionales sin etiquetar.', refs: [] },
  ],
  // Capa K·I (consecuencias indirectas)
  consecuenciasIndirectas: [
    { label: 'Incremento de mortalidad por melanoma respecto a otros tipos.', refs: ['cac-2025'] },
    { label: 'Inequidad estructural urbano-rural en salud dermatológica.', refs: [] },
    { label: 'Sobrecarga del sistema hospitalario en remisiones tardías.', refs: ['el-frente-2024'] },
    { label: 'Pérdida de oportunidad para validar IA frugal en Colombia.', refs: [] },
  ],
} as const;
```

Topología canónica de un árbol del problema:
```
  C·I (raíz) → C·D (directa) → ★ PROBLEMA ★ → K·D (directa) → K·I (indirecta)
```
4 elementos por capa, emparejados índice-a-índice (`ci[i]` causa a `cd[i]`,
`kd[i]` causa a `ki[i]`).

## 5 · Componente de citación · ya existe, no lo recrees

```tsx
import Sup from '@/components/ui/Sup';

<Sup n={1} refs={['chaturvedi-2020']} tone="graphite" />
```

Para el panel de detalle:
```ts
import { getCitations } from '@/data/citations';
const cites = getCitations(['chaturvedi-2020']); // [{id, short, full, ...}]
```

## 6 · Requisitos funcionales · obligatorios

- [ ] Visualizar las **5 capas** (C·I, C·D, ★, K·D, K·I) de forma clara.
- [ ] Mostrar `problemaCentral` destacado al centro/foco.
- [ ] Cada nodo es **interactivo**: hover destaca, click abre detalle con
      la(s) cita(s) si tiene `refs`.
- [ ] Hover sobre un nodo **enciende la cadena causal completa** (los 4 nodos
      hermanos del mismo "carril" + el problema central).
- [ ] Animación de entrada escalonada al hacer scroll (Intersection Observer
      o `useInView`).
- [ ] Responsive: en móvil debe degradar a stack vertical sin perder claridad.
- [ ] Respeta `prefers-reduced-motion`.
- [ ] No imprime en consola, no usa `alert`, no usa `document.body` sin
      `useEffect`.

## 7 · Requisitos de diseño · obligatorios

- [ ] No "side-stripe borders" decorativos de >1px (regla impeccable).
- [ ] No gradient-text decorativo.
- [ ] No "glassmorphism" gratuito.
- [ ] No cards idénticas en grid con icon+title+text (cliché SaaS).
- [ ] Tipografía con jerarquía clara, al menos 1.25x entre tamaños.
- [ ] Color: máximo 3 hues más neutrales tintados (causas en sky, problema
      en moss, consecuencias en lavender).
- [ ] El diagrama tiene que sentirse como un **diagrama de investigación**,
      no como una "infografía de marketing".

## 8 · Estética inspiracional · qué SÍ queremos

- Diagramas de Edward Tufte (densidad, claridad, sin chartjunk).
- Whitepapers de Stripe, Linear, Anthropic.
- Editorial style de The Pudding y Reuters Graphics.
- Diagramas conceptuales de Bret Victor / Distill.pub.
- Posibles aproximaciones nuevas que no hemos intentado:
  - **Sankey reverso**: anchos de banda proporcionales a la "carga causal".
  - **Matrix grid**: matriz 4x4 donde filas = causas, columnas =
    consecuencias y celdas = relación.
  - **Force-directed con clusters fijos**: nodos con física suave pero
    posición de capa pinneada.
  - **Stratified ribbon**: 5 carriles horizontales tipo metro plot.
  - **Causal map estilo Kumu**: nodos circulares con relaciones tipográficas.

## 9 · Qué NO funcionó (para que no repitas)

- **`reactflow` Linear-style**: se siente sub-100 líneas, los nodos custom
  con chips no logran densidad académica.
- **`d3-hierarchy` dendrograma puro**: los nodos se salen del viewBox, las
  bezier curves no llevan información, el resultado parece "demo de d3".
- **Cards en grid 4-col idénticas**: cliché SaaS, ya prohibido.

## 10 · Entregable esperado

Un **solo archivo** `.tsx` (`ProblemTreeNew.tsx`) que:

1. Importe `ARBOL_TREE` de `@/data/content`.
2. Importe `getCitations` de `@/data/citations` para el panel de detalle.
3. Use Framer Motion (`motion`, `useInView`, `useReducedMotion`) + SVG puro
   (o `d3-shape` para paths complejos · `d3-sankey` si haces sankey).
4. Exporte un `default` listo para `<ProblemTreeNew />`.
5. Funcione SSR-safe (Astro islands).
6. Esté entre **400 y 800 líneas** (suficiente para ser premium, no inflado).
7. Comente sólo cuando la decisión sea no-obvia (no documentación, no
   "what" — sólo "why").

## 11 · Cómo probaremos el resultado

Lo pegamos en `src/components/ui/ProblemTreeNew.tsx`, lo añadimos a
`ProblemTreeSection` como opción `F`, y comparamos lado a lado contra las 5
existentes. Si supera a las 5 en claridad + densidad + estética, gana.

---

## Texto literal para arrancar la otra IA

> "Necesito un componente React 19 + Framer Motion + SVG puro que renderice un
> **árbol del problema** académico de calidad publicable (no infografía de
> marketing) para una sustentación universitaria. Las 5 implementaciones
> previas (reactflow, d3 dendrogram, ishikawa, sunburst radial, vertical
> stack) fueron rechazadas por no verse suficientemente profesionales.
> Lee el documento anterior completo, propón **una aproximación diferente**
> (sankey ponderado / matrix grid / force-directed con carriles pinneados /
> stratified ribbon / causal map), justifica en 3 líneas por qué tu
> aproximación es superior, y entrega el componente completo listo para
> pegar. Sigue exactamente los datos, tokens y restricciones del documento."
