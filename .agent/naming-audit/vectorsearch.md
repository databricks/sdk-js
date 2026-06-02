# Naming Audit: vectorsearch

**Path:** `packages/vectorsearch/src/v1/` (consolidation of the prior `endpoints` and `indexes` packages from the 2026-05-22 regen)
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`
**Total weird names flagged:** 4

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 1     |
| Medium       | 3     |
| **Total**    | **4** |

---

## High severity

### 1. `listEndpoint` / `listVectorIndex` method names are singular for collection operations — `src/v1/client.ts:348, 399`
- **Why weird:** Both methods return a collection (`ListEndpointResponse.endpoints: Endpoint[]`, `ListVectorIndexResponse.vectorIndexes: MiniVectorIndex[]`) yet the method names are singular. The corresponding URLs are plural (`/endpoints`, `/indexes`) and the body field names are plural. The request/response types (`ListEndpointRequest`, `ListEndpointResponse`, `ListVectorIndexRequest`, `ListVectorIndexResponse`) inherit the singular form.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verbs).
- **Suggested name:** `listEndpoints`, `listVectorIndexes`, `ListEndpointsRequest`, `ListEndpointsResponse`, `ListVectorIndexesRequest`, `ListVectorIndexesResponse`. The iterator pair (`listEndpointIter`, `listVectorIndexIter`) follows: `listEndpointsIter`, `listVectorIndexesIter`.
- **Rationale:** A collection method should be plural to match its return type, the wire URL, and the response field shape.

---

## Medium severity

### 2. `UpsertDeleteDataStatus` and `UpsertDeleteDataResult` couple two unrelated verbs — `model.ts:52-56, 633`
- **Why weird:** Both names join two verbs (`Upsert` AND `Delete`) into one compound noun. There is no "upsert-delete" operation — the type is used as the response shape for two separate operations (`UpsertDataVectorIndexResponse`, `DeleteDataVectorIndexResponse`). The JSDoc on the fields where they are used confirms the verbs are alternatives, not a sequence (`model.ts:156, 629` — "Result of the upsert or delete operation").
- **Category:** 13 (verb-coupling), 7 (verbose), 1 (generic `Status`/`Result`).
- **Suggested name:** Split into `UpsertDataStatus` / `DeleteDataStatus` (aliases of the same wire enum), or use a neutral name `DataMutationStatus` / `DataMutationResult`.
- **Rationale:** Two-verb compound nouns are unusual and confusing. Most APIs use a single neutral noun for shared response types.

### 3. `createEndpointWaiter` is a parallel verb-method to `createEndpoint` — `client.ts:149-158`
- **Why weird:** Two methods with the same verb start (`createEndpoint` / `createEndpointWaiter`). The waiter version *calls* `createEndpoint` then wraps the result in a `CreateEndpointWaiter`. A reader sees two `create*` methods and may think they are different operations. The Java/Go SDK convention surfaces a waiter via a side return; TS would more naturally inline the wait (`createEndpointAndWait`).
- **Category:** 7 (verbose), 13 (verb overlap), 17 (inconsistent action verbs).
- **Suggested name:** Either fold the wait into `createEndpoint` (return a `CreateEndpointWaiter` that is both an awaitable and the resource shape), or rename to `createEndpointAndWait`, or expose a single `waitForEndpoint(name)` that any caller can use after `createEndpoint`.
- **Rationale:** Two `create*` methods for one logical "create" operation force every caller to learn which one to use. There is also no analogous waiter for the index create flow, so the pattern is inconsistent within the package.

### 4. `EndpointStatus_State` mixes lifecycle and health axes — `model.ts:70-88`
- **Why weird:** The enum lumps lifecycle states (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) with health-colored states (`RED_STATE`, `YELLOW_STATE`) in a single dimension. The comment block on lines 74-79 even calls out that the health states only apply once the endpoint is "ready". A consumer writing a state machine has to know which states are mutually exclusive with which others.
- **Category:** 16 (field contradicting domain — two orthogonal axes squeezed into one enum), 6 (misleading).
- **Suggested name:** Split into `EndpointLifecycleState` and `EndpointHealth`. Reflect both on `EndpointStatus` as two fields.
- **Rationale:** Single-enum mixing of orthogonal dimensions is an API-design smell.
