# Naming Audit: entitytagassignments

**Path:** `packages/uc/entitytagassignments/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 5

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 2 |
| Observation | 1 |

## High severity

### 1. `TagAssignmentSourceType` — `src/v1/model.ts:9`
- **Why weird:** Three-word enum name `TagAssignmentSourceType`. "Source" + "Type" is a tautology — an enum *is* a type, so `*Type` suffix is filler.
- **Category:** 20 (type-suffix tautology — `Type` on an enum), 7 (overly verbose).
- **Suggested name:** `TagSource` (drop both `Assignment` and `Type`).
- **Rationale:** The shorter name is unambiguous in context. Sister Unity Catalog packages have analogous enums like `Privilege`, `SchemaType` — `Type` suffix is used inconsistently across the SDK.

### 2. `tagKey` field doc inconsistency: required marker on get/delete, not on `EntityTagAssignment` — `src/v1/model.ts:26,36,54`
- **Why weird:** `DeleteEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag to delete". `GetEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag". But `EntityTagAssignment.tagKey` (on the actual returned/created object) and `CreateEntityTagAssignmentRequest.tagAssignment.tagKey` are documented as just "The key of the tag" with no required marker — yet you cannot create or get a tag without a key. The `?: string | undefined` typing makes all of them optional in TS. Type and doc disagree.
- **Category:** 6 (misleading — type says optional, semantics says required), 17 (inconsistent — some docs say "Required.", others don't, for what is the same logical field).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) and remove the "Required." doc preamble since the type enforces it. Apply uniformly across all four request types and the assignment type itself.
- **Rationale:** "Required." in a docstring while the type is optional is a generator smell. Honest required-ness should travel through the type.

## Medium severity

### 3. `ListEntityTagAssignmentsRequest` (plural) vs. `EntityTagAssignment` (singular) — `src/v1/model.ts:60` vs. `src/v1/model.ts:32`
- **Why weird:** The plural appears only on the list endpoint; the rest of the surface is singular. Singular/plural mix is consistent with the Go SDK and other packages, but worth flagging that the resource name on the wire is `/entity-tag-assignments` (plural) while the type name is singular `EntityTagAssignment`. The list response is `ListEntityTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as is (this is the cross-SDK convention). Listed for completeness.
- **Rationale:** Listed only to confirm: List endpoints use plural, item type is singular. No fix needed; flagged because rule 9 demands the audit.

### 4. `req.entityType ?? ''` / `req.entityName ?? ''` / `req.tagKey ?? ''` URL composition — `src/v1/client.ts:123,145,178,244`
- **Why weird:** Four endpoints silently substitute empty string for missing path components. `req.entityType` and `req.entityName` and `req.tagKey` are typed `string | undefined` but functionally required (URL is broken without them). When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-name/tags/key`. Same problem flagged in `dataclassification` audit.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** Field name promises less than the API requires; the SDK silently produces malformed URLs.

## Observations

### 5. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.
