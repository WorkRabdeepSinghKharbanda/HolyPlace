import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getChant, getFigure, getReligion, type Verse } from "../data/religions";
import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";
import ReciteMode from "../components/ReciteMode";
import ScriptToggle from "../components/ScriptToggle";
import ShareButton from "../components/ShareButton";
import { useFavorites } from "../hooks/useFavorites";
import { useSpeech } from "../hooks/useSpeech";
import { usePracticeStreak } from "../hooks/usePracticeStreak";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSwipe } from "../hooks/useSwipe";
import { supportsScriptToggle, transliterateFromNative } from "../lib/transliterate";
import { generateChantFaq } from "../lib/chantFaq";
import { postsForChant } from "../data/blog";
import { useLang } from "../context/LangContext";

const SITE = "https://holyplace.vercel.app";

const SPEECH_LANG: Record<string, string> = {
  Devanagari: "hi-IN",
  Gurmukhi: "pa-IN",
  Latin: "la",
};

export default function ChantPage() {
  const { religionId, figureId, chantId } = useParams();
  const navigate = useNavigate();
  const religion = religionId ? getReligion(religionId) : undefined;
  const figure = religionId && figureId ? getFigure(religionId, figureId) : undefined;
  const chant = religionId && figureId && chantId ? getChant(religionId, figureId, chantId) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);
  const [reciting, setReciting] = useState(false);
  const [script, setScript] = useLocalStorage("holyplace-script", "native");
  const [, setLastVisited] = useLocalStorage<string | null>("holyplace-last-visited", null);
  const [copied, setCopied] = useState(false);
  const [activeVerse, setActiveVerse] = useState(0);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { t } = useLang();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { streak, doneToday, markDoneToday } = usePracticeStreak();
  const path = religion && figure && chant ? `/${religion.id}/${figure.id}/${chant.id}` : "";
  const { supported: speechSupported, speaking, play, stop } = useSpeech(
    chant?.verses.map((v) => v.hi) ?? [],
    religion ? SPEECH_LANG[religion.script] ?? "en-US" : "en-US"
  );

  useEffect(() => {
    if (path) setLastVisited(path);
  }, [path, setLastVisited]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const idx = verseRefs.current.findIndex((el) => el === visible[0].target);
          if (idx !== -1) setActiveVerse(idx);
        }
      },
      { threshold: [0.5, 0.75], rootMargin: "-20% 0px -40% 0px" }
    );
    verseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [chant]);

  const swipeHandlers = useSwipe(
    () => {
      if (!figure || !religion || !chant) return;
      const idx = figure.chants.findIndex((c) => c.id === chant.id);
      const next = figure.chants[idx + 1];
      if (next) navigate(`/${religion.id}/${figure.id}/${next.id}`);
    },
    () => {
      if (!figure || !religion || !chant) return;
      const idx = figure.chants.findIndex((c) => c.id === chant.id);
      const prev = figure.chants[idx - 1];
      if (prev) navigate(`/${religion.id}/${figure.id}/${prev.id}`);
    }
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

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: religion.name, path: `/${religion.id}` },
    { name: figure.name, path: `/${religion.id}/${figure.id}` },
    { name: chant.title, path },
  ];

  const faqs = generateChantFaq(chant, religion);
  const guides = postsForChant(religion.id, figure.id, chant.id);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const copyChant = async () => {
    const text = displayVerses
      .map((v) => `${v.hi}${v.translit ? `\n${v.translit}` : ""}${showTranslation ? `\n${v.en}` : ""}`)
      .join("\n\n");
    await navigator.clipboard.writeText(`${chant.title} (${displayNativeTitle})\n\n${text}\n\n${SITE}${path}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div {...swipeHandlers}>
      <Seo
        title={`${chant.title} Lyrics in English with Meaning — ${figure.name} ${chant.typeLabel} — HolyPlace`}
        description={`${chant.nativeTitle} (${chant.title}): ${chant.typeLabel.toLowerCase()} for ${figure.name} with full lyrics, transliteration, and English translation.`}
        path={path}
        breadcrumb={breadcrumb}
        extraJsonLd={[{ id: "ld-faq", data: faqJsonLd }]}
      />
      <Breadcrumb items={breadcrumb} />
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
        <button className="toolbar-btn" onClick={copyChant}>
          {copied ? t("chant_copied") : t("chant_copy")}
        </button>
        <ShareButton
          religionName={religion.name}
          figureName={figure.name}
          chantTitle={chant.title}
          nativeTitle={displayNativeTitle}
          firstVerseHi={displayVerses[0].hi}
          url={`${SITE}${path}`}
        />
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
          <div
            className={`verse ${i === activeVerse ? "verse-active" : ""}`}
            key={i}
            ref={(el) => {
              verseRefs.current[i] = el;
            }}
          >
            <p className="hi">{verse.hi}</p>
            {verse.translit && <p className="mantra-translit">{verse.translit}</p>}
            {showTranslation && <p className="en">{verse.en}</p>}
          </div>
        ))}
      </section>

      {reciting && (
        <ReciteMode verses={displayVerses} showTranslation={showTranslation} onClose={() => setReciting(false)} />
      )}

      <section className="card blog-post no-print">
        <h2>FAQ</h2>
        {faqs.map((f, i) => (
          <div key={i} className="faq-item">
            <p className="faq-q">{f.q}</p>
            <p className="faq-a">{f.a}</p>
          </div>
        ))}
      </section>

      {guides.length > 0 && (
        <section className="home-section no-print">
          <h2>Related guides</h2>
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
