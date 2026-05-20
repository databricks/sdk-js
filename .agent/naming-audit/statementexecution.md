# Naming Audit: statementexecution

**Package:** `@databricks/sdk-statementexecution`
**Path:** `packages/statementexecution/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

**Inferred domain.** The Databricks SQL Statement Execution API. Submit a SQL
`statement`, await a `status`, then fetch result `data` either inline or via
`external_links` chunked from cloud storage. Four methods:
`executeStatement`, `cancelStatement`, `getStatementResult` (poll a submitted
statement), and `getResultData` (fetch a single result chunk by index). HTTP
prefix `/api/2.0/sql/statements/`.

**Direct overlap with sibling packages.**

| Package | What it is | Overlap source |
| --- | --- | --- |
| `statementexecution` (this) | Run arbitrary SQL on a SQL Warehouse. Public general-purpose SQL execution API. | — |
| `queryexecution` | Re-run *saved* queries inside *published Lakeview dashboards*. Hits `/api/2.0/lakeview-query/query/published`. | Vocabulary collides (`statementId` exists in both; `truncated` field in both; both have a `cancel` method). |
| `queryhistory` | List historical query executions. | Shares `Channel`, `Status`, `Warehouse`, `WarehouseId`. |
| `commandexecution` | Run Python/SQL via REPL on a cluster. | Both call themselves "execution". |
| `queries` | Saved query definitions. | Naming collision: `queries` vs `statements`. |

The package name `statementexecution` is reasonable in isolation, but the SDK
*already* has `queryexecution`, `commandexecution`, and `queries`. A user
opening the marketplace sees four packages whose names overlap heavily and has
to read every one to pick the right tool. See finding #1.

**Total weird names flagged:** 48

## Summary

| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 25 |
| Low | 10 |
| Observation | 4 |

## High severity

### 1. Package name `statementexecution` overlaps three sibling packages — `package.json`, directory name
- **Why weird:** The SDK ships `statementexecution`, `queryexecution`, `commandexecution`, and `queries`. The English words "query", "statement", and "command" are near-synonyms in casual usage, so a user installing the SDK can't pick the right one without reading docs. Concretely: this package is the *only* one that runs ad-hoc SQL on a SQL Warehouse, yet its name doesn't reveal that. The Databricks SQL Statement Execution API itself is documented at `docs.databricks.com/api/workspace/statementexecution`, so the wire-level name is "statement execution" — but the *user-facing* TS-import surface should distinguish itself from `queryexecution`.
- **Category:** 1 (vague — "statement" overlaps "query"/"command"), 12 (duplicate concept — three execution packages).
- **Suggested name:** `sqlstatements`, `sqlexec`, or `warehouseexec` — anything that signals "SQL on a SQL Warehouse". If staying with `statementexecution`, every type name should keep its `Statement*` prefix and the package docstring should call out the contrast with `queryexecution` and `commandexecution`.
- **Rationale:** Naming should disambiguate. Today the four packages are differentiable only by URL prefix and resource. Compare to e.g. `clusterlibraries` vs `clusterpolicies`: both clearly cluster-scoped but each names its sub-resource.

### 2. `ServiceErrorCode` enum members duplicate generic HTTP/gRPC vocabulary — `src/v1/model.ts:53`
- **Why weird:** The enum lists 14 generic codes: `UNKNOWN`, `INTERNAL_ERROR`, `TEMPORARILY_UNAVAILABLE`, `IO_ERROR`, `BAD_REQUEST`, `SERVICE_UNDER_MAINTENANCE`, `WORKSPACE_TEMPORARILY_UNAVAILABLE`, `DEADLINE_EXCEEDED`, `CANCELLED`, `RESOURCE_EXHAUSTED`, `ABORTED`, `NOT_FOUND`, `ALREADY_EXISTS`, `UNAUTHENTICATED`. These are direct gRPC `google.rpc.Code` carry-overs. The SDK already has a canonical apierror codes module (`packages/databricks/src/apierror/codes/`); duplicating them inside one package's enum is wrong on three axes: it's redundant, it pulls gRPC vocabulary into a HTTP/JSON SDK, and it pollutes per-package type surfaces.
- **Category:** 1 (vague — `IO_ERROR`, `ABORTED` give no context), 2 (redundant: `ServiceErrorCode.ABORTED` reads `ServiceErrorCode = ABORTED` twice), 12 (duplicate concept — apierror module owns these codes), 14 (gRPC-style names).
- **Suggested name:** Eliminate the enum. Map the wire code into the canonical `apierror/codes` enum; expose `ServiceError.errorCode` as that type.
- **Rationale:** Per-package error-code enums diverge over time. The SDK already commits to canonical codes elsewhere; this package should use them.

### 3. `Disposition` enum lacks SDK context — `src/v1/model.ts:40`
- **Why weird:** Enum name is `Disposition` — a generic noun (`Content-Disposition` header? business "disposition"?). The single sentinel value `FETCH_DISPOSITION_UNSPECIFIED` reveals the intended scope: this is *fetch* disposition. The enum members `INLINE` and `EXTERNAL_LINKS` are recognisable, but the type name doesn't say "fetch" or "result". A reader who skims `disposition?: Disposition` in `ExecuteStatementRequest` won't know it means "where the result data goes".
- **Category:** 1 (vague — "Disposition" of what?), 2 (redundant: `FETCH_DISPOSITION_UNSPECIFIED` reveals the missing word), 8 (the sentinel reveals the missing prefix).
- **Suggested name:** `ResultDisposition` or `FetchDisposition`. Matching field rename: `resultDisposition?: ResultDisposition`.
- **Rationale:** The enum member's `FETCH_*` prefix is a code smell — when a sentinel value carries a qualifier the type name omits, the type name is under-qualified.

### 4. `Format` enum is dangerously generic — `src/v1/model.ts:46`
- **Why weird:** A top-level enum literally called `Format` exported from the package. The values `JSON_ARRAY`, `ARROW_STREAM`, `CSV` say this is about *result* format. Combine with #3: a user reading `result.format` sees `Format | undefined` and has to chase down what kind of format. As a top-level export, `Format` collides with any other "format" type a consumer might pull in (Intl, Node:format, lodash, etc.).
- **Category:** 1 (vague — `Format` is the most generic possible name), 2 (the sentinel `FORMAT_UNSPECIFIED` reveals the gap), 10 (reserved-word-ish — `format` is a builtin function name in many ecosystems), 15 (generic name losing meaning at use sites).
- **Suggested name:** `ResultFormat`. Same pattern as #3.
- **Rationale:** Top-level enum names should self-describe at use sites. `result.format: Format` reads as "format format"; `result.format: ResultFormat` reads correctly. The collision risk for a single-word `Format` import is high.

### 5. `TimeoutAction` enum members `CONTINUE`/`CANCEL` are too generic — `src/v1/model.ts:77`
- **Why weird:** A small enum with three values: `TIMEOUT_ACTION_UNSPECIFIED`, `CONTINUE`, `CANCEL`. The two real values are bare English verbs that don't say *what* they continue or cancel. In context: when the user-supplied `wait_timeout` expires, this field decides whether the statement keeps running asynchronously (`CONTINUE`) or is cancelled (`CANCEL`). The relationship between the verbs and the timeout is invisible at the type level.
- **Category:** 1 (vague — `CONTINUE` what?), 14 (gRPC/proto-style upper-case verbs), 15 (generic verb-only names).
- **Suggested name:** `OnTimeout.ContinueAsync` and `OnTimeout.CancelExecution` (or rename the enum to `OnTimeout` to match the field `onWaitTimeout`). Drop the `TIMEOUT_ACTION_UNSPECIFIED` sentinel per #12.
- **Rationale:** Enum members should self-document; bare verbs require the reader to chase the field's JSDoc.

### 6. `ColumnTypeName` enum embeds `USER_DEFINED_TYPE` — `src/v1/model.ts:37`
- **Why weird:** The enum represents SQL base types: `BOOLEAN`, `BYTE`, ..., `MAP`, `CHAR`, `NULL`, `USER_DEFINED_TYPE`. The last value breaks the pattern: every other member is a recognisable SQL type name; `USER_DEFINED_TYPE` is a meta-category covering all UDT instances. It also creates a redundant `ColumnTypeName.USER_DEFINED_TYPE` — "type" appears twice in the qualified name.
- **Category:** 2 (redundant: `*TypeName.*TYPE` repeats "type"), 13 (verb-tense — every other member is a noun like `INT`; this one is past-participial), 16 (field-vs-type-domain — UDT isn't a "base data type" per the JSDoc).
- **Suggested name:** Either `UDT` or `UserDefined` (drop `_TYPE`). Or split: keep base types in the enum; carry UDT info in `typeText`.
- **Rationale:** When one enum member breaks the pattern of the others, it signals an enum that does two jobs.

### 7. `GetResultDataRequest` vs. `GetStatementResultRequest` — `src/v1/model.ts:381,390`
- **Why weird:** Two near-identical request types, one with `chunkIndex` and one without. Their names break apart suspiciously:
  - `GetResultDataRequest` fetches *one chunk* of the result data.
  - `GetStatementResultRequest` polls the entire statement (`statementId` only).

  Read aloud, they look like they swap word order arbitrarily (`Result Data` vs `Statement Result`). A user can't tell from the type names which one fetches what. The method names amplify the issue: `getResultData` (fetches a chunk) and `getStatementResult` (polls status + first chunk).
- **Category:** 1 (vague — "ResultData" vs "StatementResult"), 6 (misleading — names suggest interchangeable concepts), 17 (inconsistent ordering of qualifiers).
- **Suggested name:** `GetResultChunkRequest` (carries `chunkIndex`) + `GetStatementRequest` (polls by `statementId`). Methods: `getResultChunk` + `getStatement`. This matches the URL paths `/result/chunks/{chunkIndex}` and `/{statementId}`.
- **Rationale:** Type names should mirror the resource being addressed. The wire makes the distinction explicit; the TS surface obscures it.

### 8. `getStatementResult` method conflates "poll" with "fetch result" — `src/v1/client.ts:219`
- **Why weird:** The JSDoc says: "This request can be used to poll for the statement's status. StatementResponse contains `statement_id` and `status`; other fields might be absent or present depending on context. When the `status.state` field is `SUCCEEDED` it will also return the result manifest and the first chunk of the result data." So the method *is* a polling endpoint that *also* returns results when ready. The method name `getStatementResult` foregrounds "result", but the method's primary job is polling. Combine with #7: there are now two `getResult*` methods, one of which doesn't actually fetch results (it polls), and one of which does (`getResultData`).
- **Category:** 6 (misleading — name implies result-fetch, primary purpose is poll), 12 (duplicate concept — both methods carry "Result" but mean different things), 17 (inconsistent verb usage — `cancel`, `execute`, `getStatementResult`, `getResultData`).
- **Suggested name:** `getStatement` (matches the URL path `/{statementId}`). The Go SDK calls this `GetStatement`. The result is *part* of the response; foregrounding it in the method name misleads.
- **Rationale:** The Databricks API docs name the operation "Get statement" (https://docs.databricks.com/api/workspace/statementexecution/getstatement). The TS SDK should match.

### 9. `getResultData` method asymmetric with `getStatementResult` — `src/v1/client.ts:183`
- **Why weird:** Companion to #8. The Databricks public API names this method "Get statement result by chunk index" (https://docs.databricks.com/api/workspace/statementexecution/getstatementresultchunkn). The Go SDK calls it `GetStatementResultChunkN`. The TS SDK shortens to `getResultData`, dropping both the resource ("statement") and the indexing word ("chunk"). The result is that a reader can't tell from the method name what it does or how it relates to `getStatementResult`.
- **Category:** 1 (vague — "result data" is too generic), 6 (misleading — drops the chunk-indexing semantic), 17 (asymmetric with sibling method).
- **Suggested name:** `getResultChunk` (or `getStatementResultChunk` to match Go). Field rename: `chunkIndex` stays.
- **Rationale:** Names should match the official API where possible. Compare to `getStatementResultChunkN` in the Go SDK.

### 10. `Client` class name — `src/v1/client.ts:43`
- **Why weird:** A class literally named `Client`, re-exported as `Client` from `index.ts:3`. A user importing this from `@databricks/sdk-statementexecution` and another `Client` from `@databricks/sdk-queryexecution` will collide on the namespace. Identical to `queryexecution.md` Finding #9.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `StatementExecutionClient`.
- **Rationale:** Repeated SDK-wide pattern.

### 11. `dataArray` field on `ResultData` — `src/v1/model.ts:422`
- **Why weird:** Field name `dataArray` on a type already called `ResultData`. The two `data` tokens stack: `resultData.dataArray`. The JSDoc explains it carries a `JSON_ARRAY` formatted payload, so the name is gesturing at the wire format. But the type name is the *outer* wrapper, so saying "data" inside "Data" reads as redundant.
- **Category:** 1 (vague — `data`, `array` both generic), 12 (duplicate concept — `Data.dataArray`), 20 (type-suffix tautology).
- **Suggested name:** `rows` (matches the SQL semantics: each entry of the array is a row). Or rename the outer type to `ResultChunk` so `chunk.data` is meaningful.
- **Rationale:** When `outerType.innerField` stutters the same noun, one of them is misnamed.

## Medium severity

### 12. Every enum carries a `*_UNSPECIFIED` sentinel — `src/v1/model.ts:41, 47, 78, 85`
- **Why weird:** All four "open" enums carry `FETCH_DISPOSITION_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `TIMEOUT_ACTION_UNSPECIFIED`, and `STATE_UNSPECIFIED`. These are protobuf-style "default value" sentinels. In TypeScript, absence is represented by `undefined` (the fields are already optional). The sentinels add noise to enum members and force callers to handle a meaningless value.
- **Category:** 11 (trivial value — no behaviour), 14 (proto-style), 18 (long enum value — e.g. `FETCH_DISPOSITION_UNSPECIFIED` is 28 chars).
- **Suggested name:** Drop all `*_UNSPECIFIED` members. The field's `| undefined` already encodes "not set".
- **Rationale:** Generator-wide pattern; same as `commandexecution.md` Finding #4.

