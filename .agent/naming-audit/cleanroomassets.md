# Naming Audit: `@databricks/sdk-cleanroomassets` (v1)

**Path:** `packages/cleanroomassets/src/v1/`
**Files audited (in full):** `model.ts`, `client.ts`, `utils.ts`, `index.ts`
**Scope:** every exported type, interface, enum, enum value, field, method, and
internal helper symbol.

Findings are grouped by the 20-issue rubric supplied in the task description.
Each finding lists the symbol, the file/line, the category, the rationale, and
a concrete suggestion. The package belongs to a family of four sibling
cleanroom packages (`cleanrooms`, `cleanroomassets`, `cleanroomautoapprovalrules`,
`cleanroomtaskruns`); cross-package redundancy is called out throughout.

---

## Summary of issue counts (by category)

| #  | Category                                  | Count |
| -- | ----------------------------------------- | ----- |
| 1  | Vague / generic names                     | 7     |
| 2  | Redundant enum prefixes                   | 5     |
| 3  | Acronym casing inconsistencies            | 0     |
| 4  | Underscores in TS identifiers             | 17    |
| 5  | Cryptic abbreviations                     | 2     |
| 6  | Misleading names                          | 3     |
| 7  | Overly verbose names                      | 6     |
| 8  | Redundant suffixes                        | 2     |
| 9  | Singular / plural mismatches              | 2     |
| 10 | Reserved-word / built-in collisions       | 1     |
| 11 | Empty / trivial wrapper types             | 0     |
| 12 | Duplicate concepts                        | 4     |
| 13 | Verb-tense inconsistency                  | 1     |
| 14 | Go / Java-style names                     | 1     |
| 15 | Generic field names losing meaning        | 5     |
| 16 | Field contradicting type domain           | 2     |
| 17 | Inconsistent action verbs                 | 1     |
| 18 | Long enum values                          | 6     |
| 19 | Underspecified IDs                        | 2     |
| 20 | Type-suffix tautology                     | 3     |
| -- | Cross-cutting: `CleanRoom` redundancy     | 1     |
| -- | **Total findings**                        | **71** |

---

## 1. Vague / generic names

### 1.1 `details` on `CleanRoomAsset` (model.ts:135)

The field name `details` says nothing — and the type is a discriminated union
across four asset-type sub-shapes. The same struct also has a field named
`localDetails` (line 100) covering a *different* axis (owner-private vs. shared
metadata), so a reader has to memorise the distinction. Suggested rename:
`sharedDetails` (mirror of `localDetails`) or `payload` /
`typeSpecificDetails`.

### 1.2 `localDetails` on `CleanRoomAsset` (model.ts:100)

"Local" is jargon for "private to the owner collaborator". A reader of the
public TS surface will not connect *local* to *not-visible-to-other-collaborators*.
Suggested rename: `ownerOnlyDetails` or `privateDetails`.

### 1.3 `name` on `CleanRoomAsset` (model.ts:90)

A bare `name` ambiguously identifies a fully qualified asset name —
`<shared_catalog>.<shared_schema>.<asset_name>` for UC objects, a notebook
file name otherwise. Compare with `CleanRoomNotebookReview.comment` →
`reviewerCollaboratorAlias` etc., which are specific. Suggested rename:
`assetName` or `fullyQualifiedName`.

### 1.4 `name` on `ColumnInfo` (model.ts:269)

The JSDoc just says "Name of Column." Inside a `ColumnInfo` value this is fine,
but when destructured into a wider scope (`const {name} = info`) the meaning
is lost. Suggested rename: `columnName`.

### 1.5 `name` on `PartitionSpecification_Partition_PartitionValue` (model.ts:436)

Same problem as 1.4: `name` here means "partition column name", not "partition
name". Suggested rename: `columnName` or `partitionColumn`.

### 1.6 `value` on `PartitionSpecification_Partition_PartitionValue` (model.ts:441)

Vague string field that doubles as a sentinel: undefined means `null`. Naming
gives no hint of this contract. Suggested rename: `literalValue` (paired with
`recipientPropertyKey`).

### 1.7 `details` on `CleanRoomAsset` discriminated union — sub-cases (model.ts:135–168)

Inside the discriminated union we have keys `table`, `notebook`, `view`,
`foreignTable`. Outside of the union, the same names would mean very different
things (e.g. "this asset *is* a table"). Suggested rename: explicit suffix —
`tableDetails`, `notebookDetails`, etc. — matches the `*LocalDetails` siblings.

---

## 2. Redundant enum prefixes

### 2.1 `CleanRoomAsset_AssetType.ASSET_TYPE_UNSPECIFIED` (model.ts:37)

