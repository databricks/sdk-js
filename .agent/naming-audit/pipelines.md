# Naming Audit: pipelines

**Path:** `packages/pipelines/src/v2/`
**Versions audited:** v2
**Inferred domain:** Lakeflow Declarative Pipelines (formerly Delta Live Tables / DLT) — create / clone / get / list / edit / delete pipelines, start / stop / list / get pipeline **updates** ("a run of a pipeline"), and a vast catalog of ingestion connectors (Salesforce, Workday, Outlook, Kafka, RabbitMQ, TikTok Ads, ServiceNow, Confluence, Jira, ...). The API was renamed multiple times (DLT → Spark Declarative Pipelines → Lakeflow Declarative Pipelines); branding leakage and acronyms are abundant.

**Files audited:**
- `src/v2/model.ts` (~5,500 lines) — 26 enums, ~116 interfaces, marshal/unmarshal schemas.
- `src/v2/client.ts` (673 lines) — 12 RPC methods + 2 paginators + `StopWaiter`.
- `src/v2/utils.ts` (150 lines) — generic HTTP/marshal helpers (no domain names).
- `src/v2/index.ts` (154 lines) — re-exports.

## Summary

| Severity     | Count | Notes                                                                                       |
| ------------ | ----- | ------------------------------------------------------------------------------------------- |
| High         | 12    | Verb/noun overloading (`Update`), DLT-era rebrand leakage, identifier collisions.           |
| Medium       | 13    | Vague names, acronym casing, generic IDs, misleading enum values.                           |
| Low          | 8     | Mild verbosity, plural mismatches, stylistic inconsistencies.                               |
| Observations | 3     | Patterns spanning the whole file (branding history, proto-architectural leakage).           |
| **Total**    | **36** | |

Issues are catalogued below by severity, then by file/line. Throughout this document I use **"Update" (proper noun)** to refer to the DLT/Lakeflow concept of a pipeline run, since that overload is the most pervasive and most confusing naming choice in the package.

---

## High

### H1. `Update` is a verb in every other Databricks SDK but the noun "pipeline run" here — pervasive overloading
- **Locations:** `model.ts:168` (`UpdateCause`), `model.ts:186` (`UpdateState`), `model.ts:888` (`GetUpdateRequest`), `model.ts:896` (`GetUpdateRequest_Response`), `model.ts:1407` (`ListUpdatesRequest`), `model.ts:1419` (`ListUpdatesRequest_Response`), `model.ts:2400` (`StartUpdateRequest`), `model.ts:2445` (`StartUpdateRequest_Response`), `model.ts:2533` (`UpdateInfo`), `model.ts:2577` (`UpdateStateInfo`), `client.ts:386` (`getUpdate`), `client.ts:477` (`listUpdates`), `client.ts:520` (`start`), plus every `updateId` field.
- **Category:** 1 (vague), 6 (misleading — rebrand history), 13 (verb/noun inconsistency), 17 (inconsistent action verbs).
- **Suggestion:** Rename `Update` → `PipelineRun` everywhere in the public TS surface. `StartUpdateRequest` → `StartRunRequest` (or `RunPipelineRequest`), `GetUpdateRequest` → `GetRunRequest`, `ListUpdatesRequest` → `ListRunsRequest`, `UpdateInfo` → `PipelineRun`, `UpdateState` → `PipelineRunState`, `UpdateCause` → `RunStartCause`, `UpdateStateInfo` → `RunSummary`, `updateId` → `runId`. The HTTP wire still uses `/updates/`, so the schema layer maps the rename — this is fine.
- **Rationale:** "Update" is the standard verb for `PUT`/`PATCH` (and `EditPipelineRequest` already takes that slot — the client method is `edit()`, but the HTTP verb is `PUT`). Every JS/TS developer expects `update()` to mean "mutate". The DLT product feature historically named the unit-of-execution "Update" but Databricks itself renamed the concept to **"Pipeline run"** when the product became Lakeflow Declarative Pipelines. The SDK is on the wrong side of the rebrand. The same problem ripples through `start()` (the method that "starts an update"), `getUpdate()`, and `listUpdates()`. This is the single most confusing name in the package.

