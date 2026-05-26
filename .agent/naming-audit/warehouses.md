# Naming Audit: `warehouses` (v1)

**Package:** `@databricks/sdk-warehouses`
**Path:** `/home/parth.bansal/sdk-js/packages/warehouses/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist. Each finding lists the offending identifier(s), the
category number, severity (`HIGH` / `MEDIUM` / `LOW`), and a concrete
rename suggestion. Findings are grouped by category. Generator-driven
items are flagged as `LOW` because they are codified across the entire
generated SDK surface — they should be fixed at the generator, not by
hand-editing this package.

**Special historical context:** SQL Warehouses were renamed from
"SQL Endpoints" (legacy term). The proto definitions still use
`Endpoint`/`endpoint` extensively (state, health, security policy,
tags, conf pairs, info). The current customer-facing brand is
"warehouse", so leftover `Endpoint*` identifiers are misleading.
This is the dominant theme of the audit (see F0).

## Summary

| Severity | Count |
| ----------- | ----- |
| High        |    21 |
| Medium      |    10 |
| Low         |    40 |
| Observation |    17 |
| **Total**   | **88** |

---

## Inventory

### Package identity

| Item            | Value                                       |
| --------------- | ------------------------------------------- |
| Package name    | `@databricks/sdk-warehouses`                |
| Directory       | `packages/warehouses/`                      |
| Subpath export  | `./v1`                                      |
| REST base paths | `/api/2.0/sql/warehouses`, `/api/2.0/sql/config/warehouses`, `/api/warehouses/v1/default-warehouse-overrides` |
| Concept         | SQL Warehouses (formerly SQL Endpoints) and default warehouse overrides |

### Enums (`model.ts`)

| Name                            | Members                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ChannelName`                   | `CHANNEL_NAME_UNSPECIFIED`, `CHANNEL_NAME_PREVIEW`, `CHANNEL_NAME_CURRENT`, `CHANNEL_NAME_PREVIOUS`, `CHANNEL_NAME_CUSTOM`            |
| `DefaultWarehouseOverrideType`  | `DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED`, `LAST_SELECTED`, `CUSTOM`                                                              |
| `EndpointSecurityPolicy`        | `NONE`, `DATA_ACCESS_CONTROL`, `PASSTHROUGH`                                                                                         |
| `EndpointSpotInstancePolicy`    | `POLICY_UNSPECIFIED`, `COST_OPTIMIZED`, `RELIABILITY_OPTIMIZED`                                                                      |
| `EndpointState`                 | `STARTING`, `RUNNING`, `STOPPING`, `STOPPED`, `DELETING`, `DELETED`                                                                  |
| `TerminationCode`               | ~150 values (`UNKNOWN`, `USER_REQUEST`, `JOB_FINISHED`, `INACTIVITY`, ... `HIVEMETASTORE_CONNECTIVITY_FAILURE`)                       |
| `TerminationType`               | `SUCCESS`, `CLIENT_ERROR`, `SERVICE_FAULT`, `CLOUD_FAILURE`                                                                          |
| `WarehouseType`                 | `TYPE_UNSPECIFIED`, `CLASSIC`, `PRO`                                                                                                 |
| `EndpointHealth_Status`         | `STATUS_UNSPECIFIED`, `HEALTHY`, `DEGRADED`, `FAILED`                                                                                |

### Interfaces (`model.ts`)

`Channel`, `CreateDefaultWarehouseOverrideRequest`, `CreateWarehouseRequest`,
`CreateWarehouseRequest_Response`, `DefaultWarehouseOverride`,
`DeleteDefaultWarehouseOverrideRequest`, `EditWarehouseRequest`,
`EditWarehouseRequest_Response`, `EndpointConfPair`, `EndpointHealth`,
`EndpointInfo`, `EndpointTagPair`, `EndpointTags`,
`GetDefaultWarehouseOverrideRequest`, `GetWarehouseRequest`,
`GetWarehouseRequest_Response`, `GetWorkspaceWarehouseConfigRequest`,
`GetWorkspaceWarehouseConfigRequest_Response`,
`ListDefaultWarehouseOverridesRequest`,
`ListDefaultWarehouseOverridesResponse`, `OdbcParams`,
`RepeatedEndpointConfPairs`, `SetWorkspaceWarehouseConfigRequest`,
`SetWorkspaceWarehouseConfigRequest_Response`, `TerminationReason`,
`TerminationReason_ParametersEntry`,
`UpdateDefaultWarehouseOverrideRequest`, `WarehouseTypePair`,
`DeleteWarehouseRequest`, `DeleteWarehouseRequest_Response`,
`ListWarehousesRequest`, `ListWarehousesRequest_Response`,
`StartRequest`, `StartRequest_Response`, `StopRequest`,
`StopRequest_Response`.

### Schemas (`model.ts`)

