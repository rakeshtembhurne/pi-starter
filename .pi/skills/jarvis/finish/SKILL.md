---
name: jarvis-finish
description: "Use when implementation is complete, all tasks done, and ready to integrate. Presents merge/PR options."
---

# Finishing a Development Branch

## Prerequisites

- [ ] All tests pass
- [ ] Linting clean
- [ ] Build succeeds
- [ ] All tasks complete in `.tasks/active.md`
- [ ] Plan marked complete in `.ai/plans/`

## The Process

### Step 1: Verify Tests

```bash
npm test
npm run lint
npm run build
```

**If tests fail:** Stop. Fix first.

### Step 2: Present Options

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (handle later)
4. Discard this work

Which option?
```

### Step 3: Execute Choice

#### Option 1: Merge Locally

```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
# Run tests on merged result
git branch -d <feature-branch>
```

#### Option 2: Push and Create PR

```bash
git push -u origin <feature-branch>
gh pr create --title "<title>" --body "## Summary\n..."
```

#### Option 3: Keep As-Is

Report branch status. Worktree preserved.

#### Option 4: Discard

**Confirm first:**

```
This will delete:
- Branch <name>
- All commits

Type 'discard' to confirm.
```

### Step 4: Cleanup

After completing (not keeping):

- Archive completed plan: `.ai/plans/YYYY-MM-DD-feature-plan.md` → add "COMPLETED" status
- Update `.tasks/active.md` - mark feature complete or remove
- Remove worktree if created

## Cleanup Templates

### Archive Plan

```markdown
# <Feature> Implementation Plan

**Goal:** ...
**Status:** COMPLETED ✓
**Completed:** YYYY-MM-DD
```

### Archive Tasks

In `.tasks/active.md`:

```markdown
## Completed

### feature-name (Completed YYYY-MM-DD)
- [x] Task 1
- [x] Task 2

---
## feature-name (In Progress)
- [ ] Task 1
```

## Common Mistakes

❌ Proceeding with failing tests
❌ No confirmation for discard
❌ Skipping worktree cleanup
❌ Not archiving completed plans

## Quick Reference

| Option | Merge | Push | Keep | Delete |
|--------|-------|------|------|--------|
| 1. Merge locally | ✓ | - | - | ✓ |
| 2. Create PR | - | ✓ | ✓ | - |
| 3. Keep as-is | - | - | ✓ | - |
| 4. Discard | - | - | - | ✓ |
