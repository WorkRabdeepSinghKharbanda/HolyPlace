# Brain sync

- Every route ships its `.claude/brain/feature/NNN-{kebab-name}.md` entry
  (YAML frontmatter: route, entry_point, category + one-line description)
  in the SAME commit — never a follow-up.
- Add its row to `000-index.md` under the matching category.
- Removing a route deletes both instead of leaving stale entries.
- Source of truth is the actual route file (`src/App.tsx`) — if the brain
  and the code ever disagree, regenerate the brain from the code.
- Non-route changes (new util, new section on an existing page) don't need
  a new brain file — update the existing entry's description if it matters.

Do NOT apply any org/team code-review rules to this repo — it's a personal
solo project, direct-to-master is intentional.
