# Naming Audit: abacpolicies

**Path:** `packages/abacpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Attribute-Based Access Control (ABAC) policies on Unity Catalog securables — create/get/list/update/delete row-filter and column-mask policies.
**Total weird names flagged:** 26

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 12 |
| Low | 5 |
| Observation | 4 |

## High severity

### 1. `PolicyInfo` — `src/v1/model.ts:137`
- **Why weird:** `Info` is a generic suffix that adds nothing — every type is "info about something". This is the central domain entity; it should just be called `Policy`. (See rule 1: `Info` is on the vague-suffix list.)
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix).
- **Suggested name:** `Policy`.
- **Rationale:** `Policy` is the noun the user actually thinks about. The `Info` suffix is a tic carried over from Go SDK naming conventions that does not apply in TS, where the namespace and import path already disambiguate.

### 2. `onSecurableType: string` on `DeletePolicyRequest` / `GetPolicyRequest` / `ListPoliciesRequest` / `UpdatePolicyRequest` — `src/v1/model.ts:64,92,101,232`
- **Why weird:** Typed as `string` everywhere on these request DTOs while the same field on `PolicyInfo` (`model.ts:145`) is typed as `SecurableType` enum. The values are the same domain (`CATALOG`, `SCHEMA`, ...) — the inconsistency is a bug.
- **Category:** 6 (misleading — name implies enum, actual type is `string`), 16 (field type contradicts domain).
- **Suggested name:** Keep the name but type it `SecurableType`.
- **Rationale:** Same field name with two different types across four request DTOs forces callers to remember which one is loose. This is almost certainly a generator bug worth flagging upstream.

### 3. `onSecurableFullname` — `src/v1/model.ts:66,94,103,150,234`
- **Why weird:** `fullname` is one un-camelCased word. Should be `fullName` to match field-naming conventions used everywhere else in the same model (`functionName`, `pageToken`, etc.).
- **Category:** 3 (acronym/casing inconsistency — `name` is one word and should follow camelCase, so `Fullname` is wrong).
- **Suggested name:** `onSecurableFullName` (wire stays `on_securable_fullname`).
- **Rationale:** Internal consistency. JS/TS convention treats `fullName` as two words; the Go SDK collapses `Fullname` but TS shouldn't blindly inherit that.

### 4. `MatchColumn` — `src/v1/model.ts:130`
- **Why weird:** Reads as a verb (`MatchColumn`) — could be a method or a type. The field that uses it is plural (`matchColumns: MatchColumn[]`), which then reads as "match columns are an array of `MatchColumn`", and a `MatchColumn` is actually a "column matcher / condition + alias pair".
- **Category:** 6 (misleading verb-as-noun), 9 (singular noun whose meaning is unclear).
- **Suggested name:** `ColumnMatcher` or `ColumnMatchCondition`.
- **Rationale:** Type names should be nouns; the verb form misleads. `ColumnMatcher` makes `matchColumns: ColumnMatcher[]` clearly read as "the matchers".

### 5. `forSecurableType` / `onSecurableType` field prefixes — `src/v1/model.ts:145,170`
- **Why weird:** Two different prefixes for related concepts on the same struct: `on_securable_type` and `for_securable_type`. The `on`/`for` split (carrier vs. target securable) is subtle and easily confused. Field names alone do not communicate which is which.
- **Category:** 1 (vague — the preposition does the disambiguation), 6 (misleading without docs).
- **Suggested name:** Rename `forSecurableType` to `appliesToSecurableType` (or similar) and `onSecurableType` to `definedOnSecurableType` to make the distinction explicit.
- **Rationale:** A user reading the type should not have to consult the JSDoc to tell `for` from `on`. These names sit beside each other and look interchangeable.

## Medium severity

### 6. `SecurableType.STAGING_TABLE` — `src/v1/model.ts:33`
- **Why weird:** Enum value pinned by a comment that says it isn't a real securable yet: "TODO: [UC-2980] Staging tables aren't full-fleged securables yet." Internal TODOs in generated SDK enums leak abstraction.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Remove until it actually is a securable, or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't contain TODO-tagged speculative values.

### 7. `ColumnMaskOptions.using: FunctionArgument[]` — `src/v1/model.ts:54`
- **Why weird:** Field named `using` — a SQL reserved word and a generic preposition. Doesn't say what is being used.
- **Category:** 1 (vague), 10 (reserved-word-adjacent — `using` is a reserved-context keyword in JS dynamic import / TS).
- **Suggested name:** `extraArguments` / `additionalArguments` / `argumentList`.
- **Rationale:** `using` on its own carries no semantic load; readers must consult the doc to find out it's "additional positional args". Also appears on `RowFilterOptions` (model.ts:227) with the same problem.

### 8. `ColumnMaskOptions.onColumn` — `src/v1/model.ts:49`
- **Why weird:** Preposition-prefixed field name (`onColumn`) that just identifies the masked column. Inconsistent with `functionName` (also on the same type, no preposition).
- **Category:** 1 (vague), 17 (inconsistency).
- **Suggested name:** `maskedColumnAlias` or `targetColumnAlias`.
- **Rationale:** Names should describe what the field *is*, not its prepositional relationship.

### 9. `FunctionArgument.arg` discriminator field — `src/v1/model.ts:76`
- **Why weird:** `FunctionArgument` has a field `arg` (one of two variants). Type name and field name are near-duplicates; the field name is also an abbreviation of the type.
- **Category:** 5 (cryptic abbreviation), 11 (near-duplicate naming).
- **Suggested name:** Rename the field to `value` or `kind`.
- **Rationale:** `functionArgument.arg.$case === 'alias'` reads weirdly; the field name repeats an abbreviation of the type name.

### 10. `policyInfo` field on `CreatePolicyRequest` / `UpdatePolicyRequest` — `src/v1/model.ts:59,246`
- **Why weird:** Field named after the entity's awkward type (`policyInfo: PolicyInfo`). If `PolicyInfo` is renamed to `Policy`, this becomes `policy: Policy` which is much cleaner.
- **Category:** 20 (type-suffix tautology), 1 (`Info`).
- **Suggested name:** `policy` (paired with type renamed to `Policy`).
- **Rationale:** Tied to the `PolicyInfo` -> `Policy` rename (finding #1).

### 11. `policyType: PolicyType` field on `PolicyInfo` — `src/v1/model.ts:174`
- **Why weird:** Type-suffix tautology (`policyType` field of type `PolicyType`).
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `type: PolicyType` if `PolicyInfo` is renamed to `Policy`; otherwise tolerate.
- **Rationale:** Rule 20 in spec. The wire field is `policy_type` so the marshalled JSON stays unchanged.

### 12. `onSecurableType` / `forSecurableType` type-suffix tautology — `src/v1/model.ts:145,170`
- **Why weird:** Same as above — fields named `onSecurableType` of type `SecurableType` and `forSecurableType` of type `SecurableType`.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** Drop `Type` from the field once renaming (`onSecurable: SecurableType`, `forSecurable: SecurableType`) — though it conflicts with finding #5. Better to combine the two renames (`definedOnSecurable: SecurableType`, `appliesToSecurable: SecurableType`).
- **Rationale:** Reduces tautology and clarifies semantics at once.

### 13. Inconsistent rename style for `*Options` types — `src/v1/model.ts:36,215`
- **Why weird:** `ColumnMaskOptions` and `RowFilterOptions` — two near-identical types describing variants of policy options. Each is a discriminator member; the `Options` suffix is redundant given the discriminator already says "this is the X options".
- **Category:** 8 (redundant suffix), 12 (duplicate concept across similar types).
- **Suggested name:** Either keep current names but acknowledge as boilerplate, or rename to `RowFilter`, `ColumnMask` (the `$case` discriminator already disambiguates).
- **Rationale:** Generator artefact; flagging because near-identical types is the moment to ask whether the API surface should collapse.

### 14. `whenCondition` field — `src/v1/model.ts:172`
- **Why weird:** `when` prefix is a SQL keyword; the field is a free-form condition expression. Just `condition` would suffice given the field already lives on `PolicyInfo`.
- **Category:** 1 (vague prefix), 10 (reserved-word-adjacent).
- **Suggested name:** `condition` or `conditionExpression`.
- **Rationale:** `when_condition` is wire-only; the TS name can drop the redundant `when_`.

### 15. `toPrincipals` / `exceptPrincipals` field names — `src/v1/model.ts:162,164`
- **Why weird:** Preposition-prefixed names mirror SQL `TO`/`EXCEPT` syntax (this is an ABAC-on-UC policy, the API mimics SQL `GRANT ... TO ... EXCEPT ...`). For programmatic SDK consumers, `principals` and `excludedPrincipals` would read more naturally.
- **Category:** 1 (vague), 14 (Go/SQL-style names not idiomatic for TS).
- **Suggested name:** `appliedPrincipals` / `excludedPrincipals` (or `principals` and `excludePrincipals`).
- **Rationale:** Consumers who don't know the SQL syntax will misread `to_principals` as "principal list to apply to" and miss that `except_principals` is the complement.

### 16. `MatchColumn.condition: string` — `src/v1/model.ts:132`
- **Why weird:** A `MatchColumn` has a field called `condition` (matched column condition expression) and an `alias`. The condition could equally well be called `expression`; "condition" implies boolean, but it's actually a column-selector expression evaluated to a column.
- **Category:** 6 (misleading).
- **Suggested name:** `columnExpression` or `selector`.
- **Rationale:** Domain reading: "match columns where condition = X" suggests filtering rows; here it actually selects which columns the policy applies to. Easy to misread.

### 17. `PolicyInfo.id` — `src/v1/model.ts:139`
- **Why weird:** Bare `id` field on `PolicyInfo` alongside `name`, `onSecurableFullname`, etc. — multiple identifier-like fields; bare `id` is underspecified.
- **Category:** 19 (underspecified id when multiple ids exist).
- **Suggested name:** `policyId`.
- **Rationale:** Disambiguates from securable identifiers in the same struct.

## Low severity

### 18. `PolicyInfo.comment` — `src/v1/model.ts:157`
- **Why weird:** Doc says "Optional description of the policy" but the field is named `comment`. SQL stores DDL comments, sure, but a TS-facing field that the JSDoc calls a description should be `description`.
- **Category:** 6 (misleading — doc says description, name says comment).
- **Suggested name:** `description`.
- **Rationale:** Match the doc and avoid the SQL-DDL leak.

### 19. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Minor; only one place in the file but flagged for consistency review across the SDK.

### 20. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Function is exported but not used in this package (no caller in `client.ts`). Dead-looking surface area.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Either remove the export (if it's an unused generator default), or document why it ships per-package.
- **Rationale:** Not a name-quality issue per se, but flagged because each generated package will carry this and grep for unused exports across all packages will turn it up.

### 21. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Name is fine but generic; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` / `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 22. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling very different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp` (or `wrapCall` / `dispatchHttp`).
- **Rationale:** Names should differ in more than the `Http` infix.

