# Naming Audit: environments

**Path:** `packages/environments/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Inferred domain:** Workspace-level Python "base environment" management for serverless notebooks and jobs. A `WorkspaceBaseEnvironment` points at a YAML dependency manifest (on WSFS or UC Volumes) for either CPU or GPU compute; the workspace also has a singleton `DefaultWorkspaceBaseEnvironment` that names one CPU default and one GPU default. The package exposes CRUD plus a `refresh` action and three long-running-operation helper classes.

**Total weird names flagged:** 34

## Summary
| Severity | Count |
| --- | --- |
| High | 9 |
| Medium | 15 |
| Low | 8 |
| Observation | 2 |

---

## High severity

### 1. Package name `environments` is generic — does not say "base environment", "serverless", or "Python dependencies" — `packages/environments/`
- **Why weird:** The package name `environments` is the most generic word possible. The actual scope is narrow: workspace-level Python *base environments* (YAML dependency manifests) used by serverless notebooks and jobs. A reader scanning the workspace sees `environments` alongside `connections`, `catalogs`, `credentials` etc. and has no idea this is about Python dependency manifests, not deployment environments / staging / prod / runtime environments.
- **Category:** 1 (vague/generic).
- **Suggested name:** `workspacebaseenvironments`, `baseenvironments`, `serverlessenvironments`, or `pythondependencies`. At minimum, add a JSDoc on `index.ts` saying "Workspace base environment (Python dependency manifest) management for serverless compute".
- **Rationale:** "Environment" is overloaded across infrastructure (prod/staging/dev), runtime (Python/Node), workspace, deployment, and platform meanings. The package is the user's first filter and gives them zero signal.

### 2. `Environment` concept fragmented across `environments` and `clusterlibraries` packages — `packages/environments/` vs `packages/clusterlibraries/`
- **Why weird:** Two sibling packages model overlapping pieces of the same domain:
  - `clusterlibraries/v2` exposes `DefaultBaseEnvironment`, `BaseEnvironmentType`, `DefaultBaseEnvironmentCache`, `DefaultBaseEnvironmentCache_Status`, `Environment`, `MaterializedEnvironment`, and full CRUD on `DefaultBaseEnvironment`s.
  - `environments/v1` exposes `WorkspaceBaseEnvironment`, the same `BaseEnvironmentType` enum (redefined, not imported), `WorkspaceBaseEnvironmentCache`, `WorkspaceBaseEnvironmentCache_Status` (same shape as `DefaultBaseEnvironmentCache_Status`), and `DefaultWorkspaceBaseEnvironment`.
- The relationship between `DefaultBaseEnvironment` (cluster-libraries package) and `WorkspaceBaseEnvironment` / `DefaultWorkspaceBaseEnvironment` (this package) is undocumented. They share enum *values* (`BASE_ENVIRONMENT_TYPE_UNSPECIFIED | CPU | GPU`) and status enum members but are textually duplicated rather than reused.
- **Category:** 12 (duplicate concept across packages), 6 (misleading — user can't infer which package owns what).
- **Suggested name:** Either (a) consolidate into a single `baseenvironments` package and have `clusterlibraries` import from it, (b) explicitly cross-reference each shared type in docstrings, or (c) version one of them (`clusterlibraries` `DefaultBaseEnvironment` is presumably v1, `environments` `WorkspaceBaseEnvironment` is v2 — say so).
- **Rationale:** Same shape, redefined in two packages, with subtly different naming (`DefaultBaseEnvironment` vs `WorkspaceBaseEnvironment`). Consumers will hit type-incompatibility errors when passing a value from one package into the other.

### 3. `WorkspaceBaseEnvironment` — name is a 26-character noun phrase with three adjectives stacked — `model.ts:727`
- **Why weird:** The central type's name is the prefix every other identifier in the package inherits, so its length cascades: `CreateWorkspaceBaseEnvironmentRequest`, `RefreshWorkspaceBaseEnvironmentOperation`, `ListWorkspaceBaseEnvironmentsResponse`, etc. Three of the four words (`Workspace`, `Base`, `Environment`) are present in every export. The longest exported identifier is `unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema` at 57 characters (`model.ts:870`).
- **Category:** 7 (overly verbose), 1 (generic — "base" and "environment" together still don't say what the resource *is*: a YAML dependency manifest pointer).
- **Suggested name:** Drop one of the prefixes. The package being named already implies "environment", and the URL is `/api/environments/v1/workspace-base-environments` — at most one of `Workspace` or `Base` is informationally necessary in TS. Options: `BaseEnvironment`, `WorkspaceEnvironment`, or rename the whole package and call the type `BaseEnvironment`.
- **Rationale:** Length compounds: every method, request, response, schema function, and operation class repeats `WorkspaceBaseEnvironment` once or twice. A user typing `client.crea[Tab]` faces a wall of nearly identical 36+ character names.

### 4. `WorkspaceBaseEnvironmentCache_Status` — underscore in TS identifier — `model.ts:527, index.ts:14`
- **Why weird:** The identifier `WorkspaceBaseEnvironmentCache_Status` contains an underscore (it is a flattened proto nested-enum name: `package.WorkspaceBaseEnvironmentCache.Status`). It is exported from `index.ts:14` and requires an `eslint-disable-next-line @typescript-eslint/naming-convention` to compile. TS convention (Google TS style guide §9.2; the project's `typescript.mdc` identifier rule) forbids underscores in type names.
- **Category:** 4 (underscores in TS identifiers), 14 (proto/Go-style names).
- **Suggested name:** `WorkspaceBaseEnvironmentCacheStatus`. Since the enum describes the *materialization* lifecycle, `MaterializationStatus` or `EnvironmentMaterializationStatus` would be even clearer.
- **Rationale:** This is a leaky proto abstraction. The underscore preserves a nesting that doesn't exist in TS.

### 5. `WorkspaceBaseEnvironment.status` typed as `WorkspaceBaseEnvironmentCache_Status` — type domain contradicts field name — `model.ts:746`
- **Why weird:** `WorkspaceBaseEnvironment.status` is typed `WorkspaceBaseEnvironmentCache_Status` — i.e. the *status of a Cache*. But the field documents itself as "The status of the materialized workspace base environment", not the status of a cache. The user reads `env.status` and the type's name implies a different concept (cache) than the doc and the data (materialization state of the environment).
- **Category:** 16 (field type contradicts type domain), 6 (misleading).
- **Suggested name:** Either (a) rename the enum to `MaterializationStatus` (the doc's own words) and drop the `Cache` and underscore (see #4), or (b) rename the field to `cacheStatus` to match the type.
- **Rationale:** Field name and type name should describe the same thing. The mismatch is a tell that the enum was named for an internal proto nesting that the public API doesn't surface.

### 6. `Operation` exported with no namespace prefix — collides on a single-import surface — `model.ts:650, index.ts:27`
- **Why weird:** The type name `Operation` is one of the most generic words in software (matches OS-level, math, audit-log, business, telemetry, async-task… meanings). It is exported alongside two related types (`GetOperationRequest`, `WorkspaceBaseEnvironmentOperationMetadata`) and three classes (`CreateWorkspaceBaseEnvironmentOperation`, etc.). It is also a `google.longrunning.Operation`-shaped envelope (the docstring at model.ts:647 even says so), but the name doesn't say that.
- **Category:** 1 (vague/generic), 15 (generic type name losing meaning).
- **Suggested name:** `LongRunningOperation`, `LROperation`, `AsyncOperation`, or namespace it under the package name (`EnvironmentOperation`). Whichever wins, the request type should match: `GetLongRunningOperationRequest` etc.
- **Rationale:** A consumer importing `{Operation}` into a file that also has Slack `Operation`, audit `Operation`, or domain-specific `Operation` is in for a renaming party. The name signals nothing about being a polling envelope.

### 7. `Operation.result` discriminated union uses `$case: 'error' | 'response'` — naming verbose & inconsistent — `model.ts:675-686`
- **Why weird:** The union's discriminator field is `$case` (the `$` prefix is a wire/codegen artifact, not idiomatic TS — see `clusterlibraries` and `database` audits where the same pattern surfaces). The `'response'` variant's payload field is also called `response`, so consumers write `op.result.response.response` is *not* the access path but `op.result.$case === 'response'` then `op.result.response` is. Conflating the discriminator literal `'response'` with a payload field also named `response` is confusing. Same for `'error'` / `error`.
- **Category:** 6 (misleading — `$case`/`response`/`error` triple-overloading), 17 (inconsistency with idiomatic TS discriminated unions which use `kind` or `type`), 14 (Go/proto codegen artefact).
- **Suggested name:** Use `kind` (or `type`) instead of `$case`, and use distinct names like `kind: 'error' | 'success'` with payload fields `error: DatabricksServiceException` / `value: Record<...>` (or similar). See database audit #14 for an analogous critique.
- **Rationale:** `$` in identifiers in TS implies "internal/synthetic". This is a leak of the ts-proto codegen convention. Consumers writing `op.result?.$case` see synthetic noise.

### 8. `DatabricksServiceExceptionWithDetailsProto` — Proto suffix on a TS type, "Exception" implies an Error class — `model.ts:561, index.ts:19`
- **Why weird:** Three problems in one name:
  1. **`Proto` suffix** on a TypeScript identifier — leaks the proto origin into the type name (`Proto` means nothing to a TS consumer). 
  2. **`Exception`** is Java/Python terminology; TS/JS uses `Error`. The type is a *data* representation of an error (it's a plain interface with `errorCode`/`message`/`stackTrace`), not an actual thrown exception class. Naming a data structure `Exception` suggests it can be thrown.
  3. **Verbose** — 41 characters. The shape is `{ errorCode, message, stackTrace, details }` — i.e. a typical Google-RPC error.
- **Category:** 20 (type-suffix tautology — `Proto`), 14 (Java-style name — `Exception`), 7 (overly verbose), 6 (misleading — looks throwable).
- **Suggested name:** `ServiceErrorDetails`, `DatabricksError`, or `RpcError`. Drop the `WithDetails`, `Proto`, and `Exception` suffix all at once.
- **Rationale:** The name has the worst of every world: Java verb + Proto codegen tag + length. No piece of the name helps a TS consumer.

### 9. `refreshWorkspaceBaseEnvironment` doc comment refers to "Refresh*Workspace*BaseEnvironment**s**" plural and the request type docstring says "to delete" — `model.ts:689, 692`
- **Why weird:** The request type is `RefreshWorkspaceBaseEnvironmentRequest` (singular), but its JSDoc says: "Request message for RefreshWorkspaceBaseEnviro**ments**" (plural). The same type's `name` field doc says: "Required. The resource name of the workspace base environment **to delete**" — i.e. copy-pasted from the delete request and never edited. The `marshalRefreshWorkspaceBaseEnvironmentRequestSchema` (model.ts:885) only emits `name`, confirming the type was forked from the delete request.
- **Category:** 9 (singular/plural mismatch — type vs doc), 6 (misleading doc — says delete).
- **Suggested name:** Fix the docstrings — say "Refresh a workspace base environment. The resource name of the environment to refresh." Either keep the type singular (matches the client method `refreshWorkspaceBaseEnvironment`) or move to plural everywhere.
- **Rationale:** Wrong action verb in a doc that an IDE will display when the user hovers a parameter. The package was generated from a proto where the message-name was singular but the doc-string copied from elsewhere — the SDK is propagating the bug.

---

## Medium severity

### 10. `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED` — redundant enum prefix — `model.ts:10`
- **Why weird:** Enum value `BASE_ENVIRONMENT_TYPE_UNSPECIFIED` embeds the enum name as a prefix. Access reads `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED` — triply redundant. `CPU` and `GPU` follow no such prefix, so the convention is inconsistent within the enum.
- **Category:** 2 (redundant enum prefix), 17 (inconsistency within the same enum), 18 (long enum values).
- **Suggested name:** Drop the prefix: `BaseEnvironmentType.Unspecified | Cpu | Gpu`. Match the wire format on the marshal side.
- **Rationale:** Proto convention; doesn't carry through the port. Note `clusterlibraries/v2/model.ts:7` exports an *identical* `BaseEnvironmentType` enum — same prefix, same inconsistency.

### 11. `WorkspaceBaseEnvironmentProvider.WORKSPACE_BASE_ENVIRONMENT_PROVIDER_UNSPECIFIED` — 49-character enum value — `model.ts:518`
- **Why weird:** The longest enum value in the package: `WorkspaceBaseEnvironmentProvider.WORKSPACE_BASE_ENVIRONMENT_PROVIDER_UNSPECIFIED` is 82 characters total. `ADMIN` and `DATABRICKS` follow no such prefix — inconsistent within the same enum (cf. finding #10).
- **Category:** 2 (redundant enum prefix), 17 (inconsistency), 18 (long enum values).
- **Suggested name:** `Unspecified | Admin | Databricks`.
- **Rationale:** Same as #10.

### 12. `WorkspaceBaseEnvironmentCache_Status.STATUS_UNSPECIFIED` — redundant prefix on UNSPECIFIED only — `model.ts:528`
- **Why weird:** The enum's `STATUS_UNSPECIFIED` member is prefixed but the others (`PENDING`, `CREATED`, `FAILED`, `EXPIRED`, `INVALID`, `REFRESHING`) are not — inconsistent.
- **Category:** 2 (redundant prefix), 17 (inconsistency within the same enum).
- **Suggested name:** `Unspecified | Pending | Created | Failed | Expired | Invalid | Refreshing`.
- **Rationale:** Same as #10–11.

### 13. `ErrorCode` enum exports ~100 values and is mostly deprecated — `model.ts:16-514, index.ts:12`
- **Why weird:** The `ErrorCode` enum has roughly 100 members. The doc comments mark a large fraction as deprecated ("kept to maintain backwards compatibility"). Many members are domain-specific (e.g. `IPYNB_FILE_IN_REPO`, `GIT_URL_NOT_ON_ALLOW_LIST`, `MAX_NOTEBOOK_SIZE_EXCEEDED`, `DAC_ALREADY_EXISTS`) and have nothing to do with environments. The enum is a kitchen-sink import of every Databricks-platform error code, exported from a *workspace-base-environment* package.
- **Category:** 1 (overly broad — exposed in the wrong scope), 7 (overly verbose surface), 12 (duplicate concept — `ErrorCode` likely lives in many packages).
- **Suggested name:** Move to a shared `@databricks/sdk-databricks/apierror` (where `apierr/codes/` already lives, per AGENTS.md) and import it. The environments package should export at most the subset of codes it actually returns.
- **Rationale:** Each package re-declaring all 100 error codes makes them non-comparable across imports and bloats the bundle. The package's `client.ts` imports `APIError` from `@databricks/sdk-core/apierror` (utils.ts:5) — there is already a canonical location.

### 14. `ErrorCode` values are SCREAMING_SNAKE strings, e.g. `'PROVIDER_SHARE_NOT_ACCESSIBLE'` — `model.ts:513`
- **Why weird:** Enum values are SCREAMING_SNAKE wire strings (e.g. `MAX_CHILD_NODE_SIZE_EXCEEDED`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`). 100+ values × ~30 chars each = a large surface that consumers must spell exactly. TS pattern is `PascalCase` enum members.
- **Category:** 14 (Java/Go-style names), 18 (long enum values).
- **Suggested name:** `MaxChildNodeSizeExceeded`, `StorageCredentialAlreadyExists`, etc.
- **Rationale:** TS conventions favour `PascalCase`. Wire format can keep SCREAMING_SNAKE via marshal/unmarshal.

