# Naming Audit: genie

**Path:** `packages/genie/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks "Genie" — natural-language data interface. The unit of organisation is a `GenieSpace` (a workspace scoped to a warehouse + a set of dataset/instructions); inside a space, users `startConversation` and exchange `Message`s; messages produce `GenieAttachment`s (text / SQL query / suggested follow-up questions); SQL attachments execute against the warehouse and yield `Result`s (`StatementResponse` shapes copied from the statement-execution API). The package also exposes "Eval" — a benchmarking flow (`EvalRun` → `EvalResult` → `EvalResultDetails` with LLM-judge scoring).
**Total weird names flagged:** 35

## Summary
| Severity | Count |
| --- | --- |
| High | 14 |
| Medium | 9 |
| Low | 9 |
| Observation | 3 |

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

### 4. `GenieSpace` — domain meaning of "Space" is opaque without docs — `src/v1/model.ts:1458`
- **Why weird:** The central noun. A `GenieSpace` is a "workspace scoped to a Genie deployment", but the word `Space` is one of the most overloaded terms in the Databricks SDK (it also appears in workspace, mlflow registered model, dashboards, etc.). Type doc on the class itself is one line ("Genie space ID"). Reader sees `GenieSpace` and has to consult external docs to learn whether it's a folder, a user-permission boundary, a model-deployment, or something else.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning — `Space`).
- **Suggested name:** `GenieRoom`, `GenieAgent`, `GenieDeployment`, or at minimum a JSDoc on the type explaining what a "space" *is* (warehouse + datasets + instructions). If "Space" is the Databricks product-marketing term, document it inline.
- **Rationale:** This is the package's central concept. Letting it stand on a single word that means "container" is a documentation gap as much as a naming bug.

### 5. Statement-execution types duplicated wholesale into genie — `src/v1/model.ts:5-30,33-531,543-548,754-884,1589-1694`
- **Why weird:** 15+ types are byte-for-byte copies of types in the `statementexecution`, `sql` and `apierror` packages: `ColumnTypeName` (enum, 28 values), `ErrorCode` (enum, 80 values, with line-for-line JSDoc), `Format` (enum), `ChunkInfo`, `ColumnInfo`, `ColumnMask`, `DatabricksServiceExceptionProto`, `ExternalLink`, `ExternalLink_HttpHeadersEntry`, `PolicyFunctionArgument`, `Result`, `ResultData`, `ResultManifest`, `Schema`, `StatementResponse`, `StatementStatus`, `StatementStatus_State`. The file even copies the Google-Well-Known-Types (`Struct`, `Value`, `ListValue`, `MapStringValueEntry`).
- **Category:** 12 (duplicate concept across packages).
- **Suggested name:** Import from `@databricks/sdk-databricks/statementexecution` (or wherever the originals live). If the generator can't yet cross-link, mark each duplicate `@internal` or move them to a shared internal module.
- **Rationale:** A consumer who imports both `@databricks/sdk-genie` and `@databricks/sdk-sql` ends up with two structurally-identical-but-nominally-distinct `StatementResponse` types — runtime values are not assignable to each other in strict mode. This is the biggest correctness footgun in the package.

### 6. `ErrorCode` enum (80 values, ~60% deprecated) duplicated from apierror — `src/v1/model.ts:33-531`
- **Why weird:** ErrorCode is copied verbatim from the SDK's apierror codes package. Of the 80 values, comments explicitly mark ~50 as deprecated. The enum is only referenced via the copied `DatabricksServiceExceptionProto` type, which is itself unused by any Genie method (the SDK uses `ApiError.fromHttpError` in `utils.ts:88`).
- **Category:** 12 (duplicate concept), 18 (long enum values — `MAX_NOTEBOOK_SIZE_EXCEEDED`, `MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST`, `RESOURCE_DOES_NOT_EXIST`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`).
- **Suggested name:** Import from `@databricks/sdk-databricks/apierror/codes`. Remove the local copy.
- **Rationale:** 500 lines of code duplicate a separate package. Maintenance hazard: deprecation removals or additions to the canonical enum will diverge silently.

