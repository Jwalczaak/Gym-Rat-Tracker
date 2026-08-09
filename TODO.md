# Backlog

Known issues and follow-ups. Unenforced — nothing here blocks a push. Delete an
entry when it's fixed; add one when a review turns something up that isn't in
the current task's scope.

## Bugs

- [ ] **`DayKcalSummary` divides by zero on an empty day** — `macroData[key] / macroData.kcal * 100` is `NaN` when no meals are logged. Radix `Progress` then drops `aria-valuenow`, logs an error, and renders `translateX(-NaN%)`. Guard the division and cover the empty-day case in `DayKcalSummary.test.tsx`.
- [ ] **`DayKcalSummary` percentage mixes units** — `countPercentageValue` divides grams by kcal, so `{protein: 15, kcal: 250}` renders a bar at `6`, which isn't a percentage of anything. Decide what the bar represents (share of total macro grams / calorie contribution at 4-4-9 / progress toward a daily target) *before* asserting a number, or the test just freezes the bug.
- [ ] **`SearchMeal` swallows query errors** — `useMeals` returns `error` but `SearchMeal.tsx:21` destructures only `isLoading` and `meals`. A rejected `fetchMeals` looks identical to "no results": no message, no retry. Cover with `fetchMeals.mockRejectedValue(...)`.
- [ ] **`SearchMeal` has no empty state** — the modal opens with an empty debounced phrase, so every user's first view is `meals: []` rendering nothing under the input. "Start typing to search" and "No products match …" are two distinct states; both need copy and a test.
- [ ] **Timezone-fragile dates in `helper.test.ts`** — `new Date('2026-06-14')` is UTC midnight while `eachDayOfInterval`/`format` run in local time. Green in CEST, fails in the Americas (`eachDayOfInterval` yields 8 days, `toHaveLength(7)` fails). Use `new Date(2026, 5, 14)`.

## Cleanup

- [ ] **`services/supabase.ts` logs credentials on every load** — two `console.log(env.supabaseUrl, env.supabaseKey)` calls, one inside the guard and one at module scope. The anon key is public by design so this isn't a leak, but it's debug cruft in every browser console. Delete both.
- [ ] **`.env` is committed to a public repo** — `git rm --cached .env` and decide whether the history needs rewriting. Only `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are present, both client-visible, so this hinges entirely on RLS being enforced on every table.

- [ ] **Folder named `src/components/shared/ Chart` has a leading space** — mock paths like `'@/components/shared/ Chart/Chart'` only resolve because of the typo. Rename to `Chart`.
- [ ] **Mutation error-ownership is inconsistent in Diet** — edit uses `mutateAsync` + component-owned errors, delete uses `mutate` + hook-owned `onError`. Both work; pick one for the domain.
- [ ] **`SelectMeal.test.tsx` has empty test bodies** — five cases pass without asserting anything. Fill them in or mark `it.todo`. The wiring (typed `vi.fn`, `Partial<MealPer100g>` factory, `withOnBack` toggling the `onBack ?? close` branches) is sound and worth keeping.
- [ ] **`MealEditCard.test.tsx` only asserts rendering** — the `updateMealLogWeight` spy at line 17 is declared and never used. Either write the interaction test (type weight → save → `toHaveBeenCalledWith`) or drop the mock.
- [ ] **`mapIntervalToWeekDays` default `today` is untested** — tests only pass `today` explicitly. The injectable param is the right design; optionally assert the default path returns the right length.
- [ ] **Naming in `helper.test.ts:53,61`** — `'correctly sum macros'` / `summerMacro` → "summed"/"total".
