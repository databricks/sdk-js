# Naming Audit: `materializedfeatures` (v1)

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `/home/parth.bansal/sdk-js/packages/materializedfeatures/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`
**Cross-package references:** `features/v1` (`Feature`, `MaterializedFeature`,
`MaterializedFeature_PipelineScheduleState`, `LineageContext`, `CreateFeatureRequest`,
etc.), `featurestore/v1` (`OnlineStore`, `PublishSpec`, online-store concepts),
`entitytagassignments/v1`, `tagassignments/v1`, `tagpolicies/v1` (other "tag"
domains in the SDK).
**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Inventory

### Enums

(None — package has no enum types.)

### Interfaces / Types

1. `CreateFeatureTagRequest` (model.ts:8) — fields: `tableName`, `featureName`,
   `featureTag`.
2. `DeleteFeatureTagRequest` (model.ts:15) — fields: `tableName`, `featureName`,
   `key`.
3. `FeatureLineage` (model.ts:24) — fields: `models`, `featureSpecs`,
   `onlineFeatures`.
4. `FeatureLineage_FeatureSpec` (model.ts:34) — fields: `name`.
5. `FeatureLineage_Model` (model.ts:40) — fields: `name`, `version`.
6. `FeatureLineage_OnlineFeature` (model.ts:48) — fields: `featureName`,
   `tableName`.
7. `FeatureTag` (model.ts:56) — fields: `key`, `value`.
8. `GetFeatureLineageRequest` (model.ts:61) — fields: `featureName`, `tableName`.
9. `GetFeatureTagRequest` (model.ts:69) — fields: `tableName`, `featureName`,
   `key`.
10. `ListFeatureTagsRequest` (model.ts:76) — fields: `tableName`, `featureName`,
    `pageToken`, `pageSize`.
11. `ListFeatureTagsResponse` (model.ts:86) — fields: `featureTags`,
    `nextPageToken`.
12. `UpdateFeatureTagRequest` (model.ts:93) — fields: `tableName`, `featureName`,
    `featureTag`, `updateMask`.

### Zod schemas

- `unmarshalFeatureLineageSchema` (model.ts:101)
- `unmarshalFeatureLineage_FeatureSpecSchema` (model.ts:120)
- `unmarshalFeatureLineage_ModelSchema` (model.ts:130)
- `unmarshalFeatureLineage_OnlineFeatureSchema` (model.ts:142)
- `unmarshalFeatureTagSchema` (model.ts:153)
- `unmarshalListFeatureTagsResponseSchema` (model.ts:163)
- `marshalFeatureTagSchema` (model.ts:174)

### Field-mask helpers

- `featureTagFieldMaskSchema` (model.ts:184, module-internal)
- `featureTagFieldMask()` (model.ts:189, public)

### Client class

- `Client` (client.ts:44)
  - Methods: `createFeatureTag`, `deleteFeatureTag`, `getFeatureLineage`,
    `getFeatureTag`, `listFeatureTags`, `listFeatureTagsIter`,
    `updateFeatureTag`.
  - Private fields: `host`, `httpClient`, `logger`, `userAgent`.
  - Module constant: `PACKAGE_SEGMENT`.

### Utils (`src/v1/utils.ts`)

- Type: `HttpCallOptions`.
- Functions: `executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`.

### `index.ts`

Re-exports `Client`, every public interface (12 of them, including the four
`FeatureLineage_*` proto-style nested names).

---

## Findings

### 1. Package name `materializedfeatures` does not match its contents — category 6 (Misleading names) and category 1 (Vague/generic)

**Symbol:** Package name `@databricks/sdk-materializedfeatures` and directory
`packages/materializedfeatures/`.

**Issue:** The package is called *materialized features* but exports **zero**
types or operations related to materialized features. Its entire surface is:

- `FeatureTag` CRUD on regular feature-table columns.
- `FeatureLineage` read of regular feature-table columns.

The actual `MaterializedFeature` type, `BatchCreateMaterializedFeaturesRequest`,
`CreateMaterializedFeatureRequest`, `DeleteMaterializedFeatureRequest`,
`GetMaterializedFeatureRequest`, `ListMaterializedFeaturesRequest`,
`UpdateMaterializedFeatureRequest`, and `MaterializedFeature_PipelineScheduleState`
all live in the **`features` package** (`packages/features/src/v1/model.ts`
lines 47, 146, 151, 197, 233, 390, 500, 509, 517, 800). The URL paths in this
package's `client.ts` confirm the mismatch: every endpoint targets
`/api/2.0/feature-store/feature-tables/{tableName}/features/{featureName}/...`
— i.e. the *feature table* domain, not "materialized features."

