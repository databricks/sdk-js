# Naming Audit: environments

**Path:** `packages/environments/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Inferred domain:** Workspace-level Python "base environment" management for serverless notebooks and jobs. A `WorkspaceBaseEnvironment` points at a YAML dependency manifest (on WSFS or UC Volumes) for either CPU or GPU compute; the workspace also has a singleton `DefaultWorkspaceBaseEnvironment` that names one CPU default and one GPU default. The package exposes CRUD plus a `refresh` action and three long-running-operation helper classes.

**Total weird names flagged:** 28

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 11 |
| Low | 7 |
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

### 3. `WorkspaceBaseEnvironment` — type name is a 26-character three-adjective noun phrase — `model.ts:718`
- **Why weird:** The central type's name is the prefix every other identifier in the package inherits, so its length cascades: `CreateWorkspaceBaseEnvironmentRequest`, `RefreshWorkspaceBaseEnvironmentOperation`, `ListWorkspaceBaseEnvironmentsResponse`, etc. Three of the four words (`Workspace`, `Base`, `Environment`) are present in every export. The 26 characters are baked into the *type prefix*, not the enum-member prefix; this is a TS-surface concern, not a proto-codegen concern.
- **Category:** 7 (overly verbose type prefix), 1 (generic — "base" and "environment" together still don't say what the resource *is*: a YAML dependency manifest pointer).
- **Suggested name:** Drop one of the adjectives in the *type* name. The package being named already implies "environment", and the URL is `/api/environments/v1/workspace-base-environments` — at most one of `Workspace` or `Base` is informationally necessary in TS. Options: `BaseEnvironment`, `WorkspaceEnvironment`, or rename the whole package and call the type `BaseEnvironment`.
- **Rationale:** Length compounds: every method, request, response, schema function, and operation class repeats `WorkspaceBaseEnvironment` once or twice. A user typing `client.crea[Tab]` faces a wall of nearly identical 36+ character names.

### 4. `WorkspaceBaseEnvironment.status` field name and type's domain do not align — `model.ts:737`
- **Why weird:** `WorkspaceBaseEnvironment.status` is typed `WorkspaceBaseEnvironmentCache_Status` — i.e. the *status of a Cache*. But the field documents itself as "The status of the materialized workspace base environment", not the status of a cache. The user reads `env.status` and the type's name implies a different concept (cache) than the doc and the data (materialization state of the environment).
- **Category:** 16 (field type contradicts type domain), 6 (misleading).
- **Suggested name:** Either (a) rename the enum to `MaterializationStatus` (the doc's own words) and drop the `Cache` qualifier, or (b) rename the field to `cacheStatus` to match the type.
- **Rationale:** Field name and type name should describe the same thing. The mismatch is a tell that the enum was named for an internal proto nesting that the public API doesn't surface.

### 5. `Operation` exported with no namespace prefix — collides on a single-import surface — `model.ts:641, index.ts:26`
- **Why weird:** The type name `Operation` is one of the most generic words in software (matches OS-level, math, audit-log, business, telemetry, async-task… meanings). It is exported alongside two related types (`GetOperationRequest`, `WorkspaceBaseEnvironmentOperationMetadata`) and three classes (`CreateWorkspaceBaseEnvironmentOperation`, etc.). It is also a `google.longrunning.Operation`-shaped envelope (the docstring at model.ts:638 even says so), but the name doesn't say that.
- **Category:** 1 (vague/generic), 15 (generic type name losing meaning).
- **Suggested name:** `LongRunningOperation`, `LROperation`, `AsyncOperation`, or namespace it under the package name (`EnvironmentOperation`). Whichever wins, the request type should match: `GetLongRunningOperationRequest` etc.
- **Rationale:** A consumer importing `{Operation}` into a file that also has Slack `Operation`, audit `Operation`, or domain-specific `Operation` is in for a renaming party. The name signals nothing about being a polling envelope.

### 6. `Operation.result` discriminated union uses `$case: 'error' | 'response'` — naming verbose & inconsistent — `model.ts:666-677`
- **Why weird:** The union's discriminator field is `$case` (the `$` prefix is a wire/codegen artifact, not idiomatic TS — see `clusterlibraries` and `database` audits where the same pattern surfaces). The `'response'` variant's payload field is also called `response`, so consumers write `op.result.response.response` is *not* the access path but `op.result.$case === 'response'` then `op.result.response` is. Conflating the discriminator literal `'response'` with a payload field also named `response` is confusing. Same for `'error'` / `error`.
- **Category:** 6 (misleading — `$case`/`response`/`error` triple-overloading), 17 (inconsistency with idiomatic TS discriminated unions which use `kind` or `type`), 14 (Go/proto codegen artefact).
- **Suggested name:** Use `kind` (or `type`) instead of `$case`, and use distinct names like `kind: 'error' | 'success'` with payload fields `error: DatabricksServiceException` / `value: Record<...>` (or similar). See database audit #14 for an analogous critique.
- **Rationale:** `$` in identifiers in TS implies "internal/synthetic". This is a leak of the ts-proto codegen convention. Consumers writing `op.result?.$case` see synthetic noise.

### 7. `DatabricksServiceExceptionWithDetailsProto` — Proto suffix on a TS type, "Exception" implies an Error class — `model.ts:552, index.ts:18`
- **Why weird:** Three problems in one name:
  1. **`Proto` suffix** on a TypeScript identifier — leaks the proto origin into the type name (`Proto` means nothing to a TS consumer). 
  2. **`Exception`** is Java/Python terminology; TS/JS uses `Error`. The type is a *data* representation of an error (it's a plain interface with `errorCode`/`message`/`stackTrace`), not an actual thrown exception class. Naming a data structure `Exception` suggests it can be thrown.
  3. **Verbose** — 41 characters. The shape is `{ errorCode, message, stackTrace, details }` — i.e. a typical Google-RPC error.
- **Category:** 20 (type-suffix tautology — `Proto`), 14 (Java-style name — `Exception`), 7 (overly verbose), 6 (misleading — looks throwable).
- **Suggested name:** `ServiceErrorDetails`, `DatabricksError`, or `RpcError`. Drop the `WithDetails`, `Proto`, and `Exception` suffix all at once.
- **Rationale:** The name has the worst of every world: Java verb + Proto codegen tag + length. No piece of the name helps a TS consumer.

### 8. `refreshWorkspaceBaseEnvironment` doc comment refers to "Refresh*Workspace*BaseEnvironment**s**" plural and the request type docstring says "to delete" — `model.ts:680, 683`
- **Why weird:** The request type is `RefreshWorkspaceBaseEnvironmentRequest` (singular), but its JSDoc says: "Request message for RefreshWorkspaceBaseEnviro**ments**" (plural). The same type's `name` field doc says: "Required. The resource name of the workspace base environment **to delete**" — i.e. copy-pasted from the delete request and never edited.
- **Category:** 9 (singular/plural mismatch — type vs doc), 6 (misleading doc — says delete).
- **Suggested name:** Fix the docstrings — say "Refresh a workspace base environment. The resource name of the environment to refresh." Either keep the type singular (matches the client method `refreshWorkspaceBaseEnvironment`) or move to plural everywhere.
- **Rationale:** Wrong action verb in a doc that an IDE will display when the user hovers a parameter. The package was generated from a proto where the message-name was singular but the doc-string copied from elsewhere — the SDK is propagating the bug.

---

## Medium severity

### 9. `ErrorCode` enum exports ~100 values and is mostly deprecated — `model.ts:16-514, index.ts:12`
- **Why weird:** The `ErrorCode` enum has roughly 100 members. The doc comments mark a large fraction as deprecated ("kept to maintain backwards compatibility"). Many members are domain-specific (e.g. `IPYNB_FILE_IN_REPO`, `GIT_URL_NOT_ON_ALLOW_LIST`, `MAX_NOTEBOOK_SIZE_EXCEEDED`, `DAC_ALREADY_EXISTS`) and have nothing to do with environments. The enum is a kitchen-sink import of every Databricks-platform error code, exported from a *workspace-base-environment* package.
- **Category:** 1 (overly broad — exposed in the wrong scope), 7 (overly verbose surface), 12 (duplicate concept — `ErrorCode` likely lives in many packages).
- **Suggested name:** Move to a shared `@databricks/sdk-databricks/apierror` (where `apierr/codes/` already lives, per AGENTS.md) and import it. The environments package should export at most the subset of codes it actually returns.
- **Rationale:** Each package re-declaring all 100 error codes makes them non-comparable across imports and bloats the bundle. The package's `client.ts` imports `ApiError` from `@databricks/sdk-core/apierror` (utils.ts:5) — there is already a canonical location.

### 10. `ErrorCode` values are SCREAMING_SNAKE strings, e.g. `'PROVIDER_SHARE_NOT_ACCESSIBLE'` — `model.ts:513`
- **Why weird:** Enum values are SCREAMING_SNAKE wire strings (e.g. `MAX_CHILD_NODE_SIZE_EXCEEDED`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`). 100+ values × ~30 chars each = a large surface that consumers must spell exactly. TS pattern is `PascalCase` enum members.
- **Category:** 14 (Java/Go-style names), 18 (long enum values).
- **Suggested name:** `MaxChildNodeSizeExceeded`, `StorageCredentialAlreadyExists`, etc.
- **Rationale:** TS conventions favour `PascalCase`. Wire format can keep SCREAMING_SNAKE via marshal/unmarshal.