### H2. `client.edit()` returns `EditPipelineRequest_Response` instead of `UpdatePipelineRequest_Response` — verb collision avoidance is leaking through
- **Locations:** `client.ts:260` (`edit`), `model.ts:633` (`EditPipelineRequest`), `model.ts:730` (`EditPipelineRequest_Response`).
- **Category:** 13 (verb-tense inconsistency: `Edit` vs `Update` vs `Modify`), 6 (misleading: HTTP verb is `PUT`).
- **Suggestion:** Rename `EditPipelineRequest` → `UpdatePipelineRequest` and the client method `edit()` → `update()`. Then rename the "pipeline run" concept per H1 to free up the `Update` token.
- **Rationale:** The package uses `Edit` only because the `Update` noun was burned by DLT history. Once H1 is applied, `edit()` should follow the standard `create()`/`update()`/`delete()` REST pattern used by every other SDK (`jobs`, `clusters`, `instancepools`, etc., all use `update()`).

### H3. `client.start()` is "start a pipeline update" — but it reads as "start a pipeline"
- **Location:** `client.ts:520`.
- **Category:** 6 (misleading), 17 (inconsistent action verbs).
- **Suggestion:** Rename `start(req: StartUpdateRequest)` → `run(req: RunPipelineRequest)` or `startRun(req: StartRunRequest)`. Pair with `stop(req: StopPipelineRequest)`.
- **Rationale:** Reading `client.start({pipelineId})` you assume it "starts the pipeline". It actually queues a new **run** (Update). The asymmetry with `stop(req: StopPipelineRequest)` (which DOES stop the pipeline) is silent and dangerous. `run` is the verb Databricks uses in marketing copy and now in the UI; `start` is the legacy name.

### H4. `PipelinesJobRunAs` references `Job` from a `Pipelines` package
- **Location:** `model.ts:2180`.
- **Category:** 6 (misleading — `Job` is a separate Databricks product), 14 (Go-style).
- **Suggestion:** Rename to `RunAs` or `PipelineRunAs`. Drop the `Job` token entirely — this type is not used by `@databricks/sdk-jobs`.
- **Rationale:** `Job` belongs to the `jobs` API. A user reading `runAs: PipelinesJobRunAs` cannot tell whether the pipeline is associated with a job or just borrows the shape. The proto comment ("Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as.") confirms this is a pipeline-only concept.

### H5. `Pipeline` is never used as a type name — the central domain entity is missing
- **Locations:** N/A — the package has `PipelineSpec`, `PipelineStateInfo`, `GetPipelineRequest_Response`, `BaseJob`-style scattering, but no plain `Pipeline` type.
- **Category:** 1 (vague/generic alternative missing), 6 (misleading).
- **Suggestion:** Add an exported `Pipeline` type that consolidates the runtime view (`GetPipelineRequest_Response` is the closest). Alternatively rename `GetPipelineRequest_Response` → `Pipeline`. Keep `PipelineSpec` as the write-form (the "settings" sub-object).
- **Rationale:** A user installs `@databricks/sdk-pipelines` and expects to `import {Pipeline} from '@databricks/sdk-pipelines'`. Instead they have to discover `GetPipelineRequest_Response`, `PipelineSpec`, `PipelineStateInfo`, or `BaseRun`-style scatter. The Go SDK does the same thing — but Go has package-namespace `pipelines.Pipeline`, while TS uses bare identifiers and benefits from a primary name.

### H6. `EditPipelineRequest` / `CreatePipelineRequest` / `ClonePipelineRequest` / `PipelineSpec` all duplicate 25 of the same fields
- **Locations:** `model.ts:336` (`ClonePipelineRequest`), `model.ts:479` (`CreatePipelineRequest`), `model.ts:633` (`EditPipelineRequest`), `model.ts:1816` (`PipelineSpec`).
- **Category:** 12 (duplicate concepts).
- **Suggestion:** Extract `PipelineSpec` as the shared base and have `CreatePipelineRequest`, `EditPipelineRequest`, `ClonePipelineRequest` use TS intersection: `type CreatePipelineRequest = PipelineSpec & {allowDuplicateNames?: boolean; dryRun?: boolean; ...}`.
- **Rationale:** Each of the four interfaces redeclares `id`, `name`, `storage`, `configuration`, `clusters`, `libraries`, `ingestionDefinition`, `gatewayDefinition`, `trigger`, `target`, `schema`, `filters`, `continuous`, `development`, `photon`, `edition`, `channel`, `catalog`, `notifications`, `serverless`, `deployment`, `restartWindow`, `budgetPolicyId`, `tags`, `eventLog`, `rootPath`, `environment`, `usagePolicyId`. Drift between the four is silent.

