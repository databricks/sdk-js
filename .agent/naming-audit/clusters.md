# Naming Audit: clusters

**Path:** `packages/clusters/src/v2/`
**Versions audited:** v2
**Inferred domain:** Databricks Spark cluster lifecycle (create/edit/start/restart/resize/delete/permanent-delete/pin/unpin/update/get/list), node-type catalogue, Spark-version catalogue, availability zones, and cluster-policy compliance.
**Total weird names flagged:** 38

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 17 |
| Low | 6 |
| Observation | 7 |

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

### 3. `CloudProviderNodeStatus` enum uses non-SCREAMING_SNAKE wire values — `src/v2/model.ts:40-43`
- **Why weird:** `NOT_ENABLED_ON_SUBSCRIPTION = 'NotEnabledOnSubscription'` and `NOT_AVAILABLE_IN_REGION = 'NotAvailableInRegion'`. The TS identifier is `SCREAMING_SNAKE` (every other enum in this file follows that), but the wire value is `PascalCase`. Every other enum's wire value matches the TS identifier exactly.
- **Category:** 17 (inconsistent wire-value casing).
- **Suggested name:** Keep the SCREAMING_SNAKE TS identifier; this is an upstream wire-value inconsistency that the generator faithfully reproduces.
- **Rationale:** Highlight to upstream — the API surface should be uniform. Flagged here so downstream consumers know to expect PascalCase strings for this one enum.

### 4. `TerminationCode.*` — 150+ enum values, internal jargon and duplicated concepts — `src/v2/model.ts:175-734`
- **Why weird:** The enum has ~150 values; many encode the same concept three or four times. Examples: `BOOTSTRAP_TIMEOUT` vs `BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG` vs `BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION`; `INSTANCE_UNREACHABLE` vs `INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG`; `CONTROL_PLANE_REQUEST_FAILURE` vs `CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG` (whose JSDoc just says "CPRF, but due to misconfiguration on the customer's side"). Several values reference internal Databricks jargon: `NEPHOS_RESOURCE_MANAGEMENT`, `CHAUFFEUR`, `NPIP_TUNNEL`, `IN_PENALTY_BOX`, `CMv2`, `K8S_DBR_CLUSTER_LAUNCH_TIMEOUT`, `GKE_BASED_CLUSTER_TERMINATION`.
- **Category:** 5 (cryptic abbreviations — Nephos, CPRF, CPLF, CMv2, DBR, NPIP, CMK, K8s, IMv2), 8 (internal jargon in public surface), 12 (duplicate concepts — many `_DUE_TO_MISCONFIG` siblings duplicate the base reason), 18 (150-value enum size).
- **Suggested name:** Out of scope for a rename, but flag upstream: collapse `_DUE_TO_MISCONFIG` siblings into a structured field (`misconfig: boolean` on `TerminationReason`) instead of doubling every code; document internal-jargon codes for external consumers.
- **Rationale:** This is a public SDK; values like `IN_PENALTY_BOX` and `NEPHOS_RESOURCE_MANAGEMENT` leak internal-process names to customers and are unfit for external naming. Comments on `GCP_QUOTA_EXCEEDED` (`model.ts:426`) literally include a TODO about consolidating per-cloud reasons — the SDK is shipping the unconsolidated state. The enum size alone (150 values) is a domain concern.

### 5. `TerminationCode.AZURE_BYOK_KEY_PERMISSION_FAILURE` — `src/v2/model.ts:432`
- **Why weird:** `BYOK` is "Bring Your Own Key". Abbreviation used without expansion in either the enum value or the JSDoc.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** Expand to `AZURE_CUSTOMER_KEY_PERMISSION_FAILURE` or document `BYOK` inline.
- **Rationale:** External SDK users will not all know `BYOK` is a cloud-key acronym.

### 6. `TerminationCode.NPIP_TUNNEL_TOKEN_FAILURE` / `NPIP_TUNNEL_SETUP_FAILURE` — `src/v2/model.ts:320,361`
- **Why weird:** `NPIP` ("No Public IP") is internal Databricks networking terminology. Not expanded in JSDoc.
- **Category:** 5 (cryptic abbreviation), 8 (internal jargon in public surface).
- **Suggested name:** Rename to `NO_PUBLIC_IP_TUNNEL_*` or document `NPIP` in the enum docstring.
- **Rationale:** Same as #5; SDK users should not need to know Databricks' internal acronyms.

