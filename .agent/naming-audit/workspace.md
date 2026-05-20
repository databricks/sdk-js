# Naming Audit: workspace

**Path:** `packages/workspace/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace filesystem-style operations on notebooks, folders, and files: import, export, delete, list, get-status, and mkdirs against absolute paths under `/Workspace`.
**Total weird names flagged:** 31

## Scope note: `workspace` vs sibling packages

The Databricks SDK ships five packages whose names begin with "workspace". This audit covers only the first one; the others differ in scope:

| Package | Domain | Wire prefix |
|---------|--------|-------------|
| `workspace` (this audit) | Workspace filesystem (notebooks/folders/files) | `/api/2.0/workspace/` |
| `workspaceassignment` | Account-level principal-to-workspace permission assignments | account API |
| `workspacebindings` | Securable-to-workspace bindings (catalog/credential/location) | Unity Catalog API |
| `workspaceconf` | Untyped key/value workspace configuration | `/api/2.0/workspace-conf` |
| `workspacesettings` | Strongly-typed workspace settings (compliance security profile, automatic cluster update, etc.) | various `/api/2.0/settings/*` |

The package name `workspace` is the most overloaded of the five — every Databricks API operates "in a workspace," so a package literally called `workspace` provides almost no scope signal. A name like `workspacefiles`, `workspacefs`, or `workspacenotebooks` would convey that this is the filesystem-style API and would not collide conceptually with the other four "workspace*" packages. See finding 1.

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | package | `workspace` | Vague/generic package name (overloaded across 5+ "workspace*" packages) |
| 2 | High | `model.ts` interface | `Delete`, `Export`, `Import`, `List`, `Mkdirs`, `GetStatus` | Verb-as-type, reserved-word collisions |
| 3 | High | `model.ts` enum | `ExportFormat` used as the `format` field of `Import` | Misleading name (an "ExportFormat" governs imports too) |
| 4 | High | `model.ts` enum value | `ExportFormat.AUTO` | Misleading enum value (server inspects content) |
| 5 | High | `model.ts` enum value | `ExportFormat.RAW` | Vague enum value (no documented format, only a use-case story) |
| 6 | High | `model.ts` enum value | `ObjectType.OBJECT_TYPE_UNSPECIFIED` | Redundant enum prefix + proto sentinel leak |
| 7 | High | `model.ts` field | `ObjectInfo.objectId` and `ObjectInfo.resourceId` | Duplicate concept (two IDs for the same object, undifferentiated names) |
| 8 | High | `model.ts` enum | `Language` | Vague/generic, no domain prefix |
| 9 | Medium | `model.ts` enum value | `ObjectType.LIBRARY` | Misleading (library notebooks are an obsolete concept; deprecated in product) |
| 10 | Medium | `model.ts` field | `List.notebooksModifiedAfter` | Field contradicts type domain (list of all objects, filter only on notebooks) |
| 11 | Medium | `model.ts` field | `Export.directDownload` | Verb-as-noun field + boolean named like a noun |
| 12 | Medium | `model.ts` field | `Export_Response.fileType` | Underspecified (raw extension? MIME type? format enum?) |
| 13 | Medium | `model.ts` field | `Export_Response.content` typed `Uint8Array` | Type contradicts JSDoc ("base64-encoded content") |
| 14 | Medium | `model.ts` field | `Import.content` typed `Uint8Array` | Same type/JSDoc mismatch as 13 in the reverse direction |
| 15 | Medium | `model.ts` field | `ObjectInfo.createdAt` and `ObjectInfo.modifiedAt` | Underspecified time fields (mtime/ctime? wall clock?) and unit ambiguity (epoch millis as number) |
| 16 | Medium | `model.ts` field | `ObjectInfo.size` | Underspecified (file size in bytes per JSDoc, but no unit in the name) |
| 17 | Medium | `model.ts` field | `Mkdirs.path` | Singular/plural mismatch — type name plural (`Mkdirs`), field singular (`path`) |
| 18 | Medium | `model.ts` type | `Mkdirs` | Cryptic abbreviation (Unix-ism, "mkdirs" not "createDirectory") |
| 19 | Medium | `model.ts` enum value | `Language.R` | Single-letter identifier (clashes with `package R Markdown`) |
| 20 | Medium | `model.ts` enum value | `Language.SCALA`, `PYTHON`, `SQL`, `R` | Missing `LANGUAGE_` prefix elsewhere, raw values overlap with cluster/job runtime names |
| 21 | Medium | `client.ts` method | `getStatus` | Vague verb (status of what?), inconsistent with `list`/`export` |
| 22 | Medium | `model.ts` interface | `GetStatus` | Verb-as-type with no `Request` suffix (whole SDK is inconsistent on this) |
| 23 | Medium | `model.ts` field | `Delete.recursive` | Underspecified boolean (verbatim Unix flag, no domain reading) |
| 24 | Low | `model.ts` enum value | `ExportFormat.R_MARKDOWN` | Underscore inside enum value matches wire, but mixes shape with `JUPYTER`/`HTML` (single tokens) |
| 25 | Low | `model.ts` enum value | `ExportFormat.DBC` | Cryptic abbreviation (Databricks archive) |
| 26 | Low | `model.ts` enum | `ExportOutputs` | Singular/plural — type is `Outputs` (plural), field on `Export` is also `outputs`, values `ALL`/`NONE` describe whether outputs are included |
| 27 | Low | `model.ts` field | `Export.outputs` typed `ExportOutputs` | Field name == type-suffix tautology |
| 28 | Low | `model.ts` interface | `ObjectInfo` | Generic name ("info" suffix used inconsistently across SDK) |
| 29 | Low | `model.ts` field | `List_Response.objects` | Generic field (`objects`) for `ObjectInfo[]` |
| 30 | Low | `client.ts` method | `mkdirs` | Verb-tense / casing inconsistency vs `createDirectory` analog elsewhere in SDK |
| 31 | Low | docstrings | "We will inspect…" / "This is introduced to unblock a DR use case" | First-person and ticket-driven prose in public JSDoc |

## High severity

### 1. `workspace` — vague/generic package name (overloaded)

**Location:** `package.json` → `@databricks/sdk-workspace`

The package is named after a noun every Databricks user already associates with "the whole product." Five other npm packages also start with `workspace`. Without reading `client.ts`, nothing in the name tells a TS consumer that this package's scope is "files and folders under `/Workspace` in the workspace tree." The wire URL prefix `/api/2.0/workspace/` is the only clue.

A name that conveys scope:

- `workspacefiles` — already exists conceptually (there is a separate `files` package for `/Files/`); but matches the canonical product wording "Workspace Files."
- `workspacefs` — matches the filesystem metaphor of `list`/`mkdirs`/`getStatus`.
- `workspacenotebooks` — narrowest, but `Import`/`Export` also handle files and DBC archives, so this would undersell.

Cross-package collision: a user typing `import { ... } from '@databricks/sdk-workspace/v1'` gets `Client`, but so does every other "workspace*" package. The TS class is also called `Client` (see finding 24 in the SDK-wide patterns).

### 2. `Delete`, `Export`, `Import`, `List`, `Mkdirs`, `GetStatus` — verb-as-type & reserved-word collisions

**Location:** `model.ts:65`, `:79`, `:121`, `:126`, `:163`, `:176`

```ts
export interface Delete { ... }
export interface Export { ... }
export interface GetStatus { ... }
export interface Import { ... }
export interface List { ... }
export interface Mkdirs { ... }
```

Three of these are JavaScript reserved or contextually reserved words:

- `Delete` shadows the `delete` operator (case-different but visually confusing).
- `Export` and `Import` collide with ES module syntax; the file already does `import type { Import } from './model'` which reads as a syntax error at a glance.
- `List` shadows `Array`/`List` from common stdlib vocabulary.
- `Mkdirs` is a Unix verb fragment.
- `GetStatus` is verb+noun.

Every other request type in the SDK follows the pattern `<Verb><Noun>Request` (e.g. `CreateAlertRequest`, `DeleteCatalogRequest`). This package omits both the `Request` suffix and the noun. The interfaces are also bare verbs, which makes type signatures like `async delete(req: Delete)` unreadable — at the call site you cannot tell whether `Delete` is the request type, the response type, the verb, or a builtin.

Idiomatic TS would be `DeleteRequest` / `DeleteWorkspaceObjectRequest` (matching the rest of the SDK), or shorter: `DeleteRequest` / `ExportRequest` / `ImportRequest` / `ListRequest` / `MkdirsRequest` / `GetStatusRequest`. The current names are 1:1 with the Go SDK's `workspace.Delete`/`workspace.Export` Go struct names — in Go, package-prefixing makes `workspace.Delete` unambiguous; in TS, after `import {Delete} from '@databricks/sdk-workspace/v1'`, the prefix is gone.

### 3. `ExportFormat` reused for `Import.format` — misleading enum

**Location:** `model.ts:6-25`; used as `Import.format` at `:143`

```ts
export enum ExportFormat {
  SOURCE = 'SOURCE',
  HTML = 'HTML',
  ...
}

export interface Import {
  ...
  format?: ExportFormat | undefined;
  ...
}
```

The enum is named `ExportFormat` but is used as the format for both `Import.format` and `Export.format`. The Go SDK's name (`ExportFormat`) leaks here. A neutral name like `WorkspaceObjectFormat` or `NotebookFormat` would describe both directions. The JSDoc on `Import.format` even lists the values (SOURCE, HTML, JUPYTER, DBC, R_MARKDOWN) as if they were import-specific, while the enum description says "for workspace import and export."

There is also a subtle asymmetry: `Import.format` documents AUTO as "depending on extension," `Export.format` documents AUTO as "depending on object type." Same enum value, different server behaviour per direction.

### 4. `ExportFormat.AUTO` — misleading enum value

**Location:** `model.ts:17-18`

```ts
/** We will inspect the content of the payload to determine the type */
AUTO = 'AUTO',
```

`AUTO` reads as "automatic file selection," but the value means "server inspects payload bytes to guess the file type." For an export request, "AUTO" means "decide based on the object's type." The single token serves two different inferred behaviors. `DETECT_FROM_CONTENT` / `DETECT_FROM_OBJECT` (split into two enums) would be honest.

### 5. `ExportFormat.RAW` — vague enum value

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

### 6. `ObjectType.OBJECT_TYPE_UNSPECIFIED` — redundant enum prefix + proto sentinel leak

**Location:** `model.ts:48-52`

```ts
export enum ObjectType {
  /**
   * As of 2023-10 this is used only by list-repo API so that repos can gracefully handle errors
   * for unsupported types.
   */
  OBJECT_TYPE_UNSPECIFIED = 'OBJECT_TYPE_UNSPECIFIED',
  NOTEBOOK = 'NOTEBOOK',
  ...
}
```

Two problems in one value:

1. Enum prefix repetition: the enum is `ObjectType`, the value is `OBJECT_TYPE_UNSPECIFIED`. Every value would be readable as `ObjectType.NOTEBOOK` — the others (good) drop the prefix; this one (bad) retains it. The proto-style `<ENUM_NAME>_UNSPECIFIED` is documented as a proto convention, not a TS one.
2. Proto sentinel leak: the JSDoc explicitly says this value is only used by `list-repo` for graceful unsupported-type handling. It is a server implementation detail. A TS consumer constructing an `ObjectInfo` should never set this. Like `Aggregation.UNKNOWN` and similar leaks elsewhere, this is the proto default-value mechanism surfacing into the SDK.

### 7. `ObjectInfo.objectId` and `ObjectInfo.resourceId` — duplicate concept, undifferentiated names

**Location:** `model.ts:209-214`

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

### 8. `Language` — vague/generic, no domain prefix

**Location:** `model.ts:35-44`

```ts
/** The language of notebook. */
export enum Language {
  SCALA = 'SCALA',
  PYTHON = 'PYTHON',
  SQL = 'SQL',
  R = 'R',
}
```

A top-level export named `Language` in a domain package. Many other SDK packages reference "language" (`apps` runtimes, `jobs` task language, `clusters` runtime languages, `pipelines` SQL/Python). The package re-exports `Language` without a `Notebook` or `Workspace` qualifier. A user importing two SDK packages can get `Language` from `workspace` and a different `Language` from `apps` or `jobs` (when those add similar enums).

`NotebookLanguage` is the natural domain prefix; the wire field is `notebook.language`.

## Medium severity

### 9. `ObjectType.LIBRARY` — obsolete concept

**Location:** `model.ts:55`

```ts
NOTEBOOK = 'NOTEBOOK',
DIRECTORY = 'DIRECTORY',
LIBRARY = 'LIBRARY',
FILE = 'FILE',
REPO = 'REPO',
DASHBOARD = 'DASHBOARD',
```

Workspace "libraries" (as a top-level object type) are obsolete — Databricks moved libraries to cluster-level and job-level configurations. The value is exported without a deprecation marker and without JSDoc explanation. Consumers writing `if (obj.objectType === ObjectType.LIBRARY)` are coding against a dead branch.

### 10. `List.notebooksModifiedAfter` — field contradicts type domain

**Location:** `model.ts:163-168`

```ts
export interface List {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /** UTC timestamp in milliseconds */
  notebooksModifiedAfter?: number | undefined;
}
```

`list` returns all object types (notebooks, directories, files, repos, dashboards), but the filter parameter is named `notebooksModifiedAfter` — i.e., the filter only applies to objects of type `NOTEBOOK`. The asymmetry is invisible from the field name. A non-notebook object's last-modified value is silently not filtered, and a user expecting `modifiedAfter` semantics will see directories whose contents post-date the filter.

`modifiedAfterMillis` (without the `notebooks` prefix) or `notebookModifiedAfterMillis` (with the singular subject matching the filter's actual scope) would describe what the server does.

The unit (`milliseconds`) is in JSDoc only, not in the field name. Other timestamp fields in the same file are documented in milliseconds but named `createdAt` / `modifiedAt`. Inconsistent — see finding 15.

### 11. `Export.directDownload` — verb-as-noun field, weak boolean

**Location:** `model.ts:96-99`

```ts
/**
 * Flag to enable direct download. If it is `true`, the response is the exported file itself.
 * Otherwise, by default, the response contains content in the form of a base64 encoded string.
 */
