# Naming Audit: genie

**Path:** `packages/genie/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks "Genie" — natural-language data interface. The unit of organisation is a `GenieSpace` (a workspace scoped to a warehouse + a set of dataset/instructions); inside a space, users `startConversation` and exchange `Message`s; messages produce `GenieAttachment`s (text / SQL query / suggested follow-up questions); SQL attachments execute against the warehouse and yield `Result`s (`StatementResponse` shapes copied from the statement-execution API). The package also exposes "Eval" — a benchmarking flow (`EvalRun` → `EvalResult` → `EvalResultDetails` with LLM-judge scoring).
**Total weird names flagged:** 73

## Summary
| Severity | Count |
| --- | --- |
| High | 21 |
| Medium | 27 |
| Low | 19 |
| Observation | 6 |

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
- **Why weird:** 40 of ~70 types are prefixed `Genie`: `GenieAttachment`, `GenieConversation`, `GenieMessage`, `GenieSpace`, `GenieFeedback`, `GenieEvalResult`, etc. The package is `@databricks/sdk-genie` and types are imported as `import {GenieMessage} from '@databricks/sdk-genie'`. The prefix duplicates the package identity. Other types in the same file have no prefix (`Result`, `ResultData`, `ResultManifest`, `StatementResponse`, `StatementStatus`, `Schema`, `Struct`, `ListValue`, `ChunkInfo`, `MessageError`, `MessageStatus`, `Thought`, `TextAttachment`, `VerificationMetadata`, etc.) — so the prefix is not even applied consistently.
- **Category:** 20 (type-suffix tautology), 17 (prefix applied inconsistently within the same package).
- **Suggested name:** Drop the prefix wherever the unprefixed name is unambiguous: `Conversation`, `Message`, `Space`, `Attachment`, `Feedback`, `EvalResult`. Keep `Genie` only where collision with a copied-in shared type would arise (e.g. keep `GenieResultMetadata` if you also need to keep `ResultManifest`).
- **Rationale:** `import {Message} from '@databricks/sdk-genie'` is unambiguous (the package is the namespace). The current prefix turns every import line into noise.

### 5. `GenieSpace` — domain meaning of "Space" is opaque without docs — `src/v1/model.ts:1481`
- **Why weird:** The central noun. A `GenieSpace` is a "workspace scoped to a Genie deployment", but the word `Space` is one of the most overloaded terms in the Databricks SDK (it also appears in workspace, mlflow registered model, dashboards, etc.). Type doc on the class itself is one line ("Genie space ID"). Reader sees `GenieSpace` and has to consult external docs to learn whether it's a folder, a user-permission boundary, a model-deployment, or something else.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning — `Space`).
- **Suggested name:** `GenieRoom`, `GenieAgent`, `GenieDeployment`, or at minimum a JSDoc on the type explaining what a "space" *is* (warehouse + datasets + instructions). If "Space" is the Databricks product-marketing term, document it inline.
- **Rationale:** This is the package's central concept. Letting it stand on a single word that means "container" is a documentation gap as much as a naming bug.

### 6. `MessageStatus_MessageStatus` enum (Proto-style double name) — `src/v1/model.ts:753`
- **Why weird:** A proto-generated nested enum where the parent message and the enum share the name. Becomes `MessageStatus_MessageStatus` in TS — repeats `MessageStatus` twice. Every reference (`MessageStatus_MessageStatus.COMPLETED`, etc.) reads as the wrong name twice.
- **Category:** 4 (underscores in TS identifiers), 14 (proto-style nested name).
- **Suggested name:** `MessageStatus` (single, non-nested enum) or `MessageState`. Keep the wire format unchanged.
- **Rationale:** The doubled name is a generator artefact of proto-style nesting. A single non-nested enum reads naturally and removes the underscore.

### 7. `MessageError_Type` enum — Proto-style nested name — `src/v1/model.ts:669`
- **Why weird:** Same pattern as #6: `MessageError_Type` is the nested-enum form. Field name is `type` (`MessageError.type`); enum is `MessageError_Type` — i.e. accessed as `MessageError_Type.FOO`. The underscore is a generator leak.
- **Category:** 4 (underscores in TS identifiers), 14 (proto-style nested name).
- **Suggested name:** `MessageErrorType` (camelcase only, drop the underscore).
- **Rationale:** Same as #6.

### 8. `StatementStatus_State` enum — Proto-style nested name — `src/v1/model.ts:767`
- **Why weird:** Same pattern. `StatementStatus.state: StatementStatus_State`. Also: this entire family of types (`StatementResponse`, `StatementStatus`, `ResultManifest`, `Result`, `ResultData`, `ChunkInfo`, `ExternalLink`, `Schema`, `ColumnInfo`, `ColumnTypeName`, `ColumnMask`, `PolicyFunctionArgument`, `Format`, `DatabricksServiceExceptionProto`, `ErrorCode`) is *copy-pasted* from `@databricks/sdk-databricks/statementexecution`; see #9.
- **Category:** 4 (underscores), 14 (proto nesting), 12 (duplicate concept across packages).
- **Suggested name:** `StatementState`. Better: import from the statementexecution package instead of copying.
- **Rationale:** See #9 for the deeper issue.

### 9. Statement-execution types duplicated wholesale into genie — `src/v1/model.ts:5-33,36-534,547-551,777-907,1610-1715`
- **Why weird:** 15+ types are byte-for-byte copies of types in the `statementexecution`, `sql` and `apierror` packages: `ColumnTypeName` (enum, 28 values), `ErrorCode` (enum, 80 values, with line-for-line JSDoc), `Format` (enum), `ChunkInfo`, `ColumnInfo`, `ColumnMask`, `DatabricksServiceExceptionProto`, `ExternalLink`, `ExternalLink_HttpHeadersEntry`, `PolicyFunctionArgument`, `Result`, `ResultData`, `ResultManifest`, `Schema`, `StatementResponse`, `StatementStatus`, `StatementStatus_State`. The file even copies the Google-Well-Known-Types (`Struct`, `Value`, `ListValue`, `MapStringValueEntry`, `NullValue`).
- **Category:** 12 (duplicate concept across packages), 4 (underscores, propagated through the copy).
- **Suggested name:** Import from `@databricks/sdk-databricks/statementexecution` (or wherever the originals live). If the generator can't yet cross-link, mark each duplicate `@internal` or move them to a shared internal module.
- **Rationale:** A consumer who imports both `@databricks/sdk-genie` and `@databricks/sdk-sql` ends up with two structurally-identical-but-nominally-distinct `StatementResponse` types — runtime values are not assignable to each other in strict mode. This is the biggest correctness footgun in the package.

### 10. `ErrorCode` enum (80 values, ~60% deprecated) duplicated from apierror — `src/v1/model.ts:36-534`
- **Why weird:** ErrorCode is copied verbatim from the SDK's apierror codes package. Of the 80 values, comments explicitly mark ~50 as deprecated. The enum is only referenced via the copied `DatabricksServiceExceptionProto` type, which is itself unused by any Genie method (the SDK uses `APIError.fromHttpError` in `utils.ts:88`).
- **Category:** 12 (duplicate concept), 18 (long enum values — `MAX_NOTEBOOK_SIZE_EXCEEDED`, `MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST`, `RESOURCE_DOES_NOT_EXIST`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`).
- **Suggested name:** Import from `@databricks/sdk-databricks/apierror/codes`. Remove the local copy.
- **Rationale:** 500 lines of code (model.ts:36-534) duplicate a separate package. Maintenance hazard: deprecation removals or additions to the canonical enum will diverge silently.

