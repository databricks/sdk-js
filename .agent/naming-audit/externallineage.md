# Naming Audit: externallineage

**Path:** `packages/externallineage/src/v1/`
**Versions audited:** v1
**Inferred domain:** External Lineage relationships on Unity Catalog — create / update / delete / list typed relationships between Databricks objects (tables, paths, model versions) and external metadata objects (e.g., Tableau dashboards, Looker views), plus optional per-column relationships.
**Total weird names flagged:** 24

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 7 |
| Low | 8 |
| Observation | 2 |

## High severity

### 1. `CreateRequestExternalLineage` / `DeleteRequestExternalLineage` / `UpdateRequestExternalLineage` — `src/v1/model.ts:51, 74, 238`
- **Why weird:** Word-order inversion `Request` + entity instead of entity + `Request`. Every other request type in this package (`CreateExternalLineageRelationshipRequest`, `DeleteExternalLineageRelationshipRequest`) and across the SDK uses entity-then-`Request`. These three types are the nested *payload* shapes for create/delete/update (wrapped inside `*Request` outer types). All three types are structurally identical to each other AND to `ExternalLineageRelationship` (same five fields: `id`, `source`, `target`, `columns`, `properties`).
- **Category:** 12 (duplicate concept — 4 types with the same shape), 17 (verb-position inconsistency with rest of SDK).
- **Suggested name:** Rename to entity-first form: `CreateExternalLineagePayload` / `DeleteExternalLineagePayload` / `UpdateExternalLineagePayload`, or align with the outer `*Request` naming.
- **Rationale:** The inversion serves no purpose except to differentiate them by name from the outer request types. Entity-first matches the rest of the SDK.

### 2. `ExternalLineageRelationshipObject.tpe` discriminator — `src/v1/model.ts:140`
- **Why weird:** Field literally spelled `tpe` (three letters, missing the `y`). `type` is a reserved-ish word in TS but is allowed as a property name; this is a workaround for something that doesn't need a workaround. The marshalling code at `model.ts:563-570` confirms this is the *only* discriminator field — wire payload has no `tpe` key, it's spread into `table`/`path`/`model_version`/`external_metadata` directly.
- **Category:** 5 (cryptic abbreviation), 10 (reserved-word collision-avoidance).
- **Suggested name:** Use a TS discriminated union with `$case` directly (no outer `tpe` field): `ExternalLineageRelationshipObject = {$case: 'table', table: ...} | {$case: 'path', path: ...} | ...`. If the wrapper must stay, name the field `kind` or `objectType`.
- **Rationale:** TS allows `type` as a property name, so the cryptic `tpe` solves a problem TS does not have.

### 3. `objectInfo` field of type `ExternalLineageRelationshipObject` — `src/v1/model.ts:216`
- **Why weird:** Field is named `objectInfo` but is typed as `ExternalLineageRelationshipObject` (no `Info` in the type). The convention drift means a reader sees `objectInfo: ExternalLineageRelationshipObject` and has to mentally reconcile the two. Note the JSDoc immediately starts talking about a `object_info.table.name=...` query parameter — so on the wire, the prefix really is `object_info`, but in TS the type doesn't end in `Info`.
- **Category:** 1 (vague `Info` suffix), 8 (redundant suffix — `Info` adds nothing), 17 (field-name does not match type-name).
- **Suggested name:** `object: ExternalLineageRelationshipObject`. (Wire serialisation stays `object_info` to match the API.)
- **Rationale:** `Info` is generator filler; the type already describes itself. Field/type-name agreement reduces cognitive load.

