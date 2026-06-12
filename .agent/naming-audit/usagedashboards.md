# Naming Audit: usagedashboards

**Path:** `packages/usagedashboards/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for the Databricks "Billing Usage" dashboard — a workspace-scoped or globally-scoped DBSQL dashboard pre-built by Databricks that visualises account billing/usage data. Two endpoints only: `POST /api/2.0/accounts/{account_id}/dashboard` (create) and `GET /api/2.0/accounts/{account_id}/dashboard` (read). Both return a `dashboardId` (and the read variant also returns a `dashboardUrl`). No update, no delete, no list operation. Two enums (`UsageDashboardMajorVersion`, `UsageDashboardType`).
**Total weird names flagged:** 6

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |

## High severity

### 1. Package name `usagedashboards` is plural but the API is singular — `packages/usagedashboards/`
- **Why weird:** The package is named with a plural noun (`usagedashboards`), but the API surface manages **one** dashboard per (workspace, account, type) tuple — there is no list endpoint, no collection semantics, no `dashboardId`-scoped path (URL is `/dashboard`, singular). The Go SDK source path `databricks/api/usage_dashboards/v1` is plural; the REST endpoint is singular. The TypeScript package mirrors the Go *path* rather than the API's *cardinality*.
- **Category:** 9 (singular/plural mismatch), 14 (Go/proto-style — name follows the Go package path rather than English usage).
- **Suggested name:** `usagedashboard` (singular) — or, better, fold into a `billing` package alongside `billableusagedownload` (which has the same parent `/api/2.0/accounts/{account_id}` namespace).
- **Rationale:** A user discovering the SDK would expect a "list" operation from a plural package name and be surprised by the lack of one. The singular form also matches the REST path `/dashboard`. The fold-into-`billing` move is a generator-level concern but worth flagging: both `usagedashboards` and `billableusagedownload` are about account-level billing data and live under the same URL prefix.

### 2. `dashboardType` is misleadingly optional on both request DTOs — `src/v1/model.ts:32, 48`
- **Why weird:** The field is typed `UsageDashboardType | undefined` (optional) on both `CreateBillingUsageDashboardRequest` and `GetBillingUsageDashboardRequest`, but the JSDoc says "Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account." There is no documented default — what happens if you omit `dashboardType`? The API presumably 4xx's or picks a side. It is the field that distinguishes Workspace from Global dashboards, so it reads as a required selector typed as optional.
- **Category:** 6 (misleading — TS type says optional, API likely requires it).
- **Suggested name:** Keep the name but type as `UsageDashboardType` (required) on both DTOs.
- **Rationale:** `dashboardType` is the field that distinguishes Workspace from Global dashboards — it is *the* selector for the resource. Treating it as optional with no default is type-level dishonesty.

### 3. `accountId` is in the request body shape but is actually a URL path parameter — `src/v1/model.ts:30, 46` / `src/v1/client.ts:70, 103`
- **Why weird:** `accountId` lives on `CreateBillingUsageDashboardRequest` and `GetBillingUsageDashboardRequest` (looks like a body field) but the client extracts it for the URL path (`/api/2.0/accounts/${req.accountId}/dashboard`) — it is *not* sent in the JSON body. The marshalled body does emit `account_id` though, so it goes out twice (once in the URL, once in the body). Server may ignore the body copy. The field type and location are misleading about its wire role. Also duplicated against `ClientOptions.accountId` with a silent empty-string fallback at `client.ts:70, 103` — `${req.accountId ?? accountId ?? ''}` produces `/api/2.0/accounts//dashboard` if both are absent.
- **Category:** 6 (misleading — body shape implies body field, but it's a path param), 12 (duplicate concept — also lives on `ClientOptions`), 16 (field's structural location contradicts wire role), 19 (underspecified — what happens if URL and body disagree? what happens if both sources are missing?).
- **Suggested name:** Remove `accountId` from the request DTOs entirely. Make it a client-level concern only; throw a clear error if it is missing. Or segregate path params into a separate type and document the dual role.
- **Rationale:** Same as `billableusagedownload` finding. The current shape misleads callers about the wire format, the duplicated-with-fallback pattern is a footgun, and the silent empty-string fallback compounds it. Removing the request-level field is the cleanest fix.

## Medium severity

### 4. `createBillingUsageDashboard` / `getBillingUsageDashboard` method names duplicate the type name — `src/v1/client.ts:65, 98`
- **Why weird:** Method name and request-type name are textually identical (modulo case and the new `Request` suffix): `createBillingUsageDashboard(req: CreateBillingUsageDashboardRequest)`. The repetition is so close that the type name reads like a misnamed method import. Compare with `lakeview` where `Client.createDashboard(req: CreateDashboardRequest)` keeps the type-noun separate from the method-verb.
- **Category:** 7 (overly verbose), 8 (redundant — method verb is already implicit in the type's verb prefix).
- **Suggested name:** `createDashboard` / `getDashboard` (drop `BillingUsage` since the package name disambiguates) or `create` / `get` (since there are only two methods). Type stays as `CreateBillingUsageDashboardRequest`.
- **Rationale:** A method on `usageDashboardsClient` is already in the usage-dashboards namespace; restating `BillingUsageDashboard` in the method name is pure stutter. The Go SDK does this because Go has package-flat method tables; TS classes provide their own namespace.

### 5. `dashboardId` returned but never used to re-fetch — `src/v1/model.ts:39, 53`
- **Why weird:** Both response types include `dashboardId?: string` (always optional). But there is no `GetByDashboardId` method, and the request types use `(workspaceId, accountId, dashboardType)` to identify the dashboard, not the `dashboardId`. So `dashboardId` is a returned-but-never-accepted identifier — informational only. The field is also typed optional, but a successful 2xx response should always have an ID; the `?` is again type-level dishonesty.
- **Category:** 6 (misleading optionality), 19 (underspecified id — present in responses but not accepted as a request key).
- **Suggested name:** Keep the name; make it required (`dashboardId: string`). Or document that it is a read-only side-channel identifier (not a primary key from the API's POV). Or expose a `getByDashboardId` method that round-trips the value.
- **Rationale:** If the API returns an ID, the SDK should either let you use it or document why you can't. The current state — return-only, never-accepted — is API-design noise that the SDK faithfully echoes.

### 6. `dashboardUrl` is optional on a success response — `src/v1/model.ts:55`
- **Why weird:** `dashboardUrl?: string | undefined` is optional on a success response (same dishonesty as #5). A successful 2xx read should always carry the dashboard URL, so the `?` overstates the genuine variability of the field.
- **Category:** 6 (misleading optionality).
- **Suggested name:** Keep the field name; make it non-optional on a 2xx response.
- **Rationale:** If a successful read always returns a URL, the SDK should type it as required rather than forcing every caller to guard against an absence that never occurs.
