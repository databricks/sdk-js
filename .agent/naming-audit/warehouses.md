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
items (such as `_Response` underscore on proto-style nested messages)
are flagged as `LOW` because they are codified across the entire
generated SDK surface — they should be fixed at the generator, not by
hand-editing this package.

**Special historical context:** SQL Warehouses were renamed from
"SQL Endpoints" (legacy term). The proto definitions still use
`Endpoint`/`endpoint` extensively (state, health, security policy,
tags, conf pairs, info). The current customer-facing brand is
"warehouse", so leftover `Endpoint*` identifiers are misleading.
This is the dominant theme of the audit (see F0).

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
| `TerminationCode`               | ~150 values (`UNKNOWN`, `USER_REQUEST`, `JOB_FINISHED`, `INACTIVITY`, ... `CERT_ROTATION`)                                            |
| `TerminationType`               | `SUCCESS`, `CLIENT_ERROR`, `SERVICE_FAULT`, `CLOUD_FAILURE`                                                                          |
| `WarehouseType`                 | `TYPE_UNSPECIFIED`, `CLASSIC`, `PRO`, `REYDEN`                                                                                       |
| `EndpointHealth_Status`         | `STATUS_UNSPECIFIED`, `HEALTHY`, `DEGRADED`, `FAILED`                                                                                |

### Interfaces (`model.ts`)

`Channel`, `CreateDefaultWarehouseOverrideRequest`, `CreateWarehouse`,
`CreateWarehouse_Response`, `DefaultWarehouseOverride`,
`DeleteDefaultWarehouseOverrideRequest`, `EditWarehouseRequest`,
`EditWarehouseRequest_Response`, `EndpointConfPair`, `EndpointHealth`,
`EndpointInfo`, `EndpointTagPair`, `EndpointTags`,
`GetDefaultWarehouseOverrideRequest`, `GetWarehouse`,
`GetWarehouse_Response`, `GetWorkspaceWarehouseConfigRequest`,
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

`unmarshalChannelSchema`, `unmarshalCreateWarehouse_ResponseSchema`,
`unmarshalDefaultWarehouseOverrideSchema`,
`unmarshalEditWarehouseRequest_ResponseSchema`,
`unmarshalEndpointConfPairSchema`, `unmarshalEndpointHealthSchema`,
`unmarshalEndpointInfoSchema`, `unmarshalEndpointTagPairSchema`,
`unmarshalEndpointTagsSchema`, `unmarshalGetWarehouse_ResponseSchema`,
`unmarshalGetWorkspaceWarehouseConfigRequest_ResponseSchema`,
`unmarshalListDefaultWarehouseOverridesResponseSchema`,
`unmarshalOdbcParamsSchema`, `unmarshalRepeatedEndpointConfPairsSchema`,
`unmarshalSetWorkspaceWarehouseConfigRequest_ResponseSchema`,
`unmarshalTerminationReasonSchema`, `unmarshalWarehouseTypePairSchema`,
`unmarshalDeleteWarehouseRequest_ResponseSchema`,
`unmarshalListWarehousesRequest_ResponseSchema`,
`unmarshalStartRequest_ResponseSchema`,
`unmarshalStopRequest_ResponseSchema`, `marshalChannelSchema`,
`marshalCreateWarehouseSchema`, `marshalDefaultWarehouseOverrideSchema`,
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
- **Where:** `model.ts:1006`, `index.ts:33`, return field
  `warehouses?: EndpointInfo[]` on `ListWarehousesRequest_Response`
  (`model.ts:1482`), yield type of `listWarehousesIter`
  (`client.ts:460`).
- **Why flagged:** Misleading legacy name. The type represents
  a SQL warehouse (it has `clusterSize`, `warehouseType`,
  `jdbcUrl`, `numClusters`, etc.), but the type is named
  `EndpointInfo`. Same root concept as `GetWarehouse_Response`,
  which has identical field set — so the type name should
  match.
- **Suggestion:** Rename to `Warehouse` (the resource itself) or
  `WarehouseInfo` if backward parity matters. Mirror
  `GetWarehouse_Response` shape into a single canonical type
  (see F12.1).

#### F1.2 — `EndpointState` enum name (HIGH)
- **Where:** `model.ts:87`, `index.ts:16`. Used in
  `EndpointInfo.state`, `GetWarehouse_Response.state`, and as the
  poll-target inside every Waiter (`client.ts:656, 659, 660, 698,
  ...`).
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
- **Where:** `model.ts:993`, `model.ts:713`, `index.ts:20`.
  Field on `EndpointInfo.health` and
  `GetWarehouse_Response.health`. JSDoc says "Health status of
  the endpoint" (`model.ts:994`).
- **Why flagged:** Same root issue as F1.1/F1.2. The health is
  of a warehouse, not an endpoint. The waiters use
  `pollResp.health?.summary` (`client.ts:661`) — a warehouse
  health message.
- **Suggestion:** Rename to `WarehouseHealth` /
  `WarehouseHealth_Status`. The proto-nested style of
  `_Status` is a separate finding (F4.x).

#### F1.4 — `EndpointTags`, `EndpointTagPair` interface names (HIGH)
- **Where:** `model.ts:1115, 1120`, `index.ts:31, 32`. Field
  `tags?: EndpointTags` on `CreateWarehouse`,
  `EditWarehouseRequest`, `EndpointInfo`,
  `GetWarehouse_Response`.
- **Why flagged:** Same legacy naming. Tags are on warehouses,
  not endpoints. JSDoc says "key-value pairs that will be
  tagged on all resources … associated with this SQL warehouse"
  (`model.ts:815, 959, 1077, 1212`).
