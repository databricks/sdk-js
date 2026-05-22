# Naming Audit: genie

**Path:** `packages/genie/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks "Genie" — natural-language data interface. The unit of organisation is a `GenieSpace` (a workspace scoped to a warehouse + a set of dataset/instructions); inside a space, users `startConversation` and exchange `Message`s; messages produce `GenieAttachment`s (text / SQL query / suggested follow-up questions); SQL attachments execute against the warehouse and yield `Result`s (`StatementResponse` shapes copied from the statement-execution API). The package also exposes "Eval" — a benchmarking flow (`EvalRun` → `EvalResult` → `EvalResultDetails` with LLM-judge scoring).
**Total weird names flagged:** 62

## Summary
| Severity | Count |
| --- | --- |
| High | 15 |
| Medium | 24 |
| Low | 18 |
| Observation | 5 |

## High severity

### 1. Method naming wildly inconsistent: 28 of 30 methods are `genieXxx`, 2 are bare — `src/v1/client.ts:131,1038`
- **Why weird:** `client.ts` exposes 30 public methods. 28 are prefixed `genie` (e.g. `genieCreateConversationMessage`, `genieGetSpace`, `genieListSpaces`, `genieTrashSpace`). Two are not: `createSpace` (line 131) and `updateSpace` (line 1038). Reader calling `client.createSpace(...)` then trying `client.deleteSpace(...)` discovers the delete equivalent is named `genieTrashSpace(...)`. The "trash" method name is also inconsistent (see #2).
- **Category:** 17 (inconsistent action verbs / prefix), 6 (misleading — autocomplete shows two naming families).
- **Suggested name:** Pick one and apply uniformly. Either drop the `genie` prefix everywhere (the package is already `@databricks/sdk-genie` — the prefix is tautological) or keep it everywhere (`genieCreateSpace`, `genieUpdateSpace`). Strongly prefer the former.
- **Rationale:** Every method in the client is on a Genie `Client` imported from `@databricks/sdk-genie`. Prefixing every method with `genie` is type-suffix tautology — `client.genieListSpaces()` is no clearer than `client.listSpaces()`. The current half-prefixed surface is the worst of both options.

### 2. `genieTrashSpace` is the only delete-style method named `Trash` — `src/v1/client.ts:1019`
- **Why weird:** All other delete methods are `genieDeleteX` (`genieDeleteConversation`, `genieDeleteConversationMessage`). The space delete is `genieTrashSpace` and the request type is `GenieTrashSpaceRequest`. JSDoc says "Move a Genie Space to the trash" — i.e. it is a soft delete, not a destructive one — but the name still breaks the `delete*` pattern.
- **Category:** 17 (inconsistent action verb), 14 (Go/Java-style "trash" verb is uncommon in JS SDKs).
- **Suggested name:** `genieDeleteSpace` (matches the other deletes; document the soft-delete semantics in JSDoc) or, if soft-delete needs to be explicit, mirror it on the messages too (`genieTrashConversationMessage`).
- **Rationale:** Inconsistency forces every reader to learn the exception. The "soft delete" semantic can be conveyed by docs without leaking into the verb.

### 3. `genieExecuteMessageAttachmentQuery` vs `genieGetMessageAttachmentQueryResult` vs `genieGenerateDownloadFullQueryResult` — three different verbs for retrieving the same data — `src/v1/client.ts:308,564,396`
- **Why weird:** The package has at least four "get the SQL result" entry points (`Execute`, `Get`, `Generate`, plus `genieGetQueryResultByAttachment`/`genieGetMessageQueryResult` deprecated aliases). Each uses a different verb stem. `Execute` re-runs the query; `Get` reads the result; `Generate` initiates a download — but the user has to read each docstring to learn that.
- **Category:** 17 (inconsistent action verbs), 7 (overly verbose).
- **Suggested name:** Group with verb pairs: `runMessageAttachmentQuery` (re-execute) / `getMessageAttachmentQueryResult` (read) / `startMessageAttachmentDownload` + `getMessageAttachmentDownload` (download flow).
- **Rationale:** The verbs `Execute` / `Get` / `Generate` overlap in everyday English; the type system gives no hint which one to call first. The current names are generator-faithful but unhelpful for users.

### 4. `Genie*` prefix on every type — type-suffix tautology — `src/v1/model.ts` (~40 types)
- **Why weird:** 40 of ~70 types are prefixed `Genie`: `GenieAttachment`, `GenieConversation`, `GenieMessage`, `GenieSpace`, `GenieFeedback`, `GenieEvalResult`, etc. The package is `@databricks/sdk-genie` and types are imported as `import {GenieMessage} from '@databricks/sdk-genie'`. The prefix duplicates the package identity. Other types in the same file have no prefix (`Result`, `ResultData`, `ResultManifest`, `StatementResponse`, `StatementStatus`, `Schema`, `Struct`, `ListValue`, `ChunkInfo`, `MessageError`, `MessageStatus`, `Thought`, `TextAttachment`, etc.) — so the prefix is not even applied consistently.
- **Category:** 20 (type-suffix tautology), 17 (prefix applied inconsistently within the same package).
- **Suggested name:** Drop the prefix wherever the unprefixed name is unambiguous: `Conversation`, `Message`, `Space`, `Attachment`, `Feedback`, `EvalResult`. Keep `Genie` only where collision with a copied-in shared type would arise (e.g. keep `GenieResultMetadata` if you also need to keep `ResultManifest`).
- **Rationale:** `import {Message} from '@databricks/sdk-genie'` is unambiguous (the package is the namespace). The current prefix turns every import line into noise.

### 5. `GenieSpace` — domain meaning of "Space" is opaque without docs — `src/v1/model.ts:1458`
- **Why weird:** The central noun. A `GenieSpace` is a "workspace scoped to a Genie deployment", but the word `Space` is one of the most overloaded terms in the Databricks SDK (it also appears in workspace, mlflow registered model, dashboards, etc.). Type doc on the class itself is one line ("Genie space ID"). Reader sees `GenieSpace` and has to consult external docs to learn whether it's a folder, a user-permission boundary, a model-deployment, or something else.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning — `Space`).
- **Suggested name:** `GenieRoom`, `GenieAgent`, `GenieDeployment`, or at minimum a JSDoc on the type explaining what a "space" *is* (warehouse + datasets + instructions). If "Space" is the Databricks product-marketing term, document it inline.
- **Rationale:** This is the package's central concept. Letting it stand on a single word that means "container" is a documentation gap as much as a naming bug.

### 6. Statement-execution types duplicated wholesale into genie — `src/v1/model.ts:5-30,33-531,543-548,754-884,1589-1694`
- **Why weird:** 15+ types are byte-for-byte copies of types in the `statementexecution`, `sql` and `apierror` packages: `ColumnTypeName` (enum, 28 values), `ErrorCode` (enum, 80 values, with line-for-line JSDoc), `Format` (enum), `ChunkInfo`, `ColumnInfo`, `ColumnMask`, `DatabricksServiceExceptionProto`, `ExternalLink`, `ExternalLink_HttpHeadersEntry`, `PolicyFunctionArgument`, `Result`, `ResultData`, `ResultManifest`, `Schema`, `StatementResponse`, `StatementStatus`, `StatementStatus_State`. The file even copies the Google-Well-Known-Types (`Struct`, `Value`, `ListValue`, `MapStringValueEntry`).
- **Category:** 12 (duplicate concept across packages).
- **Suggested name:** Import from `@databricks/sdk-databricks/statementexecution` (or wherever the originals live). If the generator can't yet cross-link, mark each duplicate `@internal` or move them to a shared internal module.
- **Rationale:** A consumer who imports both `@databricks/sdk-genie` and `@databricks/sdk-sql` ends up with two structurally-identical-but-nominally-distinct `StatementResponse` types — runtime values are not assignable to each other in strict mode. This is the biggest correctness footgun in the package.

### 7. `ErrorCode` enum (80 values, ~60% deprecated) duplicated from apierror — `src/v1/model.ts:33-531`
- **Why weird:** ErrorCode is copied verbatim from the SDK's apierror codes package. Of the 80 values, comments explicitly mark ~50 as deprecated. The enum is only referenced via the copied `DatabricksServiceExceptionProto` type, which is itself unused by any Genie method (the SDK uses `ApiError.fromHttpError` in `utils.ts:88`).
- **Category:** 12 (duplicate concept), 18 (long enum values — `MAX_NOTEBOOK_SIZE_EXCEEDED`, `MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST`, `RESOURCE_DOES_NOT_EXIST`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`).
- **Suggested name:** Import from `@databricks/sdk-databricks/apierror/codes`. Remove the local copy.
- **Rationale:** 500 lines of code duplicate a separate package. Maintenance hazard: deprecation removals or additions to the canonical enum will diverge silently.