### 15. `DefaultWorkspaceBaseEnvironment.cpuWorkspaceBaseEnvironment` / `gpuWorkspaceBaseEnvironment` — fields stutter the type name — `model.ts:583, 588`
- **Why weird:** Field names contain the wrapping type's name three times. Read aloud: "the cpu workspace base environment field on the default workspace base environment". The values are just resource-name *strings* pointing at another `WorkspaceBaseEnvironment` ("Format: workspace-base-environments/{workspace_base_environment}"). Field names `cpu` and `gpu` plus a typed `WorkspaceBaseEnvironmentRef` would be cleaner.
- **Category:** 7 (overly verbose), 15 (generic field names — the value is just a resource name).
- **Suggested name:** `cpu` / `gpu` (with field type `string` or `WorkspaceBaseEnvironmentName`), or `cpuEnvironmentName` / `gpuEnvironmentName`.
- **Rationale:** The type is *already* `DefaultWorkspaceBaseEnvironment`. Repeating the prefix on every field makes consumers type `defEnv.cpuWorkspaceBaseEnvironment` instead of `defEnv.cpu`.

### 16. `WorkspaceBaseEnvironment.baseEnvironmentType` / `baseEnvironmentProvider` — field prefixes duplicate parent type name — `model.ts:752, 754`
- **Why weird:** On a type called `WorkspaceBaseEnvironment`, the fields are `baseEnvironmentType` and `baseEnvironmentProvider`. The `baseEnvironment` prefix duplicates the parent. Plain `type` and `provider` would suffice.
- **Category:** 8 (redundant suffix/prefix), 7 (verbose).
- **Suggested name:** `type` (or `computeType`) and `provider`. Watch `type` — it is a reserved-like word in TS though not technically reserved.
- **Rationale:** Same logic as #15.