### 11. `DefaultWorkspaceBaseEnvironment.cpuWorkspaceBaseEnvironment` / `gpuWorkspaceBaseEnvironment` — fields stutter the type name — `model.ts:574, 579`
- **Why weird:** Field names contain the wrapping type's name three times. Read aloud: "the cpu workspace base environment field on the default workspace base environment". The values are just resource-name *strings* pointing at another `WorkspaceBaseEnvironment` ("Format: workspace-base-environments/{workspace_base_environment}"). Field names `cpu` and `gpu` plus a typed `WorkspaceBaseEnvironmentRef` would be cleaner.
- **Category:** 7 (overly verbose), 15 (generic field names — the value is just a resource name).
- **Suggested name:** `cpu` / `gpu` (with field type `string` or `WorkspaceBaseEnvironmentName`), or `cpuEnvironmentName` / `gpuEnvironmentName`.
- **Rationale:** The type is *already* `DefaultWorkspaceBaseEnvironment`. Repeating the prefix on every field makes consumers type `defEnv.cpuWorkspaceBaseEnvironment` instead of `defEnv.cpu`.

### 12. `WorkspaceBaseEnvironment.baseEnvironmentType` — field prefix duplicates parent type name — `model.ts:743`
- **Why weird:** On a type called `WorkspaceBaseEnvironment`, the field is `baseEnvironmentType`. The `baseEnvironment` prefix duplicates the parent. Plain `type` (or `computeType`) would suffice.
- **Category:** 8 (redundant suffix/prefix), 7 (verbose).
- **Suggested name:** `type` or `computeType`. Watch `type` — it is a reserved-like word in TS though not technically reserved.
- **Rationale:** Same logic as #12.

