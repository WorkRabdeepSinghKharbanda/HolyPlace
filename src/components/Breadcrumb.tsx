import { Link } from "react-router-dom";

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb no-print" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={c.path}>
          {i > 0 && <span className="breadcrumb-sep">›</span>}
          {i === items.length - 1 ? (
            <span className="breadcrumb-current">{c.name}</span>
          ) : (
            <Link to={c.path}>{c.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
