# Naming Audit: clusters

**Path:** `packages/clusters/src/v2/`
**Versions audited:** v2
**Inferred domain:** Databricks Spark cluster lifecycle (create/edit/start/restart/resize/delete/permanent-delete/pin/unpin/update/get/list), node-type catalogue, Spark-version catalogue, availability zones, and cluster-policy compliance.
**Total weird names flagged:** 20

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 16 |
| Low | 2 |
| Observation | 0 |

## High severity

### 1. `AzureAvailability.SPOT_AZURE` / `ON_DEMAND_AZURE` / `SPOT_WITH_FALLBACK_AZURE` — `src/v2/model.ts:28-37`
- **Why weird:** Every enum value redundantly re-states the enum's cloud (`_AZURE`). Same for `GcpAvailability.PREEMPTIBLE_GCP` / `ON_DEMAND_GCP` / `PREEMPTIBLE_WITH_FALLBACK_GCP` (`model.ts:151-154`). Compare with `AwsAvailability` (`model.ts:12-22`) where AWS-specific values are unprefixed (`SPOT`, `ON_DEMAND`, `SPOT_WITH_FALLBACK`). Three sibling enums, three different conventions — the `_AZURE`/`_GCP` suffix is a cloud tag, not a proto-style enum-name prefix, and it makes cross-cloud asymmetry visible at the call site.
- **Category:** 17 (inconsistent across the AWS/Azure/GCP triplet).
- **Suggested name:** Either drop `_AZURE`/`_GCP` from Azure/GCP to match AWS, or add the cloud suffix back to AWS (`SPOT_AWS`, `ON_DEMAND_AWS`, `SPOT_WITH_FALLBACK_AWS`). Pick one.
- **Rationale:** Cross-cloud asymmetry — the AWS triplet says one thing, Azure/GCP triplets say another. Either all three carry the cloud tag or none do.

### 2. `DataSecurityMode` duplicate-concept aliases — `src/v2/model.ts:99-134`
- **Why weird:** The enum's JSDoc itself notes some values are aliases: "`DATA_SECURITY_MODE_STANDARD`: Alias for `USER_ISOLATION`" and "`DATA_SECURITY_MODE_DEDICATED`: Alias for `SINGLE_USER`". So the enum has duplicate values for the same concept under different names.
- **Category:** 12 (duplicate concepts: STANDARD alias for USER_ISOLATION; DEDICATED alias for SINGLE_USER).
- **Suggested name:** Pick one of each aliased pair and document deprecation on the other.
- **Rationale:** Public SDK enums should not ship two members for one concept; one of each pair should be `@deprecated`.

## Medium severity

### 3. `Adlsgen2Info` casing — `src/v2/model.ts:917`
- **Why weird:** Type name is `Adlsgen2Info` — should be `AdlsGen2Info` to match acronym-casing rules. ADLS (Azure Data Lake Storage) Gen2 should retain the boundary between `Adls` and `Gen2`.
- **Category:** 3 (acronym casing inconsistency), 1 (vague `Info` suffix).
- **Suggested name:** `AdlsGen2Storage` (or just `AbfssStorage`, since the wire name is `abfss`).
- **Rationale:** Compare to sibling types `DbfsStorageInfo`, `GcsStorageInfo`, `S3StorageInfo` — all use `Info` suffix and capitalize the storage product. `Adlsgen2Info` is the odd one out.

### 4. `*StorageInfo` family naming inconsistency — `src/v2/model.ts:917,2101,2509,2875,3044,3391,3414`
- **Why weird:** `Adlsgen2Info` (no `Storage`), `DbfsStorageInfo`, `GcsStorageInfo`, `LocalFileInfo` (no `Storage`), `S3StorageInfo`, `VolumesStorageInfo`, `WorkspaceStorageInfo`. Seven sibling types; five say `StorageInfo`, two say `Info`.
- **Category:** 17 (inconsistent suffix across siblings).
- **Suggested name:** Standardise on `XStorage` (drop the redundant `Info`) — `AdlsGen2Storage`, `DbfsStorage`, `GcsStorage`, `LocalFileStorage`, `S3Storage`, `VolumesStorage`, `WorkspaceStorage`.
- **Rationale:** All seven describe the same kind of thing (a storage destination). Either all of them get `StorageInfo` or none do.

