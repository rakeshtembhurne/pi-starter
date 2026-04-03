---
name: jarvis
description: "Jarvis - AI Development Workflow. Use for design, planning, TDD, debugging, and systematic development. Brainstorm before code, write plans to .ai/plans/, track tasks in .tasks/, verify before claiming completion."
---

# Jarvis Development Workflow

A complete software development workflow for this project.

## Core Principles

1. **Brainstorm before code** - Understand what you're building
2. **Plans live in `.ai/plans/`** - Implementation plans with tasks
3. **Tasks sync with `.tasks/`** - Task tracking that feeds from plans
4. **TDD always** - Red-green-refactor for every feature
5. **Verify before claims** - Evidence before completion statements
6. **Clean branches** - Proper merge/PR workflow

## File Structure

```
.ai/                    # AI working directory (safe to delete: rm -rf .ai/)
├── plans/              # All plans (design specs + implementation plans)
│   ├── YYYY-MM-DD-feature-design.md    # Design specifications
│   └── YYYY-MM-DD-feature-plan.md      # Implementation plans
├── tmp/                # Screenshots, test outputs
├── logs/               # Session logs
└── drafts/             # Work-in-progress

.tasks/                 # Task tracking (synced from plans)
└── active.md          # Current active tasks
```

## Core Skills

| Task | Command | Purpose |
|------|---------|---------|
| Check First | `/skill:jarvis-check` | Check for applicable skills before any action |
| Design | `/skill:jarvis-brainstorming` | Explore requirements, write design spec |
| Plan | `/skill:jarvis-writing-plans` | Create implementation plan, sync tasks |
| Implement | `/skill:jarvis-inline-execution` | Execute plan tasks, update tasks |
| Test | `/skill:jarvis-tdd` | Red-green-refactor cycle |
| Debug | `/skill:jarvis-debugging` | Root cause analysis |
| Verify | `/skill:jarvis-verification` | Evidence before claims |
| Finish | `/skill:jarvis-finish` | Merge, PR, or cleanup |

## Workflow

```
User: "Build X feature"
    ↓
/skill:jarvis-brainstorming
    → Understand requirements
    → Write design to .ai/plans/YYYY-MM-DD-x-design.md
    ↓
/skill:jarvis-writing-plans
    → Create implementation plan
    → Extract tasks to .tasks/active.md
    ↓
/skill:jarvis-inline-execution
    → Execute tasks from plan
    → Update .tasks/active.md as you go
    → TDD for each feature
    ↓
/skill:jarvis-verification
    → Verify all tasks complete
    → Run tests, lint, build
    ↓
/skill:jarvis-finish
    → Present merge/PR options
    → Execute choice
```

## Quick Start

```bash
# New feature
/skill:jarvis-brainstorming

# Have a spec ready
/skill:jarvis-writing-plans

# Implement
/skill:jarvis-inline-execution

# Bug found
/skill:jarvis-debugging
```

## Task Format

Tasks in `.tasks/active.md`:

```markdown
# Active Tasks

## feature-name (In Progress)

- [ ] Task 1: Description
- [ ] Task 2: Description  
- [x] Task 3: Completed

Updated: 2026-04-03 19:00
```

## Plan Format

Plans in `.ai/plans/YYYY-MM-DD-feature-plan.md`:

```markdown
# Feature Implementation Plan

**Goal:** One sentence
**Created:** YYYY-MM-DD
**Status:** In Progress

## Tasks

- [ ] Task 1
- [ ] Task 2

## Execution Log

- [YYYY-MM-DD HH:MM] Started
```
