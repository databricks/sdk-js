# Naming Audit: clusters

**Path:** `packages/clusters/src/v2/`
**Versions audited:** v2
**Inferred domain:** Databricks Spark cluster lifecycle (create/edit/start/restart/resize/delete/permanent-delete/pin/unpin/update/get/list), node-type catalogue, Spark-version catalogue, availability zones, and cluster-policy compliance.
**Total weird names flagged:** 87

## Summary
| Severity | Count |
| --- | --- |
| High | 19 |
| Medium | 32 |
| Low | 26 |
| Observation | 10 |

## High severity

### 1. Cluster-State enum named `ClusterState_ClusterState` — `src/v2/model.ts:777`
- **Why weird:** Identifier doubles up the same word. Required `eslint-disable @typescript-eslint/naming-convention`. The user-visible enum is therefore `ClusterState_ClusterState.RUNNING`, which is almost cartoonishly verbose.
- **Category:** 4 (underscore in TS identifier), 6 (misleading — the doubled word reads as a typo), 14 (proto-style nested-enum noise).
- **Suggested name:** Re-export `ClusterState_ClusterState` as `ClusterState` from `index.ts`. (Note: the type declaration still leaks the proto-style name.)
- **Rationale:** TypeScript has no need to mirror the protobuf "outer message" wrapper at the call site. The current shape forces every caller to write `ClusterState_ClusterState.RUNNING`, which is jarring and forced the client to write `pollResp.state === ClusterState_ClusterState.RUNNING` (`client.ts:907`, `:949`, `:987`, etc.).

### 2. `AzureAvailability.SPOT_AZURE` / `ON_DEMAND_AZURE` / `SPOT_WITH_FALLBACK_AZURE` — `src/v2/model.ts:29-37`
- **Why weird:** Every enum value redundantly re-states the enum's cloud (`_AZURE`). Same for `GcpAvailability.PREEMPTIBLE_GCP` / `ON_DEMAND_GCP` / `PREEMPTIBLE_WITH_FALLBACK_GCP` (`model.ts:146-148`). Compare with `AwsAvailability` (`model.ts:12-22`) where AWS-specific values are unprefixed (`SPOT`, `ON_DEMAND`, `SPOT_WITH_FALLBACK`). Three sibling enums, three different conventions.
- **Category:** 2 (redundant enum prefix), 17 (inconsistent across the AWS/Azure/GCP triplet).
- **Suggested name:** `AzureAvailability.Spot | OnDemand | SpotWithFallback` and `GcpAvailability.Preemptible | OnDemand | PreemptibleWithFallback`.
- **Rationale:** The enum name already states the cloud (`AzureAvailability`). Wire values can stay as-is; TS enum identifiers should not duplicate the type. AWS already does it correctly — Azure/GCP should follow.

### 3. `ComputeKind.COMPUTE_KIND_UNSPECIFIED` — `src/v2/model.ts:58`
- **Why weird:** Member name re-states the enum name as a prefix. TypeScript enums are already namespaced; `ComputeKind.UNSPECIFIED` is the same wire string with no prefix duplication.
- **Category:** 2 (redundant enum prefix), 14 (proto-style).
- **Suggested name:** `ComputeKind.Unspecified | ClassicPreview`. Better yet, drop `Unspecified` entirely and use `kind?: ComputeKind | undefined`.
- **Rationale:** Same logic as #2. `COMPUTE_KIND_` is pure proto noise.

### 4. `ConfidentialComputeType.CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED` / `CONFIDENTIAL_COMPUTE_TYPE_NONE` — `src/v2/model.ts:69-70`
- **Why weird:** Same redundant prefix as #3 but worse — the enum has three values, two of which carry the full prefix, while the third (`SEV_SNP`) does not. So readers see `CONFIDENTIAL_COMPUTE_TYPE_NONE` next to `SEV_SNP` and have to guess at the pattern.
- **Category:** 2 (redundant prefix), 17 (inconsistent within the same enum).
- **Suggested name:** `ConfidentialComputeType.Unspecified | None | SevSnp`. Drop `Unspecified` to rely on `confidentialComputeType?: ConfidentialComputeType | undefined`.
- **Rationale:** Enums should pick one prefix convention; this one mixes both within three values.

### 5. `DataSecurityMode.DATA_SECURITY_MODE_STANDARD` / `DATA_SECURITY_MODE_DEDICATED` / `DATA_SECURITY_MODE_AUTO` — `src/v2/model.ts:123-127`
- **Why weird:** Three values redundantly prefixed with `DATA_SECURITY_MODE_`. The other six values in the enum (`NONE`, `SINGLE_USER`, `USER_ISOLATION`, `LEGACY_TABLE_ACL`, `LEGACY_PASSTHROUGH`, `LEGACY_SINGLE_USER`, `LEGACY_SINGLE_USER_STANDARD`) are unprefixed. So the same enum mixes both styles. The JSDoc itself notes some are aliases: "`DATA_SECURITY_MODE_STANDARD`: Alias for `USER_ISOLATION`". So the enum has duplicate values for the same concept and inconsistent naming.
- **Category:** 2 (redundant prefix), 12 (duplicate concepts: STANDARD alias for USER_ISOLATION; DEDICATED alias for SINGLE_USER), 17 (mixed prefix/no-prefix in one enum).
- **Suggested name:** Either align (`DataSecurityMode.Auto | Standard | Dedicated` and drop the long-form aliases) or normalise away the aliases.
- **Rationale:** Public SDK enums should not ship both `USER_ISOLATION` and `DATA_SECURITY_MODE_STANDARD` if they mean the same thing — pick one, document deprecation on the other.

### 6. `CloudProviderNodeStatus` enum uses non-SCREAMING_SNAKE wire values — `src/v2/model.ts:40-43`
- **Why weird:** `NOT_ENABLED_ON_SUBSCRIPTION = 'NotEnabledOnSubscription'` and `NOT_AVAILABLE_IN_REGION = 'NotAvailableInRegion'`. The TS identifier is `SCREAMING_SNAKE` (every other enum in this file follows that), but the wire value is `PascalCase`. Every other enum's wire value matches the TS identifier exactly.
- **Category:** 17 (inconsistent wire-value casing).
- **Suggested name:** Keep the SCREAMING_SNAKE TS identifier; this is an upstream wire-value inconsistency that the generator faithfully reproduces.
- **Rationale:** Highlight to upstream — the API surface should be uniform. Flagged here so downstream consumers know to expect PascalCase strings for this one enum.

### 7. `TerminationCode.*` — 150+ enum values, many proto-style noisy — `src/v2/model.ts:164-748`
- **Why weird:** The enum has ~150 values; many encode the same concept three or four times. Examples: `BOOTSTRAP_TIMEOUT` vs `BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG` vs `BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION`; `INSTANCE_UNREACHABLE` vs `INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG`; `CONTROL_PLANE_REQUEST_FAILURE` vs `CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG` (whose JSDoc just says "CPRF, but due to misconfiguration on the customer's side"). Several values reference internal Databricks jargon: `NEPHOS_RESOURCE_MANAGEMENT`, `CHAUFFEUR`, `NPIP_TUNNEL`, `IN_PENALTY_BOX`, `CMv2`, `K8S_DBR_CLUSTER_LAUNCH_TIMEOUT`, `GKE_BASED_CLUSTER_TERMINATION`.
- **Category:** 5 (cryptic abbreviations — Nephos, CPRF, CPLF, CMv2, DBR, NPIP, CMK, K8s, IMv2), 12 (duplicate concepts — many `_DUE_TO_MISCONFIG` siblings duplicate the base reason), 18 (long enum values).
- **Suggested name:** Out of scope for a rename, but flag upstream: collapse `_DUE_TO_MISCONFIG` siblings into a structured field (`misconfig: boolean` on `TerminationReason`) instead of doubling every code; document internal-jargon codes for external consumers.
- **Rationale:** This is a public SDK; values like `IN_PENALTY_BOX` and `NEPHOS_RESOURCE_MANAGEMENT` leak internal-process names to customers and are unfit for external naming. Comments on `GCP_QUOTA_EXCEEDED` (`model.ts:410`) literally include a TODO about consolidating per-cloud reasons — the SDK is shipping the unconsolidated state.

