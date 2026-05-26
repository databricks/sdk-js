# Naming Audit: `endpoints` (v1)

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Package:** `@databricks/sdk-vectorsearch` (formerly `@databricks/sdk-endpoints`)
**Path:** `/home/parth.bansal/sdk-js/packages/vectorsearch/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist plus a special section on the package name itself. The
package was previously named `@databricks/sdk-endpoints`; in the
2026-05-20 regeneration the package was renamed to `@databricks/sdk-vectorsearch`
and absorbed the contents of the former `@databricks/sdk-indexes`
package. Many of the F0 findings about package ambiguity are now
fixed. Findings are grouped by category.

---

## Inventory

### Package identity

| Item            | Value                              |
| --------------- | ---------------------------------- |
| Package name    | `@databricks/sdk-vectorsearch`     |
| Directory       | `packages/vectorsearch/`           |
| Subpath export  | `./v1`                             |
| REST base path  | `/api/2.0/vector-search/endpoints` and `/indexes` |
| Concept         | Vector Search endpoints and indexes |

### Enums (`model.ts`)

| Name                            | Members                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `EndpointType`                  | `STORAGE_OPTIMIZED`, `STANDARD`                                                                            |
| `IndexSubtype`                  | `VECTOR`, `FULL_TEXT`, `HYBRID`                                                                            |
| `PipelineType`                  | `TRIGGERED`, `CONTINUOUS`                                                                                  |
| `ScalingChangeState`            | `SCALING_CHANGE_UNSPECIFIED`, `SCALING_CHANGE_APPLIED`, `SCALING_CHANGE_IN_PROGRESS`                       |
| `UpsertDeleteDataStatus`        | `SUCCESS`, `PARTIAL_SUCCESS`, `FAILURE`                                                                    |
| `VectorIndexType`               | `DELTA_SYNC`, `DIRECT_ACCESS`                                                                              |
| `EndpointStatus_State`          | `PROVISIONING`, `ONLINE`, `OFFLINE`, `RED_STATE`, `YELLOW_STATE`, `DELETED`                                |

### Interfaces (`model.ts`)

`ColumnInfo`, `CreateEndpointRequest`, `CreateVectorIndexRequest`,
`CustomTag`, `DeleteDataVectorIndexRequest`, `DeleteDataVectorIndexResponse`,
`DeleteEndpointRequest`, `DeleteEndpointResponse`, `DeleteVectorIndexRequest`,
`DeleteVectorIndexResponse`, `DeltaSyncVectorIndexSpec`,
`DeltaSyncVectorIndexSpecRequest`, `DirectAccessVectorIndexSpec`,
`EmbeddingSourceColumn`, `EmbeddingVectorColumn`, `Endpoint`,
`EndpointScalingInfo`, `EndpointStatus`, `GetEndpointRequest`,
`GetVectorIndexRequest`, `ListEndpointRequest`, `ListEndpointResponse`,
`ListValue`, `ListVectorIndexRequest`, `ListVectorIndexResponse`,
`MapStringValueEntry`, `MiniVectorIndex`, `PatchEndpointBudgetPolicyRequest`,
`PatchEndpointBudgetPolicyResponse`, `PatchEndpointRequest`,
`QueryVectorIndexNextPageRequest`, `QueryVectorIndexRequest`,
`QueryVectorIndexResponse`, `RerankerConfig`,
`RerankerConfig_RerankerParameters`, `ResultData`, `ResultManifest`,
`ScanVectorIndexRequest`, `ScanVectorIndexResponse`, `Struct`,
`SyncVectorIndexRequest`, `SyncVectorIndexResponse`,
`UpsertDataVectorIndexRequest`, `UpsertDataVectorIndexResponse`,
`UpsertDeleteDataResult`, `Value`, `VectorIndex`, `VectorIndexStatus`.

### Client methods (`client.ts`)

`createEndpoint`, `createEndpointWaiter`, `createVectorIndex`,
`deleteDataVectorIndex`, `deleteEndpoint`, `deleteVectorIndex`,
`getEndpoint`, `getVectorIndex`, `listEndpoint`, `listEndpointIter`,
`listVectorIndex`, `listVectorIndexIter`, `patchEndpoint`,
`patchEndpointBudgetPolicy`, `queryVectorIndex`,
`queryVectorIndexNextPage`, `scanVectorIndex`, `syncVectorIndex`,
`upsertDataVectorIndex`.

### Client classes (`client.ts`)

`Client`, `CreateEndpointWaiter`, `StillRunningError` (private).

### Utility functions (`utils.ts`)

`executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
`parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Utility types/interfaces (`utils.ts`)

`HttpCallOptions`.

---

## F0 — Package-level: "endpoint" is dangerously overloaded

The package rename to `@databricks/sdk-vectorsearch` resolved much of
the ambiguity called out in the original audit. Some residual concerns
remain about the unqualified `Endpoint` type name.

### F0.1 — `Endpoint` type still unqualified inside the package (MEDIUM)
- **Where:** `model.ts:274`, `index.ts:31`.
- **Why flagged:** The package rename to `vectorsearch` qualifies the
  package identity, but the exported type is still `Endpoint`. A
  consumer who imports
  `import {Endpoint} from '@databricks/sdk-vectorsearch'` and then
  passes it into a function `process(e: Endpoint)` loses the
  package-level qualification once the import is destructured.
- **Suggestion:** Rename `Endpoint` → `VectorSearchEndpoint` to mirror
  `modelserving.InferenceEndpoint`. Slightly verbose but eliminates
  the ambiguity at the type level.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `Endpoint` type name (MEDIUM)
- **Where:** `model.ts:274`, `index.ts:31`, return type of
  `createEndpoint`, `getEndpoint`, `patchEndpoint`, items of
  `listEndpointIter`.
- **Why flagged:** "Endpoint" alone is one of the most generic nouns
  in REST APIs (every URL is an endpoint). Combined with F0.1, a user
  reading `function process(e: Endpoint)` cannot tell whether this
  is a vector-search endpoint, a model-serving endpoint, or a SQL
  warehouse endpoint.
- **Suggestion:** Rename to `VectorSearchEndpoint`. Mirrors
  `modelserving.InferenceEndpoint` and provides parity
  across packages. All sibling type names (`EndpointType`,
  `EndpointStatus`, `EndpointScalingInfo`) follow.

#### F1.2 — `EndpointType` enum, `EndpointStatus` interface (MEDIUM)
- **Where:** `model.ts:18, 314`; `index.ts:6, 33`.
- **Why flagged:** Same generic-noun problem as F1.1. `Endpoint*`
  symbols collide across the monorepo (cf. `warehouses.EndpointState`,
  `modelserving.InferenceEndpoint`).
- **Suggestion:** Qualify with `VectorSearch` prefix —
  `VectorSearchEndpointType`, `VectorSearchEndpointStatus`. Or move
  these into a namespace `VectorSearchEndpoint.Status` /
  `VectorSearchEndpoint.Type`.

#### F1.3 — `Client` class name (MEDIUM, cross-cutting)
- **Where:** `client.ts:85`, `index.ts:3`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  `import {Client} from '@databricks/sdk-vectorsearch'` is unqualified
  and routinely needs `import {Client as VectorSearchClient}`
  at the call site. Project-wide pattern.
- **Suggestion:** Keep `Client` and document the per-package
  alias convention, or rename to `VectorSearchClient`
  consistently across packages. Cross-cutting decision.

#### F1.4 — `name` field everywhere (MEDIUM)
- **Where:** `model.ts:91, 98, 115, 139, 147, 161, 169, 254, 269, 276,
  323, 328, 339, 378, 403, 416, 427, 436, 512, 534, 542, 574`;
  `client.ts` throughout.
- **Why flagged:** `name` is one of the most generic identifiers
  possible. JSDoc explains "Name of the AI Search endpoint", but
  the field name alone gives no domain hint. Worse, this `name` is
  used as the *path-segment identifier* (`/endpoints/${req.name ??
  ''}`) — i.e. it is functionally an ID. Other packages call this
  `id`, `pipelineId`, etc.
- **Suggestion:** Either:
  - Rename to `endpointName` for self-documentation, or
  - Document the dual role in JSDoc on `Endpoint.name`. Note the
    `Endpoint` type already has both `name: string` and `id: string`
    — see F12.3 / F19.2 for the duplicate-identifier problem.

#### F1.5 — `req` parameter name on every client method (LOW, Go-ism)
- **Where:** `client.ts:112, 137, 149, 175, 209, 234, 259, 284, 318,
  348, 366, 399, 417, 443, 475, 501, 530, 556, 582`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). See F14.1.

#### F1.6 — `state` field on `EndpointScalingInfo` and `EndpointStatus` (LOW)
- **Where:** `model.ts:305, 316`.
- **Why flagged:** `state` is generic. Disambiguated by container
  type, but `scalingState` / `endpointState` would be clearer in
  isolation.
- **Suggestion:** Acceptable as-is given the containing type; leave.

#### F1.7 — `message` field on `EndpointStatus` and `VectorIndexStatus` (LOW)
- **Where:** `model.ts:318, 599`.
- **Why flagged:** Generic. Compare `statusMessage`,
  `errorMessage`.
- **Suggestion:** Add JSDoc clarifying purpose; rename optional.

#### F1.8 — `Call`, `Options` (imported, cross-package) (acceptable)
- **Where:** `utils.ts:3-5`, `client.ts:4-5`.
- These come from `@databricks/sdk-core/api`. Generic but
  intentional. Out of scope for this package's audit.

---

### 2. Redundant enum prefixes

#### F2.1 — `EndpointStatus_State.RED_STATE`, `YELLOW_STATE` (MEDIUM)
- **Where:** `model.ts:79-80`.
- **Why flagged:** `_STATE` is redundant — the enum is already
  `EndpointStatus_State`. Reads `EndpointStatus_State.RED_STATE` —
  "endpoint status state . red state". Other members in the same
  enum (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) do not
  carry the suffix; so this is also inconsistent within the enum.
- **Suggestion:** Wire strings are `RED_STATE` / `YELLOW_STATE`, so
  parity needs the suffix. If the wire allows, rename to `RED` /
  `YELLOW`. Otherwise, document the asymmetry. Worth fixing at the
  spec level.

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (acceptable, cross-cutting)
- **Where:** `model.ts:102, 104, 188, 220, 288, 294, 296, 405, 409,
  411`.
- **Why flagged:** Field uses `id`, `budgetPolicyId`,
  `effectiveBudgetPolicyId`, `usagePolicyId`, `pipelineId` — consistent
  lower-camel `Id`. This matches the SDK-wide convention.
- **Suggestion:** No change.

#### F3.2 — `QPS` rendered as `Qps` (MEDIUM)
- **Where:**
  - `CreateEndpointRequest.targetQps` (`model.ts:110`)
  - `EndpointScalingInfo.requestedTargetQps` (`model.ts:310`)
  - `PatchEndpointRequest.targetQps` (`model.ts:421`)
- **Why flagged:** "QPS" (queries per second) is a TLA. The SDK
  applies "first letter cap, rest lower" for camelCase — so `Qps`
  here. The JSDoc uses "QPS" (uppercase) and the wire form is
  `target_qps`. So `Qps` is consistent with `Http`/`Url`
  casing for acronyms; flag is only against the JSDoc/comment mix.
- **Suggestion:** Standardize comments to use `QPS` consistently when
  the prose is talking about the term, and `targetQps` for the TS
  identifier. Or rename to `targetQueriesPerSecond` (verbose but
  self-documenting).

#### F3.3 — `URL` / `Url` (acceptable for this file)
- `client.ts:115, 152, 178, 184, 212, 237, 262, 287, 296, 321, 327,
  369, 378, 420, 446, 478, 504, 533, 559, 585` uses lowercase
  `url` consistently. No casing inconsistency.

#### F3.4 — `JSON` rendered as `Json` (acceptable)
- **Where:** `model.ts:247, 452, 544`; `inputsJson`, `schemaJson`,
  `filtersJson`.
- Matches SDK-wide convention; no change.

---

### 4. Underscores in TS identifiers

_None._

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts:112, 137, 149, 175, 209, 234, 259, 284, 318,
  348, 366, 399, 417, 443, 475, 501, 530, 556, 582` plus
  `client.ts:351, 360, 402, 411`.
