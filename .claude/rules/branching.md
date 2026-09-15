---
protected_branches: ["archive"]
---

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `master`.

## Deploy after every push

Not git-integrated. Vercel has no GitHub connection for this project — pushing
to `master` does nothing on its own. After every commit, deploy manually:

```
npx vercel --prod --yes
```

Then verify with `curl -s -o /dev/null -w "%{http_code}\n" <deployed-url>` to
confirm the new build is live (200), not stale.

Production URL: https://holyplace.vercel.app