- **Suggestion:** Rename to `WarehouseTags` / `WarehouseTagPair`.

#### F1.5 — `EndpointConfPair`, `RepeatedEndpointConfPairs` (HIGH)
- **Where:** `model.ts:988, 1336`, `index.ts:30, 41`.
- **Why flagged:** Workspace-level SQL configuration parameters
  (`globalParam`, `sqlConfigurationParameters`, etc.) are not
  per-endpoint. They are workspace-scoped. The current name
  conflates the legacy "endpoint" term with workspace config.
- **Suggestion:** Rename `EndpointConfPair` → `ConfigPair` or
  `WarehouseConfigPair`. `RepeatedEndpointConfPairs` →
  `RepeatedConfigPairs` (the "Repeated" prefix is also a
  Go/proto-ism — see F14.3).

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
- **Where:** `model.ts:728, 7`, `index.ts:12, 24`.
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

#### F1.8 — `name` field used both as a human name and as a path identifier (HIGH)
- **Where:** `name` appears on `CreateWarehouse` (`model.ts:754`,
  "Logical name for the cluster"), `EditWarehouseRequest`
  (`model.ts:898`), `EndpointInfo` (`model.ts:1016`),
  `GetWarehouse_Response` (`model.ts:1151`),
  `DefaultWarehouseOverride` (`model.ts:861`,
  `default-warehouse-overrides/{default_warehouse_override_id}`),
  `DeleteDefaultWarehouseOverrideRequest` (`model.ts:880`),
  `GetDefaultWarehouseOverrideRequest` (`model.ts:1131`).
- **Why flagged:** Two semantically different things share the
  field name `name`. On warehouses, `name` is a human-readable
  display name ("My SQL warehouse"). On default-warehouse-
  overrides, `name` is the resource-name path identifier
  (`default-warehouse-overrides/123`). The latter is functionally
  an ID. Caller code paths in `client.ts:196, 287, 588` use
  `req.name` as the URL path segment for the override APIs.
- **Suggestion:** On the override types, rename `name` to
  `resourceName` and document the path-id role. Alternatively,
  document the dual role in JSDoc to make the contract explicit.

#### F1.9 — `req` parameter name on every client method (LOW, Go-ism)
- **Where:** `client.ts:108, 152, 177, 193, 212, 240, 268, 284,
  309, 334, 365, 401, 419, 458, 476, 508, 533, 545, 570, 585`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is
  also generic.
- **Suggestion:** Use `request` for stylistic consistency with
  `options` (which is spelled out). Cross-package decision.

#### F1.10 — `resp` local variable everywhere (LOW)
- **Where:** `client.ts` throughout (e.g. `resp:
  CreateWarehouse_Response | undefined`).
- **Why flagged:** Same Go abbreviation as `req`. See F14.1.
- **Suggestion:** `response` for consistency. Generator-level.

#### F1.11 — `Client` class name (MEDIUM, cross-cutting)
- **Where:** `client.ts:78`, `index.ts:4`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  `import {Client} from '@databricks/sdk-warehouses'` is
  unqualified and routinely needs aliasing at the call site.
- **Suggestion:** Either keep `Client` and document the alias
  convention, or rename to `WarehousesClient` consistently
  across packages. Cross-cutting decision.

#### F1.12 — `code` field on `TerminationReason` (LOW)
- **Where:** `model.ts:1393`.
- **Why flagged:** `code` is generic; disambiguated by container
  type, but `terminationCode` would be clearer in isolation.
- **Suggestion:** Acceptable as-is given the containing type.
  Already typed against the `TerminationCode` enum, so renaming
  introduces redundancy. Leave.

#### F1.13 — `type` field on `TerminationReason` and `DefaultWarehouseOverride` (LOW)
- **Where:** `model.ts:865, 1395`.
- **Why flagged:** `type` is one of the most generic identifier
  names possible. Both are typed against domain-specific enums,
  but the field name alone gives no hint.
- **Suggestion:** Acceptable given typing; `terminationType` /
  `overrideType` would be more self-documenting.

#### F1.14 — `parameters` field on `TerminationReason` (LOW)
- **Where:** `model.ts:1397`.
- **Why flagged:** `parameters` is generic. JSDoc says "list of
  parameters that provide additional information about why the
  cluster was terminated" — these are debug context, not request
  parameters.
- **Suggestion:** Rename to `details` or `context`. Currently
  conflicts with the `parameters` URL-query terminology used
  elsewhere in the SDK.

#### F1.15 — `details`, `message`, `summary` fields on `EndpointHealth` (LOW)
- **Where:** `model.ts:997, 1001, 1003`.
- **Why flagged:** Three generic prose fields. JSDoc clarifies:
  `message` is deprecated; `summary` is short; `details` is long.
  Their relationship is not obvious from names.
- **Suggestion:** Rename `details` → `errorDetails`. Keep `summary`
  and `message` (deprecated). Or merge `summary`+`details` into
  a single nested structure.

#### F1.16 — `customTags` field on `EndpointTags` (LOW)
- **Where:** `model.ts:1121`.
- **Why flagged:** "custom" is implied by the container type
  `EndpointTags` (vs. a more specific name). The field is just
  a list of tags, so the `custom` prefix adds no information
  the container does not already supply.
- **Suggestion:** Rename to `tags` (the container already
  conveys the "custom" scope).

#### F1.17 — `Call`, `Options` (imported, cross-package) (acceptable)
- **Where:** `utils.ts:3`, `client.ts:4`.
- These come from `@databricks/sdk-core/api`. Generic but
  intentional. Out of scope for this package's audit.

---

### 2. Redundant enum prefixes

