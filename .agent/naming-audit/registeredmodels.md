# Naming Audit: `registeredmodels` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/registeredmodels/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) Model Registry — the UC-resident successor
to the legacy workspace-level `modelregistry` (MLflow-style) Model Registry.

---

## Summary

The `registeredmodels` package exposes ten UC model-registry operations
(`createRegisteredModel`, `deleteRegisteredModel`, `deleteModelVersion`,
`deleteRegisteredModelAlias`, `getRegisteredModel`, `getModelVersion`,
`getModelVersionByAlias`, `listRegisteredModels`, `listModelVersions`,
`setRegisteredModelAlias`, `updateRegisteredModel`, `updateModelVersion`).
The model layer is a verbatim 1:1 port of the Go SDK, and most defects
derive from upstream definitions.

The dominant naming issues are (1) extremely heavy
`Create*Request`/`Update*Request` shapes that include server-populated
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`fullName`, `metastoreId`, `storageLocation`, `browseOnly`), and (2)
collision-prone parallel concept naming versus the legacy
`modelregistry` package.

---

## Findings

### 1. Vague / generic names

_None._

---

### 2. Sentinel enum naming inconsistency

#### 2.1 `ModelVersionStatus.MODEL_VERSION_STATUS_UNKNOWN` (model.ts:6)
The zero-value sentinel on this enum is named `MODEL_VERSION_STATUS_UNKNOWN`
while every other enum in the codebase uses `*_UNSPECIFIED` for the proto3
zero-value member. The inconsistency is internal: `UNKNOWN` reads as a
discoverable lifecycle state alongside the three real states
(`PENDING_REGISTRATION`, `FAILED_REGISTRATION`, `READY`), whereas
`UNSPECIFIED` carries the standard "value-not-set" semantics used
elsewhere. Rename to `MODEL_VERSION_STATUS_UNSPECIFIED` for consistency
with the rest of the SDK and to clarify that the value is a default
rather than an observable status.

---

### 3. Acronym casing inconsistencies (URI, UC, MLflow, ID)

#### 3.1 `runId` versus `Id` (model.ts:225, 253, 366)
"ID" is a two-letter initialism. Google TS style guide states that
identifiers should follow `camelCase` and treat acronyms as words. The
package uses both `runId` (one-letter run + Id, fine) and `id` (lowercase
standalone), but for `runWorkspaceId` it lowercases `Id` correctly. The
issue is that `metastoreId`, `id`, and `runId` are all lowercase, while
`URI` appears nowhere as a field name.

---

### 4. Cryptic abbreviations

_None._

---

### 5. Misleading names

_None._

---

### 6. Overly verbose names

_None._

---

### 7. Redundant suffixes

#### 7.1 `RegisteredModelInfo` (model.ts:273), `ModelVersionInfo` (model.ts:210), `RegisteredModelAliasInfo` (model.ts:258)
The `*Info` suffix is a verbatim Go-ism. In TS the suffix adds nothing —
`RegisteredModel`, `ModelVersion`, and `RegisteredModelAlias` would be
the natural names. `*Info` is leftover from the proto/Go convention of
distinguishing a wire DTO from an in-memory entity in the same file.
TypeScript does not need the distinction. Compare with the legacy
`modelregistry` package, which uses bare names (`RegisteredModel`,
`ModelVersion`) — see §10.1.

---

### 8. Singular / plural mismatches

#### 8.1 `ListModelVersionsRequest`, `ListModelVersionsRequest_Response.modelVersions` (model.ts:140, 159)
The request type is *plural* (`ListModelVersionsRequest`), the response
collection field is *plural* (`modelVersions`). Internally consistent.

#### 8.2 `ListRegisteredModelsRequest` paginates registered models; field is `registeredModels` (model.ts:202)
Same as 8.1; flagged for completeness.

---

### 9. Reserved-word collisions

#### 9.1 `Dependency.value.$case: 'function'` (model.ts:91-93)
`function` is a TS reserved keyword. The discriminant value happens to
be a string literal so it parses, but the projected `function` field
inside the union arm (`{$case: 'function'; function: FunctionDependency}`)
shadows the keyword. Valid TS, but it forces consumers to write
`if (dep.value.$case === 'function') { dep.value.function ... }` —
syntactically legal, ergonomically poor. The Go SDK uses
`Function FunctionDependency` (capitalized), avoiding the collision.

#### 9.2 No other reserved words observed.
`name`, `version`, `comment`, `owner`, `aliases`, `dependencies`, etc.
are all safe.

---

### 10. Duplicate concepts versus modelregistry / MLflow

