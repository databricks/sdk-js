# Naming Audit: environments

**Path:** `packages/environments/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`

**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |

---

## High severity

### 1. `WorkspaceBaseEnvironment` — type name is a 26-character three-adjective noun phrase — `model.ts:731`
- **Why weird:** The central type's name is the prefix every other identifier in the package inherits, so its length cascades: `CreateWorkspaceBaseEnvironmentRequest`, `RefreshWorkspaceBaseEnvironmentOperation`, `ListWorkspaceBaseEnvironmentsResponse`, etc. Three of the four words (`Workspace`, `Base`, `Environment`) are present in every export. The 26 characters are baked into the *type prefix*, not the enum-member prefix; this is a TS-surface concern, not a proto-codegen concern.
- **Category:** 7 (overly verbose type prefix), 1 (generic — "base" and "environment" together still don't say what the resource *is*: a YAML dependency manifest pointer).
- **Suggested name:** Drop one of the adjectives in the *type* name. The package being named already implies "environment", and the URL is `/api/environments/v1/workspace-base-environments` — at most one of `Workspace` or `Base` is informationally necessary in TS. Options: `BaseEnvironment`, `WorkspaceEnvironment`, or rename the whole package and call the type `BaseEnvironment`.
- **Rationale:** Length compounds: every method, request, response, schema function, and operation class repeats `WorkspaceBaseEnvironment` once or twice. A user typing `client.crea[Tab]` faces a wall of nearly identical 36+ character names.

### 2. `WorkspaceBaseEnvironment.status` field type's name and the type's domain do not align — `model.ts:750`
- **Why weird:** `WorkspaceBaseEnvironment.status` is typed `WorkspaceBaseEnvironmentCache_Status` — i.e. the *status of a Cache*. But the field documents itself as "The status of the materialized workspace base environment", not the status of a cache. The user reads `env.status` and the type's name implies a different concept (cache) than the doc and the data (materialization state of the environment).
- **Category:** 16 (field type contradicts type domain), 6 (misleading).
- **Suggested name:** Rename the enum type to `MaterializationStatus` (the doc's own words) and drop the `Cache` qualifier.
- **Rationale:** Field name and type name should describe the same thing. The mismatch is a tell that the enum type was named for an internal proto nesting that the public API doesn't surface.

---