- **Why flagged:** Already flagged under F1.5 / F14.1.

#### F5.2 — `resp` / `respBody` (LOW, Go-ism)
- **Where:** `client.ts:117, 122, 127, 130, 154, 159, 164, 167, 185,
  190, 195, 201, 213, 218, 223, 226, 238, 243, 248, 251, 263, 268,
  273, 276, 297, 302, 307, 310, 328, 333, 338, 341, 353, 379, 384,
  389, 392, 404, 422, 427, 432, 435, 451, 456, 461, 467, 480, 485,
  490, 493, 509, 514, 519, 522, 535, 540, 545, 548, 561, 566, 571,
  574, 587, 592, 597, 603, 625, 666`.
- **Why flagged:** `response` is two extra characters and unambiguous.
- **Suggestion:** `response`, `responseBody`.

#### F5.3 — `pollResp` (LOW)
- **Where:** `client.ts:625, 632, 642, 666, 673`.
- **Why flagged:** Same `resp` Go-ism inside the waiter.
- **Suggestion:** `pollResponse`.

#### F5.4 — `httpReq` (LOW)
- **Where:** `client.ts:121, 158, 189, 217, 242, 267, 301, 332, 383,
  426, 455, 484, 513, 539, 565, 591`.
- **Why flagged:** `httpRequest` is clearer and matches the type
  `HttpRequest` exactly.