`unmarshalChannelSchema`, `unmarshalCreateWarehouseRequest_ResponseSchema`,
`unmarshalDefaultWarehouseOverrideSchema`,
`unmarshalEditWarehouseRequest_ResponseSchema`,
`unmarshalEndpointConfPairSchema`, `unmarshalEndpointHealthSchema`,
`unmarshalEndpointInfoSchema`, `unmarshalEndpointTagPairSchema`,
`unmarshalEndpointTagsSchema`, `unmarshalGetWarehouseRequest_ResponseSchema`,
`unmarshalGetWorkspaceWarehouseConfigRequest_ResponseSchema`,
`unmarshalListDefaultWarehouseOverridesResponseSchema`,
`unmarshalOdbcParamsSchema`, `unmarshalRepeatedEndpointConfPairsSchema`,
`unmarshalSetWorkspaceWarehouseConfigRequest_ResponseSchema`,
`unmarshalTerminationReasonSchema`, `unmarshalWarehouseTypePairSchema`,
`unmarshalDeleteWarehouseRequest_ResponseSchema`,
`unmarshalListWarehousesRequest_ResponseSchema`,
`unmarshalStartRequest_ResponseSchema`,
`unmarshalStopRequest_ResponseSchema`, `marshalChannelSchema`,
`marshalCreateWarehouseRequestSchema`, `marshalDefaultWarehouseOverrideSchema`,
`marshalEditWarehouseRequestSchema`, `marshalEndpointConfPairSchema`,
`marshalEndpointTagPairSchema`, `marshalEndpointTagsSchema`,
`marshalRepeatedEndpointConfPairsSchema`,
`marshalSetWorkspaceWarehouseConfigRequestSchema`,
`marshalWarehouseTypePairSchema`, `marshalStartRequestSchema`,
`marshalStopRequestSchema`. Also exports
`defaultWarehouseOverrideFieldMask` helper and
`defaultWarehouseOverrideFieldMaskSchema` (private).

### Client methods (`client.ts`)

`createDefaultWarehouseOverride`, `createWarehouse`,
`createWarehouseWaiter`, `deleteDefaultWarehouseOverride`,
`deleteWarehouse`, `editWarehouse`, `editWarehouseWaiter`,
`getDefaultWarehouseOverride`, `getWarehouse`,
`getWorkspaceWarehouseConfig`, `listDefaultWarehouseOverrides`,
`listDefaultWarehouseOverridesIter`, `listWarehouses`,
`listWarehousesIter`, `setWorkspaceWarehouseConfig`, `startWarehouse`,
`startWarehouseWaiter`, `stopWarehouse`, `stopWarehouseWaiter`,
`updateDefaultWarehouseOverride`.

### Client classes (`client.ts`)

`Client`, `CreateWarehouseWaiter`, `EditWarehouseWaiter`,
`StartWarehouseWaiter`, `StopWarehouseWaiter`,
`StillRunningError` (private).

### Utility functions (`utils.ts`)

`executeCall`, `readAll` (private), `executeHttpCall`,
`buildHttpRequest`, `parseResponse`, `marshalRequest`,
`flattenQueryParams`.

### Utility types/interfaces (`utils.ts`)

`HttpCallOptions`.

---

## F0 — Package-level: legacy "Endpoint" terminology leaks through the warehouse package

This is the dominant finding for this package and should be read
before the categorized findings below. The package brand is
"warehouse" — every URL is `/sql/warehouses` and customer JSDoc uses
"SQL warehouse" — yet the proto types still use `Endpoint*` as a
prefix for state, health, tags, conf pairs, security policy, spot
instance policy, and the row record (`EndpointInfo`). The result is
a public surface in which `listWarehouses` returns
`EndpointInfo[]`, `getWarehouse` returns a value with an `endpoint`-
flavored health type, and the per-warehouse state machine is
`EndpointState`. This is historical baggage: SQL Warehouses were
formerly called SQL Endpoints, and the legacy names persist in the
proto. Every `Endpoint*` identifier in this package is flagged
below (F1.1, F1.2, F1.3, F1.4, F1.5, F12.x, F15.x). Renames should
happen at the proto / spec level to preserve wire-format
compatibility while updating the customer-visible type names.

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
  `Warehouse*` (see F1.x, F12.x). Reconcile with the package brand.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `EndpointInfo` type name (HIGH)
- **Where:** `model.ts:979`, `index.ts:34`, return field
  `warehouses?: EndpointInfo[]` on `ListWarehousesRequest_Response`
  (`model.ts:1455`), yield type of `listWarehousesIter`
  (`client.ts:466`).
- **Why flagged:** Misleading legacy name. The type represents
  a SQL warehouse (it has `clusterSize`, `warehouseType`,
  `jdbcUrl`, `numClusters`, etc.), but the type is named
  `EndpointInfo`. Same root concept as `GetWarehouseRequest_Response`,
  which has identical field set — so the type name should
  match.
- **Suggestion:** Rename to `Warehouse` (the resource itself) or
  `WarehouseInfo` if backward parity matters. Mirror
  `GetWarehouseRequest_Response` shape into a single canonical type
  (see F12.1).

#### F1.2 — `EndpointState` enum name (HIGH)
- **Where:** `model.ts:87`, `index.ts:16`. Used in
  `EndpointInfo.state`, `GetWarehouseRequest_Response.state`, and as
  the poll-target inside every Waiter (`client.ts:662, 665, 666,
  704, ...`).
- **Why flagged:** The states themselves (`RUNNING`, `STOPPING`,
  `STOPPED`, `DELETING`, `DELETED`, `STARTING`) are warehouse
  states. JSDoc on the enum says "State of a warehouse." but the
  type is named `EndpointState`. The mismatch forces every
  customer-facing waiter to import `EndpointState` then check
  `EndpointState.RUNNING` on a value whose type is warehouse.
- **Suggestion:** Rename to `WarehouseState`. The wire string can
  remain identical (server expects `"RUNNING"`, etc., not
  `"ENDPOINT_RUNNING"`), so this is a zero-cost rename at the
  spec level.

