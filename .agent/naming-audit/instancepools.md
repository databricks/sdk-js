# Naming Audit: `instancepools` (v2)

**Package:** `@databricks/sdk-instancepools`
**Path:** `/home/parth.bansal/sdk-js/packages/instancepools/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts` (1178 lines, read in full)
- `src/v2/client.ts` (228 lines, read in full)
- `src/v2/utils.ts` (157 lines, read in full)
- `src/v2/index.ts` (37 lines, read in full)

---

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 3     |
| Medium       | 3     |
| Low          | 2     |
| **Total**    | **8** |

---

## 1. Findings

### 1.1 Misleading names

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `editInstancePool()` / `EditInstancePoolRequest` | Medium | Conventional REST/CRUD verb in TS is **update**. `clusterpolicies` (audit #M-01) and `clusters` make the same choice for the wire path `/edit`. Across-package inconsistency: most newer Databricks APIs use `update*`. Flag for upstream alignment. |
| M-02  | `InstancePoolStatus`                | High     | The type carries *only* `pendingInstanceErrors`. The name promises a general "status" but the shape exposes only errors. `InstancePoolPendingErrors` or `InstancePoolFailures` would be more truthful. (`InstancePoolState` is the actual lifecycle state, on the entity itself.) |
| M-03  | `InstancePoolAndStats`              | High     | The "AndStats" suffix implies it carries the pool *plus* statistics, but the type also carries `status`, `state`, `defaultTags`, and all 16 configuration fields. The "And" naming pattern is a Go-style listing-result idiom — TS readers expect just a single entity name. Consider `InstancePoolSummary` or `InstancePoolListEntry`. |

### 1.2 Go / Java-style names

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `InstancePoolAndStats` (the "X-AndY" naming pattern) | Medium | "And" combinators in type names are a Go-isms (e.g., `ResultAndError`). TS usually picks a concept name. |

### 1.3 Inconsistent action verbs

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editInstancePool()` vs ecosystem-standard `update` | Medium | Same as `clusterpolicies` AV-01. Driven by wire path `/edit`. Newer Databricks resources expose `update*`. Cross-package inconsistency. |

### 1.4 Type-suffix tautology

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstancePoolAndStats`              | High     | Tautological + Go-style "And"-joiner (G-01). Doubly off. |

### 1.5 Proto-architectural leaks

### 1. `marshalCreateInstancePoolRequestSchema` / `unmarshalCreateInstancePoolResponseSchema` (and 26 sibling marshal/unmarshal exports) — model.ts:961, 675, 684, 687, 703, 720, 730, 743, 746, 806, 866, 881, 892, 905, 919, 930, 941, 950, 1009, 1017, 1033, 1057, 1067, 1086, 1136, 1150, 1160, 1172

**Why:** `marshal` / `unmarshal` are proto/Go-codegen verbs (cf. Go's
`proto.Marshal` / `proto.Unmarshal`, `encoding/json.Marshal`). TypeScript
convention is `encode` / `decode`, `serialize` / `deserialize`, or
`toJson` / `fromJson` (cf. zod's own `parse` / `safeParse`).
**Category:** Proto verb leak.
**Suggested:** Rename to `encode*Schema` / `decode*Schema` (or
`serialize*` / `parse*`).
**Rationale:** The verb pair betrays the Go-SDK ancestry; TS consumers
will not recognise it as the standard name for JSON shape transformation.

### 2. `_req: ListInstancePoolsRequest` parameter on `listInstancePools` — client.ts:202

**Why:** Empty request type generated from a proto with no fields,
threaded into the public method signature and leading-underscored to
silence ESLint. The parameter exists only because the generator
preserves the proto-RPC `request → response` shape; TS-native APIs would
expose `listInstancePools(options?: CallOptions)`.
**Category:** Proto-RPC signature leak.
**Suggested:** Drop the parameter; expose `listInstancePools(options?)`.
**Rationale:** Removing the parameter eliminates the empty-shape proto
artefact and the leading underscore at the same time.

---

## 2. Severity totals (recap)

| Severity     | Count |
| ------------ | ----- |
| High         | 3     |
| Medium       | 3     |
| Low          | 2     |
| **Total**    | **8** |