#### 10.1 `RegisteredModel` (modelregistry) versus `RegisteredModelInfo` (registeredmodels)
The legacy workspace-level package `modelregistry` already exports a
`RegisteredModel` type and a `ModelVersion` type (verified in
`/home/parth.bansal/sdk-js/packages/modelregistry/src/v1/model.ts`).
The UC-resident package re-uses the same domain noun with an `Info`
suffix (`RegisteredModelInfo`, `ModelVersionInfo`). A consumer
importing both packages will hold both `RegisteredModel` (from
modelregistry) and `RegisteredModelInfo` (from registeredmodels) for
fundamentally different APIs that nonetheless model the same concept.

This is the single most confusing parallel-concept issue. Mitigations:
- Drop the `Info` suffix here so the types collide visibly and force
  an import alias (`import {RegisteredModel as UcRegisteredModel}`), or
- Adopt distinct domain nouns (`UcRegisteredModel`, `CatalogModel`).

#### 10.2 `CreateRegisteredModelRequest` (registeredmodels) versus `CreateRegisteredModelRequest` (modelregistry)
Same exact type name in both packages. Path-disambiguated only.
`grep -rn "CreateRegisteredModelRequest" packages/` returns two
identical identifiers in two different namespaces; both are documented
as "Create a registered model" but mean different things. The collision
risk is identical for `DeleteRegisteredModelRequest`,
`DeleteModelVersionRequest`, `GetModelVersionRequest`,
`ListRegisteredModelsRequest`, and `ModelVersionStatus` (all share names
with the legacy `modelregistry` exports).

#### 10.3 `ModelVersionStatus` collision (model.ts:5)
Identical enum name in `modelregistry/src/v1/model.ts`. The three real
*variants* match (`PENDING_REGISTRATION`, `FAILED_REGISTRATION`,
`READY`), but `registeredmodels` adds a `MODEL_VERSION_STATUS_UNKNOWN`
zero-value sentinel that the legacy package lacks. A consumer who
imports both will see two enums of the same name describing
nearly-the-same lifecycle on two different APIs. This is high-risk for
runtime bugs (passing one package's enum value into the other compiles
but does not match), and the divergent zero-value handling makes the
collision worse.

---

### 11. Verb tense / parallel inconsistency

_None._

---

### 12. Go / Java-style names

#### 12.1 `Info` suffix everywhere
Pure Go-ism (`ServerInfo`, `WorkspaceInfo`, `RegisteredModelInfo`). See §7.1.

#### 12.2 PascalCase exported `Client` (client.ts:63)
The exported `Client` class is named bare-`Client`. Most TS SDKs export
a context-qualified name like `RegisteredModelsClient` or
`UcRegisteredModelsClient`. The bare `Client` works with the
`registeredmodels/v1` import path but causes name clashes if a consumer
imports from multiple SDK packages without aliases. Conventional Go
SDK pattern leaking into TS.

---

### 13. Underspecified IDs

#### 13.1 `ModelVersionInfo.runWorkspaceId` (model.ts:230)
`number` typed. The doc says "ID of the Databricks workspace". Workspace
IDs in Databricks are 64-bit integers — TS `number` is only safe up to
2^53. This is a *type* concern, but the name `runWorkspaceId` does not
flag the underlying integer-width risk; consider `string` per Go's
`json:",string"` tag treatment.

---

### 14. Generic field names losing meaning

#### 14.1 `CreateRegisteredModelRequest.aliases` (model.ts:47), `UpdateRegisteredModelRequest.aliases` (model.ts:401)
A request to *create* a model accepts a list of `RegisteredModelAliasInfo`.
Aliases are normally set on already-existing models, not at create
time. The field is also marked optional. The name `aliases` is
descriptive; the problem is that its presence in the create-request
shape is semantically odd. Flagged for shape, not just naming.

---

### 15. Field contradicting type domain

#### 15.1 `CreateRegisteredModelRequest.{fullName, createdAt, createdBy, updatedAt, updatedBy, metastoreId, storageLocation, browseOnly}` (model.ts:33-49)
`CreateRegisteredModelRequest` is a *request* shape, yet it includes
server-populated fields that the client cannot meaningfully set:
- `fullName` (computed from `catalogName.schemaName.name`)
- `createdAt`, `createdBy`, `updatedAt`, `updatedBy` (server-stamped)
- `metastoreId` (resolved server-side from the host)
- `browseOnly` (response-only flag)

These fields belong on `RegisteredModelInfo` (the response). Their
presence on the create request misleads users into thinking they can
set creation timestamps or override the metastore. Same defect on
`UpdateRegisteredModelRequest` (model.ts:371-404): all six are present
plus `name`, `catalogName`, `schemaName`, `storageLocation`, `aliases`,
and `browseOnly` — most of which are not actually updatable per the
JSDoc which says "only the name, the owner or the comment of the
registered model can be updated".

