# Naming Audit: scim

**Path:** `packages/scim/src/v1/`
**Versions audited:** v1
**Inferred domain:** SCIM (System for Cross-domain Identity Management, RFC 7644) — workspace and account user, service principal, and group provisioning, plus password permissions. `SCIM` itself is an industry-standard protocol acronym and is treated as a domain word.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 4 |
| Low | 2 |
| Observation | 2 |

## High severity

### 1. Proto-style nested enum names with `_` separators — `src/v1/model.ts:58,65,73,81,87,95`
- **Why weird:** Six exported enums use the proto-nested form `<Outer>_<Inner>`: `AccountGetSortOrder_GetSortOrder`, `AccountListSort_Order`, `AccountPatchOp_PatchOp`, `AccountPatchSchema_PatchSchema`, `ListSort_Order`, and `PasswordPermission_Level`. Each is suppressed by an inline `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.`, which is itself an acknowledgement that the names violate normal TS convention. The reason is purely protoc plumbing: the enum was nested inside a parent proto message to avoid value-name collisions with a sibling enum. That nesting is invisible to the SDK consumer — `AccountGetSortOrder_GetSortOrder` and `GetSortOrder` (line 17) hold the same three values (`UNSPECIFIED`, `ASCENDING`, `DESCENDING`).
- **Category:** Proto-architecture leak
- **Suggested name:** Collapse to a single `SortOrder` enum (shared across get/list and account/workspace variants); rename `PasswordPermission_Level` to `PasswordPermissionLevel`. The whole `<Parent>_<Child>` shape is a proto artifact that should not survive code generation.
- **Rationale:** TypeScript has structural typing and module-scoped names; there is no value collision to resolve. The disable comment is a clue that the generator is fighting the language.

### 2. Empty placeholder interfaces for proto-nesting parents — `src/v1/model.ts:109,132,151,154,404,412,619`
- **Why weird:** Seven `export interface`s are wholly empty (`{}`), each suppressed by `// eslint-disable-next-line @typescript-eslint/no-empty-object-type`: `AccountGetSortOrder`, `AccountListSort`, `AccountPatchOp`, `AccountPatchSchema`, `GetPasswordPermissionLevelsRequest`, `GetPasswordPermissionsRequest`, and `ListSort`. The first four and `ListSort` exist only because the enum was nested inside a proto message — the message itself has no fields, so the TypeScript type carries no information. The two `Get…Request` empties are RPC-shape placeholders for an HTTP GET that takes no body and no path params; they survive as exports despite carrying zero schema. A leading JSDoc on `AccountListSort` and `ListSort` explicitly says "ListSortOrder and GetSortOrder share enum values, which is not supported. We use nesting as a workaround." — i.e. the comment names the proto restriction it works around.
- **Category:** Proto-architecture leak
- **Suggested name:** Delete all seven exports. The empty-body `Get…PermissionLevelsRequest` / `Get…PermissionsRequest` methods should take no argument (or take `CallOptions` only). The five enum-parent interfaces should disappear once the enums are flattened (see finding 1).
- **Rationale:** Public empty interfaces are pure proto/RPC plumbing; they expose generator structure as API surface and force consumers to either pass `{}` or define a variable they cannot meaningfully populate.

### 3. `Account*` mid-position duplicate type families — `src/v1/model.ts:100,111,134,141,156,161,177,205,220,236,317,325,333,359,367,375,460,479,491,510,522,541,722,732,742,800,815,831`
- **Why weird:** The package exports two parallel families of identical-shape types distinguished only by an `Account` prefix: `ComplexValue` vs `AccountComplexValue`, `Name` vs `AccountName`, `ResourceMeta` vs `AccountResourceMeta`, `Patch` vs `AccountPatch`, `Group` vs `AccountGroup`, `User` vs `AccountUser`, `ServicePrincipal` vs `AccountServicePrincipal`, and the corresponding `Create/Update/Patch/Delete/Get/List…Request`/`…Response` quartets. The shapes are almost identical (compare `User` lines 911-932 to `AccountUser` lines 177-195 — same fields, plus `accountId`); the divergence is one extra optional `accountId` and the absence of a few workspace-only entitlements. The `Account` prefix is mid-position in the larger compound names (`CreateAccountUserRequest`, `PatchAccountGroupRequest`, `ListAccountServicePrincipalsResponse`) — a classic proto package-namespace leak where the same message was redefined under `databricks.scim.account.v1` and `databricks.scim.workspace.v1`.
- **Category:** Proto-architecture leak
- **Suggested name:** Either (a) unify into one type with an optional `accountId` field and one method surface that switches on whether `accountId` is present, or (b) split into two sub-namespaces (`scim.account.User`, `scim.workspace.User`) so the prefix is not embedded in the name. The current shape doubles the type-export count without doubling the information.
- **Rationale:** This is the package's single biggest source of surface bloat — ~30 duplicated types — and reads as "the proto compiler emitted two packages and we re-exported both".

