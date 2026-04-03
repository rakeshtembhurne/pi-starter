#!/bin/bash
# Install pi-starter into a project directory
# Usage: curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/main/install.sh | bash -s -- <target-dir>

set -e

TARGET="${1:-.}"

if [ "$TARGET" = "." ]; then
  echo "Installing pi-starter in current directory..."
else
  echo "Installing pi-starter in $TARGET..."
  mkdir -p "$TARGET"
fi

# Download files from GitHub
BASE_URL="https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master"

# Create directories
mkdir -p "$TARGET/.pi/extensions"
mkdir -p "$TARGET/tasks"

# Download core files
curl -sSL "$BASE_URL/AGENTS.md" -o "$TARGET/AGENTS.md"
curl -sSL "$BASE_URL/.gitignore" -o "$TARGET/.gitignore"

# Download extensions
curl -sSL "$BASE_URL/.pi/extensions/safety.ts" -o "$TARGET/.pi/extensions/safety.ts"
curl -sSL "$BASE_URL/.pi/extensions/git-safety.ts" -o "$TARGET/.pi/extensions/git-safety.ts"
curl -sSL "$BASE_URL/.pi/extensions/usage.ts" -o "$TARGET/.pi/extensions/usage.ts"
curl -sSL "$BASE_URL/.pi/extensions/files.ts" -o "$TARGET/.pi/extensions/files.ts"
curl -sSL "$BASE_URL/.pi/extensions/git-flow.ts" -o "$TARGET/.pi/extensions/git-flow.ts"

# Download settings
curl -sSL "$BASE_URL/.pi/settings.json" -o "$TARGET/.pi/settings.json"

# Download task templates
curl -sSL "$BASE_URL/tasks/todo.md" -o "$TARGET/tasks/todo.md"
curl -sSL "$BASE_URL/tasks/lessons.md" -o "$TARGET/tasks/lessons.md"

echo ""
echo "✅ pi-starter installed in $TARGET"
echo ""
echo "Next steps:"
echo "  1. Install pi: npm install -g @mariozechner/pi-coding-agent"
echo "  2. Set API key: export ANTHROPIC_API_KEY='your-key'"
echo "  3. Start coding: cd $TARGET && pi"
