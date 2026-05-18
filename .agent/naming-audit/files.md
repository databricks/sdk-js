# Naming Audit: files

**Path:** `packages/files/src/v1/`, `packages/files/src/v2/`
**Versions audited:** v1 AND v2
**Inferred domain:** File operations on Databricks storage. `v1` is a small hand-written wrapper exposing only `upload` against the modern Files API (`/api/2.0/fs/files/...`). `v2` is the generated 1:1 port of the upstream API surface and is the union of TWO distinct underlying services: (a) the legacy DBFS API (`/api/2.0/dbfs/...`) — `addBlock`, `close`, `create`, `delete`, `getStatus`, `list`, `mkdirs`, `move`, `put`, `read`; and (b) the modern Files API (`/api/2.0/fs/...`) — `createDirectory`, `deleteDirectory`, `deleteFile`, `downloadFile`, `getDirectoryMetadata`, `getFileMetadata`, `listDirectoryContents`, `uploadFile`. Both surfaces are presented through a single `Client` class with no naming distinction between the two services.

**Total weird names flagged:** 49

## Summary
| Severity | Count |
| --- | --- |
| High | 17 |
| Medium | 17 |
| Low | 9 |
| Observation | 6 |

## v1 vs v2 comparison

### Major renames / shape differences

| v1 name | v2 name | Notes |
|---------|---------|-------|
| `UploadRequest` | `UploadFileRequest` | **Improvement** — the `File` qualifier is needed in v2 because the same client now exposes directory operations too. In v1 the package was implicitly "files-only", so the unqualified `UploadRequest` worked. Same field shape (`filePath`, `contents`, `overwrite`). |
| `DownloadRequest` | `DownloadFileRequest` | Mirror of upload — adds `range` and `ifUnmodifiedSince` (good — extends; cf. v1 has neither). |
| `DownloadResponse` | `DownloadFileResponse` | v1 has 4 fields (`contents`, `contentLength`, `contentType`, `lastModified`). v2 has the same 4. Both are uniform here. |
| `UploadRequest.filePath` (required) | `UploadFileRequest.filePath` (optional `?`) | **Regression** — v1 typed `filePath: string` as required; v2 generated all fields optional because the upstream proto schema marks them optional. The generated client falls back to `req.filePath ?? ''` (`client.ts:716`) which silently encodes an empty path. v1 is stricter and clearer. |
| `UploadRequest.contents: ReadableStream<Uint8Array>` | `UploadFileRequest.contents?: ReadableStream` | **Regression** — v1 typed the stream element as `Uint8Array`; v2 dropped the generic and admits `ReadableStream<any>`. v2 also makes `contents` optional, which makes no sense semantically (no contents == nothing to upload). |
| `UploadRequest.overwrite?: boolean` | `UploadFileRequest.overwrite?: boolean` | Same name, same shape. Good. |
| `DownloadResponse.contents: ReadableStream<Uint8Array>` (required) | `DownloadFileResponse.contents?: ReadableStream` (optional, untyped) | Same regression — v1 stronger types. |
| `DownloadResponse.contentLength?: number` | `DownloadFileResponse.contentLength?: number` | Same. |
| _(v1 has no download method, despite `DownloadRequest`/`DownloadResponse` being exported)_ | `Client.downloadFile(req: DownloadFileRequest)` | **v1 dangling types** — `DownloadRequest` and `DownloadResponse` are exported from `v1/index.ts` but never referenced by `v1/client.ts`. They are dead/orphaned types in v1. |

### New in v2 (no v1 counterpart)

- Methods (legacy DBFS): `addBlock`, `close`, `create`, `delete`, `getStatus`, `list`, `mkdirs`, `move`, `put`, `read`.
- Methods (modern Files): `createDirectory`, `deleteDirectory`, `deleteFile`, `downloadFile`, `getDirectoryMetadata`, `getFileMetadata`, `listDirectoryContents`, `listDirectoryContentsIter`.
- Types (legacy DBFS): `AddBlock`, `AddBlock_Response`, `Close`, `Close_Response`, `Create`, `Create_Response`, `Delete`, `Delete_Response`, `FileInfo`, `GetStatus`, `GetStatus_Response`, `ListStatus`, `ListStatus_Response`, `MkDirs`, `MkDirs_Response`, `Move`, `Move_Response`, `Put`, `Put_Response`, `Read`, `Read_Response`.
- Types (modern Files): `CreateDirectoryRequest`/`Response`, `DeleteDirectoryRequest`/`Response`, `DeleteFileRequest`/`Response`, `DirectoryEntry`, `DownloadFileRequest`/`Response`, `GetDirectoryMetadataRequest`/`Response`, `GetFileMetadataRequest`/`Response`, `ListDirectoryContentsRequest`, `ListDirectoryResponse` (note plural/singular asymmetry), `UploadFileRequest`/`Response`.

### Dropped in v2

