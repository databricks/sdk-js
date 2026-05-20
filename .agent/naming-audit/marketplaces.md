# Naming Audit: marketplaces

**Path:** `packages/marketplaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Marketplace — provider-side and exchange-side operations for managing **listings** (the marketplace storefront entry for a dataset, model, notebook, app, MCP, partner integration, or git repo), **providers** (the publisher account), **exchanges** (curated, scoped collections of listings, including exchange filters that scope visibility by metastore), **personalization requests** (consumer-side requests for tailored access), **files** attached to listings/providers (icons, embedded notebooks, embedded markdown, commit drawdown attachments), and a separate **provider analytics dashboard** sub-resource (a Lakeview-backed dashboard for provider-side analytics).
**Total weird names flagged:** 47

## Summary
| Severity | Count |
| --- | --- |
| High | 14 |
| Medium | 29 |
| Low | 8 |
| Observation | 6 |

The marketplaces package is one of the more naming-distressed surfaces in the SDK. The dominant problem is the **inconsistent request-type convention** within a single file: some request types follow the verb-shaped Go style (`CreateFile`, `DeleteFile`, `GetListing`, `GetListings`, `UpdateListing`, `ListFiles`, `CreateProvider`, `UpdateProvider`, `DeleteProvider`, `ListProviders`, `CreateProviderAnalyticsDashboard`, `UpdateProviderAnalyticsDashboard`, `GetLatestVersionProviderAnalyticsDashboard`, `ListProviderAnalyticsDashboard`, `GetPersonalizationRequestsForProvider`, `UpdatePersonalizationRequestStatus`) while others follow the more idiomatic `*Request`/`*Response` suffix (`CreateExchangeRequest`, `DeleteExchangeRequest`, `GetExchangeRequest`, `UpdateExchangeRequest`, `ListExchangesRequest`, `CreateExchangeFilterRequest`, `DeleteExchangeFilterRequest`, `UpdateExchangeFilterRequest`, `ListExchangeFiltersRequest`, `AddExchangeForListingRequest`, `RemoveExchangeForListingRequest`, `ListExchangesForListingRequest`, `ListListingsForExchangeRequest`) — split almost perfectly down the provider/exchange axis but not advertised that way. Other notable issues are the overloaded vocabulary triad **Listing / Exchange / Provider** without disambiguation (an exchange filter is a metastore-id allowlist, an exchange listing is a join row between an exchange and a listing, a listing detail is the body of a listing, and a personalization request is a consumer-side action targeting a listing), the cryptic plural irregularities around the noun `Listings` (the `GetListings` request and `GetListings_Response` payload field both use `listings`, while `CreateListing` and `DeleteListing` use the singular and `ListListingsForExchange` re-introduces the plural with a different field name `exchangeListings`), and several typo-grade or wire-leak names (`termOfServiceLink` missing the plural-`s` from "Terms of Service", `MarketplaceFileType.COMMIT_DRAWDOWN_REQUEST_ATTACHMENT` exposing an internal commit-drawdown workflow with a 33-character enum value, and the field `isFromLighthouse` referencing the internal-codename "Lighthouse" service in a public type).

---

## High severity

### 1. Verb-shaped request types — 14 occurrences

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
- **Category:** 7 (overly verbose / structural), 14 (Go-style request-type naming), 17 (inconsistent action verbs within file — see #2).
- **Suggested name:** `CreateFileRequest`, `CreateListingRequest`, `GetListingRequest`, `ListProvidersRequest`, etc.
- **Rationale:** See #2.

### 2. Two competing request-type naming conventions in one file

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
- **Suggested name:** Pick one — and `*Request` is the rest-of-SDK norm. Cascade with #1.
- **Rationale:** A single ergonomic package should not require users to memorize which sub-domain uses which type-naming scheme.

### 3. `Listing` — ambiguous central type

**Location:** `src/v1/model.ts:456`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}
```

