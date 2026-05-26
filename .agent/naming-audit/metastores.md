# Naming Audit: `metastores` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/metastores/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) metastore — the top-level container that holds catalogs, schemas, and tables, and is assigned to workspaces.

---

## Summary

The `metastores` package exposes nine Unity Catalog metastore operations
(`createMetastore`, `createMetastoreAssignment`, `deleteMetastore`,
`deleteMetastoreAssignment`, `getCurrentMetastoreAssignment`,
`getMetastore`, `getMetastoreSummary`, `listMetastores`,
`updateMetastore`, `updateMetastoreAssignment`).
The dominant naming problems are structural: `CreateMetastoreRequest`,
`UpdateMetastoreRequest`, and `MetastoreInfo` share 18 fields verbatim,
including read-only output fields (`createdAt`, `createdBy`, `updatedAt`,
`updatedBy`, `metastoreId`, `globalMetastoreId`) that have no business in
a write request. `UpdateMetastoreRequest` further conflates a path-parameter
`id`, a body `name`, and a "rename target" `newName`.
`GetMetastoreSummaryRequest_Response` is structurally identical to
`MetastoreInfo` despite the "summary" name promising a smaller shape.

---

## Findings

### 1. Vague / generic names

#### 1.1 `MetastoreAssignment.workspaceId` and `metastoreId` (model.ts:363, 365)
Acceptable in isolation — but the *type* `MetastoreAssignment` is just
a `(workspaceId, metastoreId, defaultCatalogName)` triple. The name
"MetastoreAssignment" promises richer semantics than the three-field
struct delivers. Consider `WorkspaceMetastoreLink` or making the
relationship directional in the name.

#### 1.2 `cloud` field (model.ts:195, 252, 407, 448, 509)
A bare `cloud: string` with a single example list in the doc (`aws`,
`azure`, `gcp`). Should probably be typed as a `CloudProvider` enum
(see §5.2) — but at minimum the field is generic when read alone.

---

### 2. Redundant enum prefixes

_None._

---

### 3. Acronym casing inconsistencies

_None._

---

### 4. Cryptic abbreviations

_None._

---

### 5. Misleading names

#### 5.1 `MetastoreInfo` (model.ts:373)
"Info" suggests metadata about a metastore separate from the entity
itself; the type is in fact the entity. See also §7.1.

#### 5.2 `cloud: string` (model.ts:195, 252, 407, 448, 509)
Holds an enum-like vocabulary (`aws`, `azure`, `gcp`) but is typed as
`string`. The name is fine; the *type* misleads about the value
space. See §1.2.

#### 5.3 `GetMetastoreSummaryRequest_Response` is structurally identical to `MetastoreInfo` (model.ts:294-333 vs 373-412)
Both types have the *same* 18 fields with the *same* docs in the *same*
order. The "summary" type doesn't actually summarise — it returns the
full metastore record. The name lies about the content. The Go SDK
inherits this from the API definition, but the TS port could collapse
the two: either alias the summary response to `MetastoreInfo` or
expose the genuinely-summarised subset.

#### 5.4 `getMetastoreSummary` is presented as info-about (client.ts:616-619)
JSDoc says "Gets information about a metastore. This summary
includes…". But the API in fact returns the current workspace's
metastore — there is no metastore ID parameter. The name "summary"
omits the "current-workspace" semantics. Cf.
`getCurrentMetastoreAssignment`, which spells out "current". See also
§10.1.

---

### 6. Overly verbose

#### 6.1 `getCurrentMetastoreAssignment` (client.ts:567)
28-character method name. Acceptable — describes the semantics — but
combined with `getMetastoreSummary` (which is also "current-workspace"
in practice, §5.4) one of them carries redundant prefixing.

---

### 7. Redundant suffixes

#### 7.1 `…Info` suffix on `MetastoreInfo` (model.ts:373)
"Info" carries no semantic content. Go-SDK convention; TS would just
say `Metastore`. See §9.2.

#### 7.2 `…Assignment` suffix on `MetastoreAssignment` and four request types
`CreateMetastoreAssignmentRequest`, `DeleteMetastoreAssignmentRequest`,
`UpdateMetastoreAssignmentRequest`, `GetCurrentMetastoreAssignmentRequest`,
`MetastoreAssignment`. The suffix is justified because "metastore
assignment" is a distinct concept. Not redundant — flagged for
completeness.

