import { getChant, getFigure, getReligion } from "../data/religions";
import { getPost } from "../data/blog";
import { generateChantFaq } from "./chantFaq";

const SITE = "https://holyplace.vercel.app";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  breadcrumb: { name: string; path: string }[];
  jsonLd: { id: string; data: object }[];
}

function breadcrumbJsonLd(breadcrumb: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${SITE}${b.path}`,
    })),
  };
}

/**
 * Pure, server-safe per-route metadata. This is the ONLY place the
 * prerender script (scripts/prerender.mjs) gets title/description/JSON-LD
 * from — it never runs React or the client Seo component (that's
 * effect-based and only runs in the browser). Keep this in sync with each
 * page's own <Seo .../> props when either changes; see CLAUDE.md gotchas.
 */
export function getPageMeta(routePath: string): PageMeta | undefined {
  const segments = routePath.split("/").filter(Boolean);

  if (segments.length === 0) {
    const breadcrumb = [{ name: "Home", path: "/" }];
    return {
      title: "HolyPlace — Aarti, Mantra & Prayer Chants Across Traditions",
      description:
        "Devotional chants across traditions — aarti, mantra, chalisa, and prayer, in the original script with English translation.",
      canonical: `${SITE}/`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  if (segments[0] === "blog" && segments.length === 1) {
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/blog" },
    ];
    return {
      title: "Guides — Meaning, Benefits & How-To — HolyPlace",
      description:
        "Guides on mantra meaning, benefits of chanting, and how to observe festivals across Hinduism, Sikhism, Christianity, and Buddhism.",
      canonical: `${SITE}/blog`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  if (segments[0] === "blog" && segments[1]) {
    const post = getPost(segments[1]);
    if (!post) return undefined;
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ];
    return {
      title: `${post.title} — HolyPlace Guides`,
      description: post.description,
      canonical: `${SITE}/blog/${post.slug}`,
      ogType: "article",
      breadcrumb,
      jsonLd: [
        { id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) },
        {
          id: "ld-faq",
          data: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        },
        {
          id: "ld-article",
          data: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedDate,
            dateModified: post.updatedDate,
            author: { "@type": "Organization", name: "HolyPlace" },
            publisher: {
              "@type": "Organization",
              name: "HolyPlace",
              logo: { "@type": "ImageObject", url: `${SITE}/favicon-512.png` },
            },
            mainEntityOfPage: `${SITE}/blog/${post.slug}`,
            keywords: post.keywords.join(", "),
          },
        },
      ],
    };
  }

  if (segments[0] === "about") {
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ];
    return {
      title: "About HolyPlace",
      description:
        "HolyPlace is a free devotional reference for aarti, mantra, chalisa, and prayer chants across Hinduism, Sikhism, Christianity, and Buddhism.",
      canonical: `${SITE}/about`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  if (segments[0] === "privacy") {
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy" },
    ];
    return {
      title: "Privacy Policy — HolyPlace",
      description:
        "How HolyPlace handles data: what's stored locally in your browser, what Google Analytics and AdSense collect, and that there's no account or server-side user data.",
      canonical: `${SITE}/privacy`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  // :religionId[/:figureId[/:chantId]]
  const [religionId, figureId, chantId] = segments;
  const religion = getReligion(religionId);
  if (!religion) return undefined;

  if (!figureId) {
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: religion.name, path: `/${religion.id}` },
    ];
    return {
      title: `${religion.name} — Chants & Prayers — HolyPlace`,
      description: `${religion.tagline}. ${religion.script} texts with English translation.`,
      canonical: `${SITE}/${religion.id}`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  const figure = getFigure(religionId, figureId);
  if (!figure) return undefined;

  if (!chantId) {
    const breadcrumb = [
      { name: "Home", path: "/" },
      { name: religion.name, path: `/${religion.id}` },
      { name: figure.name, path: `/${religion.id}/${figure.id}` },
    ];
    return {
      title: `${figure.name} — Mantra, Aarti & Chalisa — HolyPlace`,
      description: `All chants for ${figure.name}, ${figure.epithet}: ${figure.chants.map((c) => c.typeLabel).join(", ")}, in ${religion.script} with English translation.`,
      canonical: `${SITE}/${religion.id}/${figure.id}`,
      ogType: "website",
      breadcrumb,
      jsonLd: [{ id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) }],
    };
  }

  const chant = getChant(religionId, figureId, chantId);
  if (!chant) return undefined;

  const path = `/${religion.id}/${figure.id}/${chant.id}`;
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: religion.name, path: `/${religion.id}` },
    { name: figure.name, path: `/${religion.id}/${figure.id}` },
    { name: chant.title, path },
  ];
  const faqs = generateChantFaq(chant, religion);

  return {
    title: `${chant.title} Lyrics in English with Meaning — ${figure.name} ${chant.typeLabel} — HolyPlace`,
    description: `${chant.nativeTitle} (${chant.title}): ${chant.typeLabel.toLowerCase()} for ${figure.name} with full lyrics, transliteration, and English translation.`,
    canonical: `${SITE}${path}`,
    ogType: "website",
    breadcrumb,
    jsonLd: [
      { id: "ld-breadcrumb", data: breadcrumbJsonLd(breadcrumb) },
      {
        id: "ld-faq",
        data: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      },
    ],
  };
}
