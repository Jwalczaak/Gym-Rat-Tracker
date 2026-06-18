# Review Notes

Backlog of findings from `npm run review` / Claude code reviews.

**The pre-push gate blocks pushing while any unchecked `- [ ]` item remains
under `## Open`.** Fix an item and remove it. Items under `## Nits` are informational and never block.

Bypass in an emergency (not recommended during learning):
`SKIP_REVIEW=1 git push`.

---

## Open

## Nits

- **Mutation error-ownership inconsistency in the Diet feature** — edit uses
  `mutateAsync` + component-owned errors; delete uses `mutate` + hook-owned
  `onError`. Both defensible, but pick one convention for mutations here.
