# Naming Audit: accessmanagement

**Path:** `packages/accessmanagement/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 5 |
| Low | 2 |
| Observation | 1 |

---

## High severity

### 1. `CAN_MANAGE_STAGING_VERSIONS` / `CAN_MANAGE_PRODUCTION_VERSIONS` / `CAN_CREATE_APP` — `src/v1/model.ts:18,19,27`
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

### 2. `RequestAuthzIdentity` enum name — `Request` prefix and `Authz` truncation — `src/v1/model.ts:38-46`
- **Why weird:** The type name starts with `Request` — a wire-format
  message prefix (`RequestAuthzIdentity` reads as "the AuthzIdentity field
  on a request message"). The mid-name truncation `Authz` (instead of
  `Authorization`) is a Go-style abbreviation that does not match the rest
  of the package, which spells out `permission` and `permissionLevel` in
  full.
- **Category:** Proto-architectural leak (`Request` prefix on a domain
  enum), cryptic abbreviation (`Authz`).
- **Suggested name:** `AuthorizationIdentity` (or simply
  `AuthIdentity`/`CallerIdentity`).
- **Rationale:** The `Request` prefix on a type that names a domain concept
  (who the policy check is on behalf of) is wire-shape leakage from the
  containing `CheckPolicyRequest`. The `Authz` truncation is fine in code
  comments but jars on a public, exported enum.

### 3. `getRuleSetProxy`, `listAssignableRolesForResourceProxy`, `updateRuleSetProxy` — `src/v1/client.ts:257,333,401`
- **Why weird:** Three methods carry the `Proxy` suffix and are
  byte-for-byte identical to their non-`Proxy` siblings (lines 219, 295,
  371). They issue the same HTTP request to the same URL with the same
  headers. The `Proxy` suffix communicates an architectural concept —
  these are the same operation routed through a proxy server in the
  Databricks control plane — that has zero meaning for a TypeScript SDK
  caller. The `Proxy` variants are the operations of the formerly
  separate `accountaccesscontrolproxy` service, folded into this
  package as duplicate methods.
- **Category:** Proto-architectural / backend-routing leak; duplicate
  concept exposed twice.
- **Suggested name:** Delete the `*Proxy` variants entirely. If the
  proxy-routing distinction matters server-side, the server can route the
  same URL internally; the client should not surface it.
- **Rationale:** Method-name suffixes should describe what the operation
  does, not how the server routes it. Two identical methods with a
  `Proxy` differentiator force every caller to flip a coin.

---

## Medium severity

### 4. `ListAssignableRolesForResource*` "ForResource" verbosity — `src/v1/model.ts:207,223`, `src/v1/client.ts:295`
- **Why weird:** 38-character type names
  (`ListAssignableRolesForResourceRequest` /
  `ListAssignableRolesForResourceResponse`). The "ForResource" suffix is
  implied — every assignable-roles query is for a resource (the request
  carries a single `resource` field). The pair reads like a Java RPC
  service name (`List<Subject>For<Object>Request`).
- **Category:** Overly verbose; redundant qualifier.
- **Suggested name:** `ListAssignableRolesRequest` /
  `ListAssignableRolesResponse`, method `listAssignableRoles`. Drops the
  implied "ForResource" tail.
- **Rationale:** The `List`/`list` verb already matches the array-returning
  REST semantics; only the redundant "ForResource" qualifier remains. A
  shorter name is just as unambiguous.

### 5. `PermissionOutput`, `PrincipalOutput`, `WorkspacePermissionAssignmentOutput` `Output` suffix — `src/v1/model.ts:260,278,393`
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

### 6. `Permission` type collides with the broader vocabulary — `src/v1/model.ts:254`
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

### 7. `PermissionsDescription` plural for a single-level descriptor — `src/v1/model.ts:266`
- **Why weird:** Type carries `permissionLevel?: PermissionLevel`
  (singular) and `description?: string`. The plural `Permissions` in the
  type name is wrong: each instance describes ONE level.
- **Category:** Singular/plural mismatch; generic `Description` suffix.
- **Suggested name:** `PermissionLevelDescription` or
  `PermissionLevelInfo`.
- **Rationale:** One descriptor = one level; the type name should match.

### 8. `PermissionsResponse` is a returned ACL, not a "Response" type — `src/v1/model.ts:271`
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

---

## Low severity

### 9. `updateObjectPermissions` uses HTTP PATCH; method name implies replace — `src/v1/client.ts:519,536`
- **Why weird:** Method `updateObjectPermissions` issues HTTP `PATCH`
  (line 536). The request type `UpdateObjectPermissionsRequest` is
  symmetric in name to `SetObjectPermissionsRequest` (PUT) — but the
  semantics differ: PUT replaces, PATCH merges. The naming gives no
  hint of this.
- **Category:** Verb consistency; semantics buried.
- **Suggested name:** `patchObjectPermissions` for the PATCH method, OR
  explicit JSDoc on `update*` clarifying merge semantics.
- **Rationale:** Method verbs should hint at HTTP semantics; `set` vs
  `update` is ambiguous when both exist on the same resource.

### 10. `listWorkspacePermissions` returns a static catalog — `src/v1/client.ts:154`
- **Why weird:** Method `listWorkspacePermissions` returns the
  catalog of `PermissionOutput` values supported (USER/ADMIN), not
  user data. Sits side-by-side with `listWorkspacePermissionAssignments`
  (which actually lists data). The two are visually similar and easy
  to mix up.
- **Category:** Misleading verb (catalog vs data).
- **Suggested name:** `getSupportedWorkspacePermissions` or
  `listAssignablePermissions`.
- **Rationale:** Disambiguates from the assignment-list operation.

---

## Observations

### O1. Single class composes four formerly-distinct services — `src/v1/client.ts:68`
- The `AccessManagementClient` class composes 15 methods that previously
  lived across four packages. Three operational clusters
  (workspace-object-permissions, account-level rule sets,
  workspace-permission-assignments) plus one orphan (`checkPolicy`)
  share a class with no internal structure or grouping. Naming-adjacent:
  a single flat client class flattens the conceptual boundaries
  that gave the four original packages their identity. Consider
  exposing sub-namespaces (`client.objectPermissions.get(...)`,
  `client.ruleSets.update(...)`, etc.) to reflect the cluster
  boundaries, even though the merger argues against re-split.
