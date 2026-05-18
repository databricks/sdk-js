# Naming Audit: `@databricks/sdk-jobs` (v2)

Scope: `packages/jobs/src/v2/` — `model.ts` (10184 lines), `client.ts` (1060 lines),
`utils.ts` (150 lines), `index.ts` (284 lines). This is the largest API surface in
the SDK and exposes ~140 interfaces, 47 enums, and 19 client methods.

## Summary Table

| Severity     | Count | Notes                                                                          |
| ------------ | ----- | ------------------------------------------------------------------------------ |
| High         | 37    | Reserved-word risks, broken/misleading names, identifier collisions, contradictions. |
| Medium       | 87    | Underscores, redundant prefixes/suffixes, vague names, acronym casing.         |
| Low          | 53    | Mild verbosity, plural mismatches, stylistic inconsistencies.                  |
| Observations | 16    | Patterns spanning the entire file (proto leakage, oneof wrappers, etc.).       |
| **Total**    | **193** | |

Issues are catalogued below by severity, then by file/line.

---

## High

### H1. `Run` is overloaded across at least seven shapes
- **Location:** `model.ts:3414` (`Run`), `model.ts:1008` (`BaseRun`), `model.ts:3890` (`RunTask`), `model.ts:3506` (`Run_JobLevelParameters`), `model.ts:3867` (`RunState`), `model.ts:3881` (`RunStatus`), `model.ts:4276` (`RunTriggerInfo`).
- **Category:** Vague/generic + duplicate concepts (#1, #12).
- **Suggestion:** Treat `Run` as a domain concept and only use the bare token on the canonical job run. Rename `RunTask` -> `TaskRun` (it represents a task **run**, not a run-task), and rename `Run` -> `JobRun` for symmetry with `JobRunId`, `numberInJob`, `runType: JOB_RUN`.
- **Rationale:** Currently `BaseRun`, `Run`, `RunTask`, and the `RunStatus.state` field all describe overlapping shapes. Authors must read JSDoc to know which is which. `RunTask` reading order "task that is a run" is opposite to its actual meaning ("the run of a task").

### H2. `RunTask` and `TaskSettings` are nearly identical but named asymmetrically
- **Location:** `model.ts:3890` (`RunTask`), `model.ts:4731` (`TaskSettings`), `model.ts:4100` (`RunTaskSettings`).
- **Category:** Duplicate concepts (#12), misleading names (#6).
- **Suggestion:** Use `TaskRun` (the runtime/output form) and `Task` (the design-time form). Drop `RunTaskSettings` in favour of `SubmitTask` if it is submit-specific.
- **Rationale:** A reader sees three shapes (`RunTask`, `TaskSettings`, `RunTaskSettings`) carrying the same union of task types and cannot tell which to use without grepping. The naming pattern (`RunX` for "X on a run", `XSettings` for "X on a job") is undocumented.

### H3. `Format` (top-level public enum) is a reserved-word collision
- **Location:** `model.ts:150`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `JobFormat`.
- **Rationale:** `Format` is a well-known global (the `Intl.NumberFormat`/`Intl.DateTimeFormat` family, `console.format` in some runtimes, and a built-in name in many code-generators). Importing `Format` from a Jobs SDK forces consumers to alias it.

### H4. `Source` (top-level public enum) clashes with global Web/TS names
- **Location:** `model.ts:280`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `TaskSource`, `CodeSource`, or `FileSource` (only two values: `WORKSPACE`, `GIT`).
- **Rationale:** `Source` is the name of the DOM `EventSource` shorthand, Web Audio `AudioBufferSourceNode`, RxJS `Source`, several stream libraries, and lint rules around it. With only two values describing where SQL/Notebook/dbt code lives, a domain prefix is essential.

### H5. `Compute` interface clashes with the larger Databricks Compute API
- **Location:** `model.ts:1464`.
- **Category:** Vague/generic (#1), misleading names (#6).
- **Suggestion:** Rename to `TaskComputeOverride` or `TaskCompute` — the type wraps only `hardwareAccelerator` for serverless GPU.
- **Rationale:** A consumer would expect `Compute` to describe an entire compute target (cluster spec, node type, runtime, etc.). It actually has one field. This is the worst "field contradicting type domain" case in the file (#16).

### H6. `Environment` overload — minimal interface, generic word
- **Location:** `model.ts:1835`.
- **Category:** Vague/generic (#1), reserved-word collision (#10).
- **Suggestion:** Rename to `TaskEnvironment` (matching the per-task `environment_key` reference) or `EnvironmentSpec`.
- **Rationale:** `Environment` is a host-level concept in Node (`process.env`) and a common UI/test-framework type. Inside this file it is a tiny dep-list + base-env reference; it is referenced as `JobEnvironment.spec: Environment`, so a `Spec` suffix matches its role.

### H7. `Repair` lacks a noun and is mistaken for a verb
- **Location:** `model.ts:3097`.
- **Category:** Verb-tense inconsistency (#13), vague/generic (#1).
- **Suggestion:** Rename to `RepairHistoryEntry` (or `RepairAttempt`) — it represents a single past repair.
- **Rationale:** The verb `repair()` exists on the client (`client.ts:570`), and `RepairRun`/`RepairRun_Response` are the request/response shapes. A standalone `Repair` reads as the action, not as a record.

### H8. `Webhook` is a generic top-level name that collides with the platform `Webhook` concept
- **Location:** `model.ts:5000`.
- **Category:** Vague/generic (#1), reserved-word/global collision (#10).
- **Suggestion:** Rename to `WebhookRef` (or `JobWebhook`) — readers grep `Webhook` expecting the request/payload shape, but the actual Webhook _payload_ is `WebhookNotifications`. The bare `Webhook` token is the wrong claimant for that name.
- **Rationale:** "Webhook" is a broad industry term and the actual delivery payload lives under a different identifier; the unqualified type-name should belong to the canonical shape, not to a Jobs-specific reference.

### H9. `Subscription` and `AlertTaskSubscriber` / `SqlTaskSubscription` are three near-identical shapes
- **Location:** `model.ts:4656` (`Subscription`), `model.ts:836` (`AlertTaskSubscriber`), `model.ts:4580` (`SqlTaskSubscription`), `model.ts:4669` (`Subscription_Subscriber`).
- **Category:** Duplicate concepts (#12), inconsistent naming (#17).
- **Suggestion:** Standardize on `Subscriber` for the leaf type and `SubscriptionList` (or just `Subscription`) for the container. Avoid mixing `Subscriber` (alert), `Subscription` (sql), and `Subscription_Subscriber` (dashboard).
- **Rationale:** Each task type re-invents the same `userName | destinationId` oneof under a different name. This is a porting artifact, not a domain distinction.

### H10. `TerminationCode_Code` — proto-name leakage on a public enum
- **Location:** `model.ts:632`, `model.ts:499` (`QueueDetailsCode_Code`), `model.ts:717` (`TerminationType_Type`).
- **Category:** Type-suffix tautology (#20), Go/Java-style names (#14).
- **Suggestion:** Lift to `TerminationCode`, `QueueReasonCode`, and `TerminationType`; the proto-wrapper underscore should not appear in public TS identifiers.
- **Rationale:** `TerminationCode_Code.SUCCESS` reads as `Code.Code.SUCCESS`. The repeated token is a porting artifact from the Go SDK's proto-message naming.

### H11. `RunLifecycleStateV2_State` — versioned + tautological enum
- **Location:** `model.ts:532`, related `model.ts:518` (`RunLifeCycleState_RunLifeCycleState`).
- **Category:** Type-suffix tautology (#20), versioned API leakage.
- **Suggestion:** Rename to `RunLifecycleState` (current canonical, drop V1) and `RunStatusState` (legacy). The `V2` suffix should be hidden behind the SDK version, not part of TypeScript identifiers.
- **Rationale:** Consumers shouldn't pick between v1/v2 enums based on a suffix; the SDK should pick one. The dual identifier guarantees confusion.

### H12. `Run.numberInJob` always equals `Run.runId` — meaningless field
- **Location:** `model.ts:3422`, `model.ts:2107`, `model.ts:3759`.
- **Category:** Misleading names (#6), generic field names losing meaning (#15).
- **Suggestion:** Drop or alias; if it must stay for back-compat, document the duplication on the field rather than the type.
- **Rationale:** The comment "This is set to the same value as `run_id`" makes the field a no-op. New TS users will assume it's distinct.

### H13. `RunNow_Response.numberInJob` reused
- **Location:** `model.ts:3759`.
- **Category:** Misleading names (#6).
- **Suggestion:** Same as H12 — remove or rename to `runIdAlias`.
- **Rationale:** Same dead duplication on the response.

### H14. `Format` enum value `SINGLE_TASK` is semantically dead
- **Location:** `model.ts:150-153`.
- **Category:** Misleading names (#6).
- **Suggestion:** Mark `SINGLE_TASK` with `@deprecated` (the JSDoc on `CreateJob.format` says it's always `MULTI_TASK`).
- **Rationale:** Exposing a value the server will never return is a footgun.

### H15. `TaskDependencyType.NONE_FAILED` reads as a negation, not a condition
- **Location:** `model.ts:305`.
- **Category:** Misleading names (#6).
- **Suggestion:** Document inline, or rename to `NO_FAILURES_AT_LEAST_ONE_RAN`. Alternatively, `AT_LEAST_ONE_SUCCESS_NONE_FAILED`.
- **Rationale:** The enum-level JSDoc clarifies "none failed AND at least one was executed" — this is non-obvious from the name.

### H16. `JobsHealthMetric` / `JobsHealthOperator` / `JobsHealthRule` / `JobsHealthRules` — pluralization confusion
- **Location:** `model.ts:199`, `model.ts:208`, `model.ts:2642`, `model.ts:2650`.
- **Category:** Singular/plural mismatch (#9), redundant suffixes (#8).
- **Suggestion:** `JobsHealthRule` and `JobsHealthRules` differ only by `s` and the inner wraps a `rules?: JobsHealthRule[]`. Flatten — make the array the public shape (call it `HealthRules` or just `HealthRule[]`).
- **Rationale:** Hairsplitting wrappers around arrays force consumers to write `{rules: [...]}` instead of `[...]`. Plural type names alongside singular ones are the most error-prone pattern in this file.

### H17. `JobsHealth*` prefix is inconsistent — `Jobs` is plural
- **Location:** `model.ts:199`, `model.ts:208`, `model.ts:2642`, `model.ts:2650`.
- **Category:** Singular/plural mismatch (#9), Go/Java-style names (#14).
- **Suggestion:** Use the singular product noun: `JobHealthMetric`, `JobHealthRule`. Or just `HealthMetric` if global.
- **Rationale:** `Job.health: JobsHealthRules` reads as "this job's healths" — the `s` is a porting artifact (proto file is `jobs.proto`).

### H18. `RunNow_Response.runId` field is the "newly triggered run" — confusingly typed `number`
- **Location:** `model.ts:3757`.
- **Category:** Underspecified IDs (#19).
- **Suggestion:** Add a branded type alias `RunId = number & {readonly __brand: 'RunId'}` or use `string` to match `bigint`-safe APIs.
- **Rationale:** Run IDs exceed Number.MAX_SAFE_INTEGER (~9e15) for long-lived workspaces. The current `number` typing silently lossy-truncates; consumers cannot distinguish `runId`, `jobId`, `taskRunId`, `repairId`, `originalAttemptRunId`, `dbtCloudJobRunId` (string!), `dbtPlatformJobRunId` (string!).

### H19. `DbtCloudTaskOutput.dbtCloudJobRunId: number` but `DbtPlatformTaskOutput.dbtPlatformJobRunId: string`
- **Location:** `model.ts:1712`, `model.ts:1744`.
- **Category:** Field contradicting type domain (#16), misleading names (#6).
- **Suggestion:** Standardize on `string` for upstream IDs; note in JSDoc.
- **Rationale:** Same semantic field encoded as two different TS types in adjacent interfaces is a bug magnet.

### H20. `GetRunOutput_Response.result` oneof tag is `notebookOutput` but the field discriminates "task" type — misleading
- **Location:** `model.ts:2204-2257`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename `result` to `taskOutput` (since the union members are `notebookOutput | sqlOutput | dbtOutput | ...`). Then `result` could refer to a higher-level `RunResultState` field that semantically belongs there.
- **Rationale:** `result` on a run-output type is confusable with `RunResultState`, and `Run.status.terminationDetails.message` is also "the result".

### H21. `Run_JobLevelParameters` confusingly named with proto underscore and "parameters" plural for a single record
- **Location:** `model.ts:3506`.
- **Category:** Underscores in TS identifiers (#4), singular/plural mismatch (#9).
- **Suggestion:** Rename to `RunJobParameter` (singular — it's an array element with `name`, `default`, `value` for one parameter).
- **Rationale:** It is used as `jobParameters?: Run_JobLevelParameters[]` — a `Parameters[]` typing is a hard read.

### H22. `RunJobTask` reads as "run-job task" or "run a job task" — ambiguous
- **Location:** `model.ts:3515`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RunChildJobTask` or `TriggerJobTask` (this is the "trigger another job" task type per JSDoc on line 3991).
- **Rationale:** Reading `task: RunJobTask` is ambiguous: is it "the run of a job task" or "task that runs a job"?

### H23. `RunJobTask_RunJobTaskOutput` is "double-stuttered"
- **Location:** `model.ts:3613`.
- **Category:** Type-suffix tautology (#20), Go/Java-style names (#14).
- **Suggestion:** Rename to `RunJobTaskOutput` (no wrapping namespace prefix needed in TS).
- **Rationale:** `RunJobTask_RunJobTaskOutput` repeats the parent name; a flat name is shorter and equally clear in TS.

### H24. `client.cancelAllRuns` request type `CancelAllRuns` (not `CancelAllRunsRequest`) but response is `CancelAllRuns_Response`
- **Location:** `model.ts:1099`, `model.ts:1108`, `client.ts:124`.
- **Category:** Inconsistent suffix conventions (#17), redundant suffixes (#8).
- **Suggestion:** Pick one: either `CancelAllRunsRequest` + `CancelAllRunsResponse`, or `CancelAllRuns` + `CancelAllRunsResult`.
- **Rationale:** Mixing zero-suffix on the request and `_Response` on the response is a porting smell ("the response wraps the proto Response message"). It also makes JSDoc grepping harder.

### H25. `Repair.id` vs `RepairRun_Response.repairId`
- **Location:** `model.ts:3107`, `model.ts:3236`.
- **Category:** Generic field names losing meaning (#15), inconsistent naming (#17).
- **Suggestion:** Rename `Repair.id` to `repairId`.
- **Rationale:** A bare `id` field on a type called `Repair` is technically OK but breaks the workspace convention of always disambiguating IDs.

### H26. `BaseJob` and `GetJob_Response` and `Run` duplicate ~12 identical fields
- **Location:** `model.ts:969`, `model.ts:2040`, `model.ts:3414`, `model.ts:1008`.
- **Category:** Duplicate concepts (#12).
- **Suggestion:** Extract a shared `JobIdentity` / `JobCoreFields` interface or use TS `Pick`/`Omit` on a base shape.
- **Rationale:** Fields like `jobId`, `creatorUserName`, `runAsUserName`, `settings`, `createdTime`, `triggerState`, `hasMore`, `effectiveBudgetPolicyId`, `effectiveUsagePolicyId`, `path` are repeated verbatim in `BaseJob` and `GetJob_Response`. Diverges silently.

### H27. `RunStatus.state` (V2) vs `RunState.lifeCycleState` (V1) — same concept, different field names + different enums
- **Location:** `model.ts:3867`, `model.ts:3881`.
- **Category:** Duplicate concepts (#12), versioned API leakage (#11).
- **Suggestion:** Pick `RunStatus` as the canonical shape, deprecate `RunState`, and document the deprecation in the rule.
- **Rationale:** The JSDoc on `Run.state` already says "Deprecated. Please use the `status` field instead." but the type is still exported and still shows up in the union.

### H28. `RunState.userCancelledOrTimedout` — typo + boolean-of-two-things
- **Location:** `model.ts:3875`.
- **Category:** Misleading names (#6).
- **Suggestion:** Fix spelling to `userCancelledOrTimedOut`. Better, split into `cancelledByUser: boolean` and `timedOut: boolean`.
- **Rationale:** Compound booleans (X-or-Y) are an anti-pattern. The current name silently drops one bit of info.

### H29. `DataSecurityMode` enum mixes prefixed and unprefixed values
- **Location:** `model.ts:94-126`.
- **Category:** Redundant enum prefixes (#2), inconsistent naming (#17).
- **Suggestion:** Drop the `DATA_SECURITY_MODE_` prefix on the three alias values; either all values share a prefix, or none do. Currently we have `NONE`, `SINGLE_USER`, `USER_ISOLATION`, ..., `DATA_SECURITY_MODE_STANDARD`, `DATA_SECURITY_MODE_DEDICATED`, `DATA_SECURITY_MODE_AUTO`.
- **Rationale:** The reader can't predict whether they need `DataSecurityMode.AUTO` or `DataSecurityMode.DATA_SECURITY_MODE_AUTO` — they have to read the file.

### H30. `RunLifeCycleState_RunLifeCycleState` is misspelled internally and externally
- **Location:** `model.ts:518`.
- **Category:** Acronym/word casing (#3), Go/Java-style names (#14).
- **Suggestion:** Spell as one word: `RunLifecycleState_RunLifecycleState`. Better, drop the redundancy entirely: `RunLifecycleState`.
- **Rationale:** "Lifecycle" is one word in modern usage (per OED). Mixing `LifeCycle` and `Lifecycle` (compare H11 — `RunLifecycleStateV2_State` — already one word) within the same file is the worst kind of acronym-casing inconsistency.

### H31. `MAXIMUM_CONCURRENT_RUNS_REACHED` (CleanRoom) vs `MAX_CONCURRENT_RUNS_REACHED` (queue) vs `MAX_CONCURRENT_RUNS_EXCEEDED` (termination)
- **Location:** `model.ts:413`, `model.ts:501`, `model.ts:565`, `model.ts:685`.
- **Category:** Long enum values, inconsistent naming (#17, #18).
- **Suggestion:** Normalize to one form. The `MAX_` form is more common; reach-vs-exceed should pick one verb.
- **Rationale:** Three enums describe the same overflow scenario with three different names. Consumers cannot write a generic handler.

### H32. `RunLifeCycleState_RunLifeCycleState` is missing `QUEUED` in some doc-orderings but `RunLifecycleStateV2_State.QUEUED` is present
- **Location:** `model.ts:518-528`, `model.ts:532-544`.
- **Category:** Versioned API leakage, inconsistent enums.
- **Suggestion:** Document the migration table at the top of the file.
- **Rationale:** Type checks against the V1 enum that branch on `QUEUED` are silently wrong vs V2.

### H33. `client.repair` and `client.repairWaiter` — verb mismatch with the request type
- **Location:** `client.ts:570`, `client.ts:595`.
- **Category:** Inconsistent action verbs (#17).
- **Suggestion:** Either name the method `repairRun` to match the type `RepairRun`, or rename the request type `Repair` to match the method.
- **Rationale:** All other client methods follow `verbNoun(NounVerb)` or `verbNoun(VerbNoun)` consistently; `repair(RepairRun)` is the outlier.

### H34. `client.exportRun` returns `ExportRun_Response` which contains a `views` array of `ViewItem`
- **Location:** `client.ts:268`, `model.ts:1864`, `model.ts:4982`.
- **Category:** Vague/generic (#1).
- **Suggestion:** Rename `ViewItem` to `ExportedView` or `RunView`.
- **Rationale:** "Item" is the canonical empty noun. The type has `content`, `name`, `type: ViewType` — call it what it is.

### H35. `ViewType` enum vs `ViewsToExport` enum — overlapping but disjoint
- **Location:** `model.ts:350`, `model.ts:360`.
- **Category:** Duplicate concepts (#12).
- **Suggestion:** Merge or namespace: `View.Type` (NOTEBOOK | DASHBOARD) and `View.ExportSelector` (CODE | DASHBOARDS | ALL).
- **Rationale:** Two enums about "views" with different value sets and intent. Users will pick the wrong one.

### H36. `GitSource.gitReference` discriminator is named `gitBranch | gitTag | gitCommit` — but the parent has `gitUrl` / `gitProvider` (no `git` prefix on the data)
- **Location:** `model.ts:2286-2312`.
- **Category:** Inconsistent naming (#17), redundant prefixes (#2).
- **Suggestion:** Make the oneof tags `branch | tag | commit` — the parent's `GitSource.git*` prefix already provides namespace.
- **Rationale:** `gitSource.gitReference.gitBranch` is needless repetition.

### H37. `cancelRunWaiter` polls on `RunLifeCycleState_RunLifeCycleState` (V1) while the modern field is `RunStatus.state`
- **Location:** `client.ts:742-820`.
- **Category:** Versioned API leakage.
- **Suggestion:** Either poll on the new `RunStatus` or document why V1 is still authoritative.
- **Rationale:** Future deprecation of V1 will silently break all four waiters.

---

## Medium

### M1. `Adlsgen2Info` casing — should be `ADLSGen2Info` or `AdlsGen2Info`
- **Location:** `model.ts:734`, `index.ts:64`.
- **Category:** Acronym/word casing (#3).
- **Suggestion:** Use `AdlsGen2Info` (acronym + version + "Info"). ADLS stays uppercase only when alone.
- **Rationale:** The Google TS style guide treats acronyms longer than two letters as words (e.g. `Adls`), but `gen2` should be `Gen2`.

### M2. `AwsAttributes` / `AzureAttributes` / `GcpAttributes` — accept casing
- **Location:** `model.ts:861`, `model.ts:941`, `model.ts:1915`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK as `Aws/Azure/Gcp`, consistent with style guide.
- **Rationale:** All three already follow "first letter only" — good baseline.

### M3. `DbtTask` / `DbtCloudTask` / `DbtPlatformTask` / `DbtPlatformJobRunStep` — acronym casing
- **Location:** `model.ts:1753`, `model.ts:1702`, `model.ts:1735`, `model.ts:1720`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Already follows "Dbt"; OK.
- **Rationale:** Three-letter ID treated as a word — consistent.

### M4. `EbsVolume*` and `Ebs*` — keep
- **Location:** `model.ts:908`, `model.ts:927`, `model.ts:933`, `model.ts:143`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Keep as `Ebs*`. Consistent with TS style guide.
- **Rationale:** —

### M5. `GcsStorageInfo` — `Gcs` casing
- **Location:** `model.ts:1972`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK; consistent with file.

### M6. `S3StorageInfo` — `S3` (number) keeps caps
- **Location:** `model.ts:4284`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Keep — `S3` is a brand name, kept as-is.

### M7. `Dbfs*` types — keep
- **Location:** `model.ts:1681`, `model.ts:106`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK; consistent.

### M8. `PowerBi*` casing (vs `PowerBI`)
- **Location:** `model.ts:2992`, `model.ts:3005`, `model.ts:3023`, `model.ts:174-175`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Brand-style "BI" is industry-standard caps; consider `PowerBI*`. The Microsoft brand is "Power BI". Currently mixed: type uses `PowerBi`, JSDoc uses `Power BI`.
- **Rationale:** Per the TS style guide, "BI" is an acronym (Business Intelligence), so `PowerBI` is correct. Going with `PowerBi` is inconsistent with `SqlTask` (3 letters).

### M9. `SqlTask` / `SqlAlertState` / etc. — `Sql` lower or upper?
- **Location:** `model.ts:4414`, `model.ts:4380`, `model.ts:581`, `model.ts:588`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Either `Sql` everywhere (current) or `SQL` everywhere. Pick one.
- **Rationale:** The TS style guide allows acronyms of 3+ letters to be word-cased (`Sql`); this is consistent in this file. Note however the JSDoc still writes "SQL" — fine for prose.

### M10. `HardwareAcceleratorType` enum values `GPU_1xA10`, `GPU_8xH100`, `GPU_1xH100` (lowercase `x`)
- **Location:** `model.ts:170-177`.
- **Category:** Naming convention violation in enum value strings.
- **Suggestion:** The TS enum keys are properly `GPU_1X_A10`, but the values keep the wire form. This is OK since the wire is contract — but flag the asymmetry inline.
- **Rationale:** Wire compatibility forces lowercase `x`; the enum key uppercase is fine.

### M11. `ComputeKind.COMPUTE_KIND_UNSPECIFIED` — redundant enum prefix
- **Location:** `model.ts:56`.
- **Category:** Redundant enum prefixes (#2).
- **Suggestion:** Drop the redundant prefix on `_UNSPECIFIED` if the wire allows. If wire-locked, accept.
- **Rationale:** Proto-style "X_UNSPECIFIED" enum sentinels are common; TS could surface as `ComputeKind.UNSPECIFIED`. Document that wire compatibility was the reason.

### M12. `ConfidentialComputeType.CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED` / `CONFIDENTIAL_COMPUTE_TYPE_NONE`
- **Location:** `model.ts:67-68`.
- **Category:** Redundant enum prefixes (#2).
- **Suggestion:** Same as M11; would prefer `UNSPECIFIED` / `NONE`.

### M13. `DbtPlatformRunStatus.DBT_PLATFORM_RUN_STATUS_UNSPECIFIED`
- **Location:** `model.ts:130`.
- **Category:** Redundant enum prefixes (#2).

### M14. `RefreshGranularity` and `RefreshPolicyMode` values
- **Location:** `model.ts:213-223`, `model.ts:226-232`.
- **Category:** Redundant enum prefixes (#2).
- **Suggestion:** `RefreshGranularity.DAY` instead of `REFRESH_GRANULARITY_DAY`.

### M15. `AwsAvailability.SPOT_WITH_FALLBACK` vs `AzureAvailability.SPOT_WITH_FALLBACK_AZURE`
- **Location:** `model.ts:24`, `model.ts:40`, `model.ts:162`.
- **Category:** Redundant enum prefixes (#2).
- **Suggestion:** Drop the `_AZURE` / `_GCP` suffixes — the enclosing enum name already disambiguates.
- **Rationale:** `AzureAvailability.SPOT_WITH_FALLBACK_AZURE` reads as "SpotWithFallbackAzure on AzureAvailability". The cloud is encoded twice. Same issue for GCP: `PREEMPTIBLE_WITH_FALLBACK_GCP`.

### M16. `TriggerType.RUN_JOB_TASK` is named after a task type, not a trigger
- **Location:** `model.ts:339`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RUN_JOB`.
- **Rationale:** "Run Job Task" duplicates the task-type tag inside an enum about triggers.

### M17. `RunType.JOB_RUN` / `WORKFLOW_RUN` / `SUBMIT_RUN` — `_RUN` suffix is the enum's own purpose
- **Location:** `model.ts:250-252`.
- **Category:** Redundant enum prefixes (#2).
- **Suggestion:** `JOB`, `WORKFLOW`, `SUBMIT` (or `ONE_TIME`).

### M18. `RuntimeEngine.NULL` (versus `STANDARD`, `PHOTON`)
- **Location:** `model.ts:260`.
- **Category:** Reserved-word collision (#10), vague/generic (#1).
- **Suggestion:** Rename to `DEFAULT` or `UNSPECIFIED`. `NULL` is a TS/JS keyword (lowercase `null`) and reserved word in other languages.

### M19. `JobsHealthMetric.RUN_DURATION_SECONDS` — long but OK
- **Location:** `model.ts:200`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable.

### M20. `JobsHealthMetric.STREAMING_BACKLOG_*` (4 values)
- **Location:** `model.ts:201-204`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable; consider grouping into a nested enum if the four become five.

### M21. `Repair.startTime` / `Repair.endTime` (epoch ms)
- **Location:** `model.ts:3101-3103`.
- **Category:** Generic field names losing meaning (#15).
- **Suggestion:** Document units in name: `startTimeMs` or use a `Date`-typed alias.
- **Rationale:** TS `number` for milliseconds is the same shape as TS `number` for seconds. Cf. `timeoutSeconds` (which DOES carry the unit).

### M22. `CreateJob.timeoutSeconds` (seconds) vs `CreateJob.minRetryIntervalMillis` (ms) — unit-suffix inconsistency
- **Location:** `model.ts:1515`, `model.ts:1600`.
- **Category:** Inconsistent unit suffixes (#17).
- **Suggestion:** Use one unit (preferably `Ms` or `Seconds` for everything). At least pick one.
- **Rationale:** Within one settings object, seconds and millis differ only by a 3-letter suffix; easy to misuse.

### M23. `FileArrivalTriggerConfiguration.minTimeBetweenTriggersSeconds` — extremely long
- **Location:** `model.ts:1885`.
- **Category:** Overly verbose (#7).
- **Suggestion:** Acceptable since unit is encoded; can drop "Triggers" since the type already says it: `minTimeBetweenFiringsSeconds` or `minIntervalSeconds`.

### M24. `WaitAfterLastChangeSeconds` — appears identically in three triggers
- **Location:** `model.ts:1891`, `model.ts:2864`, `model.ts:4713`.
- **Category:** Verbose, repetitive (#7).
- **Suggestion:** OK, document once.

### M25. `CleanRoomsNotebookTask` (plural "Rooms") vs `CleanRoomTaskRunState` (singular)
- **Location:** `model.ts:1141`, `model.ts:1126`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Pick one. `CleanRoom*` (singular) is consistent with the standalone product "Clean Rooms" being treated as a singular feature.

### M26. `clean_room_name` (snake_case in wire) → `cleanRoomName` (good); but JSDoc switches to `cleanrooms` in URL
- **Location:** `model.ts:1143`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Acceptable; brand inconsistency is upstream's responsibility.

### M27. `AlertTask.workspacePath` — uses `workspacePath` while elsewhere it's `path`
- **Location:** `model.ts:820`, `model.ts:1005`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Make all "path" fields workspace-prefixed (`BaseJob.path` → `workspacePath`).

### M28. `BaseJob.path` is documented as workspace path but field is bare
- **Location:** `model.ts:1005`.
- **Category:** Generic field names (#15).
- **Suggestion:** Rename to `workspacePath`. Matches `AlertTask.workspacePath`.

### M29. `DbtCloudJobRunStep` (deprecated) and `DbtPlatformJobRunStep` (new)
- **Location:** `model.ts:1690`, `model.ts:1720`.
- **Category:** Versioned API leakage.
- **Suggestion:** OK while transition is documented; reconsider after dbt Cloud is dropped.

### M30. `DbtTask_DbtTaskOutput` — proto stutter
- **Location:** `model.ts:1781`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `DbtTaskOutput`.

### M31. `NotebookTask_NotebookOutput`
- **Location:** `model.ts:2918`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `NotebookTaskOutput`.

### M32. `ClusterSpec_NewCluster` — nested name is verbose; would be just `NewClusterSpec`
- **Location:** `model.ts:1253`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `NewClusterSpec`.

### M33. `CleanRoomsNotebookTask_CleanRoomsNotebookTaskOutput`
- **Location:** `model.ts:1156`.
- **Category:** Type-suffix tautology (#20) — extreme.
- **Suggestion:** Rename to `CleanRoomsNotebookTaskOutput`.

### M34. `RunJobTask_RunJobTaskOutput`
- **Location:** `model.ts:3613`.
- **Category:** Type-suffix tautology (#20) (also flagged in H23).

### M35. `SqlTask_*` family — six output types
- **Location:** `model.ts:4452`, `model.ts:4465`, `model.ts:4473`, `model.ts:4491`, `model.ts:4512`, `model.ts:4518`, `model.ts:4531`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Drop the `SqlTask_` prefix in TS: `SqlAlertOutput`, `SqlDashboardOutput`, `SqlDashboardWidgetOutput`, `SqlOutput`, `SqlOutputError`, `SqlQueryOutput`, `SqlStatementOutput`.

### M36. `ResolvedValues_*` family — 11 sub-types
- **Location:** `model.ts:3303-3412`.
- **Category:** Type-suffix tautology (#20), Go/Java-style names (#14).
- **Suggestion:** Hoist into `<TaskType>ResolvedValues` (e.g., `NotebookTaskResolvedValues`) without the `ResolvedValues_` prefix.

### M37. `SparkJarTask.jarUri` (deprecated) — already deprecated
- **Location:** `model.ts:4328`.
- **Category:** OK as docstring; ensure `@deprecated` JSDoc tag added.

### M38. `SparkJarTask.runAsRepl` — deprecated; values restricted
- **Location:** `model.ts:4342`.
- **Category:** Vague/misleading (#6).
- **Suggestion:** `@deprecated`. Comment says "A value of `false` is no longer supported."

### M39. `JobLevelParameter.default` — `default` is a TS keyword in some positions
- **Location:** `model.ts:2475`, `model.ts:3510`.
- **Category:** Reserved-word collision (#10).
- **Suggestion:** Rename to `defaultValue`.
- **Rationale:** `default` is a reserved word as a `case` label and `switch` token. Object property `default` is legal but trips linters and confuses code editors.

### M40. `JobsHealthRule.op` and `ConditionTask.op` — short, opaque
- **Location:** `model.ts:2644`, `model.ts:1485`.
- **Category:** Cryptic abbreviations (#5).
- **Suggestion:** Rename to `operator`.
- **Rationale:** `op` saves one word but is too terse for a public API.

### M41. `Repair.type` (RepairType) is a reserved-ish word
- **Location:** `model.ts:3099`, `model.ts:4988`.
- **Category:** Reserved-word collision (#10).
- **Suggestion:** Acceptable on objects (TS allows `type` as a property), but flag against naming-convention rule.

### M42. `RunStatus.state` — `state` is generic
- **Location:** `model.ts:3882`.
- **Category:** Generic field names (#15).
- **Suggestion:** Acceptable in context (the type is `RunStatus`), but consider `lifecycleState` to match V1.

### M43. `RunNow.only` field — what does "only" mean?
- **Location:** `model.ts:3653`.
- **Category:** Cryptic abbreviations (#5), misleading names (#6).
- **Suggestion:** Rename to `taskKeysToRun` or `runOnlyTasks`.
- **Rationale:** A standalone `only: string[]` field on a request is a riddle.

### M44. `RunNow.idempotencyToken`, `SubmitRun.idempotencyToken` — OK
- **Location:** `model.ts:3649`, `model.ts:4619`.
- **Category:** Verbose but precise.

### M45. `RepairRun.rerunTasks` (verb prefix `re-`) + `rerunAllFailedTasks` + `rerunDependentTasks` — OK pattern
- **Location:** `model.ts:3126-3132`.
- **Category:** Consistent prefix; OK.

### M46. `RepairRun.latestRepairId` vs `RepairRun_Response.repairId` (no `latest`)
- **Location:** `model.ts:3124`, `model.ts:3236`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Document the semantic: request takes "the previous latest", response returns "the new latest".

### M47. `SqlTask.sqlTaskType` oneof name is type-tautological
- **Location:** `model.ts:4417`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `target` or `kind`. The wrapper is already `SqlTask`.

### M48. `SqlTask_SqlOutput.sqlOutputType` — same tautology
- **Location:** `model.ts:4492`.
- **Category:** Type-suffix tautology (#20).

### M49. `Subscription_Subscriber.subscriptionType`
- **Location:** `model.ts:4670`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename oneof tag to `target`.

### M50. `AlertTaskSubscriber.subscriberType`
- **Location:** `model.ts:837`.
- **Category:** Type-suffix tautology (#20).

### M51. `DockerImage.credsOneof` — exposes proto oneof name to TS
- **Location:** `model.ts:1822`.
- **Category:** Go/Java-style names (#14).
- **Suggestion:** Rename to `credentials` or `auth`.

### M52. `JobRunAs.identity` — OK
- **Location:** `model.ts:2484`.

### M53. `AccessControlRequest.principalName` oneof name doesn't match the contents
- **Location:** `model.ts:725`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `principal` — the discriminants are `userName | groupName | servicePrincipalName`, not three different name-shaped values.

### M54. `RunTriggerInfo.runId` — what kind of runId?
- **Location:** `model.ts:4280`.
- **Category:** Underspecified IDs (#19).
- **Suggestion:** Rename to `parentRunId` or `triggeringRunId` (JSDoc says "The run id of the Run Job task run").

### M55. `JobCluster.jobClusterKey` — `jobCluster` namespace already, `Key` is the only meaningful suffix
- **Location:** `model.ts:2426`.
- **Category:** Acceptable; key is the lookup pattern.

### M56. `JobEnvironment.environmentKey` — same pattern, OK.
- **Location:** `model.ts:2467`.

### M57. `TaskSettings.taskKey` — OK, but its repetition across `RunTask`, `RunTaskSettings`, `TaskSettings`, `TaskDependency` is heavy
- **Location:** `model.ts:4737`, `model.ts:3917`, `model.ts:4106`, `model.ts:4726`.
- **Category:** Verbose but precise.

### M58. `TaskDependency.taskKey` (the task being depended on) — could be `dependsOnTaskKey`
- **Location:** `model.ts:4726`.

### M59. `TaskDependency.outcome` — value of a condition task: should be `condition` or `requiredOutcome`
- **Location:** `model.ts:4728`.
- **Category:** Generic field names (#15).

### M60. `ResolvedValues` interface has 11 single-purpose sub-types
- **Location:** `model.ts:3262-3412`.
- **Category:** Verbose; many shapes for one purpose.
- **Suggestion:** Collapse into a single `ResolvedValues` shape with optional fields per task type, or document the union shape pattern.

### M61. `ClusterSpec.spec` (inside `ClusterSpec`) — name-tautology
- **Location:** `model.ts:1223`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename oneof to `target` or `cluster`.

### M62. `RunTask.spec` (same pattern)
- **Location:** `model.ts:4046`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename oneof to `cluster`.

### M63. `RunTaskSettings.spec`, `TaskSettings.spec` — same
- **Location:** `model.ts:4235`, `model.ts:4875`.
- **Category:** Type-suffix tautology (#20).

### M64. `RunTask.task` — oneof inside a type called `RunTask` whose oneof is the task body — tautology
- **Location:** `model.ts:3948`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename oneof to `body` or `payload`.

### M65. `BaseRun.numberInJob` — meaningless field (see H12)
- **Location:** `model.ts:1016`.

### M66. `BaseRun.originalAttemptRunId` — verbose, but precise.

### M67. `BaseRun.runName` vs `BaseRun.runPageUrl` vs `BaseRun.runType` — repeated `run` prefix on a `BaseRun` type
- **Location:** `model.ts:1034`, `model.ts:1036`, `model.ts:1037`.
- **Category:** Redundant prefix (#2).
- **Suggestion:** Drop `run` prefix when already inside `Run*` type: `name`, `pageUrl`, `type`.

### M68. `Run.runId` (inside `Run`) — tautological
- **Location:** `model.ts:3418`, `model.ts:1012`, `model.ts:2103`, `model.ts:3892`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Keep for ID disambiguation against `jobId`; this is intentional disambiguation rather than tautology.

### M69. `Run.jobRunId` field while the type is already a job run
- **Location:** `model.ts:3474`.
- **Category:** Underspecified IDs (#19).
- **Suggestion:** Document `runId vs jobRunId` more clearly; consider `parentJobRunId`.

### M70. `Run.tasks: RunTask[]` — same `tasks` field also exists on `BaseRun`, `Run`, `GetRun_Response` — could be deduped
- **Location:** `model.ts:1042`, `model.ts:3448`, `model.ts:2133`.

### M71. `RunNow_Response.numberInJob` (see H13).

### M72. `ListJobs.limit` vs `ListRuns.limit` documentation discrepancy
- **Location:** `model.ts:2723`, `model.ts:2782`.
- **Category:** Inconsistent docs (not naming, but worth flagging).
- **Suggestion:** Document max values explicitly; `ListJobs` says ≤100, `ListRuns` says <25.

### M73. `ListJobs.offset` deprecated by `pageToken` — but both still typed
- **Location:** `model.ts:2721`.
- **Category:** Deprecation hygiene.
- **Suggestion:** Add `@deprecated` JSDoc to `offset`.

### M74. `Adlsgen2Info` field `destination` — vague (could be `path`, `url`)
- **Location:** `model.ts:736`, similar in `DbfsStorageInfo`, `S3StorageInfo`, `GcsStorageInfo`, `LocalFileInfo`, `VolumesStorageInfo`, `WorkspaceStorageInfo`.
- **Category:** Generic field names (#15).
- **Suggestion:** Each storage type has different URI semantics; `destination` is fine since it's polymorphic, but document the form.

### M75. `Source` enum — only `WORKSPACE`/`GIT` — could be a literal type
- **Location:** `model.ts:280`.
- **Category:** Type design.
- **Suggestion:** Could be `type CodeSource = 'WORKSPACE' | 'GIT'`. Same for `Format`, `ViewType`, etc.

### M76. `Format` enum has only two values (`SINGLE_TASK`, `MULTI_TASK`) and one is dead
- **Location:** `model.ts:150-153`.
- **Category:** Dead enum value.

### M77. `AlertEvaluationState_AlertEvaluationState.UNKNOWN`
- **Location:** `model.ts:378`.
- **Category:** Generic enum value (#1).
- **Suggestion:** `UNKNOWN` is universally vague; consider `NOT_EVALUATED`.

### M78. `SqlTask_SqlTaskQueryStatus.CANCELLED` (double-L) vs `RunResultState_RunResultState.CANCELED` (single-L) vs `DbtPlatformRunStatus.CANCELLED` (double-L)
- **Location:** `model.ts:593`, `model.ts:564`, `model.ts:136`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Pick one spelling; "canceled" (single-L) is the American spelling, "cancelled" is the British. Cross-checking with go SDK keeps wire compat.

### M79. `TerminationCode_Code.USER_CANCELED` vs `TerminationCode_Code.CANCELED` (no `USER_`)
- **Location:** `model.ts:693`, `model.ts:634`.
- **Category:** Overlapping enum values (#12).
- **Suggestion:** Document distinction (one is user-initiated, the other is platform-initiated).

### M80. `WorkloadType.clients: WorkloadType_ClientsTypes` — `ClientsTypes` is mis-pluralized
- **Location:** `model.ts:5029`, `model.ts:5033`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Rename to `ClientTypes`.

### M81. `RCranLibrary` capitalization — should be `CranLibrary` (R is a language; doesn't need to lead)
- **Location:** `model.ts:3090`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Cran is an acronym (CRAN = Comprehensive R Archive Network). `RLibrary` works too. The `R` prefix is from the Go SDK.

### M82. `PythonPyPiLibrary` — duplicate "Py" prefix
- **Location:** `model.ts:3041`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `PyPiLibrary` (PyPI already means "Python Package Index").

### M83. `MavenLibrary.coordinates` — common, accept.
- **Location:** `model.ts:2828`.

### M84. `PythonWheelTask.namedParameters` vs `parameters` — fine when distinct.

### M85. `RunNow.pythonNamedParams` (no suffix `_NamedParametersEntry`?)
- **Location:** `model.ts:3714`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Rename to `pythonNamedParameters` to match `notebookParams` being plain; or rename all `*Params` to `*Parameters` consistently. Currently: `jobParameters` (plural Parameters), `notebookParams` (Params), `pythonParams`, `pythonNamedParams`, `sparkSubmitParams`, `sqlParams`, `dbtCommands`, `pipelineParams`, `jarParams`.

### M86. `ListJobs.expandTasks`, `ListRuns.expandTasks` — `boolean` flag is fine.

### M87. `ListRuns.runType` shouldn't be optional when the API permits a default
- **Location:** `model.ts:2784`.
- **Category:** Default semantics.

---

## Low

### L1. `Adlsgen2Info` — see M1.
### L2. `WorkloadType_ClientsTypes` — see M80.
### L3. `IncrementalRefreshConfig.onlyRefreshCompletePeriods` — long but precise.
- **Location:** `model.ts:2339`.

### L4. `IncrementalRefreshConfig.detectDataChanges` — boolean naming; acceptable.

### L5. `IncrementalRefreshConfig.mode: RefreshPolicyMode`
- **Location:** `model.ts:2345`.
- **Category:** Generic field name (#15).
- **Suggestion:** Rename to `policyMode` or `refreshMode`.

### L6. `IncrementalRefreshConfig.archiveWindowPeriods` / `refreshWindowPeriods` — `Periods` plural noun on each pair; could be reduced.

### L7. `PowerBiTable.incrementalRefreshDatetimeColumn` — very long
- **Location:** `model.ts:3020`.
- **Category:** Overly verbose (#7).
- **Suggestion:** Rename to `partitionColumn` and document `incremental_refresh` in JSDoc.

### L8. `PowerBiModel.modelName` — `modelName` inside `PowerBiModel` — type-suffix tautology
- **Location:** `model.ts:2996`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `name`.

### L9. `PowerBiTable.name` vs `PowerBiTable.catalog`, `schema` — OK (catalog/schema/name is the Databricks 3-part).

### L10. `JobRunAs.identity` oneof discriminator `userName | servicePrincipalName | groupName` — verbose but precise.

### L11. `AccessControlRequest.principalName` oneof — see M53.

### L12. `QueueDetails.message` and `QueueDetails.code` — OK.

### L13. `SqlConditionConfiguration.sqlQueryId` — `Sql` prefix duplicates `SqlCondition` namespace
- **Location:** `model.ts:4384`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `queryId`.

### L14. `SqlConditionRunInfoDetails.conditionEvaluationSqlStatementId` (deprecated)
- **Location:** `model.ts:4395`.
- **Category:** Overly verbose (#7).

### L15. `SqlConditionRunInfoDetails.conditionEvaluationSatisfied`
- **Location:** `model.ts:4397`.
- **Category:** Verbose.
- **Suggestion:** Rename to `satisfied`.

### L16. `SqlConditionState.latestConditionEvaluation*` — same pattern, verbose.
- **Location:** `model.ts:4402-4411`.

### L17. `OutputSchemaInfo.catalogName` / `OutputSchemaInfo.schemaName` — acceptable.
- **Location:** `model.ts:2940`.

### L18. `OutputSchemaInfo.expirationTime` (epoch ms) — same units issue as M21.

### L19. `JobEmailNotifications.onStart` / `onSuccess` / `onFailure` etc. — OK.

### L20. `JobEmailNotifications.noAlertForSkippedRuns` (deprecated) — `@deprecated` recommended.

### L21. `NotificationSettings.noAlertForSkippedRuns` / `noAlertForCanceledRuns` — `noAlertFor*` negative boolean prefix.
- **Location:** `model.ts:2931-2933`.
- **Category:** Negative-naming antipattern.
- **Suggestion:** Rename to `alertOnSkippedRuns` / `alertOnCanceledRuns` and invert defaults; or keep as documented to match wire.

### L22. `NotificationSettings.alertOnLastAttempt` — opposite polarity to L21; mix is confusing.

### L23. `WebhookNotifications.onDurationWarningThresholdExceeded` — very long field name (40+ chars).
- **Location:** `model.ts:5012`.
- **Category:** Overly verbose (#7).
- **Suggestion:** Acceptable since it encodes the metric; can shorten to `onDurationThresholdExceeded`.

### L24. `WebhookNotifications.onStreamingBacklogExceeded` — accept.

### L25. `ContinuousSettings.taskRetryMode` (enum) — OK.

### L26. `ContinuousSettings.pauseStatus: SchedulePauseStatus` — naming OK.

### L27. `CronSchedule.timezoneId` (lowercase `z`) — OK per ISO usage.

### L28. `CronSchedule.quartzCronExpression` — long but precise.

### L29. `CronSchedule.sqlCondition: SqlConditionConfiguration` — naming OK.

### L30. `JobSource.jobConfigPath` — `jobConfig` prefix inside `JobSource` is mild tautology.

### L31. `JobSource.importFromGitReference` oneof, with one option `importFromGitBranch` — verbose oneof
- **Location:** `model.ts:2625`.
- **Category:** Verbose (#7).
- **Suggestion:** Rename oneof to `source`; rename option to `branch`.

### L32. `JobDeployment.metadataFilePath`
- **Location:** `model.ts:2440`.
- **Category:** Verbose.

### L33. `LogAnalyticsInfo.logAnalyticsWorkspaceId` / `logAnalyticsPrimaryKey` — `logAnalytics` prefix duplicates type name.
- **Location:** `model.ts:2822-2824`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** `workspaceId` and `primaryKey`.

### L34. `GitSource.gitUrl` / `GitSource.gitProvider` / `GitSource.gitReference` — `git` prefix duplicates `GitSource`.
- **Location:** `model.ts:2287-2289`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** `url`, `provider`, `reference`.

### L35. `Run.runName`, `runPageUrl`, `runType` (see M67).

### L36. `BaseRun.startTime` / `endTime` / `setupDuration` / `executionDuration` / `cleanupDuration` / `endTime` / `runDuration` / `queueDuration` — units-in-name half-applied (Duration but not StartTime).
- **Location:** `model.ts:1083-1097`.
- **Category:** Inconsistent unit suffixes (#17).
- **Suggestion:** All durations are ms — make this uniform: `startTimeMs`, `setupDurationMs`, etc.

### L37. `Run.setupDuration` / `executionDuration` — JSDoc states they are 0 for multitask job runs; should be on `RunTask` only.
- **Location:** `model.ts:3491-3496`.
- **Category:** Field contradicting type domain (#16).
- **Suggestion:** Move to `RunTask` only, mark deprecated on `Run`.

### L38. `RepairRun.dbtCommands` — present on `RunNow`, `RunJobTask`, `RepairRun`, `RunParameters`.
- **Location:** `model.ts:3205`, `model.ts:3585`, `model.ts:3726`, `model.ts:3836`.
- **Category:** Repeated identical fields — argues for shared `RunOverrideParameters` base.

### L39. `RunNow.pipelineParams: PipelineParameters` — `Params` vs `Parameters` inconsistency (see M85).

### L40. `SparkPythonTask.pythonFile` — `python` prefix already encoded in type name
- **Location:** `model.ts:4347`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `file` or `script`.

### L41. `SparkPythonTask.parameters` (string[]) — OK.

### L42. `SparkJarTask.mainClassName` — `Name` suffix on `Class` is redundant
- **Location:** `model.ts:4334`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `mainClass`.

### L43. `SparkJarTask.runAsRepl` (deprecated) — see M38.

### L44. `Library.lib` oneof name is redundant
- **Location:** `model.ts:2655`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename to `source` or just inline the oneof fields.

### L45. `Library.egg` (deprecated) — see top JSDoc.
- **Location:** `model.ts:2670`.

### L46. `Library.cran: RCranLibrary` — see M81.

### L47. `Library.requirements: string` (a requirements.txt URI) — OK.

### L48. `InitScriptInfo.storageInfo` oneof — `storageInfo` is reused across `ClusterLogConf` and `InitScriptInfo`.
- **Location:** `model.ts:2359`, `model.ts:1192`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Rename oneof to `destination` or `target`.

### L49. `AwsAttributes.spotBidPricePercent` — long but precise.

### L50. `AzureAttributes.logAnalyticsInfo` — see L33.

### L51. `GcpAttributes.usePreemptibleExecutors` — deprecated per JSDoc (use `availability`).
- **Location:** `model.ts:1921`.
- **Category:** Deprecation hygiene.

### L52. `GcpAttributes.googleServiceAccount` — `google` prefix unnecessary inside `Gcp*` namespace.
- **Location:** `model.ts:1928`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `serviceAccount`.

### L53. `ClusterSpec_NewCluster.useMlRuntime` — `Ml` casing (vs `ML`); follows style.

---

## Observations (whole-file patterns)

### O1. The oneof `$case` discriminator convention is well-established and consistent
- Every oneof in the file uses `{$case: 'tag'; tag: T} | undefined`.
- This is a porting convention from `protobuf-ts`/`@bufbuild/protobuf-es`; it's noisy but consistent, and consumers can pattern-match cleanly. Keep.

### O2. `RunLifeCycleState` (V1) vs `RunLifecycleStateV2` divergence is the biggest design debt
- V1 uses CamelCase that splits "LifeCycle" while V2 uses "Lifecycle" — same word, two spellings inside one file.
- V2 adds `WAITING` and `BLOCKED`. The waiters in `client.ts` still use V1.

### O3. "Task" prefix vs suffix is wildly inconsistent
- 19 task subtypes exist; some use `XTask` (NotebookTask, SqlTask, DbtTask, PowerBiTask) and some use `XCloudTask` / `XPlatformTask` (DbtCloudTask, DbtPlatformTask). Yet `CleanRoomsNotebookTask` is pluralized.
- The base "what's a task here" question requires reading `RunTask.task` oneof to discover.

### O4. ID fields are stringly typed throughout
- All run/job/repair IDs are `number`; `dbtPlatformJobRunId` is `string` (see H19). Standardizing as branded types would prevent silent ID swaps.

### O5. ID disambiguation is heavy
- `runId`, `jobId`, `taskRunIds`, `originalAttemptRunId`, `jobRunId`, `repairId`, `latestRepairId`, `clusterId`, `sparkContextId`, `cleanRoomName`, `notebookName`, `policyId`, `instancePoolId`, `warehouseId`, `widgetId`, `agentId`, `subscriberId`, `destinationId`, `pipelineId`, `dashboardId`, `dbtCloudJobId`, `dbtPlatformJobId`, `dbtCloudJobRunId`, `dbtPlatformJobRunId`, `idempotencyToken`, `endpointId`, `gpuNodePoolId`.
- All over the place; many would benefit from branded types.

### O6. `WorkflowRun` is mentioned in `RunType` but no `Workflow*` type exists
- `RunType.WORKFLOW_RUN` is "from `dbutils.notebook.run`". The lack of a corresponding `WorkflowTask` is intentional but worth a doc note.

### O7. JSDoc references `<Databricks>` template-token in many places
- The literal `<Databricks>` string appears in JSDoc throughout (e.g., `model.ts:1925`, `model.ts:889`). This is the placeholder for env-specific brand. Acceptable.

### O8. Deprecated fields are not consistently marked
- Many fields are described as "Deprecated. Please use the X field instead." in prose but lack `@deprecated` JSDoc tag.
- TS LSP will not flag uses; consumers must read prose. Add `@deprecated`.

### O9. Method-vs-type verb-tense pairing
- `client.cancelRun(CancelRun) → CancelRun_Response`: verb-noun matches.
- `client.runNow(RunNow)`: verb-now matches.
- `client.repair(RepairRun) → RepairRun_Response`: verb-noun mismatch.
- `client.submitRun(SubmitRun)`: verb-noun matches.
- See H33.

### O10. The waiters duplicate ~80 lines of code each
- `CancelRunWaiter`, `RepairWaiter`, `RunNowWaiter`, `SubmitRunWaiter` (~80 lines each, mostly identical). Naming: `RepairWaiter` is unique in dropping the `Run` suffix.
- Suggestion: `RepairRunWaiter` for consistency.

### O11. `client.ts:594` declares `repair()` method (not `repairRun()`) — see H33, O9.

### O12. `index.ts` re-exports both the value classes and types in two blocks
- Enums and waiter classes go through `export { ... }`; interfaces go through `export type { ... }`. Both blocks together have 200+ identifiers.

### O13. `Format` and `Source` are top-level public enums named with single English words
- These specific names collide with global and tooling identifiers — see H3, H4.

### O14. Acronym-casing rule should be documented
- `Sql`, `Dbt`, `Jvm`, `Adls`, `Aws`, `Azure`, `Gcp`, `Gcs`, `Powerbi` (mixed), `Ml`, `Mlflow`, `Gpu`, `Lakeview`, `Dbfs`, `Ebs`, `Vm`.
- The pattern is mostly "first letter of acronym capitalized only", with a few exceptions. Codify.

### O15. Wire-shape vs SDK-shape concept leakage
- `numberInJob`, `originalAttemptRunId`, `Run_JobLevelParameters` are wire artifacts the TS layer should hide or rename.

### O16. Inconsistent abbreviations: `Params` vs `Parameters`
- Within the same parent type (e.g., `RunNow`): `jobParameters`, `notebookParams`, `pythonParams`, `pipelineParams`, `pythonNamedParams`, `sqlParams`, `sparkSubmitParams`, `jarParams`, `dbtCommands`.
- Standardize on `Parameters`.

---

## Domain Glossary

| Term                 | Meaning in this SDK                                                                  |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Job**              | A persistent, named workflow definition. Created via `createJob`. Has `jobId`.        |
| **Run**              | A single execution of a job. Has `runId`. Triggered via `runNow`/`submitRun`/schedule.|
| **Job Run**          | The top-level run of a job (parent of per-task runs).                                 |
| **Task**             | A unit of work within a job's DAG. Identified by `taskKey`.                           |
| **Task Run**         | The execution of a single task within a run. Has its own `runId`.                     |
| **Repair**           | A re-run of failed tasks within a previously failed job run. Each repair has its own `repairId`. |
| **Trigger**          | The event that initiates a run (cron, file arrival, table, model, etc.).              |
| **Trigger Type**     | The taxonomy of triggers (`PERIODIC`, `ONE_TIME`, `RETRY`, `FILE_ARRIVAL`, ...).       |
| **Lifecycle State**  | Where a run is in its execution (QUEUED → PENDING → RUNNING → TERMINATING → TERMINATED). |
| **Result State**     | The outcome of a terminated run (SUCCESS / FAILED / TIMEDOUT / CANCELED / ...).        |
| **Termination Code** | A fine-grained code attached to a terminated run, with a parent `TerminationType`.     |
| **Idempotency Token**| Client-supplied dedup key. If a run with the same token exists, the existing `runId` is returned. |
| **Job Cluster**      | A cluster definition reusable across tasks within one job, keyed by `jobClusterKey`.   |
| **Environment**      | A pip+java dependency spec for serverless tasks, keyed by `environmentKey`.            |
| **Task Type**        | A variant of work: NotebookTask, SparkJarTask, SparkPythonTask, SparkSubmitTask, PipelineTask, PythonWheelTask, DbtTask, SqlTask, RunJobTask, ConditionTask, ForEachTask, CleanRoomsNotebookTask, GenAiComputeTask, AlertTask, PowerBiTask, DashboardTask, DbtCloudTask, DbtPlatformTask, AgenticTask (19 in total). |
| **Source**           | Where source code/assets live: `WORKSPACE` or `GIT`.                                   |
| **Format**           | Wire compatibility tag for the Jobs API; effectively always `MULTI_TASK`.              |
| **Edit Mode**        | UI lock state: `UI_LOCKED` or `EDITABLE`.                                              |
| **Performance Target**| Serverless execution mode: `STANDARD` (cost-optimized) or `PERFORMANCE_OPTIMIZED`.    |
| **Budget Policy / Usage Policy** | Cost attribution policies. `budget_policy_id` is user-specified; `effective_budget_policy_id` is what actually applied. |
| **Health Rule**      | A per-job alerting rule on a metric (e.g. `RUN_DURATION_SECONDS > 3600`).              |
| **Clean Room**       | A Databricks Clean Rooms feature; notebook-tasks scoped to a clean room.               |
| **dbt Cloud / dbt Platform** | External dbt orchestration; `Cloud` is legacy/deprecated, `Platform` is the new name. |
| **GenAI Compute Task** | Custom GPU training-script task with model parameters.                              |
| **Power BI Task**    | Refresh of a Power BI semantic model from Databricks.                                  |
| **Dashboard Task**   | Lakeview dashboard refresh + email subscription.                                       |
| **Alert Task**       | Evaluates an alert and notifies subscribers.                                           |
| **Pipeline Task**    | Triggers a DLT/Spark Declarative Pipeline update.                                      |
| **RunJob Task**      | Triggers another job from a task.                                                      |
| **Condition Task**   | Branches the DAG based on an evaluation; no cluster required.                          |
| **ForEach Task**     | Fan-out: runs a nested task for each input element.                                    |
| **Agentic Task**     | Multi-agent execution; runs a supervisor agent toward a goal.                          |

---

## File Coverage

| File              | Lines | Read In Full? | Notes                                       |
| ----------------- | ----- | ------------- | ------------------------------------------- |
| `v2/index.ts`     | 284   | Yes           | Re-exports; lists every public identifier.  |
| `v2/utils.ts`     | 150   | Yes           | Marshalling and request helpers.            |
| `v2/client.ts`    | 1060  | Yes           | 19 methods + 4 waiter classes.              |
| `v2/model.ts`     | 10184 | Yes (chunks)  | 47 enums, ~140 interfaces, ~5000 lines of marshalling code (5046+).|

All public identifiers exported from `index.ts` were considered. Interfaces below
the `unmarshalAdlsgen2InfoSchema` line (5046+) are runtime marshalling code,
not naming surface; they are not in scope.
