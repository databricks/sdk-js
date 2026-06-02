# Naming Audit: abacpolicies

**Path:** `packages/uc/abacpolicies/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |

## High severity

### 1. `PolicyInfo` — `src/v1/model.ts:136`
- **Why weird:** `Info` is a generic suffix that adds nothing — every type is "info about something". This is the central domain entity; it should just be called `Policy`. (See rule 1: `Info` is on the vague-suffix list.)
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix).
- **Suggested name:** `Policy`.
- **Rationale:** `Policy` is the noun the user actually thinks about. The `Info` suffix is a tic carried over from Go SDK naming conventions that does not apply in TS, where the namespace and import path already disambiguate.

### 2. `MatchColumn` — `src/v1/model.ts:129`
- **Why weird:** Reads as a verb (`MatchColumn`) — could be a method or a type. The field that uses it is plural (`matchColumns: MatchColumn[]`), which then reads as "match columns are an array of `MatchColumn`", and a `MatchColumn` is actually a "column matcher / condition + alias pair".
- **Category:** 6 (misleading verb-as-noun), 9 (singular noun whose meaning is unclear).
- **Suggested name:** `ColumnMatcher` or `ColumnMatchCondition`.
- **Rationale:** Type names should be nouns; the verb form misleads. `ColumnMatcher` makes `matchColumns: ColumnMatcher[]` clearly read as "the matchers".
