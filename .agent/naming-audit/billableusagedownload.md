# Naming Audit: billableusagedownload

**Path:** `packages/billableusagedownload/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CSV export of billable Databricks usage logs for a given month range. Single endpoint: `GET /api/2.0/accounts/{account_id}/usage/download`. No CRUD surface, no enums, no list/page semantics — just one streaming download method.
**Total weird names flagged:** 8

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 3 |
| Low | 0 |
| Observation | 1 |

## High severity

### 1. Package name `billableusagedownload` embeds an action verb — `packages/billableusagedownload/`
- **Why weird:** Package names should be domain nouns (`billing`, `usage`, `accounts`). `billableusagedownload` is `noun+noun+verb` — the only verb-suffixed package in the workspace (compare `usagedashboards`, `usagepolicy`, `budgets`, `accountsettings`). The `download` verb belongs on the method, not the package. Users discovering the SDK would naturally search for "billing" or "usage", not for "billableusagedownload".
- **Category:** 7 (overly verbose), 14 (Go/proto-style names — this is almost certainly the protobuf package), 17 (inconsistent action-verb conventions vs sibling packages).
- **Suggested name:** Fold into a `billing` package alongside `usagedashboards` (most idiomatic), or rename to `billableusage` (drop the verb). The single method `Client.download()` then carries the action.
- **Rationale:** The Databricks REST API path is `/usage/download`, but the SDK shouldn't reproduce URL path segments as package names. The sibling `usagedashboards` package handles a closely related concern; the two should likely co-exist as one `billing` namespace. Worth raising at SDK-generator level.

### 2. `DownloadRequest` — `src/v1/model.ts:3`
- **Why weird:** Type name is action-shaped (verb-prefixed), and the verb is generic. "Download" alone says nothing about what is being downloaded. Collides with `DownloadRequest` in `packages/files/src/v1/model.ts:?` — a user importing both packages must alias one (`import type {DownloadRequest as BillingDownloadRequest}`). Same collision applies to `DownloadResponse` (finding #3).
- **Category:** 1 (vague without domain context), 12 (duplicate concept across packages — `files` has the same names for unrelated payloads).
- **Suggested name:** `DownloadBillableUsageRequest` (matches the Go SDK message-name convention) or `DownloadUsageRequest`.
- **Rationale:** The collision with `files.DownloadRequest` is the killer here — they have completely different fields (`accountId`/`startMonth`/`endMonth`/`personalData` vs `filePath`) and one is `application/octet-stream` CSV while the other is binary file bytes. A user re-exporting both packages from an app barrel file gets a TS error or silently shadowed types. Renaming makes both imports safe.

### 3. `DownloadResponse` — `src/v1/model.ts:30`
- **Why weird:** Same problems as #2: vague verb-shaped name, collides with `files.DownloadResponse`. Both packages use `contents: ReadableStream` as the sole field — the type shape is structurally identical but semantically distinct (CSV blob vs file bytes), which means TS structural typing will *not* catch a mix-up.
- **Category:** 1, 12, 6 (structurally identical to unrelated `files.DownloadResponse`, creates misleading shape match).
- **Suggested name:** `DownloadBillableUsageResponse`.
- **Rationale:** A `Promise<DownloadResponse>` collides directly with the file-download response of the same name. Renaming disambiguates the two unrelated payloads and prevents the structural-typing trap.

### 4. `DownloadRequest.startMonth` / `endMonth` are misleadingly optional — `src/v1/model.ts:15,20`
- **Why weird:** Both fields are typed `string | undefined`, but the JSDoc explicitly says `endMonth` "This field is required." — and `startMonth` is required in practice (the API would fail without it). The optionality contradicts the doc.
- **Category:** 6 (misleading — TS type says optional, doc says required), 16 (field type contradicts domain reality).
- **Suggested name:** Keep the field names; change the types to `string` (required) on both. Worth also renaming `startMonth`/`endMonth` to something more self-documenting like `fromMonth`/`toMonth` or `startMonth`/`untilMonth` — current names are fine.
- **Rationale:** TS strict mode rewards required fields with non-optional types; the doc and the type should agree. The Go SDK probably models these as `string` (empty-string defaults), which is a Go-ism; in TS, required strings should not carry `| undefined`.

## Medium severity

### 5. `DownloadRequest.accountId` field — `src/v1/model.ts:8`
- **Why weird:** The `accountId` lives on the request DTO *and* on `ClientOptions` (see `client.ts:39`). The client falls back from `req.accountId` to `this.accountId` (`client.ts:69`). Having the same identifier in two places, with one-overrides-the-other semantics, is a footgun: callers may set it once on the client and forget that a stale request value silently shadows it.
- **Category:** 12 (duplicate concept across types), 19 (underspecified id — same `accountId` means different things at different layers).
- **Suggested name:** Drop `accountId` from `DownloadRequest`. Make it a client-level concern only (it's a path parameter, not a body field). If per-call override is needed, document it explicitly.
- **Rationale:** The JSDoc on the field is a verbose explanation about getting your account ID from the console — content that belongs in `ClientOptions.accountId`, not duplicated per request. Removing it simplifies the API surface and eliminates the fallback chain in `client.ts`.

### 6. `Client` class is unprefixed — `src/v1/client.ts:22`
- **Why weird:** Exported as `Client` (the only class). A user importing this package writes `import {Client} from '@databricks/sdk-billableusagedownload/v1'`, then has to rename it (`import {Client as BillableUsageClient}`) to avoid collision with every other Databricks SDK package's `Client` export. Consistent across the SDK but worth flagging.
- **Category:** 1 (vague — `Client` of what?), 12 (every package defines its own `Client`).
- **Suggested name:** `BillableUsageDownloadClient` or `BillableUsageClient`. Or expose a namespace export instead of a bare class.
- **Rationale:** Cross-SDK consistency may justify keeping `Client`, but in practice every user re-aliases. The SDK could expose `import * as billableUsage from '@databricks/sdk-billableusagedownload/v1'` and remove the `Client` symbol entirely, letting `billableUsage.Client` be the qualified name.

### 7. `Client.download` method name — `src/v1/client.ts:65`
- **Why weird:** A bare `download` verb on the client. Outside the package context, `client.download(...)` reads as "download something" — the package name is the disambiguator. If a user composes multiple SDK clients (`billing.download()`, `files.download()`), the method names collide cognitively. Compare with `usagedashboards.Client` which probably exposes `createBillingUsageDashboard()` / `getBillingUsageDashboard()` — verb + domain noun.
- **Category:** 1 (vague), 17 (inconsistent verb-pattern across sibling packages).
- **Suggested name:** `downloadBillableUsage` (matches the request-type rename) or, if the package gets folded into `billing`, `downloadUsage`.
- **Rationale:** Domain-qualified method names read better when imported into application code. Even within the package, `billableUsageDownloadClient.download()` has a pleasing redundancy that a single naked `download()` does not.

## Low severity

_None._

## Observations

### 8. Field type `ReadableStream` is un-parameterised — `src/v1/model.ts:31`
The field is typed `ReadableStream` (no type parameter) rather than `ReadableStream<Uint8Array>`. Every other use in the codebase (`packages/files/src/v1/model.ts`, `utils.ts:42`, `utils.ts:101`) uses `ReadableStream<Uint8Array>` explicitly. The unparameterised version is the global lib type which is structurally `ReadableStream<any>`, weakening type safety for callers.
- **Category:** 6 (misleading — type appears typed but is in fact `any`-typed), 17 (inconsistent across the SDK).
- **Suggested name:** `contents?: ReadableStream<Uint8Array> | undefined`.

## Domain glossary
- `DBU` — Databricks Unit; standard billing unit for Databricks compute. Notably absent from this package's types and JSDoc — no DBU-related fields surface here despite the package being about billable usage. (User-mentioned in the task; verified via grep that the literal "DBU" never appears.)
- `PII` — Personally Identifiable Information. Surfaced indirectly as the `personalData` field flag.
- `E2` — Databricks deployment architecture. Mentioned in the JSDoc for `accountId` ("For non-E2 account types, get your account ID from the Accounts Console...").
- `account ID` — Databricks account identifier. Surfaces as both `ClientOptions.accountId` and `DownloadRequest.accountId` (with fallback semantics — see finding #5).
- `CSV` — Comma-Separated Values, the wire format of the download body. Documented in JSDoc, not in types.
- `usage logs` — The actual data being downloaded (billable usage records). Not a type/field; only appears in JSDoc.

## File coverage
- `src/v1/model.ts` (33 lines): read fully.
- `src/v1/client.ts` (103 lines): read fully.
- `src/v1/utils.ts` (186 lines): read fully.
- `src/v1/index.ts` (8 lines): read fully.