### 5. `ClusterCompliance` vs `*PolicyCompliance*` naming — `src/v2/model.ts:1253,2350,2361,2595,2812`
- **Why weird:** The package has `ClusterCompliance` (a result type), `GetPolicyComplianceForClusterRequest` (a request), `GetPolicyComplianceForClusterRequest_Response`, `EnforcePolicyComplianceForClusterRequest` (request), `ListClusterComplianceForPolicyRequest` (request — opposite direction). Each combines `Policy`/`Cluster`/`Compliance` in a different order. Reading them, it's not obvious which is "policies compliant with cluster" vs "clusters compliant with policy". The verb `For` is the disambiguator — fragile.
- **Category:** 1 (vague — `For` is the only disambiguator), 6 (misleading — easy to mis-parse).
- **Suggested name:** `GetClusterPolicyComplianceRequest`, `EnforceClusterPolicyComplianceRequest`, `ListPolicyCompliantClustersRequest`, `ClusterPolicyCompliance`.
- **Rationale:** Put the noun before the preposition; the `For` framing reads like SQL and is order-sensitive.

### 6. `hasChanges` field — `src/v2/model.ts:2366`
- **Why weird:** Boolean on `EnforcePolicyComplianceForClusterRequest_Response` named `has*` next to `changes: ClusterSettingsChange[]`. `hasChanges` is true iff `changes.length > 0` — redundant signal.
- **Category:** 12 (duplicate signal), 1 (vague).
- **Suggested name:** Drop the field, infer from `changes.length`.
- **Rationale:** Two ways to express the same predicate is one too many. Worth flagging upstream.

### 7. `useMlRuntime` field — `src/v2/model.ts:1210`
- **Why weird:** Boolean prefixed `use*`. Doc says "This field can only be used when kind = CLASSIC_PREVIEW". Mixed with the broader `runtimeEngine` enum field; two fields combine to determine the runtime. `useMlRuntime: boolean` next to `runtimeEngine: RuntimeEngine` — incongruent shape.
- **Category:** 1 (vague — `use` prefix); 6 (misleading — looks like a generic feature toggle but is conditional on `kind`); 17 (boolean + enum for the same concept).
- **Suggested name:** Either fold into `runtimeEngine` (add `ML` value) or rename `useMlRuntime` to `mlRuntimeEnabled` for consistency.
- **Rationale:** A boolean and an enum jointly describing one runtime selection is a boolean-shaped-enum smell.

### 8. `WorkloadType` vs `runtimeEngine` vs `kind` vs `dataSecurityMode` — overlap of "cluster mode"-ish fields
- **Why weird:** Four fields all describe some aspect of "what kind of cluster this is": `workloadType` (notebooks/jobs), `runtimeEngine` (STANDARD/PHOTON), `kind` (CLASSIC_PREVIEW or unset), `dataSecurityMode` (NONE/SINGLE_USER/USER_ISOLATION/…). Each is a separate optional enum/object. The names don't cluster well.
- **Category:** 12 (duplicate concept across fields), 1 (vague — `kind` and `workloadType` both could mean either thing).
- **Suggested name:** Consider grouping under a `clusterMode` substructure, or at least documenting the relationships.
- **Rationale:** Domain-level — flag to upstream that four overlapping enum/struct fields make the API hard to learn.

### 9. `NodeInstanceType.localDiskSizeGb` / `localNvmeDiskSizeGb` ordering — `src/v2/model.ts:2910,2912`
- **Why weird:** `localDisks`, then `localDiskSizeGb`, then `localNvmeDiskSizeGb`, then `localNvmeDisks` — the size of the nvme disks comes before the count of nvme disks, and the size of the regular disks comes between regular and nvme. Pairings are scrambled.
- **Category:** 17 (inconsistent grouping).
- **Suggested name:** Reorder fields, or rename to make the pairs clear: `localDiskCount`/`localDiskSizeGb`, then `localNvmeDiskCount`/`localNvmeDiskSizeGb`.
- **Rationale:** Within the same type, related fields should sit together.