- **Suggestion:** `httpRequest`.

#### F5.5 — `apiErr` (LOW)
- **Where:** `utils.ts:88-91`.
- **Why flagged:** `apiError` reads better; "err" is a Go-ism.
- **Suggestion:** `apiError`.

#### F5.6 — `pkgJson` (LOW)
- **Where:** `client.ts:20, 79-80`.
- **Why flagged:** "pkg" abbreviation. `packageJson` is two extra
  characters and unambiguous.
- **Suggestion:** `packageJson`.

#### F5.7 — `msg` (LOW)
- **Where:** `client.ts:642-643`.
  ```ts
  const msg = pollResp.endpointStatus?.message ?? '(no message)';
  throw new Error(`terminal state ${status}: ${msg}`);
  ```
- **Why flagged:** `message` is the source field name. Inlining
  `pollResp.endpointStatus?.message` is also acceptable.
- **Suggestion:** `message` or inline.

#### F5.8 — `acc`, `val`, `opts`, `e` (LOW)
- **Where:** `utils.ts:55, 137, 30, 65-92, 76`.
- **Why flagged:** Same as in `budgets` audit (F5.7 there).
  - `acc` in reduce — conventional. OK.
  - `val` in destructure — OK.
  - `opts` — Go-ism but widely used in JS libs.
    **Inconsistent within the package:** parameter is `options` in
    `executeCall` (utils.ts:28), but `opts` inside `executeHttpCall`
    (utils.ts:67-92).
  - `e` for caught exception — TS guidance permits `e`/`err`/`error`;
    inconsistent with `apiErr` (which spells out `err`).
- **Suggestion:** Rename `opts → options` inside `executeHttpCall`
  for consistency; leave `acc`, `val`, `e` alone.

#### F5.9 — `info` in `client.ts:100-105` (LOW)
- **Where:** `client.ts:100-105`.
  ```ts
  let info = createDefault().with(PACKAGE_SEGMENT);
  ```
- **Why flagged:** Generic; reads as "info about what?". Context tells
  the reader it is the User-Agent builder, but the name is content-free.
- **Suggestion:** `userAgentInfo` or `clientInfo` (matches the
  imported `createDefault` from `@databricks/sdk-core/clientinfo`).

#### F5.10 — `qps` (LOW)
- See F3.2.

---

### 6. Misleading names

#### F6.1 — `Endpoint.name` is functionally the primary key (HIGH)
- **Where:** `model.ts:276`.
- **Why flagged:** The field is described as "Name of the AI Search
  endpoint" but used as the path-segment identifier in
  `getEndpoint`, `deleteEndpoint`, `patchEndpoint`, etc.
  (`client.ts:212, 262, 420, 446`). Also, `Endpoint` has both
  `name` and `id` (line 288), with `id` documented as "Unique
  identifier of the endpoint" — so the type has *two* identifiers
  and only one of them ever shows up in URLs.
- **Suggestion:** Document explicitly: "Used as the primary
  identifier in API paths." Or rename `name → endpointName` (still
  generic) or `name → key` (more explicit). Also clarify in JSDoc
  that `name` is the URL-safe identifier and `id` is the opaque GUID.
  See F12.3 / F19.2.

#### F6.2 — `numIndexes` reads as "number of *array* indexes" (MEDIUM)
- **Where:** `model.ts:292`.
- **Why flagged:** In TS, "index" almost universally means a numeric
  position in an array. Here it means "number of vector-search
  indexes attached to this endpoint" — a domain term, not the
  data-structure term.
- **Suggestion:** Rename `numIndexes → numVectorIndexes` (matches
  `MiniVectorIndex` / `VectorIndex` in the same package). Even
  better: pluralize naturally, `vectorIndexCount`.

#### F6.3 — `EndpointStatus_State.OFFLINE` as a *terminal failure* state (HIGH)
- **Where:** `model.ts:72`, `client.ts:641-644, 680-681`.
  ```ts
  case EndpointStatus_State.OFFLINE: {
    const msg = pollResp.endpointStatus?.message ?? '(no message)';
    throw new Error(`terminal state ${status}: ${msg}`);
  }
  ```
- **Why flagged:** The waiter treats `OFFLINE` as a *terminal failure*
  (throws), but the enum name "OFFLINE" suggests a transient state
  ("the endpoint is currently offline"). This is misleading: a
  reader sees `OFFLINE` and expects it might come back online; the
  client treats it as terminal.
- **Suggestion:** If the wire allows, rename to `FAILED` (semantic
  intent) or `TERMINATED`. Otherwise add a prominent JSDoc note on
  the enum value explaining the waiter contract.

#### F6.4 — `Endpoint.creator` is a user *identifier*, not the user (LOW)
- **Where:** `model.ts:278`. JSDoc: "Creator of the endpoint".
- **Why flagged:** "Creator" suggests a `User` object; the field type
  is `string`. Compare `lastUpdatedUser` (also `string`).
- **Suggestion:** `creatorUserName` or `creatorEmail`, depending on
  what the wire returns. Or `createdBy` (matches REST convention).

#### F6.5 — `lastUpdatedUser` vs `creator` asymmetry (LOW)
- **Where:** `model.ts:278, 286`.
- **Why flagged:** Two fields, both `string`, both identify a user,
  with different naming patterns: `creator` (noun) vs
  `lastUpdatedUser` (compound). Inconsistent.
