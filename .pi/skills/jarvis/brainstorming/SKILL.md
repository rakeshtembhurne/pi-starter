---
name: jarvis-brainstorming
description: "Use before any creative work - features, components, modifications. Explore intent, requirements, design before implementation."
---

# Brainstorming - Design Before Code

<HARD-GATE>
Do NOT write any code, scaffold files, or take implementation action until you have presented a design and the user approved it.
</HARD-GATE>

## When to Use

- New feature request
- Adding functionality
- Modifying behavior
- Creating components

## The Process

### 1. Explore Project Context

Check files, docs, recent commits to understand current state.

### 2. Ask Clarifying Questions

One at a time. Focus on:
- **Purpose** - Why are we building this?
- **Constraints** - What limits what we can do?
- **Success criteria** - How do we know it works?
- **Edge cases** - What are the boundaries?

### 3. Propose Approaches

Offer 2-3 approaches with trade-offs and your recommendation.

### 4. Present Design

Scale to complexity. Cover:
- Architecture
- Components
- Data flow
- Error handling
- Testing approach

Get user approval after each section.

### 5. Write Design Document

Save to `.ai/plans/YYYY-MM-DD-<topic>-design.md`

```markdown
# Feature Design: <Name>

**Created:** YYYY-MM-DD  
**Status:** Draft → Approved

## Overview
[What we're building and why]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Architecture
[How it fits together]

## Components
### Component 1
- Responsibility: X
- API: Y

## Data Flow
[How data moves through the system]

## Error Handling
[How errors are handled]

## Testing Approach
[How we'll verify it works]

## Open Questions
[Any outstanding items]
```

### 6. Get User Sign-off

> "Design written to `.ai/plans/<file>.md`. Please review and approve before we proceed."

### 7. Transition to Planning

Once approved: invoke `/skill:jarvis-writing-plans`

## Anti-Patterns

❌ "This is too simple to need a design"
❌ "Let me just start coding"
❌ "I know what they want"

✅ Small designs for small features, but ALWAYS present and get approval.

## Key Principles

- **One question at a time** - Don't overwhelm
- **Multiple choice preferred** - Easier to answer
- **YAGNI ruthlessly** - Remove unnecessary features
- **Incremental validation** - Get approval before moving on