### 4. `ExternalLineageInfo` vs. `ExternalLineageRelationship` — `src/v1/model.ts:98, 111`
- **Why weird:** Two top-level types share the prefix `ExternalLineage` but mean different things: `ExternalLineageInfo` is a union-of-info "row" that may describe a table, a file, a model version, or an external metadata object plus the edge metadata; `ExternalLineageRelationship` is the edge itself (id, source, target, columns, properties). The JSDoc on `ExternalLineageInfo` says "Lineage response containing lineage information of a data asset" while one of its fields is `externalLineageInfo?: ExternalLineageRelationship` — i.e., an "info" type that *contains* an "info" field whose type ends in `Relationship`. Five fields ending in `Info` (`tableInfo`, `fileInfo`, `modelInfo`, `externalMetadataInfo`, `externalLineageInfo`) on a type also ending in `Info`. This is the heart of the naming muddle.
- **Category:** 1 (vague `Info` everywhere), 6 (misleading — `externalLineageInfo` is the edge metadata, not "info about external lineage"), 8 (redundant suffix), 12 (duplicate concept — `ExternalLineageInfo.externalLineageInfo` of type `ExternalLineageRelationship`).
- **Suggested name:** `ExternalLineageInfo` → `LineageNode` or `LineageEntry`. `externalLineageInfo` field → `relationship: ExternalLineageRelationship`. The four neighbour fields (`tableInfo`, `fileInfo`, `modelInfo`, `externalMetadataInfo`) become `table`, `file`, `model`, `externalMetadata`.
- **Rationale:** "Info" is the generator's escape hatch for "I don't know what to call this". The current shape forces a reader to deduce that one of the `Info` fields is structurally different from the others (it's the edge, not a node). Concrete names break the muddle.

### 5. Mixed `Info` / `Relationship` / `Object` suffix vocabulary — across `src/v1/model.ts`
- **Why weird:** The package mixes three competing nouns for related concepts: `*Info` (LineageTableInfo, LineageFileInfo, LineageModelVersionInfo, LineageExternalMetadataInfo, ExternalLineageInfo), `*Relationship` (ColumnRelationship, ExternalLineageRelationship, plus six `ExternalLineageRelationship*` sub-types), and `*Object` (ExternalLineageRelationshipObject). All three trade off in the same conceptual space. A reader cannot predict which suffix a new sibling type will get.
- **Category:** 8 (redundant suffix), 12 (duplicate concept), 17 (inconsistent action-vocabulary).
- **Suggested name:** Pick one: prefer no suffix where the noun is concrete (`Table`, `Path`, `ModelVersion`, `ExternalMetadata`), `Relationship` for edges, and drop `Info`/`Object` entirely.
- **Rationale:** Three suffixes for related types make the vocabulary feel arbitrary. The Google TypeScript style guide encourages "names should reflect what something is, not its scaffolding".

### 6. `ExternalLineageRelationshipTable` / `ExternalLineageRelationshipPath` / `ExternalLineageRelationshipModelVersion` / `ExternalLineageRelationshipExternalMetadata` — `src/v1/model.ts:158, 154, 134, 130`
- **Why weird:** Four sibling types every one prefixed with the package's longest type-name `ExternalLineageRelationship`. The naming makes them feel weighty; their position in the union does not justify the weight. Names like `ExternalLineageRelationshipExternalMetadata` are over 35 characters and convey one bit of information (which arm of the union).
- **Category:** 7 (overly verbose), 8 (redundant prefix — `ExternalLineageRelationship` is implicit from context).
- **Suggested name:** Nest them: `ExternalLineageRelationship.Table`, `ExternalLineageRelationship.Path`, etc., via a TS namespace; or drop the prefix and name them `LineageTableObject`, `LineagePathObject`, `LineageModelVersionObject`, `LineageExternalMetadataObject`.
- **Rationale:** The redundant prefix is paid on every line that references these types. Dropping it (or nesting) shortens call sites without losing information.

### 7. `ColumnRelationship` ambiguous source/target — `src/v1/model.ts:42-45`
- **Why weird:** Both fields are typed as `string | undefined` with no JSDoc. A reader of `{source?: string, target?: string}` has no way to know that these are *column names* (not full table.column references, not column IDs). The enclosing `ExternalLineageRelationship` has its own `source` and `target` of type `ExternalLineageRelationshipObject` — so the inner `source`/`target` of `ColumnRelationship` shadow the outer pair and add no description.
- **Category:** 1 (vague `source`/`target`), 6 (misleading — looks like the outer source/target but is column-level), 15 (generic field names lose meaning), 19 (underspecified ID — is this a column name? a path? a column lineage handle?).
- **Suggested name:** `sourceColumn?: string` / `targetColumn?: string` with JSDoc clarifying the format.
- **Rationale:** Two fields with the same names as their parent confuse the reader. Sister packages would not name a child the same as its parent.

