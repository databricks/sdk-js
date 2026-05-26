# Naming Audit: `schemas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/schemas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — schemas (the level beneath catalogs, parents of tables/views/functions).

---

## Summary

The `schemas` package exposes the standard five UC schema operations
(`createSchema`, `deleteSchema`, `getSchema`, `listSchemas`,
`updateSchema`). The package is small (one
enum, one nested-flag type, the schema info type, five request types,
two response types). Because it is a 1:1
port of the Go SDK, most issues are inherited from upstream proto
definitions: the most pervasive problems are (1) `fullNameArg` as a
cryptic path parameter that coexists with `fullName` on the same type
and (2) `CreateSchemaRequest`/`UpdateSchemaRequest` carrying read-only
server-populated fields. There is also significant
duplicate-concept overlap with the sibling `systemschemas` package
(separate types `SchemaInfo` vs `SystemSchemaInfo`, separate clients,
separate methods) that the audit calls out at the package boundary.

---

## Findings

### 1. Vague / generic names

_None._

---

### 2. Acronym casing inconsistencies

_None._

---

### 3. Cryptic abbreviations

#### 3.1 `fullNameArg` (model.ts:71, 90, 180)
Path-parameter field on `DeleteSchemaRequest`, `GetSchemaRequest`, and
`UpdateSchemaRequest`. The `Arg` suffix is Go-generator jargon
distinguishing path arguments from request-body fields with the same
key. TypeScript callers have no need for this distinction — the field
*is* the schema identifier and should just be `fullName` (or `name`).
Even worse: `UpdateSchemaRequest` has *both* `fullNameArg` (path) and
`fullName` (body) on the same type, with no obvious difference in
semantics. See §10.1.

---

### 4. Misleading names

