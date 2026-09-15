import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Client-side daily reminder. This is NOT a real push notification — there is
 * no backend push server, so it only fires while this site is open in a
 * browser tab (checked every 30s). Closing the tab/browser means it won't
 * fire. A true "notify me even when the app is closed" reminder needs a
 * push server (web-push + a backend to hold subscriptions), which is a real
 * infra addition, not something a static site can do alone.
 */
export function useReminder() {
  const [time, setTime] = useLocalStorage<string | null>("holyplace-reminder-time", null);
  const [lastFired, setLastFired] = useLocalStorage<string | null>("holyplace-reminder-last-fired", null);
  const supported = typeof window !== "undefined" && "Notification" in window;
  const permission = supported ? Notification.permission : "denied";

  const enable = async (hhmm: string) => {
    if (!supported) return;
    if (Notification.permission !== "granted") {
      const result = await Notification.requestPermission();
      if (result !== "granted") return;
    }
    setTime(hhmm);
  };

  const disable = () => setTime(null);

  useEffect(() => {
    if (!supported || !time || Notification.permission !== "granted") return;
    const interval = setInterval(() => {
      const now = new Date();
      const hhmm = now.toTimeString().slice(0, 5);
      const today = now.toISOString().slice(0, 10);
      if (hhmm === time && lastFired !== today) {
        new Notification("HolyPlace", { body: "Time for your daily chant 🙏" });
        setLastFired(today);
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, [supported, time, lastFired, setLastFired]);

  return { supported, permission, time, enable, disable };
}
