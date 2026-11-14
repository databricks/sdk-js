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
| High        |    13 |
| Medium      |     6 |
| Low         |     6 |
| **Total**   | **25** |

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

### F0.2 — Conflict with the vector-search package across the monorepo (MEDIUM, cross-package)
- **Where:** `packages/vectorsearch/` exports `Endpoint`
  (`model.ts:303`) and `EndpointType` (`model.ts:20`) for
  vector-search endpoints. This package exports
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
  `Warehouse*` (see F1.x). Reconcile with the package brand.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `EndpointInfo` type name (HIGH)
- **Where:** `model.ts:1045`, `index.ts:35`, return field
  `warehouses?: EndpointInfo[]` on `ListWarehousesResponse`
  (`model.ts:1370`), yield type of `listWarehousesIter`
  (`client.ts:494`).
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
- **Where:** `model.ts:100`, `index.ts:16`. Used in
  `EndpointInfo.state` (`model.ts:1146`),
  `GetWarehouseResponse.state` (`model.ts:1281`), and as
  the poll-target inside every Waiter (`client.ts:708, 711, 712,
  781, ...`).
- **Why flagged:** The states themselves (`RUNNING`, `STOPPING`,
  `STOPPED`, `DELETING`, `DELETED`, `STARTING`) are warehouse
  states. JSDoc on the enum says "State of a warehouse." but the
  type is named `EndpointState`. The mismatch forces every
  customer-facing waiter to import `EndpointState` then check
  `EndpointState.RUNNING` (`client.ts:708`) on a value whose type
  is warehouse.
- **Suggestion:** Rename to `WarehouseState`. The wire string can
  remain identical (server expects `"RUNNING"`, etc., not
  `"ENDPOINT_RUNNING"`), so this is a zero-cost rename at the
  spec level.

#### F1.3 — `EndpointHealth` interface and `EndpointHealth_Status` enum (HIGH)
- **Where:** `model.ts:1032`, `model.ts:744`, `index.ts:34, 20`.
  Field on `EndpointInfo.health` (`model.ts:1152`) and
  `GetWarehouseResponse.health` (`model.ts:1287`). JSDoc says
  "Health status of the endpoint" (`model.ts:1033`).
- **Why flagged:** Same root issue as F1.1/F1.2. The health is
  of a warehouse, not an endpoint. The waiters use
  `pollResp.health?.summary` (`client.ts:713`) — a warehouse
  health message.
- **Suggestion:** Rename to `WarehouseHealth` /
  `WarehouseHealth_Status`.

#### F1.4 — `EndpointTags`, `EndpointTagPair` interface names (HIGH)
- **Where:** `model.ts:1160, 1155`, `index.ts:37, 36`. Field
  `tags?: EndpointTags` on `CreateWarehouseRequest` (`model.ts:857`),
  `EditWarehouseRequest` (`model.ts:1004`), `EndpointInfo`
  (`model.ts:1123`), `GetWarehouseResponse` (`model.ts:1258`).
- **Why flagged:** Same legacy naming. Tags are on warehouses,
  not endpoints. JSDoc says "key-value pairs that will be
  tagged on all resources … associated with this SQL warehouse"
  (`model.ts:851, 998, 1117, 1252`).
- **Suggestion:** Rename to `WarehouseTags` / `WarehouseTagPair`.

#### F1.5 — `EndpointConfPair`, `RepeatedEndpointConfPairs` (HIGH)
- **Where:** `model.ts:1027, 1385`, `index.ts:33, 47`.
- **Why flagged:** Workspace-level SQL configuration parameters
  (`globalParam`, `sqlConfigurationParameters`, etc.) are not
  per-endpoint. They are workspace-scoped. The current name
  conflates the legacy "endpoint" term with workspace config.
- **Suggestion:** Rename `EndpointConfPair` → `ConfigPair` or
  `WarehouseConfigPair`. `RepeatedEndpointConfPairs` →
  `RepeatedConfigPairs`.

