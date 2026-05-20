# Naming Audit: usagedashboards

**Path:** `packages/usagedashboards/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for the Databricks "Billing Usage" dashboard — a workspace-scoped or globally-scoped DBSQL dashboard pre-built by Databricks that visualises account billing/usage data. Two endpoints only: `POST /api/2.0/accounts/{account_id}/dashboard` (create) and `GET /api/2.0/accounts/{account_id}/dashboard` (read). Both return a `dashboardId` (and the read variant also returns a `dashboardUrl`). No update, no delete, no list operation. Two enums (`UsageDashboardMajorVersion`, `UsageDashboardType`).
**Total weird names flagged:** 21

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 6 |
| Low | 5 |
| Observation | 4 |

## High severity

### 1. Package name `usagedashboards` is plural but the API is singular — `packages/usagedashboards/`
- **Why weird:** The package is named with a plural noun (`usagedashboards`), but the API surface manages **one** dashboard per (workspace, account, type) tuple — there is no list endpoint, no collection semantics, no `dashboardId`-scoped path (URL is `/dashboard`, singular). The Go SDK source path `databricks/api/usage_dashboards/v1` is plural; the REST endpoint is singular. The TypeScript package mirrors the Go *path* rather than the API's *cardinality*.
- **Category:** 9 (singular/plural mismatch), 14 (Go/proto-style — name follows the Go package path rather than English usage).
- **Suggested name:** `usagedashboard` (singular) — or, better, fold into a `billing` package alongside `billableusagedownload` (which has the same parent `/api/2.0/accounts/{account_id}` namespace).
- **Rationale:** A user discovering the SDK would expect a "list" operation from a plural package name and be surprised by the lack of one. The singular form also matches the REST path `/dashboard`. The fold-into-`billing` move is a generator-level concern but worth flagging: both `usagedashboards` and `billableusagedownload` are about account-level billing data and live under the same URL prefix.

### 2. `UsageDashboardMajorVersion` enum has redundant prefix on every member — `src/v1/model.ts:5-9`
- **Why weird:** Every member of the enum is prefixed with the enum name in screaming snake case: `USAGE_DASHBOARD_MAJOR_VERSION_UNSPECIFIED`, `USAGE_DASHBOARD_MAJOR_VERSION_1`, `USAGE_DASHBOARD_MAJOR_VERSION_2`. The qualified usage at a call site reads `UsageDashboardMajorVersion.USAGE_DASHBOARD_MAJOR_VERSION_1` — 51 characters of pure stutter for a value that means "1".
- **Category:** 2 (redundant enum prefix), 7 (overly verbose), 18 (long enum values).
- **Suggested name:** Drop the `USAGE_DASHBOARD_MAJOR_VERSION_` prefix on each member so call sites read `UsageDashboardMajorVersion.UNSPECIFIED` / `.V1` / `.V2`.
- **Rationale:** Two real values (`1` and `2`) plus a sentinel `Unspecified` does not need a 28-character prefix per member. Same finding applies to **every** enum in the codebase — but this one is particularly egregious because the values are integers.

### 3. `UsageDashboardType` enum has the same redundant-prefix problem — `src/v1/model.ts:11-15`
- **Why weird:** Members `USAGE_DASHBOARD_TYPE_UNSPECIFIED`, `USAGE_DASHBOARD_TYPE_WORKSPACE`, `USAGE_DASHBOARD_TYPE_GLOBAL`. Same pattern as #2.
- **Category:** 2, 7, 18.
- **Suggested name:** Drop the `USAGE_DASHBOARD_TYPE_` prefix so members read `UNSPECIFIED` / `WORKSPACE` / `GLOBAL`.
- **Rationale:** Same as #2. Bonus issue: the wire values are the bare strings `WORKSPACE` and `GLOBAL` (after the `USAGE_DASHBOARD_TYPE_` prefix), so the prefix exists *only* in the TS layer — it is not part of the on-wire enum.

### 4. `dashboardType` field on `Create*` is misleadingly optional and arrives in the URL query string — `src/v1/model.ts:23, 40` / `src/v1/client.ts:106-108`
- **Why weird:** The field is typed `UsageDashboardType | undefined` (optional) but the JSDoc says "Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account." There is no documented default — what happens if you omit `dashboardType` on create? The API presumably 4xx's or picks a side. Also note `dashboardType` is sent as a query-string parameter on the GET (`client.ts:106`) but the request shape is otherwise body-shaped — inconsistent transport for fields on the same DTO.
- **Category:** 6 (misleading — TS type says optional, API likely requires it), 16 (field type contradicts domain reality), 17 (inconsistent transport: same field is body on POST, query on GET).
- **Suggested name:** Keep the name but type as `UsageDashboardType` (required). Or split the DTO into `CreateBillingUsageDashboardRequest` (body) and `GetBillingUsageDashboardRequest` (query params), since the GET endpoint conceptually has different parameter semantics from the POST.
- **Rationale:** `dashboardType` is the field that distinguishes Workspace from Global dashboards — it is *the* selector for the resource. Treating it as optional with no default is type-level dishonesty.

### 5. `workspaceId: number` typed as JS `number` will silently truncate large IDs — `src/v1/model.ts:19, 36`
- **Why weird:** Databricks workspace IDs are 64-bit integers (the Go SDK uses `int64`); JavaScript's `number` type is IEEE-754 double which loses precision above 2^53. The TS field is typed `number | undefined`. Same finding applies to `metastores` and most workspace-scoped packages in the SDK, but worth flagging because every audit cycle compounds the risk. Compare with `accountId: string` (line 21) which correctly uses `string` for an account UUID.
- **Category:** 16 (field type contradicts domain — `number` cannot represent a 64-bit ID), 6 (misleading — type appears safe but is lossy).
- **Suggested name:** Keep the field name, change type to `string`.
- **Rationale:** Most workspace IDs are below 2^53 in practice, so this rarely bites. But the type contract claims something the runtime can't honour for the high end of the ID space. This is a systemic SDK-level issue worth raising at the generator.

### 6. `accountId` is in the request body shape but is actually a URL path parameter — `src/v1/model.ts:21` / `src/v1/client.ts:72`
- **Why weird:** `accountId` lives on `CreateBillingUsageDashboard` (looks like a body field) but the client extracts it for the URL path (`/api/2.0/accounts/${req.accountId}/dashboard`) — it is *not* sent in the JSON body. The marshalled body does emit `account_id` though, so it goes out twice (once in the URL, once in the body). Server may ignore the body copy. The field type and location are misleading about its wire role. Also duplicated against `ClientOptions.accountId` with a silent empty-string fallback at `client.ts:72, 101` — `${req.accountId ?? this.accountId ?? ''}` produces `/api/2.0/accounts//dashboard` if both are absent.
- **Category:** 6 (misleading — body shape implies body field, but it's a path param), 12 (duplicate concept — also lives on `ClientOptions`), 16 (field's structural location contradicts wire role), 19 (underspecified — what happens if URL and body disagree? what happens if both sources are missing?).
- **Suggested name:** Remove `accountId` from the request DTOs entirely. Make it a client-level concern only; throw a clear error if it is missing. Or segregate path params into a separate type and document the dual role.
- **Rationale:** Same as `billableusagedownload` finding. The current shape misleads callers about the wire format, the duplicated-with-fallback pattern is a footgun, and the silent empty-string fallback compounds it. Removing the request-level field is the cleanest fix.

