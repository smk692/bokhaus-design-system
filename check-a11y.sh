#!/bin/bash
FILE="$1"

echo "=== Accessibility Issues ==="
jq -r '
.categories.accessibility.auditRefs[] as $ref |
.audits[$ref.id] |
select(.score != null and .score < 1) |
"\(.score * 100 | floor)% - \(.title)\n  \(.description // "No description")"
' "$FILE" | head -50
