# Naming Audit: pipelines

**Path:** `packages/pipelines/src/v2/`
**Versions audited:** v2
**Inferred domain:** Lakeflow Declarative Pipelines (formerly Delta Live Tables / DLT) — create / clone / get / list / edit / delete pipelines, start / stop / list / get pipeline **updates** ("a run of a pipeline"), and a vast catalog of ingestion connectors (Salesforce, Workday, Outlook, Kafka, RabbitMQ, TikTok Ads, ServiceNow, Confluence, Jira, ...). The API was renamed multiple times (DLT → Spark Declarative Pipelines → Lakeflow Declarative Pipelines); branding leakage and acronyms are abundant.

**Files audited:**
- `src/v2/model.ts` (~5,400 lines) — 26 enums, ~116 interfaces, marshal/unmarshal schemas.
- `src/v2/client.ts` (632 lines) — 12 RPC methods + 2 paginators + `StopWaiter`.
- `src/v2/utils.ts` (150 lines) — generic HTTP/marshal helpers (no domain names).
- `src/v2/index.ts` (151 lines) — re-exports.

## Summary

| Severity     | Count | Notes                                                                                       |
| ------------ | ----- | ------------------------------------------------------------------------------------------- |
| High         | 17    | Verb/noun overloading (`Update`), DLT-era rebrand leakage, identifier collisions, plural `Pipelines` prefix. |
| Medium       | 19    | Vague names, acronym casing, generic IDs, misleading enum values.                           |
| Low          | 20    | Mild verbosity, plural mismatches, stylistic inconsistencies.                               |
| Observations | 8     | Patterns spanning the whole file (branding history, plural/singular split, proto-architectural leakage). |
| **Total**    | **64** | |

Issues are catalogued below by severity, then by file/line. Throughout this document I use **"Update" (proper noun)** to refer to the DLT/Lakeflow concept of a pipeline run, since that overload is the most pervasive and most confusing naming choice in the package.

---

## High

### H1. `Update` is a verb in every other Databricks SDK but the noun "pipeline run" here — pervasive overloading
- **Locations:** `model.ts:168` (`UpdateCause`), `model.ts:186` (`UpdateState`), `model.ts:855` (`GetUpdateRequest`), `model.ts:863` (`GetUpdateRequest_Response`), `model.ts:1374` (`ListUpdatesRequest`), `model.ts:1386` (`ListUpdatesRequest_Response`), `model.ts:2367` (`StartUpdateRequest`), `model.ts:2412` (`StartUpdateRequest_Response`), `model.ts:2500` (`UpdateInfo`), `model.ts:2544` (`UpdateStateInfo`), `client.ts:360` (`getUpdate`), `client.ts:445` (`listUpdates`), `client.ts:485` (`start`), plus every `updateId` field.
- **Category:** 1 (vague), 6 (misleading — rebrand history), 13 (verb/noun inconsistency), 17 (inconsistent action verbs).
- **Suggestion:** Rename `Update` → `PipelineRun` everywhere in the public TS surface. `StartUpdateRequest` → `StartRunRequest` (or `RunPipelineRequest`), `GetUpdateRequest` → `GetRunRequest`, `ListUpdatesRequest` → `ListRunsRequest`, `UpdateInfo` → `PipelineRun`, `UpdateState` → `PipelineRunState`, `UpdateCause` → `RunStartCause`, `UpdateStateInfo` → `RunSummary`, `updateId` → `runId`. The HTTP wire still uses `/updates/`, so the schema layer maps the rename — this is fine.
- **Rationale:** "Update" is the standard verb for `PUT`/`PATCH` (and `EditPipelineRequest` already takes that slot — the client method is `edit()`, but the HTTP verb is `PUT`). Every JS/TS developer expects `update()` to mean "mutate". The DLT product feature historically named the unit-of-execution "Update" but Databricks itself renamed the concept to **"Pipeline run"** when the product became Lakeflow Declarative Pipelines. The SDK is on the wrong side of the rebrand. The same problem ripples through `start()` (the method that "starts an update"), `getUpdate()`, and `listUpdates()`. This is the single most confusing name in the package.

### H2. `client.edit()` returns `EditPipelineRequest_Response` instead of `UpdatePipelineRequest_Response` — verb collision avoidance is leaking through
- **Locations:** `client.ts:243` (`edit`), `model.ts:622` (`EditPipelineRequest`), `model.ts:708` (`EditPipelineRequest_Response`).
- **Category:** 13 (verb-tense inconsistency: `Edit` vs `Update` vs `Modify`), 6 (misleading: HTTP verb is `PUT`).
- **Suggestion:** Rename `EditPipelineRequest` → `UpdatePipelineRequest` and the client method `edit()` → `update()`. Then rename the "pipeline run" concept per H1 to free up the `Update` token.
- **Rationale:** The package uses `Edit` only because the `Update` noun was burned by DLT history. Once H1 is applied, `edit()` should follow the standard `create()`/`update()`/`delete()` REST pattern used by every other SDK (`jobs`, `clusters`, `instancepools`, etc., all use `update()`).

