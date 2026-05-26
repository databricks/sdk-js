# Naming Audit: database

**Path:** `packages/database/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Lakebase OLTP layer — manage Postgres `DatabaseInstance`s, `DatabaseCatalog`s (Unity Catalog mirrors of logical Postgres databases), `DatabaseTable`s (UC-registered PG tables), `SyncedDatabaseTable`s (UC-managed Delta-to-PG continuous/triggered/snapshot sync pipelines), instance roles, and short-lived credentials.
**Total weird names flagged:** 19

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 11 |
| Low | 1 |
| Observation | 2 |

## High severity

### 1. `DatabaseInstanceRole_Attributes.createdb` / `createrole` / `bypassrls` — `src/v1/model.ts:373-375`
- **Why weird:** Three lowercase, run-together field names. The doc comment (model.ts:365-370) explicitly says "The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical underscores between words." That justifies the wire format (Postgres keywords are case-insensitive identifiers) but the *TypeScript* field should use `camelCase` (`createDb`, `createRole`, `bypassRls`) — the wire stays `createdb`/`createrole`/`bypassrls`. `createrole` is particularly confusing because it could read as `create_role` (a verb-phrase) or `creator_ole`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Postgres-keyword names not idiomatic in TS).
- **Suggested name:** `createDb`, `createRole`, `bypassRls` in the TS type; keep `createdb`/`createrole`/`bypassrls` on the wire (marshal/unmarshal handles the mapping).
- **Rationale:** Every other field in the package is `camelCase`. Three boolean fields breaking the convention to honour Postgres SQL keywords is a leak. Postgres SDK at `postgres/v1/model.ts` solves this differently — worth aligning.

### 2. `SYNCED_TABLED_OFFLINE` typo — `src/v1/model.ts:70`
- **Why weird:** Should be `SYNCED_TABLE_OFFLINE`. Spelled as `SYNCED_TABLED_OFFLINE` (`TABLED` past tense).
- **Category:** 6 (misleading: typo).
- **Suggested name:** Fix the wire-string to `SYNCED_TABLE_OFFLINE`.
- **Rationale:** This is a protocol-level typo that the SDK is propagating. If fixed upstream this becomes a breaking change unless aliased — flag now.

### 3. `effective*` field-prefix pattern duplicates every input field — `src/v1/model.ts` (~24 effective_ fields across DatabaseInstance, DatabaseInstanceRef, DatabaseInstanceRole, SyncedDatabaseTable)
- **Why weird:** `DatabaseInstance` has 15 input/output pairs: `capacity`/`effectiveCapacity`, `stopped`/`effectiveStopped`, `nodeCount`/`effectiveNodeCount`, `enableReadableSecondaries`/`effectiveEnableReadableSecondaries`, `retentionWindowInDays`/`effectiveRetentionWindowInDays`, `enablePgNativeLogin`/`effectiveEnablePgNativeLogin`, `usagePolicyId`/`effectiveUsagePolicyId`, `customTags`/`effectiveCustomTags`, plus `lsn`/`effectiveLsn` on `DatabaseInstanceRef`, `attributes`/`effectiveAttributes` on `DatabaseInstanceRole`, and `databaseInstanceName`/`effectiveDatabaseInstanceName` (+1 more) on `SyncedDatabaseTable`. JSDoc on every effective field is the same boilerplate sentence. Doubles the surface area of every type.
- **Category:** 7 (overly verbose), 12 (duplicate concept), 15 (generic prefix).
- **Suggested name:** Hoist effective values onto a sub-struct or use a discriminated `{input, effective}` shape; or drop the `effective` fields and explain in docs that the same field is read-mostly on responses.
- **Rationale:** This is a Lakebase API protocol pattern, not a naming bug per se, but the resulting TS surface is twice as wide as it needs to be. Worth pushing back upstream.

### 4. `FindDatabaseInstanceByUidRequest` / `findDatabaseInstanceByUid` — `src/v1/model.ts:446`, `client.ts:395`
- **Why weird:** Verb tense (`Find ... By ...`) is Java/Spring-style. Other clients use `getXById` / `getX` style. The doc on the field at line 447 also says "UID of the **cluster** to get" — referring to a *cluster*, not an instance, contradicting the type name. Same JSDoc bug appears on `GetDatabaseInstanceRequest.name` (model.ts:471): "Name of the **cluster** to get".
- **Category:** 14 (Java-style name), 6 (misleading doc — says cluster, type says instance), 17 (verb-tense inconsistency with `getDatabaseInstance`).
- **Suggested name:** `LookupDatabaseInstanceRequest` + `lookupDatabaseInstance`, or fold into `getDatabaseInstance` with a uid alternative. Fix the doc strings.
- **Rationale:** `findXByY` is uncommon in JS SDKs; `getX` is the idiomatic verb. The misleading "cluster" comments are an additional bug.

### 5. `CreateDatabaseInstanceWaiter` exports separately and the wait class is a noun-phrase — `src/v1/client.ts:924`, `index.ts:3`
- **Why weird:** Class name reads as "the *create instance waiter*" — i.e. a waiter for a create-instance operation. JS convention for poll-helpers tends to be `Poller`, `Waiter`, or a verb (e.g. `waitForX`). Calling it `CreateDatabaseInstanceWaiter` mixes a verb (`Create`) with a noun-suffix (`Waiter`) — reads as "a waiter that creates"; the meaning is "a waiter for a creation result".
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll helper naming).
- **Suggested name:** `DatabaseInstanceCreationWaiter`, or eliminate the class entirely and expose `createDatabaseInstance({wait: true})` / `createDatabaseInstanceAndWait()` returning the final instance.
- **Rationale:** The current name reads ambiguously; class names should be noun phrases describing *what they are*. The export at index.ts:3 means consumers see it directly.

## Medium severity

### 6. `DatabaseInstance.capacity: string` typed as a free-form string but doc constrains it — `src/v1/model.ts:211`
- **Why weird:** Field doc says 'Valid values are "CU_1", "CU_2", "CU_4", "CU_8".' That is an enum encoded as a string. Should be an enum.
- **Category:** 16 (field type contradicts domain), 1 (vague — `capacity` for an opaque size class).
- **Suggested name:** Introduce `Capacity` enum (`Cu1 | Cu2 | Cu4 | Cu8`); rename field to `sku` if Lakebase docs prefer that term, since the doc itself says "The sku of the instance".
- **Rationale:** Generator artefact: protobuf string-typed scalars often hide enums. Worth pushing back.

### 7. `DatabaseInstance.stopped` / `effectiveStopped` as a boolean toggle for state — `src/v1/model.ts:219,225`
- **Why weird:** Already-state-bearing struct has `state?: DatabaseInstance_State` (which includes `STOPPED`). Adding an orthogonal `stopped: boolean` is redundant and confusing — what happens if `state = AVAILABLE` and `stopped = true`?
- **Category:** 17 (two fields encoding the same concept), 12 (duplicate concept within the same struct).
- **Suggested name:** Either drop `stopped` and use `state === STOPPED`, or make it write-only and exclude from the read shape.
- **Rationale:** The doc says "An input only param" but the type makes it look like both. Worth a `@deprecated`-style marker.

### 8. `SyncedDatabaseTable` vs `DatabaseTable` — overlapping concepts — `src/v1/model.ts:378,590`
- **Why weird:** Two near-identical struct types: `DatabaseTable` registers an existing PG table in UC; `SyncedDatabaseTable` is a UC-side spec for a Delta-to-PG sync. They share `name`, `databaseInstanceName`, `logicalDatabaseName`. Naming does not signal that `SyncedDatabaseTable` is more like a "managed table" while `DatabaseTable` is a "foreign-table registration".
- **Category:** 12 (duplicate concept), 1 (generic `Database`).
- **Suggested name:** `PgTableRegistration` and `DeltaSyncedPgTable` (or similar). At minimum, doc each type with a sentence about how they differ.
- **Rationale:** Reader has to read both JSDocs to understand the partitioning.

### 9. `SyncedTableSpec.timeseriesKey` casing — `src/v1/model.ts:731`
- **Why weird:** `timeseries` is one run-together word; could be `timeSeriesKey` (two words). Same field appears on the wire as `timeseries_key` — wire uses snake_case run-together, TS preserves it. Other compound words in this file (e.g. `pageToken`, `nextPageToken`) split words at capital boundaries.
- **Category:** 3 (acronym/casing inconsistency), 17 (inconsistent with neighbours).
- **Suggested name:** `timeSeriesKey`.
- **Rationale:** Trivia, but `time series` is two words in English.

### 10. `SyncedTableStatus.lastSync: SyncedTablePosition` — `src/v1/model.ts:795`
- **Why weird:** `SyncedTablePosition` is a curious type name — it represents a "position" but holds two timestamps and a source-sync-info union. "Position" reads as an offset/cursor; here it's a snapshot of sync progress.
- **Category:** 1 (vague — `Position` is generic), 6 (misleading — not a positional cursor).
- **Suggested name:** `LastSyncSummary` or `SyncCheckpoint`.
- **Rationale:** Reader sees `lastSync: SyncedTablePosition` and thinks "the position of the last sync" — but the type holds start/end timestamps, not an offset.

### 11. `DeltaTableSyncInfo` is the only `*SyncInfo` type and the only `Delta*` type — `src/v1/model.ts:436`
- **Why weird:** Type holds two fields (`deltaCommitVersion`, `deltaCommitTimestamp`). The `Delta` prefix appears once at the type level and twice at the field level (`deltaCommitVersion`, `deltaCommitTimestamp`). Type-prefix duplication.
- **Category:** 20 (type-suffix tautology in field names), 7 (verbose).
- **Suggested name:** Type `DeltaSyncCheckpoint`, fields `commitVersion` / `commitTimestamp`.
- **Rationale:** Inside `DeltaTableSyncInfo` the `delta` prefix is implied.

### 12. `GenerateDatabaseCredentialRequest.claims` (plural `RequestedClaims[]`) but `RequestedClaims` is itself plural — `src/v1/model.ts:463,577`
- **Why weird:** `RequestedClaims` is already plural. Field `claims: RequestedClaims[]` is "an array of plural-claims-objects". JWT-claims convention is that "claims" is a noun-collective; one `RequestedClaims` object holds many claims and is itself one entity.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Singular type `RequestedClaim` (or `ClaimRequest`) used in plural field `claims: ClaimRequest[]`; or scalar wrapper `claims: RequestedClaimsBundle`.
- **Rationale:** Plural-of-plural confuses iteration code.

### 13. `GenerateDatabaseCredentialRequest.instanceNames` is "instance_names or claims" — `src/v1/model.ts:454-455`
- **Why weird:** Doc says "At least one of instance_names or claims must be specified" — that's a one-of-required constraint expressed only in prose. Type system allows both empty/both set.
- **Category:** 16 (type contradicts domain constraint), 1 (loose contract).
- **Suggested name:** Discriminated union of `{instanceNames: string[]}` vs `{claims: ClaimRequest[]}`.
- **Rationale:** Generator artefact; flag for upstream tightening.

### 14. `NewPipelineSpec` type and `newPipelineSpec` field — `src/v1/model.ts:551,753`
- **Why weird:** Proto-architectural leak on two axes. (1) `New` is a mid-position relativistic adjective (`Old`/`New`/`Legacy`/`Modern`) — type names should describe what a value *is*, not its temporal status relative to a peer (here, paired with `existingPipelineId`). The "newness" is only meaningful at the moment of creation; the same struct shape would describe an old pipeline equally well. (2) `Spec` is a generic suffix that appears twice in the package (also `SyncedTableSpec`) — see also finding #15 on repeated `Spec`/`Info` suffixes. The `New` prefix mirrors a proto oneof discriminator (existing-vs-new), not a TS-native concept.
- **Category:** proto-architectural leak (forbidden mid adjective `New`), 15 (generic suffix `Spec`).
- **Suggested name:** Type `PipelineCreationOptions` / `InlinePipelineConfig`; field `inlinePipeline` (paired with `existingPipelineId`). Drop the `New` adjective and the `Spec` suffix.
- **Rationale:** The presence of `New` in a type name implies a corresponding `Old`/`Existing` type — which doesn't exist as a struct, only as a sibling string field. The asymmetry betrays the proto oneof.

### 15. Repeated generic suffixes `*Spec` and `*Info` across the package — `src/v1/model.ts:436,551,575,723`
- **Why weird:** Two `*Spec` types (`NewPipelineSpec`, `SyncedTableSpec`) and two `*Info` types (`DeltaTableSyncInfo`, `ProvisioningInfo`) coexist with no shared interface or contract. `Spec` and `Info` are generic stand-in nouns that proto / gRPC schemas overuse; they convey "this is a bag of fields" rather than the domain concept. `ProvisioningInfo` is empty (see #16); `DeltaTableSyncInfo` is a sync checkpoint (see #11); `SyncedTableSpec` is a sync pipeline configuration; `NewPipelineSpec` is creation-time pipeline options (see #14). Each of the four would read more clearly with a domain-specific suffix.
- **Category:** proto-architectural leak (repeated `Spec`/`Info` suffixes), 15 (generic nouns), 1 (vague).
- **Suggested name:** `SyncedTableSpec` → `SyncedTableConfig` (still generic) or better `SyncPipelineDefinition`; `NewPipelineSpec` → `InlinePipelineConfig` (see #14); `DeltaTableSyncInfo` → `DeltaSyncCheckpoint` (per #11); `ProvisioningInfo` → drop (per #16). Goal: no two types in the package share a generic suffix.
- **Rationale:** When `Spec` and `Info` appear repeatedly, the reader has to look up each one to know what it actually holds. Suffix-disambiguation is a proto smell that the TS surface inherits.

### 16. `ProvisioningInfo` empty interface copied verbatim from another proto file — `src/v1/model.ts:570-575`
- **Why weird:** Type declaration is literally `export interface ProvisioningInfo {}` with a comment "Copied over from managed-catalog/api/messages/common.proto to decouple SDK packages. xref go/unified-api-packages-dd". An empty interface — the type itself carries zero domain meaning. Only its nested `ProvisioningInfo_State` enum is used (referenced by `SyncedDatabaseTable.unityCatalogProvisioningState`); the empty parent is a vestigial proto namespace. The exported type name and its nested enum bleed Managed Catalog internals into the Lakebase SDK.
- **Category:** proto-architectural leak (proto message preserved as empty TS interface for namespacing), 6 (misleading — exists but has no fields), 12 (cross-package proto leak).
- **Suggested name:** Drop the empty `ProvisioningInfo` interface; rename `ProvisioningInfo_State` to `ProvisioningState` (or `UnityCatalogProvisioningState`, matching its sole use site). The empty interface is a generator artefact that should not surface.
- **Rationale:** An empty exported interface is dead surface area. The xref comment (`go/unified-api-packages-dd`) tells the reader this is a cross-package proto coordination workaround — that workaround belongs in the generator, not in the public TS types.

## Low severity

### 17. `CreateDatabaseInstanceRoleRequest.databaseInstanceName` (field) vs `instanceName` (also field) on same request — `src/v1/model.ts:158-160`
- **Why weird:** Same struct exposes `instanceName` and `databaseInstanceName` — both strings, both presumably name an instance. Doc-less. Wire format makes `instanceName` the path parameter and `databaseInstanceName` a query parameter (visible in client.ts:181-184).
- **Category:** 12 (duplicate concept), 17 (inconsistent naming for the same thing), 19 (underspecified ids).
- **Suggested name:** One field. If protocol genuinely needs both, name them `instanceNamePath` / `instanceNameQuery` and add docs.
- **Rationale:** Caller has to know the wire-encoding accident to decide which to set.

## Observations

### 18. `findDatabaseInstanceByUid` is the only `findBy*` method
Every other lookup is `getX(req)`. This method exists because the API has a distinct route (`/instances:findByUid`) for UID-lookup vs `/instances/{name}`. The TS surface reflects the URL shape rather than the user's mental model.
- **Category:** 17 (inconsistency with peer methods).

### 19. Action-verb conventions in `Client` are consistent
`create*` / `delete*` / `get*` / `list*` / `findBy*` — verb prefixes are consistent. Lookup is `get` (good). No `fetch`/`retrieve`/`read` mixing.

## Domain glossary
- `Lakebase` — Databricks' managed Postgres-as-a-service product (mentioned only in the buried client.ts:634 comment).
- `PG` / `pg` / `Postgres` / `PostgreSQL` — Postgres database; appears as `pgVersion`, `enablePgNativeLogin`, `PG_ONLY`, and as `PostgreSQL` in JSDoc.
- `UC` — Unity Catalog (referenced in `claims` doc and in JSDoc of `DatabaseCatalog`).
- `DNS` — Domain Name System (used as `Dns` suffix on `readWriteDns`/`readOnlyDns`).
- `LSN` — Postgres Log Sequence Number (`lsn`, `effectiveLsn`).
- `WAL` — Postgres Write-Ahead Log (referenced in `lsn` doc).
- `CU` — Capacity Unit (e.g. `CU_1`, `CU_2` — only in `capacity` doc string).
- `CDF` — Change Data Feed (Delta Lake feature; referenced in `SyncedTableSchedulingPolicy` docs).
- `PITR` — Point-in-Time Recovery (referenced in `DeleteDatabaseInstanceRequest.force` doc).
- `RLS` — Row-Level Security (`bypassrls` field).
- `AIP` — Google API Improvement Proposals (referenced in `allowMissing` doc).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `oss`/`m2m`/`u2m`/`pat`/`iam`/`abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (1,904 lines): read fully.
- `src/v1/client.ts` (995 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (67 lines): read fully.
