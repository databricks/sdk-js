# Naming Audit: systemschemas

**Path:** `packages/systemschemas/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog *system schemas* (curated, server-managed schemas such as `access`, `billing`, `lineage`, `query`) — enable/disable a system schema in a metastore and list the system schemas under a metastore.
**Total weird names flagged:** 10

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |
| Low | 2 |
| Observation | 2 |

## High severity

### 1. Package name `systemschemas` collides with the sibling `schemas` package — `packages/systemschemas/` vs `packages/schemas/`
- **Why weird:** Two top-level packages for closely related Unity Catalog concepts: `schemas` (user-defined schemas: full CRUD with `CreateSchema`, `DeleteSchema`, etc.) and `systemschemas` (server-managed schemas: only enable/disable/list). A consumer searching `npm ls @databricks/sdk-*` sees two near-identical names; an import alias of `schemas` from either package shadows the other.
- **Category:** 12 (duplicate concept across packages).
- **Suggested name:** Either fold `systemschemas` into `schemas` as a `system` sub-namespace (`@databricks/sdk-schemas/system`), or rename to something less collision-prone such as `unityCatalogSystemSchemas` / `metastoreSystemSchemas`.
- **Rationale:** The two packages export different `Client` classes; the domain word `Schema` appears in both with overlapping vocabulary. Anything that lessens that overlap — even just keeping them under one package — would reduce caller confusion.

### 2. `SystemSchemaInfo` — `src/v1/model.ts:53`
- **Why weird:** `Info` is a generic, content-free suffix on the package's central domain entity. This is *the* system schema — it should just be `SystemSchema`. The `Info` suffix is on the vague-suffix list in `typescript.mdc`. It also infects the field name (`schemas: SystemSchemaInfo[]`) which awkwardly reads as "an array of info".
- **Category:** 1 (vague `Info`), 8 (redundant type suffix).
- **Suggested name:** `SystemSchema`.
- **Rationale:** `SystemSchema` is the noun consumers think about. `schemas: SystemSchema[]` reads cleanly; `schemas: SystemSchemaInfo[]` does not.

### 3. `SystemSchemaInfo.state: string` — `src/v1/model.ts:60`
- **Why weird:** Typed as `string` despite the doc enumerating six concrete values (`AVAILABLE | ENABLE_INITIALIZED | ENABLE_COMPLETED | DISABLE_INITIALIZED | UNAVAILABLE | MANAGED`). This is the package's only enum-shaped field and the only piece of state the consumer reads back, yet it ships as a stringly-typed value. Every other package in the SDK exposes such fields as TS enums. The comment "An empty string means the system schema is available and ready for opt-in" further muddles things — it contradicts `AVAILABLE` being one of the listed values.
- **Category:** 16 (field type contradicts the documented domain), 6 (misleading — doc says enum, type says `string`).
- **Suggested name:** Introduce `SystemSchemaState` enum with members `Available | EnableInitialized | EnableCompleted | DisableInitialized | Unavailable | Managed` and type the field `state: SystemSchemaState`.
- **Rationale:** Almost certainly a generator/upstream-API miss; the wire surface is enum-shaped and should round-trip through a TS enum. Worth raising upstream.

## Medium severity

### 4. `DisableSystemSchemaRequest.metastoreId: string | undefined` is in fact required — `src/v1/model.ts:9`
- **Why weird:** Marked optional, but `client.ts:75` template-interpolates `${req.metastoreId ?? ''}` straight into the URL path `metastores/.../systemschemas/...`. An empty path segment yields a malformed URL (or a 404). The "optional" annotation is misleading. Same pattern on `EnableSystemSchemaRequest.metastoreId`, `DisableSystemSchemaRequest.schema`, `EnableSystemSchemaRequest.schema`, `ListSystemSchemasRequest.metastoreId`.
- **Category:** 6 (misleading optionality), 16 (field type contradicts domain — these are mandatory path params).
- **Suggested name:** Keep names; change type to non-optional. (Out of scope for a *naming* audit, but the optionality leaks into how the names should be interpreted.)
- **Rationale:** Path-required fields must be required. Treating them as optional weakens the contract; the name `metastoreId` reads as "the metastore id" but the type says "you can omit this".

### 5. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:37`
- **Why weird:** `Segment` is a generic CS term. Comment explains it's the User-Agent identity segment; without the comment the constant name doesn't communicate intent.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Minor; flagged for cross-SDK consistency since the same constant appears in every generated client.