### 7. `TerminationCode.AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE` vs `GCP_IP_SPACE_EXHAUSTED` cross-cloud asymmetry — `src/v2/model.ts:379,590`
- **Why weird:** AWS enum value is 52 characters; GCP equivalent is 22 chars — same concept, very different length. JSDoc at line 421 explicitly TODOs consolidating these.
- **Category:** 17 (inconsistent across clouds).
- **Suggested name:** `AWS_SUBNET_IP_EXHAUSTED` (mirror the GCP form).
- **Rationale:** Per-cloud variants should follow the same shape; the AWS/GCP/Azure versions of the same condition should not differ in length by 30 characters.

### 8. `TerminationCode.ALLOCATION_TIMEOUT_*` family — eight near-identical codes — `src/v2/model.ts:661-686`
- **Why weird:** Eight `ALLOCATION_TIMEOUT_*` siblings all encode subtle internal scheduler states (e.g., `ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS` at line 686).
- **Category:** 12 (duplicate concept across eight near-identical codes).
- **Suggested name:** Collapse the family into `ALLOCATION_TIMEOUT` with a structured sub-field (`reason: string`) on `TerminationReason.parameters`.
- **Rationale:** Eight `ALLOCATION_TIMEOUT_*` codes look like the inverse of "values should be discriminator-friendly". External callers will hardly distinguish `NO_HEALTHY_CLUSTERS` from `NO_HEALTHY_AND_WARMED_UP_CLUSTERS`.

## Medium severity

### 9. `Adlsgen2Info` casing — `src/v2/model.ts:917`
- **Why weird:** Type name is `Adlsgen2Info` — should be `AdlsGen2Info` to match acronym-casing rules. ADLS (Azure Data Lake Storage) Gen2 should retain the boundary between `Adls` and `Gen2`.
- **Category:** 3 (acronym casing inconsistency), 1 (vague `Info` suffix).
- **Suggested name:** `AdlsGen2Storage` (or just `AbfssStorage`, since the wire name is `abfss`).
- **Rationale:** Compare to sibling types `DbfsStorageInfo`, `GcsStorageInfo`, `S3StorageInfo` — all use `Info` suffix and capitalize the storage product. `Adlsgen2Info` is the odd one out.

### 10. `*StorageInfo` family naming inconsistency — `src/v2/model.ts:917,2101,2509,2875,3044,3391,3414`
- **Why weird:** `Adlsgen2Info` (no `Storage`), `DbfsStorageInfo`, `GcsStorageInfo`, `LocalFileInfo` (no `Storage`), `S3StorageInfo`, `VolumesStorageInfo`, `WorkspaceStorageInfo`. Seven sibling types; five say `StorageInfo`, two say `Info`.
- **Category:** 17 (inconsistent suffix across siblings).
- **Suggested name:** Standardise on `XStorage` (drop the redundant `Info`) — `AdlsGen2Storage`, `DbfsStorage`, `GcsStorage`, `LocalFileStorage`, `S3Storage`, `VolumesStorage`, `WorkspaceStorage`.
- **Rationale:** All seven describe the same kind of thing (a storage destination). Either all of them get `StorageInfo` or none do.

### 11. `ClusterCompliance` vs `*PolicyCompliance*` naming — `src/v2/model.ts:1253,2350,2361,2595,2812`
- **Why weird:** The package has `ClusterCompliance` (a result type), `GetPolicyComplianceForClusterRequest` (a request), `GetPolicyComplianceForClusterRequest_Response`, `EnforcePolicyComplianceForClusterRequest` (request), `ListClusterComplianceForPolicyRequest` (request — opposite direction). Each combines `Policy`/`Cluster`/`Compliance` in a different order. Reading them, it's not obvious which is "policies compliant with cluster" vs "clusters compliant with policy". The verb `For` is the disambiguator — fragile.
- **Category:** 1 (vague — `For` is the only disambiguator), 6 (misleading — easy to mis-parse).
- **Suggested name:** `GetClusterPolicyComplianceRequest`, `EnforceClusterPolicyComplianceRequest`, `ListPolicyCompliantClustersRequest`, `ClusterPolicyCompliance`.
- **Rationale:** Put the noun before the preposition; the `For` framing reads like SQL and is order-sensitive.

