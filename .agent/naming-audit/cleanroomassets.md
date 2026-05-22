# Naming Audit: `@databricks/sdk-cleanroomassets` (v1)

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/cleanroomassets/src/v1/` *(package removed)*
**Files audited (in full):** `model.ts`, `client.ts`, `utils.ts`, `index.ts`
**Scope:** every exported type, interface, enum, enum value, field, method, and
internal helper symbol.

**Status:** The `cleanroomassets` package was removed from the SDK during
regeneration on 2026-05-13 (commit `28eac80`). Its contents were merged into
the `cleanrooms` package. All cited symbols, file paths, and line numbers
in this audit no longer exist at the cited locations. Surviving symbols
(e.g. `CleanRoomAsset*`, `ColumnInfo`, `PartitionSpecification*`,
`ColumnTypeName`, `ColumnMask`, `NotebookVersionReview`) are now located
in `packages/cleanrooms/src/v1/model.ts` and are covered by the
`cleanrooms` audit instead.

---

## Summary of issue counts (by category)

| #  | Category                                  | Count |
| -- | ----------------------------------------- | ----- |
| 1  | Vague / generic names                     | 0     |
| 2  | Redundant enum prefixes                   | 0     |
| 3  | Acronym casing inconsistencies            | 0     |
| 4  | Underscores in TS identifiers             | 0     |
| 5  | Cryptic abbreviations                     | 0     |
| 6  | Misleading names                          | 0     |
| 7  | Overly verbose names                      | 0     |
| 8  | Redundant suffixes                        | 0     |
| 9  | Singular / plural mismatches              | 0     |
| 10 | Reserved-word / built-in collisions       | 0     |
| 11 | Empty / trivial wrapper types             | 0     |
| 12 | Duplicate concepts                        | 0     |
| 13 | Verb-tense inconsistency                  | 0     |
| 14 | Go / Java-style names                     | 0     |
| 15 | Generic field names losing meaning        | 0     |
| 16 | Field contradicting type domain           | 0     |
| 17 | Inconsistent action verbs                 | 0     |
| 18 | Long enum values                          | 0     |
| 19 | Underspecified IDs                        | 0     |
| 20 | Type-suffix tautology                     | 0     |
| -- | Cross-cutting: `CleanRoom` redundancy     | 0     |
| -- | **Total findings**                        | **0** |

---

## 1. Vague / generic names

_None._

## 2. Redundant enum prefixes

_None._

## 3. Acronym casing inconsistencies

_None._

## 4. Underscores in TS identifiers

_None._

## 5. Cryptic abbreviations

_None._

## 6. Misleading names

_None._

## 7. Overly verbose names

_None._

## 8. Redundant suffixes

_None._

## 9. Singular / plural mismatches

_None._

## 10. Reserved-word / built-in collisions

_None._

## 11. Empty / trivial wrapper types

_None._

## 12. Duplicate concepts

_None._

## 13. Verb-tense inconsistency

_None._

## 14. Go / Java-style names

_None._

## 15. Generic field names losing meaning

_None._

## 16. Field contradicting type domain

_None._

## 17. Inconsistent action verbs

_None._

## 18. Long enum values

_None._

## 19. Underspecified IDs

_None._

## 20. Type-suffix tautology

_None._

## Cross-cutting: `CleanRoom` redundancy across four sibling packages

_None._

---

## Fixed

- #1.1 `details` on `CleanRoomAsset` (originally cited at model.ts:135): Fixed in regeneration on 2026-05-20 — package removed; symbol now lives in `cleanrooms` package and is tracked under that audit.
- #1.2 `localDetails` on `CleanRoomAsset` (originally cited at model.ts:100): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #1.3 `name` on `CleanRoomAsset` (originally cited at model.ts:90): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #1.4 `name` on `ColumnInfo` (originally cited at model.ts:269): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #1.5 `name` on `PartitionSpecification_Partition_PartitionValue` (originally cited at model.ts:436): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #1.6 `value` on `PartitionSpecification_Partition_PartitionValue` (originally cited at model.ts:441): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #1.7 `details` discriminated-union sub-cases (originally cited at model.ts:135–168): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #2.1 `CleanRoomAsset_AssetType.ASSET_TYPE_UNSPECIFIED` (originally cited at model.ts:37): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #2.2 `CleanRoomAsset_Status_Enum.ENUM_UNSPECIFIED` (originally cited at model.ts:47): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #2.3 `CleanRoomNotebookReview_NotebookReviewState.NOTEBOOK_REVIEW_STATE_UNSPECIFIED` (originally cited at model.ts:55): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #2.4 `CleanRoomNotebookReview_NotebookReviewSubReason.NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED` (originally cited at model.ts:63): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #5.1 `etag` (originally cited at model.ts:194, 370, 410): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #5.2 `op` on `PartitionSpecification_Partition_PartitionValue` (originally cited at model.ts:448): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #6.1 `createCleanRoomAssetReview` (originally cited at client.ts:109): Fixed in regeneration on 2026-05-20 — package removed; method relocated to `cleanrooms` package client.
- #6.2 `assetType` on `CreateCleanRoomAssetReviewRequest` (originally cited at model.ts:319): Fixed in regeneration on 2026-05-20 — package removed; request relocated to `cleanrooms` package.
- #6.3 `op` misleading (originally cited at model.ts:448): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #7.1 `CreateCleanRoomAssetReviewResponse.notebookReviewState` discriminator (originally cited at model.ts:330): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #7.2 `runnerCollaboratorAliases` (originally cited at model.ts:196): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package (and was already marked acceptable).
- #7.3 `reviewerCollaboratorAlias` (originally cited at model.ts:256): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package (and was already marked acceptable).
- #7.4 `ownerCollaboratorAlias` (originally cited at model.ts:98): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package (and was already marked acceptable).
- #7.5 `recipientPropertyKey` (originally cited at model.ts:446): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package (and was already marked acceptable).
- #9.1 `revisions` on `ListCleanRoomAssetRevisionsResponse` (originally cited at model.ts:387): Fixed in regeneration on 2026-05-20 — package removed; response relocated to `cleanrooms` package.
- #9.2 `listCleanRoomAssetRevisions` (originally cited at client.ts:255–270): Fixed in regeneration on 2026-05-20 — package removed; method relocated to `cleanrooms` package client.
- #10.1 `op` reserved-word concern (originally cited at model.ts:448): Fixed in regeneration on 2026-05-20 — package removed; symbol relocated to `cleanrooms` package.
- #12.1 `cleanRoomName` duplication across requests (originally cited at model.ts:315, 339, 355, 364, 375, 393, 474): Fixed in regeneration on 2026-05-20 — package removed; requests relocated to `cleanrooms` package.
- #12.2 `assetType` duplication across requests (originally cited at model.ts): Fixed in regeneration on 2026-05-20 — package removed; requests relocated to `cleanrooms` package.
- #12.3 `name` duplication as URL path + body (originally cited at model.ts): Fixed in regeneration on 2026-05-20 — package removed; requests relocated to `cleanrooms` package.
- #12.4 `localDetails`/`details` parallel discriminated unions (originally cited at model.ts): Fixed in regeneration on 2026-05-20 — package removed; types relocated to `cleanrooms` package.
- #13.1 `addedAt` vs. `createdAtMillis` (originally cited at model.ts:94 / 258): Fixed in regeneration on 2026-05-20 — package removed; fields relocated to `cleanrooms` package.
- #14.1 Snake-case wire keys (originally cited at model.ts:484–488): Fixed in regeneration on 2026-05-20 — package removed; schemas relocated to `cleanrooms` package (and were already marked acceptable).
- #15.1 `name` on `CleanRoomAsset` (originally cited at model.ts:90): Fixed in regeneration on 2026-05-20 — duplicate of #1.3; package removed.
- #15.2 `name` on `ColumnInfo` (originally cited at model.ts:269): Fixed in regeneration on 2026-05-20 — duplicate of #1.4; package removed.
- #15.3 `name` on partition value (originally cited at model.ts:436): Fixed in regeneration on 2026-05-20 — duplicate of #1.5; package removed.
- #15.4 `value` on partition value (originally cited at model.ts:441): Fixed in regeneration on 2026-05-20 — duplicate of #1.6; package removed.
- #15.5 `comment` ambiguity across types (originally cited at model.ts:262, 284, 414): Fixed in regeneration on 2026-05-20 — package removed; types relocated to `cleanrooms` package.
- #16.1 `ColumnTypeName.TABLE_TYPE` / `TABLEREF_TYPE` (originally cited at model.ts:31–32): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #16.2 `assetType` contradicting domain (originally cited at model.ts:319): Fixed in regeneration on 2026-05-20 — duplicate of #6.2; package removed.
- #17.1 `createCleanRoomAssetReview` action verb (originally cited at client.ts:109): Fixed in regeneration on 2026-05-20 — package removed; method relocated to `cleanrooms` package client.
- #18.1 `NOTEBOOK_REVIEW_STATE_UNSPECIFIED` (originally cited at model.ts:55): Fixed in regeneration on 2026-05-20 — duplicate of #2.3; package removed.
- #18.2 `NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED` (originally cited at model.ts:63): Fixed in regeneration on 2026-05-20 — duplicate of #2.4; package removed.
- #18.3 `ASSET_TYPE_UNSPECIFIED` (originally cited at model.ts:37): Fixed in regeneration on 2026-05-20 — duplicate of #2.1; package removed.
- #18.4 `ENUM_UNSPECIFIED` (originally cited at model.ts:47): Fixed in regeneration on 2026-05-20 — duplicate of #2.2; package removed.
- #18.5 `USER_DEFINED_TYPE` (originally cited at model.ts:24): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #18.6 `TIMESTAMP_NTZ` (originally cited at model.ts:25): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #19.1 `etag` underspecified ID (originally cited at model.ts:194, 370, 410): Fixed in regeneration on 2026-05-20 — package removed; field relocated to `cleanrooms` package.
- #19.2 `name` as asset primary key (originally cited at model.ts:343, 359): Fixed in regeneration on 2026-05-20 — package removed; requests relocated to `cleanrooms` package.
- #20.1 `ColumnTypeName` tautology (originally cited at model.ts:5): Fixed in regeneration on 2026-05-20 — package removed; enum relocated to `cleanrooms` package.
- #Cross-cutting `CleanRoom` redundancy (originally affecting every exported type/method): Fixed in regeneration on 2026-05-20 — package removed; cleanroom-asset exports consolidated under the `cleanrooms` package and are tracked under its audit.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
