# Naming Audit: `cleanroomtaskruns` (v1)

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/` (merged into the
`cleanrooms` package; cleanroomtaskruns symbols are now generated alongside
the other clean-room types).
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Reference:** `databricks/databricks-sdk-go` `service/cleanrooms/{api,impl,model,interface}.go` and sibling TS packages (`cleanrooms`, `cleanroomassets`, `cleanroomautoapprovalrules`, `jobs/v2`).

---

## Inventory

### Enums
1. `CleanRoomTaskRunLifeCycleState` (model.ts:9)
   - Values: `RUN_LIFE_CYCLE_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `TERMINATING`,
     `TERMINATED`, `SKIPPED`, `INTERNAL_ERROR`, `BLOCKED`, `WAITING_FOR_RETRY`, `QUEUED`.
2. `CleanRoomTaskRunResultState` (model.ts:26)
   - Values: `RUN_RESULT_STATE_UNSPECIFIED`, `SUCCESS`, `FAILED`, `TIMEDOUT`,
     `CANCELED`, `MAXIMUM_CONCURRENT_RUNS_REACHED`, `UPSTREAM_CANCELED`,
     `UPSTREAM_FAILED`, `EXCLUDED`, `EVICTED`, `SUCCESS_WITH_FAILURES`,
     `UPSTREAM_EVICTED`, `DISABLED`.

### Interfaces / Types
1. `CleanRoomNotebookTaskRun` (model.ts:538)
   - Fields: `notebookName`, `startTime`, `runDuration`, `notebookJobRunState`,
     `collaboratorJobRunInfo`, `outputSchemaName`, `outputSchemaExpirationTime`,
     `notebookEtag`, `notebookUpdatedAt`.
2. `CleanRoomTaskRunState` (model.ts:599)
   - Fields: `lifeCycleState`, `resultState`.
3. `CollaboratorJobRunInfo` (model.ts:606)
   - Fields: `collaboratorJobId`, `collaboratorJobRunId`, `collaboratorTaskRunId`,
     `collaboratorWorkspaceId`, `collaboratorAlias`.
4. `ListCleanRoomNotebookTaskRunsRequest` (model.ts:891)
   - Fields: `cleanRoomName`, `notebookName`, `pageSize`, `pageToken`.
5. `ListCleanRoomNotebookTaskRunsResponse` (model.ts:902)
   - Fields: `runs`, `nextPageToken`.

### Zod schemas
- `unmarshalCleanRoomNotebookTaskRunSchema`
- `unmarshalCleanRoomTaskRunStateSchema`
- `unmarshalCollaboratorJobRunInfoSchema`
- `unmarshalListCleanRoomNotebookTaskRunsResponseSchema`

### Client class
- `Client` (client.ts:85)
  - Task-runs methods: `listCleanRoomNotebookTaskRunsHandler`,
    `listCleanRoomNotebookTaskRunsHandlerIter`.
  - Private fields: `host`, `httpClient`, `logger`, `userAgent`.
  - Module constant: `PACKAGE_SEGMENT`.

### Utils
- Types: `HttpCallOptions`.
- Functions: `executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`.

---

## Findings

### 1. `Handler` suffix on client methods — category 7 (Overly verbose) and category 14 (Go/Java-style names)

**Symbol:** `Client.listCleanRoomNotebookTaskRunsHandler`, `Client.listCleanRoomNotebookTaskRunsHandlerIter` (client.ts:612, 651).

**Issue:** The `Handler` suffix is anomalous within the SDK. Every other clean-room
method on the same client (`listCleanRooms`, `listCleanRoomAssets`,
`listCleanRoomAutoApprovalRules`) uses the bare verb form without `Handler`. The
Go reference API (`CleanRoomTaskRunsAPI.List`, `ListByCleanRoomName`) does not
use `Handler` either; "Handler" is an HTTP-server concept, not a client method
idiom. The suffix adds eight characters that convey nothing — the method already
takes a request and returns a response, which is the contract of a "handler" in
API parlance.

**Suggested:** `listCleanRoomNotebookTaskRuns` and `listCleanRoomNotebookTaskRunsIter`.

This is the most visible naming defect in the package because it is the only public
surface a TS consumer calls. It is also inconsistent across the SDK; this is a
**P0 fix** for cross-package consistency (audit category 14: every other package uses
camelCase `listX` style without Java/Go-style `Handler` decoration).

