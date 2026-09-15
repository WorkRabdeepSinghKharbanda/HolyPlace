import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getChant, getFigure, getReligion } from "../data/religions";
import Seo from "../components/Seo";
import ReciteMode from "../components/ReciteMode";
import { useFavorites } from "../hooks/useFavorites";
import { useSpeech } from "../hooks/useSpeech";
import { usePracticeStreak } from "../hooks/usePracticeStreak";

const SPEECH_LANG: Record<string, string> = {
  Devanagari: "hi-IN",
  Gurmukhi: "pa-IN",
  Latin: "la",
};

export default function ChantPage() {
  const { religionId, figureId, chantId } = useParams();
  const religion = religionId ? getReligion(religionId) : undefined;
  const figure = religionId && figureId ? getFigure(religionId, figureId) : undefined;
  const chant = religionId && figureId && chantId ? getChant(religionId, figureId, chantId) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);
  const [reciting, setReciting] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { streak, doneToday, markDoneToday } = usePracticeStreak();
  const path = religion && figure && chant ? `/${religion.id}/${figure.id}/${chant.id}` : "";
  const { supported: speechSupported, speaking, play, stop } = useSpeech(
    chant?.verses.map((v) => v.hi) ?? [],
    religion ? SPEECH_LANG[religion.script] ?? "en-US" : "en-US"
  );

  if (!religion || !figure || !chant) return <Navigate to="/" replace />;

  return (
    <div>
      <Seo
        title={`${chant.title} — ${figure.name} — HolyPlace`}
        description={`${chant.typeLabel} for ${figure.name}: ${chant.nativeTitle}, in ${religion.script} with English translation.`}
        path={path}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: religion.name, path: `/${religion.id}` },
          { name: figure.name, path: `/${religion.id}/${figure.id}` },
          { name: chant.title, path },
        ]}
      />
      <Link to={`/${religion.id}/${figure.id}`} className="back-link no-print">
        ← All chants for {figure.name}
      </Link>

      <div className="deity-header">
        <p className="epithet" style={{ color: religion.color, fontWeight: "bold" }}>
          {chant.typeLabel}
        </p>
        <h1>{chant.title}</h1>
        <p className="epithet">{chant.nativeTitle}</p>
        {chant.occasions && chant.occasions.length > 0 && (
          <p className="occasion-tags no-print">
            {chant.occasions.map((o) => (
              <Link key={o} to={`/?occasion=${encodeURIComponent(o)}`} className="occasion-tag">
                {o}
              </Link>
            ))}
          </p>
        )}
      </div>

      <div className="chant-toolbar no-print">
        <button
          className={`translate-toggle ${showTranslation ? "on" : ""}`}
          onClick={() => setShowTranslation((s) => !s)}
        >
          🌐 {showTranslation ? "Hide" : "Show"} translation
        </button>
        <button className="toolbar-btn" onClick={() => toggleFavorite(path)}>
          {isFavorite(path) ? "★ Favorited" : "☆ Favorite"}
        </button>
        {speechSupported && (
          <button className="toolbar-btn" onClick={speaking ? stop : play}>
            {speaking ? "⏹ Stop" : "🔊 Listen"}
          </button>
        )}
        <button className="toolbar-btn" onClick={() => setReciting(true)}>
          📖 Recite mode
        </button>
        <button className="toolbar-btn" onClick={() => window.print()}>
          🖨 Print
        </button>
        <button className="toolbar-btn" onClick={markDoneToday} disabled={doneToday}>
          {doneToday ? `✓ Chanted today · streak ${streak}` : `Mark as chanted today${streak > 0 ? ` · streak ${streak}` : ""}`}
        </button>
      </div>

      <section className="card">
        {chant.verses.map((verse, i) => (
          <div className="verse" key={i}>
            <p className="hi">{verse.hi}</p>
            {verse.translit && <p className="mantra-translit">{verse.translit}</p>}
            {showTranslation && <p className="en">{verse.en}</p>}
          </div>
        ))}
      </section>

      {reciting && (
        <ReciteMode verses={chant.verses} showTranslation={showTranslation} onClose={() => setReciting(false)} />
      )}
    </div>
  );
}
