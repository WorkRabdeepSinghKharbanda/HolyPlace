import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";
import { religions } from "../data/religions";
import SearchBox from "./SearchBox";
import LangSwitcher from "./LangSwitcher";
import FontSizeControl from "./FontSizeControl";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const location = useLocation();

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
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
            Guides
          </NavLink>
        </nav>
        <div className="header-controls">
          <SearchBox />
          <FontSizeControl />
          <LangSwitcher />
          <button className="theme-toggle no-print" onClick={toggleTheme} aria-label={t("toggle_theme")} title={t("toggle_theme")}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>
      <main key={location.pathname} className="page-transition">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>{t("footer_text")}</p>
        <p className="footer-links">
          <NavLink to="/blog">Guides</NavLink>
          {religions.map((r) => (
            <NavLink key={r.id} to={`/${r.id}`}>
              {r.name}
            </NavLink>
          ))}
          <NavLink to="/about">About</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
        </p>
      </footer>
    </div>
  );
}
