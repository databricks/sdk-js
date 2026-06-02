# Naming Audit: tagassignments

**Path:** `packages/tagassignments/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 5

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 2 |
| Observation | 2 |

## High severity

### 1. `ListTagAssignmentsRequest.entityType` / `entityId` are functionally required but typed optional — `src/v1/model.ts:31,33` and used in URL at `client.ts:152`
- **Why weird:** The list URL is `/api/2.0/entity-tag-assignments/${entityType ?? ''}/${entityId ?? ''}/tags`. When either is undefined, the URL becomes `.../entity-tag-assignments///tags`. Both fields are typed `string | undefined`, but `entityType` and `entityId` are clearly required to address an entity. Same issue on `Get`/`Delete`/`Update`. The SDK silently produces malformed URLs.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** The shape `req.entityType ?? ''` betrays the contract: nullable input cannot legally produce a valid URL. Generator-wide concern.

## Medium severity

### 2. `ListTagAssignmentsRequest` (plural) vs. `TagAssignment` (singular) — `src/v1/model.ts:29` vs. `src/v1/model.ts:46`
- **Why weird:** The plural appears only on list types. The HTTP resource on the wire is `/entity-tag-assignments` (plural) while the item type is singular `TagAssignment`. List response is `ListTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as-is (cross-SDK convention). Listed for completeness.
- **Rationale:** Rule 9 demands the flag even when intentional.

### 3. URL composition with `req.entityType ?? ''` etc. — `src/v1/client.ts:102,124,152,206`
- **Why weird:** Four endpoints silently fall back to empty string for missing path components. When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-id/tags/key`. Same problem flagged in other packages; specific instance here.
- **Category:** 6 (misleading — silent malformed URLs).
- **Suggested name:** Make `entityType`/`entityId`/`tagKey` non-optional on path-bearing request types.
- **Rationale:** See #1. Generator-wide concern.

## Observations

### 4. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 5. `tagassignments` lowercase package name vs. types and HTTP path
The package directory is `tagassignments` (single token, no separator). Types are `TagAssignment` (PascalCase, no compound). HTTP path is `/entity-tag-assignments` (kebab and *with* `entity`). Three different naming conventions for the same concept across three surface layers. Same problem as sister packages.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types), 1 (vague directory token).
