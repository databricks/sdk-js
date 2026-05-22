# Naming Audit: postgres

**Path:** `packages/postgres/src/v1/`
**Versions audited:** v1
**Inferred domain:** Lakebase Autoscaling Postgres — manages Lakebase `Project`s, `Branch`es (Postgres-style branching for PITR / dev forks), `Endpoint`s (autoscaling read-write or read-only compute endpoints), `Database`s (logical Postgres databases inside a branch), `Role`s (Postgres roles bound to Databricks identities or plain Postgres roles), `SyncedTable`s (UC-managed Delta→Postgres sync pipelines), `Catalog`s (Unity Catalog mirrors of logical PG databases), short-lived `DatabaseCredential`s, and long-running `Operation`s with per-resource `*Operation` waiter-style classes.
**Total weird names flagged:** 53

## Summary
| Severity | Count |
| --- | --- |
| High | 9 |
| Medium | 31 |
| Low | 11 |
| Observation | 2 |

## High severity

### 1. Package name `postgres` does not say "Lakebase" / "autoscaling" / "managed-PG" — `packages/postgres/`
- **Why weird:** Generic single-word name for a Databricks-specific service. The actual product is "Lakebase Autoscaling Postgres" (see JSDoc `createProject`, `client.ts:339`). Sibling package `database` covers earlier-generation Lakebase (`DatabaseInstance` / V1), and `postgres` is V2 — see `database/naming-audit/database.md` finding #2. Neither package name says "Lakebase" or makes the V1/V2 lineage discoverable.
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages).
- **Suggested name:** `lakebase` (and merge with `database`), or `lakebase-autoscaling`, or `lakebase-v2`. At minimum, add an `index.ts` JSDoc declaring "Lakebase Autoscaling Postgres (V2 OLTP)".
- **Rationale:** `postgres` is too broad — Databricks also has Postgres-backed services elsewhere (DBSQL, query history, etc.). Naming should encode the product.

### 2. `postgres` and `database` packages overlap heavily — `packages/postgres/` vs `packages/database/`
- **Why weird:** Many duplicate type names remain across the two packages: `DeltaTableSyncInfo` (`model.ts:1169`), `SyncedTablePosition` (`model.ts:2012`), `SyncedTablePipelineProgress` (`model.ts:1996`), `NewPipelineSpec` (`model.ts:1544`), `DatabaseCredential` (`model.ts:1079`), `GenerateDatabaseCredentialRequest` (`model.ts:1361`), `RequestedClaims` (`model.ts:1750`), `RequestedResource` (`model.ts:1755`), `ProvisioningInfo` (`model.ts:1748`), `ProvisioningInfo_State`/`SyncedTableState`/`RequestedClaims_PermissionSet`. Identical signatures but exported from two packages — a TS user importing both gets noisy alias-juggling.
- **Category:** 12 (duplicate concept across packages), 6 (misleading: same name, two definitions).
- **Suggested name:** Pick one as canonical; the other re-exports from the canonical or marks itself deprecated. Cross-reference each shared type with a JSDoc note like "Equivalent to `database/v1.DeltaTableSyncInfo`; see go/lakebase-v2 for the migration."
- **Rationale:** Same as `database` finding #2 — `postgres` is V2 and `database` is V1; nothing in the names says so.

### 3. `ErrorCode` enum — 102 long, mostly-deprecated values — `src/v1/model.ts:17-515`
- **Why weird:** Huge enum (~100 entries) referenced exactly once via `DatabricksServiceExceptionWithDetailsProto.errorCode` (1091). Most entries are explicitly marked "NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it, avoid using it in the new APIs" (e.g. `IO_ERROR`, `INVALID_STATE`, `UNPARSEABLE_HTTP_ERROR`, `QUOTA_EXCEEDED`, `MAX_BLOCK_SIZE_EXCEEDED`, `DRY_RUN_FAILED`, `MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST`, all the `GIT_*`, `IPYNB_FILE_IN_REPO`, `INSECURE_PARTNER_RESPONSE`, `METASTORE_*_EXISTS`, `CATALOG_NOT_EMPTY`, `PROVIDER_SHARE_NOT_ACCESSIBLE`, etc. — at least 40 entries). The enum re-exports the entire Databricks-platform error vocabulary into a Postgres-specific SDK package.
- **Category:** 7 (overly verbose), 11 (empty/trivial wrappers for deprecated values), 14 (Go/proto leak — all deprecated values exist only "for public APIs that use it"), 18 (long enum values).
- **Suggested name:** Move `ErrorCode` to a shared `core/apierror` package (already exists per CLAUDE.md), drop deprecated values from the public TS surface (or mark them `@deprecated` so TS tooling can warn).
- **Rationale:** Every consumer of this package gets a 100-entry deprecated-warning bundle. The fact that it's exported from `postgres/v1/index.ts` (line 30) means it's part of the public surface.

### 4. Three "State" enums share value vocabulary but use two different qualifier patterns — `src/v1/model.ts:581, 600, 610`
- **Why weird:** Three state enums use two different qualifier patterns:
  - Branch state and endpoint state qualify by the status struct (`BranchStatus`-scoped, `EndpointStatus`-scoped).
  - Provisioning state lives under the unrelated `ProvisioningInfo` wrapper.
  - All three enums share values like `INIT`, `ACTIVE`, etc. The TypeScript user can't tell which enum to use for which resource without reading the JSDoc.
- **Category:** 17 (inconsistent naming pattern).
- **Suggested name:** Standardise to `<Resource>State`: `BranchState`, `EndpointState`, `ProvisioningState`.
- **Rationale:** Three state enums with two naming conventions across one package.

### 5. `Role_Attributes.createdb` / `createrole` / `bypassrls` — Postgres-keyword-style lowercase fields — `src/v1/model.ts:1793-1795`
- **Why weird:** Three lowercase run-together field names. Doc comment (lines 1786-1789) acknowledges the choice ("The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical underscores between words"). That's a wire-format justification (Postgres keywords). The TypeScript identifier should still be camelCase. `createrole` is especially confusing — could read as `createRole` (verb) or `creator_ole`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Postgres-keyword names not idiomatic in TS), 17 (inconsistent — every other field in the package is camelCase).
- **Suggested name:** `createDb`, `createRole`, `bypassRls` in the TS type; wire stays `createdb`/`createrole`/`bypassrls`.
- **Rationale:** Same finding as `database` audit #5 — both packages share this bug.

