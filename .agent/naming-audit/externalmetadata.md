# Naming Audit: externalmetadata

**Path:** `packages/externalmetadata/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog External Metadata — register, list, update, and delete metadata objects that describe data assets living outside Databricks (Tableau dashboards, Power BI reports, Kafka topics, ServiceNow tables, Snowflake tables, etc.), enabling cross-system lineage in the Databricks lineage-tracking subsystem.
**Total weird names flagged:** 37

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 12 |
| Low | 10 |
| Observation | 4 |

## High severity

### 1. `SystemType.SYSTEM_TYPE_UNSPECIFIED` — `src/v1/model.ts:9`
- **Why weird:** Sentinel re-states the enum name (`SystemType.SYSTEM_TYPE_UNSPECIFIED`). The field that uses this enum is already `systemType?: SystemType | undefined` — idiomatic TS expresses "unset" as `undefined`, making a third "unspecified" value pure protobuf import.
- **Category:** 2 (redundant enum prefix), 14 (proto/Go-style names).
- **Suggested name:** Drop the sentinel entirely and rely on `undefined`, or rename to `SystemType.Unknown`.
- **Rationale:** TS enum members are namespaced by the enum (`SystemType.Unknown`). The `SYSTEM_TYPE_` prefix on every member is protobuf-import noise that the language already solves with namespacing.

### 2. `SystemType.OTHER` — `src/v1/model.ts:10`
- **Why weird:** Generic catch-all value with no semantic indicator that it is a fallback. A user encountering `SystemType.OTHER` cannot tell if it means "data not yet classified", "vendor we don't support", or "user-provided custom system". Compare to `SystemType.SYSTEM_TYPE_UNSPECIFIED` which at least signals it is a sentinel.
- **Category:** 1 (vague — `OTHER` is the most generic possible name), 15 (generic field/value name losing meaning).
- **Suggested name:** `SystemType.Custom` or `SystemType.UserDefined` (whichever matches the API semantics).
- **Rationale:** `OTHER` as an enum value is the value-side equivalent of naming a field `data`. JSDoc on the enum, or a more specific value name, would tell readers when to reach for it.

### 3. `SystemType` value casing — `POWER_BI`, `MICROSOFT_SQL_SERVER`, `AMAZON_REDSHIFT`, `AZURE_SYNAPSE`, `GOOGLE_BIGQUERY`, `MICROSOFT_FABRIC`, `STREAM_NATIVE`, `POSTGRESQL`, `MONGODB`, `SERVICENOW`, `SALESFORCE`, `WORKDAY`, `TABLEAU`, `LOOKER`, `KAFKA`, `MYSQL`, `ORACLE`, `SAP`, `SNOWFLAKE`, `TERADATA`, `CONFLUENT`, `DATABRICKS` — `src/v1/model.ts:10-32`
- **Why weird:** Vendor names are proper nouns with canonical brand casing (Power BI, Microsoft SQL Server, Amazon Redshift, BigQuery, PostgreSQL, MongoDB, ServiceNow, Tableau). Wire SCREAMING_SNAKE collapses every brand to a flat shout. Also: split rules are inconsistent — `POWER_BI` and `MICROSOFT_SQL_SERVER` split on word boundary, but `POSTGRESQL`, `MONGODB`, `SERVICENOW`, `SALESFORCE` join compounds without underscore.
- **Category:** 3 (acronym casing inconsistency across vendor names), 18 (long enum value set).
- **Suggested name:** Either keep wire SCREAMING_SNAKE (current) and document, or move TS-side to PascalCase brand casing (`SystemType.PowerBI`, `SystemType.MicrosoftSqlServer`, `SystemType.Postgres`, `SystemType.MongoDb`). Pick one split convention: word-bound (`POSTGRE_SQL`, `MONGO_DB`, `SERVICE_NOW`, `SALES_FORCE`) or joined (`POWERBI`, `MICROSOFTSQLSERVER`).
- **Rationale:** Vendor names are proper nouns. A user typing `SystemType.MongoDB` won't autocomplete to `MONGODB`. Within the set there is no reproducible rule (compare `POWER_BI` split vs `POSTGRESQL` joined). Probably wire-locked, but worth flagging upstream.

### 4. `SystemType.STREAM_NATIVE` — `src/v1/model.ts:32`
- **Why weird:** The vendor is "StreamNative" (one camelCased brand name), but the wire splits it as `STREAM_NATIVE`. Compare: `SERVICENOW` (joined, brand is "ServiceNow") vs `STREAM_NATIVE` (split, brand is "StreamNative"). The split rule is unprincipled.
- **Category:** 3 (acronym/brand casing inconsistency), 18 (long value).
- **Suggested name:** `STREAMNATIVE` (matches `SERVICENOW`) or fix `SERVICENOW` -> `SERVICE_NOW`. Pick one.
- **Rationale:** Sibling brand names with the same shape (one-word camelCased) should encode identically. The current internal inconsistency makes the type non-discoverable.

### 5. `ExternalMetadata` — `src/v1/model.ts:43`
- **Why weird:** The central domain entity is named after the package, which is a noun phrase but not a noun ("External Metadata" is more an adjective+noun phrase than a thing). Compare: `Catalog`, `Connection`, `Schema` are crisp nouns; `ExternalMetadata` reads like a category, not an instance. Also: every field has the doc-string suffix "external metadata object" — the type is essentially `XxxObject` without the suffix, but the docs need it because the bare type name lacks objecthood.
- **Category:** 1 (vague — what is "an External Metadata"?), 6 (misleading: name reads as a kind, not an instance).
- **Suggested name:** `ExternalAsset` or `ExternalEntity` (the type already has a `entityType` field describing what shape of external thing it is). Alternatively, embrace the proto-canonical name with `ExternalMetadataObject`.
- **Rationale:** Reading `const x: ExternalMetadata = ...` does not communicate that `x` is a single named external asset. The JSDoc fix ("external metadata object") betrays that the type name needs help to read as a noun. Worth raising upstream.

### 6. `ExternalMetadata.name` (and `req.name` in Get/Delete/Update) — `src/v1/model.ts:45,40,81`
- **Why weird:** Field literally called `name` on an entity that uses `name` as the unique identifier in REST path segments (`/api/2.0/lineage-tracking/external-metadata/${req.name}`). The entity also has both `name` AND `id` (line 71) — two different identifier-shaped fields with no doc differentiation beyond "Unique identifier of the external metadata object" on `id` and "Name of the external metadata object" on `name`.
- **Category:** 1 (vague — `name` is the canonical too-generic field name), 12 (duplicate concept — `name` and `id` both feel identity-shaped), 19 (underspecified ID).
- **Suggested name:** Either rename to `objectName` / `assetName` and document the format constraint, or drop `id` if `name` is the canonical key. JSDoc must explain when callers use `name` vs `id`.
- **Rationale:** Co-existence of `name?: string` and `id?: string` with no semantic separation in docs is a recipe for caller confusion. The URL routing uses `name` as the path segment, suggesting `name` is the canonical key; `id` is the implementation-detail UUID. The type does not communicate this.

### 7. `ExternalMetadata.id` — `src/v1/model.ts:71`
- **Why weird:** Field `id` exists alongside `name`. JSDoc says "Unique identifier" — but `name` is also a unique identifier (the URL path key). Bare `id` without further qualification gives no hint that this is the system-generated UUID vs. the human-readable name. Also: bare `id: string` is rule-19 underspecified — no format constraint visible at the type.
- **Category:** 1 (vague), 12 (duplicate concept with `name`), 19 (underspecified ID).
- **Suggested name:** `objectId` / `assetId` / `externalMetadataId`, or drop entirely if `name` is the canonical key.
- **Rationale:** Two unique identifiers on one type with no doc differentiation forces every caller to read the API docs to know which to use. The type should name the difference.

### 8. `ListExternalMetadataResponseV2` — `src/v1/model.ts:94`
- **Why weird:** Type name carries the API version suffix `V2`, but the enclosing file is already `v1/model.ts` and the package is mounted at `./v1`. Version is encoded twice — once in the directory, once in the type. If the user later imports a hypothetical `v2/`, they would get `V3`? Versioning the entity name within the version namespace creates an off-by-one collision risk.
- **Category:** 8 (redundant suffix — version is in the path), 20 (type-suffix tautology between version-in-path and version-in-name), 14 (Go/proto-style — Go SDK carries the `V2` per RPC name; TS doesn't need it).
- **Suggested name:** `ListExternalMetadataResponse` (drop `V2`).
- **Rationale:** The directory is the namespace. Embedding the wire RPC version into the TS type name leaks an internal detail of the generator. If the package later gets a `v2/` directory, every type there ends up `V3` (one ahead of the dir), which is worse than the original problem.

### 9. `Client.createExternalMetadataV2` / `deleteExternalMetadataV2` / `getExternalMetadataV2` / `listExternalMetadataV2` / `updateExternalMetadataV2` / `listExternalMetadataV2Iter` — `src/v1/client.ts:70,102,124,154,190,212`
- **Why weird:** Every public method on `Client` ends with `V2`, but the directory is `v1/`. The version suffix is wire-RPC-name leakage (the upstream API is `ExternalMetadataServiceV2.Create`, hence `createExternalMetadataV2`). User code reads `client.createExternalMetadataV2(...)` for a method on a `v1/` import — confusing on first read.
- **Category:** 8 (redundant suffix), 14 (Go/proto-style name leak), 20 (type/version suffix tautology).
- **Suggested name:** `createExternalMetadata`, `deleteExternalMetadata`, etc. (drop `V2`).
- **Rationale:** The user's call site is `import {Client} from '@databricks/sdk-externalmetadata/v1'; client.createExternalMetadataV2(...)` — `V2` is wire-RPC noise. Version belongs in the import path, not the method name. Same problem as #8; generator-wide concern.

### 10. `ExternalMetadata_PropertiesEntry` — `src/v1/model.ts:75`
- **Why weird:** Underscore in TS identifier (proto-style nested message generated by protobuf for `map<string,string>` map entries). Required `eslint-disable @typescript-eslint/naming-convention`.
- **Category:** 4 (underscore identifier), 14 (proto-style nested message).
- **Suggested name:** Hoist to `PropertyEntry` (no underscore, no enclosing-type prefix).
- **Rationale:** The eslint-disable directive is the smoking gun that the name fights the language. TS identifiers should not contain underscores; the proto-generated `Type_NestedType` form is a code-generator artifact that should be flattened on the TS side.

### 11. `Client` — `src/v1/client.ts:41`
- **Why weird:** Class literally named `Client` at the top level of the package's surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code collide on import: `import {Client} from '@databricks/sdk-externalmetadata'` and `import {Client} from '@databricks/sdk-catalogs'` both fight for the same identifier.
- **Category:** 1 (vague — `Client` is the most generic name), 15 (generic name).
- **Suggested name:** `ExternalMetadataClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user combining packages must alias on every import (`import {Client as ExternalMetadataClient}`). Sister packages all share this problem — generator-wide rename worth raising upstream.

