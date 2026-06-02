# Naming Audit: features

**Path:** `packages/features/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-features`
**Total weird names flagged:** 24 (rescan on 2026-06-02)

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `features` / module `@databricks/sdk-features` | (package) | package | High | 1 Vague/generic | The bare term "features" is ambiguous: (a) ML features (this package), (b) Databricks product features / feature flags (settings/previews), (c) "features" of a billing plan (billing). A reader cannot disambiguate from the import path. Rename to `@databricks/sdk-feature-engineering`, `@databricks/sdk-ml-features`, or `@databricks/sdk-feature-definitions`. |
| 2 | `Feature` interface | model.ts:343 | interface | High | 1 Vague/generic | The unqualified noun `Feature` is the single most overloaded word in Databricks vocabulary. As a TS-imported type, `import {Feature}` from `@databricks/sdk-features/v1` collides conceptually with: (a) feature flags, (b) preview features, (c) workspace "feature settings". Rename to `FeatureDefinition`, `MLFeature`, or `FeatureEngineeringFeature` to scope the noun. |
| 3 | `FeaturesClient.*Feature*` plus `*KafkaConfig*` plus `*MaterializedFeature*` plus `*Stream*` (4 resource families on one client) | client.ts:102-872 | method set | Medium | 12 Duplicate concepts | One `FeaturesClient` class owns four distinct resource families: `Feature`, `KafkaConfig`, `MaterializedFeature`, and `Stream`. The class is 873 lines and reads as four sub-clients merged. A split into per-resource clients would let each be a focused surface and would clarify the URL groupings (`/api/2.0/feature-engineering/features`, `/.../features/kafka-configs`, `/.../materialized-features`, `/.../streams`). |
| 4 | 13 `*Function` interfaces (`AvgFunction`, `CountFunction`, `SumFunction`, `MinFunction`, `MaxFunction`, `FirstFunction`, `LastFunction`, `ApproxCountDistinctFunction`, `ApproxPercentileFunction`, `StddevPopFunction`, `StddevSampFunction`, `VarPopFunction`, `VarSampFunction`) | model.ts:134, 196, 1043, 769, 763, 407, 624, 101, 109, 913, 924, 1116, 1122 | interface set | High | 8 Redundant suffixes, 12 Duplicate concepts, 20 Type-suffix tautology | 13 interfaces named `<Name>Function` where only `<Name>` would suffice. The `AggregationFunction.operation` discriminated union groups them with `$case` values that mostly already encode "this is the average operation" — `avg` (not `avgFunction`); only `countFunction` keeps the suffix. The `Function` suffix on the type name is redundant. Worse: 11 of 13 of these interfaces are **identical** — `{input?: string \| undefined}`. They could be one shared `SingleColumnFunction` type or a parametric alias. The two that differ are `ApproxCountDistinctFunction` (adds `relativeSd`) and `ApproxPercentileFunction` (adds `percentile`, `accuracy`). |
| 5 | `TimeWindow.windowType` field | model.ts:1058 | field | Low | (none) | Not stuttery; the union variants are `continuous`/`tumbling`/`sliding`/`rolling` so `windowType` is a reasonable discriminator label. (Listing for completeness.) |
| 6 | `Feature.source` vs `Feature.entities` vs `Feature.timeseriesColumn` (singular column vs plural columns) | model.ts:351, 380, 382 | field set | Low | 9 Singular/plural mismatches | `entities: EntityColumn[]` (plural, list of columns acting as keys) and `timeseriesColumn: TimeseriesColumn` (singular, one time column). Naming difference is intentional and matches the underlying types — fine. |
| 7 | `ColumnSelection` interface | model.ts:182 | interface | Medium | 1 Vague/generic | The name `ColumnSelection` is generic enough to read as "the selection of a column" in any context, but the JSDoc says it represents "equivalent to the LAST() record of an entity over a lifetime ContinuousWindow" — i.e., a very specific semantic. `LatestColumnValue` or `LifetimeLastValue` would fit the semantic. |
| 8 | `Function.function.$case === 'columnSelection'` discriminator | model.ts:439 | field | Low | (none) | Within the `function` union, `columnSelection` sits next to `aggregationFunction`. Consistent. |
| 9 | `KafkaConfig.bootstrapServers` | model.ts:538 | field | Low | (none) | Standard Kafka term. Fine. |
| 10 | `SubscriptionMode.$case === 'assign'` | model.ts:1022 | field | Low | 1 Vague/generic | "assign" is the Kafka idiom for "specifically assign these topic-partitions". Fine for Kafka users; opaque otherwise. |
| 11 | `SubscriptionMode.$case === 'subscribePattern'` | model.ts:1035 | field | Low | (none) | Fine, matches Kafka SDK. |
| 12 | `disableHostnameVerification` flag on `MtlsConfig` | model.ts:820 | field | Low | (none) | Boolean named in the affirmative-by-disabling style. Documented carefully in JSDoc. Fine. |
| 13 | `MtlsConfig.keystorePasswordRef` / `keyPasswordRef` / `truststorePasswordRef` (`Ref` suffix) | model.ts:795, 801, 809 | field set | Low | 5 Cryptic abbreviations | "Ref" abbreviates "Reference". The element type is `SecretScopeReference` so the suffix is informative — fine, consistent across three fields. |
| 14 | `LineageContext` interface name | model.ts:630 | interface | Low | 1 Vague/generic | "LineageContext" is reasonable in a lineage-tracking context. Fine. |
| 15 | `JobContext.jobRunId` | model.ts:528 | field | Low | (none) | Fine. |
| 16 | `featureFieldMask` / `kafkaConfigFieldMask` / `materializedFeatureFieldMask` | model.ts:3221, 3290, 3359 | function set | Low | (none) | Three helper builders. Standard generator pattern. Consistent across resources (a fourth, `streamFieldMask`, follows the same shape). Listing for completeness. |
| 17 | `ContinuousWindow` / `SlidingWindow` / `TumblingWindow` (Spark windowing) | model.ts:188, 905, 1078 | interface set | Low | (none) | Standard Spark Structured Streaming idioms. Fine. |
| 18 | `Function` interface shadows JS built-in `Function` | model.ts:421 | interface | High | 1 Vague/generic, 6 Misleading names | `export interface Function` shadows the TypeScript global `Function` type (the constructor signature). Inside any module that imports `Function` from this package, the global is unreachable except via `globalThis.Function`. Rename to `AggregationFnDefinition` or `FeatureFunction` to clear the shadow. |
| 19 | `Function_FunctionType` enum | model.ts:29 | enum | High | Proto architectural leak | Underscore-separated proto-nested enum name (`Outer_Inner`) leaks `.proto` IDL nesting into the public TS API. Requires an eslint-disable for `@typescript-eslint/naming-convention`. Flatten to `FunctionType` (or, since deprecated, retire entirely). |
| 20 | `MaterializedFeature_PipelineScheduleState` enum | model.ts:47 | enum | High | Proto architectural leak | Same proto-nested-enum leak as #19. The TS-facing name encodes the proto outer message (`MaterializedFeature`) as a prefix segment. Flatten to `PipelineScheduleState` (the values are already `PIPELINE_SCHEDULE_STATE_*` so the outer prefix is redundant). |
| 21 | `Function_ExtraParameter` interface | model.ts:451 | interface | High | Proto architectural leak | Proto-nested message name with underscore separator; carries an explicit eslint-disable. The pattern `Outer_Inner` is a `.proto` nested-message convention and is not how TS interfaces are named. Flatten to `ExtraFunctionParameter` or move to a discriminated union member. |
| 22 | `KafkaConfig_ExtraOptionsEntry` interface | model.ts:558 | interface | High | Proto architectural leak | Proto-architectural-leak naming. The generator emits a synthetic `{key?, value?}` map-entry interface for the `extraOptions` field of `KafkaConfig`, copying the proto `<Map>Entry` message name verbatim. The wire shape is already covered by `Record<string, string>` (model.ts:548), so this entry type adds noise and is not used by the surface. Remove the `*Entry` interface from the public API. |
| 23 | `unmarshalFunction_ExtraParameterSchema` / `marshalFunction_ExtraParameterSchema` | model.ts:1491, 2504 | const set | Medium | Proto architectural leak | Zod schema constants inherit the proto-nested `Outer_Inner` underscore from the interface. Both carry an explicit eslint-disable. Rename together with #21. |
| 24 | Public re-exports of `Function_FunctionType`, `Function_ExtraParameter`, `MaterializedFeature_PipelineScheduleState`, `KafkaConfig_ExtraOptionsEntry` | index.ts:7-8, 44, 53 | re-export set | High | Proto architectural leak | The package's public API barrel re-exports four `Outer_Inner` proto-nested identifiers. A TS consumer importing from `@databricks/sdk-features/v1` cannot avoid the proto-shaped names. Removing the proto leak at the model layer (#19-23) clears this automatically. |

