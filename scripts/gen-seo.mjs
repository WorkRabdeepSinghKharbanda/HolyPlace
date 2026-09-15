// Regenerates public/sitemap.xml and public/llms.txt from src/data/deities.ts
// so they can never drift from the actual route list. Runs as a `prebuild` step.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://holyplace.vercel.app";

const src = await import(path.join(root, "src/data/deities.ts").replace(/\.ts$/, ".ts?t=" + Date.now()));
const deities = src.deities;

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE}/`, changefreq: "monthly", priority: "1.0" },
  ...deities.map((d) => ({ loc: `${SITE}/deity/${d.id}`, changefreq: "yearly", priority: "0.8" })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);

const llms = `# HolyPlace

> Aarti and mantra chants for the Hindu deities, in Devanagari with English translation. Client-rendered React app — routes below only render after JavaScript executes; non-JS crawlers see only this file and the static index.html head.

## Pages

- [Home](${SITE}/): Grid linking to every deity's aarti and mantra page.
${deities
  .map(
    (d) =>
      `- [${d.name}](${SITE}/deity/${d.id}): ${d.epithet}. Mantra "${d.mantra.transliteration}" and the "${d.aarti.title}" aarti, Devanagari with English translation.`
  )
  .join("\n")}
`;

writeFileSync(path.join(root, "public/llms.txt"), llms);

console.log(`Generated sitemap.xml (${urls.length} urls) and llms.txt (${deities.length} deities).`);