- v1 utility `encodeFilePath` is renamed to v2 `encodeMultiSegmentPath` (good — name no longer ties the encoder to "files"; works for `/directories/...` and `/files/...` paths alike).
- v1 helper `sendAndCheckError` is kept in v2 BUT v2 also adds `executeHttpCall`, `executeCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`. Both helpers coexist in v2 (`sendAndCheckError` is now only used by `downloadFile` to keep the body stream un-consumed).

### Net assessment

v2 mostly improves names by qualifying with `File`/`Directory`, but it also: (a) keeps every legacy DBFS message verbatim — `Read`, `Move`, `Put`, `Delete`, `Close`, `Create`, `MkDirs`, `AddBlock` — as verb-shaped type names colliding with TS/HTTP/JS conventions; (b) blends two separate REST APIs (`/dbfs` and `/fs`) into a single `Client` class with no namespace distinction; (c) weakens v1's `Uint8Array` stream typing to bare `ReadableStream`; (d) re-exports `FileInfo` which already exists in `experiments` and `marketplaces` packages. v1 is small and tighter; v2 is broader and noisier.

## High severity

### 1. `Read` — reserved-word collision and misleading shape — `src/v2/model.ts:254`

```ts
export interface Read {
  /** The path of the file to read. The path should be the absolute DBFS path. */
  path?: string | undefined;
  offset?: number | undefined;
  length?: number | undefined;
}
```

- **Why weird:** `Read` is the legacy DBFS read **request** but the type name reads as either the action verb ("perform a read") or the past tense ("was read"). It collides with the built-in TS `Readonly<>`, `ReadableStream`, `Reader`, etc. In application code, `import {Read} from '@databricks/sdk-files/v2'` is almost guaranteed to be mistaken for a stream type. Also shadows the verb so `read(req: Read)` is `read(read: Read)` — every word in the signature is `read`.
- **Category:** 10 (reserved-word/conflict), 6 (misleading), 14 (Go/proto-style — Go has the proto message named `Read`, but in Go the package-qualified `dbfs.Read` reads OK; in TS it does not).
- **Suggested name:** `DbfsReadRequest`.
- **Rationale:** Match the modern `DownloadFileRequest` pattern, and explicitly tag it as the legacy DBFS request to distinguish from the modern Files API. The same critique applies to all the other verb-named DBFS messages — see #2.

### 2. Verb-as-noun cluster: `Move`, `Put`, `Delete`, `Close`, `Create`, `MkDirs`, `AddBlock`, `GetStatus`, `ListStatus` — `src/v2/model.ts:15-264`

```ts
export interface Move { sourcePath?: ...; destinationPath?: ...; }
export interface Put { path?: ...; contents?: ...; overwrite?: ...; }
export interface Delete { path?: ...; recursive?: ...; }
export interface Close { handle?: ...; }
export interface Create { path?: ...; overwrite?: ...; }
export interface MkDirs { path?: ...; }
export interface AddBlock { handle?: ...; data?: ...; }
export interface GetStatus { path?: ...; }
export interface ListStatus { path?: ...; }
```

- **Why weird:** Nine TS interfaces named after verbs (or verb phrases). Every one is the **request** type for the same-named method. Side-by-side with the modern `CreateDirectoryRequest`, `DeleteFileRequest`, `UploadFileRequest`, `DownloadFileRequest`, the legacy types stick out as deeply un-TypeScript-y.
- `Delete` collides directly with the JS `delete` keyword (sub-case) and with `workspace`'s `Delete` interface (`packages/workspace/src/v1/model.ts:65`).
- `Create` collides with React's `Create*` patterns and any other domain's `Create`.
- `Close` reads as a verb / event-listener method (`element.addEventListener('close', ...)`) and as `Promise<Close>` reads "Promise to close" rather than "Promise of a Close payload".
- `MkDirs` is a cryptic abbreviation of "make directories" in `PascalCase` instead of the (also bad) `Mkdirs` or the modern `CreateDirectory`. Also: it creates only ONE directory (recursively, like `mkdir -p`), not directories plural.
- `GetStatus` and `ListStatus`: both have a body of just `path?: string` and are conceptually just "stat" / "ls". They differ only in whether a path is a directory or file at runtime (the server figures it out). Their existence is duplicative with the modern `GetFileMetadataRequest`, `GetDirectoryMetadataRequest`, `ListDirectoryContentsRequest`, but no docstring tells callers which to use.
- **Category:** 1 (vague/generic), 6 (misleading shape), 10 (reserved-word collision — `Delete`), 12 (duplicate concept with modern names), 14 (Go/proto-style names), 17 (inconsistent verb cluster — Delete/Move/Put are CRUD; AddBlock/Close are stream lifecycle; GetStatus/ListStatus are queries; all in one undifferentiated namespace).
- **Suggested names:** `DbfsMoveRequest`, `DbfsPutRequest`, `DbfsDeleteRequest`, `DbfsCloseRequest`, `DbfsCreateRequest`, `DbfsMkdirsRequest` (or `DbfsMakeDirectoriesRequest`), `DbfsAddBlockRequest`, `DbfsGetStatusRequest`, `DbfsListStatusRequest`.
- **Rationale:** Carries the surface ("DBFS"), follows the modern `<Action><Resource>Request` shape, no reserved-word collisions, no verb-as-noun ambiguity. Bonus: makes #5 (mixed-surface in single client) much more honest.