### 6. `Client` — `src/v1/client.ts:42`
- **Why weird:** Class is just `Client` (no domain qualifier). Once a consumer imports `import {Client} from '@databricks/sdk-systemschemas/v1'`, the bare name carries no clue about which API surface it talks to. The other generated packages have the same problem, so they all clash on import.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `SystemSchemasClient`.
- **Rationale:** Forces consumers to alias on import (`import {Client as SystemSchemasClient}`) if they ever combine clients. Every generated package has this issue; flagged for consistency.

## Low severity

### 7. `nextPageToken` is `string | undefined` but server may also return empty-string — `src/v1/model.ts:50`, `client.ts:185`
- **Why weird:** `listSystemSchemasIter` (client.ts:185) checks `resp.nextPageToken === undefined || resp.nextPageToken === ''` to know it's done — i.e., the wire uses an empty string as a sentinel. The TS type `nextPageToken: string | undefined` doesn't capture this contract; readers must inspect the iterator code to learn that `''` is a terminator.
- **Category:** 6 (misleading — type allows `''` but doc says "Absent if there are no more pages"), 16 (field-vs-doc mismatch).
- **Suggested name:** Keep the name; tighten the contract by replacing `''` with `undefined` in the zod transform (model.ts:78-83) so callers see a consistent sentinel.
- **Rationale:** A naming review surfaces the contract drift even though the renaming target is the marshaller, not the field.

### 8. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions whose names differ by a single `Http` infix, handling very different layers (retry/rate-limit wrapper vs raw HTTP send + logging).
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp` (or `wrapCall` / `dispatchHttp`).
- **Rationale:** Same pattern across the SDK; collected for the cross-package sweep.

## Observations

### 9. Action-verb consistency in `Client`
Methods are `disable`, `enable`, `list` — no mixed `delete`/`remove` or `fetch`/`get`. The pair `enable` / `disable` is also a clean antonym, which is good. Flagged per rule 17 because the audit asked for inconsistency *and* notable consistency.

### 10. Domain noun overlap: `Schema`, `SystemSchema`, `schemas:` field, `Schema` zod
The word "schema" appears in this single package as a wire field, a domain noun (`SystemSchema`), the package name (`systemschemas`), and a library term (zod's `Schema`). Multiple overlapping uses of the same word in a 106-line model file. Worth raising as a package-design issue rather than a per-name fix.
- **Category:** 12 (duplicate concept), 17 (inconsistent meaning of same word within one module).

## Domain glossary
- `metastore` — Unity Catalog metastore (container that owns catalogs/schemas).
- `system schema` — curated, Databricks-managed schema (e.g. `access`, `billing`, `lineage`) attached to a metastore via opt-in enablement.
- `catalog` — Unity Catalog catalog; the namespace that the enabled system schema appears under.
- `state` (enum-shaped string field): `AVAILABLE`, `ENABLE_INITIALIZED`, `ENABLE_COMPLETED`, `DISABLE_INITIALIZED`, `UNAVAILABLE`, `MANAGED` — undocumented externally; the source comment in `model.ts:57-58` is the only place these values are listed.
- `uc` — Unity Catalog (appears in URL paths only: `/api/2.1/unity-catalog/...`).
- `abac` / `oss` / `m2m` / `u2m` / `pat` / `wkt` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (106 lines): read fully.
- `src/v1/client.ts` (191 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
