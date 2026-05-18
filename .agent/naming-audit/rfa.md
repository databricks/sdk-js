# Naming Audit: rfa

**Path:** `packages/rfa/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog **R**equest **F**or **A**ccess — manage where access-request notifications are routed (the destinations: email addresses, Slack channels, Microsoft Teams webhooks, generic webhooks, or URLs) when end-users request access to a UC securable (catalog/schema/table/etc.). Also exposes a batched create endpoint that lets a caller fire one or more access requests on behalf of principals against a list of securables, returning the destinations the request will be sent to. URL prefix is `/api/3.0/rfa/...`.
**Total weird names flagged:** 41

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 18 |
| Low | 8 |
| Observation | 5 |

## High severity

### 1. Package name `rfa` — `packages/rfa/`, `.package.json:2`, `client.ts:78,117,151`
- **Why weird:** Three-letter cryptic acronym used as the npm package name (`@databricks/sdk-rfa`), the package directory, the import path (`packages/rfa/src/v1/`), and the URL segment (`/api/3.0/rfa/...`). Nothing in the source files spells out what `rfa` stands for — no doc comment, no README description (`package.json` description is empty string), no module-level JSDoc in `index.ts`. From the model alone, the user has to reverse-engineer that `rfa` means "Request For Access" by reading the type names (`CreateAccessRequest`, `AccessRequestDestinations`). The Databricks Go SDK (`databricks/sdk-go`) does not yet contain this code path either — there's no upstream reference.
- **Category:** 5 (cryptic abbreviation), 1 (vague).
- **Suggested name:** `accessrequests` or `accessrequestdestinations`. The npm package would be `@databricks/sdk-accessrequests`. The wire URL `/api/3.0/rfa/...` can stay locked while the SDK surface uses the spelled-out name.
- **Rationale:** TS SDK names are user-typed in import statements (`import {Client} from '@databricks/sdk-rfa/v1';`). A user reading that import line has no way to guess the package's purpose. Compare to neighbour packages — `abacpolicies`, `accountaccesscontrol`, `alerts`, `cleanrooms`, `gitcredentials` — all spell out the domain. `rfa` is the only opaque acronym among ~70 packages.

### 2. `DestinationType.URL` — `model.ts:13`
- **Why weird:** `URL` collides with the JavaScript built-in global `URL` (the WHATWG URL class). The enum member is therefore syntactically `DestinationType.URL` which is fine, but importing/destructuring is error-prone (`const {URL} = DestinationType` would shadow the global). Worse, the value `'URL'` is a misleading category — `DestinationType.URL` is documented as a webhook delivery to an arbitrary URL, but `DestinationType.GENERIC_WEBHOOK` is *also* a delivery to a URL. The semantic difference between `URL` and `GENERIC_WEBHOOK` is invisible from the names.
- **Category:** 10 (reserved-word/global collision), 6 (misleading — two members both denote webhook-URL deliveries).
- **Suggested name:** Rename `URL` to `URL_NOTIFICATION` or `PLAIN_URL`, or rename `GENERIC_WEBHOOK` to clarify what makes it "generic" relative to `URL`. Document the wire-level difference between the two.
- **Rationale:** Two enum members for "send to a URL" is a discoverability bug. Future callers will guess one and silently get the wrong webhook semantics.

### 3. `DestinationType.DESTINATION_TYPE_UNSPECIFIED` — `model.ts:8`
- **Why weird:** Enum sentinel re-states the enum name (`DestinationType.DESTINATION_TYPE_UNSPECIFIED`). The corresponding field is already `destinationType?: DestinationType | undefined`, so "unspecified" is encoded twice: as `undefined` (TS-native) and as `DESTINATION_TYPE_UNSPECIFIED` (proto-native).
- **Category:** 2 (redundant enum prefix), 14 (Go/proto-style name).
- **Suggested name:** Drop the sentinel; rely on `undefined`.
- **Rationale:** TS enum members are namespaced by the enum itself. `Foo.FOO_BAR` is pure protobuf noise. Same finding recurs in `connections`, `abacpolicies`, and most generated packages.

### 4. `PrincipalType.PRINCIPAL_TYPE_UNSPECIFIED` — `model.ts:17`
- **Why weird:** Same pattern as #3 — sentinel re-states enum name.
- **Category:** 2, 14.
- **Suggested name:** Drop the sentinel; rely on `undefined`.
- **Rationale:** Identical to #3.

### 5. `SpecialDestination.SPECIAL_DESTINATION_UNSPECIFIED` — `model.ts:46`
- **Why weird:** Same pattern as #3. Compounded because every other member of the same enum *also* repeats the `SPECIAL_DESTINATION_` prefix (see #6).
- **Category:** 2, 14.
- **Suggested name:** Drop the sentinel.
- **Rationale:** Same as #3.

### 6. `SpecialDestination` members repeat `SPECIAL_DESTINATION_` prefix — `model.ts:46-51`
- **Why weird:** Every member of `SpecialDestination` is prefixed with `SPECIAL_DESTINATION_`. Reads as `SpecialDestination.SPECIAL_DESTINATION_CATALOG_OWNER`, `SpecialDestination.SPECIAL_DESTINATION_EXTERNAL_LOCATION_OWNER`, etc. Six members, all redundantly prefixed.
- **Category:** 2 (redundant enum prefix), 14 (Go/proto-style name).
- **Suggested name:** `SpecialDestination.CATALOG_OWNER`, `SpecialDestination.EXTERNAL_LOCATION_OWNER`, etc. (drop the prefix). Even better, since the enum models "owner of which UC securable type" the name should be `OwnerDestination` and members can be `CATALOG`, `EXTERNAL_LOCATION`, `CONNECTION`, `CREDENTIAL`, `METASTORE`.
- **Rationale:** Five non-sentinel members all begin with the same 23-character prefix that re-states the enum name. Member access reads `SpecialDestination.SPECIAL_DESTINATION_CATALOG_OWNER` (44 chars to reference "catalog owner"). This is the worst case in the package.

### 7. `Securable.type` field collides with reserved word & loses meaning — `model.ts:160`
- **Why weird:** Bare `type` is the most generic identifier in the language. `type` is also a contextual reserved word (used in `type X = ...`, `import type`, `typeof`). Within `Securable`, the field is documented as "The type of securable (catalog/schema/table)" — its value is a `SecurableType` enum. Caller writes `securable.type` which gives no hint that the value is one of nine UC securable kinds. The same struct also has a `fullName` field, so reading `securable.type` and `securable.fullName` together reads like a TS metadata bag, not a UC entity descriptor.
- **Category:** 10 (reserved-word collision in casual reading), 1 (vague), 15 (generic field name losing meaning), 20 (type-suffix tautology between field `type` and enum `SecurableType`).
- **Suggested name:** `kind` or `securableType` (the latter matches sibling types: `AccessRequestDestinations.securableType`).
- **Rationale:** `securable.kind` (or `securable.securableType`) communicates the domain. `securable.type` reads as a TS construct.

### 8. `Securable.fullName` doc says "catalog/schema/table" but reality is broader — `model.ts:162-165`
- **Why weird:** The doc comment for `fullName` reads "The full name of the catalog/schema/table". But the `type` field's enum `SecurableType` supports 17 different securables: CATALOG, SCHEMA, TABLE, STORAGE_CREDENTIAL, EXTERNAL_LOCATION, FUNCTION, SHARE, PROVIDER, RECIPIENT, CLEAN_ROOM, METASTORE, PIPELINE, VOLUME, CONNECTION, CREDENTIAL, EXTERNAL_METADATA, STAGING_TABLE. The doc is misleading by selective enumeration — implies the field is only for three securable types.
- **Category:** 6 (misleading doc on a name-bearing field).
- **Suggested name:** Keep field name; fix doc to say "The full name of the securable, e.g. `catalog.schema.table` for a table, `catalog.schema.view` for a view, etc."
- **Rationale:** Name itself is fine; the documentation undermines the field's apparent applicability.

### 9. `AccessRequestDestinations.securableType` and `fullName` duplicate `securable.type` and `securable.fullName` — `model.ts:54-73`
- **Why weird:** `AccessRequestDestinations` has both:
  - `securable?: Securable` (which has `type` and `fullName`), and
  - top-level `securableType?: string` and `fullName?: string`.
  The inline JSDoc says "Redundant with the type in the securable object, but necessary for Terraform integration" and "Redundant with the name in the securable object, but necessary for Terraform integration". Three problems:
  1. Two fields hold the same data — easy to set inconsistently (`securable.type === 'CATALOG'` while `securableType === 'TABLE'`).
  2. The redundant `securableType` is typed `string` while `securable.type` is typed `SecurableType` — *different types* for the same data.
  3. The reason ("Terraform integration") is implementation detail leaking onto the public SDK surface for every non-Terraform caller.
- **Category:** 12 (duplicate concepts), 6 (misleading — which one is authoritative?), 16 (type contradiction: `string` vs enum `SecurableType`).
- **Suggested name:** Drop `securableType` and `fullName` from `AccessRequestDestinations` for non-Terraform callers; expose them under a `terraformShim` namespace if needed, or model with `Pick`/conditional types. Wire stays unchanged.
- **Rationale:** Two-field duplication invites bugs (a caller might set one and not the other). The "necessary for Terraform integration" rationale is exactly the kind of generator artefact that should not surface here.

### 10. `GetAccessRequestDestinationsRequest.securableType` typed as `string` — `model.ts:121-126`
- **Why weird:** The request type for `getAccessRequestDestinations` has `securableType?: string`, but the response type `AccessRequestDestinations` has `securable?: { type?: SecurableType }` — a typed enum. So the request is untyped string, while the response is enum. A caller writing `req.securableType = 'catalogue'` (typo or wrong case) gets no compile-time error.
- **Category:** 16 (field type contradicts domain — should be `SecurableType`), 6 (misleading — looks like free text but server demands an enum value).
- **Suggested name:** Keep name, change type to `SecurableType`.
- **Rationale:** Same data model, two field types. Type narrowing is the whole point of TS — losing it on the request side is a regression.

## Medium severity

### 11. Type name `AccessRequestDestinations` is plural — but represents ONE securable's destinations — `model.ts:54-73`
- **Why weird:** The type is plural (`Destinations`) but each instance describes the destinations *for one securable* (`securable?: Securable`, singular). The plural belongs only to the inner `destinations?: NotificationDestination[]` array. Compare: `AccessRequestDestination` (singular) would describe one route; `AccessRequestDestinations` (plural) implies multiple route configs. The current name is the latter but holds the former.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `AccessRequestRouting` or `AccessRequestDestinationConfig` (singular) — captures "the routing configuration for one securable".
- **Rationale:** The pluralization is for the inner array, not the outer concept. Today the type-name reader gets the wrong mental model.

### 12. `BatchCreateAccessRequestsRequest` / `BatchCreateAccessRequestsResponse` — `model.ts:75,85`
- **Why weird:** Verbose type names (32 / 33 chars). `Batch` + `Create` + `AccessRequests` + `Request`/`Response`. Also: `Batch` prefix is the *only* signal that the endpoint accepts an array — but the client method is just `batchCreateAccessRequests`, and the field inside is `requests?: CreateAccessRequest[]`. Three levels of "batchness".
- **Category:** 7 (overly verbose), 8 (redundant suffix `Request`).
- **Suggested name:** `CreateAccessRequestsRequest` (drop `Batch`; the plural already implies batching). Or even better: `CreateAccessRequestsInput` / `CreateAccessRequestsOutput`. Pair with method `createAccessRequests`.
- **Rationale:** `Batch` doubles as marketing copy ("look, batched!") rather than naming. TS plural-`s` already says "multiple".

### 13. `BatchCreateAccessRequestsResponse.responses` — `model.ts:85-88`
- **Why weird:** Field `responses` on a type called `BatchCreateAccessRequestsResponse`. Reads `batchCreateAccessRequestsResponse.responses[0]`. Compounds "response" three times. The actual value is an array of `CreateAccessRequestResponse`.
- **Category:** 20 (type-suffix tautology), 8 (redundant suffix).
- **Suggested name:** `results` or `created` instead of `responses`.
- **Rationale:** Field-name "responses" inside a "Response" type is a tautology that confuses the call site reader.

### 14. `CreateAccessRequest.behalfOf` field — `model.ts:90-97`
- **Why weird:** Wire is `behalf_of`, TS is `behalfOf`. The doc says "The principal this request is for. Empty `behalf_of` defaults to the requester's identity." The name reads as a preposition ("on behalf of …") rather than a noun. Reads `request.behalfOf = principal` instead of `request.principal = principal` (with a docstring that says default is the caller). Compare with: `recipient`, `subject`, `principal`, `requestee`.
- **Category:** 14 (Go/proto-style name — `behalf_of` is the wire convention), 1 (preposition as field name).
- **Suggested name:** `principal` or `requester` or `subjectPrincipal`. Wire stays `behalf_of`.
- **Rationale:** Field-name as preposition is awkward in TS. `request.behalfOf` parses as a fragment of an English sentence; the value is a noun (`Principal`).

### 15. `CreateAccessRequest.securablePermissions` is array but bare `securable` siblings are singular — `model.ts:111`
- **Why weird:** `CreateAccessRequest` has `securablePermissions?: SecurablePermissions[]` (plural array, type `SecurablePermissions` itself plural). `SecurablePermissions` holds `securable: Securable` (singular) and `permissions: string[]` (plural). So `request.securablePermissions[0].securable` reads as "the singular securable inside the plural securable-permissions". The type name `SecurablePermissions` doesn't say "pairs of securable + permissions list".
- **Category:** 9 (singular/plural mismatch), 1 (vague — what does `SecurablePermissions` model?).
- **Suggested name:** `SecurablePermissionRequest` (singular type, describes one securable plus the permissions being requested on it). Field becomes `securablePermissionRequests?: SecurablePermissionRequest[]` — long but readable.
- **Rationale:** The type-name pluralization is hiding what the type actually models (one securable + a permissions list).

### 16. `CreateAccessRequestResponse.requestDestinations` — `model.ts:114-119`
- **Why weird:** Field `requestDestinations` on a type called `CreateAccessRequestResponse`. The type already says it's a response *to a create request*; the field name re-states "request" and uses an unusual compound. The actual value is an array of `AccessRequestDestinations` (the routing configs the request will fire to).
- **Category:** 20 (tautology), 1 (vague — what makes it `request`Destinations vs `accessRequest`Destinations?), 12 (duplicate concept — the type name is `AccessRequestDestinations` but the field name drops the `Access` prefix).
- **Suggested name:** `destinations: AccessRequestDestinations[]` or `routing: AccessRequestDestinations[]`.
- **Rationale:** Field name should match the type element being held.

### 17. `NotificationDestination.destinationId` — `model.ts:128-134`
- **Why weird:** Type-suffix tautology — field `destinationId` on a type called `NotificationDestination`. Reads `notificationDestination.destinationId`. Also: the doc explains the value is *overloaded* — email address for EMAIL, URL for URL, Databricks notification ID for everything else. Three different shapes packed into one untyped string field.
- **Category:** 20 (type-suffix tautology), 19 (underspecified ID — three different schemes hidden behind one name), 6 (misleading — "Id" implies opaque token, not e.g. an email).
- **Suggested name:** Field as `id` (since the containing type already says `NotificationDestination`). Alternatively, model the overload as a discriminated union: `{ type: 'EMAIL'; email: string } | { type: 'URL'; url: string } | { type: 'SLACK'; notificationId: string } | ...`.
- **Rationale:** A field named `Id` that sometimes holds an email and sometimes a URL is the canonical example of an underspecified identifier.

### 18. `NotificationDestination.destinationType` — `model.ts:135`
- **Why weird:** Type-suffix tautology — field `destinationType` of type `DestinationType` on a type called `NotificationDestination`. Reads `notificationDestination.destinationType`.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `type` (the containing type already says `NotificationDestination`). Reads `notificationDestination.type`.
- **Rationale:** Wire stays `destination_type`; TS can drop the prefix the same way `Securable.type` does (model.ts:160) — note the inconsistency with the same project.

### 19. `NotificationDestination.specialDestination` overloads with `destinationType` — `model.ts:136-142`
- **Why weird:** A single `NotificationDestination` has both `destinationType?: DestinationType` and `specialDestination?: SpecialDestination`. The doc says `specialDestination`'s `destination_type` is "always EMAIL". So we have two enums that *cannot both be expressive at once* — if `specialDestination` is set, `destinationType` is constrained to `EMAIL`. The type system doesn't enforce this.
- **Category:** 12 (duplicate concept — two enums encode overlapping info), 6 (misleading — looks like independent fields).
- **Suggested name:** Either (a) collapse: extend `DestinationType` with new members (`CATALOG_OWNER_EMAIL`, `EXTERNAL_LOCATION_OWNER_EMAIL`, ...) and drop `SpecialDestination`; or (b) model as a discriminated union: `{ kind: 'normal'; destinationType, destinationId } | { kind: 'special'; specialDestination }`.
- **Rationale:** Two parallel enums for a constrained relationship is exactly the kind of latent-bug field name pair that a strict type system can prevent.

### 20. `Principal.id` is bare `id` — but holds either user, group, or service principal ID — `model.ts:145-149`
- **Why weird:** Field `id` is documented as "<Databricks> user, group or service principal ID". Which of the three it is depends on the sibling `principalType` enum. Without `principalType`, the `id` is meaningless. Combined: `{ id: '123', principalType: 'USER_PRINCIPAL' }`. The shape is fine, but the bare `id` doesn't communicate "the meaning depends on `principalType`".
- **Category:** 19 (underspecified ID), 1 (vague).
- **Suggested name:** Keep `id` paired with `principalType`, OR (more aggressive) make the type a discriminated union: `{ kind: 'user'; userId: string } | { kind: 'group'; groupId: string } | { kind: 'service'; servicePrincipalId: string }`.
- **Rationale:** Tagged unions express the constraint at the type level. The current shape is a Go-port idiom.

### 21. `Securable.providerShare` — `model.ts:166-170`
- **Why weird:** Field name `providerShare` on type `Securable`. Doc says it's "the name of the Share object that contains the securable when the securable is getting shared in D2D Delta Sharing". The name confuses two concepts: a `Share` securable type (already exists in `SecurableType.SHARE`) and a "provider" prefix that disambiguates Delta Sharing flows.
- **Category:** 5 (cryptic abbreviation: `D2D` is in doc but never expanded), 1 (vague — what makes the share `provider`?).
- **Suggested name:** `sharingProviderName` or `deltaShareName` with a clearer doc.
- **Rationale:** `providerShare` reads as "the share of the provider" (genitive). The actual semantic is "the Delta Share that grants access to this securable when it's a shared object". The current name doesn't disambiguate.

### 22. `SecurableType.STAGING_TABLE` and inline TODO — `model.ts:41-42`
- **Why weird:** Enum value pinned by inline TODO: `/** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */`. The TODO leaks an internal JIRA ticket (`UC-2980`) and the typo "full-fleged" into the public SDK surface. The presence of the value tells callers it works; the comment tells them it doesn't.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Either hide until promotion (`@experimental`), or remove the inline TODO and document the constraint in the doc-comment proper.
- **Rationale:** Public SDK enums shouldn't carry internal JIRA references. Same pattern as `connections#29` and `dataclassification`.