### 7. `ScoreReason` enum mixes three prefix families and keeps six deprecated values inline — `src/v1/model.ts:584-613`
- **Why weird:** 22 values fall into three groups: (a) bare (`EMPTY_RESULT`, `SINGLE_CELL_DIFFERENCE`, `EMPTY_GOOD_SQL`, `COLUMN_TYPE_DIFFERENCE`); (b) `RESULT_*` (`RESULT_MISSING_ROWS`, `RESULT_EXTRA_ROWS`, `RESULT_MISSING_COLUMNS`, `RESULT_EXTRA_COLUMNS`); (c) `LLM_JUDGE_*` (16 values). `EMPTY_RESULT` and `EMPTY_GOOD_SQL` are semantically `RESULT_*` reasons but lack the prefix family. Six `LLM_JUDGE_*` values are deprecated and live beside the new ones with no visual separation.
- **Category:** 17 (inconsistent grouping — same family, different prefixes), 12 (deprecated values inline with active ones).
- **Suggested name:** Move `EMPTY_RESULT` / `EMPTY_GOOD_SQL` into the `RESULT_*` family for internal consistency. Separate deprecated values into a dedicated comment block (or split into two enums) so autocomplete groups them.
- **Rationale:** The current ordering makes it hard for a reader to tell which values are deterministic vs LLM-judge and which are still active vs deprecated.

### 8. `MessageError_Type` enum — 60 values, all suffixed `_EXCEPTION` — `src/v1/model.ts:648-713`
- **Why weird:** 60 values, almost every one ends in `_EXCEPTION` (`UNEXPECTED_REPLY_PROCESS_EXCEPTION`, `GENERIC_CHAT_COMPLETION_EXCEPTION`, `CONTEXT_EXCEEDED_EXCEPTION`, …). The few that don't are inconsistent: `STOP_PROCESS_DUE_TO_AUTO_REGENERATE`, `UNKNOWN_AI_MODEL`, `NO_DEPLOYMENTS_AVAILABLE_TO_WORKSPACE`, plus `MESSAGE_ATTACHMENT_TOO_LONG_ERROR` (suffix `_ERROR` not `_EXCEPTION`), `DESCRIBE_QUERY_UNEXPECTED_FAILURE` / `DESCRIBE_QUERY_TIMEOUT` / `DESCRIBE_QUERY_INVALID_SQL_ERROR` (different verbs). The `_EXCEPTION` suffix is also Java vocabulary, not TS.
- **Category:** 2 (redundant suffix — every value already lives under `MessageError_Type`), 14 (Java-style `Exception` vocabulary in TS), 18 (long values — `INTERNAL_CATALOG_ASSET_CREATION_UNSPECIFIED_EXCEPTION` is 52 chars), 17 (inconsistent suffix).
- **Suggested name:** Drop `_EXCEPTION` from every value: `UnexpectedReplyProcess | GenericChatCompletion | ContextExceeded | …`. Pick one of `_ERROR` / `_EXCEPTION` / nothing.
- **Rationale:** This enum is 67 lines long; cleaning the suffix removes 600+ characters and makes the values readable in autocomplete.

### 9. Multiple `*_UNSPECIFIED` enum sentinels prefixed by the enum's own name — `src/v1/model.ts:534,544,551,558,565,581,585,617,634,649,745`
- **Why weird:** 11 enums use a `XXX_UNSPECIFIED` sentinel where `XXX` is the enum's name: `EVALUATION_STATUS_TYPE_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `GENIE_FEEDBACK_RATING_UNSPECIFIED`, `NULL_VALUE`, `SCORE_REASON_UNSPECIFIED`, `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED`, `THOUGHT_TYPE_UNSPECIFIED`, `TYPE_UNSPECIFIED` (inside `MessageError_Type`), `STATE_UNSPECIFIED` (inside `StatementStatus_State`). Proto2 forces this; TS does not need it because the enum's type acts as the namespace.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `Unspecified` (drop the prefix). Or omit entirely if TS-undefined can stand in for proto-unspecified.
- **Rationale:** The package will get cleaner immediately; the wire string can stay the same.

### 10. `TextAttachmentPurpose` enum has only 2 values — collapse to boolean — `src/v1/model.ts:616-619`
- **Why weird:** Two values: `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED` and `FOLLOW_UP_QUESTION`. A two-member enum where one member is the sentinel adds nothing over a boolean.
- **Category:** 12 (overspecified — enum used where a boolean would do).
- **Suggested name:** Drop the enum; replace with `isFollowUp?: boolean`.
- **Rationale:** Two-member enums where one is `_UNSPECIFIED` are often better collapsed to an optional boolean.

