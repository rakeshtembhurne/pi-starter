#!/bin/bash
# Update pi-starter files in a project directory
# Usage: curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/update.sh | bash -s -- <target-dir>
#
# Replaces ALL existing files with latest from GitHub

set -e

TARGET="${1:-.}"

if [ "$TARGET" = "." ]; then
  echo "Updating pi-starter in current directory..."
else
  echo "Updating pi-starter in $TARGET..."
  mkdir -p "$TARGET"
fi

BASE_URL="https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master"

# Create directories
mkdir -p "$TARGET/.pi/extensions"
mkdir -p "$TARGET/tasks"

echo ""
echo "Updating files..."
echo ""

# Core files
curl -sSL --no-compressed "$BASE_URL/AGENTS.md" -o "$TARGET/AGENTS.md"
echo "  ✅ AGENTS.md"

curl -sSL --no-compressed "$BASE_URL/.gitignore" -o "$TARGET/.gitignore"
echo "  ✅ .gitignore"

# Extensions
curl -sSL --no-compressed "$BASE_URL/.pi/extensions/safety.ts" -o "$TARGET/.pi/extensions/safety.ts"
echo "  ✅ safety.ts"

curl -sSL --no-compressed "$BASE_URL/.pi/extensions/git-safety.ts" -o "$TARGET/.pi/extensions/git-safety.ts"
echo "  ✅ git-safety.ts"

curl -sSL --no-compressed "$BASE_URL/.pi/extensions/usage.ts" -o "$TARGET/.pi/extensions/usage.ts"
echo "  ✅ usage.ts"

curl -sSL --no-compressed "$BASE_URL/.pi/extensions/files.ts" -o "$TARGET/.pi/extensions/files.ts"
echo "  ✅ files.ts"

curl -sSL --no-compressed "$BASE_URL/.pi/extensions/git-flow.ts" -o "$TARGET/.pi/extensions/git-flow.ts"
echo "  ✅ git-flow.ts"

# Settings
curl -sSL --no-compressed "$BASE_URL/.pi/settings.json" -o "$TARGET/.pi/settings.json"
echo "  ✅ settings.json"

# Task templates
curl -sSL --no-compressed "$BASE_URL/tasks/todo.md" -o "$TARGET/tasks/todo.md"
echo "  ✅ tasks/todo.md"

curl -sSL --no-compressed "$BASE_URL/tasks/lessons.md" -o "$TARGET/tasks/lessons.md"
echo "  ✅ tasks/lessons.md"

echo ""
echo "✅ All files updated to latest version"
echo ""
echo "Reload pi to apply changes: pi /reload"
