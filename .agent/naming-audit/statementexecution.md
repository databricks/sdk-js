# Naming Audit: statementexecution

**Package:** `@databricks/sdk-statementexecution`
**Path:** `packages/statementexecution/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

**Total weird names flagged:** 17

## Summary

| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 10 |
| Low | 2 |

## High severity

### 1. `Disposition` enum lacks SDK context — `src/v1/model.ts:45`
- **Why weird:** Enum name is `Disposition` — a generic noun (`Content-Disposition` header? business "disposition"?). The enum members `INLINE` and `EXTERNAL_LINKS` are recognisable, but the type name doesn't say "fetch" or "result". A reader who skims `disposition?: Disposition` in `ExecuteStatementRequest` won't know it means "where the result data goes". As a top-level export, `Disposition` collides with any other "disposition" concept a consumer might pull in.
- **Category:** 1 (vague — "Disposition" of what?), 15 (generic top-level export).
- **Suggested name:** `ResultDisposition` or `FetchDisposition`.
- **Rationale:** Top-level enum names should self-describe at use sites. `request.disposition: Disposition` reads as "disposition disposition"; `request.disposition: ResultDisposition` reads correctly.

### 2. `Format` enum is dangerously generic — `src/v1/model.ts:55`
- **Why weird:** A top-level enum literally called `Format` exported from the package. The values `JSON_ARRAY`, `ARROW_STREAM`, `CSV` say this is about *result* format. Combine with #1: a user reading `result.format` sees `Format | undefined` and has to chase down what kind of format. As a top-level export, `Format` collides with any other "format" type a consumer might pull in (Intl, Node:format, lodash, etc.).
- **Category:** 1 (vague — `Format` is the most generic possible name), 10 (reserved-word-ish — `format` is a builtin function name in many ecosystems), 15 (generic name losing meaning at use sites).
- **Suggested name:** `ResultFormat`. Same pattern as #1.
- **Rationale:** Top-level enum names should self-describe at use sites. `result.format: Format` reads as "format format"; `result.format: ResultFormat` reads correctly. The collision risk for a single-word `Format` import is high.

### 3. `TimeoutAction` enum name doesn't tie to the timeout field — `src/v1/model.ts:92`
- **Why weird:** The top-level enum `TimeoutAction` is generic — it doesn't tie back to the field it governs. In context: when the user-supplied `wait_timeout` expires, this field decides whether the statement keeps running asynchronously or is cancelled. The relationship between the enum and the timeout is invisible at the type level.
- **Category:** 1 (vague — action on what?), 15 (generic top-level export).
- **Suggested name:** Rename the enum to `OnTimeout` to match the field `onWaitTimeout`.
- **Rationale:** Top-level enum names should self-describe at use sites and tie to the field they govern.

### 4. `getStatementResult` method conflates "poll" with "fetch result" — `src/v1/client.ts:232`
- **Why weird:** The JSDoc says: "This request can be used to poll for the statement's status. StatementResponse contains `statement_id` and `status`; other fields might be absent or present depending on context. When the `status.state` field is `SUCCEEDED` it will also return the result manifest and the first chunk of the result data." So the method *is* a polling endpoint that *also* returns results when ready. The method name `getStatementResult` foregrounds "result", but the method's primary job is polling. The companion chunk-fetch method `getResultData` (#5) does the actual result fetch, so a reader sees two `getResult*`-shaped methods, one of which only polls.
- **Category:** 6 (misleading — name implies result-fetch, primary purpose is poll), 17 (inconsistent verb usage — `cancel`, `execute`, `getStatementResult`, `getResultData`).
- **Suggested name:** `getStatement` (matches the URL path `/{statementId}`). The Go SDK calls this `GetStatement`. The result is *part* of the response; foregrounding it in the method name misleads.
- **Rationale:** The Databricks API docs name the operation "Get statement" (https://docs.databricks.com/api/workspace/statementexecution/getstatement). The TS SDK should match.

### 5. `getResultData` method drops resource and chunk-index semantics — `src/v1/client.ts:192`
- **Why weird:** Companion to #4. The Databricks public API names this method "Get statement result by chunk index" (https://docs.databricks.com/api/workspace/statementexecution/getstatementresultchunkn). The Go SDK calls it `GetStatementResultChunkN`. The TS SDK shortens to `getResultData`, dropping both the resource ("statement") and the indexing word ("chunk"). The result is that a reader can't tell from the method name what it does or how it relates to `getStatementResult`.
- **Category:** 1 (vague — "result data" is too generic), 6 (misleading — drops the chunk-indexing semantic), 17 (asymmetric with sibling method).
- **Suggested name:** `getResultChunk` (or `getStatementResultChunk` to match Go). Field rename: `chunkIndex` stays.
- **Rationale:** Names should match the official API where possible. Compare to `getStatementResultChunkN` in the Go SDK.

## Medium severity

### 6. `warehouseId` field — `src/v1/model.ts:180`
- **Why weird:** Required field in practice (no statement can execute without it) but typed `string | undefined`. The JSDoc links to docs about SQL warehouses, which is good. The name is fine; the modality is wrong — every required field on the request is optional at the type level because the generator emits all fields as `optional`. Flagged for the consistency observation #11.
- **Category:** 16 (field contradicts type domain — "required" per docs, optional in TS).
- **Suggested name:** Make required: `warehouseId: string`.
- **Rationale:** Wire requirements should propagate into TS types where possible.

### 7. `chunkIndex` field type is `number` in URL path — `src/v1/client.ts:197`
- **Why weird:** The chunk index is a JS `number` (potentially `undefined`). The URL builder uses `String(req.chunkIndex ?? '')` which produces the empty string when undefined — meaning the URL silently becomes `/result/chunks/` (trailing slash, no index) on an unset value. The client emits the request anyway. This is a footgun that the type name doesn't help with: `chunkIndex?: number | undefined` should probably be required.
- **Category:** 16 (field contradicts domain — required in URL, optional in type), 19 (underspecified — what does `undefined` mean for a path component?).
- **Suggested name:** Make required: `chunkIndex: number`. Method should refuse to send an empty path component.
- **Rationale:** Naming + modality mismatch becomes a real bug at the URL level.

### 8. `truncated` field on `ResultManifest` is ambiguously boolean — `src/v1/model.ts:480`
- **Why weird:** A `truncated?: boolean | undefined` field. The JSDoc says "Indicates whether the result is truncated due to `row_limit` or `byte_limit`." But the field doesn't say *which* limit caused truncation. If truncation is rare, the user has to inspect both limits to figure out why. The name doesn't carry that information; a `truncationReason` field would.
- **Category:** 1 (vague — boolean doesn't capture cause), 16 (field underdetermines domain).
- **Suggested name:** Keep `truncated` but pair with an optional `truncationReason: 'rows' | 'bytes'` (or have the wire surface a reason).
- **Rationale:** Boolean fields that conceal a richer enumeration are an anti-pattern.

### 9. `dataArray` JSDoc references `JSON_ARRAY` format — `src/v1/model.ts:438`
- **Why weird:** Field JSDoc: "The `JSON_ARRAY` format is an array of arrays of values, where each non-null value is formatted as a string. Null values are encoded as JSON `null`." The field is only populated when `format === JSON_ARRAY`. The type doesn't reflect this conditional: `dataArray?: JsonValue[][] | undefined`. A user setting `format=CSV` will see `dataArray` undefined and have to chase JSDoc to learn it's intentional.
- **Category:** 16 (field-vs-format contradicts domain when format differs).
- **Suggested name:** Make `ResultData` a discriminated union over `format`. Names stay; the type changes.
- **Rationale:** Optional fields whose presence depends on another field should be modelled as discriminated unions.

### 10. `externalLinks?: ExternalLink[]` + `dataArray?: JsonValue[][]` mutual exclusivity — `src/v1/model.ts:433, 438`
- **Why weird:** Companion to #9. The JSDoc literally says "Exactly one of these alternatives is used." TypeScript has discriminated unions; the type doesn't use them. So both fields are simultaneously `?: undefined` at the type level; the user must conditionally narrow.
- **Category:** 16 (mutual exclusivity not modelled), 17 (asymmetric pair).
- **Suggested name:** Discriminate on `disposition` — names unchanged; type shape changes.
- **Rationale:** Two-of-N fields where only one is populated should be modelled as a union.

### 11. Every field on every request type is optional — `src/v1/model.ts` (every interface)
- **Why weird:** `warehouseId`, `statement`, `chunkIndex`, `statementId` — all required at the wire level — are all `?: T | undefined` at the TS level. The codegen emits everything as optional to keep round-tripping simple. The names don't communicate which fields are required; the JSDoc occasionally does (statement: "the SQL statement to execute"). A user can call `executeStatement({})` and only learn it's wrong at runtime.
- **Category:** 16 (field contradicts domain — required-in-wire, optional-in-TS), 1 (modality silently lost).
- **Suggested name:** N/A — the names are fine, the modality is wrong. Mark required fields as required (no `?`).
- **Rationale:** Generator-wide pattern — the codegen emits every request field as optional across packages.

### 12. `ServiceError` — `Service` is architectural-layer leak — `src/v1/model.ts:489`
- **Why weird:** Mid-position `Service` qualifier names an architectural layer ("the service tier"), not a domain concept. The wire payload is a per-statement error carried in `StatementStatus.error`; the "service" is the SQL Statement Execution backend, but that role isn't user-facing. A TS consumer reads `error: ServiceError` and sees an architectural noun rather than the domain concept (statement execution error).
- **Category:** 14 (proto/Java/Go-style architectural mid-position qualifier).
- **Suggested name:** `StatementError` — domain-named, mirrors the surrounding `Statement*` vocabulary.
- **Rationale:** Architectural-layer words ("Service", "Server", "Backend") in user-facing type names are proto/RPC framework carry-overs. Domain-named alternatives compose better with the rest of the package surface.

### 13. `ServiceErrorCode` — `Service` is architectural-layer leak — `src/v1/model.ts:64`
- **Why weird:** Same `Service` mid-position architectural leak as #12, applied to the code enum. A TS consumer reads `ServiceErrorCode` and sees an architectural noun rather than the domain concept.
- **Category:** 14 (proto/Java/Go-style architectural mid-position qualifier).
- **Suggested name:** `StatementErrorCode`.
- **Rationale:** Pair with #12 — the `Service` qualifier carries no domain meaning at the use site.

### 14. `StatementStatus_State` — proto-style nested-type underscore — `src/v1/model.ts:102`
- **Why weird:** Underscore-joined identifier `StatementStatus_State` directly transcribes the proto nested-message name into TS. The source file even carries an `eslint-disable` for `@typescript-eslint/naming-convention` with the comment "Proto-style nested enum name." That comment confirms it: the name is a verbatim proto leak, not a TS-idiomatic choice. As a top-level export from `index.ts`, every consumer sees the underscore.
- **Category:** 14 (proto/protobuf naming carry-over), 9 (non-idiomatic identifier shape).
- **Suggested name:** `StatementState` (the `Status` parent is itself a thin wrapper; the state is the meaningful enum) or `StatementStatusState` (no underscore) if both halves matter.
- **Rationale:** Proto nested-type underscores are an artefact of code generation from `.proto`. TS has no nested-type concept; flattening to a single CamelCase name removes the leak.

### 15. `*_UNSPECIFIED` enum zero values — `src/v1/model.ts:46, 56, 93, 103`
- **Why weird:** Four enums (`Disposition`, `Format`, `TimeoutAction`, `StatementStatus_State`) carry a `FETCH_DISPOSITION_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `TIMEOUT_ACTION_UNSPECIFIED`, `STATE_UNSPECIFIED` first variant. These are proto3 enum convention: every enum must have a `_UNSPECIFIED = 0` member because the default scalar value is required to be valid. JS/TS has no such constraint — `undefined` already encodes "not specified". So the enums carry a value that exists *only* to satisfy proto3 codegen requirements. End users have to filter out the unspecified variant manually when narrowing.
- **Category:** 14 (proto/protobuf convention leak), 6 (misleading — the variant has no domain meaning), 1 (vague — `UNSPECIFIED` is the literal default state).
- **Suggested name:** Drop the `*_UNSPECIFIED` variants. TS uses `Disposition | undefined` for "not set".
- **Rationale:** Proto3 zero-value enums are a wire-format constraint that has no equivalent in JSON/TS. Carrying them in the type surface forces users to handle a case that cannot occur in a well-formed response.

## Low severity

### 16. `httpHeaders` value type loses sensitivity context — `src/v1/model.ts:371`
- **Why weird:** JSDoc says "Headers are typically used to pass a decryption key to the external service. The values of these headers should be considered sensitive and the client should not expose these values in a log." So this is a security-sensitive map. The field name doesn't signal this. A name like `secretHeaders` would surface the constraint at the use site.
- **Category:** 16 (field-vs-domain contradiction — sensitive content, neutral field name).
- **Suggested name:** `secretHeaders`, or document the sensitivity at the type level.
- **Rationale:** Optional/low-priority but worth noting.

### 17. `Schema` type is a top-level export with a maximally overloaded name — `src/v1/model.ts:484`
- **Why weird:** The name `Schema` is one of the most overloaded words in SDK ecosystems (validation schemas, database schemas, JSON schemas). Exported at the top level of the package, a consumer importing `Schema` from `@databricks/sdk-statementexecution` collides with any other `Schema` they pull in.
- **Category:** 1 (vague — `Schema` is overloaded), 10 (reserved-word-ish), 15 (generic top-level export).
- **Suggested name:** `ResultSchema` (or `ColumnSchema`) to disambiguate from other schema concepts.
