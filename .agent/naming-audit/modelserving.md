# Naming Audit: modelserving

**Path:** `packages/modelserving/src/v1/`
**Versions audited:** v1
**Inferred domain:** Model Serving control plane — CRUD over "serving endpoints" (a.k.a. "inference endpoints"), plus a parallel provisioned-throughput (PT) variant, plus side-channel updates for AI Gateway, rate limits, tags, notifications, OpenAPI schema fetch, served-model logs (service + build), endpoint metrics export, and an out-of-band UC-connection-backed HTTP proxy (`httpRequest` / `ExternalFunction*`). Created by the 2026-05-22 regeneration which consolidated the prior `modelservingdebug` and `modelservingmanagement` packages into one. Sibling package: `modelservingquery` (data-plane inference). The wire URL prefix is `/api/2.0/serving-endpoints`; the docs say "serving endpoint"; the TS types say `InferenceEndpoint`.
**Total weird names flagged:** 28

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 12 |
| Low | 6 |
| Observation | 2 |

## High severity

### 1. Package noun mismatch: `modelserving` vs `InferenceEndpoint*` vs `ServingEndpoint*` vs `serving-endpoints` URL — entire package
- **Why weird:** The package directory says *model serving*, every URL path says `/api/2.0/serving-endpoints`, every JSDoc on every method says "serving endpoint", but every TS type is named `InferenceEndpoint*` (`InferenceEndpoint`, `InferenceEndpointDetailed`, `InferenceEndpointState`, `CreateInferenceEndpointRequest`, `DeleteInferenceEndpointRequest`, `GetInferenceEndpointRequest`, `GetInferenceEndpointSchemaRequest`, `ListInferenceEndpointsRequest`, `PatchInferenceEndpointTagsRequest`, `PutInferenceEndpointAiGatewayRequest`, `PutInferenceEndpointConfigRequest`, `PutInferenceEndpointRateLimitsRequest`, `UpdateInferenceEndpointNotificationsRequest`). The lone exception is `ServingEndpointDetailedPermissionLevel` (model.ts:22) — the only top-level identifier in the file that uses the actual product noun. So the package has three names for one thing: "serving endpoint" (product/doc/URL), "inference endpoint" (TS types), "serving endpoint detailed" (permission enum).
- **Category:** 6 (misleading), 12 (duplicate concept), 17 (inconsistent terminology).
- **Suggested name:** Pick one product noun. The wire and docs say `serving endpoint`; sibling Databricks SDKs (Python, Java, Go) all expose `ServingEndpoint`. Rename all `InferenceEndpoint*` to `ServingEndpoint*`, or rename the URL/docs to `inference-endpoints`. The mixed state cannot stand.
- **Rationale:** Cross-language consistency: every other Databricks SDK calls these `ServingEndpoint`. TS being the lone outlier on `InferenceEndpoint` will confuse anyone reading SDK docs side-by-side.

### 2. `ServedModel` type now also holds non-models — `src/v1/model.ts:1004`
- **Why weird:** The type `ServedModel` represents the "served entity" — and the doc on `ServedModel.externalModel` (line 1007) acknowledges this directly: "Only one of external_model and (entity_name, entity_version, workload_size, workload_type, and scale_to_zero_enabled) can be specified...". The doc on `ServedModel.entityName` (line 1009) further widens the meaning: "The entity may be a model in the Databricks Model Registry, a model in the Unity Catalog (UC), or *a function of type FEATURE_SPEC in the UC*." So `ServedModel` can be a model OR a function. Every `EndpointCoreConfig*.servedEntities: ServedModel[]` confirms this: the field is *called* `servedEntities` but its element type is `ServedModel`. Type name lies; field name is correct.
- **Category:** 6 (misleading), 15 (generic field name vs specific type name).
- **Suggested name:** Rename `ServedModel` → `ServedEntity`. Keep the field name `servedEntities`. The wire stays whatever it is.
- **Rationale:** A type whose name contradicts its values is the highest-impact naming bug; doc text already concedes the rename is correct.

