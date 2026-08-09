#!/bin/bash
# Deterministic pre-push gate: typecheck + lint + tests. No model involved.
#
# Install: npm run hook:install
# Run manually: npm run verify
# Emergency bypass: SKIP_VERIFY=1 git push

set -euo pipefail

if [ "${SKIP_VERIFY:-}" = "1" ]; then
  echo "SKIP_VERIFY=1 — skipping pre-push checks." >&2
  exit 0
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

fail() {
  echo "" >&2
  echo "✖ Push blocked — $1 failed." >&2
  echo "  Fix it, or bypass with: SKIP_VERIFY=1 git push" >&2
  echo "" >&2
  exit 1
}

echo "→ typecheck"
npm run --silent typecheck || fail "typecheck"

echo "→ lint"
npm run --silent lint || fail "lint"

echo "→ tests"
npm run --silent test:run || fail "tests"

echo "✔ All checks passed."
