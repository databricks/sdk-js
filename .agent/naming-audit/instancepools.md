# Naming Audit: `instancepools` (v2)

**Package:** `@databricks/sdk-instancepools`
**Path:** `/home/parth.bansal/sdk-js/packages/instancepools/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts` (1259 lines, read in full)
- `src/v2/client.ts` (223 lines, read in full)
- `src/v2/utils.ts` (150 lines, read in full)
- `src/v2/index.ts` (43 lines, read in full)

**Inferred domain:** Databricks instance-pool lifecycle (create / edit / get /
delete / list) of pre-warmed cloud VMs that clusters can draw from. Carries
per-cloud (AWS / Azure / GCP) attributes, disk specifications, Docker preload
configuration, idle / used statistics, and pending-instance failure reporting.

---

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 9     |
| Medium       | 7     |
| Low          | 16    |
| Observation  | 7     |
| **Total**    | **39**|

### Top themes

1. **Massive structural duplication.** `CreateInstancePoolRequest` (28 fields),
   `EditInstancePoolRequest` (29 fields), `GetInstancePoolRequest_Response`
   (30 fields), and `InstancePoolAndStats` (30 fields) are byte-identical
   apart from one or two fields. They could share a single base type.
2. **Cross-package shape duplication** — eleven types/enums are duplicated
   verbatim between this package and `clusters`. A shared `compute` module
   would eliminate the dual maintenance burden.

---

## 1. Inventory

### 1.1 Enums (`model.ts`)

| Name                  | Members                                            | Lines      |
| --------------------- | -------------------------------------------------- | ---------- |
| `AwsAvailability`     | `SPOT`, `ON_DEMAND`, `SPOT_WITH_FALLBACK`          | 10-20      |
| `AzureAvailability`   | `SPOT_AZURE`, `ON_DEMAND_AZURE`, `SPOT_WITH_FALLBACK_AZURE` | 26-36 |
| `AzureDiskVolumeType` | `PREMIUM_LRS`, `STANDARD_LRS`                      | 42-47      |
| `EbsVolumeType`       | `GENERAL_PURPOSE_SSD`, `THROUGHPUT_OPTIMIZED_HDD`  | 53-58      |
| `GcpAvailability`     | `PREEMPTIBLE_GCP`, `ON_DEMAND_GCP`, `PREEMPTIBLE_WITH_FALLBACK_GCP` | 64-68 |
| `InstancePoolState`   | `ACTIVE`, `STOPPED`, `DELETED`                     | 78-88      |

### 1.2 Interfaces (`model.ts`)

