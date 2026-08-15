#!/usr/bin/env bash
# Publish gym-app/ to the gh-pages branch (GitHub Pages source: branch gh-pages, folder /).
# No GitHub Actions involved, so it also works while Actions is unavailable.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
work="$(mktemp -d)"
trap 'git -C "$repo_root" worktree remove "$work" --force >/dev/null 2>&1 || rm -rf "$work"' EXIT

git -C "$repo_root" fetch origin gh-pages
git -C "$repo_root" worktree add "$work" gh-pages

rm -f "$work"/*.html "$work"/*.js "$work"/*.png "$work"/*.svg "$work"/*.webmanifest
cp "$repo_root"/gym-app/index.html "$repo_root"/gym-app/klant.html "$repo_root"/gym-app/sporter.html "$repo_root"/gym-app/manifest.webmanifest \
   "$repo_root"/gym-app/sw.js "$repo_root"/gym-app/icon-512.png "$repo_root"/gym-app/icon-180.png \
   "$repo_root"/gym-app/icon.svg "$work"/
touch "$work/.nojekyll"

git -C "$work" add -A
git -C "$work" commit -q -m "chore: Publish gym app" || { echo "geen wijzigingen"; exit 0; }
git -C "$work" push origin gh-pages
echo "gepubliceerd naar gh-pages"
