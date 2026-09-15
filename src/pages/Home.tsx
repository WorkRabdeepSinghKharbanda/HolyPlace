import { Link } from "react-router-dom";
import { religions } from "../data/religions";
import Seo from "../components/Seo";

export default function Home() {
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
        <p>Devotional chants across traditions, with English translation.</p>
      </div>
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
    </div>
  );
}
