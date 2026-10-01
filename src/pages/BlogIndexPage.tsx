import { Link } from "react-router-dom";
import { getPost, posts } from "../data/blog";
import { religions } from "../data/religions";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";

const categoryName = (id: string) => religions.find((r) => r.id === id)?.name ?? "General";
const GLOSSARY_SLUG = "glossary-devotional-terms";

export default function BlogIndexPage() {
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
  ];

  const glossary = getPost(GLOSSARY_SLUG);

  const byCategory = new Map<string, typeof posts>();
  for (const p of posts) {
    if (p.slug === GLOSSARY_SLUG) continue;
    const list = byCategory.get(p.category) ?? [];
    list.push(p);
    byCategory.set(p.category, list);
  }

  return (
    <div>
      <Seo
        title="Guides — Meaning, Benefits & How-To — HolyPlace"
        description="Guides on mantra meaning, benefits of chanting, and how to observe festivals across Hinduism, Sikhism, Christianity, and Buddhism."
        path="/blog"
        breadcrumb={breadcrumb}
      />
      <Breadcrumb items={breadcrumb} />

      <div className="deity-header">
        <h1>Guides</h1>
        <p className="epithet">Meaning, benefits, and how-to guides across every tradition on HolyPlace.</p>
      </div>

      {glossary && (
        <section className="home-section">
          <h2>New here? Start with the glossary</h2>
          <Link to={`/blog/${glossary.slug}`} className="deity-card" style={{ display: "block", maxWidth: 420 }}>
            <span className="name">{glossary.title}</span>
            <span className="epithet">{glossary.description}</span>
          </Link>
        </section>
      )}

      {[...byCategory.entries()].map(([category, list]) => (
        <section className="home-section" key={category}>
          <h2>{categoryName(category)}</h2>
          <div className="deity-grid">
            {list.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="deity-card">
                <span className="name">{p.title}</span>
                <span className="epithet">{p.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
