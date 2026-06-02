# Naming Audit: pipelines

**Path:** `packages/pipelines/src/v2/`
**Versions audited:** v2
**Inferred domain:** Lakeflow Declarative Pipelines (formerly Delta Live Tables / DLT) — create / clone / get / list / edit / delete pipelines, start / stop / list / get pipeline **updates** ("a run of a pipeline"), and a vast catalog of ingestion connectors (Salesforce, Workday, Outlook, Kafka, RabbitMQ, TikTok Ads, ServiceNow, Confluence, Jira, ...). The API was renamed multiple times (DLT → Spark Declarative Pipelines → Lakeflow Declarative Pipelines); branding leakage and acronyms are abundant.

**Files audited:**
- `src/v2/model.ts` (~5,500 lines) — 26 enums, ~116 interfaces, marshal/unmarshal schemas.
- `src/v2/client.ts` (631 lines) — 12 RPC methods + 2 paginators + `StopWaiter`.
- `src/v2/utils.ts` (181 lines) — generic HTTP/marshal helpers (no domain names).
- `src/v2/index.ts` (155 lines) — re-exports.

## Summary

| Severity     | Count | Notes                                                                                       |
| ------------ | ----- | ------------------------------------------------------------------------------------------- |
| High         | 10    | Verb/noun overloading (`Update`), DLT-era rebrand leakage, identifier collisions.           |
| Medium       | 8     | Vague/misleading names, redundant suffix, generic types, misplaced field.                   |
| Low          | 2     | Coupled fields modelled as loose flags.                                                     |
| **Total**    | **20** | |

---

## High

### H1. `Update` is a verb in every other Databricks SDK but the noun "pipeline run" here — pervasive overloading
- **Locations:** `model.ts:168` (`UpdateCause`), `model.ts:186` (`UpdateState`), `model.ts:885` (`GetUpdateRequest`), `model.ts:1401` (`ListUpdatesRequest`), `model.ts:2405` (`StartUpdateRequest`), `model.ts:2537` (`UpdateInfo`), `model.ts:2581` (`UpdateStateInfo`), `client.ts:362` (`getUpdate`), `client.ts:450` (`listUpdates`), `client.ts:490` (`start`).
- **Category:** 1 (vague), 6 (misleading — rebrand history), 13 (verb/noun inconsistency), 17 (inconsistent action verbs).
- **Suggestion:** Rename `Update` → `PipelineRun` everywhere in the public TS surface. `StartUpdateRequest` → `StartRunRequest` (or `RunPipelineRequest`), `GetUpdateRequest` → `GetRunRequest`, `ListUpdatesRequest` → `ListRunsRequest`, `UpdateInfo` → `PipelineRun`, `UpdateState` → `PipelineRunState`, `UpdateCause` → `RunStartCause`, `UpdateStateInfo` → `RunSummary`. The HTTP wire still uses `/updates/`, so the schema layer maps the rename — this is fine.
- **Rationale:** "Update" is the standard verb for `PUT`/`PATCH` (and `EditPipelineRequest` already takes that slot — the client method is `edit()`, but the HTTP verb is `PUT`). Every JS/TS developer expects `update()` to mean "mutate". The DLT product feature historically named the unit-of-execution "Update" but Databricks itself renamed the concept to **"Pipeline run"** when the product became Lakeflow Declarative Pipelines. The SDK is on the wrong side of the rebrand. The same problem ripples through `start()` (the method that "starts an update"), `getUpdate()`, and `listUpdates()`. This is the single most confusing name in the package.

### H2. `client.start()` is "start a pipeline update" — but it reads as "start a pipeline"
- **Location:** `client.ts:490`.
- **Category:** 6 (misleading), 17 (inconsistent action verbs).
- **Suggestion:** Rename `start(req: StartUpdateRequest)` → `run(req: RunPipelineRequest)` or `startRun(req: StartRunRequest)`. Pair with `stop(req: StopPipelineRequest)`.
- **Rationale:** Reading `client.start({pipelineId})` you assume it "starts the pipeline". It actually queues a new **run** (Update). The asymmetry with `stop(req: StopPipelineRequest)` (which DOES stop the pipeline) is silent and dangerous. `run` is the verb Databricks uses in marketing copy and now in the UI; `start` is the legacy name.

