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
`setRegisteredModelAlias`, `updateRegisteredModel`, `updateModelVersion`)
plus two paginated iterators. The model layer is a verbatim 1:1 port of
the Go SDK, and most defects derive from upstream definitions.

The dominant naming issues are (1) the path-parameter `*Arg` suffix
applied to fields that already encode their role through documentation
(`fullNameArg`, `versionArg`, `aliasArg`), (2) proto-style underscore
nested-message names leaking into TypeScript identifiers
(`DeleteModelVersion_Response`, `ListRegisteredModels_Response`, etc.),
(3) extremely heavy `Create*`/`Update*` request shapes that include
server-populated read-only fields (`createdAt`, `createdBy`, `updatedAt`,
`updatedBy`, `fullName`, `metastoreId`, `storageLocation`, `browseOnly`),
(4) collision-prone parallel concept naming versus the legacy
`modelregistry` package, and (5) singular/plural and redundant-prefix
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

#### 1.2 `ModelVersionInfo.source` (model.ts:228)
`source` is a free-form string whose documentation reveals it is "URI
indicating the location of the source artifacts (files) for the model
version". A field named `source` on a model object is ambiguous —
`sourceUri`, `artifactUri`, or `artifactLocation` would communicate type
and purpose. The same misnaming appears on `UpdateModelVersion.source`
(model.ts:347).

#### 1.3 `RegisteredModelAliasInfo.id` (model.ts:274), `ModelVersionInfo.id` (model.ts:263)
Both `RegisteredModelInfo`-adjacent payloads use bare `id` for two
*different* identifier kinds (the alias and the model version). The
reader cannot tell from the call site whether `info.id` is the alias's
identifier or the model version's identifier. Prefer `aliasId` and
`modelVersionId` to disambiguate (see also §16.1, §16.2).

#### 1.4 `ModelVersionInfo.version` (model.ts:251), `UpdateModelVersion.version` (model.ts:370)
A field on a "model version" type called `version` is doubly redundant
*and* generic. The doc clarifies it is the "integer model version
number"; a name such as `versionNumber` (or the field already used
elsewhere, `versionNum`) would distinguish it from a semver-style version
string. Worse, `RegisteredModelAliasInfo` uses `versionNum` (line 272)
for the same concept — the inconsistency is internal (see §11.1).

#### 1.5 `CreateRegisteredModel.name` (model.ts:23), `RegisteredModelInfo.name` (model.ts:285)
Bare `name` on a `RegisteredModel*` shape is informationless given the
surrounding type. The doc clarifies it is "the name of the registered
model" — `modelName` or `registeredModelName` would carry the type with
the field, especially since `fullName` and `catalogName` and `schemaName`
are siblings on the same shape.

---

### 2. Redundant enum prefixes

#### 2.1 `ModelVersionStatus.MODEL_VERSION_STATUS_UNKNOWN` (model.ts:6)
The only variant prefixed with `MODEL_VERSION_STATUS_` is the unknown
sentinel; the other three variants are bare (`PENDING_REGISTRATION`,
`FAILED_REGISTRATION`, `READY`). Read aloud:
`ModelVersionStatus.MODEL_VERSION_STATUS_UNKNOWN` repeats
`MODEL_VERSION_STATUS` twice. Should be `UNKNOWN` (or `UNSPECIFIED`,
the more common proto sentinel). The inconsistency between this variant
and the others is also a §3-class problem.

---

### 3. Acronym casing inconsistencies (URI, UC, MLflow, ID)

#### 3.1 `runId` versus `Id` (model.ts:235, model.ts:263, model.ts:382)
"ID" is a two-letter initialism. Google TS style guide states that
identifiers should follow `camelCase` and treat acronyms as words. The
package uses both `runId` (one-letter run + Id, fine) and `id` (lowercase
standalone), but for `runWorkspaceId` it lowercases `Id` correctly. The
issue is that `metastoreId`, `id`, and `runId` are all lowercase, while
`URI` appears nowhere as a field name (the `source` field would have
been a candidate, see §1.2).