The enum is called `CleanRoomAsset_AssetType` and the literal is
`ASSET_TYPE_UNSPECIFIED`. The `ASSET_TYPE_` prefix duplicates the enum name.
Suggested rename: `UNSPECIFIED`.

### 2.2 `CleanRoomAsset_Status_Enum.ENUM_UNSPECIFIED` (model.ts:47)

The literal `ENUM_UNSPECIFIED` carries the word "ENUM" — meaningless without
the type. Suggested rename: literal `UNSPECIFIED`.

### 2.3 `CleanRoomNotebookReview_NotebookReviewState.NOTEBOOK_REVIEW_STATE_UNSPECIFIED` (model.ts:55)

`NOTEBOOK_REVIEW_STATE_` repeats both the parent (`CleanRoomNotebookReview`) and
the suffix (`NotebookReviewState`). Suggested rename: `UNSPECIFIED`.

### 2.4 `CleanRoomNotebookReview_NotebookReviewSubReason.NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED` (model.ts:63)

Five words of prefix on a single literal. Suggested rename: `UNSPECIFIED`.

### 2.5 `PartitionSpecification_Partition_PartitionValue_PartitionValueOp` (model.ts:69)

Members `EQUAL` / `LIKE` are fine; the enum *name* repeats `Partition` three
times and `PartitionValue` twice (see 7.1). Members themselves are not
redundant.

---

## 3. Acronym casing inconsistencies

None found. `etag` (lower-case in model.ts:194, 370, 410) is consistently
lower-cased everywhere; `Json` is title-case in `typeJson` (model.ts:282) and
appears nowhere else as `JSON`. `UDF` and `SQL` appear only in JSDoc prose, not
in identifiers. `URL` appears only in helper variable names inside `client.ts`
(`url`, `fullUrl`) and is consistent.

---

## 4. Underscores in TS identifiers

The proto-style `_` segregator is suppressed with explicit
`@typescript-eslint/naming-convention` exemptions. While this preserves
parity with the Go SDK, every such name is an underscore-in-identifier
violation by TypeScript conventions ([TypeScript Handbook — Names use camelCase
or PascalCase](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)).
The following identifiers should be reviewed at the porting layer:

| #     | Identifier                                                                       | File:line          |
| ----- | -------------------------------------------------------------------------------- | ------------------ |
| 4.1   | `CleanRoomAsset_AssetType`                                                       | model.ts:36        |
| 4.2   | `CleanRoomAsset_Status_Enum`                                                     | model.ts:46        |
| 4.3   | `CleanRoomNotebookReview_NotebookReviewState`                                    | model.ts:54        |
| 4.4   | `CleanRoomNotebookReview_NotebookReviewSubReason`                                | model.ts:62        |
| 4.5   | `PartitionSpecification_Partition_PartitionValue_PartitionValueOp`               | model.ts:69        |
| 4.6   | `CleanRoomAsset_ForeignTable`                                                    | model.ts:172       |
| 4.7   | `CleanRoomAsset_ForeignTableLocalDetails`                                        | model.ts:178       |
| 4.8   | `CleanRoomAsset_Notebook`                                                        | model.ts:187       |
| 4.9   | `CleanRoomAsset_Status`                                                          | model.ts:211       |
| 4.10  | `CleanRoomAsset_Table`                                                           | model.ts:214       |
| 4.11  | `CleanRoomAsset_TableLocalDetails`                                               | model.ts:220       |
| 4.12  | `CleanRoomAsset_View`                                                            | model.ts:231       |
| 4.13  | `CleanRoomAsset_ViewLocalDetails`                                                | model.ts:237       |
| 4.14  | `CleanRoomAsset_VolumeLocalDetails`                                              | model.ts:246       |
| 4.15  | `PartitionSpecification_Partition`                                               | model.ts:428       |
| 4.16  | `PartitionSpecification_Partition_PartitionValue`                                | model.ts:434       |
| 4.17  | All proto `$case` discriminator values use camelCase (good), but underlying serialized fields use `snake_case` (e.g. `clean_room_name`, `notebook_review_state`) — fine for wire format, just calling out the boundary | model.ts:484+    |

Suggested approach: drop the underscore and concatenate
(`CleanRoomAssetAssetType` → still ugly; `CleanRoomAssetTableLocalDetails` is
acceptable). Alternative: extract nested types under a namespace
(`namespace CleanRoomAsset { export interface Notebook {} }`), eliminating both
the underscore and the parent-name repetition.

---

## 5. Cryptic abbreviations

