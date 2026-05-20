# Naming Audit: `resourcequotas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/resourcequotas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog — resource quota inspection (count vs. limit for child securables under a parent).

Notation: file paths are absolute. Findings reference `file:line`.

---

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 3     |
| Medium      | 7     |
| Low         | 5     |
| Observation | 6     |
| **Total**   | **21** |


Headline themes:

1. **Singular/plural mismatch on the `listQuota` method.** The package name (`resourcequotas`), HTTP path (`/all-resource-quotas`), and request/response types (`ListQuotas`, `ListQuotas_Response`) are all plural, but the client method is `listQuota` (singular). This is the most user-visible naming defect.
2. **Verb-phrase request types collide semantically with client methods.** `interface GetQuota` reads as an action; `client.getQuota(req: GetQuota)` forces readers to mentally distinguish the verb-phrase function from the verb-phrase type. Several sibling packages (`accountsettings`, `budgetpolicy`, `bundle`) use the `…Request` suffix to remove this collision.
3. **`quotaName`/`quotaCount`/`quotaLimit` triple-tautology.** Every field on the `QuotaInfo` payload (and on the `GetQuota` request) is prefixed `quota…` even though the surrounding type is already `QuotaInfo` / `GetQuota`. The Go SDK necessitates this because Go embeds no enclosing namespace; TypeScript does, and the prefix becomes noise.
4. **`SecurableType` is duplicated as a `string` on `GetQuota` but a typed enum on `QuotaInfo`.** The two views of the same field are inconsistent — see H3 below.

---

## High Severity

### H1. Method name `listQuota` is singular but returns / paginates a list

- **File / line:** `src/v1/client.ts:98` (`async listQuota(...)`).
- **Category:** #9 singular/plural mismatch; #15 generic-name losing meaning.
- **Current:** `async listQuota(req: ListQuotas, options?): Promise<ListQuotas_Response>`.
- **Suggestion:** `listQuotas`.
- **Rationale:** The request type is `ListQuotas` (plural), the response is `ListQuotas_Response` carrying `quotas: QuotaInfo[]`, the URL is `/all-resource-quotas`, and the JSDoc explicitly says "ListQuotas returns **all** quota values" (`client.ts:92`). Every neighbouring signal is plural except the method name. Compare to sibling packages (`catalogs.listCatalogs`, `connections.listConnections`, `cleanrooms.listCleanRooms`), all of which use the plural verb. This is a 1-character defect with high user impact.

### H2. `GetQuota` is a verb-phrase used as a request data type

- **File / line:** `src/v1/model.ts:27`; cross-ref `src/v1/client.ts:67`.
- **Category:** #6 misleading name; #14 Go-style name.
- **Current:** `interface GetQuota { parentSecurableType?: …; parentFullName?: …; quotaName?: … }`.
- **Suggestion:** `GetQuotaRequest`.
- **Rationale:** `GetQuota` reads as a *method*, not a *type*. The user signature `client.getQuota(req: GetQuota)` parses as "call getQuota with a GetQuota" — the verb appears in two roles. The `ListQuotas` type has the same problem but mitigates it slightly with the plural noun. The `…Request` suffix is the standard remedy (see `accountsettings.GetAccountSettingRequest`, `budgetpolicy.GetBudgetPolicyRequest`).

### H3. `GetQuota.parentSecurableType: string` vs. `QuotaInfo.parentSecurableType: SecurableType`

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
- **Rationale:** "Info" adds no semantic content — the type *is* the quota record returned by the API. The codebase has no type named bare `Quota`; the natural noun is free. This mirrors the `CatalogInfo`/`ConnectionInfo` discussion in `catalogs.md` §8.1 — repo-wide pattern, flagged here for completeness. See also Observation O3.

### M2. `quotaName`, `quotaCount`, `quotaLimit` — every field prefixed with the enclosing type

