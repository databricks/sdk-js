# Naming Audit: `metastores` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/metastores/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) metastore — the top-level container that holds catalogs, schemas, and tables, and is assigned to workspaces.

---

## Findings

### 1. Vague / generic names

#### 1.1 `MetastoreAssignment.workspaceId` and `metastoreId` (model.ts:355, 357)
Acceptable in isolation — but the *type* `MetastoreAssignment` is just
a `(workspaceId, metastoreId, defaultCatalogName)` triple. The name
"MetastoreAssignment" promises richer semantics than the three-field
struct delivers. Consider `WorkspaceMetastoreLink` or making the
relationship directional in the name.

---

### 2. Misleading names

#### 2.1 `MetastoreInfo` (model.ts:365)
"Info" suggests metadata about a metastore separate from the entity
itself; the type is in fact the entity. See also §4.1.

#### 2.2 `getMetastoreSummary` is presented as info-about (client.ts:637)
JSDoc says "Gets information about a metastore. This summary
includes…". But the API in fact returns the current workspace's
metastore — there is no metastore ID parameter. The name "summary"
omits the "current-workspace" semantics. Cf.
`getCurrentMetastoreAssignment`, which spells out "current".

---

### 3. Overly verbose

#### 3.1 `getCurrentMetastoreAssignment` (client.ts:578)
28-character method name. Acceptable — describes the semantics — but
combined with `getMetastoreSummary` (which is also "current-workspace"
in practice, §2.2) one of them carries redundant prefixing.

---

### 4. Redundant suffixes

#### 4.1 `…Info` suffix on `MetastoreInfo` (model.ts:365)
"Info" carries no semantic content. Go-SDK convention; TS would just
say `Metastore`. See §6.2.

#### 4.2 `…Assignment` suffix on `MetastoreAssignment` and four request types
`CreateMetastoreAssignmentRequest`, `DeleteMetastoreAssignmentRequest`,
`UpdateMetastoreAssignmentRequest`, `GetCurrentMetastoreAssignmentRequest`,
`MetastoreAssignment`. The suffix is justified because "metastore
assignment" is a distinct concept. Not redundant — flagged for
completeness.

---

### 5. Singular / plural mismatches

#### 5.1 `ListMetastoresResponse.metastores` (model.ts:345)
Field is plural and correctly typed `MetastoreInfo[]` — no mismatch.
Flagged as a counter-example.

---

### 6. Reserved-word collisions

#### 6.1 `name` field on `CreateMetastoreRequest`, `MetastoreInfo`, `UpdateMetastoreRequest`, `GetMetastoreSummaryResponse` (model.ts:214, 291, 367, 469)
Routinely shadows `Function.prototype.name`. Common SDK convention; not
fixable in isolation.

#### 6.2 `region` field — collides with conceptual "region" (e.g. Intl.Locale region) in browser code. Minor.

---

### 7. Field contradicting type domain

#### 7.1 `CreateMetastoreRequest` and `UpdateMetastoreRequest` carry read-only output fields (model.ts:234-248, 489-503)
`metastoreId`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`globalMetastoreId`, `cloud`, `storageRootCredentialName`. These are
server-populated; a creator/updater setting them is at best ignored.
The type's name promises "create" or "update" but the shape
contradicts that by including read-only output. Mirror of
catalogs §16.2.

#### 7.2 `GetMetastoreSummaryResponse` returns the full metastore (model.ts:287)
The type name promises a summary; the value is the full metastore
entity, with the same 19 fields and docs as `MetastoreInfo`.

---

### 8. Inconsistent action verbs

#### 8.1 No `fetch…` / `read…` / `retrieve…` outliers — read-side verbs are uniformly `get` / `list`. No issues.

---

## Additional / cross-cutting observations

### A. `req.workspaceId` is interpolated into the URL via `String(req.workspaceId ?? '')` (client.ts:476, 545, 771)
If `workspaceId` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/workspaces//metastore` (note the double slash)
and the request will fail on the server. The optional typing of
`workspaceId` on `CreateMetastoreAssignmentRequest`,
`DeleteMetastoreAssignmentRequest`, and `UpdateMetastoreAssignmentRequest`
(each field is `bigint | undefined`) lets the bug hide.

### B. `req.id` is similarly optional but interpolated into URLs (client.ts:511, 610, 738)
`${req.id ?? ''}` — same pattern: undefined id silently produces a
malformed URL. The optional typing leaves the contract too loose for a
required path parameter.

### C. `DeleteMetastoreAssignmentRequest.metastoreId` is sent in the query string, not the path (client.ts:545-549)
On `DELETE /api/2.1/unity-catalog/workspaces/{workspaceId}/metastore`,
the request appends `?metastore_id=…`. That contradicts the doc on
`DeleteMetastoreAssignmentRequest.metastoreId` ("Query for the ID of
the metastore to delete.") only via the leading word "Query" — the
field name itself does not signal that the value is a query parameter,
not a path one.

### D. `MetastoresClient` constructor throws bare `Error` for missing `host` (client.ts:112)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.
