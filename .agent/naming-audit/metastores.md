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
The dominant naming problems are structural: `CreateMetastore`,
`UpdateMetastore`, and `MetastoreInfo` share 18 fields verbatim,
including read-only output fields (`createdAt`, `createdBy`, `updatedAt`,
`updatedBy`, `metastoreId`, `globalMetastoreId`) that have no business in
a write request. `UpdateMetastore` further conflates a path-parameter
`id`, a body `name`, and a "rename target" `newName`.
`GetMetastoreSummary_Response` is structurally identical to
`MetastoreInfo` despite the "summary" name promising a smaller shape.

---

## Findings

### 1. Vague / generic names

#### 1.1 `DeleteMetastore.id`, `GetMetastore.id`, `UpdateMetastore.id` (model.ts:79, 105, 234)
Field name `id` on three request types where the surrounding type
already conveys the entity ("delete metastore", "get metastore", "update
metastore"). The doc string is "Unique ID of the metastore." — i.e. the
field is the metastore id. The same concept appears as `metastoreId`
everywhere else in the package (model.ts:42, 64, 91, 113, 213, 258,
etc.), so the bare `id` is inconsistent and ambiguous in isolation
(e.g. spreading `{...req, id: someValue}` is brittle). Recommend
`metastoreId` (or, if the goal is to mark it as the path param, see
§5.1 / §10.1).

#### 1.2 `MetastoreAssignment.workspaceId` and `metastoreId` (model.ts:181, 183)
Acceptable in isolation — but the *type* `MetastoreAssignment` is just
a `(workspaceId, metastoreId, defaultCatalogName)` triple. The name
"MetastoreAssignment" promises richer semantics than the three-field
struct delivers. Consider `WorkspaceMetastoreLink` or making the
relationship directional in the name.

#### 1.3 `DeleteMetastore.force` (model.ts:81)
Generic boolean — "force" alone leaves callers to read the doc to learn
the consequences ("Force deletion even if the metastore is not empty.").
A more descriptive name (`forceDeleteNonEmpty`, `deleteNonEmpty`)
captures the intent at the call site. Acceptable as a convention but
worth flagging.

#### 1.4 `cloud` field (model.ts:54, 122, 225, 270)
A bare `cloud: string` with a single example list in the doc (`aws`,
`azure`, `gcp`). Should probably be typed as a `CloudProvider` enum
(see §5.4) — but at minimum the field is generic when read alone.

#### 1.5 `owner` field (model.ts:36, 140, 207, 252)
"The owner of the metastore." — generic. Owner of what kind? Username?
Email? Group? Service principal? Documented as a free-form string with
no format hint. See §13.4.

#### 1.6 `region` (model.ts:40, 124, 211, 256)
Bare `region: string` with examples (`us-west-2`, `westus`). Acceptable
as cloud-vendor-specific opaque strings, but the same field carries
different vocabularies across `aws` / `azure` / `gcp` — that
heterogeneity isn't reflected in the name or doc.

---

### 2. Redundant enum prefixes

_None._

---

### 3. Acronym casing inconsistencies

#### 3.1 `DBR` in doc strings (model.ts:57, 149, 228, 273)
Doc says "Whether to allow non-DBR clients to directly access entities
under the metastore." DBR (Databricks Runtime) is an internal acronym
not introduced anywhere in the package. Doc-only, not a code-naming
issue per se, but it's a documentation acronym that won't mean anything
to external SDK consumers.

#### 3.2 `UUID` casing in docs (model.ts:27, 119, 198, 243)
"UUID of storage credential" — UUID is in the doc only. The field is
named `storageRootCredentialId` (lowercase `Id`). Consistent with
ECMAScript identifier convention; flagged in passing.

#### 3.3 `URL` casing in docs (model.ts:23, 138, 194, 239)
"The storage root URL" — `URL` in docs, but the field is
`storageRoot`, not `storageRootUrl`. Inconsistent with how
`globalMetastoreId` etc. embed type info in the name. See also §5.2.

#### 3.4 `<Databricks>` placeholder tokens in docs (model.ts:69, 180, 285)
Literal `<Databricks>` strings appear in doc comments — these are
unsubstituted templating placeholders. Not a naming issue, but
surfaces as a publication bug for SDK consumers reading the generated
TypeDoc.

---

### 4. Cryptic abbreviations

#### 4.1 `id` (model.ts:79, 105, 234) — see §1.1
Cryptic because it loses the entity context. `metastoreId` is used
elsewhere.

#### 4.2 `Ms` suffix absent on timestamp fields
Counter-example: timestamp fields are documented as "epoch
milliseconds" but the names omit the unit suffix (`createdAt`,
`updatedAt`). See §13.5.

