# Naming Audit: `policyfamilies` (v2)

**Package:** `@databricks/sdk-policyfamilies`
**Path:** `/home/parth.bansal/sdk-js/packages/policyfamilies/`
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

| Name        | Members |
| ----------- | ------- |
| (none)      | —       |

The package defines no enums.

### 1.2 Interfaces (`model.ts`)

| Name                                   | Purpose                                            |
| -------------------------------------- | -------------------------------------------------- |
| `GetPolicyFamilyRequest`               | Request body for the single-resource GET endpoint. |
| `ListPolicyFamiliesRequest`            | Request body for the list endpoint.                |
| `ListPolicyFamiliesRequest_Response`   | Response from list (proto-style nested name).      |
| `PolicyFamily`                         | The policy-family entity itself.                   |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                                   | Field             | Type / Notes                                          |
| -------------------------------------- | ----------------- | ----------------------------------------------------- |
| `GetPolicyFamilyRequest`               | `policyFamilyId`  | `string?` — path parameter (the resource identifier). |
| `GetPolicyFamilyRequest`               | `version`         | `number?` — version number to fetch (defaults to latest). |
| `ListPolicyFamiliesRequest`            | `maxResults`      | `number?` — page size.                                |
| `ListPolicyFamiliesRequest`            | `pageToken`       | `string?` — pagination cursor.                        |
| `ListPolicyFamiliesRequest_Response`   | `policyFamilies`  | `PolicyFamily[]?` — page of results.                  |
| `ListPolicyFamiliesRequest_Response`   | `nextPageToken`   | `string?` — pagination cursor for next page.          |
| `PolicyFamily`                         | `policyFamilyId`  | `string?` — unique identifier.                        |
| `PolicyFamily`                         | `name`            | `string?` — display name.                             |
| `PolicyFamily`                         | `description`     | `string?` — human-readable description.               |
| `PolicyFamily`                         | `definition`      | `string?` — Databricks Cluster Policy Definition Language JSON. |

### 1.4 Methods (`client.ts`)

| Method                  | Verb | Returns                              |
| ----------------------- | ---- | ------------------------------------ |
| `getPolicyFamily`       | GET  | `PolicyFamily`                       |
| `listPolicyFamilies`    | GET  | `ListPolicyFamiliesRequest_Response` |
| `listPolicyFamiliesIter`| GET  | `AsyncGenerator<PolicyFamily>` (paginated) |

### 1.5 Other identifiers

- `client.ts`: `PACKAGE_SEGMENT` constant; `Client` class with private
  fields `host`, `httpClient`, `logger`, `userAgent`.
- `client.ts` local variables in methods: `url`, `params`, `query`,
  `fullUrl`, `resp`, `call`, `callSignal`, `headers`, `httpReq`, `respBody`,
  `pageReq`, `item`, `info`.
