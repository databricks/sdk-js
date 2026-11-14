# Naming Audit: customllms

**Path:** `packages/customllms/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 3

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 1 |
| Low | 1 |

## High severity

### 1. `State` enum (top-level, ungrouped) — `src/v1/model.ts:10-19`
- **Why weird:** The enum is named `State` — the most generic noun in any API. There is no qualifier to tell the reader *which* state (optimization run? custom LLM? endpoint?). The doc comment ("States of Custom LLM optimization lifecycle.") clarifies, but the name alone does not. Every other Databricks package has its own `State` (jobs, clusters, queries) and a user importing two of them will be forced to alias.
- **Category:** 1 (vague/generic), 15 (generic field name).
- **Suggested name:** `OptimizationRunState` (matches the `optimizationState` field on `CustomLlm` and the request types `StartCustomLlmOptimizationRunRequest`/`CancelCustomLlmOptimizationRunRequest`).
- **Rationale:** Specific enum names make import lists self-documenting and avoid alias collisions when consumers combine multiple SDK packages.

## Medium severity

### 2. `cancelCustomLlmOptimizationRun` vs `startCustomLlmOptimizationRun` plural noun — `src/v1/client.ts:70,179`
- **Why weird:** Both methods refer to "Optimization Run" (singular) — but a custom LLM has multiple optimization runs over its lifetime. The current API is `POST .../custom-llms/{id}/optimize/cancel` and `POST .../custom-llms/{id}/optimize` — so the URL has no run-id; the API operates on "the current run" implicitly. The method name `startOptimizationRun` is therefore not quite right; it should be `startOptimization` (the verb that starts a run) or `startCurrentOptimizationRun` (explicit). Same for `cancel`. As-is, the names imply a `runId` is being passed; it is not.
- **Category:** 6 (misleading — name implies run-level addressing).
- **Suggested name:** `startOptimization` / `cancelOptimization` (the singular "run" is implicit).
- **Rationale:** Method names should reflect the resource the verb operates on. The URL operates on the LLM, not on a specific run.

## Low severity

### 3. `customLlmFieldMask` function name — `src/v1/model.ts:261`
- **Why weird:** Function that builds a `FieldMask<CustomLlm>`. The name `customLlmFieldMask` reads as a field-mask *value* rather than a builder; sibling files in other packages name this `*FieldMaskBuilder` or expose it as a static method `FieldMask.forCustomLlm`.
- **Category:** 17 (inconsistent verb convention in the SDK).
- **Suggested name:** `buildCustomLlmFieldMask` or `customLlmFieldMaskFor` (with a static-method-like signature).
- **Rationale:** Minor; the function is clearly a builder by its signature `(...paths: string[]): FieldMask<CustomLlm>`.
