# Naming Audit: `cleanroomtaskruns` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanroomtaskruns/`
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
1. `CleanRoomNotebookTaskRun` (model.ts:44)
   - Fields: `notebookName`, `startTime`, `runDuration`, `notebookJobRunState`,
     `collaboratorJobRunInfo`, `outputSchemaName`, `outputSchemaExpirationTime`,
     `notebookEtag`, `notebookUpdatedAt`, `sharedOutputSchemaName`,
     `sharedOutputSchemaExpirationTime`.
2. `CleanRoomTaskRunState` (model.ts:78)
   - Fields: `lifeCycleState`, `resultState`.
3. `CollaboratorJobRunInfo` (model.ts:85)
   - Fields: `collaboratorJobId`, `collaboratorJobRunId`, `collaboratorTaskRunId`,
     `collaboratorWorkspaceId`, `collaboratorAlias`.
4. `ListCleanRoomNotebookTaskRunsRequest` (model.ts:98)
   - Fields: `cleanRoomName`, `notebookName`, `pageSize`, `pageToken`.
5. `ListCleanRoomNotebookTaskRunsResponse` (model.ts:109)
   - Fields: `runs`, `nextPageToken`.

### Zod schemas
- `unmarshalCleanRoomNotebookTaskRunSchema`
- `unmarshalCleanRoomTaskRunStateSchema`
- `unmarshalCollaboratorJobRunInfoSchema`
- `unmarshalListCleanRoomNotebookTaskRunsResponseSchema`

### Client class
- `Client` (client.ts:32)
  - Methods: `listCleanRoomNotebookTaskRunsHandler`,
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

**Symbol:** `Client.listCleanRoomNotebookTaskRunsHandler`, `Client.listCleanRoomNotebookTaskRunsHandlerIter` (client.ts:58, 97).

**Issue:** The `Handler` suffix is anomalous within the SDK. Every other clean-room
package method (`cleanrooms.listCleanRooms`, `cleanroomassets.listCleanRoomAssets`,
`cleanroomautoapprovalrules.listCleanRoomAutoApprovalRules`) uses the bare verb form
without `Handler`. The Go reference API (`CleanRoomTaskRunsAPI.List`,
`ListByCleanRoomName`) does not use `Handler` either; "Handler" is an HTTP-server
concept, not a client method idiom. The suffix adds eight characters that convey
nothing — the method already takes a request and returns a response, which is the
contract of a "handler" in API parlance.

**Suggested:** `listCleanRoomNotebookTaskRuns` and `listCleanRoomNotebookTaskRunsIter`.

This is the most visible naming defect in the package because it is the only public
surface a TS consumer calls. It is also inconsistent across the SDK; this is a
**P0 fix** for cross-package consistency (audit category 14: every other package uses
camelCase `listX` style without Java/Go-style `Handler` decoration).

### 2. Redundant `RUN_` prefix on enum values — category 2 (Redundant enum prefixes)

**Symbol:** `CleanRoomTaskRunLifeCycleState.RUN_LIFE_CYCLE_STATE_UNSPECIFIED`,
`CleanRoomTaskRunResultState.RUN_RESULT_STATE_UNSPECIFIED` (model.ts:10, 27).

**Issue:** Both enums are scoped under `…TaskRun…`. The leading `RUN_` repeats the
parent type's `Run` concept. The full reference `CleanRoomTaskRunLifeCycleState.RUN_LIFE_CYCLE_STATE_UNSPECIFIED`
contains `Run` twice and `LifeCycleState` twice. Same applies to
`RUN_RESULT_STATE_UNSPECIFIED`.

**Suggested:** `UNSPECIFIED` (or `LIFE_CYCLE_STATE_UNSPECIFIED` / `RESULT_STATE_UNSPECIFIED`
if proto-wire compatibility forbids dropping more). Most other enums in the SDK use
the plain `UNSPECIFIED` form. Note however the values are also used as on-the-wire
JSON strings (see `z.enum(CleanRoomTaskRunLifeCycleState)` in model.ts:155), so
renaming requires the server to also accept the new spelling, and is a behavioural
change — record this as a request to the API team, not a unilateral TS change.

### 3. `SCREAMING_SNAKE_CASE` enum values — category 4 (Underscores in TS identifiers)

**Symbols:** Every value in both enums (model.ts:10–19, 27–40).