### 5.1 `etag` (model.ts:194, 370, 410)

Acceptable as a wire term but worth knowing it appears in user-facing request
types (`GetCleanRoomAssetRevisionRequest.etag`, line 370). Consider
documenting once via a type alias `type Etag = string` rather than renaming.

### 5.2 `op` on `PartitionSpecification_Partition_PartitionValue` (model.ts:448)

`op` is a two-letter cryptic abbreviation. JSDoc says "The operator to apply
for the value." Suggested rename: `operator`. (`op` may collide with mental
shorthand for "operation" too — see also 6.3.)

---

## 6. Misleading names

### 6.1 `createCleanRoomAssetReview` (client.ts:109)

The method body POSTs a `notebookReview` (the only `$case` in the union, see
`CreateCleanRoomAssetReviewRequest.review`, model.ts:320). The name suggests a
generic asset-review creator, but the API can only review notebooks today.
Suggested rename (if the API truly only supports one type):
`reviewCleanRoomNotebook` or document the polymorphism more loudly.

### 6.2 `assetType` on `CreateCleanRoomAssetReviewRequest` (model.ts:319)

JSDoc says "Can either be NOTEBOOK_FILE or JAR_ANALYSIS", but `JAR_ANALYSIS`
does not exist in `CleanRoomAsset_AssetType` (only `TABLE`, `NOTEBOOK_FILE`,
`VOLUME`, `VIEW`, `FOREIGN_TABLE`; see model.ts:38–42). The doc misleads
readers about what values are valid.

### 6.3 `op` (model.ts:448)

Beyond cryptic (5.2), `op` is also misleading because the enum currently has
only `EQUAL` / `LIKE` — those are not arithmetic *operators* but partition
*match operators*. Suggested: `matchOp` or `matcher`.

---

## 7. Overly verbose names

### 7.1 `PartitionSpecification_Partition_PartitionValue_PartitionValueOp` (model.ts:69)

47-character enum name with `Partition`/`PartitionValue` repeated. Suggested
rename: `PartitionMatchOperator`. In a flattened namespace, the parent context
adds no value here.

### 7.2 `CreateCleanRoomAssetReviewResponse.notebookReviewState` discriminator key (model.ts:330)

The discriminated-union variant name *and* the inner property name are both
`notebookReviewState`. Redundancy of `notebookReviewState` against the parent
`reviewState` field could be elided. Suggested: `{$case: 'notebook', state:
NotebookReviewState}`.

### 7.3 `runnerCollaboratorAliases` (model.ts:196)

Long composite, but accurate. Acceptable.

### 7.4 `reviewerCollaboratorAlias` (model.ts:256)

Same. Acceptable.

### 7.5 `ownerCollaboratorAlias` (model.ts:98)

Same. Acceptable.

### 7.6 `recipientPropertyKey` (model.ts:446)

Acceptable; needs the `recipient`/`property`/`key` qualifiers for accuracy.

(7.3–7.6 are kept under this category for completeness, but only flagged as
borderline — none should change.)

---

## 8. Redundant suffixes

### 8.1 `CleanRoomNotebookReview_NotebookReviewState` (model.ts:54)

`NotebookReview` is repeated immediately after the underscore. Suggested
rename: `CleanRoomNotebookReview_State`.

### 8.2 `CleanRoomNotebookReview_NotebookReviewSubReason` (model.ts:62)

Same redundancy. Suggested: `CleanRoomNotebookReview_SubReason`.

---

## 9. Singular / plural mismatches

### 9.1 `revisions` on `ListCleanRoomAssetRevisionsResponse` (model.ts:387)

The field is typed `CleanRoomAsset[]` — the elements are *assets*, not
revisions. The list endpoint returns asset *snapshots at different revisions*,
but the type is plain `CleanRoomAsset`. Either the field should be `assets`
(matching `ListCleanRoomAssetsResponse.assets`, line 400) or a dedicated
`CleanRoomAssetRevision` type should exist.

### 9.2 `listCleanRoomAssetRevisions` returning `revisions: CleanRoomAsset[]` (client.ts:255–270)

