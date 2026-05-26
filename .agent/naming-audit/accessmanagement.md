# Naming Audit: accessmanagement

**Path:** `packages/accessmanagement/src/v1/`
**Versions audited:** v1
**Inferred domain:** Consolidated IAM / authorization surface for Databricks.
Combines four formerly-separate packages into one v1: (a) workspace-object
permissions (the `getObjectPermissions` / `setObjectPermissions` /
`updateObjectPermissions` / `getPermissionLevels` cluster — ACLs on clusters,
jobs, notebooks, dashboards, pipelines, registered models, etc.); (b)
account-level rule sets that bind roles to principals on accounts, groups,
service principals, and tag policies (`getRuleSet` / `updateRuleSet` /
`getAssignableRolesForResource`); (c) workspace-permission assignments —
the `USER`/`ADMIN` role a principal holds on a workspace
(`getWorkspacePermissionAssignments` / `updateWorkspacePermissionAssignment`
/ `deleteWorkspacePermissionAssignment` / `listWorkspacePermissions`); and
(d) the `checkPolicy` resource-access policy decision endpoint. Originated
from `permissions`, `workspaceassignment`, `accountaccesscontrol`, and
`accountaccesscontrolproxy` during the 2026-05-22 regeneration.
**Total weird names flagged:** 31

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 11 |
| Low | 9 |
| Observation | 4 |

The consolidation has eliminated several prior warts (top-level verb-shaped
request types from `permissions` now carry `Request` suffixes; the
`accountaccesscontrolproxy` package surface no longer exists as a separate
package). What persists is the entire load of the prior four audits stacked
together: a 20-member `PermissionLevel` enum with `CAN_*` redundancy and
object-type-specific values leaking into a universal namespace; four
proto-style `*Request_Response` nested message types; three `*Output`
suffix types; `requestObjectType` / `requestObjectId` stringly-typed closed
enum prefixes; a `Proxy`-suffixed duplicate-method cluster around
`getAssignableRolesForResource` / `getRuleSet` / `updateRuleSet`; an
`UNKNOWN` zero-value sentinel that contradicts the `*_UNSPECIFIED` form used
on the same file's `RequestAuthzIdentity` enum; and a half-dozen
duplicate-shape concerns (`PermissionsResponse` vs `WorkspacePermissionAssignmentOutput`
vs the iam `WorkspaceAssignmentDetail`).

The merger also introduces new collisions: `permissions` now means three
different things in three different response shapes
(`PermissionsResponse.accessControlList` vs
`ListWorkspacePermissionsRequest_Response.permissions` vs
`WorkspacePermissionAssignmentOutput.permissions`), and the `PermissionLevel`
enum (per-object permissions) sits alongside the `WorkspacePermission` enum
(per-workspace USER/ADMIN) with overlapping vocabulary but disjoint scope.

---

## High severity

### 1. `PermissionLevel` enum values share a redundant `CAN_` action-verb prefix — `src/v1/model.ts:6-27`
- **Why weird:** Of 20 values, 19 begin with `CAN_` (`CAN_MANAGE`,
  `CAN_RESTART`, `CAN_ATTACH_TO`, `CAN_MANAGE_RUN`, `CAN_VIEW`, `CAN_READ`,
  `CAN_RUN`, `CAN_EDIT`, `CAN_USE`, `CAN_BIND`, `CAN_QUERY`, `CAN_MONITOR`,
  `CAN_CREATE`, `CAN_MONITOR_ONLY`, `CAN_CREATE_APP`, `CAN_EDIT_METADATA`,
  `CAN_VIEW_METADATA`, `CAN_MANAGE_STAGING_VERSIONS`,
  `CAN_MANAGE_PRODUCTION_VERSIONS`); the lone exception is `IS_OWNER`,
  which uses a copula+predicate form. The `CAN_` modal verb is implied by
  membership in `PermissionLevel` — a `PermissionLevel` is, by definition,
  what the principal can do — so it is content-free on every value. This is
  distinct from the proto-style enum-name prefix; here the redundancy is on
  the action verb shared by 19 of 20 members. Mixing `CAN_*` with
  `IS_OWNER` also breaks within-enum consistency.
- **Category:** Redundant action-verb prefix on enum members; within-enum
  inconsistency.