**Issue:** The Google TypeScript Style Guide (the project's `.agent/skills/google-ts-styleguide`)
mandates `UPPER_CAMEL_CASE` for enum members, not `SCREAMING_SNAKE_CASE`. The
project's own `.agent/rules/typescript.mdc` enforces "no underscores in TS
identifiers" (category 4). However, enum *string* values double as the on-the-wire
representation here (the `z.enum` parses raw API strings into these identifiers).
Splitting the TS-side identifier from the wire literal — e.g.
`Terminated = 'TERMINATED'` — is the idiomatic TS fix while preserving wire
compatibility.

**Suggested (TS side only, no wire change):**

```ts
export enum CleanRoomTaskRunLifeCycleState {
  Unspecified = 'RUN_LIFE_CYCLE_STATE_UNSPECIFIED',
  Pending = 'PENDING',
  Running = 'RUNNING',
  Terminating = 'TERMINATING',
  Terminated = 'TERMINATED',
  Skipped = 'SKIPPED',
  InternalError = 'INTERNAL_ERROR',
  Blocked = 'BLOCKED',
  WaitingForRetry = 'WAITING_FOR_RETRY',
  Queued = 'QUEUED',
}
```

Same shape for `CleanRoomTaskRunResultState`. This is consistent with the way the
project's `.agent/rules/typescript.mdc` treats other enums (e.g. status enums in
`apierror/codes`).

### 4. Long enum values — category 18 (Long enum values)

**Symbols:** `MAXIMUM_CONCURRENT_RUNS_REACHED` (model.ts:32), `SUCCESS_WITH_FAILURES`
(model.ts:37), `RUN_LIFE_CYCLE_STATE_UNSPECIFIED` (model.ts:10),
`RUN_RESULT_STATE_UNSPECIFIED` (model.ts:27).

**Issue:** Wire-format values can be left as-is, but TS identifiers should be
shorter. `MAXIMUM_CONCURRENT_RUNS_REACHED` → `MaxConcurrentRunsReached`.
`SUCCESS_WITH_FAILURES` → `SuccessWithFailures` (15 chars vs 21 with underscores).
Combine with finding 3.

### 5. `LifeCycleState` vs `lifecycle` casing — category 3 (Acronym/compound-word casing)

**Symbols:** Enum `CleanRoomTaskRunLifeCycleState` and field
`CleanRoomTaskRunState.lifeCycleState` (model.ts:9, 80).

**Issue:** "Lifecycle" is a single compound word in English (Merriam-Webster lists
it as one closed word). Treating it as two words (`LifeCycle` / `lifeCycle`)
produces an internal capital that doesn't match natural English. Sibling property
in the same struct is `resultState` — natural compound — making the mismatch
visible. Compare to `Date`/`URL` acronym handling: a single word should not have a
midword capital.

**Suggested:** `CleanRoomTaskRunLifecycleState` and field `lifecycleState`.
Cross-check: the same `LifeCycle` casing exists in `jobs/v2/model.ts` (line 389)
and other "Run" types across the SDK, so a fix must be globally coordinated.

### 6. `TIMEDOUT` is a non-word — category 6 (Misleading names) and category 13
(Verb tense inconsistency)

**Symbol:** `CleanRoomTaskRunResultState.TIMEDOUT` (model.ts:30).

**Issue:** `TIMEDOUT` mashes "timed out" into one token and drops the space without
forming a real word. Adjacent values use correct past-tense English
(`CANCELED`, `EVICTED`, `FAILED`, `SUCCEEDED`-style). The Go reference also uses
`TIMEDOUT`, so this originates upstream; flag for protocol fix. The TS identifier
should be `TimedOut` regardless (combine with finding 3).

### 7. `etag` lowercase abbreviation — category 3 (Acronym casing)

**Symbol:** `CleanRoomNotebookTaskRun.notebookEtag` (model.ts:65) and wire field
`notebook_etag` (line 133).

**Issue:** "ETag" is an HTTP standard token defined in RFC 7232 §2.3 ("entity tag")
and is written `ETag` in HTTP headers and most APIs. The TS Style Guide acronym
rule says treat acronyms as one word when 3+ letters (so `XmlHttpRequest`, not
`XMLHTTPRequest`). Two-letter acronyms can keep both letters capitalised. Either
`notebookETag` or `notebookEtag` is defensible; the field uses lowercase, but
elsewhere in the codebase (search `Etag|ETag` in `cleanrooms/v1`) the same
lowercase form is used for the `etag` field on `CleanRoomsNotebookTask`. Mark as
consistent within the codebase but worth re-examining at the SDK level.

### 8. `notebookEtag` belongs to the notebook, not the task run — category 16
(Field contradicting type domain)

