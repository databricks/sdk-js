# Naming Audit: abacpolicies

**Path:** `packages/abacpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Attribute-Based Access Control (ABAC) policies on Unity Catalog securables — create/get/list/update/delete row-filter and column-mask policies.
**Total weird names flagged:** 7

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 2 |
| Low | 0 |
| Observation | 2 |

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

_None._

## Observations

### 6. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`List`/`Update`/`Delete` consistently. No mixed `Fetch`/`Retrieve`/`Read`. This is good. (Listed as observation per rule 17 since the audit asked us to flag inconsistencies; here we explicitly note consistency.)

### 7. Acronym casing for `Http` / `Url` / `Id` across the SDK
The codebase uses `Http` (PascalCase capital-then-lower, e.g. `HttpClient`, `HttpRequest`) alongside the imported `URLSearchParams` (ALLCAPS, Web standard) and lowercase `url` / `userAgent`. Mixing `Http`-style with `URL`-style acronym casing is inconsistent across the SDK surface — common across JS ecosystem and probably not worth changing, but worth noting as a cross-package consistency question.
- **Category:** 3 (acronym casing).

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
