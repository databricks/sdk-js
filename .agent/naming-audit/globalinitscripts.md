# Naming Audit: `globalinitscripts` (v2)

**Package:** `@databricks/sdk-globalinitscripts`
**Path:** `/home/parth.bansal/sdk-js/packages/globalinitscripts/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

This audit catalogues every identifier (type, field, enum value, method,
constant) in the package and flags naming concerns against the 20-category
rubric. Issues are graded:

- **High** — actively misleading, ambiguous, or violates a TS rule.
- **Medium** — friction; verbose, redundant, or stylistically off.
- **Low** — nit / consistency observation; safe to ignore.

---

## 1. Inventory

### 1.1 Enums (`model.ts`)

None. This package defines no enums.

### 1.2 Interfaces (`model.ts`)

| Name                                         | Purpose                                       |
| -------------------------------------------- | --------------------------------------------- |
| `CreateGlobalInitScriptRequest`              | Request body for create.                      |
| `CreateGlobalInitScriptRequest_Response`     | Response from create.                         |
| `DeleteGlobalInitScriptRequest`              | Request body (path param wrapper) for delete. |
| `DeleteGlobalInitScriptRequest_Response`     | Empty response from delete.                   |
| `GetGlobalInitScriptRequest`                 | Request body (path param wrapper) for get.    |
| `GlobalInitScriptDetails`                    | Entity describing a global init script.       |
| `ListGlobalInitScriptsRequest`               | Empty request body for list.                  |
| `ListGlobalInitScriptsRequest_Response`      | Response from list.                           |
| `UpdateGlobalInitScriptRequest`              | Request body for update.                      |
| `UpdateGlobalInitScriptRequest_Response`     | Empty response from update.                   |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                                     | Field        | Type / Notes                              |
| ---------------------------------------- | ------------ | ----------------------------------------- |
| `CreateGlobalInitScriptRequest`          | `name`       | `string?` — script display name.          |
| `CreateGlobalInitScriptRequest`          | `script`     | `Uint8Array?` — Base64-encoded content.   |
| `CreateGlobalInitScriptRequest`          | `position`   | `number?` — execution order index.        |
| `CreateGlobalInitScriptRequest`          | `enabled`    | `boolean?`                                |
| `CreateGlobalInitScriptRequest_Response` | `scriptId`   | `string?`                                 |
| `DeleteGlobalInitScriptRequest`          | `scriptId`   | `string?` — path parameter.               |
| `GetGlobalInitScriptRequest`             | `scriptId`   | `string?` — path parameter.               |
| `GlobalInitScriptDetails`                | `scriptId`   | `string?`                                 |
| `GlobalInitScriptDetails`                | `name`       | `string?`                                 |
| `GlobalInitScriptDetails`                | `position`   | `number?`                                 |
| `GlobalInitScriptDetails`                | `enabled`    | `boolean?`                                |
| `GlobalInitScriptDetails`                | `createdBy`  | `string?` — username.                     |
| `GlobalInitScriptDetails`                | `createdAt`  | `number?` — Unix timestamp in ms.         |
| `GlobalInitScriptDetails`                | `updatedBy`  | `string?` — username.                     |
| `GlobalInitScriptDetails`                | `updatedAt`  | `number?` — Unix timestamp in ms.         |
| `ListGlobalInitScriptsRequest_Response`  | `scripts`    | `GlobalInitScriptDetails[]?`              |
| `UpdateGlobalInitScriptRequest`          | `scriptId`   | `string?` — path parameter.               |
| `UpdateGlobalInitScriptRequest`          | `name`       | `string?`                                 |
| `UpdateGlobalInitScriptRequest`          | `script`     | `Uint8Array?` — Base64-encoded content.   |
| `UpdateGlobalInitScriptRequest`          | `position`   | `number?`                                 |
| `UpdateGlobalInitScriptRequest`          | `enabled`    | `boolean?`                                |

### 1.4 Methods (`client.ts`)

| Method                    | HTTP   | Returns                                     |
| ------------------------- | ------ | ------------------------------------------- |
| `createGlobalInitScript`  | POST   | `CreateGlobalInitScriptRequest_Response`    |
| `deleteGlobalInitScript`  | DELETE | `DeleteGlobalInitScriptRequest_Response`    |
| `getGlobalInitScript`     | GET    | `GlobalInitScriptDetails`                   |
| `listGlobalInitScripts`   | GET    | `ListGlobalInitScriptsRequest_Response`     |
| `updateGlobalInitScript`  | PATCH  | `UpdateGlobalInitScriptRequest_Response`    |

### 1.5 Other identifiers

- `client.ts`: `PACKAGE_SEGMENT` constant; `Client` class with private fields
  `host`, `httpClient`, `logger`, `userAgent`.
- `utils.ts`: `HttpCallOptions` interface; functions `executeCall`,
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`,
  `marshalRequest`, `flattenQueryParams`.

