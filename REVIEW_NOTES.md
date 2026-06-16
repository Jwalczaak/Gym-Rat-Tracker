# Review Notes

Backlog of findings from `npm run review` / Claude code reviews.

**The pre-push gate blocks pushing while any unchecked `- [ ]` item remains
under `## Open`.** Fix an item and remove it. Items under `## Nits` are informational and never block.

Bypass in an emergency (not recommended during learning):
`SKIP_REVIEW=1 git push`.

---

## Open

<!-- Blocking findings. Push is blocked while any `- [ ]` here is unchecked. -->

### 2026-06-14 — edit-weight flow review (commit b21e44e)

- [ ] **Hardcoded header in the edit modal** (`MealEditCard.tsx`) — the
      `Modal.Header` reads `"Add Meal"` + `"Breakfast"` and the muted text
      talks about finding/creating a product, which doesn't fit an _edit
      weight_ flow on a known meal. It's copy-pasted from `AddMeal`. Show
      "Edit Meal", the real `meal.meal_type`, and edit-appropriate helper
      text (or no helper text).

- [ ] **Dead loading state** (`useUpdateMeal.ts` / `useAddSelectedMeal.ts`) —
      both hooks still return `isUpdating`/`isCreating`, but `SelectMeal` now
      drives the spinner from its local `isSubmitting`. Two sources of truth
      for "in flight". Drop the unused `isPending` returns (local state is
      defensible here since it gates the `close()` after `await`).

- [ ] **Redundant `onError` logging** (`useUpdateMeal.ts`) — `onError`
      `console.error`s, but with `mutateAsync` the rejection also propagates
      to `SelectMeal`'s `try/catch`, so the error is handled twice. Decide
      where errors live: the component (UI) or the hook (logging), not both.

## Nits (non-blocking)

- [ ] `const [isSubmitting, setSubmitting]` — convention is `setIsSubmitting`
      to mirror the getter.
- [ ] `const dayParam: string = ...` — annotation is redundant; `??` already
      narrows to `string`.
