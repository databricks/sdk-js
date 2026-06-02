# Naming Audit: `warehouses` (v1)

**Package:** `@databricks/sdk-warehouses`
**Path:** `/home/parth.bansal/sdk-js/packages/warehouses/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/index.ts`
- `src/v1/utils.ts`
- `src/v1/transport.ts`

## Summary

| Severity | Count |
| ----------- | ----- |
| High        |    17 |
| Medium      |     7 |
| Low         |    15 |
| Observation |    11 |
| **Total**   | **50** |

---

## F0 — Package-level: legacy "Endpoint" terminology leaks through the warehouse package

### F0.1 — Two product surfaces conflated under one package (HIGH)
- **Where:** `client.ts` exposes both `*Warehouse(s)` methods on
  `/api/2.0/sql/warehouses` and `*DefaultWarehouseOverride(s)`
  methods on `/api/warehouses/v1/default-warehouse-overrides`.
- **Why flagged:** These are two distinct resource families with
  two distinct API base paths and two distinct API contracts (the
  warehouse APIs are `/api/2.0/...` legacy; the override APIs are
  `/api/warehouses/v1/...` AIP-compliant). The combined surface
  forces a single client to carry 20 methods over two unrelated
  resource trees.
- **Suggestion:** Either (a) split into `@databricks/sdk-warehouses`
  and `@databricks/sdk-defaultwarehouseoverrides` (matches the
  per-resource split in jobs/clusters), or (b) keep combined and
  add a JSDoc on `Client` clearly explaining the two resource
  families. Cross-cutting decision.

### F0.2 — Conflict with `endpoints` package across the monorepo (MEDIUM, cross-package)
- **Where:** `packages/endpoints/` exports `Endpoint`,
  `EndpointType`, `EndpointStatus`, `EndpointThroughputInfo`, etc.
  for vector-search endpoints. This package exports
  `EndpointInfo`, `EndpointHealth`, `EndpointState`,
  `EndpointTags`, `EndpointTagPair`, `EndpointConfPair`,
  `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy`,
  `EndpointHealth_Status`, `RepeatedEndpointConfPairs` for SQL
  warehouses.
- **Why flagged:** Three packages overload "Endpoint":
  vector-search, model-serving, and SQL warehouses. An import line
  `import {EndpointState, EndpointInfo} from '@databricks/sdk-warehouses'`
  is misleading — the symbol name says "endpoint" while the package
  name says "warehouses". A reader cannot grep for "endpoint" and
  know which subsystem matches.
- **Suggestion:** Rename all `Endpoint*` types in this package to
  `Warehouse*` (see F1.x, F8.1). Reconcile with the package brand.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `EndpointInfo` type name (HIGH)
- **Where:** `model.ts:981`, `index.ts:35`, return field
  `warehouses?: EndpointInfo[]` on `ListWarehousesResponse`
  (`model.ts:1304`), yield type of `listWarehousesIter`
  (`client.ts:483`).
- **Why flagged:** Misleading legacy name. The type represents
  a SQL warehouse (it has `clusterSize`, `warehouseType`,
  `jdbcUrl`, `numClusters`, etc.), but the type is named
  `EndpointInfo`. Same root concept as `GetWarehouseResponse`,
  which has identical field set — so the type name should
  match.
- **Suggestion:** Rename to `Warehouse` (the resource itself) or
  `WarehouseInfo` if backward parity matters. Mirror
  `GetWarehouseResponse` shape into a single canonical type.

#### F1.2 — `EndpointState` enum name (HIGH)
- **Where:** `model.ts:87`, `index.ts:16`. Used in
  `EndpointInfo.state` (`model.ts:1081`),
  `GetWarehouseResponse.state` (`model.ts:1215`), and as
  the poll-target inside every Waiter (`client.ts:691, 694, 695,
  764, ...`).
- **Why flagged:** The states themselves (`RUNNING`, `STOPPING`,
  `STOPPED`, `DELETING`, `DELETED`, `STARTING`) are warehouse
  states. JSDoc on the enum says "State of a warehouse." but the
  type is named `EndpointState`. The mismatch forces every
  customer-facing waiter to import `EndpointState` then check
  `EndpointState.RUNNING` (`client.ts:691`) on a value whose type
  is warehouse.
