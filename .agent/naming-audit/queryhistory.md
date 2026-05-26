# Naming Audit: queryhistory

**Path:** `packages/queryhistory/src/v1/`
**Versions audited:** v1
**Inferred domain:** Read-only query history API for Databricks SQL warehouses and serverless compute. Surfaces a single endpoint that lists historical queries with filter/pagination and returns per-query status, timing, identity, source, and execution metrics.
**Total weird names flagged:** 25

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 12 |
| Low | 11 |
| Observation | 3 |

## High severity

### 1. `QueryInfo` — "Info" suffix on a top-level domain entity — `src/v1/model.ts:177`
- **Why weird:** The most central type in the package — the value returned from `listQueries` — is named `QueryInfo`. "Info" is a category-1 vague suffix; almost every field on it is a first-class property of a *query* (`queryId`, `queryText`, `status`, `userId`, `queryStartTimeMs`, ...). The type *is* the query — there is no other `Query` type for `QueryInfo` to disambiguate from. Compare with Go SDK convention where `*Info` types are common, but in TS the suffix is non-idiomatic; e.g. `alerts.Alert`, `jobs.Job`, `clusters.ClusterInfo` (this last one is the exception, also flagged in another audit). The endpoint URL is `/api/2.0/sql/history/queries` — the resource is "queries", so the response item should be `Query`.
- **Category:** 8, 14, 1 (redundant `Info` suffix; Go/Java-style; vague suffix)
- **Suggested name:** `Query`.
- **Rationale:** A list of queries should be `Query[]`, not `QueryInfo[]`. The field is even called `res?: QueryInfo[]` (see #2) — `res?: Query[]` reads better. The Go SDK uses `QueryInfo` because Go does not have a `Query` type collision in this package; TS does not have that constraint and should pick the cleaner name.

### 2. `QueryInfo.endpointId` aliased to `warehouse_id` — `src/v1/model.ts:205`
- **Why weird:** `QueryInfo` has both `endpointId` (line 205) and `warehouseId` (line 232) and the doc on `endpointId` reads `Alias for warehouse_id.` Two fields, one underlying ID, both present on every response. Callers will pick one and silently miss the other if the server only fills one. The wire form has the same problem: `endpoint_id` and `warehouse_id` are independent JSON properties on the response. "Endpoint" is also outdated SQL Warehouse vocabulary (Databricks renamed SQL endpoints to SQL warehouses years ago); keeping it for backwards compatibility belongs in the wire layer, not the public TS type.
- **Category:** 12, 6 (duplicate concepts; misleading)
- **Suggested name:** Drop `endpointId`. If the server still returns it, alias inside the unmarshal: `warehouseId: d.warehouse_id ?? d.endpoint_id`.
- **Rationale:** Two fields with identical meaning is a perpetual source of `if (q.warehouseId !== undefined) ... else if (q.endpointId !== undefined) ...` chains in consumer code. The Go SDK already exposes both because it cannot collapse them without API breakage; TS can collapse and document the legacy wire name.

## Medium severity

### 3. `PlansState` — vague type name — `src/v1/model.ts:14`
- **Why weird:** "Plans state" — state of what? The JSDoc clarifies: "Possible Reasons for which we have not saved plans in the database." So the enum is really an "outcome" or "save status" — not a runtime state of a plan. The values include `EXISTS`, `EMPTY`, `IGNORED_*`, `UNKNOWN` — these are storage outcomes, not lifecycle states. Calling them a "state" is misleading.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `PlanStorageStatus` or `QueryPlansAvailability`.
- **Rationale:** Reflects what the value actually represents. Also fixes the singular/plural smell: `PlansState` (plural noun + singular state) reads oddly; `PlanStorageStatus` is uniformly singular.

### 4. `PlansState.EXISTS` vs `EMPTY` — verb-tense inconsistency — `src/v1/model.ts:20,24`
- **Why weird:** Within the same enum: `EXISTS` is a verb (present tense), `EMPTY` is an adjective, `IGNORED_*` is a past participle, `UNKNOWN` is an adjective. Four grammatical categories for the same set of states. A consumer using one value learns the wrong pattern for the next.
- **Category:** 13 (verb-tense inconsistency)
- **Suggested name:** Normalize on adjectives/past participles: `AVAILABLE`, `EMPTY`, `IGNORED_SMALL_DURATION`, `IGNORED_LARGE_SIZE`, `IGNORED_SPARK_PLAN_TYPE`, `UNKNOWN`.
- **Rationale:** Internal consistency. `AVAILABLE` is also more accurate than `EXISTS` (the plans exist *somewhere*; the value means they exist *in storage*).

### 5. `PlansState.IGNORED_LARGE_PLANS_SIZE` — grammatically awkward — `src/v1/model.ts:18`
- **Why weird:** `LARGE_PLANS_SIZE` is awkward English: "large plans size" reads as a noun pile. "Large plan size" or simply "too large" would scan naturally.
- **Category:** 18 (awkward grammar)
- **Suggested name:** `IGNORED_LARGE_PLAN_SIZE` or `IGNORED_TOO_LARGE`.
- **Rationale:** Fixes the singular/plural shape so the value reads as English.

### 6. `PlansState.IGNORED_SPARK_PLAN_TYPE` — domain-leaky enum value — `src/v1/model.ts:26`
- **Why weird:** The value mentions "Spark plan type" — Spark is a Databricks implementation detail and the doc comment references three internal flags: `isIgnoredSparkPlanType`, `isIgnoredSparkPlanName`, `isDeltaLogScan`. SDK consumers shouldn't need to know about Spark's plan taxonomy. Also, the value name only references one of the three reasons — what if it's `isDeltaLogScan` or `isIgnoredSparkPlanName`? The value is one enum entry for three distinct causes.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `IGNORED_FILTERED_TYPE` (broader, doesn't leak Spark vocabulary), or split into three values matching the three internal flags.
- **Rationale:** Either generalize or specialize — but not both.

