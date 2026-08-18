# 🎨 Guía de Estilo y Sistema de Arquitectura UI (Material Design 3 / Material You)

Esta especificación técnica exhaustiva define las reglas obligatorias de diseño, tokens dinámicos, geometría, tipografía, elevación y adaptabilidad para crear interfaces con **precisión del 100% y cero ambigüedades**.

---

## 1. Tokens Dinámicos y Sistema de Color (Core Palette)

El agente nunca debe usar colores estáticos o arbitrarios en código duro. **Todo color debe mapearse a Roles Semánticos Dinámicos**.

### A. Reglas Maestras de Aplicación Semántica (Master Orchestration Rules)

Para aplicar cualquier esquema con éxito en cualquier layout (móvil, tablet o escritorio), el agente DEBE seguir estas **tres reglas de orquestación obligatorias**:

1. **Regla de Superficies y Elevación:**
   - `Surface`: Lienzo base (el fondo más grande de la aplicación / App Shell).
   - `Surface Container Low`: Paneles laterales de navegación fijos (*Navigation Drawer / Navigation Rail integrado*).
   - `Surface Container`: Barras de búsqueda fijas (`Search Bar`), tarjetas de contenido inactivo, inputs neutros.
   - `Surface Container High`: Diálogos modales flotantes, tarjetas elevadas, menús desplegables.

2. **Regla de Contraste "On-":**
   - Cualquier texto o icono que se pose sobre una superficie `Container` debe usar obligatoriamente su tono `On...Container` correspondiente (*Ejemplo:* Si una tarjeta usa `Primary Container`, el texto debe ser `On Primary Container`).

3. **Regla de Estados de Selección:**
   - `Estado Inactivo/Neutro`: Usa `Surface Container` (el tono de la tarjeta base).
   - `Estado Seleccionado/En Foco`: El fondo de la tarjeta/ítem debe cambiar a `Primary Container`. Todo el texto/icono interno debe cambiar a `On Primary Container`.

---

### B. Catálogo de los 10 Esquemas de Color Semánticos (5 Familias Tonales)

#### 🌿 Familia 1: Verdes y Oliva (Naturaleza / Salud / Sostenibilidad)

##### Esquema 1: "Forest Sage" (Verde Salvia Vibrante)
- *Semilla:* Verde bosque vivo de contraste medio-alto. Sensación de frescura y vitalidad.
- *Uso:* Apps de salud, meditación, sostenibilidad activa, gestión ecológica.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#426B29` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#D7E8CD` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#0C2002` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#F3F6E8` | Fondo base de la app. |
| **`Surface Container`** | `#EAEFE0` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FAFDF1` | Modales flotantes, menús. |
| **`On Surface`** | `#1A1E17` | Texto primario. |
| **`Outline`** | `#73796E` | Bordes finos de inputs. |

##### Esquema 2: "Olive Slate" (Verde Oliva Desaturado / Tierra)
- *Semilla:* Verde oliva militar seco con bases cálidas (crema). Reposado y formal.
- *Uso:* Apps de agricultura, finanzas éticas, lectura reposada, documentación.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#5A641F` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#DDE895` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#1A1E00` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FBF8F1` | Fondo base de la app. |
| **`Surface Container`** | `#F5EEE2` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFFDF9` | Modales flotantes, menús. |
| **`On Surface`** | `#1E1B16` | Texto primario. |
| **`Outline`** | `#79796C` | Bordes finos de inputs. |

---

#### 🔴 Familia 2: Rojos y Terracota (Dinámicos / Cálidos / Energía)

##### Esquema 3: "Crimson Quartz" (Rojo Carmesí Intenso)
- *Semilla:* Rojo carmesí muy saturado y limpio. Alta visibilidad y energía.
- *Uso:* Alertas, apps de fitness, comercio de alta visibilidad, noticias de última hora.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#BB1834` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#FFDADF` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#410009` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FFF8F7` | Fondo base de la app. |
| **`Surface Container`** | `#FFF0EF` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFF9F8` | Modales flotantes, menús. |
| **`On Surface`** | `#241A1A` | Texto primario. |
| **`Outline`** | `#857373` | Bordes finos de inputs. |