### 23. `SecurableType.CLEAN_ROOM` with underscore vs `STORAGE_CREDENTIAL`, `EXTERNAL_LOCATION` etc — `model.ts:24-43`
- **Why weird:** Mostly consistent SCREAMING_SNAKE, but `CLEAN_ROOM` is one of several where the underlying domain noun is two words. Compare `STORAGE_CREDENTIAL` (two-word: "storage credential"), `EXTERNAL_LOCATION` (two-word: "external location"), `CLEAN_ROOM` (two-word: "clean room"), `STAGING_TABLE` (two-word: "staging table"), `EXTERNAL_METADATA` (two-word: "external metadata"). All these are consistent — flagging only because the package surfaces the same SCREAMING_SNAKE compound style without a TS-flavour alternative. The two-word compound makes member access very long: `SecurableType.STORAGE_CREDENTIAL` reads 27 chars.
- **Category:** Observation / 18 (long enum value set).
- **Suggested name:** PascalCase variant would shorten: `SecurableType.StorageCredential`, `SecurableType.CleanRoom`. Generator-locked.
- **Rationale:** Naming is internally consistent; flagging only as a style observation versus PascalCase TS conventions.

### 24. `SecurableType.EXTERNAL_METADATA` lacks doc — `model.ts:40`
- **Why weird:** `EXTERNAL_METADATA` is undocumented. Neighbouring `STAGING_TABLE` carries a TODO/comment, but `EXTERNAL_METADATA` doesn't even say what it is. Unity Catalog has `externalmetadata` as its own package (`packages/externalmetadata/`), but this RFA enum member exists in isolation.
- **Category:** 1 (vague; no doc disambiguating).
- **Suggested name:** Keep name; add doc comment.
- **Rationale:** Naming OK, but undocumented enum members in a 17-element enum mean readers must cross-reference to other packages.