### 7. `PlansState.UNKNOWN` vs `ChannelName.CHANNEL_NAME_UNSPECIFIED` — UNKNOWN-vs-UNSPECIFIED inconsistency — `src/v1/model.ts:22,6`
- **Why weird:** Two enums in the same file use two different conventions for the "default/unrecognized" sentinel: `PlansState.UNKNOWN` and `ChannelName.CHANNEL_NAME_UNSPECIFIED`. A consumer who learns one pattern won't reach for the other. The values are conceptually adjacent (both denote "no real value here") but spelled differently in the same package.
- **Category:** 13 (cross-enum convention inconsistency)
- **Suggested name:** Pick one convention across the package and apply it uniformly.
- **Rationale:** Cross-enum consistency. The proto3 zero-value member must exist on every enum, but the spelling of that member (`UNKNOWN` vs `UNSPECIFIED`) should be consistent across the package.

### 8. `QueryStatementType.OTHER` — vague catch-all — `src/v1/model.ts:30`
- **Why weird:** `OTHER` is a vague catch-all value within an otherwise specific enum of SQL statement keywords (`SELECT`, `INSERT`, ...). A caller seeing `statementType === 'OTHER'` has no way to recover what the statement actually was.
- **Category:** 1 (vague)
- **Suggested name:** Keep `OTHER` (no good alternative) but document the value to explain when the runtime emits it.
- **Rationale:** Without documentation the value is opaque; documenting it removes most of the surprise.

### 9. `QueryStatus.CANCELED` — spelling and verb-tense — `src/v1/model.ts:82`
- **Why weird:** `CANCELED` (single-l, US) where most JavaScript ecosystems use `cancelled` (double-l) and at minimum should be consistent with the rest of the codebase. More importantly: every other `QueryStatus` value is a past participle (`QUEUED`, `STARTED`, `COMPILED`, `FAILED`, `FINISHED`) or `-ING` (`COMPILING`, `RUNNING`). `CANCELED` fits the past-participle pattern — flag only for spelling.
- **Category:** 13 (verb-tense — minor) plus orthographic
- **Suggested name:** Keep `CANCELED` if that matches the wire (and project-wide policy); flag for cross-package consistency.
- **Rationale:** The W3C HTML spec uses `cancelled`; Node.js, the DOM, and most npm packages use `canceled`. The wire form here is `"CANCELED"`, so the TS surface should match. Just record the choice.

