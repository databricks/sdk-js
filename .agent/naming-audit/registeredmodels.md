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

The dominant naming issues are (1) the path-parameter `*Arg` suffix
applied to fields that already encode their role through documentation
(`fullNameArg`, `versionArg`, `aliasArg`), (2) extremely heavy
`Create*Request`/`Update*Request` shapes that include server-populated
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`fullName`, `metastoreId`, `storageLocation`, `browseOnly`), (3)
collision-prone parallel concept naming versus the legacy
`modelregistry` package, and (4) singular/plural and redundant-prefix
problems on field names such as `versionNum`, `aliasName`, and
`modelName` inside `RegisteredModelAliasInfo`.

---

## Findings

### 1. Vague / generic names

#### 1.1 `Dependency.value` (model.ts:91)
The discriminated-union body is wrapped in a generic `value` field — the
field carries the entire payload yet conveys no semantics. Most other
discriminated unions in the SDK either inline the `$case`/payload at the
top level or use a domain noun (`dependency`, `target`, `subject`). The
double-nesting (`d.value.$case === 'table'`, then `.table`) compounds the
opacity. Either drop the wrapper (move `$case` to the top of
`Dependency`) or rename to `dependency` so the access path reads
`dep.dependency.$case`.

#### 1.2 `ModelVersionInfo.source` (model.ts:218), `UpdateModelVersionRequest.source` (model.ts:331)
`source` is a free-form string whose documentation reveals it is "URI
indicating the location of the source artifacts (files) for the model
version". A field named `source` on a model object is ambiguous —
`sourceUri`, `artifactUri`, or `artifactLocation` would communicate type
and purpose. The same misnaming appears on `UpdateModelVersionRequest.source`.

#### 1.3 `RegisteredModelAliasInfo.id` (model.ts:264), `ModelVersionInfo.id` (model.ts:253)
Both `RegisteredModelInfo`-adjacent payloads use bare `id` for two
*different* identifier kinds (the alias and the model version). The
reader cannot tell from the call site whether `info.id` is the alias's
identifier or the model version's identifier. Prefer `aliasId` and
`modelVersionId` to disambiguate (see also §13.1, §13.2).

#### 1.4 `ModelVersionInfo.version` (model.ts:241), `UpdateModelVersionRequest.version` (model.ts:354)
A field on a "model version" type called `version` is doubly redundant
*and* generic. The doc clarifies it is the "integer model version
number"; a name such as `versionNumber` (or the field already used
elsewhere, `versionNum`) would distinguish it from a semver-style version
string. Worse, `RegisteredModelAliasInfo` uses `versionNum` (line 262)
for the same concept — the inconsistency is internal (see §11.1).

#### 1.5 `CreateRegisteredModelRequest.name` (model.ts:23), `RegisteredModelInfo.name` (model.ts:274)
Bare `name` on a `RegisteredModel*` shape is informationless given the
surrounding type. The doc clarifies it is "the name of the registered
model" — `modelName` or `registeredModelName` would carry the type with
the field, especially since `fullName` and `catalogName` and `schemaName`
are siblings on the same shape.

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
`URI` appears nowhere as a field name (the `source` field would have
been a candidate, see §1.2).

#### 3.2 `MLflow` in doc comments (model.ts:222-223, 335-336)
Doc comments spell it `MLflow` (correct trademark casing). No identifier
exists for MLflow here, but if one were added, follow the trademark
casing (`Mlflow*` would be wrong).

#### 3.3 `<Databricks>` placeholder leakage (model.ts:227, 340)
JSDoc contains the literal token `<Databricks>` — clearly an
unresolved template marker from the upstream generator. It will render
poorly in IDE tooltips. Not a naming issue per se, but visible in the
audit surface; documentation hygiene.

---

### 4. Cryptic abbreviations

#### 4.1 `fullNameArg`, `versionArg`, `aliasArg` (model.ts:60, 62, 70, 72, 80, 113, 115, 122, 124, 133, 142, 306, 308, 321, 323, 373)
The `Arg` suffix is utterly cryptic to anyone outside the SDK team. It
hails from the upstream Go generator marking path-parameter fields. In
TypeScript identifiers like `fullNameArg`, `versionArg`, and `aliasArg`
read like leftover scaffolding. The path-parameter nature is invisible
to users and already documented prose-style ("The three-level (fully
qualified) name of the registered model"). Recommended names:
`fullName`, `version`, and `alias` — but those collide with response
fields, which is the actual problem (see §15 below). The right fix is
to drop the path-parameter fields from the request type entirely and
accept them as method positional arguments (mirroring how `getModelVersion`
already URL-encodes them).