- **Suggestion:** Rename to `WarehouseState`. The wire string can
  remain identical (server expects `"RUNNING"`, etc., not
  `"ENDPOINT_RUNNING"`), so this is a zero-cost rename at the
  spec level.

#### F1.3 — `EndpointHealth` interface and `EndpointHealth_Status` enum (HIGH)
- **Where:** `model.ts:968`, `model.ts:686`, `index.ts:34, 20`.
  Field on `EndpointInfo.health` (`model.ts:1087`) and
  `GetWarehouseResponse.health` (`model.ts:1221`). JSDoc says
  "Health status of the endpoint" (`model.ts:969`).
- **Why flagged:** Same root issue as F1.1/F1.2. The health is
  of a warehouse, not an endpoint. The waiters use
  `pollResp.health?.summary` (`client.ts:696`) — a warehouse
  health message.
- **Suggestion:** Rename to `WarehouseHealth` /
  `WarehouseHealth_Status`.

#### F1.4 — `EndpointTags`, `EndpointTagPair` interface names (HIGH)
- **Where:** `model.ts:1095, 1090`, `index.ts:37, 36`. Field
  `tags?: EndpointTags` on `CreateWarehouseRequest` (`model.ts:794`),
  `EditWarehouseRequest` (`model.ts:940`), `EndpointInfo`
  (`model.ts:1058`), `GetWarehouseResponse` (`model.ts:1192`).
- **Why flagged:** Same legacy naming. Tags are on warehouses,
  not endpoints. JSDoc says "key-value pairs that will be
  tagged on all resources … associated with this SQL warehouse"
  (`model.ts:788, 933, 1051, 1185`).
- **Suggestion:** Rename to `WarehouseTags` / `WarehouseTagPair`.

#### F1.5 — `EndpointConfPair`, `RepeatedEndpointConfPairs` (HIGH)
- **Where:** `model.ts:963, 1319`, `index.ts:33, 47`.
- **Why flagged:** Workspace-level SQL configuration parameters
  (`globalParam`, `sqlConfigurationParameters`, etc.) are not
  per-endpoint. They are workspace-scoped. The current name
  conflates the legacy "endpoint" term with workspace config.
- **Suggestion:** Rename `EndpointConfPair` → `ConfigPair` or
  `WarehouseConfigPair`. `RepeatedEndpointConfPairs` →
  `RepeatedConfigPairs`.

#### F1.6 — `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy` (HIGH)
- **Where:** `model.ts:26, 55`, `index.ts:14, 15`. Field on
  `SetWorkspaceWarehouseConfigRequest.securityPolicy`
  (`model.ts:1332`),
  `GetWorkspaceWarehouseConfigResponse.securityPolicy`
  (`model.ts:1233`), and `spotInstancePolicy` on each warehouse
  (`model.ts:796, 942, 1060, 1194`).
- **Why flagged:** Same legacy term. JSDoc on
  `EndpointSecurityPolicy` reads "Security policy to be used for
  warehouses". JSDoc on `EndpointSpotInstancePolicy` extensively
  uses "endpoint" — see F0 above.
- **Suggestion:** Rename to `WarehouseSecurityPolicy` /
  `WarehouseSpotInstancePolicy`.

#### F1.7 — `Channel` type and `ChannelName` enum (MEDIUM)
- **Where:** `model.ts:701, 7`, `index.ts:24, 12`.
- **Why flagged:** "Channel" alone is a generic term (HTTP
  channel, communication channel, marketing channel). In this
  domain it means "DBSQL release channel" — `CHANNEL_NAME_PREVIEW`,
  `CHANNEL_NAME_CURRENT`, `CHANNEL_NAME_PREVIOUS`,
  `CHANNEL_NAME_CUSTOM`. The JSDoc says "Configures the channel
  name and DBSQL version of the warehouse" but the type name
  itself does not signal this.
