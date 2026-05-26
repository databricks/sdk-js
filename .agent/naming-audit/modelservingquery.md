# Naming Audit: `modelservingquery` (v1)

**Package:** `@databricks/sdk-modelservingquery`
**Path:** `/home/parth.bansal/sdk-js/packages/modelservingquery/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/index.ts`

**Inferred domain:** Model-serving *inference path*. The single client method `query()` POSTs an inference request body to `/api/serving-endpoints/{name}/invocations`. Supports four payload shapes simultaneously: chat (LLM), completions (LLM), embeddings (LLM), and traditional MLflow models (dataframes / tensors). The package is a *sibling* of `servingendpoints` (which owns CRUD on the endpoint resource itself) — this package only owns the **query/invoke** verb. The package name and its types share vocabulary with the unrelated SQL packages `queries`, `queryexecution`, `queryhistory` — none of which have anything to do with model serving.

**Total weird names flagged:** 16 (0 fixed, 16 still, 0 superseded)

Rescanned on 2026-05-26 after regeneration #156. All 16 findings remain
unchanged in the regenerated output; no items have moved to `## Fixed`.

---

## Summary table

| #  | Severity | Location                          | Name                                                         | Category                                     |
|----|----------|-----------------------------------|--------------------------------------------------------------|----------------------------------------------|
| 1  | High     | package + dir                     | `modelservingquery` / `@databricks/sdk-modelservingquery`    | Duplicate concept; "query" overloaded SDK-wide |
| 2  | High     | `model.ts` interface              | `QueryEndpointInputRequest` / `QueryEndpointResponse`        | Four unrelated payload shapes packed into one type; double-suffix `Input` + `Request` |
| 3  | High     | `model.ts` field                  | `QueryEndpointInputRequest.input` / `inputs` / `instances` / `prompt` / `messages` / `dataframeRecords` / `dataframeSplit` | 7 mutually-exclusive "input" fields, no oneof |
| 4  | High     | `model.ts` interface              | `V1ResponseChoiceElement`                                    | Version segment leaked into type name; empty `Element` suffix |
| 5  | High     | `model.ts` interface              | `EmbeddingsV1ResponseEmbeddingElement`                       | Version segment leaked into type name; empty `Element` suffix |
| 6  | High     | `model.ts` interface              | `ExternalModelUsageElement`                                  | Misleading scope ("External" implies non-Databricks) and "Element" suffix is meaningless |
| 7  | High     | `model.ts` interface              | `QueryEndpointInputRequest_ExtraParamsEntry`                 | Proto-architectural-leak: `_Entry` is Protobuf map-entry generator suffix |
| 8  | High     | `model.ts` interface              | `QueryEndpointInputRequest_UsageContextEntry`                | Proto-architectural-leak: `_Entry` is Protobuf map-entry generator suffix |
| 9  | Medium   | `client.ts` method                | `query()`                                                    | Verb-tense / reserved-word feel; conflicts with SQL packages |
| 10 | Medium   | `model.ts` field                  | `QueryEndpointResponse.choices` vs `.data` vs `.predictions` vs `.outputs` | 4 mutually-exclusive output fields, no oneof |
| 11 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.text` / `.message`                  | Singular/plural mismatch with `messages` request field |
| 12 | Medium   | `model.ts` enum                   | `ChatMessageRole`                                            | Singular/plural — type is `ChatMessage`, but role values are `SYSTEM`/`USER`/`ASSISTANT` — none of which are *types of message* |
| 13 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.logprobs`                           | Cryptic abbreviation; typed as `number` (the OpenAI spec returns an object) |
| 14 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.finishReason`                       | Underspecified — typed `string`, but in practice an enum (`stop`, `length`, …) |
| 15 | Medium   | `model.ts` field                  | `QueryEndpointInputRequest.extraParams`                      | Vague — what counts as "extra"? Also typed `Record<string,string>` though OpenAI passes arbitrary JSON |
| 16 | Low      | `model.ts` enum value             | `ChatMessageRole.ASSISTANT`                                  | OK, but missing common values (`tool`, `function`) — incomplete enum |

---

## High severity

### 1. `modelservingquery` / `@databricks/sdk-modelservingquery` — duplicate concept

**Location:** `package.json`, directory `packages/modelservingquery/`

**Categories:** 1 (vague), 12 (duplicate concept across packages), 7 (overly verbose)

```
packages/modelservingquery/        ← model inference path
packages/queries/                   ← SQL alert queries
packages/queryexecution/            ← published-dashboard SQL execution
packages/queryhistory/              ← SQL query history
packages/servingendpoints/          ← CRUD for serving endpoints
```

The word **query** is reused across four unrelated SDK packages. In SQL-land (`queries`, `queryexecution`, `queryhistory`) a "query" is a SQL statement. In this package a "query" is *inference against an LLM/MLflow model* — i.e., a single HTTP POST to `/invocations`. The two meanings have nothing in common, but `import { Client } from '@databricks/sdk-modelservingquery/v1'` and `import { Client } from '@databricks/sdk-queryexecution/v1'` will appear side-by-side in user code.

The Go SDK calls the corresponding service `serving.QueryEndpoint` (a verb-prefixed call inside the `serving` package, not a standalone package). The TS port hoists `QueryEndpoint` to a top-level package and concatenates the prefix `modelserving` + the verb `query`, producing a name that reads as a noun ("model serving query") but is actually verb-phrase. A clearer split would be either:

- Fold into `servingendpoints` as a method (matches Go).
- Rename the package to `inference`, `invocations`, or `modelservinginvoke` — names that nobody else in the SDK uses.

The package name is the most consequential naming choice in the audit; every type below inherits its ambiguity.

### 2. `QueryEndpointInputRequest` / `QueryEndpointResponse` — four payload shapes packed into one type + double suffix

**Location:** `src/v1/model.ts:76-139`, `153-183`

**Categories:** 1 (vague), 8 (redundant suffixes), 14 (Go/Java-style)

```ts
export interface QueryEndpointInputRequest {
  name?: string | undefined;
  prompt?: JsonValue | undefined;
  input?: JsonValue | undefined;
  messages?: ChatMessage[] | undefined;
  // ... 14 more fields, mutually exclusive across 4 payload shapes
}
```

The single request type encodes **four** different request shapes:

- **Chat:** `messages`, `temperature`, `stop`, `maxTokens`, `n`, `stream`, `extraParams`.
- **Completions:** `prompt`, same modifiers.
- **Embeddings:** `input`, `extraParams`.
- **Traditional ML:** `dataframeRecords` / `dataframeSplit` / `instances` / `inputs`.

`QueryEndpointInputRequest` carries **two** request-shaped suffixes back to back: `Input` and `Request`. Both are noise. The name says "input" but the field `input` also exists, and `inputs` exists, and `instances` exists. The user constructing this type has to know which combination is valid — TS gives no help. The fresh `Request` suffix (added in regeneration) doesn't disambiguate the four shapes; it just makes the type name longer.

Better: split into `ChatQueryRequest`, `CompletionsQueryRequest`, `EmbeddingsQueryRequest`, `TraditionalModelQueryRequest`, and have the client expose four methods (or a discriminated union).

`QueryEndpointResponse` has the same problem in mirror image: `choices` (chat/completions), `data` (embeddings), `predictions` (traditional), `outputs` (feature serving). The Go SDK has the same union, so the smell is inherited from the wire protocol.

### 3. Seven mutually-exclusive "input" fields with no discriminator

**Location:** `src/v1/model.ts:79-134`

**Categories:** 4 (singular/plural confusion), 15 (generic field name), 17 (inconsistent verbs/nouns)

| Field             | Used by      | Type                      |
|-------------------|--------------|---------------------------|
| `prompt`          | completions  | `JsonValue`               |
| `input`           | embeddings   | `JsonValue`               |
| `messages`        | chat         | `ChatMessage[]`           |
| `dataframeRecords`| traditional  | `JsonValue[]`             |
| `dataframeSplit`  | traditional  | `DataframeSplitInput`     |
| `instances`       | traditional  | `JsonValue[]`             |
| `inputs`          | traditional  | `JsonValue`               |

Note the singular/plural near-collision `input` (embeddings) vs `inputs` (tensor columnar) — the *plural* refers to a single object (columnar map), and the *singular* refers to potentially a list of strings. This is the textbook trap the audit checklist calls out as "Singular/plural mismatches."

A user writing TS sees seven optional fields and has to read four JSDoc paragraphs to figure out which one to set. A discriminated union (`payload: { kind: 'chat'; messages: ... } | { kind: 'completions'; prompt: ... } | ...`) would make invalid combinations impossible.

### 4. `V1ResponseChoiceElement` — version segment in type name + empty `Element` suffix

**Location:** `src/v1/model.ts:185-196`

**Categories:** 7 (overly verbose), 8 (empty suffix), 14 (Go/Java-style names)

```ts
export interface V1ResponseChoiceElement { ... }
```

The `V1` prefix duplicates the directory it lives in (`src/v1/`). When a hypothetical v2 ships, the type will be either `V2ResponseChoiceElement` (now-impossible name collision with whatever the new shape is called) or renamed (breaking change). The `Element` suffix is also empty — the type is the choice itself, not an "element of a choice." `Choice` (no prefix, no suffix) would suffice — `QueryEndpointResponse.choices: Choice[]` reads cleanly. v2-style versioning should live exclusively in the import path, not in identifiers.

### 5. `EmbeddingsV1ResponseEmbeddingElement` — version leak + empty `Element` suffix

**Location:** `src/v1/model.ts:58-65`

**Categories:** 7 (overly verbose), 8 (empty suffix)

```ts
export interface EmbeddingsV1ResponseEmbeddingElement {
  embedding?: number[] | undefined;
  index?: number | undefined;
  object?: EmbeddingsV1ResponseEmbeddingElementObject | undefined;
}
```

Same `V1` leak as finding #4. The `Element` suffix is empty — the type is the single embedding, not an "element of an embedding." `Embedding` (with `vector` for the numeric field) would convey the same data cleanly.

### 6. `ExternalModelUsageElement` — misleading scope + meaningless suffix

**Location:** `src/v1/model.ts:67-74`

**Categories:** 6 (misleading names), 8 (redundant suffixes), 16 (field contradicting type domain)

```ts
export interface ExternalModelUsageElement {
  /** The number of tokens in the prompt. */
  promptTokens?: number | undefined;
  /** The number of tokens in the chat/completions response. */
  completionTokens?: number | undefined;
  /** The total number of tokens in the prompt and response. */
  totalTokens?: number | undefined;
}
```

Two problems:

1. **"External" is misleading.** This type is the OpenAI-spec `usage` block, returned by Databricks Foundation Model and Databricks Provisioned Throughput endpoints — both of which are **internal** Databricks-managed models. JSDoc in `QueryEndpointResponse.usage` even says "external/foundation model", but Databricks Foundation Models are explicitly *first-party*. The "External" prefix mislabels its scope.
2. **"Element" is meaningless.** The type is the single usage block, not "an element of a list." `TokenUsage`, `Usage`, or `ModelUsage` would suffice.

### 7. `QueryEndpointInputRequest_ExtraParamsEntry` — proto map-entry leak

**Location:** `src/v1/model.ts:142-145`

**Why:** Underscore-separated `_ExtraParamsEntry` suffix is the verbatim Protobuf code-generator pattern for the synthetic map-entry message that backs `map<string, string> extra_params`. The type is exported but never referenced by the client or by `marshalQueryEndpointInputRequestSchema`, which uses `z.record(z.string(), z.string())` directly. The accompanying `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` directive on line 141 explicitly acknowledges the leak. A TS SDK consumer has no need for the map-entry container shape; only the `Record<string, string>` itself.

**Category:** proto-architectural-leak (Protobuf generator artefact: `_Entry` map-entry message)

**Suggested:** Delete the exported type entirely. A `Record<string, string>` alias is already the idiomatic TS surface for a string-to-string map.

**Rationale:** `_Entry` types are a proto-generator implementation detail (`map<K, V>` lowers to a hidden nested message named `<FieldName>Entry`). Re-exporting them through a TS SDK forces language-specific generator scaffolding into the public API. The file's own ESLint disable comment is direct evidence that the name violates the project's naming convention — it is suppressed rather than fixed.

### 8. `QueryEndpointInputRequest_UsageContextEntry` — proto map-entry leak

**Location:** `src/v1/model.ts:148-151`

**Why:** Same proto-architectural leak as finding #7, applied to the `usage_context` map field. The interface is exported, never used in the schema (which uses `z.record(z.string(), z.string())`), and the file's own ESLint directive on line 147 labels it "Proto-style nested message name." Duplicate leak from the same generator template.

**Category:** proto-architectural-leak (Protobuf generator artefact: `_Entry` map-entry message)

**Suggested:** Delete the exported type entirely; `Record<string, string>` is the natural TS surface.

**Rationale:** Mirror of #7. Two `_Entry` exports inflate the package surface area with proto-internal types that have no meaningful TS use case. They are a recurring pattern across packages with map fields, suitable for generator-level suppression.

---

## Medium severity

### 9. `query()` — verb-tense / reserved-word feel

**Location:** `src/v1/client.ts:58-81`

**Categories:** 13 (verb-tense), 10 (reserved-word collision), 17 (inconsistent action verb)

```ts
/** Query a serving endpoint */
async query(req: QueryEndpointInputRequest, options?: CallOptions): Promise<QueryEndpointResponse> { ... }
```

The method is named `query` — a verb that doubles as the common SQL noun, and that already exists as a method on `IDBDatabase` and on the unrelated `queries` package. `invoke`, `predict`, or `call` would match the underlying REST verb (`POST /invocations`) and would not collide with SQL nomenclature. Also: the method signature omits `endpointName` as a first arg — it has to be supplied inside the input as `req.name`, which conflates the URL parameter with the request body.

### 10. Four mutually-exclusive output fields, no oneof

**Location:** `src/v1/model.ts:153-183`

**Categories:** 4 (singular/plural), 17 (inconsistent verbs/nouns), 15 (generic names)

| Field         | Used by              | Element type                              |
|---------------|----------------------|-------------------------------------------|
| `choices`     | chat / completions   | `V1ResponseChoiceElement[]`               |
| `data`        | embeddings           | `EmbeddingsV1ResponseEmbeddingElement[]`  |
| `predictions` | traditional ML       | `JsonValue[]`                             |
| `outputs`     | feature serving      | `JsonValue[]`                             |

Mirror of finding #3 on the response side. The TS user has to know which field will be populated given which input was sent. A discriminated union would be more honest.

### 11. `V1ResponseChoiceElement.text` / `.message` — singular vs plural mismatch

**Location:** `src/v1/model.ts:185-196`

**Categories:** 9 (singular/plural mismatches)

```ts
export interface V1ResponseChoiceElement {
  text?: string | undefined;            // completions response
  message?: ChatMessage | undefined;    // chat response
  ...
}
```

The *request* uses `messages: ChatMessage[]` (plural array). The *response* `Choice` carries a singular `message: ChatMessage`. That's correct because each choice is one message — but `messageS` request and `message` response with the same element type invites confusion. Pair this with `text` (chat completions response) vs `prompt` (completions request) and the asymmetry is real.

### 12. `ChatMessageRole` enum — singular/plural odd

**Location:** `src/v1/model.ts:17-23`

**Category:** 9 (singular/plural mismatches)

```ts
/** The role of the message. One of [system, user, assistant]. */
export enum ChatMessageRole {
  CHAT_MESSAGE_ROLE_UNSPECIFIED = 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}
