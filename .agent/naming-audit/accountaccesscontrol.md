# Naming Audit: accountaccesscontrol

**Path:** `packages/accountaccesscontrol/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks IAM rule sets — list assignable roles for a resource and read/replace the grant rules attached to that resource.
**Total weird names flagged:** 18

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 7 |
| Low | 5 |
| Observation | 3 |

## High severity

### 1. `RuleSet` vs `RuleSetUpdateRequest` (duplicate body shape) — `src/v1/model.ts:73,89`
- **Why weird:** `RuleSet` and `RuleSetUpdateRequest` are structurally identical (`name`, `etag`, `grantRules`). They model the same resource — one as a response body, one as the update body — but expose it under two top-level names. `UpdateRuleSetRequest` then *wraps* `RuleSetUpdateRequest` under a `ruleSet` field, so the developer sees three overlapping shapes (`RuleSet`, `RuleSetUpdateRequest`, `UpdateRuleSetRequest`) for one concept. The "Request" suffix on the inner body type does not match how the field is used downstream (the wire payload is keyed `rule_set`, not `rule_set_update_request`).
- **Category:** 12, 11 (duplicate concepts; redundant wrapper)
- **Suggested name:** Collapse to `RuleSet` only. The update endpoint body should be `{ name, ruleSet: RuleSet }`. Remove `RuleSetUpdateRequest` entirely.
- **Rationale:** A single canonical `RuleSet` shape avoids the read/write divergence. The legacy upstream uses `RuleSetResponse` and `RuleSetUpdateRequest` as separate types because Go does not have structural typing; in TypeScript the duplication is wasteful and confusing.

### 2. `UpdateRuleSetRequest.ruleSet` vs `UpdateRuleSetRequest.name` overlap — `src/v1/model.ts:105`
- **Why weird:** `UpdateRuleSetRequest` has both a top-level `name` and `ruleSet.name` (because `RuleSetUpdateRequest` also carries `name`). Two `name` fields on the same request that conceptually identify the same thing is a footgun — which one wins? The wire format hints that the outer one is the URL path identifier and the inner one is the body, but nothing in the TS type encodes that.
- **Category:** 6, 16 (misleading; field contradicting type domain)
- **Suggested name:** Drop the outer `name` (use it from `ruleSet.name`), or rename the outer to `pathName`/`resourceName` to make the routing role explicit.
- **Rationale:** The doc comment on the outer field is just "Name of the rule set." — identical to the inner one. Developers will set one and not the other and silently 4xx.

### 3. `GetRuleSetRequest.etag` semantics — `src/v1/model.ts:25`
- **Why weird:** A `GET` request type carrying an `etag` is unusual — `etag` normally rides in headers (`If-Match`/`If-None-Match`) and the field doc describes optimistic concurrency control on PUT, not GET. The field is also marshalled into the query string here (`params.append('etag', req.etag)` in `client.ts:118`), which is non-standard HTTP and easy to misuse. The name `etag` is also lowercase, contradicting common practice (`eTag`/`ETag`). The same doc text on `RuleSet.etag` then describes its read use ("freshness").
- **Category:** 3, 6 (acronym casing; misleading)
- **Suggested name:** `minimumEtag` or `ifNoneMatch` would explain semantics; keep canonical casing as `etag` only if it matches the wire param exactly. At minimum, the doc should say "passed as `?etag=` query parameter; the server returns a snapshot at least as fresh as this etag" rather than copy-pasting the PUT-side concurrency doc.
- **Rationale:** The current name plus copy-pasted comment makes the field look like an `If-Match` header even though it is a freshness floor on GET.

## Medium severity

### 4. `accountId` doc string `<Databricks> account ID.` — `src/v1/model.ts:7,27,107`
- **Why weird:** The literal `<Databricks>` tag appears in the doc comments, leaking the upstream protobuf templating markup into the public TypeScript surface. It is not Markdown, not a link, and not HTML — just stray angle brackets that will render oddly in IDE hover popups and TypeDoc. The same `accountId` doc text also doesn't disclose that this value is a fallback overridable by `ClientOptions.accountId` (per the client comment on line 41-42 of `client.ts`).
- **Category:** 14, 19 (Go/Java-style template leak; underspecified ID)
- **Suggested name:** Keep `accountId` but rewrite the doc as `"Databricks account ID. If omitted, falls back to the value supplied to ClientOptions."`
- **Rationale:** Document the type — UUID? — and remove the templating artifact.

### 5. `GrantRule.role` is a string, not a `Role` — `src/v1/model.ts:65`
- **Why weird:** The package exports a `Role` type and then immediately ignores it: `GrantRule.role` is `string`. So `Role` is the response shape from `getAssignableRolesForResource`, but `GrantRule.role` is the same identifier path serialized inline. Two representations of the same concept.
- **Category:** 12, 6 (duplicate concepts; misleading)
- **Suggested name:** Type `GrantRule.role` as `Role['name']` or a branded `RoleName` string so the two surfaces stay aligned.
- **Rationale:** Developers will write `grantRule.role = role.name` constantly because the types don't line up.

### 6. `GetAssignableRolesForResourceRequest` / `Response` verbosity — `src/v1/model.ts:5,21`
- **Why weird:** 41 characters each. The "ForResource" suffix is implied — every assignable-roles query is for a resource (the resource is the only meaningful query param). The pair reads like a Java RPC service name (`Get<Subject>For<Object>Request`).
- **Category:** 7, 17 (overly verbose; inconsistent verb)
- **Suggested name:** `ListAssignableRolesRequest` / `ListAssignableRolesResponse`. Reflects that the operation returns a list (it already does), and aligns with REST list conventions.
- **Rationale:** Symmetry with `GetRuleSet`/`UpdateRuleSet` would suggest `Get...`, but the operation returns an array and is closer to a list semantically. Also: the corresponding method is named `getAssignableRolesForResource`, which has the same problem — `listAssignableRoles` would be cleaner.

### 7. `getAssignableRolesForResource` method verb mismatch — `src/v1/client.ts:72`
- **Why weird:** The other two methods (`getRuleSet`, `updateRuleSet`) read as `<verb><Resource>`; this one is `<verb><Plural><For><Other>`. The "ForResource" is redundant — the method already takes a `resource` field. Inconsistent action verb shape across the same service surface (also category 17, since the operation is really a `list`).
- **Category:** 7, 17 (verbose; verb inconsistency)
- **Suggested name:** `listAssignableRoles(req)`.
- **Rationale:** Three-method surface reads better as `getRuleSet`, `updateRuleSet`, `listAssignableRoles`.

### 8. `GrantRule.principals: string[]` — `src/v1/model.ts:63`
- **Why weird:** Generic `string[]` for principals, where each entry is one of three formats (`users/<USERNAME>`, `groups/<GROUP_NAME>`, `servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>`). The shape is documented in the JSDoc but not in the type. Callers have to read the comment to know what to put in.
- **Category:** 15, 19 (generic field losing meaning; underspecified ID)
- **Suggested name:** Type the field with a discriminated union or template literal — e.g. `principals: PrincipalRef[]` where `type PrincipalRef = \`users/${string}\` | \`groups/${string}\` | \`servicePrincipals/${string}\``.
- **Rationale:** TypeScript can encode this; the Go SDK cannot. The 1:1 port leaves type information on the floor.