#### 3.2 `MLflow` in doc comments (model.ts:232-234, 351-353)
Doc comments spell it `MLflow` (correct trademark casing). No identifier
exists for MLflow here, but if one were added, follow the trademark
casing (`Mlflow*` would be wrong).

#### 3.3 `<Databricks>` placeholder leakage (model.ts:237, 356)
JSDoc contains the literal token `<Databricks>` — clearly an
unresolved template marker from the upstream generator. It will render
poorly in IDE tooltips. Not a naming issue per se, but visible in the
audit surface; documentation hygiene.

---

### 4. Underscores in TypeScript identifiers

#### 4.1 `DeleteModelVersion_Response` (model.ts:66)
Proto-style nested-message naming converted to TS verbatim. Suppressed by
an `eslint-disable` for `@typescript-eslint/naming-convention`. TS
convention is `DeleteModelVersionResponse` (no underscore). The same
pattern appears on `DeleteRegisteredModel_Response` (model.ts:74),
`DeleteRegisteredModelAlias_Response` (model.ts:84),
`ListModelVersions_Response` (model.ts:168), and
`ListRegisteredModels_Response` (model.ts:211).

Five distinct identifiers in this single file violate the naming
convention. The eslint suppression is acknowledged tech debt; the audit
must flag it nonetheless.

#### 4.2 `unmarshalDeleteModelVersion_ResponseSchema` (model.ts:447)
The schema name carries the underscore through, since schemas are named
`unmarshal<TypeName>Schema`. Four additional instances:
`unmarshalDeleteRegisteredModel_ResponseSchema` (line 451),
`unmarshalDeleteRegisteredModelAlias_ResponseSchema` (line 455),
`unmarshalListModelVersions_ResponseSchema` (line 502), and
`unmarshalListRegisteredModels_ResponseSchema` (line 516).

#### 4.3 Wire-format field names embedded as object keys
Throughout the marshal/unmarshal schemas (model.ts:431-905), the input
side uses `snake_case` keys (`connection_name`, `model_version_dependencies`,
`run_workspace_id`, `next_page_token`, etc.). This is correct — these
are wire-format keys, not TS identifiers, so they are exempt. Documenting
here for completeness.

---

### 5. Cryptic abbreviations

#### 5.1 `fullNameArg`, `versionArg`, `aliasArg` (model.ts:60, 62, 70, 78, 80, 123, 125, 134, 136, 143, 152, 322, 324, 337, 339, 389)
The `Arg` suffix is utterly cryptic to anyone outside the SDK team. It
hails from the upstream Go generator marking path-parameter fields. In
TypeScript identifiers like `fullNameArg`, `versionArg`, and `aliasArg`
read like leftover scaffolding. The path-parameter nature is invisible
to users and already documented prose-style ("The three-level (fully
qualified) name of the registered model"). Recommended names:
`fullName`, `version`, and `alias` — but those collide with response
fields, which is the actual problem (see §13.1 below). The right fix is
to drop the path-parameter fields from the request type entirely and
accept them as method positional arguments (mirroring how `getModelVersion`
already URL-encodes them).

#### 5.2 `runId`, `runWorkspaceId` (model.ts:235, 240)
`runId` is conventional (MLflow run identifier), but in TS the
abbreviation chain `run` + `Id` reads oddly when paired with
`runWorkspaceId`. Consider `mlflowRunId` and `mlflowRunWorkspaceId` since
the doc comments already qualify these as MLflow-specific.

#### 5.3 `versionNum` (model.ts:272, 326, 588, 798)
`Num` is a cryptic abbreviation for `Number`. Either spell out (`versionNumber`)
or drop entirely (`version` — but that collides with the model-version
field; see §11.1).

---

### 6. Misleading names

#### 6.1 `RegisteredModelAliasInfo.modelName` (model.ts:276)
The doc says "The name of the parent registered model of the model
version, relative to parent schema". This field is the *parent registered
model's* name, but the property is called `modelName` and lives on an
*alias* type that already nests under `RegisteredModelInfo`. A reader
sees `aliasInfo.modelName` and reasonably assumes it is the alias's own
model handle. Better: `parentModelName` or, since the alias is *on* the
registered model, simply omit the field (the parent is already known
from context).

