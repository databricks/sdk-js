# Naming Audit: customllms

**Path:** `packages/customllms/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 6 (0 fixed, 6 still present after rescan on 2026-06-02)

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 1 |
| Low | 2 |
| Observation | 1 |

## High severity

### 1. `State` enum (top-level, ungrouped) — `src/v1/model.ts:9-17`
- **Why weird:** The enum is named `State` — the most generic noun in any API. There is no qualifier to tell the reader *which* state (optimization run? custom LLM? endpoint?). The doc comment ("States of Custom LLM optimization lifecycle.") clarifies, but the name alone does not. Every other Databricks package has its own `State` (jobs, clusters, queries) and a user importing two of them will be forced to alias.
- **Category:** 1 (vague/generic), 15 (generic field name).
- **Suggested name:** `OptimizationRunState` (matches the `optimizationState` field on `CustomLlm` and the request types `StartCustomLlmOptimizationRunRequest`/`CancelCustomLlmOptimizationRunRequest`).
- **Rationale:** Specific enum names make import lists self-documenting and avoid alias collisions when consumers combine multiple SDK packages.

### 2. `CustomLlmFieldMask` only has 10 keys, missing 1 — `src/v1/model.ts:246-257`
- **Why weird:** The `FieldMask` for `CustomLlm` enumerates 10 fields, but `CustomLlm` declares 10 fields too (`id`, `name`, `endpointName`, `instructions`, `datasets`, `guidelines`, `optimizationState`, `creator`, `creationTime`, `agentArtifactPath`). On a strict read this is exactly aligned, *but* `endpointName` is documented as a server-populated read-only field ("Name of the endpoint that will be used to serve the custom LLM"). Exposing it in the field-mask suggests it is updatable, which would be a server bug — but consistent with the field-mask being machine-generated rather than designed. Worth a sanity check with the upstream API team.
- **Category:** Observation / 6 (misleading — field-mask implies updatable).
- **Suggested name:** No rename; flag the entry `endpointName: {wire: 'endpoint_name'}` for review.
- **Rationale:** This is the kind of thing a careful TS API designer would notice; a generator running over the proto schema will not.

## Medium severity

### 3. `cancelCustomLlmOptimizationRun` vs `startCustomLlmOptimizationRun` plural noun — `src/v1/client.ts:71,176`
- **Why weird:** Both methods refer to "Optimization Run" (singular) — but a custom LLM has multiple optimization runs over its lifetime. The current API is `POST .../custom-llms/{id}/optimize/cancel` and `POST .../custom-llms/{id}/optimize` — so the URL has no run-id; the API operates on "the current run" implicitly. The method name `startOptimizationRun` is therefore not quite right; it should be `startOptimization` (the verb that starts a run) or `startCurrentOptimizationRun` (explicit). Same for `cancel`. As-is, the names imply a `runId` is being passed; it is not.
- **Category:** 6 (misleading — name implies run-level addressing).
- **Suggested name:** `startOptimization` / `cancelOptimization` (the singular "run" is implicit).
- **Rationale:** Method names should reflect the resource the verb operates on. The URL operates on the LLM, not on a specific run.

## Low severity

### 4. `Dataset[]` plural-singular consistency — `src/v1/model.ts:32,52`
- **Why weird:** Field `datasets: Dataset[]` — type is singular `Dataset`, field is plural `datasets`. This is correct! Flagging as an *observation* of best practice (rule 9 reversed). Counter-examples appear in other packages where a `Datasets` type holds `dataset: Dataset[]`. This package gets it right.
- **Category:** Observation / 9 (reversed — correctly singular).
- **Suggested name:** No change.
- **Rationale:** Note for consistency reviews.

### 5. `customLlmFieldMask` function name — `src/v1/model.ts:259`
- **Why weird:** Function that builds a `FieldMask<CustomLlm>`. The name `customLlmFieldMask` reads as a field-mask *value* rather than a builder; sibling files in other packages name this `*FieldMaskBuilder` or expose it as a static method `FieldMask.forCustomLlm`.
- **Category:** 17 (inconsistent verb convention in the SDK).
- **Suggested name:** `buildCustomLlmFieldMask` or `customLlmFieldMaskFor` (with a static-method-like signature).
- **Rationale:** Minor; the function is clearly a builder by its signature `(...paths: string[]): FieldMask<CustomLlm>`.

## Observations

### 6. Action verbs in `Client` are consistent
The client uses `cancel`/`create`/`delete`/`get`/`start`/`update` — no `fetch`/`retrieve`/`read`. This is good.
- **Category:** 17 (reversed — explicit *consistency* note).
