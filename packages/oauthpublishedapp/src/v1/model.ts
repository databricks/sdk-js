// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface ListPublishedOAuthApps {
  /** The account ID. */
  accountId?: string | undefined;
  /** A token that can be used to get the next page of results. */
  pageToken?: string | undefined;
  /** The max number of OAuth published apps to return in one page. */
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListPublishedOAuthApps_Response {
  /** List of Published OAuth Apps. */
  apps?: PublishedOAuthApp[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface PublishedOAuthApp {
  /** Unique ID of the published OAuth app. */
  appId?: string | undefined;
  /** Client ID of the published OAuth app. It is the client_id in the OAuth flow */
  clientId?: string | undefined;
  /** The display name of the published OAuth app. */
  name?: string | undefined;
  /** Description of the published OAuth app. */
  description?: string | undefined;
  /** Whether the published OAuth app is a confidential client. It is always false for published OAuth apps. */
  isConfidentialClient?: boolean | undefined;
  /** Redirect URLs of the published OAuth app. */
  redirectUrls?: string[] | undefined;
  /** Required scopes for the published OAuth app. */
  scopes?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListPublishedOAuthApps_ResponseSchema: z.ZodType<ListPublishedOAuthApps_Response> =
  z
    .object({
      apps: z.array(z.lazy(() => unmarshalPublishedOAuthAppSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      apps: d.apps,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPublishedOAuthAppSchema: z.ZodType<PublishedOAuthApp> = z
  .object({
    app_id: z.string().optional(),
    client_id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    is_confidential_client: z.boolean().optional(),
    redirect_urls: z.array(z.string()).optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    appId: d.app_id,
    clientId: d.client_id,
    name: d.name,
    description: d.description,
    isConfidentialClient: d.is_confidential_client,
    redirectUrls: d.redirect_urls,
    scopes: d.scopes,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListPublishedOAuthApps_ResponseSchema: z.ZodType = z
  .object({
    apps: z.array(z.lazy(() => marshalPublishedOAuthAppSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    apps: d.apps,
    next_page_token: d.nextPageToken,
  }));

export const marshalPublishedOAuthAppSchema: z.ZodType = z
  .object({
    appId: z.string().optional(),
    clientId: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    isConfidentialClient: z.boolean().optional(),
    redirectUrls: z.array(z.string()).optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    app_id: d.appId,
    client_id: d.clientId,
    name: d.name,
    description: d.description,
    is_confidential_client: d.isConfidentialClient,
    redirect_urls: d.redirectUrls,
    scopes: d.scopes,
  }));

const listPublishedOAuthAppsFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
};

export function listPublishedOAuthAppsFieldMask(
  ...paths: string[]
): FieldMask<ListPublishedOAuthApps> {
  return FieldMask.build<ListPublishedOAuthApps>(
    paths,
    listPublishedOAuthAppsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listPublishedOAuthApps_ResponseFieldMaskSchema: FieldMaskSchema = {
  apps: {wire: 'apps'},
  nextPageToken: {wire: 'next_page_token'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listPublishedOAuthApps_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListPublishedOAuthApps_Response> {
  return FieldMask.build<ListPublishedOAuthApps_Response>(
    paths,
    listPublishedOAuthApps_ResponseFieldMaskSchema
  );
}

const publishedOAuthAppFieldMaskSchema: FieldMaskSchema = {
  appId: {wire: 'app_id'},
  clientId: {wire: 'client_id'},
  description: {wire: 'description'},
  isConfidentialClient: {wire: 'is_confidential_client'},
  name: {wire: 'name'},
  redirectUrls: {wire: 'redirect_urls'},
  scopes: {wire: 'scopes'},
};

export function publishedOAuthAppFieldMask(
  ...paths: string[]
): FieldMask<PublishedOAuthApp> {
  return FieldMask.build<PublishedOAuthApp>(
    paths,
    publishedOAuthAppFieldMaskSchema
  );
}
