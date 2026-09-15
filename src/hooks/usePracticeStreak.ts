import { useLocalStorage } from "./useLocalStorage";

interface StreakState {
  lastDate: string | null; // yyyy-mm-dd
  count: number;
}

const todayStr = () => new Date().toISOString().slice(0, 10);

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

export function usePracticeStreak() {
  const [state, setState] = useLocalStorage<StreakState>("holyplace-streak", { lastDate: null, count: 0 });

  const today = todayStr();
  const doneToday = state.lastDate === today;

  const markDoneToday = () => {
    if (doneToday) return;
    setState((prev) => {
      const isConsecutive = prev.lastDate !== null && daysBetween(prev.lastDate, today) === 1;
      return { lastDate: today, count: isConsecutive ? prev.count + 1 : 1 };
    });
  };

  return { streak: state.count, doneToday, markDoneToday };
}
