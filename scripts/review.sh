#!/bin/bash
# Run: npm run review
# Or install as pre-push hook: cp scripts/review.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push

# Emergency bypass — skips the gate AND the Claude review.
if [ "$SKIP_REVIEW" = "1" ]; then
  echo "SKIP_REVIEW=1 — skipping review gate and Claude review." >&2
  exit 0
fi

# Gate first: block while REVIEW_NOTES.md has unresolved findings. Only if it
# passes do we run the Claude review below (which surfaces findings to add to
# REVIEW_NOTES.md for the next iteration).
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
if [ -f "$ROOT/scripts/review-gate.sh" ]; then
  bash "$ROOT/scripts/review-gate.sh" || exit 1
fi

# Locate claude — WSL/VSCode bundles it inside the extension folder, not on PATH
CLAUDE=$(command -v claude 2>/dev/null)
if [ -z "$CLAUDE" ]; then
  CLAUDE=$(find ~/.vscode-server/extensions -name "claude" -path "*/native-binary/claude" 2>/dev/null | sort -V | tail -1)
fi
if [ -z "$CLAUDE" ]; then
  echo "Error: claude binary not found. Make sure Claude Code extension is installed in VSCode." >&2
  exit 1
fi

echo ""
echo "Claude Code Review — checking your changes..."
echo ""

"$CLAUDE" --print "Review my React code changes from a learning perspective.

First run these to see what I changed:
  git diff @{u}..HEAD   (if pushing — changes vs remote)
  git diff HEAD~1       (fallback — last commit)

I am the developer learning React. Focus on:
1. Anti-habits sneaking into React code (imperative DOM, misused useEffect, class-like patterns)
2. React anti-patterns or non-idiomatic code
3. TypeScript correctness and usage types/interfaces/generic types when they are needed
4. Any obvious bugs

Also reconcile the existing backlog: read REVIEW_NOTES.md and, for each
unchecked '- [ ]' item under the '## Open' section, inspect the current code
(not just the diff — the fix may live in unchanged files) and judge whether
the issue still exists. Report a verdict per item. Do NOT edit the file or
check any boxes yourself — only advise; I make the final call.

Be concise. Structure your response as:

STATUS: APPROVED or NEEDS REVIEW

BACKLOG (one line per '## Open' item in REVIEW_NOTES.md):
- RESOLVED — <item>: <where/why it now looks fixed> → safe to remove its box
- STILL PRESENT — <item>: <file:line proving it remains>

ISSUES (new findings, only if any):
- <issue>: <why it matters> → <what to do instead>

LEARNING NOTE (optional):
- One React concept worth reinforcing from these changes"
