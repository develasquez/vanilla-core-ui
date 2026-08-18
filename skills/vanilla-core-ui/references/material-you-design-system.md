# 🎨 Guía de Estilo y Sistema de Arquitectura UI (Material Design 3 / Material You)

Esta especificación técnica exhaustiva define las reglas obligatorias de diseño, tokens dinámicos, geometría, tipografía, elevación y adaptabilidad para crear interfaces con **precisión del 100% y cero ambigüedades**.

---

## 1. Tokens Dinámicos y Sistema de Color (Core Palette)

El agente nunca debe usar colores estáticos o arbitrarios en código duro. **Todo color debe mapearse a Roles Semánticos Dinámicos**.

### A. Muestras de Referencia de Paletas Tono-Base (Seed Color)

| Token Semántico | Uso en Interfaz | Hex Tema Verde (Ref.) | Hex Tema Terracota (Ref.) | Hex Tema Púrpura (Ref.) |
| --- | --- | --- | --- | --- |
| **`Primary`** | Botón primario activo, FABs, líneas de acento e iconos clave. | `#426B29` | `#A24244` | `#6750A4` |
| **`On Primary`** | Texto e iconos sobre superficie `Primary`. | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| **`Primary Container`** | Tarjeta seleccionada, FAB extendido, píldora de filtro seleccionada. | `#D7E8CD` | `#FBBBBF` | `#C8B6FF` |
| **`On Primary Container`** | Texto e iconos dentro de elementos `Primary Container`. | `#1C1D1B` | `#421316` | `#28164D` |
| **`Secondary Container`** | Píldora indicadora en barras de navegación (Bottom Nav / Drawer). | `#E2E5DC` | `#FDE0DF` | `#E2DFFF` |
| **`On Secondary Container`** | Texto e icono del ítem activo en la barra de navegación. | `#1C1D1B` | `#241A1A` | `#1D192B` |
| **`Surface`** | Lienzo exterior o fondo base del marco de la aplicación. | `#F3F2F8` | `#F3F2F8` | `#E5E2F3` |
| **`Surface Container Low`** | Fondo de barras laterales fijas (*Standard Drawer* / Subpaneles). | `#F8F5FD` | `#F8F5FD` | `#F8F5FD` |
| **`Surface Container`** | Tarjetas inactivas, barra de búsqueda, campos neutros. | `#EDE8F5` | `#FFF0EF` | `#EDE8F5` |
| **`Surface Container High`** | Modales flotantes, menús *Drawer* superpuestos, tarjetas elevadas. | `#FAF8FE` | `#FAF8FE` | `#FAF8FE` |
| **`Surface Container Lowest`**| Tarjetas blancas puras (#FFFFFF) en Light mode. | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| **`On Surface`** | Titulares principales, nombres de contacto, texto primario. | `#1C1D1B` | `#241A1A` | `#1D192B` |
| **`On Surface Variant`** | Fechas, texto secundario, iconos inactivos, leyendas. | `#595C56` | `#635756` | `#49454F` |
| **`Outline`** | Bordes finos de inputs, chips inactivos, botones *Outlined*. | `#73796E` | `#73796E` | `#79747E` |
| **`Outline Variant`** | Líneas divisorias (*Dividers*) entre secciones de listas y tablas. | `#E7E0EC` | `#E7E0EC` | `#E7E0EC` |
| **`Scrim`** | Capa de oscurecimiento tras diálogos o menús modales. | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` |

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
