import type { Chant, Religion } from "../data/religions";

export interface ChantFaqEntry {
  q: string;
  a: string;
}

/**
 * Generates FAQ content entirely from a chant's own verified data — never
 * fabricated. Used both for the visible FAQ block and the FAQPage JSON-LD on
 * ChantPage, so the schema always matches what's actually shown on the page.
 */
export function generateChantFaq(chant: Chant, religion: Religion): ChantFaqEntry[] {
  const faqs: ChantFaqEntry[] = [];

  faqs.push({
    q: `What does ${chant.title} mean?`,
    a: chant.verses.map((v) => v.en).join(" "),
  });

  if (chant.type === "mantra" || chant.type === "stotra") {
    faqs.push({
      q: `How many times should I chant ${chant.title}?`,
      a: "There's no fixed rule. A traditional count of 108 repetitions, kept using a mala (prayer beads), is common for mantras, but even a few repetitions is considered meaningful.",
    });
  }

  if (chant.occasions && chant.occasions.length > 0) {
    faqs.push({
      q: `When is ${chant.title} typically chanted?`,
      a: `It's commonly associated with ${chant.occasions.join(", ")}, though it can be chanted at any time.`,
    });
  }

  faqs.push({
    q: `What script is ${chant.title} written in?`,
    a:
      religion.script === "Devanagari" || religion.script === "Gurmukhi"
        ? `${chant.nativeTitle} is given in ${religion.script}, alongside an English translation. You can also view it transliterated into Tamil, Bengali, Gujarati, Kannada, or Telugu script.`
        : `${chant.nativeTitle} is given in ${religion.script}, alongside an English translation.`,
  });

  return faqs;
}
