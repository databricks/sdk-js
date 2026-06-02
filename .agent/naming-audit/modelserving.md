# Naming Audit: modelserving

**Path:** `packages/modelserving/src/v1/`
**Versions audited:** v1
**Inferred domain:** Model Serving control plane — CRUD over "serving endpoints" (a.k.a. "inference endpoints"), plus a parallel provisioned-throughput (PT) variant, plus side-channel updates for AI Gateway, rate limits, tags, notifications, OpenAPI schema fetch, served-model logs (service + build), endpoint metrics export, and an out-of-band UC-connection-backed HTTP proxy (`httpRequest` / `ExternalFunction*`). Created by the 2026-05-22 regeneration which consolidated the prior `modelservingdebug` and `modelservingmanagement` packages into one. Sibling package: `modelservingquery` (data-plane inference). The wire URL prefix is `/api/2.0/serving-endpoints`; the docs say "serving endpoint"; the TS types say `InferenceEndpoint`.
**Total weird names flagged:** 10

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 4 |
| Low | 1 |
| Observation | 1 |

## High severity

### 1. `ServedModel` type now also holds non-models — `src/v1/model.ts:998`
- **Why weird:** The type `ServedModel` represents the "served entity" — and the doc on `ServedModel.externalModel` (line 1001) acknowledges this directly: "Only one of external_model and (entity_name, entity_version, workload_size, workload_type, and scale_to_zero_enabled) can be specified...". The doc on `ServedModel.entityName` (line 1003) further widens the meaning: "The entity may be a model in the Databricks Model Registry, a model in the Unity Catalog (UC), or *a function of type FEATURE_SPEC in the UC*." So `ServedModel` can be a model OR a function. Every `EndpointCoreConfig*.servedEntities: ServedModel[]` confirms this: the field is *called* `servedEntities` but its element type is `ServedModel`. Type name lies; field name is correct.
- **Category:** 6 (misleading), 15 (generic field name vs specific type name).
- **Suggested name:** Rename `ServedModel` → `ServedEntity`. Keep the field name `servedEntities`. The wire stays whatever it is.
- **Rationale:** A type whose name contradicts its values is the highest-impact naming bug; doc text already concedes the rename is correct.

### 2. Method `httpRequest` for "make external services call using UC Connection" — `src/v1/client.ts:631`
- **Why weird:** `httpRequest` on a model-serving `Client` is wildly mis-located. The doc reads: "Make external services call using the credentials stored in UC Connection." This is a Unity-Catalog-Connection HTTP proxy endpoint that happens to live at `/api/2.0/external-function`. It has nothing to do with serving endpoints. The method name `httpRequest` is the most generic name in HTTP (the global `Request` constructor builds an HTTP request); collides with `HttpRequest` from `@databricks/sdk-core/http`. The request type is `ExternalFunctionRequest`, response is `ExternalFunctionResponse`, URL says `external-function`, doc says "UC Connection" — none of those words is in the method name.
- **Category:** 1 (vague), 6 (misleading), 14 (collides with global `Request`/`HttpRequest`).
- **Suggested name:** Rename `httpRequest` → `invokeExternalFunction` or `callConnection`. Better: move the method to a different package (`uc-connections` or similar). The current placement is a layering bug.
- **Rationale:** A method called `httpRequest` on a model-serving `Client` will be the first thing every new SDK user tries when they want to query an endpoint — and will fail with confusing errors. Naming + placement is a footgun.

### 3. `Behavior` enum is unqualified — `src/v1/model.ts:5-10`
- **Why weird:** Top-level export named `Behavior` — the most generic noun possible for an enum. It is used as `PiiSettings.behavior: Behavior` (line 874). A consumer importing `Behavior` from `@databricks/sdk-modelserving/v1` has no idea this is about PII guardrails. Other packages will have their own `Behavior` and import aliases become mandatory. Values: `NONE | BLOCK | MASK` — so this is *PII action behavior*.
- **Category:** 1 (vague/generic), 15 (generic name losing meaning).
- **Suggested name:** `PiiBehavior` or `PiiGuardrailAction`.
- **Rationale:** Domain-specific enum names make import lists self-documenting; `Behavior` alone forces every reader to chase the type.

### 4. `GetExportEndpointMetricsRequest` / `getExportEndpointMetrics` — five-noun garble — `src/v1/model.ts:540`, `src/v1/client.ts:227`
- **Why weird:** The grammar is broken. The expected reading is *"export endpoint metrics" → returns metrics in export format*, but `Get + Export + Endpoint + Metrics + Request` parses as five nouns in a row. The doc string (`client.ts:226`) confirms the intent: "Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format". The natural English phrase is "export the endpoint's metrics" → method `exportEndpointMetrics`. Compare with sibling methods on the same client: `getInferenceEndpoint`, `getInferenceEndpointSchema`, `patchInferenceEndpointTags` — none prefix the noun with an output format.
- **Category:** 6 (misleading), 7 (overly verbose), 17 (inconsistent verb — every other method is `getX`, this one is `getExportX`).
- **Suggested name:** `exportEndpointMetrics(req: ExportEndpointMetricsRequest)` returning `EndpointMetrics`. Or `getEndpointMetrics(req: GetEndpointMetricsRequest)` returning `EndpointMetrics`. The "export" framing is a wire-protocol detail (Prometheus format) that does not belong in the method name.
- **Rationale:** Method naming consistency across siblings; English grammar.

## Medium severity

