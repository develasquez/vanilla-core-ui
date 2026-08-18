const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { PALETTES } = require('./palettes.js');

function generateHtmlPreview() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>M3 Semantic Color Schemes Visualizer — Vanilla-Core UI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Roboto', sans-serif; background-color: #0F1115; color: #E2E2E6; }
    .swatch-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .swatch-card:hover { transform: translateY(-3px); }
  </style>
</head>
<body class="p-6 md:p-10 max-w-7xl mx-auto">
  <header class="mb-8 pb-6 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
          🎨
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Catálogo de los 10 Esquemas Semánticos M3</h1>
      </div>
      <p class="text-sm text-gray-400 mt-1">Previsualización interactiva de tokens, contrastes WCAG AAA y modos de superficie para Vanilla-Core</p>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs px-3 py-1.5 rounded-full bg-blue-950 text-blue-300 font-semibold border border-blue-800/50">100% Offline Compatible</span>
      <span class="text-xs px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800/50">WCAG AAA Certified</span>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    ${PALETTES.map((p, idx) => `
      <div class="swatch-card bg-[#181B20] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-4 h-4 rounded-full shadow-inner" style="background-color: ${p.seed}"></span>
              <h2 class="text-base font-bold text-white">${idx + 1}. ${p.name}</h2>
              <span class="text-xs text-gray-400 font-mono">${p.seed}</span>
            </div>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">${p.family}</span>
          </div>
          
          <p class="text-xs text-gray-400 mb-4">${p.desc}</p>

          <!-- Light Mode Preview -->
          <div class="mb-4 p-3 rounded-xl" style="background-color: ${p.light.surface}; color: ${p.light.onSurface}; border: 1px solid rgba(0,0,0,0.08);">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">☀️ Light Mode (${p.light.surface})</div>
            <div class="flex flex-wrap items-center gap-2">
              <div class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" style="background-color: ${p.light.primary}; color: ${p.light.onPrimary}">
                Primary (${p.light.primary})
              </div>
              <div class="px-3 py-1.5 rounded-lg text-xs font-semibold" style="background-color: ${p.light.primaryContainer}; color: ${p.light.onPrimaryContainer}">
                Container (${p.light.primaryContainer})
              </div>
              <div class="px-2 py-1 rounded-full text-[10px] font-bold" style="background-color: ${p.light.badgeSuccessBg}; color: ${p.light.badgeSuccessText}">
                +14.8% Activo
              </div>
              <div class="px-2 py-1 rounded-full text-[10px] font-bold" style="background-color: ${p.light.badgeErrorBg}; color: ${p.light.badgeErrorText}">
                -3.2% Error
              </div>
            </div>
          </div>

          <!-- Dark Mode Preview -->
          <div class="p-3 rounded-xl" style="background-color: ${p.dark.surface}; color: ${p.dark.onSurface}; border: 1px solid rgba(255,255,255,0.1);">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">🌙 Dark Mode (${p.dark.surface})</div>
            <div class="flex flex-wrap items-center gap-2">
              <div class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" style="background-color: ${p.dark.primary}; color: ${p.dark.onPrimary}">
                Primary (${p.dark.primary})
              </div>
              <div class="px-3 py-1.5 rounded-lg text-xs font-semibold" style="background-color: ${p.dark.primaryContainer}; color: ${p.dark.onPrimaryContainer}">
                Container (${p.dark.primaryContainer})
              </div>
              <div class="px-2 py-1 rounded-full text-[10px] font-bold" style="background-color: ${p.dark.badgeSuccessBg}; color: ${p.dark.badgeSuccessText}">
                +14.8% Activo
              </div>
              <div class="px-2 py-1 rounded-full text-[10px] font-bold" style="background-color: ${p.dark.badgeErrorBg}; color: ${p.dark.badgeErrorText}">
                -3.2% Error
              </div>
            </div>
          </div>
        </div>

        <!-- 3 Surface Modes Footer -->
        <div class="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
          <span>🏛️ Superficies:</span>
          <span class="text-gray-300">1. Tonal (${p.light.surface}) · 2. Blanco (#FFF) · 3. Gris (#F5F5F7)</span>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

function openPreview(port = 4500) {
  const html = generateHtmlPreview();
  const server = http.createServer((req, res) => {
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
    console.log(`\n🎨 Palettes Visualizer running at: ${url}`);
    
    // Auto open in default browser
    const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${startCmd} ${url}`, () => {});
  });
}

module.exports = {
  generateHtmlPreview,
  openPreview
};

if (require.main === module) {
  openPreview();
}
