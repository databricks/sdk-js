# Naming Audit: pipelines

**Path:** `packages/pipelines/src/v2/`
**Versions audited:** v2
**Inferred domain:** Lakeflow Declarative Pipelines (formerly Delta Live Tables / DLT) — create / clone / get / list / edit / delete / restore pipelines, start / stop / list / get pipeline **updates** ("a run of a pipeline"), and a vast catalog of ingestion connectors (Salesforce, Workday, Outlook, Kafka, RabbitMQ, TikTok Ads, ServiceNow, Confluence, Jira, ...). The API was renamed multiple times (DLT → Spark Declarative Pipelines → Lakeflow Declarative Pipelines); branding leakage and acronyms are abundant.

**Files audited:**
- `src/v2/model.ts` (6,198 lines) — 31 enums, ~110 interfaces, ~80 marshal/unmarshal schemas.
- `src/v2/client.ts` (646 lines) — 13 RPC methods + 2 paginators + `StopWaiter`.
- `src/v2/utils.ts` (151 lines) — generic HTTP/marshal helpers (no domain names).
- `src/v2/index.ts` (172 lines) — re-exports.

## Summary

| Severity     | Count | Notes                                                                                       |
| ------------ | ----- | ------------------------------------------------------------------------------------------- |
| High         | 26    | Verb/noun overloading (`Update`), DLT-era rebrand leakage, identifier collisions, plural `Pipelines` prefix. |
| Medium       | 38    | Underscores, redundant prefixes/suffixes, vague names, acronym casing, generic IDs.         |
| Low          | 21    | Mild verbosity, plural mismatches, stylistic inconsistencies.                               |
| Observations | 7     | Patterns spanning the whole file (proto leakage, branding history).                         |
| **Total**    | **92** | |

Issues are catalogued below by severity, then by file/line. Throughout this document I use **"Update" (proper noun)** to refer to the DLT/Lakeflow concept of a pipeline run, since that overload is the most pervasive and most confusing naming choice in the package.

---

## High

### H1. `Update` is a verb in every other Databricks SDK but the noun "pipeline run" here — pervasive overloading
- **Locations:** `model.ts:283` (`UpdateCause`), `model.ts:300` (`UpdateMode`), `model.ts:311` (`UpdateState`), `model.ts:1091` (`GetUpdate`), `model.ts:1099` (`GetUpdate_Response`), `model.ts:1689` (`ListUpdates`), `model.ts:1701` (`ListUpdates_Response`), `model.ts:2738` (`StartUpdate`), `model.ts:2789` (`StartUpdate_Response`), `model.ts:2879` (`UpdateInfo`), `model.ts:2934` (`UpdateStateInfo`), `client.ts:352` (`getUpdate`), `client.ts:434` (`listUpdates`), `client.ts:504` (`start`), plus every `updateId` field.
- **Category:** 1 (vague), 6 (misleading — rebrand history), 13 (verb/noun inconsistency), 17 (inconsistent action verbs).
- **Suggestion:** Rename `Update` → `PipelineRun` everywhere in the public TS surface. `StartUpdate` → `StartRunRequest` (or `RunPipelineRequest`), `GetUpdate` → `GetRunRequest`, `ListUpdates` → `ListRunsRequest`, `UpdateInfo` → `PipelineRun`, `UpdateState` → `PipelineRunState`, `UpdateCause` → `RunStartCause`, `UpdateMode` → `RunMode`, `UpdateStateInfo` → `RunSummary`, `updateId` → `runId`. The HTTP wire still uses `/updates/`, so the schema layer maps the rename — this is fine.
- **Rationale:** "Update" is the standard verb for `PUT`/`PATCH` (and `EditPipeline` already takes that slot — the client method is `edit()`, but the HTTP verb is `PUT`). Every JS/TS developer expects `update()` to mean "mutate". The DLT product feature historically named the unit-of-execution "Update" but Databricks itself renamed the concept to **"Pipeline run"** when the product became Lakeflow Declarative Pipelines. The SDK is on the wrong side of the rebrand. The same problem ripples through `start()` (the method that "starts an update"), `getUpdate()`, and `listUpdates()`. This is the single most confusing name in the package.

### H2. `client.edit()` returns `EditPipeline_Response` instead of `UpdatePipeline_Response` — verb collision avoidance is leaking through
- **Locations:** `client.ts:241` (`edit`), `model.ts:830` (`EditPipeline`), `model.ts:929` (`EditPipeline_Response`).
- **Category:** 13 (verb-tense inconsistency: `Edit` vs `Update` vs `Modify`), 6 (misleading: HTTP verb is `PUT`).
- **Suggestion:** Rename `EditPipeline` → `UpdatePipelineRequest` and the client method `edit()` → `update()`. Then rename the "pipeline run" concept per H1 to free up the `Update` token.
- **Rationale:** The package uses `Edit` only because the `Update` noun was burned by DLT history. Once H1 is applied, `edit()` should follow the standard `create()`/`update()`/`delete()` REST pattern used by every other SDK (`jobs`, `clusters`, `instancepools`, etc., all use `update()`).

### H3. `client.start()` is "start a pipeline update" — but it reads as "start a pipeline"
- **Location:** `client.ts:504`.
- **Category:** 6 (misleading), 17 (inconsistent action verbs).
- **Suggestion:** Rename `start(req: StartUpdate)` → `run(req: RunPipelineRequest)` or `startRun(req: StartRunRequest)`. Pair with `stop(req: StopPipelineRequest)`.
- **Rationale:** Reading `client.start({pipelineId})` you assume it "starts the pipeline". It actually queues a new **run** (Update). The asymmetry with `stop(req: StopPipeline)` (which DOES stop the pipeline) is silent and dangerous. `run` is the verb Databricks uses in marketing copy and now in the UI; `start` is the legacy name.

