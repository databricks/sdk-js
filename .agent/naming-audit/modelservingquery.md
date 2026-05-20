# Naming Audit: `modelservingquery` (v1)

**Package:** `@databricks/sdk-modelservingquery`
**Path:** `/home/parth.bansal/sdk-js/packages/modelservingquery/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

**Inferred domain:** Model-serving *inference path*. The single client method `query()` POSTs an inference request body to `/api/serving-endpoints/{name}/invocations`. Supports four payload shapes simultaneously: chat (LLM), completions (LLM), embeddings (LLM), and traditional MLflow models (dataframes / tensors). The package is a *sibling* of `servingendpoints` (which owns CRUD on the endpoint resource itself) — this package only owns the **query/invoke** verb. The package name and its types share vocabulary with the unrelated SQL packages `queries`, `queryexecution`, `queryhistory` — none of which have anything to do with model serving.

**Total weird names flagged:** 31

---

## Summary table

| #  | Severity | Location                          | Name                                                         | Category                                     |
|----|----------|-----------------------------------|--------------------------------------------------------------|----------------------------------------------|
| 1  | High     | package + dir                     | `modelservingquery` / `@databricks/sdk-modelservingquery`    | Duplicate concept; "query" overloaded SDK-wide |
| 2  | High     | `model.ts` interface              | `QueryEndpointInput` / `QueryEndpointResponse`               | Vague; mixes verb-as-noun ("Query") and 4 unrelated payload shapes |
| 3  | High     | `model.ts` field                  | `QueryEndpointInput.name`                                    | Generic field name losing meaning (= endpoint name) |
| 4  | High     | `model.ts` field                  | `QueryEndpointInput.input` / `inputs` / `instances` / `prompt` / `messages` / `dataframeRecords` / `dataframeSplit` | 7 mutually-exclusive "input" fields, no oneof |
| 5  | High     | `model.ts` field                  | `QueryEndpointInput.n`                                       | Cryptic abbreviation (single letter) |
| 6  | High     | `model.ts` enum                   | `EmbeddingsV1ResponseEmbeddingElementObject`                 | Overly verbose (5 nouns + version + suffix) |
| 7  | High     | `model.ts` interface              | `V1ResponseChoiceElement`                                    | Version segment leaked into type name |
| 8  | High     | `model.ts` interface              | `EmbeddingsV1ResponseEmbeddingElement`                       | Version segment leaked + redundant word ("Embedding Element") |
| 9  | High     | `model.ts` enum value             | `EmbeddingsV1ResponseEmbeddingElementObject.EMBEDDING`       | Enum value = type prefix; tautology |
| 10 | High     | `model.ts` enum values            | `CHAT_MESSAGE_ROLE_UNSPECIFIED` / `QUERY_ENDPOINT_RESPONSE_OBJECT_UNSPECIFIED` / `EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED` | Long enum values (proto sentinel leak) |
| 11 | High     | `model.ts` interface              | `ExternalModelUsageElement`                                  | Misleading scope ("External" implies non-Databricks) and "Element" suffix is meaningless |
| 12 | Medium   | `client.ts` method                | `query()`                                                    | Verb-tense / reserved-word feel; conflicts with SQL packages |
| 13 | Medium   | `model.ts` interface              | `DataframeSplitInput`                                        | Generic field names lose meaning (`index`, `columns`, `data`) |
| 14 | Medium   | `model.ts` field                  | `QueryEndpointResponse.data`                                 | Vague (it's the *embeddings* array, not arbitrary data) |
| 15 | Medium   | `model.ts` field                  | `QueryEndpointResponse.object`                               | Reserved-word collision (`Object` is a JS built-in) |
| 16 | Medium   | `model.ts` field                  | `QueryEndpointResponse.choices` vs `.data` vs `.predictions` vs `.outputs` | 4 mutually-exclusive output fields, no oneof |
| 17 | Medium   | `model.ts` field                  | `QueryEndpointResponse.created`                              | Verb-tense / underspecified ("created" timestamp typed as `number`) |
| 18 | Medium   | `model.ts` field                  | `QueryEndpointResponse.servedModelName`                      | Generic name (wire form `served-model-name` with hyphen) |
| 19 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.text` / `.message`                  | Singular/plural mismatch with `messages` request field |
| 20 | Medium   | `model.ts` enum                   | `ChatMessageRole`                                            | Singular/plural — type is `ChatMessage`, but role values are `SYSTEM`/`USER`/`ASSISTANT` — none of which are *types of message* |
| 21 | Medium   | `model.ts` field                  | `ExternalModelUsageElement.promptTokens` / `.completionTokens` / `.totalTokens` | Type-suffix tautology — every field carries `Tokens` |
| 22 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.logprobs`                           | Cryptic abbreviation; typed as `number` (the OpenAI spec returns an object) |
| 23 | Medium   | `model.ts` field                  | `V1ResponseChoiceElement.finishReason`                       | Underspecified — typed `string`, but in practice an enum (`stop`, `length`, …) |
| 24 | Medium   | `model.ts` field                  | `QueryEndpointInput.stop`                                    | Reserved-word feel (verb-as-noun used as field) |
| 25 | Medium   | `model.ts` field                  | `QueryEndpointInput.stream`                                  | Reserved-word feel (collides with web-stream `ReadableStream`) and field is `boolean`, not a stream |
| 26 | Medium   | `model.ts` field                  | `QueryEndpointInput.extraParams`                             | Vague — what counts as "extra"? Also typed `Record<string,string>` though OpenAI passes arbitrary JSON |
| 27 | Medium   | `model.ts` field                  | `QueryEndpointInput.usageContext`                            | Vague pair with `extraParams`; both `Record<string,string>` |
| 28 | Low      | `client.ts` JSDoc                 | `/** Query a serving endpoint */`                            | Verb-tense / missing period (project rule) |
| 29 | Low      | `model.ts` enum value             | `ChatMessageRole.ASSISTANT`                                  | OK, but missing common values (`tool`, `function`) — incomplete enum |
| 30 | Low      | `model.ts` field                  | `EmbeddingsV1ResponseEmbeddingElement.index`                 | Underspecified (index of what?) |
| 31 | Low      | `utils.ts` function               | `flattenQueryParams`                                         | Orphaned export — not used in client; "Query" here means URL query, conflicting with the package's "Query" |

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

### 2. `QueryEndpointInput` / `QueryEndpointResponse` — vague type name + verb-as-noun

**Location:** `src/v1/model.ts:76-139`, `153-183`

**Categories:** 1 (vague), 7 (overly verbose), 14 (Go/Java-style)

```ts
export interface QueryEndpointInput {
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

`QueryEndpointInput` is the *whole envelope*, not a single input. The name says "input" but the field `input` also exists, and `inputs` exists, and `instances` exists. The user constructing this type has to know which combination is valid — TS gives no help.

Better: split into `ChatQueryRequest`, `CompletionsQueryRequest`, `EmbeddingsQueryRequest`, `TraditionalModelQueryRequest`, and have the client expose four methods (or a discriminated union).

`QueryEndpointResponse` has the same problem in mirror image: `choices` (chat/completions), `data` (embeddings), `predictions` (traditional), `outputs` (feature serving). The Go SDK has the same union, so the smell is inherited from the wire protocol.

### 3. `QueryEndpointInput.name` — generic field name losing meaning

**Location:** `src/v1/model.ts:77-78`

**Categories:** 15 (generic field names), 19 (underspecified IDs)

```ts
/** The name of the serving endpoint. This field is required and is provided via the path parameter. */
name?: string | undefined;
```

`name` on a `QueryEndpointInput` is unrelated to the *model* name, the *served-model* name (which appears in the response), the *user* name, or the *organisation* name — it's specifically the *serving endpoint* name, which then becomes a URL path segment. JSDoc clarifies but the field doesn't. `endpointName` would match the existing `servedModelName` field in `QueryEndpointResponse`. Also: the field is typed `string | undefined` but is required by JSDoc — and the client falls back to `req.name ?? ''`, silently producing a malformed URL when missing.

### 4. Seven mutually-exclusive "input" fields with no discriminator

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

### 5. `QueryEndpointInput.n` — cryptic single-letter field

**Location:** `src/v1/model.ts:110-115`

**Category:** 5 (cryptic abbreviation)

```ts
/**
 * The n (number of candidates) field used ONLY for __completions__ and __chat external & foundation model__
 * serving endpoints. This is an integer between 1 and 5 with a default of 1 ...
 */
n?: number | undefined;
```

`n` is the wire-format shorthand inherited from the OpenAI API. In TS it parses as a counter loop variable. `numCandidates`, `candidateCount`, or even `numChoices` (matching the response's `choices` field) would be self-describing. The JSDoc literally has to explain what `n` means ("(number of candidates)").

### 6. `EmbeddingsV1ResponseEmbeddingElementObject` — overly verbose enum

**Location:** `src/v1/model.ts:25-29`

**Categories:** 7 (overly verbose), 8 (redundant suffixes)

```ts
/** This will always be 'embedding'. */
export enum EmbeddingsV1ResponseEmbeddingElementObject {
  EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED = 'EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED',
  EMBEDDING = 'EMBEDDING',
}
```

The name parses as 6 concatenated words: `Embeddings` + `V1` + `Response` + `Embedding` + `Element` + `Object`. "Embedding" appears twice; the version segment `V1` is leaked from the directory hierarchy into the type name; the `Element` suffix adds no semantic content. The same redundancy will recur in any future enum generated against this wire shape.

### 7. `V1ResponseChoiceElement` — version segment in type name

**Location:** `src/v1/model.ts:185-196`

**Categories:** 7 (overly verbose), 14 (Go/Java-style names)

```ts
export interface V1ResponseChoiceElement { ... }
```

The `V1` prefix duplicates the directory it lives in (`src/v1/`). When a hypothetical v2 ships, the type will be either `V2ResponseChoiceElement` (now-impossible name collision with whatever the new shape is called) or renamed (breaking change). The `Element` suffix is also empty — the type is the choice itself, not an "element of a choice." `Choice` (no prefix, no suffix) would suffice — `QueryEndpointResponse.choices: Choice[]` reads cleanly. v2-style versioning should live exclusively in the import path, not in identifiers.

### 8. `EmbeddingsV1ResponseEmbeddingElement` — version leak + double "Embedding"

**Location:** `src/v1/model.ts:58-65`

**Categories:** 7 (overly verbose), 8 (redundant suffixes)

```ts
export interface EmbeddingsV1ResponseEmbeddingElement {
  embedding?: number[] | undefined;
  index?: number | undefined;
  object?: EmbeddingsV1ResponseEmbeddingElementObject | undefined;
}
```

Same `V1` leak as finding #7, plus the word "Embedding" appears in `EmbeddingsV1` (plural prefix), `EmbeddingElement` (suffix), and in the field name `embedding` (singular). `Embedding` (the type name) and `vector` (the field name) would convey the same data without repetition. Pairs with finding #6 — the same enum sits inside this type.

### 9. `EmbeddingsV1ResponseEmbeddingElementObject.EMBEDDING` — enum value = prefix tautology

**Location:** `src/v1/model.ts:27-28`

**Category:** 20 (type-suffix tautology in enums)

```ts
EMBEDDING = 'EMBEDDING',
```

The only real enum value spells the same word that opens the enum's name. The path to use this is `EmbeddingsV1ResponseEmbeddingElementObject.EMBEDDING` — five "embedding"-derived tokens to express a constant.

### 10. Long enum sentinels (`*_UNSPECIFIED`)

**Location:** `src/v1/model.ts:19`, `27`, `36`

**Categories:** 18 (long enum values), 14 (proto sentinels leak)

```ts
CHAT_MESSAGE_ROLE_UNSPECIFIED = 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED = 'EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED',
QUERY_ENDPOINT_RESPONSE_OBJECT_UNSPECIFIED = 'QUERY_ENDPOINT_RESPONSE_OBJECT_UNSPECIFIED',
```

Three enums each carry a `*_UNSPECIFIED` value whose wire form repeats the full type name. The longest is 56 characters. These are protobuf-required sentinels that have no meaning in TS — `undefined` is the natural absent value. They appear in the exhaustive list a user must handle in a `switch` over `ChatMessageRole`. The pattern is generator-wide; flag at generator.

### 11. `ExternalModelUsageElement` — misleading scope + meaningless suffix

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

Pairs with finding #21 (every field redundantly ends in `Tokens`).

---

## Medium severity

### 12. `query()` — verb-tense / reserved-word feel

**Location:** `src/v1/client.ts:58-81`

**Categories:** 13 (verb-tense), 10 (reserved-word collision), 17 (inconsistent action verb)

```ts
/** Query a serving endpoint */
async query(req: QueryEndpointInput, options?: CallOptions): Promise<QueryEndpointResponse> { ... }
```

The method is named `query` — a verb that doubles as the common SQL noun, and that already exists as a method on `IDBDatabase` and on the unrelated `queries` package. `invoke`, `predict`, or `call` would match the underlying REST verb (`POST /invocations`) and would not collide with SQL nomenclature. Also: the method signature omits `endpointName` as a first arg — it has to be supplied inside the input as `req.name`, which conflates the URL parameter with the request body.

### 13. `DataframeSplitInput` — generic field names lose meaning

**Location:** `src/v1/model.ts:49-56`

**Categories:** 15 (generic field name), 14 (Pandas-style names)

```ts
export interface DataframeSplitInput {
  index?: number[] | undefined;
  columns?: JsonValue[] | undefined;
  data?: JsonValue[] | undefined;
}
```

The three field names `index`, `columns`, `data` are pulled verbatim from `pandas.DataFrame.to_dict(orient='split')`. In TS they read as a generic key-value bag with no hint that they form a tightly-coupled triple. `index` collides with `EmbeddingsV1ResponseEmbeddingElement.index` and `V1ResponseChoiceElement.index` (three different "index" fields in the same package, all `number`-typed). `columns` is `JsonValue[]` (column *names*, despite the JSON-value type). `data` is the row data. `rowIndex`, `columnNames`, `rows` would each carry meaning.

### 14. `QueryEndpointResponse.data` — vague field

**Location:** `src/v1/model.ts:156-157`

**Categories:** 15 (generic), 16 (field contradicting type domain)

```ts
/** The list of the embeddings returned by the __embeddings external/foundation model__ serving endpoint. */
data?: EmbeddingsV1ResponseEmbeddingElement[] | undefined;
```

A response with seven other typed fields (`choices`, `predictions`, `outputs`, `usage`, etc.) and one of them is called `data`. Without JSDoc the field is meaningless. `embeddings` matches the OpenAI spec naming and the element type.

### 15. `QueryEndpointResponse.object` — JS built-in collision

**Location:** `src/v1/model.ts:172-176`

**Category:** 10 (reserved-word collision)

```ts
object?: QueryEndpointResponseObject | undefined;
```

`object` is a JS keyword (the type `object`, used in `typeof x === 'object'`). Field-name access `resp.object` doesn't break, but `const { object } = resp` shadows the global type. The OpenAI wire format uses `object` for the same field; idiomatic TS would rename to `objectType`, `kind`, or `responseType`.

### 16. Four mutually-exclusive output fields, no oneof

**Location:** `src/v1/model.ts:153-183`

**Categories:** 4 (singular/plural), 17 (inconsistent verbs/nouns), 15 (generic names)

| Field         | Used by              | Element type                              |
|---------------|----------------------|-------------------------------------------|
| `choices`     | chat / completions   | `V1ResponseChoiceElement[]`               |
| `data`        | embeddings           | `EmbeddingsV1ResponseEmbeddingElement[]`  |
| `predictions` | traditional ML       | `JsonValue[]`                             |
| `outputs`     | feature serving      | `JsonValue[]`                             |

Mirror of finding #4 on the response side. The TS user has to know which field will be populated given which input was sent. A discriminated union would be more honest.

### 17. `QueryEndpointResponse.created` — verb tense + underspecified

**Location:** `src/v1/model.ts:170-171`

**Categories:** 13 (verb-tense inconsistency), 15 (generic field name)

```ts
/** The timestamp in seconds when the query was created in Unix time returned by a __completions or chat external/foundation model__ serving endpoint. */
created?: number | undefined;
```

`created` is a past-tense verb used as a noun. Most TS codebases use `createdAt` / `createTime`. Typed `number` (Unix seconds), not `Temporal.Instant` like the rest of the SDK uses for timestamps. Pairs poorly with the response shape — `resp.created` reads as a boolean assertion.

### 18. `QueryEndpointResponse.servedModelName` — wire format leak

**Location:** `src/v1/model.ts:181-183`, marshalled from `'served-model-name'` (line 252, 264)

**Categories:** 4 (wire-format-driven naming), 19 (underspecified IDs)

```ts
servedModelName?: string | undefined;
```

JSON wire field is `served-model-name` (with hyphens) — the only hyphenated field in the whole package. In TS, "served model name" parses ambiguously: is it the *name* of the served-model resource, the *served-model identifier*, the *display name*, or the *model URI*? `servedEntityName` matches the `servingendpoints` package's `ServedEntity` type; `servedModelId` would explicitly mark it as a foreign key.

### 19. `V1ResponseChoiceElement.text` / `.message` — singular vs plural mismatch

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

### 20. `ChatMessageRole` enum — singular/plural odd

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

### 21. `ExternalModelUsageElement.promptTokens` / `.completionTokens` / `.totalTokens` — tautology

**Location:** `src/v1/model.ts:67-74`

**Category:** 20 (type-suffix tautology in fields)

```ts
export interface ExternalModelUsageElement {
  promptTokens?: number | undefined;
  completionTokens?: number | undefined;
  totalTokens?: number | undefined;
}
```

Every field carries the `Tokens` suffix. Once you've established the type is `TokenUsage`, the inner fields can be `prompt`, `completion`, `total`. The unit is implicit. The current shape is `usage.promptTokens` (10 chars), the cleaner form is `usage.prompt` (5 chars). When *every* field repeats the unit, the unit is part of the type, not the field.

### 22. `V1ResponseChoiceElement.logprobs` — cryptic + wrong type

**Location:** `src/v1/model.ts:194-195`

**Categories:** 5 (cryptic abbreviation), 6 (misleading types)

```ts
/** The logprobs returned only by the __completions__ endpoint. */
logprobs?: number | undefined;
```

`logprobs` is a verbatim OpenAI shorthand for "log probabilities." Two issues:

1. `logProbabilities` would be readable.
2. Typed `number` (a single number). The OpenAI spec for `logprobs` returns an *object* containing per-token log probabilities, top-k alternatives, and text offsets. The wire response is being shoe-horned into a scalar — either the type is wrong, or the field name is wrong.

### 23. `V1ResponseChoiceElement.finishReason` — underspecified

**Location:** `src/v1/model.ts:192-193`

**Categories:** 4 (string-typed enum)

```ts
/** The finish reason returned by the endpoint. */
finishReason?: string | undefined;
```

In practice the value is always one of `"stop"`, `"length"`, `"content_filter"`, `"tool_calls"`, `"function_call"`. Typed as `string` instead of an enum — the user has no IDE help. The field name itself is fine; the absence of an enum is the smell.

### 24. `QueryEndpointInput.stop` — reserved-word feel

**Location:** `src/v1/model.ts:100-104`

**Category:** 10 (reserved-word collisions)

```ts
stop?: string[] | undefined;
```

`stop` is an imperative verb used as a noun. `stopSequences` (which the JSDoc literally calls them — "The stop sequences field") would be self-describing. The naming inherits from the OpenAI wire spec.

### 25. `QueryEndpointInput.stream` — collides with web streams

**Location:** `src/v1/model.ts:117-120`

**Category:** 10 (reserved-word collisions), 16 (field contradicting type domain)

```ts
stream?: boolean | undefined;
```

The field is a boolean ("do you want a streamed response?"). The name `stream` in TS evokes `ReadableStream` / `WritableStream`. The client method doesn't actually implement streaming — there's no `AsyncIterable` return type — so setting `stream: true` will produce a malformed buffered response. `useStreamingResponse` or `streaming` (adjective, not noun) would avoid the type collision.

### 26. `QueryEndpointInput.extraParams` — vague

**Location:** `src/v1/model.ts:121-126`

**Categories:** 1 (vague), 6 (misleading types)

```ts
/** The extra parameters field used ONLY for __completions, chat,__ and __embeddings external & foundation
 * model__ serving endpoints. ... */
extraParams?: Record<string, string> | undefined;
```

"Extra" relative to what? The 8 other fields already on `QueryEndpointInput` are the "main" params; everything else falls through to here. `passthroughParams`, `modelParams`, or `externalParamsOverride` would be clearer. Also: typed `Record<string, string>` — but OpenAI's "extra params" semantically include `top_p` (number), `presence_penalty` (number), and `tools` (array). The string-only typing forces stringification of values that should be passed through as JSON.

### 27. `QueryEndpointInput.usageContext` — vague pair

**Location:** `src/v1/model.ts:135-138`

**Category:** 1 (vague)

```ts
/** Optional user-provided context that will be recorded in the usage tracking table. */
usageContext?: Record<string, string> | undefined;
```

Pairs with #26 (both are open-ended string maps). "Usage context" is ambiguous: usage of what? Context for what? The JSDoc says "recorded in the usage tracking table" — a clearer name would be `usageMetadata` or `trackingContext`.

---

## Low severity

### 28. JSDoc `/** Query a serving endpoint */` — verb tense / no period

**Location:** `src/v1/client.ts:57`

**Categories:** 13 (verb-tense inconsistency), project rule (sentences end with period)

```ts
/** Query a serving endpoint */
async query(...) { ... }
```

Imperative verb, no terminal punctuation. Project rule (`CLAUDE.md`) requires comments to be sentences ending with a period. `/** Queries a serving endpoint. */` would match the v2-style JSDoc in other packages (`alerts/src/v2/client.ts` uses third-person singular present).

### 29. `ChatMessageRole.ASSISTANT` — incomplete enum

**Location:** `src/v1/model.ts:17-23`

**Category:** 6 (misleading names), 9 (singular/plural)

```ts
export enum ChatMessageRole {
  ...
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}
```

Three values, but the OpenAI spec also includes `tool` and `function` (and recent versions add `developer`). The enum is *closed* in TS (an exhaustive switch matches only 3 cases), so the wire format can outgrow the enum. Either the enum should be open (string union) or it should include the OpenAI-mandated values. Naming-adjacent; flagged because the SDK is meant to broker LLM traffic.

### 30. `EmbeddingsV1ResponseEmbeddingElement.index` — underspecified

**Location:** `src/v1/model.ts:62-63`

**Category:** 19 (underspecified IDs)

```ts
/** The index of the embedding in the response. */
index?: number | undefined;
```

`index` without qualification: index inside what? `responseIndex`, `embeddingIndex`, or `position` would be specific. Pairs with `V1ResponseChoiceElement.index` and `DataframeSplitInput.index` — three "index" fields with three different meanings.

### 31. `flattenQueryParams` — orphaned export with conflicting "Query"

**Location:** `src/v1/utils.ts:123-150`

**Categories:** 1 (vague), 12 (duplicate concept), 17 (orphan)

```ts
export function flattenQueryParams(
  prefix: string,
  value: unknown,
  params: URLSearchParams
): void { ... }
```

Two issues:

1. **Not used by the client** — `client.ts` only POSTs a body, never sets URL query parameters. The function is dead code at the package level (generator artefact).
2. **"Query" is conflated.** Inside this package the word "query" refers to *inference*, but here it means *URL query string parameters*. A reader who has just internalised "query = inference" will misread the function's purpose. `flattenUrlSearchParams` would dodge the collision.

---

## Observations

1. **The whole package is a thin wrapper around one POST.** `client.ts` has a single method (`query`) that does a single POST against `/api/serving-endpoints/{name}/invocations`. The entire surface area is the request and response *shape*, which is the union of four different OpenAI-like APIs plus traditional MLflow models. The naming difficulty is therefore concentrated in `model.ts`, which crams four request shapes and four response shapes into one type apiece. A discriminated union would solve roughly half the findings (4, 16, 19).

2. **Wire-format leakage is severe.** Wire-format names show up almost verbatim in TS: `n`, `stop`, `stream`, `logprobs`, `object`, `data`, `extra_params`, `served-model-name`, `*_UNSPECIFIED`, `EmbeddingsV1ResponseEmbeddingElement`. The Go SDK shares the smell, but Go's `query_endpoint` request becomes `QueryEndpointInput` in TS, where TS users have no way to distinguish the four valid combinations.

3. **Version-segment leak.** `V1ResponseChoiceElement`, `EmbeddingsV1ResponseEmbeddingElement`, and `EmbeddingsV1ResponseEmbeddingElementObject` all carry the literal string `V1` in the *type* name. The directory is already `src/v1/`. Other packages in the SDK (e.g., `alerts`) do not carry `V1`/`V2` segments in type names — those have explicit `v1` / `v2` directories instead, with the version expressed at the package-import path level. This package is inconsistent with that convention.

4. **"Element" is the canonical empty suffix.** `V1ResponseChoiceElement`, `EmbeddingsV1ResponseEmbeddingElement`, `ExternalModelUsageElement` all carry the suffix `Element`. None of them are array elements in any structural sense — they are first-class types. The suffix is a Go convention for "value type inside a repeated field"; it adds noise in TS.

5. **Package-level confusion.** Putting "query" in a model-serving package's name produces type names like `QueryEndpointInput` (inference request to a serving endpoint, but reads as "an input to a Query endpoint" in a SQL context) and a client method called `query` (which is *not* a SQL query). The `queries` / `queryexecution` / `queryhistory` packages would all be on the same import autocomplete page as `modelservingquery` in any IDE.

6. **`utils.ts` is identical across packages.** The file is byte-for-byte the same as in `alerts/src/v1/utils.ts`, `endpoints/src/v1/utils.ts`, etc. The single domain-specific export, `flattenQueryParams`, is dead in this package.

7. **The `query()` method has no `endpointName` parameter.** The endpoint name is buried in `req.name`, which is typed optional. If the caller forgets, the URL silently becomes `/api/serving-endpoints//invocations` (double slash). A signature like `query(endpointName: string, req: QueryEndpointInput, options?: CallOptions)` would catch the missing path parameter at the type level.

8. **No streaming support despite `stream: boolean`.** `QueryEndpointInput.stream` is a passthrough to the wire format, but `client.query()` always reads the full response body via `readAll`. Setting `stream: true` will either produce a malformed response or a parse failure. The field name promises a capability the SDK doesn't deliver.

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
| `n` (in `QueryEndpointInput`)  | "Number of candidates" (mirrors OpenAI's `n`). |
| Usage context                  | Free-form metadata recorded in the model-serving usage tracking table. |
| Extra params                   | Free-form parameters passed through to the underlying model API. |
| Served model                   | One model behind a serving endpoint (an endpoint can host several with traffic split). |
| Dataframe split / records      | Two of `pandas.DataFrame.to_dict`'s orientations, used for traditional MLflow models. |
| Instances / inputs             | Tensor-input shapes — `instances` is row-major, `inputs` is column-major. |

---

## File coverage

| File              | Lines | Read in full |
|-------------------|-------|--------------|
| `src/v1/model.ts` | 343   | yes          |
| `src/v1/client.ts`| 83    | yes          |
| `src/v1/utils.ts` | 151   | yes          |
| `src/v1/index.ts` | 22    | yes          |