The method yields `CleanRoomAsset` values — same mismatch as 9.1. Suggested
either rename method to `listCleanRoomAsset` (which collides with
`getCleanRoomAsset`'s revision case) or introduce a wrapper type.

---

## 10. Reserved-word / built-in collisions

### 10.1 `op` (model.ts:448)

Not reserved, but commonly shadows local helpers and is unsearchable.

---

## 11. Empty / trivial wrapper types

_None._

---

## 12. Duplicate concepts

### 12.1 `cleanRoomName` appears in every request type

Fields `cleanRoomName` are present on: `CreateCleanRoomAssetReviewRequest`
(315), `DeleteCleanRoomAssetRequest` (339), `GetCleanRoomAssetRequest` (355),
`GetCleanRoomAssetRevisionRequest` (364), `ListCleanRoomAssetRevisionsRequest`
(375), `ListCleanRoomAssetsRequest` (393), `UpdateCleanRoomAssetRequest`
(474). Same concept, copied seven times. Not avoidable for codegen, but a
shared `interface CleanRoomScoped { cleanRoomName?: string; }` could
deduplicate.

### 12.2 `assetType` appears in every Create/Get/Delete/Review request

Same critique as 12.1.

### 12.3 `name` (the asset name) appears as both URL path component and as a
duplicated string field on `Delete/Get/GetRevision/ListRevisions/Review`
requests — every request that targets a specific asset re-declares it.

### 12.4 Both `localDetails` and `details` are discriminated unions over the same
asset-type axis (`tableLocalDetails`/`volumeLocalDetails`/`viewLocalDetails`/
`foreignTableLocalDetails` vs. `table`/`notebook`/`view`/`foreignTable`).
The `notebook` variant exists only on `details` (notebooks have no local
half). The asymmetry will confuse readers. Suggested: split into two clear
structs (`OwnerOnlyDetails`, `SharedDetails`) so the parallel-but-asymmetric
shape is documented in types, not only prose.

---

## 13. Verb-tense inconsistency

### 13.1 `addedAt` vs. `createdAtMillis` (model.ts:94 / 258)

Two timestamp fields on related types: `addedAt` (past participle, no unit
suffix; comment says "in epoch milliseconds") and `createdAtMillis` (past
participle, explicit `Millis` suffix). Same concept, different surface.
Suggested: pick one — either both bare names with comment-documented units,
or both `*AtMillis`.

---

## 14. Go / Java-style names

### 14.1 Snake-case wire keys in the schema bodies (`clean_room_name`,
`asset_type`, etc., model.ts:484–488 and elsewhere) — necessary for wire
format, but they appear next to camelCase TS properties in the same
`.transform(...)` call. The schema-level inputs intentionally look like Go
field tags. Acceptable; flagging it for readers to know.

---

## 15. Generic field names losing meaning

### 15.1 `name` (asset-name) in `CleanRoomAsset` (model.ts:90) — see 1.3.

### 15.2 `name` (column-name) in `ColumnInfo` (model.ts:269) — see 1.4.

### 15.3 `name` (partition-column-name) on partition value (model.ts:436) — see 1.5.

### 15.4 `value` on partition value (model.ts:441) — see 1.6.

### 15.5 `comment` appears on `ColumnInfo` (284), `CleanRoomNotebookReview`
(262), and `NotebookVersionReview` (414). Same word, three meanings:
column-level documentation, reviewer comment, review-submission comment.
Acceptable in context but a reader scanning a flat shape can mix them up.

---

## 16. Field contradicting type domain

### 16.1 `ColumnTypeName.TABLE_TYPE` and `ColumnTypeName.TABLEREF_TYPE` (model.ts:31–32)

`ColumnTypeName` is supposed to enumerate primitive / collection column types
(`BOOLEAN`, `INT`, `STRING`, `ARRAY`…). Having `TABLE_TYPE` / `TABLEREF_TYPE`
inside that enum is conceptually mixed: columns aren't tables. Whatever the
Unity Catalog model dictates here, the names contradict the enum's apparent
domain. At minimum: rename the enum to `ColumnTypeOrTableTypeName`, or move
those two values to a dedicated enum.

### 16.2 `assetType` on `CreateCleanRoomAssetReviewRequest.assetType`
(model.ts:319) — typed `CleanRoomAsset_AssetType`, but the JSDoc allows
`JAR_ANALYSIS`, which is not in the enum. The field type *contradicts the
documented contract*. See also 6.2.

---

## 17. Inconsistent action verbs

### 17.1 `createCleanRoomAssetReview` (client.ts:109) vs. the rest

The CRUD methods are `create*`, `get*`, `delete*`, `update*`, `list*`. The
*review submission* uses `create*`, while a sibling concept would be
`submit*`. This is a single inconsistency — most teams accept "create" as
the noun-builder. Suggested: rename to `submitCleanRoomAssetReview` to match
domain language ("submit review") in the JSDoc on line 108.

---

## 18. Long enum values

### 18.1 `NOTEBOOK_REVIEW_STATE_UNSPECIFIED` (model.ts:55) — see 2.3.

### 18.2 `NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED` (model.ts:63) — see 2.4.

