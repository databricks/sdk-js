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
The naming issues split into two broad classes:

1. **Proto-style identifiers leaking into TypeScript** —
   `DeltaSharingScope_Enum`, `*_Response`.
2. **Massive structural duplication** — `CreateMetastore`,
   `UpdateMetastore`, and `MetastoreInfo` share 18 fields verbatim,
   including read-only output fields (`createdAt`, `createdBy`,
   `updatedAt`, `updatedBy`, `metastoreId`, `globalMetastoreId`) that
   have no business in a write request. `UpdateMetastore` further
   conflates a path-parameter `id`, a body `name`, and a "rename target"
   `newName`.

`DeltaSharingScope_Enum` is the single most visible cosmetic violation
(underscore identifier and `_Enum` suffix tautology), and it shows up
on three different types.

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
§5.1 / §12.1).

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
(see §6.4) — but at minimum the field is generic when read alone.

#### 1.5 `owner` field (model.ts:36, 140, 207, 252)
"The owner of the metastore." — generic. Owner of what kind? Username?
Email? Group? Service principal? Documented as a free-form string with
no format hint. See §15.4.

#### 1.6 `region` (model.ts:40, 124, 211, 256)
Bare `region: string` with examples (`us-west-2`, `westus`). Acceptable
as cloud-vendor-specific opaque strings, but the same field carries
different vocabularies across `aws` / `azure` / `gcp` — that
heterogeneity isn't reflected in the name or doc.

---

### 2. Redundant enum prefixes

#### 2.1 `DeltaSharingScope_Enum.INTERNAL_AND_EXTERNAL` (model.ts:17)
Variants are `INTERNAL` and `INTERNAL_AND_EXTERNAL`. The enum name
already says "DeltaSharingScope" — the variants do not repeat that
prefix, which is good. However, `INTERNAL_AND_EXTERNAL` is verbose
(see §14.1) — a single canonical name like `ALL` or a pair like
`INTERNAL` / `EXTERNAL` would be clearer.

(No `*_DELTA_SHARING_SCOPE_*` prefix issue here — variants are clean.
But see §4.1 for the enum *type* name.)

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
`globalMetastoreId` etc. embed type info in the name. See also §6.2.

#### 3.4 `<Databricks>` placeholder tokens in docs (model.ts:69, 180, 285)
Literal `<Databricks>` strings appear in doc comments — these are
unsubstituted templating placeholders. Not a naming issue, but
surfaces as a publication bug for SDK consumers reading the generated
TypeDoc.

---

### 4. Underscores in TypeScript identifiers

The package's most pervasive cosmetic problem. Every underscore-bearing
identifier is silenced with an
`@typescript-eslint/naming-convention -- Proto-style…` disable comment,
i.e. the lint rule already objects.

#### 4.1 `DeltaSharingScope_Enum` (model.ts:6)
Should be `DeltaSharingScope`. The `_Enum` suffix is a proto-port
artifact (see also §8.2 and §16.1). The enum is referenced in five
places (lines 30, 132, 201, 246, 318, 385, 434, 493) — every reference
inherits the awkward name.

#### 4.2 `CreateMetastoreAssignment_Response` (model.ts:75)
Should be `CreateMetastoreAssignmentResponse`.

#### 4.3 `DeleteMetastore_Response` (model.ts:85)
Should be `DeleteMetastoreResponse`.

#### 4.4 `DeleteMetastoreAssignment_Response` (model.ts:95)
Should be `DeleteMetastoreAssignmentResponse`.

#### 4.5 `GetMetastoreSummary_Response` (model.ts:112)
Should be `GetMetastoreSummaryResponse`. (Non-empty — it's the only
genuinely useful `_Response` in the package; see §6.6.)

#### 4.6 `ListMetastores_Response` (model.ts:169)
Should be `ListMetastoresResponse`.

#### 4.7 `UpdateMetastoreAssignment_Response` (model.ts:291)
Should be `UpdateMetastoreAssignmentResponse`.

---

### 5. Cryptic abbreviations

#### 5.1 `id` (model.ts:79, 105, 234) — see §1.1
Cryptic because it loses the entity context. `metastoreId` is used
elsewhere.

#### 5.2 `Ms` suffix absent on timestamp fields
Counter-example: timestamp fields are documented as "epoch
milliseconds" but the names omit the unit suffix (`createdAt`,
`updatedAt`). See §15.5.

---

### 6. Misleading names