```

The values are not types of "chat message" — they are types of speaker / agent. `ChatRole` (drop `Message`) would parse more naturally because the *role* belongs to the *speaker*, not the *message*. The OpenAI vocabulary that this mirrors uses `role` (not `messageRole`) for the same reason.

### 13. `V1ResponseChoiceElement.logprobs` — cryptic + wrong type

**Location:** `src/v1/model.ts:194-195`

**Categories:** 5 (cryptic abbreviation), 6 (misleading types)

```ts
/** The logprobs returned only by the __completions__ endpoint. */
logprobs?: number | undefined;
```

`logprobs` is a verbatim OpenAI shorthand for "log probabilities." Two issues:

1. `logProbabilities` would be readable.
2. Typed `number` (a single number). The OpenAI spec for `logprobs` returns an *object* containing per-token log probabilities, top-k alternatives, and text offsets. The wire response is being shoe-horned into a scalar — either the type is wrong, or the field name is wrong.

### 14. `V1ResponseChoiceElement.finishReason` — underspecified

**Location:** `src/v1/model.ts:192-193`

**Categories:** 4 (string-typed enum)

```ts
/** The finish reason returned by the endpoint. */
finishReason?: string | undefined;
```

In practice the value is always one of `"stop"`, `"length"`, `"content_filter"`, `"tool_calls"`, `"function_call"`. Typed as `string` instead of an enum — the user has no IDE help. The field name itself is fine; the absence of an enum is the smell.

### 15. `QueryEndpointInputRequest.extraParams` — vague

**Location:** `src/v1/model.ts:121-126`

**Categories:** 1 (vague), 6 (misleading types)

```ts
/** The extra parameters field used ONLY for __completions, chat,__ and __embeddings external & foundation
 * model__ serving endpoints. ... */
