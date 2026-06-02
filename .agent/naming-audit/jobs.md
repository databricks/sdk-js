# Naming Audit: `@databricks/sdk-jobs` (v2)

Path: `packages/jobs/src/v2/`
Versions: v2
Files: `model.ts` (10210 lines), `client.ts` (1249 lines), `utils.ts` (180 lines),
`transport.ts` (73 lines), `index.ts` (284 lines).
Total findings: 55
Last rescanned: 2026-06-02

## Summary Table

| Severity     | Count | Notes                                                                          |
| ------------ | ----- | ------------------------------------------------------------------------------ |
| High         | 14    | Reserved-word risks, broken/misleading names, identifier collisions, contradictions, proto-architectural leaks. |
| Medium       | 22    | Redundant prefixes/suffixes, vague names, pluralization.                       |
| Low          | 15    | Mild verbosity, plural mismatches, stylistic inconsistencies.                  |
| Observations | 4     | Patterns spanning the entire file (oneof wrappers, type design, etc.).         |
| **Total**    | **55** | |

---

## High

### H1. `Format` (top-level public enum) is a reserved-word collision
- **Location:** `model.ts:151`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `JobFormat`.
- **Rationale:** `Format` is a well-known global (the `Intl.NumberFormat`/`Intl.DateTimeFormat` family, `console.format` in some runtimes, and a built-in name in many code-generators). Importing `Format` from a Jobs SDK forces consumers to alias it.

### H2. `Source` (top-level public enum) clashes with global Web/TS names
- **Location:** `model.ts:257`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `TaskSource`, `CodeSource`, or `FileSource` (only two values: `WORKSPACE`, `GIT`).
- **Rationale:** `Source` is the name of the DOM `EventSource` shorthand, Web Audio `AudioBufferSourceNode`, RxJS `Source`, several stream libraries, and lint rules around it. With only two values describing where SQL/Notebook/dbt code lives, a domain prefix is essential.