#### 6.1 `MetastoreInfo` (model.ts:191)
"Info" suggests metadata about a metastore separate from the entity
itself; the type is in fact the entity. See also §8.1.

#### 6.2 `storageRoot` doc says "URL" (model.ts:23, 138, 194, 239)
"The storage root URL for metastore" — the field is named
`storageRoot`, but documented as a URL. Rename to `storageRootUrl`,
or rename the doc. Today the name is vague about the value's shape.

#### 6.3 `globalMetastoreId` (model.ts:56, 126, 227, 271)
Doc: "Globally unique metastore ID across clouds and regions, of the
form `cloud:region:metastore_id`." So the value is a composite
formatted string, not an ID in the conventional sense. Either rename
to `globalMetastoreLocator` / `globalMetastoreUri` to signal the
encoded shape, or document its parseable structure in a type.

#### 6.4 `defaultDataAccessConfigId` (model.ts:26, 118, 197, 242)
Doc says "Unique identifier of the metastore's (Default) Data Access
Configuration." The parenthetical "Default" duplicates the `default`
prefix in the name, but the field is described as both the default
data-access-config and as a unique identifier. Slightly self-referential
and unclear whether this is mutable or static. See also §15.3.

#### 6.5 `cloud: string` (model.ts:54, 122, 225, 270)
Holds an enum-like vocabulary (`aws`, `azure`, `gcp`) but is typed as
`string`. The name is fine; the *type* misleads about the value
space. Compare with `DeltaSharingScope_Enum`, which is explicitly an
enum. See §1.4.

#### 6.6 `region: string` carries cloud-specific formats (model.ts:40, 124, 211, 256)
"e.g., `us-west-2`, `westus`" — same field carries AWS-style and
Azure-style region names. Name is fine; doc just shows the
heterogeneity. See §1.6.

#### 6.7 `GetMetastoreSummary_Response` is structurally identical to `MetastoreInfo` (model.ts:112-151 vs 191-230)
Both types have the *same* 18 fields with the *same* docs in the *same*
order. The "summary" type doesn't actually summarise — it returns the
full metastore record. The name lies about the content. The Go SDK
inherits this from the API definition, but the TS port could collapse
the two: either alias `GetMetastoreSummaryResponse = MetastoreInfo` or
expose the genuinely-summarised subset.

#### 6.8 `getMetastoreSummary` is presented as info-about (client.ts:266-269)
JSDoc says "Gets information about a metastore. This summary
includes…". But the API in fact returns the current workspace's
metastore — there is no metastore ID parameter. The name "summary"
omits the "current-workspace" semantics. Cf.
`getCurrentMetastoreAssignment`, which spells out "current". See also
§13.1.

---

### 7. Overly verbose

#### 7.1 `getCurrentMetastoreAssignment` (client.ts:216)
28-character method name. Acceptable — describes the semantics — but
combined with `getMetastoreSummary` (which is also "current-workspace"
in practice, §6.8) one of them carries redundant prefixing.

---

### 8. Redundant suffixes

#### 8.1 `…Info` suffix on `MetastoreInfo` (model.ts:191)
"Info" carries no semantic content. Go-SDK convention; TS would just
say `Metastore`. See §10.3.

#### 8.2 `…_Enum` suffix on `DeltaSharingScope_Enum` (model.ts:6) — see §4.1.
TypeScript enums are already enums; the suffix tautological.

#### 8.3 `…Assignment` suffix on `MetastoreAssignment` and four request types
`CreateMetastoreAssignment`, `DeleteMetastoreAssignment`,
`UpdateMetastoreAssignment`, `GetCurrentMetastoreAssignment`,
`MetastoreAssignment`. The suffix is justified because "metastore
assignment" is a distinct concept. Not redundant — flagged for
completeness.

---

### 9. Singular / plural mismatches

#### 9.1 `ListMetastores_Response.metastores` (model.ts:171)
Field is plural and correctly typed `MetastoreInfo[]` — no mismatch.
Flagged as a counter-example.

---

### 10. Reserved-word collisions

#### 10.1 `name` field on `CreateMetastore`, `MetastoreInfo`, `UpdateMetastore`, `GetMetastoreSummary_Response` (model.ts:22, 116, 193, 238)
Routinely shadows `Function.prototype.name`. Common SDK convention; not
fixable in isolation. See also §12.1.

#### 10.2 `id` field on `DeleteMetastore`, `GetMetastore`, `UpdateMetastore` (model.ts:79, 105, 234)
Collides with `Element.id` and other web-platform-y identifiers when
the request type is used in browser code. Not a TS-level collision but
a cognitive one. See §1.1.