### 25. `Principal` is exported but `principalType` field has no doc — `model.ts:148`
- **Why weird:** `principalType?: PrincipalType | undefined` has no JSDoc. Sibling `id` has a doc. The PrincipalType enum has only an `_UNSPECIFIED` sentinel + three values, none of which clarify when each applies. Caller has to guess by inspecting the IAM service.
- **Category:** 1 (vague).
- **Suggested name:** Keep name; add doc.
- **Rationale:** Mechanical.

### 26. `SecurablePermissions.permissions: string[]` — `model.ts:173-178`
- **Why weird:** `permissions` is `string[]` rather than an enum. Doc says "List of requested Unity Catalog permissions" — UC permissions are a known closed set (`SELECT`, `MODIFY`, `USAGE`, `READ_VOLUME`, etc.), so this should be a typed enum or branded string. Bare `string[]` loses any compile-time guard against typos.
- **Category:** 16 (field type contradicts domain — should be enum or branded string).
- **Suggested name:** Keep name; type as `UnityCatalogPermission[]` (new enum). Or document the closed set inline.
- **Rationale:** Same problem as #10. The wire is string, but TS could narrow it.

### 27. Method `batchCreateAccessRequests` on `Client` — `client.ts:74`
- **Why weird:** Method name redundantly carries `batch` even though it's the only create method. There's no non-batched alternative. The `batch` prefix is descriptive of the request body shape (an array), not a distinct API mode.
- **Category:** 7 (overly verbose), 17 (action verb inconsistency — sibling methods are `getAccessRequestDestinations`/`updateAccessRequestDestinations` with no analogous prefix).
- **Suggested name:** `createAccessRequests` (the plural already conveys batch semantics).
- **Rationale:** The "batch" prefix is API-design vocabulary leaking into the SDK surface. If the only way to create is batched, the prefix carries zero information.

