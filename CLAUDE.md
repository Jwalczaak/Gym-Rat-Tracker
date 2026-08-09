# Gym Rat Tracker

Workout + diet tracking app. React 19, TypeScript, Vite, Supabase, TanStack Query, Tailwind v4 + shadcn/Radix.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (http://localhost:5173) |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Tests (watch) | `npm test` |
| Tests (once) | `npm run test:run` |
| Full gate | `npm run verify` — typecheck + lint + tests, same as pre-push |
| Build | `npm run build` |

`npm run verify` must pass before any commit is considered done.

## Layout

```
src/
  components/ui/       shadcn primitives — generated, don't hand-edit
  components/shared/   app-wide reusable components (Modal, Header, WeekCarousel, …)
  features/<Domain>/<Feature>/  feature components, colocated with their .test.tsx
  services/            Supabase client + per-domain API modules (apiDiet.ts, ApiMeal.ts)
  hooks/               cross-feature hooks (useDebounce, useOutsideClick)
  routes/              AppRouter, protectedRoute, paths.ts
  utils/  types/  lib/  config/  styles/
  test/                setup.ts, test-utils.tsx (render with providers)
```

`@/` aliases `src/`.

## Conventions

- **Data access**: components never call Supabase directly. `services/<Domain>/api*.ts` owns the query; a hook wraps it in TanStack Query; the component consumes the hook.
- **Feature folders**: one folder per feature, component + test colocated. Split a component when it owns more than one concern, not by line count.
- **Routes**: add paths to `routes/paths.ts`, never inline string literals.
- **Forms**: react-hook-form. Read `formState.isValid` inline in render — destructuring it to a variable can break RHF's Proxy subscription.
- **Mutations**: pick one error-ownership convention per feature — either `mutateAsync` + component-owned error handling, or `mutate` + hook-owned `onError`. Don't mix within a domain. (The Diet feature currently mixes; see [TODO.md](TODO.md).)
- **React Compiler is on.** Don't add `useMemo`/`useCallback` for referential-stability micro-optimisation; the compiler handles it. Use them only when a dependency identity is semantically required.
- **Dates**: construct with the numeric constructor (`new Date(2026, 5, 14)`), not `new Date('2026-06-14')` — the string form parses as UTC and shifts the calendar day in negative-offset timezones.

## Schema

The schema is authored in the hosted Supabase project (dashboard/SQL editor), not in local migrations. It is mirrored into the repo so it can be read, diffed, and typechecked:

- `supabase/migrations/` — SQL pulled from remote via `npm run db:pull`. **This is the ground truth for anything the TypeScript types can't express**: RLS policies, constraints, defaults, foreign keys, indexes. Read it before writing a query.
- `src/types/database.types.ts` — **generated, never hand-edit**. Regenerate with `npm run db:types`.
- `npm run db:sync` does both.

**After changing any table in the dashboard, run `npm run db:sync` before asking for code.** Otherwise the types are stale and every query written against them is wrong in a way nothing catches.

Once synced, `npm run typecheck` is the drift detector: a renamed or re-typed column breaks at every call site. Treat that error list as the migration checklist.

## Design

There is a Claude design-system project for this app — **"Gym Rat Tracker Design System"**, `projectId 9f7a7d2b-ccdb-4489-80fa-3ebe6859dd45`. Read it with the `DesignSync` tool (`list_files`, `get_file`).

What's in it:

- `colors_and_type.css` — the upstream token source
- `preview/*.html` — 20 spec cards (colors, type, spacing, radius, elevation, buttons, cards, fields, meal-card, macro-donut, sidebar, toggle)
- `ui_kits/web-app/*.jsx` — a React kit with **designed versions of screens that are still stubs here**: Home dashboard, Training (session, sets tables, weekly volume, history), Settings, Login
- `README.md` — visual foundations, content/tone rules, and an explicit "things to not do" list

**It was reverse-engineered from this repo on 2026-08-08, so it is a snapshot.** It is authoritative for *visual language*; it is **not** authoritative about the current state of the code, and it records some repo defects as if they were design (the Vite template favicon, the `Logo` text placeholder, a `Poppins` font-family that isn't installed). Verify against `src/` before treating any claim about the codebase as true.

The kit is presentational only — no Supabase, no react-query, `conic-gradient` instead of recharts, a plain grid instead of embla. Take layout and visual decisions from it; the real data path is yours to design.

Tokens live in `src/styles/globals.css` — brand ramps, semantic shortcuts (`--fg`, `--surface`, `--line`), macro colors, shadows. Dark mode is a class swap on `<html>`. When the design system introduces a token `globals.css` lacks, add it there first; never inline the value.

**Components must not contain raw color, spacing, or shadow values.** No `#7c3aed`, no `bg-violet-600`. Use the semantic token. If a change needs a value no token expresses, propose the token first and wait — don't inline it. Token vocabulary is a decision, not an implementation detail.

Iterate at the token/primitive layer, not per screen. A change that has to be repeated across three components is a missing token.

## Testing

Vitest + Testing Library, jsdom, globals enabled (no `import { describe }`). Render via `src/test/test-utils.tsx` so providers are wired.

Query by accessible role/label, not test ids. `getBy*` throws synchronously — use `findBy*` when you actually need to wait. Mock at the service boundary (`vi.mock` the `api*.ts` module), not the Supabase client.

Don't leave empty test bodies — use `it.todo` so they report as skipped instead of passing.

## Working agreement

1. **Plan before code.** For anything beyond a one-file change, use plan mode and get the plan approved first. Design decisions get reviewed as prose, not as a 300-line diff.
2. **One vertical slice per commit.** A slice is service → hook → component → test, working end to end. Not "all the services, then all the components".
3. **Tests are the verification.** `npm run verify` must be green. Since nothing drives the real browser, the test suite has to carry that weight: every feature needs coverage of its loading, empty, and error states — not just the happy path. An untested empty state is an unverified one.
4. **State assumptions out loud.** If a requirement is ambiguous, say which reading you picked and why — don't silently choose.
5. **Findings go to [TODO.md](TODO.md)**, not into scope creep. Fix what was asked; log what you noticed.
