// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
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
  GenieStartConversationMessageRequest,
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
  marshalGenieStartConversationMessageRequestSchema,
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

class StillRunningError extends Error {}

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /** Creates a Genie space from a serialized payload. */
  async createSpace(signal: AbortSignal | undefined, req: GenieCreateSpaceRequest, options?: Options): Promise<GenieSpace> {
    const url = `${this.host}/api/2.0/genie/spaces`;
    const body = marshalRequest(req, marshalGenieCreateSpaceRequestSchema);
    let resp: GenieSpace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create new message in a [conversation](:method:genie/startconversation).
   * The AI response uses all previously created messages in the conversation to respond.
   */
  async genieCreateConversationMessage(signal: AbortSignal | undefined, req: GenieCreateConversationMessageRequest, options?: Options): Promise<GenieMessage> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages`;
    const body = marshalRequest(req, marshalGenieCreateConversationMessageRequestSchema);
    let resp: GenieMessage | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieMessageSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async genieCreateConversationMessageWaiter(
    signal: AbortSignal | undefined,
    req: GenieCreateConversationMessageRequest,
    options?: Options
  ): Promise<GenieCreateConversationMessageWaiter> {
    const resp = await this.genieCreateConversationMessage(signal, req, options);
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
      throw new Error(
        'request field spaceId required for polling is missing'
      );
    }
    return new GenieCreateConversationMessageWaiter(
      this,
      resp.messageId,
      req.conversationId,
      req.spaceId,
    );
  }

  /** Create and run evaluations for multiple benchmark questions in a Genie space. */
  async genieCreateEvalRun(signal: AbortSignal | undefined, req: GenieCreateEvalRunRequest, options?: Options): Promise<GenieEvalRunResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs`;
    const body = marshalRequest(req, marshalGenieCreateEvalRunRequestSchema);
    let resp: GenieEvalRunResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieEvalRunResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a comment on a conversation message. */
  async genieCreateMessageComment(signal: AbortSignal | undefined, req: GenieCreateMessageCommentRequest, options?: Options): Promise<GenieMessageComment> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/comments`;
    const body = marshalRequest(req, marshalGenieCreateMessageCommentRequestSchema);
    let resp: GenieMessageComment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieMessageCommentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a conversation. */
  async genieDeleteConversation(signal: AbortSignal | undefined, req: GenieDeleteConversationRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Delete a conversation message. */
  async genieDeleteConversationMessage(signal: AbortSignal | undefined, req: GenieDeleteConversationMessageRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Execute the SQL for a message query attachment. Use this API when the query attachment has expired and needs to be re-executed. */
  async genieExecuteMessageAttachmentQuery(signal: AbortSignal | undefined, req: GenieExecuteMessageAttachmentQueryRequest, options?: Options): Promise<GenieGetMessageQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/execute-query`;
    const body = marshalRequest(req, marshalGenieExecuteMessageAttachmentQueryRequestSchema);
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetMessageQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use [Execute Message Attachment Query](:method:genie/executemessageattachmentquery) instead. */
  async genieExecuteMessageQuery(signal: AbortSignal | undefined, req: GenieExecuteMessageQueryRequest, options?: Options): Promise<GenieGetMessageQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/execute-query`;
    const body = marshalRequest(req, marshalGenieExecuteMessageQueryRequestSchema);
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetMessageQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Initiates a new SQL execution and returns a `download_id` and `download_id_signature` that you can use to track the progress of the download.
   * The query result is stored in an external link and can be retrieved using the [Get Download Full Query Result](:method:genie/getdownloadfullqueryresult) API.
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
   * See [Execute Statement](:method:statementexecution/executestatement) for more details.
   * 
   * ----
   */
  async genieGenerateDownloadFullQueryResult(signal: AbortSignal | undefined, req: GenieGenerateDownloadFullQueryResultRequest, options?: Options): Promise<GenieGenerateDownloadFullQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/downloads`;
    const body = marshalRequest(req, marshalGenieGenerateDownloadFullQueryResultRequestSchema);
    let resp: GenieGenerateDownloadFullQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGenerateDownloadFullQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get message from conversation. */
  async genieGetConversationMessage(signal: AbortSignal | undefined, req: GenieGetConversationMessageRequest, options?: Options): Promise<GenieMessage> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}`;
    let resp: GenieMessage | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieMessageSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * After [Generating a Full Query Result Download](:method:genie/generatedownloadfullqueryresult) and successfully receiving a `download_id` and `download_id_signature`, use this API to poll the download progress.
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
   * See [Execute Statement](:method:statementexecution/executestatement) for more details.
   * 
   * ----
   */
  async genieGetDownloadFullQueryResult(signal: AbortSignal | undefined, req: GenieGetDownloadFullQueryResultRequest, options?: Options): Promise<GenieGetDownloadFullQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/downloads/${req.downloadId ?? ''}`;
    const params = new URLSearchParams();
    if (req.downloadIdSignature !== undefined) {
      params.append('download_id_signature', req.downloadIdSignature);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieGetDownloadFullQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetDownloadFullQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get details for evaluation results. */
  async genieGetEvalResultDetails(signal: AbortSignal | undefined, req: GenieGetEvalResultDetailsRequest, options?: Options): Promise<GenieEvalResultDetails> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}/results/${req.resultId ?? ''}`;
    let resp: GenieEvalResultDetails | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieEvalResultDetailsSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get evaluation run details. */
  async genieGetEvalRun(signal: AbortSignal | undefined, req: GenieGetEvalRunRequest, options?: Options): Promise<GenieEvalRunResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}`;
    let resp: GenieEvalRunResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieEvalRunResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get the result of SQL query if the message has a query attachment.
   * This is only available if a message has a query attachment and the message status is `EXECUTING_QUERY` OR `COMPLETED`.
   */
  async genieGetMessageAttachmentQueryResult(signal: AbortSignal | undefined, req: GenieGetMessageAttachmentQueryResultRequest, options?: Options): Promise<GenieGetMessageQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/attachments/${req.attachmentId ?? ''}/query-result`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetMessageQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use [Get Message Attachment Query Result](:method:genie/getmessageattachmentqueryresult) instead. */
  async genieGetMessageQueryResult(signal: AbortSignal | undefined, req: GenieGetMessageQueryResultRequest, options?: Options): Promise<GenieGetMessageQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/query-result`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetMessageQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** DEPRECATED: Use [Get Message Attachment Query Result](:method:genie/getmessageattachmentqueryresult) instead. */
  async genieGetQueryResultByAttachment(signal: AbortSignal | undefined, req: GenieGetQueryResultByAttachmentRequest, options?: Options): Promise<GenieGetMessageQueryResultResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/query-result/${req.attachmentId ?? ''}`;
    let resp: GenieGetMessageQueryResultResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieGetMessageQueryResultResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get details of a Genie Space. */
  async genieGetSpace(signal: AbortSignal | undefined, req: GenieGetSpaceRequest, options?: Options): Promise<GenieSpace> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeSerializedSpace !== undefined) {
      params.append('include_serialized_space', String(req.includeSerializedSpace));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GenieSpace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all comments across all messages in a conversation. */
  async genieListConversationComments(signal: AbortSignal | undefined, req: GenieListConversationCommentsRequest, options?: Options): Promise<GenieListConversationCommentsResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/list-comments`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListConversationCommentsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List messages in a conversation */
  async genieListConversationMessages(signal: AbortSignal | undefined, req: GenieListConversationMessagesRequest, options?: Options): Promise<GenieListConversationMessagesResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListConversationMessagesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a list of conversations in a Genie Space. */
  async genieListConversations(signal: AbortSignal | undefined, req: GenieListConversationsRequest, options?: Options): Promise<GenieListConversationsResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListConversationsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List evaluation results for a specific evaluation run. */
  async genieListEvalResults(signal: AbortSignal | undefined, req: GenieListEvalResultsRequest, options?: Options): Promise<GenieListEvalResultsResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs/${req.evalRunId ?? ''}/results`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListEvalResultsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all evaluation runs in a space. */
  async genieListEvalRuns(signal: AbortSignal | undefined, req: GenieListEvalRunsRequest, options?: Options): Promise<GenieListEvalRunsResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/eval-runs`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListEvalRunsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List comments on a specific conversation message. */
  async genieListMessageComments(signal: AbortSignal | undefined, req: GenieListMessageCommentsRequest, options?: Options): Promise<GenieListMessageCommentsResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/comments`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListMessageCommentsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get list of Genie Spaces. */
  async genieListSpaces(signal: AbortSignal | undefined, req: GenieListSpacesRequest, options?: Options): Promise<GenieListSpacesResponse> {
    const url = `${this.host}/api/2.0/genie/spaces`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieListSpacesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Send feedback for a message. */
  async genieSendMessageFeedback(signal: AbortSignal | undefined, req: GenieSendMessageFeedbackRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/conversations/${req.conversationId ?? ''}/messages/${req.messageId ?? ''}/feedback`;
    const body = marshalRequest(req, marshalGenieSendMessageFeedbackRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Start a new conversation. */
  async genieStartConversation(signal: AbortSignal | undefined, req: GenieStartConversationMessageRequest, options?: Options): Promise<GenieStartConversationResponse> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}/start-conversation`;
    const body = marshalRequest(req, marshalGenieStartConversationMessageRequestSchema);
    let resp: GenieStartConversationResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieStartConversationResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async genieStartConversationWaiter(
    signal: AbortSignal | undefined,
    req: GenieStartConversationMessageRequest,
    options?: Options
  ): Promise<GenieStartConversationWaiter> {
    const resp = await this.genieStartConversation(signal, req, options);
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
      throw new Error(
        'request field spaceId required for polling is missing'
      );
    }
    return new GenieStartConversationWaiter(
      this,
      resp.messageId,
      resp.conversationId,
      req.spaceId,
    );
  }

  /** Move a Genie Space to the trash. */
  async genieTrashSpace(signal: AbortSignal | undefined, req: GenieTrashSpaceRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Updates a Genie space with a serialized payload. */
  async updateSpace(signal: AbortSignal | undefined, req: GenieUpdateSpaceRequest, options?: Options): Promise<GenieSpace> {
    const url = `${this.host}/api/2.0/genie/spaces/${req.spaceId ?? ''}`;
    const body = marshalRequest(req, marshalGenieUpdateSpaceRequestSchema);
    let resp: GenieSpace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGenieSpaceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class GenieCreateConversationMessageWaiter {
  constructor(
    private readonly client: Client,
    readonly messageId: string,
    readonly conversationId: string,
    readonly spaceId: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GenieMessage> {
    let result: GenieMessage | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.genieGetConversationMessage(
        callSignal,
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
          result = pollResp;
          return;
        case MessageStatus_MessageStatus.FAILED:
        {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.genieGetConversationMessage(
      signal,
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
    private readonly client: Client,
    readonly messageId: string,
    readonly conversationId: string,
    readonly spaceId: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GenieMessage> {
    let result: GenieMessage | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.genieGetConversationMessage(
        callSignal,
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
          result = pollResp;
          return;
        case MessageStatus_MessageStatus.FAILED:
        {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.genieGetConversationMessage(
      signal,
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
