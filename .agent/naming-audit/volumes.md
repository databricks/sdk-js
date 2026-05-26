# Naming Audit: `volumes` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/volumes/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

Notation: file paths are absolute. Findings reference `file:line`.

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 2     |
| Medium      | 4     |
| Low         | 0     |
| Observation | 2     |
| **Total**   | **8** |

Headline themes:

1. **`fullNameArg` is a cryptic, Go/proto-generator-driven name** that leaks
   internal path-parameter terminology into the public TypeScript API. The
   `Arg` suffix is meaningless to TS users and inconsistent with the
   `fullName` field on the response/info shapes. Appears on
   `GetVolumeRequest`, `DeleteVolumeRequest`, and `UpdateVolumeRequest`
   (model.ts:56, 75, 126).
2. **`Create*` / `Update*` request types include read-only output fields**
   (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
   `volumeId`, `fullName`, `browseOnly`). These belong only on
   `VolumeInfo`. They appear on the request shapes because the upstream
   proto reuses the same message — but on the TypeScript surface they
   misleadingly invite users to "set" server-managed values.

---

## High Severity

### H1. `fullNameArg` — cryptic `Arg` suffix on path-parameter fields

- **File / line:** `src/v1/model.ts:56` (`DeleteVolumeRequest.fullNameArg`),
  `src/v1/model.ts:75` (`GetVolumeRequest.fullNameArg`),
  `src/v1/model.ts:126` (`UpdateVolumeRequest.fullNameArg`); cross-ref
  `src/v1/client.ts:125, 160, 277`.
- **Category:** #5 cryptic abbreviation; #6 misleading name; #20 type-
  suffix tautology (inverse — `Arg` is a non-domain suffix).
- **Current:** `fullNameArg?: string`.
- **Suggestion:** `fullName: string` (drop both the `Arg` suffix and the
  unnecessary `?:` — this is a required path parameter).
- **Rationale:** `Arg` is a proto/grpc-generator artifact that signals "this
  field maps to a URL path argument." TypeScript callers have no concept
  of "Arg" — they just see two fields named `fullNameArg` and (on the
  related `VolumeInfo` / `UpdateVolumeRequest` payload) `fullName`, with no
  way to know they refer to the same volume identifier. The URL templating
  in `client.ts:125, 160, 277` interpolates it into the path directly. The
  `?: | undefined` is also a semantic lie — without this value the path
  becomes `/api/2.1/unity-catalog/volumes/` and the call cannot succeed.

### H2. `Create*` / `Update*` request types include server-only fields

- **File / line:** `src/v1/model.ts:16–52` (`CreateVolumeRequest`),
  `src/v1/model.ts:124–164` (`UpdateVolumeRequest`).
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
  `client.ts:271`).
- **Rationale:** A request type named `CreateVolumeRequest` whose fields
  include `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, and
  `volumeId` invites users to populate them — but the server ignores or
  rejects them. The `client.ts:271` doc itself says "Currently only the
  name, the owner or the comment of the volume could be updated." Compare
  with the Go SDK `databricks/sdk-go/databricks/api/volumes/v1/` to
  confirm the upstream split.

---

## Medium Severity

### M1. `VolumeInfo` — redundant `Info` suffix

- **File / line:** `src/v1/model.ts:166`.
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
  `163` (`UpdateVolumeRequest.browseOnly`), `201`
  (`VolumeInfo.browseOnly`).
- **Category:** #6 misleading name; #16 field contradicting type domain.
- **Current:** `browseOnly?: boolean | undefined` — present on the
  request types but described in the doc as "Indicates whether the
  principal is limited to retrieving metadata for the associated object
  through the BROWSE privilege when include_browse is enabled in the
  request."
- **Suggestion:** Remove from request types (see H2). On the response
  type, the name itself is fine but the JSDoc should say "Read-only.
  Set by the server when include_browse is true."
- **Rationale:** Sub-issue of H2; called out separately because the name
  also reads ambiguously — `browseOnly: true` could be misread as "I
  want browse-only access" rather than "the server has limited me to
  browse-only."

### M3. `req` parameter name on all client methods

- **File / line:** `src/v1/client.ts:90, 122, 157, 203, 248, 274`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: CreateVolumeRequest`, `req: DeleteVolumeRequest`, etc.
- **Suggestion:** `request` (matches Go-port readability without
  abbreviation).
- **Rationale:** Throughout the JS/TS ecosystem, function parameters are
  spelled out (`request`, `response`) rather than abbreviated. The Go
  `req`/`resp` idiom is fine in Go where short identifiers are
  encouraged; in TS this reads as Go-translated code. Pervasive in this
  package (every method uses `req`) and across the repo.

### M4. Repeated `Details` suffix — `EncryptionDetails` wraps
`SseEncryptionDetails`

- **File / line:** `src/v1/model.ts:63` (`EncryptionDetails`),
  `src/v1/model.ts:114` (`SseEncryptionDetails`); cross-ref
  `model.ts:49, 161, 199` (field `encryptionDetails`).
