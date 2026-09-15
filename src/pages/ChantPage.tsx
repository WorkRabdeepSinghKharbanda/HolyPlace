import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getChant, getFigure, getReligion } from "../data/religions";
import Seo from "../components/Seo";

export default function ChantPage() {
  const { religionId, figureId, chantId } = useParams();
  const religion = religionId ? getReligion(religionId) : undefined;
  const figure = religionId && figureId ? getFigure(religionId, figureId) : undefined;
  const chant = religionId && figureId && chantId ? getChant(religionId, figureId, chantId) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);

  if (!religion || !figure || !chant) return <Navigate to="/" replace />;

  return (
    <div>
      <Seo
        title={`${chant.title} — ${figure.name} — HolyPlace`}
        description={`${chant.typeLabel} for ${figure.name}: ${chant.nativeTitle}, in ${religion.script} with English translation.`}
        path={`/${religion.id}/${figure.id}/${chant.id}`}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: religion.name, path: `/${religion.id}` },
          { name: figure.name, path: `/${religion.id}/${figure.id}` },
          { name: chant.title, path: `/${religion.id}/${figure.id}/${chant.id}` },
        ]}
      />
      <Link to={`/${religion.id}/${figure.id}`} className="back-link">
        ← All chants for {figure.name}
      </Link>

      <div className="deity-header">
        <p className="epithet" style={{ color: religion.color, fontWeight: "bold" }}>
          {chant.typeLabel}
        </p>
        <h1>{chant.title}</h1>
        <p className="epithet">{chant.nativeTitle}</p>
      </div>

      <button
        className={`translate-toggle ${showTranslation ? "on" : ""}`}
        onClick={() => setShowTranslation((s) => !s)}
      >
        🌐 {showTranslation ? "Hide" : "Show"} English translation
      </button>

      <section className="card" style={{ clear: "both" }}>
        {chant.verses.map((verse, i) => (
          <div className="verse" key={i}>
            <p className="hi">{verse.hi}</p>
            {verse.translit && <p className="mantra-translit">{verse.translit}</p>}
            {showTranslation && <p className="en">{verse.en}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