### H7. `client.events()` method name is too generic
- **Location:** `client.ts:292`.
- **Category:** 1 (vague), 17 (inconsistent action verbs — should be `listEvents`).
- **Suggestion:** Rename to `listEvents()` for symmetry with `listUpdates()`, `list()`.
- **Rationale:** Bare `events()` reads as a property accessor or event emitter, not an HTTP `GET`. Every other paginating method uses `list*` (`list`, `listUpdates`).

### H8. `client.list()` — too generic for the package's bare-`list` slot
- **Location:** `client.ts:414`.
- **Category:** 1 (vague), 17 (inconsistent verbs).
- **Suggestion:** Rename to `listPipelines()` to match the request type `ListPipelinesRequest` and to disambiguate from `listUpdates`/`listEvents`.
- **Rationale:** `client.list(req)` requires the user to remember `list` of *what*. Adjacent methods are `listUpdates`, `events` (sic), and the request type is already `ListPipelinesRequest`. Bare `list` is a Go-SDK convention (where the package name disambiguates) but loses information in TS.

### H9. `ScdType_ScdType` enum uses the cryptic acronym SCD
- **Locations:** `model.ts:268` (`ScdType_ScdType`), `index.ts:27`.
- **Category:** 5 (cryptic abbreviation).
- **Suggestion:** Rename to `SlowlyChangingDimensionType` since "SCD" is jargon for "Slowly Changing Dimension" — the values themselves are `SCD_TYPE_1` / `SCD_TYPE_2` (Kimball-style dimensional modeling).
- **Rationale:** SCD is a dimensional-modelling acronym (slowly-changing dimensions, from Kimball's data-warehousing canon). A casual reader does not know that. The enum values then re-spell `SCD_TYPE_*` redundantly (`SCD_TYPE_1`, `SCD_TYPE_2`, `APPEND_ONLY`).

### H10. `client.delete()` collides with JS `delete` keyword
- **Location:** `client.ts:220`.
- **Category:** 10 (reserved-word collision).
- **Suggestion:** Rename to `deletePipeline()`. Alternatively, `remove()`.
- **Rationale:** `delete` is a JS reserved keyword. While methods can be named `delete` since ES5, every IDE highlights it and parsers in some contexts choke.

### H11. `EventLevel.METRICS` — value on a "severity level" enum that is not a severity
- **Location:** `model.ts:56`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Either move `METRICS` to a separate `EventCategory` enum or rename the enum to `EventKind`. The JSDoc says "The severity level of the event" — but `METRICS` is a category, not a severity.
- **Rationale:** Filtering `where level='ERROR'` makes sense; `where level='METRICS'` is "where this event is a metric measurement, regardless of severity." Mixing the two leads to user mistakes.

### H12. `Notifications` (plural type, singular plural-prefixed) — a single-notification spec named in plural
- **Locations:** `model.ts:1464`, plus all `notifications?: Notifications[]` field declarations.
- **Category:** 9 (singular/plural mismatch).
- **Suggestion:** Rename to `NotificationRule` (singular). The field becomes `notificationRules?: NotificationRule[]`.
- **Rationale:** `notifications: Notifications[]` reads as "a list of lists of notifications". The type holds one `{emailRecipients, alerts}` pair — singular by definition.

---

## Medium

### M1. `TikTokAdsOptions_TikTokDataLevel` enum values split `TikTok` across an underscore (`TIK_TOK_*`)
- **Location:** `model.ts:291`.
- **Category:** 3 (acronym/word casing inconsistency).
- **Suggestion:** Use `TIKTOK_*` (single token) in enum values to match the brand spelling and the parent type name (`TikTok`).
- **Rationale:** The brand is "TikTok" (one word). Splitting to `TIK_TOK` in `SCREAMING_SNAKE_CASE` reads as two separate tokens and diverges from the parent type's CamelCase.

### M2. `MaturityLevel.DEPRECATED` reads as a deprecation tag, not a maturity level
- **Location:** `model.ts:84-88`.
- **Category:** 6 (misleading).
- **Suggestion:** Rename enum to `EventStability` or rename value `DEPRECATED` → `LEGACY`.
- **Rationale:** `DEPRECATED` is widely used as a TS/JSDoc tag for "do not use." Reading `maturityLevel: DEPRECATED` mis-suggests the EVENT is deprecated, not the schema field.

### M3. `EventLogSpec` — `Spec` suffix on a small config object
- **Location:** `model.ts:752`.
- **Category:** 8 (redundant suffix).
- **Suggestion:** `EventLogConfig` or just `EventLog`. The `Spec` suffix is overused (`PipelineSpec`, `RewindSpec`, `RewindDatasetSpec`, `EventLogSpec`, `IngestionPipelineDefinition_SchemaSpec`, `_TableSpec`, `_ReportSpec`).
- **Rationale:** TS doesn't need `Spec` as a discriminator; the type's role is clear from its field name.

### M4. `Filters` — pluralized name for a 2-field struct
- **Location:** `model.ts:830-835`.
- **Category:** 9 (singular/plural mismatch), 1 (vague).
- **Suggestion:** Rename to `PathFilter` (singular). The shape is `{include?: string[]; exclude?: string[]}`.

### M5. `PathPattern` field is `include: string` (singular, no array) but it represents a glob
- **Location:** `model.ts:1601-1604`.
- **Category:** 15 (generic field names), 6 (misleading).
- **Suggestion:** Rename type to `GlobPattern` and field to `pattern`. JSDoc says "The source code to include for pipelines" — `pattern` describes the *what*, `include` describes the *intent*.

### M6. `Origin` — too generic for "event source metadata"
- **Location:** `model.ts:1495`.
- **Category:** 1 (vague).
- **Suggestion:** Rename to `EventOrigin` or `EventSource`.
- **Rationale:** "Origin" is also a DOM type (`Window.origin`) and a CORS concept. Type contains many fields covering everything from cloud region to flow IDs.

### M7. `IngestionPipelineDefinition.netsuiteJarPath` — vendor-specific field on a generic type
- **Location:** `model.ts:1021`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Move to `NetsuiteOptions` connector-specific type.
- **Rationale:** A generic ingestion-definition type carrying a `netsuiteJarPath` field implies every other connector is incomplete. JSDoc literally says "Netsuite only configuration." Belongs in a per-connector options struct.

### M8. `IngestionSourceType.FOREIGN_CATALOG` — too generic, no source indicator
- **Location:** `model.ts:80`.
- **Category:** 1 (vague).
- **Suggestion:** `UC_FOREIGN_CATALOG` or document inline.
- **Rationale:** "Foreign Catalog" is a Unity Catalog concept; without context this looks like a country-of-origin enum value.

### M9. `Origin.ucResourceId` mixes acronym casing
- **Location:** `model.ts:1528`.
- **Category:** 3 (acronym casing inconsistency).
- **Suggestion:** Either `ucResourceId` (current) or `UCResourceId` — the Google TS style guide says treat acronyms as words, so `ucResourceId` is correct. But sibling fields use the same lowercase pattern (`workspaceId`, `pipelineId`), so this one is internally consistent. Flagged because it could be `unityCatalogResourceId` for clarity.

### M10. `eventType?: string` on `PipelineEvent` — string-typed enum
- **Location:** `model.ts:1765`.
- **Category:** 16 (field contradicts type domain).
- **Suggestion:** Define an `EventType` enum (or union of string literals) and type the field with it. Right now consumers have no IDE help.
- **Rationale:** JSDoc says "The event type. Should always correspond to the details." The Go SDK has the same field as string (porting fidelity), but TS could improve.

### M11. `Sequencing` — singular noun for a 2-field record describing one event's position
- **Location:** `model.ts:2323`.
- **Category:** 1 (vague).
- **Suggestion:** `EventSequence` or `EventPosition`. "Sequencing" is the action of putting in order, not the position itself.

### M12. `EditPipelineRequest.expectedLastModified: number` — wire is millis since epoch, but no JSDoc
- **Location:** `model.ts:643`.
- **Category:** 16 (field contradicts type domain), 19 (underspecified ID).
- **Suggestion:** Either type as `Date | number` or document "milliseconds since Unix epoch" in JSDoc.

### M13. `DataPlaneId` reads like a string but is actually `{instance, seqNo}`
- **Location:** `model.ts:593`.
- **Category:** 6 (misleading: name implies a scalar ID, but the type is a compound).
- **Suggestion:** Rename to `DataPlaneSequence` or `DataPlaneCoordinate`. The actual ID is `{instance, seqNo}` — a coordinate, not an identifier.
- **Rationale:** Every other `*Id` type in the SDK is a string. Reading `dataPlaneId: DataPlaneId` then accessing `dataPlaneId.seqNo` is jarring.

---

## Low

### L1. `PipelinesS3StorageInfo.kmsKey` — uppercase acronym treatment is inconsistent
- **Location:** `model.ts:2238`.
- **Category:** 3.
- **Suggestion:** `kmsKey` is the correct casing per Google TS style. Just flagging for cross-check with other AWS fields in the file.

### L2. `PipelinesS3StorageInfo.enableEncryption` boolean alongside `encryptionType` string — coupled fields not enforced by type system
- **Locations:** `model.ts:2231`, `model.ts:2236`.
- **Category:** 16.
- **Suggestion:** Use a discriminated union: `encryption?: {kind: 'none'} | {kind: 'sse-s3'} | {kind: 'sse-kms'; key: string}`.

### L3. `PipelineCluster.label` — string typed, expected values "default" / "maintenance"
- **Location:** `model.ts:1608`.
- **Category:** 16.
- **Suggestion:** Make this an enum `ClusterLabel.{Default, Maintenance}`.

### L4. `AutoFullRefreshPolicy.minIntervalHours` JSDoc says "(Optional, Mutable)" — proto-style modifier tag in user-visible JSDoc
- **Location:** `model.ts:333`.
- **Category:** Generator artifact leakage.
- **Suggestion:** Express via TS optionality (`?:`) instead of repeating "Optional" in JSDoc.

### L5. `RewindDatasetSpec.resetCheckpoints: boolean` and `cascade: boolean` — coupled flags with no type-level link
- **Locations:** `model.ts:2299` (`cascade`), `model.ts:2301` (`resetCheckpoints`).
- **Category:** 16.
- **Suggestion:** Group into an `options` substruct or document interactions in JSDoc.

### L6. `KafkaOptions.startingOffset: string` — typed string but documented as enum
- **Location:** `model.ts:1294`.
- **Category:** 16.
- **Suggestion:** Define `KafkaStartingOffset.{Latest, Earliest}` enum.

### L7. `MetaMarketingOptions.level: string` — typed string but documented as enum
- **Location:** `model.ts:1436`.
- **Category:** 16.
- **Suggestion:** Define `MetaAggregationLevel.{Account, Ad, AdSet, Campaign}` enum.

### L8. `MetaMarketingOptions.actionReportTime: string` — string enum
- **Location:** `model.ts:1442`.
- **Category:** 16.
- **Suggestion:** Define enum.

---

## Observations

### O1. `Notifications.alerts: string[]` is a hand-rolled enum of `on-update-success`, `on-update-failure`, `on-update-fatal-failure`, `on-flow-failure`
- **Location:** `model.ts:1476`.
- **Category:** 16.
- **Suggestion:** Define `AlertCondition` enum. Currently typed `string[]` with values listed only in JSDoc.

### O2. `ConnectorOptions` JSDoc opens with "Wrapper message for source-specific options" — proto-architectural terminology leak
- **Location:** `model.ts:456`.
- **Why:** "Wrapper message" is a protobuf concept (the proto2/proto3 well-known wrapper types: `BoolValue`, `StringValue`, etc., plus the generic "wrapper message" pattern used to box discriminated unions). It is visible in user-facing JSDoc on a public interface.
- **Category:** Generator artifact leakage / proto-architectural leak.
- **Suggested:** Rewrite JSDoc as "Source-specific options for ingestion connectors. Exactly one option must be specified for the connector type." Drop "Wrapper message".
- **Rationale:** TypeScript developers do not know what a "wrapper message" is — the term reveals the proto IDL underneath. The shape is just a discriminated union over connector option types; describe it in TS terms.

### O3. `Internal` proto-field tag leaks into JSDoc on two public fields
- **Locations:** `model.ts:959` (`IngestionGatewayPipelineDefinition.connectionParameters` — "Optional, Internal. Parameters required to establish an initial connection with the source."), `model.ts:1295` (`KafkaOptions.maxOffsetsPerTrigger` — "Internal option to control the maximum number of offsets to process per trigger.").
- **Why:** `Internal` is a proto-level annotation (`google.api.field_visibility = INTERNAL` or similar) indicating the field is not part of the public API surface. If these fields are truly internal, they should be stripped from the public SDK at generation time; if they are public, the "Internal" label should not appear in user-visible documentation.
- **Category:** Generator artifact leakage / proto-architectural leak.
- **Suggested:** Either remove these fields from the public SDK (preferred — they are marked internal) or drop the "Internal" qualifier from JSDoc and document the actual user-facing semantics.
- **Rationale:** Users reading JSDoc see `Internal option to control...` and reasonably wonder why an internal field is in the public SDK. This is a generator-template concern (same pattern likely shows up in other packages) — surface in the cross-package summary.

---