### 9. `RuleSet.name` and `GrantRule.role` are both `name` paths — `src/v1/model.ts:75,65`
- **Why weird:** "Name" in this API is a hierarchical resource path (`accounts/<ACCOUNT_ID>/ruleSets/default`), not a human-readable label. Same overload for `role` (`roles/account.admin`). Calling these `name`/`role` and typing them as `string` hides that they are resource paths.
- **Category:** 15, 16 (generic field; field contradicting domain)
- **Suggested name:** `ruleSet.resourceName`, `grantRule.roleName` (or branded template-literal types). At minimum the JSDoc should explicitly say "resource path".
- **Rationale:** Half of all integration bugs in this API will be wrong-format names. The type system can help.

### 10. `grantRules` plural inside `RuleSet` vs `GrantRule` (singular type, plural field) — `src/v1/model.ts:86`
- **Why weird:** Not wrong, but worth noting: `RuleSet.grantRules: GrantRule[]` is fine; however the wire form uses `grant_rules` and the doc comment on `RuleSet` does not mention `grantRules` at all. The single-rule case is also confusing: a `RuleSet` is a *set of* `GrantRule`s, but a `GrantRule` itself binds N principals to 1 role — so a "rule" is many-to-one.
- **Category:** 9, 6 (singular/plural; misleading)
- **Suggested name:** Keep `grantRules`, but document explicitly that one rule = N principals × 1 role, and a rule set = N rules. Consider `roleGrants: GrantRule[]` as the field name — closer to industry vocabulary (IAM role grants).
- **Rationale:** Improves discoverability.

## Low severity

### 11. `etag` casing — `src/v1/model.ts:51,85,101`
- **Why weird:** Lowercase `etag` (rather than `eTag`/`ETag`/`etag`). HTTP spec uses `ETag`. JavaScript ecosystem split is roughly even, but most TS SDKs (AWS, Azure, GitHub Octokit) use `etag` lowercase, so this is *probably* fine. Flag it for consistency review only.
- **Category:** 3 (acronym casing)
- **Suggested name:** Confirm the project-wide policy. If the codebase uses `eTag` elsewhere, align here.
- **Rationale:** Defer to global policy.

