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
   `npm run format && npm run lint && npm run typecheck && npm run test && npm run test:browser`.
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
10. **PR descriptions follow the template.** Use the structure in
   `.github/PULL_REQUEST_TEMPLATE.md`. When writing or improving a PR
   description, follow the workflow in
   `.agent/skills/write-pr-description.mdc`.

## Naming Audit Maintenance

The naming audit lives at `.agent/naming-audit/`:

- One `<package>.md` per API package in `packages/` (~98 files).
- A cross-package synthesis at `_SUMMARY.md`.

Each per-package audit follows a fixed structure: a summary table, then
`High`/`Medium`/`Low`/`Observation` sections with one numbered finding per
issue. Each finding cites `file:line`, the category, a suggested name, and
the rationale.

Two reduction workflows keep the audit current. Both spawn one
`general-purpose` agent per API package in parallel batches of ~20 to
avoid collision in reasoning. Always omit the `model` parameter so
subagents inherit the parent model.

### A. Rescan after the generator runs

**Trigger:** the user regenerated client code under `packages/*/src/v*/`
and asks to re-validate the audit. Phrasings like "rescan the audit",
"re-run the naming audit", or "the generated client changed".

**Per-package agent task:**

1. List the package's source files (`src/v*/model.ts`, `client.ts`,
   `utils.ts`, `index.ts`) and read each in full.
2. Read the existing audit at `.agent/naming-audit/<pkg>.md`.
3. For every numbered finding, locate the cited symbol in the current
   source and classify it as:
   - **Fixed** — the symbol is gone, has been renamed to the suggested
     name, or the underlying issue (e.g. underscore identifier, redundant
     enum prefix) no longer applies.
   - **Still present** — same symbol, same problem, possibly at a new
     line number; update the line number in place.
   - **Superseded** — the symbol exists but the original concern shifted
     into a different category; rewrite the finding.
4. Delete fixed findings from the active `High`/`Medium`/`Low` sections.
   Append them to a `## Fixed` section at the bottom of the file with a
   one-line note (`Fixed in regeneration on YYYY-MM-DD`).
5. Recompute the summary table totals.

**After every agent finishes:** regenerate `_SUMMARY.md` so the
cross-package totals, theme counts, and by-the-numbers table reflect the
new state. Do not edit `_SUMMARY.md` by hand; spawn a synthesis agent
that re-reads every per-package audit.

### B. Prune a recommendation category

**Trigger:** the user pushes back on a class of finding as not a real
issue. Examples: "underscore `_Response` identifiers are fine", "redundant
enum prefixes are intentional for proto compatibility", "`marshal` /
`unmarshal` verb names are deliberate".

**Per-package agent task:**

1. Read `.agent/naming-audit/<pkg>.md`.
2. Identify every finding whose category, rationale, or suggested-name
   pattern matches the user-described class. Be exhaustive — the same
   category may appear in `High`, `Medium`, `Low`, and `Observation`
   sections and may be phrased differently across packages.
3. Remove those findings cleanly. Renumber remaining findings so the
   numbering stays sequential.
4. Recompute the summary table totals.
5. If pruning empties a section, leave the section header with a single
   line saying `_None._` rather than deleting the header.

The agent prompt must spell out the disqualifying criterion verbatim from
the user. Do not generalize. If the user says "stop flagging `_Response`
underscores", the agent removes findings about `Foo_Response` underscored
identifiers — not findings about underscores in other contexts (e.g.,
`Foo_BarType` proto-nested type names).

**After every agent finishes:** regenerate `_SUMMARY.md` the same way as
in workflow A.

### C. Promote to a generator-only recommendation

**Trigger:** the user explicitly tells you a class of finding is only
fixable at the generator/template level and is not worth carrying in 98
per-package audits. Phrasings like "this is a generator-only fix", "only
add this to the summary", "this is generator-only, prune it from every
package".

**Never invoke this workflow autonomously.** Claude must not decide that
something is "generator-level" on its own — only the user can promote a
finding to this category. If Claude believes a category looks like it
fits, it can suggest workflow C, but must wait for explicit confirmation
before spawning agents.

**Per-package agent task:**

1. Read `.agent/naming-audit/<pkg>.md`.
2. Remove every finding matching the user's verbatim criterion (same
   precision rules as workflow B).
3. Renumber remaining findings and recompute the summary table totals.
4. If pruning empties a section, leave the section header with a single
   line saying `_None._`.

**Summary recording (once, not per-package):** after all per-package
agents finish, spawn a synthesis agent that edits `_SUMMARY.md` to add
the rule under a `## Generator-only recommendations` section (create the
section if it does not exist). Each entry must record:

- The rule, in one line (e.g., "Drop the `_Response` underscore suffix
  on response types").
- Why it is generator-only (one line).
- The approximate package count where it appeared before pruning
  (read from git diff of the per-package files, or count from the prior
  `_SUMMARY.md` themes table).
- One illustrative example (`<pkg>` — `Foo_Response`).

This ensures the recommendation is not lost — the user reads it once in
`_SUMMARY.md` instead of 98 times in per-package files. After adding,
regenerate the rest of `_SUMMARY.md` (themes, by-the-numbers table,
totals) so cross-package counts stay consistent.

### Operational notes

- The list of API packages is everything under `packages/` that has a
  `src/v*/` subdirectory. Generate it with:
  `for d in packages/*/; do [ -d "$d/src" ] && ls "$d/src" 2>/dev/null | grep -qE '^v[0-9]' && echo "${d#packages/}"; done`.
- Batch parallel agent calls at ~20-25 per message.
- Agents must always write back to the existing audit file path. Never
  create new files in `.agent/naming-audit/` outside of `_SUMMARY.md`
  and the one-per-package `<pkg>.md`.
- The `auth`, `core`, `databricks`, `sdk`, and `options` packages are
  hand-written, not generated. They are out of scope for the naming
  audit — do not create or update audit files for them.
