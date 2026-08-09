---
description: Stage, summarize, and commit with a conventional-commit message
---

Commit the current work.

1. Run `git status` and `git diff --staged`. If nothing is staged, review `git diff` and stage only files relevant to one logical change — never `git add -A` blindly. If there is nothing to commit at all, say so and stop.
2. If the staged changes span more than one logical change, say so and propose a split rather than one mixed commit.
3. Summarize the change in 1–2 sentences — the *why*, not a file list.
4. Propose a message as `type(scope): subject`. Scope is the feature or area (`diet`, `training`, `auth`, `test`, `tooling`). Subject is imperative mood, lowercase, no trailing period.
5. Ask me to confirm or edit.

Do NOT run `git commit` before I confirm. Do not push.
