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

# Style Guide & UI Architecture System: ${p.name}
> Comprehensive Technical Specification (Material Design 3 / Material You + Vanilla-Core Architecture)

---

## 1. Dynamic Tokens & Color System (Core Palette)

The application **must not use hardcoded static colors**, but instead use **Dynamic Semantic Token Mapping** derived from the official Seed Color (\`${p.seed}\`).

### A. Semantic Token Structure

| Semantic Token | Interface Role | Light Mode (${selection.surfaceLabel || 'Tonal'}) | Dark Mode |
| :--- | :--- | :--- | :--- |
| **\`Primary\`** | Active primary button, FABs, accent lines, key indicator icons. | \`${p.light.primary}\` | \`${p.dark.primary}\` |
| **\`On Primary\`** | Text and icons placed on \`Primary\` surfaces. | \`${p.light.onPrimary}\` | \`${p.dark.onPrimary}\` |
| **\`Primary Container\`** | Selected card, extended FAB, selected filter chip/pill. | \`${p.light.primaryContainer}\` | \`${p.dark.primaryContainer}\` |
| **\`On Primary Container\`** | Text and icons inside \`Primary Container\` elements. | \`${p.light.onPrimaryContainer}\` | \`${p.dark.onPrimaryContainer}\` |
| **\`Secondary Container\`** | Active indicator pill in navigation bars (Bottom Nav / Rail). | \`${p.light.secondaryContainer}\` | \`${p.dark.secondaryContainer}\` |
| **\`On Secondary Container\`** | Text and icon of active navigation items. | \`${p.light.onSecondaryContainer}\` | \`${p.dark.onSecondaryContainer}\` |
| **\`Surface\`** | Base canvas background for the application frame. | \`${lightSurface}\` | \`${darkSurface}\` |
| **\`Surface Container Low\`** | Background of fixed sidebars (*Standard Drawer* / subpanels). | \`${lightContainerLow}\` | \`${darkContainerLow}\` |
| **\`Surface Container\`** | Inactive cards, search bar, neutral input fields. | \`${lightContainer}\` | \`${darkContainer}\` |
| **\`Surface Container High\`** | Floating dialogs, overlaid modal drawers, elevated sheets. | \`${lightContainerHigh}\` | \`${darkContainerHigh}\` |
| **\`Surface Container Lowest\`** | Kanban boards, main content cards, data tables. | \`${lightCard}\` | \`${darkCard}\` |
| **\`On Surface\`** | Main headings, primary contact names, high-emphasis text. | \`${p.light.onSurface}\` | \`${p.dark.onSurface}\` |
| **\`On Surface Variant\`** | Dates, secondary subtitles, inactive icons, captions. | \`${p.light.onSurfaceVariant}\` | \`${p.dark.onSurfaceVariant}\` |
| **\`Outline\`** | Input borders, inactive chip outlines, outlined button borders. | \`${p.light.outline}\` | \`${p.dark.outline}\` |
| **\`Outline Variant\`** | Divider lines between list items and panel boundaries. | \`${p.light.outlineVariant}\` | \`${p.dark.outlineVariant}\` |
| **\`Scrim\`** | Backdrop overlay behind modal dialogs and sheets. | \`rgba(0,0,0,0.3)\` | \`rgba(0,0,0,0.6)\` |

### B. Strict Elevation Rule (Flat Depth Architecture)

* **Heavy dark drop shadows (\`box-shadow\`) are strictly prohibited on regular surface cards.**
* Elevation and hierarchy are expressed through tonal luminance steps:
  - **Depth 0 (Canvas):** \`Surface\`
  - **Depth 1 (Flat Content / Lists):** \`Surface Container\`
  - **Depth 2 (Panels / Modales / Menus):** \`Surface Container High\`

---

## 2. Geometry, Border Radius Hierarchy & Typography

### A. Border Radius Hierarchy (\`border-radius\`)

Apply the following radii strictly according to container nesting:

* **Outer Application Frame:** \`28px\` to \`32px\`
* **Modal Drawer Container / Dialog Sheets (\`md-dialog\`):** \`28px\`
* **Floating Basic Dialog:** \`28px\`
* **Primary Content Cards (Message Cards / Kanban Cards):** \`20px\` to \`24px\`
* **Images or Media Attachments inside a Card:** \`16px\` *(Nesting Rule: Child element must always have a smaller radius than parent)*.
* **Form Inputs (\`md-outlined-text-field\` / Outlined Inputs):** \`4px\` to \`8px\`
* **Pills, Action Buttons, Search Bars and User Avatars:** \`9999px\` (*Full Pill*)

### B. Typography Specifications

* **Base Font Family:** Clean modern sans-serif (\`Roboto\`, \`Google Sans\`, or \`system-ui\`).
* **Display / Header (\`App Titles\`):** \`22px\` - \`24px\` | Regular/Medium | Line-height: \`1.2\`
* **Card Titles (\`Names / Subjects / Task Titles\`):** \`16px\` - \`18px\` | Semibold/Bold | Line-height: \`1.3\`
* **Body Text (\`Message Content / Descriptions\`):** \`14px\` - \`15px\` | Regular | Line-height: \`1.45\`
* **Subtext & Metadata (\`Timestamps / Subtitles / Tags\`):** \`12px\` - \`13px\` | Regular | Color: \`On Surface Variant\`
* **WCAG AAA Badges:** \`11px\` | Bold | Line-height: \`1\` | Padding: \`3px 9px\` | Contrast Ratio $\\ge 7:1$

---

## 3. Layout & Responsiveness

The layout utilizes a flexible CSS Grid / Flexbox architecture controlled by canonical breakpoints:

### A. Screen Breakpoints

* **Compact (Mobile):** \`< 600px\`
* **Medium (Tablet / Foldables):** \`600px - 839px\`
* **Expanded (Desktop / Web):** \`≥ 840px\`

### B. Adaptive Component Mapping

| Component | Mobile (\`< 600px\`) | Tablet (\`600px - 839px\`) | Desktop (\`≥ 840px\`) |
| :--- | :--- | :--- | :--- |
| **Main Navigation** | **Bottom Navigation Bar** fixed at bottom (Height: \`80px\`). | **Navigation Rail** narrow vertical left (Width: \`64px - 72px\`). | **Navigation Drawer** full vertical sidebar (Width: \`240px - 280px\`). |
| **Screen Architecture** | **Single Pane Layout**: Full width single column. | **Wide Single Pane**: Centered column with auto margins. | **Dual / 3-Pane Layout**: Side-by-side concurrent panels. |
| **Action Button (FAB)** | **Circular FAB** floating in bottom right corner. | **Circular FAB** placed within the main canvas area. | **Extended FAB** with text in top of navigation panel. |
| **Navigation Modals** | **Modal Drawer** slide-over with \`Scrim\` overlay. | **Standard Drawer** or **Modal Drawer**. | **Standard Drawer** permanent, docked to grid without scrim. |

---

## 4. Key Component Specifications

### A. Search Bar (\`Search Bar\`)

* **Shape:** Full pill (\`border-radius: 9999px\`).
* **Dimensions:** Height \`48px - 56px\`, width \`100%\`.
* **Background:** \`Surface Container\` (\`${lightContainer}\`). Clean borderless surface.
* **Internal Layout:** \`Flexbox row\`, \`align-items: center\`, \`justify-content: space-between\`.
  - *Left:* Search icon (\`On Surface Variant\`) | Left padding: \`16px\`.
  - *Center:* Placeholder text in desaturated tone.
  - *Right:* User avatar circle (\`32px x 32px\`) or filter button | Right padding: \`8px\`.

### B. Content & Message Cards (\`Cards\`)

* **Container:** \`border-radius: 20px - 24px\`, internal padding: \`16px - 20px\`.
* **Normal State:** Background \`Surface Container\` (\`${lightContainer}\`) or \`Surface Container Lowest\` (\`${lightCard}\`).
* **Active / Selected State:** Background \`Primary Container\` (\`${p.light.primaryContainer}\`). Internal text/icons adapt to \`On Primary Container\` (\`${p.light.onPrimaryContainer}\`).
* **Card Header:**
  - Avatar circle (\`40px\`) on left.
  - Information column: Bold title (\`16px\`), date/time beneath (\`12px\`).
  - Action / Favorite badge on top right.

### C. Action Buttons

* **Primary Filled Button (\`md-filled-button\`):** Full pill shape (\`9999px\`), background \`Primary\`, text \`On Primary\` bold.
* **Secondary Outlined Button (\`md-outlined-button\`):** Full pill shape (\`9999px\`), transparent background, \`1px solid Outline\`, text \`Primary\`.
* **Text Button (\`md-text-button\`):** Borderless, background-free, uppercase/semibold \`Primary\` text.

### D. Bottom Navigation Bar (\`Navigation Bar\`)

* **Container:** Height \`80px\`, background \`Surface Container Low\` (\`${lightContainerLow}\`).
* **Stacked Variant (Mobile Default):** Centered vertical column: Active indicator pill on top (\`64px x 32px\`, \`Secondary Container\`), label beneath (\`12px\`).
* **Inline Variant (Horizontal):** Extended pill enclosing icon and label in a single row with \`border-radius: 9999px\`.

---

## 5. UI Execution Scenarios

### Scenario 1: Mobile Feed / Single Pane
1. **Header:** Pill-shaped \`Search Bar\` on top.
2. **Body:** Vertically stacked content \`Cards\` with \`gap: 12px\`.
3. **Floating Action:** Circular \`FAB\` (\`56px x 56px\`, \`border-radius: 16px\`) positioned \`16px\` from bottom corner.
4. **Footer:** Fixed \`Bottom Navigation Bar\` at screen base.

### Scenario 2: Dialogs & Forms (Modals)
1. **Brief Confirmation:** \`Basic Dialog\` (\`md-dialog\`) centered on screen, \`border-radius: 28px\`, background \`Surface Container High\`, dimmed with 30% \`Scrim\`. Action buttons in bottom right as \`Text Buttons\`.
2. **Complex Form (>3 fields):** \`Full-screen Dialog\` spanning 100% viewport.
   - Top app bar with "X" close icon on left, center title, and "Save" action in \`Primary\` text on right.
   - Inputs in \`Outlined Field\` format with \`1px\` border, \`border-radius: 8px\` and floating notched labels.

### Scenario 3: Desktop Dashboard (3-Pane Layout)
Configure a horizontal \`Flexbox\` grid with 3 distinct areas **without heavy vertical border dividers**:
$$\\text{Full Viewport} = \\text{Panel 1 (Drawer 240px)} + \\text{Panel 2 (List 360px)} + \\text{Panel 3 (Detail flex-1)}$$
1. **Panel 1 - Navigation Sidebar (\`240px\`):** Background \`Surface Container Low\` (\`${lightContainerLow}\`). Header with \`Extended FAB\` ("Compose" or "New Task") in pill shape with \`Primary Container\` background.
2. **Panel 2 - List / Kanban (\`360px\`):** Background \`Surface\` (\`${lightSurface}\`). Hosts the \`Search Bar\` and list items. Active card highlights with \`Primary Container\` (\`${p.light.primaryContainer}\`).
3. **Panel 3 - Detail View (\`flex-1\`):** Background \`Surface Container Lowest\` (\`${lightCard}\`). Rounded container corner (\`24px\`). Renders full detail for the selected item in Panel 2.

---

## 6. Vanilla-Core Architectural Rules
1. **Single Source of Truth (SSoT):** All dynamic state lives exclusively in \`store.js\`.
2. **Surgical Rendering (Anti-Thrashing):** Never overwrite active form containers with destructive \`innerHTML\` while the user is typing.
3. **Pub/Sub Decoupling:** Components publish changes via \`setState()\`, and subscribed renderers perform targeted DOM updates.
`;
}

