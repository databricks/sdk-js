# Naming Audit: customllms

**Path:** `packages/customllms/src/v1/`
**Versions audited:** v1
**Inferred domain:** "Custom LLM" CRUD plus an optimization run lifecycle — create/get/update/delete a `CustomLlm` resource (instructions, guidelines, datasets, optional UC artifact path), then start/cancel an optimization run that flips `optimizationState` through `CREATED → PENDING → RUNNING → COMPLETED|FAILED|CANCELLED`.
**Total weird names flagged:** 30

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 12 |
| Low | 7 |
| Observation | 4 |

## High severity

### 1. `Llm` casing throughout — every file
- **Why weird:** Every public type, field, method, and schema collapses the acronym `LLM` to title-case `Llm` (`CustomLlm`, `customLlm`, `createCustomLlm`, `customLlmFieldMask`, etc.). `LLM` is a well-known three-letter initialism, not a word. The Google TypeScript Style Guide (https://google.github.io/styleguide/tsguide.html#identifiers) explicitly says "treat abbreviations like acronyms in names as whole words" — that produces `LLM` if you choose the all-caps convention, or `Llm` if you choose the title-case convention. The package is internally consistent on `Llm` (and so are the sibling packages `accountsettings.LlmProxyPartnerPoweredAccount` and `workspacesettings.LlmProxyPartnerPoweredWorkspace`), so this is a *category* finding for the SDK rather than a local fix: `Llm` is harder to read than `LLM` because the human eye expects `Ll` to be a digraph rather than the start of an initialism. Microsoft's .NET guidelines (https://learn.microsoft.com/dotnet/standard/design-guidelines/capitalization-conventions) flip the other direction: capitalize all letters of two-letter acronyms (`IO`) and pascal-case three-or-more-letter acronyms (`Xml`, `Html`) — by that rule `Llm` *is* the consistent choice. There is no globally correct answer, but the SDK should pick *one* convention and apply it across all packages (`http` vs `Http`, `url` vs `Url`, `id` vs `Id` are already mixed — see Observation #28).
- **Category:** 3 (acronym casing — the audit prompt singles this out).
- **Suggested name:** Pick a project-wide policy in `typescript.mdc` and apply globally. If the SDK keeps `Llm`, document the choice; if it switches to `LLM`, every type and field in this package and the two sibling packages needs the rename.
- **Rationale:** This is the highest-impact naming question in the package because it touches every single exported identifier. Currently the only consumer-facing precedent in the codebase is `Llm`, so flipping to `LLM` is a breaking change across at least three packages.

### 2. `State` enum (top-level, ungrouped) — `src/v1/model.ts:9-17`
- **Why weird:** The enum is named `State` — the most generic noun in any API. There is no qualifier to tell the reader *which* state (optimization run? custom LLM? endpoint?). The doc comment ("States of Custom LLM optimization lifecycle.") clarifies, but the name alone does not. Every other Databricks package has its own `State` (jobs, clusters, queries) and a user importing two of them will be forced to alias.
- **Category:** 1 (vague/generic), 15 (generic field name).
- **Suggested name:** `OptimizationRunState` (matches the `optimizationState` field on `CustomLlm` and the request types `StartCustomLlmOptimizationRunRequest`/`CancelCustomLlmOptimizationRunRequest`).
- **Rationale:** Specific enum names make import lists self-documenting and avoid alias collisions when consumers combine multiple SDK packages.

### 3. `StartCustomLlmOptimizationRunRequest.id` doc says "Id of the tile" — `src/v1/model.ts:79`
- **Why weird:** Doc comment "The Id of the tile." refers to a "tile" that does not exist anywhere else in the package. This is almost certainly a copy-paste from another generated API (dashboards/tiles). Either the field name or the doc is wrong; reading the surrounding code, the field is the custom-LLM id (same as `CancelCustomLlmOptimizationRunRequest.id` on line 20). Public SDK doc bug.
- **Category:** 6 (misleading — doc contradicts the actual domain).
- **Suggested name:** Field name stays `id`; fix the JSDoc to "The id of the custom LLM whose optimization run to start." (matches `DeleteCustomLlmRequest.id` and `GetCustomLlmRequest.id` docs on lines 69 and 74).
- **Rationale:** A naming audit should flag doc-text bugs on identifiers as well as the identifier itself; consumers learn the semantics from JSDoc and a wrong doc is as harmful as a wrong name.

### 4. `id` field on every request and on `CustomLlm` — `src/v1/model.ts:20,44,70,75,80,94`
- **Why weird:** Bare `id` shows up on six places (`Cancel...Request.id`, `CustomLlm.id`, `Delete...Request.id`, `Get...Request.id`, `Start...Request.id`, `Update...Request.id`). Every JSDoc has to redundantly say "The id of the custom llm". A typed `customLlmId` makes the wire/TS surface self-documenting and avoids confusion with future API extensions (the endpoint is at `/api/2.0/custom-llms/{id}` — `id` here is the LLM id, not a generic id).
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `customLlmId` (or `llmId` if the `Custom` prefix is dropped). Wire stays `id`.
- **Rationale:** When grepping logs or stack-traces for `customLlmId`, you'll find the right call site. Today you'll grep for `id` and get 50 false positives across the SDK.

### 5. `CustomLlmFieldMask` only has 10 keys, missing 1 — `src/v1/model.ts:246-257`
- **Why weird:** The `FieldMask` for `CustomLlm` enumerates 10 fields, but `CustomLlm` declares 10 fields too (`id`, `name`, `endpointName`, `instructions`, `datasets`, `guidelines`, `optimizationState`, `creator`, `creationTime`, `agentArtifactPath`). On a strict read this is exactly aligned, *but* `endpointName` is documented as a server-populated read-only field ("Name of the endpoint that will be used to serve the custom LLM"). Exposing it in the field-mask suggests it is updatable, which would be a server bug — but consistent with the field-mask being machine-generated rather than designed. Worth a sanity check with the upstream API team.
- **Category:** Observation / 6 (misleading — field-mask implies updatable).
- **Suggested name:** No rename; flag the entry `endpointName: {wire: 'endpoint_name'}` for review.
- **Rationale:** This is the kind of thing a careful TS API designer would notice; a generator running over the proto schema will not.

### 6. `customLlm` is both a field name and a type name (different casings) — `src/v1/model.ts:96`
- **Why weird:** `UpdateCustomLlmRequest.customLlm: CustomLlm | undefined`. The TS naming convention makes the field/type distinction work via casing — but at a call site you'll write `req.customLlm = {...} satisfies CustomLlm`, and `customLlm` (the field) is one character of casing away from `CustomLlm` (the type). Type-suffix tautology under rule 20.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** Rename `customLlm` field → `target` or `update` so the field name is not a casing of the type name.
- **Rationale:** `req.target` reads cleanly; `req.customLlm` is the kind of name that survives code review only because nobody wants to argue with the generator.

### 7. `CustomLlm.creator: string` — `src/v1/model.ts:58`
- **Why weird:** "Creator of the custom LLM" — but a `creator` could be a username, an email, a UUID, a Databricks principal-id, or a service-principal client-id. The type is `string` so there is no help. Other Databricks SDK packages (catalog, jobs) use `createdBy` or `creator` similarly inconsistently. The name does not say *what kind* of identifier it is.
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `createdBy` if it is a user/principal id (matches Unity Catalog convention); add `@format` JSDoc clarifying whether it is an email or a UUID.
- **Rationale:** Public SDK fields whose meaning depends on side-channel knowledge are footguns.

## Medium severity

### 8. `CustomLlm.creationTime` vs `Dataset.table` field naming style — `src/v1/model.ts:60,65`
- **Why weird:** `creationTime` is named with the type-suffix convention (`*Time`), while peer fields on the same struct use bare nouns (`creator`, `name`, `instructions`). The other generated SDKs sometimes use `createdAt` or `createTime`. Naming `creationTime` is fine, but it is the *only* type-suffix field on `CustomLlm`.
- **Category:** 17 (inconsistency within the same struct).
- **Suggested name:** `createdAt` (Stripe/GitHub convention, https://stripe.com/docs/api/charges/object) or `createTime` (Google AIP-142, https://google.aip.dev/142). Either is more standard than `creationTime`.
- **Rationale:** AIP-142 (Google API design) says: "Fields representing the time at which a resource was created should be of type google.protobuf.Timestamp and called `create_time`." The Go SDK and Java SDK tend to mirror this; TS should too.

### 9. `instructions: string` vs `guidelines: string[]` — `src/v1/model.ts:50,54`
- **Why weird:** Two near-synonyms with different cardinalities. `instructions` is a single string, `guidelines` is a string array. The semantic difference is not obvious from the names; both feel like "things the model should follow". This is an API-design issue more than a naming issue, but the names amplify the confusion.
- **Category:** 6 (misleading), 12 (duplicate concept).
- **Suggested name:** `systemPrompt` (or `instruction`) for the single-string case; `rules` or `constraints` for the array. The bigger fix is to consolidate at the API level.
- **Rationale:** Reading `instructions` + `guidelines` side-by-side, a consumer cannot guess which goes where without reading the prose docs.

### 10. `Table.tablePath` — `src/v1/model.ts:85`
- **Why weird:** Type-suffix tautology (`Table.tablePath`). Doc says "Full UC table path in catalog.schema.table_name format" — but the field name does not communicate that it's a *fully qualified* three-part name. Compare with sibling SDK packages where the same concept is called `fullName` or `qualifiedName`.
- **Category:** 20 (type-suffix tautology), 1 (vague — "path" is generic; a filesystem path? a JSON pointer?).
- **Suggested name:** `fullName` (matches `catalog.TableInfo.full_name`) or `qualifiedName`.
- **Rationale:** Unity Catalog already has a canonical term for three-part names (`full_name`); reusing it makes cross-API code less surprising.

### 11. `Table.requestCol` / `Table.responseCol` — `src/v1/model.ts:87,89`
- **Why weird:** `Col` is a cryptic abbreviation for `Column`. The same package spells out `endpointName` and `agentArtifactPath` and `optimizationState`, so `Col` is inconsistent. Doc strings even use the full word: "Name of the request column".
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent with sibling fields).
- **Suggested name:** `requestColumn` / `responseColumn`.
- **Rationale:** Three saved characters is not worth the cognitive split between the doc ("column") and the identifier ("col").

### 12. `agentArtifactPath` field with explicit "soon be deprecated!!" comment — `src/v1/model.ts:36-40,61`
- **Why weird:** Field carries a self-deprecated marker in its doc ("This will soon be deprecated!!") but is not tagged `@deprecated` and lives on both `CreateCustomLlmRequest` and `CustomLlm`. SDK consumers will not see "soon to be deprecated" from IDE hover unless they read the body of the comment. Also the name conflates two ideas: it is an *output* artifact destination for the agent, framed as if it were an input — but actually the doc says "If you are using a dataset that you only have read permissions, please provide a destination path where you have write permissions." So this is a "destination" path, not an artifact-locating path.
- **Category:** 6 (misleading), 1 (vague — "agent artifact" is a generic term).
- **Suggested name:** Mark `@deprecated` and consider renaming to `outputDestinationPath` or `artifactWritePath`.
- **Rationale:** The public surface should not silently carry a soft-deprecation note. Tag it properly.

### 13. `optimizationState: State` type-suffix tautology — `src/v1/model.ts:56`
- **Why weird:** Field `optimizationState` of type `State`. If `State` is renamed to `OptimizationRunState` per #2, the field can be renamed `optimization: OptimizationRunState` or `runState: OptimizationRunState`.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `optimization` (if type renamed) or just `state` with `State` more specific. Best is the pair `optimization: OptimizationRunState`.
- **Rationale:** Reduces the noise once the enum name is specific.

### 14. `creationTime: Temporal.Instant` — `src/v1/model.ts:60`
- **Why weird:** `Temporal.Instant` is correct (good!) but the field name `creationTime` reads as a `Date` and many callers will accidentally `new Date(customLlm.creationTime)`, which throws because `Temporal.Instant` does not coerce. Worth a comment in JSDoc; not a rename.
- **Category:** Observation.
- **Suggested name:** Keep `creationTime`; expand JSDoc to mention `Temporal.Instant`.
- **Rationale:** Friction is from the type more than the name, but the name does not warn the reader of the unusual type.

### 15. `cancelCustomLlmOptimizationRun` vs `startCustomLlmOptimizationRun` plural noun — `src/v1/client.ts:69,162`
- **Why weird:** Both methods refer to "Optimization Run" (singular) — but a custom LLM has multiple optimization runs over its lifetime. The current API is `POST .../custom-llms/{id}/optimize/cancel` and `POST .../custom-llms/{id}/optimize` — so the URL has no run-id; the API operates on "the current run" implicitly. The method name `startOptimizationRun` is therefore not quite right; it should be `startOptimization` (the verb that starts a run) or `startCurrentOptimizationRun` (explicit). Same for `cancel`. As-is, the names imply a `runId` is being passed; it is not.
- **Category:** 6 (misleading — name implies run-level addressing).
- **Suggested name:** `startOptimization` / `cancelOptimization` (the singular "run" is implicit).
- **Rationale:** Method names should reflect the resource the verb operates on. The URL operates on the LLM, not on a specific run.

### 16. `executeCall` / `executeHttpCall` in `utils.ts:26,65` — naming pair
- **Why weird:** Two functions with nearly identical names handling different layers (retry/rate-limit wrapper vs raw HTTP send + logging). Easy to confuse at the call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp` or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should differ in more than the `Http` infix.

### 17. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Same word `Options` is reused for many unrelated concepts (`ClientOptions`, `CallOptions`, this one). The file also imports `Options` from `@databricks/sdk-core/api` (line 3) — three things named `Options` in the same file.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` or `HttpCallParams` (it is not user-facing options; it is an internal arg bag).
- **Rationale:** Distinguish internal context bags from user-tunable option structs.

### 18. `STATE_UNSPECIFIED` enum sentinel — `src/v1/model.ts:10`
- **Why weird:** The `State` enum's first member `STATE_UNSPECIFIED` is a proto-architectural leak. Proto3 requires every enum to declare a zero-value sentinel (typically `FOO_UNSPECIFIED`); that requirement does not exist in TypeScript. Exposing it on the public TS surface forces every consumer to handle a member that semantically means "the server forgot to set this field" — a proto wire-format concern, not a domain concern. The screaming-snake-case casing (`STATE_UNSPECIFIED`) also leaks proto's enum-value convention into a TS type system that conventionally uses PascalCase for enum members (https://google.github.io/styleguide/tsguide.html#enums).
- **Category:** Proto-architectural leak (enum sentinel + screaming-snake casing).
- **Suggested name:** Drop the `STATE_UNSPECIFIED` member entirely; if a "not yet set" value is needed, use `undefined` (the field is already `State | undefined`). If kept, rename to PascalCase `Unspecified` and document that it is a wire-format sentinel.
- **Rationale:** Optional TS fields express "unset" via `undefined`; a redundant enum sentinel doubles the representation of "no value" and forces consumers to write `state !== undefined && state !== State.STATE_UNSPECIFIED`. The all-caps casing further signals that the value is a proto artifact rather than a designed TS API member.

### 19. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:38`
- **Why weird:** `Segment` is a generic CS term. Comment explains it is the User-Agent identity segment; without the comment the constant name does not communicate that.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Minor; only one place in the file but flagged for SDK-wide consistency review.

## Low severity

### 20. `Dataset[]` plural-singular consistency — `src/v1/model.ts:32,52`
- **Why weird:** Field `datasets: Dataset[]` — type is singular `Dataset`, field is plural `datasets`. This is correct! Flagging as an *observation* of best practice (rule 9 reversed). Counter-examples appear in other packages where a `Datasets` type holds `dataset: Dataset[]`. This package gets it right.
- **Category:** Observation / 9 (reversed — correctly singular).
- **Suggested name:** No change.
- **Rationale:** Note for consistency reviews.

### 21. `customLlmFieldMask` function name — `src/v1/model.ts:259`
- **Why weird:** Function that builds a `FieldMask<CustomLlm>`. The name `customLlmFieldMask` reads as a field-mask *value* rather than a builder; sibling files in other packages name this `*FieldMaskBuilder` or expose it as a static method `FieldMask.forCustomLlm`.
- **Category:** 17 (inconsistent verb convention in the SDK).
- **Suggested name:** `buildCustomLlmFieldMask` or `customLlmFieldMaskFor` (with a static-method-like signature).
- **Rationale:** Minor; the function is clearly a builder by its signature `(...paths: string[]): FieldMask<CustomLlm>`.

### 22. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Function is exported but not used in this package (no caller in `client.ts`). Dead-looking surface area.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Either remove the export (if it is an unused generator default), or document why it ships per-package.
- **Rationale:** Not a name-quality issue per se, but flagged because each generated package will carry this and grep for unused exports across all packages will turn it up.

### 23. `readAll` helper — `src/v1/utils.ts:40`
- **Why weird:** Function reads an entire response body stream into a buffer. Name is fine but generic; collides cognitively with `Array.prototype` or stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` / `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 24. `Call` import alias — `src/v1/client.ts:4`
- **Why weird:** `import type {Call}` — `Call` is a one-word generic noun. Used for the inner async function. Could be `RetryableCall`, `HttpCallback`, etc. Not local to this package (it is from `@databricks/sdk-core/api`), but worth flagging.
- **Category:** 1 (vague type name).
- **Suggested name:** Imported type; rename upstream if appropriate.
- **Rationale:** Generic noun in core API surface.

### 25. `info` / `host` / `body` short locals — `src/v1/client.ts:58,73,74`
- **Why weird:** Three-letter local names. `info` for the client-info builder, `host` for the URL host, `body` for the request body. Conventional and short, but `info` is especially vague.
- **Category:** 1 (vague).
- **Suggested name:** Keep `host` and `body` (universal); rename `info` to `clientInfo`.
- **Rationale:** Localized; cosmetic.

### 26. `resp` local variable in every method — `src/v1/client.ts:98,142,171,197`
- **Why weird:** `resp` is the response. Four methods declare `let resp: CustomLlm | undefined;` then assign in a closure and `throw` if undefined. The pattern is repetitive *and* uses the same short name. Consider extracting a helper that returns `T | never`.
- **Category:** 12 (duplicate pattern).
- **Suggested name:** Refactor away the pattern, not the name.
- **Rationale:** Refactor opportunity surfaced by naming-audit.

## Observations

### 27. Action verbs in `Client` are consistent
The client uses `cancel`/`create`/`delete`/`get`/`start`/`update` — no `fetch`/`retrieve`/`read`. This is good.
- **Category:** 17 (reversed — explicit *consistency* note).

### 28. No `list` operation
The package exposes singleton CRUD plus optimization start/cancel, but no `listCustomLlms`. Unusual for a Databricks resource SDK. Not a naming issue, but worth flagging because the typical resource SDK has `list` and users will look for it.
- **Category:** Observation.

### 29. Mixed acronym casing in core types
The codebase imports `HttpClient`, `HttpRequest`, `HttpResponse`, `ApiError`, `URLSearchParams`, `userAgent`. The acronyms are cased every which way: `Http` (title), `Api` (title), `URL` (all-caps), `userAgent` (camel). This is consistent with the broader JS ecosystem (`fetch` returns a `Response`, `XMLHttpRequest` is its own caps, `URL` is all-caps in `URLSearchParams`), but it explains why `Llm` vs `LLM` feels arbitrary — the SDK has no single policy.
- **Category:** 3 (acronym casing).

### 30. `flattenQueryParams` array-of-objects TODO — `src/v1/utils.ts:132`
Comment "// arrays of objects are not yet supported" inside a generated utility. Not a name issue, but the public-export status of this function makes the TODO load-bearing.
- **Category:** Observation.

## Domain glossary
- `llm` — Large Language Model (every type, every field, every method; the canonical token).
- `uc` — Unity Catalog (mentioned only in JSDoc on `agentArtifactPath` and `Table.tablePath`: "Full UC table path in catalog.schema.table_name format").
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `pat`/`m2m`/`u2m`/`oidc` — not encountered in this package.
- `iam` — not encountered.

## File coverage
- `src/v1/model.ts` (262 lines): read fully.
- `src/v1/client.ts` (216 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (18 lines): read fully.