#### F1.3 — `EndpointHealth` interface and `EndpointHealth_Status` enum (HIGH)
- **Where:** `model.ts:966`, `model.ts:686`, `index.ts:20`.
  Field on `EndpointInfo.health` and
  `GetWarehouseRequest_Response.health`. JSDoc says "Health status of
  the endpoint" (`model.ts:967`).
- **Why flagged:** Same root issue as F1.1/F1.2. The health is
  of a warehouse, not an endpoint. The waiters use
  `pollResp.health?.summary` (`client.ts:667`) — a warehouse
  health message.
- **Suggestion:** Rename to `WarehouseHealth` /
  `WarehouseHealth_Status`.

#### F1.4 — `EndpointTags`, `EndpointTagPair` interface names (HIGH)
- **Where:** `model.ts:1093, 1088`, `index.ts:35, 36`. Field
  `tags?: EndpointTags` on `CreateWarehouseRequest`,
  `EditWarehouseRequest`, `EndpointInfo`,
  `GetWarehouseRequest_Response`.
- **Why flagged:** Same legacy naming. Tags are on warehouses,
  not endpoints. JSDoc says "key-value pairs that will be
  tagged on all resources … associated with this SQL warehouse"
  (`model.ts:789, 933, 1051, 1186`).
- **Suggestion:** Rename to `WarehouseTags` / `WarehouseTagPair`.

#### F1.5 — `EndpointConfPair`, `RepeatedEndpointConfPairs` (HIGH)
- **Where:** `model.ts:961, 1309`, `index.ts:32, 45`.
- **Why flagged:** Workspace-level SQL configuration parameters
  (`globalParam`, `sqlConfigurationParameters`, etc.) are not
  per-endpoint. They are workspace-scoped. The current name
  conflates the legacy "endpoint" term with workspace config.
- **Suggestion:** Rename `EndpointConfPair` → `ConfigPair` or
  `WarehouseConfigPair`. `RepeatedEndpointConfPairs` →
  `RepeatedConfigPairs`.

#### F1.6 — `EndpointSecurityPolicy`, `EndpointSpotInstancePolicy` (HIGH)
- **Where:** `model.ts:26, 55`, `index.ts:14, 15`. Field on
  `SetWorkspaceWarehouseConfigRequest.securityPolicy`,
  `GetWorkspaceWarehouseConfigRequest_Response.securityPolicy`,
  and `spotInstancePolicy` on each warehouse.
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
- **Suggestion:** Rename to `WarehouseChannel` /
  `WarehouseChannelName` (or `DbsqlChannel` /
  `DbsqlChannelName`). Note: the enum name `ChannelName`
  duplicates "name" — see F8.2.

#### F1.8 — `req` parameter name on every client method (LOW, Go-ism)
- **Where:** `client.ts:108, 152, 180, 196, 215, 243, 271, 287,
  312, 340, 371, 407, 425, 464, 482, 514, 539, 551, 576, 591`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is
  also generic.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). Cross-package decision.

#### F1.9 — `resp` local variable everywhere (LOW)
- **Where:** `client.ts` throughout (e.g. `resp:
  CreateWarehouseRequest_Response | undefined`).
- **Why flagged:** Same Go abbreviation as `req`. See F14.1.
- **Suggestion:** `response` for consistency. Generator-level.

#### F1.10 — `Client` class name (MEDIUM, cross-cutting)
- **Where:** `client.ts:78`, `index.ts:4`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  `import {Client} from '@databricks/sdk-warehouses'` is
  unqualified and routinely needs aliasing at the call site.
- **Suggestion:** Either keep `Client` and document the alias
  convention, or rename to `WarehousesClient` consistently
  across packages. Cross-cutting decision.

#### F1.11 — `code` field on `TerminationReason` (LOW)
- **Where:** `model.ts:1366`.
- **Why flagged:** `code` is generic; disambiguated by container
  type, but `terminationCode` would be clearer in isolation.
- **Suggestion:** Acceptable as-is given the containing type.
  Already typed against the `TerminationCode` enum, so renaming
  introduces redundancy. Leave.

#### F1.12 — `Call`, `Options` (imported, cross-package) (acceptable)
- **Where:** `utils.ts:3`, `client.ts:4`.
- These come from `@databricks/sdk-core/api`. Generic but
  intentional. Out of scope for this package's audit.

---

### 2. Redundant enum prefixes

_None._

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (acceptable, SDK-wide)
- **Where:** `id`, `defaultWarehouseOverrideId`, `warehouseId`,
  `runAsUserId`. Consistent lower-camel `Id`.
- **Suggestion:** No change.

#### F3.2 — `SQL` rendered as `Sql` in `sqlConfigurationParameters` (LOW)
- **Where:** `model.ts:1254, 1343`.
- **Why flagged:** `sqlConfigurationParameters` uses lowercase
  `sql`. The SDK applies "first letter cap, rest lower" for
  TLAs in camelCase — but the field starts the identifier and
  is rendered all lowercase. This is internally consistent with
  the rest of the SDK (`url`, `http`, `id` all lowercase when
  leading). Flag because the JSDoc and prose use uppercase
  "SQL" throughout — only the identifier deviates.
- **Suggestion:** No change to identifier. SDK-wide pattern.

#### F3.3 — `DBSQL` rendered as `Dbsql` in `dbsqlVersion` (LOW)
- **Where:** `model.ts:703`, `Channel.dbsqlVersion`.
- **Why flagged:** `DBSQL` is a Databricks-internal product
  name. Wire form is `dbsql_version` (all lowercase). TS form
  `dbsqlVersion` lowercases the whole acronym. Consistent with
  `sql`, `jdbc`, `odbc` elsewhere in this package.