### 2. `LifeCycleState` vs `lifecycle` casing — category 3 (Acronym/compound-word casing)

**Symbols:** Enum `CleanRoomTaskRunLifeCycleState` and field
`CleanRoomTaskRunState.lifeCycleState` (model.ts:9, 601).

**Issue:** "Lifecycle" is a single compound word in English (Merriam-Webster lists
it as one closed word). Treating it as two words (`LifeCycle` / `lifeCycle`)
produces an internal capital that doesn't match natural English. Sibling property
in the same struct is `resultState` — natural compound — making the mismatch
visible. Compare to `Date`/`URL` acronym handling: a single word should not have a
midword capital.

**Suggested:** `CleanRoomTaskRunLifecycleState` and field `lifecycleState`.
Cross-check: the same `LifeCycle` casing exists in `jobs/v2/model.ts` (line 389)
and other "Run" types across the SDK, so a fix must be globally coordinated.

### 3. `TIMEDOUT` is a non-word — category 6 (Misleading names) and category 13 (Verb tense inconsistency)

**Symbol:** `CleanRoomTaskRunResultState.TIMEDOUT` (model.ts:30).

**Issue:** `TIMEDOUT` mashes "timed out" into one token and drops the space without
forming a real word. Adjacent values use correct past-tense English
(`CANCELED`, `EVICTED`, `FAILED`, `SUCCEEDED`-style). The Go reference also uses
`TIMEDOUT`, so this originates upstream; flag for protocol fix.

### 4. `etag` lowercase abbreviation — category 3 (Acronym casing)

**Symbol:** `CleanRoomNotebookTaskRun.notebookEtag` (model.ts:559) and wire field
`notebook_etag` (line 1306).

**Issue:** "ETag" is an HTTP standard token defined in RFC 7232 §2.3 ("entity tag")
and is written `ETag` in HTTP headers and most APIs. The TS Style Guide acronym
rule says treat acronyms as one word when 3+ letters (so `XmlHttpRequest`, not
`XMLHTTPRequest`). Two-letter acronyms can keep both letters capitalised. Either
`notebookETag` or `notebookEtag` is defensible; the field uses lowercase, but
elsewhere in the codebase (search `Etag|ETag` in `cleanrooms/v1`) the same
lowercase form is used for the `etag` field on `CleanRoomsNotebookTask`. Mark as
consistent within the codebase but worth re-examining at the SDK level.

### 5. `notebookEtag` belongs to the notebook, not the task run — category 16 (Field contradicting type domain)

**Symbol:** `CleanRoomNotebookTaskRun.notebookEtag` (model.ts:559).

**Issue:** Field doc says "Etag of the notebook executed in this task run". The
field name is fine, but contrast with `notebookUpdatedAt` (line 561) — the
combination `notebookEtag` + `notebookUpdatedAt` implies the entire task-run
struct is mixing notebook metadata with run metadata. Consider whether these
should live under a nested `notebook` sub-object (`notebook.etag`,
`notebook.updatedAt`) in a future revision. Flag only — current shape mirrors Go.

### 6. `notebookJobRunState` is unclear naming — category 1 (Vague/generic) and 12 (Duplicate concepts)

**Symbol:** `CleanRoomNotebookTaskRun.notebookJobRunState` (model.ts:546).

**Issue:** The doc says "State of the task run". The struct is already a *task
run*, and the same idea is also called a *Job run* by the collaborator field
right below. Three names for the same concept appear within one struct:
"task run state" (doc), "notebook job run state" (field name), and "job run info"
(neighbouring field). The naming churn is confusing.

The field type is `CleanRoomTaskRunState`, so the natural field name is
`taskRunState` or just `state`. The "Job" interjected here mirrors how Jobs
service refers to a run as a "Job Run", but this package is about *task runs* —
the Go SDK source field is also `notebook_job_run_state` (i.e. the messiness is
inherited).

**Suggested:** `state` or `taskRunState`. Cross-reference with `jobs/v2`
`cleanRoomJobRunState` (jobs/v2/model.ts:1158) which has the same shape with yet
*another* spelling — flag both for coordinated renaming.

### 7. `runDuration` vs implicit "task run" — category 15 (Generic field names losing meaning)

