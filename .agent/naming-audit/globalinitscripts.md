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

| Name                                  | Purpose                                       |
| ------------------------------------- | --------------------------------------------- |
| `CreateGlobalInitScript`              | Request body for create.                      |
| `CreateGlobalInitScript_Response`     | Response from create (proto-style suffix).    |
| `DeleteGlobalInitScript`              | Request body (path param wrapper) for delete. |
| `DeleteGlobalInitScript_Response`     | Empty response from delete.                   |
| `GetGlobalInitScript`                 | Request body (path param wrapper) for get.    |
| `GlobalInitScriptDetails`             | Entity describing a global init script.       |
| `ListGlobalInitScripts`               | Empty request body for list.                  |
| `ListGlobalInitScripts_Response`      | Response from list.                           |
| `UpdateGlobalInitScript`              | Request body for update.                      |
| `UpdateGlobalInitScript_Response`     | Empty response from update.                   |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                              | Field        | Type / Notes                              |
| --------------------------------- | ------------ | ----------------------------------------- |
| `CreateGlobalInitScript`          | `name`       | `string?` — script display name.          |
| `CreateGlobalInitScript`          | `script`     | `Uint8Array?` — Base64-encoded content.   |
| `CreateGlobalInitScript`          | `position`   | `number?` — execution order index.        |
| `CreateGlobalInitScript`          | `enabled`    | `boolean?`                                |
| `CreateGlobalInitScript_Response` | `scriptId`   | `string?`                                 |
| `DeleteGlobalInitScript`          | `scriptId`   | `string?` — path parameter.               |
| `GetGlobalInitScript`             | `scriptId`   | `string?` — path parameter.               |
| `GlobalInitScriptDetails`         | `scriptId`   | `string?`                                 |
| `GlobalInitScriptDetails`         | `name`       | `string?`                                 |
| `GlobalInitScriptDetails`         | `position`   | `number?`                                 |
| `GlobalInitScriptDetails`         | `enabled`    | `boolean?`                                |
| `GlobalInitScriptDetails`         | `createdBy`  | `string?` — username.                     |
| `GlobalInitScriptDetails`         | `createdAt`  | `number?` — Unix timestamp in ms.         |
| `GlobalInitScriptDetails`         | `updatedBy`  | `string?` — username.                     |
| `GlobalInitScriptDetails`         | `updatedAt`  | `number?` — Unix timestamp in ms.         |
| `ListGlobalInitScripts_Response`  | `scripts`    | `GlobalInitScriptDetails[]?`              |
| `UpdateGlobalInitScript`          | `scriptId`   | `string?` — path parameter.               |
| `UpdateGlobalInitScript`          | `name`       | `string?`                                 |
| `UpdateGlobalInitScript`          | `script`     | `Uint8Array?` — Base64-encoded content.   |
| `UpdateGlobalInitScript`          | `position`   | `number?`                                 |
| `UpdateGlobalInitScript`          | `enabled`    | `boolean?`                                |

### 1.4 Methods (`client.ts`)

| Method                    | HTTP   | Returns                              |
| ------------------------- | ------ | ------------------------------------ |
| `createGlobalInitScript`  | POST   | `CreateGlobalInitScript_Response`    |
| `deleteGlobalInitScript`  | DELETE | `DeleteGlobalInitScript_Response`    |
| `getGlobalInitScript`     | GET    | `GlobalInitScriptDetails`            |
| `listGlobalInitScripts`   | GET    | `ListGlobalInitScripts_Response`     |
| `updateGlobalInitScript`  | PATCH  | `UpdateGlobalInitScript_Response`    |

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
| V-01  | `CreateGlobalInitScript.script` / `UpdateGlobalInitScript.script` | High | The field name `script` is overloaded inside a type whose entity name is already "script". A `CreateGlobalInitScript` whose payload field is `script` reads as "the script of the script". Worse, the JSDoc says it carries "Base64-encoded content". A name like `content`, `body`, or `scriptContent` would convey what the bytes actually are. |
| V-02  | `GlobalInitScriptDetails.position` | Medium | `position` is generic. Without the JSDoc the reader cannot tell whether it is an array index, a UI ordering hint, a priority, or an execution-order rank. `executionOrder`, `runOrder`, or `priority` would be more self-describing. |
| V-03  | `GlobalInitScriptDetails.name` | Low | Generic but standard across the SDK; acceptable in entity context. |

