# Naming Audit: tokenmanagement

**Path:** `packages/tokenmanagement/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-admin API for managing personal access tokens (PATs) belonging to any user in the workspace — list/get/update/delete arbitrary user tokens, plus create on-behalf-of-service-principal tokens. Distinct from the per-user `tokens` API which only manages the calling user's own tokens.
**Total weird names flagged:** 36

## Summary
| Severity | Count |
| --- | --- |
| High | 12 |
| Medium | 13 |
| Low | 8 |
| Observation | 3 |

## High severity

### 1. Package name `tokenmanagement` duplicates `tokens` — overlap with sibling package
- **Why weird:** Two packages, `tokens` and `tokenmanagement`, both manage Databricks personal access tokens (PATs). They share the same `AutoscopeState` enum (copy-pasted byte-for-byte, model.ts:13-21 in both), both expose `ListTokens`, `RevokeToken`, `UpdateToken`, `RevokeToken_Response`, and `ListTokens_Response` request/response types, and both publish a `Client` class with `listTokens`/`updateToken` methods. The only structural differences are (a) the admin variant adds `getToken`, `createOnBehalfOfToken`, and admin-only fields on its token info, (b) the per-user variant has `createToken` (no on-behalf-of), and (c) the entity type is named `AdminTokenInfo` here vs. `PublicTokenInfo` in `tokens`. URL paths also differ: `/api/2.0/token-management/...` vs `/api/2.0/token/...`. From a TS user's perspective the namespaces collide: `import {Client, ListTokens} from '@databricks/sdk-tokenmanagement/v1'` and `import {Client, ListTokens} from '@databricks/sdk-tokens/v1'` clash on every public name.
- **Category:** 12 (duplicate concepts across `tokens` vs `tokenmanagement` packages).
- **Suggested name:** Keep the directory split (the API is split upstream) but in the public exports prefix admin types: `AdminListTokensRequest`, `AdminRevokeTokenRequest`, etc., or alternatively rename the package to `tokenadmin` so the call-site distinction is unmistakable (`@databricks/sdk-tokenadmin`).
- **Rationale:** Today consumers who import both packages cannot do so by named import without aliasing every type. The shared enum (`AutoscopeState`) is also duplicated; one of the two packages should re-export the other's enum, or the enum should live in a shared core/identity module.

### 2. `AutoscopeState` enum values — redundant prefix on every member
- **Why weird:** Every member re-states the enum name: `AUTOSCOPE_STATE_UNSPECIFIED`, `AUTOSCOPE_STATE_DISABLED`, `AUTOSCOPE_STATE_RUNNING`, `AUTOSCOPE_STATE_COMPLETED`, `AUTOSCOPE_STATE_BACKFILLED`, `AUTOSCOPE_STATE_USER_SELECTED`, `AUTOSCOPE_STATE_API_NOT_COVERED` — `src/v1/model.ts:13-21`. Plus `UNSPECIFIED` is a proto-buf sentinel that idiomatic TS expresses with `undefined`. Also: shouty SCREAMING_SNAKE_CASE with underscores violates TS identifier conventions (rule 4).
- **Category:** 2 (redundant enum prefix), 4 (underscores in TS identifiers), 14 (proto/Go-style enum values not idiomatic in TS).
- **Suggested name:** `AutoscopeState.Unspecified | Disabled | Running | Completed | Backfilled | UserSelected | ApiNotCovered` — or drop `Unspecified` and rely on `autoscopeState?: AutoscopeState | undefined`.
- **Rationale:** TS enum members are already namespaced by the enum (`AutoscopeState.Disabled`). The `AUTOSCOPE_STATE_` prefix is pure protobuf noise. This enum is also a copy of the identical enum in the `tokens` package; the prefix problem is doubled.

### 3. `AdminTokenInfo` — `Info` is a vague suffix, package-specific prefix is misleading
- **Why weird:** `AdminTokenInfo` is the central domain entity but `Info` is a generic suffix that adds nothing — every type is "info about something". `Admin` is a prefix that comes from this being the admin-API variant but is meaningless once you've imported from `@databricks/sdk-tokenmanagement`. Compare to the sibling `tokens` package which calls its entity `PublicTokenInfo` (also `Info`-suffixed) — neither name reads well.
- **Category:** 1 (vague suffix `Info`), 8 (redundant type suffix), 15 (generic suffix that loses meaning).
- **Suggested name:** `Token` (or `ManagedToken` if `Token` would clash with a class on the consumer side; given this is exported from `@databricks/sdk-tokenmanagement/v1`, `Token` is fine — see also finding #1 about cross-package name collisions).
- **Rationale:** `Token` is the noun the user thinks about. `Info` is a Go-SDK tic; TS does not need it.

### 4. `CreateOnBehalfOfToken` — verb-phrase type name reads as a function
- **Why weird:** Request DTO named with a verb phrase looks like a method or command, not data. Same broken pattern as `GetToken`, `ListTokens`, `RevokeToken`, `UpdateToken`. With `index.ts` re-exporting these as `type {…}`, `import type {CreateOnBehalfOfToken}` looks at the call site like importing a function.
- **Category:** 6 (misleading — verb-phrase noun), 14 (Go-style request type names).
- **Suggested name:** `CreateOnBehalfOfTokenRequest` (and cascading `GetTokenRequest`, `ListTokensRequest`, `RevokeTokenRequest`, `UpdateTokenRequest`).
- **Rationale:** TypeScript convention names request DTOs with a `Request` suffix; bare verb-phrase nouns read as actions.

### 5. `CreateOnBehalfOfToken_Response`, `GetToken_Response`, `ListTokens_Response`, `RevokeToken_Response` — underscore identifiers
- **Why weird:** Underscores inside TS type names are unidiomatic; every declaration requires `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` (model.ts:62, 82, 103, 115). The `eslint-disable` is itself a tell that the name fights the language.
- **Category:** 4 (underscores in TS identifiers).
- **Suggested name:** `CreateOnBehalfOfTokenResponse`, `GetTokenResponse`, `ListTokensResponse`, `RevokeTokenResponse`.
- **Rationale:** TS `strict-type-checked` rejects `Foo_Bar`. The proto-nested-message convention is a leaky abstraction.

### 6. Client method `deleteToken` wraps request type `RevokeToken` — verb-tense inconsistency
- **Why weird:** `client.deleteToken(req: RevokeToken)` at client.ts:103-104. The method says "delete" but the request type, request handler, and HTTP behavior is "revoke". The HTTP method is `DELETE` and the URL is `/tokens/{id}`, so REST-style "delete" is reasonable for the method, but then the request type should match — or the method should be `revokeToken` to match the type. The sibling `tokens` package uses `revokeToken` consistently (tokens client.ts:131 + request type `RevokeToken`).
- **Category:** 13 (verb-tense inconsistency between method and request type), 17 (inconsistent action verbs across the two packages: `tokenmanagement.deleteToken` vs `tokens.revokeToken` for the same kind of operation).
- **Suggested name:** Either rename method to `revokeToken` (matches type and matches sibling package) or rename type to `DeleteTokenRequest` (matches HTTP verb). Recommend the former so both packages share a verb.
- **Rationale:** "Revoke" carries a security/lifecycle meaning that "delete" loses; tokens aren't deleted from history, they're invalidated.

### 7. `UpdateToken.token: AdminTokenInfo` field — type-suffix tautology and id placement diverges from sibling
- **Why weird:** `UpdateToken` (the request type) has a single semantic field `token` of type `AdminTokenInfo` plus an `updateMask`. The field name `token` paired with type `AdminTokenInfo` works only because `AdminTokenInfo` has the `Info` suffix; rename to `Token` (per finding #3) and `token: Token` becomes type-suffix tautology. The client signature `updateToken(req: UpdateToken)` and then `req.token?.tokenId ?? ''` (client.ts:191) means a caller must construct `{token: {tokenId: ...}, updateMask: ...}`. The sibling `tokens` package hoists `tokenId` to the top level (tokens model.ts:87-93), so consumers of both packages see different ergonomics for the same operation.
- **Category:** 20 (type-suffix tautology if `Info` is removed).
- **Suggested name:** Reuse the cleaner sibling-package pattern in `tokens`: `UpdateToken { tokenId; token; updateMask }` where `tokenId` is hoisted (tokens model.ts:87-93).
- **Rationale:** The admin variant forces the id into the nested body while the sibling `tokens` package hoists it. This is a real ergonomic delta worth flagging upstream; consumers of both packages will trip on it.

### 8. `client.updateToken` returns `AdminTokenInfo`, sibling returns `UpdateTokenResponse` — inconsistent response handling
- **Why weird:** `tokenmanagement.Client.updateToken` returns `Promise<AdminTokenInfo>` (client.ts:190) — the bare entity. The sibling `tokens.Client.updateToken` returns `Promise<UpdateTokenResponse>`. Worse: the `tokenmanagement` version doesn't even have a response type declared in `model.ts`; the client just unmarshals into the entity using `unmarshalAdminTokenInfoSchema`. So in one package `updateToken` returns the updated row; in the other it returns a different shape.
- **Category:** 12 (duplicate concept inconsistently implemented), 17 (inconsistent client return shapes).
- **Suggested name:** Pick one — either always return the updated entity (preferred; useful) or always return void. If returning the entity, name the type `Token`/`UpdateTokenResponse` rather than reusing the raw entity, so it can evolve.
- **Rationale:** Cross-package consistency. A user who learns one client will be surprised by the other.

### 9. `tokenInfo` field on `CreateOnBehalfOfToken_Response` and `GetToken_Response` — `Info` tautology
- **Why weird:** Field `tokenInfo: AdminTokenInfo` (model.ts:66, 84). Field name re-states the type's redundant suffix. Cascades from the `AdminTokenInfo` → `Token` rename (finding #3).
- **Category:** 20 (type-suffix tautology), 1 (`Info` vague).
- **Suggested name:** `token: Token` (paired with rename in finding #3).
- **Rationale:** Mechanical cascade. `response.token.tokenId` reads more naturally than `response.tokenInfo.tokenId`.

### 10. `tokenInfos` field on `ListTokens_Response` — plural of `Info`, doc-string mismatch
- **Why weird:** Field `tokenInfos: AdminTokenInfo[]` (model.ts:106). Same `Info` tautology as #9 but plural. Also: the JSDoc says "Token metadata of each user-created token in the workspace" — "metadata" implies summary info, but `AdminTokenInfo` is the full row. The field name should be `tokens` not `tokenInfos`.
- **Category:** 20 (type-suffix tautology), 9 (plural-of-`Info` is unidiomatic), 1 (`Info` vague), 15 (field name "tokenInfos" loses meaning).
- **Suggested name:** `tokens: Token[]` (paired with rename in finding #3).
- **Rationale:** Same as #9. Sibling `tokens.ListTokens_Response` has the identical issue (tokens model.ts:55).

### 11. `PAT` acronym never appears, autoscope comments reference it tacitly
- **Why weird:** The doc comments on `AutoscopeState` (model.ts:8) say "State of inferred scope collection (autoscope) for an external PAT." But nowhere else in the file does the abbreviation `PAT` (Personal Access Token) appear — and `Token` is used everywhere as a stand-in. A user grepping for `PAT` (an industry-standard term in security tooling) finds nothing. Inversely, `Token` could mean OAuth, ID, refresh, etc., but in this package it always means PAT. The package would be unambiguous if named `pats` or `personalaccesstokens`.
- **Category:** 5 (cryptic abbreviation in comment only), 15 (`Token` is too generic for the domain).
- **Suggested name:** Add `PAT` aliases or document at the package level. Consider renaming `Token` → `PersonalAccessToken` or, less verbosely, keep `Token` but clarify in JSDoc.
- **Rationale:** Discoverability. This package is the admin PAT API; calling that out beats hiding it.

### 12. `applicationId` on `CreateOnBehalfOfToken` — generic field name in a security-sensitive context
- **Why weird:** `applicationId: string` (model.ts:51) is the OAuth client ID of the service principal the on-behalf-of token will represent. "Application ID" is Azure terminology; on AWS/GCP it's "service principal ID" or "client ID". This is the *target* identity for a privileged token-mint operation; `applicationId` undersells the security implication and overloads "application" with three different meanings across Databricks clouds.
- **Category:** 1 (vague — "application" is overloaded), 14 (Azure-style naming leaks), 15 (generic name in security context), 19 (underspecified ID — application ID of what?).
- **Suggested name:** `servicePrincipalApplicationId` or `servicePrincipalClientId` (the JSDoc literally says "Application ID of the service principal", so the field name should too).
- **Rationale:** The field documentation already names the concept correctly; the field name should follow. Mistaking this for "Databricks Apps application id" would mint a token for the wrong principal.

## Medium severity

### 13. `ListTokens` request fields `createdById` and `createdByUsername` — duplicate filter slots
- **Why weird:** `ListTokens { createdById?, createdByUsername? }` (model.ts:96-100). Two fields that filter on the same logical concept (the creator), with no semantics about whether they're AND/OR. The doc string above the type even says "string filter parameter instead of hard-coded filters" — i.e., this is a temporary shape. The client builds `params` from both unconditionally (client.ts:159-164) which means callers can submit both at once and get undefined server behavior.
- **Category:** 1 (vague — relationship unspecified), 6 (misleading — looks like two filters, possibly redundant).
- **Suggested name:** Either expose a single `filter` string or document mutual exclusivity. At minimum, JSDoc the AND/OR semantics.
- **Rationale:** Consumer-facing API ambiguity.

### 14. `AdminTokenInfo.scopes`, `AdminTokenInfo.autoscopeState`, `CreateOnBehalfOfToken.scopes`, `CreateOnBehalfOfToken.autoscopeEnabled` — `scopes`/`autoscope*` naming triplet inconsistency
- **Why weird:** Within the same `AdminTokenInfo`, `scopes: string[]` is one thing, `autoscopeState` is another (output-only), and the comment on `CreateOnBehalfOfToken.autoscopeEnabled` (model.ts:57) implies autoscope is a *mode*. So users have to learn: `scopes` (the explicit list), `autoscopeEnabled` (request-side bool), `autoscopeState` (response-side enum), with no `autoscopedScopes` field — the `scopes` field is overloaded as both the input list and the result after autoscope completes. Compare with `tokens.PublicTokenInfo` which has `scopes`, `autoscopeState`, `inferredScopes`, and `backfillScopes` (tokens model.ts:72-77) — i.e., the per-user package separates inferred from explicit scopes; the admin package does not.
- **Category:** 12 (duplicate concept implemented differently than sibling), 1 (vague overloading of `scopes`).
- **Suggested name:** Mirror the `tokens` package by adding `inferredScopes` / `backfillScopes` (or document the overload explicitly).
- **Rationale:** Cross-package inconsistency. Worth pushing upstream.

### 15. `creationTime` / `expiryTime` / `lastUsedDay` — three time fields with three units and no unit suffix
- **Why weird:** `AdminTokenInfo` (model.ts:27-41) has `creationTime: number`, `expiryTime: number`, `lastUsedDay: number`. The first two are described as "Timestamp" (likely epoch ms, by convention). The third is described as "Approximate timestamp for the day the token was last used. Accurate up to 1 day." But the field is named `lastUsedDay` (not `lastUsedTime` or `lastUsedDate`), and the doc says it is *still* a timestamp — so the suffix `Day` here means "with day-level granularity" not "as a calendar day index". A reader who skims the type and not the doc could easily believe `lastUsedDay` is a 1-31 day-of-month integer or a number-of-days-since-epoch integer.
- **Category:** 5 (cryptic — `Day` is ambiguous), 6 (misleading — "Day" implies a date, value is a timestamp), 15 (generic name without unit).
- **Suggested name:** `lastUsedTimeMs` (or split into `lastUsedTime: number` + a JSDoc note). At minimum, document the unit on all three fields.
- **Rationale:** Compare with `tokens.PublicTokenInfo.lastAccessedTime` (tokens model.ts:69) which uses `Time` consistently. The admin variant breaks the pattern.

### 16. `ownerId` vs `createdById` — both are user IDs, on the same struct, no docs distinguishing semantics beyond JSDoc
- **Why weird:** `AdminTokenInfo` has `createdById` ("User ID of the user that created the token") and `ownerId` ("User ID of the user that owns the token"). What's the difference? In the sibling `tokens` package, the type has no `ownerId`. This appears to be admin-only metadata where ownership can transfer (e.g., on-behalf-of tokens). A reader has no way to know without external docs whether the two are usually equal.
- **Category:** 1 (vague — relationship unstated), 19 (underspecified IDs in same struct).
- **Suggested name:** Keep names but add JSDoc clarifying when they diverge (e.g., on-behalf-of tokens: creator is the principal who called the API, owner is the service principal).
- **Rationale:** Discoverability.

### 17. `workspaceId` on `AdminTokenInfo` — only meaningful for account-level scope
- **Why weird:** `workspaceId?: number | undefined` (model.ts:39) is documented "If applicable, the ID of the workspace that the token was created in." So it's optional and only meaningful at the account level. But the package and the URL path `/api/2.0/token-management/...` is a workspace endpoint. The field thus carries no useful signal at this endpoint, yet it's exposed.
- **Category:** 6 (misleading — looks pertinent, often vestigial).
- **Suggested name:** Keep; document under what circumstances it is populated (e.g., when the same model is reused at the account API).
- **Rationale:** Generator artefact from sharing models across workspace/account scopes. Flag for upstream cleanup.

### 18. `lastUsedDay` vs sibling `tokens.PublicTokenInfo.lastAccessedTime` — different field names for "last use"
- **Why weird:** Same concept, two field names: `lastUsedDay` (admin) vs `lastAccessedTime` (per-user). Different unit precision too. Already partially covered in #15 but worth its own bullet for cross-package consistency.
- **Category:** 12 (duplicate concept across packages), 17 (inconsistent verb — used vs accessed).
- **Suggested name:** Align to one. Recommend `lastUsedTime` everywhere; "accessed" is a synonym but inconsistent.
- **Rationale:** Cross-package consistency.

### 19. `autoscopeEnabled` on `CreateOnBehalfOfToken` but `autoscopeState` on `AdminTokenInfo` — verb/state mix
- **Why weird:** Request input: `autoscopeEnabled: boolean` (boolean toggle). Response output: `autoscopeState: AutoscopeState` (enum). Two different shapes for what is one feature (autoscope). The field-prefix is consistent, but a user must learn that "I set it as a bool" and "I read it back as an enum".
- **Category:** 6 (misleading — write-side bool, read-side enum), 17 (inconsistent shapes for the same feature).
- **Suggested name:** Document the asymmetry, or accept it as an upstream protocol fact. No good rename without breaking the wire.
- **Rationale:** Observation more than action; flagged because it surfaces in two places in this small file.

### 20. `comment` field — vague, overloaded between SDK comment vs DDL comment vs user note
- **Why weird:** Three of the four user-facing types have a `comment: string` field (`AdminTokenInfo.comment`, `CreateOnBehalfOfToken.comment`). JSDoc says "Comment that describes the purpose of the token" — i.e., a description. Yet the field is called `comment`, which in TS/JS conjures up code comments. Same SQL-DDL leak as in `abacpolicies` (audit finding #28 there).
- **Category:** 6 (misleading — `comment` is overloaded), 14 (SQL-DDL-style naming).
- **Suggested name:** `description` (matches the JSDoc).
- **Rationale:** SQL DDL uses `COMMENT ON ...`; SDK consumers don't. `description` is the standard noun.

### 21. `CreateOnBehalfOfToken` — preposition phrase inside type name
- **Why weird:** The type name contains "OnBehalfOf" — a preposition phrase. Reads as "create on behalf of token" (parse: VP(NP(token))) when the intent is "create [on-behalf-of token]" (parse: a kind of token). Industry shorthand is "OBO" but the SDK avoids the acronym.
- **Category:** 7 (overly verbose), 14 (Go/Java-style camelCase verb phrase).
- **Suggested name:** `CreateOboTokenRequest` (with JSDoc spelling out OBO), or `MintTokenForServicePrincipalRequest` if explicitness wins over brevity.
- **Rationale:** This is the only operation in the package whose name relies on the preposition; surfacing the intent (mint a token for someone else) helps. Defensible as-is.

### 22. Single-source-of-truth comments leaking proto file names
- **Why weird:** Top-of-type comments on `GetToken` (model.ts:69-75) and `ListTokens` (model.ts:87-94) say "!! KEEP THIS IN-SYNC WITH THE WORKSPACE PROTO DEFINITIONS IN SERVICE.PROTO !!" and similar. Generator artifacts leaking into the generated TS. Not a name per se but suggests the type names themselves may be tightly bound to proto choices made for inter-service-team reasons rather than for SDK ergonomics.
- **Category:** Observation, 14 (proto/Go-style leaking).
- **Suggested name:** Strip these comments from generated TS; keep in generator metadata.
- **Rationale:** Quality-of-life. Public SDK comments shouldn't reference Databricks-internal proto files.

### 23. `AutoscopeState` doc comment leaks proto package paths
- **Why weird:** "Mirrored in databricks.identity.AutoscopeState in common/principal-context/api/proto/tokendetails.proto. ... Principal context proto should NOT depend on this proto definitions because too many services depend on the principal context proto." (model.ts:8-12). Inside-baseball that nobody outside Databricks needs.
- **Category:** Observation, 14 (proto leaks).
- **Suggested name:** Replace with one-sentence user-facing doc: "Lifecycle state of automatic scope inference for a personal access token."
- **Rationale:** Same as #22.

### 24. `tokenValue` is a secret but the field name doesn't hint at it
- **Why weird:** `CreateOnBehalfOfToken_Response.tokenValue: string` (model.ts:65). This is the bearer token plaintext, returned exactly once. The field name `tokenValue` doesn't signal "this is a secret; persist immediately; we will never return it again". Compare with cryptographic SDKs that name such fields `secret`, `tokenSecret`, or `bearerToken`.
- **Category:** 1 (vague), 6 (misleading — `value` is the most generic suffix imaginable for the most sensitive field in the package).
- **Suggested name:** `tokenSecret` or `bearerToken`, and add a JSDoc warning ("Returned once. Store immediately.").
- **Rationale:** Defensive naming for security-critical fields helps users not log/leak the value.

### 25. `lifetimeSeconds` field — unit-suffix while sibling has same name and unit but adjacent fields differ
- **Why weird:** `CreateOnBehalfOfToken.lifetimeSeconds: number` (model.ts:53) matches sibling `tokens.CreateToken.lifetimeSeconds` (tokens model.ts:29) — good consistency. But within the same file, `AdminTokenInfo.expiryTime: number` lacks a `Ms` unit suffix despite being epoch ms. Mixed convention.
- **Category:** 17 (inconsistent unit-suffix conventions).
- **Suggested name:** Either `lifetimeSeconds` + `expiryTimeMs` (specify both) or `lifetime: number` + `expiryTime: number` (specify neither). Recommend the former.
- **Rationale:** When some fields encode units and others don't, readers can't tell which to trust.

## Low severity

### 26. `unmarshalCreateOnBehalfOfToken_ResponseSchema`, `unmarshalGetToken_ResponseSchema`, `unmarshalListTokens_ResponseSchema`, `unmarshalRevokeToken_ResponseSchema` — schema constants carry underscores
- **Why weird:** Each constant name carries the underscore from the corresponding type plus an `eslint-disable`. Mechanical cascade from finding #5.
- **Category:** 4 (underscore identifier).
- **Suggested name:** Falls out if response types lose the underscore.
- **Rationale:** Mechanical.

### 27. `marshalCreateOnBehalfOfTokenSchema` — long mouthful
- **Why weird:** Schema constant name is 32 characters. Verbose but accurate.
- **Category:** 7 (verbosity), Observation.
- **Suggested name:** Acceptable as-is.
- **Rationale:** Convention is consistent across all generated packages; no fix needed.

### 28. `adminTokenInfoFieldMaskSchema` and `adminTokenInfoFieldMask()` — `Info` cascade
- **Why weird:** Both names carry the `Info` suffix from `AdminTokenInfo`. Mechanical cascade from finding #3.
- **Category:** 1 (vague suffix `Info`).
- **Suggested name:** `tokenFieldMaskSchema` / `tokenFieldMask()` if entity is renamed.
- **Rationale:** Mechanical.

### 29. `marshalUpdateTokenSchema` second parameter `updateMask` uses `z.any()`
- **Why weird:** The zod schema for `updateMask` is `z.any().transform((m: FieldMask) => m.toString())` (model.ts:236-238). Not a naming issue per se, but `z.any()` defeats type-checking on this field. The schema infers `any` and the marshal accepts anything; only the cast inside the transform restores typing.
- **Category:** Observation, 6 (misleading — schema typed `any`, code expects `FieldMask`).
- **Suggested name:** N/A (logic concern).
- **Rationale:** Same `z.any()` pattern is in the sibling `tokens` marshal. Worth flagging at generator level.

### 30. `Client` class is named `Client` (no namespacing)
- **Why weird:** `export class Client` (client.ts:48). With both `tokens` and `tokenmanagement` packages exporting a `Client`, and many other packages too, code that imports several SDK clients has to alias each one. The class name itself is the most generic possible.
- **Category:** 1 (vague), 12 (duplicate concept across all SDK packages — every package has its own `Client`).
- **Suggested name:** `TokenManagementClient` (or `TokenAdminClient`).
- **Rationale:** This is a cross-package convention concern; mass-renaming would be a breaking change, but flag because users will hit it.

### 31. `host` field on `Client` — workspace URL is more specific
- **Why weird:** `private readonly host: string;` (client.ts:49). The constructor accepts `options.host` which is actually the workspace URL (e.g., `https://my-workspace.cloud.databricks.com`). "Host" is HTTP-level jargon; `workspaceUrl` is the domain-level term users learn first.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `workspaceUrl` (and `options.workspaceUrl`).
- **Rationale:** This is a shared concern across all generated clients; flagged here as it appears in this client.