- **Suggestion:** Acceptable; consistent with adjacent fields.

#### F3.4 — `JDBC` rendered as `jdbc` in `jdbcUrl` (acceptable)
- **Where:** `model.ts:1081, 1216`. Field `jdbcUrl`.
- **Why flagged:** Consistent with `http`, `url`. Lowercase
  acronyms in lower-camel. Note `Url` not `URL` (also lowercase
  TLA). Internally consistent.
- **Suggestion:** No change.

#### F3.5 — `ODBC` rendered in mixed forms (LOW)
- **Where:** `model.ts:1083, 1218, 1302`. Type `OdbcParams`
  (Pascal case, "Odbc" mixed); field `odbcParams` (lower-camel
  "odbc").
- **Why flagged:** Type uses `Odbc` (first letter cap, rest
  lowercase); field uses `odbc` (all lowercase, leading
  position). This is consistent with the SDK convention for
  TLAs in identifier-leading vs. middle positions, but a careful
  reader will notice the asymmetry.
- **Suggestion:** Acceptable; consistent with `HttpClient` vs.
  `httpClient` pattern. Leave.

#### F3.6 — `IAM` casing (acceptable, JSDoc only)
- **Where:** `model.ts:785, 929, 1047, 1182, 1240, 1329`.
- **Why flagged:** "IAM role" appears in JSDoc only; no
  identifier rendering.
- **Suggestion:** No change.

#### F3.7 — `URL` / `Url` (acceptable)
- **Where:** `client.ts` uses `url` consistently (leading
  position). Type `jdbcUrl` uses `Url`. Internally consistent.
- **Suggestion:** No change.

---

### 4. Underscores in TS identifiers

_None._

---

### 5. Cryptic abbreviations

#### F5.1 — `Conf` for configuration (`EndpointConfPair`, `configPair`, `dataAccessConfig`) (MEDIUM)
- **Where:** `model.ts:961, 1238, 1311, 1327`.
- **Why flagged:** "Conf" is an abbreviation. Inconsistent
  within the package: `RepeatedEndpointConfPairs` has both
  `configPair` and `configurationPairs` (the latter is
  spelled out). The package alternates between `Conf`,
  `Config`, `Configuration`.
- **Suggestion:** Standardize on `Config` (already in
  `dataAccessConfig`). Rename `EndpointConfPair` → `ConfigPair`.

#### F5.2 — `Num` for number (`numClusters`, `numActiveSessions`, `maxNumClusters`, `minNumClusters`) (LOW)
- **Where:** `model.ts:760, 771, 1022, 1033, 1075, 1077, 1157, 1168, 1210, 1212`.
- **Why flagged:** "Num" is a programmer-ism. SDK and other
  packages occasionally spell it out as `count` or `number`.
- **Suggestion:** Acceptable; widely used across the API. Note
  that `numActiveSessions` is deprecated. Consider
  `clusterCount`, `activeSessionCount`, `maxClusterCount`,
  `minClusterCount` for clarity, but consistency with wire
  takes priority. Leave.

#### F5.3 — `Arn` for AWS Resource Name (`instanceProfileArn`) (acceptable)
- **Where:** `model.ts:786, 930, 1048, 1183, 1244, 1333`.
- **Why flagged:** `ARN` is a well-known AWS acronym. Casing
  matches `instanceProfileArn` (first letter cap, rest lower).
  No issue.
- **Suggestion:** No change.

#### F5.4 — `Conf` vs. `Config` vs. `Configuration` (MEDIUM, internal inconsistency)
- **Where:** Repeated across `EndpointConfPair`,
  `dataAccessConfig`, `sqlConfigurationParameters`,
  `configPair`, `configurationPairs`, `globalParam`,
  `configParam`.
- **Why flagged:** Three different ways to write the same word
  in the same file. Confusing.
- **Suggestion:** Pick one. Suggest `Config` for short field
  names, `Configuration` for spelled-out prose. Or fully
  spell out everywhere.

#### F5.5 — `req`, `resp` Go-ism abbreviations (LOW)
- **Where:** `client.ts` throughout.
- Already covered in F1.8 and F1.9.

---

### 6. Misleading names

#### F6.1 — `EndpointInfo` for a warehouse record (HIGH)
- **Where:** `model.ts:979`.
- Covered in F1.1 / F0. The most glaring example: a value of
  type `EndpointInfo` is a warehouse, not an endpoint.
- **Suggestion:** Rename to `Warehouse` or `WarehouseInfo`.

#### F6.2 — `EndpointState` for warehouse states (HIGH)
- Covered in F1.2 / F0.

#### F6.3 — `EndpointHealth` for warehouse health (HIGH)
- Covered in F1.3 / F0.

#### F6.4 — `EndpointTags` / `EndpointTagPair` for warehouse tags (HIGH)
- Covered in F1.4 / F0.

#### F6.5 — `EndpointConfPair` / `RepeatedEndpointConfPairs` are workspace config, not endpoint config (HIGH)
- **Where:** `model.ts:961, 1309`. Used inside
  `GetWorkspaceWarehouseConfigRequest_Response.dataAccessConfig`
  (workspace-scoped) and `globalParam` (also workspace-scoped).
- **Why flagged:** Field name says "endpoint conf" but the
  scope is workspace.
- **Suggestion:** Rename to `WorkspaceConfigPair` or
  `ConfigPair`.

