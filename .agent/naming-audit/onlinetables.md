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
| High                  | 5     |
| Medium                | 13    |
| Low / SDK-wide note   | 9     |
| Pass / acceptable     | 9     |
| **Total findings**    | **36** |

(Several findings touch multiple audit categories; counts above are unique
findings.)

---

## Findings

### 1. `OnlineTableState.ONLINE_TABLE_STATE_UNSPECIFIED` value prefix repeats the enum name — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbol:** `OnlineTableState.ONLINE_TABLE_STATE_UNSPECIFIED` (model.ts:9).

**Issue:** Members are already namespaced under `OnlineTableState`. The
`ONLINE_TABLE_STATE_` segment duplicates the enum name. Reads as:
```ts
if (table.status?.detailedState === OnlineTableState.ONLINE_TABLE_STATE_UNSPECIFIED) { ... }
//                                                ^^^^^^^^^^^^^^^^^^^^
//                                                duplicates the enum name
```

Note: the values double as on-the-wire JSON strings (`z.enum(OnlineTableState)`
at model.ts:341 parses raw API strings directly into these identifiers), so
renaming the wire string requires server acceptance and is a behavioural
change. The TS-side identifier can be split from the wire string (see
finding 3) for a safe local fix.

**Suggested wire-level (coordinated with API):** plain `UNSPECIFIED`.
**Suggested TS-level only (safe — see finding 3):** `Unspecified =
'ONLINE_TABLE_STATE_UNSPECIFIED'`.

---

### 2. `ProvisioningInfo_State.STATE_UNSPECIFIED` value prefix repeats half the enum name — category 2 (Redundant enum prefixes)

**Symbol:** `ProvisioningInfo_State.STATE_UNSPECIFIED` (model.ts:58).

**Issue:** Same family as finding 1. The `STATE_` prefix repeats the trailing
half of the enum name.

**Suggested:** TS-side identifier `Unspecified`. Wire string remains
`STATE_UNSPECIFIED` if upstream still emits it.

---

### 3. SCREAMING_SNAKE_CASE enum members (value-level) — category 4

**Symbols:** Every value in both enums (model.ts:9–53 and 58–64).

**Issue:** The project's `.agent/skills/google-ts-styleguide` (and Google TS
Style Guide § 5.3) mandates `UpperCamelCase` for enum *members*, not
`SCREAMING_SNAKE_CASE`. Every enum value here is SCREAMING-cased.

Enum string *values* double as the on-the-wire representation here (the Zod
schemas parse raw API strings into these identifiers — `z.enum(OnlineTableState)`
at model.ts:341 and `z.enum(ProvisioningInfo_State)` at model.ts:290). The
TS-side identifier can be split from the wire literal — e.g.
`ProvisioningPipelineResources = 'PROVISIONING_PIPELINE_RESOURCES'` — which
is the canonical TS fix while preserving wire compatibility.

**Suggested (TS side only, no wire change):**

```ts
export enum OnlineTableState {
  Unspecified = 'ONLINE_TABLE_STATE_UNSPECIFIED',
  Provisioning = 'PROVISIONING',
  ProvisioningPipelineResources = 'PROVISIONING_PIPELINE_RESOURCES',
  ProvisioningInitialSnapshot = 'PROVISIONING_INITIAL_SNAPSHOT',
  Online = 'ONLINE',
  OnlineContinuousUpdate = 'ONLINE_CONTINUOUS_UPDATE',
  OnlineTriggeredUpdate = 'ONLINE_TRIGGERED_UPDATE',
  OnlineNoPendingUpdate = 'ONLINE_NO_PENDING_UPDATE',
  Offline = 'OFFLINE',
  OfflineFailed = 'OFFLINE_FAILED',
  OnlinePipelineFailed = 'ONLINE_PIPELINE_FAILED',
  OnlineUpdatingPipelineResources = 'ONLINE_UPDATING_PIPELINE_RESOURCES',
}

export enum ProvisioningInfo_State {
  Unspecified = 'STATE_UNSPECIFIED',
  Provisioning = 'PROVISIONING',
  Active = 'ACTIVE',
  Failed = 'FAILED',
  Deleting = 'DELETING',
  Updating = 'UPDATING',
  Degraded = 'DEGRADED',
}
```

**Flag as SDK-wide cleanup.** Same observation as `featurestore.md` finding 4
and `database.md` finding 6.

---

### 4. `OnlineTableState.ONLINE_UPDATING_PIPELINE_RESOURCES` value too long — category 18 (Long enum values)

**Symbol:** `OnlineTableState.ONLINE_UPDATING_PIPELINE_RESOURCES` (model.ts:53)
and `PROVISIONING_PIPELINE_RESOURCES` (model.ts:16).

**Issue:** 35–37 character enum members. Even allowing for the wire-level
prefix, the values pack three concepts (online/provisioning + transition +
"pipeline-resources"). The JSDoc explains them; the identifier itself is
hard to read.

