const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

let basePort = parseInt(process.env.PORT, 10) || 3000;

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

function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.once('close', () => resolve(true)).close();
      })
      .listen(port);
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await checkPortAvailable(port))) {
    port++;
  }
  return port;
}

async function start() {
  const port = await findAvailablePort(basePort);

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

  server.listen(port, () => {
    console.log(`🚀 Lavender Tasks Suite running exclusively at: http://localhost:${port}`);
  });
}

start();
