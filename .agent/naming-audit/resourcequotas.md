# Naming Audit: `resourcequotas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/resourcequotas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog — resource quota inspection (count vs. limit for child securables under a parent).

---

## Summary

| Severity  | Count |
| --------- | ----- |
| High      | 0     |
| Medium    | 1     |
| Low       | 1     |
| **Total** | **2** |


Headline themes:

1. **Redundant `Info` suffix on the core record type.** `QuotaInfo` is the quota record itself; the bare noun `Quota` is free and reads more naturally. This mirrors the repo-wide `*Info` suffix pattern (see `catalogs.md`).

---

## High Severity

_None._

---

## Medium Severity

### M1. `QuotaInfo` carries the redundant `Info` suffix

- **File / line:** `src/v1/model.ts:62`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `interface QuotaInfo`.
- **Suggestion:** `Quota`.
- **Rationale:** "Info" adds no semantic content — the type *is* the quota record returned by the API. The codebase has no type named bare `Quota`; the natural noun is free. This mirrors the `CatalogInfo` discussion in `catalogs.md` §2.1 — repo-wide pattern.

---

## Low Severity

### L1. `req` parameter name on every client method

- **File / line:** `src/v1/client.ts:69, 104, 141`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: GetQuotaRequest`, `req: ListQuotasRequest` (twice, once on `listQuotas` and once on `listQuotasIter`).
- **Suggestion:** `request`.
- **Rationale:** Throughout the JS/TS ecosystem function parameters are spelled out. The Go `req`/`resp` idiom reads as Go-translated. The companion `resp` shows up at `client.ts:74, 87, 90, 93, 118, 131, 134, 137` — same shorthand, lower priority.