### 6. `Role_AuthMethod.PG_PASSWORD_SCRAM_SHA_256` and `LAKEBASE_OAUTH_V1` enum values — `src/v1/model.ts:633, 638`
- **Why weird:** Implementation details (SCRAM-SHA-256 mechanism, OAuth `_V1`) leak into the public enum. The `_V1` suffix begs the question: what happens at V2? Should the SDK consumer have to migrate from `LAKEBASE_OAUTH_V1` to `LAKEBASE_OAUTH_V2` when the wire format changes? Worse, the `SCRAM_SHA_256` qualifier is a specific hash function — consumers picking an auth method shouldn't have to know about hash schemes.
- **Category:** 1 (vague at the wrong level — too specific), 6 (misleading: `LAKEBASE_OAUTH_V1` versioning leaks), 14 (Postgres/auth-spec internal naming), 18 (long enum values).
- **Suggested name:** `Password` (replacing `PG_PASSWORD_SCRAM_SHA_256`) and `OAuth` (replacing `LAKEBASE_OAUTH_V1`). Keep `NoLogin`. Push the wire-protocol-specific names into the marshal layer.
- **Rationale:** Public enums should describe the *concept* (password vs OAuth vs no-login), not the wire-protocol mechanism.

### 7. `DatabricksServiceExceptionWithDetailsProto.details: Record<string, unknown>[]` — array of opaque records — `src/v1/model.ts:1094`
- **Why weird:** `details` is `Record<string, unknown>[]` — an array of unknown bags. Consumers get no type help. The type is reached via `Operation.result` (line 1588), making it the SDK's primary error surface. Every error consumer must cast.
- **Category:** 1 (vague), 15 (generic), 16 (type contradicts domain — details have structure, just unmodelled).
- **Suggested name:** Add typed discriminator: `details: ErrorDetail[]` with `ErrorDetail = ResourceInfo | RetryInfo | …` aligned to `google.rpc.Status`.
- **Rationale:** Errors are the most-handled values in any SDK; opaque `unknown` arrays force every caller to write defensive code.

### 8. 21 separate `*Operation` classes — one per CRUD verb per resource — `src/v1/client.ts:1512-3345`
- **Why weird:** The package exports 21 boilerplate poller classes (each ~80 lines, near-identical): `CreateBranchOperation`, `CreateCatalogOperation`, `CreateDatabaseOperation`, `CreateEndpointOperation`, `CreateProjectOperation`, `CreateRoleOperation`, `CreateSyncedTableOperation`, `DeleteBranchOperation`, `DeleteCatalogOperation`, `DeleteDatabaseOperation`, `DeleteEndpointOperation`, `DeleteProjectOperation`, `DeleteRoleOperation`, `DeleteSyncedTableOperation`, `UndeleteBranchOperation`, `UndeleteProjectOperation`, `UpdateBranchOperation`, `UpdateDatabaseOperation`, `UpdateEndpointOperation`, `UpdateProjectOperation`, `UpdateRoleOperation`. Each has identical `name()` / `metadata()` / `wait()` / `done()` methods, differing only in return type (`Branch` vs `Catalog` vs `Database` etc.). All 21 are exported from `index.ts:5-26`.
- **Category:** 7 (overly verbose), 11 (trivial wrappers), 14 (Go-style poll-helper pattern), 17 (21-way redundancy).
- **Suggested name:** Single generic `Operation<T, M>` class with `wait(): Promise<T>` and `metadata(): Promise<M | undefined>`. Drop all 21 named exports; expose factory methods on `Client` like `createBranchOperation()` that return `Operation<Branch, BranchOperationMetadata>`.
- **Rationale:** Comparable to `database/v1/client.ts`'s `CreateDatabaseInstanceWaiter` — but here the pattern is repeated 21 times. This bloats the bundle, the public surface, and the autocomplete list.

### 9. `DatabricksServiceExceptionWithDetailsProto` — proto-architectural-leak type name — `src/v1/model.ts:1090`, `index.ts:64`
- **Why weird:** The type name carries two architectural leaks in one identifier: mid-position `Service` (the server-side concept the message originates from) and a trailing `Proto` suffix (the wire-format origin). Neither term is part of the domain. The same name surfaces on `Operation.result.error` (line 1592), so every SDK consumer who inspects an `Operation` error encounters "ServiceException...Proto" jargon. `WithDetails` is also a hand-rolled qualifier that mirrors how proto messages get suffixed when extended; an idiomatic TS API would just call this `DatabricksError` and treat the detail array as part of the error itself.
- **Category:** 14 (proto-architectural-leak — both `Service` mid and `Proto` suffix), 7 (overly verbose), 5 (5 stacked qualifiers — `Databricks` + `Service` + `Exception` + `WithDetails` + `Proto`).
- **Suggested name:** `DatabricksApiError` (or `DatabricksError`, matching `@databricks/sdk-databricks/apierror` conventions in CLAUDE.md). Drop `Service`, `Proto`, and the `WithDetails` distinguisher; the type already carries `details` as a first-class field.
- **Rationale:** The user explicitly flags `Service` mid-position and `Proto` suffix as architectural leaks; both appear in this one type name. The type is also a public, error-carrying surface, so the leak is highly visible.

## Medium severity

### 10. `Branch` / `Catalog` / `Database` / `Endpoint` / `Project` / `Role` / `SyncedTable` — 7 generic top-level resource names — `src/v1/model.ts` (multiple)
- **Why weird:** Most of these names are single-word generic English (`Branch`, `Catalog`, `Database`, `Endpoint`, `Project`, `Role`). Multiple are *already-taken* concepts in Databricks-land:
  - `Catalog` collides with Unity Catalog `Catalog` (in `catalogs` package)
  - `Database` collides with the `database` package's `DatabaseInstance` / `DatabaseCatalog`
  - `Endpoint` collides with `endpoints` package (Model Serving endpoints) and `vector-search endpoints`
  - `Project` is a generic word — Lakebase Projects are not the same as Bundle projects or Genie projects.
  - `Role` collides with workspace IAM roles and instance-profile roles.
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages).
- **Suggested name:** Namespace-qualify (e.g. `LakebaseBranch`, `LakebaseCatalog`, `LakebaseEndpoint`, `LakebaseProject`, `LakebaseRole`) or rely on TS module import (`import * as lakebase from '@databricks/sdk-postgres/v1'; lakebase.Branch`).
- **Rationale:** With 100+ packages in the workspace, single-word resource names guarantee collisions.