### 18.3 `ASSET_TYPE_UNSPECIFIED` (model.ts:37) — see 2.1.

### 18.4 `ENUM_UNSPECIFIED` (model.ts:47) — see 2.2.

### 18.5 `USER_DEFINED_TYPE` (model.ts:24) — long but accurate; arguably
`USER_DEFINED` suffices.

### 18.6 `TIMESTAMP_NTZ` (model.ts:25) — acceptable (Databricks-specific).

---

## 19. Underspecified IDs

### 19.1 `etag` (model.ts:194, 370, 410, 575…)

`etag` *is* an identifier (revision ID) here, but the name doesn't tell a
casual reader that supplying it pins a specific notebook revision. The JSDoc
on `GetCleanRoomAssetRevisionRequest.etag` (369) says "Revision etag to
fetch." Suggested rename: `revisionEtag` or `revisionId`.

### 19.2 `name` used as a primary key for assets

Several requests (`GetCleanRoomAssetRequest.name`, line 359;
`DeleteCleanRoomAssetRequest.name`, line 343) use `name` as the identifier.
The JSDoc has to spell out "it is same as the name field in CleanRoomAsset."
Suggested rename: `assetName` everywhere — eliminates the cross-reference.

---

## 20. Type-suffix tautology

### 20.1 `CleanRoomNotebookReview_NotebookReviewState` (model.ts:54)

Enum *name* contains the type-suffix `State` while the parent already conveys
that this is the *state* of a notebook review. See 8.1.

### 20.2 `CleanRoomNotebookReview_NotebookReviewSubReason` (model.ts:62)

Same — `SubReason` is suffix-tautology with the parent's `Review`.

### 20.3 `ColumnTypeName` (model.ts:5)

`TypeName` is *almost* tautology with `Column`; a column's type-name is just
its *type*. Suggested rename: `ColumnType`.

---

## Cross-cutting: `CleanRoom` redundancy across four sibling packages

The package is already named `cleanroomassets`. Every public type starts with
`CleanRoom*` (`CleanRoomAsset`, `CleanRoomNotebookReview`, etc.). Re-export of
`Client` happens via `import {Client} from '@databricks/sdk-cleanroomassets'`
— at the call site the prefix on type names is redundant:

```ts
import {Client, CleanRoomAsset} from '@databricks/sdk-cleanroomassets';
// vs. the cleaner:
import {Client, Asset} from '@databricks/sdk-cleanroomassets';
```

Sibling packages would do the same — `cleanrooms#CleanRoom`,
`cleanroomtaskruns#CleanRoomTaskRun`, etc. — and the `CleanRoom` namespace
collapses naturally into the *package* boundary.

Affected exports (all in `model.ts` and re-exported by `index.ts`):

- `CleanRoomAsset` → `Asset`
- `CleanRoomAsset_AssetType` → `AssetType` (which is itself redundant; see 8/20)
- `CleanRoomAsset_Status` / `_Status_Enum` → `Status` / `StatusEnum`
- `CleanRoomAsset_ForeignTable` / `_ForeignTableLocalDetails` → `ForeignTable` /
  `ForeignTableLocalDetails`
- `CleanRoomAsset_Notebook` → `Notebook`
- `CleanRoomAsset_Table` / `_TableLocalDetails` → `Table` / `TableLocalDetails`
- `CleanRoomAsset_View` / `_ViewLocalDetails` → `View` / `ViewLocalDetails`
- `CleanRoomAsset_VolumeLocalDetails` → `VolumeLocalDetails`
- `CleanRoomNotebookReview` → `NotebookReview`
- `CleanRoomNotebookReview_NotebookReviewState` → `NotebookReview.State`
- `CleanRoomNotebookReview_NotebookReviewSubReason` → `NotebookReview.SubReason`
- `CreateCleanRoomAssetRequest` → `CreateAssetRequest` (or just `CreateRequest`)
- `CreateCleanRoomAssetReviewRequest` / `Response` → `CreateAssetReviewRequest`
- `DeleteCleanRoomAssetRequest` / `Response` → `DeleteAssetRequest`
- `GetCleanRoomAssetRequest` → `GetAssetRequest`
- `GetCleanRoomAssetRevisionRequest` → `GetAssetRevisionRequest`
- `ListCleanRoomAssetRevisionsRequest` / `Response` → `ListAssetRevisionsRequest`
- `ListCleanRoomAssetsRequest` / `Response` → `ListAssetsRequest`
- `UpdateCleanRoomAssetRequest` → `UpdateAssetRequest`

