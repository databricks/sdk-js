# Naming Audit: `schemas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/schemas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — schemas (the level beneath catalogs, parents of tables/views/functions).

---

## Findings

### 1. Overly verbose

#### 1.1 `EffectivePredictiveOptimizationFlag` type name (model.ts:73)
39 characters. Consider `EffectivePredictiveOptimization` (drop the
`Flag` suffix — the type already wraps the flag) or
`EffectivePOSetting` if shortening is acceptable. See also §2.2.

---

### 2. Redundant suffixes

#### 2.1 `SchemaInfo` type name (model.ts:117)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from a resource handle; in TS the
convention is to drop it (`Schema`). Compare with `Catalog`, `Table`,
etc. in other packages. Note: dropping `Info` produces `Schema`, which
collides with the zod artifact `Schema` (a runtime validator type in
common use across the JS ecosystem) — the rename must consider that
collision before landing.

#### 2.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag` (model.ts:73)
The whole type *is* the flag; the suffix is redundant. See §1.1.

---

### 3. Reserved-word collisions

#### 3.1 `options` field on `CreateSchemaRequest`, `UpdateSchemaRequest`, `SchemaInfo` (model.ts:60, 206, 158)
`options` collides with the SDK's own `CallOptions` parameter name
used throughout the client (`createSchema(req, options)`, client.ts:76,
etc.). Not a compile error but creates cognitive load — inside
`createSchema(req, options)` the reader sees both `req.options`
(schema metadata) and `options` (call options). The cleanest fix is to
rename the client parameter to `callOptions`.

---

### 4. Field contradicting type domain

#### 4.1 `UpdateSchemaRequest` has `fullNameArg`, `fullName`, `name`, and `newName` (model.ts:163, 181, 167, 165)
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

#### 4.2 `CreateSchemaRequest` contains read-only output fields (model.ts:33-54)

`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `catalogType`, `effectivePredictiveOptimizationFlag`,
`schemaId`, `browseOnly`. These are server-populated; a creator
setting them is at best ignored. The type's domain is "create
request", but its shape contradicts that. Same mirror issue in
`UpdateSchemaRequest` (model.ts:179-200).

---

### 5. Go / Java-style names

#### 5.1 `…Info` suffix (`SchemaInfo`, `EffectivePredictiveOptimizationFlag`)
Java/Go style. TS convention is to drop it. See §2.1.

---

### 6. Proto-architectural-leak naming

#### 6.1 `EffectivePredictiveOptimizationFlag` — `Flag` wrapper suffix (model.ts:73)
- **Why:** The type is a proto-style wrapper around a tri-state value
  (`value`, `inheritedFromType`, `inheritedFromName`). `Flag` is a
  proto-wrapper marker that leaks the upstream message-modeling pattern
  into the public TS surface — the type *is* the predictive-optimization
  setting; `Flag` adds no semantic content.
- **Category:** `Wrapper`/`Adapter` suffix (proto wrapper pattern).
- **Suggested:** `EffectivePredictiveOptimization` (or, combined with
  §1.1, `PredictiveOptimization`).
- **Rationale:** TS callers care about the value and its inheritance
  source; the wrapper-ness is an implementation detail of the proto
  schema, not part of the domain vocabulary.
