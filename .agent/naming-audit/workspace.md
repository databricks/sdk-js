# Naming Audit: workspace

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/workspaceobjects/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace filesystem-style operations on notebooks, folders, and files: import, export, delete, list, get-status, and mkdirs against absolute paths under `/Workspace`.
**Total weird names flagged:** 27

## Scope note: `workspaceobjects` vs sibling packages

The Databricks SDK ships several packages whose names begin with "workspace". This audit covers the filesystem-style operations package, now `workspaceobjects`; the others differ in scope:

| Package | Domain | Wire prefix |
|---------|--------|-------------|
| `workspaceobjects` (this audit) | Workspace filesystem (notebooks/folders/files) | `/api/2.0/workspace/` |
| `workspaceassignment` | Account-level principal-to-workspace permission assignments | account API |
| `workspacebindings` | Securable-to-workspace bindings (catalog/credential/location) | Unity Catalog API |
| `workspaceconf` | Untyped key/value workspace configuration | `/api/2.0/workspace-conf` |
| `workspacesettings` | Strongly-typed workspace settings (compliance security profile, automatic cluster update, etc.) | various `/api/2.0/settings/*` |

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts` enum | `ExportFormat` used as the `format` field of `ImportRequest` | Misleading name (an "ExportFormat" governs imports too) |
| 2 | High | `model.ts` enum value | `ExportFormat.AUTO` | Misleading enum value (server inspects content) |
| 3 | High | `model.ts` enum value | `ExportFormat.RAW` | Vague enum value (no documented format, only a use-case story) |
| 4 | High | `model.ts` field | `ObjectInfo.objectId` and `ObjectInfo.resourceId` | Duplicate concept (two IDs for the same object, undifferentiated names) |
| 5 | High | `model.ts` enum | `Language` | Vague/generic, no domain prefix |
| 6 | Medium | `model.ts` enum value | `ObjectType.LIBRARY` | Misleading (library notebooks are an obsolete concept; deprecated in product) |
| 7 | Medium | `model.ts` field | `ListRequest.notebooksModifiedAfter` | Field contradicts type domain (list of all objects, filter only on notebooks) |
| 8 | Medium | `model.ts` field | `ExportRequest.directDownload` | Verb-as-noun field + boolean named like a noun |
| 9 | Medium | `model.ts` field | `ExportRequest_Response.fileType` | Underspecified (raw extension? MIME type? format enum?) |
| 10 | Medium | `model.ts` field | `ExportRequest_Response.content` typed `Uint8Array` | Type contradicts JSDoc ("base64-encoded content") |
| 11 | Medium | `model.ts` field | `ImportRequest.content` typed `Uint8Array` | Same type/JSDoc mismatch as 10 in the reverse direction |
| 12 | Medium | `model.ts` field | `ObjectInfo.createdAt` and `ObjectInfo.modifiedAt` | Underspecified time fields (mtime/ctime? wall clock?) and unit ambiguity (epoch millis as number) |
| 13 | Medium | `model.ts` field | `ObjectInfo.size` | Underspecified (file size in bytes per JSDoc, but no unit in the name) |
| 14 | Medium | `model.ts` field | `MkdirsRequest.path` | Singular/plural mismatch — type name plural (`Mkdirs`), field singular (`path`) |
| 15 | Medium | `model.ts` type | `MkdirsRequest` | Cryptic abbreviation (Unix-ism, "mkdirs" not "createDirectory") |
| 16 | Medium | `model.ts` enum value | `Language.R` | Single-letter identifier (clashes with `package R Markdown`) |
| 17 | Medium | `client.ts` method | `getStatus` | Vague verb (status of what?), inconsistent with `list`/`export` |
| 18 | Medium | `model.ts` field | `DeleteRequest.recursive` | Underspecified boolean (verbatim Unix flag, no domain reading) |
| 19 | Low | `model.ts` enum value | `ExportFormat.R_MARKDOWN` | Underscore inside enum value matches wire, but mixes shape with `JUPYTER`/`HTML` (single tokens) |
| 20 | Low | `model.ts` enum value | `ExportFormat.DBC` | Cryptic abbreviation (Databricks archive) |
| 21 | Low | `model.ts` interface | `ObjectInfo` | Generic name ("info" suffix used inconsistently across SDK) |
| 22 | Low | `model.ts` field | `ListRequest_Response.objects` | Generic field (`objects`) for `ObjectInfo[]` |
| 23 | Low | `client.ts` method | `mkdirs` | Verb-tense / casing inconsistency vs `createDirectory` analog elsewhere in SDK |
| 24 | Low | docstrings | "We will inspect…" / "This is introduced to unblock a DR use case" | First-person and ticket-driven prose in public JSDoc |
| 25 | High | `model.ts` types | `DeleteRequest_Response`, `ExportRequest_Response`, `ImportRequest_Response`, `ListRequest_Response`, `MkdirsRequest_Response` | Proto-architectural-leak (`_Response` infix encodes proto nested-message name) |
| 26 | High | `model.ts` schema constants | `unmarshalDeleteRequest_ResponseSchema`, `unmarshalExportRequest_ResponseSchema`, `unmarshalImportRequest_ResponseSchema`, `unmarshalListRequest_ResponseSchema`, `unmarshalMkdirsRequest_ResponseSchema` | Proto-architectural-leak (schema const names carry the proto nested-message infix into the public schema identifiers) |
| 27 | Observation | source files | `// Proto-style nested message name.` eslint-disable comments at `model.ts:69,96,146,156,170,202,206,221,225,235` and `index.ts` re-exports | Proto-architectural-leak surfacing: the lint-rule suppressions name "Proto" directly in source, confirming the leak is structural, not incidental |

