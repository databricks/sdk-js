# Naming Audit: `resourcequotas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/resourcequotas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog — resource quota inspection (count vs. limit for child securables under a parent).

Notation: file paths are absolute. Findings reference `file:line`.

---

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 2     |
| Medium      | 1     |
| Low         | 2     |
| Observation | 1     |
| **Total**   | **6** |


Headline themes:

1. **Singular/plural mismatch on the `listQuota` / `listQuotaIter` methods.** The package name (`resourcequotas`), HTTP path (`/all-resource-quotas`), and request/response types (`ListQuotasRequest`, `ListQuotasRequest_Response`) are all plural, but the client methods are `listQuota` / `listQuotaIter` (singular). This is the most user-visible naming defect.
2. **`SecurableType` is duplicated as a `string` on `GetQuotaRequest` but a typed enum on `QuotaInfo`.** The two views of the same field are inconsistent — see H2 below.

---

## High Severity

### H1. Method names `listQuota` / `listQuotaIter` are singular but return / paginate a list

- **File / line:** `src/v1/client.ts:98` (`async listQuota(...)`); `src/v1/client.ts:131` (`async *listQuotaIter(...)`).
- **Category:** #9 singular/plural mismatch; #15 generic-name losing meaning.
- **Current:** `async listQuota(req: ListQuotasRequest, options?): Promise<ListQuotasRequest_Response>`; `async *listQuotaIter(req: ListQuotasRequest, options?): AsyncGenerator<QuotaInfo>`.
- **Suggestion:** `listQuotas` / `listQuotasIter`.
- **Rationale:** The request type is `ListQuotasRequest` (plural noun), the response is `ListQuotasRequest_Response` carrying `quotas: QuotaInfo[]`, the URL is `/all-resource-quotas`, and the JSDoc explicitly says "ListQuotas returns **all** quota values" (`client.ts:92`). Every neighbouring signal is plural except the method names. Compare to sibling packages (`catalogs.listCatalogs`, `connections.listConnections`, `cleanrooms.listCleanRooms`), all of which use the plural verb. This is a 1-character defect with high user impact, and now duplicated on the generator-added `listQuotaIter` paginator.

### H2. `GetQuotaRequest.parentSecurableType: string` vs. `QuotaInfo.parentSecurableType: SecurableType`

- **File / line:** `src/v1/model.ts:29` (request, `string`); `src/v1/model.ts:62` (response, `SecurableType`).
- **Category:** #6 misleading name; #16 field contradicting type domain.
- **Current:** The same logical field is typed as a free-form `string` on the request and as the typed `SecurableType` enum on the response.
- **Suggestion:** Type both as `SecurableType`. If the API genuinely accepts arbitrary strings on input, document that explicitly in the field-level JSDoc.
- **Rationale:** A caller cannot intuit that the `parentSecurableType` they pass into `getQuota` must match a `SecurableType` enum value — the type system promises nothing. The URL substitution (`client.ts:71`) drops the string straight into the path, so a typo like `CATELOG` produces a 404 the user has to debug. Either the enum is the source of truth and the request should reuse it, or the enum is wrong. Today they disagree, which is the worst of both worlds.

---

## Medium Severity

### M1. `QuotaInfo` carries the redundant `Info` suffix

- **File / line:** `src/v1/model.ts:60`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `interface QuotaInfo`.
- **Suggestion:** `Quota`.
- **Rationale:** "Info" adds no semantic content — the type *is* the quota record returned by the API. The codebase has no type named bare `Quota`; the natural noun is free. This mirrors the `CatalogInfo`/`ConnectionInfo` discussion in `catalogs.md` §8.1 — repo-wide pattern, flagged here for completeness. See also Observation O1.

---

## Low Severity

### L1. `req` parameter name on every client method

