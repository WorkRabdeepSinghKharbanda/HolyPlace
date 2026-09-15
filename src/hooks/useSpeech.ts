import { useEffect, useRef, useState } from "react";

/**
 * Plays a list of lines via the browser's built-in SpeechSynthesis — no audio
 * files, no TTS service, no dependency. Voice quality/language coverage
 * depends entirely on the browser/OS voices installed; Sanskrit/Gurmukhi/Latin
 * text is read phonetically by whatever voice matches `lang`, not a native
 * speaker recording. This is a free stopgap, not a substitute for real audio.
 */
export function useSpeech(lines: string[], lang: string) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const linesRef = useRef(lines);

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const play = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    let i = 0;
    const speakNext = () => {
      if (i >= linesRef.current.length) {
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(linesRef.current[i]);
      utterance.lang = lang;
      utterance.onend = () => {
        i += 1;
        speakNext();
      };
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };
    setSpeaking(true);
    speakNext();
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  return { supported, speaking, play, stop };
}
