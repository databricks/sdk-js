# Naming Audit: `@databricks/sdk-apps` (v1)

**Package:** `apps` (`packages/apps/src/v1/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`
**Domain:** Databricks Apps — interactive applications hosted in a workspace,
with deployments, custom templates, app spaces, and resource bindings.

## Summary

| Severity | Count |
| -------- | ----- |
| High     |    11 |
| Medium   |    26 |
| Low      |    20 |
| Observation | 10 |
| **Total** | **67** |

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
- **File:** `model.ts:693, 1054`, also `index.ts:42, 76`
- **Category:** Duplicate concepts (12), Misleading names (6)
- **Issue:** The package's primary entity is `App`, but the runtime state of an
  App is modelled by a struct called `ApplicationStatus` (with enum
  `ApplicationStatus_ApplicationState` and values `APPLICATION_STATE_UNSPECIFIED`,
  etc.). On `App`, the field is `appStatus?: ApplicationStatus`, so the type
  name disagrees with the field name. There are two parallel vocabularies for
  the same idea.
- **Suggestion:** Rename `ApplicationStatus` -> `AppStatus`, the nested enum to
  `AppStatus.State` (TS namespace) or `AppState`, and the values to `RUNNING`,
  `DEPLOYING`, etc. Aligns with the `App` entity and with the `appStatus`
  field.
- **Rationale:** A consumer reading `app.appStatus: ApplicationStatus` has to
  prove to themselves that "application" and "app" refer to the same thing.

### H2. Enum-value prefix repetition
- **File:** `model.ts:516-521, 525-528, 685-690, 694-699, 703-711, 715-722`
- **Category:** Redundant enum prefixes (2), Long enum values (18)
- **Issue:** Multiple enums repeat their type name in every value:
  - `SpaceUpdateState`: `SPACE_UPDATE_STATE_UNSPECIFIED` (4 of 5 values).
  - `AppDeployment_Mode`: `MODE_UNSPECIFIED`.
  - `AppUpdate_UpdateStatus_UpdateState`: `UPDATE_STATE_UNSPECIFIED`.
  - `ApplicationStatus_ApplicationState`: `APPLICATION_STATE_UNSPECIFIED`.
  - `ComputeStatus_ComputeState`: `COMPUTE_STATE_UNSPECIFIED`.
  - `SpaceStatus_SpaceState`: `SPACE_STATE_UNSPECIFIED`, **plus every other
    value is also prefixed**: `SPACE_CREATING`, `SPACE_ACTIVE`, `SPACE_ERROR`,
    `SPACE_DELETING`, `SPACE_DELETED`, `SPACE_UPDATING`. None of the other
    state enums prefix their non-UNSPECIFIED values, so this enum is also
    internally inconsistent.
- **Suggestion:** Drop the type-name prefix from each value:
  `UNSPECIFIED`/`SUCCEEDED`/`FAILED`/`IN_PROGRESS`/`NOT_UPDATED` for the
  update-state enums; `CREATING`/`ACTIVE`/`ERROR`/`DELETING`/`DELETED`/
  `UPDATING` for `SpaceStatus_SpaceState`.
- **Rationale:** Each value is already qualified by the enum name at the use
  site (`SpaceUpdateState.UNSPECIFIED`). Google's TS style guide and the
  `@typescript-eslint/naming-convention` rule both prefer un-prefixed enum
  values.

### H3. `ErrorCode` (76 values) shipped from a package whose surface is Apps
- **File:** `model.ts:15-513`, also `index.ts:17`
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

### H4. `Operation` — generic name with no domain prefix
- **File:** `model.ts:1318`, also `index.ts:106`, `client.ts:309, 408, 536, 951`
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

### H5. `space` string field on `App` vs `spaceId` — which is the identifier?
- **File:** `model.ts:786-790`, `client.ts:624-626`
- **Category:** Underspecified IDs (19), Misleading names (6), Generic field names (15)
- **Issue:** `App` has two fields:
  - `space?: string` ("Name of the space this app belongs to")
  - `spaceId?: string` ("The ID of the app space this app belongs to")
  These are both stringly-typed and distinguishable only by the documentation.
  `ListAppsRequest.space` is also a `string` filter that takes the space
  *name*. The bare `space` field looks like it should be a `Space` object
  rather than a string handle.
- **Suggestion:** Rename `space` -> `spaceName` to mirror `spaceId` and to
  reduce confusion with the `Space` interface. Update
  `ListAppsRequest.space` -> `spaceName` to match.
- **Rationale:** A field literally named after a type (`space: string` next to
  `interface Space`) violates the "field contradicting type domain" rule.

### H6. `name` is the App's primary key, not `id` — ambiguous identifier
- **File:** `model.ts:725-729, 768-769, 1132-1135, 1176-1180`
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

### H7. Inconsistent value sets across sibling "state of an async op" enums
- **File:** `model.ts:524, 684, 515`
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

### H8. `oauth2AppIntegrationId` / `oauth2AppClientId` — digit-embedded acronym
- **File:** `model.ts:772-773`
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

### H9. `defaultGitSource` / `defaultSourceCodePath` / `gitRepository` — three coexisting "source" concepts on `App`
- **File:** `model.ts:760-763, 776-781, 786-794`
- **Category:** Duplicate concepts (12), Misleading names (6)
- **Issue:** `App` has all of:
  - `defaultSourceCodePath?: string`
  - `defaultGitSource?: GitSource`
  - `gitRepository?: GitRepository`
  - `deploymentSource` discriminated union of `sourceCodePath | gitSource`
  This creates four overlapping ways to describe deployment provenance.
- **Suggestion:** Treat the `default*` pair as the historical (last-deployed)
  data; rename to `lastDeploymentSourceCodePath` / `lastDeploymentGitSource`
  to mirror `lastDeploymentId`. Then `gitRepository` is the per-app
  configuration, and `deploymentSource` is the union for *new* deployments —
  three clearly differentiated roles.
- **Rationale:** Today a reader can't tell whether `defaultGitSource` is the
  default for new deployments, the most-recently-used source, or the
  registered repo. The Go doc comment on the field clarifies it tracks the
  last active deployment, but the name does not.

### H10. `noCompute` boolean on `CreateAppRequest`
- **File:** `model.ts:1091-1095`
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

### H11. Singular `permission` field holding a single value but documented as plural permissions
- **File:** `model.ts:866-869, 984-989`
- **Category:** Singular/plural mismatches (9)
- **Issue:** `AppManifest_AppResourceJobSpec.permission?: ...JobPermission`
  has doc text `Permissions to grant on the Job. Supported permissions are:
  "CAN_MANAGE", "IS_OWNER", "CAN_MANAGE_RUN", "CAN_VIEW".` Same pattern in
  `AppResourceJob.permission` (line 987). The field name is singular but the
  doc says "Permissions" (plural) and lists four. The same hybrid singular/
  plural language appears in seven other resource specs.
- **Suggestion:** Either (a) make the field plural and convert it to an array
  if multiple values can be granted, or (b) keep singular and reword the doc to
  "Permission to grant on the job. One of: ...". Today the singular type
  enforces (b) — the doc should match.
- **Rationale:** The doc text contradicts the type signature, so consumers
  reading either will be misled.

---

## Medium-severity findings

### M1. `creator` / `updater` — bare-noun fields holding emails
- **File:** `model.ts:744, 748, 818, 820, 1372, 1376`
- **Category:** Generic field names (15), Misleading names (6)
- **Issue:** `creator?: string` is documented as "The email of the user that
  created the app". The field name suggests an identity or a user object, but
  the value is specifically an email address.
- **Suggestion:** Rename to `creatorEmail` and `updaterEmail`. Same on
  `AppDeployment.creator`, `Space.creator`, `Space.updater`,
  `CustomTemplate.creator`.

### M2. `defaultSourceCodePath` — what does "default" mean here?
- **File:** `model.ts:760-762`
- **Category:** Vague/generic (1), Misleading names (6)
- **Issue:** Doc says it "tracks the workspace source code path of the last
  active deployment". So the field is historical, not a default.
- **Suggestion:** Rename to `lastActiveDeploymentSourceCodePath` or
  `effectiveSourceCodePath`. Same critique for `defaultGitSource`.

### M3. `effective*` fields paired with non-prefixed siblings
- **File:** `model.ts:764-771, 775-776, 1382, 1392`
- **Category:** Duplicate concepts (12)
- **Issue:** `App` has paired fields: `budgetPolicyId/effectiveBudgetPolicyId`,
  `usagePolicyId/effectiveUsagePolicyId`, `userApiScopes/effectiveUserApiScopes`.
  Same on `Space`. The relationship (one is requested, the other is what
  actually applies) is not visible from the names.
- **Suggestion:** Add JSDoc explicitly distinguishing the requested vs
  effective values, or rename to `requestedBudgetPolicyId` / `appliedBudgetPolicyId`.

### M4. `userApiScopes` field name vs OAuth-scope concept
- **File:** `model.ts:767, 770-771, 1380-1382`
- **Category:** Vague/generic (1)
- **Issue:** `userApiScopes?: string[]`. The doc on `Space.userApiScopes` says
  "OAuth scopes for apps in the space." The TS field name says "user API
  scopes", which is neither the wire name nor the documented concept.
- **Suggestion:** Rename to `oauth2Scopes` or `userOAuth2Scopes` to make the
  protocol clear.

### M5. `command?: string[]` — what kind of command?
- **File:** `model.ts:821-822`
- **Category:** Vague/generic (1)
- **Issue:** `AppDeployment.command` is "The command with which to run the
  app." But it's an array of strings (argv-style); the name doesn't hint at
  that.
- **Suggestion:** Rename to `startCommand` (matches Docker's `CMD` ENTRYPOINT
  semantics) or `runCommand`. Adding to JSDoc is acceptable as an alternative.

### M6. `EnvVar` — too short
- **File:** `model.ts:1152`, also `index.ts:89`
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
- **File:** `model.ts:824, 1152-1166`
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
- **File:** `model.ts:842`
- **Category:** Vague/generic (1)
- **Issue:** "The manifest schema version, for now only 1 is allowed". Field
  is a bare `number`; reader has to read the doc to know it's an integer
  schema-revision number.
- **Suggestion:** Rename to `schemaVersion` and document it as a positive
  integer.

### M9. `CustomTemplate.gitRepo` vs `GitRepository` type
- **File:** `model.ts:1113-1114, 1120`
- **Category:** Cryptic abbreviations (5), Singular/plural mismatches with type name (9)
- **Issue:** `CustomTemplate.gitRepo?: string` (URL string) sits adjacent to
  the `GitRepository` interface used elsewhere. The abbreviation `gitRepo` is
  inconsistent with the full word `gitRepository` used 6 times in the file.
- **Suggestion:** Rename to `gitRepositoryUrl` (since the field stores a URL,
  not an object reference) or align on `gitRepoUrl` package-wide.

### M10. `path` on `CustomTemplate` — path of what, where?
- **File:** `model.ts:1115-1116`
- **Category:** Vague/generic (1)
- **Issue:** `CustomTemplate.path?: string` — "The path to the template within
  the Git repository." Bare `path` is too generic for a public field.
- **Suggestion:** Rename to `templatePath` or `gitPath`.

### M11. `gitProvider?: string` — should be enum/union
- **File:** `model.ts:1119-1120, 1207-1210`
- **Category:** Vague/generic (1)
- **Issue:** `CustomTemplate.gitProvider` and `GitRepository.provider` are
  free-form strings, but the doc on `GitRepository.provider` enumerates eight
  legal values (gitHub, gitHubEnterprise, bitbucketCloud, etc.). The type
  should be a string-literal union or enum.
- **Suggestion:** Define `enum GitProvider { GIT_HUB, GIT_HUB_ENTERPRISE, ... }`
  or a string-literal union of the documented values.

### M12. `GitRepository.provider` vs `CustomTemplate.gitProvider` — same concept, different name
- **File:** `model.ts:1119, 1210`
- **Category:** Duplicate concepts (12)
- **Issue:** The Git provider name is `provider` on `GitRepository` but
  `gitProvider` on `CustomTemplate`. Two names for the same field.
- **Suggestion:** Standardise on `provider` everywhere (since the surrounding
  type makes the qualifier obvious) or on `gitProvider` (more searchable).

### M13. `callerCredentialId?: number` on `GitRepository`
- **File:** `model.ts:1213-1217`
- **Category:** Underspecified IDs (19)
- **Issue:** `callerCredentialId: number` — a numeric ID with no domain prefix.
  "caller" is also a vague qualifier; the doc says it's "a personal access
  token Git credential".
- **Suggestion:** Rename to `gitCredentialId` or `callerGitCredentialId`. Note
  also: the marshal layer keeps it as a number, but every other ID field in
  this package is a string (`servicePrincipalId` is the only other number-ID,
  matching Go's int64). Verify the wire type.

### M14. `appName` field name in `AsyncUpdateAppRequest` carrying a redundant nesting
- **File:** `model.ts:1063-1067`
- **Category:** Redundant suffixes (8)
- **Issue:** `AsyncUpdateAppRequest` already contains an `app: App` field, and
  separately an `appName: string` field that's just `req.app.name`. This is
  visible at `client.ts:125`: `${this.host}/api/2.0/apps/${req.appName ?? ''}`
  with no consultation of `req.app?.name`.
- **Suggestion:** Drop `appName` from `AsyncUpdateAppRequest` and read
  `req.app?.name` (as `updateApp` already does at `client.ts:840`). This is a
  semantic change; flag for discussion. Alternative: keep both and document
  which wins on conflict.

### M15. `UcSecurableType` duplicated across manifest spec and runtime resource
- **File:** `model.ts:598-603, 676-681`
- **Category:** Duplicate concepts (12)
- **Issue:** Two identical enums (`VOLUME`, `TABLE`, `FUNCTION`, `CONNECTION`)
  — one for the manifest spec, one for the runtime resource. Same value set,
  different declaration.
- **Suggestion:** Consolidate to a single `UcSecurableType` enum and reference
  it from both the manifest UC securable spec and the runtime UC securable
  resource.

### M16. UC securable permission enum on the runtime resource is a strict subset of the manifest-spec enum
- **File:** `model.ts:587-595, 666-673`
- **Category:** Duplicate concepts (12)
- **Issue:** Spec enum has 7 values (`READ_VOLUME`, `WRITE_VOLUME`, `MANAGE`,
  `SELECT`, `EXECUTE`, `USE_CONNECTION`, `MODIFY`). Resource enum has 6 — same
  list minus `MANAGE`. The relationship is undocumented; the duplication is
  fragile.
- **Suggestion:** Define one shared `UcSecurablePermission` and, if `MANAGE`
  isn't actually grantable at runtime, document that. Or define two related
  enums where one is a subset reference (not duplicated).

### M17. `AppDeployment.deploymentId` — `deployment` repeats outer type
- **File:** `model.ts:798-799`
- **Category:** Type-suffix tautology (20)
- **Issue:** Within the `AppDeployment` interface, `deploymentId` repeats the
  outer name. Inside `AppDeployment` the unqualified `id` would suffice and
  matches the pattern in `App.id`, `Space.id`, and `AppResourceJob.id`
  (correctly unqualified).
- **Suggestion:** Rename `AppDeployment.deploymentId` -> `id`.

### M18. `AppResourceSqlWarehouse.id` vs `App.id`, `Space.id` — `id` overloaded across types
- **File:** `model.ts:1015, 769, 1368, 1900`
- **Category:** Underspecified IDs (19)
- **Issue:** `AppResourceSqlWarehouse.id` is a SQL warehouse ID, `App.id` is an
  App ID, `AppResourceJob.id` is a Job ID. All are bare `id`. JSON output
  serializes the same key for very different identifiers.
- **Suggestion:** Either accept the convention (`id` always means "the entity
  this object describes") or be explicit (`sqlWarehouseId`, `jobId`,
  `experimentId`). The package is currently inconsistent — see M17, where the
  rename runs the *opposite* direction.

### M19. `UnityCatalog` interface — generic name, no role suffix
- **File:** `model.ts:1434-1441`, also `index.ts:114`
- **Category:** Vague/generic (1)
- **Issue:** `UnityCatalog` is exported as a public type. The interface has
  three table-name fields (`logsTable`, `metricsTable`, `tracesTable`) and is
  used only as a telemetry-export destination. Exporting a type called
  `UnityCatalog` at the package boundary suggests "the Unity Catalog itself",
  which it isn't.
- **Suggestion:** Rename to `UnityCatalogTelemetryDestination` or
  `UnityCatalogTables`. Inline if not reused.

### M20. `Operation.result` carries `error` and `response` arms
- **File:** `model.ts:1343-1354`
- **Category:** Vague/generic (1)
- **Issue:** The `response` arm holds `Record<string, unknown>` — a totally
  untyped payload. The consumer at `client.ts:1022` immediately re-parses it
  through `unmarshalSpaceSchema`. The name `response` and the unknown type
  conceal what's actually inside.
- **Suggestion:** Use generics: `Operation<TResponse>` with `result: ... |
  {$case: 'response'; response: TResponse}`. Or split into
  `SpaceCreateOperation`, `SpaceDeleteOperation`, etc. Today the field name
  promises nothing.

### M21. `flattenQueryParams` — what does it flatten?
- **File:** `utils.ts:123`
- **Category:** Vague/generic (1)
- **Issue:** `flattenQueryParams(prefix, value, params)` — the function
  flattens *nested object structures* into dotted query keys
  (`a.b.c=value`). The verb "flatten" doesn't communicate the target format.
- **Suggestion:** Rename to `encodeNestedQueryParams` or
  `appendObjectAsQueryParams`.

### M22. `readAll` — local helper exported as `readAll`
- **File:** `utils.ts:40`
- **Category:** Vague/generic (1)
- **Issue:** `readAll(body: ReadableStream<Uint8Array> | null)` — reads-all of
  what? The function reads a stream to completion.
- **Suggestion:** Rename to `readStreamToBytes` or `consumeStream`. (It's not
  exported, so impact is local.)

### M23. `executeCall` vs `executeHttpCall` — pair drifts in meaning
- **File:** `utils.ts:26, 65`
- **Category:** Inconsistent action verbs (17)
- **Issue:** `executeCall` is the *outer* retry/rate-limit wrapper;
  `executeHttpCall` is the *inner* one-shot HTTP send. The function names
  suggest the former is just a generic "execute" and the latter adds HTTP, but
  in practice every concrete call goes through both. Disambiguating names
  would help.
- **Suggestion:** Rename to `runWithRetries`/`sendHttp`, or `runCall`/`sendOne`.

### M24. `StillRunningError` — internal sentinel class, named ambiguously
- **File:** `client.ts:93`
- **Category:** Misleading names (6)
- **Issue:** `class StillRunningError extends Error {}` — used as a sentinel
  to drive retries. Reads like a real domain error but has no message and is
  caught locally. Could be confused with a public error type.
- **Suggestion:** Rename to `pollAgainSentinel` (as a typed Error subclass) or
  `RetryablePollError`, and add a comment that it never escapes the file.

### M25. Method name verb inconsistency: `asyncUpdateApp` is verb-prefixed but `updateSpace` returns an `Operation` too
- **File:** `client.ts:121, 914`
- **Category:** Inconsistent action verbs (17), Verb-tense inconsistency (13)
- **Issue:** Both `asyncUpdateApp` and `updateSpace` are asynchronous,
  long-running operations that return an `AppUpdate`/`Operation` and have a
  corresponding `*Waiter`/`*Operation` companion. But `asyncUpdateApp` is
  prefixed with `async`, while `updateSpace` is not. Either both should be
  prefixed (`asyncUpdateSpace`) or neither.
- **Suggestion:** Drop the `async` prefix from `asyncUpdateApp` to match
  `updateSpace`, or add `asyncUpdateSpace` for symmetry.

### M26. `createSpaceOperation`, `deleteSpaceOperation`, `updateSpaceOperation` — `*Operation` suffix is confusing alongside the `Operation` type
- **File:** `client.ts:309, 408, 951`
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
- **File:** `model.ts:809`
- **Category:** Grammar / clarity (not in numbered categories but flagged)
- **Suggestion:** "of which" should be "in which" or "by which". A nit, not a
  rename, but flagged because it appears in the public API docs.

### L2. `App.creator` and `App.updater` — `updater` is a real English word but commonly used for libraries/tools
- **File:** `model.ts:746-748`
- **Category:** Misleading names (6)
- **Issue:** Outside of CRUD-stamp contexts, "updater" often denotes a
  software-update agent (e.g. Sparkle). Pair with M1 — both should become
  `*Email` if that's the value type.

### L3. `App.creator` doc says "email"; `App.updater` doc agrees — but `creator` field type is just `string`
- **File:** `model.ts:743-748`
- **Category:** Field contradicting type domain (16)
- **Suggestion:** No type change available short of a branded type; document
  the format in JSDoc.

### L4. `App.url` doc: "URL of the app once it is deployed"
- **File:** `model.ts:734-735`
- **Category:** Misleading names (6)
- **Suggestion:** Rename `App.url` -> `App.appUrl` or `App.deploymentUrl` for
  clarity, especially because `GitRepository.url` is also called `url` in the
  same file. (Currently both are bare `url`.)

### L5. `GitRepository.url` — same generic `url` as `App.url`
- **File:** `model.ts:1205`
- **Category:** Generic field names (15)
- **Suggestion:** Rename to `repositoryUrl` (mirror with `GitRepository.provider`
  named more specifically).

### L6. `GitSource.resolvedCommit` — does it carry SHA or ref?
- **File:** `model.ts:1248-1253`
- **Category:** Vague/generic (1)
- **Suggestion:** Rename to `resolvedCommitSha` to match the doc, which says
  "the resolved commit SHA".

### L7. `GitSource.sourceCodePath` — verbose
- **File:** `model.ts:1242-1246`
- **Category:** Overly verbose (7)
- **Suggestion:** Inside `GitSource`, simply `path` would be unambiguous (the
  whole interface is about source location).

### L8. `AppManifest_AppResourceSpec` documentation typo: "AppResource related fields are copied from app.proto"
- **File:** `model.ts:894-895`
- **Category:** Doc / clarity
- **Suggestion:** Drop or rephrase the reference to `app.proto`; in TS the
  reference is meaningless.

### L9. `appFieldMask(...paths)` and `spaceFieldMask(...paths)` — global helpers
- **File:** `model.ts:3131, 3211`
- **Category:** Vague/generic (1) — qualified by entity, but
- **Issue:** Inconsistent that only `App` and `Space` get an exported helper —
  no `appDeploymentFieldMask`, despite the `AppDeployment` having an internal
  schema. Suggests the API is incomplete.
- **Suggestion:** Either expose helpers for every entity with a field-mask
  schema, or none.

### L10. `App.thumbnailUrl: string` vs `AppThumbnail.thumbnail: Uint8Array` — different mental models
- **File:** `model.ts:783-784, 1032-1035`
- **Category:** Duplicate concepts (12)
- **Suggestion:** Document that `thumbnailUrl` is the display URL and
  `AppThumbnail.thumbnail` is the byte content (used in
  update/delete-thumbnail requests).

### L11. `AppDeployment.envVars` carries a list of `EnvVar`, each with a `source` union — discriminator `'value'` vs `'valueFrom'`
- **File:** `model.ts:1156-1166`
- **Category:** Vague/generic (1)
- **Suggestion:** Discriminator `'value'` and `'valueFrom'` are short; consider
  `'literal'` and `'reference'` to make intent clearer. (Wire field names
  unchanged.)

### L12. `Space` interface — same name as the Genie product `AppResourceGenieSpace`
- **File:** `model.ts:1357, 978-982`
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
- **File:** `model.ts:1101, 1147, 1197, 1301`, also `index.ts:82-88, 105`
- **Category:** Vague/generic (1)
- **Suggestion:** Tied to L12 — rename these to `CreateAppSpaceRequest`, etc.

### L14. `ListSpacesResponse.spaces` plural is fine, but consistent with `ListAppsResponse.apps`?
- **File:** `model.ts:1308-1312, 1282-1286`
- **Category:** Observation — both follow the same pattern. Tied to L12 again
  for the entity rename.

### L15. `CreateAppDeploymentRequest.autoDeploy` doc: "Whether to enable automatic deployments on push events to the git repository"
- **File:** `model.ts:1086-1089`
- **Category:** Misleading names (6)
- **Issue:** The field name suggests "deploy automatically now". The doc says
  it sets up a webhook. These are very different ideas.
- **Suggestion:** Rename to `enableAutoDeploy` or `webhookAutoDeploy`.

### L16. `GitRepository.autoDeploy` vs `CreateAppDeploymentRequest.autoDeploy`
- **File:** `model.ts:1086, 1211`
- **Category:** Duplicate concepts (12)
- **Issue:** Two `autoDeploy` fields in the same file: one on the deployment
  request, one on the repository. They probably express the same setting at
  different layers, but neither says so.
- **Suggestion:** Document the relationship in JSDoc; if they're the same
  state, only one should exist.

### L17. `Operation.name` — server-assigned UNIQUE name, not human-readable
- **File:** `model.ts:1319-1324`
- **Category:** Misleading names (6)
- **Issue:** `Operation.name` is the operation *identifier* path
  (`operations/{unique_id}`) — distinct from `App.name` (the App entity's
  primary key, a slug) and `Space.name`. Multiple `name` semantics in the
  package.
- **Suggestion:** Rename to `operationName` or, given the format, just `path`.

### L18. `Client` class — exported as bare `Client`
- **File:** `client.ts:95`, also `index.ts:4`
- **Category:** Vague/generic (1)
- **Issue:** `import {Client} from '@databricks/sdk-apps/v1'`. Reads as "the
  Client" with no domain. If a consumer also imports `Client` from
  `@databricks/sdk-jobs`, they need an alias.
- **Suggestion:** Rename to `AppsClient`. Common SDK convention.

### L19. `host` (private field on `Client`)
- **File:** `client.ts:96`
- **Category:** Vague/generic (1)
- **Issue:** `private readonly host: string`. The doc on the workspace
  parameter usually calls this the "workspace host" or "workspace URL".
- **Suggestion:** Rename to `workspaceUrl` or `workspaceHost`. Internal-only,
  cosmetic.

### L20. `getSpaceOperation` (method) vs `GetOperationRequest`
- **File:** `client.ts:536-558`
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

### O7. `ApplicationStatus.runningInstances` vs `ComputeStatus.activeInstances`
Two related counts, different verbs. `runningInstances` for app process,
`activeInstances` for compute resources. Document the distinction.

### O8. `ListAppsRequest.space` filters by space name (string), not by
`Space` object — consistent with H5 issue.

### O9. The package re-exports the `apierr` enum locally
Per H3, this enum should live in `@databricks/sdk-databricks/apierror/codes`.
The project memory note already calls this out
(`packages/databricks/src/apierror/codes/`).

### O10. `index.ts` exports
- 18 enums
- 51 type aliases
- 8 named exports from `./client` (1 class + 7 wrapper classes)

That's 77 top-level exports. Worth checking whether the wrapper classes
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
| `Operation` | google.longrunning.Operation for Space CRUD | Only used by Space operations. See H4. |
| `Waiter` | Locally-driven status poller for App/Deployment lifecycle | Distinct from `Operation`. See O2. |
| `UcSecurable` | A Unity Catalog securable (table/volume/function/connection) | Two duplicate enums. See M15/M16. |
| `Thumbnail` | An app's display image (bytes) plus its URL | Two fields, two concepts. See L10. |
| `EnvVar` | Environment variable for the deployed app process | Short for "EnvironmentVariable". See M6. |
| `GitRepository` | Repository configuration (URL + provider + credentials) | Top-level Git config on App. |
| `GitSource` | Specific commit/branch/tag + path within a `GitRepository` | Used by deployments. |

---

## File coverage

| File | Lines read | Coverage |
| ---- | ---------- | -------- |
| `src/v1/index.ts` | 120 / 120 | 100% |
| `src/v1/utils.ts` | 151 / 151 | 100% |
| `src/v1/model.ts` | 3219 / 3219 | 100% |
| `src/v1/client.ts` | 1615 / 1615 | 100% |

All types, fields, enum values, and methods reviewed.
