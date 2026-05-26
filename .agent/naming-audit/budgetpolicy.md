# Naming Audit: budgetpolicy

**Path:** `packages/budgetpolicy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level "Budget Policy" management — create/get/list/update/delete cost-control policies that attach custom tags to billing usage and can be bound to specific workspaces. Distinct from the sibling `budgets` package, which manages spend-alert configurations.
**Total weird names flagged:** 28

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 10 |
| Low | 7 |
| Observation | 5 |

## High severity

### 1. `Filter` (bare top-level type) — `src/v1/model.ts:75`
- **Why weird:** Re-exported from `index.ts` as a bare top-level type. `Filter` is one of the most overloaded words in JS/TS (Array#filter, RxJS filter, content filters, etc.) and the type is package-scoped — but the re-export under this name collides with the same bare `Filter` in `packages/usagepolicy/src/v1/model.ts:81` and any user who imports both with `Filter` will hit a name clash.
- **Category:** 1 (vague/generic), 12 (duplicate concept across two sibling packages with the same name).
- **Suggested name:** `BudgetPolicyFilter` (mirror `BudgetConfigurationFilter` in the `budgets` package).
- **Rationale:** A bare `Filter` provides zero discoverability and the package directly forces a collision with `usagepolicy.Filter`. Both packages target the same account-level surface and a consumer will frequently import both.

### 2. `CreateBudgetPolicyRequest.requestId` documented as idempotency key — `src/v1/model.ts:40`
- **Why weird:** JSDoc: "This request is only idempotent if a `request_id` is provided." — wire-name leak (`request_id`) in the docs of the TS field `requestId`. Also, `requestId` is a generic field name that does not signal "idempotency key" to callers; the JSDoc is the only place that mentions idempotency.
- **Category:** 1 (vague — `requestId` could mean anything: trace id, correlation id, idempotency key), 15 (generic field name losing meaning).
- **Suggested name:** `idempotencyKey` (matches the conventional name used by Stripe, Square, and most REST APIs), and fix the JSDoc to use TS field name `requestId` rather than wire name `request_id`.
- **Rationale:** A user reading the field name should know it controls idempotency. The current name + docstring split forces a doc-read for every caller.

### 3. `ListBudgetPoliciesRequest.pageToken` JSDoc references `ListServerlessPolicies` — `src/v1/model.ts:116-121`
- **Why weird:** Docstring says: "A page token, received from a previous `ListServerlessPolicies` call ... When paginating, all other parameters provided to `ListServerlessPoliciesRequest` must match the call that provided the page token." — refers to an entirely different RPC name (`ListServerlessPolicies`) that does not exist in this SDK. The actual method is `listBudgetPolicies`.
- **Category:** 6 (misleading — docs describe a different operation), 14 (Go-style internal proto name leaked).
- **Suggested name:** Fix docstring to say `ListBudgetPolicies`/`ListBudgetPoliciesRequest`.
- **Rationale:** Generator bug. Confusing for readers and grep-hostile (searching for `ListBudgetPolicies` won't surface the doc context).

### 4. `BudgetPolicy.policyId` / `BudgetPolicy.policyName` field naming inside `BudgetPolicy` type — `src/v1/model.ts:16,23`
- **Why weird:** Fields on the `BudgetPolicy` type prefix every field with `policy*` (`policyId`, `policyName`). When you already have `policy.policyId` and `policy.policyName`, the `policy` prefix is redundant.
- **Category:** 8 (redundant prefix when context already supplies it), 20 (type-suffix tautology — `policyId` of type `BudgetPolicy.id` is `policyId`).
- **Suggested name:** `id`, `name` (the wire stays `policy_id`/`policy_name`).
- **Rationale:** `budgetPolicy.id` reads better than `budgetPolicy.policyId`. The redundancy is a Go SDK habit where flat structs need the prefix to differentiate; TS doesn't.

### 5. `BudgetPolicy.bindingWorkspaceIds` — `src/v1/model.ts:30`
- **Why weird:** `binding` as a noun-prefix is unusual; reads as "workspace IDs of a binding". JSDoc: "List of workspaces that this budget policy will be exclusively bound to." The natural name is `boundWorkspaceIds` (past participle, indicating the relationship has already been set up).
- **Category:** 1 (vague — `binding` is a generic noun: data binding, key binding, etc.), 6 (misleading word choice — "binding" implies a binding object exists, but the field is just a list of workspace IDs).
- **Suggested name:** `boundWorkspaceIds` or `workspaceIds`.
- **Rationale:** "Bound" is the past participle that matches the doc ("will be exclusively bound to"). `binding` reads as a separate entity.

### 6. Type-name collision with `budgets` package — `src/v1/model.ts:14` vs `packages/budgets/src/v1/model.ts:50`
- **Why weird:** This package's central entity is `BudgetPolicy`; the sibling `budgets` package exports `BudgetConfiguration` (the spend-alert budget object). The two are semantically unrelated — `BudgetPolicy` is a tag-attachment policy that influences cost attribution, and `BudgetConfiguration` is a spend threshold + alert. A user importing both packages sees `BudgetPolicy` and `BudgetConfiguration` side by side and may reasonably wonder if `BudgetPolicy` is the policy *for* a `BudgetConfiguration`. The names do not differentiate clearly.
- **Category:** 12 (duplicate concepts with confusing names), 1 (the `Budget` prefix overloads two unrelated domain ideas).
- **Suggested name:** Consider `CostAttributionPolicy` or `UsageTaggingPolicy` for what `budgetpolicy` actually models (per the JSDoc on `BudgetPolicy`: "Contains the BudgetPolicy details" — tags + workspace bindings, no spend or threshold concept anywhere).
- **Rationale:** The package name is misleading: there is no "budget" (numeric monetary threshold) anywhere in the `budgetpolicy` model. The closest concept is `customTags`. Naming convergence with `budgets` (real spend budgets) drives the confusion. Worth raising with API designers, since the SDK name follows the API name.

## Medium severity

### 7. `CustomPolicyTag` reserved-key documentation — `src/v1/model.ts:55-56`
- **Why weird:** Doc says key cannot be `"budget-policy-name"`, `"budget-policy-id"` or `"budget-policy-resolution-result"`. These reserved keys are the wire-form spelling. They aren't surfaced as constants or an enum.
- **Category:** 6 (misleading: hard-coded magic strings that callers must memorise), 18 (long magic string sentinels).
- **Suggested name:** Either expose a `RESERVED_TAG_KEYS` constant, or validate in marshal step and throw a typed error.
- **Rationale:** Documentation-only constraints are easy to violate and produce server-side 400s. Worth flagging because the names are stable wire-level identifiers.

### 8. `Filter.policyName` / `Filter.creatorUserId` / `Filter.creatorUserName` — `src/v1/model.ts:80,85,90`
- **Why weird:** `Filter` has three optional fields whose names imply they specify *one* policy, but the JSDoc says they apply as substring/equality filters across the list. Names like `policyName: 'foo'` read as "the policy named foo"; what it actually means is "policies whose name contains 'foo'". The JSDoc clarifies but the name misleads.
- **Category:** 6 (misleading — singular noun for a substring/multi-match filter).
- **Suggested name:** `policyNameContains`, `creatorUserIdEquals`, `creatorUserNameContains` (or pluralise to `creatorUserNames: string[]`).
- **Rationale:** Filter DSLs benefit from explicit operators. Bare names suggest exact match.

### 9. `Filter.creatorUserId: number` vs `Filter.creatorUserName: string` — `src/v1/model.ts:85,90`
- **Why weird:** Same conceptual entity (the creator) exposed twice as two filter fields, with no doc clarification on whether they are AND or OR. `creatorUserId` is `number` (a JS-unsafe representation for 64-bit IDs — but at least the Go SDK numeric type is `int64` here), while `creatorUserName` is `string`.
- **Category:** 12 (duplicate concept — two ways to filter on the same domain object), 19 (underspecified ID — `creatorUserId` is a numeric id from an unknown id space).
- **Suggested name:** Collapse to `creator?: Creator` with `{id?: number; name?: string}`, or document AND/OR.
- **Rationale:** Two parallel "filter by creator" fields beg the question of how they combine. Even the JSDoc says "If unspecified, all policies will be returned" on each one — but doesn't say what happens if both are set.

### 10. `Filter.creatorUserId: number` representation — `src/v1/model.ts:85`
- **Why weird:** User IDs are typed as `number`. Databricks user IDs are 64-bit integers (this SDK uses `number` for `bindingWorkspaceIds` too — line 30). JS `number` only has 53-bit safe integer precision, so user IDs `>2^53` will silently lose precision.
- **Category:** 16 (field type contradicts domain — int64 in a 53-bit number type), 19 (underspecified id).
- **Suggested name:** `creatorUserId: bigint` or `string` (matches Databricks REST API serialisation of large IDs).
- **Rationale:** Worth flagging as a generator/policy issue. Same problem for `BudgetPolicy.bindingWorkspaceIds: number[]` on line 30 and `Filter.creatorUserId` here.

### 11. `SortSpec` type — `src/v1/model.ts:147`
- **Why weird:** `Spec` is a generic suffix — every type is a spec of something. The suffix communicates nothing about what kind of specification this is or how it differs from a plain options bag.
- **Category:** 1 (vague suffix `Spec`).
- **Suggested name:** `SortOptions` or `SortOrder`.
- **Rationale:** `Spec` adds no information. A name that says what the type *describes* (sort options / sort order) is more direct.

### 12. `SortSpec.field` JSDoc typo "The filed to sort by" — `src/v1/model.ts:148`
- **Why weird:** `filed` typo for `field`. Generated comment text is permanent unless the API spec is fixed.
- **Category:** Observation (typo).
- **Suggested name:** Fix spelling.
- **Rationale:** Minor; flagging because it surfaces in IntelliSense.

### 13. `ListBudgetPoliciesResponse.policies` field name — `src/v1/model.ts:134`
- **Why weird:** Field `policies` of type `BudgetPolicy[]`. Within the `budgetpolicy` package, `policies` is fine — but within a multi-package consumer with `BudgetConfigurations.budgets` (line 170 of budgets) and `usagepolicy.policies`, the field `policies` becomes ambiguous when copy-pasted.
- **Category:** 1 (vague when out of context), 9 (singular/plural — paired with `policy:` field on request).
- **Suggested name:** `budgetPolicies: BudgetPolicy[]`.
- **Rationale:** Tied to type rename suggestion #4. If `BudgetPolicy` becomes `Policy` (in-package), `policies` is fine; otherwise `budgetPolicies` matches.

### 14. `ListBudgetPoliciesResponse.previousPageToken` — `src/v1/model.ts:144`
- **Why weird:** Response supports both forward (`nextPageToken`) and backward (`previousPageToken`) pagination — but `listBudgetPoliciesIter` (client.ts:193) only walks forward. The bidirectional surface area exists but is unused by the iterator helper.
- **Category:** Observation / 12 (duplicate-but-asymmetric concept).
- **Suggested name:** Keep name; consider documenting that the iterator does not honor `previousPageToken`.
- **Rationale:** Field name is fine on its own; flagging because it hints at unsupported reverse pagination.

### 15. `ListBudgetPoliciesResponse.previousPageToken` doc typo — `src/v1/model.ts:142`
- **Why weird:** Doc reads "In this field is omitted, there are no previous pages." — "In" should be "If".
- **Category:** Observation (typo).
- **Suggested name:** Fix doc.
- **Rationale:** Generated; surfaces in IntelliSense.

### 16. `SortSpec_Field` enum name — `src/v1/model.ts:6`
- **Why weird:** Proto-architectural-leak: the underscore-joined `ParentType_NestedType` form is the protobuf/Go-SDK convention for emitting nested enum types into a flat namespace. TS already supports namespaces and modules natively, so the underscore is a wire-protocol artifact bleeding into the public TS API. The eslint-disable comment on the prior line even labels it "Proto-style nested enum name", confirming the generator knows it is non-idiomatic.
- **Category:** Proto-architectural leak (proto-style nested-type encoding leaking into TS identifiers).
- **Suggested name:** `SortField` (drop the `Spec_` prefix entirely; the enum stands on its own as the set of sortable fields) or `SortSpecField` (camel-join, no underscore).
- **Rationale:** TS consumers should not need to learn that `SortSpec.field`'s enum lives under a underscored sibling type. The proto nesting is invisible at the wire level — only the generator emits the `_`.

## Low severity

### 17. `CreateBudgetPolicyRequest.policy` field with confusing JSDoc — `src/v1/model.ts:44-46`
- **Why weird:** Doc: "The policy to create. `policy_id` needs to be empty as it will be generated. `policy_name` must be provided, custom_tags may need to be provided depending on the cloud provider. All other fields are optional." — wire-name leak again (`policy_id`, `policy_name`, `custom_tags`) in TS docs.
- **Category:** Observation, 14 (wire-style identifiers in TS docs).
- **Suggested name:** Fix the doc to reference TS field names.
- **Rationale:** Editing UX: hovers should show TS, not proto.

### 18. `UpdateBudgetPolicyRequest.policy` doc mentions `creator_user_id` — `src/v1/model.ts:157`
- **Why weird:** Doc: "`creator_user_id` cannot be specified in the request" — but `BudgetPolicy` (the type of `policy` here) doesn't have a `creatorUserId` field! It has `policyId`, `policyName`, `customTags`, `bindingWorkspaceIds`. The doc refers to a field that doesn't exist on the model.
- **Category:** 6 (misleading documentation — refers to non-existent field), 17 (inconsistency: doc says creator is part of `BudgetPolicy`, model says otherwise).
- **Suggested name:** Fix doc; likely a Go-SDK paste from a richer struct.
- **Rationale:** Real bug.

### 19. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at call sites in `client.ts`.
- **Category:** 1 (vague), 17 (inconsistent — names differ only by `Http` infix).
- **Suggested name:** `runWithCallOptions` / `sendHttpRequest`.
- **Rationale:** Same pair flagged in the `abacpolicies` audit. Generator-wide.

### 20. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** `Options` is reused across the SDK for many unrelated concepts (`ClientOptions`, `CallOptions`, and the imported `Options` type from `@databricks/sdk-core/api` on line 3). Within `utils.ts` alone, two `Options`-named types collide cognitively.
- **Category:** 1 (vague suffix), 17 (collides with the imported `Options`).
- **Suggested name:** `HttpCallContext` (it's not user-facing options; it's an internal bag of arguments).
- **Rationale:** Generator-wide concern; same as `abacpolicies` finding #37.

### 21. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Generic name; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` or `readStreamToEnd`.
- **Rationale:** Internal helper. Generator-wide.