The package was presumably named after the upstream Go SDK service / proto
package, which itself appears mis-scoped. A TS consumer reading the import path

```ts
import {FeatureTag} from '@databricks/sdk-materializedfeatures/v1';
```

would reasonably expect a type *about materialized features*, not a tag on a
feature-table column. Symmetrically, `features/v1` contains the actual
materialized-feature types.

**Suggested:** rename the package — based on what it actually contains:

- `@databricks/sdk-featuretags` (covers `FeatureTag` and `FeatureLineage`)
- Or merge into `@databricks/sdk-features` (since both deal with the same
  underlying `/feature-tables/{tableName}/features/{featureName}/` URL space).

This is a wire-and-generator-level concern. **Flag SDK-wide / upstream Go.**
**P1 cross-package alignment.**

---

### 2. `FeatureLineage_FeatureSpec` is a reference, not a spec — category 12 (Duplicate concepts)

**Symbol:** `FeatureLineage_FeatureSpec` (model.ts:34); compare
`featurestore.PublishSpec` and `onlinetables.OnlineTableSpec`.

**Issue:** Three different SDK packages export a `*Spec` type. In this package,
`FeatureLineage_FeatureSpec` is a *reference* (only field is `name`: "The full
name of the feature spec in Unity Catalog") — not a configuration object. In
`featurestore`, `PublishSpec` is a *configuration object* (multiple fields
describing how publishing should occur). The "Spec" suffix conflates two
different roles:

- Reference / pointer: `FeatureLineage_FeatureSpec` (this package — single
  `name` field).
- Configuration shape: `PublishSpec`, `OnlineTableSpec`.

A TS reader importing both packages cannot tell from the type name which is
which.

**Suggested:** clarify that the nested type is a reference (e.g. via JSDoc).
The `FeatureSpec` concept itself (an actual feature-spec configuration) lives
elsewhere in Databricks APIs; this is just a pointer to one. **Flag for
SDK-wide cleanup.**

---

### 3. `FeatureLineage_Model` semantic conflict with `modelregistry`, `modelservingmanagement` — category 6 (Misleading names) and category 12 (Duplicate concepts)

**Symbol:** `FeatureLineage_Model` (model.ts:40); doc: "List of Unity Catalog
models that were trained on this feature."

**Issue:** "Model" is one of the most overloaded names in the SDK. The
`modelregistry`, `modelservingmanagement`, and `modelservingquery` packages
all have their own `Model`-shaped types. This local `Model` is yet another:
it is specifically a *reference* (Unity Catalog name + version) to a registered
model — not the model itself.

The type has two fields:

```ts
{
  name?: string | undefined;  // The full name of the model in Unity Catalog.
  version?: number | undefined;  // The version of the model.
}
```

Naming-wise this is a *model reference*, not a model.

**Suggested:** strengthen JSDoc to indicate this is a reference (the type
name itself follows the proto-nesting convention and is intentional). This
avoids importing `FeatureLineage_Model` next to `modelregistry.Model` and
confusing the two shapes.

---

### 4. `FeatureLineage_OnlineFeature` is a reference, not a feature — category 6 (Misleading names)

**Symbol:** `FeatureLineage_OnlineFeature` (model.ts:48); doc on the type-level
JSDoc on the parent says "List of online features that use this feature as
source."

**Issue:** The type has two fields:

```ts
{
  featureName?: string | undefined;  // The name of the online feature (column name).
  tableName?: string | undefined;    // The full name of the online table in Unity Catalog.
}
```

This is *not* an online feature — it is a `(tableName, featureName)` pair
identifying one. Additionally, the doc-string contradiction: outer JSDoc says
"online features that use this feature as source," but the inner field doc
says "online feature (column name)." The type is a coordinate, not the
feature itself.

**Suggested:** strengthen JSDoc to indicate this is a reference. Update the
inner field doc to match the outer JSDoc's intent.

---

### 5. `FeatureLineage_OnlineFeature.tableName` is the *online table name*, generic-named — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `FeatureLineage_OnlineFeature.tableName` (model.ts:52).

**Issue:** The JSDoc says "The full name of the online table in Unity Catalog."
The field name `tableName` does not specify *online* table — yet the type is
called `FeatureLineage_OnlineFeature` and the field carries an online-table
3-part name (per `featurestore.PublishTableResponse.onlineTableName` and
`onlinetables.OnlineTable.name`).

Within the same package, `CreateFeatureTagRequest.tableName` (model.ts:9) is
the *source* feature table — a *different* kind of table. Two fields with the
identical name `tableName` carry semantically different values across types
in the same package.

**Suggested:** `onlineTableName` to match `featurestore.PublishTableResponse.onlineTableName`
and the field's actual content. This is the single most concrete naming bug
in the file. **P1 fix candidate.**

---

### 6. `FeatureTag` is too generic — category 1 (Vague/generic) and category 12 (Duplicate concepts)

**Symbol:** `FeatureTag` (model.ts:56). JSDoc: "Represents a tag on a feature
in a feature table."

**Issue:** "Tag" appears in at least four sibling SDK packages, each with
its own type:

- `entitytagassignments/v1` — `EntityTagAssignment`.
- `tagassignments/v1` — `TagAssignment`.
- `tagpolicies/v1` — `TagPolicy`.
- `materializedfeatures/v1` — `FeatureTag`.

Each "tag" has its own `{key, value}` shape. A TS reader cannot easily tell
that `FeatureTag` is just a `{key, value}` string-string pair (same shape as
the others, but a distinct type) because the SDK has chosen to keep them
separate.

The type itself is a perfectly fine 2-field record. The problem is the *name*
plus the *duplicated shape* across packages:

```ts
export interface FeatureTag {
  key?: string | undefined;
  value?: string | undefined;
}
```

**Suggested:** keep the name (it correctly identifies the tag's owner), but
**flag SDK-wide:** unify the shape (one `Tag` interface) or unify the type
name to `FeatureTag` and put it adjacent to `Feature` in `features/v1`. The
present split between this package and `features/v1` (where `Feature` lives)
duplicates the conceptual boundary.

---

### 7. `FeatureTag.key` and `value` underspecified — category 19 (Underspecified IDs) and category 1 (Vague/generic)

**Symbols:** `FeatureTag.key`, `FeatureTag.value` (model.ts:57–58).

**Issue:** Neither field has JSDoc, neither field documents allowed character
sets, length limits, or whether `key` is a free-form string or constrained to
a grammar. `DeleteFeatureTagRequest.key` (model.ts:21) has minimal JSDoc ("The
key of the tag to delete.") but does not link to the grammar. Compare to
`OnlineStore.name` in `featurestore` which at least documents "unique
identifier" — also weak.

**Suggested:** strengthen JSDoc to specify max length, valid character set,
case sensitivity. The naming itself (`key`/`value`) is the project-wide
convention for tag pairs — pass on name, fix the docs.

---

### 8. `CreateFeatureTagRequest`, `GetFeatureTagRequest`, `ListFeatureTagsRequest`, `UpdateFeatureTagRequest` carry `tableName` and `featureName` undocumented in some — category 6 (Misleading names) and JSDoc drift

**Symbols:** `CreateFeatureTagRequest.tableName` (model.ts:9),
`GetFeatureTagRequest.tableName` (model.ts:70),
`ListFeatureTagsRequest.tableName` (model.ts:77),
`UpdateFeatureTagRequest.tableName` (model.ts:94) and the parallel
`featureName` fields.

**Issue:** Of seven types that carry `tableName` / `featureName`:

- `DeleteFeatureTagRequest` has JSDoc: "The name of the feature table.", "The
  name of the feature within the feature table." (model.ts:16–19).
- `GetFeatureLineageRequest` has JSDoc: "The name of the feature.", "The full
  name of the feature table in Unity Catalog." (model.ts:62–65).
- `CreateFeatureTagRequest`, `GetFeatureTagRequest`, `ListFeatureTagsRequest`,
  `UpdateFeatureTagRequest` have **no JSDoc** at all on those fields (model.ts:9,
  70, 77, 94).

Within the same package, the *same field* (`tableName`) is documented as both
"The name of the feature table" (delete) and "The full name of the feature
table in Unity Catalog" (lineage get). These are different specificities. The
former does not say whether it is a UC three-part name; the latter does.

**Suggested:** uniformly document `tableName` as "The full three-part (catalog,
schema, table) name of the feature table in Unity Catalog." and `featureName`
as "The name of the feature (column) within the feature table." Add JSDoc to
the four types currently missing it. **Pass on naming, flag JSDoc drift.**

---

### 9. `ListFeatureTagsResponse` not `ListFeatureTagResponse` — category 9 (Singular/plural mismatch) and JSDoc drift

**Symbol:** `ListFeatureTagsResponse` (model.ts:86). JSDoc reads "Response
message for ListFeatureTag." (singular!) while the type is plural.

**Issue:** The JSDoc text uses the singular form ("ListFeatureTag") but the
type, the method, the request, and the response collection are all plural
(`ListFeatureTagsRequest`, `Client.listFeatureTags`, `featureTags: FeatureTag[]`).
Pass on naming, **fix the JSDoc** ("Response message for ListFeatureTags.").

---

### 10. `UpdateFeatureTagRequest.featureTag.key` is also the path key — category 16 (Field contradicting type domain) and category 19 (Underspecified IDs)

**Symbol:** `UpdateFeatureTagRequest.featureTag` (model.ts:96) +
`client.updateFeatureTag` URL builder (client.ts:220).

**Issue:** The URL template uses `req.featureTag?.key`:

```ts
const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.featureTag?.key ?? ''}`;
```

So the *body's* `featureTag.key` *also* identifies the resource. A user who
tries to rename a tag (e.g. change `key` from `env` to `environment`) will
PATCH `/tags/environment` — creating a new tag instead of renaming. The
request shape implicitly forbids changing `key`, but neither the type nor the
JSDoc says so.

This contrasts with `DeleteFeatureTagRequest` (model.ts:21) which has an
explicit top-level `key`. The split — `key` is a top-level field for delete,
but nested under `featureTag.key` for update — is internally inconsistent.

**Suggested:** add a top-level `key` field to `UpdateFeatureTagRequest`
(matching delete/get) and either:

- Document that `featureTag.key` must equal `key`.
- Or remove `key` from the inner `featureTag` payload entirely (it is
  redundant with the URL).

The naming is fine; the structural choice is misleading. **Flag for upstream.**

---

### 11. `GetFeatureLineageRequest` has fields ordered `featureName, tableName` — category 10 (Reserved-word collisions, by association) and JSDoc drift

**Symbol:** `GetFeatureLineageRequest` (model.ts:61).

**Issue:** Every other request type orders fields as `tableName, featureName`
(matching the URL: `/feature-tables/{tableName}/features/{featureName}/...`).
`GetFeatureLineageRequest` reverses to `featureName, tableName`. The URL still
goes through tables→features ordering (client.ts:119). This is internally
inconsistent.

**Suggested:** swap field order to `tableName, featureName` for consistency.
This is a cosmetic but reader-facing inconsistency.

---

### 12. `Client.getFeatureLineage` JSDoc reads "Get Feature Lineage." with title case — JSDoc drift and category 17 (Inconsistent action verbs)

**Symbol:** `Client.getFeatureLineage` (client.ts:115).

**Issue:** The JSDoc reads `/** Get Feature Lineage. */` in title case;
elsewhere in the same file:

- `createFeatureTag` (client.ts:69): "Creates a FeatureTag." — sentence case
  with proper noun.
- `deleteFeatureTag` (client.ts:95): "Deletes a FeatureTag." — same.
- `getFeatureTag` (client.ts:139): "Gets a FeatureTag." — same.
- `listFeatureTags` (client.ts:164): "Lists FeatureTags." — same.
- `updateFeatureTag` (client.ts:215): "Updates a FeatureTag." — same.
- `getFeatureLineage` (client.ts:114): "Get Feature Lineage." — **different
  pattern** (title case, no plural verb, space between words).

This is verb-tense / casing inconsistency within the same file. **Pass on
name, fix JSDoc** to read "Gets a FeatureLineage." or "Gets feature lineage."

---

### 13. Method-name verbs `creates`/`deletes`/`gets`/`lists`/`updates` are consistent — category 17 (Inconsistent action verbs) — *pass*

**Symbols:** `createFeatureTag`, `deleteFeatureTag`, `getFeatureLineage`,
`getFeatureTag`, `listFeatureTags`, `updateFeatureTag` (client.ts).

The verb-prefix forms a clean CRUD-style vocabulary. No `fetch…`, `retrieve…`,
or `remove…` mixed in. **Pass.**

---

### 14. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. Every TS package exports a single `Client` class scoped to
its import path (e.g. `@databricks/sdk-materializedfeatures/v1`). **Pass.**

---

### 15. `PACKAGE_SEGMENT` constant — category 4 (Underscores in TS identifiers)

**Symbol:** `PACKAGE_SEGMENT` (client.ts:39).

**Issue:** Google TS Style Guide § 5.1 reserves `UPPER_SNAKE_CASE` for true
constants (primitive literal values like `MAX_LEN = 10`). `PACKAGE_SEGMENT` is
a runtime object literal (`{ key, value }`) constructed from a JSON import.
Value is constant per-process, but the identifier shape violates the project
rule. Used in every package's `client.ts` — a project-wide convention. **Flag
for SDK-wide cleanup, do not fix in isolation.**

**Suggested:** `packageSegment` or `clientPackageSegment`.

---

### 16. `userAgent` / `httpClient` / `host` / `logger` — *pass*

Standard private field names. Acronym handling matches the project rule.
**Pass.**

---

### 17. `readAll` — *pass*

Helper does what its name says (reads a `ReadableStream<Uint8Array>` to
completion). Conventional in the Node `stream/promises` ecosystem. **Pass.**

---

### 18. `buildHttpRequest` — category 17 (Inconsistent action verbs) — *pass*

Verb-prefix matches the function's role (constructs an `HttpRequest` object).
Naming is fine. The file mixes `build…`, `execute…`, `marshal…`, `parse…`,
`readAll`, `flatten…` — six verbs for seven functions, but each is correct
for its purpose. **Pass.**

---

### 19. `featureTagFieldMaskSchema` private but exported via `featureTagFieldMask()` — *pass*

**Symbols:** `featureTagFieldMaskSchema` (model.ts:184, internal) and
`featureTagFieldMask()` (model.ts:189, public). Clean separation: schema is
private, helper is exported, helper name matches the Google AIP-134
update-mask vocabulary. **Pass.**

---

### 20. `UpdateFeatureTagRequest.updateMask` — category 7 (Overly verbose) — *pass*

**Symbol:** `UpdateFeatureTagRequest.updateMask: FieldMask<FeatureTag>`
(model.ts:98).

`updateMask` is the canonical Google AIP-134 name for partial-update masks;
the type `FieldMask<FeatureTag>` is from `@databricks/sdk-core/wkt`. The
naming is SDK-wide and idiomatic. **Pass.**

---

### 21. Singular `FeatureTag` ⇔ plural `featureTags` — category 9 (Singular/plural mismatch) — *pass*

`ListFeatureTagsResponse.featureTags: FeatureTag[]` (model.ts:87) is the
canonical pattern. **Pass.**

---

### 22. `FeatureLineage.models` field name does not describe content — category 6 (Misleading names) and category 15 (Generic field names losing meaning)

**Symbol:** `FeatureLineage.models?: FeatureLineage_Model[]` (model.ts:26).

**Issue:** The field is called `models` but contains `FeatureLineage_Model[]`
— each of which is a *reference* to a registered model (name + version), not
the model itself. A reader who sees `lineage.models` reasonably expects
model objects (with fields like `creator`, `description`, etc.). They actually
get bare `{name, version}` pairs.

**Suggested:** rename to `modelRefs`, `trainedModels`, or `modelReferences`.
Signals that these are references rather than full model records.

---

### 23. `FeatureLineage.featureSpecs` vs `FeatureLineage.onlineFeatures` plural-singular mismatch — category 9 (Singular/plural mismatch) — *partial pass*

**Symbols:** `FeatureLineage.featureSpecs`, `FeatureLineage.onlineFeatures`
(model.ts:28, 30).

Both are arrays — plural form is consistent. No issue. **Pass.**

---

### 24. `LineageContext` from `features` package vs `FeatureLineage` from this package — category 12 (Duplicate concepts)

**Symbol:** `FeatureLineage` (model.ts:24); compare
`features.LineageContext` (`packages/features/src/v1/model.ts:465`).

**Issue:** Two "lineage"-flavoured types live in two packages:

- `features.LineageContext`: "Lineage context information for tracking where
  an API was invoked. This will allow us to track lineage…"
- `materializedfeatures.FeatureLineage`: per JSDoc-less type, contains models
  trained on a feature, feature specs containing the feature, and online
  features using the feature as source.

These are *distinct* concepts ("where this API call came from" vs. "what is
downstream of this feature"). The package split is poor — both concepts
ought to live with `Feature` in one place. A reader importing both packages
sees two different "lineage" shapes and must reason about which is which.

**Suggested cross-package:** rename `materializedfeatures.FeatureLineage` →
`FeatureUsage` or `FeatureDependents` (it lists *what uses* the feature). The
"lineage" word is being used in two different senses: provenance (Context)
vs. dependents (Lineage). **Flag for upstream Go SDK / generator.**

---

### 25. `GetFeatureLineageRequest` is `GetFeature…`, returns `FeatureLineage` — *pass*

**Symbol:** `Client.getFeatureLineage` (client.ts:115), return type
`FeatureLineage` (model.ts:24).

The method name uses verb `get` consistently; the return type name is the
resource. No issue at the method-name layer. (Underlying naming smells of
`FeatureLineage` itself are covered in findings 22, 24.) **Pass.**

---

### 26. `BatchCreateMaterializedFeatures*` types live in `features` not this package — category 12 (Duplicate concepts) — cross-package

**Symbols (cross-package):** `BatchCreateMaterializedFeaturesRequest`,
`BatchCreateMaterializedFeaturesResponse` live in `features/v1/model.ts:146,
151`. This `materializedfeatures` package has *no* materialized-feature types.

**Issue:** Compound finding 1. The naming bug is that this package's *name*
implies it owns materialized features, while the actual types live in
`features`. If the rename in finding 1 is rejected, the alternative is to
*move* the materialized-feature types here. **Flag for SDK-wide upstream
coordination.**

---

### 27. `index.ts:5` empty re-export — *pass with note*

**Symbol:** `export {} from './model';` (index.ts:5).

This is a generator-emitted no-op (re-export *nothing* from the module). It is
not a naming finding, but it is a code-smell artefact of the generator. **Pass
on naming**, flag for generator cleanup.

---

### 28. URL path constants spread inline in `Client` methods — code-quality (out of scope) — *pass*

**Symbols:** every method constructs a URL via template literal embedding
`req.tableName ?? ''` and `req.featureName ?? ''` (client.ts:74, 100, 119,
144, 169, 220).

Naming is fine (no constants to flag); the duplication is a code-quality
concern, not naming. **Pass.**

---

### 29. `req`/`resp`/`pageReq` Go-style short variable names — category 14 (Go/Java-style names)

**Symbols:** local variables `req` (every method parameter), `resp` (every
method local), `pageReq` (client.ts:202).

**Issue:** TS ecosystem typically prefers full words: `request`, `response`,
`pageRequest`. Compare with Node/Express conventions. The shortened forms are
Go-style. However, `req`/`res` is also common in TS Express/Node code, so the
convention is mixed. **Pass with note — flag for SDK-wide style decision.**

---

### 30. Generator-comment "DO NOT EDIT." header — *pass*

Every file begins with `// Code generated from API definition by Databricks
SDK Generator. DO NOT EDIT.` Naming-irrelevant, but informs the scope of any
suggested fix (all naming changes must be implemented at the generator,
not in the file). **Pass.**

---

## Cross-package notes (per audit instructions)

### Package-name mis-scope (`materializedfeatures` ↔ `features`)

The most serious finding in this audit. The package called `materializedfeatures`
contains *zero* materialized-feature types; the package called `features`
contains the materialized-feature types (`MaterializedFeature`,
`BatchCreateMaterializedFeaturesRequest`, etc., per `features/v1/model.ts:47,
146, 197, 517`). A reasonable fix:

- Rename the package directory and `package.json` `name` field to
  `@databricks/sdk-featuretags`.
- Or rename to `@databricks/sdk-featuretagsandlineage` (verbose) or move the
  contents into `@databricks/sdk-features`.

The `materializedfeatures` directory exists in `packages/` (per the directory
listing) and the matching markdown doc `materializedfeatures.md` is also
present at `packages/materializedfeatures.md`. Both would need to move.

**P1 cross-package alignment.**

---

### `tableName` overload across packages

`materializedfeatures.{Create,Delete,Get,List,Update}FeatureTagRequest.tableName`
is the source feature-table name. `featurestore.PublishTableRequest.sourceTableName`
is also a source table name. `FeatureLineage_OnlineFeature.tableName` is an
*online* table name. `featurestore.DeleteOnlineTableRequest.onlineTableName`
is also an online table name. Four kinds of `tableName` across two packages,
each disambiguated by neighbouring fields and JSDoc — but not by the name
itself.

**Recommendation:** standardise:

- Source feature-table name: `featureTableName` (more specific than just
  `tableName`).
- Online table name: `onlineTableName` (already in use in `featurestore`).

The package-local `tableName` (used here) is fine *inside* the request types
because the URL grammar disambiguates, but `FeatureLineage_OnlineFeature.tableName`
should definitely be `onlineTableName` (finding 5).

**Flag for SDK-wide policy.**

---

### `Tag` concept overlap across packages

| Package                   | Type name              | Shape       | Use                         |
|---------------------------|------------------------|-------------|-----------------------------|
| `materializedfeatures`    | `FeatureTag`           | `{key,value}` | Tag on a feature column.   |
| `entitytagassignments`    | `EntityTagAssignment`  | (TBD)        | Tag-to-entity assignment.   |
| `tagassignments`          | `TagAssignment`        | (TBD)        | Tag-to-resource assignment. |
| `tagpolicies`             | `TagPolicy`            | (TBD)        | Tag policy rules.           |

Four distinct "tag" types in four packages. Each likely justified by its
ownership and lifecycle (a `FeatureTag` is owned by a feature; a
`TagAssignment` connects a tag to a resource; a `TagPolicy` defines tag
governance). But naming-wise the boundary is murky: a reader of
`@databricks/sdk-materializedfeatures/v1` sees `FeatureTag` and may not
realise `TagAssignment` exists separately.

**Cross-SDK recommendation:** document the relationship in package JSDoc
(`index.ts` should reference the related "tag" packages). **Flag for upstream
Go SDK / docs.**

---

### `FeatureLineage` vs `LineageContext` vs `externallineage`

Three lineage-related types/packages exist:

- `materializedfeatures.FeatureLineage` — downstream dependents of a feature.
- `features.LineageContext` — provenance/context for an API call.
- `externallineage` (entire package) — lineage outside Databricks.

"Lineage" is being used in three different senses. **Flag for upstream
documentation / generator naming**; the SDK exposes consumers to three
distinct lineage concepts with no naming convention to distinguish them.

---

### Field-naming hygiene relative to `features.Feature`

`features.Feature` (model.ts:279) has its own `lineageContext` field
(model.ts:310), not the `FeatureLineage` defined here. The two "feature
lineage" concepts coexist:

- `features.Feature.lineageContext: LineageContext` — internal SDK use, set
  by the SDK, not the user (per JSDoc: "Users should not manually set this
  field…").
- `materializedfeatures.FeatureLineage` — user-facing read-only object
  describing what depends on a feature.

The two are unrelated, but the words overlap. **Flag for SDK-wide naming
guidance.**

---

## Summary (counts)

- **Critical / cross-package consistency:** 2 findings (#1 package name
  mis-scope `materializedfeatures` does not contain materialized features;
  #5 `FeatureLineage_OnlineFeature.tableName` should be `onlineTableName`).
- **High (style guide violations):** 1 finding (#15 `PACKAGE_SEGMENT`
  casing).
- **Medium (naming clarity, JSDoc drift):** 11 findings (#2, #3, #4, #6,
  #7, #8, #9, #10, #11, #12, #22, #24).
- **Low / project-wide convention notes (generator-level):** 2 findings (#26,
  #29).
- **Pass / acceptable as-is:** 11 findings (#13, #14, #16, #17, #18, #19,
  #20, #21, #23, #25, #27, #28, #30 — many partial passes with notes).

**Total flagged findings: 30** distinct items. The dominant themes are
**package mis-naming** (the package does not contain what its name advertises)
and **cross-package mis-allocation** (materialized-feature types live in the
`features` package, not here). Many issues are generator-emitted boilerplate
inherited from the Go SDK; the cleanest local fixes are findings 1 (package
rename), 5 (`onlineTableName` field), 8 (JSDoc on `tableName`/`featureName`),
9 (JSDoc plural form), 10 (top-level `key` for update), 11 (field order in
`GetFeatureLineageRequest`), and 12 (`getFeatureLineage` JSDoc casing).
