# Naming Audit: accountaccesscontrolproxy

**Path:** `packages/accountaccesscontrolproxy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level access control via rule sets that bind roles
to principals (users, groups, service principals, tag policies), exposed as a
"proxy" variant whose surface area is indistinguishable from the sibling
`accountaccesscontrol` package.
**Total weird names flagged:** 25

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `accountaccesscontrolproxy` | (package) | package | High | 12 Duplicate concepts | 1:1 surface duplicate of sibling `accountaccesscontrol` — same types, same methods, same URL paths; "proxy" is not encoded anywhere in the API. |
| 2 | package `accountaccesscontrolproxy` | (package) | package | High | 14 Go/Java-style names not idiomatic TS | Long, undelimited compound name (`accountaccesscontrolproxy`) is hard to parse; should be `account-access-control-proxy` or split into a `proxy` subpath. |
| 3 | `GetAssignableRolesForResourceRequest` | model.ts:5 | interface | Medium | 7 Overly verbose | 36-char identifier; "ForResource" is implicit since the only field is `resource`. Drop to `GetAssignableRolesRequest`. |
| 4 | `GetAssignableRolesForResourceResponse` | model.ts:21 | interface | Medium | 7 Overly verbose | 37-char identifier; same issue as #3. Drop to `GetAssignableRolesResponse`. |
| 5 | `Role.name` | model.ts:70 | field | Medium | 1 Vague/generic without domain context, 15 Generic field names losing meaning | `Role.name` carries the whole semantic — the value is the role identifier itself. `roleName` or `id` would communicate the meaning. |
| 6 | `GetRuleSetRequest.name` | model.ts:38 | field | High | 19 Underspecified IDs, 15 Generic field names losing meaning | `name` here is actually a fully-qualified resource path (`accounts/<ACCOUNT_ID>/ruleSets/default`). Should be `ruleSetName` or `resourceName`. |
| 7 | `GetRuleSetRequest.etag` | model.ts:51 | field | Low | 3 Acronym casing inconsistencies | Field is `etag` (all lowercase) but JSDoc uses `eTag`/`Etag`/`ETag` inconsistently within the same comment. `ETag` is the HTTP-standard casing (RFC 7232 §2.3). |
| 8 | `GetRuleSetRequest` shape | model.ts:25 | interface | Medium | 1 Vague/generic without domain context | "RuleSet" tells the reader nothing about the access-control domain; in isolation it could be a firewall rule, a SQL rule, etc. `AccessControlRuleSet` would carry domain. |
| 9 | `GrantRule` | model.ts:54 | interface | Low | 1 Vague/generic without domain context | Same domain ambiguity as `RuleSet`; would be clearer as `AccessControlGrantRule` or `RoleGrantRule`. |
| 10 | `GrantRule.principals` | model.ts:63 | field | Medium | 1 Vague/generic without domain context, 15 Generic field names losing meaning | Field is a `string[]`, but each value is a path like `users/<USERNAME>` / `groups/<GROUP_NAME>` / `servicePrincipals/<SP_APP_ID>`. The string-array typing erases the discriminated structure; `principalNames` or `principalRefs` would at least flag that these are references, not free-form strings. |
| 11 | `GrantRule.role` | model.ts:65 | field | Medium | 17 Inconsistent action verbs, 15 Generic field names losing meaning | Singular `role: string` here, but the `Role` interface (model.ts:68) uses `name`. A `GrantRule.role` should be either a `Role` or a clearly-typed `roleName`. |
| 12 | `RuleSet` | model.ts:73 | interface | High | 12 Duplicate concepts | Has identical shape to `RuleSetUpdateRequest` (model.ts:89): `name`, `etag`, `grantRules`. One of them is redundant. |
| 13 | `RuleSet.name` | model.ts:75 | field | High | 19 Underspecified IDs, 15 Generic field names losing meaning | Same problem as #6 — this is a fully-qualified path, not a human-readable name. Rename to `ruleSetName` or `resourceName`. |
| 14 | `RuleSet.etag` | model.ts:85 | field | Low | 3 Acronym casing inconsistencies | Same `etag` vs `ETag` (RFC 7232) issue as #7. |
| 15 | `RuleSet.grantRules` | model.ts:86 | field | Low | 9 Singular/plural mismatches | Plural is correct, but the wire form is `grant_rules` (model.ts:144) — underscore vs camelCase split is a real coupling point worth verifying is centralized. |
| 16 | `RuleSetUpdateRequest` | model.ts:89 | interface | High | 12 Duplicate concepts, 13 Verb-tense inconsistency | Same fields as `RuleSet`. The "UpdateRequest" suffix collides naming with the outer `UpdateRuleSetRequest` (model.ts:105), giving two overlapping `*UpdateRequest`/`Update*Request` shapes for the same operation. |
| 17 | `RuleSetUpdateRequest` vs `UpdateRuleSetRequest` | model.ts:89, 105 | interface pair | High | 13 Verb-tense inconsistency, 12 Duplicate concepts | Two side-by-side request types whose names invert noun/verb order (`RuleSetUpdateRequest` vs `UpdateRuleSetRequest`). Inevitable confusion; one is the outer envelope (`{accountId, name, ruleSet}`), the other is the inner payload. Inner should be named `RuleSetPayload`, `RuleSetSpec`, or merged with `RuleSet`. |
| 18 | `UpdateRuleSetRequest.name` | model.ts:109 | field | High | 12 Duplicate concepts | `name` appears at the outer level AND inside `ruleSet.name`. Which one wins? The Go-style nesting is preserved verbatim, but a TS consumer has to guess. |
| 19 | `UpdateRuleSetRequest.ruleSet` | model.ts:110 | field | Low | 7 Overly verbose | Outer envelope wraps a `ruleSet: RuleSetUpdateRequest`. Could be flattened. |
| 20 | `Client` | client.ts:39 | class | Medium | 1 Vague/generic without domain context | Top-level `Client` with no qualifier; once imported into a consumer that uses multiple Databricks clients, every one is just `Client`. Should be `AccessControlProxyClient` or aliased on export. |
| 21 | `Client.getAssignableRolesForResource` | client.ts:72 | method | Medium | 7 Overly verbose | "ForResource" is implicit (only one parameter is the resource); `getAssignableRoles(req)` reads cleanly. |
| 22 | `HttpCallOptions` | utils.ts:15 | interface | Low | 1 Vague/generic without domain context | Bundle of `{request, httpClient, logger}` named generically. Inside a single file this is fine; if it ever leaks out, `ExecuteHttpCallParams` would self-document. |
| 23 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs | Two `execute*` functions in the same file with overlapping vocabulary. `executeCall` (orchestrates retries/timeouts) and `executeHttpCall` (does one HTTP roundtrip) are two different concepts — name them so. e.g. `runWithOptions` / `sendRequest`. |
| 24 | `flattenQueryParams` (dead code) | utils.ts:123 | function | Low | 21 Dead code | Exported from `utils.ts` but never imported in `client.ts`. Either dead code or for future generated calls. |
| 25 | `PACKAGE_SEGMENT` | client.ts:34 | const | Low | 1 Vague/generic without domain context | Could be `USER_AGENT_PACKAGE_SEGMENT` to clarify what "segment" means at the call site. |

---

## High severity (must fix)

### H1. Whole-package duplication: `accountaccesscontrolproxy` vs `accountaccesscontrol`

The two packages have:
- The **same** seven exported types: `GetAssignableRolesForResourceRequest`,
  `GetAssignableRolesForResourceResponse`, `GetRuleSetRequest`, `GrantRule`,
  `Role`, `RuleSet`, `RuleSetUpdateRequest`, `UpdateRuleSetRequest`.
- The **same** three client methods: `getAssignableRolesForResource`,
  `getRuleSet`, `updateRuleSet`.
- The **same** API path: `/api/2.0/preview/accounts/<id>/access-control/...`.

The user instruction calls out: *"Pay extra attention: the word 'proxy' in the
package name suggests this is a proxy variant. Flag if 'Proxy' appears in every
type name redundantly."*

The opposite is true — `Proxy` appears **nowhere** in the model, client, or
URL. The only differentiation is the package name. This is a category 12
(duplicate concepts) failure at the package level. Either:
- Merge the two packages,
- Or surface the proxy semantics in the types (`ProxyClient`, different URL,
  different fields).

Until that is done, every consumer has to guess which package to import; once
imported, the symbols collide on re-export.

### H2. Stuttering update-request pair (`RuleSetUpdateRequest` vs `UpdateRuleSetRequest`)

```ts
export interface RuleSetUpdateRequest { name?, etag?, grantRules? }
export interface UpdateRuleSetRequest { accountId?, name?, ruleSet?: RuleSetUpdateRequest }
```

Two types whose names differ only in word order (one is a NounVerb suffix, the
other is a VerbNoun prefix) and which both carry a `name` field. Reviewers and
consumers will mis-pick them. Rename the inner type to `RuleSetSpec`,
`RuleSetPayload`, or eliminate it by reusing `RuleSet`.

### H3. `name` overload at multiple levels of `UpdateRuleSetRequest`

`UpdateRuleSetRequest.name` and `UpdateRuleSetRequest.ruleSet.name` both exist
and both are strings. No JSDoc clarifies which one is canonical. The Go SDK
likely tolerates this because callers fill the entire envelope. In TS, the
guidance should be explicit: one field, or both fields with clear precedence.

### H4. `name` is an opaque resource path, not a human-readable name

Both `GetRuleSetRequest.name` and `RuleSet.name` carry strings like
`accounts/<ACCOUNT_ID>/ruleSets/default`. Calling that a "name" is misleading
— it is a fully-qualified resource path. Rename to `ruleSetName`,
`resourceName`, or `resourcePath`, or introduce a branded `RuleSetName` type.

---

## Medium severity (worth pushing back on)

### M1. Verbose request/response names

`GetAssignableRolesForResourceRequest`/`Response` are 36/37 characters. Because
the request only has the `resource` field, `ForResource` is implicit. Suggest
`GetAssignableRolesRequest`/`Response`.

### M2. `Role.name` is a vague field name

```ts
export interface Role { name?: string | undefined; }
```

`name` is a vague field name. In context the value is the role's identifier
itself; `roleName` or `id` would be clearer.

### M3. `GrantRule.role: string` vs `Role.name: string`

`GrantRule.role` is a string that semantically references a `Role`. Either
type it as `Role` (or `Role['name']`), rename to `roleName` to match the
referent, or unify on one shape.

### M4. Generic-domain types: `RuleSet`, `GrantRule`

In isolation these names give no hint they belong to access control. A
`RuleSet` could be a firewall, a SQL rewrite, a tag-policy rule set, etc. The
SDK has only the package boundary to disambiguate. Consider prefixing types in
the same file (`AccessControlRuleSet`, `AccessControlGrantRule`) when the
package itself is also generic.

### M5. `executeCall` vs `executeHttpCall`

Both live in `utils.ts`. They do different things:
- `executeCall` translates `CallOptions` to `Options` and dispatches retries.
- `executeHttpCall` does a single HTTP roundtrip and converts errors.

Two near-identical names within one file is a navigation hazard. Suggested:
`runWithOptions` / `sendRequest`.

### M6. `Client` is unqualified

```ts
export class Client { ... }
```

A consumer that imports `{Client}` from multiple Databricks packages has to
alias every import. Either:
- Export as `AccessControlProxyClient`, or
- Rely on namespace imports
  (`import * as accountAccessControlProxy from ...`).

---

## Low severity (nits)

### L1. Acronym casing for `etag`

The wire and field name is `etag` (lowercase). The JSDoc in the same comment
block uses `eTag`, `Etag`, and `ETag` interchangeably. RFC 7232 §2.3 defines
the header as `ETag`. Pick one.

### L2. `flattenQueryParams` is exported but never imported

`utils.ts:123` exports `flattenQueryParams`. `client.ts` never imports it (it
builds query strings inline via `URLSearchParams`). Either:
- Remove it (dead code), or
- Use it (current inline code reproduces a subset of its logic).

### L3. `PACKAGE_SEGMENT`

Used only for the User-Agent header. Renaming to
`USER_AGENT_PACKAGE_SEGMENT` makes the call site self-explanatory:
`createDefault().with(USER_AGENT_PACKAGE_SEGMENT)`.

### L4. `HttpCallOptions`

Internal `interface` with `{request, httpClient, logger}`. Could be inlined
into `executeHttpCall` as positional parameters, or renamed
`ExecuteHttpCallParams` to disambiguate from `CallOptions` (which is a public
type).

### L5. `req` parameter naming in client methods

```ts
async getAssignableRolesForResource(req: GetAssignableRolesForResourceRequest, ...)
```

`req` is fine, but it leans Go-idiomatic. TS/JS code more commonly uses
`request` or `params`. Minor stylistic point.

---

## Observations (not flags)

- **Generator marker:** Every file is prefixed with `// Code generated from
  API definition by Databricks SDK Generator. DO NOT EDIT.` so all naming
  issues here must be fixed upstream in the generator/spec.
- **No enums.** The package has zero enum types, so categories 2 (redundant
  enum prefixes) and 18 (long enum values) do not apply.
- **No underscores in identifiers.** TS-facing identifiers are camelCase; wire
  identifiers use `snake_case` and are translated in the zod `transform`
  callbacks (model.ts:144-149, 168-172, 180-184). Clean here.
- **No `Url`/`URL`, `Id`/`ID`, `Sql`, `Json`, `Oauth` casing collisions.** The
  only acronym in the public surface is `accountId` (camelCase) and `etag`
  (all-lower) — flagged separately under L1.
- **No reserved-word collisions** (no `delete`, `class`, `new`, etc. as field
  names).
- **Optionality model:** every field is `T | undefined`. This matches the
  rest of the SDK and the `exactOptionalPropertyTypes` TS setting. No issue.
- **Versioning:** only `v1` exists; nothing to compare across versions.
- **Tests:** there is no `tests/` directory for this package.
- **`index.ts` re-export style:** All seven types are re-exported as
  `export type {...}`, which is correct for `verbatimModuleSyntax`. No
  issue.
- **`Client` constructor throws plain `Error`** for missing `host` (client.ts:53).
  Consistent with sibling packages, but not a naming concern.

---

## Domain glossary (as inferred from this code)

| Term | Meaning in this package |
|------|-------------------------|
| **Account ID** | The numeric Databricks account identifier (path parameter `<ACCOUNT_ID>`). |
| **Resource** | A fully-qualified identifier for the thing being secured: account, group, service principal, or tag policy. Encoded as a slash-delimited path (e.g. `accounts/<ACCOUNT_ID>/groups/<GROUP_ID>`). |
| **Rule set** | A collection of grant rules attached to a resource. Currently a single `default` rule set per resource. |
| **Grant rule** | A `(role, principals[])` pair: which role is granted to which principals on the rule set's resource. |
| **Role** | An identifier (string-shaped) for a permission bundle; `Role.name` carries the identifier itself. |
| **Principal** | A user (`users/<USERNAME>`), group (`groups/<GROUP_NAME>`), or service principal (`servicePrincipals/<SP_APP_ID>`). |
| **Etag** | Opaque versioning token for optimistic concurrency on rule set updates. |
| **Assignable role** | A role that can appear in a grant rule for a given resource. |
| **Proxy** | Not visible anywhere in the API surface — the package name is the only signal. See H1. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 185 | 7 interfaces, 7 zod consts | yes |
| `src/v1/client.ts` | 170 | 1 class, 3 public methods | yes |
| `src/v1/utils.ts` | 151 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 16 | 1 class re-export, 7 type re-exports | yes |

Every type, field, enum value (none), and method enumerated above is
accounted for.