### 11. `ScoreReason` enum — values mix `RESULT_*`, `LLM_JUDGE_*`, and unprefixed `EMPTY_RESULT`/`SINGLE_CELL_DIFFERENCE` — `src/v1/model.ts:593-622`
- **Why weird:** 22 values, three families: (a) plain (`EMPTY_RESULT`, `SINGLE_CELL_DIFFERENCE`, `EMPTY_GOOD_SQL`, `COLUMN_TYPE_DIFFERENCE`); (b) `RESULT_*` (`RESULT_MISSING_ROWS`, `RESULT_EXTRA_ROWS`, `RESULT_MISSING_COLUMNS`, `RESULT_EXTRA_COLUMNS`); (c) `LLM_JUDGE_*` (16 values). Six `LLM_JUDGE_*` values are deprecated and kept beside the new ones. `EMPTY_RESULT` and `EMPTY_GOOD_SQL` should both be `RESULT_*` for consistency.
- **Category:** 2 (redundant enum prefixes), 18 (long enum values — `LLM_JUDGE_INSTRUCTION_COMPLIANCE_OR_MISSING_BUSINESS_LOGIC` is 60 characters), 17 (inconsistent prefix), 12 (deprecated values duplicated alongside new).
- **Suggested name:** Either drop all prefixes (`EmptyResult | MissingRows | ExtraRows | …`) or apply uniformly (`RESULT_EMPTY`, `RESULT_MISSING_ROWS`, …, `JUDGE_MISSING_FILTER`, `JUDGE_INCOMPLETE_OUTPUT`, …). Separate the deprecated values into a dedicated comment block or split into two enums.
- **Rationale:** Autocomplete on `ScoreReason.` returns 22 items with no visual grouping; users cannot tell at a glance which are deterministic vs which are LLM-judge.

### 12. `MessageError_Type` enum — 60 values, all suffixed `_EXCEPTION` — `src/v1/model.ts:669-736`
- **Why weird:** 60 values, almost every one ends in `_EXCEPTION` (`UNEXPECTED_REPLY_PROCESS_EXCEPTION`, `GENERIC_CHAT_COMPLETION_EXCEPTION`, `CONTEXT_EXCEEDED_EXCEPTION`, …). The few that don't are inconsistent: `STOP_PROCESS_DUE_TO_AUTO_REGENERATE`, `UNKNOWN_AI_MODEL`, `NO_DEPLOYMENTS_AVAILABLE_TO_WORKSPACE`, plus `MESSAGE_ATTACHMENT_TOO_LONG_ERROR` (suffix `_ERROR` not `_EXCEPTION`), `DESCRIBE_QUERY_UNEXPECTED_FAILURE` / `DESCRIBE_QUERY_TIMEOUT` / `DESCRIBE_QUERY_INVALID_SQL_ERROR` (different verbs). The `_EXCEPTION` suffix is also Java vocabulary, not TS.
- **Category:** 2 (redundant suffix — every value already lives under `MessageError_Type`), 14 (Java-style `Exception` vocabulary in TS), 18 (long values — `INTERNAL_CATALOG_ASSET_CREATION_UNSUPPORTED_EXCEPTION` is 52 chars), 17 (inconsistent suffix).
- **Suggested name:** Drop `_EXCEPTION` from every value: `UnexpectedReplyProcess | GenericChatCompletion | ContextExceeded | …`. Pick one of `_ERROR` / `_EXCEPTION` / nothing.
- **Rationale:** This enum is 67 lines long; cleaning the suffix removes 600+ characters and makes the values readable in autocomplete.

### 13. Three `*_UNSPECIFIED` enum sentinels prefixed by the enum's own name — `src/v1/model.ts:537,547,554,561,569,584,588,595,626,633,643,660,670`
- **Why weird:** 13 enums use a `XXX_UNSPECIFIED` sentinel where `XXX` is the enum's name: `EVALUATION_STATUS_TYPE_UNSPECIFIED`, `FORMAT_UNSPECIFIED`, `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `GENIE_FEEDBACK_RATING_UNSPECIFIED`, `NULL_VALUE`, `RESPONSE_PHASE_UNSPECIFIED`, `SCORE_REASON_UNSPECIFIED`, `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED`, `THOUGHT_TYPE_UNSPECIFIED`, `VERIFICATION_SECTION_UNSPECIFIED`, `TYPE_UNSPECIFIED` (inside `MessageError_Type`), `STATE_UNSPECIFIED` (inside `StatementStatus_State`). Proto2 forces this; TS does not need it because the enum's type acts as the namespace.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `Unspecified` (drop the prefix). Or omit entirely if TS-undefined can stand in for proto-unspecified.
- **Rationale:** The package will get cleaner immediately; the wire string can stay the same.

