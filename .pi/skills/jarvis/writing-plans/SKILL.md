---
name: jarvis-writing-plans
description: "Use when you have a design spec ready and need to create an implementation plan with tasks."
---

# Writing Implementation Plans

## Prerequisites

Design spec should exist at `.ai/plans/YYYY-MM-DD-<feature>-design.md`

## The Process

### 1. Load Design Spec

Read the design document. Understand what needs to be built.

### 2. Create Implementation Plan

Save to `.ai/plans/YYYY-MM-DD-<feature>-plan.md`

```markdown
# <Feature> Implementation Plan

**Goal:** [One sentence]
**Design:** [.ai/plans/YYYY-MM-DD-feature-design.md]
**Created:** YYYY-MM-DD
**Status:** In Progress

## Tasks

- [ ] Task 1: [Description]
- [ ] Task 2: [Description]
- [ ] Task 3: [Description]

## Task Details

### Task 1: [Name]

**Approach:** [How to implement]

**Files:**
- Create: `path/to/file.ext`
- Modify: `existing/file.ext:line-line`

**Steps:**
1. [Step with code if needed]
2. [Next step]

**Verification:** `command to run`

### Task 2: [Name]
...

## Execution Log

- [YYYY-MM-DD HH:MM] Plan created
```

### 3. Sync Tasks to `.tasks/active.md`

Create or update `.tasks/active.md` with tasks from the plan:

```markdown
# Active Tasks

## <feature> (In Progress)

- [ ] Task 1: [Description]
- [ ] Task 2: [Description]
- [ ] Task 3: [Description]

**Plan:** .ai/plans/YYYY-MM-DD-feature-plan.md
**Updated:** YYYY-MM-DD HH:MM
```

### 4. Present Plan to User

> "Plan created and synced to `.tasks/active.md`. Ready to implement?"

## Task Granularity

**Each task should be:**
- 2-5 minutes of work
- One clear action
- Independently testable

**Good:**
- "Write the failing test"
- "Run it to verify it fails"
- "Implement minimal code"

**Bad:**
- "Build the feature"
- "Add tests later"
- "Handle edge cases"

## Plan Header

Every plan MUST start with:

```markdown
# <Feature> Implementation Plan

**Goal:** [One sentence]
**Design:** [.ai/plans/...]
**Status:** In Progress
```

## No Placeholders

Every step must have actual content. No:
- "TBD", "TODO"
- "Add validation later"
- "Handle edge cases"
- "Similar to Task N"

## After Planning

**User approves?** → Ready to implement with `/skill:jarvis-inline-execution`

## File Paths

| File | Location |
|------|----------|
| Design specs | `.ai/plans/*-design.md` |
| Implementation plans | `.ai/plans/*-plan.md` |
| Task tracking | `.tasks/active.md` |
| Temp files | `.ai/tmp/` |
| Logs | `.ai/logs/` |