## Medium severity

### 12. `ExternalMetadata.systemType: SystemType` — `src/v1/model.ts:47`
- **Why weird:** Type-suffix tautology — field `systemType` of type `SystemType` on a type called `ExternalMetadata`. Reads `externalMetadata.systemType: SystemType` — three "type"s in one declaration.
- **Category:** 20 (type-suffix tautology), 8 (redundant suffix).
- **Suggested name:** `system: SystemType` (would read `externalMetadata.system`).
- **Rationale:** When the field's type already encodes "type", the field itself doesn't need to. Compare: `externalMetadata.system` reads cleaner than `externalMetadata.systemType`.

### 13. `ExternalMetadata.entityType` — `src/v1/model.ts:49`
- **Why weird:** Field `entityType` is typed `string` (free-form) rather than `EntityType` (an enum). Pairs awkwardly with `systemType: SystemType` two lines above — one is enumerated, the other is freeform string. The user has no idea what valid `entityType` values are without consulting external docs.
- **Category:** 1 (vague), 6 (misleading — `Type` suffix implies a closed set, but it's freeform), 15 (generic field name losing meaning), 17 (inconsistency — `systemType` is closed enum, `entityType` is open string).
- **Suggested name:** `entityKind` (less enum-implying), or define an `EntityType` enum if a closed set exists.
- **Rationale:** A field named `xxxType: string` strongly suggests an enum without one. JSDoc says "Type of entity within the external system" — but for Tableau the entity might be a dashboard/workbook; for Kafka, a topic. Closed-set values would help; absent that, the name should not over-promise.

### 14. `ExternalMetadata.url` — `src/v1/model.ts:51`
- **Why weird:** Casing of acronym. The codebase uses `url` (lowercase) consistently for the property, but the Web platform/standards canonical is `URL` (uppercase). Compare to `userAgent` (camelCase) and `URLSearchParams` (Web standard SCREAMING). Internal inconsistency between `url` (field) and `URLSearchParams` (function/class).
- **Category:** 3 (acronym casing).
- **Suggested name:** Keep `url` (TS convention), but acknowledge the JS-ecosystem split.
- **Rationale:** The JS world is split here — Node, browsers, and the URL spec all use `URL` for the class and `url` for member fields. Internal consistency within this file is preserved (`url` everywhere); the rule is conventional, not broken.

### 15. `ExternalMetadata.description` — `src/v1/model.ts:53`
- **Why weird:** Field `description` is on the entity but is "User-provided free-form text description" per JSDoc — i.e., not a generated description, not a vendor description, but specifically a description set by the metadata owner. The plain name `description` does not convey "you supply this".
- **Category:** 1 (vague — `description` is the canonical too-generic field name).
- **Suggested name:** `userDescription` or keep `description` and rely on JSDoc.
- **Rationale:** Minor — `description` is the universal expectation. JSDoc is doing the work. Listed for completeness.

### 16. `ExternalMetadata.columns: string[]` — `src/v1/model.ts:55`
- **Why weird:** `columns` is typed as `string[]` (just names), but the JSDoc reads "List of columns associated with the external metadata object". A `Column` in Unity Catalog terms is a structured `{name, type, nullable, ...}` object — calling a list of column names `columns` invites the reader to expect structure that is not there.
- **Category:** 6 (misleading — `columns` implies structured objects, is just names), 15 (generic field name losing meaning).
- **Suggested name:** `columnNames: string[]` (matches the contents).
- **Rationale:** When the field type and field name disagree about whether the values are objects or strings, the type wins (it has to compile); the name is the bug. `columnNames` is unambiguous.

### 17. `ExternalMetadata.properties` — `src/v1/model.ts:57`
- **Why weird:** Field name is the literal type-system-builtin reserved word for "object members" (`Object.properties`, `props`, etc). The map's role is "user-defined custom metadata" but the name `properties` is the most generic possible for a `Record<string,string>`. Also: `properties` co-exists with `metastoreId`, `owner`, `createdBy`, etc., which are *also* properties.
- **Category:** 1 (vague), 6 (misleading — every other field is also a "property"), 10 (reserved-word-adjacent — `properties` clashes with `Object.properties`).
- **Suggested name:** `tags`, `labels`, `attributes`, or `customProperties` — whatever the API doc calls them.
- **Rationale:** `properties` on a `Record<string,string>` is bag-of-strings naming. A user reading `externalMetadata.properties.foo` cannot tell if `foo` is intrinsic or user-extended.

### 18. `ExternalMetadata.owner` — `src/v1/model.ts:59`
- **Why weird:** Field `owner: string | undefined` with no hint of format. JSDoc says "Owner of the external metadata object" — owner is a Unity Catalog principal (user, group, or service principal). Common sister-package convention names this `owner` consistently, but a user has no idea what string format to put (`alice@example.com`? `users/alice`? a UUID?). Same problem applies to `createdBy` (line 65) and `updatedBy` (line 69).
- **Category:** 1 (vague), 19 (underspecified ID — what format is the principal?).
- **Suggested name:** Keep `owner` but document format. Or `ownerPrincipal`, matching other UC packages.
- **Rationale:** Bare `owner: string` is the canonical UC principal-as-string pattern across the SDK, but the type does not communicate format. Minor — sister-package convention is the same. Listed for visibility.

### 19. `ExternalMetadata.metastoreId` — `src/v1/model.ts:61`
- **Why weird:** Bare `metastoreId: string | undefined` — a UUID identifier on a UC metastore, but the type does not hint at the format. Idiomatic across the SDK; here mentioned only for rule-19 completeness. Also note: this field is "Unique identifier of parent metastore" but `parent` is not named — the metastore relationship is communicated via the `metastoreId` field alone, not a `parent` field per AIP-160.
- **Category:** 19 (underspecified ID — `string` doesn't tell you it's a UUID).
- **Suggested name:** Keep `metastoreId` (canonical across SDK).
- **Rationale:** SDK-wide pattern; field name is fine. Listed for completeness.

### 20. `ExternalMetadata.createTime` / `updateTime` — `src/v1/model.ts:63,67`
- **Why weird:** Verb-tense / part-of-speech inconsistency with `createdBy` and `updatedBy` (lines 65, 69). Times use the imperative ("create"); user fields use past-tense ("created"). A consistent set would be `createdAt` + `createdBy` and `updatedAt` + `updatedBy`. The Go SDK uses `create_time`/`update_time` on the wire; TS does not have to follow.
- **Category:** 13 (verb-tense inconsistency), 17 (inconsistent action-tense pair).
- **Suggested name:** `createdAt: Temporal.Instant` + `updatedAt: Temporal.Instant` (preserves the `createdBy`/`updatedBy` past-tense pair).
- **Rationale:** Sibling fields should agree on tense. `createTime`/`createdBy` mixes imperative + past-tense for one event. JS/TS canon is `createdAt`/`updatedAt` (e.g., NoSQL drivers, Sequelize, TypeORM, Prisma).

### 21. `ExternalMetadata.updateTime` vs. `Client.updateExternalMetadataV2` — `src/v1/model.ts:67, src/v1/client.ts:212`
- **Why weird:** "Update" as a verb is overloaded — it names both an action (the PATCH method) and a state field (the last-modified timestamp). On the same entity, reading `externalMetadata.updateTime` while a request to `updateExternalMetadata` is in flight is confusing.
- **Category:** 12 (duplicate concept), 17 (verb noun-vs-action collision).
- **Suggested name:** `modifiedAt`/`modifiedBy` for the state, leave `update` for the action.
- **Rationale:** Separating timestamp ("modified") from operation ("update") prevents the reader from conflating "this was just updated" with "this is being updated right now".

### 22. `UpdateExternalMetadataRequest.updateMask: FieldMask<ExternalMetadata>` — `src/v1/model.ts:101`
- **Why weird:** Field name `updateMask` doesn't say what kind of mask. In context the mask describes "which fields to patch". The Google AIP-134 convention names this `updateMask`; the TS-idiomatic name would describe contents (`fieldsToUpdate`, `patchedFields`, `paths`).
- **Category:** 1 (vague), 14 (Google-AIP-style name).
- **Suggested name:** Keep `updateMask` (AIP-134 canon) or rename to `fieldsToUpdate`.
- **Rationale:** Sticking to AIP-134 is fine; SDK-wide pattern. Listed for awareness.

### 23. `executeCall` vs. `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions named "execute" — one runs the retry/rate-limit shell, the other does the actual HTTP request. The names do not communicate the layering. A reader sees both `executeCall` and `executeHttpCall` called inside the same client method (the inner `call` wraps `executeHttpCall`, then `executeCall(call, options)` runs it) and must read the bodies to figure out who calls whom.
- **Category:** 1 (vague), 12 (duplicate concept — both are "execute"), 17 (inconsistent layering name).
- **Suggested name:** `runWithRetry(call, options)` (outer) and `sendHttpRequest(opts)` (inner). Or `executeWithPolicies` + `executeHttpRequest`.
- **Rationale:** The current names hide the fact that one wraps the other. Layer names should make the call graph obvious. Same pattern across sister packages — generator-wide concern.

## Low severity

### 24. `CreateExternalMetadataRequest` / `DeleteExternalMetadataRequest` / `GetExternalMetadataRequest` / `ListExternalMetadataRequest` / `UpdateExternalMetadataRequest` — `src/v1/model.ts:35,39,80,84,99`
- **Why weird:** Four (five) request DTOs repeat the noun `ExternalMetadata` even though the entire package operates on exactly one entity (the only thing this package does is CRUD `ExternalMetadata`). In context, `CreateRequest`/`UpdateRequest` would be plenty.
- **Category:** 7 (overly verbose), 8 (redundant suffix and infix).
- **Suggested name:** `CreateRequest`/`UpdateRequest`/`DeleteRequest`/`GetRequest`/`ListRequest`, or drop the `Request` suffix entirely if request DTOs follow a sibling-naming pattern (`Create`, `Update`, etc.). Cross-SDK consistency makes this a low rather than high.
- **Rationale:** The whole package operates on one entity; repeating it in every request type is pure noise. SDK-wide pattern means a local fix risks inconsistency.

### 25. `ListExternalMetadataResponseV2.externalMetadata: ExternalMetadata[]` — `src/v1/model.ts:95`
- **Why weird:** Singular/plural mismatch. The field holds an array but is named `externalMetadata` (singular). Convention is plural for arrays (e.g., `connections: Connection[]` in sister packages). Compare: `nextPageToken` is singular because it's a single token.
- **Category:** 9 (singular/plural mismatch), 20 (type-suffix tautology — `externalMetadata: ExternalMetadata[]`).
- **Suggested name:** `items: ExternalMetadata[]` or `externalMetadataObjects: ExternalMetadata[]` or `assets`. Wire stays `external_metadata`.
- **Rationale:** "Metadata" is a mass noun (uncountable), which is why the generator left it singular. A plural-aware name like `items` or `assets` reads naturally.

### 26. `PACKAGE_SEGMENT` — `src/v1/client.ts:36`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. Constant is `UPPER_SNAKE_CASE` in a TS file otherwise dominated by camelCase. The casing is appropriate for a top-level constant, but the noun is weak.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain. The comment above does the work the name should.

### 27. `Call` type and `call` variable — `src/v1/client.ts:80,107,130,169,228`
- **Why weird:** Variable named `call` of type `Call` — same word for the variable, type, and the API method semantics. Inside `executeCall(call, options)` the verb-noun collision is jarring (`execute the call`).
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions read fine in IDE but obscure prose-style reads.

### 28. `req` / `resp` / `respBody` / `httpReq` variables — `src/v1/client.ts:71-95, 103-118, etc.`
- **Why weird:** Three abbreviations of `request`/`response` in the same scope. `req: CreateExternalMetadataRequest` is the user input; `httpReq: HttpRequest` is the wire object; `resp: ExternalMetadata` is the parsed result; `respBody: Uint8Array` is the wire body. Easy to grab the wrong one.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `respBody` keeps `Body`, but `resp` drops the implied `Parsed`).
- **Suggested name:** `request`, `response`, `rawBody`, `httpRequest` (no abbreviations) or distinguish stages by meaningful nouns (e.g., `input`, `result`).
- **Rationale:** Avoid forking the same identifier across two layers in the same scope. Spelling out `httpRequest`/`response` solves it.

