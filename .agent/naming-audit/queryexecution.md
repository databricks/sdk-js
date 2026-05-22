# Naming Audit: queryexecution

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/queryexecution/src/v1/`
**Versions audited:** v1
**Inferred domain:** Execute, cancel, and poll SQL queries for *published, embedded
Lakeview dashboards*. All three endpoints hit the same URL
(`/api/2.0/lakeview-query/query/published`) and only differ by HTTP verb (POST = execute,
GET = poll, DELETE = cancel). The package name (`queryexecution`) is much broader than
what it actually does (lakeview-dashboard query lifecycle). Confusing overlap with
sibling packages `statementexecution` (general SQL Statement Execution API),
`queryhistory` (history of executed queries), and `queries` (saved query definitions).
**Total weird names flagged:** 0

## Summary
| Severity | Count |
| --- | --- |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| Observation | 0 |

## High severity

_None._

## Medium severity

_None._

## Low severity

_None._

## Observations

_None._

## Domain glossary
- **Lakeview** — Databricks' notebook-style published dashboards product.
- **Published dashboard** — A dashboard configured to run "as the publisher" (publisher's identity, publisher's warehouse) rather than the viewer's. This is the entire reason this package exists.
- **Embedded dashboard** — A dashboard rendered outside the Databricks UI (e.g., in a customer's site). Triggers the "publisher mode".
- **`sql-exec-api`** — Internal service that runs the SQL; referenced in JSDoc but not in TS names.
- **`lakeview-config`** — Internal service that stores the dashboard configuration (warehouse, datasets, embedded credentials); referenced in JSDoc.
- **`dataToken`** / **`statementId`** — Same value on the wire, two field names: `dataToken` is for polling, `statementId` is for audit-logging.
- **`PublishedDatasetDataModel`** — Internal Java class referenced in JSDoc; holds the published-dashboard datasets, warehouse_id, and embedded_credentials.

## File coverage
- Package removed from the repository — no source files to audit.

## Fixed
- #1 Package name `queryexecution` (originally cited at `package.json`, directory name): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #2 `CancelQueryExecutionResponse` / `CancelQueryExecutionResponseStatus` (originally cited at `src/v1/model.ts:11,18,22`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #3 `ExecutePublishedDashboardQueryRequest` vs. `ExecuteQueryResponse` (originally cited at `src/v1/model.ts:46,58`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #4 `PollQueryStatusResponse.data` (originally cited at `src/v1/model.ts:82`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #5 `QueryResponseStatus` vs. `CancelQueryExecutionResponseStatus` (originally cited at `src/v1/model.ts:22,89`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #6 `Client` class name (originally cited at `src/v1/client.ts:41`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #7 `PendingStatus` and `SuccessStatus` types (originally cited at `src/v1/model.ts:60,105`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #8 `dataToken` field (originally cited at `src/v1/model.ts:27,65,110`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #9 `statementId` field (originally cited at `src/v1/model.ts:102`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #10 `tokens` field (originally cited at `src/v1/model.ts:13,76`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #11 `dashboardName` field (originally cited at `src/v1/model.ts:14,51,77`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #12 `overrideWarehouseId` field (originally cited at `src/v1/model.ts:54`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #13 `dashboardRevisionId` field (originally cited at `src/v1/model.ts:15,52,78`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #14 `executeCall` / `executeHttpCall` (originally cited at `src/v1/utils.ts:26,65`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #15 `buildHttpRequest` (originally cited at `src/v1/utils.ts:96`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #16 `readAll` (originally cited at `src/v1/utils.ts:40`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #17 `HttpCallOptions` (originally cited at `src/v1/utils.ts:15`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #18 `PACKAGE_SEGMENT` (originally cited at `src/v1/client.ts:36`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #19 `Client` constructor (originally cited at `src/v1/client.ts:50-64`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #20 `respBody` vs `resp` locals (originally cited at `src/v1/client.ts:89,94,121,126,161,166`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #21 `httpReq` local (originally cited at `src/v1/client.ts:88,120,160`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #22 `cancelPublishedQueryExecution` method (originally cited at `src/v1/client.ts:67`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #23 `executePublishedDashboardQuery` method (originally cited at `src/v1/client.ts:107`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #24 `pollPublishedQueryStatus` method (originally cited at `src/v1/client.ts:139`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #25 `truncated` field on `SuccessStatus` (originally cited at `src/v1/model.ts:112`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #26 Lowercase `c` in JSDoc comment opening (originally cited at `src/v1/model.ts:6,42,68`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #27 Cross-package vocabulary drift (originally cited at `statementexecution` / `queryhistory` / `queries` overlap): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #28 Vocabulary collision: `query` vs. `statement` vs. `execution` (originally cited at package-level observation): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #29 JSDoc grammar errors / wire-layer leakage (originally cited at `src/v1/model.ts:10,36,45,48,73`): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.
- #30 Comment style violations (originally cited at package-level observation): Fixed in regeneration on 2026-05-20 — package removed entirely from the repository.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
