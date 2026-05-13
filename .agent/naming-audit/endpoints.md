# Naming Audit: `endpoints` (v1)

**Package:** `@databricks/sdk-endpoints`
**Path:** `/home/parth.bansal/sdk-js/packages/endpoints/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist plus a special section on the package name itself, which is
the single most problematic naming choice in the whole package. Each
finding lists the offending identifier(s), the category number,
severity (`HIGH` / `MEDIUM` / `LOW`), and a concrete rename
suggestion. Findings are grouped by category. Generator-driven items
(such as the `_State` underscore on proto-style nested enums and the
`marshal`/`unmarshal` schema prefixes) are flagged as `LOW` because
they are codified across the entire generated SDK surface — they
should be fixed at the generator, not by hand-editing this package.

---

## Inventory

### Package identity

| Item            | Value                              |
| --------------- | ---------------------------------- |
| Package name    | `@databricks/sdk-endpoints`        |
| Directory       | `packages/endpoints/`              |
| Subpath export  | `./v1`                             |
| REST base path  | `/api/2.0/vector-search/endpoints` |
| Concept         | Vector Search endpoints            |

### Enums (`model.ts`)

| Name                            | Members                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `EndpointType`                  | `STORAGE_OPTIMIZED`, `STANDARD`, `STANDARD_ON_ORION`                                                       |
| `ScalingChangeState`            | `SCALING_CHANGE_UNSPECIFIED`, `SCALING_CHANGE_APPLIED`, `SCALING_CHANGE_IN_PROGRESS`                       |
| `ThroughputChangeRequestState`  | `CHANGE_SUCCESS`, `CHANGE_FAILED`, `CHANGE_REACHED_MINIMUM`, `CHANGE_REACHED_MAXIMUM`, `CHANGE_IN_PROGRESS`, `CHANGE_ADJUSTED` |
| `ThroughputPatchStatus`         | `PATCH_ACCEPTED`, `PATCH_REJECTED`, `PATCH_FAILED`                                                         |
| `EndpointStatus_State`          | `PROVISIONING`, `ONLINE`, `OFFLINE`, `RED_STATE`, `YELLOW_STATE`, `DELETED`                                |

### Interfaces (`model.ts`)

`AdjustedThroughputRequest`, `CreateEndpointRequest`, `CustomTag`,
`DeleteEndpointRequest`, `DeleteEndpointResponse`, `Endpoint`,
`EndpointScalingInfo`, `EndpointStatus`, `EndpointThroughputInfo`,
`GetEndpointRequest`, `ListEndpointRequest`, `ListEndpointResponse`,
`PatchEndpointBudgetPolicyRequest`,
`PatchEndpointBudgetPolicyResponse`, `PatchEndpointRequest`,
`PatchEndpointThroughputRequest`, `PatchEndpointThroughputResponse`.

### Schemas (`model.ts`)

`unmarshalAdjustedThroughputRequestSchema`,
`unmarshalCustomTagSchema`,
`unmarshalDeleteEndpointResponseSchema`,
`unmarshalEndpointSchema`,
`unmarshalEndpointScalingInfoSchema`,
`unmarshalEndpointStatusSchema`,
`unmarshalEndpointThroughputInfoSchema`,
`unmarshalListEndpointResponseSchema`,
`unmarshalPatchEndpointBudgetPolicyResponseSchema`,
`unmarshalPatchEndpointThroughputResponseSchema`,
`marshalCreateEndpointRequestSchema`,
`marshalPatchEndpointBudgetPolicyRequestSchema`,
`marshalPatchEndpointRequestSchema`,
`marshalPatchEndpointThroughputRequestSchema`.

### Client methods (`client.ts`)

`createEndpoint`, `createEndpointWaiter`, `deleteEndpoint`,
`getEndpoint`, `listEndpoint`, `listEndpointIter`, `patchEndpoint`,
`patchEndpointBudgetPolicy`, `patchEndpointThroughput`.

### Client classes (`client.ts`)

`Client`, `CreateEndpointWaiter`, `StillRunningError` (private).

### Utility functions (`utils.ts`)

`executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
`parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Utility types/interfaces (`utils.ts`)

`HttpCallOptions`.

---

## F0 — Package-level: the word "endpoint" is dangerously overloaded

This is the single most important finding and applies to every other
finding below. Reproducing it once up front avoids re-stating it in
each category.

### F0.1 — Package name `@databricks/sdk-endpoints` is ambiguous to the point of being misleading (HIGH, blocking)
- **Where:** `package.json:2`, the directory name
  `packages/endpoints/`, every public export, and every type alias.
- **Why flagged:** "Endpoint" is one of the most overloaded nouns in
  the Databricks API surface. Concrete evidence from this monorepo:
  - `packages/warehouses/src/v1` exports `EndpointSecurityPolicy`,
    `EndpointSpotInstancePolicy`, `EndpointState`, `EndpointHealth_Status`
    — SQL Warehouses are internally called "endpoints" (and SQL endpoint
    is a legacy term for warehouse).
  - `packages/modelservingmanagement/src/v1` exports
    `InferenceEndpoint`, `ServingEndpointDetailedPermissionLevel`,
    `InferenceEndpointState_*`, with waiters
    `CreateInferenceEndpointWaiter`,
    `PutInferenceEndpointConfigWaiter`, etc. — model serving uses
    "endpoint" as its primary noun.
  - **This** package: vector-search endpoints, evidenced by
    `model.ts:78` ("Name of the vector search endpoint"),
    `client.ts:86` URL `/api/2.0/vector-search/endpoints`,
    `client.ts:118` JSDoc "Delete a vector search endpoint."
  An import line `import {Client, Endpoint} from
  '@databricks/sdk-endpoints'` gives the reader zero clue which of
  the three concepts is being touched.  Autocompletion across the
  monorepo conflates them.
- **Suggestion:** Rename the package to one of:
  - `@databricks/sdk-vectorsearchendpoints` (long, unambiguous,
    matches the REST path), or
  - `@databricks/sdk-vectorsearch` (short, matches the product
    name; the package can hold both endpoints and indexes in
    future), or
  - `@databricks/sdk-vector-endpoints`.
  Pair the rename with `Endpoint` → `VectorSearchEndpoint` in
  `model.ts` (see F1.1). This single rename is the highest-leverage
  fix in the audit.

### F0.2 — Directory name lacks any "vector"/"search" qualifier (HIGH)
- **Where:** `/home/parth.bansal/sdk-js/packages/endpoints/`.
- **Why flagged:** Same root cause as F0.1. A monorepo `grep -r
  endpoint` over the repo will surface this package alongside the
  serving and warehouse packages with no visual differentiation.
- **Suggestion:** Rename to `packages/vectorsearchendpoints/`
  (matches `cleanroomtaskruns`, `oauthpublishedapp` flat style) or
  `packages/vectorsearch/` if the package will grow.

### F0.3 — Companion package `indexes` is also under-qualified (LOW, cross-package)
- **Where:** `packages/indexes/` exports `Client`, `MiniVectorIndex`,
  `VectorIndex`, `ListVectorIndexResponse`, etc.
- **Why flagged:** "Index" alone is even more generic than "endpoint"
  in software. The contents make clear it is vector-search, but the
  package name does not. Same fix as F0.1.
- **Suggestion:** Cross-cutting; align with whatever decision is
  taken for `endpoints`.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `Endpoint` type name (HIGH)
- **Where:** `model.ts:111`, `index.ts:19`, return type of
  `createEndpoint`, `getEndpoint`, `patchEndpoint`, items of
  `listEndpointIter`.
- **Why flagged:** "Endpoint" alone is one of the most generic nouns
  in REST APIs (every URL is an endpoint). Combined with F0, a user
  reading `function process(e: Endpoint)` cannot tell whether this
  is a vector-search endpoint, a model-serving endpoint, or a SQL
  warehouse endpoint.
- **Suggestion:** Rename to `VectorSearchEndpoint`. Mirrors
  `modelservingmanagement.InferenceEndpoint` and provides parity
  across packages. All sibling type names (`EndpointType`,
  `EndpointStatus`, `EndpointThroughputInfo`, `EndpointScalingInfo`)
  follow: `VectorSearchEndpointType`, etc. — long, but unambiguous.

#### F1.2 — `EndpointType` enum, `EndpointStatus` interface (HIGH)
- **Where:** `model.ts:6, 153`; `index.ts:7, 20`.
- **Why flagged:** Same generic-noun problem as F1.1. `Endpoint*`
  symbols collide across the monorepo (cf. `warehouses.EndpointState`,
  `warehouses.EndpointHealth_Status`,
  `modelservingmanagement.InferenceEndpointState_ReadyState`).
- **Suggestion:** Qualify with `VectorSearch` prefix —
  `VectorSearchEndpointType`, `VectorSearchEndpointStatus`. Or move
  these into a namespace `VectorSearchEndpoint.Status` /
  `VectorSearchEndpoint.Type`.

#### F1.3 — `Client` class name (MEDIUM, cross-cutting)
- **Where:** `client.ts:56`, `index.ts:3`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  `import {Client} from '@databricks/sdk-endpoints'` is unqualified
  and routinely needs `import {Client as VectorSearchEndpointsClient}`
  at the call site. Project-wide pattern.
- **Suggestion:** Keep `Client` and document the per-package
  alias convention, or rename to `VectorSearchEndpointsClient`
  consistently across packages. Cross-cutting decision.

#### F1.4 — `name` field everywhere (MEDIUM)
- **Where:** `model.ts:79, 105, 113, 184, 189, 201, 214, 234`;
  `client.ts` throughout.
- **Why flagged:** `name` is one of the most generic identifiers
  possible. JSDoc explains "Name of the vector search endpoint", but
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
- **Where:** `client.ts:83, 108, 120, 145, 170, 200, 218, 244, 276`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). See F14.1.

#### F1.6 — `state` field on `EndpointScalingInfo` and `EndpointStatus` (LOW)
- **Where:** `model.ts:144, 155`.
- **Why flagged:** `state` is generic. Disambiguated by container
  type, but `scalingState` / `endpointState` would be clearer in
  isolation.
- **Suggestion:** Acceptable as-is given the containing type; leave.

#### F1.7 — `message` field on `EndpointStatus` and `PatchEndpointThroughputResponse` (LOW)
- **Where:** `model.ts:157, 259`.
- **Why flagged:** Generic. Compare `statusMessage`,
  `errorMessage`.
- **Suggestion:** Add JSDoc clarifying purpose; rename optional.

#### F1.8 — `status` field on `PatchEndpointThroughputResponse` (LOW)
- **Where:** `model.ts:257`.
- **Why flagged:** Field is `status: ThroughputPatchStatus`. Generic
  field name typed against a non-generic enum. Reads as "status" with
  three layers of "status".
- **Suggestion:** `patchStatus` or `result`. See F20.4.

#### F1.9 — `Call`, `Options` (imported, cross-package) (acceptable)
- **Where:** `utils.ts:3-5`, `client.ts:4-5`.
- These come from `@databricks/sdk-core/api`. Generic but
  intentional. Out of scope for this package's audit.

---

### 2. Redundant enum prefixes

#### F2.1 — `ScalingChangeState.SCALING_CHANGE_*` (HIGH)
- **Where:** `model.ts:13-17`.
  ```ts
  export enum ScalingChangeState {
    SCALING_CHANGE_UNSPECIFIED = 'SCALING_CHANGE_UNSPECIFIED',
    SCALING_CHANGE_APPLIED = 'SCALING_CHANGE_APPLIED',
    SCALING_CHANGE_IN_PROGRESS = 'SCALING_CHANGE_IN_PROGRESS',
  }
  ```
- **Why flagged:** Every member prefixes `SCALING_CHANGE_` — the
  exact enum name. Reads
  `ScalingChangeState.SCALING_CHANGE_APPLIED`, which says
  "scaling change" twice. Compare `Color.RED_COLOR`.
- **Suggestion:** Drop the prefix on the *TS* identifier; keep the
  wire string. The TS-idiomatic shape is:
  ```ts
  export enum ScalingChangeState {
    UNSPECIFIED = 'SCALING_CHANGE_UNSPECIFIED',
    APPLIED = 'SCALING_CHANGE_APPLIED',
    IN_PROGRESS = 'SCALING_CHANGE_IN_PROGRESS',
  }
  ```
  Wire compatibility preserved; TS readability massively improved.
  Generator-level decision.

#### F2.2 — `ThroughputChangeRequestState.CHANGE_*` (HIGH)
- **Where:** `model.ts:20-33`.
  ```ts
  CHANGE_SUCCESS, CHANGE_FAILED, CHANGE_REACHED_MINIMUM,
  CHANGE_REACHED_MAXIMUM, CHANGE_IN_PROGRESS, CHANGE_ADJUSTED
  ```
- **Why flagged:** Every member starts with `CHANGE_`. The enum is
  `ThroughputChangeRequestState` so `CHANGE_` is redundant.
- **Suggestion:** Same as F2.1 — keep wire strings, strip the
  `CHANGE_` prefix on the TS identifier:
  `SUCCESS`, `FAILED`, `REACHED_MINIMUM`, `REACHED_MAXIMUM`,
  `IN_PROGRESS`, `ADJUSTED`.

#### F2.3 — `ThroughputPatchStatus.PATCH_*` (HIGH)
- **Where:** `model.ts:36-43`.
- **Why flagged:** `PATCH_ACCEPTED`, `PATCH_REJECTED`, `PATCH_FAILED`
  — every member prefixed with `PATCH_`, which is exactly the enum's
  domain. Reads `ThroughputPatchStatus.PATCH_ACCEPTED` —
  "patch status . patch accepted".
- **Suggestion:** Strip prefix:
  `ACCEPTED`, `REJECTED`, `FAILED`.

#### F2.4 — `EndpointStatus_State.RED_STATE`, `YELLOW_STATE` (MEDIUM)
- **Where:** `model.ts:57-58`.
- **Why flagged:** `_STATE` is redundant — the enum is already
  `EndpointStatus_State`. Reads `EndpointStatus_State.RED_STATE` —
  "endpoint status state . red state". Other members in the same
  enum (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) do not
  carry the suffix; so this is also inconsistent within the enum.
- **Suggestion:** Wire strings are `RED_STATE` / `YELLOW_STATE`, so
  parity needs the suffix. If the wire allows, rename to `RED` /
  `YELLOW`. Otherwise, document the asymmetry. Worth fixing at the
  spec level.

#### F2.5 — `EndpointType.STANDARD_ON_ORION` (LOW)
- **Where:** `model.ts:10`.
- **Why flagged:** Not technically redundant, but `ON_ORION` is an
  implementation-leak — the enum should describe *what the user
  sees*, not *which infra backs it*. See F6.x.
- **Suggestion:** Discussed in F6.4.

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (acceptable, cross-cutting)
- **Where:** `model.ts:125, 131, 133, 199, 203, 207, 209`.
- **Why flagged:** Field uses `id`, `budgetPolicyId`,
  `effectiveBudgetPolicyId`, `usagePolicyId` — consistent lower-camel
  `Id`. This matches the SDK-wide convention.
- **Suggestion:** No change.

#### F3.2 — `QPS` rendered as `Qps` (HIGH)
- **Where:**
  - `CreateEndpointRequest.targetQps` (`model.ts:93`)
  - `EndpointScalingInfo.requestedTargetQps` (`model.ts:149`)
  - `PatchEndpointRequest.targetQps` (`model.ts:229`)
- **Why flagged:** "QPS" (queries per second) is a TLA. The SDK
  applies "first letter cap, rest lower" for camelCase — so `Qps`
  here. But the wire form is `target_qps` (all-lower), Go SDK uses
  `TargetQps`, the JSDoc and comments mix "QPS" (uppercase) and
  "qps". This SDK has a precedent: `URL`/`url` is lowercase,
  `HTTP`/`http` matches casing context (`HttpClient`, `HttpRequest`),
  `id` is lowercase. So `Qps` is consistent with `Http`/`Url`
  casing for acronyms; flag is only against the JSDoc/comment mix.
- **Suggestion:** Standardize comments to use `QPS` consistently when
  the prose is talking about the term, and `targetQps` for the TS
  identifier. Or rename to `targetQueriesPerSecond` (verbose but
  self-documenting). See also F5.x.

#### F3.3 — `CPU` rendered in JSDoc as "(total CPU)" (acceptable)
- **Where:** `model.ts:69, 162, 165, 235`.
- JSDoc only; no identifier impact. Fine.

#### F3.4 — `URL` / `Url` (acceptable for this file)
- `client.ts:86, 123, 148, 174, 179, 221, 247, 279` uses lowercase
  `url` consistently. No casing inconsistency.

---

### 4. Underscores in TS identifiers

> The TypeScript style guide (Google) and the SDK's own
> `typescript.mdc` disallow `snake_case` and underscores in
> identifiers. The generator emits proto-style "outer_inner" names
> as `Outer_Inner` to disambiguate nested messages.

#### F4.1 — `EndpointStatus_State` enum (HIGH, generator concern)
- **Where:** `model.ts:46-65`, `client.ts:36, 335, 338, 376, 377`,
  `index.ts:10`.
  ```ts
  // eslint-disable-next-line @typescript-eslint/naming-convention --
  //   Proto-style nested enum name.
  export enum EndpointStatus_State { … }
  ```
- **Why flagged:** Requires an `eslint-disable-next-line` to compile —
  always a smell. The TS-idiomatic equivalents are namespace nesting
  (`namespace EndpointStatus { export enum State { … } }`) or flat
  PascalCase (`EndpointStatusState`).
- **Suggestion:** Drop the underscore at the generator level. Two
  viable shapes:
  1. Flat PascalCase — `EndpointStatusState`.
  2. Namespace nesting — `EndpointStatus.State`.
  With the F1.2 rename, this becomes `VectorSearchEndpointStatusState`
  (long) or `VectorSearchEndpointStatus.State` (cleaner).

#### F4.2 — Schema names contain `_` indirectly (LOW)
- **Where:** No `_` in this package's schema names (it has no
  `*_Response`/`*_State` schemas other than the enum above). This
  package is lighter on the underscore problem than `budgets`.

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts:83, 108, 120, 145, 170, 200, 218, 244, 276`,
  `client.ts:202, 212`.
