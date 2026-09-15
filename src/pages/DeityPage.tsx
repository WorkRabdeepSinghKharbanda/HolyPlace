import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getDeity } from "../data/deities";

export default function DeityPage() {
  const { id } = useParams();
  const deity = id ? getDeity(id) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);

  if (!deity) return <Navigate to="/" replace />;

  return (
    <div>
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
