# Naming Audit: files

**Path:** `packages/files/src/v2/`
**Versions audited:** v2
**Inferred domain:** File operations on Databricks storage. v2 is the generated 1:1 port of the upstream API surface and is the union of TWO distinct underlying services: (a) the legacy DBFS API (`/api/2.0/dbfs/...`) — `addBlock`, `close`, `create`, `delete`, `getStatus`, `list`, `mkdirs`, `move`, `put`, `read`; and (b) the modern Files API (`/api/2.0/fs/...`) — `createDirectory`, `deleteDirectory`, `deleteFile`, `downloadFile`, `getDirectoryMetadata`, `getFileMetadata`, `listDirectoryContents`, `uploadFile`. Both surfaces are presented through a single `Client` class with no naming distinction between the two services.

**Total weird names flagged:** 24

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 8 |
| Low | 6 |
| Observation | 2 |

## High severity

### 1. `DBFS` vs `Dbfs` casing — never appears in TS identifier, only in JSDoc — model & client

- **Why weird:** "DBFS" appears 11 times in JSDoc strings (e.g. "The path should be the absolute DBFS path.", `model.ts:33,64,161,214,225,233,235,243,255`) and once in client docstrings ("DBFS REST API"). But NONE of the TS type or method names carry the prefix. The class is just `Client`, the methods are `read`/`write`/`put`/`delete`/`move`/`mkdirs` — DBFS is invisible at the TS surface. Compare with `databricks-sdk-go` upstream where these are split into `dbfs.API` and `files.API` as separate services. The TS port merges them and removes the namespace.
- **Category:** 3 (acronym casing — should be `Dbfs` if it were ever used), 16 (field-contradicting-domain), 17 (inconsistency — JSDoc says DBFS, identifier doesn't).
- **Suggested name:** Carry the surface name in identifiers: `DbfsClient` for the legacy methods, or split into two packages / sub-modules: `@databricks/sdk-files/v2/dbfs` and `@databricks/sdk-files/v2/files`. If kept as one client, prefix the methods (`client.dbfsRead`, `client.dbfsMove`, ...).
- **Rationale:** Two REST APIs in one class with no naming signal mixes a deprecated surface (DBFS, max 1 MB per call, deprecated by Databricks) with the modern surface (Files API, 5 GiB streaming). Users can't tell which to use from the method list. Surface name in identifier resolves this.

### 2. Package name `files` and class name `Client` are both contextless — `client.ts:94`

```ts
export class Client { ... } // src/v2/client.ts:94
```

- **Why weird:** Exports `Client` without qualification. Consuming code that imports from multiple packages ends up with `import {Client as FilesClient} from '@databricks/sdk-files/v2';` in every file. The package name `files` is also generic — DBFS files? UC volume files? Workspace files (already a separate `@databricks/sdk-workspace`)? Workspace assets called "files"? The package scopes ALL of: DBFS API, Files API for UC volumes, generic file storage.
- **Category:** 1 (vague — "files" overloaded across at least DBFS, UC Volumes, Workspace files), 6 (misleading — name does not signal which file surface).
- **Suggested name:** Export `FilesClient` (or split — `DbfsClient` + `FilesClient`). The package itself could be `@databricks/sdk-dbfs-and-files` (ugly but honest) or split into two packages.
- **Rationale:** Already a problem in the wider SDK; `Client` is opaque in error messages and stack traces.

### 3. `DirectoryEntry` vs `FileInfo` — duplicate concept inside v2 — `src/v2/model.ts:73,114`

```ts
export interface DirectoryEntry {
  fileSize?: number | undefined;
  isDirectory?: boolean | undefined;
  lastModified?: number | undefined;
  name?: string | undefined;
  path?: string | undefined;
}

export interface FileInfo {
  path?: string | undefined;
  isDir?: boolean | undefined;
  fileSize?: number | undefined;
  modificationTime?: number | undefined;
}
```

- **Why weird:** Both types describe a file-or-directory metadata snapshot, with overlapping fields:
  - Both have `path`, `fileSize`.
  - `DirectoryEntry.isDirectory` vs `FileInfo.isDir` (same field, two casings — see #4).
  - `DirectoryEntry.lastModified` vs `FileInfo.modificationTime` (same wire concept, two names — see #5).
  - `DirectoryEntry.name` (component name) — exists only in `DirectoryEntry`.
  Two distinct types because they come from two distinct REST APIs (modern listDirectoryContents vs legacy listStatus / getStatus). The client exposes both, side-by-side, with no docstring telling callers which to use.
- **Category:** 12 (duplicate concepts), 17 (cross-API naming clash), 6 (misleading — `DirectoryEntry` may be a file).
- **Suggested name:** Pick one. `FileInfo` is the existing standard (also used in `experiments`, `marketplaces` packages — see #6). Re-shape `DirectoryEntry` to extend `FileInfo` with `name`.
- **Rationale:** Two identical-shape types with different field names are a maintenance hazard.

### 4. `isDir` vs `isDirectory` — same concept, two casings — `src/v2/model.ts:77,118,170`

```ts
DirectoryEntry.isDirectory?: boolean   // modern API
FileInfo.isDir?:           boolean   // legacy DBFS
GetStatusRequest_Response.isDir?: boolean   // legacy DBFS
```

- **Why weird:** Same yes/no flag, two abbreviations of "is directory". `isDir` is a cryptic 3-letter abbreviation; `isDirectory` is the full word. They appear in three sibling types in the same file.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent across same package).
- **Suggested name:** `isDirectory` everywhere (the modern form). Wire mapping is one line in the unmarshal schema.
- **Rationale:** Public TS field names should not abbreviate "directory" to "dir" when the rest of the SDK spells it out.

### 5. `lastModified` (number-ms-epoch) vs `lastModified` (HTTP-date string) vs `modificationTime` — `src/v2/model.ts:79,110,122,157,174`

```ts
DirectoryEntry.lastModified?:        number     // ms since epoch
DownloadFileResponse.lastModified?:  string     // HTTP-date (RFC 7231)
FileInfo.modificationTime?:          number     // ms since epoch
GetFileMetadataResponse.lastModified?: string   // HTTP-date
GetStatusRequest_Response.modificationTime?: number    // ms since epoch
```

- **Why weird:** Three problems in one cluster. (a) Same FIELD NAME (`lastModified`) holds two completely different value domains — milliseconds-since-epoch as `number` (in `DirectoryEntry`) AND HTTP-date `'Wed, 21 Oct 2015 07:28:00 GMT'` as `string` (in `DownloadFileResponse`, `GetFileMetadataResponse`). (b) Same WIRE CONCEPT (ms since epoch) has two field names — `lastModified` in modern, `modificationTime` in legacy. (c) Time-suffix convention is inconsistent: `lastModified` (past participle), `modificationTime` (noun + `Time` suffix).
- **Category:** 9 (singular/plural / cross-shape mismatch), 15 (generic name loses meaning), 16 (field contradicts type domain — same name, two value types), 17 (inconsistent naming).
- **Suggested name:** Use distinct names for distinct domains. For ms-since-epoch: `lastModifiedMs` or `lastModifiedAt: number` (ms-since-epoch convention). For HTTP-date strings: `lastModifiedHttpDate: string` or model as a typed brand. Pick ONE — `modificationTime` should be dropped.
- **Rationale:** A consumer doing `if (resp.lastModified > someTimestamp)` will silently break depending on which API they came from.

### 6. `FileInfo` collides with at least two other packages — `src/v2/model.ts:114`

```ts
// files/v2: file/directory metadata snapshot
export interface FileInfo {
  path?: string | undefined;
  isDir?: boolean | undefined;
  fileSize?: number | undefined;
  modificationTime?: number | undefined;
}
// experiments/v1/model.ts:248 — MLflow file artifact
export interface FileInfo { ... }
// marketplaces/v1/model.ts:288 — listing file attachment
export interface FileInfo { ... }
```

- **Why weird:** Three different packages all export `FileInfo` with three different shapes. The names are flat-spaced inside the package, but downstream consumers who do `import * as files from '@databricks/sdk-files/v2'; import * as exp from '@databricks/sdk-experiments/v1';` get two unrelated `FileInfo` types and `files.FileInfo !== exp.FileInfo` is a confusing source of bugs.
- **Category:** 1 (vague/generic top-level name), 12 (duplicate concept across packages), 15 (generic name loses meaning).
- **Suggested name:** `DbfsFileInfo` (or merge with `DirectoryEntry` per #3 — `FileEntry`).
- **Rationale:** `FileInfo` is so generic three different domains felt entitled to use it.

### 7. `CreateRequest` returns a `handle` (not the created file) — `src/v2/model.ts:32-43`

```ts
export interface CreateRequest {
  path?: string | undefined;
  overwrite?: boolean | undefined;
}
// Response shape:
//   handle?: number | undefined;
//   "Handle which should subsequently be passed into the AddBlock and Close calls when writing to a file through a stream."
```

- **Why weird:** The method is called `create` but does NOT create a file — it opens a write stream and returns a handle. The actual file doesn't exist until you call `close`. A reader of `client.create({path: '/tmp/foo'})` would reasonably expect the file to be created. JSDoc on the method says "Opens a stream to write to a file and returns a handle to this stream." — directly contradicting the name.
- **Category:** 6 (misleading — name says "create" but action is "open").
- **Suggested name:** `OpenWriteStreamRequest` / `DbfsOpenWriteRequest` (response: `DbfsWriteHandle`).
- **Rationale:** Method name should reflect action; right now `create` and `createDirectory` look like sibling actions when they are entirely different (create-handle vs create-resource).

### 8. `listDirectoryContents` vs `list` — same action, two methods — `src/v2/client.ts:301,677`

```ts
async list(req: ListStatusRequest, ...): Promise<ListStatusRequest_Response>            // legacy DBFS
async listDirectoryContents(req: ListDirectoryContentsRequest, ...): Promise<ListDirectoryResponse>  // modern Files
```

- **Why weird:** Two list methods on the same client. `list` is the legacy DBFS list (no paging), `listDirectoryContents` is the modern Files API (paginated). The names give no signal which is which; the JSDoc on `list` calls out a 60 s timeout and a 10 K file limit. A naive caller will pick the shorter name and hit production limits.
- **Category:** 1 (vague — `list` is generic), 12 (duplicate concept), 17 (inconsistent — `list` is short, `listDirectoryContents` is long; both list a directory).
- **Suggested name:** `dbfsListStatus` (legacy) and `listDirectoryContents` (modern). Or `list` (modern, paged, recommended) and `dbfsList` (legacy, deprecated).
- **Rationale:** Method-name length should not be the only discriminator between a recommended modern API and a deprecated legacy one.

## Medium severity

### 9. `ListDirectoryContentsRequest` paired with `ListDirectoryResponse` — request/response noun mismatch — `src/v2/model.ts:178,206`

```ts
export interface ListDirectoryContentsRequest { ... }
export interface ListDirectoryResponse { ... }   // not ListDirectoryContentsResponse
```

- **Why weird:** The request has 4 words (`List Directory Contents Request`); the response has 3 (`List Directory Response`). Same wire endpoint. The asymmetry forces every caller to remember which name has the `Contents` word and which doesn't. Other request/response pairs in this file are matched (`CreateDirectoryRequest` / `CreateDirectoryResponse`; `DownloadFileRequest` / `DownloadFileResponse`).
- **Category:** 7 (overly verbose), 9 (singular/plural mismatch — also: "contents" pluralised on request, dropped on response), 17 (inconsistent with the rest of the file).
- **Suggested name:** `ListDirectoryContentsResponse` to mirror the request. Or trim both to `ListDirectoryRequest` / `ListDirectoryResponse`.
- **Rationale:** Same endpoint, same operation — names should mirror.

### 10. `executeCall` / `executeHttpCall` / `sendAndCheckError` / `buildHttpRequest` — `src/v2/utils.ts:26,65,168,96`

```ts
export async function executeCall(call: Call, options?: CallOptions): Promise<void>
export async function executeHttpCall(opts: HttpCallOptions): Promise<Uint8Array>
export async function sendAndCheckError(opts: HttpCallOptions): Promise<HttpResponse>
export function buildHttpRequest(method, url, headers, signal?, body?): HttpRequest
```

- **Why weird:** Four nearly-identical-sounding helpers in one file. `executeCall` wraps a `Call` (whatever a `Call` is — it's an opaque `(signal?) => Promise<void>` function reference). `executeHttpCall` takes the actual HTTP request. `sendAndCheckError` is what `executeHttpCall` is but with a different return type (raw `HttpResponse` vs buffered `Uint8Array`). All four start with a verb but use different verbs (`execute`, `send`, `build`) for what amounts to "send this HTTP request and return something". The lowercase `'head'` HTTP method in two callers (`client.ts:621,658`) is an unrelated bug.
- **Category:** 17 (inconsistent verb cluster — execute/send/build), 6 (misleading — `executeCall` and `executeHttpCall` are different despite the matching prefix), 12 (duplicate concept — `executeHttpCall` and `sendAndCheckError` do almost the same thing).
- **Suggested name:** Collapse to one helper (`sendRequest`), let it return the raw `HttpResponse`, and have the caller buffer/stream as needed. Or, if both must exist: `sendAndBuffer` (returns buffered body) and `sendAndStream` (returns raw response).
- **Rationale:** Three functions doing nearly the same thing with names that differ in verb is a recipe for mis-imports.

### 11. `path` as the only field in 5 request types — `src/v2/model.ts:32,63,160,213,224`

```ts
CreateRequest:     { path?: string; overwrite?: boolean }
DeleteRequest:     { path?: string; recursive?: boolean }
GetStatusRequest:  { path?: string }
ListStatusRequest: { path?: string }
MkDirsRequest:     { path?: string }
```

- **Why weird:** Five sibling types whose distinguishing identity is the type name (`CreateRequest`, `DeleteRequest`, etc.), not the field. The common field is just `path: string`. In TS, all five types are structurally compatible — `GetStatusRequest` is assignable to `ListStatusRequest` and vice versa; both are assignable to `MkDirsRequest`. A caller can confidently pass `getStatus(req)` and a typo-narrowed `req: ListStatusRequest` and TS won't complain (structural typing).
- **Category:** 1 (vague — `path` for everything), 6 (misleading — structural compat collapses semantic distinctions), 17 (inconsistent — sometimes called `path`, sometimes `filePath`, sometimes `directoryPath`).
- **Suggested name:** Use the discriminated field names from the modern API: `dbfsPath` everywhere on the legacy types; or split into `CreateRequest.filePath` (because `Create` is a write-stream open, ie file) and `MkDirsRequest.directoryPath`. Helps callers see "this is a path to a file" vs "this is a path to a directory."
- **Rationale:** Structural typing makes the five types interchangeable — a name change is the cheapest defence.

### 12. `MoveRequest.sourcePath` / `MoveRequest.destinationPath` use snake_case on the wire — `src/v2/model.ts:484-492`

```ts
export const marshalMoveRequestSchema: z.ZodType = z
  .object({
    sourcePath: z.string().optional(),
    destinationPath: z.string().optional(),
  })
  .transform(d => ({
    source_path: d.sourcePath,
    destination_path: d.destinationPath,
  }));
```

- **Why weird:** The wire keys are `source_path` / `destination_path` — but ALL other DBFS methods use a single `path` field. This is an entirely separate field-naming convention used in one method. Compare: `DeleteRequest.path` (not `target_path`), `GetStatusRequest.path` (not `target_path`), but `MoveRequest.sourcePath` / `MoveRequest.destinationPath`.
- **Category:** 17 (inconsistent — single endpoint convention).
- **Suggested name:** Acceptable as-is (these are clearer than `path1`/`path2`). Flag only the inconsistency with the rest of the DBFS surface.
- **Rationale:** The inconsistency is upstream; the TS port should match.

### 13. `contents` field has three different types across model — `src/v2/model.ts:108,246,281,274`

```ts
DownloadFileResponse.contents?: ReadableStream | undefined            // line 108
PutRequest.contents?:           Uint8Array | undefined                // line 246
// ReadRequest_Response.data?:  Uint8Array | undefined  (named 'data')// line 274 — same concept, different name
UploadFileRequest.contents?:    ReadableStream | undefined            // line 281
ListDirectoryResponse.contents?: DirectoryEntry[] | undefined         // line 208
```

- **Why weird:** "Contents" is overloaded across the model:
  - `DownloadFileResponse.contents`: file bytes as a stream.
  - `UploadFileRequest.contents`: file bytes as a stream.
  - `PutRequest.contents`: file bytes as a `Uint8Array` (no streaming on the legacy API).
  - `ReadRequest_Response.data`: file bytes (chunked read) as a `Uint8Array` — same concept as `PutRequest.contents` but called `data`.
  - `ListDirectoryResponse.contents`: directory entries (array of `DirectoryEntry`).
- **Category:** 6 (misleading), 12 (duplicate concept — `contents` and `data`), 15 (generic name loses meaning — what's in "contents"?), 17 (inconsistent — same concept, three names).
- **Suggested name:** `body: ReadableStream<Uint8Array>` for stream payload, `bodyBytes: Uint8Array` for buffered, `entries: DirectoryEntry[]` for list responses (matching the `next_page_token` pattern of "entries + next token"). Rename the read response `data` field to `bytes` to make the buffer obvious.
- **Rationale:** The `contents` of a directory and the `contents` of a file are different domains. Type system will not catch a programmer who reads `.contents.length` expecting bytes and gets `DirectoryEntry[].length`.

### 14. `bytesRead` vs `data` in the read response — singular/plural and naming mismatch — `src/v2/model.ts:267-274`

```ts
// ReadRequest_Response:
//   bytesRead?: number       // count
//   data?:      Uint8Array   // bytes
```

`bytesRead` (count) and `data` (the bytes) refer to the same byte slice. `bytesRead` is the LENGTH; `data` is the BUFFER. Cleaner: `bytes: Uint8Array` and `bytesRead: number` (count); even better, drop `bytesRead` since `data.byteLength` is the same value.

### 15. `ifUnmodifiedSince` — verb-as-noun field — `src/v2/model.ts:101,149`

```ts
ifUnmodifiedSince?: string | undefined;
```

Mirrors the HTTP header name exactly. Faithful to RFC 9110, but as a TS field name `ifUnmodifiedSince` is a conditional, not a value. `unmodifiedSinceHeader: string` or `notModifiedSince: string` is more idiomatic. Acceptable as-is (HTTP convention), flagged only as observation.

### 16. `range` (HTTP byte range header value) — same — `src/v2/model.ts:95,143`

```ts
range?: string | undefined;
```

Field name `range` is overloaded (range of numbers? date range?). The doc clarifies "range of bytes to retrieve" — name could be `byteRange` or `rangeHeader`.

## Low severity

### 17. `directoryPath` vs `path` — inconsistent across methods — `src/v2/model.ts:26,48,128,180`

The modern Files API consistently uses `directoryPath` / `filePath`. The legacy DBFS uses just `path` even when the value is known to be a directory (`MkDirsRequest.path`) or file (`CreateRequest.path`). Choose: prefix every path with the kind, OR drop the prefix everywhere.

### 18. `recursive` (DeleteRequest) — field name does not tell you what it does — `src/v2/model.ts:67`

```ts
recursive?: boolean | undefined;
```

A `recursive: true` on a `DeleteRequest` could mean "follow symlinks", "descend into subdirs", etc. JSDoc clarifies "Whether or not to recursively delete the directory's contents." Name OK in context; would prefer `recursivelyDeleteContents: boolean` for self-documentation, but `recursive` is conventional.

### 19. `overwrite` — same — `src/v2/model.ts:36,248,283`

```ts
overwrite?: boolean | undefined;
```

Appears in `CreateRequest`, `PutRequest`, `UploadFileRequest` with subtly different defaults. `UploadFileRequest`'s docstring says "If true or unspecified, an existing file will be overwritten" (default-true), while `CreateRequest` says "specifies whether to overwrite existing file/files" (default not specified, but in fact false on the wire). Same field name, opposite defaults — a footgun.

### 20. `nextPageToken` is camelCase but `next_page_token` appears in JSDoc — `src/v2/model.ts:208,210,183,194,200`

```ts
contents?: DirectoryEntry[] | undefined;
nextPageToken?: string | undefined;  // OK
// JSDoc: "the `next_page_token` in the response..." (line 194)
```

JSDoc strings reference the wire name (`next_page_token`), but the TS field is `nextPageToken`. The doc accurately reflects the wire — flagged because cross-referencing a wire name in user-facing JSDoc is confusing. Should reference the TS field name (`nextPageToken`).

### 21. `flattenQueryParams` — unused in this file — `src/v2/utils.ts:123`

Exported helper. Search shows it's never called by `client.ts` here. Name is generic and could collide with workspace-flattening utilities. Either dead code or genuine helper waiting for use.

### 22. `PACKAGE_SEGMENT` — SCREAMING_SNAKE constant — `src/v2/client.ts:89`

```ts
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};
```

SCREAMING_SNAKE is only conventional for true compile-time primitives in TS. This is a plain object; `packageSegment` is fine.

## Observations

### 23. `pageSize: number` — should mention coercion — `src/v2/model.ts:192`

JSDoc says "The maximum value is 1000. Values above 1000 will be coerced to 1000." Type does not encode the constraint. (TS branded types could; not a naming issue.)

### 24. `pageToken` — opaque token, marked `string | undefined` — `src/v2/model.ts:203`

Best practice is to brand the type (`PageToken = string & {readonly __brand: unique symbol}`) to prevent passing an arbitrary string. Not a naming issue per se.

## Fixed

- #1 `Read` (originally cited at `src/v2/model.ts:254`): Fixed in regeneration on 2026-05-20 — renamed to `ReadRequest`; verb-as-noun and reserved-word collision concerns resolved by the `Request` suffix.
- #2 Verb-as-noun cluster `Move`, `Put`, `Delete`, `Close`, `Create`, `MkDirs`, `AddBlock`, `GetStatus`, `ListStatus` (originally cited at `src/v2/model.ts:15-264`): Fixed in regeneration on 2026-05-20 — all renamed to `MoveRequest`, `PutRequest`, `DeleteRequest`, `CloseRequest`, `CreateRequest`, `MkDirsRequest`, `AddBlockRequest`, `GetStatusRequest`, `ListStatusRequest`; the `Request` suffix removes the verb-as-noun ambiguity and the `Delete` keyword collision.
- #17 v1 `Client` constructor allows `host` to be undefined (originally cited at `src/v1/client.ts:21`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
- #18 v1 `UploadRequest.contents` is `ReadableStream<Uint8Array>` but v2 `UploadFileRequest.contents` is bare `ReadableStream` (originally cited at `src/v1/model.ts:11`, `src/v2/model.ts:281`): Fixed in regeneration on 2026-05-20 — v1 package deleted; v2 standalone with single typing.
- #28 v2 `index.ts` exports `FileInfo` but `v1/index.ts` does NOT export dangling types (originally cited at `src/v1/index.ts:3`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
- #30 `readAll` is duplicated across v1 and v2 (originally cited at `src/v1/utils.ts:23` and `src/v2/utils.ts:40`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
- #32 `HttpCallOptions` duplicated across files (originally cited at `src/v1/utils.ts:13`, `src/v2/utils.ts:15`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
- #33 v1 `encodeFilePath` vs v2 `encodeMultiSegmentPath` (originally cited at `src/v1/utils.ts:36`, `src/v2/utils.ts:156`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
- #34 `Move.sourcePath` / `Move.destinationPath` could be `source` / `destination` (originally cited at `src/v2/model.ts:233-236`): Fixed in regeneration on 2026-05-20 — duplicate of #12; pruned.
- #37 v1 `Client.upload` returns `Promise<void>` but JSDoc says "does not retry" (originally cited at `src/v1/client.ts:33-36`): Fixed in regeneration on 2026-05-20 — v1 package deleted.
</content>
</invoke>