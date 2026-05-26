# Naming Audit: usagepolicy

**Path:** `packages/usagepolicy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level "Usage Policy" management — create/get/list/update/delete cost-attribution policies that attach custom tags to billing usage and can be bound to specific workspaces. Hits `POST/GET/PATCH/DELETE /api/2.1/accounts/{accountId}/usage-policies`. The JSDoc on `UsagePolicy` reads "Contains the UsagePolicy details (same structure as BudgetPolicy)" — i.e. this package is an explicit clone of the sibling `budgetpolicy` package with a renamed entity and a bumped API version (`/api/2.1` vs `/api/2.0`).
**Total weird names flagged:** 16

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 5 |
| Low | 3 |
| Observation | 5 |

## High severity

### 1. Whole package duplicates `budgetpolicy` with a renamed entity — `src/v1/model.ts` (entire file) vs `packages/budgetpolicy/src/v1/model.ts`
- **Why weird:** `UsagePolicy` is `BudgetPolicy` with `Usage` substituted for `Budget`. The shared types (`CustomPolicyTag`, `Filter`, `LimitConfig`, `SortSpec`, `SortSpec_Field`) are textually identical between the two packages. The `UsagePolicy.policyId` JSDoc even confirms: "(same structure as BudgetPolicy)" (line 120). Same `/accounts/{accountId}/{verb}-policies` URL shape, same wire fields. The only material difference is the API version (`/api/2.1` vs `/api/2.0`) and the URL segment (`usage-policies` vs `budget-policies`).
- **Category:** 12 (duplicate concept — two sibling packages with the same shape and overlapping name), 1 (vague — `usage` and `budget` both modify the same underlying tag-policy concept).
- **Suggested name:** Either (a) collapse `usagepolicy` and `budgetpolicy` into a single package with a versioned entity, or (b) ensure both publish under distinct, non-overlapping type names. As shipped, a consumer importing both packages cannot disambiguate `Filter`, `LimitConfig`, `SortSpec`, `CustomPolicyTag`, or `Client` without aliasing.
- **Rationale:** This is the headline finding for the package. The duplication is a 1:1 clone, and the API team did not even bother to rename the reserved custom-tag keys: `CustomPolicyTag.key` JSDoc in `usagepolicy` still says `"budget-policy-name"`, `"budget-policy-id"`, `"budget-policy-resolution-result"` (line 27, copied from `budgetpolicy`). Two clones in one SDK with collidable names is a real usability problem.

### 2. `Filter` (bare top-level type) — `src/v1/model.ts:47`
- **Why weird:** Re-exported from `index.ts:11` as a bare top-level type. `Filter` is one of the most overloaded words in JS/TS (`Array#filter`, RxJS `filter`, content filters, etc.) and the type is package-scoped — but the re-export under this name *directly collides* with the same bare `Filter` in `packages/budgetpolicy/src/v1/model.ts:77`. Any user importing both packages will hit a name clash.
- **Category:** 1 (vague/generic), 12 (duplicate concept across two sibling packages with the same name).
- **Suggested name:** `UsagePolicyFilter` (and rename the sibling to `BudgetPolicyFilter`).
- **Rationale:** A bare `Filter` provides zero discoverability and forces a collision with `budgetpolicy.Filter`. Both packages target the same account-level API; consumers will frequently import both. This finding is doubly bad because the two `Filter` types have identical structure but are not type-compatible from TS's structural-typing perspective at the import boundary if a consumer aliases one (`import {Filter as BudgetFilter}`).

### 3. `UsagePolicy.bindingWorkspaceIds: number[]` representation — `src/v1/model.ts:129`
- **Why weird:** Workspace IDs are typed as `number[]`. Databricks workspace IDs are 64-bit integers. JS `number` only has 53-bit safe integer precision, so workspace IDs `>2^53` will silently lose precision. Same problem on `Filter.creatorUserId: number` (line 57).
- **Category:** 16 (field type contradicts domain — int64 in a 53-bit number type), 19 (underspecified ID — no encoding documented).
- **Suggested name:** `bindingWorkspaceIds: bigint[]` or `string[]` (matches Databricks REST API serialisation of large IDs).
- **Rationale:** Generator/policy issue across the SDK. Worth flagging at every usage site.

## Medium severity