---

## High severity (must fix)

### H1. Package name `features` is vague

Bare "features" overlaps with at least three unrelated Databricks concepts:

1. ML features (this package).
2. Product / preview features (in `settings`, `previews`).
3. Billing-plan features (in pricing surfaces).

A TS reader who writes `import {Feature} from '@databricks/sdk-features/v1'`
has no signal that this is the ML kind. Recommend
`@databricks/sdk-feature-engineering` to match the URL path
(`/api/2.0/feature-engineering/...`).

### H2. The `Feature` type name is overloaded

The unqualified noun `Feature` is the central type of this package
(model.ts:343) and is re-exported from `index.ts`. Once it lands in a
consumer's namespace it shadows the common-English sense of the word.

```ts
import {Feature} from '@databricks/sdk-features/v1';
import {Feature as PreviewFeature} from '@databricks/sdk-previews/v1';
```

Rename `MLFeature`, `FeatureDefinition`, or
`FeatureEngineeringFeature` (the latter is verbose but unambiguous and matches
the URL).

### H3. `Function` interface shadows the JS built-in

`export interface Function` (model.ts:421) shadows the TypeScript global
`Function` type (the constructor signature `Function`). Inside any module
that imports `Function` from this package, the global is unreachable except
via `globalThis.Function`. Most ESLint configs (including this repo's, see
`no-shadow-restricted-names` and the `globals` rule) flag this.

