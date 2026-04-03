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
mkdir -p "$TARGET/.ai/tmp"
mkdir -p "$TARGET/.ai/plans"
mkdir -p "$TARGET/.ai/cache"
mkdir -p "$TARGET/.ai/logs"
mkdir -p "$TARGET/.ai/drafts"
mkdir -p "$TARGET/tasks"

echo ""
echo "Updating files..."
echo ""

# Core files
curl -sSL --no-compressed "$BASE_URL/AGENTS.md" -o "$TARGET/AGENTS.md"
echo "  ✅ AGENTS.md"

curl -sSL --no-compressed "$BASE_URL/README.md" -o "$TARGET/README.md"
echo "  ✅ README.md"

curl -sSL --no-compressed "$BASE_URL/.gitignore" -o "$TARGET/.gitignore"
echo "  ✅ .gitignore"

# .ai/ directory structure (AI temporary files)
curl -sSL --no-compressed "$BASE_URL/.ai/README.md" -o "$TARGET/.ai/README.md"
echo "  ✅ .ai/README.md"

curl -sSL --no-compressed "$BASE_URL/.ai/.gitignore" -o "$TARGET/.ai/.gitignore"
echo "  ✅ .ai/.gitignore"

curl -sSL --no-compressed "$BASE_URL/.ai/tmp/.gitkeep" -o "$TARGET/.ai/tmp/.gitkeep"
echo "  ✅ .ai/tmp/.gitkeep"

curl -sSL --no-compressed "$BASE_URL/.ai/plans/.gitkeep" -o "$TARGET/.ai/plans/.gitkeep"
echo "  ✅ .ai/plans/.gitkeep"

curl -sSL --no-compressed "$BASE_URL/.ai/cache/.gitkeep" -o "$TARGET/.ai/cache/.gitkeep"
echo "  ✅ .ai/cache/.gitkeep"

curl -sSL --no-compressed "$BASE_URL/.ai/logs/.gitkeep" -o "$TARGET/.ai/logs/.gitkeep"
echo "  ✅ .ai/logs/.gitkeep"

curl -sSL --no-compressed "$BASE_URL/.ai/drafts/.gitkeep" -o "$TARGET/.ai/drafts/.gitkeep"
echo "  ✅ .ai/drafts/.gitkeep"

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

curl -sSL --no-compressed "$BASE_URL/.pi/extensions/commit.ts" -o "$TARGET/.pi/extensions/commit.ts"
echo "  ✅ commit.ts"

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
echo ""
echo "📁 AI temporary files are stored in .ai/ directory"
echo "   Safe to delete anytime: rm -rf .ai/"