---

### 8. Singular / plural mismatches

#### 8.1 `ListMetastoresRequest_Response.metastores` (model.ts:353)
Field is plural and correctly typed `MetastoreInfo[]` — no mismatch.
Flagged as a counter-example.

---

### 9. Reserved-word collisions

#### 9.1 `name` field on `CreateMetastoreRequest`, `MetastoreInfo`, `UpdateMetastoreRequest`, `GetMetastoreSummaryRequest_Response` response (model.ts:220, 298, 375, 477)
Routinely shadows `Function.prototype.name`. Common SDK convention; not
fixable in isolation. See also §10.1.

#### 9.2 `region` field — collides with conceptual "region" (e.g. Intl.Locale region) in browser code. Minor.

---

### 10. Duplicate concepts

#### 10.1 `MetastoreInfo` vs `GetMetastoreSummaryRequest_Response` (model.ts:294, 373)
Same 18 fields, same docs, different names. See §5.3.

#### 10.2 `CreateMetastoreRequest` vs `MetastoreInfo` vs `UpdateMetastoreRequest` (model.ts:218, 373, 471)
Massive structural duplication — `CreateMetastoreRequest` has 19 fields,
`MetastoreInfo` has 19 fields, `UpdateMetastoreRequest` has 20 fields.
The extra fields on `UpdateMetastoreRequest` are `id` (path param) and
`newName`. Every other field is replicated verbatim with the same doc
string. A shared `MetastoreCommon` (or `Partial<MetastoreInfo>`) would
let renames happen in one place. Note that all three contain the same
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`metastoreId`, `globalMetastoreId`) — these have no business on a
request shape (§11.3).

#### 10.3 `CreateMetastoreAssignmentRequest` vs `MetastoreAssignment` vs `UpdateMetastoreAssignmentRequest` (model.ts:202, 361, 455)
Three structurally identical types with three workspace-id /
metastore-id / default-catalog-name fields. Could be unified.

#### 10.4 `name` vs `newName` on `UpdateMetastoreRequest` (model.ts:475, 477)
Two name-like fields on the update request:
- `newName` — "New name for the metastore." (model.ts:475).
- `name` — "The user-specified name of the metastore." (model.ts:477).

Per the doc, both fields can hold a name. The intent is presumably
that `newName` is the rename target and `name` is left over from the
shared shape; in practice, callers cannot tell. See §11.1.

---

### 11. Field contradicting type domain

#### 11.1 `UpdateMetastoreRequest` has `id`, `name`, `newName`, and `metastoreId` (model.ts:473, 475, 477, 497)
Four name/id-like fields on a single update request:
- `id` — path parameter; the existing metastore to update.
- `metastoreId` — leftover from the shared shape; not used by the
  client method (`req.id` is what is interpolated into the URL at
  client.ts:718).
- `name` — "The user-specified name of the metastore." Ambiguous
  whether this is the current or new name.
- `newName` — "New name for the metastore." Presumably the rename
  target.

A caller staring at this struct cannot intuit which field controls
what. This is the package's single most user-hostile naming pattern,
mirroring the `UpdateCatalog` issue (catalogs §16.1).

#### 11.2 `UpdateMetastoreRequest.metastoreId` shadows `UpdateMetastoreRequest.id` (model.ts:473, 497)
Same as 11.1 — two id-like fields whose roles are not differentiated
by name.

#### 11.3 `CreateMetastoreRequest` and `UpdateMetastoreRequest` carry read-only output fields (model.ts:240-256, 497-513)
`metastoreId`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`globalMetastoreId`, `cloud`, `storageRootCredentialName`. These are
server-populated; a creator/updater setting them is at best ignored.
The type's name promises "create" or "update" but the shape
contradicts that by including read-only output. Mirror of
catalogs §16.2.

#### 11.4 `GetMetastoreSummaryRequest_Response` returns the full metastore (model.ts:294) — see §5.3. The type name promises a summary; the value is the entity.

---

### 12. Inconsistent action verbs

#### 12.1 `getMetastore` vs `getMetastoreSummary` vs `getCurrentMetastoreAssignment` (client.ts:592, 620, 567)
Three "get"-style methods, each with a different qualifier:
- `getMetastore(req)` — get by id.
- `getMetastoreSummary()` — get the current metastore (no id).
- `getCurrentMetastoreAssignment()` — get the current
  workspace/metastore assignment.

