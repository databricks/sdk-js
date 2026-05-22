# Naming Audit: grants

**Path:** `packages/grants/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog Grants — get, list, and update privileges (e.g. `SELECT`, `MODIFY`, `USE_CATALOG`) on UC securables (catalogs, schemas, tables, etc.) for principals (users, groups, service principals). Also exposes "effective" variants that traverse parent-securable inheritance.
**Total weird names flagged:** 20

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 8 |
| Low | 3 |
| Observation | 1 |

The grants package contains 9 generated types and 3 client methods covering one of the most overlapping surfaces in the SDK: UC privilege management. The most pervasive remaining issues are (1) the duplicated vocabulary (`permissions` in method names vs `privileges` / `PrivilegeAssignment` in payload types), (2) the conceptual overlap with the separate `permissions` package which uses entirely different vocabulary (`PermissionLevel`, `AccessControlRequest`, `PermissionsResponse`) for a similar operation, and (3) the lack of enum types for the closed sets of `securableType` and `privilege` strings.

---

## High severity

### 1. Concept duplication: "permissions" vs "privileges" — `src/v1/model.ts` (entire file)
- **Why weird:** The package uses two synonymous nouns interchangeably for the same concept. Method names use `permissions` (`getPermissions`, `updatePermissions`); collection types use `privileges` / `PrivilegeAssignment` / `EffectivePrivilege`. The payload field on the response of `getPermissions()` is named `privilegeAssignments`. A single privilege string (e.g. `"SELECT"`) is sometimes called a "permission" (e.g. in `GetPermissionsRequest.maxResults` doc: "the maximum number of privileges to return") and sometimes a "privilege". This is a vocabulary smell baked into the Go SDK port, but it's the single biggest readability issue in the package.
- **Category:** 12 (duplicate concepts), 17 (inconsistent action verbs / vocabulary).
- **Suggested name:** Pick one. Either rename the type family to `Privileges` (so `getPrivileges`, `updatePrivileges`, `PrivilegeAssignment`, `GetPrivilegesResponse`) or `Permissions` (so `getPermissions`, `updatePermissions`, `PermissionAssignment`). The current mix forces readers to mentally translate every method call.
- **Rationale:** This is wire-locked (Databricks UC API uses `/permissions/` URL paths but body fields named `privileges`), but the SDK doesn't have to expose it. A consistent vocabulary across types and methods makes the API self-documenting.

### 2. Concept duplication with `permissions` package — cross-package
- **Why weird:** A sibling package `packages/permissions/src/v1/` (also generated, also exposed) uses an entirely different vocabulary for similar-sounding operations:
  - `permissions` package: `PermissionLevel` enum (e.g. `CAN_MANAGE`, `IS_OWNER`), `AccessControlRequest` (uses discriminated union over `userName` / `groupName` / `servicePrincipalName`), `PermissionsResponse` with `accessControlList`, `setObjectPermissions`, `getObjectPermissions`, `updateObjectPermissions`, `getPermissionLevels`.
  - `grants` package: free-form `privileges: string[]` (no enum), `principal: string` (single field, doesn't distinguish user vs group vs SP), `PrivilegeAssignment`, `getPermissions`, `updatePermissions`.
- Both packages claim the `Permissions` and `Permission*` keywords. A user navigating the SDK will see `permissions` and `grants` and reasonably wonder which to use. There is no surface-level disambiguation.
- **Category:** 12 (duplicate concepts across packages), 1 (vague top-level naming — neither package name is self-disambiguating).
- **Suggested name:** Rename one of the packages to make the disambiguation clear, e.g. `grants` → `unity-catalog-grants` or `uc-privileges`; `permissions` → `workspace-permissions` or `workspace-acl`. Or — at minimum — keep their public types non-overlapping (currently both export "Permission..."-prefixed types).
- **Rationale:** The two packages cover non-overlapping concrete operations (UC grants vs workspace-object ACLs) but use heavily overlapping vocabulary. This is an enormous discoverability hazard.

### 3. `PermissionsChange` (type) — `src/v1/model.ts:99`
- **Why weird:** Inconsistent vocabulary with the rest of the file. The package mostly uses `Privilege*` (`PrivilegeAssignment`, `EffectivePrivilege`, `EffectivePrivilegeAssignment`) but the change-payload is named `PermissionsChange` (plural "Permissions", not "Privilege"). The change describes adding/removing entries to `add: string[]` / `remove: string[]` where the strings are privileges. So the type is really a `PrivilegeChange` or `PrivilegeAssignmentChange`.
- **Category:** 17 (inconsistent vocabulary), 12 (concept overlap with `permissions` package).
- **Suggested name:** `PrivilegeChange` or `PermissionsChange` (and pick one across the file — see #1).
- **Rationale:** See #1.

### 4. `principal` (field, multiple) — `src/v1/model.ts:22,33,69,104,116`
- **Why weird:** The field `principal: string` appears 5 times across the file. The doc string is "user email address or group name" — but the `permissions` package solves the same problem with a discriminated union (`{ $case: 'userName' | 'groupName' | 'servicePrincipalName', ... }`). The `grants` package punts. The type system has no way to tell whether `principal` is an email, a group name, or a service principal name.
- **Category:** 1 (vague), 15 (generic field name), 19 (underspecified identifier), 12 (overlap with `permissions` package's typed approach).
- **Suggested name:** `principalName` (matching the `permissions` package, which uses `principalName?: { $case: 'userName' | ... }`); or, better, model the same discriminated union here.
- **Rationale:** "Principal" is overloaded across identity systems (security principal, business principal, mathematical principal, principal-of-the-school). The doc-comment is the only disambiguating signal.

### 5. `securableFullName` (field, repeated across request types) — `src/v1/model.ts:31,67,125`
- **Why weird:** Verbose redundant naming — `securableType` + `securableFullName` repeats the `securable` prefix on consecutive fields. The `securableType` already establishes context, so the second field could be just `fullName`. The Go SDK uses the verbose form for proto compatibility, but TypeScript readers don't gain anything from the duplication.
- **Category:** 7 (overly verbose), 15 (generic field name).
- **Suggested name:** `fullName`.
- **Rationale:** Internal consistency — many other UC-adjacent packages just use `fullName` because `securableType` already discriminates.

### 6. `GetEffectivePermissionsRequest_Response` — `src/v1/model.ts:53,163`
- **Why weird:** Proto-architectural leak. The `Request_Response` underscore-separated name encodes the proto-style nested-message hierarchy (a `Response` message nested inside the `GetEffectivePermissionsRequest` enclosing message). TypeScript readers see a foreign tooling artifact, not an idiomatic type name. The companion `unmarshalGetEffectivePermissionsRequest_ResponseSchema` constant and the inline ESLint-disable comments (`Proto-style nested message name.`) confirm the leak is intentional but unidiomatic.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `GetEffectivePermissionsResponse`.
- **Rationale:** TypeScript has no notion of nested-message scoping; the underscore exists solely to mirror `message Foo { message Response { ... } }` in the source proto. Flattening to `GetEffectivePermissionsResponse` matches the rest of the SDK's response-type convention.

### 7. `GetPermissionsRequest_Response` — `src/v1/model.ts:89,177`
- **Why weird:** Same proto-architectural leak as #6. The `Request_Response` underscore-separated form is a direct port of a proto-nested message name; the accompanying schema constant (`unmarshalGetPermissionsRequest_ResponseSchema`) and the `Proto-style nested message name.` ESLint-disable comment make the proto origin explicit.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `GetPermissionsResponse`.
- **Rationale:** See #6.

### 8. `UpdatePermissionsRequest_Response` — `src/v1/model.ts:131,202`
- **Why weird:** Same proto-architectural leak as #6 and #7. The `Request_Response` naming and the `unmarshalUpdatePermissionsRequest_ResponseSchema` schema constant both carry the proto nested-message marker.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `UpdatePermissionsResponse`.
- **Rationale:** See #6.

---

## Medium severity

### 9. `EffectivePrivilege.privilege` — `src/v1/model.ts:7`
- **Why weird:** `EffectivePrivilege.privilege` — the field repeats the type name. Inside a `EffectivePrivilege` object, what else could `.privilege` mean? The type is essentially `(privilege, inheritedFromType, inheritedFromName)`. Naming the carrier field after the parent type adds zero info.
- **Category:** 20 (type-suffix tautology), 1 (vague — the doc says "The privilege assigned to the principal" but the type is `string`, untyped).
- **Suggested name:** `name` (since this is the name of a single privilege like `"SELECT"`), or — if keeping `privilege` — change the type to a proper enum (see #10).
- **Rationale:** A field on `X` named `x` is canonically a code smell.

### 10. `EffectivePrivilege.inheritedFromType` — `src/v1/model.ts:12`
- **Why weird:** Type is `string`, but the doc says "type of the object that conveys this privilege via inheritance" — i.e. a securable type like `CATALOG`, `SCHEMA`, `TABLE`. The package elsewhere talks about `securableType` (also `string`), but there's no enum and no link. A more typed approach would be `SecurableType` (an enum). The name promises a typed handle but the field is free-form text.
- **Category:** 6 (misleading: name implies type, value is string), 19 (underspecified).
- **Suggested name:** `inheritedFromSecurableType` (clarifies what kind of type) — and ideally typed as an enum.
- **Rationale:** "Type" without qualification is ambiguous; consistent with how `securableType` is named elsewhere in the file, this field should be a securable type.

### 11. `EffectivePrivilege.inheritedFromName` — `src/v1/model.ts:17`
- **Why weird:** Generic "name" field on a non-`Name`-typed thing. Pair with `inheritedFromType` it's clear, but in isolation `inheritedFromName: string | undefined` is just "some string". Doc-comment is required reading.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `inheritedFromFullName` (matching `securableFullName` elsewhere).
- **Rationale:** Internal consistency — the rest of the file uses `fullName` / `securableFullName`.

### 12. `maxResults` (field, repeated) — `src/v1/model.ts:47,83`
- **Why weird:** Could be `pageSize` (more idiomatic for paginated APIs). Long doc-comment (60+ lines, mostly duplicated between the two request types) explains a "150 minimum" page-length rule that lives in two places with no cross-reference.
- **Category:** 7 (verbose).
- **Suggested name:** `pageSize` (more conventional) or keep `maxResults` but extract the shared documentation.
- **Rationale:** Cross-package consistency — many other paginated APIs use `pageSize`.

### 13. `privileges: string[]` and `privilege: string` — model-wide (e.g. `src/v1/model.ts:7,24,106,108,118`)
- **Why weird:** Every privilege is typed as a free-form `string`. The Go SDK and Databricks UC API have a fixed enum of privilege names (`SELECT`, `MODIFY`, `USE_CATALOG`, `USE_SCHEMA`, `EXECUTE`, `CREATE_*`, `READ_VOLUME`, `WRITE_VOLUME`, etc.). The TS SDK exposes them as bare strings with no autocomplete, no type-checking, no documentation. A typo like `"SELCT"` will silently round-trip to the server.
- **Category:** 19 (underspecified), 1 (vague: `string` doesn't constrain meaning).
- **Suggested name:** Define a `Privilege` enum (or string literal union). At minimum document the valid values inline.
- **Rationale:** Type-safety is the entire point of TypeScript. The audit task explicitly flags "long enum values (many privilege values)" — the irony is that grants HAS the most privilege values of any UC operation and exposes ZERO of them as types.

### 14. `PermissionsChange.add` / `PermissionsChange.remove` — `src/v1/model.ts:106,108`
- **Why weird:** Bare verb-shaped field names with no clarifying suffix. `add: string[]` and `remove: string[]` on a `PermissionsChange` type — what are they adding to and removing from? The doc-comments tell you ("The set of privileges to add"), but the field names are anonymous.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `addPrivileges` / `removePrivileges`, or `granted` / `revoked`.
- **Rationale:** Common to see `add` / `remove` in change-set APIs (e.g. Kubernetes RBAC, AWS IAM), but those typically pair with a typed item collection. A bare `add: string[]` carries no information.

### 15. `EffectivePrivilegeAssignment` — `src/v1/model.ts:20`
- **Why weird:** Three-word PascalCase name (`Effective` + `Privilege` + `Assignment`) that on first read parses as "Effective Privilege" / "Assignment" but on second read could parse as "Effective" / "Privilege Assignment". The conceptual model is "the privilege assignment that effectively applies (because of inheritance)", which the doc-comment confirms — but the name doesn't disambiguate.
- **Category:** 7 (overly verbose).
- **Suggested name:** Possibly leave as-is; alternative is `EffectiveAssignment` (drop `Privilege` since `Assignment` is privilege-specific in this file).
- **Rationale:** Marginal; flagged for symmetry with `EffectivePrivilege` (line 5).

### 16. `privilegeAssignments` (field name, multiple) — `src/v1/model.ts:60,96,133`
- **Why weird:** Field name `privilegeAssignments` appears as the sole payload field on multiple response types (`GetEffectivePermissionsRequest_Response`, `GetPermissionsRequest_Response`, `UpdatePermissionsRequest_Response`). Could be `assignments` everywhere since the surrounding type name carries the rest of the qualifier.
- **Category:** 7 (verbose), 20 (type-suffix tautology — field name repeats type-name fragment).
- **Suggested name:** `assignments`.
- **Rationale:** Field names that re-state the parent type are noise.

### 17. `securableType: string` — model-wide (3 occurrences at `src/v1/model.ts:29,65,123`)
- **Why weird:** Same concept as #10 — free-form string for what should be an enum. UC defines a closed set of securable types (`CATALOG`, `SCHEMA`, `TABLE`, `VIEW`, `FUNCTION`, `VOLUME`, `EXTERNAL_LOCATION`, `STORAGE_CREDENTIAL`, `CONNECTION`, `METASTORE`, ...). The TS SDK exposes none of them.
- **Category:** 19 (underspecified), 1 (vague).
- **Suggested name:** Define a `SecurableType` enum.
- **Rationale:** See #10.

---

## Low severity

### 18. `Client` — `src/v1/client.ts:41`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts` re-exports `Client` (line 3), so users write `import { Client } from '@databricks/sdk-grants/v1'`. Same name appears in every generated package — you can't have multiple grants/catalogs/etc. clients in one import without aliasing.
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `GrantsClient` (or whatever the package-specific name is).
- **Rationale:** Convention in `@aws-sdk/*`, `@google-cloud/*`, `@azure/*` is service-prefixed client class names for exactly this reason.

