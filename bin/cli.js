#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isHelp = args.includes('--help') || args.includes('-h');
const isPalettes = args.includes('--palettes') || args.includes('-p');
const isPreview = args.includes('--preview') || args.includes('--html');

if (isPreview) {
  const { openPreview } = require('./preview.js');
  openPreview();
  // Keep process alive for web preview
  return;
}

if (isPalettes) {
  const { showPalette, showAllPalettesSummary } = require('./palettes.js');
  const paletteArg = args.find(a => !a.startsWith('-'));
  if (paletteArg) {
    showPalette(paletteArg);
  } else {
    showAllPalettesSummary();
  }
  process.exit(0);
}

if (isHelp) {
  console.log(`
🚀 Vanilla-Core UI Skill Installer (vanilla-core-ui)

Usage:
  npx vanilla-core-ui             Install skill into local workspace (.agents/skills/vanilla-core-ui)
  npx vanilla-core-ui --global    Install skill globally (~/.gemini/config/skills/vanilla-core-ui)
  npx vanilla-core-ui --palettes  Show Truecolor 24-bit terminal preview of the 10 M3 color palettes
  npx vanilla-core-ui --preview   Open interactive visual HTML palette gallery in your browser
  npx vanilla-core-ui --help      Show help message

AI Agent Slash Commands supported:
  /vanilla-core-ui          Standard Vanilla-Core Architecture (Tailwind + SSoT + PubSub)
  /vanilla-core-ui material Vanilla-Core Architecture with Material Web (M3 Semantic Color Schemes)
`);
  process.exit(0);
}



const sourceDir = path.join(__dirname, '..', 'skills', 'vanilla-core-ui');

let targetDir;
if (isGlobal) {
  targetDir = path.join(os.homedir(), '.gemini', 'config', 'skills', 'vanilla-core-ui');
} else {
  targetDir = path.join(process.cwd(), '.agents', 'skills', 'vanilla-core-ui');
}

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log(`📦 Installing Vanilla-Core UI skill to:\n   ${targetDir}\n`);
  copyRecursive(sourceDir, targetDir);
  console.log('✅ Vanilla-Core UI skill installed successfully!');
  console.log('🤖 Your AI Agent can now discover and use "vanilla-core-ui" and "/vanilla-core-ui material".');
} catch (err) {
  console.error('❌ Error installing Vanilla-Core Skill:', err.message);
  process.exit(1);
}
