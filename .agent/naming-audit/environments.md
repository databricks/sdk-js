# Naming Audit: environments

**Path:** `packages/environments/src/v1/`
**Versions audited:** v1
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Inferred domain:** Workspace-level Python "base environment" management for serverless notebooks and jobs. A `WorkspaceBaseEnvironment` points at a YAML dependency manifest (on WSFS or UC Volumes) for either CPU or GPU compute; the workspace also has a singleton `DefaultWorkspaceBaseEnvironment` that names one CPU default and one GPU default. The package exposes CRUD plus a `refresh` action and three long-running-operation helper classes.

**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 3 |
| Low | 2 |
| Observation | 1 |

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

---

## Medium severity

### 8. `ErrorCode` enum exports ~100 values and is mostly deprecated — `model.ts:16-514, index.ts:12`
- **Why weird:** The `ErrorCode` enum has roughly 100 members. The doc comments mark a large fraction as deprecated ("kept to maintain backwards compatibility"). Many members are domain-specific (e.g. `IPYNB_FILE_IN_REPO`, `GIT_URL_NOT_ON_ALLOW_LIST`, `MAX_NOTEBOOK_SIZE_EXCEEDED`, `DAC_ALREADY_EXISTS`) and have nothing to do with environments. The enum is a kitchen-sink import of every Databricks-platform error code, exported from a *workspace-base-environment* package.
- **Category:** 1 (overly broad — exposed in the wrong scope), 7 (overly verbose surface), 12 (duplicate concept — `ErrorCode` likely lives in many packages).
- **Suggested name:** Move to a shared `@databricks/sdk-databricks/apierror` (where `apierr/codes/` already lives, per AGENTS.md) and import it. The environments package should export at most the subset of codes it actually returns.
- **Rationale:** Each package re-declaring all 100 error codes makes them non-comparable across imports and bloats the bundle. The package's `client.ts` imports `ApiError` from `@databricks/sdk-core/apierror` (utils.ts:5) — there is already a canonical location.

### 9. `ErrorCode` values are SCREAMING_SNAKE strings, e.g. `'PROVIDER_SHARE_NOT_ACCESSIBLE'` — `model.ts:513`
- **Why weird:** Enum values are SCREAMING_SNAKE wire strings (e.g. `MAX_CHILD_NODE_SIZE_EXCEEDED`, `STORAGE_CREDENTIAL_ALREADY_EXISTS`). 100+ values × ~30 chars each = a large surface that consumers must spell exactly. TS pattern is `PascalCase` enum members.
- **Category:** 14 (Java/Go-style names), 18 (long enum values).
- **Suggested name:** `MaxChildNodeSizeExceeded`, `StorageCredentialAlreadyExists`, etc.
- **Rationale:** TS conventions favour `PascalCase`. Wire format can keep SCREAMING_SNAKE via marshal/unmarshal.

### 10. `DatabricksServiceExceptionWithDetailsProto` — `Service` mid-position is an architectural-layer leak, not domain — `model.ts:552, index.ts:18`
- **Why weird:** The mid-position word `Service` in `DatabricksServiceExceptionWithDetailsProto` describes a server-side architectural layer ("a service threw this exception"), not anything about the data the type carries. The type is a plain error payload with `errorCode`/`message`/`stackTrace`/`details`; no field references a "service". `Service` here mirrors the Java `*ServiceException` superclass pattern and the proto message name `DatabricksServiceExceptionWithDetails` — both server-internal concepts that have no meaning for a TS SDK consumer. Combined with the trailing `Proto` (codegen origin) the name is a stack of three architectural tags: `Service` (layer) + `Exception` (Java throwable) + `Proto` (wire format).
- **Category:** proto-architectural-leak (mid-position `Service` is not the domain), 14 (Java-style naming), 20 (`Proto` suffix tautology).
- **Suggested name:** `DatabricksErrorDetails`, `ServiceErrorPayload` is still leaky; prefer `ApiErrorDetails` or `RpcErrorDetails` if the gRPC framing is part of the public contract, otherwise just `ErrorDetails`/`DatabricksError`. Drop `Service`, `Exception`, and `Proto` together.
- **Rationale:** The proto-architectural-leak audit treats mid-position `Service` as a server-implementation tell that leaks into TS surfaces. Even setting aside the existing `Proto`/`Exception` complaints (#7), the `Service` infix on a *data* type tells the consumer nothing useful and reinforces the impression that the SDK exposes server internals. The unmarshal schema (`model.ts:757`) propagates the same name; renaming the type renames its schema.

---

## Low severity

### 11. `WorkspaceBaseEnvironment.isDefault` — boolean field on the resource, but `DefaultWorkspaceBaseEnvironment` is a separate type — `model.ts:741`
- **Why weird:** A `WorkspaceBaseEnvironment` has an `isDefault` boolean (model.ts:741). The same package also has a separate `DefaultWorkspaceBaseEnvironment` type (model.ts:564) that represents the workspace's default. Two encodings of the same fact: a boolean on each environment, and a separate "default" type listing CPU/GPU defaults. A consumer can't tell from the type whether `isDefault` is computed from `DefaultWorkspaceBaseEnvironment` or vice versa.
- **Category:** 12 (duplicate concept), 6 (misleading — which one is the source of truth?).
- **Suggested name:** Document the relationship explicitly; or drop one. If `isDefault` is server-computed, it could be a `default: 'cpu' | 'gpu' | null` enum so a reader can tell which kind of default at a glance.
- **Rationale:** Two representations of "is this the default" invite drift.

### 12. `requestId` doc says "A random UUID is recommended" but field is `string`, not UUID — `model.ts:545`
- **Why weird:** Doc strongly suggests UUID, but the type is `string`. If UUID is required for idempotency to work, that's a constraint the type doesn't capture.
- **Category:** 19 (underspecified), 6 (slightly misleading).
- **Suggested name:** Keep `requestId: string` but document constraints, or use a branded type `RequestId = string & {__brand: 'RequestId'}`.
- **Rationale:** Doc-implied invariants that aren't in the type.

---

## Observation

### 13. Package version is hard-coded `v1` while sibling `clusterlibraries` is `v2` for the same concept — `packages/environments/src/v1/`, `packages/clusterlibraries/src/v2/`
- **Why noteworthy:** The two packages model the same `BaseEnvironment` concept at different version numbers. `clusterlibraries/v2` has `DefaultBaseEnvironment`; `environments/v1` has `DefaultWorkspaceBaseEnvironment`. Likely `environments` is the newer, narrower carve-out (workspace-scoped), but the version numbers misleadingly suggest `clusterlibraries` is newer.
- **Category:** 12 (duplicate concept), 6 (misleading lineage signal).
- **Suggested action:** Document the relationship in `index.ts` of each package (e.g. "This supersedes / is superseded by / is independent of `clusterlibraries/v2`"). Or align versions.
- **Rationale:** Generator-level; not actionable in TS alone, but worth recording.

---
