// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import {z} from 'zod';
import type {
  CreateWorkspacePublicRequest,
  CustomerFacingWorkspace,
  DeleteWorkspacePublicRequest,
  GetWorkspacePublicRequest,
  ListWorkspacesPublicRequest,
  ListWorkspacesPublicResponse,
  UpdateWorkspacePublicRequest,
} from './model';
import {
  WorkspaceStatus,
  marshalCreateWorkspacePublicRequestSchema,
  marshalCustomerFacingWorkspaceSchema,
  unmarshalCustomerFacingWorkspaceSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class Client {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.accountId = options.accountId;
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a new workspace using a credential configuration and a storage configuration, an optional network configuration (if using a customer-managed VPC), an optional managed services key configuration (if using customer-managed keys for managed services), and an optional storage key configuration (if using customer-managed keys for storage). The key configurations used for managed services and storage encryption can be the same or different.
   *
   * Important: This operation is asynchronous. A response with HTTP status code 200 means the request has been accepted and is in progress, but does not mean that the workspace deployed successfully and is running. The initial workspace status is typically PROVISIONING. Use the workspace ID (workspace_id) field in the response to identify the new workspace and make repeated GET requests with the workspace ID and check its status. The workspace becomes available when the status changes to RUNNING.
   *
   * You can share one customer-managed VPC with multiple workspaces in a single account. It is not required to create a new VPC for each workspace. However, you cannot reuse subnets or Security Groups between workspaces. If you plan to share one VPC with multiple workspaces, make sure you size your VPC and subnets accordingly. Because a Databricks Account API network configuration encapsulates this information, you cannot reuse a Databricks Account API network configuration across workspaces.
   *
   * For information about how to create a new workspace with this API including error handling, see [Create a new workspace using the Account API](http://docs.databricks.com/administration-guide/account-api/new-workspace.html).
   *
   * Important: Customer-managed VPCs, PrivateLink, and customer-managed keys are supported on a limited set of deployment and subscription types. If you have questions about availability, contact your <Databricks> representative.
   *
   * This operation is available only if your account is on the E2 version of the platform or on a select custom plan that allows multiple workspaces per account.
   */
  async createWorkspacePublic(
    req: CreateWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingWorkspace> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces`;
    const body = marshalRequest(req, marshalCreateWorkspacePublicRequestSchema);
    let resp: CustomerFacingWorkspace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingWorkspaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createWorkspacePublicWaiter(
    req: CreateWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<CreateWorkspacePublicWaiter> {
    const resp = await this.createWorkspacePublic(req, options);
    if (resp.workspaceId === undefined) {
      throw new Error(
        'response field workspaceId required for polling is missing'
      );
    }
    return new CreateWorkspacePublicWaiter(this, resp.workspaceId);
  }

  /** Deletes a <Databricks> workspace, both specified by ID. */
  async deleteWorkspacePublic(
    req: DeleteWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingWorkspace> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}`;
    let resp: CustomerFacingWorkspace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingWorkspaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets information including status for a <Databricks> workspace, specified by ID. In the response, the `workspace_status` field indicates the current status. After initial workspace creation (which is asynchronous), make repeated `GET` requests with the workspace ID and check its status. The workspace becomes available when the status changes to `RUNNING`.
   * For information about how to create a new workspace with this API **including error handling**, see [Create a new workspace using the Account API](http://docs.databricks.com/administration-guide/account-api/new-workspace.html).
   */
  async getWorkspacePublic(
    req: GetWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingWorkspace> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}`;
    let resp: CustomerFacingWorkspace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingWorkspaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists <Databricks> workspaces for an account. */
  async listWorkspacesPublic(
    req: ListWorkspacesPublicRequest,
    options?: CallOptions
  ): Promise<ListWorkspacesPublicResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces`;
    let resp: ListWorkspacesPublicResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        workspaces: parseResponse(
          respBody,
          z.array(z.lazy(() => unmarshalCustomerFacingWorkspaceSchema))
        ),
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a workspace. */
  async updateWorkspacePublic(
    req: UpdateWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingWorkspace> {
    const url = `${this.host}/api/2.0/accounts/${req.customerFacingWorkspace?.accountId ?? ''}/workspaces/${String(req.customerFacingWorkspace?.workspaceId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.customerFacingWorkspace,
      marshalCustomerFacingWorkspaceSchema
    );
    let resp: CustomerFacingWorkspace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingWorkspaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateWorkspacePublicWaiter(
    req: UpdateWorkspacePublicRequest,
    options?: CallOptions
  ): Promise<UpdateWorkspacePublicWaiter> {
    const resp = await this.updateWorkspacePublic(req, options);
    if (resp.workspaceId === undefined) {
      throw new Error(
        'response field workspaceId required for polling is missing'
      );
    }
    return new UpdateWorkspacePublicWaiter(this, resp.workspaceId);
  }
}

export class CreateWorkspacePublicWaiter {
  constructor(
    private readonly client: Client,
    readonly workspaceId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<CustomerFacingWorkspace> {
    let result: CustomerFacingWorkspace | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWorkspacePublic(
        {
          workspaceId: this.workspaceId,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.workspaceStatus;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case WorkspaceStatus.RUNNING:
          result = pollResp;
          return;
        case WorkspaceStatus.BANNED:
        case WorkspaceStatus.FAILED: {
          const msg = pollResp.workspaceStatusMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWorkspacePublic(
      {
        workspaceId: this.workspaceId,
      },
      options
    );

    const status = pollResp.workspaceStatus;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case WorkspaceStatus.RUNNING:
      case WorkspaceStatus.BANNED:
      case WorkspaceStatus.FAILED:
        return true;
      default:
        return false;
    }
  }
}

export class UpdateWorkspacePublicWaiter {
  constructor(
    private readonly client: Client,
    readonly workspaceId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<CustomerFacingWorkspace> {
    let result: CustomerFacingWorkspace | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWorkspacePublic(
        {
          workspaceId: this.workspaceId,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.workspaceStatus;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case WorkspaceStatus.RUNNING:
          result = pollResp;
          return;
        case WorkspaceStatus.BANNED:
        case WorkspaceStatus.FAILED: {
          const msg = pollResp.workspaceStatusMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWorkspacePublic(
      {
        workspaceId: this.workspaceId,
      },
      options
    );

    const status = pollResp.workspaceStatus;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case WorkspaceStatus.RUNNING:
      case WorkspaceStatus.BANNED:
      case WorkspaceStatus.FAILED:
        return true;
      default:
        return false;
    }
  }
}