#### 10.3 `region` field — collides with conceptual "region" (e.g. Intl.Locale region) in browser code. Minor.

---

### 11. Duplicate concepts

#### 11.1 `DeltaSharingScope` interface vs `DeltaSharingScope_Enum` enum (model.ts:6, 98)
Two distinct exports with near-identical names — one is the enum, the
other a separate type. A user importing `DeltaSharingScope` will get
the non-enum export and silently get the wrong shape. The naming is
maximally hostile and the `_Enum` suffix on the enum exists solely to
disambiguate from this sibling.

#### 11.2 `MetastoreInfo` vs `GetMetastoreSummary_Response` (model.ts:112, 191)
Same 18 fields, same docs, different names. See §6.7.

#### 11.3 `CreateMetastore` vs `MetastoreInfo` vs `UpdateMetastore` (model.ts:20, 191, 232)
Massive structural duplication — `CreateMetastore` has 19 fields,
`MetastoreInfo` has 19 fields, `UpdateMetastore` has 20 fields. The
extra field on `UpdateMetastore` is `id` (path param) plus `newName`.
Every other field is replicated verbatim with the same doc string. A
shared `MetastoreCommon` (or `Partial<MetastoreInfo>`) would let
renames happen in one place. Note that all three contain the same
read-only fields (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`metastoreId`, `globalMetastoreId`) — these have no business on a
request shape (§12.3).

#### 11.4 `CreateMetastoreAssignment` vs `MetastoreAssignment` vs `UpdateMetastoreAssignment` (model.ts:61, 179, 277)
Three structurally identical types with three workspace-id /
metastore-id / default-catalog-name fields. Could be unified.

#### 11.5 `id` (on `DeleteMetastore`/`GetMetastore`/`UpdateMetastore`) vs `metastoreId` (everywhere else)
Same concept, two names. See §1.1.

#### 11.6 `name` (CreateMetastore body) vs metastore identity
`CreateMetastore.name` is "the user-specified name of the metastore"
— but `MetastoreInfo` also exposes `metastoreId` as the canonical
unique identifier. The naming pretends `name` is unique but in fact
the server creates `metastoreId` as the immutable key and `name` is
mutable. The doc could disclose this; the name doesn't.

#### 11.7 `name` vs `newName` on `UpdateMetastore` (model.ts:236, 238)
Two name-like fields on the update request:
- `newName` — "New name for the metastore." (model.ts:236).
- `name` — "The user-specified name of the metastore." (model.ts:238).

Per the doc, both fields can hold a name. The intent is presumably
that `newName` is the rename target and `name` is left over from the
shared shape; in practice, callers cannot tell. See §12.1.

---

### 12. Field contradicting type domain

#### 12.1 `UpdateMetastore` has `id`, `name`, `newName`, and `metastoreId` (model.ts:234, 236, 238, 258)
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

#### 12.2 `UpdateMetastore.metastoreId` shadows `UpdateMetastore.id` (model.ts:234, 258)
Same as 12.1 — two id-like fields whose roles are not differentiated
by name.

#### 12.3 `CreateMetastore` and `UpdateMetastore` carry read-only output fields (model.ts:42-58, 258-274)
`metastoreId`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`globalMetastoreId`, `cloud`, `storageRootCredentialName`. These are
server-populated; a creator/updater setting them is at best ignored.
The type's name promises "create" or "update" but the shape
contradicts that by including read-only output. Mirror of
catalogs §16.2.

#### 12.4 `GetMetastoreSummary_Response` returns the full metastore (model.ts:112) — see §6.7. The type name promises a summary; the value is the entity.

---

### 13. Inconsistent action verbs

#### 13.1 `getMetastore` vs `getMetastoreSummary` vs `getCurrentMetastoreAssignment` (client.ts:241, 269, 216)
Three "get"-style methods, each with a different qualifier:
- `getMetastore(req)` — get by id.
- `getMetastoreSummary()` — get the current metastore (no id).
- `getCurrentMetastoreAssignment()` — get the current
  workspace/metastore assignment.

The first explicitly takes an id, the second implicitly uses the
current workspace, the third explicitly says "Current". Inconsistent
qualifier vocabulary. Either rename `getMetastoreSummary` to
`getCurrentMetastore` (which would also fix §6.8) or drop "Current"
from `getCurrentMetastoreAssignment`.