### 12. `hasChanges` field — `src/v2/model.ts:2366`
- **Why weird:** Boolean on `EnforcePolicyComplianceForClusterRequest_Response` named `has*` next to `changes: ClusterSettingsChange[]`. `hasChanges` is true iff `changes.length > 0` — redundant signal.
- **Category:** 12 (duplicate signal), 1 (vague).
- **Suggested name:** Drop the field, infer from `changes.length`.
- **Rationale:** Two ways to express the same predicate is one too many. Worth flagging upstream.

### 13. `useMlRuntime` field — `src/v2/model.ts:1210`
- **Why weird:** Boolean prefixed `use*`. Doc says "This field can only be used when kind = CLASSIC_PREVIEW". Mixed with the broader `runtimeEngine` enum field; two fields combine to determine the runtime. `useMlRuntime: boolean` next to `runtimeEngine: RuntimeEngine` — incongruent shape.
- **Category:** 1 (vague — `use` prefix); 6 (misleading — looks like a generic feature toggle but is conditional on `kind`); 17 (boolean + enum for the same concept).
- **Suggested name:** Either fold into `runtimeEngine` (add `ML` value) or rename `useMlRuntime` to `mlRuntimeEnabled` for consistency.
- **Rationale:** A boolean and an enum jointly describing one runtime selection is a boolean-shaped-enum smell.

### 14. `WorkloadType` vs `runtimeEngine` vs `kind` vs `dataSecurityMode` — overlap of "cluster mode"-ish fields
- **Why weird:** Four fields all describe some aspect of "what kind of cluster this is": `workloadType` (notebooks/jobs), `runtimeEngine` (STANDARD/PHOTON), `kind` (CLASSIC_PREVIEW or unset), `dataSecurityMode` (NONE/SINGLE_USER/USER_ISOLATION/…). Each is a separate optional enum/object. The names don't cluster well.
- **Category:** 12 (duplicate concept across fields), 1 (vague — `kind` and `workloadType` both could mean either thing).
- **Suggested name:** Consider grouping under a `clusterMode` substructure, or at least documenting the relationships.
- **Rationale:** Domain-level — flag to upstream that four overlapping enum/struct fields make the API hard to learn.

### 15. `NodeInstanceType.localDiskSizeGb` / `localNvmeDiskSizeGb` ordering — `src/v2/model.ts:2910,2912`
- **Why weird:** `localDisks`, then `localDiskSizeGb`, then `localNvmeDiskSizeGb`, then `localNvmeDisks` — the size of the nvme disks comes before the count of nvme disks, and the size of the regular disks comes between regular and nvme. Pairings are scrambled.
- **Category:** 17 (inconsistent grouping).
- **Suggested name:** Reorder fields, or rename to make the pairs clear: `localDiskCount`/`localDiskSizeGb`, then `localNvmeDiskCount`/`localNvmeDiskSizeGb`.
- **Rationale:** Within the same type, related fields should sit together.

