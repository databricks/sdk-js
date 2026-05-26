# Naming Audit: queryhistory

**Path:** `packages/queryhistory/src/v1/`
**Versions audited:** v1
**Inferred domain:** Read-only query history API for Databricks SQL warehouses and serverless compute. Surfaces a single endpoint that lists historical queries with filter/pagination and returns per-query status, timing, identity, source, and execution metrics.
**Total weird names flagged:** 43

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 19 |
| Low | 21 |
| Observation | 3 |

## High severity

### 1. `QueryInfo` — "Info" suffix on a top-level domain entity — `src/v1/model.ts:177`
- **Why weird:** The most central type in the package — the value returned from `listQueries` — is named `QueryInfo`. "Info" is a category-1 vague suffix; almost every field on it is a first-class property of a *query* (`queryId`, `queryText`, `status`, `userId`, `queryStartTimeMs`, ...). The type *is* the query — there is no other `Query` type for `QueryInfo` to disambiguate from. Compare with Go SDK convention where `*Info` types are common, but in TS the suffix is non-idiomatic; e.g. `alerts.Alert`, `jobs.Job`, `clusters.ClusterInfo` (this last one is the exception, also flagged in another audit). The endpoint URL is `/api/2.0/sql/history/queries` — the resource is "queries", so the response item should be `Query`.
- **Category:** 8, 14, 1 (redundant `Info` suffix; Go/Java-style; vague suffix)
- **Suggested name:** `Query`.
- **Rationale:** A list of queries should be `Query[]`, not `QueryInfo[]`. The field is even called `res?: QueryInfo[]` (see #2) — `res?: Query[]` reads better. The Go SDK uses `QueryInfo` because Go does not have a `Query` type collision in this package; TS does not have that constraint and should pick the cleaner name.

### 2. `ListQueriesRequest_Response.res` — cryptic field — `src/v1/model.ts:156`
- **Why weird:** A top-level response field named `res`. Two characters. Could mean *result*, *resource*, *response*, *reservation*, *reservoir*. The doc comment is empty. Every comparable list response in this SDK names its payload field something like `alerts`, `clusters`, `dashboards`, etc. (matching the resource); the Databricks public docs page for this endpoint calls it `res` too — so this is a wire-format leak, not a TS naming choice.
- **Category:** 5, 1 (cryptic abbreviation; vague/generic)
- **Suggested name:** `queries`.
- **Rationale:** The field is `QueryInfo[]` (or `Query[]` after #1). `queries` is the obvious idiomatic name. Even keeping the wire form `res`, the TS surface can map `res` → `queries` in the unmarshal transform (the file already does property-renames everywhere — `query_id` → `queryId`, etc.).

### 3. `QueryInfo.endpointId` aliased to `warehouse_id` — `src/v1/model.ts:205`
- **Why weird:** `QueryInfo` has both `endpointId` (line 205) and `warehouseId` (line 232) and the doc on `endpointId` reads `Alias for warehouse_id.` Two fields, one underlying ID, both present on every response. Callers will pick one and silently miss the other if the server only fills one. The wire form has the same problem: `endpoint_id` and `warehouse_id` are independent JSON properties on the response. "Endpoint" is also outdated SQL Warehouse vocabulary (Databricks renamed SQL endpoints to SQL warehouses years ago); keeping it for backwards compatibility belongs in the wire layer, not the public TS type.
- **Category:** 12, 6 (duplicate concepts; misleading)
- **Suggested name:** Drop `endpointId`. If the server still returns it, alias inside the unmarshal: `warehouseId: d.warehouse_id ?? d.endpoint_id`.
- **Rationale:** Two fields with identical meaning is a perpetual source of `if (q.warehouseId !== undefined) ... else if (q.endpointId !== undefined) ...` chains in consumer code. The Go SDK already exposes both because it cannot collapse them without API breakage; TS can collapse and document the legacy wire name.

## Medium severity

### 4. `PlansState` — vague type name — `src/v1/model.ts:14`
- **Why weird:** "Plans state" — state of what? The JSDoc clarifies: "Possible Reasons for which we have not saved plans in the database." So the enum is really an "outcome" or "save status" — not a runtime state of a plan. The values include `EXISTS`, `EMPTY`, `IGNORED_*`, `UNKNOWN` — these are storage outcomes, not lifecycle states. Calling them a "state" is misleading.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `PlanStorageStatus` or `QueryPlansAvailability`.
- **Rationale:** Reflects what the value actually represents. Also fixes the singular/plural smell: `PlansState` (plural noun + singular state) reads oddly; `PlanStorageStatus` is uniformly singular.

### 5. `PlansState.EXISTS` vs `EMPTY` — verb-tense inconsistency — `src/v1/model.ts:20,24`
- **Why weird:** Within the same enum: `EXISTS` is a verb (present tense), `EMPTY` is an adjective, `IGNORED_*` is a past participle, `UNKNOWN` is an adjective. Four grammatical categories for the same set of states. A consumer using one value learns the wrong pattern for the next.
- **Category:** 13 (verb-tense inconsistency)
- **Suggested name:** Normalize on adjectives/past participles: `AVAILABLE`, `EMPTY`, `IGNORED_SMALL_DURATION`, `IGNORED_LARGE_SIZE`, `IGNORED_SPARK_PLAN_TYPE`, `UNKNOWN`.
- **Rationale:** Internal consistency. `AVAILABLE` is also more accurate than `EXISTS` (the plans exist *somewhere*; the value means they exist *in storage*).

### 6. `PlansState.IGNORED_LARGE_PLANS_SIZE` — grammatically awkward — `src/v1/model.ts:18`
- **Why weird:** `LARGE_PLANS_SIZE` is awkward English: "large plans size" reads as a noun pile. "Large plan size" or simply "too large" would scan naturally.
- **Category:** 18 (awkward grammar)
- **Suggested name:** `IGNORED_LARGE_PLAN_SIZE` or `IGNORED_TOO_LARGE`.
- **Rationale:** Fixes the singular/plural shape so the value reads as English.

### 7. `PlansState.IGNORED_SPARK_PLAN_TYPE` — domain-leaky enum value — `src/v1/model.ts:26`
- **Why weird:** The value mentions "Spark plan type" — Spark is a Databricks implementation detail and the doc comment references three internal flags: `isIgnoredSparkPlanType`, `isIgnoredSparkPlanName`, `isDeltaLogScan`. SDK consumers shouldn't need to know about Spark's plan taxonomy. Also, the value name only references one of the three reasons — what if it's `isDeltaLogScan` or `isIgnoredSparkPlanName`? The value is one enum entry for three distinct causes.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `IGNORED_FILTERED_TYPE` (broader, doesn't leak Spark vocabulary), or split into three values matching the three internal flags.
- **Rationale:** Either generalize or specialize — but not both.

### 8. `PlansState.UNKNOWN` vs `ChannelName.CHANNEL_NAME_UNSPECIFIED` — UNKNOWN-vs-UNSPECIFIED inconsistency — `src/v1/model.ts:22,6`
- **Why weird:** Two enums in the same file use two different conventions for the "default/unrecognized" sentinel: `PlansState.UNKNOWN` and `ChannelName.CHANNEL_NAME_UNSPECIFIED`. A consumer who learns one pattern won't reach for the other. The values are conceptually adjacent (both denote "no real value here") but spelled differently in the same package.
- **Category:** 13 (cross-enum convention inconsistency)
- **Suggested name:** Pick one convention across the package and apply it uniformly.
- **Rationale:** Cross-enum consistency. The proto3 zero-value member must exist on every enum, but the spelling of that member (`UNKNOWN` vs `UNSPECIFIED`) should be consistent across the package.

### 9. `QueryStatementType.OTHER` — vague catch-all — `src/v1/model.ts:30`
- **Why weird:** `OTHER` is a vague catch-all value within an otherwise specific enum of SQL statement keywords (`SELECT`, `INSERT`, ...). A caller seeing `statementType === 'OTHER'` has no way to recover what the statement actually was.
- **Category:** 1 (vague)
- **Suggested name:** Keep `OTHER` (no good alternative) but document the value to explain when the runtime emits it.
- **Rationale:** Without documentation the value is opaque; documenting it removes most of the surprise.

### 10. `QueryStatus.CANCELED` — spelling and verb-tense — `src/v1/model.ts:82`
- **Why weird:** `CANCELED` (single-l, US) where most JavaScript ecosystems use `cancelled` (double-l) and at minimum should be consistent with the rest of the codebase. More importantly: every other `QueryStatus` value is a past participle (`QUEUED`, `STARTED`, `COMPILED`, `FAILED`, `FINISHED`) or `-ING` (`COMPILING`, `RUNNING`). `CANCELED` fits the past-participle pattern — flag only for spelling.
- **Category:** 13 (verb-tense — minor) plus orthographic
- **Suggested name:** Keep `CANCELED` if that matches the wire (and project-wide policy); flag for cross-package consistency.
- **Rationale:** The W3C HTML spec uses `cancelled`; Node.js, the DOM, and most npm packages use `canceled`. The wire form here is `"CANCELED"`, so the TS surface should match. Just record the choice.

### 11. `QueryStatus.STARTED` and `COMPILED` — deprecated but exported — `src/v1/model.ts:65,75`
- **Why weird:** Both enum values are documented as `DEPRECATED: to be removed once runtime side change is picked up.` Yet they're exported in `index.ts` (since `QueryStatus` is) and have no JSDoc `@deprecated` tag. IDE autocomplete will offer them indistinguishably from current values.
- **Category:** 11 (effectively dead) plus tooling concern
- **Suggested name:** No rename. Add `@deprecated` JSDoc on each so IDEs show the strikethrough and the doc surfaces in tooltips.
- **Rationale:** TypeScript honors `@deprecated` in completions; the current comment is informational only.

### 12. `QueryInfo.executionEndTimeMs` vs `queryEndTimeMs` — domain confusion — `src/v1/model.ts:195,197`
- **Why weird:** Two `*End*Ms` fields next to each other. The doc comments are: `The time execution of the query ended.` (executionEndTimeMs) and `The time the query ended.` (queryEndTimeMs). Are these different? When? The metrics type later splits time into `compilationTimeMs`, `executionTimeMs`, `resultFetchTimeMs` — so plausibly "execution end" is after spark execution but before fetch, while "query end" is after fetch. The TS types do not encode this. A reader has to guess.
- **Category:** 1, 6, 19 (vague; misleading; underspecified time field)
- **Suggested name:** Keep both names but rewrite the docs to spell out the relationship and the relative ordering (`queryStartTimeMs ≤ executionEndTimeMs ≤ queryEndTimeMs`). Optionally rename to `executionEndTimeMs` / `resultsDeliveredTimeMs`.
- **Rationale:** This is the kind of field that turns into a billing/SLA bug if confused. The audit is naming-only, but the names *here* are the source of the confusion.

### 13. `QueryInfo.lookupKey` — cryptic, undocumented — `src/v1/model.ts:211`
- **Why weird:** Field documented as `A key that can be used to look up query details.` Look up *where*, with *what API*, returning *what*? `queryId` already serves that purpose. The two coexist on the same response with no explanation. `lookupKey` is vague (lookup what?), undefined-purpose, and parallel to `queryId`.
- **Category:** 1, 12 (vague; duplicate concepts)
- **Suggested name:** Rename to indicate destination — e.g. `detailsLookupKey` or `historyLookupKey`, plus a doc that references the related API.
- **Rationale:** Without an explanation, this looks like a synonym for `queryId`. Drop it from public surface if it has no consumer use.

### 14. `QueryInfo.executedAsUserId` / `executedAsUserName` — duplicate of `userId` / `userName` — `src/v1/model.ts:215,217`
- **Why weird:** Four user-identity fields on one type: `userId`, `userName`, `executedAsUserId`, `executedAsUserName`. The "executed as" pair models impersonation/run-as. Good intent, but the field names don't make the relationship clear (user1 ran-as user2). Compare `alerts.v2.Alert.runAsUserName` vs `Alert.runAs.userName` for a different (also problematic) approach to the same concept.
- **Category:** 12, 1 (duplicate concepts; vague)
- **Suggested name:** Group into a sub-object: `submitter: { id, name }`, `runAs?: { id, name }`. Or rename to `submittedByUserId/Name` + `executedAsUserId/Name`.
- **Rationale:** Pairing the two roles symmetrically (submitter / runAs) makes the relationship explicit at the type level. The current names ("user" without qualifier on one pair, "executedAsUser" on the other) implies the bare `user*` is the *original* user, but doesn't say so.

### 15. `QueryInfo.userName` is "email or username" — `src/v1/model.ts:201`
- **Why weird:** Field documented as `The email address or username of the user who ran the query.` So `userName` is a union of two unrelated identifier formats with no way to tell them apart at the type level. Same problem on `executedAsUserName`.
- **Category:** 6, 15 (misleading; generic field losing meaning)
- **Suggested name:** `userIdentifier` or `userPrincipal`, with the doc noting it can be either. Or split into `userEmail?` / `userLoginName?`.
- **Rationale:** `userName` strongly implies a `username` (login handle), not an email. Half of integration code will assume that and break.

### 16. `QueryInfo.sparkUiUrl` — implementation leak — `src/v1/model.ts:203`
- **Why weird:** `sparkUiUrl` exposes an internal Spark UI URL. "Spark UI" is a Databricks Runtime implementation detail; SDK consumers shouldn't need to know that the link goes to "Spark UI" specifically. The URL is functionally "query plan / execution diagnostics UI" — the name pins it to one particular implementation.
- **Category:** 14 (Go/Java-style; leaks internal taxonomy)
- **Suggested name:** `queryPlanUrl` or `executionPlanUrl`.
- **Rationale:** Decouples the public API from Spark's internal nomenclature.

### 17. `QueryInfo.warehouseId` and `endpointId` co-existing — `src/v1/model.ts:205,232`
- **Why weird:** Cross-reference of #3: these two fields both exist on `QueryInfo`. The audit calls out the *duplication*; the names *individually* are also weak — `warehouseId` is fine; `endpointId` is misleading (the wire form keeps it for back-compat with the old SQL Endpoint API).
- **Category:** 19, 16 (underspecified ID; field contradicting type domain)
- **Suggested name:** See #3.

### 18. `QueryInfo.sessionId` — overloaded identifier — `src/v1/model.ts:222`
- **Why weird:** Doc reads `The spark session UUID that query ran on. This is either the Spark Connect, DBSQL, or SDP session ID.` Three distinct session-ID namespaces collapsed into one field with no discriminator. Caller cannot tell, from the field alone, which session type the ID refers to.
- **Category:** 15, 19 (generic field; underspecified ID)
- **Suggested name:** Keep `sessionId` but add a sibling `sessionType?: 'SPARK_CONNECT' | 'DBSQL' | 'SDP'` or split into three optional fields.
- **Rationale:** A naked UUID with three possible namespaces is a debugging hazard.

### 19. `QueryInfo.isFinal` — what does "final" mean? — `src/v1/model.ts:224`
- **Why weird:** Field doc: `Whether more updates for the query are expected.` So `isFinal: true` means the query result is *complete and won't change*. The name `isFinal` is conventionally used for things like inheritance ("can't be subclassed") or compilation ("final pass"). `isComplete`, `isTerminal`, or `isSettled` would be clearer.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `isSettled` or `isTerminal` (matches the `QueryStatus` terminal states).
- **Rationale:** The name should describe the state, not the absence of updates.

### 20. `QueryInfo.channelUsed` vs type `ChannelInfo` — `src/v1/model.ts:226`
- **Why weird:** Field `channelUsed: ChannelInfo`. The `Used` suffix is unusual (past participle on a noun). Most fields elsewhere drop the verb: `channel`, `warehouse`, etc. The type itself is `ChannelInfo` (another `Info` suffix — see #1 / general pattern). Reads as "channel-used info" — three nouns.
- **Category:** 8, 7 (redundant `Info`; verbose; verb-as-modifier)
- **Suggested name:** `channel: Channel`. (Rename type `ChannelInfo` → `Channel`.)
- **Rationale:** Symmetry with `warehouseId`, `userId`, etc. — bare noun.

### 21. `QueryInfo.metrics: QueryMetrics` vs `QueryInfo.duration: number` — `src/v1/model.ts:213,237`
- **Why weird:** A `metrics` sub-object exists, and *also* a top-level `duration` field on `QueryInfo`. Inside `QueryMetrics` there is `totalTimeMs` (`Total execution time of the query from the client's point of view, in milliseconds.`). What's the difference between `QueryInfo.duration` and `QueryInfo.metrics.totalTimeMs`? The doc on `duration` says `Total time of the statement execution. This value does not include the time taken to retrieve the results...` — so `duration` excludes result fetch, while `totalTimeMs` doesn't. Two near-synonym fields, in two places.
- **Category:** 12, 1 (duplicate concepts; vague)
- **Suggested name:** Move `duration` into `QueryMetrics` as `executionTimeExcludingFetchMs` (or use the existing `executionTimeMs`), and remove the top-level `duration`.
- **Rationale:** Two times on one type, both unitless in the name (`duration` doesn't say ms), invites confusion.

### 22. `QueryInfo.duration` — unit not in the name — `src/v1/model.ts:237`
- **Why weird:** Every other time field has a `Ms` suffix (`queryStartTimeMs`, `executionEndTimeMs`, `queryEndTimeMs`, `totalTimeMs`, etc.). `duration` does not. The type is `number`. The doc says "Total time of the statement execution" with no unit. Reader must guess.
- **Category:** 15, 19 (generic field losing meaning; underspecified)
- **Suggested name:** `durationMs`. (See also #21.)
- **Rationale:** Internal consistency with every other time field in the file.

## Low severity

### 23. `QueryInfo.clientApplication` — domain ambiguity — `src/v1/model.ts:243`
- **Why weird:** `clientApplication: string` returns names like "Databricks SQL Editor, Tableau, and Power BI" — these are *application names*, not application IDs. The doc even disclaims "values are expected to remain static over time, this cannot be guaranteed." So the field is a free-text label, not a stable identifier. Name doesn't reflect that.
- **Category:** 15 (generic field losing meaning)
- **Suggested name:** `clientApplicationName` or `clientAppLabel`.
- **Rationale:** Marks the field as a display label rather than an ID.

### 24. `QueryInfo.querySource: ExternalQuerySource` vs `cacheQueryId` — `src/v1/model.ts:248,250`
- **Why weird:** "Query source" / "external query source" / "cache query ID" — three different ways the type talks about the origin of a query. `querySource` is the *upstream entity* (dashboard, notebook, alert, job, ...); `cacheQueryId` is the *prior query that supplied a cached result*. Conceptually unrelated, but the field names rhyme.
- **Category:** 12 (duplicate concepts — only superficial)
- **Suggested name:** Keep `querySource`. Rename `cacheQueryId` → `cachedFromQueryId`.
- **Rationale:** Makes the semantic distinction explicit.

### 25. `ExternalQuerySource.dashboardId` vs `legacyDashboardId` — `src/v1/model.ts:99,101`
- **Why weird:** Two dashboard-related ID fields on the same type. `legacyDashboardId` implies pre-Lakeview dashboards (the JSDoc on `dashboardId` is "this Lakeview dashboard"). Both can be set simultaneously? The semantics are not encoded — should be a discriminated union (`{ kind: 'lakeview', id } | { kind: 'legacy', id }`).
- **Category:** 12, 19 (duplicate concept; underspecified)
- **Suggested name:** Keep the names; consider a `kind` discriminator. At minimum, document the mutual exclusivity.
- **Rationale:** Documentation fix more than naming.

### 26. `ExternalQuerySource.alertId` and `sqlQueryId` and `genieSpaceId` — — `src/v1/model.ts:103,107,110`
- **Why weird:** Several optional IDs co-exist on `ExternalQuerySource` with no rule about which is set when. Discriminated-union opportunity not taken. Field names are individually fine; together they encode "exactly one of N" weakly.
- **Category:** 19 (underspecified)
- **Suggested name:** As above — convert to discriminated union.
- **Rationale:** TS can encode this; Go cannot. Lost in 1:1 port.

### 27. `ExternalQuerySource_JobInfo.jobTaskRunId` — — `src/v1/model.ts:120`
- **Why weird:** Three IDs on one type: `jobId`, `jobRunId`, `jobTaskRunId`. The naming is consistent and self-documenting. `jobTaskRunId` (one identifier for "task run within a job run") could be ambiguous: is it the run-ID of a *task* (with `jobRunId` being the run-ID of the whole job), or vice versa? The doc says `The canonical identifier of the task run.` — confirms the former.
- **Category:** 19 (underspecified)
- **Suggested name:** Acceptable; if confusion arises, rename to `taskRunIdWithinJobRun`.
- **Rationale:** Documentation is sufficient.

### 28. `QueryMetrics.totalTimeMs` vs `executionTimeMs` vs `taskTotalTimeMs` vs `photonTotalTimeMs` — — `src/v1/model.ts:261,269,279,285`
- **Why weird:** Four time fields; the relationship is `totalTime ≥ compilationTime + executionTime + resultFetchTime` (roughly), and `executionTime` aggregates `taskTotalTime` and `photonTotalTime`. The names don't encode the hierarchy; a developer must read all four docs to understand. Individually each name is OK.
- **Category:** 1 (vague — collectively)
- **Suggested name:** Keep, but add a JSDoc on `QueryMetrics` summarizing the hierarchy.
- **Rationale:** Documentation > rename.

### 29. `QueryMetrics.workToBeDone` — phrase as field name — `src/v1/model.ts:319`
- **Why weird:** Phrase rather than a noun. Doc says "remaining work to be done... deprecated: using projected_remaining_task_total_time_ms instead". So this is a deprecated field with a name that reads like English prose ("work to be done") rather than a TS identifier. Reads awkwardly: `metrics.workToBeDone`.
- **Category:** 7, 14 (verbose; Go/Java-style phrase)
- **Suggested name:** Already deprecated. If kept for back-compat, that's fine. New consumers should use `projectedRemainingTaskTotalTimeMs`.
- **Rationale:** Will be removed; flag for awareness only.

### 30. `QueryMetrics.runnableTasks` — — `src/v1/model.ts:324`
- **Why weird:** Doc says `number of remaining tasks to complete, calculated by autoscaler StatementAnalysis.scala. deprecated: use remaining_task_count instead`. So `runnableTasks` actually means "remaining tasks" — name and meaning don't align. Also deprecated.
- **Category:** 6, 1 (misleading; vague)
- **Suggested name:** Deprecated. Use `remainingTaskCount`. Flag for awareness.
- **Rationale:** Same as #29.

### 31. `QueryMetrics.projectedRemainingTaskTotalTimeMs` and `projectedRemainingWallclockTimeMs` — — `src/v1/model.ts:326,333`
- **Why weird:** 32-char and 33-char field names. Five tokens each (`projected/remaining/task/totalTime/Ms`). Long enough that they wrap in editors and IDE tooltips. The doc on the second one says `projected lower bound on remaining total task time based on projected_remaining_task_total_time_ms / maximum concurrency` — the *name* doesn't say "wall-clock" is the divided-by-concurrency version. `WallclockTime` is the differentiator from `TaskTotalTime`.
- **Category:** 7 (overly verbose)
- **Suggested name:** Acceptable given the precision required. Could shorten `projectedRemainingWallclockTimeMs` → `projectedRemainingWallTimeMs`.
- **Rationale:** Marginal.

### 32. `QueryMetrics.spillToDiskBytes` / `readRemoteBytes` / `writeRemoteBytes` / `readCacheBytes` / `networkSentBytes` / `readFilesBytes` / `prunedBytes` — — `src/v1/model.ts:271,273,275,277,291,295,335`
- **Why weird:** Seven `*Bytes` fields, each with subtly different scopes (remote vs cache vs disk vs network vs file vs pruned vs spill). Each individual name is OK; together they form a glossary the reader has to internalize. Also: `spillToDiskBytes` is a verb phrase (`spill to disk`) where peers are noun phrases (`read remote`, `write remote`). Inconsistent grammatical shape.
- **Category:** 13 (verb-tense — minor)
- **Suggested name:** `diskSpillBytes` (noun phrase, parallels `prunedBytes`, `readCacheBytes`).
- **Rationale:** Symmetry.

### 33. `QueryMetrics.readBytes` vs `readFilesBytes` — — `src/v1/model.ts:263,335`
- **Why weird:** Two read-bytes fields. Doc on `readBytes`: `Total size of data read by the query, in bytes.` Doc on `readFilesBytes`: `Total number of file bytes in all tables read`. The difference is "file bytes" vs general "bytes" — possibly identical, possibly not. Names don't disambiguate.
- **Category:** 12, 1 (duplicate concepts; vague)
- **Suggested name:** Rename `readBytes` → `totalReadBytes` and `readFilesBytes` → `readFileBytes` (singular "file" since each row counts).
- **Rationale:** Distinguishes scope.

### 34. `QueryMetrics.prunedBytes` / `prunedFilesCount` paired with `readFilesBytes` / `readFilesCount` — — `src/v1/model.ts:281,295,297,335`
- **Why weird:** Inconsistent pluralization: `readFilesCount` (plural files) vs `prunedFilesCount` (plural files). OK, consistent there. But `readFilesBytes` is also plural where `readFilesCount` follows the same form — consistent. Then we have `readPartitionsCount` (plural). All consistent. Then `taskTotalTimeMs` is singular. The pattern across the type isn't uniform.
- **Category:** 9 (singular/plural mismatch — across fields)
- **Suggested name:** Pick one form. `readFileBytes` / `readFileCount` / `readPartitionCount` (singular, the way English does for counts) reads more naturally.
- **Rationale:** Minor consistency win.

### 35. `QueryMetrics.rowsProducedCount` vs `QueryInfo.rowsProduced` — — `src/v1/model.ts:265,207`
- **Why weird:** `QueryInfo.rowsProduced` (no `Count` suffix) and `QueryMetrics.rowsProducedCount` (with `Count` suffix). Same concept, two field names. The `QueryInfo` doc says "The number of results returned by the query"; the `QueryMetrics` doc says "Total number of rows returned by the query." Are these always equal? Probably. Different names = different fields.
- **Category:** 12, 9 (duplicate concepts; plural/singular mismatch)
- **Suggested name:** Drop one. Keep `QueryMetrics.rowsProducedCount` if metrics is the right home; or rename one to match the other.
- **Rationale:** Same value reachable through two paths is a maintenance hazard.

### 36. `QueryMetrics.provisioningQueueStartTimestamp` / `overloadingQueueStartTimestamp` / `queryCompilationStartTimestamp` — `Timestamp` suffix inconsistency — `src/v1/model.ts:302,307,309`
- **Why weird:** Three time fields use `*Timestamp` suffix; everywhere else in the file the convention is `*TimeMs`. The `Timestamp` fields are documented as Unix-epoch-milliseconds too, so the unit is the same — just the naming convention differs. Mixing two suffixes for the same kind of value is a category-13 inconsistency.
- **Category:** 13, 19 (verb-tense / convention inconsistency; underspecified — timestamp vs duration)
- **Suggested name:** `provisioningQueueStartTimeMs`, `overloadingQueueStartTimeMs`, `queryCompilationStartTimeMs`.
- **Rationale:** Consistent suffix across all time-valued fields.

### 37. `QueryMetrics.taskTimeOverTimeRange: TaskTimeOverRange` — — `src/v1/model.ts:314`
- **Why weird:** Field name has "OverTimeRange"; type is `TaskTimeOverRange`. Different naming. Field is `taskTimeOver` + `TimeRange`; type is `TaskTime` + `OverRange`. Semantically the same, named differently.
- **Category:** 9, 20 (singular/plural; type-suffix tautology)
- **Suggested name:** Align: `taskTimeOverRange: TaskTimeOverRange` (drop second `Time`).
- **Rationale:** Field name should match type name shape.

### 38. `TaskTimeOverRange.entries` / `TaskTimeOverRangeEntry` — — `src/v1/model.ts:349,358`
- **Why weird:** `TaskTimeOverRange` and `TaskTimeOverRangeEntry` are paired (collection + element). Element type appends `Entry` — that's a known convention from `WindowsAzure`-style SDKs (`*Item`, `*Entry`). Could be `TaskTimeBucket` (parent) and `TaskTimeBucketPoint` (child) — domain-specific names. Acceptable as-is.
- **Category:** 1 (vague — `Entry`)
- **Suggested name:** Optional rename to domain names.
- **Rationale:** Marginal.

### 39. `TaskTimeOverRangeEntry.taskCompletedTimeMs` — — `src/v1/model.ts:360`
- **Why weird:** Only field on the type. The doc says "total task completion time in this time range" — name reads as "task completed time" (past participle). `taskCompletionTimeMs` would be a noun-phrase form and match peer fields.
- **Category:** 13 (verb-tense — past participle vs noun)
- **Suggested name:** `taskCompletionTimeMs`.
- **Rationale:** Noun form is more conventional.

### 40. `TimeRange.startTimeMs` / `endTimeMs` — — `src/v1/model.ts:365,367`
- **Why weird:** Generic type name `TimeRange` lives in a domain package. It's used once (`QueryFilter.queryStartTimeRange: TimeRange`). The field name `queryStartTimeRange` then re-introduces "queryStart" — odd because the `TimeRange` is *for filtering* on query start time, but a `TimeRange` is just (start, end). Reading `queryStartTimeRange.startTimeMs` is "the start of the query-start-time range, in ms" — three "start"s in one expression.
- **Category:** 1, 7 (vague type name; verbose)
- **Suggested name:** Rename field to `submittedDuring: TimeRange` or `queryStartedBetween: TimeRange`. Or rename type to `MsRange` / `TimestampRange` (since the type is unit-specific).
- **Rationale:** Reduces "start" noise.

### 41. `QueryFilter.statuses` doc — recommends against using it — `src/v1/model.ts:170`
- **Why weird:** Doc says `Filtering for multiple statuses is not recommended. Instead, opt to filter by a single status multiple times and then combine the results.` This is a behaviour quirk; field name is fine. Flag for documentation polish.
- **Category:** observation
- **Suggested name:** Keep `statuses`; document why multi-filter is discouraged on the type, not just on the field.
- **Rationale:** Surfaces the constraint.

### 42. `QueryTag.key` / `QueryTag.value` — both optional — `src/v1/model.ts:344,345`
- **Why weird:** Both fields are `?: string | undefined`. A tag with no key is meaningless, yet the schema allows it. The TS interface should make `key` required if business logic requires it. This is a generated-code limitation (proto3 marks scalars as optional), but the names are also weak — `key` and `value` are the *most* generic names possible.
- **Category:** 1 (vague)
- **Suggested name:** Acceptable as proto-mirror; ideal would be `name: string; value?: string`.
- **Rationale:** Minor.

### 43. `ExternalQuerySource.legacyDashboardId` — `Legacy` mid-position architectural-leak modifier — `src/v1/model.ts:101`
- **Why weird:** `Legacy` is a temporal/architectural modifier mid-name — it tags the identifier as belonging to the *old* product (pre-Lakeview dashboards). The "legacy" label only has meaning inside Databricks' product roadmap; SDK consumers who don't know that Databricks shipped a new dashboard product see "legacy" as architectural noise. Names like `Legacy`/`Modern`/`Old`/`New` mid-position bake a release-timeline distinction into the public type surface; once a third dashboard product ships, the name becomes a lie.
- **Category:** proto-architectural-leak (`Legacy` mid-position temporal modifier)
- **Suggested name:** `redashDashboardId` (or whatever the underlying product is actually called), or fold into a discriminated union as suggested in #25.
- **Rationale:** Replace the temporal modifier with the actual product name. The Go SDK keeps `legacy_dashboard_id` because of wire-format back-compat; the TS surface can rename without breaking the wire transform.

## Observations

### O1. `Client` is the only exported class — `src/v1/client.ts:32`
- The class is just `Client`. Consistent across the SDK (so a project-level concern), but worth noting that `import { Client } from '@databricks/sdk-queryhistory/v1'` produces a bare name that collides with every other package's `Client`. Consumers must rename on import.

### O2. `flattenQueryParams` exported but only used internally — `src/v1/utils.ts:123`
- `flattenQueryParams` is `export`ed from `utils.ts`, used in `client.ts`, and not re-exported from `index.ts`. Module-private would suffice, but the helper has to be cross-file. This is a generated-code pattern; flag at the generator level. (Identical to #15 in the `accountaccesscontrol` audit, suggesting this is package-wide.)

### O3. `executeCall` and `executeHttpCall` — overlapping verb pair — `src/v1/utils.ts:26,65`
- Two functions, similar names, different purposes. `executeCall` is the public-`CallOptions` adapter; `executeHttpCall` is the wire-level executor. Names don't signal that one wraps the other. Could be `applyCallOptions` + `sendHttpRequest`. Generated-code concern. (See also the `accountaccesscontrol` audit O2.)

## Cross-cutting themes

1. **The `Info` / `State` suffix habit.** `QueryInfo`, `ChannelInfo`, `PlansState` — bare-noun renames (`Query`, `Channel`, `PlanStorageStatus`) would be cleaner. `Info` is a category-1 vague suffix doing no work.

2. **Sentinel-naming convention inconsistency.** `PlansState.UNKNOWN` vs `ChannelName.CHANNEL_NAME_UNSPECIFIED` — two enums in the same file use different spellings for the proto3 zero-value member. The zero-value itself is required by proto3 and intentional; the inconsistent spelling is not.

3. **Time-field naming is inconsistent.** `*TimeMs` is the dominant convention, but `*Timestamp` appears three times and `duration` once with no unit. Same hierarchy across `QueryInfo` and `QueryMetrics` is hard to read without docs.

4. **Multiple ways to identify one thing.** `endpointId` / `warehouseId`, `userName` (email-or-handle), `sessionId` (Spark Connect or DBSQL or SDP), `lookupKey` vs `queryId`. Each is a "two-fields-one-concept" or "one-field-multiple-concepts" smell.

5. **Verbose field names.** `getAssignableRolesForResource`-style verbosity is mostly absent here (only one endpoint), but field-name verbosity is high (`projectedRemainingTaskTotalTimeMs`, `projectedRemainingWallclockTimeMs`).

## Domain glossary
- **DBSQL** — Databricks SQL, the serverless warehouse engine. The SDK package targets `/api/2.0/sql/history/...`.
- **SDP** — Streaming/Serverless Data Pipelines (per the `sessionId` doc) — internal Databricks runtime.
- **Spark Connect** — Apache Spark's gRPC-based client/server protocol, distinct from DBSQL.
- **Channel** — A versioned SQL warehouse runtime track (Preview/Current/Previous/Custom). `ChannelInfo.dbsqlVersion` is the underlying version string.
- **Photon** — Databricks' native vectorized query engine; `photonTotalTimeMs` measures time spent in Photon-native execution.
- **Plans** — Query execution plans (logical/physical/spark). `PlansState` reports whether and why plans are stored.
- **Statement** — A SQL statement (one query). Aliased with "query" throughout this package; the `statementType` field captures `SELECT`/`INSERT`/etc.
- **Warehouse / Endpoint** — Same concept, two legacy names. SQL Warehouses (current) were originally called SQL Endpoints (legacy); the wire format keeps both fields.
- **Lakeview** — Databricks' newer dashboard product; `ExternalQuerySource.dashboardId` references it. `legacyDashboardId` references the older dashboards.
- **Genie space** — Databricks AI/BI assistant workspace; identified by `genieSpaceId`.
- **Provisioning queue / Overloading queue** — Two queue states a query passes through: waiting for a warehouse to spin up; waiting because the warehouse is overloaded.

## File coverage
- `src/v1/model.ts` (613 lines): read fully.
- `src/v1/client.ts` (109 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (26 lines): read fully.

## Fixed
- #1 `ListQueries` (originally cited at `src/v1/model.ts:131`): Fixed in regeneration on 2026-05-20 — request DTO renamed to `ListQueriesRequest`; the verb-as-noun issue is resolved and the call-site type matches `ListAlertsRequest`-style convention.
- #11-part `QueryStatementType.CALL` (originally cited at `src/v1/model.ts:53`): Fixed in regeneration on 2026-05-20 — `CALL` value was removed from the enum, so the misleading "SQL Script" JSDoc no longer applies. The `OTHER` half of the original finding is preserved as #10.
