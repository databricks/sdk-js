# Naming Audit: usagepolicy

**Path:** `packages/usagepolicy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level "Usage Policy" management — create/get/list/update/delete cost-attribution policies that attach custom tags to billing usage and can be bound to specific workspaces. Hits `POST/GET/PATCH/DELETE /api/2.1/accounts/{accountId}/usage-policies`. The JSDoc on `UsagePolicy` reads "Contains the UsagePolicy details (same structure as BudgetPolicy)" — i.e. this package is an explicit clone of the sibling `budgetpolicy` package with a renamed entity and a bumped API version (`/api/2.1` vs `/api/2.0`).
**Total weird names flagged:** 35

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 12 |
| Low | 10 |
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

### 3. `UpdateUsagePolicyRequest.limitConfig` field doc references a non-existent successor — `src/v1/model.ts:117`
- **Why weird:** JSDoc reads: "DEPRECATED. This is redundant field as LimitConfig is part of the UsagePolicy". But `UsagePolicy` itself (line 121–130) does **not** have a `limitConfig` member, so the JSDoc claim ("LimitConfig is part of the UsagePolicy") is wrong about its successor — the field has nowhere to migrate to within this package.
- **Category:** 6 (misleading — doc points to a non-existent replacement).
- **Suggested name:** Fix the JSDoc to either point at the real successor or drop the migration hint.
- **Rationale:** A new-language SDK should not inherit other-language migration warts on day one, and the warning is broken because the documented successor doesn't exist in this package's `UsagePolicy`.

### 4. `CreateUsagePolicyRequest.requestId` documented as idempotency-ish key — `src/v1/model.ts:14-21`
- **Why weird:** JSDoc: "A unique identifier for this request. Restricted to 36 ASCII characters." — `requestId` is a vague field name that does not signal "idempotency key" to callers. The doc says nothing about idempotency (unlike `budgetpolicy`'s `CreateBudgetPolicyRequest.requestId` doc at `packages/budgetpolicy/src/v1/model.ts:37-42` which explicitly mentions idempotency). The semantic is unclear: trace id? correlation id? idempotency key?
- **Category:** 1 (vague — `requestId` could mean anything), 15 (generic field name losing meaning), 17 (inconsistent across sibling packages — sibling spells out idempotency, this one doesn't).
- **Suggested name:** `idempotencyKey` (matches Stripe/Square/most REST APIs) and expand the JSDoc to clarify semantics.
- **Rationale:** Sibling-package divergence is worse than either choice alone: a caller flipping between `usagepolicy` and `budgetpolicy` cannot rely on identical semantics for the same-named field. Either both packages should call it `idempotencyKey` or both `requestId`, and both docs should state idempotency.

### 5. `UsagePolicy.policyId` / `UsagePolicy.policyName` field naming inside `UsagePolicy` type — `src/v1/model.ts:123,125`
- **Why weird:** Fields on the `UsagePolicy` type prefix every field with `policy*` (`policyId`, `policyName`). When you already have `policy.policyId` and `policy.policyName`, the `policy` prefix is redundant.
- **Category:** 8 (redundant prefix when context already supplies it), 20 (type-suffix tautology — `policyId` of type `UsagePolicy.id` is `policyId`).
- **Suggested name:** `id`, `name` (the wire stays `policy_id`/`policy_name`).
- **Rationale:** `usagePolicy.id` reads better than `usagePolicy.policyId`. The redundancy is a Go SDK habit where flat structs need the prefix to differentiate; TS doesn't. Mirrors `budgetpolicy` finding #9.

### 6. `UsagePolicy.bindingWorkspaceIds` — `src/v1/model.ts:129`
- **Why weird:** `binding` as a noun-prefix reads as "workspace IDs of a binding". JSDoc: "List of workspaces that this usage policy will be exclusively bound to." The natural name is `boundWorkspaceIds` (past participle, indicating the relationship has already been set up). Additionally, the JSDoc here is shorter than in `budgetpolicy` (which adds "An empty binding implies that this budget policy is open to any workspace in the account.") — the empty-binding semantic is silently dropped from `usagepolicy`, creating yet another inter-package documentation divergence.
- **Category:** 1 (vague — `binding` is generic: data binding, key binding, etc.), 6 (misleading word choice — "binding" implies a binding object exists), 17 (inconsistent doc across siblings).
- **Suggested name:** `boundWorkspaceIds` or `workspaceIds`.
- **Rationale:** "Bound" is the past participle that matches the doc ("will be exclusively bound to"). `binding` reads as a separate entity.

### 7. `UsagePolicy.bindingWorkspaceIds: number[]` representation — `src/v1/model.ts:129`
- **Why weird:** Workspace IDs are typed as `number[]`. Databricks workspace IDs are 64-bit integers. JS `number` only has 53-bit safe integer precision, so workspace IDs `>2^53` will silently lose precision. Same problem on `Filter.creatorUserId: number` (line 57).
- **Category:** 16 (field type contradicts domain — int64 in a 53-bit number type), 19 (underspecified ID — no encoding documented).
- **Suggested name:** `bindingWorkspaceIds: bigint[]` or `string[]` (matches Databricks REST API serialisation of large IDs).
- **Rationale:** Generator/policy issue across the SDK. Worth flagging at every usage site.

### 8. Filter operator semantics undocumented — `src/v1/model.ts:47-63`
- **Why weird:** The `Filter` type has three optional fields whose names imply singular match (`policyName`, `creatorUserId`, `creatorUserName`), but the JSDoc on `policyName` says "The partial name of policies to be filtered on" — implying substring match. The other two fields don't document their operator (equality? prefix? substring?). When multiple fields are set, the JSDoc on the type says "All specified filters will be applied in conjunction" — i.e. AND — but the per-field docs each repeat "If unspecified, all policies will be returned", which is confusing in the presence of the conjunction rule.
- **Category:** 6 (misleading — singular noun for what is likely a substring/multi-match filter), 1 (vague — no operator spelled in the name).
- **Suggested name:** `policyNameContains`, `creatorUserIdEquals`, `creatorUserNameContains` (or pluralise to lists where appropriate).
- **Rationale:** Filter DSLs benefit from explicit operators. Bare singular names with conjunction semantics buried in the type JSDoc force readers to puzzle through three short paragraphs to know what "set both fields" actually does. Mirrors `budgetpolicy` finding #14.

## Medium severity

### 9. `CustomPolicyTag` type name — `src/v1/model.ts:23`
- **Why weird:** Type is just `{key, value}` — i.e. a plain tag. `CustomPolicyTag` is a triple-loaded name: "custom" (versus what? a built-in tag?), "policy" (which policy? the only one in scope), "tag" (the actual semantic noun). Two of the three words are redundant in context. Also colliding with the same `CustomPolicyTag` exported from `budgetpolicy/src/v1/model.ts:53`.
- **Category:** 7 (overly verbose), 8 (redundant prefix `CustomPolicy*` already implied by location), 12 (duplicate concept across siblings with identical name).
- **Suggested name:** `Tag` (in this package it's unambiguous) or `PolicyTag`.
- **Rationale:** `customTags: CustomPolicyTag[]` reads as type-suffix tautology + redundant `Custom`. The doc on `CustomPolicyTag.key` even calls them "custom tags".

### 10. `CustomPolicyTag` reserved-key documentation refers to `budget-policy-*` keys — `src/v1/model.ts:27-29`
- **Why weird:** Doc says key cannot be `"budget-policy-name"`, `"budget-policy-id"` or `"budget-policy-resolution-result"`. These reserved keys are the wire-form spelling **from the budget-policy domain** — copy-pasted verbatim from the `budgetpolicy` package without renaming to the usage-policy equivalents (one would expect `usage-policy-name` etc.). Either (a) the wire really *does* use the `budget-policy-*` prefix (which is a Databricks API design issue worth surfacing), or (b) the JSDoc was lazily duplicated and the actual reserved keys are different.
- **Category:** 6 (misleading: cross-domain magic strings that callers must memorise), 12 (duplicate across siblings — but here it's a *bug*, because the reserved keys are not surfaced as constants and may differ from `budgetpolicy`), 18 (long magic string sentinels).
- **Suggested name:** Either expose a `RESERVED_TAG_KEYS` constant per package, or validate the wire payload and throw a typed error. If the wire truly shares the budget-policy reserved keys, the JSDoc should say "(shared with budget-policy)" to remove the ambiguity.
- **Rationale:** Documentation-only constraints are easy to violate and produce server-side 400s. Either way the verbatim duplication smells.

### 11. `Filter.creatorUserId: number` representation — `src/v1/model.ts:57`
- **Why weird:** User IDs are typed as `number`. Databricks user IDs are 64-bit integers. JS `number` only has 53-bit safe integer precision, so user IDs `>2^53` will silently lose precision.
- **Category:** 16 (field type contradicts domain — int64 in a 53-bit number type), 19 (underspecified ID — no encoding documented).
- **Suggested name:** `creatorUserId: bigint` or `string` (matches Databricks REST API serialisation of large IDs).
- **Rationale:** Same as finding #7 but for the filter field. Generator-wide concern; same problem on `bindingWorkspaceIds: number[]`.

### 12. `Filter.creatorUserId` + `Filter.creatorUserName` — two ways to filter on the same creator — `src/v1/model.ts:57,62`
- **Why weird:** Same conceptual entity (the creator) exposed twice as two filter fields, with no doc clarification on whether they are AND or OR. `creatorUserId` is `number`, `creatorUserName` is `string`.
- **Category:** 12 (duplicate concept), 19 (underspecified id), 6 (misleading — caller wonders which one to use).
- **Suggested name:** Collapse to `creator?: {id?: number; name?: string}`, or split into named composite types.
- **Rationale:** Two parallel "filter by creator" fields beg the question of how they combine, and the per-field doc ("If unspecified, all policies will be returned") fails to define the AND/OR rule between them.

### 13. `SortSpec` type — `src/v1/model.ts:103`
- **Why weird:** `SortSpec` (specification) and `Field` together build the "what to sort by" structure. `Spec` is generic — every type is a spec of something. The wrapping type holds two fields (`field` + `descending`); a one-or-two-field pair could be inlined into the request.
- **Category:** 1 (vague suffix `Spec`), 11 (trivial wrapper holding two fields).
- **Suggested name:** `SortOptions`, or inline as `sortField?: SortField; sortDescending?: boolean` on the request.
- **Rationale:** `Spec` adds no information. `sortBy: SortField` plus a boolean is more direct. Mirrors `budgetpolicy` finding #17.

### 14. `SortSpec.field` JSDoc typo "The filed to sort by" — `src/v1/model.ts:104`
- **Why weird:** `filed` typo for `field`. Generated comment text is permanent unless the API spec is fixed.
- **Category:** Observation (typo).
- **Suggested name:** Fix spelling.
- **Rationale:** Surfaces in IntelliSense. Same typo as `budgetpolicy/src/v1/model.ts:150` — the two packages even share generator typos.

### 15. `ListUsagePoliciesResponse.policies` field name — `src/v1/model.ts:96`
- **Why weird:** Field `policies` of type `UsagePolicy[]`. Within the `usagepolicy` package, `policies` is fine — but within a multi-package consumer with `budgetpolicy.policies` and other policy-emitting packages, the bare name is ambiguous when copy-pasted.
- **Category:** 1 (vague when out of context), 9 (singular/plural — paired with `policy:` field on the create/update requests), 12 (duplicate field name across siblings).
- **Suggested name:** `usagePolicies: UsagePolicy[]`.
- **Rationale:** Tied to type rename considerations. If the entity-type were renamed (per finding #1), `policies` could stay; otherwise `usagePolicies` makes the field self-documenting at any depth.

### 16. `ListUsagePoliciesResponse.previousPageToken` — `src/v1/model.ts:100`
- **Why weird:** Response supports both forward (`nextPageToken`) and backward (`previousPageToken`) pagination — but the iterator helper only walks forward. The bidirectional surface area exists but is unused by the iterator helper.
- **Category:** Observation / 12 (duplicate-but-asymmetric concept).
- **Suggested name:** Keep name; consider documenting that the iterator does not honor `previousPageToken`.
- **Rationale:** Field name is fine on its own; flagging because it hints at unsupported reverse pagination. Mirrors `budgetpolicy` finding #20.

### 17. `UsagePolicy.customTags` plural field paired with singular `CustomPolicyTag` type — `src/v1/model.ts:127`
- **Why weird:** Plural field `customTags: CustomPolicyTag[]` plus the singular type with `Tag` suffix produces `customTags: CustomPolicyTag[]` — same word twice (`Tags`/`Tag`).
- **Category:** 8 (redundant prefix `custom`), 20 (`customTags: CustomPolicyTag[]` is type-suffix tautology).
- **Suggested name:** `tags: Tag[]` (with type rename per #9). Wire form stays `custom_tags`.
- **Rationale:** Linked to the type-rename above; if `CustomPolicyTag` becomes `Tag`, field naturally becomes `tags`.

### 18. `CreateUsagePolicyRequest.policy` field with wire-name leak in JSDoc — `src/v1/model.ts:19-20`
- **Why weird:** Doc: "The policy to create. `policy_id` needs to be empty as it will be generated" — wire-name leak (`policy_id`) in the docs of a TS field. Also: the doc is *shorter* than the sibling `budgetpolicy.CreateBudgetPolicyRequest.policy` doc (which adds: "`policy_name` must be provided, custom_tags may need to be provided depending on the cloud provider. All other fields are optional."). So the usage-policy version silently drops the "policyName must be provided" and the cloud-provider-conditional tag note.
- **Category:** 14 (wire-style identifiers in TS docs), 17 (inconsistent docs across sibling packages for the same conceptual request).
- **Suggested name:** Fix the doc to reference TS field names; align with sibling-package doc content.
- **Rationale:** Editing UX: hovers should show TS, not proto. The sibling-divergence also matters: a developer reading both packages should see consistent requirements unless they actually differ.

### 19. `UpdateUsagePolicyRequest.policy` doc mentions `creator_user_id` — `src/v1/model.ts:112`
- **Why weird:** Doc: "`creator_user_id` cannot be specified in the request" — but `UsagePolicy` (the type of `policy` here) doesn't have a `creatorUserId` field! It has `policyId`, `policyName`, `customTags`, `bindingWorkspaceIds`. The doc refers to a field that doesn't exist on the model. Exact same bug as `budgetpolicy.UpdateBudgetPolicyRequest.policy` JSDoc.
- **Category:** 6 (misleading documentation — refers to non-existent field), 17 (inconsistency: doc says creator is part of `UsagePolicy`, model says otherwise), 14 (Go-SDK paste from a richer struct).
- **Suggested name:** Fix doc; remove the spurious reference or add the missing field to the model.
- **Rationale:** Real bug, twice (once here, once in `budgetpolicy`).

### 20. `UpdateUsagePolicyRequest` has **no** `updateMask` field — `src/v1/model.ts:111-118`
- **Why weird:** `budgetpolicy.UpdateBudgetPolicyRequest` (`packages/budgetpolicy/src/v1/model.ts:165`) carries an `updateMask?: FieldMask<BudgetPolicy>` plus a `budgetPolicyFieldMask(...paths)` builder. `usagepolicy.UpdateUsagePolicyRequest` does not. Either (a) the usage-policy API genuinely uses replace-on-PATCH semantics (no partial updates) — in which case the JSDoc should say so — or (b) the SDK is missing field-mask support that the API offers. Without inspection of the OpenAPI source, either is plausible, and the absence of a doc note is itself a finding.
- **Category:** 17 (inconsistency across near-clone sibling packages), Observation (potential missing surface).
- **Suggested name:** If full-replace: document on `UpdateUsagePolicyRequest`. If partial-update: add `updateMask?: FieldMask<UsagePolicy>` and a `usagePolicyFieldMask(...paths)` helper to match the sibling.
- **Rationale:** A user toggling between the two clones will expect parity. The divergence is silent and unjustified by either docstring.

## Low severity

### 21. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handle different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at call sites in `client.ts`.
- **Category:** 1 (vague), 17 (names differ only by `Http` infix).
- **Suggested name:** `runWithCallOptions` / `sendHttpRequest`.
- **Rationale:** Same pair flagged in `abacpolicies` and `budgetpolicy` audits. Generator-wide.

### 22. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** `Options` is reused across the SDK for many unrelated concepts (`ClientOptions`, `CallOptions`, and the imported `Options` type from `@databricks/sdk-core/api` on line 3). Within `utils.ts` alone, two `Options`-named types collide cognitively.
- **Category:** 1 (vague suffix), 17 (collides with the imported `Options`).
- **Suggested name:** `HttpCallContext` (it's not user-facing options; it's an internal bag of arguments).
- **Rationale:** Generator-wide; same as `budgetpolicy` finding #29.

### 23. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Generic name; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` or `readStreamToEnd`.
- **Rationale:** Internal helper. Generator-wide.

