import { useEffect, useState } from "react";

/**
 * SSR-safe: always starts from `initial` (matching what the server
 * prerendered) and syncs from localStorage in an effect after mount. Reading
 * localStorage synchronously in the initializer would make the client's
 * first render diverge from the server-rendered HTML whenever a returning
 * visitor has a non-default value stored — a classic hydration mismatch
 * (React error #418), not just a theoretical risk, since every consumer of
 * this hook (language, theme-adjacent prefs, favorites, streak, script
 * choice) affects visible content on a prerendered page.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return;
    try {
      setValue(JSON.parse(stored) as T);
    } catch {
      // ignore malformed stored value, keep initial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
