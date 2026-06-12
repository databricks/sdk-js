# Naming Audit: `@databricks/sdk-jobs` (v2)

Path: `packages/jobs/src/v2/`
Versions: v2
Files: `model.ts` (10079 lines), `client.ts` (1290 lines), `utils.ts` (181 lines),
`transport.ts` (113 lines), `index.ts` (248 lines).
Total findings: 22

## Summary Table

| Severity | Count  | Notes                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------ |
| High     | 14     | Reserved-word risks, broken/misleading names, identifier collisions, contradictions, proto-architectural leaks. |
| Medium   | 6      | Redundant prefixes/suffixes, pluralization, optionality.                       |
| Low      | 2      | Plural mismatch, field placement.                                              |
| **Total** | **22** | |

---

## High

### H1. `Format` (top-level public enum) is a reserved-word collision
- **Location:** `model.ts:185`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `JobFormat`.
- **Rationale:** `Format` is a well-known global (the `Intl.NumberFormat`/`Intl.DateTimeFormat` family, `console.format` in some runtimes, and a built-in name in many code-generators). Importing `Format` from a Jobs SDK forces consumers to alias it.

### H2. `Source` (top-level public enum) clashes with global Web/TS names
- **Location:** `model.ts:327`.
- **Category:** Reserved-word collisions (#10), vague/generic (#1).
- **Suggestion:** Rename to `TaskSource`, `CodeSource`, or `FileSource` (only two values: `WORKSPACE`, `GIT`).
- **Rationale:** `Source` is the name of the DOM `EventSource` shorthand, Web Audio `AudioBufferSourceNode`, RxJS `Source`, several stream libraries, and lint rules around it. With only two values describing where SQL/Notebook/dbt code lives, a domain prefix is essential.

### H3. `Compute` interface clashes with the larger Databricks Compute API
- **Location:** `model.ts:1493`.
- **Category:** Vague/generic (#1), misleading names (#6).
- **Suggestion:** Rename to `TaskComputeOverride` or `TaskCompute` — the type wraps only `hardwareAccelerator` for serverless GPU.
- **Rationale:** A consumer would expect `Compute` to describe an entire compute target (cluster spec, node type, runtime, etc.). It actually has one field. This is the worst "field contradicting type domain" case in the file (#16).

### H4. `Environment` overload — minimal interface, generic word
- **Location:** `model.ts:1893`.
- **Category:** Vague/generic (#1), reserved-word collision (#10).
- **Suggestion:** Rename to `TaskEnvironment` (matching the per-task `environment_key` reference) or `EnvironmentSpec`.
- **Rationale:** `Environment` is a host-level concept in Node (`process.env`) and a common UI/test-framework type. Inside this file it is a tiny dep-list + base-env reference; it is referenced as `JobEnvironment.spec: Environment`, so a `Spec` suffix matches its role.

### H5. `Repair` lacks a noun and is mistaken for a verb
- **Location:** `model.ts:3153`.
- **Category:** Verb-tense inconsistency (#13), vague/generic (#1).
- **Suggestion:** Rename to `RepairHistoryEntry` (or `RepairAttempt`) — it represents a single past repair.
- **Rationale:** The verb `repair()` exists on the client (`client.ts:820`), and `RepairRunRequest`/`RepairRunResponse` are the request/response shapes. A standalone `Repair` reads as the action, not as a record.

### H6. `Webhook` is a generic top-level name that collides with the platform `Webhook` concept
- **Location:** `model.ts:4825`.
- **Category:** Vague/generic (#1), reserved-word/global collision (#10).
- **Suggestion:** Rename to `WebhookRef` (or `JobWebhook`) — readers grep `Webhook` expecting the request/payload shape, but the actual Webhook _payload_ is `WebhookNotifications`. The bare `Webhook` token is the wrong claimant for that name.
- **Rationale:** "Webhook" is a broad industry term and the actual delivery payload lives under a different identifier; the unqualified type-name should belong to the canonical shape, not to a Jobs-specific reference.

### H7. `Run.numberInJob` always equals `Run.runId` — meaningless field
- **Location:** `model.ts:3391`, `model.ts:1085`, `model.ts:2246`.
- **Category:** Misleading names (#6), generic field names losing meaning (#15).
- **Suggestion:** Drop or alias; if it must stay for back-compat, document the duplication on the field rather than the type.
- **Rationale:** The comment "This is set to the same value as `run_id`" makes the field a no-op. New TS users will assume it's distinct.

### H8. `RunNowResponse.numberInJob` reused
- **Location:** `model.ts:3671`.
- **Category:** Misleading names (#6).
- **Suggestion:** Same as H7 — remove the field, or document the duplication on the field if it must stay for back-compat.
- **Rationale:** Same dead duplication on the response.

### H9. `JobsHealthMetric` / `JobsHealthOperator` / `JobsHealthRule` / `JobsHealthRules` — pluralization confusion
- **Location:** `model.ts:246`, `model.ts:259`, `model.ts:2659`, `model.ts:2667`.
- **Category:** Singular/plural mismatch (#9), redundant suffixes (#8).
- **Suggestion:** `JobsHealthRule` and `JobsHealthRules` differ only by `s` and the inner wraps a `rules?: JobsHealthRule[]`. Flatten — make the array the public shape (call it `HealthRules` or just `HealthRule[]`).
- **Rationale:** Hairsplitting wrappers around arrays force consumers to write `{rules: [...]}` instead of `[...]`. Plural type names alongside singular ones are the most error-prone pattern in this file.

### H10. `JobsHealth*` prefix is inconsistent — `Jobs` is plural
- **Location:** `model.ts:246`, `model.ts:259`, `model.ts:2659`, `model.ts:2667`.
- **Category:** Singular/plural mismatch (#9), Go/Java-style names (#14).
- **Suggestion:** Use the singular product noun: `JobHealthMetric`, `JobHealthRule`. Or just `HealthMetric` if global.
- **Rationale:** `Job.health: JobsHealthRules` reads as "this job's healths" — the `s` is a porting artifact (proto file is `jobs.proto`).

### H11. `RunJobTask` reads as "run-job task" or "run a job task" — ambiguous
- **Location:** `model.ts:3484`.
- **Category:** Misleading names (#6).
- **Suggestion:** Rename to `RunChildJobTask` or `TriggerJobTask` (this is the "trigger another job" task type per the oneof JSDoc on line 3871).
- **Rationale:** Reading `task: RunJobTask` is ambiguous: is it "the run of a job task" or "task that runs a job"?

### H12. `client.exportRun` returns `ExportRunResponse` which contains a `views` array of `ViewItem`
- **Location:** `client.ts:451`, `model.ts:1935`, `model.ts:4807`.
- **Category:** Vague/generic (#1).
- **Suggestion:** Rename `ViewItem` to `ExportedView` or `RunView`.
- **Rationale:** "Item" is the canonical empty noun. The type has `content`, `name`, `type: ViewType` — call it what it is.

### H13. `CancelRunWaiter` polls on the V1 lifecycle-state enum while the modern field is `RunStatus.state`
- **Location:** `client.ts:1022-1038` (and the identical blocks in `RepairWaiter` at `client.ts:1095-1111`, `RunNowWaiter` at `client.ts:1168-1184`, `SubmitRunWaiter` at `client.ts:1241-1257`).
- **Category:** Versioned API leakage.
- **Suggestion:** Either poll on the new `RunStatus` or document why V1 is still authoritative.
- **Rationale:** Every waiter's `wait()` reads `pollResp.state?.lifeCycleState` against `RunLifeCycleState_RunLifeCycleState`; future deprecation of V1 will silently break all four waiters.

### H14. `RunLifecycleStateV2` + `RunLifecycleStateV2_State` — `V2` infix leaks API/proto versioning into public identifiers
- **Location:** `model.ts:650` (`RunLifecycleStateV2_State` enum), `model.ts:3567` (`RunLifecycleStateV2` wrapper interface), `model.ts:3762` (`RunStatus.state: RunLifecycleStateV2_State`).
- **Why:** `V2` mid-token in a type name records that the upstream schema versioned this enum, not anything a JS consumer needs. The V1 type already lives at `RunLifeCycleState` / `RunLifeCycleState_RunLifeCycleState`; the V2 variant should adopt a domain-meaningful name rather than a version-stamped one.
- **Category:** Proto-architectural-leak (`V2` mid-position).
- **Suggested:** Rename the wrapper to `RunLifecycleState` (singular, modern) and the enum to `RunLifecycleState_State` — then mark the legacy `RunLifeCycleState` family `@deprecated`. If the V1 type must keep its current name for back-compat, rename the V2 family to `RunPhase` or `RunLifecycleStatus` (anything that says "this is the new shape" without encoding the version number).
- **Rationale:** `V2` as part of a type name is the textbook proto-architectural leak this audit category targets; it bakes upstream-version churn into every consumer's import list. The casing difference (`LifeCycle` vs `Lifecycle`) between V1 and V2 names also makes the pair harder to grep.

---

## Medium

### M1. `ResolvedValues` interface has 11 single-purpose sub-types
- **Location:** `model.ts:3326-3381`.
- **Category:** Verbose; many shapes for one purpose.
- **Suggestion:** Collapse into a single `ResolvedValues` shape with optional fields per task type, or document the union shape pattern.

### M2. `BaseRun.numberInJob` — meaningless field (see H7)
- **Location:** `model.ts:1085`.

### M3. `RunNowResponse.numberInJob` (see H8).

### M4. `WorkloadType.clients: WorkloadType_ClientsTypes` — `ClientsTypes` is mis-pluralized
- **Location:** `model.ts:4854`, `model.ts:4858`.
- **Category:** Singular/plural mismatch (#9).
- **Suggestion:** Rename to `ClientTypes`.

### M5. `PythonPyPiLibrary` — duplicate "Py" prefix
- **Location:** `model.ts:3105`.
- **Category:** Redundant prefixes (#2).
- **Suggestion:** Rename to `PyPiLibrary` (PyPI already means "Python Package Index").

### M6. `ListRunsRequest.runType` shouldn't be optional when the API permits a default
- **Location:** `model.ts:2847`.
- **Category:** Default semantics.

---

## Low

### L1. `WorkloadType_ClientsTypes` — see M4.

### L2. `Run.setupDuration` / `executionDuration` — JSDoc states they are 0 for multitask job runs; should be on `RunTask` only.
- **Location:** `model.ts:3461-3463`.
- **Category:** Field contradicting type domain (#16).
- **Suggestion:** Move to `RunTask` only, mark deprecated on `Run`.