### 24. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Used by `client.ts:158,165,217` for nested query-param flattening; OK in this package but exported per package which makes it a duplicated utility across every generated package (12+ identical copies in this monorepo).
- **Category:** Observation / 12 (duplicate utility across packages).
- **Suggested name:** Keep name; consider hoisting to `@databricks/sdk-core`.
- **Rationale:** Naming is fine; flagging duplication.

### 25. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic name losing meaning).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Same as `budgetpolicy` finding #33; generator-wide.

### 26. `Client` class plain name — `src/v1/client.ts:46`
- **Why weird:** Top-level export `Client`. When a consumer imports `Client` from `@databricks/sdk-usagepolicy/v1`, they will almost certainly alias it (`import {Client as UsagePolicyClient}`) to avoid collision with `Client` from every other package — including the byte-identical class from `@databricks/sdk-budgetpolicy/v1`.
- **Category:** 1 (vague — `Client` is the most generic name in the SDK ecosystem), 12 (duplicate across all packages, *especially* this one and `budgetpolicy`).
- **Suggested name:** `UsagePolicyClient`.
- **Rationale:** Each generated package emits a `Client`. With `usagepolicy`/`budgetpolicy` being near-clones, the importer who needs both will be forced into double-aliasing.

### 27. `req` parameter name on client methods — `src/v1/client.ts:77,103,122,147,194,212`
- **Why weird:** Abbreviation `req` instead of `request`. Six occurrences in `client.ts`.
- **Category:** 5 (cryptic abbreviation when the long form fits comfortably).
- **Suggested name:** `request`.
- **Rationale:** Style. Comments on `client.ts` already use the full word. Same convention should apply to params for hovers. Same as `budgetpolicy` finding #35.