### 2.2 Redundant enum prefixes — None

No enums are declared in this package; this rubric category does not apply.

### 2.3 Acronym casing inconsistencies — Low

| ID    | Symbol                | Severity | Issue |
| ----- | --------------------- | -------- | ----- |
| A-01  | `HttpClient`, `httpClient` (imported from core) | Low | Google TS style uses `Http` (initial-only capitalisation for acronyms > 2 chars — https://google.github.io/styleguide/tsguide.html#identifiers). Consistent. |
| A-02  | `Uint8Array` | Low | Standard Web/TC39 typed-array name; OK. |
| A-03  | "Base64" in JSDoc | Low | The JSDoc on `CreateGlobalInitScript.script` writes "Base64" with mixed case — this is correct (the format name is `Base64`, not `BASE64`). Acceptable. |

### 2.4 Underscores in TS identifiers — High

| ID    | Symbol                                     | Severity | Issue |
| ----- | ------------------------------------------ | -------- | ----- |
| U-01  | `CreateGlobalInitScript_Response`          | High     | Underscores in TS type names violate Google TypeScript style (`UpperCamelCase` only — see https://google.github.io/styleguide/tsguide.html#naming-style). Each occurrence requires an `eslint-disable @typescript-eslint/naming-convention` annotation. Should be `CreateGlobalInitScriptResponse`. |
| U-02  | `DeleteGlobalInitScript_Response`          | High     | Same as U-01. |
| U-03  | `ListGlobalInitScripts_Response`           | High     | Same as U-01. |
| U-04  | `UpdateGlobalInitScript_Response`          | High     | Same as U-01. |
| U-05  | Wire-format keys (`script_id`, `created_by`, `created_at`, `updated_by`, `updated_at`) inside Zod schemas | Low | These are string literals inside `z.object({...})` — they are JSON keys on the wire, not TS identifiers. Not a naming-convention violation; correctly mapped to camelCase via `.transform`. |

### 2.5 Cryptic abbreviations — Low

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| C-01  | `req`, `resp`, `httpReq`, `respBody` (`client.ts`) | Low | Short-lived local identifiers; OK for short scope but `request` / `response` would be clearer at no cost. |
| C-02  | `opts` (`utils.ts` parameter) | Low | Inside fn scope; minor. |
| C-03  | `pkgJson` (`client.ts`) | Low | Abbreviation of "packageJson". Local import alias; OK. |

### 2.6 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `CreateGlobalInitScript.script` (field type `Uint8Array`) | High | The field is documented as "Base64-encoded content" but its TS type is `Uint8Array` — the marshal schema converts the bytes to Base64 via `btoa`. Callers therefore supply **raw bytes**, not Base64. The JSDoc is misleading: it describes the wire format, not what the caller hands in. A better split would be either rename to `scriptBytes` (matching the runtime type) or change the doc to "Raw bytes; the SDK Base64-encodes before sending." |
| M-02  | `UpdateGlobalInitScript.script` | High | Same as M-01. |
| M-03  | `GlobalInitScriptDetails` (returned by `getGlobalInitScript`) — JSDoc says "including its Base64-encoded contents" | High | The entity type defines no `script` / `content` field at all, despite the method JSDoc claiming the contents are returned. Either the JSDoc is wrong, or the entity is missing a `script` field. This is a high-severity inconsistency between method docs and the entity shape — readers will look for content in the response and not find it. |

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                                          | Severity | Issue |
| ----- | ----------------------------------------------- | -------- | ----- |
| O-01  | `CreateGlobalInitScript` / `DeleteGlobalInitScript` / `GetGlobalInitScript` / `UpdateGlobalInitScript` / `ListGlobalInitScripts` | High | These are method-aligned request types but every type spells out `GlobalInitScript` in full, producing ~22-25-char identifiers for one-off request bodies. Since the surrounding namespace is already `globalinitscripts`, peers in other packages use shorter forms like `CreateRequest`, `CreatePolicy`, `CreateCluster`. The Databricks SDK convention is `Create<Entity>`, but here `Entity = GlobalInitScript` so each verb-typename pair runs long. Inherited from the API; flagged as an upstream/codegen-level concern. |
| O-02  | `GlobalInitScriptDetails` (entity name) | Medium | The entity is named `*Details` whereas peer packages (e.g. `Policy`, `Cluster`) name the entity after the resource. `GlobalInitScript` would be the consistent name; the `Details` suffix adds 7 chars without disambiguation (there is no plain `GlobalInitScript` type to disambiguate from). The Go SDK mirrors this name, so this is a 1:1 port concern. |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `ListGlobalInitScripts` (request, plural) vs `listGlobalInitScripts()` (method, plural) | Low | Consistent. |
| P-02  | `ListGlobalInitScripts_Response.scripts` | Low | Plural field for array — correct. |
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
| D-01  | `CreateGlobalInitScript` vs `UpdateGlobalInitScript` | Medium | Update adds only one field (`scriptId`); otherwise identical to create. Two near-duplicate 4-field interfaces. Codegen constraint, but readers see them side by side. |
| D-02  | `GlobalInitScriptDetails` vs `CreateGlobalInitScript` / `UpdateGlobalInitScript` | Medium | Same `name`, `position`, `enabled` fields appear in three types. The entity adds audit fields (`createdBy`, `createdAt`, etc.) but omits `script`. A shared base / fragment would reduce duplication. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createGlobalInitScript`, `deleteGlobalInitScript`, `getGlobalInitScript`, `listGlobalInitScripts`, `updateGlobalInitScript` | Low | All imperative present-tense — consistent. |
| T-02  | `createdBy`, `createdAt`, `updatedBy`, `updatedAt` | Low | Past participles for audit fields — correct convention. |
| T-03  | `enabled` (past participle / adjective) | Low | Consistent with the rest of the SDK (`enabled` boolean state). |

### 2.13 Go / Java-style names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `CreateGlobalInitScript_Response` (proto nested-message style) | High | Direct port of Go / protobuf `pb.CreateGlobalInitScriptResponse` naming. TypeScript ecosystems do not use `_` between message and nested-message names; the file disables ESLint for each occurrence. Should adopt the TS-idiomatic `CreateGlobalInitScriptResponse`. Applies to all four `*_Response` interfaces. |
| G-02  | `GlobalInitScriptDetails` (Java-style "Details" suffix) | Medium | Suffix `Details` is reminiscent of Java DTO conventions (`UserDetails`, `OrderDetails`). TS/JS naming tends to use the bare entity noun. See O-02. |
| G-03  | `req: CreateGlobalInitScript` (parameter named `req`) | Low | Go-style parameter abbreviation. JS/TS convention is `request` for a parameter; `req` is also common in Express but uncommon as an SDK method parameter. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `GlobalInitScriptDetails.position` | Medium | `position` standing alone (e.g. inside a generic list-item display) is ambiguous: file position? UI position? Order index? Adding context (`runOrder`) would survive destructuring. |
| F-02  | `CreateGlobalInitScript.script` (`Uint8Array`) | High | A field called `script` of type `Uint8Array` does not communicate "bytes of the script content". Outside the interface it could be mistaken for a script object/handle. See V-01, M-01. |
| F-03  | `GlobalInitScriptDetails.name` | Low | Standard entity field; meaning preserved in context. |
| F-04  | `httpReq`, `respBody`, `body`, `headers`, `text`, `parsed`, `info` (locals in `client.ts` / `utils.ts`) | Low | Local-scope identifiers only. |

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

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `scriptId` | Medium | The field name `scriptId` is the API-level field but inside a workspace-scoped SDK there is at least one other ID concept called "script" (e.g. cluster init scripts via `clusters` package — see `InitScriptInfo`). A globally-unique identifier across the Databricks SDK surface would be `globalInitScriptId`. The shorter `scriptId` is in line with the API wire field, so this is a known trade-off, but ID names should generally be fully qualified to avoid cross-package ambiguity. |
| I-02  | `scriptId` (in `DeleteGlobalInitScript`, `GetGlobalInitScript`, `UpdateGlobalInitScript`) | Medium | Same as I-01. All five locations use the bare `scriptId`. |

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `GlobalInitScriptDetails`           | Medium   | The entity name encodes both the resource (`GlobalInitScript`) and a descriptive suffix (`Details`). With no peer `GlobalInitScript` type to distinguish from, the suffix is purely redundant. See O-02 / G-02. |
| TS-02 | `HttpCallOptions` (utils) | Low | "Options" is conventional for option-bag types; not tautological. |
| TS-03 | `CallOptions` (imported) | Low | Same. |

### 2.20 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `GlobalInitScriptDetails.createdAt` / `updatedAt` (`number`, epoch ms) | Low | Acceptable for ms timestamps; the SDK exposes these as plain numbers. JS `Date` safe-integer range covers epoch-ms beyond year 285,000. Flagged for parity with other audits. |
| X-02  | `PACKAGE_SEGMENT` constant | Low | `SCREAMING_SNAKE_CASE` for a module-level constant — Google TS style permits this for "module-level constants … that are deeply immutable and used like enum constants" (https://google.github.io/styleguide/tsguide.html#constants). OK. |
| X-03  | `Client` (class name) | Low | The class is named `Client` (not `GlobalInitScriptsClient`) within the per-package namespace. Consistent with peer packages. The import alias at call sites disambiguates (`import {Client as GlobalInitScriptsClient}` or similar). OK. |
| X-04  | `VERSION as AUTH_VERSION` (imported alias) | Low | Aliasing on import is fine; communicates which version is being referenced. OK. |
| X-05  | `HttpClient`, `HttpRequest`, `HttpResponse` (imported) | Low | Consistent Google-style acronym casing. OK. |
| X-06  | `NoOpLogger` (imported) | Low | `NoOp` casing is correct for "no-op" (the term `no-op` is itself a contracted form). OK. |

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 11    |
| Medium   | 12    |
| Low      | 27    |
| **Total**| **50**|

### 3.2 Top themes

1. **Proto-style `_Response` suffix pollutes every CRUD response type.**
   Four interfaces (`CreateGlobalInitScript_Response`,
   `DeleteGlobalInitScript_Response`, `ListGlobalInitScripts_Response`,
   `UpdateGlobalInitScript_Response`) each require an `eslint-disable`
   for the naming-convention rule. Renaming to TS-idiomatic
   `CreateGlobalInitScriptResponse` etc. would eliminate the
   disable-comments and a Google-style violation in one sweep.

2. **`script` field overload conflates "script bytes" with "the entity".**
   The field is typed as `Uint8Array` (raw bytes), documented as
   "Base64-encoded content" (the wire format), and lives on a type
   already called `GlobalInitScript`. Renaming the field to `content`
   (or `scriptBytes`) — and clarifying the JSDoc — removes both the
   self-reference ("script.script") and the format-vs-runtime confusion.

3. **`GlobalInitScriptDetails` should just be `GlobalInitScript`.**
   The `Details` suffix is a Java-style hangover with no peer type to
   disambiguate from. The method JSDoc also claims to return Base64
   content while the entity has no content field — a documentation /
   shape inconsistency.

4. **`createdAt`/`updatedAt` naming is good** — unlike sibling packages
   that use `createdAtTimestamp`, this package uses the cleaner
   `createdAt` / `updatedAt`. Worth keeping as the cross-package
   reference.

### 3.3 Suggested quick wins (advisory — codegen-level)

- Drop the `_Response` underscore: `CreateGlobalInitScriptResponse`,
  `DeleteGlobalInitScriptResponse`, `ListGlobalInitScriptsResponse`,
  `UpdateGlobalInitScriptResponse`. Removes ESLint disables.
- Rename `script` field to `content` (or `scriptContent`).
- Rename entity `GlobalInitScriptDetails` -> `GlobalInitScript`.
- Add the missing content field on the entity (or fix the JSDoc on
  `getGlobalInitScript` that claims contents are returned).

### 3.4 Cross-package consistency notes

- The `Proto-style nested message name` `_Response` suffix is consistent
  with peers and should be addressed at the codegen level.
- `position` field semantics are unique to this resource; no other
  package collides on the name with a different meaning.
- The clean `createdAt` / `updatedAt` naming here contrasts with
  `createdAtTimestamp` in `clusterpolicies` — this package is the
  preferred reference for timestamp naming.