### 11. `EvaluationStatusType` — type name has redundant `Type` suffix — `src/v1/model.ts:533`
- **Why weird:** The type is named `EvaluationStatusType`. Every enum is by definition a "type", so the suffix adds nothing. Peer enums in the same file use bare-noun names (`ScoreReason`, `ThoughtType` — though `ThoughtType` is itself debatable, `Format`, `MessageStatus_MessageStatus`).
- **Category:** 8 (redundant `Type` suffix on enum name).
- **Suggested name:** `EvaluationStatus`.
- **Rationale:** This enum is exposed on `GenieEvalResult.status` and `GenieEvalResultDetails.evalRunStatus`; trimming the suffix shortens both call sites without losing information.

### 12. `GenieGetQueryResultByAttachment` / `GenieGetMessageQueryResult` / `GenieGetMessageAttachmentQueryResult` — 3 names for the same operation — `src/v1/client.ts:564,592,620`
- **Why weird:** Three deprecated/active methods all return `GenieGetMessageQueryResultResponse` and all read the SQL result for a message. The naming hierarchy is `Message.QueryResult` vs `MessageAttachment.QueryResult` vs `QueryResult.byAttachment` — three different mental models. Two are deprecated but still exported and named in the surface.
- **Category:** 17 (inconsistent action verb / structure), 7 (overly verbose), 12 (duplicate concept).
- **Suggested name:** Keep the single canonical method (`getMessageAttachmentQueryResult` → `getMessageAttachmentResult`), mark the others `@deprecated` and consider hiding them from the typed surface (re-export only from `/legacy`).
- **Rationale:** Three names with overlapping suffixes is the classic generator-emitting-everything problem.