### 8. `TerminationCode.AZURE_BYOK_KEY_PERMISSION_FAILURE` — `src/v2/model.ts:421`
- **Why weird:** `BYOK` is "Bring Your Own Key". Abbreviation used without expansion in either the enum value or the JSDoc.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** Expand to `AZURE_CUSTOMER_KEY_PERMISSION_FAILURE` or document `BYOK` inline.
- **Rationale:** External SDK users will not all know `BYOK` is a cloud-key acronym.

### 9. `TerminationCode.NPIP_TUNNEL_TOKEN_FAILURE` / `NPIP_TUNNEL_SETUP_FAILURE` — `src/v2/model.ts:309,350`
- **Why weird:** `NPIP` ("No Public IP") is internal Databricks networking terminology. Not expanded in JSDoc.
- **Category:** 5 (cryptic abbreviation), 8 (internal jargon in public surface).
- **Suggested name:** Rename to `NO_PUBLIC_IP_TUNNEL_*` or document `NPIP` in the enum docstring.
- **Rationale:** Same as #8; SDK users should not need to know Databricks' internal acronyms.

### 10. `TerminationCode.K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` / `DBR_IMAGE_RESOLUTION_FAILURE` — `src/v2/model.ts:380,729`
- **Why weird:** `DBR` ("Databricks Runtime") and `K8S` ("Kubernetes") used together with no expansion. JSDoc on line 380 says "DBR Cluster launched on K8s (i.e. CMv2)" — three acronyms in one sentence.
- **Category:** 5 (cryptic abbreviation), 8 (jargon).
- **Suggested name:** Expand acronyms in JSDoc minimum; consider renaming to `DATABRICKS_RUNTIME_CLUSTER_LAUNCH_TIMEOUT_KUBERNETES`.
- **Rationale:** Internal SDK people read `DBR` daily; external consumers don't.

### 11. `TerminationCode.AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE` — `src/v2/model.ts:368`
- **Why weird:** Enum value is 52 characters long; says "AWS insufficient free addresses in subnet failure". GCP equivalent is `GCP_IP_SPACE_EXHAUSTED` (`model.ts:579`), 22 chars — same concept, very different length. JSDoc at line 410 explicitly TODOs consolidating these.
- **Category:** 7 (overly verbose), 17 (inconsistent across clouds), 18 (long enum value).
- **Suggested name:** `AWS_SUBNET_IP_EXHAUSTED` (mirror the GCP form).
- **Rationale:** Per-cloud variants should follow the same shape; the AWS/GCP/Azure versions of the same condition should not differ in length by 30 characters.

### 12. `TerminationCode.AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE` / `AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE` — `src/v2/model.ts:323,493`
- **Why weird:** 45- and 41-character enum values. Both are Azure-deployment-template-specific. AWS and GCP do not have equivalents at this length.
- **Category:** 7 (overly verbose), 18 (long enum value).
- **Suggested name:** `AZURE_DEPLOYMENT_TEMPLATE_FAILURE`, `AZURE_PACKED_DEPLOYMENT_FAILURE` (drop the qualifier; let the JSDoc carry the nuance).
- **Rationale:** Public enums should be readable at a glance.

### 13. `TerminationCode.ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS` — `src/v2/model.ts:675`
- **Why weird:** 53-character enum value. Eight `ALLOCATION_TIMEOUT_*` siblings (`model.ts:650-675`) all encode subtle internal scheduler states.
- **Category:** 7 (overly verbose), 12 (duplicate concept across eight near-identical codes), 18 (long enum value).
- **Suggested name:** Collapse the family into `ALLOCATION_TIMEOUT` with a structured sub-field (`reason: string`) on `TerminationReason.parameters`.
- **Rationale:** Eight `ALLOCATION_TIMEOUT_*` codes look like the inverse of "values should be discriminator-friendly". External callers will hardly distinguish `NO_HEALTHY_CLUSTERS` from `NO_HEALTHY_AND_WARMED_UP_CLUSTERS`.

### 14. `_Response` suffix and Proto-style nested types — pervasive throughout
- **Why weird:** 14+ `_Response` interfaces (`ChangeClusterOwner_Response`, `CreateCluster_Response`, `DeleteCluster_Response`, `EditCluster_Response`, `EnforcePolicyComplianceForCluster_Response`, `EnforcePolicyComplianceForCluster_Response_ClusterSettingsChange`, `GetPolicyComplianceForCluster_Response`, `GetSparkVersions_Response`, `ListAvailableZones_Response`, `ListClusterComplianceForPolicy_Response`, `ListClusters_Response`, `ListNodeTypes_Response`, `PermanentDeleteCluster_Response`, `PinCluster_Response`, `ResizeCluster_Response`, `RestartCluster_Response`, `StartCluster_Response`, `UnpinCluster_Response`, `UpdateCluster_Response`). Each requires an `eslint-disable @typescript-eslint/naming-convention`.
- **Category:** 4 (underscores in TS identifier), 14 (proto-style naming).
- **Suggested name:** Rename to `CreateClusterResponse` etc.
- **Rationale:** Strict-type-checked ESLint rejects `Foo_Bar`. The `_Response` suffix is pure proto-style noise in a TypeScript identifier.

### 15. `ClusterInfo_ComputeSpec_CustomTagsEntry`, `ClusterInfo_SparkConfEntry`, etc. — 16 underscore-laden map-entry types
- **Why weird:** 16 interfaces with names like `ClusterInfo_ComputeSpec_CustomTagsEntry` (`model.ts:1412`), `ClusterInfo_ComputeSpec_SparkConfEntry` (`model.ts:1429`), `ClusterInfo_ComputeSpec_SparkEnvVarsEntry` (`model.ts:1436`), `ClusterInfo_CustomTagsEntry`, `ClusterInfo_DefaultTagsEntry`, `ClusterInfo_SparkConfEntry`, `ClusterInfo_SparkEnvVarsEntry`, `CreateCluster_CustomTagsEntry`, `CreateCluster_SparkConfEntry`, `CreateCluster_SparkEnvVarsEntry`, `EditCluster_CustomTagsEntry`, `EditCluster_SparkConfEntry`, `EditCluster_SparkEnvVarsEntry`, `UpdateCluster_UpdateClusterResource_CustomTagsEntry`, `UpdateCluster_UpdateClusterResource_SparkConfEntry`, `UpdateCluster_UpdateClusterResource_SparkEnvVarsEntry`. Each carries the same `{key?: string; value?: string}` shape — sixteen distinct names for one concept.
- **Category:** 4 (underscores), 12 (duplicate concepts — same `{key, value}` shape 16 times).
- **Suggested name:** Consolidate around the wire-equivalent `Record<string, string>` form already used by the parent fields and marshal/unmarshal schemas.
- **Rationale:** These types exist only because protobuf models maps as repeated `Entry` messages. TypeScript has built-in `Record<>` — sixteen separate `{key, value}` types for the same concept is pure proto-style duplication.

