# Naming Audit: queryhistory

**Path:** `packages/queryhistory/src/v1/`
**Versions audited:** v1
**Inferred domain:** Read-only query history API for Databricks SQL warehouses and serverless compute. Surfaces a single endpoint that lists historical queries with filter/pagination and returns per-query status, timing, identity, source, and execution metrics.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 8 |
| Low | 5 |
| Observation | 1 |

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

### 8. `QueryInfo.warehouseId` and `endpointId` co-existing — `src/v1/model.ts:205,232`
- **Why weird:** Cross-reference of #2: these two fields both exist on `QueryInfo`. The audit calls out the *duplication*; the names *individually* are also weak — `warehouseId` is fine; `endpointId` is misleading (the wire form keeps it for back-compat with the old SQL Endpoint API).
- **Category:** 19, 16 (underspecified ID; field contradicting type domain)
- **Suggested name:** See #2.

### 9. `QueryInfo.sessionId` — overloaded identifier — `src/v1/model.ts:222`
- **Why weird:** Doc reads `The spark session UUID that query ran on. This is either the Spark Connect, DBSQL, or SDP session ID.` Three distinct session-ID namespaces collapsed into one field with no discriminator. Caller cannot tell, from the field alone, which session type the ID refers to.
- **Category:** 15, 19 (generic field; underspecified ID)
- **Suggested name:** Keep `sessionId` but add a sibling `sessionType?: 'SPARK_CONNECT' | 'DBSQL' | 'SDP'` or split into three optional fields.
- **Rationale:** A naked UUID with three possible namespaces is a debugging hazard.

### 10. `QueryInfo.metrics: QueryMetrics` vs `QueryInfo.duration: number` — `src/v1/model.ts:213,237`
- **Why weird:** A `metrics` sub-object exists, and *also* a top-level `duration` field on `QueryInfo`. Inside `QueryMetrics` there is `totalTimeMs` (`Total execution time of the query from the client's point of view, in milliseconds.`). What's the difference between `QueryInfo.duration` and `QueryInfo.metrics.totalTimeMs`? The doc on `duration` says `Total time of the statement execution. This value does not include the time taken to retrieve the results...` — so `duration` excludes result fetch, while `totalTimeMs` doesn't. Two near-synonym fields, in two places.
- **Category:** 12, 1 (duplicate concepts; vague)
- **Suggested name:** Move `duration` into `QueryMetrics` as `executionTimeExcludingFetchMs` (or use the existing `executionTimeMs`), and remove the top-level `duration`.
- **Rationale:** Two times on one type, both unitless in the name (`duration` doesn't say ms), invites confusion.

## Low severity

### 11. `ExternalQuerySource.alertId` and `sqlQueryId` and `genieSpaceId` — — `src/v1/model.ts:103,107,110`
- **Why weird:** Several optional IDs co-exist on `ExternalQuerySource` with no rule about which is set when. Discriminated-union opportunity not taken. Field names are individually fine; together they encode "exactly one of N" weakly.
- **Category:** 19 (underspecified)
- **Suggested name:** As above — convert to discriminated union.
- **Rationale:** TS can encode this; Go cannot. Lost in 1:1 port.

### 12. `QueryMetrics.rowsProducedCount` vs `QueryInfo.rowsProduced` — — `src/v1/model.ts:265,207`
- **Why weird:** `QueryInfo.rowsProduced` (no `Count` suffix) and `QueryMetrics.rowsProducedCount` (with `Count` suffix). Same concept, two field names. The `QueryInfo` doc says "The number of results returned by the query"; the `QueryMetrics` doc says "Total number of rows returned by the query." Are these always equal? Probably. Different names = different fields.
- **Category:** 12, 9 (duplicate concepts; plural/singular mismatch)
- **Suggested name:** Drop one. Keep `QueryMetrics.rowsProducedCount` if metrics is the right home; or rename one to match the other.
- **Rationale:** Same value reachable through two paths is a maintenance hazard.

### 13. `TaskTimeOverRange.entries` / `TaskTimeOverRangeEntry` — — `src/v1/model.ts:349,358`
- **Why weird:** `TaskTimeOverRange` and `TaskTimeOverRangeEntry` are paired (collection + element). Element type appends `Entry` — that's a known convention from `WindowsAzure`-style SDKs (`*Item`, `*Entry`). Could be `TaskTimeBucket` (parent) and `TaskTimeBucketPoint` (child) — domain-specific names. Acceptable as-is.
- **Category:** 1 (vague — `Entry`)
- **Suggested name:** Optional rename to domain names.
- **Rationale:** Marginal.

### 14. `QueryTag.key` / `QueryTag.value` — both optional — `src/v1/model.ts:344,345`
- **Why weird:** Both fields are `?: string | undefined`. A tag with no key is meaningless, yet the schema allows it. The TS interface should make `key` required if business logic requires it. This is a generated-code limitation (proto3 marks scalars as optional), but the names are also weak — `key` and `value` are the *most* generic names possible.
- **Category:** 1 (vague)
- **Suggested name:** Acceptable as proto-mirror; ideal would be `name: string; value?: string`.
- **Rationale:** Minor.

### 15. `ExternalQuerySource.legacyDashboardId` — `Legacy` mid-position architectural-leak modifier — `src/v1/model.ts:101`
- **Why weird:** `Legacy` is a temporal/architectural modifier mid-name — it tags the identifier as belonging to the *old* product (pre-Lakeview dashboards). The "legacy" label only has meaning inside Databricks' product roadmap; SDK consumers who don't know that Databricks shipped a new dashboard product see "legacy" as architectural noise. Names like `Legacy`/`Modern`/`Old`/`New` mid-position bake a release-timeline distinction into the public type surface; once a third dashboard product ships, the name becomes a lie.
- **Category:** proto-architectural-leak (`Legacy` mid-position temporal modifier)
- **Suggested name:** `redashDashboardId` (or whatever the underlying product is actually called), or fold into a discriminated union as suggested in #11.
- **Rationale:** Replace the temporal modifier with the actual product name. The Go SDK keeps `legacy_dashboard_id` because of wire-format back-compat; the TS surface can rename without breaking the wire transform.

## Observations

### O1. `Client` is the only exported class — `src/v1/client.ts:32`
- The class is just `Client`. Consistent across the SDK (so a project-level concern), but worth noting that `import { Client } from '@databricks/sdk-queryhistory/v1'` produces a bare name that collides with every other package's `Client`. Consumers must rename on import.

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
