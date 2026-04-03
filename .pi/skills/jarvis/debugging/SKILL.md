---
name: jarvis-debugging
description: "Use when encountering bugs, test failures, or unexpected behavior. Find root cause before fixing."
---

# Systematic Debugging

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

## The Four Phases

### Phase 1: Root Cause Investigation

**Before ANY fix:**

1. **Read Error Messages Carefully**
   - Read stack traces completely
   - Note line numbers, file paths

2. **Reproduce Consistently**
   - Can you trigger it every time?
   - What are exact steps?

3. **Check Recent Changes**
   - What changed recently?
   - Git diff, new dependencies

4. **Trace Data Flow**
   - Where does bad value originate?
   - Trace backward through call stack

### Phase 2: Pattern Analysis

1. **Find Working Examples**
   - Similar working code in codebase?

2. **Compare Against References**
   - Read reference implementations completely

3. **Identify Differences**
   - What's different between working and broken?

### Phase 3: Hypothesis

1. **Form Single Hypothesis**
   - "I think X is root cause because Y"

2. **Test Minimally**
   - One variable at a time
   - Smallest possible change

3. **Verify Before Continuing**
   - Worked? → Phase 4
   - Didn't? → New hypothesis

### Phase 4: Implementation

1. **Create Failing Test** - Reproduce the bug
2. **Fix Root Cause** - One change
3. **Verify** - Test passes now
4. **No Other Tests Broken**

## Debugging Anti-Patterns

❌ "Quick fix for now"
❌ "Just try X and see"
❌ "I'll write test after"
❌ "Multiple changes at once"
❌ "One more fix attempt" (after 2+ failures)

**After 3+ failed fixes:** Stop and question architecture.

## Checklist

- [ ] Read error message completely
- [ ] Reproduced bug consistently
- [ ] Traced data flow backward
- [ ] Found root cause
- [ ] Created failing test
- [ ] Fixed root cause (not symptom)
- [ ] Test passes
- [ ] No other tests broken

## Log to Plan

If there's an active plan in `.ai/plans/`, add a debug log:

```markdown
## Debug Log: <Issue>

**Date:** YYYY-MM-DD
**Root Cause:** X
**Fix:** Y
**Test Added:** test_name
```