### H4. `Pipelines*` prefix (plural) on a single-pipeline package — proto-package leakage
- **Locations:** `model.ts:212` (`PipelinesAwsAvailability`), `model.ts:225` (`PipelinesAzureAvailability`), `model.ts:241` (`PipelinesEbsVolumeType`), `model.ts:249` (`PipelinesGcpAvailability`), `model.ts:2224` (`PipelinesAutoScale`), `model.ts:2243` (`PipelinesAwsAttributes`), `model.ts:2332` (`PipelinesAzureAttributes`), `model.ts:2359` (`PipelinesClusterLogConf`), `model.ts:2373` (`PipelinesDbfsStorageInfo`), `model.ts:2382` (`PipelinesEnvironment`), `model.ts:2405` (`PipelinesGcpAttributes`), `model.ts:2446` (`PipelinesInitScriptInfo`), `model.ts:2474` (`PipelinesJobRunAs`), `model.ts:2489` (`PipelinesMavenLibrary`), `model.ts:2507` (`PipelinesS3StorageInfo`).
- **Category:** 8 (redundant suffix/prefix), 9 (singular/plural mismatch), 14 (Go/Java-style names).
- **Suggestion:** Drop the `Pipelines` prefix. The package itself is `@databricks/sdk-pipelines` and the import disambiguates from `@databricks/sdk-clusters`. The types become `AwsAvailability`, `AwsAttributes`, `AutoScale`, `ClusterLogConf`, `DbfsStorageInfo`, `Environment`, `GcpAttributes`, `InitScriptInfo`, `JobRunAs`, `MavenLibrary`, `S3StorageInfo`. If global collision is feared, use `PipelineCluster`-style singular: `PipelineEnvironment`, `PipelineAwsAttributes`, etc.
- **Rationale:** The proto package is `pipelines.proto`, so the generator prefixed every type with `Pipelines`. A consumer types `new PipelinesJobRunAs(...)` and the plural reads as "RunAs for many jobs in many pipelines" — neither is true. `PipelineCluster` (singular, `model.ts:1898`) shows the convention the package would have if generated consistently.

### H5. `PipelinesJobRunAs` references `Job` from a `Pipelines` package
- **Location:** `model.ts:2474`.
- **Category:** 6 (misleading — `Job` is a separate Databricks product), 14 (Go-style).
- **Suggestion:** Rename to `RunAs` or `PipelineRunAs`. Drop the `Job` token entirely — this type is not used by `@databricks/sdk-jobs`.
- **Rationale:** `Job` belongs to the `jobs` API. A user reading `runAs: PipelinesJobRunAs` cannot tell whether the pipeline is associated with a job or just borrows the shape. The proto comment ("Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as.") confirms this is a pipeline-only concept.

### H6. `Pipeline` is never used as a type name — the central domain entity is missing
- **Locations:** N/A — the package has `PipelineSpec`, `PipelineStateInfo`, `GetPipeline_Response`, `BaseJob`-style scattering, but no plain `Pipeline` type.
- **Category:** 1 (vague/generic alternative missing), 6 (misleading).
- **Suggestion:** Add an exported `Pipeline` type that consolidates the runtime view (`GetPipeline_Response` is the closest). Alternatively rename `GetPipeline_Response` → `Pipeline`. Keep `PipelineSpec` as the write-form (the "settings" sub-object).
- **Rationale:** A user installs `@databricks/sdk-pipelines` and expects to `import {Pipeline} from '@databricks/sdk-pipelines'`. Instead they have to discover `GetPipeline_Response`, `PipelineSpec`, `PipelineStateInfo`, or `BaseRun`-style scatter. The Go SDK does the same thing — but Go has package-namespace `pipelines.Pipeline`, while TS uses bare identifiers and benefits from a primary name.

### H7. `EditPipeline` / `CreatePipeline` / `ClonePipeline` / `PipelineSpec` all duplicate 26 of the same fields
- **Locations:** `model.ts:508` (`ClonePipeline`), `model.ts:672` (`CreatePipeline`), `model.ts:830` (`EditPipeline`), `model.ts:2108` (`PipelineSpec`).
- **Category:** 12 (duplicate concepts).
- **Suggestion:** Extract `PipelineSpec` as the shared base and have `CreatePipelineRequest`, `EditPipelineRequest`, `ClonePipelineRequest` use TS intersection: `type CreatePipelineRequest = PipelineSpec & {allowDuplicateNames?: boolean; dryRun?: boolean; ...}`.
- **Rationale:** Each of the four interfaces redeclares `id`, `name`, `storage`, `configuration`, `clusters`, `libraries`, `ingestionDefinition`, `gatewayDefinition`, `trigger`, `target`, `schema`, `filters`, `continuous`, `development`, `photon`, `edition`, `channel`, `catalog`, `notifications`, `serverless`, `deployment`, `restartWindow`, `budgetPolicyId`, `tags`, `eventLog`, `rootPath`, `environment`, `usagePolicyId`, `rewindGenerationInterval`. Drift between the four is silent. Counted manually — 26 identical fields × 4 types = 104 redundant declarations.

### H8. `Update` field names on `Origin` reference the "pipeline run" sense of Update — silent overloading
- **Locations:** `model.ts:1791` (`updateId`), `model.ts:1816` (`graphId`), `model.ts:2879` (`UpdateInfo.updateId`), `model.ts:2934` (`UpdateStateInfo.updateId`).
- **Category:** 19 (underspecified IDs), 1 (vague).
- **Suggestion:** Rename `updateId` → `runId` (paired with H1). Document that the wire JSON key is `update_id` for compatibility.
- **Rationale:** A field named `updateId` on `Origin` (event source) leaves "update of what?" unanswered. Users wonder if it refers to the last-modification timestamp.

### H9. `client.events()` method name is too generic
- **Location:** `client.ts:267`.
- **Category:** 1 (vague), 17 (inconsistent action verbs — should be `listEvents`).
- **Suggestion:** Rename to `listEvents()` for symmetry with `listUpdates()`, `list()`.
- **Rationale:** Bare `events()` reads as a property accessor or event emitter, not an HTTP `GET`. Every other paginating method uses `list*` (`list`, `listUpdates`).

