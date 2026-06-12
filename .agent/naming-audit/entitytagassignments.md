# Naming Audit: entitytagassignments

**Path:** `packages/uc/entitytagassignments/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 3

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 1 |

## High severity

### 1. `TagAssignmentSourceType` — `src/v1/model.ts:10`
- **Why weird:** Three-word enum name `TagAssignmentSourceType`. "Source" + "Type" is a tautology — an enum *is* a type, so `*Type` suffix is filler.
- **Category:** 20 (type-suffix tautology — `Type` on an enum), 7 (overly verbose).
- **Suggested name:** `TagSource` (drop both `Assignment` and `Type`).
- **Rationale:** The shorter name is unambiguous in context. Sister Unity Catalog packages have analogous enums like `Privilege`, `SchemaType` — `Type` suffix is used inconsistently across the SDK.

### 2. `tagKey` field doc inconsistency: required marker on get/delete, not on `EntityTagAssignment` — `src/v1/model.ts:32,42,60`
- **Why weird:** `DeleteEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag to delete". `GetEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag". But `EntityTagAssignment.tagKey` (on the actual returned/created object) and `CreateEntityTagAssignmentRequest.tagAssignment.tagKey` are documented as just "The key of the tag" with no required marker — yet you cannot create or get a tag without a key. The `?: string | undefined` typing makes all of them optional in TS. Type and doc disagree.
- **Category:** 6 (misleading — type says optional, semantics says required), 17 (inconsistent — some docs say "Required.", others don't, for what is the same logical field).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) and remove the "Required." doc preamble since the type enforces it. Apply uniformly across all four request types and the assignment type itself.
- **Rationale:** "Required." in a docstring while the type is optional is a generator smell. Honest required-ness should travel through the type.

## Medium severity

### 3. `req.entityType ?? ''` / `req.entityName ?? ''` / `req.tagKey ?? ''` URL composition — `src/v1/client.ts:124,147,181,248`
- **Why weird:** Four endpoints silently substitute empty string for missing path components. `req.entityType` and `req.entityName` and `req.tagKey` are typed `string | undefined` but functionally required (URL is broken without them). When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-name/tags/key`. Same problem flagged in `dataclassification` audit.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** Field name promises less than the API requires; the SDK silently produces malformed URLs.
