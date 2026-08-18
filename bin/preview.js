const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { PALETTES } = require('./palettes.js');

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
  
  <div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Top Header -->
    <header class="bg-white dark:bg-[#1E2023] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors duration-200">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/20">
            <span class="material-symbols-outlined text-[24px]">palette</span>
          </div>
          <div>
            <h1 class="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Catálogo de los 10 Esquemas Semánticos M3</h1>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Explorador interactivo de tokens, contrastes WCAG AAA y modos de superficie</p>
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

            <!-- Card Footer -->
            <div class="mt-4 pt-3 border-t flex items-center justify-between text-xs opacity-60"
                 style="border-color: \${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}">
              <span>Hex Primario: <strong class="font-mono">\${tokens.primary}</strong></span>
              <span>Lienzo: <strong class="font-mono">\${bgSurface}</strong></span>
            </div>

          </div>
        \`;
      }).join('');
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
    console.log(`\n🎨 Galería Visual de Paletas M3 activa en: ${url}`);
    console.log(`💡 Para detener el servidor puedes:`);
    console.log(`   1. Presionar Ctrl + C o la tecla 'q' en esta terminal`);
    console.log(`   2. Hacer clic en el botón [🛑 Cerrar Visor] en la página web\n`);
    
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
  openPreview
};

if (require.main === module) {
  openPreview();
}
