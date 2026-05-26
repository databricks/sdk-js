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
