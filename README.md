# 🏛️ Vanilla-Core Architect (`vanilla-core-ui`)

[![npm version](https://img.shields.io/npm/v/vanilla-core-ui.svg)](https://www.npmjs.com/package/vanilla-core-ui)
[![license](https://img.shields.io/github/license/develasquez/vanilla-core-ui.svg)](https://github.com/develasquez/vanilla-core-ui/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/develasquez/vanilla-core-ui?style=social)](https://github.com/develasquez/vanilla-core-ui)
[![AI Agent Compatible](https://img.shields.io/badge/AI%20Agent-Antigravity%20%7C%20Claude%20%7C%20Cursor%20%7C%20Gemini-blueviolet)](https://github.com/develasquez/vanilla-core-ui)

**Vanilla-Core Architect** is an **AI Agent Skill & CLI** designed to equip AI coding assistants—including **Google Antigravity**, **Claude**, **Cursor**, and **Gemini**—with a strict, hardened pattern for building, scaling, and maintaining high-performance, zero-framework web applications.

---

## 💡 Why Vanilla-Core?

Modern web development often introduces heavy framework runtimes, virtual DOM overhead, and complex build pipelines. **Vanilla-Core Architecture** provides a lightweight, bulletproof alternative: a modular Vanilla JavaScript pattern built around a Single Source of Truth (SSoT) store, unidirectional Pub/Sub state flow, and surgical DOM updates.

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
   TailwindCSS utilities style elements directly. Collapsible sidebars and panels animate `width` or `flex-basis` with `flex-shrink: 0` and `overflow: hidden` to guarantee zero ghost layout shifts.

6. 🛡️ **Surgical Rendering & Anti-Thrashing (Focus Guard)**  
   Renderers employ surgical DOM updates and **Focus Guards** (`document.activeElement !== input`) so active user typing is never interrupted, blown away, or blurred by re-renders.

7. 📐 **Geometric Consistency**  
   For Canvas/SVG and interactive diagram apps, visual rendering routines and hit-testing click algorithms share exact mathematical functions exported from `utils/geometry.js`.

---

## 📦 Installation & Quick Start

You can install this skill into your local project workspace or globally across your machine using `npx`:

### 1. Workspace Installation (Recommended)
Run this inside your project root directory:

```bash
npx vanilla-core-ui
```

This installs the skill into `.agents/skills/vanilla-core-ui/` where AI agents (like Antigravity) automatically discover and activate it.

### 2. Global Installation
Install the skill globally across all AI workspace sessions on your computer:

```bash
npx vanilla-core-ui --global
```

This copies the skill to `~/.gemini/config/skills/vanilla-core-ui/`.

### 3. Check CLI Options
```bash
npx vanilla-core-ui --help
```

---

## 📂 Standard Directory Blueprint

Applications architected by this skill follow a modular, scalable project layout:

```text
my-vanilla-app/
├── components/                  # Encapsulated, reusable UI components
│   ├── header/
│   │   ├── header.html          # HTML structure
│   │   ├── header.css           # Component-specific styles
│   │   └── header.js            # Logic & event bindings
│   └── sidebar/
│       ├── sidebar.html
│       ├── sidebar.css
│       └── sidebar.js
├── ui/                          # Global renderers & DOM surgical update logic
│   ├── header-renderer.js
│   └── sidebar-renderer.js
├── services/                    # API clients, local storage, auth
├── utils/                       # Pure helper functions & shared geometry
│   └── geometry.js              # Shared math for canvas/SVG calculation
├── dom-elements.js              # Central mapping of app DOM containers
├── index.html                   # App Shell container
├── load.js                      # Async component loader & bootstrapper
├── main.js                      # Application entry point & Pub/Sub wiring
├── server.js                    # Zero-dependency HTTP development server
├── store.js                     # SSoT State Store & Pub/Sub engine
├── style.css                    # Global styles & Tailwind entry point
├── changelog.md                 # Prepend-only history of changes
└── package.json
```

---

## 🤖 How AI Agents Execute This Skill

When an AI pair programmer receives a prompt to create or modify a Vanilla-Core application, `vanilla-core-ui` enforces strict execution rules:

* **Executable Bash Scripts**: Outputs self-contained Bash scripts using `cat << 'EOF'` to generate or modify project files in a single turn.
* **Complete Code Preservation**: Replaces target files with complete, production-ready code. Never uses `// ... rest of code` placeholders that cause lost functionality.
* **Changelog Tracking**: Automatically prepends change summaries to `changelog.md`.
* **Standardized Commit Messages**: Appends clear, semantic git commit messages to every code modification.

---

## ⚡ Development & Testing

Run the built-in zero-dependency development server:

```bash
npm run dev
# 🚀 Vanilla-Core server running at http://localhost:3000
```

Run CLI installer tests:

```bash
npm test
```

---

## 📄 License & Author

* **Author**: [develasquez](https://github.com/develasquez)
* **License**: [MIT](LICENSE)
* **Repository**: [https://github.com/develasquez/vanilla-core-ui](https://github.com/develasquez/vanilla-core-ui)
* **npm Package**: [https://www.npmjs.com/package/vanilla-core-ui](https://www.npmjs.com/package/vanilla-core-ui)
