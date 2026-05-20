# Naming Audit: postgres

**Path:** `packages/postgres/src/v1/`
**Versions audited:** v1
**Inferred domain:** Lakebase Autoscaling Postgres — manages Lakebase `Project`s, `Branch`es (Postgres-style branching for PITR / dev forks), `Endpoint`s (autoscaling read-write or read-only compute endpoints), `ComputeInstance`s (the individual compute nodes inside an endpoint group), `Database`s (logical Postgres databases inside a branch), `Role`s (Postgres roles bound to Databricks identities or plain Postgres roles), `SyncedTable`s (UC-managed Delta→Postgres sync pipelines), `Table`s (non-synced PG tables), `Catalog`s (Unity Catalog mirrors of logical PG databases), Forward ETL (PG→UC reverse-ETL), short-lived `DatabaseCredential`s, and long-running `Operation`s with per-resource `*Waiter`-style classes.
**Total weird names flagged:** 83

## Summary
| Severity | Count |
| --- | --- |
| High | 16 |
| Medium | 47 |
| Low | 17 |
| Observation | 3 |

## High severity

### 1. Package name `postgres` does not say "Lakebase" / "autoscaling" / "managed-PG" — `packages/postgres/`
- **Why weird:** Generic single-word name for a Databricks-specific service. The actual product is "Lakebase Autoscaling Postgres" (see JSDoc `createProject`, `client.ts:363`). Sibling package `database` covers earlier-generation Lakebase (`DatabaseInstance` / V1), and `postgres` is V2 — see `database/naming-audit/database.md` finding #2. Neither package name says "Lakebase" or makes the V1/V2 lineage discoverable.
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages).
- **Suggested name:** `lakebase` (and merge with `database`), or `lakebase-autoscaling`, or `lakebase-v2`. At minimum, add an `index.ts` JSDoc declaring "Lakebase Autoscaling Postgres (V2 OLTP)".
- **Rationale:** `postgres` is too broad — Databricks also has Postgres-backed services elsewhere (DBSQL, query history, etc.). Naming should encode the product.

### 2. `postgres` and `database` packages overlap heavily — `packages/postgres/` vs `packages/database/`
- **Why weird:** Many duplicate type names: `DeltaTableSyncInfo` (`model.ts:1295` vs `database/v1/model.ts:477`), `SyncedTablePosition` (`model.ts:2563` vs `database:762`), `SyncedTablePipelineProgress` (`model.ts:2547` vs `database:744`), `NewPipelineSpec` (`model.ts:1963` vs `database:598`), `DatabaseCredential` (`model.ts:1167` vs `database:228`), `GenerateDatabaseCredentialRequest` (`model.ts:1591` vs `database:499`), `RequestedClaims` (`model.ts:2232` vs `database:630`), `RequestedResource` (`model.ts:2237` vs `database:635`), `ProvisioningInfo` (`model.ts:2230` vs `database:628`), `ProvisioningPhase`/`SyncedTableState`/`ProvisioningInfo_State`/`RequestedClaims_PermissionSet`/`SyncedTableSpec_PgSpecificType`/`SyncedTableSpec_SecondaryIndex_CreationPoint`. Identical signatures but exported from two packages — a TS user importing both gets noisy alias-juggling.
- **Category:** 12 (duplicate concept across packages), 6 (misleading: same name, two definitions).
- **Suggested name:** Pick one as canonical; the other re-exports from the canonical or marks itself deprecated. Cross-reference each shared type with a JSDoc note like "Equivalent to `database/v1.DeltaTableSyncInfo`; see go/lakebase-v2 for the migration."
- **Rationale:** Same as `database` finding #2 — `postgres` is V2 and `database` is V1; nothing in the names says so.

### 3. `ErrorCode` enum — 102 long, mostly-deprecated values — `src/v1/model.ts:17-515`
- **Why weird:** Huge enum (~100 entries) referenced exactly once via `DatabricksServiceExceptionWithDetailsProto.errorCode` (1179). Most entries are explicitly marked "NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it, avoid using it in the new APIs" (e.g. `IO_ERROR`, `INVALID_STATE`, `UNPARSEABLE_HTTP_ERROR`, `QUOTA_EXCEEDED`, `MAX_BLOCK_SIZE_EXCEEDED`, `DRY_RUN_FAILED`, `MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST`, all the `GIT_*`, `IPYNB_FILE_IN_REPO`, `INSECURE_PARTNER_RESPONSE`, `METASTORE_*_EXISTS`, `CATALOG_NOT_EMPTY`, `PROVIDER_SHARE_NOT_ACCESSIBLE`, etc. — at least 40 entries). The enum re-exports the entire Databricks-platform error vocabulary into a Postgres-specific SDK package.
- **Category:** 7 (overly verbose), 11 (empty/trivial wrappers for deprecated values), 14 (Go/proto leak — all deprecated values exist only "for public APIs that use it"), 18 (long enum values).
- **Suggested name:** Move `ErrorCode` to a shared `core/apierror` package (already exists per CLAUDE.md), drop deprecated values from the public TS surface (or mark them `@deprecated` so TS tooling can warn).
- **Rationale:** Every consumer of this package gets a 100-entry deprecated-warning bundle. The fact that it's exported from `postgres/v1/index.ts` (line 30) means it's part of the public surface.

### 4. Four "State" enums share value vocabulary but use three different qualifier patterns — `src/v1/model.ts:581, 628, 599, 654`
- **Why weird:** Four state enums use three different qualifier patterns:
  - Branch state and endpoint state qualify by the status struct (`BranchStatus`-scoped, `EndpointStatus`-scoped).
  - Compute state qualifies by the resource and names the leaf `ComputeState`.
  - Provisioning state lives under the unrelated `ProvisioningInfo` wrapper.
  - All four enums share values like `STATE_UNSPECIFIED`, `INIT`, `ACTIVE`, etc. The TypeScript user can't tell which enum to use for which resource without reading the JSDoc.
- **Category:** 17 (inconsistent naming pattern).
- **Suggested name:** Standardise to `<Resource>State`: `BranchState`, `EndpointState`, `ComputeState`, `ProvisioningState`.
- **Rationale:** Four state enums with three naming conventions across one package.

