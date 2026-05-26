# Naming Audit: `@databricks/sdk-jobs` (v2)

Scope: `packages/jobs/src/v2/` — `model.ts` (10030 lines), `client.ts` (1289 lines),
`utils.ts` (150 lines), `index.ts` (284 lines). This is the largest API surface in
the SDK and exposes ~140 interfaces, 47 enums, and 19 client methods.

## Summary Table

| Severity     | Count | Notes                                                                          |
| ------------ | ----- | ------------------------------------------------------------------------------ |
| High         | 24    | Reserved-word risks, broken/misleading names, identifier collisions, contradictions, proto-architectural leaks. |
| Medium       | 41    | Redundant prefixes/suffixes, vague names, acronym casing, pluralization.       |
| Low          | 21    | Mild verbosity, plural mismatches, stylistic inconsistencies.                  |
| Observations | 11    | Patterns spanning the entire file (oneof wrappers, ID typing, etc.).           |
| **Total**    | **97** | |

Issues are catalogued below by severity, then by file/line.

---

## High

### H1. `Run` is overloaded across at least seven shapes
- **Location:** `model.ts:3399` (`Run`), `model.ts:908` (`BaseRun`), `model.ts:3875` (`RunTask`), `model.ts:3491` (`Run_JobLevelParameters`), `model.ts:3852` (`RunState`), `model.ts:3866` (`RunStatus`), `model.ts:4261` (`RunTriggerInfo`).
- **Category:** Vague/generic + duplicate concepts (#1, #12).
- **Suggestion:** Treat `Run` as a domain concept and only use the bare token on the canonical job run. Rename `RunTask` -> `TaskRun` (it represents a task **run**, not a run-task), and rename `Run` -> `JobRun` for symmetry with `JobRunId`, `numberInJob`, `runType: JOB_RUN`.
- **Rationale:** Currently `BaseRun`, `Run`, `RunTask`, and the `RunStatus.state` field all describe overlapping shapes. Authors must read JSDoc to know which is which. `RunTask` reading order "task that is a run" is opposite to its actual meaning ("the run of a task").

### H2. `RunTask` and `TaskSettings` are nearly identical but named asymmetrically
- **Location:** `model.ts:3875` (`RunTask`), `model.ts:4676` (`TaskSettings`), `model.ts:4085` (`RunTaskSettings`).
- **Category:** Duplicate concepts (#12), misleading names (#6).
- **Suggestion:** Use `TaskRun` (the runtime/output form) and `Task` (the design-time form). Drop `RunTaskSettings` in favour of `SubmitTask` if it is submit-specific.
- **Rationale:** A reader sees three shapes (`RunTask`, `TaskSettings`, `RunTaskSettings`) carrying the same union of task types and cannot tell which to use without grepping. The naming pattern (`RunX` for "X on a run", `XSettings` for "X on a job") is undocumented.

### H3. `Format` (top-level public enum) is a reserved-word collision
- **Location:** `model.ts:151`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `JobFormat`.
- **Rationale:** `Format` is a well-known global (the `Intl.NumberFormat`/`Intl.DateTimeFormat` family, `console.format` in some runtimes, and a built-in name in many code-generators). Importing `Format` from a Jobs SDK forces consumers to alias it.

### H4. `Source` (top-level public enum) clashes with global Web/TS names
- **Location:** `model.ts:257`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `TaskSource`, `CodeSource`, or `FileSource` (only two values: `WORKSPACE`, `GIT`).
- **Rationale:** `Source` is the name of the DOM `EventSource` shorthand, Web Audio `AudioBufferSourceNode`, RxJS `Source`, several stream libraries, and lint rules around it. With only two values describing where SQL/Notebook/dbt code lives, a domain prefix is essential.

### H5. `Compute` interface clashes with the larger Databricks Compute API
- **Location:** `model.ts:1362`.
- **Category:** Vague/generic (#1), misleading names (#6).
- **Suggestion:** Rename to `TaskComputeOverride` or `TaskCompute` — the type wraps only `hardwareAccelerator` for serverless GPU.
- **Rationale:** A consumer would expect `Compute` to describe an entire compute target (cluster spec, node type, runtime, etc.). It actually has one field. This is the worst "field contradicting type domain" case in the file (#16).

### H6. `Environment` overload — minimal interface, generic word
- **Location:** `model.ts:1787`.
- **Category:** Vague/generic (#1), reserved-word collision (#10).
- **Suggestion:** Rename to `TaskEnvironment` (matching the per-task `environment_key` reference) or `EnvironmentSpec`.
- **Rationale:** `Environment` is a host-level concept in Node (`process.env`) and a common UI/test-framework type. Inside this file it is a tiny dep-list + base-env reference; it is referenced as `JobEnvironment.spec: Environment`, so a `Spec` suffix matches its role.

### H7. `Repair` lacks a noun and is mistaken for a verb
- **Location:** `model.ts:3082`.
- **Category:** Verb-tense inconsistency (#13), vague/generic (#1).
- **Suggestion:** Rename to `RepairHistoryEntry` (or `RepairAttempt`) — it represents a single past repair.
- **Rationale:** The verb `repair()` exists on the client (`client.ts:781`), and `RepairRunRequest`/`RepairRunRequest_Response` are the request/response shapes. A standalone `Repair` reads as the action, not as a record.

### H8. `Webhook` is a generic top-level name that collides with the platform `Webhook` concept
- **Location:** `model.ts:4938`.
- **Category:** Vague/generic (#1), reserved-word/global collision (#10).
- **Suggestion:** Rename to `WebhookRef` (or `JobWebhook`) — readers grep `Webhook` expecting the request/payload shape, but the actual Webhook _payload_ is `WebhookNotifications`. The bare `Webhook` token is the wrong claimant for that name.
- **Rationale:** "Webhook" is a broad industry term and the actual delivery payload lives under a different identifier; the unqualified type-name should belong to the canonical shape, not to a Jobs-specific reference.

### H9. `Subscription` and `AlertTaskSubscriber` / `SqlTaskSubscription` are three near-identical shapes
- **Location:** `model.ts:4607` (`Subscription`), `model.ts:741` (`AlertTaskSubscriber`), `model.ts:4531` (`SqlTaskSubscription`), `model.ts:4620` (`Subscription_Subscriber`).
- **Category:** Duplicate concepts (#12), inconsistent naming (#17).
- **Suggestion:** Standardize on `Subscriber` for the leaf type and `SubscriptionList` (or just `Subscription`) for the container. Avoid mixing `Subscriber` (alert), `Subscription` (sql), and `Subscription_Subscriber` (dashboard).
- **Rationale:** Each task type re-invents the same `userName | destinationId` oneof under a different name. This is a porting artifact, not a domain distinction.

### H10. `Run.numberInJob` always equals `Run.runId` — meaningless field
- **Location:** `model.ts:3407`, `model.ts:916`, `model.ts:3744`.
- **Category:** Misleading names (#6), generic field names losing meaning (#15).
- **Suggestion:** Drop or alias; if it must stay for back-compat, document the duplication on the field rather than the type.
- **Rationale:** The comment "This is set to the same value as `run_id`" makes the field a no-op. New TS users will assume it's distinct.

### H11. `RunNowRequest_Response.numberInJob` reused
- **Location:** `model.ts:3744`.
- **Category:** Misleading names (#6).
- **Suggestion:** Same as H10 — remove or rename to `runIdAlias`.
- **Rationale:** Same dead duplication on the response.

### H12. `TaskDependencyType.NONE_FAILED` reads as a negation, not a condition
- **Location:** `model.ts:282`.
- **Category:** Misleading names (#6).
- **Suggestion:** Document inline, or rename to `NO_FAILURES_AT_LEAST_ONE_RAN`. Alternatively, `AT_LEAST_ONE_SUCCESS_NONE_FAILED`.
- **Rationale:** The enum-level JSDoc clarifies "none failed AND at least one was executed" — this is non-obvious from the name.

### H13. `JobsHealthMetric` / `JobsHealthOperator` / `JobsHealthRule` / `JobsHealthRules` — pluralization confusion
- **Location:** `model.ts:198`, `model.ts:207`, `model.ts:2556`, `model.ts:2564`.
- **Category:** Singular/plural mismatch (#9), redundant suffixes (#8).
- **Suggestion:** `JobsHealthRule` and `JobsHealthRules` differ only by `s` and the inner wraps a `rules?: JobsHealthRule[]`. Flatten — make the array the public shape (call it `HealthRules` or just `HealthRule[]`).
- **Rationale:** Hairsplitting wrappers around arrays force consumers to write `{rules: [...]}` instead of `[...]`. Plural type names alongside singular ones are the most error-prone pattern in this file.

### H14. `JobsHealth*` prefix is inconsistent — `Jobs` is plural
- **Location:** `model.ts:198`, `model.ts:207`, `model.ts:2556`, `model.ts:2564`.
- **Category:** Singular/plural mismatch (#9), Go/Java-style names (#14).
- **Suggestion:** Use the singular product noun: `JobHealthMetric`, `JobHealthRule`. Or just `HealthMetric` if global.
- **Rationale:** `Job.health: JobsHealthRules` reads as "this job's healths" — the `s` is a porting artifact (proto file is `jobs.proto`).

### H15. `RunNowRequest_Response.runId` field is the "newly triggered run" — confusingly typed `number`
- **Location:** `model.ts:3742`.
- **Category:** Underspecified IDs (#19).
- **Suggestion:** Add a branded type alias `RunId = number & {readonly __brand: 'RunId'}` or use `string` to match `bigint`-safe APIs.
- **Rationale:** Run IDs exceed Number.MAX_SAFE_INTEGER (~9e15) for long-lived workspaces. The current `number` typing silently lossy-truncates; consumers cannot distinguish `runId`, `jobId`, `taskRunId`, `repairId`, `originalAttemptRunId`, `dbtCloudJobRunId`, `dbtPlatformJobRunId` (string!).

### H16. `DbtCloudTaskOutput.dbtCloudJobRunId: number` but `DbtPlatformTaskOutput.dbtPlatformJobRunId: string`
- **Location:** `model.ts:1605`, `model.ts:1637`.
- **Category:** Field contradicting type domain (#16), misleading names (#6).
- **Suggestion:** Standardize on `string` for upstream IDs; note in JSDoc.
- **Rationale:** Same semantic field encoded as two different TS types in adjacent interfaces is a bug magnet.

### H17. `RunJobTask` reads as "run-job task" or "run a job task" — ambiguous
- **Location:** `model.ts:3500`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RunChildJobTask` or `TriggerJobTask` (this is the "trigger another job" task type per JSDoc on line 3976).
- **Rationale:** Reading `task: RunJobTask` is ambiguous: is it "the run of a job task" or "task that runs a job"?

### H18. `BaseJob` and `GetJobRequest_Response` and `Run` duplicate ~10 identical fields
- **Location:** `model.ts:874`, `model.ts:1973`, `model.ts:3399`, `model.ts:908`.
- **Category:** Duplicate concepts (#12).
- **Suggestion:** Extract a shared `JobIdentity` / `JobCoreFields` interface or use TS `Pick`/`Omit` on a base shape.
- **Rationale:** Fields like `jobId`, `creatorUserName`, `runAsUserName`, `settings`, `createdTime`, `triggerState`, `hasMore`, `effectiveBudgetPolicyId`, `effectiveUsagePolicyId` are repeated verbatim in `BaseJob` and `GetJobRequest_Response`. Diverges silently.

### H19. `RunStatus.state` (V2) vs `RunState.lifeCycleState` (V1) — same concept, different field names + different enums
- **Location:** `model.ts:3852`, `model.ts:3866`.
- **Category:** Duplicate concepts (#12), versioned API leakage (#11).
- **Suggestion:** Pick `RunStatus` as the canonical shape, deprecate `RunState`, and document the deprecation in the rule.
- **Rationale:** The JSDoc on `Run.state` already says "Deprecated. Please use the `status` field instead." but the type is still exported and still shows up in the union.

### H20. `MAXIMUM_CONCURRENT_RUNS_REACHED` (CleanRoom) vs `MAX_CONCURRENT_RUNS_REACHED` (queue) vs `MAX_CONCURRENT_RUNS_EXCEEDED` (termination)
- **Location:** `model.ts:390`, `model.ts:478`, `model.ts:542`, `model.ts:662`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Normalize to one form. The `MAX_` form is more common; reach-vs-exceed should pick one verb.
- **Rationale:** Three enums describe the same overflow scenario with three different names. Consumers cannot write a generic handler.

### H21. `client.exportRun` returns `ExportRunRequest_Response` which contains a `views` array of `ViewItem`
- **Location:** `client.ts:449`, `model.ts:1830`, `model.ts:4920`.
- **Category:** Vague/generic (#1).
- **Suggestion:** Rename `ViewItem` to `ExportedView` or `RunView`.
- **Rationale:** "Item" is the canonical empty noun. The type has `content`, `name`, `type: ViewType` — call it what it is.

### H22. `ViewType` enum vs `ViewsToExport` enum — overlapping but disjoint
- **Location:** `model.ts:327`, `model.ts:337`.
- **Category:** Duplicate concepts (#12).
- **Suggestion:** Merge or namespace: `View.Type` (NOTEBOOK | DASHBOARD) and `View.ExportSelector` (CODE | DASHBOARDS | ALL).
- **Rationale:** Two enums about "views" with different value sets and intent. Users will pick the wrong one.

### H23. `cancelRunWaiter` polls on the V1 lifecycle-state enum while the modern field is `RunStatus.state`
- **Location:** `client.ts:971-1048`.
- **Category:** Versioned API leakage.
- **Suggestion:** Either poll on the new `RunStatus` or document why V1 is still authoritative.
- **Rationale:** Future deprecation of V1 will silently break all four waiters.

### H24. `RunLifecycleStateV2` + `RunLifecycleStateV2_State` — `V2` infix leaks API/proto versioning into public identifiers
- **Location:** `model.ts:509` (`RunLifecycleStateV2_State` enum), `model.ts:3615` (`RunLifecycleStateV2` wrapper interface), `model.ts:3867` (`RunStatus.state: RunLifecycleStateV2_State`).
- **Why:** `V2` mid-token in a type name records that the upstream schema versioned this enum, not anything a JS consumer needs. The V1 type already lives at `RunLifeCycleState` / `RunLifeCycleState_RunLifeCycleState`; the V2 variant should adopt a domain-meaningful name rather than a version-stamped one.
- **Category:** Proto-architectural-leak (`V2` mid-position).
- **Suggested:** Rename the wrapper to `RunLifecycleState` (singular, modern) and the enum to `RunLifecycleState_State` — then mark the legacy `RunLifeCycleState` family `@deprecated`. If the V1 type must keep its current name for back-compat, rename the V2 family to `RunPhase` or `RunLifecycleStatus` (anything that says "this is the new shape" without encoding the version number).
- **Rationale:** `V2` as part of a type name is the textbook proto-architectural leak this audit category targets; it bakes upstream-version churn into every consumer's import list. The casing difference (`LifeCycle` vs `Lifecycle`) between V1 and V2 names also makes the pair harder to grep.

---

## Medium

### M1. `Adlsgen2Info` casing — should be `ADLSGen2Info` or `AdlsGen2Info`
- **Location:** `model.ts:706`, `index.ts:60`.
- **Category:** Acronym/word casing (#3).
- **Suggestion:** Use `AdlsGen2Info` (acronym + version + "Info"). ADLS stays uppercase only when alone.
- **Rationale:** The Google TS style guide treats acronyms longer than two letters as words (e.g. `Adls`), but `gen2` should be `Gen2`.

### M2. `AwsAttributes` / `AzureAttributes` / `GcpAttributes` — accept casing
- **Location:** `model.ts:766`, `model.ts:846`, `model.ts:1870`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK as `Aws/Azure/Gcp`, consistent with style guide.
- **Rationale:** All three already follow "first letter only" — good baseline.

### M3. `DbtTask` / `DbtCloudTask` / `DbtPlatformTask` / `DbtPlatformJobRunStep` — acronym casing
- **Location:** `model.ts:1646`, `model.ts:1595`, `model.ts:1628`, `model.ts:1613`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Already follows "Dbt"; OK.
- **Rationale:** Three-letter ID treated as a word — consistent.

### M4. `EbsVolume*` and `Ebs*` — keep
- **Location:** `model.ts:813`, `model.ts:832`, `model.ts:838`, `model.ts:144`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Keep as `Ebs*`. Consistent with TS style guide.
- **Rationale:** —

### M5. `GcsStorageInfo` — `Gcs` casing
- **Location:** `model.ts:1927`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK; consistent with file.

### M6. `S3StorageInfo` — `S3` (number) keeps caps
- **Location:** `model.ts:4267`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Keep — `S3` is a brand name, kept as-is.

### M7. `Dbfs*` types — keep
- **Location:** `model.ts:1574`, `model.ts:106`.
- **Category:** Acronym casing (#3).
- **Suggestion:** OK; consistent.

### M8. `PowerBi*` casing (vs `PowerBI`)
- **Location:** `model.ts:2970`, `model.ts:2983`, `model.ts:2994`, `model.ts:173-175`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Brand-style "BI" is industry-standard caps; consider `PowerBI*`. The Microsoft brand is "Power BI". Currently mixed: type uses `PowerBi`, JSDoc uses `Power BI`.
- **Rationale:** Per the TS style guide, "BI" is an acronym (Business Intelligence), so `PowerBI` is correct. Going with `PowerBi` is inconsistent with `SqlTask` (3 letters).

### M9. `SqlTask` / `SqlAlertState` / etc. — `Sql` lower or upper?
- **Location:** `model.ts:4365`, `model.ts:4363`, `model.ts:558`, `model.ts:565`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Either `Sql` everywhere (current) or `SQL` everywhere. Pick one.
- **Rationale:** The TS style guide allows acronyms of 3+ letters to be word-cased (`Sql`); this is consistent in this file. Note however the JSDoc still writes "SQL" — fine for prose.

### M10. `HardwareAcceleratorType` enum values `GPU_1xA10`, `GPU_8xH100` (lowercase `x`)
- **Location:** `model.ts:171-176`.
- **Category:** Naming convention violation in enum value strings.
- **Suggestion:** The TS enum keys are properly `GPU_1X_A10`, but the values keep the wire form. This is OK since the wire is contract — but flag the asymmetry inline.
- **Rationale:** Wire compatibility forces lowercase `x`; the enum key uppercase is fine.

### M11. `TriggerType.RUN_JOB_TASK` is named after a task type, not a trigger
- **Location:** `model.ts:316`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RUN_JOB`.
- **Rationale:** "Run Job Task" duplicates the task-type tag inside an enum about triggers.

### M12. `RuntimeEngine.NULL` (versus `STANDARD`, `PHOTON`)
- **Location:** `model.ts:237`.
- **Category:** Reserved-word collision (#10), vague/generic (#1).
- **Suggestion:** Rename to `DEFAULT` or `UNSPECIFIED`. `NULL` is a TS/JS keyword (lowercase `null`) and reserved word in other languages.

### M13. `JobsHealthMetric.RUN_DURATION_SECONDS` — long but OK
- **Location:** `model.ts:199`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable.

### M14. `JobsHealthMetric.STREAMING_BACKLOG_*` (4 values)
- **Location:** `model.ts:200-203`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable; consider grouping into a nested enum if the four become five.

### M15. `CleanRoomsNotebookTask` (plural "Rooms") vs `CleanRoomTaskRunState` (singular)
- **Location:** `model.ts:1041`, `model.ts:1026`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Pick one. `CleanRoom*` (singular) is consistent with the standalone product "Clean Rooms" being treated as a singular feature.

### M16. `clean_room_name` (snake_case in wire) → `cleanRoomName` (good); but JSDoc switches to `cleanrooms` in URL
- **Location:** `model.ts:1043`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Acceptable; brand inconsistency is upstream's responsibility.

### M17. `Repair.type` (RepairType) is a reserved-ish word
- **Location:** `model.ts:3084`, `model.ts:4926`.
- **Category:** Reserved-word collision (#10).
- **Suggestion:** Acceptable on objects (TS allows `type` as a property), but flag against naming-convention rule.

### M18. `RunNowRequest.idempotencyToken`, `SubmitRunRequest.idempotencyToken` — OK
- **Location:** `model.ts:3634`, `model.ts:4570`.
- **Category:** Verbose but precise.

### M19. `RepairRunRequest.rerunTasks` (verb prefix `re-`) + `rerunAllFailedTasks` + `rerunDependentTasks` — OK pattern
- **Location:** `model.ts:3111-3117`.
- **Category:** Consistent prefix; OK.

### M20. `DockerImage.credsOneof` — exposes proto oneof name to TS
- **Location:** `model.ts:1715`.
- **Category:** Go/Java-style names (#14).
- **Suggestion:** Rename to `credentials` or `auth`.

### M21. `JobRunAs.identity` — OK
- **Location:** `model.ts:2398`.

### M22. `JobCluster.jobClusterKey` — `jobCluster` namespace already, `Key` is the only meaningful suffix
- **Location:** `model.ts:2340`.
- **Category:** Acceptable; key is the lookup pattern.

### M23. `JobEnvironment.environmentKey` — same pattern, OK.
- **Location:** `model.ts:2381`.

### M24. `TaskSettings.taskKey` — OK, but its repetition across `RunTask`, `RunTaskSettings`, `TaskSettings`, `TaskDependency` is heavy
- **Location:** `model.ts:4682`, `model.ts:3902`, `model.ts:4091`, `model.ts:4671`.
- **Category:** Verbose but precise.

### M25. `ResolvedValues` interface has 11 single-purpose sub-types
- **Location:** `model.ts:3247-3397`.
- **Category:** Verbose; many shapes for one purpose.
- **Suggestion:** Collapse into a single `ResolvedValues` shape with optional fields per task type, or document the union shape pattern.

### M26. `BaseRun.numberInJob` — meaningless field (see H10)
- **Location:** `model.ts:916`.

### M27. `BaseRun.originalAttemptRunId` — verbose, but precise.

### M28. `Run.runId` (inside `Run`) — tautological
- **Location:** `model.ts:3403`, `model.ts:912`, `model.ts:2140`, `model.ts:3877`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Keep for ID disambiguation against `jobId`; this is intentional disambiguation rather than tautology.

### M29. `Run.tasks: RunTask[]` — same `tasks` field also exists on `BaseRun`, `Run`, `GetRunRequest_Response` — could be deduped
- **Location:** `model.ts:942`, `model.ts:3433`, `model.ts:2170`.

### M30. `RunNowRequest_Response.numberInJob` (see H11).

### M31. `Source` enum — only `WORKSPACE`/`GIT` — could be a literal type
- **Location:** `model.ts:257`.
- **Category:** Type design.
- **Suggestion:** Could be `type CodeSource = 'WORKSPACE' | 'GIT'`. Same for `Format`, `ViewType`, etc.

### M32. `Format` enum has only two values (`SINGLE_TASK`, `MULTI_TASK`) and one is dead
- **Location:** `model.ts:151-154`.
- **Category:** Dead enum value.

### M33. `AlertEvaluationState_AlertEvaluationState.UNKNOWN`
- **Location:** `model.ts:355`.
- **Category:** Generic enum value (#1).
- **Suggestion:** `UNKNOWN` is universally vague; consider `NOT_EVALUATED`.

### M34. `SqlTask_SqlTaskQueryStatus.CANCELLED` (double-L) vs `RunResultState_RunResultState.CANCELED` (single-L) vs `DbtPlatformRunStatus.CANCELLED` (double-L)
- **Location:** `model.ts:570`, `model.ts:541`, `model.ts:137`.
- **Category:** Inconsistent naming (#17).
- **Suggestion:** Pick one spelling; "canceled" (single-L) is the American spelling, "cancelled" is the British. Cross-checking with go SDK keeps wire compat.

### M35. `WorkloadType.clients: WorkloadType_ClientsTypes` — `ClientsTypes` is mis-pluralized
- **Location:** `model.ts:4967`, `model.ts:4971`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Rename to `ClientTypes`.

### M36. `RCranLibrary` capitalization — should be `CranLibrary` (R is a language; doesn't need to lead)
- **Location:** `model.ts:3075`.
- **Category:** Acronym casing (#3).
- **Suggestion:** Cran is an acronym (CRAN = Comprehensive R Archive Network). `RLibrary` works too. The `R` prefix is from the Go SDK.

### M37. `PythonPyPiLibrary` — duplicate "Py" prefix
- **Location:** `model.ts:3026`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `PyPiLibrary` (PyPI already means "Python Package Index").

### M38. `MavenLibrary.coordinates` — common, accept.
- **Location:** `model.ts:2797`.

### M39. `PythonWheelTask.namedParameters` vs `parameters` — fine when distinct.

### M40. `ListJobsRequest.expandTasks`, `ListRunsRequest.expandTasks` — `boolean` flag is fine.

### M41. `ListRunsRequest.runType` shouldn't be optional when the API permits a default
- **Location:** `model.ts:2753`.
- **Category:** Default semantics.

---

## Low

### L1. `Adlsgen2Info` — see M1.
### L2. `WorkloadType_ClientsTypes` — see M35.

### L3. `PowerBiTable.name` vs `PowerBiTable.catalog`, `schema` — OK (catalog/schema/name is the Databricks 3-part).

### L4. `JobRunAs.identity` oneof discriminator `userName | servicePrincipalName | groupName` — verbose but precise.

### L5. `QueueDetails.message` and `QueueDetails.code` — OK.

### L6. `OutputSchemaInfo.catalogName` / `OutputSchemaInfo.schemaName` — acceptable.
- **Location:** `model.ts:2909`.

### L7. `JobEmailNotifications.onStart` / `onSuccess` / `onFailure` etc. — OK.

### L8. `WebhookNotifications.onStreamingBacklogExceeded` — accept.

### L9. `ContinuousSettings.taskRetryMode` (enum) — OK.

### L10. `ContinuousSettings.pauseStatus: SchedulePauseStatus` — naming OK.

### L11. `CronSchedule.timezoneId` (lowercase `z`) — OK per ISO usage.

### L12. `CronSchedule.quartzCronExpression` — long but precise.

### L13. `JobSource.jobConfigPath` — `jobConfig` prefix inside `JobSource` is mild tautology.

### L14. `JobDeployment.metadataFilePath`
- **Location:** `model.ts:2354`.
- **Category:** Verbose.

### L15. `Run.setupDuration` / `executionDuration` — JSDoc states they are 0 for multitask job runs; should be on `RunTask` only.
- **Location:** `model.ts:3477-3479`.
- **Category:** Field contradicting type domain (#16).
- **Suggestion:** Move to `RunTask` only, mark deprecated on `Run`.

### L16. `RepairRunRequest.dbtCommands` — present on `RunNowRequest`, `RunJobTask`, `RepairRunRequest`, `RunParameters`.
- **Location:** `model.ts:3190`, `model.ts:3570`, `model.ts:3711`, `model.ts:3821`.
- **Category:** Repeated identical fields — argues for shared `RunOverrideParameters` base.

### L17. `SparkPythonTask.parameters` (string[]) — OK.

### L18. `Library.cran: RCranLibrary` — see M36.

### L19. `Library.requirements: string` (a requirements.txt URI) — OK.

### L20. `AwsAttributes.spotBidPricePercent` — long but precise.

### L21. `ClusterSpec_NewCluster.useMlRuntime` — `Ml` casing (vs `ML`); follows style.

---

## Observations (whole-file patterns)

### O1. The oneof `$case` discriminator convention is well-established and consistent
- Every oneof in the file uses `{$case: 'tag'; tag: T} | undefined`.
- This is a porting convention from `protobuf-ts`/`@bufbuild/protobuf-es`; it's noisy but consistent, and consumers can pattern-match cleanly. Keep.

### O2. "Task" prefix vs suffix is wildly inconsistent
- 19 task subtypes exist; some use `XTask` (NotebookTask, SqlTask, DbtTask, PowerBiTask) and some use `XCloudTask` / `XPlatformTask` (DbtCloudTask, DbtPlatformTask). Yet `CleanRoomsNotebookTask` is pluralized.
- The base "what's a task here" question requires reading `RunTask.task` oneof to discover.

### O3. ID fields are stringly typed throughout
- All run/job/repair IDs are `number`; `dbtPlatformJobRunId` is `string` (see H16). Standardizing as branded types would prevent silent ID swaps.

### O4. ID disambiguation is heavy
- `runId`, `jobId`, `taskRunIds`, `originalAttemptRunId`, `jobRunId`, `repairId`, `latestRepairId`, `clusterId`, `sparkContextId`, `cleanRoomName`, `notebookName`, `policyId`, `instancePoolId`, `warehouseId`, `widgetId`, `agentId`, `subscriberId`, `destinationId`, `pipelineId`, `dashboardId`, `dbtCloudJobId`, `dbtPlatformJobId`, `dbtCloudJobRunId`, `dbtPlatformJobRunId`, `idempotencyToken`, `endpointId`, `gpuNodePoolId`.
- All over the place; many would benefit from branded types.

### O5. JSDoc references `<Databricks>` template-token in many places
- The literal `<Databricks>` string appears in JSDoc throughout (e.g., `model.ts:1880`, `model.ts:824`). This is the placeholder for env-specific brand. Acceptable.

### O6. Method-vs-type verb-tense pairing
- `client.cancelRun(CancelRunRequest) → CancelRunRequest_Response`: verb-noun matches.
- `client.runNow(RunNowRequest)`: verb-now matches.
- `client.repair(RepairRunRequest) → RepairRunRequest_Response`: verb-noun matches now that the request type has the explicit `Request` suffix; the method/type pairing is consistent.
- `client.submitRun(SubmitRunRequest)`: verb-noun matches.

### O7. The waiters duplicate ~80 lines of code each
- `CancelRunWaiter`, `RepairWaiter`, `RunNowWaiter`, `SubmitRunWaiter` (~80 lines each, mostly identical). Naming: `RepairWaiter` is unique in dropping the `Run` suffix.
- Suggestion: `RepairRunWaiter` for consistency.

### O8. `client.ts:781` declares `repair()` method (not `repairRun()`)
- The method name remains `repair` even though the request type is `RepairRunRequest`. Consider `repairRun` for consistency with `submitRun`, `cancelRun`, `runNow`, etc.

### O9. `index.ts` re-exports both the value classes and types in two blocks
- Enums and waiter classes go through `export { ... }`; interfaces go through `export type { ... }`. Both blocks together have 200+ identifiers.

### O10. `Format` and `Source` are top-level public enums named with single English words
- These specific names collide with global and tooling identifiers — see H3, H4.

### O11. Inconsistent abbreviations: `Params` vs `Parameters`
- Within the same parent type (e.g., `RunNowRequest`): `jobParameters`, `notebookParams`, `pythonParams`, `pipelineParams`, `pythonNamedParams`, `sqlParams`, `sparkSubmitParams`, `jarParams`, `dbtCommands`.
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
| **Task Type**        | A variant of work: NotebookTask, SparkJarTask, SparkPythonTask, SparkSubmitTask, PipelineTask, PythonWheelTask, DbtTask, SqlTask, RunJobTask, ConditionTask, ForEachTask, CleanRoomsNotebookTask, GenAiComputeTask, AlertTask, PowerBiTask, DashboardTask, DbtCloudTask, DbtPlatformTask, PythonOperatorTask (19 in total). |
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
| **Python Operator Task** | Runs a Python operator (entry point or class) with structured parameters.        |

---

## File Coverage

| File              | Lines | Read In Full? | Notes                                       |
| ----------------- | ----- | ------------- | ------------------------------------------- |
| `v2/index.ts`     | 284   | Yes           | Re-exports; lists every public identifier.  |
| `v2/utils.ts`     | 150   | Yes           | Marshalling and request helpers.            |
| `v2/client.ts`    | 1289  | Yes           | 19 methods + 4 waiter classes.              |
| `v2/model.ts`     | 10030 | Yes (chunks)  | 47 enums, ~140 interfaces, ~5000 lines of marshalling code (4984+).|

All public identifiers exported from `index.ts` were considered. Interfaces below
the `unmarshalAdlsgen2InfoSchema` line (4984+) are runtime marshalling code,
not naming surface; they are not in scope.

---