##### Esquema 4: "Terracotta Dusk" (Rojo Arcilla Orgánico)
- *Semilla:* Rojo arcilla u óxido desaturado con base salmón. Cálido, terroso y acogedor.
- *Uso:* Redes sociales dinámicas, eventos creativos, diseño de interiores, retail de autor.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#A24244` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#FBBBBF` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#421316` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FDF8F7` | Fondo base de la app. |
| **`Surface Container`** | `#FFF0EF` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFF8F7` | Modales flotantes, menús. |
| **`On Surface`** | `#241A1A` | Texto primario. |
| **`Outline`** | `#837373` | Bordes finos de inputs. |

---

#### 💜 Familia 3: Púrpuras y Violetas (Premium / Corporativos / Creativos)

##### Esquema 5: "Lavender Breeze" (Púrpura Semántico Clásico M3)
- *Semilla:* El púrpura icónico de M3. Contraste equilibrado y bases gris-lavanda frías.
- *Uso:* Clientes de correo, dashboards de trabajo corporativo, suites de productividad.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#6750A4` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#C8B6FF` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#28164D` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#E5E2F3` | Fondo base de la app. |
| **`Surface Container`** | `#F1EEF8` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FAF8FE` | Modales flotantes, menús. |
| **`On Surface`** | `#1D192B` | Texto primario. |
| **`Outline`** | `#79747E` | Bordes finos de inputs. |

##### Esquema 6: "Orchid Velvet" (Púrpura Orquídea Floral)
- *Semilla:* Púrpura con matices rosados más pronunciados. Cálido, sofisticado y amigable.
- *Uso:* Apps creativas, diseño, portafolios, experiencias de bienestar y belleza.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#8E4A8D` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#FFD7F7` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#360538` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FEF6FA` | Fondo base de la app. |
| **`Surface Container`** | `#FFF1F8` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFF9FC` | Modales flotantes, menús. |
| **`On Surface`** | `#201A1E` | Texto primario. |
| **`Outline`** | `#82737D` | Bordes finos de inputs. |

---

#### 🌊 Familia 4: Azules y Turquesas (Corporativos / Analítica / Fríos)

##### Esquema 7: "Oceanic Slate" (Azul Pizarra Frío)
- *Semilla:* Azul océano profundo y desaturado. Sensación de estabilidad, confianza y seriedad.
- *Uso:* Apps corporativas, finanzas, analítica de datos, gestión de proyectos.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#2B638B` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#CDE5F7` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#001E30` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#F4F7FA` | Fondo base de la app. |
| **`Surface Container`** | `#E9EEF4` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#F8FAFC` | Modales flotantes, menús. |
| **`On Surface`** | `#181C20` | Texto primario. |
| **`Outline`** | `#71787E` | Bordes finos de inputs. |

##### Esquema 8: "Aqua Frost" (Turquesa Gélido / Aqua)
- *Semilla:* Turquesa oscuro que genera fondos azul gélido muy pálidos. La paleta más fría y clínica.
- *Uso:* Apps de salud, telemedicina, clima, monitorización de sistemas fríos.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | --- | --- |
| **`Primary`** | `#006874` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#97F0FF` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#001F24` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#F3F6F8` | Fondo base de la app. |
| **`Surface Container`** | `#EAEFE2` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#F9FCFC` | Modales flotantes, menús. |
| **`On Surface`** | `#191C1D` | Texto primario. |
| **`Outline`** | `#70797B` | Bordes finos de inputs. |

---

#### 🍯 Familia 5: Orgánicos y Ámbar (Tierras / Naranjas / Artesanales)

##### Esquema 9: "Golden Amber" (Dorado Miel Luminoso)
- *Semilla:* Dorado ámbar oscuro y rico con bases crema luminosas. Sensación de valor y calidez.
- *Uso:* Apps de notas, consumo de contenidos, recetas de cocina, interfaces creativas.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#7A5900` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#FFDF9E` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#261A00` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FBF8F1` | Fondo base de la app. |
| **`Surface Container`** | `#F5EEE2` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFFDF9` | Modales flotantes, menús. |
| **`On Surface`** | `#1E1B16` | Texto primario. |
| **`Outline`** | `#807567` | Bordes finos de inputs. |

##### Esquema 10: "Desert Bloom" (Naranja Tierra Orgánico)
- *Semilla:* Naranja tierra de siena desaturado con bases melocotón. Rústico, denso y acogedor.
- *Uso:* Apps de gastronomía/restaurantes, artesanía, bienestar holístico, blogs de viajes.

