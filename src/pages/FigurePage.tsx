import { Link, Navigate, useParams } from "react-router-dom";
import { getFigure, getReligion } from "../data/religions";
import { postsForFigure } from "../data/blog";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import { useLang } from "../context/LangContext";

export default function FigurePage() {
  const { religionId, figureId } = useParams();
  const religion = religionId ? getReligion(religionId) : undefined;
  const figure = religionId && figureId ? getFigure(religionId, figureId) : undefined;
  const { t } = useLang();

  if (!religion || !figure) return <Navigate to="/" replace />;

  const guides = postsForFigure(religion.id, figure.id);

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: religion.name, path: `/${religion.id}` },
    { name: figure.name, path: `/${religion.id}/${figure.id}` },
  ];

  return (
    <div>
      <Seo
        title={`${figure.name} — Mantra, Aarti & Chalisa — HolyPlace`}
        description={`All chants for ${figure.name}, ${figure.epithet}: ${figure.chants.map((c) => c.typeLabel).join(", ")}, in ${religion.script} with English translation.`}
        path={`/${religion.id}/${figure.id}`}
        breadcrumb={breadcrumb}
      />
      <Breadcrumb items={breadcrumb} />
      <Link to={`/${religion.id}`} className="back-link">
        {t("back_all_of", { name: religion.name })}
      </Link>

      <div className="deity-header">
        <span className="sanskrit-big" style={{ color: religion.color }}>
          {figure.nativeName}
        </span>
        <h1>{figure.name}</h1>
        <p className="epithet">{figure.epithet}</p>
      </div>

      <div className="deity-grid">
        {figure.chants.map((c) => (
          <Link key={c.id} to={`/${religion.id}/${figure.id}/${c.id}`} className="deity-card">
            <span className="epithet" style={{ color: religion.color, fontWeight: "bold" }}>
              {c.typeLabel}
            </span>
            <span className="name">{c.title}</span>
            <span className="epithet">{c.nativeTitle}</span>
          </Link>
        ))}
      </div>

      {guides.length > 0 && (
        <section className="home-section">
          <h2>Guides about {figure.name}</h2>
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