## Observations

### 23. Wire/TS divergence is heavy
The model file is ~497 lines for ~9 user-facing types; >half is marshal/unmarshal/FieldMaskSchema scaffolding. Not a naming problem, but the audit surfaces just how much generator boilerplate dominates each package — worth raising at the SDK-design level.

### 24. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`List`/`Update`/`Delete` consistently. No mixed `Fetch`/`Retrieve`/`Read`. This is good. (Listed as observation per rule 17 since the audit asked us to flag inconsistencies; here we explicitly note consistency.)

### 25. Acronym casing for `Http` / `Url` / `Id` in `utils.ts` / `client.ts`
The codebase uses `Http` (`HttpClient`, `HttpRequest`, `executeHttpCall`) and `URLSearchParams` (Web standard) and `url` (lowercase) and `userAgent`. Mixing `Http` (PascalCase capital-then-lower) with the imported `URLSearchParams` (ALLCAPS) is inconsistent — common across JS ecosystem and probably not worth changing, but worth noting.
- **Category:** 3 (acronym casing).

### 26. `abac` abbreviation only appears in package name
The package directory is `abacpolicies` but neither type, field, comment, nor enum mentions `abac`. The package name acts as a domain keyword the SDK is otherwise silent about. May confuse users searching by acronym.
- **Category:** 5 (cryptic abbreviation in package name).