**Symbol:** `CleanRoomNotebookTaskRun.notebookEtag` (model.ts:65).

**Issue:** Field doc says "Etag of the notebook executed in this task run". The
field name is fine, but contrast with `notebookUpdatedAt` (line 67) — the
combination `notebookEtag` + `notebookUpdatedAt` implies the entire task-run
struct is mixing notebook metadata with run metadata. Consider whether these
should live under a nested `notebook` sub-object (`notebook.etag`,
`notebook.updatedAt`) in a future revision. Flag only — current shape mirrors Go.

### 9. `notebookJobRunState` is unclear naming — category 1 (Vague/generic) and 12
(Duplicate concepts)

**Symbol:** `CleanRoomNotebookTaskRun.notebookJobRunState` (model.ts:52).

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
`CleanRoomsNotebookTask_CleanRoomsNotebookTaskOutput.cleanRoomJobRunState`
(jobs/v2/model.ts:1158) which has the same shape with yet *another* spelling —
flag both for coordinated renaming.

### 10. `runDuration` vs implicit "task run" — category 15 (Generic field names
losing meaning)

**Symbol:** `CleanRoomNotebookTaskRun.runDuration` (model.ts:50).

**Issue:** The owning struct is already a "Run". Sibling fields drop the "run"
prefix (`startTime`, not `runStartTime`; `notebookEtag`, not `runNotebookEtag`),
yet duration carries it. Inconsistent.

**Suggested:** `duration` (the doc already says "Duration of the task run, in
milliseconds"). Or rename `startTime` → `runStartTime` for consistency — pick one
side.

### 11. `outputSchemaExpirationTime` / `sharedOutputSchemaExpirationTime` —
verbose — category 7 (Overly verbose)

**Symbols:** model.ts:63, model.ts:73.

**Issue:** `…Time` suffix is redundant; the value is a number (epoch ms).
Compare to `startTime` which legitimately is "time", and `notebookUpdatedAt`
(line 67) which already uses the more idiomatic `At` suffix for an epoch
millisecond timestamp. Within the *same struct*, three different conventions
coexist: `…Time`, `…At`, and `runDuration` (numeric duration). Pick one.

**Suggested:** `outputSchemaExpiresAt`, `sharedOutputSchemaExpiresAt`, and
`startedAt` — or normalise all three to `…Time`. The `Run` pattern in other
Databricks APIs leans toward `…At`.

### 12. `sharedOutputSchemaName` doc references missing `enable_shared_output`
flag — category 6 (Misleading names)

**Symbol:** `CleanRoomNotebookTaskRun.sharedOutputSchemaName` (model.ts:72).

**Issue:** Doc says "accessible by all collaborators when enable_shared_output is
true". No such field exists in the request/response, and no `enableSharedOutput`
on the run struct. Either the doc references state stored elsewhere (probably on
the clean-room asset config), or the field is missing. Not a naming bug, but
flag for a doc rewording.

### 13. `CollaboratorJobRunInfo` repeats "collaborator" in every field —
category 8 (Redundant suffixes) and category 2 (Redundant prefixes)

**Symbol:** `CollaboratorJobRunInfo` (model.ts:85). Fields: `collaboratorJobId`,
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

### 14. Type name `CollaboratorJobRunInfo` mixes "Job Run" and the rest of the
package speaks "Task Run" — category 12 (Duplicate concepts) and category 9
(Singular/plural mismatch on the broader concept)

**Symbol:** `CollaboratorJobRunInfo` (model.ts:85).

**Issue:** Field `collaboratorTaskRunId` lives inside `CollaboratorJobRunInfo`
(model.ts:91). One struct uses both vocabulary domains. From Databricks docs:
a *Task run* is a single task within a *Job run* (a job can have N tasks). The
field doc strings here use "task run" almost exclusively — `Job ID of the task
run`, `Task run ID of the task run`, `triggered the task run`. The "Job Run" in
the struct *name* is therefore misleading; a more accurate name is
`CollaboratorTaskRunRef` or `CollaboratorRunRef`. Flag for coordination with API
team — the Go SDK has the same name. Cross-reference `jobs/v2` to align.

### 15. `Etag` doc text — category 4 (Underscores) and category 17 (Inconsistent
action verbs)

**Symbol:** Doc comment for `notebookEtag` (model.ts:64): "used to identify the
notebook version".

Not a naming issue per se, but the wire field is `notebook_etag`, surface field
`notebookEtag`, and JSDoc uses "Etag" — three spellings in one field. Minor.

