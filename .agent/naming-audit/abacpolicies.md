# Naming Audit: abacpolicies

**Path:** `packages/abacpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Attribute-Based Access Control (ABAC) policies on Unity Catalog securables — create/get/list/update/delete row-filter, column-mask, deny, and grant policies.
**Total weird names flagged:** 40

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 17 |
| Low | 8 |
| Observation | 4 |

## High severity

### 1. `PolicyType.POLICY_TYPE_UNSPECIFIED` / `POLICY_TYPE_ROW_FILTER` / `POLICY_TYPE_COLUMN_MASK` / `POLICY_TYPE_DENY` / `POLICY_TYPE_GRANT` — `src/v1/model.ts:7-14`
- **Why weird:** Every value redundantly re-states the enum name (`PolicyType.POLICY_TYPE_*`). A `POLICY_TYPE_UNSPECIFIED` sentinel is a proto-buf import; idiomatic TS would use `undefined` for "not set".
- **Category:** 2 (redundant enum prefix), 14 (proto/Go-style names not idiomatic in TS).
- **Suggested name:** `PolicyType.Unspecified | RowFilter | ColumnMask | Deny | Grant` (or drop `Unspecified` entirely and rely on `policyType?: PolicyType | undefined`).
- **Rationale:** TS enum members are already namespaced by the enum (`PolicyType.RowFilter`). The `POLICY_TYPE_` prefix is pure protobuf noise.

### 2. `DeletePolicy` — `src/v1/model.ts:72`
- **Why weird:** Type whose name is a verb phrase (`DeletePolicy`) looks like it could be a function or command, not the request body. Other request types in the package follow the same broken pattern (`CreatePolicy`, `GetPolicy`, `ListPolicies`, `UpdatePolicy`).
- **Category:** 6 (misleading: name implies behaviour, actually a request DTO), 14 (Go-style naming).
- **Suggested name:** `DeletePolicyRequest` (and `CreatePolicyRequest`, `GetPolicyRequest`, `ListPoliciesRequest`, `UpdatePolicyRequest`).
- **Rationale:** TypeScript convention names request DTOs with a `Request` suffix; a bare verb-phrase noun reads as an action. Index.ts re-exports these as types, so consumers see `import type {DeletePolicy}` which looks like a function.

### 3. `DeletePolicy_Response` — `src/v1/model.ts:82`
- **Why weird:** Underscore in identifier (proto-style nested type). Requires an `eslint-disable` for `@typescript-eslint/naming-convention`.
- **Category:** 4 (underscores in TS identifiers).
- **Suggested name:** `DeletePolicyResponse`.
- **Rationale:** TS strict-type-checked rejects `Foo_Bar`. The `eslint-disable` is a tell that the name fights the language.

### 4. `ListPolicies_Response` — `src/v1/model.ts:173`
- **Why weird:** Underscore in identifier (proto-style nested type). Required `eslint-disable`.
- **Category:** 4 (underscores in TS identifiers).
- **Suggested name:** `ListPoliciesResponse`.
- **Rationale:** Same as `DeletePolicy_Response`. The underscore convention is a leaky proto abstraction and is not standard TypeScript.

### 5. `PolicyInfo` — `src/v1/model.ts:190`
- **Why weird:** `Info` is a generic suffix that adds nothing — every type is "info about something". This is the central domain entity; it should just be called `Policy`. (See rule 1: `Info` is on the vague-suffix list.)
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix).
- **Suggested name:** `Policy`.
- **Rationale:** `Policy` is the noun the user actually thinks about. The `Info` suffix is a tic carried over from Go SDK naming conventions that does not apply in TS, where the namespace and import path already disambiguate.

### 6. `onSecurableType: string` on `DeletePolicy` / `GetPolicy` / `ListPolicies` / `UpdatePolicy` — `src/v1/model.ts:74,135,154,335`
- **Why weird:** Typed as `string` everywhere on these request DTOs while the same field on `PolicyInfo` (`model.ts:198`) is typed as `SecurableType` enum. The values are the same domain (`CATALOG`, `SCHEMA`, ...) — the inconsistency is a bug.
- **Category:** 6 (misleading — name implies enum, actual type is `string`), 16 (field type contradicts domain).
- **Suggested name:** Keep the name but type it `SecurableType`.
- **Rationale:** Same field name with two different types across four request DTOs forces callers to remember which one is loose. This is almost certainly a generator bug worth flagging upstream.

### 7. `onSecurableFullname` — `src/v1/model.ts:75,76,136,155,202,336`
- **Why weird:** `fullname` is one un-camelCased word. Should be `fullName` to match field-naming conventions used everywhere else in the same model (`functionName`, `tagKey`, `columnAlias`, `pageToken`, etc.).
- **Category:** 3 (acronym/casing inconsistency — `name` is one word and should follow camelCase, so `Fullname` is wrong).
- **Suggested name:** `onSecurableFullName` (wire stays `on_securable_fullname`).
- **Rationale:** Internal consistency. JS/TS convention treats `fullName` as two words; the Go SDK collapses `Fullname` but TS shouldn't blindly inherit that.

### 8. `FunctionArgExpression` — `src/v1/model.ts:98`
- **Why weird:** `Arg` is an abbreviation for `Argument` in a type name even though the sibling type `FunctionArgument` (model.ts:108) spells it out. Within five lines the SDK uses both forms.
- **Category:** 5 (cryptic abbreviation when the long form is used right next door), 17 (inconsistency with sibling type).
- **Suggested name:** `FunctionArgumentExpression`.
- **Rationale:** Pick one. Right now `functionArgExpression` (field) shows up as a discriminator value while `functionArgument` is the containing type, which is jarring to read.

### 9. `useSessionIdentity` field — `src/v1/model.ts:292`
- **Why weird:** Field documented as "Temporary for migrating customers to session identity. After a grace period, this field will be removed and all policies will use session identity." Shipping an explicitly temporary flag in the public SDK surface is risky — once removed, every caller breaks.
- **Category:** 6 (misleading: appears stable but is explicitly a migration toggle).
- **Suggested name:** Either omit from public type or mark `@deprecated` from day one.
- **Rationale:** Public SDK fields should outlive the API; an "everyone will be on this in 6 months" boolean shouldn't live in a stable type. Worth pushing back upstream.

### 10. `MatchColumn` — `src/v1/model.ts:183`
- **Why weird:** Reads as a verb (`MatchColumn`) — could be a method or a type. The field that uses it is plural (`matchColumns: MatchColumn[]`), which then reads as "match columns are an array of `MatchColumn`", and a `MatchColumn` is actually a "column matcher / condition + alias pair".
- **Category:** 6 (misleading verb-as-noun), 9 (singular noun whose meaning is unclear).
- **Suggested name:** `ColumnMatcher` or `ColumnMatchCondition`.
- **Rationale:** Type names should be nouns; the verb form misleads. `ColumnMatcher` makes `matchColumns: ColumnMatcher[]` clearly read as "the matchers".

### 11. `useSessionIdentity` and `forSecurableType` / `onSecurableType` field prefixes — `src/v1/model.ts:198,223,292`
- **Why weird:** Three different prefixes for related concepts on the same struct: `on_securable_type`, `for_securable_type`, `use_session_identity`. The `on`/`for` split (carrier vs. target securable) is subtle and easily confused. Field names alone do not communicate which is which.
- **Category:** 1 (vague — the preposition does the disambiguation), 6 (misleading without docs).
- **Suggested name:** Rename `forSecurableType` to `appliesToSecurableType` (or similar) and `onSecurableType` to `definedOnSecurableType` to make the distinction explicit.
- **Rationale:** A user reading the type should not have to consult the JSDoc to tell `for` from `on`. These names sit beside each other and look interchangeable. (Upstream concern; the docstring says "Type of securables that the policy should take effect on" while the field is `forSecurableType` — even the documentation gets the prepositions tangled.)

## Medium severity

### 12. `SecurableType.STAGING_TABLE` — `src/v1/model.ts:35`
- **Why weird:** Enum value pinned by a comment that says it isn't a real securable yet: "TODO: [UC-2980] Staging tables aren't full-fleged securables yet." Internal TODOs in generated SDK enums leak abstraction.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Remove until it actually is a securable, or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't contain TODO-tagged speculative values.

### 13. `ColumnMaskOptions.using: FunctionArgument[]` — `src/v1/model.ts:56`
- **Why weird:** Field named `using` — a SQL reserved word and a generic preposition. Doesn't say what is being used.
- **Category:** 1 (vague), 10 (reserved-word-adjacent — `using` is a reserved-context keyword in JS dynamic import / TS).
- **Suggested name:** `extraArguments` / `additionalArguments` / `argumentList`.
- **Rationale:** `using` on its own carries no semantic load; readers must consult the doc to find out it's "additional positional args". Also appears on `RowFilterOptions` (model.ts:307) with the same problem.

### 14. `ColumnMaskOptions.onColumn` — `src/v1/model.ts:51`
- **Why weird:** Preposition-prefixed field name (`onColumn`) that just identifies the masked column. Inconsistent with `functionName` (also on the same type, no preposition).
- **Category:** 1 (vague), 17 (inconsistency).
- **Suggested name:** `maskedColumnAlias` or `targetColumnAlias`.
- **Rationale:** Names should describe what the field *is*, not its prepositional relationship.

### 15. `FunctionArgument.arg` discriminator field — `src/v1/model.ts:110`
- **Why weird:** `FunctionArgument` has a field `arg` (one of three variants). Type name and field name are near-duplicates; the field name is also an abbreviation of the type.
- **Category:** 5 (cryptic abbreviation), 11 (near-duplicate naming).
- **Suggested name:** Rename the field to `value` or `kind`.
- **Rationale:** `functionArgument.arg.$case === 'alias'` reads weirdly; the field name repeats an abbreviation of the type name.

### 16. `FunctionArgExpression.expr` discriminator field — `src/v1/model.ts:99`
- **Why weird:** Field uses the three-letter abbreviation `expr` rather than spelling out `expression`.
- **Category:** 5 (`expr` is a cryptic abbreviation).
- **Suggested name:** `expression` (spell out).
- **Rationale:** `expr` is the kind of three-letter abbreviation `typescript.mdc` discourages.

### 17. `TagIntrospectionExpression.expr` discriminator field — `src/v1/model.ts:313`
- **Why weird:** Same `expr` problem as above. A `TagIntrospectionExpression.expr` reads as redundant — the type is already an expression.
- **Category:** 5 (`expr` abbreviation), 17 (`expr` reused with two different meanings within model.ts).
- **Suggested name:** `value` (since the type itself is already "an expression"), or `variant`.
- **Rationale:** Reader hits `expression.expr.$case === 'tagValue'` which is noise on noise.

### 18. `ColumnTagValueExtraction` / `TagValueExtraction` — `src/v1/model.ts:60,328`
- **Why weird:** Pair of near-identical types, named with a clunky `XExtraction` suffix. The two together describe "get tag value (on securable)" vs "get column tag value", but the names imply more weight than the types carry (each holds 1-2 strings).
- **Category:** 7 (overly verbose), 8 (redundant `Extraction` suffix — these aren't extractions; they're parameters to a `getTagValue` introspection call).
- **Suggested name:** `SecurableTagSelector` and `ColumnTagSelector` (or just `Tag` and `ColumnTag`).
- **Rationale:** The "extraction" framing is a verb forced into a noun. `Selector`/`Tag` is shorter and more accurate.

### 19. `policyInfo` field on `CreatePolicy` / `UpdatePolicy` — `src/v1/model.ts:69,349`
- **Why weird:** Field named after the entity's awkward type (`policyInfo: PolicyInfo`). If `PolicyInfo` is renamed to `Policy`, this becomes `policy: Policy` which is much cleaner.
- **Category:** 20 (type-suffix tautology), 1 (`Info`).
- **Suggested name:** `policy` (paired with type renamed to `Policy`).
- **Rationale:** Tied to the `PolicyInfo` -> `Policy` rename (finding #5).

### 20. `policyType: PolicyType` field on `PolicyInfo` — `src/v1/model.ts:227`
- **Why weird:** Type-suffix tautology (`policyType` field of type `PolicyType`).
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `type: PolicyType` if `PolicyInfo` is renamed to `Policy`; otherwise tolerate.
- **Rationale:** Rule 20 in spec. The wire field is `policy_type` so the marshalled JSON stays unchanged.

### 21. `onSecurableType` / `forSecurableType` type-suffix tautology — `src/v1/model.ts:198,223`
- **Why weird:** Same as above — fields named `onSecurableType` of type `SecurableType` and `forSecurableType` of type `SecurableType`.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** Drop `Type` from the field once renaming (`onSecurable: SecurableType`, `forSecurable: SecurableType`) — though it conflicts with finding #11. Better to combine the two renames (`definedOnSecurable: SecurableType`, `appliesToSecurable: SecurableType`).
- **Rationale:** Reduces tautology and clarifies semantics at once.

### 22. Inconsistent rename style for `*Options` types — `src/v1/model.ts:38,84,142,295`
- **Why weird:** `ColumnMaskOptions`, `DenyOptions`, `GrantOptions`, `RowFilterOptions` — four mostly-identical-shaped types describing variants of policy options. Each is a discriminator member; the `Options` suffix is redundant given the discriminator already says "this is the X options".
- **Category:** 8 (redundant suffix), 12 (duplicate concept across four similar types).
- **Suggested name:** Either keep current names but acknowledge as boilerplate, or rename to `RowFilter`, `ColumnMask`, `Deny`, `Grant` (the `$case` discriminator already disambiguates).
- **Rationale:** Generator artefact; flagging because four near-identical types is the moment to ask whether the API surface should collapse.

### 23. `ListPolicies` request type — `src/v1/model.ts:152`
- **Why weird:** Plural type name for a singular request. Should be `ListPoliciesRequest`. Same issue as #2 but pluralisation collides with `policies: PolicyInfo[]` inside `ListPolicies_Response`, making it momentarily ambiguous which one is the type and which is the field.
- **Category:** 6 (misleading), 9 (plural request vs singular response).
- **Suggested name:** `ListPoliciesRequest`.
- **Rationale:** Tied to finding #2.

### 24. `whenCondition` field — `src/v1/model.ts:225`
- **Why weird:** `when` prefix is a SQL keyword; the field is a free-form condition expression. Just `condition` would suffice given the field already lives on `PolicyInfo`.
- **Category:** 1 (vague prefix), 10 (reserved-word-adjacent).
- **Suggested name:** `condition` or `conditionExpression`.
- **Rationale:** `when_condition` is wire-only; the TS name can drop the redundant `when_`.

### 25. `toPrincipals` / `exceptPrincipals` field names — `src/v1/model.ts:215,217`
- **Why weird:** Preposition-prefixed names mirror SQL `TO`/`EXCEPT` syntax (this is an ABAC-on-UC policy, the API mimics SQL `GRANT ... TO ... EXCEPT ...`). For programmatic SDK consumers, `principals` and `excludedPrincipals` would read more naturally.
- **Category:** 1 (vague), 14 (Go/SQL-style names not idiomatic for TS).
- **Suggested name:** `appliedPrincipals` / `excludedPrincipals` (or `principals` and `excludePrincipals`).
- **Rationale:** Consumers who don't know the SQL syntax will misread `to_principals` as "principal list to apply to" and miss that `except_principals` is the complement.

### 26. `MatchColumn.condition: string` — `src/v1/model.ts:185`
- **Why weird:** A `MatchColumn` has a field called `condition` (matched column condition expression) and an `alias`. The condition could equally well be called `expression`; "condition" implies boolean, but it's actually a column-selector expression evaluated to a column.
- **Category:** 6 (misleading).
- **Suggested name:** `columnExpression` or `selector`.
- **Rationale:** Domain reading: "match columns where condition = X" suggests filtering rows; here it actually selects which columns the policy applies to. Easy to misread.

### 27. `PolicyInfo.id` — `src/v1/model.ts:192`
- **Why weird:** Bare `id` field on `PolicyInfo` alongside `name`, `onSecurableFullname`, etc. — multiple identifier-like fields; bare `id` is underspecified.
- **Category:** 19 (underspecified id when multiple ids exist).
- **Suggested name:** `policyId`.
- **Rationale:** Disambiguates from securable identifiers in the same struct.

### 28. `PolicyInfo.comment` — `src/v1/model.ts:210`
- **Why weird:** Doc says "Optional description of the policy" but the field is named `comment`. SQL stores DDL comments, sure, but a TS-facing field that the JSDoc calls a description should be `description`.
- **Category:** 6 (misleading — doc says description, name says comment).
- **Suggested name:** `description`.
- **Rationale:** Match the doc and avoid the SQL-DDL leak.

## Low severity

### 29. `unmarshalDeletePolicy_ResponseSchema` — `src/v1/model.ts:381`
- **Why weird:** Schema name carries the underscore from the type plus an `eslint-disable`.
- **Category:** 4 (underscore identifier).
- **Suggested name:** Falls out if `DeletePolicy_Response` -> `DeletePolicyResponse`.
- **Rationale:** Mechanical cascade from #3.

### 30. `unmarshalListPolicies_ResponseSchema` — `src/v1/model.ts:440`
- **Why weird:** Same as #29.
- **Category:** 4.
- **Suggested name:** Mechanical cascade from #4.
- **Rationale:** Same.

### 31. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Minor; only one place in the file but flagged for consistency review across the SDK.

### 32. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Function is exported but not used in this package (no caller in `client.ts`). Dead-looking surface area.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Either remove the export (if it's an unused generator default), or document why it ships per-package.
- **Rationale:** Not a name-quality issue per se, but flagged because each generated package will carry this and grep for unused exports across all packages will turn it up.

### 33. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Name is fine but generic; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` / `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 34. `parseResponse` / `marshalRequest` verb asymmetry — `src/v1/utils.ts:113,119`
- **Why weird:** `parseResponse` (unmarshal) is the inverse of `marshalRequest`. Naming uses two different verbs (`parse` vs `marshal`) for opposite operations.
- **Category:** 17 (inconsistent action verbs).
- **Suggested name:** `unmarshalResponse` / `marshalRequest` for symmetry, or `parseResponse` / `serializeRequest`.
- **Rationale:** Pair-wise consistency aids reading.

### 35. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling very different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp` (or `wrapCall` / `dispatchHttp`).
- **Rationale:** Names should differ in more than the `Http` infix.