### 8. `ScoreReason` enum mixes three prefix families and keeps six deprecated values inline — `src/v1/model.ts:584-613`
- **Why weird:** 22 values fall into three groups: (a) bare (`EMPTY_RESULT`, `SINGLE_CELL_DIFFERENCE`, `EMPTY_GOOD_SQL`, `COLUMN_TYPE_DIFFERENCE`); (b) `RESULT_*` (`RESULT_MISSING_ROWS`, `RESULT_EXTRA_ROWS`, `RESULT_MISSING_COLUMNS`, `RESULT_EXTRA_COLUMNS`); (c) `LLM_JUDGE_*` (16 values). `EMPTY_RESULT` and `EMPTY_GOOD_SQL` are semantically `RESULT_*` reasons but lack the prefix family. Six `LLM_JUDGE_*` values are deprecated and live beside the new ones with no visual separation.
- **Category:** 17 (inconsistent grouping — same family, different prefixes), 12 (deprecated values inline with active ones).
- **Suggested name:** Move `EMPTY_RESULT` / `EMPTY_GOOD_SQL` into the `RESULT_*` family for internal consistency. Separate deprecated values into a dedicated comment block (or split into two enums) so autocomplete groups them.
- **Rationale:** The current ordering makes it hard for a reader to tell which values are deterministic vs LLM-judge and which are still active vs deprecated.

### 9. `MessageError_Type` enum — 60 values, all suffixed `_EXCEPTION` — `src/v1/model.ts:648-713`
- **Why weird:** 60 values, almost every one ends in `_EXCEPTION` (`UNEXPECTED_REPLY_PROCESS_EXCEPTION`, `GENERIC_CHAT_COMPLETION_EXCEPTION`, `CONTEXT_EXCEEDED_EXCEPTION`, …). The few that don't are inconsistent: `STOP_PROCESS_DUE_TO_AUTO_REGENERATE`, `UNKNOWN_AI_MODEL`, `NO_DEPLOYMENTS_AVAILABLE_TO_WORKSPACE`, plus `MESSAGE_ATTACHMENT_TOO_LONG_ERROR` (suffix `_ERROR` not `_EXCEPTION`), `DESCRIBE_QUERY_UNEXPECTED_FAILURE` / `DESCRIBE_QUERY_TIMEOUT` / `DESCRIBE_QUERY_INVALID_SQL_ERROR` (different verbs). The `_EXCEPTION` suffix is also Java vocabulary, not TS.
- **Category:** 2 (redundant suffix — every value already lives under `MessageError_Type`), 14 (Java-style `Exception` vocabulary in TS), 18 (long values — `INTERNAL_CATALOG_ASSET_CREATION_UNSPECIFIED_EXCEPTION` is 52 chars), 17 (inconsistent suffix).
- **Suggested name:** Drop `_EXCEPTION` from every value: `UnexpectedReplyProcess | GenericChatCompletion | ContextExceeded | …`. Pick one of `_ERROR` / `_EXCEPTION` / nothing.
- **Rationale:** This enum is 67 lines long; cleaning the suffix removes 600+ characters and makes the values readable in autocomplete.

