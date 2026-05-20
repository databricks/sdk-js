# Naming Audit: `instancepools` (v2)

**Package:** `@databricks/sdk-instancepools`
**Path:** `/home/parth.bansal/sdk-js/packages/instancepools/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts` (1295 lines, read in full)
- `src/v2/client.ts` (213 lines, read in full)
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
| Medium       | 16    |
| Low          | 18    |
| Observation  | 7     |
| **Total**    | **50**|

### Top themes

1. **Massive structural duplication.** `CreateInstancePool` (28 fields),
   `EditInstancePool` (29 fields), `GetInstancePool_Response` (30 fields), and
   `InstancePoolAndStats` (30 fields) are byte-identical apart from one or two
   fields. They could share a single base type.
2. **`InstancePool*` prefix on every type is redundant** — the package is
   already `instancepools`; the v2 namespace is even smaller. `Pool` (or even
   nothing) would do for `InstancePoolStats`, `InstancePoolStatus`,
   `InstancePoolAndStats`.
3. **Per-cloud enum-prefix inconsistency** — `AwsAvailability` members are
   unprefixed (`SPOT`, `ON_DEMAND`), but `AzureAvailability` (`SPOT_AZURE`)
   and `GcpAvailability` (`PREEMPTIBLE_GCP`) repeat the enum's cloud. The
   same defect exists in `clusters` (see `clusters.md` #3) — fix once at
   codegen.

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

| Name                                          | Lines    | Purpose                                            |
| --------------------------------------------- | -------- | -------------------------------------------------- |
| `CreateInstancePool`                          | 90-172   | Request body for create — 28 fields.               |
| `CreateInstancePool_CustomTagsEntry`          | 175-188  | Proto-nested tag entry, dead in TS.                |
| `CreateInstancePool_Response`                 | 191-194  | Response with single `instancePoolId`.             |
| `DeleteInstancePool`                          | 196-199  | `{ instancePoolId?: string }`.                     |
| `DeleteInstancePool_Response`                 | 202      | Empty `{}`.                                        |
| `DiskSpec`                                    | 210-248  | Disk-attachment spec.                              |
| `DiskType`                                    | 251-256  | Disc-union wrapper for EBS or Azure disk types.    |
| `DockerBasicAuth`                             | 258-263  | `{ username, password }`.                          |
| `DockerImage`                                 | 265-275  | `{ url, credsOneof }`.                             |
| `EditInstancePool`                            | 277-361  | Request body for edit — 29 fields.                 |
| `EditInstancePool_CustomTagsEntry`            | 364-377  | Same as the Create variant — duplicate.            |
| `EditInstancePool_Response`                   | 380      | Empty `{}`.                                        |
| `GetInstancePool`                             | 382-385  | `{ instancePoolId?: string }`.                     |
| `GetInstancePool_Response`                    | 388-490  | 30 fields — superset of `CreateInstancePool` plus statistics. |
| `GetInstancePool_Response_CustomTagsEntry`    | 493-506  | Third duplicate of the tag-entry shape.            |
| `GetInstancePool_Response_DefaultTagsEntry`   | 509-522  | Fourth duplicate of the tag-entry shape.           |
| `InstancePoolAndStats`                        | 524-626  | 30 fields — duplicate of `GetInstancePool_Response`. |
| `InstancePoolAndStats_CustomTagsEntry`        | 629-642  | Fifth duplicate of the tag-entry shape.            |
| `InstancePoolAndStats_DefaultTagsEntry`       | 645-658  | Sixth duplicate of the tag-entry shape.            |
| `InstancePoolAwsAttributes`                   | 661-696  | AWS-specific config.                               |
| `InstancePoolAzureAttributes`                 | 699-710  | Azure-specific config.                             |
| `InstancePoolGcpAttributes`                   | 713-735  | GCP-specific config.                               |
| `InstancePoolStats`                           | 737-746  | Idle/used counters.                                |
| `InstancePoolStatus`                          | 748-756  | Wraps `pendingInstanceErrors`.                     |
| `ListInstancePools`                           | 759      | Empty `{}`.                                        |
| `ListInstancePools_Response`                  | 762-764  | Wraps `instancePools` array.                       |
| `NodeTypeFlexibility`                         | 767-770  | Wraps `alternateNodeTypeIds`.                      |
| `PendingInstanceError`                        | 773-776  | `{ instanceId, message }`.                         |

### 1.3 Methods (`client.ts`)

| Method               | HTTP   | URL path                          | Returns                       |
| -------------------- | ------ | --------------------------------- | ----------------------------- |
| `createInstancePool` | POST   | `/api/2.0/instance-pools/create`  | `CreateInstancePool_Response` |
| `deleteInstancePool` | POST   | `/api/2.0/instance-pools/delete`  | `DeleteInstancePool_Response` |
| `editInstancePool`   | POST   | `/api/2.0/instance-pools/edit`    | `EditInstancePool_Response`   |
| `getInstancePool`    | GET    | `/api/2.0/instance-pools/get`     | `GetInstancePool_Response`    |
| `listInstancePools`  | GET    | `/api/2.0/instance-pools/list`    | `ListInstancePools_Response`  |

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

### 2.2 Redundant enum prefixes — High

| ID    | Symbol                                              | Severity | Issue |
| ----- | --------------------------------------------------- | -------- | ----- |
| E-01  | `AzureAvailability.SPOT_AZURE` / `ON_DEMAND_AZURE` / `SPOT_WITH_FALLBACK_AZURE` | High | Every member repeats `_AZURE`. The enum is `AzureAvailability`; inside scope the cloud is implied. Compare with `AwsAvailability` (`SPOT`, `ON_DEMAND`, `SPOT_WITH_FALLBACK`) which gets it right. Suggested `AzureAvailability.SPOT | ON_DEMAND | SPOT_WITH_FALLBACK`. Same defect duplicated in `clusters` (clusters.md #3) — fix at codegen. |
| E-02  | `GcpAvailability.PREEMPTIBLE_GCP` / `ON_DEMAND_GCP` / `PREEMPTIBLE_WITH_FALLBACK_GCP` | High | Same as E-01. Members redundantly carry `_GCP`. |
| E-03  | `AzureDiskVolumeType.PREMIUM_LRS` / `STANDARD_LRS`  | Low      | `LRS` is the Azure suffix for "Locally Redundant Storage". Standard Azure terminology — keep. |
| E-04  | `EbsVolumeType.GENERAL_PURPOSE_SSD` / `THROUGHPUT_OPTIMIZED_HDD` | Low | Standard AWS EBS volume-class names. Slightly long but correct. |

### 2.3 Acronym casing inconsistencies — High

| ID    | Symbol                                | Severity | Issue |
| ----- | ------------------------------------- | -------- | ----- |
| A-01  | `InstancePoolAwsAttributes`           | High     | Google TS style says acronyms ≥3 chars get only-first-letter capitalised ("AWS" → "Aws"). The repo follows this (Aws/Azure/Gcp). Acceptable, but contrasts with `EbsVolumeType` where `Ebs` is only 3 chars (same rule, applied consistently). No defect — listed for parity with related audits. |
| A-02  | `InstancePoolGcpAttributes.gcpAvailability` | High | The field name re-states the cloud already implied by the parent type `InstancePoolGcpAttributes`. Compare with `InstancePoolAwsAttributes.availability` (line 663) and `InstancePoolAzureAttributes.availability` (line 701) — both unprefixed. Three sibling types, two conventions. Should be `InstancePoolGcpAttributes.availability`. |
| A-03  | `InstancePoolAwsAttributes.instanceProfileArn` | Low | "Arn" applies Google TS style for ≥3-char acronyms. Compare with `EbsVolumeType` (same package) and consistent. OK. |
| A-04  | `InstancePoolGcpAttributes.localSsdCount` | Low | "Ssd" is 3 letters; same casing rule. OK. |
| A-05  | `InstancePoolAzureAttributes.spotBidMaxPrice` vs `InstancePoolAwsAttributes.spotBidPricePercent` | Medium | Sibling fields describe the same concept (max price for spot bid) in opposite shapes. `MaxPrice` is an absolute USD value; `PricePercent` is relative. Names obscure this — `azureSpotBidMaxPriceUsd` and `awsSpotBidPricePercent` (or any clarifying suffix) would help. |

### 2.4 Cryptic abbreviations — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | `DockerImage.credsOneof`            | High (also V-01) | `creds` and `Oneof` are both opaque outside Go/proto context. |
| C-02  | `BYOC` in JSDoc `"Custom Docker Image BYOC"` (`model.ts:141, 330, 459, 595`) | Medium | "Bring Your Own Container" not expanded. External readers will not know. |
| C-03  | `EbsVolumeType` (acronym in name)   | Low      | EBS = Elastic Block Store. Well-known among AWS users; OK. |
| C-04  | `LRS` in `AzureDiskVolumeType.PREMIUM_LRS` / `STANDARD_LRS` | Low | "Locally Redundant Storage" — standard Azure term. JSDoc explains; OK. |
| C-05  | `req`, `resp`, `httpReq`, `respBody` locals in `client.ts` | Low | Method-local; OK. |
| C-06  | `opts` (`utils.ts:66`)              | Low      | Inside function scope; OK. |
| C-07  | `PuPr` in JSDoc `"deprecated before entering PuPr"` (`model.ts:164, 353, 482, 618`) | Medium | "Public Preview" — internal Databricks jargon. Should be expanded in JSDoc. |
| C-08  | `Fleet-V2` in JSDoc `"For pools with node type flexibility (Fleet-V2)"` | Medium | Internal codename leaking into public docs. |
| C-09  | `Mb/s` in JSDoc `"configurable throughput (in Mb/s)"` (`model.ts:168, 357, 486, 622`) | Low | Likely intended `MB/s` (megabytes per second) given the cloud-disk-throughput context; `Mb/s` (megabits) is unusual for disk throughput. Possible casing typo upstream. |

### 2.5 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `editInstancePool()` / `EditInstancePool` | Medium | Conventional REST/CRUD verb in TS is **update**. `clusterpolicies` (audit #M-01) and `clusters` make the same choice for the wire path `/edit`. Across-package inconsistency: most newer Databricks APIs use `update*`. Flag for upstream alignment. |
| M-02  | `InstancePoolStatus`                | High     | The type carries *only* `pendingInstanceErrors`. The name promises a general "status" but the shape exposes only errors. `InstancePoolPendingErrors` or `InstancePoolFailures` would be more truthful. (`InstancePoolState` is the actual lifecycle state, on the entity itself.) |
| M-03  | `InstancePoolAndStats`              | High     | The "AndStats" suffix implies it carries the pool *plus* statistics, but the type also carries `status`, `state`, `defaultTags`, and all 28 configuration fields. The "And" naming pattern is a Go-style listing-result idiom — TS readers expect just a single entity name. Consider `InstancePoolSummary` or `InstancePoolListEntry`. |
| M-04  | `enableAutoAlternateNodeTypes` (DEPRECATED — `model.ts:164, 353, 482, 618`) | Medium | The field is marked deprecated in JSDoc but still exposed in every request and response type. The JSDoc says "This field was deprecated before entering PuPr and should no longer be used" — yet it ships. Misleading availability. |
| M-05  | `DiskSpec.diskCount`, `diskSize`, `diskIops`, `diskThroughput` | Low | Repetition of the `disk` prefix inside a type named `DiskSpec`. Inside the type, `count` / `size` / `iops` / `throughput` would suffice. Same pattern as `clusters.md` flagged elsewhere. |
| M-06  | `DiskSpec.diskIops` (no JSDoc) and `diskSpec.diskThroughput` (no JSDoc) — `model.ts:246-247` | Low | Two fields with no JSDoc. Hard to know the unit without context. (Compare neighbouring `diskSize` which documents "GiB".) |
| M-07  | `preloadedDockerImages` is plural but JSDoc says "Custom Docker Image BYOC" (singular) — `model.ts:142, 331, 460, 596` | Low | Field is `DockerImage[]`. Plural correctly matches type, but the JSDoc is misleading. |
| M-08  | `preloadedSparkVersions: string[]` with JSDoc "A list containing at most one preloaded Spark image version" | High | Type is `string[]` but the JSDoc enforces a max length of 1. If only one value is allowed, the field should be `preloadedSparkVersion?: string` (singular). The array shape misleads callers into thinking they can pass several. |
| M-09  | `InstancePoolStats.usedCount` / `idleCount` / `pendingUsedCount` / `pendingIdleCount` | Low | Adequate, but `usedCount` is ambiguous about what "used" means. JSDoc clarifies ("part of a cluster") — without it, readers might think "used = ever used". |

### 2.6 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `idleInstanceAutoterminationMinutes` (5-word identifier, present in 4 types) | Medium | 33-char field. Inside a type called `CreateInstancePool` etc., `idleAutoterminationMinutes` or `idleTimeoutMinutes` would be 27 / 18 chars. The wire uses `idle_instance_autotermination_minutes` so any change is generator-side. |
| O-02  | `enableAutoAlternateNodeTypes`      | Medium   | "Enable auto alternate node types" — five concept words. With node-type-flexibility being the modern replacement, the field is also deprecated (see M-04). |
| O-03  | `InstancePool*` prefix on `InstancePoolStats`, `InstancePoolStatus`, `InstancePoolAndStats`, `InstancePoolAwsAttributes`, `InstancePoolAzureAttributes`, `InstancePoolGcpAttributes`, `InstancePoolState` | High | The package is already `@databricks/sdk-instancepools`. Inside the package, the prefix is redundant. `Stats`, `Status`, `AwsAttributes` would all suffice and remove ~12 chars from each name. Compare `clusters` (`clusters.md` #75) and `apps` packages, which face the same recurring issue. |
| O-04  | `PendingInstanceError`              | Low      | Three-word type for two-field shape (`instanceId`, `message`). OK. |
| O-05  | `NodeTypeFlexibility.alternateNodeTypeIds` | Low | Field name re-states `node` twice (once from parent type, once in the field). Could be `alternates` or `fallbacks`. The wire path is the constraint. |
| O-06  | `totalInitialRemoteDiskSize`        | Low      | 25-char field, four concept words. Reasonable but heavy. |
| O-07  | `spotBidPricePercent`               | Low      | Five concept words crammed into one camelCase identifier. The JSDoc explains what each part means. |

### 2.7 Singular / plural mismatches — Low / High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `preloadedSparkVersions: string[]`  | High (also M-08) | Plural array type but the JSDoc constrains it to at most one element. |
| P-02  | `preloadedDockerImages: DockerImage[]` | Low | Plural array; JSDoc says "Custom Docker Image BYOC" but the field accepts multiple. OK. |
| P-03  | `ListInstancePools` (request) vs `listInstancePools()` (method) | Low | Consistent plural. |
| P-04  | `ListInstancePools_Response.instancePools: InstancePoolAndStats[]` | Low | Plural array — correct. |

### 2.8 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | `DockerImage.credsOneof.$case === 'basicAuth'.basicAuth: DockerBasicAuth` | Low | `basicAuth` is not a reserved word but is duplicated across the `$case` discriminator and the embedded field — `library.lib.basicAuth.basicAuth` style access. |
| R-02  | None of the type names collide with TS reserved words. | — | OK. |

### 2.9 Duplicate concepts — Highest in repo

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreateInstancePool` (28 fields, lines 90-172) vs `EditInstancePool` (29 fields, lines 277-361) | High | Identical except `EditInstancePool` adds `instancePoolId`. Could share a base type. |
| D-02  | `GetInstancePool_Response` (30 fields, lines 388-490) vs `InstancePoolAndStats` (30 fields, lines 524-626) | High | **Byte-identical** apart from the type name. Compare line-by-line: identical field set, identical order, identical JSDoc. Two names for the same shape. |
| D-03  | `CreateInstancePool` vs the `Pool` body inside `InstancePoolAndStats` | High | All 28 config fields appear three times: once on Create, once on Edit (29), once on the entity. Codegen could project from a shared base. |
| D-04  | `InstancePoolAwsAttributes` (this package) vs `AwsAttributes` (`clusters` package) | High | Same domain (AWS attributes for a compute pool / cluster). `clusters` calls them `AwsAttributes`; this package calls them `InstancePoolAwsAttributes`. Both share many fields (availability, zoneId, instanceProfileArn, spotBid…) but `clusters` has additional fields (`ebsVolumeCount`, etc.). Cross-package duplication; a shared `compute` module would fix both. |
| D-05  | `InstancePoolAzureAttributes` / `InstancePoolGcpAttributes` vs `clusters.AzureAttributes` / `clusters.GcpAttributes` | High | Same as D-04 for Azure / GCP. |
| D-06  | `EbsVolumeType`, `AzureDiskVolumeType`, `AwsAvailability`, `AzureAvailability`, `GcpAvailability`, `DockerImage`, `DockerBasicAuth`, `DiskSpec`, `DiskType`, `NodeTypeFlexibility`, `PendingInstanceError` | High | All eleven types/enums are duplicated verbatim in `clusters/src/v2/model.ts` (verified via `grep`). Two packages ship eleven identical shapes. |

### 2.10 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createInstancePool`, `deleteInstancePool`, `editInstancePool`, `getInstancePool`, `listInstancePools` | Low | All present-tense imperative — consistent. |
| T-02  | `preloadedDockerImages`, `preloadedSparkVersions` (past participle) | Low | Standard for fields that describe a pre-applied state. OK. |

### 2.11 Go / Java-style names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `DockerImage.credsOneof`            | High     | `Oneof` is a literal proto-keyword leak. No TS reader expects this. See V-01. |
| G-02  | `InstancePoolAndStats` (the "X-AndY" naming pattern) | Medium | "And" combinators in type names are a Go-isms (e.g., `ResultAndError`). TS usually picks a concept name. |
| G-03  | `httpClient`, `HttpClient` (vs `HTTPClient`) | Low | Google TS style uses `Http` (lowercased acronym) — consistent. |

### 2.12 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `DiskType.remoteVolumeType` (outside of `DiskType`) | Medium | When destructured, `remoteVolumeType: EbsVolumeType` reads as a category name colliding with the cloud-specific value. |
| F-02  | `DockerImage.url` (outside of `DockerImage`) | Low | Standard. OK in context. |
| F-03  | `DockerBasicAuth.username` / `password` | Low | Standard. OK. |
| F-04  | `PendingInstanceError.message`      | Medium (also V-02) | When destructured, an error `message` field is the generic-est possible name. Adding `instanceMessage` would help. |
| F-05  | `InstancePoolStatus.pendingInstanceErrors[]` | Low | OK. |
| F-06  | `NodeTypeFlexibility.alternateNodeTypeIds` (outside the wrapper) | Low | Standalone, `alternateNodeTypeIds: string[]` is clear. OK. |
| F-07  | `httpReq`, `respBody`, `params` (locals in `client.ts`) | Low | Locals only. |

### 2.13 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| K-01  | None observed. All fields are within their type's domain. | — | OK. |

### 2.14 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editInstancePool()` vs ecosystem-standard `update` | Medium | Same as `clusterpolicies` AV-01. Driven by wire path `/edit`. Newer Databricks resources expose `update*`. Cross-package inconsistency. |
| AV-02 | `getInstancePool()` (singular) vs `listInstancePools()` (plural) | Low | Correct REST convention. OK. |
| AV-03 | `createInstancePool()` / `deleteInstancePool()` / `editInstancePool()` / `getInstancePool()` / `listInstancePools()` — only five verbs | Low | No `start`, `stop`, `pin`, etc. — instance pools are stateless from the API standpoint; the lifecycle is implicit via fewer endpoints than `clusters`. Consistent. |

### 2.15 Long enum values — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| L-01  | `AzureAvailability.SPOT_WITH_FALLBACK_AZURE` (26 chars) | Medium | Combination of redundant `_AZURE` suffix (E-01) and the verbose form. Trimming the suffix gives `SPOT_WITH_FALLBACK` (18 chars), already in use for AWS. |
| L-02  | `GcpAvailability.PREEMPTIBLE_WITH_FALLBACK_GCP` (29 chars) | Medium | Same as L-01 for GCP. |
| L-03  | `EbsVolumeType.THROUGHPUT_OPTIMIZED_HDD` (24 chars) | Low | Standard AWS terminology; OK. |
| L-04  | `AzureDiskVolumeType.STANDARD_LRS` (12 chars) | Low | Short. OK. |

### 2.16 Underspecified IDs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instancePoolId`                    | Low      | Well-specified — scope = instance pool. No collisions. OK. |
| I-02  | `nodeTypeId`                        | Low      | Scoped correctly. OK. |
| I-03  | `PendingInstanceError.instanceId`   | Low      | Scoped. OK. |
| I-04  | `policyFamilyId` is *not* in this package; `clusterId` is *not* in this package — only `instancePoolId` and `nodeTypeId` IDs appear. | Observation | Clean. |
| I-05  | `NodeTypeFlexibility.alternateNodeTypeIds: string[]` | Low | Plural array of node-type IDs; scoped. OK. |
| I-06  | `InstancePoolAwsAttributes.zoneId` / `InstancePoolGcpAttributes.zoneId` | Low | Both reuse `zoneId` for the AWS availability zone ("us-west-2a") and GCP availability zone ("us-west1-a"). Same name, two slightly different value formats. Acceptable cross-cloud abstraction. |

### 2.17 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstancePoolAwsAttributes` / `InstancePoolAzureAttributes` / `InstancePoolGcpAttributes` | Medium | All three carry the `Attributes` suffix and the redundant `InstancePool` prefix (see O-03). Could be `AwsAttributes` / `AzureAttributes` / `GcpAttributes` (matching `clusters`). |
| TS-02 | `InstancePoolStats`                 | Medium   | `Stats` is already abbreviated; the `InstancePool` prefix is redundant inside this package. |
| TS-03 | `InstancePoolStatus`                | Medium   | Same as TS-02. |
| TS-04 | `InstancePoolState` (enum)          | Medium   | Same. Could be `State` or `PoolState`. |
| TS-05 | `InstancePoolAndStats`              | High     | Tautological + Go-style "And"-joiner (G-02). Doubly off. |
| TS-06 | `NodeTypeFlexibility`               | Low      | "Flexibility" is the noun-form of a feature, not a type-suffix tautology. OK. |
| TS-07 | `DiskSpec`                          | Low      | `Spec` is acceptable, but combined with each field's `disk*` prefix (M-05) the type-name still echoes. |
| TS-08 | `EbsVolumeType`, `AzureDiskVolumeType` | Low | `VolumeType` / `DiskVolumeType` — standard cloud-storage terminology. OK. |

### 2.18 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | JSDoc placeholder `<Databricks>` appears 17 times in this file (e.g., `"<Databricks> will tag all pool resources"` `model.ts:117`) | Observation | Un-substituted template placeholder leaking into the generated TS docstrings. Reader sees `<Databricks>` in IntelliSense. Same finding as `clusters.md` #92. |
| X-02  | `enableElasticDisk` JSDoc: "Autoscaling Local Storage: when enabled, **this instances** in this pool ..." (`model.ts:133, 322, 451, 587`) | Observation | Grammar typo in JSDoc ("this instances" → "the instances"). Same string repeated four times. |
| X-03  | TODO comment in JSDoc: `"TODO(CJ-71514): Remove this field after sufficient time has passed for all clients to migrate."` (`model.ts:165, 354, 483, 619`) | Observation | Internal Databricks ticket reference (CJ-71514) leaks into public SDK JSDoc. Same string in four request/response types. |
| X-04  | `client.ts:165-167` builds query manually inside `getInstancePool`. `utils.ts:123` exports `flattenQueryParams` but it is unused. | Observation | Dead exported helper. Same observation as in `abacpolicies.md` and other audits. |
| X-05  | `client.ts:191` `_req: ListInstancePools` for empty request type | Observation | Generator artefact: empty request type still produced and prefixed `_` to satisfy lint. |
| X-06  | `executeCall` / `executeHttpCall` pair (`utils.ts:26, 65`) | Observation | Same name-pair concern as in other audits (`abacpolicies.md` #36, `clusters.md` #90). One function name differs from the other only by `Http`. |

---

## 3. Severity totals (recap)

| Severity     | Count |
| ------------ | ----- |
| High         | 9     |
| Medium       | 16    |
| Low          | 18    |
| Observation  | 7     |
| **Total**    | **50**|

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

- `src/v2/model.ts` (1295 lines): read fully.
- `src/v2/client.ts` (213 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
- `src/v2/index.ts` (43 lines): read fully.