#### F1.6 — `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy` (HIGH)
- **Where:** `model.ts:36, 64`, `index.ts:14, 15`. Field on
  `SetWorkspaceWarehouseConfigRequest.securityPolicy`
  (`model.ts:1398`),
  `GetWorkspaceWarehouseConfigResponse.securityPolicy`
  (`model.ts:1299`), and `spotInstancePolicy` on each warehouse
  (`model.ts:859, 1006, 1125, 1260`).
- **Why flagged:** Same legacy term. JSDoc on
  `EndpointSecurityPolicy` reads "Security policy to be used for
  warehouses". JSDoc on `EndpointSpotInstancePolicy` extensively
  uses "endpoint" — see F0 above.
- **Suggestion:** Rename to `WarehouseSecurityPolicy` /
  `WarehouseSpotInstancePolicy`.

#### F1.7 — `Channel` type and `ChannelName` enum (MEDIUM)
- **Where:** `model.ts:763, 8`, `index.ts:24, 12`.
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
  duplicates "name" — see F4.2.

#### F1.8 — `req` parameter name on every client method (LOW, Go-ism)
- **Where:** `client.ts:109, 157, 187, 203, 226, 255, 285, 301,
  330, 394, 434, 452, 492, 510, 546, 576, 588, 618, 633` (and `_req`
  at `client.ts:359`).
- **Why flagged:** `req` is a Go-ism (see section 5). It is
  also generic.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). Cross-package decision.

#### F1.9 — `resp` local variable everywhere (LOW)
- **Where:** `client.ts` throughout (e.g. `resp:
  CreateWarehouseResponse | undefined`, `client.ts:163`).
- **Why flagged:** Same Go abbreviation as `req`. See F5.1.
- **Suggestion:** `response` for consistency. Generator-level.

---

### 2. Cryptic abbreviations

#### F2.1 — `Conf` for configuration (`EndpointConfPair`) (MEDIUM)
- **Where:** `model.ts:1027, 1385`.
- **Why flagged:** "Conf" is an abbreviation. It is also
  inconsistent with the spelled-out `Config` /
  `Configuration` forms used elsewhere in the package.
- **Suggestion:** Standardize on `Config`. Rename the type
  `EndpointConfPair` → `ConfigPair`.

---

### 3. Misleading names

#### F3.1 — `EndpointInfo` for a warehouse record (HIGH)
- **Where:** `model.ts:1045`.
- Covered in F1.1 / F0. The most glaring example: a value of
  type `EndpointInfo` is a warehouse, not an endpoint.
- **Suggestion:** Rename to `Warehouse` or `WarehouseInfo`.

#### F3.2 — `EndpointConfPair` / `RepeatedEndpointConfPairs` are workspace config, not endpoint config (HIGH)
- **Where:** `model.ts:1027, 1385`. Used inside
  `GetWorkspaceWarehouseConfigResponse.dataAccessConfig`
  (`model.ts:1304`, workspace-scoped) and `globalParam`
  (`model.ts:1316`, also workspace-scoped).
- **Why flagged:** The type name says "endpoint conf" but the
  scope is workspace.
- **Suggestion:** Rename to `WorkspaceConfigPair` or
  `ConfigPair`.

#### F3.3 — `ChannelName` enum used for the channel's "version selector" (LOW)
- **Where:** `model.ts:8`.
- **Why flagged:** Enum is named `ChannelName` (suggesting just
  the "name"), but the values include `CUSTOM` and a
  release-channel concept. `ChannelType` would be more
  accurate.
- **Suggestion:** Rename to `ChannelType` or `WarehouseChannel`.

#### F3.4 — `creatorName` is documented as "warehouse creator name" but lives on Create + Edit + Get (LOW)
- **Where:** `model.ts:846, 993, 1112, 1247`.
- **Why flagged:** The field is settable on
  `CreateWarehouseRequest`/`EditWarehouseRequest`, but its meaning
  is read-only on the server side ("creator" never changes after
  create). Surfacing it as settable on `Edit` is misleading.
