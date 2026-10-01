// Post-build step: renders every route to real static HTML using the SSR
// bundle (built separately via `vite build --ssr src/entry-server.tsx`),
// injects per-route meta/JSON-LD from src/lib/pageMeta.ts (a pure function,
// never the client-only effect-based Seo component), and writes one
// index.html per route into dist/. Vercel serves a static file that exists
// on disk before it falls back to the vercel.json SPA rewrite, so these
// prerendered pages are what crawlers and social unfurlers actually see.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { enumerateRoutes } from "./routes.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, "dist");

const { render, getPageMeta } = await import(pathToFileURL(path.join(root, "dist-server/entry-server.js")).href);

const template = readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function injectHead(html, meta) {
  let out = html;
  out = out.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`);
  out = out.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeAttr(meta.description)}$2`
  );
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(meta.canonical)}$2`);
  out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(meta.title)}$2`);
  out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(meta.description)}$2`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeAttr(meta.canonical)}$2`);
  out = out.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${escapeAttr(meta.ogType)}$2`);
  out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(meta.title)}$2`);
  out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(meta.description)}$2`);

  const extraScripts = meta.jsonLd
    .map((j) => `<script type="application/ld+json" id="${j.id}">${JSON.stringify(j.data)}</script>`)
    .join("\n    ");
  out = out.replace("</head>", `    ${extraScripts}\n  </head>`);

  return out;
}

function injectRoot(html, appHtml) {
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const routes = await enumerateRoutes();
let written = 0;
let skipped = 0;

for (const r of routes) {
  const meta = getPageMeta(r.routePath);
  if (!meta) {
    console.warn(`No meta for ${r.routePath}, skipping`);
    skipped++;
    continue;
  }

  const appHtml = render(r.routePath);
  const html = injectRoot(injectHead(template, meta), appHtml);

  const outPath = r.routePath === "/" ? path.join(distDir, "index.html") : path.join(distDir, r.routePath.slice(1), "index.html");
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  written++;
}

console.log(`Prerendered ${written} routes${skipped ? `, skipped ${skipped}` : ""}.`);
