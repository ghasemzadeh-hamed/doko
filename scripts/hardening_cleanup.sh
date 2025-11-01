#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "[hardening] git is required to run this script." >&2
  exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "")
if [[ -z "$REPO_ROOT" ]]; then
  echo "[hardening] Could not determine repository root." >&2
  exit 1
fi

cd "$REPO_ROOT"

SENSITIVE_PATHS=(
  ".env"
  ".env.local"
  "backend/.env"
  "fastapi_app/.env"
  "frontend/.env"
  "db.sqlite3"
  "*.sqlite3"
  "*.sqlite"
  "*.db"
  "pyvenv.cfg"
)

REMOVED=()
for pattern in "${SENSITIVE_PATHS[@]}"; do
  while IFS= read -r -d '' file; do
    if git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
      git rm --cached "$file"
      REMOVED+=("$file")
    fi
  done < <(git ls-files -z -- "$pattern" 2>/dev/null || true)

done

if ((${#REMOVED[@]} > 0)); then
  echo "[hardening] Removed the following files from git tracking:"
  printf '  - %s\n' "${REMOVED[@]}"
else
  echo "[hardening] No tracked sensitive files were found."
fi

if command -v git-filter-repo >/dev/null 2>&1; then
  if ((${#REMOVED[@]} > 0)); then
    echo
    echo "[hardening] Rewriting history with git-filter-repo to purge sensitive paths."
    echo "[hardening] This operation rewrites history. Ensure collaborators are aware."
    read -r -p "Proceed with git-filter-repo cleanup? [y/N] " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
      args=("--force" "--invert-paths")
      for path in "${REMOVED[@]}"; do
        args+=("--path" "$path")
      done
      git-filter-repo "${args[@]}"
    else
      echo "[hardening] Skipped history rewrite."
    fi
  fi
else
  echo
  echo "[hardening] git-filter-repo not found. Install it to rewrite history if needed." >&2
fi

