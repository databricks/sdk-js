# Naming Audit: database

**Path:** `packages/database/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 7 |
| Observation | 2 |

## High severity

### 1. `FindDatabaseInstanceByUidRequest` / `findDatabaseInstanceByUid` — `src/v1/model.ts:446`, `client.ts:427`
- **Why weird:** Verb tense (`Find ... By ...`) is Java/Spring-style. Other clients use `getXById` / `getX` style. The doc on the field at line 447 also says "UID of the **cluster** to get" — referring to a *cluster*, not an instance, contradicting the type name. Same JSDoc bug appears on `GetDatabaseInstanceRequest.name` (model.ts:471): "Name of the **cluster** to get".
- **Category:** 14 (Java-style name), 6 (misleading doc — says cluster, type says instance), 17 (verb-tense inconsistency with `getDatabaseInstance`).
- **Suggested name:** `LookupDatabaseInstanceRequest` + `lookupDatabaseInstance`, or fold into `getDatabaseInstance` with a uid alternative. Fix the doc strings.
- **Rationale:** `findXByY` is uncommon in JS SDKs; `getX` is the idiomatic verb. The misleading "cluster" comments are an additional bug.

### 2. `CreateDatabaseInstanceWaiter` exports separately and the wait class is a noun-phrase — `src/v1/client.ts:998`, `index.ts:3`
- **Why weird:** Class name reads as "the *create instance waiter*" — i.e. a waiter for a create-instance operation. JS convention for poll-helpers tends to be `Poller`, `Waiter`, or a verb (e.g. `waitForX`). Calling it `CreateDatabaseInstanceWaiter` mixes a verb (`Create`) with a noun-suffix (`Waiter`) — reads as "a waiter that creates"; the meaning is "a waiter for a creation result".
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll helper naming).
- **Suggested name:** `DatabaseInstanceCreationWaiter`, or eliminate the class entirely and expose `createDatabaseInstance({wait: true})` / `createDatabaseInstanceAndWait()` returning the final instance.
- **Rationale:** The current name reads ambiguously; class names should be noun phrases describing *what they are*. The export at index.ts:3 means consumers see it directly.

## Medium severity

### 3. `SyncedTableStatus.lastSync: SyncedTablePosition` — `src/v1/model.ts:795`
- **Why weird:** `SyncedTablePosition` is a curious type name — it represents a "position" but holds two timestamps and a source-sync-info union. "Position" reads as an offset/cursor; here it's a snapshot of sync progress.
- **Category:** 1 (vague — `Position` is generic), 6 (misleading — not a positional cursor).
- **Suggested name:** `LastSyncSummary` or `SyncCheckpoint`.
- **Rationale:** Reader sees `lastSync: SyncedTablePosition` and thinks "the position of the last sync" — but the type holds start/end timestamps, not an offset.

### 4. `DeltaTableSyncInfo` is the only `*SyncInfo` type and the only `Delta*` type — `src/v1/model.ts:436`
- **Why weird:** Type holds two fields and is the lone `*SyncInfo` / `Delta*` type in the package. `SyncInfo` is a generic stand-in suffix; the type is really a sync checkpoint.
- **Category:** 15 (generic `*Info` suffix).
- **Suggested name:** Type `DeltaSyncCheckpoint`.
- **Rationale:** `DeltaTableSyncInfo` reads as a generic bag of fields; a domain-specific name conveys that it captures a sync checkpoint.

### 5. `GenerateDatabaseCredentialRequest.claims` (plural `RequestedClaims[]`) but `RequestedClaims` is itself plural — `src/v1/model.ts:463,577`
- **Why weird:** `RequestedClaims` is already plural. Field `claims: RequestedClaims[]` is "an array of plural-claims-objects". JWT-claims convention is that "claims" is a noun-collective; one `RequestedClaims` object holds many claims and is itself one entity.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Singular type `RequestedClaim` (or `ClaimRequest`) used in plural field `claims: ClaimRequest[]`; or scalar wrapper `claims: RequestedClaimsBundle`.
- **Rationale:** Plural-of-plural confuses iteration code.

### 6. `GenerateDatabaseCredentialRequest.instanceNames` is "instance_names or claims" — `src/v1/model.ts:454-455`
- **Why weird:** Doc says "At least one of instance_names or claims must be specified" — that's a one-of-required constraint expressed only in prose. Type system allows both empty/both set.
- **Category:** 16 (type contradicts domain constraint), 1 (loose contract).
- **Suggested name:** Discriminated union of `{instanceNames: string[]}` vs `{claims: ClaimRequest[]}`.
- **Rationale:** Generator artefact; flag for upstream tightening.

### 7. `NewPipelineSpec` type — `src/v1/model.ts:551`
- **Why weird:** Proto-architectural leak on two axes. (1) `New` is a mid-position relativistic adjective (`Old`/`New`/`Legacy`/`Modern`) — type names should describe what a value *is*, not its temporal status relative to a peer (the type is paired with a sibling `existingPipelineId` field). The "newness" is only meaningful at the moment of creation; the same struct shape would describe an old pipeline equally well. (2) `Spec` is a generic suffix that appears twice in the package (also `SyncedTableSpec`) — see also finding #8 on repeated `Spec`/`Info` suffixes. The `New` prefix mirrors a proto oneof discriminator (existing-vs-new), not a TS-native concept.
- **Category:** proto-architectural leak (forbidden mid adjective `New`), 15 (generic suffix `Spec`).
- **Suggested name:** Type `PipelineCreationOptions` / `InlinePipelineConfig`. Drop the `New` adjective and the `Spec` suffix.
- **Rationale:** The presence of `New` in a type name implies a corresponding `Old`/`Existing` type — which doesn't exist as a struct, only as a sibling string field. The asymmetry betrays the proto oneof.

### 8. Repeated generic suffix `*Spec` across the package — `src/v1/model.ts:436,551,723`
- **Why weird:** Two `*Spec` types (`NewPipelineSpec`, `SyncedTableSpec`) coexist with the `*Info` type `DeltaTableSyncInfo` and no shared interface or contract. `Spec` and `Info` are generic stand-in nouns that proto / gRPC schemas overuse; they convey "this is a bag of fields" rather than the domain concept. `DeltaTableSyncInfo` is a sync checkpoint (see #4); `SyncedTableSpec` is a sync pipeline configuration; `NewPipelineSpec` is creation-time pipeline options (see #7). Each of these would read more clearly with a domain-specific suffix.
- **Category:** proto-architectural leak (repeated `Spec`/`Info` suffixes), 15 (generic nouns), 1 (vague).
- **Suggested name:** `SyncedTableSpec` → `SyncedTableConfig` (still generic) or better `SyncPipelineDefinition`; `NewPipelineSpec` → `InlinePipelineConfig` (see #7); `DeltaTableSyncInfo` → `DeltaSyncCheckpoint` (per #4). Goal: no two types in the package share a generic suffix.
- **Rationale:** When `Spec` and `Info` appear repeatedly, the reader has to look up each one to know what it actually holds. Suffix-disambiguation is a proto smell that the TS surface inherits.

### 9. `ProvisioningInfo_State` proto-underscore type name — `src/v1/model.ts:570-575`
- **Why weird:** The enum `ProvisioningInfo_State` carries a proto-style underscore-nested name (`Parent_Nested`). It is referenced by `SyncedDatabaseTable.unityCatalogProvisioningState`. The underscore-joined name bleeds the proto nesting structure into the public TS surface.
- **Category:** proto-architectural leak (proto-underscore nested type name `Foo_Bar`), 12 (cross-package proto leak).
- **Suggested name:** Rename `ProvisioningInfo_State` to `ProvisioningState` (or `UnityCatalogProvisioningState`, matching its sole use site).
- **Rationale:** A `Parent_Nested` underscore name is a generator artefact that should not surface in idiomatic TS; the flattened `ProvisioningState` reads as a native enum.

## Observations

### 10. `findDatabaseInstanceByUid` is the only `findBy*` method
Every other lookup is `getX(req)`. This method exists because the API has a distinct route (`/instances:findByUid`) for UID-lookup vs `/instances/{name}`. The TS surface reflects the URL shape rather than the user's mental model.
- **Category:** 17 (inconsistency with peer methods).

### 11. Action-verb conventions in `Client` are consistent
`create*` / `delete*` / `get*` / `list*` / `findBy*` — verb prefixes are consistent. Lookup is `get` (good). No `fetch`/`retrieve`/`read` mixing.
