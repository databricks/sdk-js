# Naming Audit: dataclassification

**Path:** `packages/dataclassification/src/v1/`
**Versions audited:** v1
**Inferred domain:** Data Classification configuration on Unity Catalog catalogs — enable/disable scanning, scope schemas, and configure auto-tagging of classified columns with governance/system tags.
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 0 |
| Medium | 1 |
| Low | 0 |
| Observation | 1 |

## High severity

_None._

## Medium severity

### 1. `Client` class — `src/v1/client.ts:38`
- **Why weird:** A class literally named `Client` at the top level of the package's API surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `DataClassificationClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-dataclassification'` and `import {Client} from '@databricks/sdk-abacpolicies'` cannot, and must rename. Sister packages all share the same problem, suggesting a generator-level rename. Worth flagging upstream.

## Low severity

_None._

## Observations

### 2. Acronym casing
The codebase mixes `Http` (PascalCase capital-then-lower) with `URLSearchParams` (Web standard ALLCAPS imported by name). Field uses `userAgent` (camelCase). No `Id`/`URL`/`UC` clashes encountered in this small package. The `Http`/`URL` split mirrors the JS ecosystem and is hard to fix locally.
- **Category:** 3 (acronym casing).

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the configured resource is a UC catalog).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `auto-tagging` / `auto-tag` — automatic application of governance tags to columns classified by the scanner (used both as gerund `AutoTagging` in types and as noun `AutoTag` in field names).
- `system tag` / `governance tag` — terminology in JSDoc for `classificationTag` (built-in vs. custom class tag keys).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (206 lines): read fully.
- `src/v1/client.ts` (181 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
