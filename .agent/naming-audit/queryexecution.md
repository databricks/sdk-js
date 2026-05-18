# Naming Audit: queryexecution

**Path:** `packages/queryexecution/src/v1/`
**Versions audited:** v1
**Inferred domain:** Execute, cancel, and poll SQL queries for *published, embedded
Lakeview dashboards*. All three endpoints hit the same URL
(`/api/2.0/lakeview-query/query/published`) and only differ by HTTP verb (POST = execute,
GET = poll, DELETE = cancel). The package name (`queryexecution`) is much broader than
what it actually does (lakeview-dashboard query lifecycle). Confusing overlap with
sibling packages `statementexecution` (general SQL Statement Execution API),
`queryhistory` (history of executed queries), and `queries` (saved query definitions).
**Total weird names flagged:** 30

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 12 |
| Low | 8 |
| Observation | 4 |

## High severity

### 1. Package name `queryexecution` is far broader than its scope — `package.json`, directory name
- **Why weird:** The package operates exclusively on *published, embedded Lakeview dashboards* (see every JSDoc and the URL `/api/2.0/lakeview-query/query/published`). A user importing `@databricks/sdk-queryexecution` would reasonably expect general "query execution" — i.e. `statementexecution`, which is the SDK's actual general-purpose SQL execution API. The two packages have wildly different scopes but near-identical names.
- **Category:** 1 (vague — `queryexecution` is the generic term), 6 (misleading — implies general query API, is dashboard-scoped), 12 (duplicate concept — overlaps `statementexecution` and `queryhistory`).
- **Suggested name:** `lakeviewquery` or `publisheddashboardquery` or fold into `lakeview`/`dashboards` packages. If staying separate, every type name should be prefixed `PublishedDashboard*` to make scope obvious.
- **Rationale:** The first and most damaging naming problem here is that the package name promises a generic capability and silently delivers a specialised one. Compare: `commandexecution` (executes Python/SQL via REPL) vs. `statementexecution` (executes SQL via SQL Warehouse) vs. `queryexecution` (re-runs *already-saved* queries inside *published* dashboards). A user looking at the three would have to read every method to know which one they want.

### 2. `CancelQueryExecutionResponse` / `CancelQueryExecutionResponseStatus` vs. request `CancelPublishedQueryExecutionRequest` — `src/v1/model.ts:11,18,22`
- **Why weird:** The request type prefixes `Published` (correctly identifying the scope) but the two response types drop the prefix. The package only handles published-dashboard cancels, yet the type names alternate between `*PublishedQueryExecution*` and `*QueryExecution*` for what is fundamentally the same operation. The asymmetric stripping suggests the response types are reused, but they aren't — there is only one cancel endpoint.
- **Category:** 6 (misleading — strips the `Published` qualifier from response types), 12 (duplicate concept — looks like two unrelated cancel APIs), 17 (asymmetric request/response naming).
- **Suggested name:** `CancelPublishedQueryResponse` / `CancelPublishedQueryResponseStatus` (or drop `Published` from both for consistency, since the whole package is scoped to published dashboards).
- **Rationale:** Symmetric request/response pairs are the SDK norm (`CreateCatalogConfigRequest`/`CreateCatalogConfigResponse` etc.). The mismatch here suggests that the response types might be shared, which they aren't, and forces callers to mentally translate between two near-identical names.

