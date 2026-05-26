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

**Total weird names flagged:** 43

## Summary

| Severity | Count |
| --- | --- |
| High | 9 |
| Medium | 24 |
| Low | 7 |
| Observation | 3 |

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
- **Why weird:** Enum name is `Disposition` — a generic noun (`Content-Disposition` header? business "disposition"?). The enum members `INLINE` and `EXTERNAL_LINKS` are recognisable, but the type name doesn't say "fetch" or "result". A reader who skims `disposition?: Disposition` in `ExecuteStatementRequest` won't know it means "where the result data goes". As a top-level export, `Disposition` collides with any other "disposition" concept a consumer might pull in.
- **Category:** 1 (vague — "Disposition" of what?), 15 (generic top-level export).
- **Suggested name:** `ResultDisposition` or `FetchDisposition`. Matching field rename: `resultDisposition?: ResultDisposition`.
- **Rationale:** Top-level enum names should self-describe at use sites. `request.disposition: Disposition` reads as "disposition disposition"; `request.disposition: ResultDisposition` reads correctly.

### 4. `Format` enum is dangerously generic — `src/v1/model.ts:46`
- **Why weird:** A top-level enum literally called `Format` exported from the package. The values `JSON_ARRAY`, `ARROW_STREAM`, `CSV` say this is about *result* format. Combine with #3: a user reading `result.format` sees `Format | undefined` and has to chase down what kind of format. As a top-level export, `Format` collides with any other "format" type a consumer might pull in (Intl, Node:format, lodash, etc.).
- **Category:** 1 (vague — `Format` is the most generic possible name), 10 (reserved-word-ish — `format` is a builtin function name in many ecosystems), 15 (generic name losing meaning at use sites).
- **Suggested name:** `ResultFormat`. Same pattern as #3.
- **Rationale:** Top-level enum names should self-describe at use sites. `result.format: Format` reads as "format format"; `result.format: ResultFormat` reads correctly. The collision risk for a single-word `Format` import is high.

### 5. `TimeoutAction` enum members `CONTINUE`/`CANCEL` are too generic — `src/v1/model.ts:77`
- **Why weird:** Two of the enum values are bare English verbs that don't say *what* they continue or cancel. In context: when the user-supplied `wait_timeout` expires, this field decides whether the statement keeps running asynchronously (`CONTINUE`) or is cancelled (`CANCEL`). The relationship between the verbs and the timeout is invisible at the type level.
- **Category:** 1 (vague — `CONTINUE` what?), 14 (gRPC/proto-style upper-case verbs), 15 (generic verb-only names).
- **Suggested name:** `OnTimeout.ContinueAsync` and `OnTimeout.CancelExecution` (or rename the enum to `OnTimeout` to match the field `onWaitTimeout`).
- **Rationale:** Enum members should self-document; bare verbs require the reader to chase the field's JSDoc.

### 6. `GetResultDataRequest` vs. `GetStatementResultRequest` — `src/v1/model.ts:381,390`
- **Why weird:** Two near-identical request types, one with `chunkIndex` and one without. Their names break apart suspiciously:
  - `GetResultDataRequest` fetches *one chunk* of the result data.
  - `GetStatementResultRequest` polls the entire statement (`statementId` only).

  Read aloud, they look like they swap word order arbitrarily (`Result Data` vs `Statement Result`). A user can't tell from the type names which one fetches what. The method names amplify the issue: `getResultData` (fetches a chunk) and `getStatementResult` (polls status + first chunk).
- **Category:** 1 (vague — "ResultData" vs "StatementResult"), 6 (misleading — names suggest interchangeable concepts), 17 (inconsistent ordering of qualifiers).
- **Suggested name:** `GetResultChunkRequest` (carries `chunkIndex`) + `GetStatementRequest` (polls by `statementId`). Methods: `getResultChunk` + `getStatement`. This matches the URL paths `/result/chunks/{chunkIndex}` and `/{statementId}`.
- **Rationale:** Type names should mirror the resource being addressed. The wire makes the distinction explicit; the TS surface obscures it.

