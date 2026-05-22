# Naming Audit: oauthpublishedapp

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/oauth/src/v1/` (consolidated package — formerly `packages/oauthpublishedapp/`)
**Versions audited:** v1
**Inferred domain:** Account-level read-only catalog of Databricks-blessed third-party OAuth applications (e.g. Power BI, Tableau Desktop) that can be enabled for an account. The published-app surface exposes `listPublishedOAuthApps` returning a paginated `PublishedOAuthApp` catalog row. As of the 2026-05-20 regeneration the package was merged into the broader `@databricks/sdk-oauth` package, which now also carries the custom-integration and published-integration surfaces formerly audited under `oauthcustomappintegration`.
**Total weird names flagged:** 10

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 6 |
| Low | 3 |
| Observation | 1 |

## High severity

### 1. `appId` on `PublishedOAuthApp` is a slug, not an opaque ID — `model.ts:156`
- **Why weird:** `PublishedOAuthApp.appId` is documented as "Unique ID of the published OAuth app". The sibling `CreatePublishedOAuthAppIntegrationRequest.appId` (line 34, same file) is documented as `For example power-bi, tableau-deskop` (sic — typo carried in original). The appId is therefore a human-readable slug like `power-bi`, not an opaque UUID. Calling it `appId` and typing it as `string` collides with the convention that `xId` is an opaque opaque-ID (cf. `accountId`, `integrationId`, `clientId`, `principalId`). Since both types now live in the same package (`packages/oauth/src/v1/model.ts`), the disagreement is now intra-package.
- **Category:** 6, 19 (misleading; underspecified ID — what kind of ID?)
- **Suggested name:** `appSlug` or `publishedAppKey` with the type narrowed to a literal union: `'power-bi' | 'tableau-desktop' | 'looker' | ...`. At minimum, document the format inline ("dash-separated lowercase slug from the Databricks published-app catalog") and align with `CreatePublishedOAuthAppIntegrationRequest.appId`.
- **Rationale:** Every other `xId` in this codebase (`accountId`, `clientId`) is an opaque identifier. Mixing in a slug under the same suffix is a teaching trap. Two types in the same package disagree by silence on what `appId` is.

## Medium severity

### 2. Every domain type re-states `PublishedOAuthApp` in full — `model.ts:137, 147, 154`
- **Why weird:** Inside the consolidated `oauth` package, every published-app type still spells "PublishedOAuthApp" or "PublishedOAuthApps" inside its name: `ListPublishedOAuthAppsRequest`, `ListPublishedOAuthAppsRequest_Response`, `PublishedOAuthApp`. After consolidation the package namespace is now `oauth`, so the qualifier is justified to disambiguate from the custom and published *integration* types in the same module (`PublishedOAuthAppIntegration` lives at line 171). But the qualifier on `Published` vs `PublishedOAuthAppIntegration` does only a small amount of work — both share the `OAuthApp` infix and disambiguate purely via the trailing `Integration`. Reads as 16-character prefix stutter on every type.
- **Category:** 7, 8, 20 (overly verbose; redundant suffix; type-suffix tautology)
- **Suggested name:** With consolidation, distinguish strictly via the `…Integration` suffix and drop `PublishedOAuth` from the catalog row: `App` (the catalog row) vs `PublishedAppIntegration` / `CustomAppIntegration` (the registrations). At minimum drop the redundant `OAuth` infix everywhere — the parent package is already `oauth`.
- **Rationale:** TypeScript module imports already qualify the namespace. The `OAuth` infix is fully redundant once the package is `@databricks/sdk-oauth`. The remaining `Published` qualifier earns its keep only insofar as it distinguishes the catalog row from the published-integration row.

### 3. `clientId` field lacks the convention-matching closing period — `model.ts:157-158`
- **Why weird:** Doc comment reads `Client ID of the published OAuth app. It is the client_id in the OAuth flow` — missing trailing period (`flow` ends the sentence). Every other doc comment in the file ends with a period. Also, the wire-form `client_id` is hardcoded into the JSDoc text, which leaks generator-side terminology into TS docs that should describe the TS field. Repository CLAUDE.md rule: "Every comment must be a proper sentence ending with a period."
- **Category:** Not strictly a name finding, but a generator-side text issue — included because it sits on a name field and is visible at every hover.
- **Suggested name:** Doc text only; field name `clientId` is correct. Fix to: `Client ID of the published OAuth app. Matches the OAuth 2.0 \`client_id\` parameter (RFC 6749 §2.2).`
- **Rationale:** Comment-style rule on the project. The reference to RFC 6749 §2.2 gives the term a spec anchor instead of leaving "client_id in the OAuth flow" as a vague pointer.

