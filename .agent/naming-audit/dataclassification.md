# Naming Audit: dataclassification

**Path:** `packages/dataclassification/src/v1/`
**Versions audited:** v1
**Inferred domain:** Data Classification configuration on Unity Catalog catalogs — enable/disable scanning, scope schemas, and configure auto-tagging of classified columns with governance/system tags.
**Total weird names flagged:** 29

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 11 |
| Low | 7 |
| Observation | 4 |

## High severity

### 1. `AutoTaggingConfig_AutoTaggingMode` — `src/v1/model.ts:9`
- **Why weird:** Underscore in TS identifier (proto-style nested enum name). Required `eslint-disable @typescript-eslint/naming-convention`. The outer container `AutoTaggingConfig` is already in scope of import, so the prefix is redundant; the underscore is a leaky proto abstraction.
- **Category:** 4 (underscores in TS identifiers), 14 (Go/proto-style names not idiomatic in TS), 20 (type-suffix tautology — `AutoTaggingConfig_AutoTaggingMode` re-states `AutoTagging`).
- **Suggested name:** `AutoTaggingMode` (top-level), or namespace it under `AutoTaggingConfig` via TS namespace if nesting really must be preserved.
- **Rationale:** TS `strict-type-checked` rejects `Foo_Bar`. The `eslint-disable` directive is the smoking gun that the name fights the language. `AutoTaggingMode` is unambiguous on its own; the field that uses it is already named `autoTaggingMode`.

### 2. `AutoTaggingConfig_AutoTaggingMode.AUTO_TAGGING_MODE_UNSPECIFIED` / `AUTO_TAGGING_DISABLED` / `AUTO_TAGGING_ENABLED` — `src/v1/model.ts:10-12`
- **Why weird:** Every enum value re-states the enum name (`AutoTaggingMode.AUTO_TAGGING_*`). The `UNSPECIFIED` sentinel is a protobuf import; idiomatic TS would use `undefined` for "not set". Also note that the unspecified value carries the `_MODE_` infix while the other two drop it — inconsistent.
- **Category:** 2 (redundant enum prefix), 14 (proto/Go-style names), 17 (action-prefix inconsistency — `_MODE_` is present on `UNSPECIFIED` but missing on `DISABLED`/`ENABLED`).
- **Suggested name:** `AutoTaggingMode.Disabled | Enabled` (drop `Unspecified` and rely on `autoTaggingMode?: AutoTaggingMode | undefined`).
- **Rationale:** TS enum members are already namespaced by the enum (`AutoTaggingMode.Enabled`). The `AUTO_TAGGING_` prefix is pure protobuf noise. A binary on/off concept does not need a third "unset" sentinel when the field is already optional.

### 3. `autoTagConfigs` field vs. `AutoTaggingConfig` type — `src/v1/model.ts:57,62`
- **Why weird:** Field name uses abbreviated `autoTag` while the type it points to is the full `AutoTaggingConfig`. Within five lines the SDK uses both `tag`-noun and `tagging`-gerund for the same concept.
- **Category:** 5 (cryptic abbreviation — `Tag` for `Tagging`), 17 (inconsistency with sibling type — `autoTagConfigs: AutoTaggingConfig[]`).
- **Suggested name:** `autoTaggingConfigs: AutoTaggingConfig[]` (and `effectiveAutoTaggingConfigs`). Wire stays `auto_tag_configs` if upstream insists.
- **Rationale:** A field of `Foo[]` should plural-ise the type name: `foos: Foo[]`. Mixing `autoTag` and `AutoTagging` makes the relationship unobvious and forces a mental translation on every read.