### 13. `SUCCEEDED` vs `FAILED` vs `CANCELED` vs `CLOSED` tense mix — `src/v1/model.ts:86-91`
- **Why weird:** Enum values: `PENDING` (gerund), `RUNNING` (gerund), `SUCCEEDED` (past), `FAILED` (past), `CANCELED` (past, single-l), `CLOSED` (past). One spelling is `CANCELED` (US, single-l) — see #22 for the inconsistency with the same word `CANCELLED` in `ServiceErrorCode` (which the `ServiceErrorCode` enum spells with double-l). The tense mix is fine across the SDK, but the cancel spelling inconsistency is a real bug.
- **Category:** 13 (verb-tense inconsistency), 17 (US/UK spelling inconsistency for "cancel").
- **Suggested name:** Pick one cancel spelling. The wire is `CANCELED` (single-l) per this enum and `CANCELLED` per `ServiceErrorCode`. Resolve at wire level.
- **Rationale:** Twin spellings of the same English word in adjacent enums in the same file is a maintenance hazard. Compare `StatementStatus_State.CANCELED` to `ServiceErrorCode.CANCELLED`.

### 14. `StatementResponse.statementId` collides with `QueryResponseStatus.statementId` (sibling package) — `src/v1/model.ts:498`, `queryexecution model.ts:102`
- **Why weird:** A user importing from both `statementexecution` and `queryexecution` finds a `statementId` field on responses from both packages. In `statementexecution` it identifies the SQL Statement Execution submission. In `queryexecution` (a published-dashboard query) the JSDoc explicitly says "The statement_id should be identical to data_token in SuccessStatus and PendingStatus" — i.e. it's an audit copy, not a primary key. The same name means different things in two adjacent packages.
- **Category:** 12 (duplicate concept — same name, different meaning), 19 (underspecified ID — what kind of statement?).
- **Suggested name:** Keep `statementId` here (primary identifier); rename the audit-only copy in `queryexecution` (see `queryexecution.md` Finding #14).
- **Rationale:** Cross-package consistency; this package is the canonical home of `statementId`.

### 15. `warehouseId` field — `src/v1/model.ts:158`
- **Why weird:** Required field in practice (no statement can execute without it) but typed `string | undefined`. The JSDoc links to docs about SQL warehouses, which is good. The name is fine; the modality is wrong — every required field on the request is optional at the type level because the generator emits all fields as `optional`. Flagged for the consistency observation #35.
- **Category:** 16 (field contradicts type domain — "required" per docs, optional in TS).
- **Suggested name:** Make required: `warehouseId: string`.
- **Rationale:** Wire requirements should propagate into TS types where possible.

### 16. `statement` field name is the package name — `src/v1/model.ts:153`
- **Why weird:** The request type `ExecuteStatementRequest` carries a field literally called `statement`. The package name is `statementexecution`. The class name is `Client` (per #10). So a call reads:
  ```ts
  client.executeStatement({statement: 'SELECT 1', warehouseId: '...'})
  ```
  `statement` is the SQL text; the package name promises `statement execution`; the method is `executeStatement`. The word "statement" appears three times to mean three slightly different things: the package scope, the operation, and the SQL string. At use sites this looks like stutter.
- **Category:** 1 (vague — `statement` could be anything), 12 (duplicate concept — overloaded word), 15 (generic field name).
- **Suggested name:** Rename the field to `sql` (or `query` if not colliding with `queryexecution`). The wire is `statement`, so a marshaller maps `sql -> statement`.
- **Rationale:** The package, the class, and the field shouldn't all spell the same word three times.

### 17. `rowLimit` vs `byteLimit` — both optional, asymmetric defaults — `src/v1/model.ts:176, 184`
- **Why weird:** Two parallel "limit" fields; `rowLimit` has no default mentioned; `byteLimit` mentions a "100 GiB default if not explicitly set" for `EXTERNAL_LINKS` disposition. The asymmetric defaults aren't captured by the types. JSDoc encodes them; users have to read both.
- **Category:** 16 (field-vs-domain — domain has implicit defaults the type doesn't show), 17 (asymmetric defaults).
- **Suggested name:** Names are fine; consolidate JSDoc so both fields document defaults symmetrically.
- **Rationale:** Pair-fields should have parallel JSDoc structure.

### 18. `parameters` field carries `StatementParameter[]` — `src/v1/model.ts:308`
- **Why weird:** Field name is `parameters`. Element type is `StatementParameter`. The element name is more specific (statement parameter) than the field (parameters). At the JSDoc level, the field describes "parameter markers" — which is yet a third name for the same concept. So users see: `parameters` (field) vs `StatementParameter` (element type) vs "parameter markers" (docs). Pick one vocabulary.
- **Category:** 12 (duplicate concept — three names for one idea), 17 (inconsistent vocabulary).
- **Suggested name:** Either rename the element type to `Parameter` (less qualified than field) or rename the field to `statementParameters`. The wire shape probably matters; pick the less verbose option.
- **Rationale:** Multiple synonyms for one concept burns reader attention.

### 19. `queryTags` field on `ExecuteStatementRequest` — `src/v1/model.ts:326`
- **Why weird:** Field is `queryTags`, element type is `QueryTag`. The user is *executing a statement*, but the metadata tags are called *query* tags. There's no `Query` type in this package; the prefix `Query` here is a Databricks billing/observability term (queries get tagged for analytics). For a TS user who hasn't seen the bigger picture, the mismatch between `executeStatement` and `QueryTag[]` reads as inconsistent.
- **Category:** 12 (duplicate concept — `statement` vs `query`), 17 (inconsistent vocabulary).
- **Suggested name:** Rename to `tags` + `Tag` (the surrounding context already says "statement", so the qualifier is redundant). Wire mapping can keep `query_tags`.
- **Rationale:** Tagging in this SDK is a cross-cutting concern; `Tag` would be the natural top-level name. Within the statement-execution context, `tags` suffices.

### 20. `ServiceError` carries an open-ended `errorCode` and `message` — `src/v1/model.ts:473`
- **Why weird:** Type is named `ServiceError`. SDK already has canonical error types in `@databricks/sdk-databricks/apierror` — `APIError` and friends. A `ServiceError` type that lives inside one API package and exposes its own enum is parallel to the SDK's canonical error type but doesn't interop. So a user catching errors might encounter both `APIError` (from the transport layer) and a `StatementStatus.error: ServiceError` (from a 200-OK statement-failed response). Two error shapes for one user-facing problem.
- **Category:** 12 (duplicate concept — overlaps `APIError`), 6 (misleading — "Service" qualifier doesn't say which service), 14 (Java/Go-style `ServiceError`).
- **Suggested name:** `StatementError` (or fold into `APIError` extensions). The errorCode should reuse the canonical apierror codes per #2.
- **Rationale:** Multiple error type shapes per SDK is a cognitive tax.

### 21. `StatementStatus.sqlState` field — `src/v1/model.ts:522`
- **Why weird:** Field name `sqlState`. The JSDoc says "SQLSTATE error code returned when the statement execution fails." The all-caps acronym SQLSTATE is the SQL-standard 5-character status code (e.g. `42S22`). The TS field uses camelCase `sqlState`. Compare to elsewhere in the SDK where SQL is also lowercased (`sqlExpression`, `sqlText`). This is consistent SDK-wide.
- **Category:** 3 (acronym casing — `SQL` becoming `sql` is debatable; SDK has settled on lowercase, so this matches).
- **Suggested name:** Keep `sqlState`. Flagged for completeness.
- **Rationale:** TS convention varies on multi-letter acronyms; google-ts-style says lowercase initial; SDK follows the convention.

### 22. `ServiceError.errorCode` field — `src/v1/model.ts:474`
- **Why weird:** Field name stutters with type name: `ServiceError.errorCode`. "Error" appears at both levels. A reader sees `err.errorCode` and wonders if there's a non-error code too.
- **Category:** 20 (type-suffix tautology), 12 (duplicate concept).
- **Suggested name:** `code` (since the type is already `ServiceError`).
- **Rationale:** Stutter — `error.error*` — is a code smell.

### 23. `ServiceErrorCode.CANCELLED` (double-l) vs `StatementStatus_State.CANCELED` (single-l) — `src/v1/model.ts:62, 90`
- **Why weird:** Same English word, two spellings, in two enums in the same file. `CANCELLED` is British; `CANCELED` is American. The wire chose differently for the two enums; the SDK mirrors the wire. End users have to remember "cancel with one or two Ls".
- **Category:** 13 (spelling/tense inconsistency — see #13), 17 (asymmetric pair).
- **Suggested name:** Normalise upstream. If kept, document the spelling difference in `@databricks/sdk-databricks` README.
- **Rationale:** The spelling difference is invisible in casual scanning but breaks copy/paste.

### 24. `waitTimeout` is a string-encoded duration — `src/v1/model.ts:264`
- **Why weird:** `waitTimeout?: string` with JSDoc explaining it must be formatted as `"Ns"` where N is 0 or 5-50. So a *typed string* with a private DSL inside. Users will write `"5s"` and hope, or worse: `5` (number, won't compile). The wire format is a proto Duration, but the TS surface could parse `number` (seconds) or `Duration` (ms) and emit `Ns`.
- **Category:** 1 (vague — `string`-typed numeric), 6 (misleading — a "timeout" with arbitrary string content), 14 (proto/Go-style — Duration carry-over).
- **Suggested name:** Keep `waitTimeout` but change the type to `number` (seconds) and let the marshaller produce `Ns`. Or `Duration` from `@databricks/sdk-core/wkt`.
- **Rationale:** Letting users pass arbitrary strings into a numeric field is a contract violation waiting to happen.

### 25. `onWaitTimeout` field with `TimeoutAction` enum — `src/v1/model.ts:272`
- **Why weird:** Field is `onWaitTimeout`, type is `TimeoutAction`. The two names don't share the prefix `Wait*` even though they're tightly coupled. A reader sees `onWaitTimeout?: TimeoutAction` and has to chase the docs to learn the enum members are about wait-timeouts.
- **Category:** 17 (asymmetric field/type naming), 12 (duplicate concept — `Wait`/`Timeout` overloaded).
- **Suggested name:** Rename the enum to `OnWaitTimeoutAction` or, per #5, `OnTimeout`.
- **Rationale:** Field/type symmetry is a strong signal.

### 26. `chunkIndex` field type is `number` in URL path — `src/v1/client.ts:187`
- **Why weird:** The chunk index is a JS `number` (potentially `undefined`). The URL builder uses `String(req.chunkIndex ?? '')` which produces the empty string when undefined — meaning the URL silently becomes `/result/chunks/` (trailing slash, no index) on an unset value. The client emits the request anyway. This is a footgun that the type name doesn't help with: `chunkIndex?: number | undefined` should probably be required.
- **Category:** 16 (field contradicts domain — required in URL, optional in type), 19 (underspecified — what does `undefined` mean for a path component?).
- **Suggested name:** Make required: `chunkIndex: number`. Method should refuse to send an empty path component.
- **Rationale:** Naming + modality mismatch becomes a real bug at the URL level.

### 27. `nextChunkInternalLink` field — `src/v1/model.ts:128`
- **Why weird:** The field is documented as: "an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be treated as an opaque link. This is an alternative to using `next_chunk_index`." The word "Internal" is doing a lot here — it's not internal as in "private to Databricks"; it means "internal-link, as opposed to a presigned cloud link". The naming is opaque without the JSDoc.
- **Category:** 1 (vague — "Internal" is too generic), 5 (cryptic — needs JSDoc to decode).
- **Suggested name:** `nextChunkRelativePath` (matches its semantics: a path relative to the workspace host). Or `nextChunkUrlPath`.
- **Rationale:** Names should not lean on JSDoc to communicate the *kind* of identifier.

### 28. `truncated` field on `ResultManifest` is ambiguously boolean — `src/v1/model.ts:464`
- **Why weird:** A `truncated?: boolean | undefined` field. The JSDoc says "Indicates whether the result is truncated due to `row_limit` or `byte_limit`." But the field doesn't say *which* limit caused truncation. If truncation is rare, the user has to inspect both limits to figure out why. The name doesn't carry that information; a `truncationReason` field would.
- **Category:** 1 (vague — boolean doesn't capture cause), 16 (field underdetermines domain).
- **Suggested name:** Keep `truncated` but pair with an optional `truncationReason: 'rows' | 'bytes'` (or have the wire surface a reason).
- **Rationale:** Boolean fields that conceal a richer enumeration are an anti-pattern.

### 29. `totalChunkCount`, `totalRowCount`, `totalByteCount` triple — `src/v1/model.ts:453, 457, 462`
- **Why weird:** Three parallel `total*Count` fields. Each ends in `Count` (singular noun) and starts with `total` (qualifier). The triple is consistent but verbose — `totalChunkCount` is 16 characters for an integer count.
- **Category:** 7 (overly verbose), 8 (redundant suffix — `Count` is implied for an integer).
- **Suggested name:** `chunks` / `rows` / `bytes` (drop `total*Count` and let the integer-ness be implicit). Or keep `total*Count` and document that the per-chunk `*Count` fields are partial sums.
- **Rationale:** Verbose triplets across a type can usually be compressed.

### 30. `chunks` array + `totalChunkCount` redundancy — `src/v1/model.ts:453-462`
- **Why weird:** `ResultManifest.chunks` is an array of `ChunkInfo`; `totalChunkCount` is `chunks.length`. The two carry the same information; on the wire there is a sender-receiver invariant, but TS users can compute one from the other. The naming gives no hint of the redundancy.
- **Category:** 12 (duplicate concept), 1 (vague — both fields are about the same property).
- **Suggested name:** Drop `totalChunkCount`; users compute via `chunks?.length`.
- **Rationale:** Two fields that mean the same thing should not both be public.

### 31. `dataArray` JSDoc references `JSON_ARRAY` format — `src/v1/model.ts:418`
- **Why weird:** Field JSDoc: "The `JSON_ARRAY` format is an array of arrays of values, where each non-null value is formatted as a string. Null values are encoded as JSON `null`." The field is only populated when `format === JSON_ARRAY`. The type doesn't reflect this conditional: `dataArray?: JsonValue[][] | undefined`. A user setting `format=CSV` will see `dataArray` undefined and have to chase JSDoc to learn it's intentional.
- **Category:** 16 (field-vs-format contradicts domain when format differs).
- **Suggested name:** Make `ResultData` a discriminated union over `format`. Names stay; the type changes.
- **Rationale:** Optional fields whose presence depends on another field should be modelled as discriminated unions.

### 32. `externalLinks?: ExternalLink[]` + `dataArray?: JsonValue[][]` mutual exclusivity — `src/v1/model.ts:417, 422`
- **Why weird:** Companion to #31. The JSDoc literally says "Exactly one of these alternatives is used." TypeScript has discriminated unions; the type doesn't use them. So both fields are simultaneously `?: undefined` at the type level; the user must conditionally narrow.
- **Category:** 16 (mutual exclusivity not modelled), 17 (asymmetric pair).
- **Suggested name:** Discriminate on `disposition` — names unchanged; type shape changes.
- **Rationale:** Two-of-N fields where only one is populated should be modelled as a union.

### 33. `executeCall` and `executeHttpCall` in utils — `src/v1/utils.ts:26, 65`
- **Why weird:** Two `execute*` functions in the same file, one wraps retry/rate-limit policy and one does the actual HTTP. Same as `queryexecution.md` Finding #21.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithPolicies` + `sendHttpRequest`.
- **Rationale:** Generator-wide.

### 34. `buildHttpRequest` helper — `src/v1/utils.ts:96`
- **Why weird:** "Build" implies builder pattern; this is a 16-line object literal. Same as `queryexecution.md` Finding #22.
- **Category:** 1, 6.
- **Suggested name:** `makeHttpRequest` or inline.

### 35. Every field on every request type is optional — `src/v1/model.ts` (every interface)
- **Why weird:** `warehouseId`, `statement`, `chunkIndex`, `statementId` — all required at the wire level — are all `?: T | undefined` at the TS level. The codegen emits everything as optional to keep round-tripping simple. The names don't communicate which fields are required; the JSDoc occasionally does (statement: "the SQL statement to execute"). A user can call `executeStatement({})` and only learn it's wrong at runtime.
- **Category:** 16 (field contradicts domain — required-in-wire, optional-in-TS), 1 (modality silently lost).
- **Suggested name:** N/A — the names are fine, the modality is wrong. Mark required fields as required (no `?`).
- **Rationale:** Same finding as `commandexecution.md` and `queryexecution.md`; generator-wide.

### 36. `StatementResponse` is the response of *two* methods — `src/v1/model.ts:493`, `src/v1/client.ts:151, 222`
- **Why weird:** Both `executeStatement()` and `getStatementResult()` return `StatementResponse`. The name `StatementResponse` is generic enough to cover both — but a reader can't tell from the type which method produced it. The contents differ subtly: `executeStatement` may return `PENDING`; `getStatementResult` returns terminal states only. Two operations with one response type is fine if the response is genuinely one shape, but the JSDoc on the response should disambiguate, and the audit-only `statementId` collision (per #14) suggests this is the wrong abstraction.
- **Category:** 6 (misleading — type is overloaded), 12 (duplicate concept — two operations).
- **Suggested name:** Keep `StatementResponse` but document that it's polymorphic. Or split into `StatementSubmissionResponse` + `StatementStateResponse`.
- **Rationale:** Shared response types are acceptable but should be flagged for documentation.

## Low severity

### 37. `chunkIndex` vs `nextChunkIndex` naming pair — `src/v1/model.ts:107, 122`
- **Why weird:** A `ChunkInfo` has `chunkIndex` (this chunk's index) and `nextChunkIndex` (the *next* chunk's index). The pair is consistent. But the `ChunkInfo` is also used in two contexts (manifest array, in-chunk metadata), and the wire shape doesn't always populate `nextChunkIndex`. Names are fine but the duplication across two distinct uses is worth flagging.
- **Category:** 17 (acceptable asymmetry).
- **Suggested name:** Keep.

### 38. `rowOffset`, `rowCount`, `byteCount` triple — `src/v1/model.ts:108, 111, 116`
- **Why weird:** Three integer fields on `ChunkInfo` (and parallel on `ExternalLink` and `ResultData`) that record per-chunk metrics. The pattern is the same across types; consider extracting to a shared `ChunkMetrics` mixin. The names are fine.
- **Category:** 12 (duplicate concept — three types carry the same fields).
- **Suggested name:** Extract `ChunkMetrics` shared interface.
- **Rationale:** Trio-replicated types are a tell.

### 39. `ColumnInfo.typeText` vs `typeName` — `src/v1/model.ts:135, 137`
- **Why weird:** `typeText` is "the full SQL type specification" (e.g. `DECIMAL(10,2)`). `typeName` is the base type name (`DECIMAL`). The pair is intentional but the names don't make the relationship obvious — `typeText` and `typeName` sound interchangeable.
- **Category:** 17 (asymmetric pair — `Text` vs `Name`), 1 (vague — `Text` of what?).
- **Suggested name:** `typeSql` (the wire SQL text) + `typeBase` (the base type) — but the wire is canonical, so keep names. Document the relationship.

### 40. `position` field on `ColumnInfo` — `src/v1/model.ts:139`
- **Why weird:** Top-level field literally `position` with JSDoc "The ordinal position of the column (starting at position 0)." `position` is generic. `ordinalPosition` (matches the JSDoc) or `columnIndex` would be more precise.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `ordinalPosition` or `index`.

### 41. `expiration` field on `ExternalLink` — `src/v1/model.ts:341`
- **Why weird:** A string field whose JSDoc says "Indicates the date-time that the given external link will expire and becomes invalid". Two issues: the name `expiration` is ambiguous (an expiry timestamp? a TTL?), and the type is `string` (presumably ISO8601 — the JSDoc doesn't say). A reader can't tell from the type or name how to interpret the value.
- **Category:** 1 (vague), 6 (misleading — could be TTL).
- **Suggested name:** `expiresAt` (ISO8601 timestamp) — matches modern JS/TS convention.

### 42. `httpHeaders` value type loses sensitivity context — `src/v1/model.ts:349`
- **Why weird:** JSDoc says "Headers are typically used to pass a decryption key to the external service. The values of these headers should be considered sensitive and the client should not expose these values in a log." So this is a security-sensitive map. The TS type doesn't signal this. Names like `secretHeaders` or wrapper types like `SensitiveString` would surface the constraint.
- **Category:** 16 (field-vs-domain contradiction — sensitive content with normal-string type).
- **Suggested name:** Keep `httpHeaders` but tag the type or document at the type level.
- **Rationale:** Optional/low-priority but worth noting.

### 43. `Schema` type is a top-level export with a maximally overloaded name — `src/v1/model.ts:468`
- **Why weird:** The name `Schema` is one of the most overloaded words in SDK ecosystems (validation schemas, database schemas, JSON schemas). Exported at the top level of the package, a consumer importing `Schema` from `@databricks/sdk-statementexecution` collides with any other `Schema` they pull in.
- **Category:** 1 (vague — `Schema` is overloaded), 10 (reserved-word-ish), 15 (generic top-level export).
- **Suggested name:** `ResultSchema` (or `ColumnSchema`) to disambiguate from other schema concepts.

### 44. `name`, `value`, `type` triple on `StatementParameter` — `src/v1/model.ts:479-491`
- **Why weird:** Three single-word fields on a single type, all `string | undefined`. The JSDoc explains: name is the marker name; value is the substituted text; type is the SQL type. The names work fine in this context but are maximally generic — `name`, `value`, `type` could mean anything. The `type` field collides with the TS keyword visually (though `type` isn't actually reserved in object-position).
- **Category:** 1 (vague), 10 (reserved-word collision — `type` is contextually meaningful), 15 (generic names).
- **Suggested name:** `parameterName`, `parameterValue`, `sqlType` — but local names are fine inside a clear-context type. Flagged for completeness.

### 45. `QueryTag.key` and `QueryTag.value` — `src/v1/model.ts:404-405`
- **Why weird:** Generic key-value pair. Same as #44 but for tags. `tagKey` + `tagValue` are common alternatives.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** Acceptable in context.

### 46. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
- **Why weird:** Generic name. Same as `queryexecution.md` Finding #25.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.

## Observations (non-fixable here)

### O-1. URL string concatenation handles `undefined` silently — `src/v1/client.ts:76, 187, 223`
- The URL is built via template literals like
  ``${this.host}/api/2.0/sql/statements/${req.statementId ?? ''}/cancel``.
  If `statementId` is `undefined`, the URL becomes
  `.../sql/statements//cancel`, which the server will return 404 for. The
  fallback to empty string is a silent-failure pattern. Names are fine; the
  fallback semantics are wrong.

### O-2. `*_UNSPECIFIED` sentinels exist on every enum — see #12.
- Generator-wide; the fix is in codegen.

### O-3. Statement IDs share a vocabulary with `queryexecution` and `queryhistory`.
- All three packages emit some flavour of `statementId`. The naming should be
  unified at the apierror / statement-vocabulary layer if it matters.

### O-4. Module-level JSDoc lives in leaf files instead of `index.ts`.
- `index.ts` has no module-level JSDoc; `model.ts` has none either. Other
  packages document scope and the API at `index.ts`. The naming choices flagged
  above (e.g. `Format`, `Disposition`, `Client`) would be less confusing if
  `index.ts` explained the package scope and contrasts with sibling packages.

---

## Overlap with `queryexecution` — explicit comparison

The audit prompt asked specifically to flag the overlap. Here's the explicit
mapping of vocabulary shared between the two packages:

| Concept | statementexecution | queryexecution |
| --- | --- | --- |
| Primary identifier | `statementId` (primary) | `statementId` (audit-only copy of `dataToken`) |
| "Truncated" boolean | `ResultManifest.truncated` (truncation of result set) | `SuccessStatus.truncated` (truncation of dashboard query result) |
| Cancel operation | `cancelStatement()` | `cancelPublishedQueryExecution()` |
| Execute operation | `executeStatement()` | `executePublishedDashboardQuery()` |
| Poll operation | `getStatementResult()` (also returns first chunk) | `pollPublishedQueryStatus()` |
| State terminology | `StatementStatus_State.{PENDING, RUNNING, SUCCEEDED, FAILED, CANCELED, CLOSED}` | `QueryResponseStatus.{success, pending, canceled, closed}` (discriminated union) |
| Cancellation spelling | `CANCELED` (single-l) | `canceled` (single-l, lowercase) |
| Generic `Client` name | yes | yes |
| Verb-tense | `cancelStatement` | `cancelPublishedQueryExecution` |

The two packages model semantically distinct operations (general SQL Statement
Execution vs Lakeview-dashboard query lifecycle) but share enough vocabulary
(`Statement`, `Query`, `Cancel`, `Execute`, `Status`) that a user importing
both will be confused. The fix is at the naming/package level (see #1) and
the cross-package vocabulary alignment (#14, #23).

---

## Themes

1. **Per-package error-code enum.** `ServiceErrorCode` mimics `google.rpc.Code` inside a single API package, parallel to the canonical `apierror/codes` module. Generator-wide; the fix is to map wire codes through the canonical apierror layer.
2. **Word stutter.** `ServiceError.errorCode`, `ResultData.dataArray`, `*ResultData` vs `*StatementResult`, `executeStatement` / `getStatementResult` / `statement` field. The wire shape doesn't help here; the TS surface could compress.
3. **Generic top-level names.** `Format`, `Disposition`, `Schema`, `Client`, `ServiceError`. Each one is fine in isolation but collides with the surrounding ecosystem (other SDKs, zod, language builtins).
4. **Package-name competition.** `statementexecution` lives alongside `queryexecution`, `commandexecution`, and `queries` — four near-synonymous names for related-but-distinct execution surfaces.
5. **`*_UNSPECIFIED` sentinels.** Proto-default-value sentinels carried through to TS where `undefined` already encodes "not set". Generator-wide.
6. **Polymorphic types pretending to be flat.** `ResultData` (inline vs external links), `StatementResponse` (executeStatement vs getStatementResult), `ChunkInfo` (manifest entry vs response chunk). Discriminated unions would surface the variants.