### H3. `PipelinesJobRunAs` references `Job` from a `Pipelines` package
- **Location:** `model.ts:2185`.
- **Category:** 6 (misleading — `Job` is a separate Databricks product), 14 (Go-style).
- **Suggestion:** Rename to `RunAs` or `PipelineRunAs`. Drop the `Job` token entirely — this type is not used by `@databricks/sdk-jobs`.
- **Rationale:** `Job` belongs to the `jobs` API. A user reading `runAs: PipelinesJobRunAs` cannot tell whether the pipeline is associated with a job or just borrows the shape. The proto comment ("Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as.") confirms this is a pipeline-only concept.

### H4. `Pipeline` is never used as a type name — the central domain entity is missing
- **Locations:** N/A — the package has `PipelineSpec`, `PipelineStateInfo`, `GetPipelineResponse`, `BaseJob`-style scattering, but no plain `Pipeline` type.
- **Category:** 1 (vague/generic alternative missing), 6 (misleading).
- **Suggestion:** Add an exported `Pipeline` type that consolidates the runtime view (`GetPipelineResponse` is the closest). Alternatively rename `GetPipelineResponse` → `Pipeline`. Keep `PipelineSpec` as the write-form (the "settings" sub-object).
- **Rationale:** A user installs `@databricks/sdk-pipelines` and expects to `import {Pipeline} from '@databricks/sdk-pipelines'`. Instead they have to discover `GetPipelineResponse`, `PipelineSpec`, `PipelineStateInfo`, or `BaseRun`-style scatter. The Go SDK does the same thing — but Go has package-namespace `pipelines.Pipeline`, while TS uses bare identifiers and benefits from a primary name.

### H5. `client.events()` method name is too generic
- **Location:** `client.ts:274`.
- **Category:** 1 (vague), 17 (inconsistent action verbs — should be `listEvents`).
- **Suggestion:** Rename to `listEvents()` for symmetry with `listUpdates()`, `list()`.
- **Rationale:** Bare `events()` reads as a property accessor or event emitter, not an HTTP `GET`. Every other paginating method uses `list*` (`list`, `listUpdates`).

### H6. `client.list()` — too generic for the package's bare-`list` slot
- **Location:** `client.ts:390`.
- **Category:** 1 (vague), 17 (inconsistent verbs).
- **Suggestion:** Rename to `listPipelines()` to match the request type `ListPipelinesRequest` and to disambiguate from `listUpdates`/`listEvents`.
- **Rationale:** `client.list(req)` requires the user to remember `list` of *what*. Adjacent methods are `listUpdates`, `events` (sic), and the request type is already `ListPipelinesRequest`. Bare `list` is a Go-SDK convention (where the package name disambiguates) but loses information in TS.