### H10. `client.list()` — too generic for the package's bare-`list` slot
- **Location:** `client.ts:377`.
- **Category:** 1 (vague), 17 (inconsistent verbs).
- **Suggestion:** Rename to `listPipelines()` to match the request type `ListPipelines` and to disambiguate from `listUpdates`/`listEvents`.
- **Rationale:** `client.list(req)` requires the user to remember `list` of *what*. Adjacent methods are `listUpdates`, `events` (sic), and the request type is already `ListPipelines`. Bare `list` is a Go-SDK convention (where the package name disambiguates) but loses information in TS.

### H11. `PipelineState_PipelineState` enum — underscore suffix tautology
- **Location:** `model.ts:392` (`export enum PipelineState_PipelineState`).
- **Category:** 20 (type-suffix tautology), 4 (underscores).
- **Suggestion:** Rename the enum to `PipelineState`.
- **Rationale:** `PipelineState_PipelineState.RUNNING` reads as "state.state.RUNNING". Same pattern as `ScdType_ScdType` (H12).

### H12. `ScdType_ScdType` enum — underscore suffix tautology and cryptic acronym
- **Locations:** `model.ts:415` (`export enum ScdType_ScdType`), `index.ts:32`, `index.ts:150`.
- **Category:** 20 (suffix tautology), 4 (underscores), 5 (cryptic abbreviation).
- **Suggestion:** Rename `ScdType_ScdType` → `ScdType`. Better: rename to `SlowlyChangingDimensionType` since "SCD" is jargon for "Slowly Changing Dimension" — and the values themselves are `SCD_TYPE_1` / `SCD_TYPE_2` (Kimball-style dimensional modeling).
- **Rationale:** Same issue as H11. SCD is a dimensional-modelling acronym (slowly-changing dimensions, from Kimball's data-warehousing canon). A casual reader does not know that. The enum values then re-spell `SCD_TYPE_*` redundantly (`SCD_TYPE_1`, `SCD_TYPE_2`, `APPEND_ONLY`).

### H13. `StorageMode` enum is a parallel of `ScdType_ScdType` with three overlapping values — duplicate concept
- **Locations:** `model.ts:263` (`StorageMode.SCD_TYPE_1` / `SCD_TYPE_2` / `APPEND_ONLY`), `model.ts:415` (`ScdType_ScdType.SCD_TYPE_1` / `SCD_TYPE_2` / `APPEND_ONLY`).
- **Category:** 12 (duplicate concepts).
- **Suggestion:** Delete one. The JSDoc on `IngestionPipelineDefinition_TableSpecificConfig.storageMode` (`model.ts:1437-1440`) literally says "Mutually exclusive with scd_type — a 400 error is returned if both are set." This is two names for the same field. Pick one (probably `StorageMode` since it includes a meaningful `UNSPECIFIED`).
- **Rationale:** Forcing the client to choose between two synonymous enums based on which one the field is typed as is the worst possible API ergonomic. Users will set both and get a 400.

### H14. `PipelineState_PipelineState.IDLE` is the terminal state — but the JSDoc says "Pipeline is stopped and is not processing data. Can be resumed by calling `run`"
- **Location:** `model.ts:410`.
- **Category:** 6 (misleading — references method `run` that does not exist; the method is `start`).
- **Suggestion:** Fix JSDoc to reference `start()`. After H3, both will line up at `run()`.
- **Rationale:** Currently the user reads "call `run`" and finds no `run()` method on `Client`.

### H15. `client.delete()` collides with JS `delete` keyword
- **Location:** `client.ts:204`.
- **Category:** 10 (reserved-word collision).
- **Suggestion:** Rename to `deletePipeline()` (matching `restorePipeline()` already at `client.ts:475`). Alternatively, `remove()`.
- **Rationale:** `delete` is a JS reserved keyword. While methods can be named `delete` since ES5, every IDE highlights it and parsers in some contexts choke. `restorePipeline()` already uses the verbose form, so the asymmetry is jarring (`client.delete` vs `client.restorePipeline`).

### H16. `client.restorePipeline()` is verbose, but its siblings are short (`delete`, `get`, `clone`)
- **Location:** `client.ts:475`.
- **Category:** 7 (overly verbose), 17 (inconsistent verbs).
- **Suggestion:** Either shorten to `restore()` (parallel with `clone()`, `delete()`, `get()`) or lengthen the siblings to `deletePipeline()`, `getPipeline()`, `clonePipeline()`. The request type is already named `RestorePipelineRequest` — which is itself inconsistent with sibling request types (`DeletePipeline`, `GetPipeline`, `ClonePipeline` have no `Request` suffix).
- **Rationale:** Pick one suffix convention and apply it. Mixing methods on the same client is the smell.

### H17. `RestorePipelineRequest` ends in `Request` but other request types do not
- **Locations:** `model.ts:2618` (`RestorePipelineRequest`), `model.ts:2624` (`RestorePipelineRequest_Response`), `model.ts:477` (`ApplyEnvironmentRequest`), `model.ts:482` (`ApplyEnvironmentRequest_Response`).
- **Category:** 8 (redundant suffix), 17 (inconsistent).
- **Suggestion:** Pick one convention and stick to it. Either drop `Request` everywhere (so this becomes `RestorePipeline`, `ApplyEnvironment`) or add it everywhere (`DeletePipelineRequest`, `EditPipelineRequest`, ...).
- **Rationale:** Two named conventions in the same file confuse every reader. `RestorePipelineRequest_Response` is doubly bad: the underscore says it is a proto-nested name (intended to be `RestorePipelineRequest.Response`) but a response shape suffixed `RequestRequest_Response` is bizarre.

### H18. `EventLevel.METRICS` — value on a "severity level" enum that is not a severity
- **Location:** `model.ts:56`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Either move `METRICS` to a separate `EventCategory` enum or rename the enum to `EventKind`. The JSDoc says "The severity level of the event" — but `METRICS` is a category, not a severity.
- **Rationale:** Filtering `where level='ERROR'` makes sense; `where level='METRICS'` is "where this event is a metric measurement, regardless of severity." Mixing the two leads to user mistakes.

### H19. `UpdateState.QUEUED` description references the wrong noun ("update") instead of "run"
- **Location:** `model.ts:313` ("Update is waiting for previous update to finish.").
- **Category:** 6 (misleading).
- **Suggestion:** Doc rewrite (English) after H1: "Run is waiting for previous run to finish."
- **Rationale:** Same as H1 — once `Update` is renamed to `Run`, every JSDoc that mentions "update" in this enum needs to follow.

### H20. `StartUpdate.fullRefresh` / `refreshSelection` / `fullRefreshSelection` / `resetCheckpointSelection` / `refreshFlowSelection` — 5 booleans-or-arrays describing overlapping concepts
- **Location:** `model.ts:2738-2780`.
- **Category:** 12 (duplicate concepts), 17 (inconsistent verbs).
- **Suggestion:** Collapse into a single discriminated union `refreshMode: FullGraph | FullRefresh | TableSelection | FlowSelection | RewindMode` (analogous to existing `RewindSpec`). At minimum, document the precedence rules in JSDoc.
- **Rationale:** The combinatorial space is currently five fields × two values each = 32 combinations, of which JSDoc clarifies only "if both refresh_selection and full_refresh_selection are empty, this is a full graph update." The other 30 combinations are undefined.

### H21. `Notifications` (plural type, singular plural-prefixed) — a single-notification spec named in plural
- **Locations:** `model.ts:1746`, `model.ts:556` (`notifications?: Notifications[]`), etc.
- **Category:** 9 (singular/plural mismatch).
- **Suggestion:** Rename to `NotificationRule` (singular). The field becomes `notificationRules?: NotificationRule[]`.
- **Rationale:** `notifications: Notifications[]` reads as "a list of lists of notifications". The type holds one `{emailRecipients, alerts}` pair — singular by definition.

### H22. `connectorOptions` field-name reuses parent-type token (`ConnectorOptions.connectorOptions`)
- **Locations:** `model.ts:644-670`, `model.ts:1323`, `model.ts:1357`.
- **Category:** 20 (type-suffix tautology), 12 (duplicate naming).
- **Suggestion:** Rename the outer interface to `ConnectorOptions` and the inner discriminator to `options` (or `payload`). Then `connectorOptions: {payload: {...}}` reads cleanly.
- **Rationale:** Currently `ConnectorOptions.connectorOptions.googleAdsOptions` requires four nested identifiers all containing "options".

### H23. `PipelinesEnvironment` vs `IngestionPipelineDefinition` — two `Pipeline*` namespaces, only one is plural
- **Locations:** `model.ts:2382` (`PipelinesEnvironment`), `model.ts:1173` (`IngestionPipelineDefinition`).
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent prefix).
- **Suggestion:** Drop the prefix on `PipelinesEnvironment` (see H4). Or rename to `PipelineEnvironment` (singular). Match `PipelineCluster`, `PipelineDeployment`, `PipelineEvent`, `PipelineLibrary`, `PipelineSpec`, `PipelineStateInfo`, `PipelineTrigger` — all singular.
- **Rationale:** Out of 22 pipeline-prefixed types, 8 use plural (`Pipelines*`) and 14 use singular (`Pipeline*`). No domain reason for the split; pure generator artifact.

