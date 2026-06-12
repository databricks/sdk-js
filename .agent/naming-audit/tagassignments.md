# Naming Audit: tagassignments

**Path:** `packages/tagassignments/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 1 |

## High severity

### 1. `ListTagAssignmentsRequest.entityType` / `entityId` are functionally required but typed optional — `src/v1/model.ts:31,33` and used in URL at `client.ts:155`
- **Why weird:** The list URL is `/api/2.0/entity-tag-assignments/${entityType ?? ''}/${entityId ?? ''}/tags`. When either is undefined, the URL becomes `.../entity-tag-assignments///tags`. Both fields are typed `string | undefined`, but `entityType` and `entityId` are clearly required to address an entity. Same issue on `Get`/`Delete`/`Update`. The SDK silently produces malformed URLs.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** The shape `req.entityType ?? ''` betrays the contract: nullable input cannot legally produce a valid URL. Generator-wide concern.

## Medium severity

### 2. URL composition with `req.entityType ?? ''` etc. — `src/v1/client.ts:103,126,155,210`
- **Why weird:** Four endpoints silently fall back to empty string for missing path components. When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-id/tags/key`. Same problem flagged in other packages; specific instance here.
- **Category:** 6 (misleading — silent malformed URLs).
- **Suggested name:** Make `entityType`/`entityId`/`tagKey` non-optional on path-bearing request types.
- **Rationale:** See #1. Generator-wide concern.