directDownload?: boolean | undefined;
```

`directDownload` reads as a noun phrase ("the direct download"), but it's a boolean flag controlling response shape. Booleans are usually named with `is`/`has`/`should` prefixes or as adjectives. `streamBinary` or `responseAsBinary` would parse as a flag.

The flag also has a semantic problem: when `true`, the response body is raw bytes; when `false`, the response body is a JSON object with base64. So the field changes the entire response content type, but the generated client (`export` method) parses the response identically in both cases. Setting `directDownload: true` would crash the parser.

### 12. `Export_Response.fileType` — underspecified

**Location:** `model.ts:117-119`

```ts
/** The file type of the exported file. */
fileType?: string | undefined;
```

The doc says "the file type" but doesn't say in what form. Is it the extension (`.ipynb`)? A MIME type (`application/x-ipynb+json`)? An `ExportFormat` enum value (`JUPYTER`)? An object kind (`NOTEBOOK`)? Typed as `string` so any of the four is possible. The name `fileType` is one of the most overloaded strings in software.

`mimeType`, `extension`, or `format: ExportFormat` would commit.

### 13. `Export_Response.content` typed `Uint8Array` with "base64-encoded" doc

**Location:** `model.ts:112-116`

```ts
/**
 * The base64-encoded content.
 * If the limit (10MB) is exceeded, exception with error code **MAX_NOTEBOOK_SIZE_EXCEEDED** is thrown.
 */
