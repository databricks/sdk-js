# Naming Audit: supervisoragents

**Path:** `packages/supervisoragents/src/v1/`
**Versions audited:** v1
**Inferred domain:** "Supervisor Agent" is an orchestrator resource that
routes user questions to one or more child tools (genie spaces, knowledge
assistants, UC functions, UC connections, apps, volumes, dashboards,
serving endpoints, UC tables, vector-search indexes, catalogs, schemas,
nested supervisor agents, public web search). CRUD on three resource types:
`SupervisorAgent` (top-level), `Tool` (child of `SupervisorAgent`,
discriminated union over 14 tool kinds), and `Example` (child of
`SupervisorAgent`, question + guidelines pair used for in-context steering).
Every list endpoint paginates via `pageSize`/`pageToken`. No state enums
exist in this package; the entire surface is data plus references to other
Databricks resources.
**Total weird names flagged:** 49

## Summary
| Severity | Count |
| --- | --- |
| High | 13 |
| Medium | 18 |
| Low | 11 |
| Observation | 7 |

## High severity

### 1. `SupervisorAgent` — `Supervisor` and `Agent` are both extremely generic — `src/v1/model.ts:219`
- **Why weird:** The package name + entity name combines two of the most overloaded nouns in the AI space. `Agent` alone could mean anything from "browser user-agent" to "autonomous LLM agent" to "service-account principal." `Supervisor` is even worse — in computing it usually refers to a process supervisor (systemd, OpenRC, supervisord) or a kernel privilege ring. Together they read as "a process supervisor that supervises an agent process." The actual domain is an LLM orchestrator: a top-level agent that routes user prompts to a set of registered sub-tools. The doc on the `Tool` field type mentions it is "Nested Supervisor Agent tool" (model.ts:245) for recursion, which reinforces that this is in fact a router. The Databricks docs (https://docs.databricks.com/en/generative-ai/agent-framework/index.html) call this style "AI agent" / "agent system" — but not "supervisor agent." The package would be far less ambiguous as `agentorchestrators`, `routeragents`, or `supervisoragents` with `SupervisorAgent` renamed to `RouterAgent` or `OrchestratorAgent`.
- **Category:** 1 (vague/generic — both nouns), 17 (no SDK-wide policy on `Agent` terminology).
- **Suggested name:** `RouterAgent` or `OrchestratorAgent` (then package `routeragents` / `agentorchestrators`). If the backend wire name `supervisor-agents` cannot change, keep the package name but document the routing semantics on the type-level JSDoc.
- **Rationale:** The first sentence of the package's only JSDoc-relevant type is "The resource name of the SupervisorAgent." That tautological doc is a tell — the team did not have a good one-line description for the type, which is exactly what a vague name produces. A self-describing name would seed an obvious one-liner ("A `RouterAgent` routes user prompts to a set of registered tools.").

### 2. `Tool` — bare generic name for a discriminated union over 14 resource kinds — `src/v1/model.ts:251`
- **Why weird:** The `Tool` type is the most generic name in any AI SDK. It does not say *which* tools, *whose* tools, or *how* the tool is invoked. The discriminated union has 14 variants spanning unrelated resource domains: vector search, dashboards, model-serving endpoints, UC functions, web search, etc. Compare to `customllms.Dataset` (audited as flagged for being a single-field wrapper — at least it had domain specificity); `Tool` here is genuinely a 14-kind tagged union that needs a name explaining what kind of tool. A reader importing `import {Tool} from '@databricks/sdk-supervisoragents/v1'` will see `Tool` as a top-level name in their module and be unable to guess whether it's a CLI tool, a build tool, a python tool, or a function-call tool. Other LLM-tool conventions: OpenAI calls them `function` (https://platform.openai.com/docs/guides/function-calling); Anthropic calls them `tool_use` (https://docs.anthropic.com/en/docs/build-with-claude/tool-use); LangChain calls them `Tool` (where the package context disambiguates).
- **Category:** 1 (vague/generic), 12 (duplicate of `SupervisorAgentTool`, which is one variant of `Tool`).
- **Suggested name:** `AgentTool`, `SupervisorTool`, or `RegisteredTool`. The qualifier disambiguates against generic `Tool` collisions in a multi-package import set.
- **Rationale:** Same reasoning as #1; specificity in type names prevents alias collisions and makes import lists self-documenting. The package already calls one tool kind `SupervisorAgentTool` (the recursion case), so the bare `Tool` lacks a parallel qualifier.

### 3. `Tool.toolType: string` — stringly-typed when it is a closed set of 14 — `src/v1/model.ts:259-260`
- **Why weird:** The JSDoc enumerates the allowed values: `"genie_space", "knowledge_assistant", "uc_function", "uc_connection", "app", "volume", "lakeview_dashboard", "serving_endpoint", "uc_table", "vector_search_index", "catalog", "schema", "supervisor_agent", "web_search"`. The type is `string`, so a caller writing `toolType: 'GENIE_SPACE'` (wrong case), `'genieSpace'` (camelCase), or `'web-search'` (kebab) gets no compiler help. The same struct *already* carries the discriminant in the `spec` discriminated union: `spec.$case` ranges over `'genieSpace' | 'knowledgeAssistant' | ...` — covering the exact same 14 kinds. So the SDK declares the type domain twice, in two incompatible casings (snake on `toolType`, camel on `spec.$case`). This is the same anti-pattern flagged in `knowledgeassistants.md` #10 (`sourceType: string` vs `spec.$case`).
- **Category:** 16 (field contradicts type domain — `string` for a closed set), 6 (misleading — two declarations of the same enum), 12 (duplicate of `spec.$case`), 17 (snake vs camel for the same enum).
- **Suggested name:** Either (a) convert `toolType` to a string-literal union `'genieSpace' | 'knowledgeAssistant' | ...` matching `spec.$case`, or (b) drop `toolType` entirely because `spec.$case` already encodes it (recommended).
- **Rationale:** Stringly-typed enums in TypeScript are a well-documented anti-pattern (https://google.github.io/styleguide/tsguide.html#enums-vs-string-literals). The duplicate declaration in two casings is a generator artifact from the proto definition and a tax on every consumer.

### 4. `Tool.toolType` casing disagrees with every other discriminator value on the wire — `src/v1/model.ts:259`
- **Why weird:** The 14 enumerated values inside the doc string are snake_case: `"genie_space"`, `"knowledge_assistant"`, `"lakeview_dashboard"`, `"serving_endpoint"`, `"uc_function"`, `"uc_connection"`, `"uc_table"`, `"vector_search_index"`, `"supervisor_agent"`, `"web_search"` (singletons `"app"`, `"volume"`, `"catalog"`, `"schema"` work in both). But the TypeScript `spec.$case` field uses camelCase variants of the same set: `'genieSpace'`, `'knowledgeAssistant'`, etc. The marshal/unmarshal pair around lines 765-865 keeps `toolType` as a *string* in both directions, so the wire format for `toolType` is snake_case — but the consumer must know to write `toolType: 'genie_space'` while paying attention to camelCase `spec.$case`. A TypeScript-only consumer who never reads JSDoc will think the values are camelCase to match `$case` and get HTTP 400 on the first request.
- **Category:** 17 (casing inconsistency within the same struct), 4 (snake_case in a string-literal value, even though the value is on the wire).
- **Suggested name:** If `toolType` survives (see #3), document inline that values are snake_case wire-side, or normalize to camelCase to match `spec.$case`.
- **Rationale:** The mismatch is exactly what causes the most painful bugs in generated SDKs — the type checker says it is fine, the runtime fails. A naming audit must call this out even though it is a *value* mismatch rather than an *identifier* mismatch.

### 5. `KnowledgeAssistant` package name collision — `src/v1/model.ts:127`
- **Why weird:** The package `@databricks/sdk-supervisoragents` exports a type `KnowledgeAssistant` that represents *one variant of a Tool.spec discriminated union*, not the actual knowledge assistant resource. The actual `KnowledgeAssistant` resource lives in `@databricks/sdk-knowledgeassistants/v1`. A consumer importing both packages will collide on the same identifier in TS source — and the supervisor-agents type only has two fields (`servingEndpointName`, `knowledgeAssistantId`) while the real one has 12+. This is the same problem as #1/#2 but at the cross-package level. Compare with `LakeviewDashboard`, `Catalog`, `Schema`, `UcTable`, `VectorSearchIndex` — every variant uses an unqualified bare name that collides with the canonical resource type elsewhere in the SDK.
- **Category:** 12 (duplicate concept across packages), 6 (misleading — same name, different shape).
- **Suggested name:** `KnowledgeAssistantToolSpec`, `KnowledgeAssistantRef`, or `ToolKnowledgeAssistant`. Apply the suffix uniformly to all 14 variants (`GenieSpaceRef`, `LakeviewDashboardRef`, etc.). This is the same pattern the same package *already uses* for one variant: `SupervisorAgentTool` (the nested case), which uniquely calls out that it is a tool wrapper, not the resource itself.
- **Rationale:** Cross-package name collisions are the worst kind of naming bug because the import path lies about the type's identity. A `Ref`/`ToolSpec` suffix on every variant solves this uniformly.

### 6. `SupervisorAgentTool` is the *only* variant with a name disambiguation — `src/v1/model.ts:246`
- **Why weird:** Of the 14 tool variants, exactly one uses the qualified naming convention: `SupervisorAgentTool` (the recursion case — a nested supervisor agent as a tool). Every other variant is bare: `GenieSpace`, `KnowledgeAssistant`, `UcFunction`, `LakeviewDashboard`, `App`, `Volume`, `ServingEndpoint`, `UcTable`, `VectorSearchIndex`, `UcConnection`, `Catalog`, `Schema`, `WebSearch`. The author of `SupervisorAgentTool` clearly recognized the collision problem (since `SupervisorAgent` is the top-level type in this very file) — but did not apply the same logic to the other 13 variants. This is inconsistency-by-omission.
- **Category:** 17 (inconsistency across sibling types), 8 (asymmetric suffix application).
- **Suggested name:** Either drop the `Tool` suffix from `SupervisorAgentTool` and find another way to disambiguate (probably not workable since it collides), or apply `*Tool` (or `*Ref`, `*ToolSpec`) to all 14 variants. See #5 for the recommended pattern.
- **Rationale:** When a generator picks one of two options for a single case, you can be sure the other 13 cases will look wrong.

### 7. `Tool.spec` discriminated union name is generic — `src/v1/model.ts:262`
- **Why weird:** `Tool.spec?: { $case: 'genieSpace'; genieSpace: GenieSpace } | ... | undefined`. The discriminator field is called `spec` — a generic CS term that does not convey *what kind* of specification this is. Same anti-pattern flagged in `knowledgeassistants.md` #12 (`KnowledgeSource.spec`). At a call site, `tool.spec.$case` is competing with the redundant `tool.toolType` (see #3) for "which kind of tool is this" semantics. Worse, `spec` is too short to autocomplete cleanly in many IDEs — and it collides with `Tool.toolType` JSDoc that calls the variants "tool types."
- **Category:** 1 (vague/generic), 12 (duplicate of `toolType` discriminant).
- **Suggested name:** `tool` (so `tool.tool.$case` — awkward) or `config` (matches the doc "Specification for the tool type") or `payload` or `kind` (a literal pun on the discriminant role). The cleanest fix is to flatten: drop `toolType` (per #3), rename `spec` → `tool`, and the type reads `agentTool.tool.$case`.
- **Rationale:** A discriminated union should self-describe via its tag, not via a generic wrapper field. `spec` is the kind of name that survives only because nobody on the review can think of anything better.

### 8. `name` field overloaded — every CRUD request and every entity — `src/v1/model.ts:30,45,59,67,76,88,108,116,124,146,196,224,254,330` — fourteen sites
- **Why weird:** Every request and entity uses bare `name` for the "full resource name" (`supervisor-agents/{id}` or `.../tools/{id}` or `.../examples/{id}`). Three different resource types share the same field name with three different formats — a consumer chaining operations across `SupervisorAgent`, `Tool`, and `Example` will have three `name`s in scope, all meaning different things. `DeleteToolRequest.name` and `DeleteSupervisorAgentRequest.name` have the same field name with disjoint URL contracts. Same problem documented in `knowledgeassistants.md` #7. Plus three sub-entity types (`Catalog`, `Schema`, `UcTable`, `Volume`, `UcFunction`, `UcConnection`, `App`, `ServingEndpoint`, `VectorSearchIndex`) each have a `name` field meaning "the wire identifier of the wrapped Databricks resource" — *not* a supervisor-agent resource name. So `tool.spec.catalog.name` and `tool.name` and `parent` (a resource path) are three different `name`-semantics in the same call site.
- **Category:** 1 (vague/generic), 15 (generic field name losing meaning), 19 (underspecified id).
- **Suggested name:** Type-qualify resource names: `supervisorAgentName` on `SupervisorAgent` and the supervisor-agent CRUD requests; `toolName` on `Tool` and tool requests; `exampleName` on `Example` and example requests. On the sub-resource types (`Catalog`, `Schema`, etc.), rename `name` → `fullName` (Unity Catalog convention) or `qualifiedName`. Alternatively follow AIP-122 (https://google.aip.dev/122) and keep `name` only on the type the request operates on; rename to `parent` when it identifies a parent (the package already does this for create/list — see #9).
- **Rationale:** This is the highest-frequency naming bug in the package — 14 sites use the same field name for at least four different semantic roles.

### 9. `parent` and `name` describe the same wire concept inconsistently — `src/v1/model.ts:30,45,59,76,108,146,196` vs `src/v1/model.ts:67,116,124`
- **Why weird:** `CreateExampleRequest.parent`, `CreateToolRequest.parent`, `DeleteExampleRequest.name`, `DeleteSupervisorAgentRequest.name`, `DeleteToolRequest.name`, `GetExampleRequest.name`, `GetSupervisorAgentRequest.name`, `GetToolRequest.name`, `ListExamplesRequest.parent`, `ListToolsRequest.parent` all reference resource paths under `/supervisor-agents/{id}`. The Create + List requests correctly use `parent` per AIP-132 (https://google.aip.dev/132). The Delete + Get requests use `name`. So far consistent with AIP. But: `CreateExampleRequest.parent` is the *supervisor-agent* path, while `CreateExampleRequest.example.name` is the *new example* path. Reading the type, both fields are `string` and the JSDoc explains which is which — but the field names are not self-documenting. Compare with the audit on `knowledgeassistants.md` #8 (same pattern, same finding).
- **Category:** 17 (parent vs name inconsistency for related wire concepts).
- **Suggested name:** Keep AIP-132 (`parent` on create/list, `name` on get/delete/update). Rename `parent` more specifically: `supervisorAgentName` on tool/example requests. The bigger fix is to use typed name strings (template-literal types) so `parent: ${SupervisorAgentName}` is checked at compile time.
- **Rationale:** Same as `knowledgeassistants` — AIP-132 is the right convention, but the bare names lose type discipline.

### 10. `SupervisorAgent.id` is deprecated but still in the public TS surface — `src/v1/model.ts:231-232`
- **Why weird:** `id?: string` carries the JSDoc "Deprecated: Use supervisor_agent_id instead." (mind the wire-format leaking into the doc — `supervisor_agent_id` is the snake_case version, but the actual TS field is `supervisorAgentId`). The field is *not* marked `@deprecated` for the IDE, so consumers using IntelliSense will not see the strikethrough. The same issue applies to `Tool.id` (model.ts:257-258, same wording "Deprecated: Use tool_id instead.") and `KnowledgeAssistant.servingEndpointName` (model.ts:128-129, "Deprecated: use knowledge_assistant_id instead.").
- **Category:** 6 (misleading — deprecation is documented but not annotated), 8 (redundant suffix: keeping deprecated `id` *and* `supervisorAgentId` causes name clutter), 14 (the doc references the snake_case wire name rather than the TS name).
- **Suggested name:** Add `@deprecated` JSDoc tag so IDEs render it; doc should reference `supervisorAgentId` (the TS name) not `supervisor_agent_id` (the wire name); long-term plan for removal. Same fix on `Tool.id` and `KnowledgeAssistant.servingEndpointName`.
- **Rationale:** Public-API deprecation has a standard JSDoc tag (https://jsdoc.app/tags-deprecated.html) that triggers IDE warnings. Free-text comment does not.

### 11. `KnowledgeAssistant.servingEndpointName` is a deprecated alias inside a variant type — `src/v1/model.ts:128-129`
- **Why weird:** The `KnowledgeAssistant` variant type (one of 14 tool kinds) has two fields:
  - `servingEndpointName?: string` — doc "Deprecated: use knowledge_assistant_id instead."
  - `knowledgeAssistantId?: string` — doc "The ID of the knowledge assistant."
  Both fields are optional. A consumer setting both gets an ambiguous wire payload (the backend has to pick one). Plus, the field name `servingEndpointName` does not even *imply* "knowledge assistant" — it implies a model-serving endpoint. The naming of the deprecation target is also misleading: a knowledge assistant *id* is not necessarily the same wire value as a serving-endpoint *name*. The doc-comment claim that one replaces the other is suspect.
- **Category:** 6 (misleading — name and replacement don't obviously equate), 16 (field name from wrong domain — "serving endpoint" applies to a different resource).
- **Suggested name:** Apply `@deprecated`; consider dropping the field entirely if `knowledgeAssistantId` fully supplants it. Document the migration mapping precisely.
- **Rationale:** This is a deprecation transition mid-flight; the public TS surface should signal it correctly.

### 12. `SupervisorAgentTool.supervisorAgentId` doc says "tile ID" — `src/v1/model.ts:247-248`
- **Why weird:** Doc reads "The ID of the supervisor agent (tile ID)." The parenthetical "(tile ID)" refers to "tile" — a UI concept from Databricks Lakeview dashboards. A *Supervisor Agent* tool variant should not reference a dashboard concept. This appears to be a copy-paste from the dashboard tool spec (cf. `LakeviewDashboard.dashboardId`, model.ts:136). Same kind of doc-bug as flagged in `customllms.md` #5.
- **Category:** 6 (misleading — doc contradicts domain).
- **Suggested name:** Field name `supervisorAgentId` is fine; fix the JSDoc to drop "(tile ID)" and explain that this is the recursive reference to a child supervisor agent.
- **Rationale:** Doc-text bugs on identifiers are within scope of a naming audit; consumers learn semantics from JSDoc.

### 13. `Catalog` / `Schema` collide with built-in TS and broader Databricks concepts — `src/v1/model.ts:19,210`
- **Why weird:** Two unqualified types `Catalog` and `Schema` represent UC catalog/schema *asset-search scopes* (a permissions concept), not the actual `catalog.CatalogInfo` / `catalog.SchemaInfo` resources from `@databricks/sdk-catalog`. The names are extremely overloaded: `Schema` is also a generic CS term (and shadows Zod's `z.ZodType`-related schema metadata), `Catalog` is a UC primary resource. A consumer importing this package + `catalog` will have to alias one of them. Same family of problem as #5 (cross-package collision).
- **Category:** 12 (duplicate concept across packages), 10 (reserved-word-ish; `Schema` is a near-reserved JS identifier in many libraries), 1 (vague).
- **Suggested name:** `CatalogAssetSearchScope` / `SchemaAssetSearchScope` (verbose but accurate), or `CatalogToolSpec` / `SchemaToolSpec` for the *Ref* convention from #5.
- **Rationale:** The current names lie about the type's identity. They look like the canonical UC resources but represent a permissions scope.

## Medium severity

### 14. `SupervisorAgent.endpointName` is the agent's serving endpoint, not user-supplied — `src/v1/model.ts:239-240`
- **Why weird:** Doc reads "The name of the supervisor agent's serving endpoint." This is a server-populated read-only field (the supervisor-agents backend creates a model-serving endpoint behind the scenes). The name `endpointName` does not tell the reader which kind of endpoint (model serving? vector search? SQL warehouse?). Same problem flagged in `knowledgeassistants.md` #21 and `customllms.md` #7.
- **Category:** 1 (vague), 19 (underspecified id).
- **Suggested name:** `servingEndpointName` (matches Databricks model-serving terminology) or `agentServingEndpointName`. The variant type `KnowledgeAssistant` in this same file already uses `servingEndpointName` (model.ts:129) — so renaming here would *align* the two fields.
- **Rationale:** Cross-package and within-package alignment; `servingEndpointName` is the canonical term.

### 15. `SupervisorAgent.experimentId` — what kind of experiment? — `src/v1/model.ts:241-242`
- **Why weird:** Doc reads "The MLflow experiment ID." A bare `experimentId` is fine *if* the consumer knows the SDK only integrates with MLflow. But the consumer reading `SupervisorAgent.experimentId` could reasonably guess this is an A/B-test experiment, a feature-flag experiment, or a generic experiment. Same problem flagged in `knowledgeassistants.md` #22 — and there the audit suggested `mlflowExperimentId`.
- **Category:** 1 (vague), 19 (underspecified id), 17 (inconsistency with sibling SDK).
- **Suggested name:** `mlflowExperimentId`.
- **Rationale:** Cross-package consistency. The doc clarifies but the name does not.

### 16. `SupervisorAgent.creator: string` — what is a creator? — `src/v1/model.ts:235-236`
- **Why weird:** Doc reads "The creator of the Supervisor Agent." Could be a username, email, UUID, Databricks principal id, or service-principal client id. The type is `string`. Same field, same problem flagged in `knowledgeassistants.md` #24 and `customllms.md` #10.
- **Category:** 1 (vague), 19 (underspecified id), 17 (SDK-wide inconsistency).
- **Suggested name:** `createdBy` (AIP-148 standard, https://google.aip.dev/148, also matches `unitycatalog`).
- **Rationale:** Match the most-used convention. Same recommendation as in three sibling audits.

### 17. `SupervisorAgent.createTime: Temporal.Instant` — `src/v1/model.ts:237-238`
- **Why weird:** `Temporal.Instant` is correct (good!) but the field name `createTime` follows AIP-142 (https://google.aip.dev/142). Compare with `customllms.CustomLlm.creationTime: Temporal.Instant` (audited as inconsistent) — the supervisor-agents package uses the AIP form, the customllms package does not. This is positive consistency on supervisor-agents and negative on customllms. Flagging here because the audit covers SDK-wide consistency.
- **Category:** Observation / 17 (cross-package inconsistency).
- **Suggested name:** Keep `createTime`; flag `customllms` to align.
- **Rationale:** Note positive precedent; pair with the audit on `customllms` to align it.

### 18. `SupervisorAgent.displayName` doc claims uniqueness — `src/v1/model.ts:225-226`
- **Why weird:** Doc reads "The display name of the Supervisor Agent, unique at workspace level." Display names being unique at workspace level is a *semantic* claim — it might be enforced by the backend (with a 409 response on collision) or it might just be a soft convention. The type signature (`string`) gives no hint. AIP-122 reserves `displayName` for human-readable names that are explicitly *not* unique (https://google.aip.dev/122); a unique name is usually `name` or `id`. So this field is doing double duty: it is human-readable *and* uniquely identifying. Either rename or split.
- **Category:** 6 (misleading — `displayName` implies non-unique).
- **Suggested name:** If the uniqueness is enforced: rename to `key` or `humanReadableId` to communicate the uniqueness contract. If it is convention only: keep the name but soften the JSDoc.
- **Rationale:** A field whose contract contradicts its conventional meaning is a footgun.

### 19. `SupervisorAgent.description` "user-facing" annotation — `src/v1/model.ts:227-228`
- **Why weird:** Doc reads "Description of what this agent can do (user-facing)." The parenthetical "(user-facing)" is unusual — every other `description` field in the Databricks SDK is implicitly user-facing. Same observation flagged in `knowledgeassistants.md` #42. The same parenthetical appears on `Tool.description` (model.ts:298-299).
- **Category:** Observation / 17 (inconsistent JSDoc style across SDK).
- **Suggested name:** Drop "(user-facing)" from the two sites; flag for cross-package style review.
- **Rationale:** Minor; cosmetic but worth aligning.

### 20. `SupervisorAgent.instructions` vs `Example.guidelines` — same overlap as flagged in `customllms.md` and `knowledgeassistants.md` — `src/v1/model.ts:229-230,91-92`
- **Why weird:** `SupervisorAgent.instructions: string` (single, global) and `Example.guidelines: string[]` (array, per-example) follow the exact same naming doublet as `customllms.CustomLlm.instructions`/`guidelines` and `knowledgeassistants.KnowledgeAssistant.instructions`/`Example.guidelines`. Three packages, three near-identical confusing field-name pairs. The naming pattern is now SDK-wide.
- **Category:** 6 (misleading), 12 (duplicate concept across SDK), 15 (generic field name).
- **Suggested name:** Rename `SupervisorAgent.instructions` → `systemPrompt` or `globalInstructions`; rename `Example.guidelines` → `answerGuidelines` or `responseRules`. Apply uniformly across all three packages.
- **Rationale:** Three packages flagged independently for the same pattern. SDK-wide cleanup opportunity.

### 21. `Tool.description` "user-facing" repeated annotation — `src/v1/model.ts:298-299`
- **Why weird:** Same as #19; the `Tool.description` has the same "(user-facing)" parenthetical. The doc reads "Description of what this tool does (user-facing)." If the audit prompt cares about consistency, both descriptions should match.
- **Category:** Observation / 17.
- **Suggested name:** Same as #19.

### 22. `Tool.toolId` is "user-specified ID" while wire name is camelCased — `src/v1/model.ts:300-301`
- **Why weird:** Doc reads "User specified id of the Tool." Comparing with `CreateToolRequest.toolId` (model.ts:48-51, "The ID to use for the tool, which will become the final component of the tool's resource name."), the two `toolId` fields are *the same wire concept* — but on `Tool` it is the persisted id, while on `CreateToolRequest` it is the request-time supplied id. The same field name is doing two semantic jobs depending on context. Plus, comparing with `Example.exampleId` (model.ts:93-94, "The universally unique identifier (UUID) of the example."), the format claim differs: `Tool.toolId` is *user-specified*, `Example.exampleId` is a *UUID*. The two id formats are not aligned across sibling types in the same package.
- **Category:** 17 (inconsistency across sibling types), 6 (misleading — different format claims).
- **Suggested name:** Keep `toolId` and `exampleId` but expand the JSDoc on each to disambiguate the id-format contract. Or rename `Tool.toolId` → `toolKey` to mirror that it is a user-supplied identifier (as opposed to a server-generated UUID).
- **Rationale:** A naming audit must flag fields whose format contract is silent in the type signature.

### 23. `SupervisorAgent.supervisorAgentId` vs `SupervisorAgent.id` (deprecated) — both UUIDs — `src/v1/model.ts:231-234`
- **Why weird:** Two id fields on `SupervisorAgent`: the deprecated `id` and the canonical `supervisorAgentId`. Both are `string`, both UUIDs per the doc on line 233 ("The universally unique identifier (UUID) of the Supervisor Agent."). The deprecation is in JSDoc only (no `@deprecated` tag — see #10). Same situation on `Tool.id` vs `Tool.toolId` (model.ts:257-258, 300-301). Carrying the deprecated alias on the type forces consumers to handle both; the SDK should pick one.
- **Category:** 8 (redundant alias suffix), 12 (duplicate concept within the same type).
- **Suggested name:** Mark `id` `@deprecated`; document that `supervisorAgentId` is canonical. Future major version removes `id` entirely.
- **Rationale:** Carrying a deprecated alias on a TS type is a tax on every reader. Mark it loudly.

### 24. `SupervisorAgent.supervisorAgentId` type-suffix tautology — `src/v1/model.ts:233-234`
- **Why weird:** `SupervisorAgent.supervisorAgentId` repeats `SupervisorAgent` in the type name and field. The pattern is correct AIP-style (every entity has `*Id` matching its type) but extremely verbose. Once `SupervisorAgent` is renamed to `RouterAgent` (per #1), the field becomes `routerAgentId` — slightly shorter, still type-tautological.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** Keep current (tradeoff with cross-type disambiguation), but document the convention in `typescript.mdc`.
- **Rationale:** This is a convention question, not a bug. The verbose form *does* disambiguate from `Tool.toolId` and `Example.exampleId` when passed to a generic function. Flagged for awareness.

### 25. `Example.exampleId` type-suffix tautology — `src/v1/model.ts:93-94`
- **Why weird:** Same shape as #24, but the field is `exampleId` and the type is `Example`. The redundancy is identical. Note: every sibling SDK package follows the same convention (`knowledgeassistants.Example.exampleId` is the same pattern).
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** Keep current; document the convention.

### 26. `Tool.toolId` type-suffix tautology — `src/v1/model.ts:300-301`
- **Why weird:** Same pattern as #24, #25.
- **Category:** 20.
- **Suggested name:** Keep current; document the convention.

### 27. `CreateToolRequest.toolId` separately on the request — `src/v1/model.ts:48-51`
- **Why weird:** The create request takes both `tool: Tool` (the body) *and* `toolId: string` (the URL/query param). The wire form is `POST /supervisor-agents/{id}/tools?tool_id={user-supplied}`. So `req.toolId` flows into the query string and `req.tool.toolId` is *not used* on creation — but TypeScript does not enforce this. A consumer who writes `{tool: {toolId: 'foo'}}` and leaves `req.toolId` undefined gets unexpected behavior. The two-fields-for-one-concept pattern is also documented in `customllms.md` #20.
- **Category:** 12 (duplicate concept on the same request), 6 (misleading — `tool.toolId` looks usable on creation but isn't), 17.
- **Suggested name:** Either remove `tool.toolId` from the body shape (TypeScript can enforce this via a discriminated `Omit<Tool, 'toolId'>` type for create), or document the precedence rule on the JSDoc.
- **Rationale:** Generated request types with duplicate fields are a well-known footgun.

### 28. `unmarshal*Schema` and `marshal*Schema` `Schema` suffix — `src/v1/model.ts:378,386,394,408,416,427,435,446,459,469,477,485,514,523,612,620,628,636,646,654,656,664,672,686,694,704,712,720,728,757,765,867,875,883,891,901,909`
- **Why weird:** All marshal/unmarshal Zod schemas suffix `*Schema`. Same pattern documented in `knowledgeassistants.md` #28: every export reads `unmarshalXSchema`, which is 20+ characters of pure suffix. SDK-wide convention; flagging for cross-cutting review rather than local fix. Total of ~37 marshal/unmarshal sites in this file.
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `unmarshalSupervisorAgent` (Zod schemas are obviously schemas; the suffix is type-system redundancy). Flagged for SDK-wide convention review.
- **Rationale:** Cross-package convention; no local fix.

### 29. `*FieldMaskSchema` private constants and `*FieldMask` public builder — `src/v1/model.ts:911-1042`
- **Why weird:** Two parallel naming families:
  - Private (file-scope) constants: `appFieldMaskSchema`, `catalogFieldMaskSchema`, `exampleFieldMaskSchema`, `genieSpaceFieldMaskSchema`, `knowledgeAssistantFieldMaskSchema`, `lakeviewDashboardFieldMaskSchema`, `schemaFieldMaskSchema`, `servingEndpointFieldMaskSchema`, `supervisorAgentFieldMaskSchema`, `supervisorAgentToolFieldMaskSchema`, `toolFieldMaskSchema`, `ucConnectionFieldMaskSchema`, `ucFunctionFieldMaskSchema`, `ucTableFieldMaskSchema`, `vectorSearchIndexFieldMaskSchema`, `volumeFieldMaskSchema`, `webSearchFieldMaskSchema`.
  - Public builders: `exampleFieldMask`, `supervisorAgentFieldMask`, `toolFieldMask`.
  Only three types get a builder (`Example`, `SupervisorAgent`, `Tool`) — the others are private. But the convention puts `Schema` as the suffix on the constants and bare on the builder, which is the opposite of the `unmarshalXSchema` convention. Also: every field-mask constant exists *whether or not* the type is exposed via a builder — so for tool spec variants the field-mask schema is dead weight.
- **Category:** 7 (verbose), 8 (suffix), 17.
- **Suggested name:** Drop the `Schema` suffix from the private constants (`appFieldMask`, `catalogFieldMask`, etc., with the builders renamed to `buildAppFieldMask`, `buildToolFieldMask`).
- **Rationale:** Cross-package convention; no local fix.

### 30. `listExamplesIter`/`listSupervisorAgentsIter`/`listToolsIter` — `Iter` suffix Go-style — `src/v1/client.ts:342,396,447`
- **Why weird:** The `Iter` suffix on async iterators is a direct port from Go's `*Iter` convention, same as `knowledgeassistants.md` #29 and applies SDK-wide. The audit prompt's rule 14 (Go/Java-style names) calls this out.
- **Category:** 14 (Go-style name), 8 (redundant suffix — return type already says it's an iterator).
- **Suggested name:** Drop the suffix and make auto-paging the default (`listExamples` returns an `AsyncIterable<Example>`, and a separate `listExamplesPage` returns one page). Or swap the names: `listExamples` (current paged) becomes `listExamplesPage`, and `listExamplesIter` becomes `listExamples`.
- **Rationale:** Modern TypeScript convention is that the default form is auto-paging; the suffix is a Go/Java carryover.

### 31. `Client` class name — bare, no scoping — `src/v1/client.ts:61`
- **Why weird:** The class is named `Client`. After `import {Client} from '@databricks/sdk-supervisoragents/v1'`, the type is unambiguous in isolation — but consumers importing multiple packages routinely write `import {Client as SAClient} from '@databricks/sdk-supervisoragents/v1'`. Same SDK-wide issue flagged in `knowledgeassistants.md` #30.
- **Category:** 1 (vague), 17 (SDK-wide inconsistency).
- **Suggested name:** `SupervisorAgentsClient` (matches the Go SDK's `WorkspaceClient.SupervisorAgents` and AWS SDK's `S3Client`, `IAMClient` pattern).
- **Rationale:** Bare `Client` is convenient until you import two SDK packages; then it's a tax.

## Low severity

### 32. `Volume`/`UcFunction`/`UcConnection`/`UcTable` — `Uc` prefix on some, bare on others — `src/v1/model.ts:304,308,318,364`
- **Why weird:** Of the variant types, four are Unity Catalog resources: `Volume`, `UcFunction`, `UcConnection`, `UcTable`. The `Uc` prefix is applied to three but not to `Volume` — even though a Databricks volume is *always* a UC volume. The `Uc` prefix is also inconsistent acronym casing: `Uc` (title-case) instead of `UC` (all-caps), and the Google TypeScript style guide could go either way (https://google.github.io/styleguide/tsguide.html#identifiers). Same acronym-casing question as flagged in `customllms.md` #1 (`Llm` vs `LLM`).
- **Category:** 3 (acronym casing — `Uc` vs `UC`), 17 (inconsistent prefix application — `Volume` should be `UcVolume`).
- **Suggested name:** Either drop the `Uc` prefix everywhere (the package context makes it clear) or apply it uniformly: `UcVolume`, `UcFunction`, `UcConnection`, `UcTable` (with the acronym-casing question decided once SDK-wide).
- **Rationale:** Consistency wins; the audit prompt rule 3 (acronym casing) and rule 17 (consistent action verbs / family naming) both flag this.

### 33. `LakeviewDashboard` — product name leaks into type name — `src/v1/model.ts:135`
- **Why weird:** "Lakeview" is the marketing name for Databricks SQL dashboards (https://docs.databricks.com/en/dashboards/index.html). The type name carries the product name. If the product is renamed (as has happened — "Lakeview" has been deprecated in some Databricks branding in favor of "Dashboards"), the SDK will be stuck with the old name. Cross-package: the dashboards SDK at `packages/dashboards/` uses `LakeviewDashboard` too — so the SDK is consistent, but the question is whether the canonical name should propagate.
- **Category:** Observation / 6 (potentially misleading if product is rebranded).
- **Suggested name:** Keep `LakeviewDashboard` (the wire name is fixed) but document the marketing-name origin.
- **Rationale:** Naming audits should flag product-name leakage even if there's no fix.

### 34. `Catalog`, `Schema`, `UcTable` fields all named `name` but doc differently — `src/v1/model.ts:21,212,321`
- **Why weird:** Three variant types with a single `name` field carrying three subtly different format claims:
  - `Catalog.name`: "Bare UC catalog name this tool is authorized to search (no `.`)." — one component.
  - `Schema.name`: "Full UC schema name (catalog.schema) this tool is authorized to search." — two components.
  - `UcTable.name`: "Full UC table name (catalog.schema.table) this tool is authorized to access." — three components.
  Three sibling types use the same field name `name` to mean three different cardinalities (1-, 2-, 3-part UC names). A consumer scripting "set the tool name from a user input" gets no compiler help.
- **Category:** 15 (generic field name losing meaning), 6 (misleading — same name, different format), 17.
- **Suggested name:** Differentiate: `Catalog.catalogName` (one part), `Schema.schemaFullName` (two parts), `UcTable.tableFullName` (three parts). Or use AIP-style `fullName` on each but document the cardinality explicitly.
- **Rationale:** Three types with the same field name representing different formats is exactly the kind of inconsistency that bites at code-review time.

### 35. `VectorSearchIndex.columns` semantic ambiguity — `src/v1/model.ts:357-361`
- **Why weird:** Doc reads "Optional columns to return from the index. If unset, discovered from index schema at query time." So `columns` is a list of column names to *project* in the response — but the field name does not communicate "to return" vs "to filter on" vs "to embed." A consumer scanning the type sees `columns?: string[]` and reasonably wonders whether these are the *output* columns or the *input* columns to vectorize. The doc is the only disambiguator.
- **Category:** 1 (vague), 6 (misleading — name does not encode return-vs-filter direction).
- **Suggested name:** `returnedColumns` or `outputColumns` (or `projection`, a SQL term).
- **Rationale:** The doc gives the contract; the field name should too.

### 36. `parseResponse` / `marshalRequest` asymmetric verbs — `src/v1/utils.ts:113,119`
- **Why weird:** Same as `customllms.md` #22 and `knowledgeassistants.md` #33: `parseResponse` and `marshalRequest` use two different verbs for inverse operations. The model file uses `unmarshal*Schema` / `marshal*Schema` consistently, but `utils.ts` breaks the pattern with `parse`.
- **Category:** 17 (inconsistent action verbs).
- **Suggested name:** `unmarshalResponse` / `marshalRequest` for symmetry.
- **Rationale:** Pair-wise consistency aids reading.

### 37. `executeCall` / `executeHttpCall` differ in name by `Http` only — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions with nearly identical names handling different layers — same anti-pattern as `customllms.md` #21 and `knowledgeassistants.md` #34. Each generated package carries the same pair.
- **Category:** 1 (vague), 17 (inconsistency).
- **Suggested name:** `runWithCallOptions` / `sendHttp` or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should differ in more than one infix.

### 38. `HttpCallOptions` reuses `Options` — `src/v1/utils.ts:15`
- **Why weird:** Same as `customllms.md` #23 and `knowledgeassistants.md` #35: `ClientOptions`, `CallOptions`, and `HttpCallOptions` all live in scope simultaneously. Three things named `Options`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` or `HttpCallParams`.
- **Rationale:** Distinguish internal context bags from user-facing options.

### 39. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Same as `customllms.md` #28 and `knowledgeassistants.md` #36: exported but not used by `client.ts`. Generator-mechanical surface area.
- **Category:** Observation / (unused export).
- **Suggested name:** Either remove the export or document why it ships per-package.
- **Rationale:** Generated artifact; flag for cross-package cleanup.

### 40. `readAll` helper generic name — `src/v1/utils.ts:40`
- **Why weird:** Same as `customllms.md` #29 and `knowledgeassistants.md` #37: helper reads an entire response body stream; name is generic.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` or `readStreamToEnd`.
- **Rationale:** Internal helper, low cost. Skip if generated.

### 41. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:56`
- **Why weird:** Same as `customllms.md` #24 and `knowledgeassistants.md` #38: `Segment` is a generic CS term.
- **Category:** 1 (vague).
- **Suggested name:** `USER_AGENT_PACKAGE` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** SDK-wide consistency review.

### 42. `resp` local variable in every method — `src/v1/client.ts:93,122,154,242,267,289,323,374,428,477,521,562`
- **Why weird:** Same as `customllms.md` #33 and `knowledgeassistants.md` #39: `resp` is the response. 12 methods repeat the same pattern.
- **Category:** 12 (duplicate pattern).
- **Suggested name:** Refactor away the pattern, not the name.
- **Rationale:** Refactor opportunity surfaced by audit.

## Observations

### 43. `pageReq` local in iterator methods — `src/v1/client.ts:346,400,451`
- **Why weird:** Same as `knowledgeassistants.md` #40: three async generator methods declare `const pageReq: ... = {...req};`. Reuses the abbreviation `Req` while elsewhere in the file the parameter is named `req`.
- **Category:** 5 (abbreviation).
- **Suggested name:** `pageRequest` or `nextPageReq`.

### 44. `tool.spec` field-mask handling — discriminated union flattened — `src/v1/model.ts:977-1015`
- **Why weird:** `toolFieldMaskSchema` carries top-level entries for each variant of the `spec` union — `app`, `catalog`, `genieSpace`, `knowledgeAssistant`, `lakeviewDashboard`, `schema`, `servingEndpoint`, `supervisorAgent`, `ucConnection`, `ucFunction`, `ucTable`, `vectorSearchIndex`, `volume`, `webSearch`. The field-mask schema flattens the union variants to top-level field-mask paths (AIP-161, https://google.aip.dev/161 behavior) but does not include a `spec` path. A consumer writing `toolFieldMask('spec.genieSpace')` will get an invalid mask. Same pattern flagged in `knowledgeassistants.md` #41.
- **Category:** 17 (inconsistency between TS shape and field-mask schema).
- **Suggested name:** No rename; document on the JSDoc.

### 45. The 14 tool kinds + 1 nested = effectively 15 kinds — `src/v1/model.ts:262-297`
- **Why weird:** The doc on `Tool.toolType` (model.ts:259) lists 14 kinds, but the discriminated union on `Tool.spec` (model.ts:262-297) also has 14 cases. Counting carefully: `genieSpace`, `knowledgeAssistant`, `ucFunction`, `app`, `volume`, `lakeviewDashboard`, `servingEndpoint`, `ucTable`, `vectorSearchIndex`, `ucConnection`, `catalog`, `schema`, `supervisorAgent`, `webSearch` — that is 14, and matches the doc. So the count is correct; flagged here as a *positive* observation.

### 46. `unmarshalToolSchema` deep ternary chain — `src/v1/model.ts:557-607`
- **Why weird:** The unmarshal logic for `Tool.spec` is a 50-line nested ternary picking which variant case applies. Not a naming issue; flagging because the readability of generated code at this depth is hostile.
- **Category:** Observation.

### 47. `marshalToolSchema` discriminated union explicit `$case` literals — `src/v1/model.ts:765-828`
- **Why weird:** The marshal-side Zod schema enumerates each `$case` as a string literal in `z.discriminatedUnion('$case', [...])`. The 14 explicit `z.literal('genieSpace')` etc. lines duplicate the data already in the unmarshal-side ternary chain. Not a naming bug; flagging for codegen review.
- **Category:** Observation.

### 48. Action verbs in `Client` are consistent — `src/v1/client.ts`
- **Why weird:** The client uses `create`/`delete`/`get`/`list`/`update` — no `fetch`/`retrieve`/`read`/`remove`. This is good. Flagging as a *positive* observation.
- **Category:** 17 (reversed — consistency note).

### 49. Method-name verb conventions match resource targets — `src/v1/client.ts:87,113,142,180,199,218,237,262,287,309,360,414,465,506,550`
- **Why weird:** Methods are uniformly `verb` + `Subject` (createExample, createSupervisorAgent, createTool, deleteExample, deleteSupervisorAgent, deleteTool, getExample, getSupervisorAgent, getTool, listExamples, listSupervisorAgents, listTools, updateExample, updateSupervisorAgent, updateTool). 15 methods, 5 verbs × 3 subjects, no exceptions. Strong positive observation.
- **Category:** 17 (positive observation).

## Domain glossary
- `supervisor agent` — the LLM router resource that orchestrates calls to tools (sub-agents). The package name and primary resource. Per the audit's prompt: `Supervisor + Agent` together describe "a top-level routing agent that delegates user requests to specialized child tools." Each agent has a serving endpoint and an MLflow experiment.
- `tool` — a typed reference to another Databricks resource (or a built-in capability like web search) that the supervisor agent can invoke. 14 kinds via `Tool.spec` discriminated union.
- `example` — a question + guidelines pair that steers the agent's response on similar questions. Sub-resource of a supervisor agent.
- `uc` — Unity Catalog. Used as a prefix for four variant types (`UcFunction`, `UcConnection`, `UcTable`) and referenced in doc strings for `Catalog`, `Schema`, `Volume`, `VectorSearchIndex`.
- `genie` — Databricks Genie, the AI-driven analytics product. `GenieSpace` is the container resource.
- `lakeview` — the historical name for Databricks SQL Dashboards. `LakeviewDashboard` carries the product name.
- `asset_search` — a UC permission scope (per `Catalog` / `Schema` doc strings): a search capability over catalogs/schemas.
- `mcp` — Model Context Protocol (referenced in `App` doc "Supported app: custom mcp, custom agent."). MCP servers can be deployed as Databricks Apps.

## File coverage
- `src/v1/model.ts` (1043 lines): read fully.
- `src/v1/client.ts` (587 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (44 lines): read fully.