### 4. `isConfidentialClient` vs `confidential` inconsistent within the same package — `model.ts:164` (vs `model.ts:12, 54`)
- **Why weird:** Consolidation merged the published-app and custom-integration model files. The same RFC 6749 §2.1 client-type flag is now spelled three ways within one model file: `confidential` on `CreateCustomOAuthAppIntegrationRequest` (line 12) and `CustomOAuthAppIntegration` (line 54), versus `isConfidentialClient` on `PublishedOAuthApp` (line 164). What used to be a cross-package inconsistency is now an intra-package one. The boolean-prefix rule (`is…`) plus the `Client` clarifier here are the more descriptive name; the custom-integration side is the side to align.
- **Category:** 12 (duplicate concept across types, inconsistent naming) — now elevated to intra-package
- **Suggested name:** Pick one — `isConfidentialClient` is the clearer name. Rename the three `confidential` occurrences in custom integration types to match.
- **Rationale:** The flag's value space and meaning are identical across the three types; the identifier should be too. Consolidation makes this a single-package fix.

### 5. `redirectUrls: string[]` field stutter with `URI`/`URL` spec language — `model.ts:165-166`
- **Why weird:** OAuth 2.0 spec (RFC 6749 §3.1.2) calls these *redirection URIs*. The TS field uses `redirectUrls` (lowercase `rl`); the JSDoc reads "Redirect URLs of the published OAuth app." matching the field name. Elsewhere in the same model file the doc uses "redirect urls" (lowercase, lines 7, 50, 212) and "redirect URIs" (line 217) interchangeably — the latter inside `UpdateCustomOAuthAppIntegrationRequest`. The casing `Urls` (lowercase `rl`) follows Google TS style guide.
- **Category:** 3 (acronym casing — `URL` lowercased as `Url` while `OAuth` keeps `Auth` mid-token uppercase, inconsistent acronym treatment within the same identifier set)
- **Suggested name:** Keep `redirectUrls` (matches Google TS style guide https://google.github.io/styleguide/tsguide.html#identifiers), but cross-reference RFC 6749 §3.1.2 in the JSDoc so the spec term is visible: "Redirect URLs of the published OAuth app (RFC 6749 §3.1.2 \"redirection URIs\")."
- **Rationale:** The doc-term mismatch (URI in spec, URL in code, both in JSDoc within the same file) is the real issue; the casing is correct per Google TS.

### 6. `scopes: string[]` carries no enum/union — `model.ts:167-168`
- **Why weird:** Custom-integration types in the same file document the supported scope set inline: `Supported scopes: all-apis, sql, offline_access, openid, profile, email` (lines 16-18). Here the same field is typed `string[]` with no JSDoc enumeration: just "Required scopes for the published OAuth app." Same vocabulary, asymmetric documentation within one file.
- **Category:** 1, 12 (vague — string[] could be anything; duplicate concept across types, inconsistent treatment)
- **Suggested name:** Keep `scopes`, but type as `Array<'all-apis' | 'sql' | 'offline_access' | 'openid' | 'profile' | 'email'>` to match the custom-integration documented vocabulary. At minimum, JSDoc the supported scopes.
- **Rationale:** Two types in the same package model the same wire field. The custom variant documents the value space; the published variant leaves it open.

### 7. `pageSize: number` lacks bounds and unit context — `model.ts:142-143`
- **Why weird:** Doc says "The max number of OAuth published apps to return in one page." but does not document the maximum-permitted value, default, or whether `0` means "unset" or "zero results". `pageSize` is the most common cross-API pagination footgun; some Databricks APIs reject `pageSize > 1000`, others treat `0` as "use default", others as "return zero". A consumer doing `req.pageSize = 0` gets undefined behaviour. The name `pageSize` itself is fine and consistent with Databricks API conventions (and Google AIP-158 https://google.aip.dev/158).
- **Category:** 1 (vague — `number` with no bounds reads as "any int", but isn't)
- **Suggested name:** Name is fine; doc should be "The maximum number of published OAuth apps to return in one page. Defaults to server-side default (typically 100). Maximum: 1000."
- **Rationale:** Same field exists in many sibling packages; document once at the source of truth (the generator's pagination template).

### 8. `pageToken: string` reuses the previous-response `nextPageToken` — implicit cross-field contract — `model.ts:140-141`, `model.ts:150-151`
- **Why weird:** Request `pageToken` and response `nextPageToken` are two halves of one pagination contract. The names use different roots (`page…` vs `nextPage…`), so the connection is invisible. A new reader has to read both shapes and the iterator to understand `req.pageToken = resp.nextPageToken`. This is the Google AIP-158 convention (https://google.aip.dev/158) and shared by every paginated Databricks API, but worth flagging at project level since the naming asymmetry repeats everywhere.
- **Category:** 17 (inconsistent action verbs — `pageToken` is a noun, `nextPageToken` is a noun; the asymmetry is in the prefix `next…`)
- **Suggested name:** Keep names (they match AIP-158); document the relationship in JSDoc: "Pass `nextPageToken` from the previous response as `pageToken` to fetch the next page."
- **Rationale:** Convention-bound, but the doc is silent — every list endpoint in the SDK silently shares this contract.

## Low severity

### 9. `OAuth` casing is consistent — `model.ts:throughout`
- **Why weird:** Worth flagging for completeness: this package uses `OAuth` consistently (capital O, capital A, lowercase uth). No `OAUTH`, `Oauth`, or `oAuth` variants. Matches Google TS style guide guidance and matches RFC 6749. No action.
- **Category:** 3 (acronym casing — flagged compliant)
- **Suggested name:** None — confirm the project-wide policy is `OAuth`.
- **Rationale:** Documenting compliance.

### 10. `Client` class — generic single export, common to all generated packages — `client.ts:69`
- **Why weird:** Same pattern as every other package in this SDK. `import { Client } from '@databricks/sdk-oauth/v1'` produces an unqualified `Client` symbol. Consumers using multiple packages must alias: `import { Client as OAuthClient }`. After consolidation this class now hosts the full custom-integration + published-integration + published-app surface (no longer a one-method client), making the generic name even more of a navigation hazard.
- **Category:** 1 (vague/generic)
- **Suggested name:** `OAuthClient` (still inside `…/v1`). Project-wide change.
- **Rationale:** Defer to the project-wide naming-audit summary.

### 11. `apps?: PublishedOAuthApp[]` field on response — collection field name matches type — `model.ts:149`
- **Why weird:** The response collection field. Reads naturally enough, but no other indication of plurality at the field name (only the array type adds plurality). After consolidation the response types `ListCustomOAuthAppIntegrationsRequest_Response` (line 118) and `ListPublishedOAuthAppIntegrationsRequest_Response` (line 131) also expose an `apps` field whose values are *integrations*, not apps. So within one package the `apps` field name now collides in meaning across three response types.
- **Category:** 15 (generic field — `apps` is the maximally-generic plural of `app`) — flagged for completeness
- **Suggested name:** Rename to `publishedApps` here (and the two sibling responses to `customIntegrations` / `publishedIntegrations`) to make plural+domain explicit.
- **Rationale:** Now an intra-package collision after consolidation — three response types all expose `apps` with different semantics.

## Observations

### O1. JSDoc literal templating: this surface has `<Databricks>` token leak — `client.ts:402`
- The JSDoc on `listPublishedOAuthApps` reads "Get all the available published OAuth apps in `<Databricks>`". Same generator bug appears on the `TokenAccessPolicy.enableSingleUseRefreshTokens` doc (`model.ts:195`) and on `CustomOAuthAppIntegrationSecret.clientId` / `.clientSecret` docs (`model.ts:73, 76`). Five total `<Databricks>` token leaks now visible in this single file after consolidation.

## Domain glossary
- `accountId` — Databricks account UUID (top-level tenant). Distinct from a workspace ID.
- `appId` — Slug key into the Databricks published-app catalog (e.g. `power-bi`, `tableau-desktop`). Despite the `Id` suffix, this is a human-readable name. Same value space as `CreatePublishedOAuthAppIntegrationRequest.appId` in the same model file.
- `clientId` — RFC 6749 client identifier (OAuth `client_id`). Stable per published app.
- `OAuth` — IETF OAuth 2.0 (RFC 6749). Always cased `OAuth` in this package.
- `Published` app — Databricks-blessed third-party application (Power BI, Tableau Desktop, …) available to be enabled in an account. Distinct from a `Custom` integration (caller-defined OAuth client, now lives in the same consolidated `oauth` package as `CustomOAuthAppIntegration`).
- `redirectUrls` — RFC 6749 §3.1.2 "redirection URIs" registered for the published app.
- `scopes` — RFC 6749 scope strings the published app may request (`all-apis`, `sql`, `offline_access`, `openid`, `profile`, `email`).

## Cross-package coupling notes
- After the 2026-05-20 regeneration, the `oauthpublishedapp` and `oauthcustomappintegration` packages were merged into `@databricks/sdk-oauth`. What were previously cross-package consistency issues (boolean naming, scope vocabulary, `appId` value space) are now intra-package consistency issues. See findings #1, #4, #6, #11.
- The shared catalog row `PublishedOAuthApp` and the registration row `PublishedOAuthAppIntegration` now coexist in `model.ts`; the previous suggestion to "lift `PublishedOAuthApp` into a shared module" is satisfied by the consolidation.

## File coverage
- `src/v1/model.ts` (488 lines): read fully — published-app types are `PublishedOAuthApp`, `ListPublishedOAuthAppsRequest`, `ListPublishedOAuthAppsRequest_Response`, plus shared `TokenAccessPolicy` and the custom/published integration types.
- `src/v1/client.ts`: read fully — `Client` class hosts `listPublishedOAuthApps` (line 403) and `listPublishedOAuthAppsIter` (line 439) alongside the custom-integration and published-integration methods.
- `src/v1/utils.ts`: read for context — generic across packages, identical to siblings.
- `src/v1/index.ts`: read for context — re-exports `Client` and model types.
- `package.json`: now `@databricks/sdk-oauth` (consolidated).

## Fixed
- #1 Package name `oauthpublishedapp` singular vs collection-only surface (originally cited at `package.json:2`, `client.ts:62`): Fixed in regeneration on 2026-05-20 — `oauthpublishedapp` package was merged into the multi-resource `@databricks/sdk-oauth` package, eliminating the singular-package-with-one-list-method concern.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
