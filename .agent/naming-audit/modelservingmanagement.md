# Naming Audit: modelservingmanagement

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/modelserving/src/v1/` (renamed from `modelservingmanagement` in regeneration)
**Versions audited:** v1
**Inferred domain:** "Serving endpoint" management — CRUD over inference (model-serving) endpoints, plus a parallel "PT" (provisioned-throughput) variant, plus side-channel updates for AI Gateway, rate limits, tags, notifications, OpenAPI schema fetch, and an out-of-band UC-connection-backed HTTP proxy (`httpRequest` / `ExternalFunction*`). Sibling packages: `modelservingdebug` (logs/metrics), `modelservingquery` (inference). Three packages share the noun "serving endpoint" with no cross-package alignment of how the noun is rendered (this package: `InferenceEndpoint`; debug: `Endpoint`; query: `Endpoint`).
**Total weird names flagged:** 43

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 17 |
| Low | 11 |
| Observation | 4 |

## High severity

### 1. Package noun mismatch: `modelservingmanagement` vs `InferenceEndpoint` vs `ServingEndpoint*` vs `serving-endpoints` URL — entire package
- **Why weird:** The package name says *model-serving management*, the URL path says `/api/2.0/serving-endpoints`, the docs (every JSDoc) say "serving endpoint", but every TypeScript type is named `InferenceEndpoint*` (`InferenceEndpoint`, `InferenceEndpointDetailed`, `InferenceEndpointState`, `CreateInferenceEndpoint`, `DeleteInferenceEndpoint`, etc.). Meanwhile the *permission* enum is `ServingEndpointDetailedPermissionLevel` (model.ts:22) — the only top-level identifier in the file that uses the actual product noun. So the package has *three* names for the same thing: "serving endpoint" (product/doc/URL), "inference endpoint" (TS types), and "serving endpoint detailed" (permission enum). Users importing from this package will see `InferenceEndpoint`, look up docs that say "serving endpoint", and hit URLs labelled `serving-endpoints`. This is the central naming bug of the package.
- **Category:** 6 (misleading), 12 (duplicate concept), 17 (inconsistent terminology).
- **Suggested name:** Pick one product noun. The wire and docs say `serving endpoint`; the Go SDK exposes `ServingEndpoint`/`ServingEndpointsAPI`. Rename all `InferenceEndpoint*` to `ServingEndpoint*` (or vice versa across the docs and URL). The mixed state cannot stand.
- **Rationale:** Cross-language consistency: every Databricks SDK (Python, Java, Go) calls these `ServingEndpoint`. TS being the lone outlier on `InferenceEndpoint` will confuse anyone reading SDK docs side-by-side.

### 2. `ServedModel` type now also holds non-models — `src/v1/model.ts:1004`
- **Why weird:** The type `ServedModel` represents the "served entity" — and the doc on `ServedModel.externalModel` (line 1007) acknowledges this directly: "Only one of external_model and (entity_name, entity_version, workload_size, workload_type, and scale_to_zero_enabled) can be specified...". The doc on `ServedModel.entityName` (line 1009) further widens the meaning: "The entity may be a model in the Databricks Model Registry, a model in the Unity Catalog (UC), or *a function of type FEATURE_SPEC in the UC*." So `ServedModel` can be a model OR a function. Every `EndpointCoreConfig*.servedEntities: ServedModel[]` confirms this: the field is *called* `servedEntities` but its element type is `ServedModel`. Type name lies; field name is correct.
- **Category:** 6 (misleading), 15 (generic field name vs specific type name).
- **Suggested name:** Rename `ServedModel` → `ServedEntity`. Keep the field name `servedEntities`. The wire stays whatever it is. For users, `servedEntities: ServedEntity[]` reads correctly.
- **Rationale:** A type whose name contradicts its values is the highest-impact naming bug; doc text already concedes the rename is correct.

### 3. `EndpointCoreConfig*.servedEntities` + `servedModels` duplicate field — `src/v1/model.ts:376-390, 392-408, 410-415, 856-874, 950-966`
- **Why weird:** Five different request/response types each carry *both* `servedEntities?: ServedModel[]` and `servedModels?: ServedModel[]` (the request DTOs now carry a `Request` suffix — e.g. `PutInferenceEndpointConfigRequest` — but the duplication is unchanged). The JSDoc admits the duplication: "(Deprecated, use served_entities instead) The list of served models under the serving endpoint config." For a TS SDK user typing into IntelliSense both fields appear and both look valid. Idiomatic TS uses `@deprecated` on the field, which the JSDoc does not.
- **Category:** 12 (duplicate concept), 6 (misleading — deprecated not marked).
- **Suggested name:** Mark `servedModels` with `@deprecated` JSDoc tag (so IDEs strike through it). Better: drop `servedModels` from the TS surface entirely.
- **Rationale:** Five types times two fields equals ten redundant deprecation lookalikes; every one of them is a footgun.

### 4. `ServedModel.modelName` / `ServedModel.modelVersion` deprecated cousins — `src/v1/model.ts:1032, 1033, 1057-1067`
- **Why weird:** `ServedModel` has both `entityName`/`entityVersion` and `modelName`/`modelVersion`. The JSDoc on `ServedModelLite.modelName` (line 1059) says "Only one of model_name and entity_name should be populated"; same for `modelVersion`/`entityVersion`. So `ServedModel.modelName`/`modelVersion` are legacy fields that mirror `entityName`/`entityVersion`. They are completely undocumented inside `ServedModel` (lines 1032-1033 are bare fields with no comment), so a TS user has no way to know they are deprecated. This is *the same* duplication as #3, but at the field level.
- **Category:** 12 (duplicate concept), 6 (misleading), 19 (underspecified — bare fields with no docs).
- **Suggested name:** Mark `modelName` / `modelVersion` as `@deprecated`. The JSDoc on `ServedModelLite` should be promoted to a real type-level note. Wire keys remain.
- **Rationale:** Public surface area duplicating itself is *the* common source of integration bugs.

### 5. `ServingEndpointDetailedPermissionLevel` enum — only one identifier in the package using `ServingEndpoint*` — `src/v1/model.ts:22-26`
- **Why weird:** This is the *only* type named `ServingEndpoint*`. Every other type in the file uses `InferenceEndpoint*`. Either this enum should be `InferenceEndpointPermissionLevel` (to match the rest of the package), or the rest of the package should be `ServingEndpoint*` (to match the product and wire). The `Detailed` infix is also suspect — the enum lives on `InferenceEndpointDetailed.permissionLevel`, so the type-name says "this enum belongs to InferenceEndpointDetailed", but a `permissionLevel` of `CAN_VIEW` is *not* detailed any differently from a non-detailed view; the enum applies to the resource, not to the response shape. So `Detailed` is leaking the response-DTO name into the enum name.
- **Category:** 17 (inconsistent terminology), 7 (overly verbose).
- **Suggested name:** `ServingEndpointPermissionLevel` (and rename the rest of the package — see #1). Drop `Detailed`.
- **Rationale:** Enum names that include the response-DTO shape (`Detailed`) tangle the message identity into the type identity. In TS, the enum represents a concept, not the message it appears in.

### 6. Method `httpRequest` for "make external services call using UC Connection" — `src/v1/client.ts:587`
- **Why weird:** `httpRequest` on a `Client` for *model-serving management* is wildly mis-located. The doc reads: "Make external services call using the credentials stored in UC Connection." This is a Unity-Catalog-Connection HTTP proxy endpoint that happens to live at `/api/2.0/external-function`. It has nothing to do with serving endpoints. The method name `httpRequest` is the most generic name in HTTP (the global `Request` constructor builds an HTTP request); collides with `HttpRequest` from `@databricks/sdk-core/http`. The request type is `ExternalFunctionRequest`, response is `ExternalFunctionResponse`, URL says `external-function`, doc says "UC Connection" — none of those words is in the method name.
- **Category:** 1 (vague), 6 (misleading), 14 (collides with global `Request`/`HttpRequest`).
- **Suggested name:** Rename `httpRequest` → `invokeExternalFunction` or `callConnection`. Better: move the method to a different package (`uc-connections` or similar). The current placement is a layering bug.
- **Rationale:** A method called `httpRequest` on a `ServingEndpointsClient` will be the first thing every new SDK user tries when they want to query an endpoint — and will fail with confusing errors. Naming + placement is a footgun.

### 7. `ExternalFunctionRequest` doc says "Simple Proto message for testing" — `src/v1/model.ts:438`
- **Why weird:** Public type carries the JSDoc comment "Simple Proto message for testing". Either the type is for testing (in which case it should not be exported) or it is production (in which case the doc lies). Given it is wired to a real REST URL and exported via `index.ts`, the doc is a lie.
- **Category:** 6 (misleading — public doc text contradicts the exported reality).
- **Suggested name:** Fix the JSDoc: "Request for `Client.httpRequest`: invoke an external service through a UC Connection." Keep type name `ExternalFunctionRequest` for now (paired with the rename in #6).
- **Rationale:** Doc bugs on exported identifiers are as serious as the identifier itself.

### 8. Acronym casing storm: `AiGateway` / `AiGuardrails` / `OpenAi` / `PaLm` / `Ai21Labs` / `Pii` / `Pt` / `Uc` / `Llm` / `Ai` everywhere — across the file
- **Why weird:** This single file mixes nearly every imaginable acronym-casing scheme:
  - `AiGateway`, `AiGatewayConfig`, `AiGatewayRateLimit`, `AiGuardrails`, `AiGuardrailParameters` — title-cased `Ai`.
  - `OpenAiConfig`, `OpenAi` — title-cased `Ai`, lowercase initial.
  - `GoogleCloudVertexAiConfig`, `googleCloudVertexAiConfig` — same.
  - `PaLmConfig`, `palmConfig` — `PaLm` (the *only* mixed-internal-caps spelling). The product is "PaLM", which is itself a stylized "Pathways Language Model"; the SDK could have rendered it `Palm`, `PaLM`, or `PaLm`. It chose `PaLm`, the worst of three.
  - `Ai21Labs`, `Ai21LabsConfig` — the product is "AI21 Labs"; rendered as `Ai21Labs` (lower-case `21`, lower-case `i` mid-word).
  - `PiiSettings` — `Pii` is "PII" (personally identifiable information); rendered title-case.
  - `Pt`, `PtEndpoint`, `PtServedModel`, `PtEndpointCoreConfig`, `CreatePtEndpoint`, `PutPtEndpointConfig` — `Pt` is "PT" (provisioned throughput). Two-letter acronym title-cased.
  - `Uc`, `ucServiceCredentialName` — `Uc` is "UC" (Unity Catalog).
  - `HttpMethod` — `Http` title-cased.
  - `OpenApi`, `GetOpenApiResponse` — `Api` title-cased mid-word.
  - `ApiKey`, `apiKeyAuth` — `Api` title-cased.
  - `ARN`-related: `instanceProfileArn`, `Arn` is suffix-cased.
  - `Url`, `endpointUrl`, `customProviderUrl` — `Url` title-cased.
  - `OpenAi` (line 743) vs `openai` (lines 505, 1399) — `openai` is all lower-case in *some* discriminator keys.
- **Category:** 3 (acronym casing inconsistencies — the audit prompt's exemplar).
- **Suggested name:** Decide a project-wide rule in `typescript.mdc`. The Microsoft .NET capitalization guidelines (https://learn.microsoft.com/dotnet/standard/design-guidelines/capitalization-conventions) say to title-case two-letter acronyms (`IO`) and PascalCase three-plus-letter acronyms (`Xml`); the Google TypeScript Style Guide (https://google.github.io/styleguide/tsguide.html#identifiers) says to treat acronyms as whole words. Either is defensible; *none* should be mixed in one file. The current state has at least four different rules co-existing.
- **Rationale:** Twenty-five exported identifiers from one file vary in convention. This is the single biggest *category* of weirdness in the package.

### 9. `openai` discriminator key lowercase while sibling keys are camelCase — `src/v1/model.ts:505-507, 1399-1401`
- **Why weird:** Inside `ExternalModel.config` discriminated union, the eight `$case` values are: `ai21labsConfig`, `anthropicConfig`, `amazonBedrockConfig`, `cohereConfig`, `googleCloudVertexAiConfig`, `databricksModelServingConfig`, `openaiConfig`, `palmConfig`, `customProviderConfig`. Seven of nine use the standard `<provider>Config` camelCase. The two outliers are:
  - `ai21labsConfig` (the product is "AI21 Labs"; the discriminator collapses to `ai21labs` — all lower-case middle), and
  - `openaiConfig` (the product is "OpenAI"; the discriminator collapses to `openai` — lower-case middle), and
  - `palmConfig` (the product is "PaLM"; the discriminator collapses to `palm`).
  In each case the JSDoc field name (`Ai21Labs`, `OpenAi`, `PaLm`) does not match the discriminator (`ai21labs`, `openai`, `palm`).
- **Category:** 3 (acronym casing), 17 (inconsistent within the same union).
- **Suggested name:** Either lowercase the camelCase boundary on all keys (`ai21Labs`, `openAi`, `paLm`, `amazonBedrock`, `cohere`, ...) or all-PascalCase the type names to match. As above: pick one rule.
- **Rationale:** The discriminator string is the *runtime* value clients must match against; an inconsistent rule means clients can't programmatically map provider name → discriminator.

### 10. `Behavior` enum is unqualified — `src/v1/model.ts:5-10`
- **Why weird:** Top-level export named `Behavior` — the most generic noun possible for an enum. It is used as `PiiSettings.behavior: Behavior` (line 878). A consumer importing `Behavior` from `@databricks/sdk-modelserving/v1` has no idea this is about PII guardrails. Other packages will have their own `Behavior` and import aliases become mandatory. Values: `BEHAVIOR_UNSPECIFIED | NONE | BLOCK | MASK` — so this is *PII action behavior*.
- **Category:** 1 (vague/generic), 15 (generic name losing meaning).
- **Suggested name:** `PiiBehavior` or `PiiGuardrailAction`.
- **Rationale:** Domain-specific enum names make import lists self-documenting; `Behavior` alone forces every reader to chase the type.

### 11. `Route` field carries `servedModelName` AND `servedEntityName` — `src/v1/model.ts:996-1002`
- **Why weird:** `Route` has three fields: `servedModelName?: string`, `trafficPercentage?: number`, `servedEntityName?: string`. There is no JSDoc on `servedEntityName` — it is silently the modern name; `servedModelName` is the legacy. Two fields point at the same logical thing (the entity to route traffic to), one without docs, one with docs that only mention "served model" (line 997). Same bug class as #3 and #4.
- **Category:** 12 (duplicate concept), 6 (misleading), 19 (undocumented field).
- **Suggested name:** Mark `servedModelName` `@deprecated`; doc `servedEntityName` properly.
- **Rationale:** Triple bug: undocumented field, duplicate concept, no deprecation marker.

## Medium severity

### 12. `UNKNOWN` vs `UNSPECIFIED` zero-value naming inconsistent across enums — `src/v1/model.ts:6, 13, 30, 40, 49`
- **Why weird:** Four enums spell the zero-value sentinel `*_UNSPECIFIED` (`Behavior.BEHAVIOR_UNSPECIFIED`, `ExternalFunctionRequest_HttpMethod.HTTP_METHOD_UNSPECIFIED`, `InferenceEndpointState_ConfigUpdateState.CONFIG_UPDATE_STATE_UNSPECIFIED`, `InferenceEndpointState_ReadyState.READY_STATE_UNSPECIFIED`), but `ServedModelDeploymentState.DEPLOYMENT_UNKNOWN` (line 13) uses `UNKNOWN` instead. One file, two conventions for the same concept.
- **Category:** 17 (inconsistent `UNSPECIFIED`/`UNKNOWN`).
- **Suggested name:** Normalize the outlier: rename `DEPLOYMENT_UNKNOWN` → `DEPLOYMENT_STATE_UNSPECIFIED` (per AIP-126: https://google.aip.dev/126).
- **Rationale:** Two spellings for the same sentinel concept across sibling enums in a single file is a pure inconsistency, independent of whether the sentinel itself should exist.

### 13. `ServedModelDeploymentState` enum name collides with parent `ServedModelState` type — `src/v1/model.ts:12, 1069-1072`
- **Why weird:** The enum type is `ServedModelDeploymentState`, and it lives on the field `ServedModelState.deployment: ServedModelDeploymentState`. Two different types both end in `State`, one wraps the other, and the wrapper field (`deployment`) shares its name with the inner enum's category. The result reads as `served.state.deployment` returning a `ServedModelDeploymentState` — the wrapper and the enum sound like the same thing.
- **Category:** 20 (type-suffix tautology on `deployment: ServedModelDeploymentState`).
- **Suggested name:** Rename the type `ServedModelState` → `ServedModelDeployment`, and the enum `ServedModelDeploymentState` → `DeploymentState`. Call site becomes `served.state.deployment === DeploymentState.READY`. The container and the discriminant no longer share a noun.
- **Rationale:** Two `*State` siblings nested inside each other tangle the wrapper identity with the discriminant identity.

### 14. `EndpointCoreConfig` vs `EndpointCoreConfigOutput` vs `EndpointCoreConfigSummary` — three near-duplicates — `src/v1/model.ts:376, 392, 410`
- **Why weird:** Three types describe "the config of a serving endpoint":
  - `EndpointCoreConfig`: input shape (`servedEntities: ServedModel[]`, `servedModels: ServedModel[]`, `trafficConfig`, `autoCaptureConfig`).
  - `EndpointCoreConfigOutput`: input shape + `configVersion: number`.
  - `EndpointCoreConfigSummary`: lite shape (`servedEntities: ServedModelLite[]`, `servedModels: ServedModelLite[]` — no `trafficConfig`, no `autoCaptureConfig`, no `configVersion`).

  Together with `PendingConfig` (which is `EndpointCoreConfigOutput` plus `startTime`) and `PtEndpointCoreConfig` (the PT variant of `EndpointCoreConfig`), there are five overlapping config types. The naming makes the differences invisible: `Output` adds one field; `Summary` removes three.
- **Category:** 12 (duplicate concept), 7 (overly verbose suffixes), 17 (inconsistent suffix semantics).
- **Suggested name:** Either (a) collapse into one type with optional fields, or (b) give the types names that reflect their *purpose*: `EndpointConfigInput` (write), `EndpointConfig` (read with version), `EndpointConfigPreview` (lite/list-view).
- **Rationale:** "Output" and "Summary" and "Detailed" are three different ways to say "the shape on the wire". The trio invites bugs where the wrong type is passed.

### 15. `InferenceEndpoint` vs `InferenceEndpointDetailed` near-duplicate — `src/v1/model.ts:624, 653`
- **Why weird:** Two near-duplicate types:
  - `InferenceEndpoint` (lines 624-651): used in `ListInferenceEndpointsRequest_Response.endpoints`. Has 14 fields.
  - `InferenceEndpointDetailed` (lines 653-690): returned by `getInferenceEndpoint`, `createInferenceEndpoint`, `putInferenceEndpointConfig`. Has 18 fields.

  The "Detailed" version adds `pendingConfig`, `permissionLevel`, `routeOptimized`, `endpointUrl`, `dataPlaneInfo`, `emailNotifications` and changes `config` from `EndpointCoreConfigSummary` to `EndpointCoreConfigOutput`. So `InferenceEndpoint` is really the *list-summary* projection, but its name says "the endpoint". `InferenceEndpointDetailed` is *the* endpoint, but its name says "more detail than usual".
- **Category:** 12 (duplicate concept), 7 (overly verbose suffix), 17 (inconsistent: which one is "the endpoint"?).
- **Suggested name:** `InferenceEndpointSummary` (list projection) and `InferenceEndpoint` (single-resource projection). Drop the `Detailed` suffix — the unqualified name should be the canonical resource.
- **Rationale:** Currently consumers writing `function show(endpoint: InferenceEndpoint)` will get the list-projection type and miss fields like `endpointUrl`. The name lies about which is canonical.

### 16. `ServedModelLite` lite-variant — `src/v1/model.ts:1057-1067`
- **Why weird:** Same pattern as #15 at the entity level. `ServedModel` (line 1004) has 23 fields. `ServedModelLite` (lines 1057-1067) has 7 fields. The "Lite" suffix says nothing about *which* fields it kept; only by reading both types side-by-side can you see what is dropped. Compare to the JSDoc convention used in `EndpointCoreConfigSummary` (no Lite suffix, just "Summary" in the name).
- **Category:** 12 (duplicate concept), 1 (vague suffix — `Lite` is non-standard), 17 (inconsistent: `Summary` for the parent, `Lite` for the child).
- **Suggested name:** `ServedEntitySummary` (paired with #2 type rename).
- **Rationale:** Inconsistent suffix convention across the file. "Lite" is also an LLM-era term that clashes with the OpenAI/Anthropic-flavoured product space.

### 17. `Pt` abbreviation everywhere — `src/v1/client.ts:148, 173, 515, 540` and `src/v1/model.ts:294, 881, 887, 981`
- **Why weird:** `Pt` is short for "provisioned throughput". The full term ("provisioned throughput") *is* used in two method names (`createProvisionedThroughputInferenceEndpoint`, `putProvisionedThroughputInferenceEndpointConfig`), but the request/response *types* use the abbreviation (`CreatePtEndpointRequest`, `PutPtEndpointConfigRequest`, `PtEndpointCoreConfig`, `PtServedModel`). So the public surface has:
  - `client.createProvisionedThroughputInferenceEndpoint(req: CreatePtEndpointRequest)` — method-full, type-abbreviated.
  - URL: `/api/2.0/serving-endpoints/pt` — wire-abbreviated.

  Three different names for one concept, in one call.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent abbreviation across method/type/URL).
- **Suggested name:** Either expand all (`CreateProvisionedThroughputEndpointRequest`, `PutProvisionedThroughputEndpointConfigRequest`, etc. — long but searchable) or contract all (`createPtEndpoint`, `putPtEndpointConfig` — short but cryptic). Pick one. The current half-and-half is the worst option.
- **Rationale:** A user searching the codebase for `provisionedThroughput` will find the methods but not the types; searching for `pt` will find the types but produce massive false positives (`Pattern`, `Path`, `Patch`, etc.).

### 18. `CreatePtEndpointRequest` method-type asymmetry with `CreateInferenceEndpointRequest` — `src/v1/model.ts:271, 294`
- **Why weird:** Sister request types:
  - `CreateInferenceEndpointRequest` (full name).
  - `CreatePtEndpointRequest` (abbreviated).

  The PT variant is *not* called `CreateProvisionedThroughputInferenceEndpointRequest`; it is `CreatePtEndpointRequest`. The non-PT variant is not called `CreateEndpointRequest`; it is `CreateInferenceEndpointRequest`. So one type carries the qualifier `Inference`, the other carries the qualifier `Pt`. Mixed metaphor.
- **Category:** 17 (inconsistent qualifier choice).
- **Suggested name:** `CreateServingEndpointRequest` and `CreateProvisionedThroughputServingEndpointRequest` (paired with #1).
- **Rationale:** Sibling request types should differ only in the qualifier that actually differs.

### 19. `PutInferenceEndpointConfigRequest` vs `PutPtEndpointConfigRequest` — request shape divergence — `src/v1/model.ts:950, 981`
- **Why weird:** Two "put endpoint config" requests:
  - `PutInferenceEndpointConfigRequest`: flat — `name`, `servedEntities`, `servedModels`, `trafficConfig`, `autoCaptureConfig` (5 fields).
  - `PutPtEndpointConfigRequest`: nested — `name`, `config: PtEndpointCoreConfig` (2 fields, with the config under a sub-object).

  Same operation conceptually, two different request shapes. The naming makes both look symmetric (`Put*EndpointConfigRequest`), but they are not.
- **Category:** 17 (inconsistent shape with consistent naming — worst case for the reader).
- **Suggested name:** Pick one shape. Either flatten both (drop the inner `PtEndpointCoreConfig`) or nest both.
- **Rationale:** API surface asymmetry hidden by consistent naming is the most surprising kind.

### 20. `PatchInferenceEndpointTagsRequest.addTags` / `deleteTags` paired with `EndpointTag` — `src/v1/model.ts:836-843`
- **Why weird:** `addTags?: EndpointTag[]` and `deleteTags?: string[]`. The two fields use different element types — one is the full `EndpointTag` (key+value), the other is bare keys. The naming says "tags" for both, but only one actually holds tags. A user reading `deleteTags: ['env']` will think they are deleting tag `env=*`; in reality they are deleting all tags with key `env`. That semantics is fine, but the field name does not convey it.
- **Category:** 6 (misleading), 15 (generic field name).
- **Suggested name:** `addTags: EndpointTag[]` (keep); `deleteTagKeys: string[]` (rename).
- **Rationale:** When the element type changes, the field name should change too.

### 21. `endpointUrl` field domain ambiguity — `src/v1/model.ts:679, 331`
- **Why weird:** `endpointUrl` appears twice:
  - `InferenceEndpointDetailed.endpointUrl` (line 679): "Endpoint invocation url if route optimization is enabled for endpoint."
  - `DataPlaneInfo.endpointUrl` (line 331): "The URL of the endpoint for this operation in the dataplane."

  Same field name, two completely different URLs (one is the public invocation URL; the other is the data-plane endpoint for one specific operation). Compare with #15 in the audit prompt: generic field names lose meaning across structs.
- **Category:** 15 (generic field name across types), 17 (inconsistent usage).
- **Suggested name:** `invocationUrl` (on `InferenceEndpointDetailed`) and `dataPlaneUrl` (on `DataPlaneInfo`).
- **Rationale:** A consumer JOINing the two by `endpointUrl` field name will mismatch them.

### 22. `id`/`name` dual-identifier on `InferenceEndpoint` — `src/v1/model.ts:625-640, 654-669`
- **Why weird:** `InferenceEndpoint` and `InferenceEndpointDetailed` both have *two* identifiers:
  - `name: string` — "The name of the serving endpoint." (Wire `name`. Used in URLs.)
  - `id: string` — "System-generated ID of the endpoint, included to be used by the Permissions API."

  The `name` is used in URLs; the `id` is used in the Permissions API. Same resource, two opaque strings. Neither is qualified (`endpointName`/`endpointId` would make grepping work). Compare to the audit prompt's rule 19.
- **Category:** 1 (vague), 19 (underspecified ID), 15 (generic field name).
- **Suggested name:** `name` → `endpointName`; `id` → `endpointId`. Wire stays whatever it is.
- **Rationale:** `endpoint.id` and `endpoint.name` are footguns when joined with other resources (e.g. logs that include a `name` that is something else entirely).

### 23. Waiter classes have asymmetric naming — `src/v1/client.ts:615, 695, 775, 855`
- **Why weird:** Four waiter classes:
  - `CreateInferenceEndpointWaiter`
  - `CreateProvisionedThroughputInferenceEndpointWaiter` (53 characters — the longest exported class in the file)
  - `PutInferenceEndpointConfigWaiter`
  - `PutProvisionedThroughputInferenceEndpointConfigWaiter` (54 characters)

  Two problems: the verb tense varies (`Create*Waiter` is fine; `Put*ConfigWaiter` describes the *config* operation, not the *endpoint* lifecycle); the two PT waiters spell out `ProvisionedThroughput` (unlike #17 where the type is `Pt`). Sibling request types should differ only in the qualifier that actually differs.
- **Category:** 17 (inconsistent abbreviation: `Pt` in types, `ProvisionedThroughput` in waiter classes), 13 (verb-tense inconsistency: `Create*` vs `Put*Config*`).
- **Suggested name:** Either drop the waiter classes entirely and expose `Client.createInferenceEndpoint(...).wait(options)` directly, or shorten with a consistent rule: `CreateEndpointWaiter`, `CreatePtEndpointWaiter`, `PutEndpointConfigWaiter`, `PutPtEndpointConfigWaiter`.
- **Rationale:** Four exported waiter classes, each 30+ characters long, each containing five+ identical method-name prefixes that grep the same way as the methods themselves.

### 24. `done()` on waiter classes returns `true` for both success AND failure — `src/v1/client.ts:671-692, 751-772, 831-852, 911-932`
- **Why weird:** Waiter `done()` returns `true` for:
  - `NOT_UPDATING` (success)
  - `UPDATE_FAILED` (failure)
  - `UPDATE_CANCELED` (cancellation)

  All three "terminal" states are treated as `done`. A consumer reading `if (await waiter.done()) { /* it succeeded */ }` will silently get failures and cancellations. The name `done()` does not convey "terminal but possibly failed".
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** Rename `done()` → `isTerminal()` or split into `isSuccess()` / `isTerminal()`. Or have `done()` throw on failure for parity with `wait()`.
- **Rationale:** Method-name semantics divergence is a runtime bug, not a stylistic one.

### 25. `StillRunningError extends Error` private throw-away — `src/v1/client.ts:80`
- **Why weird:** Internal marker error class. Name is fine (`StillRunningError` reads as "operation still running, not done yet"), but the class is never exported, never caught outside the four waiters, and is used purely as a retry signal. Compare to other packages where this is named `RetryableError` or `PollAgainError`. The name "StillRunning" implies a polling lifecycle rather than a retry signal.
- **Category:** 1 (vague), 17 (inconsistent with sibling SDK packages).
- **Suggested name:** `RetrySignal` (it is an internal control-flow signal, not a real error).
- **Rationale:** Minor; internal.

### 26. `RateLimit` vs `AiGatewayRateLimit` — two near-duplicate types — `src/v1/model.ts:987-994, 93-107`
- **Why weird:** `RateLimit` (3 fields: calls, key, renewalPeriod) and `AiGatewayRateLimit` (5 fields: calls, key, renewalPeriod, principal, tokens). The `AiGateway` variant is a strict superset. Why two types? `RateLimit` is used by the deprecated `putInferenceEndpointRateLimits` (client.ts:483 "Deprecated: Please use AI Gateway to manage rate limits instead."). `AiGatewayRateLimit` is the new path. Same pattern as #14: legacy + new lives side-by-side, with no `@deprecated` tag on the legacy type.
- **Category:** 12 (duplicate concept), 6 (misleading — deprecation not in tag).
- **Suggested name:** Mark `RateLimit` and `PutInferenceEndpointRateLimitsRequest*` types `@deprecated` in JSDoc.
- **Rationale:** Same pattern repeated; same fix.

### 27. `ExportMetricsResponse` JSDoc leaks `Proto` / `Rpc` / `JettyRPC` architecture — `src/v1/model.ts:424-434`
- **Why weird:** The JSDoc on this public exported type reads: "Proto version of com.databricks.rpc.HttpOverRpcResponse. This message can be specially handled in UnaryRpcService with JettyRPC when the advanced feature CustomHandlingForHttpOverRpcProtoResponse is enabled - bypass the RPC serializer and populate HTTP status, response headers and response body from the proto message directly." Five internal architectural concepts (`Proto`, `Rpc`/`RPC`, `UnaryRpcService`, `JettyRPC`, `CustomHandlingForHttpOverRpcProtoResponse`) are dumped into the public docs of a TS type that just carries a `ReadableStream`. The TS consumer has no need to know that `ExportMetricsResponse` is a "Proto version of com.databricks.rpc.HttpOverRpcResponse" — that is a backend impl detail. The type name itself is fine; the doc is the leak.
- **Category:** Proto-architectural leak (in JSDoc), 6 (misleading — public doc surfaces backend internals).
- **Suggested name:** Keep type name `ExportMetricsResponse`. Rewrite the JSDoc to describe the user-facing shape: "Streaming response from `Client.getExportEndpointMetrics`. The body is a Prometheus-format text stream." Strip every `Proto`/`Rpc`/`Jetty*` reference.
- **Rationale:** Public docs that name internal RPC infrastructure leak the implementation strategy into the SDK surface. SDK consumers should never read "JettyRPC" or "UnaryRpcService" in IDE tooltips.

### 28. `ModelDataPlaneInfo` wraps `DataPlaneInfo` — `Info`-around-`Info` architectural placeholder — `src/v1/model.ts:737-740`
- **Why weird:** `ModelDataPlaneInfo` is a one-field wrapper: `{queryInfo?: DataPlaneInfo}`. So the public surface is `endpoint.dataPlaneInfo: ModelDataPlaneInfo` → `.queryInfo: DataPlaneInfo` → `.endpointUrl, .authorizationDetails`. Two layers of `*Info` suffix wrapping each other, where the outer layer carries no information beyond "this is the model-specific subset of data-plane info" — but it has only one field (`queryInfo`), so the wrapping is a pure architectural placeholder reserved for future operations. The repeated `Info` suffix is the architectural-leak signal: two `*Info` siblings, one nested in the other, neither carrying real "info" of its own (one is a one-field wrapper, the other is two URL strings). The JSDoc on `ModelDataPlaneInfo` ("A representation of all DataPlaneInfo for operations that can be done on a model through Data Plane APIs.") tautologically repeats the type name.
- **Category:** Proto-architectural leak (`Info`-suffix duplication as structural placeholder), 7 (overly verbose suffix chain), 20 (type-suffix tautology on `dataPlaneInfo: ModelDataPlaneInfo`).
- **Suggested name:** Collapse — drop `ModelDataPlaneInfo` and inline `DataPlaneInfo` as `InferenceEndpointDetailed.queryDataPlane?: DataPlaneInfo`. If a future operation needs a second data-plane URL, add a second field then. Or rename the wrapper to `ModelDataPlanes` (plural noun) and drop the `Info` suffix on both.
- **Rationale:** `Info`-wrapping-`Info` is the same pattern as `*Spec.spec` or `*Config.config` proto idioms — an architectural placeholder that doesn't survive into idiomatic TS where optional fields obviate the wrapper.

## Low severity

### 29. `Ai21LabsConfig.ai21labsApiKey` / `ai21labsApiKeyPlaintext` — `src/v1/model.ts:54-69`
- **Why weird:** Field repeats the provider name (`ai21labs`) because the type is named `Ai21LabsConfig`. Reading `config.ai21labsApiKey` inside an `Ai21LabsConfig` is redundant — the only key here is going to be an AI21 Labs API key. Same pattern repeats for every provider config (`anthropicApiKey` inside `AnthropicConfig`, `cohereApiKey` inside `CohereConfig`, etc.).
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** `apiKey` / `apiKeyPlaintext` inside `Ai21LabsConfig`. Wire stays `ai21labs_api_key`.
- **Rationale:** Compare to `OpenAiConfig.openaiApiKey` (same redundancy), `CohereConfig.cohereApiKey` (same), `AnthropicConfig.anthropicApiKey` (same), `PaLmConfig.palmApiKey` (same), `DatabricksModelServingConfig.databricksApiToken` (same). Six provider configs, six instances of the redundancy. The wire forces the prefix (`anthropic_api_key`); TS does not.

### 30. `*ApiKeyPlaintext` / `*Plaintext` paired-field pattern — many fields
- **Why weird:** Every provider config has a `*ApiKey` (secret reference) and `*ApiKeyPlaintext` (literal value). Six configs, twelve pairs. The "plaintext" suffix is necessary on the wire, but in TS could be modelled as a discriminated union (`{kind: 'secret'; secretRef: string} | {kind: 'plaintext'; value: string}`). Today the user must read JSDoc to understand "exactly one of these two" semantics.
- **Category:** 6 (misleading — two optional fields modelled instead of a union), 12 (duplicate concept).
- **Suggested name:** Model as discriminated union; or at minimum mark the JSDoc with `@oneOf`.
- **Rationale:** The "must specify exactly one" constraint is invisible to the type system.

### 31. `valid_topics` / `invalid_keywords` — `src/v1/model.ts:118, 123`
- **Why weird:** Two list fields on `AiGuardrailParameters`. `validTopics` is the list of *allowed* topics; `invalidKeywords` is the list of *blocked* keywords. So one is a denylist, one is an allowlist. The opposite-polarity naming (`valid*` for allowlist, `invalid*` for denylist) reads correctly *only* if you read both docs. A user skimming the fields will see "valid topics" and "invalid keywords" and not realise the polarity flipped.
- **Category:** 6 (misleading), 17 (inconsistent polarity).
- **Suggested name:** `allowedTopics` / `blockedKeywords`.
- **Rationale:** Allowlist/denylist naming convention is well-established (https://www.ncsc.gov.uk/blog-post/terminology-its-not-black-and-white).

### 32. `EmailNotifications.onUpdateSuccess` / `onUpdateFailure` — `src/v1/model.ts:371, 373`
- **Why weird:** Field name reads as an event handler (`onUpdateSuccess` is a JS convention for "callback when update succeeds"). But the field is a `string[]` of email addresses. Not a callback. The `on*` prefix is borrowed from JS event-handler-naming and is misleading here.
- **Category:** 6 (misleading — `on*` implies callback).
- **Suggested name:** `notifyOnUpdateSuccess` / `notifyOnUpdateFailure` (verb), or `updateSuccessRecipients` / `updateFailureRecipients` (noun).
- **Rationale:** `on*` in a JS context is a strong signal of "event handler"; using it for email lists violates that signal.

### 33. `Route.servedModelName` / `servedEntityName` — already flagged in #11
- **Why weird:** Cross-reference.

### 34. `ExternalModel.config` discriminated union with nine variants — `src/v1/model.ts:460-506`
- **Why weird:** Nine `$case` variants, no exhaustiveness check at the type level. If a tenth provider is added (e.g. `mistralConfig`), the discriminated union types it correctly, but the cascade (lines 1346-1387) is hand-rolled and will silently miss the new case. The names of the discriminator keys also vary (#9). This is a maintenance smell, not strictly a naming bug — but the *uniformity* of the names (`<provider>Config`) gives a false sense of "this is a clean enum" when it is actually a tower of `if-else`.
- **Category:** Observation / 12.
- **Suggested name:** No rename; flag as generator review.
- **Rationale:** Names look clean; runtime is fragile.

### 35. `ExternalModel.name` — bare `name` on an unbounded type — `src/v1/model.ts:469`
- **Why weird:** "The name of the external model." But `name` on an `ExternalModel` is *different* from `name` on the enclosing `ServedModel` (line 1006). A consumer reading `served.externalModel.name` and `served.name` will see two strings that look related; they are not (the inner is the provider's model name like "gpt-4"; the outer is the route name within the endpoint).
- **Category:** 1 (vague), 15 (generic name across types).
- **Suggested name:** `ExternalModel.modelName` or `ExternalModel.providerModelName`.
- **Rationale:** Disambiguates from `ServedModel.name`.

### 36. `ExternalModel.provider` is a freeform string — `src/v1/model.ts:467`
- **Why weird:** "The name of the provider for the external model. Currently, the supported providers are 'ai21labs', 'anthropic', 'amazon-bedrock', 'cohere', 'databricks-model-serving', 'google-cloud-vertex-ai', 'openai', 'palm', and 'custom'." This is a `string` that is *actually* an enum (9 known values). The discriminator union below (`config.$case`) repeats the same set with different casing. So the `provider` field and the `$case` field both encode the same fact, in two different formats.
- **Category:** 6 (misleading — string-typed enum), 12 (duplicate of `$case`).
- **Suggested name:** Type as a string-literal union: `provider?: 'ai21labs' | 'anthropic' | ... | 'custom' | undefined`. Or remove entirely and derive from `config.$case`.
- **Rationale:** A `string` field with a finite set of legal values should be a union; this is one of TS's strongest features and the codebase is bypassing it.

### 37. `ServedModel.workloadSize` is a freeform `string` — `src/v1/model.ts:1021`
- **Why weird:** "Valid workload sizes are 'Small' (4 - 4 provisioned concurrency), 'Medium' (8 - 16 provisioned concurrency), and 'Large' (16 - 64 provisioned concurrency). Additional custom workload sizes can also be used when available in the workspace." Same pattern as #36: a string field with a documented but unenforced enum.
- **Category:** 6 (misleading), 1 (vague — `workloadSize` could mean memory, cpu, instance type, etc.).
- **Suggested name:** Keep `workloadSize`; type as `'Small' | 'Medium' | 'Large' | (string & {})` (the `& {}` trick keeps custom values acceptable while suggesting the canonical three in IDEs).
- **Rationale:** Type-narrowing fix; minor.

### 38. `ExternalFunctionRequest` JSDoc literally says "Simple Proto message for testing" — `src/v1/model.ts:438`
- **Why weird:** Cross-references #7 (the doc lying about "for testing"). The proto-architectural angle is sharper here: the word `Proto` itself should not appear in any TS-facing JSDoc. The TS SDK does not transport protobuf, does not use proto codegen at the consumer surface, and the consumer cannot act on the fact that the wire shape originated as a proto. The doc is a verbatim copy from the proto IDL comment that escaped through the generator.
- **Category:** Proto-architectural leak (in JSDoc).
- **Suggested name:** Rewrite the JSDoc (see #7 for proposed user-facing text). Strip the word `Proto`.
- **Rationale:** Same as #27 and #39; proto vocabulary is a backend-team artifact and should be stripped before public docs are emitted.

### 39. `GetOpenApiResponse` JSDoc says "The top level proto message" — `src/v1/model.ts:555`
- **Why weird:** The JSDoc reads "The top level proto message that represents an OpenAPI 3.0 document." Same pattern as #27 and #38: the doc tells the TS consumer that the type originated as a proto message. The TS type itself is just `{contents?: ReadableStream}` — a stream of OpenAPI 3.0 JSON. The consumer has zero use for the "proto message" framing. The `OpenApi` in the type name is fine (it is the user-facing payload); the word `proto` in the doc is the leak.
- **Category:** Proto-architectural leak (in JSDoc).
- **Suggested name:** Rewrite the JSDoc: "Streaming response from `Client.getInferenceEndpointSchema`. The body is the endpoint's OpenAPI 3.0 schema as JSON."
- **Rationale:** Strip proto vocabulary from public docs.

## Observations

### 40. Mixed naming convention for the same product across three sibling packages
The Databricks "Serving Endpoints" product spans three packages in this SDK:
- `modelservingmanagement`: types use `InferenceEndpoint*`.
- `modelservingdebug`: types use `Endpoint` (e.g. `GetExportEndpointMetrics`).
- `modelservingquery`: types use `Endpoint` (e.g. `QueryEndpointInput`, `QueryEndpointResponse`).

No two packages agree on the noun. The wire uniformly uses `serving-endpoints`. SDK consumers chaining all three packages will see three different names for one concept.
- **Category:** 17 (cross-package inconsistency).

### 41. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
Same as customllms #28 — every generated package carries this unused export.

### 42. `PACKAGE_SEGMENT` constant naming — `src/v1/client.ts:75`
Same as customllms #24 — internal user-agent constant.

### 43. `Headers` constructor used many times in client.ts — `src/v1/client.ts:119, 156, 195, 223, ...`
Each method instantiates a `new Headers({'Content-Type': 'application/json'})` or `new Headers()` then `.set('User-Agent', this.userAgent)`. Naming-wise this is fine (Headers is the standard web API name), but the pattern is duplicated 16+ times in the file. Not a naming bug; observation only.
- **Category:** 12 (duplicate pattern across methods).


## Domain glossary
- `pt` — Provisioned Throughput (a billing/serving model where capacity is pre-allocated). Mixed: spelled out in method names, abbreviated in type names.
- `ai gateway` — A Databricks-internal proxy layer that sits in front of model-serving endpoints to apply guardrails, rate limits, usage tracking, payload logging, and fallback. Rendered `AiGateway` throughout.
- `ai guardrails` — Input/output content filters applied via AI Gateway (`safety`, `pii`, `validTopics`, `invalidKeywords`).
- `pii` — Personally Identifiable Information. Rendered `Pii` throughout.
- `uc` — Unity Catalog. Rendered `Uc` (in `ucServiceCredentialName`) or written into JSDoc as "UC".
- `pat`/`m2m`/`u2m`/`oidc` — not encountered in this package.
- `iam` — not encountered.
- `arn` — Amazon Resource Name. Rendered `Arn` (suffix `instanceProfileArn`).
- `wkt` — Well-Known Types. Not imported (this package uses raw `number` for timestamps, not `Temporal.Instant`).
- `provider` enum keys (`ai21labs`, `anthropic`, `amazon-bedrock`, `cohere`, `databricks-model-serving`, `google-cloud-vertex-ai`, `openai`, `palm`, `custom`) — kebab-case on the wire, `<provider>Config` camelCase in TS.

## File coverage
- `src/v1/model.ts` (2556 lines): read fully.
- `src/v1/client.ts` (933 lines): read fully.
- `src/v1/utils.ts` (185 lines): read fully.
- `src/v1/index.ts` (92 lines): read fully.
- `src/v1/transport.ts` (75 lines): new file in regeneration; read fully.