### 16. `CleanRoomTaskRunState` and the field `notebookJobRunState` of type
`CleanRoomTaskRunState` — category 6 (Misleading names)

**Symbols:** model.ts:78, model.ts:52.

**Issue:** Three name layers for the same idea. The doc on
`CleanRoomTaskRunState` says "Stores the run state of the clean rooms notebook
task" — i.e. it is the state of a *notebook task run*. The field that holds it is
called `notebookJobRunState`, which is then `CleanRoomTaskRunState`. The Java SDK
calls the same thing `NotebookTaskRunOutput.runState`. Suggest aligning on
`state: CleanRoomTaskRunState` (drop the doubled noun on the field name) and
keep the type name as-is (the wider SDK uses `…State` types throughout, e.g.
`RunState`, `JobState`).

### 17. `pageSize` doc contradicts behaviour — category 6 (Misleading names)

**Symbol:** `ListCleanRoomNotebookTaskRunsRequest.pageSize` (model.ts:104).

**Issue:** Doc reads: "The maximum number of task runs to return. Currently
ignored - all runs will be returned." If the field is currently ignored, the
name `pageSize` is *misleading* — callers will set it expecting it to take
effect. Either remove the field (best), mark it `@deprecated`, or document this
in JSDoc with a `@deprecated` tag so IDEs show strike-through. Naming-wise:
`pageSize` is fine *if* it works; document the no-op via the deprecation tag,
not just a sentence inside the doc.

### 18. `runs` field in response — category 15 (Generic field names losing
meaning) — borderline acceptable

**Symbol:** `ListCleanRoomNotebookTaskRunsResponse.runs` (model.ts:111).

**Issue:** Generic given the package context, but defensible: this is the
canonical "list" shape (`{ items, nextPageToken }`). The doc string on it ("Name
of the clean room.") is *wrong* — copy-paste error from the request struct's
`cleanRoomName` doc. Doc-text bug, not a naming bug, but worth flagging during a
naming pass since reviewers will notice the field while reading docs.

### 19. `nextPageToken` is the canonical name — pass.

No issue. Matches all other listing responses in the SDK.

### 20. `ListCleanRoomNotebookTaskRunsRequest` / `…Response` — category 7
(Overly verbose)

**Symbols:** model.ts:98, 109.

**Issue:** At 36 / 37 characters these are among the longest type names in the
package. The names are accurate but heavy; within the package scope, just
`ListRequest` / `ListResponse` would suffice. However, the Go SDK pattern (mirrored
across the entire TS SDK) qualifies every request/response with the full operation
name, so this is consistent with the wider convention. Flag only — do not change
in isolation.

### 21. Method name `listCleanRoomNotebookTaskRunsHandlerIter` is 41 chars —
category 7 (Overly verbose)

**Symbol:** `Client.listCleanRoomNotebookTaskRunsHandlerIter` (client.ts:97).

**Issue:** Combine with finding 1: drop `Handler` to land at
`listCleanRoomNotebookTaskRunsIter` (33 chars). The `Iter` suffix is the project's
canonical name for the async-iterator paginator (used in `cleanrooms`,
`cleanroomassets`, etc.) and should stay. Note: TS-idiomatic alternatives include
naming the iterator method without a suffix and using JSDoc to indicate it's an
iterator, but project convention is `Iter`.

### 22. Function `listCleanRoomNotebookTaskRunsHandlerIter` plural "runs" inside
the async generator yielding singular `CleanRoomNotebookTaskRun` — category 9
(Singular/plural mismatch) — *pass*

The convention in the SDK is `list…Iter()` returns an `AsyncGenerator<Single>`,
so plural method name + singular yield is intentional and consistent. No fix.

### 23. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. Every TS package exports a single `Client` class scoped to its
import path (e.g. `@databricks/sdk-cleanroomtaskruns/v1`).

### 24. `PACKAGE_SEGMENT` constant — category 4 (Underscores in TS identifiers)

**Symbol:** `PACKAGE_SEGMENT` (client.ts:27).

**Issue:** TS style for module-level constants is `camelCase` for runtime values
that aren't true primitive constants. Google TS Style Guide §5.1
("const enums and constants must use UPPER_SNAKE_CASE only when they refer to
true constant values… else use camelCase"). `PACKAGE_SEGMENT` is a runtime object
(`{key, value}`) and is `const` only by declaration. However, the same name is
used in every package's client.ts (verify: ran into it in `cleanrooms`,
`cleanroomassets`, …) — it is a convention. Flag only for consistency, do not
fix in isolation.

### 25. `userAgent` and `httpClient` — *pass*

Standard names; acronym handling is consistent (`Url` would be flagged but
`HttpClient` is acceptable under the project rule and matches the imported type).

### 26. `marshalRequest` / `unmarshal*Schema` — category 14 (Go/Java-style names)

**Symbols:** `marshalRequest` (utils.ts:119), the four `unmarshal*Schema`
constants (model.ts:119, 152, 163, 180).

**Issue:** "Marshal" / "Unmarshal" is Go vocabulary. The TS ecosystem uses
"serialize" / "deserialize" or, when working with Zod, "parse" / "stringify".
This is a project-wide convention copied from Go; it is consistent here, but it
is a Go-ism. Flag for the broader SDK review, not this package alone.

### 27. `flattenQueryParams` — *pass*, but unused (dead code)

**Symbol:** `flattenQueryParams` (utils.ts:123).

**Issue:** Imported nowhere within this package's client (the `list` method builds
its querystring inline at client.ts:64–72). The helper is dead code in this
package. Naming itself is fine. Suggest deleting or extracting to a shared utility
in `@databricks/sdk-core/http`. (Same applies to `marshalRequest` — declared but
unused inside the package.)