- **File / line:** `src/v1/model.ts:66, 68, 70`; mirrored on `GetQuota.quotaName` (`model.ts:33`).
- **Category:** #20 type-suffix tautology (here: type-prefix tautology); #1 vague/generic root nouns.
- **Current:** `quotaName`, `quotaCount`, `quotaLimit` inside `QuotaInfo`.
- **Suggestion:** Drop the `quota` prefix → `name`, `count`, `limit`.
- **Rationale:** In Go the enclosing struct doesn't appear in the field's qualified name (`info.QuotaName` reads `QuotaName`). In TypeScript the access already includes the type via the variable: `quota.name`, `quota.count`, `quota.limit`. The current names produce `quotaInfo.quotaName`, which double-states the domain. (`parentSecurableType` and `parentFullName` legitimately need the `parent` prefix — they refer to a different entity.)

### M3. `parentSecurableType` and `parentFullName` reference the *parent* of the quota — but a quota's parent is the resource it limits, not its container

- **File / line:** `src/v1/model.ts:29, 31, 62, 64`.
- **Category:** #6 misleading name (depending on reader's mental model).
- **Current:** `parentSecurableType`, `parentFullName`.
- **Suggestion:** Confirm whether `parent` here means "the securable the quota counts children of" (the documented meaning) versus "the parent of the quota object itself." Possible rename: `scopeSecurableType` / `scopeFullName` or `containerSecurableType` / `containerFullName`.
- **Rationale:** The JSDoc on `model.ts:28, 30` says "Securable type of the quota parent" and "Full name of the parent resource. Provide the metastore ID if the parent is a metastore." A reader could plausibly think `parent` refers to the parent entity of *the quota record*, when it actually refers to the parent that *owns* the quota (i.e., the catalog/schema whose children are being counted). The doc's explanation that the metastore ID is acceptable as a `parentFullName` is the only reliable clue. Note: matches the Go SDK convention, so rename would diverge from the 1:1 port.

### M4. `quotaName` carries a "follows the pattern of the quota type, with `-quota` added as a suffix" rule that is not enforced or documented in the type

- **File / line:** `src/v1/model.ts:32` (JSDoc); field `model.ts:33, 66`.
- **Category:** #5 cryptic abbreviation (the "-quota" suffix); #15 generic name losing meaning; #19 underspecified ID.
- **Current:** `quotaName?: string`.
- **Suggestion:** Either expose the quota *type* as an enum (`QuotaKind`?) and compute the suffix server-side, or rename to `quotaSlug` / `quotaIdentifier` and document the format inline.
- **Rationale:** The JSDoc says the value "follows the pattern of the quota type, with `-quota` added as a suffix." Today the user must build the string by hand, e.g. `"schema-quota"` or `"table-quota"`. The naming gives no hint of this format; the type is plain `string`. Either the format should be encoded (enum or branded type) or the name should signal that this is a constructed slug. Compare: `lastFailoverTimeMs` (in `catalogs`) correctly carries the unit; `quotaName` carries no analogous hint.

### M5. `quotaCount` and `quotaLimit` carry no unit / type signal — counts of *what*?

- **File / line:** `src/v1/model.ts:68, 70`.
- **Category:** #1 vague/generic; #19 underspecified.
- **Current:** `quotaCount?: number`, `quotaLimit?: number`.
- **Suggestion:** Inline-doc the unit and reference what is being counted (number of *child securables*).
- **Rationale:** From the field names alone, a reader doesn't know whether these are counts of children, megabytes, requests, etc. The package-level JSDoc on `client.ts:62` clarifies that quotas count child entities (e.g. tables under a schema), but the field-level doc says only "current usage of the resource quota" and "current limit of the resource quota." Names like `currentUsage` / `currentLimit` or doc-strings citing "number of child securables" would close the gap.

### M6. `lastRefreshedAt` is `number` (epoch ms) but the name doesn't communicate units

