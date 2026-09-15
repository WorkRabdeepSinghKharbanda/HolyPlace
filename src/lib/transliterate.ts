import Sanscript from "@indic-transliteration/sanscript";

export interface ScriptOption {
  id: string;
  label: string;
  sanscriptScheme: string;
}

// Only offered for religions whose native script is Brahmic (Devanagari,
// Gurmukhi) — Sanscript maps between Brahmic scripts mechanically via a
// shared phonetic model, so this is a real transliteration, not a guess.
export const SCRIPT_OPTIONS: ScriptOption[] = [
  { id: "tamil", label: "Tamil", sanscriptScheme: "tamil" },
  { id: "bengali", label: "Bengali", sanscriptScheme: "bengali" },
  { id: "gujarati", label: "Gujarati", sanscriptScheme: "gujarati" },
  { id: "kannada", label: "Kannada", sanscriptScheme: "kannada" },
  { id: "telugu", label: "Telugu", sanscriptScheme: "telugu" },
];

const NATIVE_SCHEME: Record<string, string> = {
  Devanagari: "devanagari",
  Gurmukhi: "gurmukhi",
};

export function supportsScriptToggle(religionScript: string) {
  return religionScript in NATIVE_SCHEME;
}

export function transliterateFromNative(text: string, religionScript: string, targetScriptId: string): string {
  const from = NATIVE_SCHEME[religionScript];
  const option = SCRIPT_OPTIONS.find((o) => o.id === targetScriptId);
  if (!from || !option) return text;
  // Sanscript operates line-by-line cleanly; multi-line verses pass straight through.
  return Sanscript.t(text, from, option.sanscriptScheme);
}
