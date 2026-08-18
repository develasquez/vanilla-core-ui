const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { PALETTES } = require('./palettes.js');

function generateDesignMd(selection) {
  const p = PALETTES.find(item => item.id === selection.paletteId) || PALETTES[0];
  const isDark = selection.theme === 'dark';
  const surfaceMode = selection.surfaceMode || 'tonal';
  
  let lightSurface = p.light.surface;
  let lightContainerLow = '#F8F5FD';
  let lightContainer = '#EDE8F5';
  let lightContainerHigh = '#FAF8FE';
  let lightCard = '#FFFFFF';

  let darkSurface = p.dark.surface;
  let darkContainerLow = '#1A1C1E';
  let darkContainer = '#1E2023';
  let darkContainerHigh = '#282A2D';
  let darkCard = '#1C1B1F';

  if (surfaceMode === 'white') {
    lightSurface = '#FFFFFF';
    lightContainerLow = '#FAFAFB';
    lightContainer = '#F1F3F5';
    lightContainerHigh = '#FFFFFF';
    lightCard = '#F8F9FA';

    darkSurface = '#0D0E11';
    darkContainerLow = '#141619';
    darkContainer = '#181A1D';
    darkContainerHigh = '#202327';
    darkCard = '#181A1D';
  } else if (surfaceMode === 'gray') {
    lightSurface = '#F5F5F7';
    lightContainerLow = '#ECECF0';
    lightContainer = '#EEEEF0';
    lightContainerHigh = '#FFFFFF';
    lightCard = '#FFFFFF';

    darkSurface = '#121316';
    darkContainerLow = '#18191D';
    darkContainer = '#1E2023';
    darkContainerHigh = '#282A2D';
    darkCard = '#1E2023';
  }

  return `---
name: "${p.name} — Vanilla-Core M3 Architecture & Design System"
version: "1.1.0"
spec: "https://stitch.withgoogle.com/docs/design-md/specification/"
theme:
  default: "${selection.theme || 'light'}"
  palette: "${p.id}"
  surfaceMode: "${surfaceMode}"
colors:
  seed: "${p.seed}"
  family: "${p.family}"
  light:
    primary: "${p.light.primary}"
    onPrimary: "${p.light.onPrimary}"
    primaryContainer: "${p.light.primaryContainer}"
    onPrimaryContainer: "${p.light.onPrimaryContainer}"
    secondaryContainer: "${p.light.secondaryContainer}"
    onSecondaryContainer: "${p.light.onSecondaryContainer}"
    surface: "${lightSurface}"
    surfaceContainerLow: "${lightContainerLow}"
    surfaceContainer: "${lightContainer}"
    surfaceContainerHigh: "${lightContainerHigh}"
    surfaceContainerLowest: "${lightCard}"
    onSurface: "${p.light.onSurface}"
    onSurfaceVariant: "${p.light.onSurfaceVariant}"
    outline: "${p.light.outline}"
    outlineVariant: "${p.light.outlineVariant}"
    scrim: "rgba(0, 0, 0, 0.3)"
    badgeSuccessBg: "${p.light.badgeSuccessBg}"
    badgeSuccessText: "${p.light.badgeSuccessText}"
    badgeErrorBg: "${p.light.badgeErrorBg}"
    badgeErrorText: "${p.light.badgeErrorText}"
    badgeWarningBg: "${p.light.badgeWarningBg}"
    badgeWarningText: "${p.light.badgeWarningText}"
  dark:
    primary: "${p.dark.primary}"
    onPrimary: "${p.dark.onPrimary}"
    primaryContainer: "${p.dark.primaryContainer}"
    onPrimaryContainer: "${p.dark.onPrimaryContainer}"
    secondaryContainer: "${p.dark.secondaryContainer}"
    onSecondaryContainer: "${p.dark.onSecondaryContainer}"
    surface: "${darkSurface}"
    surfaceContainerLow: "${darkContainerLow}"
    surfaceContainer: "${darkContainer}"
    surfaceContainerHigh: "${darkContainerHigh}"
    surfaceContainerLowest: "${darkCard}"
    onSurface: "${p.dark.onSurface}"
    onSurfaceVariant: "${p.dark.onSurfaceVariant}"
    outline: "${p.dark.outline}"
    outlineVariant: "${p.dark.outlineVariant}"
    scrim: "rgba(0, 0, 0, 0.6)"
    badgeSuccessBg: "${p.dark.badgeSuccessBg}"
    badgeSuccessText: "${p.dark.badgeSuccessText}"
    badgeErrorBg: "${p.dark.badgeErrorBg}"
    badgeErrorText: "${p.dark.badgeErrorText}"
    badgeWarningBg: "${p.dark.badgeWarningBg}"
    badgeWarningText: "${p.dark.badgeWarningText}"
typography:
  fontFamily: "Roboto, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  weights:
    regular: 400
    medium: 500
    bold: 700
  scale:
    display: { size: "24px", lineHeight: "1.2", weight: "bold" }
    cardTitle: { size: "16px", lineHeight: "1.3", weight: "semibold" }
    body: { size: "14px", lineHeight: "1.45", weight: "regular" }
    subtext: { size: "12px", lineHeight: "1.3", weight: "regular" }
    badge: { size: "11px", lineHeight: "1", weight: "bold" }
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
rounded:
  appFrame: "28px"
  modalDrawer: "28px"
  dialog: "28px"
  card: "22px"
  innerMedia: "16px"
  input: "8px"
  pill: "9999px"
breakpoints:
  compact: "< 600px"
  medium: "600px - 839px"
  expanded: ">= 840px"
---

# Guía de Estilo y Sistema de Arquitectura UI: ${p.name}
> Especificación Técnica Exhaustiva Material Design 3 (M3 / Material You) + Vanilla-Core

---

## 1. Tokens Dinámicos y Sistema de Color (Core Palette)

El agente **no debe usar colores estáticos en código duro**, sino **Mapeo Dinámico por Roles Semánticos** derivados del Seed Color oficial (\`${p.seed}\`).

### A. Estructura de Tokens Cromáticos

| Token Semántico | Uso en Interfaz | Modo Claro (${selection.surfaceLabel || 'Tonal'}) | Modo Oscuro |
| :--- | :--- | :--- | :--- |
| **\`Primary\`** | Botón primario activo, FABs, líneas de acento e iconos clave. | \`${p.light.primary}\` | \`${p.dark.primary}\` |
| **\`On Primary\`** | Texto e iconos sobre superficie \`Primary\`. | \`${p.light.onPrimary}\` | \`${p.dark.onPrimary}\` |
| **\`Primary Container\`** | Tarjeta seleccionada, FAB extendido, píldora de filtro seleccionada. | \`${p.light.primaryContainer}\` | \`${p.dark.primaryContainer}\` |
| **\`On Primary Container\`** | Texto e iconos dentro de elementos \`Primary Container\`. | \`${p.light.onPrimaryContainer}\` | \`${p.dark.onPrimaryContainer}\` |
| **\`Secondary Container\`** | Píldora indicadora en barras de navegación (Bottom Nav). | \`${p.light.secondaryContainer}\` | \`${p.dark.secondaryContainer}\` |
| **\`On Secondary Container\`** | Texto e icono del ítem activo en la barra de navegación. | \`${p.light.onSecondaryContainer}\` | \`${p.dark.onSecondaryContainer}\` |
| **\`Surface\`** | Lienzo exterior o fondo base del marco de la aplicación. | \`${lightSurface}\` | \`${darkSurface}\` |
| **\`Surface Container Low\`** | Fondo de barras laterales fijas (*Standard Drawer* / Subpaneles). | \`${lightContainerLow}\` | \`${darkContainerLow}\` |
| **\`Surface Container\`** | Tarjetas inactivas, barra de búsqueda, campos neutros. | \`${lightContainer}\` | \`${darkContainer}\` |
| **\`Surface Container High\`** | Modales flotantes, menús *Drawer* superpuestos, tarjetas elevadas. | \`${lightContainerHigh}\` | \`${darkContainerHigh}\` |
| **\`Surface Container Lowest\`** | Tarjetas Kanban, módulos principales de contenido. | \`${lightCard}\` | \`${darkCard}\` |
| **\`On Surface\`** | Titulares principales, nombres de contacto, texto primario. | \`${p.light.onSurface}\` | \`${p.dark.onSurface}\` |
| **\`On Surface Variant\`** | Fechas, texto secundario, iconos inactivos, leyendas. | \`${p.light.onSurfaceVariant}\` | \`${p.dark.onSurfaceVariant}\` |
| **\`Outline\`** | Bordes finos de inputs, chips inactivos, botones *Outlined*. | \`${p.light.outline}\` | \`${p.dark.outline}\` |
| **\`Outline Variant\`** | Líneas divisorias (*Dividers*) entre secciones de listas. | \`${p.light.outlineVariant}\` | \`${p.dark.outlineVariant}\` |
| **\`Scrim\`** | Capa de oscurecimiento tras diálogos o menús modales. | \`rgba(0,0,0,0.3)\` | \`rgba(0,0,0,0.6)\` |

### B. Regla Estricta de Elevación (Flat Depth Architecture)

* **Queda estrictamente prohibido usar sombras oscuras proyectadas (\`box-shadow\`) para tarjetas regulares.**
* La elevación se calcula mediante la luminosidad y tono de la superficie:
  - **Profundidad 0 (Lienzo):** \`Surface\`
  - **Profundidad 1 (Contenido plano / Listas):** \`Surface Container\`
  - **Profundidad 2 (Paneles / Modales / Menús):** \`Surface Container High\`

---

## 2. Geometría, Sistema de Bordes y Tipografía

### A. Jerarquía de Radios de Borde (\`border-radius\`)

El agente debe aplicar rigurosamente las siguientes medidas según la jerarquía de anidación:

* **Marco Exterior de la Aplicación:** \`28px\` a \`32px\`
* **Contenedor Modal / Navigation Drawer Modal:** \`28px\`
* **Diálogo Flotante (Basic Dialog / \`md-dialog\`):** \`28px\`
* **Tarjetas Principales (Message Cards / Media Cards / Kanban Cards):** \`20px\` a \`24px\`
* **Imágenes o Adjuntos dentro de una Tarjeta:** \`16px\` *(Regla de Anidación: El hijo siempre tiene un radio menor que el contenedor padre)*.
* **Campos de Entrada (Outlined Inputs / Forms / \`md-outlined-text-field\`):** \`4px\` a \`8px\`
* **Píldoras, Botones, Barra de Búsqueda y Avatares:** \`9999px\` (*Full Pill*)

### B. Especificaciones Tipográficas

* **Tipografía Base:** Sans-serif moderna y limpia (\`Roboto\`, \`Google Sans\` o \`system-ui\`).
* **Display / Header (\`App Titles\`):** \`22px\` - \`24px\` | Regular/Medium | Line-height: \`1.2\`
* **Card Titles (\`Nombres / Asuntos / Tareas\`):** \`16px\` - \`18px\` | Semibold/Bold | Line-height: \`1.3\`
* **Body Text (\`Cuerpo de Mensajes / Descripciones\`):** \`14px\` - \`15px\` | Regular | Line-height: \`1.45\`
* **Subtext & Metadata (\`Fechas / Subtítulos / Tags\`):** \`12px\` - \`13px\` | Regular | Color: \`On Surface Variant\`
* **Badges WCAG AAA:** \`11px\` | Bold | Line-height: \`1\` | Padding: \`3px 9px\` | Contraste $\\ge 7:1$

---

## 3. Disposición y Adaptabilidad (Layout & Responsiveness)

El diseño de pantalla utiliza un sistema de rejilla flexible (*Flexbox / CSS Grid*) controlado por los breakpoints canónicos:

### A. Breakpoints de Pantalla

* **Compact (Mobile):** \`< 600px\`
* **Medium (Tablet / Foldables):** \`600px - 839px\`
* **Expanded (Desktop / Web):** \`≥ 840px\`

### B. Tabla de Mapeo Adaptable de Layouts

| Componente | Mobile (\`< 600px\`) | Tablet (\`600px - 839px\`) | Desktop (\`≥ 840px\`) |
| :--- | :--- | :--- | :--- |
| **Navegación Principal** | **Bottom Navigation Bar** fija inferior (Alto: \`80px\`). | **Navigation Rail** lateral estrecho izquierdo (Ancho: \`64px - 72px\`). | **Navigation Drawer** lateral extendido (Ancho: \`240px - 280px\`). |
| **Estructura de Pantalla** | **Single Pane Layout**: Una sola columna a pantalla completa. | **Single Pane amplio**: Columna central con márgenes automáticos. | **Dual / 3-Pane Layout**: Paneles concurrentes lado a lado. |
| **Botón de Acción (FAB)** | **FAB Circular** flotante en la esquina inferior derecha. | **FAB Circular** ubicado dentro del área principal. | **Extended FAB** con texto en la parte superior del panel de navegación. |
| **Modales de Navegación** | **Modal Drawer** deslizable que cubre el contenido con \`Scrim\`. | **Standard Drawer** integrado o **Modal Drawer**. | **Standard Drawer** permanente, acoplado al grid sin capa de oscurecimiento. |

---

## 4. Especificación Detallada de Componentes Clave

### A. Barra de Búsqueda (\`Search Bar\`)

* **Forma:** Píldora completa (\`border-radius: 9999px\`).
* **Dimensiones:** Alto \`48px - 56px\`, ancho \`100%\`.
* **Fondo:** \`Surface Container\` (\`${lightContainer}\`). Sin bordes pesados.
* **Layout Interno:** \`Flexbox row\`, \`align-items: center\`, \`justify-content: space-between\`.
  - *Izquierda:* Ícono de búsqueda (\`On Surface Variant\`) | Padding izquierdo: \`16px\`.
  - *Centro:* Texto marcador (*placeholder*) desaturado.
  - *Derecha:* Avatar de usuario circular (\`32px x 32px\`) o botón de filtro | Padding derecho: \`8px\`.

### B. Tarjetas de Mensaje / Contenido (\`Cards\`)

* **Contenedor:** \`border-radius: 20px - 24px\`, padding interno: \`16px - 20px\`.
* **Estado Normal:** Fondo \`Surface Container\` (\`${lightContainer}\`) o \`Surface Container Lowest\` (\`${lightCard}\`).
* **Estado Seleccionado (En foco / Activo):** Fondo \`Primary Container\` (\`${p.light.primaryContainer}\`). Todo el texto e iconos internos pasan a \`On Primary Container\` (\`${p.light.onPrimaryContainer}\`).
* **Header de Tarjeta:**
  - Avatar circular (\`40px\`) a la izquierda.
  - Columna de información: Nombre/Título en negrita (\`16px\`), fecha/hora debajo (\`12px\`).
  - Acción / Badge a la derecha.

### C. Botones de Acción

* **Primary Filled Button (\`md-filled-button\`):** Formato píldora (\`9999px\`), fondo \`Primary\`, texto \`On Primary\` en negrita.
* **Secondary Outlined Button (\`md-outlined-button\`):** Formato píldora (\`9999px\`), fondo transparente, borde \`1px solid Outline\`, texto \`Primary\`.
* **Text Button (\`md-text-button\`):** Sin fondo ni borde, texto \`Primary\` en mayúscula/semibold.

### D. Barra de Navegación Inferior (\`Navigation Bar\`)

* **Contenedor:** Alto \`80px\`, fondo \`Surface Container Low\` (\`${lightContainerLow}\`).
* **Variante Stacked (Móvil Estándar):** Columna vertical centrada: Píldora indicadora arriba (\`64px x 32px\`, \`Secondary Container\`), texto abajo (\`12px\`).
* **Variante Inline (Horizontal):** Píldora extendida que encierra el icono y texto en una fila horizontal con \`border-radius: 9999px\`.

---

## 5. Guía de Ejecución por Escenarios UI

### Escenario 1: Feed / Lista Móvil (Mobile Single Pane)
1. **Header:** \`Search Bar\` en formato píldora en la parte superior.
2. **Body:** Lista de tarjetas (\`Cards\`) apiladas verticalmente con \`gap: 12px\`.
3. **Acción Flotante:** \`FAB\` circular (\`56px x 56px\`, \`border-radius: 16px\`) posicionado a \`16px\` de la esquina inferior.
4. **Footer:** \`Bottom Navigation Bar\` fija en la base de la pantalla.

### Escenario 2: Diálogos y Formularios (Modales)
1. **Confirmación Breve:** \`Basic Dialog\` (\`md-dialog\`) centrado en pantalla, \`border-radius: 28px\`, fondo \`Surface Container High\`, bloqueado con \`Scrim\` al 30%. Botones de acción en la esquina inferior derecha como \`Text Buttons\`.
2. **Formulario Complejo (>3 campos):** \`Full-screen Dialog\` ocupando el 100% de la pantalla.
   - Barra superior con botón "X" a la izquierda, título central y acción "Save" en texto \`Primary\` a la derecha.
   - Inputs en formato \`Outlined Field\` con borde \`1px\`, \`border-radius: 8px\` y etiquetas flotantes (*Notched Outline*).

### Escenario 3: Aplicación de Escritorio / Dashboard (Desktop 3-Pane)
Configurar una cuadrícula \`Flexbox\` horizontal con tres áreas diferenciadas **sin bordes divisores verticales pesados**:
$$\\text{Pantalla Completa} = \\text{Panel 1 (Drawer 240px)} + \\text{Panel 2 (Lista 360px)} + \\text{Panel 3 (Detalle flex-1)}$$
1. **Panel 1 - Menú Lateral (\`240px\`):** Fondo \`Surface Container Low\` (\`${lightContainerLow}\`). Encabezado con \`Extended FAB\` ("Compose" o "Nueva Tarea") en píldora con fondo \`Primary Container\`.
2. **Panel 2 - Lista / Kanban (\`360px\`):** Fondo \`Surface\` (\`${lightSurface}\`). Muestra la \`Search Bar\` e ítems de lista. La tarjeta activa cambia su fondo a \`Primary Container\` (\`${p.light.primaryContainer}\`).
3. **Panel 3 - Lectura / Detalle (\`flex-1\`):** Fondo \`Surface Container Lowest\` (\`${lightCard}\`). Borde redondeado del contenedor de \`24px\`. Despliega el contenido completo del elemento seleccionado en el Panel 2.

---

## 6. Arquitectura Vanilla-Core (Reglas de Implementación)
1. **Single Source of Truth (SSoT):** Todo el estado dinámico reside exclusivamente en \`store.js\`.
2. **Surgical Rendering (Anti-Thrashing):** Prohibido sobreescribir con \`innerHTML\` formularios activos donde el usuario esté escribiendo.
3. **Desacoplamiento Pub/Sub:** Los componentes publican cambios mediante \`setState()\`, y los renderers suscritos actualizan la UI quirúrgicamente.
`;
}

