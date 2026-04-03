---
name: jarvis-verification
description: "Use before claiming completion. Evidence before assertions - run verification commands and show output."
---

# Verification Before Completion

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

## The Gate

**BEFORE claiming any status:**

1. **IDENTIFY** - What command proves this?
2. **RUN** - Execute the full command
3. **READ** - Full output, check exit code
4. **VERIFY** - Does output confirm claim?

Skip any step = lying, not verifying

## Verification Checklist

- [ ] **Tests** - Run full test suite
- [ ] **Linting** - Run linter, check for errors
- [ ] **Build** - Verify clean build
- [ ] **Plan tasks** - All checked off in `.tasks/active.md`
- [ ] **Plan log** - Execution log complete

## Evidence Templates

### Tests

❌ "Tests pass"
❌ "Should work now"
✅ `npm test` → See: "20/20 passing"

### Linting

❌ "Linter clean"
❌ "No errors"
✅ `npm run lint` → See: "0 errors"

### Build

❌ "Builds fine"
✅ `npm run build` → See: "exit 0"

### Plan Compliance

❌ "Done with plan"
✅ Read plan → Check each requirement

## Red Flags

❌ "Should", "Probably", "Seems"
❌ "Looks correct"
❌ "Trust me"
❌ "It's fine"

✅ "See output above: X/Y passing"

## Final Report Template

```markdown
## Verification Complete

| Check | Command | Result |
|-------|---------|--------|
| Tests | `npm test` | 20/20 ✓ |
| Lint | `npm run lint` | 0 errors ✓ |
| Build | `npm run build` | Success ✓ |
| Tasks | .tasks/active.md | 5/5 complete ✓ |

**Ready to merge/PR?**
→ /skill:jarvis-finish
```