### 4. `effectiveAutoTagConfigs` — `src/v1/model.ts:62`
- **Why weird:** Two parallel fields (`autoTagConfigs` for owned + `effectiveAutoTagConfigs` for owned-plus-inherited) on the same type. "Effective" is fine on its own, but the parent type does not say which is read-only vs. write — a caller can easily set `effectiveAutoTagConfigs` thinking it will take effect.
- **Category:** 1 (vague — `effective` does not communicate "computed/read-only" on its own), 6 (misleading: looks settable but is server-computed).
- **Suggested name:** `inheritedAutoTaggingConfigs` (or split into `autoTaggingConfigs` + `computedAutoTaggingConfigs` with a JSDoc `@readonly`).
- **Rationale:** SDK fields without an output-only marker invite write-side mistakes. The current doc says "Computed from auto_tag_configs on this catalog and those inherited from the metastore" but the type does not enforce that.

### 5. `name` field on `CatalogConfig` / `DeleteCatalogConfigRequest` / `GetCatalogConfigRequest` — `src/v1/model.ts:42,88,94`
- **Why weird:** Field literally called `name` carries a structured resource path (`catalogs/{catalog_name}/config`), not a free-form name. `name` is the most generic possible identifier and gives no hint that it must follow a specific format.
- **Category:** 1 (vague — `name` is the canonical too-generic field name), 6 (misleading — looks like a display name, is actually a structured resource path), 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `resourceName` or `configResourceName`. If staying with `name`, the JSDoc should at least be on the type rather than only on each field.
- **Rationale:** A user importing `CatalogConfig` and seeing `name?: string` will almost certainly try to put `"my-catalog"` in there, not `"catalogs/my-catalog/config"`. The wire constraint is invisible from the type.

### 6. `parent` field on `CreateCatalogConfigRequest` — `src/v1/model.ts:77`
- **Why weird:** Field called `parent` carries the structured value `catalogs/{catalog_name}`. The relationship "catalog is the parent of catalog-config" is a proto/AIP-160 convention that does not survive into a TS SDK where users do not see the resource hierarchy.
- **Category:** 1 (vague — `parent` of what?), 15 (generic field name losing meaning), 19 (underspecified ID).
- **Suggested name:** `catalogResourceName` or `parentCatalog`.
- **Rationale:** `parent: string` is a Google-AIP idiom; outside that context a caller has no idea what shape to put in. A user-friendly TS SDK would either accept `{catalogName: 'my-catalog'}` directly or rename to make the constraint visible.

### 7. `classificationTag` and `classificationTagValue` — `src/v1/model.ts:25,32`
- **Why weird:** The pair encodes a `(key, value)` tag, but the names are `tag` and `tagValue` instead of `tagKey` and `tagValue`. The first field actually holds the tag *key* per its doc ("For built-in classes this is a system tag (e.g., \"class.name\"...)"). Calling the key "the Classification Tag" while the value is "the Classification Tag Value" makes the parts asymmetric.
- **Category:** 1 (vague — `classificationTag` is the key, not the whole tag), 6 (misleading — name suggests "the tag" but it is one half of one), 17 (asymmetric pair naming — `tag` vs `tagValue`).
- **Suggested name:** `classificationTagKey` + `classificationTagValue` (or `tagKey` + `tagValue`).
- **Rationale:** Symmetric `key`/`value` field names are the standard idiom for tag pairs across Unity Catalog (`tagKey`/`tagValue` appears in `unitycatalog` packages). The current name asymmetry suggests the two fields hold different kinds of thing when they hold two halves of one.

## Medium severity

### 8. `Client` class — `src/v1/client.ts:38`
- **Why weird:** A class literally named `Client` at the top level of the package's API surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code would clash on import.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `DataClassificationClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user doing `import {Client} from '@databricks/sdk-dataclassification'` and `import {Client} from '@databricks/sdk-abacpolicies'` cannot, and must rename. Sister packages all share the same problem, suggesting a generator-level rename. Worth flagging upstream.

