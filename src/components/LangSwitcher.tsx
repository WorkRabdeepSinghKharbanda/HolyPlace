import { useLang } from "../context/LangContext";
import { LANGUAGES, type LangId } from "../i18n/translations";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => setLang(e.target.value as LangId)}
      aria-label="Language"
    >
      {LANGUAGES.map((l) => (
        <option key={l.id} value={l.id}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
