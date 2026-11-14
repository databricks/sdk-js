# Naming Audit: knowledgeassistants

**Path:** `packages/knowledgeassistants/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |

## High severity

### 1. `KnowledgeAssistant_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:9`
- **Why weird:** The enum is named `KnowledgeAssistant_State` with a literal `_State` infix, and the file even carries an eslint-disable comment declaring "Proto-style nested enum name" (model.ts:15). The underscore is a direct architectural leak from the upstream `.proto` definition where the enum was nested inside the `KnowledgeAssistant` message (proto generates `OuterMessage_InnerEnum` for nested enums). TypeScript has no nested-enum-inside-class concept, so the underscore conveys nothing to a TS consumer and just signals "this code was generated from proto."
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeAssistantState` (drop the underscore — already the convention in non-leaky TS APIs). The generator can flatten nested-enum names without changing the wire format.
- **Rationale:** The proto wire format and the TS identifier shape are decoupled. Carrying the `Outer_Inner` separator into TS leaks the generator's source format and conflicts with the SDK-wide naming-convention lint rule (the file disables `@typescript-eslint/naming-convention` for exactly this reason).

### 2. `KnowledgeSource_State` — proto-style nested-enum name with underscore infix — `src/v1/model.ts:21`
- **Why weird:** Same proto-nested-enum architectural leak as #1. `KnowledgeSource_State` carries the `_State` infix and the same eslint-disable comment "Proto-style nested enum name" (model.ts:27). Two sibling enums in the same file repeat the same proto-leak pattern.
- **Category:** Proto-architectural-leak (proto-nested enum naming surfacing in TS identifier).
- **Suggested name:** `KnowledgeSourceState` (drop the underscore).
- **Rationale:** Same as #1. Generator-level fix.