### 9. `CreateCatalogConfigRequest` / `DeleteCatalogConfigRequest` / `GetCatalogConfigRequest` / `UpdateCatalogConfigRequest` — `src/v1/model.ts:75,86,92,103`
- **Why weird:** All four request DTOs repeat the noun `CatalogConfig` even though the only thing this package operates on is `CatalogConfig`. The package name itself is `dataclassification`. In context, `CreateRequest`/`UpdateRequest` would be plenty.
- **Category:** 7 (overly verbose), 8 (redundant suffix and infix).
- **Suggested name:** `CreateRequest`/`UpdateRequest`/`DeleteRequest`/`GetRequest`, or keep `Catalog` and drop `Config`: `CreateCatalogRequest`/...
- **Rationale:** The whole package operates on exactly one entity. Repeating its name in four request types is pure noise. (However, the inconsistency with the entire rest of the SDK matters — proposing as a per-package fix is risky. Listed medium not high.)

### 10. `marshalCatalogConfigSchema` / `unmarshalCatalogConfigSchema` etc. — `src/v1/model.ts:113,125,161,173`
- **Why weird:** These are Zod schemas, but the names use `marshal`/`unmarshal` (Go terminology) where TS / JS users would say `encode`/`decode` or `serialize`/`parse`. Within Zod's own docs the verb is `parse`. Mixing Go vocabulary with a TS library is jarring.
- **Category:** 14 (Go-style names imported into TS), 17 (verb inconsistency — Zod's own API is `.parse()`, not `.unmarshal()`).
- **Suggested name:** `encodeCatalogConfigSchema` / `decodeCatalogConfigSchema`, or `catalogConfigToWireSchema` / `catalogConfigFromWireSchema`.
- **Rationale:** Marshal/unmarshal is a Go term of art; TS developers reach for `JSON.stringify`/`JSON.parse` or Zod's `parse`/`safeParse`. The current name forces a vocabulary translation.

### 11. `catalogConfigFieldMaskSchema` and `catalogConfigFieldMask(...)` — `src/v1/model.ts:209,219`
- **Why weird:** Two exports differ only by the `Schema` suffix; the helper function and its lookup table share a stem. A reader has to look up which is the runtime config vs. which is the factory. Function/data naming should be more distinguishable.
- **Category:** 17 (inconsistent action verbs — schema is a noun, but the function uses the same name as a verbless noun).
- **Suggested name:** `buildCatalogConfigFieldMask(...)` for the function, leave the schema with `Schema` suffix.
- **Rationale:** Functions should be verb-prefixed; the schema-vs-builder distinction should jump off the page. Sister packages share this problem (generator-wide).

### 12. `executeCall` vs. `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions named "execute" — one runs the retry/rate-limit shell, the other does the actual HTTP request. The names do not communicate the layering. A reader sees both `executeCall` and `executeHttpCall` called inside the same client method (`call` wraps `executeHttpCall`, then `executeCall(call, options)` runs it) and must read the bodies to figure out who calls whom.
- **Category:** 1 (vague), 12 (duplicate concept — both are "execute"), 17 (inconsistent layering name).
- **Suggested name:** `runWithRetry(call, options)` (outer) and `sendHttpRequest(opts)` (inner). Or `executeWithPolicies` + `executeHttpRequest`.
- **Rationale:** The current names hide the fact that one wraps the other. Layer names should make the call graph obvious.

### 13. `buildHttpRequest` returns `HttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** A pure object-literal-with-optional-fields helper named "build" suggests something more elaborate (e.g., builder pattern). The function just spreads optional fields into a struct.
- **Category:** 1 (vague — "build" suggests heavyweight construction), 6 (misleading — implies builder pattern, is just an object literal).
- **Suggested name:** `makeHttpRequest` or inline at the call sites (the function is 16 lines and used 4 times).
- **Rationale:** "Build" carries connotations from Java/JS Builder patterns; this is just a shorthand. Using `make` or inlining would scan more clearly.

### 14. `marshalRequest(data, schema)` — `src/v1/utils.ts:119`
- **Why weird:** The function takes an arbitrary `unknown` value plus a Zod schema and returns a JSON string. The name says "Request" but the function does not know whether `data` is a request, response, or anything else.
- **Category:** 1 (vague — `Request` in the name does not constrain), 6 (misleading — works for any payload, not specifically requests).
- **Suggested name:** `marshalToJson` / `encodeToJson` / `toWireJson`.
- **Rationale:** The function is symmetric to `parseResponse`, which has the same problem in reverse. `Request`/`Response` should be specific to their meaning.

### 15. `parseResponse(body, schema)` — `src/v1/utils.ts:113`
- **Why weird:** Symmetric problem to `marshalRequest`. The function parses any JSON `Uint8Array` against a Zod schema. The name says "Response" but the function does not check that.
- **Category:** 1, 6.
- **Suggested name:** `parseJsonBody` / `decodeFromJson` / `fromWireJson`.
- **Rationale:** Same as #14. `marshalRequest` + `parseResponse` are an asymmetric verb pair (`marshal` vs. `parse`) AND inaccurate. Either fix both.

### 16. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** The function is exported but unused in `client.ts` (this package has no list endpoint with query params). Dead-code-shaped helper sitting in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it), 18 (carry-over from a different template).
- **Suggested name:** N/A — the function should not live in this package at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper. The naming is fine but the location is not.

### 17. `readAll(body)` — `src/v1/utils.ts:40`
- **Why weird:** `readAll` is generic enough to read anything; here it specifically drains a `ReadableStream<Uint8Array>`. The name does not say "drain a stream into a single buffer".
- **Category:** 1 (vague), 5 (cryptic — `readAll` is JS-conventional but not self-describing).
- **Suggested name:** `drainStream` or `readStreamToUint8Array`.
- **Rationale:** A name like `readAll` reads as if it took a file path. The function signature does the documentation work; the name does not.

### 18. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Type called `Options` but it is an internal context bag (request + http client + logger), not user-tunable options. The user-facing options type is `CallOptions` (different file). Mixing "options" for two different concepts is confusing.
- **Category:** 1 (vague suffix `Options`), 8 (redundant suffix — internal context bags should not be called `Options`).
- **Suggested name:** `HttpCallContext` or `HttpCallArgs`.
- **Rationale:** Reserve `Options` for things callers tune; use `Context`/`Args` for the internal bag.

## Low severity

### 19. `PACKAGE_SEGMENT` — `src/v1/client.ts:33`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. Constant is `UPPER_SNAKE_CASE` in a TS file otherwise dominated by camelCase. The casing is appropriate for a top-level constant, but the noun is weak.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain. The comment above does the work the name should.

### 20. `userAgent` field — `src/v1/client.ts:45`
- **Why weird:** `userAgent` is the canonical name for the header value, so this is fine. The field is `private readonly` — no problem with naming itself.
- **Category:** N/A (verification, no issue).
- **Suggested name:** unchanged.
- **Rationale:** Listed only to confirm canonical naming is preserved.

### 21. `Call` type and `call` variable — `src/v1/client.ts:77-87, 101-110, 121-131, 157-173`
- **Why weird:** Variable named `call` of type `Call` — same word for the variable, type, and the API method semantics. Inside `executeCall(call, options)` the verb-noun collision is jarring (`execute the call`).
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions read fine in IDE but obscure prose-style reads.

### 22. `req.parent ?? ''` / `req.name ?? ''` / `req.catalogConfig?.name ?? ''` URL composition — `src/v1/client.ts:74,100,119,148`
- **Why weird:** The client silently substitutes empty string for missing required path components, producing malformed URLs (e.g., `/api/data-classification/v1//config`). The naming is fine; the *handling* leaks via the optional types. Listed because `req.parent` and `req.name` are typed `string | undefined` while functionally required.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make `parent` and `name` required (non-optional) on the request types.
- **Rationale:** This is a type-shape issue more than a naming one, but it surfaces because the field names promise less than the API requires.

### 23. `respBody` vs `resp` variables — `src/v1/client.ts:81-86, 125-130, 167-172`
- **Why weird:** Two stages produce `respBody: Uint8Array` then `resp: CatalogConfig`. The names differ only by `Body`; the reader has to track that one is bytes, one is parsed. Abbreviating `response` to `resp` is fine but inconsistent with `req` (also abbreviated) which is also a parameter name.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `respBody` keeps `Body`, but `resp` drops the implied `Parsed`).
- **Suggested name:** `rawBody` + `result` (or `parsedResponse`).
- **Rationale:** Distinguish stages by meaningful nouns, not by suffix differences on the same root.

