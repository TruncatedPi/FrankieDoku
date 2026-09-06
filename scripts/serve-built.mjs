// Serve the production build under the same project subpath used by GitHub Pages.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
const root = resolve('dist');
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff' };
export function startBuiltServer(port = 4173) {
return createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!pathname.startsWith('/SchroDoku/')) throw new Error('Outside project');
    const file = resolve(root, pathname.slice('/SchroDoku/'.length) || 'index.html');
    if (!file.startsWith(root + sep)) throw new Error('Outside build');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) startBuiltServer();
