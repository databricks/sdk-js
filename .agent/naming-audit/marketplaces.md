# Naming Audit: marketplaces

**Path:** `packages/marketplaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks Marketplace — provider-side and exchange-side operations for managing **listings** (the marketplace storefront entry for a dataset, model, notebook, app, MCP, partner integration, or git repo), **providers** (the publisher account), **exchanges** (curated, scoped collections of listings, including exchange filters that scope visibility by metastore), **personalization requests** (consumer-side requests for tailored access), **files** attached to listings/providers (icons, embedded notebooks, embedded markdown, commit drawdown attachments), and a separate **provider analytics dashboard** sub-resource (a Lakeview-backed dashboard for provider-side analytics).
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 10 |

---

## High severity

### 1. `AddExchangeForListingRequest` / `RemoveExchangeForListingRequest` — for-Listing word-order

**Location:** `src/v1/model.ts:207, 840`

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

### 2. `ListingSummary` — 19-field "summary"

**Location:** `src/v1/model.ts:763-784`

```ts
export interface ListingSummary {
  name?: string | undefined;
  subtitle?: string | undefined;
  status?: ListingStatus | undefined;
  share?: ShareInfo | undefined;
  providerRegion?: RegionInfo | undefined;
  setting?: ListingSetting | undefined;
  createdAt?: bigint | undefined;
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
  updatedBy?: string | undefined;
  publishedAt?: bigint | undefined;
  publishedBy?: string | undefined;
  categories?: Category[] | undefined;
  listingType?: ListingType | undefined;
  createdById?: bigint | undefined;
  updatedById?: bigint | undefined;
  providerId?: string | undefined;
  exchangeIds?: string[] | undefined;
  gitRepo?: RepoInfo | undefined;
}
```

A 19-field type called `Summary` is misleading — summaries are conventionally short. This includes provider-region info, share info, exchange ids, git-repo info, and full audit timestamps. The name promises slim; the shape is fat.
- **Category:** 6 (misleading).
- **Suggested name:** `ListingMetadata` or `ListingHeader`.
- **Rationale:** A "summary" with 19 fields, including nested objects and full audit metadata, promises a slim shape the type does not deliver.

### 3. `FileParent` — abstract container with weak typing

**Location:** `src/v1/model.ts:427-430`

```ts
export interface FileParent {
  parentId?: string | undefined;
  fileParentType?: FileParentType | undefined;
}
```

`parentId` is a free-form string with no statement of which `FileParentType` corresponds to which kind of id. `fileParentType` is a 3-value enum (`PROVIDER`, `LISTING`, `LISTING_RESOURCE`), but `LISTING_RESOURCE` has no separate `ListingResource` type in the package — it's an opaque concept. The pair is effectively a discriminated union that isn't discriminated.
- **Category:** 6 (misleading: looks like a polymorphic parent but isn't typed).
- **Suggested name:** Model as a TS discriminated union (`{ $case: 'provider' | 'listing' | 'listingResource', id: string }`).
- **Rationale:** An id-plus-type-tag pair models a polymorphic parent reference; a discriminated union expresses the same contract with type safety.

---

## Medium severity

### 4. `Cost` — single-word, ambiguous enum

**Location:** `src/v1/model.ts:53-57`

```ts
export const Cost = {
  FREE: 'FREE',
  PAID: 'PAID',
} as const;
export type Cost = (typeof Cost)[keyof typeof Cost] | (string & {});
```

`Cost` is a generic noun. Inside `ListingDetail.cost: Cost` (line 716) the field is documented as "Whether the dataset is free or paid" — so the enum is really a *cost category* or *pricing tier*, not a price. The single-word name is collision-prone (cost appears in many domains) and doesn't communicate "is this paid?".
- **Category:** 1 (vague), 6 (misleading: implies price, means tier).
- **Suggested name:** `ListingPricingTier`, `PricingTier`, or `PriceCategory`.
- **Rationale:** A two-value boolean-like enum named `Cost` reads ambiguously.

### 5. `DataRefresh` — enum named after the noun, not the property

**Location:** `src/v1/model.ts:60-73`

```ts
export const DataRefresh = {
  NONE: 'NONE',
  SECOND: 'SECOND',
  MINUTE: 'MINUTE',
  HOURLY: 'HOURLY',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
} as const;
export type DataRefresh =
  | (typeof DataRefresh)[keyof typeof DataRefresh]
  | (string & {});
