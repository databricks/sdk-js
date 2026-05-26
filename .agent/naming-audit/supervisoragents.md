# Naming Audit: supervisoragents

**Path:** `packages/supervisoragents/src/v1/`
**Versions audited:** v1
**Inferred domain:** "Supervisor Agent" is an orchestrator resource that
routes user questions to one or more child tools (genie spaces, knowledge
assistants, UC functions, UC connections, apps, volumes). CRUD on three
resource types: `SupervisorAgent` (top-level), `Tool` (child of
`SupervisorAgent`, discriminated union over 6 tool kinds), and `Example`
(child of `SupervisorAgent`, question + guidelines pair used for
in-context steering). Every list endpoint paginates via
`pageSize`/`pageToken`. No state enums exist in this package; the entire
surface is data plus references to other Databricks resources.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 4 |
| Low | 1 |
| Observation | 3 |

## High severity

### 1. `SupervisorAgent` — `Supervisor` and `Agent` are both extremely generic — `src/v1/model.ts:193`
- **Why weird:** The package name + entity name combines two of the most overloaded nouns in the AI space. `Agent` alone could mean anything from "browser user-agent" to "autonomous LLM agent" to "service-account principal." `Supervisor` is even worse — in computing it usually refers to a process supervisor (systemd, OpenRC, supervisord) or a kernel privilege ring. Together they read as "a process supervisor that supervises an agent process." The actual domain is an LLM orchestrator: a top-level agent that routes user prompts to a set of registered sub-tools. The Databricks docs (https://docs.databricks.com/en/generative-ai/agent-framework/index.html) call this style "AI agent" / "agent system" — but not "supervisor agent." The package would be far less ambiguous as `agentorchestrators`, `routeragents`, or `supervisoragents` with `SupervisorAgent` renamed to `RouterAgent` or `OrchestratorAgent`.
- **Category:** 1 (vague/generic — both nouns), 17 (no SDK-wide policy on `Agent` terminology).
- **Suggested name:** `RouterAgent` or `OrchestratorAgent` (then package `routeragents` / `agentorchestrators`). If the backend wire name `supervisor-agents` cannot change, keep the package name but document the routing semantics on the type-level JSDoc.
- **Rationale:** The first sentence of the package's only JSDoc-relevant type is "The resource name of the SupervisorAgent." That tautological doc is a tell — the team did not have a good one-line description for the type, which is exactly what a vague name produces. A self-describing name would seed an obvious one-liner ("A `RouterAgent` routes user prompts to a set of registered tools.").

### 2. `Tool` — bare generic name for a discriminated union over 6 resource kinds — `src/v1/model.ts:219`
- **Why weird:** The `Tool` type is the most generic name in any AI SDK. It does not say *which* tools, *whose* tools, or *how* the tool is invoked. The discriminated union has 6 variants spanning unrelated resource domains: genie spaces, knowledge assistants, UC functions, UC connections, apps, and volumes. A reader importing `import {Tool} from '@databricks/sdk-supervisoragents/v1'` will see `Tool` as a top-level name in their module and be unable to guess whether it's a CLI tool, a build tool, a python tool, or a function-call tool. Other LLM-tool conventions: OpenAI calls them `function` (https://platform.openai.com/docs/guides/function-calling); Anthropic calls them `tool_use` (https://docs.anthropic.com/en/docs/build-with-claude/tool-use); LangChain calls them `Tool` (where the package context disambiguates).
- **Category:** 1 (vague/generic).
- **Suggested name:** `AgentTool`, `SupervisorTool`, or `RegisteredTool`. The qualifier disambiguates against generic `Tool` collisions in a multi-package import set.
- **Rationale:** Same reasoning as #1; specificity in type names prevents alias collisions and makes import lists self-documenting.

### 3. `Tool.toolType: string` — stringly-typed when it is a closed set — `src/v1/model.ts:227-228`
- **Why weird:** The JSDoc enumerates the allowed values: `"genie_space", "knowledge_assistant", "uc_function", "uc_connection", "app", "volume", "dashboard", "serving_endpoint", "table", "vector_search_index", "catalog", "schema", "supervisor_agent", "web_search"`. The type is `string`, so a caller writing `toolType: 'GENIE_SPACE'` (wrong case), `'genieSpace'` (camelCase), or `'web-search'` (kebab) gets no compiler help. The same struct *already* carries the discriminant in the `spec` discriminated union: `spec.$case` ranges over `'genieSpace' | 'knowledgeAssistant' | ...`. So the SDK declares the type domain twice, in two incompatible casings (snake on `toolType`, camel on `spec.$case`). Worse: the `toolType` enumeration in the doc includes 14 values while the `spec` discriminated union only covers 6 — the two declarations are not even aligned in cardinality.
- **Category:** 16 (field contradicts type domain — `string` for a closed set), 6 (misleading — two declarations of the same enum), 12 (duplicate of `spec.$case`), 17 (snake vs camel for the same enum).
- **Suggested name:** Either (a) convert `toolType` to a string-literal union matching the enumerated wire values, or (b) drop `toolType` entirely because `spec.$case` already encodes the variants the SDK supports (recommended).
- **Rationale:** Stringly-typed enums in TypeScript are a well-documented anti-pattern (https://google.github.io/styleguide/tsguide.html#enums-vs-string-literals). The duplicate declaration in two casings is a generator artifact from the proto definition and a tax on every consumer.

### 4. `KnowledgeAssistant` package name collision — `src/v1/model.ts:120`
- **Why weird:** The package `@databricks/sdk-supervisoragents` exports a type `KnowledgeAssistant` that represents *one variant of a Tool.spec discriminated union*, not the actual knowledge assistant resource. The actual `KnowledgeAssistant` resource lives in `@databricks/sdk-knowledgeassistants/v1`. A consumer importing both packages will collide on the same identifier in TS source — and the supervisor-agents type only has two fields (`servingEndpointName`, `knowledgeAssistantId`) while the real one has 12+. This is the same problem as #1/#2 but at the cross-package level. The same applies to `GenieSpace` (a single deprecated `id` field) vs the canonical Genie space resource elsewhere in the SDK.
- **Category:** 12 (duplicate concept across packages), 6 (misleading — same name, different shape).
- **Suggested name:** `KnowledgeAssistantToolSpec`, `KnowledgeAssistantRef`, or `ToolKnowledgeAssistant`. Apply the suffix uniformly to all 6 variants (`GenieSpaceRef`, `UcFunctionRef`, etc.).
- **Rationale:** Cross-package name collisions are the worst kind of naming bug because the import path lies about the type's identity. A `Ref`/`ToolSpec` suffix on every variant solves this uniformly.

### 5. `KnowledgeAssistant.servingEndpointName` is a deprecated alias inside a variant type — `src/v1/model.ts:121-122`
- **Why weird:** The `KnowledgeAssistant` variant type (one of 6 tool kinds) has two fields:
  - `servingEndpointName?: string` — doc "Deprecated: use knowledge_assistant_id instead."
  - `knowledgeAssistantId?: string` — doc "The ID of the knowledge assistant."
  Both fields are optional. A consumer setting both gets an ambiguous wire payload (the backend has to pick one). Plus, the field name `servingEndpointName` does not even *imply* "knowledge assistant" — it implies a model-serving endpoint. The naming of the deprecation target is also misleading: a knowledge assistant *id* is not necessarily the same wire value as a serving-endpoint *name*. The doc-comment claim that one replaces the other is suspect.
- **Category:** 6 (misleading — name and replacement don't obviously equate), 16 (field name from wrong domain — "serving endpoint" applies to a different resource).
- **Suggested name:** Apply `@deprecated`; consider dropping the field entirely if `knowledgeAssistantId` fully supplants it. Document the migration mapping precisely.
- **Rationale:** This is a deprecation transition mid-flight; the public TS surface should signal it correctly.

## Medium severity

### 6. `SupervisorAgent.createTime: Temporal.Instant` — `src/v1/model.ts:211-212`
- **Why weird:** `Temporal.Instant` is correct (good!) but the field name `createTime` follows AIP-142 (https://google.aip.dev/142). Compare with `customllms.CustomLlm.creationTime: Temporal.Instant` (audited as inconsistent) — the supervisor-agents package uses the AIP form, the customllms package does not. This is positive consistency on supervisor-agents and negative on customllms. Flagging here because the audit covers SDK-wide consistency.
- **Category:** Observation / 17 (cross-package inconsistency).
- **Suggested name:** Keep `createTime`; flag `customllms` to align.
- **Rationale:** Note positive precedent; pair with the audit on `customllms` to align it.

### 7. `Tool.toolId` is "user-specified ID" while wire name is camelCased — `src/v1/model.ts:240-241`
- **Why weird:** Doc reads "User specified id of the Tool." Comparing with `CreateToolRequest.toolId` (model.ts:37-41, "The ID to use for the tool, which will become the final component of the tool's resource name."), the two `toolId` fields are *the same wire concept* — but on `Tool` it is the persisted id, while on `CreateToolRequest` it is the request-time supplied id. The same field name is doing two semantic jobs depending on context. Plus, comparing with `Example.exampleId` (model.ts:83-84, "The universally unique identifier (UUID) of the example."), the format claim differs: `Tool.toolId` is *user-specified*, `Example.exampleId` is a *UUID*. The two id formats are not aligned across sibling types in the same package.
- **Category:** 17 (inconsistency across sibling types), 6 (misleading — different format claims).
- **Suggested name:** Keep `toolId` and `exampleId` but expand the JSDoc on each to disambiguate the id-format contract. Or rename `Tool.toolId` → `toolKey` to mirror that it is a user-supplied identifier (as opposed to a server-generated UUID).
- **Rationale:** A naming audit must flag fields whose format contract is silent in the type signature.

### 8. `CreateToolRequest.toolId` separately on the request — `src/v1/model.ts:37-41`
- **Why weird:** The create request takes both `tool: Tool` (the body) *and* `toolId: string` (the URL/query param). The wire form is `POST /supervisor-agents/{id}/tools?tool_id={user-supplied}`. So `req.toolId` flows into the query string and `req.tool.toolId` is *not used* on creation — but TypeScript does not enforce this. A consumer who writes `{tool: {toolId: 'foo'}}` and leaves `req.toolId` undefined gets unexpected behavior. The two-fields-for-one-concept pattern is also documented in `customllms.md` #20.
- **Category:** 12 (duplicate concept on the same request), 6 (misleading — `tool.toolId` looks usable on creation but isn't), 17.
- **Suggested name:** Either remove `tool.toolId` from the body shape (TypeScript can enforce this via a discriminated `Omit<Tool, 'toolId'>` type for create), or document the precedence rule on the JSDoc.
- **Rationale:** Generated request types with duplicate fields are a well-known footgun.

### 9. `Client` class name — bare, no scoping — `src/v1/client.ts:61`
- **Why weird:** The class is named `Client`. After `import {Client} from '@databricks/sdk-supervisoragents/v1'`, the type is unambiguous in isolation — but consumers importing multiple packages routinely write `import {Client as SAClient} from '@databricks/sdk-supervisoragents/v1'`. Same SDK-wide issue flagged in `knowledgeassistants.md` #30.
- **Category:** 1 (vague), 17 (SDK-wide inconsistency).
- **Suggested name:** `SupervisorAgentsClient` (matches the Go SDK's `WorkspaceClient.SupervisorAgents` and AWS SDK's `S3Client`, `IAMClient` pattern).
- **Rationale:** Bare `Client` is convenient until you import two SDK packages; then it's a tax.

## Low severity

### 10. `Volume`/`UcFunction`/`UcConnection` — `Uc` prefix on some, bare on others — `src/v1/model.ts:245,249,286`
- **Why weird:** Of the variant types, three are Unity Catalog resources: `Volume`, `UcFunction`, `UcConnection`. The `Uc` prefix is applied to two but not to `Volume` — even though a Databricks volume is *always* a UC volume. The `Uc` prefix is also inconsistent acronym casing: `Uc` (title-case) instead of `UC` (all-caps), and the Google TypeScript style guide could go either way (https://google.github.io/styleguide/tsguide.html#identifiers). Same acronym-casing question as flagged in `customllms.md` #1 (`Llm` vs `LLM`).
- **Category:** 3 (acronym casing — `Uc` vs `UC`), 17 (inconsistent prefix application — `Volume` should be `UcVolume`).
- **Suggested name:** Either drop the `Uc` prefix everywhere (the package context makes it clear) or apply it uniformly: `UcVolume`, `UcFunction`, `UcConnection` (with the acronym-casing question decided once SDK-wide).
- **Rationale:** Consistency wins; the audit prompt rule 3 (acronym casing) and rule 17 (consistent action verbs / family naming) both flag this.

## Observations

### 11. `Tool.toolType` doc lists 14 kinds but `Tool.spec` union covers only 6 — `src/v1/model.ts:227,230-237`
- **Why weird:** The JSDoc on `Tool.toolType` enumerates 14 wire values (`"genie_space", "knowledge_assistant", "uc_function", "uc_connection", "app", "volume", "dashboard", "serving_endpoint", "table", "vector_search_index", "catalog", "schema", "supervisor_agent", "web_search"`), but the `Tool.spec` discriminated union only encodes 6 of them (`genieSpace`, `knowledgeAssistant`, `ucFunction`, `app`, `volume`, `ucConnection`). The other 8 wire kinds — dashboard, serving_endpoint, table, vector_search_index, catalog, schema, supervisor_agent, web_search — can be set via `toolType` but have no corresponding `spec` variant. A consumer who writes `{toolType: 'dashboard'}` gets no type-system support for the dashboard payload because the variant doesn't exist. Either the backend has dropped those kinds (and the doc should be updated) or the TS surface is missing variants.
- **Category:** 16 (field contradicts type domain), 17 (doc vs type-shape mismatch), 6 (misleading).
- **Suggested name:** Reconcile the two declarations: either add the missing variants to `Tool.spec` or shrink the `toolType` enumeration to the supported subset.

### 12. Action verbs in `Client` are consistent — `src/v1/client.ts`
- **Why weird:** The client uses `create`/`delete`/`get`/`list`/`update` — no `fetch`/`retrieve`/`read`/`remove`. This is good. Flagging as a *positive* observation.
- **Category:** 17 (reversed — consistency note).

### 13. Method-name verb conventions match resource targets — `src/v1/client.ts:92,121,153,194,216,238,260,288,316,341,395,452,506,550,597`
- **Why weird:** Methods are uniformly `verb` + `Subject` (createExample, createSupervisorAgent, createTool, deleteExample, deleteSupervisorAgent, deleteTool, getExample, getSupervisorAgent, getTool, listExamples, listSupervisorAgents, listTools, updateExample, updateSupervisorAgent, updateTool). 15 methods, 5 verbs × 3 subjects, no exceptions. Strong positive observation.
- **Category:** 17 (positive observation).