### 12. `accountId` vs `account_id` snake-case duality — `src/v1/model.ts:7`
- **Why weird:** The TS interface uses `accountId`, but the marshal/unmarshal transforms (line 181) convert to `account_id`. This is intentional and standard for a generated SDK; flagging only because it means the public surface is camelCase but logs and wire bodies are snake_case. Nothing to do.
- **Category:** 14 (Go/Java-style name parallel)
- **Suggested name:** None — this is correct.
- **Rationale:** Documenting the convention.

### 13. `GetRuleSetRequest.name` ambiguity with `RuleSet.name` — `src/v1/model.ts:38`
- **Why weird:** A request type and a response type both have a `name` field with subtly different semantics: the request `name` is the *lookup key* the caller supplies; the response `name` is the *canonical name* the server returns. Same word, two roles. Common pattern, but worth flagging.
- **Category:** 1 (vague)
- **Suggested name:** Acceptable, but consider `GetRuleSetRequest.resourceName` for clarity.
- **Rationale:** Minor readability win.

### 14. `flattenQueryParams` is exported but unused — `src/v1/utils.ts:123`
- **Why weird:** This helper is `export`ed from `utils.ts`. It is not used by `client.ts` and is not re-exported from `index.ts`. Either it is dead code or the export modifier is wrong.
- **Category:** 11 (effectively trivial / dead)
- **Suggested name:** Drop the `export` keyword if internal-only; if it is meant for other generated clients, move it to a shared core package.
- **Rationale:** Hygiene.

### 15. `HttpCallOptions` shadows `CallOptions` — `src/v1/utils.ts:15`
- **Why weird:** The package imports `CallOptions` from `@databricks/sdk-options/call` and defines its own `HttpCallOptions` here. The names suggest the latter is a subtype/extension of the former, but they actually describe different concerns — `CallOptions` is retry/signal/timeout policy; `HttpCallOptions` is request + client + logger bundle. The naming makes them look related.
- **Category:** 1 (vague/generic)
- **Suggested name:** `HttpExecutionContext` or `HttpCallContext`.
- **Rationale:** Disambiguates from the public `CallOptions`.

## Observations

### O1. `Client` is the only exported class — `src/v1/client.ts:39`
- The class is just `Client`. With `import { Client } from '@databricks/sdk-accountaccesscontrol/v1'` the consumer sees a bare `Client` symbol. This is consistent across all generated packages, so it is a project-wide pattern, but it makes IDE autocomplete and stack traces ambiguous when multiple service clients are imported in the same file (everyone is `Client`). Common workarounds (`import { Client as AccountAccessControlClient }`) push the rename burden onto the user. Worth flagging at the project level.

### O2. `executeCall` / `executeHttpCall` naming — `src/v1/utils.ts:26,65`
- Two functions with overlapping names. `executeCall` is the public-CallOptions translator; `executeHttpCall` is the wire-level request executor. The names do not signal that `executeCall` wraps the `Call` callback (which itself wraps `executeHttpCall`). Could be `applyCallOptions` and `sendHttpRequest` respectively. Generated code; flag for upstream.

### O3. `parseResponse` / `marshalRequest` asymmetry — `src/v1/utils.ts:113,119`
- The pair are conceptual inverses (decode wire → typed; encode typed → wire) but use different verbs. `parseResponse`/`serializeRequest` or `unmarshalResponse`/`marshalRequest` would pair better. Generated code.

## Domain glossary
- `accountId` — Databricks account UUID (the top-level tenant container, distinct from a workspace).
- `etag` — HTTP entity tag used here both as a freshness floor on GET and as an optimistic concurrency token on PUT.
- `iam` — Identity and Access Management; the broader Databricks IAM surface this package is a subset of.
- `principal` — User, service principal, or group — the subject of an access rule.
- `Role` — Reference to a grantable account-level role (e.g. `roles/account.admin`).
- `RuleSet` — A versioned collection of `GrantRule`s attached to a resource.
- `GrantRule` — A binding of N principals to 1 role within a `RuleSet`.
- `SP_ID` / `SERVICE_PRINCIPAL_APPLICATION_ID` — Service principal application ID (UUID).
- `resource` — Hierarchical name identifying what the rule set or roles list applies to (account, group, service principal, or tag policy).

## File coverage
- `src/v1/model.ts` (185 lines): read fully.
- `src/v1/client.ts` (171 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (17 lines): read fully.
- `package.json` (41 lines): read for context.
