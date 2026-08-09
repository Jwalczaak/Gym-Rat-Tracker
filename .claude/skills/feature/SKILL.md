---
name: feature
description: The iteration loop for building or changing a feature in this app — research, plan for approval, one vertical slice at a time, verify, log findings. Use whenever the task is to add, change, or fix a user-facing feature (Diet, Training, Auth), not for one-file edits or pure refactors.
---

# Feature iteration loop

Follow these phases in order. Do not skip ahead to code.

## 1. Research (read-only)

Read before proposing. For a Diet/Training feature that means at minimum:

- the existing feature folders under `src/features/<Domain>/` — copy their shape
- the relevant `src/services/<Domain>/api*.ts` and the hooks wrapping it
- `src/routes/paths.ts` if navigation is involved
- an existing `.test.tsx` next door, to match the testing idiom

Report what already exists that you can reuse. Reusing a `shared/` component beats writing a new one; if you're about to add a third near-duplicate, say so instead.

## 2. Plan (requires approval)

Enter plan mode and produce a plan that names:

- **The data path** — which Supabase table/query, which `api*.ts` function (new or existing), which hook, which component consumes it. State it as a chain.
- **Where state lives** — server state belongs in TanStack Query, not `useState`. Form state belongs to react-hook-form. Anything left over is genuinely local UI state; justify it.
- **Loading, empty, and error states** — all three, explicitly. Missing empty/error states are the most common defect in this codebase (see `TODO.md`).
- **The component split** — which components, and what single concern each owns.
- **Open decisions** — every place two designs are defensible, with your recommendation. This is the point of the plan; don't paper over choices.
- **The slices** — ordered, each independently working and committable.

Wait for approval. A rejected plan costs a paragraph; a rejected implementation costs an afternoon.

## 3. Implement — one slice at a time

Per slice: service → hook → component → colocated test. Working end to end before starting the next.

Stop and re-check with the user if implementation reveals the plan was wrong. Don't quietly redesign mid-slice.

Conventions are in `CLAUDE.md` — data access boundaries, RHF `isValid`, React Compiler (no defensive `useMemo`), date construction, mutation error ownership.

## 4. Verify

`npm run verify` — typecheck, lint, tests. Must be green.

The suite is the only verification: nothing drives a real browser here. So each slice needs tests for the states the plan named, not just the happy path — the query rejecting, the list coming back empty, the form submitting invalid. Mock at the service boundary (`fetchMeals.mockRejectedValue(...)`) to reach them.

Report honestly. If a test is failing or a state is unimplemented, say which — do not report done.

## 5. Close out

- Propose a commit per slice via `/commit`.
- Anything you noticed but did not fix goes to `TODO.md` as a new entry. Out-of-scope fixes get logged, not silently implemented.
