import { Link, Navigate, useParams } from "react-router-dom";
import { getReligion } from "../data/religions";
import Seo from "../components/Seo";

export default function ReligionPage() {
  const { religionId } = useParams();
  const religion = religionId ? getReligion(religionId) : undefined;

  if (!religion) return <Navigate to="/" replace />;

  return (
    <div>
      <Seo
        title={`${religion.name} — Chants & Prayers — HolyPlace`}
        description={`${religion.tagline}. ${religion.script} texts with English translation.`}
        path={`/${religion.id}`}
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: religion.name, path: `/${religion.id}` },
        ]}
      />
      <Link to="/" className="back-link">
        ← All traditions
      </Link>

      <div className="deity-header">
        <h1 style={{ color: religion.color }}>{religion.name}</h1>
        <p className="epithet">{religion.tagline}</p>
      </div>

      <div className="deity-grid">
        {religion.figures.map((f) => (
          <Link key={f.id} to={`/${religion.id}/${f.id}`} className="deity-card">
            <span className="sanskrit" style={{ color: religion.color }}>
              {f.nativeName}
            </span>
            <span className="name">{f.name}</span>
            <span className="epithet">{f.epithet}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
