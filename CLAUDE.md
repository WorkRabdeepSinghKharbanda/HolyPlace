New session in this repo — read in this order before doing anything else:
1. This file (CLAUDE.md).
2. Everything in .claude/rules/ (branching.md, brain-sync.md, any others).
3. .claude/brain/feature/000-index.md — full feature/route inventory.
4. .claude/docs/features.md and .claude/docs/gotchas.md — feature implementation notes and real bugs hit, kept out of this file so it stays a short architecture overview rather than a growing feature log.
5. Only then start the task.

# HolyPlace

Personal devotional site: chants across religious traditions (Hinduism,
Sikhism, Christianity, Buddhism) — mantra, aarti, chalisa, prayer — in the
original script with toggleable English translation, gold-themed
light/dark UI.

## Stack

React 19 + TypeScript, Vite build, React Router. No backend — content lives
in `src/data/religions.ts` and `src/data/blog.ts`. **Every route is
statically prerendered at build time** (react-dom/server + a StaticRouter
pass per route — see "Prerendering" below); the app still hydrates and
behaves as an SPA after that. Deployed to Vercel via CLI
(`npx vercel --prod --yes`), not git-integrated. Git remote:
github.com/WorkRabdeepSinghKharbanda/HolyPlace, direct-to-master (see
`.claude/rules/branching.md`).

## Content model

`religions.ts` is a 3-level tree: `Religion` (e.g. Hinduism) → `Figure`
(e.g. Ganesha, Waheguru, Jesus Christ, Buddha) → `Chant` (e.g. mantra,
aarti, chalisa, prayer, shabad — the `type`/`typeLabel` fields drive the
card label). A figure can have any number of chants; the figure page
renders one card per chant, so adding a new chant to an existing figure is
just appending to its `chants` array — no route or page change needed.
Adding a whole new religion or figure is the same: append to the array,
nav/routes follow automatically.

`Verse.translit` is optional — mantras use it (single verse, Devanagari +
transliteration + meaning), longer aarti/chalisa/prayer texts generally
don't (multi-line native text is self-contained).

`Chant.occasions` (optional tag array) and `src/data/festivals.ts` are the
two other content-adjacent data files — see `.claude/docs/features.md` for
how they're used.

## Prerendering

Build pipeline (`npm run build`): `tsc -b && vite build` (client bundle) →
`vite build --ssr src/entry-server.tsx --outDir dist-server` (SSR bundle) →
`node scripts/prerender.mjs` (walks every route from `scripts/routes.mjs`,
calls `render()` from the SSR bundle, injects meta from `getPageMeta()` —
also re-exported from the SSR bundle, see gotchas — into a copy of
`dist/index.html`, writes one `dist/<route>/index.html` per route).

- `src/entry-server.tsx` — the SSR render entry (`renderToString` +
  `StaticRouter`), also re-exports `getPageMeta` so the prerender script
  only needs one Vite-built bundle to import from.
- `src/lib/pageMeta.ts` — pure, server-safe per-route title/description/
  canonical/JSON-LD. This is what prerendering actually uses — the client
  `<Seo/>` component's `useEffect` never runs during `renderToString`, so
  it plays no part in the static output. Keep both in sync; see gotchas.
- `main.tsx` uses `hydrateRoot` when `#root` already has prerendered
  children, `createRoot` otherwise (so plain `vite dev` still works).
- Vercel serves a static file that exists on disk before falling back to
  `vercel.json`'s SPA rewrite, so the prerendered `dist/<route>/index.html`
  files are what crawlers/social unfurlers/curl actually see — not a
  generic shell.

## Folder structure

- `src/data/religions.ts` — single source of truth for all chant content.
- `src/data/blog.ts` — guide/blog posts (meaning, benefits, festival guides,
  a beginner glossary). Each post has structured sections (what it is / how
  to use / benefits / limitations / use cases / tips / FAQ), `relatedLinks`
  into `religions.ts`, and `relatedPosts` (other post slugs) for
  cross-linking. `sectionTitles` can override a section's heading per-post
  (used by the glossary, whose "how to" section is really a term list).
- `scripts/routes.mjs` — single source of truth for "every route this site
  has," consumed by both `gen-seo.mjs` and `prerender.mjs` so they can't
  enumerate a different route set from each other.
- `src/data/chantIndex.ts` — flat derived index over `religions.ts` (one
  entry per chant), reused by search, daily-chant, occasion filter, and
  favorites/last-visited lookups. Add new cross-cutting chant lookups here
  rather than re-flattening `religions` in each component.
- `src/context/ThemeContext.tsx` / `LangContext.tsx` — theme and UI
  language, both persisted to localStorage.
- `src/components/Layout.tsx` — header/nav/footer shell, renders
  `<Outlet/>`. Nav links are generated from the `religions` array (top
  level only — figures and chants are one level down, not in the nav).
- `src/components/SearchBox.tsx` — global search in the header, built from
  `chantIndex.ts` plus a figure-level list, filtered client-side.
- `src/pages/Home.tsx` — grid of religion cards → `/:religionId`.
- `src/pages/ReligionPage.tsx` — grid of figure cards → `/:religionId/:figureId`.
- `src/pages/FigurePage.tsx` — grid of chant cards (the "more chants" view)
  → `/:religionId/:figureId/:chantId`.
- `src/pages/ChantPage.tsx` — full text of one chant; this is where most
  per-chant features live (favorites, listen, recite mode, share, etc. —
  see `.claude/docs/features.md`).
- `App.tsx` — route table: `/`, `/:religionId`, `/:religionId/:figureId`,
  `/:religionId/:figureId/:chantId`.

## Control flow

1. `main.tsx` wraps the app in `ThemeProvider`, `LangProvider`, then
   `BrowserRouter`.
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

## See also

- `.claude/docs/features.md` — how every user-facing feature beyond the
  core read/browse view actually works (favorites, streak, listen, share,
  offline, i18n, mobile header, SEO/ads wiring, etc.).
- `.claude/docs/gotchas.md` — real bugs hit and how they were fixed; read
  before touching the areas they name.
- `.claude/rules/branching.md` — deploy mechanism, no-PR workflow.
- `.claude/rules/brain-sync.md` — when a brain file needs updating vs. not.