### 5. `name ?? ''` empty-string fallback when the field is "required" — `src/v1/client.ts:200, 231, 261, 289, 319, 350, 409, 444, 479, 522, 557, 600`
- **Why weird:** The JSDoc on each request says "This field is required" yet the type marks `name?: string | undefined` *optional* and the URL is built with `${req.name ?? ''}` — if the caller forgets to set it, the SDK silently emits a URL like `/api/2.0/serving-endpoints//metrics` (double slash) which will 404 server-side. The contradiction between "required per JSDoc" and "optional per TS type" is a typing inconsistency that bites consumers.
- **Category:** 6 (misleading — JSDoc contradicts type), 16 (field contradicting type domain).
- **Suggested fix:** Mark `name` as required (drop `?: ... | undefined`). Remove the `?? ''` fallback so a missing value throws earlier. Same applies to `servedModelName`.
- **Rationale:** Optional + "required" JSDoc + empty-string fallback is a triple-violation. Cf. AIP-122 (https://google.aip.dev/122) which mandates path parameters be required.

### 6. `done()` on waiter classes returns `true` for both success AND failure — `src/v1/client.ts:711-732, 784-805, 857-878, 930-951`
- **Why weird:** Waiter `done()` returns `true` for:
  - `NOT_UPDATING` (success)
  - `UPDATE_FAILED` (failure)
  - `UPDATE_CANCELED` (cancellation)

  All three "terminal" states are treated as `done`. A consumer reading `if (await waiter.done()) { /* it succeeded */ }` will silently get failures and cancellations. The name `done()` does not convey "terminal but possibly failed".
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** Rename `done()` → `isTerminal()` or split into `isSuccess()` / `isTerminal()`. Or have `done()` throw on failure for parity with `wait()`.
- **Rationale:** Method-name semantics divergence is a runtime bug, not a stylistic one.

### 7. `ModelDataPlaneInfo` wraps `DataPlaneInfo` — `Info`-around-`Info` placeholder — `src/v1/model.ts:733-737`
- **Why weird:** `ModelDataPlaneInfo` is a one-field wrapper: `{queryInfo?: DataPlaneInfo}`. So the public surface is `endpoint.dataPlaneInfo: ModelDataPlaneInfo` → `.queryInfo: DataPlaneInfo` → `.endpointUrl, .authorizationDetails`. Two layers of `*Info` suffix wrapping each other, where the outer layer carries no information beyond "this is the model-specific subset of data-plane info" — but it has only one field, so the wrapping is a pure architectural placeholder reserved for future operations. The JSDoc on `ModelDataPlaneInfo` ("A representation of all DataPlaneInfo for operations that can be done on a model through Data Plane APIs.") tautologically repeats the type name.
- **Category:** 7 (overly verbose suffix chain), 20 (type-suffix tautology on `dataPlaneInfo: ModelDataPlaneInfo`).
- **Suggested name:** Collapse — drop `ModelDataPlaneInfo` and inline `DataPlaneInfo` as `InferenceEndpointDetailed.queryDataPlane?: DataPlaneInfo`. If a future operation needs a second data-plane URL, add a field then.
- **Rationale:** `Info`-wrapping-`Info` is an architectural placeholder that doesn't survive into idiomatic TS where optional fields obviate the wrapper.

### 8. `GetServedModelLogsResponse.logs: string` is a single blob, name is plural — `src/v1/model.ts:569, 581`
- **Why weird:** Both `GetServedModelBuildLogsResponse` and `GetServedModelLogsResponse` have `logs?: string`. The field name is plural but the type is a single string — many log *lines* concatenated. A user doing `for (const line of response.logs)` will iterate characters, not lines.
- **Category:** 9 (singular/plural mismatch).
- **Suggested fix:** Re-shape to `logs: string[]` (split lines server-side) so the plural name matches an iterable of lines.
- **Rationale:** The current shape forces every consumer to write `response.logs.split('\n')`.

## Low severity

### 9. `Get*` prefix on every read method — `src/v1/client.ts:227, 257, 285, 315, 346`
- **Why weird:** Every read method here is prefixed `get*`. The `Get*` verb prefix on TS methods is a Go/Java/.NET pattern; in TS, a noun method `endpointMetrics()` or `metrics()` is more idiomatic for read operations (cf. `URL.searchParams`, `Response.json()`). Where TS does use `get*`, it's typically on synchronous accessors.
- **Category:** 14 (Go/Java-style names).
- **Suggested name:** Verb-first for actions: `exportMetrics(req)`, `fetchServedModelLogs(req)`, `fetchServedModelBuildLogs(req)`. Or property-style if the request is trivial.
- **Rationale:** Google TS Style Guide § Names of functions (https://google.github.io/styleguide/tsguide.html#methods) prefers imperative verbs, but does not mandate `get*` for retrievals. SDK-wide call, flag for project review.

## Observation

### 10. `ExternalModel.config` discriminated union with nine variants — `src/v1/model.ts:473-519`
Nine `$case` variants, no exhaustiveness check at the type level. If a tenth provider is added, the discriminated union types it correctly, but the cascade (lines 1389-1430) is hand-rolled and will silently miss the new case. The names of the discriminator keys also vary in casing relative to the type names. This is a maintenance smell, not strictly a naming bug — but the *uniformity* of the names (`<provider>Config`) gives a false sense of "this is a clean enum" when it is actually a tower of `if-else`.
- **Category:** 12 (duplicate concept).