### H3. `client.start()` is "start a pipeline update" — but it reads as "start a pipeline"
- **Location:** `client.ts:485`.
- **Category:** 6 (misleading), 17 (inconsistent action verbs).
- **Suggestion:** Rename `start(req: StartUpdateRequest)` → `run(req: RunPipelineRequest)` or `startRun(req: StartRunRequest)`. Pair with `stop(req: StopPipelineRequest)`.
- **Rationale:** Reading `client.start({pipelineId})` you assume it "starts the pipeline". It actually queues a new **run** (Update). The asymmetry with `stop(req: StopPipelineRequest)` (which DOES stop the pipeline) is silent and dangerous. `run` is the verb Databricks uses in marketing copy and now in the UI; `start` is the legacy name.

### H4. `Pipelines*` prefix (plural) on a single-pipeline package — proto-package leakage
- **Locations:** `model.ts:117` (`PipelinesAwsAvailability`), `model.ts:130` (`PipelinesAzureAvailability`), `model.ts:146` (`PipelinesEbsVolumeType`), `model.ts:154` (`PipelinesGcpAvailability`), `model.ts:1897` (`PipelinesAutoScale`), `model.ts:1916` (`PipelinesAwsAttributes`), `model.ts:2005` (`PipelinesAzureAttributes`), `model.ts:2032` (`PipelinesClusterLogConf`), `model.ts:2046` (`PipelinesDbfsStorageInfo`), `model.ts:2055` (`PipelinesEnvironment`), `model.ts:2078` (`PipelinesGcpAttributes`), `model.ts:2119` (`PipelinesInitScriptInfo`), `model.ts:2147` (`PipelinesJobRunAs`), `model.ts:2162` (`PipelinesMavenLibrary`), `model.ts:2180` (`PipelinesS3StorageInfo`).
- **Category:** 8 (redundant suffix/prefix), 9 (singular/plural mismatch), 14 (Go/Java-style names).
- **Suggestion:** Drop the `Pipelines` prefix. The package itself is `@databricks/sdk-pipelines` and the import disambiguates from `@databricks/sdk-clusters`. The types become `AwsAvailability`, `AwsAttributes`, `AutoScale`, `ClusterLogConf`, `DbfsStorageInfo`, `Environment`, `GcpAttributes`, `InitScriptInfo`, `JobRunAs`, `MavenLibrary`, `S3StorageInfo`. If global collision is feared, use `PipelineCluster`-style singular: `PipelineEnvironment`, `PipelineAwsAttributes`, etc.
- **Rationale:** The proto package is `pipelines.proto`, so the generator prefixed every type with `Pipelines`. A consumer types `new PipelinesJobRunAs(...)` and the plural reads as "RunAs for many jobs in many pipelines" — neither is true. `PipelineCluster` (singular, `model.ts:1573`) shows the convention the package would have if generated consistently.

### H5. `PipelinesJobRunAs` references `Job` from a `Pipelines` package
- **Location:** `model.ts:2147`.
- **Category:** 6 (misleading — `Job` is a separate Databricks product), 14 (Go-style).
- **Suggestion:** Rename to `RunAs` or `PipelineRunAs`. Drop the `Job` token entirely — this type is not used by `@databricks/sdk-jobs`.
- **Rationale:** `Job` belongs to the `jobs` API. A user reading `runAs: PipelinesJobRunAs` cannot tell whether the pipeline is associated with a job or just borrows the shape. The proto comment ("Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as.") confirms this is a pipeline-only concept.

### H6. `Pipeline` is never used as a type name — the central domain entity is missing
- **Locations:** N/A — the package has `PipelineSpec`, `PipelineStateInfo`, `GetPipelineRequest_Response`, `BaseJob`-style scattering, but no plain `Pipeline` type.
- **Category:** 1 (vague/generic alternative missing), 6 (misleading).
- **Suggestion:** Add an exported `Pipeline` type that consolidates the runtime view (`GetPipelineRequest_Response` is the closest). Alternatively rename `GetPipelineRequest_Response` → `Pipeline`. Keep `PipelineSpec` as the write-form (the "settings" sub-object).
- **Rationale:** A user installs `@databricks/sdk-pipelines` and expects to `import {Pipeline} from '@databricks/sdk-pipelines'`. Instead they have to discover `GetPipelineRequest_Response`, `PipelineSpec`, `PipelineStateInfo`, or `BaseRun`-style scatter. The Go SDK does the same thing — but Go has package-namespace `pipelines.Pipeline`, while TS uses bare identifiers and benefits from a primary name.

