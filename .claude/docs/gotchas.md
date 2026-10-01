# Gotchas (real, hit already)

- **Vercel project name must be lowercase** — the folder is `HolyPlace`
  (capital H/P), and `vercel --prod --yes` failed on the first deploy with
  a 400 because the auto-derived project name had uppercase letters. Deploy
  used `--name holyplace` (deprecated flag, still works) to force a valid
  name once; the project is now linked via `.vercel/project.json`, so plain
  `npx vercel --prod --yes` works from here on without the flag.
- **CSR-only, no prerendering — RESOLVED.** Every route is now statically
  prerendered at build time (see CLAUDE.md "Prerendering"). This note is
  kept so a future session doesn't assume the old limitation still applies
  before checking `scripts/prerender.mjs`.
- **`react-router-dom` v7 has no `/server` subpath** — `StaticRouter` lives
  on the main `react-router-dom` export now, not `react-router-dom/server`
  (that was the v6 API). Confirmed by `Object.keys(await import('react-router-dom'))`
  rather than assuming the old import path still works.
- **Node's native TS type-stripping can't resolve extensionless imports**
  — a script run directly via `node scripts/foo.mjs` importing a `.ts` file
  with bundler-style imports (`from "../data/religions"`, no extension)
  fails with `ERR_MODULE_NOT_FOUND`, because Node's loader (unlike Vite/tsc)
  doesn't guess `.ts` for you. `gen-seo.mjs` avoids this because
  `religions.ts`/`blog.ts` have no further relative imports of their own;
  `pageMeta.ts` does (imports from `../data/religions`), so it can't be
  `node`-imported directly — `prerender.mjs` instead imports `getPageMeta`
  re-exported from the Vite-built SSR bundle (`dist-server/entry-server.js`),
  since Vite already resolved and bundled that import correctly.
- **Hydration mismatches from `localStorage`/browser-capability reads
  during render, not after.** Once pages are prerendered, anything that
  reads `localStorage`, `window.matchMedia`, or checks for a browser API
  (`"speechSynthesis" in window`, `"Notification" in window`) *synchronously
  during the initial render* will differ between the server (no `window`,
  always the default) and a *returning visitor's* client (real stored
  value) — not a returning visitor dependency, see second bullet — and
  trip React error #418. Fixed everywhere by: start state at the
  server-safe default unconditionally, then read the real value in a
  `useEffect` after mount and `setState` if different. Applies to
  `useLocalStorage` (generic hook, fixes favorites/streak/lang/script/
  font-scale/last-visited/reminder-time in one place), `ThemeContext`
  (bespoke, not on `useLocalStorage`), `useSpeech`'s `supported`, and
  `useReminder`'s `supported`/`permission`.
- **Hydration mismatches from "now"-dependent values computed directly
  during render.** `dailyChant()` (picks a chant by day-of-year) and
  `upcomingFestivals()` (filters by `new Date()`) are evaluated once at
  prerender time and again at the visitor's actual load time — those can
  legitimately be different days. Fixed the same way as above: start from
  a fixed placeholder (`chantIndex[0]`, empty array) and resolve the real
  value in a mount effect. Also fixed `Home.tsx`'s
  `toLocaleDateString(undefined, …)` → `toLocaleDateString("en-US", …)`,
  since an unspecified locale resolves differently on Node vs. a browser.
  Found all of this by an actual Playwright hydration check (temp-installed,
  console-error-listening, navigated every prerendered route — not by
  reading the code), after blindly trusting the build output once already
  cost a wasted round of "looks fine" — don't skip this check after
  touching anything that reads `localStorage`/`window`/`Date` during render.
- **`vite preview`'s static server doesn't resolve `/foo` to
  `dist/foo/index.html` the way Vercel does** — requesting a prerendered
  nested route without a trailing slash (e.g. `/hinduism/hanuman/chalisa`)
  served the root `index.html` instead during local testing; adding a
  trailing slash (or `/index.html`) worked. This is a `vite preview`-specific
  static-serving quirk, not necessarily Vercel's behavior — verify the real
  clean-URL resolution against the deployed Vercel URL, don't trust
  `vite preview` as a stand-in for it.
- **`overflow-x: auto` on a flex item needs `min-width: 0`** — the mobile
  header nav (`.nav-links` inside the `@media (max-width: 640px)` block in
  `index.css`) is a horizontally-scrolling strip inside a column-direction
  flex header. Without `min-width: 0` (plus explicit `width: 100%`), the
  flex item refused to shrink below its content's intrinsic width and
  pushed past the viewport instead of clipping/scrolling — classic
  flexbox default (`min-width: auto`) fighting an overflow container.
  Caught by an actual headless-browser check (Playwright, temp-installed
  and removed, `document.documentElement.scrollWidth` vs `clientWidth`
  across 375/390/360px viewports), not by reading the CSS — the bug wasn't
  visible from the stylesheet alone. Re-run a similar check after touching
  `.site-header`/`.nav-links` layout.
- **Personal machine's global `pre-push-check` hook doesn't know this repo
  is exempt** — this repo's own `.claude/rules/brain-sync.md` says org
  code-review rules don't apply here, but `~/.uniqode/engineering/hooks/
  pre-push-check.sh` is a machine-level Claude Code `PreToolUse` hook, not
  a git hook, so it fires on every `git push` regardless of per-repo
  CLAUDE.md content and can't be skipped with git flags like `--no-verify`.
  Resolving it is the user's call (fix the hook script, or actually run
  `engg-code-reviewer` for this repo too) — not something to route around
  silently.
