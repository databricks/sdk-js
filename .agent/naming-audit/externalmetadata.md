# Naming Audit: externalmetadata

**Path:** `packages/externalmetadata/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog External Metadata — register, list, update, and delete metadata objects that describe data assets living outside Databricks (Tableau dashboards, Power BI reports, Kafka topics, ServiceNow tables, Snowflake tables, etc.), enabling cross-system lineage in the Databricks lineage-tracking subsystem.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 3 |
| Low | 0 |
| Observation | 2 |

## High severity

### 1. `SystemType.OTHER` — `src/v1/model.ts:10`
- **Why weird:** Generic catch-all value with no semantic indicator that it is a fallback. A user encountering `SystemType.OTHER` cannot tell if it means "data not yet classified", "vendor we don't support", or "user-provided custom system". Compare to `SystemType.SYSTEM_TYPE_UNSPECIFIED` which at least signals it is a sentinel.
- **Category:** 1 (vague — `OTHER` is the most generic possible name), 15 (generic field/value name losing meaning).
- **Suggested name:** `SystemType.Custom` or `SystemType.UserDefined` (whichever matches the API semantics).
- **Rationale:** `OTHER` as an enum value is the value-side equivalent of naming a field `data`. JSDoc on the enum, or a more specific value name, would tell readers when to reach for it.

### 2. `SystemType` value casing — `POWER_BI`, `MICROSOFT_SQL_SERVER`, `AMAZON_REDSHIFT`, `AZURE_SYNAPSE`, `GOOGLE_BIGQUERY`, `MICROSOFT_FABRIC`, `STREAM_NATIVE`, `POSTGRESQL`, `MONGODB`, `SERVICENOW`, `SALESFORCE`, `WORKDAY`, `TABLEAU`, `LOOKER`, `KAFKA`, `MYSQL`, `ORACLE`, `SAP`, `SNOWFLAKE`, `TERADATA`, `CONFLUENT`, `DATABRICKS` — `src/v1/model.ts:10-32`
- **Why weird:** Vendor names are proper nouns with canonical brand casing (Power BI, Microsoft SQL Server, Amazon Redshift, BigQuery, PostgreSQL, MongoDB, ServiceNow, Tableau). Wire SCREAMING_SNAKE collapses every brand to a flat shout. Also: split rules are inconsistent — `POWER_BI` and `MICROSOFT_SQL_SERVER` split on word boundary, but `POSTGRESQL`, `MONGODB`, `SERVICENOW`, `SALESFORCE` join compounds without underscore.
- **Category:** 3 (acronym casing inconsistency across vendor names).
- **Suggested name:** Pick one split convention: word-bound (`POSTGRE_SQL`, `MONGO_DB`, `SERVICE_NOW`, `SALES_FORCE`) or joined (`POWERBI`, `MICROSOFTSQLSERVER`). Alternatively move TS-side to PascalCase brand casing (`SystemType.PowerBI`, `SystemType.MicrosoftSqlServer`, `SystemType.Postgres`, `SystemType.MongoDb`).
- **Rationale:** Vendor names are proper nouns. Within the set there is no reproducible rule (compare `POWER_BI` split vs `POSTGRESQL` joined). A user typing `SystemType.MongoDB` won't autocomplete to `MONGODB`. Probably wire-locked, but worth flagging upstream.

### 3. `SystemType.STREAM_NATIVE` — `src/v1/model.ts:32`
- **Why weird:** The vendor is "StreamNative" (one camelCased brand name), but the wire splits it as `STREAM_NATIVE`. Compare: `SERVICENOW` (joined, brand is "ServiceNow") vs `STREAM_NATIVE` (split, brand is "StreamNative"). The split rule is unprincipled.
- **Category:** 3 (acronym/brand casing inconsistency).
- **Suggested name:** `STREAMNATIVE` (matches `SERVICENOW`) or fix `SERVICENOW` -> `SERVICE_NOW`. Pick one.
- **Rationale:** Sibling brand names with the same shape (one-word camelCased) should encode identically. The current internal inconsistency makes the type non-discoverable.

### 4. `ExternalMetadata` — `src/v1/model.ts:43`
- **Why weird:** The central domain entity is named after the package, which is a noun phrase but not a noun ("External Metadata" is more an adjective+noun phrase than a thing). Compare: `Catalog`, `Connection`, `Schema` are crisp nouns; `ExternalMetadata` reads like a category, not an instance. Also: every field has the doc-string suffix "external metadata object" — the type is essentially `XxxObject` without the suffix, but the docs need it because the bare type name lacks objecthood.
- **Category:** 1 (vague — what is "an External Metadata"?), 6 (misleading: name reads as a kind, not an instance).
- **Suggested name:** `ExternalAsset` or `ExternalEntity` (the type already has a `entityType` field describing what shape of external thing it is). Alternatively, embrace the proto-canonical name with `ExternalMetadataObject`.
- **Rationale:** Reading `const x: ExternalMetadata = ...` does not communicate that `x` is a single named external asset. The JSDoc fix ("external metadata object") betrays that the type name needs help to read as a noun. Worth raising upstream.

### 5. `ExternalMetadata.name` vs. `ExternalMetadata.id` — `src/v1/model.ts:45,71`
- **Why weird:** The entity has both `name` AND `id` — two different identifier-shaped fields with no doc differentiation beyond "Unique identifier of the external metadata object" on `id` and "Name of the external metadata object" on `name`. The URL routing uses `name` as the path segment (`/api/2.0/lineage-tracking/external-metadata/${req.name}`), suggesting `name` is the canonical key; `id` is the implementation-detail UUID.
- **Category:** 12 (duplicate concept — `name` and `id` both feel identity-shaped), 19 (underspecified ID).
- **Suggested name:** Drop `id` if `name` is the canonical key, or document in JSDoc when callers use `name` vs `id`.
- **Rationale:** Co-existence of `name?: string` and `id?: string` with no semantic separation in docs is a recipe for caller confusion. The type does not communicate which is canonical.

### 6. `ListExternalMetadataResponseV2` — `src/v1/model.ts:94`
- **Why weird:** Type name carries the API version suffix `V2`, but the enclosing file is already `v1/model.ts` and the package is mounted at `./v1`. Version is encoded twice — once in the directory, once in the type. If the user later imports a hypothetical `v2/`, they would get `V3`? Versioning the entity name within the version namespace creates an off-by-one collision risk.
- **Category:** 8 (redundant suffix — version is in the path), 20 (type-suffix tautology between version-in-path and version-in-name), 14 (Go/proto-style — Go SDK carries the `V2` per RPC name; TS doesn't need it).
- **Suggested name:** `ListExternalMetadataResponse` (drop `V2`).
- **Rationale:** The directory is the namespace. Embedding the wire RPC version into the TS type name leaks an internal detail of the generator. If the package later gets a `v2/` directory, every type there ends up `V3` (one ahead of the dir), which is worse than the original problem.

### 7. `Client.createExternalMetadataV2` / `deleteExternalMetadataV2` / `getExternalMetadataV2` / `listExternalMetadataV2` / `updateExternalMetadataV2` / `listExternalMetadataV2Iter` — `src/v1/client.ts:75,110,135,168,207,229`
- **Why weird:** Every public method on `Client` ends with `V2`, but the directory is `v1/`. The version suffix is wire-RPC-name leakage (the upstream API is `ExternalMetadataServiceV2.Create`, hence `createExternalMetadataV2`). User code reads `client.createExternalMetadataV2(...)` for a method on a `v1/` import — confusing on first read.
- **Category:** 8 (redundant suffix), 14 (Go/proto-style name leak), 20 (type/version suffix tautology).
- **Suggested name:** `createExternalMetadata`, `deleteExternalMetadata`, etc. (drop `V2`).
- **Rationale:** The user's call site is `import {Client} from '@databricks/sdk-externalmetadata/v1'; client.createExternalMetadataV2(...)` — `V2` is wire-RPC noise. Version belongs in the import path, not the method name. Same problem as #6; generator-wide concern.

### 8. `Client` — `src/v1/client.ts:41`
- **Why weird:** Class literally named `Client` at the top level of the package's surface. Re-exported through `index.ts` as just `Client`. Two packages co-existing in user code collide on import: `import {Client} from '@databricks/sdk-externalmetadata'` and `import {Client} from '@databricks/sdk-catalogs'` both fight for the same identifier.
- **Category:** 1 (vague — `Client` is the most generic name), 15 (generic name).
- **Suggested name:** `ExternalMetadataClient` (matches the package name and avoids collisions on combined imports).
- **Rationale:** A user combining packages must alias on every import (`import {Client as ExternalMetadataClient}`). Sister packages all share this problem — generator-wide rename worth raising upstream.

## Medium severity

### 9. `ExternalMetadata.url` — `src/v1/model.ts:51`
- **Why weird:** Casing of acronym. The codebase uses `url` (lowercase) consistently for the property, but the Web platform/standards canonical is `URL` (uppercase). Compare to `userAgent` (camelCase) and `URLSearchParams` (Web standard SCREAMING). Internal inconsistency between `url` (field) and `URLSearchParams` (function/class).
- **Category:** 3 (acronym casing).
- **Suggested name:** Keep `url` (TS convention), but acknowledge the JS-ecosystem split.
- **Rationale:** The JS world is split here — Node, browsers, and the URL spec all use `URL` for the class and `url` for member fields. Internal consistency within this file is preserved (`url` everywhere); the rule is conventional, not broken.

### 10. `ExternalMetadata.metastoreId` — `src/v1/model.ts:61`
- **Why weird:** Bare `metastoreId: string | undefined` — a UUID identifier on a UC metastore, but the type does not hint at the format. Idiomatic across the SDK; here mentioned only for rule-19 completeness. Also note: this field is "Unique identifier of parent metastore" but `parent` is not named — the metastore relationship is communicated via the `metastoreId` field alone, not a `parent` field per AIP-160.
- **Category:** 19 (underspecified ID — `string` doesn't tell you it's a UUID).
- **Suggested name:** Keep `metastoreId` (canonical across SDK).
- **Rationale:** SDK-wide pattern; field name is fine. Listed for completeness.

### 11. `UpdateExternalMetadataRequest.updateMask: FieldMask<ExternalMetadata>` — `src/v1/model.ts:101`
- **Why weird:** Field name `updateMask` doesn't say what kind of mask. In context the mask describes "which fields to patch". The Google AIP-134 convention names this `updateMask`; the TS-idiomatic name would describe contents (`fieldsToUpdate`, `patchedFields`, `paths`).
- **Category:** 1 (vague), 14 (Google-AIP-style name).
- **Suggested name:** Keep `updateMask` (AIP-134 canon) or rename to `fieldsToUpdate`.
- **Rationale:** Sticking to AIP-134 is fine; SDK-wide pattern. Listed for awareness.

## Low severity

_None._

## Observations

### 12. Identifier doubling for path + UUID
The `ExternalMetadata` type has both `name` (the URL-path key) and `id` (the system UUID). Sister packages handle this differently — some collapse to `name` only, some collapse to `id` only, some keep both with explicit `nameOrId` semantics in JSDoc. The lack of a single SDK-wide convention is the underlying problem; per-package, this manifests as #5.

### 13. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete`/`List` consistently — no `Fetch`/`Retrieve`/`Read`/`Remove`. Verb consistency is good.

## Domain glossary
- `uc` / Unity Catalog — implicit across all types (the registered entities live in a UC metastore).
- `metastore` / `metastoreId` — UC metastore (the top-level UC namespace); the `metastoreId` is a UUID.
- `external-metadata` — the wire name for the resource registered in the lineage-tracking subsystem; refers to metadata about an entity living *outside* Databricks (a Tableau dashboard, a Kafka topic, etc.).
- `lineage-tracking` — the URL path prefix `/api/2.0/lineage-tracking/...`; the broader subsystem this package belongs to.
- `system` / `SystemType` — the external vendor system (Tableau, Snowflake, Kafka, ...). Closed enum.
- `entity` / `entityType` — the kind of object *within* the external system (a Tableau workbook vs. a dashboard; a Kafka topic vs. a partition). Open string, not enumerated.
- `BROWSE`, `MANAGE`, `MODIFY`, `CREATE_EXTERNAL_METADATA` — UC privileges referenced in method JSDoc but not modeled as types.
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask`).
- `properties` — user-defined `Record<string,string>`.
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (221 lines): read fully.
- `src/v1/client.ts` (271 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