### 36. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Same word `Options` is reused throughout the SDK for many unrelated concepts (`ClientOptions`, `CallOptions`, `RowFilterOptions`, ...). Within this file there's also `Options` imported from `@databricks/sdk-core/api` (line 3).
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's not user-facing options; it's an internal bag of args).
- **Rationale:** Distinguish internal context bags from user-tunable option structs.

## Observations

### 37. Wire/TS divergence is heavy
The model file is ~796 lines for ~15 user-facing types; >half is marshal/unmarshal/FieldMaskSchema scaffolding. Not a naming problem, but the audit surfaces just how much generator boilerplate dominates each package — worth raising at the SDK-design level.

### 38. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`List`/`Update`/`Delete` consistently. No mixed `Fetch`/`Retrieve`/`Read`. This is good. (Listed as observation per rule 17 since the audit asked us to flag inconsistencies; here we explicitly note consistency.)

### 39. Acronym casing for `Http` / `Url` / `Id` in `utils.ts` / `client.ts`
The codebase uses `Http` (`HttpClient`, `HttpRequest`, `executeHttpCall`) and `URLSearchParams` (Web standard) and `url` (lowercase) and `userAgent`. Mixing `Http` (PascalCase capital-then-lower) with the imported `URLSearchParams` (ALLCAPS) is inconsistent — common across JS ecosystem and probably not worth changing, but worth noting.
- **Category:** 3 (acronym casing).

### 40. `abac` abbreviation only appears in package name
The package directory is `abacpolicies` but neither type, field, comment, nor enum mentions `abac`. The package name acts as a domain keyword the SDK is otherwise silent about. Comments on `useSessionIdentity` (model.ts:286) mention "ABAC" once. May confuse users searching by acronym.
- **Category:** 5 (cryptic abbreviation in package name).

## Domain glossary
- `abac` — Attribute-Based Access Control (package name only; one comment at model.ts:286).
- `uc` — Unity Catalog (referenced in comment at model.ts:34 as "UC-2980", and implicitly across all types since policies live on Unity Catalog securables).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `oss` — not encountered in this package.
- `m2m`/`u2m`/`pat` — not encountered in this package.
- `iam` — not encountered, but conceptually overlaps with `Principal` references.

## File coverage
- `src/v1/model.ts` (796 lines): read fully.
- `src/v1/client.ts` (241 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (26 lines): read fully.