#### 4.1 `EffectivePredictiveOptimizationFlag.value` is a tri-state encoded as `string` (model.ts:81)
Field is typed `string | undefined` but the doc comment ("Whether
predictive optimization should be enabled…") implies a small discrete
set of values (enable / disable / inherit). The type should be an
enum rather than `string`.

#### 4.2 `SchemaInfo.fullName` corresponds with `name` + `catalogName` (model.ts:140)
The doc is honest: "Full name of schema, in form of
__catalog_name__.__schema_name__". But the field name `fullName`
suggests it might carry additional information not available from
`name`+`catalogName`. It doesn't. See also §8.2.

#### 4.3 `SchemaInfo.options` vs `SchemaInfo.properties` (model.ts:161-163)
Both are `Record<string, string>` with identical doc comments ("A map
of key-value properties attached to the securable."). There is no way
for a caller to know which to use for what. The doc duplication recurs
verbatim in `CreateSchemaRequest` (model.ts:51-54) and
`UpdateSchemaRequest` (model.ts:218-221). Either is underspecified or
one of them is redundant. See §8.1.

---

### 5. Overly verbose

#### 5.1 `EffectivePredictiveOptimizationFlag` type name (model.ts:79)
39 characters. Compounded by `effectivePredictiveOptimizationFlag` as
a field name on three different request/response shapes (model.ts:44,
153, 211). Consider `EffectivePredictiveOptimization` (drop the
`Flag` suffix — the type already wraps the flag) or
`EffectivePOSetting` if shortening is acceptable. See also §6.2.

#### 5.2 `enablePredictiveOptimization: string` (model.ts:27, 136, 194)
Long field name for what is effectively a flag value. Acceptable, but
pairs with §5.1 to make every schema shape verbose.

---

### 6. Redundant suffixes

#### 6.1 `SchemaInfo` type name (model.ts:124)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from a resource handle; in TS the
convention is to drop it (`Schema`). Compare with `Catalog`, `Table`,
etc. in other packages. Note: dropping `Info` produces `Schema`, which
collides with the zod artifact `Schema` (a runtime validator type in
common use across the JS ecosystem) — the rename must consider that
collision before landing.

#### 6.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag` (model.ts:79)
The whole type *is* the flag; the suffix is redundant. See §5.1.

#### 6.3 `Arg` suffix on `fullNameArg` — see §3.1 and §10.1.

---

### 7. Reserved-word collisions

#### 7.1 `options` field on `CreateSchemaRequest`, `UpdateSchemaRequest`, `SchemaInfo` (model.ts:54, 163, 221)
`options` collides with the SDK's own `CallOptions` parameter name
used throughout the client (`createSchema(req, options)`, client.ts:74,
etc.). Not a compile error but creates cognitive load — inside
`createSchema(req, options)` the reader sees both `req.options`
(schema metadata) and `options` (call options). The cleanest fix is to
rename the client parameter to `callOptions`. See also §8.1 for the
duplicate-with-`properties` concern.

#### 7.2 `properties` is not reserved but conflicts with `Object` semantics
`SchemaInfo.properties` (model.ts:161) is fine but worth noting that
`properties` is a heavily-overloaded term in JS (object properties,
descriptor properties, etc.). Combined with the duplicate-with-`options`
problem in §8.1, the name is doubly overloaded.

---

### 8. Duplicate concepts

#### 8.1 `properties` vs `options` (model.ts:51-54, 161-163, 218-221)
Both `Record<string, string>` on every schema shape, with identical
doc comments ("A map of key-value properties attached to the
securable."). Either the documentation needs to differentiate them or
one is redundant. See also §4.3.

#### 8.2 `name` vs `fullName` on `SchemaInfo` (model.ts:126, 140)
`name` is the schema name "relative to parent catalog"; `fullName` is
"in form of __catalog_name__.__schema_name__". These two fields are
deterministically derivable from each other (given `catalogName`).
Mirror issue in `CreateSchemaRequest` (model.ts:17, 31) and
`UpdateSchemaRequest` (model.ts:184, 198). See also §4.2.

#### 8.3 `fullName` vs `fullNameArg` on `UpdateSchemaRequest` (model.ts:180, 198)
The `UpdateSchemaRequest` has **both** `fullNameArg` (the existing
schema identifier, path param) and `fullName` (the same field name on
the body) — plus `newName` for renaming. Three fields all touching
the schema's identity. See §10.1.

#### 8.4 `CatalogType` is re-implemented across packages
The exact `CatalogType` enum is defined here
(model.ts:6-13) and also in `catalogs` (and likely in several other UC
packages). A consumer touching both packages gets two unrelated TS
types named `CatalogType`. Cross-package duplication — flagged in
this audit for the broader review.

#### 8.5 `EffectivePredictiveOptimizationFlag` may be duplicated
This type is identical to the one in `catalogs` (and probably in any
UC securable package). Cross-package duplication.

#### 8.6 `CreateSchemaRequest`, `UpdateSchemaRequest`, and `SchemaInfo` share ~21 fields verbatim
All three types are 95% identical with identical doc strings. This is
a generator artefact, but any rename of `storageRoot` must happen in
three places. Recommend basing `CreateSchemaRequest`/`UpdateSchemaRequest`
on `Partial<SchemaInfo>` or a shared `SchemaProperties` mixin.

#### 8.7 Overlap with `systemschemas` package
The sibling `systemschemas` package operates on a completely different
shape (`SystemSchemaInfo` has only `schema` and `state` — no overlap
with `SchemaInfo`). Same noun, different types, different clients,
different methods. A consumer might reasonably expect one client to
handle both kinds of schemas; instead they must import two packages.
At minimum, the type names should be sufficiently distinguishable —
`SchemaInfo` vs `SystemSchemaInfo` is fine, but the *package* names
(`@databricks/sdk-schemas` vs `@databricks/sdk-systemschemas`) are
trap-shaped: a consumer who imports the first expecting "all schemas"
will be surprised to find that system schemas live elsewhere.

---

### 9. Verb-tense inconsistency

#### 9.1 Client methods: `createSchema`, `deleteSchema`, `getSchema`, `listSchemas`, `updateSchema`, `listSchemasIter`. Imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 10. Field contradicting type domain

#### 10.1 `UpdateSchemaRequest` has `fullNameArg`, `fullName`, `name`, and `newName` (model.ts:180, 184, 198, 182)
Four name-bearing fields on a single update request:

- `fullNameArg` — existing schema identifier (path param).
- `name` — "Name of schema, relative to parent catalog" (body).
- `fullName` — "Full name of schema, in form of catalog.schema" (body).
- `newName` — "New name for the schema" (body).

A caller staring at this struct cannot reasonably intuit which to set
to rename the schema. (The answer is `newName`, with `fullNameArg`
identifying the existing schema; the others are vestigial in the
update context.) This is the single most user-hostile naming pattern
in the package — and it sits on the most-used mutation method.

#### 10.2 `CreateSchemaRequest` contains read-only output fields (model.ts:32-50)
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `catalogType`, `effectivePredictiveOptimizationFlag`,
`schemaId`, `browseOnly`. These are server-populated; a creator
setting them is at best ignored. The type's domain is "create
request", but its shape contradicts that. Same mirror issue in
`UpdateSchemaRequest` (model.ts:199-217).

#### 10.3 `DeleteSchemaRequest.fullNameArg` — see §3.1.

#### 10.4 `GetSchemaRequest.fullNameArg` (model.ts:90)
Same as 10.3.

---

### 11. Inconsistent action verbs

Method verbs in `Client`: `createSchema`, `deleteSchema`, `getSchema`,
`listSchemas`, `updateSchema`. Verbs are consistent — standard CRUD.
No `fetch…` / `retrieve…` / `read…` outliers. No issues found.

---

### 12. Underspecified IDs

#### 12.1 `schemaId` (model.ts:48, 157, 215)
"The unique identifier of the schema." No format hint (UUID?). The
field exists alongside `fullName` (which is also a unique identifier
in a different sense). Two simultaneous IDs without disambiguation.

#### 12.2 `inheritedFromType` / `inheritedFromName` on `EffectivePredictiveOptimizationFlag` (model.ts:83, 85)
Both `string`. `inheritedFromType` could be one of the UC securable
types, but the field is not enum-typed. `inheritedFromName` is opaque
text.

---

### 13. Type-suffix tautology

#### 13.1 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:6, 41, 150, 208) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 13.2 `SchemaInfo` doesn't carry a `schemaType` field — no tautology there, which is a relief.

---

### 14. Generic field names losing meaning

#### 14.1 `properties`, `options` (model.ts:51, 53, 161, 163, 218, 220) — see §4.3, §8.1.

---

### 15. Singular / plural mismatches

_None._

---

### 16. Go / Java-style names

#### 16.1 `…Info` suffix (`SchemaInfo`, `EffectivePredictiveOptimizationFlag`)
Java/Go style. TS convention is to drop it. See §6.1.

#### 16.2 `Client` class name (client.ts:44)
Bare `Client` (rather than `SchemasClient`) is a Go-idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-schemas/v1'` and have to alias.
Package-wide convention; flagged for the broader review.

#### 16.3 `fullNameArg` — Go-generator naming. See §3.1.

---

### 17. Proto-architectural-leak naming

#### 17.1 `EffectivePredictiveOptimizationFlag` — `Flag` wrapper suffix (model.ts:79)
- **Why:** The type is a proto-style wrapper around a tri-state value
  (`value`, `inheritedFromType`, `inheritedFromName`). `Flag` is a
  proto-wrapper marker that leaks the upstream message-modeling pattern
  into the public TS surface — the type *is* the predictive-optimization
  setting; `Flag` adds no semantic content.
- **Category:** `Wrapper`/`Adapter` suffix (proto wrapper pattern).
- **Suggested:** `EffectivePredictiveOptimization` (or, combined with
  §5.1, `PredictiveOptimization`).
- **Rationale:** TS callers care about the value and its inheritance
  source; the wrapper-ness is an implementation detail of the proto
  schema, not part of the domain vocabulary.

#### 17.2 `effectivePredictiveOptimizationFlag` field — `Flag` wrapper infix (model.ts:44, 153, 211)
- **Why:** Same proto-wrapper leak repeated as a field name on three
  shapes (`CreateSchemaRequest`, `SchemaInfo`, `UpdateSchemaRequest`).
  35-character field name whose `Flag` segment exists only to mirror
  the wrapper type.
- **Category:** `Wrapper`/`Adapter` infix (proto wrapper pattern).
- **Suggested:** `effectivePredictiveOptimization` (or
  `predictiveOptimization`).
- **Rationale:** Field name should describe the domain concept
  (predictive-optimization setting), not the proto modelling choice
  (wrapping the setting in a `*Flag` message).

---

## Additional / cross-cutting observations

### A. The package name is plural; the entity types are singular
The package is `schemas` (plural); the model types are `Schema` (well,
`SchemaInfo` — singular). The five client methods mix:
`createSchema`/`deleteSchema`/`getSchema`/`updateSchema` (singular —
they act on one) and `listSchemas` (plural — returns many). This is
the same pattern as `catalogs`, `tables`, etc. — consistent across
the SDK.

### B. `enablePredictiveOptimization` is typed `string` not `boolean` (model.ts:27, 136, 194)
The field name says "enable" — suggesting boolean — but the type is
`string`. The actual value is presumably `'ENABLE' | 'DISABLE' |
'INHERIT'` or similar. The name lies about the type. See also §4.1
for the related `EffectivePredictiveOptimizationFlag.value`.

### C. Overlap with `systemschemas` package — see §8.7
A consumer reading "schemas" reasonably expects to find all schema
operations here. They will not find `disableSystemSchema`,
`enableSystemSchema`, or `listSystemSchemas` — those live in
`@databricks/sdk-systemschemas`. Package boundaries follow the
upstream API surface, but the seam is non-obvious to discover.

---

## File / line index for fast lookup

| Identifier                                                  | Location              | Finding              |
| ----------------------------------------------------------- | --------------------- | -------------------- |
| `CatalogType`                                               | model.ts:6            | 8.4, 13.1            |
| `CreateSchemaRequest`                                       | model.ts:15           | 8.6, 10.2            |
| `CreateSchemaRequest.name`                                  | model.ts:17           | 8.2                  |
| `CreateSchemaRequest.catalogType`                           | model.ts:41           | 13.1                 |
| `CreateSchemaRequest.effectivePredictiveOptimizationFlag`   | model.ts:44           | 5.1, 17.2            |
| `CreateSchemaRequest.properties` / `.options`               | model.ts:52, 54       | 4.3, 7.1, 8.1, 14.1  |
| `DeleteSchemaRequest`                                       | model.ts:69           | 10.3                 |
| `DeleteSchemaRequest.fullNameArg`                           | model.ts:71           | 3.1, 10.3, 16.3      |
| `EffectivePredictiveOptimizationFlag`                       | model.ts:79           | 5.1, 6.2, 16.1, 17.1 |
| `EffectivePredictiveOptimizationFlag.value`                 | model.ts:81           | 4.1                  |
| `EffectivePredictiveOptimizationFlag.inheritedFromType`     | model.ts:83           | 12.2                 |
| `EffectivePredictiveOptimizationFlag.inheritedFromName`     | model.ts:85           | 12.2                 |
| `GetSchemaRequest.fullNameArg`                              | model.ts:90           | 3.1, 10.4, 16.3      |
| `ListSchemasRequest`                                        | model.ts:95           | —                    |
| `ListSchemasRequest.maxResults`                             | model.ts:105          | —                    |
| `ListSchemasRequest.pageToken`                              | model.ts:107          | —                    |
| `ListSchemasRequest.includeBrowse`                          | model.ts:109          | —                    |
| `SchemaInfo`                                                | model.ts:124          | 6.1, 8.6, 16.1       |
| `SchemaInfo.name`                                           | model.ts:126          | 8.2                  |
| `SchemaInfo.fullName`                                       | model.ts:140          | 4.2, 8.2             |
| `SchemaInfo.catalogType`                                    | model.ts:150          | 13.1                 |
| `SchemaInfo.effectivePredictiveOptimizationFlag`            | model.ts:153          | 5.1, 17.2            |
| `SchemaInfo.schemaId`                                       | model.ts:157          | 12.1                 |
| `SchemaInfo.properties` / `.options`                        | model.ts:161, 163     | 4.3, 7.1, 8.1, 14.1  |
| `UpdateSchemaRequest`                                       | model.ts:178          | 8.3, 8.6, 10.1, 10.2 |
| `UpdateSchemaRequest.fullNameArg`                           | model.ts:180          | 3.1, 8.3, 10.1, 16.3 |
| `UpdateSchemaRequest.newName`                               | model.ts:182          | 10.1                 |
| `UpdateSchemaRequest.name`                                  | model.ts:184          | 8.2, 10.1            |
| `UpdateSchemaRequest.fullName`                              | model.ts:198          | 8.2, 8.3, 10.1       |
| `UpdateSchemaRequest.effectivePredictiveOptimizationFlag`   | model.ts:211          | 5.1, 17.2            |
| `enablePredictiveOptimization` (string-typed bool)          | model.ts:27, 136, 194 | B                    |
| `Client` (bare name)                                        | client.ts:44          | 16.2                 |
| Cross-package overlap with `systemschemas`                  | (package boundary)    | 8.7, C               |

---

## Recommended priority order

1. **Fix `fullNameArg` / `fullName` / `name` / `newName` on `UpdateSchemaRequest`** — four name-like fields on the same request, the worst user-facing trap in the package. (§10.1, §3.1, §8.3)
2. **Distinguish or merge `options` and `properties`.** (§8.1, §4.3)
3. **Type `enablePredictiveOptimization` and `EffectivePredictiveOptimizationFlag.value` honestly** — either enum or boolean, not `string`. (§4.1, B)
4. **Strip read-only fields from `CreateSchemaRequest`/`UpdateSchemaRequest`.** (§10.2)
5. **Disambiguate `schemaId` vs `fullName` as identifiers** — document which is canonical. (§12.1, §8.2)
6. **Resolve the `Schema` vs zod `Schema` collision before renaming `SchemaInfo` to `Schema`.** (§6.1)
7. **Decide cross-package strategy with `systemschemas`** — at minimum document the seam. (§8.7, C)

---
