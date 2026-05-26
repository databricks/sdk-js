# Naming Audit: experiments

**Path:** `packages/experiments/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Experiments — track Experiments (named containers), Runs (single executions, with metrics/params/tags/artifacts/datasets/model inputs/outputs), LoggedModels (versioned model artifacts attached to a Run), and the surrounding CRUD (create/get/list/search/restore/delete/update/log).
**Total weird names flagged:** 34

## Summary
| Severity | Count |
| --- | --- |
| High | 12 |
| Medium | 11 |
| Low | 8 |
| Observation | 3 |

## High severity

### 1. Package name `experiments` is too generic — `packages/experiments/`
- **Why weird:** The package is the MLflow Experiment Tracking API surface, but the package name says only "experiments". Other Databricks SDK packages own equally fuzzy nouns (`apps`, `catalogs`, `database`, `cleanrooms`) — so a reader cannot tell from `@databricks/sdk-experiments` that this is MLflow. The folder contains MLflow `Run`, `Metric`, `Param`, `Tag`, `LoggedModel` — none of which a typical Databricks user thinks of as "experiments" first. Every URL the client builds is `/api/2.0/mlflow/…`.
- **Category:** 1 (generic), 6 (misleading: name does not say MLflow).
- **Suggested name:** `mlflow`, `mlflow-tracking`, or `mlflow-experiments`. At minimum, add a JSDoc on `index.ts` saying "MLflow tracking — experiments, runs, logged models".
- **Rationale:** Every other identifier inside the package treats MLflow as the controlling brand (`mlflowParam`, `mlflowMetric`, `mlflowRunTag` appear in docstrings). The package name buries that.

### 2. `Run` — `src/v1/model.ts:701`
- **Why weird:** The central noun is named `Run`. `Run` is a reserved-feeling word in any JS context: `Promise.all().run()`, test framework "runs", workflow "runs". The user has zero context that this is an MLflow Run (a tracked execution of a training/eval script with metrics/params/artifacts). Compare with `jobs.Run` (already a different concept in this SDK) and `pipelines.Run`.
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages — `jobs.Run`, `pipelines.Run`), 15 (generic field/type name losing meaning).
- **Suggested name:** `MlflowRun` or `ExperimentRun`. Re-export the alias and deprecate `Run`.
- **Rationale:** When a consumer writes `import {Run} from '@databricks/sdk-experiments/v1'` they may already have `Run` in scope from `@databricks/sdk-jobs/v2`. The two have unrelated schemas. Disambiguating the type name removes a foot-gun.

### 3. `Experiment` — `src/v1/model.ts:219`
- **Why weird:** Same generic-noun problem as #2. `Experiment` is a generic English word; this is specifically an MLflow Experiment (named container of MLflow Runs with a UUID and a UC artifact-location). Multiple Databricks teams may legitimately have "experiment" types in the future (notebooks?, lakehouse-experiments?).
- **Category:** 1 (generic), 15 (generic name).
- **Suggested name:** `MlflowExperiment`.
- **Rationale:** Same as #2 — disambiguating the package's central noun against future Databricks "experiments" features prevents conflicts.

### 4. `Metric` / `Param` / `Run` / `Experiment` — all single-word top-level types — `src/v1/model.ts:219,612,656,701`
- **Why weird:** Four central types are bare nouns (`Metric`, `Param`, `Run`, `Experiment`). All four will collide with names in scope at the user's call site. None says "MLflow". `Param` in particular collides with React Router `Params`, Express `Params`, Node `URLSearchParams`, etc.
- **Category:** 1 (vague), 10 (reserved-word adjacent), 12 (duplicate concept against React/Node `Params`).
- **Suggested name:** `MlflowMetric`, `MlflowParam`, `MlflowRun`, `MlflowExperiment` — or namespace under `Mlflow.{Metric, Param, Run, Experiment}`.
- **Rationale:** Even MLflow's own protobuf calls these `mlflow.Run`, `mlflow.Experiment`, `mlflow.Metric` — they assume a namespace. Flattening them into TS without one loses that disambiguation.

### 5. `LoggedModel` — `src/v1/model.ts:549`
- **Why weird:** `LoggedModel` is a noun-phrase made of past-participle adjective + noun. The "logged" prefix is doing the disambiguation against `RegisteredModel`, `ServingModel`, `MlflowModel` etc. But (a) past-tense adjectives in type names read awkwardly (`LoggedModel`, `DeletedExperiment`, `FinishedRun` would all be similarly weird), and (b) `Logged` does not describe what the type *is* — it describes the verb history that produced it.
- **Category:** 6 (misleading: "Logged" describes history, not identity), 13 (verb-tense in noun-phrase).
- **Suggested name:** `MlflowModel`, `TrackedModel`, or `RunModel` (since every `LoggedModel` belongs to a Run via `sourceRunId`).
- **Rationale:** `LoggedModel` is a leaky verb. Type names should be present-tense nouns describing identity ("what it is"). Lots of `Logged*` derivatives compound the problem (see #6).

### 6. `LoggedModel` family — many separate types — `src/v1/model.ts:549, 557, 568, 596, 604` + request/response — `model.ts:72, 161, 169, 257, 303, 464, 803, 921`
- **Why weird:** `LoggedModel`, `LoggedModelData`, `LoggedModelInfo`, `LoggedModelParameter`, `LoggedModelTag`, `LoggedModelStatus`, plus request types `CreateLoggedModelRequest`, `DeleteLoggedModelRequest`, `DeleteLoggedModelTagRequest`, `FinalizeLoggedModelRequest`, `GetLoggedModelRequest`, `LogLoggedModelParamsRequest`, `SearchLoggedModelsRequest`, `SetLoggedModelTagsRequest`. The `LoggedModel` prefix is repeated 13 times across types that all live in the same package. Compare to `Run` family — `Run`, `RunInfo`, `RunData`, `RunInputs`, `RunTag`, `RunStatus` — which uses the shorter prefix.
- **Category:** 7 (overly verbose), 12 (duplicate concept against `Model*` family that may exist in `modelregistry` package).
- **Suggested name:** Either drop the `Logged` and call the family `MlflowModel` / `MlflowModelData` / `MlflowModelInfo` / `MlflowModelParameter` / `MlflowModelTag` / `MlflowModelStatus`, or nest under a namespace.
- **Rationale:** 13 occurrences of "LoggedModel" in identifiers — almost every `LoggedModel` request type repeats the verb prefix unnecessarily.

### 7. `LoggedModelParameter` vs `Param` — inconsistent abbreviation for the same concept — `src/v1/model.ts:596` vs `model.ts:656`
- **Why weird:** Two distinct types both model `{key: string, value: string}` parameter pairs: `LoggedModelParameter` (for a `LoggedModel`) and `Param` (for a `Run`). JSDoc at line 595 says "Parameter associated with a `LoggedModel`" and at 655 "Param associated with a run". Why one type is spelled out (`Parameter`) and the other abbreviated (`Param`) is unexplained.
- **Category:** 12 (duplicate concept), 17 (inconsistent abbreviation: `Parameter` vs `Param`).
- **Suggested name:** Align the abbreviation: either both `Parameter` or both `Param`.
- **Rationale:** The difference between `Run.params: Param[]` and `LoggedModel.data.params: LoggedModelParameter[]` is cosmetic — the underlying shape is identical.

### 8. `ExperimentTag` / `RunTag` / `InputTag` / `LoggedModelTag` — four tag types for the same shape — `src/v1/model.ts:240, 364, 604, 765`
- **Why weird:** Four `{key: string, value: string}` types, one per parent entity. All four have identical shapes. The only differentiator is the parent entity — but the type itself is indistinguishable.
- **Category:** 12 (duplicate concept × 4).
- **Suggested name:** Adopt a single parent prefix convention so `MlflowTag` (or `Mlflow.Tag`) carries the shared shape, with parent-specific variants only when fields actually diverge.
- **Rationale:** An end-user picking the wrong tag type (`InputTag` vs `RunTag` etc.) will not get a compile error because they have the same shape.

### 9. `RunData`, `RunInfo`, `RunInputs` triplet — `src/v1/model.ts:701, 711, 721, 757`
- **Why weird:** `Run` contains three sub-types: `RunInfo`, `RunData`, `RunInputs`. None of the names tells the user what each one carries: `RunData` is "metrics, params, tags" (`model.ts:710-718`), `RunInfo` is "id, name, status, times, user" (`model.ts:720-754`), `RunInputs` is "datasetInputs, modelInputs" (`model.ts:756-762`). All three names are interchangeably vague. The Go SDK splits the same way — but in TS we can flatten.
- **Category:** 1 (vague: `Data`/`Info`/`Inputs`), 15 (generic field name).
- **Suggested name:** Flatten into `Run` (one object). If they must stay split, name them by content: `RunMetadata` (instead of `RunInfo`), `RunMeasurements` (instead of `RunData`), `RunDatasetsAndModels` (instead of `RunInputs`).
- **Rationale:** `RunInfo` vs `RunData` requires the reader to look up the schema to know which fields go where. Naming by content removes that lookup.

### 10. `LoggedModelInfo` vs `LoggedModelData` — `src/v1/model.ts:568, 557`
- **Why weird:** Same `Info`/`Data` split as `Run` (#9). `LoggedModelInfo` is "attributes, tags, registration info"; `LoggedModelData` is "params and metrics". Same generic-suffix problem.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `MlflowModelMetadata` and `MlflowModelMeasurements`, or fold both into one `MlflowModel`.
- **Rationale:** Same as #9.

### 11. `KILLED` enum value — `src/v1/model.ts:36`
- **Why weird:** `RunStatus.KILLED` reads aggressively. MLflow's own term is `KILLED` (preserved here from the wire format), but "killed" is uncommon in API-design vocabulary outside of Unix signals. `Cancelled`, `Aborted`, `Stopped` are typical English equivalents. The JSDoc says "Run killed by user."
- **Category:** 6 (misleading — sounds like an error, but it is a user-initiated state), 18 (uncommon enum value), 17 (inconsistent verb tense with `RUNNING` / `SCHEDULED` — `KILLED` is past tense of an active verb).
- **Suggested name:** `RunStatus.Cancelled` (TS) with wire-value remaining `KILLED`. Match the rest: `Running`, `Scheduled`, `Finished`, `Failed`, `Cancelled`.
- **Rationale:** `Cancelled` is the dominant industry term for user-initiated termination (HTTP `499 Client Closed Request`, GRPC `CANCELLED`, etc.).

### 12. `ViewType` enum — generic name + inconsistent field names for the same enum — `src/v1/model.ts:40-47`
- **Why weird:** Type name `ViewType` is meaningless on its own ("a type of view"). The same enum is used as `viewType` on `ListExperimentsRequest` (model.ts:405), `runViewType` on `SearchRunsRequest` (model.ts:886), and `viewType` on `SearchExperimentsRequest` (model.ts:789) — two fields named `viewType` and one named `runViewType` for the same enum.
- **Category:** 1 (generic name), 17 (inconsistent field names — `viewType` vs `runViewType` for the same enum).
- **Suggested name:** Type: `ExperimentVisibility` or `LifecycleFilter`. Field name: pick one (`viewType` everywhere, or rename uniformly).
- **Rationale:** A field that means "filter experiments/runs by deleted state" is more searchable as `lifecycleFilter`.

## Medium severity

### 13. `getMetricHistory` / `GetMetricHistoryRequest` — request type uses verb-noun, response is paginated metrics — `src/v1/model.ts:314, client.ts:594`
- **Why weird:** Type name `GetMetricHistoryRequest` reads as a verb phrase, not a noun. All other request types use verb-phrase names (`GetRunRequest`, `DeleteExperimentRequest`) so this is internally consistent, but it does conflict with the convention `Verb + EntityName` (because "history" is not the entity — `Metric` is). The response field is `metrics: Metric[]` — so "metric history" really means "page of historical metric values for a single metric_key".
- **Category:** 1 (vague: "history" is non-specific), 6 (misleading: "metric history" sounds like an aggregate, returns a page of `Metric` rows).
- **Suggested name:** `GetMetricValuesRequest` / `getMetricValues`, or `ListMetricHistoryRequest` / `listMetricHistory` (since it paginates).
- **Rationale:** The verb `get` paired with a paginated response is misleading — all other paginated endpoints use `list` or `search` (e.g. `listExperiments`, `searchRuns`). This one is the odd one out.

### 14. `runUuid` deprecated field appears on many types — `src/v1/model.ts:321, 354, 378, 481, 535, 728, 938, 965`
- **Why weird:** Multiple types/methods carry a `runUuid?: string` field with the comment `[Deprecated, use 'run_id' instead] ID of the run ...`. There is no `@deprecated` JSDoc tag — the deprecation is buried in prose. The TS port translated `run_uuid` (snake_case wire) into `runUuid` (camelCase) so the deprecation comment's `run_id` reference does not match the TS field name (`runId`) the user would actually use.
- **Category:** 6 (misleading prose), 19 (underspecified ID: `runUuid` vs `runId` for the same thing), 17 (inconsistent ID style).
- **Suggested name:** Either remove the deprecated field from the TS surface (since the Go SDK keeps it for wire-compat, TS could omit) or add `@deprecated` JSDoc.
- **Rationale:** If a user passes both `runId` and `runUuid` the API picks `runId`; the TS surface should make `runUuid` impossible to autocomplete.

### 15. `creatorId: number` (not string) — `src/v1/model.ts:584`
- **Why weird:** `LoggedModelInfo.creatorId` is typed as `number | undefined` — every other ID in the package is `string` (`experimentId`, `runId`, `modelId`, `sourceRunId`). The JSDoc says "The ID of the user or principal that created the model."
- **Category:** 16 (field contradicting type domain), 17 (inconsistent ID type), 19 (underspecified ID).
- **Suggested name:** Either align as `string` (most likely the wire really is a numeric user-id but TS-side string is safer for large ints) or rename to `creatorIdNumeric` to flag the divergence.
- **Rationale:** If the user-id ever exceeds `Number.MAX_SAFE_INTEGER`, this field silently corrupts. All other Databricks SDK packages use `string` for IDs (e.g. `databricks/sdk-iam` uses `id: string`).

### 16. `modelId` ambiguity in `Metric` — `src/v1/model.ts:632-636`
- **Why weird:** `Metric.modelId` doc: "The ID of the **logged model or registered model version** associated with the metric, if applicable." So one field carries IDs from two different domains (LoggedModel from this package + RegisteredModelVersion from `mlmodels`/`modelregistry` package). The type cannot tell them apart.
- **Category:** 6 (misleading — same string field holds two ID kinds), 19 (underspecified ID).
- **Suggested name:** Split into `loggedModelId?: string` and `registeredModelVersionId?: string`, or carry a discriminator (`{kind: 'logged' | 'registered', id: string}`).
- **Rationale:** Heterogeneous string ID fields are debugging traps.

### 17. `LoggedModelInfo.modelId` doc vs `LoggedModel.info.modelId` access pattern — `src/v1/model.ts:549-554, 568-573`
- **Why weird:** To get a model's own ID, you have to write `loggedModel.info?.modelId`. The natural place would be `loggedModel.id` or `loggedModel.modelId`. The split between `info` and `data` (#10) buries the ID one level deep.
- **Category:** 15 (generic field name losing meaning), 7 (verbose access).
- **Suggested name:** Hoist `modelId` to `LoggedModel.id` (typescript can keep `info` for the rest).
- **Rationale:** Awkward access pattern.

### 18. `LogLoggedModelParamsRequest` — verb-noun-verb compound — `src/v1/model.ts:464`
- **Why weird:** Parses as: Log (verb) + LoggedModel (noun) + Params (noun) + Request (suffix). Read aloud as "Log Logged Model Params Request". Three nouns/verbs strung together. The verb `Log` collides with the participle adjective `Logged` (they have the same root) inside the same identifier. Method is `logLoggedModelParams` (`client.ts:916`).
- **Category:** 7 (overly verbose), 17 (verb collision), 6 (reads awkwardly).
- **Suggested name:** `AddMlflowModelParamsRequest` + `addMlflowModelParams`, or `LogParamsForModelRequest` + `logParamsForModel`, or drop `Logged` once the rename in #6 is applied: `LogMlflowModelParamsRequest`.
- **Rationale:** The double-Log is jarring on read.

### 19. `setLoggedModelTags` is plural but `setExperimentTag` is singular — `src/v1/client.ts:1280, 1309`
- **Why weird:** `setExperimentTag(req: SetExperimentTagRequest)` sets **one** tag. `setLoggedModelTags(req: SetLoggedModelTagsRequest)` sets a batch. Same verb, different cardinality. Method `setTag` (run tag) is also singular. No `setExperimentTags` or `setRunTags` exists.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verb cardinality).
- **Suggested name:** Either add bulk variants for experiment/run, or rename to be explicit: `setLoggedModelTagsBatch`, or pluralise all (`setExperimentTags`, `setRunTags`, `setLoggedModelTags`).
- **Rationale:** Cardinality should be predictable from the method name.

### 20. `setExperimentTag` URL has double "set-experiment-tag" — `src/v1/client.ts:1280`
- **Why weird:** URL is `/api/2.0/mlflow/experiments/set-experiment-tag`. The path already says `experiments/` so the segment `set-experiment-tag` repeats "experiment". Other methods use `experiments/set` / `experiments/create` style. Not a TS naming issue per se but caller-visible if someone logs the URL.
- **Category:** Observation (URL design upstream).

### 21. `logBatch` does not say "log run batch" — `src/v1/client.ts:860`
- **Why weird:** `logBatch` is a batch-write of metrics/params/tags **to a run**. Name says "batch" but not "what gets batched" or "what scope". From the method name alone, a user might think this is "batch-log many experiments" or "batch-log many metrics across many runs". JSDoc clarifies.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `logRunBatch`, `logRunMetadata`, or `logRunMeasurements`.

### 22. `logInputs` vs `logOutputs` vs `logParam` vs `logMetric` vs `logBatch` vs `logModel` vs `logLoggedModelParams` — 7 different `log*` verbs — `src/v1/client.ts`
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

### 23. `LogInputsRequest.datasets` vs `LogInputsRequest.models` field names — `src/v1/model.ts:452-459`
- **Why weird:** Two parallel fields with different abstraction levels: `datasets` is `DatasetInput[]` (carries tags + dataset), `models` is `ModelInput[]` (only model id). The names don't hint at this asymmetry.
- **Category:** 15 (generic field name losing structure).

## Low severity

### 24. `Experiment.tags` / `LoggedModelInfo.tags` / `RunData.tags` / `RunInputs` no tags — `src/v1/model.ts:236, 592, 717`
- **Why weird:** Three top-level types have a `tags` field but each uses a different element type (`ExperimentTag` / `LoggedModelTag` / `RunTag`) — see #8. The field is consistently `tags`, but the element type is not unifiable in TS without changes.
- **Category:** 17 (inconsistency at the element-type level).

### 25. Boolean field `FileInfo.isDir` — `src/v1/model.ts:252`
- **Why weird:** Naming-wise `isDir` is fine, but the boolean is paired with `fileSize?: number | undefined` where the JSDoc says "Unset for directories" — i.e. `fileSize` is a discriminator partner that should be excluded when `isDir === true`. No discriminated union enforces this.
- **Category:** 6 (misleading optionality), 16 (field contradicts domain in the file-vs-directory case).
- **Suggested name:** Model as `type FileInfo = { path: string } & ({ isDir: true } | { isDir: false; fileSize: number })`.

### 26. `FileInfo` itself is a generic name — `src/v1/model.ts:248`
- **Why weird:** `FileInfo` is generic — many SDKs have a `FileInfo` type. This one is specifically an MLflow Run artifact entry.
- **Category:** 1 (generic), 12 (likely duplicate of `dbsql/v1` or `workspace/v1` FileInfo).
- **Suggested name:** `RunArtifact` or `ArtifactFileInfo`.

### 27. `executeCall` / `executeHttpCall` — two execute verbs in `utils.ts` — `src/v1/utils.ts:26, 65`
- **Why weird:** `executeCall` is the public retrier+rate-limit wrapper; `executeHttpCall` is the inner HTTP send. The names differ by one word and roles are not obvious from the name.
- **Category:** 17 (inconsistency), 6 (misleading: both look like the entry point).
- **Suggested name:** `executeWithRetry` and `sendHttpRequest` (or `dispatch`).

### 28. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** `HttpCallOptions` is the parameter bag for `executeHttpCall`; it carries a `request`, `httpClient`, `logger`. Name is fine but `Options` is a common suffix that may collide with `CallOptions` from `@databricks/sdk-options/call` imported on the same file (line 12).
- **Category:** 17 (collision risk with `CallOptions`).

### 29. `flattenQueryParams` — only used internally — `src/v1/utils.ts:123`
- **Why weird:** Exported `flattenQueryParams` is dead code in `experiments` — no method in `client.ts` calls it. (Searched the file; query string assembly is done inline in `getMetricHistory`, `listArtifacts`, etc.)
- **Category:** Observation (dead export).

### 30. `PACKAGE_SEGMENT` constant in `client.ts:161` — `src/v1/client.ts:161`
- **Why weird:** Top-level constant `PACKAGE_SEGMENT` is SCREAMING_SNAKE_CASE — the only TS identifier in `client.ts` using that style. Comment on the line says it's used for the User-Agent header.
- **Category:** 17 (inconsistency in identifier case across the file).
- **Suggested name:** `packageSegment` per TS conventions.

### 31. `PACKAGE_SEGMENT.key` derived by regex from `pkgJson.name` — `src/v1/client.ts:162`
- **Why weird:** The expression `pkgJson.name.replace(/^@[^/]+\//, '')` extracts `sdk-experiments` from `@databricks/sdk-experiments`. The resulting User-Agent segment is `sdk-experiments/0.0.0`. The literal `sdk-experiments` is then user-visible in HTTP traces. The same generic-name problem as #1.
- **Category:** 1 (generic name leaking into observability).

## Observations (non-actionable but noted)

### 32. `Dataset.source` doc — "Note that the source may not exactly reproduce..." — `src/v1/model.ts:127-130`
- **Note:** The field name `source` is generic; JSDoc says it may not actually be reproducible. The name does not warn the user that the field is best-effort.

### 33. `Experiment.lifecycleStage` is typed as `string` not `enum` — `src/v1/model.ts:230`
- **Note:** Doc says: `Current life cycle stage of the experiment: "active" or "deleted"`. Wire returns a closed set. TS type is `string | undefined` — no enum. Suggested: `lifecycleStage?: 'active' | 'deleted'` or `LifecycleStage` enum.

### 34. `RUNNING` / `SCHEDULED` / `FINISHED` / `FAILED` / `KILLED` — wire-stable enum values — `src/v1/model.ts:28-36`
- **Note:** Wire values match the server's MLflow contract — they cannot be renamed without a wire-protocol break. Any rename would need to be TS-side only (with a marshaller mapping).
