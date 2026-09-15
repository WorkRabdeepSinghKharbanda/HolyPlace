---
route: /:religionId/:figureId/:chantId
entry_point: src/pages/ChantPage.tsx
category: core
---

Full text of one chant, with: English-translation toggle, favorite toggle (localStorage), listen (native SpeechSynthesis, no audio files), recite mode (fullscreen verse-by-verse), print button, and a global practice streak ("mark as chanted today"). Occasion tags link back to `/?occasion=<tag>`. Unknown id at any level redirects to `/`.