### 10. `clusterLogStatus` field — `src/v2/model.ts:1330`
- **Why weird:** Type is `LogSyncStatus` but field is `clusterLogStatus`. Type and field have different mental models (`LogSync` vs `ClusterLog`).
- **Category:** 6 (misleading — type and field name don't match the same concept).
- **Suggested name:** Either rename the type to `ClusterLogStatus` or the field to `logSyncStatus`.
- **Rationale:** Same concept, two different names in 5 lines.

### 11. `jdbcPort` field — `src/v2/model.ts:1358`
- **Why weird:** All-lowercase acronym fragment. The package consistently uses Pascal-form for acronyms in identifiers elsewhere (`awsAttributes`, `gcpAttributes`, `ebsVolumeType`, `kmsKey`). `JdbcPort` would match.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `JdbcPort` (TS: `jdbcPort` is conventional in camelCase; flagged because the doc-text says "Spark JDBC server" — capitalisation in JSDoc says JDBC, identifier says jdbc).
- **Rationale:** Per the package conventions (`Aws`, `Gcp`, `Ebs`, `Kms`), `Jdbc` is actually consistent — but `Dns`, `Ip`, `Url`, `Iam`, `Vm` are inconsistent across the model (see #12).

### 12. Pervasive acronym-casing inconsistency (`Aws`, `Gcp`, `Ebs`, `Kms` vs `IP`, `DNS`, `URL`, `IAM`, `VM`) — across `model.ts`
- **Why weird:** The TS code uses PascalCase initial-capital for some acronyms (`Aws`, `Azure`, `Gcp`, `Ebs`, `Kms`, `Adls`, `Gcs`, `Dbfs`, `Acl`, `Arn`) but JSDoc and string constants use all-caps (`AWS`, `Azure`, `GCP`, `EBS`, `KMS`). Within enum values, all-caps wins (`AWS_AUTHORIZATION_FAILURE`). Type names mix: `AwsAttributes` but `S3StorageInfo` (S3 is all-caps). Field names mix: `privateIp` (lowercase ip), `publicDns` (lowercase dns), `kmsKey` (lowercase kms).
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** Pick one rule. Google TS style guide allows either `httpRequest` or `HTTPRequest` but requires consistency.
- **Rationale:** This is the single highest-friction naming issue across the package — every reader stumbles on it.

### 13. `S3StorageInfo.cannedAcl: string` — `src/v2/model.ts:3079`
- **Why weird:** `Acl` is AWS terminology; field is typed `string` rather than a `CannedAcl` enum despite AWS having a fixed canned-ACL list. JSDoc says "Set canned access control list for the logs, e.g. `bucket-owner-full-control`". Also note `cannedCal` typo in the doc body — likely meant `cannedAcl`.
- **Category:** 5 (cryptic abbreviation — `acl`), 16 (typed as string but values are enum-like), 3 (acronym casing — should it be `cannedACL`?).
- **Suggested name:** Type as an enum (`CannedS3Acl`); field `cannedAcl` is fine.
- **Rationale:** Typing as string surfaces every user's typo as a runtime failure when an enum would catch at compile time.

### 14. `S3StorageInfo.enableEncryption` + `encryptionType` + `kmsKey` — `src/v2/model.ts:3062,3067,3069`
- **Why weird:** Three independent fields encoding what could be one discriminated union: `enableEncryption=false` → no encryption; `enableEncryption=true, encryptionType='sse-s3'` → SSE-S3; `enableEncryption=true, encryptionType='sse-kms', kmsKey='...'` → SSE-KMS. Cross-field invariants encoded by convention.
- **Category:** 12 (duplicate concepts), 17 (could be a tagged union).
- **Suggested name:** Either nest these as a `S3Encryption` discriminated union, or rename to make the dependency explicit (`encryption: 'none' | 'sse-s3' | 'sse-kms'`).
- **Rationale:** Three booleans/strings tangled — easier API would be one discriminated field.

### 15. `SparkInfo` empty interface as proto namespace anchor — `src/v2/model.ts:3087`
- **Why weird:** `SparkInfo` is declared as an empty interface (`export interface SparkInfo {}`) whose JSDoc literally says "This is used in both the [[ClusterInfo]] for Cluster APIs and persisted cluster proto." Its only purpose is to namespace `SparkInfo_SparkNode` and `SparkInfo_SparkNode_SparkNodeAwsAttributes`. Empty wrapper types tied to "persisted cluster proto" are pure proto-architectural leak — the TS surface carries a do-nothing type just to mirror proto message nesting.
- **Category:** 14 (proto-style namespace anchor), 8 (JSDoc references the proto wire layer).
- **Suggested name:** Delete `SparkInfo`; expose `SparkNode` (and `SparkNodeAwsAttributes`) as top-level types.
- **Rationale:** TS doesn't need proto-style nesting; the empty parent interface is a generator artefact and a user-facing footgun (auto-completion shows a useless symbol).

### 16. `ClusterEventType` empty interface as proto namespace anchor — `src/v2/model.ts:1286`
- **Why weird:** `export interface ClusterEventType {}` is declared empty solely so the generator can nest the enum `ClusterEventType_ClusterEventType` under it. The doubly-nested `ClusterEventType_ClusterEventType` name (see #17) is the smoking gun — the parent exists only to host the child.
- **Category:** 14 (proto-style namespace anchor).
- **Suggested name:** Delete `ClusterEventType` (the parent) and flatten the enum to a top-level `ClusterEventType` enum. The empty wrapper adds no value.
- **Rationale:** Same as #15 — TS does not have proto's "message that contains an enum" pattern; the wrapper is a generator artefact.

### 17. `ClusterEventType_ClusterEventType` doubly-nested enum name — `src/v2/model.ts:749`
- **Why weird:** Enum named `ClusterEventType_ClusterEventType` — the same identifier repeated on both sides of the proto-nesting separator. This is a generator artefact when a proto message named `ClusterEventType` contains a nested enum also named `ClusterEventType`. In TS, the parent message (#16) is empty, so the doubly-stuttered name carries no information.
- **Category:** 14 (proto nesting stutter), 4 (redundant repetition).
- **Suggested name:** `ClusterEventType` (single, top-level).
- **Rationale:** After deleting the empty parent (#16), the child can drop the `ClusterEventType_` prefix entirely.

### 18. `DataPlaneEventDetails` / `DataPlaneClusterEventType` — control-plane vs data-plane infrastructure naming — `src/v2/model.ts:73,2093`
- **Why weird:** "Data plane" is an internal Databricks infrastructure concept (vs "control plane") — not a customer-facing domain term. Two public types prefix their names with the deployment-plane they originate from. A user creating a cluster does not need to know which plane emitted which event class; the distinction is a Databricks-internal architecture detail.
- **Category:** 8 (internal architecture leak in public surface).
- **Suggested name:** Either merge into a single `ClusterEventType` enum / `EventDetails` shape, or rename to a non-infrastructure word (e.g., `RuntimeEventDetails`).
- **Rationale:** Customer SDK consumers should not be expected to map "data plane" onto their mental model of Databricks. Flagged for upstream — same class as internal scheduler names leaking into public API.

## Low severity

### 19. `DockerImage.credsOneof` field name — `src/v2/model.ts:2124`
- **Why weird:** `credsOneof` is a discriminated-union container with a single `$case: 'basicAuth'` variant. The `Oneof` suffix leaks proto terminology; `Creds` is an abbreviation of `Credentials`.
- **Category:** 5 (cryptic abbreviation), 14 (proto-style `Oneof`).
- **Suggested name:** `credentials` (singular).
- **Rationale:** TS doesn't need to keep the `Oneof` suffix from proto.

### 20. `AutoScale` type name — `src/v2/model.ts:922`
- **Why weird:** PascalCase `AutoScale` is two words. Compare to `autoscale` field (lowercase, one word) and `autoterminationMinutes` (lowercase, one word). The type name is the outlier.
- **Category:** 3 (casing inconsistency), 17 (within-package inconsistency).
- **Suggested name:** `Autoscale` (one word, matching the field).
- **Rationale:** Matches sibling naming (`autoscale: Autoscale`).

## Observations

_None._

## Domain glossary

- `dbfs` — Databricks File System.
- `dbr` — Databricks Runtime (cluster runtime image).
- `dbu` — not encountered.
- `adls` — Azure Data Lake Storage (used as `Adlsgen2Info`, wire `abfss`).
- `abfss` — Azure Blob File System Secure (wire-side name for ADLS Gen2 destinations).
- `gcs` — Google Cloud Storage.
- `s3` — Amazon S3.
- `wsfs` — Workspace File System (per `WorkspaceStorageInfo` JSDoc).
- `ebs` — Elastic Block Store (AWS).
- `kms` — Key Management Service (AWS/GCP).
- `iam` — Identity and Access Management (AWS).
- `cmk` — Customer-Managed Key (`AZURE_BYOK_*`, `GCP_INACCESSIBLE_KMS_KEY_FAILURE` JSDoc).
- `byok` — Bring Your Own Key (cloud-key terminology, used in `AZURE_BYOK_KEY_PERMISSION_FAILURE`).
- `byoc` — Bring Your Own Container (used in JSDoc `"Custom docker image BYOC"`).
- `byo-vpc`, `byo-vnet` — Bring Your Own VPC/VNet (mentioned in JSDoc for `SLOW_IMAGE_DOWNLOAD`).
- `acl` — Access Control List.
- `arn` — Amazon Resource Name.
- `vpc` — Virtual Private Cloud (AWS).
- `vnet` — Virtual Network (Azure).
- `vm` — Virtual Machine.
- `gpu` — Graphics Processing Unit.
- `nvme` — Non-Volatile Memory Express (storage).
- `sse-s3` / `sse-kms` — Server-Side Encryption (S3 algorithms).
- `gke` — Google Kubernetes Engine (`GKE_BASED_CLUSTER_TERMINATION`).
- `k8s` — Kubernetes (used throughout `TerminationCode`).
- `repl` — Read-Eval-Print Loop (Spark REPL, per `model.ts:1343`).
- `jdbc` — Java Database Connectivity.
- `dns` — Domain Name System.
- `nic` — Network Interface Card (per `NETWORK_CHECK_NIC_FAILURE`).
- `nfs` — Network File System (per `NFS_MOUNT_FAILURE`).
- `npip` — No Public IP (Databricks networking jargon).
- `pat` — Personal Access Token (per `model.ts:603`).
- `sdp` — implied by client.ts:834 ("Databricks Jobs, SDP, or Models services"). Likely "Serverless Data Platform" or "Streaming Data Pipelines".
- `cmv1` / `cmv2` — Cluster Manager v1/v2 (Databricks internal scheduler generations).
- `imv2` — Instance Manager v2 (Databricks internal infra, per `INVALID_WORKER_IMAGE_FAILURE`).
- `nephos` — Internal serverless infra name (per `NEPHOS_RESOURCE_MANAGEMENT`).
- `cmk` — Customer-Managed Key.
- `chauffeur` — Internal Databricks driver-orchestration daemon (per `DRIVER_UNREACHABLE`).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `sts` — AWS Security Token Service (per `STS_CLIENT_SETUP_FAILURE`).
- `cprf` / `cplf` — Control Plane Request Failure / Cloud Provider Launch Failure (per `model.ts:629-631`).
- `sev_snp` — AMD Secure Encrypted Virtualization — Secure Nested Paging (GCP confidential VM, per `model.ts:70`).
- `csp` — Cloud Service Provider (per `is_csp_unified` in `model.ts:682`).
- `luks` — Linux Unified Key Setup (disk encryption, per `enableLocalDiskEncryption` JSDoc).
- `uc` — Unity Catalog (referenced in `VolumesStorageInfo`).
- `aip` — API Improvement Proposal (`https://google.aip.dev/161` referenced in `updateMask` field doc).

## File coverage
- `src/v2/model.ts` (5315 lines): read fully (in 800-line chunks).
- `src/v2/client.ts` (1523 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