| Name                                                | Lines    | Purpose                                            |
| --------------------------------------------------- | -------- | -------------------------------------------------- |
| `CreateInstancePoolRequest`                         | 90-165   | Request body for create — 28 fields.               |
| `CreateInstancePoolRequest_CustomTagsEntry`         | 168-181  | Proto-nested tag entry, dead in TS.                |
| `CreateInstancePoolRequest_Response`                | 184-187  | Response with single `instancePoolId`.             |
| `DeleteInstancePoolRequest`                         | 189-192  | `{ instancePoolId?: string }`.                     |
| `DeleteInstancePoolRequest_Response`                | 195      | Empty `{}`.                                        |
| `DiskSpec`                                          | 203-241  | Disk-attachment spec.                              |
| `DiskType`                                          | 244-249  | Disc-union wrapper for EBS or Azure disk types.    |
| `DockerBasicAuth`                                   | 251-256  | `{ username, password }`.                          |
| `DockerImage`                                       | 258-268  | `{ url, credsOneof }`.                             |
| `EditInstancePoolRequest`                           | 270-347  | Request body for edit — 29 fields.                 |
| `EditInstancePoolRequest_CustomTagsEntry`           | 350-363  | Same as the Create variant — duplicate.            |
| `EditInstancePoolRequest_Response`                  | 366      | Empty `{}`.                                        |
| `GetInstancePoolRequest`                            | 368-371  | `{ instancePoolId?: string }`.                     |
| `GetInstancePoolRequest_Response`                   | 374-469  | 30 fields — superset of `CreateInstancePoolRequest` plus statistics. |
| `GetInstancePoolRequest_Response_CustomTagsEntry`   | 472-485  | Third duplicate of the tag-entry shape.            |
| `GetInstancePoolRequest_Response_DefaultTagsEntry`  | 488-501  | Fourth duplicate of the tag-entry shape.           |
| `InstancePoolAndStats`                              | 503-598  | 30 fields — duplicate of `GetInstancePoolRequest_Response`. |
| `InstancePoolAndStats_CustomTagsEntry`              | 601-614  | Fifth duplicate of the tag-entry shape.            |
| `InstancePoolAndStats_DefaultTagsEntry`             | 617-630  | Sixth duplicate of the tag-entry shape.            |
| `InstancePoolAwsAttributes`                         | 633-668  | AWS-specific config.                               |
| `InstancePoolAzureAttributes`                       | 671-682  | Azure-specific config.                             |
| `InstancePoolGcpAttributes`                         | 685-707  | GCP-specific config.                               |
| `InstancePoolStats`                                 | 709-718  | Idle/used counters.                                |
| `InstancePoolStatus`                                | 720-728  | Wraps `pendingInstanceErrors`.                     |
| `ListInstancePoolsRequest`                          | 731      | Empty `{}`.                                        |
| `ListInstancePoolsRequest_Response`                 | 734-736  | Wraps `instancePools` array.                       |
| `NodeTypeFlexibility`                               | 739-742  | Wraps `alternateNodeTypeIds`.                      |
| `PendingInstanceError`                              | 745-748  | `{ instanceId, message }`.                         |

### 1.3 Methods (`client.ts`)

| Method               | HTTP   | URL path                          | Returns                              |
| -------------------- | ------ | --------------------------------- | ------------------------------------ |
| `createInstancePool` | POST   | `/api/2.0/instance-pools/create`  | `CreateInstancePoolRequest_Response` |
| `deleteInstancePool` | POST   | `/api/2.0/instance-pools/delete`  | `DeleteInstancePoolRequest_Response` |
| `editInstancePool`   | POST   | `/api/2.0/instance-pools/edit`    | `EditInstancePoolRequest_Response`   |
| `getInstancePool`    | GET    | `/api/2.0/instance-pools/get`     | `GetInstancePoolRequest_Response`    |
| `listInstancePools`  | GET    | `/api/2.0/instance-pools/list`    | `ListInstancePoolsRequest_Response`  |

### 1.4 Other identifiers

- `client.ts`: `PACKAGE_SEGMENT` constant; `Client` class with private fields
  `host`, `httpClient`, `logger`, `userAgent`.
- `utils.ts`: `HttpCallOptions` interface; functions `executeCall`,
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `flattenQueryParams`.

---

## 2. Findings

### 2.1 Vague / generic names

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `DockerImage.credsOneof`            | High     | `credsOneof` is a Go/proto-codegen leak — TS readers do not know what "Oneof" means in this context (the wire field uses a protobuf `oneof`). The "creds" abbreviation is also generic. Should be `credentials` (and the union shape itself satisfies the discriminator). |
| V-02  | `PendingInstanceError.message`      | Medium   | `message` is generic. Could be `errorMessage` to match the type's purpose, or the type itself could be flattened. |
| V-03  | `readAll` (`utils.ts:40`)           | Low      | Standard name for a read-to-end helper. |
| V-04  | `Call` type imported from core      | Observation | Single-letter capitalized name; comes from `@databricks/sdk-core/api`. Out of scope. |
| V-05  | `DockerImage.url` JSDoc only says "URL of the docker image" — but the field name `url` is already generic at the value-level when destructured outside `DockerImage`. | Low | Acceptable inside the type. |