- **Suggestion:** Rename the type to `WarehouseChannel` and the
  enum to `WarehouseChannelName` (or `DbsqlChannel` /
  `DbsqlChannelName`). Note: the enum name `ChannelName`
  duplicates "name" — see F5.2.

#### F1.8 — `req` parameter name on every client method (LOW, Go-ism)
- **Where:** `client.ts:110, 157, 185, 201, 223, 251, 279, 295,
  323, 385, 424, 442, 481, 499, 534, 562, 574, 617` (and `_req` at
  `client.ts:351`).
- **Why flagged:** `req` is a Go-ism (see category 10). It is
  also generic.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). Cross-package decision.

#### F1.9 — `resp` local variable everywhere (LOW)
- **Where:** `client.ts` throughout (e.g. `resp:
  CreateWarehouseResponse | undefined`, `client.ts:162`).
- **Why flagged:** Same Go abbreviation as `req`. See F10.1.
- **Suggestion:** `response` for consistency. Generator-level.

---

### 2. Cryptic abbreviations

#### F2.1 — `Conf` for configuration (`EndpointConfPair`) (MEDIUM)
- **Where:** `model.ts:963, 1321`.
- **Why flagged:** "Conf" is an abbreviation. It is also
  inconsistent with the spelled-out `Config` /
  `Configuration` forms used elsewhere in the package.
- **Suggestion:** Standardize on `Config`. Rename the type
  `EndpointConfPair` → `ConfigPair`.

#### F2.2 — `req`, `resp` Go-ism abbreviations (LOW)
- **Where:** `client.ts` throughout.
- Already covered in F1.8 and F1.9.

---

### 3. Misleading names

#### F3.1 — `EndpointInfo` for a warehouse record (HIGH)
- **Where:** `model.ts:981`.
- Covered in F1.1 / F0. The most glaring example: a value of
  type `EndpointInfo` is a warehouse, not an endpoint.
- **Suggestion:** Rename to `Warehouse` or `WarehouseInfo`.

#### F3.2 — `EndpointState` for warehouse states (HIGH)
- Covered in F1.2 / F0.

#### F3.3 — `EndpointHealth` for warehouse health (HIGH)
- Covered in F1.3 / F0.

#### F3.4 — `EndpointTags` / `EndpointTagPair` for warehouse tags (HIGH)
- Covered in F1.4 / F0.

#### F3.5 — `EndpointConfPair` / `RepeatedEndpointConfPairs` are workspace config, not endpoint config (HIGH)
- **Where:** `model.ts:963, 1319`. Used inside
  `GetWorkspaceWarehouseConfigResponse.dataAccessConfig`
  (`model.ts:1238`, workspace-scoped) and `globalParam`
  (`model.ts:1250`, also workspace-scoped).
- **Why flagged:** The type name says "endpoint conf" but the
  scope is workspace.
- **Suggestion:** Rename to `WorkspaceConfigPair` or
  `ConfigPair`.

#### F3.6 — `ChannelName` enum used for the channel's "version selector" (LOW)
- **Where:** `model.ts:7`.
- **Why flagged:** Enum is named `ChannelName` (suggesting just
  the "name"), but the values include `CUSTOM` and a
  release-channel concept. `ChannelType` would be more
  accurate.
- **Suggestion:** Rename to `ChannelType` or `WarehouseChannel`.

#### F3.7 — `creatorName` is documented as "warehouse creator name" but lives on Create + Edit + Get (LOW)
- **Where:** `model.ts:784, 930, 1048, 1182`.
- **Why flagged:** The field is settable on
  `CreateWarehouseRequest`/`EditWarehouseRequest`, but its meaning
  is read-only on the server side ("creator" never changes after
  create). Surfacing it as settable on `Edit` is misleading.
- **Suggestion:** Spec-level. Mark read-only on response types
  only.

#### F3.8 — Waiter `done` returns true on terminal failure states (MEDIUM)
- **Where:** `client.ts:712, 785, 858, 926` (the `done()` of
  each Waiter).