- **Suggestion:** `createdBy` and `updatedBy` (matches REST common
  practice) or `creator` and `lastUpdater`. Pick one form.

#### F6.6 — `flattenQueryParams` is exported but unused in this package (LOW)
- **Where:** `utils.ts:123-150`.
- **Why flagged:** The package's list endpoints use
  `URLSearchParams.append` directly (`client.ts:179-182, 322-325,
  370-376`). The helper is dead in this package — same finding as
  in the `budgets` audit.
- **Suggestion:** Move shared helpers to `@databricks/sdk-core` or
  delete from per-package `utils.ts`. Cross-cutting.

#### F6.7 — JSDoc `"Update an endpoint"` on `patchEndpoint` lacks the verb match (LOW)
- **Where:** `client.ts:415`.
- **Why flagged:** JSDoc says "Update", the method is `patchEndpoint`.
  Inconsistent verb. (See F17.1.)
- **Suggestion:** Either rename the method or rewrite the JSDoc:
  "Patch an endpoint to update mutable fields."

---

### 7. Overly verbose

#### F7.1 — `Endpoint` *would* be fine — but with package qualification
  removed, becomes `VectorSearchEndpoint` (MEDIUM)
- **Where:** `model.ts:274`, `index.ts:31`.
- **Why flagged:** Today `Endpoint` is unqualified (F1.1). After the
  F0/F1 rename it becomes `VectorSearchEndpoint` — long but
  necessary. Worth noting as a deliberate tradeoff, not a bug.
- **Suggestion:** Accept the verbosity; mitigate by aliasing at
  import sites where appropriate.

#### F7.2 — `PatchEndpointBudgetPolicyRequest`,
  `PatchEndpointBudgetPolicyResponse` (HIGH)
- **Where:** `model.ts:401, 408`, `index.ts:43-44`.
- **Why flagged:** 32+ characters. Inside a method literally named
  `patchEndpointBudgetPolicy(...)`, the request type repeats every
  token. Compare typical TS SDK shape:
  `endpoint.patchBudgetPolicy(req: PatchBudgetPolicyRequest)`.
- **Suggestion:** With F0/F1 rename, drop the redundant `Endpoint`
  token. The method belongs to a vector-search-endpoint client, so
  `PatchBudgetPolicyRequest` / `PatchBudgetPolicyResponse` is enough.

#### F7.3 — Method names: `patchEndpointBudgetPolicy`,
  `createEndpoint`, `deleteEndpoint`,
  `getEndpoint`, `listEndpoint`, `patchEndpoint` (MEDIUM)
- **Where:** `client.ts:111, 208, 258, 317, 416, 442`.
- **Why flagged:** "Endpoint" repeats in every method name. Compare
  typical TS SDK shape: `client.createEndpoint(...)`. Now that
  the package contains both endpoints and indexes, the verbose form
  is more justified — but the names could be split into nested
  resource clients (`client.endpoints.create(...)`,
  `client.indexes.create(...)`).
- **Suggestion:** Nested resource clients, or keep as-is given the
  multi-resource scope of the package. Cross-package convention.

#### F7.4 — `createEndpointWaiter` method (MEDIUM)
- **Where:** `client.ts:136-145`.
- **Why flagged:** This method is `createEndpoint` + return-a-waiter.
  All sibling SDKs (`warehouses`, `modelserving`) export
  the waiter as a separate type and the create method returns it
  directly. Reads as `client.createEndpoint(...)` returning an
  `Endpoint`, then a second method `createEndpointWaiter(...)`
  returning a `CreateEndpointWaiter`. Two methods for one operation.
- **Suggestion:** Either:
  - Make `createEndpoint` return the waiter directly (breaking
    change), or
  - Rename to `createEndpointAndWait` (verbose but explicit), or
  - Inline the polling into `createEndpoint` and remove the waiter
    type entirely.
  See F17.3.

#### F7.5 — `STILL_RUNNING` / `StillRunningError` (LOW)
- **Where:** `client.ts:83`.
- **Why flagged:** Private error class used as a control-flow signal
  for `retryOn`. Three concepts in one name ("still" + "running" +
  "error"). It is essentially "not yet done".
- **Suggestion:** Acceptable as-is; alternative
  `RetryablePendingError` or `NotYetDoneError`.

#### F7.6 — `QueryVectorIndexNextPageRequest` (LOW)
- **Where:** `model.ts:425`, `index.ts:46`.
- **Why flagged:** 30+ characters. Could be `QueryVectorIndexPageRequest`
  or `QueryNextPageRequest`.
- **Suggestion:** `QueryNextPageRequest` keeps the meaning and drops
  the redundant `VectorIndex` token (context: it's a vector-search
  package).

---

### 8. Redundant suffixes

#### F8.1 — `Request` / `Response` suffixes (LOW, conventional)
- **Where:** All request/response types.
- **Why flagged:** Conventional in this SDK. Names are flat
  (`CreateEndpointRequest`, `DeleteEndpointResponse`). Good.
- **Suggestion:** No change.

#### F8.2 — `EndpointType` enum tautology (LOW)
- **Where:** `model.ts:18`, `Endpoint.endpointType: EndpointType`
  (`model.ts:284`).
- **Why flagged:** Three layers of "endpoint": `Endpoint` has a
  field `endpointType` typed as `EndpointType`. Reads as
  `endpoint.endpointType : EndpointType`.
- **Suggestion:** Rename field `endpointType → type` (loses one
  redundancy, becomes `endpoint.type : EndpointType`). Wire field
  is `endpoint_type` (`model.ts:725, 1028`), so a remap is needed.
  See F20.1.

#### F8.3 — `EndpointStatus` interface + `endpointStatus` field on `Endpoint` (LOW)
- **Where:** `model.ts:290, 314`.
- **Why flagged:** Same pattern as F8.2:
  `endpoint.endpointStatus : EndpointStatus`.
- **Suggestion:** Rename field `endpointStatus → status`. Wire field
  is `endpoint_status` — generator-level remap.

#### F8.4 — `EndpointScalingInfo` `Info` suffix (LOW)
- **Where:** `model.ts:303`.
- **Why flagged:** `Info` suffix is a generic filler word. The type
  describes scaling state.
- **Suggestion:** `EndpointScaling`. Or align with `EndpointStatus`
  (already there, no `Info`).