### 2.2 Acronym casing inconsistencies — High

| ID    | Symbol                                | Severity | Issue |
| ----- | ------------------------------------- | -------- | ----- |
| A-01  | `InstancePoolAwsAttributes`           | High     | Google TS style says acronyms ≥3 chars get only-first-letter capitalised ("AWS" → "Aws"). The repo follows this (Aws/Azure/Gcp). Acceptable, but contrasts with `EbsVolumeType` where `Ebs` is only 3 chars (same rule, applied consistently). No defect — listed for parity with related audits. |
| A-02  | `InstancePoolGcpAttributes.gcpAvailability` | High | The field name re-states the cloud already implied by the parent type `InstancePoolGcpAttributes`. Compare with `InstancePoolAwsAttributes.availability` (line 635) and `InstancePoolAzureAttributes.availability` (line 673) — both unprefixed. Three sibling types, two conventions. Should be `InstancePoolGcpAttributes.availability`. |
| A-03  | `InstancePoolAwsAttributes.instanceProfileArn` | Low | "Arn" applies Google TS style for ≥3-char acronyms. Compare with `EbsVolumeType` (same package) and consistent. OK. |
| A-04  | `InstancePoolGcpAttributes.localSsdCount` | Low | "Ssd" is 3 letters; same casing rule. OK. |
| A-05  | `InstancePoolAzureAttributes.spotBidMaxPrice` vs `InstancePoolAwsAttributes.spotBidPricePercent` | Medium | Sibling fields describe the same concept (max price for spot bid) in opposite shapes. `MaxPrice` is an absolute USD value; `PricePercent` is relative. Names obscure this — `azureSpotBidMaxPriceUsd` and `awsSpotBidPricePercent` (or any clarifying suffix) would help. |

### 2.3 Cryptic abbreviations — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | `DockerImage.credsOneof`            | High (also V-01) | `creds` and `Oneof` are both opaque outside Go/proto context. |
| C-02  | `BYOC` in JSDoc `"Custom Docker Image BYOC"` (`model.ts:141, 323, 445, 574`) | Medium | "Bring Your Own Container" not expanded. External readers will not know. |
| C-03  | `EbsVolumeType` (acronym in name)   | Low      | EBS = Elastic Block Store. Well-known among AWS users; OK. |
| C-04  | `LRS` in `AzureDiskVolumeType.PREMIUM_LRS` / `STANDARD_LRS` | Low | "Locally Redundant Storage" — standard Azure term. JSDoc explains; OK. |
| C-05  | `req`, `resp`, `httpReq`, `respBody` locals in `client.ts` | Low | Method-local; OK. |
| C-06  | `opts` (`utils.ts:66`)              | Low      | Inside function scope; OK. |
| C-07  | `Mb/s` in JSDoc `"configurable throughput (in Mb/s)"` (`model.ts:161, 343, 465, 594`) | Low | Likely intended `MB/s` (megabytes per second) given the cloud-disk-throughput context; `Mb/s` (megabits) is unusual for disk throughput. Possible casing typo upstream. |