---

### 5. Misleading names

#### 5.1 `MetastoreInfo` (model.ts:191)
"Info" suggests metadata about a metastore separate from the entity
itself; the type is in fact the entity. See also §7.1.

#### 5.2 `storageRoot` doc says "URL" (model.ts:23, 138, 194, 239)
"The storage root URL for metastore" — the field is named
`storageRoot`, but documented as a URL. Rename to `storageRootUrl`,
or rename the doc. Today the name is vague about the value's shape.

#### 5.3 `globalMetastoreId` (model.ts:56, 126, 227, 271)
Doc: "Globally unique metastore ID across clouds and regions, of the
form `cloud:region:metastore_id`." So the value is a composite
formatted string, not an ID in the conventional sense. Either rename
to `globalMetastoreLocator` / `globalMetastoreUri` to signal the
encoded shape, or document its parseable structure in a type.

#### 5.4 `defaultDataAccessConfigId` (model.ts:26, 118, 197, 242)
Doc says "Unique identifier of the metastore's (Default) Data Access
Configuration." The parenthetical "Default" duplicates the `default`
prefix in the name, but the field is described as both the default
data-access-config and as a unique identifier. Slightly self-referential
and unclear whether this is mutable or static. See also §13.3.

#### 5.5 `cloud: string` (model.ts:54, 122, 225, 270)
Holds an enum-like vocabulary (`aws`, `azure`, `gcp`) but is typed as
`string`. The name is fine; the *type* misleads about the value
space. See §1.4.

#### 5.6 `region: string` carries cloud-specific formats (model.ts:40, 124, 211, 256)
"e.g., `us-west-2`, `westus`" — same field carries AWS-style and
Azure-style region names. Name is fine; doc just shows the
heterogeneity. See §1.6.

#### 5.7 `GetMetastoreSummary` response is structurally identical to `MetastoreInfo` (model.ts:112-151 vs 191-230)
Both types have the *same* 18 fields with the *same* docs in the *same*
order. The "summary" type doesn't actually summarise — it returns the
full metastore record. The name lies about the content. The Go SDK
inherits this from the API definition, but the TS port could collapse
the two: either alias the summary response to `MetastoreInfo` or
expose the genuinely-summarised subset.

#### 5.8 `getMetastoreSummary` is presented as info-about (client.ts:266-269)
JSDoc says "Gets information about a metastore. This summary
includes…". But the API in fact returns the current workspace's
metastore — there is no metastore ID parameter. The name "summary"
omits the "current-workspace" semantics. Cf.
`getCurrentMetastoreAssignment`, which spells out "current". See also
§11.1.

---

### 6. Overly verbose

#### 6.1 `getCurrentMetastoreAssignment` (client.ts:216)
28-character method name. Acceptable — describes the semantics — but
combined with `getMetastoreSummary` (which is also "current-workspace"
in practice, §5.8) one of them carries redundant prefixing.

---

### 7. Redundant suffixes

#### 7.1 `…Info` suffix on `MetastoreInfo` (model.ts:191)
"Info" carries no semantic content. Go-SDK convention; TS would just
say `Metastore`. See §9.3.

#### 7.2 `…Assignment` suffix on `MetastoreAssignment` and four request types
`CreateMetastoreAssignment`, `DeleteMetastoreAssignment`,
`UpdateMetastoreAssignment`, `GetCurrentMetastoreAssignment`,
`MetastoreAssignment`. The suffix is justified because "metastore
assignment" is a distinct concept. Not redundant — flagged for
completeness.

---

### 8. Singular / plural mismatches

#### 8.1 `ListMetastoresResponse.metastores` (model.ts:171)
Field is plural and correctly typed `MetastoreInfo[]` — no mismatch.
Flagged as a counter-example.

