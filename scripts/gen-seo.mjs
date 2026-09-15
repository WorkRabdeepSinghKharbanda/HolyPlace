// Regenerates public/sitemap.xml and public/llms.txt from src/data/religions.ts
// so they can never drift from the actual route list. Runs as a `prebuild` step.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://holyplace.vercel.app";

const src = await import(path.join(root, "src/data/religions.ts").replace(/\.ts$/, ".ts?t=" + Date.now()));
const religions = src.religions;

const today = new Date().toISOString().slice(0, 10);

const urls = [{ loc: `${SITE}/`, changefreq: "monthly", priority: "1.0" }];
for (const r of religions) {
  urls.push({ loc: `${SITE}/${r.id}`, changefreq: "monthly", priority: "0.9" });
  for (const f of r.figures) {
    urls.push({ loc: `${SITE}/${r.id}/${f.id}`, changefreq: "yearly", priority: "0.8" });
    for (const c of f.chants) {
      urls.push({ loc: `${SITE}/${r.id}/${f.id}/${c.id}`, changefreq: "yearly", priority: "0.7" });
    }
  }
}

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

const llmsLines = [];
llmsLines.push("# HolyPlace");
llmsLines.push("");
llmsLines.push(
  "> Devotional chants across traditions — aarti, mantra, chalisa, and prayer, in the original script with English translation. Client-rendered React app — routes below only render after JavaScript executes; non-JS crawlers see only this file and the static index.html head."
);
llmsLines.push("");
llmsLines.push(`- [Home](${SITE}/): Grid linking to every tradition.`);

for (const r of religions) {
  llmsLines.push("");
  llmsLines.push(`## ${r.name}`);
  llmsLines.push("");
  llmsLines.push(`- [${r.name} overview](${SITE}/${r.id}): ${r.tagline}.`);
  for (const f of r.figures) {
    llmsLines.push(
      `- [${f.name}](${SITE}/${r.id}/${f.id}): ${f.epithet}. Chants: ${f.chants.map((c) => c.typeLabel).join(", ")}.`
    );
    for (const c of f.chants) {
      llmsLines.push(
        `  - [${c.title}](${SITE}/${r.id}/${f.id}/${c.id}): ${c.typeLabel} for ${f.name}, "${c.nativeTitle}", ${r.script} with English translation.`
      );
    }
  }
}

writeFileSync(path.join(root, "public/llms.txt"), llmsLines.join("\n") + "\n");

console.log(`Generated sitemap.xml (${urls.length} urls) and llms.txt (${religions.length} religions).`);