### 4. `Schema` field as proto-discriminator array — `src/v1/model.ts:271,290,311,456,576,589,645,757,773` and enums on lines 23,28,46,51
- **Why weird:** Every `Group`, `User`, `ServicePrincipal`, list-response, and patch-request type carries a `schemas?: <…>Schema[]` field whose contents are URN strings like `URN_IETF_PARAMS_SCIM_SCHEMAS_CORE_2_0_GROUP`. The schemas are part of the SCIM spec on the wire, but their *enum* representation in TS is awkward: the values are SHOUTY_SNAKE constants embedding the entire URN, and there are separate `GroupSchema`, `ListResponseSchema`, `PatchSchema`, `ServicePrincipalSchema`, `UserSchema` enums each with one or two values plus an `_UNSPECIFIED` zero. This is the proto convention of "every enum needs an UNSPECIFIED variant for backwards-compat" applied to a constant set that is fully determined by RFC 7644 and never grows. Note: `SCIM` itself is a domain word, but the per-type `<Type>Schema` enum-wrapper is a generator artifact.
- **Category:** Proto-architecture leak
- **Suggested name:** Drop the per-type `Schema` enums; type the field as a const string union (`type GroupSchema = "urn:ietf:params:scim:schemas:core:2.0:Group"`) or hide it entirely behind the marshaller (the client knows which URNs to send). The `_UNSPECIFIED` zero values should disappear.
- **Rationale:** The enum wraps a single literal URN per type — a `const` is simpler and matches what the spec actually says. The `_UNSPECIFIED` zero is a proto3 default-value artifact with no SCIM meaning.

### 5. `Resources` PascalCase wire field surfaces in unmarshaller — `src/v1/model.ts:1096,1111,1128,1143,1160,1178`
- **Why weird:** Every list-response unmarshaller declares the wire field as `Resources` (capital R), e.g. `Resources: z.array(...)`, then transforms to `resources` (camelCase) in the output. The capital-`R` form is the proto-generated JSON name for a field whose proto name was `resources` and whose `json_name` annotation was set to `Resources`. It then leaks into the Zod schema as the literal wire key. While not a public-facing type name, it documents a proto-convention divergence (proto `lower_snake` → JSON `Resources`) baked into the generator that has no SCIM-spec justification.
- **Category:** Proto-architecture leak
- **Suggested name:** The wire field name is fixed by SCIM (which uses `Resources` with capital R, per RFC 7644 §3.4.2); this one is technically correct. Flag for verification rather than rename: ensure the JSDoc on `*Response.resources` says "SCIM lists this as `Resources` on the wire (RFC 7644 §3.4.2)" so the casing is not assumed to be a bug.
- **Rationale:** Distinguishes spec-mandated quirk from proto artifact; the visual similarity to a generator leak warrants a comment.

## Medium severity

### 6. `Operations` PascalCase wire key in marshal output — `src/v1/model.ts:1576,1591,1604,1617,1629,1641`
- **Why weird:** Every patch-request marshaller transforms `operations` (camelCase TS) to `Operations` (PascalCase wire). Same shape as finding 5, but on the outbound side. Per RFC 7644 §3.5.2, the SCIM patch wire field is `Operations` (capital O), so this is spec-mandated. Flag for the same reason: it looks like a proto-RPC leak but is actually SCIM.
- **Category:** Proto-architecture leak
- **Suggested name:** No rename. Add a comment in the marshallers explaining the capital `Operations` is from RFC 7644 §3.5.2.
- **Rationale:** Audit-trail clarity. Without the comment, a reader cleaning up "obvious" proto leftovers might lowercase this and break the wire.

### 7. `ListServicePrincipalResponse` singular type for a list — `src/v1/model.ts:583`
- **Why weird:** The list-response type is `ListServicePrincipalResponse` (singular `ServicePrincipal`) while the request type is `ListServicePrincipalsRequest` (plural). Compare to `ListAccountServicePrincipalsResponse` (plural) on line 510. The singular form on a list response reads as a proto message-name copy where the inner message is `ServicePrincipal` and the outer wraps it — i.e., proto's habit of letting the inner singular name dominate.
- **Category:** Proto-architecture leak
- **Suggested name:** `ListServicePrincipalsResponse`.
- **Rationale:** Symmetry with sibling types and with the request name; the current singular is a generator artifact.

### 8. `PatchOp` enum and `Patch.op` field tautology — `src/v1/model.ts:34,143,715`
- **Why weird:** `PatchOp` is the enum of patch operation kinds (`ADD`/`REMOVE`/`REPLACE`); `Patch.op` is the field that holds one. The TS field is `op` of type `PatchOp` (or `AccountPatchOp_PatchOp` for the account variant), so the enum has `Op` baked into its own name *and* the field is `op` — `Patch.op: PatchOp` is a type-suffix tautology and `AccountPatchOp_PatchOp` is the worst-case version of finding 1.
- **Category:** Proto-architecture leak
- **Suggested name:** Rename the enum to `PatchOperation` (or just inline as a string literal union `"ADD" | "REMOVE" | "REPLACE"`); keep the field `op`.
- **Rationale:** `Op` is a proto shorthand for "operation"; the TS type name should spell it out, and the `_PatchOp` re-suffix should vanish.