### 2.4 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `editInstancePool()` / `EditInstancePoolRequest` | Medium | Conventional REST/CRUD verb in TS is **update**. `clusterpolicies` (audit #M-01) and `clusters` make the same choice for the wire path `/edit`. Across-package inconsistency: most newer Databricks APIs use `update*`. Flag for upstream alignment. |
| M-02  | `InstancePoolStatus`                | High     | The type carries *only* `pendingInstanceErrors`. The name promises a general "status" but the shape exposes only errors. `InstancePoolPendingErrors` or `InstancePoolFailures` would be more truthful. (`InstancePoolState` is the actual lifecycle state, on the entity itself.) |
| M-03  | `InstancePoolAndStats`              | High     | The "AndStats" suffix implies it carries the pool *plus* statistics, but the type also carries `status`, `state`, `defaultTags`, and all 28 configuration fields. The "And" naming pattern is a Go-style listing-result idiom — TS readers expect just a single entity name. Consider `InstancePoolSummary` or `InstancePoolListEntry`. |
| M-04  | `DiskSpec.diskCount`, `diskSize`, `diskIops`, `diskThroughput` | Low | Repetition of the `disk` prefix inside a type named `DiskSpec`. Inside the type, `count` / `size` / `iops` / `throughput` would suffice. Same pattern as `clusters.md` flagged elsewhere. |
| M-05  | `DiskSpec.diskIops` (no JSDoc) and `diskSpec.diskThroughput` (no JSDoc) — `model.ts:239-240` | Low | Two fields with no JSDoc. Hard to know the unit without context. (Compare neighbouring `diskSize` which documents "GiB".) |
| M-06  | `preloadedDockerImages` is plural but JSDoc says "Custom Docker Image BYOC" (singular) — `model.ts:141, 323, 445, 574` | Low | Field is `DockerImage[]`. Plural correctly matches type, but the JSDoc is misleading. |
| M-07  | `preloadedSparkVersions: string[]` with JSDoc "A list containing at most one preloaded Spark image version" | High | Type is `string[]` but the JSDoc enforces a max length of 1. If only one value is allowed, the field should be `preloadedSparkVersion?: string` (singular). The array shape misleads callers into thinking they can pass several. |
| M-08  | `InstancePoolStats.usedCount` / `idleCount` / `pendingUsedCount` / `pendingIdleCount` | Low | Adequate, but `usedCount` is ambiguous about what "used" means. JSDoc clarifies ("part of a cluster") — without it, readers might think "used = ever used". |

### 2.5 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `idleInstanceAutoterminationMinutes` (5-word identifier, present in 4 types) | Medium | 33-char field. Inside a type called `CreateInstancePoolRequest` etc., `idleAutoterminationMinutes` or `idleTimeoutMinutes` would be 27 / 18 chars. The wire uses `idle_instance_autotermination_minutes` so any change is generator-side. |
| O-02  | `PendingInstanceError`              | Low      | Three-word type for two-field shape (`instanceId`, `message`). OK. |
| O-03  | `NodeTypeFlexibility.alternateNodeTypeIds` | Low | Field name re-states `node` twice (once from parent type, once in the field). Could be `alternates` or `fallbacks`. The wire path is the constraint. |
| O-04  | `totalInitialRemoteDiskSize`        | Low      | 25-char field, four concept words. Reasonable but heavy. |
| O-05  | `spotBidPricePercent`               | Low      | Five concept words crammed into one camelCase identifier. The JSDoc explains what each part means. |

### 2.6 Singular / plural mismatches — Low / High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `preloadedSparkVersions: string[]`  | High (also M-07) | Plural array type but the JSDoc constrains it to at most one element. |
| P-02  | `preloadedDockerImages: DockerImage[]` | Low | Plural array; JSDoc says "Custom Docker Image BYOC" but the field accepts multiple. OK. |
| P-03  | `ListInstancePoolsRequest` (request) vs `listInstancePools()` (method) | Low | Consistent plural. |
| P-04  | `ListInstancePoolsRequest_Response.instancePools: InstancePoolAndStats[]` | Low | Plural array — correct. |

### 2.7 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | `DockerImage.credsOneof.$case === 'basicAuth'.basicAuth: DockerBasicAuth` | Low | `basicAuth` is not a reserved word but is duplicated across the `$case` discriminator and the embedded field — `library.lib.basicAuth.basicAuth` style access. |
| R-02  | None of the type names collide with TS reserved words. | — | OK. |

