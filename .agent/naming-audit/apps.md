# Naming Audit: `@databricks/sdk-apps` (v1)

**Package:** `apps` (`packages/apps/src/v1/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`
**Domain:** Databricks Apps — interactive applications hosted in a workspace,
with deployments, custom templates, app spaces, and resource bindings.

## Summary

| Severity | Count |
| -------- | ----- |
| High     |    11 |
| Medium   |    25 |
| Low      |    18 |
| Observation | 9 |
| **Total** | **63** |

The audit found one dominant theme: the domain has overlapping vocabularies for
the same concept. `App` vs `Application` (`ApplicationStatus`,
`ApplicationStatus_ApplicationState`) collide on the same entity, and three
overlapping "space" vocabularies (`Space`, `AppResourceGenieSpace`, `space` as
a string field on `App`/`ListAppsRequest`) produce outright ambiguity (`Space`
versus Genie Space). Field-level confusion compounds the issue: `App.name` is
the primary key while `App.id` is a separate unique identifier, and a bare
`space` field sits next to `spaceId` on the same type. The package also
re-exports an `ErrorCode` enum with 76 cross-product values whose relevance to
Apps is unclear.

---

## High-severity findings

### H1. `ApplicationStatus` vs `App` — duplicate top-level "application" concept
- **File:** `model.ts:681, 1014`, also `index.ts:40, 72`
- **Category:** Duplicate concepts (12), Misleading names (6)
- **Issue:** The package's primary entity is `App`, but the runtime state of an
  App is modelled by a struct called `ApplicationStatus` (with enum
  `ApplicationStatus_ApplicationState`). On `App`, the field is
  `appStatus?: ApplicationStatus`, so the type name disagrees with the field
  name. There are two parallel vocabularies for the same idea.
- **Suggestion:** Rename `ApplicationStatus` -> `AppStatus`, the nested enum to
  `AppStatus.State` (TS namespace) or `AppState`. Aligns with the `App` entity
  and with the `appStatus` field.
- **Rationale:** A consumer reading `app.appStatus: ApplicationStatus` has to
  prove to themselves that "application" and "app" refer to the same thing.

### H2. `ErrorCode` (76 values) shipped from a package whose surface is Apps
- **File:** `model.ts:14-512`, also `index.ts:17`
- **Category:** Vague/generic without domain context (1), Duplicate concepts (12)
- **Issue:** The `ErrorCode` enum has 76 values, the majority of which are
  Unity Catalog, Repos, Files API, and Workspaces error codes
  (`METASTORE_DOES_NOT_EXIST`, `SHARE_DOES_NOT_EXIST`, `IPYNB_FILE_IN_REPO`,
  `GIT_SENSITIVE_TOKEN_DETECTED`, `MAX_BLOCK_SIZE_EXCEEDED`, etc.). The vast
  majority of values are documented as "Deprecated and kept to maintain
  backwards compatibility". The only place this enum is consumed inside the
  apps package is `DatabricksServiceExceptionWithDetailsProto.errorCode`,
  which is itself only used as the `error` arm of `Operation.result`.
- **Suggestion:** Move `ErrorCode` to a shared core package
  (`@databricks/sdk-databricks/apierror/codes`) and re-export it. Each
  service-level package should not duplicate the canonical error-code list.
- **Rationale:** The enum is huge, mostly deprecated, semantically global, and
  is being inlined into a service-specific package. This is the canonical case
  the project's own `apierr/codes` directory was created to avoid.

### H3. `Operation` — generic name with no domain prefix
- **File:** `model.ts:1267`, also `index.ts:102`, `client.ts:275, 375, 527, 905`
- **Category:** Vague/generic without domain context (1)
- **Issue:** `Operation` is exported as a top-level type. There is no Apps
  context in the name; a user importing `Operation` from `@databricks/sdk-apps`
  has no way to know what it operates on. The accompanying request type
  `GetOperationRequest` is even more generic. From the client, the method that
  consumes it is `getSpaceOperation`, which is the only thing it can actually
  be used for in this package.
- **Suggestion:** Rename `Operation` -> `SpaceOperation` and
  `GetOperationRequest` -> `GetSpaceOperationRequest`. Alternatively, move
  both to a shared core package (Google's standard
  `google.longrunning.Operation`) so all packages share the type rather than
  each redefining it locally.
- **Rationale:** Today every API package will have its own `Operation` type
  and they will collide on import. Either a shared canonical type or a
  domain-specific rename is required.

### H4. `space` string field on `App` vs `spaceId` — which is the identifier?
- **File:** `model.ts:773`, `client.ts:612-614`
- **Category:** Underspecified IDs (19), Misleading names (6), Generic field names (15)
- **Issue:** `App` has a `space?: string` field ("Name of the space this app
  belongs to") that is stringly-typed and distinguishable only by the
  documentation. `ListAppsRequest.space` is also a `string` filter that takes
  the space *name*. The bare `space` field looks like it should be a `Space`
  object rather than a string handle.
- **Suggestion:** Rename `space` -> `spaceName` to mirror conventions like
  `spaceId` and to reduce confusion with the `Space` interface. Update
  `ListAppsRequest.space` -> `spaceName` to match.
- **Rationale:** A field literally named after a type (`space: string` next to
  `interface Space`) violates the "field contradicting type domain" rule.

### H5. `name` is the App's primary key, not `id` — ambiguous identifier
- **File:** `model.ts:717, 756, 1090, 1134`
- **Category:** Underspecified IDs (19), Misleading names (6)
- **Issue:** `App.name` is the URL-path identifier used by all client methods
  (`/api/2.0/apps/${req.name}`); `App.id` is a separate "unique identifier"
  string. Several request types (`DeleteAppRequest`, `GetAppRequest`,
  `UpdateAppThumbnailRequest`, `StartAppRequest`, `StopAppRequest`,
  `DeleteAppThumbnailRequest`, `DeleteSpaceRequest`, `GetSpaceRequest`) carry a
  bare `name?: string` field. The same `App.name` field also appears in
  `AsyncUpdateAppRequest.appName` (the disambiguated form). Both
  conventions appear in the same package.
- **Suggestion:** Standardise on `appName` for all single-target Apps request
  types. `DeleteAppRequest.name` -> `appName`; similarly for the others. The
  existing `AsyncUpdateAppRequest.appName` and `GetAppDeploymentRequest.appName`
  already follow this rule.
- **Rationale:** The wire-level field is `name`, but the TS field can be
  renamed via the marshal/unmarshal mapping. Mixing `name` and `appName` for
  the same role across request types makes the API harder to discover.

### H6. Inconsistent value sets across sibling "state of an async op" enums
- **File:** `model.ts:530, 672, 514`
- **Category:** Verb-tense inconsistency (13), Duplicate concepts (12)
- **Issue:** Three sibling state enums in the same file have inconsistent
  value sets:
  - `AppDeployment_State` — `SUCCEEDED/FAILED/IN_PROGRESS/CANCELLED`.
  - `AppUpdate_UpdateStatus_UpdateState` —
    `SUCCEEDED/FAILED/IN_PROGRESS`.
  - `SpaceUpdateState` —
    `NOT_UPDATED/IN_PROGRESS/SUCCEEDED/FAILED`.
  A consumer can't predict which terminal/non-terminal states are reachable
  from one async op to the next.
- **Suggestion:** Align the value sets where the underlying state machines
  actually agree. Consider sharing a `LongRunningState` enum if the lifecycles
  truly match across the three operations.
- **Rationale:** Sibling state enums in the same domain should expose the
  same value vocabulary unless the underlying state machines genuinely
  differ — and if they differ, the doc should say why.

### H7. `oauth2AppIntegrationId` / `oauth2AppClientId` — digit-embedded acronym
- **File:** `model.ts:759-760`
- **Category:** Acronym casing inconsistencies (3)
- **Issue:** The fields use `oauth2` (all-lowercase) embedded with PascalCase.
  Google's TS style guide treats this as an acronym; the canonical case is
  `oAuth2` for camelCase (or `OAuth2` for PascalCase). The actual specification
  capitalises it as "OAuth 2.0".
- **Suggestion:** Rename to `oauth2AppIntegrationId` -> `oAuth2AppIntegrationId`
  (or accept the eslint exception for compatibility with the wire field
  `oauth2_app_integration_id`).
- **Rationale:** Inconsistent with how the SDK treats other acronyms (e.g.
  `Url` in `thumbnailUrl`, `Id` in many fields).

### H8. `defaultSourceCodePath` vs `gitRepository` — two coexisting "source" concepts on `App`
- **File:** `model.ts:750, 768`
- **Category:** Duplicate concepts (12), Misleading names (6)
- **Issue:** `App` has both `defaultSourceCodePath?: string` and
  `gitRepository?: GitRepository`. The `defaultSourceCodePath` doc says it
  "tracks the workspace source code path of the last active deployment", while
  `gitRepository` is the configured repo. These describe overlapping aspects of
  deployment provenance and the naming does not clarify their distinct roles.
- **Suggestion:** Treat `defaultSourceCodePath` as the historical
  (last-deployed) data; rename to `lastDeploymentSourceCodePath` to mirror
  `lastDeploymentId` (if such a convention is used). Then `gitRepository`
  remains the per-app configuration — two clearly differentiated roles.
- **Rationale:** Today a reader can't tell whether `defaultSourceCodePath` is
  the default for new deployments or the most-recently-used source. The doc
  comment clarifies it tracks the last active deployment, but the name does
  not.

### H9. `noCompute` boolean on `CreateAppRequest`
- **File:** `model.ts:1049-1050`
- **Category:** Misleading names (6)
- **Issue:** `noCompute?: boolean` with doc "If true, the app will not be
  started after creation." The negation in the name plus the documented
  semantics ("not started" vs "no compute") leaves room for misinterpretation
  — does `noCompute=true` mean *no compute allocated* (release-the-resources)
  or *don't auto-start*?
- **Suggestion:** Rename to `skipStart` or `startOnCreate` (positive form,
  default `true`), and update the doc to be explicit. The Go SDK historically
  uses `no_compute`, so the wire name needs to remain; just rename the TS
  field.
- **Rationale:** Negated booleans are a documented anti-pattern; the field
  also describes a behaviour ("start") rather than its surface effect ("no
  compute").

### H10. `DatabricksServiceExceptionWithDetailsProto` — `Proto` suffix is a wire-format architectural leak
- **File:** `model.ts:1081`, also `index.ts:80`, used at `model.ts:1296` and serialised at `model.ts:1955, 2072`.
- **Category:** Proto-architectural-leak (Proto suffix), Overly verbose (7)
- **Issue:** The public type carries a `Proto` suffix, exposing the
  underlying protobuf serialization format in the TS public surface. The
  suffix has no meaning to a JS/TS consumer and is purely a leak from the
  upstream `.proto` definition. The name is also overly long for what is
  effectively the API error envelope.
- **Suggestion:** Rename to `DatabricksServiceException` or, better, drop
  this local copy entirely and reuse the canonical error envelope from
  `@databricks/sdk-databricks/apierror` (parallels H2, which makes the same
  case for `ErrorCode`).
- **Rationale:** Wire-format tokens (`Proto`, `Rpc`, `Grpc`) in public
  type names violate the proto-architectural-leak rule. The TS SDK should
  not surface implementation-layer artefacts that a hand-written client
  would never name this way.

### H11. Singular `permission` field holding a single value but documented as plural permissions
- **File:** `model.ts:838-839, 947-948`
- **Category:** Singular/plural mismatches (9)
- **Issue:** `AppManifest_AppResourceJobSpec.permission?: ...JobPermission`
  has doc text `Permissions to grant on the Job. Supported permissions are:
  "CAN_MANAGE", "IS_OWNER", "CAN_MANAGE_RUN", "CAN_VIEW".` Same pattern in
  `AppResourceJob.permission`. The field name is singular but the doc says
  "Permissions" (plural) and lists four. The same hybrid singular/plural
  language appears in seven other resource specs.
- **Suggestion:** Either (a) make the field plural and convert it to an array
  if multiple values can be granted, or (b) keep singular and reword the doc to
  "Permission to grant on the job. One of: ...". Today the singular type
  enforces (b) — the doc should match.
- **Rationale:** The doc text contradicts the type signature, so consumers
  reading either will be misled.

---

## Medium-severity findings

### M1. `creator` / `updater` — bare-noun fields holding emails
- **File:** `model.ts:732, 736, 797, 1077, 1321, 1325`
- **Category:** Generic field names (15), Misleading names (6)
- **Issue:** `creator?: string` is documented as "The email of the user that
  created the app". The field name suggests an identity or a user object, but
  the value is specifically an email address.
- **Suggestion:** Rename to `creatorEmail` and `updaterEmail`. Same on
  `AppDeployment.creator`, `Space.creator`, `Space.updater`,
  `CustomTemplate.creator`.

### M2. `defaultSourceCodePath` — what does "default" mean here?
- **File:** `model.ts:746-750`
- **Category:** Vague/generic (1), Misleading names (6)
- **Issue:** Doc says it "tracks the workspace source code path of the last
  active deployment". So the field is historical, not a default.
- **Suggestion:** Rename to `lastActiveDeploymentSourceCodePath` or
  `effectiveSourceCodePath`.

### M3. `effective*` fields paired with non-prefixed siblings
- **File:** `model.ts:751-754, 757-758, 762-763, 1331, 1341`
- **Category:** Duplicate concepts (12)
- **Issue:** `App` has paired fields: `budgetPolicyId/effectiveBudgetPolicyId`,
  `usagePolicyId/effectiveUsagePolicyId`, `userApiScopes/effectiveUserApiScopes`.
  Same on `Space`. The relationship (one is requested, the other is what
  actually applies) is not visible from the names.
- **Suggestion:** Add JSDoc explicitly distinguishing the requested vs
  effective values, or rename to `requestedBudgetPolicyId` / `appliedBudgetPolicyId`.

### M4. `userApiScopes` field name vs OAuth-scope concept
- **File:** `model.ts:754, 758, 1329-1331`
- **Category:** Vague/generic (1)
- **Issue:** `userApiScopes?: string[]`. The doc on `Space.userApiScopes` says
  "OAuth scopes for apps in the space." The TS field name says "user API
  scopes", which is neither the wire name nor the documented concept.
- **Suggestion:** Rename to `oauth2Scopes` or `userOAuth2Scopes` to make the
  protocol clear.

### M5. `command?: string[]` — what kind of command?
- **File:** `model.ts:800-801`
- **Category:** Vague/generic (1)
- **Issue:** `AppDeployment.command` is "The command with which to run the
  app." But it's an array of strings (argv-style); the name doesn't hint at
  that.
- **Suggestion:** Rename to `startCommand` (matches Docker's `CMD` ENTRYPOINT
  semantics) or `runCommand`. Adding to JSDoc is acceptable as an alternative.

### M6. `EnvVar` — too short
- **File:** `model.ts:1108`, also `index.ts:85`
- **Category:** Cryptic abbreviations (5)
- **Issue:** `EnvVar` reads as Go-style. Full TS conventions prefer
  `EnvironmentVariable` or, since it carries both name and source, more
  precisely `EnvironmentVariableSetting`. The Go SDK uses `EnvVar` because
  Go conventionally abbreviates more aggressively; the TS port doesn't
  inherit that.
- **Suggestion:** Rename to `EnvironmentVariable`. Note: this is contested by
  the `feedback_no_extra_abstractions.md` memory entry — if the rule is
  strict 1:1 with Go names, leave as-is.

### M7. `envVars` plural OK but contradicts singular-source pattern
- **File:** `model.ts:803, 1108-1122`
- **Category:** Singular/plural mismatches (9)
- **Issue:** `AppDeployment.envVars?: EnvVar[]` is plural and correct, but
  inside each `EnvVar` the `source` field is a `{$case: 'value'; value: string}
  | {$case: 'valueFrom'; valueFrom: string}` union. The latter union arm is
  `valueFrom: string` — a field name that's almost a clause (`value-from`) and
  whose direction is unclear (a path-to-fetch-from? a literal string starting
  with the word "from"?).
- **Suggestion:** Rename `valueFrom` -> `valueRef`, `secretRef`, or
  `valueSource`. Update the discriminator literal `'valueFrom'` accordingly.

### M8. `AppManifest.version: number` carries no unit
- **File:** `model.ts:821`
- **Category:** Vague/generic (1)
- **Issue:** "The manifest schema version, for now only 1 is allowed". Field
  is a bare `number`; reader has to read the doc to know it's an integer
  schema-revision number.
- **Suggestion:** Rename to `schemaVersion` and document it as a positive
  integer.

### M9. `CustomTemplate.gitRepo` vs `GitRepository` type
- **File:** `model.ts:1069-1070, 1076`
- **Category:** Cryptic abbreviations (5), Singular/plural mismatches with type name (9)
- **Issue:** `CustomTemplate.gitRepo?: string` (URL string) sits adjacent to
  the `GitRepository` interface used elsewhere. The abbreviation `gitRepo` is
  inconsistent with the full word `gitRepository` used elsewhere in the file.
- **Suggestion:** Rename to `gitRepositoryUrl` (since the field stores a URL,
  not an object reference) or align on `gitRepoUrl` package-wide.

### M10. `path` on `CustomTemplate` — path of what, where?
- **File:** `model.ts:1071-1072`
- **Category:** Vague/generic (1)
- **Issue:** `CustomTemplate.path?: string` — "The path to the template within
  the Git repository." Bare `path` is too generic for a public field.
- **Suggestion:** Rename to `templatePath` or `gitPath`.

### M11. `gitProvider?: string` — should be enum/union
- **File:** `model.ts:1075-1076, 1163-1166`
- **Category:** Vague/generic (1)
- **Issue:** `CustomTemplate.gitProvider` and `GitRepository.provider` are
  free-form strings, but the doc on `GitRepository.provider` enumerates eight
  legal values (gitHub, gitHubEnterprise, bitbucketCloud, etc.). The type
  should be a string-literal union or enum.
- **Suggestion:** Define `enum GitProvider { GIT_HUB, GIT_HUB_ENTERPRISE, ... }`
  or a string-literal union of the documented values.

### M12. `GitRepository.provider` vs `CustomTemplate.gitProvider` — same concept, different name
- **File:** `model.ts:1076, 1166`
- **Category:** Duplicate concepts (12)
- **Issue:** The Git provider name is `provider` on `GitRepository` but
  `gitProvider` on `CustomTemplate`. Two names for the same field.
- **Suggestion:** Standardise on `provider` everywhere (since the surrounding
  type makes the qualifier obvious) or on `gitProvider` (more searchable).

### M13. `AsyncUpdateAppRequest.appName` carrying a redundant nesting
- **File:** `model.ts:1021-1025`
- **Category:** Redundant suffixes (8)
- **Issue:** `AsyncUpdateAppRequest` already contains an `app: App` field, and
  separately an `appName: string` field that's just `req.app.name`. This is
  visible at `client.ts:125`: `${this.host}/api/2.0/apps/${req.appName ?? ''}`
  with no consultation of `req.app?.name`.
- **Suggestion:** Drop `appName` from `AsyncUpdateAppRequest` and read
  `req.app?.name` (as `updateApp` already does at `client.ts:828`). This is a
  semantic change; flag for discussion. Alternative: keep both and document
  which wins on conflict.

### M14. `UcSecurableType` duplicated across manifest spec and runtime resource
- **File:** `model.ts:586-591, 664-669`
- **Category:** Duplicate concepts (12)
- **Issue:** Two identical enums (`VOLUME`, `TABLE`, `FUNCTION`, `CONNECTION`)
  — one for the manifest spec, one for the runtime resource. Same value set,
  different declaration.
- **Suggestion:** Consolidate to a single `UcSecurableType` enum and reference
  it from both the manifest UC securable spec and the runtime UC securable
  resource.

### M15. UC securable permission enum on the runtime resource is a strict subset of the manifest-spec enum
- **File:** `model.ts:576-583, 654-661`
- **Category:** Duplicate concepts (12)
- **Issue:** Spec enum has 7 values (`READ_VOLUME`, `WRITE_VOLUME`, `MANAGE`,
  `SELECT`, `EXECUTE`, `USE_CONNECTION`, `MODIFY`). Resource enum has 6 — same
  list minus `MANAGE`. The relationship is undocumented; the duplication is
  fragile.
- **Suggestion:** Define one shared `UcSecurablePermission` and, if `MANAGE`
  isn't actually grantable at runtime, document that. Or define two related
  enums where one is a subset reference (not duplicated).

### M16. `AppDeployment.deploymentId` — `deployment` repeats outer type
- **File:** `model.ts:777-778`
- **Category:** Type-suffix tautology (20)
- **Issue:** Within the `AppDeployment` interface, `deploymentId` repeats the
  outer name. Inside `AppDeployment` the unqualified `id` would suffice and
  matches the pattern in `App.id`, `Space.id`, and `AppResourceJob.id`
  (correctly unqualified).
- **Suggestion:** Rename `AppDeployment.deploymentId` -> `id`.

### M17. `AppResourceSqlWarehouse.id` vs `App.id`, `Space.id` — `id` overloaded across types
- **File:** `model.ts:756, 946, 975, 1316`
- **Category:** Underspecified IDs (19)
- **Issue:** `AppResourceSqlWarehouse.id` is a SQL warehouse ID, `App.id` is an
  App ID, `AppResourceJob.id` is a Job ID, `Space.id` is a Space ID. All are
  bare `id`. JSON output serializes the same key for very different
  identifiers.
- **Suggestion:** Either accept the convention (`id` always means "the entity
  this object describes") or be explicit (`sqlWarehouseId`, `jobId`,
  `experimentId`). The package is currently inconsistent — see M16, where the
  rename runs the *opposite* direction.

### M18. `UnityCatalog` interface — generic name, no role suffix
- **File:** `model.ts:1383-1390`, also `index.ts:110`
- **Category:** Vague/generic (1)
- **Issue:** `UnityCatalog` is exported as a public type. The interface has
  three table-name fields (`logsTable`, `metricsTable`, `tracesTable`) and is
  used only as a telemetry-export destination. Exporting a type called
  `UnityCatalog` at the package boundary suggests "the Unity Catalog itself",
  which it isn't.
- **Suggestion:** Rename to `UnityCatalogTelemetryDestination` or
  `UnityCatalogTables`. Inline if not reused.

### M19. `Operation.result` carries `error` and `response` arms
- **File:** `model.ts:1292-1303`
- **Category:** Vague/generic (1)
- **Issue:** The `response` arm holds `Record<string, unknown>` — a totally
  untyped payload. The consumer at `client.ts:1010` immediately re-parses it
  through `unmarshalSpaceSchema`. The name `response` and the unknown type
  conceal what's actually inside.
- **Suggestion:** Use generics: `Operation<TResponse>` with `result: ... |
  {$case: 'response'; response: TResponse}`. Or split into
  `SpaceCreateOperation`, `SpaceDeleteOperation`, etc. Today the field name
  promises nothing.

### M20. `flattenQueryParams` — what does it flatten?
- **File:** `utils.ts:123`
- **Category:** Vague/generic (1)
- **Issue:** `flattenQueryParams(prefix, value, params)` — the function
  flattens *nested object structures* into dotted query keys
  (`a.b.c=value`). The verb "flatten" doesn't communicate the target format.
- **Suggestion:** Rename to `encodeNestedQueryParams` or
  `appendObjectAsQueryParams`.

### M21. `readAll` — local helper exported as `readAll`
- **File:** `utils.ts:40`
- **Category:** Vague/generic (1)
- **Issue:** `readAll(body: ReadableStream<Uint8Array> | null)` — reads-all of
  what? The function reads a stream to completion.
- **Suggestion:** Rename to `readStreamToBytes` or `consumeStream`. (It's not
  exported, so impact is local.)

### M22. `executeCall` vs `executeHttpCall` — pair drifts in meaning
- **File:** `utils.ts:26, 65`
- **Category:** Inconsistent action verbs (17)
- **Issue:** `executeCall` is the *outer* retry/rate-limit wrapper;
  `executeHttpCall` is the *inner* one-shot HTTP send. The function names
  suggest the former is just a generic "execute" and the latter adds HTTP, but
  in practice every concrete call goes through both. Disambiguating names
  would help.
- **Suggestion:** Rename to `runWithRetries`/`sendHttp`, or `runCall`/`sendOne`.

### M23. `StillRunningError` — internal sentinel class, named ambiguously
- **File:** `client.ts:93`
- **Category:** Misleading names (6)
- **Issue:** `class StillRunningError extends Error {}` — used as a sentinel
  to drive retries. Reads like a real domain error but has no message and is
  caught locally. Could be confused with a public error type.
- **Suggestion:** Rename to `pollAgainSentinel` (as a typed Error subclass) or
  `RetryablePollError`, and add a comment that it never escapes the file.

### M24. Method name verb inconsistency: `asyncUpdateApp` is verb-prefixed but `updateSpace` returns an `Operation` too
- **File:** `client.ts:121, 902`
- **Category:** Inconsistent action verbs (17), Verb-tense inconsistency (13)
- **Issue:** Both `asyncUpdateApp` and `updateSpace` are asynchronous,
  long-running operations that return an `AppUpdate`/`Operation` and have a
  corresponding `*Waiter`/`*Operation` companion. But `asyncUpdateApp` is
  prefixed with `async`, while `updateSpace` is not. Either both should be
  prefixed (`asyncUpdateSpace`) or neither.
- **Suggestion:** Drop the `async` prefix from `asyncUpdateApp` to match
  `updateSpace`, or add `asyncUpdateSpace` for symmetry.

### M25. `createSpaceOperation`, `deleteSpaceOperation`, `updateSpaceOperation` — `*Operation` suffix is confusing alongside the `Operation` type
- **File:** `client.ts:297, 396, 939`
- **Category:** Type-suffix tautology (20)
- **Issue:** Methods named `createSpaceOperation()` return a
  `CreateSpaceOperation` wrapper (not an `Operation` directly). A reader
  scanning autocomplete sees both `createSpace()` and
  `createSpaceOperation()` and has to read the doc to disambiguate.
- **Suggestion:** Rename the wrapper-returning method to
  `createSpaceAndWait()` or `createSpaceLongRunning()`. The `*Operation` class
  could be `*LongRunning` (mirroring the `Operation` type's role).

---

## Low-severity findings

### L1. `AppDeployment.mode` doc: "The mode of which the deployment will manage the source code."
- **File:** `model.ts:788`
- **Category:** Grammar / clarity (not in numbered categories but flagged)
- **Suggestion:** "of which" should be "in which" or "by which". A nit, not a
  rename, but flagged because it appears in the public API docs.

### L2. `App.creator` and `App.updater` — `updater` is a real English word but commonly used for libraries/tools
- **File:** `model.ts:732, 736`
- **Category:** Misleading names (6)
- **Issue:** Outside of CRUD-stamp contexts, "updater" often denotes a
  software-update agent (e.g. Sparkle). Pair with M1 — both should become
  `*Email` if that's the value type.

### L3. `App.creator` doc says "email"; `App.updater` doc agrees — but `creator` field type is just `string`
- **File:** `model.ts:731-736`
- **Category:** Field contradicting type domain (16)
- **Suggestion:** No type change available short of a branded type; document
  the format in JSDoc.

### L4. `App.url` doc: "URL of the app once it is deployed"
- **File:** `model.ts:722-723`
- **Category:** Misleading names (6)
- **Suggestion:** Rename `App.url` -> `App.appUrl` or `App.deploymentUrl` for
  clarity, especially because `GitRepository.url` is also called `url` in the
  same file. (Currently both are bare `url`.)

### L5. `GitRepository.url` — same generic `url` as `App.url`
- **File:** `model.ts:1161`
- **Category:** Generic field names (15)
- **Suggestion:** Rename to `repositoryUrl` (mirror with `GitRepository.provider`
  named more specifically).

### L6. `GitSource.resolvedCommit` — does it carry SHA or ref?
- **File:** `model.ts:1196-1202`
- **Category:** Vague/generic (1)
- **Suggestion:** Rename to `resolvedCommitSha` to match the doc, which says
  "the resolved commit SHA".

### L7. `GitSource.sourceCodePath` — verbose
- **File:** `model.ts:1191-1195`
- **Category:** Overly verbose (7)
- **Suggestion:** Inside `GitSource`, simply `path` would be unambiguous (the
  whole interface is about source location).

### L8. `AppManifest_AppResourceSpec` documentation typo: "AppResource related fields are copied from app.proto"
- **File:** `model.ts:856`
- **Category:** Doc / clarity
- **Suggestion:** Drop or rephrase the reference to `app.proto`; in TS the
  reference is meaningless.

### L9. `appFieldMask(...paths)` and `spaceFieldMask(...paths)` — global helpers
- **File:** `model.ts:2939, 3016`
- **Category:** Vague/generic (1) — qualified by entity, but
- **Issue:** Inconsistent that only `App` and `Space` get an exported helper —
  no `appDeploymentFieldMask`, despite the `AppDeployment` having an internal
  schema. Suggests the API is incomplete.
- **Suggestion:** Either expose helpers for every entity with a field-mask
  schema, or none.

### L10. `App.thumbnailUrl: string` vs `AppThumbnail.thumbnail: Uint8Array` — different mental models
- **File:** `model.ts:771, 994`
- **Category:** Duplicate concepts (12)
- **Suggestion:** Document that `thumbnailUrl` is the display URL and
  `AppThumbnail.thumbnail` is the byte content (used in
  update/delete-thumbnail requests).

### L11. `AppDeployment.envVars` carries a list of `EnvVar`, each with a `source` union — discriminator `'value'` vs `'valueFrom'`
- **File:** `model.ts:1111-1122`
- **Category:** Vague/generic (1)
- **Suggestion:** Discriminator `'value'` and `'valueFrom'` are short; consider
  `'literal'` and `'reference'` to make intent clearer. (Wire field names
  unchanged.)

### L12. `Space` interface — same name as the Genie product `AppResourceGenieSpace`
- **File:** `model.ts:938, 1306`
- **Category:** Duplicate concepts (12)
- **Issue:** `Space` (an Apps Space) and `GenieSpace` (the Genie product) share
  the "space" noun and both have a `spaceId` field. They are unrelated
  domains.
- **Suggestion:** Rename `Space` -> `AppSpace` everywhere (`AppSpace`,
  `CreateAppSpaceRequest`, `UpdateAppSpaceRequest`, `AppSpaceStatus`, etc.).
  Many of the comments in this file already say "app space" — the type name
  is the outlier. This realignment also clarifies the wire URLs
  (`/api/2.0/app-spaces/...`).

### L13. `CreateSpaceRequest`, `DeleteSpaceRequest`, `GetSpaceRequest`,
  `ListSpacesRequest`, etc., do not mention "App"
- **File:** `model.ts:1057, 1103, 1153, 1250`, also `index.ts:78, 84, 91, 100`
- **Category:** Vague/generic (1)
- **Suggestion:** Tied to L12 — rename these to `CreateAppSpaceRequest`, etc.

### L14. `ListSpacesResponse.spaces` plural is fine, but consistent with `ListAppsResponse.apps`?
- **File:** `model.ts:1232, 1258`
- **Category:** Observation — both follow the same pattern. Tied to L12 again
  for the entity rename.

### L15. `Operation.name` — server-assigned UNIQUE name, not human-readable
- **File:** `model.ts:1267-1273`
- **Category:** Misleading names (6)
- **Issue:** `Operation.name` is the operation *identifier* path
  (`operations/{unique_id}`) — distinct from `App.name` (the App entity's
  primary key, a slug) and `Space.name`. Multiple `name` semantics in the
  package.
- **Suggestion:** Rename to `operationName` or, given the format, just `path`.

### L16. `Client` class — exported as bare `Client`
- **File:** `client.ts:95`, also `index.ts:4`
- **Category:** Vague/generic (1)
- **Issue:** `import {Client} from '@databricks/sdk-apps/v1'`. Reads as "the
  Client" with no domain. If a consumer also imports `Client` from
  `@databricks/sdk-jobs`, they need an alias.
- **Suggestion:** Rename to `AppsClient`. Common SDK convention.

### L17. `host` (private field on `Client`)
- **File:** `client.ts:96`
- **Category:** Vague/generic (1)
- **Issue:** `private readonly host: string`. The doc on the workspace
  parameter usually calls this the "workspace host" or "workspace URL".
- **Suggestion:** Rename to `workspaceUrl` or `workspaceHost`. Internal-only,
  cosmetic.

### L18. `getSpaceOperation` (method) vs `GetOperationRequest`
- **File:** `client.ts:524-546`
- **Category:** Type-suffix tautology (20)
- **Issue:** `getSpaceOperation(req: GetOperationRequest)` — the method tells
  you it's a space operation, but the request type doesn't. Mismatch.
- **Suggestion:** Either `getOperation` (matching `GetOperationRequest`) or
  `GetSpaceOperationRequest` (matching the method name). The current pairing
  is asymmetric.

---

## Observations (not necessarily problems)

### O1. `App` is the primary noun; `Application*` only appears where state is concerned
This is the cleanest distinction in the package: the entity is `App` (URL,
field name `app`), and the runtime metadata is `Application*`. Resolving H1
fixes the inconsistency.

### O2. `Operation` lifecycle wrappers come in two flavours: `*Operation` and `*Waiter`
- `CreateSpaceOperation`, `DeleteSpaceOperation`, `UpdateSpaceOperation` —
  driven by `google.longrunning.Operation` (poll a separate endpoint).
- `AsyncUpdateAppWaiter`, `CreateAppDeploymentWaiter`, `CreateAppWaiter`,
  `StartAppWaiter`, `StopAppWaiter` — driven by polling the entity itself.

The two flavours are confusing as named. Consider renaming
`*Operation` -> `*LongRunning` so the difference (LRO vs status-poll) is
visible.

### O3. Field-mask helpers exist for `App` and `Space` only
`appFieldMask()` and `spaceFieldMask()` are exported; equivalents for
`AppDeployment` etc. are not. Probably intentional (only `App` and `Space`
have an update endpoint that takes a mask), but worth confirming.

### O4. Discriminated unions use `$case` — borrowed from `ts-proto` oneof
The `$case` discriminator is non-idiomatic in hand-written TS (most consumers
use plain `kind: 'X'`). Documenting this in the package README would help.

### O5. `CustomTemplate` doesn't carry "App" in its name, but it's an app template
The doc and methods make this clear (`createCustomTemplate` ->
`/api/2.0/apps-settings/templates`), but the type name is ambiguous.
Consider `AppTemplate` or `CustomAppTemplate`.

### O6. `ListSpacesRequest` doesn't take a `space` filter the way `ListAppsRequest` takes a `space` filter
Asymmetry but probably intentional.

### O7. `ListAppsRequest.space` filters by space name (string), not by
`Space` object — consistent with H4 issue.

### O8. The package re-exports the `apierr` enum locally
Per H2, this enum should live in `@databricks/sdk-databricks/apierror/codes`.
The project memory note already calls this out
(`packages/databricks/src/apierror/codes/`).

### O9. `index.ts` exports
- 26 enums
- 71 type aliases
- 8 named exports from `./client` (1 class + 7 wrapper classes)

That's 105 top-level exports. Worth checking whether the wrapper classes
(`*Operation`, `*Waiter`) need to be public or if they're implementation
detail.

---

## Domain glossary

| Term in code | What it actually means | Notes |
| ------------ | ---------------------- | ----- |
| `App` | A Databricks App (interactive application instance) | Primary entity. |
| `Application` | Runtime view of an App's process/server | Only used in `ApplicationStatus*`. See H1. |
| `AppDeployment` | A specific deployment (source-code + config snapshot) | Has its own `id`, status, lifecycle. |
| `AppManifest` | Schema describing required resources for an app | Used by `CustomTemplate`. |
| `AppResource` | A binding from an App to another Databricks resource | Discriminated union of 10 cases. |
| `Space` (`AppSpace`) | A workspace-scoped grouping of Apps | Recommended rename: `AppSpace`. See L12. |
| `GenieSpace` | Databricks Genie product — *unrelated* to App Spaces | Confusion source; see L12. |
| `CustomTemplate` | An installable app template stored in Git | Lives under `/api/2.0/apps-settings/`. |
| `Operation` | google.longrunning.Operation for Space CRUD | Only used by Space operations. See H3. |
| `Waiter` | Locally-driven status poller for App/Deployment lifecycle | Distinct from `Operation`. See O2. |
| `UcSecurable` | A Unity Catalog securable (table/volume/function/connection) | Two duplicate enums. See M14/M15. |
| `Thumbnail` | An app's display image (bytes) plus its URL | Two fields, two concepts. See L10. |
| `EnvVar` | Environment variable for the deployed app process | Short for "EnvironmentVariable". See M6. |
| `GitRepository` | Repository configuration (URL + provider + credentials) | Top-level Git config on App. |
| `GitSource` | Specific commit/branch/tag + path within a `GitRepository` | Used by deployments. |

---

## File coverage

| File | Lines read | Coverage |
| ---- | ---------- | -------- |
| `src/v1/index.ts` | 116 / 116 | 100% |
| `src/v1/utils.ts` | 151 / 151 | 100% |
| `src/v1/model.ts` | 3023 / 3023 | 100% |
| `src/v1/client.ts` | 1602 / 1602 | 100% |

All types, fields, enum values, and methods reviewed.

---

## Fixed

- #M13 `callerCredentialId` (originally cited at `model.ts:1213-1217`): Fixed in regeneration on 2026-05-20 — the `GitRepository` interface no longer carries a `callerCredentialId` field.
- #H9 `defaultGitSource` / `deploymentSource` arms (originally cited at `model.ts:760-763, 786-794`): Fixed in regeneration on 2026-05-20 — `App.defaultGitSource` and the `deploymentSource` discriminated union are gone; finding rewritten to cover the remaining two-way overlap between `defaultSourceCodePath` and `gitRepository`.
- #L15 `CreateAppDeploymentRequest.autoDeploy` (originally cited at `model.ts:1086-1089`): Fixed in regeneration on 2026-05-20 — `autoDeploy` is no longer a field on `CreateAppDeploymentRequest`.
- #L16 `GitRepository.autoDeploy` (originally cited at `model.ts:1086, 1211`): Fixed in regeneration on 2026-05-20 — `GitRepository.autoDeploy` is no longer present.
- #O7 `ApplicationStatus.runningInstances` vs `ComputeStatus.activeInstances` (originally cited at `model.ts:?`): Fixed in regeneration on 2026-05-20 — `runningInstances` no longer exists on `ApplicationStatus`.