### H7. `EditPipelineRequest` / `CreatePipelineRequest` / `ClonePipelineRequest` / `PipelineSpec` all duplicate 25 of the same fields
- **Locations:** `model.ts:336` (`ClonePipelineRequest`), `model.ts:479` (`CreatePipelineRequest`), `model.ts:622` (`EditPipelineRequest`), `model.ts:1783` (`PipelineSpec`).
- **Category:** 12 (duplicate concepts).
- **Suggestion:** Extract `PipelineSpec` as the shared base and have `CreatePipelineRequest`, `EditPipelineRequest`, `ClonePipelineRequest` use TS intersection: `type CreatePipelineRequest = PipelineSpec & {allowDuplicateNames?: boolean; dryRun?: boolean; ...}`.
- **Rationale:** Each of the four interfaces redeclares `id`, `name`, `storage`, `configuration`, `clusters`, `libraries`, `ingestionDefinition`, `gatewayDefinition`, `trigger`, `target`, `schema`, `filters`, `continuous`, `development`, `photon`, `edition`, `channel`, `catalog`, `notifications`, `serverless`, `deployment`, `restartWindow`, `budgetPolicyId`, `tags`, `eventLog`, `rootPath`, `environment`, `usagePolicyId`. Drift between the four is silent.

### H8. `Update` field names on `Origin` reference the "pipeline run" sense of Update — silent overloading
- **Locations:** `model.ts:1476` (`Origin.updateId`), `model.ts:2504` (`UpdateInfo.updateId`), `model.ts:2545` (`UpdateStateInfo.updateId`).
- **Category:** 19 (underspecified IDs), 1 (vague).
- **Suggestion:** Rename `updateId` → `runId` (paired with H1). Document that the wire JSON key is `update_id` for compatibility.
- **Rationale:** A field named `updateId` on `Origin` (event source) leaves "update of what?" unanswered. Users wonder if it refers to the last-modification timestamp.

### H9. `client.events()` method name is too generic
- **Location:** `client.ts:272`.
- **Category:** 1 (vague), 17 (inconsistent action verbs — should be `listEvents`).
- **Suggestion:** Rename to `listEvents()` for symmetry with `listUpdates()`, `list()`.
- **Rationale:** Bare `events()` reads as a property accessor or event emitter, not an HTTP `GET`. Every other paginating method uses `list*` (`list`, `listUpdates`).

### H10. `client.list()` — too generic for the package's bare-`list` slot
- **Location:** `client.ts:385`.
- **Category:** 1 (vague), 17 (inconsistent verbs).
- **Suggestion:** Rename to `listPipelines()` to match the request type `ListPipelinesRequest` and to disambiguate from `listUpdates`/`listEvents`.
- **Rationale:** `client.list(req)` requires the user to remember `list` of *what*. Adjacent methods are `listUpdates`, `events` (sic), and the request type is already `ListPipelinesRequest`. Bare `list` is a Go-SDK convention (where the package name disambiguates) but loses information in TS.

