# Naming Audit: `@databricks/sdk-iam` (v2)

**Package:** `iam` (`packages/iam/src/v2/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`

**Domain:** Databricks IAM — workspace assignment / access details and
resolve-by-external-id flows that bridge the customer IdP to Databricks.

## Summary

| Severity | Count |
| -------- | ----- |
| High     |     8 |
| Medium   |    12 |
| Low      |    10 |
| Observation | 3 |
| **Total** | **33** |

Three dominant themes remain. **First, the package still ships methods,
requests, and a handful of variants in parallel `*` and `*Proxy` forms** that
differ only in whether `accountId` is supplied by the caller or by the URL
routing layer. **Second, the package still leaks proto conventions into JSDoc:**
the literal `<Databricks>` markup appears throughout. **Third, naming is
inconsistent across status fields and parent-account fields** —
`accountUserStatus`, `accountSpStatus`, and `status` all describe the same
`State` enum across types, and the `Detail` suffix on
`WorkspaceAssignmentDetail` / `WorkspaceAccessDetail` adds no information
beyond Java-RPC habit.

---

## High-severity findings

### H1. Workspace assignment/access methods exist in `*` + `*Proxy` variants — duplicate concept across the public API
- **File:** `client.ts:101-153, 159-223, 229-281, 290-355, 363-424, 432-472, 475-522, 525-596, 604-688`
- **Category:** 12, 7, 14 (duplicate concepts; verbose; Go/Java-style RPC pairs)
- **Issue:** The remaining endpoints are duplicated as `<verb>X` + `<verb>XProxy`
  pairs: `resolveGroup` + `resolveGroupProxy`, `resolveUser` +
  `resolveUserProxy`, `resolveServicePrincipal` +
  `resolveServicePrincipalProxy`, plus
  `createWorkspaceAssignmentDetail`/`Proxy`,
  `deleteWorkspaceAssignmentDetail`/`Proxy`,
  `getWorkspaceAssignmentDetail`/`Proxy`,
  `listWorkspaceAssignmentDetails`/`Proxy`,
  `updateWorkspaceAssignmentDetail`/`Proxy`. The only difference is the URL:
  non-proxy uses `/identity/accounts/{accountId}/...`, proxy uses
  `/identity/...` (workspace-rooted, accountId resolved server-side). The
  request types are the same minus the `accountId` field. A consumer must
  decide between two methods for every operation, doubling the API surface
  and the request-type count.
- **Suggestion:** Collapse to one method per operation. Make `accountId`
  optional on the single request type — when absent, fall back to the
  account context of the credential / `ClientOptions.accountId` (the client
  already does this on line 105, 163, 233, 294, 367, etc.). The "proxy" path
  becomes an implementation detail decided by the transport layer based on
  whether the caller is workspace-scoped. If this cannot be done because the
  endpoints have meaningfully different behavior, name them after that
  difference (e.g. `createWorkspaceAssignmentForAccount` vs
  `createWorkspaceAssignmentInCurrentWorkspace`) rather than the proto/Go
  `Proxy` suffix that surfaces routing.
- **Rationale:** `Proxy` is a routing detail of the Databricks gateway, not a
  semantic distinction. It is the strongest source of confusion in the
  package. Idiomatic TS SDKs (AWS, Azure, Stripe) never expose
  account-vs-workspace duplicates in the type names.

### H2. `Entitlement` — top-level enum name is too generic and mixes two concepts
- **File:** `model.ts:7-15`
- **Category:** 1 (vague/generic)
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

### H3. `State` — top-level enum name is too generic, with inconsistent field names per usage
- **File:** `model.ts:26-33`
- **Category:** 1, 17 (vague/generic; inconsistent naming)
- **Issue:** `State` with values `ACTIVE`, `INACTIVE` is
  used as the status of users, service principals, and identities in
  workspaces and accounts. The JSDoc says "The activity status of a user or
  service principal", which is narrower than the name suggests, and the
  members `ACTIVE`/`INACTIVE` are common enough that an unqualified `State`
  type colliding in users' import space is likely. The field name also
  varies per usage: `accountUserStatus`, `accountSpStatus`, plain `status` —
  three different field names for the same enum domain across three types.
- **Suggestion:** Rename the enum to `ActivityStatus` (or `PrincipalStatus`).
  Standardize the field name to `status` everywhere.
- **Rationale:** A 3-letter enum with 2 values and the name `State` is a
  textbook example of a name that says nothing about the domain. JSDoc-only
  context is not enough.

### H4. `User.username` vs `User.name` — name field collision
- **File:** `model.ts:291-293`
- **Category:** 6, 10 (misleading; reserved-word-style collision)
- **Issue:** `User` has both `username` (string, email-like login identifier
  per the JSDoc) and `name` (a nested struct with `givenName`/`familyName`).
  In English `name` and `username` are near-synonyms and users routinely
  conflate them. A developer auto-completing `user.` sees two `*name*`
  fields with no hint at the difference.
- **Suggestion:** Rename `User.name` to `User.fullName` (or `personName`).
  Rename `User.username` to `User.email` if the value is always an email
  (the JSDoc says "Username/email of the user"), or `User.loginName`
  otherwise.
- **Rationale:** Disambiguates two semantically distinct identifiers.

### H5. `accountSpStatus` field uses cryptic abbreviation `Sp`
- **File:** `model.ts:256`
- **Category:** 5, 6 (cryptic abbreviation; misleading)
- **Issue:** `ServicePrincipal.accountSpStatus?: State`. `Sp` is a Databricks
  internal shorthand for "service principal". Externally it reads as
  "Spanish" or simply opaque. The parallel field on `User` is
  `accountUserStatus`, which is spelled out. Two field names for the same
  `State` enum across two sibling types is inconsistent (also category 17).
- **Suggestion:** Rename to `accountStatus` everywhere (the type already
  tells you it is a service principal / user), or pick one spelling and use
  it: `accountServicePrincipalStatus` if it must include the principal type.
- **Rationale:** Abbreviation `Sp` is opaque to external developers and
  inconsistent with the spelled-out `User` sibling.

### H6. `WorkspaceAccessDetail` and `WorkspaceAssignmentDetail` — two overlapping "Detail" types
- **File:** `model.ts:305-318, 321-330`, plus the methods they appear in
- **Category:** 1, 12, 7 (vague generic suffix; duplicate concept; verbose)
- **Issue:** Two top-level types with the `Detail` suffix model overlapping
  shapes of "what a principal has in a workspace":
  - `WorkspaceAccessDetail`: principal, workspace, account, principalType, accessType, status, permissions.
  - `WorkspaceAssignmentDetail`: principal, workspace, account, principalType, entitlements.

  Both identify the same triple `(accountId, workspaceId, principalId)`.
  `Detail` is a meaningless suffix — every type in a data model is a "detail".
  The differences are: permissions (Access), entitlements (Assignment). A new
  reader cannot tell from the names which type carries which fields.
- **Suggestion:** Rename to reflect the payload:
  - `WorkspaceAccessDetail` → `WorkspaceAccess` (carries the resolved access incl. permissions).
  - `WorkspaceAssignmentDetail` → `WorkspaceAssignment` (carries the assignment + entitlements).
  Or merge into one type with a discriminator if the platform allows it.
- **Rationale:** `Detail` is fluff. The methods named after these types
  (`getWorkspaceAccessDetail`, `listWorkspaceAssignmentDetails`,
  `updateWorkspaceAssignmentDetail`, …) inherit the noise.

### H7. `WorkspaceAccessDetailView` is a Google-style "view" enum but named oddly
- **File:** `model.ts:36-40`
- **Category:** 1, 14 (vague; Google/proto-style)
- **Issue:** Values are `BASIC`, `FULL`. The type is a [Google AIP-157
  view-mask](https://google.aip.dev/157), but the name doesn't surface that
  and the values look generic. It's used as `view?:
  WorkspaceAccessDetailView` on `GetWorkspaceAccessDetailRequest` / `Local`
  variants, but a developer cannot guess from the field name `view` that it
  controls response shape.
- **Suggestion:** `enum FieldView { BASIC = 'BASIC', FULL = 'FULL' }`,
  reusable across the SDK. Or rename to `WorkspaceAccessView` and document
  what each enum value includes/excludes.
- **Rationale:** `Detail` in the name is the same `Detail` flagged in H6 and
  carries no extra meaning.

### H8. `principalType: PrincipalType` — type-suffix tautology pattern
- **File:** `model.ts:312, 328`
- **Category:** 20 (type-suffix tautology)
- **Issue:** The field `principalType: PrincipalType | undefined` appears on
  `WorkspaceAccessDetail` and `WorkspaceAssignmentDetail`. The field name +
  type name reads `principalType: PrincipalType` — the type name is in the
  field name. The pattern is a hallmark of generated code from proto where
  the field name is derived from the enum type name.
- **Suggestion:** Either drop the type from the field name (`type:
  PrincipalType`) or drop the type suffix from the enum (`PrincipalKind`
  with field `principalType` reading `principal.type = "USER"` works, but
  `principal: PrincipalKind` is even cleaner).
- **Rationale:** Tautology adds visual noise without adding meaning.

---

## Medium-severity findings

### M1. `CreateWorkspaceAssignmentDetailProxyRequest` — 43-character name
- **File:** `model.ts:62`, similarly `DeleteWorkspaceAssignmentDetailProxyRequest`, `UpdateWorkspaceAssignmentDetailProxyRequest`, `ListWorkspaceAssignmentDetailsProxyRequest`, `GetWorkspaceAssignmentDetailProxyRequest`
- **Category:** 7 (overly verbose)
- **Issue:** Five of the request type names are 40+ characters:
  `CreateWorkspaceAssignmentDetailProxyRequest` (43 chars),
  `DeleteWorkspaceAssignmentDetailProxyRequest` (43),
  `UpdateWorkspaceAssignmentDetailProxyRequest` (43),
  `ListWorkspaceAssignmentDetailsProxyRequest` (42),
  `GetWorkspaceAssignmentDetailProxyRequest` (40). Plus the imports list in
  `client.ts` repeats them, doubling the noise.
- **Suggestion:** Once H1 collapses the proxy duplication and H6 drops
  `Detail`, these become `CreateWorkspaceAssignmentRequest` etc. — about 30
  chars each.
- **Rationale:** Length itself is not a sin, but `43 chars × 2 ×
  every-occurrence` is friction.

### M2. `Local` suffix on `GetWorkspaceAccessDetailLocalRequest`
- **File:** `model.ts:94`, `client.ts:327`, `index.ts:19`
- **Category:** 1, 14 (vague; Java/Go-style)
- **Issue:** `GetWorkspaceAccessDetailLocalRequest` uses a `Local` suffix
  that is not defined anywhere in the public types. From `client.ts:331`
  the "local" version omits `accountId`/`workspaceId` from the URL — it is
  another proxy/routing variant. Why is this one called `Local` while the
  others use `Proxy`?
- **Suggestion:** Make it consistent. If `Local` and `Proxy` mean the same
  thing (omit accountId), pick one — `InCurrentWorkspace` would be more
  descriptive than either. If they differ semantically, document the
  difference.
- **Rationale:** Two suffixes for the same routing-variant idea is the
  worst possible outcome.

### M3. `applicationId` on `ServicePrincipal` — third ID on the same type
- **File:** `model.ts:251-252`
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

### M4. `workspaceAssignmentDetail` field repeats type name
- **File:** `model.ts:64, 74, 264, 278`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `CreateWorkspaceAssignmentDetailRequest.workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined`.
- **Suggestion:** Rename field to `assignment` (after H6 drops `Detail`,
  the type is `WorkspaceAssignment` and `assignment` reads naturally).
- **Rationale:** Field name echoing the type name adds no information.

### M5. `servicePrincipal` field repeats type name
- **File:** `model.ts:215`
- **Category:** 20 (type-suffix tautology)
- **Issue:** `ResolveServicePrincipalResponse.servicePrincipal?: ServicePrincipal | undefined`.
- **Suggestion:** Rename to `principal` or `sp` (consistent with the rest
  of the response bodies, e.g. `user` on `ResolveUserResponse`).
- **Rationale:** Field name echoing the type name adds no information.

### M6. `Group.accountId` doc — "The parent account ID for group in <Databricks>" (missing article)
- **File:** `model.ts:131-132`
- **Category:** 6 (misleading via grammar)
- **Issue:** Doc reads "The parent account ID for group in <Databricks>" —
  missing "the" before "group". Same pattern on `User.accountId` ("The
  accountId parent of the user in <Databricks>.") and `ServicePrincipal.accountId`
  ("The parent account ID for the service principal in <Databricks>."). Three
  siblings with three different phrasings of the same thing, two with grammar
  issues.
- **Suggestion:** Standardize to "Databricks account ID of the parent
  account." or just "Parent Databricks account ID."
- **Rationale:** Consistency + grammar; the `<Databricks>` template marker
  also needs to go (see M7).

### M7. `<Databricks>` proto template markup throughout JSDoc blocks
- **File:** `model.ts` everywhere, e.g. `25, 29, 31, 63, 73, 79, 89, 131, 133`; `client.ts:286, 287, 323`
- **Category:** 14 (Go/proto-style markup leak)
- **Issue:** The literal string `<Databricks>` appears 25+ times across the
  JSDoc comments. It is upstream template syntax meant to be replaced by
  the brand at doc-generation time; in TS it renders as stray angle brackets
  in IDE hover popups and TypeDoc. Examples:
  - "Required. Workspace assignment detail to be created in <Databricks>"
  - "Internal service principal ID of the service principal in <Databricks>."
  - "Required. ID of the principal in <Databricks>."
- **Suggestion:** Strip the template markup in the generator, leaving just
  "Databricks".
- **Rationale:** Public docs leaking template syntax is the most visible
  proto-leak across the SDK.

### M8. `UpdateWorkspaceAssignmentDetailRequest` doc body says `TBD since the only updatable field is permissions`
- **File:** `model.ts:269`
- **Category:** 6 (misleading)
- **Issue:** The doc on `UpdateWorkspaceAssignmentDetailRequest` is literally
  "TBD since the only updatable field is permissions" — internal TODO
  shipped to public surface. Also factually wrong (entitlements, not
  permissions, per the type).
- **Suggestion:** Replace with the real description.
- **Rationale:** Placeholder docs degrade developer trust.

### M9. `resolveByExternalId` URL segment uses camelCase
- **File:** `client.ts:105, 134, 163, 198, 233, 262`
- **Category:** 14, 3 (Go-style; casing)
- **Issue:** The URL paths use `/resolveByExternalId` in camelCase. The URLs
  are server-defined, so this is not a naming issue the SDK can fix, but it
  is worth noting because the inconsistency is visible in the SDK's debug
  logs.
- **Suggestion:** Server-side fix (out of scope), but flag to the API team.
- **Rationale:** Not the SDK's bug, but reflects an upstream inconsistency.

### M10. `permissions: WorkspacePermission[]` vs `entitlements: Entitlement[]` — conceptually overlapping fields
- **File:** `model.ts:317, 329`
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

### M11. `resolveByExternalId` method naming
- **File:** `client.ts:101, 159, 229`
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

### M12. JSDoc text "(workspace-level proxy)" surfaces routing architecture on five methods
- **File:** `client.ts:392, 451, 499, 561, 645`
- **Category:** 14 (proto/Go-style architectural leak in docs)
- **Issue:** Five methods include the parenthetical "(workspace-level proxy)"
  in their JSDoc summary, e.g. `createWorkspaceAssignmentDetailProxy`,
  `deleteWorkspaceAssignmentDetailProxy`, `getWorkspaceAssignmentDetailProxy`,
  `listWorkspaceAssignmentDetailsProxy`, `updateWorkspaceAssignmentDetailProxy`.
  The phrase "workspace-level proxy" is a Databricks-internal routing concept
  — it tells the developer how the request hops through the gateway, not what
  the method does for them. In IDE hover popups and TypeDoc this is the
  first thing a consumer reads.
- **Suggestion:** Replace with consumer-facing semantics, e.g. "Creates a
  workspace assignment in the current workspace (account ID is resolved
  from the credential's workspace context)." If H1 collapses the variants,
  this finding disappears with them.
- **Rationale:** Public docs should describe behavior visible to the caller,
  not the gateway's routing topology.

---

## Low-severity findings

### L1. `accountId` field documented inconsistently across types
- **File:** `model.ts:69, 85, 103, 121, 131, 151, 182, 207, 232, 245, 271, 285`
- **Category:** Observation, 6 (misleading)
- **Issue:** Multiple different phrasings of the same `accountId` field's JSDoc:
  - "Required. The account ID for which the workspace assignment detail is being created."
  - "Required. The parent account ID for which the workspace access details are being requested."
  - "The parent account ID for group in <Databricks>."
  - "The accountId parent of the user in <Databricks>."
- **Suggestion:** One canonical phrasing for the request-level field
  ("Databricks account ID. Falls back to ClientOptions.accountId if omitted.")
  and one for the resource-level field ("Parent Databricks account ID.").
- **Rationale:** Same field, many different doc strings.

### L2. `principalId` is `number` (Databricks internal) but `accountId` is `string` (UUID) — type-inconsistency for IDs
- **File:** `model.ts:70, 80, 90, 96, 104, 108, 122, 126, 132, 134, 152, 246, 248, 286, 288, 307, 311, 323, 327`
- **Category:** 19 (underspecified ID)
- **Issue:** Databricks-internal IDs are `number`, account IDs are `string`
  UUIDs. The convention is consistent across the file, but a developer
  reading just one type cannot tell which to expect.
- **Suggestion:** Brand the types: `type AccountId = string & { readonly __brand: 'AccountId' }`,
  `type PrincipalInternalId = number & { readonly __brand: 'PrincipalInternalId' }`.
- **Rationale:** Type-system disambiguation; out-of-scope for a 1:1 port but
  worth noting for any future hardening.

### L3. `ResolveGroupRequest` vs `ResolveGroupProxyRequest` symmetry
- **File:** `model.ts:172-186`
- **Category:** Observation
- **Issue:** `ResolveGroupRequest` carries `accountId` + `externalId`, but
  the proxy variant `ResolveGroupProxyRequest` carries only `externalId`.
  The `Response` is the same. This is the H1 pattern surfacing again, and
  the same applies to `ResolveUser*` and `ResolveServicePrincipal*`.
- **Suggestion:** Collapse per H1.
- **Rationale:** Pattern, not a new finding.

### L4. `Group.externalId` field name vs `Group.accountId` field name — neither match wire snake_case nor the legacy SCIM camelCase
- **File:** `model.ts:136, 250, 290`
- **Category:** Observation
- **Issue:** SCIM API (the legacy Databricks IAM API) uses `externalId`
  (camelCase) on the wire; the new IAM API uses `external_id` (snake_case).
  This SDK uses `externalId` in TS and `external_id` on the wire. The
  pattern is correct and consistent — flagging only because anyone migrating
  from SCIM may be confused.
- **Suggestion:** None; documentation for migrators if not already present.
- **Rationale:** Migration-friendly note.

### L5. `pageSize` JSDoc could document the default
- **File:** `model.ts:143, 155`
- **Category:** 6, Observation (misleading)
- **Issue:** `pageSize` docstrings do not specify the default ("If not
  provided, defaults to N"). The field is `optional` in TS already, but
  callers don't know what value the server picks.
- **Suggestion:** Document the default if known.
- **Rationale:** Trivial cleanup.

### L6. `User.username` doc — "Username/email of the user"
- **File:** `model.ts:291`
- **Category:** 6 (misleading)
- **Issue:** Doc says "Username/email" — which is it? Slashes in JSDoc
  signal ambiguity.
- **Suggestion:** Be specific: "Email address used as the user's login
  identifier."
- **Rationale:** Surface the format.

### L7. `Group.groupName` doc — "Display name of the group"
- **File:** `model.ts:137-138`
- **Category:** 6 (misleading)
- **Issue:** The field is `groupName` but the doc calls it `displayName`.
  Inconsistent naming.
- **Suggestion:** Either rename the field to `displayName` (matching the
  doc and the parallel field on `ServicePrincipal`), or update the doc to
  say "Group name displayed in the UI".
- **Rationale:** Consistency between the doc and the field name.

### L8. `ServicePrincipal` JSDoc — "The details of a ServicePrincipal resource."
- **File:** `model.ts:129, 243, 283`
- **Category:** 6 (misleading)
- **Issue:** Type-level JSDoc says "ServicePrincipal" (camelCase) instead of
  "service principal" (English). Same on `Group` ("The details of a Group
  resource.") and `User` ("The details of a User resource."). Three
  identical placeholder docs.
- **Suggestion:** Replace with prose.
- **Rationale:** Type-level docs should be in English.

### L9. `applicationId` doc could disclose source
- **File:** `model.ts:251-252`
- **Category:** 19 (underspecified ID)
- **Issue:** Doc says "Application ID of the service principal." with no
  format hint (UUID? AAD app ID? Databricks-internal?).
- **Suggestion:** "Application ID of the service principal at the customer's
  identity provider (typically the Azure AD app registration UUID)."
- **Rationale:** Surface the format.

### L10. `internalId` is sometimes `Internal group ID` and sometimes `Internal service principal ID` / `Internal userId`
- **File:** `model.ts:133, 247, 287`
- **Category:** 6, Observation (misleading; documentation rot)
- **Issue:** `internalId` is documented three different ways across types:
  "Internal group ID of the group in <Databricks>.", "Internal service
  principal ID of the service principal in <Databricks>.", "Internal userId
  of the user in <Databricks>." (typo on the last — `userId` should be two
  words). The self-referential ("group ID of the group") phrasing is also
  awkward.
- **Suggestion:** Standardize to "Databricks-internal numeric ID of the X."
- **Rationale:** Documentation consistency.

---

## Observations (not findings, but worth noting)

### O1. The `Detail` suffix is wired through the URL path
- **File:** `client.ts:294, 331, 367, 402, 436, 460, 479, 504, 529, 566, 608, 654`
- **Issue:** The server URL paths use `workspaceAccessDetails` and
  `workspaceAssignmentDetails` — proto/Go RPC pattern. The SDK reflects the
  server names. Renaming the TS types per H6 does not change the wire; the
  SDK can have nicer TS names while still hitting `workspaceAccessDetails`
  URLs.

### O2. `Local` only applies to `WorkspaceAccessDetail` (not `WorkspaceAssignmentDetail`)
- **File:** `model.ts:94`, `client.ts:327`
- **Issue:** Only `WorkspaceAccessDetail` has a `Local` variant; the parallel
  `WorkspaceAssignmentDetail` uses `Proxy` instead. Inconsistent presence of
  the Local/Proxy variants across sibling Detail types.

### O3. The `accountId` fallback comment in `client.ts:70-72` only applies to non-proxy methods
- **File:** `client.ts:70-72`
- **Issue:** "Fallback for endpoints whose path contains {account_id}. If
  the request already carries an accountId, that value wins." This is true
  for the non-proxy methods only — `*Proxy` methods don't have `accountId`
  in the URL. Worth noting because if H1 collapses the variants, the
  fallback semantic becomes "use the workspace context if accountId is
  absent".

---

## Cross-cutting recommendations (priority order)

1. **Collapse `*Proxy` and `*Local` variants (H1, M2, L3, O2, O3).** This
   is the largest single improvement and ~halves the public type surface.
2. **Replace `<Databricks>` template markup (M7).** Generator-side fix.
3. **Standardize ID field names (L1, L10) and status field names (H3, H5).**
   One name per concept.
4. **Remove type-suffix tautology fields (H8, M4, M5).** Single-token
   field names where the type already carries the kind.
5. **Drop the `Detail` suffix from the Workspace* types (H6).**
6. **Rewrite the placeholder JSDocs (M8).** Generator + spec fix.

---

## Fixed

- #H14 `AccountAccessIdentityRule.name` (originally cited at `model.ts:100-104`): Fixed in regeneration on 2026-05-20 — `AccountAccessIdentityRule` type and all rule endpoints removed from the package.
- #H15 `parent` field on rule endpoints (originally cited at `model.ts:113, 219, 318, 470`): Fixed in regeneration on 2026-05-20 — rule endpoints removed entirely.
- #M4 `GroupMembershipSource` enum (originally cited at `model.ts:24-30`): Fixed in regeneration on 2026-05-20 — `GroupMembershipSource` enum and related group-membership types removed from the package.
- #M6 `accountAccessIdentityRule` wrapper field (originally cited at `model.ts:117`): Fixed in regeneration on 2026-05-20 — `CreateAccountAccessIdentityRuleRequest` and the wrapper field removed.
- #M7 `directGroupMember` wrapper field (originally cited at `model.ts:125, 135`): Fixed in regeneration on 2026-05-20 — `DirectGroupMember` type and `CreateDirectGroupMemberRequest` removed from the package.
- #M9 `workspaceIdentityDetail` wrapper field (originally cited at `model.ts:940`): Fixed in regeneration on 2026-05-20 — `WorkspaceIdentityDetail` and the `UpdateWorkspaceIdentityDetailRequest` removed.
- #M13 Placeholder `TODO: Write description later when this method is implemented` JSDoc (originally cited at `model.ts:138, 144, 152, …` and 22 places in `client.ts`): Fixed in regeneration on 2026-05-20 — no `TODO:` placeholders remain in `model.ts` or `client.ts`.
- #M14 `parent` doc string disagreement with field name on rule endpoints (originally cited at `model.ts:113, 219, 318, 470`): Fixed in regeneration on 2026-05-20 — rule endpoints removed.
- #M18 `nextPageToken` doc comment repeated 9 times verbatim (originally cited at `model.ts:483, 519, 548, 577, 613, 673, 700, 727`): Fixed in regeneration on 2026-05-20 — only one `nextPageToken` field remains (`ListWorkspaceAssignmentDetailsResponse.nextPageToken`); no repetition left.
- #M19 `ListGroupsRequest.filter` JSDoc (originally cited at `model.ts:529, 540`): Fixed in regeneration on 2026-05-20 — `ListGroupsRequest` and its `filter` field removed.
- #M20 `ListServicePrincipalsProxyRequest` doc with "SPs" abbreviation (originally cited at `model.ts:553`): Fixed in regeneration on 2026-05-20 — `ListServicePrincipalsProxyRequest` removed.
- #L5 `pageSize` JSDoc varying with/without "Optional." prefix (originally cited at `model.ts:471, 491, 524, 552, 600, 635, 678, 690, 705, 717, 762`): Fixed in regeneration on 2026-05-20 — "Optional." prefix is no longer present on any `pageSize` JSDoc; only two `pageSize` fields remain (in `ListWorkspaceAssignmentDetails*Request`).
- #L6 `filter` JSDoc varying (originally cited at `model.ts:476, 528, 557, 569, 638, 666`): Fixed in regeneration on 2026-05-20 — all `filter` fields removed (no `ListGroups`/`ListUsers`/`ListServicePrincipals` endpoints).
- #L12 `view` field on access-detail Get methods has no documented default (originally cited at `model.ts:415, 427`): Fixed in regeneration on 2026-05-20 — line numbers shifted; the `view` field remains at `model.ts:98, 110` but the prior client-level note ("BASIC by default or FULL") now appears in the method JSDoc at `client.ts:288, 325`; treat as Observation rather than a separate finding (folded into H7).
- #L13 `externalPrincipalId` vs `externalId` confusion (originally cited at `model.ts:92, 115, 220, 321`): Fixed in regeneration on 2026-05-20 — rule endpoints (the only `externalPrincipalId` users) removed.
- #L14 `IdP` capitalization variance (originally cited at `model.ts:92, 459, 736, 761, 786, 952, 828`): Fixed in regeneration on 2026-05-20 — most `IdP` references gone with the removal of group/user/SP CRUD and rule endpoints; only the resolve-by-external-id docs still mention `IdP`, all in the same form.
- #L15 `next_page_token` snake_case in JSDoc (originally cited at `model.ts:483, 519, 548, 577, 613, 673, 700, 727`): Fixed in regeneration on 2026-05-20 — only one `next_page_token` mention remains and it appears in a context where the snake_case form is acceptable as a reference to the wire field.
- #M21 (renamed to M11) — `resolveByExternalId` method naming is preserved as M11.
- #H10 (the prior `internalId`/`principalId`/`groupId` three-name finding, originally cited at `model.ts:122, 226, 228, …`): Fixed in regeneration on 2026-05-20 — `groupId` and many `principalId` foreign-key sites removed with the deletion of group-membership and transitive-parent-group endpoints; remaining `internalId` / `principalId` distinction is captured under L2.
- #H11 (the prior `principalType: PrincipalType` finding spanning 5 types, originally cited at `model.ts:99, 304, 974, 990, 999`): Renumbered to H8; the underlying issue is still present but on fewer types (now 2 instead of 5).
- #H12 (the prior `Group.groupName` tautology finding, originally cited at `model.ts:461`): Renumbered into L7; the issue is now framed primarily as a JSDoc-vs-field-name mismatch since the field name itself is consistent with the SCIM/legacy form on the wire.
- #H13 (the prior `ServicePrincipal.internalId` doc tautology finding, originally cited at `model.ts:809-810`): Folded into L10 — the documentation-only aspect (per-type self-referential phrasing and the `userId` typo) is what remains.
- #M8 (the prior `workspaceAssignmentDetail` finding) → renumbered M4.
- #M10 (the prior `servicePrincipal` finding) → renumbered M5.
- #M11 (the prior `Group.accountId` doc finding) → renumbered M6.
- #M12 (the prior `<Databricks>` markup finding) → renumbered M7.
- #M15 (the prior "TBD" doc finding) → renumbered M8.
- #M16 (the prior `resolveByExternalId` URL casing finding) → renumbered M9.
- #M17 (the prior permissions-vs-entitlements finding) → renumbered M10.
- #H4 (the prior `PrincipalType` enum-name prefix finding, originally cited at `model.ts:18-23`): Pruned on 2026-05-20 — proto-style enum-name prefix on members is intentional and not a real issue.
- #M4 (the prior `WorkspacePermission.USER_PERMISSION` enum-member suffix finding, originally cited at `model.ts:43-48`): Pruned on 2026-05-20 — proto-style enum-name affix on members is intentional and not a real issue.
- #H7 (the prior "every enum has `<NAME>_UNSPECIFIED` zero value" finding, originally cited at `model.ts:8, 19, 28, 37, 44, 54`): Pruned on 2026-05-20 — proto3 mandates a zero-value enum member; `UNSPECIFIED` is intentional.