### 22. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Used by `client.ts:158,165,221` for nested query-param flattening; OK in this package but exported per package which makes it a duplicated utility across every generated package.
- **Category:** Observation / 12 (duplicate utility across packages).
- **Suggested name:** Keep name; consider hoisting to `@databricks/sdk-core`.
- **Rationale:** Naming is fine; flagging duplication.

### 23. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic name losing meaning).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Same as `abacpolicies` finding #32; generator-wide.

## Observations

### 24. `Client` class plain name — `src/v1/client.ts:46`
Top-level export `Client`. When a consumer imports `Client` from `@databricks/sdk-budgetpolicy/v1`, they will likely alias it (`import {Client as BudgetPolicyClient}`) to avoid collision with `Client` from every other package.
- **Category:** 1 (vague — `Client` is the most generic name in the SDK ecosystem), 12 (duplicate across all packages).
- **Suggested name:** `BudgetPolicyClient`.
- **Rationale:** Each generated package emits a `Client`. Forcing aliasing on every import is a usability cost. Generator-wide; not specific to this package.

### 25. `req` parameter name on client methods — `src/v1/client.ts:77,103,122,147,194,212`
Abbreviation `req` instead of `request`. Six occurrences in `client.ts`.
- **Category:** 5 (cryptic abbreviation when the long form fits comfortably).
- **Suggested name:** `request`.
- **Rationale:** Style. Comments on `client.ts` already use the full word. Same convention should apply to params for hovers.

