# 🏛️ Vanilla-Core Architect (`vanilla-core-ui`)

[![npm version](https://img.shields.io/npm/v/vanilla-core-ui.svg)](https://www.npmjs.com/package/vanilla-core-ui)
[![license](https://img.shields.io/github/license/develasquez/vanilla-core-ui.svg)](https://github.com/develasquez/vanilla-core-ui/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/develasquez/vanilla-core-ui?style=social)](https://github.com/develasquez/vanilla-core-ui)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20Gemini-blueviolet)](https://github.com/develasquez/vanilla-core-ui)

**Vanilla-Core Architect** is an **AI Agent Skill & CLI** designed to equip AI coding assistants—including **Google Antigravity**, **Claude**, **Cursor**, and **Gemini**—with a strict, hardened architectural pattern for building, scaling, and maintaining high-performance, zero-framework web applications.

---

## 💡 Why Vanilla-Core?

Modern web development frequently introduces heavy framework runtimes, complex build pipelines, and virtual DOM reconciliation overhead. **Vanilla-Core Architecture** provides a lightweight, bulletproof alternative: a modular Vanilla JavaScript pattern built around a Single Source of Truth (SSoT) store, unidirectional Pub/Sub state flow, and surgical DOM updates.

### 🌟 Key Capabilities & Architectural Dogmas

Every application built or managed by `vanilla-core-ui` strictly adheres to 7 foundational principles:

1. 🧠 **Single Source of Truth (SSoT)**  
   The application's entire dynamic state lives inside a central `store.js` module. The user interface is always a pure, direct reflection of this state.

2. 🔒 **Read-Only State for Components**  
   Modules outside of `store.js` cannot mutate the state object directly. State modifications occur exclusively via exported `setState()` calls.

3. 📢 **Unidirectional Data Flow (Pub/Sub)**  
   User interactions within components publish state changes via `setState()`. The store then notifies all subscribed renderers to update specific UI regions, keeping components completely decoupled from one another.

4. 🏗️ **Strict Separation of Concerns (SoC)**  
   Code is strictly partitioned by responsibility. UI components reside in dedicated folders (`components/header/`, `components/sidebar/`), each encapsulating markup (`.html`), styles (`.css`), and logic (`.js`).

5. 🎨 **Utility-First Styling & Layout Stability**  
   TailwindCSS utilities style elements directly in HTML. Collapsible sidebars and panels animate `width` or `flex-basis` with `flex-shrink: 0` and `overflow: hidden` to guarantee zero ghost layout shifts.

6. 🛡️ **Surgical Rendering & Anti-Thrashing (Focus Guard)**  
   Renderers employ surgical DOM updates and **Focus Guards** (`document.activeElement !== input`) so active user typing is never interrupted, blown away, or blurred by re-renders.

7. 📐 **Geometric Consistency**  
   For Canvas/SVG and interactive diagram apps, visual rendering routines and hit-testing click algorithms share exact mathematical functions exported from `utils/geometry.js`.

---

## 🎨 Design System Integration: Delegating to `material-design`

Vanilla-Core UI is strictly an **architectural pattern**: it governs reactive state management, component encapsulation, DOM caching, and surgical rendering lifecycles.

When an application requires **Material Design 3 (M3 / Material You)** or **Material Web Components (`@material/web`)**, `vanilla-core-ui` seamlessly integrates with the companion standalone skill [**`material-design-skill`**](https://github.com/develasquez/material-design-skill):

* **AI Slash Command**: `/vanilla-core-ui material` activates both the Vanilla-Core architectural pattern and the [`material-design`](../material-design-skill) design system.
* **100% Decoupled Design Tokens**: HCT semantic color schemes, 3 surface modes, and WCAG AAA compliance are governed independently by `material-design`.
* **Zero-CDN Offline Assets**: Offline fonts (Material Symbols Outlined) and Web Component bundles (`@material/web`) are provided by `material-design/vendor/` and copied to `public/vendor/`.
* **Surgical State Binding**: Vanilla-Core binds event listeners on M3 web components (`<md-filled-button>`, `<md-outlined-text-field>`, `<md-switch>`) and surgically updates properties without destroying host containers or losing cursor focus.

---

## 📦 Installation & Quick Start

You can install this skill into your local project workspace or globally across your machine using `npx`:

### 1. Workspace Installation (Recommended)
Run this inside your project root directory:

```bash
npx vanilla-core-ui
```

This installs the skill into `.agents/skills/vanilla-core-ui/` where AI agents (like Antigravity, Claude, and Cursor) automatically discover and activate it.

### 2. Global Installation
Install the skill globally across all AI workspace sessions on your computer:

```bash
npx vanilla-core-ui --global
```

This installs the skill into `~/.gemini/config/skills/vanilla-core-ui/`.

### 3. Interactive Visual Palette Selector & `DESIGN.md` Generation
Open the live interactive browser gallery to preview palettes, inspect contrast, and generate `DESIGN.md`:

```bash
npx vanilla-core-ui --preview
```

### 4. Terminal Truecolor Palette Preview (24-bit ANSI)
Preview the 10 Material Design 3 semantic color schemes directly in your terminal:

```bash
# Summary table of all 10 schemes
npx vanilla-core-ui --palettes

# Detailed view of a specific scheme
npx vanilla-core-ui --palettes forest-sage
npx vanilla-core-ui --palettes oceanic-slate
```

### 5. CLI Help
```bash
npx vanilla-core-ui --help
```

---

## 📂 Standard Directory Blueprint

Applications architected by this skill follow a modular, scalable project layout:

```text
my-vanilla-app/
├── components/                  # Encapsulated, self-contained UI components
│   ├── header/
│   │   ├── header.html          # Component markup
│   │   ├── header.css           # Component styles (if beyond Tailwind)
│   │   └── header.js            # Component logic & event bindings
│   └── sidebar/
│       ├── sidebar.html
│       ├── sidebar.css
│       └── sidebar.js
├── services/                    # API clients, local storage, auth
├── ui/                          # Global renderers & surgical DOM update logic
│   └── renderer.js              # State subscriber renderers (split if >150 lines)
├── utils/                       # Pure helper functions & geometry
│   └── geometry.js              # MANDATORY shared math for canvas/SVG apps
├── public/                      # Static assets
│   └── vendor/                  # Offline vendor assets (from material-design)
├── dom-elements.js              # Central mapping of GLOBAL DOM containers
├── DESIGN.md                    # Single Source of Truth for Design tokens
├── index.html                   # App Shell container
├── load.js                      # Async component loader & bootstrapper
├── main.js                      # Application orchestrator & Pub/Sub wiring
├── server.js                    # Zero-dependency HTTP development server
├── store.js                     # SSoT State Store & Pub/Sub engine
├── style.css                    # Global styles, Tailwind & Design Tokens entry
├── changelog.md                 # Prepend-only history of changes
└── package.json
```

---

## 🧠 Core Module Blueprints

### `store.js` (SSoT & Pub/Sub)
```javascript
const state = {
  appName: "Vanilla-Core Application",
  theme: "light",
  user: { isLoggedIn: false, name: "Guest" },
  isSidebarVisible: true,
};
const subscribers = [];

export function subscribe(callback) {
  if (typeof callback !== 'function') throw new Error('Subscriber must be a function.');
  subscribers.push(callback);
}

export function setState(newState) {
  Object.assign(state, newState);
  console.log("📢 STATE CHANGE PUBLISHED:", newState);
  subscribers.forEach(callback => callback());
}
export default state;
```

### `dom-elements.js` (Global DOM Element Cache)
```javascript
export const elements = {};

export function initElements() {
  const elementIds = {
    headerContainer: 'header-container',
    mainContentContainer: 'main-content-container',
    sidebarContainer: 'sidebar-container',
  };
  for (const key in elementIds) {
    const el = document.getElementById(elementIds[key]);
    if (!el) console.warn(`Global element '${elementIds[key]}' not found.`);
    elements[key] = el;
  }
}
```

### `ui/renderer.js` (Surgical Rendering)
```javascript
import state from '../store.js';
import { elements } from '../dom-elements.js';

export function renderHeader() {
  if (!elements.headerContainer) return;
  const userNameDisplay = elements.headerContainer.querySelector('#user-name-display');
  if (userNameDisplay && userNameDisplay.textContent !== state.user.name) {
    userNameDisplay.textContent = state.user.name;
  }
}

export function renderSidebar() {
  if (elements.sidebarContainer) {
    elements.sidebarContainer.classList.toggle('hidden', !state.isSidebarVisible);
  }
}
```

### `server.js` (Zero-Dependency Node Dev Server)
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? '404 Not Found' : `Server Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Vanilla-Core server running at http://localhost:${PORT}`);
});
```

---

## 🤖 How AI Agents Execute This Skill

When an AI pair programmer receives a prompt to create or modify a Vanilla-Core application:

1. **Adherence to the 7 Dogmas**: Strictly enforces SSoT, Pub/Sub, surgical rendering, and directory structure.
2. **File Size Evaluation**: If any file exceeds ~150 lines or mixes responsibilities, it proposes and executes a modular split.
3. **Focus Preservation**: Never replaces containers with `innerHTML` if the active element is an input.
4. **Design Delegation**: When the user asks for Material Design 3 or executes `/vanilla-core-ui material`, activates and delegates all design tokens and assets to `material-design`.

---

## ⚡ Development & Testing

Run the built-in development server:

```bash
npm run dev
# 🚀 Vanilla-Core server running at http://localhost:3000
```

Run CLI tests:

```bash
npm test
```

---

## 📄 License & Author

* **Author**: [develasquez](https://github.com/develasquez)
* **License**: [MIT](LICENSE)
* **Repository**: [https://github.com/develasquez/vanilla-core-ui](https://github.com/develasquez/vanilla-core-ui)
* **npm Package**: [https://www.npmjs.com/package/vanilla-core-ui](https://www.npmjs.com/package/vanilla-core-ui)
* **Companion Skill**: [`material-design-skill`](https://github.com/develasquez/material-design-skill)
