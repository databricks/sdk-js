# Naming Audit: tokenmanagement

**Path:** `packages/tokenmanagement/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-admin API for managing personal access tokens (PATs) belonging to any user in the workspace — list/get/create-on-behalf-of/delete arbitrary user tokens. Distinct from the per-user `tokens` API which only manages the calling user's own tokens.
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 4 |
| Low | 3 |
| Observation | 0 |

## High severity

### 1. Package name `tokenmanagement` duplicates `tokens` — overlap with sibling package
- **Why weird:** Two packages, `tokens` and `tokenmanagement`, both manage Databricks personal access tokens (PATs). Both expose `ListTokens*`, `RevokeToken*`, and list response/request types, and both publish a `Client` class with `listTokens` methods. The only structural differences are (a) the admin variant adds `getToken`, `createOnBehalfOfToken`, and admin-only fields on its token info, (b) the per-user variant has `createToken` (no on-behalf-of), and (c) the entity type is named `AdminTokenInfo` here vs. `PublicTokenInfo` in `tokens`. URL paths also differ: `/api/2.0/token-management/...` vs `/api/2.0/token/...`. From a TS user's perspective the namespaces collide: `import {Client, ListTokensRequest} from '@databricks/sdk-tokenmanagement/v1'` and `import {Client, ListTokensRequest} from '@databricks/sdk-tokens/v1'` clash on every public name.
- **Category:** 12 (duplicate concepts across `tokens` vs `tokenmanagement` packages).
- **Suggested name:** Keep the directory split (the API is split upstream) but in the public exports prefix admin types: `AdminListTokensRequest`, `AdminRevokeTokenRequest`, etc., or alternatively rename the package to `tokenadmin` so the call-site distinction is unmistakable (`@databricks/sdk-tokenadmin`).
- **Rationale:** Today consumers who import both packages cannot do so by named import without aliasing every type.

### 2. `AdminTokenInfo` — `Info` is a vague suffix, package-specific prefix is misleading
- **Why weird:** `AdminTokenInfo` is the central domain entity but `Info` is a generic suffix that adds nothing — every type is "info about something". `Admin` is a prefix that comes from this being the admin-API variant but is meaningless once you've imported from `@databricks/sdk-tokenmanagement`. Compare to the sibling `tokens` package which calls its entity `PublicTokenInfo` (also `Info`-suffixed) — neither name reads well. `src/v1/model.ts:5`.
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix), 15 (generic suffix that loses meaning).
- **Suggested name:** `Token` (or `ManagedToken` if `Token` would clash with a class on the consumer side; given this is exported from `@databricks/sdk-tokenmanagement/v1`, `Token` is fine — see also finding #1 about cross-package name collisions).
- **Rationale:** `Token` is the noun the user thinks about. `Info` is a Go-SDK tic; TS does not need it.

### 3. Client method `deleteToken` wraps request type `RevokeTokenRequest` — verb-tense inconsistency
- **Why weird:** `client.deleteToken(req: RevokeTokenRequest)` at `client.ts:99-100` with the type defined at `model.ts:85`. The method says "delete" but the request type, request handler, and HTTP behavior is "revoke". The HTTP method is `DELETE` and the URL is `/tokens/{id}`, so REST-style "delete" is reasonable for the method, but then the request type should match — or the method should be `revokeToken` to match the type. The sibling `tokens` package uses `revokeToken` consistently.
- **Category:** 13 (verb-tense inconsistency between method and request type), 17 (inconsistent action verbs across the two packages: `tokenmanagement.deleteToken` vs `tokens.revokeToken` for the same kind of operation).
- **Suggested name:** Either rename method to `revokeToken` (matches type and matches sibling package) or rename type to `DeleteTokenRequest` (matches HTTP verb). Recommend the former so both packages share a verb.
- **Rationale:** "Revoke" carries a security/lifecycle meaning that "delete" loses; tokens aren't deleted from history, they're invalidated.

### 4. `AdminTokenInfo` — `Admin` mid-position prefix is an architectural-tier leak (not domain) — `src/v1/model.ts:5`
- **Why:** `Admin` mid-position on the entity type names a service-tier / audience-of-callers (admin vs. non-admin caller), not a domain concept. The sibling package uses `PublicTokenInfo` for the same kind of leak (`Public` mid-position). Tokens are not "admin tokens"; they are personal access tokens that this admin-scoped endpoint can list/manage. The `Admin`/`Public` distinction is purely about which RBAC tier of the backend service exposes the model.
- **Category:** Proto-architectural-leak — `Public`/`Internal`/`External` family of mid-position service-tier qualifiers used as a noun prefix.
- **Suggested:** `Token` (or `ManagedToken` to disambiguate from the sibling package's entity; see also finding #2 which already proposes `Token`).
- **Rationale:** The `Admin` qualifier survives from the proto's two-tier service split (`token-management` admin-scoped service vs. `token` user-scoped service). End users of the SDK only see one type per import; the architectural-tier label adds no domain meaning at the call site (e.g., `token.tokenId` is clearer than `adminTokenInfo.tokenId`).

## Medium severity

### 5. `ListTokensRequest` fields `createdById` and `createdByUsername` — duplicate filter slots
- **Why weird:** `ListTokensRequest { createdById?, createdByUsername? }` (`model.ts:71-76`). Two fields that filter on the same logical concept (the creator), with no semantics about whether they're AND/OR. The doc string above the type says "string filter parameter instead of hard-coded filters" — i.e., this is a temporary shape. The client builds `params` from both unconditionally (`client.ts:158-163`) which means callers can submit both at once and get undefined server behavior.
- **Category:** 1 (vague — relationship unspecified), 6 (misleading — looks like two filters, possibly redundant).
- **Suggested name:** Either expose a single `filter` string or document mutual exclusivity. At minimum, JSDoc the AND/OR semantics.
- **Rationale:** Consumer-facing API ambiguity.

### 6. `ownerId` vs `createdById` — both are user IDs, on the same struct, no docs distinguishing semantics beyond JSDoc
- **Why weird:** `AdminTokenInfo` has `createdById` ("User ID of the user that created the token", `model.ts:15`) and `ownerId` ("User ID of the user that owns the token", `model.ts:19`). What's the difference? In the sibling `tokens` package, the type has no `ownerId`. This appears to be admin-only metadata where ownership can transfer (e.g., on-behalf-of tokens). A reader has no way to know without external docs whether the two are usually equal.
- **Category:** 1 (vague — relationship unstated), 19 (underspecified IDs in same struct).
- **Suggested name:** Keep names but add JSDoc clarifying when they diverge (e.g., on-behalf-of tokens: creator is the principal who called the API, owner is the service principal).
- **Rationale:** Discoverability.

### 7. `workspaceId` on `AdminTokenInfo` — only meaningful for account-level scope
- **Why weird:** `workspaceId?: number | undefined` (`model.ts:21`) is documented "If applicable, the ID of the workspace that the token was created in." So it's optional and only meaningful at the account level. But the package and the URL path `/api/2.0/token-management/...` is a workspace endpoint. The field thus carries no useful signal at this endpoint, yet it's exposed.
- **Category:** 6 (misleading — looks pertinent, often vestigial).
- **Suggested name:** Keep; document under what circumstances it is populated (e.g., when the same model is reused at the account API).
- **Rationale:** Generator artefact from sharing models across workspace/account scopes. Flag for upstream cleanup.

### 8. `CreateOnBehalfOfTokenRequest` — preposition phrase inside type name
- **Why weird:** The type name contains "OnBehalfOf" — a preposition phrase. Reads as "create on behalf of token request" when the intent is "request to create [on-behalf-of token]" (parse: a kind of token). `model.ts:27`. Industry shorthand is "OBO" but the SDK avoids the acronym.
- **Category:** 7 (overly verbose), 14 (Go/Java-style camelCase verb phrase).
- **Suggested name:** `CreateOboTokenRequest` (with JSDoc spelling out OBO), or `MintTokenForServicePrincipalRequest` if explicitness wins over brevity.
- **Rationale:** This is the only operation in the package whose name relies on the preposition; surfacing the intent (mint a token for someone else) helps. Defensible as-is.

## Low severity

### 9. `Client` class is named `Client` (no namespacing)
- **Why weird:** `export class Client` (`client.ts:44`). With both `tokens` and `tokenmanagement` packages exporting a `Client`, and many other packages too, code that imports several SDK clients has to alias each one. The class name itself is the most generic possible.
- **Category:** 1 (vague), 12 (duplicate concept across all SDK packages — every package has its own `Client`).
- **Suggested name:** `TokenManagementClient` (or `TokenAdminClient`).
- **Rationale:** This is a cross-package convention concern; mass-renaming would be a breaking change, but flag because users will hit it.

### 10. `PACKAGE_SEGMENT` constant — vague label
- **Why weird:** `const PACKAGE_SEGMENT = {...}` (`client.ts:39`). "Segment" is CS jargon; the comment one line up explains it's "the User-Agent identity segment". Without the comment, the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `USER_AGENT_PKG`.
- **Rationale:** Minor; identical issue in every generated package.

### 11. Package name `tokenmanagement` — `Management` suffix is an architectural label, not a domain noun — package directory
- **Why:** The package's directory and npm name `tokenmanagement` ends in `management`, which sits in the `Manager`/`Handler`/`Controller`/`Processor` family of architectural-tier suffixes. The package does not contain a "management" concept; it contains operations on tokens (list, get, create-on-behalf-of, delete). The `-management` suffix is service-side scaffolding language (cf. proto `TokenManagementService`) that leaks out via the URL path `/api/2.0/token-management/...` and into the SDK package name. Compare to peers in the SDK where the action package is named after the domain noun (`tokens`, `clusters`, `secrets`), not the service tier.
- **Category:** Proto-architectural-leak — `Manager`/`Handler`/`Controller`/`Processor`/`-management` family (architectural label not in the domain).
- **Suggested:** `tokenadmin` — keeps the audience-disambiguation from sibling `tokens` but uses an audience noun rather than an architectural verb. See finding #1 which proposes the same package rename for the collision-avoidance reason.
- **Rationale:** "Management" is meaningless to an SDK consumer (everything an SDK does is, in some sense, "managing"). `tokenadmin` names *who* the API is for (admins-of-others) and disambiguates from `tokens` (self) without leaking the proto service tier.

## Observations

_None._

## Domain glossary
- `PAT` — Personal Access Token (the term the package is about but never names directly).
- `OBO` — On-Behalf-Of (spelled out in `CreateOnBehalfOfTokenRequest`).
- `service principal` — Non-human identity that a token can be minted for via on-behalf-of.
- `workspace` — Mentioned in `workspaceId` and in proto comments; the scope of this admin API.
- `m2m`/`u2m` — not encountered.
- `iam` — not encountered.
- `wkt` — not encountered in current source.

## Cross-package overlap with `tokens`
- **Shared request types:** `ListTokensRequest`, `RevokeTokenRequest` exist in both packages with different fields. `ListTokensRequest` in `tokenmanagement` has `createdById`/`createdByUsername`; in `tokens` it differs.
- **Shared response shapes:** List and revoke responses exist in both packages. Both pull from a `*TokenInfo[]` array (`AdminTokenInfo[]` vs `PublicTokenInfo[]`).
- **Different entity name:** `AdminTokenInfo` (this package) vs `PublicTokenInfo` (`tokens` package).
- **Different create operation:** `createOnBehalfOfToken` (admin) vs `createToken` (per-user).
- **Different revoke method name:** `deleteToken` (admin) vs `revokeToken` (per-user) — flagged in finding #3.
- **Different URL prefix:** `/api/2.0/token-management/...` vs `/api/2.0/token/...`.

The two packages are conceptual siblings (PAT lifecycle) split by audience (admin-of-others vs self), but the SDK surface is split inconsistently — naming, return types, and method verbs diverge for no obvious reason. Worth raising at the SDK-design level.

## File coverage
- `src/v1/model.ts` (169 lines): read fully.
- `src/v1/client.ts` (185 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (18 lines): read fully.