### 28. JSDoc on `getUsagePolicy` reads "Retrieves a usage policy by it's ID." — `src/v1/client.ts:120`
- **Why weird:** "it's" should be "its" (possessive). Same grammatical mistake appears in `budgetpolicy/src/v1/client.ts:120` ("Retrieves a policy by it's ID.") — copy-pasted across the clones.
- **Category:** Observation (grammar).
- **Suggested name:** Fix to "its".
- **Rationale:** Surfaces in editor hovers; small but persistent.

### 29. `SortSpec_Field` proto-style underscore-nested enum name — `src/v1/model.ts:6`
- **Why weird:** Underscored identifier `SortSpec_Field` mirrors protobuf's "ParentMessage_NestedEnum" wire convention and is unidiomatic in TypeScript. The file even carries `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.` on line 5, confirming the proto-architectural leak. Re-exported from `index.ts:5` so the leak reaches consumers verbatim.
- **Category:** Proto-architectural leak — proto-nested-type naming convention surfaced into the TS public API.
- **Suggested name:** `SortField` (or namespace it under `SortSpec` as `SortSpec.Field` if the nesting relationship matters).
- **Rationale:** TS has no `Parent_Nested` convention; the underscore is a direct proto leak. Mirrors the same finding in `budgetpolicy` (`SortSpec_Field` at `budgetpolicy/src/v1/model.ts:8`).

