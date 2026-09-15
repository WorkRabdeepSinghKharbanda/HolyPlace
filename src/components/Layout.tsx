import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { religions } from "../data/religions";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

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
