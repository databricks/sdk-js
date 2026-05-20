# Cross-Package Naming Audit — Executive Summary

**Packages audited:** 98 (every API package under `packages/<pkg>/src/<vN>/`)
**Total findings across all audits:** **3,918** (down from 5,322 originally, then 5,001 after the first prune pass, then 4,544 after the second, then 4,502 after the third; **584 additional findings pruned in this fourth pass**, **1,404 cumulative**)
**Source files:** `/home/parth.bansal/sdk-js/.agent/naming-audit/<package>.md`

> **Prune note 1.** The original audit included a cross-cutting theme
> "Empty / trivial wrapper interfaces" (empty `*_Response` interfaces,
> single-field-primitive wrapper types, and proto outer-message wrappers
> retained only to anchor a nested enum). Per user direction these have
> been removed from every per-package audit: the wrapper types are kept
> on the public surface deliberately, for forward compatibility — adding
> a field later is a non-breaking change for a wrapper type but a
> breaking change if the response was previously `void` or a bare
> primitive. The 321 pruned findings are reflected in the totals,
> theme list, and Top-50 below.

> **Prune note 2.** A second cross-cutting theme,
> "`marshal` / `unmarshal` / `Schema` suffix vocabulary is Go-isms"
> (`marshalCreatePolicySchema`, `unmarshalGetMetastoreSummary_ResponseSchema`,
> etc.), has now also been pruned per user direction. These Zod
> encoder/decoder helpers are SDK-internal — they are emitted into
> per-package `utils.ts` and `model.ts` but are not part of the public
> contract that callers import against. Renaming them carries zero
> external risk and is therefore not a public-surface naming concern.
> The 457 pruned findings from this pass are reflected in the totals,
> theme list (Theme 8 removed), generator recommendations (§8.7
> removed), and by-the-numbers table below.

> **Prune note 3.** A third cross-cutting theme,
> "Pagination `Iter` suffix on every paginating method"
> (`listPoliciesIter`, `listCatalogsIter`, `listWarehousesIter`, etc.),
> has now been promoted to a generator-only recommendation per user
> direction. The duplicate-method pattern is emitted by every generated
> package; the fix is one template change, not per-package work. Rather
> than carry the same finding in 98 per-package audits, the rule is
> recorded once in the new `## Generator-only recommendations` section
> below. The 42 pruned findings from this pass are reflected in the
> totals, theme list (the former Theme 8 removed), generator
> recommendations (§8.10 removed), and by-the-numbers table below.

> **Prune note 4.** A fourth cross-cutting theme,
> "Underscore-in-identifier (proto `Outer_Inner` / `Foo_Response`)" —
> e.g. `ClusterState_ClusterState`, `PipelineState_PipelineState`,
> `DeletePolicy_Response`, `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol` —
> has now been pruned per user direction. The proto-style underscored
> identifier convention is intentional and correct: it preserves the
> mapping between TS identifiers and protobuf nested-message paths,
> keeps codegen deterministic, and the `// eslint-disable` line that
> each identifier carries is acceptable cost. Renaming would break the
> wire ↔ TS correspondence that downstream tooling relies on. The 584
> pruned findings from this pass are reflected in the totals, theme
> list (the former Theme 1 removed), generator recommendations (§8.2
> removed), and by-the-numbers table below. This was the single
> largest category by package incidence (~85/98).

This document synthesises the per-package audits into the patterns that the
upstream generator (and a smaller number of API team decisions) should fix
to deliver an idiomatic TypeScript SDK. The vast majority of the findings are
template-driven — fix the template once and the symptoms disappear from every
package.

The 98 packages are a 1:1 port of `databricks/sdk-go`, so most defects flow
from Go/protobuf idioms that do not translate to TypeScript. Idiomatic TS
SDKs (AWS, Azure, Stripe, Octokit) deliberately diverge from their wire
formats; the Databricks JS SDK currently does not.

---

## 1. Top cross-cutting themes

Ranked by approximate package incidence. Each theme is a generator-level
defect — one template change fixes ~98 packages.

### Theme 1. Redundant enum-name prefix on every member (proto idiom) — ~84/98 packages

Every enum is emitted with its members redundantly prefixed by the enum name:

```ts
enum DestinationType {
  DESTINATION_TYPE_UNSPECIFIED = 'DESTINATION_TYPE_UNSPECIFIED',
  DESTINATION_TYPE_EMAIL = 'DESTINATION_TYPE_EMAIL',
  ...
}
```

TypeScript enums are namespaced by the enum itself
(`DestinationType.Email`), so the prefix is pure protobuf noise. Often the
prefix is applied inconsistently *within a single enum*:
`DataSecurityMode.DATA_SECURITY_MODE_STANDARD` next to
`DataSecurityMode.SINGLE_USER`
(`packages/clusters/src/v2/model.ts:123-127`); or applied to two of three
cloud-specific enums while one cloud is unprefixed
(`AzureAvailability.SPOT_AZURE` / `GcpAvailability.PREEMPTIBLE_GCP` vs
`AwsAvailability.SPOT`).

Examples:
- `connections.ConnectionType.UNKNOWN_CONNECTION_TYPE` — `packages/connections/src/v1/model.ts:7`.
- `tokens.AutoscopeState.AUTOSCOPE_STATE_API_NOT_COVERED` — 44 chars to express "API not covered", `packages/tokens/src/v1/model.ts:14-20`.
- `cleanrooms.INTERNET_DESTINATION_TYPE_UNSPECIFIED`, `LOG_ONLY_MODE_TYPE_UNSPECIFIED`, `OUTPUT_CATALOG_STATUS_UNSPECIFIED`.
- `commandexecution.CommandStatus.COMMAND_CANCELLED`, `COMMAND_FINISHED`, etc. (every member prefixed) — `packages/commandexecution/src/v2/model.ts:21-29`.
- `externallocations.IsolationMode.ISOLATION_MODE_OPEN_IN_ACCOUNT` — 30 chars, `packages/externallocations/src/v1/model.ts:5-10`.

**Generator fix:** Strip the redundant prefix at emit time. Map
`FOO_BAR_BAZ` → `BarBaz` (PascalCase) or keep `BAR_BAZ` for SCREAMING_SNAKE.
Either way the prefix that re-states the enum name should not survive into
TS. Wire value can stay as-is via Zod transform.

### Theme 2. `*_UNSPECIFIED` proto sentinel values in every enum — ~60/98 packages

Every protobuf enum carries a zero value `XXX_UNSPECIFIED` that protobuf
needs but TS does not. The corresponding field is already
`foo?: Foo | undefined`, so "unspecified" is encoded twice (as `undefined`
and as the sentinel). Callers have to handle both states.

Examples in nearly every audit: `STATE_UNSPECIFIED`, `POLICY_TYPE_UNSPECIFIED`,
`COMPUTE_KIND_UNSPECIFIED`, `RUN_LIFE_CYCLE_STATE_UNSPECIFIED`,
`ACCESS_POLICY_TYPE_UNSPECIFIED`, `DAY_OF_WEEK_UNSPECIFIED`,
`STATUS_UNSPECIFIED`, etc.

**Generator fix:** Drop `*_UNSPECIFIED` members from emitted enums. Map them
to TypeScript `undefined` on the way in, and the field's `?:` optionality
already expresses "not set" on the way out.

### Theme 3. Verb-phrase request types (no `Request` suffix) — ~80/98 packages

Request DTOs are named with bare verb phrases:

```ts
interface DeletePolicy { ... }      // looks like a function
interface ListPolicies { ... }       // looks like a method
interface CreateScope { ... }        // looks like an action
```

Client methods sit alongside with identical camel-case names
(`client.deletePolicy(req: DeletePolicy)`), forcing readers to mentally
disambiguate noun-from-verb on every line.

