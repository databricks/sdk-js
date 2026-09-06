# Naming Audit: `modelservingquery` (v1)

**Package:** `@databricks/sdk-modelservingquery`
**Path:** `/home/parth.bansal/sdk-js/packages/modelservingquery/`
**Version audited:** `v1`

**Total weird names flagged:** 5

---

## Summary table

| #  | Severity | Location                          | Name                                                         | Category                                     |
|----|----------|-----------------------------------|--------------------------------------------------------------|----------------------------------------------|
| 1  | High     | `model.ts` interface              | `V1ResponseChoiceElement`                                    | Version segment leaked into type name; empty `Element` suffix |
| 2  | High     | `model.ts` interface              | `EmbeddingsV1ResponseEmbeddingElement`                       | Version segment leaked into type name; empty `Element` suffix |
| 3  | High     | `model.ts` interface              | `ExternalModelUsageElement`                                  | Misleading scope ("External" implies non-Databricks) and "Element" suffix is meaningless |
| 4  | Medium   | `client.ts` method                | `query()`                                                    | Verb-tense / reserved-word feel; conflicts with SQL packages |
| 5  | Medium   | `model.ts` enum                   | `ChatMessageRole`                                            | Redundant `Message` segment — values are roles of the speaker, not types of message |

---

## High severity

### 1. `V1ResponseChoiceElement` — version segment in type name + empty `Element` suffix

**Location:** `src/v1/model.ts:187-198`

**Categories:** 7 (overly verbose), 8 (empty suffix), 14 (Go/Java-style names)

```ts
export interface V1ResponseChoiceElement { ... }
```

The `V1` prefix duplicates the directory it lives in (`src/v1/`). When a hypothetical v2 ships, the type will be either `V2ResponseChoiceElement` (now-impossible name collision with whatever the new shape is called) or renamed (breaking change). The `Element` suffix is also empty — the type is the choice itself, not an "element of a choice." `Choice` (no prefix, no suffix) would suffice — `QueryEndpointResponse.choices: Choice[]` reads cleanly. v2-style versioning should live exclusively in the import path, not in identifiers.

### 2. `EmbeddingsV1ResponseEmbeddingElement` — version leak + empty `Element` suffix

**Location:** `src/v1/model.ts:72-79`

**Categories:** 7 (overly verbose), 8 (empty suffix)

```ts
export interface EmbeddingsV1ResponseEmbeddingElement {
  embedding?: number[] | undefined;
  index?: number | undefined;
  object?: EmbeddingsV1ResponseEmbeddingElementObject | undefined;
}
```

Same `V1` leak as finding #1. The `Element` suffix is empty — the type is the single embedding, not an "element of an embedding." `Embedding` (no prefix, no suffix) would convey the same data cleanly.

### 3. `ExternalModelUsageElement` — misleading scope + meaningless suffix

**Location:** `src/v1/model.ts:81-88`

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

---

## Medium severity

### 4. `query()` — verb-tense / reserved-word feel

**Location:** `src/v1/client.ts:59-86`

**Categories:** 13 (verb-tense), 10 (reserved-word collision), 17 (inconsistent action verb)

```ts
/** Query a serving endpoint */
async query(req: QueryEndpointRequest, options?: CallOptions): Promise<QueryEndpointResponse> { ... }
```

The method is named `query` — a verb that doubles as the common SQL noun, and that already exists as a method on `IDBDatabase` and on the unrelated `queries` package. `invoke`, `predict`, or `call` would match the underlying REST verb (`POST /invocations`) and would not collide with SQL nomenclature. Also: the method signature omits `endpointName` as a first arg — it has to be supplied inside the input as `req.name`, which conflates the URL parameter with the request body.

### 5. `ChatMessageRole` enum — redundant `Message` segment

**Location:** `src/v1/model.ts:17-27`

**Category:** 8 (redundant segment)

```ts
/** The role of the message. One of [system, user, assistant]. */
export const ChatMessageRole = {
  CHAT_MESSAGE_ROLE_UNSPECIFIED: 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;
export type ChatMessageRole =
  | (typeof ChatMessageRole)[keyof typeof ChatMessageRole]
  | (string & {});
```

The values are not types of "chat message" — they are types of speaker / agent. `ChatRole` (drop `Message`) would parse more naturally because the *role* belongs to the *speaker*, not the *message*. The OpenAI vocabulary that this mirrors uses `role` (not `messageRole`) for the same reason.