### 3. `_Response`-suffixed types use literal underscore in identifier — `src/v2/model.ts:13,21,31,53,166,219,230,240,252,267`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AddBlock_Response {}
export interface Close_Response {}
export interface Create_Response { handle?: number | undefined; }
export interface Delete_Response {}
export interface GetStatus_Response { ... }
export interface ListStatus_Response { ... }
export interface MkDirs_Response {}
export interface Move_Response {}
export interface Put_Response {}
export interface Read_Response { ... }
```

- **Why weird:** Underscore in TS identifier. The generator wraps every proto outer-message `Response` nested type as `<Outer>_Response`. Ten different `_Response` types in this one file — each requires `eslint-disable @typescript-eslint/naming-convention`. Compare to the modern-API peers (`CreateDirectoryResponse`, `DownloadFileResponse`) which use camelCase / PascalCase only. Two conventions, one file.
- **Category:** 4 (underscore in TS identifier), 17 (legacy DBFS uses `Foo_Response`; modern Files uses `FooResponse` — internally inconsistent).
- **Suggested name:** Use `<Outer>Response` (no underscore): `AddBlockResponse`, `CloseResponse`, `CreateResponse`, etc. Or — better — combine with #1/#2: `DbfsAddBlockResponse`, `DbfsCloseResponse`, ...
- **Rationale:** TypeScript identifiers in `PascalCase` should not contain underscores. Every eslint-disable on a generated symbol is friction. The dual convention (`Foo_Response` vs `FooResponse`) inside the same file confirms the existing v2 cleanup is partial.

### 4. `DBFS` vs `Dbfs` casing — never appears in TS identifier, only in JSDoc — model & client

- **Why weird:** "DBFS" appears 11 times in JSDoc strings (e.g. "The path should be the absolute DBFS path.", `model.ts:24,46,161,214,225,233,235,243,255`) and once in client docstrings ("DBFS REST API"). But NONE of the TS type or method names carry the prefix. The class is just `Client`, the methods are `read`/`write`/`put`/`delete`/`move`/`mkdirs` — DBFS is invisible at the TS surface. Compare with `databricks-sdk-go` upstream where these are split into `dbfs.API` and `files.API` as separate services. The TS port merges them and removes the namespace.
- **Category:** 3 (acronym casing — should be `Dbfs` if it were ever used), 16 (field-contradicting-domain), 17 (inconsistency — JSDoc says DBFS, identifier doesn't).
- **Suggested name:** Carry the surface name in identifiers: `DbfsClient` for the legacy methods, or split into two packages / sub-modules: `@databricks/sdk-files/v2/dbfs` and `@databricks/sdk-files/v2/files`. If kept as one client, prefix the methods (`client.dbfsRead`, `client.dbfsMove`, ...).
- **Rationale:** Two REST APIs in one class with no naming signal mixes a deprecated surface (DBFS, max 1 MB per call, deprecated by Databricks) with the modern surface (Files API, 5 GiB streaming). Users can't tell which to use from the method list. Surface name in identifier resolves this.

### 5. Package name `files` and class name `Client` are both contextless — `package.json:2`, `client.ts:15,94`

```ts
// v1
export class Client { ... } // src/v1/client.ts:15
// v2
export class Client { ... } // src/v2/client.ts:94
```

- **Why weird:** Both versions export `Client` without qualification. Consuming code that imports from multiple packages ends up with `import {Client as FilesClient} from '@databricks/sdk-files/v2';` in every file. The package name `files` is also generic — DBFS files? UC volume files? Workspace files (already a separate `@databricks/sdk-workspace`)? Workspace assets called "files"? The package scopes ALL of: DBFS API, Files API for UC volumes, generic file storage.
- **Category:** 1 (vague — "files" overloaded across at least DBFS, UC Volumes, Workspace files), 6 (misleading — name does not signal which file surface).
- **Suggested name:** Export `FilesClient` (or split — `DbfsClient` + `FilesClient`). The package itself could be `@databricks/sdk-dbfs-and-files` (ugly but honest) or split into two packages.
- **Rationale:** Already a problem in the wider SDK; `Client` is opaque in error messages and stack traces.

### 6. `DirectoryEntry` vs `FileInfo` — duplicate concept inside v2 — `src/v2/model.ts:73,114`

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
  - `DirectoryEntry.isDirectory` vs `FileInfo.isDir` (same field, two casings — see #7).
  - `DirectoryEntry.lastModified` vs `FileInfo.modificationTime` (same wire concept, two names — see #8).
  - `DirectoryEntry.name` (component name) — exists only in `DirectoryEntry`.
  Two distinct types because they come from two distinct REST APIs (modern listDirectoryContents vs legacy listStatus / getStatus). The client exposes both, side-by-side, with no docstring telling callers which to use.
- **Category:** 12 (duplicate concepts), 17 (cross-API naming clash), 6 (misleading — `DirectoryEntry` may be a file).
- **Suggested name:** Pick one. `FileInfo` is the existing standard (also used in `experiments`, `marketplaces` packages — see #10). Re-shape `DirectoryEntry` to extend `FileInfo` with `name`.
- **Rationale:** Two identical-shape types with different field names are a maintenance hazard.

### 7. `isDir` vs `isDirectory` — same concept, two casings — `src/v2/model.ts:77,118,170`

```ts
DirectoryEntry.isDirectory?: boolean   // modern API
FileInfo.isDir?:           boolean   // legacy DBFS
GetStatus_Response.isDir?: boolean   // legacy DBFS
```

- **Why weird:** Same yes/no flag, two abbreviations of "is directory". `isDir` is a cryptic 3-letter abbreviation; `isDirectory` is the full word. They appear in three sibling types in the same file.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent across same package).
- **Suggested name:** `isDirectory` everywhere (the modern form). Wire mapping is one line in the unmarshal schema.
- **Rationale:** Public TS field names should not abbreviate "directory" to "dir" when the rest of the SDK spells it out.

### 8. `lastModified` (number-ms-epoch) vs `lastModified` (HTTP-date string) vs `modificationTime` — `src/v2/model.ts:79,110,122,157,174`

```ts
DirectoryEntry.lastModified?:        number     // ms since epoch
DownloadFileResponse.lastModified?:  string     // HTTP-date (RFC 7231)
FileInfo.modificationTime?:          number     // ms since epoch
GetFileMetadataResponse.lastModified?: string   // HTTP-date
GetStatus_Response.modificationTime?: number    // ms since epoch
```

- **Why weird:** Three problems in one cluster. (a) Same FIELD NAME (`lastModified`) holds two completely different value domains — milliseconds-since-epoch as `number` (in `DirectoryEntry`) AND HTTP-date `'Wed, 21 Oct 2015 07:28:00 GMT'` as `string` (in `DownloadFileResponse`, `GetFileMetadataResponse`). (b) Same WIRE CONCEPT (ms since epoch) has two field names — `lastModified` in modern, `modificationTime` in legacy. (c) Time-suffix convention is inconsistent: `lastModified` (past participle), `modificationTime` (noun + `Time` suffix).
- **Category:** 9 (singular/plural / cross-shape mismatch), 15 (generic name loses meaning), 16 (field contradicts type domain — same name, two value types), 17 (inconsistent naming).
- **Suggested name:** Use distinct names for distinct domains. For ms-since-epoch: `lastModifiedMs` or `lastModifiedAt: number` (ms-since-epoch convention). For HTTP-date strings: `lastModifiedHttpDate: string` or model as a typed brand. Pick ONE — `modificationTime` should be dropped.
- **Rationale:** A consumer doing `if (resp.lastModified > someTimestamp)` will silently break depending on which API they came from.

### 9. `contents` field has three different types across model — `src/v2/model.ts:108,246,281,275`

```ts
DownloadFileResponse.contents?: ReadableStream | undefined            // line 108
Put.contents?:                  Uint8Array | undefined                // line 246
Read_Response.data?:            Uint8Array | undefined  (named 'data')// line 275 — same concept, different name
UploadFileRequest.contents?:    ReadableStream | undefined            // line 281
ListDirectoryResponse.contents?: DirectoryEntry[] | undefined         // line 208
```

- **Why weird:** "Contents" is overloaded across the model:
  - `DownloadFileResponse.contents`: file bytes as a stream.
  - `UploadFileRequest.contents`: file bytes as a stream.
  - `Put.contents`: file bytes as a `Uint8Array` (no streaming on the legacy API).
  - `Read_Response.data`: file bytes (chunked read) as a `Uint8Array` — same concept as `Put.contents` but called `data`.
  - `ListDirectoryResponse.contents`: directory entries (array of `DirectoryEntry`).
- **Category:** 6 (misleading), 12 (duplicate concept — `contents` and `data`), 15 (generic name loses meaning — what's in "contents"?), 17 (inconsistent — same concept, three names).
- **Suggested name:** `body: ReadableStream<Uint8Array>` for stream payload, `bodyBytes: Uint8Array` for buffered, `entries: DirectoryEntry[]` for list responses (matching the `next_page_token` pattern of "entries + next token"). Rename `Read_Response.data` to `Read_Response.bytes` to make the buffer obvious.
- **Rationale:** The `contents` of a directory and the `contents` of a file are different domains. Type system will not catch a programmer who reads `.contents.length` expecting bytes and gets `DirectoryEntry[].length`.

### 10. `FileInfo` collides with at least two other packages — `src/v2/model.ts:114`

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
- **Suggested name:** `DbfsFileInfo` (or merge with `DirectoryEntry` per #6 — `FileEntry`).
- **Rationale:** `FileInfo` is so generic three different domains felt entitled to use it.

### 11. `Create` returns a `handle` (not the created file) — `src/v2/model.ts:23-34`

```ts
export interface Create {
  path?: string | undefined;
  overwrite?: boolean | undefined;
}
export interface Create_Response {
  /** Handle which should subsequently be passed into the AddBlock and Close calls when writing to a file through a stream. */
  handle?: number | undefined;
}
```

- **Why weird:** The method is called `create` but does NOT create a file — it opens a write stream and returns a handle. The actual file doesn't exist until you call `close`. A reader of `client.create({path: '/tmp/foo'})` would reasonably expect the file to be created. JSDoc on the method says "Opens a stream to write to a file and returns a handle to this stream." — directly contradicting the name.
- **Category:** 6 (misleading — name says "create" but action is "open"), 14 (Go/proto-style — the upstream proto's name leaked through).
- **Suggested name:** `OpenWriteStream` / `DbfsOpenWriteRequest` (response: `DbfsWriteHandle`).
- **Rationale:** Method name should reflect action; right now `create` and `createDirectory` look like sibling actions when they are entirely different (create-handle vs create-resource).

### 12. `handle: number` — underspecified ID — `src/v2/model.ts:7,17,33`

```ts
AddBlock.handle?: number      // "The handle on an open stream."
Close.handle?:    number
Create_Response.handle?: number
```

- **Why weird:** A `number` named `handle` looks like a `numeric ID`, but the JSDoc says it is the result of an `open` (per #11). No type-brand prevents passing arbitrary numbers; no documentation says whether it is positive, monotonic, opaque, or guaranteed unique. The Go SDK uses `int64` here and TS narrows to `number`, which is silently truncated above 2^53 — and there is no mitigation in this client.
- **Category:** 19 (underspecified ID).
- **Suggested name:** `streamHandle: number` (or `DbfsStreamHandle` branded type). At minimum, type-document "opaque integer from DBFS server; pass as-is".
- **Rationale:** TS `number` for a server-issued 64-bit token is a known precision hazard; the field name doesn't even hint that it's a transient stream identifier.

### 13. `listDirectoryContents` vs `list` — same action, two methods — `src/v2/client.ts:292,656`

```ts
async list(req: ListStatus, ...): Promise<ListStatus_Response>            // legacy DBFS
async listDirectoryContents(req: ListDirectoryContentsRequest, ...): Promise<ListDirectoryResponse>  // modern Files
```

- **Why weird:** Two list methods on the same client. `list` is the legacy DBFS list (no paging), `listDirectoryContents` is the modern Files API (paginated). The names give no signal which is which; the JSDoc on `list` calls out a 60 s timeout and a 10 K file limit. A naive caller will pick the shorter name and hit production limits.
- **Category:** 1 (vague — `list` is generic), 12 (duplicate concept), 17 (inconsistent — `list` is short, `listDirectoryContents` is long; both list a directory).
- **Suggested name:** `dbfsListStatus` (legacy) and `listDirectoryContents` (modern). Or `list` (modern, paged, recommended) and `dbfsList` (legacy, deprecated).
- **Rationale:** Method-name length should not be the only discriminator between a recommended modern API and a deprecated legacy one.

### 14. `ListDirectoryContentsRequest` paired with `ListDirectoryResponse` — request/response noun mismatch — `src/v2/model.ts:178,206`

```ts
export interface ListDirectoryContentsRequest { ... }
export interface ListDirectoryResponse { ... }   // not ListDirectoryContentsResponse
```

- **Why weird:** The request has 4 words (`List Directory Contents Request`); the response has 3 (`List Directory Response`). Same wire endpoint. The asymmetry forces every caller to remember which name has the `Contents` word and which doesn't. Other request/response pairs in this file are matched (`CreateDirectoryRequest` / `CreateDirectoryResponse`; `DownloadFileRequest` / `DownloadFileResponse`).
- **Category:** 7 (overly verbose), 9 (singular/plural mismatch — also: "contents" pluralised on request, dropped on response), 17 (inconsistent with the rest of the file).
- **Suggested name:** `ListDirectoryContentsResponse` to mirror the request. Or trim both to `ListDirectoryRequest` / `ListDirectoryResponse`.
- **Rationale:** Same endpoint, same operation — names should mirror.

### 15. `executeCall` / `executeHttpCall` / `sendAndCheckError` / `buildHttpRequest` — `src/v2/utils.ts:26,65,168,96`

```ts
export async function executeCall(call: Call, options?: CallOptions): Promise<void>
export async function executeHttpCall(opts: HttpCallOptions): Promise<Uint8Array>
export async function sendAndCheckError(opts: HttpCallOptions): Promise<HttpResponse>
export function buildHttpRequest(method, url, headers, signal?, body?): HttpRequest
```

- **Why weird:** Four nearly-identical-sounding helpers in one file. `executeCall` wraps a `Call` (whatever a `Call` is — it's an opaque `(signal?) => Promise<void>` function reference). `executeHttpCall` takes the actual HTTP request. `sendAndCheckError` is what `executeHttpCall` is but with a different return type (raw `HttpResponse` vs buffered `Uint8Array`). All four start with a verb but use different verbs (`execute`, `send`, `build`) for what amounts to "send this HTTP request and return something". The lowercase `'head'` HTTP method in two callers (`client.ts:600,637`) is an unrelated bug.
- **Category:** 17 (inconsistent verb cluster — execute/send/build), 6 (misleading — `executeCall` and `executeHttpCall` are different despite the matching prefix), 12 (duplicate concept — `executeHttpCall` and `sendAndCheckError` do almost the same thing).
- **Suggested name:** Collapse to one helper (`sendRequest`), let it return the raw `HttpResponse`, and have the caller buffer/stream as needed. Or, if both must exist: `sendAndBuffer` (returns buffered body) and `sendAndStream` (returns raw response).
- **Rationale:** Three functions doing nearly the same thing with names that differ in verb is a recipe for mis-imports.

### 16. `path` as the only field in 5 request types — `src/v2/model.ts:23,45,160,213,224`

```ts
Create:     { path?: string; overwrite?: boolean }
Delete:     { path?: string; recursive?: boolean }
GetStatus:  { path?: string }
ListStatus: { path?: string }
MkDirs:     { path?: string }
```

- **Why weird:** Five sibling types whose distinguishing identity is the type name (`Create`, `Delete`, etc.), not the field. The common field is just `path: string`. In TS, all five types are structurally compatible — `GetStatus` is assignable to `ListStatus` and vice versa; both are assignable to `MkDirs`. A caller can confidently pass `getStatus(req)` and a typo-narrowed `req: ListStatus` and TS won't complain (structural typing).
- **Category:** 1 (vague — `path` for everything), 6 (misleading — structural compat collapses semantic distinctions), 17 (inconsistent — sometimes called `path`, sometimes `filePath`, sometimes `directoryPath`).
- **Suggested name:** Use the discriminated field names from the modern API: `dbfsPath` everywhere on the legacy types; or split into `Create.filePath` (because `Create` is a write-stream open, ie file) and `MkDirs.directoryPath`. Helps callers see "this is a path to a file" vs "this is a path to a directory."
- **Rationale:** Structural typing makes the five types interchangeable — a name change is the cheapest defence.

### 17. `Move.sourcePath` / `Move.destinationPath` use snake_case on the wire — `src/v2/model.ts:484-492`

```ts
export const marshalMoveSchema: z.ZodType = z
  .object({
    sourcePath: z.string().optional(),
    destinationPath: z.string().optional(),
  })
  .transform(d => ({
    source_path: d.sourcePath,
    destination_path: d.destinationPath,
  }));
