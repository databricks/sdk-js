# Naming Audit: `instancepools` (v2)

**Package:** `@databricks/sdk-instancepools`
**Path:** `/home/parth.bansal/sdk-js/packages/instancepools/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts` (1250 lines, read in full)
- `src/v2/client.ts` (224 lines, read in full)
- `src/v2/utils.ts` (156 lines, read in full)
- `src/v2/index.ts` (43 lines, read in full)

---

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 3     |
| Medium       | 3     |
| Low          | 25    |
| Observation  | 2     |
| **Total**    | **33**|

---

## 1. Findings

### 1.1 Cryptic abbreviations — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | `EbsVolumeType` (acronym in name)   | Low      | EBS = Elastic Block Store. Well-known among AWS users; OK. |
| C-02  | `LRS` in `AzureDiskVolumeType.PREMIUM_LRS` / `STANDARD_LRS` | Low | "Locally Redundant Storage" — standard Azure term. JSDoc explains; OK. |

### 1.2 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `editInstancePool()` / `EditInstancePoolRequest` | Medium | Conventional REST/CRUD verb in TS is **update**. `clusterpolicies` (audit #M-01) and `clusters` make the same choice for the wire path `/edit`. Across-package inconsistency: most newer Databricks APIs use `update*`. Flag for upstream alignment. |
| M-02  | `InstancePoolStatus`                | High     | The type carries *only* `pendingInstanceErrors`. The name promises a general "status" but the shape exposes only errors. `InstancePoolPendingErrors` or `InstancePoolFailures` would be more truthful. (`InstancePoolState` is the actual lifecycle state, on the entity itself.) |
| M-03  | `InstancePoolAndStats`              | High     | The "AndStats" suffix implies it carries the pool *plus* statistics, but the type also carries `status`, `state`, `defaultTags`, and all 28 configuration fields. The "And" naming pattern is a Go-style listing-result idiom — TS readers expect just a single entity name. Consider `InstancePoolSummary` or `InstancePoolListEntry`. |

### 1.3 Overly verbose / Redundant suffixes — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `PendingInstanceError`              | Low      | Three-word type for two-field shape (`instanceId`, `message`). OK. |

### 1.4 Singular / plural mismatches — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `preloadedDockerImages: DockerImage[]` | Low | Plural array; JSDoc says "Custom Docker Image BYOC" but the field accepts multiple. OK. |
| P-02  | `ListInstancePoolsRequest` (request) vs `listInstancePools()` (method) | Low | Consistent plural. |
| P-03  | `ListInstancePoolsResponse.instancePools: InstancePoolAndStats[]` | Low | Plural array — correct. |

### 1.5 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | `DockerImage.credsOneof.$case === 'basicAuth'.basicAuth: DockerBasicAuth` | Low | `basicAuth` is not a reserved word but is duplicated across the `$case` discriminator and the embedded field — `library.lib.basicAuth.basicAuth` style access. |
| R-02  | None of the type names collide with TS reserved words. | — | OK. |

### 1.6 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createInstancePool`, `deleteInstancePool`, `editInstancePool`, `getInstancePool`, `listInstancePools` | Low | All present-tense imperative — consistent. |
| T-02  | `preloadedDockerImages`, `preloadedSparkVersions` (past participle) | Low | Standard for fields that describe a pre-applied state. OK. |

### 1.7 Go / Java-style names — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `InstancePoolAndStats` (the "X-AndY" naming pattern) | Medium | "And" combinators in type names are a Go-isms (e.g., `ResultAndError`). TS usually picks a concept name. |

### 1.8 Generic field names losing meaning — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `DockerImage.url` (outside of `DockerImage`) | Low | Standard. OK in context. |
| F-02  | `DockerBasicAuth.username` / `password` | Low | Standard. OK. |
| F-03  | `InstancePoolStatus.pendingInstanceErrors[]` | Low | OK. |
| F-04  | `NodeTypeFlexibility.alternateNodeTypeIds` (outside the wrapper) | Low | Standalone, `alternateNodeTypeIds: string[]` is clear. OK. |

### 1.9 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| K-01  | None observed. All fields are within their type's domain. | — | OK. |

### 1.10 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editInstancePool()` vs ecosystem-standard `update` | Medium | Same as `clusterpolicies` AV-01. Driven by wire path `/edit`. Newer Databricks resources expose `update*`. Cross-package inconsistency. |
| AV-02 | `getInstancePool()` (singular) vs `listInstancePools()` (plural) | Low | Correct REST convention. OK. |
| AV-03 | `createInstancePool()` / `deleteInstancePool()` / `editInstancePool()` / `getInstancePool()` / `listInstancePools()` — only five verbs | Low | No `start`, `stop`, `pin`, etc. — instance pools are stateless from the API standpoint; the lifecycle is implicit via fewer endpoints than `clusters`. Consistent. |

