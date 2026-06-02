# Naming Audit: `registeredmodels` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/registeredmodels/`
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

The dominant naming issue is extremely heavy
`Create*Request`/`Update*Request` shapes that include server-populated
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`fullName`, `metastoreId`, `storageLocation`, `browseOnly`).

---

## Findings

### 1. Redundant suffixes

#### 1.1 `RegisteredModelInfo` (model.ts:271), `ModelVersionInfo` (model.ts:208), `RegisteredModelAliasInfo` (model.ts:256)
The `*Info` suffix is a verbatim Go-ism. In TS the suffix adds nothing —
`RegisteredModel`, `ModelVersion`, and `RegisteredModelAlias` would be
the natural names. `*Info` is leftover from the proto/Go convention of
distinguishing a wire DTO from an in-memory entity in the same file.
TypeScript does not need the distinction.

---

### 2. Singular / plural mismatches

#### 2.1 `ListModelVersionsRequest`, `ListModelVersionsResponse.modelVersions` (model.ts:140, 158)
The request type is *plural* (`ListModelVersionsRequest`), the response
collection field is *plural* (`modelVersions`). Internally consistent.

#### 2.2 `ListRegisteredModelsRequest` paginates registered models; field is `registeredModels` (model.ts:200)
Same as 2.1; flagged for completeness.

---

### 3. Go / Java-style names

#### 3.1 `Info` suffix everywhere
Pure Go-ism (`ServerInfo`, `WorkspaceInfo`, `RegisteredModelInfo`). See §1.1.

---

### 4. Generic field names losing meaning

#### 4.1 `CreateRegisteredModelRequest.aliases` (model.ts:47), `UpdateRegisteredModelRequest.aliases` (model.ts:399)
A request to *create* a model accepts a list of `RegisteredModelAliasInfo`.
Aliases are normally set on already-existing models, not at create
time. The field is also marked optional. The name `aliases` is
descriptive; the problem is that its presence in the create-request
shape is semantically odd. Flagged for shape, not just naming.

---

### 5. Field contradicting type domain

#### 5.1 `CreateRegisteredModelRequest.{fullName, createdAt, createdBy, updatedAt, updatedBy, metastoreId, storageLocation, browseOnly}` (model.ts:33-49)
`CreateRegisteredModelRequest` is a *request* shape, yet it includes
server-populated fields that the client cannot meaningfully set:
- `fullName` (computed from `catalogName.schemaName.name`)
- `createdAt`, `createdBy`, `updatedAt`, `updatedBy` (server-stamped)
- `metastoreId` (resolved server-side from the host)
- `browseOnly` (response-only flag)

These fields belong on `RegisteredModelInfo` (the response). Their
presence on the create request misleads users into thinking they can
set creation timestamps or override the metastore. Same defect on
`UpdateRegisteredModelRequest` (model.ts:371-401): all six are present
plus `name`, `catalogName`, `schemaName`, `storageLocation`, `aliases`,
and `browseOnly` — most of which are not actually updatable.

#### 5.2 `UpdateModelVersionRequest.{createdAt, createdBy, updatedAt, updatedBy, id, metastoreId, modelName, catalogName, schemaName, source, runId, runWorkspaceId, modelVersionDependencies, status, version, storageLocation, aliases}` (model.ts:319-366)
`UpdateModelVersionRequest` carries *every* field from `ModelVersionInfo`.
Only the comment of the model version can be updated. The shape is
therefore deeply misleading: it presents 17 optional fields where 16 are
silently no-ops on the server. A user setting
`updateModelVersion({comment: 'x', status: ModelVersionStatus.READY})`
will see no effect from `status` but no error either.

#### 5.3 `RegisteredModelAliasInfo.{modelName, catalogName, schemaName}` (model.ts:264-268)
Three parent-locator fields on an alias type. The alias is already
nested inside `RegisteredModelInfo.aliases`, so the parent is known
from context. Embedding these makes the alias serialisable in
isolation but pollutes the shape.

---

### 6. Type-suffix tautology

#### 6.1 `RegisteredModelInfo` (model.ts:271), `ModelVersionInfo` (model.ts:208), `RegisteredModelAliasInfo` (model.ts:256)
See §1.1. The `Info` suffix is tautological because the type already
*is* the info; it does not need to be marked as such.

---

## Cross-cutting observations

### A. Request shapes leak response/server fields

`CreateRegisteredModelRequest`, `UpdateRegisteredModelRequest`, and
especially `UpdateModelVersionRequest` carry the entire response shape
on the request side. This is a *type-design* defect surfaced via
*naming* (a field called `createdAt` on a "create" request is
meaningless). See §5.

---

## Recommendations (priority-ordered)

1. **Remove `Info` suffix** from `RegisteredModelInfo`, `ModelVersionInfo`,
   `RegisteredModelAliasInfo`. (§1.1, §6.1)
2. **Strip server-populated fields** from `CreateRegisteredModelRequest`,
   `UpdateRegisteredModelRequest`, `UpdateModelVersionRequest` request
   shapes. (§5, §A)

---