#### F8.5 — `DeltaSyncVectorIndexSpec` vs `DeltaSyncVectorIndexSpecRequest` (LOW)
- **Where:** `model.ts:175, 207`.
- **Why flagged:** Two types with the same prefix differing only by
  `Request` suffix; the `Request` variant is the input shape, the
  bare variant is the output. Asymmetric: most request-shape
  duplicates in the codebase don't carry the suffix.
- **Suggestion:** Document the distinction in JSDoc. Acceptable.

---

### 9. Singular / plural mismatches

#### F9.1 — `listEndpoint` method singular for a collection (HIGH)
- **Where:** `client.ts:317`.
- **Why flagged:** Method returns `ListEndpointResponse` whose
  `endpoints` field is `Endpoint[]`. The method should be
  `listEndpoints` (plural). Same applies to its request type:
  `ListEndpointRequest` should be `ListEndpointsRequest`,
  `ListEndpointResponse` should be `ListEndpointsResponse`.
- **Suggestion:** Pluralize throughout. The wire path is
  `/api/2.0/vector-search/endpoints` — plural — so this is also
  consistent with the URL.

#### F9.2 — `ListEndpointRequest` / `ListEndpointResponse` types (HIGH)
- **Where:** `model.ts:338, 343`.
- See F9.1.

#### F9.3 — `listVectorIndex` method singular for a collection (HIGH)
- **Where:** `client.ts:365`.
- **Why flagged:** Same issue as F9.1 — method returns a list of
  indexes. Should be `listVectorIndexes`.
- **Suggestion:** Pluralize throughout: `listVectorIndexes`,
  `ListVectorIndexesRequest`, `ListVectorIndexesResponse`.

#### F9.4 — `ListVectorIndexRequest` / `ListVectorIndexResponse` types (HIGH)
- **Where:** `model.ts:355, 362`.
- See F9.3.

#### F9.5 — `Endpoint.numIndexes` plural (acceptable)
- **Where:** `model.ts:292`.
- Plural is correct for a count of indexes.

#### F9.6 — `Endpoint.customTags: CustomTag[]` plural (acceptable)
- **Where:** `model.ts:298`.
- Plural is correct for an array.

---

### 10. Reserved-word / built-in collisions

#### F10.1 — `delete` method name (LOW)
- **Where:** `client.ts:208` (`deleteEndpoint`).
- **Why flagged:** TS allows `delete` as method name. `deleteEndpoint`
  is unambiguous; flag would apply only if renamed to bare `delete`.
- **Suggestion:** Acceptable.

#### F10.2 — `status` field (LOW)
- **Where:** `model.ts:154, 394, 549, 590`.
- **Why flagged:** `Response.status` collides with `Response.status`
  in the Fetch API. Mild shadowing concern in code review.
- **Suggestion:** Acceptable inside the type domain.

#### F10.3 — `state` field (LOW)
- **Where:** `model.ts:305, 316`.
- **Why flagged:** No reserved-word collision. `state` is a popular
  React/Redux concept, but that is library-level not language-level.
- **Suggestion:** Acceptable.

#### F10.4 — `Headers`, `URLSearchParams`, `TextDecoder`,
  `AbortSignal`, `Promise`, `ReadableStream` (acceptable)
- **Where:** `client.ts`, `utils.ts`.
- Used as global classes; no shadowing.

#### F10.5 — `Error`, `RangeError`, etc. (acceptable)
- `throw new Error(...)` is correct usage. No collision.

---

### 11. Empty / trivial wrapper types

#### F11.1 — `DeleteEndpointResponse`, `DeleteVectorIndexResponse`,
  `SyncVectorIndexResponse` empty (LOW)
- **Where:** `model.ts:165, 173, 538`.
- **Why flagged:** Empty `{}` types. Conventional placeholder for
  REST endpoints that return an empty body. Useful for future
  evolution.
- **Suggestion:** Acceptable.

---

### 12. Duplicate concepts

