# AGENTS.md — Databricks SDK JS

Universal entry point for AI agents working on this codebase.

## Quick Start

Before making any code change, agents **must** read and follow the relevant
rules in `.agent/rules/`. The rules are authoritative — if a rule contradicts
your training data, the rule wins.

## Repository Overview

| Item               | Value                              |
| ------------------ | ---------------------------------- |
| Language           | TypeScript (strict mode)           |
| Runtime            | Node.js >= 22, Browser             |
| Package manager    | npm workspaces                     |
| Build target       | ES2024, ESNext modules             |
| Linter             | ESLint (strict-type-checked)       |
| Formatter          | Prettier                           |
| Test framework     | Vitest                             |
| Module system      | ESM only                           |

## Directory Layout

```
sdk-js/
├── packages/              # npm workspace packages
│   ├── auth/              # @databricks/sdk-auth
│   │   ├── src/           # TypeScript source
│   │   └── tests/         # Vitest test files
│   └── databricks/        # @databricks/sdk-databricks (core library)
│       ├── src/
│       │   └── apierror/  # API error types (mirrors Go SDK apierr/)
│       │       └── codes/ # Canonical error codes
│       └── tests/
├── .agent/                # Agent configuration
│   ├── rules/             # Coding, linting, and logic rules
│   ├── skills/            # Reusable executable capabilities
│   └── prompts/           # Reusable complex prompt templates
├── .eslintrc.cjs          # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── tsconfig.base.json     # Shared TypeScript compiler options
└── tsconfig.json          # Root TypeScript project config
```

## Rules

Rules live in `.agent/rules/` as `.mdc` files. Each rule file is
self-contained and includes its scope, enforcement level, and examples.

| Rule file              | Scope                                  |
| ---------------------- | -------------------------------------- |
| `typescript.mdc`       | TypeScript language and style rules    |
| `packages.mdc`         | Package scaffolding and conventions    |
| `testing.mdc`          | Testing conventions                    |
| `porting.mdc`          | Porting code from the Go reference SDK |
| `libraries.mdc`        | Library selection over hand-rolling    |

## Common Commands

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run all tests
npm test

# Lint (check only)
npm run lint

# Lint (auto-fix)
npm run lint:fix

# Format (check only)
npm run format:check

# Format (auto-fix)
npm run format

# Type-check without emitting
npm run typecheck

# Clean build artifacts
npm run clean
```

## Workflow for Agents

1. **Read the rules.** Start with `.agent/rules/typescript.mdc`.
2. **Understand existing code.** Read neighbouring files before editing.
3. **Run checks.** After every change run
   `npm run format && npm run lint && npm run typecheck`.
4. **Run tests.** Confirm nothing is broken with `npm test`.
5. **Comments are sentences.** Every comment must be a proper sentence ending
   with a period.
6. **Back up claims.** When proposing a design decision or asserting a
   convention, provide concrete references (documentation, API links). Do not
   state something is "idiomatic" or "standard" without evidence. Use
   authoritative primary sources (language specs, official documentation) — not
   blog posts, archived repositories, or npm packages.
7. **Stay in scope.** Only change what was asked.  Each change should be 
   reviewable in isolation.
8. **Never silently remove code.** If a change requires deleting existing
   code or tests, explain what is being removed and why **before** proceeding.
   Get explicit confirmation from the user.
9. **Match existing patterns.** Before writing new code, check existing code
   for established patterns. Do not invent new conventions
   when the codebase already has one.