#### 6.2 `RegisteredModelAliasInfo.id` versus `RegisteredModelAliasInfo.aliasName` (model.ts:270, 274)
Two identifier-shaped fields on the same shape; the doc on `id` ("unique
identifier of the alias") suggests an internal opaque UUID, while
`aliasName` is the human-readable handle the API uses elsewhere. Calling
both "identifier" makes intent unclear. Rename `id` to `aliasUuid` or
`aliasId` (see §16.1).

#### 6.3 `ModelVersionInfo.version` (model.ts:251)
The field name suggests a string/identifier ("v2", "v3"), but the type
is `number` and the doc clarifies it is the integer version number used
to reference the model version in API requests. The collision with
typical semantic versioning expectations is a real footgun. Rename
`versionNumber`.

---

### 7. Overly verbose names

#### 7.1 `marshalSetRegisteredModelAliasSchema` (model.ts:789)
Forty-character marshal-schema name. The verbosity flows from the
`SetRegisteredModelAlias` request type name, which itself is fine, but
worth noting that every marshal/unmarshal schema name carries this
verbosity tax.

#### 7.2 `Client.setRegisteredModelAlias` versus `Client.deleteRegisteredModelAlias` (client.ts:202, 504)
Method names hover around 30 characters. Java/Go style. In TS prefer
`setAlias` / `deleteAlias` on a `RegisteredModelsClient` whose role is
already established. The current names imply you could also call
`setUnregisteredModelAlias` or `setExperimentAlias` from the same client,
which you cannot. See also §12.1.

---

### 8. Redundant suffixes

#### 8.1 `RegisteredModelInfo` (model.ts:283), `ModelVersionInfo` (model.ts:220), `RegisteredModelAliasInfo` (model.ts:268)
The `*Info` suffix is a verbatim Go-ism. In TS the suffix adds nothing —
`RegisteredModel`, `ModelVersion`, and `RegisteredModelAlias` would be
the natural names. `*Info` is leftover from the proto/Go convention of
distinguishing a wire DTO from an in-memory entity in the same file.
TypeScript does not need the distinction. Compare with the legacy
`modelregistry` package, which uses bare names (`RegisteredModel`,
`ModelVersion`) — see §10.1.

---

### 9. Singular / plural mismatches

#### 9.1 `ListModelVersions` request, `ListModelVersions_Response.modelVersions` (model.ts:150, 169)
The request type is *plural* (`ListModelVersions`), the response
collection field is *plural* (`modelVersions`). Internally consistent.
However, the iterator method is `listModelVersionsIter` returning an
`AsyncGenerator<ModelVersionInfo>` (singular) — the singular/plural
mismatch between the iterator's name (`listModelVersions*`, plural) and
its yield type (`ModelVersionInfo`, singular) is conventional but worth
noting. Same pattern on `listRegisteredModelsIter`.

#### 9.2 `ListRegisteredModels` request paginates registered models; field is `registeredModels` (model.ts:212)
Same as 9.1; flagged for completeness.

---

### 10. Reserved-word collisions

#### 10.1 `Dependency.value.$case: 'function'` (model.ts:91-93)
`function` is a TS reserved keyword. The discriminant value happens to
be a string literal so it parses, but the projected `function` field
inside the union arm (`{$case: 'function'; function: FunctionDependency}`)
shadows the keyword. Valid TS, but it forces consumers to write
`if (dep.value.$case === 'function') { dep.value.function ... }` —
syntactically legal, ergonomically poor. The Go SDK uses
`Function FunctionDependency` (capitalized), avoiding the collision.

#### 10.2 No other reserved words observed.
`name`, `version`, `comment`, `owner`, `aliases`, `dependencies`, etc.
are all safe.

---

### 11. Duplicate concepts versus modelregistry / MLflow

#### 11.1 `RegisteredModel` (modelregistry) versus `RegisteredModelInfo` (registeredmodels)
The legacy workspace-level package `modelregistry` already exports a
`RegisteredModel` type and a `ModelVersion` type (verified in
`/home/parth.bansal/sdk-js/packages/modelregistry/src/v1/model.ts:411-420`).
The UC-resident package re-uses the same domain noun with an `Info`
suffix (`RegisteredModelInfo`, `ModelVersionInfo`). A consumer
importing both packages will hold both `RegisteredModel` (from
modelregistry) and `RegisteredModelInfo` (from registeredmodels) for
fundamentally different APIs that nonetheless model the same concept.

This is the single most confusing parallel-concept issue. Mitigations:
- Drop the `Info` suffix here so the types collide visibly and force
  an import alias (`import {RegisteredModel as UcRegisteredModel}`), or
- Adopt distinct domain nouns (`UcRegisteredModel`, `CatalogModel`).

#### 11.2 `CreateRegisteredModel` (registeredmodels) versus `CreateRegisteredModel` (modelregistry)
Same exact type name in both packages. Path-disambiguated only.
`grep -rn "CreateRegisteredModel" packages/` returns two identical
identifiers in two different namespaces; both are documented as
"Create a registered model" but mean different things. The collision
risk is identical for `DeleteRegisteredModel`, `GetModelVersion`,
`ListRegisteredModels`, and `ModelVersionStatus` (all share names with
the legacy `modelregistry` exports).

#### 11.3 `ModelVersionStatus` collision (model.ts:5)
Identical enum name in `modelregistry/src/v1/model.ts:67-77`. The
*variants* are almost identical (`PENDING_REGISTRATION`,
`FAILED_REGISTRATION`, `READY`), except `registeredmodels` adds the
sentinel `MODEL_VERSION_STATUS_UNKNOWN`. A consumer who imports both
will see two enums of the same name describing nearly-the-same lifecycle
on two different APIs. This is high-risk for runtime bugs (passing one
package's enum value into the other compiles but does not match).

#### 11.4 MLflow run linkage (`runId`, `runWorkspaceId`)
The UC model registry borrows MLflow concepts but uses generic field
names. A user familiar with MLflow's run IDs will recognise these;
others may not. Prefer `mlflowRunId` and `mlflowRunWorkspaceId` to
signal the foreign-concept boundary.

---

### 12. Verb tense / parallel inconsistency

#### 12.1 `versionNum` versus `version` (model.ts:251, 272, 326, 370)
`RegisteredModelAliasInfo.versionNum` and
`SetRegisteredModelAlias.versionNum` use `Num`. `ModelVersionInfo.version`
and `UpdateModelVersion.version` drop the suffix entirely. All four
fields are the same concept (integer model-version pointer). Pick one
spelling and apply uniformly.

#### 12.2 `name` versus `modelName` versus `fullName` (model.ts:23, 222, 285, 299, 341)
On `RegisteredModelInfo`, `name` is the *short* registered-model name,
`fullName` is the three-level identifier, and `catalogName`/`schemaName`
are the parents. On `ModelVersionInfo`, `modelName` is the parent
registered model's short name. Three different conventions for the same
class of concept (name vs modelName vs fullName). A consistent scheme —
say, `shortName`, `fullName`, `parentModelName` — would help.

#### 12.3 `nextPageToken` versus `pageToken` (model.ts:162, 174, 207, 217)
Request types use `pageToken`; response types use `nextPageToken`. This
asymmetry is conventional for cursored pagination, but the convention
should be documented somewhere (it isn't, here). Not a defect, but
flagged because it is a common reader stumbling block.

---

### 13. Go / Java-style names

#### 13.1 `Client.createRegisteredModel`, `Client.deleteRegisteredModel`, etc.
Verb + full-noun method names mirror the Go SDK's
`WorkspaceClient.RegisteredModels.Create` style. In idiomatic TS, the
client itself is namespaced (you import from `registeredmodels/v1`), so
the methods could be `create`, `delete`, `get`, `list`, `update`. The
current `createRegisteredModel` is doubly redundant with the package
name. Same for `getModelVersion`, `listRegisteredModels`,
`setRegisteredModelAlias`, `updateRegisteredModel`,
`updateModelVersion`, and so on (12 methods total).

#### 13.2 `Info` suffix everywhere
Pure Go-ism (`ServerInfo`, `WorkspaceInfo`, `RegisteredModelInfo`). See §8.1.

#### 13.3 PascalCase exported `Client` (client.ts:63)
The exported `Client` class is named bare-`Client`. Most TS SDKs export
a context-qualified name like `RegisteredModelsClient` or
`UcRegisteredModelsClient`. The bare `Client` works with the
`registeredmodels/v1` import path but causes name clashes if a consumer
imports from multiple SDK packages without aliases. Conventional Go
SDK pattern leaking into TS.

---

### 14. Generic field names losing meaning

#### 14.1 `Dependency.value` (model.ts:91)
See §1.1.

#### 14.2 Inconsistent `FullName` suffix across dependency wrappers (model.ts:18, 55, 118, 317, 332, 425)
Four of the six dependency wrapper types use a `FullName` suffix on
their single string field (`tableFullName`, `functionFullName`,
`volumeFullName`, `secretFullName`), while two do not
(`connectionName`, `credentialName`). The docs claim all six are
fully-qualified names ("Full name of the dependent connection, in the
form of `__connection_name__`"). The naming should be uniform — either
add `FullName` to `connectionName` and `credentialName`, or drop the
suffix from the other four.

#### 14.3 `CreateRegisteredModel.aliases` (model.ts:48), `UpdateRegisteredModel.aliases` (model.ts:417)
A request to *create* a model accepts a list of `RegisteredModelAliasInfo`.
Aliases are normally set on already-existing models, not at create
time. The field is also marked optional. The name `aliases` is
descriptive; the problem is that its presence in the create-request
shape is semantically odd. Flagged for shape, not just naming.

---

### 15. Field contradicting type domain

#### 15.1 `CreateRegisteredModel.{fullName, createdAt, createdBy, updatedAt, updatedBy, metastoreId}` (model.ts:37-45)
`CreateRegisteredModel` is a *request* shape, yet it includes six
server-populated fields that the client cannot meaningfully set:
- `fullName` (computed from `catalogName.schemaName.name`)
- `createdAt`, `createdBy`, `updatedAt`, `updatedBy` (server-stamped)
- `metastoreId` (resolved server-side from the host)
- `browseOnly` (response-only flag)

These fields belong on `RegisteredModelInfo` (the response). Their
presence on the create request misleads users into thinking they can
set creation timestamps or override the metastore. Same defect on
`UpdateRegisteredModel` (model.ts:387-419): all six are present plus
`name`, `catalogName`, `schemaName`, `storageLocation`, `aliases`, and
`browseOnly` — most of which are not actually updatable per the JSDoc
which says "only the name, the owner or the comment of the registered
model can be updated".

#### 15.2 `UpdateModelVersion.{createdAt, createdBy, updatedAt, updatedBy, id, metastoreId, modelName, catalogName, schemaName, source, runId, runWorkspaceId, modelVersionDependencies, status, version, storageLocation, aliases}` (model.ts:335-385)
`UpdateModelVersion` carries *every* field from `ModelVersionInfo`. The
JSDoc says "Currently only the comment of the model version can be
updated". The shape is therefore deeply misleading: it presents 17
optional fields where 16 are silently no-ops on the server. A user
setting `updateModelVersion({comment: 'x', status: ModelVersionStatus.READY})`
will see no effect from `status` but no error either.

#### 15.3 `RegisteredModelAliasInfo.{modelName, catalogName, schemaName}` (model.ts:276-281)
Three parent-locator fields on an alias type. The alias is already
nested inside `RegisteredModelInfo.aliases`, so the parent is known
from context. Embedding these makes the alias serialisable in
isolation but pollutes the shape.

---

### 16. Underspecified IDs

#### 16.1 `RegisteredModelAliasInfo.id` (model.ts:274)
"The unique identifier of the alias". No format constraint, no
mention of whether it is a UUID, a server-generated opaque token, or a
human-friendly slug. Type is `string`. Compare with the well-typed
`metastoreId` (which is also `string` but at least bound to a known
domain). Recommend `aliasId` and adding format hints in the doc.

#### 16.2 `ModelVersionInfo.id` (model.ts:263)
"The unique identifier of the model version". Same issues as 16.1.
Recommend `modelVersionId`.

#### 16.3 `RegisteredModelInfo.metastoreId` (model.ts:297) and `ModelVersionInfo.metastoreId` (model.ts:254)
"The unique identifier of the metastore". Acceptable name but worth
flagging that the format (UUID? slug?) is not specified anywhere in
the doc.

#### 16.4 `ModelVersionInfo.runWorkspaceId` (model.ts:240)
`number` typed. The doc says "ID of the Databricks workspace". Workspace
IDs in Databricks are 64-bit integers — TS `number` is only safe up to
2^53. This is a *type* concern, but the name `runWorkspaceId` does not
flag the underlying integer-width risk; consider `string` per Go's
`json:",string"` tag treatment.

---

### 17. Type-suffix tautology

#### 17.1 `RegisteredModelInfo` (model.ts:283), `ModelVersionInfo` (model.ts:220), `RegisteredModelAliasInfo` (model.ts:268)
See §8.1. The `Info` suffix is tautological because the type already
*is* the info; it does not need to be marked as such. Compare with the
parallel `modelregistry` package which uses bare `RegisteredModel` /
`ModelVersion`.

#### 17.2 `*Schema` suffix on every marshal/unmarshal export
`marshalCreateRegisteredModelSchema`, `unmarshalRegisteredModelInfoSchema`,
etc. (35+ exports). The `Schema` suffix is tautological with the
prefix `marshal`/`unmarshal` (these are always schemas). Could be
`marshalCreateRegisteredModel` and `unmarshalRegisteredModelInfo`. Not
a high-impact finding; consistency note.

---

## Cross-cutting observations

### A. Doc-comment typos

Two instances of `recieve` (sic) in `client.ts:356` and `client.ts:426`,
both in `listModelVersions` and `listRegisteredModels` JSDoc. Not a
naming issue but visible in IDE tooltips alongside every flagged
identifier.

### B. Parallel package collision risk

A consumer that imports both `modelregistry` and `registeredmodels` will
encounter colliding identifiers for: `ModelVersionStatus`,
`CreateRegisteredModel`, `DeleteModelVersion`, `DeleteModelVersion_Response`,
`DeleteRegisteredModel`, `DeleteRegisteredModel_Response`,
`GetModelVersion`, `ListRegisteredModels`, `ListRegisteredModels_Response`,
and the `Client` class. Importing both *requires* aliasing on every
single one of those names. This is the biggest practical naming defect
of the package.

### C. Request shapes leak response/server fields

`CreateRegisteredModel`, `UpdateRegisteredModel`, and especially
`UpdateModelVersion` carry the entire response shape on the request side.
This is a *type-design* defect surfaced via *naming* (a field called
`createdAt` on a "create" request is meaningless). See §15.

### D. Path-parameter fields with `Arg` suffix

`fullNameArg`, `versionArg`, `aliasArg` appear on every request type
that hits a parameterised URL. Fifteen occurrences across `model.ts`.
The suffix is incomprehensible to anyone who hasn't read the generator
source. Should either (1) drop the suffix and accept the collision with
response fields, (2) lift these fields to positional method arguments,
or (3) document the convention package-wide. See §5.1.

---

## Recommendations (priority-ordered)

1. **Drop `*Arg` suffix** on path-parameter fields; lift to positional
   method arguments where they conflict with response fields. (§5.1, §D)
2. **Remove `Info` suffix** from `RegisteredModelInfo`, `ModelVersionInfo`,
   `RegisteredModelAliasInfo`. (§8.1, §17.1)
3. **Disambiguate parallel-package collisions** with `modelregistry` —
   either re-namespace or rename types. (§11, §B)
4. **Strip server-populated fields** from `CreateRegisteredModel`,
   `UpdateRegisteredModel`, `UpdateModelVersion` request shapes. (§15, §C)
5. **Unify `versionNum` versus `version`** on a single spelling.
   (§12.1)
6. **Rename bare `id`** to `aliasId` / `modelVersionId`. (§16)
7. **Rename `source`** to `artifactUri` or `sourceUri`. (§1.2)
8. **Drop `MODEL_VERSION_STATUS_` prefix** from
   `ModelVersionStatus.UNKNOWN`. (§2.1)
9. **Fix `recieve` typos** in client.ts JSDoc. (§A)

---