### 10. `QueryStatus.STARTED` and `COMPILED` — deprecated but exported — `src/v1/model.ts:65,75`
- **Why weird:** Both enum values are documented as `DEPRECATED: to be removed once runtime side change is picked up.` Yet they're exported in `index.ts` (since `QueryStatus` is) and have no JSDoc `@deprecated` tag. IDE autocomplete will offer them indistinguishably from current values.
- **Category:** 11 (effectively dead) plus tooling concern
- **Suggested name:** No rename. Add `@deprecated` JSDoc on each so IDEs show the strikethrough and the doc surfaces in tooltips.
- **Rationale:** TypeScript honors `@deprecated` in completions; the current comment is informational only.

### 11. `QueryInfo.executionEndTimeMs` vs `queryEndTimeMs` — domain confusion — `src/v1/model.ts:195,197`
- **Why weird:** Two `*End*Ms` fields next to each other. The doc comments are: `The time execution of the query ended.` (executionEndTimeMs) and `The time the query ended.` (queryEndTimeMs). Are these different? When? The metrics type later splits time into `compilationTimeMs`, `executionTimeMs`, `resultFetchTimeMs` — so plausibly "execution end" is after spark execution but before fetch, while "query end" is after fetch. The TS types do not encode this. A reader has to guess.
- **Category:** 1, 6, 19 (vague; misleading; underspecified time field)
- **Suggested name:** Keep both names but rewrite the docs to spell out the relationship and the relative ordering (`queryStartTimeMs ≤ executionEndTimeMs ≤ queryEndTimeMs`). Optionally rename to `executionEndTimeMs` / `resultsDeliveredTimeMs`.
- **Rationale:** This is the kind of field that turns into a billing/SLA bug if confused. The audit is naming-only, but the names *here* are the source of the confusion.

### 12. `QueryInfo.warehouseId` and `endpointId` co-existing — `src/v1/model.ts:205,232`
- **Why weird:** Cross-reference of #2: these two fields both exist on `QueryInfo`. The audit calls out the *duplication*; the names *individually* are also weak — `warehouseId` is fine; `endpointId` is misleading (the wire form keeps it for back-compat with the old SQL Endpoint API).
- **Category:** 19, 16 (underspecified ID; field contradicting type domain)
- **Suggested name:** See #2.

### 13. `QueryInfo.sessionId` — overloaded identifier — `src/v1/model.ts:222`
- **Why weird:** Doc reads `The spark session UUID that query ran on. This is either the Spark Connect, DBSQL, or SDP session ID.` Three distinct session-ID namespaces collapsed into one field with no discriminator. Caller cannot tell, from the field alone, which session type the ID refers to.
- **Category:** 15, 19 (generic field; underspecified ID)
- **Suggested name:** Keep `sessionId` but add a sibling `sessionType?: 'SPARK_CONNECT' | 'DBSQL' | 'SDP'` or split into three optional fields.
- **Rationale:** A naked UUID with three possible namespaces is a debugging hazard.

