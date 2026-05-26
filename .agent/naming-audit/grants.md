# Naming Audit: grants

**Path:** `packages/grants/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog Grants — get, list, and update privileges (e.g. `SELECT`, `MODIFY`, `USE_CATALOG`) on UC securables (catalogs, schemas, tables, etc.) for principals (users, groups, service principals). Also exposes "effective" variants that traverse parent-securable inheritance.
**Total weird names flagged:** 12

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 3 |
| Low | 3 |
| Observation | 1 |

The grants package contains 9 generated types and 3 client methods covering one of the most overlapping surfaces in the SDK: UC privilege management. The most pervasive remaining issues are (1) the conceptual overlap with the separate `permissions` package which uses entirely different vocabulary (`PermissionLevel`, `AccessControlRequest`, `PermissionsResponse`) for a similar operation, and (2) the lack of enum types for the closed sets of `securableType` and `privilege` strings.

---

## High severity

### 1. Concept duplication with `permissions` package — cross-package
- **Why weird:** A sibling package `packages/permissions/src/v1/` (also generated, also exposed) uses an entirely different vocabulary for similar-sounding operations:
  - `permissions` package: `PermissionLevel` enum (e.g. `CAN_MANAGE`, `IS_OWNER`), `AccessControlRequest` (uses discriminated union over `userName` / `groupName` / `servicePrincipalName`), `PermissionsResponse` with `accessControlList`, `setObjectPermissions`, `getObjectPermissions`, `updateObjectPermissions`, `getPermissionLevels`.
  - `grants` package: free-form `privileges: string[]` (no enum), `principal: string` (single field, doesn't distinguish user vs group vs SP), `PrivilegeAssignment`, `getPermissions`, `updatePermissions`.
- Both packages claim the `Permissions` and `Permission*` keywords. A user navigating the SDK will see `permissions` and `grants` and reasonably wonder which to use. There is no surface-level disambiguation.
- **Category:** 12 (duplicate concepts across packages), 1 (vague top-level naming — neither package name is self-disambiguating).
- **Suggested name:** Rename one of the packages to make the disambiguation clear, e.g. `grants` → `unity-catalog-grants` or `uc-privileges`; `permissions` → `workspace-permissions` or `workspace-acl`. Or — at minimum — keep their public types non-overlapping (currently both export "Permission..."-prefixed types).
- **Rationale:** The two packages cover non-overlapping concrete operations (UC grants vs workspace-object ACLs) but use heavily overlapping vocabulary. This is an enormous discoverability hazard.

### 2. `PermissionsChange` (type) — `src/v1/model.ts:99`
- **Why weird:** Inconsistent vocabulary with the rest of the file. The package mostly uses `Privilege*` (`PrivilegeAssignment`, `EffectivePrivilege`, `EffectivePrivilegeAssignment`) but the change-payload is named `PermissionsChange` (plural "Permissions", not "Privilege"). The change describes adding/removing entries to `add: string[]` / `remove: string[]` where the strings are privileges. So the type is really a `PrivilegeChange` or `PrivilegeAssignmentChange`.
- **Category:** 17 (inconsistent vocabulary), 12 (concept overlap with `permissions` package).
- **Suggested name:** `PrivilegeChange` or `PermissionsChange` (and pick one across the file).
- **Rationale:** Internal vocabulary consistency.

### 3. `GetEffectivePermissionsRequest_Response` — `src/v1/model.ts:53,163`
- **Why weird:** Proto-architectural leak. The `Request_Response` underscore-separated name encodes the proto-style nested-message hierarchy (a `Response` message nested inside the `GetEffectivePermissionsRequest` enclosing message). TypeScript readers see a foreign tooling artifact, not an idiomatic type name. The companion `unmarshalGetEffectivePermissionsRequest_ResponseSchema` constant and the inline ESLint-disable comments (`Proto-style nested message name.`) confirm the leak is intentional but unidiomatic.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `GetEffectivePermissionsResponse`.
- **Rationale:** TypeScript has no notion of nested-message scoping; the underscore exists solely to mirror `message Foo { message Response { ... } }` in the source proto. Flattening to `GetEffectivePermissionsResponse` matches the rest of the SDK's response-type convention.

### 4. `GetPermissionsRequest_Response` — `src/v1/model.ts:89,177`
- **Why weird:** Same proto-architectural leak as #3. The `Request_Response` underscore-separated form is a direct port of a proto-nested message name; the accompanying schema constant (`unmarshalGetPermissionsRequest_ResponseSchema`) and the `Proto-style nested message name.` ESLint-disable comment make the proto origin explicit.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `GetPermissionsResponse`.
- **Rationale:** See #3.

### 5. `UpdatePermissionsRequest_Response` — `src/v1/model.ts:131,202`
- **Why weird:** Same proto-architectural leak as #3 and #4. The `Request_Response` naming and the `unmarshalUpdatePermissionsRequest_ResponseSchema` schema constant both carry the proto nested-message marker.
- **Category:** Proto-architectural leak (mid-position underscore separator from `.proto` nesting).
- **Suggested name:** `UpdatePermissionsResponse`.
- **Rationale:** See #3.

---

## Medium severity

### 6. `privileges: string[]` and `privilege: string` — model-wide (e.g. `src/v1/model.ts:7,24,106,108,118`)
- **Why weird:** Every privilege is typed as a free-form `string`. The Go SDK and Databricks UC API have a fixed enum of privilege names (`SELECT`, `MODIFY`, `USE_CATALOG`, `USE_SCHEMA`, `EXECUTE`, `CREATE_*`, `READ_VOLUME`, `WRITE_VOLUME`, etc.). The TS SDK exposes them as bare strings with no autocomplete, no type-checking, no documentation. A typo like `"SELCT"` will silently round-trip to the server.
- **Category:** 19 (underspecified), 1 (vague: `string` doesn't constrain meaning).
- **Suggested name:** Define a `Privilege` enum (or string literal union). At minimum document the valid values inline.
- **Rationale:** Type-safety is the entire point of TypeScript. The audit task explicitly flags "long enum values (many privilege values)" — the irony is that grants HAS the most privilege values of any UC operation and exposes ZERO of them as types.

### 7. `EffectivePrivilegeAssignment` — `src/v1/model.ts:20`
- **Why weird:** Three-word PascalCase name (`Effective` + `Privilege` + `Assignment`) that on first read parses as "Effective Privilege" / "Assignment" but on second read could parse as "Effective" / "Privilege Assignment". The conceptual model is "the privilege assignment that effectively applies (because of inheritance)", which the doc-comment confirms — but the name doesn't disambiguate.
- **Category:** 7 (overly verbose).
- **Suggested name:** Possibly leave as-is; alternative is `EffectiveAssignment` (drop `Privilege` since `Assignment` is privilege-specific in this file).
- **Rationale:** Marginal; flagged for symmetry with `EffectivePrivilege` (line 5).

### 8. `securableType: string` — model-wide (3 occurrences at `src/v1/model.ts:29,65,123`)
- **Why weird:** Free-form string for what should be an enum. UC defines a closed set of securable types (`CATALOG`, `SCHEMA`, `TABLE`, `VIEW`, `FUNCTION`, `VOLUME`, `EXTERNAL_LOCATION`, `STORAGE_CREDENTIAL`, `CONNECTION`, `METASTORE`, ...). The TS SDK exposes none of them.
- **Category:** 19 (underspecified), 1 (vague).
- **Suggested name:** Define a `SecurableType` enum.
- **Rationale:** Type-safety; closed sets should be enums.

---

## Low severity

### 9. `Client` — `src/v1/client.ts:41`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts` re-exports `Client` (line 3), so users write `import { Client } from '@databricks/sdk-grants/v1'`. Same name appears in every generated package — you can't have multiple grants/catalogs/etc. clients in one import without aliasing.
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `GrantsClient` (or whatever the package-specific name is).
- **Rationale:** Convention in `@aws-sdk/*`, `@google-cloud/*`, `@azure/*` is service-prefixed client class names for exactly this reason.

### 10. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:36`
- **Why weird:** `Segment` is a generic word; without the doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 11. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix), 17 (inconsistent).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Observations

### 12. `Client` constructor: `Host is required.` — `src/v1/client.ts:52`
Error message thrown but no client name in the message. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed.
- **Category:** Observation.

---
