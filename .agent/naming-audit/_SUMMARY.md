# Cross-Package Naming Audit — Executive Summary

**Packages audited:** 77 active API packages (every package under `packages/<pkg>/src/<vN>/`). Per-package audits are strictly limited to packages with live source.
**Total active findings across all 77 active audits:** **479**
**Source files:** `/home/parth.bansal/sdk-js/.agent/naming-audit/<package>.md`
**Last source state:** The per-package audits are validated against the current generated client source.

This document synthesises the per-package audits into the patterns that the
upstream generator (and a smaller number of API team decisions) should fix
to deliver an idiomatic TypeScript SDK. The vast majority of the findings are
template-driven — fix the template once and the symptoms disappear from every
package.

The 77 active packages are a 1:1 port of `databricks/sdk-go`, so most defects
flow from Go/protobuf idioms that do not translate to TypeScript. Idiomatic
TS SDKs (AWS, Azure, Stripe, Octokit) deliberately diverge from their wire
formats; the Databricks JS SDK currently does not.

---

## 1. Top cross-cutting themes

Ranked by approximate package incidence. Each theme is a generator-level
defect — one template change fixes most of the 77 active packages.

The table below tallies the theme tags carried by the 77 per-package audits,
counting the number of packages each tag appears in (a package is counted
once per tag regardless of how many findings carry it). The curated narrative
themes (Theme 1–4) follow.

| Theme | Packages |
|---|---|
| Type-shape / cardinality (unions, optionality, wrappers) | 43 |
| Method / operation naming | 34 |
| Misleading type name | 33 |
| Vague / generic type name | 32 |
| Architectural leak (`Public`/`Proxy`/`Handler`) | 30 |
| Redundant `*Info`/`*Details`/`*Spec` type suffix | 29 |
| Proto `Foo_Bar` type-name leak (incl. map-entry types) | 23 |
| `*Request`/`*Response` envelope rename | 14 |
| Package name | 9 |

### Theme 1. `Info` (and other vague) suffix on the canonical entity — ~29/77 packages

The Go SDK uses `<Domain>Info` to name "details of an X" because Go does not
have package-qualified imports for types. TS does, and `<Domain>` alone
suffices. Field-side instances of this theme are out of scope (field
renames would deviate the SDK from the underlying API), but the type-name
incidence is flagged. Examples that are flagged at the type level:

- `RepoInfo` → `Repo` / `GitFolder` (brand drift — see Theme 3).
- `PolicyInfo` → `Policy`.
- `EndpointInfo` → `Endpoint` (in `warehouses`, brand mismatch — see Theme 3).
- `SchemaInfo` → `Schema`.
- `CredentialInfo` → `Credential`.
- `MetastoreInfo` → `Metastore`.
- `CatalogInfo` → `Catalog`.
- `RegisteredModelInfo`, `ModelVersionInfo`, `RegisteredModelAliasInfo`,
  `TableInfo`, `FunctionInfo`, `ConnectionInfo`, `VolumeInfo`.

Same problem with other vague suffixes (type-side only):
- `*Spec` / `*Details` / `*Config` / `*Status` / `*Data` / `*Metadata` used inconsistently — sometimes for the entity, sometimes for a sub-property, sometimes for both. `apps.ApplicationStatus` and `App.appStatus` (the type-name divergence is flagged; the field name is out of scope).