### 32. `PACKAGE_SEGMENT` constant — vague label
- **Why weird:** `const PACKAGE_SEGMENT = {...}` (client.ts:43). "Segment" is CS jargon; the comment one line up explains it's "the User-Agent identity segment". Without the comment, the constant name doesn't communicate that.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `USER_AGENT_PKG`.
- **Rationale:** Minor; identical issue in every generated package.

### 33. `executeCall` / `executeHttpCall` / `buildHttpRequest` — utility verb pairs without obvious distinction
- **Why weird:** `executeCall` (utils.ts:26) is the public-options-to-internal-options bridge that calls `execute()`. `executeHttpCall` (utils.ts:65) actually issues the HTTP request. The verb is the same ("execute") and the disambiguator is "Http" — a layer below "Call". A reader has to read both to know which to call when.
- **Category:** 1 (vague — `executeCall` is unspecific), 17 (inconsistent layering convention).
- **Suggested name:** `runWithRetry` / `runHttp`, or `executeWithOptions` / `executeHttpRequest`.
- **Rationale:** Same pattern in every generated client; flagging once.

## Observations

### 34. Type-suffix tautology pattern repeats: `tokenInfo: AdminTokenInfo`, `tokenInfos: AdminTokenInfo[]`
- These are mechanical consequences of the `Info` suffix on the central entity (finding #3). Listed separately in findings #9 and #10. If the entity is renamed to `Token`, the field names also need to lose the `Info` cascade (`token` and `tokens`).
- **Category:** 20 (type-suffix tautology).

### 35. Heavy marshal/unmarshal scaffolding ratio
- Model.ts is 265 lines; only ~120 are user-facing type declarations. The rest is zod schemas, transform pairs, FieldMaskSchema, and `eslint-disable` comments. Generator-output bloat per package; not a naming issue.

### 36. Verb-tense and action-verb summary across the client
- `Client` methods: `createOnBehalfOfToken`, `deleteToken`, `getToken`, `listTokens`, `updateToken`. The set is `create/delete/get/list/update` — consistent CRUDish. The mismatch is only with the request types (`RevokeToken` for `deleteToken`, finding #6).
- **Category:** 13 (verb-tense inconsistency between method and type).

## Domain glossary
- `PAT` — Personal Access Token (only in `AutoscopeState` doc comment; the term the package is about but never names directly).
- `OBO` — On-Behalf-Of (spelled out in `CreateOnBehalfOfToken`).
- `autoscope` — Automatic API-path scope inference for a token; enum in `AutoscopeState`.
- `service principal` — Non-human identity that a token can be minted for via on-behalf-of.
- `workspace` — Mentioned in `workspaceId` and in proto comments; the scope of this admin API.
- `m2m`/`u2m` — not encountered.
- `iam` — not encountered.
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`); used for `FieldMask`.

## Cross-package overlap with `tokens`
- **Shared enum:** `AutoscopeState` is duplicated byte-for-byte (model.ts:13-21 in both packages).
- **Shared request types:** `ListTokens`, `RevokeToken`, `UpdateToken` exist in both packages with different fields. `ListTokens` in `tokenmanagement` has `createdById`/`createdByUsername`; in `tokens` it is `{}`.
- **Shared response types:** `ListTokens_Response`, `RevokeToken_Response` exist in both packages. Both pull from a `*TokenInfo[]` array (`AdminTokenInfo[]` vs `PublicTokenInfo[]`).
- **Different entity name:** `AdminTokenInfo` (this package) vs `PublicTokenInfo` (`tokens` package).
- **Different create operation:** `createOnBehalfOfToken` (admin) vs `createToken` (per-user).
- **Different revoke method name:** `deleteToken` (admin) vs `revokeToken` (per-user) — flagged in finding #6.
- **Different update response shape:** Admin returns `AdminTokenInfo`; per-user returns a different shape — flagged in finding #8.
- **Different `lastUsed` field:** `lastUsedDay` (admin) vs `lastAccessedTime` (per-user) — flagged in findings #15/#18.
- **Different scope-related fields:** Admin has `scopes` + `autoscopeState`; per-user adds `inferredScopes` + `backfillScopes` — flagged in #14.
- **Different URL prefix:** `/api/2.0/token-management/...` vs `/api/2.0/token/...`.

The two packages are conceptual siblings (PAT lifecycle) split by audience (admin-of-others vs self), but the SDK surface is split inconsistently — naming, return types, and method verbs diverge for no obvious reason. Worth raising at the SDK-design level.

## File coverage
- `src/v1/model.ts` (265 lines): read fully.
- `src/v1/client.ts` (211 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (18 lines): read fully.