### 16. `clusterLogStatus` field — `src/v2/model.ts:1330`
- **Why weird:** Type is `LogSyncStatus` but field is `clusterLogStatus`. Type and field have different mental models (`LogSync` vs `ClusterLog`).
- **Category:** 6 (misleading — type and field name don't match the same concept).
- **Suggested name:** Either rename the type to `ClusterLogStatus` or the field to `logSyncStatus`.
- **Rationale:** Same concept, two different names in 5 lines.

### 17. `jdbcPort` field — `src/v2/model.ts:1358`
- **Why weird:** All-lowercase acronym fragment. The package consistently uses Pascal-form for acronyms in identifiers elsewhere (`awsAttributes`, `gcpAttributes`, `ebsVolumeType`, `kmsKey`). `JdbcPort` would match.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `JdbcPort` (TS: `jdbcPort` is conventional in camelCase; flagged because the doc-text says "Spark JDBC server" — capitalisation in JSDoc says JDBC, identifier says jdbc).
- **Rationale:** Per the package conventions (`Aws`, `Gcp`, `Ebs`, `Kms`), `Jdbc` is actually consistent — but `Dns`, `Ip`, `Url`, `Iam`, `Vm` are inconsistent across the model (see #18).

### 18. Pervasive acronym-casing inconsistency (`Aws`, `Gcp`, `Ebs`, `Kms` vs `IP`, `DNS`, `URL`, `IAM`, `VM`) — across `model.ts`
- **Why weird:** The TS code uses PascalCase initial-capital for some acronyms (`Aws`, `Azure`, `Gcp`, `Ebs`, `Kms`, `Adls`, `Gcs`, `Dbfs`, `Acl`, `Arn`) but JSDoc and string constants use all-caps (`AWS`, `Azure`, `GCP`, `EBS`, `KMS`). Within enum values, all-caps wins (`AWS_AUTHORIZATION_FAILURE`). Type names mix: `AwsAttributes` but `S3StorageInfo` (S3 is all-caps). Field names mix: `privateIp` (lowercase ip), `publicDns` (lowercase dns), `kmsKey` (lowercase kms).
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** Pick one rule. Google TS style guide allows either `httpRequest` or `HTTPRequest` but requires consistency.
- **Rationale:** This is the single highest-friction naming issue across the package — every reader stumbles on it.

### 19. `S3StorageInfo.cannedAcl: string` — `src/v2/model.ts:3079`
- **Why weird:** `Acl` is AWS terminology; field is typed `string` rather than a `CannedAcl` enum despite AWS having a fixed canned-ACL list. JSDoc says "Set canned access control list for the logs, e.g. `bucket-owner-full-control`". Also note `cannedCal` typo in the doc body — likely meant `cannedAcl`.
- **Category:** 5 (cryptic abbreviation — `acl`), 16 (typed as string but values are enum-like), 3 (acronym casing — should it be `cannedACL`?).
- **Suggested name:** Type as an enum (`CannedS3Acl`); field `cannedAcl` is fine.
- **Rationale:** Typing as string surfaces every user's typo as a runtime failure when an enum would catch at compile time.

### 20. `S3StorageInfo.enableEncryption` + `encryptionType` + `kmsKey` — `src/v2/model.ts:3062,3067,3069`
- **Why weird:** Three independent fields encoding what could be one discriminated union: `enableEncryption=false` → no encryption; `enableEncryption=true, encryptionType='sse-s3'` → SSE-S3; `enableEncryption=true, encryptionType='sse-kms', kmsKey='...'` → SSE-KMS. Cross-field invariants encoded by convention.
- **Category:** 12 (duplicate concepts), 17 (could be a tagged union).
- **Suggested name:** Either nest these as a `S3Encryption` discriminated union, or rename to make the dependency explicit (`encryption: 'none' | 'sse-s3' | 'sse-kms'`).
- **Rationale:** Three booleans/strings tangled — easier API would be one discriminated field.

### 21. `S3StorageInfo.region` / `endpoint` mutually-exclusive pair — `src/v2/model.ts:3055,3060`
- **Why weird:** JSDoc explicitly says "Either region or endpoint needs to be set. If both are set, endpoint will be used." Mutually-exclusive fields not encoded in the type.
- **Category:** 16 (field-pair constraint not in the type).
- **Suggested name:** Could be a discriminated union `{kind: 'region', value: string} | {kind: 'endpoint', value: string}`.
- **Rationale:** Type-system-encodable constraint; flagged for upstream.

### 22. `SparkInfo` empty interface as proto namespace anchor — `src/v2/model.ts:3087`
- **Why weird:** `SparkInfo` is declared as an empty interface (`export interface SparkInfo {}`) whose JSDoc literally says "This is used in both the [[ClusterInfo]] for Cluster APIs and persisted cluster proto." Its only purpose is to namespace `SparkInfo_SparkNode` and `SparkInfo_SparkNode_SparkNodeAwsAttributes`. Empty wrapper types tied to "persisted cluster proto" are pure proto-architectural leak — the TS surface carries a do-nothing type just to mirror proto message nesting.
- **Category:** 14 (proto-style namespace anchor), 8 (JSDoc references the proto wire layer).
- **Suggested name:** Delete `SparkInfo`; expose `SparkNode` (and `SparkNodeAwsAttributes`) as top-level types.
- **Rationale:** TS doesn't need proto-style nesting; the empty parent interface is a generator artefact and a user-facing footgun (auto-completion shows a useless symbol).

### 23. `ClusterEventType` empty interface as proto namespace anchor — `src/v2/model.ts:1286`
- **Why weird:** `export interface ClusterEventType {}` is declared empty solely so the generator can nest the enum `ClusterEventType_ClusterEventType` under it. The doubly-nested `ClusterEventType_ClusterEventType` name (see #24) is the smoking gun — the parent exists only to host the child.
- **Category:** 14 (proto-style namespace anchor).
- **Suggested name:** Delete `ClusterEventType` (the parent) and flatten the enum to a top-level `ClusterEventType` enum. The empty wrapper adds no value.
- **Rationale:** Same as #22 — TS does not have proto's "message that contains an enum" pattern; the wrapper is a generator artefact.

### 24. `ClusterEventType_ClusterEventType` doubly-nested enum name — `src/v2/model.ts:749`
- **Why weird:** Enum named `ClusterEventType_ClusterEventType` — the same identifier repeated on both sides of the proto-nesting separator. This is a generator artefact when a proto message named `ClusterEventType` contains a nested enum also named `ClusterEventType`. In TS, the parent message (#23) is empty, so the doubly-stuttered name carries no information.
- **Category:** 14 (proto nesting stutter), 4 (redundant repetition).
- **Suggested name:** `ClusterEventType` (single, top-level).
- **Rationale:** After deleting the empty parent (#23), the child can drop the `ClusterEventType_` prefix entirely.

### 25. `DataPlaneEventDetails` / `DataPlaneClusterEventType` — control-plane vs data-plane infrastructure naming — `src/v2/model.ts:73,2093`
- **Why weird:** "Data plane" is an internal Databricks infrastructure concept (vs "control plane") — not a customer-facing domain term. Two public types prefix their names with the deployment-plane they originate from. A user creating a cluster does not need to know which plane emitted which event class; the distinction is a Databricks-internal architecture detail.
- **Category:** 8 (internal architecture leak in public surface).
- **Suggested name:** Either merge into a single `ClusterEventType` enum / `EventDetails` shape, or rename to a non-infrastructure word (e.g., `RuntimeEventDetails`).
- **Rationale:** Customer SDK consumers should not be expected to map "data plane" onto their mental model of Databricks. Flagged for upstream — same class as `NEPHOS_RESOURCE_MANAGEMENT` (item #4) and `CMv2` (internal scheduler names leaking into public API).

## Low severity

### 26. `ClusterInfo.sparkContextId: number` — `src/v2/model.ts:1353`
- **Why weird:** Field is named `sparkContextId` but typed as `number`. Other IDs in the model are strings (`clusterId`, `policyId`, `nodeTypeId`). Internal Spark context IDs are 64-bit ints — the type clash hints at potential JS number-precision issues for large IDs.
- **Category:** 19 (underspecified ID — different type from sibling IDs).
- **Suggested name:** Keep but consider `bigint` typing or document the precision risk.
- **Rationale:** JS number safe-integer range is 2^53; if Spark uses 64-bit IDs, this is a latent bug.

### 27. `DockerImage.credsOneof` field name — `src/v2/model.ts:2124`
- **Why weird:** `credsOneof` is a discriminated-union container with a single `$case: 'basicAuth'` variant. The `Oneof` suffix leaks proto terminology; `Creds` is an abbreviation of `Credentials`.
- **Category:** 5 (cryptic abbreviation), 14 (proto-style `Oneof`).
- **Suggested name:** `credentials` (singular).
- **Rationale:** TS doesn't need to keep the `Oneof` suffix from proto.

### 28. `AwsAttributes.spotBidPricePercent: number` — `src/v2/model.ts:981`
- **Why weird:** Field is a percentage but typed as `number` (no unit hint). Compare `AzureAttributes.spotBidMaxPrice: number` (`model.ts:1041`) — Azure version uses a raw price, AWS uses a percentage. Different semantics, same `number` type.
- **Category:** 17 (sibling AWS/Azure shapes differ), 1 (`number` without unit suffix).
- **Suggested name:** `spotBidPricePercent` is fine; flag for upstream — the AWS/Azure semantics should be more discoverable from the model.
- **Rationale:** Cross-cloud asymmetry is a domain concern.

### 29. `AzureAttributes.spotBidMaxPrice` JSDoc reference to `>0 or -1` magic numbers — `src/v2/model.ts:1041`
- **Why weird:** Magic value `-1` overloaded as "do not evict on price basis". Encoded in JSDoc, not in the type.
- **Category:** 16 (sentinel value in scalar field), Observation.
- **Suggested name:** N/A; flag for upstream to consider a sentinel enum or `null`.
- **Rationale:** Sentinels in scalar fields are old-school API design.

### 30. `EnforcePolicyComplianceForClusterRequest_Response_ClusterSettingsChange.previousValue` / `newValue` — `src/v2/model.ts:2390,2397`
- **Why weird:** Both fields typed as `string`. JSDoc says values are "either a number, a boolean, or a string converted to a string." Pre-stringified union encoded as plain string — caller must re-parse.
- **Category:** 16 (type contradicts domain — it's actually `number | boolean | string` flattened to string).
- **Suggested name:** Type as `string | number | boolean`, or `previousValueRaw`.
- **Rationale:** Documents the stringification rather than hiding it.

### 31. `AutoScale` type name — `src/v2/model.ts:922`
- **Why weird:** PascalCase `AutoScale` is two words. Compare to `autoscale` field (lowercase, one word) and `autoterminationMinutes` (lowercase, one word). The type name is the outlier.
- **Category:** 3 (casing inconsistency), 17 (within-package inconsistency).
- **Suggested name:** `Autoscale` (one word, matching the field).
- **Rationale:** Matches sibling naming (`autoscale: Autoscale`).

## Observations

### 32. Seven Waiter classes with identical shape — `client.ts:967-1523`
The file declares `CreateClusterWaiter`, `DeleteClusterWaiter`, `EditClusterWaiter`, `ResizeClusterWaiter`, `RestartClusterWaiter`, `StartClusterWaiter`, `UpdateClusterWaiter` — 557 lines. The only variation between them is the set of terminal `ClusterState` values they accept (e.g., `CreateClusterWaiter` treats `RUNNING` as success and `TERMINATED` as failure; `DeleteClusterWaiter` does the opposite). The rest is copy-pasted.
- **Category:** 12 (duplicate concept across seven classes), Observation.
- **Suggested:** A generic `ClusterStateWaiter` parameterised by the success/failure state sets would shrink this to ~80 lines.

### 33. `_req` parameter for empty request types — `client.ts:404,486,514`
Several methods take a `_req: ListAvailableZonesRequest` / `_req: ListNodeTypesRequest` / `_req: GetSparkVersionsRequest` parameter even though the request types are empty (`{}`). The underscore prefix avoids the unused-arg lint warning. Indicates the generator does not collapse empty requests.
- **Category:** Observation (generator artefact).

### 34. `ResizeClusterRequest` / `RestartClusterRequest` requests are partial overlaps
`ResizeClusterRequest` carries `clusterId` and `size`; `RestartClusterRequest` carries `clusterId` and `restartUser`; `StartClusterRequest` carries only `clusterId`. Three near-identical types; could be one.
- **Category:** 12 (duplicate concept), Observation.

### 35. `_req` unused vs `req` used — inconsistency in method-signature lint
Three client methods use `_req` (where the request type is empty), the rest use `req` (where it's not). Pure mechanical.
- **Category:** Observation.

### 36. `clusterId?: string | undefined` shape
Every request type that targets a cluster has `clusterId?: string | undefined`. `?` (optional) plus `undefined` is the explicit-undefined style used throughout. But `clusterId` is semantically required for many operations (delete, edit, restart, etc.). Marking it optional means the runtime check `if (req.clusterId === undefined) throw new Error(...)` appears in every waiter constructor (`client.ts:258,304,357,641,683,733,817`).
- **Category:** 6 (misleading optional — should be required), Observation.

### 37. `executeCall` / `executeHttpCall` (`utils.ts:26,65`)
Two functions whose names differ only by `Http`. Same pair-naming concern flagged in `abacpolicies.md` audit (item #36 there).
- **Category:** 1 (vague), 17 (inconsistent), Observation.

### 38. `flattenQueryParams` exported but unused (`utils.ts:123`)
The function is exported but `client.ts` never calls it. (Cluster v2 endpoints with query params do it inline.) Same observation as in `abacpolicies.md`.
- **Category:** Observation (dead public surface).

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