### 4. `CustomPolicyTag` type name — `src/v1/model.ts:23`
- **Why weird:** Type is just `{key, value}` — i.e. a plain tag. `CustomPolicyTag` is a triple-loaded name: "custom" (versus what? a built-in tag?), "policy" (which policy? the only one in scope), "tag" (the actual semantic noun). Two of the three words are redundant in context. Also colliding with the same `CustomPolicyTag` exported from `budgetpolicy/src/v1/model.ts:53`.
- **Category:** 7 (overly verbose), 8 (redundant prefix `CustomPolicy*` already implied by location), 12 (duplicate concept across siblings with identical name).
- **Suggested name:** `Tag` (in this package it's unambiguous) or `PolicyTag`.
- **Rationale:** `customTags: CustomPolicyTag[]` reads as type-suffix tautology + redundant `Custom`. The doc on `CustomPolicyTag.key` even calls them "custom tags".

### 5. `CustomPolicyTag` reserved-key documentation refers to `budget-policy-*` keys — `src/v1/model.ts:27-29`
- **Why weird:** Doc says key cannot be `"budget-policy-name"`, `"budget-policy-id"` or `"budget-policy-resolution-result"`. These reserved keys are the wire-form spelling **from the budget-policy domain** — copy-pasted verbatim from the `budgetpolicy` package without renaming to the usage-policy equivalents (one would expect `usage-policy-name` etc.). Either (a) the wire really *does* use the `budget-policy-*` prefix (which is a Databricks API design issue worth surfacing), or (b) the JSDoc was lazily duplicated and the actual reserved keys are different.
- **Category:** 6 (misleading: cross-domain magic strings that callers must memorise), 12 (duplicate across siblings — but here it's a *bug*, because the reserved keys are not surfaced as constants and may differ from `budgetpolicy`), 18 (long magic string sentinels).
- **Suggested name:** Either expose a `RESERVED_TAG_KEYS` constant per package, or validate the wire payload and throw a typed error. If the wire truly shares the budget-policy reserved keys, the JSDoc should say "(shared with budget-policy)" to remove the ambiguity.
- **Rationale:** Documentation-only constraints are easy to violate and produce server-side 400s. Either way the verbatim duplication smells.

### 6. `Filter.creatorUserId: number` representation — `src/v1/model.ts:57`
- **Why weird:** User IDs are typed as `number`. Databricks user IDs are 64-bit integers. JS `number` only has 53-bit safe integer precision, so user IDs `>2^53` will silently lose precision.
- **Category:** 16 (field type contradicts domain — int64 in a 53-bit number type), 19 (underspecified ID — no encoding documented).
- **Suggested name:** `creatorUserId: bigint` or `string` (matches Databricks REST API serialisation of large IDs).
- **Rationale:** Same as finding #3 but for the filter field. Generator-wide concern; same problem on `bindingWorkspaceIds: number[]`.

### 7. `SortSpec` type — `src/v1/model.ts:103`
- **Why weird:** `SortSpec` (specification) and `Field` together build the "what to sort by" structure. `Spec` is generic — every type is a spec of something. The wrapping type holds two fields (`field` + `descending`); a one-or-two-field pair could be inlined into the request.
- **Category:** 1 (vague suffix `Spec`), 11 (trivial wrapper holding two fields).
- **Suggested name:** `SortOptions`, or inline as `sortField?: SortField; sortDescending?: boolean` on the request.
- **Rationale:** `Spec` adds no information. `sortBy: SortField` plus a boolean is more direct. Mirrors `budgetpolicy` finding #17.

### 8. `UpdateUsagePolicyRequest` has **no** `updateMask` field — `src/v1/model.ts:111-118`
- **Why weird:** `budgetpolicy.UpdateBudgetPolicyRequest` (`packages/budgetpolicy/src/v1/model.ts:165`) carries an `updateMask?: FieldMask<BudgetPolicy>` plus a `budgetPolicyFieldMask(...paths)` builder. `usagepolicy.UpdateUsagePolicyRequest` does not. Either (a) the usage-policy API genuinely uses replace-on-PATCH semantics (no partial updates) — in which case the JSDoc should say so — or (b) the SDK is missing field-mask support that the API offers. Without inspection of the OpenAPI source, either is plausible, and the absence of a doc note is itself a finding.
- **Category:** 17 (inconsistency across near-clone sibling packages), Observation (potential missing surface).
- **Suggested name:** If full-replace: document on `UpdateUsagePolicyRequest`. If partial-update: add `updateMask?: FieldMask<UsagePolicy>` and a `usagePolicyFieldMask(...paths)` helper to match the sibling.
- **Rationale:** A user toggling between the two clones will expect parity. The divergence is silent and unjustified by either docstring.

## Low severity

### 9. `Client` class plain name — `src/v1/client.ts:46`
- **Why weird:** Top-level export `Client`. When a consumer imports `Client` from `@databricks/sdk-usagepolicy/v1`, they will almost certainly alias it (`import {Client as UsagePolicyClient}`) to avoid collision with `Client` from every other package — including the byte-identical class from `@databricks/sdk-budgetpolicy/v1`.
- **Category:** 1 (vague — `Client` is the most generic name in the SDK ecosystem), 12 (duplicate across all packages, *especially* this one and `budgetpolicy`).
- **Suggested name:** `UsagePolicyClient`.
- **Rationale:** Each generated package emits a `Client`. With `usagepolicy`/`budgetpolicy` being near-clones, the importer who needs both will be forced into double-aliasing.

### 10. `req` parameter name on client methods — `src/v1/client.ts:77,103,122,147,194,212`
- **Why weird:** Abbreviation `req` instead of `request`. Six occurrences in `client.ts`.
- **Category:** 5 (cryptic abbreviation when the long form fits comfortably).
- **Suggested name:** `request`.
- **Rationale:** Style. Comments on `client.ts` already use the full word. Same convention should apply to params for hovers. Same as `budgetpolicy` finding #35.

### 11. `SortSpec_Field` proto-style underscore-nested enum name — `src/v1/model.ts:6`
- **Why weird:** Underscored identifier `SortSpec_Field` mirrors protobuf's "ParentMessage_NestedEnum" wire convention and is unidiomatic in TypeScript. The file even carries `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.` on line 5, confirming the proto-architectural leak. Re-exported from `index.ts:5` so the leak reaches consumers verbatim.
- **Category:** Proto-architectural leak — proto-nested-type naming convention surfaced into the TS public API.
- **Suggested name:** `SortField` (or namespace it under `SortSpec` as `SortSpec.Field` if the nesting relationship matters).
- **Rationale:** TS has no `Parent_Nested` convention; the underscore is a direct proto leak. Mirrors the same finding in `budgetpolicy` (`SortSpec_Field` at `budgetpolicy/src/v1/model.ts:8`).

## Observations

### 12. URL-path version split (`/api/2.1` vs `/api/2.0`) is the only meaningful API surface difference
The only on-the-wire distinction between this package and `budgetpolicy` is the URL: `/api/2.1/accounts/{accountId}/usage-policies` (`client.ts:80,106,125,150,215`) vs `/api/2.0/accounts/{accountId}/budget-policies`. Same HTTP verbs, same query parameter names (`page_size`, `page_token`, `filter_by`, `sort_spec`, `limit_config`), same request and response shapes. If the two endpoints are intended to converge under the `2.1` URL, `budgetpolicy` is likely v1 of the same surface and this package supersedes it. If they are intended to coexist, the type names should not collide.
- **Category:** 12 (duplicate concept), 1 (vague package boundary).

### 13. No `FieldMask` import in `usagepolicy/src/v1/model.ts`
Unlike `budgetpolicy/src/v1/model.ts:3-4` which imports `FieldMask` from `@databricks/sdk-core/wkt` and emits a `budgetPolicyFieldMask(...paths)` helper (lines 271-282), `usagepolicy` has no `FieldMask` machinery at all. This is linked to finding #8 (no `updateMask` on the update request). Either the API genuinely doesn't support field masks (the SDK is correct), or it does and the SDK is missing the support.
- **Category:** Observation / 17 (cross-package inconsistency).

### 14. Action-verb conventions in `Client`
The client consistently uses `create`/`delete`/`get`/`list`/`update` verbs. No mixed `fetch`/`retrieve`/`read`.
- **Category:** 17 (observation of consistency, per rule that we flag inconsistencies — this is the inverse).

### 15. Acronym casing `Id` consistently used as `Id`, not `ID`
`policyId`, `accountId`, `creatorUserId`, `bindingWorkspaceIds`, `requestId`, `pageSize`/`pageToken`. Internal consistency holds. Inconsistent only with external `URLSearchParams` (Web API; out of our control).
- **Category:** 3 (observation — internal acronym style is consistent).

### 16. Wire-form vs kebab-case vs TS casings (`usage_policies` / `usage-policies` / `usagePolicies`)
The same identifier appears in three forms in the same client file:
- `usage_policies` — wire form (in the Zod schemas via snake_case keys).
- `usage-policies` — URL path segment (`client.ts:80,106,125,150,215`).
- `usagePolicies` — TS type/method names.

Readers must mentally translate. Worth flagging because the kebab-case form does not appear in the audit findings unless one inspects the URL building code.
- **Category:** 3 (acronym/casing inconsistency — three forms of the same identifier).

## Domain glossary
- `usage policy` — A named policy that attaches custom tags to billing usage and optionally restricts which workspaces apply it. Same structure as `budgetpolicy.BudgetPolicy` per the JSDoc on `UsagePolicy` (line 120). Despite "usage" in the name, no usage-data concept (rows/metrics/period) lives on the model — only tags and workspace bindings.
- `binding workspace` — A workspace that the policy is exclusively applied to (subset of account workspaces). Implementation: `UsagePolicy.bindingWorkspaceIds: number[]`.
- `custom tag` — A `{key, value}` pair attached to billing usage. Reserved keys per JSDoc: `budget-policy-name`, `budget-policy-id`, `budget-policy-resolution-result` (note: keys retain the `budget-policy-` prefix even though this is the *usage* policy package — see finding #5).
- `account id` — The Databricks account-level identifier (path segment in URL: `/api/2.1/accounts/{accountId}/usage-policies`).
- `policy id` — Generated server-side; globally unique. Used as the resource id in get/update/delete paths.

## File coverage
- `src/v1/model.ts` (230 lines): read fully.
- `src/v1/client.ts` (252 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully. Byte-identical to `budgetpolicy/src/v1/utils.ts` (same 4012-byte file size).
- `src/v1/index.ts` (20 lines): read fully.
- Cross-referenced: `packages/budgetpolicy/src/v1/model.ts`, `packages/budgetpolicy/src/v1/client.ts`, `packages/budgetpolicy/src/v1/index.ts` (the near-clone sibling), and previously-audited `.agent/naming-audit/budgetpolicy.md` for consistency.
