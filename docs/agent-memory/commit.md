# Commit Agent Memory - jest-matcher-http

## Project-Specific Patterns

### Commit Message Format
- This project uses conventional commits enforced by commitlint
- Breaking changes are marked with `!` after type: `fix!: description`
- BREAKING CHANGE footer explains the breaking change details

### Pre-commit Hook Behavior
- Runs lint:fix (ESLint)
- Runs test:unit (Jest unit tests)
- Project uses Jest (not Vitest) - it's a Jest matcher library

### Project Structure
- Pure JavaScript library (no build step)
- TypeScript declarations in `/types/`
- Integration tests in `/integration_tests/`

### Timeout Settings
- Standard commits: 300000ms (5 minutes)
- May need longer if integration tests are added to pre-commit

## Common Patterns

### TRQ-001 Compliance
- Symlinks: `.claude`, `.mcp.json`, `docs/general`
- Config files: `CLAUDE.local.md`, `.prettierrc`, `.commitlintrc.cjs`
- Git hooks: `.husky/commit-msg`
- Documentation: `docs/PROGRESS_REPORT.md`, `docs/agent-memory/`

### ESLint Migration (v8 → v9)
- Flat config format (`eslint.config.js` replaces `.eslintrc.js`)
- Breaking change pattern for config format changes
- Requires Node >=20 for ESLint 9

## Lessons Learned

### First Commit (2026-01-31)
- Breaking changes require both `!` marker and BREAKING CHANGE footer
- ESLint migration is a significant breaking change
- Combine compliance work with vulnerability fixes in single commit when related

### Pre-commit Hook Failures (2026-01-31)
- JSDoc type warnings: Replace `Function` with specific signature `(param: type) => ReturnType`
- JSDoc type warnings: Replace `any` with `unknown` or `Record<string, unknown>`
- Integration test timeouts: Tests that spawn child processes need explicit timeout (30000ms)
- Pattern: `it('test name', (done) => { ... }, 30000)` for tests using exec/spawn
- Always fix lint warnings before retrying commit (use `npm run lint:fix`)
- Test execution can take 30+ seconds for integration tests with child processes