| Token Semántico | Valor Hex | Uso en UI |
| :--- | :--- | :--- |
| **`Primary`** | `#85511A` | Botones, FABs, iconos seleccionados. |
| **`On Primary`** | `#FFFFFF` | Texto/Iconos sobre botones primarios. |
| **`Primary Container`** | `#FFDCC3` | Fondos de ítems seleccionados. |
| **`On Primary Container`** | `#2C1500` | Texto sobre ítems seleccionados. |
| **`Surface`** | `#FFF9F6` | Fondo base de la app. |
| **`Surface Container`** | `#FFF1EA` | Barras de búsqueda, tarjetas base. |
| **`Surface Container High`** | `#FFF9F7` | Modales flotantes, menús. |
| **`On Surface`** | `#201A16` | Texto primario. |
| **`Outline`** | `#837367` | Bordes finos de inputs. |

---

### B. Regla Estricta de Elevación (Flat Depth Architecture)

> [!CAUTION]
> **Queda estrictamente prohibido usar sombras oscuras proyectadas (`box-shadow`) para tarjetas regulares.**
> La profundidad y elevación se calcula exclusivamente mediante la **luminosidad y tono de la superficie**:
>
> - **Profundidad 0 (Lienzo exterior):** `Surface`
> - **Profundidad 1 (Contenido plano / Cards):** `Surface Container` (o `Surface Container Lowest` en Light)
> - **Profundidad 2 (Paneles / Modales / Menús):** `Surface Container High`

### C. Contrato de Alto Contraste y Pastillas Semánticas (WCAG AAA High-Contrast Contract)

> [!IMPORTANT]
> **Prohibido el uso de combinaciones de bajo contraste como `bg-green-100 text-green-800` o textos desalineados con el fondo.**
> Todo texto, pastilla (*badge*), píldora o indicador DEBE usar pares semánticos certificados con ratio mínimo de **7:1**:

1. **Pastillas de Estado y Tendencias (Badges & Trend Pills):**
   - **Tendencia Positiva / Éxito (Success):**
     - Claro: Fondo `var(--md-badge-success-bg)` (`#D7E8CD`) con Texto `var(--md-badge-success-text)` (`#0A3E10` verde bosque profundo, contraste 8.2:1).
     - Oscuro: Fondo `var(--md-badge-success-bg)` (`rgba(129, 199, 132, 0.22)`) con Texto `var(--md-badge-success-text)` (`#B9F6CA` verde menta brillante, contraste 9.1:1).
   - **Tendencia Negativa / Error:**
     - Claro: Fondo `var(--md-sys-color-error-container)` (`#FFDAD6`) con Texto `var(--md-sys-color-on-error-container)` (`#410002`, contraste 11.5:1).
     - Oscuro: Fondo `rgba(239, 83, 80, 0.25)` con Texto `#FFCDD2` (contraste 8.4:1).
   - **Advertencia / Atención (Warning):**
     - Claro: Fondo `#FFECB3` con Texto `#502D00` (ámbar tostado profundo, contraste 8.6:1).
     - Oscuro: Fondo `rgba(255, 179, 0, 0.22)` con Texto `#FFE082` (contraste 9.3:1).
   - **Neutro / Métrica:**
     - Fondo `var(--md-sys-color-secondary-container)` con Texto `var(--md-sys-color-on-secondary-container)`.

2. **Regla de Emparejamiento Semántico Inquebrantable:**
   - Si un contenedor usa un token `[Role] Container`, el texto interno DEBE ser obligatoriamente `On [Role] Container`.
   - NUNCA colocar `On Surface Variant` sobre fondos que no sean neutros (`Surface` o `Surface Container`).

---

## 2. Geometría, Sistema de Bordes y Tipografía

### A. Jerarquía Estricta de Radios de Borde (`border-radius`)

El agente debe aplicar rigurosamente las siguientes medidas según la jerarquía de anidación:

- **Marco Exterior de la Aplicación:** `28px` a `32px`
- **Contenedor Modal / Navigation Drawer Modal:** `28px`
- **Diálogo Flotante (Basic Dialog):** `28px`
- **Tarjetas Principales (Message Cards / Media Cards):** `20px` a `24px`
- **Imágenes o Adjuntos dentro de una Tarjeta:** `16px` *(Regla de Anidación: El elemento hijo debe tener un radio menor que el contenedor padre).*
- **Campos de Entrada (Outlined Inputs / Forms):** `4px` a `8px`
- **Píldoras, Botones, Chips, Barra de Búsqueda y Avatares:** `9999px` (*Full Pill*)

### B. Especificaciones Tipográficas (Typography Tokens)