function generateHtmlPreview() {
  const palettesJson = JSON.stringify(PALETTES);

  return `<!DOCTYPE html>
<html lang="es" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>M3 Semantic Color Schemes Visualizer — Vanilla-Core UI</title>
  
  <!-- Fonts & Material Symbols -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>

  <style>
    body {
      font-family: 'Roboto', system-ui, -apple-system, sans-serif;
      transition: background-color 0.25s ease, color 0.25s ease;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .preview-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .preview-card:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body class="bg-[#F8F9FA] dark:bg-[#121316] text-[#1C1B1F] dark:text-[#E6E1E5] min-h-screen p-4 sm:p-6 lg:p-10 transition-colors duration-200 select-none">
  
  <div class="max-w-7xl mx-auto space-y-8" id="main-view">
    
    <!-- Top Header -->
    <header class="bg-white dark:bg-[#1E2023] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors duration-200">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/20">
            <span class="material-symbols-outlined text-[24px]">palette</span>
          </div>
          <div>
            <h1 class="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Selector Interactivo de Paletas M3</h1>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Elige tu combinación y genera automáticamente el archivo <strong class="text-indigo-600 dark:text-indigo-400 font-mono">DESIGN.md</strong></p>
          </div>
        </div>
      </div>

      <!-- Controls & Actions -->
      <div class="flex flex-wrap items-center gap-3">
        
        <!-- Light / Dark Mode Switcher -->
        <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-[#282A2D] rounded-full border border-gray-200 dark:border-gray-700">
          <button id="btn-theme-light" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-transparent text-gray-900 dark:text-gray-400 shadow-sm dark:shadow-none transition-all">
            <span class="material-symbols-outlined text-[16px]">light_mode</span>
            <span>Claro</span>
          </button>
          <button id="btn-theme-dark" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-transparent dark:bg-[#381E72] text-gray-600 dark:text-[#EADDFF] transition-all">
            <span class="material-symbols-outlined text-[16px]">dark_mode</span>
            <span>Oscuro</span>
          </button>
        </div>

        <!-- Surface Mode Selector -->
        <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-[#282A2D] rounded-full border border-gray-200 dark:border-gray-700">
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white transition-all" data-surface="tonal">Tonal M3</button>
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 transition-all" data-surface="white">Blanco Puro</button>
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 transition-all" data-surface="gray">Gris Neutro</button>
        </div>

        <!-- Shutdown Button -->
        <button id="btn-shutdown" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 hover:bg-red-200 dark:hover:bg-red-900 transition-colors">
          <span class="material-symbols-outlined text-[16px]">power_settings_new</span>
          <span>Cerrar Visor</span>
        </button>

      </div>
    </header>

    <!-- Scheme Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="palettes-grid">
      <!-- Injected Dynamically -->
    </div>

  </div>

  <script>
    const palettes = ${palettesJson};
    let currentTheme = 'light';
    let currentSurface = 'tonal';

    const surfaceLabels = {
      'tonal': 'Color Tonal Propio (M3 Default)',
      'white': 'Blanco Puro (#FFFFFF)',
      'gray': 'Escala de Grises / Neutro (#F5F5F7)'
    };

    function getSurfaceColor(p, theme, mode) {
      if (theme === 'dark') {
        if (mode === 'white') return '#0D0E11';
        if (mode === 'gray') return '#121316';
        return p.dark.surface;
      } else {
        if (mode === 'white') return '#FFFFFF';
        if (mode === 'gray') return '#F5F5F7';
        return p.light.surface;
      }
    }

    function getCardBgColor(p, theme, mode) {
      if (theme === 'dark') {
        if (mode === 'white') return '#181A1D';
        if (mode === 'gray') return '#1E2023';
        return '#1C1B1F';
      } else {
        if (mode === 'white') return '#F8F9FA';
        if (mode === 'gray') return '#FFFFFF';
        return '#FFFFFF';
      }
    }

    function renderPalettes() {
      const grid = document.getElementById('palettes-grid');
      const isDark = currentTheme === 'dark';

      grid.innerHTML = palettes.map((p, idx) => {
        const tokens = isDark ? p.dark : p.light;
        const bgSurface = getSurfaceColor(p, currentTheme, currentSurface);
        const cardBg = getCardBgColor(p, currentTheme, currentSurface);
        const onSurface = tokens.onSurface;
        const onSurfaceVariant = tokens.onSurfaceVariant;

        return \`
          <div class="preview-card rounded-3xl p-6 border flex flex-col justify-between shadow-sm"
               style="background-color: \${bgSurface}; color: \${onSurface}; border-color: \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}">
            
            <div>
              <!-- Top Row -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-xl shadow-sm flex-shrink-0" style="background-color: \${tokens.primary}"></span>
                  <div>
                    <h2 class="text-base font-bold leading-none" style="color: \${onSurface}">\${idx + 1}. \${p.name}</h2>
                    <span class="text-xs font-mono opacity-60">\${p.seed}</span>
                  </div>
                </div>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full" style="background-color: \${tokens.secondaryContainer}; color: \${tokens.onSecondaryContainer}">
                  \${p.family}
                </span>
              </div>

              <p class="text-xs opacity-75 mb-5 leading-relaxed">\${p.desc}</p>

              <!-- Interactive Mockup Box -->
              <div class="p-4 rounded-2xl border space-y-4 shadow-sm"
                   style="background-color: \${cardBg}; border-color: \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}">
                
                <div class="flex items-center justify-between text-xs font-bold opacity-60 uppercase tracking-wider">
                  <span>M3 Componentes Reales</span>
                  <span>\${currentTheme.toUpperCase()} MODE</span>
                </div>

                <!-- Buttons & Containers -->
                <div class="flex flex-wrap items-center gap-2.5">
                  <button class="px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-transform active:scale-95"
                          style="background-color: \${tokens.primary}; color: \${tokens.onPrimary}">
                    Primary Button
                  </button>

                  <button class="px-4 py-2 rounded-full text-xs font-bold transition-transform active:scale-95"
                          style="background-color: \${tokens.primaryContainer}; color: \${tokens.onPrimaryContainer}">
                    Primary Container
                  </button>

                  <button class="px-3 py-1.5 rounded-full text-xs font-semibold border"
                          style="border-color: \${tokens.outline}; color: \${tokens.onSurface}">
                    Outlined
                  </button>
                </div>

                <!-- WCAG AAA Badges -->
                <div class="flex flex-wrap items-center gap-2 pt-1">
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1"
                        style="background-color: \${tokens.badgeSuccessBg}; color: \${tokens.badgeSuccessText}">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span>
                    +14.8% Activo
                  </span>

                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1"
                        style="background-color: \${tokens.badgeErrorBg}; color: \${tokens.badgeErrorText}">
                    <span class="material-symbols-outlined text-[14px]">error</span>
                    -3.2% Error
                  </span>

                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1"
                        style="background-color: \${tokens.badgeWarningBg}; color: \${tokens.badgeWarningText}">
                    <span class="material-symbols-outlined text-[14px]">warning</span>
                    Alerta
                  </span>
                </div>

                <!-- Progress Bar Mockup -->
                <div class="space-y-1.5 pt-1">
                  <div class="flex justify-between text-[11px] font-medium opacity-75">
                    <span>Nivel de contraste verificado</span>
                    <span class="font-bold">AAA ( $\\ge 7:1$ )</span>
                  </div>
                  <div class="w-full h-2 rounded-full overflow-hidden" style="background-color: \${tokens.secondaryContainer}">
                    <div class="h-full rounded-full" style="width: 78%; background-color: \${tokens.primary}"></div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Card Selection Action -->
            <div class="mt-5 pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                 style="border-color: \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}">
              <div class="text-xs opacity-75">
                <span>Lienzo actual: <strong class="font-mono">\${bgSurface}</strong></span>
              </div>

              <!-- Select Button -->
              <button class="btn-select-palette flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer hover:opacity-90"
                      style="background-color: \${tokens.primary}; color: \${tokens.onPrimary}"
                      data-palette-id="\${p.id}"
                      data-palette-name="\${p.name}"
                      data-seed="\${p.seed}">
                <span class="material-symbols-outlined text-[16px]">description</span>
                <span>Generar DESIGN.md con esta Paleta</span>
              </button>
            </div>

          </div>
        \`;
      }).join('');

      // Attach Select Listeners
      document.querySelectorAll('.btn-select-palette').forEach(btn => {
        btn.addEventListener('click', async () => {
          const paletteId = btn.getAttribute('data-palette-id');
          const paletteName = btn.getAttribute('data-palette-name');
          const seed = btn.getAttribute('data-seed');

          const payload = {
            paletteId,
            paletteName,
            seed,
            surfaceMode: currentSurface,
            surfaceLabel: surfaceLabels[currentSurface],
            theme: currentTheme
          };

          try {
            await fetch('/select', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            document.body.innerHTML = \`
              <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#F8F9FA] dark:bg-[#121316] text-[#1C1B1F] dark:text-[#E6E1E5]">
                <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-lg">
                  <span class="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h1 class="text-2xl font-bold mb-2">¡DESIGN.md Generado con Éxito!</h1>
                <div class="bg-white dark:bg-[#1E2023] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 my-4 max-w-md w-full text-left space-y-2.5 shadow-sm text-xs">
                  <div class="flex justify-between">
                    <span class="opacity-60">Esquema Semántico:</span>
                    <strong class="font-bold text-sm">\${paletteName} (\${seed})</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="opacity-60">Fondo / Superficie:</span>
                    <strong>\${surfaceLabels[currentSurface]}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="opacity-60">Tema por defecto:</span>
                    <strong class="capitalize">\${currentTheme} Mode</strong>
                  </div>
                  <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span class="opacity-60">Archivo de Diseño:</span>
                    <strong class="font-mono text-emerald-600 dark:text-emerald-400">DESIGN.md (Google Stitch Spec)</strong>
                  </div>
                </div>
                <p class="text-xs text-gray-500 max-w-sm">El archivo DESIGN.md fue creado en la raíz del proyecto. El servidor se ha cerrado y el agente continuará la construcción.</p>
              </div>
            \`;
          } catch (e) {
            console.error('Error enviando selección:', e);
          }
        });
      });
    }

    // Theme Switcher Listeners
    const btnLight = document.getElementById('btn-theme-light');
    const btnDark = document.getElementById('btn-theme-dark');

    btnLight.addEventListener('click', () => {
      currentTheme = 'light';
      document.documentElement.classList.remove('dark');
      btnLight.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
      btnLight.classList.remove('text-gray-400');
      btnDark.classList.remove('bg-[#381E72]', 'text-[#EADDFF]');
      btnDark.classList.add('text-gray-600');
      renderPalettes();
    });

    btnDark.addEventListener('click', () => {
      currentTheme = 'dark';
      document.documentElement.classList.add('dark');
      btnDark.classList.add('bg-[#381E72]', 'text-[#EADDFF]');
      btnDark.classList.remove('text-gray-600');
      btnLight.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
      btnLight.classList.add('text-gray-400');
      renderPalettes();
    });

    // Surface Switcher Listeners
    const surfaceButtons = document.querySelectorAll('.surface-btn');
    surfaceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentSurface = btn.getAttribute('data-surface');
        surfaceButtons.forEach(b => {
          const isAct = b.getAttribute('data-surface') === currentSurface;
          b.classList.toggle('bg-indigo-600', isAct);
          b.classList.toggle('text-white', isAct);
          b.classList.toggle('text-gray-600', !isAct);
        });
        renderPalettes();
      });
    });

    // Shutdown Button Listener
    document.getElementById('btn-shutdown').addEventListener('click', async () => {
      try {
        await fetch('/shutdown');
        document.body.innerHTML = '<div class="min-h-screen flex flex-col items-center justify-center text-center p-6"><div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center mb-4"><span class="material-symbols-outlined text-[32px]">check_circle</span></div><h1 class="text-2xl font-bold mb-2">Servidor Detenido</h1><p class="text-gray-500 text-sm">El puerto local ha sido liberado exitosamente. Ya puedes cerrar esta pestaña.</p></div>';
      } catch (e) {
        window.close();
      }
    });

    // Initial Render
    renderPalettes();
  </script>
</body>
</html>`;
}

