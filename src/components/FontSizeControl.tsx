import { useFontScale } from "../hooks/useFontScale";

export default function FontSizeControl() {
  const { smaller, larger, atMin, atMax } = useFontScale();

  return (
    <div className="font-size-control no-print">
      <button onClick={smaller} disabled={atMin} aria-label="Decrease text size">
        A−
      </button>
      <button onClick={larger} disabled={atMax} aria-label="Increase text size">
        A+
      </button>
    </div>
  );
}