- **Why flagged:** Already flagged under F1.5 / F14.1.

#### F5.2 — `resp` / `respBody` (LOW, Go-ism)
- **Where:** `client.ts:88, 93, 98, 101, 124, 128, 134, 137, 149,
  154, 159, 162, 180, 184, 190, 193, 205, 209, 223, 228, 233, 236,
  252, 257, 262, 268, 280, 285, 289, 294, 300, 322, 363, 370`.
- **Why flagged:** `response` is two extra characters and unambiguous.
- **Suggestion:** `response`, `responseBody`.

#### F5.3 — `pollResp` (LOW)
- **Where:** `client.ts:322, 329, 339, 363, 370`.
- **Why flagged:** Same `resp` Go-ism inside the waiter.
- **Suggestion:** `pollResponse`.

#### F5.4 — `httpReq` (LOW)
- **Where:** `client.ts:92, 128, 153, 184, 227, 256, 288`.
- **Why flagged:** `httpRequest` is clearer and matches the type
  `HttpRequest` exactly.
- **Suggestion:** `httpRequest`.

#### F5.5 — `apiErr` (LOW)
- **Where:** `utils.ts:88-91`.
- **Why flagged:** `apiError` reads better; "err" is a Go-ism.
- **Suggestion:** `apiError`.