### H3. `Compute` interface clashes with the larger Databricks Compute API
- **Location:** `model.ts:1362`.
- **Category:** Vague/generic (#1), misleading names (#6).
- **Suggestion:** Rename to `TaskComputeOverride` or `TaskCompute` — the type wraps only `hardwareAccelerator` for serverless GPU.
- **Rationale:** A consumer would expect `Compute` to describe an entire compute target (cluster spec, node type, runtime, etc.). It actually has one field. This is the worst "field contradicting type domain" case in the file (#16).

### H4. `Environment` overload — minimal interface, generic word
- **Location:** `model.ts:1785`.
- **Category:** Vague/generic (#1), reserved-word collision (#10).
- **Suggestion:** Rename to `TaskEnvironment` (matching the per-task `environment_key` reference) or `EnvironmentSpec`.
- **Rationale:** `Environment` is a host-level concept in Node (`process.env`) and a common UI/test-framework type. Inside this file it is a tiny dep-list + base-env reference; it is referenced as `JobEnvironment.spec: Environment`, so a `Spec` suffix matches its role.

### H5. `Repair` lacks a noun and is mistaken for a verb
- **Location:** `model.ts:3084`.
- **Category:** Verb-tense inconsistency (#13), vague/generic (#1).
- **Suggestion:** Rename to `RepairHistoryEntry` (or `RepairAttempt`) — it represents a single past repair.
- **Rationale:** The verb `repair()` exists on the client (`client.ts:769`), and `RepairRunRequest`/`RepairRunResponse` are the request/response shapes. A standalone `Repair` reads as the action, not as a record.

### H6. `Webhook` is a generic top-level name that collides with the platform `Webhook` concept
- **Location:** `model.ts:4938`.
- **Category:** Vague/generic (#1), reserved-word/global collision (#10).
- **Suggestion:** Rename to `WebhookRef` (or `JobWebhook`) — readers grep `Webhook` expecting the request/payload shape, but the actual Webhook _payload_ is `WebhookNotifications`. The bare `Webhook` token is the wrong claimant for that name.
- **Rationale:** "Webhook" is a broad industry term and the actual delivery payload lives under a different identifier; the unqualified type-name should belong to the canonical shape, not to a Jobs-specific reference.

### H7. `Run.numberInJob` always equals `Run.runId` — meaningless field
- **Location:** `model.ts:3408`, `model.ts:916`, `model.ts:2137`.
- **Category:** Misleading names (#6), generic field names losing meaning (#15).
- **Suggestion:** Drop or alias; if it must stay for back-compat, document the duplication on the field rather than the type.
- **Rationale:** The comment "This is set to the same value as `run_id`" makes the field a no-op. New TS users will assume it's distinct.

### H8. `RunNowResponse.numberInJob` reused
- **Location:** `model.ts:3752`.
- **Category:** Misleading names (#6).
- **Suggestion:** Same as H7 — remove the field, or document the duplication on the field if it must stay for back-compat.
- **Rationale:** Same dead duplication on the response.

### H9. `JobsHealthMetric` / `JobsHealthOperator` / `JobsHealthRule` / `JobsHealthRules` — pluralization confusion
- **Location:** `model.ts:198`, `model.ts:207`, `model.ts:2561`, `model.ts:2569`.
- **Category:** Singular/plural mismatch (#9), redundant suffixes (#8).
- **Suggestion:** `JobsHealthRule` and `JobsHealthRules` differ only by `s` and the inner wraps a `rules?: JobsHealthRule[]`. Flatten — make the array the public shape (call it `HealthRules` or just `HealthRule[]`).
- **Rationale:** Hairsplitting wrappers around arrays force consumers to write `{rules: [...]}` instead of `[...]`. Plural type names alongside singular ones are the most error-prone pattern in this file.

### H10. `JobsHealth*` prefix is inconsistent — `Jobs` is plural
- **Location:** `model.ts:198`, `model.ts:207`, `model.ts:2561`, `model.ts:2569`.
- **Category:** Singular/plural mismatch (#9), Go/Java-style names (#14).
- **Suggestion:** Use the singular product noun: `JobHealthMetric`, `JobHealthRule`. Or just `HealthMetric` if global.
- **Rationale:** `Job.health: JobsHealthRules` reads as "this job's healths" — the `s` is a porting artifact (proto file is `jobs.proto`).

### H11. `RunJobTask` reads as "run-job task" or "run a job task" — ambiguous
- **Location:** `model.ts:3501`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RunChildJobTask` or `TriggerJobTask` (this is the "trigger another job" task type per the oneof JSDoc on line 3976).
- **Rationale:** Reading `task: RunJobTask` is ambiguous: is it "the run of a job task" or "task that runs a job"?

### H12. `client.exportRun` returns `ExportRunResponse` which contains a `views` array of `ViewItem`
- **Location:** `client.ts:440`, `model.ts:1825`, `model.ts:4920`.
- **Category:** Vague/generic (#1).
- **Suggestion:** Rename `ViewItem` to `ExportedView` or `RunView`.
- **Rationale:** "Item" is the canonical empty noun. The type has `content`, `name`, `type: ViewType` — call it what it is.

### H13. `CancelRunWaiter` polls on the V1 lifecycle-state enum while the modern field is `RunStatus.state`
- **Location:** `client.ts:986-997` (and the identical blocks in `RepairWaiter` at `client.ts:1059-1070`, `RunNowWaiter` at `client.ts:1132-1143`, `SubmitRunWaiter` at `client.ts:1205-1216`).
- **Category:** Versioned API leakage.
- **Suggestion:** Either poll on the new `RunStatus` or document why V1 is still authoritative.
- **Rationale:** Every waiter's `wait()` reads `pollResp.state?.lifeCycleState` against `RunLifeCycleState_RunLifeCycleState`; future deprecation of V1 will silently break all four waiters.

### H14. `RunLifecycleStateV2` + `RunLifecycleStateV2_State` — `V2` infix leaks API/proto versioning into public identifiers
- **Location:** `model.ts:509` (`RunLifecycleStateV2_State` enum), `model.ts:3616` (`RunLifecycleStateV2` wrapper interface), `model.ts:3867` (`RunStatus.state: RunLifecycleStateV2_State`).
- **Why:** `V2` mid-token in a type name records that the upstream schema versioned this enum, not anything a JS consumer needs. The V1 type already lives at `RunLifeCycleState` / `RunLifeCycleState_RunLifeCycleState`; the V2 variant should adopt a domain-meaningful name rather than a version-stamped one.
- **Category:** Proto-architectural-leak (`V2` mid-position).
- **Suggested:** Rename the wrapper to `RunLifecycleState` (singular, modern) and the enum to `RunLifecycleState_State` — then mark the legacy `RunLifeCycleState` family `@deprecated`. If the V1 type must keep its current name for back-compat, rename the V2 family to `RunPhase` or `RunLifecycleStatus` (anything that says "this is the new shape" without encoding the version number).
- **Rationale:** `V2` as part of a type name is the textbook proto-architectural leak this audit category targets; it bakes upstream-version churn into every consumer's import list. The casing difference (`LifeCycle` vs `Lifecycle`) between V1 and V2 names also makes the pair harder to grep.

---

## Medium

### M1. `HardwareAcceleratorType` enum values `GPU_1xA10`, `GPU_8xH100` (lowercase `x`)
- **Location:** `model.ts:173-175`.
- **Category:** Naming convention violation in enum value strings.
- **Suggestion:** The TS enum keys are properly `GPU_1X_A10`, but the values keep the wire form. This is OK since the wire is contract — but flag the asymmetry inline.
- **Rationale:** Wire compatibility forces lowercase `x`; the enum key uppercase is fine.

### M2. `JobsHealthMetric.RUN_DURATION_SECONDS` — long but OK
- **Location:** `model.ts:199`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable.

### M3. `JobsHealthMetric.STREAMING_BACKLOG_*` (4 values)
- **Location:** `model.ts:200-203`.
- **Category:** Long enum values (#18).
- **Suggestion:** Acceptable; consider grouping into a nested enum if the four become five.

### M4. `Repair.type` (RepairType) is a reserved-ish word
- **Location:** `model.ts:3086`, `model.ts:215`.
- **Category:** Reserved-word collision (#10).
- **Suggestion:** Acceptable on objects (TS allows `type` as a property), but flag against naming-convention rule.

### M5. `RunNowRequest.idempotencyToken`, `SubmitRunRequest.idempotencyToken` — OK
- **Location:** `model.ts:3635`, `model.ts:4570`.
- **Category:** Verbose but precise.

### M6. `RepairRunRequest.rerunTasks` (verb prefix `re-`) + `rerunAllFailedTasks` + `rerunDependentTasks` — OK pattern
- **Location:** `model.ts:3113-3119`.
- **Category:** Consistent prefix; OK.

### M7. `JobRunAs.identity` — OK
- **Location:** `model.ts:2403`.

### M8. `JobCluster.jobClusterKey` — `jobCluster` namespace already, `Key` is the only meaningful suffix
- **Location:** `model.ts:2333`.
- **Category:** Acceptable; key is the lookup pattern.

### M9. `JobEnvironment.environmentKey` — same pattern, OK.
- **Location:** `model.ts:2386`.

### M10. `TaskSettings.taskKey` — OK, but its repetition across `RunTask`, `RunTaskSettings`, `TaskSettings`, `TaskDependency` is heavy
- **Location:** `model.ts:4681`, `model.ts:3902`, `model.ts:4091`, `model.ts:4670`.
- **Category:** Verbose but precise.

### M11. `ResolvedValues` interface has 11 single-purpose sub-types
- **Location:** `model.ts:3248-3398`.
- **Category:** Verbose; many shapes for one purpose.
- **Suggestion:** Collapse into a single `ResolvedValues` shape with optional fields per task type, or document the union shape pattern.

### M12. `BaseRun.numberInJob` — meaningless field (see H7)
- **Location:** `model.ts:916`.

### M13. `BaseRun.originalAttemptRunId` — verbose, but precise.

### M14. `Run.runId` (inside `Run`) — tautological
- **Location:** `model.ts:3404`, `model.ts:912`, `model.ts:2133`, `model.ts:3877`.
- **Category:** Type-suffix tautology (#20).
- **Suggestion:** Keep for ID disambiguation against `jobId`; this is intentional disambiguation rather than tautology.

### M15. `RunNowResponse.numberInJob` (see H8).

### M16. `Format` enum has only two values (`SINGLE_TASK`, `MULTI_TASK`) and one is dead
- **Location:** `model.ts:151-154`.
- **Category:** Dead enum value.

### M17. `WorkloadType.clients: WorkloadType_ClientsTypes` — `ClientsTypes` is mis-pluralized
- **Location:** `model.ts:4967`, `model.ts:4971`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Rename to `ClientTypes`.

### M18. `PythonPyPiLibrary` — duplicate "Py" prefix
- **Location:** `model.ts:3028`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `PyPiLibrary` (PyPI already means "Python Package Index").

### M19. `MavenLibrary.coordinates` — common, accept.
- **Location:** `model.ts:2800`.

### M20. `PythonWheelTask.namedParameters` vs `parameters` — fine when distinct.

### M21. `ListJobsRequest.expandTasks`, `ListRunsRequest.expandTasks` — `boolean` flag is fine.

### M22. `ListRunsRequest.runType` shouldn't be optional when the API permits a default
- **Location:** `model.ts:2756`.
- **Category:** Default semantics.

---

## Low

### L1. `WorkloadType_ClientsTypes` — see M17.

### L2. `PowerBiTable.name` vs `PowerBiTable.catalog`, `schema` — OK (catalog/schema/name is the Databricks 3-part).
- **Location:** `model.ts:2987-2991`.

### L3. `JobRunAs.identity` oneof discriminator `userName | servicePrincipalName | groupName` — verbose but precise.

### L4. `QueueDetails.message` and `QueueDetails.code` — OK.
- **Location:** `model.ts:3060-3066`.

### L5. `OutputSchemaInfo.catalogName` / `OutputSchemaInfo.schemaName` — acceptable.
- **Location:** `model.ts:2911`.

### L6. `JobEmailNotifications.onStart` / `onSuccess` / `onFailure` etc. — OK.

### L7. `WebhookNotifications.onStreamingBacklogExceeded` — accept.

### L8. `ContinuousSettings.taskRetryMode` (enum) — OK.

### L9. `ContinuousSettings.pauseStatus: SchedulePauseStatus` — naming OK.

### L10. `CronSchedule.timezoneId` (lowercase `z`) — OK per ISO usage.

### L11. `CronSchedule.quartzCronExpression` — long but precise.

### L12. `Run.setupDuration` / `executionDuration` — JSDoc states they are 0 for multitask job runs; should be on `RunTask` only.
- **Location:** `model.ts:3478-3480`.
- **Category:** Field contradicting type domain (#16).
- **Suggestion:** Move to `RunTask` only, mark deprecated on `Run`.

### L13. `SparkPythonTask.parameters` (string[]) — OK.

### L14. `Library.requirements: string` (a requirements.txt URI) — OK.

### L15. `AwsAttributes.spotBidPricePercent` — long but precise.

---

## Observations (whole-file patterns)

### O1. The oneof `$case` discriminator convention is well-established and consistent
- Every oneof in the file uses `{$case: 'tag'; tag: T} | undefined`.
- This is a porting convention from `protobuf-ts`/`@bufbuild/protobuf-es`; it's noisy but consistent, and consumers can pattern-match cleanly. Keep.

### O2. Method-vs-type verb-tense pairing
- `client.cancelRun(CancelRunRequest) → CancelRunResponse`: verb-noun matches.
- `client.runNow(RunNowRequest) → RunNowResponse`: verb-now matches.
- `client.repair(RepairRunRequest) → RepairRunResponse`: verb-noun matches now that request and response types carry explicit `Request`/`Response` suffixes; the method/type pairing is consistent.
- `client.submitRun(SubmitRunRequest) → SubmitRunResponse`: verb-noun matches.

### O3. `index.ts` re-exports both the value classes and types in two blocks
- Enums and waiter classes go through `export { ... }`; interfaces go through `export type { ... }`. Both blocks together have 200+ identifiers.

### O4. `Format` and `Source` are top-level public enums named with single English words
- These specific names collide with global and tooling identifiers — see H1, H2.
