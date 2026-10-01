// Regenerates public/sitemap.xml and public/llms.txt from the shared route
// list in scripts/routes.mjs, so they can never drift from the real routes.
// Runs as a `prebuild` step.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import path from "node:path";
import { enumerateRoutes, loadData } from "./routes.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://holyplace.vercel.app";

const routes = await enumerateRoutes();
const { religions, posts } = await loadData();

// Real last-modified dates, not "today" on every build — a sitemap that
// claims every page changed on every deploy is a signal search engines
// learn to discount. Chant/figure/religion pages derive their lastmod from
// religions.ts's actual last git commit date; blog posts use their own
// tracked updatedDate (already hand-maintained per post); everything else
// falls back to whichever of the two content files changed more recently.
function lastCommitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cd --date=short -- ${file}`, { cwd: root }).toString().trim();
    return out || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const religionsLastmod = lastCommitDate("src/data/religions.ts");
const blogLastmod = lastCommitDate("src/data/blog.ts");
const siteLastmod = religionsLastmod > blogLastmod ? religionsLastmod : blogLastmod;

const postLastmod = new Map(posts.map((p) => [p.slug, p.updatedDate]));

function lastmodFor(route) {
  if (route.type === "chant" || route.type === "figure" || route.type === "religion") return religionsLastmod;
  if (route.type === "blog-post") return postLastmod.get(route.slug) ?? blogLastmod;
  if (route.type === "blog-index") return blogLastmod;
  return siteLastmod;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.routePath}</loc>
    <lastmod>${lastmodFor(r)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
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
  "> Devotional chants across traditions — aarti, mantra, chalisa, and prayer, in the original script with English translation, plus guides on meaning, benefits, and festivals. Routes are statically prerendered, so non-JS crawlers see real content, not just this file."
);
llmsLines.push("");
llmsLines.push(`- [Home](${SITE}/): Grid linking to every tradition.`);
llmsLines.push(`- [Guides](${SITE}/blog): Meaning, benefits, and how-to guides across every tradition.`);
llmsLines.push(`- [About](${SITE}/about): What this site is and isn't.`);

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

llmsLines.push("");
llmsLines.push("## Guides");
llmsLines.push("");
for (const p of posts) {
  llmsLines.push(`- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`);
}

writeFileSync(path.join(root, "public/llms.txt"), llmsLines.join("\n") + "\n");

console.log(`Generated sitemap.xml (${routes.length} urls) and llms.txt (${religions.length} religions, ${posts.length} guides).`);