**Suggested:** at the TS level, `OnlineUpdatingPipelineResources` shortens to
30 chars while preserving meaning. The wire form is fixed by upstream. **Pass
in isolation if finding 3 is applied; flag as a long-name observation.**

---

### 5. `OnlineTableState` modelled as one enum, two semantic groups — category 6 (Misleading names) and category 12 (Duplicate concepts)

**Symbol:** `OnlineTableState` (model.ts:7), 12 values.

**Issue:** The 12 values mix *lifecycle* states (`PROVISIONING`,
`PROVISIONING_PIPELINE_RESOURCES`, `PROVISIONING_INITIAL_SNAPSHOT`, `OFFLINE`,
`OFFLINE_FAILED`) with *ongoing-state* substates that are specific to the
"online" lifecycle (`ONLINE_CONTINUOUS_UPDATE`, `ONLINE_TRIGGERED_UPDATE`,
`ONLINE_NO_PENDING_UPDATE`, `ONLINE_PIPELINE_FAILED`,
`ONLINE_UPDATING_PIPELINE_RESOURCES`). The `OnlineTableStatus` interface
already has a `detailedStatus` discriminated union (model.ts:187) that
overlaps with these substates. So the same information is modelled twice:
once flat in the enum, once in the structured `detailedStatus`.

This is a wire-level concern, but in TS it reads as a single enum doing two
jobs — top-level lifecycle and one-level-down detail. Compare to
`database.SyncedTableState` which has the same 12 values prefixed
`SYNCED_TABLE_…` (with a famous typo `SYNCED_TABLED_OFFLINE`). The duplication
*across packages* is also a flag — see finding 6.

**Suggested:** push back upstream — split into `OnlineTableLifecycle` (a few
top-level states) and use `detailedStatus.$case` as the substate identifier.
**Pass at the TS level**, flag at the protocol level.

---

### 6. Cross-package collision: `OnlineTableState` ↔ `database.SyncedTableState` (wire-level typo) — category 12 (Duplicate concepts) and category 17 (Inconsistent action verbs)

**Symbol:** `OnlineTableState` (here, model.ts:7) and `SyncedTableState`
(`database/v1/model.ts:55`, `postgres/v1/model.ts`).

**Issue:** Two SDK packages model essentially the same lifecycle concept —
the state of a UC-managed Delta-to-managed-store sync table — with two
*different enum names* and one is misspelled at the **wire-string** level
(`SYNCED_TABLED_OFFLINE`). Looking at the values:

- `onlinetables.OnlineTableState`: 12 values, prefix `ONLINE_TABLE_STATE_…`
  on `UNSPECIFIED` only.
- `database.SyncedTableState`: 12 values, prefix `SYNCED_TABLE_…` on **all
  values** plus the famous wire-string typo `SYNCED_TABLED_OFFLINE`.

These enums describe the *same machine*. A consumer who uses both packages
will write a lookup table or branch on `$case` differently in each package.
The `SYNCED_TABLED_OFFLINE` typo is on the wire and locks consumers into
the misspelling.

**Suggested at the SDK level:** harmonise the type names (drop one in favour
of the other, with an alias for backward compatibility). The wire-level
typo fix is a protocol-team decision and a behavioural change. **Strongly
flag for SDK-wide alignment**; do not fix unilaterally in this package.

---

### 7. Cross-package collision: `PipelineProgress` ↔ `database.SyncedTablePipelineProgress` — category 12 (Duplicate concepts)

**Symbol:** `PipelineProgress` (here, model.ts:202) and
`database.SyncedTablePipelineProgress` (`database/v1/model.ts:744`,
`postgres/v1/model.ts:2547`).

**Issue:** Identical concept (progress information for the data
synchronization pipeline of an online/synced table) modelled with two
different type names and identical fields (`latestVersionCurrentlyProcessing`,
`syncedRowCount`, `totalRowCount`, `syncProgressCompletion`,
`estimatedCompletionTimeSeconds`).

**Suggested:** keep the shorter `PipelineProgress` (this package) as
canonical; rename `database.SyncedTablePipelineProgress` to
`PipelineProgress` and import from a shared `@databricks/sdk-onlinetables/v1`
or extract both into `@databricks/sdk-core` if the dependency is acceptable.
**SDK-wide cleanup.**

---

### 8. Cross-package collision: `ProvisioningInfo` defined in 4+ packages — category 12 (Duplicate concepts)

**Symbol:** `ProvisioningInfo` (here, model.ts:220) and its sibling state
enum. Also defined in:

- `database/v1/model.ts`
- `postgres/v1/model.ts`
- `catalogs/v1/model.ts`
- `connections/v1/model.ts`

**Issue:** Five separate copies of the same provisioning-info concept with
mostly-identical state values (`PROVISIONING`, `ACTIVE`, `FAILED`, `DELETING`,
`UPDATING`, `DEGRADED`). Each package re-declares the type.

