# Review Notes

Backlog of findings from `npm run review` / Claude code reviews.

**The pre-push gate blocks pushing while any unchecked `- [ ]` item remains
under `## Open`.** Fix an item and remove it. Items under `## Nits` are informational and never block.

Bypass in an emergency (not recommended during learning):
`SKIP_REVIEW=1 git push`.

---

## Open

## Nits

- **Label-for fixes forced out by tests are genuine correctness/a11y wins** —
  `htmlFor="product"→"name"`, `kcal`→`kcal_per_100g`, etc. now point at real
  input `id`s, so `getByLabelText` resolves and screen readers associate labels
  correctly. Nothing to do — noting that the tests caught real bugs.
- **RHF `isValid` Proxy subscription is easy to break** — `disabled={isCreating
  || !formState.isValid}` with `mode: 'onChange'` is correct, but `isValid`
  starts `false` before any interaction and RHF only recomputes it because you
  *read* `formState.isValid` in render (Proxy subscription). Destructuring it
  into a top-level variable without reading it in render can make the
  subscription go stale — reading it inline (as now) is the safe idiom.
- **`MealEditCard.test.tsx:17` — unused `updateMealLogWeight` spy** — the
  `vi.mocked()` binding is declared but never asserted on. → either write the
  interaction test (type weight → click save →
  `expect(updateMealLogWeight).toHaveBeenCalledWith(...)`) or drop line 17.
- **`MealEditCard.test.tsx` only asserts rendering, never the spies** — the
  `updateMealLogWeight` / `vi.mocked()` wiring (with a comment about
  `.toHaveBeenCalledWith`) is set up but no test exercises it. Dead scaffolding
  reads like an incomplete test. → either add the interaction test (type weight
  → click save → assert `updateMealLogWeight` called with the right args) or
  drop the unused mock wiring until you do.
- **Leading-space folder ` Chart`** — not introduced by the test diff, but the
  mock path `'@/components/shared/ Chart/Chart'` only works because the real
  folder `src/components/shared/ Chart` is misnamed with a leading space. Latent
  footgun (easy to mistype, breaks on space/case-sensitive tooling). → rename
  `src/components/shared/ Chart` → `Chart` in a follow-up.
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
- **`DayKcalSummary` — `countPercentageValue` divides grams by kcal** —
  `(macroData[key] / macroData.kcal) * 100` mixes units: the numerator is grams,
  the denominator is calories. For `{protein: 15, kcal: 250}` the bar renders at
  `6`, which isn't "6% of anything" in a meaningful sense. Decide what the bar is
  supposed to show (share of total macro grams? calorie contribution via 4/4/9
  kcal per gram? progress toward a daily target?) *before* writing an assertion
  for `9.6` — otherwise the test just freezes the current behaviour in place.
- **`DayKcalSummary` — no guard for `macroData.kcal === 0`** — a day with no
  logged meals gives `0 / 0 * 100` → `NaN`, which is passed straight into Radix
  `Progress`. Radix only sets `aria-valuenow` when the value is a valid number,
  so the bars lose their value attribute and Radix logs an error; the indicator
  transform becomes `translateX(-NaN%)`. → guard the division (return `0` when
  `kcal` is falsy) and cover the empty-day case in
  `DayKcalSummary.test.tsx`.