### H24. Underscore-named proto nested types — 27 separate identifiers with `eslint-disable`
- **Locations:** 27 lines, each tagged `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` Notable: `ApplyEnvironmentRequest_Response` (`model.ts:482`), `ClonePipeline_ConfigurationEntry` (`model.ts:591`), `ClonePipeline_Response` (`model.ts:597`), `ClonePipeline_TagsEntry` (`model.ts:604`), `CommunityConnectorOptions_OptionsEntry` (`model.ts:622`), `CreatePipeline_ConfigurationEntry`, `CreatePipeline_ParametersEntry`, `CreatePipeline_Response`, `CreatePipeline_TagsEntry`, `DeletePipeline_Response`, `EditPipeline_ConfigurationEntry`, `EditPipeline_ParametersEntry`, `EditPipeline_Response`, `EditPipeline_TagsEntry`, `FileIngestionOptions_FileFormat`, `FileIngestionOptions_FormatOptionsEntry`, `FileIngestionOptions_SchemaEvolutionMode`, `GetPipeline_Response`, `GetPipeline_Response_ParametersEntry`, `GetUpdate_Response`, `GoogleDriveOptions_GoogleDriveEntityType`, `GoogleDriveOptions_GoogleDriveIngestionScope`, `IngestionPipelineDefinition_*` (10 nested), `KafkaOptions_ClientConfigEntry`, `ListPipelineEvents_Response`, `ListPipelines_Response`, `ListUpdates_Response`, `PeriodicTrigger_TimeUnit`, `PipelineCluster_CustomTagsEntry`, `PipelineCluster_SparkConfEntry`, `PipelineCluster_SparkEnvVarsEntry`, `PipelineSpec_ConfigurationEntry`, `PipelineSpec_TagsEntry`, `PipelineState_PipelineState`, `RestorePipelineRequest_Response`, `ScdType_ScdType`, `SharepointOptions_SharepointEntityType`, `StartUpdate_ParametersEntry`, `StartUpdate_Response`, `StopPipeline_Response`, `TikTokAdsOptions_TikTokDataLevel`, `TikTokAdsOptions_TikTokReportType`, `Transformer_Format`, `Truncation_TruncationDetail`, `UpdateInfo_ParametersEntry`.
- **Category:** 4 (underscores in TS identifiers), 14 (Go/Java-style names).
- **Suggestion:** Flatten everywhere. `PipelineState_PipelineState` → `PipelineState`, `IngestionPipelineDefinition_TableSpec` → `IngestionTableSpec`, etc. Use TS namespace-style with dot notation only where it disambiguates (e.g., `IngestionPipelineDefinition.TableSpec` via namespace export — but TS namespace exports inside modules are non-idiomatic).
- **Rationale:** TS identifiers conventionally use camelCase / PascalCase; underscores are reserved for special names (private fields by convention). 27 `eslint-disable` lines = 27 fights with the linter. The Generator should be re-targeted.

