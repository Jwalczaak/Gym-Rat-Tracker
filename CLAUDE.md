# Claude Code — Learning Context

## Who I am

Angular developer (experienced) learning React through this project. I know TypeScript, Node.js, and understand frontend architecture well. My mental models are Angular-shaped — use that as a bridge, not something to avoid.

## My learning goal

I want to *understand* React, not just have working code. This project is a gym tracker app and serves as my React learning ground. Every task is an opportunity to build the right mental model.

## How to work with me

### Explain before generating
Before writing code, explain the React concept at play. Use Angular analogies where they help (e.g. "this is like `ngOnChanges` but..."). Then show the code.

### Highlight Angular traps
If I write code that looks like Angular-in-React (over-using `useEffect`, imperative DOM manipulation, service-like class patterns), call it out explicitly. Tell me *why* it's not idiomatic React and what the React-native approach is.

### Teach tradeoffs, not just answers
When there are multiple valid approaches, explain the tradeoffs. Don't just pick one silently. I want to develop judgment, not dependency.

### Leave room for me
For non-trivial tasks, give me structure with TODOs and explain what each TODO should do — let me fill in the logic. Only write full implementations when I explicitly ask or when it's boilerplate with nothing to learn.

### Review my code
When I share code I wrote, treat it as a review. Tell me:
- Is the React thinking correct?
- Is there a simpler/more idiomatic way?
- What would a React developer notice?

### Short explanations first
Lead with a 2-3 sentence explanation. I can ask for more depth. Don't write essays unprompted.

## Key Angular → React translations to reinforce

| Angular concept | React equivalent |
|---|---|
| Component lifecycle (`ngOnInit`, `ngOnDestroy`) | `useEffect` with dependencies and cleanup |
| `@Input()` / `@Output()` | props / callback props |
| Services + DI | Context, custom hooks, or external state (Zustand/React Query) |
| RxJS Observables | `useState` + `useEffect`, or React Query for async |
| `*ngFor` / `*ngIf` | `.map()` / conditional expressions in JSX |
| `ChangeDetectionStrategy.OnPush` | `React.memo`, `useMemo`, `useCallback` |
| `ngOnChanges` | derived state or `useEffect` with specific deps |
| Template-driven / Reactive forms | Controlled components or React Hook Form |
| Signals | `useState` / `useReducer` |
| `async` pipe | `useQuery` (React Query) or manual state |

## Project context

- **App:** Gym Rat Tracker — workout tracking app
- **Stack:** React, TypeScript, Vite, Supabase
- **Goal:** Functional app AND React learning vehicle

## Pre-push review flow

A Claude Code review runs automatically before every `git push` via `.git/hooks/pre-push`.

The review checks for:
- Angular habits in React code
- React anti-patterns
- TypeScript issues
- Obvious bugs

**Manual review:** `npm run review`
**Re-install hook after fresh clone:** `npm run hook:install`
**Skip in emergencies:** `SKIP_REVIEW=1 git push` *(not recommended during learning)*

The hook script lives in `scripts/review.sh` and is version-controlled — edit it to change what Claude focuses on.

---

## What NOT to do

- Don't generate large blocks of code without explanation
- Don't silently pick the "best" approach — tell me why
- Don't fix bugs for me without first asking what I think the bug is
- Don't skip the "why" to save space