#### F2.1 — `ChannelName.CHANNEL_NAME_*` (HIGH)
- **Where:** `model.ts:7-13`.
  ```ts
  export enum ChannelName {
    CHANNEL_NAME_UNSPECIFIED = 'CHANNEL_NAME_UNSPECIFIED',
    CHANNEL_NAME_PREVIEW = 'CHANNEL_NAME_PREVIEW',
    CHANNEL_NAME_CURRENT = 'CHANNEL_NAME_CURRENT',
    CHANNEL_NAME_PREVIOUS = 'CHANNEL_NAME_PREVIOUS',
    CHANNEL_NAME_CUSTOM = 'CHANNEL_NAME_CUSTOM',
  }
  ```
- **Why flagged:** Every member prefixed with `CHANNEL_NAME_` —
  exactly the enum name. Reads `ChannelName.CHANNEL_NAME_PREVIEW`
  ("channel name . channel name preview"). Worst form of the
  category.
- **Suggestion:** Strip prefix on TS identifier; keep wire
  strings:
  ```ts
  export enum ChannelName {
    UNSPECIFIED = 'CHANNEL_NAME_UNSPECIFIED',
    PREVIEW = 'CHANNEL_NAME_PREVIEW',
    CURRENT = 'CHANNEL_NAME_CURRENT',
    PREVIOUS = 'CHANNEL_NAME_PREVIOUS',
    CUSTOM = 'CHANNEL_NAME_CUSTOM',
  }
  ```

#### F2.2 — `DefaultWarehouseOverrideType.DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED` (HIGH)
- **Where:** `model.ts:16-23`.
  ```ts
  DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED = '...',
  LAST_SELECTED = 'LAST_SELECTED',
  CUSTOM = 'CUSTOM',
  ```
- **Why flagged:** Only the unspecified member carries the
  redundant prefix; the other members do not. Inconsistent
  within the enum.
- **Suggestion:** Strip prefix on the unspecified member:
  `UNSPECIFIED = 'DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED'`.
  Wire string preserved.

#### F2.3 — `EndpointSpotInstancePolicy.POLICY_UNSPECIFIED` (MEDIUM)
- **Where:** `model.ts:76`.
- **Why flagged:** `POLICY_` is redundant — the enum is
  `EndpointSpotInstancePolicy`. The JSDoc explicitly explains
  this choice as a compromise to "avoid customer-facing JSON …
  `ENDPOINT_SPOT_INSTANCE_POLICY_UNSPECIFIED`". So `POLICY_` was
  picked as a shorter prefix — but it is still partially
  redundant.
- **Suggestion:** On the TS identifier, drop the `POLICY_`
  prefix: `UNSPECIFIED = 'POLICY_UNSPECIFIED'`. Wire string
  preserved. Other members are already prefix-free.

#### F2.4 — `WarehouseType.TYPE_UNSPECIFIED` (MEDIUM)
- **Where:** `model.ts:703`.
- **Why flagged:** `TYPE_` prefix duplicates the type-noun in
  the enum name (`WarehouseType`). Other members
  (`CLASSIC`, `PRO`, `REYDEN`) carry no prefix — so inconsistent.
- **Suggestion:** Strip prefix on TS identifier:
  `UNSPECIFIED = 'TYPE_UNSPECIFIED'`. Or rename wire to
  `WAREHOUSE_TYPE_UNSPECIFIED` for symmetry, then strip on TS.

#### F2.5 — `EndpointHealth_Status.STATUS_UNSPECIFIED` (MEDIUM)
- **Where:** `model.ts:715`.
- **Why flagged:** `STATUS_` prefix duplicates the type-noun.
  Other members (`HEALTHY`, `DEGRADED`, `FAILED`) carry no
  prefix. Inconsistent.
- **Suggestion:** `UNSPECIFIED = 'STATUS_UNSPECIFIED'`.

#### F2.6 — No prefix on `TerminationCode` (~150 enum members) (acceptable)
- **Where:** `model.ts:103-687`.
- **Why flagged:** Members are domain-specific
  (`USER_REQUEST`, `JOB_FINISHED`, `INACTIVITY`,
  `CLOUD_PROVIDER_SHUTDOWN`, etc.) without a "TERMINATION_"
  prefix. This is correct.
- **Suggestion:** No change. Good pattern; other enums should
  follow.

#### F2.7 — No prefix on `TerminationType` (acceptable)
- **Where:** `model.ts:690-699`. Members `SUCCESS`,
  `CLIENT_ERROR`, `SERVICE_FAULT`, `CLOUD_FAILURE`.
- **Suggestion:** No change.

#### F2.8 — No prefix on `EndpointState` (acceptable)
- **Where:** `model.ts:87-100`.
- **Suggestion:** No change.

#### F2.9 — No prefix on `EndpointSecurityPolicy` (acceptable)
- **Where:** `model.ts:26-33`. Members `NONE`,
  `DATA_ACCESS_CONTROL`, `PASSTHROUGH`.
- **Suggestion:** No change.

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (acceptable, SDK-wide)
- **Where:** `id`, `defaultWarehouseOverrideId`, `warehouseId`,
  `runAsUserId`. Consistent lower-camel `Id`.
- **Suggestion:** No change.

#### F3.2 — `SQL` rendered as `Sql` in `sqlConfigurationParameters` (LOW)
- **Where:** `model.ts:1281, 1370`.
- **Why flagged:** `sqlConfigurationParameters` uses lowercase
  `sql`. The SDK applies "first letter cap, rest lower" for
  TLAs in camelCase — but the field starts the identifier and
  is rendered all lowercase. This is internally consistent with
  the rest of the SDK (`url`, `http`, `id` all lowercase when
  leading). Flag because the JSDoc and prose use uppercase
  "SQL" throughout — only the identifier deviates.
