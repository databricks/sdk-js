# Naming Audit: `volumes` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/volumes/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

Notation: file paths are absolute. Findings reference `file:line`.

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 2     |
| Medium      | 7     |
| Low         | 6     |
| Observation | 7     |
| **Total**   | **22** |

Headline themes:

1. **`fullNameArg` is a cryptic, Go/proto-generator-driven name** that leaks
   internal path-parameter terminology into the public TypeScript API. The
   `Arg` suffix is meaningless to TS users and inconsistent with the
   `fullName` field on the response/info shapes. Appears on `GetVolume`,
   `DeleteVolume`, and `UpdateVolume` (model.ts:56, 75, 126).
2. **Operation request types are bare verb-phrases** (`CreateVolume`,
   `DeleteVolume`, `GetVolume`, `ListVolumes`, `UpdateVolume`) that collide
   semantically with the client methods of the same camel-case names. This
   is a repo-wide pattern but worth flagging here for documentation.
3. **`Create*` / `Update*` request types include read-only output fields**
   (`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
   `volumeId`, `fullName`, `browseOnly`). These belong only on
   `VolumeInfo`. They appear on the request shapes because the upstream
   proto reuses the same message — but on the TypeScript surface they
   misleadingly invite users to "set" server-managed values.
4. **`SseEncryptionAlgorithm` repeats `SSE_ENCRYPTION_ALGORITHM_` in its
   single zero-valued member** and shouts `AWS_SSE_S3` / `AWS_SSE_KMS` in
   SCREAMING_SNAKE on the two real values — the SDK-wide proto-mirror
   convention but jarring for TS readers.

---

## High Severity

### H1. `fullNameArg` — cryptic `Arg` suffix on path-parameter fields

- **File / line:** `src/v1/model.ts:56` (`DeleteVolume.fullNameArg`),
  `src/v1/model.ts:75` (`GetVolume.fullNameArg`),
  `src/v1/model.ts:126` (`UpdateVolume.fullNameArg`); cross-ref
  `src/v1/client.ts:125, 154, 268`.
- **Category:** #5 cryptic abbreviation; #6 misleading name; #20 type-
  suffix tautology (inverse — `Arg` is a non-domain suffix).
- **Current:** `fullNameArg?: string`.
- **Suggestion:** `fullName: string` (drop both the `Arg` suffix and the
  unnecessary `?:` — this is a required path parameter).
- **Rationale:** `Arg` is a proto/grpc-generator artifact that signals "this
  field maps to a URL path argument." TypeScript callers have no concept
  of "Arg" — they just see two fields named `fullNameArg` and (on the
  related `VolumeInfo` / `UpdateVolume` payload) `fullName`, with no way
  to know they refer to the same volume identifier. The URL templating in
  `client.ts:125, 154, 268` interpolates it into the path directly. The
  `?: | undefined` is also a semantic lie — without this value the path
  becomes `/api/2.1/unity-catalog/volumes/` and the call cannot succeed.

### H2. `Create*` / `Update*` request types include server-only fields

- **File / line:** `src/v1/model.ts:16–52` (`CreateVolume`),
  `src/v1/model.ts:124–164` (`UpdateVolume`).
- **Category:** #6 misleading name; #16 field contradicting type domain;
  #12 duplicate concepts.
- **Current:** `CreateVolume` and `UpdateVolume` both carry every field on
  `VolumeInfo`: `volumeId`, `metastoreId`, `createdAt`, `createdBy`,
  `updatedAt`, `updatedBy`, `fullName`, `browseOnly`.
- **Suggestion:** Trim the request shapes to the fields the server
  actually accepts (per the Go SDK / OpenAPI). For `CreateVolume`:
  `name`, `catalogName`, `schemaName`, `volumeType`, `storageLocation`,
  `comment`. For `UpdateVolume`: `fullNameArg` (the path identifier),
  `newName`, `owner`, `comment` (per the method docstring at
  `client.ts:262`).
- **Rationale:** A request type named `CreateVolume` whose fields include
  `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, and `volumeId`
  invites users to populate them — but the server ignores or rejects
  them. The `client.ts:262` doc itself says "Currently only the name, the
  owner or the comment of the volume could be updated." Compare with the
  Go SDK `databricks/sdk-go/databricks/api/volumes/v1/` to confirm the
  upstream split. (Caveat: if the upstream proto truly reuses the same
  message for request + response, the audit recommends a TS-specific
  request type — name suggestions: `CreateVolumeRequest`,
  `UpdateVolumeRequest`.)

---

## Medium Severity

### M1. Bare verb-phrase request type names collide with client methods

- **File / line:** `src/v1/model.ts:16` (`CreateVolume`), `54`
  (`DeleteVolume`), `73` (`GetVolume`), `80` (`ListVolumes`), `124`
  (`UpdateVolume`); cross-ref `src/v1/client.ts:89, 121, 153, 196, 264`.
- **Category:** #6 misleading name; #14 Go/Java-style name.
- **Current:** Types named `CreateVolume`, `DeleteVolume`, etc., consumed
  as `client.createVolume(req: CreateVolume)`.
- **Suggestion:** `CreateVolumeRequest`, `DeleteVolumeRequest`,
  `GetVolumeRequest`, `ListVolumesRequest`, `UpdateVolumeRequest`.
- **Rationale:** The verb-phrase form reads like a function name. A
  reader sees `function createVolume(req: CreateVolume): Promise<…>` and
  must distinguish the verb-method from the verb-type. Sibling
  packages `accountsettings`, `budgetpolicy`, `bundle` use the `Request`
  suffix. `volumes` (and many sibling UC packages) omit it. Audit
  observation, not a local defect — recorded as Medium because the
  collision is most acute in `volumes` where every operation has a
  matching type.

### M2. `VolumeInfo` — redundant `Info` suffix

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

### M3. `SseEncryptionDetails` and `SseEncryptionAlgorithm` — uppercase
"Sse" acronym casing inconsistent across the type system

- **File / line:** `src/v1/model.ts:5` (enum), `113` (interface),
  `model.ts:68, 218, 219, 236, 332, 335` (field/usage).
- **Category:** #3 acronym casing inconsistencies; #14 Go/Java-style name.
- **Current:** `Sse` is rendered as a three-letter title-case acronym
  (`Sse`, `sseEncryptionDetails`), but the enum member values use
  SCREAMING_SNAKE (`AWS_SSE_S3`, `AWS_SSE_KMS`,
  `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`).
- **Suggestion:** Per the Google TypeScript Style Guide §5.3.5 (acronyms
  are treated as words: PascalCase or camelCase, not all-caps in identifiers),
  `Sse` is the correct rendering for types and fields. The enum values
  are correct as-is (the proto convention is SCREAMING_SNAKE_CASE for
  values). Flagged here because some sibling packages in the codebase
  use `SSE` or `SSEEncryption` — verify consistency. Today this package
  is internally consistent (good).
- **Rationale:** Acronym casing is the single most common naming
  inconsistency in TS codebases. `Sse` is the right choice; record this
  as an observation in case a future audit flips it.

### M4. `SseEncryptionDetails.algorithm` — generic field name on a
single-purpose type

- **File / line:** `src/v1/model.ts:116`; cross-ref `model.ts:239, 243,
  348, 351`.
- **Category:** #1 vague/generic; #15 generic field name losing meaning.
- **Current:** `algorithm?: SseEncryptionAlgorithm`.
- **Suggestion:** `encryptionAlgorithm` — though, in context, the parent
  type already says "SseEncryption", so `algorithm` is acceptable. This
  is a borderline call.
- **Rationale:** Inside `SseEncryptionDetails`, `algorithm` is fine. The
  flag stands only if the field is ever exposed in flatter scopes (it
  isn't, locally). Listed for completeness; lower priority than M3.

### M5. `awsKmsKeyArn` vs. `accessPoint` — inconsistent AWS-specific
field-naming style

- **File / line:** `src/v1/model.ts:121` (`awsKmsKeyArn`); cross-ref
  `model.ts:48, 159, 198` (`accessPoint`).
- **Category:** #1 vague/generic; #3 acronym casing inconsistencies; #6
  misleading name.
- **Current:** `awsKmsKeyArn?: string` lives on `SseEncryptionDetails`
  (AWS-specific). `accessPoint?: string` lives on `CreateVolume` /
  `UpdateVolume` / `VolumeInfo` but is also AWS-specific (the doc
  comment at `model.ts:47, 159, 197` reads "The AWS access point to use
  when accesing s3 for this external location.").
- **Suggestion:** Either prefix the latter as `awsAccessPoint` (matching
  `awsKmsKeyArn`) or drop the prefix from both (`kmsKeyArn` and
  `accessPoint`). Inconsistency is the issue.
- **Rationale:** Two AWS-only fields side-by-side, one prefixed, one not.
  The doc comment also has a typo ("accesing" → "accessing").

### M6. `browseOnly` is a server-derived flag on request types

- **File / line:** `src/v1/model.ts:51` (`CreateVolume.browseOnly`),
  `163` (`UpdateVolume.browseOnly`), `201` (`VolumeInfo.browseOnly`).
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

### M7. `req` parameter name on all client methods

- **File / line:** `src/v1/client.ts:90, 122, 153, 197, 239, 265`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: CreateVolume`, `req: DeleteVolume`, etc.
- **Suggestion:** `request` (matches Go-port readability without
  abbreviation).
- **Rationale:** Throughout the JS/TS ecosystem, function parameters are
  spelled out (`request`, `response`) rather than abbreviated. The Go
  `req`/`resp` idiom is fine in Go where short identifiers are
  encouraged; in TS this reads as Go-translated code. Pervasive in this
  package (every method uses `req`) and across the repo.

---

## Low Severity

### L1. `executeCall` vs. `executeHttpCall` — overlapping verbs

- **File / line:** `src/v1/utils.ts:26, 65`.
- **Category:** #6 misleading name; #12 duplicate concepts.
- **Current:** Two functions in the same file with very similar names.
  `executeCall` is the public-options translator delegating to `execute`
  from `@databricks/sdk-core/api`. `executeHttpCall` is the low-level
  HTTP send + parse helper.
- **Suggestion:** Rename `executeCall` to `runCallWithOptions` /
  `dispatchCall` (or to match the JSDoc, `translateAndExecute`). The
  JSDoc on line 22 already calls this a *translator* — the name should
  match.
- **Rationale:** Two functions named `execute*Call` in 100 lines of
  code, with different return shapes (`Promise<void>` vs.
  `Promise<Uint8Array>`), is a readability hazard.

### L2. `Call` (imported, not local) and `call` local variable share names

- **File / line:** `src/v1/client.ts:96, 127, 162, 220, 271`.
- **Category:** #1 vague/generic.
- **Current:** `const call: Call = async (callSignal?: AbortSignal) => …`.
- **Suggestion:** `httpCall` or `doRequest`.
- **Rationale:** `call` is a built-in word in JS (`.call()` on
  functions), so a variable named `call` inside a method that is itself
  a call is ambiguous. Caveat: this is a 1:1 port of Go SDK convention.

### L3. `body` shadowed across `executeHttpCall` / `buildHttpRequest` /
`parseResponse`

- **File / line:** `src/v1/utils.ts:81` (`body`, response bytes), `101`
  (`body`, request body parameter), `113` (`body`, response bytes
  again).
- **Category:** #1 vague generic name.
- **Current:** Single name `body` used for both request body and
  response body, with different types
  (`Uint8Array`, `string | ReadableStream<Uint8Array>`).
- **Suggestion:** `responseBody` / `requestBody`.
- **Rationale:** The same identifier `body` flows through helpers as a
  request payload in one place and a response payload in another.
  Differentiating helps readers track direction.

### L4. `flattenQueryParams` is dead code in this package

- **File / line:** `src/v1/utils.ts:123`.
- **Category:** dead code.
- **Current:** Exported but not used by `client.ts` (the list / get
  methods build params inline via `URLSearchParams.append` calls at
  `client.ts:156–215`).
- **Suggestion:** Drop the export or move to a shared util package.
- **Rationale:** Unused exports become accidental public API. Out of
  scope for pure naming but flagged because the name promises a feature
  that no method exercises.

### L5. `fullName` (on `VolumeInfo`) vs. `fullNameArg` (on path-param
requests)

- **File / line:** `model.ts:36, 75, 126, 148, 186` (`fullName` on
  `CreateVolume`, `UpdateVolume.fullName` in payload, `VolumeInfo.fullName`),
  `model.ts:56, 75, 126` (`fullNameArg` as path param).
- **Category:** #6 misleading name; #19 underspecified IDs.
- **Current:** Two different fields naming the same logical concept
  (the three-level volume identifier) differently depending on
  request/response position.
- **Suggestion:** Resolve in concert with H1 — use `fullName` everywhere.
  If proto generation requires the `_Arg` discriminator, then bury it
  internally and surface only `fullName` to callers.
- **Rationale:** A user reading the API sees `fullName` on
  `VolumeInfo` and `fullNameArg` on `DeleteVolume` and has to ask: why
  are they different? The answer ("one is a request path parameter")
  is generator-internal and should not bleed onto the public surface.

### L6. `pageReq` and `pageReq.pageToken` mutation in `listVolumesIter`

- **File / line:** `src/v1/client.ts:242–252`.
- **Category:** #1 vague/generic.
- **Current:** `const pageReq: ListVolumes = {...req};` then mutates
  `pageReq.pageToken = resp.nextPageToken;` on each loop iteration.
- **Suggestion:** `currentPageRequest` or `nextPageRequest`.
- **Rationale:** `pageReq` is fine as a Go-ism, but the variable is
  reassigned across iterations — `pageRequest` makes the mutation site
  more legible. Minor.

---

## Observations (repo-wide conventions, not local defects)

### O1. Bare `Get*` / `Create*` / `Update*` / `Delete*` / `List*` request
shapes are a repo-wide pattern

Sibling packages `catalogs`, `connections`, `clusters`, `externallocations`,
`clusterpolicies`, and most UC packages use bare verb-phrases for request
types. Changing this package alone would create asymmetry. See
`grep -rE "^export interface (Get|Set|Create|Update|Delete|List)" packages/`
for the workspace inventory. (M1 above flags it locally.)

### O2. `*_UNSPECIFIED` zero values repeated across enums

`SseEncryptionAlgorithm.SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`
(`model.ts:6`) repeats the enum domain (`SSE_ENCRYPTION_ALGORITHM_`) in
the member name. This is a proto-buf default and is consistent with
sibling packages. The duplication makes `SseEncryptionAlgorithm.SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`
60 characters long for what should read as `UNSPECIFIED`. Not a local
defect; would need a workspace-wide convention change.

### O3. `…Info` suffix repeated across UC types

`VolumeInfo` follows the `CatalogInfo`, `ConnectionInfo`,
`FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo` pattern. If the
codebase decides to drop the `Info` suffix, this is one of many to fix
(M2 above flags it locally).

### O4. `_Arg` suffix on path parameter fields is a generator-wide artifact

`fullNameArg` (H1) is not unique to volumes — the workspace contains
fields like `nameArg`, `idArg`, `fullNameArg` across packages that take a
URL path parameter. Search:
`grep -rE "fullNameArg|nameArg|idArg" packages/*/src/`. Documented here
because the fix has cross-package implications.

### O5. `VolumeType` enum members are clean

`VolumeType.MANAGED` and `VolumeType.EXTERNAL` (`model.ts:11–14`) avoid
the SCREAMING_SNAKE_CASE long-form variant (no `VOLUME_TYPE_*` prefix).
This enum is the cleanest in the file and shows that the proto-mirror
pattern is not mandatory — `SseEncryptionAlgorithm` could have been
written this way too.

### O6. URL path string repeated across methods without a named constant

The base path `/api/2.1/unity-catalog/volumes` (and the suffixed
variant with `${req.fullNameArg ?? ''}`) appears five times in
`client.ts:93, 125, 154, 200, 268`. Not a naming defect, but typical
naming-audit findings include "unnamed magic strings." Worth a note.

### O7. `PACKAGE_SEGMENT.key` / `.value` carry no descriptive name

`client.ts:39–42`: `{key: pkgJson.name.replace(/^@[^/]+\//, ''), value:
pkgJson.version}`. The variable name `PACKAGE_SEGMENT` reads fine but
the `key`/`value` shape is generic — readers may not know `key` is
"package name" and `value` is "package version" without inspecting
`createDefault().with(...)`. No action required; cosmetic. Pattern is
identical across every generated client in the workspace.

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
| `src/v1/client.ts` | 289 | Class, constructor, 5 public methods + 1 iterator, all locals. |
| `src/v1/utils.ts`  | 151 | All exported / private functions and types.    |
| `src/v1/index.ts`  | 19  | All re-exports.                                  |

Type & symbol checklist:

- [x] `SseEncryptionAlgorithm` enum (3 members) → O2.
- [x] `VolumeType` enum (2 members) → O5 (clean).
- [x] `CreateVolume` interface (17 fields) → H2, M1, M5, M6.
- [x] `DeleteVolume` interface (1 field) → H1, M1, L5.
- [x] `EncryptionDetails` interface → no additional defect.
- [x] `GetVolume` interface (2 fields) → H1, M1, L5.
- [x] `ListVolumes` interface (5 fields) → M1.
- [x] `SseEncryptionDetails` interface (2 fields) → M3, M4, M5.
- [x] `UpdateVolume` interface (18 fields) → H1, H2, M1, M5, M6, L5.
- [x] `VolumeInfo` interface (16 fields) → M2, M5, M6, L5, O3.
- [x] `Client` class + `host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `PACKAGE_SEGMENT` constant → O7.
- [x] `createVolume(req, options)` method → H2, M1, M7, L2.
- [x] `deleteVolume(req, options)` method → H1, M1, M7, L2.
- [x] `getVolume(req, options)` method → H1, M1, M7, L2.
- [x] `listVolumes(req, options)` method → M1, M7, L2.
- [x] `listVolumesIter(req, options)` async generator → M1, M7, L6.
- [x] `updateVolume(req, options)` method → H1, H2, M1, M7, L2.
- [x] `HttpCallOptions` interface → no defect.
- [x] `executeCall` function → L1.
- [x] `readAll` private function → no defect (name fits idiom).
- [x] `executeHttpCall` function → L1, L3.
- [x] `buildHttpRequest` function → L3.
- [x] `flattenQueryParams` function → L4 (unused).
- [x] `index.ts` re-exports → no defect (mirrors model exports faithfully).
