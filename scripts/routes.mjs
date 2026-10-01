// Single source of truth for "every route this site has" — consumed by
// scripts/gen-seo.mjs (sitemap/llms.txt) and scripts/prerender.mjs (static
// HTML generation), so the two can never enumerate a different route set.
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export async function loadData() {
  const t = Date.now();
  const { religions } = await import(path.join(root, "src/data/religions.ts") + `?t=${t}`);
  const { posts } = await import(path.join(root, "src/data/blog.ts") + `?t=${t}`);
  return { religions, posts };
}

export async function enumerateRoutes() {
  const { religions, posts } = await loadData();
  const routes = [
    { routePath: "/", type: "home", priority: "1.0", changefreq: "monthly" },
    { routePath: "/blog", type: "blog-index", priority: "0.8", changefreq: "weekly" },
    { routePath: "/about", type: "static", priority: "0.3", changefreq: "yearly" },
    { routePath: "/privacy", type: "static", priority: "0.3", changefreq: "yearly" },
  ];

  for (const r of religions) {
    routes.push({ routePath: `/${r.id}`, type: "religion", priority: "0.9", changefreq: "monthly", religionId: r.id });
    for (const f of r.figures) {
      routes.push({
        routePath: `/${r.id}/${f.id}`,
        type: "figure",
        priority: "0.8",
        changefreq: "yearly",
        religionId: r.id,
        figureId: f.id,
      });
      for (const c of f.chants) {
        routes.push({
          routePath: `/${r.id}/${f.id}/${c.id}`,
          type: "chant",
          priority: "0.7",
          changefreq: "yearly",
          religionId: r.id,
          figureId: f.id,
          chantId: c.id,
        });
      }
    }
  }

  for (const p of posts) {
    routes.push({ routePath: `/blog/${p.slug}`, type: "blog-post", priority: "0.6", changefreq: "yearly", slug: p.slug });
  }

  return routes;
}