#### F6.6 — `ChannelName` enum used for the channel's "version selector" (LOW)
- **Where:** `model.ts:7`.
- **Why flagged:** Enum is named `ChannelName` (suggesting just
  the "name"), but the values include `CUSTOM` and a
  release-channel concept. `ChannelType` would be more
  accurate.
- **Suggestion:** Rename to `ChannelType` or `WarehouseChannel`.

#### F6.7 — `Channel.dbsqlVersion` as the override mechanism (LOW)
- **Where:** `model.ts:703`.
- **Why flagged:** Field is required only when `name` is
  `CHANNEL_NAME_CUSTOM`. JSDoc on the parent says so. Name
  itself does not convey the conditional contract.
- **Suggestion:** Add JSDoc; field name is fine.

#### F6.8 — `instanceProfileArn` JSDoc says "Deprecated" but field remains (LOW)
- **Where:** `model.ts:786, 930, 1048, 1183`.
- **Why flagged:** Identifier carries no `_DEPRECATED` marker;
  only JSDoc. Customer code completion shows it as a normal
  field.
- **Suggestion:** Add `@deprecated` JSDoc tag (separate from
  prose) so IDEs strike it through.

#### F6.9 — `creatorName` is documented as "warehouse creator name" but lives on Create + Edit + Get (LOW)
- **Where:** `model.ts:784, 928, 1046, 1181`.
- **Why flagged:** The field is settable on
  `CreateWarehouseRequest`/`EditWarehouseRequest`, but its meaning
  is read-only on the server side ("creator" never changes after
  create). Surfacing it as settable on `Edit` is misleading.
- **Suggestion:** Spec-level. Mark read-only on response types
  only.

#### F6.10 — `EndpointHealth.message` is "Deprecated" prose but no marker (LOW)
- **Where:** `model.ts:970`.
- Same pattern as F6.8.

#### F6.11 — Waiter `done` returns true on terminal failure states (MEDIUM)
- **Where:** `client.ts:690, 770, 850, 925` (the `done()` of
  each Waiter).
- **Why flagged:** `done()` returns `true` for `RUNNING`,
  `STOPPED`, `DELETED` indiscriminately. A caller who reads
  "done()" expects success, but `DELETED` is a failure for
  `CreateWarehouseWaiter`/`StartWarehouseWaiter`. The wait()
  method correctly distinguishes (throws on
  STOPPED/DELETED), but done() does not.
- **Suggestion:** Either rename `done()` to `terminal()` /
  `settled()` (clearly signals "stopped progressing", not
  "succeeded"), or split into `done()` (succeeded) and
  `terminal()` (any terminal state). Cross-cutting waiter API
  decision.

---

### 7. Overly verbose

#### F7.1 — `CreateDefaultWarehouseOverrideRequest`, `GetDefaultWarehouseOverrideRequest`, `UpdateDefaultWarehouseOverrideRequest`, `DeleteDefaultWarehouseOverrideRequest`, `ListDefaultWarehouseOverridesRequest`, `ListDefaultWarehouseOverridesResponse` (MEDIUM)
- **Where:** `model.ts:707, 1098, 1380, 847, 1273, 1292`.
- **Why flagged:** All AIP-style "DefaultWarehouseOverride"
  resources. The names are accurate but very long
  (39-48 characters). The matching client methods
  (`createDefaultWarehouseOverride`,
  `listDefaultWarehouseOverridesIter`) inherit the same length.
- **Suggestion:** Acceptable; AIP-compliant. Aliasing at the
  call site is the typical workaround.

#### F7.2 — `defaultWarehouseOverrideFieldMask` (LOW)
- **Where:** `model.ts:1995`.
- **Why flagged:** Long, but consistent with the AIP-style
  resource name. Acceptable.

---

### 8. Redundant suffixes

#### F8.1 — `Request` suffix on every request interface (HIGH, generator-driven)
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

#### F8.2 — `Name` suffix on `ChannelName` enum (MEDIUM)
- **Where:** `model.ts:7`.
- **Why flagged:** Both `ChannelName.CHANNEL_NAME_PREVIEW` (the
  enum) and the `name` field on `Channel` of type `ChannelName`
  — three layers of "name". The enum is more accurately a
  "Channel Type".
- **Suggestion:** Rename enum to `ChannelType`. Field
  `Channel.name` → `Channel.type` (this also clarifies
  intent — Custom vs. Preview is the *type* of channel).

#### F8.3 — `Pair` suffix on `EndpointTagPair`, `EndpointConfPair`, `WarehouseTypePair` (MEDIUM)
- **Where:** `model.ts:1088, 961, 1407`.
- **Why flagged:** "Pair" is a generic suffix that adds little
  information when the type's two fields are obvious. For
  `EndpointTagPair` (`key`, `value`), the suffix duplicates the
  shape already evident from the fields.
- **Suggestion:** Rename `EndpointTagPair` → `Tag`,
  `EndpointConfPair` → `Config`, `WarehouseTypePair` →
  `WarehouseTypeAvailability` (or similar) — wire-aligned but
  semantically clearer than the `Pair` suffix.

#### F8.4 — `Params` suffix on `OdbcParams` (LOW)
- **Where:** `model.ts:1302`.
- **Why flagged:** Mild noise. Type has `hostname`, `path`,
  `protocol`, `port` — `OdbcConnectionInfo` would be more
  accurate.
- **Suggestion:** Acceptable as-is; `OdbcParams` follows
  the standard "parameters" terminology.

