// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


export enum AssetType {
  ASSET_TYPE_UNSPECIFIED = 'ASSET_TYPE_UNSPECIFIED',
  ASSET_TYPE_GIT_REPO = 'ASSET_TYPE_GIT_REPO',
  ASSET_TYPE_DATA_TABLE = 'ASSET_TYPE_DATA_TABLE',
  ASSET_TYPE_MODEL = 'ASSET_TYPE_MODEL',
  ASSET_TYPE_NOTEBOOK = 'ASSET_TYPE_NOTEBOOK',
  /**
   * (MP-2408): media-based assets generally involve volumes; however some volumes files (e.g. CSV) still correspond to datasets
   * as such, add a new asset type to specify media
   */
  ASSET_TYPE_MEDIA = 'ASSET_TYPE_MEDIA',
  ASSET_TYPE_PARTNER_INTEGRATION = 'ASSET_TYPE_PARTNER_INTEGRATION',
  ASSET_TYPE_APP = 'ASSET_TYPE_APP',
  ASSET_TYPE_MCP = 'ASSET_TYPE_MCP',
}

export enum Category {
  ADVERTISING_AND_MARKETING = 'ADVERTISING_AND_MARKETING',
  CLIMATE_AND_ENVIRONMENT = 'CLIMATE_AND_ENVIRONMENT',
  COMMERCE = 'COMMERCE',
  DEMOGRAPHICS = 'DEMOGRAPHICS',
  ECONOMICS = 'ECONOMICS',
  EDUCATION = 'EDUCATION',
  ENERGY = 'ENERGY',
  FINANCIAL = 'FINANCIAL',
  GAMING = 'GAMING',
  GEOSPATIAL = 'GEOSPATIAL',
  HEALTH = 'HEALTH',
  LOOKUP_TABLES = 'LOOKUP_TABLES',
  MANUFACTURING = 'MANUFACTURING',
  MEDIA = 'MEDIA',
  OTHER = 'OTHER',
  PUBLIC_SECTOR = 'PUBLIC_SECTOR',
  RETAIL = 'RETAIL',
  SECURITY = 'SECURITY',
  SCIENCE_AND_RESEARCH = 'SCIENCE_AND_RESEARCH',
  SPORTS = 'SPORTS',
  TRANSPORTATION_AND_LOGISTICS = 'TRANSPORTATION_AND_LOGISTICS',
  TRAVEL_AND_TOURISM = 'TRAVEL_AND_TOURISM',
}

export enum Cost {
  FREE = 'FREE',
  PAID = 'PAID',
}

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

export enum DeltaSharingRecipientType {
  DELTA_SHARING_RECIPIENT_TYPE_DATABRICKS = 'DELTA_SHARING_RECIPIENT_TYPE_DATABRICKS',
  DELTA_SHARING_RECIPIENT_TYPE_OPEN = 'DELTA_SHARING_RECIPIENT_TYPE_OPEN',
}

export enum ExchangeFilterType {
  GLOBAL_METASTORE_ID = 'GLOBAL_METASTORE_ID',
}

export enum FileParentType {
  PROVIDER = 'PROVIDER',
  LISTING = 'LISTING',
  LISTING_RESOURCE = 'LISTING_RESOURCE',
}

export enum FileStatus {
  /** Published files have been sanitized by Marketplace backend and can be viewed by consumers. */
  FILE_STATUS_PUBLISHED = 'FILE_STATUS_PUBLISHED',
  /** Created files start in staging. These are viewable by provider APIs but not consumer APIs. */
  FILE_STATUS_STAGING = 'FILE_STATUS_STAGING',
  /** Indicates this file is in the process of being sanitized. */
  FILE_STATUS_SANITIZING = 'FILE_STATUS_SANITIZING',
  /** Something went wrong with sanitization, refer to the status message for more information. */
  FILE_STATUS_SANITIZATION_FAILED = 'FILE_STATUS_SANITIZATION_FAILED',
}

export enum FulfillmentType {
  REQUEST_ACCESS = 'REQUEST_ACCESS',
  INSTALL = 'INSTALL',
}

export enum InstallationStatus {
  INSTALLED = 'INSTALLED',
  FAILED = 'FAILED',
}

export enum ListingShareType {
  SAMPLE = 'SAMPLE',
  FULL = 'FULL',
}

/** Enums */
export enum ListingStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  SUSPENDED = 'SUSPENDED',
}

export enum ListingTagType {
  LISTING_TAG_TYPE_UNSPECIFIED = 'LISTING_TAG_TYPE_UNSPECIFIED',
  LISTING_TAG_TYPE_LANGUAGE = 'LISTING_TAG_TYPE_LANGUAGE',
  LISTING_TAG_TYPE_TASK = 'LISTING_TAG_TYPE_TASK',
}

export enum ListingType {
  STANDARD = 'STANDARD',
  PERSONALIZED = 'PERSONALIZED',
}

export enum MarketplaceFileType {
  PROVIDER_ICON = 'PROVIDER_ICON',
  EMBEDDED_NOTEBOOK = 'EMBEDDED_NOTEBOOK',
  APP = 'APP',
}