### 28. Three Client methods, three different domain entity names — `client.ts:74,113,147`
- **Why weird:** `Client.batchCreateAccessRequests` works on `requests`. `Client.getAccessRequestDestinations` works on `destinations`. `Client.updateAccessRequestDestinations` works on `destinations`. The first method creates *requests*; the other two manage *destinations*. The class has two distinct subdomains (request creation, destination routing) fused into one client surface with no separation.
- **Category:** 17 (action verb inconsistency across cohesion boundary), 12 (duplicate concepts — two separate resources blended).
- **Suggested name:** Split into two clients: `AccessRequestClient` (create) and `AccessRequestDestinationsClient` (get/update). Or rename `batchCreateAccessRequests` → `createRequests` (singular noun "request" in the URL `/api/3.0/rfa/requests`).
- **Rationale:** A class with three methods that cover two disjoint resources is hiding the resource boundary.

## Low severity

### 29. `executeCall` / `executeHttpCall` naming pair — `utils.ts:26,65`
- **Why weird:** Two functions distinguished only by an `Http` infix. `executeCall` wraps retry/rate-limit/timeout; `executeHttpCall` does the actual fetch + logging + error throw. Easy to confuse at call site.
- **Category:** 1 (vague), 17.
- **Suggested name:** `runWithCallOptions` / `sendHttp`, or `wrapCall` / `dispatchHttp`.
- **Rationale:** Same as `connections#40`.