---

### 9. Singular / plural mismatches

#### F9.1 — `TerminationReason.parameters` is a map, not a list (LOW)
- **Where:** `model.ts:1370`. Type `Record<string, string>`.
- **Why flagged:** `parameters` is plural but typed as a map.
  Plural maps are fine but inconsistent — compare to
  `globalParam` / `configParam` which are singular.
- **Suggestion:** Acceptable; map semantics are clear from the
  type. Plural is correct.

#### F9.2 — `enabledWarehouseTypes` plural array (acceptable)
- **Where:** `model.ts:1269, 1358`.
- **Why flagged:** Plural name + array type. Correct.
- **Suggestion:** No change.

#### F9.3 — `defaultWarehouseOverrides` plural array (acceptable)
- **Where:** `model.ts:1294`.
- **Why flagged:** Correct.
- **Suggestion:** No change.

#### F9.4 — `warehouses` plural array (acceptable)
- **Where:** `model.ts:1455`. Correct.

#### F9.5 — `customTags` plural array (acceptable)
- **Where:** `model.ts:1094`. Correct.

---

### 10. Reserved-word collisions

#### F10.1 — `type` field (LOW)
- **Where:** `DefaultWarehouseOverride.type` (`model.ts:838`),
  `TerminationReason.type` (`model.ts:1368`).
- **Why flagged:** `type` is a TS keyword in certain positions
  (the `type` modifier in type imports), but valid as a
  property name. No actual collision. Some linters warn.
- **Suggestion:** Acceptable; common pattern in TS APIs.

#### F10.2 — `name`, `id` (acceptable)
- Common property names; not reserved.

#### F10.3 — `delete` not used as identifier (acceptable)
- Used only as method name `deleteWarehouse`,
  `deleteDefaultWarehouseOverride` — fine in TS (verb prefix).

#### F10.4 — `default-warehouse-overrides` URL segment vs. `default` TS keyword (acceptable)
- **Where:** Path string only. Not an identifier.

---

### 11. Empty / trivial wrapper types

_None. Wrappers are retained for forward compatibility._

---

### 12. Duplicate concepts / historical baggage

#### F12.1 — `EndpointInfo` and `GetWarehouseRequest_Response` are the same record (HIGH)
- **Where:** `model.ts:979` and `model.ts:1114`.
- **Why flagged:** Both types have identical field sets (~20
  identical fields). One is the per-warehouse record in
  `listWarehouses`, the other is the result of `getWarehouse`.
  Duplicating the shape across two types means every change has
  to happen in two places.
- **Suggestion:** Collapse into one type (call it `Warehouse`).
  `GetWarehouseRequest_Response = Warehouse`. `EndpointInfo` removed.
  Generator-level.

#### F12.2 — `CreateWarehouseRequest` and `EditWarehouseRequest` are nearly identical (HIGH)
- **Where:** `model.ts:719` and `model.ts:861`.
- **Why flagged:** `EditWarehouseRequest` is `CreateWarehouseRequest
  + id`. All other fields identical. Duplicating the shape.
- **Suggestion:** Have `EditWarehouseRequest` extend
  `CreateWarehouseRequest` with `id` added. Reduces drift.

#### F12.3 — `SetWorkspaceWarehouseConfigRequest` and
`GetWorkspaceWarehouseConfigRequest_Response` are identical (HIGH)
- **Where:** `model.ts:1320` and `model.ts:1231`.
- **Why flagged:** Same field set on both. Same legacy
  `globalParam`, `configParam` deprecated pair on both.
- **Suggestion:** Generate as `WorkspaceWarehouseConfig` type
  used by both methods. Generator-level.

#### F12.4 — Legacy `Endpoint*` naming for a `Warehouse*` concept (HIGH)
- Covered in F0 and F1.x. Listed here for completeness in
  category 12: the entire `Endpoint*` family is historical
  baggage from the rename of "SQL Endpoints" to "SQL Warehouses".

#### F12.5 — `numActiveSessions` deprecated field still on response types (LOW)
- **Where:** `model.ts:1077, 1212`.
- **Why flagged:** JSDoc says "Deprecated. current number of
  active sessions for the warehouse". Carries no `@deprecated`
  tag.
- **Suggestion:** Add `@deprecated`. Schedule for removal.

#### F12.6 — `EndpointHealth.message` deprecated (LOW)
- **Where:** `model.ts:970`. Same pattern.

#### F12.7 — `instanceProfileArn` deprecated (LOW)
- **Where:** `model.ts:786, 930, 1048, 1183`. Same.

#### F12.8 — `globalParam`, `configParam` deprecated in favor of
`sqlConfigurationParameters` (LOW)
- **Where:** `model.ts:1250, 1252, 1339, 1341`. Same.

#### F12.9 — `ListWarehousesRequest.runAsUserId` deprecated and ignored (LOW)
- **Where:** `model.ts:1438`. JSDoc says "Deprecated: this field
  is ignored by the server."
- **Suggestion:** Add `@deprecated` and consider removal.

#### F12.10 — Workspace config endpoint duplicates per-warehouse fields (MEDIUM)
- **Where:** `instanceProfileArn`, `channel`,
  `enableServerlessCompute` all appear in both per-warehouse
  (`CreateWarehouseRequest`) and workspace
  (`SetWorkspaceWarehouseConfigRequest`) types.
- **Why flagged:** The same field name maps to two different
  conceptual levels (per-warehouse override vs. workspace
  default). A reader can't tell from the field name alone.
