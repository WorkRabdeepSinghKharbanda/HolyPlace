import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  breadcrumb: { name: string; path: string }[];
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
 * Injects per-route meta tags client-side. This is a CSR SPA with no SSR/prerendering,
 * so a crawler that doesn't execute JS (most AI crawlers) never sees this — it only
 * sees index.html's static head. llms.txt is the mitigation for those, not a fix.
 */
export default function Seo({ title, description, path, breadcrumb }: SeoProps) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setLink("canonical", url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
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
  }, [title, description, path, breadcrumb]);

  return null;
}