- **Why flagged:** `done()` returns `true` for `RUNNING`,
  `STOPPED`, `DELETED` indiscriminately (`client.ts:726-728`). A
  caller who reads "done()" expects success, but `DELETED` is a
  failure for `CreateWarehouseWaiter`/`StartWarehouseWaiter`. The
  wait() method correctly distinguishes (throws on
  STOPPED/DELETED at `client.ts:694-697`), but done() does not.
- **Suggestion:** Either rename `done()` to `terminal()` /
  `settled()` (clearly signals "stopped progressing", not
  "succeeded"), or split into `done()` (succeeded) and
  `terminal()` (any terminal state). Cross-cutting waiter API
  decision.

---

### 4. Overly verbose

#### F4.1 — `CreateDefaultWarehouseOverrideRequest`, `GetDefaultWarehouseOverrideRequest`, `UpdateDefaultWarehouseOverrideRequest`, `DeleteDefaultWarehouseOverrideRequest`, `ListDefaultWarehouseOverridesRequest`, `ListDefaultWarehouseOverridesResponse` (MEDIUM)
- **Where:** `model.ts:707, 1100, 1396, 846, 1273, 1292`.
- **Why flagged:** All AIP-style "DefaultWarehouseOverride"
  resources. The names are accurate but very long
  (39-48 characters). The matching client methods
  (`createDefaultWarehouseOverride`,
  `listDefaultWarehouseOverridesIter`) inherit the same length.
- **Suggestion:** Acceptable; AIP-compliant. Aliasing at the
  call site is the typical workaround.

---

### 5. Redundant suffixes

#### F5.1 — `Request` suffix on every request interface (HIGH, generator-driven)
- **Where:** `CreateDefaultWarehouseOverrideRequest`,
  `CreateWarehouseRequest`,
  `DeleteDefaultWarehouseOverrideRequest`,
  `EditWarehouseRequest`, `GetDefaultWarehouseOverrideRequest`,
  `GetWarehouseRequest`, `GetWorkspaceWarehouseConfigRequest`,
  `ListDefaultWarehouseOverridesRequest`,
  `SetWorkspaceWarehouseConfigRequest`,
  `UpdateDefaultWarehouseOverrideRequest`,
  `DeleteWarehouseRequest`, `ListWarehousesRequest`,
  `StartRequest`, `StopRequest`.
- **Why flagged:** Caller already supplies the request via the
  parameter type position — the `Request` suffix is a
  belt-and-suspenders signal. All request types now carry the
  suffix consistently (the prior `CreateWarehouse` / `GetWarehouse`
  without-suffix variants were renamed to `CreateWarehouseRequest`
  / `GetWarehouseRequest`). The remaining concern is the
  redundancy itself, not the consistency.
- **Suggestion:** Drop the `Request` suffix across the SDK at
  the generator level. Generator-level.

#### F5.2 — `Name` suffix on `ChannelName` enum (MEDIUM)
- **Where:** `model.ts:7`.
- **Why flagged:** Both `ChannelName.CHANNEL_NAME_PREVIEW` (the
  enum) and the `name` field on `Channel` of type `ChannelName`
  — three layers of "name". The enum is more accurately a
  "Channel Type".
- **Suggestion:** Rename the enum to `ChannelType` (this also
  clarifies intent — Custom vs. Preview is the *type* of channel).

#### F5.3 — `Pair` suffix on `EndpointTagPair`, `EndpointConfPair`, `WarehouseTypePair` (MEDIUM)
- **Where:** `model.ts:1090, 963, 1423`.
- **Why flagged:** "Pair" is a generic suffix that adds little
  information when the type's two fields are obvious. For
  `EndpointTagPair` (`key`, `value`), the suffix duplicates the
  shape already evident from the fields.
- **Suggestion:** Rename `EndpointTagPair` → `Tag`,
  `EndpointConfPair` → `Config`, `WarehouseTypePair` →
  `WarehouseTypeAvailability` (or similar) — semantically clearer
  than the `Pair` suffix.

#### F5.4 — `Params` suffix on `OdbcParams` (LOW)
- **Where:** `model.ts:1312`.
- **Why flagged:** Mild noise. Type has `hostname`, `path`,
  `protocol`, `port` — `OdbcConnectionInfo` would be more
  accurate.
