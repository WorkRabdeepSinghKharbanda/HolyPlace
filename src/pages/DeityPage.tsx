import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getDeity } from "../data/deities";
import Seo from "../components/Seo";

export default function DeityPage() {
  const { id } = useParams();
  const deity = id ? getDeity(id) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);

  if (!deity) return <Navigate to="/" replace />;

  return (
    <div>
      <Seo
        title={`${deity.name} Aarti & Mantra — HolyPlace`}
        description={`${deity.mantra.transliteration}. ${deity.aarti.title} for ${deity.name}, ${deity.epithet}, in Devanagari with English translation.`}
        path={`/deity/${deity.id}`}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: deity.name, path: `/deity/${deity.id}` },
        ]}
      />
      <Link to="/" className="back-link">
        ← All deities
      </Link>

      <div className="deity-header">
        <span className="sanskrit-big">{deity.sanskritName}</span>
        <h1>{deity.name}</h1>
        <p className="epithet">{deity.epithet}</p>
      </div>

      <button
        className={`translate-toggle ${showTranslation ? "on" : ""}`}
        onClick={() => setShowTranslation((s) => !s)}
      >
        🌐 {showTranslation ? "Hide" : "Show"} English translation
      </button>

      <section className="card" style={{ clear: "both" }}>
        <h2>Mantra</h2>
        <p className="mantra-devanagari">{deity.mantra.devanagari}</p>
        <p className="mantra-translit">{deity.mantra.transliteration}</p>
        {showTranslation && <p className="en">{deity.mantra.meaning}</p>}
      </section>

      <section className="card">
        <h2>
          {deity.aarti.hiTitle} · {deity.aarti.title}
        </h2>
        {deity.aarti.verses.map((verse, i) => (
          <div className="verse" key={i}>
            <p className="hi">{verse.hi}</p>
            {showTranslation && <p className="en">{verse.en}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