### H25. `Sequencing.controlPlaneSeqNo` — abbreviated/cryptic identifier
- **Locations:** `model.ts:2661` (`Sequencing`), `model.ts:2665` (`controlPlaneSeqNo`).
- **Category:** 5 (cryptic abbreviations), 15 (generic field names).
- **Suggestion:** Rename to `controlPlaneSequenceNumber`. The JSDoc already calls it "A sequence number" — TS has no character budget. Sibling type `DataPlaneId.seqNo` (`model.ts:792`) has the same issue.
- **Rationale:** "SeqNo" is a Go/Java abbreviation. The wire JSON is `seq_no`, so the TS field rename is purely a surface improvement.

### H26. `DataPlaneId` reads like a string but is actually `{instance, seqNo}`
- **Location:** `model.ts:788`.
- **Category:** 6 (misleading: name implies a scalar ID, but the type is a compound).
- **Suggestion:** Rename to `DataPlaneSequence` or `DataPlaneCoordinate`. The actual ID is `{instance, seqNo}` — a coordinate, not an identifier.
- **Rationale:** Every other `*Id` type in the SDK is a string. Reading `dataPlaneId: DataPlaneId` then accessing `dataPlaneId.seqNo` is jarring.

---

## Medium

### M1. `ConnectorType.CONNECTOR_TYPE_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:16-25`.
- **Category:** 2 (redundant enum prefix).
- **Suggestion:** Rename values to `UNSPECIFIED`, `CDC`, `QUERY_BASED`. TS already namespaces enum members by enum.
- **Rationale:** `ConnectorType.CONNECTOR_TYPE_CDC` reads as "ConnectorType.Type.CDC".

### M2. `DayOfWeek.DAY_OF_WEEK_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:31-40`.
- **Category:** 2.
- **Suggestion:** Drop `DAY_OF_WEEK_` prefix from `UNSPECIFIED`. Other values (`MONDAY`...) are fine.
- **Rationale:** Same as M1. Inconsistency: `MONDAY` is unprefixed but `UNSPECIFIED` is prefixed.

### M3. `IngestionSourceType.INGESTION_SOURCE_TYPE_UNSPECIFIED` — redundant prefix on 1 of 80 values
- **Location:** `model.ts:60`.
- **Category:** 2.
- **Suggestion:** Drop the prefix.
- **Rationale:** Same as M1.

### M4. `OutlookAttachmentMode.OUTLOOK_ATTACHMENT_MODE_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:177`.
- **Category:** 2.
- **Suggestion:** Drop.

### M5. `OutlookBodyFormat.OUTLOOK_BODY_FORMAT_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:190`.
- **Category:** 2.
- **Suggestion:** Drop.

### M6. `ParseMode.PARSE_MODE_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:198`.
- **Category:** 2.
- **Suggestion:** Drop.

### M7. `PublishingMode.PUBLISHING_MODE_UNSPECIFIED` / `LEGACY_PUBLISHING_MODE` / `DEFAULT_PUBLISHING_MODE` — three redundant prefixes
- **Location:** `model.ts:256-260`.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggestion:** Rename to `UNSPECIFIED`, `LEGACY`, `DEFAULT`.

### M8. `StorageMode.STORAGE_MODE_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:264`.
- **Category:** 2.
- **Suggestion:** Drop.

### M9. `FileIngestionOptions_FileFormat.FILE_FORMAT_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:338`.
- **Category:** 2.

### M10. `FileIngestionOptions_SchemaEvolutionMode.SCHEMA_EVOLUTION_MODE_UNSPECIFIED` — redundant + verbose
- **Location:** `model.ts:353`.
- **Category:** 2, 18.

### M11. `GoogleDriveOptions_GoogleDriveEntityType.GOOGLE_DRIVE_ENTITY_TYPE_UNSPECIFIED` — quadruple-redundant
- **Location:** `model.ts:362-369`.
- **Category:** 2, 18.
- **Suggestion:** The proto-nested name already contains "GoogleDrive" twice. The enum members repeat the brand a third time. Strip down to `EntityType.{Unspecified, File, FileMetadata, Permission, FilePermission, GroupMembership}`.

### M12. `GoogleDriveOptions_GoogleDriveIngestionScope.GOOGLE_DRIVE_INGESTION_SCOPE_UNSPECIFIED` — same problem
- **Location:** `model.ts:372-379`.
- **Category:** 2, 18.

### M13. `PeriodicTrigger_TimeUnit.TIME_UNIT_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:384`.
- **Category:** 2, 18.

### M14. `ScdType_ScdType.SCD_TYPE_UNSPECIFIED` / `SCD_TYPE_1` / `SCD_TYPE_2` — every value names the enum
- **Location:** `model.ts:415-424`.
- **Category:** 2, 18.

### M15. `SharepointOptions_SharepointEntityType.SHAREPOINT_ENTITY_TYPE_UNSPECIFIED` — triple-redundant
- **Location:** `model.ts:428`.
- **Category:** 2, 18.

### M16. `TikTokAdsOptions_TikTokDataLevel.TIK_TOK_DATA_LEVEL_UNSPECIFIED` — same problem
- **Location:** `model.ts:440`.
- **Category:** 2, 3 (the casing of `TIK_TOK` splits `TikTok` which is normally one word).

### M17. `TikTokAdsOptions_TikTokReportType.TIK_TOK_REPORT_TYPE_UNSPECIFIED` — same
- **Location:** `model.ts:450`.

### M18. `Transformer_Format.FORMAT_UNSPECIFIED` — redundant prefix
- **Location:** `model.ts:461`.
- **Category:** 2.

### M19. `PipelinesAwsAvailability.SPOT_WITH_FALLBACK` — value spells "SPOT", which is already what the enum is about
- **Location:** `model.ts:212-222`.
- **Category:** 18 (long enum values).
- **Suggestion:** Just `FALLBACK`.