#### F5.6 — `pkgJson` (LOW)
- **Where:** `client.ts:20, 50-52`.
- **Why flagged:** "pkg" abbreviation. `packageJson` is two extra
  characters and unambiguous.
- **Suggestion:** `packageJson`.

#### F5.7 — `msg` (LOW)
- **Where:** `client.ts:339-340`.
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

#### F5.9 — `info` in `client.ts:71-77` (LOW)
- **Where:** `client.ts:71-77`.
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
- **Where:** `model.ts:113`.
- **Why flagged:** The field is described as "Name of the vector
  search endpoint" but used as the path-segment identifier in
  `getEndpoint`, `deleteEndpoint`, `patchEndpoint`, etc.
  (`client.ts:123, 148, 221, 247, 279`). Also, `Endpoint` has both
  `name` and `id` (line 125), with `id` documented as "Unique
  identifier of the endpoint" — so the type has *two* identifiers
  and only one of them ever shows up in URLs.
- **Suggestion:** Document explicitly: "Used as the primary
  identifier in API paths." Or rename `name → endpointName` (still
  generic) or `name → key` (more explicit). Also clarify in JSDoc
  that `name` is the URL-safe identifier and `id` is the opaque GUID.
  See F12.3 / F19.2.

#### F6.2 — `numIndexes` reads as "number of *array* indexes" (MEDIUM)
- **Where:** `model.ts:129`.
- **Why flagged:** In TS, "index" almost universally means a numeric
  position in an array. Here it means "number of vector-search
  indexes attached to this endpoint" — a domain term, not the
  data-structure term.
- **Suggestion:** Rename `numIndexes → numVectorIndexes` (matches
  `MiniVectorIndex` / `VectorIndex` in the sibling `indexes`
  package). Even better: pluralize naturally, `vectorIndexCount`.

