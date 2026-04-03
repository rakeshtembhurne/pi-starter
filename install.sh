#!/bin/bash
# Install pi-starter into a project directory
# Usage: curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/install.sh | bash -s -- <target-dir>
#
# Only installs files that don't exist. Use update.sh to replace existing files.

set -e

TARGET="${1:-.}"

if [ "$TARGET" = "." ]; then
  echo "Installing pi-starter in current directory..."
else
  echo "Installing pi-starter in $TARGET..."
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

SKIPPED=""
INSTALLED=""

# Helper function to download if not exists
download_if_missing() {
  local url="$1"
  local file="$2"
  local name="$3"
  
  if [ -f "$file" ]; then
    SKIPPED="$SKIPPED $name"
    echo "  ⏭️  Skipped $name (already exists)"
  else
    curl -sSL --no-compressed "$url" -o "$file"
    INSTALLED="$INSTALLED $name"
    echo "  ✅ Installed $name"
  fi
}

# Helper to download if not exists (for directories, always download if dir exists but file missing)
download_dir_if_missing() {
  local url="$1"
  local file="$2"
  local name="$3"
  local dir="$4"
  
  if [ -f "$file" ]; then
    SKIPPED="$SKIPPED $name"
    echo "  ⏭️  Skipped $name (already exists)"
  else
    mkdir -p "$dir"
    curl -sSL --no-compressed "$url" -o "$file"
    INSTALLED="$INSTALLED $name"
    echo "  ✅ Installed $name"
  fi
}

echo ""
echo "Installing files..."
echo ""

# Core files
download_if_missing "$BASE_URL/AGENTS.md" "$TARGET/AGENTS.md" "AGENTS.md"
download_if_missing "$BASE_URL/README.md" "$TARGET/README.md" "README.md"
download_if_missing "$BASE_URL/.gitignore" "$TARGET/.gitignore" ".gitignore"

# .ai/ directory structure (AI temporary files)
download_dir_if_missing "$BASE_URL/.ai/README.md" "$TARGET/.ai/README.md" ".ai/README.md" "$TARGET/.ai"
download_dir_if_missing "$BASE_URL/.ai/.gitignore" "$TARGET/.ai/.gitignore" ".ai/.gitignore" "$TARGET/.ai"
download_dir_if_missing "$BASE_URL/.ai/tmp/.gitkeep" "$TARGET/.ai/tmp/.gitkeep" ".ai/tmp/.gitkeep" "$TARGET/.ai/tmp"
download_dir_if_missing "$BASE_URL/.ai/plans/.gitkeep" "$TARGET/.ai/plans/.gitkeep" ".ai/plans/.gitkeep" "$TARGET/.ai/plans"
download_dir_if_missing "$BASE_URL/.ai/cache/.gitkeep" "$TARGET/.ai/cache/.gitkeep" ".ai/cache/.gitkeep" "$TARGET/.ai/cache"
download_dir_if_missing "$BASE_URL/.ai/logs/.gitkeep" "$TARGET/.ai/logs/.gitkeep" ".ai/logs/.gitkeep" "$TARGET/.ai/logs"
download_dir_if_missing "$BASE_URL/.ai/drafts/.gitkeep" "$TARGET/.ai/drafts/.gitkeep" ".ai/drafts/.gitkeep" "$TARGET/.ai/drafts"

# Extensions
download_if_missing "$BASE_URL/.pi/extensions/safety.ts" "$TARGET/.pi/extensions/safety.ts" "safety.ts"
download_if_missing "$BASE_URL/.pi/extensions/git-safety.ts" "$TARGET/.pi/extensions/git-safety.ts" "git-safety.ts"
download_if_missing "$BASE_URL/.pi/extensions/usage.ts" "$TARGET/.pi/extensions/usage.ts" "usage.ts"
download_if_missing "$BASE_URL/.pi/extensions/files.ts" "$TARGET/.pi/extensions/files.ts" "files.ts"
download_if_missing "$BASE_URL/.pi/extensions/git-flow.ts" "$TARGET/.pi/extensions/git-flow.ts" "git-flow.ts"
download_if_missing "$BASE_URL/.pi/extensions/commit.ts" "$TARGET/.pi/extensions/commit.ts" "commit.ts"

# Settings
download_if_missing "$BASE_URL/.pi/settings.json" "$TARGET/.pi/settings.json" "settings.json"

# Task templates
download_if_missing "$BASE_URL/tasks/todo.md" "$TARGET/tasks/todo.md" "tasks/todo.md"
download_if_missing "$BASE_URL/tasks/lessons.md" "$TARGET/tasks/lessons.md" "tasks/lessons.md"

echo ""
if [ -n "$INSTALLED" ]; then
  echo "✅ Installed:$INSTALLED"
fi
if [ -n "$SKIPPED" ]; then
  echo "⏭️  Skipped (already exist):$SKIPPED"
  echo ""
  echo "💡 To update existing files, run:"
  echo "   curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/update.sh | bash"
fi

echo ""
echo "Next steps:"
echo "  1. Install pi: npm install -g @mariozechner/pi-coding-agent"
echo "  2. Set API key: export ANTHROPIC_API_KEY='your-key'"
echo "  3. Start coding: cd $TARGET && pi"
echo ""
echo "📁 AI temporary files will be stored in .ai/ directory"
echo "   Safe to delete anytime: rm -rf .ai/"
