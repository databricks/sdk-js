# Naming Audit: indexes

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/vectorsearch/src/v1/` (formerly `packages/indexes/src/v1/`; merged with the vector-search endpoint API)
**Versions audited:** v1
**Inferred domain:** Databricks Vector Search index management — CRUD for `VectorIndex` (Delta-Sync or Direct-Access subtypes), data upsert/delete on direct-access indexes, vector/text/hybrid query, scan, pagination, and sync trigger. Routes under `/api/2.0/vector-search/indexes`.
**Total weird names flagged:** 33

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 15 |
| Low | 6 |
| Observation | 2 |

## High severity

### 1. `MiniVectorIndex` — `src/v1/model.ts:376`
- **Why weird:** "Mini" is a cryptic informal qualifier. No JSDoc explains what it means. By inspection it is a list-view subset of `VectorIndex` (same fields), used as the element type in `ListVectorIndexResponse.vectorIndexes`. Industry conventions for "the lighter view returned by a list endpoint" include `Summary`, `ListItem`, `Brief`, `Ref`, `Preview` — never `Mini`.
- **Category:** 5 (cryptic abbreviation), 1 (vague qualifier).
- **Suggested name:** `VectorIndexSummary` or `VectorIndexListItem`. Add JSDoc explaining why it differs from `VectorIndex` (in fact, the fields are identical in this version — see #2).
- **Rationale:** `Mini` does not convey "subset of the full type returned by list operations". Naming the type after its role (`Summary`/`ListItem`) makes the relationship to `VectorIndex` discoverable.

### 2. `MiniVectorIndex` is structurally identical to `VectorIndex` — `src/v1/model.ts:376-399` vs `:572-595`
- **Why weird:** Both types declare exactly the same nine fields (`name`, `endpointName`, `primaryKey`, `indexType`, `indexSpec`, `status`, `creator`, `indexSubtype`) with the same types and (where present) the same JSDoc lines. They are duplicates. The only signal of intent is the prefix "Mini". If they are meant to be the same, one should be an alias; if they differ, the difference must be documented.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Either `export type VectorIndexSummary = VectorIndex;` (with a comment noting wire-format identity), or drop one entirely. If the API intends them to diverge later, document the upcoming difference.
- **Rationale:** Duplicating ~25 lines of type definition with no semantic distinction is a maintenance hazard.

### 3. `DeltaSyncVectorIndexSpec` vs `DeltaSyncVectorIndexSpecRequest` are structurally identical — `model.ts:175-205` vs `model.ts:207-237`
- **Why weird:** Two distinct exported types with the same eight fields (`sourceTable`, `embeddingSourceColumns`, `embeddingVectorColumns`, `pipelineType`, `pipelineId`, `embeddingWritebackTable`, `columnsToSync`, `columnsToIndex`), same JSDoc, same types. Only `...Request` exists for `DeltaSync`; the matching response shape is `DeltaSyncVectorIndexSpec` (sans `Request`). `DirectAccessVectorIndexSpec` does *not* have a separate `...Request` twin. Suggests an upstream quirk that should be flattened in TS.
- **Category:** 12 (duplicate concept), 8 (redundant `Request` suffix).
- **Suggested name:** Collapse to one type (`DeltaSyncVectorIndexSpec`), or document why the request version differs. If the upstream API truly has divergence, list the diverging fields explicitly.
- **Rationale:** The asymmetry with `DirectAccessVectorIndexSpec` (no separate request variant) shows the duplication is gratuitous, not necessary.

### 4. `UpsertDeleteDataStatus` — single enum shared by both upsert and delete — `src/v1/model.ts:51-55`
- **Why weird:** The enum name is two-verb (`Upsert` AND `Delete`) joined into one noun-prefix. Reads as "the status of an upsert-delete operation" — but there is no such thing as an "upsert-delete". It is the response shape for two separate operations. Conventionally each operation has its own response type or the shared type uses a neutral name.
- **Category:** 13 (verb-tense / verb-coupling), 7 (overly verbose by merging two verbs), 1 (generic "Status").
- **Suggested name:** `DataModificationStatus` or `OperationStatus`. Or split into `UpsertStatus` and `DeleteStatus` aliases if the back-end is really sharing one.
- **Rationale:** Two-verb compound nouns are unusual and confusing. Same problem exists on `UpsertDeleteDataResult` (model.ts:554).

### 5. `UpsertDeleteDataResult` — same two-verb compound — `src/v1/model.ts:554`
- **Why weird:** Same dual-verb naming as #4. The JSDoc on the field where it is used ("Result of the upsert or delete operation" — model.ts:155, 550) confirms the verbs are *alternatives*, not a sequence.
- **Category:** 13 (verb-tense), 7 (verbose), 1 (generic).
- **Suggested name:** `DataMutationResult` or split into `UpsertDataResult` / `DeleteDataResult` aliases.
- **Rationale:** Same as #4.

### 6. Method names follow Go pattern `verbVectorIndex` not idiomatic JS `verbIndex` — `client.ts:148, 174, 233, 283, 365, 398, 474, 500, 529, 555, 581`
- **Why weird:** Eleven methods: `createVectorIndex`, `deleteDataVectorIndex`, `deleteVectorIndex`, `getVectorIndex`, `listVectorIndex`, `listVectorIndexIter`, `queryVectorIndex`, `queryVectorIndexNextPage`, `scanVectorIndex`, `syncVectorIndex`, `upsertDataVectorIndex`. The client now also exposes endpoint methods (`createEndpoint`, etc.) — so the `VectorIndex` suffix does serve a disambiguation role here, but every method name still carries 11+ characters of repetition that the JSDoc and URL already make clear. The Go SDK uses receiver methods so the package prefix is implicit, but in JS we re-add it.
- **Category:** 8 (redundant suffix), 7 (overly verbose), 14 (Go-style).
- **Suggested name:** Group the index methods under a sub-namespace (`client.indexes.create()`, `client.indexes.query()`, ...) instead of repeating `VectorIndex` in every method. Same pattern would split the endpoint methods (`client.endpoints.create()`, etc.).
- **Rationale:** The repetition is mechanical Go-port baggage. Sub-namespacing also separates the two resource families (endpoints, indexes) that now live in one client.

### 7. `name` is the resource identifier on every Request type — meaning is overloaded — multiple sites
- **Why weird:** Many Request/response types use a bare `name?: string` for what is actually the full index (or endpoint) identifier (typically a Unity Catalog qualified name like `main.schema.index`). Types affected: `CreateVectorIndexRequest.name` (model.ts:115), `DeleteDataVectorIndexRequest.name` (model.ts:147), `DeleteVectorIndexRequest.name` (model.ts:169), `GetVectorIndexRequest.name` (model.ts:328), `MiniVectorIndex.name` (model.ts:378), `QueryVectorIndexNextPageRequest.name` (model.ts:427), `QueryVectorIndexRequest.name` (model.ts:436), `ScanVectorIndexRequest.name` (model.ts:512), `SyncVectorIndexRequest.name` (model.ts:534), `UpsertDataVectorIndexRequest.name` (model.ts:542), `VectorIndex.name` (model.ts:574). JSDoc on every one says "Name of the index" — but a UC three-part name is more than a "name", it's a path/identifier.
- **Category:** 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `indexFullName`, `indexId`, or at least add JSDoc clarifying the expected format ("three-part Unity Catalog identifier `<catalog>.<schema>.<index>`").
- **Rationale:** `name` is too generic when the value is a structured path. Users reading `req.name = "foo"` may send a bare name and get a 404.

### 8. `endpointName` field for the *index endpoint* — generic name shared across packages — `model.ts:117, 357, 380, 429, 576`
- **Why weird:** Five sites use `endpointName?: string`. There is no JSDoc disambiguation between "vector search endpoint", "model serving endpoint", "external endpoint", "AI gateway endpoint" — all are Databricks concepts. The `EmbeddingSourceColumn.embeddingModelEndpointName` (model.ts:260) shows the SDK *does* qualify endpoint references when ambiguous, but here it does not.
- **Category:** 15 (generic field name), 19 (underspecified ID).
- **Suggested name:** `vectorSearchEndpointName` or add JSDoc clarifying it is "the Vector Search endpoint serving this index". The terse `endpointName` is fine *if* combined with type-level JSDoc.
- **Rationale:** The package owns a `VectorIndex` resource that is hosted on a *vector-search* endpoint — but a reader who jumps to a method signature sees only `endpointName` and may guess wrong.

### 9. `RerankerConfig.parameters.columnsToRerank` duplicates `QueryVectorIndexRequest.columnsToRerank` — `model.ts:462` vs `model.ts:491`
- **Why weird:** `QueryVectorIndexRequest` has both `columnsToRerank: string[]` (line 462, JSDoc "Column names used to retrieve data to send to the reranker") AND a `reranker.parameters.columnsToRerank: string[]` (line 491) inside the nested reranker parameters type. Two different fields with the same name and same purpose. The JSDoc on `reranker` (model.ts:463-468) does mention "`columns_to_rerank` selects which columns are used for reranking" — but `columns_to_rerank` lives in *both* places.
- **Category:** 12 (duplicate concept), 6 (misleading — which one wins?).
- **Suggested name:** Drop one, or document the precedence. If one is for input and the other for output/echo, name them accordingly.
- **Rationale:** Users will set the wrong field. Worth raising upstream.

### 10. `usagePolicyId` field has tentative JSDoc — `CreateEndpointRequest.usagePolicyId` — `model.ts:104`
- **Why weird:** JSDoc reads "The usage policy id to be applied once we've migrated to usage policies". Exposing a public API field whose JSDoc admits the migration is incomplete invites runtime ambiguity: today the field is silently ignored (or partially handled) and tomorrow it activates. Callers cannot tell which.
- **Category:** 6 (misleading: present but not (yet) honored), 17 (parallel to `budgetPolicyId` which works today, with no behavioural distinction).
- **Suggested name:** Either remove the field until usage policies ship, or rewrite the JSDoc to spell out the current behaviour and the rollout date.
- **Rationale:** "Once we've migrated" leaves the contract undefined.

## Medium severity

### 11. `IndexSubtype` enum values include `VECTOR` documented as "Not supported" — `src/v1/model.ts:29-33`
- **Why weird:** Enum exposes a sentinel value `VECTOR` whose JSDoc reads "Not supported. Use `HYBRID` instead." Exporting unsupported values inflates the enum and forces every consumer to filter or document them away.
- **Category:** 6 (misleading: present but not supported), 18 (the value `VECTOR` is also a tautology when inside an enum called `IndexSubtype` describing a vector-search index — every value is a kind of "vector").
- **Suggested name:** Remove `VECTOR` from the enum, or rename the enum to `VectorIndexSubtype` and call the values `FullText | Hybrid`. Either way, eliminate the dead value.
- **Rationale:** Unused enum members are bug magnets.

### 12. `IndexSubtype` versus `VectorIndexType` — two enums distinguishing two different "type" axes — `model.ts:29, 62`
- **Why weird:** `IndexSubtype` = `{VECTOR, FULL_TEXT, HYBRID}` (search semantics). `VectorIndexType` = `{DELTA_SYNC, DIRECT_ACCESS}` (data residency / sync model). Both are exposed as `index*Type*` fields. Same prefix word, different axes. Beginner users will conflate them.
- **Category:** 6 (misleading: both look like "the type" of the index), 17 (inconsistent naming for two type axes).
- **Suggested name:** Rename to disambiguate: `IndexSearchMode` (for subtype) and `IndexBackingType` / `IndexStorageType` (for the DELTA_SYNC/DIRECT_ACCESS axis). Or `IndexSearchKind` and `IndexSyncMode`.
- **Rationale:** Two parallel `*Type` enums make the API harder to learn. The current names are technically correct but functionally ambiguous.

### 13. Enum values are SCREAMING_SNAKE_CASE — `PipelineType.TRIGGERED` etc. — `model.ts:40-43`
- **Why weird:** All enums (`EndpointType`, `IndexSubtype`, `PipelineType`, `ScalingChangeState`, `UpsertDeleteDataStatus`, `VectorIndexType`, `EndpointStatus_State`) use `UPPER_SNAKE_CASE` for member names. Google TS Style Guide §9.3 recommends `UpperCamelCase` for enum members. The codebase is mixed (some enums use camelCase elsewhere). The values are also the wire-protocol strings — wire is `UPPER_SNAKE` legitimately, but the TS *identifier* can be `Triggered` mapping to wire `'TRIGGERED'`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Go-style).
- **Suggested name:** `PipelineType.Triggered | Continuous`, with explicit `= 'TRIGGERED'` wire values. Or accept the wire-form names and apply them consistently across all packages.
- **Rationale:** Style consistency across the workspace; preference for camelCase enum members aligns with the Google TS Style Guide.

### 14. `EmbeddingSourceColumn.modelEndpointNameForQuery` — verb-phrase inside a field name — `model.ts:264`
- **Why weird:** Field name reads as a sentence (`modelEndpointName ForQuery`). JS field-naming convention is noun phrases, not "for"-clauses. Compare with adjacent `embeddingModelEndpointName` (also long, but a noun phrase).
- **Category:** 14 (Java-ish "ForX" suffix), 7 (verbose).
- **Suggested name:** `queryModelEndpointName` or `queryEmbeddingEndpointName`.
- **Rationale:** `for`-clauses in identifiers are uncommon in JS. The renaming aligns it with the adjacent field.

### 15. `embeddingSourceColumns` vs `embeddingVectorColumns` — same shape, different role — `model.ts:179-181, 211-213, 241, 249`
- **Why weird:** Two parallel array fields on three different types (`DeltaSyncVectorIndexSpec`, `DeltaSyncVectorIndexSpecRequest`, `DirectAccessVectorIndexSpec`). One holds source text columns to be embedded; the other holds pre-computed vector columns. Both arrays use *different* element types (`EmbeddingSourceColumn` vs `EmbeddingVectorColumn`) — good — but the field names look near-identical at a glance.
- **Category:** 6 (visually confusable pair), 15 (the qualifier "Source"/"Vector" is doing all the work).
- **Suggested name:** `textColumns` + `vectorColumns`, or `embeddingTextColumns` + `embeddingVectorColumns`. Anything to widen the gap between the two names.
- **Rationale:** Pairs of similarly named array fields are a known footgun. A user typing `embedding<Tab>` will autocomplete the wrong one.

### 16. `columnsToSync` and `columnsToIndex` — overlapping fields with aliasing — `model.ts:197-204, 229-236`
- **Why weird:** Two fields on the same type, JSDoc says they are aliases ("[Optional] Alias for columns_to_sync. Select the columns to include in the vector index. ... Only one of columns_to_sync or columns_to_index may be specified.") Having two fields that mean the same thing in one struct, where the API expects exactly one to be set, is a recipe for runtime errors.
- **Category:** 12 (duplicate concept by design), 6 (misleading — both look valid).
- **Suggested name:** Deprecate one in the SDK (mark `columnsToSync` as `@deprecated` if `columnsToIndex` is the new canonical), or merge them with a runtime validation.
- **Rationale:** API-level aliases are upstream policy, but the SDK should clearly mark the deprecated alias.

### 17. `pipelineId` is an underspecified ID — `model.ts:189, 221`
- **Why weird:** Field type is `string` with JSDoc "The ID of the pipeline that is used to sync the index." No format documented — is it a UUID, a numeric ID, a path? Compare with `effectiveBudgetPolicyId` which uses the same generic `string` but at least the policy ID is a known Databricks pattern.
- **Category:** 19 (underspecified ID), 15 (generic).
- **Suggested name:** Keep the name but improve the JSDoc with the expected ID format and a link to the Pipelines API.
- **Rationale:** Without format hints, users will struggle to construct the value.

### 18. `inputsJson` instead of `inputs` — pre-stringified JSON in a JSON request — `model.ts:544`
- **Why weird:** `UpsertDataVectorIndexRequest.inputsJson: string` is "JSON string representing the data to be upserted." The TS surface forces the caller to call `JSON.stringify()` themselves, then the marshaling layer wraps the request body in `JSON.stringify(...)` *again*. Double-encoded payloads are a well-known JSON antipattern.
- **Category:** 6 (misleading — the field is JSON-in-JSON), 1 (generic — "inputs" tells you nothing about *what*).
- **Suggested name:** Expose as `inputs: JsonValue[]` (or whatever the row shape is) and let the SDK serialize, OR keep `inputsJson` but rename to `inputsJsonString` and document the double-encoding.
- **Rationale:** Same problem with `filtersJson` (see #19) and `schemaJson` (see #20). All three are wire-protocol leaks that should be normalized at the SDK boundary.

### 19. `filtersJson` instead of `filters` — pre-stringified JSON in a JSON request — `model.ts:452`
- **Why weird:** Same JSON-in-JSON pattern as #18. The JSDoc even shows the JSON structure in examples (`{"id <": 5}`), which means the SDK knows the type — but it is still typed as `string`.
- **Category:** 6 (misleading), 1 (generic).
- **Suggested name:** Expose as `filters?: Record<string, JsonValue>` and serialize internally. Or rename `filtersJsonString`.
- **Rationale:** Same as #18.

### 20. `schemaJson` instead of typed schema — `DirectAccessVectorIndexSpec.schemaJson` — `model.ts:247`
- **Why weird:** Same pattern. The field is "The schema of the index in JSON format. Supported types are `integer`, `long`, `float`, `double`, `boolean`, `string`, `date`, `timestamp`." A typed schema descriptor would be far more discoverable.
- **Category:** 6 (misleading), 1 (generic).
- **Suggested name:** Expose as a typed shape, or rename `schemaJsonString` and add JSDoc warning.
- **Rationale:** Same as #18.

### 21. `embeddingWritebackTable` — compound noun reads as gibberish — `model.ts:191, 223`
- **Why weird:** "Writeback" run together with "embedding" plus "Table" forms a hard-to-parse triple-noun. Pronunciation: "embed-ding-write-back-table". JSDoc clarifies meaning ("[Optional] Name of the Delta table to sync the vector index contents and computed embeddings to") — but the field name is opaque without it.
- **Category:** 7 (overly verbose), 14 (Go-style smushed identifier).
- **Suggested name:** `writebackTableName`, `embeddingsTableName`, or `computedEmbeddingsTable`.
- **Rationale:** Readability of compound nouns degrades fast past 2 words.

### 22. `ensureRerankerCompatible` boolean — confusing name and confusing semantics — `model.ts:335`
- **Why weird:** JSDoc says: "If true, the URL returned for the index is guaranteed to be compatible with the reranker. Currently this means we return the CP URL regardless of how the index is being accessed. If not set or set to false, the URL may still be compatible with the reranker depending on what URL we return." So the flag toggles *which URL is returned*, not whether the index itself is reranker-compatible. The name suggests the operation *ensures compatibility*, but it actually just changes URL format.
- **Category:** 6 (misleading), 1 (vague boolean).
- **Suggested name:** `useControlPlaneUrl`, `returnControlPlaneUrl`, or `rerankerCompatibleUrl`.
- **Rationale:** Boolean names should describe the side effect, not an aspirational outcome.

### 23. `numResults` field name in two places — `model.ts:438, 514`
- **Why weird:** Two unrelated requests (`QueryVectorIndexRequest`, `ScanVectorIndexRequest`) both name the result-count field `numResults`. JS convention is `limit` (matching SQL `LIMIT`, REST `?limit=`) or `pageSize`. `numResults` is Python/SQL-ish.
- **Category:** 14 (Python/SQL-style), 17 (cross-package inconsistency — other paged APIs use `pageSize` or `limit`).
- **Suggested name:** `limit` (matches HTTP query param and most JS libs) or `pageSize`.
- **Rationale:** Aligning with `limit`/`pageSize` reduces friction.

### 24. `queryType` typed as `string` with constrained values — `QueryVectorIndexRequest.queryType` — `model.ts:460`
- **Why weird:** JSDoc says: "The query type to use. Choices are `ANN` and `HYBRID` and `FULL_TEXT`. Defaults to `ANN`." Three known values, but typed as `string` — not an enum. Users get no autocomplete, no compile-time check.
- **Category:** 1 (generic typing), 6 (misleading typing).
- **Suggested name:** Introduce an enum `QueryType.Ann | Hybrid | FullText` (these overlap with `IndexSubtype` values but represent different concepts).
- **Rationale:** `string` for a closed set of values is a known antipattern.

### 25. `RerankerConfig.model` field — generic name "model" — `model.ts:485`
- **Why weird:** Bare `model?: string` with no JSDoc. In ML SDKs "model" is overloaded (ML model, data model, type model). The field probably holds a model endpoint name or model identifier.
- **Category:** 1 (generic), 15 (generic field losing meaning).
- **Suggested name:** `modelEndpointName`, `modelName`, or `rerankerModel`.
- **Rationale:** Document what kind of identifier this is.

## Low severity

### 26. `Struct.fields` returns `MapStringValueEntry[]` instead of a record — `model.ts:529`
- **Why weird:** `Struct` is the SDK's wire-format for a JSON-like map, and `MapStringValueEntry` is `{key: string, value: Value}`. The TS shape is "an array of key-value entries" rather than `Record<string, Value>`. Idiomatic JS would use a plain object or `Map`.
- **Category:** 14 (array-of-entries map encoding leaks to TS).
- **Suggested name:** Flatten to `Record<string, Value>` at the TS boundary; keep the entry-array shape on the wire.
- **Rationale:** Forcing users to map an array of `{key, value}` pairs into a record is friction the SDK could remove.

### 27. `Value` — single-word generic name for a discriminated union — `model.ts:561-570`
- **Why weird:** A bare type called `Value` is uninformative. It is the SDK's wire-form scalar wrapper (number/string/bool/struct/list). Stronger candidates: `ScalarValue`, `WireValue`, `VectorIndexValue`.
- **Category:** 1 (generic).
- **Suggested name:** `ScalarValue` or move to the core wkt package and rename `wkt.Value`.
- **Rationale:** `Value` collides with too many concepts.

### 28. `Struct` — generic single-word type name — `model.ts:527`
- **Why weird:** "Struct" is a language keyword in many languages (Go, C, Rust). In JS/TS it is a vague C-style holdover. The type is "a row of a vector index" (per the JSDoc).
- **Category:** 1 (generic), 10 (potential reserved-word collision in TS-flow tools).
- **Suggested name:** `IndexRow` or `VectorIndexRow`.
- **Rationale:** A more domain-specific name is more discoverable.

### 29. `MapStringValueEntry` — verbose name for a key-value pair — `model.ts:369`
- **Why weird:** Reads as "Map of String to Value Entry". JSDoc says "Key-value pair." Just call it that.
- **Category:** 7 (verbose).
- **Suggested name:** `KeyValue` or `StructField`.
- **Rationale:** Less verbose, more idiomatic.

### 30. `ResultManifest` — Java/Spring-flavored noun — `model.ts:503-508`
- **Why weird:** "Manifest" in a query-result context is unusual JS phrasing. JSDoc says "Metadata about the result set." More common in JS: `Metadata`, `Schema`, `Info`.
- **Category:** 14 (Java-style), 1 (mildly generic).
- **Suggested name:** `ResultMetadata` or `ResultSchema`.
- **Rationale:** Aligns with idiomatic JS.

### 31. `ResultData` — generic two-word noun — `model.ts:495-500`
- **Why weird:** Type is "Data returned in the query result." `ResultData` is generic; `QueryResultData` or just `Rows` would be more specific.
- **Category:** 1 (generic).
- **Suggested name:** `QueryResultData` or `ResultRows`.
- **Rationale:** Disambiguate.

## Observation

### 32. `Call` type imported from `@databricks/sdk-core/api` — generic name — `client.ts:4`
- **Why weird:** Cross-package import. `Call` is the most generic possible name for "a network operation".
- **Category:** 1 (generic), cross-package observation.
- **Suggested name:** `RetryableCall`, `SdkCall`. Out of scope for this audit.
- **Rationale:** Tracked for cross-package consistency.

### 33. `MiniVectorIndex` is exported from `index.ts` despite being internal-looking — `index.ts:42`
- **Why weird:** The mini variant (see #1, #2) is re-exported as part of the public API. If the intent is for it to be an internal implementation detail, it should not be in `index.ts`.
- **Category:** Observation on the public surface.
- **Suggested name:** Either rename per #1 or remove from the public surface.
- **Rationale:** Consumers will use whatever is exported; if `MiniVectorIndex` is a name we'd prefer not to commit to publicly, it should be hidden.