### 24. `httpReq` local variable — `src/v1/client.ts:80,104,124,160`
- **Why weird:** Inside a method that already has `req: CreateCatalogConfigRequest`, a second variable `httpReq: HttpRequest` shares the same `req` root with a different prefix. Easy to grab the wrong one.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s in the same scope).
- **Suggested name:** `httpRequest` (no abbreviation) or `wireRequest`.
- **Rationale:** Avoid forking the same identifier across two layers in the same scope. Spelling out `httpRequest` solves it.

### 25. `unmarshalCatalogConfig_SchemaNamesSchema` — `src/v1/model.ts:152`
- **Why weird:** Underscore in the identifier (proto-style nesting carried into the Zod schema name) plus type-suffix tautology — the trailing `Schema` is the Zod marker, but the inner `Schema` in `SchemaNames` is the field semantics, producing a hard-to-parse `..._SchemaNamesSchema` triple. Required `eslint-disable`.
- **Category:** 4 (underscore in TS identifier), 14 (Go/proto-style names), 20 (type-suffix tautology).
- **Suggested name:** Drop the underscore segment and choose distinct stems for the wrapper and the Zod marker, e.g., `schemaNameListSchema`.
- **Rationale:** TS `strict-type-checked` rejects `Foo_Bar`; the `eslint-disable` directive shows the name is fighting the language. Repeating `Schema` for two different concepts in one identifier also forces the reader to disambiguate by position.