#### 15.2 `UpdateModelVersionRequest.{createdAt, createdBy, updatedAt, updatedBy, id, metastoreId, modelName, catalogName, schemaName, source, runId, runWorkspaceId, modelVersionDependencies, status, version, storageLocation, aliases}` (model.ts:319-369)
`UpdateModelVersionRequest` carries *every* field from `ModelVersionInfo`.
The JSDoc says "Currently only the comment of the model version can be
updated". The shape is therefore deeply misleading: it presents 17
optional fields where 16 are silently no-ops on the server. A user
setting `updateModelVersion({comment: 'x', status: ModelVersionStatus.READY})`
will see no effect from `status` but no error either.

#### 15.3 `RegisteredModelAliasInfo.{modelName, catalogName, schemaName}` (model.ts:266-270)
Three parent-locator fields on an alias type. The alias is already
nested inside `RegisteredModelInfo.aliases`, so the parent is known
from context. Embedding these makes the alias serialisable in
isolation but pollutes the shape.

---

### 16. Type-suffix tautology

#### 16.1 `RegisteredModelInfo` (model.ts:273), `ModelVersionInfo` (model.ts:210), `RegisteredModelAliasInfo` (model.ts:258)
See §7.1. The `Info` suffix is tautological because the type already
*is* the info; it does not need to be marked as such. Compare with the
parallel `modelregistry` package which uses bare `RegisteredModel` /
`ModelVersion`.

---

### 17. Proto-architectural leaks

#### 17.1 `DeleteModelVersionRequest_Response` — model.ts:66
- **Why:** Underscore-separated identifier signals a nested protobuf
  message (`message DeleteModelVersionRequest { message Response { ... } }`).
  The transport encoding has bled into the public type name and the
  `eslint-disable` comment on the same line acknowledges it explicitly
  as "Proto-style nested message name".
- **Category:** Proto suffix/infix.
- **Suggested:** `DeleteModelVersionResponse` (or `void` since the body
  is empty).
- **Rationale:** TS callers have no nesting; a flat name keeps the
  public surface free of proto-nested origin markers.

#### 17.2 `DeleteRegisteredModelAliasRequest_Response` — model.ts:76
- **Why:** Same proto-nested-message pattern as 17.1; empty body, only
  the type name carries the leak.
- **Category:** Proto suffix/infix.
- **Suggested:** `DeleteRegisteredModelAliasResponse` (or `void`).
- **Rationale:** See 17.1.

#### 17.3 `DeleteRegisteredModelRequest_Response` — model.ts:84
- **Why:** Same proto-nested-message pattern as 17.1; empty body.
- **Category:** Proto suffix/infix.
- **Suggested:** `DeleteRegisteredModelResponse` (or `void`).
- **Rationale:** See 17.1.

#### 17.4 `ListModelVersionsRequest_Response` — model.ts:158
- **Why:** Underscore-separated identifier signals a nested protobuf
  response message embedded under the request. The `eslint-disable`
  comment on the same line acknowledges it explicitly.
- **Category:** Proto suffix/infix.
- **Suggested:** `ListModelVersionsResponse`.
- **Rationale:** See 17.1.

#### 17.5 `ListRegisteredModelsRequest_Response` — model.ts:201
- **Why:** Same proto-nested-message pattern as 17.4.
- **Category:** Proto suffix/infix.
- **Suggested:** `ListRegisteredModelsResponse`.
- **Rationale:** See 17.1.

---

## Cross-cutting observations

### A. Parallel package collision risk

A consumer that imports both `modelregistry` and `registeredmodels` will
encounter colliding identifiers for: `ModelVersionStatus`,
`CreateRegisteredModelRequest`, `DeleteModelVersionRequest`,
`DeleteRegisteredModelRequest`, `GetModelVersionRequest`,
`ListRegisteredModelsRequest`, and the `Client` class.
Importing both *requires* aliasing on every single one of those names.
This is the biggest practical naming defect of the package.

### B. Request shapes leak response/server fields

`CreateRegisteredModelRequest`, `UpdateRegisteredModelRequest`, and
especially `UpdateModelVersionRequest` carry the entire response shape
on the request side. This is a *type-design* defect surfaced via
*naming* (a field called `createdAt` on a "create" request is
meaningless). See §15.

---

## Recommendations (priority-ordered)

1. **Remove `Info` suffix** from `RegisteredModelInfo`, `ModelVersionInfo`,
   `RegisteredModelAliasInfo`. (§7.1, §16.1)
2. **Disambiguate parallel-package collisions** with `modelregistry` —
   either re-namespace or rename types. (§10, §A)
3. **Strip server-populated fields** from `CreateRegisteredModelRequest`,
   `UpdateRegisteredModelRequest`, `UpdateModelVersionRequest` request
   shapes. (§15, §B)
4. **Rename `MODEL_VERSION_STATUS_UNKNOWN`** to
   `MODEL_VERSION_STATUS_UNSPECIFIED` for consistency with the rest of
   the SDK's zero-value enum members. (§2.1)

---