The first explicitly takes an id, the second implicitly uses the
current workspace, the third explicitly says "Current". Inconsistent
qualifier vocabulary. Either rename `getMetastoreSummary` to
`getCurrentMetastore` (which would also fix §5.4) or drop "Current"
from `getCurrentMetastoreAssignment`.

#### 12.2 No `fetch…` / `read…` / `retrieve…` outliers — read-side verbs are uniformly `get` / `list`. No issues.

---

### 13. Underspecified IDs

#### 13.1 `storageRootCredentialId` (model.ts:169, 225, 302, 381, 421, 482)
Doc says "UUID of storage credential" — the doc says UUID here, but the
field name doesn't carry the type. The field name should communicate
the identifier shape that the doc already specifies.

---

### 14. Proto / architectural-leak naming

_None._

---

### 15. Type-suffix tautology

#### 15.1 `MetastoreInfo` exposes `metastoreId` (model.ts:373, 395)
The type's domain is the metastore; the field redundantly carries the
entity name in its identifier. Acceptable convention; flagged for
completeness.

#### 15.2 `MetastoreAssignment` carries `metastoreId` (model.ts:361, 365)
Same pattern as 15.1 — entity name in field.

---

## Additional / cross-cutting observations

### A. `req.workspaceId` is interpolated into the URL via `String(req.workspaceId ?? '')` (client.ts:471, 537, 748)
If `workspaceId` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/workspaces//metastore` (note the double slash)
and the request will fail on the server. The optional typing of
`workspaceId` on `CreateMetastoreAssignmentRequest`,
`DeleteMetastoreAssignmentRequest`, and `UpdateMetastoreAssignmentRequest`
(each field is `number | undefined`) lets the bug hide.

### B. `req.id` is similarly optional but interpolated into URLs (client.ts:503, 596, 718)
`${req.id ?? ''}` — same pattern: undefined id silently produces a
malformed URL. Combined with the generic `id` name the type
contract is too loose for a required path parameter.