### 10. Multiple `*_UNSPECIFIED` enum sentinels prefixed by the enum's own name — `src/v1/model.ts:534,544,551,558,565,581,585,617,634,649,745`
- **Why weird:** 11 enums use a `XXX_UNSPECIFIED` sentinel where `XXX` is the enum's name: `EVALUATION_STATUS_TYPE_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `GENIE_FEEDBACK_RATING_UNSPECIFIED`, `NULL_VALUE`, `SCORE_REASON_UNSPECIFIED`, `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED`, `THOUGHT_TYPE_UNSPECIFIED`, `TYPE_UNSPECIFIED` (inside `MessageError_Type`), `STATE_UNSPECIFIED` (inside `StatementStatus_State`). Proto2 forces this; TS does not need it because the enum's type acts as the namespace.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `Unspecified` (drop the prefix). Or omit entirely if TS-undefined can stand in for proto-unspecified.
- **Rationale:** The package will get cleaner immediately; the wire string can stay the same.

### 11. `TextAttachmentPurpose` enum has only 2 values — collapse to boolean — `src/v1/model.ts:616-619`
- **Why weird:** Two values: `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED` and `FOLLOW_UP_QUESTION`. A two-member enum where one member is the sentinel adds nothing over a boolean.
- **Category:** 12 (overspecified — enum used where a boolean would do).
- **Suggested name:** Drop the enum; replace with `isFollowUp?: boolean`.
- **Rationale:** Two-member enums where one is `_UNSPECIFIED` are often better collapsed to an optional boolean.

### 12. `EvaluationStatusType` — type name has redundant `Type` suffix — `src/v1/model.ts:533`
- **Why weird:** The type is named `EvaluationStatusType`. Every enum is by definition a "type", so the suffix adds nothing. Peer enums in the same file use bare-noun names (`ScoreReason`, `ThoughtType` — though `ThoughtType` is itself debatable, `Format`, `MessageStatus_MessageStatus`).
- **Category:** 8 (redundant `Type` suffix on enum name).
- **Suggested name:** `EvaluationStatus`.
- **Rationale:** This enum is exposed on `GenieEvalResult.status` and `GenieEvalResultDetails.evalRunStatus`; trimming the suffix shortens both call sites without losing information.

### 13. `GenieGetQueryResultByAttachment` / `GenieGetMessageQueryResult` / `GenieGetMessageAttachmentQueryResult` — 3 names for the same operation — `src/v1/client.ts:564,592,620`
- **Why weird:** Three deprecated/active methods all return `GenieGetMessageQueryResultResponse` and all read the SQL result for a message. The naming hierarchy is `Message.QueryResult` vs `MessageAttachment.QueryResult` vs `QueryResult.byAttachment` — three different mental models. Two are deprecated but still exported and named in the surface.
- **Category:** 17 (inconsistent action verb / structure), 7 (overly verbose), 12 (duplicate concept).
- **Suggested name:** Keep the single canonical method (`getMessageAttachmentQueryResult` → `getMessageAttachmentResult`), mark the others `@deprecated` and consider hiding them from the typed surface (re-export only from `/legacy`).
- **Rationale:** Three names with overlapping suffixes is the classic generator-emitting-everything problem.

