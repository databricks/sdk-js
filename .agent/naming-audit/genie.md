# Naming Audit: genie

**Path:** `packages/genie/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 16

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 4 |
| Low | 6 |

## High severity

### 1. Method naming wildly inconsistent: 26 of 28 public methods are `genieXxx`, 2 are bare — `src/v1/client.ts:132,1152`
- **Why weird:** `client.ts` exposes 28 public methods. 26 are prefixed `genie` (e.g. `genieGetSpace`, `genieListSpaces`, `genieTrashSpace`). Two are not: `createSpace` (line 132) and `updateSpace` (line 1152). Reader calling `client.createSpace(...)` then trying `client.deleteSpace(...)` discovers the delete equivalent is named `genieTrashSpace(...)`. The "trash" method name is also inconsistent (see #2).
- **Category:** 17 (inconsistent action verbs / prefix), 6 (misleading — autocomplete shows two naming families).
- **Suggested name:** Pick one and apply uniformly. Either drop the `genie` prefix everywhere (the package is already `@databricks/sdk-genie` — the prefix is tautological) or keep it everywhere (`genieCreateSpace`, `genieUpdateSpace`). Strongly prefer the former.
- **Rationale:** Every method in the client is on a Genie `Client` imported from `@databricks/sdk-genie`. Prefixing every method with `genie` is type-suffix tautology — `client.genieListSpaces()` is no clearer than `client.listSpaces()`. The current half-prefixed surface is the worst of both options.

### 2. `genieTrashSpace` is the only delete-style method named `Trash` — `src/v1/client.ts:1129`
- **Why weird:** All other delete methods are `genieDeleteX` (`genieDeleteConversation`, `genieDeleteConversationMessage`). The space delete is `genieTrashSpace` and the request type is `GenieTrashSpaceRequest`. JSDoc says "Move a Genie Space to the trash" — i.e. it is a soft delete, not a destructive one — but the name still breaks the `delete*` pattern.
- **Category:** 17 (inconsistent action verb), 14 (Go/Java-style "trash" verb is uncommon in JS SDKs).
- **Suggested name:** `genieDeleteSpace` (matches the other deletes; document the soft-delete semantics in JSDoc) or, if soft-delete needs to be explicit, mirror it on the messages too (`genieTrashConversationMessage`).
- **Rationale:** Inconsistency forces every reader to learn the exception. The "soft delete" semantic can be conveyed by docs without leaking into the verb.

### 3. `genieExecuteMessageAttachmentQuery` vs `genieGetMessageAttachmentQueryResult` vs `genieGenerateDownloadFullQueryResult` — three different verbs for retrieving the same data — `src/v1/client.ts:337,621,433`
- **Why weird:** The package has at least four "get the SQL result" entry points (`Execute`, `Get`, `Generate`, plus `genieGetQueryResultByAttachment`/`genieGetMessageQueryResult` deprecated aliases). Each uses a different verb stem. `Execute` re-runs the query; `Get` reads the result; `Generate` initiates a download — but the user has to read each docstring to learn that.
- **Category:** 17 (inconsistent action verbs), 7 (overly verbose).
- **Suggested name:** Group with verb pairs: `runMessageAttachmentQuery` (re-execute) / `getMessageAttachmentQueryResult` (read) / `startMessageAttachmentDownload` + `getMessageAttachmentDownload` (download flow).
- **Rationale:** The verbs `Execute` / `Get` / `Generate` overlap in everyday English; the type system gives no hint which one to call first. The current names are generator-faithful but unhelpful for users.

### 4. `GenieSpace` — domain meaning of "Space" is opaque without docs — `src/v1/model.ts:1540`
- **Why weird:** The central noun. A `GenieSpace` is a "workspace scoped to a Genie deployment", but the word `Space` is one of the most overloaded terms in the Databricks SDK (it also appears in workspace, mlflow registered model, dashboards, etc.). Type doc on the class itself is one line ("Genie space ID"). Reader sees `GenieSpace` and has to consult external docs to learn whether it's a folder, a user-permission boundary, a model-deployment, or something else.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning — `Space`).
- **Suggested name:** `GenieRoom`, `GenieAgent`, `GenieDeployment`, or at minimum a JSDoc on the type explaining what a "space" *is* (warehouse + datasets + instructions). If "Space" is the Databricks product-marketing term, document it inline.
- **Rationale:** This is the package's central concept. Letting it stand on a single word that means "container" is a documentation gap as much as a naming bug.

### 5. `EvaluationStatusType` — type name has redundant `Type` suffix — `src/v1/model.ts:543`
- **Why weird:** The type is named `EvaluationStatusType`. Every enum is by definition a "type", so the suffix adds nothing. Peer enums in the same file use bare-noun names (`ScoreReason`, `ThoughtType` — though `ThoughtType` is itself debatable, `Format`, `MessageStatus_MessageStatus`).
- **Category:** 8 (redundant `Type` suffix on enum name).
- **Suggested name:** `EvaluationStatus`.
- **Rationale:** This enum is exposed on `GenieEvalResult.status` and `GenieEvalResultDetails.evalRunStatus`; trimming the suffix shortens both call sites without losing information.

### 6. `DatabricksServiceExceptionProto` — proto-arch-leak: `Service` mid + `Proto` suffix — `src/v1/model.ts:916`
- **Why weird:** The type name stacks three architectural-layer words: `Service` (server-side tier), `Exception` (Java vocabulary), and `Proto` (wire-format suffix). None of these belong in a public TS SDK surface — the SDK exposes errors, not Java exceptions, and not proto messages. JSDoc reinforces the leak: "Serialization format for DatabricksServiceException. Note the definition of this message should be in sync with DatabricksServiceExceptionWithDetailsProto defined in /api-base/proto/exception_with_details.proto". The companion schema is `unmarshalDatabricksServiceExceptionProtoSchema` (line 1936), propagating the leak.
- **Category:** Proto-architectural-leak (`Proto` suffix, `Service` mid), 14 (Java-style `Exception` vocabulary in TS), 12 (duplicate concept — the SDK already has `ApiError`).
- **Suggested name:** Delete the type and reuse `ApiError` from `@databricks/sdk-databricks/apierror`. If the wire-format shape must be kept locally, name it `ApiErrorPayload` or `WireError` and treat it as an internal marshal-time type, not a public export.
- **Rationale:** `Service`, `Exception`, and `Proto` are all backend implementation vocabulary that should never reach the user-facing SDK surface. The type is unused by any public method body, making the leak gratuitous.

## Medium severity

### 7. `GenieAttachment.attachment` discriminated-union field has the same name as its parent — `src/v1/model.ts:970`
- **Why weird:** `GenieAttachment.attachment` is a `{ $case: 'text' | 'query' | 'suggestedQuestions', … } | undefined` field. Reading `myAttachment.attachment.text` reads as "the attachment of the attachment", and the parent `GenieAttachment` also has a peer field `attachmentId`. The shape mixes the discriminator field with a flat id field.
- **Category:** 15 (generic field name losing meaning).
- **Suggested name:** Hoist to a top-level discriminated union so the variant lives at the type level rather than under a nested same-named field: `type GenieAttachment = ({kind: 'text', text: TextAttachment} | {kind: 'query', query: GenieQueryAttachment} | {kind: 'suggestedQuestions', suggestedQuestions: GenieSuggestedQuestionsAttachment}) & {id?: string}`.
- **Rationale:** Same struct, single name; the parent-name-shaped field name confuses readers traversing nested attachments.

### 8. `GenieEvalRunResponse` is the entity type, not just a "response" — `src/v1/model.ts:1167`
- **Why weird:** Type name ends `Response`, suggesting an HTTP envelope. Actually it is the eval-run *entity* (resource): it has `evalRunId`, status fields, counts, timestamps. It is returned from `createEvalRun`, `getEvalRun`, and nested as elements inside `listEvalRuns`. Compare with `GenieListEvalRunsResponse` (true envelope).
- **Category:** 8 (redundant suffix `Response` for an entity), 6 (misleading suffix).
- **Suggested name:** `GenieEvalRun` (the resource). Then `getEvalRun(): Promise<GenieEvalRun>`.
- **Rationale:** Every other entity in the package is `GenieX` (no suffix). The `Response` suffix here is a generator artefact: the API returns a single instance, the generator wrote it as `*Response`.

### 9. `GenieGenerateDownloadFullQueryResultResponse` — type name is a sentence — `src/v1/model.ts:1227`
- **Why weird:** 7 words concatenated: `Genie + Generate + Download + Full + Query + Result + Response` = 49 characters. Verb-tense issue: `Generate` is present tense; everywhere else in the API we use noun-phrase types.
- **Category:** 7 (overly verbose), 13 (verb-tense inconsistency).
- **Suggested name:** `DownloadStartResponse` / `StartDownloadResponse` (the action is "start a download flow"); the body is `downloadId` + `downloadIdSignature`.
- **Rationale:** This is the longest single identifier in the file. Generator-faithful, but the name is wider than most callers' editors.

### 10. `GenieGenerateDownloadFullQueryResultRequest` / `GenieGetDownloadFullQueryResultRequest` — pairs spell out long ladder of nouns — `src/v1/model.ts:1216,1243`
- **Why weird:** Same as #9 — these are the request twins. The phrase "Full Query Result" is also under-qualified: it distinguishes from "partial" (a `GetMessageAttachmentQueryResult` is also a full result, just inline).
- **Category:** 7 (overly verbose), 6 (misleading — `Full` does not actually contrast with `Partial` anywhere).
- **Suggested name:** Pair `StartDownloadRequest` + `GetDownloadRequest`, or `BeginDownloadRequest` + `PollDownloadRequest`.
- **Rationale:** The download-flow methods are conceptually a state machine — name the state transitions.

## Low severity

### 11. `Result` type name — too generic — `src/v1/model.ts:1671`
- **Why weird:** A top-level type named `Result` in a public package is the most-vague-possible name. In the genie package alone there are also `ResultData`, `ResultManifest`, `GenieResultMetadata`, `StatementResponse.result`, `GenieEvalResult`. The bare `Result` carries a 4-field SQL execution shape.
- **Category:** 1 (vague/generic).
- **Suggested name:** `SqlQueryResult` / `MessageQueryResult` / `QueryResultSummary`.
- **Rationale:** `Result` is also a TS standard-library-adjacent name (`Result<T, E>` from many libraries); collisions are likely.

### 12. `GenieSuggestedQuestionsAttachment` — payload type name redundant with parent — `src/v1/model.ts:1582`
- **Why weird:** The payload type is `GenieSuggestedQuestionsAttachment` for the discriminator value `'suggestedQuestions'` on `GenieAttachment`. The word `Attachment` is already in the parent (`GenieAttachment`) — three repetitions of "attachment" / "suggested questions" / "questions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** Payload type `SuggestedQuestions { questions: string[] }`.
- **Rationale:** Reduce noise per attachment.

### 13. `genieCreateConversationMessageWaiter` and `genieStartConversationWaiter` — `Waiter` suffix — `src/v1/client.ts:1182,1259`
- **Why weird:** Same pattern as flagged in the `database` audit (#2): a "Waiter" class with a verb-prefixed name. Reads as "the *create-conversation-message* waiter". The class itself is named `GenieCreateConversationMessageWaiter`.
- **Category:** 6 (misleading verb-as-prefix), 14 (Go-style poll-helper naming).
- **Suggested name:** `MessagePoller`, `MessageCompletionPoller`, `MessageWait`. Or fold into `createConversationMessage({wait: true})`.
- **Rationale:** Class names should be noun phrases; current name reads as a verb.

### 14. `GenieCreateConversationMessage` — verb chain `Create + Conversation + Message` — `src/v1/model.ts:1020, client.ts:165`
- **Why weird:** Reads as "create a conversation message" — but `conversation message` is not a thing, it's a "message inside a conversation". The triple noun ladder also appears in `GenieDeleteConversationMessage`, `GenieGetConversationMessage`, `GenieListConversationMessages`.
- **Category:** 7 (overly verbose).
- **Suggested name:** `AddMessage` / `PostMessage` (verb-noun pair) on the client; type names `AddMessageRequest`. Or shorten to `Conversation.AddMessage(...)` if the SDK supported sub-clients.
- **Rationale:** "Create a conversation message" reads awkwardly; "send a message" or "add a message" is shorter and clearer.

### 15. `genieListConversationComments` returns `comments` — plural matches but parent path drops "Message" — `src/v1/client.ts:755, model.ts:1335`
- **Why weird:** `ListConversationCommentsResponse.comments: GenieMessageComment[]`. The item type is `GenieMessageComment` but the response field is `comments` (without `messageComments`). At item level, the parent is `GenieMessageComment` (only modelled as a comment-on-a-message — no separate `ConversationComment` type), so the endpoint name `genieListConversationComments` is misleading: it lists *message* comments across the whole conversation.
- **Category:** 6 (misleading method name), 17 (inconsistent naming between method, type, and field).
- **Suggested name:** `listMessageCommentsInConversation` or `listAllMessageComments`. Or introduce a `ConversationComment` type.
- **Rationale:** Reader expects a conversation-level comment thread; gets back message-level comments.

### 16. `genieGetQueryResultByAttachment` — `By` clause is Java/Spring-style — `src/v1/client.ts:685`
- **Why weird:** Method named `GetXByY` follows Spring Data convention. Other JS SDKs prefer flat verb-noun. Also the body has the same fields as `genieGetMessageAttachmentQueryResult` — they are duplicates (one path-segment ordering differs).
- **Category:** 14 (Java/Spring-style naming), 12 (duplicate concept).
- **Suggested name:** Mark as `@deprecated` (already partially), then remove.
- **Rationale:** Cleanup; clients should migrate to the canonical name.
