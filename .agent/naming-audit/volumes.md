# Naming Audit: `volumes` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/uc/volumes/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 1     |
| Medium      | 3     |
| Observation | 1     |
| **Total**   | **5** |

---

## High Severity

### H1. `Create*` / `Update*` request types include server-only fields

- **File / line:** `src/v1/model.ts:16–52` (`CreateVolumeRequest`),
  `src/v1/model.ts:123–163` (`UpdateVolumeRequest`).
- **Category:** #6 misleading name; #16 field contradicting type domain;
  #12 duplicate concepts.
- **Current:** `CreateVolumeRequest` and `UpdateVolumeRequest` both carry
  every field on `VolumeInfo`: `volumeId`, `metastoreId`, `createdAt`,
  `createdBy`, `updatedAt`, `updatedBy`, `fullName`, `browseOnly`.
- **Suggestion:** Trim the request shapes to the fields the server
  actually accepts (per the Go SDK / OpenAPI). For `CreateVolumeRequest`:
  `name`, `catalogName`, `schemaName`, `volumeType`, `storageLocation`,
  `comment`. For `UpdateVolumeRequest`: `fullNameArg` (the path
  identifier), `newName`, `owner`, `comment` (per the method docstring at
  `client.ts:279`).
- **Rationale:** A request type named `CreateVolumeRequest` whose fields
  include `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, and
  `volumeId` invites users to populate them — but the server ignores or
  rejects them. The `client.ts:279` doc itself says "Currently only the
  name, the owner or the comment of the volume could be updated." Compare
  with the Go SDK `databricks/sdk-go/databricks/api/volumes/v1/` to
  confirm the upstream split.

---

## Medium Severity

### M1. `VolumeInfo` — redundant `Info` suffix

- **File / line:** `src/v1/model.ts:165`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `VolumeInfo`.
- **Suggestion:** `Volume`.
- **Rationale:** `Info` adds no semantic content; the type *is* the
  volume record. The `Info` suffix is a Go/proto idiom (cf. `CatalogInfo`,
  `SchemaInfo`, `FunctionInfo`, `ConnectionInfo`) and is uniformly
  applied across UC types. Renaming to `Volume` also frees the natural
  domain noun — note that `volumes` has no type with the bare name
  `Volume`, even though it is literally the "volumes" package.

### M2. `browseOnly` is a server-derived flag on request types

- **File / line:** `src/v1/model.ts:51` (`CreateVolumeRequest.browseOnly`),
  `162` (`UpdateVolumeRequest.browseOnly`), `200`
  (`VolumeInfo.browseOnly`).
- **Category:** #6 misleading name; #16 field contradicting type domain.
- **Current:** `browseOnly?: boolean | undefined` — present on the
  request types but described in the doc as "Indicates whether the
  principal is limited to retrieving metadata for the associated object
  through the BROWSE privilege when include_browse is enabled in the
  request."
- **Suggestion:** Remove from request types (see H1). On the response
  type, the name itself is fine but the JSDoc should say "Read-only.
  Set by the server when include_browse is true."
- **Rationale:** Sub-issue of H1; called out separately because the name
  also reads ambiguously — `browseOnly: true` could be misread as "I
  want browse-only access" rather than "the server has limited me to
  browse-only."

### M3. `req` parameter name on all client methods

- **File / line:** `src/v1/client.ts:92, 127, 162, 211, 256, 282`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: CreateVolumeRequest`, `req: DeleteVolumeRequest`, etc.
- **Suggestion:** `request` (matches Go-port readability without
  abbreviation).
- **Rationale:** Throughout the JS/TS ecosystem, function parameters are
  spelled out (`request`, `response`) rather than abbreviated. The Go
  `req`/`resp` idiom is fine in Go where short identifiers are
  encouraged; in TS this reads as Go-translated code. Pervasive in this
  package (every method uses `req`) and across the repo.

---

## Observations (repo-wide conventions, not local defects)

### O1. `…Info` suffix repeated across UC types

`VolumeInfo` follows the `CatalogInfo`, `ConnectionInfo`,
`FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo` pattern. If the
codebase decides to drop the `Info` suffix, this is one of many to fix
(M1 above flags it locally).
