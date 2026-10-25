// Serves ./out the way GitHub Pages does: mounted at /portfolio, directories redirect
// to a trailing slash, real 404s. `next start` can't serve an `output: 'export'` build.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const ROOT = resolve("out");
const BASE = "/portfolio";
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain",
  ".json": "application/json", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".pdf": "application/pdf", ".woff2": "font/woff2",
};

const isFile = (p) => existsSync(p) && statSync(p).isFile();

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const send = (file, status = 200) => {
    res.writeHead(status, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  };
  const notFound = () => send(join(ROOT, "404.html"), 404);

  if (url !== BASE && !url.startsWith(`${BASE}/`)) return notFound();
  const path = join(ROOT, url.slice(BASE.length));
  if (!path.startsWith(ROOT)) return notFound();

  if (existsSync(path) && statSync(path).isDirectory()) {
    if (!url.endsWith("/")) {
      res.writeHead(301, { Location: `${url}/` });
      return res.end();
    }
    if (isFile(join(path, "index.html"))) return send(join(path, "index.html"));
  }
  if (isFile(path)) return send(path);
  notFound();
}).listen(PORT, "127.0.0.1", () => console.log(`Serving ${ROOT} at http://127.0.0.1:${PORT}${BASE}/`));