## Medium severity

### 7. `CreateBillingUsageDashboard` / `GetBillingUsageDashboard` include `Billing` but the package is `usagedashboards` — `src/v1/model.ts:17, 34`
- **Why weird:** The package is `@databricks/sdk-usagedashboards` (no "billing"); the types prefix `Billing` (no "Usage" alone). A user who imported the package by its `usage`-themed name then sees `Billing`-prefixed types and `Client.createBillingUsageDashboard()` method must mentally bridge `usage` ↔ `billing`. The package name and type names disagree on which noun is primary.
- **Category:** 17 (inconsistent action verbs / nouns across naming layers), 7 (overly verbose — `BillingUsage` is two synonyms for the same concept).
- **Suggested name:** Pick one noun. Either rename the package to `billingusagedashboards` (matches types) or drop `Billing` from the type names (`CreateUsageDashboard` / `GetUsageDashboard`). The Go SDK calls this domain "Billing → UsageDashboards" so types match Go; the TS package name is the outlier.
- **Rationale:** Cross-layer consistency. The simplest fix is `CreateUsageDashboard*` / `GetUsageDashboard*` since the package name is already `usagedashboards`. "Billing" is implied by the account-level endpoint path.

### 8. `Client` class is unprefixed — `src/v1/client.ts:38`
- **Why weird:** Exported as `Client` (the only class). A user importing this package writes `import {Client} from '@databricks/sdk-usagedashboards/v1'`, then has to rename it (`import {Client as UsageDashboardsClient}`) to avoid collision with every other Databricks SDK package's `Client` export. Cross-SDK consistency — but worth flagging.
- **Category:** 1 (vague — `Client` of what?), 12 (every package defines its own `Client`).
- **Suggested name:** `UsageDashboardsClient` or `BillingUsageDashboardClient`.
- **Rationale:** Same finding as `billableusagedownload` audit #8. The SDK could expose a namespace export pattern (`import * as usageDashboards from '@databricks/sdk-usagedashboards/v1'`) and remove the `Client` symbol entirely, letting `usageDashboards.Client` be the qualified name. Not a blocker.