---

### 9. Reserved-word collisions

#### 9.1 `name` field on `CreateMetastore`, `MetastoreInfo`, `UpdateMetastore`, `GetMetastoreSummary` response (model.ts:22, 116, 193, 238)
Routinely shadows `Function.prototype.name`. Common SDK convention; not
fixable in isolation. See also §10.1.

#### 9.2 `id` field on `DeleteMetastore`, `GetMetastore`, `UpdateMetastore` (model.ts:79, 105, 234)
Collides with `Element.id` and other web-platform-y identifiers when
the request type is used in browser code. Not a TS-level collision but
a cognitive one. See §1.1.

#### 9.3 `region` field — collides with conceptual "region" (e.g. Intl.Locale region) in browser code. Minor.

---

### 10. Duplicate concepts

#### 10.1 `MetastoreInfo` vs `GetMetastoreSummary` response (model.ts:112, 191)
Same 18 fields, same docs, different names. See §5.7.

#### 10.2 `CreateMetastore` vs `MetastoreInfo` vs `UpdateMetastore` (model.ts:20, 191, 232)
Massive structural duplication — `CreateMetastore` has 19 fields,
`MetastoreInfo` has 19 fields, `UpdateMetastore` has 20 fields. The
extra field on `UpdateMetastore` is `id` (path param) plus `newName`.
Every other field is replicated verbatim with the same doc string. A
shared `MetastoreCommon` (or `Partial<MetastoreInfo>`) would let
renames happen in one place. Note that all three contain the same
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`metastoreId`, `globalMetastoreId`) — these have no business on a
request shape (§11.3).

#### 10.3 `CreateMetastoreAssignment` vs `MetastoreAssignment` vs `UpdateMetastoreAssignment` (model.ts:61, 179, 277)
Three structurally identical types with three workspace-id /
metastore-id / default-catalog-name fields. Could be unified.

#### 10.4 `id` (on `DeleteMetastore`/`GetMetastore`/`UpdateMetastore`) vs `metastoreId` (everywhere else)
Same concept, two names. See §1.1.

#### 10.5 `name` (CreateMetastore body) vs metastore identity
`CreateMetastore.name` is "the user-specified name of the metastore"
— but `MetastoreInfo` also exposes `metastoreId` as the canonical
unique identifier. The naming pretends `name` is unique but in fact
the server creates `metastoreId` as the immutable key and `name` is
mutable. The doc could disclose this; the name doesn't.

#### 10.6 `name` vs `newName` on `UpdateMetastore` (model.ts:236, 238)
Two name-like fields on the update request:
- `newName` — "New name for the metastore." (model.ts:236).
- `name` — "The user-specified name of the metastore." (model.ts:238).

Per the doc, both fields can hold a name. The intent is presumably
that `newName` is the rename target and `name` is left over from the
shared shape; in practice, callers cannot tell. See §11.1.

---

### 11. Field contradicting type domain

#### 11.1 `UpdateMetastore` has `id`, `name`, `newName`, and `metastoreId` (model.ts:234, 236, 238, 258)
Four name/id-like fields on a single update request:
- `id` — path parameter; the existing metastore to update.
- `metastoreId` — leftover from the shared shape; not used by the
  client method (`req.id` is what is interpolated into the URL at
  client.ts:364).
- `name` — "The user-specified name of the metastore." Ambiguous
  whether this is the current or new name.
- `newName` — "New name for the metastore." Presumably the rename
  target.

A caller staring at this struct cannot intuit which field controls
what. This is the package's single most user-hostile naming pattern,
mirroring the `UpdateCatalog` issue (catalogs §16.1).

#### 11.2 `UpdateMetastore.metastoreId` shadows `UpdateMetastore.id` (model.ts:234, 258)
Same as 11.1 — two id-like fields whose roles are not differentiated
by name.

#### 11.3 `CreateMetastore` and `UpdateMetastore` carry read-only output fields (model.ts:42-58, 258-274)
`metastoreId`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`globalMetastoreId`, `cloud`, `storageRootCredentialName`. These are
server-populated; a creator/updater setting them is at best ignored.
The type's name promises "create" or "update" but the shape
contradicts that by including read-only output. Mirror of
catalogs §16.2.

