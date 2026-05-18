# Naming Audit: knowledgeassistants

**Path:** `packages/knowledgeassistants/src/v1/`
**Versions audited:** v1
**Inferred domain:** "Knowledge Assistant" CRUD plus three child sub-resources:
(a) `Example` (question + guidelines pairs that steer the assistant),
(b) `KnowledgeSource` (a typed pointer into UC — vector-search `IndexSpec`,
volume `FilesSpec`, or table `FileTableSpec`), and (c) a `sync` action that
re-ingests all non-index sources for one assistant. `KnowledgeAssistant` and
`KnowledgeSource` each carry their own proto-style nested lifecycle enum
(`CREATING/ACTIVE/FAILED` and `UPDATING/UPDATED/FAILED_UPDATE`).
**Total weird names flagged:** 39

## Summary
| Severity | Count |
| --- | --- |
| High | 12 |
| Medium | 12 |
| Low | 9 |
| Observation | 6 |

## High severity

### 1. `KnowledgeAssistant_State` proto-style underscored type name — `src/v1/model.ts:9`
- **Why weird:** The enum is named `KnowledgeAssistant_State`, with a literal underscore in the TypeScript identifier. The file even disables `@typescript-eslint/naming-convention` for the line (`-- Proto-style nested enum name.`). Underscores in a public TypeScript type name are a direct violation of the Google TypeScript Style Guide (https://google.github.io/styleguide/tsguide.html#identifiers — "Identifiers must use only ASCII letters, digits, underscores (for constants and structured test method names), and the '$' sign"). The lint suppression is itself an admission that the name does not fit the project conventions. Sibling SDK packages have already renamed similar nested enums (e.g., `customllms` flattened proto `OptimizationRun.State` to a top-level `State`; this package keeps the proto-style `Parent_Inner` name).
- **Category:** 4 (underscore in TS identifier), 14 (Go/proto-style name).
- **Suggested name:** `KnowledgeAssistantState` (no underscore) or move it to a top-level `AssistantLifecycleState`. Wire-side `STATE_UNSPECIFIED/CREATING/ACTIVE/FAILED` values are unaffected.
- **Rationale:** The lint disable on line 8 documents the rule violation. Every other Databricks SDK JS enum (jobs, clusters, queries) uses PascalCase without underscores; this package is the outlier. Underscored type names break TS namespace conventions and confuse tooling that splits on `_`.

### 2. `KnowledgeSource_State` proto-style underscored type name — `src/v1/model.ts:17`
- **Why weird:** Same problem as #1 — `KnowledgeSource_State` carries an underscore in the identifier and the same lint suppression on line 16. Once renamed it pairs with the cousin (`KnowledgeAssistantState` / `KnowledgeSourceState`).
- **Category:** 4 (underscore in TS identifier), 14 (Go/proto-style name).
- **Suggested name:** `KnowledgeSourceState` or `SourceIngestionState`.
- **Rationale:** Same as #1; both enums share the same defect.

### 3. `KnowledgeAssistant_State.STATE_UNSPECIFIED` redundant enum prefix + proto sentinel — `src/v1/model.ts:10`
- **Why weird:** Reading the value at a call site is `KnowledgeAssistant_State.STATE_UNSPECIFIED` — the token `State` appears twice, and the value is a proto-buf "zero value" sentinel that has no meaning in TypeScript (TS uses `undefined` for "not set"). The wire payload may still send `"STATE_UNSPECIFIED"` for forward compatibility, but the TypeScript side does not need a member for it: every field that takes a state is already `state?: ... | undefined`.
- **Category:** 2 (redundant enum prefix), 14 (proto-style sentinel), 18 (long enum value).
- **Suggested name:** Drop the `STATE_UNSPECIFIED` member; rename remaining values to PascalCase (`Creating`, `Active`, `Failed`) per the Google TypeScript Style Guide. Keep the existing wire values via Zod transform if needed.
- **Rationale:** TS callers must either branch on `STATE_UNSPECIFIED` (which is semantically identical to `state === undefined`) or alias it. Either way the member adds friction without value.

### 4. `KnowledgeSource_State.STATE_UNSPECIFIED` redundant enum prefix + proto sentinel — `src/v1/model.ts:18`
- **Why weird:** Same as #3, applied to the source-side state enum.
- **Category:** 2, 14, 18.
- **Suggested name:** Drop `STATE_UNSPECIFIED`; PascalCase the remaining values (`Updating`, `Updated`, `FailedUpdate`).
- **Rationale:** Identical reasoning to #3.

### 5. `KnowledgeSource_State.FAILED_UPDATE` vs `KnowledgeAssistant_State.FAILED` — `src/v1/model.ts:13,21`
- **Why weird:** The two sibling state enums describe lifecycle failure with two different conventions: the assistant uses bare `FAILED`, the source uses `FAILED_UPDATE`. Both enums also use bare past-participle progressives (`CREATING/UPDATING`) for the in-flight state, but only the source enum qualifies the failure with the verb (`FAILED_UPDATE`). A future `DELETE` operation on either resource would surface this asymmetry — the assistant would need `FAILED` to mean "create failed" *and* "delete failed," while the source already qualifies. Consumers reading both enums side by side will assume the assistant's `FAILED` covers something specific, when in fact it is overloaded.
- **Category:** 6 (misleading), 17 (inconsistency across sibling enums), 13 (verb-tense inconsistency: bare `FAILED` vs `FAILED_UPDATE`).
- **Suggested name:** Align: either both enums use bare `FAILED` (and document that it is operation-agnostic) or both qualify (`FAILED_CREATE` vs `FAILED_UPDATE`). The source enum's name `FAILED_UPDATE` (verb after `FAILED`) is also grammatically awkward — `UPDATE_FAILED` is the standard ordering.
- **Rationale:** Two sibling enums in the same file with the same conceptual shape should use the same naming pattern. Today they diverge for no reason.

### 6. `KnowledgeSource_State.UPDATED` reads as past-participle, not lifecycle terminal — `src/v1/model.ts:20`
- **Why weird:** The "successfully ingested / ready" terminal state is named `UPDATED` — past tense of the in-flight `UPDATING`. A reader scanning `UPDATING/UPDATED/FAILED_UPDATE` will see "the source has been updated" which sounds transient (it was just updated, then something else might happen). The sibling assistant enum uses `ACTIVE` for the same concept (the resource is ready and operational), which is much clearer.
- **Category:** 6 (misleading), 13 (verb tense), 17 (inconsistency: assistant has `ACTIVE`, source has `UPDATED`).
- **Suggested name:** `READY` (or `ACTIVE`, matching the assistant) for the ready/operational state. `UPDATING` stays for in-flight.
- **Rationale:** `UPDATED` implies "the action happened" rather than "the resource is in a ready state." A state enum should describe the resource's condition, not the last operation that touched it.

### 7. `name` field overloaded with semantic role — every request and entity — `src/v1/model.ts:55,64,72,84,120,129,137,160,209,315,324,359`
- **Why weird:** Every request and entity uses bare `name` for the "full resource name" (`knowledge-assistants/{id}` or `.../examples/{id}` etc.). At the call site this is fine for one resource type but consumers chain operations across `KnowledgeAssistant`, `KnowledgeSource`, and `Example` — three `name`s in scope all meaning different things. `DeleteKnowledgeSourceRequest.name` is the source name; `SyncKnowledgeSourcesRequest.name` is the **assistant** name (the parent — see model.ts:312). That ambiguity is exactly what generic `name` causes. Compare with `Example.exampleId` and `KnowledgeAssistant.id` on the same file: when a typed id exists, it is more specific than `name`.
- **Category:** 1 (vague/generic), 15 (generic field losing meaning), 19 (underspecified id).
- **Suggested name:** Type-qualified: `assistantName`, `sourceName`, `exampleName`. Or, more aligned with Google AIP-122 (https://google.aip.dev/122): keep `name` *only* when the field unambiguously identifies the **same** resource type that the request operates on; rename to `parent` (already used elsewhere — see #8) when it identifies a parent.
- **Rationale:** `SyncKnowledgeSourcesRequest.name` is the prime offender: the field is the *assistant* id, but the request is named for sources, so a reader expects the field to be a source id. A typed name (`assistantName`) closes the gap.

### 8. `parent` field generic and inconsistent with `name` — `src/v1/model.ts:30,45,248,300,315`
- **Why weird:** `CreateExampleRequest.parent`, `CreateKnowledgeSourceRequest.parent`, `ListExamplesRequest.parent`, `ListKnowledgeSourcesRequest.parent`, and `SyncKnowledgeSourcesRequest.name` all refer to **the same wire concept** — a `knowledge-assistants/{id}` resource path. Four of them are called `parent`; the fifth is called `name`. AIP-132 (https://google.aip.dev/132) uses `parent` for list/create requests under a parent resource, so the four are AIP-correct. The `SyncKnowledgeSourcesRequest.name` outlier is the bug — its doc even says "The resource name of the Knowledge Assistant" (model.ts:312).
- **Category:** 17 (inconsistency: `parent` vs `name` for the same concept), 16 (field name contradicts the operation's target).
- **Suggested name:** Rename `SyncKnowledgeSourcesRequest.name` → `parent` to match the four sibling requests; alternatively rename all five to `assistant` or `knowledgeAssistantName`.
- **Rationale:** A consumer who's just learned that `parent` means "the assistant" will write `{parent: '...'}` into `SyncKnowledgeSourcesRequest` and the type checker will reject it for no good reason.

### 9. `KnowledgeAssistant.id` vs `Example.exampleId` vs `KnowledgeSource.id` inconsistency — `src/v1/model.ts:93,164,235`
- **Why weird:** Three sibling entities, three id conventions:
  - `KnowledgeAssistant.id?: string` (bare `id`)
  - `KnowledgeSource.id?: string` (bare `id`, no doc)
  - `Example.exampleId?: string` (qualified `exampleId`)
  The bare `id` is doc'd as "The universally unique identifier (UUID) of the Knowledge Assistant" on `KnowledgeAssistant`, but `KnowledgeSource.id` has *no* JSDoc at all (model.ts:235). Compare with the sibling `supervisoragents` package: `SupervisorAgent.supervisorAgentId` (fully qualified, plus a deprecated `id` for back-compat) and `Tool.toolId`. The `knowledgeassistants` package is the inconsistent neighbor.
- **Category:** 1 (vague), 17 (inconsistency within the same package), 19 (underspecified id).
- **Suggested name:** `KnowledgeAssistant.knowledgeAssistantId` or `KnowledgeAssistant.assistantId`; `KnowledgeSource.knowledgeSourceId` or `sourceId`; keep `Example.exampleId` as-is.
- **Rationale:** Bare `id` is the most common footgun when two resources are passed to the same function (e.g., a UI dialog editing both an assistant and one of its sources). Typed ids prevent type-checker false negatives.

### 10. `KnowledgeSource.sourceType: string` — stringly-typed when it should be an enum — `src/v1/model.ts:227`
- **Why weird:** The doc literally enumerates the allowed values: `'The type of the source: "index", "files", or "file_table"'`. A `string` typing means callers can write `sourceType: 'INDEX'` (wrong case) or `sourceType: 'vector_search'` (typo) and the compiler accepts both. Same package already uses Zod-discriminated unions for `spec` (model.ts:229-233), so the type info exists; `sourceType` is the redundant string mirror.
- **Category:** 16 (field contradicts type domain — declared as `string` when it is closed-set), 6 (misleading), 12 (duplicate of `spec.$case`).
- **Suggested name:** Convert to an enum `KnowledgeSourceType` with values `Index | Files | FileTable`; or drop `sourceType` entirely because `spec.$case` already carries the discriminant.
- **Rationale:** Stringly-typed enums are a well-documented anti-pattern (https://google.github.io/styleguide/tsguide.html#enums-vs-string-literals — TS supports closed string literal unions specifically to avoid this). The fact that `spec.$case` already discriminates makes `sourceType` pure noise on both reads and writes.

### 11. `Example.guidelines: string[]` and `Example.question: string` semantics overlap with `KnowledgeAssistant.instructions` — `src/v1/model.ts:86,91,185`
- **Why weird:** Three free-text "how should the assistant behave" fields are scattered across two types: `KnowledgeAssistant.instructions` (single string, global), `Example.guidelines` (array, per-question), `Example.question` (single string, paired with `guidelines`). The names do not disambiguate scope: a reader could reasonably guess `guidelines` are global and `instructions` are per-example; the actual mapping is the other way around. Compare with the same anti-pattern in `customllms.CustomLlm.instructions: string` + `CustomLlm.guidelines: string[]` (audited in `.agent/naming-audit/customllms.md` #12) — that audit flagged the exact same overlap.
- **Category:** 6 (misleading), 12 (duplicate concept), 15 (generic field).
- **Suggested name:** Rename `KnowledgeAssistant.instructions` → `systemPrompt` or `globalInstructions`; rename `Example.guidelines` → `answerRules` or `responseGuidelines`. Both names disambiguate scope.
- **Rationale:** Two free-text fields with synonymous names but different scope is one of the most common API-design defects. The audit caught the same pattern in `customllms`; flagging it here for SDK-wide consistency.

### 12. `KnowledgeSource.spec` discriminated union name is generic — `src/v1/model.ts:229`
- **Why weird:** `KnowledgeSource.spec?: { $case: 'index'; index: IndexSpec } | { $case: 'files'; files: FilesSpec } | { $case: 'fileTable'; fileTable: FileTableSpec } | undefined`. The discriminator field is called `spec` — a generic CS term. The doc says "Specification for the knowledge source type." Consumers writing autocomplete will see `source.spec.$case` and `source.sourceType` both meaning "what kind of source is this", and have to remember that `spec` carries the *data* and `sourceType` carries the *string label*. Compare with the `supervisoragents.Tool.spec` field (same anti-pattern; same audit flagged in the sibling).
- **Category:** 1 (vague), 12 (duplicate of `sourceType` discriminant).
- **Suggested name:** `config` if the union carries configuration (it does); or `source` to mirror the `$case` semantics ("which source variant"). Best: collapse `sourceType` and `spec` into a single discriminated union.
- **Rationale:** `spec` is so generic it conveys no information; the type already conveys "this is the spec".

## Medium severity

### 13. `FileTableSpec.fileCol` cryptic abbreviation — `src/v1/model.ts:105`
- **Why weird:** `fileCol` truncates `column` to `Col`. The same pattern showed up in `customllms.Table.requestCol`/`responseCol` (flagged in `customllms.md` #15). The field on its sibling, `IndexSpec`, uses both `textCol` and `docUriCol` — same abbreviation. Other fields in the same file spell things out (`endpointName`, `experimentId`, `knowledgeCutoffTime`), so `Col` is inconsistent within the package.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency).
- **Suggested name:** `fileColumn` (and `textColumn` / `docUriColumn`).
- **Rationale:** Three characters of identifier savings is not worth the cognitive split between the doc ("column") and the field name.

### 14. `IndexSpec.textCol` / `IndexSpec.docUriCol` cryptic abbreviation — `src/v1/model.ts:145,147`
- **Why weird:** Same `Col` abbreviation as #13, plus `docUri` truncates "document URI" awkwardly. Reading `docUriCol`, your eye parses `doc-Uri-Col` — three abbreviations stacked. The doc reads "The column that specifies a link or reference to where the information came from" — a much friendlier name would be `sourceUriColumn` or `referenceColumn`.
- **Category:** 5 (cryptic abbreviation), 3 (acronym casing: `Uri` vs `URI`).
- **Suggested name:** `documentUriColumn` or `sourceUriColumn` (spell out `document`; promote `Uri` to `URI` if SDK convention is all-caps for three-letter acronyms — see Observation #38).
- **Rationale:** The savings are minimal; the readability cost is real.

### 15. `IndexSpec.indexName` type-suffix tautology — `src/v1/model.ts:143`
- **Why weird:** `IndexSpec.indexName` repeats `Index` in the type and field. The doc says it is the full UC name of the vector search index. Same pattern as `FileTableSpec.tableName` (model.ts:103). Both fields are documented as a fully-qualified three-part UC name (catalog.schema.x) — same concept Unity Catalog calls `full_name` in `catalog.TableInfo.full_name`.
- **Category:** 20 (type-suffix tautology), 1 (vague — `*Name` does not communicate "fully qualified").
- **Suggested name:** `fullName` (matches Unity Catalog convention) or `qualifiedName`. If kept as `*Name`, at least drop the type prefix: `IndexSpec.fullName` reads better than `IndexSpec.indexName`.
- **Rationale:** Unity Catalog already has a canonical token; reusing it makes cross-API code less surprising.

### 16. `FileTableSpec.tableName` type-suffix tautology — `src/v1/model.ts:103`
- **Why weird:** Same problem as #15 — `FileTableSpec.tableName` repeats `Table` in the type and field.
- **Category:** 20 (type-suffix tautology), 1 (vague).
- **Suggested name:** `fullName` or `qualifiedName`.
- **Rationale:** Same as #15.

### 17. `Example.question` + `Example.guidelines` field-name doublet — `src/v1/model.ts:86,91`
- **Why weird:** `Example` has two free-text payload fields: the question being asked and the guidelines for the answer. The current names are fine *in isolation*, but the type's own doc explains "Contains a question and guidelines for how the assistant should respond" — and the field names then duplicate the doc verbatim. The bigger issue: `guidelines: string[]` is plural and an array, but no JSDoc explains the semantics of each element (is each entry a sentence? a bullet? a paragraph?). Combined with the parallel `KnowledgeAssistant.instructions: string` (#11), the naming makes the conceptual hierarchy unclear.
- **Category:** 15 (generic field name losing meaning), 1 (vague — "guidelines" of what?).
- **Suggested name:** `Example.question` is fine; rename `Example.guidelines` → `answerGuidelines` (or `responseGuidelines`, paired with rename in #11).
- **Rationale:** A type that owns a single question/answer pair should make the answer-shaped field explicit.

### 18. `KnowledgeAssistant.endpointName` underspecified — `src/v1/model.ts:191`
- **Why weird:** The doc reads "The name of the knowledge assistant agent endpoint." Three reads of "agent endpoint" raise the question: is this a model-serving endpoint? An MLflow endpoint? An AI Gateway endpoint? The sibling SDK `customllms` has the same `endpointName: string` (flagged in `customllms.md` #7 as ambiguous). In Databricks the term "endpoint" alone is overloaded across `model_serving`, `sql_warehouses`, `vector_search_endpoints`, etc.
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `servingEndpointName` (matches Databricks model-serving terminology) or just `agentEndpointName`. The sibling `supervisoragents.KnowledgeAssistant.servingEndpointName` actually uses `servingEndpointName` (see `supervisoragents/src/v1/model.ts:129`), so the rename here would *align* the two packages.
- **Rationale:** Cross-package consistency wins. `supervisoragents` already named the field correctly; copy that.

### 19. `KnowledgeAssistant.experimentId` — what kind of experiment? — `src/v1/model.ts:193`
- **Why weird:** Doc reads "The MLflow experiment ID." A bare `experimentId` is fine *if* the consumer knows the SDK only integrates with MLflow. But the consumer reading `KnowledgeAssistant.experimentId` could reasonably guess this is an A/B-test experiment, a feature-flag experiment, or an MLflow experiment. The doc clarifies — but the name does not.
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `mlflowExperimentId` (matches the doc; matches `databricks.mlflow` API convention).
- **Rationale:** Field names should not require reading JSDoc to disambiguate. Same reasoning as #18.

### 20. `KnowledgeAssistant.errorInfo: string` — `src/v1/model.ts:195`
- **Why weird:** Two issues:
  - Suffix `Info` is generic CS noise (rule 8: redundant suffix). `error` alone or `errorMessage` is more specific.
  - Type is `string` but the field is reserved for "Error details when the Knowledge Assistant is in FAILED state." Other Databricks APIs (jobs, clusters) use structured `ErrorInfo` objects with `code`, `message`, `details`. A bare string forces consumers to parse free text — and a future structured upgrade would be a breaking change.
- **Category:** 8 (redundant suffix), 1 (vague), 16 (field contradicts type domain).
- **Suggested name:** `errorMessage` (if the field stays a string) or convert to an `ApiError` object (if the field upgrades). Drop the `Info` suffix either way.
- **Rationale:** The `Info` suffix is a Go/Java carryover (`*Info` types are common in proto messages); TS gets clearer names without it.

### 21. `KnowledgeAssistant.creator: string` — what is a creator? — `src/v1/model.ts:187`
- **Why weird:** Doc reads "The creator of the Knowledge Assistant." Could be a username, email, UUID, Databricks principal id, or service principal client id. The type is `string`. The exact same pattern was flagged in `customllms.md` #10 — also a `creator: string`. The convention varies across the SDK:
  - Unity Catalog: `created_by` (matches AIP-148, https://google.aip.dev/148)
  - Jobs: `creator_user_name`
  - This package: `creator`
- **Category:** 1 (vague), 19 (underspecified id), 17 (inconsistency across SDK).
- **Suggested name:** `createdBy` (AIP-148 standard, also matches `unitycatalog`) with JSDoc clarifying it is a user email.
- **Rationale:** Match the most-used convention. `createdBy` reads naturally and is widely understood.

### 22. `KnowledgeSource.knowledgeCutoffTime` ambiguous semantics — `src/v1/model.ts:237`
- **Why weird:** Doc reads "Timestamp representing the cutoff before which content in this knowledge source is being ingested." Two interpretations:
  - "Ingestion stops at this time" (a future bound).
  - "Only content created before this time is being ingested" (a past bound).
  The field name `knowledgeCutoffTime` does not disambiguate, and the doc grammar ("being ingested" — present continuous) makes it worse. AIP-142 (timestamp naming) would suggest `dataAsOf` for "content as of this time" or `ingestionDeadline` for "must finish by".
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** `dataAsOf` or `contentAsOf` if the field is a past bound (most likely); `ingestionDeadline` if it is a future bound.
- **Rationale:** A timestamp field whose meaning depends on JSDoc parsing is a footgun. Pick a name that encodes direction.

### 23. `KnowledgeSource_State.UPDATING` vs `KnowledgeAssistant_State.CREATING` inconsistent verbs — `src/v1/model.ts:11,19`
- **Why weird:** Both enums describe "a write operation is in flight." The assistant uses `CREATING` (matches its lifecycle — assistants are created once and updated thereafter). The source uses `UPDATING` (matches its lifecycle — sources are created with content, then their content is refreshed via sync). Both enums conflate "creation" and "update" into one in-flight state; the names just disagree on which verb to use.
- **Category:** 13 (verb-tense / verb-choice inconsistency), 17 (inconsistency across sibling enums).
- **Suggested name:** Both should use `PROCESSING` or `IN_PROGRESS` — operation-agnostic in-flight markers. If lifecycle stages matter, both should split into `CREATING` / `UPDATING` consistently.
- **Rationale:** The asymmetry suggests the API team modeled the two resources separately and never unified the lifecycle vocabulary.

### 24. `Client` class name — bare, no scoping — `src/v1/client.ts:63`
- **Why weird:** The class is named `Client`. After `import {Client} from '@databricks/sdk-knowledgeassistants/v1'`, the type is unambiguous in isolation — but consumers importing multiple packages routinely write `import {Client as KAClient} from '@databricks/sdk-knowledgeassistants/v1'`. Other SDKs in the Databricks ecosystem name the class `KnowledgeAssistantsClient` (or `KnowledgeAssistantsApi`), avoiding the alias dance.
- **Category:** 1 (vague), 17 (SDK-wide inconsistency).
- **Suggested name:** `KnowledgeAssistantsClient`. Sibling SDK packages (Go SDK reference uses `WorkspaceClient.KnowledgeAssistants`; AWS JS SDK uses `S3Client`, `IAMClient`) follow this pattern.
- **Rationale:** Bare `Client` is convenient until you import two SDK packages; then it's a tax.

## Low severity

### 25. `KnowledgeAssistant_State.CREATING` vs `KnowledgeSource_State.UPDATING` — `src/v1/model.ts:11,19`
- **Why weird:** See #23; flagged again at low severity as a *style* concern (the higher-severity finding is the verb-mismatch).
- **Category:** 13 (verb tense).
- **Suggested name:** See #23.
- **Rationale:** Cosmetic but consistent with audit's "verb-tense inconsistency" category.

### 26. `executeCall` / `executeHttpCall` differ in name by `Http` only — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling different layers — same anti-pattern as `customllms.md` #21.
- **Category:** 1 (vague), 17 (inconsistency).
- **Suggested name:** `runWithCallOptions` / `sendHttp` or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should differ in more than one infix.

### 27. `HttpCallOptions` reuses `Options` — `src/v1/utils.ts:15`
- **Why weird:** Same as `customllms.md` #23: `ClientOptions`, `CallOptions`, and `HttpCallOptions` all live in the same file. Three things named `Options`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` or `HttpCallParams`.
- **Rationale:** Distinguish internal context bags from user-facing options.

### 28. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Same as `customllms.md` #28: exported but not used by `client.ts`.
- **Category:** Observation / 11 (unused export).
- **Suggested name:** Either remove the export or document why it ships per-package.
- **Rationale:** Generated artifact; flag for cross-package cleanup.

### 29. `readAll` helper generic name — `src/v1/utils.ts:40`
- **Why weird:** Same as `customllms.md` #29: helper reads an entire response body stream; name is generic.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` or `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 30. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:58`
- **Why weird:** Same as `customllms.md` #24: `Segment` is a generic CS term.
- **Category:** 1 (vague).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** SDK-wide consistency review.

### 31. `resp` local variable in every method — `src/v1/client.ts:95,124,153,235,260,285,319,370,424,496,537,578`
- **Why weird:** Same as `customllms.md` #33: `resp` is the response. 12 methods repeat the same pattern.
- **Category:** 12 (duplicate pattern).
- **Suggested name:** Refactor away the pattern, not the name.
- **Rationale:** Refactor opportunity surfaced by audit.

### 32. `pageReq` local in iterator methods — `src/v1/client.ts:342,396,450`
- **Why weird:** Three async generator methods each declare `const pageReq: ... = {...req};`. Reuses the abbreviation `Req` while elsewhere in the file the parameter is named `req`. Minor abbreviation inconsistency: `request` would be clearer in the iterator context, where the variable's purpose ("the request used to fetch each page") differs from the input `req`.
- **Category:** 5 (abbreviation).
- **Suggested name:** `pageRequest` or `nextPageReq`.
- **Rationale:** Local clarity for readability.

### 33. `KnowledgeSource.spec` field-mask child wiring inconsistent with `$case` — `src/v1/model.ts:734-737`
- **Why weird:** `knowledgeSourceFieldMaskSchema` carries top-level entries `fileTable`, `files`, `index` — matching the `$case` keys, but the wire serialization uses `file_table`/`files`/`index`. Reading the schema, a consumer might write `knowledgeSourceFieldMask('spec.files')` expecting the variant-aware path; the field-mask schema has no `spec` key at all. The discriminated union variants are flattened to top-level field-mask paths, which is correct AIP-161 (https://google.aip.dev/161) behavior — but jarring if you've read the TS type.
- **Category:** 17 (inconsistency between TS shape and field-mask schema).
- **Suggested name:** Not a rename; flag for documentation.
- **Rationale:** Field-mask path lookup is non-obvious; deserves a JSDoc note.

## Observations

### 34. `KnowledgeAssistant.description` "user-facing" annotation — `src/v1/model.ts:172-178`
- **Why weird:** Doc says "Description of what this agent can do (user-facing)." The parenthetical "(user-facing)" is unusual — every other `description` field in the Databricks SDK is implicitly user-facing. Either every `description` should carry this annotation, or none should. Flagged for cross-package style review.
- **Category:** Observation.

### 35. No `list` for `Example` siblings outside of `listExamples` — `src/v1/client.ts:305-336`
- **Why weird:** The package supports `list` on `KnowledgeAssistant`, `Example`, and `KnowledgeSource`. Naming consistent. Flagging as a *positive* observation — the verbs are uniform.
- **Category:** 17 (reversed — consistency note).

### 36. `syncKnowledgeSources` — verb is plural but operates on parent — `src/v1/client.ts:464`
- **Why weird:** Method `syncKnowledgeSources` takes a `SyncKnowledgeSourcesRequest` whose `name` field is the **parent assistant** id (see #7, #8). The verb is "sync" and the noun is the (plural) child collection, but the addressing is parent-level. Compare with `cancelOptimization` on `customllms` — same pattern.
- **Category:** 6 (slightly misleading; the resource being addressed is the assistant, not "the sources"). The method does sync *all* sources for one assistant, so the plural is faithful to the *action* if not the *target*.
- **Suggested name:** Acceptable; consider `syncAssistantSources` for parent-clarity, but the current name reads fine.

### 37. Acronym casing: `URI`, `UUID`, `MLflow`, `UC` — `src/v1/model.ts:92,142,144,146,165,192,261,310`
- **Why weird:** This package follows the SDK convention of *not* using acronym casing in TS identifiers (none of `UUID`, `URI`, `MLflow`, `UC` appear as identifier components in source — they only appear in JSDoc as documentation). When they do appear in TS identifiers (`docUriCol`), they are title-cased (`Uri`) — matching Microsoft's three-letter-acronym rule but contradicting the SDK's own `APIError` usage. Cross-cutting observation from `customllms.md` #36.
- **Category:** 3 (acronym casing — SDK-wide).
- **Suggested name:** SDK-wide policy decision.

### 38. `KnowledgeAssistant` and `KnowledgeSource` symmetric type design — `src/v1/model.ts:155-196,204-240`
- **Why weird:** Both entities carry: `name`, `state`, `id`, `displayName`, `description`, `createTime`. They diverge: `KnowledgeAssistant` adds `instructions`, `creator`, `endpointName`, `experimentId`, `errorInfo`; `KnowledgeSource` adds `sourceType`, `spec`, `knowledgeCutoffTime`. Symmetric design is a good thing — flagged as a *positive* observation.
- **Category:** Observation.

### 39. `Example` lacks `state` field — `src/v1/model.ts:79-98`
- **Why weird:** Both sibling entities (`KnowledgeAssistant`, `KnowledgeSource`) have a `state` enum; `Example` does not. This is correct given examples are passive metadata (no lifecycle), but consumers expecting symmetry will notice the asymmetry. Flagged as design observation, not a naming bug.
- **Category:** Observation.

## Domain glossary
- `knowledge assistant` — the top-level resource: an LLM-powered assistant scoped to a corpus of knowledge.
- `knowledge source` — a typed pointer into UC (vector index, volume of files, or file table) that feeds the assistant.
- `example` — a question + guidelines pair used to steer the assistant's responses.
- `uc` — Unity Catalog (referenced in JSDoc on `FileTableSpec.tableName`, `IndexSpec.indexName`, `FilesSpec.path`).
- `mlflow` — Machine-learning lifecycle platform (referenced only in `KnowledgeAssistant.experimentId` JSDoc).
- `field mask` — Google AIP-161 partial-update mechanism (FieldMask<T> from `@databricks/sdk-core/wkt`).
- `uuid` — referenced in JSDoc on `Example.exampleId` and `KnowledgeAssistant.id`.

## File coverage
- `src/v1/model.ts` (752 lines): read fully.
- `src/v1/client.ts` (603 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (34 lines): read fully.