### 2.8 Duplicate concepts — Highest in repo

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreateInstancePoolRequest` (28 fields, lines 90-165) vs `EditInstancePoolRequest` (29 fields, lines 270-347) | High | Identical except `EditInstancePoolRequest` adds `instancePoolId`. Could share a base type. |
| D-02  | `GetInstancePoolRequest_Response` (30 fields, lines 374-469) vs `InstancePoolAndStats` (30 fields, lines 503-598) | High | **Byte-identical** apart from the type name. Compare line-by-line: identical field set, identical order, identical JSDoc. Two names for the same shape. |
| D-03  | `CreateInstancePoolRequest` vs the `Pool` body inside `InstancePoolAndStats` | High | All 28 config fields appear three times: once on Create, once on Edit (29), once on the entity. Codegen could project from a shared base. |
| D-04  | `InstancePoolAwsAttributes` (this package) vs `AwsAttributes` (`clusters` package) | High | Same domain (AWS attributes for a compute pool / cluster). `clusters` calls them `AwsAttributes`; this package calls them `InstancePoolAwsAttributes`. Both share many fields (availability, zoneId, instanceProfileArn, spotBid…) but `clusters` has additional fields (`ebsVolumeCount`, etc.). Cross-package duplication; a shared `compute` module would fix both. |
| D-05  | `InstancePoolAzureAttributes` / `InstancePoolGcpAttributes` vs `clusters.AzureAttributes` / `clusters.GcpAttributes` | High | Same as D-04 for Azure / GCP. |
| D-06  | `EbsVolumeType`, `AzureDiskVolumeType`, `AwsAvailability`, `AzureAvailability`, `GcpAvailability`, `DockerImage`, `DockerBasicAuth`, `DiskSpec`, `DiskType`, `NodeTypeFlexibility`, `PendingInstanceError` | High | All eleven types/enums are duplicated verbatim in `clusters/src/v2/model.ts` (verified via `grep`). Two packages ship eleven identical shapes. |

### 2.9 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createInstancePool`, `deleteInstancePool`, `editInstancePool`, `getInstancePool`, `listInstancePools` | Low | All present-tense imperative — consistent. |
| T-02  | `preloadedDockerImages`, `preloadedSparkVersions` (past participle) | Low | Standard for fields that describe a pre-applied state. OK. |

### 2.10 Go / Java-style names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `DockerImage.credsOneof`            | High     | `Oneof` is a literal proto-keyword leak. No TS reader expects this. See V-01. |
| G-02  | `InstancePoolAndStats` (the "X-AndY" naming pattern) | Medium | "And" combinators in type names are a Go-isms (e.g., `ResultAndError`). TS usually picks a concept name. |
| G-03  | `httpClient`, `HttpClient` (vs `HTTPClient`) | Low | Google TS style uses `Http` (lowercased acronym) — consistent. |

### 2.11 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `DiskType.remoteVolumeType` (outside of `DiskType`) | Medium | When destructured, `remoteVolumeType: EbsVolumeType` reads as a category name colliding with the cloud-specific value. |
| F-02  | `DockerImage.url` (outside of `DockerImage`) | Low | Standard. OK in context. |
| F-03  | `DockerBasicAuth.username` / `password` | Low | Standard. OK. |
| F-04  | `PendingInstanceError.message`      | Medium (also V-02) | When destructured, an error `message` field is the generic-est possible name. Adding `instanceMessage` would help. |
| F-05  | `InstancePoolStatus.pendingInstanceErrors[]` | Low | OK. |
| F-06  | `NodeTypeFlexibility.alternateNodeTypeIds` (outside the wrapper) | Low | Standalone, `alternateNodeTypeIds: string[]` is clear. OK. |
| F-07  | `httpReq`, `respBody`, `params` (locals in `client.ts`) | Low | Locals only. |

### 2.12 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| K-01  | None observed. All fields are within their type's domain. | — | OK. |