### 16. `UpdateCluster_UpdateClusterResource` — `src/v2/model.ts:2590`
- **Why weird:** Name doubles up: `UpdateCluster_UpdateClusterResource`. The field is `UpdateCluster.cluster: UpdateCluster_UpdateClusterResource` (`model.ts:2581`). So the user writes `req.cluster` and the type is `UpdateCluster_UpdateClusterResource`. Three underscores worth of proto noise. Same body across `CreateCluster`, `EditCluster`, `UpdateCluster_UpdateClusterResource` (they have 28 identical fields each).
- **Category:** 4 (underscore), 6 (misleading: shouldn't this just be `ClusterSpec` or `Cluster`?), 8 (redundant `Resource` suffix), 12 (duplicate concept with `CreateCluster`/`EditCluster`/`ClusterInfo_ComputeSpec`), 14 (proto-style nested message).
- **Suggested name:** `ClusterSpec` (and reuse for `CreateCluster`, `EditCluster`, `ClusterInfo.spec`).
- **Rationale:** The type holds cluster configuration — the same configuration four request types describe. Collapsing to a shared `ClusterSpec` removes duplication and naming weirdness in one move.

### 17. `ClusterInfo_ComputeSpec` — `src/v2/model.ts:1229`
- **Why weird:** Underscored type name; near-identical to `UpdateCluster_UpdateClusterResource` (28 of 28 fields overlap). The JSDoc says "Contains a snapshot of the latest user specified settings". `Spec`/`ClusterSpec` would be sufficient.
- **Category:** 4 (underscore), 12 (duplicate of #16), 14 (proto-style nested).
- **Suggested name:** Use shared `ClusterSpec`.
- **Rationale:** Same as #16; one canonical spec type used in four places.

### 18. `WorkloadType_ClientsTypes` — `src/v2/model.ts:2816`
- **Why weird:** Triple-misery: `WorkloadType` outer type has a single field `clients` of type `WorkloadType_ClientsTypes`. The nested type's name pluralises both nouns (`Clients`+`Types`). The two booleans inside (`notebooks`, `jobs`) are not "types" — they're "client flags". Field on parent is singular (`clients`) but type is plural+plural (`ClientsTypes`).
- **Category:** 1 (vague — "ClientsTypes" doesn't mean anything), 4 (underscore), 6 (misleading), 9 (singular vs plural inconsistency), 14 (proto-style nested).
- **Suggested name:** Rename to `WorkloadClients` and align the field's plural/singular shape with the type name.
- **Rationale:** Two-level nesting with an outer container adds no information; the wire form is `workload_type.clients.notebooks` which is also unnecessarily deep.

### 19. `SparkInfo_SparkNode_SparkNodeAwsAttributes` — `src/v2/model.ts:2530`
- **Why weird:** `SparkInfo_SparkNode_SparkNodeAwsAttributes` repeats `SparkNode` twice. Contains one field, `isSpot`. The field on the parent type (`SparkInfo_SparkNode`) is called `nodeAwsAttributes` (`model.ts:2523`) — so the user writes `node.nodeAwsAttributes.isSpot`, and the type is `SparkInfo_SparkNode_SparkNodeAwsAttributes`. Three `SparkNode`s, two underscores, one boolean.
- **Category:** 1 (vague, redundant), 4 (underscores), 7 (overly verbose), 14 (proto-style nested).
- **Suggested name:** Re-export as `SparkNodeAwsAttributes` from `index.ts` to give callers a sane identifier.
- **Rationale:** A name that repeats `SparkNode` twice and contains two underscores is unreadable; the proto-style nesting need not survive to the public TS surface.

## Medium severity

### 20. `Adlsgen2Info` casing — `src/v2/model.ts:800`
- **Why weird:** Type name is `Adlsgen2Info` — should be `AdlsGen2Info` to match acronym-casing rules. ADLS (Azure Data Lake Storage) Gen2 should retain the boundary between `Adls` and `Gen2`.
- **Category:** 3 (acronym casing inconsistency), 1 (vague `Info` suffix).
- **Suggested name:** `AdlsGen2Storage` (or just `AbfssStorage`, since the wire name is `abfss`).
- **Rationale:** Compare to sibling types `DbfsStorageInfo`, `GcsStorageInfo`, `S3StorageInfo` — all use `Info` suffix and capitalize the storage product. `Adlsgen2Info` is the odd one out.

### 21. `*StorageInfo` family naming inconsistency — `src/v2/model.ts:800,1745,2102,2290,2456,2801,2824`
- **Why weird:** `Adlsgen2Info` (no `Storage`), `DbfsStorageInfo`, `GcsStorageInfo`, `LocalFileInfo` (no `Storage`), `S3StorageInfo`, `VolumesStorageInfo`, `WorkspaceStorageInfo`. Seven sibling types; five say `StorageInfo`, two say `Info`.
- **Category:** 17 (inconsistent suffix across siblings).
- **Suggested name:** Standardise on `XStorage` (drop the redundant `Info`) — `AdlsGen2Storage`, `DbfsStorage`, `GcsStorage`, `LocalFileStorage`, `S3Storage`, `VolumesStorage`, `WorkspaceStorage`.
- **Rationale:** All seven describe the same kind of thing (a storage destination). Either all of them get `StorageInfo` or none do.

### 22. `ClusterCompliance` vs `*PolicyCompliance*` naming — `src/v2/model.ts:946,2112,2118,2227,2244`
- **Why weird:** The package has `ClusterCompliance` (a result type), `GetPolicyComplianceForCluster` (a request), `GetPolicyComplianceForCluster_Response`, `EnforcePolicyComplianceForCluster` (request), `ListClusterComplianceForPolicy` (request — opposite direction). Each combines `Policy`/`Cluster`/`Compliance` in a different order. Reading them, it's not obvious which is "policies compliant with cluster" vs "clusters compliant with policy". The verb `For` is the disambiguator — fragile.
- **Category:** 1 (vague — `For` is the only disambiguator), 6 (misleading — easy to mis-parse).
- **Suggested name:** `GetClusterPolicyCompliance`, `EnforceClusterPolicyCompliance`, `ListPolicyCompliantClusters`, `ClusterPolicyCompliance`.
- **Rationale:** Put the noun before the preposition; the `For` framing reads like SQL and is order-sensitive.

### 23. `EnforcePolicyComplianceForCluster_Response_ClusterSettingsChange` — `src/v2/model.ts:2025`
- **Why weird:** 56 characters, three underscores, four nested words. Used inside `EnforcePolicyComplianceForCluster_Response.changes`.
- **Category:** 4 (underscores), 7 (overly verbose), 14 (proto-style nested-nested message).
- **Suggested name:** `ClusterSettingsChange` (hoist to module level) or `PolicyComplianceChange`.
- **Rationale:** Nested-nested proto messages should not survive translation to TS.

### 24. `validateOnly` field — `src/v2/model.ts:2001`
- **Why weird:** Field on `EnforcePolicyComplianceForCluster`. Verb-prefixed boolean reads as a method; doc says "if set, previews the changes" — closer to a `previewOnly`/`dryRun` flag.
- **Category:** 6 (misleading: name implies "validate", behaviour is "dry-run").
- **Suggested name:** `dryRun` or `previewOnly`.
- **Rationale:** Common convention; matches what most cloud SDKs name this. Wire stays `validate_only`.

### 25. `hasChanges` field — `src/v2/model.ts:2010`
- **Why weird:** Boolean named `has*` next to `changes: ClusterSettingsChange[]`. `hasChanges` is true iff `changes.length > 0` — redundant signal.
- **Category:** 12 (duplicate signal), 1 (vague).
- **Suggested name:** Drop the field, infer from `changes.length`.
- **Rationale:** Two ways to express the same predicate is one too many. Worth flagging upstream.

### 26. `restartUser` field on `RestartCluster` — `src/v2/model.ts:2449`
- **Why weird:** No JSDoc. Field name alone doesn't say what it does. Is it "user who triggered the restart"? "User to attribute the restart to"? Inconsistent with the package's general style (`ownerUsername`, `creatorUserName`, `singleUserName` all spell out `Username`/`UserName`).
- **Category:** 1 (vague — no doc, ambiguous semantics), 17 (sibling fields say `username` or `userName`, this one says `user`).
- **Suggested name:** `restartUsername` or `restartedByUsername`.
- **Rationale:** Match the field-naming patterns used elsewhere; even better, document the field.

### 27. `creatorUserName` / `singleUserName` / `ownerUsername` — `src/v2/model.ts:977,1150,930`
- **Why weird:** Three "user name" fields in the same model, two different camelCases: `creatorUserName` and `singleUserName` use `UserName` (two words), `ownerUsername` uses `Username` (one word). Wire is `creator_user_name`, `single_user_name`, `owner_username` — the wire is inconsistent too.
- **Category:** 3 (casing inconsistency), 17 (sibling field inconsistency).
- **Suggested name:** Pick one: `Username` is more conventional in modern web APIs. Go SDK and proto leave this inconsistent; TS could normalise.
- **Rationale:** Three similar fields, three (sort of) similar names, two different ways of capitalising the same concept.

### 28. `kind: ComputeKind` field — `src/v2/model.ts:1173`
- **Why weird:** Field is called `kind` on `ClusterInfo`, `ClusterInfo_ComputeSpec`, `CreateCluster`, `EditCluster`, `UpdateCluster_UpdateClusterResource`. Sibling fields are very specific (`runtimeEngine`, `dataSecurityMode`, `workloadType`); `kind` is the odd vague one.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `computeKind` (matches the type and wire name `kind` can stay).
- **Rationale:** `kind` alone is the JS-reserved-shape problem (`kind` is heavily overloaded in discriminated-union code). `computeKind` is unambiguous.

### 29. `size` discriminated union (`numWorkers` | `autoscale`) — `src/v2/model.ts:1201`
- **Why weird:** Field `size` is a discriminated union with two variants `numWorkers` (number) and `autoscale` (object). It appears on six types: `ClusterInfo`, `ClusterInfo_ComputeSpec`, `CreateCluster`, `EditCluster`, `ResizeCluster`, `UpdateCluster_UpdateClusterResource`. The literal `size` doesn't read as "either count or autoscaler" — calling code looks like `if (req.size?.$case === 'numWorkers')` which is awkward.
- **Category:** 1 (vague), 6 (misleading: a "size" sounds like an integer).
- **Suggested name:** `capacity` (or just `workers`, since both variants describe how many workers).
- **Rationale:** "size" suggests a number; this field is a tagged union. A different word avoids the contradiction.

### 30. `useMlRuntime` field — `src/v2/model.ts:1179`
- **Why weird:** Boolean prefixed `use*`. Doc says "This field can only be used when kind = CLASSIC_PREVIEW". Mixed with the broader `runtimeEngine` enum field; two fields combine to determine the runtime. `useMlRuntime: boolean` next to `runtimeEngine: RuntimeEngine` — incongruent shape.
- **Category:** 1 (vague — `use` prefix); 6 (misleading — looks like a generic feature toggle but is conditional on `kind`); 17 (boolean + enum for the same concept).
- **Suggested name:** Either fold into `runtimeEngine` (add `ML` value) or rename `useMlRuntime` to `mlRuntimeEnabled` for consistency.
- **Rationale:** A boolean and an enum jointly describing one runtime selection is a smell.

### 31. `isSingleNode` field — `src/v2/model.ts:1185`
- **Why weird:** Boolean field that, when true, automatically sets `custom_tags`, `spark_conf`, and `num_workers`. Doc admits the surprise: "When set to true, Databricks will automatically set single node related custom_tags, spark_conf, and num_workers." A field that secretly mutates three others is a footgun.
- **Category:** 6 (misleading — hidden side effects).
- **Suggested name:** Name is fine, but document the side effects in the type-level JSDoc, not just the field doc.
- **Rationale:** Flag for upstream — the boolean is doing more than the name suggests.

### 32. `WorkloadType` vs `runtimeEngine` vs `kind` vs `dataSecurityMode` — overlap of "cluster mode"-ish fields
- **Why weird:** Four fields all describe some aspect of "what kind of cluster this is": `workloadType` (notebooks/jobs), `runtimeEngine` (STANDARD/PHOTON), `kind` (CLASSIC_PREVIEW or unset), `dataSecurityMode` (NONE/SINGLE_USER/USER_ISOLATION/…). Each is a separate optional enum/object. The names don't cluster well.
- **Category:** 12 (duplicate concept across fields), 1 (vague — `kind` and `workloadType` both could mean either thing).
- **Suggested name:** Consider grouping under a `clusterMode` substructure, or at least documenting the relationships.
- **Rationale:** Domain-level — flag to upstream that four overlapping enum/struct fields make the API hard to learn.

### 33. `nodeTypeId` vs `instanceTypeId` — `src/v2/model.ts:1076,2321,2350`
- **Why weird:** `nodeTypeId` (string) and `instanceTypeId` (string) appear on different types. `NodeType.instanceTypeId` and `NodeInstanceType.instanceTypeId` are described as "hardware identifier (e.g., r3.2xlarge in AWS)" — i.e., the AWS instance class. `nodeTypeId` is the Databricks node type ID. Easy to confuse the two.
- **Category:** 19 (underspecified IDs — multiple "type" IDs coexisting).
- **Suggested name:** Either prefix one (`databricksNodeTypeId` / `cloudInstanceTypeId`) or rename `instanceTypeId` to `cloudInstanceTypeId` everywhere.
- **Rationale:** Two `*TypeId` fields side by side, distinguished only by `node` vs `instance`. Real users will get this wrong.

### 34. `driverNodeTypeId` / `nodeTypeId` / `driverInstancePoolId` / `instancePoolId` — `src/v2/model.ts:1076,1085,1148,1160`
- **Why weird:** Pattern is "`driverX` and `X`" where `X` is the worker version. Four such pairs across the spec (`nodeTypeId`/`driverNodeTypeId`, `instancePoolId`/`driverInstancePoolId`, `nodeTypeFlexibility`/`driverNodeTypeFlexibility` — but the worker version is called `workerNodeTypeFlexibility` while the worker-`nodeTypeId` is just `nodeTypeId`).
- **Category:** 17 (inconsistent pairing — sometimes worker is prefix-less, sometimes prefixed `worker`).
- **Suggested name:** Either always prefix worker (`workerNodeTypeId`, `workerInstancePoolId`, `workerNodeTypeFlexibility`) or never (drop `worker` from `workerNodeTypeFlexibility`).
- **Rationale:** Reader who sees `driverNodeTypeId` next to `nodeTypeId` has to remember that the un-prefixed one is "worker"; then sees `workerNodeTypeFlexibility` and gets thrown.

### 35. `NodeType.numCores` vs `ClusterInfo.clusterCores` — `src/v2/model.ts:2346,992`
- **Why weird:** Same concept (number of CPU cores) appears as `numCores` on `NodeType` and `clusterCores` on `ClusterInfo`. The `num` prefix is inconsistent with the bare `clusterCores`.
- **Category:** 17 (inconsistent prefix), 1 (`num` is vague compared to the rest of the model).
- **Suggested name:** `cores` (on `NodeType`) and `clusterCores` stays (or both `cores`/`totalCores`).
- **Rationale:** Compare to `clusterMemoryMb` (no `num` prefix), `memoryMb` (no `num` prefix). `numCores` and `numGpus` are the outliers.

### 36. `NodeType.numGpus` — `src/v2/model.ts:2366`
- **Why weird:** Same `num` prefix issue as #35. Sibling fields don't carry a `num` prefix (`memoryMb`, `localDisks`, `category`).
- **Category:** 17 (inconsistent prefix), 1.
- **Suggested name:** `gpus` (or `gpuCount`).
- **Rationale:** Internal consistency.

### 37. `NodeInstanceType.localDisks` and `NodeInstanceType.localNvmeDisks` are counts — `src/v2/model.ts:2323,2329`
- **Why weird:** Plural noun `localDisks` is typed as `number`, but JSDoc says "Number of local disks that are present on this instance." Counting things should use `count`/`num` suffix, not the plural noun.
- **Category:** 9 (singular vs plural confusion — the plural noun is actually a count).
- **Suggested name:** `localDiskCount`, `localNvmeDiskCount`.
- **Rationale:** A reader sees `localDisks: number` and might assume "array of local disks" — then realises it's a scalar.

### 38. `NodeInstanceType.localDiskSizeGb` / `localNvmeDiskSizeGb` ordering — `src/v2/model.ts:2325,2327`
- **Why weird:** `localDisks`, then `localDiskSizeGb`, then `localNvmeDiskSizeGb`, then `localNvmeDisks` — the size of the nvme disks comes before the count of nvme disks, and the size of the regular disks comes between regular and nvme. Pairings are scrambled.
- **Category:** 17 (inconsistent grouping).
- **Suggested name:** Reorder fields, or rename to make the pairs clear: `localDiskCount`/`localDiskSizeGb`, then `localNvmeDiskCount`/`localNvmeDiskSizeGb`.
- **Rationale:** Within the same type, related fields should sit together.

### 39. `ListAvailableZones_Response.defaultZone` — `src/v2/model.ts:2224`
- **Why weird:** JSDoc says "The availability zone if no `zone_id` is provided in the cluster creation request." The doc references `zone_id` (the wire name) instead of the TS `zoneId`. Other docstrings in the package also reference `zone_id`, `cluster_id`, `cluster_log_conf`, `init_scripts`, etc.
- **Category:** Observation — generated docs reference wire names rather than TS names.
- **Suggested name:** Update doc-comment generation to use TS names.
- **Rationale:** Inconsistent doc/identifier pairing makes IntelliSense suggestions look out-of-date.

### 40. `LogAnalyticsInfo` no JSDoc — `src/v2/model.ts:2295`
- **Why weird:** `LogAnalyticsInfo` has two fields (`logAnalyticsWorkspaceId`, `logAnalyticsPrimaryKey`), both un-documented. The type itself has no JSDoc. Used only by `AzureAttributes.logAnalyticsInfo`.
- **Category:** Observation (no naming issue per se, but missing context).
- **Suggested name:** Keep `LogAnalyticsInfo` (Azure Monitor terminology) but add a JSDoc; consider `AzureLogAnalyticsConfig`.
- **Rationale:** Both fields are Azure-specific; naming should signal that.

### 41. `LogSyncStatus.lastException: string` — `src/v2/model.ts:2311`
- **Why weird:** Field name is `lastException` (singular: the previous exception) but the type is `string`. JS exceptions are usually serialised as messages; a more accurate name would be `lastExceptionMessage`.
- **Category:** 1 (vague — `Exception` is overloaded), 16 (type contradicts the name domain).
- **Suggested name:** `lastErrorMessage` or `lastExceptionMessage`.
- **Rationale:** Distinguishes an Error object reference from its serialised string form.

### 42. `LogSyncStatus.lastAttempted: number` — `src/v2/model.ts:2306`
- **Why weird:** `lastAttempted` is a verb-past-participle, type is `number` (epoch millis per JSDoc). Hard to tell from the name that this is a timestamp.
- **Category:** 1 (vague), 6 (misleading — sounds like a boolean or count).
- **Suggested name:** `lastAttemptedAt`, `lastAttemptTime`, `lastAttemptedMs`.
- **Rationale:** Match the timestamp-suffix convention used elsewhere in this model (`startTime`, `terminatedTime`, `lastRestartedTime`, `lastStateLossTime`).

### 43. `ClusterInfo.startTime`/`terminatedTime`/`lastStateLossTime`/`lastRestartedTime` — `src/v2/model.ts:1194-1200`
- **Why weird:** Four sibling timestamps. `startTime` and `terminatedTime` use different shapes (`start` + `Time` vs `terminated` + `Time`); `lastStateLossTime` and `lastRestartedTime` use past participle + `Time`. Mix of forms. Also `LogSyncStatus.lastAttempted` (#42) drops the `Time` suffix entirely.
- **Category:** 17 (inconsistent timestamp suffix), 13 (verb-tense inconsistency: `start` vs `terminated` vs `restarted`).
- **Suggested name:** Choose one suffix (`-At`, `-Time`, `-Ms`) and apply uniformly: `startedAt`, `terminatedAt`, `lastStateLostAt`, `lastRestartedAt`, `lastAttemptedAt`.
- **Rationale:** Timestamp suffixes are a high-impact, low-cost consistency win.

### 44. `SparkInfo_SparkNode.startTimestamp` — `src/v2/model.ts:2521`
- **Why weird:** Same node-related concept as `ClusterInfo.startTime` (#43) but uses `Timestamp` rather than `Time`. Different word for the same idea.
- **Category:** 17 (inconsistent across types).
- **Suggested name:** `startTime` (or align all timestamps under one suffix).
- **Rationale:** Two timestamp suffixes in the same file is two too many.

### 45. `creatorUserName` field — `src/v2/model.ts:977`
- **Why weird:** TS camelCase splits `User` and `Name` (`creatorUserName`) but the conceptually-similar `singleUserName` does the same. Compare to `ownerUsername` (one word) on `ChangeClusterOwner`. Inconsistency between three sibling concepts. Documented behaviour: "The field won't be included in the response if the user has already been deleted" — but no `undefined` annotation distinguishes "absent because new" from "absent because deleted".
- **Category:** 3 (casing inconsistency), see also #27.
- **Suggested name:** `creatorUsername`.
- **Rationale:** Already covered in #27; flagged again because it appears on the main `ClusterInfo` type which dominates user reading time.

### 46. `clusterLogStatus` field — `src/v2/model.ts:1008`
- **Why weird:** Type is `LogSyncStatus` but field is `clusterLogStatus`. Type and field have different mental models (`LogSync` vs `ClusterLog`).
- **Category:** 6 (misleading — type and field name don't match the same concept).
- **Suggested name:** Either rename the type to `ClusterLogStatus` or the field to `logSyncStatus`.
- **Rationale:** Same concept, two different names in 5 lines.

### 47. `jdbcPort` field — `src/v2/model.ts:1036`
- **Why weird:** All-lowercase acronym fragment. The package consistently uses Pascal-form for acronyms in identifiers elsewhere (`awsAttributes`, `gcpAttributes`, `ebsVolumeType`, `kmsKey`). `JdbcPort` would match.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `JdbcPort` (TS: `jdbcPort` is conventional in camelCase; flagged because the doc-text says "Spark JDBC server" — capitalisation in JSDoc says JDBC, identifier says jdbc).
- **Rationale:** Per the package conventions (`Aws`, `Gcp`, `Ebs`, `Kms`), `Jdbc` is actually consistent — but `Dns`, `Ip`, `Url`, `Iam`, `Vm` are inconsistent across the model (see #48).

### 48. Pervasive acronym-casing inconsistency (`Aws`, `Gcp`, `Ebs`, `Kms` vs `IP`, `DNS`, `URL`, `IAM`, `VM`) — across `model.ts`
- **Why weird:** The TS code uses PascalCase initial-capital for some acronyms (`Aws`, `Azure`, `Gcp`, `Ebs`, `Kms`, `Adls`, `Gcs`, `Dbfs`, `Acl`, `Arn`) but JSDoc and string constants use all-caps (`AWS`, `Azure`, `GCP`, `EBS`, `KMS`). Within enum values, all-caps wins (`AWS_AUTHORIZATION_FAILURE`). Type names mix: `AwsAttributes` but `S3StorageInfo` (S3 is all-caps). Field names mix: `privateIp` (lowercase ip), `publicDns` (lowercase dns), `kmsKey` (lowercase kms).
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** Pick one rule. Google TS style guide allows either `httpRequest` or `HTTPRequest` but requires consistency.
- **Rationale:** This is the single highest-friction naming issue across the package — every reader stumbles on it.

### 49. `S3StorageInfo.cannedAcl: string` — `src/v2/model.ts:2491`
- **Why weird:** `Acl` is AWS terminology; field is typed `string` rather than a `CannedAcl` enum despite AWS having a fixed canned-ACL list. JSDoc says "Set canned access control list for the logs, e.g. `bucket-owner-full-control`". Also note `cannedCal` typo in the doc body — likely meant `cannedAcl`.
- **Category:** 5 (cryptic abbreviation — `acl`), 16 (typed as string but values are enum-like), 3 (acronym casing — should it be `cannedACL`?).
- **Suggested name:** Type as an enum (`CannedS3Acl`); field `cannedAcl` is fine.
- **Rationale:** Typing as string surfaces every user's typo as a runtime failure when an enum would catch at compile time.

### 50. `S3StorageInfo.enableEncryption` + `encryptionType` + `kmsKey` — `src/v2/model.ts:2474,2479,2481`
- **Why weird:** Three independent fields encoding what could be one discriminated union: `enableEncryption=false` → no encryption; `enableEncryption=true, encryptionType='sse-s3'` → SSE-S3; `enableEncryption=true, encryptionType='sse-kms', kmsKey='...'` → SSE-KMS. Cross-field invariants encoded by convention.
- **Category:** 12 (duplicate concepts), 17 (could be a tagged union).
- **Suggested name:** Either nest these as a `S3Encryption` discriminated union, or rename to make the dependency explicit (`encryption: 'none' | 'sse-s3' | 'sse-kms'`).
- **Rationale:** Three booleans/strings tangled — easier API would be one discriminated field.

### 51. `S3StorageInfo.region` / `endpoint` mutually-exclusive pair — `src/v2/model.ts:2464,2469`
- **Why weird:** JSDoc explicitly says "Either region or endpoint needs to be set. If both are set, endpoint will be used." Mutually-exclusive fields not encoded in the type.
- **Category:** 16 (field-pair constraint not in the type).
- **Suggested name:** Could be a discriminated union `{kind: 'region', value: string} | {kind: 'endpoint', value: string}`.
- **Rationale:** Type-system-encodable constraint; flagged for upstream.

## Low severity

### 52. `ClusterInfo.spec?: ClusterInfo_ComputeSpec` field name — `src/v2/model.ts:1018`
- **Why weird:** Field is just `spec`; type is `ClusterInfo_ComputeSpec`. Field name is very short.
- **Category:** 1 (vague — `spec` alone could mean anything), 8 (type-suffix tautology: `clusterInfo.spec` of type `ComputeSpec`).
- **Suggested name:** `computeSpec` or `clusterSpec`.
- **Rationale:** Once the type is renamed (#17), this falls out naturally.

### 53. `ClusterInfo.driver: SparkInfo_SparkNode` field — `src/v2/model.ts:1023`
- **Why weird:** Field name is `driver` (vague — could mean a person or an Apache driver concept). Type `SparkInfo_SparkNode` (which is itself awkward). Better: `driverNode: SparkNode`.
- **Category:** 1 (vague).
- **Suggested name:** `driverNode`.
- **Rationale:** Reader sees `driver` and has to know to follow the type.

### 54. `ClusterInfo.executors: SparkInfo_SparkNode[]` field — `src/v2/model.ts:1025`
- **Why weird:** Same as #53. `executors` is fine in Spark vocabulary but better paired: `executorNodes: SparkNode[]`.
- **Category:** 17 (inconsistent with `driver`).
- **Suggested name:** `executorNodes`.
- **Rationale:** Match the `driver`/`executor` pattern.

### 55. `dockerImage` field comment `"Custom docker image BYOC"` — `src/v2/model.ts:1145,1340,1662,1914,2723`
- **Why weird:** JSDoc abbreviation `BYOC` (Bring Your Own Container) used without expansion. Appears five times in the model.
- **Category:** 5 (cryptic abbreviation in JSDoc).
- **Suggested name:** N/A — fix the comment, not the identifier.
- **Rationale:** Quick doc fix.

### 56. `ClusterInfo.sparkContextId: number` — `src/v2/model.ts:1031`
- **Why weird:** Field is named `sparkContextId` but typed as `number`. Other IDs in the model are strings (`clusterId`, `policyId`, `nodeTypeId`). Internal Spark context IDs are 64-bit ints — the type clash hints at potential JS number-precision issues for large IDs.
- **Category:** 19 (underspecified ID — different type from sibling IDs).
- **Suggested name:** Keep but consider `bigint` typing or document the precision risk.
- **Rationale:** JS number safe-integer range is 2^53; if Spark uses 64-bit IDs, this is a latent bug.

### 57. `DockerImage.credsOneof` field name — `src/v2/model.ts:1768`
- **Why weird:** `credsOneof` is a discriminated-union container with a single `$case: 'basicAuth'` variant. The `Oneof` suffix leaks proto terminology; `Creds` is an abbreviation of `Credentials`.
- **Category:** 5 (cryptic abbreviation), 14 (proto-style `Oneof`).
- **Suggested name:** `credentials` (singular).
- **Rationale:** TS doesn't need to keep the `Oneof` suffix from proto.

### 58. `DockerBasicAuth.username` / `password` — `src/v2/model.ts:1759,1761`
- **Why weird:** Doc strings are "Name of the user" and "Password of the user" — generic and add no information beyond the field names.
- **Category:** Observation (low-quality docstrings).
- **Suggested name:** No rename; flag doc-quality.
- **Rationale:** Minor.

### 59. `AwsAttributes.spotBidPricePercent: number` — `src/v2/model.ts:864`
- **Why weird:** Field is a percentage but typed as `number` (no unit hint). Compare `AzureAttributes.spotBidMaxPrice: number` (`model.ts:924`) — Azure version uses a raw price, AWS uses a percentage. Different semantics, same `number` type.
- **Category:** 17 (sibling AWS/Azure shapes differ), 1 (`number` without unit suffix).
- **Suggested name:** `spotBidPricePercent` is fine; flag for upstream — the AWS/Azure semantics should be more discoverable from the model.
- **Rationale:** Cross-cloud asymmetry is a domain concern.

### 60. `AzureAttributes.spotBidMaxPrice` JSDoc reference to `>0 or -1` magic numbers — `src/v2/model.ts:923`
- **Why weird:** Magic value `-1` overloaded as "do not evict on price basis". Encoded in JSDoc, not in the type.
- **Category:** 16 (sentinel value in scalar field), Observation.
- **Suggested name:** N/A; flag for upstream to consider a sentinel enum or `null`.
- **Rationale:** Sentinels in scalar fields are old-school API design.

### 61. `GcpAttributes.usePreemptibleExecutors` deprecated field — `src/v2/model.ts:2051`
- **Why weird:** JSDoc says "Note: Soon to be deprecated, use the 'availability' field instead." But the field is not actually marked `@deprecated`.
- **Category:** Observation — missing `@deprecated`.
- **Suggested name:** Add `@deprecated` JSDoc tag.
- **Rationale:** Tooling can pick up `@deprecated`; "Note: Soon to be deprecated" is invisible to IDEs.

### 62. `GcpAttributes.googleServiceAccount: string` — `src/v2/model.ts:2058`
- **Why weird:** Field `googleServiceAccount` lives on `GcpAttributes`. The `google` prefix is redundant — sibling fields don't say `googleZoneId`, `googleAvailability`, `googleBootDiskSize`.
- **Category:** 17 (inconsistent prefix within `GcpAttributes`).
- **Suggested name:** `serviceAccount` (drop the `google` prefix).
- **Rationale:** Internal consistency; the type's name already says GCP.

### 63. `GcpAttributes.bootDiskSize: number` — `src/v2/model.ts:2060`
- **Why weird:** Doc says "Boot disk size in GB" but field has no unit suffix. Compare `ebsVolumeSize`/`ebsVolumeIops`/`ebsVolumeThroughput` (no unit suffixes either) and `remoteDiskThroughput` (`Mb/s` per doc, no suffix). Pattern is "no unit suffix" — but `clusterMemoryMb`, `memoryMb`, `localDiskSizeGb` DO have unit suffixes. Inconsistent.
- **Category:** 17 (inconsistent unit-suffix convention).
- **Suggested name:** `bootDiskSizeGb`.
- **Rationale:** Match the `*Mb`, `*Gb` pattern used on the same struct hierarchy.

### 64. `GcpAttributes.localSsdCount: number` field with prose comment — `src/v2/model.ts:2082`
- **Why weird:** Field is named `localSsdCount`; sibling `bootDiskSize` is unsuffixed; `firstOnDemand` is also unsuffixed. Three different "amount" fields, three different suffix conventions.
- **Category:** 17 (inconsistent quantity suffix).
- **Suggested name:** Either all carry `Count`/`Size`/`Mb` etc. or none do.
- **Rationale:** Within `GcpAttributes`, `localSsdCount` carries a `Count` suffix while `firstOnDemand` (also a count) does not.

### 65. `firstOnDemand` field name — `src/v2/model.ts:829,911,2092`
- **Why weird:** Used on `AwsAttributes`, `AzureAttributes`, `GcpAttributes`. Reads as "first on-demand what?". Doc says "The first `first_on_demand` nodes of the cluster will be placed on on-demand instances" — meta-circular.
- **Category:** 1 (vague), 7 (no noun).
- **Suggested name:** `firstOnDemandNodes` or `onDemandNodeCount`.
- **Rationale:** The name is missing the noun it describes.

### 66. `ChangeClusterOwner.ownerUsername` field docstring — `src/v2/model.ts:929`
- **Why weird:** Doc says "New owner of the cluster_id after this RPC." `RPC` jargon leaks. `cluster_id` is the wire name; should be `clusterId`.
- **Category:** Observation (doc quality), 5 (RPC jargon).
- **Suggested name:** Update doc text.
- **Rationale:** Minor doc fix.

### 67. `ClusterCompliance.violations: Record<string, string>` — `src/v2/model.ts:956`
- **Why weird:** Map from string (policy field path) to string (error message). Field name `violations` doesn't communicate the shape.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `violationsByField` or `fieldViolations`.
- **Rationale:** Clarifies the map's semantics.

### 68. `EnforcePolicyComplianceForCluster_Response_ClusterSettingsChange.field: string` — `src/v2/model.ts:2027`
- **Why weird:** Field on a "ClusterSettingsChange" is itself named `field`. Reads as `change.field` — circular.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `fieldPath` or `settingName`.
- **Rationale:** Minor; flags pile up.

### 69. `EnforcePolicyComplianceForCluster_Response_ClusterSettingsChange.previousValue` / `newValue` — `src/v2/model.ts:2034,2041`
- **Why weird:** Both fields typed as `string`. JSDoc says values are "either a number, a boolean, or a string converted to a string." Pre-stringified union encoded as plain string — caller must re-parse.
- **Category:** 16 (type contradicts domain — it's actually `number | boolean | string` flattened to string).
- **Suggested name:** Type as `string | number | boolean`, or `previousValueRaw`.
- **Rationale:** Documents the stringification rather than hiding it.

### 70. `SparkVersion.key` / `name` — `src/v2/model.ts:2542,2544`
- **Why weird:** Two very generic field names; from `SparkVersion`, `key` is the version string and `name` is the display name. Inversion of typical (`name`=identifier, `displayName`=human-readable).
- **Category:** 1 (vague), 6 (misleading).
- **Suggested name:** `version`/`displayName` or `versionKey`/`label`.
- **Rationale:** `key` is one of the most overloaded names in software.

### 71. `NodeType.key`-like fields — `nodeTypeId`, `instanceTypeId`, `description`, `category` — `src/v2/model.ts:2338-2390`
- **Why weird:** 20 fields on `NodeType`, several with vague names: `description`, `category`. No JSDoc on `displayOrder` until line 2374. Some fields are `is*` booleans (`isDeprecated`, `isHidden`, `isIoCacheEnabled`, `isEncryptedInTransit`, `isGraviton`), others are `support*` booleans (`supportEbsVolumes`, `supportClusterTags`, `supportPortForwarding`), others are `*Capable` booleans (`photonWorkerCapable`, `photonDriverCapable`).
- **Category:** 17 (inconsistent boolean prefix: `is*`/`support*`/`*Capable`).
- **Suggested name:** Pick one convention (`is*Supported`).
- **Rationale:** Three different boolean-naming patterns on one struct.

### 72. `NodeType.supportEbsVolumes` field name — `src/v2/model.ts:2362`
- **Why weird:** Singular verb `support` (third-person plural would be "supports"). All siblings: `supportClusterTags`, `supportPortForwarding`. Three fields use the singular form.
- **Category:** 13 (verb tense — should be `supports`).
- **Suggested name:** `supportsEbsVolumes`, `supportsClusterTags`, `supportsPortForwarding`.
- **Rationale:** Subject-verb agreement in field names is common (`hasFoo`, `isFoo`, `supportsFoo`).

### 73. `NodeType.photonWorkerCapable` / `photonDriverCapable` — `src/v2/model.ts:2382,2383`
- **Why weird:** No JSDoc. `*Capable` suffix is a different boolean convention from `is*`/`support*`.
- **Category:** 17 (inconsistent boolean shape), Observation (missing doc).
- **Suggested name:** `isPhotonWorkerSupported`, `isPhotonDriverSupported` (or `supportsPhotonAsWorker`).
- **Rationale:** Same pattern as #71.

### 74. `TerminationReason.parameters: Record<string, string>` — `src/v2/model.ts:2561`
- **Why weird:** Generic-named map. `parameters` could mean anything.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `details`, `metadata`, `errorContext`.
- **Rationale:** Clarifies the role of the map.

### 75. `AutoScale` type name — `src/v2/model.ts:805`
- **Why weird:** PascalCase `AutoScale` is two words. Compare to `autoscale` field (lowercase, one word) and `autoterminationMinutes` (lowercase, one word). The type name is the outlier.
- **Category:** 3 (casing inconsistency), 17 (within-package inconsistency).
- **Suggested name:** `Autoscale` (one word, matching the field).
- **Rationale:** Matches sibling naming (`autoscale: Autoscale`).

### 76. `*FieldMaskSchema` constants — `src/v2/model.ts:4247-4413`
- **Why weird:** 13 lowerCase-starting consts named `autoScaleFieldMaskSchema`, `awsAttributesFieldMaskSchema`, etc. These are internal to the package. `updateCluster_UpdateClusterResourceFieldMaskSchema` (line 4329) carries the underscore from its parent type. Pure scaffolding.
- **Category:** 4 (underscore), Observation (internal scaffolding).
- **Suggested name:** No public API impact; flagged for completeness.
- **Rationale:** Generated content.

### 77. `marshalX` / `unmarshalX` verb asymmetry — `utils.ts:113,119`
- **Why weird:** `parseResponse` (decode) and `marshalRequest` (encode) — same pair-asymmetry noted in `abacpolicies.md` audit. `parseResponse` reads the body, `marshalRequest` writes it. Names are non-mirrored verbs.
- **Category:** 17 (inconsistent action verbs).
- **Suggested name:** `unmarshalResponse`/`marshalRequest` or `parseResponse`/`serializeRequest`.
- **Rationale:** Pair-wise verb consistency aids reading.

## Observations

### 78. Seven Waiter classes with identical shape — `client.ts:879-1435`
The file declares `CreateClusterWaiter`, `DeleteClusterWaiter`, `EditClusterWaiter`, `ResizeClusterWaiter`, `RestartClusterWaiter`, `StartClusterWaiter`, `UpdateClusterWaiter` — 557 lines. The only variation between them is the set of terminal `ClusterState_ClusterState` values they accept (e.g., `CreateClusterWaiter` treats `RUNNING` as success and `TERMINATED` as failure; `DeleteClusterWaiter` does the opposite). The rest is copy-pasted.
- **Category:** 12 (duplicate concept across seven classes), Observation.
- **Suggested:** A generic `ClusterStateWaiter` parameterised by the success/failure state sets would shrink this to ~80 lines.

### 79. `_req` parameter for empty request types — `client.ts:343,422,447`
Several methods take a `_req: ListAvailableZones` / `_req: ListNodeTypes` / `_req: GetSparkVersions` parameter even though the request types are empty (`{}`). The underscore prefix avoids the unused-arg lint warning. Indicates the generator does not collapse empty requests.
- **Category:** Observation (generator artefact).

### 80. `enable*` boolean conventions — `enableElasticDisk`, `enableLocalDiskEncryption`, `enableEncryption`
- **Why weird:** Three sibling booleans use `enable*` prefix. `is*` is the more idiomatic JS boolean convention. Inconsistent with `isSingleNode`, `isCompliant`, `isDeprecated`.
- **Category:** 17 (mixed `enable*` and `is*` for booleans).
- **Rationale:** Naming-convention drift.

### 81. `ResizeCluster` / `RestartCluster` requests are partial overlaps
`ResizeCluster` carries `clusterId` and `size`; `RestartCluster` carries `clusterId` and `restartUser`; `StartCluster` carries only `clusterId`. Three near-identical types; could be one.
- **Category:** 12 (duplicate concept), Observation.

### 82. `marshal*Schema` / `unmarshal*Schema` constants are individually named per type — 35 marshal + 35 unmarshal exports
Naming follows `marshalXxxSchema` / `unmarshalXxxSchema`. Convention is consistent but the underscored proto-style nesting carries over (`unmarshalEnforcePolicyComplianceForCluster_Response_ClusterSettingsChangeSchema` is a 67-character identifier).
- **Category:** 7 (overly verbose), Observation.

### 83. `_req` unused vs `req` used — inconsistency in method-signature lint
Five client methods use `_req` (where the request type is empty), 15 use `req` (where it's not). Pure mechanical.
- **Category:** Observation.

### 84. `clusterId?: string | undefined` shape
Every request type that targets a cluster has `clusterId?: string | undefined`. `?` (optional) plus `undefined` is the explicit-undefined style used throughout. But `clusterId` is semantically required for many operations (delete, edit, restart, etc.). Marking it optional means the runtime check `if (req.clusterId === undefined) throw new Error(...)` appears in every waiter constructor (`client.ts:204,246,296,565,604,651,729`).
- **Category:** 6 (misleading optional — should be required), Observation.

### 85. `executeCall` / `executeHttpCall` (`utils.ts:26,65`)
Two functions whose names differ only by `Http`. Same pair-naming concern flagged in `abacpolicies.md` audit (item #36 there).
- **Category:** 1 (vague), 17 (inconsistent), Observation.

### 86. `flattenQueryParams` exported but unused (`utils.ts:123`)
The function is exported but `client.ts` never calls it. (Cluster v2 endpoints with query params do it inline.) Same observation as in `abacpolicies.md`.
- **Category:** Observation (dead public surface).

### 87. JSDoc placeholder `<Databricks>` — pervasive
Throughout the model, JSDocs say `<Databricks>` (e.g., `model.ts:1097` — "Databricks will tag all cluster resources..."). Looks like an un-substituted templated brand placeholder. Reader sees `<Databricks>` in IntelliSense.
- **Category:** Observation (doc-quality artefact in generator).

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
- `repl` — Read-Eval-Print Loop (Spark REPL, per `model.ts:1021`).
- `jdbc` — Java Database Connectivity.
- `dns` — Domain Name System.
- `nic` — Network Interface Card (per `NETWORK_CHECK_NIC_FAILURE`).
- `nfs` — Network File System (per `NFS_MOUNT_FAILURE`).
- `npip` — No Public IP (Databricks networking jargon).
- `pat` — Personal Access Token (per `model.ts:592`).
- `sdp` — implied by client.ts:746 ("Databricks Jobs, SDP, or Models services"). Likely "Serverless Data Platform" or "Streaming Data Pipelines".
- `cmv1` / `cmv2` — Cluster Manager v1/v2 (Databricks internal scheduler generations).
- `imv2` — Instance Manager v2 (Databricks internal infra, per `INVALID_WORKER_IMAGE_FAILURE`).
- `nephos` — Internal serverless infra name (per `NEPHOS_RESOURCE_MANAGEMENT`).
- `cmk` — Customer-Managed Key.
- `chauffeur` — Internal Databricks driver-orchestration daemon (per `DRIVER_UNREACHABLE`).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- `sts` — AWS Security Token Service (per `STS_CLIENT_SETUP_FAILURE`).
- `cprf` / `cplf` — Control Plane Request Failure / Cloud Provider Launch Failure (per `model.ts:618-620`).
- `sev_snp` — AMD Secure Encrypted Virtualization — Secure Nested Paging (GCP confidential VM, per `model.ts:71`).
- `csp` — Cloud Service Provider (per `is_csp_unified` in `model.ts:699`).
- `luks` — Linux Unified Key Setup (disk encryption, per `enableLocalDiskEncryption` JSDoc).
- `uc` — Unity Catalog (referenced in `VolumesStorageInfo`).
- `aip` — API Improvement Proposal (`https://google.aip.dev/161` referenced in `updateMask` field doc).

## File coverage
- `src/v2/model.ts` (4414 lines): read fully (in 600-line chunks).
- `src/v2/client.ts` (1435 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