### 29. `pageReq` — `src/v1/client.ts:194`
- **Why weird:** Yet another `req` abbreviation (`pageReq: ListExternalMetadataRequest`). Inside `listExternalMetadataV2Iter`, the loop variable `pageReq` shares the `req` root with the outer parameter `req`.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency with `req`).
- **Suggested name:** `nextPageRequest` or unwrap the variable entirely (just mutate `req.pageToken`).
- **Rationale:** Sibling-scope variables with shared roots are easy to mis-grab. Spell out one or the other.

### 30. `body` parameter on `buildHttpRequest` — `src/v1/utils.ts:101`
- **Why weird:** Parameter `body?: string | ReadableStream<Uint8Array>` is bare-typed `string | ReadableStream` — no hint that this is JSON-string-or-streamed-bytes. Compare: callers pass the result of `marshalRequest` (always JSON string), so the stream variant is theoretical.
- **Category:** 1 (vague — `body` is the most generic field name), 15 (generic field name losing meaning).
- **Suggested name:** `requestBody: string | ReadableStream<Uint8Array>`.
- **Rationale:** Inside a function building HTTP requests, `body` is fine because the type is `HttpRequest['body']`. Listed for completeness; not actionable on its own.

### 31. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Function is exported but unused in `client.ts` — `listExternalMetadataV2` uses ad-hoc `params.append(...)` calls inline (`page_size`, `page_token`) rather than the flatten helper. Dead-code-shaped helper sitting in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it), 18 (carry-over from a different template).
- **Suggested name:** N/A — the function should not live in this package at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper. The naming is fine but the location is not.