### 2.13 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editInstancePool()` vs ecosystem-standard `update` | Medium | Same as `clusterpolicies` AV-01. Driven by wire path `/edit`. Newer Databricks resources expose `update*`. Cross-package inconsistency. |
| AV-02 | `getInstancePool()` (singular) vs `listInstancePools()` (plural) | Low | Correct REST convention. OK. |
| AV-03 | `createInstancePool()` / `deleteInstancePool()` / `editInstancePool()` / `getInstancePool()` / `listInstancePools()` — only five verbs | Low | No `start`, `stop`, `pin`, etc. — instance pools are stateless from the API standpoint; the lifecycle is implicit via fewer endpoints than `clusters`. Consistent. |

### 2.14 Long enum values — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| L-01  | `EbsVolumeType.THROUGHPUT_OPTIMIZED_HDD` (24 chars) | Low | Standard AWS terminology; OK. |
| L-02  | `AzureDiskVolumeType.STANDARD_LRS` (12 chars) | Low | Short. OK. |

### 2.15 Underspecified IDs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instancePoolId`                    | Low      | Well-specified — scope = instance pool. No collisions. OK. |
| I-02  | `nodeTypeId`                        | Low      | Scoped correctly. OK. |
| I-03  | `PendingInstanceError.instanceId`   | Low      | Scoped. OK. |
| I-04  | `policyFamilyId` is *not* in this package; `clusterId` is *not* in this package — only `instancePoolId` and `nodeTypeId` IDs appear. | Observation | Clean. |
| I-05  | `NodeTypeFlexibility.alternateNodeTypeIds: string[]` | Low | Plural array of node-type IDs; scoped. OK. |
| I-06  | `InstancePoolAwsAttributes.zoneId` / `InstancePoolGcpAttributes.zoneId` | Low | Both reuse `zoneId` for the AWS availability zone ("us-west-2a") and GCP availability zone ("us-west1-a"). Same name, two slightly different value formats. Acceptable cross-cloud abstraction. |

### 2.16 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstancePoolAndStats`              | High     | Tautological + Go-style "And"-joiner (G-02). Doubly off. |
| TS-02 | `NodeTypeFlexibility`               | Low      | "Flexibility" is the noun-form of a feature, not a type-suffix tautology. OK. |
| TS-03 | `DiskSpec`                          | Low      | `Spec` is acceptable, but combined with each field's `disk*` prefix (M-04) the type-name still echoes. |
| TS-04 | `EbsVolumeType`, `AzureDiskVolumeType` | Low | `VolumeType` / `DiskVolumeType` — standard cloud-storage terminology. OK. |

