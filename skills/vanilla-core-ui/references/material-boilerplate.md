# 📜 Material Design 3 (M3) Boilerplate Kit (`/vanilla-core-ui material`)

Usa este kit cuando construyas o inicialices una aplicación con el comando `/vanilla-core-ui material` (Material Web M3 + Vanilla-Core).

---

## 1. `package.json`

```json
{
  "name": "vanilla-core-m3-app",
  "version": "1.0.0",
  "description": "Vanilla-Core architecture with Material 3 Web Components",
  "main": "server.js",
  "scripts": {
    "dev": "node server.js"
  }
}
```

---

## 2. `server.js` (Zero-Dependency Node HTTP Server con Auto-Port Fallback)

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

let currentPort = parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }

  const cleanUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (extname === '.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end('/* optional css */', 'utf-8');
      } else if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Puerto ${currentPort} en uso, intentando con http://localhost:${currentPort + 1}...`);
    currentPort += 1;
    startServer(currentPort);
  } else {
    console.error(`Server error:`, err);
  }
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`🚀 Material 3 Vanilla-Core server running at http://localhost:${port}`);
  });
}

startServer(currentPort);
```

---

## 3. `index.html` (Material 3 App Shell)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Material 3 Vanilla-Core App</title>
  
  <!-- Roboto Font & Material Symbols Outlined -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="/vendor/material-web/material-symbols.css">
  
  <!-- Tailwind Utilities & Global M3 Tokens -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/style.css">
  
  <!-- Material 3 Web Components Bundle (Local Vendored) -->
  <script type="module" src="/vendor/material-web/material-web.bundle.js"></script>
</head>
<body class="min-h-screen flex flex-col font-sans antialiased">
  
  <!-- App Shell -->
  <div id="header-container"></div>
  <div id="drawer-container"></div>
  
  <main id="main-content-container" class="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8"></main>

  <script type="module" src="/load.js"></script>
</body>
</html>
```
