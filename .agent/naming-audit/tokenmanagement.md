# Naming Audit: tokenmanagement

**Path:** `packages/tokenmanagement/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-admin API for managing personal access tokens (PATs) belonging to any user in the workspace — list/get/create-on-behalf-of/delete arbitrary user tokens. Distinct from the per-user `tokens` API which only manages the calling user's own tokens.
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 1 |
| Low | 1 |

## High severity

### 1. `AdminTokenInfo` — `Info` is a vague suffix, package-specific prefix is misleading
- **Why weird:** `AdminTokenInfo` is the central domain entity but `Info` is a generic suffix that adds nothing — every type is "info about something". `Admin` is a prefix that comes from this being the admin-API variant but is meaningless once you've imported from `@databricks/sdk-tokenmanagement`. Compare to the sibling `tokens` package which calls its entity `PublicTokenInfo` (also `Info`-suffixed) — neither name reads well. `src/v1/model.ts:27`.
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix), 15 (generic suffix that loses meaning).
- **Suggested name:** `Token` (or `ManagedToken` if `Token` would clash with a class on the consumer side; given this is exported from `@databricks/sdk-tokenmanagement/v1`, `Token` is fine).
- **Rationale:** `Token` is the noun the user thinks about. `Info` is a Go-SDK tic; TS does not need it.

### 2. Client method `deleteToken` wraps request type `RevokeTokenRequest` — verb-tense inconsistency
- **Why weird:** `client.deleteToken(req: RevokeTokenRequest)` at `client.ts:108-134` with the type defined at `model.ts:114`. The method says "delete" but the request type, request handler, and HTTP behavior is "revoke". The HTTP method is `DELETE` and the URL is `/tokens/{id}`, so REST-style "delete" is reasonable for the method, but then the request type should match — or the method should be `revokeToken` to match the type. The sibling `tokens` package uses `revokeToken` consistently.
- **Category:** 13 (verb-tense inconsistency between method and request type), 17 (inconsistent action verbs across the two packages: `tokenmanagement.deleteToken` vs `tokens.revokeToken` for the same kind of operation).
- **Suggested name:** Either rename method to `revokeToken` (matches type and matches sibling package) or rename type to `DeleteTokenRequest` (matches HTTP verb). Recommend the former so both packages share a verb.
- **Rationale:** "Revoke" carries a security/lifecycle meaning that "delete" loses; tokens aren't deleted from history, they're invalidated.

## Medium severity

### 3. `CreateOnBehalfOfTokenRequest` — preposition phrase inside type name
- **Why weird:** The type name contains "OnBehalfOf" — a preposition phrase. Reads as "create on behalf of token request" when the intent is "request to create [on-behalf-of token]" (parse: a kind of token). `model.ts:57`. Industry shorthand is "OBO" but the SDK avoids the acronym.
- **Category:** 7 (overly verbose), 14 (Go/Java-style camelCase verb phrase).
- **Suggested name:** `CreateOboTokenRequest` (with JSDoc spelling out OBO), or `MintTokenForServicePrincipalRequest` if explicitness wins over brevity.
- **Rationale:** This is the only operation in the package whose name relies on the preposition; surfacing the intent (mint a token for someone else) helps. Defensible as-is.

## Low severity

### 4. Package name `tokenmanagement` — `Management` suffix is an architectural label, not a domain noun — package directory
- **Why:** The package's directory and npm name `tokenmanagement` ends in `management`, which sits in the `Manager`/`Handler`/`Controller`/`Processor` family of architectural-tier suffixes. The package does not contain a "management" concept; it contains operations on tokens (list, get, create-on-behalf-of, delete). The `-management` suffix is service-side scaffolding language (cf. proto `TokenManagementService`) that leaks out via the URL path `/api/2.0/token-management/...` and into the SDK package name. Compare to peers in the SDK where the action package is named after the domain noun (`tokens`, `clusters`, `secrets`), not the service tier.
- **Category:** Proto-architectural-leak — `Manager`/`Handler`/`Controller`/`Processor`/`-management` family (architectural label not in the domain).
- **Suggested:** `tokenadmin` — keeps the audience-disambiguation from sibling `tokens` but uses an audience noun rather than an architectural verb.
- **Rationale:** "Management" is meaningless to an SDK consumer (everything an SDK does is, in some sense, "managing"). `tokenadmin` names *who* the API is for (admins-of-others) and disambiguates from `tokens` (self) without leaking the proto service tier.
