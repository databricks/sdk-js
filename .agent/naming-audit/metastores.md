# Naming Audit: `metastores` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/metastores/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) metastore — the top-level container that holds catalogs, schemas, and tables, and is assigned to workspaces.

---

## Findings

### 1. Vague / generic names

#### 1.1 `MetastoreAssignment.workspaceId` and `metastoreId` (model.ts:357, 359)
Acceptable in isolation — but the *type* `MetastoreAssignment` is just
a `(workspaceId, metastoreId, defaultCatalogName)` triple. The name
"MetastoreAssignment" promises richer semantics than the three-field
struct delivers. Consider `WorkspaceMetastoreLink` or making the
relationship directional in the name.

---

### 2. Misleading names

#### 2.1 `MetastoreInfo` (model.ts:369)
"Info" suggests metadata about a metastore separate from the entity
itself; the type is in fact the entity. Rename to `Metastore`. See
also §3.1.

#### 2.2 `getMetastoreSummary` is presented as info-about (client.ts:648)
JSDoc says "Gets information about a metastore. This summary
includes…". But the API in fact returns the current workspace's
metastore — there is no metastore ID parameter. The name "summary"
omits the "current-workspace" semantics. Rename to signal the
current-workspace scope, as `getCurrentMetastoreAssignment` spells out
"current".

---

### 3. Redundant suffixes

#### 3.1 `…Info` suffix on `MetastoreInfo` (model.ts:369)
"Info" carries no semantic content. Go-SDK convention; TS would just
say `Metastore`.

---

### 4. Field contradicting type domain

#### 4.1 `CreateMetastoreRequest` and `UpdateMetastoreRequest` carry read-only output fields (model.ts:238-252, 493-507)
`metastoreId`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`globalMetastoreId`, `cloud`, `storageRootCredentialName`. These are
server-populated; a creator/updater setting them is at best ignored.
The type's name promises "create" or "update" but the shape
contradicts that by including read-only output. Mirror of
catalogs §4.1.

#### 4.2 `GetMetastoreSummaryResponse` returns the full metastore (model.ts:291)
The type name promises a summary; the value is the full metastore
entity, with the same 19 fields and docs as `MetastoreInfo`.

---

## Additional / cross-cutting observations

### A. `req.workspaceId` is interpolated into the URL via `String(req.workspaceId ?? '')` (client.ts:483, 554, 786)
If `workspaceId` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/workspaces//metastore` (note the double slash)
and the request will fail on the server. The optional typing of
`workspaceId` on `CreateMetastoreAssignmentRequest`,
`DeleteMetastoreAssignmentRequest`, and `UpdateMetastoreAssignmentRequest`
(each field is `bigint | undefined`) lets the bug hide.

### B. `req.id` is similarly optional but interpolated into URLs (client.ts:519, 621, 752)
`${req.id ?? ''}` — same pattern: undefined id silently produces a
malformed URL. The optional typing leaves the contract too loose for a
required path parameter.
