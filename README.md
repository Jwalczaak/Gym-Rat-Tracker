# Gym Rat Tracker

Workout and diet tracking app — log meals against daily macro targets, track training sessions across a week.

**Stack:** React 19 (React Compiler enabled) · TypeScript · Vite · Supabase · TanStack Query · react-hook-form · Tailwind v4 + shadcn/Radix · Vitest + Testing Library

## Setup

```bash
npm install
cp .env.example .env   # fill in your Supabase project URL + anon key
npm run dev            # http://localhost:5173
npm run hook:install   # installs the pre-push gate
```

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run lint` / `lint:fix` | ESLint |
| `npm test` / `test:run` | Vitest, watch / single run |
| `npm run verify` | typecheck + lint + tests — the pre-push gate |
| `npm run build` | Production build |
| `npm run format` | Prettier |

## Project layout

```
src/
  components/ui/        shadcn primitives (generated)
  components/shared/    app-wide components
  features/<Domain>/    feature components + colocated tests
  services/             Supabase client and per-domain API modules
  hooks/  routes/  utils/  types/  lib/  test/
```

`@/` resolves to `src/`.

## Pre-push gate

`scripts/pre-push.sh` runs typecheck, lint and tests before every push. Bypass with `SKIP_VERIFY=1 git push`. Re-install after a fresh clone with `npm run hook:install`.

## Working with Claude Code

Project configuration is committed under `.claude/`:

- `CLAUDE.md` — stack, conventions, and the working agreement
- `.claude/skills/feature` — the plan-first iteration loop for feature work
- `/commit` — stage, summarize, and commit

Known issues and follow-ups live in [TODO.md](TODO.md).
