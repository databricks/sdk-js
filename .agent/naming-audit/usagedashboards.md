# Naming Audit: usagedashboards

**Path:** `packages/usagedashboards/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for the Databricks "Billing Usage" dashboard — a workspace-scoped or globally-scoped DBSQL dashboard pre-built by Databricks that visualises account billing/usage data. Two endpoints only: `POST /api/2.0/accounts/{account_id}/dashboard` (create) and `GET /api/2.0/accounts/{account_id}/dashboard` (read). Both return a `dashboardId` (and the read variant also returns a `dashboardUrl`). No update, no delete, no list operation. Two enums (`UsageDashboardMajorVersion`, `UsageDashboardType`).
**Total weird names flagged:** 7

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |
| Observation | 1 |

## High severity

### 1. Package name `usagedashboards` is plural but the API is singular — `packages/usagedashboards/`
- **Why weird:** The package is named with a plural noun (`usagedashboards`), but the API surface manages **one** dashboard per (workspace, account, type) tuple — there is no list endpoint, no collection semantics, no `dashboardId`-scoped path (URL is `/dashboard`, singular). The Go SDK source path `databricks/api/usage_dashboards/v1` is plural; the REST endpoint is singular. The TypeScript package mirrors the Go *path* rather than the API's *cardinality*.
- **Category:** 9 (singular/plural mismatch), 14 (Go/proto-style — name follows the Go package path rather than English usage).
- **Suggested name:** `usagedashboard` (singular) — or, better, fold into a `billing` package alongside `billableusagedownload` (which has the same parent `/api/2.0/accounts/{account_id}` namespace).
- **Rationale:** A user discovering the SDK would expect a "list" operation from a plural package name and be surprised by the lack of one. The singular form also matches the REST path `/dashboard`. The fold-into-`billing` move is a generator-level concern but worth flagging: both `usagedashboards` and `billableusagedownload` are about account-level billing data and live under the same URL prefix.

### 2. `dashboardType` field on `Create*` is misleadingly optional and arrives in the URL query string — `src/v1/model.ts:23, 39` / `src/v1/client.ts:106-107`
- **Why weird:** The field is typed `UsageDashboardType | undefined` (optional) but the JSDoc says "Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account." There is no documented default — what happens if you omit `dashboardType` on create? The API presumably 4xx's or picks a side. Also note `dashboardType` is sent as a query-string parameter on the GET (`client.ts:106-107`) but the request shape is otherwise body-shaped — inconsistent transport for fields on the same DTO.
- **Category:** 6 (misleading — TS type says optional, API likely requires it), 16 (field type contradicts domain reality), 17 (inconsistent transport: same field is body on POST, query on GET).
- **Suggested name:** Keep the name but type as `UsageDashboardType` (required). Or split the DTO into `CreateBillingUsageDashboardRequest` (body) and `GetBillingUsageDashboardRequest` (query params), since the GET endpoint conceptually has different parameter semantics from the POST.
- **Rationale:** `dashboardType` is the field that distinguishes Workspace from Global dashboards — it is *the* selector for the resource. Treating it as optional with no default is type-level dishonesty.

### 3. `accountId` is in the request body shape but is actually a URL path parameter — `src/v1/model.ts:21` / `src/v1/client.ts:69, 101`
- **Why weird:** `accountId` lives on `CreateBillingUsageDashboardRequest` (looks like a body field) but the client extracts it for the URL path (`/api/2.0/accounts/${req.accountId}/dashboard`) — it is *not* sent in the JSON body. The marshalled body does emit `account_id` though, so it goes out twice (once in the URL, once in the body). Server may ignore the body copy. The field type and location are misleading about its wire role. Also duplicated against `ClientOptions.accountId` with a silent empty-string fallback at `client.ts:69, 101` — `${req.accountId ?? this.accountId ?? ''}` produces `/api/2.0/accounts//dashboard` if both are absent.
- **Category:** 6 (misleading — body shape implies body field, but it's a path param), 12 (duplicate concept — also lives on `ClientOptions`), 16 (field's structural location contradicts wire role), 19 (underspecified — what happens if URL and body disagree? what happens if both sources are missing?).
- **Suggested name:** Remove `accountId` from the request DTOs entirely. Make it a client-level concern only; throw a clear error if it is missing. Or segregate path params into a separate type and document the dual role.
- **Rationale:** Same as `billableusagedownload` finding. The current shape misleads callers about the wire format, the duplicated-with-fallback pattern is a footgun, and the silent empty-string fallback compounds it. Removing the request-level field is the cleanest fix.

## Medium severity

### 4. `createBillingUsageDashboard` / `getBillingUsageDashboard` method names duplicate the type name — `src/v1/client.ts:65, 97`
- **Why weird:** Method name and request-type name are textually identical (modulo case and the new `Request` suffix): `createBillingUsageDashboard(req: CreateBillingUsageDashboardRequest)`. The repetition is so close that the type name reads like a misnamed method import. Compare with `lakeview` where `Client.createDashboard(req: CreateDashboardRequest)` keeps the type-noun separate from the method-verb.
- **Category:** 7 (overly verbose), 8 (redundant — method verb is already implicit in the type's verb prefix).
- **Suggested name:** `createDashboard` / `getDashboard` (drop `BillingUsage` since the package name disambiguates) or `create` / `get` (since there are only two methods). Type stays as `CreateBillingUsageDashboardRequest`.
- **Rationale:** A method on `usageDashboardsClient` is already in the usage-dashboards namespace; restating `BillingUsageDashboard` in the method name is pure stutter. The Go SDK does this because Go has package-flat method tables; TS classes provide their own namespace.

### 5. `dashboardId` returned but never used to re-fetch — `src/v1/model.ts:30, 44`
- **Why weird:** Both response types include `dashboardId?: string` (always optional). But there is no `GetByDashboardId` method, and the request types use `(workspaceId, accountId, dashboardType)` to identify the dashboard, not the `dashboardId`. So `dashboardId` is a returned-but-never-accepted identifier — informational only. The field is also typed optional, but a successful 2xx response should always have an ID; the `?` is again type-level dishonesty.
- **Category:** 6 (misleading optionality), 19 (underspecified id — present in responses but not accepted as a request key).
- **Suggested name:** Keep the name; make it required (`dashboardId: string`). Or document that it is a read-only side-channel identifier (not a primary key from the API's POV). Or expose a `getByDashboardId` method that round-trips the value.
- **Rationale:** If the API returns an ID, the SDK should either let you use it or document why you can't. The current state — return-only, never-accepted — is API-design noise that the SDK faithfully echoes.

### 6. `dashboardUrl` is optional on a success response — `src/v1/model.ts:46`
- **Why weird:** `dashboardUrl?: string | undefined` is optional on a success response (same dishonesty as #5). A successful 2xx read should always carry the dashboard URL, so the `?` overstates the genuine variability of the field.
- **Category:** 6 (misleading optionality).
- **Suggested name:** Keep the field name; make it non-optional on a 2xx response.
- **Rationale:** If a successful read always returns a URL, the SDK should type it as required rather than forcing every caller to guard against an absence that never occurs.

## Observations

### 7. The package has no list/page operations
There is no `ListBillingUsageDashboards`, no `Iterator`, no `nextPageToken`. The package is one-create-one-get only — a very thin API. Audit-rule categories 9 (singular/plural is settled — should be singular, see #1) and 13 (verb tense — no verb tense issues since there is no "Started"/"Starting" parallel) mostly don't apply. The Go SDK source likely has the same shape.