#### F6.3 — `EndpointStatus_State.OFFLINE` as a *terminal failure* state (HIGH)
- **Where:** `model.ts:50`, `client.ts:338-341, 376-380`.
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

#### F6.4 — `EndpointType.STANDARD_ON_ORION` leaks infra implementation (MEDIUM)
- **Where:** `model.ts:9-10`.
- **Why flagged:** "Orion" is an internal Databricks infrastructure
  name; the JSDoc says "Standard endpoint backed by Orion
  infrastructure with endpoint-scoped reconciliation." This is a
  *user-visible* enum value that exposes internal architecture. If
  Orion is renamed, this enum value cannot change without breaking
  callers.
- **Suggestion:** Wire-protocol value; cannot rename in TS. Flag for
  upstream API redesign — public enum members should describe user
  semantics (e.g. `STANDARD_V2`), not internal infra.

#### F6.5 — `minimalConcurrencyAllowed` vs "minimum concurrency" in JSDoc (LOW)
- **Where:** `model.ts:71-72, 168-169, 237-238`.
- **Why flagged:** Field uses `minimal` but the JSDoc says
  "minimum". `minimal` is a different word — "the least possible"
  vs `minimum` "the lower bound". For a lower-bound limit
  `minimumConcurrencyAllowed` is the correct English word; "minimal
  concurrency" suggests "barely any concurrency".
- **Suggestion:** Rename `minimalConcurrencyAllowed →
  minimumConcurrencyAllowed`. Wire field is `minimal_concurrency_allowed`
  (model.ts:271, 356) — needs a generator-level fix or remapping in
  the marshaller.

#### F6.6 — `Endpoint.creator` is a user *identifier*, not the user (LOW)
- **Where:** `model.ts:115`. JSDoc: "Creator of the endpoint".
- **Why flagged:** "Creator" suggests a `User` object; the field type
  is `string`. Compare `lastUpdatedUser` (also `string`).
- **Suggestion:** `creatorUserName` or `creatorEmail`, depending on
  what the wire returns. Or `createdBy` (matches REST convention).

#### F6.7 — `lastUpdatedUser` vs `creator` asymmetry (LOW)
- **Where:** `model.ts:115, 123`.
- **Why flagged:** Two fields, both `string`, both identify a user,
  with different naming patterns: `creator` (noun) vs
  `lastUpdatedUser` (compound). Inconsistent.
- **Suggestion:** `createdBy` and `updatedBy` (matches REST common
  practice) or `creator` and `lastUpdater`. Pick one form.

#### F6.8 — `flattenQueryParams` is exported but unused in this package (LOW)
- **Where:** `utils.ts:123-150`.
- **Why flagged:** The package's only list endpoint uses
  `URLSearchParams.append` directly (`client.ts:175-177`). The
  helper is dead in this package — same finding as in the `budgets`
  audit.
- **Suggestion:** Move shared helpers to `@databricks/sdk-core` or
  delete from per-package `utils.ts`. Cross-cutting.

#### F6.9 — JSDoc `"Update an endpoint"` on `patchEndpoint` lacks the verb match (LOW)
- **Where:** `client.ts:216`.
- **Why flagged:** JSDoc says "Update", the method is `patchEndpoint`.
  Inconsistent verb. (See F17.1.)
- **Suggestion:** Either rename the method or rewrite the JSDoc:
  "Patch an endpoint to update mutable fields."

---

### 7. Overly verbose

#### F7.1 — `Endpoint` *would* be fine — but combined with package
  rename, becomes `VectorSearchEndpoint` (HIGH)
- **Where:** `model.ts:111`, `index.ts:19`.
- **Why flagged:** Today `Endpoint` is too generic (F1.1). After the
  F0/F1 rename it becomes `VectorSearchEndpoint` — long but
  necessary. Worth noting as a deliberate tradeoff, not a bug.
- **Suggestion:** Accept the verbosity; mitigate by aliasing at
  import sites where appropriate.

#### F7.2 — `PatchEndpointBudgetPolicyRequest`,
  `PatchEndpointBudgetPolicyResponse` (HIGH)
- **Where:** `model.ts:199, 206`, `index.ts:26-27`.
- **Why flagged:** 32+ characters. Inside a method literally named
  `patchEndpointBudgetPolicy(...)`, the request type repeats every
  token. Compare typical TS SDK shape:
  `endpoint.patchBudgetPolicy(req: PatchBudgetPolicyRequest)`.
- **Suggestion:** With F0/F1 rename, drop the redundant `Endpoint`
  token. The method belongs to a vector-search-endpoint client, so
  `PatchBudgetPolicyRequest` / `PatchBudgetPolicyResponse` is enough.

#### F7.3 — `PatchEndpointThroughputRequest`,
  `PatchEndpointThroughputResponse` (HIGH)
- **Where:** `model.ts:232, 255`, `index.ts:28-30`.
- **Why flagged:** Same as F7.2.
- **Suggestion:** `PatchThroughputRequest` /
  `PatchThroughputResponse`.

#### F7.4 — Method names: `patchEndpointBudgetPolicy`,
  `patchEndpointThroughput`, `createEndpoint`, `deleteEndpoint`,
  `getEndpoint`, `listEndpoint`, `patchEndpoint` (MEDIUM)
- **Where:** `client.ts:82, 119, 144, 169, 217, 243, 275`.
- **Why flagged:** "Endpoint" repeats in every method name. The
  containing class is *already* the endpoints client (or will be
  after F0 rename — `VectorSearchEndpointsClient`). Compare typical
  TS SDK shape: `endpoints.create(...)`, `endpoints.patchBudgetPolicy(...)`.
- **Suggestion:** `create`, `delete`, `get`, `list`, `listIter`,
  `patch`, `patchBudgetPolicy`, `patchThroughput`. Cross-package
  convention.

#### F7.5 — `currentConcurrencyUtilizationPercentage` (HIGH)
- **Where:** `model.ts:166-167`, `model.ts:355, 366`.
- **Why flagged:** 39 characters. Three concept tokens
  (concurrency + utilization + percentage). The "percentage" can be
  inferred from the JSDoc unit (0-100).
- **Suggestion:** `concurrencyUtilization` plus JSDoc that documents
  the unit. Or `concurrencyUtilizationPct` if the abbreviated form
  is preferred.

#### F7.6 — `EndpointThroughputInfo`, `EndpointScalingInfo` (LOW)
- **Where:** `model.ts:142, 161`.
- **Why flagged:** `Info` suffix is a generic filler word. The types
  describe throughput state and scaling state, respectively.
- **Suggestion:** `EndpointThroughput`, `EndpointScaling`. Or align
  with `EndpointStatus` (already there, no `Info`).

#### F7.7 — `createEndpointWaiter` method (MEDIUM)
- **Where:** `client.ts:107-116`.
- **Why flagged:** This method is `createEndpoint` + return-a-waiter.
  All sibling SDKs (`warehouses`, `modelservingmanagement`) export
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
  See F17.5.

#### F7.8 — `listEndpointIter` (MEDIUM)
- **Where:** `client.ts:199-214`.
- **Why flagged:** `Iter` suffix is Go-style; in TS the idiomatic
  alternative is an async iterator method
  (`[Symbol.asyncIterator]`) or a name like `listAll` /
  `streamEndpoints`.