**Symbol:** `CleanRoomNotebookTaskRun.runDuration` (model.ts:544).

**Issue:** The owning struct is already a "Run". Sibling fields drop the "run"
prefix (`startTime`, not `runStartTime`; `notebookEtag`, not `runNotebookEtag`),
yet duration carries it. Inconsistent.

**Suggested:** `duration` (the doc already says "Duration of the task run, in
milliseconds"). Or rename `startTime` → `runStartTime` for consistency — pick one
side.

### 8. `outputSchemaExpirationTime` — verbose — category 7 (Overly verbose)

**Symbol:** `CleanRoomNotebookTaskRun.outputSchemaExpirationTime` (model.ts:557).

**Issue:** `…Time` suffix is redundant; the value is a number (epoch ms).
Compare to `startTime` which legitimately is "time", and `notebookUpdatedAt`
(line 561) which already uses the more idiomatic `At` suffix for an epoch
millisecond timestamp. Within the *same struct*, three different conventions
coexist: `…Time`, `…At`, and `runDuration` (numeric duration). Pick one.

**Suggested:** `outputSchemaExpiresAt` and `startedAt` — or normalise all three
to `…Time`. The `Run` pattern in other Databricks APIs leans toward `…At`.

### 9. `CollaboratorJobRunInfo` repeats "collaborator" in every field — category 8 (Redundant suffixes) and category 2 (Redundant prefixes)

**Symbol:** `CollaboratorJobRunInfo` (model.ts:606). Fields: `collaboratorJobId`,
`collaboratorJobRunId`, `collaboratorTaskRunId`, `collaboratorWorkspaceId`,
`collaboratorAlias`.

**Issue:** Every field is prefixed with `collaborator`, but the enclosing struct
is already named `CollaboratorJobRunInfo`. Accessing `info.collaboratorJobId`
reads as "collaborator job-run info → collaborator job id". Drop the prefix:
`jobId`, `jobRunId`, `taskRunId`, `workspaceId`, `alias`.

The Go SDK keeps the prefix to disambiguate inside the parent struct (`CleanRoomNotebookTaskRun.CollaboratorJobRunInfo.CollaboratorJobId`),
where the prefix is meaningful at the *top* level (`run.collaboratorJobRunInfo.collaboratorJobId`).
TS access lands one level deeper than the natural reading; the prefix is
duplicate. Match the JS idiom: drop the prefix on the nested fields.

### 10. Type name `CollaboratorJobRunInfo` mixes "Job Run" and the rest of the package speaks "Task Run" — category 12 (Duplicate concepts) and category 9 (Singular/plural mismatch on the broader concept)

**Symbol:** `CollaboratorJobRunInfo` (model.ts:606).

**Issue:** Field `collaboratorTaskRunId` lives inside `CollaboratorJobRunInfo`
(model.ts:612). One struct uses both vocabulary domains. From Databricks docs:
a *Task run* is a single task within a *Job run* (a job can have N tasks). The
field doc strings here use "task run" almost exclusively — `Job ID of the task
run`, `Task run ID of the task run`, `triggered the task run`. The "Job Run" in
the struct *name* is therefore misleading; a more accurate name is
`CollaboratorTaskRunRef` or `CollaboratorRunRef`. Flag for coordination with API
team — the Go SDK has the same name. Cross-reference `jobs/v2` to align.

### 11. `CleanRoomTaskRunState` and the field `notebookJobRunState` of type `CleanRoomTaskRunState` — category 6 (Misleading names)

**Symbols:** model.ts:599, model.ts:546.

**Issue:** Three name layers for the same idea. The doc on
`CleanRoomTaskRunState` says "Stores the run state of the clean rooms notebook
task" — i.e. it is the state of a *notebook task run*. The field that holds it is
called `notebookJobRunState`, which is then `CleanRoomTaskRunState`. The Java SDK
calls the same thing `NotebookTaskRunOutput.runState`. Suggest aligning on
`state: CleanRoomTaskRunState` (drop the doubled noun on the field name) and
keep the type name as-is (the wider SDK uses `…State` types throughout, e.g.
`RunState`, `JobState`).

### 12. `pageSize` doc contradicts behaviour — category 6 (Misleading names)

**Symbol:** `ListCleanRoomNotebookTaskRunsRequest.pageSize` (model.ts:897).

**Issue:** Doc reads: "The maximum number of task runs to return. Currently
ignored - all runs will be returned." If the field is currently ignored, the
name `pageSize` is *misleading* — callers will set it expecting it to take
effect. Either remove the field (best), mark it `@deprecated`, or document this
in JSDoc with a `@deprecated` tag so IDEs show strike-through. Naming-wise:
`pageSize` is fine *if* it works; document the no-op via the deprecation tag,
not just a sentence inside the doc.

### 13. `runs` field in response — category 15 (Generic field names losing meaning) — borderline acceptable

**Symbol:** `ListCleanRoomNotebookTaskRunsResponse.runs` (model.ts:904).

**Issue:** Generic given the package context, but defensible: this is the
canonical "list" shape (`{ items, nextPageToken }`). The doc string on it ("Name
of the clean room.") is *wrong* — copy-paste error from the request struct's
`cleanRoomName` doc. Doc-text bug, not a naming bug, but worth flagging during a
naming pass since reviewers will notice the field while reading docs.

### 14. `nextPageToken` is the canonical name — pass.

No issue. Matches all other listing responses in the SDK.

### 15. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. Every TS package exports a single `Client` class scoped to its
import path (e.g. `@databricks/sdk-cleanrooms/v1`).

### 16. `userAgent` and `httpClient` — *pass*

Standard names; acronym handling is consistent (`Url` would be flagged but
`HttpClient` is acceptable under the project rule and matches the imported type).

### 17. `flattenQueryParams` — *pass*, but unused (dead code)

**Symbol:** `flattenQueryParams` (utils.ts:123).

**Issue:** Imported nowhere within this package's client (the `list` method builds
its querystring inline at client.ts:617–626). The helper is dead code in this
package. Naming itself is fine. Suggest deleting or extracting to a shared utility
in `@databricks/sdk-core/http`.

### 18. `readAll(body)` — *pass*

Helper does what its name says.

---

## Cross-package notes (per audit instructions)

### `TaskRun` field-name divergence between `cleanroomtaskruns` and `jobs/v2`

The state field that holds a `CleanRoomTaskRunState` is named `notebookJobRunState`
in this package (model.ts:546) and `cleanRoomJobRunState` in `jobs/v2`
(jobs/v2/model.ts:1158). Two names for one wire-level concept across the two
packages that talk about the same run object. Audit category 12 (duplicate
concepts) — coordinate a single field name across both packages.

### `NotebookTask` concept

`CleanRoomNotebookTaskRun` (this package) → `CleanRoomsNotebookTask` (jobs/v2,
note plural "Rooms"!) → `CleanRoomNotebookTask` (jobs/v2, deprecated V0). Three
spellings of "clean room(s) notebook task" across two packages. Specifically,
the jobs/v2 package has `CleanRoomsNotebookTask` (plural rooms,
model.ts:1141) explicitly distinguished from the deprecated `CleanRoomNotebookTask`
(singular). This package uses the singular form `CleanRoomNotebookTaskRun`. The
intent is consistent — singular when referring to a specific room, plural for the
service name — but a reader is left to guess.

---

## Summary (counts)

- **Critical / cross-package consistency:** 1 finding (#1 `Handler` suffix).
- **High (style guide violations):** 2 findings (#2 LifeCycle casing, #9
  collaborator prefix repetition).
- **Medium (naming clarity):** 7 findings (#3, #6, #7, #8, #10, #11, #12).
- **Low / project-wide convention notes:** 4 findings (#4, #5, #13, #17) —
  some inherited from generator.
- **Pass / acceptable as-is:** 4 findings (#14, #15, #16, #18).

**Total flagged findings: 14** distinct items across audit categories (some
findings touch multiple categories).

---

## Fixed

- #8 (partial) `sharedOutputSchemaExpirationTime` (originally cited at model.ts:73): Fixed in regeneration on 2026-05-20 — field removed from `CleanRoomNotebookTaskRun`; remaining `outputSchemaExpirationTime` retained as renumbered finding #8.
- #9 `sharedOutputSchemaName` doc references missing `enable_shared_output` flag (originally cited at model.ts:72): Fixed in regeneration on 2026-05-20 — `sharedOutputSchemaName` field removed from `CleanRoomNotebookTaskRun`, so the misleading doc is gone.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
