# Naming Audit: `schemas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/schemas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — schemas (the level beneath catalogs, parents of tables/views/functions).

---

## Findings

### 1. Overly verbose

#### 1.1 `EffectivePredictiveOptimizationFlag` type name (model.ts:79)
39 characters. Consider `EffectivePredictiveOptimization` (drop the
`Flag` suffix — the type already wraps the flag) or
`EffectivePOSetting` if shortening is acceptable. See also §2.2.

---

### 2. Redundant suffixes

#### 2.1 `SchemaInfo` type name (model.ts:123)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from a resource handle; in TS the
convention is to drop it (`Schema`). Compare with `Catalog`, `Table`,
etc. in other packages. Note: dropping `Info` produces `Schema`, which
collides with the zod artifact `Schema` (a runtime validator type in
common use across the JS ecosystem) — the rename must consider that
collision before landing.

#### 2.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag` (model.ts:79)
The whole type *is* the flag; the suffix is redundant. See §1.1.

---

### 3. Reserved-word collisions

#### 3.1 `options` field on `CreateSchemaRequest`, `UpdateSchemaRequest`, `SchemaInfo` (model.ts:54, 162, 220)
`options` collides with the SDK's own `CallOptions` parameter name
used throughout the client (`createSchema(req, options)`, client.ts:77,
etc.). Not a compile error but creates cognitive load — inside
`createSchema(req, options)` the reader sees both `req.options`
(schema metadata) and `options` (call options). The cleanest fix is to
rename the client parameter to `callOptions`.

#### 3.2 `properties` is not reserved but conflicts with `Object` semantics
`SchemaInfo.properties` (model.ts:160) is fine but worth noting that
`properties` is a heavily-overloaded term in JS (object properties,
descriptor properties, etc.), making the name overloaded.

---

### 4. Verb-tense inconsistency

#### 4.1 Client methods: `createSchema`, `deleteSchema`, `getSchema`, `listSchemas`, `updateSchema`, `listSchemasIter`. Imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 5. Field contradicting type domain

#### 5.1 `UpdateSchemaRequest` has `fullNameArg`, `fullName`, `name`, and `newName` (model.ts:179, 183, 197, 181)
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

#### 5.2 `CreateSchemaRequest` contains read-only output fields (model.ts:32-50)
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `catalogType`, `effectivePredictiveOptimizationFlag`,
`schemaId`, `browseOnly`. These are server-populated; a creator
setting them is at best ignored. The type's domain is "create
request", but its shape contradicts that. Same mirror issue in
`UpdateSchemaRequest` (model.ts:198-216).

---

### 6. Inconsistent action verbs

Method verbs in `Client`: `createSchema`, `deleteSchema`, `getSchema`,
`listSchemas`, `updateSchema`. Verbs are consistent — standard CRUD.
No `fetch…` / `retrieve…` / `read…` outliers. No issues found.

---

### 7. Underspecified IDs

#### 7.1 `schemaId` (model.ts:48, 156, 214)
"The unique identifier of the schema." No format hint (UUID?). The
field exists alongside `fullName` (which is also a unique identifier
in a different sense). Two simultaneous IDs without disambiguation.

---

### 8. Type-suffix tautology

#### 8.1 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:6, 41, 149, 207) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 8.2 `SchemaInfo` doesn't carry a `schemaType` field — no tautology there, which is a relief.

---

### 9. Go / Java-style names

#### 9.1 `…Info` suffix (`SchemaInfo`, `EffectivePredictiveOptimizationFlag`)
Java/Go style. TS convention is to drop it. See §2.1.

---

### 10. Proto-architectural-leak naming

#### 10.1 `EffectivePredictiveOptimizationFlag` — `Flag` wrapper suffix (model.ts:79)
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

---

## Additional / cross-cutting observations

### A. The package name is plural; the entity types are singular
The package is `schemas` (plural); the model types are `Schema` (well,
`SchemaInfo` — singular). The five client methods mix:
`createSchema`/`deleteSchema`/`getSchema`/`updateSchema` (singular —
they act on one) and `listSchemas` (plural — returns many). This is
the same pattern as `catalogs`, `tables`, etc. — consistent across
the SDK.