## Domain glossary
- `abac` — Attribute-Based Access Control (package name only; not referenced in current model code).
- `uc` — Unity Catalog (referenced in comment at model.ts:32 as "UC-2980", and implicitly across all types since policies live on Unity Catalog securables).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `oss` — not encountered in this package.
- `m2m`/`u2m`/`pat` — not encountered in this package.
- `iam` — not encountered, but conceptually overlaps with `Principal` references.

## File coverage
- `src/v1/model.ts` (497 lines): read fully.
- `src/v1/client.ts` (250 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (20 lines): read fully.

## Fixed
- #2 `DeletePolicy` (originally cited at `src/v1/model.ts:72`): Fixed in regeneration on 2026-05-20 — renamed to `DeletePolicyRequest`; siblings `CreatePolicyRequest`, `GetPolicyRequest`, `ListPoliciesRequest`, `UpdatePolicyRequest` also gained the `Request` suffix.
- #1 (partial — Deny/Grant values) `PolicyType.POLICY_TYPE_DENY` / `POLICY_TYPE_GRANT` (originally cited at `src/v1/model.ts:7-14`): Fixed in regeneration on 2026-05-20 — Deny and Grant enum values removed.
- #6 `FunctionArgExpression` (originally cited at `src/v1/model.ts:98`): Fixed in regeneration on 2026-05-20 — type removed entirely.
- #7 `useSessionIdentity` field (originally cited at `src/v1/model.ts:292`): Fixed in regeneration on 2026-05-20 — field removed from `PolicyInfo`.
- #14 `FunctionArgExpression.expr` (originally cited at `src/v1/model.ts:99`): Fixed in regeneration on 2026-05-20 — type removed.
- #15 `TagIntrospectionExpression.expr` (originally cited at `src/v1/model.ts:313`): Fixed in regeneration on 2026-05-20 — type removed.
- #16 `ColumnTagValueExtraction` / `TagValueExtraction` (originally cited at `src/v1/model.ts:60,328`): Fixed in regeneration on 2026-05-20 — both types removed.
- #20 (partial) `DenyOptions` / `GrantOptions` (originally cited at `src/v1/model.ts:84,142`): Fixed in regeneration on 2026-05-20 — both types removed; only `ColumnMaskOptions` and `RowFilterOptions` remain, but the `Options`-suffix issue still applies (now finding #14).
- #21 `ListPolicies` request type (originally cited at `src/v1/model.ts:152`): Fixed in regeneration on 2026-05-20 — renamed to `ListPoliciesRequest`.