**Suggested:** hoist to a shared `@databricks/sdk-core/provisioning` module
(if cross-cutting), or keep duplicates with **value-level type-checked**
union to guarantee parity. **SDK-wide cleanup.**

---

### 9. Cross-package collision: `DeleteOnlineTableRequest` defined in two packages with different fields — category 12 (Duplicate concepts) and category 19 (Underspecified IDs)

**Symbol:** `DeleteOnlineTableRequest` (here, model.ts:93) and
`featurestore.DeleteOnlineTableRequest` (`featurestore/v1/model.ts:57`).

**Issue:** Both packages define a type with the *same name* but different
fields:

```ts
// onlinetables/v1/model.ts:93
export interface DeleteOnlineTableRequest {
  name?: string | undefined;  // Full three-part name of the table.
}
```

```ts
// featurestore/v1/model.ts:57
export interface DeleteOnlineTableRequest {
  onlineTableName?: string | undefined;  // Full three-part name of the table.
}
```

A caller who imports both packages must alias them (namespacing handles the
type-name collision but the field name differs). The URL paths also differ:
`/api/2.0/online-tables/{name}` here vs.
`/api/2.0/feature-store/online-tables/{onlineTableName}` in featurestore.

**Suggested:** harmonise the field name. `name` is shorter and idiomatic for
URL-path resource identifiers, matches REST conventions, and matches the
sibling `GetOnlineTableRequest.name` (model.ts:119) in this very package.
**Pin `name` as canonical, push back on `featurestore`.**

---

### 10. `CreateOnlineTableRequest.table` field name is too generic — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `CreateOnlineTableRequest.table?: OnlineTable | undefined`
(model.ts:89).

**Issue:** The field name `table` is generic. Compare to
`featurestore.CreateOnlineStoreRequest.onlineStore` (specific). The field's
*type* is `OnlineTable` so the descriptive name would be `onlineTable`.

**Suggested:** `onlineTable` (matches the type, matches
`featurestore.publishTable.publishSpec.onlineTableName`). **Flag at port
time.**

---

### 11. `OnlineTable.name` is a three-part UC name, not a free-text name — category 19 (Underspecified IDs) and category 1 (Vague/generic)

**Symbol:** `OnlineTable.name?: string | undefined` (model.ts:125). JSDoc:
"Full three-part (catalog, schema, table) name of the table."

**Issue:** A field called `name` carries a structured identifier of the form
`catalog.schema.table`. The same shape appears as:
- `OnlineTable.name` (here, model.ts:125)
- `DeleteOnlineTableRequest.name` (model.ts:95)
- `GetOnlineTableRequest.name` (model.ts:119)
- `OnlineTableSpec.sourceTableFullName` (model.ts:156) — note: this one is
  more descriptive

Three of four use `name` (with the constraint in JSDoc); one uses
`sourceTableFullName`. The naming is inconsistent *within this very file*
for the same conceptual shape (a three-part UC name).

**Suggested:** either:
1. Rename `OnlineTable.name` to `fullName` (mirrors `sourceTableFullName`),
   *and* rename `*Request.name` to `*Request.fullName`. This loses the AIP
   resource-name convention.
2. Or, rename `OnlineTableSpec.sourceTableFullName` to `sourceTableName`
   (drops `Full`, matches all other `*.name` shapes) and accept that the
   JSDoc is the only place that documents the three-part constraint.

Option 2 is the cheaper cleanup and aligns with REST `{name}` path
conventions. Cross-reference the identical `featurestore.PublishSpec.onlineTableName`
which also lacks `Full` prefix. **Pick one and apply SDK-wide.**

This finding *also* hits category 19 (underspecified IDs): the field is a
**structured string** (`catalog.schema.table`) — neither the field name nor
the type enforces the format. A typed wrapper (e.g.
`type ThreePartName = string & { __brand: 'three-part' }`) is an option but
cross-SDK convention keeps it as a `string`. **Pass on the wrapper, flag the
inconsistency.**

---

### 12. `OnlineTable.tableServingUrl` repeats "table" — category 8 (Redundant suffixes)

**Symbol:** `OnlineTable.tableServingUrl?: string | undefined` (model.ts:131).

**Issue:** Inside `OnlineTable`, the prefix `table…` is implicit. The field
name `tableServingUrl` repeats "table" — `servingUrl` (or `dataServingUrl`,
matching the JSDoc "Data serving REST API URL") would suffice. Compare to
`pipelineId` (model.ts:171) which lives in `OnlineTableSpec` and does *not*
prefix `tableTable…` or `onlineTable…`.

**Suggested:** `servingUrl`. The JSDoc says "Data serving REST API URL for
this table" — `servingUrl` reads the same.

---