- **Tipografía Base:** Sans-serif moderna y limpia (Roboto / Google Sans / Inter).
- **Display / Header (`App Titles`):** `22px` - `24px` | Regular / Medium | Line-height: `1.2`
- **Card Titles (`Nombres / Asuntos / Titulares`):** `16px` - `18px` | Semibold / Bold | Line-height: `1.3`
- **Body Text (`Cuerpo de Mensajes / Contenido`):** `14px` - `15px` | Regular | Line-height: `1.4` a `1.5`
- **Subtext & Metadata (`Fechas / Subtítulos`):** `12px` - `13px` | Regular | Color: `On Surface Variant`

---

## 3. Disposición y Adaptabilidad (Layout & Responsiveness)

El diseño de pantalla se calcula usando un sistema de rejilla flexible (*Flexbox / CSS Grid*) controlado por **Breakpoints oficiales M3**:

### A. Breakpoints de Pantalla
- **Compact (Mobile):** `< 600dp` (o `< 600px`)
- **Medium (Tablet / Foldables):** `600dp` a `839dp`
- **Expanded (Desktop / Web):** `≥ 840dp`

### B. Tabla de Mapeo Adaptable de Layouts

| Componente | Mobile (`< 600dp`) | Tablet (`600dp - 839dp`) | Desktop (`≥ 840dp`) |
| :--- | :--- | :--- | :--- |
| **Navegación Principal** | **Bottom Navigation Bar** fija en el fondo (Alto: `80px`, `z-index: 40`). | **Navigation Rail** lateral estrecho a la izquierda (Ancho: `64px` - `72px`). | **Navigation Drawer** lateral extendido (Ancho: `240px` - `280px`). |
| **Estructura de Pantalla** | **Single Pane Layout**: Una sola columna visible a la vez con transición *List $\leftrightarrow$ Detail* y botón Volver (`arrow_back`). | **Single Pane Amplio**: Columna central con márgenes automáticos laterales. | **Dual / 3-Pane Layout**: Paneles concurrentes lado a lado sin recortes. |
| **Botón de Acción (FAB)** | **FAB Circular Flotante** (`56px` x `56px`, `border-radius: 16px`) en esquina inferior derecha (`bottom: 96px`, `right: 16px`). | **FAB Circular** ubicado dentro del área principal. | **Extended FAB** con texto ("Compose" / "Nuevo") en el Drawer lateral. |
| **Modales de Navegación** | **Modal Drawer** deslizable que cubre el contenido con `Scrim`. | **Standard Drawer** integrado o **Modal Drawer**. | **Standard Drawer** permanente, acoplado al grid sin capa de oscurecimiento. |

---

## 4. Reglas Críticas de Visibilidad y Adaptabilidad Móvil (Mobile-First Contract)

> [!IMPORTANT]
> **Nunca ocultar elementos esenciales en móvil sin proveer su equivalente de acceso:**
> 1. **Patrón Drill-Down (List $\to$ Detail):** En móvil (`< 600dp` o `< lg`), el usuario ve la lista (`Panel 2`). Al tocar una tarjeta, el estado cambia a `mobileView: 'detail'` ocultando la lista y mostrando el panel de detalle (`Panel 3`) a pantalla completa.
> 2. **Botón Volver (`arrow_back`):** El panel de detalle DEBE incluir un botón de retroceso visible únicamente en pantallas compactas (`lg:hidden`) para regresar a `mobileView: 'list'`.
> 3. **Padding de Seguridad para Bottom Nav:** Todos los contenedores desplazables en móvil deben tener `pb-24` (`padding-bottom: 96px`) para evitar que la barra inferior de 80px tape contenido interactivo o el FAB.
> 4. **FAB Móvil Autónomo:** En móvil, el FAB debe flotar sobre la lista (`fixed bottom-24 right-4 z-30`) para garantizar la creación de elementos sin depender del Drawer lateral oculto.

---

## 5. Especificación Detallada de Componentes Clave

### A. Barra de Búsqueda (`Search Bar`)
- **Forma:** Píldora completa (`border-radius: 9999px`).
- **Dimensiones:** Alto `48px` - `56px`, ancho `100%`.
- **Fondo:** `Surface Container` (`#EDE8F5`). Sin bordes.
- **Layout Interno:** `Flexbox row`, `align-items: center`, `justify-content: space-between`.
- *Izquierda:* Ícono de búsqueda (`On Surface Variant`) | Padding izquierdo: `16px`.
- *Centro:* Texto de marcador (*placeholder*) en tono desaturado.
- *Derecha:* Avatar de usuario circular (`32px` x `32px`) | Padding derecho: `8px`.