content?: Uint8Array | undefined;
```

The JSDoc says the content is base64-encoded; the type is `Uint8Array` (raw bytes). The client decodes base64 before populating this field, so the field actually holds decoded bytes, contradicting the JSDoc. The JSDoc was lifted from the wire format documentation and not updated for the post-decode TS shape. A reader holding the type sees "Uint8Array of base64-encoded data," which is technically meaningless (Uint8Arrays are bytes, not base64).

### 14. `Import.content` typed `Uint8Array` with "base64-encoded" doc

**Location:** `model.ts:146-152`

```ts
/**
 * The base64-encoded content. This has a limit of 10 MB.
 * ...
 * This parameter might be absent, and instead a posted file is used.
 */
content?: Uint8Array | undefined;
```

Mirror of finding 13 in the reverse direction. The client encodes the bytes to base64 before sending; the TS user passes raw bytes despite the JSDoc saying "base64-encoded." Worse: a defensive caller who reads the JSDoc and base64-encodes their bytes will double-encode and corrupt the upload.

### 15. `ObjectInfo.createdAt` and `ObjectInfo.modifiedAt` — unit ambiguity, `Number` precision

**Location:** `model.ts:204-208`

```ts
/** Only applicable to files. The creation UTC timestamp. */
createdAt?: number | undefined;
/** Only applicable to files, the last modified UTC timestamp. */
modifiedAt?: number | undefined;
```

Two issues:

1. The names use the `At` suffix (TS-friendly) but the type is `number`. Unit (milliseconds vs seconds) is documented nowhere in this type. The companion `List.notebooksModifiedAfter` is documented as milliseconds; one infers consistency, but the type does not declare it. Most of the SDK uses `Temporal.Instant` for `At`-suffixed timestamps; here it's `number`.
2. "Only applicable to files" — the field is on `ObjectInfo`, which also describes notebooks, directories, etc. Setting expectations via "only applicable" in JSDoc is a code smell: the field shape doesn't change based on object type.

### 16. `ObjectInfo.size` — underspecified

**Location:** `model.ts:210-211`

```ts
/** Only applicable to files. The file size in bytes can be returned. */
size?: number | undefined;
```

`size` is a unit-less name. JSDoc says "file size in bytes can be returned" (the "can be" is also ambiguous — is it always returned for files?). `sizeBytes` or `sizeInBytes` is the convention used elsewhere in Databricks SDKs (`clusters.clusterMemoryMb`, `pipelines.storageBytes`). At scale-up time (>4GiB) `number` loses precision; `bigint` or `string` would be safer.

### 17. `Mkdirs.path` — singular/plural mismatch with the type name

**Location:** `model.ts:176-182`

```ts
export interface Mkdirs {
  /**
   * The absolute path of the directory. If the parent directories do not exist, it will also create them.
   * ...
   */
  path?: string | undefined;
}
```

The type is plural (`Mkdirs` — "make directories"), but it takes one path. The pluralization comes from the Unix `mkdir -p` semantics ("makes the directory and any missing parent directories"), but the input is a single path. A user reading `Mkdirs` expects to pass an array.

### 18. `Mkdirs` — Unix-ism

**Location:** `model.ts:176`; `client.ts:254`

`mkdirs` is a Unix verb. The convention in TS SDKs is `createDirectory` (matches the Files API's `createDirectory`). The Databricks SDK's own `files` package uses `createDirectory` for a similar operation. Inconsistent verb across packages.

Also: the wire path is `/api/2.0/workspace/mkdirs` (plural verb), but the request body holds one path. So even at the wire level, the name is misleading.

### 19. `Language.R` — single-letter identifier

**Location:** `model.ts:43`

```ts
export enum Language {
  SCALA = 'SCALA',
  PYTHON = 'PYTHON',
  SQL = 'SQL',
  R = 'R',
}
```

`Language.R` is the only single-character enum value in the package. Auto-import tools, grep, and refactoring tools handle one-letter identifiers poorly. The wire format also uses just `R`, so a rename in the SDK would need a string mapping; nonetheless, `Language.R_LANG` (matching the `R_MARKDOWN` format value) or simply documenting `R` more thoroughly would help.

### 20. `Language` values — no `LANGUAGE_` prefix, overlap with runtime names

**Location:** `model.ts:35-44`

```ts
SCALA = 'SCALA',
PYTHON = 'PYTHON',
SQL = 'SQL',
R = 'R',
```

The enum values are bare language names that collide with cluster runtime IDs (`DBR-15.4-SCALA-2.12`), job task types (`SQL`, `PYTHON_WHEEL_TASK`), and library types. A user querying `notebook.language === 'PYTHON'` may also see `task.taskType === 'PYTHON_WHEEL_TASK'` and not realize the two `PYTHON` strings come from different enums.

Other SDK enums add a prefix (`TaskType.PYTHON_WHEEL_TASK`); this one does not.

### 21. `getStatus` — vague verb on the client

**Location:** `client.ts:154`

```ts
async getStatus(req: GetStatus, options?: CallOptions): Promise<ObjectInfo>
```

"Status" of what? In TS SDKs, `getStatus` usually returns a status enum or a small status object (e.g., job run status). Here it returns full `ObjectInfo` metadata — a filesystem `stat`, not a status. The Files API uses `getMetadata`. The Go SDK uses `GetStatus` (from `os.Stat` ancestry). Either `getMetadata` or `stat` would describe the actual operation.

The method also returns `Promise<ObjectInfo>` while `list` returns `Promise<List_Response>` — inconsistent shape (one returns the bare entity, one returns a wrapper). See finding 29.

### 22. `GetStatus` — verb-as-type without `Request` suffix

**Location:** `model.ts:121-124`

```ts
export interface GetStatus {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
}
```

Combined with finding 2, `GetStatus` is the only request type whose name is composed of two verbs. The other request types (`Delete`, `Export`, `Import`, `List`, `Mkdirs`) are single verbs. The package mixes the two patterns. `GetStatusRequest` is what the rest of the SDK uses.

### 23. `Delete.recursive` — Unix flag, no domain reading

**Location:** `model.ts:69-73`

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

### 24. `ExportFormat.R_MARKDOWN` — shape mismatch within enum

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

### 25. `ExportFormat.DBC` — cryptic abbreviation

**Location:** `model.ts:13-14`

```ts
/** The notebook will be imported/exported as Databricks archive format. */
DBC = 'DBC',
```

DBC = "Databricks Archive." The acronym is product-specific. `DATABRICKS_ARCHIVE` would be readable. Wire-format compatibility (`DBC` is what the server expects) means the rename has to happen in the enum-key layer, not the enum-value layer — which TS supports cleanly.

### 26. `ExportOutputs` — plural enum type for ALL/NONE values

**Location:** `model.ts:27-32`

```ts
export enum ExportOutputs {
  /** All outputs will be exported */
  ALL = 'ALL',
  /** No outputs will be exported */
  NONE = 'NONE',
}
```

The enum models "which outputs to include" but is named `ExportOutputs` (plural). `OutputsFilter`, `OutputInclusion`, or `IncludeOutputs` (boolean) would read better. The two values `ALL` and `NONE` could equally be a boolean.

Also: JSDoc on `Export.outputs` says "only ALL or NONE is documented publically, DATABRICKS is internal only" — admits there's a hidden third value, which means the enum is not exhaustive.

### 27. `Export.outputs` typed `ExportOutputs` — type-suffix tautology

**Location:** `model.ts:104-106`

```ts
outputs?: ExportOutputs | undefined;
```

Field and type both spell `outputs`. The user types `req.outputs = ExportOutputs.ALL`. Idiomatic phrasing would be `req.outputInclusion = OutputInclusion.ALL` or `req.includeOutputs = true`.

### 28. `ObjectInfo` — `Info` suffix used inconsistently across SDK

**Location:** `model.ts:188-214`

The `Info` suffix is a Go/Java convention for "POJO that describes a thing." TS SDKs vary: some use bare entity names (`Catalog`, `Cluster`), some use `Info`/`Details`. This package's only entity type is `ObjectInfo`. There is no companion `Object` — so the name reads consistently with itself, but the suffix is purely a hat-tip to Go.

### 29. `List_Response.objects` — generic field for `ObjectInfo[]`

**Location:** `model.ts:171-174`

```ts
export interface List_Response {
  /** List of objects. */
  objects?: ObjectInfo[] | undefined;
}
```

`objects` is the most generic JavaScript noun; it tells the reader nothing. `items`, `entries`, `paths`, or `workspaceObjects` would convey scope. The Go SDK has the same `Objects` field; transferring the name without adaptation gives a TS user a `resp.objects` access that reads like "the objects of the response."

### 30. `mkdirs` — verb-tense / casing inconsistency

**Location:** `client.ts:254`

```ts
async mkdirs(req: Mkdirs, options?: CallOptions): Promise<Mkdirs_Response>
```

Other client methods read as verb-noun (`export`, `import`, `list`) or compound verb (`getStatus`). `mkdirs` is the only Unix-style contraction. The class also has a `delete` method (matches HTTP verb) but no `make` or `create` method. `createDirectory` would align with `delete` semantically.

### 31. First-person and ticket-driven prose in public JSDoc

**Location:** `model.ts:17-18`, `:19-24`

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

3. **`ExportFormat` is the import format.** The single enum services both `Import` and `Export` (good — DRY), but the name says only "Export." A neutral name (`NotebookFormat` or `WorkspaceObjectFormat`) would describe what it actually is.

4. **`AUTO` means two different things.** Inside `ExportFormat`, `AUTO` on `Import` means "detect from file extension + header," and `AUTO` on `Export` means "decide from object type." Same enum value, different server-side algorithm.

5. **Verb-as-type request names without `Request` suffix.** Six request interfaces (`Delete`, `Export`, `GetStatus`, `Import`, `List`, `Mkdirs`) ship without the `Request` suffix that the rest of the SDK uses. Combined with collisions against ES reserved-context words (`import`, `export`, `delete`), this makes the type names unusable without the package qualifier — which is exactly what TS users lose at import time.

6. **`content: Uint8Array` documented as base64 in both directions.** Two fields hold post-decode bytes but their JSDoc reads as if they still hold base64 strings. A defensive user reading the JSDoc and base64-encoding their bytes will double-encode on the way in. The mismatch is silent and the failure mode is data corruption.

7. **`mkdirs` and `getStatus` are Unix/POSIX verbs that don't appear elsewhere in the SDK.** The `files` package uses `createDirectory` and `getMetadata`. The `repos` package uses `getRepo`. Picking one verb per concept and applying it across packages would let users transfer knowledge.

8. **Sentinel `OBJECT_TYPE_UNSPECIFIED` documented as "only used by list-repo."** The enum exports a value that the package consumers should never set but cannot remove without breaking the read side. A separate response-only enum or a `null` for "unknown" would be cleaner.

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
| `src/v1/model.ts` | 311 | yes |
| `src/v1/client.ts` | 276 | yes |
| `src/v1/utils.ts` | 151 | yes |
| `src/v1/index.ts` | 21 | yes |