### 17. `WorkspaceBaseEnvironment.filepath` — single-word run-together identifier — `model.ts:736`
- **Why weird:** `filepath` is run-together (one word in camelCase). TS/JS convention is `filePath`. The Go SDK and proto wire format both use `filepath` as one token, but in TS the camelCase rule should split it.
- **Category:** 3 (casing inconsistency), 14 (Go-style name).
- **Suggested name:** `filePath`.
- **Rationale:** Every other compound field in the type (`displayName`, `creatorUserId`, `createTime`, `lastUpdatedUserId`, `updateTime`, `isDefault`, `baseEnvironmentType`, `baseEnvironmentProvider`) uses camelCase. `filepath` is the only exception.

### 18. `WorkspaceBaseEnvironment.message` — generic field name — `model.ts:748`
- **Why weird:** `message` is generic and could mean log message, error message, info text, user-facing description, etc. Doc says "Status message providing additional details about the environment status." `statusMessage` would be more precise.
- **Category:** 1 (vague), 15 (generic field name losing meaning).
- **Suggested name:** `statusMessage` or `statusDetails`.
- **Rationale:** Same as `DefaultBaseEnvironment.message` in clusterlibraries audit (§1.2).

### 19. `WorkspaceBaseEnvironment.name` — generic field name, holds a resource path — `model.ts:732`
- **Why weird:** `name` is *not* a human-readable name in this API (there is a separate `displayName` for that, model.ts:734). The doc says: "The resource name of the workspace base environment. Format: workspace-base-environments/{workspace-base-environment}" — i.e. `name` is a slash-delimited *resource path*. Calling a path a `name` is a Google-AIP convention that confuses non-AIP-aware readers.
- **Category:** 6 (misleading — value is a path, not a name), 15 (generic field name), 19 (underspecified ID).
- **Suggested name:** `resourceName`, `path`, or `id`. Or document it with `(format: workspace-base-environments/...)` in the field name itself.
- **Rationale:** This pattern recurs across the package (every request type's `name` field is actually a path: `GetWorkspaceBaseEnvironmentRequest.name`, `DeleteWorkspaceBaseEnvironmentRequest.name`, `RefreshWorkspaceBaseEnvironmentRequest.name`, `GetDefaultWorkspaceBaseEnvironmentRequest.name`, `Operation.name`, `GetOperationRequest.name`). Eight different `.name` fields, each a path.

### 20. `WorkspaceBaseEnvironment.creatorUserId` / `lastUpdatedUserId` — verb tense inconsistency — `model.ts:738, 742`
- **Why weird:** `creatorUserId` (noun: "the creator's id") vs `lastUpdatedUserId` (past-participle of verb-phrase: "the last-updated user's id"). The pair should agree. Symmetric pairs would be `creatorUserId`/`updaterUserId`, or `createdByUserId`/`lastUpdatedByUserId`.
- **Category:** 13 (verb-tense inconsistency), 17 (inconsistent action verbs).
- **Suggested name:** Pick one form for both: `createdByUserId` / `updatedByUserId`, or `creatorUserId` / `updaterUserId`.
- **Rationale:** Internal consistency. As written, the noun↔verb mismatch reads oddly when sorted in IDE auto-complete.

### 21. `CreateWorkspaceBaseEnvironmentRequest.workspaceBaseEnvironmentId` — 27-character optional string field — `model.ts:552`
- **Why weird:** Field name `workspaceBaseEnvironmentId` is the type name + `Id` suffix. On a `CreateWorkspaceBaseEnvironment*Request*` it is redundant — every field on a create request already pertains to a workspace base environment. Compare `requestId` (model.ts:557) on the same type, which is correctly scoped (`request`+`Id`, not `createWorkspaceBaseEnvironmentRequestRequestId`).
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `environmentId`, `id`, or `resourceId`.
- **Rationale:** Consumers writing `{workspaceBaseEnvironment: env, workspaceBaseEnvironmentId: 'foo'}` is awkward; `{environment: env, environmentId: 'foo'}` reads better.

### 22. `listWorkspaceBaseEnvironments` and `listWorkspaceBaseEnvironmentsIter` — two list methods, only one paginates — `client.ts:248, 284`
- **Why weird:** `listWorkspaceBaseEnvironments` returns a single page (`ListWorkspaceBaseEnvironmentsResponse` with `nextPageToken`); `listWorkspaceBaseEnvironmentsIter` is an async generator that traverses all pages. The `Iter` suffix is a Go-style hint (Go's `iter.Seq`); in TS the idiomatic distinction is between "returns a Response" vs "returns an AsyncIterable", typically named `listX` (auto-paginating) vs `listXPage` (single page).
- **Category:** 14 (Go-style suffix `Iter`), 17 (inconsistent — `Iter` not used anywhere else and not idiomatic in TS).
- **Suggested name:** `listWorkspaceBaseEnvironmentsPage` (single page) and `listWorkspaceBaseEnvironments` (auto-paginating async iterable). Flip the default to the paginated one.
- **Rationale:** Consumers should fall into the pit of success: by default they want all pages.

### 23. `UpdateWorkspaceBaseEnvironmentRequest.name` is undocumented — `model.ts:715`
- **Why weird:** Most `*Request` types document their `name` field as "The resource name of the workspace base environment to ..." but `UpdateWorkspaceBaseEnvironmentRequest.name` (model.ts:715) is the only one with no JSDoc. The very next field (`workspaceBaseEnvironment`, line 720) is documented and even references `name`: "The name field is used to identify the environment to update."
- **Category:** 19 (underspecified ID), 6 (misleading by omission).
- **Suggested name:** Add JSDoc. The field is the resource name to update; say so. Or drop the field entirely if it duplicates `workspaceBaseEnvironment.name`.
- **Rationale:** Inconsistent doc coverage in a generated file is a tell that the source proto field has no comment — should be fixed upstream.

### 24. `unmarshal*Schema` / `marshal*Schema` function names use a Go-style verb pair — `model.ts:768, 873`
- **Why weird:** The package uses `unmarshal*Schema` (from wire) and `marshal*Schema` (to wire). The verbs `marshal`/`unmarshal` are Go/Java terminology. JS/TS overwhelmingly uses `parse`/`stringify`, `serialize`/`deserialize`, `encode`/`decode`, or `fromJson`/`toJson`. The names also have a trailing `Schema` suffix that is misleading: `unmarshalXSchema` is in fact a `z.ZodType<X>` *schema*, not a function — its name should reflect that it can be used like `XSchema.parse(...)`. But `marshalXSchema` is *also* a Zod schema with a `.transform` that turns TS→wire — also misleading because consumers might expect `marshalXSchema.parse(x)` to return wire JSON, not a parsed object.
- **Category:** 14 (Go-style names — marshal/unmarshal), 6 (misleading — these are schemas, but they have a `Schema` suffix already; the `marshal`/`unmarshal` prefix tells the user a direction but consumers may not know which).
- **Suggested name:** `xWireSchema` (for wire-format), `xModelSchema` (for TS-format), or split: `decodeX` / `encodeX` as standalone functions wrapping the schemas.
- **Rationale:** A TS consumer doesn't think in `marshal`/`unmarshal`; they think in `parse`/`format`/`fromJSON`/`toJSON`.

---

## Low severity

### 25. `WorkspaceBaseEnvironmentProvider` — name says "Provider" but values are "ADMIN" / "DATABRICKS" — `model.ts:517`
- **Why weird:** The enum's name describes a *role* dimension ("who provides this"), but the values are not consistent in part-of-speech: `ADMIN` is a noun-role-type, `DATABRICKS` is an organization name. The docstring at model.ts:516 says "Identifies *who* provides and manages a WorkspaceBaseEnvironment" — and the docstring for `ADMIN` says "Created and managed by workspace admins". So `Provider` is really `Owner` or `ProvidedBy`. Mixing `ADMIN` (a role) with `DATABRICKS` (a company) is the same kind of category-mixing as `User` / `System`.
- **Category:** 17 (inconsistency within the enum), 6 (slight misnomer).
- **Suggested name:** `WorkspaceBaseEnvironmentOwner` or `BaseEnvironmentProvidedBy`. Values: `Admin | DatabricksManaged`.
- **Rationale:** Minor. The intent is clear from context.

### 26. `WorkspaceBaseEnvironment.isDefault` — boolean field on the resource, but `DefaultWorkspaceBaseEnvironment` is a separate type — `model.ts:750`
- **Why weird:** A `WorkspaceBaseEnvironment` has an `isDefault` boolean (model.ts:750). The same package also has a separate `DefaultWorkspaceBaseEnvironment` type (model.ts:573) that represents the workspace's default. Two encodings of the same fact: a boolean on each environment, and a separate "default" type listing CPU/GPU defaults. A consumer can't tell from the type whether `isDefault` is computed from `DefaultWorkspaceBaseEnvironment` or vice versa.
- **Category:** 12 (duplicate concept), 6 (misleading — which one is the source of truth?).
- **Suggested name:** Document the relationship explicitly; or drop one. If `isDefault` is server-computed, it could be a `default: 'cpu' | 'gpu' | null` enum so a reader can tell which kind of default at a glance.
- **Rationale:** Two representations of "is this the default" invite drift.

### 27. `ListWorkspaceBaseEnvironmentsRequest.pageSize` doc says "Default is 1000" with no min/max — `model.ts:628`
- **Why weird:** Page-size doc says only "Default is 1000". No documented min/max, no behavior on `0`, no behavior on values exceeding server cap.
- **Category:** 19 (underspecified).
- **Suggested name:** Add doc bounds.
- **Rationale:** Doc-only nit; not a name issue per se but worth flagging in a naming audit because `pageSize` is a known naming convention with known semantics that this doc partially undermines.

### 28. `ListWorkspaceBaseEnvironmentsResponse.workspaceBaseEnvironments` — long plural field — `model.ts:638`
- **Why weird:** Field name is 27 characters; type is a list of 27-character-typed items. Reading `resp.workspaceBaseEnvironments?.[0]?.workspaceBaseEnvironment...` is a chore. (No sub-field of this exact name; included to illustrate the chain length.)
- **Category:** 7 (overly verbose), 8 (redundant suffix — same as the type name pluralised).
- **Suggested name:** `environments` (the response type is already `ListWorkspaceBaseEnvironmentsResponse`, so the plural field doesn't need to re-state the qualifier). Wire stays `workspace_base_environments`.
- **Rationale:** Matches the `clusterlibraries`/`database` audit critique that list responses don't need to repeat their qualifier.

### 29. `requestId` doc says "A random UUID is recommended" but field is `string`, not UUID — `model.ts:555`
- **Why weird:** Doc strongly suggests UUID, but the type is `string`. If UUID is required for idempotency to work, that's a constraint the type doesn't capture.
- **Category:** 19 (underspecified), 6 (slightly misleading).
- **Suggested name:** Keep `requestId: string` but document constraints, or use a branded type `RequestId = string & {__brand: 'RequestId'}`.
- **Rationale:** Doc-implied invariants that aren't in the type.

### 30. `WorkspaceBaseEnvironment.createTime` / `updateTime` — `time` suffix unclear vs `Timestamp`/`At` — `model.ts:740, 744`
- **Why weird:** Many TS APIs use `createdAt`/`updatedAt` (past-tense + `At` for timestamps) or `createTimestamp`/`updateTimestamp`. `createTime`/`updateTime` is Google-AIP/Go-style. Combined with `creatorUserId`/`lastUpdatedUserId` (finding #20) the verb tenses are mixed: noun `createTime`, past-participle `lastUpdated`. 
- **Category:** 14 (Google-AIP/Go-style), 13 (verb tense inconsistency), 17 (inconsistent with `lastUpdated` sibling).
- **Suggested name:** `createdAt` / `updatedAt`, or align with `creator`/`lastUpdater` — pick one verb tense and apply across the type.
- **Rationale:** Stylistic; consistent with the broader codebase critique.

### 31. `WorkspaceBaseEnvironment.displayName` — generic, lacks "human-readable" or constraints — `model.ts:734`
- **Why weird:** Doc says "Human-readable display name". No documented uniqueness, max length, allowed characters. Compare `workspaceBaseEnvironmentId` (model.ts:552) which is constrained: "4-63 characters, valid characters /[a-z][0-9]-/". `displayName` deserves similar treatment in the doc.
- **Category:** 19 (underspecified), 1 (slightly generic).
- **Suggested name:** Keep but document constraints.
- **Rationale:** Minor.

### 32. `WorkspaceBaseEnvironment.filepath` — points at a YAML file but type is `string` — `model.ts:736`
- **Why weird:** Doc says "The WSFS or UC Volumes path to the environment YAML file." But the field is `string`. WSFS paths and UC Volume paths have different syntaxes (`/Workspace/...` vs `/Volumes/...`). The type permits any string. A union of the two path types would be more precise but probably not worth the porting effort.
- **Category:** 19 (underspecified — the doc lists two valid path types but the type doesn't distinguish).
- **Suggested name:** Keep `filepath`/`filePath` (see #17), but document the allowed prefixes.
- **Rationale:** Minor.

---

## Observation

### 33. Package version is hard-coded `v1` while sibling `clusterlibraries` is `v2` for the same concept — `packages/environments/src/v1/`, `packages/clusterlibraries/src/v2/`
- **Why noteworthy:** The two packages model the same `BaseEnvironment` concept at different version numbers. `clusterlibraries/v2` has `DefaultBaseEnvironment`; `environments/v1` has `DefaultWorkspaceBaseEnvironment`. Likely `environments` is the newer, narrower carve-out (workspace-scoped), but the version numbers misleadingly suggest `clusterlibraries` is newer.
- **Category:** 12 (duplicate concept), 6 (misleading lineage signal).
- **Suggested action:** Document the relationship in `index.ts` of each package (e.g. "This supersedes / is superseded by / is independent of `clusterlibraries/v2`"). Or align versions.
- **Rationale:** Generator-level; not actionable in TS alone, but worth recording.

### 34. JSDoc comment "If changed, also update estore/namespaces/defaultbaseenvironments/latest.proto" leaks internal-only path — `model.ts:8`
- **Why noteworthy:** The comment on `BaseEnvironmentType` references an internal proto path that public SDK consumers cannot see, cannot navigate to, and have no use for. It's a generator-cycle reminder to Databricks engineers that shouldn't have made it through the porting/codegen scrub.
- **Category:** 6 (misleading — refers to a non-public artefact in a doc comment public users see).
- **Suggested action:** Strip internal references from generated comments at codegen time.
- **Rationale:** SDK hygiene; not a name issue but worth flagging in the audit since the comment is on a *public* type.