- **Suggested name:** Drop the `CAN_` action-verb prefix: `MANAGE`,
  `RESTART`, `ATTACH_TO`, `MANAGE_RUN`, `VIEW`, `READ`, `RUN`, `EDIT`,
  `USE`, etc. `IS_OWNER` becomes `OWNER`.
- **Rationale:** Compare `Visibility { PUBLIC, PRIVATE }` vs
  `Visibility { IS_PUBLIC, IS_PRIVATE }`. The latter is comically redundant.
  `PermissionLevel.MANAGE` is shorter and just as unambiguous as
  `PermissionLevel.CAN_MANAGE`.

### 2. `CAN_MANAGE_STAGING_VERSIONS` / `CAN_MANAGE_PRODUCTION_VERSIONS` / `CAN_CREATE_APP` — `src/v1/model.ts:17,18,26`
- **Why weird:** Three values are specific to one object type each
  (`registered-models` in MLflow Model Registry, and Databricks Apps), but
  live in a universal `PermissionLevel` enum applicable to 25+ object
  types. Equivalent to having `CAN_MANAGE_DASHBOARD_DRAFTS` or
  `CAN_MANAGE_NOTEBOOK_REVISIONS` in the same enum: the values are scoped
  to one domain but visible to all. `CAN_CREATE_APP` also breaks the
  pattern where other `CAN_CREATE` values are noun-less.
- **Category:** Within-enum inconsistency — most values are
  object-type-agnostic, these three leak object-type semantics into the
  enum.