### 30. `HttpCallOptions` — `utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file imports `Options` from `@databricks/sdk-core/api` and `CallOptions` from `@databricks/sdk-options/call`. Three `Options` types in scope. `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Same as `connections#41`.

### 31. `readAll` — `utils.ts:40`
- **Why weird:** Internal helper name is generic; clashes cognitively with `Array.prototype` / stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `readStreamToEnd` / `drainStream`.
- **Rationale:** Same as `connections#38`.

### 32. `flattenQueryParams` — `utils.ts:123`
- **Why weird:** Exported but unused in this package (`client.ts` builds query strings inline with `URLSearchParams.append`). Dead-looking export.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Remove from utils if it's a generator default.
- **Rationale:** Generator emits the same helper into every package even when unused. Same as `connections#37`.

### 33. `PACKAGE_SEGMENT` constant — `client.ts:35`
- **Why weird:** `Segment` is a generic word; without the comment the constant doesn't communicate User-Agent identity.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Same as `connections#36`.

### 34. `Client` class — `client.ts:40`
- **Why weird:** Top-level class literally named `Client`. Re-exported through `index.ts` as just `Client`. Two RFA packages co-existing in user code would clash on import (`import {Client} from '@databricks/sdk-rfa/v1'` vs `import {Client} from '@databricks/sdk-accounts/v1'`).
- **Category:** 1 (vague).
- **Suggested name:** `RfaClient` or `AccessRequestClient` (better — see #1).
- **Rationale:** Same finding as `dataclassification`. Recurs across all generated packages.

### 35. `buildHttpRequest` parameter list — `utils.ts:96-102`
- **Why weird:** Five positional parameters (`method`, `url`, `headers`, `signal`, `body`) with the optional ones at the end. The function name `buildHttpRequest` doesn't communicate the parameter order; callers in `client.ts:87,122,166` pass them positionally. Easy to confuse `signal` and `body` (both optional, both at the end).
- **Category:** 1 (vague — five-positional builder).
- **Suggested name:** Keep name; accept a single options object `{ method, url, headers, signal?, body? }`.
- **Rationale:** Five-positional builders without object syntax are an anti-pattern in modern TS.

### 36. Loose typing for `executeCall(call, options)` `Options` field copying — `utils.ts:30-37`
- **Why weird:** The `Options` shape is built with a series of `...(options?.foo !== undefined && {foo: options.foo})` spreads. The pattern is a TS-idiom for conditional spread of optional fields. Naming-wise: the local `opts` variable is intentionally one letter shorter than `options` to disambiguate — but the shadowing convention isn't documented.
- **Category:** Observation.
- **Suggested name:** Rename inner `opts` → `internalOptions` (or the outer parameter to `callOptions`).
- **Rationale:** Mechanical.

## Observations

### 37. `index.ts` is exhaustive but doesn't re-export schemas — `index.ts:1-24`
The index file exports the `Client`, all four enums, and all nine model interfaces (`AccessRequestDestinations`, `BatchCreateAccessRequestsRequest`, `BatchCreateAccessRequestsResponse`, `CreateAccessRequest`, `CreateAccessRequestResponse`, `GetAccessRequestDestinationsRequest`, `NotificationDestination`, `Principal`, `Securable`, `SecurablePermissions`, `UpdateAccessRequestDestinationsRequest`). It does *not* export the `marshal*`/`unmarshal*` schemas or the `accessRequestDestinationsFieldMask` helper. Consistent with the other packages but means the field-mask helper isn't available to consumers.
- **Category:** Observation.

### 38. Comment-tag inconsistency — `client.ts:78,117,151` vs URL
The URL constant `/api/3.0/rfa/...` (lower-case "rfa") is the only place the package name appears outside of imports — the entire SDK surface otherwise uses spelled-out names. Suggests the API itself owns the `rfa` shortname and the SDK is mechanically reflecting it. Worth confirming with the API team whether the URL prefix is intended to stay `/rfa/` or migrate to `/access-requests/`.
- **Category:** Observation.

### 39. No tests in the package
`package.json` line 24-25: `"test": "echo 'no tests'"`, `"test:browser": "echo 'no tests'"`. The package ships untested. Not a naming issue, but cross-package noise — same as several other newly generated packages.
- **Category:** Observation.

### 40. Action-verb conventions on `Client`
`batchCreateAccessRequests`, `getAccessRequestDestinations`, `updateAccessRequestDestinations` — three different verbs across two resources. Verbs themselves match REST convention (`create`/`get`/`update`); the naming inconsistency is that the verb's target switches mid-class (see #28).
- **Category:** Observation.

### 41. `package.json` description is empty string — `package.json:4`
`"description": ""`. The npm package has no public description string. Combined with the cryptic `rfa` name (see #1), this leaves users with no metadata to identify the package's purpose when browsing npm.
- **Category:** Observation.

## Domain glossary
- **`rfa`** — **R**equest **F**or **A**ccess. The Databricks Unity Catalog API for managing access-request notifications to UC securables. There are two distinct concerns:
  1. **Access Requests** (`POST /api/3.0/rfa/requests`) — a *user* (or principal on whose behalf) is requesting permissions (`SELECT`, `MODIFY`, etc.) on a list of Unity Catalog securables (catalogs, schemas, tables, etc.). The response tells the caller *where* the request was routed (which destinations).
  2. **Access Request Destinations** (`GET`/`PATCH /api/3.0/rfa/destinations/...`) — administrative configuration of *which* destinations (email addresses, Slack channels, MS Teams webhooks, generic webhooks, URLs) receive notifications when end-users file an access request against a given securable.
- **`uc`** — Unity Catalog. Referenced indirectly in `CreateAccessRequest` doc comments ("requested UC privileges"). Not in field names.
- **`d2d`** — Delta-to-Delta (Delta Sharing peer-to-peer). Appears in `Securable.providerShare` doc comment ("D2D Delta Sharing"). Not expanded inline.
- **`UC-2980`** — internal JIRA ticket referenced in `SecurableType.STAGING_TABLE` TODO comment. Should not appear on public SDK surface.
- **`Securable`** — Unity Catalog term-of-art for any object that can be granted permissions: catalog, schema, table, view, volume, function, model, connection, credential, external location, share, recipient, clean-room, metastore, pipeline, external-metadata, staging-table. The full taxonomy lives in `SecurableType` (17 values incl. sentinel).
- **`Principal`** — Unity Catalog/IAM term for "an entity that can hold permissions": a user, a group, or a service principal. The `PrincipalType` enum disambiguates which kind. Used here as the "on behalf of" actor in `CreateAccessRequest`.
- **`SpecialDestination`** — five enum members denoting "the owner of the metastore/catalog/external-location/connection/credential" as an implicit email destination. These cannot be assigned; they're a default fallback.
- **`FieldMask`** — Google protobuf convention (re-used in Databricks API) for sparse-field updates in PATCH semantics. `accessRequestDestinationsFieldMask(...)` builds the wire-format paths.
- Inferred but not in source: **`Terraform integration`** — appears in `AccessRequestDestinations.securableType` doc, suggests the redundant string fields exist because the Terraform provider can't read nested struct field types (see finding #9).

## File coverage
- `src/v1/model.ts` (385 lines): read fully.
- `src/v1/client.ts` (187 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (24 lines): read fully.
