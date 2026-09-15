import { Link } from "react-router-dom";
import { deities } from "../data/deities";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <div>
      <Seo
        title="HolyPlace — Aarti & Mantra Chants"
        description="Aarti and mantra chants for the Hindu deities, in Devanagari with English translation."
        path="/"
        breadcrumb={[{ name: "Home", path: "/" }]}
      />
      <div className="hero">
        <h1>HolyPlace</h1>
        <p>Aarti and mantra chants for the deities, with English translation.</p>
      </div>
      <div className="deity-grid">
        {deities.map((d) => (
          <Link key={d.id} to={`/deity/${d.id}`} className="deity-card">
            <span className="sanskrit">{d.sanskritName}</span>
            <span className="name">{d.name}</span>
            <span className="epithet">{d.epithet}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
