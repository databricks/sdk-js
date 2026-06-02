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
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Observation | 2 |

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

## Observations

### 3. Action verbs in `Client` are consistent — `src/v1/client.ts`
- **Why weird:** The client uses `create`/`delete`/`get`/`list`/`update` — no `fetch`/`retrieve`/`read`/`remove`. This is good. Flagging as a *positive* observation.
- **Category:** 17 (reversed — consistency note).

### 4. Method-name verb conventions match resource targets — `src/v1/client.ts:89,118,150,191,213,235,257,285,313,338,392,449,503,547,594`
- **Why weird:** Methods are uniformly `verb` + `Subject` (createExample, createSupervisorAgent, createTool, deleteExample, deleteSupervisorAgent, deleteTool, getExample, getSupervisorAgent, getTool, listExamples, listSupervisorAgents, listTools, updateExample, updateSupervisorAgent, updateTool). 15 methods, 5 verbs × 3 subjects, no exceptions. Strong positive observation.
- **Category:** 17 (positive observation).
