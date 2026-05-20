# Naming Audit: indexes

**Path:** `packages/indexes/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Vector Search index management — CRUD for `VectorIndex` (Delta-Sync or Direct-Access subtypes), data upsert/delete on direct-access indexes, vector/text/hybrid query, scan, pagination, and sync trigger. Routes under `/api/2.0/vector-search/indexes`.
**Total weird names flagged:** 37

## Summary
| Severity | Count |
| --- | --- |
| High | 12 |
| Medium | 17 |
| Low | 6 |
| Observation | 2 |

## High severity

### 1. Package name `indexes` is generic — does not say "vector search" — `packages/indexes/`
- **Why weird:** The package is exclusively about Databricks Vector Search indexes (every URL is `/api/2.0/vector-search/indexes/...` — `client.ts:94, 120, 154, 179, 213, 264, 290, 319, 345, 371`). Every public type is prefixed `Vector...` or contains `VectorIndex`. The package name `indexes` is the most generic possible word — it could equally mean SQL indexes, Unity Catalog indexes, search indexes, dataframe indexes, online table indexes, or array/iterator indexes. A user scanning the workspace cannot tell what `indexes` covers without opening the source.
- **Category:** 1 (vague/generic), 6 (misleading: collides with multiple "index" concepts in the Databricks ecosystem).
- **Suggested name:** `vector-search`, `vector-search-indexes`, or `vectorsearch-indexes`. At minimum, add a module-level JSDoc on `index.ts` (currently missing) stating "Databricks Vector Search index management".
- **Rationale:** Package names are the first-line filter; `indexes` says nothing about the domain. Sibling packages already exist (`vectorsearchendpoints`, presumably) for the endpoint side — naming should be parallel.

### 2. Package name singular/plural mismatch — `packages/indexes/` vs `VectorIndex` type — `index.ts`, `model.ts:425`
- **Why weird:** The package is plural (`indexes`) but the central exported type is `VectorIndex` (singular). The Go SDK reference uses the singular `vectorsearchindex` package name (per repo convention in `databricks/sdk-go`). JS-style alternative spellings ("indices") are not used. The plural directory name reads as "the indexes API" — a collection — while every type/method works on one index at a time.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `vectorsearchindex` (singular, mirrors Go reference) or commit to plural with all "list/collection" connotations made explicit. Either rename to singular or accept the plural everywhere (which the codebase does not).
- **Rationale:** The repository convention elsewhere is singular package names matching the central noun (e.g. `clusters`, `catalogs` are plural where the *resource* is plural, while single-resource packages use singular). The `Index` resource is singular — package should match.

### 3. `MiniVectorIndex` — `src/v1/model.ts:252`
- **Why weird:** "Mini" is a cryptic informal qualifier. No JSDoc explains what it means. By inspection it is a list-view subset of `VectorIndex` (same fields), used as the element type in `ListVectorIndexResponse.vectorIndexes`. Industry conventions for "the lighter view returned by a list endpoint" include `Summary`, `ListItem`, `Brief`, `Ref`, `Preview` — never `Mini`.
- **Category:** 5 (cryptic abbreviation), 1 (vague qualifier).
- **Suggested name:** `VectorIndexSummary` or `VectorIndexListItem`. Add JSDoc explaining why it differs from `VectorIndex` (in fact, the fields are identical in this version — see #4).
- **Rationale:** `Mini` does not convey "subset of the full type returned by list operations". Naming the type after its role (`Summary`/`ListItem`) makes the relationship to `VectorIndex` discoverable.

### 4. `MiniVectorIndex` is structurally identical to `VectorIndex` — `src/v1/model.ts:252-275` vs `:425-448`
- **Why weird:** Both types declare exactly the same nine fields with the same types and (where present) the same JSDoc lines. They are duplicates. The only signal of intent is the prefix "Mini". If they are meant to be the same, one should be an alias; if they differ, the difference must be documented.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Either `export type VectorIndexSummary = VectorIndex;` (with a comment noting wire-format identity), or drop one entirely. If the API intends them to diverge later, document the upcoming difference.
- **Rationale:** Duplicating ~25 lines of type definition with no semantic distinction is a maintenance hazard.

### 5. `DeltaSyncVectorIndexSpec` vs `DeltaSyncVectorIndexSpecRequest` are structurally identical — `model.ts:109-142` vs `model.ts:144-177`
- **Why weird:** Two distinct exported types with the same ten fields, same JSDoc, same types. Only `...Request` exists for `DeltaSync`; the matching response shape is `DeltaSyncVectorIndexSpec` (sans `Request`). `DirectAccessVectorIndexSpec` does *not* have a separate `...Request` twin. Suggests an upstream quirk that should be flattened in TS.
- **Category:** 12 (duplicate concept), 8 (redundant `Request` suffix).
- **Suggested name:** Collapse to one type (`DeltaSyncVectorIndexSpec`), or document why the request version differs. If the upstream API truly has divergence, list the diverging fields explicitly.
- **Rationale:** The asymmetry with `DirectAccessVectorIndexSpec` (no separate request variant) shows the duplication is gratuitous, not necessary.

### 6. `UpsertDeleteDataStatus` — single enum shared by both upsert and delete — `src/v1/model.ts:39-43`
- **Why weird:** The enum name is two-verb (`Upsert` AND `Delete`) joined into one noun-prefix. Reads as "the status of an upsert-delete operation" — but there is no such thing as an "upsert-delete". It is the response shape for two separate operations. Conventionally each operation has its own response type or the shared type uses a neutral name.
- **Category:** 13 (verb-tense / verb-coupling), 7 (overly verbose by merging two verbs), 1 (generic "Status").
- **Suggested name:** `DataModificationStatus` or `OperationStatus`. Or split into `UpsertStatus` and `DeleteStatus` aliases if the back-end is really sharing one.
- **Rationale:** Two-verb compound nouns are unusual and confusing. Same problem exists on `UpsertDeleteDataResult` (model.ts:407).

### 7. `UpsertDeleteDataResult` — same two-verb compound — `src/v1/model.ts:407`
- **Why weird:** Same dual-verb naming as #6. The JSDoc on the field where it is used ("Result of the upsert or delete operation" — model.ts:97, 403) confirms the verbs are *alternatives*, not a sequence.
- **Category:** 13 (verb-tense), 7 (verbose), 1 (generic).
- **Suggested name:** `DataMutationResult` or split into `UpsertDataResult` / `DeleteDataResult` aliases.
- **Rationale:** Same as #6.

### 8. Method names follow Go pattern `verbVectorIndex` not idiomatic JS `verbIndex` — `client.ts:90, 116, 150, 175, 209, 260, 286, 315, 341, 367`
- **Why weird:** Eleven methods: `createVectorIndex`, `deleteDataVectorIndex`, `deleteVectorIndex`, `getVectorIndex`, `listVectorIndex`, `listVectorIndexIter`, `queryVectorIndex`, `queryVectorIndexNextPage`, `scanVectorIndex`, `syncVectorIndex`, `upsertDataVectorIndex`. The package is exclusively about vector indexes — there is no ambiguity to disambiguate against. Repeating `VectorIndex` in every method name doubles their length to no purpose. The client is already `IndexesClient` (or implicitly scoped via `import { Client } from '@databricks/sdk-indexes'`).
- **Category:** 8 (redundant suffix), 7 (overly verbose), 14 (Go-style — Go SDK uses receiver methods so the package prefix is implicit, but in JS we re-add it).
- **Suggested name:** `client.create()`, `client.get()`, `client.list()`, `client.list()` paginator, `client.query()`, `client.queryNextPage()`, `client.scan()`, `client.sync()`, `client.upsertData()`, `client.deleteData()`, `client.delete()`. Some collide with reserved words (`delete`) — those few can keep the `...Index` suffix.
- **Rationale:** The repetition is mechanical Go-port baggage. Other SDK packages in the workspace expose `client.get()`, `client.list()` directly.

### 9. `name` is the resource identifier on every Request type — meaning is overloaded — multiple sites
- **Why weird:** Fifteen Request/response types use a bare `name?: string` for what is actually the full index identifier (typically a Unity Catalog qualified name like `main.schema.index`). Types affected: `CreateVectorIndexRequest.name` (model.ts:64), `DeleteDataVectorIndexRequest.name` (model.ts:89), `DeleteVectorIndexRequest.name` (model.ts:103), `GetVectorIndexRequest.name` (model.ts:216), `MiniVectorIndex.name`, `QueryVectorIndexNextPageRequest.name` (model.ts:280), `QueryVectorIndexRequest.name` (model.ts:289), `ScanVectorIndexRequest.name` (model.ts:365), `SyncVectorIndexRequest.name` (model.ts:387), `UpsertDataVectorIndexRequest.name` (model.ts:395), `VectorIndex.name` (model.ts:427). JSDoc on every one says "Name of the index" — but a UC three-part name is more than a "name", it's a path/identifier.
- **Category:** 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `indexFullName`, `indexId`, or at least add JSDoc clarifying the expected format ("three-part Unity Catalog identifier `<catalog>.<schema>.<index>`").
- **Rationale:** `name` is too generic when the value is a structured path. Users reading `req.name = "foo"` may send a bare name and get a 404.

### 10. `endpointName` field for the *index endpoint* — generic name shared across packages — `model.ts:65, 233, 256, 282, 429`
- **Why weird:** Five sites use `endpointName?: string`. There is no JSDoc disambiguation between "vector search endpoint", "model serving endpoint", "external endpoint", "AI gateway endpoint" — all are Databricks concepts. The `EmbeddingSourceColumn.embeddingModelEndpointName` (model.ts:200) shows the SDK *does* qualify endpoint references when ambiguous, but here it does not.
- **Category:** 15 (generic field name), 19 (underspecified ID).
- **Suggested name:** `vectorSearchEndpointName` or add JSDoc clarifying it is "the Vector Search endpoint serving this index". The terse `endpointName` is fine *if* combined with type-level JSDoc.
- **Rationale:** The package owns a `VectorIndex` resource that is hosted on a *vector-search* endpoint — but a reader who jumps to a method signature sees only `endpointName` and may guess wrong.

### 11. `RerankerConfig.parameters.columnsToRerank` duplicates `QueryVectorIndexRequest.columnsToRerank` — `model.ts:315` vs `model.ts:344`
- **Why weird:** `QueryVectorIndexRequest` has both `columnsToRerank: string[]` (line 315, JSDoc "Column names used to retrieve data to send to the reranker") AND a `reranker.parameters.columnsToRerank: string[]` (line 344) inside the nested reranker parameters type. Two different fields with the same name and same purpose. The JSDoc on `reranker` (model.ts:316-321) does mention "`columns_to_rerank` selects which columns are used for reranking" — but `columns_to_rerank` lives in *both* places.
- **Category:** 12 (duplicate concept), 6 (misleading — which one wins?).
- **Suggested name:** Drop one, or document the precedence. If one is for input and the other for output/echo, name them accordingly.
- **Rationale:** Users will set the wrong field. Worth raising upstream.

### 12. `effectiveBudgetPolicyId` and `effectiveUsagePolicyId` on `DeltaSyncVectorIndexSpec[Request]` — `model.ts:133-134, 168-169`
- **Why weird:** `effective*` prefix usually marks a *response-only* computed field that reflects the inherited/resolved value from policies (see `database` package finding #11). But here these fields appear on the **Request** variant too (`DeltaSyncVectorIndexSpecRequest` lines 167-169). They cannot be both client-supplied *and* server-computed. Also `effectiveUsagePolicyId` has zero JSDoc — line 134/169 are bare.
- **Category:** 6 (misleading — "effective" implies output-only on a request type), 17 (inconsistent: budget has JSDoc, usage does not).
- **Suggested name:** Either remove the `effective*` fields from the Request variant, or document the read-only contract. Add the missing JSDoc on `effectiveUsagePolicyId`.
- **Rationale:** Same lakebase-style `effective*` leak as elsewhere — but here it leaks into the request shape, which is incoherent.

## Medium severity

### 13. `IndexSubtype` enum values include `VECTOR` documented as "Not supported" — `src/v1/model.ts:23-27`
- **Why weird:** Enum exposes a sentinel value `VECTOR` whose JSDoc reads "Not supported. Use `HYBRID` instead." Exporting unsupported values inflates the enum and forces every consumer to filter or document them away.
- **Category:** 6 (misleading: present but not supported), 18 (the value `VECTOR` is also a tautology when inside an enum called `IndexSubtype` describing a vector-search index — every value is a kind of "vector").
- **Suggested name:** Remove `VECTOR` from the enum, or rename the enum to `VectorIndexSubtype` and call the values `FullText | Hybrid`. Either way, eliminate the dead value.
- **Rationale:** Unused enum members are bug magnets.

### 14. `IndexSubtype` versus `VectorIndexType` — two enums distinguishing two different "type" axes — `model.ts:23, 50`
- **Why weird:** `IndexSubtype` = `{VECTOR, FULL_TEXT, HYBRID}` (search semantics). `VectorIndexType` = `{DELTA_SYNC, DIRECT_ACCESS}` (data residency / sync model). Both are exposed as `index*Type*` fields. Same prefix word, different axes. Beginner users will conflate them.
- **Category:** 6 (misleading: both look like "the type" of the index), 17 (inconsistent naming for two type axes).
- **Suggested name:** Rename to disambiguate: `IndexSearchMode` (for subtype) and `IndexBackingType` / `IndexStorageType` (for the DELTA_SYNC/DIRECT_ACCESS axis). Or `IndexSearchKind` and `IndexSyncMode`.
- **Rationale:** Two parallel `*Type` enums make the API harder to learn. The current names are technically correct but functionally ambiguous.

### 15. Enum values are SCREAMING_SNAKE_CASE — `PipelineType.TRIGGERED` etc. — `model.ts:34-37`
- **Why weird:** All four enums (`IndexSubtype`, `PipelineType`, `UpsertDeleteDataStatus`, `VectorIndexType`) use `UPPER_SNAKE_CASE` for member names. Google TS Style Guide §9.3 recommends `UpperCamelCase` for enum members. The codebase is mixed (some enums use camelCase elsewhere). The values are also the wire-protocol strings — wire is `UPPER_SNAKE` legitimately, but the TS *identifier* can be `Triggered` mapping to wire `'TRIGGERED'`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Go-style).
- **Suggested name:** `PipelineType.Triggered | Continuous`, with explicit `= 'TRIGGERED'` wire values. Or accept the wire-form names and apply them consistently across all packages.
- **Rationale:** Style consistency across the workspace; preference for camelCase enum members aligns with the Google TS Style Guide.

### 16. `EmbeddingSourceColumn.modelEndpointNameForQuery` — verb-phrase inside a field name — `model.ts:204`
- **Why weird:** Field name reads as a sentence (`modelEndpointName ForQuery`). JS field-naming convention is noun phrases, not "for"-clauses. Compare with adjacent `embeddingModelEndpointName` (also long, but a noun phrase).
- **Category:** 14 (Java-ish "ForX" suffix), 7 (verbose).
- **Suggested name:** `queryModelEndpointName` or `queryEmbeddingEndpointName`.
- **Rationale:** `for`-clauses in identifiers are uncommon in JS. The renaming aligns it with the adjacent field.

### 17. `embeddingSourceColumns` vs `embeddingVectorColumns` — same shape, different role — `model.ts:113-115, 149-150, 181, 189`
- **Why weird:** Two parallel array fields on three different types (`DeltaSyncVectorIndexSpec`, `DeltaSyncVectorIndexSpecRequest`, `DirectAccessVectorIndexSpec`). One holds source text columns to be embedded; the other holds pre-computed vector columns. Both arrays use *different* element types (`EmbeddingSourceColumn` vs `EmbeddingVectorColumn`) — good — but the field names look near-identical at a glance.
- **Category:** 6 (visually confusable pair), 15 (the qualifier "Source"/"Vector" is doing all the work).
- **Suggested name:** `textColumns` + `vectorColumns`, or `embeddingTextColumns` + `embeddingVectorColumns`. Anything to widen the gap between the two names.
- **Rationale:** Pairs of similarly named array fields are a known footgun. A user typing `embedding<Tab>` will autocomplete the wrong one.

### 18. `columnsToSync` and `columnsToIndex` — overlapping fields with aliasing — `model.ts:127-141, 161-176`
- **Why weird:** Two fields on the same type, JSDoc says they are aliases ("[Optional] Alias for columns_to_sync. Select the columns to include in the vector index. ... Only one of columns_to_sync or columns_to_index may be specified.") Having two fields that mean the same thing in one struct, where the API expects exactly one to be set, is a recipe for runtime errors.
- **Category:** 12 (duplicate concept by design), 6 (misleading — both look valid).
- **Suggested name:** Deprecate one in the SDK (mark `columnsToSync` as `@deprecated` if `columnsToIndex` is the new canonical), or merge them with a runtime validation.
- **Rationale:** API-level aliases are upstream policy, but the SDK should clearly mark the deprecated alias.

### 19. `pipelineId` is an underspecified ID — `model.ts:123, 158`
- **Why weird:** Field type is `string` with JSDoc "The ID of the pipeline that is used to sync the index." No format documented — is it a UUID, a numeric ID, a path? Compare with `effectiveBudgetPolicyId` which uses the same generic `string` but at least the policy ID is a known Databricks pattern.
- **Category:** 19 (underspecified ID), 15 (generic).
- **Suggested name:** Keep the name but improve the JSDoc with the expected ID format and a link to the Pipelines API.
- **Rationale:** Without format hints, users will struggle to construct the value.

### 20. `effectiveBudgetPolicyId` on a *request* type without JSDoc explanation — `model.ts:133, 168`
- **Why weird:** See finding #12. Specifically, the field is on `DeltaSyncVectorIndexSpec` (response side) *and* `DeltaSyncVectorIndexSpecRequest` (request side). On the request side, "effective" is incoherent — there is no "effective" until the server resolves it.
- **Category:** 6 (misleading on the request side), 17 (same field appears in both request and response, even when only meaningful on one).
- **Suggested name:** On `DeltaSyncVectorIndexSpecRequest`, drop the field (it cannot be set), or rename to `budgetPolicyIdOverride`.
- **Rationale:** See #12.

### 21. `inputsJson` instead of `inputs` — pre-stringified JSON in a JSON request — `model.ts:397`
- **Why weird:** `UpsertDataVectorIndexRequest.inputsJson: string` is "JSON string representing the data to be upserted." The TS surface forces the caller to call `JSON.stringify()` themselves, then the marshaling layer wraps the request body in `JSON.stringify(...)` *again*. Double-encoded payloads are a well-known JSON antipattern.
- **Category:** 6 (misleading — the field is JSON-in-JSON), 1 (generic — "inputs" tells you nothing about *what*).
- **Suggested name:** Expose as `inputs: JsonValue[]` (or whatever the row shape is) and let the SDK serialize, OR keep `inputsJson` but rename to `inputsJsonString` and document the double-encoding.
- **Rationale:** Same problem with `filtersJson` (see #22) and `schemaJson` (see #23). All three are wire-protocol leaks that should be normalized at the SDK boundary.

### 22. `filtersJson` instead of `filters` — pre-stringified JSON in a JSON request — `model.ts:305`
- **Why weird:** Same JSON-in-JSON pattern as #21. The JSDoc even shows the JSON structure in examples (`{"id <": 5}`), which means the SDK knows the type — but it is still typed as `string`.
- **Category:** 6 (misleading), 1 (generic).
- **Suggested name:** Expose as `filters?: Record<string, JsonValue>` and serialize internally. Or rename `filtersJsonString`.
- **Rationale:** Same as #21.

### 23. `schemaJson` instead of typed schema — `DirectAccessVectorIndexSpec.schemaJson` — `model.ts:187`
- **Why weird:** Same pattern. The field is "The schema of the index in JSON format. Supported types are `integer`, `long`, `float`, `double`, `boolean`, `string`, `date`, `timestamp`." A typed schema descriptor would be far more discoverable.
- **Category:** 6 (misleading), 1 (generic).
- **Suggested name:** Expose as a typed shape, or rename `schemaJsonString` and add JSDoc warning.
- **Rationale:** Same as #21.

### 24. `embeddingWritebackTable` — compound noun reads as gibberish — `model.ts:125, 160`
- **Why weird:** "Writeback" run together with "embedding" plus "Table" forms a hard-to-parse triple-noun. Pronunciation: "embed-ding-write-back-table". JSDoc clarifies meaning ("[Optional] Name of the Delta table to sync the vector index contents and computed embeddings to") — but the field name is opaque without it.
- **Category:** 7 (overly verbose), 14 (Go-style smushed identifier).
- **Suggested name:** `writebackTableName`, `embeddingsTableName`, or `computedEmbeddingsTable`.
- **Rationale:** Readability of compound nouns degrades fast past 2 words.

### 25. `ensureRerankerCompatible` boolean — confusing name and confusing semantics — `model.ts:223`
- **Why weird:** JSDoc says: "If true, the URL returned for the index is guaranteed to be compatible with the reranker. Currently this means we return the CP URL regardless of how the index is being accessed. If not set or set to false, the URL may still be compatible with the reranker depending on what URL we return." So the flag toggles *which URL is returned*, not whether the index itself is reranker-compatible. The name suggests the operation *ensures compatibility*, but it actually just changes URL format.
- **Category:** 6 (misleading), 1 (vague boolean).
- **Suggested name:** `useControlPlaneUrl`, `returnControlPlaneUrl`, or `rerankerCompatibleUrl`.
- **Rationale:** Boolean names should describe the side effect, not an aspirational outcome.

### 26. `numResults` field name in two places — `model.ts:291, 367`
- **Why weird:** Two unrelated requests (`QueryVectorIndexRequest`, `ScanVectorIndexRequest`) both name the result-count field `numResults`. JS convention is `limit` (matching SQL `LIMIT`, REST `?limit=`) or `pageSize`. `numResults` is Python/SQL-ish.
- **Category:** 14 (Python/SQL-style), 17 (cross-package inconsistency — other paged APIs use `pageSize` or `limit`).
- **Suggested name:** `limit` (matches HTTP query param and most JS libs) or `pageSize`.
- **Rationale:** Aligning with `limit`/`pageSize` reduces friction.

### 27. `queryType` typed as `string` with constrained values — `QueryVectorIndexRequest.queryType` — `model.ts:313`
- **Why weird:** JSDoc says: "The query type to use. Choices are `ANN` and `HYBRID` and `FULL_TEXT`. Defaults to `ANN`." Three known values, but typed as `string` — not an enum. Users get no autocomplete, no compile-time check.
- **Category:** 1 (generic typing), 6 (misleading typing).
- **Suggested name:** Introduce an enum `QueryType.Ann | Hybrid | FullText` (these overlap with `IndexSubtype` values but represent different concepts).
- **Rationale:** `string` for a closed set of values is a known antipattern.

### 28. `RerankerConfig.model` field — generic name "model" — `model.ts:338`
- **Why weird:** Bare `model?: string` with no JSDoc. In ML SDKs "model" is overloaded (ML model, data model, type model). The field probably holds a model endpoint name or model identifier.
- **Category:** 1 (generic), 15 (generic field losing meaning).
- **Suggested name:** `modelEndpointName`, `modelName`, or `rerankerModel`.
- **Rationale:** Document what kind of identifier this is.

### 29. `Struct.fields` returns `MapStringValueEntry[]` instead of a record — `model.ts:382`
- **Why weird:** `Struct` is the SDK's wire-format for a JSON-like map, and `MapStringValueEntry` is `{key: string, value: Value}`. The TS shape is "an array of key-value entries" rather than `Record<string, Value>`. Idiomatic JS would use a plain object or `Map`.
- **Category:** 14 (array-of-entries map encoding leaks to TS).
- **Suggested name:** Flatten to `Record<string, Value>` at the TS boundary; keep the entry-array shape on the wire.
- **Rationale:** Forcing users to map an array of `{key, value}` pairs into a record is friction the SDK could remove.

## Low severity

### 30. `Value` — single-word generic name for a discriminated union — `model.ts:414-423`
- **Why weird:** A bare type called `Value` is uninformative. It is the SDK's wire-form scalar wrapper (number/string/bool/struct/list). Stronger candidates: `ScalarValue`, `WireValue`, `VectorIndexValue`.
- **Category:** 1 (generic).
- **Suggested name:** `ScalarValue` or move to the core wkt package and rename `wkt.Value`.
- **Rationale:** `Value` collides with too many concepts.

### 31. `Struct` — generic single-word type name — `model.ts:380`
- **Why weird:** "Struct" is a language keyword in many languages (Go, C, Rust). In JS/TS it is a vague C-style holdover. The type is "a row of a vector index" (per the JSDoc).
- **Category:** 1 (generic), 10 (potential reserved-word collision in TS-flow tools).
- **Suggested name:** `IndexRow` or `VectorIndexRow`.
- **Rationale:** A more domain-specific name is more discoverable.

### 32. `MapStringValueEntry` — verbose name for a key-value pair — `model.ts:245`
- **Why weird:** Reads as "Map of String to Value Entry". JSDoc says "Key-value pair." Just call it that.
- **Category:** 7 (verbose).
- **Suggested name:** `KeyValue` or `StructField`.
- **Rationale:** Less verbose, more idiomatic.

### 33. `ResultManifest` — Java/Spring-flavored noun — `model.ts:356-361`
- **Why weird:** "Manifest" in a query-result context is unusual JS phrasing. JSDoc says "Metadata about the result set." More common in JS: `Metadata`, `Schema`, `Info`.
- **Category:** 14 (Java-style), 1 (mildly generic).
- **Suggested name:** `ResultMetadata` or `ResultSchema`.
- **Rationale:** Aligns with idiomatic JS.

### 34. `ResultData` — generic two-word noun — `model.ts:348-353`
- **Why weird:** Type is "Data returned in the query result." `ResultData` is generic; `QueryResultData` or just `Rows` would be more specific.
- **Category:** 1 (generic).
- **Suggested name:** `QueryResultData` or `ResultRows`.
- **Rationale:** Disambiguate.

### 35. `lastPrimaryKey` field on request + response — `model.ts:369, 377`
- **Why weird:** Same field name used as a cursor on both request (input) and response (output). On the response it is fine ("last primary key in this page"), on the request it is a pagination cursor named after its expected source rather than its role. JS convention would be `pageToken` / `cursor` / `afterKey`.
- **Category:** 17 (inconsistency with `pageToken` used elsewhere — model.ts:235, 284), 14 (database-cursor-style name).
- **Suggested name:** Both could use `cursor` or `afterPrimaryKey` (request) + `lastPrimaryKey` (response).
- **Rationale:** The package uses `pageToken` for pagination elsewhere; `lastPrimaryKey` is a one-off naming convention for scan.

## Observation

### 36. `Call` type imported from `@databricks/sdk-core/api` — generic name — `client.ts:4`
- **Why weird:** Cross-package import. `Call` is the most generic possible name for "a network operation".
- **Category:** 1 (generic), cross-package observation.
- **Suggested name:** `RetryableCall`, `SdkCall`. Out of scope for this audit.
- **Rationale:** Tracked for cross-package consistency.

### 37. `MiniVectorIndex` is exported from `index.ts` despite being internal-looking — `index.ts:29`
- **Why weird:** The mini variant (see #3, #4) is re-exported as part of the public API. If the intent is for it to be an internal implementation detail, it should not be in `index.ts`.
- **Category:** Observation on the public surface.
- **Suggested name:** Either rename per #3 or remove from the public surface.
- **Rationale:** Consumers will use whatever is exported; if `MiniVectorIndex` is a name we'd prefer not to commit to publicly, it should be hidden.
