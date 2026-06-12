# Naming Audit: `tables` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/uc/tables/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`, `src/v1/transport.ts`
**Package import path:** `@databricks/sdk-tables/v1`
**Domain:** Unity Catalog tables (`/api/2.1/unity-catalog/tables`,
`/api/2.1/unity-catalog/constraints`, `/api/2.1/unity-catalog/table-summaries`).

**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Summary (counts)

| Severity              | Count |
| --------------------- | ----- |
| **Total findings**    | **6** |

(Findings often span multiple audit categories; counts above are unique
findings.)

---

## Findings

### 1. `Kv` is a cryptic abbreviation in `DeltaRuntimePropertiesKvPairs` — category 5 (Cryptic abbreviations) and category 8 (Redundant suffixes)

**Symbol:** `DeltaRuntimePropertiesKvPairs` (model.ts:443).

**Issue:** `Kv` (key-value) is borderline cryptic for a TypeScript API; the
"Pairs" suffix is redundant if `Kv` already means key-value. The type holds
a single `Record<string, string>` field — both the prefix `Kv` and the
suffix `Pairs` redundantly state what the field's type already says.

**Suggested:** `DeltaRuntimeProperties` (drop `KvPairs` entirely; the field
content `deltaRuntimeProperties: Record<string, string>` makes it
self-describing).

---

### 2. `OptionSpec_OauthStage` / `OptionSpec_OptionType` proto-nested infix — file:line model.ts:253, 270

**Why:** Underscore-separated `OuterMessage_InnerEnum` naming is a literal
transcription of proto nested-enum scoping. The infix `_` and the
container-prefix on a sibling enum is a proto/grpc architectural leak;
TypeScript has no nested-enum concept.

**Category:** proto-architectural-leak (`Proto` infix / Go-Java nested-name
form).

**Suggested:** `OauthStage` and `OptionType` (drop the `OptionSpec_`
prefix) — or, if collision risk exists, `OptionOauthStage` /
`OptionTypeKind`.

**Rationale:** the `OptionSpec_` prefix exists solely to mirror the proto
nesting; the eslint-disable comments on lines 258, 280 acknowledge the
non-idiomatic shape.

---

### 3. `OptionSpec` type name carries a `Spec` config-suffix — file:line model.ts:601

**Why:** `Spec` is a generic config-style suffix that re-appears across
the file (`SecurableKindManifest`, `EffectivePredictiveOptimizationFlag`,
`SseEncryptionDetails`, `EncryptionDetails`). It echoes proto/k8s
"Spec"-shaped messages whose only job is to describe a struct.

**Category:** proto-architectural-leak (repeated `Spec` config-suffix).

**Suggested:** `Option` (the type already lives in `SecurableKindManifest.options`
and is self-describing) or `OptionDefinition`.

**Rationale:** the `Spec` suffix adds no domain meaning beyond "this is a
struct describing X" — a proto convention, not a TS one.

---

### 4. `SecurableKindManifest` type name — file:line model.ts:686

**Why:** `Manifest` is a config-style suffix (analogous to `Spec`/`Config`).
It tags the type as a descriptor message rather than a domain concept.

**Category:** proto-architectural-leak (config-suffix style).

**Suggested:** `SecurableKindCapabilities` (matches `capabilities` field
content) or fold into a richer `SecurableKind`-keyed structure.

**Rationale:** the type holds five fields (`securableType`, `securableKind`,
`assignablePrivileges`, `options`, `capabilities`) — the `Manifest` token
adds no information beyond "this is the descriptor".

---

### 5. `ColumnInfo`, `TableInfo`, `TableSummary` — repeated `Info`/`Summary` config-suffix — file:line model.ts:285, 747, 818

**Why:** `Info` and `Summary` are generic descriptor-suffixes used to
distinguish the wire/RPC message from the domain noun (`Column`, `Table`).
Two `…Info` types and a `…Summary` type in the same file flag this as a
repeated config-suffix pattern.

**Category:** proto-architectural-leak (repeated `Info` config-suffix).

**Suggested:** `Column`, `Table`, `TableOverview`.

**Rationale:** in a TS surface the noun *is* the type; the `Info`/`Summary`
tag exists only to disambiguate from the proto request/response messages
and from server-internal representations — a generator/architectural leak.

---

### 6. `EncryptionDetails` / `SseEncryptionDetails` — repeated `Details` config-suffix — file:line model.ts:477, 700

**Why:** Two `…Details` types in the same file. `Details` is a generic
"descriptor" suffix with no domain meaning — same family as `Info`/`Spec`.

**Category:** proto-architectural-leak (repeated `Details` config-suffix).

**Suggested:** `Encryption` and `SseEncryption` (or `SseEncryptionConfig`
if disambiguation is needed).

**Rationale:** `Details` is generator boilerplate for proto messages
wrapping `oneof`s or option blobs; idiomatic TS uses the bare domain noun.
