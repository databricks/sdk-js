# Naming Audit: workspaceassignment

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/accessmanagement/src/v1/` (source moved here; the
`workspaceassignment` source directory no longer exists, but the
WorkspacePermissionAssignment surface continues to live in the
`accessmanagement` package).
**Versions audited:** v1
**Inferred domain:** Account-level workspace permission assignments — list/get/update/delete the `USER`/`ADMIN` permissions a principal (user / service principal / group) has on a single workspace, plus list the catalog of workspace-level permission values supported.
**Total weird names flagged:** 23

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 9 |
| Low | 6 |
| Observation | 1 |


## High severity

### 1. Package name `workspaceassignment` (historic) / `accessmanagement` (current) vs API path `/permissionassignments` — package directory / `src/v1/client.ts:103,131,159,187`
- **Why weird:** The npm package is named `@databricks/sdk-workspaceassignment`, but every type in it is about a `PermissionAssignment` (`DeleteWorkspacePermissionAssignmentRequest`, `GetWorkspacePermissionAssignmentsRequest_Response`, `WorkspacePermissionAssignmentOutput`, ...), every URL ends in `permissionassignments`, and the conceptually equivalent type in the `iam` package is `WorkspaceAssignmentDetail`. So the package is called "workspace assignment" (singular, no qualifier) while the contents are uniformly "workspace permission assignment(s)" and the upstream iam port models the same domain object under a third name entirely. The singular package name is also a singular/plural mismatch with the operations it exposes (`getWorkspacePermissionAssignments`, plural). The surface has since been merged into `accessmanagement`, which is broader but still does not match the `/permissionassignments` URL fragment.
- **Category:** 8 (redundant/inconsistent suffix), 9 (singular/plural), 12 (duplicate concept — `iam.WorkspaceAssignmentDetail`).
- **Suggested name:** Rename the package to `workspacepermissions` (matches the listWorkspacePermissions surface and the `permissionassignments` URL fragment), or merge into `iam` since `iam.WorkspaceAssignmentDetail` already covers the same conceptual entity. At minimum align with the route: `workspacepermissionassignments`.
- **Rationale:** Three different names for one concept across the SDK (`workspaceassignment` package, `WorkspacePermissionAssignment*` types, `iam.WorkspaceAssignmentDetail`) is a Discovery footgun — users searching for "workspace assignment" will hit the iam package first and miss this one.

### 2. `WorkspacePermission.UNKNOWN` sentinel inconsistent with `*_UNSPECIFIED` used elsewhere — `src/v1/model.ts:40`
- **Why weird:** This package uses `UNKNOWN` as the zero-value sentinel, but every other enum in this codebase uses `*_UNSPECIFIED` (e.g., `REQUEST_AUTHZ_IDENTITY_UNSPECIFIED` in this same file at model.ts:34; `WORKSPACE_PERMISSION_UNSPECIFIED`, `PRINCIPAL_TYPE_UNSPECIFIED` in iam). The sentinel form is inconsistent across packages modelling the same concept.
- **Category:** 17 (inconsistent sentinel naming across enums in the same codebase).
- **Suggested name:** Rename `UNKNOWN` to `WORKSPACE_PERMISSION_UNSPECIFIED` to align with the iam mirror and the rest of the SDK.
- **Rationale:** The iam mirror of this same concept uses `WORKSPACE_PERMISSION_UNSPECIFIED`. A consistent sentinel name across packages reduces user confusion when bridging the two.

### 3. `GetWorkspacePermissionAssignmentsRequest` request type for an HTTP `GET` that returns a *list* — `src/v1/model.ts:203`, `src/v1/client.ts:127`
- **Why weird:** The method `getWorkspacePermissionAssignments` returns a list of `permissionAssignments` (model.ts:213). That is a `list` operation, not a `get`. Compare to `iam.ListWorkspaceAssignmentDetailsRequest` (same domain, different verb). Mislabelling a list as "get" leads users to expect a single object back.
- **Category:** 6 (misleading verb), 13 (verb-tense inconsistency — `Get` for a list result), 17 (verb inconsistency with iam mirror).
- **Suggested name:** `ListWorkspacePermissionAssignmentsRequest` / `…Response`, method `listWorkspacePermissionAssignments`.
- **Rationale:** A plural-result response makes this unambiguously a list. The current name reads as "get the assignments for this workspace" — singular intent, plural body — and is inconsistent with `iam.ListWorkspaceAssignmentDetails`.

### 4. `ListWorkspacePermissionsRequest` returns a static catalog, not data — `src/v1/model.ts:231`, `src/v1/client.ts:155`
- **Why weird:** `listWorkspacePermissions` returns the (fixed) catalog of `PermissionOutput` values (`USER`, `ADMIN`, ...) that the workspace supports. The Go SDK has identical confusion: every method called `list…` looks like it lists user data, but here it lists the *types of permissions that exist*. Plus the method appears side-by-side with `getWorkspacePermissionAssignments` (which actually lists assignments), so users will wire the wrong one.
- **Category:** 6 (misleading — name implies data, returns metadata), 15 (generic field `permissions` losing meaning).
- **Suggested name:** `ListAssignablePermissionsRequest` / `listAssignablePermissions`, or `GetSupportedWorkspacePermissions` / `getSupportedWorkspacePermissions`. Either makes the metadata nature explicit.
- **Rationale:** `listWorkspacePermissions(req)` vs `getWorkspacePermissionAssignments(req)` are visually similar enough that someone scanning autocomplete will pick the wrong one. The semantic gulf between them (catalog vs assignments) demands distinct verbs.

### 5. `PermissionOutput` / `PrincipalOutput` / `WorkspacePermissionAssignmentOutput` `Output` suffix — `src/v1/model.ts:250,268,383`
- **Why weird:** `Output` suffix is a generic noise word that adds zero information — every response shape is "output". The Go SDK uses `Output` because protobuf service definitions use `Output` as a request/response naming convention; in TS this surfaces as `Permission` vs `PermissionOutput`, two near-identical types differing only by the field semantics. The doc comment on `WorkspacePermissionAssignmentOutput` even spells it out: "The output format for existing workspace PermissionAssignment records". A name that needs the doc string to say "this is the output type" is the symptom.
- **Category:** 1 (vague suffix), 8 (redundant type suffix), 14 (proto/Go naming).
- **Suggested name:** Drop the `Output` suffix. `Permission` (the enum) and `PermissionDetail`/`PermissionDescription` (the wrapper carrying `description`) is one option; `WorkspacePermissionAssignment`, `Principal`, `PermissionDescriptor` is another. The iam mirror dropped `Output` already (`WorkspaceAssignmentDetail`, not `WorkspaceAssignmentDetailOutput`).
- **Rationale:** Cf. rule 1 of the audit list ("vague/generic"). `Output` carries no semantics and conflicts with the sibling type in the same package.

### 6. `WorkspacePermissionAssignmentOutput` vs `iam.WorkspaceAssignmentDetail` duplicate concept — `src/v1/model.ts:383` vs `packages/iam/src/v2/model.ts:983`
- **Why weird:** Two TS types modelling the same conceptual record:
  - `WorkspacePermissionAssignmentOutput` (here): `{ principal: PrincipalOutput, permissions: WorkspacePermission[], error: string }`.
  - `iam.WorkspaceAssignmentDetail`: `{ principalId, workspaceId, accountId, principalType, entitlements }`.

  Both encode "what permissions does this principal have on this workspace?", but with different field sets and different field names. Users will not know which is canonical. The two packages share zero types.
- **Category:** 12 (duplicate concept), 1 (vague — `…Detail` vs `…Output` vs no suffix).
- **Suggested name:** Reconcile with iam. If the workspaceassignment API is older/account-level and iam is workspace-level, document that explicitly; if they overlap functionally, ship one shape and re-export from both packages.
- **Rationale:** This surface is a tiny 4-method slice within `accessmanagement`; living without a consistent type with iam is sustainable, but every SDK consumer will need to bridge the two by hand.

### 7. `PrincipalOutput.principalName` discriminated union — `src/v1/model.ts:268-285`
- **Why weird:** The discriminator field is named `principalName` and each variant carries its own typed sub-field (`userName`, `groupName`, `servicePrincipalName`). The variant tag values are also full identifier strings (`'userName' | 'groupName' | 'servicePrincipalName'`). The result is access like `principal.principalName.userName` — three name-words in a row. The actual `displayName` is a *separate* sibling field two lines down, so the structure conflates "what kind of principal is it?" with "what is its identifier?". The iam package handles the same idea more cleanly via a `principalType: PrincipalType` enum + a single `principalId: number` field.
- **Category:** 5 (cryptic / redundant), 11 (wrapper around oneof), 12 (duplicate of `iam.PrincipalType` mechanism), 15 (generic field names lose meaning when nested).
- **Suggested name:** `principalType: PrincipalType` enum + flatten the identifier to a single string field (or per-variant fields at the top level). Match the iam approach.
- **Rationale:** `principal.principalName.userName` is three nested name tokens when the encoding is "this principal is a user named X". A flatter `principalType: 'USER' | 'GROUP' | 'SERVICE_PRINCIPAL', principalName: string, displayName: string` reads far better.

## Medium severity

### 8. `accountId` doc comment "The account ID." — `src/v1/model.ts:123,204,232,363`
- **Why weird:** Doc is uniformly terse — "The account ID." Doesn't say whether it's a UUID, an integer, that it falls back to `ClientOptions.accountId` (per `client.ts:71-73,86`), that it's required for the URL path, or that it gets URL-injected and not query-parameterised. The same field appears in four request types with the same too-thin doc.
- **Category:** 19 (underspecified ID).
- **Suggested name:** Keep `accountId`, rewrite doc to `"Databricks account ID (UUID). If omitted on the request, falls back to ClientOptions.accountId. Required at request time — the SDK substitutes an empty string into the URL path if neither is set."`
- **Rationale:** This is the only ID that has a client-side fallback mechanism. Hiding that in a comment three files away is a footgun.

### 9. `workspaceId?: number` typed as `number` — `src/v1/model.ts:126,207,235,366`
- **Why weird:** Workspace IDs in Databricks are 64-bit integers; JS `number` loses precision above 2^53. Same problem on `principalId` (`number` too — model.ts:128,287,368). The client also unconditionally `String(req.workspaceId ?? '')`s the value into the URL (`client.ts:103,131,159,187`), implying string semantics are sufficient — meaning `number` was the wrong primitive to begin with.
- **Category:** 16 (field type contradicts domain), 19 (underspecified ID).
- **Suggested name:** Keep `workspaceId`, type as `bigint | string` (or `string` to match the URL serialisation).
- **Rationale:** Public Databricks workspace IDs cross 2^53 in account-level deployments; silent rounding bugs are a real risk. Same concern applies to `principalId`.

### 10. `permissionAssignments` vs `permissions` field names on response types — `src/v1/model.ts:213 vs 241,387`
- **Why weird:** The response for `getWorkspacePermissionAssignments` carries `permissionAssignments` (list of assigned-principal records with role). The response for `listWorkspacePermissions` carries `permissions` (list of *permission types*). `WorkspacePermissionAssignmentOutput.permissions` is the *roles a single principal holds*. Three different things, two of them just called `permissions`.
- **Category:** 1 (vague), 15 (generic field name loses meaning), 17 (inconsistent label across siblings).
- **Suggested name:** On the list-permissions response, rename `permissions` to `supportedPermissions` or `availablePermissions`. On `WorkspacePermissionAssignmentOutput`, rename `permissions` to `permissionLevels` or `grantedPermissions` to match the singular `permissionLevel` in `PermissionOutput`.
- **Rationale:** A user holding the response sees `.permissions` and can't tell whether it's "permissions held" or "permission types defined".

### 11. `PermissionOutput.permissionLevel` singular vs `WorkspacePermissionAssignmentOutput.permissions` plural — `src/v1/model.ts:251 vs 387`
- **Why weird:** The same `WorkspacePermission` enum is held as singular on one type (`permissionLevel: WorkspacePermission`) and plural on another (`permissions: WorkspacePermission[]`). The lexical difference is significant (`level` vs no suffix) and inconsistent across the package. Internal users won't know whether to think of permissions as a scalar or set.
- **Category:** 9 (singular/plural inconsistency), 17 (inconsistent action verb / field name).
- **Suggested name:** Settle on one shape: if a principal can hold multiple levels, use `permissionLevels: WorkspacePermission[]` everywhere. If `PermissionOutput` is really just describing a single level, name it `permission` (singular, matching the type).
- **Rationale:** `permissionLevel` and `permissions` are both `WorkspacePermission`-typed; the asymmetry has no semantic justification visible in this file.

### 12. `WorkspacePermissionAssignmentOutput.error?: string` — `src/v1/model.ts:389`
- **Why weird:** Embedding an opaque error string inside the success response body. The pattern is "we succeeded enough to return data, but here's a per-record error message". This is unusual: typical SDK design surfaces errors as exceptions or as a typed error union. A bare `string` carrying potentially structured error content forces the user to parse strings. Also, `error` is a reserved-ish JS identifier (global `Error` class, `try/catch` `error` parameter) and clashes with style.
- **Category:** 1 (vague), 10 (reserved-word-adjacent), 15 (generic field loses meaning), 16 (field contradicting type — a success response carrying error data).
- **Suggested name:** `errorMessage` or `partialFailureReason`, typed as `string | undefined`. Better: model the assignment as `{ ok: true, data: ... } | { ok: false, error: ... }`.
- **Rationale:** The current shape leaks the per-record-error nature of the upstream API. At minimum rename to make the partial-failure semantics explicit.

### 13. `PermissionOutput.description` doc comment "The results of a permissions query." — `src/v1/model.ts:252-253`
- **Why weird:** Doc string is meaningless — "description" labelled as "results of a permissions query" gives the reader zero signal about what the string contains. Looking at the upstream this likely contains a human-readable description like "Allows full access" or "Read-only access".
- **Category:** 1 (vague — both field and doc).
- **Suggested name:** Keep `description`, rewrite doc to `"Human-readable description of what this permission grants (for example, 'Allows full administrative access to the workspace')."`.
- **Rationale:** The current JSDoc is worse than no doc at all because it suggests the field is a query-result wrapper.

### 14. `PrincipalOutput.principalName` discriminator tag values use camelCase — `src/v1/model.ts:271,276,281`
- **Why weird:** `$case` values are `'userName' | 'groupName' | 'servicePrincipalName'` — those are *field names*, not discriminator tags. A discriminator value should describe the *type* of the variant (`'user' | 'group' | 'servicePrincipal'`), not duplicate the field name. The current shape forces `principalName.userName` ("user name's user name").
- **Category:** 5 (cryptic — discriminator tag duplicates the field), 11 (trivial wrapper-around-oneof).
- **Suggested name:** Tag values `'user' | 'group' | 'servicePrincipal'`, payload field `name: string` across all three variants. Or flatten to enum + single string.
- **Rationale:** Discriminator should let `switch (p.principalName.$case)` read as `case 'user':` rather than `case 'userName':`.

### 15. `PrincipalOutput.principalId: number` opaque ID doc — `src/v1/model.ts:286-287`
- **Why weird:** Doc reads "The unique, opaque id of the principal." with `id` lowercase mid-sentence and no casing on the field. The same field on `DeleteWorkspacePermissionAssignmentRequest` / `UpdateWorkspacePermissionAssignmentRequest` (model.ts:128,368) is documented as `"The ID of the user, service principal, or group."` — same concept, two different docs. Also `number` typing same precision issue as workspaceId.
- **Category:** 16 (field type contradicts domain), 17 (inconsistent doc across sibling types), 19 (underspecified ID).
- **Suggested name:** Keep `principalId`, type as `bigint | string`, and use one consistent doc: `"Unique numeric identifier of the principal (user / service principal / group)."`.
- **Rationale:** Three call sites for the same field, three slightly different definitions, plus a precision risk.

### 16. `UpdateWorkspacePermissionAssignmentRequest.permissions` doc paragraph — `src/v1/model.ts:369-376`
- **Why weird:** A multi-line JSDoc smuggling validation semantics into a public field comment: "If both 'USER' and 'ADMIN' are provided, 'ADMIN' takes precedence. Other values will be ignored. Note that excluding this field, or providing unsupported values, will have the same effect as providing an empty list, which will result in the deletion of all permissions for the principal." That last clause is a *destructive* behaviour hidden in a paragraph. Field name `permissions` plus this doc gives the field a meaning of "set or delete" depending on contents — too much overloading for one field.
- **Category:** 1 (vague — overloaded semantics), 6 (misleading — looks like an additive update, can be destructive).
- **Suggested name:** Either split into `setPermissions: WorkspacePermission[]` / `clearPermissions: boolean`, or rename to `replacePermissions` with explicit doc "Replaces all permissions on the principal. Pass an empty array (or omit) to revoke all permissions."
- **Rationale:** Hiding a "delete everything" behaviour behind an empty/missing field is a destructive-by-omission API. Type signature should make it visible.

## Low severity

### 17. `PrincipalOutput.principalName.servicePrincipalName: string` — `src/v1/model.ts:281-284`
- **Why weird:** A service principal's name is here typed as `string`, but the `iam` package treats service principals as either a `principalType: PrincipalType.SERVICE_PRINCIPAL` enum value or by `applicationId`. The string-only name representation here disagrees with iam's identifier model.
- **Category:** 12 (duplicate concept with iam.PrincipalType.SERVICE_PRINCIPAL), 17 (inconsistent representation across siblings).
- **Suggested name:** Align with iam: principalType enum + a single name/id field. If kept, rename the variant to `name` so it reads `principal.principalName.$case === 'servicePrincipal' && principal.principalName.name`.
- **Rationale:** Two packages, two shapes for "the name of a service principal" — pick one.

### 18. `permissionassignments` URL fragment is one word — `src/v1/client.ts:103,131,159,187`
- **Why weird:** REST path uses `/permissionassignments/` (no separator), while every other Databricks REST resource in this SDK uses hyphenated paths (`/clean-rooms`, `/external-locations`, etc.). This is a wire-format problem, not a TS naming problem, but it spills into the visual feel of the client URLs.
- **Category:** 3 (casing/separator inconsistency).
- **Suggested name:** N/A for TS, but flag upstream: prefer `permission-assignments`.
- **Rationale:** Cross-API consistency.

### 19. `accountId?: string | undefined` doc placement — `src/v1/model.ts:123,124`
- **Why weird:** Doc above `accountId` says "The account ID." but the equally important fallback semantics live in `client.ts:71-73` ("Fallback for endpoints whose path contains {account_id}. If the request already carries an accountId, that value wins."). Doc is on the wrong side.
- **Category:** 19 (underspecified ID).
- **Suggested name:** Move/duplicate the fallback semantics into the model.ts JSDoc.
- **Rationale:** Most users read model.ts, not client.ts.

### 20. `displayName` doc terseness — `src/v1/model.ts:288-289`
- **Why weird:** Doc "The display name of the principal." while the discriminated union variants above carry their own names (`userName`, `groupName`, `servicePrincipalName`). Relationship between `displayName` and the variant names is undocumented (the variant names are the canonical identifier; `displayName` is the human-friendly label — but a reader has to guess).
- **Category:** 1 (vague doc).
- **Suggested name:** Keep field name, expand doc.
- **Rationale:** A two-field name model deserves explicit roles.

### 21. `WorkspacePermission.USER` doc string — `src/v1/model.ts:41-42`
- **Why weird:** Doc "The most basic workspace permission" on `USER` but no doc on `ADMIN`. Asymmetric annotation; reader concludes `ADMIN` has no doc because it's "obvious", but `USER` does because — what? The same enum in iam (`WorkspacePermission`) also docs `USER_PERMISSION` and nothing else. Pattern is consistent, but still strange.
- **Category:** 17 (inconsistent annotation across enum members).
- **Suggested name:** Document both, or document neither.
- **Rationale:** Hover docs read better with parity.

### 22. URL path interpolation uses unencoded segments — `src/v1/client.ts:103,131,159,187`
- **Why weird:** Not a naming finding strictly, but worth flagging: paths interpolate `${req.accountId ?? ''}` / `${String(req.workspaceId ?? '')}` directly into URLs without `encodeURIComponent`. If a malicious or weird `accountId` ever lands in here, path injection is possible. Sibling packages use the same pattern, so it's project-wide.
- **Category:** N/A (security/correctness, not naming).
- **Suggested name:** N/A. Flag for hardening.
- **Rationale:** Belongs in a different audit, but caught in passing.

## Observations

### 23. Side-by-side `getWorkspacePermissionAssignments` and `listWorkspacePermissions` — `src/v1/client.ts:127,155`
- **Why weird:** Two list-like methods, one named `get*` (returns array of assignments), one named `list*` (returns a static catalog). Naming inverts the more usual REST convention where `list*` is paginated and `get*` is singular.
- **Category:** 17 (inconsistent action verbs), 13 (verb-tense inconsistency).
- **Suggested name:** `getWorkspacePermissionAssignments` → `listWorkspacePermissionAssignments`; `listWorkspacePermissions` → `getSupportedWorkspacePermissions`. Now `list*` always returns assignments, `get*` is a one-shot catalog read.
- **Rationale:** Cf. finding 3 + 4. Worth flagging once more as a pair-level observation.

## Cross-cutting themes
1. **Non-idiomatic TS shapes.** Findings 5, 7 — `*Output` suffixes and double-wrapped oneof discriminators. Neither is idiomatic TS.
2. **Duplicated domain modelling with `iam` package.** Findings 1, 6, 7, 17 highlight that `iam.WorkspaceAssignmentDetail`, `iam.WorkspacePermission`, and `iam.PrincipalType` already model the same concepts under different names and shapes. The two packages should either share types or one should redirect to the other.
3. **Misleading verb assignment for list vs get.** Findings 3, 4, 23 — the array-returning method is named `get*`, the static-catalog method is named `list*`. This inverts the REST-list convention used elsewhere in the SDK.
4. **Underspecified IDs and weak typing.** Findings 8, 9, 15, 19 — IDs are `number` (precision risk) or thinly typed `string`, with critical fallback / serialisation behaviour hidden in client.ts comments rather than the type.

## Fixed
- #2 `Permission` enum name (originally cited at `src/v1/model.ts:5`): Fixed in regeneration on 2026-05-20 — enum renamed to `WorkspacePermission` (model.ts:39), no longer a vague top-level `Permission` symbol.
- #4 `DeleteWorkspacePermissionAssignment` verb-phrase type name (originally cited at `src/v1/model.ts:13`): Fixed in regeneration on 2026-05-20 — `Request` suffix now applied across `Delete…Request`, `Get…Request`, `List…Request`, `Update…Request` (model.ts:122,203,231,362).
- #20 `nextPageToken` / `prevPageToken` asymmetric naming (originally cited at `src/v1/model.ts:44,46`): Fixed in regeneration on 2026-05-20 — pagination tokens removed from `GetWorkspacePermissionAssignmentsRequest_Response`; the response carries only `permissionAssignments` (model.ts:211-214).
- #21 `GetWorkspacePermissionAssignments.filter?: string` (originally cited at `src/v1/model.ts:36`): Fixed in regeneration on 2026-05-20 — `filter` field removed from `GetWorkspacePermissionAssignmentsRequest` (model.ts:203-208).
- #22 `GetWorkspacePermissionAssignments.maxResults` (originally cited at `src/v1/model.ts:34`): Fixed in regeneration on 2026-05-20 — `maxResults` field removed from `GetWorkspacePermissionAssignmentsRequest` (model.ts:203-208).

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
