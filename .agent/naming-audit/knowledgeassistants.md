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
**Total weird names flagged:** 20

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 2 |
| Low | 8 |
| Observation | 6 |

## High severity

### 1. `KnowledgeSource_State.UPDATED` reads as past-participle, not lifecycle terminal — `src/v1/model.ts:20`
- **Why weird:** The "successfully ingested / ready" terminal state is named `UPDATED` — past tense of the in-flight `UPDATING`. A reader scanning `UPDATING/UPDATED/FAILED_UPDATE` will see "the source has been updated" which sounds transient (it was just updated, then something else might happen). The sibling assistant enum uses `ACTIVE` for the same concept (the resource is ready and operational), which is much clearer.
- **Category:** 6 (misleading), 13 (verb tense), 17 (inconsistency: assistant has `ACTIVE`, source has `UPDATED`).
- **Suggested name:** `READY` (or `ACTIVE`, matching the assistant) for the ready/operational state. `UPDATING` stays for in-flight.
- **Rationale:** `UPDATED` implies "the action happened" rather than "the resource is in a ready state." A state enum should describe the resource's condition, not the last operation that touched it.

### 2. `KnowledgeSource.sourceType: string` — stringly-typed when it should be an enum — `src/v1/model.ts:227`
- **Why weird:** The doc literally enumerates the allowed values: `'The type of the source: "index", "files", or "file_table"'`. A `string` typing means callers can write `sourceType: 'INDEX'` (wrong case) or `sourceType: 'vector_search'` (typo) and the compiler accepts both. Same package already uses Zod-discriminated unions for `spec` (model.ts:229-233), so the type info exists; `sourceType` is the redundant string mirror.
- **Category:** 16 (field contradicts type domain — declared as `string` when it is closed-set), 6 (misleading), 12 (duplicate of `spec.$case`).
- **Suggested name:** Convert to an enum `KnowledgeSourceType` with values `Index | Files | FileTable`; or drop `sourceType` entirely because `spec.$case` already carries the discriminant.
- **Rationale:** Stringly-typed enums are a well-documented anti-pattern (https://google.github.io/styleguide/tsguide.html#enums-vs-string-literals — TS supports closed string literal unions specifically to avoid this). The fact that `spec.$case` already discriminates makes `sourceType` pure noise on both reads and writes.

### 3. `KnowledgeAssistant_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:9`
- **Why weird:** The enum is named `KnowledgeAssistant_State` with a literal `_State` infix, and the file even carries an eslint-disable comment declaring "Proto-style nested enum name" (model.ts:8). The underscore is a direct architectural leak from the upstream `.proto` definition where the enum was nested inside the `KnowledgeAssistant` message (proto generates `OuterMessage_InnerEnum` for nested enums). TypeScript has no nested-enum-inside-class concept, so the underscore conveys nothing to a TS consumer and just signals "this code was generated from proto."
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeAssistantState` (drop the underscore — already the convention in non-leaky TS APIs). The generator can flatten nested-enum names without changing the wire format.
- **Rationale:** The proto wire format and the TS identifier shape are decoupled. Carrying the `Outer_Inner` separator into TS leaks the generator's source format and conflicts with the SDK-wide naming-convention lint rule (the file disables `@typescript-eslint/naming-convention` for exactly this reason).

### 4. `KnowledgeSource_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:17`
- **Why weird:** Same proto-nested-enum architectural leak as #3. `KnowledgeSource_State` carries the `_State` infix and the same eslint-disable comment "Proto-style nested enum name" (model.ts:16). Two sibling enums in the same file repeat the same proto-leak pattern.
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeSourceState` (drop the underscore).
- **Rationale:** Same as #3. Generator-level fix.

## Medium severity

### 5. `KnowledgeAssistant.errorInfo: string` — `src/v1/model.ts:195`
- **Why weird:** Two issues:
  - Suffix `Info` is generic CS noise (rule 8: redundant suffix). `error` alone or `errorMessage` is more specific.
  - Type is `string` but the field is reserved for "Error details when the Knowledge Assistant is in FAILED state." Other Databricks APIs (jobs, clusters) use structured `ErrorInfo` objects with `code`, `message`, `details`. A bare string forces consumers to parse free text — and a future structured upgrade would be a breaking change.
- **Category:** 8 (redundant suffix), 1 (vague), 16 (field contradicts type domain).
- **Suggested name:** `errorMessage` (if the field stays a string) or convert to an `ApiError` object (if the field upgrades). Drop the `Info` suffix either way.
- **Rationale:** The `Info` suffix is a Go/Java carryover (`*Info` types are common in proto messages); TS gets clearer names without it.

### 6. `Client` class name — bare, no scoping — `src/v1/client.ts:63`
- **Why weird:** The class is named `Client`. After `import {Client} from '@databricks/sdk-knowledgeassistants/v1'`, the type is unambiguous in isolation — but consumers importing multiple packages routinely write `import {Client as KAClient} from '@databricks/sdk-knowledgeassistants/v1'`. Other SDKs in the Databricks ecosystem name the class `KnowledgeAssistantsClient` (or `KnowledgeAssistantsApi`), avoiding the alias dance.
- **Category:** 1 (vague), 17 (SDK-wide inconsistency).
- **Suggested name:** `KnowledgeAssistantsClient`. Sibling SDK packages (Go SDK reference uses `WorkspaceClient.KnowledgeAssistants`; AWS JS SDK uses `S3Client`, `IAMClient`) follow this pattern.
- **Rationale:** Bare `Client` is convenient until you import two SDK packages; then it's a tax.

## Low severity

### 7. `executeCall` / `executeHttpCall` differ in name by `Http` only — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling different layers — same anti-pattern as `customllms.md` #21.
- **Category:** 1 (vague), 17 (inconsistency).
- **Suggested name:** `runWithCallOptions` / `sendHttp` or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should differ in more than one infix.

### 8. `HttpCallOptions` reuses `Options` — `src/v1/utils.ts:15`
- **Why weird:** Same as `customllms.md` #23: `ClientOptions`, `CallOptions`, and `HttpCallOptions` all live in the same file. Three things named `Options`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` or `HttpCallParams`.
- **Rationale:** Distinguish internal context bags from user-facing options.

### 9. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Same as `customllms.md` #28: exported but not used by `client.ts`.
- **Category:** Observation / 11 (unused export).
- **Suggested name:** Either remove the export or document why it ships per-package.
- **Rationale:** Generated artifact; flag for cross-package cleanup.

### 10. `readAll` helper generic name — `src/v1/utils.ts:40`
- **Why weird:** Same as `customllms.md` #29: helper reads an entire response body stream; name is generic.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` or `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 11. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:58`
- **Why weird:** Same as `customllms.md` #24: `Segment` is a generic CS term.
- **Category:** 1 (vague).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** SDK-wide consistency review.

### 12. `resp` local variable in every method — `src/v1/client.ts:95,124,153,235,260,285,319,370,424,496,537,578`
- **Why weird:** Same as `customllms.md` #33: `resp` is the response. 12 methods repeat the same pattern.
- **Category:** 12 (duplicate pattern).
- **Suggested name:** Refactor away the pattern, not the name.
- **Rationale:** Refactor opportunity surfaced by audit.

### 13. `pageReq` local in iterator methods — `src/v1/client.ts:342,396,450`
- **Why weird:** Three async generator methods each declare `const pageReq: ... = {...req};`. Reuses the abbreviation `Req` while elsewhere in the file the parameter is named `req`. Minor abbreviation inconsistency: `request` would be clearer in the iterator context, where the variable's purpose ("the request used to fetch each page") differs from the input `req`.
- **Category:** 5 (abbreviation).
- **Suggested name:** `pageRequest` or `nextPageReq`.
- **Rationale:** Local clarity for readability.

### 14. `KnowledgeSource.spec` field-mask child wiring inconsistent with `$case` — `src/v1/model.ts:734-737`
- **Why weird:** `knowledgeSourceFieldMaskSchema` carries top-level entries `fileTable`, `files`, `index` — matching the `$case` keys, but the wire serialization uses `file_table`/`files`/`index`. Reading the schema, a consumer might write `knowledgeSourceFieldMask('spec.files')` expecting the variant-aware path; the field-mask schema has no `spec` key at all. The discriminated union variants are flattened to top-level field-mask paths, which is correct AIP-161 (https://google.aip.dev/161) behavior — but jarring if you've read the TS type.
- **Category:** 17 (inconsistency between TS shape and field-mask schema).
- **Suggested name:** Not a rename; flag for documentation.
- **Rationale:** Field-mask path lookup is non-obvious; deserves a JSDoc note.

## Observations

### 15. `KnowledgeAssistant.description` "user-facing" annotation — `src/v1/model.ts:172-178`
- **Why weird:** Doc says "Description of what this agent can do (user-facing)." The parenthetical "(user-facing)" is unusual — every other `description` field in the Databricks SDK is implicitly user-facing. Either every `description` should carry this annotation, or none should. Flagged for cross-package style review.
- **Category:** Observation.

### 16. No `list` for `Example` siblings outside of `listExamples` — `src/v1/client.ts:305-336`
- **Why weird:** The package supports `list` on `KnowledgeAssistant`, `Example`, and `KnowledgeSource`. Naming consistent. Flagging as a *positive* observation — the verbs are uniform.
- **Category:** 17 (reversed — consistency note).

### 17. `syncKnowledgeSources` — verb is plural but operates on parent — `src/v1/client.ts:464`
- **Why weird:** Method `syncKnowledgeSources` takes a `SyncKnowledgeSourcesRequest` whose `name` field is the **parent assistant** id. The verb is "sync" and the noun is the (plural) child collection, but the addressing is parent-level. Compare with `cancelOptimization` on `customllms` — same pattern.
- **Category:** 6 (slightly misleading; the resource being addressed is the assistant, not "the sources"). The method does sync *all* sources for one assistant, so the plural is faithful to the *action* if not the *target*.
- **Suggested name:** Acceptable; consider `syncAssistantSources` for parent-clarity, but the current name reads fine.

### 18. Acronym casing: `URI`, `UUID`, `MLflow`, `UC` — `src/v1/model.ts:92,142,144,146,165,192,261,310`
- **Why weird:** This package follows the SDK convention of *not* using acronym casing in TS identifiers (none of `UUID`, `URI`, `MLflow`, `UC` appear as identifier components in source — they only appear in JSDoc as documentation). When they do appear in TS identifiers (`docUriCol`), they are title-cased (`Uri`) — matching Microsoft's three-letter-acronym rule but contradicting the SDK's own `ApiError` usage. Cross-cutting observation from `customllms.md` #36.
- **Category:** 3 (acronym casing — SDK-wide).
- **Suggested name:** SDK-wide policy decision.

### 19. `KnowledgeAssistant` and `KnowledgeSource` symmetric type design — `src/v1/model.ts:155-196,204-240`
- **Why weird:** Both entities carry: `name`, `state`, `id`, `displayName`, `description`, `createTime`. They diverge: `KnowledgeAssistant` adds `instructions`, `creator`, `endpointName`, `experimentId`, `errorInfo`; `KnowledgeSource` adds `sourceType`, `spec`, `knowledgeCutoffTime`. Symmetric design is a good thing — flagged as a *positive* observation.
- **Category:** Observation.

### 20. `Example` lacks `state` field — `src/v1/model.ts:79-98`
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