### 14. `RESPONSE_PHASE_*` prefix repeated on every value — `src/v1/model.ts:588-590`
- **Why weird:** Enum `ResponsePhase` has 3 values: `RESPONSE_PHASE_UNSPECIFIED`, `RESPONSE_PHASE_THINKING`, `RESPONSE_PHASE_VERIFYING`. Every value carries the parent name.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `Unspecified | Thinking | Verifying`.
- **Rationale:** Same as #13 — autocomplete already namespaces.

### 15. `THOUGHT_TYPE_*` prefix repeated — `src/v1/model.ts:643-653`
- **Why weird:** Six values, all `THOUGHT_TYPE_*`. The plain-noun forms (`Description`, `Understanding`, `DataSourcing`, `Instructions`, `Steps`) would be perfectly clear under `ThoughtType.`.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `ThoughtType.Unspecified | Description | Understanding | DataSourcing | Instructions | Steps`.
- **Rationale:** Same as #13.

### 16. `VERIFICATION_SECTION_*` prefix repeated and one value has the prefix doubled — `src/v1/model.ts:660-666`
- **Why weird:** Five values: `VERIFICATION_SECTION_UNSPECIFIED`, `VERIFICATION_SECTION_SQL_EXAMPLES_VALIDATION`, `VERIFICATION_SECTION_VERIFICATION_QUERIES`, `VERIFICATION_SECTION_PROPOSED_IMPROVEMENT`, `VERIFICATION_SECTION_FINAL_DECISION`. The third value (`VERIFICATION_SECTION_VERIFICATION_QUERIES`) repeats `VERIFICATION` — 41 characters.
- **Category:** 2 (redundant prefix doubled), 18 (long enum values).
- **Suggested name:** `VerificationSection.Unspecified | SqlExamplesValidation | VerificationQueries | ProposedImprovement | FinalDecision`.
- **Rationale:** Same.

### 17. `TEXT_ATTACHMENT_PURPOSE_*` prefix repeated; enum has only 2 values — `src/v1/model.ts:626-628`
- **Why weird:** Two values: `TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED` (35 chars) and `FOLLOW_UP_QUESTION`. Prefix only on the sentinel — inconsistent within the same enum.
- **Category:** 17 (inconsistent prefix within one enum), 2 (redundant prefix on sentinel).
- **Suggested name:** Either `Unspecified | FollowUpQuestion`, or drop the enum (boolean `isFollowUp`).
- **Rationale:** Two-member enums where one is `_UNSPECIFIED` are often better collapsed.

### 18. `GENIE_EVAL_ASSESSMENT_*` and `GENIE_EVAL_RESPONSE_TYPE_*` prefixes — `src/v1/model.ts:554,561`
- **Why weird:** `GenieEvalAssessment` has values `GENIE_EVAL_ASSESSMENT_UNSPECIFIED`, `GOOD`, `BAD`, `NEEDS_REVIEW`. Only the sentinel carries the prefix. `GenieEvalResponseType` likewise: `GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED`, `TEXT`, `SQL`.
- **Category:** 17 (inconsistent prefix), 2 (redundant prefix on sentinel).
- **Suggested name:** Drop the prefix on the sentinel.
- **Rationale:** Same as the rest of the enum prefix cluster — the consistency wins matter more than the wire encoding.

### 19. `EvaluationStatusType` has 6 values mixing `EVALUATION_*` and unprefixed — `src/v1/model.ts:536-544`
- **Why weird:** Six values: `EVALUATION_STATUS_TYPE_UNSPECIFIED`, `RUNNING`, `DONE`, `NOT_STARTED`, `EVALUATION_FAILED`, `EVALUATION_CANCELLED`, `EVALUATION_TIMEOUT`. Three are prefixed `EVALUATION_*`, three are bare. The mixed prefixing is jarring.
- **Category:** 17 (inconsistent prefix within one enum), 2 (redundant prefix), 6 (`Type` suffix on enum name is also redundant — every enum is a "type").
- **Suggested name:** `EvaluationStatus.Unspecified | Running | Done | NotStarted | Failed | Cancelled | Timeout`. Drop the `Type` suffix from the enum name.
- **Rationale:** This enum is exposed in `GenieEvalResult.status` and `GenieEvalResultDetails.evalRunStatus` — readable values matter.

### 20. `GenieGetQueryResultByAttachment` / `GenieGetMessageQueryResult` / `GenieGetMessageAttachmentQueryResult` — 3 names for the same operation — `src/v1/client.ts:564,592,620`
- **Why weird:** Three deprecated/active methods all return `GenieGetMessageQueryResultResponse` and all read the SQL result for a message. The naming hierarchy is `Message.QueryResult` vs `MessageAttachment.QueryResult` vs `QueryResult.byAttachment` — three different mental models. Two are deprecated but still exported and named in the surface.
- **Category:** 17 (inconsistent action verb / structure), 7 (overly verbose), 12 (duplicate concept).
- **Suggested name:** Keep the single canonical method (`getMessageAttachmentQueryResult` → `getMessageAttachmentResult`), mark the others `@deprecated` and consider hiding them from the typed surface (re-export only from `/legacy`).
- **Rationale:** Three names with overlapping suffixes is the classic generator-emitting-everything problem.

