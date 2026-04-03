---
name: jarvis-tdd
description: "Use when implementing any feature or bugfix. Red-green-refactor cycle: write test first, watch it fail, write minimal code, verify."
---

# Test-Driven Development

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

## Red-Green-Refactor

### RED - Write Failing Test

```typescript
test('description of expected behavior', () => {
  const result = functionUnderTest(input);
  expect(result).toBe(expected);
});
```

**Requirements:**
- One behavior per test
- Clear name
- Real code (no mocks unless unavoidable)

### Verify RED

**MANDATORY** - Run the test and watch it fail:

```bash
npm test path/to/test.ts
```

**Confirm:**
- Test fails (not errors)
- Failure is expected (feature missing)

### GREEN - Minimal Code

Write the simplest code to pass:

```typescript
function functionUnderTest(input) {
  return expected;
}
```

**No:**
- Extra features
- Refactoring
- "Improvements"

### Verify GREEN

**MANDATORY** - Run the test and watch it pass:

```bash
npm test path/to/test.ts
```

### REFACTOR

After green only:
- Remove duplication
- Improve names
- Extract helpers

**Keep tests green.**

## Example: Bug Fix

**Bug:** Empty email accepted

### RED
```typescript
test('rejects empty email', () => {
  const result = validate({ email: '' });
  expect(result.error).toBe('Email required');
});
```

### Verify RED
```
FAIL: expected 'Email required', got undefined
```

### GREEN
```typescript
function validate(data) {
  if (!data.email?.trim()) {
    return { error: 'Email required' };
  }
  // ...
}
```

### Verify GREEN
```
PASS: 1/1
```

## Common Mistakes

❌ Code before test → Delete, start over
❌ Test passes immediately → Testing wrong thing
❌ Skipping RED verification → Not TDD
❌ "I'll test later" → Tests-after ≠ TDD

## Anti-Rationalization

| Thought | Reality |
|---------|---------|
| "Too simple to test" | Simple code breaks |
| "I'll test after" | Tests-after proves nothing |
| "Already manually tested" | Manual ≠ systematic |
| "TDD slows me down" | Debugging slows more |

## When Stuck

| Problem | Solution |
|---------|----------|
| Can't test | Write wished-for API first |
| Test complex | Design too complex |
| Many mocks | Code too coupled |