The client methods inherit the same redundancy: `client.createCleanRoomAsset(...)`
inside `@databricks/sdk-cleanroomassets` would become `client.createAsset(...)`
— matching how `@databricks/sdk-jobs` would expose `client.createJob(...)`.

If the codegen template can't drop the prefix everywhere uniformly, the
*per-package* re-export in `index.ts` is the natural place to alias.

---

## Appendix — per-symbol notes (exhaustive checklist)

### Enums

| Symbol | File:line | Issues |
| ------ | --------- | ------ |
| `ColumnTypeName` | model.ts:5 | 20.3 (TypeName tautology), 16.1 (`TABLE_TYPE` / `TABLEREF_TYPE` contradict domain) |
| `ColumnTypeName.BOOLEAN`..`GEOGRAPHY` | model.ts:6–28 | clean |
| `ColumnTypeName.TABLE_TYPE` | model.ts:31 | 16.1 |
| `ColumnTypeName.TABLEREF_TYPE` | model.ts:32 | 16.1, also redundant `_TYPE` suffix on a value inside `ColumnTypeName` |
| `CleanRoomAsset_AssetType` | model.ts:36 | 4.1, 20.x cross-cutting `CleanRoom` |
| `CleanRoomAsset_AssetType.ASSET_TYPE_UNSPECIFIED` | model.ts:37 | 2.1, 18.3 |
| `CleanRoomAsset_AssetType.TABLE`..`FOREIGN_TABLE` | model.ts:38–42 | clean |
| `CleanRoomAsset_Status_Enum` | model.ts:46 | cross-cutting |
| `CleanRoomAsset_Status_Enum.ENUM_UNSPECIFIED` | model.ts:47 | 2.2, 18.4 |
| `CleanRoomAsset_Status_Enum.ACTIVE`/`PERMISSION_DENIED`/`PENDING` | model.ts:48–50 | clean |
| `CleanRoomNotebookReview_NotebookReviewState` | model.ts:54 | 8.1, 20.1, cross-cutting |
| `…_NotebookReviewState.NOTEBOOK_REVIEW_STATE_UNSPECIFIED` | model.ts:55 | 2.3, 18.1 |
| `…_NotebookReviewState.APPROVED`/`REJECTED`/`PENDING` | model.ts:56–58 | clean |
| `CleanRoomNotebookReview_NotebookReviewSubReason` | model.ts:62 | 8.2, 20.2, cross-cutting |
| `…_NotebookReviewSubReason.NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED` | model.ts:63 | 2.4, 18.2 |
| `…_NotebookReviewSubReason.BACKFILLED`/`AUTO_APPROVED` | model.ts:64–65 | clean |
| `PartitionSpecification_Partition_PartitionValue_PartitionValueOp` | model.ts:69 | 7.1 |
| `…_PartitionValueOp.EQUAL`/`LIKE` | model.ts:70–71 | clean |

### Interfaces