### 11. `Branch.uid` / `Endpoint.uid` / `Project.uid` / `SyncedTable.uid` — bare `uid` fields, sometimes vs `name` — `src/v1/model.ts:695, 1186, 1609, 1892`
- **Why weird:** Same problem as `database` finding #19: two identifier-like fields. `name` is a resource path (`projects/{id}/branches/{id}`), `uid` is "System-generated unique ID". Caller can't tell which to pass to `getBranch` (answer: `name`). Bare `uid` is non-descriptive — what scope (project? branch? UC table?).
- **Category:** 19 (underspecified id), 1 (vague `uid`).
- **Suggested name:** `branchUid` / `endpointUid` / `projectUid` / `syncedTableUid` (and add docs).
- **Rationale:** Same as `database` audit #19.

### 12. `Branch.name` / `Catalog.name` / etc. — `name` is a full resource path — `src/v1/model.ts:693, 816, 1018, 1184, 1607, 1771`
- **Why weird:** Field is `name?: string` but the doc constrains it to a multi-segment path like `projects/{project_id}/branches/{branch_id}`. There is a separate `branchId` / `catalogId` / `databaseId` / `endpointId` / `projectId` / `roleId` field in each status sub-type. Caller has to read JSDoc to know which to use.
- **Category:** 1 (vague), 19 (underspecified id), 6 (misleading — `name` reads as a human-readable name, actually a resource path).
- **Suggested name:** `resourceName` / `fullName` / `resourcePath` for the path-style field; keep the short ID where present.
- **Rationale:** `name` is the most ambiguous field name possible.

### 13. `Branch.parent` — string-typed parent path — `src/v1/model.ts:703`
- **Why weird:** `parent?: string` doc'd as "The project containing this branch (API resource hierarchy). Format: `projects/{project_id}`". Generic name; the type doesn't enforce the format. Same pattern repeats on `Database.parent` (1023), `Endpoint.parent` (1191), `Role.parent` (1776), `CreateBranchRequest.parent`, `CreateDatabaseRequest.parent`, etc.
- **Category:** 1 (vague), 15 (generic), 19 (underspecified — what kind of parent?).
- **Suggested name:** `projectName` / `branchName` / specific to the parent type. Or `parentResourceName`.
- **Rationale:** Parents differ per child type; `parent` is too generic.

### 14. `BranchSpec.expiration` discriminated union — `noExpiry: boolean` accepts an invalid `false` — `src/v1/model.ts:736-762`
- **Why weird:** Discriminated union of `expireTime` / `ttl` / `noExpiry`. The doc on `noExpiry` says "If set to false, the request is invalid; provide either ttl or expire_time instead." So the boolean's `false` value is documented as invalid — the type system permits a value the API rejects.
- **Category:** 16 (type allows `false` but spec rejects it).
- **Suggested name:** Use a union `expiration?: {expireTime: Instant} | {ttl: Duration} | 'never'`, or hoist the three to top-level mutually-exclusive optional fields.
- **Rationale:** Boolean fields whose `false` value is invalid encourage type-level lies.

### 15. `BranchStatus.default` — reserved-word collision — `src/v1/model.ts:776`
- **Why weird:** `BranchStatus.default: boolean | undefined` field clashes with the JS `default` keyword in `import { default } from …` contexts. While not a reserved word in object-property position, it's syntactically irritating and a JS lint hot spot.
- **Category:** 10 (reserved-word collision), 1 (vague — `default` of what?).
- **Suggested name:** `isDefault: boolean` (matches sibling `isProtected`).
- **Rationale:** `branch.default = true` reads weirdly; `branch.isDefault = true` aligns with `branch.isProtected`.