### 26. Action-verb conventions in `Client`
The client consistently uses `create`/`delete`/`get`/`list`/`update` verbs (matching the JSDoc method documentation). No mixed `fetch`/`retrieve`/`read`. (`abacpolicies` audit noted the same.)
- **Category:** 17 (observation of consistency, per rule that we flag inconsistencies — this is the inverse).

### 27. Wire-form vs TS-form casing of `policyId` (path interpolation) — `src/v1/client.ts:80,106,125,150,215`
The URL path uses `accounts/${req.accountId ?? this.accountId ?? ''}/budget-policies` and the policy id is substituted via `req.policyId ?? ''`. The kebab-case URL segment `budget-policies` is fine; flagging that the SDK uses three different casings (`budget_policies` wire-form for query params, `budget-policies` for the URL, `budgetPolicies` for TS) — readers must mentally translate.
- **Category:** 3 (acronym/casing inconsistency — three forms of the same identifier).

### 28. Package name `budgetpolicy` overlaps with `budgets` and `usagepolicy`
Three sibling packages exist with related-sounding names:
- `budgetpolicy` — tag attribution policy (this package).
- `budgets` — spend-alert budget configurations.
- `usagepolicy` — has the identical model shape (`UsagePolicy`, `CustomPolicyTag`, `Filter`, `LimitConfig`, `SortSpec`) — i.e. it's a duplicate API surface with a different entity name.