### 3. `ExecutePublishedDashboardQueryRequest` vs. `ExecuteQueryResponse` — `src/v1/model.ts:46,58`
- **Why weird:** Asymmetric naming: the request name says "Execute **Published Dashboard** Query", while the response is the generic `ExecuteQueryResponse`. A user reading just the model file would think `ExecuteQueryResponse` is some shared type used by multiple Execute*Request types, but it's only used here.
- **Category:** 6 (misleading — response name doesn't match request), 12 (duplicate concept).
- **Suggested name:** `ExecutePublishedQueryResponse` (matching scope).
- **Rationale:** The asymmetric prefix forces callers to mentally translate between two near-identical names. Symmetric request/response pairs are the SDK norm.

### 4. `PollQueryStatusResponse.data` — `src/v1/model.ts:82`
- **Why weird:** Top-level field named `data` on a response object. `data` is the most generic possible field name (rule 15 in the prompt: "Generic field names losing meaning"). It happens to hold *per-token statuses*, but the name gives a reader zero hint of that.
- **Category:** 1 (vague), 15 (generic field name losing meaning).
- **Suggested name:** `statuses` (plural, matches the array shape) or `tokenStatuses`.
- **Rationale:** `data` should never be the name of the only field on a response. The wire calls it `data`, but a TS SDK can do better.

### 5. `QueryResponseStatus` vs. `CancelQueryExecutionResponseStatus` — `src/v1/model.ts:22,89`
- **Why weird:** Two near-identical types differ only by the verbs they accept (`CancelQueryExecutionResponseStatus` has `success`/`pending`, `QueryResponseStatus` has `success`/`pending`/`canceled`/`closed`). Both wrap discriminated unions over the same vocabulary. They could be unified by making the cancel response use a subset of `QueryResponseStatus`. The fact that the names are *different but parallel* makes the duplication harder to spot.
- **Category:** 12 (duplicate concept — two types modelling the same idea), 17 (inconsistent action-verb prefix — one uses `Cancel*ResponseStatus`, the other uses `*ResponseStatus`).
- **Suggested name:** Collapse into one `QueryResponseStatus`, drop the `Cancel*ResponseStatus` and use the unified type with only the arms that apply.
- **Rationale:** Two types with the same purpose is a maintenance hazard. The names actively conceal the duplication by spelling things differently.

### 6. `Client` class name — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` at the top level of the package's API surface, re-exported as just `Client`. Identical to `dataclassification.md` Finding #11 and a repeated pattern across the SDK. A user importing `Client` from `@databricks/sdk-queryexecution` and another `Client` from `@databricks/sdk-statementexecution` collides on the namespace.
- **Category:** 1 (vague — `Client` is the most generic name possible), 15 (generic name).
- **Suggested name:** `QueryExecutionClient` (or, per #1, `PublishedDashboardQueryClient`).
- **Rationale:** Same as the cross-SDK pattern: every API package has a `Client`, and combined imports require renaming. The collision risk grows with each added package.

## Medium severity

### 7. `PendingStatus` and `SuccessStatus` types — `src/v1/model.ts:60,105`
- **Why weird:** Two types share the `Status` suffix, but only one of them ("Success") carries the `truncated` boolean. Their names suggest they are siblings of an enum (`Pending` vs `Success`), but `Pending` only has `dataToken`, while `Success` has `dataToken` + `truncated`. This means the *only* thing that distinguishes a "success" from a "pending" at the type level is the *presence* of `truncated` — but since `truncated` is `optional`, neither type's instance can be reliably distinguished from the other.
- **Category:** 6 (misleading — types are technically distinguishable but in practice not), 16 (field contradicts type domain — `truncated` is meaningless on `Pending` but exists structurally), 17 (asymmetric).
- **Suggested name:** Keep names but make `truncated` required (non-optional) on `SuccessStatus`, or merge them: `interface QueryToken { dataToken?: string; truncated?: boolean }` with the state encoded by the discriminator only.
- **Rationale:** When two state-variant types differ only by one optional field, they shouldn't be separate types.

### 8. `dataToken` field — `src/v1/model.ts:27,65,110`
- **Why weird:** The field is described inline as "The token to poll for result asynchronously". The name `dataToken` doesn't communicate that — it sounds like a token that wraps data. The JSDoc even admits that `data_token` and `statement_id` (in the parent type) are the *same value* on the wire ("The statement_id should be identical to data_token in SuccessStatus and PendingStatus."). The fact that the wire has two names for the same value (one is the polling cursor, the other is the audit-log identifier) is a wire-protocol decision that leaks into the TS surface.
- **Category:** 1 (vague — `dataToken` could mean anything), 5 (cryptic abbreviation — "data" of what?), 12 (duplicate concept — `dataToken` and `statementId` are the same value), 19 (underspecified ID — see also #9).
- **Suggested name:** `pollToken` or `pollingToken` (matches its purpose). If the duplication with `statementId` is fixed at the wire level, drop entirely.
- **Rationale:** A field whose JSDoc says "this is identical to another field" is screaming for a rename. `pollToken` describes its function; `dataToken` describes its construction.

### 9. `statementId` field — `src/v1/model.ts:102`
- **Why weird:** A field called `statementId` appearing on `QueryResponseStatus`, accompanied by a 4-line JSDoc explaining that it is "created for audit logging purpose to record the statement_id of all QueryResponseStatus". So this is an audit-only field that duplicates `dataToken`. In a typed API, an audit-only field is something the client should *never* set or rely on — but the type doesn't say `readonly` and there's no convention enforcing that.
- **Category:** 6 (misleading — looks like a regular ID, is audit-only), 12 (duplicate concept), 19 (underspecified — what kind of "statement"? Compare to `statementexecution` package's `statementId` which means the SQL Statement Execution API ID).
- **Suggested name:** `auditStatementId` (or remove from the public surface). If kept, document `@readonly`.
- **Rationale:** Audit/log-only fields on a typed response are a footgun. The current name promises usability; the doc explains it isn't.

### 10. `tokens` field — `src/v1/model.ts:13,76`
- **Why weird:** Field called `tokens` with example value `EC0A..ChAB7WCEn_4...`. The JSDoc only shows one example; no plural-form documentation. The wire spec apparently allows multiple tokens (since the field is `string[]`), and the SDK serializes the array via `String(req.tokens)` — which means JS does `tokens.join(',')` (the array's default `toString`). This is fragile: if a token ever contains a comma, the URL becomes corrupt. The name `tokens` doesn't communicate "comma-separated on the wire".
- **Category:** 1 (vague — `tokens` of what?), 5 (cryptic — token value example dominates over a description), 6 (misleading — the array-to-string conversion is implicit).
- **Suggested name:** `pollTokens` (matches the proposal in #8). If the wire really expects comma-separated, document that on the field; otherwise use `URLSearchParams.append` per-token.
- **Rationale:** The name `tokens` is too generic for a top-level request field. The hidden join-on-comma is a bug magnet.

### 11. `dashboardName` field — `src/v1/model.ts:14,51,77`
- **Why weird:** Field is `dashboardName` but appears alongside `dashboardRevisionId`. The pairing `Name` + `Id` is inconsistent — they should be either both names or both IDs. The wire calls the first one `dashboard_name` and the second `dashboard_revision_id`, so the asymmetry is upstream — but a TS SDK could rename for symmetry. The JSDoc says: "Dashboard name and revision_id is required to retrieve PublishedDatasetDataModel". The casual `_id`/`Id` shift is jarring.
- **Category:** 17 (asymmetric pair naming — `Name` vs `Id`).
- **Suggested name:** `dashboardId` + `dashboardRevisionId` (if both are IDs on the wire) or document why one is "name" while the other is "ID".
- **Rationale:** Symmetric pair fields should have symmetric naming. A user looking at the request would assume `Name` is human-readable and `RevisionId` is opaque — but typically both are opaque identifiers in published-dashboard URLs.

### 12. `overrideWarehouseId` field — `src/v1/model.ts:54`
- **Why weird:** Field name is fine in isolation, but unusual that there is no plain `warehouseId` field for context. The JSDoc explains: "A dashboard schedule can override the warehouse used as compute for processing the published dashboard queries". Reading the model in isolation, a user has no way to know that *not* setting `overrideWarehouseId` means the dashboard's *configured* warehouse is used. The name carries baggage that requires reading the JSDoc to decode.
- **Category:** 1 (vague — "override" of what?), 6 (misleading — implies a write to a property, is actually an optional override).
- **Suggested name:** Keep but make sure the JSDoc is exhaustive about the fallback behaviour. Alternatively `warehouseIdOverride` (English noun order — read "the override of warehouseId").
- **Rationale:** Override-fields are common; the only fix is documentation. Flagged for consistency.

### 13. `dashboardRevisionId` field — `src/v1/model.ts:15,52,78`
- **Why weird:** The wire format on the published dashboard URL uses `dashboard_revision_id`. The TS name flatten-converts. But internally this is the "version" of the dashboard, and the broader SDK uses `revision` and `version` inconsistently (e.g., `apps` package uses `currentRevision`, etc.). Verifying SDK-wide vocabulary would be valuable.
- **Category:** 17 (potential inconsistency with sibling SDK packages — flagged for review).
- **Suggested name:** Keep as-is unless a wider SDK convention dictates `version`.
- **Rationale:** Low confidence; flagged to ensure SDK consistency check.

### 14. `executeCall` / `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Same as `dataclassification.md` Finding #15. Two `execute*` functions for two layers (retry/rate-limit shell vs. actual HTTP). The name `executeCall` doesn't say what about the call is being executed.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithPolicies` (outer) + `sendHttpRequest` (inner).
- **Rationale:** Generator-wide pattern, fix once.

### 15. `buildHttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** Same as `dataclassification.md` Finding #16. "Build" implies builder pattern; this is a 16-line object-literal helper used 4× per client method.
- **Category:** 1, 6.
- **Suggested name:** `makeHttpRequest` or inline.
- **Rationale:** Generator-wide.

### 16. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Same as `dataclassification.md` Finding #20. Generic name for a stream-drain helper.
- **Category:** 1, 5.
- **Suggested name:** `drainStream`.

### 17. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Same as `dataclassification.md` Finding #21. Type called `Options` but is an internal context bag.
- **Category:** 1, 8.
- **Suggested name:** `HttpCallContext`.

### 18. `PACKAGE_SEGMENT` — `src/v1/client.ts:36`
- **Why weird:** Same as `dataclassification.md` Finding #22. Generic constant name.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.

## Low severity

### 19. `Client` constructor — `src/v1/client.ts:50-64`
- **Why weird:** The constructor accepts `ClientOptions` but doesn't validate the options beyond `host`. Other fields (`logger`, `credentials`) use `??`-default and never warn about missing values. Naming is fine; behaviour is worth flagging for consistency with other SDK packages.
- **Category:** N/A (behavioural).

### 20. `respBody` vs `resp` locals — `src/v1/client.ts:89,94,121,126,161,166`
- **Why weird:** Same as `dataclassification.md` Finding #26. Stage names are abbreviated and similar.
- **Category:** 5, 17.
- **Suggested name:** `rawBody` + `result`.

### 21. `httpReq` local — `src/v1/client.ts:88,120,160`
- **Why weird:** Same as `dataclassification.md` Finding #27. Two `req`s in scope: `req: CancelPublishedQueryExecutionRequest` and `httpReq: HttpRequest`.
- **Category:** 5, 12.
- **Suggested name:** `httpRequest` (no abbreviation).

### 22. `cancelPublishedQueryExecution` method — `src/v1/client.ts:67`
- **Why weird:** The method is verbose (29 characters) and contains the package name `queryExecution` already. Once `Client` is renamed `QueryExecutionClient`, the package context becomes explicit and the method name should shrink to `cancelPublished` or `cancelPublishedQuery`. The current form reads as `QueryExecutionClient.cancelPublishedQueryExecution(...)` — "queryExecution" twice.
- **Category:** 7 (overly verbose), 12 (duplicate concept — `QueryExecution` in both class and method).
- **Suggested name:** `cancelPublishedQuery` (or `cancel` if the package is renamed per #1).

### 23. `executePublishedDashboardQuery` method — `src/v1/client.ts:107`
- **Why weird:** Same redundancy as #22 — `executePublishedDashboardQuery` repeats the package's domain. After renaming class to `PublishedDashboardQueryClient`, the method should just be `execute`.
- **Category:** 7 (overly verbose).
- **Suggested name:** `execute` (in renamed client) or `executePublishedQuery`.

### 24. `pollPublishedQueryStatus` method — `src/v1/client.ts:139`
- **Why weird:** Inconsistency: `cancelPublishedQueryExecution` uses `QueryExecution` while `pollPublishedQueryStatus` uses `QueryStatus`. So the cancel-side mirrors the *operation* word, the poll-side mirrors the *response* word. The three method names all sound like sibling operations but use three different stems:
  - `cancelPublishedQueryExecution`
  - `executePublishedDashboardQuery`
  - `pollPublishedQueryStatus`
- **Category:** 17 (inconsistent action-verb stem — three different patterns for three sibling methods).
- **Suggested name:** Make the stem identical: `cancelPublishedQuery` / `executePublishedQuery` / `pollPublishedQueryStatus` (or remove the `Status` suffix to match: `pollPublishedQuery`).

### 25. `truncated` field on `SuccessStatus` — `src/v1/model.ts:112`
- **Why weird:** Field called `truncated`. The JSDoc says "Whether the query result is truncated (either by byte limit or row limit)". The naming is OK in context, but the field stands alone on `SuccessStatus` and tells the user nothing about *what* limit was hit. Compare: `statementexecution` package uses the same name (`truncated`) with the same vagueness — so the inconsistency is cross-package, not local.
- **Category:** 1 (vague — truncated by what?), 12 (cross-package duplicate of `statementexecution`'s `truncated`).
- **Suggested name:** Document on the type, or split into `truncatedByByteLimit?: boolean` / `truncatedByRowLimit?: boolean`.

### 26. Lowercase `c` in JSDoc comment opening — `src/v1/model.ts:6,42,68`
- **Why weird:** The JSDoc starts with lowercase: "cancel query request for published Dashboards" (line 6), "Execute query request for published Dashboards" (line 42 — that one starts uppercase, inconsistent), "poll query request..." (line 68). Inconsistent comment style and lowercase sentence openings. Project convention is "Comments should always be proper sentences ending with a period" — these violate it.
- **Category:** N/A (style, not naming) — flagged because the prompt requested "EVERY type, field, ... and method"; the JSDoc affects the type's apparent name.
- **Suggested name:** N/A (fix prose, not name).

## Observations

### 27. Cross-package vocabulary drift — `statementexecution` / `queryhistory` / `queries` overlap
- **Description:** Five overlapping concepts span four packages:
  - **`statementexecution.StatementStatus_State`** = `PENDING | RUNNING | SUCCEEDED | FAILED | CANCELED | CLOSED` (6 states)
  - **`queryexecution.QueryResponseStatus`** = `success | pending | canceled | closed` (4 arms — no `running` or `failed`)
  - **`queryhistory.QueryStatus`** = `QUEUED | STARTED | COMPILING | COMPILED | RUNNING | CANCELED | ...` (many more)
  - **`statementexecution.statementId`** = SQL Statement Execution API ID
  - **`queryexecution.statementId`** = "audit logging" field that duplicates `dataToken`
  - **`queryhistory.QueryFilter.statement_ids`** = filter by statement IDs

  Three packages each have a `Status`/`State` enum, none of them compatible, all describing roughly the same SQL execution lifecycle.
- **Category:** 12 (duplicate concepts across packages), 17 (inconsistent vocabulary).
- **Recommendation:** Document the relationship in a shared glossary. Long-term, unify the status types or at least the state names.

### 28. Vocabulary collision: `query` vs. `statement` vs. `execution`
- **Description:** The SDK uses three near-synonymous nouns:
  - **`query`** — appears in `queryexecution`, `queryhistory`, `queries`. Generally means a SQL query (often a saved one).
  - **`statement`** — appears in `statementexecution` and as `statementId` in `queryexecution`. Means a SQL statement (the SQL Execution API's unit of work).
  - **`execution`** — appended to both above (`queryexecution`, `statementexecution`).
  And the wire layer adds a fourth: `lakeview-query` (the URL in this package).
- **Category:** 12 (duplicate concepts), 14 (vocabulary inconsistency).
- **Recommendation:** Pick a vocabulary and use it consistently. SQL Statement Execution API uses "statement"; published dashboard queries use "query". Document the distinction in the SDK README.

### 29. JSDoc grammar errors / wire-layer leakage
- **Description:** Multiple JSDocs reference internal wire terminology not relevant to a TS user:
  - "rpc calls to sql-exec-api" (lines 10, 73 — internal service name)
  - "PublishedDatasetDataModel" (line 48 — Java class name)
  - "lakeview-config" (line 45 — internal service)
  - "google.protobuf.Empty" (line 36 — proto definition leak)
- **Category:** N/A (documentation leakage).
- **Recommendation:** Generator should strip wire-layer references from public JSDoc.

### 30. Comment style violations
- **Description:** Per the project rule "Comments should always be proper sentences ending with a period", many JSDocs in this file start lowercase ("cancel query request..."), are sentence fragments ("Example: EC0A..."), or omit terminal periods. Generator-wide.
- **Category:** N/A (style).

## Domain glossary
- **Lakeview** — Databricks' notebook-style published dashboards product.
- **Published dashboard** — A dashboard configured to run "as the publisher" (publisher's identity, publisher's warehouse) rather than the viewer's. This is the entire reason this package exists.
- **Embedded dashboard** — A dashboard rendered outside the Databricks UI (e.g., in a customer's site). Triggers the "publisher mode".
- **`sql-exec-api`** — Internal service that runs the SQL; referenced in JSDoc but not in TS names.
- **`lakeview-config`** — Internal service that stores the dashboard configuration (warehouse, datasets, embedded credentials); referenced in JSDoc.
- **`dataToken`** / **`statementId`** — Same value on the wire, two field names: `dataToken` is for polling, `statementId` is for audit-logging.
- **`PublishedDatasetDataModel`** — Internal Java class referenced in JSDoc; holds the published-dashboard datasets, warehouse_id, and embedded_credentials.

## File coverage
- `src/v1/model.ts` (220 lines): read fully.
- `src/v1/client.ts` (175 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (21 lines): read fully.
