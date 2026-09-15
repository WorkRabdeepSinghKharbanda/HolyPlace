import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { religions } from "../data/religions";

interface SearchEntry {
  path: string;
  label: string;
  sublabel: string;
  religionColor: string;
  haystack: string;
}

const index: SearchEntry[] = religions.flatMap((r) =>
  r.figures.flatMap((f) => [
    {
      path: `/${r.id}/${f.id}`,
      label: f.name,
      sublabel: `${r.name} · ${f.nativeName}`,
      religionColor: r.color,
      haystack: `${f.name} ${f.nativeName} ${f.epithet} ${r.name}`.toLowerCase(),
    },
    ...f.chants.map((c) => ({
      path: `/${r.id}/${f.id}/${c.id}`,
      label: `${f.name} — ${c.title}`,
      sublabel: `${r.name} · ${c.typeLabel} · ${c.nativeTitle}`,
      religionColor: r.color,
      haystack: `${f.name} ${f.nativeName} ${c.title} ${c.nativeTitle} ${c.typeLabel} ${r.name} ${r.script}`.toLowerCase(),
    })),
  ])
);

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((entry) => entry.haystack.includes(q)).slice(0, 12);
  }, [query]);

  const goTo = (path: string) => {
    navigate(path);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="search-box">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search deity, chant, or script…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && results.length > 0) goTo(results[0].path);
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && query.trim() !== "" && (
        <ul className="search-results">
          {results.length === 0 ? (
            <li className="search-empty">No matches for "{query}"</li>
          ) : (
            results.map((r) => (
              <li key={r.path}>
                <button onMouseDown={() => goTo(r.path)}>
                  <span className="search-label" style={{ borderColor: r.religionColor }}>
                    {r.label}
                  </span>
                  <span className="search-sublabel">{r.sublabel}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
