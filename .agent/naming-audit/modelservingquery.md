# Naming Audit: `modelservingquery` (v1)

**Package:** `@databricks/sdk-modelservingquery`
**Path:** `/home/parth.bansal/sdk-js/packages/modelservingquery/`
**Version audited:** `v1`

**Total weird names flagged:** 8

Rescanned on 2026-06-02 against the current generated output. Line numbers were
refreshed to the current source.

---

## Summary table

| #  | Severity | Location                          | Name                                                         | Category                                     |
|----|----------|-----------------------------------|--------------------------------------------------------------|----------------------------------------------|
| 1  | High     | `model.ts` interface              | `V1ResponseChoiceElement`                                    | Version segment leaked into type name; empty `Element` suffix |
| 2  | High     | `model.ts` interface              | `EmbeddingsV1ResponseEmbeddingElement`                       | Version segment leaked into type name; empty `Element` suffix |
| 3  | High     | `model.ts` interface              | `ExternalModelUsageElement`                                  | Misleading scope ("External" implies non-Databricks) and "Element" suffix is meaningless |
| 4  | High     | `model.ts` interface              | `QueryEndpointInputRequest_ExtraParamsEntry`                 | Proto-architectural-leak: `_Entry` is Protobuf map-entry generator suffix |
| 5  | High     | `model.ts` interface              | `QueryEndpointInputRequest_UsageContextEntry`                | Proto-architectural-leak: `_Entry` is Protobuf map-entry generator suffix |
| 6  | Medium   | `client.ts` method                | `query()`                                                    | Verb-tense / reserved-word feel; conflicts with SQL packages |
| 7  | Medium   | `model.ts` enum                   | `ChatMessageRole`                                            | Redundant `Message` segment — values are roles of the speaker, not types of message |
| 8  | Low      | `model.ts` enum value             | `ChatMessageRole.ASSISTANT`                                  | OK, but missing common values (`tool`, `function`) — incomplete enum |

---

## High severity

### 1. `V1ResponseChoiceElement` — version segment in type name + empty `Element` suffix

**Location:** `src/v1/model.ts:185-196`

**Categories:** 7 (overly verbose), 8 (empty suffix), 14 (Go/Java-style names)

```ts
export interface V1ResponseChoiceElement { ... }
```

The `V1` prefix duplicates the directory it lives in (`src/v1/`). When a hypothetical v2 ships, the type will be either `V2ResponseChoiceElement` (now-impossible name collision with whatever the new shape is called) or renamed (breaking change). The `Element` suffix is also empty — the type is the choice itself, not an "element of a choice." `Choice` (no prefix, no suffix) would suffice — `QueryEndpointResponse.choices: Choice[]` reads cleanly. v2-style versioning should live exclusively in the import path, not in identifiers.

### 2. `EmbeddingsV1ResponseEmbeddingElement` — version leak + empty `Element` suffix

**Location:** `src/v1/model.ts:58-65`

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

### 4. `QueryEndpointInputRequest_ExtraParamsEntry` — proto map-entry leak

**Location:** `src/v1/model.ts:142-145`

**Why:** Underscore-separated `_ExtraParamsEntry` suffix is the verbatim Protobuf code-generator pattern for the synthetic map-entry message that backs `map<string, string> extra_params`. The type is exported but never referenced by the client or by `marshalQueryEndpointInputRequestSchema`, which uses `z.record(z.string(), z.string())` directly. The accompanying `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` directive on line 141 explicitly acknowledges the leak. A TS SDK consumer has no need for the map-entry container shape; only the `Record<string, string>` itself.

**Category:** proto-architectural-leak (Protobuf generator artefact: `_Entry` map-entry message)

**Suggested:** Delete the exported type entirely. A `Record<string, string>` alias is already the idiomatic TS surface for a string-to-string map.

**Rationale:** `_Entry` types are a proto-generator implementation detail (`map<K, V>` lowers to a hidden nested message named `<FieldName>Entry`). Re-exporting them through a TS SDK forces language-specific generator scaffolding into the public API. The file's own ESLint disable comment is direct evidence that the name violates the project's naming convention — it is suppressed rather than fixed.

### 5. `QueryEndpointInputRequest_UsageContextEntry` — proto map-entry leak

**Location:** `src/v1/model.ts:148-151`

**Why:** Same proto-architectural leak as finding #4, applied to the `usage_context` map field. The interface is exported, never used in the schema (which uses `z.record(z.string(), z.string())`), and the file's own ESLint directive on line 147 labels it "Proto-style nested message name." Duplicate leak from the same generator template.

**Category:** proto-architectural-leak (Protobuf generator artefact: `_Entry` map-entry message)

**Suggested:** Delete the exported type entirely; `Record<string, string>` is the natural TS surface.

**Rationale:** Mirror of #4. Two `_Entry` exports inflate the package surface area with proto-internal types that have no meaningful TS use case. They are a recurring pattern across packages with map fields, suitable for generator-level suppression.

---

## Medium severity

### 6. `query()` — verb-tense / reserved-word feel

**Location:** `src/v1/client.ts:59-86`

**Categories:** 13 (verb-tense), 10 (reserved-word collision), 17 (inconsistent action verb)

```ts
/** Query a serving endpoint */
async query(req: QueryEndpointInputRequest, options?: CallOptions): Promise<QueryEndpointResponse> { ... }
```

The method is named `query` — a verb that doubles as the common SQL noun, and that already exists as a method on `IDBDatabase` and on the unrelated `queries` package. `invoke`, `predict`, or `call` would match the underlying REST verb (`POST /invocations`) and would not collide with SQL nomenclature. Also: the method signature omits `endpointName` as a first arg — it has to be supplied inside the input as `req.name`, which conflates the URL parameter with the request body.

### 7. `ChatMessageRole` enum — redundant `Message` segment

**Location:** `src/v1/model.ts:17-23`

**Category:** 8 (redundant segment)

```ts
/** The role of the message. One of [system, user, assistant]. */
export enum ChatMessageRole {
  CHAT_MESSAGE_ROLE_UNSPECIFIED = 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}
```

The values are not types of "chat message" — they are types of speaker / agent. `ChatRole` (drop `Message`) would parse more naturally because the *role* belongs to the *speaker*, not the *message*. The OpenAI vocabulary that this mirrors uses `role` (not `messageRole`) for the same reason.

---

## Low severity

### 8. `ChatMessageRole.ASSISTANT` — incomplete enum

**Location:** `src/v1/model.ts:17-23`

**Category:** 6 (misleading names)

```ts
export enum ChatMessageRole {
  CHAT_MESSAGE_ROLE_UNSPECIFIED = 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}
```

Four values (counting the proto-style `UNSPECIFIED` sentinel), but the OpenAI spec also includes `tool` and `function` (and recent versions add `developer`). The enum is *closed* in TS (an exhaustive switch matches only 4 cases), so the wire format can outgrow the enum. The enum should include the OpenAI-mandated values. Naming-adjacent; flagged because the SDK is meant to broker LLM traffic.
