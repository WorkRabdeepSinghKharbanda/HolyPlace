New session in this repo — read in this order before doing anything else:
1. This file (CLAUDE.md).
2. Everything in .claude/rules/ (branching.md, brain-sync.md, any others).
3. .claude/brain/feature/000-index.md — full feature/route inventory.
4. Only then start the task.

# HolyPlace

Personal devotional site: chants across religious traditions (Hinduism,
Sikhism, Christianity) — mantra, aarti, chalisa, prayer — in the original
script with toggleable English translation, gold-themed light/dark UI.

## Stack

React 19 + TypeScript, Vite build, React Router (client-side, no SSR/SSG).
No backend — all content lives in `src/data/religions.ts`. Deployed to
Vercel via CLI (`npx vercel --prod --yes`), not git-integrated.

## Content model

`religions.ts` is a 3-level tree: `Religion` (e.g. Hinduism) → `Figure`
(e.g. Ganesha, Waheguru, Jesus Christ) → `Chant` (e.g. mantra, aarti,
chalisa, prayer, shabad — the `type`/`typeLabel` fields drive the card
label). A figure can have any number of chants; the figure page renders
one card per chant, so adding a new chant to an existing figure is just
appending to its `chants` array — no route or page change needed. Adding a
whole new religion or figure is the same: append to the array, nav/routes
follow automatically.

`Verse.translit` is optional — mantras use it (single verse, Devanagari +
transliteration + meaning), longer aarti/chalisa/prayer texts generally
don't (multi-line native text is self-contained).

## Folder structure

- `src/data/religions.ts` — single source of truth for all content.
- `src/context/ThemeContext.tsx` — light/dark theme, persisted to
  `localStorage` under `holyplace-theme`, defaults to OS preference.
- `src/components/Layout.tsx` — header/nav/footer shell, renders `<Outlet/>`.
  Nav links are generated from the `religions` array (top level only —
  figures and chants are one level down, not in the nav).
- `src/components/SearchBox.tsx` — global search in the header. Builds a
  flat in-memory index (figure name/native name/epithet + every chant
  title/native title/type/religion) from `religions` once at module load,
  filters client-side on keystroke, no debounce needed at this data size.
  Not a route — lives on every page via `Layout`.
- `src/pages/Home.tsx` — grid of religion cards → `/:religionId`.
- `src/pages/ReligionPage.tsx` — grid of figure cards → `/:religionId/:figureId`.
- `src/pages/FigurePage.tsx` — grid of chant cards (the "more chants" view)
  → `/:religionId/:figureId/:chantId`.
- `src/pages/ChantPage.tsx` — full text of one chant, with a local
  (non-global) English-translation toggle.
- `App.tsx` — route table: `/`, `/:religionId`, `/:religionId/:figureId`,
  `/:religionId/:figureId/:chantId`.

## Control flow

1. `main.tsx` wraps the app in `ThemeProvider` then `BrowserRouter`.
2. `App.tsx` routes render inside `Layout`, which reads `religions` for nav.
3. Each page resolves its param(s) via `getReligion`/`getFigure`/`getChant`;
   any unresolvable id at any level redirects to `/`.
4. `vercel.json` rewrites all paths to `/index.html` so client routes don't
   404 on direct load/refresh in production — this is a CSR SPA, so without
   this rewrite a hard refresh on any nested page returns Vercel's 404.
5. `scripts/gen-seo.mjs` walks the same `religions` tree to regenerate
   `public/sitemap.xml` and `public/llms.txt` on every `prebuild` — these
   can't drift from the real route list because they're generated from it,
   not hand-maintained.

## Gotchas (real, hit already)

- **Vercel project name must be lowercase** — the folder is `HolyPlace`
  (capital H/P), and `vercel --prod --yes` failed on the first deploy with
  a 400 because the auto-derived project name had uppercase letters. Deploy
  used `--name holyplace` (deprecated flag, still works) to force a valid
  name once; the project is now linked via `.vercel/project.json`, so plain
  `npx vercel --prod --yes` works from here on without the flag.
- **CSR-only, no prerendering** — anything relying on per-route `<head>`
  meta (title, description, OG tags) will only ever be `index.html`'s static
  head unless SSR/prerendering is added. Non-JS crawlers see one generic
  head for every route, not per-deity content.
