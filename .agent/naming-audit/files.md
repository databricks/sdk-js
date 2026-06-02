# Naming Audit: files

**Path:** `packages/files/src/v2/`
**Versions audited:** v2

**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Low | 1 |

## High severity

### 1. `CreateRequest` returns a `handle` (not the created file) — `src/v2/model.ts:32-42`

```ts
export interface CreateRequest {
  path?: string | undefined;
  overwrite?: boolean | undefined;
}
// Response shape:
//   handle?: bigint | undefined;
//   "Handle which should subsequently be passed into the AddBlock and Close calls when writing to a file through a stream."
```

- **Why weird:** The method is called `create` but does NOT create a file — it opens a write stream and returns a handle. The actual file doesn't exist until you call `close`. A reader of `client.create({path: '/tmp/foo'})` would reasonably expect the file to be created. JSDoc on the method says "Opens a stream to write to a file and returns a handle to this stream." — directly contradicting the name.
- **Category:** 6 (misleading — name says "create" but action is "open").
- **Suggested name:** `OpenWriteStreamRequest` / `DbfsOpenWriteRequest` (response: `DbfsWriteHandle`).
- **Rationale:** Method name should reflect action; right now `create` and `createDirectory` look like sibling actions when they are entirely different (create-handle vs create-resource).

## Low severity

### 2. `overwrite` — same — `src/v2/model.ts:36,245,279`

```ts
overwrite?: boolean | undefined;
```

Appears in `CreateRequest`, `PutRequest`, `UploadFileRequest` with subtly different defaults. `UploadFileRequest`'s docstring says "If true or unspecified, an existing file will be overwritten" (default-true), while `CreateRequest` says "specifies whether to overwrite existing file/files" (default not specified, but in fact false on the wire). Same field name, opposite defaults — a footgun.