- **Category:** proto-architectural-leak — repeated `Details` suffix
  across a parent/child pair carrying the same wrapper word.
- **Current:** `EncryptionDetails` is a one-field discriminated-union
  wrapper whose only payload variant is `SseEncryptionDetails`. Both
  types end in `Details`, and the field on the request/info types is
  `encryptionDetails` (which itself only contains
  `sseEncryptionDetails`).
- **Suggestion:** Either drop the outer wrapper entirely (inline the
  union on `VolumeInfo`) or rename the inner type so `Details` is not
  doubled — e.g. `EncryptionConfig` / `SseEncryption`.
- **Rationale:** The doubled `Details` is a proto-message-shape leak:
  proto requires a wrapper message for each `oneof`, so the generator
  emits `EncryptionDetails` purely to carry one `sse_encryption_details`
  field. In TypeScript a discriminated union does not need that wrapper,
  and the repeated `Details` reads as the generator name-pattern, not
  domain vocabulary.

---

## Low Severity

_None._

---

## Observations (repo-wide conventions, not local defects)

### O1. `…Info` suffix repeated across UC types

`VolumeInfo` follows the `CatalogInfo`, `ConnectionInfo`,
`FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo` pattern. If the
codebase decides to drop the `Info` suffix, this is one of many to fix
(M1 above flags it locally).

### O2. `_Arg` suffix on path parameter fields is a generator-wide artifact

`fullNameArg` (H1) is not unique to volumes — the workspace contains
fields like `nameArg`, `idArg`, `fullNameArg` across packages that take a
URL path parameter. Search:
`grep -rE "fullNameArg|nameArg|idArg" packages/*/src/`. Documented here
because the fix has cross-package implications.

---

## Domain glossary

| Term                       | Meaning in this package                                    |
| -------------------------- | ---------------------------------------------------------- |
| Volume                     | A Unity Catalog securable representing a directory of files in cloud object storage. |
| Managed volume             | Volume located in the default storage location specified by the parent schema, catalog, or metastore. |
| External volume            | Volume located in a user-specified external location (S3 / ADLS / GCS path). |
| Catalog / Schema           | Two outer levels of the UC three-level namespace; a volume's full name is `catalog.schema.volume`. |
| Full name (`fullName`)     | The three-level (fully qualified) identifier `catalog.schema.volume`. |
| `fullNameArg`              | Generator-internal name for the same three-level identifier when bound as a URL path parameter. |
| SSE                        | Server-Side Encryption (AWS S3). One of `AWS_SSE_S3` or `AWS_SSE_KMS`. |
| KMS ARN                    | AWS KMS Key ARN used by `AWS_SSE_KMS`. Sent via the `x-amz-server-side-encryption-aws-kms-key-id` S3 header. |
| Access point               | AWS S3 access point used when accessing S3 for an external volume location. |
| Browse-only                | A retrieval mode where the caller has only the `BROWSE` privilege on the volume and sees only metadata. |
| Metastore                  | Unity Catalog top-level container that owns the volume's catalog and schema. |
| Page token                 | Opaque pagination cursor. `nextPageToken` is server-emitted; absence signals end of results. |

---

## File coverage

| File           | Lines | Audited                                          |
| -------------- | ----- | ------------------------------------------------ |
| `src/v1/model.ts`  | 399 | All 2 enums + 9 interfaces + 9 schemas + every field. |
| `src/v1/client.ts` | 298 | Class, constructor, 5 public methods + 1 iterator, all locals. |
| `src/v1/utils.ts`  | 151 | All exported / private functions and types.    |
| `src/v1/index.ts`  | 19  | All re-exports.                                  |

Type & symbol checklist:

- [x] `SseEncryptionAlgorithm` enum (3 members) → no defect.
- [x] `VolumeType` enum (2 members) → no defect.
- [x] `CreateVolumeRequest` interface (17 fields) → H2, M2.
- [x] `DeleteVolumeRequest` interface (1 field) → H1.
- [x] `EncryptionDetails` interface → M4.
- [x] `GetVolumeRequest` interface (2 fields) → H1.
- [x] `ListVolumesRequest` interface (5 fields) → no additional defect.
- [x] `SseEncryptionDetails` interface (2 fields) → M4.
- [x] `UpdateVolumeRequest` interface (18 fields) → H1, H2, M2.
- [x] `VolumeInfo` interface (16 fields) → M1, M2, O1.
- [x] `Client` class + `host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `createVolume(req, options)` method → H2, M3.
- [x] `deleteVolume(req, options)` method → H1, M3.
- [x] `getVolume(req, options)` method → H1, M3.
- [x] `listVolumes(req, options)` method → M3.
- [x] `listVolumesIter(req, options)` async generator → M3.
- [x] `updateVolume(req, options)` method → H1, H2, M3.
- [x] `index.ts` re-exports → no defect (mirrors model exports faithfully).

---