```

The enum is a *time unit / interval*, not a "data refresh". It's used as `DataRefreshInfo.unit: DataRefresh` (line 332) which the wire format calls `data_refresh.unit`. Reading `DataRefresh.HOURLY` requires knowing the value names a frequency, not a refresh event.
- **Category:** 1 (vague: name is the noun, not the unit).
- **Suggested name:** `RefreshInterval`, `TimeUnit`, or `DataRefreshUnit`.
- **Rationale:** Self-documenting enum name.

### 6. `Category` — generic enum name with 22 values

**Location:** `src/v1/model.ts:26-49`

```ts
export const Category = {
  ADVERTISING_AND_MARKETING: 'ADVERTISING_AND_MARKETING',
  ...
  TRAVEL_AND_TOURISM: 'TRAVEL_AND_TOURISM',
} as const;
export type Category = (typeof Category)[keyof typeof Category] | (string & {});
```

`Category` is generic without a domain qualifier (compare with `AssetType`, `ListingType`, `MarketplaceFileType`). The other enums use a domain prefix; `Category` does not. Also, it's exported at the package root and a user importing `Category` doesn't know it's marketplace-scoped.
- **Category:** 1 (vague), 17 (inconsistent qualifier convention).
- **Suggested name:** `ListingCategory` (since the only usage is `ListingSummary.categories: Category[]` at line 776).
- **Rationale:** Cross-package collision avoidance and self-documentation.

### 7. `ContactInfo` — generic suffix on a single-purpose type

**Location:** `src/v1/model.ts:237-242`

```ts
/** contact info for the consumer requesting data or performing a listing installation */
export interface ContactInfo {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
}
```

`*Info` suffix is generic. The type is reused only via `PersonalizationRequest.contactInfo: ContactInfo` (line 796). Also note: `firstName` / `lastName` / `email` / `company` describes a person, not generic "contact info". `Person`, `Contact`, or `ConsumerContact` would be more specific.
- **Category:** 8 (redundant `Info` suffix), 1 (vague).
- **Suggested name:** `Contact` or `ConsumerContact`.
- **Rationale:** Cross-package, every `*Info` reads as "the info type"; specificity helps autocomplete.

### 8. `RegionInfo` — `Info` suffix on a single-purpose type

**Location:** `src/v1/model.ts:835-838`

```ts
export interface RegionInfo {
  cloud?: string | undefined;
  region?: string | undefined;
}
```

Same problem as #7. The `*Info` suffix is generic and the type is reused only as
a region descriptor.
- **Category:** 8 (redundant `Info` suffix).
- **Suggested name:** `Region` (the cloud is implicitly part of the region in many SDKs) or `CloudRegion`.
- **Rationale:** Avoid the `*Info` suffix; name the type for the concept it represents.

### 9. `ShareInfo` — `Info` suffix on a sharing concept

**Location:** `src/v1/model.ts:882-885`

```ts
export interface ShareInfo {
  name?: string | undefined;
  type?: ListingShareType | undefined;
}
```

Same problem as #7 and #8. Additionally, `ShareInfo.type: ListingShareType` reads as "the listing-share-type of the share" — three nouns to communicate "is this a sample or full share".
- **Category:** 8 (redundant `Info` suffix).
- **Suggested name:** `Share`, `ListingShare`.
- **Rationale:** See #7.

### 10. `ProviderInfo` — `Info` suffix on the canonical provider type

**Location:** `src/v1/model.ts:816-833`

```ts
export interface ProviderInfo {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  iconFilePath?: string | undefined;
  ...
}
```

Same problem as #7. The package also has `CreateProviderRequest`, `GetProviderRequest`, `UpdateProviderRequest`, `DeleteProviderRequest`, `ListProvidersRequest` — all referencing the noun `Provider`. The canonical full type is named `ProviderInfo`, but consumers would expect `Provider`.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent: the rest of the package uses `Provider` alone).
- **Suggested name:** `Provider`.
- **Rationale:** Consistency with method/request type names.

### 11. `DataRefreshInfo` — `Info` suffix on an interval type

**Location:** `src/v1/model.ts:330-333`

```ts
export interface DataRefreshInfo {
  interval?: bigint | undefined;
  unit?: DataRefresh | undefined;
}
```

Same problem as #7. Also note: the type models a generic time interval, so the `DataRefresh` stem reads as too narrow for the concept.
- **Category:** 8 (redundant `Info` suffix), 6 (misleading: name implies a refresh event, not an interval).
- **Suggested name:** `TimeInterval`.
- **Rationale:** Avoid the `*Info` suffix and name the type for the generic interval concept it represents.

### 12. `FileInfo` — `Info` suffix on the canonical file type

**Location:** `src/v1/model.ts:412-425`

```ts
export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  ...
}
```

Same problem as #7. The package also has `CreateFileRequest`, `GetFileRequest`, `DeleteFileRequest`, `ListFilesRequest` — all referencing the noun `File`. The canonical full type is named `FileInfo`, breaking the pattern.
- **Category:** 8 (redundant `Info` suffix), 17 (inconsistent with siblings).
- **Suggested name:** `File`.
- **Rationale:** See #10.

### 13. `ListingTag` — typed-but-not-typed tags

**Location:** `src/v1/model.ts:748, 786-791`

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
- **Category:** 6 (misleading: name implies free-form labels, structure is constrained).
- **Suggested name:** Rename type to clarify (e.g. `ListingAttribute`).
- **Rationale:** "Tag" colloquially means a single label; this structure is closer to an attribute or property bag.