### 3. `ServingEndpointDetailedPermissionLevel` enum — only one identifier in the package using `ServingEndpoint*` — `src/v1/model.ts:22-26`
- **Why weird:** This is the *only* type named `ServingEndpoint*`. Every other type in the file uses `InferenceEndpoint*`. Either this enum should be `InferenceEndpointPermissionLevel` (to match the rest of the package), or the rest of the package should be `ServingEndpoint*` (to match the product and wire). The `Detailed` infix is also suspect — the enum lives on `InferenceEndpointDetailed.permissionLevel`, so the type-name says "this enum belongs to InferenceEndpointDetailed", but a `permissionLevel` of `CAN_VIEW` is *not* detailed any differently from a non-detailed view; the enum applies to the resource, not to the response shape. So `Detailed` is leaking the response-DTO name into the enum name.
- **Category:** 17 (inconsistent terminology), 7 (overly verbose).
- **Suggested name:** `ServingEndpointPermissionLevel` (and rename the rest of the package — see #1). Drop `Detailed`.
- **Rationale:** Enum names that include the response-DTO shape (`Detailed`) tangle the message identity into the type identity. In TS, the enum represents a concept, not the message it appears in.

### 4. Method `httpRequest` for "make external services call using UC Connection" — `src/v1/client.ts:587`
- **Why weird:** `httpRequest` on a model-serving `Client` is wildly mis-located. The doc reads: "Make external services call using the credentials stored in UC Connection." This is a Unity-Catalog-Connection HTTP proxy endpoint that happens to live at `/api/2.0/external-function`. It has nothing to do with serving endpoints. The method name `httpRequest` is the most generic name in HTTP (the global `Request` constructor builds an HTTP request); collides with `HttpRequest` from `@databricks/sdk-core/http`. The request type is `ExternalFunctionRequest`, response is `ExternalFunctionResponse`, URL says `external-function`, doc says "UC Connection" — none of those words is in the method name.
- **Category:** 1 (vague), 6 (misleading), 14 (collides with global `Request`/`HttpRequest`).
- **Suggested name:** Rename `httpRequest` → `invokeExternalFunction` or `callConnection`. Better: move the method to a different package (`uc-connections` or similar). The current placement is a layering bug.
- **Rationale:** A method called `httpRequest` on a model-serving `Client` will be the first thing every new SDK user tries when they want to query an endpoint — and will fail with confusing errors. Naming + placement is a footgun.

### 5. Acronym casing storm: `Ai` / `OpenAi` / `PaLm` / `Ai21Labs` / `Pii` / `Pt` / `Llm` across the file
- **Why weird:** Mixed acronym-casing schemes on user-visible names:
  - `AiGateway`, `AiGatewayConfig`, `AiGatewayRateLimit`, `AiGuardrails`, `AiGuardrailParameters` — title-cased `Ai`.
  - `OpenAiConfig`, `googleCloudVertexAiConfig` — title-cased `Ai` mid-word.
  - `PaLmConfig`, `palmConfig` — `PaLm` (mixed-internal-caps). The product is "PaLM" (stylized "Pathways Language Model"); the SDK chose `PaLm`, the worst rendering option.
  - `Ai21Labs`, `Ai21LabsConfig` — the product is "AI21 Labs"; rendered as `Ai21Labs` (lower-case `21`, lower-case `i` mid-word).
  - `PiiSettings` — `Pii` (PII = personally identifiable information); rendered title-case.
  - `Pt`, `PtEndpoint`, `PtServedModel`, `PtEndpointCoreConfig`, `CreatePtEndpointRequest`, `PutPtEndpointConfigRequest` — `Pt` is "PT" (provisioned throughput). Two-letter acronym title-cased while the method names spell it out (#6).

  Excludes JS-built-in acronyms (`Http`, `Json`) and wire-format strings.
- **Category:** 3 (acronym casing inconsistencies).
- **Suggested name:** Decide a project-wide rule in `typescript.mdc`. Either follow Microsoft's .NET capitalization (title-case two-letter acronyms, PascalCase three-plus) or the Google TypeScript Style Guide (treat acronyms as whole words). Either is defensible; *none* should be mixed in one file.
- **Rationale:** Twenty-plus exported identifiers from one file vary in convention. This is the single biggest *category* of weirdness in the package surface.

### 6. `Pt` abbreviation in types vs `ProvisionedThroughput` in methods/waiters — `src/v1/client.ts:148, 173, 515, 540, 695, 855`, `src/v1/model.ts:294, 881, 887, 981`
- **Why weird:** `Pt` is short for "provisioned throughput". The full term *is* used in two method names (`createProvisionedThroughputInferenceEndpoint`, `putProvisionedThroughputInferenceEndpointConfig`) and two waiter class names (`CreateProvisionedThroughputInferenceEndpointWaiter`, `PutProvisionedThroughputInferenceEndpointConfigWaiter`), but the request/response *types* use the abbreviation (`CreatePtEndpointRequest`, `PutPtEndpointConfigRequest`, `PtEndpointCoreConfig`, `PtServedModel`). The URL says `/api/2.0/serving-endpoints/pt`. Three different names for one concept in one call.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent abbreviation across method/type/URL).
- **Suggested name:** Either expand all (`CreateProvisionedThroughputEndpointRequest`, `PutProvisionedThroughputEndpointConfigRequest`) or contract all (`createPtEndpoint`, `putPtEndpointConfig`). Pick one. The current half-and-half is the worst option.
- **Rationale:** A user searching the codebase for `provisionedThroughput` will find the methods but not the types; searching for `pt` will find the types but produce massive false positives (`Pattern`, `Path`, `Patch`, etc.).

### 7. `Behavior` enum is unqualified — `src/v1/model.ts:5-10`
- **Why weird:** Top-level export named `Behavior` — the most generic noun possible for an enum. It is used as `PiiSettings.behavior: Behavior` (line 878). A consumer importing `Behavior` from `@databricks/sdk-modelserving/v1` has no idea this is about PII guardrails. Other packages will have their own `Behavior` and import aliases become mandatory. Values: `NONE | BLOCK | MASK` — so this is *PII action behavior*.
- **Category:** 1 (vague/generic), 15 (generic name losing meaning).
- **Suggested name:** `PiiBehavior` or `PiiGuardrailAction`.
- **Rationale:** Domain-specific enum names make import lists self-documenting; `Behavior` alone forces every reader to chase the type.

### 8. `GetExportEndpointMetricsRequest` / `getExportEndpointMetrics` — five-noun garble — `src/v1/model.ts:540`, `src/v1/client.ts:216`
- **Why weird:** The grammar is broken. The expected reading is *"export endpoint metrics" → returns metrics in export format*, but `Get + Export + Endpoint + Metrics + Request` parses as five nouns in a row. The doc string (`client.ts:215`) confirms the intent: "Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format". The natural English phrase is "export the endpoint's metrics" → method `exportEndpointMetrics`. Compare with sibling methods on the same client: `getInferenceEndpoint`, `getInferenceEndpointSchema`, `patchInferenceEndpointTags` — none prefix the noun with an output format.
- **Category:** 6 (misleading), 7 (overly verbose), 17 (inconsistent verb — every other method is `getX`, this one is `getExportX`).
- **Suggested name:** `exportEndpointMetrics(req: ExportEndpointMetricsRequest)` returning `EndpointMetrics`. Or `getEndpointMetrics(req: GetEndpointMetricsRequest)` returning `EndpointMetrics`. The "export" framing is a wire-protocol detail (Prometheus format) that does not belong in the method name.
- **Rationale:** Method naming consistency across siblings; English grammar.

## Medium severity

### 9. `ServedModelDeploymentState` enum name collides with parent `ServedModelState` type — `src/v1/model.ts:12, 1069-1072`
- **Why weird:** The enum type is `ServedModelDeploymentState`, and it lives on the field `ServedModelState.deployment: ServedModelDeploymentState`. Two different types both end in `State`, one wraps the other, and the wrapper field (`deployment`) shares its name with the inner enum's category. The result reads as `served.state.deployment` returning a `ServedModelDeploymentState` — the wrapper and the enum sound like the same thing.
- **Category:** 20 (type-suffix tautology on `deployment: ServedModelDeploymentState`).
- **Suggested name:** Rename the type `ServedModelState` → `ServedModelDeployment`, and the enum `ServedModelDeploymentState` → `DeploymentState`. Call site becomes `served.state.deployment === DeploymentState.READY`. The container and the discriminant no longer share a noun.
- **Rationale:** Two `*State` siblings nested inside each other tangle the wrapper identity with the discriminant identity.

### 10. `EndpointCoreConfig` vs `EndpointCoreConfigOutput` vs `EndpointCoreConfigSummary` — three near-duplicates — `src/v1/model.ts:376, 392, 410`
- **Why weird:** Three types describe "the config of a serving endpoint":
  - `EndpointCoreConfig`: input shape (`servedEntities`, `servedModels`, `trafficConfig`, `autoCaptureConfig`).
  - `EndpointCoreConfigOutput`: input shape + `configVersion: number`.
  - `EndpointCoreConfigSummary`: lite shape (`servedEntities: ServedModelLite[]`, `servedModels: ServedModelLite[]` — no `trafficConfig`, no `autoCaptureConfig`, no `configVersion`).

  Together with `PendingConfig` (= `EndpointCoreConfigOutput` plus `startTime`) and `PtEndpointCoreConfig` (the PT variant of `EndpointCoreConfig`), there are five overlapping config types. The naming makes the differences invisible: `Output` adds one field; `Summary` removes three.
- **Category:** 12 (duplicate concept), 7 (overly verbose suffixes), 17 (inconsistent suffix semantics).
- **Suggested name:** Either collapse into one type with optional fields, or give the types names that reflect their purpose: `EndpointConfigInput` (write), `EndpointConfig` (read with version), `EndpointConfigPreview` (lite/list-view).
- **Rationale:** "Output" and "Summary" and "Detailed" are three different ways to say "the shape on the wire". The trio invites bugs where the wrong type is passed.

### 11. `InferenceEndpoint` vs `InferenceEndpointDetailed` near-duplicate — `src/v1/model.ts:624, 653`
- **Why weird:** Two near-duplicate types:
  - `InferenceEndpoint` (lines 624-651): 14 fields, used in `ListInferenceEndpointsRequest_Response.endpoints`.
  - `InferenceEndpointDetailed` (lines 653-690): 18 fields, returned by `getInferenceEndpoint`, `createInferenceEndpoint`, `putInferenceEndpointConfig`.

  The "Detailed" version adds `pendingConfig`, `permissionLevel`, `routeOptimized`, `endpointUrl`, `dataPlaneInfo`, `emailNotifications` and changes `config` from `EndpointCoreConfigSummary` to `EndpointCoreConfigOutput`. So `InferenceEndpoint` is really the *list-summary* projection but its name says "the endpoint"; `InferenceEndpointDetailed` is *the* endpoint but its name says "more detail than usual".
- **Category:** 12 (duplicate concept), 7 (overly verbose suffix), 17 (inconsistent — which one is "the endpoint"?).
- **Suggested name:** `InferenceEndpointSummary` (list projection) and `InferenceEndpoint` (single-resource projection). Drop the `Detailed` suffix — the unqualified name should be the canonical resource.
- **Rationale:** A consumer writing `function show(endpoint: InferenceEndpoint)` will get the list-projection type and miss fields like `endpointUrl`. The name lies about which is canonical.

### 12. `ServedModelLite` lite-variant — `src/v1/model.ts:1057-1067`
- **Why weird:** Same pattern as #11 at the entity level. `ServedModel` (line 1004) has 23 fields. `ServedModelLite` (lines 1057-1067) has 7 fields. The "Lite" suffix says nothing about *which* fields it kept; only by reading both types side-by-side can you see what is dropped. Compare to the JSDoc convention used in `EndpointCoreConfigSummary` (uses "Summary" in the name).
- **Category:** 12 (duplicate concept), 1 (vague suffix — `Lite` is non-standard), 17 (inconsistent: `Summary` for the parent, `Lite` for the child).
- **Suggested name:** `ServedEntitySummary` (paired with #2 rename).
- **Rationale:** Inconsistent suffix convention across the file.

### 13. `CreatePtEndpointRequest` method-type asymmetry with `CreateInferenceEndpointRequest` — `src/v1/model.ts:271, 294`
- **Why weird:** Sister request types:
  - `CreateInferenceEndpointRequest` (full name).
  - `CreatePtEndpointRequest` (abbreviated).

  The PT variant is *not* called `CreateProvisionedThroughputInferenceEndpointRequest`; it is `CreatePtEndpointRequest`. The non-PT variant is not called `CreateEndpointRequest`; it is `CreateInferenceEndpointRequest`. So one type carries the qualifier `Inference`, the other carries the qualifier `Pt`. Mixed metaphor.
- **Category:** 17 (inconsistent qualifier choice).
- **Suggested name:** `CreateServingEndpointRequest` and `CreateProvisionedThroughputServingEndpointRequest` (paired with #1).
- **Rationale:** Sibling request types should differ only in the qualifier that actually differs.

### 14. `PutInferenceEndpointConfigRequest` vs `PutPtEndpointConfigRequest` — request shape divergence — `src/v1/model.ts:950, 981`
- **Why weird:** Two "put endpoint config" requests:
  - `PutInferenceEndpointConfigRequest`: flat — `name`, `servedEntities`, `servedModels`, `trafficConfig`, `autoCaptureConfig` (5 fields).
  - `PutPtEndpointConfigRequest`: nested — `name`, `config: PtEndpointCoreConfig` (2 fields, with the config under a sub-object).

  Same operation conceptually, two different request shapes. The naming makes both look symmetric (`Put*EndpointConfigRequest`), but they are not.
- **Category:** 17 (inconsistent shape with consistent naming — worst case for the reader).
- **Suggested name:** Pick one shape. Either flatten both (drop the inner `PtEndpointCoreConfig`) or nest both.
- **Rationale:** API surface asymmetry hidden by consistent naming is the most surprising kind.

### 15. `name ?? ''` empty-string fallback when the field is "required" — `src/v1/client.ts:192, 220, 247, 272, 299, 327, 383, 415, 447, 487, 519, 559`
- **Why weird:** The JSDoc on each request says "This field is required" yet the type marks `name?: string | undefined` *optional* and the URL is built with `${req.name ?? ''}` — if the caller forgets to set it, the SDK silently emits a URL like `/api/2.0/serving-endpoints//metrics` (double slash) which will 404 server-side. The contradiction between "required per JSDoc" and "optional per TS type" is a typing inconsistency that bites consumers.
- **Category:** 6 (misleading — JSDoc contradicts type), 16 (field contradicting type domain).
- **Suggested name:** Mark `name` as required (`endpointName: string`). Remove the `?? ''` fallback so a missing value throws earlier. Same applies to `servedModelName`.
- **Rationale:** Optional + "required" JSDoc + empty-string fallback is a triple-violation. Cf. AIP-122 (https://google.aip.dev/122) which mandates path parameters be required.

### 16. Waiter classes have asymmetric naming — `src/v1/client.ts:615, 695, 775, 855`
- **Why weird:** Four waiter classes:
  - `CreateInferenceEndpointWaiter`
  - `CreateProvisionedThroughputInferenceEndpointWaiter` (53 characters)
  - `PutInferenceEndpointConfigWaiter`
  - `PutProvisionedThroughputInferenceEndpointConfigWaiter` (54 characters)

  Two issues: the verb tense varies (`Create*Waiter` describes the resource lifecycle; `Put*ConfigWaiter` describes the *config* operation, not the *endpoint* lifecycle); the two PT waiters spell out `ProvisionedThroughput` while the request/response types use `Pt` (#6).
- **Category:** 17 (inconsistent abbreviation: `Pt` in types, `ProvisionedThroughput` in waiter classes), 13 (verb-tense inconsistency: `Create*` vs `Put*Config*`).
- **Suggested name:** Either drop the waiter classes entirely and expose `Client.createInferenceEndpoint(...).wait(options)` directly, or shorten with a consistent rule: `CreateEndpointWaiter`, `CreatePtEndpointWaiter`, `PutEndpointConfigWaiter`, `PutPtEndpointConfigWaiter`.
- **Rationale:** Four exported waiter classes, each 30+ characters long, with five+ identical prefixes that grep the same way as the methods themselves.

### 17. `done()` on waiter classes returns `true` for both success AND failure — `src/v1/client.ts:671-692, 751-772, 831-852, 911-932`
- **Why weird:** Waiter `done()` returns `true` for:
  - `NOT_UPDATING` (success)
  - `UPDATE_FAILED` (failure)
  - `UPDATE_CANCELED` (cancellation)

  All three "terminal" states are treated as `done`. A consumer reading `if (await waiter.done()) { /* it succeeded */ }` will silently get failures and cancellations. The name `done()` does not convey "terminal but possibly failed".
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** Rename `done()` → `isTerminal()` or split into `isSuccess()` / `isTerminal()`. Or have `done()` throw on failure for parity with `wait()`.
- **Rationale:** Method-name semantics divergence is a runtime bug, not a stylistic one.

### 18. `ModelDataPlaneInfo` wraps `DataPlaneInfo` — `Info`-around-`Info` placeholder — `src/v1/model.ts:737-740`
- **Why weird:** `ModelDataPlaneInfo` is a one-field wrapper: `{queryInfo?: DataPlaneInfo}`. So the public surface is `endpoint.dataPlaneInfo: ModelDataPlaneInfo` → `.queryInfo: DataPlaneInfo` → `.endpointUrl, .authorizationDetails`. Two layers of `*Info` suffix wrapping each other, where the outer layer carries no information beyond "this is the model-specific subset of data-plane info" — but it has only one field, so the wrapping is a pure architectural placeholder reserved for future operations. The JSDoc on `ModelDataPlaneInfo` ("A representation of all DataPlaneInfo for operations that can be done on a model through Data Plane APIs.") tautologically repeats the type name.
- **Category:** 7 (overly verbose suffix chain), 20 (type-suffix tautology on `dataPlaneInfo: ModelDataPlaneInfo`).
- **Suggested name:** Collapse — drop `ModelDataPlaneInfo` and inline `DataPlaneInfo` as `InferenceEndpointDetailed.queryDataPlane?: DataPlaneInfo`. If a future operation needs a second data-plane URL, add a field then.
- **Rationale:** `Info`-wrapping-`Info` is an architectural placeholder that doesn't survive into idiomatic TS where optional fields obviate the wrapper.

### 19. `getServedModelLogs` vs `getServedModelBuildLogs` — duplicate concept "logs" — `src/v1/client.ts:295, 323`
- **Why weird:** Two methods, both retrieve logs, distinguished only by what *kind* of logs (runtime "service" logs vs container "build" logs). The build/service axis is a sub-attribute of "logs", not a separate concept. The naming makes the unqualified one (`getServedModelLogs`) sound canonical, but it is actually the service-logs special case.
- **Category:** 12 (duplicate concept), 6 (misleading — `getServedModelLogs` alone doesn't tell you it returns *service* (not build) logs).
- **Suggested name:** Rename the existing `getServedModelLogs` to `getServedModelServiceLogs` (parallel with `getServedModelBuildLogs`). Or collapse into one method with a `kind: 'build' | 'service'` parameter.
- **Rationale:** When two siblings differ by a hidden attribute, name *both* with that attribute. Today the default and the special case look asymmetric.

### 20. `GetServedModelLogsRequest_Response.logs: string` is a single blob, name is plural — `src/v1/model.ts:570, 583`
- **Why weird:** Both `GetServedModelBuildLogsRequest_Response` and `GetServedModelLogsRequest_Response` have `logs?: string`. The field name is plural but the type is a single string — many log *lines* concatenated. A user doing `for (const line of response.logs)` will iterate characters, not lines.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Either `logsText: string` (singular field with type-disambiguating suffix) or `logs: string[]` (split lines server-side).
- **Rationale:** The current shape forces every consumer to write `response.logs.split('\n')`.

## Low severity

### 21. `*ApiKeyPlaintext` / `*Plaintext` paired-field pattern — many fields across provider configs
- **Why weird:** Every provider config has a `*ApiKey` (secret reference) and `*ApiKeyPlaintext` (literal value). Six configs, twelve pairs. The "plaintext" suffix is necessary on the wire, but in TS could be modelled as a discriminated union (`{kind: 'secret'; secretRef: string} | {kind: 'plaintext'; value: string}`). Today the user must read JSDoc to understand "exactly one of these two" semantics.
- **Category:** 6 (misleading — two optional fields modelled instead of a union), 12 (duplicate concept).
- **Suggested name:** Model as discriminated union; or at minimum mark the JSDoc with `@oneOf`.
- **Rationale:** The "must specify exactly one" constraint is invisible to the type system.

### 22. `ExternalModel.provider` is a freeform string — `src/v1/model.ts:467`
- **Why weird:** "The name of the provider for the external model. Currently, the supported providers are 'ai21labs', 'anthropic', 'amazon-bedrock', 'cohere', 'databricks-model-serving', 'google-cloud-vertex-ai', 'openai', 'palm', and 'custom'." This is a `string` that is *actually* an enum (9 known values). The discriminator union below (`config.$case`) repeats the same set with different casing. So the `provider` field and the `$case` field both encode the same fact, in two different formats.
- **Category:** 6 (misleading — string-typed enum), 12 (duplicate of `$case`).
- **Suggested name:** Type as a string-literal union: `provider?: 'ai21labs' | 'anthropic' | ... | 'custom' | undefined`. Or remove entirely and derive from `config.$case`.
- **Rationale:** A `string` field with a finite set of legal values should be a union; this is one of TS's strongest features and the codebase is bypassing it.

### 23. `ServedModel.workloadSize` is a freeform `string` — `src/v1/model.ts:1021`
- **Why weird:** "Valid workload sizes are 'Small' (4 - 4 provisioned concurrency), 'Medium' (8 - 16 provisioned concurrency), and 'Large' (16 - 64 provisioned concurrency). Additional custom workload sizes can also be used when available in the workspace." Same pattern as #22: a string field with a documented but unenforced enum.
- **Category:** 6 (misleading), 1 (vague — `workloadSize` could mean memory, cpu, instance type, etc.).
- **Suggested name:** Keep `workloadSize`; type as `'Small' | 'Medium' | 'Large' | (string & {})` (the `& {}` trick keeps custom values acceptable while suggesting the canonical three in IDEs).
- **Rationale:** Type-narrowing fix; minor.

### 24. `ExternalModel.task` freeform string — `src/v1/model.ts:471`
- **Why weird:** "The task type of the external model." Bare `string` with no JSDoc enumeration of accepted values. `task` is also used on `InferenceEndpoint.task` (line 642) and `InferenceEndpointDetailed.task` (line 675) with the same minimalist doc ("The task type of the serving endpoint."). Three uses of `task: string`, none telling the user what strings are legal (e.g., `chat`, `completion`, `embeddings`).
- **Category:** 1 (vague), 19 (underspecified domain).
- **Suggested name:** Type as a string-literal union or, at minimum, document the accepted values in JSDoc.
- **Rationale:** Same class as #22/#23.

### 25. `ExportMetricsResponse` is generic "metrics" not "endpoint metrics" — `src/v1/model.ts:425-436`, `src/v1/client.ts:216-219`
- **Why weird:** The method `getExportEndpointMetrics` returns `ExportMetricsResponse` — the type name dropped the `Endpoint` qualifier present in the method name. A reader greping for `EndpointMetrics` won't find the response type. Same shape (`contents?: ReadableStream`) as `ExternalFunctionResponse` and `GetOpenApiResponse`; the *content* is the only thing that says "metrics".
- **Category:** 17 (inconsistent — method qualifier dropped from response type), 1 (vague — `ExportMetricsResponse` could be metrics for anything).
- **Suggested name:** Pair the method rename in #8 with a response rename: `getEndpointMetrics()` → `EndpointMetrics`. Or `exportEndpointMetrics()` → `ExportEndpointMetricsResponse`.
- **Rationale:** Symmetry between method and return type aids IDE autocomplete and grep-ability.

### 26. `Get*` prefix on every read method — `src/v1/client.ts:216, 243, 268, 295, 323`
- **Why weird:** Every read method here is prefixed `get*`. The `Get*` verb prefix on TS methods is a Go/Java/.NET pattern; in TS, a noun method `endpointMetrics()` or `metrics()` is more idiomatic for read operations (cf. `URL.searchParams`, `Response.json()`). Where TS does use `get*`, it's typically on synchronous accessors.
- **Category:** 14 (Go/Java-style names).
- **Suggested name:** Verb-first for actions: `exportMetrics(req)`, `fetchServedModelLogs(req)`, `fetchServedModelBuildLogs(req)`. Or property-style if the request is trivial.
- **Rationale:** Google TS Style Guide § Names of functions (https://google.github.io/styleguide/tsguide.html#methods) prefers imperative verbs, but does not mandate `get*` for retrievals. SDK-wide call, flag for project review.

## Observation

### 27. Mixed naming convention for the same product across sibling packages
The Databricks "Serving Endpoints" product spans two packages in this SDK after the 2026-05-22 consolidation:
- `modelserving`: types use `InferenceEndpoint*` (control plane).
- `modelservingquery`: types use `Endpoint` (data plane — e.g., `QueryEndpointInput`, `QueryEndpointResponse`).

The wire uniformly uses `serving-endpoints`. SDK consumers chaining both packages will see different names for one concept.
- **Category:** 17 (cross-package inconsistency).

### 28. `ExternalModel.config` discriminated union with nine variants — `src/v1/model.ts:460-506`
Nine `$case` variants, no exhaustiveness check at the type level. If a tenth provider is added, the discriminated union types it correctly, but the cascade (lines 1346-1387) is hand-rolled and will silently miss the new case. The names of the discriminator keys also vary in casing relative to the type names. This is a maintenance smell, not strictly a naming bug — but the *uniformity* of the names (`<provider>Config`) gives a false sense of "this is a clean enum" when it is actually a tower of `if-else`.
- **Category:** 12 (duplicate concept).

## Domain glossary
- `pt` — Provisioned Throughput (a billing/serving model where capacity is pre-allocated). Mixed: spelled out in method names and waiter class names, abbreviated in type names.
- `ai gateway` — A Databricks proxy layer that sits in front of model-serving endpoints to apply guardrails, rate limits, usage tracking, payload logging, and fallback. Rendered `AiGateway` throughout.
- `ai guardrails` — Input/output content filters applied via AI Gateway (`safety`, `pii`, `validTopics`, `invalidKeywords`).
- `pii` — Personally Identifiable Information. Rendered `Pii` throughout.
- `uc` — Unity Catalog. Referenced in JSDoc as "UC" and in field docs ("the credentials stored in UC Connection").
- `arn` — Amazon Resource Name. Rendered `Arn` (suffix `instanceProfileArn`).
- `provider` values (`ai21labs`, `anthropic`, `amazon-bedrock`, `cohere`, `databricks-model-serving`, `google-cloud-vertex-ai`, `openai`, `palm`, `custom`) — kebab-case on the wire, `<provider>Config` camelCase in TS.

## File coverage
- `src/v1/model.ts` (2557 lines): read fully.
- `src/v1/client.ts` (934 lines): read fully.
- `src/v1/utils.ts` (185 lines): read fully.
- `src/v1/index.ts` (93 lines): read fully.
- `src/v1/transport.ts`: present (not a naming source).
