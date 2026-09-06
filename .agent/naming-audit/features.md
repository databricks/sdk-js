# Naming Audit: features

**Path:** `packages/features/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-features`
**Total weird names flagged:** 11

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `features` / module `@databricks/sdk-features` | (package) | package | High | 1 Vague/generic | The bare term "features" is ambiguous: (a) ML features (this package), (b) Databricks product features / feature flags (settings/previews), (c) "features" of a billing plan (billing). A reader cannot disambiguate from the import path. Rename to `@databricks/sdk-feature-engineering`, `@databricks/sdk-ml-features`, or `@databricks/sdk-feature-definitions`. |
| 2 | `Feature` interface | model.ts:364 | interface | High | 1 Vague/generic | The unqualified noun `Feature` is the single most overloaded word in Databricks vocabulary. As a TS-imported type, `import {Feature}` from `@databricks/sdk-features/v1` collides conceptually with: (a) feature flags, (b) preview features, (c) workspace "feature settings". Rename to `FeatureDefinition`, `MLFeature`, or `FeatureEngineeringFeature` to scope the noun. |
| 3 | `FeaturesClient.*Feature*` plus `*KafkaConfig*` plus `*MaterializedFeature*` plus `*Stream*` (4 resource families on one client) | client.ts:74-893 | method set | Medium | 12 Duplicate concepts | One `FeaturesClient` class owns four distinct resource families: `Feature`, `KafkaConfig`, `MaterializedFeature`, and `Stream`. The class is 893 lines and reads as four sub-clients merged. A split into per-resource clients would let each be a focused surface and would clarify the URL groupings (`/api/2.0/feature-engineering/features`, `/.../features/kafka-configs`, `/.../materialized-features`, `/.../streams`). |
| 4 | 13 `*Function` interfaces (`AvgFunction`, `CountFunction`, `SumFunction`, `MinFunction`, `MaxFunction`, `FirstFunction`, `LastFunction`, `ApproxCountDistinctFunction`, `ApproxPercentileFunction`, `StddevPopFunction`, `StddevSampFunction`, `VarPopFunction`, `VarSampFunction`) | model.ts:150, 212, 1091, 809, 803, 428, 638, 117, 125, 953, 964, 1164, 1170 | interface set | High | 8 Redundant suffixes, 12 Duplicate concepts, 20 Type-suffix tautology | 13 interfaces named `<Name>Function` where only `<Name>` would suffice. The `AggregationFunction.operation` discriminated union groups them with `$case` values that mostly already encode "this is the average operation" — `avg` (not `avgFunction`); only `countFunction` keeps the suffix. The `Function` suffix on the type name is redundant. Worse: 11 of 13 of these interfaces are **identical** — `{input?: string \| undefined}`. They could be one shared `SingleColumnFunction` type or a parametric alias. The two that differ are `ApproxCountDistinctFunction` (adds `relativeSd`) and `ApproxPercentileFunction` (adds `percentile`, `accuracy`). |
| 5 | `ColumnSelection` interface | model.ts:198 | interface | Medium | 1 Vague/generic | The name `ColumnSelection` is generic enough to read as "the selection of a column" in any context, but the JSDoc says it represents "equivalent to the LAST() record of an entity over a lifetime ContinuousWindow" — i.e., a very specific semantic. `LatestColumnValue` or `LifetimeLastValue` would fit the semantic. |
| 6 | `Function` interface shadows JS built-in `Function` | model.ts:442 | interface | High | 1 Vague/generic, 6 Misleading names | `export interface Function` shadows the TypeScript global `Function` type (the constructor signature). Inside any module that imports `Function` from this package, the global is unreachable except via `globalThis.Function`. Rename to `AggregationFnDefinition` or `FeatureFunction` to clear the shadow. |
| 7 | `Function_FunctionType` enum | model.ts:33 | enum | High | Proto architectural leak | Underscore-separated proto-nested enum name (`Outer_Inner`) leaks `.proto` IDL nesting into the public TS API. Requires an eslint-disable for `@typescript-eslint/naming-convention`. Flatten to `FunctionType` (or, since deprecated, retire entirely). |
| 8 | `MaterializedFeature_PipelineScheduleState` enum | model.ts:55 | enum | High | Proto architectural leak | Same proto-nested-enum leak as #7. The TS-facing name encodes the proto outer message (`MaterializedFeature`) as a prefix segment. Flatten to `PipelineScheduleState` (the values are already `PIPELINE_SCHEDULE_STATE_*` so the outer prefix is redundant). |
| 9 | `Function_ExtraParameter` interface | model.ts:472 | interface | High | Proto architectural leak | Proto-nested message name with underscore separator; carries an explicit eslint-disable. The pattern `Outer_Inner` is a `.proto` nested-message convention and is not how TS interfaces are named. Flatten to `ExtraFunctionParameter` or move to a discriminated union member. |
| 10 | `unmarshalFunction_ExtraParameterSchema` / `marshalFunction_ExtraParameterSchema` | model.ts:1542, 2572 | const set | Medium | Proto architectural leak | Zod schema constants inherit the proto-nested `Outer_Inner` underscore from the interface. Both carry an explicit eslint-disable. Rename together with #9. |
| 11 | Public re-exports of `Function_FunctionType`, `Function_ExtraParameter`, `MaterializedFeature_PipelineScheduleState` | index.ts:7-8, 44 | re-export set | High | Proto architectural leak | The package's public API barrel re-exports three `Outer_Inner` proto-nested identifiers. A TS consumer importing from `@databricks/sdk-features/v1` cannot avoid the proto-shaped names. Removing the proto leak at the model layer (#7-10) clears this automatically. |

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
(model.ts:364) and is re-exported from `index.ts`. Once it lands in a
consumer's namespace it shadows the common-English sense of the word.