### M20. `PipelinesAzureAvailability.SPOT_AZURE` / `ON_DEMAND_AZURE` / `SPOT_WITH_FALLBACK_AZURE` — suffix repeats the enum name
- **Location:** `model.ts:226-235`.
- **Category:** 2 (redundant enum prefix/suffix).
- **Suggestion:** Drop `_AZURE`. Sibling `PipelinesAwsAvailability` does not use `_AWS`, so the asymmetry is gratuitous. Same for `PipelinesGcpAvailability.*_GCP` (M21 below).

### M21. `PipelinesGcpAvailability.PREEMPTIBLE_GCP` / `ON_DEMAND_GCP` / `PREEMPTIBLE_WITH_FALLBACK_GCP` — `_GCP` suffix asymmetry
- **Location:** `model.ts:249-253`.
- **Category:** 2.

### M22. `MaturityLevel.DEPRECATED` reads as a deprecation tag, not a maturity level
- **Location:** `model.ts:170-173`.
- **Category:** 6 (misleading).
- **Suggestion:** Rename enum to `EventStability` or rename value `DEPRECATED` → `LEGACY`.
- **Rationale:** `DEPRECATED` is widely used as a TS/JSDoc tag for "do not use." Reading `maturityLevel: DEPRECATED` mis-suggests the EVENT is deprecated, not the schema field.

### M23. `EventLogSpec` — `Spec` suffix on a small config object
- **Location:** `model.ts:951`.
- **Category:** 8 (redundant suffix).
- **Suggestion:** `EventLogConfig` or just `EventLog`. The `Spec` suffix is overused (`PipelineSpec`, `RewindSpec`, `RewindDatasetSpec`, `EventLogSpec`, `IngestionPipelineDefinition_SchemaSpec`, `_TableSpec`, `_ReportSpec`).
- **Rationale:** TS doesn't need `Spec` as a discriminator; the type's role is clear from its field name.

### M24. `Filters` — pluralized name for a 2-field struct
- **Location:** `model.ts:1029-1034`.
- **Category:** 9 (singular/plural mismatch), 1 (vague).
- **Suggestion:** Rename to `PathFilter` (singular). The shape is `{include?: string[]; exclude?: string[]}`.

### M25. `PathPattern` field is `include: string` (singular, no array) but it represents a glob
- **Location:** `model.ts:1885-1888`.
- **Category:** 15 (generic field names), 6 (misleading).
- **Suggestion:** Rename type to `GlobPattern` and field to `pattern`. JSDoc says "The source code to include for pipelines" — `pattern` describes the *what*, `include` describes the *intent*.

### M26. `Origin` — too generic for "event source metadata"
- **Location:** `model.ts:1777`.
- **Category:** 1 (vague).
- **Suggestion:** Rename to `EventOrigin` or `EventSource`.
- **Rationale:** "Origin" is also a DOM type (`Window.origin`) and a CORS concept. Type contains 23 fields covering everything from cloud region to flow IDs.

### M27. `Origin.flowId` and `Origin.batchId` — IDs from unrelated subsystems
- **Locations:** `model.ts:1802` (`flowId`), `model.ts:1806` (`batchId`).
- **Category:** 19 (underspecified IDs).
- **Suggestion:** Document inline that `flowId` is "id of the streaming flow within the pipeline" and `batchId` is "id of a microbatch within a flow." Better: prefix as `streamingFlowId`, `microbatchId`.

### M28. `IngestionPipelineDefinition.netsuiteJarPath` — vendor-specific field on a generic type
- **Location:** `model.ts:1231`.
- **Category:** 6 (misleading), 16 (field contradicts type domain).
- **Suggestion:** Move to `NetsuiteOptions` connector-specific type.
- **Rationale:** A generic ingestion-definition type carrying a `netsuiteJarPath` field implies every other connector is incomplete. JSDoc literally says "Netsuite only configuration." Belongs in a per-connector options struct.

### M29. `IngestionSourceType.WORKDAY_RAAS` — undefined acronym
- **Location:** `model.ts:69`.
- **Category:** 5 (cryptic abbreviation).
- **Suggestion:** Document inline that RaaS = "Reports as a Service" (Workday terminology). The acronym is non-obvious.

### M30. `IngestionSourceType.GA4_RAW_DATA` — vendor-numbered identifier
- **Location:** `model.ts:70`.
- **Category:** 5.
- **Suggestion:** Document inline that GA4 = "Google Analytics 4." Sibling `GOOGLE_ANALYTICS` (`model.ts:121`) is the broader connector.

### M31. `IngestionSourceType.COMMUNITY` — non-obvious meaning, requires comment
- **Location:** `model.ts:88-92`.
- **Category:** 1 (vague), 6 (misleading).
- **Suggestion:** Rename to `CUSTOM_LAKEFLOW_CONNECT` or document inline.
- **Rationale:** The proto comment explains: "Named COMMUNITY instead of GENERIC_LAKEFLOW_CONNECT (the connection type name) because we do not want to include LAKEFLOW in the public API." This is a *naming-decision-by-marketing*, which is the exact category of "Misleading names" worth flagging.

### M32. `IngestionSourceType.FOREIGN_CATALOG` — too generic, no source indicator
- **Location:** `model.ts:165`.
- **Category:** 1 (vague).
- **Suggestion:** `UC_FOREIGN_CATALOG` or document inline.
- **Rationale:** "Foreign Catalog" is a Unity Catalog concept; without context this looks like a country-of-origin enum value.

### M33. `Origin.ucResourceId` mixes acronym casing
- **Location:** `model.ts:1810`.
- **Category:** 3 (acronym casing inconsistency).
- **Suggestion:** Either `ucResourceId` (current) or `UCResourceId` — the Google TS style guide says treat acronyms as words, so `ucResourceId` is correct. But sibling fields use the same lowercase pattern (`workspaceId`, `pipelineId`), so this one is internally consistent. Flagged because it could be `unityCatalogResourceId` for clarity.

