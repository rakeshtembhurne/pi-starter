# Pi-Starter: AI Coding Assistant Configuration

This project is configured for AI-assisted development with the pi coding agent.

## Quick Start

```bash
# Install pi globally
npm install -g @mariozechner/pi-coding-agent

# Set your API key
export ANTHROPIC_API_KEY="your-key"  # or OPENAI_API_KEY, GEMINI_API_KEY

# Start coding
pi
```

## Project Structure

```
.
├── .pi/
│   ├── extensions/      # Custom TypeScript extensions
│   │   ├── safety.ts       # Blocks dangerous bash commands
│   │   ├── git-safety.ts   # Protects git operations
│   │   ├── usage.ts        # Token/cost tracking (/usage)
│   │   ├── files.ts        # Enhanced directory listing
│   │   └── commit.ts       # Quality checks + commit (/commit)
│   └── settings.json    # Project-level settings
├── .ai/                   # AI temporary files (safe to delete)
│   ├── tmp/               # Screenshots, test outputs, temp files
│   ├── plans/             # AI thinking and strategy plans
│   ├── cache/             # Cached data (embeddings, indexes)
│   ├── logs/              # Session logs
│   └── drafts/            # Work-in-progress drafts
├── AGENTS.md            # This file - AI context and guidelines
├── README.md            # User documentation
└── tasks/               # Task tracking
```

## AI Temporary Files (.ai/)

**Store ALL temporary AI files in `.ai/` directory** - not scattered in project root or src/.

| Directory | Purpose |
|-----------|---------|
| `.ai/tmp/` | Screenshots, test outputs, render previews |
| `.ai/plans/` | AI thinking, strategy, analysis |
| `.ai/cache/` | Cached embeddings, search indexes |
| `.ai/logs/` | Session logs, execution traces |
| `.ai/drafts/` | Work-in-progress not ready for main project |

**Safe to delete**: `rm -rf .ai/` is safe - the AI will recreate what it needs.

## Coding Standards

### Quality First
- Write clean, readable, maintainable code
- Keep functions focused and under 20 lines
- Use descriptive names, avoid abbreviations
- Document complex logic with comments

### Testing
- Test everything that can break
- Aim for >80% coverage on business logic
- Run tests before committing

### Git Workflow
- Small, focused commits
- Clear, descriptive messages
- Use conventional commit format when possible

## Extensions Included

| Extension | Purpose | Command |
|-----------|---------|---------|
| safety | Confirms dangerous bash commands | Automatic |
| git-safety | Confirms dangerous git operations | Automatic |
| usage | Track session tokens/costs | `/usage` |
| files | Enhanced directory listing | Tool: `list_dir` |
| commit | Lint, typecheck, build, format → commit | `/commit` |

## Customization

1. Add extensions to `.pi/extensions/`
2. Modify settings in `.pi/settings.json`
3. Update this file for project-specific guidelines

## Resources

- [Pi Documentation](https://github.com/badlogic/pi-mono)
- [Extension Examples](https://github.com/badlogic/pi-mono/tree/main/examples/extensions)
- [Agent Skills Spec](https://agentskills.io)