extraParams?: Record<string, string> | undefined;
```

"Extra" relative to what? The 8 other fields already on `QueryEndpointInputRequest` are the "main" params; everything else falls through to here. `passthroughParams`, `modelParams`, or `externalParamsOverride` would be clearer. Also: typed `Record<string, string>` — but OpenAI's "extra params" semantically include `top_p` (number), `presence_penalty` (number), and `tools` (array). The string-only typing forces stringification of values that should be passed through as JSON.

---

## Low severity

### 16. `ChatMessageRole.ASSISTANT` — incomplete enum

**Location:** `src/v1/model.ts:17-23`

**Category:** 6 (misleading names), 9 (singular/plural)

```ts
export enum ChatMessageRole {
  CHAT_MESSAGE_ROLE_UNSPECIFIED = 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}
```

Four values (counting the proto-style `UNSPECIFIED` sentinel), but the OpenAI spec also includes `tool` and `function` (and recent versions add `developer`). The enum is *closed* in TS (an exhaustive switch matches only 4 cases), so the wire format can outgrow the enum. Either the enum should be open (string union) or it should include the OpenAI-mandated values. Naming-adjacent; flagged because the SDK is meant to broker LLM traffic.

---

## Observations

1. **The whole package is a thin wrapper around one POST.** `client.ts` has a single method (`query`) that does a single POST against `/api/serving-endpoints/{name}/invocations`. The entire surface area is the request and response *shape*, which is the union of four different OpenAI-like APIs plus traditional MLflow models. The naming difficulty is therefore concentrated in `model.ts`, which crams four request shapes and four response shapes into one type apiece. A discriminated union would solve roughly half the findings (3, 10).

2. **Wire-format leakage is severe.** Wire-format names show up almost verbatim in TS: `n`, `stop`, `stream`, `logprobs`, `object`, `data`, `extra_params`, `served-model-name`, `EmbeddingsV1ResponseEmbeddingElement`. The Go SDK shares the smell, but Go's `query_endpoint` request becomes `QueryEndpointInputRequest` in TS, where TS users have no way to distinguish the four valid combinations.

3. **Version-segment leak.** `V1ResponseChoiceElement`, `EmbeddingsV1ResponseEmbeddingElement`, and `EmbeddingsV1ResponseEmbeddingElementObject` all carry the literal string `V1` in the *type* name. The directory is already `src/v1/`. Other packages in the SDK (e.g., `alerts`) do not carry `V1`/`V2` segments in type names — those have explicit `v1` / `v2` directories instead, with the version expressed at the package-import path level. This package is inconsistent with that convention.

4. **"Element" is the canonical empty suffix.** `V1ResponseChoiceElement`, `EmbeddingsV1ResponseEmbeddingElement`, `ExternalModelUsageElement` all carry the suffix `Element`. None of them are array elements in any structural sense — they are first-class types. The suffix is a Go convention for "value type inside a repeated field"; it adds noise in TS.

5. **Package-level confusion.** Putting "query" in a model-serving package's name produces type names like `QueryEndpointInputRequest` (inference request to a serving endpoint, but reads as "an input to a Query endpoint" in a SQL context) and a client method called `query` (which is *not* a SQL query). The `queries` / `queryexecution` / `queryhistory` packages would all be on the same import autocomplete page as `modelservingquery` in any IDE.

6. **The `query()` method has no `endpointName` parameter.** The endpoint name is buried in `req.name`, which is typed optional. If the caller forgets, the URL silently becomes `/api/serving-endpoints//invocations` (double slash). A signature like `query(endpointName: string, req: QueryEndpointInputRequest, options?: CallOptions)` would catch the missing path parameter at the type level.