| Symbol | File:line | Issues |
| ------ | --------- | ------ |
| `CleanRoomAsset` | model.ts:75 | cross-cutting |
| `CleanRoomAsset.cleanRoomName` | model.ts:80 | cross-cutting (always present, see 12.1) |
| `CleanRoomAsset.name` | model.ts:90 | 1.3, 15.1, 19.2 |
| `CleanRoomAsset.assetType` | model.ts:92 | clean (but see 12.2) |
| `CleanRoomAsset.addedAt` | model.ts:94 | 13.1 |
| `CleanRoomAsset.status` | model.ts:96 | clean |
| `CleanRoomAsset.ownerCollaboratorAlias` | model.ts:98 | clean |
| `CleanRoomAsset.localDetails` | model.ts:100 | 1.2, 12.4 |
| `CleanRoomAsset.details` | model.ts:135 | 1.1, 1.7, 12.4 |
| `CleanRoomAsset_ForeignTable` | model.ts:172 | cross-cutting |
| `CleanRoomAsset_ForeignTable.columns` | model.ts:174 | clean |
| `CleanRoomAsset_ForeignTableLocalDetails.localName` | model.ts:183 | clean (would be `ownerLocalName` to match `localDetails` semantics) |
| `CleanRoomAsset_Notebook.notebookContent` | model.ts:192 | redundant `notebook` prefix inside `…_Notebook` — `content` suffices |
| `CleanRoomAsset_Notebook.etag` | model.ts:194 | 19.1 |
| `CleanRoomAsset_Notebook.runnerCollaboratorAliases` | model.ts:196 | clean (verbose 7.3, acceptable) |
| `CleanRoomAsset_Notebook.reviews` | model.ts:198 | clean |
| `CleanRoomAsset_Notebook.reviewState` | model.ts:200 | clean |
| `CleanRoomAsset_Notebook.description` | model.ts:202 | clean |
| `CleanRoomAsset_Notebook.environmentVersion` | model.ts:207 | clean (typed as string but holds version numerals — minor) |
| `CleanRoomAsset_Table.columns` | model.ts:216 | clean |
| `CleanRoomAsset_TableLocalDetails.localName` | model.ts:225 | clean |
| `CleanRoomAsset_TableLocalDetails.partitions` | model.ts:227 | clean |
| `CleanRoomAsset_View.columns` | model.ts:233 | clean |
| `CleanRoomAsset_ViewLocalDetails.localName` | model.ts:242 | clean |
| `CleanRoomAsset_VolumeLocalDetails.localName` | model.ts:251 | clean |
| `CleanRoomNotebookReview` | model.ts:254 | cross-cutting |
| `CleanRoomNotebookReview.reviewerCollaboratorAlias` | model.ts:256 | clean (verbose 7.4) |
| `CleanRoomNotebookReview.createdAtMillis` | model.ts:258 | 13.1 |
| `CleanRoomNotebookReview.reviewState` | model.ts:260 | clean |
| `CleanRoomNotebookReview.comment` | model.ts:262 | 15.5 |
| `CleanRoomNotebookReview.reviewSubReason` | model.ts:264 | clean |
| `ColumnInfo` | model.ts:267 | clean |
| `ColumnInfo.name` | model.ts:269 | 1.4, 15.2 |
| `ColumnInfo.typeText` | model.ts:271 | clean |
| `ColumnInfo.typeName` | model.ts:272 | 20.3 (carries from enum) |
| `ColumnInfo.position` | model.ts:274 | clean |
| `ColumnInfo.typePrecision` | model.ts:276 | clean |
| `ColumnInfo.typeScale` | model.ts:278 | clean |
| `ColumnInfo.typeIntervalType` | model.ts:280 | "typeIntervalType" is awkward — `intervalType` would suffice; the `type` prefix is misleading since `typeName` is the actual type |
| `ColumnInfo.typeJson` | model.ts:282 | clean (lowercase `Json` consistent) |
| `ColumnInfo.comment` | model.ts:284 | 15.5 |
| `ColumnInfo.nullable` | model.ts:286 | clean |
| `ColumnInfo.partitionIndex` | model.ts:288 | clean |
| `ColumnInfo.mask` | model.ts:289 | "mask" loses meaning out of context — `columnMask` is clearer (matches type name) |
| `ColumnMask` | model.ts:292 | clean |
| `ColumnMask.functionName` | model.ts:294 | clean |
| `ColumnMask.usingColumnNames` | model.ts:300 | snake-cased gerund "using" feels Pythonic; `additionalColumnNames` or `extraColumnNames` is more TS-idiomatic. Also JSDoc says this field is deprecated. |
| `ColumnMask.usingArguments` | model.ts:306 | same critique; JSDoc says it replaces `using_column_names` — naming has not been updated to reflect the new semantics |
| `CreateCleanRoomAssetRequest` | model.ts:309 | cross-cutting |
| `CreateCleanRoomAssetRequest.asset` | model.ts:310 | clean — `asset` is a fine name here (single-field request) |
| `CreateCleanRoomAssetReviewRequest` | model.ts:313 | cross-cutting |
| `…ReviewRequest.cleanRoomName` | model.ts:315 | 12.1 |
| `…ReviewRequest.name` | model.ts:317 | 1.3, 19.2 |
| `…ReviewRequest.assetType` | model.ts:319 | 6.2, 16.2 |
| `…ReviewRequest.review` | model.ts:320 | discriminated union with one variant (`notebookReview`); see 6.1 |
| `CreateCleanRoomAssetReviewResponse` | model.ts:325 | cross-cutting |
| `…ReviewResponse.notebookReviews` | model.ts:327 | clean |
| `…ReviewResponse.reviewState` | model.ts:328 | discriminated union with one variant (`notebookReviewState`); see 7.2 |
| `DeleteCleanRoomAssetRequest` | model.ts:337 | cross-cutting |
| `…DeleteRequest.cleanRoomName`/`assetType`/`name` | model.ts:339–343 | 12.x, 19.2 |
| `GetCleanRoomAssetRequest` / `…RevisionRequest` | model.ts:353, 362 | cross-cutting |
| `…Request.cleanRoomName`/`name`/`assetType`/`etag` | various | 12.x, 19.1, 19.2 |
| `ListCleanRoomAssetRevisionsRequest` | model.ts:373 | 9.x |
| `…Request.pageSize` / `.pageToken` | model.ts:381–383 | clean |
| `ListCleanRoomAssetRevisionsResponse.revisions` | model.ts:387 | 9.1 |
| `ListCleanRoomAssetRevisionsResponse.nextPageToken` | model.ts:388 | clean |
| `ListCleanRoomAssetsRequest.cleanRoomName` / `.pageToken` | model.ts:393–395 | 12.1 |
| `ListCleanRoomAssetsResponse.assets` / `.nextPageToken` | model.ts:400–405 | clean |
| `NotebookVersionReview` | model.ts:408 | name reads like a noun-from-Go (Java-style); `NotebookReviewSubmission` or `PendingReview` would feel more native. Single-use in `CreateCleanRoomAssetReviewRequest.review.notebookReview` |
| `NotebookVersionReview.etag`/`reviewState`/`comment` | model.ts:410–414 | 19.1, 15.5 |
| `PartitionSpecification_Partition.values` | model.ts:430 | clean |
| `PartitionSpecification_Partition_PartitionValue` | model.ts:434 | 4.x, 7.1 |
| `…PartitionValue.name` | model.ts:436 | 1.5, 15.3 |
| `…PartitionValue.value` | model.ts:441 | 1.6, 15.4 |
| `…PartitionValue.recipientPropertyKey` | model.ts:446 | clean (verbose 7.6) |
| `…PartitionValue.op` | model.ts:448 | 5.2, 6.3, 10.1 |
| `PolicyFunctionArgument` | model.ts:457 | name "Argument" inside `PolicyFunction*` could be `PolicyFunctionArg` to align with field name `arg` (line 458) — currently inconsistent |
| `PolicyFunctionArgument.arg` | model.ts:458 | abbreviation `arg` vs. parent `Argument`; pick one |
| `UpdateCleanRoomAssetRequest.cleanRoomName` / `.asset` | model.ts:474–479 | 12.x |