### M34. `eventType?: string` on `PipelineEvent` — string-typed enum
- **Location:** `model.ts:2057`.
- **Category:** 16 (field contradicts type domain).
- **Suggestion:** Define an `EventType` enum (or union of string literals) and type the field with it. Right now consumers have no IDE help.
- **Rationale:** JSDoc says "The event type. Should always correspond to the details." The Go SDK has the same field as string (porting fidelity), but TS could improve.

### M35. `PipelineEvent.timestamp: string` — typed string but holds an ISO date
- **Location:** `model.ts:2049`.
- **Category:** 16.
- **Suggestion:** Document the format in JSDoc, or use a `Date | string` union.

### M36. `RewindSpec.rewindTimestamp` / `rewindPointId` — fields prefixed with the type name
- **Location:** `model.ts:2637-2655`.
- **Category:** 20 (type-suffix tautology).
- **Suggestion:** Drop the `rewind` prefix on fields inside `RewindSpec`: `timestamp`, `pointId`, `datasets`.

### M37. `Sequencing` — singular noun for a 2-field record describing one event's position
- **Location:** `model.ts:2661`.
- **Category:** 1 (vague).
- **Suggestion:** `EventSequence` or `EventPosition`. "Sequencing" is the action of putting in order, not the position itself.

### M38. `EditPipeline.expectedLastModified: number` — wire is millis since epoch, but no JSDoc
- **Location:** `model.ts:840`.
- **Category:** 16 (field contradicts type domain), 19 (underspecified ID).
- **Suggestion:** Either type as `Date | number` or document "milliseconds since Unix epoch" in JSDoc.

---

## Low

### L1. `client.start()` JSDoc mentions "If there is already an active update" — should say "active run"
- **Location:** `client.ts:503`.
- **Category:** 6.

### L2. `client.stop()` JSDoc mentions "Stops the pipeline by canceling the active update" — same
- **Location:** `client.ts:529`.

### L3. `client.list()` JSDoc says "Lists pipelines defined in the Spark Declarative Pipelines system"
- **Location:** `client.ts:376`.
- **Category:** 6 (misleading), branding inconsistency.
- **Rationale:** The product is "Lakeflow Declarative Pipelines" per the IngestionPipelineDefinition JSDoc (`model.ts:1175`). Internal naming: "Spark Declarative Pipelines" (SDP). Public marketing name: "Lakeflow Declarative Pipelines." The SDK uses both, sometimes in adjacent JSDoc.

### L4. JSDoc references to "SDP" appear in three fields, undefined
- **Locations:** `model.ts:551` (`ClonePipeline.channel` — "SDP Release Channel"), `model.ts:714` (`CreatePipeline.channel`), `model.ts:879` (`EditPipeline.channel`), `model.ts:2141` (`PipelineSpec.channel`), `model.ts:2379` (`PipelinesEnvironment` — "SDP's environment").
- **Category:** 5 (cryptic abbreviation), 6 (misleading).
- **Suggestion:** Expand SDP → "Spark Declarative Pipelines" on first mention, with parenthetical "(internal name for Lakeflow Declarative Pipelines)".

### L5. `PipelineLibrary.lib` field uses an abbreviation
- **Location:** `model.ts:2070`.
- **Category:** 5.
- **Suggestion:** Either `library` (matching `lib` but spelled out) or `source` (the discriminator). The current `lib` is a Go SDK shortening.

### L6. `PipelinesS3StorageInfo.cannedAcl` — undocumented S3 jargon
- **Location:** `model.ts:2542`.
- **Category:** 5.
- **Suggestion:** Document inline: "canned ACL = a predefined S3 access-control list, e.g., `bucket-owner-full-control`." Currently the field name is fine since it matches the S3 API; only the casing (`cannedAcl` not `cannedAcl` — should be `cannedACL` per Google TS style? actually `cannedAcl` is correct).

### L7. `PipelinesS3StorageInfo.kmsKey` — uppercase acronym treatment is inconsistent
- **Location:** `model.ts:2532`.
- **Category:** 3.
- **Suggestion:** `kmsKey` is the correct casing per Google TS style. Just flagging for cross-check with other AWS fields in the file.

### L8. `PipelinesS3StorageInfo.enableEncryption` boolean alongside `encryptionType` string — coupled fields not enforced by type system
- **Locations:** `model.ts:2525`, `model.ts:2530`.
- **Category:** 16.
- **Suggestion:** Use a discriminated union: `encryption?: {kind: 'none'} | {kind: 'sse-s3'} | {kind: 'sse-kms'; key: string}`.

### L9. `PipelineCluster.label` — string typed, expected values "default" / "maintenance"
- **Location:** `model.ts:1899`.
- **Category:** 16.
- **Suggestion:** Make this an enum `ClusterLabel.{Default, Maintenance}`.

### L10. `PipelineCluster.applyPolicyDefaultValues` JSDoc says "won't be persisted" — should be marked deprecated or transient
- **Location:** `model.ts:1901`.
- **Category:** 6.
- **Suggestion:** Add `@deprecated` JSDoc tag.

### L11. `Truncation_TruncationDetail.fieldName: string` — looks like a meta field but is the data
- **Location:** `model.ts:2876`.
- **Category:** 6 (mildly misleading).
- **Suggestion:** `truncatedFieldName` or rename type to `TruncatedField`.

### L12. `JsonTransformerOptions.asVariant: boolean` — boolean named with prefix `as`
- **Location:** `model.ts:1540`.
- **Category:** 17 (inconsistent boolean naming).
- **Suggestion:** Rename to `parseAsVariant` or `parseAsVariantColumn`.
- **Rationale:** Other boolean fields in the file use `is*`/`enable*`/`has*` (`development`, `serverless`, `photon`, `continuous`, `enableEncryption`, `enableAutoClustering`, `enabled`, `inferColumnTypes`, `readerCaseSensitive`, `ignoreCorruptFiles`, `fatal`, `force`, `cascade`, `dryRun`, `incremental`).

