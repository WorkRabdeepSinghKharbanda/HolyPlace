---
route: /
entry_point: src/pages/Home.tsx
category: core
---

Grid of religion/tradition cards, plus: chant-of-the-day (deterministic by day-of-year), favorites (if any saved), upcoming festivals, and an occasion browser. `?occasion=<tag>` query param switches the page into a filtered chant list for that tag instead of the default sections — see `src/data/chantIndex.ts`.