- **File / line:** `src/v1/model.ts:72`.
- **Category:** #19 underspecified IDs (units of time).
- **Current:** `lastRefreshedAt?: number`.
- **Suggestion:** `lastRefreshedAtMs` or `lastRefreshedAtEpochMs`.
- **Rationale:** The doc says only "The timestamp that indicates when the quota count was last updated." A reader doesn't know if the unit is seconds, milliseconds, or an ISO string. The Go SDK uses `int64`, but TS callers benefit from the `Ms` suffix convention used elsewhere in the codebase (e.g. `catalogs.DrReplicationInfo.lastFailoverTimeMs`). See `catalogs.md` §19.6 / §19.7.

### M7. `nextPageToken` doc references `__page_token__` with double underscores

- **File / line:** `src/v1/model.ts:55` (JSDoc on `ListQuotas_Response.nextPageToken`).
- **Category:** #5 cryptic abbreviation; documentation defect more than naming defect, but mentions identifier syntax that doesn't exist.
- **Current:** `"__page_token__ should be set to this value for the next request."`
- **Suggestion:** Reference the actual TS field name `pageToken` (camelCase) in prose.
- **Rationale:** The double-underscore markdown bolding for `page_token` (the wire form) leaks the snake_case wire field into the public TS docs. Callers don't see `page_token`; they see `pageToken`. The doc misleads.

---

## Low Severity

### L1. `req` parameter name on every client method