```

- **Why weird:** The wire keys are `source_path` / `destination_path` — but ALL other DBFS methods use a single `path` field. This is an entirely separate field-naming convention used in one method. Compare: `Delete.path` (not `target_path`), `GetStatus.path` (not `target_path`), but `Move.sourcePath` / `Move.destinationPath`.
- **Category:** 17 (inconsistent — single endpoint convention).
- **Suggested name:** Acceptable as-is (these are clearer than `path1`/`path2`). Flag only the inconsistency with the rest of the DBFS surface.
- **Rationale:** The inconsistency is upstream; the TS port should match.

## Medium severity

### 18. v1 `Client` constructor allows `host` to be undefined — `src/v1/client.ts:21`

```ts
constructor(options: ClientOptions) {
  if (options.host === undefined) {
    throw new Error('Host is required.');
  }
  this.host = options.host.replace(/\/$/, '');
  ...
}
```

`ClientOptions.host` is typed optional but in practice always required. Not a name bug per se — but `host` is also generic; `workspaceUrl`/`workspaceHost` would be clearer. Same critique on `v2/client.ts:103`.

### 19. v1 `UploadRequest.contents` is `ReadableStream<Uint8Array>` but v2 `UploadFileRequest.contents` is bare `ReadableStream` — `src/v1/model.ts:11`, `src/v2/model.ts:281`

```ts
// v1
contents: ReadableStream<Uint8Array>;   // required, generic
// v2
contents?: ReadableStream | undefined;  // optional, generic-erased
```

v2 weakens the type — both `ReadableStream<any>` and `ReadableStream<unknown>` would be more correct, but more importantly v1's `Uint8Array` constraint is gone. Same for `DownloadResponse.contents` vs `DownloadFileResponse.contents`.

### 20. `bytesRead` vs `data` in `Read_Response` — singular/plural and naming mismatch — `src/v2/model.ts:267-275`

```ts
export interface Read_Response {
  bytesRead?: number | undefined;   // count
  data?:      Uint8Array | undefined; // bytes
}
```

`bytesRead` (count) and `data` (the bytes) refer to the same byte slice. `bytesRead` is the LENGTH; `data` is the BUFFER. Cleaner: `bytes: Uint8Array` and `bytesRead: number` (count); even better, drop `bytesRead` since `data.byteLength` is the same value.

### 21. `ifUnmodifiedSince` — verb-as-noun field — `src/v2/model.ts:101,149`

```ts
ifUnmodifiedSince?: string | undefined;
```

Mirrors the HTTP header name exactly. Faithful to RFC 9110, but as a TS field name `ifUnmodifiedSince` is a conditional, not a value. `unmodifiedSinceHeader: string` or `notModifiedSince: string` is more idiomatic. Acceptable as-is (HTTP convention), flagged only as observation.

### 22. `range` (HTTP byte range header value) — same — `src/v2/model.ts:95,143`

```ts
range?: string | undefined;
```

Field name `range` is overloaded (range of numbers? date range?). The doc clarifies "range of bytes to retrieve" — name could be `byteRange` or `rangeHeader`.

### 23. `directoryPath` vs `path` — inconsistent across methods — `src/v2/model.ts:39,58,128,180`

The modern Files API consistently uses `directoryPath` / `filePath`. The legacy DBFS uses just `path` even when the value is known to be a directory (`MkDirs.path`) or file (`Create.path`). In v1 it was always `filePath`. v2 has both. Choose: prefix every path with the kind, OR drop the prefix everywhere.

### 24. `recursive` (Delete) — field name does not tell you what it does — `src/v2/model.ts:49`

```ts
recursive?: boolean | undefined;
```

A `recursive: true` on a `Delete` could mean "follow symlinks", "descend into subdirs", etc. JSDoc clarifies "Whether or not to recursively delete the directory's contents." Name OK in context; would prefer `recursivelyDeleteContents: boolean` for self-documentation, but `recursive` is conventional.

### 25. `overwrite` — same — `src/v2/model.ts:27,248,283`

```ts
overwrite?: boolean | undefined;
```

Appears in `Create`, `Put`, `UploadFileRequest` with subtly different defaults. `UploadFileRequest`'s docstring says "If true or unspecified, an existing file will be overwritten" (default-true), while `Create` says "specifies whether to overwrite existing file/files" (default not specified, but in fact false on the wire). Same field name, opposite defaults — a footgun.

### 26. `nextPageToken` is camelCase but `next_page_token` appears in JSDoc — `src/v2/model.ts:208,210,194,196`

```ts
contents?: DirectoryEntry[] | undefined;
nextPageToken?: string | undefined;  // OK
// JSDoc: "the `next_page_token` in the response..." (line 194)
```

JSDoc strings reference the wire name (`next_page_token`), but the TS field is `nextPageToken`. The doc accurately reflects the wire — flagged because cross-referencing a wire name in user-facing JSDoc is confusing. Should reference the TS field name (`nextPageToken`).

### 27. `pageSize` recommendation "We recommend not to set this value..." — `src/v2/model.ts:186`

Doc says don't set the field. Then why is the field public? Name is fine; flagging the inconsistent guidance.

### 28. `@typescript-eslint/naming-convention` eslint-disables for `_Response` types — `model.ts:12,20,30,52,165,218,229,238,250,266`

Every legacy `Foo_Response` type carries an `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` directive because the underscore violates TS PascalCase. Modern API peers (`CreateDirectoryResponse`, `DownloadFileResponse`) need no such directive. Two conventions, one file — surface friction every time the generator runs.

### 29. `Read_Response.data: Uint8Array` is base64 on the wire — `src/v2/model.ts:273`

The field is decoded from base64 on read; doc says "The base64-encoded contents of the file read." but the TS type is already `Uint8Array` (decoded). Consumers reading the docstring may think they have to decode themselves. Name could clarify: `bytes: Uint8Array` with doc "Already base64-decoded".

### 30. v2 `index.ts` exports `FileInfo` but `v1/index.ts` does NOT export `DownloadRequest`/`DownloadResponse`-as-used — `src/v1/index.ts:3`

```ts
export type {DownloadRequest, DownloadResponse, UploadRequest} from './model';
```

v1 exports `DownloadRequest`/`DownloadResponse` but the v1 client has NO download method. Dangling types — see net assessment.

### 31. `flattenQueryParams` — unused in this file — `src/v2/utils.ts:123`

Exported helper. Search shows it's never called by `client.ts` here. Name is generic and could collide with workspace-flattening utilities. Either dead code or genuine helper waiting for use.

### 32. `readAll` is duplicated — `src/v1/utils.ts:23` and `src/v2/utils.ts:40`

Same conceptual helper, two implementations (v1 uses `new Response(body).arrayBuffer()`, v2 walks the reader manually). Name OK; flagged as cross-version duplication.

### 33. `PACKAGE_SEGMENT` — SCREAMING_SNAKE constant — `src/v2/client.ts:89`

```ts
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};
```

SCREAMING_SNAKE is only conventional for true compile-time primitives in TS. This is a plain object; `packageSegment` is fine.

### 34. `HttpCallOptions` duplicated across files — `src/v1/utils.ts:13`, `src/v2/utils.ts:15`

```ts
export interface HttpCallOptions {
  readonly request: HttpRequest;
  readonly httpClient: HttpClient;
  readonly logger: Logger;
}
```

Same name, same shape, in two files in the same package. Should be shared / re-exported.

## Low severity

### 35. v1 `encodeFilePath` vs v2 `encodeMultiSegmentPath` — `src/v1/utils.ts:36`, `src/v2/utils.ts:156`

Same function, renamed in v2. Good rename (v2's is more accurate), but the rename means a v1 user upgrading sees an unexplained name change.

### 36. `Move.sourcePath` / `Move.destinationPath` — could be `source` / `destination` — `src/v2/model.ts:233-236`

The type name is `Move`; the fields are `sourcePath`/`destinationPath`. Inside a `Move` request, the `Path` suffix is redundant — `source: string; destination: string`. Acceptable; flagged because it's the longer form against the rest of the file's `path: string`.

### 37. `pageSize: number` — should mention coercion — `src/v2/model.ts:192`

JSDoc says "The maximum value is 1000. Values above 1000 will be coerced to 1000." Type does not encode the constraint. (TS branded types could; not a naming issue.)

### 38. `pageToken` — opaque token, marked `string | undefined` — `src/v2/model.ts:203`

Best practice is to brand the type (`PageToken = string & {readonly __brand: unique symbol}`) to prevent passing an arbitrary string. Not a naming issue per se.

### 39. v2 `index.ts` exports neither `Client` constants nor `VERSION` — `src/v2/index.ts:3-6`

```ts
export {Client} from './client';
export {} from './model';   // <-- empty named export
```

Line 5 (`export {} from './model';`) is a no-op. Not a name bug, just dead syntax.

### 40. `directoryPath ?? ''` fallback in client — `src/v2/client.ts:462,492,517,546,595,626,660,716`

8 places where `directoryPath` is coerced to empty string. Field is typed optional but the URL must have it. Either type the field as required, or document the fallback. Name OK.

### 41. v1 `Client.upload` returns `Promise<void>` but JSDoc says "does not retry" — `src/v1/client.ts:33-36`

```ts
/**
 * ...
 * Because the request body is a ReadableStream which can only be consumed
 * once, this method does not retry on failure. ...
 */