### 30. `buildHttpRequest` — `Http` mid-position infix — `src/v1/utils.ts:96`
- **Why weird:** `Http` appears as a mid-position infix between the verb `build` and the noun `Request`. The function's role is "construct an `HttpRequest` value", but the `Http` infix in the function name redundantly leaks the transport layer into the verb. Same pattern in the imported `HttpRequest` type is fine (end suffix), but on the function it duplicates information already in the return type.
- **Category:** Proto-architectural leak — transport-layer noun appearing mid-name.
- **Suggested name:** `buildRequest` (return type `HttpRequest` already conveys the transport).
- **Rationale:** Standard naming guidance: don't repeat the return-type noun's qualifier in the verb. Mirrors the same pattern in `budgetpolicy/src/v1/utils.ts:96`.

## Observations

### 31. URL-path version split (`/api/2.1` vs `/api/2.0`) is the only meaningful API surface difference
The only on-the-wire distinction between this package and `budgetpolicy` is the URL: `/api/2.1/accounts/{accountId}/usage-policies` (`client.ts:80,106,125,150,215`) vs `/api/2.0/accounts/{accountId}/budget-policies`. Same HTTP verbs, same query parameter names (`page_size`, `page_token`, `filter_by`, `sort_spec`, `limit_config`), same request and response shapes. If the two endpoints are intended to converge under the `2.1` URL, `budgetpolicy` is likely v1 of the same surface and this package supersedes it. If they are intended to coexist, the type names should not collide.
- **Category:** 12 (duplicate concept), 1 (vague package boundary).

