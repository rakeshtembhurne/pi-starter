---
name: jarvis-inline-execution
description: "Use when executing an implementation plan. Reads from .ai/plans/ and updates .tasks/active.md as tasks complete."
---

# Inline Plan Execution

## Prerequisites

Implementation plan exists at `.ai/plans/YYYY-MM-DD-<feature>-plan.md`
Tasks synced to `.tasks/active.md`

## The Process

### 1. Load Plan and Tasks

```
Read: .ai/plans/YYYY-MM-DD-feature-plan.md
Read: .tasks/active.md
```

### 2. Show Current Status

Present task list to user:

```
## Current Task: <N/M>

- [x] Completed task 1
- [ ] In progress: Task 2 ← YOU ARE HERE
- [ ] Task 3

Ready to start Task 2?
```

### 3. Execute Task

For each task:

1. **Mark in progress** in `.tasks/active.md`
2. **Execute steps** from plan
3. **Run verification** as specified
4. **Mark complete** when verified
5. **Commit** if appropriate

### 4. Update Task File

After each task:

```markdown
# Active Tasks

## feature (In Progress)

- [x] Task 1: Completed description
- [x] Task 2: Completed description  
- [ ] Task 3: Current task

**Plan:** .ai/plans/YYYY-MM-DD-feature-plan.md
**Updated:** YYYY-MM-DD HH:MM
```

### 5. Update Plan Log

Add to execution log in plan:

```markdown
## Execution Log

- [YYYY-MM-DD HH:MM] Started
- [YYYY-MM-DD HH:MM] Task 1 complete - "implemented X"
- [YYYY-MM-DD HH:MM] Task 2 complete - "added Y"
```

## Task Execution Template

For each step in a task:

```
[ ] Step 1: Do this
    Run: `command`
    Expected: output

[ ] Step 2: Do that
    Code: 
    ```language
    code here
    ```

[ ] Step 3: Verify
    Run: `command`
    Expected: PASS
```

## TDD Integration

For each feature task:

1. **RED** - Write failing test
2. **Verify** - Run test, see it fail
3. **GREEN** - Write minimal code
4. **Verify** - Run test, see it pass
5. **REFACTOR** - Clean up
6. **Commit** - Small, focused commit

## Verification Before Claims

❌ "Test passes"
❌ "It should work"
❌ "Looks good"

✅ Run: `npm test` → See: "10/10 pass"

## Stop Conditions

**STOP and ask when:**
- Task is blocked (missing info)
- Plan has gaps
- Verification fails
- Need clarification

## After All Tasks

When all tasks complete:

```
✅ All tasks complete!

Tests: 10/10 passing
Linting: Clean
Build: Success

Ready to verify and finish?
→ /skill:jarvis-verification
→ /skill:jarvis-finish
```

## File Sync

| Action | Update |
|--------|--------|
| Start task | Mark `[ ]` → `[~]` in `.tasks/active.md` |
| Complete task | Mark `[~]` → `[x]` in `.tasks/active.md` |
| All done | Update plan status, notify user |
