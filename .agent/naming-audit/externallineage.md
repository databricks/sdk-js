# Naming Audit: externallineage

**Path:** `packages/externallineage/src/v1/`
**Versions audited:** v1
**Inferred domain:** External Lineage relationships on Unity Catalog — create / update / delete / list typed relationships between Databricks objects (tables, paths, model versions) and external metadata objects (e.g., Tableau dashboards, Looker views), plus optional per-column relationships.
**Total weird names flagged:** 9

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 1 |
| Low | 3 |
| Observation | 1 |

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

### 3. `ExternalLineageInfo` vs. `ExternalLineageRelationship` — `src/v1/model.ts:98, 111`
- **Why weird:** Two top-level types share the prefix `ExternalLineage` but mean different things: `ExternalLineageInfo` is a union-of-info "row" that may describe a table, a file, a model version, or an external metadata object plus the edge metadata; `ExternalLineageRelationship` is the edge itself (id, source, target, columns, properties). The JSDoc on `ExternalLineageInfo` says "Lineage response containing lineage information of a data asset" while one of its fields is `externalLineageInfo?: ExternalLineageRelationship` — i.e., an "info" type that *contains* an "info" field whose type ends in `Relationship`. Five fields ending in `Info` (`tableInfo`, `fileInfo`, `modelInfo`, `externalMetadataInfo`, `externalLineageInfo`) on a type also ending in `Info`. This is the heart of the naming muddle.
- **Category:** 1 (vague `Info` everywhere), 6 (misleading — `externalLineageInfo` is the edge metadata, not "info about external lineage"), 8 (redundant suffix), 12 (duplicate concept — `ExternalLineageInfo.externalLineageInfo` of type `ExternalLineageRelationship`).
- **Suggested name:** `ExternalLineageInfo` → `LineageNode` or `LineageEntry`. `externalLineageInfo` field → `relationship: ExternalLineageRelationship`. The four neighbour fields (`tableInfo`, `fileInfo`, `modelInfo`, `externalMetadataInfo`) become `table`, `file`, `model`, `externalMetadata`.
- **Rationale:** "Info" is the generator's escape hatch for "I don't know what to call this". The current shape forces a reader to deduce that one of the `Info` fields is structurally different from the others (it's the edge, not a node). Concrete names break the muddle.

### 4. Mixed `Info` / `Relationship` / `Object` suffix vocabulary — across `src/v1/model.ts`
- **Why weird:** The package mixes three competing nouns for related concepts: `*Info` (LineageTableInfo, LineageFileInfo, LineageModelVersionInfo, LineageExternalMetadataInfo, ExternalLineageInfo), `*Relationship` (ColumnRelationship, ExternalLineageRelationship, plus six `ExternalLineageRelationship*` sub-types), and `*Object` (ExternalLineageRelationshipObject). All three trade off in the same conceptual space. A reader cannot predict which suffix a new sibling type will get.
- **Category:** 8 (redundant suffix), 12 (duplicate concept), 17 (inconsistent action-vocabulary).
- **Suggested name:** Pick one: prefer no suffix where the noun is concrete (`Table`, `Path`, `ModelVersion`, `ExternalMetadata`), `Relationship` for edges, and drop `Info`/`Object` entirely.
- **Rationale:** Three suffixes for related types make the vocabulary feel arbitrary. The Google TypeScript style guide encourages "names should reflect what something is, not its scaffolding".

## Medium severity

