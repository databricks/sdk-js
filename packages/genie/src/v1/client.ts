// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  GenieCreateConversationMessageRequest,
  GenieCreateEvalRunRequest,
  GenieCreateMessageCommentRequest,
  GenieCreateSpaceRequest,
  GenieDeleteConversationMessageRequest,
  GenieDeleteConversationRequest,
  GenieEvalResultDetails,
  GenieEvalRunResponse,
  GenieExecuteMessageAttachmentQueryRequest,
  GenieExecuteMessageQueryRequest,
  GenieGenerateDownloadFullQueryResultRequest,
  GenieGenerateDownloadFullQueryResultResponse,
  GenieGetConversationMessageRequest,
  GenieGetDownloadFullQueryResultRequest,
  GenieGetDownloadFullQueryResultResponse,
  GenieGetEvalResultDetailsRequest,
  GenieGetEvalRunRequest,
  GenieGetMessageAttachmentQueryResultRequest,
  GenieGetMessageQueryResultRequest,
  GenieGetMessageQueryResultResponse,
  GenieGetQueryResultByAttachmentRequest,
  GenieGetSpaceRequest,
  GenieListConversationCommentsRequest,
  GenieListConversationCommentsResponse,
  GenieListConversationMessagesRequest,
  GenieListConversationMessagesResponse,
  GenieListConversationsRequest,
  GenieListConversationsResponse,
  GenieListEvalResultsRequest,
  GenieListEvalResultsResponse,
  GenieListEvalRunsRequest,
  GenieListEvalRunsResponse,
  GenieListMessageCommentsRequest,
  GenieListMessageCommentsResponse,
  GenieListSpacesRequest,
  GenieListSpacesResponse,
  GenieMessage,
  GenieMessageComment,
  GenieSendMessageFeedbackRequest,
  GenieSpace,
  GenieStartConversationRequest,
  GenieStartConversationResponse,
  GenieTrashSpaceRequest,
  GenieUpdateSpaceRequest,
} from './model';
import {
  MessageStatus_MessageStatus,
  marshalGenieCreateConversationMessageRequestSchema,
  marshalGenieCreateEvalRunRequestSchema,
  marshalGenieCreateMessageCommentRequestSchema,
  marshalGenieCreateSpaceRequestSchema,
  marshalGenieExecuteMessageAttachmentQueryRequestSchema,
  marshalGenieExecuteMessageQueryRequestSchema,
  marshalGenieGenerateDownloadFullQueryResultRequestSchema,
  marshalGenieSendMessageFeedbackRequestSchema,
  marshalGenieStartConversationRequestSchema,
  marshalGenieUpdateSpaceRequestSchema,
  unmarshalGenieEvalResultDetailsSchema,
  unmarshalGenieEvalRunResponseSchema,
  unmarshalGenieGenerateDownloadFullQueryResultResponseSchema,
  unmarshalGenieGetDownloadFullQueryResultResponseSchema,
  unmarshalGenieGetMessageQueryResultResponseSchema,
  unmarshalGenieListConversationCommentsResponseSchema,
  unmarshalGenieListConversationMessagesResponseSchema,
  unmarshalGenieListConversationsResponseSchema,
  unmarshalGenieListEvalResultsResponseSchema,
  unmarshalGenieListEvalRunsResponseSchema,
  unmarshalGenieListMessageCommentsResponseSchema,
  unmarshalGenieListSpacesResponseSchema,
  unmarshalGenieMessageCommentSchema,
  unmarshalGenieMessageSchema,
  unmarshalGenieSpaceSchema,
  unmarshalGenieStartConversationResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class GenieClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /** Creates a Genie space from a serialized payload. */
  async createSpace(
    req: GenieCreateSpaceRequest,
    options?: CallOptions
  ): Promise<GenieSpace> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces`;
    const body = marshalRequest(req, marshalGenieCreateSpaceRequestSchema);
    let resp: GenieSpace | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Create new message in a conversation.
   * The AI response uses all previously created messages in the conversation to respond.
   */
  private async genieCreateConversationMessageBase(
    req: GenieCreateConversationMessageRequest,
    options?: CallOptions
  ): Promise<GenieMessage> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages`;
    const body = marshalRequest(
      req,
      marshalGenieCreateConversationMessageRequestSchema
    );
    let resp: GenieMessage | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieMessageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Create new message in a [conversation](:method:genie/startconversation).
   * The AI response uses all previously created messages in the conversation to respond.
   */
  async genieCreateConversationMessage(
    req: GenieCreateConversationMessageRequest,
    options?: CallOptions
  ): Promise<GenieCreateConversationMessageWaiter> {
    const resp = await this.genieCreateConversationMessageBase(req, options);
    if (resp.messageId === undefined) {
      throw new Error(
        'response field messageId required for polling is missing'
      );
    }
    if (req.conversationId === undefined) {
      throw new Error(
        'request field conversationId required for polling is missing'
      );
    }
    if (req.spaceId === undefined) {
      throw new Error('request field spaceId required for polling is missing');
    }
    return new GenieCreateConversationMessageWaiter(
      this,
      resp.messageId,
      req.conversationId,
      req.spaceId
    );
  }

  /** Create and run evaluations for multiple benchmark questions in a Genie space. */
  async genieCreateEvalRun(
    req: GenieCreateEvalRunRequest,
    options?: CallOptions
  ): Promise<GenieEvalRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs`;
    const body = marshalRequest(req, marshalGenieCreateEvalRunRequestSchema);
    let resp: GenieEvalRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieEvalRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a comment on a conversation message. */
  async genieCreateMessageComment(
    req: GenieCreateMessageCommentRequest,
    options?: CallOptions
  ): Promise<GenieMessageComment> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/comments`;
    const body = marshalRequest(
      req,
      marshalGenieCreateMessageCommentRequestSchema
    );
    let resp: GenieMessageComment | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieMessageCommentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a conversation. */
  async genieDeleteConversation(
    req: GenieDeleteConversationRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Delete a conversation message. */
  async genieDeleteConversationMessage(
    req: GenieDeleteConversationMessageRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Execute the SQL for a message query attachment. Use this API when the query attachment has expired and needs to be re-executed. */
  async genieExecuteMessageAttachmentQuery(
    req: GenieExecuteMessageAttachmentQueryRequest,
    options?: CallOptions
  ): Promise<GenieGetMessageQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/execute-query`;
    const body = marshalRequest(
      req,
      marshalGenieExecuteMessageAttachmentQueryRequestSchema
    );
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetMessageQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use Execute Message Attachment Query instead. */
  async genieExecuteMessageQuery(
    req: GenieExecuteMessageQueryRequest,
    options?: CallOptions
  ): Promise<GenieGetMessageQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/execute-query`;
    const body = marshalRequest(
      req,
      marshalGenieExecuteMessageQueryRequestSchema
    );
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetMessageQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Initiates a new SQL execution and returns a `download_id` and `download_id_signature` that you can use to track the progress of the download.
   * The query result is stored in an external link and can be retrieved using the Get Download Full Query Result API.
   * Both `download_id` and `download_id_signature` must be provided when calling the Get endpoint.
   *
   * ----
   *
   * ### **Warning: Databricks strongly recommends that you protect the URLs that are returned by the `EXTERNAL_LINKS` disposition.**
   *
   * When you use the `EXTERNAL_LINKS` disposition, a
   * short-lived,  URL is generated, which can be
   * used to download the results directly
   * from . As a
   * short-lived  is
   * embedded in this  URL, you should protect
   * the URL.
   *
   * Because  URLs are already generated with
   * embedded temporary s,
   * you must not set an `Authorization` header in the download requests.
   *
   * See Execute Statement for more details.
   *
   * ----
   */
  async genieGenerateDownloadFullQueryResult(
    req: GenieGenerateDownloadFullQueryResultRequest,
    options?: CallOptions
  ): Promise<GenieGenerateDownloadFullQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/downloads`;
    const body = marshalRequest(
      req,
      marshalGenieGenerateDownloadFullQueryResultRequestSchema
    );
    let resp: GenieGenerateDownloadFullQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGenerateDownloadFullQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get message from conversation. */
  async genieGetConversationMessage(
    req: GenieGetConversationMessageRequest,
    options?: CallOptions
  ): Promise<GenieMessage> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}`;
    let resp: GenieMessage | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieMessageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * After Generating a Full Query Result Download and successfully receiving a `download_id` and `download_id_signature`, use this API to poll the download progress.
   * Both `download_id` and `download_id_signature` are required to call this endpoint.
   * When the download is complete, the API returns the result in the `EXTERNAL_LINKS` disposition, containing one or more external links to the query result files.
   *
   * ----
   *
   * ### **Warning: Databricks strongly recommends that you protect the URLs that are returned by the `EXTERNAL_LINKS` disposition.**
   *
   * When you use the `EXTERNAL_LINKS` disposition, a
   * short-lived,  URL is generated, which can be
   * used to download the results directly
   * from . As a
   * short-lived  is
   * embedded in this  URL, you should protect
   * the URL.
   *
   * Because  URLs are already generated with
   * embedded temporary s,
   * you must not set an `Authorization` header in the download requests.
   *
   * See Execute Statement for more details.
   *
   * ----
   */
  async genieGetDownloadFullQueryResult(
    req: GenieGetDownloadFullQueryResultRequest,
    options?: CallOptions
  ): Promise<GenieGetDownloadFullQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/downloads/${req.downloadId ?? ''}`;
    const params = new URLSearchParams();
    if (req.downloadIdSignature !== undefined) {
      params.append('download_id_signature', req.downloadIdSignature);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieGetDownloadFullQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetDownloadFullQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get details for evaluation results. */
  async genieGetEvalResultDetails(
    req: GenieGetEvalResultDetailsRequest,
    options?: CallOptions
  ): Promise<GenieEvalResultDetails> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}/results/${req.resultId ?? ''}`;
    let resp: GenieEvalResultDetails | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieEvalResultDetailsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get evaluation run details. */
  async genieGetEvalRun(
    req: GenieGetEvalRunRequest,
    options?: CallOptions
  ): Promise<GenieEvalRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}`;
    let resp: GenieEvalRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieEvalRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get the result of SQL query if the message has a query attachment.
   * This is only available if a message has a query attachment and the message status is `EXECUTING_QUERY` OR `COMPLETED`.
   */
  async genieGetMessageAttachmentQueryResult(
    req: GenieGetMessageAttachmentQueryResultRequest,
    options?: CallOptions
  ): Promise<GenieGetMessageQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/query-result`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetMessageQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use Get Message Attachment Query Result instead. */
  async genieGetMessageQueryResult(
    req: GenieGetMessageQueryResultRequest,
    options?: CallOptions
  ): Promise<GenieGetMessageQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/query-result`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetMessageQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use Get Message Attachment Query Result instead. */
  async genieGetQueryResultByAttachment(
    req: GenieGetQueryResultByAttachmentRequest,
    options?: CallOptions
  ): Promise<GenieGetMessageQueryResultResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/query-result/${req.attachmentId ?? ''}`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieGetMessageQueryResultResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get details of a Genie Space. */
  async genieGetSpace(
    req: GenieGetSpaceRequest,
    options?: CallOptions
  ): Promise<GenieSpace> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeSerializedSpace !== undefined) {
      params.append(
        'include_serialized_space',
        String(req.includeSerializedSpace)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieSpace | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List all comments across all messages in a conversation. */
  async genieListConversationComments(
    req: GenieListConversationCommentsRequest,
    options?: CallOptions
  ): Promise<GenieListConversationCommentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/list-comments`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListConversationCommentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieListConversationCommentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List messages in a conversation */
  async genieListConversationMessages(
    req: GenieListConversationMessagesRequest,
    options?: CallOptions
  ): Promise<GenieListConversationMessagesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListConversationMessagesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieListConversationMessagesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a list of conversations in a Genie Space. */
  async genieListConversations(
    req: GenieListConversationsRequest,
    options?: CallOptions
  ): Promise<GenieListConversationsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeAll !== undefined) {
      params.append('include_all', String(req.includeAll));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListConversationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieListConversationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List evaluation results for a specific evaluation run. */
  async genieListEvalResults(
    req: GenieListEvalResultsRequest,
    options?: CallOptions
  ): Promise<GenieListEvalResultsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}/results`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListEvalResultsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieListEvalResultsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists all evaluation runs in a space. */
  async genieListEvalRuns(
    req: GenieListEvalRunsRequest,
    options?: CallOptions
  ): Promise<GenieListEvalRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListEvalRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieListEvalRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List comments on a specific conversation message. */
  async genieListMessageComments(
    req: GenieListMessageCommentsRequest,
    options?: CallOptions
  ): Promise<GenieListMessageCommentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/comments`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListMessageCommentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieListMessageCommentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get list of Genie Spaces. */
  async genieListSpaces(
    req: GenieListSpacesRequest,
    options?: CallOptions
  ): Promise<GenieListSpacesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieListSpacesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieListSpacesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Send feedback for a message. */
  async genieSendMessageFeedback(
    req: GenieSendMessageFeedbackRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/feedback`;
    const body = marshalRequest(
      req,
      marshalGenieSendMessageFeedbackRequestSchema
    );
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Start a new conversation. */
  private async genieStartConversationBase(
    req: GenieStartConversationRequest,
    options?: CallOptions
  ): Promise<GenieStartConversationResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/start-conversation`;
    const body = marshalRequest(
      req,
      marshalGenieStartConversationRequestSchema
    );
    let resp: GenieStartConversationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenieStartConversationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Start a new conversation. */
  async genieStartConversation(
    req: GenieStartConversationRequest,
    options?: CallOptions
  ): Promise<GenieStartConversationWaiter> {
    const resp = await this.genieStartConversationBase(req, options);
    if (resp.messageId === undefined) {
      throw new Error(
        'response field messageId required for polling is missing'
      );
    }
    if (resp.conversationId === undefined) {
      throw new Error(
        'response field conversationId required for polling is missing'
      );
    }
    if (req.spaceId === undefined) {
      throw new Error('request field spaceId required for polling is missing');
    }
    return new GenieStartConversationWaiter(
      this,
      resp.messageId,
      resp.conversationId,
      req.spaceId
    );
  }

  /** Move a Genie Space to the trash. */
  async genieTrashSpace(
    req: GenieTrashSpaceRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Updates a Genie space with a serialized payload. */
  async updateSpace(
    req: GenieUpdateSpaceRequest,
    options?: CallOptions
  ): Promise<GenieSpace> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const body = marshalRequest(req, marshalGenieUpdateSpaceRequestSchema);
    let resp: GenieSpace | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class GenieCreateConversationMessageWaiter {
  constructor(
    private readonly client: GenieClient,
    readonly messageId: string,
    readonly conversationId: string,
    readonly spaceId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GenieMessage> {
    let result: GenieMessage | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.genieGetConversationMessage(
        {
          messageId: this.messageId,
          conversationId: this.conversationId,
          spaceId: this.spaceId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case MessageStatus_MessageStatus.COMPLETED:
          result = pollResp;
          return;
        case MessageStatus_MessageStatus.FAILED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.genieGetConversationMessage(
      {
        messageId: this.messageId,
        conversationId: this.conversationId,
        spaceId: this.spaceId,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case MessageStatus_MessageStatus.COMPLETED:
      case MessageStatus_MessageStatus.FAILED:
        return true;
      default:
        return false;
    }
  }
}

export class GenieStartConversationWaiter {
  constructor(
    private readonly client: GenieClient,
    readonly messageId: string,
    readonly conversationId: string,
    readonly spaceId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GenieMessage> {
    let result: GenieMessage | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.genieGetConversationMessage(
        {
          messageId: this.messageId,
          conversationId: this.conversationId,
          spaceId: this.spaceId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case MessageStatus_MessageStatus.COMPLETED:
          result = pollResp;
          return;
        case MessageStatus_MessageStatus.FAILED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.genieGetConversationMessage(
      {
        messageId: this.messageId,
        conversationId: this.conversationId,
        spaceId: this.spaceId,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case MessageStatus_MessageStatus.COMPLETED:
      case MessageStatus_MessageStatus.FAILED:
        return true;
      default:
        return false;
    }
  }
}
