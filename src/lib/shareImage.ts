// Draws a shareable card with the native-script text on a canvas — no
// server, no image library. Font coverage for Devanagari/Gurmukhi glyphs
// depends on the OS's installed fonts (best-effort, same tradeoff as the
// favicon rendering), not guaranteed pixel-perfect on every device.
interface ShareCardInput {
  religionName: string;
  figureName: string;
  chantTitle: string;
  nativeTitle: string;
  firstVerseHi: string;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function generateShareCard(input: ShareCardInput): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(540, 400, 100, 540, 540, 800);
  gradient.addColorStop(0, "#3a2a12");
  gradient.addColorStop(1, "#14110c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = "#c9962c";
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1000, 1000);

  ctx.textAlign = "center";
  ctx.fillStyle = "#c9962c";
  ctx.font = "bold 48px Georgia, serif";
  ctx.fillText("🕉 HolyPlace", 540, 150);

  ctx.fillStyle = "#e6d8b8";
  ctx.font = "28px Georgia, serif";
  ctx.fillText(`${input.religionName} · ${input.figureName}`, 540, 210);

  ctx.fillStyle = "#f6dd9c";
  ctx.font = "44px Georgia, 'Noto Sans Devanagari', 'Noto Sans Gurmukhi', serif";
  const titleLines = wrapText(ctx, input.nativeTitle, 880);
  let y = 340;
  for (const line of titleLines.slice(0, 2)) {
    ctx.fillText(line, 540, y);
    y += 60;
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "36px Georgia, 'Noto Sans Devanagari', 'Noto Sans Gurmukhi', serif";
  const verseLines = wrapText(ctx, input.firstVerseHi.split("\n")[0], 880);
  y += 40;
  for (const line of verseLines.slice(0, 6)) {
    ctx.fillText(line, 540, y);
    y += 52;
  }

  ctx.fillStyle = "#b8a988";
  ctx.font = "italic 26px Georgia, serif";
  ctx.fillText(`"${input.chantTitle}"`, 540, 900);

  ctx.fillStyle = "#c9962c";
  ctx.font = "24px Georgia, serif";
  ctx.fillText("Find more mantras & chants at holyplace.vercel.app", 540, 990);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("canvas export failed"))), "image/png");
  });
}