### 16. `createDatabaseIfMissing` field on the catalog spec — `src/v1/model.ts:856`
- **Why weird:** Boolean named as a SQL clause (`CREATE DATABASE IF MISSING`). Same as `database` audit #31 (`createDatabaseIfNotExists`) but with the variant wording "If Missing". Inconsistent with `database` package's "If Not Exists".
- **Category:** 14 (SQL-style name), 7 (verbose), 17 (inconsistent with sister package's `createDatabaseIfNotExists`).
- **Suggested name:** `ensureDatabaseExists` or `autoCreateDatabase`.
- **Rationale:** Two packages, two variants of the same SQL-DDL leak.

### 17. Every status sub-type duplicates the parent resource name on its id field — `src/v1/model.ts:797, 890, 1076, 1358, 1743, 1875`
- **Why weird:** Each status type has `<resource>Id` (`branchId`, `catalogId`, `databaseId`, `endpointId`, `projectId`, `roleId`) inside a status struct that already lives on the parent resource. Read site `catalog.status.catalogId` repeats "catalog" twice. JSDoc on every field is identical boilerplate: "The short identifier of the X, suitable for showing to the users."
- **Category:** 7 (verbose), 17 (boilerplate JSDoc), 20 (type-suffix tautology).
- **Suggested name:** `id: string` (the wrapping type name is already the resource).
- **Rationale:** `catalog.status.catalogId` is "catalog status catalog id" — verbose.

### 18. `CreateBranchRequest.branch` vs `CreateBranchRequest.branchId` — duplicate identifier semantics — `src/v1/model.ts:907, 909`
- **Why weird:** `CreateBranchRequest` has `parent`, `branchId`, `branch`, `replaceExisting`. `branchId` is the path-component id; `branch.name` (inside `Branch`) is the full resource path; `branch` is the body. Three fields all involved in identifying the branch.
- **Category:** 17 (inconsistency — same operation, three id-like fields), 19 (underspecified id semantics).
- **Suggested name:** Document the relationship clearly in JSDoc; or accept just `branch: Branch` and derive the id from `branch.name`.
- **Rationale:** Same shape repeats on `CreateCatalogRequest`, `CreateDatabaseRequest`, `CreateEndpointRequest`, `CreateProjectRequest`, `CreateRoleRequest`, `CreateSyncedTableRequest`. Caller must read multiple field docs to know which ID to set.

### 19. `CreateBranchRequest.replaceExisting` / `CreateEndpointRequest.replaceExisting` — request-shaped name on a create call — `src/v1/model.ts:911, 959`
- **Why weird:** `replaceExisting?: boolean` on a `Create*` request is essentially "upsert mode". Doc: "If true, update the branch if it already exists instead of returning an error." Many SDKs call this `upsert: true` or `ifExists: 'update'`. Verb is also imperative on a request body.
- **Category:** 17 (inconsistent — `create` verb + `replaceExisting` flag conflate two operations), 1 (vague — "replace" how?).
- **Suggested name:** `upsert: boolean` or `mode: 'create' | 'upsert'`.
- **Rationale:** "Create-or-update" is a common API pattern that deserves a clearer name.

### 20. `Database.parent` is a branch path, `Database.spec.role` is a role path, `Database.status.role` is *also* a role path — `src/v1/model.ts:1023, 1044, 1063`
- **Why weird:** Two `role` fields on the spec and status sub-structs, both holding full resource paths like `projects/{}/branches/{}/roles/{}`. `Database.spec.role` is the *desired owner role*; `Database.status.role` is the *observed owner role*. Doc clarifies but the field-name overlap is jarring.
- **Category:** 19 (underspecified id — `role` is actually a role resource path), 1 (vague — `role` could be many things).
- **Suggested name:** `ownerRole` or `ownerRoleName`. Use the same name on spec and status.
- **Rationale:** Inside a `Database` struct, a bare `role: string` reads as "what role does this database have" — but it's specifically the *owner* role.

### 21. `postgresDatabase` field appears on both the database spec and status sub-types — `src/v1/model.ts:1054, 1065`
- **Why weird:** `Database.spec.postgresDatabase` and `Database.status.postgresDatabase` repeat "database" three times in one member access — the wrapper type is already `Database`.
- **Category:** 20 (type-suffix tautology), 7 (verbose).
- **Suggested name:** `pgName` / `pgIdentifier` or just `name` (with a JSDoc note: "matches the Postgres database identifier").
- **Rationale:** Same as #17.

### 22. `Database` (SDK resource) vs `postgresDatabase` field (Postgres-side identifier) — same thing, two names — `src/v1/model.ts:1013, 1054`
- **Why weird:** Class `Database` represents the SDK resource; field `postgresDatabase` is the underlying PG name. So `Database` is an SDK noun and `postgresDatabase` is the actual PG-server-side identifier. The field name is what the Postgres-savvy reader expects; the type name is the SDK abstraction. Reading `db.spec.postgresDatabase` requires you to track two abstraction layers.
- **Category:** 1 (vague — `Database` could be either layer), 6 (misleading — both names describe the same physical thing).
- **Suggested name:** Rename either the type (to `DatabaseResource` or `LakebaseDatabase`) or the field (to `pgName`).
- **Rationale:** Disambiguate the SDK resource from the Postgres server-side concept.

### 23. `Database` and `databaseId` query parameter for `createDatabase` — `src/v1/client.ts:245-289`, `model.ts:939`
- **Why weird:** Operation is "Create a Database" — but `CreateDatabaseRequest` has `parent`, `databaseId`, and `database`. The body is `database`; the query param is `databaseId`. The path is `/postgres/${req.parent}/databases`. Three places carry the name. JSDoc on `databaseId` says "If database_id is not specified in the request, it is generated automatically." But the JSDoc on `database` (the body) says nothing about how it relates to `databaseId`.
- **Category:** 17 (inconsistency — three identifier slots), 6 (misleading — caller doesn't know which to use).
- **Suggested name:** Move identifier into `database.name`; flatten the request to `{database, parent, replaceExisting}`.
- **Rationale:** Three identifier slots is too many.

### 24. `DatabaseCredential.token: string` carries no doc on format — `src/v1/model.ts:1081`
- **Why weird:** "The OAuth token that can be used as a password when connecting to a database." Plain `string`. Sibling `expireTime: Temporal.Instant` does carry a type. The token doc doesn't say whether it's a JWT, opaque, format `<prefix>:<base64>`, etc. Same issue exists in `database/v1.DatabaseCredential.token`.
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `accessToken` (and document the format/lifetime in JSDoc).
- **Rationale:** Tokens carry semantics; consumers need to know the format.

### 25. `Endpoint.endpointType` field of type `EndpointType` — `src/v1/model.ts:1272`
- **Why weird:** `endpoint.endpointType` is type-suffix tautology again: three "endpoint"s. The field of type `EndpointType` could just be `type` since the surrounding type is `Endpoint`.
- **Category:** 20 (type-suffix tautology), 7 (verbose).
- **Suggested name:** `type: EndpointType` (or `kind`).
- **Rationale:** Same as #17.

### 26. `EndpointSpec.autoscalingLimitMinCu` / `autoscalingLimitMaxCu` — `Cu` suffix is opaque — `src/v1/model.ts:1274, 1279`
- **Why weird:** `Cu` stands for "Compute Unit" (referenced in JSDoc on `EndpointSpec`). Field name doesn't expand the acronym. `MinCu` / `MaxCu` reads as `min cu` / `max cu` — `cu` could be currency unit, control unit, or anything.
- **Category:** 5 (cryptic abbreviation), 1 (vague suffix).
- **Suggested name:** `minComputeUnits` / `maxComputeUnits`, or `autoscalingMinComputeUnits` / `autoscalingMaxComputeUnits`.
- **Rationale:** "CU" is Lakebase-internal slang.

### 27. `EndpointGroupSpec.min` / `max` with `min === max` constraint — `src/v1/model.ts:1207, 1213`
- **Why weird:** Two bare fields `min: number` / `max: number` (and `enableReadableSecondaries`) on a group spec. JSDoc says "Currently, this must be equal to max" — meaning callers must set min === max. Type system doesn't enforce; bare `min`/`max` doesn't suggest "group size".
- **Category:** 1 (vague), 16 (type contradicts spec — allows min ≠ max).
- **Suggested name:** `size: number` (until min ≠ max becomes supported, then introduce `minSize`/`maxSize`).
- **Rationale:** Pseudo-flexibility leaks proto future-proofing.

### 28. `EndpointSpec.suspension` discriminated union — `noSuspension: boolean` accepts an invalid `false` — `src/v1/model.ts:1293-1312`
- **Why weird:** Same pattern as #14 — one variant carries a duration, the other a boolean documented as accepting only `true`. The type permits `false`, the spec rejects it.
- **Category:** 16 (type allows `false` but spec rejects), 27 (echo of #14).
- **Suggested name:** Inline: `suspension?: Temporal.Duration | 'never'`.
- **Rationale:** Same as #14.

### 29. `EndpointSettings.pgSettings: Record<string, string>` field — `src/v1/model.ts:1261`
- **Why weird:** `pgSettings` is a map of Postgres GUC settings (e.g. `{ work_mem: '4MB' }`). Generic value type `string`. No validation. Field name `pgSettings` is itself ambiguous — could be any kind of setting.
- **Category:** 14 (proto map-entry shape leaks into TS), 1 (vague — `pgSettings` could be any kind of setting).
- **Suggested name:** `postgresGucSettings: Record<string, string>` (more specific).
- **Rationale:** Field name should encode the domain (Postgres GUC parameters).

### 30. `GenerateDatabaseCredentialRequest.expiration` discriminated union — _removed in regeneration_; only the simpler `claims` + `endpoint` shape remains — see #39
_Reserved._

### 31. `Operation.metadata: Record<string, unknown>` — opaque metadata field — `src/v1/model.ts:1575`
- **Why weird:** Plain `Record<string, unknown>`. The 21 `*Operation` classes each parse this metadata into a specific `*OperationMetadata` type at runtime (`client.ts:1524-1533` etc.). But the public `Operation` type doesn't carry the metadata type as a generic parameter, so a consumer reading `op.metadata` directly has no help.
- **Category:** 15 (generic), 16 (loose typing).
- **Suggested name:** `Operation<T>` with `metadata?: T` (generic); each `*Operation` class returns `Operation<BranchOperationMetadata>` etc.
- **Rationale:** Same root cause as #7 — opaque records on the public surface.

### 32. `Operation.result` discriminated union with `error` / `response` — `src/v1/model.ts:1588-1599`
- **Why weird:** Variant `response` carries `Record<string, unknown>` (line 1597). Variant `error` carries the typed `DatabricksServiceExceptionWithDetailsProto`. Asymmetric: error is typed, response isn't. (The `*Operation.wait()` methods cast via Zod, but the public type stays opaque.)
- **Category:** 16 (asymmetric typing), 15 (generic on success arm).
- **Suggested name:** Same as #31 — generic `Operation<TResult, TMetadata>` with both arms typed.
- **Rationale:** Same as #7, #31.

### 33. `Project.initialEndpointSpec` — write-only field exposed on read shape — `src/v1/model.ts:1624`
- **Why weird:** `Project` carries an `initialEndpointSpec` field that is a create-time-only input but exposed on the response type too — a read-flow consumer sees a field that is typically empty after project creation.
- **Category:** 7 (overly verbose surface), 16 (write-only fields exposed on read shape).
- **Suggested name:** Hoist the `initialEndpointSpec` onto `CreateProjectRequest` only (where it belongs); leave `Project` to spec/status.
- **Rationale:** Same as `database` audit #12 — input/output shape confusion.

### 34. `ProjectCustomTag` vs the `database` package's `CustomTag` — `src/v1/model.ts:1637`, `database:206`
- **Why weird:** `ProjectCustomTag` and `CustomTag` (in `database`) are textually identical (`{key, value}`). The `Project` prefix is package-scope tautology. Catalogs SDK and others use `CustomTag` too.
- **Category:** 12 (duplicate concept across packages), 20 (type-prefix tautology — `ProjectCustomTag` on `ProjectSpec.customTags`).
- **Suggested name:** `CustomTag` (drop the `Project` prefix). Or share a single `CustomTag` across SDK packages.
- **Rationale:** 13 duplicated `{key, value}` shapes in the workspace would be a useful audit.

### 35. `ProjectSpec.pgVersion: number` vs `ProjectStatus.pgVersion: number` — Postgres version as integer — `src/v1/model.ts:1687, 1716`
- **Why weird:** Doc says "The major Postgres version number. The set of supported versions may vary; consult the API documentation for currently accepted values." Type is `number` (integer). Better to be an enum (`Pg16 | Pg17`) or `'16' | '17'` to encode "supported values". Also note `pgVersion: string` on `database/v1.DatabaseInstance` (the V1 package uses string) — inconsistent across the two packages.
- **Category:** 16 (type contradicts domain — open `number`), 17 (inconsistent with `database.DatabaseInstance.pgVersion` which is `string`).
- **Suggested name:** `pgMajorVersion: 16 | 17` or an enum.
- **Rationale:** Aligns documented constraints with the type system.

### 36. `ProjectSpec.historyRetentionDuration` vs `ProjectStatus.historyRetentionDuration` — copy of input on output — `src/v1/model.ts:1689, 1718`
- **Why weird:** Same field appears on `ProjectSpec` (input) and `ProjectStatus` (output, doc'd as "effective"). The output doesn't add an "effective" prefix as `database/v1` does, but the JSDoc on `ProjectStatus` does say "The effective number of seconds…". Inconsistency: `database` uses `effective_` prefix on output, `postgres` (this package) drops it. Could be progress, could be a regression — flag for clarity.
- **Category:** 17 (inconsistent with sister package).
- **Suggested name:** Pick one convention across the two packages.
- **Rationale:** Mixed conventions encourage bugs when bridging between SDKs.

### 37. `ProjectSpec.enablePgNativeLogin` / `ProjectStatus.enablePgNativeLogin` — request-shaped verb on response — `src/v1/model.ts:1704, 1732`
- **Why weird:** Same problem as `database` audit #26: `enableX: boolean` reads as imperative on a response type. `ProjectStatus.enablePgNativeLogin` should read "is PG native login enabled".
- **Category:** 6 (misleading verb form), 17 (input/output asymmetry).
- **Suggested name:** Input: `enablePgNativeLogin`. Output: `pgNativeLoginEnabled`.
- **Rationale:** Same as `database` audit #26.

### 38. `timeseriesKey` field casing on the synced-table spec — `src/v1/model.ts:1936`
- **Why weird:** Same as `database` audit #36: `timeseries` is one run-together word but English has `timeSeries` (two words). Wire is `timeseries_key`.
- **Category:** 3 (acronym/casing inconsistency), 17 (inconsistent with neighbours).
- **Suggested name:** `timeSeriesKey`.
- **Rationale:** Same as `database` audit #36.

### 39. Synced-table spec fields `createDatabaseObjectsIfMissing` — same fields, same issues as `database` package — `src/v1/model.ts:1951`
- **Why weird:** Identical to `database` audit findings on synced-table-spec naming. Won't re-state at length; flag that the duplication exists across both packages with identical naming. Other related fields (`acceleratedSync`, `extraIndexDefinitions`, `extraColumnDefinitions`, `typeOverrides`) were removed during regeneration; only the `createDatabaseObjectsIfMissing` "If Missing" pattern remains here, matching `database` package's similar wording.
- **Category:** 12 (duplicate concept), 17 (inherited inconsistencies).
- **Suggested name:** Same suggestions as `database` audit.
- **Rationale:** Two SDKs, same problems.

### 40. `UpdateBranchRequest.updateMask: FieldMask<Branch>` — Google API protocol leak — `src/v1/model.ts:2057`
- **Why weird:** Generic `FieldMask<T>` is a Google-API-protocol-buffers thing for partial updates. The naming is correct for an AIP-conformant API; less correct for an idiomatic TS SDK. Same on `UpdateDatabaseRequest`, `UpdateEndpointRequest`, `UpdateProjectRequest`, `UpdateRoleRequest`.
- **Category:** 14 (Google AIP/proto leak), 1 (vague — `updateMask` is jargon).
- **Suggested name:** `fields?: (keyof Branch)[]` or `patch?: Partial<Branch>` (and derive the field-mask). The `FieldMask` import already comes from `@databricks/sdk-core/wkt` (well-known types) — the SDK already lifts the type.
- **Rationale:** AIP `FieldMask` is an industry pattern, but it should not be the only update affordance.

### 41. `getOperation` / `Operation.name` — operation name is a resource path — `src/v1/client.ts:856`, `model.ts:1569`
- **Why weird:** `getOperation({name: ...})` takes a `string` that is actually a path like `operations/{unique_id}`. The doc on `Operation.name` says "If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`." But it doesn't validate.
- **Category:** 19 (underspecified id), 6 (misleading — `name` reads like a label).
- **Suggested name:** `operationResourceName` / `operationPath` / `id`.
- **Rationale:** Same as #12.

## Low severity

### 42. `BranchSpec.sourceBranch` / `sourceBranchLsn` / `sourceBranchTime` — `src/v1/model.ts:723, 725, 727`
- **Why weird:** Three sibling fields on `BranchSpec`. `sourceBranch` is a path; `sourceBranchLsn` and `sourceBranchTime` are alternative cutover specifiers (one or the other). Bare `branchTime` repeats from `database/v1.DatabaseInstanceRef.branchTime` (see `database` audit #29).
- **Category:** 1 (vague — `branchTime` is a cutover instant, not a time-of-branch).
- **Suggested name:** `sourceBranch` / `sourceBranchLsn` / `sourceBranchTime` are OK; consider `sourceBranchAtLsn` / `sourceBranchAtTime` for clarity.
- **Rationale:** Same as `database` audit #29.

### 43. `BranchSpec.expireTime` (inside union variant) vs `BranchStatus.expireTime` (top-level) — `src/v1/model.ts:743, 788`
- **Why weird:** Field name `expireTime` appears twice: once as a discriminated-union variant on `BranchSpec` (input), once as a top-level field on `BranchStatus` (output). Reader has to track that the input shape collapses `expireTime`/`ttl`/`noExpiry` to a single output value `expireTime`.
- **Category:** 17 (input/output shape mismatch).
- **Suggested name:** Document the asymmetry in JSDoc; or expose the same union shape on output.
- **Rationale:** Generator-driven asymmetry.

### 44. `BranchSpec.ttl: Temporal.Duration` and `BranchSpec.expireTime` — `ttl` is a duration, `expireTime` is a timestamp — `src/v1/model.ts:751, 743`
- **Why weird:** `ttl` (time-to-live) and `expireTime` are sibling variants. `ttl` is duration-shaped; `expireTime` is timestamp-shaped. Bare `ttl` is a Unix-cache-style abbreviation.
- **Category:** 5 (cryptic abbreviation — `ttl`).
- **Suggested name:** `lifetime: Duration` or `expireAfter: Duration`.
- **Rationale:** `TTL` is widely understood but expansion improves grep-ability.

### 45. `CreateBranchRequest.replaceExisting` (Create) — no symmetrical `allowMissing` on Delete (Delete uses `purge`) — `src/v1/model.ts:911, 1104, 1142`
- **Why weird:** Create uses `replaceExisting: boolean` (proactive). Delete now uses `purge: boolean` only (`allowMissing` field removed in regeneration). Mismatched conventions for "if it does/doesn't exist" remain.
- **Category:** 17 (inconsistent action verbs across CRUD).
- **Suggested name:** Pick one: `ifExists: 'update' | 'error'` and `ifMissing: 'ignore' | 'error'`, or just both `upsert` and `ignoreIfMissing`.
- **Rationale:** Inconsistent options across CRUD operations is a small papercut.

### 46. `DeleteBranchRequest.purge` — boolean for hard delete — `src/v1/model.ts:1104`
- **Why weird:** `purge: boolean` distinguishes hard vs soft delete. Doc: "If true, permanently delete the branch; if false, soft delete." Same `purge` field on `DeleteProjectRequest` (line 1142).
- **Category:** 16 (boolean modeling a future 3-state field), 6 (misleading — purge implies cleanup, not the *only* delete mode).
- **Suggested name:** `deleteMode: 'hard' | 'soft'` or `permanent: boolean`.
- **Rationale:** Boolean toggle for a future-3-state field.

### 47. `GenerateDatabaseCredentialRequest.claims: RequestedClaims[]` — plural of a plural type — `src/v1/model.ts:1363`
- **Why weird:** Same as `database` audit #54 — `RequestedClaims` is already plural; `claims: RequestedClaims[]` is "an array of plural claims objects".
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Same as `database` audit #54 — singular type `RequestedClaim` + plural field `claims: RequestedClaim[]`.
- **Rationale:** Same as `database` audit #54.

### 48. `Operation.done: boolean | undefined` — tri-state boolean — `src/v1/model.ts:1581`
- **Why weird:** Boolean that can be `undefined` is a tri-state value. JSDoc says "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed…" — but doesn't say what `undefined` means. The `*Operation.wait()` methods check `op.done === undefined && throw` (e.g. `client.ts:1552`).
- **Category:** 16 (type allows three values but spec only documents two).
- **Suggested name:** Make non-optional `done: boolean`. If absent on the wire, treat as `false` in unmarshal.
- **Rationale:** Tri-state booleans always confuse callers.

### 49. `Project.deleteTime` / `Project.purgeTime` — two delete-related timestamps — `src/v1/model.ts:1629, 1634`
- **Why weird:** `deleteTime` = "when soft-deleted"; `purgeTime` = "when scheduled for permanent deletion". Bare verbs `delete` / `purge` are similar; the distinction matters for the consumer but the field names alone don't communicate the lifecycle.
- **Category:** 1 (vague), 6 (misleading — `purge` could mean "purged at" or "scheduled to purge").
- **Suggested name:** `softDeletedAt` / `scheduledPurgeAt`.
- **Rationale:** Lifecycle-related fields benefit from clearer past/future tense.

### 50. `ProjectStatus.syntheticStorageSizeBytes` — "synthetic" qualifier — `src/v1/model.ts:1724`
- **Why weird:** `syntheticStorageSizeBytes` — what's "synthetic" about storage? Doc says "The current space occupied by the project in storage." JSDoc doesn't explain "synthetic". Likely Lakebase internal billing concept.
- **Category:** 1 (vague), 14 (internal-jargon leak).
- **Suggested name:** `storageSizeBytes` or `billingStorageSizeBytes`.
- **Rationale:** Internal-jargon leak.

### 51. `Branch.spec.expiration` JSDoc mentions `update_mask` (snake_case) — `src/v1/model.ts:734, 741, 749, 758, 1291, 1299, 1308, 1656, 1665`
- **Why weird:** JSDoc references update mask in snake_case (e.g. "When updating this field, use `spec.expiration` in the update_mask"). Update mask field on the request is `updateMask: FieldMask<...>` (camelCase) but docs reference the wire-format name. Consumer reading the JSDoc and writing TS code has to translate.
- **Category:** 17 (inconsistent — JSDoc snake_case, TS camelCase).
- **Suggested name:** Use TS field name in JSDoc.
- **Rationale:** Doc/code drift.

### 52. `ListBranchesRequest.showDeleted` / `ListProjectsRequest.showDeleted` — pair of duplicate optional flags — `src/v1/model.ts:1456, 1515`
- **Why weird:** Two structs carry identical `showDeleted?: boolean` with similar JSDoc. Not bad on its own, but the option name `showDeleted` is itself an imperative-shaped name on a request type (compare to `includeDeleted` or `deletedOnly`).
- **Category:** 1 (vague — `show` is presentation-layer language for a server request).
- **Suggested name:** `includeDeleted` or `includeSoftDeleted`.
- **Rationale:** Same as `database` audit #26 — request shapes prefer descriptive booleans over imperative ones.

## Observation

### 53. Method JSDoc inconsistency — `src/v1/client.ts` throughout
- **Why weird:** Some methods have rich JSDoc ("Creates a new database branch in the project.", "Register a Postgres database in the Unity Catalog."). Others are terse ("Create a Database.", "Get a Database.", "List Databases."). Inconsistency in doc depth across CRUD methods of the same resource.
- **Category:** Observation (doc quality, not naming).
- **Suggested name:** Standardise to the richer template.
- **Rationale:** Naming-adjacent.

### 54. `Operation` is a separate type, not a generic — `src/v1/model.ts:1563`
- **Why weird:** All 21 mutation methods return `Promise<Operation>`. The `Operation` type is monomorphic — no generic parameter for result/metadata. Consumer either uses the per-resource `*Operation` waiter classes (#8) or reads `Operation.result.response` (untyped `Record`).
- **Category:** Observation (architecture, not naming per se).
- **Suggested name:** `Operation<TResult, TMetadata>` generic.
- **Rationale:** Connects #7, #8, #31, #32.

## Fixed

- #2 (original) `postgres` and `database` packages overlap heavily — _reduced_; many shared types removed in regeneration but a substantial duplicate set remains (kept as new #2). Original line numbers obsolete.
- #4 (original) Four "State" enums share value vocabulary but use three different qualifier patterns (originally cited at `src/v1/model.ts:581, 628, 599, 654`): Superseded into new #4 — `ComputeInstance_ComputeState` and `NewPipelineSpec_PipelineChannel` were removed in regeneration on 2026-05-20; only three state enums (Branch/Endpoint/Provisioning) remain.
- #11 Forward ETL types use a Java/Kotlin-style adjective phrase (originally cited at `src/v1/model.ts:1229-1325`, `client.ts:670-882`): Fixed in regeneration on 2026-05-20 — all `ForwardEtl*` types (`DeleteForwardEtlConfigurationRequest`, `DisableForwardEtlRequest`, `ForwardEtlConfig`, `ForwardEtlDatabase`, `ForwardEtlMetadata`, `ForwardEtlSchema`, `ForwardEtlStatus`, `ForwardEtlTableMapping`, `GetForwardEtlMetadataRequest`, `GetForwardEtlStatusRequest`) and `deleteForwardEtlConfiguration`/`disableForwardEtl`/`getForwardEtlMetadata`/`getForwardEtlStatus` client methods are gone.
- #12 `ForwardEtlConfig.createTimeMillis` / `updateTimeMillis` (originally cited at `src/v1/model.ts:1538, 1540`): Fixed in regeneration on 2026-05-20 — `ForwardEtlConfig` removed entirely.
- #13 Forward ETL `pgDatabaseOid` / `pgSchemaOid` / `pgTableOid` (originally cited at `src/v1/model.ts:1240, 1242, 1317, 1319, 1528, 1530, 1578`): Fixed in regeneration on 2026-05-20 — all Forward ETL types removed.
- #14 `tenantId` / `timelineId` in Forward ETL request types (originally cited at `src/v1/model.ts:1236, 1238, 1313, 1315, 1524, 1526, 1679, 1681, 1692, 1694`): Fixed in regeneration on 2026-05-20 — Forward ETL types removed.
- #17 (original) `*Operation` classes mix verb prefix with noun suffix — superseded into new #8 (combined with the 21-class issue).
- #18 (original) `Branch` / `Catalog` / `Database` / `Endpoint` / `Project` / `Role` / `SyncedTable` / `Table` / `ComputeInstance` — 9 generic top-level resource names: Superseded into new #10 — `Table` and `ComputeInstance` removed in regeneration on 2026-05-20; finding now covers the 7 remaining generic names.
- #26 `ComputeInstance.computeInstanceId` field (originally cited at `src/v1/model.ts:965`): Fixed in regeneration on 2026-05-20 — `ComputeInstance` type removed entirely.
- #27 `ComputeInstance.computeHost` (originally cited at `src/v1/model.ts:973`): Fixed in regeneration on 2026-05-20 — `ComputeInstance` removed.
- #28 `ComputeInstance.role` field is typed as a compute-type enum, not a Postgres role (originally cited at `src/v1/model.ts:971`): Fixed in regeneration on 2026-05-20 — `ComputeInstance` removed.
- #39 `EndpointHosts` — type holds 4 hostname fields (originally cited at `src/v1/model.ts:1390-1409`): Fixed in regeneration on 2026-05-20 — `EndpointHosts` now has only `host` and `readOnlyHost` (no `readWritePooledHost`/`readOnlyPooledHost`); the four-field tangle is gone, though a residual `host` vs `readOnlyHost` distinction remains, addressed by JSDoc on the simplified type.
- #42 `ForwardEtlConfig.workspaceId: number` (originally cited at `src/v1/model.ts:1522`): Fixed in regeneration on 2026-05-20 — `ForwardEtlConfig` removed.
- #43 `GenerateDatabaseCredentialRequest.endpoint` field "not yet supported" (originally cited at `src/v1/model.ts:1595-1598`): Fixed in regeneration on 2026-05-20 — the "not yet supported" disclaimer is gone; field now documents an active "endpoint resource name for which this credential will be generated" purpose.
- #44 `GenerateDatabaseCredentialRequest.expiration` discriminated union (originally cited at `src/v1/model.ts:1610-1627`): Fixed in regeneration on 2026-05-20 — the `expiration` discriminated union has been removed; only `claims` and `endpoint` fields remain.
- #45 `InitialBranchSpec` / `InitialDatabaseSpec` / `InitialEndpointSpec` / `InitialRoleSpec` (originally cited at `src/v1/model.ts:1734, 1746, 1757, 1776`): Fixed in regeneration on 2026-05-20 — `InitialBranchSpec`, `InitialDatabaseSpec`, `InitialRoleSpec` removed; only `InitialEndpointSpec` (a thin wrapper around `EndpointGroupSpec`) remains, and `Project` now exposes a single `initialEndpointSpec` field (see new #33).
- #46 `NewPipelineSpec` (originally cited at `src/v1/model.ts:1963`): Fixed in regeneration on 2026-05-20 — the type still exists at `model.ts:1544` but the `pipelineChannel` field (with its `NewPipelineSpec_PipelineChannel` enum) was removed, so the type is now a slim 3-field config (`storageCatalog`, `storageSchema`, `budgetPolicyId`); the verb-as-prefix concern was originally about `NewPipelineSpec` carrying internal `Pipeline_Channel` enum noise — the noise is gone.
- #49 (original) `Project.spec` / `Project.status` / `Project.initialBranchSpec` / `Project.initialRoleSpec` / `Project.initialDatabaseSpec` / `Project.initialEndpointSpec` (originally cited at `src/v1/model.ts:2054-2095`): Superseded into new #33 — only `initialEndpointSpec` remains as a write-only field exposed on read; the other three `initial*` fields were removed.
- #53 `ProjectSpec.workspaceKeyEncrypted: boolean` (originally cited at `src/v1/model.ts:2170`): Fixed in regeneration on 2026-05-20 — `workspaceKeyEncrypted` flag removed from `ProjectSpec`.
- #55 `RequestedResource.resourceName` discriminated union with `unspecifiedResourceName` and `tableName` (originally cited at `src/v1/model.ts:2237-2246`): Fixed in regeneration on 2026-05-20 — the `unspecifiedResourceName` variant is gone; only `tableName` remains as the discriminated union (single variant; the union effectively collapsed to `{$case: 'tableName', tableName: string}`).
- #57 Synced-table spec fields `acceleratedSync` / `extraIndexDefinitions` / `extraColumnDefinitions` / `typeOverrides` (originally cited at `src/v1/model.ts:2447, 2434, 2454, 2458, 2452`): Fixed in regeneration on 2026-05-20 — these synced-table fields were removed; only the `createDatabaseObjectsIfMissing` field remains and is captured in the new #39.
- #58 `Table` (non-synced) — generic single-word type (originally cited at `src/v1/model.ts:2586`): Fixed in regeneration on 2026-05-20 — `Table` type removed entirely.
- #59 `Table.database` / `Table.project` / `Table.branch` (originally cited at `src/v1/model.ts:2594-2598`): Fixed in regeneration on 2026-05-20 — `Table` removed.
- #60 `Table.tableServingUrl` / `DatabaseTable.tableServingUrl` (originally cited at `src/v1/model.ts:2600`): Fixed in regeneration on 2026-05-20 — `Table.tableServingUrl` removed alongside the `Table` type.
- #62 `DeleteForwardEtlConfigurationResponse.deletedConfigs` / `deletedMappings` (originally cited at `src/v1/model.ts:1247-1250`): Fixed in regeneration on 2026-05-20 — `DeleteForwardEtlConfigurationResponse` removed.
- #64 `createTable` / `deleteTable` / `getTable` (originally cited at `src/v1/client.ts:502, 826, 1207`): Fixed in regeneration on 2026-05-20 — the non-synced `Table` CRUD methods removed from `client.ts`; only `createSyncedTable`/`deleteSyncedTable`/`getSyncedTable` remain.
- #68 `CreateBranchRequest.replaceExisting` vs `DeleteBranchRequest.allowMissing` (originally cited at `src/v1/model.ts:995, 1200`): Superseded into new #45 — `DeleteBranchRequest.allowMissing` was removed in regeneration on 2026-05-20; only the `replaceExisting` vs `purge` mismatch remains.
- #70 `DeleteForwardEtlConfigurationRequest` vs `DisableForwardEtlRequest` (originally cited at `src/v1/model.ts:1229, 1306`): Fixed in regeneration on 2026-05-20 — both types removed.
- #71 `ForwardEtlMetadata.databases` / `schemas` (originally cited at `src/v1/model.ts:1554, 1556`): Fixed in regeneration on 2026-05-20 — `ForwardEtlMetadata` removed.
- #72 `ForwardEtlTableMapping.lastSyncedLsn: string` (originally cited at `src/v1/model.ts:1582`): Fixed in regeneration on 2026-05-20 — `ForwardEtlTableMapping` removed.
- #74 `GenerateDatabaseCredentialRequest.groupName: string` (originally cited at `src/v1/model.ts:1604`): Fixed in regeneration on 2026-05-20 — `groupName` field removed from `GenerateDatabaseCredentialRequest`.
- #78 `ProjectStatus.computeLastActiveTime` (originally cited at `src/v1/model.ts:2201`): Fixed in regeneration on 2026-05-20 — field removed from `ProjectStatus`.
- #81 `listComputeInstances`'s doc reads "The parent, which owns the compute instances" (originally cited at `src/v1/model.ts:1855`): Fixed in regeneration on 2026-05-20 — `ListComputeInstancesRequest` removed alongside `ComputeInstance`.
- #84 The provisioning-state enum is exported from both `database` and `postgres` packages with identical members (originally cited at `src/v1/model.ts:654`, `database/v1/model.ts:148`): Subsumed into new #2 — same cross-package overlap class; the enum still exists at `model.ts:610` but the broader duplicate-types finding now covers it.