- **Suggestion:** Acceptable as-is; `OdbcParams` follows
  the standard "parameters" terminology.

---

### 6. Singular / plural mismatches

#### F6.1 — `TerminationReason.parameters` is a map, not a list (LOW)
- **Where:** `model.ts:1386`. Type `Record<string, string>`.
- **Why flagged:** `parameters` is plural but typed as a map.
  Plural maps are fine but inconsistent — compare to
  `globalParam` / `configParam` which are singular.
- **Suggestion:** Acceptable; map semantics are clear from the
  type. Plural is correct.

#### F6.2 — `enabledWarehouseTypes` plural array (acceptable)
- **Where:** `model.ts:1269, 1368`.
- **Why flagged:** Plural name + array type. Correct.
- **Suggestion:** No change.

#### F6.3 — `defaultWarehouseOverrides` plural array (acceptable)
- **Where:** `model.ts:1294`.
- **Why flagged:** Correct.
- **Suggestion:** No change.

#### F6.4 — `warehouses` plural array (acceptable)
- **Where:** `model.ts:1304`. Correct.

#### F6.5 — `customTags` plural array (acceptable)
- **Where:** `model.ts:1096`. Correct.

---

### 7. Reserved-word collisions

#### F7.1 — `type` field (LOW)
- **Where:** `DefaultWarehouseOverride.type` (`model.ts:837`),
  `TerminationReason.type` (`model.ts:1384`).
- **Why flagged:** `type` is a TS keyword in certain positions
  (the `type` modifier in type imports), but valid as a
  property name. No actual collision. Some linters warn.
- **Suggestion:** Acceptable; common pattern in TS APIs.

#### F7.2 — `name`, `id` (acceptable)
- Common property names; not reserved.

#### F7.3 — `delete` not used as identifier (acceptable)
- Used only as method name `deleteWarehouse`,
  `deleteDefaultWarehouseOverride` — fine in TS (verb prefix).

#### F7.4 — `default-warehouse-overrides` URL segment vs. `default` TS keyword (acceptable)
- **Where:** Path string only. Not an identifier.

---

### 8. Duplicate concepts / historical baggage

#### F8.1 — Legacy `Endpoint*` naming for a `Warehouse*` concept (HIGH)
- Covered in F0 and F1.x. Listed here for completeness in
  category 8: the entire `Endpoint*` family is historical
  baggage from the rename of "SQL Endpoints" to "SQL Warehouses".

---

### 9. Verb-tense inconsistency

#### F9.1 — `Create*`, `Delete*`, `Edit*`, `Update*`, `Get*`, `Set*`,
`List*`, `Start*`, `Stop*` (acceptable + inconsistency)
- **Where:** Method names across `client.ts`.
- **Why flagged:** All imperatives, present tense. Consistent
  *within tense*. But mixed verbs across the same resource:
  - Warehouses: `createWarehouse`, `editWarehouse`,
    `deleteWarehouse`. `editWarehouse` is the odd one — uses
    "edit" instead of the conventional "update".
  - Default overrides: `createDefaultWarehouseOverride`,
    `updateDefaultWarehouseOverride`,
    `deleteDefaultWarehouseOverride`. Standard CRUD verbs.
- **Suggestion:** See F11.1 below — same root cause.

---

### 10. Go/Java-style names

#### F10.1 — `req`, `resp`, `opts` Go abbreviations (LOW)
- **Where:** `client.ts` throughout.
- **Why flagged:** Go convention is `req`, `resp`, `opts`; TS
  convention is `request`, `response`, `options`. SDK already
  uses `options` (full word) so the abbreviation is inconsistent
  within the same method signature.
- **Suggestion:** Generator-level.

#### F10.2 — `for (;;)` C-style infinite loop (LOW, generator-driven)
- **Where:** `client.ts:428, 485`.
- **Why flagged:** `for (;;)` is C/Go idiom; TS prefers
  `while (true)` for readability. Minor.
- **Suggestion:** Generator-level.

---

### 11. Inconsistent action verbs