### C. `DeleteMetastoreAssignmentRequest.metastoreId` is sent in the query string, not the path (client.ts:538-543)
On `DELETE /api/2.1/unity-catalog/workspaces/{workspaceId}/metastore`,
the request appends `?metastore_id=…`. That contradicts the doc on
`DeleteMetastoreAssignmentRequest.metastoreId` ("Query for the ID of
the metastore to delete.") only via the leading word "Query" — the
field name itself does not signal that the value is a query parameter,
not a path one.

### D. `Client` constructor throws bare `Error` for missing `host` (client.ts:109)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

### E. `MetastoreAssignment.workspaceId` is `number` while everything else `workspaceId` is also `number` — but the rest of the SDK varies
This package's `workspaceId` is `number`. Some peer packages model
workspace IDs as strings (e.g. when forwarded through URL params).
The type inconsistency is across packages, not within this one;
flagged in passing.

---

## File / line index for fast lookup

| Identifier                                              | Location           | Finding |
| ------------------------------------------------------- | ------------------ | ------- |
| `CreateMetastoreRequest`                                | model.ts:218       | 10.2, 11.3 |
| `CreateMetastoreRequest.name`                           | model.ts:220       | 9.1     |
| `CreateMetastoreRequest.storageRootCredentialId`        | model.ts:226       | 13.1    |
| `CreateMetastoreRequest.cloud`                          | model.ts:252       | 1.2, 5.2 |
| `CreateMetastoreRequest.metastoreId` (read-only)        | model.ts:240       | 11.3, 15.1 |
| `CreateMetastoreRequest.createdAt` (read-only)          | model.ts:242       | 11.3    |
| `CreateMetastoreRequest.createdBy` (read-only)          | model.ts:244       | 11.3    |
| `CreateMetastoreRequest.updatedAt` (read-only)          | model.ts:246       | 11.3    |
| `CreateMetastoreRequest.updatedBy` (read-only)          | model.ts:248       | 11.3    |
| `CreateMetastoreRequest.storageRootCredentialName`      | model.ts:250       | 11.3    |
| `CreateMetastoreRequest.globalMetastoreId` (read-only)  | model.ts:254       | 11.3    |
| `CreateMetastoreAssignmentRequest`                      | model.ts:202       | 10.3    |
| `CreateMetastoreAssignmentRequest.workspaceId`          | model.ts:203       | E       |
| `CreateMetastoreAssignmentRequest.defaultCatalogName`   | model.ts:212       | —       |
| `DeleteMetastoreRequest`                                | model.ts:269       | —       |
| `DeleteMetastoreAssignmentRequest`                      | model.ts:259       | 10.3    |
| `DeleteMetastoreAssignmentRequest.metastoreId`          | model.ts:263       | C       |
| `GetCurrentMetastoreAssignmentRequest`                  | model.ts:283       | —       |
| `GetMetastoreRequest`                                   | model.ts:285       | —       |
| `GetMetastoreSummaryRequest`                            | model.ts:291       | —       |
| `GetMetastoreSummaryRequest_Response`                   | model.ts:294       | 5.3, 10.1, 11.4 |
| `ListMetastoresRequest`                                 | model.ts:335       | —       |
| `ListMetastoresRequest.maxResults`                      | model.ts:345       | —       |
| `ListMetastoresRequest.pageToken`                       | model.ts:347       | —       |
| `ListMetastoresRequest_Response.metastores`             | model.ts:353       | 8.1 (positive) |
| `ListMetastoresRequest_Response.nextPageToken`          | model.ts:358       | —       |
| `MetastoreAssignment`                                   | model.ts:361       | 1.1, 7.2, 10.3 |
| `MetastoreAssignment.workspaceId`                       | model.ts:363       | 1.1, E  |
| `MetastoreAssignment.metastoreId`                       | model.ts:365       | 15.2    |
| `MetastoreAssignment.defaultCatalogName`                | model.ts:370       | —       |
| `MetastoreInfo`                                         | model.ts:373       | 5.1, 7.1, 10.2 |
| `MetastoreInfo.metastoreId`                             | model.ts:395       | 15.1    |
| `UpdateMetastoreRequest`                                | model.ts:471       | 10.2, 11.1, 11.3 |
| `UpdateMetastoreRequest.id`                             | model.ts:473       | 11.1, 11.2 |
| `UpdateMetastoreRequest.newName`                        | model.ts:475       | 10.4, 11.1 |
| `UpdateMetastoreRequest.name`                           | model.ts:477       | 10.4, 11.1 |
| `UpdateMetastoreRequest.metastoreId`                    | model.ts:497       | 11.1, 11.2 |
| `UpdateMetastoreAssignmentRequest`                      | model.ts:455       | 10.3    |
| `Client.createMetastore`                                | client.ts:437      | —       |
| `Client.createMetastoreAssignment`                      | client.ts:467      | —       |
| `Client.deleteMetastore`                                | client.ts:499      | B       |
| `Client.deleteMetastoreAssignment`                      | client.ts:533      | A, C    |
| `Client.getCurrentMetastoreAssignment`                  | client.ts:567      | 12.1    |
| `Client.getMetastore`                                   | client.ts:592      | 12.1, B |
| `Client.getMetastoreSummary`                            | client.ts:620      | 5.4, 12.1 |
| `Client.listMetastores`                                 | client.ts:656      | —       |
| `Client.updateMetastore`                                | client.ts:714      | B       |
| `Client.updateMetastoreAssignment`                      | client.ts:744      | A       |
| `${req.id ?? ''}` URL substitution                      | client.ts:503, 596, 718 | B |
| `${req.workspaceId ?? ''}` URL substitution             | client.ts:471, 537, 748 | A |
| `Host is required.` bare Error                          | client.ts:109      | D       |

---

## Recommended priority order

1. **Disambiguate the four name/id-like fields on `UpdateMetastoreRequest`** (`id`, `metastoreId`, `name`, `newName`) — biggest user-facing trap. (§11.1, §10.4)
2. **Strip read-only fields from `CreateMetastoreRequest` / `UpdateMetastoreRequest`.** (§11.3, §10.2)
3. **Decide whether the `GetMetastoreSummaryRequest_Response` should alias `MetastoreInfo` or expose a genuine subset.** (§5.3, §10.1)
4. **Rename `getMetastoreSummary` to `getCurrentMetastore`** to match `getCurrentMetastoreAssignment` and accurately describe the call. (§5.4, §12.1)
5. **Tighten optional-typing on URL-bound parameters** (`id`, `workspaceId`) so undefined values are caught at compile time, not by malformed URLs. (Cross-cutting A, B)

---