async upload(req: UploadRequest, options?: CallOptions): Promise<void> {
```

`upload` is the name; the JSDoc tells you it doesn't retry. v2 inherits the same property for `uploadFile` but the doc on `client.ts:706` doesn't say so. Inconsistent docs across versions.

### 42. `pkgJson.name.replace(/^@[^/]+\//, '')` — `src/v2/client.ts:90`

Inlined regex to strip `@scope/` prefix. Should be a helper named `packageName`. Not a naming issue per se.

### 43. v1 imports `@databricks/sdk-core/http` (not `@databricks/sdk-databricks/http`) — `src/v1/client.ts:9`

Different package than the audit but worth flagging: v1 still uses `sdk-core` while v2 uses `sdk-databricks` for some imports — internal inconsistency.

## Observations

### 44. The empty `export {} from './model';` line — `src/v2/index.ts:5`

Likely a generator artifact; no impact.

### 45. v1 has 78 lines of utils for one operation; v2 has 196 lines of utils for ten operations — files are well-sized.

### 46. `Client` constructor's User-Agent code is duplicated across packages — out of scope here.

### 47. `'head'` HTTP method passed in lowercase to `buildHttpRequest` — `src/v2/client.ts:600,637`

```ts
const httpReq = buildHttpRequest('head', url, headers, callSignal);
```

Other calls use `'POST'`/`'GET'`/`'PUT'`/`'DELETE'` uppercase. Cosmetic — actual bug because `buildHttpRequest` does not normalise — but flagged here as casing inconsistency.

### 48. `read()` JSDoc references `RESOURCE_DOES_NOT_EXIST`, `MAX_READ_SIZE_EXCEEDED`, `INVALID_PARAMETER_VALUE` — strings, not enums — `src/v2/client.ts:412-418`

Error codes are referenced as freeform strings in JSDoc. Out of naming scope.

### 49. Legacy DBFS `list` lacks pagination wire shape — `src/v2/model.ts:160,178`

The modern Files API `listDirectoryContents` carries `pageSize` / `pageToken` on the request and `nextPageToken` on the response. The legacy DBFS `list` (`ListStatus` request) has only `path` and returns `ListStatus_Response` with no paging cursor — the JSDoc on `list` even warns of a 10 K file cap. Two list shapes for the same conceptual operation, one with pagination wire fields and one without.
