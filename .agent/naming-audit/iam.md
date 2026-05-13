# Naming Audit: `@databricks/sdk-iam` (v2)

**Package:** `iam` (`packages/iam/src/v2/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`
**Domain:** Databricks IAM — account-level users, groups, service principals,
group memberships, and workspace assignment / access details. Includes
account-access identity rules (DENY-list for principals from a customer IdP)
and resolve-by-external-id flows that bridge the customer IdP to Databricks.

## Summary

| Severity | Count |
| -------- | ----- |
| High     |    18 |
| Medium   |    22 |
| Low      |    16 |
| Observation | 9 |
| **Total** | **65** |

Three dominant themes emerged. **First, the package ships every method,
request, and a handful of enums in two parallel forms — `*` and `*Proxy` —
that differ only in whether `accountId` is supplied by the caller or by the
URL routing layer.** Roughly 40% of the public type surface is mechanical
duplication (44 request types collapse to about 22 unique shapes). **Second,
the package leaks proto conventions deep into TypeScript:** every enum has a
`<NAME>_UNSPECIFIED` zero value, two enums use Proto-style nested names with
underscores (`WorkspaceAccessDetail_AccessType`, `User_Name`), and 31 of 38
JSDoc blocks contain literal `<Databricks>` markup. **Third, naming is
inconsistent across status fields, parent-account fields, and the `Detail`
suffix** — `accountUserStatus`, `accountSpStatus`, `workspaceIdentityStatus`,
and `status` all describe the same `State` enum across types; `accountId` is
documented as "parent account ID for X" inconsistently; and the `Detail`
suffix on `WorkspaceAssignmentDetail` / `WorkspaceAccessDetail` /
`WorkspaceIdentityDetail` adds no information beyond Java-RPC habit.

---

## High-severity findings

### H1. Every method exists in `*` + `*Proxy` variants — duplicate concept across the public API
- **File:** `client.ts:309-543, 666-738, 814-870, 872-946, 948-1042, 1044-1172, 1174-1242, 1244-1324, 1326-1414, 1416-1462, 1464-1534, 1536-1592, 1594-1668, 1819-1934, 1936-1984, 1986-2058, 2060-2150`
- **Category:** 12, 7, 14 (duplicate concepts; verbose; Go/Java-style RPC pairs)
- **Issue:** 17 endpoints are duplicated as `<verb>X` + `<verb>XProxy` pairs:
  `createGroup` + `createGroupProxy`, `deleteGroup` + `deleteGroupProxy`,
  `getGroup` + `getGroupProxy`, `listGroups` + `listGroupsProxy`,
  `updateGroup` + `updateGroupProxy`, `resolveGroup` + `resolveGroupProxy`,
  same for `User`, `ServicePrincipal`, `DirectGroupMember`,
  `TransitiveParentGroups`, `WorkspaceAssignmentDetail`. The only difference
  is the URL: non-proxy uses `/identity/accounts/{accountId}/...`, proxy uses
  `/identity/...` (workspace-rooted, accountId resolved server-side). The
  request types are the same minus the `accountId` field. A consumer must
  decide between two methods for every operation, doubling the API surface
  and the request-type count (44 → 22 unique shapes).
- **Suggestion:** Collapse to one method per operation. Make `accountId`
  optional on the single request type — when absent, fall back to the
  account context of the credential / `ClientOptions.accountId` (the client
  already does this on line 165 + 314, 372, 462, etc.). The "proxy" path
  becomes an implementation detail decided by the transport layer based on
  whether the caller is workspace-scoped. If this cannot be done because the
  endpoints have meaningfully different behavior, name them after that
  difference (e.g. `createGroupForAccount` vs `createGroupInCurrentWorkspace`)
  rather than the proto/Go `Proxy` suffix that surfaces routing.
- **Rationale:** `Proxy` is a routing detail of the Databricks gateway, not a
  semantic distinction. It is the strongest source of confusion in the
  package. Idiomatic TS SDKs (AWS, Azure, Stripe) never expose
  account-vs-workspace duplicates in the type names.

### H2. `Entitlement` — top-level enum name is too generic
- **File:** `model.ts:13-21`
- **Category:** 1, 18 (vague/generic; long enum values)
- **Issue:** The exported enum `Entitlement` carries values like
  `WORKSPACE_ACCESS`, `WORKSPACE_CONSUME`, `DATABRICKS_SQL_ACCESS`,
  `WORKSPACE_ADMIN`, `ALLOW_CLUSTER_CREATE`, `ALLOW_INSTANCE_POOL_CREATE`.
  These are workspace-scoped entitlements, not generic "entitlements", and
  the enum has no JSDoc. The name does not disclose scope; a developer
  reading `entitlements?: Entitlement[]` on a workspace assignment cannot
  tell whether these are workspace entitlements, account entitlements, or
  something more abstract. The values mix permission verbs
  (`ALLOW_CLUSTER_CREATE`) with abstract access markers (`WORKSPACE_ACCESS`)
  on the same enum.
- **Suggestion:** `WorkspaceEntitlement`. Add a JSDoc that distinguishes
  "presence" entitlements (`WORKSPACE_ACCESS`, `WORKSPACE_ADMIN`) from
  "create" entitlements (`ALLOW_CLUSTER_CREATE`, `ALLOW_INSTANCE_POOL_CREATE`).
  Consider splitting into `WorkspaceRole` (admin/user/SQL access) and
  `WorkspaceCreatePermission` (cluster/instance pool create) — they are
  conceptually different and gated differently in the platform.
- **Rationale:** `Entitlement` is used on exactly one field
  (`WorkspaceAssignmentDetail.entitlements`) and never elsewhere, so it is
  effectively a workspace entitlement enum already.

### H3. `State` — top-level enum name is too generic
- **File:** `model.ts:41-48`
- **Category:** 1, 2 (vague/generic; redundant enum prefix)
- **Issue:** `State` with values `STATE_UNSPECIFIED`, `ACTIVE`, `INACTIVE` is
  used as the status of users, service principals, and identities in
  workspaces and accounts. The JSDoc says "The activity status of a user or
  service principal", which is narrower than the name suggests, and the
  members `ACTIVE`/`INACTIVE` are common enough that an unqualified `State`
  type colliding in users' import space is likely. The field name also
  varies per usage: `accountUserStatus`, `accountSpStatus`,
  `workspaceIdentityStatus`, plain `status` — four different field names for
  the same enum domain across five types.
- **Suggestion:** Rename the enum to `ActivityStatus` (or `PrincipalStatus`).
  Standardize the field name to `status` everywhere. Drop the
  `STATE_UNSPECIFIED` value (see H10).
- **Rationale:** A 3-letter enum with 2 values and the name `State` is a
  textbook example of a name that says nothing about the domain. JSDoc-only
  context is not enough.

### H4. `PrincipalType` enum values redundantly prefix `PRINCIPAL_TYPE_`
- **File:** `model.ts:33-38`
- **Category:** 2, 18 (redundant enum prefix; long enum values)
- **Issue:** Values are `PRINCIPAL_TYPE_UNSPECIFIED`, `USER`,
  `SERVICE_PRINCIPAL`, `GROUP`. Only the UNSPECIFIED zero value carries the
  prefix; the others are bare. This is the proto convention bleeding into TS
  for one value while the others are clean. At a usage site
  `req.principalType = PrincipalType.PRINCIPAL_TYPE_UNSPECIFIED` reads as
  type-suffix tautology, while `PrincipalType.USER` reads cleanly. The two
  styles in one enum are inconsistent.
- **Suggestion:** Drop the `PRINCIPAL_TYPE_` prefix from UNSPECIFIED (or
  drop the whole UNSPECIFIED member — see H10). Standardize on
  `PrincipalType.USER` / `.SERVICE_PRINCIPAL` / `.GROUP`.
- **Rationale:** TypeScript already namespaces values under the enum type.
  Repeating the enum name in one member only is worse than either
  consistently prefixing or consistently bare.

### H5. `WorkspaceAccessDetail_AccessType` and `WorkspaceIdentityDetail_AssignmentType` use proto-style underscored names
- **File:** `model.ts:67-74, 78-85`, `index.ts:13-14`
- **Category:** 4, 14 (underscore in TS identifier; Go/Java/proto-style)
- **Issue:** Two enums with proto-style nested names use underscore
  separators in the TS identifier:
  `WorkspaceAccessDetail_AccessType`, `WorkspaceIdentityDetail_AssignmentType`.
  Both require a `// eslint-disable-next-line @typescript-eslint/naming-convention`
  comment to compile, which signals the convention is wrong. They are also
  re-exported by name from `index.ts`. The two enums also have identical
  value sets — `ACCESS_TYPE_UNSPECIFIED`/`ASSIGNMENT_TYPE_UNSPECIFIED`,
  `DIRECT`, `INDIRECT` — and identical JSDoc semantics ("direct" =
  principal is assigned, "indirect" = via group). They are the same enum
  conceptually.
- **Suggestion:** Flatten and unify. `type AssignmentMode = 'DIRECT' | 'INDIRECT'`
  (a union type or a single enum `AssignmentMode`). Use it for both
  `WorkspaceAccessDetail.accessType` and
  `WorkspaceIdentityDetail.assignmentType` (and rename the fields to
  `mode` or both to `assignmentMode`).
- **Rationale:** Two enums with the same shape and the same meaning, both
  spelled with proto-style underscores, is duplication on top of
  convention-violation.

### H6. `User_Name` nested type uses proto-style underscored name
- **File:** `model.ts:961-964`, `index.ts:18` (exported as `User_Name`)
- **Category:** 4, 14 (underscore in TS identifier; proto-style)
- **Issue:** `User_Name` is a nested message type carrying `givenName` and
  `familyName`. The name violates TS conventions (requires
  `// eslint-disable-next-line` to compile). The corresponding
  `unmarshalUser_NameSchema` and `user_NameFieldMaskSchema` propagate the
  same underscored identifier downward through the file.
- **Suggestion:** Rename to `UserName` or, better, `PersonName` (since
  `userName` is overloaded with `username` two lines up — see H7). Even
  inlining `givenName?: string; familyName?: string` onto `User` would be
  cleaner since the nested type has no other use.
- **Rationale:** Proto nested-message names should be flattened in TS. The
  underscore is the strongest visual cue that the generator did not idiomatize.

### H7. `User.username` vs `User.name: User_Name` — name field collision
- **File:** `model.ts:946-958, 961-964`
- **Category:** 6, 10 (misleading; reserved-word-style collision)
- **Issue:** `User` has both `username` (string, email-like login identifier
  per the JSDoc) and `name` (a `User_Name` struct with `givenName`/`familyName`).
  In English `name` and `username` are near-synonyms and users routinely
  conflate them. Worse, `User_Name` is a separate type whose name is itself
  `Name`. A developer auto-completing `user.` sees two `*name*` fields with
  no hint at the difference.
- **Suggestion:** Rename `User.name` to `User.fullName` (or `personName`,
  matching the suggested type rename in H6). Rename `User.username` to
  `User.email` if the value is always an email (the JSDoc says
  "Username/email of the user"), or `User.loginName` otherwise.
- **Rationale:** Disambiguates two semantically distinct identifiers.

### H8. `accountSpStatus` field uses cryptic abbreviation `Sp`
- **File:** `model.ts:818`
- **Category:** 5, 6 (cryptic abbreviation; misleading)
- **Issue:** `ServicePrincipal.accountSpStatus?: State`. `Sp` is a Databricks
  internal shorthand for "service principal". Externally it reads as
  "Spanish" or simply opaque. The parallel field on `User` is
  `accountUserStatus`, which is spelled out, and on `WorkspaceIdentityDetail`
  it is `workspaceIdentityStatus`. Three field names for the same `State`
  enum across three sibling types is inconsistent (also category 17).
- **Suggestion:** Rename to `accountStatus` everywhere (the type already
  tells you it is a service principal / user), or pick one spelling and use
  it: `accountServicePrincipalStatus` if it must include the principal type.
- **Rationale:** Abbreviation `Sp` is opaque to external developers and
  inconsistent with the spelled-out `User` and `Identity` siblings.

### H9. `WorkspaceAccessDetail`, `WorkspaceAssignmentDetail`, `WorkspaceIdentityDetail` — three overlapping "Detail" types
- **File:** `model.ts:967-1004`, plus all 17 method types they appear in
- **Category:** 1, 12, 7 (vague generic suffix; duplicate concept; verbose)
- **Issue:** Three top-level types with the `Detail` suffix model overlapping
  shapes of "what a principal has in a workspace":
  - `WorkspaceAccessDetail`: principal, workspace, account, principalType, accessType, status, permissions.
  - `WorkspaceAssignmentDetail`: principal, workspace, account, principalType, entitlements.
  - `WorkspaceIdentityDetail`: principal, principalType, workspaceIdentityStatus, assignmentType.
  
  All three identify the same triple `(accountId, workspaceId, principalId)`.
  `Detail` is a meaningless suffix — every type in a data model is a "detail".
  The differences are: permissions (Access), entitlements (Assignment), status
  + assignment mode (Identity). A new reader cannot tell from the names which
  type carries which fields.
- **Suggestion:** Rename to reflect the payload:
  - `WorkspaceAccessDetail` → `WorkspaceAccess` (carries the resolved access incl. permissions).
  - `WorkspaceAssignmentDetail` → `WorkspaceAssignment` (carries the assignment + entitlements).
  - `WorkspaceIdentityDetail` → `WorkspaceIdentity` (carries identity status).
  Or merge into one type with a discriminator if the platform allows it.
- **Rationale:** `Detail` is fluff. The 17 methods named after these types
  (`getWorkspaceAccessDetail`, `listWorkspaceAssignmentDetails`,
  `updateWorkspaceIdentityDetail`, …) inherit the noise.

### H10. Every enum has a `<NAME>_UNSPECIFIED` zero value
- **File:** `model.ts:9, 14, 25, 34, 43, 52, 59, 69, 80`
- **Category:** 2, 18 (redundant enum prefix; long enum values)
- **Issue:** Nine of nine enums in the package have an `UNSPECIFIED` member
  (`ACCOUNT_ACCESS_RULE_ACTION_UNSPECIFIED`, `ENTITLEMENT_UNSPECIFIED`,
  `GROUP_MEMBERSHIP_SOURCE_UNSPECIFIED`, `PRINCIPAL_TYPE_UNSPECIFIED`,
  `STATE_UNSPECIFIED`, `WORKSPACE_ACCESS_DETAIL_VIEW_UNSPECIFIED`,
  `WORKSPACE_PERMISSION_UNSPECIFIED`, `ACCESS_TYPE_UNSPECIFIED`,
  `ASSIGNMENT_TYPE_UNSPECIFIED`). All are 30–45 characters long. They exist
  only because the upstream proto requires a zero value; in TypeScript the
  same semantics are expressed by an optional field. None of the JSDoc
  documents what an SDK consumer should ever do with `UNSPECIFIED`.
- **Suggestion:** Remove all `UNSPECIFIED` members. Fields that may carry an
  enum or be absent are already typed `enum | undefined`. If round-tripping
  the wire value matters, accept the string at the parser level but never
  surface it as a named enum member.
- **Rationale:** This is the single highest-impact reduction in the package.
  9 enum members removed × every enum value enumeration in user code.

### H11. `WorkspaceAccessDetailView` is a Google-style "view" enum but named oddly
- **File:** `model.ts:51-55`
- **Category:** 1, 14 (vague; Google/proto-style)
- **Issue:** Values are `WORKSPACE_ACCESS_DETAIL_VIEW_UNSPECIFIED`, `BASIC`,
  `FULL`. The type is a [Google AIP-157
  view-mask](https://google.aip.dev/157), but the name doesn't surface that
  and the values look generic. It's used as `view?:
  WorkspaceAccessDetailView` on `GetWorkspaceAccessDetailRequest` / `Local`
  variants, but a developer cannot guess from the field name `view` that it
  controls response shape.
- **Suggestion:** `enum FieldView { BASIC = 'BASIC', FULL = 'FULL' }`,
  reusable across the SDK. Or rename to `WorkspaceAccessView` and document
  what each enum value includes/excludes.
- **Rationale:** `Detail` in the name is the same `Detail` flagged in H9 and
  carries no extra meaning.

### H12. `internalId` vs `principalId` vs `groupId` — three overlapping ID names for "the Databricks-internal numeric ID"
- **File:** `model.ts:122, 226, 228, 244, 252, 260, 271, 285, 296, 326, 329, 344, 353, 386, 407, 412, 423, 432, 442, 448, 583, 597, 833, 845, 855, 867, 884, 903`
- **Category:** 6, 19 (misleading; underspecified ID)
- **Issue:** Same numeric ID concept appears under three different field
  names depending on context:
  - `Group.internalId`, `User.internalId`, `ServicePrincipal.internalId` (resource-of-itself).
  - `DirectGroupMember.principalId`, `ListTransitiveParentGroupsRequest.principalId`, `WorkspaceAccessDetail.principalId`, etc. (resource-as-member).
  - `CreateDirectGroupMemberRequest.groupId` (resource-as-parent).
  
  All three are `number` types referring to "the Databricks-internal numeric
  ID of a principal/group". A `Group` carries `internalId`, but in
  `WorkspaceAccessDetail` the same group's numeric ID is `principalId`. In
  `DirectGroupMember`, `principalId` may be a user, SP, or group — the
  member-side is principal, but in `ListDirectGroupMembers` the
  `groupId` is also a principal's ID acting as parent.
- **Suggestion:** Pick one name and stick to it. `internalId` is fine on the
  resource itself; `<role>InternalId` for the foreign-key form (e.g.
  `principalInternalId`, `groupInternalId`). Document the relationship in the
  type-level JSDoc.
- **Rationale:** Today a developer reading the SDK has to keep a mental map
  of which name refers to what; the wire is consistent (`principal_id`,
  `group_id`, `internal_id`), so the TS field name choices are real.

### H13. `principalType: PrincipalType` — type-suffix tautology pattern
- **File:** `model.ts:99, 304, 974, 990, 999`
- **Category:** 20 (type-suffix tautology)
- **Issue:** The field `principalType: PrincipalType | undefined` appears on
  five types. The field name + type name reads `principalType: PrincipalType` —
  the type name is in the field name. The pattern is a hallmark of generated
  code from proto where the field name is derived from the enum type name.
- **Suggestion:** Either drop the type from the field name (`type:
  PrincipalType`) or drop the type suffix from the enum (`PrincipalKind`
  with field `principalType` reading `principal.type = "USER"` works, but
  `principal: PrincipalKind` is even cleaner).
- **Rationale:** Tautology adds visual noise without adding meaning.

### H14. `Group.groupName` — same kind of tautology
- **File:** `model.ts:461`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `Group.groupName` reads `group.groupName`. The `group` prefix is
  redundant inside the `Group` type. The JSDoc says "Display name of the
  group" but the field is not called `displayName` (compare to
  `User.username`, `ServicePrincipal.displayName`,
  `DirectGroupMember.displayName`, `AccountAccessIdentityRule.displayName`).
- **Suggestion:** Rename to `displayName` to match the four sibling types in
  the same file.
- **Rationale:** Cross-type consistency is broken for no API reason; the
  wire form is `group_name` but the TS field name need not echo it. The
  field is also used as `displayName` in JSDoc.

### H15. `ServicePrincipal.internalId` doc says `Internal service principal ID of the service principal` — tautology + comment problem
- **File:** `model.ts:809-810`
- **Category:** 20, 6 (tautology; misleading)
- **Issue:** The JSDoc on `ServicePrincipal.internalId` reads "Internal
  service principal ID of the service principal in <Databricks>." The
  service-principal-of-the-service-principal phrasing is awkward; the same
  pattern appears on `Group.internalId` ("Internal group ID of the group in
  <Databricks>.") and `User.internalId` ("Internal userId of the user").
  The `User` doc also has a typo: `userId` is one word, not "user id".
- **Suggestion:** Standardize to "Internal numeric ID assigned by Databricks."
- **Rationale:** Three sibling doc strings should not each repeat the
  resource name inside themselves.

### H16. `AccountAccessIdentityRule.name` is a URL path, not a name
- **File:** `model.ts:100-104`
- **Category:** 6, 15, 16, 19 (misleading; generic field losing meaning; field contradicting domain; underspecified)
- **Issue:** `name` is documented as
  `accounts/{account_id}/account-access-identity-rules/{external_principal_id}`
  — a Google AIP-122 resource path, not a human-readable name. There is a
  separate `displayName` field on the same type for the human-readable form.
  `name` is `string` with no type-level disclosure.
- **Suggestion:** Rename to `resourceName` (or `path` / `resourcePath`).
  Encode the format as a template literal type: `\`accounts/${string}/account-access-identity-rules/${string}\``.
- **Rationale:** Half the IAM-API integration bugs are wrong-format resource
  paths; the type system can encode this.

### H17. `Group.externalId` doc capitalization `ExternalId` (sentence-case identifier name)
- **File:** `model.ts:459, 952, 828, 811`
- **Category:** 3, 14 (acronym casing; Go-style)
- **Issue:** The JSDoc on `Group.externalId`, `User.externalId`,
  `ServicePrincipal.externalId`, and `TransitiveParentGroup.externalId` begins
  with the literal `ExternalId of the X in the customer's IdP.` — capitalized
  identifier name as the first word, not English. The same pattern bleeds
  through to the Go-style sentence comment. Should be either "External ID
  of …" (English) or use the TS field name as code (`externalId`) in
  backticks.
- **Suggestion:** Rewrite as "External ID of the {resource} in the
  customer's identity provider." consistently across all four types.
- **Rationale:** A small but persistent rendering issue across the type
  surface.

### H18. `parent` field name on rule endpoints — Google AIP convention leaks into TS
- **File:** `model.ts:113, 219, 318, 470`
- **Category:** 1, 14, 19 (vague/generic; Google-style; underspecified ID)
- **Issue:** `CreateAccountAccessIdentityRuleRequest.parent`,
  `DeleteAccountAccessIdentityRuleRequest.parent`,
  `GetAccountAccessIdentityRuleRequest.parent`,
  `ListAccountAccessIdentityRulesRequest.parent` all carry a field literally
  named `parent` with the documented format `accounts/{account_id}`. This is
  [Google AIP-132](https://google.aip.dev/132) convention. In TypeScript,
  `parent` is opaque — a developer cannot guess from the field that it must
  be `accounts/<UUID>`.
- **Suggestion:** Rename to `accountResourceName` or `accountPath`, or even
  just `account: string` typed as a template literal
  `\`accounts/${string}\``. Surface the structure.
- **Rationale:** `parent` is meaningless without reading the JSDoc; the
  template literal type makes this discoverable at the call site.

---

## Medium-severity findings

### M1. `CreateWorkspaceAssignmentDetailProxyRequest` — 41-character name
- **File:** `model.ts:197`, similarly `DeleteWorkspaceAssignmentDetailProxyRequest`, `UpdateWorkspaceAssignmentDetailProxyRequest`
- **Category:** 7 (overly verbose)
- **Issue:** Five of the request type names are 41+ characters:
  `CreateWorkspaceAssignmentDetailProxyRequest` (42 chars),
  `DeleteWorkspaceAssignmentDetailProxyRequest` (42),
  `UpdateWorkspaceAssignmentDetailProxyRequest` (42),
  `ListWorkspaceAssignmentDetailsProxyRequest` (42),
  `GetWorkspaceAssignmentDetailProxyRequest` (40). Plus the imports list in
  `client.ts` repeats them, doubling the noise.
- **Suggestion:** Once H1 collapses the proxy duplication and H9 drops
  `Detail`, these become `CreateWorkspaceAssignmentRequest` etc. — about 30
  chars each.
- **Rationale:** Length itself is not a sin, but `42 chars × 2 ×
  every-occurrence` is friction.

### M2. `Local` suffix on `GetWorkspaceAccessDetailLocalRequest`
- **File:** `model.ts:411, 677`, `client.ts:1715, 1783`, `index.ts:51, 74`
- **Category:** 1, 14 (vague; Java/Go-style)
- **Issue:** `GetWorkspaceAccessDetailLocalRequest` and
  `ListWorkspaceAccessDetailsLocalRequest` use a `Local` suffix that is not
  defined anywhere in the public types. From `client.ts:1719` the
  "local" version omits `accountId`/`workspaceId` from the URL — it is
  another proxy/routing variant. Why is this one called `Local` while the
  17 others use `Proxy`?
- **Suggestion:** Make it consistent. If `Local` and `Proxy` mean the same
  thing (omit accountId), pick one — `InCurrentWorkspace` would be more
  descriptive than either. If they differ semantically, document the
  difference.
- **Rationale:** Two suffixes for the same routing-variant idea is the
  worst possible outcome.

### M3. `applicationId` on `ServicePrincipal` — third ID on the same type
- **File:** `model.ts:813-814`
- **Category:** 19 (underspecified ID)
- **Issue:** `ServicePrincipal` already has `accountId`, `internalId`,
  `externalId`, and now `applicationId`. The doc says "Application ID of the
  service principal." but does not say where this comes from (AAD app
  registration? Databricks-issued?). It is a string and the doc gives no
  format.
- **Suggestion:** Document the source: "Azure AD application ID (UUID)
  identifying the service principal at the identity provider." Plus add a
  format hint if not arbitrary string.
- **Rationale:** Four IDs on one struct is a lot; each one needs to be
  obviously distinct in purpose.

### M4. `GroupMembershipSource` value `IDENTITY_PROVIDER` is fine but the enum mixes scopes
- **File:** `model.ts:24-30`
- **Category:** 1, 6 (vague; misleading)
- **Issue:** Values `INTERNAL` and `IDENTITY_PROVIDER`. `INTERNAL` is the
  inverse of `IDENTITY_PROVIDER`, which is fine, but `INTERNAL` is a very
  generic word — internal to what? Compare to common phrasing
  `MANUAL`/`SCIM`, or `LOCAL`/`IDP`. JSDoc clarifies but the type alone
  doesn't.
- **Suggestion:** `MEMBERSHIP_SOURCE_LOCAL` / `MEMBERSHIP_SOURCE_IDP`, or
  match the field rename — `source: 'LOCAL' | 'IDP'`.
- **Rationale:** "Internal" is the kind of word that everyone reads
  differently.

### M5. `WorkspacePermission.USER_PERMISSION` and `ADMIN_PERMISSION` — redundant suffix
- **File:** `model.ts:60-62`
- **Category:** 2, 8 (redundant prefix; redundant suffix)
- **Issue:** `WorkspacePermission.USER_PERMISSION` reads
  `WorkspacePermission.USER_PERMISSION` — both "permission" and the enum
  type carry "permission". A `User` is a principal kind (per `PrincipalType.USER`),
  so the value collides with that meaning. The JSDoc on `USER_PERMISSION` is
  "The most basic workspace permission." — it really means "non-admin
  permission", not "permission belonging to users".
- **Suggestion:** `WorkspacePermission.USER` and `.ADMIN`, with JSDoc
  reading "Default (non-admin) workspace access." and "Workspace admin
  access." respectively.
- **Rationale:** Drops `_PERMISSION` redundancy; aligns enum members with
  the `User`/`Admin` distinction the rest of the SDK uses.

### M6. `accountAccessIdentityRule` — wrapper field repeating type name
- **File:** `model.ts:117`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `CreateAccountAccessIdentityRuleRequest.accountAccessIdentityRule?: AccountAccessIdentityRule | undefined`
  — the type name is the field name. Also the field is required per JSDoc
  but the type marks it optional.
- **Suggestion:** Rename field to `rule` (since context is the request type
  for an account-access-identity-rule). Mark non-optional in TS.
- **Rationale:** Reduces tautology and aligns required/optional with the doc.

### M7. `directGroupMember` field repeats type name
- **File:** `model.ts:125, 135`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `CreateDirectGroupMemberRequest.directGroupMember?: DirectGroupMember | undefined`.
- **Suggestion:** Rename field to `member`.
- **Rationale:** Same as M6.

### M8. `workspaceAssignmentDetail` field repeats type name
- **File:** `model.ts:199, 209, 916, 930`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `CreateWorkspaceAssignmentDetailRequest.workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined`.
- **Suggestion:** Rename field to `assignment` (after H9 drops `Detail`,
  the type is `WorkspaceAssignment` and `assignment` reads naturally).
- **Rationale:** Same as M6.

### M9. `workspaceIdentityDetail` field repeats type name
- **File:** `model.ts:940`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `UpdateWorkspaceIdentityDetailRequest.workspaceIdentityDetail?: WorkspaceIdentityDetail | undefined`.
- **Suggestion:** Rename to `identity`.
- **Rationale:** Same as M6.

### M10. `servicePrincipal` field repeats type name
- **File:** `model.ts:156, 163, 858, 870`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `CreateServicePrincipalRequest.servicePrincipal?: ServicePrincipal | undefined`.
- **Suggestion:** Rename to `principal` or `sp` (consistent with the rest
  of the create/update bodies).
- **Rationale:** Same as M6.

### M11. `Group.accountId` doc — "The parent account ID for group in <Databricks>" (missing article)
- **File:** `model.ts:454-455`
- **Category:** 6 (misleading via grammar)
- **Issue:** Doc reads "The parent account ID for group in <Databricks>" —
  missing "the" before "group". Same pattern on
  `TransitiveParentGroup.accountId` ("The parent account ID for group in
  <Databricks>") and `User.accountId` ("The accountId parent of the user in
  <Databricks>"). Three siblings with three different phrasings of the same
  thing, two with grammar issues.
- **Suggestion:** Standardize to "Databricks account ID of the parent
  account." or just "Parent Databricks account ID."
- **Rationale:** Consistency + grammar; the `<Databricks>` template marker
  also needs to go (see M13).

### M12. `<Databricks>` proto template markup in 31 of 38 JSDoc blocks
- **File:** `model.ts` everywhere, e.g. `122, 140, 148, 154, 161, 175-185`
- **Category:** 14 (Go/proto-style markup leak)
- **Issue:** The literal string `<Databricks>` appears 31+ times across the
  JSDoc comments. It is upstream template syntax meant to be replaced by
  the brand at doc-generation time; in TS it renders as stray angle brackets
  in IDE hover popups and TypeDoc. Examples:
  - "Required. Group to be created in <Databricks>"
  - "Internal ID of the group in <Databricks>."
  - "Required. ID of the principal in <Databricks>."
- **Suggestion:** Strip the template markup in the generator, leaving just
  "Databricks".
- **Rationale:** Public docs leaking template syntax is the most visible
  proto-leak across the SDK.

### M13. `TODO: Write description later when this method is implemented` — 26 occurrences
- **File:** `model.ts:138, 144, 152, 158, 241, 247, 255, 261, 269, 275, 342, 348, 356, 362, 522, 532, 544, 551, 562, 573, 676, 684, 696, 831, 841, 853, 863, 920` (and many more); same TODO appears 22 times in `client.ts`
- **Category:** 6 (misleading) / Observation
- **Issue:** Roughly half the request types and a large fraction of client
  methods carry the placeholder JSDoc "TODO: Write description later when
  this method is implemented" verbatim. Worse, the method **is** implemented
  in `client.ts` — the comment is now factually wrong.
- **Suggestion:** Replace each TODO with the correct one-line description.
  This is a generator-side fix.
- **Rationale:** Placeholder docs degrade developer trust.

### M14. `parent` doc string disagreement with field name (rule endpoints)
- **File:** `model.ts:113, 219, 318, 470`
- **Category:** 6 (misleading)
- **Issue:** The four rule-endpoint requests use `parent` as a field name
  but the JSDoc says "The account under which to create the rule." / "The
  account for which to ..." — no mention of "parent". A consumer reading
  IntelliSense gets `parent: string` plus "The account ...", which is
  confusing.
- **Suggestion:** Make the JSDoc echo the AIP convention or rename per H18.
- **Rationale:** Field and docstring should agree on naming.

### M15. `UpdateWorkspaceAssignmentDetailRequest` doc body says `TBD since the only updatable field is permissions`
- **File:** `model.ts:921`
- **Category:** 6 (misleading)
- **Issue:** The doc on `UpdateWorkspaceAssignmentDetailRequest` is literally
  "TBD since the only updatable field is permissions" — internal TODO
  shipped to public surface. Also factually wrong (entitlements, not
  permissions, per the type).
- **Suggestion:** Replace with the real description.
- **Rationale:** Same as M14.

### M16. `resolveByExternalId` URL segment uses camelCase
- **File:** `client.ts:822, 851, 1182, 1217, 1545, 1574`
- **Category:** 14, 3 (Go-style; casing)
- **Issue:** The URL paths use `/resolveByExternalId` in camelCase, while
  every other path segment in the same file uses kebab-case
  (`/account-access-identity-rules`, `/direct-members`,
  `/transitive-parent-groups`). The URLs are server-defined, so this is not
  a naming issue the SDK can fix, but it is worth noting because the
  inconsistency is visible in the SDK's debug logs.
- **Suggestion:** Server-side fix (out of scope), but flag to the API team.
- **Rationale:** Not the SDK's bug, but reflects an upstream inconsistency.

### M17. `permissions: WorkspacePermission[]` vs `entitlements: Entitlement[]` — conceptually overlapping fields
- **File:** `model.ts:978-979, 991`
- **Category:** 12, 6 (duplicate concepts; misleading)
- **Issue:** `WorkspaceAccessDetail.permissions` (USER_PERMISSION /
  ADMIN_PERMISSION) and `WorkspaceAssignmentDetail.entitlements`
  (WORKSPACE_ACCESS, WORKSPACE_ADMIN, …) both encode workspace-level
  capabilities of the same principal. Yet they appear on two different
  types using two different enum types. Is `WORKSPACE_ADMIN` an
  `Entitlement` or a `WorkspacePermission`?
- **Suggestion:** Reconcile the two. If they are different concepts (e.g.,
  "access scope" vs "assignable capability"), document the distinction in
  both JSDoc blocks. If they are the same, merge.
- **Rationale:** This is the kind of overlap that produces support tickets.

### M18. `nextPageToken` doc comment is repeated 9 times verbatim
- **File:** `model.ts:483, 519, 548, 577, 613, 673, 700, 727`
- **Category:** Observation (duplication)
- **Issue:** Nine identical JSDoc strings: "A token, which can be sent as
  page_token to retrieve the next page. If this field is omitted, there are
  no subsequent pages." The wire form is `next_page_token`; the TS field is
  `nextPageToken` (which the doc does not mention).
- **Suggestion:** Either factor into a single doc snippet (TypeDoc
  `@inheritDoc`) or accept the repetition but fix `page_token` -> `pageToken`
  in the JSDoc.
- **Rationale:** Field names in JSDoc should match the TS surface.

### M19. `ListGroupsRequest.filter` JSDoc — "filtering groups by group name or external id"
- **File:** `model.ts:529, 540`
- **Category:** 6 (misleading)
- **Issue:** Doc says "group name", but the actual field name is `groupName`
  on `Group` (per H14) and the JSON wire is `group_name`. The SCIM-style
  filter syntax (`groupName eq "engineering"`) is not documented. A consumer
  must guess.
- **Suggestion:** Document the filter language with one example.
- **Rationale:** API ergonomics — filter syntax is non-discoverable.

### M20. `ListServicePrincipalsProxyRequest` doc — "The maximum number of SPs to return"
- **File:** `model.ts:553`
- **Category:** 5, 6 (cryptic abbreviation; misleading)
- **Issue:** Uses "SPs" abbreviation; the proxy variant is also documented
  with the abbreviation while the non-proxy variant uses the full
  "service principals" (model.ts:565). Two siblings, two phrasings.
- **Suggestion:** Always "service principals" in JSDoc.
- **Rationale:** Consistency + clarity for non-Databricks readers.

### M21. `resolveByExternalId` method naming
- **File:** `client.ts:818, 1178, 1541`, `model.ts:734, 759, 784`
- **Category:** 17 (verb inconsistency)
- **Issue:** `resolveGroup`, `resolveUser`, `resolveServicePrincipal`. These
  read like "resolve a group" (e.g. resolve a reference), but the actual
  semantics is "resolve-or-create using external ID". The method name does
  not surface the "or-create" side-effect. The URL hints at it
  (`resolveByExternalId`) but the TS method doesn't.
- **Suggestion:** Rename to `resolveByExternalId(req)` taking a discriminated
  request type, or `getOrCreateByExternalId`. Document the create-on-miss
  semantic prominently.
- **Rationale:** Method names should not hide write side-effects.

### M22. `ListWorkspaceAccessDetailsLocalRequest` paginates but has no filter — asymmetric with `ListWorkspaceAccessDetailsRequest`
- **File:** `model.ts:677-694`
- **Category:** 6 (misleading)
- **Issue:** `ListWorkspaceAccessDetailsLocalRequest` has `pageSize` +
  `pageToken` but no `filter`. The non-local variant also has no `filter`,
  but every other `List*` request in the file does. The "Local" variant
  description is also the placeholder "TODO: Write description later" with
  zero documentation of what it lists.
- **Suggestion:** Document explicitly; add `filter` if the server supports
  it on the local route; document the difference between the two list
  endpoints.
- **Rationale:** API completeness.

---

## Low-severity findings

### L1. `accountId` field documented inconsistently across types
- **File:** `model.ts:131, 191, 233, 277, 405, 455, 502, 535, 595, 661, 745, 770, 795, 824, 902, 947, 988`
- **Category:** Observation, 6 (misleading)
- **Issue:** ~20 different phrasings of the same `accountId` field's JSDoc:
  - "The account ID for which the group membership is being created."
  - "The account ID for which the group is being deleted."
  - "Required. The parent account ID for which the workspace access details are being requested."
  - "The accountId parent of the user in <Databricks>."
- **Suggestion:** One canonical phrasing for the request-level field
  ("Databricks account ID. Falls back to ClientOptions.accountId if omitted.")
  and one for the resource-level field ("Parent Databricks account ID.").
- **Rationale:** Same field, ~17 different doc strings.

### L2. `groupId` is `number` (Databricks internal) but `accountId` is `string` (UUID) — type-inconsistency for IDs
- **File:** `model.ts:123, 132` and others
- **Category:** 19 (underspecified ID)
- **Issue:** Databricks-internal IDs are `number`, account IDs are `string`
  UUIDs. The convention is consistent across the file, but a developer
  reading just one type cannot tell which to expect.
- **Suggestion:** Brand the types: `type AccountId = string & { readonly __brand: 'AccountId' }`,
  `type PrincipalInternalId = number & { readonly __brand: 'PrincipalInternalId' }`.
- **Rationale:** Type-system disambiguation; out-of-scope for a 1:1 port but
  worth noting for any future hardening.

### L3. `ResolveGroupRequest` vs `ResolveGroupResponse` symmetry
- **File:** `model.ts:743-753`
- **Category:** Observation
- **Issue:** `ResolveGroupRequest` carries `accountId` + `externalId`, but
  the proxy variant `ResolveGroupProxyRequest` carries only `externalId`.
  The `Response` is the same. This is the H1 pattern surfacing again.
- **Suggestion:** Collapse per H1.
- **Rationale:** Pattern, not a new finding.

### L4. `Group.externalId` field name vs `Group.accountId` field name — neither match wire snake_case nor the legacy SCIM camelCase
- **File:** `model.ts:459, 947` 
- **Category:** Observation
- **Issue:** SCIM API (the legacy Databricks IAM API) uses `externalId`
  (camelCase) on the wire; the new IAM API uses `external_id` (snake_case).
  This SDK uses `externalId` in TS and `external_id` on the wire. The
  pattern is correct and consistent — flagging only because anyone migrating
  from SCIM may be confused.
- **Suggestion:** None; documentation for migrators if not already present.
- **Rationale:** Migration-friendly note.

### L5. `pageSize` JSDoc varies — "The maximum number of X" vs "Optional. The maximum number of X"
- **File:** `model.ts:471, 491, 524, 552, 600, 635, 678, 690, 705, 717, 762`
- **Category:** 6, Observation (misleading)
- **Issue:** Some `pageSize` docstrings start with "Optional.", some don't.
  Some specify the default ("If not provided, defaults to 1000"), some
  don't. The field is `optional` in TS already — the "Optional." prefix is
  redundant.
- **Suggestion:** Standardize: drop "Optional." (the type says so), always
  document the default if known.
- **Rationale:** Trivial cleanup.

### L6. `filter` JSDoc varies
- **File:** `model.ts:476, 528, 557, 569, 638, 666`
- **Category:** Observation
- **Issue:** Three phrasings: "Optional. Allows filtering X by Y or Z.",
  "Optional. Allows filtering groups by group name or external id.",
  "Filter to apply to the list. Supports filtering by displayName."
- **Suggestion:** Standardize; document filter syntax (presumably SCIM-style).
- **Rationale:** Same as L5.

### L7. `User.username` doc — "Username/email of the user"
- **File:** `model.ts:953-954`
- **Category:** 6 (misleading)
- **Issue:** Doc says "Username/email" — which is it? Slashes in JSDoc
  signal ambiguity.
- **Suggestion:** Be specific: "Email address used as the user's login
  identifier."
- **Rationale:** Surface the format.

### L8. `Group.groupName` doc — "Display name of the group"
- **File:** `model.ts:460-461`
- **Category:** 6 (misleading)
- **Issue:** The field is `groupName` but the doc calls it `displayName`.
  See H14.
- **Suggestion:** Rename per H14.
- **Rationale:** Consistency.

### L9. `ServicePrincipal` JSDoc — "The details of a ServicePrincipal resource."
- **File:** `model.ts:805`
- **Category:** 6 (misleading)
- **Issue:** Type-level JSDoc says "ServicePrincipal" (camelCase) instead of
  "service principal" (English). Same on `Group` ("The details of a Group
  resource.") and `User` ("The details of a User resource."). Three
  identical placeholder docs.
- **Suggestion:** Replace with prose.
- **Rationale:** Type-level docs should be in English.

### L10. `applicationId` doc could disclose source
- **File:** `model.ts:813-814`
- **Category:** 19 (underspecified ID)
- **Issue:** Doc says "Application ID of the service principal." with no
  format hint (UUID? AAD app ID? Databricks-internal?).
- **Suggestion:** "Application ID of the service principal at the customer's
  identity provider (typically the Azure AD app registration UUID)."
- **Rationale:** Surface the format.

### L11. `internalId` is sometimes `Internal ID` and sometimes `Internal group ID` / `Internal userId`
- **File:** `model.ts:244, 252, 271, 280, 354, 387, 407, 457, 833, 855, 884, 904, 949`
- **Category:** 6, Observation (misleading; documentation rot)
- **Issue:** `internalId` is documented at least three different ways across
  request types: "Internal ID of the group in <Databricks>.", "Internal
  group ID of the group in <Databricks>.", "Internal userId of the user in
  <Databricks>." (typo on the last — `userId` should be two words).
- **Suggestion:** Standardize to "Databricks-internal numeric ID of the X."
- **Rationale:** Documentation consistency.

### L12. `view` field on the access-detail Get methods is `optional` but has no documented default
- **File:** `model.ts:415, 427`
- **Category:** 19 (underspecified)
- **Issue:** Doc says "Controls what fields are returned." but does not say
  the default — the method-level JSDoc on the client says "BASIC by default
  or FULL" (line 1677), which contradicts the optionality (the field is
  `WorkspaceAccessDetailView | undefined`).
- **Suggestion:** Set default at the type level: "Defaults to `BASIC`."
- **Rationale:** Surface defaults at field level, not just method level.

### L13. `externalPrincipalId` on rule endpoints — confusion with `externalId`
- **File:** `model.ts:92, 115, 220, 321`
- **Category:** 6 (misleading)
- **Issue:** The rule endpoints use `externalPrincipalId` (a string from the
  customer's IdP); the principal types (User/Group/ServicePrincipal) use
  `externalId` (also from the customer's IdP). Same concept, two names.
- **Suggestion:** Standardize to one. `externalId` is the dominant form
  (4 occurrences vs the rule endpoints' 1).
- **Rationale:** Consistency.

### L14. `IdP` capitalization — `IdP` vs `identity provider` vs `IDP`
- **File:** `model.ts:92, 459, 736, 761, 786, 952, 828` (uses "IdP")
- **Category:** 3 (acronym casing)
- **Issue:** `IdP` is the dominant form (correct for "Identity Provider"),
  but the wire/JSON form is `external_principal_id`, and `GroupMembershipSource.IDENTITY_PROVIDER`
  uses the spelled-out form. Three styles: `IdP`, `IDP`, `identity provider`.
- **Suggestion:** Use `IdP` in prose, spelled-out in enum values, code
  identifiers as needed.
- **Rationale:** Common style — flag for review only.

### L15. `next_page_token` snake_case in JSDoc
- **File:** `model.ts:483, 519, 548, 577, 613, 673, 700, 727`
- **Category:** 14 (Go/proto-style markup)
- **Issue:** The 9-times-repeated JSDoc references `page_token` (snake_case)
  but the TS field is `pageToken` (camelCase). Internal field name leaks
  into public docs.
- **Suggestion:** Change docs to say `pageToken`.
- **Rationale:** Public doc should match public field name.

### L16. `assignmentType` on `WorkspaceIdentityDetail` vs `accessType` on `WorkspaceAccessDetail`
- **File:** `model.ts:975, 1003`
- **Category:** 12, 17 (duplicate concept; verb inconsistency)
- **Issue:** Two sibling types with similar fields:
  `WorkspaceAccessDetail.accessType: WorkspaceAccessDetail_AccessType`,
  `WorkspaceIdentityDetail.assignmentType: WorkspaceIdentityDetail_AssignmentType`.
  Both enums have values `DIRECT`/`INDIRECT`. Field names disagree;
  enum names disagree; enum values agree.
- **Suggestion:** Per H5, unify the enum. Then pick one field name
  (`assignmentMode` or just `mode`).
- **Rationale:** Same as H5 — at the field level.

---

## Observations (not findings, but worth noting)

### O1. The `Detail` suffix is wired through the URL path
- **File:** `client.ts:1682, 1719, 1750, 1829, 1864, 1898, 1922, 1941, 1966, 1991, 2028, 2070, 2116, 2157, 2182`
- **Issue:** The server URL paths use `workspaceAccessDetails`,
  `workspaceAssignmentDetails`, `workspaceIdentityDetails` — proto/Go RPC
  pattern. The SDK reflects the server names. Renaming the TS types per H9
  does not change the wire; the SDK can have nicer TS names while still
  hitting `workspaceAccessDetails` URLs.

### O2. The TODO documentation pattern is from the generator
- **File:** model.ts:138, 144, 152, … 26 occurrences
- **Issue:** All "TODO: Write description later when this method is
  implemented" strings are identical, suggesting a template that the
  generator falls back to when the upstream API definition lacks
  documentation. The fix is in the upstream spec, not the SDK.

### O3. `marshal*ProxyRequestSchema` vs `marshal*RequestSchema` — schema-level Proxy variants
- **File:** `model.ts:1342, 1350, 1360, 1368, 1378, 1386`
- **Issue:** Each Resolve request has both marshal schemas; the proxy
  variant is identical to the non-proxy minus `accountId`. Same H1 pattern
  at the schema layer.

### O4. `FieldMaskSchema` is defined per resource type
- **File:** `model.ts:1473, 1484, 1502, 1521, 1538`
- **Issue:** Five `FieldMaskSchema`s defined for Group, ServicePrincipal,
  User, WorkspaceAssignmentDetail, WorkspaceIdentityDetail. Pattern is
  consistent across the SDK — flagging for completeness only.

### O5. Marshal/unmarshal schema pairs exist for all types but Direct/Transitive
- **File:** `model.ts:1006-1471`
- **Issue:** Unmarshal schemas exist for all response shapes including
  `TransitiveParentGroup`, but marshal schemas only exist for shapes that
  appear in request bodies (no marshal for `TransitiveParentGroup`,
  `WorkspaceAccessDetail`). Consistent with the request/response split, but
  worth confirming this is intentional and not generator skew.

### O6. `User_NameFieldMaskSchema` (lowercase initial) — naming inconsistency
- **File:** `model.ts:1516`
- **Issue:** Variable name is `user_NameFieldMaskSchema` (snake_case initial
  segment, then camelCase). The eslint disable comment says
  `naming-convention -- Proto-style nested message name.`. The
  inconsistency is `User_Name` (type, PascalCase + underscore) vs
  `user_NameFieldMaskSchema` (variable, camelCase first + underscore).

### O7. Method name `getAccountAccessIdentityRule` is 35 characters
- **File:** `client.ts:241`
- **Issue:** All four rule-endpoint method names hover around 30–37 chars.
  Not actionable on its own — flagging because long names compound the H1
  problem.

### O8. `Local` only applies to `WorkspaceAccessDetail` (not `WorkspaceAssignmentDetail`)
- **File:** `model.ts:411, 677`, `client.ts:1715, 1783`
- **Issue:** Only WorkspaceAccessDetail has a `Local` variant; the parallel
  `WorkspaceAssignmentDetail` uses `Proxy` instead, and
  `WorkspaceIdentityDetail` has neither. Inconsistent presence of the
  Local/Proxy variants across sibling Detail types.

### O9. The `accountId` fallback comment in `client.ts:151-152` only applies to non-proxy methods
- **File:** `client.ts:151-152`
- **Issue:** "Fallback for endpoints whose path contains {account_id}. If
  the request already carries an accountId, that value wins." This is true
  for the non-proxy methods only — `*Proxy` methods don't have `accountId`
  in the URL. Worth noting because if H1 collapses the variants, the
  fallback semantic becomes "use the workspace context if accountId is
  absent".

---

## Cross-cutting recommendations (priority order)

1. **Collapse `*Proxy` and `*Local` variants (H1, M2, L3, O3, O8, O9).** This
   is the largest single improvement and ~halves the public type surface.
2. **Drop `<NAME>_UNSPECIFIED` enum members (H10, H4).** 9 dead enum values
   removed; users no longer write `=== State.STATE_UNSPECIFIED` accidentally.
3. **Replace `<Databricks>` template markup (M12).** Generator-side fix.
4. **Flatten proto-style nested names (`User_Name`, `WorkspaceAccessDetail_AccessType`,
   `WorkspaceIdentityDetail_AssignmentType`) (H5, H6).** Removes
   eslint-disable comments and underscore-in-identifier violations.
5. **Standardize ID field names (H12, L1, L11) and status field names (H3,
   H8).** One name per concept.
6. **Remove type-suffix tautology fields (H13, H14, M6–M10).** Single-token
   field names where the type already carries the kind.
7. **Drop the `Detail` suffix from the Workspace* types (H9).** And add an
   `assignmentMode`/`mode` field via H5.
8. **Rewrite the placeholder TODO JSDocs (M13, M15).** Generator + spec fix.