### 32. `readAll(body)` — `src/v1/utils.ts:40`
- **Why weird:** `readAll` is generic enough to read anything; here it specifically drains a `ReadableStream<Uint8Array>`. The name does not say "drain a stream into a single buffer".
- **Category:** 1 (vague), 5 (cryptic — `readAll` is JS-conventional but not self-describing).
- **Suggested name:** `drainStream` or `readStreamToUint8Array`.
- **Rationale:** A name like `readAll` reads as if it took a file path. The function signature does the documentation work; the name does not.

### 33. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Type called `Options` but it is an internal context bag (request + http client + logger), not user-tunable options. The user-facing options type is `CallOptions` (different file). Mixing "options" for two different concepts is confusing.
- **Category:** 1 (vague suffix `Options`), 8 (redundant suffix — internal context bags should not be called `Options`).
- **Suggested name:** `HttpCallContext` or `HttpCallArgs`.
- **Rationale:** Reserve `Options` for things callers tune; use `Context`/`Args` for the internal bag.

## Observations

### 34. Identifier doubling for path + UUID
The `ExternalMetadata` type has both `name` (the URL-path key) and `id` (the system UUID). Sister packages handle this differently — some collapse to `name` only, some collapse to `id` only, some keep both with explicit `nameOrId` semantics in JSDoc. The lack of a single SDK-wide convention is the underlying problem; per-package, this manifests as #6 and #7.

