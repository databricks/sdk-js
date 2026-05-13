# Naming Audit: workspaceassignment

**Path:** `packages/workspaceassignment/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level workspace permission assignments — list/get/update/delete the `USER`/`ADMIN` permissions a principal (user / service principal / group) has on a single workspace, plus list the catalog of workspace-level permission values supported.
**Total weird names flagged:** 36

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 14 |
| Low | 8 |
| Observation | 3 |

## High severity

### 1. Package name `workspaceassignment` (singular) vs API path `/permissionassignments` — package directory / `src/v1/client.ts:78,106,146,174`
- **Why weird:** The npm package is named `@databricks/sdk-workspaceassignment`, but every type in it is about a `PermissionAssignment` (`DeleteWorkspacePermissionAssignment`, `GetWorkspacePermissionAssignments`, `WorkspacePermissionAssignmentOutput`, ...), every URL ends in `permissionassignments`, and the conceptually equivalent type in the `iam` package is `WorkspaceAssignmentDetail`. So the package is called "workspace assignment" (singular, no qualifier) while the contents are uniformly "workspace permission assignment(s)" and the upstream iam port models the same domain object under a third name entirely. The singular package name is also a singular/plural mismatch with the operations it exposes (`getWorkspacePermissionAssignments`, plural).
- **Category:** 8 (redundant/inconsistent suffix), 9 (singular/plural), 12 (duplicate concept — `iam.WorkspaceAssignmentDetail`).
- **Suggested name:** Rename the package to `workspacepermissions` (matches the listWorkspacePermissions surface and the `permissionassignments` URL fragment), or merge into `iam` since `iam.WorkspaceAssignmentDetail` already covers the same conceptual entity. At minimum align with the route: `workspacepermissionassignments`.
- **Rationale:** Three different names for one concept across the SDK (`workspaceassignment` package, `WorkspacePermissionAssignment*` types, `iam.WorkspaceAssignmentDetail`) is a Discovery footgun — users searching for "workspace assignment" will hit the iam package first and miss this one.

### 2. `Permission` enum name — `src/v1/model.ts:5`
- **Why weird:** Top-level export named simply `Permission` is dangerously generic in a multi-package SDK. The iam package already defines `WorkspacePermission` (`packages/iam/src/v2/model.ts:58`) — three values (`USER_PERMISSION`/`ADMIN_PERMISSION`/`WORKSPACE_PERMISSION_UNSPECIFIED`) for the exact same domain concept. Importing both as `Permission` from `@databricks/sdk-workspaceassignment` and `WorkspacePermission` from `@databricks/sdk-iam` will leave users wondering whether they are interchangeable (they functionally are — both encode `USER` vs `ADMIN` workspace-level access).
- **Category:** 1 (vague/generic — `Permission` says nothing about scope), 12 (duplicate concept with `iam.WorkspaceAssignmentDetail` + `iam.WorkspacePermission`).
- **Suggested name:** `WorkspacePermission` (and reconcile with `iam.WorkspacePermission` — same shape, fewer values here).
- **Rationale:** Pick one name for the concept. `Permission` alone is the kind of name a user would shadow with a local variable and then bug-hunt for hours.

### 3. `Permission.UNKNOWN` — `src/v1/model.ts:6`
- **Why weird:** Sentinel value for "permission not set" leaks from protobuf semantics into the public TS surface. Idiomatic TS uses `undefined` for "not present". Every other enum in this codebase that has a sentinel uses `*_UNSPECIFIED` (e.g., `WORKSPACE_PERMISSION_UNSPECIFIED`, `PRINCIPAL_TYPE_UNSPECIFIED` in iam), so even the sentinel form is inconsistent.
- **Category:** 2 (redundant enum value not needed in TS), 14 (proto-style name).
- **Suggested name:** Remove `UNKNOWN` entirely; rely on `permissionLevel?: WorkspacePermission | undefined` for the not-set case. If a wire value must be representable, prefer `Unspecified` (PascalCase) to align with the rest of TS conventions or `WORKSPACE_PERMISSION_UNSPECIFIED` to align with iam.
- **Rationale:** `UNKNOWN` is *not* on the wire spec (the iam mirror uses `WORKSPACE_PERMISSION_UNSPECIFIED`), so this value is a TS-side invention that adds a third encoding of the same concept.

### 4. `DeleteWorkspacePermissionAssignment` — `src/v1/model.ts:13`
- **Why weird:** Type whose name is a verb phrase (`Delete...`). Same pattern repeats for `GetWorkspacePermissionAssignments`, `ListWorkspacePermissions`, `UpdateWorkspacePermissionAssignment`. Reads as an action / command, not as the request body. The `index.ts` re-exports them as `type DeleteWorkspacePermissionAssignment` — consumers see `import type {DeleteWorkspacePermissionAssignment}` and expect a method.
- **Category:** 6 (misleading: verb phrase as type name), 14 (Go-style naming where Go uses request type names directly), 17 (inconsistent verb form vs. iam package which uses `DeleteWorkspaceAssignmentDetailRequest`).
- **Suggested name:** `DeleteWorkspacePermissionAssignmentRequest` (and the parallel `Get…Request`, `List…Request`, `Update…Request`).
- **Rationale:** The iam package uses the `Request` suffix consistently (`DeleteWorkspaceAssignmentDetailRequest`, `UpdateWorkspaceAssignmentDetailRequest`, ...). The local convention here disagrees with the sibling package modelling the same domain.

### 5. `DeleteWorkspacePermissionAssignment_Response` underscored name — `src/v1/model.ts:23`
- **Why weird:** Underscore in identifier (proto-style nested type). Requires `eslint-disable @typescript-eslint/naming-convention` (line 22).
- **Category:** 4 (underscores), 14 (Go/proto-style names).
- **Suggested name:** `DeleteWorkspacePermissionAssignmentResponse`.
- **Rationale:** TS naming rule rejects `Foo_Bar`. The ESLint suppression is a tell that the name fights the language.

### 6. `GetWorkspacePermissionAssignments_Response` / `ListWorkspacePermissions_Response` underscored names — `src/v1/model.ts:40,58`
- **Why weird:** Same `Foo_Response` underscore proto pattern, both flagged with `eslint-disable @typescript-eslint/naming-convention`. The unmarshal schemas (lines 125, 129, 145) also share the underscore.
- **Category:** 4 (underscores in TS identifiers), 14 (Go/proto-style names).
- **Suggested name:** `GetWorkspacePermissionAssignmentsResponse`, `ListWorkspacePermissionsResponse` (and the corresponding `unmarshal…ResponseSchema`).
- **Rationale:** TS naming rule rejects `Foo_Bar`. The ESLint suppressions are tells that the names fight the language. Other sibling packages have already moved off the underscore convention in their newer versions; this one trails.

### 7. `GetWorkspacePermissionAssignments` request type for an HTTP `GET` that returns a *list* — `src/v1/model.ts:26`, `src/v1/client.ts:102`
- **Why weird:** The method `getWorkspacePermissionAssignments` returns a paginated list (`permissionAssignments`, `nextPageToken`, `prevPageToken`) — that is a `list` operation, not a `get`. Compare to `iam.ListWorkspaceAssignmentDetailsRequest` (same domain, different verb). Mislabelling pagination as "get" leads users to expect a single object back.
- **Category:** 6 (misleading verb), 13 (verb-tense inconsistency — `Get` for a list result), 17 (verb inconsistency with iam mirror).
- **Suggested name:** `ListWorkspacePermissionAssignmentsRequest` / `…Response`, method `listWorkspacePermissionAssignments`.
- **Rationale:** Pagination fields make this unambiguously a list. The current name reads as "get the assignments for this workspace" — singular intent, plural body — and is inconsistent with `iam.ListWorkspaceAssignmentDetails`.

### 8. `ListWorkspacePermissions` returns a static catalog, not data — `src/v1/model.ts:50`, `src/v1/client.ts:142`
- **Why weird:** `listWorkspacePermissions` returns the (fixed) catalog of `PermissionOutput` values (`USER`, `ADMIN`, ...) that the workspace supports. The Go SDK has identical confusion: every method called `list…` looks like it lists user data, but here it lists the *types of permissions that exist*. Plus the method appears side-by-side with `getWorkspacePermissionAssignments` (which actually lists assignments), so users will wire the wrong one.
- **Category:** 6 (misleading — name implies data, returns metadata), 15 (generic field `permissions` losing meaning).
- **Suggested name:** `ListAssignablePermissionsRequest` / `listAssignablePermissions`, or `GetSupportedWorkspacePermissions` / `getSupportedWorkspacePermissions`. Either makes the metadata nature explicit.
- **Rationale:** `listWorkspacePermissions(req)` vs `getWorkspacePermissionAssignments(req)` are visually similar enough that someone scanning autocomplete will pick the wrong one. The semantic gulf between them (catalog vs assignments) demands distinct verbs.

### 9. `PermissionOutput` / `PrincipalOutput` / `WorkspacePermissionAssignmentOutput` `Output` suffix — `src/v1/model.ts:63,70,115`
- **Why weird:** `Output` suffix is a generic noise word that adds zero information — every response shape is "output". The Go SDK uses `Output` because protobuf service definitions use `Output` as a request/response naming convention; in TS this surfaces as `Permission` vs `PermissionOutput`, two near-identical types differing only by the field semantics. The doc comment on `WorkspacePermissionAssignmentOutput` even spells it out: "The output format for existing workspace PermissionAssignment records". A name that needs the doc string to say "this is the output type" is the symptom.
- **Category:** 1 (vague suffix), 8 (redundant type suffix), 14 (proto/Go naming).
- **Suggested name:** Drop the `Output` suffix. `Permission` (the enum) and `PermissionDetail`/`PermissionDescription` (the wrapper carrying `description`) is one option; `WorkspacePermissionAssignment`, `Principal`, `PermissionDescriptor` is another. The iam mirror dropped `Output` already (`WorkspaceAssignmentDetail`, not `WorkspaceAssignmentDetailOutput`).
- **Rationale:** Cf. rule 1 of the audit list ("vague/generic"). `Output` carries no semantics and conflicts with the sibling type in the same package.

### 10. `WorkspacePermissionAssignmentOutput` vs `iam.WorkspaceAssignmentDetail` duplicate concept — `src/v1/model.ts:115` vs `packages/iam/src/v2/model.ts:983`
- **Why weird:** Two TS types modelling the same conceptual record:
  - `WorkspacePermissionAssignmentOutput` (here): `{ principal: PrincipalOutput, permissions: Permission[], error: string }`.
  - `iam.WorkspaceAssignmentDetail`: `{ principalId, workspaceId, accountId, principalType, entitlements }`.

  Both encode "what permissions does this principal have on this workspace?", but with different field sets and different field names. Users will not know which is canonical. The two packages share zero types.
- **Category:** 12 (duplicate concept), 1 (vague — `…Detail` vs `…Output` vs no suffix).
- **Suggested name:** Reconcile with iam. If the workspaceassignment API is older/account-level and iam is workspace-level, document that explicitly; if they overlap functionally, ship one shape and re-export from both packages.
- **Rationale:** This package is a tiny 4-method surface; living without a consistent type with iam is sustainable, but every SDK consumer will need to bridge the two by hand.

### 11. `PrincipalOutput.principalName` discriminated union — `src/v1/model.ts:71-87`
- **Why weird:** The discriminator field is named `principalName` and each variant carries its own typed sub-field (`userName`, `groupName`, `servicePrincipalName`). The variant tag values are also full identifier strings (`'userName' | 'groupName' | 'servicePrincipalName'`). The result is access like `principal.principalName.userName` — three name-words in a row. The actual `displayName` is a *separate* sibling field two lines down, so the structure conflates "what kind of principal is it?" with "what is its identifier?". The iam package handles the same idea more cleanly via a `principalType: PrincipalType` enum + a single `principalId: number` field.
- **Category:** 5 (cryptic / redundant), 11 (wrapper around oneof), 12 (duplicate of `iam.PrincipalType` mechanism), 15 (generic field names lose meaning when nested).
- **Suggested name:** `principalType: PrincipalType` enum + flatten the identifier to a single string field (or per-variant fields at the top level). Match the iam approach.
- **Rationale:** `principal.principalName.userName` is three nested name tokens when the encoding is "this principal is a user named X". A flatter `principalType: 'USER' | 'GROUP' | 'SERVICE_PRINCIPAL', principalName: string, displayName: string` reads far better.

## Medium severity

### 12. `accountId` doc comment "The account ID." — `src/v1/model.ts:14,28,51,95`
- **Why weird:** Doc is uniformly terse — "The account ID." Doesn't say whether it's a UUID, an integer, that it falls back to `ClientOptions.accountId` (per `client.ts:46-48`), that it's required for the URL path, or that it gets URL-injected and not query-parameterised. The same field appears in four request types with the same too-thin doc.
- **Category:** 19 (underspecified ID).
- **Suggested name:** Keep `accountId`, rewrite doc to `"Databricks account ID (UUID). If omitted on the request, falls back to ClientOptions.accountId. Required at request time — the SDK substitutes an empty string into the URL path if neither is set."`
- **Rationale:** This is the only ID that has a client-side fallback mechanism. Hiding that in a comment three files away is a footgun.

### 13. `workspaceId?: number` typed as `number` — `src/v1/model.ts:17,30,53,97`
- **Why weird:** Workspace IDs in Databricks are 64-bit integers; JS `number` loses precision above 2^53. Same problem on `principalId` (`number` too — model.ts:19,89,99). The client also unconditionally `String(req.workspaceId ?? '')`s the value into the URL (`client.ts:78,106,146,174`), implying string semantics are sufficient — meaning `number` was the wrong primitive to begin with.
- **Category:** 16 (field type contradicts domain), 19 (underspecified ID).
- **Suggested name:** Keep `workspaceId`, type as `bigint | string` (or `string` to match the URL serialisation).
- **Rationale:** Public Databricks workspace IDs cross 2^53 in account-level deployments; silent rounding bugs are a real risk. Same concern applies to `principalId`.

### 14. `permissionAssignments` vs `permissions` field names on response types — `src/v1/model.ts:42 vs 60,119`
- **Why weird:** `GetWorkspacePermissionAssignments_Response.permissionAssignments` is the list of assigned-principal records (with role). `ListWorkspacePermissions_Response.permissions` is the list of *permission types*. `WorkspacePermissionAssignmentOutput.permissions` is the *roles a single principal holds*. Three different things, two of them just called `permissions`.
- **Category:** 1 (vague), 15 (generic field name loses meaning), 17 (inconsistent label across siblings).
- **Suggested name:** On `ListWorkspacePermissions_Response`, rename `permissions` to `supportedPermissions` or `availablePermissions`. On `WorkspacePermissionAssignmentOutput`, rename `permissions` to `permissionLevels` or `grantedPermissions` to match the singular `permissionLevel` in `PermissionOutput`.
- **Rationale:** A user holding the response sees `.permissions` and can't tell whether it's "permissions held" or "permission types defined".

### 15. `PermissionOutput.permissionLevel` singular vs `WorkspacePermissionAssignmentOutput.permissions` plural — `src/v1/model.ts:64 vs 119`
- **Why weird:** The same `Permission` enum is held as singular on one type (`permissionLevel: Permission`) and plural on another (`permissions: Permission[]`). The lexical difference is significant (`level` vs no suffix) and inconsistent across the package. Internal users won't know whether to think of permissions as a scalar or set.
- **Category:** 9 (singular/plural inconsistency), 17 (inconsistent action verb / field name).
- **Suggested name:** Settle on one shape: if a principal can hold multiple levels, use `permissionLevels: Permission[]` everywhere. If `PermissionOutput` is really just describing a single level, name it `permission` (singular, matching the type).
- **Rationale:** `permissionLevel` and `permissions` are both `Permission`-typed; the asymmetry has no semantic justification visible in this file.

### 16. `WorkspacePermissionAssignmentOutput.error?: string` — `src/v1/model.ts:121`
- **Why weird:** Embedding an opaque error string inside the success response body. The pattern is "we succeeded enough to return data, but here's a per-record error message". This is unusual: typical SDK design surfaces errors as exceptions or as a typed error union. A bare `string` carrying potentially structured error content forces the user to parse strings. Also, `error` is a reserved-ish JS identifier (global `Error` class, `try/catch` `error` parameter) and clashes with style.
- **Category:** 1 (vague), 10 (reserved-word-adjacent), 15 (generic field loses meaning), 16 (field contradicting type — a success response carrying error data).
- **Suggested name:** `errorMessage` or `partialFailureReason`, typed as `string | undefined`. Better: model the assignment as `{ ok: true, data: ... } | { ok: false, error: ... }`.
- **Rationale:** The current shape leaks the per-record-error nature of the upstream API. At minimum rename to make the partial-failure semantics explicit.

### 17. `PermissionOutput.description` doc comment "The results of a permissions query." — `src/v1/model.ts:65-66`
- **Why weird:** Doc string is meaningless — "description" labelled as "results of a permissions query" gives the reader zero signal about what the string contains. Looking at the upstream this likely contains a human-readable description like "Allows full access" or "Read-only access".
- **Category:** 1 (vague — both field and doc).
- **Suggested name:** Keep `description`, rewrite doc to `"Human-readable description of what this permission grants (for example, 'Allows full administrative access to the workspace')."`.
- **Rationale:** The current JSDoc is worse than no doc at all because it suggests the field is a query-result wrapper.

### 18. `PrincipalOutput.principalName` discriminator tag values use camelCase — `src/v1/model.ts:73,78,83`
- **Why weird:** `$case` values are `'userName' | 'groupName' | 'servicePrincipalName'` — those are *field names*, not discriminator tags. A discriminator value should describe the *type* of the variant (`'user' | 'group' | 'servicePrincipal'`), not duplicate the field name. The current shape forces `principalName.userName` ("user name's user name").
- **Category:** 5 (cryptic — discriminator tag duplicates the field), 11 (trivial wrapper-around-oneof).
- **Suggested name:** Tag values `'user' | 'group' | 'servicePrincipal'`, payload field `name: string` across all three variants. Or flatten to enum + single string.
- **Rationale:** Discriminator should let `switch (p.principalName.$case)` read as `case 'user':` rather than `case 'userName':`.

### 19. `PrincipalOutput.principalId: number` opaque ID doc — `src/v1/model.ts:88-89`
- **Why weird:** Doc reads "The unique, opaque id of the principal." with `id` lowercase mid-sentence and no casing on the field. The same field on `DeleteWorkspacePermissionAssignment` / `UpdateWorkspacePermissionAssignment` (model.ts:19,99) is documented as `"The ID of the user, service principal, or group."` — same concept, two different docs. Also `number` typing same precision issue as workspaceId.
- **Category:** 16 (field type contradicts domain), 17 (inconsistent doc across sibling types), 19 (underspecified ID).
- **Suggested name:** Keep `principalId`, type as `bigint | string`, and use one consistent doc: `"Unique numeric identifier of the principal (user / service principal / group)."`.
- **Rationale:** Three call sites for the same field, three slightly different definitions, plus a precision risk.

### 20. `UpdateWorkspacePermissionAssignment.permissions` doc paragraph — `src/v1/model.ts:101-107`
- **Why weird:** A six-line JSDoc smuggling validation semantics into a public field comment: "If both 'USER' and 'ADMIN' are provided, 'ADMIN' takes precedence. Other values will be ignored. Note that excluding this field, or providing unsupported values, will have the same effect as providing an empty list, which will result in the deletion of all permissions for the principal." That last clause is a *destructive* behaviour hidden in a paragraph. Field name `permissions` plus this doc gives the field a meaning of "set or delete" depending on contents — too much overloading for one field.
- **Category:** 1 (vague — overloaded semantics), 6 (misleading — looks like an additive update, can be destructive).
- **Suggested name:** Either split into `setPermissions: Permission[]` / `clearPermissions: boolean`, or rename to `replacePermissions` with explicit doc "Replaces all permissions on the principal. Pass an empty array (or omit) to revoke all permissions."
- **Rationale:** Hiding a "delete everything" behaviour behind an empty/missing field is a destructive-by-omission API. Type signature should make it visible.

### 21. `PrincipalOutput.principalName.servicePrincipalName: string` — `src/v1/model.ts:83-86`
- **Why weird:** A service principal's name is here typed as `string`, but the `iam` package treats service principals as either a `principalType: PrincipalType.SERVICE_PRINCIPAL` enum value or by `applicationId`. The string-only name representation here disagrees with iam's identifier model.
- **Category:** 12 (duplicate concept with iam.PrincipalType.SERVICE_PRINCIPAL), 17 (inconsistent representation across siblings).
- **Suggested name:** Align with iam: principalType enum + a single name/id field. If kept, rename the variant to `name` so it reads `principal.principalName.$case === 'servicePrincipal' && principal.principalName.name`.
- **Rationale:** Two packages, two shapes for "the name of a service principal" — pick one.

### 22. `nextPageToken` / `prevPageToken` asymmetric naming — `src/v1/model.ts:44,46`
- **Why weird:** `nextPageToken` spells "next" out, `prevPageToken` abbreviates "prev". One or the other — `prev` vs `next` is a length mismatch with no win.
- **Category:** 5 (cryptic abbreviation `prev`), 17 (inconsistent abbreviation rule).
- **Suggested name:** `previousPageToken` (matches `nextPageToken`'s full-word style) or `prevPageToken` + `nextPageToken` paired (but then "next" is the outlier). Spell out both: `previousPageToken` / `nextPageToken`.
- **Rationale:** Symmetry — paired pagination tokens deserve paired naming.

### 23. `GetWorkspacePermissionAssignments.filter?: string` — `src/v1/model.ts:36`
- **Why weird:** A bare `filter: string` field documented as "Filter string to search principals." Server-side query DSL hidden behind a `string`. Users must know what filter syntax to type. Same problem any time a public SDK exposes "filter" without typing the filter language.
- **Category:** 1 (vague), 15 (generic field loses meaning).
- **Suggested name:** `principalFilter` (more specific) plus a JSDoc snippet of the supported syntax.
- **Rationale:** Naming alone won't solve this, but `filter` is the worst-case name.

### 24. `GetWorkspacePermissionAssignments.maxResults` plural-confusing — `src/v1/model.ts:34`
- **Why weird:** "Maximum number of permission assignments to return." Field name uses a generic `maxResults` while the response field is `permissionAssignments`. Pair them: `maxAssignments` would read better, or document explicitly. Compare `accountaccesscontrolproxy` and other sibling packages — usage of `pageSize` is common.
- **Category:** 1 (vague), 17 (inconsistent paging field naming across packages).
- **Suggested name:** `pageSize` to align with REST list conventions (which is also what the wire param `max_results` carries in many Databricks APIs).
- **Rationale:** Consistency across the SDK; the same concept should not be `pageSize` in one package, `maxResults` in another, and `limit` in a third.

### 25. `DeleteWorkspacePermissionAssignment` 51-character type name — `src/v1/model.ts:13`
- **Why weird:** `DeleteWorkspacePermissionAssignment_Response` is a 53-character type name. `WorkspacePermissionAssignmentOutput` is 35 characters. Every type in the file is 30+ characters. Verbose for a four-method package. Suggest a shorter umbrella prefix.
- **Category:** 7 (overly verbose).
- **Suggested name:** Drop `Workspace` prefix when the entire package scope is workspace (e.g., `DeletePermissionAssignmentRequest`) — the package name already says workspace. Or shorten to `Assignment`.
- **Rationale:** `await client.deleteWorkspacePermissionAssignment(req)` is 41 characters before the open paren. The package scope already conveys "workspace".

## Low severity

### 26. `permissionassignments` URL fragment is one word — `src/v1/client.ts:78,106,146,174`
- **Why weird:** REST path uses `/permissionassignments/` (no separator), while every other Databricks REST resource in this SDK uses hyphenated paths (`/clean-rooms`, `/external-locations`, etc.). This is a wire-format problem, not a TS naming problem, but it spills into the visual feel of the client URLs.
- **Category:** 3 (casing/separator inconsistency).
- **Suggested name:** N/A for TS, but flag upstream: prefer `permission-assignments`.
- **Rationale:** Cross-API consistency.

### 27. `accountId?: string | undefined` doc placement — `src/v1/model.ts:14,15`
- **Why weird:** Doc above `accountId` says "The account ID." but the equally important fallback semantics live in `client.ts:46-48` ("Fallback for endpoints whose path contains {account_id}. If the request already carries an accountId, that value wins."). Doc is on the wrong side.
- **Category:** 19 (underspecified ID).
- **Suggested name:** Move/duplicate the fallback semantics into the model.ts JSDoc.
- **Rationale:** Most users read model.ts, not client.ts.

### 28. `displayName` doc terseness — `src/v1/model.ts:91`
- **Why weird:** Doc "The display name of the principal." while the discriminated union variants above carry their own names (`userName`, `groupName`, `servicePrincipalName`). Relationship between `displayName` and the variant names is undocumented (the variant names are the canonical identifier; `displayName` is the human-friendly label — but a reader has to guess).
- **Category:** 1 (vague doc).
- **Suggested name:** Keep field name, expand doc.
- **Rationale:** A two-field name model deserves explicit roles.

### 29. `Permission.USER` doc string — `src/v1/model.ts:7-8`
- **Why weird:** Doc "The most basic workspace permission" on `USER` but no doc on `ADMIN`. Asymmetric annotation; reader concludes `ADMIN` has no doc because it's "obvious", but `USER` does because — what? The same enum in iam (`WorkspacePermission`) also docs `USER_PERMISSION` and nothing else. Pattern is consistent, but still strange.
- **Category:** 17 (inconsistent annotation across enum members).
- **Suggested name:** Document both, or document neither.
- **Rationale:** Hover docs read better with parity.

### 30. `URL path interpolation uses unencoded segments` — `src/v1/client.ts:78,106,146,174`
- **Why weird:** Not a naming finding strictly, but worth flagging: paths interpolate `${req.accountId ?? ''}` / `${String(req.workspaceId ?? '')}` directly into URLs without `encodeURIComponent`. If a malicious or weird `accountId` ever lands in here, path injection is possible. Sibling packages use the same pattern, so it's project-wide.
- **Category:** N/A (security/correctness, not naming).
- **Suggested name:** N/A. Flag for hardening.
- **Rationale:** Belongs in a different audit, but caught in passing.

### 31. `unmarshalGetWorkspacePermissionAssignments_ResponseSchema` 56-char symbol name — `src/v1/model.ts:129`
- **Why weird:** Schema name combining `unmarshal` prefix + camelCase type + `_Response` underscore + `Schema` suffix. A single identifier carrying four naming conventions.
- **Category:** 4 (underscore), 7 (verbose), 8 (redundant suffix).
- **Suggested name:** `listWorkspacePermissionAssignmentsResponseSchema` (after renaming Get→List and dropping the underscore).
- **Rationale:** Same cleanup as the type rename.

### 32. `marshalUpdateWorkspacePermissionAssignmentSchema` — `src/v1/model.ts:203`
- **Why weird:** Same prefix/suffix concern. Naming inconsistency: the `unmarshal*` schemas are typed `z.ZodType<Foo>`; the `marshal*` schema is untyped (`z.ZodType` without parameter, model.ts:203). Asymmetry in the generated code.
- **Category:** 17 (inconsistent typing across marshal/unmarshal pair).
- **Suggested name:** Type as `z.ZodType<UpdateWorkspacePermissionAssignment>` to match the read-side symbol shape.
- **Rationale:** Better IDE inference.

### 33. `executeCall` / `executeHttpCall` near-duplicate function names — `src/v1/utils.ts:26,65`
- **Why weird:** Same package exports two top-level functions named `executeCall` and `executeHttpCall`. One unwraps `Options`; the other actually sends the request and parses. The names give no hint of the layering.
- **Category:** 1 (vague), 6 (misleading).
- **Suggested name:** `executeWithOptions` (or just `runCall`) for the first, `sendHttpRequest` / `dispatchAndParse` for the second.
- **Rationale:** Visual disambiguation; today both look identical at the import-name level.

## Observations

### 34. `flattenQueryParams` is exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Exported helper function for nested query-param flattening, but the client only uses `params.append('page_token', req.pageToken)` style calls (`client.ts:108-115`) — never calls `flattenQueryParams`. Dead code in the public surface or boilerplate generator output. The export bloats the package surface.
- **Category:** 11 (dead code / unused export).
- **Suggested name:** Remove the export, or use it.
- **Rationale:** Public API surface should match what is actually used.

### 35. `parseResponse` / `marshalRequest` are general utilities exported per-package — `src/v1/utils.ts:113,119`
- **Why weird:** These two functions are domain-agnostic JSON marshalling helpers; identical (or nearly identical) versions almost certainly exist in every sibling package's `utils.ts`. Duplicated boilerplate per package.
- **Category:** 12 (duplicate concept across packages).
- **Suggested name:** Hoist to `@databricks/sdk-core` and import.
- **Rationale:** Generator output for every API package likely repeats this. Cf. the same pattern in `accountaccesscontrol` etc.

### 36. Side-by-side `getWorkspacePermissionAssignments` and `listWorkspacePermissions` — `src/v1/client.ts:102,142`
- **Why weird:** Two list-like methods, one named `get*` (returns paginated list), one named `list*` (returns a static catalog). Naming inverts the more usual REST convention where `list*` is paginated and `get*` is singular.
- **Category:** 17 (inconsistent action verbs), 13 (verb-tense inconsistency).
- **Suggested name:** `getWorkspacePermissionAssignments` → `listWorkspacePermissionAssignments`; `listWorkspacePermissions` → `getSupportedWorkspacePermissions`. Now `list*` always paginates, `get*` is a one-shot.
- **Rationale:** Cf. finding 7 + 8. Worth flagging once more as a pair-level observation.

## Cross-cutting themes
1. **Proto/Go-style names leak through generation.** Eight findings (1, 3, 4, 5, 6, 9, 14, 31) trace to the upstream Go SDK's protobuf-derived shapes: `*_Response` underscore types, `*_UNSPECIFIED` / `UNKNOWN` enum sentinels, `*Output` suffixes, verb-phrase request type names, and double-wrapped oneof discriminators. None are idiomatic TS.
2. **Duplicated domain modelling with `iam` package.** Findings 1, 2, 10, 11, 21 highlight that `iam.WorkspaceAssignmentDetail`, `iam.WorkspacePermission`, and `iam.PrincipalType` already model the same concepts under different names and shapes. The two packages should either share types or one should redirect to the other.
3. **Misleading verb assignment for list vs get.** Findings 7, 8, 36 — the paginated method is named `get*`, the static-catalog method is named `list*`. This inverts the REST-list convention used elsewhere in the SDK.
4. **Underspecified IDs and weak typing.** Findings 12, 13, 19, 27 — IDs are `number` (precision risk) or thinly typed `string`, with critical fallback / serialisation behaviour hidden in client.ts comments rather than the type.
