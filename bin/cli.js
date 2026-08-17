#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isHelp = args.includes('--help') || args.includes('-h');

if (isHelp) {
  console.log(`
🚀 Vanilla-Core Architect Skill Installer (vanilla-core-ui)

Usage:
  npx vanilla-core-ui           Install skill into local workspace (.agents/skills/vanilla-core-architect)
  npx vanilla-core-ui --global  Install skill globally (~/.gemini/config/skills/vanilla-core-architect)
  npx vanilla-core-ui --help    Show help message
`);
  process.exit(0);
}

const sourceDir = path.join(__dirname, '..', 'skills', 'vanilla-core-architect');

let targetDir;
if (isGlobal) {
  targetDir = path.join(os.homedir(), '.gemini', 'config', 'skills', 'vanilla-core-architect');
} else {
  targetDir = path.join(process.cwd(), '.agents', 'skills', 'vanilla-core-architect');
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
  console.log(`📦 Installing Vanilla-Core Architect skill to:\n   ${targetDir}\n`);
  copyRecursive(sourceDir, targetDir);
  console.log('✅ Vanilla-Core Architect skill installed successfully!');
  console.log('🤖 Your AI Agent can now discover and use "vanilla-core-architect".');
} catch (err) {
  console.error('❌ Error installing Vanilla-Core Skill:', err.message);
  process.exit(1);
}
