# Naming Audit: dataclassification

**Path:** `packages/dataclassification/src/v1/`
**Versions audited:** v1
**Inferred domain:** Data Classification configuration on Unity Catalog catalogs — enable/disable scanning, scope schemas, and configure auto-tagging of classified columns with governance/system tags.
**Total weird names flagged:** 19

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 4 |
| Low | 6 |
| Observation | 4 |

## High severity

### 1. `autoTagConfigs` field vs. `AutoTaggingConfig` type — `src/v1/model.ts:57,62`
- **Why weird:** Field name uses abbreviated `autoTag` while the type it points to is the full `AutoTaggingConfig`. Within five lines the SDK uses both `tag`-noun and `tagging`-gerund for the same concept.
- **Category:** 5 (cryptic abbreviation — `Tag` for `Tagging`), 17 (inconsistency with sibling type — `autoTagConfigs: AutoTaggingConfig[]`).
- **Suggested name:** `autoTaggingConfigs: AutoTaggingConfig[]` (and `effectiveAutoTaggingConfigs`). Wire stays `auto_tag_configs` if upstream insists.
- **Rationale:** A field of `Foo[]` should plural-ise the type name: `foos: Foo[]`. Mixing `autoTag` and `AutoTagging` makes the relationship unobvious and forces a mental translation on every read.

### 2. `effectiveAutoTagConfigs` — `src/v1/model.ts:62`
- **Why weird:** Two parallel fields (`autoTagConfigs` for owned + `effectiveAutoTagConfigs` for owned-plus-inherited) on the same type. "Effective" is fine on its own, but the parent type does not say which is read-only vs. write — a caller can easily set `effectiveAutoTagConfigs` thinking it will take effect.
- **Category:** 1 (vague — `effective` does not communicate "computed/read-only" on its own), 6 (misleading: looks settable but is server-computed).
- **Suggested name:** `inheritedAutoTaggingConfigs` (or split into `autoTaggingConfigs` + `computedAutoTaggingConfigs` with a JSDoc `@readonly`).
- **Rationale:** SDK fields without an output-only marker invite write-side mistakes. The current doc says "Computed from auto_tag_configs on this catalog and those inherited from the metastore" but the type does not enforce that.

### 3. `name` field on `CatalogConfig` / `DeleteCatalogConfigRequest` / `GetCatalogConfigRequest` — `src/v1/model.ts:42,88,94`
- **Why weird:** Field literally called `name` carries a structured resource path (`catalogs/{catalog_name}/config`), not a free-form name. `name` is the most generic possible identifier and gives no hint that it must follow a specific format.
- **Category:** 1 (vague — `name` is the canonical too-generic field name), 6 (misleading — looks like a display name, is actually a structured resource path), 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `resourceName` or `configResourceName`. If staying with `name`, the JSDoc should at least be on the type rather than only on each field.
- **Rationale:** A user importing `CatalogConfig` and seeing `name?: string` will almost certainly try to put `"my-catalog"` in there, not `"catalogs/my-catalog/config"`. The wire constraint is invisible from the type.

### 4. `parent` field on `CreateCatalogConfigRequest` — `src/v1/model.ts:77`
- **Why weird:** Field called `parent` carries the structured value `catalogs/{catalog_name}`. The relationship "catalog is the parent of catalog-config" is a proto/AIP-160 convention that does not survive into a TS SDK where users do not see the resource hierarchy.
- **Category:** 1 (vague — `parent` of what?), 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `catalogResourceName` or `parentCatalog`.
- **Rationale:** `parent: string` is a Google-AIP idiom; outside that context a caller has no idea what shape to put in. A user-friendly TS SDK would either accept `{catalogName: 'my-catalog'}` directly or rename to make the constraint visible.

### 5. `classificationTag` and `classificationTagValue` — `src/v1/model.ts:25,32`
- **Why weird:** The pair encodes a `(key, value)` tag, but the names are `tag` and `tagValue` instead of `tagKey` and `tagValue`. The first field actually holds the tag *key* per its doc ("For built-in classes this is a system tag (e.g., \"class.name\"...)"). Calling the key "the Classification Tag" while the value is "the Classification Tag Value" makes the parts asymmetric.
- **Category:** 1 (vague — `classificationTag` is the key, not the whole tag), 6 (misleading — name suggests "the tag" but it is one half of one), 17 (asymmetric pair naming — `tag` vs `tagValue`).
- **Suggested name:** `classificationTagKey` + `classificationTagValue` (or `tagKey` + `tagValue`).
- **Rationale:** Symmetric `key`/`value` field names are the standard idiom for tag pairs across Unity Catalog (`tagKey`/`tagValue` appears in `unitycatalog` packages). The current name asymmetry suggests the two fields hold different kinds of thing when they hold two halves of one.

## Medium severity

### 6. `Client` class — `src/v1/client.ts:38`
- **Why weird:** A class literally named `Client` at the top level of the package's API surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `DataClassificationClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-dataclassification'` and `import {Client} from '@databricks/sdk-abacpolicies'` cannot, and must rename. Sister packages all share the same problem, suggesting a generator-level rename. Worth flagging upstream.

### 7. `CreateCatalogConfigRequest` / `DeleteCatalogConfigRequest` / `GetCatalogConfigRequest` / `UpdateCatalogConfigRequest` — `src/v1/model.ts:75,86,92,103`
- **Why weird:** All four request DTOs repeat the noun `CatalogConfig` even though the only thing this package operates on is `CatalogConfig`. The package name itself is `dataclassification`. In context, `CreateRequest`/`UpdateRequest` would be plenty.
- **Category:** 7 (overly verbose), 8 (redundant suffix and infix).
- **Suggested name:** `CreateRequest`/`UpdateRequest`/`DeleteRequest`/`GetRequest`, or keep `Catalog` and drop `Config`: `CreateCatalogRequest`/...
- **Rationale:** The whole package operates on exactly one entity. Repeating its name in four request types is pure noise. (However, the inconsistency with the entire rest of the SDK matters — proposing as a per-package fix is risky. Listed medium not high.)

### 8. `buildHttpRequest` returns `HttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** A pure object-literal-with-optional-fields helper named "build" suggests something more elaborate (e.g., builder pattern). The function just spreads optional fields into a struct.
- **Category:** 1 (vague — "build" suggests heavyweight construction), 6 (misleading — implies builder pattern, is just an object literal).
- **Suggested name:** `makeHttpRequest` or inline at the call sites (the function is 16 lines and used 4 times).
- **Rationale:** "Build" carries connotations from Java/JS Builder patterns; this is just a shorthand. Using `make` or inlining would scan more clearly.