#### 13.2 No `fetch…` / `read…` / `retrieve…` outliers — read-side verbs are uniformly `get` / `list`. No issues.

---

### 14. Long enum values

#### 14.1 `DeltaSharingScope_Enum.INTERNAL_AND_EXTERNAL` (model.ts:17)
20 characters. Two of two variants is verbose. A pair `INTERNAL` /
`EXTERNAL` (where `EXTERNAL` implies "in addition to internal") would
be punchier. The current name doubles as a poor man's bit-flag. See §2.1.

---

### 15. Underspecified IDs

#### 15.1 `metastoreId` (model.ts:42, 64, 91, 113, 183, 213, 258, 281)
Documented as "Unique identifier of metastore" / "The unique ID of the
metastore." Format is opaque — likely a UUID, but never specified in
the doc.

#### 15.2 `workspaceId` (model.ts:63, 89, 181, 279)
`number` — that's specified by the type, but the doc just says "A
workspace ID." with no range or stability guarantee. Acceptable for a
numeric id; flagged because the format isn't documented in the field.

#### 15.3 `defaultDataAccessConfigId` (model.ts:26, 118, 197, 242)
"Unique identifier of the metastore's (Default) Data Access
Configuration." No format hint (UUID? slug?). See §6.4.

#### 15.4 `storageRootCredentialId` (model.ts:28, 120, 199, 244)
Doc says "UUID of storage credential" — at least the doc says UUID
here, but the field name doesn't carry the type. Counter-example to
§15.1: when the doc *does* specify UUID, the field still doesn't carry
it.

#### 15.5 `createdAt`, `updatedAt` (model.ts:44, 48, 142, 146, 215, 219, 260, 264)
Doc says "epoch milliseconds" but the names lack the `Ms` unit
suffix. Inconsistent across the package.

#### 15.6 `globalMetastoreId` (model.ts:56, 126, 227, 271)
Documented as a composite `cloud:region:metastore_id` string — not a
simple ID. The name promises an ID; the value is a structured
locator. See §6.3.

#### 15.7 `owner`, `createdBy`, `updatedBy` (model.ts:36, 46, 50, 140, 144, 148, 207, 217, 221, 252, 262, 266)
Documented as "username", "Username of metastore creator", etc.
Format (email? user id? group?) is unspecified. The names imply
identity; the doc only narrows to "username".

---

### 16. Type-suffix tautology

#### 16.1 `DeltaSharingScope_Enum` enum with field `deltaSharingScope: DeltaSharingScope_Enum` (model.ts:6, 30, 132, 201, 246)
Field name `deltaSharingScope` is identical to the enum *minus* the
`_Enum` suffix. The `_Enum` suffix exists solely to disambiguate the
enum from the sibling `DeltaSharingScope` interface (§11.1). Were the
sibling renamed, the enum could simply be `DeltaSharingScope` and the
field name would be exactly the enum name (a true tautology). Today,
the workaround is the `_Enum` suffix.

#### 16.2 `MetastoreInfo` exposes `metastoreId` (model.ts:191, 213)
The type's domain is the metastore; the field redundantly carries the
entity name in its identifier. Acceptable convention; flagged for
completeness.

#### 16.3 `MetastoreAssignment` carries `metastoreId` (model.ts:179, 183)
Same pattern as 16.2 — entity name in field.

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

### F. `index.ts` re-exports proto-style names verbatim (lines 5, 7-27)
Every underscore-bearing identifier surfaces in the package's public
API. A consumer of `@databricks/sdk-metastores/v1` sees
`DeltaSharingScope_Enum`, `CreateMetastoreAssignment_Response`,
`DeleteMetastore_Response`, `DeleteMetastoreAssignment_Response`,
`GetMetastoreSummary_Response`, `ListMetastores_Response`, and
`UpdateMetastoreAssignment_Response` as first-class exports.

### G. `index.ts` re-exports both `DeltaSharingScope` and `DeltaSharingScope_Enum` (index.ts:5, 15)
A consumer importing `DeltaSharingScope` gets the sibling export, not
the enum. There is no compile-time or runtime hint that they should
have used the `_Enum`-suffixed export. See §11.1.

### H. `MetastoreAssignment.workspaceId` is `number` while everything else `workspaceId` is also `number` — but the rest of the SDK varies
This package's `workspaceId` is `number`. Some peer packages model
workspace IDs as strings (e.g. when forwarded through URL params).
The type inconsistency is across packages, not within this one;
flagged in passing.

---

## File / line index for fast lookup