## High severity

### 1. `ExportFormat` reused for `ImportRequest.format` — misleading enum

**Location:** `model.ts:5-25`; used as `ImportRequest.format` at `:129`

```ts
export enum ExportFormat {
  SOURCE = 'SOURCE',
  HTML = 'HTML',
  ...
}

export interface ImportRequest {
  ...
  format?: ExportFormat | undefined;
  ...
}
```

The enum is named `ExportFormat` but is used as the format for both `ImportRequest.format` and `ExportRequest.format`. The Go SDK's name (`ExportFormat`) leaks here. A neutral name like `WorkspaceObjectFormat` or `NotebookFormat` would describe both directions. The JSDoc on `ImportRequest.format` even lists the values (SOURCE, HTML, JUPYTER, DBC, R_MARKDOWN) as if they were import-specific, while the enum description says "for workspace import and export."

There is also a subtle asymmetry: `ImportRequest.format` documents AUTO as "depending on extension," `ExportRequest.format` documents AUTO as "depending on object type." Same enum value, different server behaviour per direction.

### 2. `ExportFormat.AUTO` — misleading enum value

**Location:** `model.ts:17-18`

```ts
/** We will inspect the content of the payload to determine the type */
AUTO = 'AUTO',
```

`AUTO` reads as "automatic file selection," but the value means "server inspects payload bytes to guess the file type." For an export request, "AUTO" means "decide based on the object's type." The single token serves two different inferred behaviors. `DETECT_FROM_CONTENT` / `DETECT_FROM_OBJECT` (split into two enums) would be honest.

### 3. `ExportFormat.RAW` — vague enum value

**Location:** `model.ts:19-24`

```ts
/**
 * This is introduced to unblock a DR use case importing .zip file as is.
 * If you import .zip file with AUTO format, it will be imported as a folder.
 * In workspace 3.0 folder import will be supported via a different API.
 */
RAW = 'RAW',
```

`RAW` does not name a format — it names a behavior ("no decoding, store as-is"). The JSDoc is a story about why the value exists, not what it represents. The value's existence is conditional on "workspace 3.0," a server-side roadmap item the SDK user does not see.

`ZIP_PASSTHROUGH` or `BINARY` would describe the actual data path. Right now a reader sees `ExportFormat.RAW` and has to read three lines of JSDoc to understand it.

