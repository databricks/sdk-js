# Naming Audit: abacpolicies

**Path:** `packages/abacpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Attribute-Based Access Control (ABAC) policies on Unity Catalog securables — create/get/list/update/delete row-filter and column-mask policies.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 2 |
| Low | 4 |
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

### 3. `MatchColumn` — `src/v1/model.ts:130`
- **Why weird:** Reads as a verb (`MatchColumn`) — could be a method or a type. The field that uses it is plural (`matchColumns: MatchColumn[]`), which then reads as "match columns are an array of `MatchColumn`", and a `MatchColumn` is actually a "column matcher / condition + alias pair".
- **Category:** 6 (misleading verb-as-noun), 9 (singular noun whose meaning is unclear).
- **Suggested name:** `ColumnMatcher` or `ColumnMatchCondition`.
- **Rationale:** Type names should be nouns; the verb form misleads. `ColumnMatcher` makes `matchColumns: ColumnMatcher[]` clearly read as "the matchers".

## Medium severity

### 4. `SecurableType.STAGING_TABLE` — `src/v1/model.ts:33`
- **Why weird:** Enum value pinned by a comment that says it isn't a real securable yet: "TODO: [UC-2980] Staging tables aren't full-fleged securables yet." Internal TODOs in generated SDK enums leak abstraction.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Remove until it actually is a securable, or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't contain TODO-tagged speculative values.

### 5. Inconsistent rename style for `*Options` types — `src/v1/model.ts:36,215`
- **Why weird:** `ColumnMaskOptions` and `RowFilterOptions` — two near-identical types describing variants of policy options. Each is a discriminator member; the `Options` suffix is redundant given the discriminator already says "this is the X options".
- **Category:** 8 (redundant suffix), 12 (duplicate concept across similar types).
- **Suggested name:** Either keep current names but acknowledge as boilerplate, or rename to `RowFilter`, `ColumnMask` (the `$case` discriminator already disambiguates).
- **Rationale:** Generator artefact; flagging because near-identical types is the moment to ask whether the API surface should collapse.

## Low severity

### 6. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Minor; only one place in the file but flagged for consistency review across the SDK.

### 7. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Function is exported but not used in this package (no caller in `client.ts`). Dead-looking surface area.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Either remove the export (if it's an unused generator default), or document why it ships per-package.
- **Rationale:** Not a name-quality issue per se, but flagged because each generated package will carry this and grep for unused exports across all packages will turn it up.

### 8. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Name is fine but generic; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` / `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 9. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling very different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp` (or `wrapCall` / `dispatchHttp`).
- **Rationale:** Names should differ in more than the `Http` infix.

## Observations

### 10. Wire/TS divergence is heavy
The model file is ~497 lines for ~9 user-facing types; >half is marshal/unmarshal/FieldMaskSchema scaffolding. Not a naming problem, but the audit surfaces just how much generator boilerplate dominates each package — worth raising at the SDK-design level.

### 11. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`List`/`Update`/`Delete` consistently. No mixed `Fetch`/`Retrieve`/`Read`. This is good. (Listed as observation per rule 17 since the audit asked us to flag inconsistencies; here we explicitly note consistency.)

### 12. Acronym casing for `Http` / `Url` / `Id` in `utils.ts` / `client.ts`
The codebase uses `Http` (`HttpClient`, `HttpRequest`, `executeHttpCall`) and `URLSearchParams` (Web standard) and `url` (lowercase) and `userAgent`. Mixing `Http` (PascalCase capital-then-lower) with the imported `URLSearchParams` (ALLCAPS) is inconsistent — common across JS ecosystem and probably not worth changing, but worth noting.
- **Category:** 3 (acronym casing).

### 13. `abac` abbreviation only appears in package name
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