#### 11.4 `GetMetastoreSummary` response returns the full metastore (model.ts:112) — see §5.7. The type name promises a summary; the value is the entity.

---

### 12. Inconsistent action verbs

#### 12.1 `getMetastore` vs `getMetastoreSummary` vs `getCurrentMetastoreAssignment` (client.ts:241, 269, 216)
Three "get"-style methods, each with a different qualifier:
- `getMetastore(req)` — get by id.
- `getMetastoreSummary()` — get the current metastore (no id).
- `getCurrentMetastoreAssignment()` — get the current
  workspace/metastore assignment.

The first explicitly takes an id, the second implicitly uses the
current workspace, the third explicitly says "Current". Inconsistent
qualifier vocabulary. Either rename `getMetastoreSummary` to
`getCurrentMetastore` (which would also fix §5.8) or drop "Current"
from `getCurrentMetastoreAssignment`.

#### 12.2 No `fetch…` / `read…` / `retrieve…` outliers — read-side verbs are uniformly `get` / `list`. No issues.

---

### 13. Underspecified IDs

#### 13.1 `metastoreId` (model.ts:42, 64, 91, 113, 183, 213, 258, 281)
Documented as "Unique identifier of metastore" / "The unique ID of the
metastore." Format is opaque — likely a UUID, but never specified in
the doc.

#### 13.2 `workspaceId` (model.ts:63, 89, 181, 279)
`number` — that's specified by the type, but the doc just says "A
workspace ID." with no range or stability guarantee. Acceptable for a
numeric id; flagged because the format isn't documented in the field.

#### 13.3 `defaultDataAccessConfigId` (model.ts:26, 118, 197, 242)
"Unique identifier of the metastore's (Default) Data Access
Configuration." No format hint (UUID? slug?). See §5.4.

#### 13.4 `storageRootCredentialId` (model.ts:28, 120, 199, 244)
Doc says "UUID of storage credential" — at least the doc says UUID
here, but the field name doesn't carry the type. Counter-example to
§13.1: when the doc *does* specify UUID, the field still doesn't carry
it.

#### 13.5 `createdAt`, `updatedAt` (model.ts:44, 48, 142, 146, 215, 219, 260, 264)
Doc says "epoch milliseconds" but the names lack the `Ms` unit
suffix. Inconsistent across the package.

#### 13.6 `globalMetastoreId` (model.ts:56, 126, 227, 271)
Documented as a composite `cloud:region:metastore_id` string — not a
simple ID. The name promises an ID; the value is a structured
locator. See §5.3.

#### 13.7 `owner`, `createdBy`, `updatedBy` (model.ts:36, 46, 50, 140, 144, 148, 207, 217, 221, 252, 262, 266)
Documented as "username", "Username of metastore creator", etc.
Format (email? user id? group?) is unspecified. The names imply
identity; the doc only narrows to "username".

---

### 14. Type-suffix tautology

#### 14.1 `MetastoreInfo` exposes `metastoreId` (model.ts:191, 213)
The type's domain is the metastore; the field redundantly carries the
entity name in its identifier. Acceptable convention; flagged for
completeness.

#### 14.2 `MetastoreAssignment` carries `metastoreId` (model.ts:179, 183)
Same pattern as 14.1 — entity name in field.

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `deleteMetastore` / `deleteMetastoreAssignment` / `listMetastores`
handler builds query strings inline with `URLSearchParams.append`
(client.ts:156-159, 187-190, 310-316). The exported helper
`flattenQueryParams` is never referenced by `client.ts`. Either it's
intentionally exported for consumer use (then it should be documented
and reside in `utils` proper) or it's dead code. Same as catalogs
cross-cutting A.

### B. `req.workspaceId` is interpolated into the URL via `String(req.workspaceId ?? '')` (client.ts:126, 186, 394)
If `workspaceId` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/workspaces//metastore` (note the double slash)
and the request will fail on the server. The optional typing of
`workspaceId` on `CreateMetastoreAssignment`,
`DeleteMetastoreAssignment`, and `UpdateMetastoreAssignment` (each
field is `number | undefined`) lets the bug hide.