### 32. No `FieldMask` import in `usagepolicy/src/v1/model.ts`
Unlike `budgetpolicy/src/v1/model.ts:3-4` which imports `FieldMask` from `@databricks/sdk-core/wkt` and emits a `budgetPolicyFieldMask(...paths)` helper (lines 271-282), `usagepolicy` has no `FieldMask` machinery at all. This is linked to finding #20 (no `updateMask` on the update request). Either the API genuinely doesn't support field masks (the SDK is correct), or it does and the SDK is missing the support.
- **Category:** Observation / 17 (cross-package inconsistency).

### 33. Action-verb conventions in `Client`
The client consistently uses `create`/`delete`/`get`/`list`/`update` verbs. No mixed `fetch`/`retrieve`/`read`.
- **Category:** 17 (observation of consistency, per rule that we flag inconsistencies — this is the inverse).

### 34. Acronym casing `Id` consistently used as `Id`, not `ID`
`policyId`, `accountId`, `creatorUserId`, `bindingWorkspaceIds`, `requestId`, `pageSize`/`pageToken`. Internal consistency holds. Inconsistent only with external `URLSearchParams` (Web API; out of our control).
- **Category:** 3 (observation — internal acronym style is consistent).

### 35. Wire-form vs kebab-case vs TS casings (`usage_policies` / `usage-policies` / `usagePolicies`)
The same identifier appears in three forms in the same client file:
- `usage_policies` — wire form (in the Zod schemas via snake_case keys).
- `usage-policies` — URL path segment (`client.ts:80,106,125,150,215`).
- `usagePolicies` — TS type/method names.

