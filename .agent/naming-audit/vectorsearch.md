# Naming Audit: vectorsearch

**Path:** `packages/vectorsearch/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`
**Total weird names flagged:** 3

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 1     |
| Medium       | 2     |
| **Total**    | **3** |

---

## High severity

### 1. `listVectorIndex` method name is singular for a collection operation — `src/v1/client.ts:407`
- **Why weird:** The method returns a collection (`ListVectorIndexResponse.vectorIndexes: MiniVectorIndex[]`) yet the method name is singular. The wire URL is plural (`/indexes`) and the response field name is plural. The request/response types (`ListVectorIndexRequest`, `ListVectorIndexResponse` — `model.ts:392, 399`) and the iterator (`listVectorIndexIter` — `client.ts:444`) inherit the singular form. The endpoint-list family is plural (`listEndpoints`, `ListEndpointsRequest`), but its response type `ListEndpointResponse` (`model.ts:375`) is singular, mismatching its own request type.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verbs).
- **Suggested name:** `listVectorIndexes`, `ListVectorIndexesRequest`, `ListVectorIndexesResponse`, `listVectorIndexesIter`; `ListEndpointsResponse` to match `ListEndpointsRequest`.
- **Rationale:** A collection method should be plural to match its return type, the wire URL, and the response field shape.

---

## Medium severity

### 2. `UpsertDeleteDataStatus` and `UpsertDeleteDataResult` couple two unrelated verbs — `model.ts:69-76, 691`
- **Why weird:** Both names join two verbs (`Upsert` AND `Delete`) into one compound noun. There is no "upsert-delete" operation — the type is used as the response shape for two separate operations (`UpsertDataVectorIndexResponse`, `DeleteDataVectorIndexResponse`). The JSDoc on the fields where they are used confirms the verbs are alternatives, not a sequence (`model.ts:184, 687` — "Result of the upsert or delete operation").
- **Category:** 13 (verb-coupling), 7 (verbose), 1 (generic `Status`/`Result`).
- **Suggested name:** Split into `UpsertDataStatus` / `DeleteDataStatus` (aliases of the same wire enum), or use a neutral name `DataMutationStatus` / `DataMutationResult`.
- **Rationale:** Two-verb compound nouns are unusual and confusing. Most APIs use a single neutral noun for shared response types.

### 3. `EndpointStatus_State` mixes lifecycle and health axes — `model.ts:94-116`
- **Why weird:** The enum lumps lifecycle states (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) with health-colored states (`RED_STATE`, `YELLOW_STATE`) in a single dimension. The comment block on lines 99-103 even calls out that the health states only apply once the endpoint is "ready". A consumer writing a state machine has to know which states are mutually exclusive with which others.
- **Category:** 16 (field contradicting domain — two orthogonal axes squeezed into one enum), 6 (misleading).
- **Suggested name:** Split into `EndpointLifecycleState` and `EndpointHealth`. Reflect both on `EndpointStatus` as two fields.
- **Rationale:** Single-enum mixing of orthogonal dimensions is an API-design smell.
