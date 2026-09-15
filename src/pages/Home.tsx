import { Link } from "react-router-dom";
import { deities } from "../data/deities";

export default function Home() {
  return (
    <div>
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