| Identifier                                              | Location           | Finding |
| ------------------------------------------------------- | ------------------ | ------- |
| `DeltaSharingScope_Enum`                                | model.ts:6         | 2.1, 4.1, 8.2, 14.1, 16.1 |
| `DeltaSharingScope_Enum.INTERNAL`                       | model.ts:12        | —       |
| `DeltaSharingScope_Enum.INTERNAL_AND_EXTERNAL`          | model.ts:17        | 2.1, 14.1 |
| `CreateMetastore`                                       | model.ts:20        | 11.3, 12.3 |
| `CreateMetastore.name`                                  | model.ts:22        | 10.1, 11.6 |
| `CreateMetastore.storageRoot`                           | model.ts:24        | 6.2     |
| `CreateMetastore.defaultDataAccessConfigId`             | model.ts:26        | 6.4, 15.3 |
| `CreateMetastore.storageRootCredentialId`               | model.ts:28        | 15.4    |
| `CreateMetastore.deltaSharingScope`                     | model.ts:30        | 16.1    |
| `CreateMetastore.owner`                                 | model.ts:36        | 1.5, 15.7 |
| `CreateMetastore.region`                                | model.ts:40        | 1.6, 6.6 |
| `CreateMetastore.metastoreId` (read-only on Create)     | model.ts:42        | 12.3, 15.1, 16.2 |
| `CreateMetastore.createdAt` (read-only on Create)       | model.ts:44        | 12.3, 15.5 |
| `CreateMetastore.createdBy` (read-only on Create)       | model.ts:46        | 12.3, 15.7 |
| `CreateMetastore.updatedAt` (read-only on Create)       | model.ts:48        | 12.3, 15.5 |
| `CreateMetastore.updatedBy` (read-only on Create)       | model.ts:50        | 12.3, 15.7 |
| `CreateMetastore.storageRootCredentialName` (read-only) | model.ts:52        | 12.3    |
| `CreateMetastore.cloud`                                 | model.ts:54        | 1.4, 6.5 |
| `CreateMetastore.globalMetastoreId` (read-only)         | model.ts:56        | 6.3, 12.3, 15.6 |
| `CreateMetastore.externalAccessEnabled`                 | model.ts:58        | 3.1 (doc) |
| `CreateMetastoreAssignment`                             | model.ts:61        | 11.4    |
| `CreateMetastoreAssignment.workspaceId`                 | model.ts:63        | 15.2, H |
| `CreateMetastoreAssignment.metastoreId`                 | model.ts:65        | 15.1    |
| `CreateMetastoreAssignment.defaultCatalogName`          | model.ts:71        | —       |
| `CreateMetastoreAssignment_Response`                    | model.ts:75        | 4.2     |
| `DeleteMetastore`                                       | model.ts:77        | —       |
| `DeleteMetastore.id`                                    | model.ts:79        | 1.1, 5.1, 10.2, 11.5 |
| `DeleteMetastore.force`                                 | model.ts:81        | 1.3     |
| `DeleteMetastore_Response`                              | model.ts:85        | 4.3     |
| `DeleteMetastoreAssignment`                             | model.ts:87        | 11.4    |
| `DeleteMetastoreAssignment.workspaceId`                 | model.ts:89        | 15.2    |
| `DeleteMetastoreAssignment.metastoreId`                 | model.ts:91        | 15.1, D |
| `DeleteMetastoreAssignment_Response`                    | model.ts:95        | 4.4     |
| `DeltaSharingScope`                                     | model.ts:98        | 11.1, G |
| `GetCurrentMetastoreAssignment`                         | model.ts:101       | —       |
| `GetMetastore`                                          | model.ts:103       | —       |
| `GetMetastore.id`                                       | model.ts:105       | 1.1, 5.1, 10.2, 11.5 |
| `GetMetastoreSummary`                                   | model.ts:109       | —       |
| `GetMetastoreSummary_Response`                          | model.ts:112       | 4.5, 6.7, 11.2, 12.4 |
| `ListMetastores`                                        | model.ts:153       | —       |
| `ListMetastores.maxResults`                             | model.ts:163       | —       |
| `ListMetastores.pageToken`                              | model.ts:165       | —       |
| `ListMetastores_Response`                               | model.ts:169       | 4.6     |
| `ListMetastores_Response.metastores`                    | model.ts:171       | 9.1 (positive) |
| `ListMetastores_Response.nextPageToken`                 | model.ts:176       | —       |
| `MetastoreAssignment`                                   | model.ts:179       | 1.2, 8.3, 11.4 |
| `MetastoreAssignment.workspaceId`                       | model.ts:181       | 1.2, 15.2, H |
| `MetastoreAssignment.metastoreId`                       | model.ts:183       | 15.1, 16.3 |
| `MetastoreAssignment.defaultCatalogName`                | model.ts:188       | —       |
| `MetastoreInfo`                                         | model.ts:191       | 6.1, 8.1, 11.3 |
| `MetastoreInfo.metastoreId`                             | model.ts:213       | 15.1, 16.2 |
| `MetastoreInfo.globalMetastoreId`                       | model.ts:227       | 6.3, 15.6 |
| `UpdateMetastore`                                       | model.ts:232       | 11.3, 12.1, 12.3 |
| `UpdateMetastore.id`                                    | model.ts:234       | 1.1, 5.1, 12.1, 12.2 |
| `UpdateMetastore.newName`                               | model.ts:236       | 11.7, 12.1 |
| `UpdateMetastore.name`                                  | model.ts:238       | 11.7, 12.1 |
| `UpdateMetastore.metastoreId`                           | model.ts:258       | 12.1, 12.2 |
| `UpdateMetastoreAssignment`                             | model.ts:277       | 11.4    |
| `UpdateMetastoreAssignment.workspaceId`                 | model.ts:279       | 15.2    |
| `UpdateMetastoreAssignment_Response`                    | model.ts:291       | 4.7     |
| `Client.createMetastore`                                | client.ts:92       | —       |
| `Client.createMetastoreAssignment`                      | client.ts:122      | —       |
| `Client.deleteMetastore`                                | client.ts:151      | C       |
| `Client.deleteMetastoreAssignment`                      | client.ts:182      | B, D    |
| `Client.getCurrentMetastoreAssignment`                  | client.ts:216      | 13.1    |
| `Client.getMetastore`                                   | client.ts:241      | 13.1, C |
| `Client.getMetastoreSummary`                            | client.ts:269      | 6.8, 13.1 |
| `Client.listMetastores`                                 | client.ts:305      | —       |
| `Client.updateMetastore`                                | client.ts:360      | C       |
| `Client.updateMetastoreAssignment`                      | client.ts:390      | B       |
| `${req.id ?? ''}` URL substitution                      | client.ts:155, 245, 364 | C |
| `${req.workspaceId ?? ''}` URL substitution             | client.ts:126, 186, 394 | B |
| `Host is required.` bare Error                          | client.ts:72       | E       |
| `flattenQueryParams` (unused export)                    | utils.ts:123       | A       |
| `index.ts` re-exports underscored names                 | index.ts:5, 9, 12, 14, 17, 19, 21, 26 | F |
| `index.ts` re-exports both `DeltaSharingScope` and `DeltaSharingScope_Enum` | index.ts:5, 15 | G |