### 4. `ObjectInfo.objectId` and `ObjectInfo.resourceId` — duplicate concept, undifferentiated names

**Location:** `model.ts:194-199`

```ts
/** Unique identifier for the object. */
objectId?: number | undefined;
...
/** A unique identifier for the object that is consistent across all Databricks APIs. */
resourceId?: string | undefined;
```

The same `ObjectInfo` carries two distinct identifiers, both documented as "unique identifier for the object," differing only by JSDoc adjective ("consistent across all Databricks APIs"). The names do not encode the difference: a reader sees `objectId` (number) and `resourceId` (string) and cannot tell which one to pass into another API.

Likely truth: `objectId` is the legacy 64-bit workspace-local numeric ID; `resourceId` is the new UUID-shaped string ID used by the unified resources API. The names should be `legacyObjectId` (deprecated) and `resourceId`, or `localObjectId` and `globalResourceId`, or one should be dropped.

Also, `objectId` is typed `number` — JavaScript numbers are 64-bit float; if the server ID exceeds 2^53, precision is lost. Other SDK types use `bigint` or string for similar IDs.

### 5. `Language` — vague/generic, no domain prefix

**Location:** `model.ts:27-37`

```ts
/** The language of notebook. */
export enum Language {
  SCALA = 'SCALA',
  PYTHON = 'PYTHON',
  SQL = 'SQL',
  R = 'R',
}
```

A top-level export named `Language` in a domain package. Many other SDK packages reference "language" (`apps` runtimes, `jobs` task language, `clusters` runtime languages, `pipelines` SQL/Python). The package re-exports `Language` without a `Notebook` or `Workspace` qualifier. A user importing two SDK packages can get `Language` from `workspaceobjects` and a different `Language` from `apps` or `jobs` (when those add similar enums).

`NotebookLanguage` is the natural domain prefix; the wire field is `notebook.language`.

### 25. `*Request_Response` types — proto nested-message naming leaks into the public surface

**Location:** `model.ts:70` (`DeleteRequest_Response`), `model.ts:97` (`ExportRequest_Response`), `model.ts:147` (`ImportRequest_Response`), `model.ts:157` (`ListRequest_Response`), `model.ts:171` (`MkdirsRequest_Response`); re-exported from `index.ts:9,11,13,15,17`.

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRequest_Response {}
...
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExportRequest_Response { ... }
```

**Why:** the `_Response` infix encodes the protobuf nested-message path (`message DeleteRequest { message Response { ... } }`) directly into a TS identifier. The eslint-disable comment names the leak verbatim ("Proto-style nested message name"). TypeScript consumers do not have proto-nested types; the underscored name reads as "snake_case in PascalCase" — a shape no other TS SDK package uses.

**Category:** Proto-architectural-leak — proto/IDL implementation detail surfaced in public type names.

**Suggested:** drop the `_Response` infix and pick a flat name: `DeleteResponse`, `ExportResponse`, `ImportResponse`, `ListResponse`, `MkdirsResponse`. Where the response carries domain content (`ListResponse` → `ObjectInfo[]`), a content-bearing name like `ListObjectsResponse` would also work.

**Rationale:** TS naming conventions are PascalCase without underscores. The `Request_Response` shape forces every consumer call site (`Promise<DeleteRequest_Response>`, `unmarshalDeleteRequest_ResponseSchema`) to carry the proto path. It also implies a parent-child semantic relationship between `DeleteRequest` and `DeleteRequest_Response` that does not exist on the wire (the response is a sibling message in proto, just nested for namespacing).

### 26. `unmarshal*Request_ResponseSchema` constants — proto leak into schema identifier names

**Location:** `model.ts:203` (`unmarshalDeleteRequest_ResponseSchema`), `model.ts:207` (`unmarshalExportRequest_ResponseSchema`), `model.ts:222` (`unmarshalImportRequest_ResponseSchema`), `model.ts:226` (`unmarshalListRequest_ResponseSchema`), `model.ts:236` (`unmarshalMkdirsRequest_ResponseSchema`); imported and used in `client.ts:38-42`.

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRequest_ResponseSchema: z.ZodType<DeleteRequest_Response> =
  z.object({});
```

