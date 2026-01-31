# jest-matcher-http Configuration

> **Additional Jest matchers for HTTP responses.**
>
> This file contains project-specific configuration. Universal Laws 1-20 are inherited from
> the shared `.claude/CLAUDE.md`.

## Project Context

jest-matcher-http is a JavaScript library that provides custom Jest matchers for testing HTTP
responses. It enables expressive assertions like `expect(response).toHaveStatus(200)` or
`expect(response).toBeSuccessful()`.

The library is published to npm and supports multiple HTTP client libraries including Axios,
Superagent, and Needle.

## Tech Stack

| Layer     | Technology                |
| --------- | ------------------------- |
| Language  | JavaScript (ES6+)         |
| Types     | TypeScript declarations   |
| Testing   | Jest 29.x                 |
| Linting   | ESLint (Airbnb base)      |
| Release   | semantic-release          |
| CI        | GitHub Actions            |

## Project Structure

```
jest-matcher-http/
├── src/                    # Source code
│   ├── index.js            # Main entry point
│   ├── matchers.js         # Matcher implementations
│   └── *.unit.test.js      # Unit tests
├── types/                  # TypeScript declarations
│   └── index.d.ts
├── integration_tests/      # Integration tests with HTTP clients
├── build/                  # Build output
├── docs/                   # Documentation
│   ├── general             # Symlink to shared docs
│   └── agent-memory/       # Agent learning files
├── .husky/                 # Git hooks
└── package.json
```

## Project-Specific Principles

- This is a **library**, not an application - some standard scripts may not apply
- Uses **Jest** (not Vitest) because it's a Jest matcher library
- Type definitions are maintained separately in `/types/`
- Semantic versioning via semantic-release

## Project-Specific Laws

- **Testing**: Use Jest for this project (exception to Vitest requirement in TRQ-001)
- **Build**: No build step required for pure JS library

## Testing Context

### Test Commands

| Command              | Purpose                           |
| -------------------- | --------------------------------- |
| `npm run test:unit`  | Run unit tests                    |
| `npm run test:unit:coverage` | Run unit tests with coverage |

### Test Structure

- Unit tests: `src/*.unit.test.js`
- Integration tests: `integration_tests/`

## Coding Context

- Pure JavaScript with JSDoc annotations
- Type definitions in `types/index.d.ts`
- ESLint with Airbnb base configuration
- Matchers follow Jest's custom matcher API

## Debugging Context

- Run tests with `--verbose` flag for detailed output
- Integration tests spin up Express server for real HTTP testing