- **Suggested name:** Move these into per-object-type sub-enums, or at
  minimum add JSDoc declaring their scope ("Applies to
  `registered-models` only", "Applies to Databricks Apps only").
- **Rationale:** Universal enum + object-specific values is a
  discoverability hazard; users browsing autocomplete will see these as
  valid choices for clusters, jobs, and dashboards.

### 3. `RequestAuthzIdentity` enum and `REQUEST_AUTHZ_IDENTITY_*` member prefix; `Authz` truncation — `src/v1/model.ts:33-37`
- **Why weird:** The type name starts with `Request` — a wire-format
  message prefix (`RequestAuthzIdentity` reads as "the AuthzIdentity field
  on a request message"). The mid-name truncation `Authz` (instead of
  `Authorization`) is a Go-style abbreviation that does not match the rest
  of the package, which spells out `permission` and `permissionLevel` in
  full. The members re-state the entire enum name as a SCREAMING_SNAKE
  prefix: `REQUEST_AUTHZ_IDENTITY_USER_CONTEXT`,
  `REQUEST_AUTHZ_IDENTITY_SERVICE_IDENTITY` — wasted call-site characters.
- **Category:** Proto-architectural leak (`Request` prefix on a domain
  enum), cryptic abbreviation (`Authz`).
- **Suggested name:** `AuthorizationIdentity` (or simply
  `AuthIdentity`/`CallerIdentity`) with members `USER_CONTEXT`,
  `SERVICE_IDENTITY`.
- **Rationale:** The `Request` prefix on a type that names a domain concept
  (who the policy check is on behalf of) is wire-shape leakage from the
  containing `CheckPolicyRequest`. The `Authz` truncation is fine in code
  comments but jars on a public, exported enum.

### 4. `requestObjectType: string` is a stringly-typed closed enum — `src/v1/model.ts:156,163,340,348`
- **Why weird:** Every request type carries
  `requestObjectType?: string | undefined`. The JSDoc on each occurrence
  lists 26 valid string values verbatim: `"alerts, alertsv2, authorization,
  clusters, cluster-policies, dashboards, database-projects,
  dbsql-dashboards, directories, experiments, files, genie, instance-pools,
  jobs, knowledge-assistants, notebooks, pipelines, queries,
  registered-models, repos, serving-endpoints, supervisor-agents,
  vector-search-endpoints, or warehouses"`. The set is closed,
  well-known to the server, and stable — a perfect fit for a string
  literal union. The TS SDK ships it as bare `string` with no autocomplete
  or compile-time validation. A typo (`"cluster"` instead of `"clusters"`)
  silently 4xxs at runtime.
- **Category:** Underspecified ID; cryptic/loose typing; generic field
  name (`requestObjectType`).
- **Suggested name:** Define
  `type RequestObjectType = 'alerts' | 'alertsv2' | 'authorization' | 'clusters' | 'cluster-policies' | ... | 'warehouses'`
  (string literal union, 26 entries).
- **Rationale:** This is the single biggest TS-affordance miss in the
  package. The Go SDK uses `string` because Go enums are second-class; TS
  has first-class string literal unions that match this exact use case.

### 5. `getAssignableRolesForResourceProxy`, `getRuleSetProxy`, `updateRuleSetProxy` — `src/v1/client.ts:255,329,395`
- **Why weird:** Three methods carry the `Proxy` suffix and are
  byte-for-byte identical to their non-`Proxy` siblings (lines 218, 292,
  366). They issue the same HTTP request to the same URL with the same
  headers. The `Proxy` suffix communicates an architectural concept —
  these are the same operation routed through a proxy server in the
  Databricks control plane — that has zero meaning for a TypeScript SDK
  caller. The same finding triggered the prior
  `accountaccesscontrolproxy` package removal; the duplicate-method
  echo of it now lives inside this package.
- **Category:** Proto-architectural / backend-routing leak; duplicate
  concept exposed twice.
- **Suggested name:** Delete the `*Proxy` variants entirely. If the
  proxy-routing distinction matters server-side, the server can route the
  same URL internally; the client should not surface it.
- **Rationale:** Method-name suffixes should describe what the operation
  does, not how the server routes it. Two identical methods with a
  `Proxy` differentiator force every caller to flip a coin.

### 6. `WorkspacePermission.UNKNOWN` zero-value sentinel — `src/v1/model.ts:40`
- **Why weird:** `WorkspacePermission` uses `UNKNOWN` as its zero-value
  sentinel, but the sibling enum `RequestAuthzIdentity` in the same file
  uses the `*_UNSPECIFIED` form (`REQUEST_AUTHZ_IDENTITY_UNSPECIFIED`,
  line 34), and every other enum across this SDK uses `*_UNSPECIFIED` as
  well (e.g., `WORKSPACE_PERMISSION_UNSPECIFIED` in the now-removed iam
  mirror). One enum, one file, two sentinel conventions.
- **Category:** Within-package inconsistency (same file, two sentinel
  conventions).
- **Suggested name:** `WORKSPACE_PERMISSION_UNSPECIFIED`.
- **Rationale:** Same-file inconsistency is the worst kind. Aligning with
  the rest of the file (and the rest of the SDK) costs nothing.

### 7. `Client` — `src/v1/client.ts:69`
- **Why weird:** Top-level class named `Client`. Generic across every
  generated package. The merger makes this worse: this class now exposes
  the *combined* surface of four formerly-distinct services
  (permissions, workspaceassignment, accountaccesscontrol,
  accountaccesscontrolproxy). A consumer importing `Client` from this
  package has no surface-level cue what it does. Users importing
  `Client` from multiple permission-adjacent packages still have to
  alias.
- **Category:** Vague top-level identifier; cross-package collision.
- **Suggested name:** `AccessManagementClient` (matches the package name)
  or, given the breadth of the surface, split the class along its four
  composed services.
- **Rationale:** SDK convention in AWS, Azure, and GitHub Octokit is
  service-prefixed client class names. Project-wide pattern — flag here as
  highest-leverage location.

---

## Medium severity

### 8. `RuleSet` vs `RuleSetUpdateRequest` (duplicate body shape) — `src/v1/model.ts:306,322`
- **Why weird:** `RuleSet` and `RuleSetUpdateRequest` are structurally
  identical (`name`, `etag`, `grantRules`). They model the same resource —
  one as a response body, one as the update body — but expose it under two
  top-level names. `UpdateRuleSetRequest` then wraps `RuleSetUpdateRequest`
  under a `ruleSet` field, so the developer sees three overlapping shapes
  (`RuleSet`, `RuleSetUpdateRequest`, `UpdateRuleSetRequest`) for one
  concept. The wire payload is keyed `rule_set`, not
  `rule_set_update_request`.
- **Category:** Duplicate concepts; redundant wrapper.
- **Suggested name:** Collapse to `RuleSet` only. The update endpoint body
  should be `{ name, ruleSet: RuleSet }`. Remove `RuleSetUpdateRequest`
  entirely.
- **Rationale:** A single canonical `RuleSet` shape avoids the read/write
  divergence. Proto generates separate types because Go does not have
  structural typing; in TypeScript the duplication is wasteful.

### 9. `UpdateRuleSetRequest.ruleSet` vs `UpdateRuleSetRequest.name` overlap — `src/v1/model.ts:354-360`
- **Why weird:** `UpdateRuleSetRequest` has both a top-level `name` and
  `ruleSet.name` (because `RuleSetUpdateRequest` also carries `name`). Two
  `name` fields on the same request that conceptually identify the same
  thing is a footgun — which one wins? Nothing in the TS type encodes
  that.
- **Category:** Misleading; field name overlapping itself.
- **Suggested name:** Drop the outer `name` (use it from `ruleSet.name`),
  or rename the outer to `pathName`/`resourceName` to make the routing
  role explicit.
- **Rationale:** Both fields share an identical doc comment ("Name of the
  rule set."). Developers will set one and not the other and silently
  4xx.

### 10. `GrantRule.role` is a string, not a `Role` — `src/v1/model.ts:227,302`
- **Why weird:** The package exports a `Role` type and then immediately
  ignores it: `GrantRule.role` is `string`. So `Role` is the response
  shape from `getAssignableRolesForResource`, but `GrantRule.role` is the
  same identifier path serialized inline. Two representations of the
  same concept.
- **Category:** Duplicate concept; field type mismatch with sibling type.
- **Suggested name:** Type `GrantRule.role` as `Role['name']` or a
  branded `RoleName` string so the two surfaces stay aligned.
- **Rationale:** Developers will write `grantRule.role = role.name`
  constantly because the types don't line up.

### 11. `GetAssignableRolesForResource*` verbosity and verb shape — `src/v1/model.ts:134,150`, `src/v1/client.ts:218`
- **Why weird:** 41-character type names. The "ForResource" suffix is
  implied — every assignable-roles query is for a resource. The pair
  reads like a Java RPC service name (`Get<Subject>For<Object>Request`).
  The method `getAssignableRolesForResource` returns an array, so it is
  semantically a list, not a get.
- **Category:** Overly verbose; verb mismatch (`Get` for a list result).
- **Suggested name:** `ListAssignableRolesRequest` /
  `ListAssignableRolesResponse`, method `listAssignableRoles`. Reflects
  that the operation returns a list and aligns with REST conventions.
- **Rationale:** Symmetry with `GetRuleSet`/`UpdateRuleSet` might suggest
  `Get...`, but the operation returns an array and is closer to a list
  semantically.

### 12. `GrantRule.principals: string[]` is an untyped principal-format list — `src/v1/model.ts:225`
- **Why weird:** Generic `string[]` for principals, where each entry is
  one of three formats (`users/<USERNAME>`, `groups/<GROUP_NAME>`,
  `servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>`). The shape is
  documented in the JSDoc but not in the type.
- **Category:** Generic field losing meaning; underspecified ID.
- **Suggested name:** Type with a template-literal union — e.g.
  `principals: PrincipalRef[]` where
  `type PrincipalRef = \`users/${string}\` | \`groups/${string}\` | \`servicePrincipals/${string}\``.
- **Rationale:** TypeScript can encode this; the Go SDK cannot. The 1:1
  port leaves type information on the floor.

### 13. `*Request_Response` underscore-nested proto-message types — `src/v1/model.ts:132,168,211,239`
- **Why weird:** Four types use the proto-style nested-message underscore
  convention: `DeleteWorkspacePermissionAssignmentRequest_Response`,
  `GetPermissionLevelsRequest_Response`,
  `GetWorkspacePermissionAssignmentsRequest_Response`,
  `ListWorkspacePermissionsRequest_Response`. Each is annotated with
  `// eslint-disable-next-line @typescript-eslint/naming-convention --
  Proto-style nested message name.` — the comment explicitly admits the
  leak. The corresponding zod schemas
  (`unmarshalDeleteWorkspacePermissionAssignmentRequest_ResponseSchema`,
  etc.) carry the same wart at `model.ts:441,454,466,488`. Most response
  types in this package are top-level `*Response`; only these four use
  the nested form. (NOTE: `_Response` underscore suffix is a
  generator-only recommendation in `_SUMMARY.md`; here we flag the
  within-file inconsistency it creates.)
- **Category:** Within-package inconsistency — some responses top-level
  `*Response`, others nested `*Request_Response`.
- **Suggested name:** Generator-side fix. For this package, the
  inconsistency would resolve once the underscore-suffix recommendation
  applies SDK-wide.
- **Rationale:** TypeScript has no concept of nested message types; the
  underscore separator is a proto-specific path encoding.

### 14. `PermissionOutput`, `PrincipalOutput`, `WorkspacePermissionAssignmentOutput` `Output` suffix — `src/v1/model.ts:250,268,383`
- **Why weird:** Three types ending with `Output`. In proto / gRPC
  service definitions, message types are commonly named `FooInput`
  (request) and `FooOutput` (response) — the `Output` suffix is the
  proto-RPC naming pattern. On the TypeScript surface, `Output` is
  meaningless: every value is "output" of something. The package uses
  `Request`/`Response` as the standard envelope suffix and only these
  three types break the pattern.
- **Category:** Proto-architectural leak (`Output` suffix); within-package
  inconsistency.
- **Suggested name:** `WorkspacePermissionDescription` (the enum-name
  `WorkspacePermission` is already taken), `Principal`,
  `WorkspacePermissionAssignment`. Drop the `Output` suffix.
- **Rationale:** Compare `principal: PrincipalOutput` to
  `principal: Principal` — the latter reads as plain English.

### 15. `Permission` type collides with the broader vocabulary — `src/v1/model.ts:244`
- **Why weird:** Top-level type called `Permission` with three fields:
  `permissionLevel`, `inherited`, `inheritedFromObject`. Every instance
  is really an "effective permission" — a permission level paired with
  inheritance metadata. The name `Permission` alone is the
  second-most-overloaded noun in the SDK (after `Client`), and is
  cross-cutting with `PermissionLevel`, `PermissionOutput`,
  `PermissionsDescription`, `PermissionsResponse`,
  `WorkspacePermission`, `permissionAssignments`, and `permissions`
  — all in the same package.
- **Category:** Vague top-level identifier; cross-package collision.
- **Suggested name:** `EffectivePermission` (matches the doc semantics)
  or `PermissionGrant`.
- **Rationale:** `Permission` as a standalone PascalCase noun is so
  common across IAM systems that it's nearly content-free without
  qualification.

### 16. `PermissionsDescription` plural for a single-level descriptor — `src/v1/model.ts:256`
- **Why weird:** Type carries `permissionLevel?: PermissionLevel`
  (singular) and `description?: string`. The plural `Permissions` in the
  type name is wrong: each instance describes ONE level.
- **Category:** Singular/plural mismatch; generic `Description` suffix.
- **Suggested name:** `PermissionLevelDescription` or
  `PermissionLevelInfo`.
- **Rationale:** One descriptor = one level; the type name should match.

### 17. `PermissionsResponse` is a returned ACL, not a "Response" type — `src/v1/model.ts:261`
- **Why weird:** Returned from three different operations
  (`getObjectPermissions`, `setObjectPermissions`,
  `updateObjectPermissions`). The type carries `objectId`, `objectType`,
  `accessControlList` — i.e. it's "an ACL with metadata", not "a
  Permissions response". Name is generic; the content is the more
  meaningful concept.
- **Category:** Vague; `Response` suffix tautology.
- **Suggested name:** `ObjectAcl`, `ObjectPermissions`, or
  `AccessControlList`.
- **Rationale:** The type's payload (`objectId`, `objectType`,
  `accessControlList`) is the concept; `Response` is incidental.

### 18. `Actor.kind` discriminated-union with a single variant — `src/v1/model.ts:95-97`
- **Why weird:** `Actor.kind?: { $case: 'actorId'; actorId: number } |
  undefined` — the `kind` field name is a direct port of the proto
  `oneof kind { ... }` block convention. With a single-variant union
  (only `actorId`), the entire discriminator is dead weight — there's
  nothing else it could be.
- **Category:** Proto-architectural leak (`oneof` block name `kind`
  carried verbatim); single-variant union is unnecessary structure.
- **Suggested name:** Flatten to `actorId?: number | undefined` directly
  on `Actor`. If a future variant is added, introduce the discriminated
  union then with a meaningful discriminator name.
- **Rationale:** A single-variant discriminated union is a proto
  modeling artifact, not a domain concept.

---

## Low severity

### 19. `etag` casing — `src/v1/model.ts:199,318,334`
- **Why weird:** Lowercase `etag` (rather than `eTag`/`ETag`). HTTP spec
  uses `ETag`. Per the project-wide acronym policy (Google TS
  `Pascal-then-lower`), the form would be `etag`/`Etag` depending on
  position. Mixed-case `eTag` would be wrong. Flag for cross-package
  consistency review only.
- **Category:** Acronym casing.
- **Suggested name:** Confirm against project-wide policy. Current form is
  most likely correct per Google TS rules.
- **Rationale:** Defer to global policy.

### 20. `flattenQueryParams` exported but rarely consumed — `src/v1/utils.ts:123`
- **Why weird:** Used only by `checkPolicy` (`client.ts:536,545,555`).
  The helper is identical across packages and should live in a shared
  `@databricks/sdk-core` module rather than be re-emitted per package.
  Generator-wide concern.
- **Category:** Effectively internal/redundant export.
- **Suggested name:** Move to shared core utility module; keep current
  name.
- **Rationale:** Generator emits the same helper into every package;
  consolidation reduces surface.

### 21. `HttpCallOptions` shadows `CallOptions` — `src/v1/utils.ts:15`
- **Why weird:** The package imports `CallOptions` from
  `@databricks/sdk-options/call` (line 12) and defines its own
  `HttpCallOptions` here. The names suggest the latter is a
  subtype/extension of the former, but they describe different concerns
  — `CallOptions` is retry/signal/timeout policy; `HttpCallOptions` is
  request + client + logger bundle.
- **Category:** Vague suffix; naming-overlap with the public type.
- **Suggested name:** `HttpCallContext` (it's a context bag, not
  user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing
  option structs.

### 22. `readAll` is a Go-port utility name — `src/v1/utils.ts:40`
- **Why weird:** Direct Go-port of `io.ReadAll`; clashes cognitively
  with `Array.prototype` methods and Web Streams APIs. Generator-wide.
- **Category:** Vague; Go-port style.
- **Suggested name:** `readStreamToEnd`, `drainStream`, or
  `bufferStream`.
- **Rationale:** Cross-package consistency.

### 23. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:64`
- **Why weird:** `Segment` is a generic word; the constant carries
  User-Agent identity but the name communicates nothing. Same wart
  appears in every generated package.
- **Category:** Vague; generic name.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 24. `updateObjectPermissions` uses HTTP PATCH; method name implies replace — `src/v1/client.ts:500,513`
- **Why weird:** Method `updateObjectPermissions` issues HTTP `PATCH`
  (line 513). The request type `UpdateObjectPermissionsRequest` is
  symmetric in name to `SetObjectPermissionsRequest` (PUT) — but the
  semantics differ: PUT replaces, PATCH merges. The naming gives no
  hint of this.
- **Category:** Verb consistency; semantics buried.
- **Suggested name:** `patchObjectPermissions` for the PATCH method, OR
  explicit JSDoc on `update*` clarifying merge semantics.
- **Rationale:** Method verbs should hint at HTTP semantics; `set` vs
  `update` is ambiguous when both exist on the same resource.

### 25. `permissionassignments` URL fragment is one word — `src/v1/client.ts:103,131,159,187`
- **Why weird:** REST path uses `/permissionassignments/` (no
  separator), while every other Databricks REST resource in this SDK
  uses hyphenated paths (`/clean-rooms`, `/external-locations`, etc.).
  Wire-format problem, not TS naming, but spills into the visual feel
  of the client URLs.
- **Category:** Casing/separator inconsistency (wire side).
- **Suggested name:** Upstream: `permission-assignments`. Not actionable
  in this package.
- **Rationale:** Cross-API consistency.

### 26. `getWorkspacePermissionAssignments` returns a list — `src/v1/client.ts:127`
- **Why weird:** Method is named with `get*` but returns
  `permissionAssignments` array (model.ts:213). REST convention is
  `list*` for array-returning operations; `get*` for singular.
- **Category:** Verb-tense inconsistency.
- **Suggested name:** `listWorkspacePermissionAssignments` and
  `ListWorkspacePermissionAssignmentsRequest` /
  `…Response`.
- **Rationale:** Aligns naming with REST list semantics used elsewhere
  in the SDK.

### 27. `listWorkspacePermissions` returns a static catalog — `src/v1/client.ts:155`
- **Why weird:** Method `listWorkspacePermissions` returns the
  catalog of `PermissionOutput` values supported (USER/ADMIN), not
  user data. Sits side-by-side with `getWorkspacePermissionAssignments`
  (which actually lists data). The two are visually similar and easy
  to mix up.
- **Category:** Misleading verb (catalog vs data).
- **Suggested name:** `getSupportedWorkspacePermissions` or
  `listAssignablePermissions`.
- **Rationale:** Disambiguates from the assignment-list operation.

---

## Observations

### O1. URL path interpolation is unencoded — `src/v1/client.ts:103,131,159,187,222,259,296,333,370,399,425,450,478,504`
- All URL path placeholders interpolate `${req.accountId ?? ''}`,
  `${String(req.workspaceId ?? '')}`, etc. directly into URLs without
  `encodeURIComponent`. A malicious or weird `accountId` allows path
  injection. Sibling packages use the same pattern, so it's
  project-wide. Not a naming finding strictly, caught in passing.

### O2. `workspaceId` and `principalId` typed as `number` — `src/v1/model.ts:126,128,207,235,287,366,368`
- Workspace IDs and principal IDs are 64-bit integers in
  Databricks; JS `number` loses precision above 2^53. The client also
  unconditionally `String()`s these into URL paths, so string semantics
  are sufficient throughout. Worth flagging cross-package: bigint or
  string would be safer.

### O3. `error?: string` on `WorkspacePermissionAssignmentOutput` — `src/v1/model.ts:389`
- Embedding an opaque error string inside the success response body is
  unusual; typical SDK design surfaces errors as exceptions or as a
  typed error union. The field is named `error` (clashing with the
  global `Error` class and the `catch(error)` parameter name).
  `errorMessage` or `partialFailureReason` would be clearer.

### O4. Single class composes four formerly-distinct services — `src/v1/client.ts:69`
- The `Client` class composes 12 methods that previously lived across
  four packages. Three operational clusters
  (workspace-object-permissions, account-level rule sets,
  workspace-permission-assignments) plus one orphan (`checkPolicy`)
  share a class with no internal structure or grouping. Naming-adjacent:
  a single flat `Client` interface flattens the conceptual boundaries
  that gave the four original packages their identity. Consider
  exposing sub-namespaces (`client.objectPermissions.get(...)`,
  `client.ruleSets.update(...)`, etc.) to reflect the cluster
  boundaries, even though the merger argues against re-split.

---

## Domain glossary
- `accountId` — Databricks account UUID (top-level tenant container,
  distinct from a workspace).
- `etag` — HTTP entity tag, used here as a freshness floor on GET and as
  an optimistic concurrency token on PUT.
- `principal` — User, service principal, or group; the subject of an
  access rule or a permission assignment.
- `Role` — Reference to a grantable account-level role (e.g.
  `roles/account.admin`).
- `RuleSet` — A versioned collection of `GrantRule`s attached to a
  resource.
- `GrantRule` — A binding of N principals to 1 role within a `RuleSet`.
- `PermissionLevel` — A per-object-type access-grant level (`CAN_MANAGE`,
  `CAN_VIEW`, `IS_OWNER`, etc.). Distinct from `WorkspacePermission`.
- `WorkspacePermission` — A workspace-membership role for a principal
  (`USER`, `ADMIN`). Distinct from `PermissionLevel`.
- `PermissionAssignment` — A binding of a principal to one or more
  `WorkspacePermission` values on a single workspace.
- `requestObjectType` / `requestObjectId` — Wire-name pair identifying
  the object on which a permissions ACL is read or written.
- `resource` — Hierarchical name identifying what the rule set or roles
  list applies to (account, group, service principal, or tag policy).
- `policy` (in `CheckPolicyRequest`) — A server-side authorization
  rule; `checkPolicy` asks the server whether a given actor may perform
  a given permission on a given resource.

## File coverage
- `src/v1/model.ts` (738 lines): read fully.
- `src/v1/client.ts` (581 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (45 lines): read fully.
- `src/v1/transport.ts` (75 lines): read for context.