function generateHtmlPreview() {
  const palettesJson = JSON.stringify(PALETTES);

  return `<!DOCTYPE html>
<html lang="en" class="light">
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
            <h1 class="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Interactive M3 Palette Selector</h1>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Choose your combination to automatically generate <strong class="text-indigo-600 dark:text-indigo-400 font-mono">DESIGN.md</strong></p>
          </div>
        </div>
      </div>

      <!-- Controls & Actions -->
      <div class="flex flex-wrap items-center gap-3">
        
        <!-- Light / Dark Mode Switcher -->
        <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-[#282A2D] rounded-full border border-gray-200 dark:border-gray-700">
          <button id="btn-theme-light" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-transparent text-gray-900 dark:text-gray-400 shadow-sm dark:shadow-none transition-all">
            <span class="material-symbols-outlined text-[16px]">light_mode</span>
            <span>Light</span>
          </button>
          <button id="btn-theme-dark" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-transparent dark:bg-[#381E72] text-gray-600 dark:text-[#EADDFF] transition-all">
            <span class="material-symbols-outlined text-[16px]">dark_mode</span>
            <span>Dark</span>
          </button>
        </div>

        <!-- Surface Mode Selector -->
        <div class="inline-flex items-center p-1 bg-gray-100 dark:bg-[#282A2D] rounded-full border border-gray-200 dark:border-gray-700">
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white transition-all" data-surface="tonal">Tonal M3</button>
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 transition-all" data-surface="white">Pure White</button>
          <button class="surface-btn px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 transition-all" data-surface="gray">Neutral Gray</button>
        </div>

        <!-- Shutdown Button -->
        <button id="btn-shutdown" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 hover:bg-red-200 dark:hover:bg-red-900 transition-colors">
          <span class="material-symbols-outlined text-[16px]">power_settings_new</span>
          <span>Close</span>
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
      'tonal': 'Tonal Color (Default M3)',
      'white': 'Pure White (#FFFFFF)',
      'gray': 'Neutral Grayscale (#F5F5F7)'
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
                  <span>Live M3 Components</span>
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
                    +14.8% Active
                  </span>

                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1"
                        style="background-color: \${tokens.badgeErrorBg}; color: \${tokens.badgeErrorText}">
                    <span class="material-symbols-outlined text-[14px]">error</span>
                    -3.2% Error
                  </span>

                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1"
                        style="background-color: \${tokens.badgeWarningBg}; color: \${tokens.badgeWarningText}">
                    <span class="material-symbols-outlined text-[14px]">warning</span>
                    Alert
                  </span>
                </div>

                <!-- Progress Bar Mockup -->
                <div class="space-y-1.5 pt-1">
                  <div class="flex justify-between text-[11px] font-medium opacity-75">
                    <span>Verified Contrast Ratio</span>
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
                <span>Current canvas: <strong class="font-mono">\${bgSurface}</strong></span>
              </div>

              <!-- Select Button -->
              <button class="btn-select-palette flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer hover:opacity-90"
                      style="background-color: \${tokens.primary}; color: \${tokens.onPrimary}"
                      data-palette-id="\${p.id}"
                      data-palette-name="\${p.name}"
                      data-seed="\${p.seed}">
                <span class="material-symbols-outlined text-[16px]">description</span>
                <span>Generate DESIGN.md with this Palette</span>
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
                <h1 class="text-2xl font-bold mb-2">DESIGN.md Successfully Generated!</h1>
                <div class="bg-white dark:bg-[#1E2023] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 my-4 max-w-md w-full text-left space-y-2.5 shadow-sm text-xs">
                  <div class="flex justify-between">
                    <span class="opacity-60">Semantic Scheme:</span>
                    <strong class="font-bold text-sm">\${paletteName} (\${seed})</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="opacity-60">Background / Surface:</span>
                    <strong>\${surfaceLabels[currentSurface]}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="opacity-60">Default Theme:</span>
                    <strong class="capitalize">\${currentTheme} Mode</strong>
                  </div>
                  <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span class="opacity-60">Design Spec File:</span>
                    <strong class="font-mono text-emerald-600 dark:text-emerald-400">DESIGN.md (Google Stitch Spec)</strong>
                  </div>
                </div>
                <p class="text-xs text-gray-500 max-w-sm">The DESIGN.md file has been created at the root of your project. The server has closed and the AI agent will now proceed with building.</p>
              </div>
            \`;
          } catch (e) {
            console.error('Error sending selection:', e);
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
        document.body.innerHTML = '<div class="min-h-screen flex flex-col items-center justify-center text-center p-6"><div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center mb-4"><span class="material-symbols-outlined text-[32px]">check_circle</span></div><h1 class="text-2xl font-bold mb-2">Server Stopped</h1><p class="text-gray-500 text-sm">The local port has been released successfully. You may close this tab.</p></div>';
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

          console.log('\n✨ [SELECTION RECEIVED FROM BROWSER]');
          console.log('═════════════════════════════════════════════════════════════');
          console.log(` 🎨 Scheme:             ${selection.paletteName} (${selection.seed})`);
          console.log(` 🏛️  Surface Mode:       ${selection.surfaceLabel}`);
          console.log(` ☀️ / 🌙 Initial Theme:  ${selection.theme.toUpperCase()} MODE`);
          console.log(` 📄 Generated File:     DESIGN.md (M3 Architecture & Tokens)`);
          console.log('═════════════════════════════════════════════════════════════\n');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, file: 'DESIGN.md' }));

          // Gracefully close server
          setTimeout(() => {
            server.close(() => {
              console.log('🛑 Preview server closed and port released automatically.');
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
      console.log('\n🛑 Shutdown request received from browser.');
      setTimeout(() => {
        server.close(() => {
          console.log('✅ Port released successfully.\n');
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
    console.log(`\n🎨 M3 Interactive Palette Selector active at: ${url}`);
    console.log(`💡 Click 'Generate DESIGN.md with this Palette' on your preferred scheme.`);
    console.log(`💡 Press Ctrl + C or the 'q' key in this terminal to exit without selecting.\n`);
    
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
          console.log('\n🛑 Stopping server...');
          server.close(() => {
            console.log('✅ Port released successfully. Goodbye!\n');
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