- **Suggestion:** No change to identifier. SDK-wide pattern.

#### F3.3 — `DBSQL` rendered as `Dbsql` in `dbsqlVersion` (LOW)
- **Where:** `model.ts:730`, `Channel.dbsqlVersion`.
- **Why flagged:** `DBSQL` is a Databricks-internal product
  name. Wire form is `dbsql_version` (all lowercase). TS form
  `dbsqlVersion` lowercases the whole acronym. Consistent with
  `sql`, `jdbc`, `odbc` elsewhere in this package.
- **Suggestion:** Acceptable; consistent with adjacent fields.

#### F3.4 — `JDBC` rendered as `jdbc` in `jdbcUrl` (acceptable)
- **Where:** `model.ts:1108, 1243`. Field `jdbcUrl`.
- **Why flagged:** Consistent with `http`, `url`. Lowercase
  acronyms in lower-camel. Note `Url` not `URL` (also lowercase
  TLA). Internally consistent.
- **Suggestion:** No change.

#### F3.5 — `ODBC` rendered in mixed forms (LOW)
- **Where:** `model.ts:1110, 1245, 1329`. Type `OdbcParams`
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
- **Where:** `model.ts:812, 956, 1074, 1209, 1267, 1356`.
- **Why flagged:** "IAM role" appears in JSDoc only; no
  identifier rendering.
- **Suggestion:** No change.

#### F3.7 — `URL` / `Url` (acceptable)
- **Where:** `client.ts` uses `url` consistently (leading
  position). Type `jdbcUrl` uses `Url`. Internally consistent.
- **Suggestion:** No change.

---

### 4. Underscores in TS identifiers

#### F4.1 — Proto-nested message naming with underscore (HIGH, generator-driven)
- **Where:**
  - `CreateWarehouse_Response` (`model.ts:842`)
  - `EditWarehouseRequest_Response` (`model.ts:986`)
  - `GetWarehouse_Response` (`model.ts:1141`)
  - `GetWorkspaceWarehouseConfigRequest_Response` (`model.ts:1258`)
  - `SetWorkspaceWarehouseConfigRequest_Response` (`model.ts:1389`)
  - `DeleteWarehouseRequest_Response` (`model.ts:1453`)
  - `ListWarehousesRequest_Response` (`model.ts:1480`)
  - `StartRequest_Response` (`model.ts:1500`)
  - `StopRequest_Response` (`model.ts:1512`)
  - `TerminationReason_ParametersEntry` (`model.ts:1401`)
  - `EndpointHealth_Status` (`model.ts:713`)
- **Why flagged:** Underscores are not idiomatic in TS
  identifiers. The `Foo_Response` convention is leaked from the
  protobuf nested-message representation. Each affected line has
  an `eslint-disable @typescript-eslint/naming-convention` comment
  acknowledging this.
- **Suggestion:** Generator-level. Replace with namespaces:
  ```ts
  export namespace CreateWarehouse {
    export interface Response { id?: string }
  }
  ```
  Or pure name concatenation: `CreateWarehouseResponse`,
  `EditWarehouseResponse`, etc. — this matches the convention
  used by the rest of the JS SDK for top-level types.

---

### 5. Cryptic abbreviations

#### F5.1 — `Mins` for minutes (`autoStopMins`) (LOW)
- **Where:** `model.ts:809, 953, 1071, 1206`.
- **Why flagged:** "Mins" is mildly informal. Compare to other
  duration fields in the SDK that use `Seconds`, `Hours`. JSDoc
  always spells out "minutes" in prose.
- **Suggestion:** Rename to `autoStopMinutes`. Wire stays
  `auto_stop_mins` for compatibility.

#### F5.2 — `Conf` for configuration (`EndpointConfPair`, `configPair`, `dataAccessConfig`) (MEDIUM)
- **Where:** `model.ts:988, 1265, 1338, 1354`.
- **Why flagged:** "Conf" is an abbreviation. Inconsistent
  within the package: `RepeatedEndpointConfPairs` has both
  `configPair` and `configurationPairs` (the latter is
  spelled out). The package alternates between `Conf`,
  `Config`, `Configuration`.
- **Suggestion:** Standardize on `Config` (already in
  `dataAccessConfig`). Rename `EndpointConfPair` → `ConfigPair`,
  `configPair` → `configPairs` (also plural; see F9.x).

#### F5.3 — `Param` for parameter (`globalParam`, `configParam`) (MEDIUM)
- **Where:** `model.ts:1277, 1279, 1366, 1368, 1724-1725, 1962-1967`.
- **Why flagged:** "Param" is a cryptic abbreviation when the
  full word "parameter" is also in use in this package
  (`sqlConfigurationParameters`, `TerminationReason.parameters`,
  `TerminationReason_ParametersEntry`). Inconsistent.
- **Suggestion:** Rename to `globalParameter`, `configParameter`
  (or pluralize, see F9.x). JSDoc on both says "Deprecated: Use
  sql_configuration_parameters" — they are slated for removal,
  so the rename can be paired with deprecation removal.

#### F5.4 — `Num` for number (`numClusters`, `numActiveSessions`, `maxNumClusters`, `minNumClusters`) (LOW)
- **Where:** `model.ts:787, 798, 1049, 1060, 1102, 1104, 1184, 1195, 1237, 1239`.
- **Why flagged:** "Num" is a programmer-ism. SDK and other
  packages occasionally spell it out as `count` or `number`.
