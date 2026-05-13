# Naming Audit: marketplaces

**Path:** `packages/marketplaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Marketplace — provider-side and exchange-side operations for managing **listings** (the marketplace storefront entry for a dataset, model, notebook, app, MCP, partner integration, or git repo), **providers** (the publisher account), **exchanges** (curated, scoped collections of listings, including exchange filters that scope visibility by metastore), **personalization requests** (consumer-side requests for tailored access), **files** attached to listings/providers (icons, embedded notebooks, embedded markdown, commit drawdown attachments), and a separate **provider analytics dashboard** sub-resource (a Lakeview-backed dashboard for provider-side analytics).
**Total weird names flagged:** 65

## Summary
| Severity | Count |
| --- | --- |
| High | 16 |
| Medium | 32 |
| Low | 10 |
| Observation | 7 |

The marketplaces package is one of the more naming-distressed surfaces in the SDK. The single dominant problem is the proto-style `MessageType_Response` underscore-suffixed identifier pattern — present on 14 of the 24 request types and infecting `client.ts`, `index.ts`, and every transitive importer with `// eslint-disable-next-line @typescript-eslint/naming-convention` comments. Closely behind it is the **inconsistent request-type convention** within a single file: some request types follow the verb-shaped Go style (`CreateFile`, `DeleteFile`, `GetListing`, `GetListings`, `UpdateListing`, `ListFiles`, `CreateProvider`, `UpdateProvider`, `DeleteProvider`, `ListProviders`, `CreateProviderAnalyticsDashboard`, `UpdateProviderAnalyticsDashboard`, `GetLatestVersionProviderAnalyticsDashboard`, `ListProviderAnalyticsDashboard`, `GetPersonalizationRequestsForProvider`, `UpdatePersonalizationRequestStatus`) while others follow the more idiomatic `*Request`/`*Response` suffix (`CreateExchangeRequest`, `DeleteExchangeRequest`, `GetExchangeRequest`, `UpdateExchangeRequest`, `ListExchangesRequest`, `CreateExchangeFilterRequest`, `DeleteExchangeFilterRequest`, `UpdateExchangeFilterRequest`, `ListExchangeFiltersRequest`, `AddExchangeForListingRequest`, `RemoveExchangeForListingRequest`, `ListExchangesForListingRequest`, `ListListingsForExchangeRequest`) — split almost perfectly down the provider/exchange axis but not advertised that way. Other notable issues are the overloaded vocabulary triad **Listing / Exchange / Provider** without disambiguation (an exchange filter is a metastore-id allowlist, an exchange listing is a join row between an exchange and a listing, a listing detail is the body of a listing, and a personalization request is a consumer-side action targeting a listing), the cryptic plural irregularities around the noun `Listings` (the `GetListings` request and `GetListings_Response` payload field both use `listings`, while `CreateListing` and `DeleteListing` use the singular and `ListListingsForExchange` re-introduces the plural with a different field name `exchangeListings`), and several typo-grade or wire-leak names (`termOfServiceLink` missing the plural-`s` from "Terms of Service", `MarketplaceFileType.COMMIT_DRAWDOWN_REQUEST_ATTACHMENT` exposing an internal commit-drawdown workflow with a 33-character enum value, and the field `isFromLighthouse` referencing the internal-codename "Lighthouse" service in a public type).

---

## High severity

### 1. Proto-style `_Response` underscore-suffixed types — 14 occurrences

**Location:** `src/v1/model.ts:182, 193, 202, 210, 238, 245, 252, 322, 334, 344, 354, 365, 375, 418, 438, 451, 633, 646, 656, 671`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateFile_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateListing_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateProvider_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateProviderAnalyticsDashboard_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteFile_Response {}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteListing_Response {}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteProvider_Response {}
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetFile_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetLatestVersionProviderAnalyticsDashboard_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListing_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListings_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPersonalizationRequestsForProvider_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetProvider_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListFiles_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListProviderAnalyticsDashboard_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListProviders_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateListing_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdatePersonalizationRequestStatus_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateProvider_Response { ... }
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateProviderAnalyticsDashboard_Response { ... }
```

20 types in this file carry an embedded underscore — illegal-feeling in idiomatic TypeScript (Google TS style guide § 5.2 specifies `PascalCase` without underscores). The fact that 14 distinct types and 14 corresponding `*_ResponseSchema` exports require disabling `@typescript-eslint/naming-convention` means the proto wart is fully visible in the public API. Every consumer who imports one of these types must accept the underscore in their own code (see `client.ts:29, 31, 33, 38, 41, 43, 45, 53, 55, 57, 59, 61, 63, 71, 75, 77, 88, 90, 93` and `index.ts:32, 34, 36, 38, 45, 47, 49, 53, 58, 60, 62, 64, 67, 76, 80, 82, 100, 102, 106`).
- **Category:** 4 (underscores in TS identifiers), 14 (Go/proto-style names).
- **Suggested name:** `CreateFileResponse`, `CreateListingResponse`, etc. — drop the underscore wherever the API is allowed to diverge from the wire.
- **Rationale:** The other half of this file uses the `*Request`/`*Response` convention (`CreateExchangeRequest`, `CreateExchangeResponse`), so the underscore form is internally inconsistent within a single 1770-line file.

### 2. Verb-shaped request types — 14 occurrences

**Location:** `src/v1/model.ts:174, 188, 197, 207, 233, 240, 247, 317, 331, 339, 348, 359, 370, 411, 434, 445, 627, 637, 650, 660`

```ts
export interface CreateFile { ... }
export interface CreateListing { ... }
export interface CreateProvider { ... }
export interface CreateProviderAnalyticsDashboard {}
export interface DeleteFile { ... }
export interface DeleteListing { ... }
export interface DeleteProvider { ... }
export interface GetFile { ... }
export interface GetLatestVersionProviderAnalyticsDashboard {}
export interface GetListing { ... }
export interface GetListings { ... }
export interface GetPersonalizationRequestsForProvider { ... }
export interface GetProvider { ... }
export interface ListFiles { ... }
export interface ListProviderAnalyticsDashboard {}
export interface ListProviders { ... }
export interface UpdateListing { ... }
export interface UpdatePersonalizationRequestStatus { ... }
export interface UpdateProvider { ... }
export interface UpdateProviderAnalyticsDashboard { ... }
```

Top-level request types named with imperative verbs (`Create*`, `Delete*`, `Get*`, `List*`, `Update*`). TS types should be nouns; verbs are reserved for methods. The `Client` exposes the same identifier as both a method and a type: `client.createListing(req: CreateListing)`, `client.getListing(req: GetListing)`, `client.listProviders(req: ListProviders)` — verb-noun-verb-noun every time. Readers cannot tell from the type whether the symbol names a request shape or an operation.
- **Category:** 7 (overly verbose / structural), 14 (Go-style request-type naming), 17 (inconsistent action verbs within file — see #3).
- **Suggested name:** `CreateFileRequest`, `CreateListingRequest`, `GetListingRequest`, `ListProvidersRequest`, etc.
- **Rationale:** See #3.

### 3. Two competing request-type naming conventions in one file

**Location:** Both patterns coexist throughout `src/v1/model.ts`.

```
Verb-shaped (Go style):              *Request-suffixed (idiomatic TS):
CreateFile                           CreateExchangeRequest
CreateListing                        CreateExchangeFilterRequest
CreateProvider                       CreateExchangeResponse
DeleteFile                           DeleteExchangeRequest
DeleteListing                        DeleteExchangeFilterRequest
DeleteProvider                       GetExchangeRequest
GetFile                              UpdateExchangeRequest
GetListing                           UpdateExchangeFilterRequest
GetListings                          ListExchangesRequest
GetProvider                          ListExchangeFiltersRequest
ListFiles                            ListExchangesForListingRequest
ListProviders                        ListListingsForExchangeRequest
UpdateListing                        AddExchangeForListingRequest
UpdateProvider                       RemoveExchangeForListingRequest
...                                  ...
```

Verb-shaped types are used for **provider-side** operations (listings, files, providers, personalization, analytics dashboard); `*Request`-suffixed types are used for **exchange-side** operations (exchanges, exchange filters, exchange-listing joins). The split likely reflects two different proto packages on the server but in TS it reads as arbitrary inconsistency. A single user calling both `client.createListing` and `client.createExchange` will import two completely differently-named request types: `CreateListing` and `CreateExchangeRequest`. There is no documentation or hint that this split is intentional.
- **Category:** 17 (inconsistent action verbs / naming patterns), 12 (duplicate convention — two patterns for the same concept).
- **Suggested name:** Pick one — and `*Request` is the rest-of-SDK norm. Cascade with #2.
- **Rationale:** A single ergonomic package should not require users to memorize which sub-domain uses which type-naming scheme.

### 4. `Listing` — ambiguous central type

**Location:** `src/v1/model.ts:456`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}
```