- **File / line:** `src/v1/client.ts:68, 99, 132`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: GetQuotaRequest`, `req: ListQuotasRequest` (twice, once on `listQuota` and once on `listQuotaIter`).
- **Suggestion:** `request`.
- **Rationale:** Throughout the JS/TS ecosystem function parameters are spelled out. The Go `req`/`resp` idiom reads as Go-translated. The companion `resp` shows up at `client.ts:72, 77, 82, 112, 117, 122` — same shorthand, lower priority.

### L2. `Client` is the bare type name (no `ResourceQuotasClient`)

- **File / line:** `src/v1/client.ts:37`.
- **Category:** #14 Go-style name.
- **Current:** `export class Client`.
- **Suggestion:** `ResourceQuotasClient` (or a re-export of `Client as ResourceQuotasClient`).
- **Rationale:** TS imports often need disambiguation: `import {Client} from '@databricks/sdk-resourcequotas/v1'` forces aliasing on any consumer that uses multiple packages. Repo-wide convention, see `catalogs.md` §14.2.

---

## Observations (repo-wide conventions, not local defects)

### O1. `…Info` suffix repeated across UC types

`QuotaInfo` mirrors `CatalogInfo`, `ConnectionInfo`, `FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo`. If the codebase decides to drop the `Info` suffix, this is one of many.

---

## Domain glossary

| Term                 | Meaning in this package                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| Quota                | A `(count, limit)` pair tracking how many child securables exist under a parent.     |
| Parent securable     | The container whose children are being counted (e.g. metastore → catalog, catalog → schema). |
| `parentFullName`     | The dotted full name of the parent securable; or the metastore ID when parent is a metastore. |
| `quotaName`          | A slug built from the quota kind plus the `-quota` suffix (e.g. `schemas-quota`). Format under-documented. |
| `quotaCount`         | Current number of child securables.                                                  |
| `quotaLimit`         | Maximum allowed before further creation is rejected.                                 |
| `lastRefreshedAt`    | Epoch-ms timestamp of last server-side count refresh; refreshes are asynchronous.    |
| SecurableType        | One of 17 Unity Catalog securable kinds (CATALOG, SCHEMA, TABLE, …).                 |

---

## File coverage

| File           | Lines | Audited                                                                |
| -------------- | ----- | ---------------------------------------------------------------------- |
| `src/v1/model.ts`  | 113 | 1 enum (17 members), 4 interfaces (12 fields total).                   |
| `src/v1/client.ts` | 148 | `Client` class + constructor + `getQuota` + `listQuota` + `listQuotaIter` + all locals + `PACKAGE_SEGMENT`. |
| `src/v1/utils.ts`  | 151 | All exported / private functions, the `HttpCallOptions` interface, `readAll`. |
| `src/v1/index.ts`  | 14  | All 7 re-exports.                                                       |

Type & symbol checklist:

- [x] `SecurableType` enum (17 members) → no defect.
- [x] `SecurableType.STAGING_TABLE` (with TODO comment) → no defect (already flagged in source).
- [x] `GetQuotaRequest` interface (3 fields) → H2; per-field below. Wrapper preserved for forward compatibility.
- [x] `GetQuotaRequest.parentSecurableType` (`string`) → H2 (type mismatch with response).
- [x] `GetQuotaRequest.parentFullName` → no defect.
- [x] `GetQuotaRequest.quotaName` → no defect.
- [x] `GetQuotaRequest_Response` interface (1 field) → Wrapper preserved for forward compatibility.
- [x] `GetQuotaRequest_Response.quotaInfo` → no defect beyond M1 (`Info` suffix).
- [x] `ListQuotasRequest` interface (2 fields) → no defect.
- [x] `ListQuotasRequest.maxResults` → no defect.
- [x] `ListQuotasRequest.pageToken` → no defect.
- [x] `ListQuotasRequest_Response` interface (2 fields) → no defect.
- [x] `ListQuotasRequest_Response.quotas` → no defect; correctly plural.
- [x] `ListQuotasRequest_Response.nextPageToken` → no defect.
- [x] `QuotaInfo` interface (6 fields) → M1 (`Info` suffix), O1; per-field below.
- [x] `QuotaInfo.parentSecurableType` (`SecurableType`) → H2.
- [x] `QuotaInfo.parentFullName` → no defect.
- [x] `QuotaInfo.quotaName` → no defect.
- [x] `QuotaInfo.quotaCount` → no defect.
- [x] `QuotaInfo.quotaLimit` → no defect.
- [x] `QuotaInfo.lastRefreshedAt` → no defect.
- [x] `Client` class → L2.
- [x] `Client.host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `getQuota(req, options)` method → L1.
- [x] `listQuota(req, options)` method → H1, L1.
- [x] `listQuotaIter(req, options)` paginator method → H1, L1.
- [x] `HttpCallOptions` interface → no defect.
- [x] `index.ts` re-exports → no defects; mirrors model exports faithfully.

---

## File / line index for fast lookup

| Identifier                                               | Location          | Finding                  |
| -------------------------------------------------------- | ----------------- | ------------------------ |
| `SecurableType`                                          | model.ts:6        | —                        |
| `SecurableType.STAGING_TABLE`                            | model.ts:24       | — (annotated TODO)       |
| `GetQuotaRequest`                                        | model.ts:27       | —                        |
| `GetQuotaRequest.parentSecurableType` (`string`)         | model.ts:29       | H2                       |
| `GetQuotaRequest.parentFullName`                         | model.ts:31       | —                        |
| `GetQuotaRequest.quotaName`                              | model.ts:33       | —                        |
| `ListQuotasRequest`                                      | model.ts:42       | —                        |
| `ListQuotasRequest.maxResults`                           | model.ts:44       | —                        |
| `ListQuotasRequest.pageToken`                            | model.ts:46       | —                        |
| `QuotaInfo`                                              | model.ts:60       | M1, O1                   |
| `QuotaInfo.parentSecurableType` (`SecurableType`)        | model.ts:62       | H2                       |
| `QuotaInfo.parentFullName`                               | model.ts:64       | —                        |
| `QuotaInfo.quotaName`                                    | model.ts:66       | —                        |
| `QuotaInfo.quotaCount`                                   | model.ts:68       | —                        |
| `QuotaInfo.quotaLimit`                                   | model.ts:70       | —                        |
| `QuotaInfo.lastRefreshedAt`                              | model.ts:72       | —                        |
| `Client` (bare name)                                     | client.ts:37      | L2                       |
| `Client.getQuota` parameter `req`                        | client.ts:68      | L1                       |
| `Client.listQuota` (singular method)                     | client.ts:98      | H1, L1                   |
| `Client.listQuotaIter` (singular paginator method)       | client.ts:131-146 | H1, L1                   |

---

## Recommended priority order

1. **Rename `listQuota` → `listQuotas`** — single-character defect, highest user impact. (H1)
2. **Reconcile `parentSecurableType` type — make `GetQuotaRequest.parentSecurableType: SecurableType`.** (H2)
3. **Drop `Info` suffix on `QuotaInfo`.** (M1, O1)
4. **Spell out `req` → `request` (repo-wide policy).** (L1)

---