### 9. `createBillingUsageDashboard` / `getBillingUsageDashboard` method names duplicate the type name — `src/v1/client.ts:68, 97`
- **Why weird:** Method name and request-type name are textually identical (modulo case): `createBillingUsageDashboard(req: CreateBillingUsageDashboard)`. The repetition is so close that the type name reads like a misnamed method import. Compare with `lakeview` where `Client.createDashboard(req: CreateDashboardRequest)` keeps the type-noun separate from the method-verb.
- **Category:** 7 (overly verbose), 8 (redundant — method verb is already implicit in the type's verb prefix).
- **Suggested name:** `createDashboard` / `getDashboard` (drop `BillingUsage` since the package name disambiguates) or `create` / `get` (since there are only two methods). Type stays as `CreateBillingUsageDashboardRequest`.
- **Rationale:** A method on `usageDashboardsClient` is already in the usage-dashboards namespace; restating `BillingUsageDashboard` in the method name is pure stutter. The Go SDK does this because Go has package-flat method tables; TS classes provide their own namespace.

### 10. `dashboardId` returned but never used to re-fetch — `src/v1/model.ts:31, 46`
- **Why weird:** Both response types include `dashboardId?: string` (always optional). But there is no `GetByDashboardId` method, and the request types use `(workspaceId, accountId, dashboardType)` to identify the dashboard, not the `dashboardId`. So `dashboardId` is a returned-but-never-accepted identifier — informational only. The field is also typed optional, but a successful 2xx response should always have an ID; the `?` is again type-level dishonesty.
- **Category:** 6 (misleading optionality), 19 (underspecified id — present in responses but not accepted as a request key).
- **Suggested name:** Keep the name; make it required (`dashboardId: string`). Or document that it is a read-only side-channel identifier (not a primary key from the API's POV). Or expose a `getByDashboardId` method that round-trips the value.
- **Rationale:** If the API returns an ID, the SDK should either let you use it or document why you can't. The current state — return-only, never-accepted — is API-design noise that the SDK faithfully echoes.

### 11. `dashboardUrl` field is a `string` — should be `URL` or branded — `src/v1/model.ts:48`
- **Why weird:** `dashboardUrl?: string | undefined` — a URL is typed as a bare string. Callers must `new URL(resp.dashboardUrl)` defensively. Compare with `accountId`/`dashboardId` which are also strings but represent IDs, not URLs. No branded type distinguishes them. Also optional on a success response (same dishonesty as #10).
- **Category:** 15 (generic field name losing meaning), 6 (misleading optionality), 1 (vague — `string` for a URL).
- **Suggested name:** Keep the field name; consider a branded type (`type Url = string & {readonly _urlBrand: unique symbol}`) or `URL` (the WHATWG class). At minimum, make it non-optional on a 2xx response.
- **Rationale:** SDK-wide concern (every URL field in every package is `string`); flag once per audit. Branded URLs are a TS idiom precisely for this case.

### 12. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:33`
- **Why weird:** `Segment` is a generic CS term. The comment ("Package identity segment for this client to be used in the User-Agent header") is the disambiguator; without it the constant name does not communicate what it is.
- **Category:** 1 (vague), 15 (generic field name losing meaning).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Cross-package consistency — same finding appears in every audited package. Worth normalising at the generator level.

## Low severity

### 13. JSDoc on `dashboardType` is duplicated verbatim — `src/v1/model.ts:22, 39`
- **Why weird:** The exact same multi-sentence JSDoc ("Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account.") appears on `CreateBillingUsageDashboard.dashboardType` (line 22) and `GetBillingUsageDashboard.dashboardType` (line 39). The duplication suggests the underlying enum (`UsageDashboardType`) should carry the doc, not each field.
- **Category:** Observation — not strictly a name issue but flagged because it implies fragmentation. JSDoc duplication is a generator artefact.
- **Suggested name:** Move the doc to the `UsageDashboardType` enum (or its members).

### 14. `req` / `resp` / `httpReq` abbreviations — `src/v1/client.ts:68, 74, 78, 97, 111, 115, 117`
- **Why weird:** Local variables use three-letter abbreviations (`req`, `resp`, `opts`, `httpReq`). The codebase guideline (typescript.mdc § 5) discourages cryptic short abbreviations. Compare with `httpClient` (full word) in the same file.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `options`, `httpRequest`.
- **Rationale:** Inexpensive readability win.

### 15. `params` shadowed across files — `src/v1/client.ts:102`
- **Why weird:** Local `params: URLSearchParams` — fine in isolation, but `flattenQueryParams(prefix, value, params)` in `utils.ts:123` exposes the same `params` name in public API. The repeated use of `params` for both `URLSearchParams` and "named function parameters" is mildly confusing in audit traces.
- **Category:** 1 (vague).
- **Suggested name:** `queryParams` / `urlSearchParams`.

### 16. `query` local in `getBillingUsageDashboard` — `src/v1/client.ts:109`
- **Why weird:** `const query = params.toString();` — the variable is the serialized query *string*, but `query` reads as a query expression/object. Compare with `fullUrl` on the next line (which is clear about what it is).
- **Category:** 1 (vague), 6 (misleading — name implies a query, value is a string).
- **Suggested name:** `queryString`.

### 17. `httpClient: HttpClient` field — `src/v1/client.ts:43`
- **Why weird:** Type-suffix tautology (`httpClient` field of type `HttpClient`). Minor — convention widespread in this SDK.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `client: HttpClient` — though arguably the longer name disambiguates from the outer `Client` class in the same file.

## Observations

### 18. `flattenQueryParams` exported but unused in this package — `src/v1/utils.ts:123`
The exported `flattenQueryParams` helper is never called from `client.ts` — the GET method does its own `params.append()` (lines 103-108) inline because there are only two query params. The helper is dead surface area in this package; same finding as `billableusagedownload` audit #11. Worth pruning at the generator level when the consuming methods don't need it.

### 19. `executeHttpCall` and `executeCall` near-duplicate exported names — `src/v1/utils.ts:26, 65`
Two functions named almost identically, doing very different things: `executeCall` wraps the call in retry/rate-limit semantics, `executeHttpCall` does the raw HTTP send + decode + APIError check. Both are used in `client.ts:79, 89, 117, 126`. The verb-pair is fine, but the cognitive distance between "wrap with retry options" and "send an HTTP request and check for API errors" is large enough that one name should be different (e.g., `runWithCallOptions` / `sendHttp`). Same finding appears in every audited package's `utils.ts`.

### 20. `BillingUsage` vs `UsageDashboard` noun ordering inconsistency
- The enum names are `UsageDashboardMajorVersion`, `UsageDashboardType` — `Usage` first, no "Billing".
- The request types are `CreateBillingUsageDashboard` — `Billing` first, with `Usage`.
- The package is `usagedashboards` — `usage` only, no "billing".
- The Go SDK service is "Billing → UsageDashboards" — both nouns in two layers.

Three different name compositions for one domain. A user trying to autocomplete `Billing` will find the request types but not the enums; trying `Usage` finds the enums but the type names appear under `Create...` / `Get...`. The SDK should pick one noun order (e.g., `BillingUsageDashboard*` everywhere, or `UsageDashboard*` everywhere) and stick to it. See also #7.

### 21. The package has no list/page operations
There is no `ListBillingUsageDashboards`, no `Iterator`, no `nextPageToken`. The package is one-create-one-get only — a very thin API. Audit-rule categories 9 (singular/plural is settled — should be singular, see #1) and 13 (verb tense — no verb tense issues since there is no "Started"/"Starting" parallel) mostly don't apply. The Go SDK source likely has the same shape.

## Domain glossary
- `usage dashboard` — A Databricks-managed dashboard (DBSQL or AI/BI Lakeview) that visualises account-level billing/usage data. Two flavours: **Workspace** (per-workspace) and **Global** (all workspaces in an account).
- `DBU` — Databricks Unit; the standard unit of compute consumption. Notably absent from this package's types and JSDoc — verified via grep that the literal "DBU" never appears, even though DBUs are the unit the dashboard would visualise.
- `account ID` — Databricks account identifier (UUID); surfaces as `accountId: string` on both request types and on `ClientOptions.accountId`.
- `workspace ID` — Databricks workspace identifier (64-bit int); surfaces as `workspaceId: number` — see finding #5 about the precision issue.
- `major version` — Template version of the dashboard (1 or 2). Per the JSDoc, defaults to `VERSION_1` if unspecified at create time.
- `dashboard ID` — Identifier of the created dashboard (returned, not accepted as input). See finding #10.
- `E2` — Databricks deployment architecture; not mentioned in this package but implicit (account-level endpoints are E2-only).

## File coverage
- `src/v1/model.ts` (86 lines): read fully.
- `src/v1/client.ts` (133 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (13 lines): read fully.
