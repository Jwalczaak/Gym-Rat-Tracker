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
- [ ] **Timezone-fragile date construction in `helper.test.ts`** —
      `new Date('2026-06-14')` parses the bare date string as **UTC midnight**, but
      `eachDayOfInterval` / `format` / `toDateString` all operate in the runner's
      **local** time. In CEST (+0200) UTC-midnight lands on the same calendar day,
      so the suite is green locally. In any negative-offset zone (the Americas),
      `new Date('2026-06-14')` is the evening of June _13th_ local →
      `eachDayOfInterval` yields **8** days and `toHaveLength(7)` fails; the
      `isToday` / `result[6]` assertions share the same shift. → Construct
      local-midnight dates with the numeric constructor: `new Date(2026, 5, 14)`
      (month is 0-indexed). Stable in every timezone and removes the hidden UTC
      coupling. A test that only passes in some timezones is worse than no test.
- **`mapIntervalToWeekDays` "today" default is untested** — tests only prove
  `isToday` when `today` is passed explicitly. The production call relies on the
  default `new Date()`, which no test exercises (and can't, deterministically).
  Not a bug — the injectable `today` param is the right testable design; tests
  cover the injectable path, not the real default. → optionally add one
  assertion that the default path returns the right length, nothing more.
- **Test name typo + `summerMacro` in `helper.test.ts`** (`:53,61`) — cosmetic:
  rename the `'correctly sum macros'` test and the `summerMacro` variable to
  "summed"/"total". Worth fixing while in the file.
