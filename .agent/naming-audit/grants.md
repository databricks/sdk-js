# Naming Audit: grants

**Path:** `packages/grants/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog Grants — get, list, and update privileges (e.g. `SELECT`, `MODIFY`, `USE_CATALOG`) on UC securables (catalogs, schemas, tables, etc.) for principals (users, groups, service principals). Also exposes "effective" variants that traverse parent-securable inheritance.
**Total weird names flagged:** 28

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 13 |
| Low | 3 |
| Observation | 1 |

The grants package contains 12 generated types and 5 client methods (plus 2 paginated iterators) covering one of the most overlapping surfaces in the SDK: UC privilege management. The most pervasive issues are (1) the request-type-as-verb naming pattern (`GetPermissions`, `UpdatePermissions`, `GetEffectivePermissions`) which collides with the verb-noun method naming on `Client` and is doubly confusing because the API mixes "permissions" and "privileges" terminology in the same file, (2) significant duplication of concept between `GetPermissions` / `ListPrivilegeAssignmentsRequest` and `GetEffectivePermissions` / `ListEffectivePrivilegeAssignmentsRequest` — four request types for two operations, plus inconsistent field naming (`securableFullName` vs `fullName`, `maxResults` vs `pageSize`) — and (3) hard-conceptual overlap with the separate `permissions` package, which uses entirely different vocabulary (`PermissionLevel`, `AccessControlRequest`, `PermissionsResponse`) for a similar operation.

---

## High severity

### 1. `GetPermissions` (type) — `src/v1/model.ts:63`
- **Why weird:** Top-level request type named with an imperative verb (`Get`). TypeScript types should be nouns; verbs are reserved for methods. The Client also has a method named `getPermissions` (line 129) which takes this type as input, so the user sees `getPermissions(req: GetPermissions)` — verb-noun-verb-noun. The same identifier is both a request shape and a verb command; readers cannot tell from the type whether they're naming the request or the operation.
- **Category:** 7 (overly verbose / structural), 14 (Go-style request-type naming), 17 (inconsistent action verbs).
- **Suggested name:** `GetPermissionsRequest`, `GetPermissionsParams`, or — better — `PermissionsRequest` / `ListPermissionsRequest` to consistently apply the `Request` suffix convention used by `ListPrivilegeAssignmentsRequest` (line 129) in the same file.
- **Rationale:** This file alternates between two naming patterns: `GetPermissions` / `UpdatePermissions` (verb-only) and `ListPrivilegeAssignmentsRequest` / `ListEffectivePrivilegeAssignmentsRequest` (verb+noun+Request). Inconsistency within a single 342-line file is jarring.

### 2. `UpdatePermissions` (type) — `src/v1/model.ts:197`
- **Why weird:** Same problem as #1. `UpdatePermissions` is a noun-shaped request payload but reads as an imperative verb. Used as input to `client.updatePermissions(req: UpdatePermissions)` (line 307).
- **Category:** 7, 14, 17.
- **Suggested name:** `UpdatePermissionsRequest` or `PermissionsChangeRequest`.
- **Rationale:** See #1.

### 3. `GetEffectivePermissions` (type) — `src/v1/model.ts:27`
- **Why weird:** Same as #1 / #2. Verb-shaped request type.
- **Category:** 7, 14, 17.
- **Suggested name:** `GetEffectivePermissionsRequest`.
- **Rationale:** See #1.

### 4. Concept duplication: "permissions" vs "privileges" — `src/v1/model.ts` (entire file)
- **Why weird:** The package uses two synonymous nouns interchangeably for the same concept. Method names use `permissions` (`getPermissions`, `updatePermissions`); collection types use `privileges` / `PrivilegeAssignment` / `EffectivePrivilege`. The payload field on the response of `getPermissions()` is named `privilegeAssignments`. A single privilege string (e.g. `"SELECT"`) is sometimes called a "permission" (e.g. in `GetPermissions.maxResults` doc: "the maximum number of privileges to return") and sometimes a "privilege". This is a vocabulary smell baked into the Go SDK port, but it's the single biggest readability issue in the package.
- **Category:** 12 (duplicate concepts), 17 (inconsistent action verbs / vocabulary).
- **Suggested name:** Pick one. Either rename the type family to `Privileges` (so `getPrivileges`, `updatePrivileges`, `PrivilegeAssignment`, `GetPrivilegesResponse`) or `Permissions` (so `getPermissions`, `updatePermissions`, `PermissionAssignment`). The current mix forces readers to mentally translate every method call.
- **Rationale:** This is wire-locked (Databricks UC API uses `/permissions/` URL paths but body fields named `privileges`), but the SDK doesn't have to expose it. A consistent vocabulary across types and methods makes the API self-documenting.

### 5. Concept duplication: `GetPermissions` vs `ListPrivilegeAssignmentsRequest` — `src/v1/model.ts:63,129`
- **Why weird:** Two top-level request types do nearly the same thing. Compare fields:
  - `GetPermissions`: `securableType`, `securableFullName`, `principal`, `maxResults`, `pageToken`, `includeDeletedPrincipals`.
  - `ListPrivilegeAssignmentsRequest`: `securableType`, `fullName`, `principal`, `includeDeletedPrincipals`, `pageSize`, `pageToken`.
  - Differences: `securableFullName` ↔ `fullName`; `maxResults` ↔ `pageSize`. Everything else identical.
- The Client doc strings (`client.ts:171-173`, `client.ts:241-242`) explicitly call out that `listPrivilegeAssignments` is the "paginated version of Get Permissions API", which is exactly what `getPermissions` already supports (pagination via `maxResults`/`pageToken`). So the SDK ships two flavours of the same operation with different but compatible request shapes.
- **Category:** 12 (duplicate concept), 9 (singular/plural mismatch in method naming).
- **Suggested name:** Collapse to a single `ListPrivilegeAssignmentsRequest`; deprecate `GetPermissions` (or vice versa). Match field names across both. See also #15.
- **Rationale:** Two near-identical request types is a documentation/onboarding tax. The decision of which to use is server-internal (V1 of the API supported one paginated mode, the team added a "true paginated" V2) — but the SDK doesn't need to inflict that history on every consumer.

### 6. Concept duplication: `GetEffectivePermissions` vs `ListEffectivePrivilegeAssignmentsRequest` — `src/v1/model.ts:27,101`
- **Why weird:** Same problem as #5 but for the effective-permissions side. `GetEffectivePermissions` has fields `securableType`, `securableFullName`, `principal`, `maxResults`, `pageToken`; `ListEffectivePrivilegeAssignmentsRequest` has `securableType`, `fullName`, `principal`, `includeDeletedPrincipals`, `pageSize`, `pageToken`. The List variant additionally supports `includeDeletedPrincipals`, which the Get variant does not — even though `GetPermissions` (#5) does support it. The matrix of which-flavour-supports-which-knob is inconsistent.
- **Category:** 12, 17 (inconsistency).
- **Suggested name:** Same direction as #5 — collapse, or normalize field names and feature parity.
- **Rationale:** See #5.

### 7. Concept duplication with `permissions` package — cross-package
- **Why weird:** A sibling package `packages/permissions/src/v1/` (also generated, also exposed) uses an entirely different vocabulary for similar-sounding operations:
  - `permissions` package: `PermissionLevel` enum (e.g. `CAN_MANAGE`, `IS_OWNER`), `AccessControlRequest` (uses discriminated union over `userName` / `groupName` / `servicePrincipalName`), `PermissionsResponse` with `accessControlList`, `setObjectPermissions`, `getObjectPermissions`, `updateObjectPermissions`, `getPermissionLevels`.
  - `grants` package: free-form `privileges: string[]` (no enum), `principal: string` (single field, doesn't distinguish user vs group vs SP), `PrivilegeAssignment`, `getPermissions`, `updatePermissions`.
- Both packages claim the `Permissions` and `Permission*` keywords. A user navigating the SDK will see `permissions` and `grants` and reasonably wonder which to use. There is no surface-level disambiguation.
- **Category:** 12 (duplicate concepts across packages), 1 (vague top-level naming — neither package name is self-disambiguating).
- **Suggested name:** Rename one of the packages to make the disambiguation clear, e.g. `grants` → `unity-catalog-grants` or `uc-privileges`; `permissions` → `workspace-permissions` or `workspace-acl`. Or — at minimum — keep their public types non-overlapping (currently both export "Permission..."-prefixed types).
- **Rationale:** The two packages cover non-overlapping concrete operations (UC grants vs workspace-object ACLs) but use heavily overlapping vocabulary. This is an enormous discoverability hazard.

### 8. `PermissionsChange` (type) — `src/v1/model.ts:165`
- **Why weird:** Inconsistent vocabulary with the rest of the file. The package mostly uses `Privilege*` (`PrivilegeAssignment`, `EffectivePrivilege`, `EffectivePrivilegeAssignment`, `ListPrivilegeAssignments...`) but the change-payload is named `PermissionsChange` (plural "Permissions", not "Privilege"). The change describes adding/removing entries to `add: string[]` / `remove: string[]` where the strings are privileges. So the type is really a `PrivilegeChange` or `PrivilegeAssignmentChange`.
- **Category:** 17 (inconsistent vocabulary), 12 (concept overlap with `permissions` package).
- **Suggested name:** `PrivilegeChange` or `PermissionsChange` (and pick one across the file — see #4).
- **Rationale:** See #4.

### 9. `principal` (field, multiple) — `src/v1/model.ts:21,33,69,107,135,170,190`
- **Why weird:** The field `principal: string` appears 7 times across the file. The doc string is "user email address or group name" — but the file separately exposes `principalId: number` (line 182, 194). So the type system has no way to tell whether `principal` is an email, a group name, or what — and the `permissions` package solves the same problem with a discriminated union (`{ $case: 'userName' | 'groupName' | 'servicePrincipalName', ... }`). The `grants` package punts.
- **Category:** 1 (vague), 15 (generic field name), 19 (underspecified identifier), 12 (overlap with `permissions` package's typed approach).
- **Suggested name:** `principalName` (matching the `permissions` package, which uses `principalName?: { $case: 'userName' | ... }`); or, better, model the same discriminated union here.
- **Rationale:** "Principal" is overloaded across identity systems (security principal, business principal, mathematical principal, principal-of-the-school). The doc-comment is the only thing distinguishing this from `principalId`.

### 10. `principalId` field — `src/v1/model.ts:182,194`
- **Why weird:** Two interpretation issues. (1) The doc-comment for `PermissionsChange.principalId` calls it "an opaque internal ID that identifies the principal whose privileges should be removed" — meaning it's a TEMPORARY identifier only valid for deletes of deleted principals. The doc-comment for `PrivilegeAssignment.principalId` calls it the "unique identifier of the principal" — meaning a stable canonical ID. Same field name, two unrelated semantics. (2) The type is `number` — which is dangerous for large UC principal IDs (UC IDs are 64-bit). JS `number` only safely represents integers up to 2^53.
- **Category:** 6 (misleading: same name, different semantics), 19 (underspecified ID), 16 (field contradicts type domain: a 64-bit ID typed as `number`).
- **Suggested name:** Split into `removalToken` (for `PermissionsChange`, since its only purpose is removing a deleted principal) and keep `principalId` (for `PrivilegeAssignment`). And consider `bigint` or `string` for the type.
- **Rationale:** Two different concepts wearing the same name is a footgun. The `number` type for principal IDs is a JS-platform-specific overflow risk; the Go SDK uses `int64`, which JS cannot losslessly represent.

### 11. `securableFullName` vs `fullName` inconsistency — `src/v1/model.ts:31,67,201` vs `105,133`
- **Why weird:** The path-parameter field for the same securable is named `securableFullName` in `GetEffectivePermissions`, `GetPermissions`, and `UpdatePermissions`; but `fullName` in `ListEffectivePrivilegeAssignmentsRequest` and `ListPrivilegeAssignmentsRequest`. Same value, same wire location, two different field names. The client then constructs the URL using `req.securableFullName` (e.g. line 86) or `req.fullName` (e.g. line 179) depending on which type — but they're going to the same logical endpoint.
- **Category:** 17 (inconsistent action verbs / naming), 15 (generic field name).
- **Suggested name:** Pick one, ideally `fullName` (since `securableType` is already context).
- **Rationale:** Cross-request inconsistency forces the user to remember which type uses which spelling.

---

## Medium severity

### 12. `EffectivePrivilege.privilege` — `src/v1/model.ts:7`
- **Why weird:** `EffectivePrivilege.privilege` — the field repeats the type name. Inside a `EffectivePrivilege` object, what else could `.privilege` mean? The type is essentially `(privilege, inheritedFromType, inheritedFromName)`. Naming the carrier field after the parent type adds zero info.
- **Category:** 20 (type-suffix tautology), 1 (vague — the doc says "The privilege assigned to the principal" but the type is `string`, untyped).
- **Suggested name:** `name` (since this is the name of a single privilege like `"SELECT"`), or — if keeping `privilege` — change the type to a proper enum (see #16).
- **Rationale:** A field on `X` named `x` is canonically a code smell.

### 13. `EffectivePrivilege.inheritedFromType` — `src/v1/model.ts:12`
- **Why weird:** Type is `string`, but the doc says "type of the object that conveys this privilege via inheritance" — i.e. a securable type like `CATALOG`, `SCHEMA`, `TABLE`. The package elsewhere talks about `securableType` (also `string`), but there's no enum and no link. A more typed approach would be `SecurableType` (an enum). The name promises a typed handle but the field is free-form text.
- **Category:** 6 (misleading: name implies type, value is string), 19 (underspecified).
- **Suggested name:** `inheritedFromSecurableType` (clarifies what kind of type) — and ideally typed as an enum.
- **Rationale:** "Type" without qualification is ambiguous; consistent with how `securableType` is named elsewhere in the file, this field should be a securable type.

### 14. `EffectivePrivilege.inheritedFromName` — `src/v1/model.ts:17`
- **Why weird:** Generic "name" field on a non-`Name`-typed thing. Pair with `inheritedFromType` it's clear, but in isolation `inheritedFromName: string | undefined` is just "some string". Doc-comment is required reading.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `inheritedFromFullName` (matching `securableFullName` elsewhere).
- **Rationale:** Internal consistency — the rest of the file uses `fullName` / `securableFullName`.

### 15. `maxResults` vs `pageSize` — `src/v1/model.ts:47,83,114,151`
- **Why weird:** `GetEffectivePermissions` (line 47) and `GetPermissions` (line 83) use `maxResults`; `ListEffectivePrivilegeAssignmentsRequest` (line 114) and `ListPrivilegeAssignmentsRequest` (line 151) use `pageSize`. Two field names for the same concept — server-side page length cap. The 60+ lines of identical doc-comments (lines 35-46 and 71-82) explaining the "150 minimum" rule appear under both names with no link or cross-reference.
- **Category:** 17 (inconsistent action verbs / naming), 12 (duplicate concept within one file).
- **Suggested name:** Pick one: `pageSize` (more idiomatic for paginated APIs) or `maxResults`. Apply uniformly.
- **Rationale:** Internal inconsistency forces users to look up the right name per type.

### 16. `privileges: string[]` and `privilege: string` — model-wide (e.g. `src/v1/model.ts:7,24,172,174,192`)
- **Why weird:** Every privilege is typed as a free-form `string`. The Go SDK and Databricks UC API have a fixed enum of privilege names (`SELECT`, `MODIFY`, `USE_CATALOG`, `USE_SCHEMA`, `EXECUTE`, `CREATE_*`, `READ_VOLUME`, `WRITE_VOLUME`, etc.). The TS SDK exposes them as bare strings with no autocomplete, no type-checking, no documentation. A typo like `"SELCT"` will silently round-trip to the server.
- **Category:** 19 (underspecified), 1 (vague: `string` doesn't constrain meaning).
- **Suggested name:** Define a `Privilege` enum (or string literal union). At minimum document the valid values inline.
- **Rationale:** Type-safety is the entire point of TypeScript. The audit task explicitly flags "long enum values (many privilege values)" — the irony is that grants HAS the most privilege values of any UC operation and exposes ZERO of them as types.

### 17. `PermissionsChange.add` / `PermissionsChange.remove` — `src/v1/model.ts:172,174`
- **Why weird:** Bare verb-shaped field names with no clarifying suffix. `add: string[]` and `remove: string[]` on a `PermissionsChange` type — what are they adding to and removing from? The doc-comments tell you ("The set of privileges to add"), but the field names are anonymous.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `addPrivileges` / `removePrivileges`, or `granted` / `revoked`.
- **Rationale:** Common to see `add` / `remove` in change-set APIs (e.g. Kubernetes RBAC, AWS IAM), but those typically pair with a typed item collection. A bare `add: string[]` carries no information.

### 18. `EffectivePrivilegeAssignment` — `src/v1/model.ts:20`
- **Why weird:** Three-word PascalCase name (`Effective` + `Privilege` + `Assignment`) that on first read parses as "Effective Privilege" / "Assignment" but on second read could parse as "Effective" / "Privilege Assignment". The conceptual model is "the privilege assignment that effectively applies (because of inheritance)", which the doc-comment confirms — but the name doesn't disambiguate.
- **Category:** 7 (overly verbose).
- **Suggested name:** Possibly leave as-is; alternative is `EffectiveAssignment` (drop `Privilege` since `Assignment` is privilege-specific in this file).
- **Rationale:** Marginal; flagged for symmetry with `EffectivePrivilege` (line 5).

### 19. `effectivePrivilegeAssignments` (field name) — `src/v1/model.ts:121`
- **Why weird:** 30-character camelCase field name. Inside `ListEffectivePrivilegeAssignmentsResponse`, the only payload field. Could safely be shortened to `assignments` or `items` since the surrounding type name carries the rest of the qualifier.
- **Category:** 7 (overly verbose), 20 (type-suffix tautology — field name repeats type-name fragment).
- **Suggested name:** `assignments` or `items`.
- **Rationale:** Field names that re-state the parent type are noise.

### 20. `privilegeAssignments` (field name, multiple) — `src/v1/model.ts:60,98,157,209`
- **Why weird:** Same problem as #19. Field name `privilegeAssignments` appears as the sole payload field on multiple response types. Could be `assignments` everywhere.
- **Category:** 7, 20.
- **Suggested name:** `assignments`.
- **Rationale:** See #19.

### 21. `getEffectivePermissions` (method) — `src/v1/client.ts:82`
- **Why weird:** The doc-comment notes "Unpaginated calls will be deprecated soon" — so this method exists as a soon-to-be-deprecated mirror of `listEffectivePrivilegeAssignments`. Why ship both in the same v1?
- **Category:** 12 (duplicate concept — see #6), Observation.
- **Suggested name:** Mark as `@deprecated` in JSDoc (currently the deprecation note is just plain text inside the doc-comment, lines 77-78 — not an actual `@deprecated` tag).
- **Rationale:** Tooling like IDEs and ts-doc strikes through deprecated methods only when the `@deprecated` tag is used.

### 22. `getPermissions` (method) — `src/v1/client.ts:129`
- **Why weird:** Same as #21 — soon-to-be-deprecated unpaginated mirror of `listPrivilegeAssignments`.
- **Category:** 12, Observation.
- **Suggested name:** Add `@deprecated` JSDoc tag.
- **Rationale:** See #21.

### 23. `securableType: string` — model-wide (5 occurrences)
- **Why weird:** Same concept as #16 — free-form string for what should be an enum. UC defines a closed set of securable types (`CATALOG`, `SCHEMA`, `TABLE`, `VIEW`, `FUNCTION`, `VOLUME`, `EXTERNAL_LOCATION`, `STORAGE_CREDENTIAL`, `CONNECTION`, `METASTORE`, ...). The TS SDK exposes none of them.
- **Category:** 19 (underspecified), 1 (vague).
- **Suggested name:** Define a `SecurableType` enum.
- **Rationale:** See #16.

### 24. `includeDeletedPrincipals` — `src/v1/model.ts:87,109,136`
- **Why weird:** Verbose camelCase boolean. Reasonable but flagged because it's missing from `GetEffectivePermissions` (where the analogous feature would also make sense) but present on `GetPermissions` and both `List*Request` types. Inconsistent feature parity (see also #6).
- **Category:** 17 (inconsistency), 7 (verbose).
- **Suggested name:** `includeDeleted` (shorter).
- **Rationale:** Consistency issue more than naming issue.

---

## Low severity

### 25. `Client` — `src/v1/client.ts:49`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts` re-exports `Client` (line 3), so users write `import { Client } from '@databricks/sdk-grants/v1'`. Same name appears in every generated package — you can't have multiple grants/catalogs/etc. clients in one import without aliasing.
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `GrantsClient` (or whatever the package-specific name is).
- **Rationale:** Convention in `@aws-sdk/*`, `@google-cloud/*`, `@azure/*` is service-prefixed client class names for exactly this reason.

### 26. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:44`
- **Why weird:** `Segment` is a generic word; without the doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 27. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix), 17 (inconsistent).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Observations

### 28. `Client` constructor: `Host is required.` — `src/v1/client.ts:60`
Error message thrown but no client name in the message. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed.
- **Category:** Observation.