**Why:** the proto-nested name from finding 25 propagates into every schema constant. The schema identifier itself (`unmarshalDeleteRequest_ResponseSchema`) is a public export carrying the proto path. The unmarshal verb is also kept (separate, deliberate per project rules), but the `Request_Response` infix on the schema names is the proto leak surfacing twice — once on the type, once on the schema constant.

**Category:** Proto-architectural-leak — schema-identifier inheritance of the proto nested-message path.

**Suggested:** rename in lockstep with finding 25: `unmarshalDeleteResponseSchema`, `unmarshalExportResponseSchema`, etc.

**Rationale:** schema constants are public API (re-exportable, used by downstream code). Carrying the proto path into them locks the proto shape into the SDK's public surface even for consumers who never see the underlying type alias.

## Medium severity

### 6. `ObjectType.LIBRARY` — obsolete concept

**Location:** `model.ts:48`

```ts
NOTEBOOK = 'NOTEBOOK',
DIRECTORY = 'DIRECTORY',
LIBRARY = 'LIBRARY',
FILE = 'FILE',
REPO = 'REPO',
DASHBOARD = 'DASHBOARD',
```

Workspace "libraries" (as a top-level object type) are obsolete — Databricks moved libraries to cluster-level and job-level configurations. The value is exported without a deprecation marker and without JSDoc explanation. Consumers writing `if (obj.objectType === ObjectType.LIBRARY)` are coding against a dead branch.

### 7. `ListRequest.notebooksModifiedAfter` — field contradicts type domain

**Location:** `model.ts:149-154`

```ts
export interface ListRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /** UTC timestamp in milliseconds */
  notebooksModifiedAfter?: number | undefined;
}
```

`list` returns all object types (notebooks, directories, files, repos, dashboards), but the filter parameter is named `notebooksModifiedAfter` — i.e., the filter only applies to objects of type `NOTEBOOK`. The asymmetry is invisible from the field name. A non-notebook object's last-modified value is silently not filtered, and a user expecting `modifiedAfter` semantics will see directories whose contents post-date the filter.