### 14. `QueryInfo.metrics: QueryMetrics` vs `QueryInfo.duration: number` — `src/v1/model.ts:213,237`
- **Why weird:** A `metrics` sub-object exists, and *also* a top-level `duration` field on `QueryInfo`. Inside `QueryMetrics` there is `totalTimeMs` (`Total execution time of the query from the client's point of view, in milliseconds.`). What's the difference between `QueryInfo.duration` and `QueryInfo.metrics.totalTimeMs`? The doc on `duration` says `Total time of the statement execution. This value does not include the time taken to retrieve the results...` — so `duration` excludes result fetch, while `totalTimeMs` doesn't. Two near-synonym fields, in two places.
- **Category:** 12, 1 (duplicate concepts; vague)
- **Suggested name:** Move `duration` into `QueryMetrics` as `executionTimeExcludingFetchMs` (or use the existing `executionTimeMs`), and remove the top-level `duration`.
- **Rationale:** Two times on one type, both unitless in the name (`duration` doesn't say ms), invites confusion.

## Low severity

### 15. `ExternalQuerySource.dashboardId` vs `legacyDashboardId` — `src/v1/model.ts:99,101`
- **Why weird:** Two dashboard-related ID fields on the same type. `legacyDashboardId` implies pre-Lakeview dashboards (the JSDoc on `dashboardId` is "this Lakeview dashboard"). Both can be set simultaneously? The semantics are not encoded — should be a discriminated union (`{ kind: 'lakeview', id } | { kind: 'legacy', id }`).
- **Category:** 12, 19 (duplicate concept; underspecified)
- **Suggested name:** Keep the names; consider a `kind` discriminator. At minimum, document the mutual exclusivity.
- **Rationale:** Documentation fix more than naming.

### 16. `ExternalQuerySource.alertId` and `sqlQueryId` and `genieSpaceId` — — `src/v1/model.ts:103,107,110`
- **Why weird:** Several optional IDs co-exist on `ExternalQuerySource` with no rule about which is set when. Discriminated-union opportunity not taken. Field names are individually fine; together they encode "exactly one of N" weakly.
- **Category:** 19 (underspecified)
- **Suggested name:** As above — convert to discriminated union.
- **Rationale:** TS can encode this; Go cannot. Lost in 1:1 port.

### 17. `ExternalQuerySource_JobInfo.jobTaskRunId` — — `src/v1/model.ts:120`
- **Why weird:** Three IDs on one type: `jobId`, `jobRunId`, `jobTaskRunId`. The naming is consistent and self-documenting. `jobTaskRunId` (one identifier for "task run within a job run") could be ambiguous: is it the run-ID of a *task* (with `jobRunId` being the run-ID of the whole job), or vice versa? The doc says `The canonical identifier of the task run.` — confirms the former.
- **Category:** 19 (underspecified)
- **Suggested name:** Acceptable; if confusion arises, rename to `taskRunIdWithinJobRun`.
- **Rationale:** Documentation is sufficient.

### 18. `QueryMetrics.totalTimeMs` vs `executionTimeMs` vs `taskTotalTimeMs` vs `photonTotalTimeMs` — — `src/v1/model.ts:261,269,279,285`
- **Why weird:** Four time fields; the relationship is `totalTime ≥ compilationTime + executionTime + resultFetchTime` (roughly), and `executionTime` aggregates `taskTotalTime` and `photonTotalTime`. The names don't encode the hierarchy; a developer must read all four docs to understand. Individually each name is OK.
- **Category:** 1 (vague — collectively)
- **Suggested name:** Keep, but add a JSDoc on `QueryMetrics` summarizing the hierarchy.
- **Rationale:** Documentation > rename.

### 19. `QueryMetrics.workToBeDone` — phrase as field name — `src/v1/model.ts:319`
- **Why weird:** Phrase rather than a noun. Doc says "remaining work to be done... deprecated: using projected_remaining_task_total_time_ms instead". So this is a deprecated field with a name that reads like English prose ("work to be done") rather than a TS identifier. Reads awkwardly: `metrics.workToBeDone`.
- **Category:** 7, 14 (verbose; Go/Java-style phrase)
- **Suggested name:** Already deprecated. If kept for back-compat, that's fine. New consumers should use `projectedRemainingTaskTotalTimeMs`.
- **Rationale:** Will be removed; flag for awareness only.

### 20. `QueryMetrics.runnableTasks` — — `src/v1/model.ts:324`
- **Why weird:** Doc says `number of remaining tasks to complete, calculated by autoscaler StatementAnalysis.scala. deprecated: use remaining_task_count instead`. So `runnableTasks` actually means "remaining tasks" — name and meaning don't align. Also deprecated.
- **Category:** 6, 1 (misleading; vague)
- **Suggested name:** Deprecated. Use `remainingTaskCount`. Flag for awareness.
- **Rationale:** Same as #19.

### 21. `QueryMetrics.rowsProducedCount` vs `QueryInfo.rowsProduced` — — `src/v1/model.ts:265,207`
- **Why weird:** `QueryInfo.rowsProduced` (no `Count` suffix) and `QueryMetrics.rowsProducedCount` (with `Count` suffix). Same concept, two field names. The `QueryInfo` doc says "The number of results returned by the query"; the `QueryMetrics` doc says "Total number of rows returned by the query." Are these always equal? Probably. Different names = different fields.
- **Category:** 12, 9 (duplicate concepts; plural/singular mismatch)
- **Suggested name:** Drop one. Keep `QueryMetrics.rowsProducedCount` if metrics is the right home; or rename one to match the other.
- **Rationale:** Same value reachable through two paths is a maintenance hazard.

### 22. `TaskTimeOverRange.entries` / `TaskTimeOverRangeEntry` — — `src/v1/model.ts:349,358`
- **Why weird:** `TaskTimeOverRange` and `TaskTimeOverRangeEntry` are paired (collection + element). Element type appends `Entry` — that's a known convention from `WindowsAzure`-style SDKs (`*Item`, `*Entry`). Could be `TaskTimeBucket` (parent) and `TaskTimeBucketPoint` (child) — domain-specific names. Acceptable as-is.
- **Category:** 1 (vague — `Entry`)
- **Suggested name:** Optional rename to domain names.
- **Rationale:** Marginal.

### 23. `QueryFilter.statuses` doc — recommends against using it — `src/v1/model.ts:170`
- **Why weird:** Doc says `Filtering for multiple statuses is not recommended. Instead, opt to filter by a single status multiple times and then combine the results.` This is a behaviour quirk; field name is fine. Flag for documentation polish.
- **Category:** observation
- **Suggested name:** Keep `statuses`; document why multi-filter is discouraged on the type, not just on the field.
- **Rationale:** Surfaces the constraint.

### 24. `QueryTag.key` / `QueryTag.value` — both optional — `src/v1/model.ts:344,345`
- **Why weird:** Both fields are `?: string | undefined`. A tag with no key is meaningless, yet the schema allows it. The TS interface should make `key` required if business logic requires it. This is a generated-code limitation (proto3 marks scalars as optional), but the names are also weak — `key` and `value` are the *most* generic names possible.
- **Category:** 1 (vague)
- **Suggested name:** Acceptable as proto-mirror; ideal would be `name: string; value?: string`.
- **Rationale:** Minor.

### 25. `ExternalQuerySource.legacyDashboardId` — `Legacy` mid-position architectural-leak modifier — `src/v1/model.ts:101`
- **Why weird:** `Legacy` is a temporal/architectural modifier mid-name — it tags the identifier as belonging to the *old* product (pre-Lakeview dashboards). The "legacy" label only has meaning inside Databricks' product roadmap; SDK consumers who don't know that Databricks shipped a new dashboard product see "legacy" as architectural noise. Names like `Legacy`/`Modern`/`Old`/`New` mid-position bake a release-timeline distinction into the public type surface; once a third dashboard product ships, the name becomes a lie.
- **Category:** proto-architectural-leak (`Legacy` mid-position temporal modifier)
- **Suggested name:** `redashDashboardId` (or whatever the underlying product is actually called), or fold into a discriminated union as suggested in #15.
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

3. **Multiple ways to identify one thing.** `endpointId` / `warehouseId`, `sessionId` (Spark Connect or DBSQL or SDP). Each is a "two-fields-one-concept" or "one-field-multiple-concepts" smell.

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