```ts
import {Feature} from '@databricks/sdk-features/v1';
import {Feature as PreviewFeature} from '@databricks/sdk-previews/v1';
```

Rename `MLFeature`, `FeatureDefinition`, or
`FeatureEngineeringFeature` (the latter is verbose but unambiguous and matches
the URL).

### H3. `Function` interface shadows the JS built-in

`export interface Function` (model.ts:442) shadows the TypeScript global
`Function` type (the constructor signature `Function`). Inside any module
that imports `Function` from this package, the global is unreachable except
via `globalThis.Function`. Most ESLint configs (including this repo's, see
`no-shadow-restricted-names` and the `globals` rule) flag this.

Rename `AggregationFnDefinition` or `FeatureFunction` to clear the shadow.

### H4. Proto-architectural leak: `Outer_Inner` nested names (#7-11)

Three public identifiers carry the proto-nested `<Outer>_<Inner>` underscore
convention straight from the `.proto` IDL into the TS public API:

- `Function_FunctionType` (enum, model.ts:33)
- `MaterializedFeature_PipelineScheduleState` (enum, model.ts:55)
- `Function_ExtraParameter` (interface, model.ts:472)

Each requires an `eslint-disable @typescript-eslint/naming-convention` line
to compile, with the disable comment self-identifying as "Proto-style
nested enum name" or "Proto-style nested message name". The corresponding
zod-schema constants inherit the underscore (`unmarshalFunction_ExtraParameterSchema`,
`marshalFunction_ExtraParameterSchema` — model.ts:1542, 2572).

All three are re-exported from `index.ts` (lines 7-8, 44), so the
underscore-shaped names cross the package boundary into every importer's
namespace.

Fix at the generator: emit the inner type at the file top level without
the outer prefix (`FunctionType`, `PipelineScheduleState`,
`ExtraFunctionParameter`).

---

## Medium severity (worth pushing back on)

### M1. One `FeaturesClient` owning four resource families

The `FeaturesClient` class is 893 lines and exposes methods over four resource
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

### M3. `ColumnSelection` interface is too generic

JSDoc says `ColumnSelection` represents "equivalent to the LAST() record of an
entity over a lifetime ContinuousWindow". The name gives no domain hint.
`LatestColumnValue` would name the behavior. (Same critique as `Credential` in
the credentials audit.)
