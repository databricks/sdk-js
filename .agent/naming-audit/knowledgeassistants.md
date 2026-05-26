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
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 2 |
| Low | 0 |
| Observation | 5 |

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

_None._

## Observations

### 7. No `list` for `Example` siblings outside of `listExamples` — `src/v1/client.ts:305-336`
- **Why weird:** The package supports `list` on `KnowledgeAssistant`, `Example`, and `KnowledgeSource`. Naming consistent. Flagging as a *positive* observation — the verbs are uniform.
- **Category:** 17 (reversed — consistency note).

### 8. `syncKnowledgeSources` — verb is plural but operates on parent — `src/v1/client.ts:464`
- **Why weird:** Method `syncKnowledgeSources` takes a `SyncKnowledgeSourcesRequest` whose `name` field is the **parent assistant** id. The verb is "sync" and the noun is the (plural) child collection, but the addressing is parent-level. Compare with `cancelOptimization` on `customllms` — same pattern.
- **Category:** 6 (slightly misleading; the resource being addressed is the assistant, not "the sources"). The method does sync *all* sources for one assistant, so the plural is faithful to the *action* if not the *target*.
- **Suggested name:** Acceptable; consider `syncAssistantSources` for parent-clarity, but the current name reads fine.

### 9. Acronym casing: `URI`, `UUID`, `MLflow`, `UC` — `src/v1/model.ts:92,142,144,146,165,192,261,310`
- **Why weird:** This package follows the SDK convention of *not* using acronym casing in TS identifiers (none of `UUID`, `URI`, `MLflow`, `UC` appear as identifier components in source — they only appear in JSDoc as documentation). When they do appear in TS identifiers (`docUriCol`), they are title-cased (`Uri`) — matching Microsoft's three-letter-acronym rule but contradicting the SDK's own `ApiError` usage. Cross-cutting observation from `customllms.md` #36.
- **Category:** 3 (acronym casing — SDK-wide).
- **Suggested name:** SDK-wide policy decision.

### 10. `KnowledgeAssistant` and `KnowledgeSource` symmetric type design — `src/v1/model.ts:155-196,204-240`
- **Why weird:** Both entities carry: `name`, `state`, `id`, `displayName`, `description`, `createTime`. They diverge: `KnowledgeAssistant` adds `instructions`, `creator`, `endpointName`, `experimentId`, `errorInfo`; `KnowledgeSource` adds `sourceType`, `spec`, `knowledgeCutoffTime`. Symmetric design is a good thing — flagged as a *positive* observation.
- **Category:** Observation.

### 11. `Example` lacks `state` field — `src/v1/model.ts:79-98`
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