---

## 2. Findings by Category

### 2.1 Vague / generic names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `GlobalInitScriptDetails.name` (`model.ts:45`) | Low | Generic but standard across the SDK; acceptable in entity context. |

### 2.2 Redundant enum prefixes — None

No enums are declared in this package; this rubric category does not apply.

### 2.3 Acronym casing inconsistencies — Low

| ID    | Symbol                | Severity | Issue |
| ----- | --------------------- | -------- | ----- |
| A-01  | `HttpClient`, `httpClient` (imported from core) | Low | Google TS style uses `Http` (initial-only capitalisation for acronyms > 2 chars — https://google.github.io/styleguide/tsguide.html#identifiers). Consistent. |
| A-02  | `Uint8Array` | Low | Standard Web/TC39 typed-array name; OK. |
| A-03  | "Base64" in JSDoc | Low | The JSDoc on `CreateGlobalInitScriptRequest.script` writes "Base64" with mixed case — this is correct (the format name is `Base64`, not `BASE64`). Acceptable. |

### 2.4 Underscores in TS identifiers — Low

| ID    | Symbol                                     | Severity | Issue |
| ----- | ------------------------------------------ | -------- | ----- |
| U-01  | Wire-format keys (`script_id`, `created_by`, `created_at`, `updated_by`, `updated_at`) inside Zod schemas | Low | These are string literals inside `z.object({...})` — they are JSON keys on the wire, not TS identifiers. Not a naming-convention violation; correctly mapped to camelCase via `.transform`. |

### 2.5 Cryptic abbreviations — Low

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| C-01  | `req`, `resp`, `httpReq`, `respBody` (`client.ts`) | Low | Short-lived local identifiers; OK for short scope but `request` / `response` would be clearer at no cost. |
| C-02  | `opts` (`utils.ts` parameter) | Low | Inside fn scope; minor. |
| C-03  | `pkgJson` (`client.ts:19`) | Low | Abbreviation of "packageJson". Local import alias; OK. |

### 2.6 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `GlobalInitScriptDetails` (returned by `getGlobalInitScript`, `client.ts:133`) — JSDoc says "including its Base64-encoded contents" | High | The entity type defines no `script` / `content` field at all, despite the method JSDoc claiming the contents are returned. Either the JSDoc is wrong, or the entity is missing a `script` field. This is a high-severity inconsistency between method docs and the entity shape — readers will look for content in the response and not find it. |

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                                          | Severity | Issue |
| ----- | ----------------------------------------------- | -------- | ----- |
| O-01  | `CreateGlobalInitScriptRequest` / `DeleteGlobalInitScriptRequest` / `GetGlobalInitScriptRequest` / `UpdateGlobalInitScriptRequest` / `ListGlobalInitScriptsRequest` (`model.ts:5`, `28`, `36`, `61`, `68`) | High | These are method-aligned request types but every type spells out `GlobalInitScript` in full plus the `Request` suffix, producing ~28-32-char identifiers for one-off request bodies. Since the surrounding namespace is already `globalinitscripts`, peers in other packages use shorter forms like `CreateRequest`, `CreatePolicy`, `CreateCluster`. The Databricks SDK convention is `Create<Entity>Request`, but here `Entity = GlobalInitScript` so each verb-typename pair runs long. Inherited from the API; flagged as an upstream/codegen-level concern. |
| O-02  | `GlobalInitScriptDetails` (entity name, `model.ts:41`) | Medium | The entity is named `*Details` whereas peer packages (e.g. `Policy`, `Cluster`) name the entity after the resource. `GlobalInitScript` would be the consistent name; the `Details` suffix adds 7 chars without disambiguation (there is no plain `GlobalInitScript` type to disambiguate from). The Go SDK mirrors this name, so this is a 1:1 port concern. |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `ListGlobalInitScriptsRequest` (request, plural) vs `listGlobalInitScripts()` (method, plural) | Low | Consistent. |
| P-02  | `ListGlobalInitScriptsRequest_Response.scripts` | Low | Plural field for array — correct. |
| P-03  | `GlobalInitScriptDetails` (singular entity) vs `getGlobalInitScript()` (singular get) | Low | Consistent. |
| P-04  | `createGlobalInitScript`, `deleteGlobalInitScript`, `updateGlobalInitScript` | Low | Singular for per-resource ops — correct. |

### 2.9 Reserved-word collisions — None

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | None observed.                      | —        | None of the field names (`name`, `script`, `position`, `enabled`, `scriptId`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`) collide with JavaScript reserved words. Note that `name` is a reserved property on `Function.prototype` but not a reserved identifier, so it is fine as a field name. |

### 2.10 Empty / trivial wrapper types — None

_None._

### 2.11 Duplicate concepts — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreateGlobalInitScriptRequest` vs `UpdateGlobalInitScriptRequest` (`model.ts:5`, `model.ts:68`) | Medium | Update adds only one field (`scriptId`); otherwise identical to create. Two near-duplicate 4-field interfaces. Codegen constraint, but readers see them side by side. |
| D-02  | `GlobalInitScriptDetails` vs `CreateGlobalInitScriptRequest` / `UpdateGlobalInitScriptRequest` | Medium | Same `name`, `position`, `enabled` fields appear in three types. The entity adds audit fields (`createdBy`, `createdAt`, etc.) but omits `script`. A shared base / fragment would reduce duplication. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createGlobalInitScript`, `deleteGlobalInitScript`, `getGlobalInitScript`, `listGlobalInitScripts`, `updateGlobalInitScript` | Low | All imperative present-tense — consistent. |
| T-02  | `createdBy`, `createdAt`, `updatedBy`, `updatedAt` | Low | Past participles for audit fields — correct convention. |
| T-03  | `enabled` (past participle / adjective) | Low | Consistent with the rest of the SDK (`enabled` boolean state). |

### 2.13 Go / Java-style names — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `GlobalInitScriptDetails` (Java-style "Details" suffix, `model.ts:41`) | Medium | Suffix `Details` is reminiscent of Java DTO conventions (`UserDetails`, `OrderDetails`). TS/JS naming tends to use the bare entity noun. See O-02. |
| G-02  | `req: CreateGlobalInitScriptRequest` (parameter named `req`, `client.ts:75`) | Low | Go-style parameter abbreviation. JS/TS convention is `request` for a parameter; `req` is also common in Express but uncommon as an SDK method parameter. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `GlobalInitScriptDetails.name` (`model.ts:45`) | Low | Standard entity field; meaning preserved in context. |
| F-02  | `httpReq`, `respBody`, `body`, `headers`, `text`, `parsed`, `info` (locals in `client.ts` / `utils.ts`) | Low | Local-scope identifiers only. |

### 2.15 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| FD-01 | None observed.                      | —        | All fields are domain-appropriate for the global-init-script context. |

### 2.16 Inconsistent action verbs — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `createGlobalInitScript`, `deleteGlobalInitScript`, `getGlobalInitScript`, `listGlobalInitScripts`, `updateGlobalInitScript` | Low | Clean CRUD verb set — `create`, `delete`, `get`, `list`, `update`. Matches the broader Databricks SDK style. No `edit` / `patch` / `modify` inconsistencies. |
| AV-02 | `getGlobalInitScript()` (singular) vs `listGlobalInitScripts()` (plural) | Low | Correct convention (singular get, plural list). Consistent. |

### 2.17 Long enum values — None

No enums declared; not applicable.

### 2.18 Underspecified IDs — Medium

_None._

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `GlobalInitScriptDetails` (`model.ts:41`) | Medium   | The entity name encodes both the resource (`GlobalInitScript`) and a descriptive suffix (`Details`). With no peer `GlobalInitScript` type to distinguish from, the suffix is purely redundant. See O-02 / G-01. |
| TS-02 | `HttpCallOptions` (utils) | Low | "Options" is conventional for option-bag types; not tautological. |
| TS-03 | `CallOptions` (imported) | Low | Same. |

### 2.20 Proto-architectural leaks — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| PL-01 | `CreateGlobalInitScriptRequest_Response` (`model.ts:23`) | High | The `Request_Response` infix is a verbatim leak of the proto nested-message naming (`Create<Entity>Request.Response`). The source comment on line 22 explicitly says "Proto-style nested message name". A TS-idiomatic response type would be `CreateGlobalInitScriptResponse` (or just `CreateResponse` since the package scope already implies the entity). |
| PL-02 | `DeleteGlobalInitScriptRequest_Response` (`model.ts:34`) | High | Same proto-nested leak. Suggested: `DeleteGlobalInitScriptResponse`. |
| PL-03 | `ListGlobalInitScriptsRequest_Response` (`model.ts:64`) | High | Same proto-nested leak. Suggested: `ListGlobalInitScriptsResponse`. |
| PL-04 | `UpdateGlobalInitScriptRequest_Response` (`model.ts:95`) | High | Same proto-nested leak. Suggested: `UpdateGlobalInitScriptResponse`. |
| PL-05 | `unmarshalCreateGlobalInitScriptRequest_ResponseSchema` (`model.ts:98`) | High | Schema identifier carries the proto nested-message infix. Suggested: `unmarshalCreateGlobalInitScriptResponseSchema`. |
| PL-06 | `unmarshalDeleteGlobalInitScriptRequest_ResponseSchema` (`model.ts:108`) | High | Same. Suggested: `unmarshalDeleteGlobalInitScriptResponseSchema`. |
| PL-07 | `unmarshalListGlobalInitScriptsRequest_ResponseSchema` (`model.ts:135`) | High | Same. Suggested: `unmarshalListGlobalInitScriptsResponseSchema`. |
| PL-08 | `unmarshalUpdateGlobalInitScriptRequest_ResponseSchema` (`model.ts:147`) | High | Same. Suggested: `unmarshalUpdateGlobalInitScriptResponseSchema`. |

### 2.21 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `GlobalInitScriptDetails.createdAt` / `updatedAt` (`number`, epoch ms) | Low | Acceptable for ms timestamps; the SDK exposes these as plain numbers. JS `Date` safe-integer range covers epoch-ms beyond year 285,000. Flagged for parity with other audits. |
| X-02  | `PACKAGE_SEGMENT` constant (`client.ts:43`) | Low | `SCREAMING_SNAKE_CASE` for a module-level constant — Google TS style permits this for "module-level constants … that are deeply immutable and used like enum constants" (https://google.github.io/styleguide/tsguide.html#constants). OK. |
| X-03  | `Client` (class name, `client.ts:48`) | Low | The class is named `Client` (not `GlobalInitScriptsClient`) within the per-package namespace. Consistent with peer packages. The import alias at call sites disambiguates (`import {Client as GlobalInitScriptsClient}` or similar). OK. |
| X-04  | `VERSION as AUTH_VERSION` (imported alias, `client.ts:3`) | Low | Aliasing on import is fine; communicates which version is being referenced. OK. |
| X-05  | `HttpClient`, `HttpRequest`, `HttpResponse` (imported) | Low | Consistent Google-style acronym casing. OK. |
| X-06  | `NoOpLogger` (imported) | Low | `NoOp` casing is correct for "no-op" (the term `no-op` is itself a contracted form). OK. |

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 10    |
| Medium   | 5     |
| Low      | 28    |
| **Total**| **43**|

### 3.2 Top themes

1. **`GlobalInitScriptDetails` should just be `GlobalInitScript`.**
   The `Details` suffix is a Java-style hangover with no peer type to
   disambiguate from. The method JSDoc also claims to return Base64
   content while the entity has no content field — a documentation /
   shape inconsistency.

2. **`createdAt`/`updatedAt` naming is good** — unlike sibling packages
   that use `createdAtTimestamp`, this package uses the cleaner
   `createdAt` / `updatedAt`. Worth keeping as the cross-package
   reference.

### 3.3 Suggested quick wins (advisory — codegen-level)

- Rename entity `GlobalInitScriptDetails` -> `GlobalInitScript`.
- Add the missing content field on the entity (or fix the JSDoc on
  `getGlobalInitScript` that claims contents are returned).

### 3.4 Cross-package consistency notes

- `position` field semantics are unique to this resource; no other
  package collides on the name with a different meaning.
- The clean `createdAt` / `updatedAt` naming here contrasts with
  `createdAtTimestamp` in `clusterpolicies` — this package is the
  preferred reference for timestamp naming.

---