### 2.17 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | JSDoc placeholder `<Databricks>` appears many times in this file (e.g., `"<Databricks> will tag all pool resources"` `model.ts:117`) | Observation | Un-substituted template placeholder leaking into the generated TS docstrings. Reader sees `<Databricks>` in IntelliSense. Same finding as `clusters.md` #92. |
| X-02  | `enableElasticDisk` JSDoc: "Autoscaling Local Storage: when enabled, **this instances** in this pool ..." (`model.ts:133, 315, 437, 566`) | Observation | Grammar typo in JSDoc ("this instances" → "the instances"). Same string repeated four times. |
| X-03  | `client.ts:167-170` builds query manually inside `getInstancePool`. `utils.ts:123` exports `flattenQueryParams` but it is unused. | Observation | Dead exported helper. Same observation as in `abacpolicies.md` and other audits. |
| X-04  | `client.ts:197` `_req: ListInstancePoolsRequest` for empty request type | Observation | Generator artefact: empty request type still produced and prefixed `_` to satisfy lint. |
| X-05  | `executeCall` / `executeHttpCall` pair (`utils.ts:26, 65`) | Observation | Same name-pair concern as in other audits (`abacpolicies.md` #36, `clusters.md` #90). One function name differs from the other only by `Http`. |

### 2.18 Proto-architectural leaks

### 1. `DockerImage.credsOneof` — model.ts:261

**Why:** `Oneof` is a literal protobuf-keyword suffix. The wire field uses
a proto `oneof`; the TS reader has no business knowing this. TypeScript
already encodes the union shape via the `$case` discriminator pattern,
making the suffix doubly redundant.
**Category:** Proto suffix/infix.
**Suggested:** `credentials`.
**Rationale:** Drop the proto-codegen idiom; the union type expresses the
mutual-exclusion semantics on its own.

### 2. `DockerImage.credsOneof.$case` / `DiskType.remoteVolumeType.$case` — model.ts:246, 247, 263

**Why:** The `$case` discriminator key is a `ts-proto` codegen artefact
(see `ts-proto`'s "oneof=unions" mode). Native TypeScript discriminated
unions use a domain-named tag (e.g., `kind`, `type`).
**Category:** Proto suffix/infix.
**Suggested:** Replace `$case` with a domain tag such as `kind` or `type`
(e.g., `{ kind: 'basicAuth'; basicAuth: DockerBasicAuth }`).
**Rationale:** `$case` is unique to one TS-from-proto codegen tool; it
leaks the generator into the public API.

### 3. `CreateInstancePoolRequest_Response` — model.ts:184

**Why:** The `_Response` underscore-nested name mirrors the proto-codegen
convention `Outer.NestedMessage`, flattened to `Outer_Nested`. TypeScript
has no nested-message concept; the underscore is purely an architectural
leak from the protobuf compiler.
**Category:** Proto suffix/infix.
**Suggested:** `CreateInstancePoolResponse`.
**Rationale:** Use a top-level response type that pairs with the request
without echoing proto nesting.

### 4. `DeleteInstancePoolRequest_Response` — model.ts:195

**Why:** Same proto-nested underscore as finding #3.
**Category:** Proto suffix/infix.
**Suggested:** `DeleteInstancePoolResponse`.
**Rationale:** Same as #3.

### 5. `EditInstancePoolRequest_Response` — model.ts:366

**Why:** Same proto-nested underscore as finding #3.
**Category:** Proto suffix/infix.
**Suggested:** `EditInstancePoolResponse`.
**Rationale:** Same as #3.

### 6. `GetInstancePoolRequest_Response` — model.ts:374

**Why:** Same proto-nested underscore as finding #3.
**Category:** Proto suffix/infix.
**Suggested:** `GetInstancePoolResponse` (or fold into the entity type
`InstancePool` since the shape is identical to `InstancePoolAndStats`).
**Rationale:** Same as #3.

### 7. `ListInstancePoolsRequest_Response` — model.ts:734

**Why:** Same proto-nested underscore as finding #3.
**Category:** Proto suffix/infix.
**Suggested:** `ListInstancePoolsResponse`.
**Rationale:** Same as #3.

### 8. `CreateInstancePoolRequest_CustomTagsEntry` — model.ts:168

**Why:** Proto-nested map-entry type. Protobuf compiles `map<K,V>` fields
into a synthetic `*_Entry` message; TypeScript expresses maps as
`Record<K,V>` and never needs this entry shape. The type is exported but
unused by the request, which uses `Record<string, string>` directly
(line 122).
**Category:** Proto suffix/infix.
**Suggested:** Delete the type.
**Rationale:** Dead proto-codegen artefact with no consumer in TS.

### 9. `EditInstancePoolRequest_CustomTagsEntry` — model.ts:350

**Why:** Same proto-map-entry artefact as #8.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #8.

### 10. `GetInstancePoolRequest_Response_CustomTagsEntry` — model.ts:472

**Why:** Doubly-nested proto map-entry: `Get…Request → Response →
CustomTagsEntry`. Two underscores in one identifier.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #8; the double underscore makes the leak even more
visible.

### 11. `GetInstancePoolRequest_Response_DefaultTagsEntry` — model.ts:488

**Why:** Same doubly-nested proto-map artefact as #10.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #10.

### 12. `InstancePoolAndStats_CustomTagsEntry` — model.ts:601

**Why:** Same proto-map-entry artefact as #8.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #8.

### 13. `InstancePoolAndStats_DefaultTagsEntry` — model.ts:617

**Why:** Same proto-map-entry artefact as #8.
**Category:** Proto suffix/infix.
**Suggested:** Delete.
**Rationale:** Same as #8.

### 14. `unmarshalCreateInstancePoolRequest_ResponseSchema` / `marshalCreateInstancePoolRequestSchema` (and 14 sibling marshal/unmarshal exports) — model.ts:751, 761, 764, 780, 797, 807, 821, 825, 885, 945, 960, 971, 984, 998, 1010, 1021, 1030, 1041, 1089, 1097, 1113, 1137, 1147, 1166, 1216, 1230, 1240, 1252

**Why:** `marshal` / `unmarshal` are proto/Go-codegen verbs (cf. Go's
`proto.Marshal` / `proto.Unmarshal`, `encoding/json.Marshal`). TypeScript
convention is `encode` / `decode`, `serialize` / `deserialize`, or
`toJson` / `fromJson` (cf. zod's own `parse` / `safeParse`).
**Category:** Proto verb leak.
**Suggested:** Rename to `encode*Schema` / `decode*Schema` (or
`serialize*` / `parse*`).
**Rationale:** The verb pair betrays the Go-SDK ancestry; TS consumers
will not recognise it as the standard name for JSON shape transformation.

### 15. `_req: ListInstancePoolsRequest` parameter on `listInstancePools` — client.ts:197

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

## 3. Severity totals (recap)

| Severity     | Count |
| ------------ | ----- |
| High         | 9     |
| Medium       | 7     |
| Low          | 16    |
| Observation  | 7     |
| **Total**    | **39**|

## 4. Cross-package consistency notes

- **The eleven shared shapes** (`AwsAvailability`, `AzureAvailability`,
  `GcpAvailability`, `AzureDiskVolumeType`, `EbsVolumeType`, `DiskSpec`,
  `DiskType`, `DockerImage`, `DockerBasicAuth`, `NodeTypeFlexibility`,
  `PendingInstanceError`) are duplicated verbatim between this package and
  `clusters`. A shared `@databricks/sdk-compute-common` package — or codegen
  emitting from a shared schema — would eliminate the dual maintenance burden.
- The `*Attributes` types (`InstancePoolAwsAttributes` etc.) overlap heavily
  with `clusters` `AwsAttributes` etc., but the field sets differ. A common
  base + extension would still help.

## 5. File coverage

- `src/v2/model.ts` (1259 lines): read fully.
- `src/v2/client.ts` (223 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
- `src/v2/index.ts` (43 lines): read fully.

---

## Fixed

- #M-04 `enableAutoAlternateNodeTypes` field (originally cited at `model.ts:164, 353, 482, 618`): Fixed in regeneration on 2026-05-20 — the deprecated field has been removed from all four request/response types.
- #O-02 `enableAutoAlternateNodeTypes` (originally cited at `model.ts:164, 353, 482, 618`): Fixed in regeneration on 2026-05-20 — the deprecated field has been removed; the verbose-identifier concern no longer applies.
- #C-07 `PuPr` in JSDoc `"deprecated before entering PuPr"` (originally cited at `model.ts:164, 353, 482, 618`): Fixed in regeneration on 2026-05-20 — the surrounding deprecated field and its JSDoc were removed.
- #C-08 `Fleet-V2` in JSDoc `"For pools with node type flexibility (Fleet-V2)"` (originally cited within the deprecated `enableAutoAlternateNodeTypes` JSDoc block): Fixed in regeneration on 2026-05-20 — the surrounding deprecated field and its JSDoc were removed.
- #X-03 TODO comment `TODO(CJ-71514): Remove this field after sufficient time has passed for all clients to migrate.` (originally cited at `model.ts:165, 354, 483, 619`): Fixed in regeneration on 2026-05-20 — the surrounding deprecated field and JSDoc with the internal ticket reference were removed.