---

## Recommended priority order

1. **Disambiguate the four name/id-like fields on `UpdateMetastore`** (`id`, `metastoreId`, `name`, `newName`) — biggest user-facing trap. (§12.1, §11.7, §1.1)
2. **Drop the `_Enum` suffix from `DeltaSharingScope_Enum` and rename the sibling `DeltaSharingScope` export to resolve the naming collision.** (§11.1, §4.1, §16.1, §G)
3. **Drop proto-style `_Response` identifiers** (`CreateMetastoreAssignment_Response`, `DeleteMetastore_Response`, `DeleteMetastoreAssignment_Response`, `GetMetastoreSummary_Response`, `ListMetastores_Response`, `UpdateMetastoreAssignment_Response`). (§4.2-4.7)
4. **Strip read-only fields from `CreateMetastore` / `UpdateMetastore`.** (§12.3, §11.3)
5. **Decide whether `GetMetastoreSummary_Response` should alias `MetastoreInfo` or expose a genuine subset.** (§6.7, §11.2)
6. **Rename `getMetastoreSummary` to `getCurrentMetastore`** to match `getCurrentMetastoreAssignment` and accurately describe the call. (§6.8, §13.1)
7. **Unify naming around `id` vs `metastoreId`** — pick one for the path parameter; converge body fields on the other. (§1.1, §11.5)
8. **Tighten optional-typing on URL-bound parameters** (`id`, `workspaceId`) so undefined values are caught at compile time, not by malformed URLs. (Cross-cutting B, C)
9. **Add unit suffixes to `createdAt` / `updatedAt`** (`createdAtMs` etc.) to match common conventions. (§15.5)
10. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
