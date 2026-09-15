import { useRef } from "react";

const THRESHOLD = 60;

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta <= -THRESHOLD) onSwipeLeft();
    else if (delta >= THRESHOLD) onSwipeRight();
    startX.current = null;
  };

  return { onTouchStart, onTouchEnd };
}