- **Suggestion:** Acceptable; widely used across the API. Note
  that `numActiveSessions` is deprecated. Consider
  `clusterCount`, `activeSessionCount`, `maxClusterCount`,
  `minClusterCount` for clarity, but consistency with wire
  takes priority. Leave.

#### F5.5 — `Arn` for AWS Resource Name (`instanceProfileArn`) (acceptable)
- **Where:** `model.ts:813, 957, 1075, 1210, 1271, 1360`.
- **Why flagged:** `ARN` is a well-known AWS acronym. Casing
  matches `instanceProfileArn` (first letter cap, rest lower).
  No issue.
- **Suggestion:** No change.

#### F5.6 — `Conf` vs. `Config` vs. `Configuration` (MEDIUM, internal inconsistency)
- **Where:** Repeated across `EndpointConfPair`,
  `dataAccessConfig`, `sqlConfigurationParameters`,
  `configPair`, `configurationPairs`, `globalParam`,
  `configParam`.
- **Why flagged:** Three different ways to write the same word
  in the same file. Confusing.
- **Suggestion:** Pick one. Suggest `Config` for short field
  names, `Configuration` for spelled-out prose. Or fully
  spell out everywhere.

#### F5.7 — `req`, `resp` Go-ism abbreviations (LOW)
- **Where:** `client.ts` throughout.
- Already covered in F1.9 and F1.10.

---

### 6. Misleading names

#### F6.1 — `EndpointInfo` for a warehouse record (HIGH)
- **Where:** `model.ts:1006`.
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
- **Where:** `model.ts:988, 1336`. Used inside
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
- **Where:** `model.ts:730`.
- **Why flagged:** Field is required only when `name` is
  `CHANNEL_NAME_CUSTOM`. JSDoc on the parent says so. Name
  itself does not convey the conditional contract.
- **Suggestion:** Add JSDoc; field name is fine.

#### F6.8 — `instanceProfileArn` JSDoc says "Deprecated" but field remains (LOW)
- **Where:** `model.ts:812, 956, 1074, 1209`.
- **Why flagged:** Identifier carries no `_DEPRECATED` marker;
  only JSDoc. Customer code completion shows it as a normal
  field.
- **Suggestion:** Add `@deprecated` JSDoc tag (separate from
  prose) so IDEs strike it through.

#### F6.9 — `creatorName` is documented as "warehouse creator name" but lives on Create + Edit + Get (LOW)
- **Where:** `model.ts:811, 955, 1073, 1208`.
- **Why flagged:** The field is settable on
  `CreateWarehouse`/`EditWarehouseRequest`, but its meaning is
  read-only on the server side ("creator" never changes after
  create). Surfacing it as settable on `Edit` is misleading.
- **Suggestion:** Spec-level. Mark read-only on response types
  only.

#### F6.10 — `EndpointHealth.message` is "Deprecated" prose but no marker (LOW)
- **Where:** `model.ts:997`.
- Same pattern as F6.8.