Examples:
- `secrets.{CreateScope, DeleteAcl, DeleteScope, DeleteSecret, GetAcl, GetSecret, ListAcls, ListScopes, ListSecrets, PutAcl, PutSecret}` — 11 verb-named types in one file.
- `workspace.{Delete, Export, Import, List, Mkdirs, GetStatus}` — also collide with TS reserved/built-in tokens (`Delete`, `Import`, `Export`).
- `files.{Read, Move, Put, Delete, Close, Create, MkDirs, AddBlock, GetStatus, ListStatus}` — every DBFS request type.
- `grants.{GetPermissions, UpdatePermissions, GetEffectivePermissions}` — request types named like verbs.
- `tokenmanagement.{GetToken, ListTokens, RevokeToken, UpdateToken, CreateOnBehalfOfToken}`.
- `serviceprincipalsecrets.{CreateServicePrincipalSecret, DeleteServicePrincipalSecret, ListServicePrincipalSecrets}`.

**Generator fix:** Append `Request` to every request-DTO type. This is the
TS convention used by every other large SDK (AWS, Azure, Google Cloud). Wire
shape unaffected.

### Theme 4. `Info` (and other vague) suffix on the canonical entity — ~70/98 packages

The Go SDK uses `<Domain>Info` to name "details of an X" because Go does not
have package-qualified imports for types. TS does, and `<Domain>` alone
suffices. Examples:

- `RepoInfo` → `Repo` / `GitFolder` (and the field `repo?: RepoInfo` becomes `repo?: Repo`).
- `PolicyInfo` → `Policy`.
- `EndpointInfo` → `Endpoint` (in `warehouses`, which has a brand mismatch — see Theme 7).
- `SchemaInfo` → `Schema`.
- `CredentialInfo` → `Credential`.
- `MetastoreInfo` → `Metastore`.
- `CatalogInfo` → `Catalog`.
- `RunInfo`, `JobInfo`, `TableInfo`, `FunctionInfo`, `ConnectionInfo`,
  `VolumeInfo`, `ServicePrincipalInfo`, `UserInfo`, `WorkspaceInfo`,
  `OnlineTableInfo`, `IndexInfo`, `RunInfo`, `ExperimentInfo`.

Same problem with other vague suffixes:
- `*Options` on tagged-union arms (`RowFilterOptions`, `ColumnMaskOptions`, `DenyOptions`, `GrantOptions`) — when the `$case` discriminator already says "this is the X options".
- `*Spec` / `*Details` / `*Config` / `*Status` / `*Data` / `*Metadata` used inconsistently — sometimes for the entity, sometimes for a sub-property, sometimes for both. `apps.ApplicationStatus` and `App.appStatus` mismatch on the same product noun.

