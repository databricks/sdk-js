# Naming Audit: features

**Path:** `packages/features/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-features` — collides semantically with two
sibling packages (`@databricks/sdk-featurestore` and
`@databricks/sdk-materializedfeatures`), all three of which are part of the
Feature Engineering surface. The bare word "feature" is also overloaded with
the unrelated common-English sense ("product feature" / "preview feature")
that appears throughout the SDK in flags, settings, and previews.
**Inferred domain:** Databricks Feature Engineering — defines **Feature**
(the abstract definition: source + transformation + aggregation), Kafka
streaming config, and **MaterializedFeature** (a concrete pipeline that
computes a feature on a schedule and writes results to an offline or online
store). Feature transformations are a discriminated union over 13 aggregation
functions and 3 data sources (Delta, Kafka, request-time), composed under
three flavors of time window (continuous, tumbling, sliding).
**Total weird names flagged:** 51

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `features` / module `@databricks/sdk-features` | (package) | package | High | 1 Vague/generic, 12 Duplicate concepts | The bare term "features" is ambiguous: (a) ML features (this package), (b) Databricks product features / feature flags (settings/previews), (c) "features" of a billing plan (billing). A reader cannot disambiguate from the import path. Rename to `@databricks/sdk-feature-engineering`, `@databricks/sdk-ml-features`, or `@databricks/sdk-feature-definitions`. |
| 2 | three sibling packages: `features` / `featurestore` / `materializedfeatures` | (across packages) | package set | High | 12 Duplicate concepts | The Feature Engineering surface is split across three top-level packages whose names overlap at the prefix. Boundaries: `features` defines feature *definitions* (this package); `materializedfeatures` is **misnamed** — it actually owns feature **lineage and tags** (`FeatureLineage`, `FeatureTag`), not materialized features (which live here); `featurestore` owns **online stores**. The names do not align with their contents. Either rename `materializedfeatures` to `featuremetadata` / `featurelineage`, or move `MaterializedFeature` and its client methods out of this package into the (misnamed) `materializedfeatures` package. |
| 3 | `Feature` interface | model.ts:280 | interface | High | 1 Vague/generic | The unqualified noun `Feature` is the single most overloaded word in Databricks vocabulary. As a TS-imported type, `import {Feature}` from `@databricks/sdk-features/v1` collides conceptually with: (a) feature flags, (b) preview features, (c) workspace "feature settings". Rename to `FeatureDefinition`, `MLFeature`, or `FeatureEngineeringFeature` to scope the noun. |
| 4 | `Client` | client.ts:65 | class | Medium | 1 Vague/generic, 12 Duplicate concepts | Unqualified `Client` — once imported it shadows every other package's `Client`. `FeaturesClient` or `FeatureEngineeringClient` would self-identify and disambiguate from `featurestore.Client` and `materializedfeatures.Client`. |
| 5 | `Client.*Feature*` plus `Client.*KafkaConfig*` plus `Client.*MaterializedFeature*` (3 resource families on one client) | client.ts:91-635 | method set | Medium | 12 Duplicate concepts | One `Client` class owns three distinct resource families: `Feature`, `KafkaConfig`, and `MaterializedFeature`. The class is 636 lines and reads as three sub-clients merged. A `FeaturesClient` (feature defs only) + `KafkaConfigsClient` + `MaterializedFeaturesClient` split would let each Client be ≤ 250 lines and would clarify the URL groupings (`/api/2.0/feature-engineering/features`, `/.../kafka-configs`, `/.../materialized-features`). |
| 6 | `Function_FunctionType` (whole enum) — *deprecated per JSDoc* | model.ts:27-44 | enum | High | 12 Duplicate concepts | JSDoc says "Deprecated: Use the function-specific messages in AggregationFunction.function_type oneof instead." So this enum *and* the 13 sibling `*Function` interfaces (`AvgFunction`, `CountFunction`, etc.) coexist as parallel ways to express the same thing. Mark `@deprecated` in TS-side JSDoc; currently the import re-exports it without warning (index.ts:7). |
| 7 | 13 `*Function` interfaces (`AvgFunction`, `CountFunction`, `SumFunction`, `MinFunction`, `MaxFunction`, `FirstFunction`, `LastFunction`, `ApproxCountDistinctFunction`, `ApproxPercentileFunction`, `StddevPopFunction`, `StddevSampFunction`, `VarPopFunction`, `VarSampFunction`) | model.ts:117, 179, 758, 572, 566, 344, 467, 84, 92, 716, 727, 819, 825 | interface set | High | 8 Redundant suffixes, 12 Duplicate concepts, 20 Type-suffix tautology | 13 interfaces named `<Name>Function` where only `<Name>` would suffice. The `AggregationFunction.operation` discriminated union groups them with `$case` values that already encode "this is the average operation" — `avg` (not `avgFunction`). The `Function` suffix on the type name is redundant. Worse: 11 of 13 of these interfaces are **identical** — `{input?: string \| undefined}`. They could be one shared `SingleColumnFunction` type or a parametric alias. The two that differ are `ApproxCountDistinctFunction` (adds `relativeSd`) and `ApproxPercentileFunction` (adds `percentile`, `accuracy`). |
| 8 | `AggregationFunction.operation` discriminator field | model.ts:61 | field | Medium | 1 Vague/generic, 15 Generic field names | The outer interface is `AggregationFunction`; the field holding the function variant is named `operation`. So `aggFn.operation.$case === 'avg'` reads okay, but in JSDoc comments and call sites the relationship is unclear: "operation" is a generic word; the value is *the function itself*. Could be `function` (matching the parent type's role in `Function.aggregationFunction.operation`) or `kind`. |
| 9 | `TimeWindow.windowType` field | model.ts:769 | field | Low | (none) | Not stuttery; the union variants are `continuous`/`tumbling`/`sliding` so `windowType` is a reasonable discriminator label. (Listing for completeness.) |
| 10 | `MaterializedFeature.destination` field | model.ts:538 | field | Medium | 1 Vague/generic, 15 Generic field names | Carries `offlineStoreConfig` or `onlineStoreConfig`. "Destination" is okay but ambiguous (could be a table name, a URL, a cluster). `store` or `target` would be more domain-specific; `storageDestination` would also work. |
| 11 | `Feature.source` vs `Feature.entities` vs `Feature.timeseriesColumn` (singular column vs plural columns) | model.ts:288, 317, 319 | field set | Low | 9 Singular/plural mismatches | `entities: EntityColumn[]` (plural, list of columns acting as keys) and `timeseriesColumn: TimeseriesColumn` (singular, one time column). Naming difference is intentional and matches the underlying types — fine. |
| 12 | `Feature.inputs` (deprecated `string[]`) vs `Feature.entities: EntityColumn[]` | model.ts:293, 317 | field pair | Medium | 12 Duplicate concepts | `inputs` is deprecated (JSDoc says use `AggregationFunction.inputs` — but that field doesn't exist either; see #35). It's a `string[]`, while the modern `entities` is `EntityColumn[]`. The two fields coexist on the same interface; the deprecation tag is not surfaced in TS JSDoc as `@deprecated`. |
| 13 | `Feature.filterCondition` (deprecated) vs `DeltaTableSource.filterCondition` vs `KafkaSource.filterCondition` | model.ts:307, 253, 463 | field set | Medium | 12 Duplicate concepts | Same field name on three types with the same meaning ("SQL WHERE clause"). The one on `Feature` is deprecated in favor of the per-source ones (per JSDoc). The other two are duplicates of each other across data-source flavors — fine. Just mark the deprecated copy `@deprecated`. |
| 14 | `Feature.timeWindow` (deprecated, top-level) vs `AggregationFunction.timeWindow` (canonical, nested) | model.ts:300, 80 | field pair | Medium | 12 Duplicate concepts | Two `timeWindow` fields at different positions in the same record. The Feature-level one is deprecated. JSDoc says so, no `@deprecated` tag. |
| 15 | `DeltaTableSource.entityColumns` (deprecated `string[]`) vs `Feature.entities` (`EntityColumn[]`) | model.ts:246, 317 | field pair | Medium | 12 Duplicate concepts | Same data ("which columns are entities for this feature") expressed two ways: a `string[]` on the source (deprecated) and an `EntityColumn[]` on the parent. Pick one. The deprecation note ("Use Feature.entity instead") refers to a non-existent field name (`entity` singular vs `entities` plural — typo in the spec). |
| 16 | `DeltaTableSource.timeseriesColumn` (deprecated `string`) vs `Feature.timeseriesColumn` (canonical `TimeseriesColumn`) | model.ts:251, 319 | field pair | Medium | 12 Duplicate concepts | Same pattern as #15. Two `timeseriesColumn` fields, one deprecated string, one canonical object. |
| 17 | `KafkaSource.entityColumnIdentifiers` vs `Feature.entities` vs `DeltaTableSource.entityColumns` (three names for one concept) | model.ts:456, 317, 246 | field set | High | 12 Duplicate concepts, 17 Inconsistent action verbs | Three names for the same domain notion ("entity columns of a source"): `entityColumnIdentifiers` (Kafka source, `ColumnIdentifier[]`), `entityColumns` (Delta source, `string[]`), `entities` (Feature top-level, `EntityColumn[]`). The element types are even three different shapes. |
| 18 | `KafkaSource.timeseriesColumnIdentifier` vs `Feature.timeseriesColumn` vs `DeltaTableSource.timeseriesColumn` | model.ts:461, 319, 251 | field set | High | 12 Duplicate concepts | Same as #17 but for the timeseries column. Three names, three types (`ColumnIdentifier`, `TimeseriesColumn`, `string`) for one concept. |
| 19 | `ColumnIdentifier` vs `EntityColumn` vs `TimeseriesColumn` (three "column reference" types) | model.ts:156, 268, 777 | interface set | High | 12 Duplicate concepts, 1 Vague/generic | Three interfaces that all describe "a reference to a column" (each carries a string name field). `ColumnIdentifier.variantExprPath`, `EntityColumn.name`, `TimeseriesColumn.name`. The field names also differ (`variantExprPath` vs `name`). One `ColumnRef` type with a `path` field would consolidate. |
| 20 | `ColumnIdentifier.variantExprPath` | model.ts:161 | field | High | 5 Cryptic abbreviations, 6 Misleading names | "variantExprPath" — short for "variant expression path". The JSDoc clarifies it is a dot-prefixed column path (e.g., `value.trip_details.pickup_zip`). The `variantExpr` prefix is meaningless to a TS reader; the path is not a "variant expression" in any TS sense. Rename `path` or `columnPath`. |
| 21 | `ColumnSelection` interface | model.ts:165 | interface | Medium | 1 Vague/generic | The name `ColumnSelection` is generic enough to read as "the selection of a column" in any context, but the JSDoc says it represents "equivalent to the LAST() record of an entity over a lifetime ContinuousWindow" — i.e., a very specific semantic. `LatestColumnValue` or `LifetimeLastValue` would fit the semantic. |
| 22 | `Function.function.$case === 'columnSelection'` discriminator | model.ts:376 | field | Low | (none) | Within the `function` union, `columnSelection` sits next to `aggregationFunction`. Consistent. |
| 23 | `MaterializedFeature.materializedFeatureId` field (stutter) | model.ts:535 | field | High | 12 Duplicate concepts, 15 Generic field names, 19 Underspecified IDs | Reads `mf.materializedFeatureId` — the type prefix duplicates. TS idiom: just `id`. Path interpolations elsewhere look like `${req.materializedFeatureId ?? ''}` (client.ts) — verbose. |
| 24 | `MaterializedFeature.featureName` (full Unity Catalog name) vs `MaterializedFeature.tableName` (full UC table name) | model.ts:537, 551 | field pair | Medium | 6 Misleading names, 19 Underspecified IDs | Both are "full names". JSDoc says `featureName` is "The full name of the feature in Unity Catalog" (i.e., three-part `catalog.schema.name`) and `tableName` is "The fully qualified Unity Catalog path to the table". They look the same shape but reference different objects. `featureFullName` / `tableFullName` would type themselves. Compare to `Feature.fullName` (model.ts:286) where the type name is the disambiguator. |
| 25 | `Feature.fullName` (the feature's three-part name) | model.ts:286 | field | Medium | 6 Misleading names, 19 Underspecified IDs | "fullName" without context is ambiguous (full as opposed to what?). The JSDoc says "three-part name (catalog, schema, name)". A `name: string` carrying a fully-qualified identifier is a common UC pattern; `qualifiedName` or `threePartName` would be self-describing. Same critique applies to `DeleteFeatureRequest.fullName` (path), `GetFeatureRequest.fullName`, `DeltaTableSource.fullName`. |
| 26 | `DeleteFeatureRequest.fullName` vs `DeleteMaterializedFeatureRequest.materializedFeatureId` vs `DeleteKafkaConfigRequest.name` | model.ts:226, 236, 231 | field set | Medium | 17 Inconsistent action verbs, 19 Underspecified IDs | Three sibling delete requests use three different name conventions for "which thing to delete": `fullName`, `materializedFeatureId`, `name`. Three patterns in one file. Caller has to remember which name field each resource uses. |
| 27 | `KafkaConfig.bootstrapServers` | model.ts:424 | field | Low | (none) | Standard Kafka term. Fine. |
| 28 | `SubscriptionMode.$case === 'assign'` | model.ts:737 | field | Low | 1 Vague/generic | "assign" is the Kafka idiom for "specifically assign these topic-partitions". Fine for Kafka users; opaque otherwise. |
| 29 | `SubscriptionMode.$case === 'subscribePattern'` | model.ts:750 | field | Low | (none) | Fine, matches Kafka SDK. |
| 30 | `extraOptions` field (`Record<string, string>`) | model.ts:434 | field | Medium | 1 Vague/generic | "Extra" is meaningless — extras compared to what? The JSDoc says it's "Catch-all for miscellaneous options". Rename `kafkaOptions` or `additionalOptions`. Fine if you accept "extra" as conventional escape-hatch idiom. |
| 31 | `disableHostnameVerification` flag on `MtlsConfig` | model.ts:623 | field | Low | (none) | Boolean named in the affirmative-by-disabling style. Documented carefully in JSDoc. Fine. |
| 32 | `MtlsConfig.keystorePasswordRef` / `keyPasswordRef` / `truststorePasswordRef` (`Ref` suffix) | model.ts:598, 604, 612 | field set | Low | 5 Cryptic abbreviations | "Ref" abbreviates "Reference". The element type is `SecretScopeReference` so the suffix is informative — fine, consistent across three fields. |
| 33 | `MaterializedFeature.isOnline` vs `MaterializedFeature.destination` (redundant) | model.ts:562, 538 | field pair | High | 12 Duplicate concepts | `isOnline = true` ⟺ `destination.$case === 'onlineStoreConfig'`. Two ways to ask the same question. The JSDoc on `isOnline` confirms: "True if this is an online materialized feature. False if it is an offline materialized feature." But `destination` already discriminates the two. Drop `isOnline` or make it a server-side derived flag with an `@readonly` note. |
| 34 | `Feature.lineageContext` field (per JSDoc "internal use") | model.ts:315 | field | High | 6 Misleading names | The field is documented as "primarily intended for internal use by <Databricks> systems and is automatically populated... Users should not manually set this field as incorrect values may lead to inaccurate lineage tracking or unexpected behavior." Yet it is `lineageContext?: LineageContext \| undefined` on a public type with no `@internal` JSDoc tag. A consumer can construct it and shoot themselves in the foot. Mark `@internal` or remove from the public type. |
| 35 | `LineageContext.notebookId` (number) vs `JobContext.jobId` (number) — both "id"s typed as `number` | model.ts:475, 412 | field pair | Medium | 19 Underspecified IDs, 16 Field contradicting type domain | Databricks resource IDs are 64-bit integers that exceed JS `Number.MAX_SAFE_INTEGER` (~2^53). Typing them as `number` is unsafe; the rest of the SDK uses `bigint` or `string` for IDs. Compare to e.g. `MaterializedFeature.materializedFeatureId: string`. |
| 36 | `LineageContext` interface name | model.ts:473 | interface | Low | 1 Vague/generic | "LineageContext" is reasonable in a lineage-tracking context. Fine. |
| 37 | `JobContext.jobId` JSDoc typo | model.ts:411 | field | Low | (none) | JSDoc reads "The job ID where this API invoked." (missing "was"). Pure typo; flag for completeness. |
| 38 | `JobContext.jobRunId` | model.ts:414 | field | Low | (none) | Fine. |
| 39 | `AggregationFunction.inputs` field referenced in JSDoc but not present | model.ts:290-293 | (missing) | High | 6 Misleading names | The JSDoc on `Feature.inputs` says "Deprecated: Use AggregationFunction.inputs instead." But `AggregationFunction` has no `inputs` field. The intended successor is per-function `input?` (singular, on each of `AvgFunction`, `SumFunction`, etc.). Doc is stale. |
| 40 | `Feature.entities` JSDoc references missing `Feature.entity` | model.ts:242-246 | (missing) | High | 6 Misleading names | `DeltaTableSource.entityColumns` JSDoc says "Use Feature.entity instead." The actual field is `Feature.entities` (plural). Stale or pluralized inconsistently. |
| 41 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs | Two `execute*` functions with overlapping vocabulary. One translates options + dispatches retries, the other does one HTTP roundtrip. Same pattern as sibling-package audits. |
| 42 | `PACKAGE_SEGMENT` | client.ts:60 | const | Low | 1 Vague/generic | Could be `USER_AGENT_PACKAGE_SEGMENT`. Sibling-package pattern. |
| 43 | `featureFieldMask` / `kafkaConfigFieldMask` / `materializedFeatureFieldMask` | model.ts:2432, 2482, 2525 | function set | Low | (none) | Three helper builders. Standard generator pattern. Consistent across resources. Listing for completeness. |
| 44 | `ContinuousWindow` / `SlidingWindow` / `TumblingWindow` (Spark windowing) | model.ts:171, 708, 789 | interface set | Low | (none) | Standard Spark Structured Streaming idioms. Fine. |
| 45 | `Function` interface shadows JS built-in `Function` | model.ts:358 | interface | High | 1 Vague/generic, 6 Misleading names | `export interface Function` shadows the TypeScript global `Function` type (the constructor signature). Inside any module that imports `Function` from this package, the global is unreachable except via `globalThis.Function`. Rename to `AggregationFnDefinition` or `FeatureFunction` to clear the shadow. |
| 46 | `Function_FunctionType` enum | model.ts:29 | enum | High | Proto architectural leak | Underscore-separated proto-nested enum name (`Outer_Inner`) leaks `.proto` IDL nesting into the public TS API. Requires an eslint-disable for `@typescript-eslint/naming-convention`. Flatten to `FunctionType` (or, since deprecated, retire entirely per #6). |
| 47 | `MaterializedFeature_PipelineScheduleState` enum | model.ts:47 | enum | High | Proto architectural leak | Same proto-nested-enum leak as #46. The TS-facing name encodes the proto outer message (`MaterializedFeature`) as a prefix segment. Flatten to `PipelineScheduleState` (the values are already `PIPELINE_SCHEDULE_STATE_*` so the outer prefix is redundant). |
| 48 | `Function_ExtraParameter` interface | model.ts:388 | interface | High | Proto architectural leak | Proto-nested message name with underscore separator; carries an explicit eslint-disable. The pattern `Outer_Inner` is a `.proto` nested-message convention and is not how TS interfaces are named. Flatten to `ExtraFunctionParameter` or move to a discriminated union member. |
| 49 | `KafkaConfig_ExtraOptionsEntry` interface | model.ts:444 | interface | High | Proto architectural leak | Synthetic proto map-entry type. `protoc` auto-generates `<Map>Entry` messages for `map<K,V>` fields and the TS generator copies the name verbatim. The corresponding TS field is already `extraOptions: Record<string, string>` (model.ts:434), so this auxiliary interface has no consumer in idiomatic TS code yet leaks into the public surface via `index.ts:44`. Drop it. |
| 50 | `unmarshalFunction_ExtraParameterSchema` / `marshalFunction_ExtraParameterSchema` | model.ts:1163, 1935 | const set | Medium | Proto architectural leak | Zod schema constants inherit the proto-nested `Outer_Inner` underscore from the interface. Both carry an explicit eslint-disable. Rename together with #48. |
| 51 | Public re-exports of `Function_FunctionType`, `Function_ExtraParameter`, `MaterializedFeature_PipelineScheduleState`, `KafkaConfig_ExtraOptionsEntry` | index.ts:7-8, 38, 44 | re-export set | High | Proto architectural leak | The package's public API barrel re-exports four `Outer_Inner` proto-nested identifiers. A TS consumer importing from `@databricks/sdk-features/v1` cannot avoid the proto-shaped names. Removing the proto leak at the model layer (#46-50) clears this automatically. |

---

## High severity (must fix)

### H1. Three sibling packages, blurry boundaries

The Feature Engineering surface is split across three top-level packages:

- `features` (this package) — owns `Feature`, `KafkaConfig`,
  `MaterializedFeature`, and 21 client methods spanning all three.
- `materializedfeatures` — **does not** own `MaterializedFeature`. It owns
  `FeatureLineage` and `FeatureTag` (see
  `packages/materializedfeatures/src/v1/index.ts`).
- `featurestore` — owns `OnlineStore` and `PublishTable` (see
  `packages/featurestore/src/v1/index.ts`).

The boundaries do not match the package names. A new reader walking the
package list will assume `MaterializedFeature` lives in `materializedfeatures`
— it doesn't. They will assume `KafkaConfig` lives in `featurestore` (the
"store" for features) — it doesn't.

Recommendations (pick one):

- **Rename to match contents:**
  - this package → `feature-definitions` or `feature-engineering` (it owns
    definitions + materialization + Kafka).
  - `materializedfeatures` → `feature-lineage` or `feature-metadata`.
  - `featurestore` → `feature-online-stores`.
- **Move types to match names:**
  - Move `MaterializedFeature` + `materializedFeatures*` client methods out of
    `features` and into `materializedfeatures`.
  - Move `KafkaConfig` + `kafkaConfigs*` client methods out of `features` into
    a new `feature-streaming-sources` package or keep in `features` if it
    becomes "feature definitions only".

Either way, the current state misleads consumers.

### H2. Package name `features` is vague

Bare "features" overlaps with at least three unrelated Databricks concepts:

1. ML features (this package).
2. Product / preview features (in `settings`, `previews`).
3. Billing-plan features (in pricing surfaces).

A TS reader who writes `import {Feature} from '@databricks/sdk-features/v1'`
has no signal that this is the ML kind. Recommend
`@databricks/sdk-feature-engineering` to match the URL path
(`/api/2.0/feature-engineering/...`).

### H3. The `Feature` type name is overloaded

The unqualified noun `Feature` is the central type of this package
(model.ts:280) and is re-exported from `index.ts`. Once it lands in a
consumer's namespace it shadows the common-English sense of the word.

```ts
import {Feature} from '@databricks/sdk-features/v1';
import {Feature as PreviewFeature} from '@databricks/sdk-previews/v1';
```

Rename `MLFeature`, `FeatureDefinition`, or
`FeatureEngineeringFeature` (the latter is verbose but unambiguous and matches
the URL).

### H4. `MaterializedFeature` is misplaced

The package `materializedfeatures/` exists at `packages/materializedfeatures/`
but does not contain `MaterializedFeature` (it contains `FeatureLineage` /
`FeatureTag` instead). `MaterializedFeature` lives in this package. The
package naming and module organization are out of sync.

This is the most surprising thing in this audit. A reader who searches the
codebase for `MaterializedFeature` will find it in `features/`, not
`materializedfeatures/`. Moving it (or renaming the empty-shelled package)
should be a P1 fix.

### H5. Three names for "column reference of a source"

- `ColumnIdentifier { variantExprPath?: string }` — used by `KafkaSource`.
- `EntityColumn { name?: string }` — used by `Feature`.
- `TimeseriesColumn { name?: string }` — used by `Feature`.
- `string` — used by deprecated `DeltaTableSource.entityColumns`,
  `DeltaTableSource.timeseriesColumn`.

Four representations for the same domain notion. Three of them carry a single
field, two with different field names (`variantExprPath` vs `name`). The
simplest fix is one shared `ColumnRef { path: string }` plus a tag on the
parent context (e.g., `entities: ColumnRef[]`, `timeseries: ColumnRef`).

### H6. Deprecated fields/types not marked with `@deprecated`

The deprecation note ("Deprecated: Use the function-specific messages in
AggregationFunction.function_type oneof instead") lives in the JSDoc *text*
but neither the type, nor the field, nor the enum carries a `@deprecated` tag.
TS callers' IDEs will not flag use. The full list:

- `Function.functionType` — model.ts:363
- `Function.extraParameters` — model.ts:368
- `Feature.inputs` — model.ts:293
- `Feature.timeWindow` — model.ts:300
- `Feature.filterCondition` — model.ts:307
- `BackfillSource.$case === 'deltaTableSource'` — model.ts:130
- `DeltaTableSource.entityColumns` — model.ts:246
- `DeltaTableSource.timeseriesColumn` — model.ts:251
- `KafkaSource.entityColumnIdentifiers` — model.ts:456
- `KafkaSource.timeseriesColumnIdentifier` — model.ts:461

Ten deprecated fields with no `@deprecated` tag. Add the tag.

### H7. `Feature.lineageContext` is internal but exposed as public

JSDoc explicitly says: "WARNING: This field is primarily intended for internal
use by <Databricks> systems and is automatically populated... Users should not
manually set this field as incorrect values may lead to inaccurate lineage
tracking or unexpected behavior. This field will be set by feature-engineering
client and should be left unset by SDK and terraform users."

Yet it sits on the public `Feature` interface, with no `@internal` JSDoc tag,
no runtime guardrail, no separate "internal feature creation" path. A TS
consumer constructing a `Feature` literal can fill in any value.

Fix: mark `@internal` (or remove from public type and have the server inject
it).

### H8. `isOnline` redundancy with `destination`

`MaterializedFeature.isOnline` is `true` iff `destination.$case === 'onlineStoreConfig'`.
Two booleans for one fact. A consumer who reads one and not the other can
misinterpret the record's state. Either:

- Drop `isOnline` and require consumers to inspect `destination`.
- Make `isOnline` a server-derived read-only flag and forbid setting it on
  create/update (it appears in the field-mask schema — model.ts:2510 — and
  the JSDoc doesn't say it's read-only).

### H9. Path-parameter IDs typed as `number`

`LineageContext.notebookId` and `JobContext.jobId`, `JobContext.jobRunId` are
typed as `number`. Databricks IDs are 64-bit. The other ID field on the same
file (`MaterializedFeature.materializedFeatureId`) is `string`. Inconsistent
within the file *and* potentially unsafe at the `2^53` boundary.

### H10. `Function` interface shadows the JS built-in

`export interface Function` (model.ts:343) shadows the TypeScript global
`Function` type (the constructor signature `Function`). Inside any module
that imports `Function` from this package, the global is unreachable except
via `globalThis.Function`. Most ESLint configs (including this repo's, see
`no-shadow-restricted-names` and the `globals` rule) flag this.

Rename `AggregationFnDefinition` or `FeatureFunction` to clear the shadow.

### H11. Proto-architectural leak: `Outer_Inner` nested names

Four public identifiers carry the proto-nested `<Outer>_<Inner>` underscore
convention straight from the `.proto` IDL into the TS public API:

- `Function_FunctionType` (enum, model.ts:29)
- `MaterializedFeature_PipelineScheduleState` (enum, model.ts:47)
- `Function_ExtraParameter` (interface, model.ts:388)
- `KafkaConfig_ExtraOptionsEntry` (interface, model.ts:444)

Each requires an `eslint-disable @typescript-eslint/naming-convention` line
to compile, with the disable comment self-identifying as "Proto-style
nested enum name" or "Proto-style nested message name". The corresponding
zod-schema constants inherit the underscore (`unmarshalFunction_ExtraParameterSchema`,
`marshalFunction_ExtraParameterSchema` — model.ts:1163, 1935).

`KafkaConfig_ExtraOptionsEntry` is a particularly clear leak: it is the
auto-generated proto map-entry type for the `map<string, string>` field on
`KafkaConfig`. The user-facing TS field is already `extraOptions:
Record<string, string>` — no consumer can or should reference the entry
type.

All four are re-exported from `index.ts` (lines 7-8, 38, 44), so the
underscore-shaped names cross the package boundary into every importer's
namespace.

Fix at the generator: emit the inner type at the file top level without
the outer prefix (`FunctionType`, `PipelineScheduleState`,
`ExtraFunctionParameter`) and drop the synthetic map-entry interface
entirely.

---

## Medium severity (worth pushing back on)

### M1. One `Client` owning three resource families

The `Client` class is 631 lines and exposes methods over three resource
families:

- `Feature`: create, get, list, update, delete.
- `KafkaConfig`: create, get, list, update, delete.
- `MaterializedFeature`: batchCreate, create, get, list, update, delete.

The URL groupings hint that they are distinct sub-resources:

- `/api/2.0/feature-engineering/features`
- `/api/2.0/feature-engineering/features/kafka-configs`
- `/api/2.0/feature-engineering/materialized-features`

Splitting to three sub-clients (or three packages) would let each Client read
as a single focused surface.

### M2. `*Function` interface proliferation

Thirteen single-field interfaces (`AvgFunction`, `CountFunction`, etc.), eleven
of which are field-for-field identical (`{input?: string}`):

```ts
export interface AvgFunction    { input?: string | undefined }
export interface CountFunction  { input?: string | undefined }
export interface SumFunction    { input?: string | undefined }
export interface MinFunction    { input?: string | undefined }
export interface MaxFunction    { input?: string | undefined }
export interface FirstFunction  { input?: string | undefined }
export interface LastFunction   { input?: string | undefined }
export interface StddevPopFunction  { input?: string | undefined }
export interface StddevSampFunction { input?: string | undefined }
export interface VarPopFunction     { input?: string | undefined }
export interface VarSampFunction    { input?: string | undefined }
```

Plus two that add fields:

```ts
export interface ApproxCountDistinctFunction { input?, relativeSd?  }
export interface ApproxPercentileFunction    { input?, percentile?, accuracy? }
```

One shared `SingleInputFunction` + two specific extras would reduce the
interface count from 13 to 3. The discriminated union in `AggregationFunction.operation`
already encodes the function kind via `$case`. The type per case is
redundant.

(This may be a deliberate code-generation pattern from the proto spec to
preserve forward extensibility — e.g., to let `SumFunction` later add fields
without affecting `AvgFunction`. Worth pushing back on.)

### M3. Field-name pluralization mismatches the type

- `Feature.entities: EntityColumn[]` — plural field, singular element. Fine.
- `KafkaSource.entityColumnIdentifiers: ColumnIdentifier[]` — plural field,
  singular element. Fine in isolation but `entities` (the modern version on
  Feature) is much shorter.
- `DeltaTableSource.entityColumns: string[]` — plural field, primitive
  element. Deprecated. Three plural conventions for the same notion.

### M4. Three names for one notion (`entities` / `entityColumns` / `entityColumnIdentifiers`)

See H5. The three names also differ in element type (`EntityColumn`, `string`,
`ColumnIdentifier`). Cf. T3 in cross-cutting observations below.

### M5. `ColumnSelection` interface is too generic

JSDoc says `ColumnSelection` represents "equivalent to the LAST() record of an
entity over a lifetime ContinuousWindow". The name gives no domain hint.
`LatestColumnValue` would name the behavior. (Same critique as `Credential` in
the credentials audit.)

### M6. `MaterializedFeature.destination` is a generic word

Carries an `OfflineStoreConfig | OnlineStoreConfig` union. The English word
"destination" suggests a URL or path. Domain word: `target`, `store`, or
`storage`.

### M7. JSDoc references stale field names

- "Use Feature.entity instead" (model.ts:243) — actual field is `entities`.
- "Use Feature.entity instead" (model.ts:453) — same typo.
- "Use AggregationFunction.inputs instead" (model.ts:290) — field doesn't
  exist; modern shape is per-function `input?`.
- "Use Function.aggregation_function.time_window" (model.ts:297) — references
  snake_case wire name in TS-facing JSDoc.

### M8. `executeCall` vs `executeHttpCall`

Same as sibling packages. Two `execute*` verbs.

---

## Low severity (nits)

### L1. `PACKAGE_SEGMENT` undescriptive

Sibling-package pattern.

### L2. `MtlsConfig.disableHostnameVerification` reasonable

Boolean named in negative ("disable") to match the underlying Kafka option
(`kafka.ssl.endpoint.identification.algorithm`). JSDoc warns about security
implications. Fine.

### L3. `bootstrapServers` is conventional Kafka

Fine.

### L4. `cronSchedule` field on `MaterializedFeature`

`MaterializedFeature.cronSchedule: string` is a Quartz cron expression. The
field name is fine; the type could be a branded `CronExpression` for stronger
typing, but flagging only for completeness.

### L5. `req` parameter naming in client methods

Standard SDK-wide convention. Fine.

### L6. `ContinuousWindow.offset` allows non-positive

Note in JSDoc: "must be non-positive" — i.e., 0 or negative duration. The
type is `Temporal.Duration` which doesn't constrain sign. Documentation-only
constraint; not enforced. Same critique as `SlidingWindow.slideDuration`
("must be positive and less than duration").

### L7. `ProtoSchemaSpec.schemaText` carries the entire `.proto` file text

A `string` containing potentially many KB of source text. Naming is fine; the
data shape is the design choice. Listing for completeness.

### L8. JSDoc typo on `JobContext.jobId`

"The job ID where this API invoked." → "where this API was invoked." Minor.

### L9. `SecretScopeReference { scope, key }`

Two-field reference to a Databricks secret. Standard. Fine.

### L10. `TimeWindow`, `ContinuousWindow`, `TumblingWindow`, `SlidingWindow`

Four Spark Structured Streaming idioms. Standard. Fine.

### L11. `featureFieldMask` / `kafkaConfigFieldMask` / `materializedFeatureFieldMask`

Three field-mask builders. Standard generator pattern. Fine.

### L12. `req.featureName` query parameter on `ListMaterializedFeaturesRequest`

The list endpoint filters by feature name (full UC name). Field is
`featureName?: string` — fine. Distinguishes from `MaterializedFeature.featureName`
in the response, which is the same value.

---

## Cross-cutting observations (not flags)

### T1. Generator marker

Every file begins with `// Code generated from API definition by Databricks
SDK Generator. DO NOT EDIT.` All issues here must be fixed upstream.

### T2. Three packages, three different concepts of "what is a feature"

| Package | What it owns | Where it lives |
|---------|--------------|----------------|
| `features` | `Feature` definitions, `KafkaConfig`, `MaterializedFeature` | this audit |
| `materializedfeatures` | `FeatureLineage`, `FeatureTag` (mismatched name) | `packages/materializedfeatures/` |
| `featurestore` | `OnlineStore`, `PublishTable` | `packages/featurestore/` |

Domain-wise these are all *one product* (Databricks Feature Engineering /
Feature Store). They are split across three packages whose names suggest a
different breakdown than the contents.

### T3. Optionality model

Every field is `T | undefined`. Matches the rest of the SDK
(`exactOptionalPropertyTypes`).

### T4. `index.ts` re-export style

Class re-exported with `export {Client}`; enums (runtime values) re-exported
with `export {ScalarDataType, Function_FunctionType, MaterializedFeature_PipelineScheduleState}`;
interfaces (type-only) re-exported with `export type {...}`. Correct for
`verbatimModuleSyntax`.

### T5. No tests

No `tests/` directory for this package (matches sibling Feature Engineering
packages).

### T6. Versioning

Only `v1` exists; nothing to compare.

### T7. Acronym casing

| Acronym | Code form | JSDoc text | Consistent? |
|---------|-----------|-----------|-------------|
| UC (Unity Catalog) | `unityCatalog*` (e.g., `ucServiceCredentialName`) — *not used here*; appears in `AuthConfig.$case === 'ucServiceCredentialName'` (model.ts:104) | "Unity Catalog" spelled out | Mixed (cf. credentials audit M7) |

| SQL | `transformationSql` field, `sql` lowercase | "SQL" all-caps | Field uses `Sql` (PascalCase-first-letter). Fine. |
| TLS / mTLS | `MtlsConfig`, `mtlsConfig` | "Mutual-TLS (mTLS)" mixed | Code `Mtls` (PascalCase-first-letter). Diverges from RFC convention "mTLS". |
| TLS / SSL | `disableHostnameVerification` (no acronym) | "SSL" / "TLS" all-caps | N/A |
| IETF | `jsonSchema`, "IETF JSON schema" in JSDoc | N/A | N/A |
| JKS | "JKS files" in JSDoc | N/A | N/A |

### T8. Streaming-specific vocabulary

`SubscriptionMode.assign` / `subscribe` / `subscribePattern` directly mirror
Spark Structured Streaming Kafka options. Documented inline. Fine for users
who know the upstream API; opaque otherwise.

---

## Domain glossary (as inferred from this code)

| Term | Meaning in this package |
|------|-------------------------|
| **Feature** | A UC-registered feature definition: full three-part name + data source + aggregation function + time window. Reached via `/api/2.0/feature-engineering/features`. |
| **Materialized Feature** | A scheduled pipeline that computes a feature's values and writes them to an offline UC Delta table or an online Lakebase table. Reached via `/api/2.0/feature-engineering/materialized-features`. |
| **Kafka Config** | A reusable Kafka cluster + topic-subscription + schema bundle. Referenced by `KafkaSource.name` from `Feature.source`. |
| **Pipeline Schedule State** | The state of the underlying DLT pipeline driving the materialization. One of `SNAPSHOT` (one-shot), `ACTIVE` (running), `PAUSED`. |
| **Aggregation Function** | One of 13 SQL aggregations (`avg`, `count`, `sum`, `min`, `max`, `first`, `last`, `approxCountDistinct`, `approxPercentile`, `stddevPop`, `stddevSamp`, `varPop`, `varSamp`) applied over a time window. |
| **Column Selection** | The non-aggregation alternative to `AggregationFunction` — picks the latest value of a single column over a lifetime continuous window. Semantic equivalent of SQL `LAST()`. |
| **Data Source** | One of three: Delta table (batch), Kafka stream (streaming), Request-time (inference-time scoring). |
| **Backfill Source** | A user-provided historical-data table used when constructing training sets from streaming features. |
| **Time Window** | One of three Spark windowing variants: continuous, tumbling (non-overlapping fixed-duration), sliding (overlapping). |
| **Subscription Mode** | Kafka topic-selection mode: explicit topic-partition `assign`, comma-separated `subscribe`, regex `subscribePattern`. |
| **Auth Config** | One of two Kafka auth flavors: Unity-Catalog service credential, or mTLS keystores/truststores. |
| **Lineage Context** | Internal-only field linking a feature to the notebook/job that created it. Auto-populated by the feature-engineering client. |
| **Entity Column** | Column(s) used as the lookup key for the feature at query time. Aggregation keys. |
| **Timeseries Column** | The event-time column on the source data. Used for point-in-time joins, backfills, and aggregation windowing. |
| **Online Store** | A Lakebase logical database + schema serving low-latency feature lookups. |
| **Offline Store** | A Delta table serving batch-scoring/training feature lookups. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 2638 | 3 enums, 50 interfaces, 60 zod consts (30 unmarshal + 30 marshal), 3 field-mask helpers | yes |
| `src/v1/client.ts` | 636 | 1 class, public methods covering 3 resource families (Feature, KafkaConfig, MaterializedFeature) | yes |
| `src/v1/utils.ts` | 150 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 77 | 1 class re-export, 3 enum re-exports, 60 type re-exports | yes |

Every type, field, enum value, and method enumerated above is accounted for.

---

## Fixed

_None._
