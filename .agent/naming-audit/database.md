# Naming Audit: database

**Path:** `packages/database/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Lakebase OLTP layer — manage Postgres `DatabaseInstance`s, `DatabaseCatalog`s (Unity Catalog mirrors of logical Postgres databases), `DatabaseTable`s (UC-registered PG tables), `SyncedDatabaseTable`s (UC-managed Delta-to-PG continuous/triggered/snapshot sync pipelines), instance roles, and short-lived credentials.
**Total weird names flagged:** 55

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 33 |
| Low | 9 |
| Observation | 3 |

## High severity

### 1. Package name `database` is generic — does not say Lakebase / OLTP / Postgres — `packages/database/`
- **Why weird:** `database` is the most generic possible word for a Databricks SDK package. The actual domain is "Lakebase" / Databricks-managed Postgres (every type either wraps a Postgres concept or is a UC mirror of one), but neither the package name, the README, nor any top-level JSDoc says "Lakebase" or "Postgres". A user scanning the workspace sees `database`, `postgres`, `sql`, `catalog` (Unity Catalog), `dbsql` etc. and cannot distinguish them.
- **Category:** 1 (vague/generic), 12 (duplicate concept: `database` vs `postgres` packages — see #2).
- **Suggested name:** `lakebase`, `lakebase-instances`, or `oltp` — whichever marketing name is canonical. At minimum, add a JSDoc on `index.ts` saying "Lakebase Postgres instance management".
- **Rationale:** Package names are the first-line filter a user uses; "database" tells them nothing. The sister package `postgres` is more specific despite sitting at a lower level.

### 2. `database` and `postgres` packages overlap and confuse — `packages/database/` vs `packages/postgres/`
- **Why weird:** Two sibling packages model what is almost the same physical thing. `database` exposes `DatabaseInstance` / `SyncedDatabaseTable` / `DatabaseCatalog`; `postgres` exposes `ComputeInstance` / `SyncedTable` / `Catalog` / `Project` / `Branch` / `Endpoint`. Several types are textually duplicated (`DeltaTableSyncInfo`, `SyncedTablePosition`, `SyncedTablePipelineProgress`, `NewPipelineSpec`, `DatabaseCredential`, `GenerateDatabaseCredentialRequest`, `RequestedClaims`, `RequestedResource`, `ProvisioningInfo`, `ProvisioningPhase`, `SyncedTableState`). Multiple enums share names (`ProvisioningPhase`, `SyncedTableState`).
- **Category:** 12 (duplicate concept across packages), 6 (misleading: user cannot infer which package owns what).
- **Suggested name:** Either (a) merge into one `lakebase` package with versioning, (b) declare one package the public surface and mark the other internal, or (c) cross-reference each shared type and make the docstrings explicitly say "see postgres/v1 for the V2 API".
- **Rationale:** Comment at `client.ts:634-638` says "Lakebase V2 plans" — i.e. `database` is V1 and `postgres` is V2 OLTP. The naming does not reflect that lineage; users picking a dependency have no breadcrumb.

### 3. `DatabaseInstance` — `src/v1/model.ts:195`
- **Why weird:** Type's own JSDoc says "A DatabaseInstance represents a logical Postgres instance". `DatabaseInstance` is the central noun of the package, but it is named after a generic abstraction (`Database` × `Instance`) rather than the domain (`PostgresInstance` / `LakebaseInstance`). The name does not convey what makes this distinct from any other Databricks "instance" (warehouse, cluster, online table, etc.).
- **Category:** 1 (generic), 15 (generic field name losing meaning).
- **Suggested name:** `LakebaseInstance` or `PostgresInstance`.
- **Rationale:** Reader sees `DatabaseInstance` and has no idea whether it's a SQL warehouse instance, a vector DB instance, or something else. Postgres SDK calls the same concept `ComputeInstance` (`postgres/v1/model.ts`), which is also generic — flagged separately under finding #2.

### 4. `DatabaseInstanceRole_Attributes.createdb` / `createrole` / `bypassrls` — `src/v1/model.ts:373-375`
- **Why weird:** Three lowercase, run-together field names. The doc comment (model.ts:365-370) explicitly says "The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical underscores between words." That justifies the wire format (Postgres keywords are case-insensitive identifiers) but the *TypeScript* field should use `camelCase` (`createDb`, `createRole`, `bypassRls`) — the wire stays `createdb`/`createrole`/`bypassrls`. `createrole` is particularly confusing because it could read as `create_role` (a verb-phrase) or `creator_ole`.
- **Category:** 3 (acronym/casing inconsistency), 14 (Postgres-keyword names not idiomatic in TS).
- **Suggested name:** `createDb`, `createRole`, `bypassRls` in the TS type; keep `createdb`/`createrole`/`bypassrls` on the wire (marshal/unmarshal handles the mapping).
- **Rationale:** Every other field in the package is `camelCase`. Three boolean fields breaking the convention to honour Postgres SQL keywords is a leak. Postgres SDK at `postgres/v1/model.ts` solves this differently — worth aligning.

### 5. `SYNCED_TABLED_OFFLINE` typo — `src/v1/model.ts:70`
- **Why weird:** Should be `SYNCED_TABLE_OFFLINE`. Spelled as `SYNCED_TABLED_OFFLINE` (`TABLED` past tense).
- **Category:** 6 (misleading: typo).
- **Suggested name:** Fix the wire-string to `SYNCED_TABLE_OFFLINE`.
- **Rationale:** This is a protocol-level typo that the SDK is propagating. If fixed upstream this becomes a breaking change unless aliased — flag now.

### 6. `effective*` field-prefix pattern duplicates every input field — `src/v1/model.ts` (~24 effective_ fields across DatabaseInstance, DatabaseInstanceRef, DatabaseInstanceRole, SyncedDatabaseTable)
- **Why weird:** `DatabaseInstance` has 15 input/output pairs: `capacity`/`effectiveCapacity`, `stopped`/`effectiveStopped`, `nodeCount`/`effectiveNodeCount`, `enableReadableSecondaries`/`effectiveEnableReadableSecondaries`, `retentionWindowInDays`/`effectiveRetentionWindowInDays`, `enablePgNativeLogin`/`effectiveEnablePgNativeLogin`, `usagePolicyId`/`effectiveUsagePolicyId`, `customTags`/`effectiveCustomTags`, plus `lsn`/`effectiveLsn` on `DatabaseInstanceRef`, `attributes`/`effectiveAttributes` on `DatabaseInstanceRole`, and `databaseInstanceName`/`effectiveDatabaseInstanceName` (+1 more) on `SyncedDatabaseTable`. JSDoc on every effective field is the same boilerplate sentence. Doubles the surface area of every type.
- **Category:** 7 (overly verbose), 12 (duplicate concept), 15 (generic prefix).
- **Suggested name:** Hoist effective values onto a sub-struct or use a discriminated `{input, effective}` shape; or drop the `effective` fields and explain in docs that the same field is read-mostly on responses.
- **Rationale:** This is a Lakebase API protocol pattern, not a naming bug per se, but the resulting TS surface is twice as wide as it needs to be. Worth pushing back upstream.

### 7. `FindDatabaseInstanceByUidRequest` / `findDatabaseInstanceByUid` — `src/v1/model.ts:446`, `client.ts:395`
- **Why weird:** Verb tense (`Find ... By ...`) is Java/Spring-style. Other clients use `getXById` / `getX` style. The doc on the field at line 447 also says "UID of the **cluster** to get" — referring to a *cluster*, not an instance, contradicting the type name. Same JSDoc bug appears on `GetDatabaseInstanceRequest.name` (model.ts:471): "Name of the **cluster** to get".
- **Category:** 14 (Java-style name), 6 (misleading doc — says cluster, type says instance), 17 (verb-tense inconsistency with `getDatabaseInstance`).
- **Suggested name:** `LookupDatabaseInstanceRequest` + `lookupDatabaseInstance`, or fold into `getDatabaseInstance` with a uid alternative. Fix the doc strings.
- **Rationale:** `findXByY` is uncommon in JS SDKs; `getX` is the idiomatic verb. The misleading "cluster" comments are an additional bug.

### 8. `CreateDatabaseInstanceWaiter` exports separately and the wait class is a noun-phrase — `src/v1/client.ts:924`, `index.ts:3`
- **Why weird:** Class name reads as "the *create instance waiter*" — i.e. a waiter for a create-instance operation. JS convention for poll-helpers tends to be `Poller`, `Waiter`, or a verb (e.g. `waitForX`). Calling it `CreateDatabaseInstanceWaiter` mixes a verb (`Create`) with a noun-suffix (`Waiter`) — reads as "a waiter that creates"; the meaning is "a waiter for a creation result".
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll helper naming).
- **Suggested name:** `DatabaseInstanceCreationWaiter`, or eliminate the class entirely and expose `createDatabaseInstance({wait: true})` / `createDatabaseInstanceAndWait()` returning the final instance.
- **Rationale:** The current name reads ambiguously; class names should be noun phrases describing *what they are*. The export at index.ts:3 means consumers see it directly.

### 9. `DatabaseInstanceRole_Attributes` vs `DatabaseInstanceRole.attributes` vs `DatabaseInstanceRole.effectiveAttributes` — `src/v1/model.ts:354,360,372`
- **Why weird:** `attributes` is a generic field name; `effectiveAttributes` is a second copy; the type is a nested message that holds 3 Postgres role boolean flags. "Attributes" carries no information about what the attributes describe (Postgres `CREATEDB` / `CREATEROLE` / `BYPASSRLS` permission flags).
- **Category:** 1 (vague — `attributes` is generic), 15 (generic field name).
- **Suggested name:** `pgRoleFlags` / `PgRoleFlags`, or `permissions` / `RolePermissions`.
- **Rationale:** Reader hits `role.attributes.createdb` and has to consult the type to find out it's a Postgres-flag bag. Postgres docs use the phrase "role attributes" so the alignment is intentional — but the SDK is for non-Postgres-experts too.

### 10. `databaseCatalogs` plural field on `ListDatabaseCatalogsResponse` vs `syncedTables` (not `syncedDatabaseTables`) plural field on `ListSyncedDatabaseTablesResponse` — `src/v1/model.ts:498,542`
- **Why weird:** The list-response field on catalogs is `databaseCatalogs: DatabaseCatalog[]` (matches type name), but on synced tables it's `syncedTables: SyncedDatabaseTable[]` (drops `Database`). On instance-roles it's `databaseInstanceRoles: DatabaseInstanceRole[]` (matches). On instances it's `databaseInstances: DatabaseInstance[]` (matches). The synced-tables one is the odd one out.
- **Category:** 17 (inconsistent), 9 (singular/plural mismatch with the type).
- **Suggested name:** `syncedDatabaseTables: SyncedDatabaseTable[]` (wire stays `synced_tables` if API requires it).
- **Rationale:** Internal consistency — every other list-response uses the type's plural; only this one shortens. Wire payload uses `synced_tables` so the divergence may be a generator decision; flag for cleanup.

## Medium severity

### 11. `DatabaseInstance.uid` and `DatabaseInstance.name` — both identifiers — `src/v1/model.ts:197,199`
- **Why weird:** Two fields look like identifiers. `uid` is "immutable UUID identifier"; `name` is "unique identifier". Caller reading the struct can't tell at a glance which one to pass to `getDatabaseInstance` (answer: `name`, per client.ts:484). Bare `uid` is also non-descriptive — Lakebase uses both PG-side OIDs and Databricks-side UUIDs.
- **Category:** 19 (underspecified id when multiple ids exist), 1 (vague `uid`).
- **Suggested name:** `instanceUid` / `instanceName`, or `id` / `name` (collapse `uid` to `id`).
- **Rationale:** Same field-disambiguation pattern as `PolicyInfo.id` in the abacpolicies audit. `uid` reads as a hash, not a Databricks UUID — and the JSDoc just says "UUID identifier".

### 12. `DatabaseInstance.creator` typed as `string` — `src/v1/model.ts:201`
- **Why weird:** Field doc says "The email of the creator of the instance". Field name says `creator`. So is the value an email, a username, or an account id? Postgres SDK uses `createdBy` for the same concept (postgres/v1/model.ts).
- **Category:** 1 (vague — `creator` could be a name, an id, or an email), 6 (misleading — doc says email, name says creator).
- **Suggested name:** `creatorEmail` (or `createdBy` if the value can be a service-principal id too).
- **Rationale:** The doc explicitly narrows the type; the field name should match.

### 13. `DatabaseInstance.capacity: string` typed as a free-form string but doc constrains it — `src/v1/model.ts:211`
- **Why weird:** Field doc says 'Valid values are "CU_1", "CU_2", "CU_4", "CU_8".' That is an enum encoded as a string. Should be an enum.
- **Category:** 16 (field type contradicts domain), 1 (vague — `capacity` for an opaque size class).
- **Suggested name:** Introduce `Capacity` enum (`Cu1 | Cu2 | Cu4 | Cu8`); rename field to `sku` if Lakebase docs prefer that term, since the doc itself says "The sku of the instance".
- **Rationale:** Generator artefact: protobuf string-typed scalars often hide enums. Worth pushing back.

### 14. `DatabaseInstance.pgVersion` casing — `src/v1/model.ts:209`
- **Why weird:** `pg` is two letters lowercase; the next word starts capitalised. Acronym `PG` is widely written uppercase.
- **Category:** 3 (acronym casing — `pg` should arguably be `Pg` per camelCase, `PG` per acronym preservation).
- **Suggested name:** `postgresVersion` (spell out), or `pgVersion` (current).
- **Rationale:** Current `pgVersion` is OK but `postgresVersion` would be clearer.

### 15. `DatabaseInstance.readWriteDns` / `readOnlyDns` — `src/v1/model.ts:203,250`
- **Why weird:** `Dns` is a single word; `DNS` is the acronym. Field doc says "The DNS endpoint to connect to the instance"; the value is a hostname, not a DNS server. Misleading abbreviation.
- **Category:** 3 (acronym casing), 6 (misleading — `dns` suggests a DNS server, not an endpoint).
- **Suggested name:** `readWriteEndpoint` / `readOnlyEndpoint`, or `readWriteHost` / `readOnlyHost`.
- **Rationale:** A "DNS endpoint" is a non-standard phrase; the field is just a hostname.

### 16. `DatabaseInstance.stopped` / `effectiveStopped` as a boolean toggle for state — `src/v1/model.ts:219,225`
- **Why weird:** Already-state-bearing struct has `state?: DatabaseInstance_State` (which includes `STOPPED`). Adding an orthogonal `stopped: boolean` is redundant and confusing — what happens if `state = AVAILABLE` and `stopped = true`?
- **Category:** 17 (two fields encoding the same concept), 12 (duplicate concept within the same struct).
- **Suggested name:** Either drop `stopped` and use `state === STOPPED`, or make it write-only and exclude from the read shape.
- **Rationale:** The doc says "An input only param" but the type makes it look like both. Worth a `@deprecated`-style marker.

### 17. `DatabaseInstance.nodeCount` is described as primary+secondaries — `src/v1/model.ts:230`
- **Why weird:** Field name says "node count"; doc says "1 primary and 0 or more secondaries". `nodeCount = 3` means 1 primary + 2 secondaries — but also could be read as "3 nodes, role unspecified". Postgres standby/replica terminology would be clearer.
- **Category:** 1 (vague), 6 (misleading without docs).
- **Suggested name:** `replicaCount`, or pair `primaryCount` + `secondaryCount`, or `totalNodeCount` (and document).
- **Rationale:** Confusing arithmetic — `1` means primary-only, `2` means 1 primary + 1 secondary, etc.

### 18. `DatabaseInstance.enableReadableSecondaries` boolean toggle naming — `src/v1/model.ts:239`
- **Why weird:** `enableXyz: boolean` is a request-shaped name on a response-shaped type. `enableReadableSecondaries: true` reads as imperative ("please enable"), but it's also returned from server. The companion `effectiveEnableReadableSecondaries` reads as "the effective please-enable-readable-secondaries". The doc on `effectiveEnableReadableSecondaries` even rewords it: "Whether secondaries serving read-only traffic are enabled" — i.e. the read shape should just be `readableSecondariesEnabled` or `hasReadableSecondaries`.
- **Category:** 6 (misleading verb form for a response), 17 (input/output asymmetry).
- **Suggested name:** Input: `enableReadableSecondaries: boolean`. Output: `readableSecondariesEnabled: boolean` (or just merge: response carries the same `enableReadableSecondaries` and don't bother with the `effective_` twin).
- **Rationale:** Generator artefact, but worth flagging.

### 19. `DatabaseInstance.parentInstanceRef` / `childInstanceRefs` — `src/v1/model.ts:270,275`
- **Why weird:** `Ref` is a cryptic abbreviation (cf. `typescript.mdc` "spell out short identifiers"). Same as `DatabaseInstanceRef` itself. Could be `Reference` or just `DatabaseInstancePointer`. The semantic ("a reference to an instance") doesn't need the abbreviation.
- **Category:** 5 (cryptic abbreviation), 8 (redundant `Ref` suffix — these are already references).
- **Suggested name:** `parentInstance: DatabaseInstanceReference` / `childInstances: DatabaseInstanceReference[]`.
- **Rationale:** Mild — `Ref` is widely understood — but spelling out matches the project rule.

### 20. `DatabaseInstanceRef.lsn` field — `src/v1/model.ts:323`
- **Why weird:** `lsn` is a Postgres-internal acronym (Log Sequence Number) shown without expansion. JSDoc says "User-specified WAL LSN" — still abbreviated.
- **Category:** 5 (cryptic abbreviation), 14 (Postgres-internal term in public TS API).
- **Suggested name:** `walLsn` (mild improvement), or `walLogSequenceNumber` (verbose but unambiguous).
- **Rationale:** Lakebase exposes this to schedule branch creation; consumers may not know `lsn` without consulting Postgres docs.

### 21. `DatabaseInstanceRef.branchTime` field — `src/v1/model.ts:342`
- **Why weird:** `branchTime` is a noun-phrase that reads as "the time of a branch" but is documented as "the point in time on the parent instance from which the instance was created" — i.e. the PITR cutover instant. `branchTime` and `lsn` are alternatives for the same operation (PITR cutover specifier).
- **Category:** 1 (vague), 6 (misleading — `branchTime` suggests an event time, actually a cutover specifier).
- **Suggested name:** `branchPointTime` / `branchAt` / `pitrTimestamp`.
- **Rationale:** Reads naturally as "when was this branch made" but actually means "what point in the source's history to branch from".

### 22. `DatabaseCatalog.uid` field with no doc — `src/v1/model.ts:185`
- **Why weird:** Bare `uid?: string` with no comment, alongside `name`, `databaseInstanceName`, `databaseName`. Four identifier-like fields and one (`uid`) is undocumented and unprefixed.
- **Category:** 19 (underspecified id), 1 (vague).
- **Suggested name:** `catalogUid` (and add a doc comment).
- **Rationale:** Reader cannot guess what scope the uid is for.

### 23. `DatabaseCatalog.createDatabaseIfNotExists` field — `src/v1/model.ts:186`
- **Why weird:** Boolean named as a SQL clause (`CREATE DATABASE IF NOT EXISTS`). Reads as a literal SQL DDL fragment in the type. Could be `ensureDatabase` / `autoCreateDatabase`.
- **Category:** 14 (SQL-style name), 7 (verbose).
- **Suggested name:** `ensureDatabaseExists` / `autoCreateDatabase`.
- **Rationale:** Internal consistency with TS naming conventions.

### 24. `DatabaseCatalog.databaseInstanceName` / `databaseName` — `src/v1/model.ts:182-184`
- **Why weird:** The `database` prefix on every field is redundant once you're already inside `DatabaseCatalog`. `databaseInstanceName` reads as "name of the database instance"; `databaseName` reads as "name of the database". Postgres SDK has `Catalog` (no `database` prefix) — cleaner.
- **Category:** 7 (verbose prefix), 12 (duplicate concept across packages).
- **Suggested name:** `instanceName`, `name` on the catalog directly; or hoist to a sub-struct `database: {instanceName, name}`.
- **Rationale:** The struct is already a `DatabaseCatalog`; re-prefixing every field is noise.

### 25. `DatabaseTable.name: string` "Full three-part (catalog, schema, table) name" — `src/v1/model.ts:380`
- **Why weird:** Bare `name` carries a complex format (`catalog.schema.table`). Postgres SDK calls the same concept `fullName` / `name` more explicitly. There is no validation in the type — the convention is doc-only.
- **Category:** 1 (vague), 6 (misleading — name looks like a single identifier, actually 3-part).
- **Suggested name:** `fullName` (matches Postgres SDK convention).
- **Rationale:** Same field name `name` appears on `DatabaseCatalog`, `DatabaseInstance`, `DatabaseInstanceRef`, `DatabaseInstanceRole`, `DatabaseTable`, `SyncedDatabaseTable` — each carries different semantics (DNS-safe vs UC-3-part vs role-name).

### 26. `SyncedDatabaseTable` vs `DatabaseTable` — overlapping concepts — `src/v1/model.ts:378,590`
- **Why weird:** Two near-identical struct types: `DatabaseTable` registers an existing PG table in UC; `SyncedDatabaseTable` is a UC-side spec for a Delta-to-PG sync. They share `name`, `databaseInstanceName`, `logicalDatabaseName`. Naming does not signal that `SyncedDatabaseTable` is more like a "managed table" while `DatabaseTable` is a "foreign-table registration".
- **Category:** 12 (duplicate concept), 1 (generic `Database`).
- **Suggested name:** `PgTableRegistration` and `DeltaSyncedPgTable` (or similar). At minimum, doc each type with a sentence about how they differ.
- **Rationale:** Reader has to read both JSDocs to understand the partitioning.

### 27. `SyncedTableSpec.timeseriesKey` casing — `src/v1/model.ts:731`
- **Why weird:** `timeseries` is one run-together word; could be `timeSeriesKey` (two words). Same field appears on the wire as `timeseries_key` — wire uses snake_case run-together, TS preserves it. Other compound words in this file (e.g. `pageToken`, `nextPageToken`) split words at capital boundaries.
- **Category:** 3 (acronym/casing inconsistency), 17 (inconsistent with neighbours).
- **Suggested name:** `timeSeriesKey`.
- **Rationale:** Trivia, but `time series` is two words in English.

### 28. `SyncedTableSpec.sourceTableFullName` vs `DatabaseTable.name` (also a full name) — `src/v1/model.ts:727,380`
- **Why weird:** Same domain concept (UC 3-part name) named two different ways in the same package: `sourceTableFullName` here, bare `name` on `DatabaseTable`/`SyncedDatabaseTable`/`DatabaseCatalog`.
- **Category:** 17 (inconsistent naming for the same concept).
- **Suggested name:** Standardise on `fullName` (or `tableFullName`) across the package.
- **Rationale:** Pair with #25.

### 29. `SyncedTableSpec.createDatabaseObjectsIfMissing` — `src/v1/model.ts:744`
- **Why weird:** Similar SQL-DDL leak as #23. Boolean named after a clause. Also doc at SyncedDatabaseTable.logicalDatabaseName references "the `create_database_objects_is_missing` field in `spec`" — that's a typo (`is_missing` vs `if_missing`) showing the field name fluctuates even in docs.
- **Category:** 14 (SQL-style name), 6 (typo in cross-reference).
- **Suggested name:** `ensureDatabaseAndSchema`.
- **Rationale:** Internal consistency.

### 30. `SyncedTableStatus.detailedState: SyncedTableState` — `src/v1/model.ts:759`
- **Why weird:** Field is `detailedState`; sibling field is `detailedStatus`. Both have `detailed` prefix; redundant against the wrapping type `SyncedTableStatus`. Easy to confuse `detailedState` (enum) with `detailedStatus` (oneof).
- **Category:** 17 (two `detailed*` neighbours), 7 (verbose).
- **Suggested name:** `state: SyncedTableState`, `status: SyncedTableStatusDetail` (or hoist the oneof).
- **Rationale:** Reader hits `tableStatus.detailedState` and `tableStatus.detailedStatus` and has to read both to decide which is which.

### 31. `SyncedTableStatus.detailedStatus` and its `*Status` sub-variants form a "status.status.status" chain — `src/v1/model.ts:763`
- **Why weird:** `detailedStatus` on a `SyncedTableStatus` type is doubly redundant. Holds one of four phase-shaped sub-statuses (`provisioningStatus`, `continuousUpdateStatus`, `triggeredUpdateStatus`, `failedStatus`). Each variant is named `*Status` again — `tableStatus.detailedStatus.continuousUpdateStatus.lastProcessedCommitVersion` is "status.status.status.version".
- **Category:** 7 (overly verbose chains).
- **Suggested name:** Rename `detailedStatus` to `phase`, and strip the redundant `*Status` suffix off each sub-variant (`provisioning`, `continuousUpdate`, `triggeredUpdate`, `failed`).
- **Rationale:** Reduces three `status` words to one without touching the wrapper itself.

### 32. `SyncedTableStatus.lastSync: SyncedTablePosition` — `src/v1/model.ts:795`
- **Why weird:** `SyncedTablePosition` is a curious type name — it represents a "position" but holds two timestamps and a source-sync-info union. "Position" reads as an offset/cursor; here it's a snapshot of sync progress.
- **Category:** 1 (vague — `Position` is generic), 6 (misleading — not a positional cursor).
- **Suggested name:** `LastSyncSummary` or `SyncCheckpoint`.
- **Rationale:** Reader sees `lastSync: SyncedTablePosition` and thinks "the position of the last sync" — but the type holds start/end timestamps, not an offset.

### 33. `SyncedTablePipelineProgress.latestVersionCurrentlyProcessing` — `src/v1/model.ts:678`
- **Why weird:** Run-on field name — "latest version currently processing" is 4 words. Doc clarifies "may not have completely processed this version yet". Could be `inProgressDeltaVersion` or `currentDeltaVersion`.
- **Category:** 7 (overly verbose), 1 (verbose adverb).
- **Suggested name:** `processingDeltaVersion`.
- **Rationale:** Verbose field names hurt readability.

### 34. `SyncedTablePipelineProgress.syncedRowCount` / `totalRowCount` / `syncProgressCompletion` / `estimatedCompletionTimeSeconds` — `src/v1/model.ts:680-686`
- **Why weird:** Mixed metric naming: `syncedRowCount` and `totalRowCount` use suffix `Count`; `syncProgressCompletion` uses suffix `Completion` (a number 0-1); `estimatedCompletionTimeSeconds` uses suffix `TimeSeconds` (unit-embedded). Three different conventions for "a number".
- **Category:** 17 (inconsistent suffixes), 15 (generic field names).
- **Suggested name:** `syncedRows`, `totalRows`, `progressFraction`, `etaSeconds`.
- **Rationale:** The number-suffix conventions don't align with each other; pick one.

### 35. `SyncedTablePipelineProgress.syncProgressCompletion: number` doc says "a number between 0 and 1" — `src/v1/model.ts:683-684`
- **Why weird:** Type is `number`; doc constrains to `[0, 1]`. Type system doesn't help. Field name `syncProgressCompletion` is also redundant — completion is what progress measures.
- **Category:** 16 (type contradicts doc constraint), 7 (verbose).
- **Suggested name:** `progressFraction` (or `progressRatio`), `number` in [0,1].
- **Rationale:** Same as #34 plus a separate concern about the value range.

### 36. `DeltaTableSyncInfo` is the only `*SyncInfo` type and the only `Delta*` type — `src/v1/model.ts:436`
- **Why weird:** Type holds two fields (`deltaCommitVersion`, `deltaCommitTimestamp`). The `Delta` prefix appears once at the type level and twice at the field level (`deltaCommitVersion`, `deltaCommitTimestamp`). Type-prefix duplication.
- **Category:** 20 (type-suffix tautology in field names), 7 (verbose).
- **Suggested name:** Type `DeltaSyncCheckpoint`, fields `commitVersion` / `commitTimestamp`.
- **Rationale:** Inside `DeltaTableSyncInfo` the `delta` prefix is implied.

### 37. `GenerateDatabaseCredentialRequest.claims` (plural `RequestedClaims[]`) but `RequestedClaims` is itself plural — `src/v1/model.ts:463,577`
- **Why weird:** `RequestedClaims` is already plural. Field `claims: RequestedClaims[]` is "an array of plural-claims-objects". JWT-claims convention is that "claims" is a noun-collective; one `RequestedClaims` object holds many claims and is itself one entity.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Singular type `RequestedClaim` (or `ClaimRequest`) used in plural field `claims: ClaimRequest[]`; or scalar wrapper `claims: RequestedClaimsBundle`.
- **Rationale:** Plural-of-plural confuses iteration code.

### 38. `GenerateDatabaseCredentialRequest.requestId` — `src/v1/model.ts:453`
- **Why weird:** Bare `requestId` with no doc. Other request types do not have `requestId`. Looks like an idempotency key but the type doesn't say.
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `idempotencyKey` (and add docs).
- **Rationale:** Without docs, callers can't tell whether to set it.

### 39. `GenerateDatabaseCredentialRequest.instanceNames` is "instance_names or claims" — `src/v1/model.ts:454-455`
- **Why weird:** Doc says "At least one of instance_names or claims must be specified" — that's a one-of-required constraint expressed only in prose. Type system allows both empty/both set.
- **Category:** 16 (type contradicts domain constraint), 1 (loose contract).
- **Suggested name:** Discriminated union of `{instanceNames: string[]}` vs `{claims: ClaimRequest[]}`.
- **Rationale:** Generator artefact; flag for upstream tightening.

### 40. `DeleteDatabaseInstanceRequest.purge` field is documented as deprecated — `src/v1/model.ts:411-415`
- **Why weird:** "Deprecated. Omitting the field or setting it to true will result in the field being hard deleted. Setting a value of false will throw a bad request." Field is exposed in the public TS type but has no `@deprecated` JSDoc tag.
- **Category:** 6 (misleading: deprecated field undocumented as deprecated).
- **Suggested name:** Add `@deprecated` tag; consider removing in next major.
- **Rationale:** TS tooling honours `@deprecated`; the current setup just has prose.

### 41. `NewPipelineSpec` type and `newPipelineSpec` field — `src/v1/model.ts:551,753`
- **Why weird:** Proto-architectural leak on two axes. (1) `New` is a mid-position relativistic adjective (`Old`/`New`/`Legacy`/`Modern`) — type names should describe what a value *is*, not its temporal status relative to a peer (here, paired with `existingPipelineId`). The "newness" is only meaningful at the moment of creation; the same struct shape would describe an old pipeline equally well. (2) `Spec` is a generic suffix that appears twice in the package (also `SyncedTableSpec`) — see also finding #42 on repeated `Spec`/`Info` suffixes. The `New` prefix mirrors a proto oneof discriminator (existing-vs-new), not a TS-native concept.
- **Category:** proto-architectural leak (forbidden mid adjective `New`), 15 (generic suffix `Spec`).
- **Suggested name:** Type `PipelineCreationOptions` / `InlinePipelineConfig`; field `inlinePipeline` (paired with `existingPipelineId`). Drop the `New` adjective and the `Spec` suffix.
- **Rationale:** The presence of `New` in a type name implies a corresponding `Old`/`Existing` type — which doesn't exist as a struct, only as a sibling string field. The asymmetry betrays the proto oneof.

### 42. Repeated generic suffixes `*Spec` and `*Info` across the package — `src/v1/model.ts:436,551,575,723`
- **Why weird:** Two `*Spec` types (`NewPipelineSpec`, `SyncedTableSpec`) and two `*Info` types (`DeltaTableSyncInfo`, `ProvisioningInfo`) coexist with no shared interface or contract. `Spec` and `Info` are generic stand-in nouns that proto / gRPC schemas overuse; they convey "this is a bag of fields" rather than the domain concept. `ProvisioningInfo` is empty (see #43); `DeltaTableSyncInfo` is a sync checkpoint (see #36); `SyncedTableSpec` is a sync pipeline configuration; `NewPipelineSpec` is creation-time pipeline options (see #41). Each of the four would read more clearly with a domain-specific suffix.
- **Category:** proto-architectural leak (repeated `Spec`/`Info` suffixes), 15 (generic nouns), 1 (vague).
- **Suggested name:** `SyncedTableSpec` → `SyncedTableConfig` (still generic) or better `SyncPipelineDefinition`; `NewPipelineSpec` → `InlinePipelineConfig` (see #41); `DeltaTableSyncInfo` → `DeltaSyncCheckpoint` (per #36); `ProvisioningInfo` → drop (per #43). Goal: no two types in the package share a generic suffix.
- **Rationale:** When `Spec` and `Info` appear repeatedly, the reader has to look up each one to know what it actually holds. Suffix-disambiguation is a proto smell that the TS surface inherits.

### 43. `ProvisioningInfo` empty interface copied verbatim from another proto file — `src/v1/model.ts:570-575`
- **Why weird:** Type declaration is literally `export interface ProvisioningInfo {}` with a comment "Copied over from managed-catalog/api/messages/common.proto to decouple SDK packages. xref go/unified-api-packages-dd". An empty interface — the type itself carries zero domain meaning. Only its nested `ProvisioningInfo_State` enum is used (referenced by `SyncedDatabaseTable.unityCatalogProvisioningState`); the empty parent is a vestigial proto namespace. The exported type name and its nested enum bleed Managed Catalog internals into the Lakebase SDK.
- **Category:** proto-architectural leak (proto message preserved as empty TS interface for namespacing), 6 (misleading — exists but has no fields), 12 (cross-package proto leak).
- **Suggested name:** Drop the empty `ProvisioningInfo` interface; rename `ProvisioningInfo_State` to `ProvisioningState` (or `UnityCatalogProvisioningState`, matching its sole use site). The empty interface is a generator artefact that should not surface.
- **Rationale:** An empty exported interface is dead surface area. The xref comment (`go/unified-api-packages-dd`) tells the reader this is a cross-package proto coordination workaround — that workaround belongs in the generator, not in the public TS types.

## Low severity

### 44. `ListDatabaseInstanceRolesRequest.pageToken` doc copy-pasta — `src/v1/model.ts:505`
- **Why weird:** Doc says "Pagination token to go to the next page of Database Instances" — but this is roles, not instances. Doc-copy bug.
- **Category:** 6 (misleading doc).
- **Suggested name:** Fix the doc to say "roles".
- **Rationale:** Naming-adjacent bug worth flagging.

### 45. `ListDatabaseCatalogsRequest.pageToken` doc says "synced database tables" — `src/v1/model.ts:491`
- **Why weird:** Same bug: catalogs request says "synced database tables" in doc.
- **Category:** 6 (misleading doc).
- **Suggested name:** Fix to "catalogs".
- **Rationale:** Same as #44.

### 46. `ListDatabaseInstanceRolesResponse.nextPageToken` doc says "next page of instances" — `src/v1/model.ts:514`
- **Why weird:** Doc says "next page of instances" for the roles response.
- **Category:** 6 (misleading doc).
- **Suggested name:** Fix to "roles".
- **Rationale:** Same as #44.

### 47. `CreateDatabaseInstanceRoleRequest.databaseInstanceName` (field) vs `instanceName` (also field) on same request — `src/v1/model.ts:158-160`
- **Why weird:** Same struct exposes `instanceName` and `databaseInstanceName` — both strings, both presumably name an instance. Doc-less. Wire format makes `instanceName` the path parameter and `databaseInstanceName` a query parameter (visible in client.ts:181-184).
- **Category:** 12 (duplicate concept), 17 (inconsistent naming for the same thing), 19 (underspecified ids).
- **Suggested name:** One field. If protocol genuinely needs both, name them `instanceNamePath` / `instanceNameQuery` and add docs.
- **Rationale:** Caller has to know the wire-encoding accident to decide which to set.

### 48. `DeleteDatabaseInstanceRoleRequest.reassignOwnedTo` field — `src/v1/model.ts:421`
- **Why weird:** Postgres-isms (`REASSIGN OWNED BY ... TO ...`) collapsed into a single field. Field name reads as a verb phrase ("reassign owned [things] to").
- **Category:** 14 (SQL-style name).
- **Suggested name:** `reassignOwnedObjectsTo` or `newOwner`.
- **Rationale:** Mild — Postgres admins will get it.

### 49. `DeleteDatabaseInstanceRoleRequest.allowMissing` doc — `src/v1/model.ts:422-423`
- **Why weird:** Doc says "This is the AIP standard name for the equivalent of Postgres' `IF EXISTS` option". Two abstractions documented in the comment; the field name reads neither.
- **Category:** 14 (Google-AIP naming convention leak).
- **Suggested name:** `ignoreIfMissing` (mild). The current name comes from `google.aip.dev/135`, which is fine to keep — but acknowledge the convention.
- **Rationale:** Internal-jargon leak; flag for awareness.

### 50. `DeleteSyncedDatabaseTableRequest.purgeData` — `src/v1/model.ts:433`
- **Why weird:** Boolean named after a side effect (`purge_data`). Doc says "the actual PostgreSQL table will be dropped from the database". Combination of `delete` + `purge` is also confusing — what does the no-purge case do? (Drop UC registration only.)
- **Category:** 1 (vague), 6 (misleading).
- **Suggested name:** `dropUnderlyingTable` / `cascade`.
- **Rationale:** Minor — affects discoverability.

### 51. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:78`
- **Why weird:** Same as abacpolicies finding #32. `Segment` is generic; comment makes the meaning clear but the name doesn't.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 52. `StillRunningError` private error class — `src/v1/client.ts:83`
- **Why weird:** Class extends `Error` and is used only as a sentinel for retry detection (`err instanceof StillRunningError`). The name suggests it represents an operation state, not an error. Sentinel-as-error is OK in Go (`errors.Is`) but in JS the convention is a state enum or a custom Result.
- **Category:** 14 (Go-style sentinel error), 6 (misleading — it's a control-flow signal, not an error).
- **Suggested name:** `PollAgainSignal` / `OperationStillRunning` (still a class, but reads as state).
- **Rationale:** Throwing for control flow is fine; the *name* shouldn't pretend it's a real error.

## Observations

### 53. `client.ts` has a 5-line block-comment at line 633-638 explaining that the role APIs will never reach Public Preview
The comment ("START OF PG ROLE APIs Section ... These APIs are marked a PUBLIC with stage < PUBLIC_PREVIEW. With more recent Lakebase V2 plans, we don't plan to ever advance these to PUBLIC_PREVIEW.") leaks internal lifecycle. It belongs in JSDoc on each role method as `@experimental` / `@internal`, not as a block-comment in the middle of the client.
- **Category:** 6 (misleading: client exposes APIs that won't stabilise).
- **Action:** Mark `createDatabaseInstanceRole`, `deleteDatabaseInstanceRole`, `getDatabaseInstanceRole`, `listDatabaseInstanceRoles`, `updateDatabaseInstanceRole` as `@experimental`.

### 54. `findDatabaseInstanceByUid` is the only `findBy*` method
Every other lookup is `getX(req)`. This method exists because the API has a distinct route (`/instances:findByUid`) for UID-lookup vs `/instances/{name}`. The TS surface reflects the URL shape rather than the user's mental model.
- **Category:** 17 (inconsistency with peer methods).

### 55. Action-verb conventions in `Client` are consistent
`create*` / `delete*` / `get*` / `list*` / `update*` / `findBy*` — verb prefixes are consistent. Lookup is `get` (good). No `fetch`/`retrieve`/`read` mixing.

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

## Fixed
- #8 `UpgradeInstanceToAutoscalingRequest` / `upgradeInstanceToAutoscaling` (originally cited at `src/v1/model.ts:976`, `client.ts:998`): Fixed in regeneration on 2026-05-20 — the request type and client method were removed from the generated surface.
- #25 `DatabaseCatalog.databaseProjectId` / `databaseBranchId` / `databaseName` (originally cited at `src/v1/model.ts:219-223`): Fixed in regeneration on 2026-05-20 — `databaseProjectId` and `databaseBranchId` were removed; the remaining `databaseName` / `databaseInstanceName` prefix concern is captured in active finding #24.
- #27 `DatabaseTable.tableServingUrl` (originally cited at `src/v1/model.ts:437`): Fixed in regeneration on 2026-05-20 — the field was removed from `DatabaseTable`.
- #32 `SyncedTableSpec.acceleratedSync` (originally cited at `src/v1/model.ts:830`): Fixed in regeneration on 2026-05-20 — the field was removed from `SyncedTableSpec`.
- #51 `FailoverDatabaseInstanceRequest.failoverTargetDatabaseInstanceName` (originally cited at `src/v1/model.ts:490`): Fixed in regeneration on 2026-05-20 — the entire `FailoverDatabaseInstanceRequest` type and its client method were removed from the generated surface.