`Listing` is the central noun of the package, but the name has two unrelated English meanings: a *marketplace listing* (a storefront entry) and a *list operation* (the verb "to list", noun "a listing of items"). The package frequently uses both meanings within a single line:
- `getListings(req: GetListings): Promise<GetListings_Response>` — method name uses the verb sense ("get the listings"), the type name uses the noun sense (a "GetListings" request that returns marketplace listings).
- `ListListingsForExchangeRequest` reads as "list the listings for exchange" — the first `List` is the verb, the second `Listings` is the noun.
- `ExchangeListing` (line 278) is a join-row type — neither a storefront listing nor a list-operation but a third concept ("a listing in an exchange").

The triple overload is unavoidable given the domain word but the SDK does not disambiguate (e.g. by renaming join rows to `ExchangeListingLink` or `ExchangeMembership`).
- **Category:** 1 (vague), 12 (duplicate concepts), 15 (overloaded vocabulary).
- **Suggested name:** Keep `Listing` for the noun; rename `ExchangeListing` → `ExchangeListingLink` / `ListingExchangeMembership`; rename `GetListings` → `ListListingsRequest` (cascade with #2 and #3 — but note that gives `ListListingsRequest`, which is itself a stutter; the right fix may be `ListMarketplaceListingsRequest` or simpler `ListListings`).
- **Rationale:** "Listing" has multiple senses; the SDK uses all three; the API can mitigate this by giving the *join row* a less ambiguous name.

### 5. `ExchangeListing` — overloaded "listing" inside the type name

**Location:** `src/v1/model.ts:278`

```ts
export interface ExchangeListing {
  id?: string | undefined;
  exchangeId?: string | undefined;
  exchangeName?: string | undefined;
  listingId?: string | undefined;
  listingName?: string | undefined;
  createdAt?: number | undefined;
  createdBy?: string | undefined;
}
```

The type is a join row connecting an exchange to a listing (with denormalized names). Named `ExchangeListing` it parses as either "a listing of type Exchange" (no — exchanges and listings are distinct) or "the exchange-side view of a listing" (no — both sides are denormalized into the same row) or "a listing exposed in the exchange" (closer, but the type is really the *link*, not the listing itself). The `Exchange.linkedListings: ExchangeListing[]` field at line 263 makes the relationship visible but does not clarify the name.
- **Category:** 1 (vague), 6 (misleading: looks like an inheritance from `Listing`), 12 (overloaded with `Listing`).
- **Suggested name:** `ExchangeListingLink`, `ExchangeMembership`, `ListingExchangeAssociation`.
- **Rationale:** See #4.

### 6. `AddExchangeForListingRequest` / `RemoveExchangeForListingRequest` — for-Listing word-order

**Location:** `src/v1/model.ts:141, 592`

```ts
export interface AddExchangeForListingRequest {
  listingId?: string | undefined;
  exchangeId?: string | undefined;
}

export interface RemoveExchangeForListingRequest {
  id?: string | undefined;
}
```

The operations are symmetric (associate / disassociate an exchange with a listing), but the request shapes are asymmetric: `Add` takes `(listingId, exchangeId)`, `Remove` takes a single `id: string` (which is actually the `ExchangeListing.id`, i.e. the join-row id — not the exchange id nor the listing id). The name `RemoveExchangeForListingRequest` reads as "remove the exchange for [this] listing", suggesting the body should reference both the exchange and the listing — but it just takes a join-row id. Similarly, `AddExchangeForListingResponse` returns `exchangeForListing: ExchangeListing` — the response field name re-states the "for listing" preposition that isn't carried on any other type.
- **Category:** 7 (overly verbose), 6 (misleading: `Remove*` doesn't match the field shape).
- **Suggested name:** `LinkListingToExchangeRequest` / `UnlinkListingFromExchangeRequest` (or `*ExchangeListingRequest`); rename response field `exchangeForListing` → `exchangeListing`.
- **Rationale:** Mirror the underlying object (`ExchangeListing`) rather than the verb phrase.

### 7. `AddExchangeForListingResponse.exchangeForListing` — Greek-letter field name

**Location:** `src/v1/model.ts:146-148`

```ts
export interface AddExchangeForListingResponse {
  exchangeForListing?: ExchangeListing | undefined;
}
```

The field name `exchangeForListing` is a noun phrase that mirrors the request verb ("Add Exchange For Listing"). But the value is an `ExchangeListing` (the join-row type). Just naming the field `exchangeListing` would match the type name and remove the "for" preposition that doesn't add information.
- **Category:** 7 (overly verbose), 20 (type-suffix tautology — field name doesn't quite match its type name).
- **Suggested name:** `exchangeListing` (matches the underlying type).
- **Rationale:** See #6.

### 8. `MarketplaceFileType.COMMIT_DRAWDOWN_REQUEST_ATTACHMENT` — 33-character internal-domain enum value

**Location:** `src/v1/model.ts:119-126`

```ts
export enum MarketplaceFileType {
  PROVIDER_ICON = 'PROVIDER_ICON',
  EMBEDDED_NOTEBOOK = 'EMBEDDED_NOTEBOOK',
  APP = 'APP',
  EMBEDDED_MARKDOWN = 'EMBEDDED_MARKDOWN',
  /**
   * Consumer-attached supporting document (e.g., PDF) for a commit drawdown
   * request. Stored under `staging/COMMIT_DRAWDOWN_REQUEST_ATTACHMENT/` (the
   * entity stays in FILE_STATUS_STAGING permanently — no sanitization) with
   * 14-day expiration; not served via the general presigned-GET path.
   */
  COMMIT_DRAWDOWN_REQUEST_ATTACHMENT = 'COMMIT_DRAWDOWN_REQUEST_ATTACHMENT',
}
```

This enum value exposes a billing/commerce concept ("commit drawdown") that is not documented anywhere else in the marketplaces public surface. There is no `CommitDrawdownRequest` type, no related method, no field referencing "drawdown" elsewhere in the file. The JSDoc says these files have 14-day expiration and special storage paths — implementation details surfacing as the enum's namesake. A consumer scanning `MarketplaceFileType` cannot tell whether this is a value they should ever use.
- **Category:** 18 (long enum values), 1 (vague — "commit drawdown" undefined in the SDK), 11 (effectively-internal value).
- **Suggested name:** Document or hide. If kept, the long name is itself fine — the issue is the value's presence in the public API without context.
- **Rationale:** Public enums should be self-explanatory; internal-workflow values should either be documented inline with the workflow's purpose or kept off the public surface.

### 9. `PersonalizationRequest.isFromLighthouse` — internal codename leak

**Location:** `src/v1/model.ts:563`

```ts
export interface PersonalizationRequest {
  ...
  isFromLighthouse?: boolean | undefined;
  ...
}
```

`Lighthouse` is an internal Databricks service codename, not a product term — there is no `Lighthouse` mention anywhere else in the package, no JSDoc clarifying what the flag means, no enum, and no type-safety on what it controls. The flag's purpose is opaque to anyone outside the marketplace team.
- **Category:** 5 (cryptic abbreviation / codename), 1 (vague), 6 (misleading: implies a known concept).
- **Suggested name:** Either document inline (the doc-comment should explain Lighthouse) or rename to a feature-describing name. If Lighthouse is a request-origin tag, `originatingService` (with an enum) would be clearer.
- **Rationale:** Public APIs should not leak internal-system codenames.

### 10. `ListingSummary` vs `ListingDetail` — Summary / Detail as separate types

**Location:** `src/v1/model.ts:515, 462`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}

export interface ListingSummary { /* 20 fields */ }
export interface ListingDetail  { /* 16 fields */ }
```

The split into `Summary` and `Detail` looks like a "list view vs. detail view" distinction (where `Summary` is what gets returned in list endpoints and `Detail` is the full payload). But both are bundled into a single `Listing` and both come back from `getListing` and `listListings`. The convention is meaningful in REST APIs that ship two read-shapes (e.g. GitHub's `Repository` vs `MinimalRepository`), but here both types are always present on the same `Listing`. The naming implies a contract the API doesn't honor.
- **Category:** 6 (misleading — names imply contract that isn't enforced), 12 (duplicate concept of "the listing"), 11 (could be merged).
- **Suggested name:** `ListingMetadata` (for what is currently `ListingSummary`) and `ListingContent` (for `ListingDetail`); or merge into a single `Listing` type.
- **Rationale:** The "Summary / Detail" lexicon promises a slim/fat split that the API doesn't actually provide.

### 11. `ListingSummary` — 20-field "summary"

**Location:** `src/v1/model.ts:515-536`

```ts
export interface ListingSummary {
  name?: string | undefined;
  subtitle?: string | undefined;
  status?: ListingStatus | undefined;
  share?: ShareInfo | undefined;
  providerRegion?: RegionInfo | undefined;
  setting?: ListingSetting | undefined;
  createdAt?: number | undefined;
  createdBy?: string | undefined;
  updatedAt?: number | undefined;
  updatedBy?: string | undefined;
  publishedAt?: number | undefined;
  publishedBy?: string | undefined;
  categories?: Category[] | undefined;
  listingType?: ListingType | undefined;
  createdById?: number | undefined;
  updatedById?: number | undefined;
  providerId?: string | undefined;
  exchangeIds?: string[] | undefined;
  gitRepo?: RepoInfo | undefined;
}
```

A 20-field type called `Summary` is misleading — summaries are conventionally short. This includes provider-region info, share info, exchange ids, git-repo info, and full audit timestamps. The name promises slim; the shape is fat.
- **Category:** 6 (misleading).
- **Suggested name:** `ListingMetadata` or `ListingHeader`.
- **Rationale:** See #10.

### 12. `ProviderInfo.termOfServiceLink` — singular "term"

**Location:** `src/v1/model.ts:581`

```ts
export interface ProviderInfo {
  ...
  termOfServiceLink?: string | undefined;
  ...
}
```

The legal document is **Terms of Service** (plural). Field name says `termOfService` (singular). The neighboring `privacyPolicyLink` is correctly singular (a privacy policy is singular), so the field reads as if "term" were intentional — but the linked document is universally plural. The same field appears with the same typo as `term_of_service_link` on the wire (see `marshalProviderInfoSchema:1671`), so this is a server-side typo that the SDK faithfully preserves.

Note: `ListingDetail.termsOfService` (line 464) correctly uses the plural form — so the package has both `termOfServiceLink` and `termsOfService` for analogous concepts.
- **Category:** 6 (misleading: wrong word form), 17 (inconsistent: same package uses both `termOfService` and `termsOfService`).
- **Suggested name:** `termsOfServiceLink`.
- **Rationale:** Within-package consistency and English correctness.

### 13. `FileParent` — abstract container with weak typing

**Location:** `src/v1/model.ts:303-307`

```ts
export interface FileParent {
  /** TODO make the following fields required */
  parentId?: string | undefined;
  fileParentType?: FileParentType | undefined;
}
```

The type ships with a `TODO` in the JSDoc — the API contract is incomplete by the generator's own admission. `parentId` is a free-form string with no statement of which `FileParentType` corresponds to which kind of id. `fileParentType` is a 3-value enum (`PROVIDER`, `LISTING`, `LISTING_RESOURCE`), but `LISTING_RESOURCE` has no separate `ListingResource` type in the package — it's an opaque concept. The pair is effectively a discriminated union that isn't discriminated.
- **Category:** 19 (underspecified ID), 6 (misleading: looks like a polymorphic parent but isn't typed), Observation (incomplete API).
- **Suggested name:** Either model as a TS discriminated union (`{ $case: 'provider' | 'listing' | 'listingResource', id: string }`) or rename `parentId` → `providerId | listingId | listingResourceId` per case.
- **Rationale:** The `TODO` says the team knows; the type is shipped publicly anyway.

### 14. `FileParent.fileParentType` — type-suffix tautology

**Location:** `src/v1/model.ts:306`

```ts
export interface FileParent {
  ...
  fileParentType?: FileParentType | undefined;
}
```

Field name = type name minus the `FileParent` prefix repeated. Inside `FileParent`, what else could `.fileParentType` be? `parentType` or `type` carries the same information.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `type` (matching `ShareInfo.type`) or `parentType`.
- **Rationale:** Redundant context.

### 15. `FileInfo.marketplaceFileType` — package-name prefix in a field

**Location:** `src/v1/model.ts:290`

```ts
export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  ...
}
```

The field qualifies "fileType" with "marketplace" — but the type is *already* inside the marketplaces package. Every `FileType` here is a marketplace file type. The same prefix appears on `MarketplaceFileType` (the enum itself, line 114). Together they read as `marketplaceFileType: MarketplaceFileType` — package name stuttered twice.
- **Category:** 7 (overly verbose), 20 (type-suffix tautology).
- **Suggested name:** Rename enum → `FileType`; rename field → `type`.
- **Rationale:** Package-name qualifiers are noise on internal fields.

### 16. `marketplaceFileType: MarketplaceFileType` vs `fileParentType: FileParentType` — different qualifier conventions

**Location:** `src/v1/model.ts:290, 306`

The package qualifies one enum with "marketplace" (`MarketplaceFileType`) and another without (`FileParentType`). Both are file-scoped enums. The asymmetry suggests `MarketplaceFileType` was renamed at some point to avoid a collision (perhaps with `files` package's `FileType`?) but `FileParentType` was not.
- **Category:** 17 (inconsistent naming pattern).
- **Suggested name:** Rename one to match the other.
- **Rationale:** See #15.

---

## Medium severity

### 17. `Client` — generic top-level class name

**Location:** `src/v1/client.ts:152`

```ts
export class Client { ... }
```

Top-level export named just `Client`. Every generated package exports a `Client` class with the same name; importing two requires aliasing (`import { Client as MarketplacesClient } from '@databricks/sdk-marketplaces/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `MarketplacesClient`.
- **Rationale:** Service-prefixed client class names are standard across `@aws-sdk/*`, `@google-cloud/*`, `@azure/*`.

### 18. `Exchange.linkedListings` — verb tense and ambiguity

**Location:** `src/v1/model.ts:263`

```ts
export interface Exchange {
  ...
  linkedListings?: ExchangeListing[] | undefined;
}
```

"Linked" is the past participle implying the action of linking was performed. But the field returns the *current* set of `ExchangeListing` join-rows, not a history of linking events. `listings` or `members` would be clearer; `linkedListings` is also a typo trap (one could expect `linkedListingIds` if the type was `string[]`, but it's actually `ExchangeListing[]`).
- **Category:** 13 (verb-tense inconsistency), 1 (vague).
- **Suggested name:** `listings`, `memberships`, or `listingLinks`.
- **Rationale:** Past-participle field names suggest a log/audit; this is a list of current memberships.

### 19. `ExchangeFilter.filterValue` / `ExchangeFilter.filterType` — field name = type prefix

**Location:** `src/v1/model.ts:269, 275`

```ts
export interface ExchangeFilter {
  id?: string | undefined;
  exchangeId?: string | undefined;
  filterValue?: string | undefined;
  name?: string | undefined;
  ...
  filterType?: ExchangeFilterType | undefined;
}
```

Inside an `ExchangeFilter`, what else could `filterValue` be the value of? Or `filterType` the type of? `value` and `type` carry the same information. The prefix `filter` adds nothing.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `value`, `type`.
- **Rationale:** Field names that re-state the parent type are noise (see also `EffectivePrivilege.privilege` from grants audit #15).

### 20. `ExchangeFilterType.GLOBAL_METASTORE_ID` — single-value enum

**Location:** `src/v1/model.ts:69-71`

```ts
export enum ExchangeFilterType {
  GLOBAL_METASTORE_ID = 'GLOBAL_METASTORE_ID',
}
```

An enum with a single member. Typically a sign that the API anticipates future filter types but only has one today — but in TypeScript a single-value enum is just `'GLOBAL_METASTORE_ID'`. The naming is fine; the type's existence is the smell.
- **Category:** 11 (trivially small enum), 1 (over-engineered for one value).
- **Suggested name:** Could be a string literal type until a second value lands.
- **Rationale:** TS allows narrowing without enums (`type ExchangeFilterType = 'GLOBAL_METASTORE_ID'`).

### 21. `MarketplaceFileType.APP` — three-letter generic value

**Location:** `src/v1/model.ts:117`

```ts
export enum MarketplaceFileType {
  PROVIDER_ICON = 'PROVIDER_ICON',
  EMBEDDED_NOTEBOOK = 'EMBEDDED_NOTEBOOK',
  APP = 'APP',
  EMBEDDED_MARKDOWN = 'EMBEDDED_MARKDOWN',
  COMMIT_DRAWDOWN_REQUEST_ATTACHMENT = 'COMMIT_DRAWDOWN_REQUEST_ATTACHMENT',
}
```

`APP` is the only member without a qualifier. Compare with `EMBEDDED_NOTEBOOK` and `EMBEDDED_MARKDOWN` — both prefixed with "embedded" to indicate they're attached to a listing. Is `APP` similarly embedded? Is it a Databricks App package file? A general application archive? Without a qualifier or doc-comment the value is ambiguous.
- **Category:** 1 (vague), 17 (inconsistent qualifier convention with peers).
- **Suggested name:** `EMBEDDED_APP` or `APP_PACKAGE`.
- **Rationale:** Match the qualifier convention of `EMBEDDED_*` peers.

### 22. `AssetType.ASSET_TYPE_*` — redundant enum prefixes

**Location:** `src/v1/model.ts:5-19`

```ts
export enum AssetType {
  ASSET_TYPE_UNSPECIFIED = 'ASSET_TYPE_UNSPECIFIED',
  ASSET_TYPE_GIT_REPO = 'ASSET_TYPE_GIT_REPO',
  ASSET_TYPE_DATA_TABLE = 'ASSET_TYPE_DATA_TABLE',
  ASSET_TYPE_MODEL = 'ASSET_TYPE_MODEL',
  ASSET_TYPE_NOTEBOOK = 'ASSET_TYPE_NOTEBOOK',
  ASSET_TYPE_MEDIA = 'ASSET_TYPE_MEDIA',
  ASSET_TYPE_PARTNER_INTEGRATION = 'ASSET_TYPE_PARTNER_INTEGRATION',
  ASSET_TYPE_APP = 'ASSET_TYPE_APP',
  ASSET_TYPE_MCP = 'ASSET_TYPE_MCP',
}
```

Every value is prefixed with `ASSET_TYPE_` — proto convention for namespace disambiguation. In TS, the enum's name already provides the namespace: `AssetType.GIT_REPO` is unambiguous; `AssetType.ASSET_TYPE_GIT_REPO` is redundant.
- **Category:** 2 (redundant enum prefixes).
- **Suggested name:** `AssetType.GIT_REPO`, `AssetType.DATA_TABLE`, etc.
- **Rationale:** TS enum members are accessed via the enum type, so the prefix is always redundant.

### 23. `AssetType.ASSET_TYPE_UNSPECIFIED` — proto sentinel leak

**Location:** `src/v1/model.ts:6`

```ts
ASSET_TYPE_UNSPECIFIED = 'ASSET_TYPE_UNSPECIFIED',
```

Proto enums require a zero-value `UNSPECIFIED` member. This is an implementation detail of protobuf, not a meaningful TS API value — `undefined` already serves the same role in optional TS fields. The other "unspecified" pattern in this file: `ListingTagType.LISTING_TAG_TYPE_UNSPECIFIED` (line 104).
- **Category:** 18 (long enum values), 11 (proto sentinel exposed).
- **Suggested name:** Drop. Use `undefined` for the unset case.
- **Rationale:** Cross-language TS APIs typically don't surface the `UNSPECIFIED` zero-value.

### 24. `ListingTagType.LISTING_TAG_TYPE_*` — redundant enum prefixes

**Location:** `src/v1/model.ts:103-107`

```ts
export enum ListingTagType {
  LISTING_TAG_TYPE_UNSPECIFIED = 'LISTING_TAG_TYPE_UNSPECIFIED',
  LISTING_TAG_TYPE_LANGUAGE = 'LISTING_TAG_TYPE_LANGUAGE',
  LISTING_TAG_TYPE_TASK = 'LISTING_TAG_TYPE_TASK',
}
```

Same problem as #22.
- **Category:** 2, 18.
- **Suggested name:** `LANGUAGE`, `TASK`.
- **Rationale:** See #22.

### 25. `DeltaSharingRecipientType.DELTA_SHARING_RECIPIENT_TYPE_*` — redundant enum prefixes

**Location:** `src/v1/model.ts:64-67`

```ts
export enum DeltaSharingRecipientType {
  DELTA_SHARING_RECIPIENT_TYPE_DATABRICKS = 'DELTA_SHARING_RECIPIENT_TYPE_DATABRICKS',
  DELTA_SHARING_RECIPIENT_TYPE_OPEN = 'DELTA_SHARING_RECIPIENT_TYPE_OPEN',
}
```

Same problem as #22 and #24, plus the prefix here is 28 characters.
- **Category:** 2, 18.
- **Suggested name:** `DATABRICKS`, `OPEN`.
- **Rationale:** See #22.

### 26. `FileStatus.FILE_STATUS_*` — redundant enum prefixes

**Location:** `src/v1/model.ts:79-88`

```ts
export enum FileStatus {
  FILE_STATUS_PUBLISHED = 'FILE_STATUS_PUBLISHED',
  FILE_STATUS_STAGING = 'FILE_STATUS_STAGING',
  FILE_STATUS_SANITIZING = 'FILE_STATUS_SANITIZING',
  FILE_STATUS_SANITIZATION_FAILED = 'FILE_STATUS_SANITIZATION_FAILED',
}
```

Same problem as #22.
- **Category:** 2.
- **Suggested name:** `PUBLISHED`, `STAGING`, `SANITIZING`, `SANITIZATION_FAILED`.
- **Rationale:** See #22.

### 27. `PersonalizationRequestStatus.REQUEST_PENDING` — preposition-padded value with a workaround comment

**Location:** `src/v1/model.ts:128-134`

```ts
export enum PersonalizationRequestStatus {
  NEW = 'NEW',
  /** Pending already defined for ListingStatus */
  REQUEST_PENDING = 'REQUEST_PENDING',
  FULFILLED = 'FULFILLED',
  DENIED = 'DENIED',
}
```

The JSDoc explicitly says the value is named `REQUEST_PENDING` because `PENDING` is already defined for `ListingStatus`. But these are separate TS enum types; there is no collision (TypeScript enums are scoped). The renaming reveals a server-side or proto-side collision concern, leaked into the SDK as an awkward enum value. A user reading `PersonalizationRequestStatus.REQUEST_PENDING` and `ListingStatus.PENDING` will reasonably expect them to mean different things — they don't.
- **Category:** 18 (long enum values), 6 (misleading: name implies a different concept than `Pending`), 17 (inconsistent value patterns within file).
- **Suggested name:** `PENDING` (cross-enum collisions don't exist in TS).
- **Rationale:** Proto-side collision avoidance has no purpose in the TS surface.

### 28. `Cost` — single-word, ambiguous enum

**Location:** `src/v1/model.ts:47-50`

```ts
export enum Cost {
  FREE = 'FREE',
  PAID = 'PAID',
}
```

`Cost` is a generic noun. Inside `ListingDetail.cost: Cost` (line 473) the field is documented as "Whether the dataset is free or paid" — so the enum is really a *cost category* or *pricing tier*, not a price. The single-word name is collision-prone (cost appears in many domains) and doesn't communicate "is this paid?".
- **Category:** 1 (vague), 6 (misleading: implies price, means tier).
- **Suggested name:** `ListingPricingTier`, `PricingTier`, or `PriceCategory`.
- **Rationale:** A two-value boolean-like enum named `Cost` reads ambiguously.

### 29. `DataRefresh` — enum named after the noun, not the property

**Location:** `src/v1/model.ts:52-62`

```ts
export enum DataRefresh {
  NONE = 'NONE',
  SECOND = 'SECOND',
  MINUTE = 'MINUTE',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}
```

The enum is a *time unit / interval*, not a "data refresh". It's used as `DataRefreshInfo.unit: DataRefresh` (line 216) which the wire format calls `data_refresh.unit`. Reading `DataRefresh.HOURLY` requires knowing the value names a frequency, not a refresh event. Also note: values mix nouns (`SECOND`, `MINUTE`) with adjectives (`HOURLY`, `DAILY`, `WEEKLY`) within the same enum — `SECONDLY` and `MINUTELY` are not used.
- **Category:** 1 (vague: name is the noun, not the unit), 17 (inconsistent value form: nouns vs adverbs).
- **Suggested name:** `RefreshInterval`, `TimeUnit`, or `DataRefreshUnit`.
- **Rationale:** Self-documenting enum name; consistent value form.

### 30. `DataRefresh.NONE` vs `SECOND`/`MINUTE`/`HOURLY` — second is special

**Location:** `src/v1/model.ts:53-55`

```ts
NONE = 'NONE',
SECOND = 'SECOND',
MINUTE = 'MINUTE',
HOURLY = 'HOURLY',
```

`NONE` reads as "no refresh"; `SECOND` reads as "every second"; `HOURLY` reads as "every hour". The first two follow noun-naming; the third follows adverb-naming. Mixing the two within the same enum produces inconsistency.
- **Category:** 17 (inconsistent value form).
- **Suggested name:** Pick one convention. If "every X" adverbs are used, change `SECOND` → `SECONDLY`, `MINUTE` → `MINUTELY`, `NONE` → unchanged.
- **Rationale:** See #29.

### 31. `Category` — generic enum name with 23 values

**Location:** `src/v1/model.ts:21-45`

```ts
export enum Category {
  ADVERTISING_AND_MARKETING = 'ADVERTISING_AND_MARKETING',
  ...
  OPEN_SOURCE = 'OPEN_SOURCE',
}
```

`Category` is generic without a domain qualifier (compare with `AssetType`, `ListingType`, `MarketplaceFileType`). The other enums use a domain prefix; `Category` does not. Also, it's exported at the package root and a user importing `Category` doesn't know it's marketplace-scoped.
- **Category:** 1 (vague), 17 (inconsistent qualifier convention).
- **Suggested name:** `ListingCategory` (since the only usage is `ListingSummary.categories: Category[]` at line 528).
- **Rationale:** Cross-package collision avoidance and self-documentation.

### 32. `ListingDetail.size` — ambiguous unit

**Location:** `src/v1/model.ts:489-490`

```ts
/** size of the dataset in GB */
size?: number | undefined;
```

The JSDoc says "in GB", but the field name is just `size`. The wire field is `size`. A consumer not reading the doc-comment will assume bytes — wrong by a factor of 10^9. The pattern violates the unit-suffix rule (compare `secondsToRetrigger`, `pageSize`, etc. — but those also have problems).
- **Category:** 15 (generic field name losing meaning), 19 (underspecified).
- **Suggested name:** `sizeInGigabytes` or `sizeGb`.
- **Rationale:** Numeric fields without unit suffix are a bug magnet.

### 33. `ListingDetail.cost` typed as `Cost` (enum), but doc says price

**Location:** `src/v1/model.ts:472-473, 477-478`

```ts
/** Whether the dataset is free or paid */
cost?: Cost | undefined;
/**
 * What the pricing model is (e.g. paid, subscription, paid upfront); should only be present if cost is paid
 * TODO: Not used yet, should deprecate if we will never use it
 */
pricingModel?: string | undefined;
```

Two related fields: `cost: Cost (= 'FREE' | 'PAID')` and `pricingModel: string` (free-form). The first is the boolean-like cost tier, the second is the model. The second carries an inline `TODO` admitting it might never be used. The pair encodes "is it free?" and "if not, how is it priced?" but the relationship isn't enforced and the JSDoc says it "should only be present if cost is paid" — relationship in prose, not in types.
- **Category:** 1 (vague), 16 (field contradicts type domain — `cost` is a category, `pricingModel` is a string).
- **Suggested name:** Combine into one discriminated union: `pricing?: { $case: 'free' } | { $case: 'paid', model: string }`.
- **Rationale:** Type-system can encode the relationship the prose tries to.

### 34. `ListingDetail.geographicalCoverage` — long camelCase

**Location:** `src/v1/model.ts:470-471`

```ts
/** Which geo region the listing data is collected from */
geographicalCoverage?: string | undefined;
```

`geographicalCoverage` is 20 characters and uses the adjective form; `geographic` is more common in technical contexts (compare AWS `geographic_location` or Stripe `country_coverage`). The JSDoc says "geo region" which is a separate term entirely. The field is also `string` — there's no enum of valid regions.
- **Category:** 7 (overly verbose), 17 (inconsistent vocabulary with `providerRegion: RegionInfo`).
- **Suggested name:** `geoRegion`, `regions`, or `coverage`.
- **Rationale:** Shorter, matches sibling naming.

### 35. `ListingDetail.collectionDateStart` / `collectionDateEnd` — Date suffix on number

**Location:** `src/v1/model.ts:483-486`

```ts
/** The starting date timestamp for when the data spans */
collectionDateStart?: number | undefined;
/** The ending date timestamp for when the data spans */
collectionDateEnd?: number | undefined;
```

Field names include "Date" but the type is `number` (Unix timestamp). A consumer might assume an ISO string. Compare with other timestamp fields in the same file (`createdAt`, `updatedAt`, `publishedAt`) which use the `*At` suffix and are also `number` — but at least the `At` suffix isn't misleading about JS Date.
- **Category:** 16 (field name contradicts type), 17 (inconsistent suffix convention within file).
- **Suggested name:** `collectionStartAt` / `collectionEndAt`, or `collectionPeriodStart` / `collectionPeriodEnd`.
- **Rationale:** "Date" is ambiguous about underlying type; `At` is the existing in-file convention for Unix timestamps.

### 36. `ListingDetail.updateFrequency` vs `collectionGranularity` — same type, different naming

**Location:** `src/v1/model.ts:479-482`

```ts
/** How often data is updated */
updateFrequency?: DataRefreshInfo | undefined;
/** Smallest unit of time in the dataset */
collectionGranularity?: DataRefreshInfo | undefined;
```

Both are `DataRefreshInfo` (an interval), but one is named "frequency" and the other "granularity". A reader unfamiliar with the domain has to read both doc-comments to disambiguate. Also note that `DataRefreshInfo` is named after only one of its uses (`update_frequency`, which the wire calls "data_refresh") — the type is reused for collection granularity, which has nothing to do with refresh.
- **Category:** 6 (misleading: type name `DataRefresh` doesn't fit "collection granularity"), 17 (inconsistent vocabulary for the same concept).
- **Suggested name:** Rename type → `TimeInterval`; keep the field-level distinction.
- **Rationale:** Reuse a generic type name for a reusable type.

### 37. `ListingDetail.dataSource` — single-word vague field

**Location:** `src/v1/model.ts:487-488`

```ts
/** Where/how the data is sourced */
dataSource?: string | undefined;
```

`dataSource` reads as "the database / driver / connection" (compare `spring.datasource`, `Tableau data source`, JDBC `DataSource`). The JSDoc says it's a free-form "where/how the data is sourced" description — i.e. a human-readable provenance note. The name suggests a typed concept; the field is a string.
- **Category:** 6 (misleading: implies a structured concept), 1 (vague).
- **Suggested name:** `dataSourceDescription`, `dataProvenance`, or `dataOriginNote`.
- **Rationale:** Disambiguate from the more common DB-connection meaning of "data source".

### 38. `ListingDetail.tags: ListingTag[]` — typed-but-not-typed tags

**Location:** `src/v1/model.ts:493-508`

```ts
export interface ListingDetail {
  ...
  /**
   * Listing tags - Simple key value pair to annotate listings.
   * When should I use tags vs dedicated fields?
   * ...
   */
  tags?: ListingTag[] | undefined;
}

export interface ListingTag {
  /** Tag name (enum) */
  tagName?: ListingTagType | undefined;
  /** String representation of the tag value. Values should be string literals (no complex types) */
  tagValues?: string[] | undefined;
}

export enum ListingTagType {
  LISTING_TAG_TYPE_UNSPECIFIED = 'LISTING_TAG_TYPE_UNSPECIFIED',
  LISTING_TAG_TYPE_LANGUAGE = 'LISTING_TAG_TYPE_LANGUAGE',
  LISTING_TAG_TYPE_TASK = 'LISTING_TAG_TYPE_TASK',
}
```

The enum constrains tag *names* to 3 values (one of which is the `UNSPECIFIED` sentinel). Values are free-form strings. So a "tag" is really a `(name: enum, values: string[])` pair — that's not a tag in the colloquial sense (tag = single label). Compare with how `kubernetes` or `aws` model tags: `{ key: string, value: string }`. The marketplace model is `{ tagName: enum, tagValues: string[] }` — many-to-many.
- **Category:** 6 (misleading: name implies free-form labels, structure is constrained), 7 (`tagName` / `tagValues` add `tag` prefix repeated from type name).
- **Suggested name:** `ListingTag.name` / `ListingTag.values`; rename type to clarify (e.g. `ListingAttribute`).
- **Rationale:** "Tag" colloquially means a single label; this structure is closer to an attribute or property bag.

### 39. `ListingTag.tagName` / `ListingTag.tagValues` — type-prefix tautology

**Location:** `src/v1/model.ts:538-543`

```ts
export interface ListingTag {
  tagName?: ListingTagType | undefined;
  tagValues?: string[] | undefined;
}
```

Inside `ListingTag`, what else could `tagName` and `tagValues` be? `name` and `values` carry the same information.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `name`, `values`.
- **Rationale:** See #19.

### 40. `ContactInfo` — generic suffix on a single-purpose type

**Location:** `src/v1/model.ts:151-156`

```ts
/** contact info for the consumer requesting data or performing a listing installation */
export interface ContactInfo {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
}
```

`*Info` suffix is generic. The type is reused only via `PersonalizationRequest.contactInfo: ContactInfo` (line 548). Also note: `firstName` / `lastName` / `email` / `company` describes a person, not generic "contact info". `Person`, `Contact`, or `ConsumerContact` would be more specific.
- **Category:** 8 (redundant `Info` suffix), 1 (vague).
- **Suggested name:** `Contact` or `ConsumerContact`.
- **Rationale:** Cross-package, every `*Info` reads as "the info type"; specificity helps autocomplete.

### 41. `RegionInfo` — `Info` suffix on a single-purpose type

**Location:** `src/v1/model.ts:587-590`

```ts
export interface RegionInfo {
  cloud?: string | undefined;
  region?: string | undefined;
}
```

Same problem as #40. Also note: both fields are `string` — there's no enum of cloud providers or regions. The type name suggests rich info; the shape is two strings.
- **Category:** 8 (redundant `Info` suffix), 19 (underspecified — no enum constraints).
- **Suggested name:** `Region` (the cloud is implicitly part of the region in many SDKs) or `CloudRegion`.
- **Rationale:** Avoid `*Info` suffix; consider richer typing.

### 42. `ShareInfo` — `Info` suffix on a sharing concept

**Location:** `src/v1/model.ts:604-607`

```ts
export interface ShareInfo {
  name?: string | undefined;
  type?: ListingShareType | undefined;
}
```

Same problem as #40 and #41. Additionally, `ShareInfo.type: ListingShareType` reads as "the listing-share-type of the share" — three nouns to communicate "is this a sample or full share".
- **Category:** 8 (redundant `Info` suffix).
- **Suggested name:** `Share`, `ListingShare`.
- **Rationale:** See #40.

### 43. `ProviderInfo` — `Info` suffix on the canonical provider type

**Location:** `src/v1/model.ts:568-585`

```ts
export interface ProviderInfo {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  iconFilePath?: string | undefined;
  ...
}
```

Same problem as #40. The package also has `CreateProvider`, `GetProvider`, `UpdateProvider`, `DeleteProvider`, `ListProviders` — all referencing the noun `Provider`. The canonical full type is named `ProviderInfo`, but consumers would expect `Provider`.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent: the rest of the package uses `Provider` alone).
- **Suggested name:** `Provider`.
- **Rationale:** Consistency with method/request type names.

### 44. `DataRefreshInfo` — `Info` suffix on an interval type

**Location:** `src/v1/model.ts:214-217`

```ts
export interface DataRefreshInfo {
  interval?: number | undefined;
  unit?: DataRefresh | undefined;
}
```

Same problem as #40. Also note: the type is reused for `collectionGranularity` (#36), so the name `DataRefreshInfo` is wrong for half of its uses.
- **Category:** 8 (redundant `Info` suffix), 6 (misleading: name doesn't fit `collectionGranularity` use).
- **Suggested name:** `TimeInterval` (matches #36).
- **Rationale:** See #36.

### 45. `FileInfo` — `Info` suffix on the canonical file type

**Location:** `src/v1/model.ts:288-301`

```ts
export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  ...
}
```

Same problem as #40. The package also has `CreateFile`, `GetFile`, `DeleteFile`, `ListFiles` — all referencing the noun `File`. The canonical full type is named `FileInfo`, breaking the pattern.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent with siblings).
- **Suggested name:** `File`.
- **Rationale:** See #43.

### 46. `Listing.summary` / `Listing.detail` — opaque fields on the central type

**Location:** `src/v1/model.ts:456-460`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}
```

`Listing` is essentially `(id, summary, detail)` — a 3-field passthrough. The two interesting fields are named `summary` and `detail`, opaque on their own. A consumer with `listing.summary.name` and `listing.detail.description` has to navigate two sub-objects to reach the actual content.
- **Category:** 1 (vague), 11 (could be merged).
- **Suggested name:** Flatten or rename `summary` → `metadata`, `detail` → `content`.
- **Rationale:** See #10.

### 47. `ListingSummary.setting` — singular field name

**Location:** `src/v1/model.ts:521`

```ts
export interface ListingSummary {
  ...
  setting?: ListingSetting | undefined;
}
```

`setting` (singular) on a type that holds one knob is fine until the team adds a second — at which point `setting.visibility` and `setting.foo` become awkward. Convention is `settings` for a bag of knobs.
- **Category:** 9 (singular/plural).
- **Suggested name:** `settings: ListingSettings`.
- **Rationale:** Plural matches the conventional naming for a settings bag.

### 48. `ListingSummary.providerRegion` — region of what?

**Location:** `src/v1/model.ts:520`

```ts
providerRegion?: RegionInfo | undefined;
```

`PersonalizationRequest.consumerRegion` (line 547) uses the same `RegionInfo` type with the `consumer` qualifier. So the package has `providerRegion` and `consumerRegion` — two different qualifiers for the same `RegionInfo` type. Fine; flagged because the *type* name (`RegionInfo`) is unqualified, while every *use* requires a qualifier.
- **Category:** 1 (vague type, qualified field), 17 (qualifier convention not encoded in the type).
- **Suggested name:** No rename; this is the price of reusing `RegionInfo`.
- **Rationale:** Observation.

---

## Low severity

### 49. `unmarshal*Schema` / `marshal*Schema` exports — `Schema` suffix tautology

**Location:** `src/v1/model.ts:679, 690, 704, 713, 723, 735, 745, 755, 764, 774, 777, 781, 785, 789, 792, 818, 842, 862, 888, 898, 908, 917, 927, 937, 949, 963, 972, 983, 996, 1008, 1019, 1033, 1047, 1058, 1070, 1118, 1126, 1170, 1180, 1219, 1253, 1263, 1266, 1274, 1284, 1293, 1302, 1313, 1323, 1333, 1346, 1356, 1364, 1372, 1386, 1394, 1402, 1405, 1415, 1441, 1465, 1485, 1511, 1521, 1533, 1581, 1589, 1633, 1643, 1677, 1687, 1695, 1705, 1715, 1725, 1735, 1751, 1761`

```ts
export const unmarshalContactInfoSchema: z.ZodType<ContactInfo> = ...
export const unmarshalCreateExchangeFilterResponseSchema: ...
export const marshalProviderInfoSchema: z.ZodType = ...
```

~78 exports. Every name combines `marshal|unmarshal` + the type name + `Schema`. The `Schema` suffix is redundant — the `z.ZodType<X>` type annotation already says it's a Zod schema.
- **Category:** 8 (redundant `Schema` suffix), 7 (overly verbose).
- **Suggested name:** Drop `Schema` suffix: `unmarshalContactInfo`, `marshalProviderInfo`, etc.
- **Rationale:** Cross-package consistency / verbosity.

### 50. `unmarshal*_ResponseSchema` — proto-underscore + Schema-suffix combo

**Location:** `src/v1/model.ts:723, 735, 745, 755, 781, 785, 789, 908, 917, 927, 937, 949, 963, 1008, 1033, 1047, 1302, 1313, 1323, 1333`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateFile_ResponseSchema: z.ZodType<CreateFile_Response> = ...
```

Same as #1 but for the schema exports — 14 schemas embed the proto underscore plus the redundant `Schema` suffix. Each requires its own `// eslint-disable-next-line` comment.
- **Category:** 4 (underscore), 8 (Schema suffix), 14 (proto/Go-style names).
- **Suggested name:** `unmarshalCreateFileResponse`, etc.
- **Rationale:** Cascades from #1 and #49.

### 51. `Listing.id` vs `ListingDetail.fileIds: string[]` vs `ListingSummary.exchangeIds: string[]` — id pluralization

**Location:** `src/v1/model.ts:457, 467, 533`

Mixed singular/plural id fields:
- `Listing.id` — single id of the listing.
- `ListingDetail.fileIds: string[]` — many file ids.
- `ListingSummary.exchangeIds: string[]` — many exchange ids.
- `ListingSummary.providerId: string` — single provider id.
- `ListingSummary.createdById: number` — single id, type `number` (not `string` like other ids — see #52).

Within one transitive type (`Listing → ListingSummary | ListingDetail`), id fields use 4 different patterns: `id`, `*Id` (number), `*Id` (string), `*Ids` (string[]). Internal consistency check fails.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent suffix convention), 19 (underspecified — see #52).
- **Suggested name:** Pick one — `*Id`/`*Ids` is standard.
- **Rationale:** Observation; flagged for completeness.

### 52. `ListingSummary.createdById: number` and `updatedById: number` — id typed as number

**Location:** `src/v1/model.ts:530-531`

```ts
createdById?: number | undefined;
updatedById?: number | undefined;
```

User ids are typed as `number`. JS `number` only safely represents integers up to 2^53; Databricks user ids are 64-bit (int64). Same issue flagged in `grants` audit #13.
- **Category:** 19 (underspecified ID), 16 (field contradicts JS type domain).
- **Suggested name:** `createdById: string` or `bigint`.
- **Rationale:** Lossy representation; consistency with other id fields (all `string`).

### 53. `Visibility.PUBLIC` / `Visibility.PRIVATE` — binary enum named `Visibility`

**Location:** `src/v1/model.ts:136-139`

```ts
export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
```

Two-value enum. Could be a boolean (`isPublic?: boolean`) or a string literal type. The enum is fine; flagged for completeness.
- **Category:** 11 (trivially small enum).
- **Suggested name:** Could be `'public' | 'private'` literal union.
- **Rationale:** Observation.

### 54. `ListingShareType.SAMPLE` / `ListingShareType.FULL` — adjective vs noun

**Location:** `src/v1/model.ts:90-93`

```ts
export enum ListingShareType {
  SAMPLE = 'SAMPLE',
  FULL = 'FULL',
}
```

`SAMPLE` is a noun (a small portion of something); `FULL` is an adjective (complete). The convention is mixed.
- **Category:** 17 (inconsistent value form).
- **Suggested name:** `SAMPLE` / `COMPLETE` (both nouns) or `PARTIAL` / `FULL` (both adjectives).
- **Rationale:** Internal consistency.

### 55. `ListingType.STANDARD` / `ListingType.PERSONALIZED` — adjective values

**Location:** `src/v1/model.ts:109-112`

```ts
export enum ListingType {
  STANDARD = 'STANDARD',
  PERSONALIZED = 'PERSONALIZED',
}
```

Two adjective values. Fine. Flagged because the package also has `PersonalizationRequest` (line 545) — the noun for `PERSONALIZED` mode. Cross-reference unclear.
- **Category:** Observation.
- **Suggested name:** No rename.
- **Rationale:** Internal consistency check.

### 56. `ProviderInfo.iconFilePath` vs `iconFileId` — id and path co-located

**Location:** `src/v1/model.ts:572, 580`

```ts
iconFilePath?: string | undefined;
...
iconFileId?: string | undefined;
```

Same icon represented two ways — `iconFilePath` (a URL or storage path) and `iconFileId` (a Marketplace file id). The pairing repeats with `darkModeIconFileId` and `darkModeIconFilePath` (lines 583-584). No doc explains when to use which or whether one is derived from the other.
- **Category:** 12 (duplicate concept), 17 (inconsistent — the relationship is implicit).
- **Suggested name:** No rename; flag for doc clarification.
- **Rationale:** Observation.

### 57. `ProviderInfo.darkModeIconFileId` / `darkModeIconFilePath` — naming for a UI mode

**Location:** `src/v1/model.ts:583-584`

```ts
darkModeIconFileId?: string | undefined;
darkModeIconFilePath?: string | undefined;
```

The `darkMode` prefix encodes a UI rendering mode in a server-side data type. This is wire-locked but flagged because it injects a presentation concern into a domain model. `iconDarkFileId` reads more like an asset variant.
- **Category:** 17 (presentation-domain leak).
- **Suggested name:** `iconDarkFileId` / `iconDarkFilePath` or just `darkIcon*`.
- **Rationale:** Observation.

### 58. Method docstring inconsistency — `client.ts`

**Location:** `src/v1/client.ts:178, 207, 232, 261, 287, 313, 339, 371, 396, 424, 449, 474, 499, 524, 549, 577, 602, 656, 713, 738, 795, 846, 903, 961, 1018, 1046, 1097, 1125, 1151, 1180, 1206, 1238, 1264`

```ts
/** Associate an exchange with a listing */
/** Create an exchange */
/** Add an exchange filter. */
/** Create a file. Currently, only provider icons and attached notebooks are supported. */
/** Create a new listing */
/** This removes a listing from marketplace. */
/** Get provider analytics dashboard. */
```

Inconsistent docstring style:
- Mix of trailing period ("Add an exchange filter.", "Create a file. ...") and no period ("Create an exchange", "Create a new listing").
- Mix of imperative verbs ("Create", "Get", "Delete") and full sentences ("This removes a listing from marketplace.").
- "Get provider analytics dashboard" appears on `listProviderAnalyticsDashboard` (line 1018) — verb mismatch (it's a list method but the doc says "Get").
- "This removes a listing from marketplace" appears on `deleteExchange` (line 371) — text describes the wrong concept (says "listing", method is `deleteExchange`).
- **Category:** 17 (inconsistent action verbs / doc style), 6 (misleading: docstring text contradicts method name).
- **Suggested name:** No rename; flag for doc consistency.
- **Rationale:** Observation.

---

## Observations

### 59. v1-only audit
The marketplaces package has only v1 today (`packages/marketplaces/src/v1/`), so no v1↔v2 comparison to make.

### 60. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:147`
Same generic-name issue flagged in other audits — every package emits a `PACKAGE_SEGMENT` constant for User-Agent assembly. Cross-package consistency observation only.
- **Category:** 1 (vague), 15 (generic name).

### 61. `flattenQueryParams` — `src/v1/utils.ts:123`
The helper is used by `client.ts:911-915` to flatten the `file_parent` nested query object in `listFiles`. Most other packages emit this helper unused; here it's actually used. Cross-package consistency observation.
- **Category:** Observation.

### 62. `readAll` — `src/v1/utils.ts:40`
Internal helper, same as in other packages. Generic name (`io.ReadAll` Go idiom). Could be `readStreamToEnd` or `bufferStream`.
- **Category:** 1 (vague), 14 (Go-style name).

### 63. `parseResponse` / `marshalRequest` verb asymmetry — `src/v1/utils.ts:113, 119`
`parseResponse` (decode) is the inverse of `marshalRequest` (encode); two different verbs for opposite operations within one file. The model file uses `marshal*` / `unmarshal*` consistently — `parseResponse` is the odd one out.
- **Category:** 17 (inconsistent action verbs).

### 64. `HttpCallOptions` — `src/v1/utils.ts:15`
Yet another `Options` suffix; `Options` (from `@databricks/sdk-core/api`) and `CallOptions` are also in scope. Could be `HttpCallContext`. Cross-package consistency observation.
- **Category:** 1 (vague suffix), 17 (inconsistent).

### 65. Exported but not in `index.ts`
`index.ts` exports types but not the `*_Response` schemas, marshal/unmarshal functions, or the `*_Response` types fully (note: `CreateFile_Response` is exported via `index.ts:32` — so the underscore wart reaches the public surface). The fact that consumers do see the underscore form via the index export means every change to remove the underscore would be a breaking change.
- **Category:** Observation.
