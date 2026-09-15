import { Link, useSearchParams } from "react-router-dom";
import { religions } from "../data/religions";
import { allOccasions, chantByPath, chantsByOccasion, dailyChant } from "../data/chantIndex";
import { upcomingFestivals } from "../data/festivals";
import { useFavorites } from "../hooks/useFavorites";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Seo from "../components/Seo";
import ReminderWidget from "../components/ReminderWidget";
import { useLang } from "../context/LangContext";

export default function Home() {
  const [searchParams] = useSearchParams();
  const occasion = searchParams.get("occasion");
  const { favorites } = useFavorites();
  const daily = dailyChant();
  const festivals = upcomingFestivals();
  const { t } = useLang();
  const [lastVisited] = useLocalStorage<string | null>("holyplace-last-visited", null);
  const lastEntry = lastVisited ? chantByPath(lastVisited) : undefined;

  return (
    <div>
      <Seo
        title="HolyPlace — Aarti, Mantra & Prayer Chants"
        description="Devotional chants across traditions — aarti, mantra, chalisa, and prayer, in the original script with English translation."
        path="/"
        breadcrumb={[{ name: "Home", path: "/" }]}
      />
      <div className="hero">
        <h1>HolyPlace</h1>
        <p>{t("home_subtitle")}</p>
      </div>

      {occasion ? (
        <section className="home-section">
          <h2>{t("home_chants_for", { occasion })}</h2>
          <div className="deity-grid">
            {chantsByOccasion(occasion).map((e) => (
              <Link key={e.path} to={e.path} className="deity-card">
                <span className="epithet" style={{ color: e.religionColor, fontWeight: "bold" }}>
                  {e.chant.typeLabel}
                </span>
                <span className="name">{e.figureName}</span>
                <span className="epithet">{e.chant.title}</span>
              </Link>
            ))}
            {chantsByOccasion(occasion).length === 0 && <p className="epithet">{t("home_no_chants_tagged")}</p>}
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link to="/" className="back-link" style={{ margin: 0 }}>
              {t("home_clear_filter")}
            </Link>
          </p>
        </section>
      ) : (
        <>
          {lastEntry && (
            <section className="home-section">
              <h2>{t("home_continue")}</h2>
              <Link to={lastEntry.path} className="deity-card" style={{ display: "block", maxWidth: 360 }}>
                <span className="epithet" style={{ color: lastEntry.religionColor, fontWeight: "bold" }}>
                  {lastEntry.chant.typeLabel} · {lastEntry.religionName}
                </span>
                <span className="name">{lastEntry.figureName}</span>
                <span className="epithet">{lastEntry.chant.title}</span>
              </Link>
            </section>
          )}

          <section className="home-section">
            <h2>{t("home_chant_of_day")}</h2>
            <Link to={daily.path} className="deity-card" style={{ display: "block", maxWidth: 360 }}>
              <span className="epithet" style={{ color: daily.religionColor, fontWeight: "bold" }}>
                {daily.chant.typeLabel} · {daily.religionName}
              </span>
              <span className="name">{daily.figureName}</span>
              <span className="epithet">{daily.chant.title}</span>
            </Link>
          </section>

          <section className="home-section">
            <h2>{t("home_reminder_title")}</h2>
            <ReminderWidget />
          </section>

          {favorites.length > 0 && (
            <section className="home-section">
              <h2>{t("home_favorites")}</h2>
              <div className="deity-grid">
                {favorites.map((path) => {
                  const entry = chantByPath(path);
                  if (!entry) return null;
                  return (
                    <Link key={path} to={path} className="deity-card">
                      <span className="epithet" style={{ color: entry.religionColor, fontWeight: "bold" }}>
                        {entry.chant.typeLabel}
                      </span>
                      <span className="name">{entry.figureName}</span>
                      <span className="epithet">{entry.chant.title}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section className="home-section">
            <h2>{t("home_upcoming_festivals")}</h2>
            <ul className="festival-list">
              {festivals.map((f) => (
                <li key={f.name}>
                  <Link to={f.path}>{f.name}</Link>
                  <span className="festival-date">
                    {new Date(f.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="home-section">
            <h2>{t("home_browse_occasion")}</h2>
            <div className="occasion-chip-row">
              {allOccasions.map((o) => (
                <Link key={o} to={`/?occasion=${encodeURIComponent(o)}`} className="occasion-chip">
                  {o}
                </Link>
              ))}
            </div>
          </section>

          <section className="home-section">
            <h2>{t("home_traditions")}</h2>
            <div className="deity-grid">
              {religions.map((r) => (
                <Link key={r.id} to={`/${r.id}`} className="deity-card" style={{ borderColor: "transparent" }}>
                  <span className="name" style={{ fontSize: "1.1rem", color: r.color }}>
                    {r.name}
                  </span>
                  <span className="epithet">{r.tagline}</span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