### 1.11 Long enum values — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| L-01  | `EbsVolumeType.THROUGHPUT_OPTIMIZED_HDD` (24 chars) | Low | Standard AWS terminology; OK. |
| L-02  | `AzureDiskVolumeType.STANDARD_LRS` (12 chars) | Low | Short. OK. |

### 1.12 Underspecified IDs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instancePoolId`                    | Low      | Well-specified — scope = instance pool. No collisions. OK. |
| I-02  | `nodeTypeId`                        | Low      | Scoped correctly. OK. |
| I-03  | `PendingInstanceError.instanceId`   | Low      | Scoped. OK. |
| I-04  | `policyFamilyId` is *not* in this package; `clusterId` is *not* in this package — only `instancePoolId` and `nodeTypeId` IDs appear. | Observation | Clean. |
| I-05  | `NodeTypeFlexibility.alternateNodeTypeIds: string[]` | Low | Plural array of node-type IDs; scoped. OK. |
| I-06  | `InstancePoolAwsAttributes.zoneId` / `InstancePoolGcpAttributes.zoneId` | Low | Both reuse `zoneId` for the AWS availability zone ("us-west-2a") and GCP availability zone ("us-west1-a"). Same name, two slightly different value formats. Acceptable cross-cloud abstraction. |

### 1.13 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstancePoolAndStats`              | High     | Tautological + Go-style "And"-joiner (G-01). Doubly off. |
| TS-02 | `NodeTypeFlexibility`               | Low      | "Flexibility" is the noun-form of a feature, not a type-suffix tautology. OK. |
| TS-03 | `DiskSpec`                          | Low      | `Spec` is acceptable, but combined with each field's `disk*` prefix the type-name still echoes. |
| TS-04 | `EbsVolumeType`, `AzureDiskVolumeType` | Low | `VolumeType` / `DiskVolumeType` — standard cloud-storage terminology. OK. |

### 1.14 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `client.ts:199` `_req: ListInstancePoolsRequest` for empty request type | Observation | Generator artefact: empty request type still produced and prefixed `_` to satisfy lint. |

### 1.15 Proto-architectural leaks

### 1. `CreateInstancePoolRequest_CustomTagsEntry` — model.ts:168

**Why:** Proto-nested map-entry type. Protobuf compiles `map<K,V>` fields
into a synthetic `*_Entry` message; TypeScript expresses maps as
`Record<K,V>` and never needs this entry shape. The type is exported but
unused by the request, which uses `Record<string, string>` directly
(line 122).
**Category:** Proto suffix/infix.
**Suggested:** Delete the type.
**Rationale:** Dead proto-codegen artefact with no consumer in TS.

### 2. `EditInstancePoolRequest_CustomTagsEntry` — model.ts:349

**Why:** Same proto-map-entry artefact as #1.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #1.

### 3. `GetInstancePoolResponse_CustomTagsEntry` — model.ts:470

**Why:** Same proto-map-entry artefact as #1 — Protobuf's synthetic
`*_Entry` message for a `map<K,V>` field, which TypeScript expresses as
`Record<K,V>`. The type is exported but has no TS consumer.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #1.

### 4. `GetInstancePoolResponse_DefaultTagsEntry` — model.ts:486

**Why:** Same proto-map-entry artefact as #1.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #1.

### 5. `InstancePoolAndStats_CustomTagsEntry` — model.ts:599

**Why:** Same proto-map-entry artefact as #1.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #1.

### 6. `InstancePoolAndStats_DefaultTagsEntry` — model.ts:615

**Why:** Same proto-map-entry artefact as #1.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #1.

### 7. `marshalCreateInstancePoolRequestSchema` / `unmarshalCreateInstancePoolResponseSchema` (and 26 sibling marshal/unmarshal exports) — model.ts:747, 756, 759, 775, 792, 802, 815, 818, 878, 938, 953, 964, 977, 991, 1002, 1013, 1022, 1033, 1081, 1089, 1105, 1129, 1139, 1158, 1208, 1222, 1232, 1244

**Why:** `marshal` / `unmarshal` are proto/Go-codegen verbs (cf. Go's
`proto.Marshal` / `proto.Unmarshal`, `encoding/json.Marshal`). TypeScript
convention is `encode` / `decode`, `serialize` / `deserialize`, or
`toJson` / `fromJson` (cf. zod's own `parse` / `safeParse`).
**Category:** Proto verb leak.
**Suggested:** Rename to `encode*Schema` / `decode*Schema` (or
`serialize*` / `parse*`).
**Rationale:** The verb pair betrays the Go-SDK ancestry; TS consumers
will not recognise it as the standard name for JSON shape transformation.

### 8. `_req: ListInstancePoolsRequest` parameter on `listInstancePools` — client.ts:199

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
| Low          | 25    |
| Observation  | 2     |
| **Total**    | **33**|
