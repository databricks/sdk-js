# Naming Audit: knowledgeassistants

**Path:** `packages/knowledgeassistants/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 6

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Observation | 4 |

## High severity

### 1. `KnowledgeAssistant_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:9`
- **Why weird:** The enum is named `KnowledgeAssistant_State` with a literal `_State` infix, and the file even carries an eslint-disable comment declaring "Proto-style nested enum name" (model.ts:8). The underscore is a direct architectural leak from the upstream `.proto` definition where the enum was nested inside the `KnowledgeAssistant` message (proto generates `OuterMessage_InnerEnum` for nested enums). TypeScript has no nested-enum-inside-class concept, so the underscore conveys nothing to a TS consumer and just signals "this code was generated from proto."
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeAssistantState` (drop the underscore — already the convention in non-leaky TS APIs). The generator can flatten nested-enum names without changing the wire format.
- **Rationale:** The proto wire format and the TS identifier shape are decoupled. Carrying the `Outer_Inner` separator into TS leaks the generator's source format and conflicts with the SDK-wide naming-convention lint rule (the file disables `@typescript-eslint/naming-convention` for exactly this reason).

### 2. `KnowledgeSource_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:17`
- **Why weird:** Same proto-nested-enum architectural leak as #1. `KnowledgeSource_State` carries the `_State` infix and the same eslint-disable comment "Proto-style nested enum name" (model.ts:16). Two sibling enums in the same file repeat the same proto-leak pattern.
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeSourceState` (drop the underscore).
- **Rationale:** Same as #1. Generator-level fix.

## Observations

### 3. `list` verbs are uniform across all three resources — `src/v1/client.ts:334,388,445`
- **Why weird:** The package supports `list` on `KnowledgeAssistant`, `Example`, and `KnowledgeSource` (`listExamples`, `listKnowledgeAssistants`, `listKnowledgeSources`). Naming consistent. Flagging as a *positive* observation — the verbs are uniform.
- **Category:** 17 (reversed — consistency note).

### 4. `syncKnowledgeSources` — verb is plural but operates on parent — `src/v1/client.ts:502`
- **Why weird:** Method `syncKnowledgeSources` takes a `SyncKnowledgeSourcesRequest` whose `name` field is the **parent assistant** id. The verb is "sync" and the noun is the (plural) child collection, but the addressing is parent-level. Compare with `cancelOptimization` on `customllms` — same pattern.
- **Category:** 6 (slightly misleading; the resource being addressed is the assistant, not "the sources"). The method does sync *all* sources for one assistant, so the plural is faithful to the *action* if not the *target*.
- **Suggested name:** Acceptable; consider `syncAssistantSources` for parent-clarity, but the current name reads fine.

### 5. `KnowledgeAssistant` and `KnowledgeSource` symmetric type design — `src/v1/model.ts:155-196,204-240`
- **Why weird:** Both entities carry: `name`, `state`, `id`, `displayName`, `description`, `createTime`. They diverge: `KnowledgeAssistant` adds `instructions`, `creator`, `endpointName`, `experimentId`, `errorInfo`; `KnowledgeSource` adds `sourceType`, `spec`, `knowledgeCutoffTime`. Symmetric design is a good thing — flagged as a *positive* observation.
- **Category:** Observation.

### 6. `Example` lacks `state` field — `src/v1/model.ts:79-98`
- **Why weird:** Both sibling entities (`KnowledgeAssistant`, `KnowledgeSource`) have a `state` enum; `Example` does not. This is correct given examples are passive metadata (no lifecycle), but consumers expecting symmetry will notice the asymmetry. Flagged as design observation, not a naming bug.
- **Category:** Observation.
