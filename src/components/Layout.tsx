import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { deities } from "../data/deities";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          🕉 HolyPlace
        </NavLink>
        <nav className="nav-links">
          {deities.map((d) => (
            <NavLink key={d.id} to={`/deity/${d.id}`} className={({ isActive }) => (isActive ? "active" : "")}>
              {d.name}
            </NavLink>
          ))}
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Aarti & mantra texts are shared devotionally in the traditional public domain.</p>
      </footer>
    </div>
  );
}