## Observations

### 26. Wire/TS divergence is heavy
The model file is 229 lines for ~5 user-facing types; >half is `marshal`/`unmarshal`/`FieldMaskSchema` scaffolding. Same pattern as other audited packages. Not a naming problem, but the audit consistently surfaces how much generator boilerplate dominates each package.

### 27. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete` consistently — no `Fetch`/`Retrieve`/`Read`. No `List` endpoint in this package (the entity is a singleton per catalog, by design). Verb consistency is good. (Listed per rule 17 to note the absence of inconsistency.)

### 28. Acronym casing
The codebase mixes `Http` (PascalCase capital-then-lower) with `URLSearchParams` (Web standard ALLCAPS imported by name). Field uses `userAgent` (camelCase). No `Id`/`URL`/`UC` clashes encountered in this small package. The `Http`/`URL` split mirrors the JS ecosystem and is hard to fix locally.
- **Category:** 3 (acronym casing).

### 29. `dataclassification` lowercase package name
The package directory is `dataclassification` (one word, no separator), but every type/field uses `DataClassification` or `data-classification`. The HTTP path uses kebab-case `/api/data-classification/v1/`. The directory name's collapsed spelling looks like an abbreviation but isn't — it's just unsegmented. Worth flagging for SDK-wide convention (compare: should be `data-classification` to match other multi-word packages, but npm package names allow hyphens only via scopes).
- **Category:** 3 (casing inconsistency: directory `dataclassification` vs. wire `data-classification` vs. types `DataClassification`).

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the configured resource is a UC catalog).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `auto-tagging` / `auto-tag` — automatic application of governance tags to columns classified by the scanner (used both as gerund `AutoTagging` in types and as noun `AutoTag` in field names — see #3).
- `system tag` / `governance tag` — terminology in JSDoc for `classificationTag` (built-in vs. custom class tag keys).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (229 lines): read fully.
- `src/v1/client.ts` (181 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
