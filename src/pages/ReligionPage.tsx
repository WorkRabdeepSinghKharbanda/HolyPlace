import { Link, Navigate, useParams } from "react-router-dom";
import { getReligion } from "../data/religions";
import { postsByCategory } from "../data/blog";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import { useLang } from "../context/LangContext";

export default function ReligionPage() {
  const { religionId } = useParams();
  const religion = religionId ? getReligion(religionId) : undefined;
  const { t } = useLang();

  if (!religion) return <Navigate to="/" replace />;

  const guides = postsByCategory(religion.id);

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: religion.name, path: `/${religion.id}` },
  ];

  return (
    <div>
      <Seo
        title={`${religion.name} — Chants & Prayers — HolyPlace`}
        description={`${religion.tagline}. ${religion.script} texts with English translation.`}
        path={`/${religion.id}`}
        breadcrumb={breadcrumb}
      />
      <Breadcrumb items={breadcrumb} />
      <Link to="/" className="back-link">
        {t("back_all_traditions")}
      </Link>

      <div className="deity-header">
        <h1 style={{ color: religion.color }}>{religion.name}</h1>
        <p className="epithet">{religion.tagline}</p>
      </div>

      <div className="deity-grid">
        {religion.figures.map((f) => (
          <Link key={f.id} to={`/${religion.id}/${f.id}`} className="deity-card">
            <span className="sanskrit" style={{ color: religion.color }}>
              {f.nativeName}
            </span>
            <span className="name">{f.name}</span>
            <span className="epithet">{f.epithet}</span>
          </Link>
        ))}
      </div>

      {guides.length > 0 && (
        <section className="home-section">
          <h2>Guides about {religion.name}</h2>
          <div className="deity-grid">
            {guides.map((p) => (
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