### 13. `OnlineTable.unityCatalogProvisioningState` is overly verbose — category 7 (Overly verbose)

**Symbol:** `OnlineTable.unityCatalogProvisioningState?: ProvisioningInfo_State | undefined`
(model.ts:137). 31 characters.

**Issue:** The JSDoc explains the field is "The provisioning state of the
online table entity in Unity Catalog. This is distinct from the state of the
data synchronization pipeline (i.e. the table may be in 'ACTIVE' but the
pipeline may be in 'PROVISIONING' as it runs asynchronously)." That's the
*reason* the field exists — to disambiguate from the data-sync state. The
field name spells out "unityCatalogProvisioningState" which is descriptive
but long.

The companion `OnlineTable.status` (model.ts:129) is the data-sync state.
Reasonable parallel names would be:
- `OnlineTable.ucState` / `OnlineTable.dataState` — too cryptic.
- `OnlineTable.provisioningState` / `OnlineTable.status` — `provisioningState`
  is shorter and the JSDoc covers the UC scoping.

**Suggested:** `provisioningState`. The JSDoc retains the disambiguation.

---

### 14. `OnlineTable.status` vs `OnlineTable.unityCatalogProvisioningState` — category 17 (Inconsistent action verbs) and category 6 (Misleading names)

**Symbols:** `OnlineTable.status` (model.ts:129),
`OnlineTable.unityCatalogProvisioningState` (model.ts:137).

**Issue:** Two state-like fields on the same type:

- `status: OnlineTableStatus` — the "data synchronization status."
- `unityCatalogProvisioningState: ProvisioningInfo_State` — the "provisioning
  state of the online table entity in Unity Catalog."

A reader sees `status` and `…State` side by side. Both are conceptually
"the state of the table"; the suffix difference (`Status` vs `State`) is not
a meaningful discriminator. The waiter (`CreateOnlineTableWaiter`,
client.ts:174) reads `unityCatalogProvisioningState` to decide done-ness,
not `status` — surprising.

**Suggested:** rename `status` to `syncStatus` or `dataSyncStatus` to make
clear it is about the *data pipeline*, not the entity. Pair with
`provisioningState` (finding 13) for the UC-side entity state.

---

### 15. `OnlineTableStatus.detailedState` vs `OnlineTableStatus.detailedStatus` — category 17 (Inconsistent action verbs) and category 12 (Duplicate concepts)

**Symbols:** `OnlineTableStatus.detailedState` (model.ts:183),
`OnlineTableStatus.detailedStatus` (model.ts:187).

**Issue:** Two fields named `detailed…` on the same type, distinguished only
by the singular/perfect noun suffix (`State` vs `Status`). `detailedState`
is an enum (`OnlineTableState`); `detailedStatus` is a discriminated union
of `ProvisioningStatus | ContinuousUpdateStatus | TriggeredUpdateStatus |
FailedStatus`. They are *related* — `detailedState` indicates which
`$case` of `detailedStatus` will be present — but the names provide zero
hint of the relationship.

**Suggested:** rename `detailedState` to `state` and `detailedStatus` to
`statusDetails` or `details`. Reads more naturally:
```ts
const { state, details, message } = onlineTable.status!;
```

`OnlineTableStatus.message` (model.ts:185) is also descriptive — it is the
plain-text version of the state. The trio `state` / `details` / `message`
forms a coherent shape. **Flag at port time.**

---

### 16. `ContinuousUpdateStatus`, `TriggeredUpdateStatus`, `FailedStatus`, `ProvisioningStatus` all share `…Status` suffix — category 20 (Type-suffix tautology) — *pass with note*

**Symbols:** `ContinuousUpdateStatus`, `TriggeredUpdateStatus`,
`FailedStatus`, `ProvisioningStatus` (model.ts:71, 238, 102, 226).

The four types all end with `Status`. Inside `OnlineTableStatus.detailedStatus`
(model.ts:187) the `$case` literals are `'continuousUpdateStatus'`,
`'triggeredUpdateStatus'`, `'failedStatus'`, `'provisioningStatus'` — also
`…Status`. The pattern is **consistent**. Suffix is repetitive but does
disambiguate from `OnlineTableSpec`/state enums.

The `Failed` and `Provisioning` variants are also generic when read in
isolation — there could be many "failed status" or "provisioning status"
types in the SDK (and there are — see `database.SyncedTableProvisioningStatus`,
finding 17 below).

**Suggested:** consider prefixing with the parent concept — e.g.
`OnlineTableContinuousUpdate`, `OnlineTableTriggeredUpdate`,
`OnlineTableFailed`, `OnlineTableProvisioning`. But this is verbose. **Pass
with note**, flag cross-package overlap below.

---

### 17. Cross-package overlap: `ContinuousUpdateStatus`, `TriggeredUpdateStatus`, `FailedStatus`, `ProvisioningStatus` ↔ `database.SyncedTable*Status` — category 12 (Duplicate concepts)

