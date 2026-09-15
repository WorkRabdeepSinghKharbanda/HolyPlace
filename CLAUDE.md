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

## User-facing features beyond the core read view

- **Favorites** (`src/hooks/useFavorites.ts`) — array of chant paths in
  `localStorage["holyplace-favorites"]`.
- **Practice streak** (`src/hooks/usePracticeStreak.ts`) — one global streak
  for the whole site (`localStorage["holyplace-streak"]`), not per-chant.
  "Chanted today" on any chant advances it.
- **Listen** (`src/hooks/useSpeech.ts`) — browser `SpeechSynthesis`, not
  recorded audio. Voice/pronunciation quality depends entirely on the
  user's OS/browser voices; it reads Devanagari/Gurmukhi/Latin phonetically
  through whatever voice matches the `lang` code (`hi-IN`/`pa-IN`/`la`), not
  a native reciter. Treat as a free stopgap, not real audio.
- **Occasions** (`Chant.occasions` in `religions.ts`, aggregated in
  `src/data/chantIndex.ts`) — tags like "exams", "protection", "new home".
  Only tagged on chants where the association is well-established (e.g.
  Saraswati → exams, Hanuman → protection) — don't tag every chant with
  every plausible occasion, it dilutes the filter.
- **Festivals** (`src/data/festivals.ts`) — hand-maintained dates.
  Lunar-calendar festivals (Diwali, Navratri, Holi, Janmashtami, Maha
  Shivratri) are approximate placeholders, not computed — re-verify against
  a panchang before relying on them, and update yearly.
- **Offline** (`public/sw.js`, registered in `main.tsx`, prod builds only) —
  runtime-caches same-origin GETs as the user visits them; it is not a full
  precache, so a page's first visit still needs network. Registered only
  when `import.meta.env.PROD` so it doesn't fight Vite's dev HMR.
- **Regional scripts** (`src/lib/transliterate.ts`) — real transliteration
  via `@indic-transliteration/sanscript` (MIT, client-side only, no API
  calls, free), not hand-typed text. Only offered when the religion's
  native script is Brahmic (Devanagari, Gurmukhi — see
  `supportsScriptToggle`); Latin-script traditions (Christianity) have
  nothing to transliterate into an Indic script, so the toggle doesn't
  appear there. Preference persists in
  `localStorage["holyplace-script"]`. The package's own `toml` dependency
  has a known high-severity advisory, but `toml` is only used by
  Sanscript's build scripts, never by the `sanscript.js` runtime file we
  import — confirmed by grepping the bundled file — so it's unreachable
  from our code.

## More traditions, reminders, UI language

- **Buddhism** — third tradition after Hinduism/Sikhism, one figure
  (Buddha) with the Ti-Sarana refuge formula, Om Mani Padme Hum, and the
  Heart Sutra's closing mantra. Script is "Devanagari" (how Pali chants are
  conventionally rendered in Indian print), which means the regional
  script toggle works on Buddhist chants for free.
- **Daily reminder** (`src/hooks/useReminder.ts`, UI in
  `src/components/ReminderWidget.tsx`) — NOT a real push notification.
  There's no backend push server, so it only fires via `Notification` API
  while this site is open in a tab (polled every 30s). A true
  "notify-even-when-closed" reminder needs web-push + a server to hold
  subscriptions — a real infra addition, not something a static site can
  do alone. This is documented in the hook's own comment too.
- **UI language switcher** (`src/i18n/translations.ts` +
  `src/context/LangContext.tsx`) — English/Hindi/Spanish, chrome text only
  (buttons, headers, footer). Chant/mantra/prayer content is never
  translated by this system — the English translation shown per-chant is
  content, authored in `religions.ts`, not swapped by the language
  selector. Adding a language means adding one object to `translations.ts`
  with every key `en` has; TypeScript enforces the key set matches.

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
