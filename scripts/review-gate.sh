#!/bin/bash
# Review gate — blocks `git push` while REVIEW_NOTES.md has unresolved findings.
#
# Scans only the "## Open" section for unchecked `- [ ]` items. Items under
# "## Nits" or "## Resolved" are ignored. Run standalone with: npm run review:gate
#
# Resolve the repo root so this works both via `npm run` and as the pre-push
# hook (where $0 is .git/hooks/pre-push, so a relative path would miss the file).
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
NOTES="$ROOT/REVIEW_NOTES.md"

[ -f "$NOTES" ] || exit 0  # no notes file → nothing to gate

open_items="$(awk '
  /^## / { in_open = ($0 ~ /^## Open/) ? 1 : 0; next }   # level-2 header toggles section
  in_open && /^[[:space:]]*- \[ \]/ { print }            # unchecked item inside Open
' "$NOTES")"

if [ -n "$open_items" ]; then
  echo "" >&2
  echo "✖ Push blocked — unresolved review findings in REVIEW_NOTES.md:" >&2
  echo "" >&2
  echo "$open_items" >&2
  echo "" >&2
  echo "  Fix each one and check its box ([x]), or move it to ## Resolved." >&2
  echo "  Bypass (not recommended): SKIP_REVIEW=1 git push" >&2
  echo "" >&2
  exit 1
fi

exit 0