`Listing` is the central noun of the package, but the name has two unrelated English meanings: a *marketplace listing* (a storefront entry) and a *list operation* (the verb "to list", noun "a listing of items"). The package frequently uses both meanings within a single line:
- `getListings(req: GetListings)` — method name uses the verb sense ("get the listings"), the type name uses the noun sense (a "GetListings" request that returns marketplace listings).
- `ListListingsForExchangeRequest` reads as "list the listings for exchange" — the first `List` is the verb, the second `Listings` is the noun.
- `ExchangeListing` (line 278) is a join-row type — neither a storefront listing nor a list-operation but a third concept ("a listing in an exchange").

The triple overload is unavoidable given the domain word but the SDK does not disambiguate (e.g. by renaming join rows to `ExchangeListingLink` or `ExchangeMembership`).
- **Category:** 1 (vague), 12 (duplicate concepts), 15 (overloaded vocabulary).
- **Suggested name:** Keep `Listing` for the noun; rename `ExchangeListing` → `ExchangeListingLink` / `ListingExchangeMembership`; rename `GetListings` → `ListListingsRequest` (cascade with #1 and #2 — but note that gives `ListListingsRequest`, which is itself a stutter; the right fix may be `ListMarketplaceListingsRequest` or simpler `ListListings`).
- **Rationale:** "Listing" has multiple senses; the SDK uses all three; the API can mitigate this by giving the *join row* a less ambiguous name.

### 4. `ExchangeListing` — overloaded "listing" inside the type name

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
- **Rationale:** See #3.

### 5. `AddExchangeForListingRequest` / `RemoveExchangeForListingRequest` — for-Listing word-order

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

### 6. `AddExchangeForListingResponse.exchangeForListing` — Greek-letter field name

**Location:** `src/v1/model.ts:146-148`

```ts
export interface AddExchangeForListingResponse {
  exchangeForListing?: ExchangeListing | undefined;
}
```

The field name `exchangeForListing` is a noun phrase that mirrors the request verb ("Add Exchange For Listing"). But the value is an `ExchangeListing` (the join-row type). Just naming the field `exchangeListing` would match the type name and remove the "for" preposition that doesn't add information.
- **Category:** 7 (overly verbose), 20 (type-suffix tautology — field name doesn't quite match its type name).
- **Suggested name:** `exchangeListing` (matches the underlying type).
- **Rationale:** See #5.

### 7. `MarketplaceFileType.COMMIT_DRAWDOWN_REQUEST_ATTACHMENT` — 33-character internal-domain enum value

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

### 8. `PersonalizationRequest.isFromLighthouse` — internal codename leak

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

### 9. `ListingSummary` vs `ListingDetail` — Summary / Detail as separate types

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

### 10. `ListingSummary` — 20-field "summary"

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
- **Rationale:** See #9.

### 11. `ProviderInfo.termOfServiceLink` — singular "term"

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

### 12. `FileParent` — abstract container with weak typing

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

### 13. `FileParent.fileParentType` — type-suffix tautology

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

### 14. `FileInfo.marketplaceFileType` — package-name prefix in a field

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

---

## Medium severity

### 15. `Client` — generic top-level class name

**Location:** `src/v1/client.ts:152`

```ts
export class Client { ... }
```

Top-level export named just `Client`. Every generated package exports a `Client` class with the same name; importing two requires aliasing (`import { Client as MarketplacesClient } from '@databricks/sdk-marketplaces/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `MarketplacesClient`.
- **Rationale:** Service-prefixed client class names are standard across `@aws-sdk/*`, `@google-cloud/*`, `@azure/*`.

### 16. `Exchange.linkedListings` — verb tense and ambiguity

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

### 17. `ExchangeFilter.filterValue` / `ExchangeFilter.filterType` — field name = type prefix

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

### 18. `ExchangeFilterType.GLOBAL_METASTORE_ID` — single-value enum

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

### 19. `MarketplaceFileType.APP` — three-letter generic value

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

### 20. `PersonalizationRequestStatus.REQUEST_PENDING` — preposition-padded value with a workaround comment

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

### 21. `Cost` — single-word, ambiguous enum

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

### 22. `DataRefresh` — enum named after the noun, not the property

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

### 23. `DataRefresh.NONE` vs `SECOND`/`MINUTE`/`HOURLY` — second is special

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
- **Rationale:** See #22.

### 24. `Category` — generic enum name with 23 values

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

### 25. `ListingDetail.size` — ambiguous unit

**Location:** `src/v1/model.ts:489-490`

```ts
/** size of the dataset in GB */
size?: number | undefined;
```

The JSDoc says "in GB", but the field name is just `size`. The wire field is `size`. A consumer not reading the doc-comment will assume bytes — wrong by a factor of 10^9. The pattern violates the unit-suffix rule (compare `secondsToRetrigger`, `pageSize`, etc. — but those also have problems).
- **Category:** 15 (generic field name losing meaning), 19 (underspecified).
- **Suggested name:** `sizeInGigabytes` or `sizeGb`.
- **Rationale:** Numeric fields without unit suffix are a bug magnet.

### 26. `ListingDetail.cost` typed as `Cost` (enum), but doc says price

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

### 27. `ListingDetail.geographicalCoverage` — long camelCase

**Location:** `src/v1/model.ts:470-471`

```ts
/** Which geo region the listing data is collected from */
geographicalCoverage?: string | undefined;
```

`geographicalCoverage` is 20 characters and uses the adjective form; `geographic` is more common in technical contexts (compare AWS `geographic_location` or Stripe `country_coverage`). The JSDoc says "geo region" which is a separate term entirely. The field is also `string` — there's no enum of valid regions.
- **Category:** 7 (overly verbose), 17 (inconsistent vocabulary with `providerRegion: RegionInfo`).
- **Suggested name:** `geoRegion`, `regions`, or `coverage`.
- **Rationale:** Shorter, matches sibling naming.

### 28. `ListingDetail.collectionDateStart` / `collectionDateEnd` — Date suffix on number

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

### 29. `ListingDetail.updateFrequency` vs `collectionGranularity` — same type, different naming

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

### 30. `ListingDetail.dataSource` — single-word vague field

**Location:** `src/v1/model.ts:487-488`

```ts
/** Where/how the data is sourced */
dataSource?: string | undefined;
```

`dataSource` reads as "the database / driver / connection" (compare `spring.datasource`, `Tableau data source`, JDBC `DataSource`). The JSDoc says it's a free-form "where/how the data is sourced" description — i.e. a human-readable provenance note. The name suggests a typed concept; the field is a string.
- **Category:** 6 (misleading: implies a structured concept), 1 (vague).
- **Suggested name:** `dataSourceDescription`, `dataProvenance`, or `dataOriginNote`.
- **Rationale:** Disambiguate from the more common DB-connection meaning of "data source".

### 31. `ListingDetail.tags: ListingTag[]` — typed-but-not-typed tags

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
  LISTING_TAG_TYPE_LANGUAGE = 'LISTING_TAG_TYPE_LANGUAGE',
  LISTING_TAG_TYPE_TASK = 'LISTING_TAG_TYPE_TASK',
}
```

The enum constrains tag *names* to 2 values. Values are free-form strings. So a "tag" is really a `(name: enum, values: string[])` pair — that's not a tag in the colloquial sense (tag = single label). Compare with how `kubernetes` or `aws` model tags: `{ key: string, value: string }`. The marketplace model is `{ tagName: enum, tagValues: string[] }` — many-to-many.
- **Category:** 6 (misleading: name implies free-form labels, structure is constrained), 7 (`tagName` / `tagValues` add `tag` prefix repeated from type name).
- **Suggested name:** `ListingTag.name` / `ListingTag.values`; rename type to clarify (e.g. `ListingAttribute`).
- **Rationale:** "Tag" colloquially means a single label; this structure is closer to an attribute or property bag.

### 32. `ListingTag.tagName` / `ListingTag.tagValues` — type-prefix tautology

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
- **Rationale:** See #17.

### 33. `ContactInfo` — generic suffix on a single-purpose type

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

### 34. `RegionInfo` — `Info` suffix on a single-purpose type

**Location:** `src/v1/model.ts:587-590`

```ts
export interface RegionInfo {
  cloud?: string | undefined;
  region?: string | undefined;
}
```

Same problem as #33. Also note: both fields are `string` — there's no enum of cloud providers or regions. The type name suggests rich info; the shape is two strings.
- **Category:** 8 (redundant `Info` suffix), 19 (underspecified — no enum constraints).
- **Suggested name:** `Region` (the cloud is implicitly part of the region in many SDKs) or `CloudRegion`.
- **Rationale:** Avoid `*Info` suffix; consider richer typing.

### 35. `ShareInfo` — `Info` suffix on a sharing concept

**Location:** `src/v1/model.ts:604-607`

```ts
export interface ShareInfo {
  name?: string | undefined;
  type?: ListingShareType | undefined;
}
```

Same problem as #33 and #34. Additionally, `ShareInfo.type: ListingShareType` reads as "the listing-share-type of the share" — three nouns to communicate "is this a sample or full share".
- **Category:** 8 (redundant `Info` suffix).
- **Suggested name:** `Share`, `ListingShare`.
- **Rationale:** See #33.

### 36. `ProviderInfo` — `Info` suffix on the canonical provider type

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

Same problem as #33. The package also has `CreateProvider`, `GetProvider`, `UpdateProvider`, `DeleteProvider`, `ListProviders` — all referencing the noun `Provider`. The canonical full type is named `ProviderInfo`, but consumers would expect `Provider`.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent: the rest of the package uses `Provider` alone).
- **Suggested name:** `Provider`.
- **Rationale:** Consistency with method/request type names.

### 37. `DataRefreshInfo` — `Info` suffix on an interval type

**Location:** `src/v1/model.ts:214-217`

```ts
export interface DataRefreshInfo {
  interval?: number | undefined;
  unit?: DataRefresh | undefined;
}
```

Same problem as #33. Also note: the type is reused for `collectionGranularity` (#29), so the name `DataRefreshInfo` is wrong for half of its uses.
- **Category:** 8 (redundant `Info` suffix), 6 (misleading: name doesn't fit `collectionGranularity` use).
- **Suggested name:** `TimeInterval` (matches #29).
- **Rationale:** See #29.

### 38. `FileInfo` — `Info` suffix on the canonical file type

**Location:** `src/v1/model.ts:288-301`

```ts
export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  ...
}
```

Same problem as #33. The package also has `CreateFile`, `GetFile`, `DeleteFile`, `ListFiles` — all referencing the noun `File`. The canonical full type is named `FileInfo`, breaking the pattern.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent with siblings).
- **Suggested name:** `File`.
- **Rationale:** See #36.

### 39. `Listing.summary` / `Listing.detail` — opaque fields on the central type

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
- **Rationale:** See #9.

### 40. `ListingSummary.setting` — singular field name

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

### 41. `ListingSummary.providerRegion` — region of what?

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

### 42. `Listing.id` vs `ListingDetail.fileIds: string[]` vs `ListingSummary.exchangeIds: string[]` — id pluralization

**Location:** `src/v1/model.ts:457, 467, 533`

Mixed singular/plural id fields:
- `Listing.id` — single id of the listing.
- `ListingDetail.fileIds: string[]` — many file ids.
- `ListingSummary.exchangeIds: string[]` — many exchange ids.
- `ListingSummary.providerId: string` — single provider id.
- `ListingSummary.createdById: number` — single id, type `number` (not `string` like other ids — see #43).

Within one transitive type (`Listing → ListingSummary | ListingDetail`), id fields use 4 different patterns: `id`, `*Id` (number), `*Id` (string), `*Ids` (string[]). Internal consistency check fails.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent suffix convention), 19 (underspecified — see #43).
- **Suggested name:** Pick one — `*Id`/`*Ids` is standard.
- **Rationale:** Observation; flagged for completeness.

### 43. `ListingSummary.createdById: number` and `updatedById: number` — id typed as number

**Location:** `src/v1/model.ts:530-531`

```ts
createdById?: number | undefined;
updatedById?: number | undefined;
```

User ids are typed as `number`. JS `number` only safely represents integers up to 2^53; Databricks user ids are 64-bit (int64). Same issue flagged in `grants` audit #13.
- **Category:** 19 (underspecified ID), 16 (field contradicts JS type domain).
- **Suggested name:** `createdById: string` or `bigint`.
- **Rationale:** Lossy representation; consistency with other id fields (all `string`).

### 44. `Visibility.PUBLIC` / `Visibility.PRIVATE` — binary enum named `Visibility`

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

### 45. `ListingShareType.SAMPLE` / `ListingShareType.FULL` — adjective vs noun

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

### 46. `ListingType.STANDARD` / `ListingType.PERSONALIZED` — adjective values

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

### 47. `ProviderInfo.iconFilePath` vs `iconFileId` — id and path co-located

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

### 48. `ProviderInfo.darkModeIconFileId` / `darkModeIconFilePath` — naming for a UI mode

**Location:** `src/v1/model.ts:583-584`

```ts
darkModeIconFileId?: string | undefined;
darkModeIconFilePath?: string | undefined;
```

The `darkMode` prefix encodes a UI rendering mode in a server-side data type. This is wire-locked but flagged because it injects a presentation concern into a domain model. `iconDarkFileId` reads more like an asset variant.
- **Category:** 17 (presentation-domain leak).
- **Suggested name:** `iconDarkFileId` / `iconDarkFilePath` or just `darkIcon*`.
- **Rationale:** Observation.

### 49. Method docstring inconsistency — `client.ts`

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

### 50. v1-only audit
The marketplaces package has only v1 today (`packages/marketplaces/src/v1/`), so no v1↔v2 comparison to make.

### 51. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:147`
Same generic-name issue flagged in other audits — every package emits a `PACKAGE_SEGMENT` constant for User-Agent assembly. Cross-package consistency observation only.
- **Category:** 1 (vague), 15 (generic name).

### 52. `flattenQueryParams` — `src/v1/utils.ts:123`
The helper is used by `client.ts:911-915` to flatten the `file_parent` nested query object in `listFiles`. Most other packages emit this helper unused; here it's actually used. Cross-package consistency observation.
- **Category:** Observation.

### 53. `readAll` — `src/v1/utils.ts:40`
Internal helper, same as in other packages. Generic name (`io.ReadAll` Go idiom). Could be `readStreamToEnd` or `bufferStream`.
- **Category:** 1 (vague), 14 (Go-style name).

### 54. `HttpCallOptions` — `src/v1/utils.ts:15`
Yet another `Options` suffix; `Options` (from `@databricks/sdk-core/api`) and `CallOptions` are also in scope. Could be `HttpCallContext`. Cross-package consistency observation.
- **Category:** 1 (vague suffix), 17 (inconsistent).

### 55. AssetType/ListingTagType/DeltaSharingRecipientType/FileStatus enum prefixes — generator-only

These enum types use the proto convention of prefixing every value with the type name (e.g. `AssetType.ASSET_TYPE_GIT_REPO`, `FileStatus.FILE_STATUS_PUBLISHED`). Per the generator-only recommendations in `_SUMMARY.md`, redundant enum prefixes are tracked at the template level rather than per-package.
- **Category:** Observation.
