# Naming Audit: experiments

**Path:** `packages/experiments/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Experiments — track Experiments (named containers), Runs (single executions, with metrics/params/tags/artifacts/datasets/model inputs/outputs), LoggedModels (versioned model artifacts attached to a Run), and the surrounding CRUD (create/get/list/search/restore/delete/update/log).
**Total weird names flagged:** 63

## Summary
| Severity | Count |
| --- | --- |
| High | 18 |
| Medium | 25 |
| Low | 14 |
| Observation | 6 |

## High severity

### 1. Package name `experiments` is too generic — `packages/experiments/`
- **Why weird:** The package is the MLflow Experiment Tracking API surface, but the package name says only "experiments". Other Databricks SDK packages own equally fuzzy nouns (`apps`, `catalogs`, `database`, `cleanrooms`) — so a reader cannot tell from `@databricks/sdk-experiments` that this is MLflow. The folder contains MLflow `Run`, `Metric`, `Param`, `Tag`, `LoggedModel` — none of which a typical Databricks user thinks of as "experiments" first. Every URL the client builds is `/api/2.0/mlflow/…` (`client.ts:206,232,262,291,317,342,370,399,428,454,483,522,556,581,615,677,717,774,869,895,925,958,988,1014,1044,1076,1106,1135,1161,1204,1237,1280,1306,1335,1361,1387`).
- **Category:** 1 (generic), 6 (misleading: name does not say MLflow).
- **Suggested name:** `mlflow`, `mlflow-tracking`, or `mlflow-experiments`. At minimum, add a JSDoc on `index.ts` saying "MLflow tracking — experiments, runs, logged models".
- **Rationale:** Every other identifier inside the package treats MLflow as the controlling brand (`mlflowParam`, `mlflowMetric`, `mlflowRunTag` appear in docstrings at `client.ts:256,1231`). The package name buries that.

### 2. `Run` — `src/v1/model.ts:712`
- **Why weird:** The central noun is named `Run`. `Run` is a reserved-feeling word in any JS context: `Promise.all().run()`, test framework "runs", workflow "runs". The user has zero context that this is an MLflow Run (a tracked execution of a training/eval script with metrics/params/artifacts). Compare with `jobs.Run` (already a different concept in this SDK) and `pipelines.Run`.
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages — `jobs.Run`, `pipelines.Run`), 15 (generic field/type name losing meaning).
- **Suggested name:** `MlflowRun` or `ExperimentRun`. Re-export the alias and deprecate `Run`.
- **Rationale:** When a consumer writes `import {Run} from '@databricks/sdk-experiments/v1'` they may already have `Run` in scope from `@databricks/sdk-jobs/v2`. The two have unrelated schemas. Disambiguating the type name removes a foot-gun.

### 3. `Experiment` — `src/v1/model.ts:219`
- **Why weird:** Same generic-noun problem as #2. `Experiment` is a generic English word; this is specifically an MLflow Experiment (named container of MLflow Runs with a UUID and a UC artifact-location). Multiple Databricks teams may legitimately have "experiment" types in the future (notebooks?, lakehouse-experiments?).
- **Category:** 1 (generic), 15 (generic name).
- **Suggested name:** `MlflowExperiment`.
- **Rationale:** Same as #2 — disambiguating the package's central noun against future Databricks "experiments" features prevents conflicts.

### 4. `Metric` / `Param` / `Run` / `Experiment` — all single-word top-level types — `src/v1/model.ts:219,623,667,712`
- **Why weird:** Four central types are bare nouns (`Metric`, `Param`, `Run`, `Experiment`). All four will collide with names in scope at the user's call site. None says "MLflow". `Param` in particular collides with React Router `Params`, Express `Params`, Node `URLSearchParams`, etc.
- **Category:** 1 (vague), 10 (reserved-word adjacent), 12 (duplicate concept against React/Node `Params`).
- **Suggested name:** `MlflowMetric`, `MlflowParam`, `MlflowRun`, `MlflowExperiment` — or namespace under `Mlflow.{Metric, Param, Run, Experiment}`.
- **Rationale:** Even MLflow's own protobuf calls these `mlflow.Run`, `mlflow.Experiment`, `mlflow.Metric` — they assume a namespace. Flattening them into TS without one loses that disambiguation.

### 5. `Run`, `Experiment`, `LoggedModel`, `Metric` types vs `mlflowRun`, `mlflowMetric`, `mlflowParam` symbols in docs — `client.ts:256, 1231`
- **Why weird:** The `createRun` JSDoc at `client.ts:255-257` says: "MLflow uses runs to track the `mlflowParam`, `mlflowMetric`, and `mlflowRunTag` associated with a single execution." The names `mlflowParam`, `mlflowMetric`, `mlflowRunTag` do **not exist anywhere in the package** — the exported types are `Param`, `Metric`, `RunTag`. The docstring references symbols (probably from the Go SDK's `mlflowParam` Go type names) that the TS port no longer has.
- **Category:** 6 (misleading documentation), 14 (Go-style naming reference left in TS docs).
- **Suggested name:** Either rename the TS types to `MlflowParam` / `MlflowMetric` / `MlflowRunTag` (recommended; see #4) **or** strip the `mlflow` prefix from the docstrings to match the actual TS surface. Same problem on `searchRuns` (`client.ts:1230-1232`): "Search expressions can use `mlflowMetric` and `mlflowParam` keys".
- **Rationale:** The doc references unresolvable symbols. A reader who tries to import `mlflowParam` from the package will fail.

### 6. `LoggedModel` — `src/v1/model.ts:560`
- **Why weird:** `LoggedModel` is a noun-phrase made of past-participle adjective + noun. The "logged" prefix is doing the disambiguation against `RegisteredModel`, `ServingModel`, `MlflowModel` etc. But (a) past-tense adjectives in type names read awkwardly (`LoggedModel`, `DeletedExperiment`, `FinishedRun` would all be similarly weird), and (b) `Logged` does not describe what the type *is* — it describes the verb history that produced it.
- **Category:** 6 (misleading: "Logged" describes history, not identity), 13 (verb-tense in noun-phrase).
- **Suggested name:** `MlflowModel`, `TrackedModel`, or `RunModel` (since every `LoggedModel` belongs to a Run via `sourceRunId`).
- **Rationale:** `LoggedModel` is a leaky verb. Type names should be present-tense nouns describing identity ("what it is"). Lots of `Logged*` derivatives compound the problem (see #7).

### 7. `LoggedModel` family — 8 separate types — `src/v1/model.ts:560, 568, 579, 607, 615` + 4 request/response — `model.ts:72, 161, 169, 257, 303, 314, 475, 932`
- **Why weird:** `LoggedModel`, `LoggedModelData`, `LoggedModelInfo`, `LoggedModelParameter`, `LoggedModelTag`, `LoggedModelStatus`, plus request types `CreateLoggedModel`, `DeleteLoggedModel`, `DeleteLoggedModelTag`, `FinalizeLoggedModel`, `GetLoggedModel`, `GetLoggedModelsRequest`, `LogLoggedModelParamsRequest`, `SetLoggedModelTags`, `SearchLoggedModels`. The `LoggedModel` prefix is repeated 14 times across types that all live in the same package. Compare to `Run` family — `Run`, `RunInfo`, `RunData`, `RunInputs`, `RunTag`, `RunStatus` — which uses the shorter prefix.
- **Category:** 7 (overly verbose), 12 (duplicate concept against `Model*` family that may exist in `modelregistry` package).
- **Suggested name:** Either drop the `Logged` and call the family `MlflowModel` / `MlflowModelData` / `MlflowModelInfo` / `MlflowModelParameter` / `MlflowModelTag` / `MlflowModelStatus`, or nest under a namespace.
- **Rationale:** 14 occurrences of "LoggedModel" in 12 identifiers — almost every `LoggedModel` request type repeats the verb prefix unnecessarily.

### 8. `LoggedModelParameter` vs `Param` — inconsistent abbreviation for the same concept — `src/v1/model.ts:607` vs `model.ts:667`
- **Why weird:** Two distinct types both model `{key: string, value: string}` parameter pairs: `LoggedModelParameter` (for a `LoggedModel`) and `Param` (for a `Run`). JSDoc at line 606-612 says "Parameter associated with a `LoggedModel`" and at 666-672 "Param associated with a run". Why one type is spelled out (`Parameter`) and the other abbreviated (`Param`) is unexplained.
- **Category:** 12 (duplicate concept), 17 (inconsistent abbreviation: `Parameter` vs `Param`).
- **Suggested name:** Align the abbreviation: either both `Parameter` or both `Param`.
- **Rationale:** The difference between `Run.params: Param[]` and `LoggedModel.data.params: LoggedModelParameter[]` forces two zod schemas (`marshalParamSchema` and `marshalLoggedModelParameterSchema` at `model.ts:1819, 1759`) where the names diverge cosmetically.

### 9. `ExperimentTag` / `RunTag` / `InputTag` / `LoggedModelTag` — four tag types for the same shape — `src/v1/model.ts:240, 374, 615, 775`
- **Why weird:** Four `{key: string, value: string}` types, one per parent entity. All four have identical schemas (`marshalExperimentTagSchema`, `marshalRunTagSchema`, `marshalInputTagSchema`, `marshalLoggedModelTagSchema` at `model.ts:1635, 1655, 1769, 1857`). The only differentiator is the parent entity — but the type itself is indistinguishable.
- **Category:** 12 (duplicate concept × 4).
- **Suggested name:** Adopt a single parent prefix convention so `MlflowTag` (or `Mlflow.Tag`) carries the shared shape, with parent-specific variants only when fields actually diverge.
- **Rationale:** An end-user picking the wrong tag type (`InputTag` vs `RunTag` etc.) will not get a compile error because they have the same shape.

### 10. `RunData`, `RunInfo`, `RunInputs` triplet — `src/v1/model.ts:712, 722, 732, 768`
- **Why weird:** `Run` contains three sub-types: `RunInfo`, `RunData`, `RunInputs`. None of the names tells the user what each one carries: `RunData` is "metrics, params, tags" (`model.ts:721-729`), `RunInfo` is "id, name, status, times, user" (`model.ts:732-765`), `RunInputs` is "datasetInputs, modelInputs" (`model.ts:768-773`). All three names are interchangeably vague. The Go SDK splits the same way — but in TS we can flatten.
- **Category:** 1 (vague: `Data`/`Info`/`Inputs`), 15 (generic field name).
- **Suggested name:** Flatten into `Run` (one object). If they must stay split, name them by content: `RunMetadata` (instead of `RunInfo`), `RunMeasurements` (instead of `RunData`), `RunDatasetsAndModels` (instead of `RunInputs`).
- **Rationale:** `RunInfo` vs `RunData` requires the reader to look up the schema to know which fields go where. Naming by content removes that lookup.

### 11. `LoggedModelInfo` vs `LoggedModelData` — `src/v1/model.ts:579, 568`
- **Why weird:** Same `Info`/`Data` split as `Run` (#10). `LoggedModelInfo` is "attributes, tags, registration info"; `LoggedModelData` is "params and metrics". Same generic-suffix problem.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `MlflowModelMetadata` and `MlflowModelMeasurements`, or fold both into one `MlflowModel`.
- **Rationale:** Same as #10.

### 12. `GetLoggedModelsRequest` — only request type with a `Request` suffix — `src/v1/model.ts:314, client.ts:578`
- **Why weird:** Every other request type drops the `Request` suffix: `GetExperiment`, `GetRun`, `CreateRun`, `DeleteRuns`, `SearchRuns`, etc. Then `GetLoggedModelsRequest` (and its response `GetLoggedModelsRequest_Response` — note the double "Request" in the response name) breaks the pattern. `LogLoggedModelParamsRequest` (model.ts:475) and its `Request_Response` companion break it the same way.
- **Category:** 20 (type-suffix tautology), 17 (inconsistent action verbs / suffix policy), 7 (verbose).
- **Suggested name:** `GetLoggedModels` + `GetLoggedModels_Response`. `LogLoggedModelParams` + `LogLoggedModelParams_Response`.
- **Rationale:** Inconsistency within the same file. `GetLoggedModelsRequest_Response` literally reads "request's response" which is a tautology — the request shape and the response shape are different objects.

### 13. `GetLoggedModelsRequest_Response` (and `LogLoggedModelParamsRequest_Response`) double-tautology — `src/v1/model.ts:320, 483`
- **Why weird:** Combining #12 with the proto `_Response` convention produces these absurd names. The exported identifier `GetLoggedModelsRequest_Response` contains both the `Request` suffix (#12) and the `_Response` suffix — "the request's response". 
- **Category:** 20 (suffix tautology), 4 (underscore).
- **Suggested name:** `GetLoggedModels_Response` (drop the `Request`).
- **Rationale:** Pure word salad.

### 14. `_Response` underscore convention — 32 types — `src/v1/model.ts` throughout
- **Why weird:** Every response type uses `Foo_Response` with a literal underscore: `CreateExperiment_Response`, `CreateLoggedModel_Response`, `CreateRun_Response`, `DeleteExperiment_Response`, `DeleteLoggedModel_Response`, `DeleteLoggedModelTag_Response`, `DeleteRun_Response`, `DeleteRuns_Response`, `DeleteTag_Response`, `FinalizeLoggedModel_Response`, `GetExperiment_Response`, `GetExperimentByName_Response`, `GetLoggedModel_Response`, `GetLoggedModelsRequest_Response`, `GetMetricHistory_Response`, `GetRun_Response`, `ListArtifacts_Response`, `ListExperiments_Response`, `LogBatch_Response`, `LogInputs_Response`, `LogLoggedModelParamsRequest_Response`, `LogMetric_Response`, `LogModel_Response`, `LogOutputs_Response`, `LogParam_Response`, `RestoreExperiment_Response`, `RestoreRun_Response`, `RestoreRuns_Response`, `SearchExperiments_Response`, `SearchLoggedModels_Response`, `SearchRuns_Response`, `SetExperimentTag_Response`, `SetLoggedModelTags_Response`, `SetTag_Response`, `UpdateExperiment_Response`, `UpdateRun_Response`. Each carries an `eslint-disable-next-line @typescript-eslint/naming-convention` comment, and many that are empty also disable `@typescript-eslint/no-empty-object-type`.
- **Category:** 4 (underscores in TS identifiers), 14 (Go/proto-style names), 7 (verbose).
- **Suggested name:** `CreateExperimentResponse` (no underscore). Or, in TS, declare them as a namespace: `namespace CreateExperiment { export interface Response {…} }`. Or flatten with descriptive suffix: `CreateExperimentResult`, `CreateRunResult`.
- **Rationale:** 32 lint suppressions in a single file. The convention is leaking proto naming into TS. Google TS style guide § 9.2 forbids underscores in type names.

### 15. `LoggedModelStatus` enum members all prefixed `LOGGED_MODEL_` — `src/v1/model.ts:9-23`
- **Why weird:** Enum `LoggedModelStatus` has members `LOGGED_MODEL_STATUS_UNSPECIFIED`, `LOGGED_MODEL_PENDING`, `LOGGED_MODEL_READY`, `LOGGED_MODEL_UPLOAD_FAILED`. The enum is already `LoggedModelStatus` — every member re-states `LOGGED_MODEL_`. The first member doubles down: `LOGGED_MODEL_STATUS_UNSPECIFIED`. The others lose the `STATUS_` infix but still keep `LOGGED_MODEL_`.
- **Category:** 2 (redundant enum prefix), 17 (inconsistency: only `UNSPECIFIED` carries the full `LOGGED_MODEL_STATUS_` prefix), 18 (long enum values).
- **Suggested name:** `LoggedModelStatus.Unspecified | Pending | Ready | UploadFailed`. Or drop `Unspecified` entirely (TS supports optional fields natively).
- **Rationale:** `LoggedModelStatus.LOGGED_MODEL_UPLOAD_FAILED` reads as "logged model status: logged model upload failed" — the type name is repeated twice. Inconsistent prefix between `UNSPECIFIED` and the rest is jarring.

### 16. `RunStatus` enum has no `UNSPECIFIED` value — inconsistent with `LoggedModelStatus` and `ViewType` — `src/v1/model.ts:26-37`
- **Why weird:** Two of the three enums in the file follow the proto-style "include UNSPECIFIED sentinel" pattern. `RunStatus` does not. Five values: `RUNNING`, `SCHEDULED`, `FINISHED`, `FAILED`, `KILLED`. Either the Run state machine has no "unknown" — fine — but the inconsistency reduces grep-ability.
- **Category:** 17 (inconsistency across enums in same file).
- **Suggested name:** Either drop `UNSPECIFIED` from `LoggedModelStatus` and `ViewType` too (best — TS uses `undefined`), or add `RunStatus.UNSPECIFIED` for symmetry.
- **Rationale:** Pick one policy. Sibling enums disagreeing on the sentinel makes patterns hard to learn.

### 17. `KILLED` enum value — `src/v1/model.ts:36`
- **Why weird:** `RunStatus.KILLED` reads aggressively. MLflow's own term is `KILLED` (preserved here from the wire format), but "killed" is uncommon in API-design vocabulary outside of Unix signals. `Cancelled`, `Aborted`, `Stopped` are typical English equivalents. The JSDoc says "Run killed by user."
- **Category:** 6 (misleading — sounds like an error, but it is a user-initiated state), 18 (uncommon enum value), 17 (inconsistent verb tense with `RUNNING` / `SCHEDULED` — `KILLED` is past tense of an active verb).
- **Suggested name:** `RunStatus.Cancelled` (TS) with wire-value remaining `KILLED`. Match the rest: `Running`, `Scheduled`, `Finished`, `Failed`, `Cancelled`.
- **Rationale:** `Cancelled` is the dominant industry term for user-initiated termination (HTTP `499 Client Closed Request`, GRPC `CANCELLED`, etc.).

### 18. `ViewType` enum — generic name + redundant value names — `src/v1/model.ts:40-47`
- **Why weird:** Type name `ViewType` is meaningless on its own ("a type of view"). Three values are `ACTIVE_ONLY`, `DELETED_ONLY`, `ALL` — all SCREAMING_SNAKE_CASE TS identifiers when most TS enums use PascalCase. Plus `ALL` is a built-in reserved-feeling word and a poor key. The same enum is used as `viewType` on `ListExperiments` (model.ts:416), `runViewType` on `SearchRuns` (model.ts:897), and `viewType` on `SearchExperiments` (model.ts:800) — two fields named `viewType` and one named `runViewType` for the same enum.
- **Category:** 1 (generic name), 17 (inconsistent field names — `viewType` vs `runViewType` for the same enum).
- **Suggested name:** Type: `ExperimentVisibility` or `LifecycleFilter`. Values: `ActiveOnly | DeletedOnly | All`. Field name: pick one (`viewType` everywhere, or rename uniformly).
- **Rationale:** A field that means "filter experiments/runs by deleted state" is more searchable as `lifecycleFilter`.

## Medium severity

### 19. `GetLoggedModels` method returns `GetLoggedModelsRequest_Response` — `src/v1/client.ts:577-608`
- **Why weird:** The method is `getLoggedModels(req: GetLoggedModelsRequest)`. Method name has no `Request` suffix, but the parameter type does. Compare to `getExperiment(req: GetExperiment)` two methods up. Same problem with `logLoggedModelParams(req: LogLoggedModelParamsRequest)` (`client.ts:921`).
- **Category:** 17 (inconsistency), 20 (suffix tautology).
- **Suggested name:** Drop the `Request` suffix on the type names to match the method names. Already raised in #12.

### 20. `getMetricHistory` / `GetMetricHistory` — request type uses verb-noun, response is paginated metrics — `src/v1/model.ts:325, client.ts:611`
- **Why weird:** Type name `GetMetricHistory` reads as a verb phrase, not a noun. All other request types use verb-phrase names (`GetRun`, `DeleteExperiment`) so this is internally consistent, but it does conflict with the convention `Verb + EntityName` (because "history" is not the entity — `Metric` is). The response field is `metrics: Metric[]` — so "metric history" really means "page of historical metric values for a single metric_key".
- **Category:** 1 (vague: "history" is non-specific), 6 (misleading: "metric history" sounds like an aggregate, returns a page of `Metric` rows).
- **Suggested name:** `GetMetricValues` / `getMetricValues`, or `ListMetricHistory` / `listMetricHistory` (since it paginates).
- **Rationale:** The verb `get` paired with a paginated response is misleading — all other paginated endpoints use `list` or `search` (e.g. `listExperiments`, `searchRuns`). This one is the odd one out.

### 21. `LogModel` is deprecated and method docs say so — `src/v1/client.ts:978-984`
- **Why weird:** The docstring literally starts with "**Note:** the [Create a logged model](...) API replaces this endpoint." But `logModel` is still exported with no `@deprecated` JSDoc tag. Same for `LogModel`, `LogModel_Response`, and `marshalLogModelSchema`. The method `createLoggedModel` is the replacement.
- **Category:** 6 (misleading — exported as if it were current).
- **Suggested name:** Add `@deprecated Use createLoggedModel instead.` JSDoc to `logModel`, `LogModel`, `LogModel_Response`.
- **Rationale:** A linter or IDE that reads `@deprecated` will warn users; a plaintext note in the markdown JSDoc body will not.

### 22. `runUuid` deprecated field appears on 6 types — `src/v1/model.ts:332, 365, 389, 492, 546, 739, 949, 976`
- **Why weird:** Eight different types/methods carry a `runUuid?: string` field with the comment `[Deprecated, use 'run_id' instead] ID of the run ...`. There is no `@deprecated` JSDoc tag — the deprecation is buried in prose. The TS port translated `run_uuid` (snake_case wire) into `runUuid` (camelCase) so the deprecation comment's `run_id` reference does not match the TS field name (`runId`) the user would actually use.
- **Category:** 6 (misleading prose), 19 (underspecified ID: `runUuid` vs `runId` for the same thing), 17 (inconsistent ID style).
- **Suggested name:** Either remove the deprecated field from the TS surface (since the Go SDK keeps it for wire-compat, TS could omit) or add `@deprecated` JSDoc.
- **Rationale:** If a user passes both `runId` and `runUuid` the API picks `runId`; the TS surface should make `runUuid` impossible to autocomplete.

### 23. `userId` deprecated — `src/v1/model.ts:101, 749`
- **Why weird:** Same problem as #22 but for `userId` on `CreateRun.userId` and `RunInfo.userId`. JSDoc: "This field is deprecated as of MLflow 1.0, and will be removed in a future MLflow release. Use 'mlflow.user' tag instead." No `@deprecated` tag.
- **Category:** 6.
- **Suggested name:** Add `@deprecated`. Same as #22.

### 24. `creationTimestampMs` / `lastUpdatedTimestampMs` vs `creationTime` / `lastUpdateTime` — same concept, two namings — `src/v1/model.ts:232-234, 587-589`
- **Why weird:** `Experiment` uses `lastUpdateTime` and `creationTime` (no unit suffix). `LoggedModelInfo` uses `creationTimestampMs` and `lastUpdatedTimestampMs` (with unit suffix). Both are Unix ms timestamps. Three things vary: (a) `Time` vs `Timestamp`, (b) `Update` vs `Updated`, (c) presence of `Ms` unit suffix.
- **Category:** 17 (inconsistency in field naming for the same concept), 3 (casing inconsistency), 9 (singular/plural-ish noun tense `Update` vs `Updated`).
- **Suggested name:** Pick one: `createdAt` / `updatedAt` (typical JS), or `creationTimeMs` / `lastUpdateTimeMs` (explicit unit). Match across `Experiment`, `LoggedModelInfo`, `RunInfo`, etc.
- **Rationale:** Three timestamp formats in one package means users guess which type uses which.

### 25. `RunInfo` uses `startTime` / `endTime` (no unit suffix) — `src/v1/model.ts:753, 755`
- **Why weird:** Adds a fourth timestamp naming style to the package: bare `startTime` / `endTime` with no unit. JSDoc says "Unix timestamp of when the run started in milliseconds" — buried in prose.
- **Category:** 17 (inconsistency).
- **Suggested name:** `startTimeMs` / `endTimeMs`. Same as #24.

### 26. `maxTimestampMillis` / `minTimestampMillis` — yet another timestamp suffix `Millis` — `src/v1/model.ts:194, 697`
- **Why weird:** Fifth style: `DeleteRuns.maxTimestampMillis` and `RestoreRuns.minTimestampMillis` use `Millis` suffix (not `Ms`, not unsuffixed). Same package. Five different naming choices for unix-ms timestamps: `creationTime`, `lastUpdateTime`, `startTime`/`endTime`, `creationTimestampMs`/`lastUpdatedTimestampMs`, `maxTimestampMillis`/`minTimestampMillis`.
- **Category:** 17 (inconsistency × 5), 3 (casing inconsistency — `Ms` vs `Millis`).
- **Suggested name:** Pick one suffix (`Ms` is common, `Millis` is rarer) and apply uniformly.
- **Rationale:** Same as #24.

### 27. `creatorId: number` (not string) — `src/v1/model.ts:595`
- **Why weird:** `LoggedModelInfo.creatorId` is typed as `number | undefined` — every other ID in the package is `string` (`experimentId`, `runId`, `modelId`, `sourceRunId`). The JSDoc says "The ID of the user or principal that created the model."
- **Category:** 16 (field contradicting type domain), 17 (inconsistent ID type), 19 (underspecified ID).
- **Suggested name:** Either align as `string` (most likely the wire really is a numeric user-id but TS-side string is safer for large ints) or rename to `creatorIdNumeric` to flag the divergence.
- **Rationale:** If the user-id ever exceeds `Number.MAX_SAFE_INTEGER`, this field silently corrupts. All other Databricks SDK packages use `string` for IDs (e.g. `databricks/sdk-iam` uses `id: string`).

### 28. `experimentId` vs `modelId` vs `runId` vs `creatorId` vs `userId` — five different ID fields with no shared naming pattern — `src/v1/model.ts` throughout
- **Why weird:** The package has multiple ID kinds that coexist on the same types. `Metric` (`model.ts:622`) has `modelId` AND `runId`. `LoggedModelInfo` has `modelId`, `experimentId`, `sourceRunId`, `creatorId`. No naming scheme says "this is the model's own ID vs a referenced model's ID". `sourceRunId` (the run that produced this model) and `runId` (the run owning this metric) — both are "run IDs" semantically but named differently. `creatorId` (`number`) is yet another shape (#27).
- **Category:** 19 (underspecified IDs coexist), 16 (`creatorId` is `number`, others `string`).
- **Suggested name:** Add prefix discipline: the model's own ID is `id` (or `modelId` everywhere); a referenced ID is `<role><Entity>Id` (`sourceRunId`, `parentExperimentId`). Document the convention.
- **Rationale:** Today, every type has its own private convention; users must check each schema.

### 29. `modelId` ambiguity in `Metric` — `src/v1/model.ts:643-647`
- **Why weird:** `Metric.modelId` doc: "The ID of the **logged model or registered model version** associated with the metric, if applicable." So one field carries IDs from two different domains (LoggedModel from this package + RegisteredModelVersion from `mlmodels`/`modelregistry` package). The type cannot tell them apart.
- **Category:** 6 (misleading — same string field holds two ID kinds), 19 (underspecified ID).
- **Suggested name:** Split into `loggedModelId?: string` and `registeredModelVersionId?: string`, or carry a discriminator (`{kind: 'logged' | 'registered', id: string}`).
- **Rationale:** Heterogeneous string ID fields are debugging traps.

### 30. `LoggedModelInfo.modelId` doc vs `LoggedModel.info.modelId` access pattern — `src/v1/model.ts:560-565, 579-583`
- **Why weird:** To get a model's own ID, you have to write `loggedModel.info?.modelId`. The natural place would be `loggedModel.id` or `loggedModel.modelId`. The split between `info` and `data` (#11) buries the ID one level deep.
- **Category:** 15 (generic field name losing meaning), 7 (verbose access).
- **Suggested name:** Hoist `modelId` to `LoggedModel.id` (typescript can keep `info` for the rest).
- **Rationale:** Awkward access pattern.

### 31. `RunInfo.experimentId` is bare while `LoggedModelInfo.experimentId` doc says "The ID of the experiment that owns the model" — `src/v1/model.ts:741, 583`
- **Why weird:** Two fields named `experimentId`, two completely different relationships. On `RunInfo` the field connects the run to its parent experiment. On `LoggedModelInfo` it connects the model to its owning experiment. JSDoc only on one of them.
- **Category:** 15 (generic name losing meaning across contexts).
- **Suggested name:** Both are fine as `experimentId` if doc consistently says "parent experiment". The issue is uneven JSDoc.

### 32. `marshalLogMetricSchema` includes deprecated `runUuid` in output — `src/v1/model.ts:1701-1723`
- **Why weird:** `marshalLogMetricSchema` writes `run_uuid: d.runUuid` to the wire, even though the field is marked deprecated. Future MLflow versions may reject this. The marshaller has no way to suppress the deprecated field unless the user explicitly leaves `runUuid` undefined.
- **Category:** 6 (misleading: TS surface lets you set a field that the API has deprecated).
- **Suggested name:** Strip `runUuid` from the marshal schema.
- **Rationale:** Defensive output filtering belongs at the SDK layer.

### 33. Method names `getLoggedModels` / `getLoggedModelsRequest` mismatch — type is `GetLoggedModelsRequest`, method is `getLoggedModels` — `src/v1/client.ts:577`
- **Why weird:** Caller writes `client.getLoggedModels({...})` — but the type the request maps to is `GetLoggedModelsRequest`. Looking at the method name alone you wouldn't guess the type carries the `Request` suffix.
- **Category:** 17 (inconsistency).
- **Suggested name:** Already covered by #12 — drop `Request`.

### 34. `LogLoggedModelParamsRequest` — verb-noun-verb compound — `src/v1/model.ts:475`
- **Why weird:** Parses as: Log (verb) + LoggedModel (noun) + Params (noun) + Request (suffix). Read aloud as "Log Logged Model Params Request". Three nouns/verbs strung together. The verb `Log` collides with the participle adjective `Logged` (they have the same root) inside the same identifier. Method is `logLoggedModelParams` (`client.ts:921`).
- **Category:** 7 (overly verbose), 17 (verb collision), 6 (reads awkwardly).
- **Suggested name:** `AddMlflowModelParams` + `addMlflowModelParams`, or `LogParamsForModel` + `logParamsForModel`, or drop `Logged` once the rename in #7 is applied: `LogMlflowModelParams`.
- **Rationale:** The double-Log is jarring on read.

### 35. `setLoggedModelTags` is plural but `setExperimentTag` is singular — `src/v1/client.ts:1276, 1302`
- **Why weird:** `setExperimentTag(req: SetExperimentTag)` sets **one** tag. `setLoggedModelTags(req: SetLoggedModelTags)` sets a batch. Same verb, different cardinality. Method `setTag` (run tag) is also singular. No `setExperimentTags` or `setRunTags` exists.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent action verb cardinality).
- **Suggested name:** Either add bulk variants for experiment/run, or rename to be explicit: `setLoggedModelTagsBatch`, or pluralise all (`setExperimentTags`, `setRunTags`, `setLoggedModelTags`).
- **Rationale:** Cardinality should be predictable from the method name.

### 36. `setExperimentTag` URL has double "set-experiment-tag" — `src/v1/client.ts:1280`
- **Why weird:** URL is `/api/2.0/mlflow/experiments/set-experiment-tag`. The path already says `experiments/` so the segment `set-experiment-tag` repeats "experiment". Other methods use `experiments/set` / `experiments/create` style. Not a TS naming issue per se but caller-visible if someone logs the URL.
- **Category:** Observation (URL design upstream).

### 37. `logBatch` does not say "log run batch" — `src/v1/client.ts:865`
- **Why weird:** `logBatch` is a batch-write of metrics/params/tags **to a run**. Name says "batch" but not "what gets batched" or "what scope". From the method name alone, a user might think this is "batch-log many experiments" or "batch-log many metrics across many runs". JSDoc clarifies.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `logRunBatch`, `logRunMetadata`, or `logRunMeasurements`.

### 38. `logInputs` vs `logOutputs` vs `logParam` vs `logMetric` vs `logBatch` vs `logModel` vs `logLoggedModelParams` — 7 different `log*` verbs — `src/v1/client.ts`
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

### 39. `LogInputs.datasets` vs `LogInputs.models` field names — `src/v1/model.ts:463-470`
- **Why weird:** Two parallel fields with different abstraction levels: `datasets` is `DatasetInput[]` (carries tags + dataset), `models` is `ModelInput[]` (only model id). The names don't hint at this asymmetry.
- **Category:** 15 (generic field name losing structure).

### 40. `datasetInputs` vs `modelInputs` on `RunInputs` — `src/v1/model.ts:770, 772`
- **Why weird:** `RunInputs.datasetInputs: DatasetInput[]` and `RunInputs.modelInputs: ModelInput[]`. The field name and the element type both carry `Input`. So a user reads `runInputs.datasetInputs[0].tags` — the word "input" appears three times in a single access path.
- **Category:** 20 (suffix tautology), 7 (verbose).
- **Suggested name:** `RunInputs.datasets: DatasetInput[]` and `RunInputs.models: ModelInput[]`.

### 41. `Dataset.profile` vs `Dataset.schema` — both `string` — `src/v1/model.ts:131-142`
- **Why weird:** Both fields are typed `string` and named with generic English words. JSDoc shows the wire format is freeform JSON-stringified content. The field types don't help.
- **Category:** 15 (generic field name losing meaning), 6 (misleading: schema is freeform stringified JSON, not a real schema).
- **Suggested name:** `schemaJson` / `profileJson` (mirrors `LogModel.modelJson`) so the user knows to JSON-parse them. Already see the pattern at `LogModel.modelJson` (model.ts:523).

### 42. `LogModel.modelJson` — bare json string field — `src/v1/model.ts:519-524`
- **Why weird:** `LogModel.modelJson` is "MLmodel file in json format." Field name OK but content is a serialized MLmodel YAML/JSON file — the user must construct an MLmodel doc. The SDK does no parsing or validation.
- **Category:** Observation (an opaque blob field could carry doc).

### 43. `Dataset.digest` — `src/v1/model.ts:124-124`
- **Why weird:** `digest` is technical jargon (cryptographic hash). MLflow uses it; consumers may not. JSDoc: "Dataset digest, e.g. an md5 hash". Could be `contentHash` or `fingerprint`.
- **Category:** 5 (cryptic abbreviation — `digest` is industry-specific).

### 44. `RunInfo.lifecycleStage` doc says "the experiment" but field is on a Run — `src/v1/model.ts:764`
- **Why weird:** `RunInfo.lifecycleStage` JSDoc says: "Current life cycle stage of the experiment : OneOf("active", "deleted")". But this is a `Run`'s `lifecycleStage`, not the experiment's. Same field on `Experiment.lifecycleStage` (model.ts:230) is correctly described.
- **Category:** 6 (misleading doc — wrong entity name in description).
- **Suggested name:** Fix doc to say "Current life cycle stage of the run".

### 45. `Experiment.tags` / `LoggedModelInfo.tags` / `RunData.tags` / `RunInputs` no tags — `src/v1/model.ts:236, 603, 728`
- **Why weird:** Three top-level types have a `tags` field but each uses a different element type (`ExperimentTag` / `LoggedModelTag` / `RunTag`) — see #9. The field is consistently `tags`, but the element type is not unifiable in TS without changes.
- **Category:** 17 (inconsistency at the element-type level).

### 46. Boolean field `FileInfo.isDir` — `src/v1/model.ts:252`
- **Why weird:** Naming-wise `isDir` is fine, but the boolean is paired with `fileSize?: number | undefined` where the JSDoc says "Unset for directories" — i.e. `fileSize` is a discriminator partner that should be excluded when `isDir === true`. No discriminated union enforces this.
- **Category:** 6 (misleading optionality), 16 (field contradicts domain in the file-vs-directory case).
- **Suggested name:** Model as `type FileInfo = { path: string } & ({ isDir: true } | { isDir: false; fileSize: number })`.

### 47. `FileInfo` itself is a generic name — `src/v1/model.ts:247`
- **Why weird:** `FileInfo` is generic — many SDKs have a `FileInfo` type. This one is specifically an MLflow Run artifact entry.
- **Category:** 1 (generic), 12 (likely duplicate of `dbsql/v1` or `workspace/v1` FileInfo).
- **Suggested name:** `RunArtifact` or `ArtifactFileInfo`.

## Low severity

### 48. `executeCall` / `executeHttpCall` — two execute verbs in `utils.ts` — `src/v1/utils.ts:26, 65`
- **Why weird:** `executeCall` is the public retrier+rate-limit wrapper; `executeHttpCall` is the inner HTTP send. The names differ by one word and roles are not obvious from the name.
- **Category:** 17 (inconsistency), 6 (misleading: both look like the entry point).
- **Suggested name:** `executeWithRetry` and `sendHttpRequest` (or `dispatch`).

### 49. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** `HttpCallOptions` is the parameter bag for `executeHttpCall`; it carries a `request`, `httpClient`, `logger`. Name is fine but `Options` is a common suffix that may collide with `CallOptions` from `@databricks/sdk-options/call` imported on the same file (line 12).
- **Category:** 17 (collision risk with `CallOptions`).

### 50. `marshalRequest` / `parseResponse` — verbs are inconsistent — `src/v1/utils.ts:113, 119`
- **Why weird:** `marshalRequest` (verb=marshal, suffix=Request) and `parseResponse` (verb=parse, suffix=Response). Marshal is the wire-out; parse is the wire-in. The verbs (`marshal` vs `parse`) and the suffixes (`Request` vs `Response`) are split. Counterparts would be `marshal`/`unmarshal` (Go style) or `encode`/`decode`, or `serialize`/`deserialize`.
- **Category:** 17 (inconsistent verb pairing).
- **Suggested name:** `marshalRequest` / `unmarshalResponse`, matching the `unmarshal*Schema` zod schemas in `model.ts:992-1521`.

### 51. `flattenQueryParams` — only used internally — `src/v1/utils.ts:123`
- **Why weird:** Exported `flattenQueryParams` is dead code in `experiments` — no method in `client.ts` calls it. (Searched the file; query string assembly is done inline in `getMetricHistory`, `listArtifacts`, etc.)
- **Category:** Observation (dead export).

### 52. `marshal*Schema` constants are not actually `Schema` objects — `src/v1/model.ts:1523-2009`
- **Why weird:** Constants like `marshalDatasetSchema` carry the `Schema` suffix and are typed `z.ZodType`, but the suffix in JS-land would more naturally be `Codec` or `Serializer`. `Schema` reads as "the shape definition", but these objects also perform the transformation (camelCase → snake_case).
- **Category:** 6 (slightly misleading — `Schema` implies pure shape).
- **Suggested name:** `marshalDatasetCodec` / `unmarshalDatasetCodec`. Or just keep `Schema` consistently.

### 53. `marshalCreateExperimentSchema` etc. — Generated zod schemas with no type parameter — `src/v1/model.ts:1523`
- **Why weird:** Many `marshal*Schema` constants are typed `z.ZodType` (no type parameter). The unmarshal counterparts are typed `z.ZodType<Foo>` with the target type. So the input side is unchecked.
- **Category:** Observation (looser typing on marshal vs unmarshal).

### 54. `PACKAGE_SEGMENT` constant in `client.ts:164` — `src/v1/client.ts:164`
- **Why weird:** Top-level constant `PACKAGE_SEGMENT` is SCREAMING_SNAKE_CASE — the only TS identifier in `client.ts` using that style. Comment on the line says it's used for the User-Agent header.
- **Category:** 17 (inconsistency in identifier case across the file).
- **Suggested name:** `packageSegment` per TS conventions.

### 55. `PACKAGE_SEGMENT.key` derived by regex from `pkgJson.name` — `src/v1/client.ts:165`
- **Why weird:** The expression `pkgJson.name.replace(/^@[^/]+\//, '')` extracts `sdk-experiments` from `@databricks/sdk-experiments`. The resulting User-Agent segment is `sdk-experiments/0.0.0`. The literal `sdk-experiments` is then user-visible in HTTP traces. The same generic-name problem as #1.
- **Category:** 1 (generic name leaking into observability).

### 56. `getMetricHistoryIter`, `listArtifactsIter`, `listExperimentsIter`, `searchExperimentsIter`, `searchRunsIter` — `Iter` suffix — `src/v1/client.ts:653, 752, 806, 1182, 1258`
- **Why weird:** Five paginating async-generators named `*Iter`. JS convention is `*Iterator` or simply `for-await-of`-friendly methods returning AsyncGenerator without a suffix. `Iter` is a Go/Rust convention.
- **Category:** 14 (Go-style suffix), 7 (cryptic abbreviation).
- **Suggested name:** `getMetricHistoryAll`, `listExperimentsAll` (returns AsyncGenerator), or `iterateExperiments`, or no suffix and use the method overload pattern.

### 57. `searchLoggedModels` has no `*Iter` counterpart — `src/v1/client.ts:1200`
- **Why weird:** Every other search/list method has a paginating helper (`searchExperimentsIter`, `searchRunsIter`, etc.). `searchLoggedModels` is paginated (the response has `nextPageToken: model.ts:874`) but the client lacks a `searchLoggedModelsIter`.
- **Category:** 17 (inconsistency in client surface).
- **Suggested name:** Add `searchLoggedModelsIter`.

### 58. `getLoggedModels` (batch get) has no `*Iter` — `src/v1/client.ts:577`
- **Why weird:** A batch endpoint that takes a list of IDs and returns a list. No pagination → no `Iter`. Fine. Worth noting that this is `getLoggedModels` (plural) — but `getLoggedModel` (singular, line 552) is the single-fetch. Two methods that differ only by `s` is grep-hostile.
- **Category:** Observation (grep-hostile pair `getLoggedModel` vs `getLoggedModels`).

### 59. `Dataset.name` examples include emoji "fantastic-elk-3" — `src/v1/model.ts:121, 504, 633`
- **Why weird:** JSDoc on `Dataset.name`, `LogMetric.datasetName`, `Metric.datasetName` includes the literal example `“fantastic-elk-3”` (with smart quotes) — a generated mlflow run-name example. Looks like documentation noise that survived the port.
- **Category:** Observation (smart quotes + boilerplate example).

### 60. `Dataset.source` doc — "Note that the source may not exactly reproduce..." — `src/v1/model.ts:127-129`
- **Why weird:** The field name `source` is generic; JSDoc says it may not actually be reproducible. The name does not warn the user that the field is best-effort.
- **Category:** 6 (misleading — field name suggests truth, doc admits not).

### 61. `Experiment.lifecycleStage` is typed as `string` not `enum` — `src/v1/model.ts:230`
- **Why weird:** Doc says: `Current life cycle stage of the experiment: "active" or "deleted"`. Wire returns a closed set. TS type is `string | undefined` — no enum.
- **Category:** 16 (field contradicting type domain — should be a 2-value enum).
- **Suggested name:** `lifecycleStage?: 'active' | 'deleted'` or `LifecycleStage` enum.

## Observations (non-actionable but noted)

### 62. Marshal/unmarshal schema asymmetry — only unmarshal types are exported — `src/v1/model.ts:992 vs 1523`
- **Note:** Both directions exist. Only unmarshal schemas are typed (`z.ZodType<Foo>`); marshal schemas are `z.ZodType` (untyped). Cross-package consumers cannot validate request bodies type-safely.

### 63. No `experimentId` namespace prefix on most fields — generic ID pattern — `src/v1/model.ts` throughout
- **Note:** Every type that references an experiment uses `experimentId: string`; same for runs (`runId`) and models (`modelId`). When two ID kinds coexist on the same type (e.g. `Metric.modelId` + `Metric.runId`, `LoggedModelInfo.modelId` + `LoggedModelInfo.experimentId` + `LoggedModelInfo.sourceRunId`), the prefix discipline works. The naming convention is consistent — note that no `id` (bare) is ever used as a primary key, which is the right call.

### 64. `RUNNING` / `SCHEDULED` / `FINISHED` / `FAILED` / `KILLED` — wire-stable enum values — `src/v1/model.ts:28-36`
- **Note:** Wire values match the server's MLflow contract — they cannot be renamed without a wire-protocol break. Any rename would need to be TS-side only (with a marshaller mapping).

### 65. `runViewType: ViewType` on `SearchRuns` — uses ViewType enum but renames it — `src/v1/model.ts:897`
- **Note:** Already covered in #18. The wire field is `run_view_type` (model.ts:1943); the TS field is `runViewType`. Two other usages (`ListExperiments.viewType`, `SearchExperiments.viewType`) use just `viewType`. The renaming on `SearchRuns` is unique and likely a wire-protocol legacy.

### 66. `package.json` description is empty string — `package.json:4`
- **Note:** Every sister package has a description. Not a naming issue, but flagged for completeness.

### 67. No `accountId` plumbing in `Client` constructor — `src/v1/client.ts:178-192`
- **Note:** Comparing to recent commit `81c7569 Add accountId to ClientOptions` — the experiments client passes the entire `ClientOptions` to `newHttpClient` so it inherits whatever account-level handling there is, but does not expose it. Not a naming issue.

### 68. `_Response` _ underscore vs PascalCase pair — naming convention inconsistency — `src/v1/model.ts` throughout
- **Note:** Adopting a TS-friendly response naming would also require migrating the eslint suppression comments (currently `// eslint-disable-next-line @typescript-eslint/naming-convention` on every Response). 32 such suppressions in `model.ts` would all go away.
