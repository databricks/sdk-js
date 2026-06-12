# Naming Audit: experiments

**Path:** `packages/experiments/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 4 |
| Low | 2 |

## High severity

### 1. `LoggedModel` — `src/v1/model.ts:547`
- **Why weird:** `LoggedModel` is a noun-phrase made of past-participle adjective + noun. The "logged" prefix is doing the disambiguation against `RegisteredModel`, `ServingModel`, `MlflowModel` etc. But (a) past-tense adjectives in type names read awkwardly (`LoggedModel`, `DeletedExperiment`, `FinishedRun` would all be similarly weird), and (b) `Logged` does not describe what the type *is* — it describes the verb history that produced it.
- **Category:** 6 (misleading: "Logged" describes history, not identity), 13 (verb-tense in noun-phrase).
- **Suggested name:** `MlflowModel`, `TrackedModel`, or `RunModel` (since every `LoggedModel` belongs to a Run via `sourceRunId`).
- **Rationale:** `LoggedModel` is a leaky verb. Type names should be present-tense nouns describing identity ("what it is"). Lots of `Logged*` derivatives compound the problem (see #2).

### 2. `LoggedModel` family — many separate types — `src/v1/model.ts:547, 555, 566, 594, 602` + request/response — `model.ts:81, 168, 176, 263, 306, 462, 799, 915`
- **Why weird:** `LoggedModel`, `LoggedModelData`, `LoggedModelInfo`, `LoggedModelParameter`, `LoggedModelTag`, `LoggedModelStatus`, plus request types `CreateLoggedModelRequest`, `DeleteLoggedModelRequest`, `DeleteLoggedModelTagRequest`, `FinalizeLoggedModelRequest`, `GetLoggedModelRequest`, `LogLoggedModelParamsRequest`, `SearchLoggedModelsRequest`, `SetLoggedModelTagsRequest`. The `LoggedModel` prefix is repeated 13 times across types that all live in the same package. Compare to `Run` family — `Run`, `RunInfo`, `RunData`, `RunInputs`, `RunTag`, `RunStatus` — which uses the shorter prefix.
- **Category:** 7 (overly verbose), 12 (duplicate concept against `Model*` family that may exist in `modelregistry` package).
- **Suggested name:** Either drop the `Logged` and call the family `MlflowModel` / `MlflowModelData` / `MlflowModelInfo` / `MlflowModelParameter` / `MlflowModelTag` / `MlflowModelStatus`, or nest under a namespace.
- **Rationale:** 13 occurrences of "LoggedModel" in identifiers — almost every `LoggedModel` request type repeats the verb prefix unnecessarily.

### 3. `RunData`, `RunInfo`, `RunInputs` triplet — `src/v1/model.ts:698, 708, 718, 754`
- **Why weird:** `Run` contains three sub-types: `RunInfo`, `RunData`, `RunInputs`. None of the names tells the user what each one carries: `RunData` is "metrics, params, tags" (`model.ts:707-715`), `RunInfo` is "id, name, status, times, user" (`model.ts:717-751`), `RunInputs` is "datasetInputs, modelInputs" (`model.ts:753-759`). All three names are interchangeably vague. The Go SDK splits the same way — but in TS we can flatten.
- **Category:** 1 (vague: `Data`/`Info`/`Inputs` type names).
- **Suggested name:** Flatten into `Run` (one object). If they must stay split, name them by content: `RunMetadata` (instead of `RunInfo`), `RunMeasurements` (instead of `RunData`), `RunDatasetsAndModels` (instead of `RunInputs`).
- **Rationale:** `RunInfo` vs `RunData` requires the reader to look up the schema to know which fields go where. Naming by content removes that lookup.

### 4. `LoggedModelInfo` vs `LoggedModelData` — `src/v1/model.ts:566, 555`
- **Why weird:** Same `Info`/`Data` split as `Run` (#3). `LoggedModelInfo` is "attributes, tags, registration info"; `LoggedModelData` is "params and metrics". Same generic-suffix problem on the type names.
- **Category:** 1 (vague).
- **Suggested name:** `MlflowModelMetadata` and `MlflowModelMeasurements`, or fold both into one `MlflowModel`.
- **Rationale:** Same as #3.

### 5. `ViewType` enum — generic type name — `src/v1/model.ts:47-57`
- **Why weird:** Type name `ViewType` is meaningless on its own ("a type of view"). It is the enum used to filter experiments/runs by deleted state.
- **Category:** 1 (generic type name).
- **Suggested name:** Type: `ExperimentVisibility` or `LifecycleFilter`.
- **Rationale:** `ViewType` gives no hint that it selects experiments/runs by lifecycle/deleted state; a domain type name like `LifecycleFilter` is more searchable.

## Medium severity

### 6. `LogLoggedModelParamsRequest` — verb-noun-verb compound — `src/v1/model.ts:462`
- **Why weird:** Parses as: Log (verb) + LoggedModel (noun) + Params (noun) + Request (suffix). Read aloud as "Log Logged Model Params Request". Three nouns/verbs strung together. The verb `Log` collides with the participle adjective `Logged` (they have the same root) inside the same identifier. Method is `logLoggedModelParams` (`client.ts:966`).
- **Category:** 7 (overly verbose), 17 (verb collision), 6 (reads awkwardly).
- **Suggested name:** `AddMlflowModelParamsRequest` + `addMlflowModelParams`, or `LogParamsForModelRequest` + `logParamsForModel`, or drop `Logged` once the rename in #2 is applied: `LogMlflowModelParamsRequest`.
- **Rationale:** The double-Log is jarring on read.

### 7. `setLoggedModelTags` is plural but `setExperimentTag` is singular — `src/v1/client.ts:1392, 1362`
- **Why weird:** `setExperimentTag(req: SetExperimentTagRequest)` sets **one** tag. `setLoggedModelTags(req: SetLoggedModelTagsRequest)` sets a batch. Same verb, different cardinality. Method `setTag` (run tag) is also singular. No `setExperimentTags` or `setRunTags` exists.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verb cardinality).
- **Suggested name:** Either add bulk variants for experiment/run, or rename to be explicit: `setLoggedModelTagsBatch`, or pluralise all (`setExperimentTags`, `setRunTags`, `setLoggedModelTags`).
- **Rationale:** Cardinality should be predictable from the method name.

### 8. `logBatch` does not say "log run batch" — `src/v1/client.ts:902`
- **Why weird:** `logBatch` is a batch-write of metrics/params/tags **to a run**. Name says "batch" but not "what gets batched" or "what scope". From the method name alone, a user might think this is "batch-log many experiments" or "batch-log many metrics across many runs". JSDoc clarifies.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `logRunBatch`, `logRunMetadata`, or `logRunMeasurements`.

### 9. `logInputs` vs `logOutputs` vs `logParam` vs `logMetric` vs `logBatch` vs `logModel` vs `logLoggedModelParams` — 7 different `log*` verbs — `src/v1/client.ts`
- **Why weird:** Seven log* methods with no consistent grammar:
  - `logBatch` (multiple of {metric, param, tag} on a run)
  - `logInputs` (datasets + models for a run)
  - `logMetric` (one metric on a run)
  - `logModel` (deprecated)
  - `logOutputs` (models from a run)
  - `logParam` (one param on a run)
  - `logLoggedModelParams` (params for a LoggedModel)
- All 7 differ in cardinality, scope, and parent entity. The method names give no hint about which one to use.
- **Category:** 17 (inconsistency), 7 (verbose `logLoggedModelParams`).
- **Suggested name:** Adopt a `log<Entity>[ToRun|ToModel]` pattern uniformly. e.g. `logMetricToRun`, `logParamToRun`, `logBatchToRun`, `logInputsToRun`, `logOutputsFromRun`, `logParamsToModel`. Verbose, but unambiguous.
- **Rationale:** The current set is internally inconsistent. The Go SDK has the same problem; TS can normalize.

## Low severity

### 10. Boolean field `FileInfo.isDir` — `src/v1/model.ts:258`
- **Why weird:** Naming-wise `isDir` is fine, but the boolean is paired with `fileSize?: bigint | undefined` where the JSDoc says "Unset for directories" — i.e. `fileSize` is a discriminator partner that should be excluded when `isDir === true`. No discriminated union enforces this.
- **Category:** 6 (misleading optionality), 16 (field contradicts domain in the file-vs-directory case).
- **Suggested name:** Model as `type FileInfo = { path: string } & ({ isDir: true } | { isDir: false; fileSize: bigint })`.

### 11. `FileInfo` itself is a generic name — `src/v1/model.ts:254`
- **Why weird:** `FileInfo` is generic — many SDKs have a `FileInfo` type. This one is specifically an MLflow Run artifact entry.
- **Category:** 1 (generic), 12 (likely duplicate of `dbsql/v1` or `workspace/v1` FileInfo).
- **Suggested name:** `RunArtifact` or `ArtifactFileInfo`.
