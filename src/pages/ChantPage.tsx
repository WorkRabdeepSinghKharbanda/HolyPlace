import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getChant, getFigure, getReligion, type Verse } from "../data/religions";
import Seo from "../components/Seo";
import ReciteMode from "../components/ReciteMode";
import ScriptToggle from "../components/ScriptToggle";
import { useFavorites } from "../hooks/useFavorites";
import { useSpeech } from "../hooks/useSpeech";
import { usePracticeStreak } from "../hooks/usePracticeStreak";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { supportsScriptToggle, transliterateFromNative } from "../lib/transliterate";
import { useLang } from "../context/LangContext";

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
  const [script, setScript] = useLocalStorage("holyplace-script", "native");

  const { t } = useLang();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { streak, doneToday, markDoneToday } = usePracticeStreak();
  const path = religion && figure && chant ? `/${religion.id}/${figure.id}/${chant.id}` : "";
  const { supported: speechSupported, speaking, play, stop } = useSpeech(
    chant?.verses.map((v) => v.hi) ?? [],
    religion ? SPEECH_LANG[religion.script] ?? "en-US" : "en-US"
  );

  if (!religion || !figure || !chant) return <Navigate to="/" replace />;

  const canToggleScript = supportsScriptToggle(religion.script);
  const displayVerses: Verse[] =
    canToggleScript && script !== "native"
      ? chant.verses.map((v) => ({ ...v, hi: transliterateFromNative(v.hi, religion.script, script) }))
      : chant.verses;
  const displayNativeTitle =
    canToggleScript && script !== "native"
      ? transliterateFromNative(chant.nativeTitle, religion.script, script)
      : chant.nativeTitle;

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
        {t("back_all_chants_for", { name: figure.name })}
      </Link>

      <div className="deity-header">
        <p className="epithet" style={{ color: religion.color, fontWeight: "bold" }}>
          {chant.typeLabel}
        </p>
        <h1>{chant.title}</h1>
        <p className="epithet">{displayNativeTitle}</p>
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
          🌐 {showTranslation ? t("chant_hide_translation") : t("chant_show_translation")}
        </button>
        <button className="toolbar-btn" onClick={() => toggleFavorite(path)}>
          {isFavorite(path) ? t("chant_favorited") : t("chant_favorite")}
        </button>
        {canToggleScript && <ScriptToggle value={script} onChange={setScript} />}
        {speechSupported && (
          <button className="toolbar-btn" onClick={speaking ? stop : play}>
            {speaking ? t("chant_stop") : t("chant_listen")}
          </button>
        )}
        <button className="toolbar-btn" onClick={() => setReciting(true)}>
          {t("chant_recite_mode")}
        </button>
        <button className="toolbar-btn" onClick={() => window.print()}>
          {t("chant_print")}
        </button>
        <button className="toolbar-btn" onClick={markDoneToday} disabled={doneToday}>
          {doneToday ? t("chant_chanted_today") : t("chant_mark_chanted")}
          {streak > 0 ? t("chant_streak", { n: streak }) : ""}
        </button>
      </div>

      <section className="card">
        {displayVerses.map((verse, i) => (
          <div className="verse" key={i}>
            <p className="hi">{verse.hi}</p>
            {verse.translit && <p className="mantra-translit">{verse.translit}</p>}
            {showTranslation && <p className="en">{verse.en}</p>}
          </div>
        ))}
      </section>

      {reciting && (
        <ReciteMode verses={displayVerses} showTranslation={showTranslation} onClose={() => setReciting(false)} />
      )}
    </div>
  );
}