function openPreview(port = 4500) {
  const html = generateHtmlPreview();
  const server = http.createServer((req, res) => {
    // 1. Handle Selection from Browser
    if (req.method === 'POST' && req.url === '/select') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const selection = JSON.parse(body);
          
          // Generate DESIGN.md compliant with Google Stitch specification
          const designMdContent = generateDesignMd(selection);
          const designMdPath = path.join(process.cwd(), 'DESIGN.md');
          fs.writeFileSync(designMdPath, designMdContent, 'utf-8');

          console.log('\n✨ [SELECCIÓN RECIBIDA DESDE EL NAVEGADOR]');
          console.log('═════════════════════════════════════════════════════════════');
          console.log(` 🎨 Paleta:             ${selection.paletteName} (${selection.seed})`);
          console.log(` 🏛️  Modo Superficie:    ${selection.surfaceLabel}`);
          console.log(` ☀️ / 🌙 Tema Inicial:  ${selection.theme.toUpperCase()} MODE`);
          console.log(` 📄 Archivo Generado:   DESIGN.md (Guía Técnica & Tokens M3)`);
          console.log('═════════════════════════════════════════════════════════════\n');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, file: 'DESIGN.md' }));

          // Gracefully close server
          setTimeout(() => {
            server.close(() => {
              console.log('🛑 Servidor cerrado y puerto liberado automáticamente tras generar DESIGN.md.');
              process.exit(0);
            });
          }, 600);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid selection payload');
        }
      });
      return;
    }

    // 2. Handle Manual Shutdown
    if (req.url === '/shutdown') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Server shutting down...');
      console.log('\n🛑 Solicitud de cierre recibida desde el navegador.');
      setTimeout(() => {
        server.close(() => {
          console.log('✅ Puerto liberado con éxito.\n');
          process.exit(0);
        });
      }, 300);
      return;
    }

    // 3. Serve Visualizer App
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      openPreview(port + 1);
    } else {
      console.error('Error starting preview server:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n🎨 Selector Visual de Paletas M3 activo en: ${url}`);
    console.log(`💡 Puedes seleccionar tu paleta favorita con un clic para generar tu DESIGN.md.`);
    console.log(`💡 Para detener sin seleccionar presiona Ctrl + C o la tecla 'q'.\n`);
    
    const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${startCmd} ${url}`, () => {});
  });

  if (process.stdin.isTTY) {
    try {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (key) => {
        if (key === '\u0003' || key === 'q' || key === 'Q' || key === '\u001b') {
          console.log('\n🛑 Deteniendo servidor...');
          server.close(() => {
            console.log('✅ Puerto liberado con éxito. ¡Hasta luego!\n');
            process.exit(0);
          });
        }
      });
    } catch (e) {}
  }

  const exitHandler = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGHUP', exitHandler);
}

module.exports = {
  generateHtmlPreview,
  generateDesignMd,
  openPreview
};

if (require.main === module) {
  openPreview();
}