### 13. `WorkspaceBaseEnvironment.filepath` — single-word run-together identifier — `model.ts:727`
- **Why weird:** `filepath` is run-together (one word in camelCase). TS/JS convention is `filePath`. The Go SDK and proto wire format both use `filepath` as one token, but in TS the camelCase rule should split it.
- **Category:** 3 (casing inconsistency), 14 (Go-style name).
- **Suggested name:** `filePath`.
- **Rationale:** Every other compound field in the type (`displayName`, `creatorUserId`, `createTime`, `lastUpdatedUserId`, `updateTime`, `isDefault`, `baseEnvironmentType`) uses camelCase. `filepath` is the only exception.

### 14. `WorkspaceBaseEnvironment.message` — generic field name — `model.ts:739`
- **Why weird:** `message` is generic and could mean log message, error message, info text, user-facing description, etc. Doc says "Status message providing additional details about the environment status." `statusMessage` would be more precise.
- **Category:** 1 (vague), 15 (generic field name losing meaning).
- **Suggested name:** `statusMessage` or `statusDetails`.
- **Rationale:** Same as `DefaultBaseEnvironment.message` in clusterlibraries audit (§1.2).

### 15. `WorkspaceBaseEnvironment.name` — generic field name, holds a resource path — `model.ts:723`
- **Why weird:** `name` is *not* a human-readable name in this API (there is a separate `displayName` for that, model.ts:725). The doc says: "The resource name of the workspace base environment. Format: workspace-base-environments/{workspace-base-environment}" — i.e. `name` is a slash-delimited *resource path*. Calling a path a `name` is a Google-AIP convention that confuses non-AIP-aware readers.
- **Category:** 6 (misleading — value is a path, not a name), 15 (generic field name), 19 (underspecified ID).
- **Suggested name:** `resourceName`, `path`, or `id`. Or document it with `(format: workspace-base-environments/...)` in the field name itself.
- **Rationale:** This pattern recurs across the package (every request type's `name` field is actually a path: `GetWorkspaceBaseEnvironmentRequest.name`, `DeleteWorkspaceBaseEnvironmentRequest.name`, `RefreshWorkspaceBaseEnvironmentRequest.name`, `GetDefaultWorkspaceBaseEnvironmentRequest.name`, `Operation.name`, `GetOperationRequest.name`). Eight different `.name` fields, each a path.

### 16. `WorkspaceBaseEnvironment.creatorUserId` / `lastUpdatedUserId` — verb tense inconsistency — `model.ts:729, 733`
- **Why weird:** `creatorUserId` (noun: "the creator's id") vs `lastUpdatedUserId` (past-participle of verb-phrase: "the last-updated user's id"). The pair should agree. Symmetric pairs would be `creatorUserId`/`updaterUserId`, or `createdByUserId`/`lastUpdatedByUserId`.
- **Category:** 13 (verb-tense inconsistency), 17 (inconsistent action verbs).
- **Suggested name:** Pick one form for both: `createdByUserId` / `updatedByUserId`, or `creatorUserId` / `updaterUserId`.
- **Rationale:** Internal consistency. As written, the noun↔verb mismatch reads oddly when sorted in IDE auto-complete.

### 17. `CreateWorkspaceBaseEnvironmentRequest.workspaceBaseEnvironmentId` — 27-character optional string field — `model.ts:543`
- **Why weird:** Field name `workspaceBaseEnvironmentId` is the type name + `Id` suffix. On a `CreateWorkspaceBaseEnvironment*Request*` it is redundant — every field on a create request already pertains to a workspace base environment. Compare `requestId` (model.ts:548) on the same type, which is correctly scoped (`request`+`Id`, not `createWorkspaceBaseEnvironmentRequestRequestId`).
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `environmentId`, `id`, or `resourceId`.
- **Rationale:** Consumers writing `{workspaceBaseEnvironment: env, workspaceBaseEnvironmentId: 'foo'}` is awkward; `{environment: env, environmentId: 'foo'}` reads better.

### 18. `UpdateWorkspaceBaseEnvironmentRequest.name` is undocumented — `model.ts:706`
- **Why weird:** Most `*Request` types document their `name` field as "The resource name of the workspace base environment to ..." but `UpdateWorkspaceBaseEnvironmentRequest.name` (model.ts:706) is the only one with no JSDoc. The very next field (`workspaceBaseEnvironment`, line 711) is documented and even references `name`: "The name field is used to identify the environment to update."
- **Category:** 19 (underspecified ID), 6 (misleading by omission).
- **Suggested name:** Add JSDoc. The field is the resource name to update; say so. Or drop the field entirely if it duplicates `workspaceBaseEnvironment.name`.
- **Rationale:** Inconsistent doc coverage in a generated file is a tell that the source proto field has no comment — should be fixed upstream.

### 19. `DatabricksServiceExceptionWithDetailsProto` — `Service` mid-position is an architectural-layer leak, not domain — `model.ts:552, index.ts:18`
- **Why weird:** The mid-position word `Service` in `DatabricksServiceExceptionWithDetailsProto` describes a server-side architectural layer ("a service threw this exception"), not anything about the data the type carries. The type is a plain error payload with `errorCode`/`message`/`stackTrace`/`details`; no field references a "service". `Service` here mirrors the Java `*ServiceException` superclass pattern and the proto message name `DatabricksServiceExceptionWithDetails` — both server-internal concepts that have no meaning for a TS SDK consumer. Combined with the trailing `Proto` (codegen origin) the name is a stack of three architectural tags: `Service` (layer) + `Exception` (Java throwable) + `Proto` (wire format).
- **Category:** proto-architectural-leak (mid-position `Service` is not the domain), 14 (Java-style naming), 20 (`Proto` suffix tautology).
- **Suggested name:** `DatabricksErrorDetails`, `ServiceErrorPayload` is still leaky; prefer `ApiErrorDetails` or `RpcErrorDetails` if the gRPC framing is part of the public contract, otherwise just `ErrorDetails`/`DatabricksError`. Drop `Service`, `Exception`, and `Proto` together.
- **Rationale:** The proto-architectural-leak audit treats mid-position `Service` as a server-implementation tell that leaks into TS surfaces. Even setting aside the existing `Proto`/`Exception` complaints (#7), the `Service` infix on a *data* type tells the consumer nothing useful and reinforces the impression that the SDK exposes server internals. The unmarshal schema (`model.ts:757`) propagates the same name; renaming the type renames its schema.

---

## Low severity

### 20. `WorkspaceBaseEnvironment.isDefault` — boolean field on the resource, but `DefaultWorkspaceBaseEnvironment` is a separate type — `model.ts:741`
- **Why weird:** A `WorkspaceBaseEnvironment` has an `isDefault` boolean (model.ts:741). The same package also has a separate `DefaultWorkspaceBaseEnvironment` type (model.ts:564) that represents the workspace's default. Two encodings of the same fact: a boolean on each environment, and a separate "default" type listing CPU/GPU defaults. A consumer can't tell from the type whether `isDefault` is computed from `DefaultWorkspaceBaseEnvironment` or vice versa.
- **Category:** 12 (duplicate concept), 6 (misleading — which one is the source of truth?).
- **Suggested name:** Document the relationship explicitly; or drop one. If `isDefault` is server-computed, it could be a `default: 'cpu' | 'gpu' | null` enum so a reader can tell which kind of default at a glance.
- **Rationale:** Two representations of "is this the default" invite drift.

### 21. `ListWorkspaceBaseEnvironmentsRequest.pageSize` doc says "Default is 1000" with no min/max — `model.ts:619`
- **Why weird:** Page-size doc says only "Default is 1000". No documented min/max, no behavior on `0`, no behavior on values exceeding server cap.
- **Category:** 19 (underspecified).
- **Suggested name:** Add doc bounds.
- **Rationale:** Doc-only nit; not a name issue per se but worth flagging in a naming audit because `pageSize` is a known naming convention with known semantics that this doc partially undermines.

### 22. `ListWorkspaceBaseEnvironmentsResponse.workspaceBaseEnvironments` — long plural field — `model.ts:629`
- **Why weird:** Field name is 27 characters; type is a list of 27-character-typed items. Reading `resp.workspaceBaseEnvironments?.[0]?.workspaceBaseEnvironment...` is a chore. (No sub-field of this exact name; included to illustrate the chain length.)
- **Category:** 7 (overly verbose), 8 (redundant suffix — same as the type name pluralised).
- **Suggested name:** `environments` (the response type is already `ListWorkspaceBaseEnvironmentsResponse`, so the plural field doesn't need to re-state the qualifier). Wire stays `workspace_base_environments`.
- **Rationale:** Matches the `clusterlibraries`/`database` audit critique that list responses don't need to repeat their qualifier.

### 23. `requestId` doc says "A random UUID is recommended" but field is `string`, not UUID — `model.ts:545`
- **Why weird:** Doc strongly suggests UUID, but the type is `string`. If UUID is required for idempotency to work, that's a constraint the type doesn't capture.
- **Category:** 19 (underspecified), 6 (slightly misleading).
- **Suggested name:** Keep `requestId: string` but document constraints, or use a branded type `RequestId = string & {__brand: 'RequestId'}`.
- **Rationale:** Doc-implied invariants that aren't in the type.

### 24. `WorkspaceBaseEnvironment.createTime` / `updateTime` — `time` suffix unclear vs `Timestamp`/`At` — `model.ts:731, 735`
- **Why weird:** Many TS APIs use `createdAt`/`updatedAt` (past-tense + `At` for timestamps) or `createTimestamp`/`updateTimestamp`. `createTime`/`updateTime` is Google-AIP/Go-style. Combined with `creatorUserId`/`lastUpdatedUserId` (finding #17) the verb tenses are mixed: noun `createTime`, past-participle `lastUpdated`. 
- **Category:** 14 (Google-AIP/Go-style), 13 (verb tense inconsistency), 17 (inconsistent with `lastUpdated` sibling).
- **Suggested name:** `createdAt` / `updatedAt`, or align with `creator`/`lastUpdater` — pick one verb tense and apply across the type.
- **Rationale:** Stylistic; consistent with the broader codebase critique.

### 25. `WorkspaceBaseEnvironment.displayName` — generic, lacks "human-readable" or constraints — `model.ts:725`
- **Why weird:** Doc says "Human-readable display name". No documented uniqueness, max length, allowed characters. Compare `workspaceBaseEnvironmentId` (model.ts:543) which is constrained: "4-63 characters, valid characters /[a-z][0-9]-/". `displayName` deserves similar treatment in the doc.
- **Category:** 19 (underspecified), 1 (slightly generic).
- **Suggested name:** Keep but document constraints.
- **Rationale:** Minor.

### 26. `WorkspaceBaseEnvironment.filepath` — points at a YAML file but type is `string` — `model.ts:727`
- **Why weird:** Doc says "The WSFS or UC Volumes path to the environment YAML file." But the field is `string`. WSFS paths and UC Volume paths have different syntaxes (`/Workspace/...` vs `/Volumes/...`). The type permits any string. A union of the two path types would be more precise but probably not worth the porting effort.
- **Category:** 19 (underspecified — the doc lists two valid path types but the type doesn't distinguish).
- **Suggested name:** Keep `filepath`/`filePath` (see #14), but document the allowed prefixes.
- **Rationale:** Minor.

---

## Observation

### 27. Package version is hard-coded `v1` while sibling `clusterlibraries` is `v2` for the same concept — `packages/environments/src/v1/`, `packages/clusterlibraries/src/v2/`
- **Why noteworthy:** The two packages model the same `BaseEnvironment` concept at different version numbers. `clusterlibraries/v2` has `DefaultBaseEnvironment`; `environments/v1` has `DefaultWorkspaceBaseEnvironment`. Likely `environments` is the newer, narrower carve-out (workspace-scoped), but the version numbers misleadingly suggest `clusterlibraries` is newer.
- **Category:** 12 (duplicate concept), 6 (misleading lineage signal).
- **Suggested action:** Document the relationship in `index.ts` of each package (e.g. "This supersedes / is superseded by / is independent of `clusterlibraries/v2`"). Or align versions.
- **Rationale:** Generator-level; not actionable in TS alone, but worth recording.

### 28. JSDoc comment "If changed, also update estore/namespaces/defaultbaseenvironments/latest.proto" leaks internal-only path — `model.ts:8`
- **Why noteworthy:** The comment on `BaseEnvironmentType` references an internal proto path that public SDK consumers cannot see, cannot navigate to, and have no use for. It's a generator-cycle reminder to Databricks engineers that shouldn't have made it through the porting/codegen scrub.
- **Category:** 6 (misleading — refers to a non-public artefact in a doc comment public users see).
- **Suggested action:** Strip internal references from generated comments at codegen time.
- **Rationale:** SDK hygiene; not a name issue but worth flagging in the audit since the comment is on a *public* type.

---

## Fixed

- #10 `WorkspaceBaseEnvironmentProvider.WORKSPACE_BASE_ENVIRONMENT_PROVIDER_UNSPECIFIED` (originally cited at `model.ts:518`): Fixed in regeneration on 2026-05-20 — the `WorkspaceBaseEnvironmentProvider` enum was removed from the source.
- #22 `WorkspaceBaseEnvironmentProvider` Admin/Databricks part-of-speech mix (originally cited at `model.ts:517`): Fixed in regeneration on 2026-05-20 — the `WorkspaceBaseEnvironmentProvider` enum and the `baseEnvironmentProvider` field on `WorkspaceBaseEnvironment` were removed from the source.
