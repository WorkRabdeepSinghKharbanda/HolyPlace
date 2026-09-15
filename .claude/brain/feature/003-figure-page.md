---
route: /:religionId/:figureId
entry_point: src/pages/FigurePage.tsx
category: core
---

Grid of chant cards for one figure — one card per mantra/aarti/chalisa/stotra/prayer/shabad — linking to `/:religionId/:figureId/:chantId`. This is the "more chants" view: a figure with multiple texts (e.g. Hanuman: mantra, aarti, chalisa) shows one card per text. Unknown `:religionId`/`:figureId` redirects to `/`.