### 5. Enum values all carry redundant resource prefix — `src/v1/model.ts` (multiple enums)
- **Why weird:** Every enum's `UNSPECIFIED` sentinel duplicates the enum name:
  - `EndpointType.ENDPOINT_TYPE_UNSPECIFIED` / `ENDPOINT_TYPE_READ_WRITE` / `ENDPOINT_TYPE_READ_ONLY` (line 11-13)
  - `ProvisioningPhase.PROVISIONING_PHASE_*` (520-526)
  - `SyncedTableState.SYNCED_TABLE_*` (532-576, 14 entries, each re-stating `SYNCED_TABLE`)
  - `BranchStatus_State.STATE_UNSPECIFIED` (only one with the prefix; others don't, see #6)
  - `ComputeInstance_ComputeState.COMPUTE_STATE_UNSPECIFIED`
  - `ComputeInstance_ComputeType.COMPUTE_TYPE_UNSPECIFIED`
  - `EndpointStatus_State.STATE_UNSPECIFIED`
  - `NewPipelineSpec_PipelineChannel.PIPELINE_CHANNEL_UNSPECIFIED`
  - `ProvisioningInfo_State.STATE_UNSPECIFIED`
  - `RequestedClaims_PermissionSet.PERMISSION_SET_UNSPECIFIED`
  - `Role_AuthMethod.AUTH_METHOD_UNSPECIFIED`
  - `Role_IdentityType.IDENTITY_TYPE_UNSPECIFIED`
  - `Role_MembershipRole.MEMBERSHIP_ROLE_UNSPECIFIED`
- **Category:** 2 (redundant enum prefixes), 18 (long enum values).
- **Suggested name:** Drop the prefix everywhere — `EndpointType.Unspecified | ReadWrite | ReadOnly` etc.
- **Rationale:** `EndpointType.ENDPOINT_TYPE_READ_WRITE` is 41 chars to say "read-write".

### 6. `SyncedTableState` — 14 enum values each prefixed `SYNCED_TABLE_*` — `src/v1/model.ts:532-576`
- **Why weird:** Worst offender. 14 values:
  `SYNCED_TABLE_STATE_UNSPECIFIED`, `SYNCED_TABLE_PROVISIONING`, `SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES` (45 chars), `SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT` (42 chars), `SYNCED_TABLE_ONLINE`, `SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE` (38 chars), `SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE` (37 chars), `SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE` (38 chars), `SYNCED_TABLE_OFFLINE`, `SYNCED_TABLE_OFFLINE_FAILED`, `SYNCED_TABLE_ONLINE_PIPELINE_FAILED` (36 chars), `SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES` (47 chars). All re-state `SYNCED_TABLE_` to no benefit. Note: this enum is duplicated in `database/v1/model.ts:55` (with one typo, `SYNCED_TABLED_OFFLINE`) — not duplicated here, but the divergence is itself a smell.
- **Category:** 2 (redundant prefixes), 18 (long enum values).
- **Suggested name:** `SyncedTableState.Unspecified | Provisioning | ProvisioningPipelineResources | ProvisioningInitialSnapshot | Online | OnlineContinuousUpdate | OnlineTriggeredUpdate | OnlineNoPendingUpdate | Offline | OfflineFailed | OnlinePipelineFailed | OnlineUpdatingPipelineResources`.
- **Rationale:** Same as #5 but most severe enum.

### 7. SyncedTable scheduling-policy enum — only `SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED` carries a prefix; the other three values are bare — `src/v1/model.ts:731`
- **Why weird:** The first value is `SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED` (41 chars); the other three values are bare `CONTINUOUS`, `TRIGGERED`, `SNAPSHOT`. Internally inconsistent within a single enum.
- **Category:** 2 (redundant prefix), 17 (inconsistent — `UNSPECIFIED` carries the prefix, others don't), 18 (long enum values).
- **Suggested name:** Standardise values as `Unspecified | Continuous | Triggered | Snapshot`.
- **Rationale:** Same as #5.

### 8. `Role_Attributes.createdb` / `createrole` / `bypassrls` — Postgres-keyword-style lowercase fields — `src/v1/model.ts:2276-2278`
- **Why weird:** Three lowercase run-together field names. Doc comment (lines 2269-2272) acknowledges the choice ("The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical underscores between words"). That's a wire-format justification (Postgres keywords). The TypeScript identifier should still be camelCase. `createrole` is especially confusing — could read as `createRole` (verb) or `creator_ole`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Postgres-keyword names not idiomatic in TS), 17 (inconsistent — every other field in the package is camelCase).
- **Suggested name:** `createDb`, `createRole`, `bypassRls` in the TS type; wire stays `createdb`/`createrole`/`bypassrls`.
- **Rationale:** Same finding as `database` audit #5 — both packages share this bug.

### 9. `Role_AuthMethod.PG_PASSWORD_SCRAM_SHA_256` and `LAKEBASE_OAUTH_V1` enum values — `src/v1/model.ts:677, 682`
- **Why weird:** Implementation details (SCRAM-SHA-256 mechanism, OAuth `_V1`) leak into the public enum. The `_V1` suffix begs the question: what happens at V2? Should the SDK consumer have to migrate from `LAKEBASE_OAUTH_V1` to `LAKEBASE_OAUTH_V2` when the wire format changes? Worse, the `SCRAM_SHA_256` qualifier is a specific hash function — consumers picking an auth method shouldn't have to know about hash schemes.
- **Category:** 1 (vague at the wrong level — too specific), 6 (misleading: `LAKEBASE_OAUTH_V1` versioning leaks), 14 (Postgres/auth-spec internal naming), 18 (long enum values).
- **Suggested name:** `Password` (replacing `PG_PASSWORD_SCRAM_SHA_256`) and `OAuth` (replacing `LAKEBASE_OAUTH_V1`). Keep `NoLogin`. Push the wire-protocol-specific names into the marshal layer.
- **Rationale:** Public enums should describe the *concept* (password vs OAuth vs no-login), not the wire-protocol mechanism.

### 10. `Forward ETL` types use a Java/Kotlin-style adjective phrase — `src/v1/model.ts:1229-1325` (multiple types), `client.ts:670-882` (methods)
- **Why weird:** "Forward ETL" is product-marketing terminology baked into 11 type/method names:
  - `DeleteForwardEtlConfigurationRequest` / `DeleteForwardEtlConfigurationResponse` (1229, 1246)
  - `DisableForwardEtlRequest` / `DisableForwardEtlResponse` (1306, 1323)
  - `ForwardEtlConfig` (1520)
  - `ForwardEtlDatabase` (1544)
  - `ForwardEtlMetadata` (1552)
  - `ForwardEtlSchema` (1560)
  - `ForwardEtlStatus` (1568)
  - `ForwardEtlTableMapping` (1576)
  - `GetForwardEtlMetadataRequest` (1672) / `GetForwardEtlStatusRequest` (1685)
  - Methods: `deleteForwardEtlConfiguration` (672), `disableForwardEtl` (845), `getForwardEtlMetadata` (1042), `getForwardEtlStatus` (1076).
  - "ETL" is consistent capitalised acronym but is camelCased as `Etl` (lowercase tl), violating common style guides (TypeScript Google style: prefer `URL` over `Url` for known acronyms ≥3 chars).
- **Category:** 3 (acronym casing — `Etl` vs `ETL`), 7 (verbose — repeating "Forward ETL" 11 times), 14 (marketing-name leak), 1 (vague — "Forward" is a direction qualifier without context).
- **Suggested name:** Group under a `ReverseEtl` namespace (since "Forward ETL" from PG's perspective is reverse-ETL from Lakehouse's perspective — choose one direction language and stick to it). Use `ETL` casing per acronym convention or rename to `Replication` if that's the intent. Re-export under a single top-level type bundle.
- **Rationale:** "Forward" / "Reverse" terminology is consumer-facing direction labelling that can backfire — one company's "forward" is another's "reverse". 11 types prefixed with the same product-marketing string is verbose.

### 11. `ForwardEtlConfig.createTimeMillis` / `updateTimeMillis` — millis-suffixed timestamps as `number` — `src/v1/model.ts:1538, 1540`
- **Why weird:** Every other timestamp in the package is `Temporal.Instant` (see `Branch.createTime`, `Catalog.createTime`, `DatabaseCredential.expireTime`, etc.). Only the ForwardEtl types use `number` with `Millis` suffix, breaking the package-wide convention. The unmarshal at `model.ts:3148-3149` confirms they stay as plain `number`.
- **Category:** 16 (field type contradicts the established package convention), 17 (inconsistent — every other timestamp is `Temporal.Instant`), 14 (Java-style epoch-millis convention).
- **Suggested name:** `createTime: Temporal.Instant` (parse `_millis` into Instant in unmarshal).
- **Rationale:** Mixing `Temporal.Instant` and raw millis numbers in the same SDK forces consumers to remember per-type rules.

### 12. `Forward ETL` `pgDatabaseOid` / `pgSchemaOid` / `pgTableOid` — Postgres-internal IDs without doc — `src/v1/model.ts:1240, 1242, 1317, 1319, 1528, 1530, 1578`
- **Why weird:** `Oid` is Postgres slang for "object identifier" (a `pg_class.oid`-style integer). Field doc is minimal: "PostgreSQL database OID." Consumers unfamiliar with Postgres internals don't know how to *obtain* a `pgDatabaseOid` (it's not in the API for fetching a database). The fields appear in 4+ types: `DeleteForwardEtlConfigurationRequest`, `DisableForwardEtlRequest`, `ForwardEtlConfig`, `ForwardEtlTableMapping`.
- **Category:** 5 (cryptic abbreviation — `Oid`), 14 (Postgres-internal jargon in public API).
- **Suggested name:** `postgresDatabaseObjectId` / `postgresSchemaObjectId` / `postgresTableObjectId`. Or surface the wire format `Oid` but expand the doc with "(obtain via `psql -c \"SELECT oid FROM pg_database WHERE datname = '...'\"`)".
- **Rationale:** `Oid` is one of those abbreviations DBAs know cold but TS consumers do not.

### 13. `tenantId` / `timelineId` in Forward ETL request types — `src/v1/model.ts:1236, 1238, 1313, 1315, 1524, 1526, 1679, 1681, 1692, 1694`
- **Why weird:** `tenantId` and `timelineId` appear without explanation — only "Tenant ID (dashless UUID format)" and "Timeline ID (dashless UUID format)" doc. What's a Lakebase "tenant"? What's a "timeline"? These appear nowhere else in the SDK as concept-level types. Consumers can't discover what to put here.
- **Category:** 19 (underspecified ID — what entity does the tenant ID identify?), 1 (vague), 6 (misleading — "tenant" and "timeline" are not exposed concepts elsewhere).
- **Suggested name:** `lakebaseTenantId` / `lakebaseTimelineId` with doc explaining what they reference. Or fold into existing resource refs (e.g. branch resource name).
- **Rationale:** Same as #12 — Postgres-storage-internal terms (the timeline is a Neon/Lakebase storage concept) leaking into the SDK.

### 14. `DatabricksServiceExceptionWithDetailsProto.details: Record<string, unknown>[]` — array of opaque records — `src/v1/model.ts:1182`
- **Why weird:** `details` is `Record<string, unknown>[]` — an array of unknown bags. Consumers get no type help. The type is reached via `Operation.result` (line 2031), making it the SDK's primary error surface. Every error consumer must cast.
- **Category:** 1 (vague), 15 (generic), 16 (type contradicts domain — details have structure, just unmodelled).
- **Suggested name:** Add typed discriminator: `details: ErrorDetail[]` with `ErrorDetail = ResourceInfo | RetryInfo | …` aligned to `google.rpc.Status`.
- **Rationale:** Errors are the most-handled values in any SDK; opaque `unknown` arrays force every caller to write defensive code.

### 15. 22 separate `*Operation` classes — one per CRUD verb per resource — `src/v1/client.ts:1845-3680`
- **Why weird:** The package exports 22 boilerplate poller classes (each ~80 lines, near-identical): `CreateBranchOperation`, `CreateCatalogOperation`, `CreateDatabaseOperation`, `CreateEndpointOperation`, `CreateProjectOperation`, `CreateRoleOperation`, `CreateSyncedTableOperation`, `DeleteBranchOperation`, `DeleteCatalogOperation`, `DeleteDatabaseOperation`, `DeleteEndpointOperation`, `DeleteProjectOperation`, `DeleteRoleOperation`, `DeleteSyncedTableOperation`, `UndeleteBranchOperation`, `UndeleteProjectOperation`, `UpdateBranchOperation`, `UpdateDatabaseOperation`, `UpdateEndpointOperation`, `UpdateProjectOperation`, `UpdateRoleOperation`. Each has identical `name()` / `metadata()` / `wait()` / `done()` methods, differing only in return type (`Branch` vs `Catalog` vs `Database` etc.). All 22 are exported from `index.ts:5-26`.
- **Category:** 7 (overly verbose), 11 (trivial wrappers), 14 (Go-style poll-helper pattern), 17 (22-way redundancy).
- **Suggested name:** Single generic `Operation<T, M>` class with `wait(): Promise<T>` and `metadata(): Promise<M | undefined>`. Drop all 22 named exports; expose factory methods on `Client` like `createBranchOperation()` that return `Operation<Branch, BranchOperationMetadata>`.
- **Rationale:** Comparable to `database/v1/client.ts`'s `CreateDatabaseInstanceWaiter` — but here the pattern is repeated 22 times. This bloats the bundle, the public surface, and the autocomplete list.

### 16. `*Operation` classes mix verb prefix with noun suffix — e.g. `CreateBranchOperation` — `src/v1/client.ts:1845, …`
- **Why weird:** Class name reads as "the *create branch* operation" — i.e. a long-running operation produced by creating a branch. JS convention for poller helpers tends to be `Poller`, `Waiter`, or a verb-form factory. Calling it `CreateBranchOperation` (verb + noun + noun-suffix `Operation`) parses ambiguously: a `CreateBranchOperation` could be "an operation that creates a branch" (active) or "an in-flight operation tracking branch creation" (passive). The latter is the intent.
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll helper naming), 11 (wrapper-class pattern).
- **Suggested name:** `BranchCreation` / `BranchCreationOperation` (passive form), or factor into a single generic `Operation<T>` (see #15).
- **Rationale:** Same as `database` audit #14. Class names should be unambiguous noun phrases.

## Medium severity

### 17. `Branch` / `Catalog` / `Database` / `Endpoint` / `Project` / `Role` / `SyncedTable` / `Table` / `ComputeInstance` — 9 generic top-level resource names — `src/v1/model.ts` (multiple)
- **Why weird:** Most of these names are single-word generic English (`Branch`, `Catalog`, `Database`, `Endpoint`, `Project`, `Role`, `Table`). Multiple are *already-taken* concepts in Databricks-land:
  - `Catalog` collides with Unity Catalog `Catalog` (in `catalogs` package)
  - `Database` collides with the `database` package's `DatabaseInstance` / `DatabaseCatalog`
  - `Endpoint` collides with `endpoints` package (Model Serving endpoints) and `vector-search endpoints`
  - `Project` is a generic word — Lakebase Projects are not the same as Bundle projects or Genie projects.
  - `Role` collides with workspace IAM roles and instance-profile roles.
  - `Table` collides with `tables` (Unity Catalog tables), `onlinetables`, `database.DatabaseTable`.
  - `ComputeInstance` collides with `database.DatabaseInstance` (the older equivalent).
- **Category:** 1 (vague/generic), 12 (duplicate concept across packages).
- **Suggested name:** Namespace-qualify (e.g. `LakebaseBranch`, `LakebaseCatalog`, `LakebaseEndpoint`, `LakebaseProject`, `LakebaseRole`, `LakebaseTable`, `LakebaseComputeInstance`) or rely on TS module import (`import * as lakebase from '@databricks/sdk-postgres/v1'; lakebase.Branch`).
- **Rationale:** With 100+ packages in the workspace, single-word resource names guarantee collisions.

### 18. `Branch.uid` / `Endpoint.uid` / `Project.uid` / `SyncedTable.uid` — bare `uid` fields, sometimes vs `name` — `src/v1/model.ts:757, 1335, 2048, 2375`
- **Why weird:** Same problem as `database` finding #18: two identifier-like fields. `name` is a resource path (`projects/{id}/branches/{id}`), `uid` is "System-generated unique ID". Caller can't tell which to pass to `getBranch` (answer: `name`). Bare `uid` is non-descriptive — what scope (project? branch? UC table?).
- **Category:** 19 (underspecified id), 1 (vague `uid`).
- **Suggested name:** `branchUid` / `endpointUid` / `projectUid` / `syncedTableUid` (and add docs).
- **Rationale:** Same as `database` audit #18.

### 19. `Branch.name` / `Catalog.name` / etc. — `name` is a full resource path — `src/v1/model.ts:755, 878, 1106, 1333, 2046, 2254`
- **Why weird:** Field is `name?: string` but the doc constrains it to a multi-segment path like `projects/{project_id}/branches/{branch_id}`. There is a separate `branchId` / `catalogId` / `databaseId` / `endpointId` / `projectId` / `roleId` field in each status sub-type. Caller has to read JSDoc to know which to use.
- **Category:** 1 (vague), 19 (underspecified id), 6 (misleading — `name` reads as a human-readable name, actually a resource path).
- **Suggested name:** `resourceName` / `fullName` / `resourcePath` for the path-style field; keep the short ID where present.
- **Rationale:** `name` is the most ambiguous field name possible.

### 20. `Branch.parent` — string-typed parent path — `src/v1/model.ts:765`
- **Why weird:** `parent?: string` doc'd as "The project containing this branch (API resource hierarchy). Format: `projects/{project_id}`". Generic name; the type doesn't enforce the format. Same pattern repeats on `Database.parent` (1111), `Endpoint.parent` (1340), `Role.parent` (2259), `CreateBranchRequest.parent`, `CreateDatabaseRequest.parent`, etc.
- **Category:** 1 (vague), 15 (generic), 19 (underspecified — what kind of parent?).
- **Suggested name:** `projectName` / `branchName` / specific to the parent type. Or `parentResourceName`.
- **Rationale:** Parents differ per child type; `parent` is too generic.

### 21. `BranchSpec.expiration` discriminated union — `noExpiry: boolean` accepts an invalid `false` — `src/v1/model.ts:798-824`
- **Why weird:** Discriminated union of `expireTime` / `ttl` / `noExpiry`. The doc on `noExpiry` says "If set to false, the request is invalid; provide either ttl or expire_time instead." So the boolean's `false` value is documented as invalid — the type system permits a value the API rejects.
- **Category:** 16 (type allows `false` but spec rejects it).
- **Suggested name:** Use a union `expiration?: {expireTime: Instant} | {ttl: Duration} | 'never'`, or hoist the three to top-level mutually-exclusive optional fields.
- **Rationale:** Boolean fields whose `false` value is invalid encourage type-level lies.

### 22. `BranchSpec.isProtected` vs `BranchStatus.isProtected` vs `BranchStatus.default` — same struct, two booleans — `src/v1/model.ts:791, 838, 840`
- **Why weird:** `BranchStatus.default: boolean | undefined` field clashes with the JS `default` keyword in `import { default } from …` contexts. While not a reserved word in object-property position, it's syntactically irritating and a JS lint hot spot.
- **Category:** 10 (reserved-word collision), 1 (vague — `default` of what?).
- **Suggested name:** `isDefault: boolean` (matches sibling `isProtected`).
- **Rationale:** `branch.default = true` reads weirdly; `branch.isDefault = true` aligns with `branch.isProtected`.

### 23. `createDatabaseIfMissing` field on the catalog spec — `src/v1/model.ts:918`
- **Why weird:** Boolean named as a SQL clause (`CREATE DATABASE IF MISSING`). Same as `database` audit #30 (`createDatabaseIfNotExists`) but with the variant wording "If Missing". Inconsistent with `database` package's "If Not Exists".
- **Category:** 14 (SQL-style name), 7 (verbose), 17 (inconsistent with sister package's `createDatabaseIfNotExists`).
- **Suggested name:** `ensureDatabaseExists` or `autoCreateDatabase`.
- **Rationale:** Two packages, two variants of the same SQL-DDL leak.

### 24. Every status sub-type duplicates the parent resource name on its id field — `src/v1/model.ts:952, 1164, 859, 1516, 2220, 2358`
- **Why weird:** Each status type has `<resource>Id` (`catalogId`, `databaseId`, `branchId`, `endpointId`, `projectId`, `roleId`) inside a status struct that already lives on the parent resource. Read site `catalog.status.catalogId` repeats "catalog" twice. JSDoc on every field is identical boilerplate: "The short identifier of the X, suitable for showing to the users."
- **Category:** 7 (verbose), 17 (boilerplate JSDoc), 20 (type-suffix tautology).
- **Suggested name:** `id: string` (the wrapping type name is already the resource).
- **Rationale:** `catalog.status.catalogId` is "catalog status catalog id" — verbose.

### 25. `ComputeInstance.computeInstanceId` field — `src/v1/model.ts:965`
- **Why weird:** Self-tautology: `ComputeInstance.computeInstanceId`. Three `compute`/`instance` repetitions in a single member reference.
- **Category:** 20 (type-suffix tautology), 7 (verbose).
- **Suggested name:** `id: string` or just `computeId`.
- **Rationale:** Same as #24 but more egregious because both the type and field repeat both words.

### 26. `ComputeInstance.computeHost` — `src/v1/model.ts:973`
- **Why weird:** `computeHost` is a `string` that's actually a hostname. "Host" already means hostname; the "compute" qualifier is redundant (we're already inside `ComputeInstance`).
- **Category:** 20 (type-prefix tautology), 7 (verbose).
- **Suggested name:** `host: string` (or `hostname`).
- **Rationale:** Same as #24.

### 27. `ComputeInstance.role` field is typed as a compute-type enum, not a Postgres role — `src/v1/model.ts:971`
- **Why weird:** Field is `role` but its type is the compute-type enum, not the Postgres `Role` resource. Two unrelated concepts (Postgres `Role` and the compute "role" classifier) share the field name inside the same package.
- **Category:** 6 (misleading — `role` here is *not* a Postgres role), 12 (duplicate concept — `Role` vs `ComputeInstance.role`).
- **Suggested name:** `kind` or `computeRole`.
- **Rationale:** A field named `role` inside a package that *also* has a `Role` type is asking for trouble.

### 28. `CreateBranchRequest.branch` vs `CreateBranchRequest.branchId` — duplicate identifier semantics — `src/v1/model.ts:991, 993`
- **Why weird:** `CreateBranchRequest` has `parent`, `branchId`, `branch`, `replaceExisting`. `branchId` is the path-component id; `branch.name` (inside `Branch`) is the full resource path; `branch` is the body. Three fields all involved in identifying the branch.
- **Category:** 17 (inconsistency — same operation, three id-like fields), 19 (underspecified id semantics).
- **Suggested name:** Document the relationship clearly in JSDoc; or accept just `branch: Branch` and derive the id from `branch.name`.
- **Rationale:** Same shape repeats on `CreateCatalogRequest`, `CreateDatabaseRequest`, `CreateEndpointRequest`, `CreateProjectRequest`, `CreateRoleRequest`, `CreateSyncedTableRequest`. Caller must read multiple field docs to know which ID to set.

### 29. `CreateBranchRequest.replaceExisting` / `CreateEndpointRequest.replaceExisting` — request-shaped name on a create call — `src/v1/model.ts:995, 1043`
- **Why weird:** `replaceExisting?: boolean` on a `Create*` request is essentially "upsert mode". Doc: "If true, update the branch if it already exists instead of returning an error." Many SDKs call this `upsert: true` or `ifExists: 'update'`. Verb is also imperative on a request body.
- **Category:** 17 (inconsistent — `create` verb + `replaceExisting` flag conflate two operations), 1 (vague — "replace" how?).
- **Suggested name:** `upsert: boolean` or `mode: 'create' | 'upsert'`.
- **Rationale:** "Create-or-update" is a common API pattern that deserves a clearer name.

### 30. `Database.parent` is a branch path, `Database.spec.role` is a role path, `Database.status.role` is *also* a role path — `src/v1/model.ts:1111, 1132, 1151`
- **Why weird:** Two `role` fields on the spec and status sub-structs, both holding full resource paths like `projects/{}/branches/{}/roles/{}`. `Database.spec.role` is the *desired owner role*; `Database.status.role` is the *observed owner role*. Doc clarifies but the field-name overlap is jarring.
- **Category:** 19 (underspecified id — `role` is actually a role resource path), 1 (vague — `role` could be many things).
- **Suggested name:** `ownerRole` or `ownerRoleName`. Use the same name on spec and status.
- **Rationale:** Inside a `Database` struct, a bare `role: string` reads as "what role does this database have" — but it's specifically the *owner* role.

### 31. `postgresDatabase` field appears on both the database spec and status sub-types — `src/v1/model.ts:1142, 1153`
- **Why weird:** `Database.spec.postgresDatabase` and `Database.status.postgresDatabase` repeat "database" three times in one member access — the wrapper type is already `Database`.
- **Category:** 20 (type-suffix tautology), 7 (verbose).
- **Suggested name:** `pgName` / `pgIdentifier` or just `name` (with a JSDoc note: "matches the Postgres database identifier").
- **Rationale:** Same as #24, #25, #26.

### 32. `Database` (SDK resource) vs `postgresDatabase` field (Postgres-side identifier) — same thing, two names — `src/v1/model.ts:1100, 1142`
- **Why weird:** Class `Database` represents the SDK resource; field `postgresDatabase` is the underlying PG name. So `Database` is an SDK noun and `postgresDatabase` is the actual PG-server-side identifier. The field name is what the Postgres-savvy reader expects; the type name is the SDK abstraction. Reading `db.spec.postgresDatabase` requires you to track two abstraction layers.
- **Category:** 1 (vague — `Database` could be either layer), 6 (misleading — both names describe the same physical thing).
- **Suggested name:** Rename either the type (to `DatabaseResource` or `LakebaseDatabase`) or the field (to `pgName`).
- **Rationale:** Disambiguate the SDK resource from the Postgres server-side concept.

### 33. `Database` and `databaseId` query parameter for `createDatabase` — `src/v1/client.ts:269-313`, `model.ts:1023`
- **Why weird:** Operation is "Create a Database" — but `CreateDatabaseRequest` has `parent`, `databaseId`, and `database`. The body is `database`; the query param is `databaseId`. The path is `/postgres/${req.parent}/databases`. Three places carry the name. JSDoc on `databaseId` says "If database_id is not specified in the request, it is generated automatically." But the JSDoc on `database` (the body) says nothing about how it relates to `databaseId`.
- **Category:** 17 (inconsistency — three identifier slots), 6 (misleading — caller doesn't know which to use).
- **Suggested name:** Move identifier into `database.name`; flatten the request to `{database, parent, replaceExisting}`.
- **Rationale:** Three identifier slots is too many.

### 34. `DatabaseCredential.token: string` carries no doc on format — `src/v1/model.ts:1169`
- **Why weird:** "The OAuth token that can be used as a password when connecting to a database." Plain `string`. Sibling `expireTime: Temporal.Instant` does carry a type. The token doc doesn't say whether it's a JWT, opaque, format `<prefix>:<base64>`, etc. Same issue exists in `database/v1.DatabaseCredential.token`.
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `accessToken` (and document the format/lifetime in JSDoc).
- **Rationale:** Tokens carry semantics; consumers need to know the format.

### 35. `Endpoint.endpointType` field of type `EndpointType` — `src/v1/model.ts:1428`
- **Why weird:** `endpoint.endpointType` is type-suffix tautology again: three "endpoint"s. The field of type `EndpointType` could just be `type` since the surrounding type is `Endpoint`.
- **Category:** 20 (type-suffix tautology), 7 (verbose).
- **Suggested name:** `type: EndpointType` (or `kind`).
- **Rationale:** Same as #25.

### 36. `EndpointSpec.autoscalingLimitMinCu` / `autoscalingLimitMaxCu` — `Cu` suffix is opaque — `src/v1/model.ts:1430, 1435`
- **Why weird:** `Cu` stands for "Compute Unit" (referenced in JSDoc on `EndpointSpec`). Field name doesn't expand the acronym. `MinCu` / `MaxCu` reads as `min cu` / `max cu` — `cu` could be currency unit, control unit, or anything.
- **Category:** 5 (cryptic abbreviation), 1 (vague suffix).
- **Suggested name:** `minComputeUnits` / `maxComputeUnits`, or `autoscalingMinComputeUnits` / `autoscalingMaxComputeUnits`.
- **Rationale:** "CU" is Lakebase-internal slang.

### 37. `EndpointGroupSpec.min` / `max` with `min === max` constraint — `src/v1/model.ts:1356, 1362`
- **Why weird:** Two bare fields `min: number` / `max: number` (and `enableReadableSecondaries`) on a group spec. JSDoc says "Currently, this must be equal to max" — meaning callers must set min === max. Type system doesn't enforce; bare `min`/`max` doesn't suggest "group size".
- **Category:** 1 (vague), 16 (type contradicts spec — allows min ≠ max).
- **Suggested name:** `size: number` (until min ≠ max becomes supported, then introduce `minSize`/`maxSize`).
- **Rationale:** Pseudo-flexibility leaks proto future-proofing.

### 38. `EndpointHosts` — type holds 4 hostname fields — `src/v1/model.ts:1390-1409`
- **Why weird:** Fields are `host` (generic), `readOnlyHost`, `readWritePooledHost`, `readOnlyPooledHost`. The first is "the hostname"; the others narrow by direction/pooling. `host` reads as "the only host" but is just *one* of four. JSDoc clarifies but the field name doesn't.
- **Category:** 1 (vague — `host` is the catch-all), 15 (generic).
- **Suggested name:** `primaryHost` / `readOnlyHost` / `readWritePooledHost` / `readOnlyPooledHost` (i.e. give the first one a qualifier).
- **Rationale:** Reader doesn't know which is "the" host.

### 39. `EndpointSpec.suspension` discriminated union — `noSuspension: boolean` accepts an invalid `false` — `src/v1/model.ts:1449-1468`
- **Why weird:** Same pattern as #21 — one variant carries a duration, the other a boolean documented as accepting only `true`. The type permits `false`, the spec rejects it.
- **Category:** 16 (type allows `false` but spec rejects), 27 (echo of #21).
- **Suggested name:** Inline: `suspension?: Temporal.Duration | 'never'`.
- **Rationale:** Same as #21.

### 40. `EndpointSettings.pgSettings: Record<string, string>` field — `src/v1/model.ts:1417`
- **Why weird:** `pgSettings` is a map of Postgres GUC settings (e.g. `{ work_mem: '4MB' }`). Generic value type `string`. No validation. Field name `pgSettings` is itself ambiguous — could be any kind of setting.
- **Category:** 14 (proto map-entry shape leaks into TS), 1 (vague — `pgSettings` could be any kind of setting).
- **Suggested name:** `postgresGucSettings: Record<string, string>` (more specific).
- **Rationale:** Field name should encode the domain (Postgres GUC parameters).

### 41. `ForwardEtlConfig.workspaceId: number` typed as integer — `src/v1/model.ts:1522`
- **Why weird:** `workspaceId` is a `number` (also see `ForwardEtlConfig.createTimeMillis` — same numeric type for two unrelated concepts). Databricks workspace IDs are 64-bit integers — TS `number` can't represent the full int64 range above 2^53. Should be `bigint` or string.
- **Category:** 16 (field type contradicts domain — int64 wire vs JS number).
- **Suggested name:** `workspaceId: string` (or `bigint`).
- **Rationale:** Same precision pitfall as Java's `Long` going to JSON.

### 42. `GenerateDatabaseCredentialRequest.endpoint` field "not yet supported" — `src/v1/model.ts:1595-1598`
- **Why weird:** Field doc says "This field is not yet supported." Field is exposed in the public TS type without an `@deprecated` or `@unsupported` JSDoc marker.
- **Category:** 6 (misleading — looks usable but isn't).
- **Suggested name:** Mark with `@deprecated` JSDoc and/or rename to `endpointReserved`.
- **Rationale:** Same as `database` audit #56.

### 43. `GenerateDatabaseCredentialRequest.expiration` discriminated union — `src/v1/model.ts:1610-1627`
- **Why weird:** Same `oneof` pattern as #21 — `ttl` or `expireTime`. But here `noExpiry` doesn't exist; just two variants. The variant order in the union is `ttl` then `expireTime`, but on `BranchSpec.expiration` (#21) it's `expireTime` then `ttl`. Inconsistent variant ordering within the same package.
- **Category:** 17 (inconsistent variant ordering across two siblings).
- **Suggested name:** Standardise order across both unions.
- **Rationale:** Minor but a generator/consistency check would catch it.

### 44. `InitialBranchSpec` / `InitialDatabaseSpec` / `InitialEndpointSpec` / `InitialRoleSpec` — 4 "Initial*Spec" types duplicate the corresponding `<Resource>Spec` — `src/v1/model.ts:1734, 1746, 1757, 1776`
- **Why weird:** Four types named `Initial<Resource>Spec`, each carrying the same field set as the corresponding `<Resource>Spec`. The `Initial` prefix is documentation, not semantics — these are spec values for the *initial* default resources created with a project. `InitialRoleSpec` has nearly identical body to the role spec type (5 of 5 fields match). Duplicating the shape per-context multiplies the public surface.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Use the regular `Spec` types directly with a JSDoc note on `Project.initialBranchSpec` saying "use a `BranchSpec` value here; it applies only to the initial default branch".
- **Rationale:** Doubles the type count for a docs-only distinction.

### 45. `NewPipelineSpec` (top-level) vs the comment "Specification for creating a new pipeline" — `src/v1/model.ts:1963`
- **Why weird:** Type name carries the verb "new" (`NewPipelineSpec`). Reads as "the new pipeline spec" (a noun phrase about a *new* type of pipeline) or "spec for a new pipeline" (the actual intent). Java/C# call these `CreatePipelineSpec` or `PipelineCreate`. The type holds 4 fields (`storageCatalog`, `storageSchema`, `budgetPolicyId`, `pipelineChannel`).
- **Category:** 13 (verb-tense — `new` as adjective for a type name), 6 (misleading).
- **Suggested name:** `PipelineCreationSpec` or `NewPipelineConfig`.
- **Rationale:** Type names with embedded verbs are awkward; consider `Spec` only when the type *configures* something.

### 46. `Operation.metadata: Record<string, unknown>` — opaque metadata field — `src/v1/model.ts:2014`
- **Why weird:** Plain `Record<string, unknown>`. The 22 `*Operation` classes each parse this metadata into a specific `*OperationMetadata` type at runtime (`client.ts:1862-1865` etc.). But the public `Operation` type doesn't carry the metadata type as a generic parameter, so a consumer reading `op.metadata` directly has no help.
- **Category:** 15 (generic), 16 (loose typing).
- **Suggested name:** `Operation<T>` with `metadata?: T` (generic); each `*Operation` class returns `Operation<BranchOperationMetadata>` etc.
- **Rationale:** Same root cause as #14 — opaque records on the public surface.

### 47. `Operation.result` discriminated union with `error` / `response` — `src/v1/model.ts:2027-2038`
- **Why weird:** Variant `response` carries `Record<string, unknown>` (line 2036). Variant `error` carries the typed `DatabricksServiceExceptionWithDetailsProto`. Asymmetric: error is typed, response isn't. (The `*Operation.wait()` methods cast via Zod, but the public type stays opaque.)
- **Category:** 16 (asymmetric typing), 15 (generic on success arm).
- **Suggested name:** Same as #46 — generic `Operation<TResult, TMetadata>` with both arms typed.
- **Rationale:** Same as #14, #46.

### 48. `Project.spec` / `Project.status` / `Project.initialBranchSpec` / `Project.initialRoleSpec` / `Project.initialDatabaseSpec` / `Project.initialEndpointSpec` — six spec/status fields on one type, four are write-only — `src/v1/model.ts:2054-2095`
- **Why weird:** Single `Project` type carries spec + status + four initial-* sub-specs. The four `initial*` fields are create-time-only inputs but exposed on the response type too — a read-flow consumer sees four fields that are always empty.
- **Category:** 7 (overly verbose surface), 16 (write-only fields exposed on read shape).
- **Suggested name:** Hoist the `initial*` fields onto `CreateProjectRequest` only (where they belong); leave `Project` to spec/status.
- **Rationale:** Same as `database` audit #11 — input/output shape confusion.

### 49. `ProjectCustomTag` vs the `database` package's `CustomTag` — `src/v1/model.ts:2098`, `database:206`
- **Why weird:** `ProjectCustomTag` and `CustomTag` (in `database`) are textually identical (`{key, value}`). The `Project` prefix is package-scope tautology. Catalogs SDK and others use `CustomTag` too.
- **Category:** 12 (duplicate concept across packages), 20 (type-prefix tautology — `ProjectCustomTag` on `ProjectSpec.customTags`).
- **Suggested name:** `CustomTag` (drop the `Project` prefix). Or share a single `CustomTag` across SDK packages.
- **Rationale:** 13 duplicated `{key, value}` shapes in the workspace would be a useful audit.

### 50. `ProjectSpec.pgVersion: number` vs `ProjectStatus.pgVersion: number` — Postgres version as integer — `src/v1/model.ts:2148, 2191`
- **Why weird:** Doc says "The major Postgres version number. Supported versions are 16 and 17." Type is `number` (integer). Better to be an enum (`Pg16 | Pg17`) or `'16' | '17'` to encode "supported values". Also note `pgVersion: string` on `database/v1.DatabaseInstance` (the V1 package uses string) — inconsistent across the two packages.
- **Category:** 16 (type contradicts domain — open `number`), 17 (inconsistent with `database.DatabaseInstance.pgVersion` which is `string`).
- **Suggested name:** `pgMajorVersion: 16 | 17` or an enum.
- **Rationale:** Aligns documented constraints with the type system.

### 51. `ProjectSpec.historyRetentionDuration` vs `ProjectStatus.historyRetentionDuration` — copy of input on output — `src/v1/model.ts:2150, 2193`
- **Why weird:** Same field appears on `ProjectSpec` (input) and `ProjectStatus` (output, doc'd as "effective"). The output doesn't add an "effective" prefix as `database/v1` does, but the JSDoc on `ProjectStatus` does say "The effective number of seconds…". Inconsistency: `database` uses `effective_` prefix on output, `postgres` (this package) drops it. Could be progress, could be a regression — flag for clarity.
- **Category:** 17 (inconsistent with sister package).
- **Suggested name:** Pick one convention across the two packages.
- **Rationale:** Mixed conventions encourage bugs when bridging between SDKs.

### 52. `ProjectSpec.workspaceKeyEncrypted: boolean` — `src/v1/model.ts:2170`
- **Why weird:** Field doc admits the flag is temporary: "Since we need to do an end to end perf bench using BSS API to A/B test the performance impact of CMK encryption, we need to be able to control this flag in the API. This flag will be removed once we find a better way…" Flag is exposed on the public SDK surface.
- **Category:** 14 (internal-jargon leak — "BSS API", "CMK"), 6 (misleading — flag is benchmark-temporary).
- **Suggested name:** Either hide behind an internal beta-flag mechanism, or rename to `workspaceCmkEnabled` and document it neutrally.
- **Rationale:** Benchmark scaffolding on the public surface.

### 53. `ProjectSpec.enablePgNativeLogin` / `ProjectStatus.enablePgNativeLogin` — request-shaped verb on response — `src/v1/model.ts:2172, 2208`
- **Why weird:** Same problem as `database` audit #25: `enableX: boolean` reads as imperative on a response type. `ProjectStatus.enablePgNativeLogin` should read "is PG native login enabled".
- **Category:** 6 (misleading verb form), 17 (input/output asymmetry).
- **Suggested name:** Input: `enablePgNativeLogin`. Output: `pgNativeLoginEnabled`.
- **Rationale:** Same as `database` audit #25.

### 54. `RequestedResource.resourceName` discriminated union with `unspecifiedResourceName` and `tableName` — `src/v1/model.ts:2237-2246`
- **Why weird:** Same as `database` audit #16 — discriminated union whose `unspecifiedResourceName` variant exists only because the proto generator emits sentinel branches. `tableName` is the only useful variant.
- **Category:** 1 (vague), 6 (misleading — `unspecifiedResourceName` exists in TS but shouldn't).
- **Suggested name:** Top-level `RequestedResource = {kind: 'table', tableName: string}`.
- **Rationale:** Same as `database` audit #16.

### 55. `timeseriesKey` field casing on the synced-table spec — `src/v1/model.ts:2419`
- **Why weird:** Same as `database` audit #35: `timeseries` is one run-together word but English has `timeSeries` (two words). Wire is `timeseries_key`.
- **Category:** 3 (acronym/casing inconsistency), 17 (inconsistent with neighbours).
- **Suggested name:** `timeSeriesKey`.
- **Rationale:** Same as `database` audit #35.

### 56. Synced-table spec fields `acceleratedSync` / `createDatabaseObjectsIfMissing` / `extraIndexDefinitions` / `extraColumnDefinitions` / `typeOverrides` — same fields, same issues as `database` package — `src/v1/model.ts:2447, 2434, 2454, 2458, 2452`
- **Why weird:** Identical to `database` audit findings #37–#42. Won't re-state at length; flag that the duplication exists across both packages with identical naming.
- **Category:** 12 (duplicate concept), 17 (inherited inconsistencies).
- **Suggested name:** Same suggestions as `database` audit.
- **Rationale:** Two SDKs, same problems.

### 57. `Table` (non-synced) — generic single-word type — `src/v1/model.ts:2586`
- **Why weird:** `Table` is the most generic possible name. Doc: "Table represents a non-synced database table in a Lakebase project. Unlike SyncedTable, this does not have a data synchronization pipeline." Sibling `SyncedTable` has the "Synced" qualifier; this one should have "NonSynced" or "Native" qualifier. Bare `Table` is also confusable with UC `Table`, online `Table`, etc.
- **Category:** 1 (vague/generic), 12 (duplicate concept — `Table` exists in multiple SDK packages).
- **Suggested name:** `LakebaseTable` or `NativeTable` or `PgTable`.
- **Rationale:** Same as #17.

### 58. `Table.database` / `Table.project` / `Table.branch` — three string fields, each a different resource path — `src/v1/model.ts:2594-2598`
- **Why weird:** Three sibling string fields, each holding a different multi-segment path. `database` is `projects/{}/branches/{}/databases/{}`, `project` is `projects/{}`, `branch` is `projects/{}/branches/{}`. Two of them (`project` and `branch`) are prefixes of `database`. No discriminator.
- **Category:** 19 (underspecified ids), 1 (vague — bare `project` could be many things).
- **Suggested name:** `databaseName` / `projectName` / `branchName` (and prefix each with the resource type the path identifies).
- **Rationale:** Three resource paths under generic field names.

### 59. `Table.tableServingUrl` / `DatabaseTable.tableServingUrl` (in `database` package) — same field, same issue — `src/v1/model.ts:2600`
- **Why weird:** `tableServingUrl` is opaque (see `database` audit #33). "Serving" is feature-store jargon for "REST endpoint for reads". On a Postgres table, the meaning is "REST API to read this table". Field doc: "REST API URL for serving data from this table."
- **Category:** 1 (vague), 6 (misleading — `Serving` is feature-store terminology).
- **Suggested name:** `restEndpointUrl` / `apiEndpointUrl`.
- **Rationale:** Same as `database` audit #33.

### 60. `UpdateBranchRequest.updateMask: FieldMask<Branch>` — Google API protocol leak — `src/v1/model.ts:2629`
- **Why weird:** Generic `FieldMask<T>` is a Google-API-protocol-buffers thing for partial updates. The naming is correct for an AIP-conformant API; less correct for an idiomatic TS SDK. Same on `UpdateDatabaseRequest`, `UpdateEndpointRequest`, `UpdateProjectRequest`, `UpdateRoleRequest`.
- **Category:** 14 (Google AIP/proto leak), 1 (vague — `updateMask` is jargon).
- **Suggested name:** `fields?: (keyof Branch)[]` or `patch?: Partial<Branch>` (and derive the field-mask). The `FieldMask` import already comes from `@databricks/sdk-core/wkt` (well-known types) — the SDK already lifts the type.
- **Rationale:** AIP `FieldMask` is an industry pattern, but it should not be the only update affordance.

### 61. `DeleteForwardEtlConfigurationResponse.deletedConfigs` / `deletedMappings` — count fields without singular form — `src/v1/model.ts:1247-1250`
- **Why weird:** Field is `deletedConfigs: number | undefined` — a count, not a list. The name reads as a plural array (`deletedConfigs: Config[]`). JSDoc clarifies "Number of configuration rows deleted (0 or 1)".
- **Category:** 9 (singular/plural mismatch — plural name on a `number`), 1 (vague).
- **Suggested name:** `deletedConfigCount` / `deletedMappingCount`.
- **Rationale:** Reader sees `deletedConfigs` and expects an array.

### 62. `getOperation` / `Operation.name` — operation name is a resource path — `src/v1/client.ts:1109`, `model.ts:1699`
- **Why weird:** `getOperation({name: ...})` takes a `string` that is actually a path like `operations/{unique_id}`. The doc on `Operation.name` says "If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`." But it doesn't validate.
- **Category:** 19 (underspecified id), 6 (misleading — `name` reads like a label).
- **Suggested name:** `operationResourceName` / `operationPath` / `id`.
- **Rationale:** Same as #19.

### 63. `createTable` / `deleteTable` / `getTable` — operate on `Table`, not the synced version — `src/v1/client.ts:502, 826, 1207`
- **Why weird:** Method names `createTable` are generic; consumer must read the JSDoc to know they target the `Table` (non-synced) resource. Sibling `createSyncedTable` is explicit. `Table` operations are CRUD over native PG tables; the method name should signal that.
- **Category:** 1 (vague — `createTable` is generic), 12 (duplicate concept — also `CreateDatabaseTableRequest` in `database` package).
- **Suggested name:** `createNativeTable` / `createLakebaseTable` (mirror the `createSyncedTable` pattern).
- **Rationale:** Lakebase has two table flavors; both deserve explicit method names.

## Low severity

### 64. `BranchSpec.sourceBranch` / `sourceBranchLsn` / `sourceBranchTime` — `src/v1/model.ts:785, 787, 789`
- **Why weird:** Three sibling fields on `BranchSpec`. `sourceBranch` is a path; `sourceBranchLsn` and `sourceBranchTime` are alternative cutover specifiers (one or the other). Bare `branchTime` repeats from `database/v1.DatabaseInstanceRef.branchTime` (see `database` audit #28).
- **Category:** 1 (vague — `branchTime` is a cutover instant, not a time-of-branch).
- **Suggested name:** `sourceBranch` / `sourceBranchLsn` / `sourceBranchTime` are OK; consider `sourceBranchAtLsn` / `sourceBranchAtTime` for clarity.
- **Rationale:** Same as `database` audit #28.

### 65. `BranchSpec.expireTime` (inside union variant) vs `BranchStatus.expireTime` (top-level) — `src/v1/model.ts:805, 850`
- **Why weird:** Field name `expireTime` appears twice: once as a discriminated-union variant on `BranchSpec` (input), once as a top-level field on `BranchStatus` (output). Reader has to track that the input shape collapses `expireTime`/`ttl`/`noExpiry` to a single output value `expireTime`.
- **Category:** 17 (input/output shape mismatch).
- **Suggested name:** Document the asymmetry in JSDoc; or expose the same union shape on output.
- **Rationale:** Generator-driven asymmetry.

### 66. `BranchSpec.ttl: Temporal.Duration` and `BranchSpec.expireTime` — `ttl` is a duration, `expireTime` is a timestamp — `src/v1/model.ts:813, 805`
- **Why weird:** `ttl` (time-to-live) and `expireTime` are sibling variants. `ttl` is duration-shaped; `expireTime` is timestamp-shaped. Bare `ttl` is a Unix-cache-style abbreviation.
- **Category:** 5 (cryptic abbreviation — `ttl`).
- **Suggested name:** `lifetime: Duration` or `expireAfter: Duration`.
- **Rationale:** `TTL` is widely understood but expansion improves grep-ability.

### 67. `CreateBranchRequest.replaceExisting` vs `DeleteBranchRequest.allowMissing` — verb-tense asymmetry across CRUD — `src/v1/model.ts:995, 1200`
- **Why weird:** Create uses `replaceExisting: boolean` (proactive). Delete uses `allowMissing: boolean` (tolerant). Two different conventions for the "if it does/doesn't exist" behaviour. Update has no such field; Get doesn't either. Inconsistent.
- **Category:** 17 (inconsistent action verbs across CRUD).
- **Suggested name:** Pick one: `ifExists: 'update' | 'error'` and `ifMissing: 'ignore' | 'error'`, or just both `upsert` and `ignoreIfMissing`.
- **Rationale:** Inconsistent options across CRUD operations is a small papercut.

### 68. `DeleteBranchRequest.purge` — boolean for hard delete — `src/v1/model.ts:1195`
- **Why weird:** `purge: boolean` distinguishes hard vs soft delete. Doc: "If true, permanently delete the branch; if false, soft delete. Soft deletion (purge=false) is not supported yet." So the value of `false` is rejected. Same `purge` field on `DeleteProjectRequest` (line 1263).
- **Category:** 16 (type allows `false` but spec rejects), 6 (misleading — purge implies cleanup, not the *only* delete mode).
- **Suggested name:** `deleteMode: 'hard' | 'soft'` or `permanent: boolean`. Add `@deprecated` until soft-delete is supported.
- **Rationale:** Boolean toggle for a future-3-state field.

### 69. `DeleteForwardEtlConfigurationRequest` vs `DisableForwardEtlRequest` — two near-identical types — `src/v1/model.ts:1229, 1306`
- **Why weird:** Both types carry `parent`, `tenantId`, `timelineId`, `pgDatabaseOid`, `pgSchemaOid`. Doc on `DeleteForwardEtlConfigurationRequest`: "Unlike DisableForwardEtl, this permanently removes the config and mapping rows." The distinction is `Delete` (hard) vs `Disable` (soft) — same boolean-toggle pattern as `purge` (#68) but split into two types.
- **Category:** 12 (duplicate concept), 17 (different verbs for the same shape).
- **Suggested name:** Merge into one request type with a `mode: 'delete' | 'disable'` field.
- **Rationale:** Two methods carrying identical fields suggests one method with a flag.

### 70. `ForwardEtlMetadata.databases` / `schemas` — bare plurals — `src/v1/model.ts:1554, 1556`
- **Why weird:** `databases: ForwardEtlDatabase[]` and `schemas: ForwardEtlSchema[]` — bare plurals. Inside a `ForwardEtl` context, these are PG OID-to-name maps, not regular databases/schemas. Reader expects `Database` (the SDK type) but gets `ForwardEtlDatabase` (a name+OID pair).
- **Category:** 1 (vague — `databases` is too generic in a `ForwardEtl` context), 17 (`Database` SDK type vs `ForwardEtlDatabase` ad-hoc type).
- **Suggested name:** `databaseOids` / `schemaOids` (matches the underlying domain), or keep plurals but document.
- **Rationale:** Mild — context disambiguates.

### 71. `ForwardEtlTableMapping.lastSyncedLsn: string` — LSN as bare string — `src/v1/model.ts:1582`
- **Why weird:** Postgres LSN is `XX/YY` string. Field name uses `Lsn` abbreviation without expansion. Sibling `pgTableOid` already a Postgres-internal.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `lastSyncedLogSequenceNumber` (or `walLsn`).
- **Rationale:** Same as `database` audit #27.

### 72. `GenerateDatabaseCredentialRequest.claims: RequestedClaims[]` — plural of a plural type — `src/v1/model.ts:1593`
- **Why weird:** Same as `database` audit #53 — `RequestedClaims` is already plural; `claims: RequestedClaims[]` is "an array of plural claims objects".
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Same as `database` audit #53 — singular type `RequestedClaim` + plural field `claims: RequestedClaim[]`.
- **Rationale:** Same as `database` audit #53.

### 73. `GenerateDatabaseCredentialRequest.groupName: string` — `src/v1/model.ts:1604`
- **Why weird:** Doc: "Databricks workspace group name. When provided, credentials are generated with permissions scoped to this group." Bare `groupName` reads as a Postgres role name; actually a Databricks workspace group. Field is sibling to `claims` and `endpoint`; the relationship between them isn't spelled out (do you set all three? one? two?).
- **Category:** 1 (vague — `groupName` could be PG or DB workspace), 17 (multi-field request without clear mutex docs).
- **Suggested name:** `workspaceGroupName`.
- **Rationale:** Disambiguate from Postgres role names.

### 74. `Operation.done: boolean | undefined` — tri-state boolean — `src/v1/model.ts:2020`
- **Why weird:** Boolean that can be `undefined` is a tri-state value. JSDoc says "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed…" — but doesn't say what `undefined` means. The `*Operation.wait()` methods check `op.done === undefined && throw` (e.g. `client.ts:1885`).
- **Category:** 16 (type allows three values but spec only documents two).
- **Suggested name:** Make non-optional `done: boolean`. If absent on the wire, treat as `false` in unmarshal.
- **Rationale:** Tri-state booleans always confuse callers.

### 75. `Project.deleteTime` / `Project.purgeTime` — two delete-related timestamps — `src/v1/model.ts:2067, 2072`
- **Why weird:** `deleteTime` = "when soft-deleted"; `purgeTime` = "when scheduled for permanent deletion". Bare verbs `delete` / `purge` are similar; the distinction matters for the consumer but the field names alone don't communicate the lifecycle.
- **Category:** 1 (vague), 6 (misleading — `purge` could mean "purged at" or "scheduled to purge").
- **Suggested name:** `softDeletedAt` / `scheduledPurgeAt`.
- **Rationale:** Lifecycle-related fields benefit from clearer past/future tense.

### 76. `ProjectStatus.syntheticStorageSizeBytes` — "synthetic" qualifier — `src/v1/model.ts:2199`
- **Why weird:** `syntheticStorageSizeBytes` — what's "synthetic" about storage? Doc says "The current space occupied by the project in storage." JSDoc doesn't explain "synthetic". Likely Lakebase internal billing concept.
- **Category:** 1 (vague), 14 (internal-jargon leak).
- **Suggested name:** `storageSizeBytes` or `billingStorageSizeBytes`.
- **Rationale:** Internal-jargon leak.

### 77. `ProjectStatus.computeLastActiveTime` — `src/v1/model.ts:2201`
- **Why weird:** Doc: "The most recent time when any endpoint of this project was active." Field name is `compute` + `lastActiveTime` — reads as "the compute last active time" with an implicit possessive. Awkward grammar.
- **Category:** 1 (vague), 17 (irregular grammar).
- **Suggested name:** `lastComputeActiveTime` or `lastActivityTime` or `lastEndpointActivityTime`.
- **Rationale:** Word ordering in compound field names matters for grep-ability.

### 78. `Branch.spec.expiration` JSDoc mentions `update_mask` (snake_case) — `src/v1/model.ts:797, 803, 811, 820, 1447, 1455, 1465`
- **Why weird:** JSDoc references update mask in snake_case (e.g. "When updating this field, use `spec.expiration` in the update_mask"). Update mask field on the request is `updateMask: FieldMask<...>` (camelCase) but docs reference the wire-format name. Consumer reading the JSDoc and writing TS code has to translate.
- **Category:** 17 (inconsistent — JSDoc snake_case, TS camelCase).
- **Suggested name:** Use TS field name in JSDoc.
- **Rationale:** Doc/code drift.

### 79. `ListBranchesRequest.showDeleted` / `ListProjectsRequest.showDeleted` — pair of duplicate optional flags — `src/v1/model.ts:1844, 1934`
- **Why weird:** Two structs carry identical `showDeleted?: boolean` with similar JSDoc. Not bad on its own, but the option name `showDeleted` is itself an imperative-shaped name on a request type (compare to `includeDeleted` or `deletedOnly`).
- **Category:** 1 (vague — `show` is presentation-layer language for a server request).
- **Suggested name:** `includeDeleted` or `includeSoftDeleted`.
- **Rationale:** Same as `database` audit #25 — request shapes prefer descriptive booleans over imperative ones.

### 80. `listComputeInstances`'s doc reads "The parent, which owns the compute instances" — `src/v1/model.ts:1855`
- **Why weird:** `ListComputeInstancesRequest.parent` doc is sparse: "The parent, which owns the compute instances." No format given. Compare to sibling `ListBranchesRequest.parent` which specifies "Format: `projects/{project_id}`".
- **Category:** 6 (misleading — doc missing).
- **Suggested name:** Fix the doc; add the format.
- **Rationale:** Documentation copy-paste oversight.

## Observation

### 81. Method JSDoc inconsistency — `src/v1/client.ts` throughout
- **Why weird:** Some methods have rich JSDoc ("Creates a new database branch in the project.", "Register a Postgres database in the Unity Catalog."). Others are terse ("Create a Database.", "Get a Database.", "List Databases."). Inconsistency in doc depth across CRUD methods of the same resource.
- **Category:** Observation (doc quality, not naming).
- **Suggested name:** Standardise to the richer template.
- **Rationale:** Naming-adjacent.

### 82. `Operation` is a separate type, not a generic — `src/v1/model.ts:2002`
- **Why weird:** All 22 mutation methods return `Promise<Operation>`. The `Operation` type is monomorphic — no generic parameter for result/metadata. Consumer either uses the per-resource `*Operation` waiter classes (#15) or reads `Operation.result.response` (untyped `Record`).
- **Category:** Observation (architecture, not naming per se).
- **Suggested name:** `Operation<TResult, TMetadata>` generic.
- **Rationale:** Connects #14, #15, #46, #47.

### 83. The provisioning-state enum is exported from both `database` and `postgres` packages with identical members — `src/v1/model.ts:654`, `database/v1/model.ts:148`
- **Why weird:** Same enum, two packages, identical members. Reader importing both packages has to alias one.
- **Category:** Observation (cross-package duplication).
- **Suggested name:** Move to a shared `core/lakebase-common` or `core/enums`.
- **Rationale:** Related to #2.
