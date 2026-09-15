New session in this repo — read in this order before doing anything else:
1. This file (CLAUDE.md).
2. Everything in .claude/rules/ (branching.md, brain-sync.md, any others).
3. .claude/brain/feature/000-index.md — full feature/route inventory.
4. Only then start the task.

# HolyPlace

Personal devotional site: Hindu deity aarti and mantra chants, Devanagari text
with toggleable English translation, gold-themed light/dark UI.

## Stack

React 19 + TypeScript, Vite build, React Router (client-side, no SSR/SSG).
No backend — all content lives in `src/data/deities.ts`. Deployed to Vercel
via CLI (`npx vercel --prod --yes`), not git-integrated.

## Folder structure

- `src/data/deities.ts` — single source of truth for all deity content
  (mantra + aarti verses, Devanagari + English). Add a new deity by appending
  an entry here; the route and nav link are generated from this array, not
  hardcoded.
- `src/context/ThemeContext.tsx` — light/dark theme, persisted to
  `localStorage` under `holyplace-theme`, defaults to OS preference.
- `src/components/Layout.tsx` — header/nav/footer shell, renders `<Outlet/>`.
  Nav links are generated from `deities` array.
- `src/pages/Home.tsx` — grid of deity cards linking to `/deity/:id`.
- `src/pages/DeityPage.tsx` — reads `:id` from route, looks up the deity via
  `getDeity()`, renders mantra + aarti. Per-page English-translation toggle
  is local `useState`, not global — each deity page starts with translation
  shown.
- `App.tsx` — route table. Two routes total: `/` and `/deity/:id`.

## Control flow

1. `main.tsx` wraps the app in `ThemeProvider` then `BrowserRouter`.
2. `App.tsx` routes render inside `Layout`, which reads `deities` for nav.
3. `DeityPage` resolves `id` → `getDeity(id)`; unknown id redirects to `/`.
4. `vercel.json` rewrites all paths to `/index.html` so client routes
   (`/deity/ganesha`) don't 404 on direct load/refresh in production — this
   is a CSR SPA, so without this rewrite a hard refresh on any deity page
   returns Vercel's 404.

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
