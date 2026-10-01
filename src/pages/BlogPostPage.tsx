import { Link, Navigate, useParams } from "react-router-dom";
import { getPost } from "../data/blog";
import { getFigure, getReligion, getChant } from "../data/religions";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";

const SITE = "https://holyplace.vercel.app";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const related = post.relatedLinks
    .map((link) => {
      const religion = getReligion(link.religionId);
      const figure = getFigure(link.religionId, link.figureId);
      if (!religion || !figure) return null;
      if (link.chantId) {
        const chant = getChant(link.religionId, link.figureId, link.chantId);
        if (!chant) return null;
        return {
          path: `/${religion.id}/${figure.id}/${chant.id}`,
          label: `${chant.title} — ${figure.name}`,
          color: religion.color,
        };
      }
      return { path: `/${religion.id}/${figure.id}`, label: figure.name, color: religion.color };
    })
    .filter((x): x is { path: string; label: string; color: string } => x !== null);

  const relatedPosts = (post.relatedPosts ?? [])
    .map((slug) => getPost(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
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
    ...(post.image ? { image: `${SITE}${post.image.src}` } : {}),
  };

  return (
    <div>
      <Seo
        title={`${post.title} — HolyPlace Guides`}
        description={post.description}
        path={`/blog/${post.slug}`}
        breadcrumb={breadcrumb}
        ogType="article"
        extraJsonLd={[
          { id: "ld-faq", data: faqJsonLd },
          { id: "ld-article", data: articleJsonLd },
        ]}
      />
      <Breadcrumb items={breadcrumb} />
      <Link to="/blog" className="back-link">
        ← All guides
      </Link>

      <div className="deity-header">
        <h1>{post.title}</h1>
        <p className="epithet">{post.description}</p>
      </div>

      {post.image && (
        <figure className="blog-image">
          <img src={post.image.src} alt={post.image.alt} loading="lazy" />
          <figcaption>
            <a href={post.image.creditUrl} target="_blank" rel="noopener noreferrer">
              {post.image.credit}
            </a>
          </figcaption>
        </figure>
      )}

      <article className="card blog-post">
        <section>
          <h2>{post.sectionTitles?.whatItIs ?? "What it is"}</h2>
          {post.sections.whatItIs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section>
          <h2>{post.sectionTitles?.howTo ?? "How to use it"}</h2>
          <ol>
            {post.sections.howTo.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2>{post.sectionTitles?.benefits ?? "Benefits"}</h2>
          <ul>
            {post.sections.benefits.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{post.sectionTitles?.limitations ?? "Where most sources fall short"}</h2>
          <ul>
            {post.sections.limitations.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{post.sectionTitles?.useCases ?? "Everyday use cases"}</h2>
          <ul>
            {post.sections.useCases.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{post.sectionTitles?.tips ?? "Tips"}</h2>
          <ul>
            {post.sections.tips.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>FAQ</h2>
          {post.faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <p className="faq-q">{f.q}</p>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
        </section>
      </article>

      {related.length > 0 && (
        <section className="home-section">
          <h2>Related chants</h2>
          <div className="deity-grid">
            {related.map((r) => (
              <Link key={r.path} to={r.path} className="deity-card">
                <span className="name" style={{ color: r.color }}>
                  {r.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="home-section">
          <h2>Related guides</h2>
          <div className="deity-grid">
            {relatedPosts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="deity-card">
                <span className="name">{p.title}</span>
                <span className="epithet">{p.description}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