### C. `req.id` is similarly optional but interpolated into URLs (client.ts:155, 245, 364)
`${req.id ?? ''}` — same pattern: undefined id silently produces a
malformed URL. Combined with the generic `id` name (§1.1) the type
contract is too loose for a required path parameter.

### D. `DeleteMetastoreAssignment.metastoreId` is sent in the query string, not the path (client.ts:186-191)
On `DELETE /api/2.1/unity-catalog/workspaces/{workspaceId}/metastore`,
the request appends `?metastore_id=…`. That contradicts the doc on
`DeleteMetastoreAssignment.metastoreId` ("Query for the ID of the
metastore to delete.") only via the leading word "Query" — the field
name itself does not signal that the value is a query parameter, not
a path one.

### E. `Client` constructor throws bare `Error` for missing `host` (client.ts:72)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

### F. `MetastoreAssignment.workspaceId` is `number` while everything else `workspaceId` is also `number` — but the rest of the SDK varies
This package's `workspaceId` is `number`. Some peer packages model
workspace IDs as strings (e.g. when forwarded through URL params).
The type inconsistency is across packages, not within this one;
flagged in passing.

---

## File / line index for fast lookup

| Identifier                                              | Location           | Finding |
| ------------------------------------------------------- | ------------------ | ------- |
| `CreateMetastore`                                       | model.ts:20        | 10.2, 11.3 |
| `CreateMetastore.name`                                  | model.ts:22        | 9.1, 10.5 |
| `CreateMetastore.storageRoot`                           | model.ts:24        | 5.2     |
| `CreateMetastore.defaultDataAccessConfigId`             | model.ts:26        | 5.4, 13.3 |
| `CreateMetastore.storageRootCredentialId`               | model.ts:28        | 13.4    |
| `CreateMetastore.owner`                                 | model.ts:36        | 1.5, 13.7 |
| `CreateMetastore.region`                                | model.ts:40        | 1.6, 5.6 |
| `CreateMetastore.metastoreId` (read-only on Create)     | model.ts:42        | 11.3, 13.1, 14.1 |
| `CreateMetastore.createdAt` (read-only on Create)       | model.ts:44        | 11.3, 13.5 |
| `CreateMetastore.createdBy` (read-only on Create)       | model.ts:46        | 11.3, 13.7 |
| `CreateMetastore.updatedAt` (read-only on Create)       | model.ts:48        | 11.3, 13.5 |
| `CreateMetastore.updatedBy` (read-only on Create)       | model.ts:50        | 11.3, 13.7 |
| `CreateMetastore.storageRootCredentialName` (read-only) | model.ts:52        | 11.3    |
| `CreateMetastore.cloud`                                 | model.ts:54        | 1.4, 5.5 |
| `CreateMetastore.globalMetastoreId` (read-only)         | model.ts:56        | 5.3, 11.3, 13.6 |
| `CreateMetastore.externalAccessEnabled`                 | model.ts:58        | 3.1 (doc) |
| `CreateMetastoreAssignment`                             | model.ts:61        | 10.3    |
| `CreateMetastoreAssignment.workspaceId`                 | model.ts:63        | 13.2, F |
| `CreateMetastoreAssignment.metastoreId`                 | model.ts:65        | 13.1    |
| `CreateMetastoreAssignment.defaultCatalogName`          | model.ts:71        | —       |
| `DeleteMetastore`                                       | model.ts:77        | —       |
| `DeleteMetastore.id`                                    | model.ts:79        | 1.1, 4.1, 9.2, 10.4 |
| `DeleteMetastore.force`                                 | model.ts:81        | 1.3     |
| `DeleteMetastoreAssignment`                             | model.ts:87        | 10.3    |
| `DeleteMetastoreAssignment.workspaceId`                 | model.ts:89        | 13.2    |
| `DeleteMetastoreAssignment.metastoreId`                 | model.ts:91        | 13.1, D |
| `GetCurrentMetastoreAssignment`                         | model.ts:101       | —       |
| `GetMetastore`                                          | model.ts:103       | —       |
| `GetMetastore.id`                                       | model.ts:105       | 1.1, 4.1, 9.2, 10.4 |
| `GetMetastoreSummary`                                   | model.ts:109       | —       |
| `GetMetastoreSummary` response                          | model.ts:112       | 5.7, 10.1, 11.4 |
| `ListMetastores`                                        | model.ts:153       | —       |
| `ListMetastores.maxResults`                             | model.ts:163       | —       |
| `ListMetastores.pageToken`                              | model.ts:165       | —       |
| `ListMetastoresResponse.metastores`                     | model.ts:171       | 8.1 (positive) |
| `ListMetastoresResponse.nextPageToken`                  | model.ts:176       | —       |
| `MetastoreAssignment`                                   | model.ts:179       | 1.2, 7.2, 10.3 |
| `MetastoreAssignment.workspaceId`                       | model.ts:181       | 1.2, 13.2, F |
| `MetastoreAssignment.metastoreId`                       | model.ts:183       | 13.1, 14.2 |
| `MetastoreAssignment.defaultCatalogName`                | model.ts:188       | —       |
| `MetastoreInfo`                                         | model.ts:191       | 5.1, 7.1, 10.2 |
| `MetastoreInfo.metastoreId`                             | model.ts:213       | 13.1, 14.1 |
| `MetastoreInfo.globalMetastoreId`                       | model.ts:227       | 5.3, 13.6 |
| `UpdateMetastore`                                       | model.ts:232       | 10.2, 11.1, 11.3 |
| `UpdateMetastore.id`                                    | model.ts:234       | 1.1, 4.1, 11.1, 11.2 |
| `UpdateMetastore.newName`                               | model.ts:236       | 10.6, 11.1 |
| `UpdateMetastore.name`                                  | model.ts:238       | 10.6, 11.1 |
| `UpdateMetastore.metastoreId`                           | model.ts:258       | 11.1, 11.2 |
| `UpdateMetastoreAssignment`                             | model.ts:277       | 10.3    |
| `UpdateMetastoreAssignment.workspaceId`                 | model.ts:279       | 13.2    |
| `Client.createMetastore`                                | client.ts:92       | —       |
| `Client.createMetastoreAssignment`                      | client.ts:122      | —       |
| `Client.deleteMetastore`                                | client.ts:151      | C       |
| `Client.deleteMetastoreAssignment`                      | client.ts:182      | B, D    |
| `Client.getCurrentMetastoreAssignment`                  | client.ts:216      | 12.1    |
| `Client.getMetastore`                                   | client.ts:241      | 12.1, C |
| `Client.getMetastoreSummary`                            | client.ts:269      | 5.8, 12.1 |
| `Client.listMetastores`                                 | client.ts:305      | —       |
| `Client.updateMetastore`                                | client.ts:360      | C       |
| `Client.updateMetastoreAssignment`                      | client.ts:390      | B       |
| `${req.id ?? ''}` URL substitution                      | client.ts:155, 245, 364 | C |
| `${req.workspaceId ?? ''}` URL substitution             | client.ts:126, 186, 394 | B |
| `Host is required.` bare Error                          | client.ts:72       | E       |
| `flattenQueryParams` (unused export)                    | utils.ts:123       | A       |

---

## Recommended priority order

1. **Disambiguate the four name/id-like fields on `UpdateMetastore`** (`id`, `metastoreId`, `name`, `newName`) — biggest user-facing trap. (§11.1, §10.6, §1.1)
2. **Strip read-only fields from `CreateMetastore` / `UpdateMetastore`.** (§11.3, §10.2)
3. **Decide whether the `GetMetastoreSummary` response should alias `MetastoreInfo` or expose a genuine subset.** (§5.7, §10.1)
4. **Rename `getMetastoreSummary` to `getCurrentMetastore`** to match `getCurrentMetastoreAssignment` and accurately describe the call. (§5.8, §12.1)
5. **Unify naming around `id` vs `metastoreId`** — pick one for the path parameter; converge body fields on the other. (§1.1, §10.4)
6. **Tighten optional-typing on URL-bound parameters** (`id`, `workspaceId`) so undefined values are caught at compile time, not by malformed URLs. (Cross-cutting B, C)
7. **Add unit suffixes to `createdAt` / `updatedAt`** (`createdAtMs` etc.) to match common conventions. (§13.5)
8. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