## Medium severity

### 8. `Client` class — `src/v1/client.ts:45`
- **Why weird:** Class literally named `Client` at the top level of the package's API surface, re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import. Same problem as every other audited package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `ExternalLineageClient` (matches the package name and avoids collisions).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-externallineage'` and `import {Client} from '@databricks/sdk-externalmetadata'` cannot, and must rename. Sister packages share the problem; treat as generator-wide.

### 9. `executeCall` vs. `executeHttpCall` — `src/v1/utils.ts:26, 65`
- **Why weird:** Two functions named "execute" — one runs the retry/rate-limit shell, the other does the actual HTTP request. The names do not communicate the layering. Inside each client method, `executeHttpCall` is wrapped in `call`, then `executeCall(call, options)` runs it. The reader has to read the bodies to figure out who calls whom.
- **Category:** 1 (vague), 12 (duplicate concept — both are "execute"), 17 (inconsistent layering name).
- **Suggested name:** `runWithRetry(call, options)` (outer) and `sendHttpRequest(opts)` (inner). Or `executeWithPolicies` + `executeHttpRequest`.
- **Rationale:** The current names hide the fact that one wraps the other. Layer names should make the call graph obvious.

### 10. `buildHttpRequest` returns `HttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** A pure object-literal-with-optional-fields helper named "build" suggests something more elaborate (e.g., builder pattern). The function just spreads optional fields into a struct.
- **Category:** 1 (vague), 6 (misleading — implies builder pattern, is just an object literal).
- **Suggested name:** `makeHttpRequest` or inline at the call sites.
- **Rationale:** "Build" carries connotations from Java/JS Builder patterns; this is a one-liner.

### 11. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Type called `Options` but it is an internal context bag (request + http client + logger), not user-tunable options. The user-facing options type is `CallOptions` (different file). Mixing "options" for two different concepts is confusing.
- **Category:** 1 (vague suffix `Options`), 8 (redundant suffix — internal context bags should not be called `Options`).
- **Suggested name:** `HttpCallContext` or `HttpCallArgs`.
- **Rationale:** Reserve `Options` for things callers tune; use `Context`/`Args` for the internal bag.

