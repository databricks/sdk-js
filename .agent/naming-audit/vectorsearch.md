# Naming Audit: vectorsearch

**Path:** `packages/vectorsearch/src/v1/` (consolidation of the prior `endpoints` and `indexes` packages from the 2026-05-22 regen)
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`
**Inferred domain:** Databricks AI/Vector Search — endpoint management (create, get, list, patch, delete, budget-policy patch) and vector-index management (create, get, list, query, query-next-page, scan, sync, upsert-data, delete-data, delete). Routes under `/api/2.0/vector-search/endpoints` and `/api/2.0/vector-search/indexes`. Hosts a single `Client` with mixed endpoint and index methods plus a single `CreateEndpointWaiter`.
**Total weird names flagged:** 27

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 7     |
| Medium       | 10    |
| Low          | 7     |
| Observation  | 3     |
| **Total**    | **27** |

Dominant themes:
1. **Two resource families share one flat `Client`.** Endpoint methods (`createEndpoint`, `getEndpoint`, …) and index methods (`createVectorIndex`, `queryVectorIndex`, …) sit side by side on the same class. The result is long method names that re-encode the resource family (`createVectorIndex` instead of `client.indexes.create()`), plus a single waiter that only covers endpoints.
2. **`name` is the wire identifier for both endpoints and indexes.** Across both resource families, `name?: string` is the path-segment identifier in URLs while the JSDoc just says "Name of the index" / "Name of the AI Search endpoint" — leaving the format (UC three-part name? user-chosen string?) implicit. The same field shape recurs on every request type.
3. **`Endpoint` is a Databricks-wide overloaded noun.** Bare `Endpoint`, `EndpointType`, `EndpointStatus`, `EndpointScalingInfo` collide with `modelserving.InferenceEndpoint`, `warehouses.EndpointState`, and other "endpoint" concepts. The package name `vectorsearch` qualifies the import, but destructured types lose that context.
4. **Near-duplicate types.** `VectorIndex` ≡ `MiniVectorIndex` (identical field set), `DeltaSyncVectorIndexSpec` ≡ `DeltaSyncVectorIndexSpecRequest` (identical field set). The duplication is gratuitous given that `DirectAccessVectorIndexSpec` has no `Request` twin.

---

## High severity

### 1. `Endpoint` bare top-level type collides with sibling packages — `src/v1/model.ts:274`, `src/v1/index.ts:31`
- **Why weird:** `Endpoint` is exported unqualified. The sibling `modelserving` package exports `InferenceEndpoint` (qualified); the sibling `warehouses` package exports `EndpointState`, `EndpointSecurityPolicy`, etc. A consumer who imports `{Endpoint}` from this package and writes `function process(e: Endpoint)` has no way to tell from the local signature whether `e` is a vector-search endpoint, an inference endpoint, or a SQL warehouse endpoint. The package-level rename to `vectorsearch` qualifies the import path but is destructured away at the use site.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning across packages).
- **Suggested name:** `VectorSearchEndpoint` (mirrors `modelserving.InferenceEndpoint`). Sibling types (`EndpointType`, `EndpointStatus`, `EndpointScalingInfo`) follow.
- **Rationale:** "Endpoint" alone is the most generic REST noun. Disambiguation at the type level is needed once the type leaves the import statement.

### 2. `Endpoint.name` is the URL identifier but coexists with `Endpoint.id` — `src/v1/model.ts:276, 288`
- **Why weird:** `Endpoint` declares both `name?: string` ("Name of the AI Search endpoint") and `id?: string` ("Unique identifier of the endpoint"). Every URL in the client uses `name` as the path segment (`/endpoints/${req.name}` — `client.ts:212, 262, 420, 446`); `id` is never used as a key. Two identifiers for the same entity is confusing: which one is the canonical reference for the rest of the SDK? JSDoc does not say.
- **Category:** 12 (duplicate concepts), 19 (underspecified IDs), 6 (misleading — `name` reads like a label but acts like a primary key).
- **Suggested name:** Document the distinction prominently in JSDoc — `name` is the user-chosen URL-safe key, `id` is the opaque server-generated GUID — and pick one as the canonical handle. Alternatively, collapse to one identifier at the API level.
- **Rationale:** Users who fetch an endpoint and try to use `.id` to delete it will hit a 404. The dual identifier needs to be either eliminated or surfaced explicitly.

### 3. `listEndpoint` / `listVectorIndex` method names are singular for collection operations — `src/v1/client.ts:317, 365`
- **Why weird:** Both methods return a collection (`ListEndpointResponse.endpoints: Endpoint[]`, `ListVectorIndexResponse.vectorIndexes: MiniVectorIndex[]`) yet the method names are singular. The corresponding URLs are plural (`/endpoints`, `/indexes`) and the body field names are plural. The request/response types (`ListEndpointRequest`, `ListEndpointResponse`, `ListVectorIndexRequest`, `ListVectorIndexResponse`) inherit the singular form.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verbs).
- **Suggested name:** `listEndpoints`, `listVectorIndexes`, `ListEndpointsRequest`, `ListEndpointsResponse`, `ListVectorIndexesRequest`, `ListVectorIndexesResponse`. The iterator pair (`listEndpointIter`, `listVectorIndexIter`) follows: `listEndpointsIter`, `listVectorIndexesIter`.
- **Rationale:** A collection method should be plural to match its return type, the wire URL, and the response field shape.

### 4. `MiniVectorIndex` and `VectorIndex` are structurally identical duplicates — `src/v1/model.ts:376-399` vs `:572-595`
- **Why weird:** Both types declare exactly the same nine fields (`name`, `endpointName`, `primaryKey`, `indexType`, `indexSpec`, `status`, `creator`, `indexSubtype`) with identical JSDoc on the fields they share. `MiniVectorIndex` is used in `ListVectorIndexResponse.vectorIndexes` (the list-view element type); `VectorIndex` is used everywhere else. With no field-level difference, the type split is gratuitous — and the "Mini" qualifier is cryptic (industry convention is `Summary`, `ListItem`, `Brief`, `Ref`).
- **Category:** 12 (duplicate concept), 5 (cryptic abbreviation), 1 (vague qualifier).
- **Suggested name:** Either `export type VectorIndexSummary = VectorIndex` (with a JSDoc note that the wire form is currently identical), or drop `MiniVectorIndex` entirely and use `VectorIndex` in list responses. If the API intends them to diverge later, document the upcoming difference.
- **Rationale:** Two ~25-line type definitions with no semantic distinction is a maintenance hazard. The "Mini" prefix tells the reader nothing about what is omitted (because nothing is).

### 5. `DeltaSyncVectorIndexSpec` and `DeltaSyncVectorIndexSpecRequest` are structurally identical — `model.ts:175-205` vs `:207-237`
- **Why weird:** Two exported types with identical field sets (`sourceTable`, `embeddingSourceColumns`, `embeddingVectorColumns`, `pipelineType`, `pipelineId`, `embeddingWritebackTable`, `columnsToSync`, `columnsToIndex`) and identical JSDoc on every shared field. The `Request` twin exists only for `DeltaSync` — `DirectAccessVectorIndexSpec` has no `Request` variant. The asymmetry is unexplained and the structural identity makes the split feel arbitrary.
- **Category:** 12 (duplicate concept), 8 (redundant `Request` suffix when the type has no distinguishing fields).
- **Suggested name:** Collapse to one type (`DeltaSyncVectorIndexSpec` used in both request and response positions, mirroring `DirectAccessVectorIndexSpec`), or document the planned divergence prominently.
- **Rationale:** The mismatch with `DirectAccessVectorIndexSpec` (no `Request` twin) shows the duplication is gratuitous. Users serializing a `DeltaSyncVectorIndexSpec` for a create call have to discover that `*Request` is the right one only by reading the function signature.

### 6. `name?: string` is the resource identifier across every request type — `model.ts:98, 115, 147, 161, 169, 254, 269, 276, 323, 328, 339, 378, 403, 416, 427, 436, 512, 534, 542, 574`
- **Why weird:** Twelve+ request types use a bare `name?: string` for what is actually the resource identifier consumed by the URL (`/endpoints/${name}`, `/indexes/${name}`, `/indexes/${name}/query`, …). For indexes, the value is a three-part Unity Catalog qualified name (`<catalog>.<schema>.<index>`); for endpoints, it is a user-chosen string. Neither distinction is documented on the field. JSDoc on each one just says "Name of the index" or "Name of the AI Search endpoint" without spelling out the format expectation.
- **Category:** 15 (generic field name losing meaning), 19 (underspecified ID), 6 (misleading — `name` reads like a label but is the primary key).
- **Suggested name:** For request types, rename to `endpointName` / `indexName` (already partial precedent — `MiniVectorIndex.endpointName`, `ListVectorIndexRequest.endpointName`). For the model types (`Endpoint.name`, `VectorIndex.name`), at minimum document the value's format in JSDoc.
- **Rationale:** `name` is too generic for a path-segment identifier. Users will mis-construct the value (e.g. send a bare index name instead of a three-part UC name) and see a 404.

### 7. `EndpointStatus_State.OFFLINE` is a terminal-failure state but reads as transient — `model.ts:72`, `client.ts:641-644, 680-681`
- **Why weird:** The waiter's terminal-state switch (`client.ts:637-647`) treats `EndpointStatus_State.OFFLINE` as a *failure* and throws. The enum identifier "OFFLINE" however reads as a transient lifecycle state ("the endpoint is currently offline"), implying it might come back online. JSDoc on the enum value is absent; the only hint is in the comment block above `RED_STATE`/`YELLOW_STATE`. A reader inspecting the enum would not predict that the waiter throws on OFFLINE.
- **Category:** 6 (misleading), 16 (field type contradicts domain — lifecycle name implies transient, runtime semantics are terminal).
- **Suggested name:** If the wire allows, rename to `FAILED` or `TERMINATED` to match the runtime semantics. Otherwise, add JSDoc on `OFFLINE` clarifying that it is a terminal failure state, distinct from "temporarily not serving traffic".
- **Rationale:** A user inspecting the enum to write their own polling logic will conclude that `OFFLINE` is recoverable and miss the failure path entirely.

---

## Medium severity

### 8. `Endpoint.endpointType: EndpointType` — three layers of "endpoint" — `model.ts:284, 100`
- **Why weird:** `endpoint.endpointType : EndpointType` reads "endpoint . endpoint type : endpoint type" — the field name and the field type both repeat the container type name. Same pattern on `Endpoint.endpointStatus: EndpointStatus` (`model.ts:290, 314`).
- **Category:** 20 (type-suffix tautology), 8 (redundant prefix).
- **Suggested name:** Rename fields to `type` / `status` (the container `Endpoint` supplies the context). Wire fields stay `endpoint_type` / `endpoint_status`; remap in the marshaller. Match the existing pattern in `EndpointStatus.state` (bare `state`, not `endpointState`).
- **Rationale:** TS field names should not repeat the parent type. The current shape is a generator artifact of flat Go structs.

### 9. `MiniVectorIndex.indexType: VectorIndexType` and `.indexSubtype: IndexSubtype` — `model.ts:383, 398, 579, 594`
- **Why weird:** Same tautology pattern as #8: `vectorIndex.indexType : VectorIndexType` reads "vector index . index type : vector index type"; `vectorIndex.indexSubtype : IndexSubtype` likewise repeats. The container type already says "index".
- **Category:** 20 (type-suffix tautology), 8 (redundant prefix).
- **Suggested name:** Rename to `type` / `subtype`. Wire fields are `index_type` / `index_subtype`.
- **Rationale:** Same reasoning as #8 — the container type qualifies the field.

### 10. `IndexSubtype` vs `VectorIndexType` — two enums on different "type" axes — `model.ts:29, 62`
- **Why weird:** Two enums both describing a "type" axis of a vector index. `IndexSubtype = {VECTOR, FULL_TEXT, HYBRID}` is the search-semantics axis (what kind of similarity is computed). `VectorIndexType = {DELTA_SYNC, DIRECT_ACCESS}` is the data-residency axis (how data flows in). Both surface as `index*Type*` fields on `VectorIndex`. A first-time reader cannot tell which axis is which without reading both JSDocs.
- **Category:** 6 (misleading — both look like "the type" of the index), 17 (inconsistent naming for two type axes).
- **Suggested name:** Disambiguate: `IndexSearchMode` for the search-semantics axis, `IndexBackingMode` (or `IndexStorageType`) for the data-residency axis. Or `IndexSearchKind` / `IndexSyncMode`.
- **Rationale:** Two parallel `*Type` enums on the same type make the API harder to learn. Naming each by its axis would self-document.

### 11. `IndexSubtype` exposes an unsupported value `VECTOR` — `model.ts:29-33`
- **Why weird:** The enum's first member is `VECTOR`, and its JSDoc says "Not supported. Use `HYBRID` instead." A public-API enum that exposes a value whose only documented behavior is "do not use" inflates the surface area and forces every switch statement to handle it. Also, "VECTOR" inside an enum on a vector-search index is tautological — every value is some kind of vector behavior.
- **Category:** 6 (misleading: present but explicitly unsupported), 18 (the value itself is content-free against the enum name).
- **Suggested name:** Remove `VECTOR` from the enum, or document the deprecation path in JSDoc and timeline for removal.
- **Rationale:** Dead enum members are bug magnets.

### 12. `UpsertDeleteDataStatus` and `UpsertDeleteDataResult` couple two unrelated verbs — `model.ts:51-55, 554`
- **Why weird:** Both names join two verbs (`Upsert` AND `Delete`) into one compound noun. There is no "upsert-delete" operation — the type is used as the response shape for two separate operations (`UpsertDataVectorIndexResponse`, `DeleteDataVectorIndexResponse`). The JSDoc on the fields where they are used confirms the verbs are alternatives, not a sequence (`model.ts:155, 550` — "Result of the upsert or delete operation").
- **Category:** 13 (verb-coupling), 7 (verbose), 1 (generic `Status`/`Result`).
- **Suggested name:** Split into `UpsertDataStatus` / `DeleteDataStatus` (aliases of the same wire enum), or use a neutral name `DataMutationStatus` / `DataMutationResult`.
- **Rationale:** Two-verb compound nouns are unusual and confusing. Most APIs use a single neutral noun for shared response types.

### 13. `createEndpointWaiter` is a parallel verb-method to `createEndpoint` — `client.ts:136-145`
- **Why weird:** Two methods with the same verb start (`createEndpoint` / `createEndpointWaiter`). The waiter version *calls* `createEndpoint` then wraps the result in a `CreateEndpointWaiter`. A reader sees two `create*` methods and may think they are different operations. The Java/Go SDK convention surfaces a waiter via a side return; TS would more naturally inline the wait (`createEndpointAndWait`).
- **Category:** 7 (verbose), 13 (verb overlap), 17 (inconsistent action verbs).
- **Suggested name:** Either fold the wait into `createEndpoint` (return a `CreateEndpointWaiter` that is both an awaitable and the resource shape), or rename to `createEndpointAndWait`, or expose a single `waitForEndpoint(name)` that any caller can use after `createEndpoint`.
- **Rationale:** Two `create*` methods for one logical "create" operation force every caller to learn which one to use. There is also no analogous waiter for the index create flow, so the pattern is inconsistent within the package.

### 14. `EndpointStatus_State.RED_STATE` / `YELLOW_STATE` carry redundant `_STATE` suffix — `model.ts:79-80`
- **Why weird:** The enum is already `EndpointStatus_State` and the other members (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) do not carry the suffix — only the health-colored values do. Reads `EndpointStatus_State.RED_STATE` — "endpoint status state . red state". Inconsistent within the enum.
- **Category:** 16 (field/value contradicting type domain), 8 (redundant suffix).
- **Suggested name:** If wire allows, `RED` / `YELLOW` (matches `PROVISIONING` / `ONLINE` shape). Otherwise, document the asymmetry.
- **Rationale:** Inconsistency within a single enum is a generator-spec issue worth surfacing.

### 15. `EndpointStatus_State` mixes lifecycle and health axes — `model.ts:69-87`
- **Why weird:** The enum lumps lifecycle states (`PROVISIONING`, `ONLINE`, `OFFLINE`, `DELETED`) with health-colored states (`RED_STATE`, `YELLOW_STATE`) in a single dimension. The comment block on lines 73-83 even calls out that the health states only apply once the endpoint is "ready". A consumer writing a state machine has to know which states are mutually exclusive with which others.
- **Category:** 16 (field contradicting domain — two orthogonal axes squeezed into one enum), 6 (misleading).
- **Suggested name:** Split into `EndpointLifecycleState` and `EndpointHealth`. Reflect both on `EndpointStatus` as two fields.
- **Rationale:** Single-enum mixing of orthogonal dimensions is an API-design smell.

### 16. `Endpoint.creator` vs `Endpoint.lastUpdatedUser` — inconsistent naming for the same kind of value — `model.ts:278, 286`
- **Why weird:** Two `string` fields, both identifying users, with mismatched naming patterns. `creator` is a bare noun; `lastUpdatedUser` is a compound past-participle. JSDoc only says "Creator of the endpoint" / "User who last updated the endpoint" without committing to a format (email? user ID? display name?). The same asymmetry would not survive a side-by-side review.
- **Category:** 13 (verb-tense / parallel-form mismatch), 19 (underspecified IDs).
- **Suggested name:** Symmetric pair, e.g. `createdBy` / `updatedBy` (REST convention) or `creator` / `lastUpdater`. Whichever side, document the format.
- **Rationale:** Parallel fields should look parallel. The current asymmetry implies a semantic difference that does not exist.

### 17. `creationTimestamp` / `lastUpdatedTimestamp` — noun vs past-participle inconsistency — `model.ts:280, 282`
- **Why weird:** Same parallel-form mismatch as #16, on the timestamp fields. `creation` (noun) vs `lastUpdated` (past-participle). Other Databricks SDK packages standardize on either `createdAt`/`updatedAt` (idiomatic TS) or `createTime`/`updateTime` (Google APIs). This package mixes the two forms.
- **Category:** 13 (verb-tense), 17 (inconsistent naming).
- **Suggested name:** `createdAt` / `updatedAt`. Wire fields stay `creation_timestamp` / `last_updated_timestamp`; remap in the marshaller.
- **Rationale:** Symmetric timestamp fields should match in form.

---

## Low severity

### 18. `req`, `resp`, `respBody`, `httpReq`, `pollResp`, `apiErr`, `pkgJson`, `opts`, `msg` — Go-idiom shorthand in TS — `client.ts:20, 79-80, 112, 117, 121, 122, 130, 137, 149, 154, 158, 159, 167, 175, 185, 189, 190, 201, 209, 213, 217, 218, 226, 234, 238, 242, 243, 251, 259, 263, 267, 268, 276, 284, 297, 301, 302, 310, 318, 328, 332, 333, 341, 348, 351, 353, 360, 366, 379, 383, 384, 392, 399, 402, 404, 411, 417, 422, 426, 427, 435, 443, 451, 455, 456, 467, 475, 480, 484, 485, 493, 501, 509, 513, 514, 522, 530, 535, 539, 540, 548, 556, 561, 565, 566, 574, 582, 587, 591, 592, 603, 625, 632, 642, 666, 673`; `utils.ts:30, 65-92, 76, 88-91`
- **Why weird:** Ubiquitous Go-style shorthand identifiers ported verbatim. `req`/`resp`/`err`/`opts`/`msg` are conventional in Go, where the receiver supplies enough context; in TS the convention favors spelled-out names (`request`, `response`, `error`, `options`, `message`). Internal inconsistency too: `executeCall` accepts `options` (utils.ts:28) but `executeHttpCall` uses `opts` (utils.ts:67).
- **Category:** 14 (Go/Java-style names), 5 (cryptic abbreviation).
- **Suggested name:** Spell them out throughout: `request`, `response`, `responseBody`, `pollResponse`, `httpRequest`, `apiError`, `packageJson`, `options`, `message`. Generator-level change.
- **Rationale:** Trivial diff, large readability gain. The TS ecosystem standard is the spelled-out form.

### 19. `Endpoint.numIndexes` reads as "number of array indexes" — `model.ts:292`
- **Why weird:** "Index" in TS most commonly means a numeric position in an array. Here it means "number of vector-search indexes attached to this endpoint" — a domain term, not the data-structure term. Adjacent types use `vectorIndexes` for the array (correct disambiguation), but this scalar count uses bare `indexes`.
- **Category:** 6 (misleading), 14 (Go-style `num*` prefix).
- **Suggested name:** `numVectorIndexes` (matches the adjacent `vectorIndexes` array) or `vectorIndexCount`.
- **Rationale:** Consistency within the package and disambiguation from the data-structure meaning.

### 20. `numResults`, `numIndexes` — `num*` prefix is a Go-ism — `model.ts:292, 438, 513`
- **Why weird:** `num` is a Go/C abbreviation for "number of". TS more commonly uses `count` suffix (`indexCount`, `resultCount`) or the bare noun pluralized.
- **Category:** 14 (Go-style names), 5 (cryptic abbreviation).
- **Suggested name:** `indexCount`, `resultCount`. Wire fields stay `num_indexes` / `num_results`.
- **Rationale:** Same as #18 — generator-level shorthand carry-over.

### 21. `flattenQueryParams` is exported but unused inside the package — `utils.ts:123-150`
- **Why weird:** The function is exported from `utils.ts` but every client method assembles `URLSearchParams` directly via `params.append(...)`. The helper is dead code for this package.
- **Category:** Observation (dead export), 6 (misleading — exported as if needed).
- **Suggested name:** Either delete from `utils.ts` here or move to `@databricks/sdk-core` so the per-package `utils.ts` files stop duplicating it.
- **Rationale:** Same finding as in other per-package audits. Generator-level cleanup.

### 22. `EmbeddingSourceColumn.modelEndpointNameForQuery` — verb-phrase in a field name — `model.ts:264`
- **Why weird:** The field name reads as a sentence (`modelEndpointName ForQuery`). TS field-naming convention prefers noun phrases over "for"-clauses. Adjacent `embeddingModelEndpointName` (also long, but a noun phrase) shows the package can do better.
- **Category:** 14 (Java-style "ForX" suffix), 7 (verbose).
- **Suggested name:** `queryModelEndpointName` or `queryEmbeddingEndpointName`.
- **Rationale:** Noun phrases align with adjacent fields and TS naming conventions.

### 23. `columnsToSync` and `columnsToIndex` are documented as aliases — `model.ts:197-204, 229-236`
- **Why weird:** Two array fields on the same type, JSDoc on `columnsToIndex` says: "Alias for columns_to_sync. ... Only one of columns_to_sync or columns_to_index may be specified." Two fields that mean the same thing, where the API rejects both being set, is an API-level footgun. The SDK exposes both without runtime validation.
- **Category:** 12 (duplicate concept by design), 6 (misleading — both look valid).
- **Suggested name:** Mark `columnsToSync` `@deprecated` if `columnsToIndex` is the canonical form (or vice versa), and add runtime validation in `marshalDeltaSyncVectorIndexSpecRequestSchema`.
- **Rationale:** API-level aliases are upstream policy, but the SDK should mark the deprecated alias to steer callers.

### 24. `RerankerConfig.parameters.columnsToRerank` duplicates `QueryVectorIndexRequest.columnsToRerank` — `model.ts:462, 491`
- **Why weird:** `QueryVectorIndexRequest` has both `columnsToRerank: string[]` at the top level (line 462) AND a `reranker.parameters.columnsToRerank: string[]` nested inside `RerankerConfig_RerankerParameters` (line 491). Same field name, same purpose, two places. The JSDoc on `reranker` references "`columns_to_rerank`" without saying which copy wins.
- **Category:** 12 (duplicate concept), 6 (misleading — precedence unclear).
- **Suggested name:** Drop one, or document the precedence in JSDoc. If one is for input and the other for echoed-back output, name them accordingly.
- **Rationale:** Users will set the wrong field, or both, and silently get the wrong rerank behavior.

---

## Observation

### 25. `usagePolicyId` JSDoc admits incomplete rollout — `model.ts:104`
- **Why weird:** JSDoc reads "The usage policy id to be applied once we've migrated to usage policies". A field whose JSDoc admits the rollout is incomplete leaves callers guessing whether setting it has any effect today.
- **Category:** 6 (misleading — present but possibly inactive).
- **Suggested name:** Either remove the field until usage policies ship, or rewrite the JSDoc to spell out the current behavior and rollout timeline.
- **Rationale:** Documentation-only TODOs leak generator/spec-side state into the public API. Worth surfacing.

### 26. `EmbeddingSourceColumn.embeddingConfig` JSDoc says "TODO: clean up ai gateway related code" — `model.ts:255`
- **Why weird:** JSDoc on a public-API field contains a developer TODO: "TODO: clean up ai gateway related code. It's deprecated on ModelServing side." This is internal generator/spec-side debt leaking into IntelliSense for every SDK user.
- **Category:** Observation (generator-side leak in JSDoc).
- **Suggested name:** Rewrite the JSDoc to describe the public contract; track the cleanup in the spec, not in the user-facing docs.
- **Rationale:** Internal TODOs in JSDoc are a long-known generator hygiene issue. Worth flagging.

### 27. `Endpoint.creator` and `lastUpdatedUser` JSDoc gives no format — `model.ts:278, 286`
- **Why weird:** Both fields are typed `string` with JSDocs "Creator of the endpoint" / "User who last updated the endpoint". The reader has no way to tell if the value is a user ID, a display name, an email, or a UC identifier. Same observation applies to `MiniVectorIndex.creator` (`model.ts:396`) and `VectorIndex.creator` (`model.ts:592`).
- **Category:** Observation (underspecified format on user-reference fields), 19 (underspecified IDs).
- **Suggested name:** Keep the field names but extend JSDoc with the expected format (e.g. "the email of the user who created this endpoint").
- **Rationale:** Documentation-only nit; worth tracking because the format is stable wire behavior and is not surfaced today.
