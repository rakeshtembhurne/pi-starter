# Pi-Starter

A minimal, production-ready template for AI-assisted development with the [pi coding agent](https://github.com/badlogic/pi-mono).

## Quick Start

Install in current directory:

```bash
# Install (only copies files that don't exist)
curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/install.sh | bash

# Or install to a specific directory
curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/install.sh | bash -s -- my-project/

# Update existing files to latest version
curl -sSL https://raw.githubusercontent.com/rakeshtembhurne/pi-starter/master/update.sh | bash
```

Then start coding:

```bash
pi
```

## What's Included

| File | Purpose |
|------|---------|
| `AGENTS.md` | AI context and coding guidelines |
| `.pi/extensions/` | TypeScript extensions |
| `.pi/settings.json` | Sensible defaults |
| `tasks/` | Task tracking templates |

### Extensions

| Extension | What it does |
|-----------|--------------|
| `safety.ts` | Confirms dangerous bash commands (`rm -rf`, etc.) |
| `git-safety.ts` | Confirms dangerous git operations (`git push --force`, etc.) |
| `usage.ts` | `/usage` - show session tokens and cost |
| `files.ts` | `list_dir` tool with emoji icons |
| `git-flow.ts` | Enforces GitFlow workflow (see below) |

### GitFlow Extension

Enforces proper GitFlow branching:

| Branch | Created From | Merges To |
|--------|--------------|----------|
| `feature/*` | develop | develop |
| `hotfix/*` | main | main + develop |
| `release/*` | develop | main + develop |

**Commands:**

```bash
/feature <name>    # Create feature/* from develop
/hotfix <name>     # Create hotfix/* from main
/release <version> # Create release/* from develop
/gitflow           # Show current branch status
```

**Protections:**
- Blocks commits to `main`/`master`
- Warns when committing to `develop`
- Ensures branches created from correct base
- Validates conventional commit messages

## Requirements

- Node.js 18+
- pi CLI: `npm install -g @mariozechner/pi-coding-agent`
- API key: `export ANTHROPIC_API_KEY="..."` (or OpenAI, Gemini)

## Usage

```bash
pi                              # Interactive mode
pi "Help me implement auth"     # With prompt
pi -c                           # Continue previous session
pi --model claude-sonnet-4      # Specific model
```

## Customization

### Add Extensions

Create `.pi/extensions/my-extension.ts`:

```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("Loaded!", "info");
  });
}
```

### Modify Settings

Edit `.pi/settings.json`:

```json
{
  "defaultThinkingLevel": "high",
  "compaction": { "enabled": true }
}
```

### Update AI Guidelines

Edit `AGENTS.md` to add project-specific standards.

## License

MIT