#### F11.1 — `Edit` vs. `Update` (HIGH)
- **Where:** `editWarehouse` (`client.ts:250`) vs.
  `updateDefaultWarehouseOverride` (`client.ts:616`). Same
  package, two different "modify resource" verbs.
- **Why flagged:** Warehouses use `edit`; default warehouse
  overrides use `update`. CRUD-style APIs across the SDK use
  "update"; the warehouse `edit` is a legacy form. Compounded
  by `Editor`-ish naming on types: `EditWarehouseRequest`,
  `EditWarehouseResponse`, `EditWarehouseWaiter`.
- **Suggestion:** Standardize on `update` across the SDK.
  Rename `editWarehouse` → `updateWarehouse`,
  `EditWarehouseRequest` → `UpdateWarehouseRequest`,
  `EditWarehouseWaiter` → `UpdateWarehouseWaiter`. Note: this is
  a method/operation rename — coordinate with backend.

#### F11.2 — `Start` and `Stop` as method names (acceptable)
- **Where:** `startWarehouse`, `stopWarehouse`.
- **Why flagged:** Pair of opposites; standard for state
  machines. Good.
- **Suggestion:** No change.

#### F11.3 — `Create` and `Delete` (acceptable)
- Standard CRUD. No issue.

---

### 12. Underspecified IDs

#### F12.1 — `runAsUserId` on `ListWarehousesRequest` (deprecated) (LOW)
- **Where:** `model.ts:1451`. Already deprecated. Numeric (`bigint`),
  not string — unusual; most IDs in the SDK are string.
- **Suggestion:** Already deprecated. Leave.

#### F12.2 — `ListDefaultWarehouseOverridesResponse.nextPageToken` (acceptable)
- **Where:** `model.ts:1299`. Standard pagination identifier.

---

### 13. Type-suffix tautology

#### F13.1 — `Channel.name: ChannelName` (HIGH)
- **Where:** `model.ts:701-704`.
  ```ts
  export interface Channel {
    name?: ChannelName | undefined;
    dbsqlVersion?: string | undefined;
  }
  ```
- **Why flagged:** Field `name` typed as `ChannelName`. The
  field is `channel.name: ChannelName`. Trying to read
  `channel.name.toString()` returns `'CHANNEL_NAME_PREVIEW'`
  — three layers of "name".
- **Suggestion:** Rename the enum to `ChannelType`, which breaks
  the tautology between the field and its enum type. See F3.6 /
  F5.2.

#### F13.2 — `EndpointHealth.status: EndpointHealth_Status` (LOW)
- **Where:** `model.ts:970`.
- **Why flagged:** Field name `status` + enum suffix `Status`
  + interface "Health Status" namespace. Disambiguated by
  typing.
- **Suggestion:** Acceptable; standard pattern.

#### F13.3 — `WarehouseTypePair.warehouseType: WarehouseType` (HIGH)
- **Where:** `model.ts:1423-1429`.
  ```ts
  export interface WarehouseTypePair {
    warehouseType?: WarehouseType | undefined;
    enabled?: boolean | undefined;
  }
  ```
- **Why flagged:** Field name and type name are nearly
  identical. Reads "warehouse-type pair . warehouse type =
  WarehouseType.PRO". Two layers of "warehouse type".
- **Suggestion:** Rename the enum type `WarehouseType` → `Type`
  (or rename the container to `WarehouseTypeAvailability`) to
  break the duplication.

#### F13.4 — `TerminationReason.code: TerminationCode` (LOW)
- **Where:** `model.ts:1382`. Field `code` + enum suffix `Code`
  on `TerminationCode`. Generic field name with specific enum —
  acceptable.

#### F13.5 — `TerminationReason.type: TerminationType` (LOW)
- **Where:** `model.ts:1384`. Same pattern. Acceptable.

#### F13.6 — `DefaultWarehouseOverride.type: DefaultWarehouseOverrideType` (LOW)
- **Where:** `model.ts:837`.
- **Why flagged:** Field `type` typed as
  `DefaultWarehouseOverrideType`. Container type already says
  "DefaultWarehouseOverride", so the field's type duplicates
  the container's name + adds "Type". Acceptable in practice.
