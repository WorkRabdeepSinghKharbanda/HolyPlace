import { useState } from "react";
import type { Verse } from "../data/religions";

interface ReciteModeProps {
  verses: Verse[];
  showTranslation: boolean;
  onClose: () => void;
}

export default function ReciteMode({ verses, showTranslation, onClose }: ReciteModeProps) {
  const [index, setIndex] = useState(0);
  const verse = verses[index];

  return (
    <div className="recite-overlay">
      <button className="recite-close" onClick={onClose} aria-label="Exit recite mode">
        ✕
      </button>
      <div className="recite-verse">
        <p className="recite-hi">{verse.hi}</p>
        {verse.translit && <p className="recite-translit">{verse.translit}</p>}
        {showTranslation && <p className="recite-en">{verse.en}</p>}
      </div>
      <div className="recite-nav">
        <button disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          ← Prev
        </button>
        <span>
          {index + 1} / {verses.length}
        </span>
        <button disabled={index === verses.length - 1} onClick={() => setIndex((i) => i + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
}