#### F6.11 — Waiter `done` returns true on terminal failure states (MEDIUM)
- **Where:** `client.ts:684, 764, 844, 919` (the `done()` of
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
- **Where:** `model.ts:734, 1125, 1407, 874, 1300, 1319`.
- **Why flagged:** All AIP-style "DefaultWarehouseOverride"
  resources. The names are accurate but very long
  (39-48 characters). The matching client methods
  (`createDefaultWarehouseOverride`,
  `listDefaultWarehouseOverridesIter`) inherit the same length.
- **Suggestion:** Acceptable; AIP-compliant. Aliasing at the
  call site is the typical workaround.

#### F7.2 — `defaultWarehouseOverrideFieldMask` (LOW)
- **Where:** `model.ts:2022`.
- **Why flagged:** Long, but consistent with the AIP-style
  resource name. Acceptable.

---

### 8. Redundant suffixes

#### F8.1 — `Request` suffix on every request interface (HIGH, generator-driven)
- **Where:** `CreateDefaultWarehouseOverrideRequest`,
  `DeleteDefaultWarehouseOverrideRequest`,
  `EditWarehouseRequest`, `GetDefaultWarehouseOverrideRequest`,
  `GetWorkspaceWarehouseConfigRequest`,
  `ListDefaultWarehouseOverridesRequest`,
  `SetWorkspaceWarehouseConfigRequest`,
  `UpdateDefaultWarehouseOverrideRequest`,
  `DeleteWarehouseRequest`, `ListWarehousesRequest`,
  `StartRequest`, `StopRequest`.
- **Why flagged:** Caller already supplies the request via the
  parameter type position — the `Request` suffix is a
  belt-and-suspenders signal. Note the inconsistency: some types
  drop the suffix entirely (`CreateWarehouse`, `GetWarehouse`),
  others keep it.
- **Suggestion:** Standardize. The `_Response` underscore type
  pattern (F4.1) ties the request name to the response name —
  if request is `Foo`, response is `Foo_Response`. So
  `EditWarehouseRequest` should be `EditWarehouse` for symmetry
  with `CreateWarehouse` / `GetWarehouse`. Generator-level.

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
- **Where:** `model.ts:1115, 988, 1434`.
- **Why flagged:** "Pair" is a generic suffix that adds little
  information when the type's two fields are obvious. For
  `EndpointTagPair` (`key`, `value`), the suffix duplicates the
  shape already evident from the fields.
- **Suggestion:** Rename `EndpointTagPair` → `Tag`,
  `EndpointConfPair` → `Config`, `WarehouseTypePair` →
  `WarehouseTypeAvailability` (or similar) — wire-aligned but
  semantically clearer than the `Pair` suffix.

#### F8.4 — `_Response` underscore suffix (HIGH, generator-driven)
- Covered in F4.1.

#### F8.5 — `Params` suffix on `OdbcParams` (LOW)
- **Where:** `model.ts:1329`.
- **Why flagged:** Mild noise. Type has `hostname`, `path`,
  `protocol`, `port` — `OdbcConnectionInfo` would be more
  accurate.
- **Suggestion:** Acceptable as-is; `OdbcParams` follows
  the standard "parameters" terminology.

---

### 9. Singular / plural mismatches

#### F9.1 — `RepeatedEndpointConfPairs.configPair` is plural-content singular-name (HIGH)
- **Where:** `model.ts:1338`.
- **Why flagged:** Field type is `EndpointConfPair[]` (array)
  but field name is singular `configPair`. The wire form is
  `config_pair`. Compare to sibling `configurationPairs` (same
  type, but plural name). Inconsistent within the type.
- **Suggestion:** Rename to `configPairs`. Wire stays
  `config_pair` if deprecated, or rename wire to `config_pairs`.

#### F9.2 — `TerminationReason.parameters` is a map, not a list (LOW)
- **Where:** `model.ts:1397`. Type `Record<string, string>`.
- **Why flagged:** `parameters` is plural but typed as a map.
  Plural maps are fine but inconsistent — compare to
  `globalParam` / `configParam` which are singular.
- **Suggestion:** Acceptable; map semantics are clear from the
  type. Plural is correct.

#### F9.3 — `globalParam`, `configParam` are singular names for list-valued fields (MEDIUM)
- **Where:** `model.ts:1277, 1279, 1366, 1368`.
- **Why flagged:** Both fields are of type
  `RepeatedEndpointConfPairs` — a list. Singular name on a
  list-valued field is misleading. Compare to
  `sqlConfigurationParameters` (plural) for the same concept.
- **Suggestion:** Rename to `globalParams` / `configParams`
  (also pair with the `Param`/`Parameter` expansion in F5.3).

#### F9.4 — `enabledWarehouseTypes` plural array (acceptable)
- **Where:** `model.ts:1296, 1385`.
- **Why flagged:** Plural name + array type. Correct.
- **Suggestion:** No change.

#### F9.5 — `defaultWarehouseOverrides` plural array (acceptable)
- **Where:** `model.ts:1321`.
- **Why flagged:** Correct.
- **Suggestion:** No change.

#### F9.6 — `warehouses` plural array (acceptable)
- **Where:** `model.ts:1482`. Correct.

#### F9.7 — `customTags` plural array (acceptable)
- **Where:** `model.ts:1121`. Correct.

---

### 10. Reserved-word collisions

#### F10.1 — `type` field (LOW)
- **Where:** `DefaultWarehouseOverride.type` (`model.ts:865`),
  `TerminationReason.type` (`model.ts:1395`).
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

#### F12.1 — `EndpointInfo` and `GetWarehouse_Response` are the same record (HIGH)
- **Where:** `model.ts:1006` and `model.ts:1141`.
- **Why flagged:** Both types have identical field sets (~20
  identical fields). One is the per-warehouse record in
  `listWarehouses`, the other is the result of `getWarehouse`.
  Duplicating the shape across two types means every change has
  to happen in two places.
- **Suggestion:** Collapse into one type (call it `Warehouse`).
  `GetWarehouse_Response = Warehouse`. `EndpointInfo` removed.
  Generator-level.

#### F12.2 — `CreateWarehouse` and `EditWarehouseRequest` are nearly identical (HIGH)
- **Where:** `model.ts:746` and `model.ts:888`.
- **Why flagged:** `EditWarehouseRequest` is `CreateWarehouse +
  id`. All other fields identical. Duplicating the shape.
- **Suggestion:** Have `EditWarehouseRequest` extend
  `CreateWarehouse` with `id` added. Reduces drift.

#### F12.3 — `SetWorkspaceWarehouseConfigRequest` and
`GetWorkspaceWarehouseConfigRequest_Response` are identical (HIGH)
- **Where:** `model.ts:1347` and `model.ts:1258`.
- **Why flagged:** Same field set on both. Same legacy
  `globalParam`, `configParam` deprecated pair on both.
- **Suggestion:** Generate as `WorkspaceWarehouseConfig` type
  used by both methods. Generator-level.

#### F12.4 — Legacy `Endpoint*` naming for a `Warehouse*` concept (HIGH)
- Covered in F0 and F1.x. Listed here for completeness in
  category 12: the entire `Endpoint*` family is historical
  baggage from the rename of "SQL Endpoints" to "SQL Warehouses".

#### F12.5 — `numActiveSessions` deprecated field still on response types (LOW)
- **Where:** `model.ts:1104, 1239`.
- **Why flagged:** JSDoc says "Deprecated. current number of
  active sessions for the warehouse". Carries no `@deprecated`
  tag.
- **Suggestion:** Add `@deprecated`. Schedule for removal.

#### F12.6 — `EndpointHealth.message` deprecated (LOW)
- **Where:** `model.ts:997`. Same pattern.

#### F12.7 — `instanceProfileArn` deprecated (LOW)
- **Where:** `model.ts:813, 957, 1075, 1210`. Same.

#### F12.8 — `globalParam`, `configParam` deprecated in favor of
`sqlConfigurationParameters` (LOW)
- **Where:** `model.ts:1277, 1279, 1366, 1368`. Same.

#### F12.9 — `ListWarehousesRequest.runAsUserId` deprecated and ignored (LOW)
- **Where:** `model.ts:1465`. JSDoc says "Deprecated: this field
  is ignored by the server."
- **Suggestion:** Add `@deprecated` and consider removal.

#### F12.10 — Workspace config endpoint duplicates per-warehouse fields (MEDIUM)
- **Where:** `instanceProfileArn`, `channel`,
  `enableServerlessCompute` all appear in both per-warehouse
  (`CreateWarehouse`) and workspace
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

#### F13.2 — `Repeated` adjective on `RepeatedEndpointConfPairs` (LOW, proto-ism)
- **Where:** `model.ts:1336`.
- **Why flagged:** "Repeated" is proto vocabulary; not English
  vocabulary. It means "list of". Reads as "repeated endpoint
  conf pairs".
- **Suggestion:** Drop the `Repeated` prefix. Rename to
  `EndpointConfPairList` (or `ConfigPairList` per F1.5).

---

### 14. Go/Java-style names

#### F14.1 — `req`, `resp`, `opts` Go abbreviations (LOW)
- **Where:** `client.ts` throughout; `utils.ts:30, 47, 60, 66`.
- **Why flagged:** Go convention is `req`, `resp`, `opts`; TS
  convention is `request`, `response`, `options`. SDK already
  uses `options` (full word) so the abbreviation is inconsistent
  within the same method signature.
- **Suggestion:** Generator-level.

#### F14.2 — `Repeated` proto-prefix (LOW)
- Covered in F13.2.

#### F14.3 — `Params` suffix on types (Java-ish) (LOW)
- `OdbcParams` — minor. See F8.5.

#### F14.4 — `Pair` suffix (Java-ish) (LOW)
- `EndpointTagPair`, `EndpointConfPair`, `WarehouseTypePair`.
  Covered in F8.3.

#### F14.5 — `for (;;)` C-style infinite loop (LOW, generator-driven)
- **Where:** `client.ts:405, 462`, `utils.ts:48`.
- **Why flagged:** `for (;;)` is C/Go idiom; TS prefers
  `while (true)` for readability. Minor.
- **Suggestion:** Generator-level.

---

### 15. Generic field names losing meaning

#### F15.1 — `name` overloaded with three meanings (HIGH)
- **Where:** `Channel.name` (channel selector enum value),
  `CreateWarehouse.name` (human display name),
  `DefaultWarehouseOverride.name` (path identifier).
- **Why flagged:** Three completely different concepts share
  the field name `name`.
- **Suggestion:** See F1.8. Rename
  `DefaultWarehouseOverride.name` → `resourceName`. Rename
  `Channel.name` → `channelType` (also F8.2).

#### F15.2 — `state` field on `EndpointInfo` / `GetWarehouse_Response` (LOW)
- **Where:** `model.ts:1106, 1241`.
- **Why flagged:** Disambiguated by type
  (`EndpointState`), but `warehouseState` would be clearer in
  isolation.
- **Suggestion:** Leave.

#### F15.3 — `status` field on `EndpointHealth` (LOW)
- **Where:** `model.ts:995`. Type `EndpointHealth_Status`.
- **Why flagged:** Reads "endpoint health . status .
  endpoint health status". Three layers of "status".
- **Suggestion:** Acceptable given typing.

#### F15.4 — `enabled` field on `WarehouseTypePair` (LOW)
- **Where:** `model.ts:1440`.
- **Why flagged:** Generic, but disambiguated by container.
- **Suggestion:** Leave.

#### F15.5 — `summary` field on `EndpointHealth` (LOW)
- **Where:** `model.ts:1001`.
- **Why flagged:** Generic. JSDoc says "short summary of the
  health status". Could be `summaryMessage` or
  `healthSummary`, but field is rarely used in isolation.
- **Suggestion:** Leave.

#### F15.6 — `key`, `value` on every `*Pair` type (LOW)
- **Where:** `EndpointConfPair`, `EndpointTagPair`,
  `TerminationReason_ParametersEntry`.
- **Why flagged:** Maximally generic. Domain is in the
  container type name.
- **Suggestion:** Acceptable; conventional for key-value pair
  types.

#### F15.7 — `code`, `type`, `parameters` on `TerminationReason` (LOW)
- **Where:** `model.ts:1393, 1395, 1397`.
- **Why flagged:** All three are generic words. Disambiguated
  by container.
- **Suggestion:** Leave.

#### F15.8 — `host`, `path`, `protocol`, `port` on `OdbcParams` (LOW)
- **Where:** `model.ts:1330-1333`.
- **Why flagged:** Generic connection-string fields. Standard.
- **Suggestion:** Leave.

---

### 16. Field contradicting type domain

#### F16.1 — `cluster*` fields on warehouse types (HIGH)
- **Where:** `CreateWarehouse.clusterSize` (`model.ts:773`),
  `minNumClusters` (`model.ts:787`), `maxNumClusters`
  (`model.ts:798`), `numClusters` (`model.ts:1102`); same on
  `EditWarehouseRequest`, `EndpointInfo`,
  `GetWarehouse_Response`. JSDoc: "Logical name for the
  cluster" (`model.ts:748`).
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
- **Where:** `model.ts:810, 954, 1072, 1207`.
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
- **Where:** `editWarehouse` (`client.ts:239`) vs.
  `updateDefaultWarehouseOverride` (`client.ts:584`). Same
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
- **Where:** `client.ts:475`.
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

#### F18.1 — `TerminationCode` — many >40-char identifiers (HIGH)
- **Where:** `model.ts:103-687`. Examples:
  - `AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE` (50)
  - `AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE` (44)
  - `AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE` (38)
  - `BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION` (42)
  - `BUDGET_POLICY_LIMIT_ENFORCEMENT_ACTIVATED` (41)
  - `ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS` (52)
  - `NETWORK_CHECK_METADATA_ENDPOINT_FAILURE_DUE_TO_MISCONFIG` (56)
  - `SECURITY_AGENTS_FAILED_INITIAL_VERIFICATION` (43)
- **Why flagged:** Identifier readability suffers; switch
  statements become unwieldy. Some have `_DUE_TO_MISCONFIG`
  suffix that is essentially a sub-category.
- **Suggestion:** Acceptable for backwards compat. Consider
  refactoring to a nested enum (category + subcategory) at the
  spec level. Generator-driven.

#### F18.2 — `EndpointSpotInstancePolicy.RELIABILITY_OPTIMIZED` / `COST_OPTIMIZED` (LOW)
- **Where:** `model.ts:78, 80`.
- **Why flagged:** 21-22 char values. Acceptable; descriptive.

#### F18.3 — `ChannelName.CHANNEL_NAME_*` (LOW, covered by F2.1)
- **Where:** `model.ts:9-12`.
- **Why flagged:** With the prefix stripped (per F2.1), values
  become short. Otherwise 23-25 chars.

#### F18.4 — `DefaultWarehouseOverrideType.DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED` (LOW, covered by F2.2)
- 43 chars. Strip prefix to fix.

---

### 19. Underspecified IDs

#### F19.1 — `id` on `CreateWarehouse_Response`, `EndpointInfo`,
`GetWarehouse_Response`, `DeleteWarehouseRequest`,
`EditWarehouseRequest`, `GetWarehouse`, `StartRequest`,
`StopRequest` (MEDIUM)
- **Where:** Many places. Caller writes
  `client.startWarehouse({id: '...'})` — but `id` here is the
  warehouse id, not a generic id.
- **Why flagged:** Bare `id` is acceptable in context, but
  across the SDK, packages typically use the qualified form
  (`pipelineId`, `clusterId`, `endpointId`). `id` is
  underspecified.
- **Suggestion:** Rename to `warehouseId` for self-documentation.
  Wire stays `id` (path segment).

#### F19.2 — `defaultWarehouseOverrideId` vs. `warehouseId` on
`DefaultWarehouseOverride` (LOW)
- **Where:** `model.ts:863, 870`.
- **Why flagged:** Two ID fields on one type:
  `defaultWarehouseOverrideId` (the override's own ID) and
  `warehouseId` (the warehouse referenced *by* the override).
  Both are clearly named, but a reader has to look carefully.
- **Suggestion:** Acceptable; both names are explicit.

#### F19.3 — `name` is functionally an ID on
`DefaultWarehouseOverride` (HIGH)
- **Where:** `model.ts:861`. Path form `default-warehouse-overrides/{id}`.
- **Why flagged:** AIP-style "resource name" as a string —
  conventional in Google APIs but unconventional in TS.
  Customer sees `{name: 'default-warehouse-overrides/123'}` and
  may try `{name: 'my-override-name'}`. Field name `name`
  encourages misuse.
- **Suggestion:** Rename to `resourceName` on the type and
  request types. AIP convention is `name` on the wire — keep
  wire, rename TS.

#### F19.4 — `runAsUserId` on `ListWarehousesRequest` (deprecated) (LOW)
- **Where:** `model.ts:1465`. Already deprecated. Numeric (`number`),
  not string — unusual; most IDs in the SDK are string.
- **Suggestion:** Already deprecated. Leave.

#### F19.5 — `ListDefaultWarehouseOverridesResponse.nextPageToken` (acceptable)
- **Where:** `model.ts:1326`. Standard pagination identifier.

---

### 20. Type-suffix tautology

#### F20.1 — `Channel.name: ChannelName` (HIGH)
- **Where:** `model.ts:728-729`.
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
- **Where:** `model.ts:995`.
- **Why flagged:** Field name `status` + enum suffix `Status`
  + interface "Health Status" namespace. Disambiguated by
  typing.
- **Suggestion:** Acceptable; standard pattern.

#### F20.3 — `WarehouseTypePair.warehouseType: WarehouseType` (HIGH)
- **Where:** `model.ts:1434-1440`.
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
- **Where:** `model.ts:1393`. Field `code` + enum suffix `Code`
  on `TerminationCode`. Generic field name with specific enum
  — acceptable per F1.12.

#### F20.5 — `TerminationReason.type: TerminationType` (LOW)
- **Where:** `model.ts:1395`. Same pattern. Acceptable.

#### F20.6 — `DefaultWarehouseOverride.type: DefaultWarehouseOverrideType` (LOW)
- **Where:** `model.ts:865`.
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
3. **Strip redundant enum prefixes (F2.1, F2.2, F2.3, F2.4,
   F2.5)** — `ChannelName.CHANNEL_NAME_PREVIEW` etc. Trivial
   generator-level fix; massive readability win.
4. **Drop `_Response` underscore convention (F4.1)** —
   namespace or naked concatenation. Generator-level.
5. **Collapse duplicate types (F12.1, F12.2, F12.3)** —
   `EndpointInfo` + `GetWarehouse_Response`,
   `CreateWarehouse` + `EditWarehouseRequest`,
   `Set*Config` + `Get*Config_Response`.

### Recurring themes

- **Generator-driven proto-isms** (`Repeated`, `_Response`,
  `req`/`resp`, `for(;;)`) are the largest single category.
  Most are LOW because they are consistent across the entire
  SDK; fix at the generator.
- **Legacy `Endpoint*` naming** is the package-specific issue.
  It causes the most readability harm because the package
  brand is "warehouse" while half the types still say
  "endpoint". HIGH severity; spec-level rename.
- **Duplicate enum prefixes** are pervasive but easily fixable
  generator-side.
- **Two unrelated resource families** (warehouses +
  default-warehouse-overrides) coexist in one package, with
  different REST base paths and different API conventions.
  Splitting could simplify.