### `client.ts`

| Symbol | File:line | Issues |
| ------ | --------- | ------ |
| `PACKAGE_SEGMENT` | client.ts:46 | clean |
| `class Client` | client.ts:51 | "Client" is generic but matches sibling packages — acceptable per the per-package re-export convention |
| `Client.host` / `httpClient` / `logger` / `userAgent` | client.ts:52–58 | clean |
| `constructor(options: ClientOptions)` | client.ts:60 | clean |
| `createCleanRoomAsset` | client.ts:83 | cross-cutting redundancy (`createAsset` would suffice in `cleanroomassets`) |
| `createCleanRoomAssetReview` | client.ts:109 | 6.1, 17.1 |
| `deleteCleanRoomAsset` | client.ts:141 | cross-cutting |
| `getCleanRoomAsset` | client.ts:169 | cross-cutting |
| `getCleanRoomAssetRevision` | client.ts:194 | cross-cutting |
| `listCleanRoomAssetRevisions` | client.ts:219 | 9.2, cross-cutting |
| `listCleanRoomAssets` | client.ts:273 | cross-cutting |
| `updateCleanRoomAsset` | client.ts:327 | cross-cutting |
| local helpers `call`, `httpReq`, `respBody`, `resp`, `url`, `fullUrl`, `params`, `query`, `headers`, `pageReq`, `item` | client.ts (various) | clean (short-scoped) |

### `index.ts`

Re-exports only. All concerns flow from `model.ts` / `client.ts`.

---

## Top-priority recommendations (in order)

1. **Decide on cleanroom-prefix policy across all four packages.** Either
   strip `CleanRoom` from type names entirely (per-package re-export aliases),
   or keep it in the canonical `model.ts` and provide unprefixed aliases in
   `index.ts`. Pick one. (Cross-cutting redundancy is the single biggest
   source of name length.)
2. **Collapse proto-nested types under namespaces or rename without
   underscores.** All 17 `_`-bearing identifiers should follow the same
   convention as the rest of `@databricks/sdk-databricks`.
3. **Reconcile the `revisions: CleanRoomAsset[]` mismatch on
   `ListCleanRoomAssetRevisionsResponse`.** Either rename to `assets` or
   introduce a distinct revision type.
4. **Fix the `JAR_ANALYSIS` / `assetType` JSDoc discrepancy.** Either the
   enum is missing a value or the doc is stale.
5. **Strip the `_UNSPECIFIED` boilerplate prefixes** (`NOTEBOOK_REVIEW_STATE_…`
   etc.) — six enum literals become two-word strings.
6. **Rename `op` → `operator` and `etag` → `revisionEtag`** in user-facing
   request types.
