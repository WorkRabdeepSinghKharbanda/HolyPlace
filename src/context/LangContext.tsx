import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { translations, type LangId, type TranslationKey } from "../i18n/translations";

interface LangContextValue {
  lang: LangId;
  setLang: (lang: LangId) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), template);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<LangId>("holyplace-lang", "en");

  const t = (key: TranslationKey, vars?: Record<string, string | number>) =>
    interpolate(translations[lang][key], vars);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