### 7. `getStatementResult` method conflates "poll" with "fetch result" — `src/v1/client.ts:219`
- **Why weird:** The JSDoc says: "This request can be used to poll for the statement's status. StatementResponse contains `statement_id` and `status`; other fields might be absent or present depending on context. When the `status.state` field is `SUCCEEDED` it will also return the result manifest and the first chunk of the result data." So the method *is* a polling endpoint that *also* returns results when ready. The method name `getStatementResult` foregrounds "result", but the method's primary job is polling. Combine with #6: there are now two `getResult*` methods, one of which doesn't actually fetch results (it polls), and one of which does (`getResultData`).
- **Category:** 6 (misleading — name implies result-fetch, primary purpose is poll), 12 (duplicate concept — both methods carry "Result" but mean different things), 17 (inconsistent verb usage — `cancel`, `execute`, `getStatementResult`, `getResultData`).
- **Suggested name:** `getStatement` (matches the URL path `/{statementId}`). The Go SDK calls this `GetStatement`. The result is *part* of the response; foregrounding it in the method name misleads.
- **Rationale:** The Databricks API docs name the operation "Get statement" (https://docs.databricks.com/api/workspace/statementexecution/getstatement). The TS SDK should match.

### 8. `getResultData` method asymmetric with `getStatementResult` — `src/v1/client.ts:183`
- **Why weird:** Companion to #7. The Databricks public API names this method "Get statement result by chunk index" (https://docs.databricks.com/api/workspace/statementexecution/getstatementresultchunkn). The Go SDK calls it `GetStatementResultChunkN`. The TS SDK shortens to `getResultData`, dropping both the resource ("statement") and the indexing word ("chunk"). The result is that a reader can't tell from the method name what it does or how it relates to `getStatementResult`.
- **Category:** 1 (vague — "result data" is too generic), 6 (misleading — drops the chunk-indexing semantic), 17 (asymmetric with sibling method).
- **Suggested name:** `getResultChunk` (or `getStatementResultChunk` to match Go). Field rename: `chunkIndex` stays.
- **Rationale:** Names should match the official API where possible. Compare to `getStatementResultChunkN` in the Go SDK.

### 9. `Client` class name — `src/v1/client.ts:43`
- **Why weird:** A class literally named `Client`, re-exported as `Client` from `index.ts:3`. A user importing this from `@databricks/sdk-statementexecution` and another `Client` from `@databricks/sdk-queryexecution` will collide on the namespace. Identical to `queryexecution.md` Finding #9.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `StatementExecutionClient`.
- **Rationale:** Repeated SDK-wide pattern.

## Medium severity

### 10. `SUCCEEDED` vs `FAILED` vs `CANCELED` vs `CLOSED` tense mix — `src/v1/model.ts:86-91`
- **Why weird:** Enum values: `PENDING` (gerund), `RUNNING` (gerund), `SUCCEEDED` (past), `FAILED` (past), `CANCELED` (past, single-l), `CLOSED` (past). One spelling is `CANCELED` (US, single-l) — see #17 for the inconsistency with the same word `CANCELLED` in `ServiceErrorCode` (which the `ServiceErrorCode` enum spells with double-l). The tense mix is fine across the SDK, but the cancel spelling inconsistency is a real bug.
- **Category:** 13 (verb-tense inconsistency), 17 (US/UK spelling inconsistency for "cancel").
- **Suggested name:** Pick one cancel spelling. The wire is `CANCELED` (single-l) per this enum and `CANCELLED` per `ServiceErrorCode`. Resolve at wire level.
- **Rationale:** Twin spellings of the same English word in adjacent enums in the same file is a maintenance hazard. Compare `StatementStatus_State.CANCELED` to `ServiceErrorCode.CANCELLED`.

### 11. `StatementResponse.statementId` collides with `QueryResponseStatus.statementId` (sibling package) — `src/v1/model.ts:498`, `queryexecution model.ts:102`
- **Why weird:** A user importing from both `statementexecution` and `queryexecution` finds a `statementId` field on responses from both packages. In `statementexecution` it identifies the SQL Statement Execution submission. In `queryexecution` (a published-dashboard query) the JSDoc explicitly says "The statement_id should be identical to data_token in SuccessStatus and PendingStatus" — i.e. it's an audit copy, not a primary key. The same name means different things in two adjacent packages.
- **Category:** 12 (duplicate concept — same name, different meaning), 19 (underspecified ID — what kind of statement?).
- **Suggested name:** Keep `statementId` here (primary identifier); rename the audit-only copy in `queryexecution` (see `queryexecution.md` Finding #14).
- **Rationale:** Cross-package consistency; this package is the canonical home of `statementId`.

### 12. `warehouseId` field — `src/v1/model.ts:158`
- **Why weird:** Required field in practice (no statement can execute without it) but typed `string | undefined`. The JSDoc links to docs about SQL warehouses, which is good. The name is fine; the modality is wrong — every required field on the request is optional at the type level because the generator emits all fields as `optional`. Flagged for the consistency observation #27.
- **Category:** 16 (field contradicts type domain — "required" per docs, optional in TS).
- **Suggested name:** Make required: `warehouseId: string`.
- **Rationale:** Wire requirements should propagate into TS types where possible.

### 13. `rowLimit` vs `byteLimit` — both optional, asymmetric defaults — `src/v1/model.ts:176, 184`
- **Why weird:** Two parallel "limit" fields; `rowLimit` has no default mentioned; `byteLimit` mentions a "100 GiB default if not explicitly set" for `EXTERNAL_LINKS` disposition. The asymmetric defaults aren't captured by the types. JSDoc encodes them; users have to read both.
- **Category:** 16 (field-vs-domain — domain has implicit defaults the type doesn't show), 17 (asymmetric defaults).
- **Suggested name:** Names are fine; consolidate JSDoc so both fields document defaults symmetrically.
- **Rationale:** Pair-fields should have parallel JSDoc structure.

### 14. `parameters` field carries `StatementParameter[]` — `src/v1/model.ts:308`
- **Why weird:** Field name is `parameters`. Element type is `StatementParameter`. The element name is more specific (statement parameter) than the field (parameters). At the JSDoc level, the field describes "parameter markers" — which is yet a third name for the same concept. So users see: `parameters` (field) vs `StatementParameter` (element type) vs "parameter markers" (docs). Pick one vocabulary.
- **Category:** 12 (duplicate concept — three names for one idea), 17 (inconsistent vocabulary).
- **Suggested name:** Either rename the element type to `Parameter` (less qualified than field) or rename the field to `statementParameters`. The wire shape probably matters; pick the less verbose option.
- **Rationale:** Multiple synonyms for one concept burns reader attention.

### 15. `ServiceError` carries an open-ended `errorCode` and `message` — `src/v1/model.ts:473`
- **Why weird:** Type is named `ServiceError`. SDK already has canonical error types in `@databricks/sdk-databricks/apierror` — `ApiError` and friends. A `ServiceError` type that lives inside one API package and exposes its own enum is parallel to the SDK's canonical error type but doesn't interop. So a user catching errors might encounter both `ApiError` (from the transport layer) and a `StatementStatus.error: ServiceError` (from a 200-OK statement-failed response). Two error shapes for one user-facing problem.
- **Category:** 12 (duplicate concept — overlaps `ApiError`), 6 (misleading — "Service" qualifier doesn't say which service), 14 (Java/Go-style `ServiceError`).
- **Suggested name:** `StatementError` (or fold into `ApiError` extensions). The errorCode should reuse the canonical apierror codes per #2.
- **Rationale:** Multiple error type shapes per SDK is a cognitive tax.

### 16. `StatementStatus.sqlState` field — `src/v1/model.ts:522`
- **Why weird:** Field name `sqlState`. The JSDoc says "SQLSTATE error code returned when the statement execution fails." The all-caps acronym SQLSTATE is the SQL-standard 5-character status code (e.g. `42S22`). The TS field uses camelCase `sqlState`. Compare to elsewhere in the SDK where SQL is also lowercased (`sqlExpression`, `sqlText`). This is consistent SDK-wide.
- **Category:** 3 (acronym casing — `SQL` becoming `sql` is debatable; SDK has settled on lowercase, so this matches).
- **Suggested name:** Keep `sqlState`. Flagged for completeness.
- **Rationale:** TS convention varies on multi-letter acronyms; google-ts-style says lowercase initial; SDK follows the convention.

### 17. `ServiceErrorCode.CANCELLED` (double-l) vs `StatementStatus_State.CANCELED` (single-l) — `src/v1/model.ts:62, 90`
- **Why weird:** Same English word, two spellings, in two enums in the same file. `CANCELLED` is British; `CANCELED` is American. The wire chose differently for the two enums; the SDK mirrors the wire. End users have to remember "cancel with one or two Ls".
- **Category:** 13 (spelling/tense inconsistency — see #10), 17 (asymmetric pair).
- **Suggested name:** Normalise upstream. If kept, document the spelling difference in `@databricks/sdk-databricks` README.
- **Rationale:** The spelling difference is invisible in casual scanning but breaks copy/paste.

### 18. `waitTimeout` is a string-encoded duration — `src/v1/model.ts:264`
- **Why weird:** `waitTimeout?: string` with JSDoc explaining it must be formatted as `"Ns"` where N is 0 or 5-50. So a *typed string* with a private DSL inside. Users will write `"5s"` and hope, or worse: `5` (number, won't compile). The wire format is a proto Duration, but the TS surface could parse `number` (seconds) or `Duration` (ms) and emit `Ns`.
- **Category:** 1 (vague — `string`-typed numeric), 6 (misleading — a "timeout" with arbitrary string content), 14 (proto/Go-style — Duration carry-over).
- **Suggested name:** Keep `waitTimeout` but change the type to `number` (seconds) and let the marshaller produce `Ns`. Or `Duration` from `@databricks/sdk-core/wkt`.
- **Rationale:** Letting users pass arbitrary strings into a numeric field is a contract violation waiting to happen.

### 19. `onWaitTimeout` field with `TimeoutAction` enum — `src/v1/model.ts:272`
- **Why weird:** Field is `onWaitTimeout`, type is `TimeoutAction`. The two names don't share the prefix `Wait*` even though they're tightly coupled. A reader sees `onWaitTimeout?: TimeoutAction` and has to chase the docs to learn the enum members are about wait-timeouts.
- **Category:** 17 (asymmetric field/type naming), 12 (duplicate concept — `Wait`/`Timeout` overloaded).
- **Suggested name:** Rename the enum to `OnWaitTimeoutAction` or, per #5, `OnTimeout`.
- **Rationale:** Field/type symmetry is a strong signal.

### 20. `chunkIndex` field type is `number` in URL path — `src/v1/client.ts:187`
- **Why weird:** The chunk index is a JS `number` (potentially `undefined`). The URL builder uses `String(req.chunkIndex ?? '')` which produces the empty string when undefined — meaning the URL silently becomes `/result/chunks/` (trailing slash, no index) on an unset value. The client emits the request anyway. This is a footgun that the type name doesn't help with: `chunkIndex?: number | undefined` should probably be required.
- **Category:** 16 (field contradicts domain — required in URL, optional in type), 19 (underspecified — what does `undefined` mean for a path component?).
- **Suggested name:** Make required: `chunkIndex: number`. Method should refuse to send an empty path component.
- **Rationale:** Naming + modality mismatch becomes a real bug at the URL level.

### 21. `truncated` field on `ResultManifest` is ambiguously boolean — `src/v1/model.ts:464`
- **Why weird:** A `truncated?: boolean | undefined` field. The JSDoc says "Indicates whether the result is truncated due to `row_limit` or `byte_limit`." But the field doesn't say *which* limit caused truncation. If truncation is rare, the user has to inspect both limits to figure out why. The name doesn't carry that information; a `truncationReason` field would.
- **Category:** 1 (vague — boolean doesn't capture cause), 16 (field underdetermines domain).
- **Suggested name:** Keep `truncated` but pair with an optional `truncationReason: 'rows' | 'bytes'` (or have the wire surface a reason).
- **Rationale:** Boolean fields that conceal a richer enumeration are an anti-pattern.

### 22. `chunks` array + `totalChunkCount` redundancy — `src/v1/model.ts:453-462`
- **Why weird:** `ResultManifest.chunks` is an array of `ChunkInfo`; `totalChunkCount` is `chunks.length`. The two carry the same information; on the wire there is a sender-receiver invariant, but TS users can compute one from the other. The naming gives no hint of the redundancy.
- **Category:** 12 (duplicate concept), 1 (vague — both fields are about the same property).
- **Suggested name:** Drop `totalChunkCount`; users compute via `chunks?.length`.
- **Rationale:** Two fields that mean the same thing should not both be public.

### 23. `dataArray` JSDoc references `JSON_ARRAY` format — `src/v1/model.ts:418`
- **Why weird:** Field JSDoc: "The `JSON_ARRAY` format is an array of arrays of values, where each non-null value is formatted as a string. Null values are encoded as JSON `null`." The field is only populated when `format === JSON_ARRAY`. The type doesn't reflect this conditional: `dataArray?: JsonValue[][] | undefined`. A user setting `format=CSV` will see `dataArray` undefined and have to chase JSDoc to learn it's intentional.
- **Category:** 16 (field-vs-format contradicts domain when format differs).
- **Suggested name:** Make `ResultData` a discriminated union over `format`. Names stay; the type changes.
- **Rationale:** Optional fields whose presence depends on another field should be modelled as discriminated unions.

### 24. `externalLinks?: ExternalLink[]` + `dataArray?: JsonValue[][]` mutual exclusivity — `src/v1/model.ts:417, 422`
- **Why weird:** Companion to #23. The JSDoc literally says "Exactly one of these alternatives is used." TypeScript has discriminated unions; the type doesn't use them. So both fields are simultaneously `?: undefined` at the type level; the user must conditionally narrow.
- **Category:** 16 (mutual exclusivity not modelled), 17 (asymmetric pair).
- **Suggested name:** Discriminate on `disposition` — names unchanged; type shape changes.
- **Rationale:** Two-of-N fields where only one is populated should be modelled as a union.

### 25. `executeCall` and `executeHttpCall` in utils — `src/v1/utils.ts:26, 65`
- **Why weird:** Two `execute*` functions in the same file, one wraps retry/rate-limit policy and one does the actual HTTP. Same as `queryexecution.md` Finding #21.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithPolicies` + `sendHttpRequest`.
- **Rationale:** Generator-wide.

### 26. `buildHttpRequest` helper — `src/v1/utils.ts:96`
- **Why weird:** "Build" implies builder pattern; this is a 16-line object literal. Same as `queryexecution.md` Finding #22.
- **Category:** 1, 6.
- **Suggested name:** `makeHttpRequest` or inline.

### 27. Every field on every request type is optional — `src/v1/model.ts` (every interface)
- **Why weird:** `warehouseId`, `statement`, `chunkIndex`, `statementId` — all required at the wire level — are all `?: T | undefined` at the TS level. The codegen emits everything as optional to keep round-tripping simple. The names don't communicate which fields are required; the JSDoc occasionally does (statement: "the SQL statement to execute"). A user can call `executeStatement({})` and only learn it's wrong at runtime.
- **Category:** 16 (field contradicts domain — required-in-wire, optional-in-TS), 1 (modality silently lost).
- **Suggested name:** N/A — the names are fine, the modality is wrong. Mark required fields as required (no `?`).
- **Rationale:** Same finding as `commandexecution.md` and `queryexecution.md`; generator-wide.

### 28. `StatementResponse` is the response of *two* methods — `src/v1/model.ts:493`, `src/v1/client.ts:151, 222`
- **Why weird:** Both `executeStatement()` and `getStatementResult()` return `StatementResponse`. The name `StatementResponse` is generic enough to cover both — but a reader can't tell from the type which method produced it. The contents differ subtly: `executeStatement` may return `PENDING`; `getStatementResult` returns terminal states only. Two operations with one response type is fine if the response is genuinely one shape, but the JSDoc on the response should disambiguate, and the audit-only `statementId` collision (per #11) suggests this is the wrong abstraction.
- **Category:** 6 (misleading — type is overloaded), 12 (duplicate concept — two operations).
- **Suggested name:** Keep `StatementResponse` but document that it's polymorphic. Or split into `StatementSubmissionResponse` + `StatementStateResponse`.
- **Rationale:** Shared response types are acceptable but should be flagged for documentation.

### 29. `ServiceError` — `Service` is architectural-layer leak — `src/v1/model.ts:473`
- **Why weird:** Mid-position `Service` qualifier names an architectural layer ("the service tier"), not a domain concept. The wire payload is a per-statement error carried in `StatementStatus.error`; the "service" is the SQL Statement Execution backend, but that role isn't user-facing. A TS consumer reads `error: ServiceError` and sees an architectural noun rather than the domain concept (statement execution error). #15 already flags the type for overlap with `ApiError`; this finding flags the `Service` mid-position as a proto/Java-RPC architectural leak.
- **Category:** 14 (proto/Java/Go-style architectural mid-position qualifier).
- **Suggested name:** `StatementError` — domain-named, mirrors the surrounding `Statement*` vocabulary.
- **Rationale:** Architectural-layer words ("Service", "Server", "Backend") in user-facing type names are proto/RPC framework carry-overs. Domain-named alternatives compose better with the rest of the package surface.

### 30. `ServiceErrorCode` — `Service` is architectural-layer leak — `src/v1/model.ts:53`
- **Why weird:** Same `Service` mid-position architectural leak as #29, applied to the code enum. #2 already flags the enum for duplicating `google.rpc.Code`; this finding flags the `Service` qualifier specifically as a proto-RPC architectural noun.
- **Category:** 14 (proto/Java/Go-style architectural mid-position qualifier).
- **Suggested name:** `StatementErrorCode` if the enum is retained; ideally fold into canonical `apierror/codes` per #2.
- **Rationale:** Pair with #29 — the `Service` qualifier carries no domain meaning at the use site.

### 31. `StatementStatus_State` — proto-style nested-type underscore — `src/v1/model.ts:84`
- **Why weird:** Underscore-joined identifier `StatementStatus_State` directly transcribes the proto nested-message name into TS. The source file even carries an `eslint-disable` for `@typescript-eslint/naming-convention` with the comment "Proto-style nested enum name." That comment confirms it: the name is a verbatim proto leak, not a TS-idiomatic choice. As a top-level export from `index.ts`, every consumer sees the underscore.
- **Category:** 14 (proto/protobuf naming carry-over), 9 (non-idiomatic identifier shape).
- **Suggested name:** `StatementState` (the `Status` parent is itself a thin wrapper; the state is the meaningful enum) or `StatementStatusState` (no underscore) if both halves matter.
- **Rationale:** Proto nested-type underscores are an artefact of code generation from `.proto`. TS has no nested-type concept; flattening to a single CamelCase name removes the leak.

### 32. `ExternalLink_HttpHeadersEntry` — proto map-entry leak — `src/v1/model.ts:376`
- **Why weird:** Another underscore-joined name with the same `eslint-disable` and an explicit "Proto-style nested message name" comment. The type exists because proto3 represents `map<string, string>` as a synthetic nested `*Entry` message; gRPC generators surface this as a nested type. In TS the wire shape is just `Record<string, string>` (see `httpHeaders` on `ExternalLink`). Re-exporting `ExternalLink_HttpHeadersEntry` from `index.ts` exposes proto machinery the JS user never needs.
- **Category:** 14 (proto/protobuf naming carry-over), 9 (non-idiomatic identifier shape), 12 (duplicate concept — `httpHeaders` is already typed `Record<string, string>`).
- **Suggested name:** Delete the type. The `httpHeaders` field is already `Record<string, string> | undefined`; no consumer needs the synthetic map-entry pair.
- **Rationale:** Proto `map<K, V>` synthetic `*Entry` messages should not surface in user-facing TS types. The information is fully captured by `Record<K, V>`.

### 33. `*_UNSPECIFIED` enum zero values — `src/v1/model.ts:41, 47, 78, 85`
- **Why weird:** Four enums (`Disposition`, `Format`, `TimeoutAction`, `StatementStatus_State`) carry a `FETCH_DISPOSITION_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `TIMEOUT_ACTION_UNSPECIFIED`, `STATE_UNSPECIFIED` first variant. These are proto3 enum convention: every enum must have a `_UNSPECIFIED = 0` member because the default scalar value is required to be valid. JS/TS has no such constraint — `undefined` already encodes "not specified". So the enums carry a value that exists *only* to satisfy proto3 codegen requirements. End users have to filter out the unspecified variant manually when narrowing.
- **Category:** 14 (proto/protobuf convention leak), 6 (misleading — the variant has no domain meaning), 1 (vague — `UNSPECIFIED` is the literal default state).
- **Suggested name:** Drop the `*_UNSPECIFIED` variants. TS uses `Disposition | undefined` for "not set".
- **Rationale:** Proto3 zero-value enums are a wire-format constraint that has no equivalent in JSON/TS. Carrying them in the type surface forces users to handle a case that cannot occur in a well-formed response.

## Low severity

### 34. `chunkIndex` vs `nextChunkIndex` naming pair — `src/v1/model.ts:107, 122`
- **Why weird:** A `ChunkInfo` has `chunkIndex` (this chunk's index) and `nextChunkIndex` (the *next* chunk's index). The pair is consistent. But the `ChunkInfo` is also used in two contexts (manifest array, in-chunk metadata), and the wire shape doesn't always populate `nextChunkIndex`. Names are fine but the duplication across two distinct uses is worth flagging.
- **Category:** 17 (acceptable asymmetry).
- **Suggested name:** Keep.

### 35. `rowOffset`, `rowCount`, `byteCount` triple — `src/v1/model.ts:109, 111, 116`
- **Why weird:** Three integer fields on `ChunkInfo` (and parallel on `ExternalLink` and `ResultData`) that record per-chunk metrics. The pattern is the same across types; consider extracting to a shared `ChunkMetrics` mixin. The names are fine.
- **Category:** 12 (duplicate concept — three types carry the same fields).
- **Suggested name:** Extract `ChunkMetrics` shared interface.
- **Rationale:** Trio-replicated types are a tell.

### 36. `ColumnInfo.typeText` vs `typeName` — `src/v1/model.ts:135, 137`
- **Why weird:** `typeText` is "the full SQL type specification" (e.g. `DECIMAL(10,2)`). `typeName` is the base type name (`DECIMAL`). The pair is intentional but the names don't make the relationship obvious — `typeText` and `typeName` sound interchangeable.
- **Category:** 17 (asymmetric pair — `Text` vs `Name`), 1 (vague — `Text` of what?).
- **Suggested name:** `typeSql` (the wire SQL text) + `typeBase` (the base type) — but the wire is canonical, so keep names. Document the relationship.

### 37. `httpHeaders` value type loses sensitivity context — `src/v1/model.ts:349`
- **Why weird:** JSDoc says "Headers are typically used to pass a decryption key to the external service. The values of these headers should be considered sensitive and the client should not expose these values in a log." So this is a security-sensitive map. The TS type doesn't signal this. Names like `secretHeaders` or wrapper types like `SensitiveString` would surface the constraint.
- **Category:** 16 (field-vs-domain contradiction — sensitive content with normal-string type).
- **Suggested name:** Keep `httpHeaders` but tag the type or document at the type level.
- **Rationale:** Optional/low-priority but worth noting.

### 38. `Schema` type is a top-level export with a maximally overloaded name — `src/v1/model.ts:468`
- **Why weird:** The name `Schema` is one of the most overloaded words in SDK ecosystems (validation schemas, database schemas, JSON schemas). Exported at the top level of the package, a consumer importing `Schema` from `@databricks/sdk-statementexecution` collides with any other `Schema` they pull in.
- **Category:** 1 (vague — `Schema` is overloaded), 10 (reserved-word-ish), 15 (generic top-level export).
- **Suggested name:** `ResultSchema` (or `ColumnSchema`) to disambiguate from other schema concepts.

### 39. `QueryTag.key` and `QueryTag.value` — `src/v1/model.ts:404-405`
- **Why weird:** Generic key-value pair. Same as #36 but for tags. `tagKey` + `tagValue` are common alternatives.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** Acceptable in context.

### 40. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
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

### O-2. Statement IDs share a vocabulary with `queryexecution` and `queryhistory`.
- All three packages emit some flavour of `statementId`. The naming should be
  unified at the apierror / statement-vocabulary layer if it matters.

### O-3. Module-level JSDoc lives in leaf files instead of `index.ts`.
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
the cross-package vocabulary alignment (#11, #17).

---

## Themes

1. **Per-package error-code enum.** `ServiceErrorCode` mimics `google.rpc.Code` inside a single API package, parallel to the canonical `apierror/codes` module. Generator-wide; the fix is to map wire codes through the canonical apierror layer.
2. **Generic top-level names.** `Format`, `Disposition`, `Schema`, `Client`, `ServiceError`. Each one is fine in isolation but collides with the surrounding ecosystem (other SDKs, zod, language builtins).
3. **Package-name competition.** `statementexecution` lives alongside `queryexecution`, `commandexecution`, and `queries` — four near-synonymous names for related-but-distinct execution surfaces.
4. **Polymorphic types pretending to be flat.** `ResultData` (inline vs external links), `StatementResponse` (executeStatement vs getStatementResult), `ChunkInfo` (manifest entry vs response chunk). Discriminated unions would surface the variants.
5. **Proto/RPC architectural leaks.** `Service` mid-position on `ServiceError` / `ServiceErrorCode` (architectural-layer noun); `StatementStatus_State` and `ExternalLink_HttpHeadersEntry` proto-style underscored nested names; `*_UNSPECIFIED` enum zero values across four enums. Each is a verbatim transcription of proto/gRPC machinery into TS where the equivalent concept (`undefined`, `Record<K, V>`, flat enums) is already idiomatic.