### 13. `GenieEvalAssessment` / `GenieEvalResponseType` — only the sentinel carries the long prefix — `src/v1/model.ts:550,557`
- **Why weird:** `GenieEvalAssessment` has values `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GOOD`, `BAD`, `NEEDS_REVIEW`. Only the sentinel carries the prefix. `GenieEvalResponseType` likewise: `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `TEXT`, `SQL`. Within one enum two naming conventions are present.
- **Category:** 17 (inconsistent prefix within one enum).
- **Suggested name:** Drop the prefix on the sentinel; align with the bare-name convention used by the rest of the values.
- **Rationale:** Inconsistency inside a single enum is more jarring than a uniform convention either way; this is the proto-style "only the sentinel is prefixed" pattern.

### 14. `DatabricksServiceExceptionProto` — proto-arch-leak: `Service` mid + `Proto` suffix — `src/v1/model.ts:828`
- **Why weird:** The type name stacks three architectural-layer words: `Service` (server-side tier), `Exception` (Java vocabulary), and `Proto` (wire-format suffix). None of these belong in a public TS SDK surface — the SDK exposes errors, not Java exceptions, and not proto messages. JSDoc reinforces the leak: "Serialization format for DatabricksServiceException. Note the definition of this message should be in sync with DatabricksServiceExceptionWithDetailsProto defined in /api-base/proto/exception_with_details.proto". The companion schema is `unmarshalDatabricksServiceExceptionProtoSchema` (line 1843), propagating the leak.
- **Category:** Proto-architectural-leak (`Proto` suffix, `Service` mid), 14 (Java-style `Exception` vocabulary in TS), 12 (duplicate concept — the SDK already has `ApiError`).
- **Suggested name:** Delete the type and reuse `ApiError` from `@databricks/sdk-databricks/apierror`. If the wire-format shape must be kept locally, name it `ApiErrorPayload` or `WireError` and treat it as an internal marshal-time type, not a public export.
- **Rationale:** `Service`, `Exception`, and `Proto` are all backend implementation vocabulary that should never reach the user-facing SDK surface. The type is unused by any public method body (per finding #6), making the leak gratuitous.

## Medium severity

### 15. `GenieStartConversationMessageRequest` — type name conflates `Conversation` and `Message` — `src/v1/model.ts:1483`
- **Why weird:** Request type for `genieStartConversation`. Name contains *both* `Conversation` and `Message`, but the body has only `spaceId` and `content` (`{ spaceId?: string; content?: string; }`). It is not a request to start a "conversation message" — it is a request to start a conversation by sending an initial message. Compare with `GenieStartConversationResponse` (no `Message` in the name).
- **Category:** 6 (misleading — name suggests a compound entity that doesn't exist), 7 (overly verbose).
- **Suggested name:** `StartConversationRequest` (matches the response).
- **Rationale:** Reader has to parse the doc to learn what "ConversationMessage" means here. The companion response name (`GenieStartConversationResponse`) silently drops `Message` — internal inconsistency.

### 16. `GenieAttachment.attachment` discriminated-union field has the same name as its parent — `src/v1/model.ts:888`
- **Why weird:** `GenieAttachment.attachment` is a `{ $case: 'text' | 'query' | 'suggestedQuestions', … } | undefined` field. Reading `myAttachment.attachment.text` reads as "the attachment of the attachment", and the parent `GenieAttachment` also has a peer field `attachmentId`. The shape mixes the discriminator field with a flat id field.
- **Category:** 15 (generic field name losing meaning).
- **Suggested name:** Hoist to top-level discriminated union: `type GenieAttachment = ({kind: 'text', text: TextAttachment} | {kind: 'query', query: GenieQueryAttachment} | {kind: 'suggestedQuestions', suggestedQuestions: GenieSuggestedQuestionsAttachment}) & {id?: string}`. Or rename the field to `payload` / `body` / `content`.
- **Rationale:** Same struct, single name; the parent-name-shaped field name confuses readers traversing nested attachments.

### 17. `GenieConversation.id` *and* `GenieConversation.conversationId` — both identifiers — `src/v1/model.ts:917,929`
- **Why weird:** The struct has two id fields. JSDoc on `id` says "Legacy identifier, use conversation_id instead". Both are emitted, both are typed `string | undefined`, both are read from the wire. The struct also has no doc explaining the precedence rule when both are present (server normally fills both with the same value).
- **Category:** 19 (underspecified id), 12 (duplicate concept within one struct), 8 (redundant suffix).
- **Suggested name:** Either drop `id` (breaking-change risk) or mark with `@deprecated` and only emit one in the surface. Same pattern in `GenieMessage` (#18).
- **Rationale:** Caller cannot tell which to read without consulting the doc; autocomplete shows both at the same priority.

### 18. `GenieMessage.id` *and* `GenieMessage.messageId` — both identifiers — `src/v1/model.ts:1372,1395`
- **Why weird:** Same pattern as #17. `id` is the "legacy identifier" and `messageId` the canonical one. Both fields appear in autocomplete. The waiter code (`client.ts:193`) reads `resp.messageId`, but a less-careful caller might read `resp.id`.
- **Category:** 19, 12, 8 (same as #17).
- **Suggested name:** Same as #17.
- **Rationale:** Same as #17.

### 19. `GenieConversation.userId: number` typed as a number — `src/v1/model.ts:921`
- **Why weird:** User identifiers across the Databricks SDK are usually strings (workspace IDs are decimal-stringified longs; SCIM user IDs are strings; AAD ids are strings). `userId: number` truncates IDs above 2^53 silently. Also appears on `GenieMessage.userId` (line 1378), `GenieMessageComment.userId` (line 1412), `GenieEvalResult.createdByUser` (line 1025), `GenieEvalRunResponse.runByUser` (line 1091).
- **Category:** 16 (field type contradicts domain), 14 (proto-int64 leaked to JS `number`).
- **Suggested name:** Keep field name, change type to `string` (matches the rest of the SDK), or use `bigint`. Or `userId: string` with stronger JSDoc.
- **Rationale:** Postgres-ID / long-id semantics are universal here. The `userId: number` typing is a generator bug that bites at runtime.

### 20. `GenieEvalRunResponse` is the entity type, not just a "response" — `src/v1/model.ts:1085`
- **Why weird:** Type name ends `Response`, suggesting an HTTP envelope. Actually it is the eval-run *entity* (resource): it has `evalRunId`, status fields, counts, timestamps. It is returned from `createEvalRun`, `getEvalRun`, and nested as elements inside `listEvalRuns`. Compare with `GenieListEvalRunsResponse` (true envelope).
- **Category:** 8 (redundant suffix `Response` for an entity), 6 (misleading suffix).
- **Suggested name:** `GenieEvalRun` (the resource). Then `getEvalRun(): Promise<GenieEvalRun>`.
- **Rationale:** Every other entity in the package is `GenieX` (no suffix). The `Response` suffix here is a generator artefact: the API returns a single instance, the generator wrote it as `*Response`.

### 21. `GenieGenerateDownloadFullQueryResultResponse` — type name is a sentence — `src/v1/model.ts:1145`
- **Why weird:** 7 words concatenated: `Genie + Generate + Download + Full + Query + Result + Response` = 49 characters. Verb-tense issue: `Generate` is present tense; everywhere else in the API we use noun-phrase types.
- **Category:** 7 (overly verbose), 13 (verb-tense inconsistency).
- **Suggested name:** `DownloadStartResponse` / `StartDownloadResponse` (the action is "start a download flow"); the body is `downloadId` + `downloadIdSignature`.
- **Rationale:** This is the longest single identifier in the file. Generator-faithful, but the name is wider than most callers' editors.

### 22. `GenieGenerateDownloadFullQueryResultRequest` / `GenieGetDownloadFullQueryResultRequest` — pairs spell out long ladder of nouns — `src/v1/model.ts:1134,1161`
- **Why weird:** Same as #21 — these are the request twins. The phrase "Full Query Result" is also under-qualified: it distinguishes from "partial" (a `GetMessageAttachmentQueryResult` is also a full result, just inline).
- **Category:** 7 (overly verbose), 6 (misleading — `Full` does not actually contrast with `Partial` anywhere).
- **Suggested name:** Pair `StartDownloadRequest` + `GetDownloadRequest`, or `BeginDownloadRequest` + `PollDownloadRequest`.
- **Rationale:** The download-flow methods are conceptually a state machine — name the state transitions.

### 23. `etag` field lowercase but `ETag` is a standard acronym — `src/v1/model.ts:1480,1529`
- **Why weird:** HTTP `ETag` is the canonical capitalisation. The field is `etag: string`. Across the SDK other types use `etag` lowercase too — but it is an acronym (`Entity Tag`).
- **Category:** 3 (acronym casing).
- **Suggested name:** `eTag` (camelCase per TS style) or `etag` (current — chosen for consistency).
- **Rationale:** Low priority; flag for awareness.

## Low severity

### 24. `Result` type name — too generic — `src/v1/model.ts:1589`
- **Why weird:** A top-level type named `Result` in a public package is the most-vague-possible name. In the genie package alone there are also `ResultData`, `ResultManifest`, `GenieResultMetadata`, `StatementResponse.result`, `GenieEvalResult`. The bare `Result` carries a 4-field SQL execution shape.
- **Category:** 1 (vague/generic).
- **Suggested name:** `SqlQueryResult` / `MessageQueryResult` / `QueryResultSummary`.
- **Rationale:** `Result` is also a TS standard-library-adjacent name (`Result<T, E>` from many libraries); collisions are likely.

### 25. `GenieResultMetadata` duplicates `ResultManifest` semantics — `src/v1/model.ts:1438`
- **Why weird:** A type whose two fields (`rowCount`, `isTruncated`) are both already on `ResultManifest`. JSDoc says "Metadata associated with the query result", but `ResultManifest` is also "result manifest" metadata.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Replace with `ResultManifest` (or a sub-projection of it); delete `GenieResultMetadata`.
- **Rationale:** Two structs covering the same semantic territory cause readers to wonder which one is authoritative.

### 26. `GenieAttachment.attachment.$case === 'suggestedQuestions'` — variant name redundant with type name — `src/v1/model.ts:903`
- **Why weird:** Discriminator value is `'suggestedQuestions'` and the payload type is `GenieSuggestedQuestionsAttachment`. The word `Attachment` is in the parent (`GenieAttachment`) — three repetitions of "attachment" / "suggested questions" / "questions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** Variant `'followUps'`, payload `SuggestedQuestions { questions: string[] }`.
- **Rationale:** Reduce noise per attachment.

### 27. `GenieAttachment.attachmentId` — bare id alongside variant-specific ids — `src/v1/model.ts:909`
- **Why weird:** `attachmentId` on the parent; `TextAttachment.id` (line 1714) and `GenieQueryAttachment.id` (line 1429) inside variants. Three different id fields for the same logical entity (the attachment).
- **Category:** 19 (underspecified id), 12 (duplicate concept).
- **Suggested name:** Single `id` on `GenieAttachment`, remove inner ids.
- **Rationale:** Eliminate redundant inner id fields.

### 28. `genieCreateConversationMessageWaiter` and `genieStartConversationWaiter` — `Waiter` suffix — `src/v1/client.ts:188,992`
- **Why weird:** Same pattern as flagged in the `database` audit (#14): a "Waiter" class with a verb-prefixed name. Reads as "the *create-conversation-message* waiter". The class itself is named `GenieCreateConversationMessageWaiter`.
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll-helper naming).
- **Suggested name:** `MessagePoller`, `MessageCompletionPoller`, `MessageWait`. Or fold into `createConversationMessage({wait: true})`.
- **Rationale:** Class names should be noun phrases; current name reads as a verb.

### 29. `GenieCreateConversationMessage` — verb chain `Create + Conversation + Message` — `src/v1/model.ts:938, client.ts:160`
- **Why weird:** Reads as "create a conversation message" — but `conversation message` is not a thing, it's a "message inside a conversation". The triple noun ladder also appears in `GenieDeleteConversationMessage`, `GenieGetConversationMessage`, `GenieListConversationMessages`.
- **Category:** 7 (overly verbose).
- **Suggested name:** `AddMessage` / `PostMessage` (verb-noun pair) on the client; type names `AddMessageRequest`. Or shorten to `Conversation.AddMessage(...)` if the SDK supported sub-clients.
- **Rationale:** "Create a conversation message" reads awkwardly; "send a message" or "add a message" is shorter and clearer.

### 30. `genieListConversationComments` returns `comments` — plural matches but parent path drops "Message" — `src/v1/client.ts:682, model.ts:1255`
- **Why weird:** `ListConversationCommentsResponse.comments: GenieMessageComment[]`. The item type is `GenieMessageComment` but the response field is `comments` (without `messageComments`). At item level, the parent is `GenieMessageComment` (only modelled as a comment-on-a-message — no separate `ConversationComment` type), so the endpoint name `genieListConversationComments` is misleading: it lists *message* comments across the whole conversation.
- **Category:** 6 (misleading method name), 17 (inconsistent naming between method, type, and field).
- **Suggested name:** `listMessageCommentsInConversation` or `listAllMessageComments`. Or introduce a `ConversationComment` type.
- **Rationale:** Reader expects a conversation-level comment thread; gets back message-level comments.

### 31. `Format.ARROW_STREAM` — `Arrow` is Apache Arrow (acronym), `STREAM` is uppercased — `src/v1/model.ts:546`
- **Why weird:** Value `ARROW_STREAM` casing. The product name is `Apache Arrow` — `Arrow` is title-case in TS naming. As an enum value `ARROW_STREAM` is conventional (SCREAMING_SNAKE) but mixed with `JSON_ARRAY` and `CSV` where one is fully-cap acronym and one is mixed.
- **Category:** 3 (acronym casing), 17 (mixed conventions within the enum).
- **Suggested name:** `ArrowStream` (in a Pascal-case enum).
- **Rationale:** Low priority — enum-value style is widely-debated.

### 32. `genieGetQueryResultByAttachment` — `By` clause is Java/Spring-style — `src/v1/client.ts:620`
- **Why weird:** Method named `GetXByY` follows Spring Data convention. Other JS SDKs prefer flat verb-noun. Also the body has the same fields as `genieGetMessageAttachmentQueryResult` — they are duplicates (one path-segment ordering differs).
- **Category:** 14 (Java/Spring-style naming), 12 (duplicate concept).
- **Suggested name:** Mark as `@deprecated` (already partially), then remove.
- **Rationale:** Cleanup; clients should migrate to the canonical name.

## Observations

### 33. `pageSize` / `pageToken` casing — `src/v1/model.ts:1248,1250,1266,1268,...`
- **Observation:** Standard pagination fields; this is fine. Noted to confirm consistency across the package.
- **Suggested name:** N/A.
- **Rationale:** Confirms the package's pagination naming is consistent.

### 34. `Value` Well-Known-Type — empty in JS, hand-rolled — `src/v1/model.ts:1747`
- **Observation:** `Value` is the proto WKT for arbitrary JSON values. The TS shape is `{ kind: { $case: 'nullValue' | 'numberValue' | 'stringValue' | 'boolValue' | 'structValue' | 'listValue', ... } | undefined }` — 24 lines of TS for what JS represents as `unknown`. Same for `Struct`, `ListValue`, `MapStringValueEntry`.
- **Suggested name:** Replace `Value | Struct | ListValue` with `unknown` (or `JsonValue`) at marshal boundary.
- **Rationale:** Genie doesn't actually use these in any public method body; they exist only as transitive types referenced by `Result.* → ResultData.dataArray` (whose elements are `ListValue` of `Value`). The proto-WKT shape is buying nothing.

### 35. Stub `MessageStatus` empty interface — `src/v1/model.ts:1562`
- **Observation:** `export interface MessageStatus {}` is an empty placeholder. The actual status enum is `MessageStatus_MessageStatus`. The empty type adds noise to the surface.
- **Suggested name:** Remove the empty interface; refer to the enum directly.
- **Rationale:** Empty interfaces in TS satisfy any object type and become bug magnets.
