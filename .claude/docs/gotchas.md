# Gotchas (real, hit already)

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
