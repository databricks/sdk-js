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
| High         | 18    |
| Medium       | 22    |
| Low          | 20    |
| Observation  | 8     |
| **Total**    | **68**|

### Top themes

1. **Massive structural duplication.** `CreateInstancePool` (28 fields),
   `EditInstancePool` (29 fields), `GetInstancePool_Response` (30 fields), and
   `InstancePoolAndStats` (30 fields) are byte-identical apart from one or two
   fields. They could share a single base type.
2. **Proto-style `_Response` and `_*Entry` types pollute the public surface.**
   12 type names use `_` separators, each requiring an `eslint-disable`.
3. **`InstancePool*` prefix on every type is redundant** — the package is
   already `instancepools`; the v2 namespace is even smaller. `Pool` (or even
   nothing) would do for `InstancePoolStats`, `InstancePoolStatus`,
   `InstancePoolAndStats`.
4. **Per-cloud enum-prefix inconsistency** — `AwsAvailability` members are
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
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`,
  `marshalRequest`, `flattenQueryParams`.
- Marshal / unmarshal schema constants (line numbers in `model.ts`):
  `unmarshalCreateInstancePool_ResponseSchema` (779),
  `unmarshalDeleteInstancePool_ResponseSchema` (789),
  `unmarshalDiskSpecSchema` (792),
  `unmarshalDiskTypeSchema` (808),
  `unmarshalDockerBasicAuthSchema` (825),
  `unmarshalDockerImageSchema` (835),
  `unmarshalEditInstancePool_ResponseSchema` (849),
  `unmarshalGetInstancePool_ResponseSchema` (853),
  `unmarshalInstancePoolAndStatsSchema` (915),
  `unmarshalInstancePoolAwsAttributesSchema` (977),
  `unmarshalInstancePoolAzureAttributesSchema` (992),
  `unmarshalInstancePoolGcpAttributesSchema` (1003),
  `unmarshalInstancePoolStatsSchema` (1016),
  `unmarshalInstancePoolStatusSchema` (1030),
  `unmarshalListInstancePools_ResponseSchema` (1042),
  `unmarshalNodeTypeFlexibilitySchema` (1053),
  `unmarshalPendingInstanceErrorSchema` (1062),
  `marshalCreateInstancePoolSchema` (1073),
  `marshalDeleteInstancePoolSchema` (1123),
  `marshalDiskSpecSchema` (1131),
  `marshalDiskTypeSchema` (1147),
  `marshalDockerBasicAuthSchema` (1171),
  `marshalDockerImageSchema` (1181),
  `marshalEditInstancePoolSchema` (1200),
  `marshalInstancePoolAwsAttributesSchema` (1252),
  `marshalInstancePoolAzureAttributesSchema` (1266),
  `marshalInstancePoolGcpAttributesSchema` (1276),
  `marshalNodeTypeFlexibilitySchema` (1288).

---

## 2. Findings

### 2.1 Vague / generic names

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `DockerImage.credsOneof`            | High     | `credsOneof` is a Go/proto-codegen leak — TS readers do not know what "Oneof" means in this context (the wire field uses a protobuf `oneof`). The "creds" abbreviation is also generic. Should be `credentials` (and the union shape itself satisfies the discriminator). |
| V-02  | `PendingInstanceError.message`      | Medium   | `message` is generic. Could be `errorMessage` to match the type's purpose, or the type itself could be flattened. |
| V-03  | `parseResponse` (`utils.ts:113`)    | Low      | Local helper; OK in scope. Parses JSON specifically — `parseJsonResponse` would be more accurate. |
| V-04  | `marshalRequest` (`utils.ts:119`)   | Low      | Generic but local. OK. |
| V-05  | `readAll` (`utils.ts:40`)           | Low      | Standard name for a read-to-end helper. |
| V-06  | `Call` type imported from core      | Observation | Single-letter capitalized name; comes from `@databricks/sdk-core/api`. Out of scope. |
| V-07  | `DockerImage.url` JSDoc only says "URL of the docker image" — but the field name `url` is already generic at the value-level when destructured outside `DockerImage`. | Low | Acceptable inside the type. |

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

### 2.4 Underscores in TS identifiers — High

| ID    | Symbol                                              | Severity | Issue |
| ----- | --------------------------------------------------- | -------- | ----- |
| U-01  | `CreateInstancePool_CustomTagsEntry` (`model.ts:175`) | High   | Proto-nested name carries the `_` separator that Google TS style forbids (https://google.github.io/styleguide/tsguide.html#naming-style). Each occurrence requires an `eslint-disable @typescript-eslint/naming-convention`. |
| U-02  | `CreateInstancePool_Response` (`model.ts:191`)      | High     | Same as U-01. |
| U-03  | `DeleteInstancePool_Response` (`model.ts:202`)      | High     | Same as U-01. |
| U-04  | `EditInstancePool_CustomTagsEntry` (`model.ts:364`) | High     | Same as U-01. |
| U-05  | `EditInstancePool_Response` (`model.ts:380`)        | High     | Same as U-01. |
| U-06  | `GetInstancePool_Response` (`model.ts:388`)         | High     | Same as U-01. |
| U-07  | `GetInstancePool_Response_CustomTagsEntry` (`model.ts:493`) — *double underscore* | High | The proto-nesting compounds: `Response` is itself nested, and `CustomTagsEntry` is nested inside `Response`. 40-char identifier. |
| U-08  | `GetInstancePool_Response_DefaultTagsEntry` (`model.ts:509`) — *double underscore* | High | Same as U-07. |
| U-09  | `InstancePoolAndStats_CustomTagsEntry` (`model.ts:629`) | High | Same as U-01. |
| U-10  | `InstancePoolAndStats_DefaultTagsEntry` (`model.ts:645`) | High | Same as U-01. |
| U-11  | `ListInstancePools_Response` (`model.ts:762`)        | High     | Same as U-01. |
| U-12  | `unmarshalCreateInstancePool_ResponseSchema` (and 4 sibling schemas) | High | Underscore cascades through every generated schema constant. |

### 2.5 Cryptic abbreviations — Medium

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

### 2.6 Misleading names — High

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

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `idleInstanceAutoterminationMinutes` (5-word identifier, present in 4 types) | Medium | 33-char field. Inside a type called `CreateInstancePool` etc., `idleAutoterminationMinutes` or `idleTimeoutMinutes` would be 27 / 18 chars. The wire uses `idle_instance_autotermination_minutes` so any change is generator-side. |
| O-02  | `enableAutoAlternateNodeTypes`      | Medium   | "Enable auto alternate node types" — five concept words. With node-type-flexibility being the modern replacement, the field is also deprecated (see M-04). |
| O-03  | `InstancePool*` prefix on `InstancePoolStats`, `InstancePoolStatus`, `InstancePoolAndStats`, `InstancePoolAwsAttributes`, `InstancePoolAzureAttributes`, `InstancePoolGcpAttributes`, `InstancePoolState` | High | The package is already `@databricks/sdk-instancepools`. Inside the package, the prefix is redundant. `Stats`, `Status`, `AwsAttributes` would all suffice and remove ~12 chars from each name. Compare `clusters` (`clusters.md` #75) and `apps` packages, which face the same recurring issue. |
| O-04  | `unmarshalInstancePoolGcpAttributesSchema` (40 chars) — and 7 sibling schema names | Medium | `marshal`/`unmarshal` + the verbose type-name + `Schema` triple-states intent. Repo-wide convention. |
| O-05  | `unmarshalGetInstancePool_ResponseSchema` (39 chars) | Medium | Compound proto-nesting + `Schema` suffix yields long identifiers. |
| O-06  | `PendingInstanceError`              | Low      | Three-word type for two-field shape (`instanceId`, `message`). OK. |
| O-07  | `NodeTypeFlexibility.alternateNodeTypeIds` | Low | Field name re-states `node` twice (once from parent type, once in the field). Could be `alternates` or `fallbacks`. The wire path is the constraint. |
| O-08  | `totalInitialRemoteDiskSize`        | Low      | 25-char field, four concept words. Reasonable but heavy. |
| O-09  | `spotBidPricePercent`               | Low      | Five concept words crammed into one camelCase identifier. The JSDoc explains what each part means. |

### 2.8 Singular / plural mismatches — Low / High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `preloadedSparkVersions: string[]`  | High (also M-08) | Plural array type but the JSDoc constrains it to at most one element. |
| P-02  | `preloadedDockerImages: DockerImage[]` | Low | Plural array; JSDoc says "Custom Docker Image BYOC" but the field accepts multiple. OK. |
| P-03  | `ListInstancePools` (request) vs `listInstancePools()` (method) | Low | Consistent plural. |
| P-04  | `ListInstancePools_Response.instancePools: InstancePoolAndStats[]` | Low | Plural array — correct. |
| P-05  | `customTags` is `Record<string, string>` but the proto-side schema also exposes `_CustomTagsEntry` interface | Observation | TS uses the record. See W-01 for the underscore-naming concern. |

### 2.9 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | `DockerImage.credsOneof.$case === 'basicAuth'.basicAuth: DockerBasicAuth` | Low | `basicAuth` is not a reserved word but is duplicated across the `$case` discriminator and the embedded field — `library.lib.basicAuth.basicAuth` style access. |
| R-02  | None of the type names collide with TS reserved words. | — | OK. |

### 2.10 Underscore-laden wrapper types — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| W-01  | `*_CustomTagsEntry` (six occurrences: 175, 364, 493, 629) and `*_DefaultTagsEntry` (two occurrences: 509, 645) | High | These eight interfaces are proto-internal map-entry shapes whose underscore-laden names (`CreateInstancePool_CustomTagsEntry` etc.) each require an `eslint-disable @typescript-eslint/naming-convention`. They are exported via `index.ts` (8 names) under proto-style identifiers that violate Google TS style. |
| W-02  | `InstancePoolStatus` (`model.ts:748-756`) | Medium | The type's name promises a general "status" but its shape exposes only `pendingInstanceErrors`. Misleading (see also M-02). |

### 2.11 Duplicate concepts — Highest in repo

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreateInstancePool` (28 fields, lines 90-172) vs `EditInstancePool` (29 fields, lines 277-361) | High | Identical except `EditInstancePool` adds `instancePoolId`. Could share a base type. |
| D-02  | `GetInstancePool_Response` (30 fields, lines 388-490) vs `InstancePoolAndStats` (30 fields, lines 524-626) | High | **Byte-identical** apart from the type name. Compare line-by-line: identical field set, identical order, identical JSDoc. Two names for the same shape. |
| D-03  | `*_CustomTagsEntry` types (six declared, lines 175, 364, 493, 629) vs `*_DefaultTagsEntry` types (two declared, lines 509, 645) | High | All eight are byte-identical `{ key?: string; value?: string }`. One shared type would do. Same as `clusterpolicies` (clusterpolicies.md #W-04) and other packages — codegen-wide issue. |
| D-04  | `CreateInstancePool` vs the `Pool` body inside `InstancePoolAndStats` | High | All 28 config fields appear three times: once on Create, once on Edit (29), once on the entity. Codegen could project from a shared base. |
| D-05  | `InstancePoolAwsAttributes` (this package) vs `AwsAttributes` (`clusters` package) | High | Same domain (AWS attributes for a compute pool / cluster). `clusters` calls them `AwsAttributes`; this package calls them `InstancePoolAwsAttributes`. Both share many fields (availability, zoneId, instanceProfileArn, spotBid…) but `clusters` has additional fields (`ebsVolumeCount`, etc.). Cross-package duplication; a shared `compute` module would fix both. |
| D-06  | `InstancePoolAzureAttributes` / `InstancePoolGcpAttributes` vs `clusters.AzureAttributes` / `clusters.GcpAttributes` | High | Same as D-05 for Azure / GCP. |
| D-07  | `EbsVolumeType`, `AzureDiskVolumeType`, `AwsAvailability`, `AzureAvailability`, `GcpAvailability`, `DockerImage`, `DockerBasicAuth`, `DiskSpec`, `DiskType`, `NodeTypeFlexibility`, `PendingInstanceError` | High | All eleven types/enums are duplicated verbatim in `clusters/src/v2/model.ts` (verified via `grep`). Two packages ship eleven identical shapes. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createInstancePool`, `deleteInstancePool`, `editInstancePool`, `getInstancePool`, `listInstancePools` | Low | All present-tense imperative — consistent. |
| T-02  | `preloadedDockerImages`, `preloadedSparkVersions` (past participle) | Low | Standard for fields that describe a pre-applied state. OK. |

### 2.13 Go / Java-style names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `CreateInstancePool_Response`, `EditInstancePool_Response`, ... (proto-nested message style) | High | Direct port of Go `pb.CreateInstancePoolResponse`. Every occurrence requires `eslint-disable`. Repo-wide concern; flagged here. |
| G-02  | `marshal*Schema` / `unmarshal*Schema` | High | Go (and gRPC) verb pair. JS/TS code uses **serialize / deserialize** (or **encode / decode**, or **parse / stringify**). Required `import` for new TS readers to look up. |
| G-03  | `DockerImage.credsOneof`            | High     | `Oneof` is a literal proto-keyword leak. No TS reader expects this. See V-01. |
| G-04  | `InstancePoolAndStats` (the "X-AndY" naming pattern) | Medium | "And" combinators in type names are a Go-isms (e.g., `ResultAndError`). TS usually picks a concept name. |
| G-05  | `httpClient`, `HttpClient` (vs `HTTPClient`) | Low | Google TS style uses `Http` (lowercased acronym) — consistent. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `DiskType.remoteVolumeType` (outside of `DiskType`) | Medium | When destructured, `remoteVolumeType: EbsVolumeType` reads as a category name colliding with the cloud-specific value. |
| F-02  | `DockerImage.url` (outside of `DockerImage`) | Low | Standard. OK in context. |
| F-03  | `DockerBasicAuth.username` / `password` | Low | Standard. OK. |
| F-04  | `PendingInstanceError.message`      | Medium (also V-02) | When destructured, an error `message` field is the generic-est possible name. Adding `instanceMessage` would help. |
| F-05  | `InstancePoolStatus.pendingInstanceErrors[]` | Low | OK. |
| F-06  | `NodeTypeFlexibility.alternateNodeTypeIds` (outside the wrapper) | Low | Standalone, `alternateNodeTypeIds: string[]` is clear. OK. |
| F-07  | `*_CustomTagsEntry.key` / `*_CustomTagsEntry.value` | Medium | Outside the entry type, `key` and `value` are the genericest possible field names. (See W-01 for the underscore-naming concern on the entry types.) |
| F-08  | `httpReq`, `respBody`, `params` (locals in `client.ts`) | Low | Locals only. |

### 2.15 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| K-01  | None observed. All fields are within their type's domain. | — | OK. |

### 2.16 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editInstancePool()` vs ecosystem-standard `update` | Medium | Same as `clusterpolicies` AV-01. Driven by wire path `/edit`. Newer Databricks resources expose `update*`. Cross-package inconsistency. |
| AV-02 | `getInstancePool()` (singular) vs `listInstancePools()` (plural) | Low | Correct REST convention. OK. |
| AV-03 | `createInstancePool()` / `deleteInstancePool()` / `editInstancePool()` / `getInstancePool()` / `listInstancePools()` — only five verbs | Low | No `start`, `stop`, `pin`, etc. — instance pools are stateless from the API standpoint; the lifecycle is implicit via fewer endpoints than `clusters`. Consistent. |

### 2.17 Long enum values — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| L-01  | `AzureAvailability.SPOT_WITH_FALLBACK_AZURE` (26 chars) | Medium | Combination of redundant `_AZURE` suffix (E-01) and the verbose form. Trimming the suffix gives `SPOT_WITH_FALLBACK` (18 chars), already in use for AWS. |
| L-02  | `GcpAvailability.PREEMPTIBLE_WITH_FALLBACK_GCP` (29 chars) | Medium | Same as L-01 for GCP. |
| L-03  | `EbsVolumeType.THROUGHPUT_OPTIMIZED_HDD` (24 chars) | Low | Standard AWS terminology; OK. |
| L-04  | `AzureDiskVolumeType.STANDARD_LRS` (12 chars) | Low | Short. OK. |

### 2.18 Underspecified IDs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instancePoolId`                    | Low      | Well-specified — scope = instance pool. No collisions. OK. |
| I-02  | `nodeTypeId`                        | Low      | Scoped correctly. OK. |
| I-03  | `PendingInstanceError.instanceId`   | Low      | Scoped. OK. |
| I-04  | `policyFamilyId` is *not* in this package; `clusterId` is *not* in this package — only `instancePoolId` and `nodeTypeId` IDs appear. | Observation | Clean. |
| I-05  | `NodeTypeFlexibility.alternateNodeTypeIds: string[]` | Low | Plural array of node-type IDs; scoped. OK. |
| I-06  | `InstancePoolAwsAttributes.zoneId` / `InstancePoolGcpAttributes.zoneId` | Low | Both reuse `zoneId` for the AWS availability zone ("us-west-2a") and GCP availability zone ("us-west1-a"). Same name, two slightly different value formats. Acceptable cross-cloud abstraction. |

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstancePoolAwsAttributes` / `InstancePoolAzureAttributes` / `InstancePoolGcpAttributes` | Medium | All three carry the `Attributes` suffix and the redundant `InstancePool` prefix (see O-03). Could be `AwsAttributes` / `AzureAttributes` / `GcpAttributes` (matching `clusters`). |
| TS-02 | `InstancePoolStats`                 | Medium   | `Stats` is already abbreviated; the `InstancePool` prefix is redundant inside this package. |
| TS-03 | `InstancePoolStatus`                | Medium   | Same as TS-02. |
| TS-04 | `InstancePoolState` (enum)          | Medium   | Same. Could be `State` or `PoolState`. |
| TS-05 | `InstancePoolAndStats`              | High     | Tautological + Go-style "And"-joiner (G-04). Doubly off. |
| TS-06 | `NodeTypeFlexibility`               | Low      | "Flexibility" is the noun-form of a feature, not a type-suffix tautology. OK. |
| TS-07 | `DiskSpec`                          | Low      | `Spec` is acceptable, but combined with each field's `disk*` prefix (M-05) the type-name still echoes. |
| TS-08 | `EbsVolumeType`, `AzureDiskVolumeType` | Low | `VolumeType` / `DiskVolumeType` — standard cloud-storage terminology. OK. |

### 2.20 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | JSDoc placeholder `<Databricks>` appears 17 times in this file (e.g., `"<Databricks> will tag all pool resources"` `model.ts:117`) | Observation | Un-substituted template placeholder leaking into the generated TS docstrings. Reader sees `<Databricks>` in IntelliSense. Same finding as `clusters.md` #92. |
| X-02  | `enableElasticDisk` JSDoc: "Autoscaling Local Storage: when enabled, **this instances** in this pool ..." (`model.ts:133, 322, 451, 587`) | Observation | Grammar typo in JSDoc ("this instances" → "the instances"). Same string repeated four times. |
| X-03  | TODO comment in JSDoc: `"TODO(CJ-71514): Remove this field after sufficient time has passed for all clients to migrate."` (`model.ts:165, 354, 483, 619`) | Observation | Internal Databricks ticket reference (CJ-71514) leaks into public SDK JSDoc. Same string in four request/response types. |
| X-04  | `client.ts:165-167` builds query manually inside `getInstancePool`. `utils.ts:123` exports `flattenQueryParams` but it is unused. | Observation | Dead exported helper. Same observation as in `abacpolicies.md` and other audits. |
| X-05  | `client.ts:191` `_req: ListInstancePools` for empty request type | Observation | Generator artefact: empty request type still produced and prefixed `_` to satisfy lint. |
| X-06  | `executeCall` / `executeHttpCall` pair (`utils.ts:26, 65`) | Observation | Same name-pair concern as in other audits (`abacpolicies.md` #36, `clusters.md` #90). One function name differs from the other only by `Http`. |
| X-07  | The schema constants use the same name as the type with an `unmarshal`/`marshal` prefix and `Schema` suffix — e.g., `unmarshalInstancePoolAndStatsSchema`. Constants are not assignable types but the naming mirrors them. | Observation | OK; documented as repo-wide convention. |
| X-08  | `index.ts` re-exports 28 type symbols and 6 enum symbols but **not** any of the 13 marshal/unmarshal schemas | Observation | Schemas are package-internal — good encapsulation. The `_CustomTagsEntry`/`_DefaultTagsEntry` types (8 names) *are* re-exported under proto-style underscore names. See W-01. |

---

## 3. Severity totals (recap)

| Severity     | Count |
| ------------ | ----- |
| High         | 18    |
| Medium       | 22    |
| Low          | 20    |
| Observation  | 8     |
| **Total**    | **68**|

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
- The `_Response` / `_*Entry` proto-nesting concern is identical to that flagged in
  every other audit in this directory; it is a codegen-wide issue, not a
  per-package fix.

## 5. File coverage

- `src/v2/model.ts` (1295 lines): read fully.
- `src/v2/client.ts` (213 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
- `src/v2/index.ts` (43 lines): read fully.