- **Suggestion:** Tied to F17.4: `listIter` (drop the singular
  `Endpoint`) or `iterate` / `stream` / `listAll`. Cross-package.

#### F7.9 — `STILL_RUNNING` / `StillRunningError` (LOW)
- **Where:** `client.ts:54`.
- **Why flagged:** Private error class used as a control-flow signal
  for `retryOn`. Three concepts in one name ("still" + "running" +
  "error"). It is essentially "not yet done".
- **Suggestion:** Acceptable as-is; alternative
  `RetryablePendingError` or `NotYetDoneError`.

---

### 8. Redundant suffixes

#### F8.1 — `Request` / `Response` suffixes (LOW, conventional)
- **Where:** All request/response types.
- **Why flagged:** Conventional in this SDK. Note: this package
  does NOT have the `_Response` underscore problem the `budgets`
  package has — names are flat (`CreateEndpointRequest`,
  `DeleteEndpointResponse`). Good.
- **Suggestion:** No change.

#### F8.2 — `EndpointType` enum tautology (LOW)
- **Where:** `model.ts:6`, `Endpoint.endpointType: EndpointType`
  (`model.ts:121`).
- **Why flagged:** Three layers of "endpoint": `Endpoint` has a
  field `endpointType` typed as `EndpointType`. Reads as
  `endpoint.endpointType : EndpointType`.
- **Suggestion:** Rename field `endpointType → type` (loses one
  redundancy, becomes `endpoint.type : EndpointType`). Wire field
  is `endpoint_type` (`model.ts:299, 424`), so a remap is needed.
  See F20.1.

#### F8.3 — `EndpointStatus` interface + `endpointStatus` field on `Endpoint` (LOW)
- **Where:** `model.ts:127, 153`.
- **Why flagged:** Same pattern as F8.2:
  `endpoint.endpointStatus : EndpointStatus`.
- **Suggestion:** Rename field `endpointStatus → status`. Wire field
  is `endpoint_status` — generator-level remap.

#### F8.4 — `EndpointThroughputInfo` / `EndpointScalingInfo` `Info` suffix (LOW)
- See F7.6.

#### F8.5 — `ThroughputChangeRequestState` (LOW)
- **Where:** `model.ts:20`.
- **Why flagged:** `Throughput` + `Change` + `Request` + `State` —
  four concept tokens. `RequestState` is partially redundant with
  `ChangeRequestState`.
- **Suggestion:** `ThroughputChangeState` (3 tokens) is enough.

---

### 9. Singular / plural mismatches

#### F9.1 — `listEndpoint` method singular for a collection (HIGH)
- **Where:** `client.ts:169`.
- **Why flagged:** Method returns `ListEndpointResponse` whose
  `endpoints` field is `Endpoint[]`. The method should be
  `listEndpoints` (plural). Same applies to its iterator and
  request type: `listEndpointIter` should be `listEndpointsIter`,
  `ListEndpointRequest` should be `ListEndpointsRequest`,
  `ListEndpointResponse` should be `ListEndpointsResponse`.
- **Suggestion:** Pluralize throughout. The wire path is
  `/api/2.0/vector-search/endpoints` — plural — so this is also
  consistent with the URL.

#### F9.2 — `ListEndpointRequest` / `ListEndpointResponse` types (HIGH)
- **Where:** `model.ts:187, 192`.
- See F9.1.

#### F9.3 — `Endpoint.numIndexes` plural (acceptable)
- **Where:** `model.ts:129`.
- Plural is correct for a count of indexes.

#### F9.4 — `Endpoint.customTags: CustomTag[]` plural (acceptable)
- **Where:** `model.ts:135`.
- Plural is correct for an array.

#### F9.5 — `CreateEndpointRequest.numReplicas` vs
  `PatchEndpointThroughputRequest.numReplicas` vs
  `EndpointThroughputInfo.requestedNumReplicas` /
  `currentNumReplicas` (acceptable)
- **Where:** `model.ts:87, 252, 177, 179`.
- Consistent use of `numReplicas` (plural) as a count.

---

### 10. Reserved-word / built-in collisions

#### F10.1 — `delete` method name (LOW)
- **Where:** `client.ts:119` (`deleteEndpoint`).
- **Why flagged:** TS allows `delete` as method name. `deleteEndpoint`
  is unambiguous; flag would apply only if F7.4 renames it to bare
  `delete` (then it would shadow the `delete` keyword visually but is
  still legal).
- **Suggestion:** Acceptable; relevant only if F7.4 is applied.

#### F10.2 — `status` field (LOW)
- **Where:** `model.ts:257`.
- **Why flagged:** `Response.status` collides with `Response.status`
  in the Fetch API. Mild shadowing concern in code review.
- **Suggestion:** See F1.8.

#### F10.3 — `state` field (LOW)
- **Where:** `model.ts:144, 155`.
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

#### F11.1 — `AdjustedThroughputRequest` exposed as a *response*
  payload (MEDIUM)
- **Where:** `model.ts:68-75, 264`.
- **Why flagged:** Type name says "Request" (line 67 JSDoc:
  "Adjusted throughput request parameters") but it appears in a
  response field: `PatchEndpointThroughputResponse.adjustedRequest`
  (line 264). This is OK semantically — it's the *request that was
  applied after adjustment* — but a reader sees `AdjustedThroughputRequest`
  in a *response* and double-takes. Borderline misleading.
- **Suggestion:** Either:
  - Rename to `AdjustedThroughputParameters` (drop "Request"), or
  - Rename to `AppliedThroughputAdjustment` (explicit), or
  - Document the dual role prominently in JSDoc.

---

### 12. Duplicate concepts

#### F12.1 — `numReplicas` in three different places (HIGH)
- **Where:**
  - `CreateEndpointRequest.numReplicas` (`model.ts:87`)
  - `PatchEndpointThroughputRequest.numReplicas` (`model.ts:252`)
  - `EndpointThroughputInfo.requestedNumReplicas` (`model.ts:177`)
  - `EndpointThroughputInfo.currentNumReplicas` (`model.ts:179`)
- **Why flagged:** Same conceptual field, different names depending
  on context. `numReplicas` on create vs `requestedNumReplicas`
  in info vs `currentNumReplicas` in info. The asymmetry is
  intentional (request vs current vs target), but the naming pattern
  is inconsistent — see F12.2.
- **Suggestion:** Standardize: input fields stay `numReplicas`;
  state fields become `requestedReplicas` / `currentReplicas` (drop
  the `Num` — see F14.x).

#### F12.2 — `targetQps`, `requestedTargetQps`,
  `replicationFactor`, `numReplicas` describe overlapping concepts (HIGH)
- **Where:**
  - `CreateEndpointRequest.targetQps` (`model.ts:93`)
  - `PatchEndpointRequest.replicationFactor` (`model.ts:224`)
  - `PatchEndpointRequest.targetQps` (`model.ts:229`)
  - `PatchEndpointThroughputRequest.numReplicas` (`model.ts:252`)
  - `EndpointScalingInfo.requestedTargetQps` (`model.ts:149`)
