# Naming Audit: `resourcequotas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/resourcequotas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog — resource quota inspection (count vs. limit for child securables under a parent).

---

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 1     |
| Medium      | 1     |
| Low         | 1     |
| Observation | 1     |
| **Total**   | **4** |


Headline themes:

1. **Singular/plural mismatch on the `listQuota` / `listQuotaIter` methods.** The package name (`resourcequotas`), HTTP path (`/all-resource-quotas`), and request/response types (`ListQuotasRequest`, `ListQuotasResponse`) are all plural, but the client methods are `listQuota` / `listQuotaIter` (singular). This is the most user-visible naming defect.

---

## High Severity

### H1. Method names `listQuota` / `listQuotaIter` are singular but return / paginate a list

- **File / line:** `src/v1/client.ts:103` (`async listQuota(...)`); `src/v1/client.ts:139` (`async *listQuotaIter(...)`).
- **Category:** #9 singular/plural mismatch; #15 generic-name losing meaning.
- **Current:** `async listQuota(req: ListQuotasRequest, options?): Promise<ListQuotasResponse>`; `async *listQuotaIter(req: ListQuotasRequest, options?): AsyncGenerator<QuotaInfo>`.
- **Suggestion:** `listQuotas` / `listQuotasIter`.
- **Rationale:** The request type is `ListQuotasRequest` (plural noun), the response is `ListQuotasResponse` carrying `quotas: QuotaInfo[]`, the URL is `/all-resource-quotas`, and the JSDoc explicitly says "ListQuotas returns **all** quota values" (`client.ts:97`). Every neighbouring signal is plural except the method names. Compare to sibling packages (`catalogs.listCatalogs`, `connections.listConnections`, `cleanrooms.listCleanRooms`), all of which use the plural verb. This is a 1-character defect with high user impact, and now duplicated on the generator-added `listQuotaIter` paginator.

---

## Medium Severity

### M1. `QuotaInfo` carries the redundant `Info` suffix

- **File / line:** `src/v1/model.ts:58`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `interface QuotaInfo`.
- **Suggestion:** `Quota`.
- **Rationale:** "Info" adds no semantic content — the type *is* the quota record returned by the API. The codebase has no type named bare `Quota`; the natural noun is free. This mirrors the `CatalogInfo`/`ConnectionInfo` discussion in `catalogs.md` §8.1 — repo-wide pattern, flagged here for completeness. See also Observation O1.

---

## Low Severity

### L1. `req` parameter name on every client method

- **File / line:** `src/v1/client.ts:70, 104, 140`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: GetQuotaRequest`, `req: ListQuotasRequest` (twice, once on `listQuota` and once on `listQuotaIter`).
- **Suggestion:** `request`.
- **Rationale:** Throughout the JS/TS ecosystem function parameters are spelled out. The Go `req`/`resp` idiom reads as Go-translated. The companion `resp` shows up at `client.ts:74, 87, 90, 93, 117, 130, 133, 136` — same shorthand, lower priority.

---

## Observations (repo-wide conventions, not local defects)

### O1. `…Info` suffix repeated across UC types

`QuotaInfo` mirrors `CatalogInfo`, `ConnectionInfo`, `FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo`. If the codebase decides to drop the `Info` suffix, this is one of many.