#### 4.2 `runId`, `runWorkspaceId` (model.ts:225, 230)
`runId` is conventional (MLflow run identifier), but in TS the
abbreviation chain `run` + `Id` reads oddly when paired with
`runWorkspaceId`. Consider `mlflowRunId` and `mlflowRunWorkspaceId` since
the doc comments already qualify these as MLflow-specific.

#### 4.3 `versionNum` (model.ts:262, 310, 559, 712, 720, 731, 736)
`Num` is a cryptic abbreviation for `Number`. Either spell out (`versionNumber`)
or drop entirely (`version` — but that collides with the model-version
field; see §11.1).

---

### 5. Misleading names

#### 5.1 `RegisteredModelAliasInfo.modelName` (model.ts:266)
The doc says "The name of the parent registered model of the model
version, relative to parent schema". This field is the *parent registered
model's* name, but the property is called `modelName` and lives on an
*alias* type that already nests under `RegisteredModelInfo`. A reader
sees `aliasInfo.modelName` and reasonably assumes it is the alias's own
model handle. Better: `parentModelName` or, since the alias is *on* the
registered model, simply omit the field (the parent is already known
from context).

#### 5.2 `RegisteredModelAliasInfo.id` versus `RegisteredModelAliasInfo.aliasName` (model.ts:260, 264)
Two identifier-shaped fields on the same shape; the doc on `id` ("unique
identifier of the alias") suggests an internal opaque UUID, while
`aliasName` is the human-readable handle the API uses elsewhere. Calling
both "identifier" makes intent unclear. Rename `id` to `aliasUuid` or
`aliasId` (see §13.1).

#### 5.3 `ModelVersionInfo.version` (model.ts:241)
The field name suggests a string/identifier ("v2", "v3"), but the type
is `number` and the doc clarifies it is the integer version number used
to reference the model version in API requests. The collision with
typical semantic versioning expectations is a real footgun. Rename
`versionNumber`.

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

#### 10.4 MLflow run linkage (`runId`, `runWorkspaceId`)
The UC model registry borrows MLflow concepts but uses generic field
names. A user familiar with MLflow's run IDs will recognise these;
others may not. Prefer `mlflowRunId` and `mlflowRunWorkspaceId` to
signal the foreign-concept boundary.

---

### 11. Verb tense / parallel inconsistency

#### 11.1 `versionNum` versus `version` (model.ts:241, 262, 310, 354)
`RegisteredModelAliasInfo.versionNum` and
`SetRegisteredModelAliasRequest.versionNum` use `Num`.
`ModelVersionInfo.version` and `UpdateModelVersionRequest.version` drop
the suffix entirely. All four fields are the same concept (integer
model-version pointer). Pick one spelling and apply uniformly.

#### 11.2 `name` versus `modelName` versus `fullName` (model.ts:23, 212, 274, 289, 325)
On `RegisteredModelInfo`, `name` is the *short* registered-model name,
`fullName` is the three-level identifier, and `catalogName`/`schemaName`
are the parents. On `ModelVersionInfo`, `modelName` is the parent
registered model's short name. Three different conventions for the same
class of concept (name vs modelName vs fullName). A consistent scheme —
say, `shortName`, `fullName`, `parentModelName` — would help.

#### 11.3 `nextPageToken` versus `pageToken` (model.ts:152, 164, 197, 207)
Request types use `pageToken`; response types use `nextPageToken`. This
asymmetry is conventional for cursored pagination, but the convention
should be documented somewhere (it isn't, here). Not a defect, but
flagged because it is a common reader stumbling block.

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

#### 13.1 `RegisteredModelAliasInfo.id` (model.ts:264)
"The unique identifier of the alias". No format constraint, no
mention of whether it is a UUID, a server-generated opaque token, or a
human-friendly slug. Type is `string`. Compare with the well-typed
`metastoreId` (which is also `string` but at least bound to a known
domain). Recommend `aliasId` and adding format hints in the doc.

#### 13.2 `ModelVersionInfo.id` (model.ts:253)
"The unique identifier of the model version". Same issues as 13.1.
Recommend `modelVersionId`.

#### 13.3 `RegisteredModelInfo.metastoreId` (model.ts:287) and `ModelVersionInfo.metastoreId` (model.ts:245)
"The unique identifier of the metastore". Acceptable name but worth
flagging that the format (UUID? slug?) is not specified anywhere in
the doc.

#### 13.4 `ModelVersionInfo.runWorkspaceId` (model.ts:230)
`number` typed. The doc says "ID of the Databricks workspace". Workspace
IDs in Databricks are 64-bit integers — TS `number` is only safe up to
2^53. This is a *type* concern, but the name `runWorkspaceId` does not
flag the underlying integer-width risk; consider `string` per Go's
`json:",string"` tag treatment.

---

### 14. Generic field names losing meaning

#### 14.1 `Dependency.value` (model.ts:91)
See §1.1.

#### 14.2 Inconsistent `FullName` suffix across dependency wrappers (model.ts:18, 55, 108, 316)
Two of the four dependency wrapper types use a `FullName` suffix on
their single string field (`tableFullName`, `functionFullName`), while
two do not (`connectionName`, `credentialName`). The docs claim all
four are fully-qualified names ("Full name of the dependent connection,
in the form of `__connection_name__`"). The naming should be uniform —
either add `FullName` to `connectionName` and `credentialName`, or drop
the suffix from the other two.

#### 14.3 `CreateRegisteredModelRequest.aliases` (model.ts:47), `UpdateRegisteredModelRequest.aliases` (model.ts:401)
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

### A. Doc-comment typos

Two instances of `recieve` (sic) in `client.ts:356` and `client.ts:429`,
both in `listModelVersions` and `listRegisteredModels` JSDoc. Not a
naming issue but visible in IDE tooltips alongside every flagged
identifier.

### B. Parallel package collision risk

A consumer that imports both `modelregistry` and `registeredmodels` will
encounter colliding identifiers for: `ModelVersionStatus`,
`CreateRegisteredModelRequest`, `DeleteModelVersionRequest`,
`DeleteRegisteredModelRequest`, `GetModelVersionRequest`,
`ListRegisteredModelsRequest`, and the `Client` class.
Importing both *requires* aliasing on every single one of those names.
This is the biggest practical naming defect of the package.

### C. Request shapes leak response/server fields

`CreateRegisteredModelRequest`, `UpdateRegisteredModelRequest`, and
especially `UpdateModelVersionRequest` carry the entire response shape
on the request side. This is a *type-design* defect surfaced via
*naming* (a field called `createdAt` on a "create" request is
meaningless). See §15.

### D. Path-parameter fields with `Arg` suffix

`fullNameArg`, `versionArg`, `aliasArg` appear on every request type
that hits a parameterised URL. Sixteen occurrences across `model.ts`.
The suffix is incomprehensible to anyone who hasn't read the generator
source. Should either (1) drop the suffix and accept the collision with
response fields, (2) lift these fields to positional method arguments,
or (3) document the convention package-wide. See §4.1.

---

## Recommendations (priority-ordered)

1. **Drop `*Arg` suffix** on path-parameter fields; lift to positional
   method arguments where they conflict with response fields. (§4.1, §D)
2. **Remove `Info` suffix** from `RegisteredModelInfo`, `ModelVersionInfo`,
   `RegisteredModelAliasInfo`. (§7.1, §16.1)
3. **Disambiguate parallel-package collisions** with `modelregistry` —
   either re-namespace or rename types. (§10, §B)
4. **Strip server-populated fields** from `CreateRegisteredModelRequest`,
   `UpdateRegisteredModelRequest`, `UpdateModelVersionRequest` request
   shapes. (§15, §C)
5. **Unify `versionNum` versus `version`** on a single spelling.
   (§11.1)
6. **Rename bare `id`** to `aliasId` / `modelVersionId`. (§13)
7. **Rename `source`** to `artifactUri` or `sourceUri`. (§1.2)
8. **Rename `MODEL_VERSION_STATUS_UNKNOWN`** to
   `MODEL_VERSION_STATUS_UNSPECIFIED` for consistency with the rest of
   the SDK's zero-value enum members. (§2.1)
9. **Fix `recieve` typos** in client.ts JSDoc. (§A)

---

## Fixed

_None._
