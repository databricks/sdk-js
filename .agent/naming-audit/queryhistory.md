# Naming Audit: queryhistory

**Path:** `packages/queryhistory/src/v1/`
**Versions audited:** v1
**Inferred domain:** Read-only query history API for Databricks SQL warehouses and serverless compute. Surfaces a single endpoint that lists historical queries with filter/pagination and returns per-query status, timing, identity, source, and execution metrics.
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 1 |
| Low | 2 |

## High severity

### 1. `QueryInfo` — "Info" suffix on a top-level domain entity — `src/v1/model.ts:176`
- **Why weird:** The most central type in the package — the value returned from `listQueries` — is named `QueryInfo`. "Info" is a category-1 vague suffix; almost every field on it is a first-class property of a *query* (`queryId`, `queryText`, `status`, `userId`, `queryStartTimeMs`, ...). The type *is* the query — there is no other `Query` type for `QueryInfo` to disambiguate from. Compare with Go SDK convention where `*Info` types are common, but in TS the suffix is non-idiomatic; e.g. `alerts.Alert`, `jobs.Job`, `clusters.ClusterInfo` (this last one is the exception, also flagged in another audit). The endpoint URL is `/api/2.0/sql/history/queries` — the resource is "queries", so the response item should be `Query`.
- **Category:** 8, 14, 1 (redundant `Info` suffix; Go/Java-style; vague suffix)
- **Suggested name:** `Query`.
- **Rationale:** A list of queries should be `Query[]`, not `QueryInfo[]`. The field is even called `res?: QueryInfo[]` — `res?: Query[]` reads better. The Go SDK uses `QueryInfo` because Go does not have a `Query` type collision in this package; TS does not have that constraint and should pick the cleaner name.

## Medium severity

### 2. `PlansState` — vague type name — `src/v1/model.ts:14`
- **Why weird:** "Plans state" — state of what? The JSDoc clarifies: "Possible Reasons for which we have not saved plans in the database." So the enum is really an "outcome" or "save status" — not a runtime state of a plan. The values include `EXISTS`, `EMPTY`, `IGNORED_*`, `UNKNOWN` — these are storage outcomes, not lifecycle states. Calling them a "state" is misleading.
- **Category:** 1, 6 (vague; misleading)
- **Suggested name:** `PlanStorageStatus` or `QueryPlansAvailability`.
- **Rationale:** Reflects what the value actually represents. Also fixes the singular/plural smell: `PlansState` (plural noun + singular state) reads oddly; `PlanStorageStatus` is uniformly singular.

## Low severity

### 3. `TaskTimeOverRange.entries` / `TaskTimeOverRangeEntry` — — `src/v1/model.ts:348,357`
- **Why weird:** `TaskTimeOverRange` and `TaskTimeOverRangeEntry` are paired (collection + element). Element type appends `Entry` — that's a known convention from `WindowsAzure`-style SDKs (`*Item`, `*Entry`). Could be `TaskTimeBucket` (parent) and `TaskTimeBucketPoint` (child) — domain-specific names. Acceptable as-is.
- **Category:** 1 (vague — `Entry`)
- **Suggested name:** Optional rename to domain names.
- **Rationale:** Marginal.

### 4. `QueryTag.key` — required field marked optional — `src/v1/model.ts:343`
- **Why weird:** Both `key` and `value` are `?: string | undefined`. A tag with no key is meaningless, yet the schema allows it. The TS interface should make `key` required if business logic requires it. This is a generated-code limitation (proto3 marks scalars as optional).
- **Category:** optionality (required field marked optional)
- **Suggested name:** Tighten `key` to `key: string` (non-optional).
- **Rationale:** Minor.
