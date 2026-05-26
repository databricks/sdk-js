# Naming Audit: dataclassification

**Path:** `packages/dataclassification/src/v1/`
**Versions audited:** v1
**Inferred domain:** Data Classification configuration on Unity Catalog catalogs — enable/disable scanning, scope schemas, and configure auto-tagging of classified columns with governance/system tags.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 0 |
| Medium | 3 |
| Low | 6 |
| Observation | 4 |

## High severity

_None._

## Medium severity

### 1. `Client` class — `src/v1/client.ts:38`
- **Why weird:** A class literally named `Client` at the top level of the package's API surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `DataClassificationClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-dataclassification'` and `import {Client} from '@databricks/sdk-abacpolicies'` cannot, and must rename. Sister packages all share the same problem, suggesting a generator-level rename. Worth flagging upstream.

### 2. `buildHttpRequest` returns `HttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** A pure object-literal-with-optional-fields helper named "build" suggests something more elaborate (e.g., builder pattern). The function just spreads optional fields into a struct.
- **Category:** 1 (vague — "build" suggests heavyweight construction), 6 (misleading — implies builder pattern, is just an object literal).
- **Suggested name:** `makeHttpRequest` or inline at the call sites (the function is 16 lines and used 4 times).
- **Rationale:** "Build" carries connotations from Java/JS Builder patterns; this is just a shorthand. Using `make` or inlining would scan more clearly.

### 3. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** The function is exported but unused in `client.ts` (this package has no list endpoint with query params). Dead-code-shaped helper sitting in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it), 18 (carry-over from a different template).
- **Suggested name:** N/A — the function should not live in this package at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper. The naming is fine but the location is not.

## Low severity

### 4. `PACKAGE_SEGMENT` — `src/v1/client.ts:33`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. Constant is `UPPER_SNAKE_CASE` in a TS file otherwise dominated by camelCase. The casing is appropriate for a top-level constant, but the noun is weak.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain. The comment above does the work the name should.

### 5. `userAgent` field — `src/v1/client.ts:45`
- **Why weird:** `userAgent` is the canonical name for the header value, so this is fine. The field is `private readonly` — no problem with naming itself.
- **Category:** N/A (verification, no issue).
- **Suggested name:** unchanged.
- **Rationale:** Listed only to confirm canonical naming is preserved.

### 6. `Call` type and `call` variable — `src/v1/client.ts:77-87, 101-110, 121-131, 157-173`
- **Why weird:** Variable named `call` of type `Call` — same word for the variable, type, and the API method semantics. Inside `executeCall(call, options)` the verb-noun collision is jarring (`execute the call`).
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions read fine in IDE but obscure prose-style reads.

### 7. `req.parent ?? ''` / `req.name ?? ''` / `req.catalogConfig?.name ?? ''` URL composition — `src/v1/client.ts:74,100,119,148`
- **Why weird:** The client silently substitutes empty string for missing required path components, producing malformed URLs (e.g., `/api/data-classification/v1//config`). The naming is fine; the *handling* leaks via the optional types. Listed because `req.parent` and `req.name` are typed `string | undefined` while functionally required.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make `parent` and `name` required (non-optional) on the request types.
- **Rationale:** This is a type-shape issue more than a naming one, but it surfaces because the field names promise less than the API requires.

### 8. `respBody` vs `resp` variables — `src/v1/client.ts:81-86, 125-130, 167-172`
- **Why weird:** Two stages produce `respBody: Uint8Array` then `resp: CatalogConfig`. The names differ only by `Body`; the reader has to track that one is bytes, one is parsed. Abbreviating `response` to `resp` is fine but inconsistent with `req` (also abbreviated) which is also a parameter name.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `respBody` keeps `Body`, but `resp` drops the implied `Parsed`).
- **Suggested name:** `rawBody` + `result` (or `parsedResponse`).
- **Rationale:** Distinguish stages by meaningful nouns, not by suffix differences on the same root.

### 9. `httpReq` local variable — `src/v1/client.ts:80,104,124,160`
- **Why weird:** Inside a method that already has `req: CreateCatalogConfigRequest`, a second variable `httpReq: HttpRequest` shares the same `req` root with a different prefix. Easy to grab the wrong one.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s in the same scope).
- **Suggested name:** `httpRequest` (no abbreviation) or `wireRequest`.
- **Rationale:** Avoid forking the same identifier across two layers in the same scope. Spelling out `httpRequest` solves it.

## Observations

### 10. Wire/TS divergence is heavy
The model file is 206 lines for ~5 user-facing types; >half is wire-conversion and field-mask scaffolding. Same pattern as other audited packages. Not a naming problem, but the audit consistently surfaces how much generator boilerplate dominates each package.

### 11. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete` consistently — no `Fetch`/`Retrieve`/`Read`. No `List` endpoint in this package (the entity is a singleton per catalog, by design). Verb consistency is good. (Listed per rule 17 to note the absence of inconsistency.)

### 12. Acronym casing
The codebase mixes `Http` (PascalCase capital-then-lower) with `URLSearchParams` (Web standard ALLCAPS imported by name). Field uses `userAgent` (camelCase). No `Id`/`URL`/`UC` clashes encountered in this small package. The `Http`/`URL` split mirrors the JS ecosystem and is hard to fix locally.
- **Category:** 3 (acronym casing).

### 13. `dataclassification` lowercase package name
The package directory is `dataclassification` (one word, no separator), but every type/field uses `DataClassification` or `data-classification`. The HTTP path uses kebab-case `/api/data-classification/v1/`. The directory name's collapsed spelling looks like an abbreviation but isn't — it's just unsegmented. Worth flagging for SDK-wide convention (compare: should be `data-classification` to match other multi-word packages, but npm package names allow hyphens only via scopes).
- **Category:** 3 (casing inconsistency: directory `dataclassification` vs. wire `data-classification` vs. types `DataClassification`).

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the configured resource is a UC catalog).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `auto-tagging` / `auto-tag` — automatic application of governance tags to columns classified by the scanner (used both as gerund `AutoTagging` in types and as noun `AutoTag` in field names).
- `system tag` / `governance tag` — terminology in JSDoc for `classificationTag` (built-in vs. custom class tag keys).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (206 lines): read fully.
- `src/v1/client.ts` (181 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
