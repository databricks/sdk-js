# Naming Audit: marketplaces

**Path:** `packages/marketplaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Marketplace — provider-side and exchange-side operations for managing **listings** (the marketplace storefront entry for a dataset, model, notebook, app, MCP, partner integration, or git repo), **providers** (the publisher account), **exchanges** (curated, scoped collections of listings, including exchange filters that scope visibility by metastore), **personalization requests** (consumer-side requests for tailored access), **files** attached to listings/providers (icons, embedded notebooks, embedded markdown, commit drawdown attachments), and a separate **provider analytics dashboard** sub-resource (a Lakeview-backed dashboard for provider-side analytics).
**Total weird names flagged:** 32 (32 still present, 0 newly fixed, 0 superseded).

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 18 |
| Low | 5 |
| Observation | 1 |

The marketplaces package remains one of the more naming-distressed surfaces in the SDK, though the dominant pre-existing problem — **inconsistent request-type naming** across the package — has been resolved by uniformly applying the `*Request`/`*Response` suffix to every operation type. Notable issues remaining include the overloaded vocabulary triad **Listing / Exchange / Provider** without disambiguation (an exchange filter is a metastore-id allowlist, an exchange listing is a join row between an exchange and a listing, a listing detail is the body of a listing, and a personalization request is a consumer-side action targeting a listing), the cryptic plural irregularities around the noun `Listings` (the `GetListingsRequest` and its proto-nested `_Response` payload field both use `listings`, while `CreateListingRequest` and `DeleteListingRequest` use the singular and `ListListingsForExchange` re-introduces the plural with a different field name `exchangeListings`), and the field `isFromLighthouse` referencing the internal-codename "Lighthouse" service in a public type.

---

## High severity

### 1. `Listing` — ambiguous central type

**Location:** `src/v1/model.ts:652`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}
```

`Listing` is the central noun of the package, but the name has two unrelated English meanings: a *marketplace listing* (a storefront entry) and a *list operation* (the verb "to list", noun "a listing of items"). The package frequently uses both meanings within a single line:
- `getListings(req: GetListingsRequest)` — method name uses the verb sense ("get the listings"), the type name uses the noun sense (a "GetListings" request that returns marketplace listings).
- `ListListingsForExchangeRequest` reads as "list the listings for exchange" — the first `List` is the verb, the second `Listings` is the noun.
- `ExchangeListing` (line 320) is a join-row type — neither a storefront listing nor a list-operation but a third concept ("a listing in an exchange").

The triple overload is unavoidable given the domain word but the SDK does not disambiguate (e.g. by renaming join rows to `ExchangeListingLink` or `ExchangeMembership`).
- **Category:** 1 (vague), 12 (duplicate concepts), 15 (overloaded vocabulary).
- **Suggested name:** Keep `Listing` for the noun; rename `ExchangeListing` → `ExchangeListingLink` / `ListingExchangeMembership`.
- **Rationale:** "Listing" has multiple senses; the SDK uses all three; the API can mitigate this by giving the *join row* a less ambiguous name.

### 2. `ExchangeListing` — overloaded "listing" inside the type name

**Location:** `src/v1/model.ts:320`

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

The type is a join row connecting an exchange to a listing (with denormalized names). Named `ExchangeListing` it parses as either "a listing of type Exchange" (no — exchanges and listings are distinct) or "the exchange-side view of a listing" (no — both sides are denormalized into the same row) or "a listing exposed in the exchange" (closer, but the type is really the *link*, not the listing itself). The `Exchange.linkedListings: ExchangeListing[]` field at line 305 makes the relationship visible but does not clarify the name.
- **Category:** 1 (vague), 6 (misleading: looks like an inheritance from `Listing`), 12 (overloaded with `Listing`).
- **Suggested name:** `ExchangeListingLink`, `ExchangeMembership`, `ListingExchangeAssociation`.
- **Rationale:** See #1.

### 3. `AddExchangeForListingRequest` / `RemoveExchangeForListingRequest` — for-Listing word-order

**Location:** `src/v1/model.ts:142, 796`

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
- **Suggested name:** `LinkListingToExchangeRequest` / `UnlinkListingFromExchangeRequest` (or `*ExchangeListingRequest`).
- **Rationale:** Mirror the underlying object (`ExchangeListing`) rather than the verb phrase.

### 4. `PersonalizationRequest.isFromLighthouse` — internal codename leak

**Location:** `src/v1/model.ts:767`

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

### 5. `ListingSummary` vs `ListingDetail` — Summary / Detail as separate types

