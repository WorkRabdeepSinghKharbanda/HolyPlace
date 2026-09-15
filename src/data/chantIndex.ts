import { religions, type Chant } from "./religions";

export interface ChantIndexEntry {
  path: string;
  figureName: string;
  figureNativeName: string;
  chant: Chant;
  religionName: string;
  religionColor: string;
  religionScript: string;
}

export const chantIndex: ChantIndexEntry[] = religions.flatMap((r) =>
  r.figures.flatMap((f) =>
    f.chants.map((c) => ({
      path: `/${r.id}/${f.id}/${c.id}`,
      figureName: f.name,
      figureNativeName: f.nativeName,
      chant: c,
      religionName: r.name,
      religionColor: r.color,
      religionScript: r.script,
    }))
  )
);

export function chantByPath(path: string) {
  return chantIndex.find((e) => e.path === path);
}

export function chantsByOccasion(occasion: string) {
  const target = occasion.toLowerCase();
  return chantIndex.filter((e) => e.chant.occasions?.some((o) => o.toLowerCase() === target));
}

export const allOccasions = Array.from(
  new Set(chantIndex.flatMap((e) => e.chant.occasions ?? []))
).sort();

export function dailyChant(): ChantIndexEntry {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return chantIndex[dayOfYear % chantIndex.length];
}