### 12. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Function recurses into objects and arrays to flatten them into URL-search-parameter dot-notation form. The "arrays of objects are not yet supported" comment shows the implementation is partial. The name says "flatten" but the function in fact *recurses* and *appends* to a `URLSearchParams` instance — it does not return a flat structure.
- **Category:** 1 (vague — "flatten" doesn't say "append to URLSearchParams"), 6 (misleading — looks pure, mutates a parameter), 17 (verb inconsistency — name says "flatten" but action is "append").
- **Suggested name:** `appendDotPathParams` or `serializeQueryDotPath`.
- **Rationale:** A function that mutates its third argument should not be named after the value it returns (`flatten` reads as a pure transform). Generator-wide concern (every package duplicates this helper).

### 13. `LineageTableInfo.name` — `src/v1/model.ts:201`
- **Why weird:** Field literally called `name` with JSDoc "Name of Table." (capitalised "Table" mid-sentence). The neighbour fields are `catalogName` and `schemaName` — so the type has `(name, catalogName, schemaName)`. Inconsistent: two fields use the `*Name` suffix while the table name itself drops it. Most readers will reach for `tableName`.
- **Category:** 1 (vague — `name` of what?), 15 (generic field name losing meaning), 17 (inconsistent within the same type — `name` vs `catalogName` vs `schemaName`).
- **Suggested name:** `tableName: string` (and JSDoc punctuation fix).
- **Rationale:** Within `LineageTableInfo`, the canonical name for "the table's name" is `tableName`. Mixing `name`, `catalogName`, `schemaName` makes the table's own name look special when it isn't.

### 14. `ExternalLineageRelationshipExternalMetadata.name` — `src/v1/model.ts:131`
- **Why weird:** Field is `name?: string` with no JSDoc. Type is named to encode "external metadata object on the external-lineage edge". Given the wider package uses `name` for tables, models, external metadata, paths-via-`url`, the field gives up domain meaning to be terse.
- **Category:** 1 (vague `name`), 15 (generic field name), 19 (underspecified ID — for `ExternalMetadata`, the `name` is actually a fully-qualified resource path including the metastore).
- **Suggested name:** `externalMetadataName: string` with a JSDoc clarifying the expected format (mirror the `ExternalMetadata.name` JSDoc on the externalmetadata package).
- **Rationale:** `name` is the most overloaded field name in the SDK. Spelling out the entity removes the ambiguity.

## Low severity

### 15. `ExternalLineageRelationshipPath.url` — `src/v1/model.ts:155`
- **Why weird:** Field is `url?: string` on a type called `*Path`. A `Path` whose only field is a `url` — two different nouns for the same thing. Compare with `LineageFileInfo.path` and `ExternalLineageRelationshipPath.url`: the file `path` and the lineage-path `url` carry the same kind of value.
- **Category:** 1 (vague), 6 (misleading — `Path` and `url` are not the same), 12 (duplicate concept — `path` and `url` interchangeable across the package), 17 (inconsistent vocabulary).
- **Suggested name:** Either rename the type to `LineagePathObject` and call the field `path: string`, or rename the field to keep the type name: `path?: string`.
- **Rationale:** Pick one of `path` or `url` for storage location strings and stick to it.

### 16. `LineageModelVersionInfo.modelName` vs `version` — `src/v1/model.ts:191, 193`
- **Why weird:** Type carries `modelName` (string) and `version` (number). The `version` is described as "Version number of the model" — but the related type `ExternalLineageRelationshipModelVersion` (#6) uses `version: string`. Same concept, two types: `number` in the response, `string` on the relationship side.
- **Category:** 16 (field contradicting type domain — `version` is `number` here, `string` elsewhere), 17 (inconsistent type for the same concept).
- **Suggested name:** Pick one type and stick to it. (Likely `string` because UC model versions can be e.g. `"1"`, `"prod"`, `"latest"`.)
- **Rationale:** Type drift on the same field across types implies one of them is wrong on the wire.

### 17. `LineageFileInfo.securableName`, `securableType`, `storageLocation` — `src/v1/model.ts:179-183`
- **Why weird:** Type is `LineageFileInfo` but three of its four data-bearing fields are about a *securable* (which the JSDoc says lives "on the path"). The type is mostly about the securable, not the file. The fourth field is `path: string` ("URL of the path"); reread: URL of the path. Three fields named with `securable*` on a type called `*FileInfo` looks like the type name was chosen too early.
- **Category:** 6 (misleading type name — `FileInfo` advertises "info about a file" but it's "info about a securable on a file"), 15 (generic `path` field doing structured work).
- **Suggested name:** `LineageFileSecurableInfo`, or rename the fields to drop `securable` if the file aspect is meant to dominate. Also expand the `path` JSDoc — "URL of the path" is circular.
- **Rationale:** Type name should reflect the dominant content; current name is misleading.

### 18. `eventTime` repeated on four sibling types — `src/v1/model.ts:171, 185, 195, 207`
- **Why weird:** Every `Lineage*Info` type carries `eventTime?: Temporal.Instant` with identical JSDoc "Timestamp of the lineage event." This is fine for parallelism, but the field is *also* not present on `ExternalLineageRelationship` (the actual edge metadata) — only on the node-side `Info` types. A reader expects the edge to carry the event time.
- **Category:** 12 (duplicate concept — four identical fields), 6 (misleading — the edge type *lacks* the event time, an asymmetry the names hide).
- **Suggested name:** Lift `eventTime` into a shared `LineageNode` base interface if duplication bothers; or document why the edge lacks one.
- **Rationale:** Four-fold repetition is a generator artefact. The asymmetry against the edge is the hidden bit.

### 19. `req` parameter and `respBody` / `resp` locals — `src/v1/client.ts:72, 80-92, 104, 134-178, 202-235`
- **Why weird:** Two stages produce `respBody: Uint8Array` then `resp: ExternalLineageRelationship`. The names differ only by `Body`; the reader has to track that one is bytes, one is parsed.
- **Category:** 5 (cryptic abbreviation), 17 (`respBody` keeps `Body`, `resp` drops the implied `Parsed`).
- **Suggested name:** `rawBody` + `result` (or `parsedResponse`).
- **Rationale:** Distinguish stages by meaningful nouns, not by suffix differences on the same root.

### 20. `httpReq` local variable — `src/v1/client.ts:84, 123, 162, 220`
- **Why weird:** Inside a method that already has `req: …Request`, a second variable `httpReq: HttpRequest` shares the same `req` root with a different prefix. Easy to grab the wrong one.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s in the same scope).
- **Suggested name:** `httpRequest` (no abbreviation) or `wireRequest`.
- **Rationale:** Avoid forking the same identifier across two layers in the same scope.

### 21. `Call` type and `call` variable — `src/v1/client.ts:81, 120, 159, 217`
- **Why weird:** Variable named `call` of type `Call` — same word for the variable, type, and the API method semantics. Inside `executeCall(call, options)` the verb-noun collision is jarring.
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions read fine in IDE but obscure prose-style reads.

### 22. `PACKAGE_SEGMENT` — `src/v1/client.ts:40`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. The comment above does the documentation work the name should.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain. Pair with the comment.

## Observations

### 23. Method names re-state the entity verbosely
All four methods (`createExternalLineageRelationship`, `updateExternalLineageRelationship`, `deleteExternalLineageRelationship`, `listExternalLineageRelationships`) end with `ExternalLineageRelationship`. The package is *named* `externallineage`, so the entity is obvious from the import path. `client.create(...)` / `client.list(...)` would be both terser and more readable, but generator-wide consistency probably wins.
- **Category:** 7 (overly verbose) — generator-wide pattern, listed as observation only.

### 24. `ListExternalLineageRelationshipsResponse.externalLineageRelationships` field name
The response wraps an array under the field `externalLineageRelationships` (35 characters). The type of that array is `ExternalLineageInfo[]` — *not* `ExternalLineageRelationship[]`. So a field named `externalLineageRelationships` is actually a list of `ExternalLineageInfo`. This is the same Info/Relationship muddle from #4.
- **Category:** 6 (misleading — field name promises one type, returns another), 12 (duplicate concept).

## Domain glossary
- `External Lineage` — relationships connecting Databricks (UC) data assets to non-Databricks systems (Tableau dashboards, Looker views, Power BI reports, BigQuery tables, etc.). The "edge" is `ExternalLineageRelationship`.
- `UC` / Unity Catalog — the governance layer that owns the source/target objects on the Databricks side (tables, paths, model versions).
- `Securable` — UC concept for any governed object; see `LineageFileInfo.securableType`/`securableName`. Not surfaced as its own type in this package.
- `Model Version` — MLflow registered-model version, identified by `(modelName, version)` pair. Note the type-drift between `number` (in `LineageModelVersionInfo`) and `string` (in `ExternalLineageRelationshipModelVersion`) — see #16.
- `External Metadata` — sister package `externalmetadata`. The edge type here references it by name only (`ExternalLineageRelationshipExternalMetadata.name`).
- `wkt` — Well-Known Types (import `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `wire` — JSON-on-the-wire representation; `marshal`/`unmarshal` schemas translate between TS camelCase and wire snake_case.
- `oneof` / `$case` — protobuf tagged-union encoding, preserved in TS as discriminated unions keyed on `$case`.

## File coverage
- `src/v1/model.ts` (668 lines): read fully.
- `src/v1/client.ts` (243 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (33 lines): read fully.