### 9. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** The function is exported but unused in `client.ts` (this package has no list endpoint with query params). Dead-code-shaped helper sitting in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it), 18 (carry-over from a different template).
- **Suggested name:** N/A — the function should not live in this package at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper. The naming is fine but the location is not.

## Low severity

### 10. `PACKAGE_SEGMENT` — `src/v1/client.ts:33`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. Constant is `UPPER_SNAKE_CASE` in a TS file otherwise dominated by camelCase. The casing is appropriate for a top-level constant, but the noun is weak.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain. The comment above does the work the name should.

### 11. `userAgent` field — `src/v1/client.ts:45`
- **Why weird:** `userAgent` is the canonical name for the header value, so this is fine. The field is `private readonly` — no problem with naming itself.
- **Category:** N/A (verification, no issue).
- **Suggested name:** unchanged.
- **Rationale:** Listed only to confirm canonical naming is preserved.

### 12. `Call` type and `call` variable — `src/v1/client.ts:77-87, 101-110, 121-131, 157-173`
- **Why weird:** Variable named `call` of type `Call` — same word for the variable, type, and the API method semantics. Inside `executeCall(call, options)` the verb-noun collision is jarring (`execute the call`).
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions read fine in IDE but obscure prose-style reads.

### 13. `req.parent ?? ''` / `req.name ?? ''` / `req.catalogConfig?.name ?? ''` URL composition — `src/v1/client.ts:74,100,119,148`
- **Why weird:** The client silently substitutes empty string for missing required path components, producing malformed URLs (e.g., `/api/data-classification/v1//config`). The naming is fine; the *handling* leaks via the optional types. Listed because `req.parent` and `req.name` are typed `string | undefined` while functionally required.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make `parent` and `name` required (non-optional) on the request types.
- **Rationale:** This is a type-shape issue more than a naming one, but it surfaces because the field names promise less than the API requires.

### 14. `respBody` vs `resp` variables — `src/v1/client.ts:81-86, 125-130, 167-172`
- **Why weird:** Two stages produce `respBody: Uint8Array` then `resp: CatalogConfig`. The names differ only by `Body`; the reader has to track that one is bytes, one is parsed. Abbreviating `response` to `resp` is fine but inconsistent with `req` (also abbreviated) which is also a parameter name.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `respBody` keeps `Body`, but `resp` drops the implied `Parsed`).
- **Suggested name:** `rawBody` + `result` (or `parsedResponse`).
- **Rationale:** Distinguish stages by meaningful nouns, not by suffix differences on the same root.

### 15. `httpReq` local variable — `src/v1/client.ts:80,104,124,160`
- **Why weird:** Inside a method that already has `req: CreateCatalogConfigRequest`, a second variable `httpReq: HttpRequest` shares the same `req` root with a different prefix. Easy to grab the wrong one.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s in the same scope).
- **Suggested name:** `httpRequest` (no abbreviation) or `wireRequest`.
- **Rationale:** Avoid forking the same identifier across two layers in the same scope. Spelling out `httpRequest` solves it.

## Observations

### 16. Wire/TS divergence is heavy
The model file is 229 lines for ~5 user-facing types; >half is wire-conversion and field-mask scaffolding. Same pattern as other audited packages. Not a naming problem, but the audit consistently surfaces how much generator boilerplate dominates each package.

### 17. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete` consistently — no `Fetch`/`Retrieve`/`Read`. No `List` endpoint in this package (the entity is a singleton per catalog, by design). Verb consistency is good. (Listed per rule 17 to note the absence of inconsistency.)

### 18. Acronym casing
The codebase mixes `Http` (PascalCase capital-then-lower) with `URLSearchParams` (Web standard ALLCAPS imported by name). Field uses `userAgent` (camelCase). No `Id`/`URL`/`UC` clashes encountered in this small package. The `Http`/`URL` split mirrors the JS ecosystem and is hard to fix locally.
- **Category:** 3 (acronym casing).

### 19. `dataclassification` lowercase package name
The package directory is `dataclassification` (one word, no separator), but every type/field uses `DataClassification` or `data-classification`. The HTTP path uses kebab-case `/api/data-classification/v1/`. The directory name's collapsed spelling looks like an abbreviation but isn't — it's just unsegmented. Worth flagging for SDK-wide convention (compare: should be `data-classification` to match other multi-word packages, but npm package names allow hyphens only via scopes).
- **Category:** 3 (casing inconsistency: directory `dataclassification` vs. wire `data-classification` vs. types `DataClassification`).

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the configured resource is a UC catalog).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `auto-tagging` / `auto-tag` — automatic application of governance tags to columns classified by the scanner (used both as gerund `AutoTagging` in types and as noun `AutoTag` in field names — see #1).
- `system tag` / `governance tag` — terminology in JSDoc for `classificationTag` (built-in vs. custom class tag keys).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (229 lines): read fully.
- `src/v1/client.ts` (181 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