### 28. `executeCall` vs `executeHttpCall` — category 17 (Inconsistent action verbs)

**Symbols:** `executeCall` (utils.ts:26) and `executeHttpCall` (utils.ts:65).

**Issue:** Two functions named `execute…Call`. `executeCall` is the public API
wrapper that calls `execute()` from `@databricks/sdk-core/api`. `executeHttpCall`
performs an HTTP request and decodes the body. They do *different* things at
*different* layers — but the names imply a hierarchical relationship that does not
exist. The HTTP one is roughly `sendAndDecode` or `doHttpRequest`. Flag for SDK-wide
naming cleanup; this file is generated boilerplate copied across every package.

### 29. `readAll(body)` — *pass*

Helper does what its name says.

### 30. `HttpCallOptions` (utils.ts:15) — category 1 (Vague) and category 20
(Type-suffix tautology)

**Symbol:** `HttpCallOptions` interface.

**Issue:** "HttpCall" is not a concept that exists elsewhere in the SDK; the
neighbouring `CallOptions` exists in `@databricks/sdk-options/call`. Naming both
in the same file confuses readers — which "Call" do they mean? Suggest
`HttpRequestContext` or `ExecuteHttpArgs`. Flag for SDK-wide cleanup.

---

## Cross-package notes (per audit instructions)

### `TaskRun` concept divergence between `cleanroomtaskruns` and `jobs/v2`

| Aspect | `cleanroomtaskruns/v1` | `jobs/v2` |
|--------|------------------------|-----------|
| LifeCycle enum name | `CleanRoomTaskRunLifeCycleState` | `CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState` |
| Result enum name    | `CleanRoomTaskRunResultState`    | `CleanRoomTaskRunResultState_CleanRoomTaskRunResultState` |
| State struct        | `CleanRoomTaskRunState`          | `CleanRoomTaskRunState` (same name, identical shape) |
| Field referencing state | `notebookJobRunState`        | `cleanRoomJobRunState` (jobs/v2/model.ts:1158) |

The proto-style nested enum name `X_X` exists only in `jobs/v2`; the
`cleanroomtaskruns/v1` flat name is cleaner. Audit categories 12 (duplicate
concepts) and 2 (redundant prefixes) — strong recommendation: the generator
should reuse the `cleanroomtaskruns` flat names from `jobs/v2` (or both packages
should re-export from a single shared module) to avoid the doubled-prefix
oddity in `jobs`. This is a *generator* concern, not a `cleanroomtaskruns`
package concern — flag for the SDK platform team.

Same goes for the state-field name: `notebookJobRunState` here, `cleanRoomJobRunState`
in jobs/v2 — two names for one wire-level concept.

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
- **High (style guide violations):** 3 findings (#3 enum casing, #5 LifeCycle
  casing, #13 collaborator prefix repetition).
- **Medium (naming clarity):** 8 findings (#2, #6, #9, #10, #11, #14, #16, #17).
- **Low / project-wide convention notes:** 11 findings (#4, #7, #8, #12, #15,
  #18, #19, #21, #24, #26, #27, #28, #29, #30) — some inherited from generator.
- **Pass / acceptable as-is:** 4 findings (#19, #22, #23, #25, #29).

**Total flagged findings: 24** distinct items across 20 categories (some
findings touch multiple categories).