### 9. Sentinel `*_UNSPECIFIED` enum values — `src/v1/model.ts:18,24,29,35,42,47,52,59,66,74,82,88,96`
- **Why weird:** Every enum carries an `_UNSPECIFIED` zero value: `GET_SORT_ORDER_UNSPECIFIED`, `GROUP_SCHEMA_UNSPECIFIED`, `LIST_RESPONSE_SCHEMA_UNSPECIFIED`, `PATCH_OP_UNSPECIFIED`, `PATCH_SCHEMA_UNSPECIFIED`, `SERVICE_PRINCIPAL_SCHEMA_UNSPECIFIED`, `USER_SCHEMA_UNSPECIFIED`, `ORDER_UNSPECIFIED`, `LEVEL_UNSPECIFIED`, and copies under each `Account*` variant. The `*_UNSPECIFIED` zero is a proto3 default-value convention with no semantic meaning in TS, where an enum field can simply be optional.
- **Category:** Proto-architecture leak
- **Suggested name:** Drop the `_UNSPECIFIED` variants. Express absence as `undefined` (the fields are already optional).
- **Rationale:** TS has `undefined`; proto3 does not. The sentinel is dead weight.

## Low severity

### 10. `MeRequest` mid-position colloquial pronoun — `src/v1/model.ts:652`
- **Why weird:** Not a proto leak per se, but the `Me` segment in `MeRequest` is a proto-style shorthand: SCIM defines `GET /Users/me` as the "current user" endpoint, and the proto generator turned `Me` into a type prefix instead of using a verb. `MeRequest` reads as "a Me-shaped request" — the request *to* the `me` endpoint would be `GetCurrentUserRequest` or `GetMeRequest`.
- **Category:** Proto-architecture leak
- **Suggested name:** `GetCurrentUserRequest` (and rename `client.me()` to `getCurrentUser()`); or `GetMeRequest` if the URL slug is preserved.
- **Rationale:** Pronouns are not normally type prefixes in TS; this is the proto RPC name leaking through.

### 11. `unmarshal*Schema` / `marshal*Schema` exported helpers — `src/v1/model.ts:934-1791`
- **Why weird:** Each (un)marshaller is exported as `unmarshal<Type>Schema` / `marshal<Type>Schema`. The `Schema` suffix here refers to the *Zod schema* used to parse, but in a SCIM package the word `Schema` already means a SCIM resource schema URN (see findings 4 and the `GroupSchema`/`UserSchema` enums). Two unrelated meanings of `Schema` in the same module are easy to confuse on read.
- **Category:** Proto-architecture leak
- **Suggested name:** Either drop the `Schema` suffix (e.g. `unmarshalUser`/`marshalUser`) or rename to `unmarshalUserCodec`/`marshalUserCodec`. The conflict is a generator-template choice that ignored the domain vocabulary.
- **Rationale:** Disambiguate the two `Schema` namespaces in one file.

## Observations

### O1. `eslint-disable` density as a signal — `src/v1/model.ts:57,64,72,80,86,94,108,131,150,153,403,411,618`
- The file carries 13 inline `eslint-disable-next-line` comments, all for `@typescript-eslint/naming-convention` (proto-nested enum names) or `@typescript-eslint/no-empty-object-type` (empty proto messages). Every disable corresponds to a proto-architecture artifact — taken together, they form a precise list of the proto-shaped pieces the linter wanted to flag and the generator decided to suppress. Removing the underlying patterns (findings 1, 2, 8) would also remove every disable in this file.

### O2. Workspace and account API split at type level, not namespace — package vs siblings
- Sibling packages `accountusers`, `accountgroups`, etc. exist for account-scope IAM at higher levels of the SDK; this package interleaves both scopes (`createUser` vs `createAccountUser`, `listGroups` vs `listAccountGroups`) on a single `Client`. The naming convention is mid-position `Account` (finding 3), which is a proto-package-name leak. A consumer who only wants workspace SCIM still sees every account method in IDE autocomplete.

## Domain glossary
- `SCIM` — System for Cross-domain Identity Management; RFC 7643/7644. Industry-standard, treated as domain word.
- `ServicePrincipal` — Machine identity (UUID + display name) that can authenticate independently of any user.
- `entitlements` — Account/workspace-level capability flags assigned to a user, group, or SP (e.g. `allow-cluster-create`).
- `Patch` — JSON Patch-style partial update body per RFC 7644 §3.5.2.
- `Resources` — Wire-level list payload key in SCIM list responses (capital R per spec).
- `Operations` — Wire-level list of patch ops in SCIM patch requests (capital O per spec).
- `Schema` (URN) — SCIM resource type discriminator, e.g. `urn:ietf:params:scim:schemas:core:2.0:User`.
- `me` — SCIM convention for "the authenticated identity"; `GET /Users/me` returns the calling user.

## File coverage
- `src/v1/model.ts` (1791 lines): read fully.
- `src/v1/client.ts` (1417 lines): read for method-name patterns and class shape.
- `src/v1/transport.ts` (75 lines): read fully.
- `src/v1/utils.ts` (150 lines): read for helper-name patterns.
- `src/v1/index.ts` (93 lines): read fully.
