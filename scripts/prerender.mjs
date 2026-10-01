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

// Replacement value passed as a function so `$&`/`$$`/`$\``/`$'` in the
// value itself (e.g. a title containing a literal "$") never get treated as
// String.replace's special replacement patterns.
function replaceTag(html, pattern, value) {
  return html.replace(pattern, () => value);
}

// JSON.stringify doesn't escape "</script>" or "<", so a literal closing
// tag inside a value could break out of the <script> element. No current
// content contains one, but escape defensively since this becomes a real
// injection vector the moment any user-submitted content exists.
function jsonLdScript(id, data) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<script type="application/ld+json" id="${id}">${json}</script>`;
}

function injectHead(html, meta) {
  let out = html;
  out = replaceTag(out, /<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`);
  out = replaceTag(out, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(meta.description)}"`);
  out = replaceTag(out, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(meta.canonical)}"`);
  out = replaceTag(out, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(meta.title)}"`);
  out = replaceTag(out, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(meta.description)}"`);
  out = replaceTag(out, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(meta.canonical)}"`);
  out = replaceTag(out, /<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${escapeAttr(meta.ogType)}"`);
  out = replaceTag(out, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeAttr(meta.title)}"`);
  out = replaceTag(out, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeAttr(meta.description)}"`);

  const extraScripts = meta.jsonLd.map((j) => jsonLdScript(j.id, j.data)).join("\n    ");
  out = replaceTag(out, "</head>", `    ${extraScripts}\n  </head>`);

  return out;
}

function injectRoot(html, appHtml) {
  return replaceTag(html, '<div id="root"></div>', `<div id="root">${appHtml}</div>`);
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
