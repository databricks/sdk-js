# Naming Audit: workspaceobjects

**Path:** `packages/workspaceobjects/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace filesystem-style operations on
notebooks, folders, and files — import, export, delete, list, get-status,
and mkdirs against absolute paths under `/Workspace`. Wire prefix:
`/api/2.0/workspace/`.
**Total weird names flagged:** 23

## Scope note: `workspaceobjects` vs sibling packages

The Databricks SDK ships several packages whose names begin with "workspace".
This audit covers the filesystem-objects package, `workspaceobjects`; the
others differ in scope:

| Package | Domain | Wire prefix |
|---------|--------|-------------|
| `workspaceobjects` (this audit) | Workspace filesystem (notebooks/folders/files) | `/api/2.0/workspace/` |
| `workspaceassignment` | Account-level principal-to-workspace permission assignments | account API |
| `workspacebindings` | Securable-to-workspace bindings (catalog/credential/location) | Unity Catalog API |
| `workspaceconf` | Untyped key/value workspace configuration | `/api/2.0/workspace-conf` |
| `workspacesettings` | Strongly-typed workspace settings (compliance security profile, automatic cluster update, etc.) | various `/api/2.0/settings/*` |
| `workspaces` | Account-level workspace lifecycle (create/list/delete workspaces) | accounts API |

## Summary

| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 12 |
| Low | 6 |
| Observation | 6 |

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts:6` enum | `ExportFormat` used as `format` field of `ImportRequest` | Misleading name (an "ExportFormat" governs imports too) |
| 2 | High | `model.ts:18` enum value | `ExportFormat.AUTO` | Ambiguous enum value (different behaviour for import vs. export) |
| 3 | High | `model.ts:24` enum value | `ExportFormat.RAW` | Vague enum value (no documented format, only a use-case story) |
| 4 | High | `model.ts:195,199` field | `ObjectInfo.objectId` and `ObjectInfo.resourceId` | Duplicate concept (two IDs for the same object, undifferentiated names) |
| 5 | High | `model.ts:28` enum | `Language` | Vague/generic, no domain prefix |
| 6 | Medium | `model.ts:48` enum value | `ObjectType.LIBRARY` | Misleading (workspace libraries are an obsolete concept) |
| 7 | Medium | `model.ts:153` field | `ListRequest.notebooksModifiedAfter` | Field contradicts type domain (list returns all object types, filter only on notebooks) |
| 8 | Medium | `model.ts:92` field | `ExportRequest.directDownload` | Verb-as-noun boolean (toggles response content-type entirely) |
| 9 | Medium | `model.ts:104` field | `ExportRequest_Response.fileType` | Underspecified (extension? MIME? format enum?) |
| 10 | Medium | `model.ts:102` field | `ExportRequest_Response.content` typed `Uint8Array` | Type contradicts JSDoc ("base64-encoded content") |
| 11 | Medium | `model.ts:138` field | `ImportRequest.content` typed `Uint8Array` | Same type/JSDoc mismatch as 10 in reverse direction |
| 12 | Medium | `model.ts:191,193` fields | `ObjectInfo.createdAt` and `ObjectInfo.modifiedAt` | Unit ambiguity (epoch millis as `number`), "only applicable to files" |
| 13 | Medium | `model.ts:197` field | `ObjectInfo.size` | Underspecified — no unit in the name (bytes per JSDoc) |
| 14 | Medium | `model.ts:167` field | `MkdirsRequest.path` | Singular/plural mismatch — type plural, field singular |
| 15 | Medium | `model.ts:162` type | `MkdirsRequest` | Unix-ism (`mkdir -p`); sibling `files` package uses `createDirectory` |
| 16 | Medium | `client.ts:157` method | `getStatus` | Vague verb; returns full `ObjectInfo` metadata (a `stat`, not a status) |
| 17 | Medium | `model.ts:66` field | `DeleteRequest.recursive` | Unix flag (`rm -r`); no domain reading |
| 18 | Low | `model.ts:16` enum value | `ExportFormat.R_MARKDOWN` | Shape mismatch — single underscored value among single-token values |
| 19 | Low | `model.ts:14` enum value | `ExportFormat.DBC` | Cryptic product-specific abbreviation (Databricks archive) |
| 20 | Low | `model.ts:174` interface | `ObjectInfo` | `Info` suffix carries no information; central entity is just an "Object" |
| 21 | Low | `model.ts:159` field | `ListRequest_Response.objects` | Generic field name (`objects`) for `ObjectInfo[]` |
| 22 | Low | `client.ts:266` method | `mkdirs` | Lower-case Unix contraction next to other `verbNoun` methods (`getStatus`, `import`, `export`) |
| 23 | Low | `model.ts:17-23` JSDoc | "We will inspect…" / "This is introduced to unblock a DR use case" | First-person and ticket-driven prose in public JSDoc |

## High severity

### 1. `ExportFormat` reused for `ImportRequest.format` — misleading enum
- **Location:** `model.ts:6` (declaration); used as `ImportRequest.format` at `model.ts:129` and `ExportRequest.format` at `model.ts:87`.
- **Category:** Misleading name — the enum name encodes a single direction
  (export) but the type is used both ways.
- **Suggested name:** `WorkspaceObjectFormat` or `NotebookFormat`. The wire
  string values stay the same; the TS identifier becomes direction-neutral.
- **Rationale:** The JSDoc on the enum already says "for workspace import and
  export." The asymmetry is more than cosmetic: `ImportRequest.format`'s
  JSDoc documents `AUTO` as "depending on extension," while
  `ExportRequest.format`'s JSDoc documents `AUTO` as "depending on object
  type." Same enum value, different server-side algorithm — see finding 2.
  A neutral name removes the "for export" implication.

### 2. `ExportFormat.AUTO` — ambiguous enum value
- **Location:** `model.ts:17-18`
- **Category:** Ambiguous / context-sensitive enum value.
- **Suggested name:** Split into two distinct enums per direction, or
  rename to `DETECT_FROM_CONTENT` (import meaning) and document the export
  meaning separately, or drop entirely and pick a default server-side.
- **Rationale:** `AUTO` reads as "let the server pick a format," but the
  picking algorithm differs per direction. For imports, the server inspects
  payload extension and content header. For exports, the server picks
  based on the object's type. One name, two algorithms is exactly the
  failure mode of overloaded enum values.

### 3. `ExportFormat.RAW` — vague enum value
- **Location:** `model.ts:19-24`
- **Category:** Vague enum value — names a behaviour, not a format.
- **Suggested name:** `ZIP_PASSTHROUGH` or `BINARY` (or `BYTES_AS_IS`).
- **Rationale:** `RAW` does not name a format — it names a behaviour ("no
  decoding, store as-is"). The JSDoc is a story about why the value exists
  ("This is introduced to unblock a DR use case importing .zip file as is")
  rather than what it represents. The value's existence is also gated on a
  server-side roadmap ("In workspace 3.0 folder import will be supported via
  a different API") that the SDK user does not see.

### 4. `ObjectInfo.objectId` and `ObjectInfo.resourceId` — duplicate concept, undifferentiated names
- **Location:** `model.ts:194-199`
- **Category:** Duplicate concept; near-identical names hide a real
  type/lifetime distinction.
- **Suggested name:** `legacyObjectId` (deprecated, `bigint` or `string` to
  preserve precision) and keep `resourceId`. Alternatively
  `localObjectId` (workspace-scoped, numeric) and `globalResourceId`
  (cross-API, string). Or drop the legacy one and only carry `resourceId`.
- **Rationale:** Two distinct identifiers live on the same `ObjectInfo`,
  both documented as "unique identifier for the object," differing only by
  the trailing phrase "consistent across all Databricks APIs." The name
  pair does not encode the difference — a reader sees `objectId` (number)
  and `resourceId` (string) and cannot tell which one to pass into another
  Databricks API. Likely truth: `objectId` is the legacy 64-bit numeric
  workspace-local ID; `resourceId` is the newer string ID used by the
  unified-resource API. The names should encode that distinction. Also:
  `objectId` is typed `number` — JS numbers are 64-bit floats and lose
  precision above 2^53; the field type should be `bigint` or `string`.

### 5. `Language` — vague / generic, no domain prefix
- **Location:** `model.ts:28-37`
- **Category:** Vague/generic top-level name.
- **Suggested name:** `NotebookLanguage`.
- **Rationale:** A top-level export called `Language` in a domain package
  is an attractive nuisance. Several other Databricks SDK domains touch
  "language" (`apps` runtimes, `jobs` task language, `clusters` runtime
  languages, `pipelines` SQL/Python). A user importing two SDK packages can
  end up with two clashing `Language` symbols. The wire field is
  `notebook.language`; `NotebookLanguage` is the natural domain prefix.

## Medium severity

### 6. `ObjectType.LIBRARY` — obsolete enum value
- **Location:** `model.ts:48`
- **Category:** Misleading enum value (encoded concept is obsolete).
- **Suggested name:** Keep the name but mark `@deprecated` in JSDoc with a
  pointer to the cluster-libraries / job-libraries APIs.
- **Rationale:** Workspace "libraries" as a top-level object type were
  superseded years ago by cluster-level and job-level library
  configurations. The value is exported in `ObjectType` without a
  deprecation marker. Consumers writing `if (obj.objectType ===
  ObjectType.LIBRARY)` are coding against a branch the server almost never
  returns; that is a discoverability hazard.

### 7. `ListRequest.notebooksModifiedAfter` — field contradicts type domain
- **Location:** `model.ts:149-154`
- **Category:** Field contradicts the type it lives on; unit hidden in JSDoc.
- **Suggested name:** `modifiedAfterMillis` (drop the `notebooks` qualifier
  and document the asymmetry) or `notebookModifiedAfterMillis` (singular
  subject, matching the filter's actual scope) plus an explicit
  millisecond suffix.
- **Rationale:** `list` returns all workspace object types — notebooks,
  directories, files, repos, dashboards. The filter parameter is named
  `notebooksModifiedAfter`, i.e. the filter only applies to objects of
  type `NOTEBOOK`. Non-notebook objects are not filtered, so a caller
  expecting `modifiedAfter` semantics will see directories whose contents
  post-date the supplied cutoff. The asymmetry is invisible from the name.
  Also: the unit (milliseconds) lives only in JSDoc; the sibling
  `ObjectInfo.createdAt` / `modifiedAt` fields are also `number` without
  unit-in-name — see finding 12.

### 8. `ExportRequest.directDownload` — verb-as-noun boolean
- **Location:** `model.ts:88-92`
- **Category:** Verb-as-noun naming; boolean named like a noun.
- **Suggested name:** `streamBinary`, `responseAsBinary`, or
  `returnBytesDirectly` — anything that parses as a boolean adjective.
- **Rationale:** `directDownload` reads as a noun phrase. Booleans
  conventionally use `is`/`has`/`should`/`return*` prefixes or adjective
  forms. There is also a real semantic problem: when `true`, the server
  returns raw bytes; when `false`, the server returns JSON with base64.
  Setting `directDownload: true` would make `parseResponse` in `utils.ts`
  crash (it does `JSON.parse` unconditionally), so the boolean cannot be
  set safely from this client today. The name should at least flag the
  fact that the response shape changes.

### 9. `ExportRequest_Response.fileType` — underspecified
- **Location:** `model.ts:103-105`
- **Category:** Underspecified field — name is one of the most overloaded
  strings in software, type is `string`.
- **Suggested name:** `mimeType`, `extension`, or `format: ExportFormat`
  (pick one and commit).
- **Rationale:** "The file type" doesn't say in what form — extension
  (`.ipynb`)? MIME (`application/x-ipynb+json`)? Enum (`JUPYTER`)? Object
  kind (`NOTEBOOK`)? With the field typed as `string`, any of those is
  syntactically valid; the user has to read upstream docs to know which.

### 10. `ExportRequest_Response.content` — type contradicts "base64-encoded" JSDoc
- **Location:** `model.ts:98-102`; decoded via `marshalSchema` transform at
  `model.ts:211-213`.
- **Category:** Type/JSDoc mismatch.
- **Suggested name:** Keep the field name, fix the JSDoc to say "Raw bytes
  decoded from the server's base64 encoding," or rename to `bytes`.
- **Rationale:** The JSDoc says the content is base64-encoded; the type is
  `Uint8Array` (raw bytes). The transform schema does `atob(s).charCodeAt`
  before populating the field, so the field already holds decoded bytes.
  The JSDoc was lifted from the wire-format documentation and never
  updated for the post-decode shape. "Uint8Array of base64-encoded data"
  is technically meaningless.

### 11. `ImportRequest.content` — type contradicts "base64-encoded" JSDoc
- **Location:** `model.ts:132-138`; encoded via `marshalSchema` transform
  at `model.ts:276-281`.
- **Category:** Type/JSDoc mismatch (mirror of 10).
- **Suggested name:** Keep the name; fix the JSDoc to say "Raw bytes; the
  client base64-encodes before sending."
- **Rationale:** The mirror of finding 10 in the reverse direction. The
  client encodes the bytes to base64 before sending. A defensive caller
  who reads the JSDoc and base64-encodes their bytes will double-encode
  and corrupt the upload. The mismatch is silent and the failure mode is
  data corruption.

### 12. `ObjectInfo.createdAt` / `modifiedAt` — unit ambiguity, `number` precision
- **Location:** `model.ts:190-193`
- **Category:** Underspecified unit; precision; conditional applicability
  hidden in JSDoc.
- **Suggested name:** `createdAtMillis` / `modifiedAtMillis`, or migrate
  the values to `Temporal.Instant` (the package already depends on
  `@js-temporal/polyfill`).
- **Rationale:** Two issues. (a) The `At` suffix is TS-friendly, but the
  type is `number` with no unit in the name — milliseconds vs. seconds is
  documented only as "UTC timestamp" in JSDoc, which does not commit. The
  sibling `ListRequest.notebooksModifiedAfter` is documented as
  milliseconds; one infers consistency, but the type does not say so. (b)
  "Only applicable to files" — `ObjectInfo` covers all object types
  (notebooks, directories, files, repos, dashboards), so the field is
  silently empty for most rows. Encoding partial applicability via
  JSDoc is a smell; the field shape doesn't change based on `objectType`.

### 13. `ObjectInfo.size` — underspecified, unit-less
- **Location:** `model.ts:196-197`
- **Category:** Underspecified field — name has no unit.
- **Suggested name:** `sizeBytes` (matches Databricks convention used in
  `clusters.clusterMemoryMb`, `pipelines.storageBytes`, etc.).
- **Rationale:** `size` is unit-less. JSDoc says "file size in bytes can
  be returned" — "can be" is ambiguous (always for files? sometimes?).
  At scale-up time (>4 GiB on a 64-bit count) `number` precision is fine,
  but `bigint` or `string` is safer for true byte counters approaching
  2^53. The field also shares the "only applicable to files" caveat from
  finding 12.

### 14. `MkdirsRequest.path` — singular/plural mismatch with the type name
- **Location:** `model.ts:162-168`
- **Category:** Singular/plural mismatch between containing type and field.
- **Suggested name:** `directoryPath` (singular) on the type, and rename
  the type itself per finding 15.
- **Rationale:** The type's verb is plural (`Mkdirs` — "make directories"),
  but it takes one path. The Unix `mkdir -p` pluralization comes from
  "create the directory and any missing parent directories," but the API
  input is a single path. A user reading `MkdirsRequest` reasonably
  expects to pass an array.

### 15. `MkdirsRequest` — Unix-ism
- **Location:** `model.ts:162` (type), `client.ts:266` (method).
- **Category:** Cryptic Unix abbreviation, cross-package inconsistency.
- **Suggested name:** `CreateDirectoryRequest`.
- **Rationale:** `mkdirs` is a Unix-derived verb. The convention in TS
  SDKs is to spell verbs out. The Databricks SDK's own `files` package
  uses `createDirectory` for the analogous operation — so the same
  conceptual action has two names across packages in the same SDK. Also:
  the wire path is `/api/2.0/workspace/mkdirs` (plural verb), but the
  request body holds one path, so even the wire name is misleading.

### 16. `getStatus` — vague verb on the client
- **Location:** `client.ts:157`
- **Category:** Vague verb; misleading category (returns metadata, not a
  status enum); inconsistent return shape vs. peer methods.
- **Suggested name:** `getMetadata` or `stat`.
- **Rationale:** "Status" of what? Across TS SDKs `getStatus` typically
  returns a status enum or a small status object (e.g. job run status).
  Here it returns full `ObjectInfo` metadata — a filesystem `stat`, not a
  status. The Files API in the same SDK uses `getMetadata`. The Go SDK
  uses `GetStatus` from `os.Stat` ancestry. Also: this method returns
  `Promise<ObjectInfo>` while `list` returns
  `Promise<ListRequest_Response>` (wrapper). One returns the bare entity,
  the other returns a wrapper — inconsistent shape across the same
  client; see finding 21 too.

### 17. `DeleteRequest.recursive` — Unix flag, no domain reading
- **Location:** `model.ts:61-66`
- **Category:** Unix-style flag name without domain meaning; understates
  destructiveness.
- **Suggested name:** `deleteContents` or `force`.
- **Rationale:** `recursive` is a verbatim port of `rm -r`. For a
  single-object delete, "recursive" only matters when the path is a
  directory. The flag would read better as `deleteContents` (descriptive)
  or `force` (matches the destructive intent). The JSDoc even admits the
  deletion is non-atomic ("Please note this deleting directory is not
  atomic"), a meaningful caveat hidden behind a one-word Unix flag.

## Low severity

### 18. `ExportFormat.R_MARKDOWN` — shape mismatch within the enum
- **Location:** `model.ts:15-16`
- **Category:** Inconsistent shape inside an enum (most values single
  token, one with an underscore).
- **Suggested name:** `RMARKDOWN` or `RMD` (with wire string still
  `R_MARKDOWN`). Or accept it as the exception and document.
- **Rationale:** Five of the seven `ExportFormat` values are single tokens
  (`SOURCE`, `HTML`, `JUPYTER`, `DBC`, `AUTO`, `RAW`); one is
  `R_MARKDOWN` with an underscore. Inconsistent shape inside the same
  enum.

### 19. `ExportFormat.DBC` — cryptic abbreviation
- **Location:** `model.ts:13-14`
- **Category:** Cryptic product-specific abbreviation.
- **Suggested name:** `DATABRICKS_ARCHIVE` on the TS identifier; the wire
  string stays `DBC`.
- **Rationale:** "DBC" = "Databricks Archive." The acronym is internal
  product jargon. Wire-format compatibility (`DBC` is what the server
  expects) means the rename must happen on the enum-key layer, not the
  enum-value layer — TypeScript supports that cleanly.

### 20. `ObjectInfo` — `Info` suffix
- **Location:** `model.ts:174-200`
- **Category:** Vague suffix; Go/Java convention carried into TS without
  reason.
- **Suggested name:** `WorkspaceObject` (or simply `Object` if not for the
  global-name collision with `Object`).
- **Rationale:** `Info` is a generic "POJO that describes a thing" suffix
  imported from Go/Java conventions. TS SDKs vary on this — some packages
  use bare entity names (`Catalog`, `Cluster`). This package's only entity
  type is `ObjectInfo` with no companion `Object`, so the suffix is purely
  a hat-tip to the Go SDK. A name like `WorkspaceObject` would also avoid
  the JS `Object` collision.

### 21. `ListRequest_Response.objects` — generic field for `ObjectInfo[]`
- **Location:** `model.ts:157-160`
- **Category:** Generic field name on a wrapper type.
- **Suggested name:** `items`, `entries`, or `workspaceObjects`.
- **Rationale:** `objects` is the most generic noun in JavaScript; the
  reader gets no scope information. `resp.objects` reads like "the
  objects of the response" rather than "the workspace objects under the
  listed path." A more specific name would convey scope.

### 22. `mkdirs` client method — Unix contraction next to verb-noun siblings
- **Location:** `client.ts:266`
- **Category:** Verb-tense / shape inconsistency among sibling methods.
- **Suggested name:** `createDirectory`.
- **Rationale:** Sibling methods on `Client` read as bare HTTP verbs
  (`export`, `import`, `list`, `delete`) or verb-noun (`getStatus`).
  `mkdirs` is the only Unix-style contraction. `createDirectory` would
  align with `getStatus` and with the `files` package convention.

### 23. First-person and ticket-driven prose in JSDoc
- **Location:** `model.ts:17` ("We will inspect the content of the payload
  to determine the type"); `model.ts:19-23` ("This is introduced to
  unblock a DR use case importing .zip file as is. … In workspace 3.0
  folder import will be supported via a different API.").
- **Category:** JSDoc voice / customer-facing prose.
- **Suggested name:** Rewrite as third-person product documentation —
  e.g. "The server inspects the payload header to determine the type." for
  `AUTO`, and "Use to import a `.zip` file without unwrapping it." for
  `RAW`.
- **Rationale:** "We will inspect" and "This is introduced to unblock a
  DR use case" read as commit-message or design-doc fragments, not
  customer-facing documentation. JSDoc renders into IDE tooltips that
  consumers see. Naming-adjacent but flagged.

## Observations

1. **Filesystem package without filesystem vocabulary.** The package
   implements filesystem-style operations (`list`, `delete`, `mkdirs`,
   `getStatus`) but does not use the canonical filesystem nouns (`File`,
   `Directory`, `Path`, `Stat`). Instead it uses
   `ObjectInfo` / `ObjectType` / `path: string`. A user familiar with
   `fs.stat` or POSIX has to mentally translate. The sibling `files`
   package (`/api/2.0/fs/`) uses `DirectoryEntry` / `FileInfo` —
   different vocabulary for the same concept across SDK packages.

2. **Two ID fields, one entity.** `ObjectInfo.objectId` (numeric, legacy)
   and `ObjectInfo.resourceId` (string, unified-resource) are both
   returned, both documented as "unique identifier for the object," with
   no naming clue about which one to pass where. This is the single most
   user-hostile naming issue in the file (also flagged as finding 4).

3. **`ExportFormat` is the import format.** The single enum services both
   `ImportRequest` and `ExportRequest` (good — DRY), but the name says
   only "Export." A neutral name (`WorkspaceObjectFormat` or
   `NotebookFormat`) would describe what it actually is.

4. **`AUTO` means two different things.** Inside `ExportFormat`, `AUTO`
   on `ImportRequest` means "detect from file extension + header," and
   `AUTO` on `ExportRequest` means "decide from object type." Same enum
   value, different server-side algorithm.

5. **`content: Uint8Array` documented as base64 in both directions.** Two
   fields hold post-decode bytes but their JSDoc reads as if they still
   hold base64 strings. A defensive user reading the JSDoc and
   base64-encoding their bytes will double-encode on the way in. The
   mismatch is silent and the failure mode is data corruption.

6. **`mkdirs` and `getStatus` are Unix/POSIX verbs that don't appear
   elsewhere in the SDK.** The `files` package uses `createDirectory`
   and `getMetadata`. The `repos` package uses `getRepo`. Picking one
   verb per concept and applying it across packages would let users
   transfer knowledge.

## Domain glossary

| Term | Meaning in this package |
|------|------------------------|
| Workspace object | Anything that lives in the workspace filesystem tree: notebooks, directories, files, repos, dashboards, (legacy) libraries. |
| Path | An absolute string starting with `/Workspace/` that names a workspace object. |
| Notebook | A workspace object containing runnable code cells and prose; carries a `Language`. |
| Directory | A workspace folder; can be listed and made via `mkdirs`. |
| File | An arbitrary blob in the workspace (not a notebook). |
| Repo | A Git-linked directory; appears in `ObjectType` but managed by a different package. |
| DBC | Databricks archive format — a `.zip`-like bundle of one or more notebooks. |
| Import | Upload an object (or DBC archive) into the workspace at a path. |
| Export | Download an object (or DBC archive) from the workspace at a path. |
| Mkdirs | Create a directory and any missing parents at a path (single-path operation despite the plural verb). |
| Get-status | Return metadata (path, type, language, ID, size, timestamps) for the object at a path — equivalent to `stat`. |
| Object ID | Legacy numeric workspace-local identifier (typed `number`, vulnerable to JS precision at >2^53). |
| Resource ID | Newer string identifier consistent across Databricks resource APIs. |
| Direct download | An `Export` mode where the response body is raw bytes instead of a base64-wrapped JSON object. |

## File coverage

| File | Lines | Read in full |
|------|-------|--------------|
| `src/v1/model.ts` | 298 | yes |
| `src/v1/client.ts` | 290 | yes |
| `src/v1/utils.ts` | 150 | yes |
| `src/v1/transport.ts` | 75 | yes |
| `src/v1/index.ts` | 20 | yes |