7. **No streaming support despite `stream: boolean`.** `QueryEndpointInputRequest.stream` is a passthrough to the wire format, but `client.query()` always reads the full response body via `readAll`. Setting `stream: true` will either produce a malformed response or a parse failure. The field name promises a capability the SDK doesn't deliver.

---

## v1-only

This package has only `v1`. There is no v2 to diff against. Several names visibly anticipate a v2 (`V1ResponseChoiceElement`, `EmbeddingsV1ResponseEmbeddingElement`), but the version is also baked into the directory and package export path. If/when v2 ships, those leaked version segments will have to be renamed *and* moved.

---

## Domain glossary

| Term                           | Meaning in this package                                                                    |
|--------------------------------|--------------------------------------------------------------------------------------------|
| Serving endpoint               | A deployed Databricks model serving resource (an "/endpoints/{name}/invocations" URL). |
| Query (verb)                   | A single inference call (POST). **Not** a SQL query. |
| Query endpoint                 | The "/invocations" REST resource; the only method in the package. |
| External model                 | Confusingly, this includes Databricks Foundation Models (which are first-party). Used to distinguish from user-deployed MLflow models. |
| Foundation model               | A first-party (typically open-source, hosted by Databricks) LLM. |
| Choice                         | One generated response in a chat or completions reply (mirrors OpenAI). |
| Embedding                      | A vector of floats representing the input text (mirrors OpenAI). |
| Logprobs                       | Log probabilities of generated tokens. Mistyped as `number` in this package. |
| `n` (in `QueryEndpointInputRequest`)  | "Number of candidates" (mirrors OpenAI's `n`). |
| Usage context                  | Free-form metadata recorded in the model-serving usage tracking table. |
| Extra params                   | Free-form parameters passed through to the underlying model API. |
| Served model                   | One model behind a serving endpoint (an endpoint can host several with traffic split). |
| Dataframe split / records      | Two of `pandas.DataFrame.to_dict`'s orientations, used for traditional MLflow models. |
| Instances / inputs             | Tensor-input shapes — `instances` is row-major, `inputs` is column-major. |

---

## File coverage

| File              | Lines | Read in full |
|-------------------|-------|--------------|
| `src/v1/model.ts` | 342   | yes          |
| `src/v1/client.ts`| 82    | yes          |
| `src/v1/index.ts` | 21    | yes          |