- `utils.ts`: `HttpCallOptions` interface; functions `executeCall`,
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`,
  `marshalRequest`, `flattenQueryParams`.

---

## 2. Findings by Category

### 2.1 Vague / generic names — High & Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| V-01  | `PolicyFamily.name` (`model.ts:33`)                  | Low      | Generic but standard for entity types; meaning is preserved by the parent type. |
| V-02  | `PolicyFamily.description` (`model.ts:35`)           | Low      | Generic but standard across the SDK; acceptable. |
| V-03  | `flattenQueryParams` (`utils.ts:123`)                | Low      | Reasonable. |

### 2.2 Redundant enum prefixes — High

| ID   | Symbol  | Severity | Issue |
| ---- | ------- | -------- | ----- |
| E-01 | (none)  | —        | The package defines no enums. |

### 2.3 Acronym casing inconsistencies — High

| ID    | Symbol                | Severity | Issue |
| ----- | --------------------- | -------- | ----- |
| A-01  | `httpClient`, `HttpClient`, `HttpCallOptions`, `HttpRequest`, `HttpResponse`, `httpReq` | Low | `Http` (lowercased) follows Google TS style for acronyms ≥3 chars. Consistent with the rest of the SDK. |
| A-02  | `URLSearchParams` (local in `client.ts`)              | Low      | DOM API; uses uppercase `URL` because that is the platform-defined identifier. Acceptable. |

### 2.4 Underscores in TS identifiers — High

_None._

### 2.5 Cryptic abbreviations — Medium

| ID    | Symbol                                            | Severity | Issue |
| ----- | ------------------------------------------------- | -------- | ----- |
| C-01  | `req`, `resp` (locals in `client.ts`)             | Low      | Inside method scope; OK for short-lived locals but `request` / `response` would be clearer at no cost. Used in every CRUD method. |
| C-02  | `httpReq` (local in `client.ts`)                  | Low      | Short for "HTTP request". OK in local scope. |
| C-03  | `respBody` (local in `client.ts`)                 | Low      | Short for "response body". OK in local scope. |
| C-04  | `pageReq` (local in `client.ts:133`)              | Low      | Short for "page request". OK. |
| C-05  | `opts` (`utils.ts` parameter, `executeHttpCall` and `executeCall`) | Low | Inside fn scope; minor. |
| C-06  | `pkgJson` (import in `client.ts:18`)              | Low      | Short for `packageJson`. Consistent with peer packages' codegen output. |
| C-07  | `acc` (local in `utils.ts:55` reduce callback)    | Low      | Standard reduce-accumulator name. OK. |

### 2.6 Misleading names — High

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| M-01  | `Client` (`client.ts:36`)                            | Medium   | Bare `Client` (with no domain qualifier) is ambiguous when imported into application code that uses multiple SDK packages — e.g. `import {Client as PolicyFamiliesClient} from '@databricks/sdk-policyfamilies/v2'` requires an alias to disambiguate from `Client` exported from `clusterpolicies`, `clusters`, etc. `PolicyFamiliesClient` would self-disambiguate. (Repo-wide pattern; flagged for consistency review at the codegen layer.) |

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| O-01  | `policyFamilyId` (every occurrence)                  | Low      | 14 chars but precise. Two `policyFamily*` fields would collapse to one once the type name (`PolicyFamily`) is in scope, but it remains unambiguous across the SDK and matches the upstream API field name. Accept. |
| O-02  | `PACKAGE_SEGMENT` (`client.ts:31`)                   | Low      | OK in context. |
| O-03  | `ListPolicyFamiliesRequest_Response` (`model.ts:22`) | Medium   | The `Request_Response` compound suffix is verbose — the proto-nested style yields a name where `Request` is carried into the response type even though the response is not a request. A flatter `ListPolicyFamiliesResponse` would self-describe. (Generator-level.) |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| P-01  | `getPolicyFamily()` (singular)                       | Low      | Singular for a single-resource GET. Correct. |
| P-02  | `listPolicyFamilies()` (plural method)               | Low      | Plural for a collection endpoint. Correct. |
| P-03  | `ListPolicyFamiliesRequest` request type vs `listPolicyFamilies` method | Low | Both plural and matched. Correct. |
| P-04  | `ListPolicyFamiliesRequest_Response.policyFamilies`  | Low      | Plural field for an array of `PolicyFamily`. Correct. |
| P-05  | Package directory `policyfamilies` (lowercase)       | Low      | The npm package is `@databricks/sdk-policyfamilies` (lowercase, no separator). Compare with `clusterpolicies`, `clusterlibraries`, `instancepools`. Convention is consistent across this codebase — squashed lowercase. The directory and package name use plural ("families") which matches the dominant resource the package exposes. Acceptable but visually awkward (`policyfamilies` is hard to parse versus `policy-families`); a hyphenated path / scoped suffix would be more readable. (Pattern is repo-wide; flagged once.) |
| P-06  | `PolicyFamily` (entity, singular) vs `policyfamilies` (package directory, plural) | Low | Standard pattern — the package is plural, the entity it contains is singular. OK. |

### 2.9 Reserved-word collisions — Medium

| ID    | Symbol  | Severity | Issue |
| ----- | ------- | -------- | ----- |
| R-01  | (none observed) | — | None of the field, type, or method names in this package collide with JS reserved or future-reserved words. |

### 2.10 Empty / trivial wrapper types — Medium

_None._

### 2.11 Duplicate concepts (vs `clusterpolicies`) — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| D-01  | `PolicyFamily.policyFamilyId` (here) and `Policy.policyFamilyId` (in `clusterpolicies`) | Low | The field name is consistent across packages — good. No duplication concern. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| T-01  | `getPolicyFamily`, `listPolicyFamilies`              | Low      | Both imperative present-tense — consistent. |
| T-02  | `executeCall`, `executeHttpCall`, `buildHttpRequest`, `flattenQueryParams`, `readAll` | Low | All imperative present-tense — consistent. |

### 2.13 Go / Java-style names — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| G-01  | `HttpClient`, `HttpRequest`, `HttpResponse`          | Low      | Google TS style uses `Http` (lowercased acronym) — consistent. Not a Go-style violation. |
| G-02  | `executeCall`, `executeHttpCall`                     | Medium   | The dual-naming (`Call` vs `HttpCall`) communicates the wrapping relationship in a Go-style "the inner one is HTTP-specific, the outer one is a generic retry/timeout decorator" idiom. Acceptable; common pattern in the Go SDK at `databricks/sdk-go/transport/`. |
| G-03  | `buildHttpRequest`                                   | Low      | "Build" is fine in TS; the naming is broadly used. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| F-01  | `name` (on `PolicyFamily`)                           | Low      | Universal noun; meaning is preserved through type context. OK. |
| F-02  | `description` (on `PolicyFamily`)                    | Low      | Same as F-01. |
| F-03  | `url`, `params`, `query`, `fullUrl`, `headers`, `body` (locals in `client.ts`) | Low | Locals only; standard naming. OK. |

### 2.15 Field contradicting type domain — Low

| ID    | Symbol  | Severity | Issue |
| ----- | ------- | -------- | ----- |
| FC-01 | (none observed) | — | All fields are domain-appropriate for the policy-family context. |

### 2.16 Inconsistent action verbs — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| AV-01 | `getPolicyFamily()` (singular get) vs `listPolicyFamilies()` (plural list) | Low | Correct convention: singular `get` for one-resource, plural `list` for many. Consistent. |
| AV-02 | The package exposes only **read** verbs — `get`, `list`. There are no `create` / `update` / `delete` methods (the API is read-only). The verb set is consistent with the API's read-only nature. | Low | OK. |

### 2.17 Long enum values — Medium

| ID   | Symbol  | Severity | Issue |
| ---- | ------- | -------- | ----- |
| L-01 | (none)  | —        | The package defines no enums. |

### 2.18 Underspecified IDs — High

| ID    | Symbol            | Severity | Issue |
| ----- | ----------------- | -------- | ----- |
| I-01  | `policyFamilyId`  | Low      | Well-specified: scope = policy family. No collision with workspace / account / cluster / policy IDs in this package or in cross-package usage. Good. |
| I-02  | No bare `id` field anywhere. | — | The package consistently uses the scoped form `policyFamilyId`. Compliant with the "no bare `id`" guideline. |

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| TS-01 | `PolicyFamily` — does the `Family` suffix double up with `Policy`? | Low | `PolicyFamily` is the domain term used in the Databricks docs (cf. https://docs.databricks.com/en/admin/clusters/policy-families.html). The "Family" here means *grouping/template*, not a `*Family` type-suffix tautology. OK. |
| TS-02 | `GetPolicyFamilyRequest`, `ListPolicyFamiliesRequest` — all carry the resource noun | Low | Standard request/response naming; the resource noun is essential for disambiguation across the SDK. OK. |
| TS-03 | `HttpCallOptions` (`utils.ts:15`)                    | Low      | The `Options` suffix is a standard TS pattern (`fetch` accepts `RequestInit`, but `Options` is widespread). OK. |

### 2.20 Proto / architectural-leak naming — High

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| PL-01 | `ListPolicyFamiliesRequest_Response` (`model.ts:22`, `model.ts:41`, `client.ts:22`, `client.ts:26`, `client.ts:96`, `client.ts:107`, `client.ts:119`, `index.ts:10`) | High | The mid-position `Request_` token leaks proto's nested-message convention (`ListPolicyFamiliesRequest.Response` flattened with `_`). `Request` is meaningless mid-name on a response type and forces an `eslint-disable` for `@typescript-eslint/naming-convention`. **Suggested:** `ListPolicyFamiliesResponse`. **Rationale:** drops the proto-architectural leak; aligns with idiomatic TS `<Verb><Resource>Response`. (Generator-level.) |
| PL-02 | `unmarshalListPolicyFamiliesRequest_ResponseSchema` (`model.ts:41`, `client.ts:26`, `client.ts:119`) | High | Same proto-nested leak carried into the schema constant. **Suggested:** `unmarshalListPolicyFamiliesResponseSchema`. **Rationale:** removes the `Request_` infix; matches PL-01. (Generator-level.) |

### 2.21 Other observations

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| X-01  | `version` typed as `number` (`GetPolicyFamilyRequest.version`) | Low | The API contract uses an integer version. `number` is fine; flagged for completeness. No `bigint` is needed (versions won't exceed `Number.MAX_SAFE_INTEGER`). |
| X-02  | `pageToken` / `nextPageToken` (cross-pagination field naming) | Low | Standard Databricks SDK pagination shape. The request-side cursor is `pageToken`, the response-side cursor is `nextPageToken` — consistent with `clusterpolicies`, `instancepools`, etc. OK. |
| X-03  | `maxResults` (`ListPolicyFamiliesRequest.maxResults`) | Low     | Standard pagination field name. OK. |
| X-04  | `Client.host` is mutated post-construction via `replace(/\/$/, '')` only at constructor entry | Low | Naming-wise neutral; not strictly a naming issue. The field name `host` (rather than `baseUrl` or `endpoint`) is consistent with peer packages. |
| X-05  | `Client.userAgent` (private)                         | Low      | Standard naming; HTTP `User-Agent` is the wire-format identifier. OK. |
| X-06  | `executeCall` parameter `call: Call`                 | Low      | The type `Call` is generic from `@databricks/sdk-core/api` and overloads the verb; readers may briefly wonder which "call" is meant (function callback vs. RPC call). Imported from the core package; flagged once. |
| X-07  | `callSignal` (local in `client.ts`)                  | Low      | Distinct from `req.signal` / `options?.signal` — the qualifier `call` disambiguates. Good. |
| X-08  | `flattenQueryParams` (utils, exported)                | Low      | Exported but `client.ts` builds query strings manually with `URLSearchParams.append`. Either remove or use it. Not strictly a naming issue. |
| X-09  | `pageReq` (local in `client.ts:133`)                 | Low      | Mutated per iteration. Naming reasonable; an alternative `nextRequest` reads slightly clearer. |
| X-10  | `index.ts:5` has `export {} from './model';` (empty re-export) | Low | The empty `export {}` is dead code emitted by codegen. Naming-neutral. Should be removed by codegen, not a per-package fix. |
| X-11  | The package directory `policyfamilies/` is squashed lowercase | Low | Cross-codebase pattern; cf. P-05. The package name choice influences method placement (a future `databricks.policyFamilies.get(...)` aggregator should keep the same casing). |
| X-12  | The class is exported simply as `Client` from `client.ts` and re-exported from `index.ts` | Medium | See M-01. Consumers must import `{Client as PolicyFamiliesClient}` to disambiguate. Codegen could emit `export class PolicyFamiliesClient` to relieve the alias burden. |

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 2     |
| Medium   | 5     |
| Low      | 24    |
| **Total**| **31**|

### 3.2 Top themes

1. **Read-only API ⇒ minimal naming surface.** With only two endpoints
   (`getPolicyFamily`, `listPolicyFamilies`) and one entity (`PolicyFamily`),
   the package introduces almost no domain-specific naming. The majority of
   issues are repo-wide patterns (the bare `Client` class name) rather than
   per-package mistakes.

2. **Proto-architectural leak in response type name.**
   `ListPolicyFamiliesRequest_Response` (and the matching
   `unmarshalListPolicyFamiliesRequest_ResponseSchema`) carry the
   proto-nested `Request_Response` compound suffix into idiomatic TS. The
   `Request` token mid-name is meaningless on a response type and forces an
   `eslint-disable` for the naming-convention rule.

### 3.3 Suggested quick wins
(non-breaking renames are not possible — this section is advisory for the
codegen owners)

- Rename `Client` → `PolicyFamiliesClient` for cross-package
  disambiguation. (Repo-wide pattern; flag at codegen layer.)
- Flatten `ListPolicyFamiliesRequest_Response` → `ListPolicyFamiliesResponse`
  to drop the proto-nested `Request_Response` compound suffix.

### 3.4 Cross-package consistency notes

- The bare `Client` class name is consistent with peers; a codegen-level
  rename to `<Resource>Client` would help all packages.
- `PolicyFamily.policyFamilyId` matches `Policy.policyFamilyId` in the
  `clusterpolicies` package — cross-package field naming is consistent.

---