#### F12.1 — `Endpoint.name` vs `Endpoint.id` (HIGH)
- **Where:** `model.ts:276, 288`.
- **Why flagged:** Both fields are documented as identifiers
  ("Name of the AI Search endpoint" / "Unique identifier of the
  endpoint"). Every URL uses `name`, never `id`. Two identifiers
  for the same entity confuse users; see F1.4, F6.1, F19.2.
- **Suggestion:** Document the distinction prominently
  (`name` = user-chosen URL-safe key, `id` = opaque GUID). Or
  collapse to one identifier at the API level.

#### F12.2 — `budgetPolicyId` vs `effectiveBudgetPolicyId` (LOW)
- **Where:** `model.ts:294, 296, 405, 409, 411`.
- **Why flagged:** Two fields, same domain, distinguished by the
  word "effective". A reader needs JSDoc to know which is the
  request and which is the result of policy resolution.
- **Suggestion:** Acceptable convention; JSDoc clarifies. Not a
  duplicate, just adjacent.

#### F12.3 — `usagePolicyId` vs `budgetPolicyId` (LOW)
- **Where:** `model.ts:102, 104`.
- **Why flagged:** Two different policy IDs whose JSDoc says one
  will be replaced by the other ("usagePolicyId" — "to be applied
  once we've migrated to usage policies"). Transitional API — both
  exist today.
- **Suggestion:** Acceptable transition; should be cleaned up post
  migration.

#### F12.4 — `DeltaSyncVectorIndexSpec` vs `DeltaSyncVectorIndexSpecRequest`
  near-duplicate types (LOW)
- **Where:** `model.ts:175, 207`.
- **Why flagged:** The two types have an identical set of fields.
  The split is purely for request vs response.
- **Suggestion:** Acceptable convention; document the asymmetry.

#### F12.5 — `MiniVectorIndex` vs `VectorIndex` near-duplicate types (LOW)
- **Where:** `model.ts:376, 572`.
- **Why flagged:** Both types share identical fields. `MiniVectorIndex`
  appears to be used in list responses for lighter weight payloads.
- **Suggestion:** Document the distinction in JSDoc.

#### F12.6 — Per-method header construction duplicated (LOW, code style)
- **Where:** `client.ts:119-120, 156-157, 187-188, 215-216, 240-241,
  265-266, 299-300, 330-331, 381-382, 424-425, 453-454, 482-483,
  511-512, 537-538, 563-564, 589-590`.
- **Why flagged:** Every method runs:
  ```ts
  const headers = new Headers(...);
  headers.set('User-Agent', this.userAgent);
  ```
  Could be a private helper `this.buildHeaders(...)`. Not a naming
  issue, but a code-duplication smell.
- **Suggestion:** Out of scope for naming audit. Same finding as in
  `budgets`.

---

### 13. Verb-tense inconsistency

#### F13.1 — Method verbs (acceptable for CRUD)
- `create*`, `delete*`, `get*`, `list*`, `patch*`, `query*`,
  `scan*`, `sync*`, `upsert*` — all uniform
  imperative present. Good.

#### F13.2 — `patch*` vs `update*` (MEDIUM)
- **Where:** Method `patchEndpoint` (`client.ts:416`), JSDoc says
  "Update an endpoint" (`client.ts:415`).
- **Why flagged:** REST verbs in the SDK are mixed. Most packages
  use `update*` (e.g. `updateBudgetConfiguration`); this package
  uses `patch*`. Both describe the same HTTP verb (`PATCH`) but
  with different SDK ergonomics.
- **Suggestion:** Cross-package decision. If the SDK standardizes
  on `update`, rename to `updateEndpoint`,
  `updateEndpointBudgetPolicy`. If on `patch`, fix the JSDoc to say
  "Patch". See F17.1.

#### F13.3 — `createEndpoint` / `createEndpointWaiter` overlap (MEDIUM)
- **Where:** `client.ts:111, 136`.
- **Why flagged:** Two methods with the same verb start; only one
  actually performs the create — the waiter version *calls* the
  create then wraps. Reader might think `createEndpointWaiter` is
  a *different* operation.
- **Suggestion:** See F7.4. Acceptable if the verb pattern is
  applied consistently across the SDK; flag for cross-cutting
  decision.

#### F13.4 — `creationTimestamp` / `lastUpdatedTimestamp` past-tense
  asymmetry (LOW)
- **Where:** `model.ts:280, 282`.
- **Why flagged:** "creation" (noun) vs "lastUpdated" (past
  participle). Not parallel. Other SDK packages use
  `createTime`/`updateTime` (noun-form) or `createdAt`/`updatedAt`
  (past-participle). This package mixes both forms.
- **Suggestion:** Standardize as `createdAt` / `updatedAt` (most
  idiomatic in TS) or `createTime` / `updateTime` (matches Google
  API). Wire fields are `creation_timestamp` and
  `last_updated_timestamp`; remap if needed.

---

### 14. Go / Java-style names

#### F14.1 — `req`, `resp`, `err`, `httpReq`, `apiErr`,
  `pkgJson`, `opts`, `msg` (HIGH, cross-cutting)
- **Where:**
  - `req` in every client method
  - `resp`, `respBody`, `pollResp` in `client.ts`
  - `e` in `utils.ts:76`
  - `httpReq` in `client.ts`
  - `apiErr` in `utils.ts:88`
  - `pkgJson` in `client.ts:20, 79-80`
  - `opts` in `utils.ts:30, 65-92`
  - `msg` in `client.ts:642`
- **Why flagged:** All classic Go idioms ported verbatim. TS
  convention favors spelled-out names: `request`, `response`,
  `error`, `httpRequest`, `apiError`, `packageJson`, `options`,
  `message`.
- **Suggestion:** Spell them out. Trivial diff, large readability
  gain. Generator-level decision; identical to the recommendation
  in the `budgets` audit.

#### F14.2 — `for (;;)` infinite loop (acceptable)
- **Where:** `client.ts:352, 403`, `utils.ts:48`.
- **Why flagged:** Style; this is a `for (;;)` Go-idiom (the Go form
  is `for { … }`). TS prefers `while (true)` or `do { … } while (…)`.
  But `for (;;)` is also legal and idiomatic in C-derived languages.
- **Suggestion:** Acceptable; consistent within the SDK.

#### F14.3 — `Waiter` suffix (Go-style) (MEDIUM)
- **Where:** `client.ts:136-145, 610`. Exported as
  `CreateEndpointWaiter` (`index.ts:3`).
- **Why flagged:** "Waiter" is an AWS SDK / Go SDK pattern. TS
  ecosystems more often expose a `Promise`-returning method (e.g.
  `createAndWait`, `pollUntilDone`) or an async iterator. The
  `Waiter` object has only two methods (`wait`, `done`); could be
  a function.
- **Suggestion:** Rename to `EndpointCreatePoller` (more JS-y) or
  inline as `createEndpointAndWait(): Promise<Endpoint>`. Or keep
  for parity with other Databricks SDKs (Go has Waiters; users
  porting may expect them).

#### F14.4 — `numIndexes`, `numResults` `num` prefix (LOW)
- **Where:** `model.ts:292, 438, 513`.
- **Why flagged:** `num` is shortened from "number of". TS often
  uses the bare noun (`indexCount`, `resultCount`) or `count` suffix.
- **Suggestion:** `indexCount`, `resultCount` (more idiomatic).
  Wire fields are `num_indexes` / `num_results` — generator-level
  remap.

---

### 15. Generic field names losing meaning

#### F15.1 — `Endpoint.name` (HIGH)
- See F1.4 / F6.1.

#### F15.2 — `Endpoint.id` (LOW)
- **Where:** `model.ts:288`.
- **Why flagged:** Bare `id` is the most generic identifier name
  possible. Acceptable inside the type domain — but only because
  the type is `Endpoint`.
- **Suggestion:** Keep; the type context disambiguates.

#### F15.3 — `state`, `status`, `message` (LOW)
- See F1.6, F1.7.

#### F15.4 — `key` / `value` on `CustomTag` and
  `MapStringValueEntry` (LOW)
- **Where:** `model.ts:139, 141, 371, 373`.
- **Why flagged:** Generic; same finding as `BudgetConfigurationFilter_TagClause.key/value`
  in `budgets`. Wrapping type supplies context, but `tagKey` /
  `tagValue` would self-document.
- **Suggestion:** Wire fields are `key`/`value`; rename costs a
  marshaller mapping. Optional.

#### F15.5 — `req` parameter on every client method (HIGH)
- See F1.5.

#### F15.6 — `result` field on `QueryVectorIndexResponse`,
  `UpsertDataVectorIndexResponse`, `DeleteDataVectorIndexResponse`
  (LOW)
- **Where:** `model.ts:156, 475, 551`.
- **Why flagged:** Generic. Disambiguated by container type.
- **Suggestion:** Acceptable.

#### F15.7 — `data` field on `ScanVectorIndexResponse` (LOW)
- **Where:** `model.ts:522`.
- **Why flagged:** `data` is generic.
- **Suggestion:** Acceptable in the response domain.

---

### 16. Field contradicting type domain

#### F16.1 — `state` on `EndpointScalingInfo` is a *change* state, not
  a *scaling* state (LOW)
- **Where:** `model.ts:305`.
- **Why flagged:** Field is `state: ScalingChangeState` — the
  field-on-type domain is "scaling info", but the field type is
  "scaling **change** state". JSDoc says "The current state of the
  scaling change request" — so the field name should arguably
  match.
- **Suggestion:** Rename field to `changeState` or
  `lastChangeState`.

#### F16.2 — `EndpointStatus_State.RED_STATE`, `YELLOW_STATE` health
  semantics (LOW)
- **Where:** `model.ts:79-80`.
- **Why flagged:** These are health-color states, not lifecycle states.
  Lumping them with `PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`
  (lifecycle states) in the same enum mixes two orthogonal
  dimensions.
- **Suggestion:** API-shape concern. Split into `lifecycleState`
  and `healthState`, or rename to be uniformly health-colored
  (`GREEN` for `ONLINE`).

---

### 17. Inconsistent action verbs

#### F17.1 — `patch*` vs `update*` (MEDIUM)
- See F13.2. Cross-cutting.

#### F17.2 — `Get` vs `List` for read endpoints (acceptable)
- `getEndpoint` for single, `listEndpoint` for collection. Standard
  REST verbs. (Plural issue covered in F9.1.)

#### F17.3 — `createEndpoint` returns `Endpoint`,
  `createEndpointWaiter` returns `CreateEndpointWaiter` (MEDIUM)
- **Where:** `client.ts:111, 136`.
- See F7.4 / F13.3.

#### F17.4 — `wait` vs `done` on `CreateEndpointWaiter` (acceptable)
- **Where:** `client.ts:621, 665`.
- Both verbs are well-chosen. `wait` is blocking-until-terminal;
  `done` is a non-blocking check. Symmetric and clear.

#### F17.5 — `upsert*`, `scan*`, `sync*`, `query*` (acceptable)
- **Where:** `client.ts:529, 555, 474, 500, 581`.
- New action verbs from the index-side of the package (formerly
  `indexes`). All are unambiguous and consistent.
- **Suggestion:** No change.

---

### 18. Long enum values

#### F18.1 — `STORAGE_OPTIMIZED` (LOW)
- 17 chars. Reasonable.

#### F18.2 — `PROVISIONING` (acceptable)
- 12 chars. Standard.

---

### 19. Underspecified IDs

#### F19.1 — `Endpoint.id` (LOW)
- See F15.2. Bare `id` inside `Endpoint` is fine.

#### F19.2 — `Endpoint.name` doubles as ID (HIGH)
- See F1.4 / F6.1 / F12.1. Two identifiers (`name` and `id`) for
  the same entity is the underspecification problem.

#### F19.3 — `budgetPolicyId`, `usagePolicyId`,
  `effectiveBudgetPolicyId` (acceptable)
- **Where:** `model.ts:102, 104, 188, 220, 294, 296, 405, 409, 411`.
- Specific enough; matches platform-wide convention.

#### F19.4 — `MiniVectorIndex.endpointName` (acceptable)
- **Where:** `model.ts:380`.
- Domain-qualified; clear.

---

### 20. Type-suffix tautology

#### F20.1 — `Endpoint.endpointType: EndpointType` (MEDIUM)
- **Where:** `model.ts:284, 100`.
- **Why flagged:** Three layers of "endpoint":
  `endpoint.endpointType : EndpointType`. The container provides
  the "endpoint" context.
- **Suggestion:** Rename field `endpointType → type` (similar
  pattern in `budgets` F20.1 / F20.2). Wire field is
  `endpoint_type`; needs a marshaller remap.

#### F20.2 — `Endpoint.endpointStatus: EndpointStatus` (MEDIUM)
- **Where:** `model.ts:290, 314`.
- **Why flagged:** Same pattern.
- **Suggestion:** Rename field `endpointStatus → status`.

#### F20.3 — `EndpointStatus.state: EndpointStatus_State` (LOW)
- **Where:** `model.ts:316`.
- **Why flagged:** Field is `state`, enum is `EndpointStatus_State`.
  Not strictly tautological (the field is the bare noun, the type
  is the qualified noun). Acceptable.

#### F20.4 — `EndpointScalingInfo.state: ScalingChangeState` (LOW)
- **Where:** `model.ts:305`.
- **Why flagged:** Same pattern. Field `state` typed against
  `ScalingChangeState` reads "scaling info . state : scaling change
  state".
- **Suggestion:** Rename field to `changeState` (matches the enum's
  domain better). See F16.1.

#### F20.5 — `MiniVectorIndex.indexType: VectorIndexType`,
  `VectorIndex.indexType: VectorIndexType` (LOW)
- **Where:** `model.ts:383, 579`.
- **Why flagged:** Field `indexType` typed against `VectorIndexType`;
  reads "vector index . index type : vector index type".
- **Suggestion:** Rename field `indexType → type`. Wire field is
  `index_type` — marshaller remap.

#### F20.6 — `MiniVectorIndex.indexSubtype: IndexSubtype`,
  `VectorIndex.indexSubtype: IndexSubtype` (LOW)
- **Where:** `model.ts:398, 594`.
- **Why flagged:** Same pattern.
- **Suggestion:** Rename field `indexSubtype → subtype`.

---

## Package overlap: `vectorsearch` vs `warehouses` vs `modelserving`

The `endpoints` package was merged into `vectorsearch` in the
2026-05-20 regeneration, resolving the F0.1 / F0.2 / F-OVERLAP.2
findings about package ambiguity. Some residual concerns remain
about the unqualified `Endpoint` symbol.

### F-OVERLAP.1 — `Endpoint` symbol exists in three places (MEDIUM)
- **Where:**
  - `packages/vectorsearch/src/v1` exports `Endpoint`
  - `packages/warehouses/src/v1` exports `EndpointState`,
    `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy`
  - `packages/modelserving/src/v1` exports
    `InferenceEndpoint`, etc.
- **Why flagged:** Project-wide `grep -r Endpoint` returns hits across
  all three packages. Autocomplete on "Endpoint" collides. Even with
  qualified imports, mental load is high.
- **Suggestion:** Rename per F1.1. The model serving package already
  qualifies its primary type as `InferenceEndpoint`; this package
  should qualify as `VectorSearchEndpoint`; the warehouse package's
  legacy `Endpoint*` names are wire-protocol and should be deprecated
  but left for compatibility.

### F-OVERLAP.2 — `EndpointType` exists in this package vs
  `WarehouseType` exists in `warehouses` (LOW)
- **Where:** `model.ts:18` here vs
  `warehouses/src/v1/index.ts` line for `WarehouseType`.
- **Why flagged:** `WarehouseType` is qualified; `EndpointType` is
  bare. After F1.2 rename it becomes `VectorSearchEndpointType` —
  symmetric with `WarehouseType`.

---

## Proto-architectural-leak names

Names that leak the upstream proto/IDL or service architecture into the
TS public surface. These are not standard suffix conventions; they
reflect internal class/file layout that should not be visible to SDK
consumers.

### 1. `EndpointStatus_State` — model.ts:69, index.ts:12
- **Why:** Underscore-separated identifier mirrors the proto nested-enum
  shape (`EndpointStatus.State` in the IDL). TS has no nested-enum
  concept, so the underscore leaks the proto file layout. Also exported
  at `index.ts:12`.
- **Category:** Proto-nested type leak (underscore infix).
- **Suggested:** `EndpointState`, or move it under the `EndpointStatus`
  namespace via a TS `namespace EndpointStatus { export enum State }`.
- **Rationale:** TS consumers do not see the proto enclosing message.
  The underscore is purely a generator artifact; the public type name
  should read as a plain TS identifier.

### 2. `RerankerConfig_RerankerParameters` — model.ts:490, index.ts:50
- **Why:** Proto-nested message name leaked as an underscore-separated
  TS interface. Also repeats the `Reranker` token inside its own parent
  type ("reranker config . reranker parameters").
- **Category:** Proto-nested type leak (underscore infix) + token
  repetition.
- **Suggested:** `RerankerParameters` at the top level, or
  `RerankerConfig.Parameters` via a TS namespace. Drop the duplicated
  `Reranker` token regardless.
- **Rationale:** The wire form `RerankerConfig.RerankerParameters` is
  a proto nesting convention; the SDK consumer only sees an interface
  reference, so `RerankerParameters` is unambiguous in context.

### 3. `marshalRerankerConfig_RerankerParametersSchema` — model.ts:1217
- **Why:** Schema constant name carries the same proto-nested
  underscore as finding 2. The Zod schema for the nested message
  inherits the leaked name.
- **Category:** Proto-nested type leak (underscore infix) — schema
  variant.
- **Suggested:** `marshalRerankerParametersSchema` (consistent with the
  renamed interface in finding 2).
- **Rationale:** Same as 2 — internal naming bleeding into the public
  module surface.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 0 | **Package name (special)**              | 1        |
| 1 | Vague / generic                         | 8 (1 acceptable) |
| 2 | Redundant enum prefixes                 | 1        |
| 3 | Acronym casing                          | 4 (3 acceptable) |
| 4 | Underscores in TS identifiers           | 0        |
| 5 | Cryptic abbreviations                   | 10       |
| 6 | Misleading names                        | 7        |
| 7 | Overly verbose                          | 6        |
| 8 | Redundant suffixes                      | 5 (1 acceptable) |
| 9 | Singular / plural mismatch              | 6 (2 acceptable) |
| 10 | Reserved-word collisions               | 5 (3 acceptable) |
| 11 | Empty / trivial wrappers               | 1        |
| 12 | Duplicate concepts                     | 6        |
| 13 | Verb-tense inconsistency               | 4 (1 acceptable) |
| 14 | Go / Java-style names                  | 4 (1 acceptable) |
| 15 | Generic field names                    | 7        |
| 16 | Field contradicting type domain        | 2        |
| 17 | Inconsistent action verbs              | 5 (3 acceptable) |
| 18 | Long enum values                       | 2 (1 acceptable) |
| 19 | Underspecified IDs                     | 4 (3 acceptable) |
| 20 | Type-suffix tautology                  | 6 (2 acceptable) |
| OVERLAP | vectorsearch vs warehouses vs serving | 2 |
| PROTO   | Proto-architectural-leak names        | 3        |
| **Total** |                                     | **99**  |

---

## Top highest-impact renames (recommended order)

1. **F1.1 / F1.2 / F-OVERLAP.1:** Rename `Endpoint` to
   `VectorSearchEndpoint`. The package rename to
   `@databricks/sdk-vectorsearch` already happened; aligning the
   exported type name closes the loop.
2. **F9.1 / F9.2 / F9.3 / F9.4:** Pluralize the list methods, requests,
   and responses: `listEndpoints`, `ListEndpointsRequest`,
   `ListEndpointsResponse`, and same for `VectorIndex`.
3. **F12.1 / F1.4 / F6.1 / F19.2:** Resolve the `Endpoint.name` vs
   `Endpoint.id` duality — either document the distinction
   prominently or unify at the API level.
4. **F8.2 / F20.1 / F20.2:** Drop redundant tokens from
   `Endpoint.endpointType` and `Endpoint.endpointStatus` to bare
   `type` / `status`.
5. **F14.1 / F5.x:** Spell out `req`/`resp`/`err`/`opts`/
   `pkgJson`/`msg` across the generated code.

---

## Notes / out-of-scope

- All findings above relate to **generated** code. Code-base rule:
  "Code generated from API definition by Databricks SDK Generator.
  DO NOT EDIT." The fixes belong upstream in the generator and
  spec. This audit is a backlog for that generator.
- The `utils.ts` file contains the same generic helpers
  (`executeCall`, `parseResponse`, `marshalRequest`,
  `flattenQueryParams`, `executeHttpCall`, `buildHttpRequest`,
  `readAll`) that every generated package duplicates. The
  duplication itself is not a naming issue and is out of scope for
  this audit.
- This package has no `tests/` directory (verified by repo
  structure check), so the audit does not cover test naming.
- The `Waiter` pattern (`CreateEndpointWaiter`) is a Go SDK idiom
  ported verbatim; whether to keep it for parity or replace with a
  JS-idiomatic `Promise`/async-iterator API is a cross-cutting
  design decision.
- "Endpoint" appearing across the SDK is a *Databricks-wide* problem
  — the term is used by Vector Search, Model Serving, and SQL
  Warehouses for three different concepts. Disambiguation at the
  SDK level is unavoidable.

---