### B. Tarjetas de Mensaje / Contenido (`Cards`)
- **Contenedor:** `border-radius: 20px` - `24px`, padding interno: `16px` a `20px`.
- **Estado Normal:** Fondo `Surface Container` (`#F1EEF8`).
- **Estado Seleccionado (En foco / Activo):** Fondo `Primary Container` (`#C8B6FF` o `#D7E8CD`). Todo el texto e iconos internos pasan a `On Primary Container`.
- **Header de Tarjeta:**
  - Avatar circular (`40px`) a la izquierda.
  - Columna de información: Nombre en negrita (`16px`), fecha/hora debajo (`12px`).
  - Botón de acción flotante (Estrella / Badge) alineado a la derecha superior:
    - *Estado marcado:* Círculo relleno en `Primary` con icono en `On Primary`.
    - *Estado desmarcado:* Icono delineado (*Outlined*) sin contenedor.

### C. Botones de Acción
- **Primary Filled Button:** Formato píldora (`9999px`), fondo `Primary`, texto `On Primary` en negrita/semibold.
- **Secondary Outlined Button:** Formato píldora (`9999px`), fondo transparente, borde `1px solid Outline`, texto `Primary`.
- **Text Button:** Sin fondo ni borde, texto `Primary` en mayúscula/semibold. Utilizado en diálogos modales.

### D. Barra de Navegación Inferior (`Navigation Bar`)
- **Contenedor:** Alto `80px`, fondo `Surface Container Low`.
- **Variante Stacked (Móvil Estándar):**
  - Columna vertical centrado: Píldora indicadora arriba, texto abajo (`12px`).
  - Píldora activa: Ancho `64px`, alto `32px`, `border-radius: 9999px`, color `Secondary Container`.
- **Variante Inline (Horizontal / Pantalla Ancha):**
  - Píldora extendida que encierra el icono y la etiqueta de texto en una sola fila horizontal con `border-radius: 9999px`.

---

## 5. Guía de Ejecución por Escenarios UI

### Escenario 1: Feed/Lista Móvil (Mobile Single Pane)
1. **Header:** `Search Bar` en formato píldora en la parte superior.
2. **Body:** Lista de tarjetas (`Cards`) apiladas verticalmente con `gap: 12px`.
3. **Acción Flotante:** `FAB` circular (`56px` x `56px`, `border-radius: 16px`) posicionado a `16px` de las esquinas inferior e izquierda/derecha.
4. **Footer:** `Bottom Navigation Bar` fija en la base de la pantalla.

### Escenario 2: Diálogos y Formularios (Modales)
1. **Confirmación Breve:** `Basic Dialog` centrado en pantalla, `border-radius: 28px`, fondo `Surface Container High`, capa posterior bloqueada con `Scrim` al 30%. Botones de acción en la esquina inferior derecha como `Text Buttons`.
2. **Formulario Complejo (>3 campos):** `Full-screen Dialog` ocupando el 100% de la pantalla.
   - Barra superior con botón "X" a la izquierda, título central y acción "Save" en texto `Primary` a la derecha.
   - Inputs en formato `Outlined Field` con borde `1px`, `border-radius: 4px - 8px` y etiquetas flotantes incrustadas (*Notched Outline*).

### Escenario 3: Aplicación de Escritorio / Dashboard (Desktop 3-Pane)

Configurar una cuadrícula `Flexbox` horizontal con tres áreas diferenciadas **sin bordes divisores verticales**:

$$\text{Pantalla Completa} = \text{Panel 1 (Drawer)} + \text{Panel 2 (Lista)} + \text{Panel 3 (Detalle)}$$

1. **Panel 1 - Menú Lateral (`240px`):** Fondo `Surface Container Low` (`#F7F5FD`).
   - Encabezado con `Extended FAB` ("Compose") en formato píldora con fondo `Primary Container`.
   - Lista de opciones verticales con píldora seleccionada activa.
2. **Panel 2 - Lista de Mensajes (`360px`):** Fondo `Surface` (`#F3F2F8`).
   - Muestra la `Search Bar` e ítems de lista.
   - La tarjeta activa debe cambiar su fondo a `Primary Container` (`#C8B6FF` o `#D7E8CD`).
3. **Panel 3 - Lectura / Detalle (`flex-1`):** Fondo `Surface` o Blanco puro (`#FFFFFF`).
   - Borde redondeado del contenedor de `24px`.
   - Despliega la información completa del elemento seleccionado en el Panel 2.