### 19. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:36`
- **Why weird:** `Segment` is a generic word; without the doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 20. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix), 17 (inconsistent).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Observations

### 21. `Client` constructor: `Host is required.` — `src/v1/client.ts:52`
Error message thrown but no client name in the message. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed.
- **Category:** Observation.

---

## Fixed

- #1 `GetPermissions` (originally cited at `src/v1/model.ts:63`): Fixed in regeneration on 2026-05-20 — renamed to `GetPermissionsRequest` with the `Request` suffix.
- #2 `UpdatePermissions` (originally cited at `src/v1/model.ts:197`): Fixed in regeneration on 2026-05-20 — renamed to `UpdatePermissionsRequest` with the `Request` suffix.
- #3 `GetEffectivePermissions` (originally cited at `src/v1/model.ts:27`): Fixed in regeneration on 2026-05-20 — renamed to `GetEffectivePermissionsRequest` with the `Request` suffix.
- #5 `GetPermissions` vs `ListPrivilegeAssignmentsRequest` duplication (originally cited at `src/v1/model.ts:63,129`): Fixed in regeneration on 2026-05-20 — the `ListPrivilegeAssignmentsRequest` type and its `listPrivilegeAssignments` method were removed, collapsing the operation to a single `GetPermissionsRequest`.
- #6 `GetEffectivePermissions` vs `ListEffectivePrivilegeAssignmentsRequest` duplication (originally cited at `src/v1/model.ts:27,101`): Fixed in regeneration on 2026-05-20 — the `ListEffectivePrivilegeAssignmentsRequest` type and its `listEffectivePrivilegeAssignments` method were removed.
- #10 `principalId` field (originally cited at `src/v1/model.ts:182,194`): Fixed in regeneration on 2026-05-20 — the `principalId` field was removed from both `PermissionsChange` and `PrivilegeAssignment`.
- #11 `securableFullName` vs `fullName` inconsistency (originally cited at `src/v1/model.ts:31,67,201` vs `105,133`): Fixed in regeneration on 2026-05-20 — the `fullName`-spelled `List*Request` types were removed; only the `securableFullName` spelling remains (now tracked as a verbosity finding #5).
- #15 `maxResults` vs `pageSize` inconsistency (originally cited at `src/v1/model.ts:47,83,114,151`): Fixed in regeneration on 2026-05-20 — the `pageSize`-using `List*Request` types were removed; only `maxResults` remains (verbosity tracked as #9).
- #19 `effectivePrivilegeAssignments` field (originally cited at `src/v1/model.ts:121`): Fixed in regeneration on 2026-05-20 — the `ListEffectivePrivilegeAssignmentsResponse` type was removed; only the shorter `privilegeAssignments` field remains (tracked as #13).
- #21 `getEffectivePermissions` deprecation (originally cited at `src/v1/client.ts:82`): Fixed in regeneration on 2026-05-20 — the duplicated paginated `listEffectivePrivilegeAssignments` method was removed, so this is no longer a deprecation-versus-mirror concern.
- #22 `getPermissions` deprecation (originally cited at `src/v1/client.ts:129`): Fixed in regeneration on 2026-05-20 — the duplicated paginated `listPrivilegeAssignments` method was removed, so this is no longer a deprecation-versus-mirror concern.
- #24 `includeDeletedPrincipals` inconsistency (originally cited at `src/v1/model.ts:87,109,136`): Fixed in regeneration on 2026-05-20 — the `includeDeletedPrincipals` field was removed from the surviving request types.
