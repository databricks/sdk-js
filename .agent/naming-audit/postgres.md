# Naming Audit: postgres

**Path:** `packages/postgres/src/v1/`
**Versions audited:** v1
**Inferred domain:** Lakebase Autoscaling Postgres — manages Lakebase `Project`s, `Branch`es (Postgres-style branching for PITR / dev forks), `Endpoint`s (autoscaling read-write or read-only compute endpoints), `Database`s (logical Postgres databases inside a branch), `Role`s (Postgres roles bound to Databricks identities or plain Postgres roles), `SyncedTable`s (UC-managed Delta→Postgres sync pipelines), `Catalog`s (Unity Catalog mirrors of logical PG databases), short-lived `DatabaseCredential`s, and long-running `Operation`s with per-resource `*Operation` waiter-style classes.
**Total weird names flagged:** 29

## Summary
| Severity | Count |
| --- | --- |
| High | 9 |
| Medium | 15 |
| Low | 4 |
| Observation | 1 |

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

### 11. `BranchSpec.expiration` discriminated union — `noExpiry: boolean` accepts an invalid `false` — `src/v1/model.ts:736-762`
- **Why weird:** Discriminated union of `expireTime` / `ttl` / `noExpiry`. The doc on `noExpiry` says "If set to false, the request is invalid; provide either ttl or expire_time instead." So the boolean's `false` value is documented as invalid — the type system permits a value the API rejects.
- **Category:** 16 (type allows `false` but spec rejects it).
- **Suggested name:** Use a union `expiration?: {expireTime: Instant} | {ttl: Duration} | 'never'`, or hoist the three to top-level mutually-exclusive optional fields.
- **Rationale:** Boolean fields whose `false` value is invalid encourage type-level lies.

### 12. `Database` (SDK resource) vs `postgresDatabase` field (Postgres-side identifier) — same thing, two names — `src/v1/model.ts:1013, 1054`
- **Why weird:** Class `Database` represents the SDK resource; field `postgresDatabase` is the underlying PG name. So `Database` is an SDK noun and `postgresDatabase` is the actual PG-server-side identifier. The field name is what the Postgres-savvy reader expects; the type name is the SDK abstraction. Reading `db.spec.postgresDatabase` requires you to track two abstraction layers.
- **Category:** 1 (vague — `Database` could be either layer), 6 (misleading — both names describe the same physical thing).
- **Suggested name:** Rename either the type (to `DatabaseResource` or `LakebaseDatabase`) or the field (to `pgName`).
- **Rationale:** Disambiguate the SDK resource from the Postgres server-side concept.

