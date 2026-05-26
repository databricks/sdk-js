# Naming Audit: workspaces

**Path:** `packages/workspaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks workspace management
(create/get/list/update/delete a workspace under an account, with all
its cloud, network, storage, and encryption configuration).
**Total weird names flagged:** 4

This audit is scoped to proto-architectural-leak naming (mid-position
`Public`/`Internal`/`External`, `Proto` suffix/infix, architectural-layer
words such as `Service`/`Manager`/`Wrapper`, `Impl`, `Rpc`/`Grpc`,
`Foo_PublicRequest`-style paired naming, etc.). Domain words like
`External*`/`Online*` and standard end-position suffixes (`Request`,
`Response`, `Info`) are not flagged here.

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 4     |
| Medium       | 0     |
| Low          | 0     |
| Observation  | 0     |

The remaining findings all cluster around the `Public` mid-position
infix on the client surface — the upstream proto/service "Public" vs
internal-route split still leaks into the `Client` methods, the two
waiter classes, and the corresponding imports / re-exports.
The model-side `Public` / `CustomerFacing` infixes on the request,
response, container, and enum types have all been removed; see the
`Fixed` section below.

## High severity

### 1. `Client.createWorkspacePublic` / `createWorkspacePublicWaiter` — `src/v1/client.ts:88,113`
- **Why weird:** `Client` method names end in `Public`. Reads as "the
  method on the public class that calls the public endpoint" — the
  suffix only exists because the underlying proto/spec uses `Public`
  to distinguish account-API routes. The companion waiter factory
  carries the same suffix.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `createWorkspace`, `createWorkspaceWaiter`.
- **Rationale:** Methods on `Client` are inherently public; the suffix
  is meaningless to a TS caller.

### 2. `Client.deleteWorkspacePublic` / `getWorkspacePublic` / `listWorkspacesPublic` / `updateWorkspacePublic` / `updateWorkspacePublicWaiter` — `src/v1/client.ts:127,155,180,210,250`
- **Why weird:** Same `Public` suffix on every other `Client` method
  (and the update waiter factory) as #1.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `deleteWorkspace`, `getWorkspace`, `listWorkspaces`,
  `updateWorkspace`, `updateWorkspaceWaiter`.
- **Rationale:** Same as #1.

### 3. `CreateWorkspacePublicWaiter` / `UpdateWorkspacePublicWaiter` classes — `src/v1/client.ts:264,344`
- **Why weird:** Two exported waiter classes carry the `Public` infix
  between the verb (`Create`/`Update`) and the noun (`Workspace`) plus
  the `Waiter` role suffix. The class names are wholly SDK-side
  abstractions (there is no protobuf "waiter" message), so the
  `Public` token is pure inherited cruft from the paired RPC name.
- **Category:** Proto-architectural leak — `Public` mid-position
  (waiter class).
- **Suggested:** `CreateWorkspaceWaiter`, `UpdateWorkspaceWaiter`.
- **Rationale:** Waiter classes are TS-only constructs; they have no
  business carrying the upstream proto's public/internal qualifier.

### 4. `Public` imports in `client.ts` and the `index.ts` re-export list — `src/v1/client.ts:31-36`, `src/v1/index.ts:5-7`
- **Why weird:** Both files mirror the leaked `Public` names from the
  waiter classes in their import / re-export lists:
  `CreateWorkspacePublicWaiter`, `UpdateWorkspacePublicWaiter`.
- **Category:** Proto-architectural leak — `Public` mid-position
  (import & re-export mirror).
- **Suggested:** Track the renames of #1–#3.
- **Rationale:** Re-export and import statements inherit the leaked
  names verbatim; nothing to do here independent of the upstream
  renames.

## Medium severity

_None._

## Low severity

_None._

## Observation

_None._

## File coverage

| File                  | Lines | Audited                                                                  |
| --------------------- | ----- | ------------------------------------------------------------------------ |
| `src/v1/model.ts`     | 829   | All 5 enums, all 13 interfaces, every field, all 11 marshal/unmarshal schemas, field-mask schemas. |
| `src/v1/client.ts`    | 423   | `Client` class, constructor, 5 RPC methods + 2 waiter factories, 2 waiter classes, import list. |
| `src/v1/utils.ts`     | 151   | All exported / private helpers. No proto-leak hits.                      |
| `src/v1/transport.ts` | 75    | `newHttpClient` factory + auth wrapper. No proto-leak hits.              |
| `src/v1/index.ts`     | 35    | All re-exports — names mirror `model.ts` and `client.ts` (covered above).|

Type & symbol checklist:

- [x] `ComputeMode` enum — clean (renamed from `CustomerFacingComputeMode`).
- [x] `GkeConnectivityType` enum — clean (`Gke` is a domain acronym;
  no proto qualifier).
- [x] `PricingTier` enum — clean (renamed from `PublicPricingTier`).
- [x] `StorageMode` enum — clean (renamed from `CustomerFacingStorageMode`).
- [x] `WorkspaceStatus` enum — clean.
- [x] `AzureWorkspaceInfo` interface — clean (`Info` is a standard
  end-position suffix; `Azure` is a domain qualifier).
- [x] `CloudResourceContainer` interface — clean (renamed from
  `CustomerFacingCloudResourceContainer`).
- [x] `CreateWorkspaceRequest` interface — clean (renamed from
  `CreateWorkspacePublicRequest`).
- [x] `CreateWorkspaceRequest_CustomTagsEntry` interface — clean (renamed
  from `CreateWorkspacePublicRequest_CustomTagsEntry`).
- [x] `DeleteWorkspaceRequest` interface — clean (renamed from
  `DeleteWorkspacePublicRequest`).
- [x] `GcpCloudResourceContainer` interface — clean (renamed from
  `CustomerFacingGcpCloudResourceContainer`).
- [x] `GcpCommonNetworkConfig` interface — clean (domain abbreviation
  `Gcp` + descriptive suffix).
- [x] `GcpManagedNetworkConfig` interface — clean.
- [x] `GetWorkspaceRequest` interface — clean (renamed from
  `GetWorkspacePublicRequest`).
- [x] `GkeConfig` interface — clean.
- [x] `ListWorkspacesRequest` interface — clean (renamed from
  `ListWorkspacesPublicRequest`).
- [x] `ListWorkspacesResponse` interface — clean (renamed from
  `ListWorkspacesPublicResponse`).
- [x] `UpdateWorkspaceRequest` interface — clean as a type name (renamed
  from `UpdateWorkspacePublicRequest`).
- [x] `Workspace` interface — clean (renamed from `CustomerFacingWorkspace`).
- [x] `Workspace_CustomTagsEntry` interface — clean (renamed from
  `CustomerFacingWorkspace_CustomTagsEntry`).
- [x] `WorkspaceNetwork` interface — clean.
- [x] `marshalCreateWorkspaceRequestSchema` — clean (renamed from
  `marshalCreateWorkspacePublicRequestSchema`).
- [x] `unmarshalCloudResourceContainerSchema`,
  `unmarshalGcpCloudResourceContainerSchema`,
  `unmarshalWorkspaceSchema`,
  `marshalCloudResourceContainerSchema`,
  `marshalGcpCloudResourceContainerSchema`,
  `marshalWorkspaceSchema` — clean (renamed from their
  `CustomerFacing*` versions).
- [x] `unmarshalAzureWorkspaceInfoSchema`,
  `unmarshalGcpCommonNetworkConfigSchema`,
  `unmarshalGcpManagedNetworkConfigSchema`,
  `unmarshalGkeConfigSchema`, `unmarshalWorkspaceNetworkSchema`,
  `marshalAzureWorkspaceInfoSchema`,
  `marshalGcpCommonNetworkConfigSchema`,
  `marshalGcpManagedNetworkConfigSchema`, `marshalGkeConfigSchema`,
  `marshalWorkspaceNetworkSchema` — clean (no `Public`/`CustomerFacing`
  qualifier).
- [x] Field-mask schemas
  (`azureWorkspaceInfoFieldMaskSchema`,
  `cloudResourceContainerFieldMaskSchema`,
  `gcpCloudResourceContainerFieldMaskSchema`,
  `workspaceFieldMaskSchema`,
  `gcpCommonNetworkConfigFieldMaskSchema`,
  `gcpManagedNetworkConfigFieldMaskSchema`,
  `gkeConfigFieldMaskSchema`, `workspaceNetworkFieldMaskSchema`) and
  the exported `workspaceFieldMask()` factory — clean (renamed along
  with the underlying types).
- [x] `Client` class itself — clean (terminal-position `Client` is the
  standard SDK convention).
- [x] `Client.createWorkspacePublic` + `createWorkspacePublicWaiter` —
  flagged (#1).
- [x] `Client.deleteWorkspacePublic`, `getWorkspacePublic`,
  `listWorkspacesPublic`, `updateWorkspacePublic`,
  `updateWorkspacePublicWaiter` — flagged (#2).
- [x] `CreateWorkspacePublicWaiter`, `UpdateWorkspacePublicWaiter`
  classes — flagged (#3).
- [x] `StillRunningError` private sentinel class — clean (cross-package
  pattern; not a domain identifier).
- [x] `client.ts` import list / `index.ts` re-exports — flagged (#4).
- [x] `utils.ts` (`executeCall`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`, `readAll`,
  `HttpCallOptions`) — no proto-architectural-leak names. (The
  `executeCall` / `executeHttpCall` verb overlap is a common
  cross-package pattern; out of scope here.)
- [x] `transport.ts` (`newHttpClient`, auth-wrapping class) — no
  `Public`/`Internal`/`Proto`/`Service`/`Manager` leak in domain
  identifiers. (The auth wrapper class itself is a cross-package
  pattern, not flagged here.)