### 35. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete`/`List` consistently — no `Fetch`/`Retrieve`/`Read`/`Remove`. Verb consistency is good.

### 36. Acronym casing
The codebase mixes `Http` (PascalCase capital-then-lower) with `URLSearchParams` (Web standard ALLCAPS imported by name). Field uses `url` lowercase. No `Id`/`URL`/`UC` clashes encountered in the user-facing types of this small package. The `Http`/`URL` split mirrors the JS ecosystem and is hard to fix locally.
- **Category:** 3 (acronym casing).

### 37. `externalmetadata` lowercase package name
The package directory is `externalmetadata` (one word, no separator), but every type/field uses `ExternalMetadata` (two words) and the HTTP path uses kebab-case `/api/2.0/lineage-tracking/external-metadata` (note the *outer* `lineage-tracking` — not `external-metadata`-rooted). The directory name's collapsed spelling is unsegmented across word boundaries. Worth flagging for SDK-wide convention (compare: should be `external-metadata` to match other multi-word packages, but npm package names allow hyphens only via scopes).
- **Category:** 3 (casing inconsistency: directory `externalmetadata` vs. wire `external-metadata` vs. types `ExternalMetadata`).

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the registered entities live in a UC metastore).
- `metastore` / `metastoreId` — UC metastore (the top-level UC namespace); the `metastoreId` is a UUID.
- `external-metadata` — the wire name for the resource registered in the lineage-tracking subsystem; refers to metadata about an entity living *outside* Databricks (a Tableau dashboard, a Kafka topic, etc.).
- `lineage-tracking` — the URL path prefix `/api/2.0/lineage-tracking/...`; the broader subsystem this package belongs to.
- `system` / `SystemType` — the external vendor system (Tableau, Snowflake, Kafka, ...). Closed enum.
- `entity` / `entityType` — the kind of object *within* the external system (a Tableau workbook vs. a dashboard; a Kafka topic vs. a partition). Open string, not enumerated.
- `BROWSE`, `MANAGE`, `MODIFY`, `CREATE_EXTERNAL_METADATA` — UC privileges referenced in method JSDoc but not modeled as types.
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `properties` — user-defined `Record<string,string>` (see #17 for naming concern).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (222 lines): read fully.
- `src/v1/client.ts` (252 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (17 lines): read fully.