**Symbols:**
- `onlinetables.ContinuousUpdateStatus` ↔ `database.SyncedTableContinuousUpdateStatus`
- `onlinetables.TriggeredUpdateStatus` ↔ `database.SyncedTableTriggeredUpdateStatus`
- `onlinetables.FailedStatus` ↔ `database.SyncedTableFailedStatus`
- `onlinetables.ProvisioningStatus` ↔ `database.SyncedTableProvisioningStatus`

**Issue:** All four pairs model the same shape (fields are identical or
near-identical). `database` adds a `SyncedTable` prefix to each — disambiguates
within `@databricks/sdk-core` if these were merged, but creates a duplicate
type surface across packages. Same root cause as finding 6 (`OnlineTableState`
↔ `SyncedTableState`).

**Suggested:** harmonise — define once in `@databricks/sdk-onlinetables` or
in `@databricks/sdk-core` and re-export. **SDK-wide cleanup.**

---

### 18. `PipelineProgress.latestVersionCurrentlyProcessing` is awkward — category 7 (Overly verbose) and category 13 (Verb-tense inconsistency)

**Symbol:** `PipelineProgress.latestVersionCurrentlyProcessing?: number | undefined`
(model.ts:207). 32 characters.

**Issue:** "currently processing" packs a present-progressive verb into a
field name, which is unusual for TS field naming. The JSDoc says "The source
table Delta version that was last processed by the pipeline. The pipeline
may not have completely processed this version yet." — so the *field* records
"the most recent version we've seen / started processing" and the JSDoc
notes processing may be incomplete.

Compare to `ContinuousUpdateStatus.lastProcessedCommitVersion` (model.ts:76)
which describes essentially the same idea with a participle (`Processed`) —
and is *clearer*: it's the version that was processed.

So the same package has two different names for the same Delta-version idea:
- `latestVersionCurrentlyProcessing` (PipelineProgress)
- `lastProcessedCommitVersion` (ContinuousUpdateStatus, FailedStatus,
  TriggeredUpdateStatus)

The JSDoc on `lastProcessedCommitVersion` (model.ts:73) even says "may not
be completely synced to the online table yet" — same caveat as
`latestVersionCurrentlyProcessing`'s JSDoc. So they describe the same thing.

**Suggested:** rename `latestVersionCurrentlyProcessing` to
`lastProcessedVersion` (consistency with `lastProcessedCommitVersion` — and
even simpler since `PipelineProgress` does not refer to Delta commit
versions specifically). Or unify on `lastProcessedCommitVersion`. **Flag for
upstream and port-time fix.**

---

### 19. `PipelineProgress.syncedRowCount` / `totalRowCount` / `syncProgressCompletion` mixed nouns — category 17 (Inconsistent action verbs) and category 8 (Redundant suffixes)

**Symbols:** `PipelineProgress.syncedRowCount` (model.ts:209),
`PipelineProgress.totalRowCount` (model.ts:211),
`PipelineProgress.syncProgressCompletion` (model.ts:213).

**Issue:** Three fields about the progress of a sync:

- `syncedRowCount` — past participle "synced" + noun "rowCount". OK.
- `totalRowCount` — adjective "total" + noun "rowCount". OK.
- `syncProgressCompletion` — noun "sync" + noun "progress" + noun
  "completion". Triple nominalisation. The JSDoc says "The completion ratio
  of this update. This is a number between 0 and 1." — so the field is the
  *ratio* or *fraction* of completion.

`syncProgressCompletion` is verbose. A consumer would write:
```ts
const pct = progress.syncProgressCompletion! * 100;
```
when `progress.completion` or `progress.completionRatio` would read the
same.

**Suggested:** `completionRatio` (matches the unit) or `progress` (matches
the parent type name `PipelineProgress` — though circular).
`completionRatio` is the clearer pick. Alternative: model as a percentage
(0–100) and call it `percentComplete`.

---

### 20. `PipelineProgress.estimatedCompletionTimeSeconds` unit-suffix is fine — *pass*

**Symbol:** `PipelineProgress.estimatedCompletionTimeSeconds` (model.ts:215).

`…Seconds` unit suffix is the right move when the field is a raw number.
TypeScript has no unit type system. **Pass.**

(One nit: `estimatedTimeRemainingSeconds` or `secondsUntilComplete` would
read more naturally — "estimatedCompletionTimeSeconds" parses as "estimated
completion-time, in seconds" which is the same. But this is a stylistic
preference. **Pass.**)

---

### 21. `OnlineTableSpec.sourceTableFullName` — category 8 (Redundant suffixes) and category 19 (Underspecified IDs) — see finding 11

**Symbol:** `OnlineTableSpec.sourceTableFullName?: string | undefined`
(model.ts:156).

