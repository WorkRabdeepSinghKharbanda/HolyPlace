import { useState } from "react";
import { generateShareCard } from "../lib/shareImage";
import { useLang } from "../context/LangContext";

interface ShareButtonProps {
  religionName: string;
  figureName: string;
  chantTitle: string;
  nativeTitle: string;
  firstVerseHi: string;
  url: string;
}

export default function ShareButton({ religionName, figureName, chantTitle, nativeTitle, firstVerseHi, url }: ShareButtonProps) {
  const [busy, setBusy] = useState(false);
  const { t } = useLang();

  const handleShare = async () => {
    setBusy(true);
    try {
      const blob = await generateShareCard({ religionName, figureName, chantTitle, nativeTitle, firstVerseHi });
      const shareText = `I found this ${chantTitle} for ${figureName} on HolyPlace — it has mantras, aarti, and chants across traditions. ${url}`;
      const file = new File([blob], "holyplace-chant.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "HolyPlace", text: shareText });
        return;
      }

      // Desktop / unsupported browsers can't attach a file via the WhatsApp
      // web share URL — download the image and open a prefilled WhatsApp
      // chat with the text so the user can attach it manually.
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "holyplace-chant.png";
      link.click();
      URL.revokeObjectURL(link.href);
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    } catch {
      // user cancelled the native share sheet — no-op
    } finally {
      setBusy(false);
    }
  };

  return (
    <button className="toolbar-btn" onClick={handleShare} disabled={busy}>
      {busy ? "…" : t("chant_share")}
    </button>
  );
}