export enum PersonalizationRequestStatus {
  NEW = 'NEW',
  /** Pending already defined for ListingStatus */
  REQUEST_PENDING = 'REQUEST_PENDING',
  FULFILLED = 'FULFILLED',
  DENIED = 'DENIED',
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface AddExchangeForListingRequest {
  listingId?: string | undefined;
  exchangeId?: string | undefined;
}

export interface AddExchangeForListingResponse {
  exchangeForListing?: ExchangeListing | undefined;
}

export interface BatchGetListingsRequest {
  ids?: string[] | undefined;
}

export interface BatchGetListingsResponse {
  listings?: Listing[] | undefined;
}

export interface BatchGetProvidersRequest {
  ids?: string[] | undefined;
}

export interface BatchGetProvidersResponse {
  providers?: ProviderInfo[] | undefined;
}

export interface ConsumerTerms {
  version?: string | undefined;
}

/** contact info for the consumer requesting data or performing a listing installation */
export interface ContactInfo {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  company?: string | undefined;
}

export interface CreateExchangeFilterRequest {
  filter?: ExchangeFilter | undefined;
}

export interface CreateExchangeFilterResponse {
  filterId?: string | undefined;
}

export interface CreateExchangeRequest {
  exchange?: Exchange | undefined;
}

export interface CreateExchangeResponse {
  exchangeId?: string | undefined;
}

export interface CreateFileRequest {
  fileParent?: FileParent | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  mimeType?: string | undefined;
  displayName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateFileRequest_Response {
  /** Pre-signed POST URL to blob storage */
  uploadUrl?: string | undefined;
  fileInfo?: FileInfo | undefined;
}

export interface CreateListingRequest {
  listing?: Listing | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateListingRequest_Response {
  listingId?: string | undefined;
}

/**
 * Data request messages
 * also creates a lead (maybe)
 */
export interface CreatePersonalizationRequest {
  listingId?: string | undefined;
  comment?: string | undefined;
  intendedUse?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  company?: string | undefined;
  isFromLighthouse?: boolean | undefined;
  recipientType?: DeltaSharingRecipientType | undefined;
  acceptedConsumerTerms?: ConsumerTerms | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreatePersonalizationRequest_Response {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateProviderAnalyticsDashboardRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateProviderAnalyticsDashboardRequest_Response {
  id?: string | undefined;
}

export interface CreateProviderRequest {
  provider?: ProviderInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateProviderRequest_Response {
  id?: string | undefined;
}

export interface DataRefreshInfo {
  interval?: number | undefined;
  unit?: DataRefresh | undefined;
}

export interface DeleteExchangeFilterRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteExchangeFilterResponse {}

export interface DeleteExchangeRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteExchangeResponse {}

export interface DeleteFileRequest {
  fileId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteFileRequest_Response {}

export interface DeleteListingRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteListingRequest_Response {}

export interface DeleteProviderRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteProviderRequest_Response {}

export interface Exchange {
  id?: string | undefined;
  name?: string | undefined;
  comment?: string | undefined;
  filters?: ExchangeFilter[] | undefined;
  createdAt?: number | undefined;
  createdBy?: string | undefined;
  updatedAt?: number | undefined;
  updatedBy?: string | undefined;
  linkedListings?: ExchangeListing[] | undefined;
}

export interface ExchangeFilter {
  id?: string | undefined;
  exchangeId?: string | undefined;
  filterValue?: string | undefined;
  name?: string | undefined;
  createdAt?: number | undefined;
  createdBy?: string | undefined;
  updatedAt?: number | undefined;
  updatedBy?: string | undefined;
  filterType?: ExchangeFilterType | undefined;
}

export interface ExchangeListing {
  id?: string | undefined;
  exchangeId?: string | undefined;
  exchangeName?: string | undefined;
  listingId?: string | undefined;
  listingName?: string | undefined;
  createdAt?: number | undefined;
  createdBy?: string | undefined;
}

export interface FileInfo {
  id?: string | undefined;
  marketplaceFileType?: MarketplaceFileType | undefined;
  fileParent?: FileParent | undefined;
  mimeType?: string | undefined;
  downloadLink?: string | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  /** Name displayed to users for applicable files, e.g. embedded notebooks */
  displayName?: string | undefined;
  status?: FileStatus | undefined;
  /** Populated if status is in a failed state with more information on reason for the failure. */
  statusMessage?: string | undefined;
}

export interface FileParent {
  /** TODO make the following fields required */
  parentId?: string | undefined;
  fileParentType?: FileParentType | undefined;
}

export interface GetAllInstallations {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetAllInstallations_Response {
  installations?: InstallationDetail[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetAllPersonalizationRequestsForConsumer {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetAllPersonalizationRequestsForConsumer_Response {
  personalizationRequests?: PersonalizationRequest[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetExchangeRequest {
  id?: string | undefined;
}

export interface GetExchangeResponse {
  exchange?: Exchange | undefined;
}

export interface GetFileRequest {
  fileId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetFileRequest_Response {
  fileInfo?: FileInfo | undefined;
}

export interface GetInstallationDetails {
  listingId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetInstallationDetails_Response {
  installations?: InstallationDetail[] | undefined;
  nextPageToken?: string | undefined;
}

/**
 * this is effectively a static request for now and will return latest version of the dashboard template
 * that exists on server.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetLatestVersionProviderAnalyticsDashboardRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetLatestVersionProviderAnalyticsDashboardRequest_Response {
  /** version here is latest logical version of the dashboard template */
  version?: number | undefined;
}

export interface GetListingContent {
  listingId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListingContent_Response {
  sharedDataObjects?: SharedDataObject[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetListingFulfillments {
  listingId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListingFulfillments_Response {
  fulfillments?: ListingFulfillment[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetListingRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListingRequest_Response {
  listing?: Listing | undefined;
}

export interface GetListingsRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetListingsRequest_Response {
  listings?: Listing[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetPersonalizationRequestsForConsumer {
  listingId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPersonalizationRequestsForConsumer_Response {
  personalizationRequests?: PersonalizationRequest[] | undefined;
}

export interface GetPersonalizationRequestsForProviderRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPersonalizationRequestsForProviderRequest_Response {
  personalizationRequests?: PersonalizationRequest[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetProviderRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetProviderRequest_Response {
  provider?: ProviderInfo | undefined;
}

export interface GetPublishedListingForConsumer {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPublishedListingForConsumer_Response {
  listing?: Listing | undefined;
}

/** Listing messages */
export interface GetPublishedListingsForConsumer {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
  /** Matches any of the following asset types */
  assets?: AssetType[] | undefined;
  /** Matches any of the following categories */
  categories?: Category[] | undefined;
  /** Matches listings with this tag */
  tags?: ListingTag | undefined;
  /** Filters each listing based on if it is free. */
  isFree?: boolean | undefined;
  /** Filters each listing based on if it is a private exchange. */
  isPrivateExchange?: boolean | undefined;
  /** Filters each listing based on whether it is a staff pick. */
  isStaffPick?: boolean | undefined;
  /** Matches any of the following provider ids */
  providerIds?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPublishedListingsForConsumer_Response {
  listings?: Listing[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetPublishedProviderForConsumer {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPublishedProviderForConsumer_Response {
  provider?: ProviderInfo | undefined;
}

export interface InstallListing {
  listingId?: string | undefined;
  shareName?: string | undefined;
  catalogName?: string | undefined;
  /** for git repo installations */
  repoDetail?: RepoInstallation | undefined;
  recipientType?: DeltaSharingRecipientType | undefined;
  acceptedConsumerTerms?: ConsumerTerms | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface InstallListing_Response {
  installation?: InstallationDetail | undefined;
}

export interface InstallationDetail {
  id?: string | undefined;
  listingId?: string | undefined;
  shareName?: string | undefined;
  catalogName?: string | undefined;
  installedOn?: number | undefined;
  status?: InstallationStatus | undefined;
  errorMessage?: string | undefined;
  listingName?: string | undefined;
  repoName?: string | undefined;
  repoPath?: string | undefined;
  recipientType?: DeltaSharingRecipientType | undefined;
  tokens?: TokenInfo[] | undefined;
  tokenDetail?: TokenDetail | undefined;
}

export interface ListExchangeFiltersRequest {
  exchangeId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListExchangeFiltersResponse {
  filters?: ExchangeFilter[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListExchangesForListingRequest {
  listingId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListExchangesForListingResponse {
  exchangeListing?: ExchangeListing[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListExchangesRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListExchangesResponse {
  exchanges?: Exchange[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListFilesRequest {
  fileParent?: FileParent | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListFilesRequest_Response {
  fileInfos?: FileInfo[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListListingsForExchangeRequest {
  exchangeId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListListingsForExchangeResponse {
  exchangeListings?: ExchangeListing[] | undefined;
  nextPageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListProviderAnalyticsDashboardRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListProviderAnalyticsDashboardRequest_Response {
  id?: string | undefined;
  version?: number | undefined;
  /** dashboard_id will be used to open Lakeview dashboard. */
  dashboardId?: string | undefined;
}

export interface ListProvidersRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListProvidersRequest_Response {
  providers?: ProviderInfo[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListPublishedProvidersForConsumer {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
  isFeatured?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListPublishedProvidersForConsumer_Response {
  providers?: ProviderInfo[] | undefined;
  nextPageToken?: string | undefined;
}

export interface Listing {
  id?: string | undefined;
  summary?: ListingSummary | undefined;
  detail?: ListingDetail | undefined;
}

export interface ListingDetail {
  description?: string | undefined;
  termsOfService?: string | undefined;
  documentationLink?: string | undefined;
  supportLink?: string | undefined;
  fileIds?: string[] | undefined;
  privacyPolicyLink?: string | undefined;
  embeddedNotebookFileInfos?: FileInfo[] | undefined;
  /** Which geo region the listing data is collected from */
  geographicalCoverage?: string | undefined;
  /** Whether the dataset is free or paid */
  cost?: Cost | undefined;
  /**
   * What the pricing model is (e.g. paid, subscription, paid upfront); should only be present if cost is paid
   * TODO: Not used yet, should deprecate if we will never use it
   */
  pricingModel?: string | undefined;
  /** How often data is updated */
  updateFrequency?: DataRefreshInfo | undefined;
  /** Smallest unit of time in the dataset */
  collectionGranularity?: DataRefreshInfo | undefined;
  /** The starting date timestamp for when the data spans */
  collectionDateStart?: number | undefined;
  /** The ending date timestamp for when the data spans */
  collectionDateEnd?: number | undefined;
  /** Where/how the data is sourced */
  dataSource?: string | undefined;
  /** size of the dataset in GB */
  size?: number | undefined;
  /** Type of assets included in the listing. eg. GIT_REPO, DATA_TABLE, MODEL, NOTEBOOK */
  assets?: AssetType[] | undefined;
  /**
   * ID 20, 21 removed don't use
   * License of the data asset - Required for listings with model based assets
   */
  license?: string | undefined;
  /**
   * Listing tags - Simple key value pair to annotate listings.
   * When should I use tags vs dedicated fields?
   * Using tags avoids the need to add new columns in the database for new annotations.
   * However, this should be used sparingly since tags are stored as key value pair.
   * Use tags only:
   * 1. If the field is optional and won't need to have NOT NULL integrity check
   * 2. The value is fairly fixed, static and low cardinality (eg. enums).
   * 3. The value won't be used in filters or joins with other tables.
   */
  tags?: ListingTag[] | undefined;
}

export interface ListingFulfillment {
  listingId?: string | undefined;
  fulfillmentType?: FulfillmentType | undefined;
  shareInfo?: ShareInfo | undefined;
  repoInfo?: RepoInfo | undefined;
  recipientType?: DeltaSharingRecipientType | undefined;
}

export interface ListingSetting {
  visibility?: Visibility | undefined;
}

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
  /** if a git repo is being created, a listing will be initialized with this field as opposed to a share */
  gitRepo?: RepoInfo | undefined;
}

export interface ListingTag {
  /** Tag name (enum) */
  tagName?: ListingTagType | undefined;
  /** String representation of the tag value. Values should be string literals (no complex types) */
  tagValues?: string[] | undefined;
}

export interface PersonalizationRequest {
  id?: string | undefined;
  consumerRegion?: RegionInfo | undefined;
  contactInfo?: ContactInfo | undefined;
  comment?: string | undefined;
  intendedUse?: string | undefined;
  status?: PersonalizationRequestStatus | undefined;
  statusMessage?: string | undefined;
  /**
   * Share information is required for data listings
   * but should be empty/ignored for non-data listings (MCP and App).
   */
  share?: ShareInfo | undefined;
  createdAt?: number | undefined;
  listingId?: string | undefined;
  updatedAt?: number | undefined;
  metastoreId?: string | undefined;
  listingName?: string | undefined;
  isFromLighthouse?: boolean | undefined;
  providerId?: string | undefined;
  recipientType?: DeltaSharingRecipientType | undefined;
}

export interface ProviderInfo {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  iconFilePath?: string | undefined;
  businessContactEmail?: string | undefined;
  supportContactEmail?: string | undefined;
  /** is_featured is accessible by consumers only */
  isFeatured?: boolean | undefined;
  /** published_by is only applicable to data aggregators (e.g. Crux) */
  publishedBy?: string | undefined;
  companyWebsiteLink?: string | undefined;
  iconFileId?: string | undefined;
  termOfServiceLink?: string | undefined;
  privacyPolicyLink?: string | undefined;
  darkModeIconFileId?: string | undefined;
  darkModeIconFilePath?: string | undefined;
}

export interface RegionInfo {
  cloud?: string | undefined;
  region?: string | undefined;
}

export interface RemoveExchangeForListingRequest {
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RemoveExchangeForListingResponse {}

export interface RepoInfo {
  /** the git repo url e.g. https://github.com/databrickslabs/dolly.git */
  gitRepoUrl?: string | undefined;
}

export interface RepoInstallation {
  /** the user-specified repo name for their installed git repo listing */
  repoName?: string | undefined;
  /**
   * refers to the full url file path that navigates the user to the repo's entrypoint (e.g. a README.md file, or the repo file view in the unified UI)
   * should just be a relative path
   */
  repoPath?: string | undefined;
}

export interface SearchPublishedListingsForConsumer {
  /** Fuzzy matches query */
  query?: string | undefined;
  isFree?: boolean | undefined;
  isPrivateExchange?: boolean | undefined;
  /** Matches any of the following provider ids */
  providerIds?: string[] | undefined;
  /** Matches any of the following categories */
  categories?: Category[] | undefined;
  /** Matches any of the following asset types */
  assets?: AssetType[] | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SearchPublishedListingsForConsumer_Response {
  listings?: Listing[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ShareInfo {
  name?: string | undefined;
  type?: ListingShareType | undefined;
}

export interface SharedDataObject {
  /** Name of the shared object */
  name?: string | undefined;
  /** The type of the data object. Could be one of: TABLE, SCHEMA, NOTEBOOK_FILE, MODEL, VOLUME */
  dataObjectType?: string | undefined;
}

export interface TokenDetail {
  /**
   * These field names must follow the delta sharing protocol.
   * Original message: RetrieveToken.Response in managed-catalog/api/messages/recipient.proto
   */
  shareCredentialsVersion?: number | undefined;
  bearerToken?: string | undefined;
  endpoint?: string | undefined;
  expirationTime?: string | undefined;
}

export interface TokenInfo {
  /** Unique id of the Recipient Token. */
  id?: string | undefined;
  /** Time at which this Recipient Token was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of Recipient Token creator. */
  createdBy?: string | undefined;
  /**
   * Full activation url to retrieve the access token.
   * It will be empty if the token is already retrieved.
   */
  activationUrl?: string | undefined;
  /** Expiration timestamp of the token in epoch milliseconds. */
  expirationTime?: number | undefined;
  /** Time at which this Recipient Token was updated, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of Recipient Token updater. */
  updatedBy?: string | undefined;
}

export interface UninstallListing {
  listingId?: string | undefined;
  installationId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UninstallListing_Response {}

export interface UpdateExchangeFilterRequest {
  id?: string | undefined;
  filter?: ExchangeFilter | undefined;
}

export interface UpdateExchangeFilterResponse {
  filter?: ExchangeFilter | undefined;
}

export interface UpdateExchangeRequest {
  id?: string | undefined;
  exchange?: Exchange | undefined;
}

export interface UpdateExchangeResponse {
  exchange?: Exchange | undefined;
}

export interface UpdateInstallationDetail {
  listingId?: string | undefined;
  installationId?: string | undefined;
  installation?: InstallationDetail | undefined;
  rotateToken?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateInstallationDetail_Response {
  installation?: InstallationDetail | undefined;
}

export interface UpdateListingRequest {
  id?: string | undefined;
  listing?: Listing | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateListingRequest_Response {
  listing?: Listing | undefined;
}

export interface UpdatePersonalizationRequestStatusRequest {
  listingId?: string | undefined;
  requestId?: string | undefined;
  status?: PersonalizationRequestStatus | undefined;
  reason?: string | undefined;
  share?: ShareInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdatePersonalizationRequestStatusRequest_Response {
  request?: PersonalizationRequest | undefined;
}

export interface UpdateProviderAnalyticsDashboardRequest {
  /** id is immutable property and can't be updated. */
  id?: string | undefined;
  /**
   * this is the version of the dashboard template we want to update our user to
   * current expectation is that it should be equal to latest version of the dashboard template
   */
  version?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateProviderAnalyticsDashboardRequest_Response {
  /** id & version should be the same as the request */
  id?: string | undefined;
  version?: number | undefined;
  /** this is newly created Lakeview dashboard for the user */
  dashboardId?: string | undefined;
}

export interface UpdateProviderRequest {
  id?: string | undefined;
  provider?: ProviderInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateProviderRequest_Response {
  provider?: ProviderInfo | undefined;
}

export const unmarshalAddExchangeForListingResponseSchema: z.ZodType<AddExchangeForListingResponse> = z
  .object({
    exchange_for_listing: z.lazy(() => unmarshalExchangeListingSchema).optional(),
  })
  .transform(d => ({
    exchangeForListing: d.exchange_for_listing,
  }));

export const unmarshalBatchGetListingsResponseSchema: z.ZodType<BatchGetListingsResponse> = z
  .object({
    listings: z.array(z.lazy(() => unmarshalListingSchema)).optional(),
  })
  .transform(d => ({
    listings: d.listings,
  }));

export const unmarshalBatchGetProvidersResponseSchema: z.ZodType<BatchGetProvidersResponse> = z
  .object({
    providers: z.array(z.lazy(() => unmarshalProviderInfoSchema)).optional(),
  })
  .transform(d => ({
    providers: d.providers,
  }));

export const unmarshalContactInfoSchema: z.ZodType<ContactInfo> = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    company: z.string().optional(),
  })
  .transform(d => ({
    firstName: d.first_name,
    lastName: d.last_name,
    email: d.email,
    company: d.company,
  }));

export const unmarshalCreateExchangeFilterResponseSchema: z.ZodType<CreateExchangeFilterResponse> = z
  .object({
    filter_id: z.string().optional(),
  })
  .transform(d => ({
    filterId: d.filter_id,
  }));

export const unmarshalCreateExchangeResponseSchema: z.ZodType<CreateExchangeResponse> = z
  .object({
    exchange_id: z.string().optional(),
  })
  .transform(d => ({
    exchangeId: d.exchange_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateFileRequest_ResponseSchema: z.ZodType<CreateFileRequest_Response> = z
  .object({
    upload_url: z.string().optional(),
    file_info: z.lazy(() => unmarshalFileInfoSchema).optional(),
  })
  .transform(d => ({
    uploadUrl: d.upload_url,
    fileInfo: d.file_info,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateListingRequest_ResponseSchema: z.ZodType<CreateListingRequest_Response> = z
  .object({
    listing_id: z.string().optional(),
  })
  .transform(d => ({
    listingId: d.listing_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreatePersonalizationRequest_ResponseSchema: z.ZodType<CreatePersonalizationRequest_Response> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateProviderAnalyticsDashboardRequest_ResponseSchema: z.ZodType<CreateProviderAnalyticsDashboardRequest_Response> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateProviderRequest_ResponseSchema: z.ZodType<CreateProviderRequest_Response> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalDataRefreshInfoSchema: z.ZodType<DataRefreshInfo> = z
  .object({
    interval: z.number().optional(),
    unit: z.enum(DataRefresh).optional(),
  })
  .transform(d => ({
    interval: d.interval,
    unit: d.unit,
  }));

export const unmarshalDeleteExchangeFilterResponseSchema: z.ZodType<DeleteExchangeFilterResponse> = z
  .object({
  });

export const unmarshalDeleteExchangeResponseSchema: z.ZodType<DeleteExchangeResponse> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteFileRequest_ResponseSchema: z.ZodType<DeleteFileRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteListingRequest_ResponseSchema: z.ZodType<DeleteListingRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteProviderRequest_ResponseSchema: z.ZodType<DeleteProviderRequest_Response> = z
  .object({
  });

export const unmarshalExchangeSchema: z.ZodType<Exchange> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    filters: z.array(z.lazy(() => unmarshalExchangeFilterSchema)).optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    linked_listings: z.array(z.lazy(() => unmarshalExchangeListingSchema)).optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    comment: d.comment,
    filters: d.filters,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    linkedListings: d.linked_listings,
  }));

export const unmarshalExchangeFilterSchema: z.ZodType<ExchangeFilter> = z
  .object({
    id: z.string().optional(),
    exchange_id: z.string().optional(),
    filter_value: z.string().optional(),
    name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    filter_type: z.enum(ExchangeFilterType).optional(),
  })
  .transform(d => ({
    id: d.id,
    exchangeId: d.exchange_id,
    filterValue: d.filter_value,
    name: d.name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    filterType: d.filter_type,
  }));

export const unmarshalExchangeListingSchema: z.ZodType<ExchangeListing> = z
  .object({
    id: z.string().optional(),
    exchange_id: z.string().optional(),
    exchange_name: z.string().optional(),
    listing_id: z.string().optional(),
    listing_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    exchangeId: d.exchange_id,
    exchangeName: d.exchange_name,
    listingId: d.listing_id,
    listingName: d.listing_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
  }));

export const unmarshalFileInfoSchema: z.ZodType<FileInfo> = z
  .object({
    id: z.string().optional(),
    marketplace_file_type: z.enum(MarketplaceFileType).optional(),
    file_parent: z.lazy(() => unmarshalFileParentSchema).optional(),
    mime_type: z.string().optional(),
    download_link: z.string().optional(),
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
    display_name: z.string().optional(),
    status: z.enum(FileStatus).optional(),
    status_message: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    marketplaceFileType: d.marketplace_file_type,
    fileParent: d.file_parent,
    mimeType: d.mime_type,
    downloadLink: d.download_link,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    displayName: d.display_name,
    status: d.status,
    statusMessage: d.status_message,
  }));

export const unmarshalFileParentSchema: z.ZodType<FileParent> = z
  .object({
    parent_id: z.string().optional(),
    file_parent_type: z.enum(FileParentType).optional(),
  })
  .transform(d => ({
    parentId: d.parent_id,
    fileParentType: d.file_parent_type,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetAllInstallations_ResponseSchema: z.ZodType<GetAllInstallations_Response> = z
  .object({
    installations: z.array(z.lazy(() => unmarshalInstallationDetailSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    installations: d.installations,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetAllPersonalizationRequestsForConsumer_ResponseSchema: z.ZodType<GetAllPersonalizationRequestsForConsumer_Response> = z
  .object({
    personalization_requests: z.array(z.lazy(() => unmarshalPersonalizationRequestSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    personalizationRequests: d.personalization_requests,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalGetExchangeResponseSchema: z.ZodType<GetExchangeResponse> = z
  .object({
    exchange: z.lazy(() => unmarshalExchangeSchema).optional(),
  })
  .transform(d => ({
    exchange: d.exchange,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetFileRequest_ResponseSchema: z.ZodType<GetFileRequest_Response> = z
  .object({
    file_info: z.lazy(() => unmarshalFileInfoSchema).optional(),
  })
  .transform(d => ({
    fileInfo: d.file_info,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetInstallationDetails_ResponseSchema: z.ZodType<GetInstallationDetails_Response> = z
  .object({
    installations: z.array(z.lazy(() => unmarshalInstallationDetailSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    installations: d.installations,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetLatestVersionProviderAnalyticsDashboardRequest_ResponseSchema: z.ZodType<GetLatestVersionProviderAnalyticsDashboardRequest_Response> = z
  .object({
    version: z.number().optional(),
  })
  .transform(d => ({
    version: d.version,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetListingContent_ResponseSchema: z.ZodType<GetListingContent_Response> = z
  .object({
    shared_data_objects: z.array(z.lazy(() => unmarshalSharedDataObjectSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    sharedDataObjects: d.shared_data_objects,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetListingFulfillments_ResponseSchema: z.ZodType<GetListingFulfillments_Response> = z
  .object({
    fulfillments: z.array(z.lazy(() => unmarshalListingFulfillmentSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    fulfillments: d.fulfillments,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetListingRequest_ResponseSchema: z.ZodType<GetListingRequest_Response> = z
  .object({
    listing: z.lazy(() => unmarshalListingSchema).optional(),
  })
  .transform(d => ({
    listing: d.listing,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetListingsRequest_ResponseSchema: z.ZodType<GetListingsRequest_Response> = z
  .object({
    listings: z.array(z.lazy(() => unmarshalListingSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    listings: d.listings,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPersonalizationRequestsForConsumer_ResponseSchema: z.ZodType<GetPersonalizationRequestsForConsumer_Response> = z
  .object({
    personalization_requests: z.array(z.lazy(() => unmarshalPersonalizationRequestSchema)).optional(),
  })
  .transform(d => ({
    personalizationRequests: d.personalization_requests,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPersonalizationRequestsForProviderRequest_ResponseSchema: z.ZodType<GetPersonalizationRequestsForProviderRequest_Response> = z
  .object({
    personalization_requests: z.array(z.lazy(() => unmarshalPersonalizationRequestSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    personalizationRequests: d.personalization_requests,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetProviderRequest_ResponseSchema: z.ZodType<GetProviderRequest_Response> = z
  .object({
    provider: z.lazy(() => unmarshalProviderInfoSchema).optional(),
  })
  .transform(d => ({
    provider: d.provider,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPublishedListingForConsumer_ResponseSchema: z.ZodType<GetPublishedListingForConsumer_Response> = z
  .object({
    listing: z.lazy(() => unmarshalListingSchema).optional(),
  })
  .transform(d => ({
    listing: d.listing,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPublishedListingsForConsumer_ResponseSchema: z.ZodType<GetPublishedListingsForConsumer_Response> = z
  .object({
    listings: z.array(z.lazy(() => unmarshalListingSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    listings: d.listings,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPublishedProviderForConsumer_ResponseSchema: z.ZodType<GetPublishedProviderForConsumer_Response> = z
  .object({
    provider: z.lazy(() => unmarshalProviderInfoSchema).optional(),
  })
  .transform(d => ({
    provider: d.provider,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalInstallListing_ResponseSchema: z.ZodType<InstallListing_Response> = z
  .object({
    installation: z.lazy(() => unmarshalInstallationDetailSchema).optional(),
  })
  .transform(d => ({
    installation: d.installation,
  }));

export const unmarshalInstallationDetailSchema: z.ZodType<InstallationDetail> = z
  .object({
    id: z.string().optional(),
    listing_id: z.string().optional(),
    share_name: z.string().optional(),
    catalog_name: z.string().optional(),
    installed_on: z.number().optional(),
    status: z.enum(InstallationStatus).optional(),
    error_message: z.string().optional(),
    listing_name: z.string().optional(),
    repo_name: z.string().optional(),
    repo_path: z.string().optional(),
    recipient_type: z.enum(DeltaSharingRecipientType).optional(),
    tokens: z.array(z.lazy(() => unmarshalTokenInfoSchema)).optional(),
    token_detail: z.lazy(() => unmarshalTokenDetailSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    listingId: d.listing_id,
    shareName: d.share_name,
    catalogName: d.catalog_name,
    installedOn: d.installed_on,
    status: d.status,
    errorMessage: d.error_message,
    listingName: d.listing_name,
    repoName: d.repo_name,
    repoPath: d.repo_path,
    recipientType: d.recipient_type,
    tokens: d.tokens,
    tokenDetail: d.token_detail,
  }));

export const unmarshalListExchangeFiltersResponseSchema: z.ZodType<ListExchangeFiltersResponse> = z
  .object({
    filters: z.array(z.lazy(() => unmarshalExchangeFilterSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    filters: d.filters,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListExchangesForListingResponseSchema: z.ZodType<ListExchangesForListingResponse> = z
  .object({
    exchange_listing: z.array(z.lazy(() => unmarshalExchangeListingSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    exchangeListing: d.exchange_listing,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListExchangesResponseSchema: z.ZodType<ListExchangesResponse> = z
  .object({
    exchanges: z.array(z.lazy(() => unmarshalExchangeSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    exchanges: d.exchanges,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListFilesRequest_ResponseSchema: z.ZodType<ListFilesRequest_Response> = z
  .object({
    file_infos: z.array(z.lazy(() => unmarshalFileInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    fileInfos: d.file_infos,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListListingsForExchangeResponseSchema: z.ZodType<ListListingsForExchangeResponse> = z
  .object({
    exchange_listings: z.array(z.lazy(() => unmarshalExchangeListingSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    exchangeListings: d.exchange_listings,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListProviderAnalyticsDashboardRequest_ResponseSchema: z.ZodType<ListProviderAnalyticsDashboardRequest_Response> = z
  .object({
    id: z.string().optional(),
    version: z.number().optional(),
    dashboard_id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    version: d.version,
    dashboardId: d.dashboard_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListProvidersRequest_ResponseSchema: z.ZodType<ListProvidersRequest_Response> = z
  .object({
    providers: z.array(z.lazy(() => unmarshalProviderInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    providers: d.providers,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListPublishedProvidersForConsumer_ResponseSchema: z.ZodType<ListPublishedProvidersForConsumer_Response> = z
  .object({
    providers: z.array(z.lazy(() => unmarshalProviderInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    providers: d.providers,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListingSchema: z.ZodType<Listing> = z
  .object({
    id: z.string().optional(),
    summary: z.lazy(() => unmarshalListingSummarySchema).optional(),
    detail: z.lazy(() => unmarshalListingDetailSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    summary: d.summary,
    detail: d.detail,
  }));

export const unmarshalListingDetailSchema: z.ZodType<ListingDetail> = z
  .object({
    description: z.string().optional(),
    terms_of_service: z.string().optional(),
    documentation_link: z.string().optional(),
    support_link: z.string().optional(),
    file_ids: z.array(z.string()).optional(),
    privacy_policy_link: z.string().optional(),
    embedded_notebook_file_infos: z.array(z.lazy(() => unmarshalFileInfoSchema)).optional(),
    geographical_coverage: z.string().optional(),
    cost: z.enum(Cost).optional(),
    pricing_model: z.string().optional(),
    update_frequency: z.lazy(() => unmarshalDataRefreshInfoSchema).optional(),
    collection_granularity: z.lazy(() => unmarshalDataRefreshInfoSchema).optional(),
    collection_date_start: z.number().optional(),
    collection_date_end: z.number().optional(),
    data_source: z.string().optional(),
    size: z.number().optional(),
    assets: z.array(z.enum(AssetType)).optional(),
    license: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalListingTagSchema)).optional(),
  })
  .transform(d => ({
    description: d.description,
    termsOfService: d.terms_of_service,
    documentationLink: d.documentation_link,
    supportLink: d.support_link,
    fileIds: d.file_ids,
    privacyPolicyLink: d.privacy_policy_link,
    embeddedNotebookFileInfos: d.embedded_notebook_file_infos,
    geographicalCoverage: d.geographical_coverage,
    cost: d.cost,
    pricingModel: d.pricing_model,
    updateFrequency: d.update_frequency,
    collectionGranularity: d.collection_granularity,
    collectionDateStart: d.collection_date_start,
    collectionDateEnd: d.collection_date_end,
    dataSource: d.data_source,
    size: d.size,
    assets: d.assets,
    license: d.license,
    tags: d.tags,
  }));

export const unmarshalListingFulfillmentSchema: z.ZodType<ListingFulfillment> = z
  .object({
    listing_id: z.string().optional(),
    fulfillment_type: z.enum(FulfillmentType).optional(),
    share_info: z.lazy(() => unmarshalShareInfoSchema).optional(),
    repo_info: z.lazy(() => unmarshalRepoInfoSchema).optional(),
    recipient_type: z.enum(DeltaSharingRecipientType).optional(),
  })
  .transform(d => ({
    listingId: d.listing_id,
    fulfillmentType: d.fulfillment_type,
    shareInfo: d.share_info,
    repoInfo: d.repo_info,
    recipientType: d.recipient_type,
  }));

export const unmarshalListingSettingSchema: z.ZodType<ListingSetting> = z
  .object({
    visibility: z.enum(Visibility).optional(),
  })
  .transform(d => ({
    visibility: d.visibility,
  }));

export const unmarshalListingSummarySchema: z.ZodType<ListingSummary> = z
  .object({
    name: z.string().optional(),
    subtitle: z.string().optional(),
    status: z.enum(ListingStatus).optional(),
    share: z.lazy(() => unmarshalShareInfoSchema).optional(),
    provider_region: z.lazy(() => unmarshalRegionInfoSchema).optional(),
    setting: z.lazy(() => unmarshalListingSettingSchema).optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    published_at: z.number().optional(),
    published_by: z.string().optional(),
    categories: z.array(z.enum(Category)).optional(),
    listingType: z.enum(ListingType).optional(),
    created_by_id: z.number().optional(),
    updated_by_id: z.number().optional(),
    provider_id: z.string().optional(),
    exchange_ids: z.array(z.string()).optional(),
    git_repo: z.lazy(() => unmarshalRepoInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    subtitle: d.subtitle,
    status: d.status,
    share: d.share,
    providerRegion: d.provider_region,
    setting: d.setting,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    publishedAt: d.published_at,
    publishedBy: d.published_by,
    categories: d.categories,
    listingType: d.listingType,
    createdById: d.created_by_id,
    updatedById: d.updated_by_id,
    providerId: d.provider_id,
    exchangeIds: d.exchange_ids,
    gitRepo: d.git_repo,
  }));

export const unmarshalListingTagSchema: z.ZodType<ListingTag> = z
  .object({
    tag_name: z.enum(ListingTagType).optional(),
    tag_values: z.array(z.string()).optional(),
  })
  .transform(d => ({
    tagName: d.tag_name,
    tagValues: d.tag_values,
  }));

export const unmarshalPersonalizationRequestSchema: z.ZodType<PersonalizationRequest> = z
  .object({
    id: z.string().optional(),
    consumer_region: z.lazy(() => unmarshalRegionInfoSchema).optional(),
    contact_info: z.lazy(() => unmarshalContactInfoSchema).optional(),
    comment: z.string().optional(),
    intended_use: z.string().optional(),
    status: z.enum(PersonalizationRequestStatus).optional(),
    status_message: z.string().optional(),
    share: z.lazy(() => unmarshalShareInfoSchema).optional(),
    created_at: z.number().optional(),
    listing_id: z.string().optional(),
    updated_at: z.number().optional(),
    metastore_id: z.string().optional(),
    listing_name: z.string().optional(),
    is_from_lighthouse: z.boolean().optional(),
    provider_id: z.string().optional(),
    recipient_type: z.enum(DeltaSharingRecipientType).optional(),
  })
  .transform(d => ({
    id: d.id,
    consumerRegion: d.consumer_region,
    contactInfo: d.contact_info,
    comment: d.comment,
    intendedUse: d.intended_use,
    status: d.status,
    statusMessage: d.status_message,
    share: d.share,
    createdAt: d.created_at,
    listingId: d.listing_id,
    updatedAt: d.updated_at,
    metastoreId: d.metastore_id,
    listingName: d.listing_name,
    isFromLighthouse: d.is_from_lighthouse,
    providerId: d.provider_id,
    recipientType: d.recipient_type,
  }));

export const unmarshalProviderInfoSchema: z.ZodType<ProviderInfo> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    icon_file_path: z.string().optional(),
    business_contact_email: z.string().optional(),
    support_contact_email: z.string().optional(),
    is_featured: z.boolean().optional(),
    published_by: z.string().optional(),
    company_website_link: z.string().optional(),
    icon_file_id: z.string().optional(),
    term_of_service_link: z.string().optional(),
    privacy_policy_link: z.string().optional(),
    dark_mode_icon_file_id: z.string().optional(),
    dark_mode_icon_file_path: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    description: d.description,
    iconFilePath: d.icon_file_path,
    businessContactEmail: d.business_contact_email,
    supportContactEmail: d.support_contact_email,
    isFeatured: d.is_featured,
    publishedBy: d.published_by,
    companyWebsiteLink: d.company_website_link,
    iconFileId: d.icon_file_id,
    termOfServiceLink: d.term_of_service_link,
    privacyPolicyLink: d.privacy_policy_link,
    darkModeIconFileId: d.dark_mode_icon_file_id,
    darkModeIconFilePath: d.dark_mode_icon_file_path,
  }));

export const unmarshalRegionInfoSchema: z.ZodType<RegionInfo> = z
  .object({
    cloud: z.string().optional(),
    region: z.string().optional(),
  })
  .transform(d => ({
    cloud: d.cloud,
    region: d.region,
  }));

export const unmarshalRemoveExchangeForListingResponseSchema: z.ZodType<RemoveExchangeForListingResponse> = z
  .object({
  });

export const unmarshalRepoInfoSchema: z.ZodType<RepoInfo> = z
  .object({
    git_repo_url: z.string().optional(),
  })
  .transform(d => ({
    gitRepoUrl: d.git_repo_url,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSearchPublishedListingsForConsumer_ResponseSchema: z.ZodType<SearchPublishedListingsForConsumer_Response> = z
  .object({
    listings: z.array(z.lazy(() => unmarshalListingSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    listings: d.listings,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalShareInfoSchema: z.ZodType<ShareInfo> = z
  .object({
    name: z.string().optional(),
    type: z.enum(ListingShareType).optional(),
  })
  .transform(d => ({
    name: d.name,
    type: d.type,
  }));

export const unmarshalSharedDataObjectSchema: z.ZodType<SharedDataObject> = z
  .object({
    name: z.string().optional(),
    data_object_type: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dataObjectType: d.data_object_type,
  }));

export const unmarshalTokenDetailSchema: z.ZodType<TokenDetail> = z
  .object({
    shareCredentialsVersion: z.number().optional(),
    bearerToken: z.string().optional(),
    endpoint: z.string().optional(),
    expirationTime: z.string().optional(),
  })
  .transform(d => ({
    shareCredentialsVersion: d.shareCredentialsVersion,
    bearerToken: d.bearerToken,
    endpoint: d.endpoint,
    expirationTime: d.expirationTime,
  }));

export const unmarshalTokenInfoSchema: z.ZodType<TokenInfo> = z
  .object({
    id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    activation_url: z.string().optional(),
    expiration_time: z.number().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    activationUrl: d.activation_url,
    expirationTime: d.expiration_time,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUninstallListing_ResponseSchema: z.ZodType<UninstallListing_Response> = z
  .object({
  });

export const unmarshalUpdateExchangeFilterResponseSchema: z.ZodType<UpdateExchangeFilterResponse> = z
  .object({
    filter: z.lazy(() => unmarshalExchangeFilterSchema).optional(),
  })
  .transform(d => ({
    filter: d.filter,
  }));

export const unmarshalUpdateExchangeResponseSchema: z.ZodType<UpdateExchangeResponse> = z
  .object({
    exchange: z.lazy(() => unmarshalExchangeSchema).optional(),
  })
  .transform(d => ({
    exchange: d.exchange,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateInstallationDetail_ResponseSchema: z.ZodType<UpdateInstallationDetail_Response> = z
  .object({
    installation: z.lazy(() => unmarshalInstallationDetailSchema).optional(),
  })
  .transform(d => ({
    installation: d.installation,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateListingRequest_ResponseSchema: z.ZodType<UpdateListingRequest_Response> = z
  .object({
    listing: z.lazy(() => unmarshalListingSchema).optional(),
  })
  .transform(d => ({
    listing: d.listing,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdatePersonalizationRequestStatusRequest_ResponseSchema: z.ZodType<UpdatePersonalizationRequestStatusRequest_Response> = z
  .object({
    request: z.lazy(() => unmarshalPersonalizationRequestSchema).optional(),
  })
  .transform(d => ({
    request: d.request,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateProviderAnalyticsDashboardRequest_ResponseSchema: z.ZodType<UpdateProviderAnalyticsDashboardRequest_Response> = z
  .object({
    id: z.string().optional(),
    version: z.number().optional(),
    dashboard_id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    version: d.version,
    dashboardId: d.dashboard_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateProviderRequest_ResponseSchema: z.ZodType<UpdateProviderRequest_Response> = z
  .object({
    provider: z.lazy(() => unmarshalProviderInfoSchema).optional(),
  })
  .transform(d => ({
    provider: d.provider,
  }));

export const marshalAddExchangeForListingRequestSchema: z.ZodType = z
  .object({
    listingId: z.string().optional(),
    exchangeId: z.string().optional(),
  })
  .transform(d => ({
    listing_id: d.listingId,
    exchange_id: d.exchangeId,
  }));

export const marshalConsumerTermsSchema: z.ZodType = z
  .object({
    version: z.string().optional(),
  })
  .transform(d => ({
    version: d.version,
  }));

export const marshalCreateExchangeFilterRequestSchema: z.ZodType = z
  .object({
    filter: z.lazy(() => marshalExchangeFilterSchema).optional(),
  })
  .transform(d => ({
    filter: d.filter,
  }));

export const marshalCreateExchangeRequestSchema: z.ZodType = z
  .object({
    exchange: z.lazy(() => marshalExchangeSchema).optional(),
  })
  .transform(d => ({
    exchange: d.exchange,
  }));

export const marshalCreateFileRequestSchema: z.ZodType = z
  .object({
    fileParent: z.lazy(() => marshalFileParentSchema).optional(),
    marketplaceFileType: z.enum(MarketplaceFileType).optional(),
    mimeType: z.string().optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    file_parent: d.fileParent,
    marketplace_file_type: d.marketplaceFileType,
    mime_type: d.mimeType,
    display_name: d.displayName,
  }));

export const marshalCreateListingRequestSchema: z.ZodType = z
  .object({
    listing: z.lazy(() => marshalListingSchema).optional(),
  })
  .transform(d => ({
    listing: d.listing,
  }));

export const marshalCreatePersonalizationRequestSchema: z.ZodType = z
  .object({
    listingId: z.string().optional(),
    comment: z.string().optional(),
    intendedUse: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    company: z.string().optional(),
    isFromLighthouse: z.boolean().optional(),
    recipientType: z.enum(DeltaSharingRecipientType).optional(),
    acceptedConsumerTerms: z.lazy(() => marshalConsumerTermsSchema).optional(),
  })
  .transform(d => ({
    listing_id: d.listingId,
    comment: d.comment,
    intended_use: d.intendedUse,
    first_name: d.firstName,
    last_name: d.lastName,
    company: d.company,
    is_from_lighthouse: d.isFromLighthouse,
    recipient_type: d.recipientType,
    accepted_consumer_terms: d.acceptedConsumerTerms,
  }));

export const marshalCreateProviderAnalyticsDashboardRequestSchema: z.ZodType = z
  .object({
  });

export const marshalCreateProviderRequestSchema: z.ZodType = z
  .object({
    provider: z.lazy(() => marshalProviderInfoSchema).optional(),
  })
  .transform(d => ({
    provider: d.provider,
  }));

export const marshalDataRefreshInfoSchema: z.ZodType = z
  .object({
    interval: z.number().optional(),
    unit: z.enum(DataRefresh).optional(),
  })
  .transform(d => ({
    interval: d.interval,
    unit: d.unit,
  }));

export const marshalExchangeSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    filters: z.array(z.lazy(() => marshalExchangeFilterSchema)).optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    linkedListings: z.array(z.lazy(() => marshalExchangeListingSchema)).optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    comment: d.comment,
    filters: d.filters,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    linked_listings: d.linkedListings,
  }));

export const marshalExchangeFilterSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    exchangeId: z.string().optional(),
    filterValue: z.string().optional(),
    name: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    filterType: z.enum(ExchangeFilterType).optional(),
  })
  .transform(d => ({
    id: d.id,
    exchange_id: d.exchangeId,
    filter_value: d.filterValue,
    name: d.name,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    filter_type: d.filterType,
  }));

export const marshalExchangeListingSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    exchangeId: z.string().optional(),
    exchangeName: z.string().optional(),
    listingId: z.string().optional(),
    listingName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    exchange_id: d.exchangeId,
    exchange_name: d.exchangeName,
    listing_id: d.listingId,
    listing_name: d.listingName,
    created_at: d.createdAt,
    created_by: d.createdBy,
  }));

export const marshalFileInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    marketplaceFileType: z.enum(MarketplaceFileType).optional(),
    fileParent: z.lazy(() => marshalFileParentSchema).optional(),
    mimeType: z.string().optional(),
    downloadLink: z.string().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    displayName: z.string().optional(),
    status: z.enum(FileStatus).optional(),
    statusMessage: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    marketplace_file_type: d.marketplaceFileType,
    file_parent: d.fileParent,
    mime_type: d.mimeType,
    download_link: d.downloadLink,
    created_at: d.createdAt,
    updated_at: d.updatedAt,
    display_name: d.displayName,
    status: d.status,
    status_message: d.statusMessage,
  }));

export const marshalFileParentSchema: z.ZodType = z
  .object({
    parentId: z.string().optional(),
    fileParentType: z.enum(FileParentType).optional(),
  })
  .transform(d => ({
    parent_id: d.parentId,
    file_parent_type: d.fileParentType,
  }));

export const marshalInstallListingSchema: z.ZodType = z
  .object({
    listingId: z.string().optional(),
    shareName: z.string().optional(),
    catalogName: z.string().optional(),
    repoDetail: z.lazy(() => marshalRepoInstallationSchema).optional(),
    recipientType: z.enum(DeltaSharingRecipientType).optional(),
    acceptedConsumerTerms: z.lazy(() => marshalConsumerTermsSchema).optional(),
  })
  .transform(d => ({
    listing_id: d.listingId,
    share_name: d.shareName,
    catalog_name: d.catalogName,
    repo_detail: d.repoDetail,
    recipient_type: d.recipientType,
    accepted_consumer_terms: d.acceptedConsumerTerms,
  }));

export const marshalInstallationDetailSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    listingId: z.string().optional(),
    shareName: z.string().optional(),
    catalogName: z.string().optional(),
    installedOn: z.number().optional(),
    status: z.enum(InstallationStatus).optional(),
    errorMessage: z.string().optional(),
    listingName: z.string().optional(),
    repoName: z.string().optional(),
    repoPath: z.string().optional(),
    recipientType: z.enum(DeltaSharingRecipientType).optional(),
    tokens: z.array(z.lazy(() => marshalTokenInfoSchema)).optional(),
    tokenDetail: z.lazy(() => marshalTokenDetailSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    listing_id: d.listingId,
    share_name: d.shareName,
    catalog_name: d.catalogName,
    installed_on: d.installedOn,
    status: d.status,
    error_message: d.errorMessage,
    listing_name: d.listingName,
    repo_name: d.repoName,
    repo_path: d.repoPath,
    recipient_type: d.recipientType,
    tokens: d.tokens,
    token_detail: d.tokenDetail,
  }));

export const marshalListingSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    summary: z.lazy(() => marshalListingSummarySchema).optional(),
    detail: z.lazy(() => marshalListingDetailSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    summary: d.summary,
    detail: d.detail,
  }));

export const marshalListingDetailSchema: z.ZodType = z
  .object({
    description: z.string().optional(),
    termsOfService: z.string().optional(),
    documentationLink: z.string().optional(),
    supportLink: z.string().optional(),
    fileIds: z.array(z.string()).optional(),
    privacyPolicyLink: z.string().optional(),
    embeddedNotebookFileInfos: z.array(z.lazy(() => marshalFileInfoSchema)).optional(),
    geographicalCoverage: z.string().optional(),
    cost: z.enum(Cost).optional(),
    pricingModel: z.string().optional(),
    updateFrequency: z.lazy(() => marshalDataRefreshInfoSchema).optional(),
    collectionGranularity: z.lazy(() => marshalDataRefreshInfoSchema).optional(),
    collectionDateStart: z.number().optional(),
    collectionDateEnd: z.number().optional(),
    dataSource: z.string().optional(),
    size: z.number().optional(),
    assets: z.array(z.enum(AssetType)).optional(),
    license: z.string().optional(),
    tags: z.array(z.lazy(() => marshalListingTagSchema)).optional(),
  })
  .transform(d => ({
    description: d.description,
    terms_of_service: d.termsOfService,
    documentation_link: d.documentationLink,
    support_link: d.supportLink,
    file_ids: d.fileIds,
    privacy_policy_link: d.privacyPolicyLink,
    embedded_notebook_file_infos: d.embeddedNotebookFileInfos,
    geographical_coverage: d.geographicalCoverage,
    cost: d.cost,
    pricing_model: d.pricingModel,
    update_frequency: d.updateFrequency,
    collection_granularity: d.collectionGranularity,
    collection_date_start: d.collectionDateStart,
    collection_date_end: d.collectionDateEnd,
    data_source: d.dataSource,
    size: d.size,
    assets: d.assets,
    license: d.license,
    tags: d.tags,
  }));

export const marshalListingSettingSchema: z.ZodType = z
  .object({
    visibility: z.enum(Visibility).optional(),
  })
  .transform(d => ({
    visibility: d.visibility,
  }));

export const marshalListingSummarySchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    subtitle: z.string().optional(),
    status: z.enum(ListingStatus).optional(),
    share: z.lazy(() => marshalShareInfoSchema).optional(),
    providerRegion: z.lazy(() => marshalRegionInfoSchema).optional(),
    setting: z.lazy(() => marshalListingSettingSchema).optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    publishedAt: z.number().optional(),
    publishedBy: z.string().optional(),
    categories: z.array(z.enum(Category)).optional(),
    listingType: z.enum(ListingType).optional(),
    createdById: z.number().optional(),
    updatedById: z.number().optional(),
    providerId: z.string().optional(),
    exchangeIds: z.array(z.string()).optional(),
    gitRepo: z.lazy(() => marshalRepoInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    subtitle: d.subtitle,
    status: d.status,
    share: d.share,
    provider_region: d.providerRegion,
    setting: d.setting,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    published_at: d.publishedAt,
    published_by: d.publishedBy,
    categories: d.categories,
    listingType: d.listingType,
    created_by_id: d.createdById,
    updated_by_id: d.updatedById,
    provider_id: d.providerId,
    exchange_ids: d.exchangeIds,
    git_repo: d.gitRepo,
  }));

export const marshalListingTagSchema: z.ZodType = z
  .object({
    tagName: z.enum(ListingTagType).optional(),
    tagValues: z.array(z.string()).optional(),
  })
  .transform(d => ({
    tag_name: d.tagName,
    tag_values: d.tagValues,
  }));

export const marshalProviderInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    iconFilePath: z.string().optional(),
    businessContactEmail: z.string().optional(),
    supportContactEmail: z.string().optional(),
    isFeatured: z.boolean().optional(),
    publishedBy: z.string().optional(),
    companyWebsiteLink: z.string().optional(),
    iconFileId: z.string().optional(),
    termOfServiceLink: z.string().optional(),
    privacyPolicyLink: z.string().optional(),
    darkModeIconFileId: z.string().optional(),
    darkModeIconFilePath: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    description: d.description,
    icon_file_path: d.iconFilePath,
    business_contact_email: d.businessContactEmail,
    support_contact_email: d.supportContactEmail,
    is_featured: d.isFeatured,
    published_by: d.publishedBy,
    company_website_link: d.companyWebsiteLink,
    icon_file_id: d.iconFileId,
    term_of_service_link: d.termOfServiceLink,
    privacy_policy_link: d.privacyPolicyLink,
    dark_mode_icon_file_id: d.darkModeIconFileId,
    dark_mode_icon_file_path: d.darkModeIconFilePath,
  }));

export const marshalRegionInfoSchema: z.ZodType = z
  .object({
    cloud: z.string().optional(),
    region: z.string().optional(),
  })
  .transform(d => ({
    cloud: d.cloud,
    region: d.region,
  }));

export const marshalRepoInfoSchema: z.ZodType = z
  .object({
    gitRepoUrl: z.string().optional(),
  })
  .transform(d => ({
    git_repo_url: d.gitRepoUrl,
  }));

export const marshalRepoInstallationSchema: z.ZodType = z
  .object({
    repoName: z.string().optional(),
    repoPath: z.string().optional(),
  })
  .transform(d => ({
    repo_name: d.repoName,
    repo_path: d.repoPath,
  }));

export const marshalShareInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    type: z.enum(ListingShareType).optional(),
  })
  .transform(d => ({
    name: d.name,
    type: d.type,
  }));

export const marshalTokenDetailSchema: z.ZodType = z
  .object({
    shareCredentialsVersion: z.number().optional(),
    bearerToken: z.string().optional(),
    endpoint: z.string().optional(),
    expirationTime: z.string().optional(),
  })
  .transform(d => ({
    shareCredentialsVersion: d.shareCredentialsVersion,
    bearerToken: d.bearerToken,
    endpoint: d.endpoint,
    expirationTime: d.expirationTime,
  }));

export const marshalTokenInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    activationUrl: z.string().optional(),
    expirationTime: z.number().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    created_at: d.createdAt,
    created_by: d.createdBy,
    activation_url: d.activationUrl,
    expiration_time: d.expirationTime,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
  }));

export const marshalUpdateExchangeFilterRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    filter: z.lazy(() => marshalExchangeFilterSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    filter: d.filter,
  }));

export const marshalUpdateExchangeRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    exchange: z.lazy(() => marshalExchangeSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    exchange: d.exchange,
  }));

export const marshalUpdateInstallationDetailSchema: z.ZodType = z
  .object({
    listingId: z.string().optional(),
    installationId: z.string().optional(),
    installation: z.lazy(() => marshalInstallationDetailSchema).optional(),
    rotateToken: z.boolean().optional(),
  })
  .transform(d => ({
    listing_id: d.listingId,
    installation_id: d.installationId,
    installation: d.installation,
    rotate_token: d.rotateToken,
  }));

export const marshalUpdateListingRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    listing: z.lazy(() => marshalListingSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    listing: d.listing,
  }));

export const marshalUpdatePersonalizationRequestStatusRequestSchema: z.ZodType = z
  .object({
    listingId: z.string().optional(),
    requestId: z.string().optional(),
    status: z.enum(PersonalizationRequestStatus).optional(),
    reason: z.string().optional(),
    share: z.lazy(() => marshalShareInfoSchema).optional(),
  })
  .transform(d => ({
    listing_id: d.listingId,
    request_id: d.requestId,
    status: d.status,
    reason: d.reason,
    share: d.share,
  }));

export const marshalUpdateProviderAnalyticsDashboardRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    version: z.number().optional(),
  })
  .transform(d => ({
    id: d.id,
    version: d.version,
  }));

export const marshalUpdateProviderRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    provider: z.lazy(() => marshalProviderInfoSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    provider: d.provider,
  }));