Readers must mentally translate. Worth flagging because the kebab-case form does not appear in the audit findings unless one inspects the URL building code.
- **Category:** 3 (acronym/casing inconsistency — three forms of the same identifier).

## Domain glossary
- `usage policy` — A named policy that attaches custom tags to billing usage and optionally restricts which workspaces apply it. Same structure as `budgetpolicy.BudgetPolicy` per the JSDoc on `UsagePolicy` (line 120). Despite "usage" in the name, no usage-data concept (rows/metrics/period) lives on the model — only tags and workspace bindings.
- `binding workspace` — A workspace that the policy is exclusively applied to (subset of account workspaces). Implementation: `UsagePolicy.bindingWorkspaceIds: number[]`.
- `custom tag` — A `{key, value}` pair attached to billing usage. Reserved keys per JSDoc: `budget-policy-name`, `budget-policy-id`, `budget-policy-resolution-result` (note: keys retain the `budget-policy-` prefix even though this is the *usage* policy package — see finding #10).
- `account id` — The Databricks account-level identifier (path segment in URL: `/api/2.1/accounts/{accountId}/usage-policies`).
- `policy id` — Generated server-side; globally unique. Used as the resource id in get/update/delete paths.

## File coverage
- `src/v1/model.ts` (230 lines): read fully.
- `src/v1/client.ts` (252 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully. Byte-identical to `budgetpolicy/src/v1/utils.ts` (same 4012-byte file size).
- `src/v1/index.ts` (20 lines): read fully.
- Cross-referenced: `packages/budgetpolicy/src/v1/model.ts`, `packages/budgetpolicy/src/v1/client.ts`, `packages/budgetpolicy/src/v1/index.ts` (the near-clone sibling), and previously-audited `.agent/naming-audit/budgetpolicy.md` for consistency.
