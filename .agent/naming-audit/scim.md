# Naming Audit: scim

**Path:** `packages/scim/src/v1/`
**Versions audited:** v1
**Inferred domain:** SCIM (System for Cross-domain Identity Management, RFC 7644) — workspace and account user, service principal, and group provisioning, plus password permissions. `SCIM` itself is an industry-standard protocol acronym and is treated as a domain word.
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 2 |
| Low | 1 |

## High severity

### 1. Proto-style nested enum names with `_` separators — `src/v1/model.ts:90,101,113,125,136,148`
- **Why weird:** Six exported enums use the proto-nested form `<Outer>_<Inner>`: `AccountGetSortOrder_GetSortOrder`, `AccountListSort_Order`, `AccountPatchOp_PatchOp`, `AccountPatchSchema_PatchSchema`, `ListSort_Order`, and `PasswordPermission_Level`. Each is suppressed by an inline `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.`, which is itself an acknowledgement that the names violate normal TS convention. The reason is purely protoc plumbing: the enum was nested inside a parent proto message to avoid value-name collisions with a sibling enum. That nesting is invisible to the SDK consumer — `AccountGetSortOrder_GetSortOrder` and `GetSortOrder` (line 18) hold the same three values (`UNSPECIFIED`, `ASCENDING`, `DESCENDING`).
- **Category:** Proto-architecture leak
- **Suggested name:** Collapse to a single `SortOrder` enum (shared across get/list and account/workspace variants); rename `PasswordPermission_Level` to `PasswordPermissionLevel`. The whole `<Parent>_<Child>` shape is a proto artifact that should not survive code generation.
- **Rationale:** TypeScript has structural typing and module-scoped names; there is no value collision to resolve. The disable comment is a clue that the generator is fighting the language.

## Medium severity

### 2. `ListServicePrincipalResponse` singular type for a list — `src/v1/model.ts:640`
- **Why weird:** The list-response type is `ListServicePrincipalResponse` (singular `ServicePrincipal`) while the request type is `ListServicePrincipalsRequest` (plural). Compare to `ListAccountServicePrincipalsResponse` (plural) on line 567. The singular form on a list response reads as a proto message-name copy where the inner message is `ServicePrincipal` and the outer wraps it — i.e., proto's habit of letting the inner singular name dominate.
- **Category:** Proto-architecture leak
- **Suggested name:** `ListServicePrincipalsResponse`.
- **Rationale:** Symmetry with sibling types and with the request name; the current singular is a generator artifact.

### 3. `PatchOp` enum and `Patch.op` field tautology — `src/v1/model.ts:49,113,772`
- **Why weird:** `PatchOp` is the enum of patch operation kinds (`ADD`/`REMOVE`/`REPLACE`); `Patch.op` is the field that holds one. The TS field is `op` of type `PatchOp` (or `AccountPatchOp_PatchOp` for the account variant), so the enum has `Op` baked into its own name *and* the field is `op` — `Patch.op: PatchOp` is a type-suffix tautology and `AccountPatchOp_PatchOp` is the worst-case version of finding 1.
- **Category:** Proto-architecture leak
- **Suggested name:** Rename the enum to `PatchOperation`; keep the field `op`.
- **Rationale:** `Op` is a proto shorthand for "operation"; the TS type name should spell it out, and the `_PatchOp` re-suffix should vanish.

## Low severity

### 4. `MeRequest` mid-position colloquial pronoun — `src/v1/model.ts:709`
- **Why weird:** Not a proto leak per se, but the `Me` segment in `MeRequest` is a proto-style shorthand: SCIM defines `GET /Users/me` as the "current user" endpoint, and the proto generator turned `Me` into a type prefix instead of using a verb. `MeRequest` reads as "a Me-shaped request" — the request *to* the `me` endpoint would be `GetCurrentUserRequest` or `GetMeRequest`.
- **Category:** Proto-architecture leak
- **Suggested name:** `GetCurrentUserRequest` (and rename `client.me()` to `getCurrentUser()`); or `GetMeRequest` if the URL slug is preserved.
- **Rationale:** Pronouns are not normally type prefixes in TS; this is the proto RPC name leaking through.
