import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  breadcrumb: { name: string; path: string }[];
  extraJsonLd?: { id: string; data: object }[];
  ogType?: string;
}

const SITE = "https://holyplace.vercel.app";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Updates per-route meta tags client-side on navigation (after hydration).
 * The FIRST paint of every route's head/JSON-LD comes from the prerender
 * step instead (scripts/prerender.mjs + src/lib/pageMeta.ts) — this effect
 * mainly keeps meta correct during client-side SPA navigation afterward,
 * and is a no-op on first load since it sets the same values the prerender
 * already wrote. Keep src/lib/pageMeta.ts in sync with each page's <Seo/>
 * props if either changes — see CLAUDE.md gotchas.
 */
export default function Seo({ title, description, path, breadcrumb, extraJsonLd, ogType = "website" }: SeoProps) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setLink("canonical", url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", `${SITE}/og-image.png`);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${SITE}/og-image.png`);

    setJsonLd("ld-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE}${b.path}`,
      })),
    });

    for (const { id, data } of extraJsonLd ?? []) {
      setJsonLd(id, data);
    }
  }, [title, description, path, breadcrumb, extraJsonLd, ogType]);

  return null;
}