### H7. `ScdType_ScdType` enum uses the cryptic acronym SCD
- **Locations:** `model.ts:268` (`ScdType_ScdType`), `index.ts:27`.
- **Category:** 5 (cryptic abbreviation).
- **Suggestion:** Rename to `SlowlyChangingDimensionType` since "SCD" is jargon for "Slowly Changing Dimension" — the values themselves are `SCD_TYPE_1` / `SCD_TYPE_2` (Kimball-style dimensional modeling).
- **Rationale:** SCD is a dimensional-modelling acronym (slowly-changing dimensions, from Kimball's data-warehousing canon). A casual reader does not know that. The enum values then re-spell `SCD_TYPE_*` redundantly (`SCD_TYPE_1`, `SCD_TYPE_2`, `APPEND_ONLY`).

### H8. `client.delete()` collides with JS `delete` keyword
- **Location:** `client.ts:208`.
- **Category:** 10 (reserved-word collision).
- **Suggestion:** Rename to `deletePipeline()`. Alternatively, `remove()`.
- **Rationale:** `delete` is a JS reserved keyword. While methods can be named `delete` since ES5, every IDE highlights it and parsers in some contexts choke.

### H9. `EventLevel.METRICS` — value on a "severity level" enum that is not a severity
- **Location:** `model.ts:56`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Either move `METRICS` to a separate `EventCategory` enum or rename the enum to `EventKind`. The JSDoc says "The severity level of the event" — but `METRICS` is a category, not a severity.
- **Rationale:** Filtering `where level='ERROR'` makes sense; `where level='METRICS'` is "where this event is a metric measurement, regardless of severity." Mixing the two leads to user mistakes.

### H10. `Notifications` (plural type, singular plural-prefixed) — a single-notification spec named in plural
- **Locations:** `model.ts:1457`, plus all `notifications?: Notifications[]` field declarations.
- **Category:** 9 (singular/plural mismatch).
- **Suggestion:** Rename the type to `NotificationRule` (singular).
- **Rationale:** `notifications: Notifications[]` reads as "a list of lists of notifications". The type holds one `{emailRecipients, alerts}` pair — singular by definition.

---

## Medium

### M1. `MaturityLevel.DEPRECATED` reads as a deprecation tag, not a maturity level
- **Location:** `model.ts:84-88`.
- **Category:** 6 (misleading).
- **Suggestion:** Rename the enum to `EventStability`.
- **Rationale:** `DEPRECATED` is widely used as a TS/JSDoc tag for "do not use." Reading `maturityLevel: DEPRECATED` mis-suggests the EVENT is deprecated, not the schema field.

### M2. `EventLogSpec` — `Spec` suffix on a small config object
- **Location:** `model.ts:750`.
- **Category:** 8 (redundant suffix).
- **Suggestion:** `EventLogConfig` or just `EventLog`. The `Spec` suffix is overused (`PipelineSpec`, `RewindSpec`, `RewindDatasetSpec`, `EventLogSpec`, `IngestionPipelineDefinition_SchemaSpec`, `_TableSpec`, `_ReportSpec`).
- **Rationale:** TS doesn't need `Spec` as a discriminator; the type's role is clear from its field name.

### M3. `Filters` — pluralized name for a 2-field struct
- **Location:** `model.ts:828-833`.
- **Category:** 9 (singular/plural mismatch), 1 (vague).
- **Suggestion:** Rename to `PathFilter` (singular). The shape is `{include?: string[]; exclude?: string[]}`.

### M4. `PathPattern` — generic type name for a single-glob struct
- **Location:** `model.ts:1594-1597`.
- **Category:** 6 (misleading).
- **Suggestion:** Rename the type to `GlobPattern`. The type wraps a single glob string, and `PathPattern` is easily confused with the broader path-filter shapes in the package.

### M5. `Origin` — too generic for "event source metadata"
- **Location:** `model.ts:1488`.
- **Category:** 1 (vague).
- **Suggestion:** Rename to `EventOrigin` or `EventSource`.
- **Rationale:** "Origin" is also a DOM type (`Window.origin`) and a CORS concept. Type contains many fields covering everything from cloud region to flow IDs.

### M6. `IngestionPipelineDefinition.netsuiteJarPath` — vendor-specific field on a generic type
- **Location:** `model.ts:1017`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Move to `NetsuiteOptions` connector-specific type.
- **Rationale:** A generic ingestion-definition type carrying a `netsuiteJarPath` field implies every other connector is incomplete. JSDoc literally says "Netsuite only configuration." Belongs in a per-connector options struct.

### M7. `Sequencing` — singular noun for a 2-field record describing one event's position
- **Location:** `model.ts:2328`.
- **Category:** 1 (vague).
- **Suggestion:** `EventSequence` or `EventPosition`. "Sequencing" is the action of putting in order, not the position itself.

### M8. `DataPlaneId` reads like a string but is actually `{instance, seqNo}`
- **Location:** `model.ts:591`.
- **Category:** 6 (misleading: name implies a scalar ID, but the type is a compound).
- **Suggestion:** Rename to `DataPlaneSequence` or `DataPlaneCoordinate`. The actual ID is `{instance, seqNo}` — a coordinate, not an identifier.
- **Rationale:** Every other `*Id` type in the SDK is a string. Reading `dataPlaneId: DataPlaneId` then accessing `dataPlaneId.seqNo` is jarring.

---

## Low

### L1. `PipelinesS3StorageInfo.enableEncryption` boolean alongside `encryptionType` string — coupled fields not enforced by type system
- **Locations:** `model.ts:2236`, `model.ts:2241`.
- **Category:** 16.
- **Suggestion:** Use a discriminated union: `encryption?: {kind: 'none'} | {kind: 'sse-s3'} | {kind: 'sse-kms'; key: string}`.

### L2. `RewindDatasetSpec.resetCheckpoints: boolean` and `cascade: boolean` — coupled flags with no type-level link
- **Locations:** `model.ts:2304` (`cascade`), `model.ts:2306` (`resetCheckpoints`).
- **Category:** 16.
- **Suggestion:** Group into an `options` substruct or document interactions in JSDoc.