### 21. `GenieStartConversationMessageRequest` — type name conflates `Conversation` and `Message` — `src/v1/model.ts:1506`
- **Why weird:** Request type for `genieStartConversation`. Name contains *both* `Conversation` and `Message`, but the body has only `spaceId` and `content` (`{ spaceId?: string; content?: string; }`). It is not a request to start a "conversation message" — it is a request to start a conversation by sending an initial message. Compare with `GenieStartConversationResponse` (no `Message` in the name).
- **Category:** 6 (misleading — name suggests a compound entity that doesn't exist), 7 (overly verbose).
- **Suggested name:** `StartConversationRequest` (matches the response).
- **Rationale:** Reader has to parse the doc to learn what "ConversationMessage" means here. The companion response name (`GenieStartConversationResponse`) silently drops `Message` — internal inconsistency.

## Medium severity

### 22. `GenieAttachment.attachment` discriminated-union field has the same name as its parent — `src/v1/model.ts:911`
- **Why weird:** `GenieAttachment.attachment` is a `{ $case: 'text' | 'query' | 'suggestedQuestions', … } | undefined` field. Reading `myAttachment.attachment.text` reads as "the attachment of the attachment", and the parent `GenieAttachment` also has a peer field `attachmentId`. The shape mixes the discriminator field with a flat id field.
- **Category:** 15 (generic field name losing meaning).
- **Suggested name:** Hoist to top-level discriminated union: `type GenieAttachment = ({kind: 'text', text: TextAttachment} | {kind: 'query', query: GenieQueryAttachment} | {kind: 'suggestedQuestions', suggestedQuestions: GenieSuggestedQuestionsAttachment}) & {id?: string}`. Or rename the field to `payload` / `body` / `content`.
- **Rationale:** Same struct, single name; the parent-name-shaped field name confuses readers traversing nested attachments.

### 23. `GenieConversation.id` *and* `GenieConversation.conversationId` — both identifiers — `src/v1/model.ts:940,952`
- **Why weird:** The struct has two id fields. JSDoc on `id` says "Legacy identifier, use conversation_id instead". Both are emitted, both are typed `string | undefined`, both are read from the wire. The struct also has no doc explaining the precedence rule when both are present (server normally fills both with the same value).
- **Category:** 19 (underspecified id), 12 (duplicate concept within one struct), 8 (redundant suffix).
- **Suggested name:** Either drop `id` (breaking-change risk) or mark with `@deprecated` and only emit one in the surface. Same pattern in `GenieMessage` (#24).
- **Rationale:** Caller cannot tell which to read without consulting the doc; autocomplete shows both at the same priority.

### 24. `GenieMessage.id` *and* `GenieMessage.messageId` — both identifiers — `src/v1/model.ts:1395,1419`
- **Why weird:** Same pattern as #23. `id` is the "legacy identifier" and `messageId` the canonical one. Both fields appear in autocomplete. The waiter code (`client.ts:193`) reads `resp.messageId`, but a less-careful caller might read `resp.id`.
- **Category:** 19, 12, 8 (same as #23).
- **Suggested name:** Same as #23.
- **Rationale:** Same as #23.

### 25. `GenieSpace.spaceId` and `GenieSpace.title` and `GenieSpace.parentPath` — but no `name` — `src/v1/model.ts:1482-1503`
- **Why weird:** Compare with the rest of the SDK: `GenieSpace` uses `title` for the human-readable name (other types use `name`/`displayName`). The struct has `spaceId`, `title`, `description`, `warehouseId`, `parentPath`, `serializedSpace`, `etag` — no `name`. JSDoc on `title` says "Title of the Genie Space" — but in the rest of the codebase, "title" is reserved for `GenieConversation.title` (the conversation subject line). Two different "titles" in the same package.
- **Category:** 17 (inconsistency vs other types), 1 (vague — `title` doesn't distinguish from conversation title).
- **Suggested name:** `displayName` or `name` (Space is a top-level entity; "title" is column-header style).
- **Rationale:** Aligns with `DatabricksWorkspace.name`, `Dashboard.displayName`, etc.

### 26. `GenieConversation.title` / `GenieMessage.content` / `GenieMessageComment.content` / `TextAttachment.content` / `Thought.content` — `content` is the universal field name — `src/v1/model.ts:950,1408,1437,1736,1758`
- **Why weird:** Five different concepts share the field name `content`. The reader cannot disambiguate from the field name alone. JSDocs differ: "User message content" / "Comment text content" / "AI generated message" / "The md formatted content for this thought" — i.e. they are all different formats.
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `body` for the message body, `text` for comments and thoughts, or qualify (`messageBody`, `commentText`, `thoughtMarkdown`).
- **Rationale:** "Content" is a near-meaningless filler word; this is the kind of generic name the codebase rule (#15 of the audit categories) targets.

### 27. `GenieConversation.userId: number` typed as a number — `src/v1/model.ts:944`
- **Why weird:** User identifiers across the Databricks SDK are usually strings (workspace IDs are decimal-stringified longs; SCIM user IDs are strings; AAD ids are strings). `userId: number` truncates IDs above 2^53 silently. Also appears on `GenieMessage.userId` (line 1401), `GenieMessageComment.userId` (line 1435), `GenieEvalResult.createdByUser` (line 1048), `GenieEvalRunResponse.runByUser` (line 1114).
- **Category:** 16 (field type contradicts domain), 14 (proto-int64 leaked to JS `number`).
- **Suggested name:** Keep field name, change type to `string` (matches the rest of the SDK), or use `bigint`. Or `userId: string` with stronger JSDoc.
- **Rationale:** Postgres-ID / long-id semantics are universal here. The `userId: number` typing is a generator bug that bites at runtime.

### 28. `GenieConversation.createdTimestamp` / `lastUpdatedTimestamp` etc. — `Timestamp` suffix is redundant — `src/v1/model.ts:946,948,958,1116,1126,1402,1404,1439,1450`
- **Why weird:** 9 fields use `*Timestamp` suffix. The type is already `number` (a Unix-millis timestamp per JSDoc). The suffix duplicates the type. Some peer fields drop the suffix (`createdByUser` on `GenieEvalResult`, `runByUser` on `GenieEvalRunResponse`).
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `createdAt` / `updatedAt`. Or `createdAtMs` / `updatedAtMs` if the millis unit needs to be explicit.
- **Rationale:** Industry-standard `createdAt`/`updatedAt` reads more naturally than `createdTimestamp`/`lastUpdatedTimestamp`.

### 29. `GenieMessage.lastUpdatedTimestamp` vs everywhere else `updatedAt` — `src/v1/model.ts:1404`
- **Why weird:** `lastUpdatedTimestamp` (5 syllables) is the package's "updated at" name. The `last` prefix adds nothing — by definition, an "updated at" timestamp is the *last* update.
- **Category:** 7 (overly verbose).
- **Suggested name:** `updatedAt` / `updatedTimestamp`.
- **Rationale:** Same as #28.

### 30. `GenieQueryAttachment.id` field bare `id` — `src/v1/model.ts:1452`
- **Why weird:** `id?: string` on `GenieQueryAttachment` is undocumented (no JSDoc). The parent `GenieAttachment` has `attachmentId` (line 932) — so the `id` here is presumably the same value or the query-attachment-specific id. Caller can't tell.
- **Category:** 19 (underspecified id), 1 (vague).
- **Suggested name:** `attachmentId` (match the parent) or `queryAttachmentId` (qualify).
- **Rationale:** Two near-identical ids on the same outer entity is one ambiguity too many.

### 31. `TextAttachment.id` field bare `id` — `src/v1/model.ts:1737`
- **Why weird:** Same as #30 — bare `id` on a `TextAttachment` alongside the parent's `attachmentId`. No JSDoc.
- **Category:** 19, 1.
- **Suggested name:** Same as #30.
- **Rationale:** Same as #30.

### 32. `GenieEvalRunResponse` is the entity type, not just a "response" — `src/v1/model.ts:1108`
- **Why weird:** Type name ends `Response`, suggesting an HTTP envelope. Actually it is the eval-run *entity* (resource): it has `evalRunId`, status fields, counts, timestamps. It is returned from `createEvalRun`, `getEvalRun`, and nested as elements inside `listEvalRuns`. Compare with `GenieListEvalRunsResponse` (true envelope).
- **Category:** 8 (redundant suffix `Response` for an entity), 6 (misleading suffix).
- **Suggested name:** `GenieEvalRun` (the resource). Then `getEvalRun(): Promise<GenieEvalRun>`.
- **Rationale:** Every other entity in the package is `GenieX` (no suffix). The `Response` suffix here is a generator artefact: the API returns a single instance, the generator wrote it as `*Response`.

### 33. `GenieGenerateDownloadFullQueryResultResponse` — type name is a sentence — `src/v1/model.ts:1168`
- **Why weird:** 7 words concatenated: `Genie + Generate + Download + Full + Query + Result + Response` = 49 characters. Verb-tense issue: `Generate` is present tense; everywhere else in the API we use noun-phrase types.
- **Category:** 7 (overly verbose), 13 (verb-tense inconsistency).
- **Suggested name:** `DownloadStartResponse` / `StartDownloadResponse` (the action is "start a download flow"); the body is `downloadId` + `downloadIdSignature`.
- **Rationale:** This is the longest single identifier in the file. Generator-faithful, but the name is wider than most callers' editors.

### 34. `GenieGenerateDownloadFullQueryResultRequest` / `GenieGetDownloadFullQueryResultRequest` — pairs spell out long ladder of nouns — `src/v1/model.ts:1157,1184`
- **Why weird:** Same as #33 — these are the request twins. The phrase "Full Query Result" is also under-qualified: it distinguishes from "partial" (a `GetMessageAttachmentQueryResult` is also a full result, just inline).
- **Category:** 7 (overly verbose), 6 (misleading — `Full` does not actually contrast with `Partial` anywhere).
- **Suggested name:** Pair `StartDownloadRequest` + `GetDownloadRequest`, or `BeginDownloadRequest` + `PollDownloadRequest`.
- **Rationale:** The download-flow methods are conceptually a state machine — name the state transitions.

### 35. `downloadIdSignature` is a JWT but named `Signature` — `src/v1/model.ts:1172,1196`
- **Why weird:** JSDoc says "JWT signature for the download_id". JWT is itself the full token (header.payload.signature). Calling it a "signature" understates what it is (the entire JWT that authorises the download).
- **Category:** 6 (misleading — `Signature` is a sub-part of a JWT), 5 (cryptic).
- **Suggested name:** `downloadToken` / `downloadJwt`.
- **Rationale:** Caller expects a base64 signature to pair with `downloadId`; the value is actually a full bearer token.

### 36. `statementIdSignature` same pattern — `src/v1/model.ts:1618`
- **Why weird:** Same as #35: `Result.statementIdSignature` is "JWT corresponding to the statement". `Signature` is misleading.
- **Category:** 6 (misleading), 5 (cryptic).
- **Suggested name:** `statementToken` / `statementJwt`.
- **Rationale:** Same as #35.

### 37. `etag` field lowercase but `ETag` is a standard acronym — `src/v1/model.ts:1503,1552`
- **Why weird:** HTTP `ETag` is the canonical capitalisation. The field is `etag: string`. Across the SDK other types use `etag` lowercase too — but it is an acronym (`Entity Tag`).
- **Category:** 3 (acronym casing).
- **Suggested name:** `eTag` (camelCase per TS style) or `etag` (current — chosen for consistency).
- **Rationale:** Low priority; flag for awareness.

### 38. `Result` type name — too generic — `src/v1/model.ts:1610`
- **Why weird:** A top-level type named `Result` in a public package is the most-vague-possible name. In the genie package alone there are also `ResultData`, `ResultManifest`, `GenieResultMetadata`, `StatementResponse.result`, `GenieEvalResult`. The bare `Result` carries a 4-field SQL execution shape.
- **Category:** 1 (vague/generic).
- **Suggested name:** `SqlQueryResult` / `MessageQueryResult` / `QueryResultSummary`.
- **Rationale:** `Result` is also a TS standard-library-adjacent name (`Result<T, E>` from many libraries); collisions are likely.

### 39. `Result.isTruncated` vs `ResultManifest.truncated` — same concept, different names — `src/v1/model.ts:1616,1677`
- **Why weird:** Both fields are booleans indicating truncation. `Result.isTruncated` uses the `is*` prefix convention; `ResultManifest.truncated` is bare. Same struct file, two conventions.
- **Category:** 17 (inconsistency).
- **Suggested name:** Pick one form (`truncated` everywhere) and apply.
- **Rationale:** Pure consistency win; no semantic change.

### 40. `GenieResultMetadata.isTruncated` — third copy — `src/v1/model.ts:1465`
- **Why weird:** A third truncation field on `GenieResultMetadata.isTruncated`. Three independent fields tracking the same concept across `Result`, `ResultManifest`, `GenieResultMetadata`.
- **Category:** 17 (inconsistency), 12 (duplicate concept).
- **Suggested name:** Same as #39.
- **Rationale:** Same as #39.

### 41. `GenieResultMetadata` duplicates `ResultManifest` semantics — `src/v1/model.ts:1461`
- **Why weird:** A type whose two fields (`rowCount`, `isTruncated`) are both already on `ResultManifest`. JSDoc says "Metadata associated with the query result", but `ResultManifest` is also "result manifest" metadata.
- **Category:** 12 (duplicate concept).
- **Suggested name:** Replace with `ResultManifest` (or a sub-projection of it); delete `GenieResultMetadata`.
- **Rationale:** Two structs covering the same semantic territory cause readers to wonder which one is authoritative.

### 42. `QueryAttachmentParameter.keyword` field name — `src/v1/model.ts:1605`
- **Why weird:** `keyword` is a vague word for what is presumably the parameter name. No JSDoc. The companion field `value` carries the bound value; `sqlType` carries the type. A parameter is `(name, value, type)` — why is `name` called `keyword`?
- **Category:** 1 (vague), 6 (misleading — `keyword` evokes SQL reserved words).
- **Suggested name:** `name` (with JSDoc) or `parameterName`.
- **Rationale:** Reader sees `keyword` and looks for a SQL keyword list.

### 43. `QueryAttachmentParameter.value: string` typed as a string but doc doesn't say what kind — `src/v1/model.ts:1606`
- **Why weird:** No JSDoc on `value`. Type is `string`. For SQL parameters this could be a literal value, an expression, a placeholder, a JSON-encoded scalar, etc. Companion `sqlType?: string` (also no JSDoc) presumably qualifies it.
- **Category:** 1 (vague), 16 (field type may contradict domain).
- **Suggested name:** Document. Optionally `stringValue` / `valueText` to make the encoding explicit.
- **Rationale:** Public SDK types should not require source-diving.

### 44. `GenieAttachment.attachment.$case === 'suggestedQuestions'` — variant name redundant with type name — `src/v1/model.ts:925`
- **Why weird:** Discriminator value is `'suggestedQuestions'` and the payload type is `GenieSuggestedQuestionsAttachment`. The word `Attachment` is in the parent (`GenieAttachment`) — three repetitions of "attachment" / "suggested questions" / "questions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** Variant `'followUps'`, payload `SuggestedQuestions { questions: string[] }`.
- **Rationale:** Reduce noise per attachment.

### 45. `GenieSuggestedQuestionsAttachment.questions: string[]` — `src/v1/model.ts:1525`
- **Why weird:** Bare `string[]`. Doc says "The suggested follow-up questions". The questions are also typed elsewhere as a free-text input (`content` on a `GenieCreateConversationMessageRequest`) — so the type tells you nothing about the format.
- **Category:** 1 (vague — questions could be markdown, plain, etc.).
- **Suggested name:** `followUpQuestions: string[]` (clearer; matches the JSDoc).
- **Rationale:** Field name disambiguation.

### 46. `MessageError.error` — field has the same name as the parent struct's concept — `src/v1/model.ts:1578`
- **Why weird:** `MessageError.error: string`. Reader sees `someError.error` (two `error`s). Some other fields are similarly self-referential (`Result.statementId`, OK because `Result` is generic; here `MessageError.error` is *the error message*).
- **Category:** 15 (generic field name), 1 (vague).
- **Suggested name:** `MessageError.message: string` (matches the JSON shape) or `MessageError.detail`.
- **Rationale:** Wire format on the server may already be `error_message`; check before renaming.

### 47. `MessageError.type: MessageError_Type` — `src/v1/model.ts:1579`
- **Why weird:** Field name `type` is a JS reserved-word-adjacent (TS allows it, but `type` collides with the `type` keyword used in TS type aliases — refactoring tools sometimes choke).
- **Category:** 10 (reserved-word collision), 1 (vague).
- **Suggested name:** `errorType` / `category` / `kind`.
- **Rationale:** Common collision; small ergonomics win.

### 48. `Thought.thoughtType: ThoughtType` — `src/v1/model.ts:1756`
- **Why weird:** `Thought.thoughtType` repeats "thought" twice. Could just be `Thought.type`.
- **Category:** 8 (redundant suffix), 7 (overly verbose).
- **Suggested name:** `Thought.type` (and rename `ThoughtType` → `Thought.Kind` namespace).
- **Rationale:** Reduces redundancy.

### 49. `GenieAttachment.attachmentId` — bare id alongside variant-specific ids — `src/v1/model.ts:932`
- **Why weird:** `attachmentId` on the parent; `TextAttachment.id` (line 1737) and `GenieQueryAttachment.id` (line 1452) inside variants. Three different id fields for the same logical entity (the attachment).
- **Category:** 19 (underspecified id), 12 (duplicate concept).
- **Suggested name:** Single `id` on `GenieAttachment`, remove inner ids.
- **Rationale:** See #30, #31, #49 together.

### 50. `GenieGetSpaceRequest.includeSerializedSpace` — long boolean — `src/v1/model.ts:1262`
- **Why weird:** Boolean toggle that expands the response. Permission check is documented ("Requires at least CAN EDIT permission"). Boolean naming style varies across SDK: `enableX`, `includeX`, `withX`. Could be `withSerializedSpace` or `includeSerialized` (the parent struct is already a Space).
- **Category:** 7 (overly verbose).
- **Suggested name:** `withSerialized` / `expandSerialized`.
- **Rationale:** The struct context already says "Space"; the prefix is redundant.

## Low severity

### 51. `genieCreateConversationMessageWaiter` and `genieStartConversationWaiter` — `Waiter` suffix — `src/v1/client.ts:188,992`
- **Why weird:** Same pattern as flagged in the `database` audit (#14): a "Waiter" class with a verb-prefixed name. Reads as "the *create-conversation-message* waiter". The class itself is named `GenieCreateConversationMessageWaiter`.
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll-helper naming).
- **Suggested name:** `MessagePoller`, `MessageCompletionPoller`, `MessageWait`. Or fold into `createConversationMessage({wait: true})`.
- **Rationale:** Class names should be noun phrases; current name reads as a verb.

### 52. `GenieCreateConversationMessage` — verb chain `Create + Conversation + Message` — `src/v1/model.ts:961, client.ts:160`
- **Why weird:** Reads as "create a conversation message" — but `conversation message` is not a thing, it's a "message inside a conversation". The triple noun ladder also appears in `GenieDeleteConversationMessage`, `GenieGetConversationMessage`, `GenieListConversationMessages`.
- **Category:** 7 (overly verbose).
- **Suggested name:** `AddMessage` / `PostMessage` (verb-noun pair) on the client; type names `AddMessageRequest`. Or shorten to `Conversation.AddMessage(...)` if the SDK supported sub-clients.
- **Rationale:** "Create a conversation message" reads awkwardly; "send a message" or "add a message" is shorter and clearer.

### 53. `genieListConversationComments` returns `comments` — plural matches but parent path drops "Message" — `src/v1/client.ts:682, model.ts:1278`
- **Why weird:** `ListConversationCommentsResponse.comments: GenieMessageComment[]`. The item type is `GenieMessageComment` but the response field is `comments` (without `messageComments`). At item level, the parent is `GenieMessageComment` (only modelled as a comment-on-a-message — no separate `ConversationComment` type), so the endpoint name `genieListConversationComments` is misleading: it lists *message* comments across the whole conversation.
- **Category:** 6 (misleading method name), 17 (inconsistent naming between method, type, and field).
- **Suggested name:** `listMessageCommentsInConversation` or `listAllMessageComments`. Or introduce a `ConversationComment` type.
- **Rationale:** Reader expects a conversation-level comment thread; gets back message-level comments.

### 54. `Format` enum has 4 values; only sentinel is prefixed — `src/v1/model.ts:546-551`
- **Why weird:** `FORMAT_UNSPECIFIED` then `JSON_ARRAY`, `ARROW_STREAM`, `CSV`. Same inconsistent-prefix pattern as #17 / #18.
- **Category:** 17, 2.
- **Suggested name:** `Format.Unspecified | JsonArray | ArrowStream | Csv`.
- **Rationale:** Same as #13.

### 55. `Format.ARROW_STREAM` — `Arrow` is Apache Arrow (acronym), `STREAM` is uppercased — `src/v1/model.ts:549`
- **Why weird:** Value `ARROW_STREAM` casing. The product name is `Apache Arrow` — `Arrow` is title-case in TS naming. As an enum value `ARROW_STREAM` is conventional (SCREAMING_SNAKE) but mixed with `JSON_ARRAY` and `CSV` where one is fully-cap acronym and one is mixed.
- **Category:** 3 (acronym casing), 17 (mixed conventions within the enum).
- **Suggested name:** `ArrowStream` (in a Pascal-case enum).
- **Rationale:** Low priority — enum-value style is widely-debated.

### 56. `GenieMessage.queryResult: Result | undefined` deprecated field — `src/v1/model.ts:1415`
- **Why weird:** Field is marked deprecated in JSDoc ("Use `query_result_metadata` in `GenieQueryAttachment` instead"). Still exported. Type is `Result` (the bare `Result` type — see #38).
- **Category:** 12 (duplicate concept — kept-for-compat), 1 (vague — `Result`).
- **Suggested name:** Mark with `/** @deprecated */` JSDoc (current text just says "Deprecated" — TS tooling won't strike-through).
- **Rationale:** Tooling support — modern TS understands `@deprecated`.

### 57. `genieGetQueryResultByAttachment` — `By` clause is Java/Spring-style — `src/v1/client.ts:620`
- **Why weird:** Method named `GetXByY` follows Spring Data convention. Other JS SDKs prefer flat verb-noun. Also the body has the same fields as `genieGetMessageAttachmentQueryResult` — they are duplicates (one path-segment ordering differs).
- **Category:** 14 (Java/Spring-style naming), 12 (duplicate concept).
- **Suggested name:** Mark as `@deprecated` (already partially), then remove.
- **Rationale:** Cleanup; clients should migrate to the canonical name.

### 58. `GenieEvalResult.createdByUser: number` — `By` clause inside a field name — `src/v1/model.ts:1048`
- **Why weird:** Field is named `createdByUser` rather than `createdBy`. `By User` is redundant: a `createdBy` field is by-its-nature-by-a-user (or by a service principal). Compare `GenieEvalRunResponse.runByUser` (same pattern, line 1114).
- **Category:** 7 (overly verbose), 17 (inconsistent vs other types in the SDK using `createdBy`).
- **Suggested name:** `createdBy` (matches the rest of the SDK).
- **Rationale:** Aligns with `databricks-sdk-go` conventions and most peer types.

### 59. `GenieEvalRunResponse.runByUser` — `By User` pattern — `src/v1/model.ts:1114`
- **Why weird:** Same as #58.
- **Category:** 7, 17.
- **Suggested name:** `runBy` / `runByUserId`.
- **Rationale:** Same as #58.

### 60. `GenieEvalResult.benchmarkAnswer` vs `GenieEvalResultDetails.actualResponse` / `expectedResponse` — naming asymmetry — `src/v1/model.ts:1046,1103,1105`
- **Why weird:** `GenieEvalResult` stores the original "benchmark answer" as a flat string; `GenieEvalResultDetails` returns the actual/expected as arrays of `GenieEvalResponse`. Three different words for "the right answer" / "Genie's answer" / "the expected answer".
- **Category:** 17 (inconsistent word choice), 1 (vague — `answer` vs `response`).
- **Suggested name:** Pick one verb. E.g., `expectedAnswer` / `actualAnswer` (or `expectedResponse` / `actualResponse` for both types).
- **Rationale:** Reader has to relearn the vocabulary in each type.

### 61. `GenieEvalResultDetails.evalRunStatus` — `evalRun` prefix inside the result-details type — `src/v1/model.ts:1060`
- **Why weird:** A `GenieEvalResultDetails` describes a single result inside a run. The field `evalRunStatus` describes the *run's* status, not the result's status. The plain `status` field appears on `GenieEvalResult` (line 1042) but is gone here — replaced by `evalRunStatus`. So the same enum (`EvaluationStatusType`) is exposed under two different field names.
- **Category:** 17 (inconsistent field naming for the same concept), 6 (misleading — `evalRunStatus` on a result-details type confuses run-status with result-status).
- **Suggested name:** `runStatus` (with the run context clear from the parent type's purpose).
- **Rationale:** Same status enum, two field names is jarring.

### 62. `GenieEvalResultDetails.manualAssessment: boolean` — `src/v1/model.ts:1064`
- **Why weird:** Two adjacent fields: `assessment: GenieEvalAssessment` and `manualAssessment: boolean`. The second is a flag indicating whether the first was set manually. The naming implies that `manualAssessment` is itself an assessment.
- **Category:** 6 (misleading — `manualAssessment` looks like "the manual assessment value"), 1 (vague).
- **Suggested name:** `assessmentIsManual` / `isManuallyAssessed`.
- **Rationale:** Boolean-prefix convention disambiguates.

### 63. `GenieListConversationsRequest.includeAll` boolean — `src/v1/model.ts:1312`
- **Why weird:** `includeAll: boolean`. JSDoc clarifies "Include all conversations in the space across all users". `All` is unqualified; could mean "include archived", "include all spaces", "include all messages".
- **Category:** 1 (vague), 6 (misleading without docs).
- **Suggested name:** `includeAllUsers` / `acrossUsers` / `allUsers`.
- **Rationale:** Boolean toggles need to be unambiguous from the name.

### 64. `pageSize` / `pageToken` casing — `src/v1/model.ts:1271,1273,1289,1291,...`
- **Why weird:** Standard pagination fields; this is fine. Noted to confirm consistency across the package.
- **Category:** Observation only — no issue.
- **Suggested name:** N/A.
- **Rationale:** Confirms the package's pagination naming is consistent.

### 65. `ColumnInfo.typeText` / `typeName` / `typePrecision` / `typeScale` / `typeIntervalType` / `typeJson` — `type` prefix repeated — `src/v1/model.ts:807-818`
- **Why weird:** Six fields all prefixed `type*`. Hoisting into a sub-struct `type: { text, name, precision, scale, intervalType, json }` would be cleaner. Generator-faithful flat shape duplicates the prefix.
- **Category:** 7 (overly verbose), 8 (redundant prefix).
- **Suggested name:** Sub-struct, or trim the prefix.
- **Rationale:** Aesthetic; matches the protobuf shape.

### 66. `ColumnInfo.typeIntervalType` — `type` doubled — `src/v1/model.ts:816`
- **Why weird:** `typeIntervalType` doubles the word "type". Doc: "Format of IntervalType."
- **Category:** 7 (overly verbose).
- **Suggested name:** `intervalFormat` (in a sub-struct) or `intervalType`.
- **Rationale:** Trim the doubled word.

### 67. `ExternalLink_HttpHeadersEntry` — `_` underscore type — `src/v1/model.ts:904`
- **Why weird:** Proto-generated entry type with underscore. Used internally for the map serialization.
- **Category:** 4 (underscores in TS identifiers), 14 (proto-style nested name).
- **Suggested name:** Map directly to `Record<string, string>` (the parent field `httpHeaders` is already typed as `Record<string, string>`).
- **Rationale:** The proto-style underscore name leaks into the public surface even though the parent field uses a flat `Record`.

### 68. `Schema` type name — too generic — `src/v1/model.ts:1680`
- **Why weird:** `Schema` is one of the most-overloaded names in the SDK (Unity Catalog Schema, SQL schema, JSON schema, Avro schema, etc.). This `Schema` is a SQL result schema (`columnCount`, `columns`).
- **Category:** 1 (vague/generic), 12 (collides with UC `Schema`).
- **Suggested name:** `ResultSchema`.
- **Rationale:** Collision with UC `Schema` will bite consumers who import from both.

### 69. `Struct` type name — too generic, copied from proto wkt — `src/v1/model.ts:1729`
- **Why weird:** `Struct` is the proto Well-Known Type `Struct` (an arbitrary JSON-object value). Calling this `Struct` clashes with TS's natural use of "struct" for any object.
- **Category:** 1 (vague/generic), 12 (proto wkt copy).
- **Suggested name:** Use `Record<string, unknown>` directly, or call it `JsonObject` / `ProtoStruct`.
- **Rationale:** WKT types leaking through the public API surface should be unwrapped.

## Observations

### 70. `GenieGetSpaceRequest.includeSerializedSpace` — feature parity with #50
- **Observation:** Listed under #50. Documenting here for cross-reference.

### 71. `Value` Well-Known-Type — empty in JS, hand-rolled — `src/v1/model.ts:1771`
- **Observation:** `Value` is the proto WKT for arbitrary JSON values. The TS shape is `{ kind: { $case: 'nullValue' | 'numberValue' | 'stringValue' | 'boolValue' | 'structValue' | 'listValue', ... } | undefined }` — 24 lines of TS for what JS represents as `unknown`. Same for `Struct`, `ListValue`, `MapStringValueEntry`.
- **Suggested name:** Replace `Value | Struct | ListValue` with `unknown` (or `JsonValue`) at marshal boundary.
- **Rationale:** Genie doesn't actually use these in any public method body; they exist only as transitive types referenced by `Result.* → ResultData.dataArray` (whose elements are `ListValue` of `Value`). The proto-WKT shape is buying nothing.

### 72. `unmarshalGenieMessageSchema` returns a `GenieMessage` but the input keys are snake_case — `src/v1/model.ts:2188`
- **Observation:** Standard generator pattern. Worth noting that the package has 50 `unmarshalXSchema` exports and 14 `marshalXSchema` exports — generator-faithful. Not a naming bug per se.

### 73. Inconsistent `request field X required for polling is missing` error messages — `src/v1/client.ts:195,200,204,1000,1004,1008`
- **Observation:** All six error strings phrased identically, but `response field` vs `request field` distinction is correct. No naming bug; documentation only.
