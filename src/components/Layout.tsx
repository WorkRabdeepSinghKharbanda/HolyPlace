import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";
import { religions } from "../data/religions";
import SearchBox from "./SearchBox";
import LangSwitcher from "./LangSwitcher";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          🕉 HolyPlace
        </NavLink>
        <nav className="nav-links">
          {religions.map((r) => (
            <NavLink key={r.id} to={`/${r.id}`} className={({ isActive }) => (isActive ? "active" : "")}>
              {r.name}
            </NavLink>
          ))}
        </nav>
        <SearchBox />
        <LangSwitcher />
        <button className="theme-toggle" onClick={toggleTheme} aria-label={t("toggle_theme")} title={t("toggle_theme")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>{t("footer_text")}</p>
      </footer>
    </div>
  );
}
