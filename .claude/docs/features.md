# Feature notes

Implementation details behind the user-facing features, beyond what the
brain files (route-level) and CLAUDE.md (architecture-level) cover.

## Guides / blog (`src/data/blog.ts`, `/blog`, `/blog/:slug`)

- SEO-driven: topics chosen from real Google Autocomplete data (see
  `.claude/brain/seo/`), not guessed. "Benefits of chanting X" and "X
  meaning/history" were the two patterns with the strongest, most
  consistent hits across figures/traditions.
- A glossary post (`glossary-devotional-terms`) defines every piece of
  jargon used across the other posts (mantra, aarti, chalisa, puja,
  bodhisattva, Dhamma, intercession, etc.) — every other post's opening
  paragraph was rewritten to include one plain-language orienting sentence
  before the specifics, and links back to the glossary via `relatedPosts`.
  Do the same for any new post: assume zero prior background, define the
  tradition-specific term inline before using it.
- No invented statistics, quotes, or benchmarks — benefits are framed as
  "traditionally believed" / "in Hindu tradition," not medical or
  scientific claims. If a fact can't be stated with confidence, it's left
  out rather than guessed (same standard as the chant content itself).
- `scripts/keyword-research.mjs` — a one-off script (not wired into the
  build) that queries Google Autocomplete for every figure/chant/festival
  and writes `.claude/brain/seo/keywords.json` (raw) and `keyword-index.md`
  (readable, grouped by owning page). Re-run by hand when planning new
  content; results drift over time so don't treat old output as current
  demand.

## Core interaction

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

- **Buddhism** — fourth tradition, one figure (Buddha) with the Ti-Sarana
  refuge formula, Om Mani Padme Hum, and the Heart Sutra's closing mantra.
  Script is "Devanagari" (how Pali chants are conventionally rendered in
  Indian print), which means the regional script toggle works on Buddhist
  chants for free.
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

## Frontend polish

- **Font size control** (`src/hooks/useFontScale.ts`, in the header) — sets
  `--font-scale` on `documentElement`; verse/translit text sizes are
  `calc(base * var(--font-scale))` in `index.css`. Persisted in
  localStorage, applies site-wide, not per-chant.
- **Swipe between chants** (`src/hooks/useSwipe.ts`, wired in
  `ChantPage.tsx`) — swipe left/right on the page moves to the next/prev
  chant within the same figure's `chants` array. Touch events only
  (no-op on desktop, which has the toolbar instead).
- **Scroll-spy verse highlight** — `IntersectionObserver` over verse refs
  in `ChantPage.tsx`, adds `.verse-active` to whichever verse is most
  in view. Matters most on long chants (Hanuman Chalisa); harmless no-op
  on single-verse mantras.
- **Copy to clipboard** — "Copy" button in the chant toolbar copies the
  full chant (native text + transliteration + translation, if shown) plus
  the page URL, via `navigator.clipboard`.
- **Visible breadcrumb** (`src/components/Breadcrumb.tsx`) — same
  `{name, path}` array already built for `Seo`'s JSON-LD `BreadcrumbList`,
  now also rendered as a real nav element on Religion/Figure/Chant pages.
  Keep both in sync when adding a new page level — they're built from the
  same array so this is naturally the case, don't build a second one.
- **Keyboard shortcuts in recite mode** — arrow keys / space to
  advance, Escape to close (`ReciteMode.tsx`).
- **"Continue where you left off"** — `ChantPage` writes
  `localStorage["holyplace-last-visited"]` on every mount; Home reads it
  back via `chantByPath` and shows a card if it resolves to a real chant.
- **Page transition** — `Layout.tsx` keys `<main>` on `location.pathname`
  so it remounts (and re-plays the `fadeIn` CSS animation) on every route
  change. Purely cosmetic, no data implications.
- **Share as image** (`src/lib/shareImage.ts` + `ShareButton.tsx`) — draws
  a branded PNG card (site name, figure, chant title, first verse) on an
  in-memory `<canvas>`, no server, no image library. Uses
  `navigator.share({files})` where supported (most mobile browsers — this
  is what lets the image attach directly inside WhatsApp/Instagram/etc.).
  Desktop browsers mostly don't support file-sharing via `navigator.share`,
  so the fallback downloads the PNG and opens a prefilled `wa.me` text
  link — the user has to attach the downloaded image manually in that
  case. Devanagari/Gurmukhi glyph rendering on canvas depends on the
  visitor's OS fonts, same caveat as the favicon generation.

## SEO / monetization / analytics

- Favicons (ico + PNG set + apple-touch-icon), OG image, manifest.json,
  robots.txt (with named AI-crawler groups), sitemap.xml + llms.txt
  (both generated by `scripts/gen-seo.mjs` from `religions.ts`, wired as
  `prebuild` — don't hand-edit either file, they're overwritten every build).
- Per-route meta injected client-side via `src/components/Seo.tsx` — see
  the CSR gotcha in CLAUDE.md, this only exists after JS runs.
- Google Search Console verification meta tag is still the placeholder
  from the original SEO pass (`REPLACE_WITH_GSC_TOKEN` in `index.html`) —
  swap for the real token when the property is verified.
- Google Analytics (GA4) is wired with the real measurement ID
  (`G-ZQ3W1BTRYD`).
- Google AdSense: publisher meta tag, `adsbygoogle.js` script, and
  `public/ads.txt` are wired with the real publisher ID
  (`ca-pub-5852027898822024`). No `<ins class="adsbygoogle">` ad slots are
  placed on any page yet — that's a separate step once real ad-unit IDs
  exist in the AdSense dashboard.