Already covered in finding 11. **Pass with note** — `Full` qualifier is
redundant when JSDoc already specifies "Three-part (catalog, schema, table)
name". `sourceTableName` would suffice. Cross-reference
`featurestore.PublishTableRequest.sourceTableName` (no `Full`).

---

### 22. `OnlineTableSpec.timeseriesKey` vs `OnlineTableSpec.primaryKeyColumns` (singular vs plural) — category 9 (Singular/plural mismatch)

**Symbols:** `OnlineTableSpec.primaryKeyColumns?: string[]` (model.ts:158),
`OnlineTableSpec.timeseriesKey?: string` (model.ts:160).

**Issue:** Plural array vs. singular scalar — the names match the shapes:
plural noun for the array, singular noun for the scalar. The mismatch is
semantic: a *primary key* in databases is typically one composite key over
multiple columns; here it is modelled as an array (which is fine, the array
*is* the composite key). A *timeseries key* is one column. So the naming is
consistent with the semantics.

However, the JSDoc on `timeseriesKey` (model.ts:159) says "Time series key
to deduplicate (tie-break) rows with the same primary key." — it does not
specify whether it accepts multi-column or single-column. Treat as
single-column scalar.

**Pass** with a JSDoc note (state explicitly "single column name").

---

### 23. `OnlineTableSpec.performFullCopy` is a verb-as-field — category 13 (Verb-tense inconsistency) and category 6 (Misleading names)

**Symbol:** `OnlineTableSpec.performFullCopy?: boolean | undefined`
(model.ts:169).

**Issue:** Boolean fields typically use `is…`, `has…`, `…Enabled`, or
`enable…` prefixes. `performFullCopy` reads as a *command* — "perform a full
copy" — rather than a *state*. Compare to the family of booleans in
`database/v1` (`enableReadableSecondaries`, `enablePgNativeLogin`,
`stopped`) — `enable…` is the dominant pattern.

The JSDoc is also long (model.ts:161–168), but the field name itself reads
imperatively. **Suggested:** `fullCopyOnly` or `enableFullCopy` (matches the
SDK-wide `enable*` boolean pattern). Cross-reference
`database.DatabaseInstance.enableReadableSecondaries` for the pattern.

---

### 24. `OnlineTableSpec.pipelineId` is server-generated — category 6 (Misleading names) — *pass with note*

**Symbol:** `OnlineTableSpec.pipelineId?: string | undefined` (model.ts:171).
JSDoc: "ID of the associated pipeline. Generated by the server - cannot be
set by the caller."

**Issue:** The field appears in the request *spec* but the JSDoc says it is
output-only. Mixing input/output in the same struct is a wire-level
decision; the JSDoc captures the asymmetry. TS does not yet have a clean
way to model output-only fields in input types (e.g. `Readonly<…>` is
declarative not runtime-enforced).

**Pass** — naming is fine; the misleadingness is structural (mixed
input/output), not a naming bug.

---

### 25. `OnlineTableSpec.schedulingPolicy` discriminated-union case names use verb prefixes — category 13 (Verb-tense inconsistency) and category 17 (Inconsistent action verbs)

**Symbol:** `OnlineTableSpec.schedulingPolicy` $case literals
`'runContinuously'` / `'runTriggered'` (model.ts:145, 150).

**Issue:** Each `$case` literal is a verb phrase: `runContinuously` (verb +
adverb), `runTriggered` (verb + past-participle). The verb-phrase form
mirrors the wire field names `run_continuously` / `run_triggered` — which
themselves model the operation ("run continuously vs. run triggered").

Reading code:
```ts
spec.schedulingPolicy = { $case: 'runContinuously', runContinuously: {} };
//                                ^^^^^^^^^^^^^^^^^
//                                verb phrase used as a literal key
```

**Suggested:** rename `$case` literals to noun-phrase form (`'continuous'` /
`'triggered'`). **Flag at port time.**

---

### 26. `CreateOnlineTableRequest` and `GetOnlineTableRequest` and `DeleteOnlineTableRequest` repeat `OnlineTable` — category 7 (Overly verbose) — *pass, SDK-wide pattern*

**Symbols:** `CreateOnlineTableRequest`, `DeleteOnlineTableRequest`,
`GetOnlineTableRequest` (model.ts:87, 93, 117).

The Request/Response type names follow the SDK convention
`{Action}{Resource}Request`. Within the package scope `CreateRequest` /
`DeleteRequest` would suffice (only one resource), but every other TS
package qualifies. **Pass on package consistency.**

---

### 27. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. Every TS package exports a single `Client` class scoped
to its import path (e.g. `@databricks/sdk-onlinetables/v1.Client`). **Pass.**

---

### 28. `Client.createOnlineTable` etc. — *pass*

**Symbols:** `Client.createOnlineTable` (client.ts:67),
`Client.deleteOnlineTable` (client.ts:108), `Client.getOnlineTable`
(client.ts:127).