### 5. `Client` class — `src/v1/client.ts:45`
- **Why weird:** Class literally named `Client` at the top level of the package's API surface, re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import. Same problem as every other audited package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `ExternalLineageClient` (matches the package name and avoids collisions).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-externallineage'` and `import {Client} from '@databricks/sdk-externalmetadata'` cannot, and must rename. Sister packages share the problem; treat as generator-wide.

## Low severity

### 6. `LineageModelVersionInfo.modelName` vs `version` — `src/v1/model.ts:191, 193`
- **Why weird:** Type carries `modelName` (string) and `version` (number). The `version` is described as "Version number of the model" — but the related type `ExternalLineageRelationshipModelVersion` uses `version: string`. Same concept, two types: `number` in the response, `string` on the relationship side.
- **Category:** 16 (field contradicting type domain — `version` is `number` here, `string` elsewhere), 17 (inconsistent type for the same concept).
- **Suggested name:** Pick one type and stick to it. (Likely `string` because UC model versions can be e.g. `"1"`, `"prod"`, `"latest"`.)
- **Rationale:** Type drift on the same field across types implies one of them is wrong on the wire.

### 7. `LineageFileInfo.securableName`, `securableType`, `storageLocation` — `src/v1/model.ts:179-183`
- **Why weird:** Type is `LineageFileInfo` but three of its four data-bearing fields are about a *securable* (which the JSDoc says lives "on the path"). The type is mostly about the securable, not the file. The fourth field is `path: string` ("URL of the path"); reread: URL of the path. Three fields named with `securable*` on a type called `*FileInfo` looks like the type name was chosen too early.
- **Category:** 6 (misleading type name — `FileInfo` advertises "info about a file" but it's "info about a securable on a file"), 15 (generic `path` field doing structured work).
- **Suggested name:** `LineageFileSecurableInfo`, or rename the fields to drop `securable` if the file aspect is meant to dominate. Also expand the `path` JSDoc — "URL of the path" is circular.
- **Rationale:** Type name should reflect the dominant content; current name is misleading.

### 8. `eventTime` repeated on four sibling types — `src/v1/model.ts:171, 185, 195, 207`
- **Why weird:** Every `Lineage*Info` type carries `eventTime?: Temporal.Instant` with identical JSDoc "Timestamp of the lineage event." This is fine for parallelism, but the field is *also* not present on `ExternalLineageRelationship` (the actual edge metadata) — only on the node-side `Info` types. A reader expects the edge to carry the event time.
- **Category:** 12 (duplicate concept — four identical fields), 6 (misleading — the edge type *lacks* the event time, an asymmetry the names hide).
- **Suggested name:** Lift `eventTime` into a shared `LineageNode` base interface if duplication bothers; or document why the edge lacks one.
- **Rationale:** Four-fold repetition is a generator artefact. The asymmetry against the edge is the hidden bit.

## Observations

### 9. `ListExternalLineageRelationshipsResponse.externalLineageRelationships` field name
The response wraps an array under the field `externalLineageRelationships` (35 characters). The type of that array is `ExternalLineageInfo[]` — *not* `ExternalLineageRelationship[]`. So a field named `externalLineageRelationships` is actually a list of `ExternalLineageInfo`. This is the same Info/Relationship muddle from #3.
- **Category:** 6 (misleading — field name promises one type, returns another), 12 (duplicate concept).

## Domain glossary
- `External Lineage` — relationships connecting Databricks (UC) data assets to non-Databricks systems (Tableau dashboards, Looker views, Power BI reports, BigQuery tables, etc.). The "edge" is `ExternalLineageRelationship`.
- `UC` / Unity Catalog — the governance layer that owns the source/target objects on the Databricks side (tables, paths, model versions).
- `Securable` — UC concept for any governed object; see `LineageFileInfo.securableType`/`securableName`. Not surfaced as its own type in this package.
- `Model Version` — MLflow registered-model version, identified by `(modelName, version)` pair. Note the type-drift between `number` (in `LineageModelVersionInfo`) and `string` (in `ExternalLineageRelationshipModelVersion`) — see #6.
- `External Metadata` — sister package `externalmetadata`. The edge type here references it by name only (`ExternalLineageRelationshipExternalMetadata.name`).
- `wkt` — Well-Known Types (import `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `wire` — JSON-on-the-wire representation; `marshal`/`unmarshal` schemas translate between TS camelCase and wire snake_case.
- `oneof` / `$case` — protobuf tagged-union encoding, preserved in TS as discriminated unions keyed on `$case`.

## File coverage
- `src/v1/model.ts` (668 lines): read fully.
- `src/v1/client.ts` (243 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (33 lines): read fully.