- **File / line:** `src/v1/client.ts:68, 99`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: GetQuota`, `req: ListQuotas`.
- **Suggestion:** `request`.
- **Rationale:** Throughout the JS/TS ecosystem function parameters are spelled out. The Go `req`/`resp` idiom reads as Go-translated. The companion `resp` shows up at `client.ts:72, 77, 82, 112, 117, 122` — same shorthand, lower priority.

### L2. `Client` is the bare type name (no `ResourceQuotasClient`)

- **File / line:** `src/v1/client.ts:37`.
- **Category:** #14 Go-style name.
- **Current:** `export class Client`.
- **Suggestion:** `ResourceQuotasClient` (or a re-export of `Client as ResourceQuotasClient`).
- **Rationale:** TS imports often need disambiguation: `import {Client} from '@databricks/sdk-resourcequotas/v1'` forces aliasing on any consumer that uses multiple packages. Repo-wide convention, see `catalogs.md` §14.2.

### L3. `call` local variable shadows the imported `Call` type

- **File / line:** `src/v1/client.ts:73` (`const call: Call = …`); `client.ts:113` (same).
- **Category:** #1 vague/generic; #10 type/identifier shadowing.
- **Current:** `const call: Call = async (callSignal?: AbortSignal) => …`.
- **Suggestion:** `httpCall` or `doRequest`.
- **Rationale:** `call` collides with `Function.prototype.call` and with the imported `Call` type from `@databricks/sdk-core/api`. The expression `await executeCall(call, options)` reads as "execute call call options" — three uses of the verb in one line. Repo-wide port-style convention.

### L4. `resp` local variable + `respBody` shadowed concept

- **File / line:** `src/v1/client.ts:72, 77, 82, 112, 117, 122`.
- **Category:** #1 vague/generic.
- **Current:** `let resp: GetQuota_Response | undefined`, `const respBody = …`.
- **Suggestion:** `response`, `responseBytes` / `responseBody`.
- **Rationale:** Same JS-vs-Go shorthand issue as L1. `respBody` is a `Uint8Array` (bytes), not a parsed body — the name promises the parsed thing.

### L5. `pkgJson` constant name

- **File / line:** `src/v1/client.ts:18`.
- **Category:** #5 cryptic abbreviation.
- **Current:** `import pkgJson from '../../package.json' …`.
- **Suggestion:** `packageJson` or `manifest`.
- **Rationale:** Minor and internal; the `Json` part is obvious from the import target. Listed because the file is small enough to track every identifier. Repo-wide.

---

## Observations (repo-wide conventions, not local defects)

### O1. `SecurableType` enum values are bare and free of redundant prefixes

- **File / line:** `src/v1/model.ts:6-25`.
- **Observation:** Variants are `CATALOG`, `SCHEMA`, `TABLE`, … rather than `SECURABLE_TYPE_CATALOG`. **Passes** the audit for #2 (redundant enum prefix) and #18 (long enum values). This is a positive example to cite back to packages that fail. The single TODO-bearing variant `STAGING_TABLE` is appropriately marked as provisional in the JSDoc (`model.ts:23-24`).

### O2. Bare `Get*` / `List*` request shapes are a repo-wide pattern

`interface GetQuota` / `interface ListQuotas` follow the same bare verb-phrase convention used by `catalogs`, `connections`, `clusters`, `externallocations`. Some sibling packages (`accountsettings`, `budgetpolicy`, `bundle`) use the `…Request` suffix. The decision is repo-wide — flagged as a local high-severity issue (H2) only because the verb/method collision is especially loud when there are only two methods.

### O3. `…Info` suffix repeated across UC types

`QuotaInfo` mirrors `CatalogInfo`, `ConnectionInfo`, `FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo`. If the codebase decides to drop the `Info` suffix, this is one of many.

### O4. `URL` constants are inlined

- **File / line:** `src/v1/client.ts:71, 102`.
- **Observation:** `${this.host}/api/2.1/unity-catalog/resource-quotas/...` appears in both methods without a named constant. Not a naming defect, but typical audits flag unnamed magic strings.

### O5. `PACKAGE_SEGMENT.key` computed via regex from `pkgJson.name`

- **File / line:** `src/v1/client.ts:32-35`.
- **Observation:** `key: pkgJson.name.replace(/^@[^/]+\//, '')` strips the `@databricks/` org prefix. The constant name `PACKAGE_SEGMENT` is OK but the `key`/`value` shape is generic — readers don't immediately know `key="resourcequotas"` and `value=version`. Cosmetic. Identical to `artifactallowlists.md` O7.

### O6. `flattenQueryParams` is exported but unused in this package

- **File / line:** `src/v1/utils.ts:123`.
- **Observation:** Both `getQuota` (`client.ts:71`) and `listQuota` (`client.ts:102-111`) build URLs/query strings inline. The `flattenQueryParams` helper is dead code from the package's standpoint. Same finding as `catalogs.md` cross-cutting §A and `artifactallowlists.md` L5 — repo-wide template artifact.

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
| `src/v1/client.ts` | 148 | `Client` class + constructor + 3 methods + all locals + `PACKAGE_SEGMENT`. |
| `src/v1/utils.ts`  | 151 | All exported / private functions, the `HttpCallOptions` interface, `readAll`. |
| `src/v1/index.ts`  | 14  | All 7 re-exports.                                                       |

Type & symbol checklist:

- [x] `SecurableType` enum (17 members) → O1 (positive).
- [x] `SecurableType.STAGING_TABLE` (with TODO comment) → no defect (already flagged in source).
- [x] `GetQuota` interface (3 fields) → H2, H3, M3, M4; per-field below. Wrapper preserved for forward compatibility.
- [x] `GetQuota.parentSecurableType` (`string`) → H3 (type mismatch with response).
- [x] `GetQuota.parentFullName` → M3.
- [x] `GetQuota.quotaName` → M2, M4.
- [x] `GetQuota_Response` interface (1 field) → Wrapper preserved for forward compatibility.
- [x] `GetQuota_Response.quotaInfo` → no defect beyond M1 (`Info` suffix).
- [x] `ListQuotas` interface (2 fields) → H2 (verb-phrase), no per-field defects beyond M7.
- [x] `ListQuotas.maxResults` → no defect.
- [x] `ListQuotas.pageToken` → no defect.
- [x] `ListQuotas_Response` interface (2 fields) → M7.
- [x] `ListQuotas_Response.quotas` → no defect; correctly plural.
- [x] `ListQuotas_Response.nextPageToken` → M7.
- [x] `QuotaInfo` interface (6 fields) → M1 (`Info` suffix); per-field below.
- [x] `QuotaInfo.parentSecurableType` (`SecurableType`) → H3, M3.
- [x] `QuotaInfo.parentFullName` → M3.
- [x] `QuotaInfo.quotaName` → M2, M4.
- [x] `QuotaInfo.quotaCount` → M2, M5.
- [x] `QuotaInfo.quotaLimit` → M2, M5.
- [x] `QuotaInfo.lastRefreshedAt` → M6.
- [x] `Client` class → L2.
- [x] `Client.host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `PACKAGE_SEGMENT` constant → O5.
- [x] `getQuota(req, options)` method → H2, L1.
- [x] `listQuota(req, options)` method → H1, L1, L3, L4.
- [x] `HttpCallOptions` interface → no defect.
- [x] `flattenQueryParams` function → O6 (unused).
- [x] `index.ts` re-exports → no defects; mirrors model exports faithfully.

---

## File / line index for fast lookup

| Identifier                                        | Location          | Finding                  |
| ------------------------------------------------- | ----------------- | ------------------------ |
| `SecurableType`                                   | model.ts:6        | O1 (positive)            |
| `SecurableType.STAGING_TABLE`                     | model.ts:24       | — (annotated TODO)       |
| `GetQuota`                                        | model.ts:27       | H2                       |
| `GetQuota.parentSecurableType` (`string`)         | model.ts:29       | H3, M3                   |
| `GetQuota.parentFullName`                         | model.ts:31       | M3                       |
| `GetQuota.quotaName`                              | model.ts:33       | M2, M4                   |
| `ListQuotas`                                      | model.ts:42       | H2 (verb-phrase)         |
| `ListQuotas.maxResults`                           | model.ts:44       | —                        |
| `ListQuotas.pageToken`                            | model.ts:46       | —                        |
| `ListQuotas_Response.nextPageToken` (doc)         | model.ts:55-57    | M7                       |
| `QuotaInfo`                                       | model.ts:60       | M1, O3                   |
| `QuotaInfo.parentSecurableType` (`SecurableType`) | model.ts:62       | H3, M3                   |
| `QuotaInfo.parentFullName`                        | model.ts:64       | M3                       |
| `QuotaInfo.quotaName`                             | model.ts:66       | M2, M4                   |
| `QuotaInfo.quotaCount`                            | model.ts:68       | M2, M5                   |
| `QuotaInfo.quotaLimit`                            | model.ts:70       | M2, M5                   |
| `QuotaInfo.lastRefreshedAt`                       | model.ts:72       | M6                       |
| `Client` (bare name)                              | client.ts:37      | L2                       |
| `PACKAGE_SEGMENT`                                 | client.ts:32      | O5                       |
| `pkgJson` import alias                            | client.ts:18      | L5                       |
| `Client.getQuota` parameter `req`                 | client.ts:68      | L1                       |
| `Client.listQuota` (singular method)              | client.ts:98      | H1, L1                   |
| `const call: Call`                                | client.ts:73, 113 | L3                       |
| `let resp: …_Response`                            | client.ts:72, 112 | L4                       |
| `const respBody`                                  | client.ts:77, 117 | L4                       |
| `flattenQueryParams`                              | utils.ts:123      | O6                       |

---

## Recommended priority order

1. **Rename `listQuota` → `listQuotas`** — single-character defect, highest user impact. (H1)
2. **Add `…Request` suffix to verb-phrase request types.** (H2)
3. **Reconcile `parentSecurableType` type — make `GetQuota.parentSecurableType: SecurableType`.** (H3)
4. **Drop `quota` prefix on `quotaName` / `quotaCount` / `quotaLimit` inside `QuotaInfo`.** (M2)
5. **Document units on `lastRefreshedAt` (Ms) and counts on `quotaCount`/`quotaLimit`.** (M5, M6)
6. **Fix the `__page_token__` reference in `nextPageToken` doc to use the camelCase TS field.** (M7)
7. **Drop `Info` suffix on `QuotaInfo`.** (M1, O3)
8. **Spell out `req` → `request` (repo-wide policy).** (L1)