**Generator fix:** Strip the `Info` suffix when the type is the canonical
domain entity. (Heuristic: if `<Foo>Info` is the only `<Foo>*` type that
isn't a request/response, drop `Info`.) Same for redundant `Options`/`Spec`
suffixes on tagged-union arms when the parent has a discriminator. Field
renames are out of scope per user direction (would deviate the SDK from
the underlying API).

### Theme 2. Inconsistent acronym casing across the SDK — resolved (not a current finding)

Acronym casing on the public interface follows the Google TypeScript Style
Guide `Pascal-then-lower` form (`Url`, `Id`, `Json`, `Sql`), documented at
`.agent/rules/typescript.mdc`. `OAuth*`/`OIDC*` plus JS built-ins
(`URLSearchParams`, `JSON.parse`, `encodeURIComponent`) are kept under the
platform-name exception. This is resolved and is no longer flagged as a
per-package finding; the casing inventory in §4 below is retained for
reference.

### Theme 3. Brand drift / rebrand leakage — ~6/77 packages

Several products were rebranded but the TS surface still carries the old
codename:

- `warehouses` — every TS type is `Endpoint*` (legacy "SQL Endpoints" name) despite the package being named for the modern "SQL Warehouses" product.
- `pipelines` — uses `Update` as the noun for "pipeline run" (DLT-era terminology); the product is now "Lakeflow Declarative Pipelines".
- `lakeview` — the package name is the old codename; the product is "AI/BI Dashboards".
- `repos` — package name is legacy; the product is "Git folders". The type `RepoInfo` should be `GitFolder`.
- `experiments` — MLflow experiments; cross-package overlap with `forecasting` ML APIs.
- `genie` — codename for "AI/BI Genie" / "Genie Spaces".

**Generator fix:** Per-product spec needs updates; the rename can land via a
generator alias map (`Endpoint` → `Warehouse` in `warehouses` only, etc.).

### Theme 4. Proto-architectural-leak infixes — ~8/77 packages

Internal proto / service-tier identifiers leak through the codegen and show
up as mid-position infix tokens that have no meaning to a TS SDK consumer.
The `*Public*Request` sub-pattern has been renamed and is no longer a
concern; JSDoc-banner sub-cases and SDK-internal `utils.ts` plumbing are out
of scope. What remains is the type-name surface only:

- **`*CustomerFacing*` qualifier survives in `networking`** — 40+
  identifiers (`CustomerFacingIngressNetworkPolicy`,
  `CustomerFacingVpcEndpointUseCase`, etc.) in active source. Not yet
  scanned as findings.
- **`*Proto` suffix** active in a handful of identifiers:
  `TriggerStateProto` (`jobs`), `DatabricksServiceExceptionProto`,
  `DatabricksServiceExceptionWithDetailsProto` (`apps`).
- **`*Service*` mid-position infix.** `ServiceErrorCode` / `ServiceError`
  in `statementexecution`.
- **`*Handler` suffix.** `listCleanRoomNotebookTaskRunsHandler` /
  `listCleanRoomNotebookTaskRunsHandlerIter` in `cleanrooms/client.ts`.
- **`*V2*` mid-position.** `RunLifecycleStateV2` (jobs).

**Generator fix:** Strip proto-architectural-tier markers from the public
TS surface emit. The set is small and closed: `Public`, `Internal`,
`Proto`, `Service` (when mid-position and not the domain word), `Backend`,
`Manager`, `Handler`, `Impl`, `Rpc`, `Grpc`, `Wrapper`, `CustomerFacing`,
mid-position `V<N>`. Carried as a single generator-only rule in §8.2 below.

---

## 2. Cross-package duplication & overlap

The audits surfaced ~20 pairs/triplets/quartets of packages that overlap
on a single underlying concept. Each row is a real user-facing pain point:
"I want to do X — which of these N packages do I import?"

### 2.1 Settings

Account- and workspace-scoped settings live under a single unified v2
surface:

| Package | Style | What it really is |
|---|---|---|
| `settings` (v2) | Generic polymorphic value | Account- and workspace-scoped settings under the unified v2 surface |

`settings/v2/model.ts` carries the cross-package duplicates
(`BooleanMessage`, `StringMessage`, `RestrictWorkspaceAdminsMessage`,
`PersonalComputeMessage`) collapsed into a single surface, but the
type-naming friction remains.

### 2.2 Secrets (2-way overlap)

The secrets surface is:

| Package | What it really is |
|---|---|
| `secrets` | Workspace-level Secret Manager (scopes + key/value) |
| `secretsuc` | Unity Catalog three-level-namespaced secrets |

Both packages export a class literally named `Client` and a type literally
named `Secret`.

### 2.3 Credentials (3-way overlap)

| Package | What it really is |
|---|---|
| `@databricks/sdk-auth/credentials/` | SDK *user-auth* credentials (PAT, U2M, M2M) |
| `credentials` | Unity Catalog cloud-storage credentials (AWS IAM, Azure SP, GCP SA) |
| `gitcredentials` | Per-workspace Git provider credentials (GitHub/GitLab PATs) |

The bare type name `Credential` exists in two of these and `Credentials`
exists in the third.

### 2.4 Identity / IAM (consolidated)

`accessmanagement` is the consolidated umbrella for object permissions,
permission levels, rule sets, and workspace assignments in a single import
path.

### 2.5 Tokens

| Package | What it really is |
|---|---|
| `tokens` | User-self PAT management |
| `tokenmanagement` | Admin-of-others PAT management |

Both export `Client`, both export request types named identically. They
duplicate the entire `AutoscopeState` enum verbatim.

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

### 2.8 Model Registry

| Package | What it really is |
|---|---|
| `modelregistry` | Workspace-level MLflow registry (legacy) |
| `registeredmodels` | Unity Catalog model registry (modern) |

The legacy package has the canonical-sounding name; the UC replacement is
hidden behind a plural noun.

### 2.10 Cluster compute (overlapping warehouses)

- `warehouses` exposes SQL Warehouses (formerly "SQL Endpoints"); the
  TS types still spell `Endpoint*` (e.g. `EndpointInfo`, `EndpointState`).
- `vectorsearch` exposes Vector Search endpoints with type names like
  `Endpoint`, `EndpointType`, `EndpointStatus`.

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

The materialized-features surface is folded into `features`
(`MaterializedFeature` types live there).

### 2.13 Budget policy

| Package | What it really is |
|---|---|
| `budgetpolicy` | `/api/2.0/accounts/{accountId}/budget-policies` |

The `budgetpolicy` package stands alone.

### 2.14 Workspace

The remaining audited package in this space is:

| Package | What it really is |
|---|---|
| `workspacebindings` | Securable-to-workspace bindings |

The workspace filesystem surface (notebooks/folders/files) is not part of
the public-filtered SDK.

### 2.15 Schemas (UC overlap)

| Package | What it really is |
|---|---|
| `schemas` | User-defined UC schemas (full CRUD) |
| `systemschemas` | Server-managed UC system schemas (enable/disable) |

### 2.16 OAuth (consolidated)

A single `oauth` package covers both Custom and Published app integrations
as well as the published-app catalog.

### 2.17 Statement / Query / Command execution

The execution surfaces are:

| Package | What it really is |
|---|---|
| `statementexecution` | Ad-hoc SQL on a SQL Warehouse |
| `commandexecution` | Python/SQL/Scala/R via Clusters REPL |
| `queries` | Saved-query CRUD |
| `queryhistory` | Read-only query history list |

Four packages, three near-synonyms in the names (query/statement/command),
disjoint scopes that the names do not telegraph.

### 2.18 Account API cluster (consolidated)

The account-tier surface is the consolidated set:

| Package | Account-tier surface |
|---|---|
| `workspaces` | Create/update/delete an account-managed workspace |
| `networking` | NCC, networks, private access settings, VPC endpoints, network policies |
| `storageconfigurations` | Account-level cloud storage configs (S3 root buckets) |
| `keyconfigurations` | Account-level customer-managed key configurations |
| `credentials` (account half) | `AccountsCreate*` family (the `*Public*` suffix has been removed) |
| `metastores` (account half) | `AccountsCreate*` family (the `*Public*` suffix has been removed) |
| `authentication` | Account-level token federation policies |
| `scim` | Account-level SCIM 2.0 user/group provisioning |
| `sharing` | Account-level Delta Sharing provider config |
| `accessmanagement` | Object permissions, permission levels, rule sets, workspace assignments (consolidated) |
| `logdelivery` | Account-level log delivery configs |

Residual `*CustomerFacing*` qualifiers in `networking` are not yet flagged
but match generator rule §8.2.

### 2.19 Other notable overlaps

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
| `conf` | Configuration | `EndpointConfPair` (type) | One four-letter abbreviation that the rest of the SDK consistently spells out. |
| `dbu` | Databricks Unit | Cluster docs only | Not in type names. |
| `dbr` | Databricks Runtime | `TerminationCode.DBR_IMAGE_RESOLUTION_FAILURE`, `K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` | Acronym not expanded. |
| `dbfs` | Databricks File System | `DbfsStorageInfo`, `disableLegacyDbfs` | Casing varies (`Dbfs` vs `DBFS` in JSDoc). |
| `dlt` | Delta Live Tables | Comment references | The product was renamed to "Lakeflow Declarative Pipelines"; the type `Update` still reflects the DLT-era name. |
| `csp` | Compliance Security Profile | `CspEnablementAccountSetting`, `Csp*` family | `Csp` casing is uniform; the acronym is not expanded. |
| `esm` | Enhanced Security Monitoring | `EsmEnablementAccountSetting`, `Esm*` family | Same as CSP. |
| `dcp` | (settings v1 internal acronym) | `DcpAccountEnableMessage` | Flagged as cryptic. |
| `llm` | Large Language Model | `CustomLlm`, `LlmProxyPartnerPoweredAccount`, `Llm*` family | `Llm` casing is uniform across SDK. |
| `sdp` | Serverless Declarative Pipelines | Comments | Internal acronym. |
| `ldp` | Lakeflow Declarative Pipelines | Comments | Internal acronym. |
| `dab` | Databricks Asset Bundles | Not a current package | Conventional Databricks acronym. |
| `m2m` | Machine-to-Machine | `auth/credentials/m2m.ts` | OAuth grant type. |
| `u2m` | User-to-Machine | `auth/credentials/u2m.ts` | OAuth grant type. |
| `pat` | Personal Access Token | `auth/credentials/pat.ts`, `tokens` package | OAuth-adjacent. |
| `abac` | Attribute-Based Access Control | Package name `abacpolicies` only | Never appears in code or types. |
| `iam` | Identity and Access Management | Appears in JSDoc/identifiers | Conventional. |
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

## 4. Acronym-casing inventory — resolved (reference only)

Acronym casing on the public interface is resolved and is no longer an
active set of findings. The table below is retained as a reference
inventory of the acronyms that appear across the SDK and the casings each
takes.

| Acronym | Found casings | Sample sites |
|---|---|---|
| **URL** | `Url`, `URL`, `url` | `webhookUrl` (field), `URL` (enum value in `rfa.DestinationType`), `URLSearchParams` (import). Note: `URL` collides with the JS built-in. |
| **ID** | `Id`, `ID`, `id` | `userId`, `runId`, `policyId` (field side) vs `ID` (enum value) vs raw `id` (bare field). |
| **URI** | `Uri`, `URI` | `endpointUri` vs JSDoc "URI". |
| **SQL** | `Sql`, `SQL` | `SqlWarehouseSpec` (type), `DATABRICKS_SQL_ACCESS` (enum). |
| **JSON** | `Json`, `JSON` | `JsonValue`, `JsonObject` (wkt types) vs `JSON.stringify` (built-in). |
| **OAuth** | `Oauth`, `OAuth` | Package `oauth` (lowercased), type `OAuthAppIntegration` (PascalCase). |
| **PyPI** | `Pypi`, `PyPI` | `PypiLibrary` (type), JSDoc spells `PyPI`. |
| **AWS** | `Aws`, `AWS` | `AwsAttributes` (type), `AWS_SSE_S3` (enum). |
| **GCP** | `Gcp`, `GCP` | `GcpAvailability` (type), `GCP_QUOTA_EXCEEDED` (enum). |
| **Azure** | `Azure` | Consistent. |
| **LLM** | `Llm`, `LLM` | `CustomLlm` (type, field), JSDoc says `LLM`. |
| **HTTP** | `Http`, `HTTP` | `HttpClient` (type) vs JSDoc and headers. Hand-written packages use Pascal-then-lower (`httpStatusCode`, `httpHeader`, `httpBody`). |
| **HTTPS** | `Https` | Consistent. |
| **DBFS** | `Dbfs`, `DBFS` | `DbfsStorageInfo` vs `disableLegacyDbfs` vs JSDoc "DBFS". |
| **DBR** | `Dbr`, `DBR` | Enum members all-caps. |
| **PII** | `Pii`, `PII` | `Pii` casing in types; JSDoc varies. |
| **CSP** | `Csp`, `CSP` | Type `Csp*`, JSDoc "CSP". |
| **ESM** | `Esm`, `ESM` | Type `Esm*`, JSDoc "ESM". |
| **IdP** | `Idp`, `IdP` | `idp*` fields, JSDoc "IdP". |
| **ETag** | `etag`, `eTag`, `ETag` | Three casings within one JSDoc comment block in `accessmanagement`. |
| **ODBC** | `Odbc` | `OdbcParams`. |
| **JDBC** | `Jdbc`, `JDBC` | Doc references only. |
| **AI/BI** | `Aibi`, `AI/BI` | `AibiDashboard*` types, JSDoc says "AI/BI". |
| **SSE** | `Sse`, `SSE` | `SseEncryptionAlgorithm` (type), `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED` (enum). |
| **TLS** | `Tls`, `TLS` | Rare; `Tls` in field names. |
| **OAuth2** | varied | `oauth2` (path), `OAuth` (types). |

**Policy.** The rule is the Google TypeScript Style Guide
`Pascal-then-lower` form (`Url`, `Id`, `Json`, `Sql`), documented at
`.agent/rules/typescript.mdc`. Wire format unchanged.

---

## 5. Top highest-impact findings

The entries are structural type-level issues — type names, reserved-word
collisions, brand drift, cross-package duplicate concepts, and
proto-architectural leaks. Each entry: file + symbol + the generator
pattern it exemplifies.

| # | Package | File:Line | Symbol / Issue | Pattern |
|---|---|---|---|---|
| 1 | `jobs` | `model.ts:3399, 3491, 3852, 3866, 4261, 908, 3875` | `Run` overloaded across 7 shapes (`Run`, `BaseRun`, `RunTask`, `Run_JobLevelParameters`, `RunState`, `RunStatus`, `RunTriggerInfo`). | Vague/duplicate concepts |
| 2 | `jobs` | `model.ts:150, 280, 1464, 1835` | `Format`, `Source`, `Compute`, `Environment` — top-level types collide with JS/TS built-ins and DOM globals. | Reserved-word collision |
| 3 | `jobs` | `model.ts` | `TriggerStateProto` — `Proto` suffix is a wire-format architectural leak. | Proto-architectural leak (`Proto` suffix) |
| 4 | `warehouses` | `model.ts:passim` | Every `Endpoint*` type leaks the legacy "SQL Endpoints" brand into the modern "SQL Warehouses" surface. | Brand drift / rebrand leakage |
| 5 | `pipelines` | `model.ts:283, 1091, 1689, 2738, 2879` | `Update` is the noun "pipeline run" — collides with HTTP `update()` verb across 9 types/methods. | Rebrand leakage (DLT → Lakeflow) |
| 6 | `abacpolicies` | `model.ts:137` | `PolicyInfo` — `Info` suffix on the canonical entity. | `Info` suffix |
| 7 | `tables` | `model.ts:849` | `TableSummary` vs `TableInfo` — two near-identical shapes. | Duplicate concept |
| 8 | `apps` | `model.ts:693, 1054` | `ApplicationStatus` on `App` — two vocabularies for one product. | Vocabulary drift |
| 9 | `apps` | `model.ts:606, 962` | `AppResourceApp.AppPermission` — `App` token thrice on the type path. | Redundant prefix |
| 10 | `apps` | `model.ts` | `DatabricksServiceExceptionProto`, `DatabricksServiceExceptionWithDetailsProto` — `Proto` suffix. | Proto-architectural leak (`Proto` suffix) |
| 11 | `genie` | `client.ts:131, 1019, 1038` | 28 of 30 methods prefixed `genie*`, 2 not; one `Trash*` instead of `Delete*`. | Inconsistent action verbs |
| 12 | `commandexecution` | model.ts vs client.ts | `CreateResponse` reused for both `create()` (context id) and `execute()` (command queued). | Type repurposing |
| 13 | `commandexecution` | `client.ts:256` | `client.destroy()` — verb collision; Go SDK uses `delete`. | Verb inconsistency |
| 14 | `commandexecution` | `client.ts:333, 417, 498` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` — too short to convey what they wait for. | Waiter-class genericity |
| 15 | `secrets` | `client.ts:passim` | `Put` for ACLs/secrets, `Create` for scopes, `Delete` for both — inconsistent mutation verbs. | Inconsistent action verbs |
| 16 | `dataquality` | model.ts | `ListMonitorRequest` singular for a list-of-monitors request. | Singular/plural mismatch |
| 17 | `modelserving` | `model.ts:passim` | Package says "model serving"; types say `InferenceEndpoint*`; URL says `serving-endpoints`. | Three names for one noun |
| 18 | `modelserving` | `model.ts:960` | `ServedModel` actually holds non-model entities (`servedEntities: ServedModel[]`). | Type-name contradicts content |
| 19 | `accessmanagement` | model.ts | Type-name overlap with `grants`. | Cross-package fragmentation |
| 20 | `tokens` | `model.ts:13-21` | `AutoscopeState` duplicated verbatim in `tokenmanagement`. | Cross-package duplicate type |
| 21 | `tokens` + `tokenmanagement` | package | Two packages for one PAT resource, with duplicated request/enum shapes. | Cross-package collisions |
| 22 | `customllms` | every file | `CustomLlm` — generic name with cryptic-acronym body. | Generic naming + cryptic abbreviation |
| 23 | `supervisoragents` | `model.ts:219` | `SupervisorAgent` — two extremely generic nouns combined. | Generic naming |
| 24 | `supervisoragents` | `model.ts:251` | `Tool` — bare generic for discriminated union over 14 resource kinds. | Stringly-typed sum |
| 25 | `cleanrooms` | `client.ts:662, 704` | `listCleanRoomNotebookTaskRunsHandler` / `listCleanRoomNotebookTaskRunsHandlerIter` — `Handler` suffix proto-leak. | Proto-architectural leak (`Handler` suffix) |
| 26 | `database` + `postgres` | model.ts | Two packages, one product (Lakebase managed Postgres); `SyncedTable`/`DatabaseInstance` duplicated across both. | Duplicate package |
| 27 | `experiments` | `model.ts:219, 712` | `Run`, `Experiment`, `Metric`, `Param`, `LoggedModel` — single-word top-level types. | Generic naming |
| 28 | `repos` | `model.ts:111` | `RepoInfo` — `Info` suffix on the canonical entity; product re-branded to "Git folders". | `Info` suffix + brand drift |
| 29 | `repos` | package + types | "Repos" is legacy; product is "Git folders". | Brand drift |
| 30 | `notificationdestinations` | `model.ts:17, 13` | `Config` top-level interface; `DestinationType` vague enum. | Generic top-level name |
| 31 | `disasterrecovery` | `model.ts:91, 10` | `FailoverFailoverGroupRequest` — token "Failover" twice. | Generator stutter |
| 32 | `marketplaces` | `model.ts:passim` | `Listing` vs `ExchangeListing` vs `ListingSummary` vs `ListingDetail` — four overlapping "listing" shapes. | Duplicate concept |
| 33 | `externalmetadata` | `model.ts:10-32` | `SystemType` enum with 22 values mixing case styles (`POWER_BI`, `STREAM_NATIVE`, `POSTGRESQL`, `MICROSOFT_SQL_SERVER`). | Brand-value casing |
| 34 | `clusters` | `model.ts:175-734` | `TerminationCode` enum with 150+ values mixing case styles. | Brand-value casing |
| 35 | `lakeview` | package | Old codename; product is now "AI/BI Dashboards". | Brand drift |
| 36 | `instancepools` | `model.ts:passim` | Structural duplication of `Create*`/`Edit*`/`*AndStats`. | Duplicate concept |
| 37 | `externallineage` | `model.ts:passim` | `Direction_LineageDirection` stutter. | Generator stutter |
| 38 | `settings` | `model.ts:passim` | The v2 surface carries acronym soup (`Csp*`, `Esm*`, `Llm*`, `Dcp*`) and `BooleanMessage`/`StringMessage` wrappers. | Generic + cryptic |
| 39 | `statementexecution` | `model.ts:passim` | `ServiceErrorCode` / `ServiceError` — `Service` mid-position is a proto/gRPC architectural-layer noun. | Proto-architectural leak (`Service` infix) |
| 40 | `networking` | `model.ts:passim` | 40+ `CustomerFacing*` identifiers in active source. Not flagged but match generator rule §8.2. | Proto-architectural leak (`CustomerFacing` qualifier) |
| 41 | `marketplaces` | `model.ts:passim` | `Exchange` vs `Listing` vocabulary tension within a single package. | Vocabulary drift |
| 42 | `forecasting` | `client.ts` | Go-style `Waiter.done()` predicate on the waiter returned by the create call. | Go-style waiter pattern |

---

## 6. By-the-numbers (all 77 active packages, sorted by total findings)

Counts reflect each per-package audit's current declared total (or, for
the audits that use category-numbered sections instead of an H/M/L/Obs
table, that file's own consistent finding count). The column sums to
**479** (the 77 per-package totals add up to 479 exactly).

| # | Package | Findings | Top theme |
|---|---|---|---|
| 1 | warehouses | 25 | Legacy `Endpoint*` brand surviving the SQL-Warehouse rebrand |
| 2 | jobs | 22 | Generic enum/interface names (`Run`, `Format`, `Source`, `Compute`); `Run` overload across 7 shapes; `TriggerStateProto` proto-suffix |
| 3 | pipelines | 20 | `Update` noun = pipeline run (DLT → Lakeflow rebrand) |
| 4 | settings | 19 | Unified v2 surface; acronym soup (`Csp`/`Esm`/`Llm`/`Dcp`); `*Message` wrapper sprawl |
| 5 | statementexecution | 17 | `ServiceErrorCode` infix; package name overlaps `commandexecution`/`queries` |
| 6 | genie | 16 | Inconsistent method prefixing (28/30 with `genie*`); `GenieSpace` opaque term |
| 7 | modelregistry | 15 | Workspace vs UC duplicate (`registeredmodels`); MLflow vocabulary |
| 8 | instancepools | 8 | Structural duplication of `Create*`/`Edit*`/`*AndStats` |
| 9 | marketplaces | 13 | `Listing`/`ExchangeListing`/`ListingSummary`/`ListingDetail` overlap |
| 10 | catalogs | 6 | Create-with-read-only-fields; cross-package SecurableType collisions |
| 11 | features | 11 | Sibling-package fragmentation with `featurestore` |
| 12 | accessmanagement | 11 | Permissions/grants/rule-sets fragmentation; covers account access control |
| 13 | experiments | 11 | Single-word top-level types (`Run`, `Metric`, `Experiment`) |
| 14 | queries | 11 | Three-package overlap with `queryhistory`/`statementexecution` |
| 15 | apps | 10 | `App` vs `Application` vocabularies; `AppResourceApp_AppPermission` triple-tautology; `*Proto` suffix |
| 16 | budgets | 9 | Budget vs `budgetpolicy` duplication |
| 17 | database | 9 | Package name overlaps `postgres`; deep proto nesting |
| 18 | forecasting | 8 | `ForecastingExperiment` type-name family; Go-style `done()` waiter semantics |
| 19 | functions | 9 | `function` reserved-word; cryptic single-letter enum variants |
| 20 | modelserving | 9 | `InferenceEndpoint` vs `Endpoint` vs `serving-endpoints` terminology |
| 21 | clusterlibraries | 8 | `Library.lib` field; "Full" suffix without "Partial" counterpart |
| 22 | commandexecution | 7 | Three resources (Command/Context/Cluster) mixed; verb collision (`destroy`/`delete`) |
| 23 | metastores | 8 | Structural duplicate of `MetastoreInfo`; `UpdateMetastoreRequest` four name-like fields |
| 24 | modelservingquery | 5 | `QueryEndpointInput` has 7 mutually-exclusive input fields, no oneof |
| 25 | registeredmodels | 8 | Cross-package overlap with `modelregistry`; `Info`-suffix entities |
| 26 | schemas | 8 | `_OptionsEntry`/`_PropertiesEntry`; cross-package SecurableType collisions; vs `systemschemas` |
| 27 | tables | 6 | `TableInfo` vs `TableSummary`; cross-package `Dependency` family duplication |
| 28 | dataquality | 7 | `ListMonitorRequest` singular for list of monitors |
| 29 | rfa | 7 | 3-letter cryptic package name |
| 30 | alerts | 6 | Mixed v1/v2 |
| 31 | lakeview | 6 | Old codename (rebrand to "AI/BI Dashboards") |
| 32 | logdelivery | 6 | Account-level log delivery configs |
| 33 | repos | 5 | "Repos" legacy term; product is "Git folders" |
| 34 | usagedashboards | 6 | Vague type names |
| 35 | connections | 4 | `UNKNOWN_*` sentinels; `ConnectionType` value casing inconsistencies |
| 36 | disasterrecovery | 5 | `FailoverFailoverGroupRequest` stutter |
| 37 | instanceprofiles | 5 | Bare verb request types; vague identifiers |
| 38 | notificationdestinations | 5 | `Config`/`config` self-reference; `DestinationType` vague enum |
| 39 | postgres | 5 | Quad-nested `SyncedTable_*` shapes; cross-package duplicate of `database` |
| 40 | clusters | 4 | 150-member `TerminationCode` brand-value casing |
| 41 | featurestore | 3 | Cross-package duplicate of `database`/online-store surface |
| 42 | networking | 4 | ~40 active `CustomerFacing*` identifiers not yet flagged |
| 43 | scim | 4 | Account-tier SCIM 2.0 user/group provisioning |
| 44 | secrets | 4 | Mutation-verb inconsistency (`Put`/`Create`/`Delete`) |
| 45 | storageconfigurations | 4 | Sparse account-tier residue |
| 46 | tokenmanagement | 4 | Overlap with `tokens`; duplicate `AutoscopeState` enum |
| 47 | vectorsearch | 3 | `Endpoint*` and `VectorIndex*` overlap |
| 48 | volumes | 4 | Verb-as-noun requests |
| 49 | artifactallowlists | 3 | Vague type names |
| 50 | budgetpolicy | 3 | Account budget-policy CRUD |
| 51 | clusterpolicies | 3 | Verb-as-noun requests; `Family` vocabulary mismatch with `policyfamilies` |
| 52 | credentials | 3 | UC vs auth duplicate; `Accounts*` family |
| 53 | customllms | 3 | `Llm` cryptic-acronym usage throughout |
| 54 | entitytagassignments | 3 | `EntityTagAssignment` vs `TagAssignment` cross-package collision |
| 55 | externalmetadata | 3 | `SystemType` casing; brand-value casing (`POWER_BI`, `STREAM_NATIVE`); `V2` mid-position |
| 56 | gitcredentials | 3 | Three "Credentials" packages with different meanings |
| 57 | globalinitscripts | 3 | Verb-as-noun requests; proto suffix |
| 58 | queryhistory | 3 | Vague `Query` types; cross-package overlap with `queries` |
| 59 | resourcequotas | 2 | Vague type names |
| 60 | secretsuc | 3 | `uc` cryptic suffix; collides with `secrets` |
| 61 | sharing | 3 | Account-tier Delta Sharing provider config |
| 62 | systemschemas | 3 | Sibling-package collision with `schemas` |
| 63 | tokens | 3 | Cross-package duplicate of `tokenmanagement` |
| 64 | workspaces | 3 | Account-managed workspace CRUD |
| 65 | abacpolicies | 2 | `PolicyInfo`; `MatchColumn` verb-as-noun |
| 66 | cleanrooms | 2 | `*Handler` suffix proto-leak; misleading `accessRestricted` enum |
| 67 | environments | 2 | `Environment` generic name |
| 68 | externallineage | 2 | `Direction_LineageDirection`; `tpe` typo |
| 69 | externallocations | 2 | Cross-cloud queue type naming (`AwsSqsQueue`/`AzureQueueStorage`/`GcpPubsub`) |
| 70 | knowledgeassistants | 2 | Generic `KnowledgeAssistant`; bare `Tool`/`Resource` type names |
| 71 | supervisoragents | 2 | Generic `SupervisorAgent`; `Tool` bare type for 14-arm union |
| 72 | tagassignments | 2 | Three-package tag split |
| 73 | tagpolicies | 2 | Three sibling tag packages with overlapping vocab |
| 74 | authentication | 1 | Account-tier token federation policies |
| 75 | files | 1 | `Read`/`Move`/`Put`/`Delete` legacy DBFS verb-as-noun residue |
| 76 | keyconfigurations | 1 | `ListCustomerManagedKeyRequest` singular residue |
| 77 | workspacebindings | 1 | Bare verb requests |
| — | **Total** | **479** | Across all 77 active audits |

**Arithmetic check.** Summing the 77 per-package totals gives exactly
**479**, matching the grand total. (Spot check: the top 11 packages
25 + 22 + 20 + 19 + 17 + 16 + 15 + 8 + 13 + 6 + 11 = 172; the remaining
66 packages sum to 307; 172 + 307 = 479.)

---

## 7. Generator-level recommendations

Several earlier recommendations are no longer active:

- The enum-name-prefix recommendation is withdrawn — TS member names mirror
  the wire identifier intentionally.
- The `Info`/`Spec`/`Details` suffix recommendation is an API-team
  decision, not a generator template change. Field-side instances are out
  of scope; type-side instances are cataloged in Theme 1 above.
- The acronym-casing policy recommendation is resolved; §4 below is
  retained for reference.
- The `Client` rename recommendation is resolved — the generator emits
  package-prefixed client classes (`AccessManagementClient`,
  `FeaturesClient`, `CredentialsClient`, `JobsClient`, `WarehousesClient`,
  …) instead of a bare `Client`.
- The `Request` suffix recommendation is done — every request DTO is
  emitted with a `Request` suffix.
- The strip-package-name-prefix recommendation is withdrawn — the
  package-name prefix is considered intentional.

### 7.1 Surface deprecations as `@deprecated` JSDoc tags (deferred)

Fields whose JSDoc text says "deprecated" in prose but does not carry the
`@deprecated` tag (so IDEs do not strike them through). This is a
doc-only template change and is out of the current naming-audit corpus.
Retained here as a follow-up note rather than an open finding.

---

## 8. Generator-only recommendations

The following recommendations are template-level fixes that the
generator emits identically across every package. Rather than carry the
same finding in 77 per-package audits, each rule is recorded once here.
Each item names the rule, why it is generator-only, and an illustrative
example.

### 8.1 Drop the duplicate `list*Iter()` paginator method

**Rule:** Drop the duplicate `list*Iter()` paginator method. Make
`list*()` return `AsyncIterable<T>` natively and add a `.firstPage()`
escape hatch for callers who need the raw page response. Modeled on
Octokit, Azure SDK, AWS SDK v3.

**Why it's generator-only:** The duplicate-method pattern is emitted by
every generated package; the fix is one template change, not per-package
work.

**Illustrative example:** `listCatalogsIter` in `catalogs/v1/client.ts`
(and parallel methods in `vectorsearch`, `warehouses`, `jobs`, etc.).

### 8.2 Strip proto-architectural-tier markers from the public TS surface

**Rule:** When emitting a public TS identifier on the exported surface,
strip any mid-position or suffix token whose only purpose is to
disambiguate proto/service tiers on the server. The closed set is:
`Public`, `Internal`, `Proto`, `Service` (when mid-position and not the
domain word), `Backend`, `Manager`, `Handler`, `Impl`, `Rpc`, `Grpc`,
`Wrapper`, `CustomerFacing`, and mid-position version markers like
`V2`/`V3`.

JSDoc banner comments are out of scope; SDK-internal identifiers
(`utils.ts` schema helpers, etc.) are out of scope. The rule covers
the public exported surface only.

**Why it's generator-only:** The TS SDK exports exactly one tier
(the public one); these qualifiers exist solely to navigate the
proto definition and have no caller-side meaning. The same template
emits them across every account-tier package, so a single template
fix replaces hundreds of per-package findings.

**Remaining instances on the public surface (~8/77 packages):**

- `CustomerFacing*` qualifier in `networking` (40+ active identifiers
  in `model.ts`, e.g. `CustomerFacingIngressNetworkPolicy`,
  `CustomerFacingVpcEndpointUseCase`). Not yet flagged.
- `*Proto` suffix on a handful of public types:
  `TriggerStateProto` (`jobs`), `DatabricksServiceExceptionProto`
  (`apps`), `DatabricksServiceExceptionWithDetailsProto` (`apps`).
- `*Service*` mid-position infix in `statementexecution`
  (`ServiceErrorCode` / `ServiceError`).
- `*Handler` suffix in `cleanrooms/client.ts` on
  `listCleanRoomNotebookTaskRunsHandler` and its `*Iter` companion.
- Mid-position `V<N>` in `jobs` (`RunLifecycleStateV2`).

**Illustrative example:**
`CreateNetworkConnectivityConfigPublicRequest` →
`CreateNetworkConnectivityConfigRequest`.

---

## Appendix: Categories (from the per-package audits)

The audits use a shared 20-category rubric. Several categories are not
active as cross-cutting themes: Category 2 "Redundant enum prefix",
Category 11 "Empty / trivial wrapper types", Category 4 "Underscores in TS
identifiers", and Category 3 "Acronym casing". A "Proto-architectural
leak" category covers mid-position proto/service-tier infixes.

The rubric is scoped as follows:

- **Category 15 "Generic field names losing meaning"** and **Category 19
  "Underspecified IDs"** are out of scope — both boil down to field
  renames.
- **Category 14 "Go / Java-style names"** field-name instances (`req`,
  `resp`, local var names) are out of scope — they are SDK-internal
  identifiers.
- **Category 16 "Field contradicting type domain"** is reduced —
  field-side instances are out of scope; only type-name-vs-content
  contradictions are flagged (e.g. `ServedModel.servedEntities`).
- JSDoc-only findings (banner comments, "deprecated in prose without
  @deprecated tag") are out of scope across all categories.
- **Category 3 "Acronym casing"** is resolved.
- The **generic top-level `Client` class-name** finding (a Category 1 /
  12 sub-case) is resolved — the generator emits `<Package>Client` names.

The most-cited categories on the type-level surface across all 77 active
audits:

| # | Category | Surviving on type level |
|---|---|---|
| 1 | Vague / generic names (type level) | ~78 |
| 6 | Misleading names (type level) | ~73 |
| 12 | Duplicate concepts (cross-package, type-level) | ~68 |
| 20 | Type-suffix tautology | ~58 |
| 17 | Inconsistent action verbs (method names) | ~48 |
| 7 | Overly verbose type names | ~48 |
| 8 | Redundant suffix (`Info`, `Spec`, `Details`) | ~44 |
| 9 | Singular/plural mismatches (type level) | ~38 |
| 5 | Cryptic abbreviations (in type names) | ~34 |
| 13 | Verb-tense inconsistency | ~24 |
| 18 | Long enum values | ~24 |
| Proto | Proto-architectural leak (`*Proto`/`*Handler`/`*Service*`/`*CustomerFacing*`) | ~8 |