Standard `{verb}{Resource}` method names. **Pass on style.** The
`OnlineTable` repetition (inside `@databricks/sdk-onlinetables/v1`) is
SDK-wide convention. **Pass.**

(Cross-package note: `featurestore.deleteOnlineTable` and
`onlinetables.deleteOnlineTable` collide — see `featurestore.md` finding 22.
**Not a per-package fix.**)

---

### 29. `Client.createOnlineTableWaiter` returns a `CreateOnlineTableWaiter` — category 14 (Go/Java-style names)

**Symbol:** `Client.createOnlineTableWaiter` (client.ts:92), returns
`CreateOnlineTableWaiter` (client.ts:152).

**Issue:** The Go SDK uses `…AndWait()` or `XXXWaiter()` methods; the JS
SDK port mirrors this. In TS, the canonical pattern would be a
`waitForCreation()` or `createAndWait()` method, possibly with a fluent
poller object. The current shape returns a `Waiter` object which the caller
must then call `.wait()` on. The double-step (`createOnlineTableWaiter` →
`.wait()`) is awkward — neither is the final operation. Compare to
`database.CreateDatabaseInstanceWaiter` (audited in `database.md` finding
14).

Class name `CreateOnlineTableWaiter` is a verb-noun composite:
"the create-online-table waiter" — i.e. a waiter for the create operation.
Reads ambiguously: a waiter that creates? A waiter for creation? **Suggest**
`OnlineTableCreationWaiter` or `OnlineTablePoller`. **Flag for SDK-wide
waiter naming policy.**

**Pass per project convention,** flag for SDK-wide cleanup.

---

### 30. `CreateOnlineTableWaiter.wait` and `CreateOnlineTableWaiter.done` — *pass*

**Symbols:** `CreateOnlineTableWaiter.wait` (client.ts:163),
`CreateOnlineTableWaiter.done` (client.ts:207).

Standard. **Pass.**

---

### 31. `StillRunningError` class is internal but module-scoped — *pass*

**Symbol:** `class StillRunningError extends Error {}` (client.ts:39).