- **Suggestion:** Document the dual presence in JSDoc.

---

### 13. Verb-tense inconsistency

#### F13.1 — `Create*`, `Delete*`, `Edit*`, `Update*`, `Get*`, `Set*`,
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
- **Suggestion:** See F17 below — same root cause.

---

### 14. Go/Java-style names

#### F14.1 — `req`, `resp`, `opts` Go abbreviations (LOW)
- **Where:** `client.ts` throughout; `utils.ts:30, 47, 60, 66`.
- **Why flagged:** Go convention is `req`, `resp`, `opts`; TS
  convention is `request`, `response`, `options`. SDK already
  uses `options` (full word) so the abbreviation is inconsistent
  within the same method signature.
- **Suggestion:** Generator-level.

#### F14.2 — `for (;;)` C-style infinite loop (LOW, generator-driven)
- **Where:** `client.ts:411, 468`, `utils.ts:48`.
- **Why flagged:** `for (;;)` is C/Go idiom; TS prefers
  `while (true)` for readability. Minor.
- **Suggestion:** Generator-level.

---

### 15. Generic field names losing meaning

#### F15.1 — `state` field on `EndpointInfo` / `GetWarehouseRequest_Response` (LOW)
- **Where:** `model.ts:1079, 1214`.
- **Why flagged:** Disambiguated by type
  (`EndpointState`), but `warehouseState` would be clearer in
  isolation.
- **Suggestion:** Leave.

#### F15.2 — `status` field on `EndpointHealth` (LOW)
- **Where:** `model.ts:968`. Type `EndpointHealth_Status`.
- **Why flagged:** Reads "endpoint health . status .
  endpoint health status". Three layers of "status".
- **Suggestion:** Acceptable given typing.

#### F15.3 — `enabled` field on `WarehouseTypePair` (LOW)
- **Where:** `model.ts:1413`.
- **Why flagged:** Generic, but disambiguated by container.
- **Suggestion:** Leave.

#### F15.4 — `summary` field on `EndpointHealth` (LOW)
- **Where:** `model.ts:974`.
- **Why flagged:** Generic. JSDoc says "short summary of the
  health status". Could be `summaryMessage` or
  `healthSummary`, but field is rarely used in isolation.
- **Suggestion:** Leave.

#### F15.5 — `key`, `value` on every `*Pair` type (LOW)
- **Where:** `EndpointConfPair`, `EndpointTagPair`,
  `TerminationReason_ParametersEntry`.
- **Why flagged:** Maximally generic. Domain is in the
  container type name.
- **Suggestion:** Acceptable; conventional for key-value pair
  types.

#### F15.6 — `code`, `type`, `parameters` on `TerminationReason` (LOW)
- **Where:** `model.ts:1366, 1368, 1370`.
- **Why flagged:** All three are generic words. Disambiguated
  by container.
- **Suggestion:** Leave.

#### F15.7 — `host`, `path`, `protocol`, `port` on `OdbcParams` (LOW)
- **Where:** `model.ts:1303-1306`.
- **Why flagged:** Generic connection-string fields. Standard.
- **Suggestion:** Leave.

---

### 16. Field contradicting type domain

#### F16.1 — `cluster*` fields on warehouse types (HIGH)
- **Where:** `CreateWarehouseRequest.clusterSize` (`model.ts:746`),
  `minNumClusters` (`model.ts:760`), `maxNumClusters`
  (`model.ts:771`), `numClusters` (`model.ts:1075`); same on
  `EditWarehouseRequest`, `EndpointInfo`,
  `GetWarehouseRequest_Response`. JSDoc: "Logical name for the
  cluster" (`model.ts:721`).
- **Why flagged:** A SQL Warehouse exposes "cluster" terminology
  internally because the warehouse is implemented atop Spark
  clusters. To the customer, this is "warehouse size",
  "warehouse cluster count", etc. The names leak
  implementation.
- **Suggestion:** Rename for clarity:
  - `clusterSize` → `warehouseSize` (the literal customer doc
    term).
  - `minNumClusters` → `minWarehouseInstances`?
  - This is a wire-level rename. Considered intentional —
    cluster terminology is documented externally. Leave with
    a JSDoc note. Flag for future spec consideration.

#### F16.2 — `creatorName` references the cluster (LOW)
- **Where:** `model.ts:784, 928, 1046, 1181`.
- **Why flagged:** JSDoc says "warehouse creator name"; field
  name `creatorName` doesn't conflict but doesn't say what
  resource is being created either.
- **Suggestion:** Acceptable.

#### F16.3 — `EndpointSpotInstancePolicy.RELIABILITY_OPTIMIZED` is misnamed (LOW)
- **Where:** `model.ts:80`.
- **Why flagged:** Per JSDoc, on Azure it makes no difference
  (both On Demand) — only AWS distinguishes. The name implies
  reliability is universally improved, but on Azure it is a
  no-op.
- **Suggestion:** Document; rename optional.

---

### 17. Inconsistent action verbs

#### F17.1 — `Edit` vs. `Update` (HIGH)
- **Where:** `editWarehouse` (`client.ts:242`) vs.
  `updateDefaultWarehouseOverride` (`client.ts:590`). Same
  package, two different "modify resource" verbs.
- **Why flagged:** Warehouses use `edit`; default warehouse
  overrides use `update`. CRUD-style APIs across the SDK use
  "update"; the warehouse `edit` is a legacy form. Compounded
  by `Editor`-ish naming on types: `EditWarehouseRequest`,
  `EditWarehouseRequest_Response`, `EditWarehouseWaiter`.