**Location:** `src/v1/model.ts:719, 658`

```ts
export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}

export interface ListingSummary { /* 20 fields */ }
export interface ListingDetail  { /* 18 fields */ }
```

The split into `Summary` and `Detail` looks like a "list view vs. detail view" distinction (where `Summary` is what gets returned in list endpoints and `Detail` is the full payload). But both are bundled into a single `Listing` and both come back from `getListing` and `listListings`. The convention is meaningful in REST APIs that ship two read-shapes (e.g. GitHub's `Repository` vs `MinimalRepository`), but here both types are always present on the same `Listing`. The naming implies a contract the API doesn't honor.
- **Category:** 6 (misleading — names imply contract that isn't enforced), 12 (duplicate concept of "the listing"), 11 (could be merged).
- **Suggested name:** `ListingMetadata` (for what is currently `ListingSummary`) and `ListingContent` (for `ListingDetail`); or merge into a single `Listing` type.
- **Rationale:** The "Summary / Detail" lexicon promises a slim/fat split that the API doesn't actually provide.

### 6. `ListingSummary` — 20-field "summary"

**Location:** `src/v1/model.ts:719-740`

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
- **Rationale:** See #5.

### 7. `FileParent` — abstract container with weak typing

**Location:** `src/v1/model.ts:345-349`

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

### 8. `*Request_Response` — proto-nested-message pattern leaked into public types

**Location:** `src/v1/model.ts:203, 214, 243, 252, 280, 287, 294, 386, 410, 444, 454, 474, 484, 602, 622, 635, 926, 939, 954, 968`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateFileRequest_Response {
  fileInfo?: FileInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteFileRequest_Response {}

// ...and 18 others with the same shape.
```

Twenty response types follow the proto-IDL convention `message <Op>Request { message Response { ... } }`, which generates `<Op>Request_Response` in flat code-gen. The full list: `CreateFileRequest_Response`, `CreateListingRequest_Response`, `CreateProviderAnalyticsDashboardRequest_Response`, `CreateProviderRequest_Response`, `DeleteFileRequest_Response`, `DeleteListingRequest_Response`, `DeleteProviderRequest_Response`, `GetFileRequest_Response`, `GetLatestVersionProviderAnalyticsDashboardRequest_Response`, `GetListingRequest_Response`, `GetListingsRequest_Response`, `GetPersonalizationRequestsForProviderRequest_Response`, `GetProviderRequest_Response`, `ListFilesRequest_Response`, `ListProviderAnalyticsDashboardRequest_Response`, `ListProvidersRequest_Response`, `UpdateListingRequest_Response`, `UpdatePersonalizationRequestStatusRequest_Response`, `UpdateProviderAnalyticsDashboardRequest_Response`, `UpdateProviderRequest_Response`.

Every one carries an `eslint-disable @typescript-eslint/naming-convention -- Proto-style nested message name.` comment, which is the codegen explicitly acknowledging that the underscore identifier exists only because of the proto serialization shape. The same package uses the underscore-free `*Response` form (`CreateExchangeResponse`, `GetExchangeResponse`, `UpdateExchangeFilterResponse`, etc.) for operations whose proto definition declares a sibling response message rather than a nested one — so the package ships **both** conventions side-by-side, and the choice between them is dictated by the proto IDL, not by anything visible at the TS surface.
- **Category:** Proto suffix/infix — `Foo_PublicRequest`-style paired-name leak (`Request_Response` underscore identifier).
- **Suggested name:** Drop the underscore: `CreateFileResponse`, `DeleteFileResponse`, `GetListingResponse`, `ListProvidersResponse`, etc.; for empty-body cases (`Delete*Request_Response`, `Update*Request_Response` where the body is `{}`), have the corresponding client method return `void` and drop the type entirely.
- **Rationale:** The underscore in `<Op>Request_Response` is the protobuf service convention (`<Service>.<Op>Request.Response` in proto IDL); nothing in the JS SDK contract demands it. TS callers see two unrelated naming styles for the same concept (the "Response" payload), with the choice driven by an upstream proto definition they cannot see.

---

## Medium severity

### 9. `Client` — generic top-level class name

**Location:** `src/v1/client.ts:210`

```ts
export class Client { ... }
```

Top-level export named just `Client`. Every generated package exports a `Client` class with the same name; importing two requires aliasing (`import { Client as MarketplacesClient } from '@databricks/sdk-marketplaces/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `MarketplacesClient`.
- **Rationale:** Service-prefixed client class names are standard across `@aws-sdk/*`, `@google-cloud/*`, `@azure/*`.

### 10. `ExchangeFilterType.GLOBAL_METASTORE_ID` — single-value enum

**Location:** `src/v1/model.ts:68-70`

```ts
export enum ExchangeFilterType {
  GLOBAL_METASTORE_ID = 'GLOBAL_METASTORE_ID',
}
```

An enum with a single member. Typically a sign that the API anticipates future filter types but only has one today — but in TypeScript a single-value enum is just `'GLOBAL_METASTORE_ID'`. The naming is fine; the type's existence is the smell.
- **Category:** 11 (trivially small enum), 1 (over-engineered for one value).
- **Suggested name:** Could be a string literal type until a second value lands.
- **Rationale:** TS allows narrowing without enums (`type ExchangeFilterType = 'GLOBAL_METASTORE_ID'`).

### 11. `MarketplaceFileType.APP` — three-letter generic value

**Location:** `src/v1/model.ts:126`

```ts
export enum MarketplaceFileType {
  PROVIDER_ICON = 'PROVIDER_ICON',
  EMBEDDED_NOTEBOOK = 'EMBEDDED_NOTEBOOK',
  APP = 'APP',
}
```

`APP` is the only member without a qualifier. Compare with `EMBEDDED_NOTEBOOK` — prefixed with "embedded" to indicate it's attached to a listing. Is `APP` similarly embedded? Is it a Databricks App package file? A general application archive? Without a qualifier or doc-comment the value is ambiguous.
- **Category:** 1 (vague), 17 (inconsistent qualifier convention with peers).
- **Suggested name:** `EMBEDDED_APP` or `APP_PACKAGE`.
- **Rationale:** Match the qualifier convention of `EMBEDDED_*` peers.

### 12. `PersonalizationRequestStatus.REQUEST_PENDING` — preposition-padded value with a workaround comment

**Location:** `src/v1/model.ts:129-135`

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

### 13. `Cost` — single-word, ambiguous enum

**Location:** `src/v1/model.ts:46-49`

```ts
export enum Cost {
  FREE = 'FREE',
  PAID = 'PAID',
}
```

`Cost` is a generic noun. Inside `ListingDetail.cost: Cost` (line 669) the field is documented as "Whether the dataset is free or paid" — so the enum is really a *cost category* or *pricing tier*, not a price. The single-word name is collision-prone (cost appears in many domains) and doesn't communicate "is this paid?".
- **Category:** 1 (vague), 6 (misleading: implies price, means tier).
- **Suggested name:** `ListingPricingTier`, `PricingTier`, or `PriceCategory`.
- **Rationale:** A two-value boolean-like enum named `Cost` reads ambiguously.

### 14. `DataRefresh` — enum named after the noun, not the property

**Location:** `src/v1/model.ts:51-61`

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

The enum is a *time unit / interval*, not a "data refresh". It's used as `DataRefreshInfo.unit: DataRefresh` (line 258) which the wire format calls `data_refresh.unit`. Reading `DataRefresh.HOURLY` requires knowing the value names a frequency, not a refresh event. Also note: values mix nouns (`SECOND`, `MINUTE`) with adjectives (`HOURLY`, `DAILY`, `WEEKLY`) within the same enum — `SECONDLY` and `MINUTELY` are not used.
- **Category:** 1 (vague: name is the noun, not the unit), 17 (inconsistent value form: nouns vs adverbs).
- **Suggested name:** `RefreshInterval`, `TimeUnit`, or `DataRefreshUnit`.
- **Rationale:** Self-documenting enum name; consistent value form.

### 15. `DataRefresh.NONE` vs `SECOND`/`MINUTE`/`HOURLY` — second is special

**Location:** `src/v1/model.ts:52-55`

```ts
NONE = 'NONE',
SECOND = 'SECOND',
MINUTE = 'MINUTE',
HOURLY = 'HOURLY',
```

`NONE` reads as "no refresh"; `SECOND` reads as "every second"; `HOURLY` reads as "every hour". The first two follow noun-naming; the third follows adverb-naming. Mixing the two within the same enum produces inconsistency.
- **Category:** 17 (inconsistent value form).
- **Suggested name:** Pick one convention. If "every X" adverbs are used, change `SECOND` → `SECONDLY`, `MINUTE` → `MINUTELY`, `NONE` → unchanged.
- **Rationale:** See #14.

### 16. `Category` — generic enum name with 22 values

**Location:** `src/v1/model.ts:21-44`

```ts
export enum Category {
  ADVERTISING_AND_MARKETING = 'ADVERTISING_AND_MARKETING',
  ...
  TRAVEL_AND_TOURISM = 'TRAVEL_AND_TOURISM',
}
```

`Category` is generic without a domain qualifier (compare with `AssetType`, `ListingType`, `MarketplaceFileType`). The other enums use a domain prefix; `Category` does not. Also, it's exported at the package root and a user importing `Category` doesn't know it's marketplace-scoped.
- **Category:** 1 (vague), 17 (inconsistent qualifier convention).
- **Suggested name:** `ListingCategory` (since the only usage is `ListingSummary.categories: Category[]` at line 732).
- **Rationale:** Cross-package collision avoidance and self-documentation.

### 17. `ListingDetail.cost` typed as `Cost` (enum), but doc says price

**Location:** `src/v1/model.ts:668-669, 673-674`

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

### 18. `ListingDetail.updateFrequency` vs `collectionGranularity` — same type, different naming

**Location:** `src/v1/model.ts:675-678`

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

### 19. `ListingDetail.tags: ListingTag[]` — typed-but-not-typed tags

**Location:** `src/v1/model.ts:689-704`

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
```

The enum constrains tag *names* to a small set. Values are free-form strings. So a "tag" is really a `(name: enum, values: string[])` pair — that's not a tag in the colloquial sense (tag = single label). Compare with how `kubernetes` or `aws` model tags: `{ key: string, value: string }`. The marketplace model is `{ tagName: enum, tagValues: string[] }` — many-to-many.
- **Category:** 6 (misleading: name implies free-form labels, structure is constrained), 7 (`tagName` / `tagValues` add `tag` prefix repeated from type name).
- **Suggested name:** Rename type to clarify (e.g. `ListingAttribute`).
- **Rationale:** "Tag" colloquially means a single label; this structure is closer to an attribute or property bag.

### 20. `ContactInfo` — generic suffix on a single-purpose type

**Location:** `src/v1/model.ts:171-177`

```ts
/** contact info for the consumer requesting data or performing a listing installation */
export interface ContactInfo {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
}
```

`*Info` suffix is generic. The type is reused only via `PersonalizationRequest.contactInfo: ContactInfo` (line 752). Also note: `firstName` / `lastName` / `email` / `company` describes a person, not generic "contact info". `Person`, `Contact`, or `ConsumerContact` would be more specific.
- **Category:** 8 (redundant `Info` suffix), 1 (vague).
- **Suggested name:** `Contact` or `ConsumerContact`.
- **Rationale:** Cross-package, every `*Info` reads as "the info type"; specificity helps autocomplete.

### 21. `RegionInfo` — `Info` suffix on a single-purpose type

**Location:** `src/v1/model.ts:791-794`

```ts
export interface RegionInfo {
  cloud?: string | undefined;
  region?: string | undefined;
}
```

Same problem as #20. Also note: both fields are `string` — there's no enum of cloud providers or regions. The type name suggests rich info; the shape is two strings.
- **Category:** 8 (redundant `Info` suffix), 19 (underspecified — no enum constraints).
- **Suggested name:** `Region` (the cloud is implicitly part of the region in many SDKs) or `CloudRegion`.
- **Rationale:** Avoid `*Info` suffix; consider richer typing.

### 22. `ShareInfo` — `Info` suffix on a sharing concept

**Location:** `src/v1/model.ts:839-842`

```ts
export interface ShareInfo {
  name?: string | undefined;
  type?: ListingShareType | undefined;
}
```

Same problem as #20 and #21. Additionally, `ShareInfo.type: ListingShareType` reads as "the listing-share-type of the share" — three nouns to communicate "is this a sample or full share".
- **Category:** 8 (redundant `Info` suffix).
- **Suggested name:** `Share`, `ListingShare`.
- **Rationale:** See #20.

### 23. `ProviderInfo` — `Info` suffix on the canonical provider type

**Location:** `src/v1/model.ts:772-789`

```ts
export interface ProviderInfo {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  iconFilePath?: string | undefined;
  ...
}
```

Same problem as #20. The package also has `CreateProviderRequest`, `GetProviderRequest`, `UpdateProviderRequest`, `DeleteProviderRequest`, `ListProvidersRequest` — all referencing the noun `Provider`. The canonical full type is named `ProviderInfo`, but consumers would expect `Provider`.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent: the rest of the package uses `Provider` alone).
- **Suggested name:** `Provider`.
- **Rationale:** Consistency with method/request type names.

### 24. `DataRefreshInfo` — `Info` suffix on an interval type

**Location:** `src/v1/model.ts:256-259`

```ts
export interface DataRefreshInfo {
  interval?: number | undefined;
  unit?: DataRefresh | undefined;
}
```

Same problem as #20. Also note: the type is reused for `collectionGranularity` (#18), so the name `DataRefreshInfo` is wrong for half of its uses.
- **Category:** 8 (redundant `Info` suffix), 6 (misleading: name doesn't fit `collectionGranularity` use).
- **Suggested name:** `TimeInterval` (matches #18).
- **Rationale:** See #18.

### 25. `FileInfo` — `Info` suffix on the canonical file type

**Location:** `src/v1/model.ts:330-343`

```ts
export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  ...
}
```

Same problem as #20. The package also has `CreateFileRequest`, `GetFileRequest`, `DeleteFileRequest`, `ListFilesRequest` — all referencing the noun `File`. The canonical full type is named `FileInfo`, breaking the pattern.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent with siblings).
- **Suggested name:** `File`.
- **Rationale:** See #23.

### 26. `ListingSummary.providerRegion` — region of what?

**Location:** `src/v1/model.ts:724`

```ts
providerRegion?: RegionInfo | undefined;
```

`PersonalizationRequest.consumerRegion` (line 751) uses the same `RegionInfo` type with the `consumer` qualifier. So the package has `providerRegion` and `consumerRegion` — two different qualifiers for the same `RegionInfo` type. Fine; flagged because the *type* name (`RegionInfo`) is unqualified, while every *use* requires a qualifier.
- **Category:** 1 (vague type, qualified field), 17 (qualifier convention not encoded in the type).
- **Suggested name:** No rename; this is the price of reusing `RegionInfo`.
- **Rationale:** Observation.

---

## Low severity

### 27. `Listing.id` vs `ListingDetail.fileIds: string[]` vs `ListingSummary.exchangeIds: string[]` — id pluralization

**Location:** `src/v1/model.ts:653, 663, 737`

Mixed singular/plural id fields:
- `Listing.id` — single id of the listing.
- `ListingDetail.fileIds: string[]` — many file ids.
- `ListingSummary.exchangeIds: string[]` — many exchange ids.
- `ListingSummary.providerId: string` — single provider id.
- `ListingSummary.createdById: number` — single id, type `number` (not `string` like other ids — see #28).

Within one transitive type (`Listing → ListingSummary | ListingDetail`), id fields use 4 different patterns: `id`, `*Id` (number), `*Id` (string), `*Ids` (string[]). Internal consistency check fails.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent suffix convention), 19 (underspecified — see #28).
- **Suggested name:** Pick one — `*Id`/`*Ids` is standard.
- **Rationale:** Observation; flagged for completeness.

### 28. `ListingSummary.createdById: number` and `updatedById: number` — id typed as number

**Location:** `src/v1/model.ts:734-735`

```ts
createdById?: number | undefined;
updatedById?: number | undefined;
```

User ids are typed as `number`. JS `number` only safely represents integers up to 2^53; Databricks user ids are 64-bit (int64). Same issue flagged in `grants` audit #13.
- **Category:** 19 (underspecified ID), 16 (field contradicts JS type domain).
- **Suggested name:** `createdById: string` or `bigint`.
- **Rationale:** Lossy representation; consistency with other id fields (all `string`).

### 29. `Visibility.PUBLIC` / `Visibility.PRIVATE` — binary enum named `Visibility`

**Location:** `src/v1/model.ts:137-140`

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

### 30. `ListingShareType.SAMPLE` / `ListingShareType.FULL` — adjective vs noun

**Location:** `src/v1/model.ts:99-102`

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

### 31. `ListingType.STANDARD` / `ListingType.PERSONALIZED` — adjective values

**Location:** `src/v1/model.ts:118-121`

```ts
export enum ListingType {
  STANDARD = 'STANDARD',
  PERSONALIZED = 'PERSONALIZED',
}
```

Two adjective values. Fine. Flagged because the package also has `PersonalizationRequest` (line 749) — the noun for `PERSONALIZED` mode. Cross-reference unclear.
- **Category:** Observation.
- **Suggested name:** No rename.
- **Rationale:** Internal consistency check.

---

## Observations

### 32. v1-only audit
The marketplaces package has only v1 today (`packages/marketplaces/src/v1/`), so no v1↔v2 comparison to make.

---
