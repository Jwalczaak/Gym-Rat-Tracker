#!/bin/bash
# Run: npm run review
# Or install as pre-push hook: cp scripts/review.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push

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

I am an Angular developer learning React. Focus on:
1. Angular habits sneaking into React code (imperative DOM, misused useEffect, class-like patterns)
2. React anti-patterns or non-idiomatic code
3. TypeScript correctness
4. Any obvious bugs

Be concise. Structure your response as:

STATUS: APPROVED or NEEDS REVIEW

ISSUES (only if any):
- <issue>: <why it matters> → <what to do instead>

LEARNING NOTE (optional):
- One React concept worth reinforcing from these changes"