Not exported. Named meaningfully ("the operation is still running, so
retry"). **Pass.**

---

### 32. `host` / `httpClient` / `logger` / `userAgent` private fields — *pass*

**Symbols:** Private fields on `Client` (client.ts:42–48). Acronym handling
matches the project rule (`HttpClient`, `Url` would be flagged, but
`HttpClient` matches the imported type). **Pass.**

---

### 33. `PACKAGE_SEGMENT` constant SCREAMING_SNAKE — category 4

**Symbol:** `PACKAGE_SEGMENT` (client.ts:34).

**Issue:** Google TS Style Guide § 5.1 reserves `UPPER_SNAKE_CASE` for true
constants (primitive literal values like `MAX_LEN = 10`). `PACKAGE_SEGMENT`
is a runtime object literal (`{ key, value }`) constructed from a JSON
import. The value *is* constant per-process, but the identifier shape
violates the project rule. The same name is used in every package's
`client.ts` — project-wide convention.

**Suggested:** `packageSegment` or `clientPackageSegment`. **Flag for
SDK-wide cleanup**, do not fix in isolation.

---

### 34. Comment on `PACKAGE_SEGMENT` is a sentence-fragment in lowercase — category 14 (Go/Java-style names) — *pass*

The JSDoc comment at client.ts:33 ("Package identity segment for this client
to be used in the User-Agent header.") is fine — proper sentence, ends with
a period (matches `.agent/rules` / user CLAUDE.md style).

---

### 35. `HttpCallOptions` interface — category 1 (Vague/generic) and category 20 (Type-suffix tautology)

**Symbol:** `HttpCallOptions` interface (utils.ts:15).

**Issue:** "HttpCall" is not a concept that exists elsewhere in the SDK; the
neighbouring `CallOptions` exists in `@databricks/sdk-options/call`. Naming
both *in the same file* (`HttpCallOptions` here, `CallOptions` imported on
line 12) confuses readers — which "Call" do they mean? **Suggest**
`HttpRequestContext` or `ExecuteHttpArgs`. **Flag for SDK-wide cleanup**
(this `utils.ts` is generated boilerplate copied across every package, so
any fix must apply everywhere).

---

### 36. `executeCall` vs `executeHttpCall` verb collision — category 17 (Inconsistent action verbs)

**Symbols:** `executeCall` (utils.ts:26) and `executeHttpCall` (utils.ts:65).

**Issue:** Two functions named `execute…Call`. `executeCall` is a wrapper
that adapts public `CallOptions` to internal `Options` and calls `execute()`
from `@databricks/sdk-core/api`. `executeHttpCall` performs an HTTP request
and decodes the body. They do *different* things at *different* layers; the
names imply a hierarchical relationship that does not exist. The HTTP one
is roughly `sendAndDecode` or `doHttpRequest`. **Flag for SDK-wide cleanup;**
this file is generated boilerplate copied across every package.

---

## Cross-package alignment recommendations

### A. `OnlineTable` ↔ `SyncedTable` duplication

`onlinetables` and `database`/`postgres` model the same underlying concept
(a managed continuously-sync table from a Delta source to a backing
store) under two type families. Cross-package collisions in this audit:

| `onlinetables` (this pkg)          | `database` / `postgres`                       |
| ---------------------------------- | --------------------------------------------- |
| `OnlineTable`                      | `SyncedDatabaseTable` / `SyncedTable`         |
| `OnlineTableSpec`                  | `SyncedTableSpec`                             |
| `OnlineTableState`                 | `SyncedTableState` (12 values, wire-typo)     |
| `OnlineTableStatus`                | `SyncedTableStatus`                           |
| `ContinuousUpdateStatus`           | `SyncedTableContinuousUpdateStatus`           |
| `TriggeredUpdateStatus`            | `SyncedTableTriggeredUpdateStatus`            |
| `FailedStatus`                     | `SyncedTableFailedStatus`                     |
| `ProvisioningStatus`               | `SyncedTableProvisioningStatus`               |
| `PipelineProgress`                 | `SyncedTablePipelineProgress`                 |
| `ProvisioningInfo` (empty)         | `ProvisioningInfo` (empty)                    |

This is the highest-cost duplication observed in the audit. **Strong P0
recommendation:** consolidate. Options:

1. **Pick one canonical package** (`onlinetables` is the shorter, cleaner
   surface — no `SyncedTable` prefix, no wire-string typos). Have
   `database` re-export from `onlinetables` with deprecation notes.
2. **Hoist all `Online/Synced{Table…}` types** into
   `@databricks/sdk-core/synctables` (or similar) and re-export from both
   service packages.

**Coordinate with SDK platform team.**

---

### B. `DeleteOnlineTableRequest` field-name divergence

`onlinetables.DeleteOnlineTableRequest.name` vs.
`featurestore.DeleteOnlineTableRequest.onlineTableName`. Already covered in
finding 9. Harmonise on `name`.

---

### C. `SYNCED_TABLED_OFFLINE` wire-level typo

`database.SyncedTableState` includes the value `SYNCED_TABLED_OFFLINE`
(extra `D`). This is on the wire and locks consumers into the misspelling.
Coordinate a protocol-level fix with the API team; the SDK alone cannot
correct it without breaking compatibility. **Flag for protocol team.**

---

## Counts by severity

| Severity | Count | Findings |
| -------- | ----- | -------- |
| **High** (style guide violations, cross-package collisions) | 5 | #3, #9, #15, #23, #33, **and** cross-package A |
| **Medium** (naming clarity, verbose, redundant suffixes, JSDoc drift) | 13 | #1, #2, #4, #5, #6, #10, #11, #12, #13, #14, #17, #18, #19, #21, #25 |
| **Low / SDK-wide note** (generator boilerplate, not local fix) | 9 | #7, #8, #16, #22, #24, #26, #29, #35, #36 |
| **Pass / acceptable** | 9 | #16, #20, #22, #24, #26, #27, #28, #30, #31, #32, #34 |

---

## Top fixes (highest local return)

1. **#9** — harmonise `DeleteOnlineTableRequest.name` vs.
   `featurestore.DeleteOnlineTableRequest.onlineTableName` field name. Quick
   cross-package fix.
2. **#12** — rename `OnlineTable.tableServingUrl` → `servingUrl`. Local,
   no other consumers.
3. **#13** — rename `OnlineTable.unityCatalogProvisioningState` →
   `provisioningState`. Local.
4. **#10** — rename `CreateOnlineTableRequest.table` → `onlineTable`. Local
   port-time fix.
5. **#15** — rename `OnlineTableStatus.detailedState` → `state` and
   `detailedStatus` → `statusDetails` / `details`. Local readability win.
6. **#18** — rename `PipelineProgress.latestVersionCurrentlyProcessing` →
   `lastProcessedVersion`. Matches sibling `lastProcessedCommitVersion`.
7. **#19** — rename `PipelineProgress.syncProgressCompletion` →
   `completionRatio`. Local.
8. **#23** — rename `OnlineTableSpec.performFullCopy` → `enableFullCopy`
   (matches SDK `enable*` boolean pattern).

---

## Top fixes (SDK-wide)

1. **Cross-package A** — consolidate `OnlineTable` vs `SyncedTable` type
   families into one canonical surface.
2. **Cross-package C** — fix the `SYNCED_TABLED_OFFLINE` wire-string typo
   at the protocol layer.
3. **#3** — `UpperCamelCase` enum members (string value preserved as wire
   form).
4. **#33** — `PACKAGE_SEGMENT` → `packageSegment`.
5. **#29** — settle waiter naming convention (`*Waiter` vs `*Poller` vs
   inline `*AndWait`).
