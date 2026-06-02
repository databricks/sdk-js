# Naming Audit: workspacebindings

**Path:** `packages/workspacebindings/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog workspace bindings — controls which Databricks workspaces can access a given UC securable (catalog, storage credential, credential, external location) and at what access level (`READ_WRITE` or `READ_ONLY`). Exposes a legacy catalog-only API (`/workspace-bindings/catalogs/{name}`) and a generic securable-aware API (`/bindings/{type}/{full_name}`).
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| Medium | 1 |
| Observation | 1 |

A redundant Go-style `Info` suffix and a context-free client error message make up
the remaining findings.

---

## Medium severity

### 1. `WorkspaceBindingInfo` (type) — `src/v1/model.ts:84`
- **Why weird:** `Info` suffix is a Go-style convention (`*Info` types in `databricks/sdk-go` are pervasive: `CatalogInfo`, `TableInfo`, `SchemaInfo`...). In TS the suffix carries no information — the type *is* the binding, not a separate "info-about-the-binding" record. Just two fields: `workspaceId` and `bindingType`.
- **Category:** 14 (Go-style name), 8 (redundant suffix).
- **Suggested name:** `WorkspaceBinding`.
- **Rationale:** Drop Go suffixes when porting; sibling packages have already done this for some types but not consistently.

---

## Observations

### 2. Client `Host is required.` error message — `src/v1/client.ts:60`
The error thrown when `options.host` is undefined says only "Host is required." — no client name, no package context. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed. Naming-adjacent.
- **Category:** Observation.