- **Why flagged:** Three different ways to express how big the
  endpoint should be:
  - `targetQps` (queries per second; high-level intent)
  - `replicationFactor` (low-level OpenSearch parameter)
  - `numReplicas` (user-facing replica count)

  The JSDoc on `PatchEndpointRequest.replicationFactor` even says:
  "This is the raw replication factor, not 'total data copies'.
  For the user-facing replica count (which uses total-copies
  semantics), see `PatchEndpointThroughputRequest.num_replicas`."
  That cross-reference inside JSDoc is a strong smell — these are
  three names for two distinct concepts, and the type system does
  not enforce which goes where.
- **Suggestion:** API-shape concern. Consolidate at the spec level:
  pick one of (qps, replicas) as the public dimension; demote
  `replicationFactor` to "advanced" with a clearer name like
  `openSearchReplicationFactor` (so the implementation leak is
  explicit).

#### F12.3 — `Endpoint.name` vs `Endpoint.id` (HIGH)
- **Where:** `model.ts:113, 125`.
- **Why flagged:** Both fields are documented as identifiers
  ("Name of the vector search endpoint" / "Unique identifier of the
  endpoint"). Every URL uses `name`, never `id`. Two identifiers
  for the same entity confuse users; see F1.4, F6.1, F19.2.
- **Suggestion:** Document the distinction prominently
  (`name` = user-chosen URL-safe key, `id` = opaque GUID). Or
  collapse to one identifier at the API level.

#### F12.4 — `concurrency` (CPU) vs `numReplicas` vs `targetQps` mixed (MEDIUM)
- **Where:** `model.ts:69, 73, 87, 93, 162, 165, 168, 171, 177,
  235, 238, 240, 252`.
- **Why flagged:** Concurrency in `EndpointThroughputInfo` is "total
  CPU"; replicas are "data copies including primary"; QPS is a
  performance target. Three orthogonal dimensions, all related to
  "how big the endpoint is". The terms are easy to confuse.
- **Suggestion:** API-shape concern. Add a single explainer JSDoc on
  the `Endpoint` type explaining the relationship.

#### F12.5 — `budgetPolicyId` vs `effectiveBudgetPolicyId` (LOW)
- **Where:** `model.ts:131, 133, 207, 209`.
- **Why flagged:** Two fields, same domain, distinguished by the
  word "effective". A reader needs JSDoc to know which is the
  request and which is the result of policy resolution.
- **Suggestion:** Acceptable convention; JSDoc clarifies. Not a
  duplicate, just adjacent.

#### F12.6 — `usagePolicyId` vs `budgetPolicyId` (LOW)
- **Where:** `model.ts:83, 85`.
- **Why flagged:** Two different policy IDs whose JSDoc says one
  will be replaced by the other ("usagePolicyId" — "to be applied
  once we've migrated to usage policies"). Transitional API — both
  exist today.
- **Suggestion:** Acceptable transition; should be cleaned up post
  migration.

#### F12.7 — Per-method header construction duplicated (LOW, code style)
- **Where:** `client.ts:90, 126, 151, 182, 225, 254, 286`.
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
- `create*`, `delete*`, `get*`, `list*`, `patch*` — all uniform
  imperative present. Good.

#### F13.2 — `patch*` vs `update*` (MEDIUM)
- **Where:** Method `patchEndpoint` (`client.ts:217`), JSDoc says
  "Update an endpoint" (`client.ts:216`).
- **Why flagged:** REST verbs in the SDK are mixed. Most packages
  use `update*` (e.g. `updateBudgetConfiguration`); this package
  uses `patch*`. Both describe the same HTTP verb (`PATCH`) but
  with different SDK ergonomics.
- **Suggestion:** Cross-package decision. If the SDK standardizes
  on `update`, rename to `updateEndpoint`,
  `updateEndpointBudgetPolicy`, `updateEndpointThroughput`. If on
  `patch`, fix the JSDoc to say "Patch". See F17.1.

#### F13.3 — `createEndpoint` / `createEndpointWaiter` overlap (MEDIUM)
- **Where:** `client.ts:82, 107`.
- **Why flagged:** Two methods with the same verb start; only one
  actually performs the create — the waiter version *calls* the
  create then wraps. Reader might think `createEndpointWaiter` is
  a *different* operation.
- **Suggestion:** See F7.7. Acceptable if the verb pattern is
  applied consistently across the SDK; flag for cross-cutting
  decision.

#### F13.4 — `unmarshalXSchema` constants (LOW, code style)
- **Where:** `model.ts:267, 280, 290, 293, 329, 340, 350, 376, 387, 398`.
- **Why flagged:** Naming pattern `verb + noun + Schema` makes them
  read like functions; they are Zod constants. Same finding as
  in `budgets` audit (F13.3 there).
- **Suggestion:** Generator-level rename to `endpointWireSchema` or
  `endpointDecoderSchema`. Cross-cutting.

#### F13.5 — `creationTimestamp` / `lastUpdatedTimestamp` past-tense
  asymmetry (LOW)
- **Where:** `model.ts:117, 119`.
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

#### F14.1 — `req`, `resp`, `err`, `Iter`, `httpReq`, `apiErr`,
  `pkgJson`, `opts`, `msg` (HIGH, cross-cutting)
- **Where:**
  - `req` in every client method
  - `resp`, `respBody`, `pollResp` in `client.ts`
  - `e` in `utils.ts:76`
  - `Iter` suffix in `listEndpointIter`
  - `httpReq` in `client.ts`
  - `apiErr` in `utils.ts:88`
  - `pkgJson` in `client.ts:20, 50`
  - `opts` in `utils.ts:30, 65-92`
  - `msg` in `client.ts:339`
- **Why flagged:** All classic Go idioms ported verbatim. TS
  convention favors spelled-out names: `request`, `response`,
  `error`, `iterator`/`stream`/`listAll`, `httpRequest`,
  `apiError`, `packageJson`, `options`, `message`.
- **Suggestion:** Spell them out. Trivial diff, large readability
  gain. Generator-level decision; identical to the recommendation
  in the `budgets` audit.

#### F14.2 — `unmarshal*` / `marshal*` schema prefixes (LOW)
- **Where:** All schema exports.
- **Why flagged:** `marshal`/`unmarshal` is a Go term (`encoding/json`).
  The JS/TS world says "serialize"/"deserialize" or "encode"/"decode";
  `JSON.parse`/`JSON.stringify` is the vernacular.
- **Suggestion:** Generator-level rename to `encode`/`decode` or
  `serialize`/`deserialize`. Cross-cutting.

#### F14.3 — `Schema` suffix on Zod constants (acceptable)
- The `…Schema` suffix matches Zod community convention.

#### F14.4 — `for (;;)` infinite loop (acceptable)
- **Where:** `client.ts:204`, `utils.ts:48`.
- **Why flagged:** Style; this is a `for (;;)` Go-idiom (the Go form
  is `for { … }`). TS prefers `while (true)` or `do { … } while (…)`.
  But `for (;;)` is also legal and idiomatic in C-derived languages.
- **Suggestion:** Acceptable; consistent within the SDK.

#### F14.5 — `Waiter` suffix (Go-style) (MEDIUM)
- **Where:** `client.ts:107-116, 307`. Exported as
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

#### F14.6 — `numIndexes`, `numReplicas` `num` prefix (LOW)
- **Where:** `model.ts:87, 129, 177, 179, 252`.
- **Why flagged:** `num` is shortened from "number of". TS often
  uses the bare noun (`replicas`, `indexCount`) or `count` suffix.
- **Suggestion:** `replicaCount`, `indexCount` (more idiomatic).
  Wire field is `num_replicas` — generator-level remap.

---

### 15. Generic field names losing meaning

#### F15.1 — `Endpoint.name` (HIGH)
- See F1.4 / F6.1.

#### F15.2 — `Endpoint.id` (LOW)
- **Where:** `model.ts:125`.
- **Why flagged:** Bare `id` is the most generic identifier name
  possible. Acceptable inside the type domain — but only because
  the type is `Endpoint`.
- **Suggestion:** Keep; the type context disambiguates.

#### F15.3 — `state`, `status`, `message` (LOW)
- See F1.6, F1.7, F1.8.

#### F15.4 — `key` / `value` on `CustomTag` (LOW)
- **Where:** `model.ts:98-100`.
- **Why flagged:** Generic; same finding as `BudgetConfigurationFilter_TagClause.key/value`
  in `budgets`. Wrapping type supplies context, but `tagKey` /
  `tagValue` would self-document.
- **Suggestion:** Wire fields are `key`/`value`; rename costs a
  marshaller mapping. Optional.

#### F15.5 — `req` parameter on every client method (HIGH)
- See F1.5.

#### F15.6 — `concurrency` field (MEDIUM)
- **Where:** `model.ts:70, 236`.
- **Why flagged:** "Concurrency" alone is generic. JSDoc clarifies
  "(total CPU) for the endpoint" but the field name doesn't. Compare
  `currentConcurrency` / `requestedConcurrency` (descriptive) vs
  bare `concurrency` (ambiguous).
- **Suggestion:** Document "total CPU" semantics in JSDoc explicitly;
  consider `concurrencyCpu` or `totalCpu` rename. Or move CPU into
  its own dimension.

---

### 16. Field contradicting type domain

#### F16.1 — `AdjustedThroughputRequest` appears in a response (MEDIUM)
- See F11.1.

#### F16.2 — `EndpointThroughputInfo.changeRequestState:
  ThroughputChangeRequestState` (MEDIUM)
- **Where:** `model.ts:173`.
- **Why flagged:** The field name says "change request state"; the
  enum is `ThroughputChangeRequestState`. The type is *not* a state
  about *throughput change requests* abstractly — it's the state of
  the most recent throughput change request for *this* endpoint.
  Field name + type name both bury that scope. Compare a more
  direct `lastThroughputChangeState`.
- **Suggestion:** Rename field to `lastChangeState` (drop redundant
  "request"); or add JSDoc clarifying "Most recent" semantics.

#### F16.3 — `state` on `EndpointScalingInfo` is a *change* state, not
  a *scaling* state (LOW)
- **Where:** `model.ts:144`.
- **Why flagged:** Field is `state: ScalingChangeState` — the
  field-on-type domain is "scaling info", but the field type is
  "scaling **change** state". JSDoc says "The current state of the
  scaling change request" — so the field name should arguably
  match.
- **Suggestion:** Rename field to `changeState` or
  `lastChangeState`.

#### F16.4 — `EndpointStatus_State.RED_STATE`, `YELLOW_STATE` health
  semantics (LOW)
- **Where:** `model.ts:57-58`.
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

#### F17.3 — `listEndpointIter` (MEDIUM)
- **Where:** `client.ts:199`. Already flagged in F7.8 / F14.1.

#### F17.4 — `marshal` / `unmarshal` / `parseResponse` /
  `marshalRequest` (LOW)
- **Where:** `utils.ts:113, 119`, all schema names.
- **Why flagged:** `parse` vs `marshal` use different verbs for the
  same kind of operation (JSON conversion). Inconsistent verb
  choice. Same finding as `budgets` F17.4.
- **Suggestion:** Use the same axis throughout: either
  `marshal/unmarshal` or `encode/decode` or `serialize/deserialize`.

#### F17.5 — `createEndpoint` returns `Endpoint`,
  `createEndpointWaiter` returns `CreateEndpointWaiter` (MEDIUM)
- **Where:** `client.ts:82, 107`.
- See F7.7 / F13.3.

#### F17.6 — `wait` vs `done` on `CreateEndpointWaiter` (acceptable)
- **Where:** `client.ts:318, 362`.
- Both verbs are well-chosen. `wait` is blocking-until-terminal;
  `done` is a non-blocking check. Symmetric and clear.

---

### 18. Long enum values

#### F18.1 — `SCALING_CHANGE_IN_PROGRESS` (MEDIUM)
- **Where:** `model.ts:16`. 26 characters; mostly the redundant
  `SCALING_CHANGE_` prefix (F2.1).
- **Suggestion:** With prefix stripped → `IN_PROGRESS` (11 chars).

#### F18.2 — `SCALING_CHANGE_UNSPECIFIED` (MEDIUM)
- **Where:** `model.ts:14`. 26 characters; same root cause.
- **Suggestion:** With prefix stripped → `UNSPECIFIED` (11 chars).

#### F18.3 — `CHANGE_REACHED_MINIMUM`, `CHANGE_REACHED_MAXIMUM` (MEDIUM)
- **Where:** `model.ts:26, 28`. 22 characters each.
- **Suggestion:** With prefix stripped → `REACHED_MINIMUM` /
  `REACHED_MAXIMUM` (15 chars).

#### F18.4 — `STORAGE_OPTIMIZED`, `STANDARD_ON_ORION` (LOW)
- 17 chars each; reasonable. `ON_ORION` is an infra leak (F6.4).

#### F18.5 — `PROVISIONING` (acceptable)
- 12 chars. Standard.

---

### 19. Underspecified IDs

#### F19.1 — `Endpoint.id` (LOW)
- See F15.2. Bare `id` inside `Endpoint` is fine.

#### F19.2 — `Endpoint.name` doubles as ID (HIGH)
- See F1.4 / F6.1 / F12.3. Two identifiers (`name` and `id`) for
  the same entity is the underspecification problem.

#### F19.3 — `budgetPolicyId`, `usagePolicyId`,
  `effectiveBudgetPolicyId` (acceptable)
- **Where:** `model.ts:83, 85, 131, 133, 201, 203, 207, 209`.
- Specific enough; matches platform-wide convention.

---

### 20. Type-suffix tautology

#### F20.1 — `Endpoint.endpointType: EndpointType` (MEDIUM)
- **Where:** `model.ts:121`, `model.ts:81`.
- **Why flagged:** Three layers of "endpoint":
  `endpoint.endpointType : EndpointType`. The container provides
  the "endpoint" context.
- **Suggestion:** Rename field `endpointType → type` (similar
  pattern in `budgets` F20.1 / F20.2). Wire field is
  `endpoint_type`; needs a marshaller remap.

#### F20.2 — `Endpoint.endpointStatus: EndpointStatus` (MEDIUM)
- **Where:** `model.ts:127`, `model.ts:153`.
- **Why flagged:** Same pattern.
- **Suggestion:** Rename field `endpointStatus → status`.

#### F20.3 — `EndpointStatus.state: EndpointStatus_State` (LOW)
- **Where:** `model.ts:155`.
- **Why flagged:** Field is `state`, enum is `EndpointStatus_State`.
  Not strictly tautological (the field is the bare noun, the type
  is the qualified noun). Acceptable.

#### F20.4 — `PatchEndpointThroughputResponse.status:
  ThroughputPatchStatus` (LOW)
- **Where:** `model.ts:257`, `model.ts:36`.
- **Why flagged:** Field is `status`; type is `ThroughputPatchStatus`.
  Reading `response.status : ThroughputPatchStatus` is "status . throughput
  patch status".
- **Suggestion:** Rename field to `result` (less tautological), or
  rename enum to drop `Status` (becomes `ThroughputPatch`). Or
  accept the tautology.

#### F20.5 — `EndpointScalingInfo.state: ScalingChangeState` (LOW)
- **Where:** `model.ts:144`.
- **Why flagged:** Same pattern. Field `state` typed against
  `ScalingChangeState` reads "scaling info . state : scaling change
  state".
- **Suggestion:** Rename field to `changeState` (matches the enum's
  domain better). See F16.3.

#### F20.6 — `EndpointThroughputInfo.changeRequestState:
  ThroughputChangeRequestState` (LOW)
- **Where:** `model.ts:173`.
- **Why flagged:** Field name and type name carry the same tokens
  (`changeRequestState` ↔ `ChangeRequestState`).
- **Suggestion:** Acceptable; this is the standard pattern.

---

## Package overlap: `endpoints` vs `warehouses` vs `modelservingmanagement` vs `indexes`

This SDK exposes *three* distinct "endpoint" packages plus a sibling
"index" package, all conceptually distinct but lexically similar.

### F-OVERLAP.1 — `Endpoint` symbol exists in three places (HIGH)
- **Where:**
  - `packages/endpoints/src/v1` exports `Endpoint`
  - `packages/warehouses/src/v1` exports `EndpointState`,
    `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy`,
    `EndpointHealth_Status`
  - `packages/modelservingmanagement/src/v1` exports
    `InferenceEndpoint`, `ServingEndpointDetailedPermissionLevel`,
    `InferenceEndpointState_*`
- **Why flagged:** Project-wide `grep -r Endpoint` returns hits across
  all three packages. Autocomplete on "Endpoint" collides. Even with
  qualified imports, mental load is high.
- **Suggestion:** Rename per F0.1. The model serving package already
  qualifies its primary type as `InferenceEndpoint`; this package
  should qualify as `VectorSearchEndpoint`; the warehouse package's
  legacy `Endpoint*` names are wire-protocol and should be deprecated
  but left for compatibility.

### F-OVERLAP.2 — `indexes` companion package is also under-qualified (LOW)
- See F0.3.

### F-OVERLAP.3 — Pluralization of package names (`endpoints` plural
  vs `modelservingmanagement` singular vs `warehouses` plural) (LOW)
- Cross-package style decision. Some packages use plural
  (`endpoints`, `warehouses`, `clusters`, `budgets`), some
  singular (`modelservingmanagement`, `budgetpolicy`, `bundle`).
- **Suggestion:** Pick one. Cross-cutting.

### F-OVERLAP.4 — `EndpointType` exists in this package vs
  `WarehouseType` exists in `warehouses` (LOW)
- **Where:** `model.ts:6` here vs
  `warehouses/src/v1/index.ts` line for `WarehouseType`.
- **Why flagged:** `WarehouseType` is qualified; `EndpointType` is
  bare. After F0/F1 rename it becomes `VectorSearchEndpointType` —
  symmetric with `WarehouseType`.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 0 | **Package name (special)**              | 3        |
| 1 | Vague / generic                         | 9        |
| 2 | Redundant enum prefixes                 | 5        |
| 3 | Acronym casing                          | 4 (3 acceptable) |
| 4 | Underscores in TS identifiers           | 2        |
| 5 | Cryptic abbreviations                   | 10       |
| 6 | Misleading names                        | 9        |
| 7 | Overly verbose                          | 9        |
| 8 | Redundant suffixes                      | 5        |
| 9 | Singular / plural mismatch              | 5 (3 acceptable) |
| 10 | Reserved-word collisions               | 5 (3 acceptable) |
| 11 | Empty / trivial wrappers               | 1        |
| 12 | Duplicate concepts                     | 7        |
| 13 | Verb-tense inconsistency               | 5 (1 acceptable) |
| 14 | Go / Java-style names                  | 6        |
| 15 | Generic field names                    | 6        |
| 16 | Field contradicting type domain        | 4        |
| 17 | Inconsistent action verbs              | 6 (2 acceptable) |
| 18 | Long enum values                       | 5 (1 acceptable) |
| 19 | Underspecified IDs                     | 3 (2 acceptable) |
| 20 | Type-suffix tautology                  | 6 (3 acceptable) |
| OVERLAP | endpoints vs warehouses vs serving | 4 |
| **Total** |                                     | **118**  |

---

## Top highest-impact renames (recommended order)

1. **F0.1 / F0.2 / F1.1 / F1.2 / F-OVERLAP.1:** Rename the package
   to `@databricks/sdk-vectorsearchendpoints` (or
   `@databricks/sdk-vectorsearch`); rename `Endpoint` to
   `VectorSearchEndpoint`. This single change eliminates the most
   confusing ambiguity in the package.
2. **F2.1 / F2.2 / F2.3:** Strip the redundant member prefixes from
   `ScalingChangeState` (`SCALING_CHANGE_*`),
   `ThroughputChangeRequestState` (`CHANGE_*`), and
   `ThroughputPatchStatus` (`PATCH_*`).
3. **F9.1 / F9.2:** Pluralize the list method, request, and response:
   `listEndpoints`, `ListEndpointsRequest`, `ListEndpointsResponse`,
   `listEndpointsIter`.
4. **F4.1 / F14.4:** Replace `EndpointStatus_State` with namespace
   nesting or flat PascalCase (`EndpointStatusState`); eliminate
   the `eslint-disable-next-line` for `naming-convention`.
5. **F6.5:** Rename `minimalConcurrencyAllowed →
   minimumConcurrencyAllowed` (the existing name is grammatically
   wrong English).
6. **F12.3 / F1.4 / F6.1 / F19.2:** Resolve the `Endpoint.name` vs
   `Endpoint.id` duality — either document the distinction
   prominently or unify at the API level.
7. **F8.2 / F20.1 / F20.2:** Drop redundant tokens from
   `Endpoint.endpointType` and `Endpoint.endpointStatus` to bare
   `type` / `status`.
8. **F14.1 / F5.x:** Spell out `req`/`resp`/`err`/`Iter`/`opts`/
   `pkgJson`/`msg` across the generated code.
9. **F12.2:** Resolve the `targetQps` / `replicationFactor` /
   `numReplicas` overlap at the API spec level — three names for
   related concepts, with JSDoc cross-references between them, is
   a strong smell.

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
  duplication itself is not a naming issue, but the *names*
  (`marshal/unmarshal`) are Go-flavored and inconsistent with
  `parseResponse`.
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