### 13. `Database` and `databaseId` query parameter for `createDatabase` — `src/v1/client.ts:245-289`, `model.ts:939`
- **Why weird:** Operation is "Create a Database" — but `CreateDatabaseRequest` has `parent`, `databaseId`, and `database`. The body is `database`; the query param is `databaseId`. The path is `/postgres/${req.parent}/databases`. Three places carry the name. JSDoc on `databaseId` says "If database_id is not specified in the request, it is generated automatically." But the JSDoc on `database` (the body) says nothing about how it relates to `databaseId`.
- **Category:** 17 (inconsistency — three identifier slots), 6 (misleading — caller doesn't know which to use).
- **Suggested name:** Move identifier into `database.name`; flatten the request to `{database, parent, replaceExisting}`.
- **Rationale:** Three identifier slots is too many.

### 14. `EndpointSpec.autoscalingLimitMinCu` / `autoscalingLimitMaxCu` — `Cu` suffix is opaque — `src/v1/model.ts:1274, 1279`
- **Why weird:** `Cu` stands for "Compute Unit" (referenced in JSDoc on `EndpointSpec`). Field name doesn't expand the acronym. `MinCu` / `MaxCu` reads as `min cu` / `max cu` — `cu` could be currency unit, control unit, or anything.
- **Category:** 5 (cryptic abbreviation), 1 (vague suffix).
- **Suggested name:** `minComputeUnits` / `maxComputeUnits`, or `autoscalingMinComputeUnits` / `autoscalingMaxComputeUnits`.
- **Rationale:** "CU" is Lakebase-internal slang.

### 15. `EndpointSpec.suspension` discriminated union — `noSuspension: boolean` accepts an invalid `false` — `src/v1/model.ts:1293-1312`
- **Why weird:** Same pattern as #11 — one variant carries a duration, the other a boolean documented as accepting only `true`. The type permits `false`, the spec rejects it.
- **Category:** 16 (type allows `false` but spec rejects), 27 (echo of #11).
- **Suggested name:** Inline: `suspension?: Temporal.Duration | 'never'`.
- **Rationale:** Same as #11.

### 16. `GenerateDatabaseCredentialRequest.expiration` discriminated union — _removed in regeneration_; only the simpler `claims` + `endpoint` shape remains — see #24
_Reserved._

### 17. `Operation.metadata: Record<string, unknown>` — opaque metadata field — `src/v1/model.ts:1575`
- **Why weird:** Plain `Record<string, unknown>`. The 21 `*Operation` classes each parse this metadata into a specific `*OperationMetadata` type at runtime (`client.ts:1524-1533` etc.). But the public `Operation` type doesn't carry the metadata type as a generic parameter, so a consumer reading `op.metadata` directly has no help.
- **Category:** 15 (generic), 16 (loose typing).
- **Suggested name:** `Operation<T>` with `metadata?: T` (generic); each `*Operation` class returns `Operation<BranchOperationMetadata>` etc.
- **Rationale:** Same root cause as #7 — opaque records on the public surface.

### 18. `Operation.result` discriminated union with `error` / `response` — `src/v1/model.ts:1588-1599`
- **Why weird:** Variant `response` carries `Record<string, unknown>` (line 1597). Variant `error` carries the typed `DatabricksServiceExceptionWithDetailsProto`. Asymmetric: error is typed, response isn't. (The `*Operation.wait()` methods cast via Zod, but the public type stays opaque.)
- **Category:** 16 (asymmetric typing), 15 (generic on success arm).
- **Suggested name:** Same as #17 — generic `Operation<TResult, TMetadata>` with both arms typed.
- **Rationale:** Same as #7, #17.

### 19. `Project.initialEndpointSpec` — write-only field exposed on read shape — `src/v1/model.ts:1624`
- **Why weird:** `Project` carries an `initialEndpointSpec` field that is a create-time-only input but exposed on the response type too — a read-flow consumer sees a field that is typically empty after project creation.
- **Category:** 7 (overly verbose surface), 16 (write-only fields exposed on read shape).
- **Suggested name:** Hoist the `initialEndpointSpec` onto `CreateProjectRequest` only (where it belongs); leave `Project` to spec/status.
- **Rationale:** Same as `database` audit #12 — input/output shape confusion.

### 20. `ProjectCustomTag` vs the `database` package's `CustomTag` — `src/v1/model.ts:1637`, `database:206`
- **Why weird:** `ProjectCustomTag` and `CustomTag` (in `database`) are textually identical (`{key, value}`). The `Project` prefix is package-scope tautology. Catalogs SDK and others use `CustomTag` too.
- **Category:** 12 (duplicate concept across packages), 20 (type-prefix tautology — `ProjectCustomTag` on `ProjectSpec.customTags`).
- **Suggested name:** `CustomTag` (drop the `Project` prefix). Or share a single `CustomTag` across SDK packages.
- **Rationale:** 13 duplicated `{key, value}` shapes in the workspace would be a useful audit.

### 21. `ProjectSpec.pgVersion: number` vs `ProjectStatus.pgVersion: number` — Postgres version as integer — `src/v1/model.ts:1687, 1716`
- **Why weird:** Doc says "The major Postgres version number. The set of supported versions may vary; consult the API documentation for currently accepted values." Type is `number` (integer). Better to be an enum (`Pg16 | Pg17`) or `'16' | '17'` to encode "supported values". Also note `pgVersion: string` on `database/v1.DatabaseInstance` (the V1 package uses string) — inconsistent across the two packages.
- **Category:** 16 (type contradicts domain — open `number`), 17 (inconsistent with `database.DatabaseInstance.pgVersion` which is `string`).
- **Suggested name:** `pgMajorVersion: 16 | 17` or an enum.
- **Rationale:** Aligns documented constraints with the type system.

### 22. `ProjectSpec.historyRetentionDuration` vs `ProjectStatus.historyRetentionDuration` — copy of input on output — `src/v1/model.ts:1689, 1718`
- **Why weird:** Same field appears on `ProjectSpec` (input) and `ProjectStatus` (output, doc'd as "effective"). The output doesn't add an "effective" prefix as `database/v1` does, but the JSDoc on `ProjectStatus` does say "The effective number of seconds…". Inconsistency: `database` uses `effective_` prefix on output, `postgres` (this package) drops it. Could be progress, could be a regression — flag for clarity.
- **Category:** 17 (inconsistent with sister package).
- **Suggested name:** Pick one convention across the two packages.
- **Rationale:** Mixed conventions encourage bugs when bridging between SDKs.

### 23. `timeseriesKey` field casing on the synced-table spec — `src/v1/model.ts:1936`
- **Why weird:** Same as `database` audit #36: `timeseries` is one run-together word but English has `timeSeries` (two words). Wire is `timeseries_key`.
- **Category:** 3 (acronym/casing inconsistency), 17 (inconsistent with neighbours).
- **Suggested name:** `timeSeriesKey`.
- **Rationale:** Same as `database` audit #36.

### 24. Synced-table spec fields `createDatabaseObjectsIfMissing` — same fields, same issues as `database` package — `src/v1/model.ts:1951`
- **Why weird:** Identical to `database` audit findings on synced-table-spec naming. Won't re-state at length; flag that the duplication exists across both packages with identical naming. Other related fields (`acceleratedSync`, `extraIndexDefinitions`, `extraColumnDefinitions`, `typeOverrides`) were removed during regeneration; only the `createDatabaseObjectsIfMissing` "If Missing" pattern remains here, matching `database` package's similar wording.
- **Category:** 12 (duplicate concept), 17 (inherited inconsistencies).
- **Suggested name:** Same suggestions as `database` audit.
- **Rationale:** Two SDKs, same problems.

### 25. `UpdateBranchRequest.updateMask: FieldMask<Branch>` — Google API protocol leak — `src/v1/model.ts:2057`
- **Why weird:** Generic `FieldMask<T>` is a Google-API-protocol-buffers thing for partial updates. The naming is correct for an AIP-conformant API; less correct for an idiomatic TS SDK. Same on `UpdateDatabaseRequest`, `UpdateEndpointRequest`, `UpdateProjectRequest`, `UpdateRoleRequest`.
- **Category:** 14 (Google AIP/proto leak), 1 (vague — `updateMask` is jargon).
- **Suggested name:** `fields?: (keyof Branch)[]` or `patch?: Partial<Branch>` (and derive the field-mask). The `FieldMask` import already comes from `@databricks/sdk-core/wkt` (well-known types) — the SDK already lifts the type.
- **Rationale:** AIP `FieldMask` is an industry pattern, but it should not be the only update affordance.

## Low severity

### 26. `CreateBranchRequest.replaceExisting` (Create) — no symmetrical `allowMissing` on Delete (Delete uses `purge`) — `src/v1/model.ts:911, 1104, 1142`
- **Why weird:** Create uses `replaceExisting: boolean` (proactive). Delete now uses `purge: boolean` only (`allowMissing` field removed in regeneration). Mismatched conventions for "if it does/doesn't exist" remain.
- **Category:** 17 (inconsistent action verbs across CRUD).
- **Suggested name:** Pick one: `ifExists: 'update' | 'error'` and `ifMissing: 'ignore' | 'error'`, or just both `upsert` and `ignoreIfMissing`.
- **Rationale:** Inconsistent options across CRUD operations is a small papercut.

### 27. `DeleteBranchRequest.purge` — boolean for hard delete — `src/v1/model.ts:1104`
- **Why weird:** `purge: boolean` distinguishes hard vs soft delete. Doc: "If true, permanently delete the branch; if false, soft delete." Same `purge` field on `DeleteProjectRequest` (line 1142).
- **Category:** 16 (boolean modeling a future 3-state field), 6 (misleading — purge implies cleanup, not the *only* delete mode).
- **Suggested name:** `deleteMode: 'hard' | 'soft'` or `permanent: boolean`.
- **Rationale:** Boolean toggle for a future-3-state field.

### 28. `GenerateDatabaseCredentialRequest.claims: RequestedClaims[]` — plural of a plural type — `src/v1/model.ts:1363`
- **Why weird:** Same as `database` audit #54 — `RequestedClaims` is already plural; `claims: RequestedClaims[]` is "an array of plural claims objects".
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Same as `database` audit #54 — singular type `RequestedClaim` + plural field `claims: RequestedClaim[]`.
- **Rationale:** Same as `database` audit #54.

### 29. `Operation.done: boolean | undefined` — tri-state boolean — `src/v1/model.ts:1581`
- **Why weird:** Boolean that can be `undefined` is a tri-state value. JSDoc says "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed…" — but doesn't say what `undefined` means. The `*Operation.wait()` methods check `op.done === undefined && throw` (e.g. `client.ts:1552`).
- **Category:** 16 (type allows three values but spec only documents two).
- **Suggested name:** Make non-optional `done: boolean`. If absent on the wire, treat as `false` in unmarshal.
- **Rationale:** Tri-state booleans always confuse callers.

## Observation

### 30. `Operation` is a separate type, not a generic — `src/v1/model.ts:1563`
- **Why weird:** All 21 mutation methods return `Promise<Operation>`. The `Operation` type is monomorphic — no generic parameter for result/metadata. Consumer either uses the per-resource `*Operation` waiter classes (#8) or reads `Operation.result.response` (untyped `Record`).
- **Category:** Observation (architecture, not naming per se).
- **Suggested name:** `Operation<TResult, TMetadata>` generic.
- **Rationale:** Connects #7, #8, #17, #18.