Rename `AggregationFnDefinition` or `FeatureFunction` to clear the shadow.

### H4. Proto-architectural leak: `Outer_Inner` nested names (#19-24)

Four public identifiers carry the proto-nested `<Outer>_<Inner>` underscore
convention straight from the `.proto` IDL into the TS public API:

- `Function_FunctionType` (enum, model.ts:29)
- `MaterializedFeature_PipelineScheduleState` (enum, model.ts:47)
- `Function_ExtraParameter` (interface, model.ts:451)
- `KafkaConfig_ExtraOptionsEntry` (interface, model.ts:558)

Each requires an `eslint-disable @typescript-eslint/naming-convention` line
to compile, with the disable comment self-identifying as "Proto-style
nested enum name" or "Proto-style nested message name". The corresponding
zod-schema constants inherit the underscore (`unmarshalFunction_ExtraParameterSchema`,
`marshalFunction_ExtraParameterSchema` — model.ts:1491, 2504).

`KafkaConfig_ExtraOptionsEntry` is the synthetic map-entry interface the
generator emits for the `extraOptions: map<string, string>` field; the
user-facing TS field is already `extraOptions: Record<string, string>`
(model.ts:548), so the `*Entry` type has no consumer in idiomatic TS code.

All four are re-exported from `index.ts` (lines 7-8, 44, 53), so the
underscore-shaped names cross the package boundary into every importer's
namespace.

Fix at the generator: emit the inner type at the file top level without
the outer prefix (`FunctionType`, `PipelineScheduleState`,
`ExtraFunctionParameter`) and drop the synthetic map-entry interface.

---

## Medium severity (worth pushing back on)

### M1. One `FeaturesClient` owning four resource families

The `FeaturesClient` class is 873 lines and exposes methods over four resource
families:

- `Feature`: create, get, list, update, delete.
- `KafkaConfig`: create, get, list, update, delete.
- `MaterializedFeature`: batchCreate, create, get, list, update, delete.
- `Stream`: create, get, list, update, delete.

The URL groupings hint that they are distinct sub-resources:

- `/api/2.0/feature-engineering/features`
- `/api/2.0/feature-engineering/features/kafka-configs`
- `/api/2.0/feature-engineering/materialized-features`
- `/api/2.0/feature-engineering/streams`

Splitting to per-resource sub-clients (or packages) would let each Client read
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

### M4. `ColumnSelection` interface is too generic

JSDoc says `ColumnSelection` represents "equivalent to the LAST() record of an
entity over a lifetime ContinuousWindow". The name gives no domain hint.
`LatestColumnValue` would name the behavior. (Same critique as `Credential` in
the credentials audit.)

---

## Low severity (nits)

### L1. `MtlsConfig.disableHostnameVerification` reasonable

Boolean named in negative ("disable") to match the underlying Kafka option
(`kafka.ssl.endpoint.identification.algorithm`). JSDoc warns about security
implications. Fine.

### L2. `bootstrapServers` is conventional Kafka

Fine.

### L3. `ContinuousWindow.offset` allows non-positive

Note in JSDoc: "must be non-positive" — i.e., 0 or negative duration. The
type is `Temporal.Duration` which doesn't constrain sign. Documentation-only
constraint; not enforced. Same critique as `SlidingWindow.slideDuration`
("must be positive and less than duration").

### L4. `SecretScopeReference { scope, key }`

Two-field reference to a Databricks secret. Standard. Fine.

### L5. `TimeWindow`, `ContinuousWindow`, `TumblingWindow`, `SlidingWindow`

Four Spark Structured Streaming idioms. Standard. Fine.

### L6. `featureFieldMask` / `kafkaConfigFieldMask` / `materializedFeatureFieldMask`

Three field-mask builders. Standard generator pattern. Fine.

### L7. `req.featureName` query parameter on `ListMaterializedFeaturesRequest`

The list endpoint filters by feature name (full UC name). Field is
`featureName?: string` — fine. Distinguishes from `MaterializedFeature.featureName`
in the response, which is the same value.