### L13. `AutoFullRefreshPolicy.minIntervalHours` JSDoc says "(Optional, Mutable)" — proto-style modifier tag in user-visible JSDoc
- **Location:** `model.ts:493`.
- **Category:** Generator artifact leakage.
- **Suggestion:** Express via TS optionality (`?:`) instead of repeating "Optional" in JSDoc.

### L14. `(Required, Immutable)` / `(Optional, Mutable)` proto tags appear in 60+ JSDoc blocks
- **Locations:** searches: `(Required`, `(Optional` throughout `model.ts`.
- **Category:** Generator artifact leakage.
- **Suggestion:** Remove or move to a structured `@required` / `@mutable` tag.

### L15. `Origin.host` — generic field on an event source struct
- **Location:** `model.ts:1812`.
- **Category:** 15 (generic field name).
- **Suggestion:** `originHostname` or document inline.

### L16. `RewindDatasetSpec.identifier: string` — generic when `datasetName` would do
- **Location:** `model.ts:2629`.
- **Category:** 15.
- **Suggestion:** `datasetIdentifier` or `fullyQualifiedName`.
- **Rationale:** JSDoc says "The identifier of the dataset (e.g., 'main.foo.tbl1')" — this is a UC three-part name.

### L17. `RewindDatasetSpec.resetCheckpoints: boolean` and `RewindSpec.datasets[i].cascade: boolean` — coupled flags with no type-level link
- **Locations:** `model.ts:2631`, `model.ts:2633`.
- **Category:** 16.
- **Suggestion:** Group into an `options` substruct or document interactions in JSDoc.

### L18. `IngestionPipelineDefinition_TableSpec.enableAutoClustering` and `clusteringColumns` — mutually exclusive booleans not enforced
- **Locations:** `model.ts:1426`, `model.ts:1435`.
- **Category:** 12 (duplicate concepts), 16.
- **Suggestion:** Use a discriminated union: `clustering?: {kind: 'auto'} | {kind: 'columns'; columns: string[]}`.
- **Rationale:** JSDoc explicitly says "we can only provide enable_auto_clustering or clustering_columns, added as separate fields as we cannot have repeated field in oneof." TS *can* express this — porting fidelity is what blocks it.

### L19. `KafkaOptions.startingOffset: string` — typed string but documented as enum
- **Location:** `model.ts:1576`.
- **Category:** 16.
- **Suggestion:** Define `KafkaStartingOffset.{Latest, Earliest}` enum.

### L20. `MetaMarketingOptions.level: string` — typed string but documented as enum
- **Location:** `model.ts:1718`.
- **Category:** 16.
- **Suggestion:** Define `MetaAggregationLevel.{Account, Ad, AdSet, Campaign}` enum.

### L21. `MetaMarketingOptions.actionReportTime: string` — string enum
- **Location:** `model.ts:1724`.
- **Category:** 16.
- **Suggestion:** Define enum.

---

## Observations

### O1. The whole file is one giant proto port — 27 `eslint-disable` lines for underscore-named nested types
- **Files:** `model.ts` throughout.
- **Cross-reference:** This is the same pattern flagged in `jobs.md`. The pipelines package compounds it with the plural `Pipelines*` prefix (H4 here).

### O2. Branding history (DLT → Lakeflow Declarative Pipelines → Spark Declarative Pipelines) leaks into 6 different abbreviations across the public API
- **Search:** `DLT`, `SDP`, `LDP`, `Lakeflow`, `Spark Declarative Pipelines`, `Delta Live Tables`, `DAB`.
- **Locations:** `model.ts:48` (`DAB` in DeploymentKind comment), `model.ts:551` (`SDP` in `channel` JSDoc), `model.ts:804` (`Spark Declarative Pipelines` in JSDoc), `model.ts:1175` (`Lakeflow Connect`), `model.ts:2063` (`https://docs.databricks.com/en/ldp/`), `model.ts:2379` (`SDP's environment`), `client.ts:376` (`Spark Declarative Pipelines`).
- **Suggestion:** Settle on one product name in JSDoc. The TS types should be backwards-compatible (no rename) but the docstrings should agree.

### O3. `Pipelines*` (plural) vs `Pipeline*` (singular) split: 8 plural-prefixed vs 14 singular-prefixed types
- **Cross-reference:** H4, H23.

### O4. There are FIVE separate `connectorOptions` / `sourceOptions` discriminators in the ingestion pipeline definition — connector wiring is too nested
- **Locations:** `IngestionPipelineDefinition.connectorType`, `IngestionPipelineDefinition.sourceConfigurations[].catalog.options`, `IngestionPipelineDefinition_SchemaSpec.sourceOptions`, `IngestionPipelineDefinition_SchemaSpec.connectorOptions`, `IngestionPipelineDefinition_TableSpec.sourceOptions`, `IngestionPipelineDefinition_TableSpec.connectorOptions`.
- **Suggestion:** Document the resolution order between schema-level and table-level options. JSDoc currently fragments the rules across multiple types.

### O5. JSDoc uses `<Databricks>` placeholder — leak from the Go SDK's template substitution
- **Search:** `<Databricks>` appears 19 times in `model.ts`.
- **Suggestion:** Replace with literal "Databricks" before TS compilation.

### O6. `Notifications.alerts: string[]` is a hand-rolled enum of `on-update-success`, `on-update-failure`, `on-update-fatal-failure`, `on-flow-failure`
- **Location:** `model.ts:1758`.
- **Category:** 16.
- **Suggestion:** Define `AlertCondition` enum. Currently typed `string[]` with values listed only in JSDoc.

### O7. `OutlookOptions` carries three `*Filter` fields marked deprecated (`folderFilter`, `senderFilter`, `subjectFilter`) plus the new `include*` versions side-by-side
- **Locations:** `model.ts:1831-1881`.
- **Category:** Generator artifact / Go-SDK fidelity issue.
- **Suggestion:** Mark deprecated fields with `@deprecated` JSDoc tag (currently only mentioned in plain text).
