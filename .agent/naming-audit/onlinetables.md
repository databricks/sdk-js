# Naming Audit: `onlinetables` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/onlinetables/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`
**Package import path:** `@databricks/sdk-onlinetables/v1`
**Cross-package references:**

- `featurestore/v1` — also defines `DeleteOnlineTableRequest`, also references
  `OnlineTable` semantics via `PublishSpec.onlineTableName` /
  `PublishTableResponse`.
- `database/v1` — defines `SyncedTableState`, `SyncedTablePipelineProgress`,
  `SyncedTableSchedulingPolicy`, `ProvisioningInfo_State`, `ProvisioningInfo`,
  `SyncedTableContinuousUpdateStatus`, `SyncedTableFailedStatus`,
  `SyncedTableTriggeredUpdateStatus`, `SyncedTableProvisioningStatus`,
  `SyncedTableStatus` — all of which are *renames of identical concepts* with
  a `SyncedTable` prefix.
- `postgres/v1` — same shape as `database`, also forks the type set.
- `catalogs/v1`, `connections/v1` — re-export `ProvisioningInfo_State` and
  `ProvisioningInfo` from their own modules.

**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Inventory

### Enums (model.ts)

1. `OnlineTableState` (model.ts:7) — 12 values: `ONLINE_TABLE_STATE_UNSPECIFIED`,
   `PROVISIONING`, `PROVISIONING_PIPELINE_RESOURCES`,
   `PROVISIONING_INITIAL_SNAPSHOT`, `ONLINE`, `ONLINE_CONTINUOUS_UPDATE`,
   `ONLINE_TRIGGERED_UPDATE`, `ONLINE_NO_PENDING_UPDATE`, `OFFLINE`,
   `OFFLINE_FAILED`, `ONLINE_PIPELINE_FAILED`,
   `ONLINE_UPDATING_PIPELINE_RESOURCES`.
2. `ProvisioningInfo_State` (model.ts:57) — 7 values: `STATE_UNSPECIFIED`,
   `PROVISIONING`, `ACTIVE`, `FAILED`, `DELETING`, `UPDATING`, `DEGRADED`.

### Interfaces / Types (model.ts)

1. `ContinuousUpdateStatus` (model.ts:71) — fields:
   `lastProcessedCommitVersion`, `timestamp`, `initialPipelineSyncProgress`.
2. `CreateOnlineTableRequest` (model.ts:87) — fields: `table`.
3. `DeleteOnlineTableRequest` (model.ts:93) — fields: `name`.
4. `FailedStatus` (model.ts:102) — fields: `lastProcessedCommitVersion`,
   `timestamp`.
5. `GetOnlineTableRequest` (model.ts:117) — fields: `name`.
6. `OnlineTable` (model.ts:123) — fields: `name`, `spec`, `status`,
   `tableServingUrl`, `unityCatalogProvisioningState`.
7. `OnlineTableSpec` (model.ts:141) — fields: `schedulingPolicy` (discriminated
   union with `runContinuously` / `runTriggered`), `sourceTableFullName`,
   `primaryKeyColumns`, `timeseriesKey`, `performFullCopy`, `pipelineId`.
8. `OnlineTableSpec_ContinuousSchedulingPolicy` (model.ts:175) — empty
   interface.
9. `OnlineTableSpec_TriggeredSchedulingPolicy` (model.ts:178) — empty
   interface.
10. `OnlineTableStatus` (model.ts:181) — fields: `detailedState`, `message`,
    `detailedStatus` (discriminated union).
11. `PipelineProgress` (model.ts:202) — fields:
    `latestVersionCurrentlyProcessing`, `syncedRowCount`, `totalRowCount`,
    `syncProgressCompletion`, `estimatedCompletionTimeSeconds`.
12. `ProvisioningInfo` (model.ts:220) — empty interface.
13. `ProvisioningStatus` (model.ts:226) — fields:
    `initialPipelineSyncProgress`.
14. `TriggeredUpdateStatus` (model.ts:238) — fields:
    `lastProcessedCommitVersion`, `timestamp`, `triggeredUpdateProgress`.

### Client (client.ts)

- Class `Client` (client.ts:41).
- Methods: `createOnlineTable`, `createOnlineTableWaiter`, `deleteOnlineTable`,
  `getOnlineTable`.
- Class `CreateOnlineTableWaiter` (client.ts:152) — methods: `wait`, `done`.
- Internal `class StillRunningError extends Error` (client.ts:39).
- Private fields: `host`, `httpClient`, `logger`, `userAgent`.
- Module constant: `PACKAGE_SEGMENT` (client.ts:34).

### Utils (utils.ts)

- Interface: `HttpCallOptions`.
- Functions: `executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Index (index.ts)

- Re-exports `Client`, `CreateOnlineTableWaiter`, enum values, and 14
  interfaces.

---

## Summary (counts)

| Severity              | Count |
| --------------------- | ----- |
| High                  | 4     |
| Medium                | 10    |
| Low / SDK-wide note   | 9     |
| Pass / acceptable     | 9     |
| Fixed (post-regen)    | 0     |
| **Total findings**    | **31** |

(Several findings touch multiple audit categories; counts above are unique
findings.)

Rescanned against the 2026-05-26 regeneration (#156): no findings were
addressed by the regeneration — every previously open finding is still
present in the current source.

---