### 14. `GenieEvalAssessment` / `GenieEvalResponseType` — only the sentinel carries the long prefix — `src/v1/model.ts:550,557`
- **Why weird:** `GenieEvalAssessment` has values `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GOOD`, `BAD`, `NEEDS_REVIEW`. Only the sentinel carries the prefix. `GenieEvalResponseType` likewise: `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `TEXT`, `SQL`. Within one enum two naming conventions are present.
- **Category:** 17 (inconsistent prefix within one enum).
- **Suggested name:** Drop the prefix on the sentinel; align with the bare-name convention used by the rest of the values.
- **Rationale:** Inconsistency inside a single enum is more jarring than a uniform convention either way; this is the proto-style "only the sentinel is prefixed" pattern.

### 15. `DatabricksServiceExceptionProto` — proto-arch-leak: `Service` mid + `Proto` suffix — `src/v1/model.ts:828`
- **Why weird:** The type name stacks three architectural-layer words: `Service` (server-side tier), `Exception` (Java vocabulary), and `Proto` (wire-format suffix). None of these belong in a public TS SDK surface — the SDK exposes errors, not Java exceptions, and not proto messages. JSDoc reinforces the leak: "Serialization format for DatabricksServiceException. Note the definition of this message should be in sync with DatabricksServiceExceptionWithDetailsProto defined in /api-base/proto/exception_with_details.proto". The companion schema is `unmarshalDatabricksServiceExceptionProtoSchema` (line 1843), propagating the leak.
- **Category:** Proto-architectural-leak (`Proto` suffix, `Service` mid), 14 (Java-style `Exception` vocabulary in TS), 12 (duplicate concept — the SDK already has `ApiError`).
- **Suggested name:** Delete the type and reuse `ApiError` from `@databricks/sdk-databricks/apierror`. If the wire-format shape must be kept locally, name it `ApiErrorPayload` or `WireError` and treat it as an internal marshal-time type, not a public export.
- **Rationale:** `Service`, `Exception`, and `Proto` are all backend implementation vocabulary that should never reach the user-facing SDK surface. The type is unused by any public method body (per finding #7), making the leak gratuitous.

## Medium severity

### 16. `GenieStartConversationMessageRequest` — type name conflates `Conversation` and `Message` — `src/v1/model.ts:1483`
- **Why weird:** Request type for `genieStartConversation`. Name contains *both* `Conversation` and `Message`, but the body has only `spaceId` and `content` (`{ spaceId?: string; content?: string; }`). It is not a request to start a "conversation message" — it is a request to start a conversation by sending an initial message. Compare with `GenieStartConversationResponse` (no `Message` in the name).
- **Category:** 6 (misleading — name suggests a compound entity that doesn't exist), 7 (overly verbose).
- **Suggested name:** `StartConversationRequest` (matches the response).
- **Rationale:** Reader has to parse the doc to learn what "ConversationMessage" means here. The companion response name (`GenieStartConversationResponse`) silently drops `Message` — internal inconsistency.

### 17. `GenieAttachment.attachment` discriminated-union field has the same name as its parent — `src/v1/model.ts:888`
- **Why weird:** `GenieAttachment.attachment` is a `{ $case: 'text' | 'query' | 'suggestedQuestions', … } | undefined` field. Reading `myAttachment.attachment.text` reads as "the attachment of the attachment", and the parent `GenieAttachment` also has a peer field `attachmentId`. The shape mixes the discriminator field with a flat id field.
- **Category:** 15 (generic field name losing meaning).
- **Suggested name:** Hoist to top-level discriminated union: `type GenieAttachment = ({kind: 'text', text: TextAttachment} | {kind: 'query', query: GenieQueryAttachment} | {kind: 'suggestedQuestions', suggestedQuestions: GenieSuggestedQuestionsAttachment}) & {id?: string}`. Or rename the field to `payload` / `body` / `content`.
- **Rationale:** Same struct, single name; the parent-name-shaped field name confuses readers traversing nested attachments.

### 18. `GenieConversation.id` *and* `GenieConversation.conversationId` — both identifiers — `src/v1/model.ts:917,929`
- **Why weird:** The struct has two id fields. JSDoc on `id` says "Legacy identifier, use conversation_id instead". Both are emitted, both are typed `string | undefined`, both are read from the wire. The struct also has no doc explaining the precedence rule when both are present (server normally fills both with the same value).
- **Category:** 19 (underspecified id), 12 (duplicate concept within one struct), 8 (redundant suffix).
- **Suggested name:** Either drop `id` (breaking-change risk) or mark with `@deprecated` and only emit one in the surface. Same pattern in `GenieMessage` (#19).
- **Rationale:** Caller cannot tell which to read without consulting the doc; autocomplete shows both at the same priority.

### 19. `GenieMessage.id` *and* `GenieMessage.messageId` — both identifiers — `src/v1/model.ts:1372,1395`
- **Why weird:** Same pattern as #18. `id` is the "legacy identifier" and `messageId` the canonical one. Both fields appear in autocomplete. The waiter code (`client.ts:193`) reads `resp.messageId`, but a less-careful caller might read `resp.id`.
- **Category:** 19, 12, 8 (same as #18).
- **Suggested name:** Same as #18.
- **Rationale:** Same as #18.

### 20. `GenieSpace.spaceId` and `GenieSpace.title` and `GenieSpace.parentPath` — but no `name` — `src/v1/model.ts:1459-1480`
- **Why weird:** Compare with the rest of the SDK: `GenieSpace` uses `title` for the human-readable name (other types use `name`/`displayName`). The struct has `spaceId`, `title`, `description`, `warehouseId`, `parentPath`, `serializedSpace`, `etag` — no `name`. JSDoc on `title` says "Title of the Genie Space" — but in the rest of the codebase, "title" is reserved for `GenieConversation.title` (the conversation subject line). Two different "titles" in the same package.
- **Category:** 17 (inconsistency vs other types), 1 (vague — `title` doesn't distinguish from conversation title).
- **Suggested name:** `displayName` or `name` (Space is a top-level entity; "title" is column-header style).
- **Rationale:** Aligns with `DatabricksWorkspace.name`, `Dashboard.displayName`, etc.

### 21. `GenieConversation.title` / `GenieMessage.content` / `GenieMessageComment.content` / `TextAttachment.content` / `Thought.content` — `content` is the universal field name — `src/v1/model.ts:927,1385,1414,1715,1734`
- **Why weird:** Five different concepts share the field name `content`. The reader cannot disambiguate from the field name alone. JSDocs differ: "User message content" / "Comment text content" / "AI generated message" / "The md formatted content for this thought" — i.e. they are all different formats.
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `body` for the message body, `text` for comments and thoughts, or qualify (`messageBody`, `commentText`, `thoughtMarkdown`).
- **Rationale:** "Content" is a near-meaningless filler word; this is the kind of generic name the codebase rule (#15 of the audit categories) targets.

### 22. `GenieConversation.userId: number` typed as a number — `src/v1/model.ts:921`
- **Why weird:** User identifiers across the Databricks SDK are usually strings (workspace IDs are decimal-stringified longs; SCIM user IDs are strings; AAD ids are strings). `userId: number` truncates IDs above 2^53 silently. Also appears on `GenieMessage.userId` (line 1378), `GenieMessageComment.userId` (line 1412), `GenieEvalResult.createdByUser` (line 1025), `GenieEvalRunResponse.runByUser` (line 1091).
- **Category:** 16 (field type contradicts domain), 14 (proto-int64 leaked to JS `number`).
- **Suggested name:** Keep field name, change type to `string` (matches the rest of the SDK), or use `bigint`. Or `userId: string` with stronger JSDoc.
- **Rationale:** Postgres-ID / long-id semantics are universal here. The `userId: number` typing is a generator bug that bites at runtime.

### 23. `GenieConversation.createdTimestamp` / `lastUpdatedTimestamp` etc. — `Timestamp` suffix is redundant — `src/v1/model.ts:923,925,935,1093,1103,1380,1382,1416,1427`
- **Why weird:** 9 fields use `*Timestamp` suffix. The type is already `number` (a Unix-millis timestamp per JSDoc). The suffix duplicates the type. Some peer fields drop the suffix (`createdByUser` on `GenieEvalResult`, `runByUser` on `GenieEvalRunResponse`).
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `createdAt` / `updatedAt`. Or `createdAtMs` / `updatedAtMs` if the millis unit needs to be explicit.
- **Rationale:** Industry-standard `createdAt`/`updatedAt` reads more naturally than `createdTimestamp`/`lastUpdatedTimestamp`.

### 24. `GenieMessage.lastUpdatedTimestamp` vs everywhere else `updatedAt` — `src/v1/model.ts:1382`
- **Why weird:** `lastUpdatedTimestamp` (5 syllables) is the package's "updated at" name. The `last` prefix adds nothing — by definition, an "updated at" timestamp is the *last* update.
- **Category:** 7 (overly verbose).
- **Suggested name:** `updatedAt` / `updatedTimestamp`.
- **Rationale:** Same as #23.

### 25. `GenieQueryAttachment.id` field bare `id` — `src/v1/model.ts:1429`
- **Why weird:** `id?: string` on `GenieQueryAttachment` is undocumented (no JSDoc). The parent `GenieAttachment` has `attachmentId` (line 909) — so the `id` here is presumably the same value or the query-attachment-specific id. Caller can't tell.
- **Category:** 19 (underspecified id), 1 (vague).
- **Suggested name:** `attachmentId` (match the parent) or `queryAttachmentId` (qualify).
- **Rationale:** Two near-identical ids on the same outer entity is one ambiguity too many.

### 26. `TextAttachment.id` field bare `id` — `src/v1/model.ts:1716`
- **Why weird:** Same as #25 — bare `id` on a `TextAttachment` alongside the parent's `attachmentId`. No JSDoc.
- **Category:** 19, 1.
- **Suggested name:** Same as #25.
- **Rationale:** Same as #25.

### 27. `GenieEvalRunResponse` is the entity type, not just a "response" — `src/v1/model.ts:1085`
- **Why weird:** Type name ends `Response`, suggesting an HTTP envelope. Actually it is the eval-run *entity* (resource): it has `evalRunId`, status fields, counts, timestamps. It is returned from `createEvalRun`, `getEvalRun`, and nested as elements inside `listEvalRuns`. Compare with `GenieListEvalRunsResponse` (true envelope).
- **Category:** 8 (redundant suffix `Response` for an entity), 6 (misleading suffix).
- **Suggested name:** `GenieEvalRun` (the resource). Then `getEvalRun(): Promise<GenieEvalRun>`.
- **Rationale:** Every other entity in the package is `GenieX` (no suffix). The `Response` suffix here is a generator artefact: the API returns a single instance, the generator wrote it as `*Response`.

### 28. `GenieGenerateDownloadFullQueryResultResponse` — type name is a sentence — `src/v1/model.ts:1145`
- **Why weird:** 7 words concatenated: `Genie + Generate + Download + Full + Query + Result + Response` = 49 characters. Verb-tense issue: `Generate` is present tense; everywhere else in the API we use noun-phrase types.
- **Category:** 7 (overly verbose), 13 (verb-tense inconsistency).
- **Suggested name:** `DownloadStartResponse` / `StartDownloadResponse` (the action is "start a download flow"); the body is `downloadId` + `downloadIdSignature`.
- **Rationale:** This is the longest single identifier in the file. Generator-faithful, but the name is wider than most callers' editors.

### 29. `GenieGenerateDownloadFullQueryResultRequest` / `GenieGetDownloadFullQueryResultRequest` — pairs spell out long ladder of nouns — `src/v1/model.ts:1134,1161`
- **Why weird:** Same as #28 — these are the request twins. The phrase "Full Query Result" is also under-qualified: it distinguishes from "partial" (a `GetMessageAttachmentQueryResult` is also a full result, just inline).
- **Category:** 7 (overly verbose), 6 (misleading — `Full` does not actually contrast with `Partial` anywhere).
- **Suggested name:** Pair `StartDownloadRequest` + `GetDownloadRequest`, or `BeginDownloadRequest` + `PollDownloadRequest`.
- **Rationale:** The download-flow methods are conceptually a state machine — name the state transitions.

### 30. `downloadIdSignature` is a JWT but named `Signature` — `src/v1/model.ts:1149,1173`
- **Why weird:** JSDoc says "JWT signature for the download_id". JWT is itself the full token (header.payload.signature). Calling it a "signature" understates what it is (the entire JWT that authorises the download).
- **Category:** 6 (misleading — `Signature` is a sub-part of a JWT), 5 (cryptic).
- **Suggested name:** `downloadToken` / `downloadJwt`.
- **Rationale:** Caller expects a base64 signature to pair with `downloadId`; the value is actually a full bearer token.

### 31. `statementIdSignature` same pattern — `src/v1/model.ts:1597`
- **Why weird:** Same as #30: `Result.statementIdSignature` is "JWT corresponding to the statement". `Signature` is misleading.
- **Category:** 6 (misleading), 5 (cryptic).
- **Suggested name:** `statementToken` / `statementJwt`.
- **Rationale:** Same as #30.

### 32. `etag` field lowercase but `ETag` is a standard acronym — `src/v1/model.ts:1480,1529`
- **Why weird:** HTTP `ETag` is the canonical capitalisation. The field is `etag: string`. Across the SDK other types use `etag` lowercase too — but it is an acronym (`Entity Tag`).
- **Category:** 3 (acronym casing).
- **Suggested name:** `eTag` (camelCase per TS style) or `etag` (current — chosen for consistency).
- **Rationale:** Low priority; flag for awareness.

### 33. `Result` type name — too generic — `src/v1/model.ts:1589`
- **Why weird:** A top-level type named `Result` in a public package is the most-vague-possible name. In the genie package alone there are also `ResultData`, `ResultManifest`, `GenieResultMetadata`, `StatementResponse.result`, `GenieEvalResult`. The bare `Result` carries a 4-field SQL execution shape.
- **Category:** 1 (vague/generic).
- **Suggested name:** `SqlQueryResult` / `MessageQueryResult` / `QueryResultSummary`.
- **Rationale:** `Result` is also a TS standard-library-adjacent name (`Result<T, E>` from many libraries); collisions are likely.

### 34. `Result.isTruncated` vs `ResultManifest.truncated` — same concept, different names — `src/v1/model.ts:1595,1656`
- **Why weird:** Both fields are booleans indicating truncation. `Result.isTruncated` uses the `is*` prefix convention; `ResultManifest.truncated` is bare. Same struct file, two conventions.
- **Category:** 17 (inconsistency).
- **Suggested name:** Pick one form (`truncated` everywhere) and apply.
- **Rationale:** Pure consistency win; no semantic change.

### 35. `GenieResultMetadata.isTruncated` — third copy — `src/v1/model.ts:1442`
- **Why weird:** A third truncation field on `GenieResultMetadata.isTruncated`. Three independent fields tracking the same concept across `Result`, `ResultManifest`, `GenieResultMetadata`.
- **Category:** 17 (inconsistency), 12 (duplicate concept).
- **Suggested name:** Same as #34.
- **Rationale:** Same as #34.

### 36. `GenieResultMetadata` duplicates `ResultManifest` semantics — `src/v1/model.ts:1438`
- **Why weird:** A type whose two fields (`rowCount`, `isTruncated`) are both already on `ResultManifest`. JSDoc says "Metadata associated with the query result", but `ResultManifest` is also "result manifest" metadata.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Replace with `ResultManifest` (or a sub-projection of it); delete `GenieResultMetadata`.
- **Rationale:** Two structs covering the same semantic territory cause readers to wonder which one is authoritative.

### 37. `QueryAttachmentParameter.keyword` field name — `src/v1/model.ts:1584`
- **Why weird:** `keyword` is a vague word for what is presumably the parameter name. No JSDoc. The companion field `value` carries the bound value; `sqlType` carries the type. A parameter is `(name, value, type)` — why is `name` called `keyword`?
- **Category:** 1 (vague), 6 (misleading — `keyword` evokes SQL reserved words).
- **Suggested name:** `name` (with JSDoc) or `parameterName`.
- **Rationale:** Reader sees `keyword` and looks for a SQL keyword list.

### 38. `QueryAttachmentParameter.value: string` typed as a string but doc doesn't say what kind — `src/v1/model.ts:1585`
- **Why weird:** No JSDoc on `value`. Type is `string`. For SQL parameters this could be a literal value, an expression, a placeholder, a JSON-encoded scalar, etc. Companion `sqlType?: string` (also no JSDoc) presumably qualifies it.
- **Category:** 1 (vague), 16 (field type may contradict domain).
- **Suggested name:** Document. Optionally `stringValue` / `valueText` to make the encoding explicit.
- **Rationale:** Public SDK types should not require source-diving.

### 39. `GenieAttachment.attachment.$case === 'suggestedQuestions'` — variant name redundant with type name — `src/v1/model.ts:903`
- **Why weird:** Discriminator value is `'suggestedQuestions'` and the payload type is `GenieSuggestedQuestionsAttachment`. The word `Attachment` is in the parent (`GenieAttachment`) — three repetitions of "attachment" / "suggested questions" / "questions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** Variant `'followUps'`, payload `SuggestedQuestions { questions: string[] }`.
- **Rationale:** Reduce noise per attachment.

## Low severity

### 40. `GenieSuggestedQuestionsAttachment.questions: string[]` — `src/v1/model.ts:1502`
- **Why weird:** Bare `string[]`. Doc says "The suggested follow-up questions". The questions are also typed elsewhere as a free-text input (`content` on a `GenieCreateConversationMessageRequest`) — so the type tells you nothing about the format.
- **Category:** 1 (vague — questions could be markdown, plain, etc.).
- **Suggested name:** `followUpQuestions: string[]` (clearer; matches the JSDoc).
- **Rationale:** Field name disambiguation.

### 41. `MessageError.error` — field has the same name as the parent struct's concept — `src/v1/model.ts:1557`
- **Why weird:** `MessageError.error: string`. Reader sees `someError.error` (two `error`s). Some other fields are similarly self-referential (`Result.statementId`, OK because `Result` is generic; here `MessageError.error` is *the error message*).
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `MessageError.message: string` (matches the JSON shape) or `MessageError.detail`.
- **Rationale:** Wire format on the server may already be `error_message`; check before renaming.

### 42. `MessageError.type: MessageError_Type` — `src/v1/model.ts:1558`
- **Why weird:** Field name `type` is a JS reserved-word-adjacent (TS allows it, but `type` collides with the `type` keyword used in TS type aliases — refactoring tools sometimes choke).
- **Category:** 10 (reserved-word collision), 1 (vague).
- **Suggested name:** `errorType` / `category` / `kind`.
- **Rationale:** Common collision; small ergonomics win.

### 43. `Thought.thoughtType: ThoughtType` — `src/v1/model.ts:1732`
- **Why weird:** `Thought.thoughtType` repeats "thought" twice. Could just be `Thought.type`.
- **Category:** 8 (redundant suffix), 7 (overly verbose).
- **Suggested name:** `Thought.type` (and rename `ThoughtType` → `Thought.Kind` namespace).
- **Rationale:** Reduces redundancy.

### 44. `GenieAttachment.attachmentId` — bare id alongside variant-specific ids — `src/v1/model.ts:909`
- **Why weird:** `attachmentId` on the parent; `TextAttachment.id` (line 1714) and `GenieQueryAttachment.id` (line 1429) inside variants. Three different id fields for the same logical entity (the attachment).
- **Category:** 19 (underspecified id), 12 (duplicate concept).
- **Suggested name:** Single `id` on `GenieAttachment`, remove inner ids.
- **Rationale:** See #25, #26, #44 together.

### 45. `GenieGetSpaceRequest.includeSerializedSpace` — long boolean — `src/v1/model.ts:1239`
- **Why weird:** Boolean toggle that expands the response. Permission check is documented ("Requires at least CAN EDIT permission"). Boolean naming style varies across SDK: `enableX`, `includeX`, `withX`. Could be `withSerializedSpace` or `includeSerialized` (the parent struct is already a Space).
- **Category:** 7 (overly verbose).
- **Suggested name:** `withSerialized` / `expandSerialized`.
- **Rationale:** The struct context already says "Space"; the prefix is redundant.

### 46. `genieCreateConversationMessageWaiter` and `genieStartConversationWaiter` — `Waiter` suffix — `src/v1/client.ts:188,992`
- **Why weird:** Same pattern as flagged in the `database` audit (#14): a "Waiter" class with a verb-prefixed name. Reads as "the *create-conversation-message* waiter". The class itself is named `GenieCreateConversationMessageWaiter`.
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll-helper naming).
- **Suggested name:** `MessagePoller`, `MessageCompletionPoller`, `MessageWait`. Or fold into `createConversationMessage({wait: true})`.
- **Rationale:** Class names should be noun phrases; current name reads as a verb.

### 47. `GenieCreateConversationMessage` — verb chain `Create + Conversation + Message` — `src/v1/model.ts:938, client.ts:160`
- **Why weird:** Reads as "create a conversation message" — but `conversation message` is not a thing, it's a "message inside a conversation". The triple noun ladder also appears in `GenieDeleteConversationMessage`, `GenieGetConversationMessage`, `GenieListConversationMessages`.
- **Category:** 7 (overly verbose).
- **Suggested name:** `AddMessage` / `PostMessage` (verb-noun pair) on the client; type names `AddMessageRequest`. Or shorten to `Conversation.AddMessage(...)` if the SDK supported sub-clients.
- **Rationale:** "Create a conversation message" reads awkwardly; "send a message" or "add a message" is shorter and clearer.

### 48. `genieListConversationComments` returns `comments` — plural matches but parent path drops "Message" — `src/v1/client.ts:682, model.ts:1255`
- **Why weird:** `ListConversationCommentsResponse.comments: GenieMessageComment[]`. The item type is `GenieMessageComment` but the response field is `comments` (without `messageComments`). At item level, the parent is `GenieMessageComment` (only modelled as a comment-on-a-message — no separate `ConversationComment` type), so the endpoint name `genieListConversationComments` is misleading: it lists *message* comments across the whole conversation.
- **Category:** 6 (misleading method name), 17 (inconsistent naming between method, type, and field).
- **Suggested name:** `listMessageCommentsInConversation` or `listAllMessageComments`. Or introduce a `ConversationComment` type.
- **Rationale:** Reader expects a conversation-level comment thread; gets back message-level comments.

### 49. `Format.ARROW_STREAM` — `Arrow` is Apache Arrow (acronym), `STREAM` is uppercased — `src/v1/model.ts:546`
- **Why weird:** Value `ARROW_STREAM` casing. The product name is `Apache Arrow` — `Arrow` is title-case in TS naming. As an enum value `ARROW_STREAM` is conventional (SCREAMING_SNAKE) but mixed with `JSON_ARRAY` and `CSV` where one is fully-cap acronym and one is mixed.
- **Category:** 3 (acronym casing), 17 (mixed conventions within the enum).
- **Suggested name:** `ArrowStream` (in a Pascal-case enum).
- **Rationale:** Low priority — enum-value style is widely-debated.

### 50. `GenieMessage.queryResult: Result | undefined` deprecated field — `src/v1/model.ts:1392`
- **Why weird:** Field is marked deprecated in JSDoc ("Use `query_result_metadata` in `GenieQueryAttachment` instead"). Still exported. Type is `Result` (the bare `Result` type — see #33).
- **Category:** 12 (duplicate concept — kept-for-compat), 1 (vague — `Result`).
- **Suggested name:** Mark with `/** @deprecated */` JSDoc (current text just says "Deprecated" — TS tooling won't strike-through).
- **Rationale:** Tooling support — modern TS understands `@deprecated`.

### 51. `genieGetQueryResultByAttachment` — `By` clause is Java/Spring-style — `src/v1/client.ts:620`
- **Why weird:** Method named `GetXByY` follows Spring Data convention. Other JS SDKs prefer flat verb-noun. Also the body has the same fields as `genieGetMessageAttachmentQueryResult` — they are duplicates (one path-segment ordering differs).
- **Category:** 14 (Java/Spring-style naming), 12 (duplicate concept).
- **Suggested name:** Mark as `@deprecated` (already partially), then remove.
- **Rationale:** Cleanup; clients should migrate to the canonical name.

### 52. `GenieEvalResult.createdByUser: number` — `By` clause inside a field name — `src/v1/model.ts:1025`
- **Why weird:** Field is named `createdByUser` rather than `createdBy`. `By User` is redundant: a `createdBy` field is by-its-nature-by-a-user (or by a service principal). Compare `GenieEvalRunResponse.runByUser` (same pattern, line 1091).
- **Category:** 7 (overly verbose), 17 (inconsistent vs other types in the SDK using `createdBy`).
- **Suggested name:** `createdBy` (matches the rest of the SDK).
- **Rationale:** Aligns with `databricks-sdk-go` conventions and most peer types.

### 53. `GenieEvalRunResponse.runByUser` — `By User` pattern — `src/v1/model.ts:1091`
- **Why weird:** Same as #52.
- **Category:** 7, 17.
- **Suggested name:** `runBy` / `runByUserId`.
- **Rationale:** Same as #52.

### 54. `GenieEvalResult.benchmarkAnswer` vs `GenieEvalResultDetails.actualResponse` / `expectedResponse` — naming asymmetry — `src/v1/model.ts:1023,1080,1082`
- **Why weird:** `GenieEvalResult` stores the original "benchmark answer" as a flat string; `GenieEvalResultDetails` returns the actual/expected as arrays of `GenieEvalResponse`. Three different words for "the right answer" / "Genie's answer" / "the expected answer".
- **Category:** 17 (inconsistent word choice), 1 (vague — `answer` vs `response`).
- **Suggested name:** Pick one verb. E.g., `expectedAnswer` / `actualAnswer` (or `expectedResponse` / `actualResponse` for both types).
- **Rationale:** Reader has to relearn the vocabulary in each type.

### 55. `GenieEvalResultDetails.evalRunStatus` — `evalRun` prefix inside the result-details type — `src/v1/model.ts:1037`
- **Why weird:** A `GenieEvalResultDetails` describes a single result inside a run. The field `evalRunStatus` describes the *run's* status, not the result's status. The plain `status` field appears on `GenieEvalResult` (line 1019) but is gone here — replaced by `evalRunStatus`. So the same enum (`EvaluationStatusType`) is exposed under two different field names.
- **Category:** 17 (inconsistent field naming for the same concept), 6 (misleading — `evalRunStatus` on a result-details type confuses run-status with result-status).
- **Suggested name:** `runStatus` (with the run context clear from the parent type's purpose).
- **Rationale:** Same status enum, two field names is jarring.

### 56. `GenieEvalResultDetails.manualAssessment: boolean` — `src/v1/model.ts:1041`
- **Why weird:** Two adjacent fields: `assessment: GenieEvalAssessment` and `manualAssessment: boolean`. The second is a flag indicating whether the first was set manually. The naming implies that `manualAssessment` is itself an assessment.
- **Category:** 6 (misleading — `manualAssessment` looks like "the manual assessment value"), 1 (vague).
- **Suggested name:** `assessmentIsManual` / `isManuallyAssessed`.
- **Rationale:** Boolean-prefix convention disambiguates.

### 57. `GenieListConversationsRequest.includeAll` boolean — `src/v1/model.ts:1289`
- **Why weird:** `includeAll: boolean`. JSDoc clarifies "Include all conversations in the space across all users". `All` is unqualified; could mean "include archived", "include all spaces", "include all messages".
- **Category:** 1 (vague), 6 (misleading without docs).
- **Suggested name:** `includeAllUsers` / `acrossUsers` / `allUsers`.
- **Rationale:** Boolean toggles need to be unambiguous from the name.

## Observations

### 58. `GenieGetSpaceRequest.includeSerializedSpace` — feature parity with #45
- **Observation:** Listed under #45. Documenting here for cross-reference.

### 59. `pageSize` / `pageToken` casing — `src/v1/model.ts:1248,1250,1266,1268,...`
- **Observation:** Standard pagination fields; this is fine. Noted to confirm consistency across the package.
- **Suggested name:** N/A.
- **Rationale:** Confirms the package's pagination naming is consistent.

### 60. `Value` Well-Known-Type — empty in JS, hand-rolled — `src/v1/model.ts:1747`
- **Observation:** `Value` is the proto WKT for arbitrary JSON values. The TS shape is `{ kind: { $case: 'nullValue' | 'numberValue' | 'stringValue' | 'boolValue' | 'structValue' | 'listValue', ... } | undefined }` — 24 lines of TS for what JS represents as `unknown`. Same for `Struct`, `ListValue`, `MapStringValueEntry`.
- **Suggested name:** Replace `Value | Struct | ListValue` with `unknown` (or `JsonValue`) at marshal boundary.
- **Rationale:** Genie doesn't actually use these in any public method body; they exist only as transitive types referenced by `Result.* → ResultData.dataArray` (whose elements are `ListValue` of `Value`). The proto-WKT shape is buying nothing.

### 61. Inconsistent `request field X required for polling is missing` error messages — `src/v1/client.ts:195,200,204,999,1008`
- **Observation:** All six error strings phrased identically, but `response field` vs `request field` distinction is correct. No naming bug; documentation only.

### 62. Stub `MessageStatus` empty interface — `src/v1/model.ts:1562`
- **Observation:** `export interface MessageStatus {}` is an empty placeholder. The actual status enum is `MessageStatus_MessageStatus`. The empty type adds noise to the surface.
- **Suggested name:** Remove the empty interface; refer to the enum directly.
- **Rationale:** Empty interfaces in TS satisfy any object type and become bug magnets.

## Fixed

- #11 `RESPONSE_PHASE_*` prefix repeated on every value (originally cited at `src/v1/model.ts:588-590`): Fixed in regeneration on 2026-05-20 — `ResponsePhase` enum no longer exists in `model.ts`.
- #13 `VERIFICATION_SECTION_*` prefix repeated and one value has the prefix doubled (originally cited at `src/v1/model.ts:660-666`): Fixed in regeneration on 2026-05-20 — `VerificationSection` enum no longer exists in `model.ts`.