**Generator fix:** Strip the `Info` suffix when the type is the canonical
domain entity. (Heuristic: if `<Foo>Info` is the only `<Foo>*` type that
isn't a request/response, drop `Info`.) Same for redundant `Options`/`Spec`
suffixes on tagged-union arms when the parent has a discriminator.

### Theme 5. Type-name prefix repeats the package — ~70/98 packages

Every type in a package is prefixed with the package's domain noun, even
though the import path already provides namespace disambiguation:

- `oauthcustomappintegration.{CreateCustomOAuthAppIntegration, CreatePublishedOAuthAppIntegration, DeleteCustomOAuthAppIntegration, ...}` — 18 types all prefixed with 19 characters that the import path already provides.
- `pipelines.{PipelinesAwsAvailability, PipelinesAzureAvailability, PipelinesEbsVolumeType, PipelinesAwsAttributes, ...}` — 15 types prefixed with `Pipelines` (plural) when the package is singular-domain. `packages/pipelines/src/v2/model.ts:212, 225, 241, 2243, ...`.
- `cleanroomautoapprovalrules.CleanRoomAutoApprovalRule` — package and type repeat the same 22-character noun.
- `genie.{GenieAttachment, GenieConversation, GenieMessage, GenieSpace, GenieFeedback, GenieEvalResult, ...}` — 40 types prefixed with `Genie` (and inconsistently — `Result`, `Schema`, `Thought` are not prefixed in the same file).
- `serviceprincipalsecrets.ServicePrincipalSecret` — every type carries `ServicePrincipal` (16 chars).
- `accountaccesscontrolproxy.GetAssignableRolesForResourceRequest` — 36-char type name when `GetAssignableRolesRequest` would do.
- `qualitymonitor.QualityMonitor` (package + type).
- `tagpolicies.TagPolicy`, `tagassignments.TagAssignment`, `entitytagassignments.EntityTagAssignment`.
- `customllms.CustomLlm`, `customLlmFieldMask`, `createCustomLlm`, etc.

**Generator fix:** When emitting TS, strip the package-name prefix from
every type as long as the unprefixed name does not clash with another type
in the same package. Wire shape is unaffected.

### Theme 6. Inconsistent acronym casing across the SDK — 98/98 packages

The SDK currently mixes both `Pascal-then-lower` (`Http`, `Url`, `Json`,
`Sql`, `Oauth`, `Pypi`, `Aws`, `Llm`, `Pii`, `Sse`, `Idp`, `Csp`, `Esm`,
`Dbfs`, `Dbr`, `Aibi`) with `ALL_CAPS` (`URL`, `ID`, `URI`, `RPC`) in
different places. There is no project-wide policy. The user-visible
inconsistencies include:

| Acronym | Found as | Examples |
|---|---|---|
| URL | `Url`, `URL`, `url` | `dataSchemaUrl`, `URLSearchParams`, `webhookUrl`, `URL` enum value |
| Id  | `Id`, `ID`, `id` | `userId`, `runId`, `ID` (string-typed enum value), `metastoreId` |
| SQL | `Sql`, `SQL` | `SqlWarehouseSpec`, `DATABRICKS_SQL_ACCESS` |
| JSON | `Json`, `JSON` | `JsonValue`, `JsonObject`, `isJsonSchema` vs `JSON.stringify` |
| OAuth | `Oauth`, `OAuth` | `OAuthAppIntegration` (type), `oauthcustomappintegration` (package) |
| PyPI | `Pypi`, `PyPI` | `PypiLibrary` (type), JSDoc says "PyPI" |
| AWS | `Aws`, `AWS` | `AwsAttributes` (type), `AWS_SSE_S3` (enum value) |
| LLM | `Llm`, `LLM` | `CustomLlm` (type), `LLM` in JSDoc |
| ETag | `etag`, `eTag`, `ETag` | `RuleSet.etag` (field), `If-Match`/`ETag` (HTTP RFC 7232 §2.3 says `ETag`) |
| HTTP | `Http`, `HTTP` | `HttpClient` (type), `httpRequest` (method) |
| DBFS | `Dbfs`, `DBFS` | `disableLegacyDbfs`, `DbfsStorageInfo` vs JSDoc "DBFS" |

**Generator fix:** Adopt one policy in `typescript.mdc` and apply
generator-wide. The two consistent options are:
1. **Google TS style guide (`Pascal-then-lower`):** `Url`, `Id`, `Sql`, `Json`, `OAuth` → `Oauth`. Pro: every multi-letter token becomes a word; con: requires reading `OAuth` as `Oauth`, which collides with the brand.
2. **.NET / Microsoft (`ALL_CAPS` for ≤2-letter, `Pascal-then-lower` for ≥3):** `URL`, `ID`, `Sql`, `Json`. Pro: matches HTTP/RFC casing; con: harder to typo-check.

The choice matters less than the consistency; today the SDK has both.

---

## 2. Cross-package duplication & overlap

The audits surfaced ~30 pairs/triplets/quartets of packages that overlap
on a single underlying concept. Each row is a real user-facing pain point:
"I want to do X — which of these N packages do I import?"

### 2.1 Settings (4-way overlap — the worst case)

| Package | Style | What it really is |
|---|---|---|
| `settings` (v2) | Generic polymorphic value | The future "v2" key/value API |
| `accountsettings` | Per-feature endpoints | Per-toggle CRUD at the account level |
| `workspacesettings` | Per-feature endpoints | Per-toggle CRUD at the workspace level |
| `workspaceconf` | Free-form K/V map | Legacy untyped `map<string,string>` settings |

`BooleanMessage`, `StringMessage`, `IntegerMessage`,
`RestrictWorkspaceAdminsMessage`, `ClusterAutoRestartMessage`,
`AibiDashboardEmbeddingAccessPolicy`, `PersonalComputeMessage` are
**defined verbatim** in both `settings/v2/model.ts` and
`workspacesettings/v1/model.ts`. A consumer importing both gets two
distinct TS types with the same name.

### 2.2 Secrets (4-way overlap)

| Package | What it really is |
|---|---|
| `secrets` | Workspace-level Secret Manager (scopes + key/value) |
| `secretsuc` | Unity Catalog three-level-namespaced secrets |
| `serviceprincipalsecrets` | Account-level OAuth client secrets on SPs |
| `serviceprincipalsecretsproxy` | Workspace-level *byte-identical* clone of the above |

Every package exports a class literally named `Client`, and three of the
four also export a type literally named `Secret`. `serviceprincipalsecrets`
and `serviceprincipalsecretsproxy` are byte-for-byte identical at the
file level (verified by md5 in the audit); the "proxy" word never appears
inside the code or URL of either.

### 2.3 Credentials (3-way overlap)

| Package | What it really is |
|---|---|
| `@databricks/sdk-auth/credentials/` | SDK *user-auth* credentials (PAT, U2M, M2M) |
| `credentials` | Unity Catalog cloud-storage credentials (AWS IAM, Azure SP, GCP SA) |
| `gitcredentials` | Per-workspace Git provider credentials (GitHub/GitLab PATs) |

The bare type name `Credential` exists in two of these and `Credentials`
exists in the third.

### 2.4 Identity / IAM (multi-way overlap)

- `iam` exposes `*` + `*Proxy` versions of every method (e.g.
  `createGroup` + `createGroupProxy`, etc.) — 17 endpoint pairs (44
  request types collapse to 22 unique shapes).
- `accountaccesscontrol` + `accountaccesscontrolproxy` — file-level
  duplicate; the "proxy" suffix is invisible in code/URL.
- `permissions` overlaps with `iam` and `accountaccesscontrol` on the
  rule-set + grant-rule data model.
- `workspaceassignment` overlaps with the workspace-assignment surface
  inside `iam`.

### 2.5 Tokens

| Package | What it really is |
|---|---|
| `tokens` | User-self PAT management |
| `tokenmanagement` | Admin-of-others PAT management |

Both export `Client`, both export `ListTokens`, `RevokeToken`,
`UpdateToken`. They duplicate the entire `AutoscopeState` enum verbatim.

### 2.6 Tags (3-way split)

| Package | What it really is |
|---|---|
| `tagpolicies` | Account-level governed-tag definitions |
| `tagassignments` | Tag assignments on `apps`/`dashboards`/`geniespaces`/`notebooks` (non-UC) |
| `entitytagassignments` | Tag assignments on UC entities (tables/schemas/columns/volumes) |

Three packages, three `Client` classes, three near-identical
`TagAssignment` / `EntityTagAssignment` types. The non-UC variant has
`entityId: string`, the UC variant has `entityName: string` — same logical
field, different name, both string.

### 2.7 Quality / Data monitoring (3-way overlap, all deprecated)

| Package | Singular/plural | What it really is |
|---|---|---|
| `qualitymonitor` | singular | UC schema-level monitor (anomaly detection); deprecated |
| `qualitymonitors` | plural | UC table-level monitor (Lakehouse Monitoring); deprecated |
| `dataquality` | n/a | The new unified replacement API |

Singular vs plural is the *only* differentiator between the first two
package names. Both are deprecated in favour of `dataquality`. Three
packages, three vocabularies (`QualityMonitor`, `DataMonitorInfo`,
`Monitor`), three `Client`s.

### 2.8 Model Registry

| Package | What it really is |
|---|---|
| `modelregistry` | Workspace-level MLflow registry (legacy) |
| `registeredmodels` | Unity Catalog model registry (modern) |

The legacy package has the canonical-sounding name; the UC replacement is
hidden behind a plural noun.

### 2.9 Model Serving (3-way fragmentation)

| Package | What it really is |
|---|---|
| `modelservingmanagement` | CRUD over serving endpoints |
| `modelservingquery` | Inference / `POST /invocations` |
| `modelservingdebug` | Logs / metrics endpoints |

All three operate on the same `serving-endpoints/{name}` URL space. The
type names differ across packages: `InferenceEndpoint` (management),
`Endpoint` (debug, query), and the URL itself says `serving-endpoints`.
Three names for the same noun.

### 2.10 Cluster compute (overlapping warehouses)

- `warehouses` exposes SQL Warehouses (formerly "SQL Endpoints"); the
  TS types still spell `Endpoint*` (e.g. `EndpointInfo`, `EndpointState`).
- `endpoints` (separate package!) exposes Vector Search endpoints with
  type names like `Endpoint`, `EndpointType`, `EndpointStatus`.

Two packages, two `Endpoint*` type families, different products.

### 2.11 Database (Lakebase)

| Package | What it really is |
|---|---|
| `database` | Lakebase / managed Postgres (`DatabaseInstance`, etc.) |
| `postgres` | Same Lakebase OLTP surface from a different angle |

Both expose `SyncedTable`, `DatabaseInstance`, and other heavily-nested
types covering the same wire object.

### 2.12 Features

| Package | What it really is |
|---|---|
| `features` | Feature definitions |
| `featurestore` | Online stores / publishing |
| `materializedfeatures` | Feature materialisation |

Three packages, blurry boundaries (audit calls out "H1. Three sibling
packages, blurry boundaries" on `features.md`). `Feature` is overloaded.

### 2.13 Budget / Usage policy

| Package | What it really is |
|---|---|
| `budgetpolicy` | `/api/2.0/accounts/{accountId}/budget-policies` |
| `usagepolicy` | `/api/2.1/accounts/{accountId}/usage-policies` |

`usagepolicy/v1/model.ts` is `budgetpolicy/v1/model.ts` with the word
"Budget" substituted for "Usage". The JSDoc on `UsagePolicy.policyId` even
admits it: "(same structure as BudgetPolicy)". Reserved tag keys still say
`"budget-policy-name"` in the usage-policy clone.

### 2.14 Workspace (5-package fanout)

| Package | What it really is |
|---|---|
| `workspace` | Workspace filesystem (notebooks/folders/files) |
| `workspaceassignment` | Principal-to-workspace assignments |
| `workspacebindings` | Securable-to-workspace bindings |
| `workspaceconf` | Untyped K/V configuration |
| `workspacesettings` | Typed workspace settings |

The bare name `workspace` is misleading — every Databricks API operates
"in a workspace". A name like `workspacefiles` would convey scope.

### 2.15 Schemas (UC overlap)

| Package | What it really is |
|---|---|
| `schemas` | User-defined UC schemas (full CRUD) |
| `systemschemas` | Server-managed UC system schemas (enable/disable) |

### 2.16 OAuth

| Package | What it really is |
|---|---|
| `oauthcustomappintegration` | CRUD for custom AND published OAuth app integrations |
| `oauthpublishedapp` | List-only of the published-app catalog |

The first package's name is misleading — it covers both Custom and
Published despite saying only "Custom". Both packages are singular but
expose collection operations.

### 2.17 Statement / Query / Command execution

| Package | What it really is |
|---|---|
| `statementexecution` | Ad-hoc SQL on a SQL Warehouse |
| `queryexecution` | Re-run saved queries inside *published* dashboards |
| `commandexecution` | Python/SQL/Scala/R via Clusters REPL |
| `queries` | Saved-query CRUD |
| `queryhistory` | Read-only query history list |

Five packages, three near-synonyms in the names (query/statement/command),
disjoint scopes that the names do not telegraph.

### 2.18 Other notable overlaps

- `lakeview` (the rebranded "AI/BI Dashboards" — name uses old codename).
- `cleanrooms` + `cleanroomassets` + `cleanroomautoapprovalrules` +
  `cleanroomtaskruns` — four packages for one product surface.
- `serviceprincipalsecrets` ≡ `serviceprincipalsecretsproxy` (byte-identical).
- `accountaccesscontrol` ≈ `accountaccesscontrolproxy`.
- `supervisoragents` + `knowledgeassistants` + `customllms` —
  three packages in the LLM-orchestration space with bare-generic top-level
  type names (`SupervisorAgent`, `KnowledgeAssistant`, `CustomLlm`).

---

## 3. Cryptic abbreviations glossary

The user-facing TS surface uses these abbreviations, mostly without
expansion in code or JSDoc. A first-time user has to guess.

| Abbreviation | Meaning | Visibility | Notes |
|---|---|---|---|
| `rfa` | Request For Access | Package name only | `packages/rfa/` — no expansion in any TS identifier or JSDoc. The wire URL `/api/3.0/rfa/...` is the only other carrier. |
| `uc` | Unity Catalog | Package suffix (`secretsuc`), URL `/unity-catalog/`, comment references | Never appears as a type prefix. |
| `sp` | Service Principal | Field prefixes (`accountSpStatus`, `spId`) | Inconsistent — sometimes spelled out (`servicePrincipal`), sometimes `sp`. |
| `conf` | Configuration | `workspaceconf` (package), `EndpointConfPair` (type) | One four-letter abbreviation that the rest of the SDK consistently spells out. |
| `dbu` | Databricks Unit | Cluster docs only | Not in type names. |
| `dbr` | Databricks Runtime | `TerminationCode.DBR_IMAGE_RESOLUTION_FAILURE`, `K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` | Acronym not expanded. |
| `dbfs` | Databricks File System | `DbfsStorageInfo`, `disableLegacyDbfs` | Casing varies (`Dbfs` vs `DBFS` in JSDoc). |
| `dlt` | Delta Live Tables | Comment references | The product was renamed to "Lakeflow Declarative Pipelines"; the type `Update` still reflects the DLT-era name. |
| `csp` | Compliance Security Profile | `CspEnablementAccountSetting`, `Csp*` family | `Csp` casing is uniform; the acronym is not expanded. |
| `esm` | Enhanced Security Monitoring | `EsmEnablementAccountSetting`, `Esm*` family | Same as CSP. |
| `dcp` | (settings v1 internal acronym) | `DcpAccountEnableMessage` | Audit at `accountsettings.md` flagged as cryptic. |
| `llm` | Large Language Model | `CustomLlm`, `LlmProxyPartnerPoweredAccount`, `Llm*` family | `Llm` casing is uniform across SDK. |
| `sdp` | Serverless Declarative Pipelines | Comments | Internal acronym. |
| `ldp` | Lakeflow Declarative Pipelines | Comments | Internal acronym. |
| `dab` | Databricks Asset Bundles | `bundle` package only | Spelled out in package. |
| `m2m` | Machine-to-Machine | `auth/credentials/m2m.ts` | OAuth grant type. |
| `u2m` | User-to-Machine | `auth/credentials/u2m.ts` | OAuth grant type. |
| `pat` | Personal Access Token | `auth/credentials/pat.ts`, `tokens` package | OAuth-adjacent. |
| `abac` | Attribute-Based Access Control | Package name `abacpolicies` only | Never appears in code or types. |
| `iam` | Identity and Access Management | Package name | Conventional. |
| `wkt` | Well-Known Types | `@databricks/sdk-core/wkt` import | Proto term, not exposed to users. |
| `aibi` | AI/BI Dashboards | `AibiDashboard*` family | Internal codename for the "AI/BI" product brand. |
| `byok` | Bring Your Own Key | `TerminationCode.AZURE_BYOK_KEY_PERMISSION_FAILURE` | Not expanded. |
| `npip` | No Public IP | `TerminationCode.NPIP_TUNNEL_*` | Internal Databricks networking term. |
| `cmv2` | Cluster Manager v2 | `TerminationCode.K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` JSDoc | Internal term ("CMv2") leaked into enum doc. |
| `aqs`/`sqs` | Azure Queue Storage / AWS SQS | `AwsSqsQueue`, `AzureQueueStorage` | Audit flagged a doc copy-paste error: AWS SQS JSDoc says "AQS queue url". |
| `cprf` | Control Plane Request Failure | `TerminationCode.CONTROL_PLANE_REQUEST_FAILURE` JSDoc | Internal acronym in user-facing JSDoc. |
| `gke` | Google Kubernetes Engine | `TerminationCode.GKE_BASED_CLUSTER_TERMINATION` | Cloud-specific abbreviation. |
| `n` (single letter) | Number of completions (LLM API) | `QueryEndpointInput.n` | One-character field name on a public model. |
| `expr` | Expression | `FunctionArgExpression.expr` discriminator | Three-letter abbreviation when `expression` would do. |
| `arg` | Argument | `fullNameArg`, `nameArg`, `versionArg`, `aliasArg` | Path-parameter suffix; surfaced in 5+ UC packages (`tables`, `schemas`, `catalogs`, `functions`, `registeredmodels`). |
| `tpe` | Type | `externallineage.ExternalLineageRelationshipObject.tpe` | Likely typo for `type` — but is a discriminator key. |
| `req` / `resp` | Request / Response | Local variable names in `client.ts` files | Go-ism. |
| `etag` / `eTag` / `ETag` | Entity Tag (HTTP) | Field name varies | RFC 7232 §2.3 specifies `ETag`. |

---

## 4. Acronym-casing inconsistencies

The SDK currently has no enforced casing policy. The same acronym appears in
multiple casings across packages — sometimes within the same file.

| Acronym | Found casings | Sample sites |
|---|---|---|
| **URL** | `Url`, `URL`, `url` | `webhookUrl` (field), `URL` (enum value in `rfa.DestinationType`), `URLSearchParams` (import). Note: `URL` collides with the JS built-in. |
| **ID** | `Id`, `ID`, `id` | `userId`, `runId`, `policyId` (field side) vs `ID` (enum value) vs raw `id` (bare field). |
| **URI** | `Uri`, `URI` | `endpointUri` vs JSDoc "URI". |
| **SQL** | `Sql`, `SQL` | `SqlWarehouseSpec` (type), `DATABRICKS_SQL_ACCESS` (enum). |
| **JSON** | `Json`, `JSON` | `JsonValue`, `JsonObject` (wkt types) vs `JSON.stringify` (built-in). |
| **OAuth** | `Oauth`, `OAuth` | Package `oauthcustomappintegration` (lowercased), type `OAuthAppIntegration` (PascalCase). |
| **PyPI** | `Pypi`, `PyPI` | `PypiLibrary` (type), JSDoc spells `PyPI`. |
| **AWS** | `Aws`, `AWS` | `AwsAttributes` (type), `AWS_SSE_S3` (enum). |
| **GCP** | `Gcp`, `GCP` | `GcpAvailability` (type), `GCP_QUOTA_EXCEEDED` (enum). |
| **Azure** | `Azure` | Consistent. |
| **LLM** | `Llm`, `LLM` | `CustomLlm` (type, field), JSDoc says `LLM`. |
| **HTTP** | `Http`, `HTTP` | `HttpClient` (type) vs JSDoc and headers. |
| **HTTPS** | `Https` | Consistent. |
| **DBFS** | `Dbfs`, `DBFS` | `DbfsStorageInfo` vs `disableLegacyDbfs` vs JSDoc "DBFS". |
| **DBR** | `Dbr`, `DBR` | Enum members all-caps. |
| **PII** | `Pii`, `PII` | `Pii` casing in types; JSDoc varies. |
| **CSP** | `Csp`, `CSP` | Type `Csp*`, JSDoc "CSP". |
| **ESM** | `Esm`, `ESM` | Type `Esm*`, JSDoc "ESM". |
| **IdP** | `Idp`, `IdP` | `idp*` fields, JSDoc "IdP". |
| **ETag** | `etag`, `eTag`, `ETag` | Three casings within one JSDoc comment block (`accountaccesscontrolproxy`). |
| **ODBC** | `Odbc` | `OdbcParams`. |
| **JDBC** | `Jdbc`, `JDBC` | Doc references only. |
| **AI/BI** | `Aibi`, `AI/BI` | `AibiDashboard*` types, JSDoc says "AI/BI". |
| **SSE** | `Sse`, `SSE` | `SseEncryptionAlgorithm` (type), `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED` (enum). |
| **TLS** | `Tls`, `TLS` | Rare; `Tls` in field names. |
| **OAuth2** | varied | `oauth2` (path), `OAuth` (types). |

**Recommendation:** Pick one rule. The Google TypeScript Style Guide
specifies `Pascal-then-lower` (`Url`, `Id`, `Json`, `Sql`) — this is the
current majority in the SDK. Document the choice in `.agent/rules/typescript.mdc`
§ 3 and enforce in CI. Wire format unchanged.

---

## 5. Package-name oddities

Packages whose names themselves cause user-facing pain.

| Package | Issue | Suggested rename |
|---|---|---|
| `rfa` | 3-letter cryptic acronym — never expanded in any TS identifier. | `accessrequests` |
| `workspaceconf` | `conf` is the only abbreviation of "configuration" in the SDK. | `workspaceconfig` |
| `secretsuc` | Two words mashed together; `uc` is invisible to readers. | `unitycatalogsecrets` or `ucsecrets` |
| `cleanroomautoapprovalrules` | 26-character compound, no separator. | `cleanroomautoapprovals` (drop "rules") or `cleanrooms/auto-approval-rules` subpath |
| `oauthcustomappintegration` | 25 chars; singular; *covers both Custom AND Published*. | `oauthappintegrations` (drop `custom`, pluralise) |
| `serviceprincipalsecretsproxy` | 28 chars; "proxy" appears nowhere in code or URL; byte-identical to `serviceprincipalsecrets`. | Merge into `serviceprincipalsecrets`. |
| `serviceprincipalsecrets` | 23 chars compound; sibling to four other `*secret*` packages. | `sp-credentials` or `service-principal-credentials` (hyphenated). |
| `accountaccesscontrolproxy` | 25 chars; byte-identical to `accountaccesscontrol`. | Merge into `accountaccesscontrol`. |
| `qualitymonitor` vs `qualitymonitors` | Singular vs plural, both deprecated, different APIs. | Drop both — consolidate to `dataquality`. |
| `tokens` vs `tokenmanagement` | "Tokens API" vs "Manage tokens" — both accurate, neither distinguishes user-self vs admin. | `usertokens` + `tokenadmin`. |
| `workspace` | Most overloaded of 5 `workspace*` packages — every API operates "in a workspace". | `workspacefiles` (it's the FS API). |
| `endpoints` | Doesn't say "vector search" — collides conceptually with the legacy `Endpoint*` types in `warehouses`. | `vectorsearchendpoints`. |
| `warehouses` | Right product name, but every TS type is `Endpoint*` (legacy proto name). | Keep; rename `EndpointInfo`/`EndpointState`/`EndpointTagPair`/`EndpointConfPair`/`EndpointSecurityPolicy`/`EndpointSpotInstancePolicy` → `Warehouse*`. |
| `lakeview` | Old codename; product is now "AI/BI Dashboards". | `dashboards` or `aibidashboards`. |
| `repos` | Legacy codename; product is "Git folders". | `gitfolders`. |
| `database` vs `postgres` | Two packages, one product (Lakebase managed Postgres). | Merge; keep `lakebase` or `managedpostgres`. |
| `modelregistry` vs `registeredmodels` | Singular "the registry" vs plural "the entries" — actually two products (workspace MLflow vs UC). | `mlflowregistry` + `ucregisteredmodels`. |
| `qualitymonitor` (singular) | Only its singular form distinguishes from `qualitymonitors` (plural). | See row above. |
| `billableusagedownload` | Verb in package name (`download`). Only such case in the SDK. | `billableusage` (move verb to method). |
| `experiments` | Bare-generic word — also a common term in feature-flag SDKs. | `mlflowexperiments`. |
| `bundle` | Bare-generic word — Webpack/Vite/Rollup all have "bundles". | `assetbundles`. |
| `genie` | Codename — product is "Genie Spaces"/"AI/BI Genie". | Keep `genie` but drop the `Genie*` type prefix throughout. |
| `customllms` | Plural, but the type is singular (`CustomLlm`). | OK; flag for `LLM` vs `Llm` casing policy. |
| `disasterrecovery` | OK; `FailoverFailoverGroupRequest` is the type to fix. | n/a |
| `supervisoragents` | `Supervisor` + `Agent` both extremely generic. | `routeragents` or `agentorchestrators`. |
| `knowledgeassistants` | OK, but generic enough that future overlap is likely. | n/a |
| `commandexecution` | Mixes three resources (Command, Context, Cluster); name picks one. | Keep, but split the type prefixes (`CommandStatus` vs `ContextStatus`). |
| `policyfamilies` | OK but uses both "Family" and "Policy Family" interchangeably. | n/a |
| `connections` | Bare-generic; collides with HTTP/DB connections in user code. | `ucconnections` or `foreignconnections`. |
| `tables`, `volumes`, `schemas`, `catalogs`, `functions` | All bare-plural UC nouns. Cross-package overlap with `Dependency`, `SecurableType`, `EncryptionDetails`, `EffectivePredictiveOptimizationFlag` is heavy. | Keep names; hoist shared types to a `uc-common` package. |

---

## 6. Top-50 highest-impact individual findings

Picked one per package where possible, prioritising ones with broad reuse.
Findings ranked High severity in their audit. Each entry: file + symbol + the
generator pattern it exemplifies.

| # | Package | File:Line | Symbol / Issue | Pattern |
|---|---|---|---|---|
| 1 | `jobs` | `model.ts:3414, 3890` | `Run` overloaded across 7 shapes (`Run`, `BaseRun`, `RunTask`, `Run_JobLevelParameters`, `RunState`, `RunStatus`, `RunTriggerInfo`). | Vague/duplicate concepts |
| 2 | `jobs` | `model.ts:150, 280, 1464, 1835` | `Format`, `Source`, `Compute`, `Environment` — top-level types collide with JS/TS built-ins and DOM globals. | Reserved-word collision |
| 3 | `warehouses` | `model.ts:passim` | Every `Endpoint*` type leaks the legacy "SQL Endpoints" brand into the modern "SQL Warehouses" surface. | Brand drift / rebrand leakage |
| 4 | `pipelines` | `model.ts:283, 1091, 1689, 2738, 2879` | `Update` is the noun "pipeline run" — collides with HTTP `update()` verb across 9 types/methods. | Rebrand leakage (DLT → Lakeflow) |
| 5 | `pipelines` | `model.ts:212-2507` | `Pipelines*` prefix on 15 types in a package called `pipelines` (singular). | Type-name prefix repeats package |
| 6 | `iam` | `client.ts:309-2150` | Every method exists as `*` + `*Proxy` pair (17 endpoint duplicates). | Proxy routing in type names |
| 7 | `abacpolicies` | `model.ts:7-14` | `PolicyType.POLICY_TYPE_UNSPECIFIED`/`POLICY_TYPE_ROW_FILTER`/etc. | Redundant enum prefix |
| 8 | `abacpolicies` | `model.ts:190` | `PolicyInfo` — `Info` suffix on the canonical entity. | `Info` suffix |
| 9 | `tables` | `model.ts:passim` | `fullNameArg` path-param field name (5+ UC packages share this). | Cryptic `Arg` suffix |
| 10 | `tables` | `model.ts:849` | `TableSummary` vs `TableInfo` — two near-identical shapes. | Duplicate concept |
| 11 | `apps` | `model.ts:693, 1054` | `ApplicationStatus` on `App` — two vocabularies for one product. | Vocabulary drift |
| 12 | `apps` | `model.ts:606, 962` | `AppResourceApp.AppPermission.CAN_USE` — `App` token thrice; package-name re-prefix throughout. | Redundant prefix |
| 13 | `genie` | `client.ts:131, 1019, 1038` | Method naming: 28 of 30 prefixed `genie*`, 2 not; one `Trash*` instead of `Delete*`. | Inconsistent action verbs |
| 14 | `genie` | `model.ts passim` | 40 of ~70 types prefixed `Genie*`; remaining have no prefix. | Inconsistent type prefix |
| 15 | `commandexecution` | `model.ts:70` vs `client.ts:286-309` | `CreateResponse` is reused for both `create()` (context id) and `execute()` (command queued) — type repurposed across two semantically different operations. | Type repurposing |
| 16 | `commandexecution` | `model.ts:71, 100, 112` | Three different `id?: string` fields — should be `contextId`/`commandId`. | Underspecified IDs |
| 17 | `commandexecution` | `client.ts:256` | `client.destroy()` — verb collision; Go SDK uses `delete`. | Verb inconsistency |
| 18 | `secrets` | `client.ts:passim` | `Put` for ACLs/secrets, `Create` for scopes, `Delete` for both — inconsistent mutation verbs. | Inconsistent action verbs |
| 19 | `secrets` | `model.ts:passim` | `ListAcls_Response.items` should be `acls` (parallel to `ListScopes_Response.scopes` / `ListSecrets_Response.secrets`). | Field-name vocabulary drift |
| 20 | `qualitymonitor` | package + types | Singular `qualitymonitor` vs plural `qualitymonitors` — different APIs distinguished only by trailing `s`. | Package-name overlap |
| 21 | `qualitymonitors` | model + types | Both deprecated; `DataMonitorInfo` vs `Monitor` vs `QualityMonitor` — three names for one wire object. | Duplicate concept |
| 22 | `modelservingmanagement` | `model.ts:passim` | Package says "model serving"; types say `InferenceEndpoint*`; URL says `serving-endpoints`. | Three names for one noun |
| 23 | `modelservingmanagement` | `model.ts:960` | `ServedModel` actually holds non-model entities (`servedEntities: ServedModel[]`). | Type-name contradicts content |
| 24 | `oauthcustomappintegration` | `model.ts:passim` | 18 types named `*OAuthAppIntegration*` — package name re-stated in every type. | Type-name prefix |
| 25 | `oauthcustomappintegration` | package | Name says "custom" but covers both Custom and Published integrations. | Misleading package name |
| 26 | `serviceprincipalsecretsproxy` | files | Byte-identical to `serviceprincipalsecrets` — "proxy" never in code/URL. | Duplicate package |
| 27 | `serviceprincipalsecrets` | `model.ts:42, 59` | Verb-phrase request types lacking `Request` suffix (`CreateServicePrincipalSecret`, etc.); 23-char package-noun re-stated on every type. | Verb-as-noun + Type-name prefix |
| 28 | `accountaccesscontrol` | `model.ts:73, 89, 105` | `RuleSet`, `RuleSetUpdateRequest`, `UpdateRuleSetRequest` — three names for one shape with overlapping `name` fields. | Duplicate concept |
| 29 | `tokens` | `model.ts:13-21` | `AutoscopeState` duplicated verbatim in `tokenmanagement`. | Cross-package duplicate type |
| 30 | `tokens` + `tokenmanagement` | package | Two packages for one PAT resource; both export `Client`, `ListTokens`, `RevokeToken`. | Cross-package collisions |
| 31 | `tagassignments` + `entitytagassignments` | model.ts | Same conceptual object has `entityId` here, `entityName` there. | Cross-package field drift |
| 32 | `usagepolicy` | model.ts | 1:1 clone of `budgetpolicy` with `Budget` → `Usage`. | Whole-package duplicate |
| 33 | `customllms` | every file | `Llm` casing throughout — SDK has no acronym-casing policy. | Acronym casing |
| 34 | `supervisoragents` | `model.ts:219` | `SupervisorAgent` — two extremely generic nouns combined. | Generic naming |
| 35 | `supervisoragents` | `model.ts:251` | `Tool` — bare generic for discriminated union over 14 resource kinds; `toolType: string`. | Stringly-typed sum |
| 36 | `cleanroomautoapprovalrules` | every type | `CleanRoomAutoApprovalRule` re-states the 26-char package name on every type. | Type-name prefix |
| 37 | `database` + `postgres` | model.ts | Two packages, one product (Lakebase managed Postgres); `SyncedTable`/`DatabaseInstance` duplicated across both. | Duplicate package |
| 38 | `iam` | `model.ts:41-48` | `State` (top-level enum named `STATE`) — collides with React `setState`/dozens of state-machine libs. | Generic top-level enum |
| 39 | `iam` | `model.ts:13-21` | `Entitlement` — vague name for workspace-only entitlement enum; mixes presence and permission semantics. | Vague enum |
| 40 | `permissions` | `model.ts` | `GetPermissions`, `UpdatePermissions`, `GetEffectivePermissions` — verb-phrase request types. | Verb-as-noun |
| 41 | `permissions` + `grants` + `iam` + `accountaccesscontrol` | passim | Permissions/grants/rule-sets fragmented across 4 packages with overlapping vocabularies. | Cross-package fragmentation |
| 42 | `experiments` | `model.ts:219, 712` | `Run`, `Experiment`, `Metric`, `Param`, `LoggedModel` — single-word top-level types, all collide with common JS terms. | Generic naming |
| 43 | `repos` | `model.ts:111` | `RepoInfo` — `Info` suffix on the canonical entity; product re-branded to "Git folders". | `Info` suffix + brand drift |
| 44 | `repos` | package + types | "Repos" is legacy; product is "Git folders". | Brand drift |
| 45 | `notificationdestinations` | `model.ts:17, 13` | `Config` interface + `config` field — vague top-level name + self-referential field; `DestinationType` vague enum. | Self-referential field + generic naming |
| 46 | `disasterrecovery` | `model.ts:91, 10` | `FailoverFailoverGroupRequest` — token "Failover" twice. | Generator stutter |
| 47 | `materializedfeatures` | package | `materializedfeatures` does not match contents (contains feature-tag CRUD, not materialisation logic). | Misleading package name |
| 48 | `marketplaces` | `model.ts:passim` | 14 verb-phrase request types (`Create`, `Update`, `Delete`, `Search`, `Get`, `List` variants) in a single file. | Verb-as-noun |
| 49 | `marketplaces` | `model.ts:passim` | `Listing` vs `ExchangeListing` vs `ListingSummary` vs `ListingDetail` — four overlapping "listing" shapes. | Duplicate concept |
| 50 | `externalmetadata` | `model.ts:10-32` | `SystemType` enum has 22 values with inconsistent casing (`POWER_BI`, `STREAM_NATIVE`, `POSTGRESQL`, `MICROSOFT_SQL_SERVER`). | Acronym/brand-value casing |

---

## 7. By-the-numbers (all 98 packages, sorted by total findings)

| # | Package | Findings | Top theme |
|---|---|---|---|
| 1 | jobs | 177 | Generic enum/interface names (`Run`, `Format`, `Source`, `Compute`); `Run` overload across 7 shapes |
| 2 | endpoints | 111 | `Endpoint*` (vector search) vs `endpoints` (other products); brand-name collision |
| 3 | warehouses | 109 | Legacy `Endpoint*` brand surviving the SQL-Warehouse rebrand |
| 4 | pipelines | 88 | `Update` noun = pipeline run; `Pipelines*` prefix on every type |
| 5 | settings | 87 | Cross-package duplication with `accountsettings`/`workspacesettings`/`workspaceconf` |
| 6 | postgres | 83 | Quad-nested `SyncedTable_*` shapes; cross-package duplicate of `database` |
| 7 | clusters | 76 | Per-cloud-enum-prefix inconsistency; 150-member `TerminationCode` |
| 8 | budgets | 73 | Budget vs `budgetpolicy` duplication |
| 9 | apps | 67 | `App` vs `Application` vocabularies; `AppResourceApp_AppPermission` triple-tautology |
| 10 | genie | 64 | Inconsistent method prefixing (28/30 with `genie*`); `GenieSpace` opaque term |
| 11 | catalogs | 60 | `*_OptionsEntry`/`*_PropertiesEntry`; `nameArg`; Create-with-read-only-fields |
| 12 | tables | 59 | `fullNameArg`; `TableInfo` vs `TableSummary`; cross-package `Dependency` family duplication |
| 13 | modelregistry | 59 | Workspace vs UC duplicate (`registeredmodels`); `MLflow` vocabulary |
| 14 | iam | 56 | `*Proxy` method duplicates; `State`/`Entitlement` generic enums |
| 15 | clusterlibraries | 55 | `Library.lib` field; "Full" suffix without "Partial" counterpart |
| 16 | schemas | 54 | `_OptionsEntry`/`_PropertiesEntry`; `fullNameArg`; vs `systemschemas` package |
| 17 | functions | 54 | `function` reserved-word; `fullNameArg`; cryptic single-letter enum variants |
| 18 | instanceprofiles | 53 | Bare verb request types; vague identifiers |
| 19 | experiments | 53 | Single-word top-level types (`Run`, `Metric`, `Experiment`) |
| 20 | qualitymonitors | 52 | Plural vs singular `qualitymonitor`; both deprecated |
| 21 | instancepools | 50 | Massive structural duplication of `Create*`/`Edit*`/`*AndStats` |
| 22 | statementexecution | 48 | Package name overlaps `queryexecution`/`commandexecution`/`queries` |
| 23 | metastores | 48 | Structural duplicate of `MetastoreInfo`; `*Summary` returning the entity |
| 24 | cleanroomassets | 48 | `CleanRoom*` re-prefix on every type; `details`/`localDetails` discriminated-union arms |
| 25 | marketplaces | 47 | 14 verb-phrase request types; `Listing`/`ExchangeListing`/`ListingSummary`/`ListingDetail` overlap |
| 26 | workspacesettings | 45 | Cross-package duplicates with `settings`/`accountsettings`/`workspaceconf` |
| 27 | queryhistory | 45 | Vague `Query` types; cross-package overlap with `queries`/`queryexecution` |
| 28 | clusterpolicies | 45 | Verb-as-noun requests; `Family` vocabulary mismatch with `policyfamilies` |
| 29 | features | 44 | Three sibling feature packages with blurry boundaries |
| 30 | dataquality | 44 | `ListMonitorRequest` singular for list of monitors |
| 31 | supervisoragents | 43 | Generic `SupervisorAgent`; `Tool` bare type for 14-arm union |
| 32 | registeredmodels | 42 | `fullNameArg`/`versionArg`/`aliasArg`; cross-package overlap with `modelregistry` |
| 33 | database | 42 | Package name overlaps `postgres`; deep proto nesting |
| 34 | accountsettings | 42 | `Csp`/`Esm`/`Llm`/`Dcp` cryptic acronyms; generic `value` discriminator |
| 35 | modelservingmanagement | 41 | `InferenceEndpoint` vs `ServingEndpoint` vs `serving-endpoints` URL — three names |
| 36 | rfa | 40 | 3-letter cryptic package name |
| 37 | globalinitscripts | 40 | Verb-as-noun requests; brittle `script_id` path-parameter handling |
| 38 | commandexecution | 39 | Three resources (Command/Context/Cluster) mixed; `id?: string` underspecified |
| 39 | qualitymonitor | 38 | Sibling-package collision with `qualitymonitors` |
| 40 | policyfamilies | 38 | "Family" + "Policy Family" mixed; underscored enums |
| 41 | knowledgeassistants | 37 | Generic `KnowledgeAssistant`; bare `Tool`/`Resource` type names |
| 42 | indexes | 37 | Package name not "vector search"; `MiniVectorIndex` duplicates `VectorIndex` |
| 43 | files | 37 | `Read`/`Move`/`Put`/`Delete`/`Close`/`Create`/`MkDirs`/`AddBlock` — verb-as-noun (legacy DBFS) |
| 44 | onlinetables | 36 | Underspecified IDs; deprecation drift |
| 45 | externalmetadata | 36 | `SystemType.*_UNSPECIFIED`; brand-value casing (`POWER_BI`, `STREAM_NATIVE`) |
| 46 | queries | 35 | Three-package overlap with `queryhistory`/`queryexecution` |
| 47 | lakeview | 35 | Old codename (rebrand to "AI/BI Dashboards") |
| 48 | connections | 35 | `UNKNOWN_*` sentinels; `ConnectionType` value casing inconsistencies |
| 49 | alerts | 35 | Mixed v1/v2 |
| 50 | abacpolicies | 35 | `PolicyInfo`; verb-as-noun requests; redundant enum prefix |
| 51 | bundle | 34 | Generic package name (`bundle`); verb-as-noun requests |
| 52 | workspacebindings | 33 | Bare verb requests |
| 53 | usagepolicy | 33 | 1:1 clone of `budgetpolicy` |
| 54 | secrets | 33 | Mutation-verb inconsistency (`Put`/`Create`/`Delete`) |
| 55 | repos | 33 | "Repos" legacy term; product is "Git folders" |
| 56 | permissions | 33 | Cross-package overlap with `iam`/`accountaccesscontrol`/`grants` |
| 57 | logdeliveryconfigurations | 33 | Long verbose names |
| 58 | credentials | 33 | 4× duplicate type pairs (`Credential*` vs `StorageCredential*`); cross-package with `auth/credentials` |
| 59 | customllms | 32 | `Llm` casing throughout |
| 60 | workspace | 31 | Most overloaded of 5 `workspace*` packages |
| 61 | modelservingquery | 31 | `QueryEndpointInput` has 7 mutually-exclusive input fields, no oneof |
| 62 | environments | 31 | `Environment` generic name |
| 63 | entitytagassignments | 31 | `EntityTagAssignment` vs `TagAssignment` cross-package collision |
| 64 | tokens | 30 | Cross-package duplicate of `tokenmanagement` |
| 65 | tagpolicies | 30 | Three sibling tag packages with overlapping vocab |
| 66 | queryexecution | 30 | Package name far broader than scope (dashboards-only) |
| 67 | materializedfeatures | 30 | Package name doesn't match contents |
| 68 | cleanrooms | 30 | Redundant enum prefixes throughout |
| 69 | budgetpolicy | 30 | Sibling clone in `usagepolicy` |
| 70 | workspaceassignment | 28 | Cross-package overlap with `iam` |
| 71 | grants | 28 | Verb-phrase request types |
| 72 | featurestore | 28 | Cross-package duplicates in feature trio |
| 73 | tagassignments | 27 | Three-package tag split; sibling field-name drift |
| 74 | externallineage | 25 | `Direction_LineageDirection`; `tpe` typo |
| 75 | disasterrecovery | 25 | `FailoverFailoverGroupRequest` stutter |
| 76 | accountaccesscontrolproxy | 25 | 1:1 surface duplicate of `accountaccesscontrol` |
| 77 | tokenmanagement | 24 | Overlap with `tokens`; duplicate `AutoscopeState` enum |
| 78 | secretsuc | 24 | `uc` cryptic suffix; collides with `secrets` |
| 79 | workspaceconf | 23 | `conf` cryptic abbreviation; wire-shape regression |
| 80 | serviceprincipalsecrets | 23 | Identical to `serviceprincipalsecretsproxy`; verb-as-noun requests |
| 81 | volumes | 22 | `fullNameArg`; verb-as-noun requests |
| 82 | serviceprincipalsecretsproxy | 22 | Byte-identical to non-proxy version |
| 83 | notificationdestinations | 22 | `Config`/`config` self-reference; `DestinationType` vague enum |
| 84 | usagedashboards | 21 | Vague type names |
| 85 | resourcequotas | 21 | Vague type names |
| 86 | modelservingdebug | 21 | Tiny package, narrow surface |
| 87 | billableusagedownload | 20 | Verb in package name (`download`) |
| 88 | dataclassification | 19 | Tag-domain overlap |
| 89 | gitcredentials | 17 | Three "Credentials" packages with different meanings |
| 90 | forecasting | 17 | Generic-named `Waiter` API; cross-package overlap with `experiments` |
| 91 | cleanroomautoapprovalrules | 17 | 26-char package name; `CleanRoomAutoApprovalRule` re-prefix |
| 92 | accountaccesscontrol | 16 | Sibling duplicate `accountaccesscontrolproxy` |
| 93 | oauthcustomappintegration | 15 | Package covers Custom AND Published despite name |
| 94 | externallocations | 15 | `IsolationMode_*`/`SseEncryptionAlgorithm_*` enum prefixing; cross-cloud queue type naming inconsistency |
| 95 | cleanroomtaskruns | 15 | `LifeCycle` casing; one of four cleanroom packages |
| 96 | systemschemas | 14 | Sibling-package collision with `schemas` |
| 97 | artifactallowlists | 14 | Vague type names |
| 98 | oauthpublishedapp | 12 | Singular but only `list*` endpoints |

---

## 8. Generator-level recommendations

Ranked by impact across all 98 packages. Each item is one template change.

### 8.1 Drop the redundant enum-name prefix on members

`PolicyType.POLICY_TYPE_ROW_FILTER` → `PolicyType.RowFilter` (PascalCase
preferred for new code; SCREAMING_SNAKE acceptable if the project policy
chooses it). Map the wire value `POLICY_TYPE_ROW_FILTER` via Zod transform.
Drop all `*_UNSPECIFIED` members and rely on the field's optional
`?:`/`undefined` for "unset". Affects ~84/98 packages.

### 8.2 Append `Request` to every request DTO type

`DeletePolicy` → `DeletePolicyRequest`. Eliminates verb-as-noun confusion
in import lists and resolves the `client.delete(req: Delete)` collision
patterns in `workspace`, `files`, `experiments`, `grants`, and ~75 other
packages. Affects ~80/98 packages.

### 8.3 Drop the `Info`/`Spec`/`Details` suffix on canonical entities

`RepoInfo` → `Repo`, `PolicyInfo` → `Policy`, `SchemaInfo` → `Schema`,
`CredentialInfo` → `Credential`, `MetastoreInfo` → `Metastore`,
`CatalogInfo` → `Catalog`. (Suffix can stay where the SDK genuinely has
both `Foo` and `FooInfo` and they mean different things.) Affects ~70/98
packages.

### 8.4 Adopt one acronym-casing policy

Decide on `Pascal-then-lower` (`Url`, `Id`, `Json`, `Sql`, `Oauth`,
`Pypi`, `Aws`, `Llm`) or `ALL_CAPS-for-≤2` (`URL`, `ID`, `Json`, `Sql`,
`OAuth`, `PyPI`, `AWS`, `Llm`). Apply consistently to:
type names (`HttpRequest` vs `HTTPRequest`),
field names (`webhookUrl` vs `webhookURL`),
enum values (`URL` vs `Url` — the latter avoids JS-global collision).
Affects 98/98 packages.

### 8.5 Rename `Client` per package

Every package exports a class literally named `Client`. Imagine a user
with `jobs`, `clusters`, `pipelines` all importing `Client`. Rename to
`<Domain>Client` — `JobsClient`, `ClustersClient`, `PipelinesClient`,
`WarehousesClient`. Removes the most common cross-package alias-on-import
pattern. Affects 98/98 packages.

### 8.6 Strip the package-name prefix from type names

When a type name begins with the package's domain noun and the unprefixed
name does not clash with another type in the same package, drop the
prefix. `Pipelines*` → drop, `Genie*` → drop, `CleanRoom*` → drop,
`OAuthAppIntegration*` → drop where unambiguous, `Tag*` → drop in
single-domain packages. Affects ~70/98 packages.

### 8.7 (Bonus) Surface deprecations as `@deprecated` JSDoc tags

Today the audits found dozens of fields whose JSDoc text says "deprecated"
in prose but does not carry the `@deprecated` tag, so IDEs do not strike
them through. Examples: `Environment.client`, `Run.numberInJob`,
`ServedModel.modelName`, `EndpointCoreConfig.servedModels`, every method
in `qualitymonitor`/`qualitymonitors`. A simple template change — when
the proto description starts with "Deprecated", emit `@deprecated` —
catches all of them.

---

## 9. Generator-only recommendations

The following recommendations are template-level fixes that the
generator emits identically across every package. Rather than carry the
same finding in 98 per-package audits, each rule is recorded once here.
Each item names the rule, why it is generator-only, the approximate
package count it appeared in before promotion, and an illustrative
example.

### 9.1 Drop the duplicate `list*Iter()` paginator method

**Rule:** Drop the duplicate `list*Iter()` paginator method. Make
`list*()` return `AsyncIterable<T>` natively and add a `.firstPage()`
escape hatch for callers who need the raw page response. Modeled on
Octokit, Azure SDK, AWS SDK v3.

**Why it's generator-only:** The duplicate-method pattern is emitted by
every generated package; the fix is one template change, not per-package
work.

**Approximate package count where it appeared before pruning:** ~57/98
packages (every package that has a paginating list endpoint).

**Illustrative example:** `listCatalogsIter` in `catalogs/v1/client.ts`
(and parallel methods in `endpoints`, `warehouses`, `jobs`, etc.).

---

## Appendix: Categories (from the per-package audits)

The audits used a shared 20-category rubric. The most-cited categories
across all 98 audits (Category 11 "Empty / trivial wrapper types" has
been retired — see prune note in the header; Category 4 "Underscores
in TS identifiers" has been retired in this prune pass):

| # | Category | Audits citing it |
|---|---|---|
| 1 | Vague / generic names | 98 |
| 6 | Misleading names | 98 |
| 3 | Acronym casing inconsistencies | 98 |
| 12 | Duplicate concepts | 95 |
| 15 | Generic field names losing meaning | 94 |
| 20 | Type-suffix tautology | 94 |
| 19 | Underspecified IDs | 93 |
| 17 | Inconsistent action verbs | 93 |
| 7 | Overly verbose names | 90 |
| 14 | Go / Java-style names | 89 |
| 5 | Cryptic abbreviations | 86 |
| 2 | Redundant enum prefix | 84 |
| 8 | Redundant suffix | 79 |
| 9 | Singular/plural mismatches | 78 |
| 16 | Field contradicting type domain | 77 |
| 18 | Long enum values | 73 |
| 13 | Verb-tense inconsistency | 66 |