### H11. `ScdType_ScdType` enum uses the cryptic acronym SCD
- **Locations:** `model.ts:268` (`ScdType_ScdType`), `index.ts:27`.
- **Category:** 5 (cryptic abbreviation).
- **Suggestion:** Rename to `SlowlyChangingDimensionType` since "SCD" is jargon for "Slowly Changing Dimension" — the values themselves are `SCD_TYPE_1` / `SCD_TYPE_2` (Kimball-style dimensional modeling).
- **Rationale:** SCD is a dimensional-modelling acronym (slowly-changing dimensions, from Kimball's data-warehousing canon). A casual reader does not know that. The enum values then re-spell `SCD_TYPE_*` redundantly (`SCD_TYPE_1`, `SCD_TYPE_2`, `APPEND_ONLY`).

### H12. `PipelineState_PipelineState.IDLE` is the terminal state — but the JSDoc says "Pipeline is stopped and is not processing data. Can be resumed by calling `run`"
- **Location:** `model.ts:262`.
- **Category:** 6 (misleading — references method `run` that does not exist; the method is `start`).
- **Suggestion:** Fix JSDoc to reference `start()`. After H3, both will line up at `run()`.
- **Rationale:** Currently the user reads "call `run`" and finds no `run()` method on `Client`.

### H13. `client.delete()` collides with JS `delete` keyword
- **Location:** `client.ts:206`.
- **Category:** 10 (reserved-word collision).
- **Suggestion:** Rename to `deletePipeline()`. Alternatively, `remove()`.
- **Rationale:** `delete` is a JS reserved keyword. While methods can be named `delete` since ES5, every IDE highlights it and parsers in some contexts choke.

### H14. `EventLevel.METRICS` — value on a "severity level" enum that is not a severity
- **Location:** `model.ts:56`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Either move `METRICS` to a separate `EventCategory` enum or rename the enum to `EventKind`. The JSDoc says "The severity level of the event" — but `METRICS` is a category, not a severity.
- **Rationale:** Filtering `where level='ERROR'` makes sense; `where level='METRICS'` is "where this event is a metric measurement, regardless of severity." Mixing the two leads to user mistakes.

### H15. `UpdateState.QUEUED` description references the wrong noun ("update") instead of "run"
- **Location:** `model.ts:187` ("Update is waiting for previous update to finish.").
- **Category:** 6 (misleading).
- **Suggestion:** Doc rewrite (English) after H1: "Run is waiting for previous run to finish."
- **Rationale:** Same as H1 — once `Update` is renamed to `Run`, every JSDoc that mentions "update" in this enum needs to follow.

### H16. `Notifications` (plural type, singular plural-prefixed) — a single-notification spec named in plural
- **Locations:** `model.ts:1431`, plus all `notifications?: Notifications[]` field declarations.
- **Category:** 9 (singular/plural mismatch).
- **Suggestion:** Rename to `NotificationRule` (singular). The field becomes `notificationRules?: NotificationRule[]`.
- **Rationale:** `notifications: Notifications[]` reads as "a list of lists of notifications". The type holds one `{emailRecipients, alerts}` pair — singular by definition.

### H17. `connectorOptions` field-name reuses parent-type token (`ConnectorOptions.connectorOptions`)
- **Locations:** `model.ts:457-477` (interface `ConnectorOptions`), `model.ts:1056`, `model.ts:1078`.
- **Category:** 20 (type-suffix tautology), 12 (duplicate naming).
- **Suggestion:** Rename the outer interface to `ConnectorOptions` and the inner discriminator to `options` (or `payload`). Then `connectorOptions: {payload: {...}}` reads cleanly.
- **Rationale:** Currently `ConnectorOptions.connectorOptions.googleAdsOptions` requires four nested identifiers all containing "options".

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
- **Location:** `model.ts:730`.
- **Category:** 8 (redundant suffix).
- **Suggestion:** `EventLogConfig` or just `EventLog`. The `Spec` suffix is overused (`PipelineSpec`, `RewindSpec`, `RewindDatasetSpec`, `EventLogSpec`, `IngestionPipelineDefinition_SchemaSpec`, `_TableSpec`, `_ReportSpec`).
- **Rationale:** TS doesn't need `Spec` as a discriminator; the type's role is clear from its field name.

### M4. `Filters` — pluralized name for a 2-field struct
- **Location:** `model.ts:808-813`.
- **Category:** 9 (singular/plural mismatch), 1 (vague).
- **Suggestion:** Rename to `PathFilter` (singular). The shape is `{include?: string[]; exclude?: string[]}`.

### M5. `PathPattern` field is `include: string` (singular, no array) but it represents a glob
- **Location:** `model.ts:1568-1571`.
- **Category:** 15 (generic field names), 6 (misleading).
- **Suggestion:** Rename type to `GlobPattern` and field to `pattern`. JSDoc says "The source code to include for pipelines" — `pattern` describes the *what*, `include` describes the *intent*.

### M6. `Origin` — too generic for "event source metadata"
- **Location:** `model.ts:1462`.
- **Category:** 1 (vague).
- **Suggestion:** Rename to `EventOrigin` or `EventSource`.
- **Rationale:** "Origin" is also a DOM type (`Window.origin`) and a CORS concept. Type contains many fields covering everything from cloud region to flow IDs.

### M7. `Origin.flowId` and `Origin.batchId` — IDs from unrelated subsystems
- **Locations:** `model.ts:1487` (`flowId`), `model.ts:1491` (`batchId`).
- **Category:** 19 (underspecified IDs).
- **Suggestion:** Document inline that `flowId` is "id of the streaming flow within the pipeline" and `batchId` is "id of a microbatch within a flow." Better: prefix as `streamingFlowId`, `microbatchId`.

### M8. `IngestionPipelineDefinition.netsuiteJarPath` — vendor-specific field on a generic type
- **Location:** `model.ts:988`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Move to `NetsuiteOptions` connector-specific type.
- **Rationale:** A generic ingestion-definition type carrying a `netsuiteJarPath` field implies every other connector is incomplete. JSDoc literally says "Netsuite only configuration." Belongs in a per-connector options struct.

### M9. `IngestionSourceType.WORKDAY_RAAS` — undefined acronym
- **Location:** `model.ts:67`.
- **Category:** 5 (cryptic abbreviation).
- **Suggestion:** Document inline that RaaS = "Reports as a Service" (Workday terminology). The acronym is non-obvious.

### M10. `IngestionSourceType.GA4_RAW_DATA` — vendor-numbered identifier
- **Location:** `model.ts:68`.
- **Category:** 5.
- **Suggestion:** Document inline that GA4 = "Google Analytics 4."

### M11. `IngestionSourceType.FOREIGN_CATALOG` — too generic, no source indicator
- **Location:** `model.ts:80`.
- **Category:** 1 (vague).
- **Suggestion:** `UC_FOREIGN_CATALOG` or document inline.
- **Rationale:** "Foreign Catalog" is a Unity Catalog concept; without context this looks like a country-of-origin enum value.

### M12. `Origin.ucResourceId` mixes acronym casing
- **Location:** `model.ts:1495`.
- **Category:** 3 (acronym casing inconsistency).
- **Suggestion:** Either `ucResourceId` (current) or `UCResourceId` — the Google TS style guide says treat acronyms as words, so `ucResourceId` is correct. But sibling fields use the same lowercase pattern (`workspaceId`, `pipelineId`), so this one is internally consistent. Flagged because it could be `unityCatalogResourceId` for clarity.

### M13. `eventType?: string` on `PipelineEvent` — string-typed enum
- **Location:** `model.ts:1732`.
- **Category:** 16 (field contradicts type domain).
- **Suggestion:** Define an `EventType` enum (or union of string literals) and type the field with it. Right now consumers have no IDE help.
- **Rationale:** JSDoc says "The event type. Should always correspond to the details." The Go SDK has the same field as string (porting fidelity), but TS could improve.

### M14. `PipelineEvent.timestamp: string` — typed string but holds an ISO date
- **Location:** `model.ts:1724`.
- **Category:** 16.
- **Suggestion:** Document the format in JSDoc, or use a `Date | string` union.

### M15. `RewindSpec.rewindTimestamp` — field prefixed with the type name
- **Location:** `model.ts:2277`.
- **Category:** 20 (type-suffix tautology).
- **Suggestion:** Drop the `rewind` prefix on fields inside `RewindSpec`: `timestamp`, `datasets`.

### M16. `Sequencing` — singular noun for a 2-field record describing one event's position
- **Location:** `model.ts:2290`.
- **Category:** 1 (vague).
- **Suggestion:** `EventSequence` or `EventPosition`. "Sequencing" is the action of putting in order, not the position itself.

### M17. `EditPipelineRequest.expectedLastModified: number` — wire is millis since epoch, but no JSDoc
- **Location:** `model.ts:632`.
- **Category:** 16 (field contradicts type domain), 19 (underspecified ID).
- **Suggestion:** Either type as `Date | number` or document "milliseconds since Unix epoch" in JSDoc.

### M18. `Sequencing.controlPlaneSeqNo` — abbreviated/cryptic identifier
- **Locations:** `model.ts:2290` (`Sequencing`), `model.ts:2294` (`controlPlaneSeqNo`).
- **Category:** 5 (cryptic abbreviations), 15 (generic field names).
- **Suggestion:** Rename to `controlPlaneSequenceNumber`. The JSDoc already calls it "A sequence number" — TS has no character budget. Sibling type `DataPlaneId.seqNo` (`model.ts:586`) has the same issue.
- **Rationale:** "SeqNo" is a Go/Java abbreviation. The wire JSON is `seq_no`, so the TS field rename is purely a surface improvement.

### M19. `DataPlaneId` reads like a string but is actually `{instance, seqNo}`
- **Location:** `model.ts:582`.
- **Category:** 6 (misleading: name implies a scalar ID, but the type is a compound).
- **Suggestion:** Rename to `DataPlaneSequence` or `DataPlaneCoordinate`. The actual ID is `{instance, seqNo}` — a coordinate, not an identifier.
- **Rationale:** Every other `*Id` type in the SDK is a string. Reading `dataPlaneId: DataPlaneId` then accessing `dataPlaneId.seqNo` is jarring.

---

## Low

### L1. `client.start()` JSDoc mentions "If there is already an active update" — should say "active run"
- **Location:** `client.ts:484`.
- **Category:** 6.

### L2. `client.stop()` JSDoc mentions "Stops the pipeline by canceling the active update" — same
- **Location:** `client.ts:513`.

### L3. `client.list()` JSDoc says "Lists pipelines defined in the Spark Declarative Pipelines system"
- **Location:** `client.ts:384`.
- **Category:** 6 (misleading), branding inconsistency.
- **Rationale:** The product is "Lakeflow Declarative Pipelines" per the IngestionPipelineDefinition JSDoc (`model.ts:932`). Internal naming: "Spark Declarative Pipelines" (SDP). Public marketing name: "Lakeflow Declarative Pipelines." The SDK uses both, sometimes in adjacent JSDoc.

### L4. JSDoc references to "SDP" appear in four fields, undefined
- **Locations:** `model.ts:379` (`ClonePipelineRequest.channel` — "SDP Release Channel"), `model.ts:516` (`CreatePipelineRequest.channel`), `model.ts:666` (`EditPipelineRequest.channel`), `model.ts:1816` (`PipelineSpec.channel`), `model.ts:2052` (`PipelinesEnvironment` — "SDP's environment").
- **Category:** 5 (cryptic abbreviation), 6 (misleading).
- **Suggestion:** Expand SDP → "Spark Declarative Pipelines" on first mention, with parenthetical "(internal name for Lakeflow Declarative Pipelines)".

### L5. `PipelineLibrary.lib` field uses an abbreviation
- **Location:** `model.ts:1745`.
- **Category:** 5.
- **Suggestion:** Either `library` (matching `lib` but spelled out) or `source` (the discriminator). The current `lib` is a Go SDK shortening.

### L6. `PipelinesS3StorageInfo.cannedAcl` — undocumented S3 jargon
- **Location:** `model.ts:2215`.
- **Category:** 5.
- **Suggestion:** Document inline: "canned ACL = a predefined S3 access-control list, e.g., `bucket-owner-full-control`." Currently the field name is fine since it matches the S3 API; only the casing (`cannedAcl` not `cannedAcl` — should be `cannedACL` per Google TS style? actually `cannedAcl` is correct).

### L7. `PipelinesS3StorageInfo.kmsKey` — uppercase acronym treatment is inconsistent
- **Location:** `model.ts:2205`.
- **Category:** 3.
- **Suggestion:** `kmsKey` is the correct casing per Google TS style. Just flagging for cross-check with other AWS fields in the file.

### L8. `PipelinesS3StorageInfo.enableEncryption` boolean alongside `encryptionType` string — coupled fields not enforced by type system
- **Locations:** `model.ts:2198`, `model.ts:2203`.
- **Category:** 16.
- **Suggestion:** Use a discriminated union: `encryption?: {kind: 'none'} | {kind: 'sse-s3'} | {kind: 'sse-kms'; key: string}`.

### L9. `PipelineCluster.label` — string typed, expected values "default" / "maintenance"
- **Location:** `model.ts:1575`.
- **Category:** 16.
- **Suggestion:** Make this an enum `ClusterLabel.{Default, Maintenance}`.

### L10. `PipelineCluster.applyPolicyDefaultValues` JSDoc says "won't be persisted" — should be marked deprecated or transient
- **Location:** `model.ts:1577`.
- **Category:** 6.
- **Suggestion:** Add `@deprecated` JSDoc tag.

### L11. `Truncation_TruncationDetail.fieldName: string` — looks like a meta field but is the data
- **Location:** `model.ts:2497`.
- **Category:** 6 (mildly misleading).
- **Suggestion:** `truncatedFieldName` or rename type to `TruncatedField`.

### L12. `JsonTransformerOptions.asVariant: boolean` — boolean named with prefix `as`
- **Location:** `model.ts:1225`.
- **Category:** 17 (inconsistent boolean naming).
- **Suggestion:** Rename to `parseAsVariant` or `parseAsVariantColumn`.
- **Rationale:** Other boolean fields in the file use `is*`/`enable*`/`has*` (`development`, `serverless`, `photon`, `continuous`, `enableEncryption`, `enabled`, `inferColumnTypes`, `readerCaseSensitive`, `ignoreCorruptFiles`, `fatal`, `force`, `cascade`, `dryRun`, `incremental`).

### L13. `AutoFullRefreshPolicy.minIntervalHours` JSDoc says "(Optional, Mutable)" — proto-style modifier tag in user-visible JSDoc
- **Location:** `model.ts:333`.
- **Category:** Generator artifact leakage.
- **Suggestion:** Express via TS optionality (`?:`) instead of repeating "Optional" in JSDoc.

### L14. `(Required, Immutable)` / `(Optional, Mutable)` proto tags appear in many JSDoc blocks
- **Locations:** searches: `(Required`, `(Optional` throughout `model.ts` (currently ~53 occurrences).
- **Category:** Generator artifact leakage.
- **Suggestion:** Remove or move to a structured `@required` / `@mutable` tag.

### L15. `Origin.host` — generic field on an event source struct
- **Location:** `model.ts:1497`.
- **Category:** 15 (generic field name).
- **Suggestion:** `originHostname` or document inline.

### L16. `RewindDatasetSpec.identifier: string` — generic when `datasetName` would do
- **Location:** `model.ts:2264`.
- **Category:** 15.
- **Suggestion:** `datasetIdentifier` or `fullyQualifiedName`.
- **Rationale:** JSDoc says "The identifier of the dataset (e.g., 'main.foo.tbl1')" — this is a UC three-part name.

### L17. `RewindDatasetSpec.resetCheckpoints: boolean` and `cascade: boolean` — coupled flags with no type-level link
- **Locations:** `model.ts:2266` (`cascade`), `model.ts:2268` (`resetCheckpoints`).
- **Category:** 16.
- **Suggestion:** Group into an `options` substruct or document interactions in JSDoc.

### L18. `KafkaOptions.startingOffset: string` — typed string but documented as enum
- **Location:** `model.ts:1261`.
- **Category:** 16.
- **Suggestion:** Define `KafkaStartingOffset.{Latest, Earliest}` enum.

### L19. `MetaMarketingOptions.level: string` — typed string but documented as enum
- **Location:** `model.ts:1403`.
- **Category:** 16.
- **Suggestion:** Define `MetaAggregationLevel.{Account, Ad, AdSet, Campaign}` enum.

### L20. `MetaMarketingOptions.actionReportTime: string` — string enum
- **Location:** `model.ts:1409`.
- **Category:** 16.
- **Suggestion:** Define enum.

---

## Observations

### O1. Branding history (DLT → Lakeflow Declarative Pipelines → Spark Declarative Pipelines) leaks into several abbreviations across the public API
- **Search:** `DLT`, `SDP`, `LDP`, `Lakeflow`, `Spark Declarative Pipelines`, `Delta Live Tables`, `DAB`.
- **Locations:** `model.ts:47` (`DAB` in DeploymentKind comment), `model.ts:379` (`SDP` in `channel` JSDoc), `model.ts:923` (`Spark Declarative Pipelines` in JSDoc), `model.ts:932` (`Lakeflow Connect`), `model.ts:2052` (`SDP's environment`), `client.ts:384` (`Spark Declarative Pipelines`).
- **Suggestion:** Settle on one product name in JSDoc. The TS types should be backwards-compatible (no rename) but the docstrings should agree.

### O2. `Pipelines*` (plural) vs `Pipeline*` (singular) split: 15 plural-prefixed vs 15 singular-prefixed types
- **Cross-reference:** H4.

### O3. There are FIVE separate `connectorOptions` / `sourceOptions` discriminators in the ingestion pipeline definition — connector wiring is too nested
- **Locations:** `IngestionPipelineDefinition.connectorType`, `IngestionPipelineDefinition.sourceConfigurations[].catalog.options`, `IngestionPipelineDefinition_SchemaSpec.connectorOptions`, `IngestionPipelineDefinition_TableSpec.connectorOptions`.
- **Suggestion:** Document the resolution order between schema-level and table-level options. JSDoc currently fragments the rules across multiple types.

### O4. JSDoc uses `<Databricks>` placeholder — leak from the Go SDK's template substitution
- **Search:** `<Databricks>` appears 18 times in `model.ts`.
- **Suggestion:** Replace with literal "Databricks" before TS compilation.

### O5. `Notifications.alerts: string[]` is a hand-rolled enum of `on-update-success`, `on-update-failure`, `on-update-fatal-failure`, `on-flow-failure`
- **Location:** `model.ts:1443`.
- **Category:** 16.
- **Suggestion:** Define `AlertCondition` enum. Currently typed `string[]` with values listed only in JSDoc.

### O6. `OutlookOptions` carries three `*Filter` fields marked deprecated (`folderFilter`, `senderFilter`, `subjectFilter`) plus the new `include*` versions side-by-side
- **Locations:** `model.ts:1513-1566`.
- **Category:** Generator artifact / Go-SDK fidelity issue.
- **Suggestion:** Mark deprecated fields with `@deprecated` JSDoc tag (currently only mentioned in plain text).

### O7. `ConnectorOptions` JSDoc opens with "Wrapper message for source-specific options" — proto-architectural terminology leak
- **Location:** `model.ts:456`.
- **Why:** "Wrapper message" is a protobuf concept (the proto2/proto3 well-known wrapper types: `BoolValue`, `StringValue`, etc., plus the generic "wrapper message" pattern used to box discriminated unions). It is visible in user-facing JSDoc on a public interface.
- **Category:** Generator artifact leakage / proto-architectural leak.
- **Suggested:** Rewrite JSDoc as "Source-specific options for ingestion connectors. Exactly one option must be specified for the connector type." Drop "Wrapper message".
- **Rationale:** TypeScript developers do not know what a "wrapper message" is — the term reveals the proto IDL underneath. The shape is just a discriminated union over connector option types; describe it in TS terms.

### O8. `Internal` proto-field tag leaks into JSDoc on two public fields
- **Locations:** `model.ts:926` (`IngestionGatewayPipelineDefinition.connectionParameters` — "Optional, Internal. Parameters required to establish an initial connection with the source."), `model.ts:1262` (`KafkaOptions.maxOffsetsPerTrigger` — "Internal option to control the maximum number of offsets to process per trigger.").
- **Why:** `Internal` is a proto-level annotation (`google.api.field_visibility = INTERNAL` or similar) indicating the field is not part of the public API surface. If these fields are truly internal, they should be stripped from the public SDK at generation time; if they are public, the "Internal" label should not appear in user-visible documentation.
- **Category:** Generator artifact leakage / proto-architectural leak.
- **Suggested:** Either remove these fields from the public SDK (preferred — they are marked internal) or drop the "Internal" qualifier from JSDoc and document the actual user-facing semantics.
- **Rationale:** Users reading JSDoc see `Internal option to control...` and reasonably wonder why an internal field is in the public SDK. This is a generator-template concern (same pattern likely shows up in other packages) — surface in the cross-package summary.

---

## Fixed

- #H2 `EditPipeline` (originally cited at `model.ts:830`): Renamed to `EditPipelineRequest`. Reference updated in active H2.
- #H7 `EditPipeline`/`CreatePipeline`/`ClonePipeline` (originally cited at `model.ts:508`/`672`/`830`): Renamed to `*Request` variants. References updated in active H7.
- #H8 `Origin.graphId` (originally cited at `model.ts:1816`): Fixed in regeneration on 2026-05-20 — `graphId` field removed from `Origin`.
- #H12 `StorageMode` enum duplicate of `ScdType` (originally cited at `model.ts:263`): Fixed in regeneration on 2026-05-20 — `StorageMode` enum removed; only `ScdType_ScdType` remains.
- #H14 `client.delete()` reserved-word collision (originally cited at `client.ts:204`): Line updated; still present as H13. Sibling reference to `restorePipeline()` removed since the restore endpoint no longer exists.
- #H15 `client.restorePipeline()` (originally cited at `client.ts:475`): Fixed in regeneration on 2026-05-20 — `restorePipeline()` method and `RestorePipelineRequest` removed entirely from the package.
- #H16 `RestorePipelineRequest` suffix asymmetry (originally cited at `model.ts:2618`): Fixed in regeneration on 2026-05-20 — `Request` suffix added uniformly to every request DTO (`DeletePipelineRequest`, `GetPipelineRequest`, `ClonePipelineRequest`, `EditPipelineRequest`, `CreatePipelineRequest`, `StartUpdateRequest`, `StopPipelineRequest`, `ApplyEnvironmentRequest`, etc.); `RestorePipelineRequest` itself was deleted along with the restore endpoint.
- #H19 `StartUpdate.fullRefresh`/`refreshSelection`/`fullRefreshSelection`/`resetCheckpointSelection`/`refreshFlowSelection` (originally cited at `model.ts:2738-2780`): Fixed in regeneration on 2026-05-20 — `resetCheckpointSelection` and `refreshFlowSelection` fields removed; remaining three (`fullRefresh`, `refreshSelection`, `fullRefreshSelection`) reduced to the documented pattern.
- #H22 `PipelinesEnvironment` vs `IngestionPipelineDefinition` prefix split (originally cited at `model.ts:2382`/`1173`): Fixed in regeneration on 2026-05-20 — the underlying `Pipelines*` plural prefix issue is now consolidated under H4 alongside other plural-prefixed types; no longer a standalone H finding.
- #M11 `GoogleDriveOptions_GoogleDriveIngestionScope` (originally cited at `model.ts:372-379`): Fixed in regeneration on 2026-05-20 — enum removed; only `GoogleDriveOptions_GoogleDriveEntityType` remains.
- #M13 `PeriodicTrigger_TimeUnit` (originally cited at `model.ts:384`): Fixed in regeneration on 2026-05-20 — enum and parent type `PeriodicTrigger` removed.
- #M31 `IngestionSourceType.COMMUNITY` (originally cited at `model.ts:88-92`): Fixed in regeneration on 2026-05-20 — `COMMUNITY` value removed from `IngestionSourceType`.
- #M36 `RewindSpec.rewindPointId` (originally cited at `model.ts:2637-2655`): Fixed in regeneration on 2026-05-20 — `rewindPointId` field removed; remaining `rewindTimestamp` is now tracked as M31.
- #L18 `IngestionPipelineDefinition_TableSpec.enableAutoClustering` and `clusteringColumns` (originally cited at `model.ts:1426`/`1435`): Fixed in regeneration on 2026-05-20 — both fields removed from `IngestionPipelineDefinition_TableSpec`.