The three together blur the boundary between "policy that classifies usage" (budgetpolicy/usagepolicy) and "budget with alert thresholds" (budgets). The names themselves do not disambiguate which is which.
- **Category:** 12 (duplicate concept), 1 (vague package names).
- **Rationale:** Worth raising at the SDK / API design level. From the TS-user perspective, three near-clones makes the import surface confusing.

## Domain glossary
- `budget policy` — A named policy that attaches custom tags to billing usage and optionally restricts which workspaces apply it. **Despite the name, it has no monetary "budget" semantics.** Compare with `budgets` package (real spend alerts).
- `binding workspace` — A workspace that the policy is exclusively applied to (subset of account workspaces). Implementation: `BudgetPolicy.bindingWorkspaceIds: number[]`.
- `custom tag` — A `{key, value}` pair attached to billing usage. Reserved keys: `budget-policy-name`, `budget-policy-id`, `budget-policy-resolution-result`.
- `account id` — The Databricks account-level identifier (path segment in URL: `/api/2.0/accounts/{accountId}/budget-policies`).
- `policy id` — Generated server-side; globally unique. Used as the resource id in get/update/delete paths.
- `wkt` — Well-Known Types (import `@databricks/sdk-core/wkt`); only used for `FieldMask` here.
- `ListServerlessPolicies` — Phantom name appearing only in `ListBudgetPoliciesRequest.pageToken` JSDoc; no such RPC exists. Likely a Go-SDK copy/paste.

## File coverage
- `src/v1/model.ts` (266 lines): read fully.
- `src/v1/client.ts` (252 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (20 lines): read fully.
- Cross-referenced: `packages/budgets/src/v1/model.ts`, `packages/budgets/src/v1/index.ts`, `packages/usagepolicy/src/v1/index.ts` for sibling-package overlap.

## Fixed
- #20 `budgetPolicyFieldMask` function (originally cited at `src/v1/model.ts:278`): Fixed in regeneration on 2026-05-20 — the `budgetPolicyFieldMask` helper and `FieldMask` import are no longer emitted in `model.ts`.