`modifiedAfterMillis` (without the `notebooks` prefix) or `notebookModifiedAfterMillis` (with the singular subject matching the filter's actual scope) would describe what the server does.

The unit (`milliseconds`) is in JSDoc only, not in the field name. Other timestamp fields in the same file are documented in milliseconds but named `createdAt` / `modifiedAt`. Inconsistent — see finding 12.

### 8. `ExportRequest.directDownload` — verb-as-noun field, weak boolean

**Location:** `model.ts:88-92`

```ts
/**
 * Flag to enable direct download. If it is `true`, the response is the exported file itself.
 * Otherwise, by default, the response contains content in the form of a base64 encoded string.
 */
directDownload?: boolean | undefined;
```

`directDownload` reads as a noun phrase ("the direct download"), but it's a boolean flag controlling response shape. Booleans are usually named with `is`/`has`/`should` prefixes or as adjectives. `streamBinary` or `responseAsBinary` would parse as a flag.

The flag also has a semantic problem: when `true`, the response body is raw bytes; when `false`, the response body is a JSON object with base64. So the field changes the entire response content type, but the generated client (`export` method) parses the response identically in both cases. Setting `directDownload: true` would crash the parser.

### 9. `ExportRequest_Response.fileType` — underspecified

**Location:** `model.ts:103-105`

```ts
/** The file type of the exported file. */
fileType?: string | undefined;
```

The doc says "the file type" but doesn't say in what form. Is it the extension (`.ipynb`)? A MIME type (`application/x-ipynb+json`)? An `ExportFormat` enum value (`JUPYTER`)? An object kind (`NOTEBOOK`)? Typed as `string` so any of the four is possible. The name `fileType` is one of the most overloaded strings in software.

`mimeType`, `extension`, or `format: ExportFormat` would commit.

### 10. `ExportRequest_Response.content` typed `Uint8Array` with "base64-encoded" doc

**Location:** `model.ts:98-102`

```ts
/**
 * The base64-encoded content.
 * If the limit (10MB) is exceeded, exception with error code **MAX_NOTEBOOK_SIZE_EXCEEDED** is thrown.
 */
content?: Uint8Array | undefined;
```

The JSDoc says the content is base64-encoded; the type is `Uint8Array` (raw bytes). The client decodes base64 before populating this field, so the field actually holds decoded bytes, contradicting the JSDoc. The JSDoc was lifted from the wire format documentation and not updated for the post-decode TS shape. A reader holding the type sees "Uint8Array of base64-encoded data," which is technically meaningless (Uint8Arrays are bytes, not base64).

### 11. `ImportRequest.content` typed `Uint8Array` with "base64-encoded" doc

**Location:** `model.ts:132-138`

```ts
/**
 * The base64-encoded content. This has a limit of 10 MB.
 * ...
 * This parameter might be absent, and instead a posted file is used.
 */
content?: Uint8Array | undefined;
```

Mirror of finding 10 in the reverse direction. The client encodes the bytes to base64 before sending; the TS user passes raw bytes despite the JSDoc saying "base64-encoded." Worse: a defensive caller who reads the JSDoc and base64-encodes their bytes will double-encode and corrupt the upload.

### 12. `ObjectInfo.createdAt` and `ObjectInfo.modifiedAt` — unit ambiguity, `Number` precision

**Location:** `model.ts:190-193`

```ts
/** Only applicable to files. The creation UTC timestamp. */
createdAt?: number | undefined;
/** Only applicable to files, the last modified UTC timestamp. */
modifiedAt?: number | undefined;
```

Two issues:

1. The names use the `At` suffix (TS-friendly) but the type is `number`. Unit (milliseconds vs seconds) is documented nowhere in this type. The companion `ListRequest.notebooksModifiedAfter` is documented as milliseconds; one infers consistency, but the type does not declare it. Most of the SDK uses `Temporal.Instant` for `At`-suffixed timestamps; here it's `number`.
2. "Only applicable to files" — the field is on `ObjectInfo`, which also describes notebooks, directories, etc. Setting expectations via "only applicable" in JSDoc is a code smell: the field shape doesn't change based on object type.

### 13. `ObjectInfo.size` — underspecified

**Location:** `model.ts:196-197`

```ts
/** Only applicable to files. The file size in bytes can be returned. */
size?: number | undefined;
```

`size` is a unit-less name. JSDoc says "file size in bytes can be returned" (the "can be" is also ambiguous — is it always returned for files?). `sizeBytes` or `sizeInBytes` is the convention used elsewhere in Databricks SDKs (`clusters.clusterMemoryMb`, `pipelines.storageBytes`). At scale-up time (>4GiB) `number` loses precision; `bigint` or `string` would be safer.

### 14. `MkdirsRequest.path` — singular/plural mismatch with the type name

**Location:** `model.ts:162-168`

```ts
export interface MkdirsRequest {
  /**
   * The absolute path of the directory. If the parent directories do not exist, it will also create them.
   * ...
   */
  path?: string | undefined;
}
```

The type's verb is plural (`Mkdirs` — "make directories"), but it takes one path. The pluralization comes from the Unix `mkdir -p` semantics ("makes the directory and any missing parent directories"), but the input is a single path. A user reading `MkdirsRequest` expects to pass an array.

### 15. `MkdirsRequest` — Unix-ism

**Location:** `model.ts:162`; `client.ts:266`

`mkdirs` is a Unix verb. The convention in TS SDKs is `createDirectory` (matches the Files API's `createDirectory`). The Databricks SDK's own `files` package uses `createDirectory` for a similar operation. Inconsistent verb across packages.

Also: the wire path is `/api/2.0/workspace/mkdirs` (plural verb), but the request body holds one path. So even at the wire level, the name is misleading.

### 16. `Language.R` — single-letter identifier

**Location:** `model.ts:36`

```ts
export enum Language {
  SCALA = 'SCALA',
  PYTHON = 'PYTHON',
  SQL = 'SQL',
  R = 'R',
}
```

`Language.R` is the only single-character enum value in the package. Auto-import tools, grep, and refactoring tools handle one-letter identifiers poorly. The wire format also uses just `R`, so wire compatibility constrains the value, but the enum key (the TS identifier) can diverge from the wire string. Documenting `R` more thoroughly, or treating it as the lone exception to a single-token convention, would help readers grepping for the symbol.

### 17. `getStatus` — vague verb on the client

**Location:** `client.ts:157`

```ts
async getStatus(req: GetStatusRequest, options?: CallOptions): Promise<ObjectInfo>
```

"Status" of what? In TS SDKs, `getStatus` usually returns a status enum or a small status object (e.g., job run status). Here it returns full `ObjectInfo` metadata — a filesystem `stat`, not a status. The Files API uses `getMetadata`. The Go SDK uses `GetStatus` (from `os.Stat` ancestry). Either `getMetadata` or `stat` would describe the actual operation.

The method also returns `Promise<ObjectInfo>` while `list` returns `Promise<ListRequest_Response>` — inconsistent shape (one returns the bare entity, one returns a wrapper). See finding 22.

### 18. `DeleteRequest.recursive` — Unix flag, no domain reading

**Location:** `model.ts:61-66`

```ts
/**
 * The flag that specifies whether to delete the object recursively. It is `false` by default.
 * Please note this deleting directory is not atomic. If it fails in the middle, some of objects
 * under this directory may be deleted and cannot be undone.
 */
recursive?: boolean | undefined;
```

`recursive` is a verbatim port of `rm -r`. For a single-object delete, "recursive" only matters when the path is a directory. The flag would read better as `deleteContents` or `force` for the destructive intent. The JSDoc admits the deletion is non-atomic, a meaningful caveat hidden behind a one-word flag.

## Low severity

### 19. `ExportFormat.R_MARKDOWN` — shape mismatch within enum

**Location:** `model.ts:15-16`

```ts
SOURCE = 'SOURCE',
HTML = 'HTML',
JUPYTER = 'JUPYTER',
DBC = 'DBC',
R_MARKDOWN = 'R_MARKDOWN',
AUTO = 'AUTO',
RAW = 'RAW',
```

Five of the seven values are single tokens; one is `R_MARKDOWN` with an underscore. SQL convention would also be `RMARKDOWN` or `RMD`. Inconsistent shape inside the same enum.

### 20. `ExportFormat.DBC` — cryptic abbreviation

**Location:** `model.ts:13-14`

```ts
/** The notebook will be imported/exported as Databricks archive format. */
DBC = 'DBC',
```

DBC = "Databricks Archive." The acronym is product-specific. `DATABRICKS_ARCHIVE` would be readable. Wire-format compatibility (`DBC` is what the server expects) means the rename has to happen in the enum-key layer, not the enum-value layer — which TS supports cleanly.

### 21. `ObjectInfo` — `Info` suffix used inconsistently across SDK

**Location:** `model.ts:173-200`

The `Info` suffix is a Go/Java convention for "POJO that describes a thing." TS SDKs vary: some use bare entity names (`Catalog`, `Cluster`), some use `Info`/`Details`. This package's only entity type is `ObjectInfo`. There is no companion `Object` — so the name reads consistently with itself, but the suffix is purely a hat-tip to Go.

### 22. `ListRequest_Response.objects` — generic field for `ObjectInfo[]`

**Location:** `model.ts:157-160`

```ts
export interface ListRequest_Response {
  /** List of objects. */
  objects?: ObjectInfo[] | undefined;
}
```

`objects` is the most generic JavaScript noun; it tells the reader nothing. `items`, `entries`, `paths`, or `workspaceObjects` would convey scope. The Go SDK has the same `Objects` field; transferring the name without adaptation gives a TS user a `resp.objects` access that reads like "the objects of the response."

### 23. `mkdirs` — verb-tense / casing inconsistency

**Location:** `client.ts:266`

```ts
async mkdirs(req: MkdirsRequest, options?: CallOptions): Promise<MkdirsRequest_Response>
```

Other client methods read as verb-noun (`export`, `import`, `list`) or compound verb (`getStatus`). `mkdirs` is the only Unix-style contraction. The class also has a `delete` method (matches HTTP verb) but no `make` or `create` method. `createDirectory` would align with `delete` semantically.

### 24. First-person and ticket-driven prose in public JSDoc

**Location:** `model.ts:17`, `:19-23`

```ts
/** We will inspect the content of the payload to determine the type */
AUTO = 'AUTO',
/**
 * This is introduced to unblock a DR use case importing .zip file as is.
 * If you import .zip file with AUTO format, it will be imported as a folder.
 * In workspace 3.0 folder import will be supported via a different API.
 */
RAW = 'RAW',
```

"We will inspect" and "This is introduced to unblock a DR use case" are not customer-facing language. They read as commit messages or design-doc fragments. JSDoc is rendered into TS IDE tooltips that customers see. Naming-adjacent but flagged.

## Observations

1. **Filesystem package without filesystem vocabulary.** The package implements filesystem-style operations (`list`, `delete`, `mkdirs`, `getStatus`) but does not use the canonical filesystem nouns (`File`, `Directory`, `Path`, `Stat`). Instead it uses `ObjectInfo`/`ObjectType`/`path: string`. A user familiar with `fs.stat` or POSIX has to mentally translate. Meanwhile the sibling `files` package (`/api/2.0/fs/`) uses `DirectoryEntry`/`FileInfo` — different vocabulary for the same concept.

2. **Two ID fields, one entity.** `ObjectInfo.objectId` (numeric, legacy) and `ObjectInfo.resourceId` (string, unified-resource) are both returned, both documented as "unique identifier for the object," with no naming clue about which one to pass where. This is the single most user-hostile naming issue in the file.

3. **`ExportFormat` is the import format.** The single enum services both `ImportRequest` and `ExportRequest` (good — DRY), but the name says only "Export." A neutral name (`NotebookFormat` or `WorkspaceObjectFormat`) would describe what it actually is.

4. **`AUTO` means two different things.** Inside `ExportFormat`, `AUTO` on `ImportRequest` means "detect from file extension + header," and `AUTO` on `ExportRequest` means "decide from object type." Same enum value, different server-side algorithm.

5. **`content: Uint8Array` documented as base64 in both directions.** Two fields hold post-decode bytes but their JSDoc reads as if they still hold base64 strings. A defensive user reading the JSDoc and base64-encoding their bytes will double-encode on the way in. The mismatch is silent and the failure mode is data corruption.

6. **`mkdirs` and `getStatus` are Unix/POSIX verbs that don't appear elsewhere in the SDK.** The `files` package uses `createDirectory` and `getMetadata`. The `repos` package uses `getRepo`. Picking one verb per concept and applying it across packages would let users transfer knowledge.

7. **Proto nested-message names surface ten times in the public API (finding 27).** Every response type and its schema constant carries the `Request_Response` infix. The source files mark the leak in eight separate `eslint-disable-next-line ... -- Proto-style nested message name.` comments at `model.ts:69, :96, :146, :156, :170, :202, :206, :221, :225, :235`. The lint rule that would block this shape (`@typescript-eslint/naming-convention`) is suppressed package-wide for these identifiers. The suppression naming the leak ("Proto-style nested message name") confirms the issue is generator-level, not incidental — fixable only in the template that emits these types from the proto schema.

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
| `src/v1/model.ts` | 299 | yes |
| `src/v1/client.ts` | 291 | yes |
| `src/v1/utils.ts` | 151 | yes |
| `src/v1/index.ts` | 21 | yes |