- **Suggestion:** Spec-level. Mark read-only on response types
  only.

#### F3.5 — Waiter `done` returns true on terminal failure states (MEDIUM)
- **Where:** `client.ts:729, 802, 875, 943` (the `done()` of
  each Waiter).
- **Why flagged:** `done()` returns `true` for `RUNNING`,
  `STOPPED`, `DELETED` indiscriminately (`client.ts:743-746`). A
  caller who reads "done()" expects success, but `DELETED` is a
  failure for `CreateWarehouseWaiter`/`StartWarehouseWaiter`. The
  wait() method correctly distinguishes (throws on
  STOPPED/DELETED at `client.ts:711-714`), but done() does not.
- **Suggestion:** Either rename `done()` to `terminal()` /
  `settled()` (clearly signals "stopped progressing", not
  "succeeded"), or split into `done()` (succeeded) and
  `terminal()` (any terminal state). Cross-cutting waiter API
  decision.

---

### 4. Redundant suffixes

#### F4.1 — `Request` suffix on every request interface (HIGH, generator-driven)
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
  belt-and-suspenders signal. Every request type in the package
  carries the suffix, so the concern is the redundancy itself,
  not consistency.
- **Suggestion:** Drop the `Request` suffix across the SDK at
  the generator level. Generator-level.

#### F4.2 — `Name` suffix on `ChannelName` enum (MEDIUM)
- **Where:** `model.ts:8`.
- **Why flagged:** Both `ChannelName.CHANNEL_NAME_PREVIEW` (the
  enum) and the `name` field on `Channel` of type `ChannelName`
  — three layers of "name". The enum is more accurately a
  "Channel Type".
- **Suggestion:** Rename the enum to `ChannelType` (this also
  clarifies intent — Custom vs. Preview is the *type* of channel).

#### F4.3 — `Pair` suffix on `EndpointTagPair`, `EndpointConfPair`, `WarehouseTypePair` (MEDIUM)
- **Where:** `model.ts:1155, 1027, 1483`.
- **Why flagged:** "Pair" is a generic suffix that adds little
  information when the type's two fields are obvious. For
  `EndpointTagPair` (`key`, `value`), the suffix duplicates the
  shape already evident from the fields.
- **Suggestion:** Rename `EndpointTagPair` → `Tag`,
  `EndpointConfPair` → `Config`, `WarehouseTypePair` →
  `WarehouseTypeAvailability` (or similar) — semantically clearer
  than the `Pair` suffix.

---

### 5. Go/Java-style names

#### F5.1 — `req`, `resp`, `opts` Go abbreviations (LOW)
- **Where:** `client.ts` throughout.
- **Why flagged:** Go convention is `req`, `resp`, `opts`; TS
  convention is `request`, `response`, `options`. SDK already
  uses `options` (full word) so the abbreviation is inconsistent
  within the same method signature.
- **Suggestion:** Generator-level.

#### F5.2 — `for (;;)` C-style infinite loop (LOW, generator-driven)
- **Where:** `client.ts:438, 496`.
- **Why flagged:** `for (;;)` is C/Go idiom; TS prefers
  `while (true)` for readability. Minor.
- **Suggestion:** Generator-level.

---

### 6. Inconsistent action verbs

#### F6.1 — `Edit` vs. `Update` (HIGH)
- **Where:** `editWarehouse` (`client.ts:284`) vs.
  `updateDefaultWarehouseOverride` (`client.ts:632`). Same
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

---

### 7. Type-suffix tautology

#### F7.1 — `Channel.name: ChannelName` (HIGH)
- **Where:** `model.ts:763-766`.
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
  the tautology between the field and its enum type. See F3.3 /
  F4.2.

#### F7.2 — `WarehouseTypePair.warehouseType: WarehouseType` (HIGH)
- **Where:** `model.ts:1483-1490`.
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
