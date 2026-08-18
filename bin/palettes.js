#!/usr/bin/env node

/**
 * Material Design 3 — 10 Semantic Color Schemes Visualizer
 * Cross-platform 24-bit Truecolor terminal rendering (macOS, Linux, Windows)
 */

const PALETTES = [
  {
    id: 'forest-sage',
    name: 'Forest Sage',
    family: 'Verdes & Oliva',
    desc: 'Verde Salvia Vibrante (Salud, meditación, sostenibilidad)',
    seed: '#426B29',
    light: {
      primary: '#426B29',
      onPrimary: '#FFFFFF',
      primaryContainer: '#D7E8CD',
      onPrimaryContainer: '#0C2002',
      surface: '#F3F6E8',
      surfaceContainer: '#EAEFE0',
      surfaceContainerHigh: '#FAFDF1',
      onSurface: '#1A1E17',
      outline: '#73796E',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#A1D482',
      onPrimary: '#173800',
      primaryContainer: '#2C5113',
      onPrimaryContainer: '#BCF09C',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'olive-slate',
    name: 'Olive Slate',
    family: 'Verdes & Oliva',
    desc: 'Verde Oliva Desaturado (Agricultura, finanzas éticas, lectura)',
    seed: '#5A641F',
    light: {
      primary: '#5A641F',
      onPrimary: '#FFFFFF',
      primaryContainer: '#DDE895',
      onPrimaryContainer: '#1A1E00',
      surface: '#FBF8F1',
      surfaceContainer: '#F5EEE2',
      surfaceContainerHigh: '#FFFDF9',
      onSurface: '#1E1B16',
      outline: '#79796C',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#C1CC7C',
      onPrimary: '#2C3400',
      primaryContainer: '#434B06',
      onPrimaryContainer: '#DDE895',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'crimson-quartz',
    name: 'Crimson Quartz',
    family: 'Rojos & Terracota',
    desc: 'Rojo Carmesí Intenso (Fitness, alertas, comercio, noticias)',
    seed: '#BB1834',
    light: {
      primary: '#BB1834',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FFDADF',
      onPrimaryContainer: '#410009',
      surface: '#FFF8F7',
      surfaceContainer: '#FFF0EF',
      surfaceContainerHigh: '#FFF9F8',
      onSurface: '#241A1A',
      outline: '#857373',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#FFB3BA',
      onPrimary: '#680014',
      primaryContainer: '#920023',
      onPrimaryContainer: '#FFDADF',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'terracotta-dusk',
    name: 'Terracotta Dusk',
    family: 'Rojos & Terracota',
    desc: 'Rojo Arcilla Orgánico (Redes sociales, eventos, interiorismo)',
    seed: '#A24244',
    light: {
      primary: '#A24244',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FBBBBF',
      onPrimaryContainer: '#421316',
      surface: '#FDF8F7',
      surfaceContainer: '#FFF0EF',
      surfaceContainerHigh: '#FFF8F7',
      onSurface: '#241A1A',
      outline: '#837373',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#FFB3B4',
      onPrimary: '#630F16',
      primaryContainer: '#832A2D',
      onPrimaryContainer: '#FFDAD9',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'lavender-breeze',
    name: 'Lavender Breeze',
    family: 'Púrpuras & Violetas',
    desc: 'Púrpura Semántico Clásico (Email, suites de productividad, dashboards)',
    seed: '#6750A4',
    light: {
      primary: '#6750A4',
      onPrimary: '#FFFFFF',
      primaryContainer: '#C8B6FF',
      onPrimaryContainer: '#28164D',
      surface: '#E5E2F3',
      surfaceContainer: '#F1EEF8',
      surfaceContainerHigh: '#FAF8FE',
      onSurface: '#1D192B',
      outline: '#79747E',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#D0BCFF',
      onPrimary: '#381E72',
      primaryContainer: '#4F378B',
      onPrimaryContainer: '#EADDFF',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'orchid-velvet',
    name: 'Orchid Velvet',
    family: 'Púrpuras & Violetas',
    desc: 'Púrpura Orquídea Floral (Apps creativas, bienestar, belleza)',
    seed: '#8E4A8D',
    light: {
      primary: '#8E4A8D',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FFD7F7',
      onPrimaryContainer: '#360538',
      surface: '#FEF6FA',
      surfaceContainer: '#FFF1F8',
      surfaceContainerHigh: '#FFF9FC',
      onSurface: '#201A1E',
      outline: '#82737D',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#FFAEF5',
      onPrimary: '#551956',
      primaryContainer: '#723271',
      onPrimaryContainer: '#FFD7F7',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'oceanic-slate',
    name: 'Oceanic Slate',
    family: 'Azules & Turquesas',
    desc: 'Azul Pizarra Frío (Finanzas, analítica de datos, gestión corporativa)',
    seed: '#2B638B',
    light: {
      primary: '#2B638B',
      onPrimary: '#FFFFFF',
      primaryContainer: '#CDE5F7',
      onPrimaryContainer: '#001E30',
      surface: '#F4F7FA',
      surfaceContainer: '#E9EEF4',
      surfaceContainerHigh: '#F8FAFC',
      onSurface: '#181C20',
      outline: '#71787E',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#96CCF8',
      onPrimary: '#00344F',
      primaryContainer: '#0C4B6F',
      onPrimaryContainer: '#CDE5F7',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'aqua-frost',
    name: 'Aqua Frost',
    family: 'Azules & Turquesas',
    desc: 'Turquesa Gélido Clínico (Telemedicina, clima, monitorización)',
    seed: '#006874',
    light: {
      primary: '#006874',
      onPrimary: '#FFFFFF',
      primaryContainer: '#97F0FF',
      onPrimaryContainer: '#001F24',
      surface: '#F3F6F8',
      surfaceContainer: '#EAEFE2',
      surfaceContainerHigh: '#F9FCFC',
      onSurface: '#191C1D',
      outline: '#70797B',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#4FD8EB',
      onPrimary: '#00363D',
      primaryContainer: '#004F58',
      onPrimaryContainer: '#97F0FF',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'golden-amber',
    name: 'Golden Amber',
    family: 'Orgánicos & Ámbar',
    desc: 'Dorado Miel Luminoso (Notas, recetas, interfaces artesanales)',
    seed: '#7A5900',
    light: {
      primary: '#7A5900',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FFDF9E',
      onPrimaryContainer: '#261A00',
      surface: '#FBF8F1',
      surfaceContainer: '#F5EEE2',
      surfaceContainerHigh: '#FFFDF9',
      onSurface: '#1E1B16',
      outline: '#807567',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#F6BD48',
      onPrimary: '#412D00',
      primaryContainer: '#5C4300',
      onPrimaryContainer: '#FFDF9E',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  },
  {
    id: 'desert-bloom',
    name: 'Desert Bloom',
    family: 'Orgánicos & Ámbar',
    desc: 'Naranja Tierra Siena (Gastronomía, artesanía, rústico, viajes)',
    seed: '#85511A',
    light: {
      primary: '#85511A',
      onPrimary: '#FFFFFF',
      primaryContainer: '#FFDCC3',
      onPrimaryContainer: '#2C1500',
      surface: '#FFF9F6',
      surfaceContainer: '#FFF1EA',
      surfaceContainerHigh: '#FFF9F7',
      onSurface: '#201A16',
      outline: '#837367',
      badgeSuccessBg: '#D7E8CD',
      badgeSuccessText: '#0A3E10',
      badgeErrorBg: '#FFDAD6',
      badgeErrorText: '#410002',
    },
    dark: {
      primary: '#FFB77B',
      onPrimary: '#4C2700',
      primaryContainer: '#683B02',
      onPrimaryContainer: '#FFDCC3',
      surface: '#121316',
      surfaceContainer: '#1E2023',
      surfaceContainerHigh: '#282A2D',
      onSurface: '#E2E2E6',
      outline: '#8E9099',
      badgeSuccessBg: '#233827',
      badgeSuccessText: '#B9F6CA',
      badgeErrorBg: '#3F2023',
      badgeErrorText: '#FFCDD2',
    }
  }
];

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function swatch(bgHex, fgHex, text) {
  const [br, bgVal, bb] = hexToRgb(bgHex);
  const [fr, fgVal, fb] = hexToRgb(fgHex);
  return `\x1b[48;2;${br};${bgVal};${bb}m\x1b[38;2;${fr};${fgVal};${fb}m ${text} \x1b[0m`;
}

function dot(hex) {
  const [r, g, b] = hexToRgb(hex);
  return `\x1b[38;2;${r};${g};${b}m●\x1b[0m`;
}

function showPalette(themeId) {
  const palette = PALETTES.find(p => p.id === themeId || p.name.toLowerCase() === (themeId || '').toLowerCase());
  if (!palette) {
    console.error(`❌ Paleta '${themeId}' no encontrada.`);
    showAllPalettesSummary();
    return;
  }

  console.log('\n' + '═'.repeat(74));
  console.log(`  🎨 ESQUEMA SELECCIONADO: ${palette.name.toUpperCase()} (${palette.seed})`);
  console.log(`  Familia: ${palette.family} | ${palette.desc}`);
  console.log('═'.repeat(74));

  // Render Light Mode
  console.log('\n  ☀️  [ LIGHT MODE ]');
  console.log('  ─────────────────────────────────────────────────────────────');
  console.log(`  Superficie Base:      ${swatch(palette.light.surface, palette.light.onSurface, ' Surface Base Canvas ')}  ${palette.light.surface}`);
  console.log(`  Tarjeta Contenedor:   ${swatch(palette.light.surfaceContainer, palette.light.onSurface, ' Card Surface Container ')}  ${palette.light.surfaceContainer}`);
  console.log(`  Botón Primario:       ${swatch(palette.light.primary, palette.light.onPrimary, ' [ Primary Button ] ')}  ${palette.light.primary}`);
  console.log(`  Ítem Activo / FAB:    ${swatch(palette.light.primaryContainer, palette.light.onPrimaryContainer, ' [ Primary Container ] ')}  ${palette.light.primaryContainer}`);
  console.log(`  Badge Éxito (AAA):    ${swatch(palette.light.badgeSuccessBg, palette.light.badgeSuccessText, ' +14.8% Activo ')}  ${swatch(palette.light.badgeErrorBg, palette.light.badgeErrorText, ' -3.2% Error ')}`);

  // Render Dark Mode
  console.log('\n  🌙  [ DARK MODE ]');
  console.log('  ─────────────────────────────────────────────────────────────');
  console.log(`  Superficie Base:      ${swatch(palette.dark.surface, palette.dark.onSurface, ' Surface Base Canvas ')}  ${palette.dark.surface}`);
  console.log(`  Tarjeta Contenedor:   ${swatch(palette.dark.surfaceContainer, palette.dark.onSurface, ' Card Surface Container ')}  ${palette.dark.surfaceContainer}`);
  console.log(`  Botón Primario:       ${swatch(palette.dark.primary, palette.dark.onPrimary, ' [ Primary Button ] ')}  ${palette.dark.primary}`);
  console.log(`  Ítem Activo / FAB:    ${swatch(palette.dark.primaryContainer, palette.dark.onPrimaryContainer, ' [ Primary Container ] ')}  ${palette.dark.primaryContainer}`);
  console.log(`  Badge Éxito (AAA):    ${swatch(palette.dark.badgeSuccessBg, palette.dark.badgeSuccessText, ' +14.8% Activo ')}  ${swatch(palette.dark.badgeErrorBg, palette.dark.badgeErrorText, ' -3.2% Error ')}`);

  // Render Surface Mode Options
  console.log('\n  🏛️  [ 3 MODOS DE FONDO / SUPERFICIE DISPONIBLES ]');
  console.log('  ─────────────────────────────────────────────────────────────');
  console.log(`  1. Color Tonal Propio: ${swatch(palette.light.surface, palette.light.onSurface, ' Fondo Tonal M3 ')} (${palette.light.surface})`);
  console.log(`  2. Blanco Puro:        ${swatch('#FFFFFF', '#1A1A1A', ' Fondo Blanco Puro ')} (#FFFFFF / Tarjetas #F8F9FA)`);
  console.log(`  3. Escala de Grises:   ${swatch('#F5F5F7', '#1A1A1A', ' Fondo Gris Neutro ')} (#F5F5F7 / Tarjetas #EEEEF0)`);
  console.log('═'.repeat(74) + '\n');
}

function showAllPalettesSummary() {
  console.log('\n' + '═'.repeat(74));
  console.log('  🎨 CATÁLOGO DE LOS 10 ESQUEMAS SEMÁNTICOS MATERIAL DESIGN 3');
  console.log('  (Previsualización nativa Truecolor de 24-bits)');
  console.log('═'.repeat(74) + '\n');

  let currentFamily = '';
  PALETTES.forEach((p, idx) => {
    if (p.family !== currentFamily) {
      currentFamily = p.family;
      console.log(`\n  📂 FAMILIA: ${currentFamily.toUpperCase()}`);
      console.log('  ' + '─'.repeat(70));
    }

    const btnLight = swatch(p.light.primary, p.light.onPrimary, 'Primary');
    const containerLight = swatch(p.light.primaryContainer, p.light.onPrimaryContainer, 'Container');
    const surfLight = swatch(p.light.surface, p.light.onSurface, 'Surface');
    const btnDark = swatch(p.dark.primary, p.dark.onPrimary, 'Primary');

    console.log(`  ${dot(p.seed)} ${(idx + 1).toString().padStart(2, ' ')}. ${p.name.padEnd(18, ' ')} [${p.seed}]`);
    console.log(`      Light: ${btnLight} ${containerLight} ${surfLight}  | Dark: ${btnDark}`);
    console.log(`      Uso:   ${p.desc}`);
  });

  console.log('\n' + '═'.repeat(74));
  console.log('  💡 Para inspeccionar una paleta en detalle con Light/Dark mode:');
  console.log('     npx vanilla-core-ui --palettes <nombre-o-id>');
  console.log('     Ejemplo: npx vanilla-core-ui --palettes forest-sage');
  console.log('═'.repeat(74) + '\n');
}

module.exports = {
  PALETTES,
  showPalette,
  showAllPalettesSummary
};

// Direct execution CLI check
if (require.main === module) {
  const arg = process.argv[2];
  if (arg && !arg.startsWith('--')) {
    showPalette(arg);
  } else {
    showAllPalettesSummary();
  }
}