- **Suggestion:** Standardize on `update` across the SDK.
  Rename `editWarehouse` → `updateWarehouse`,
  `EditWarehouseRequest` → `UpdateWarehouseRequest`,
  `EditWarehouseWaiter` → `UpdateWarehouseWaiter`. Note: this is
  a wire/API-level rename — coordinate with backend.

#### F17.2 — `Start` and `Stop` as method names (acceptable)
- **Where:** `startWarehouse`, `stopWarehouse`.
- **Why flagged:** Pair of opposites; standard for state
  machines. Good.
- **Suggestion:** No change.

#### F17.3 — `Set` (`setWorkspaceWarehouseConfig`) vs. `Update` (LOW)
- **Where:** `client.ts:481`.
- **Why flagged:** `set` semantically means "replace entire
  resource"; `update` means "patch fields". Both apply here.
  `setWorkspaceWarehouseConfig` uses PUT (full replace) —
  `set` is correct.
- **Suggestion:** No change. But document the PUT semantics in
  JSDoc.

#### F17.4 — `Create` and `Delete` (acceptable)
- Standard CRUD. No issue.

---

### 18. Long enum values

_None._

---

### 19. Underspecified IDs

#### F19.1 — `defaultWarehouseOverrideId` vs. `warehouseId` on
`DefaultWarehouseOverride` (LOW)
- **Where:** `model.ts:836, 843`.
- **Why flagged:** Two ID fields on one type:
  `defaultWarehouseOverrideId` (the override's own ID) and
  `warehouseId` (the warehouse referenced *by* the override).
  Both are clearly named, but a reader has to look carefully.
- **Suggestion:** Acceptable; both names are explicit.

#### F19.2 — `runAsUserId` on `ListWarehousesRequest` (deprecated) (LOW)
- **Where:** `model.ts:1438`. Already deprecated. Numeric (`number`),
  not string — unusual; most IDs in the SDK are string.
- **Suggestion:** Already deprecated. Leave.

#### F19.3 — `ListDefaultWarehouseOverridesResponse.nextPageToken` (acceptable)
- **Where:** `model.ts:1299`. Standard pagination identifier.

---

### 20. Type-suffix tautology

#### F20.1 — `Channel.name: ChannelName` (HIGH)
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
- **Suggestion:** Rename enum to `ChannelType`; rename field
  to `type`. See F6.6 / F8.2.

#### F20.2 — `EndpointHealth.status: EndpointHealth_Status` (LOW)
- **Where:** `model.ts:968`.
- **Why flagged:** Field name `status` + enum suffix `Status`
  + interface "Health Status" namespace. Disambiguated by
  typing.
- **Suggestion:** Acceptable; standard pattern.

#### F20.3 — `WarehouseTypePair.warehouseType: WarehouseType` (HIGH)
- **Where:** `model.ts:1407-1413`.
  ```ts
  export interface WarehouseTypePair {
    warehouseType?: WarehouseType | undefined;
    enabled?: boolean | undefined;
  }
  ```
- **Why flagged:** Field name and type name are nearly
  identical. Reads "warehouse-type pair . warehouse type =
  WarehouseType.PRO". Two layers of "warehouse type".
- **Suggestion:** Rename field to `type` (or rename type to
  `Type`). E.g. `WarehouseTypeAvailability { type, enabled }`.

#### F20.4 — `TerminationReason.code: TerminationCode` (LOW)
- **Where:** `model.ts:1366`. Field `code` + enum suffix `Code`
  on `TerminationCode`. Generic field name with specific enum
  — acceptable per F1.11.

#### F20.5 — `TerminationReason.type: TerminationType` (LOW)
- **Where:** `model.ts:1368`. Same pattern. Acceptable.

#### F20.6 — `DefaultWarehouseOverride.type: DefaultWarehouseOverrideType` (LOW)
- **Where:** `model.ts:838`.
- **Why flagged:** Field `type` typed as
  `DefaultWarehouseOverrideType`. Container type already says
  "DefaultWarehouseOverride", so the field's type duplicates
  the container's name + adds "Type". Acceptable in practice.

---

## Cross-cutting summary

### Highest-leverage fixes

1. **Resolve the `Endpoint*` legacy naming (F0, F1.1-F1.6,
   F6.1-F6.5, F12.4)** — rename every `Endpoint*` type to
   `Warehouse*` to align with the customer brand. Single biggest
   fix; cleans up ~10 type names across the package.
2. **Resolve `Edit` vs. `Update` (F17.1)** — pick one verb for
   "modify resource" across the SDK; standardize wire and TS.
3. **Collapse duplicate types (F12.1, F12.2, F12.3)** —
   `EndpointInfo` + `GetWarehouseRequest_Response`,
   `CreateWarehouseRequest` + `EditWarehouseRequest`,
   `Set*Config` + `Get*Config_Response`.

### Recurring themes

- **Generator-driven Go/proto idioms** (`req`/`resp`,
  `for(;;)`) are LOW because they are consistent across the
  entire SDK; fix at the generator.
- **Legacy `Endpoint*` naming** is the package-specific issue.
  It causes the most readability harm because the package
  brand is "warehouse" while half the types still say
  "endpoint". HIGH severity; spec-level rename.
- **Two unrelated resource families** (warehouses +
  default-warehouse-overrides) coexist in one package, with
  different REST base paths and different API conventions.
  Splitting could simplify.

---
