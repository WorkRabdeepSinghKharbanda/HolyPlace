import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const MIN = 0.85;
const MAX = 1.5;
const STEP = 0.1;

export function useFontScale() {
  const [scale, setScale] = useLocalStorage("holyplace-font-scale", 1);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
  }, [scale]);

  const smaller = () => setScale((s) => Math.max(MIN, Math.round((s - STEP) * 100) / 100));
  const larger = () => setScale((s) => Math.min(MAX, Math.round((s + STEP) * 100) / 100));

  return { scale, smaller, larger, atMin: scale <= MIN, atMax: scale >= MAX };
}
