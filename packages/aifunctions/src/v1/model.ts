// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);

/** ai_classify */
export interface AiClassifyOptions {
  /** Natural-language guidance that steers how the text is classified (up to 20,000 characters). */
  instructions?: string | undefined;
  /** The function version to invoke. Defaults to the latest version. Supported versions: ["2.1"]. */
  version?: string | undefined;
  /** When true, allows more than one label to be returned per input. */
  multilabel?: boolean | undefined;
  /** When true, includes a per-label confidence score in the response. */
  enableConfidenceScores?: boolean | undefined;
  /** When true, includes a rationale explaining each classification in the response. */
  enableRationales?: boolean | undefined;
}

export interface AiClassifyRequest {
  /** The content to classify. It accepts a plain string or the response object of [ai_parse_document](:method:AiFunctions/AiParseDocument). */
  content?: JsonValue | undefined;
  /** The label set to classify as. Either a JSON array of label strings (e.g. ["spam", "not_spam"]), or a JSON object mapping each label to a description (e.g. {"spam": "unsolicited bulk message", "not_spam": "a legitimate message"}). Accepts 2 to 500 labels, each 1 to 100 characters. */
  labels?: JsonValue | undefined;
  /** Function options. Omitted fields fall back to their documented defaults. */
  options?: AiClassifyOptions | undefined;
}

export interface AiClassifyResponse {
  /** The function result as a JSON value. An array of per-label objects: one element in single-label mode (the default), or multiple elements when `multilabel` is true. When `enable_confidence_scores` and `enable_rationales` are true, `confidence_score` and `rationale` are included in each response value, respectively. */
  response?: JsonValue | undefined;
  /** Additional metadata returned by AI Classify. */
  metadata?: AiClassifyResponseMetadata | undefined;
}

export interface AiClassifyResponseMetadata {
  /** The resolved function version. */
  version?: string | undefined;
}

/** A bounding box on a source page; used by bbox-input citations. */
export interface AiExtractBbox {
  /** Pixel coordinates on the page image as [x0, y0, x1, y1]. */
  coord?: bigint[] | undefined;
  /** 0-based page index the box is on. */
  pageId?: bigint | undefined;
}

/** A citation locating an extracted value in the source. start/stop are set for span (STRING input) citations, bbox for bbox (parsed-document input) citations. */
export interface AiExtractCitation {
  /** Integer matching a citation_ids entry on an extracted field. */
  id?: bigint | undefined;
  /** Inclusive 0-based character offset into the input string; set for span citations. */
  start?: bigint | undefined;
  /** Exclusive 0-based character offset into the input string; set for span citations. */
  stop?: bigint | undefined;
  /** Bounding boxes locating the citation on the source pages; set for bbox citations. */
  bbox?: AiExtractBbox[] | undefined;
}

/** ai_extract */
export interface AiExtractOptions {
  /** Natural-language guidance that steers how data is extracted (up to 20,000 characters). */
  instructions?: string | undefined;
  /** The function version to invoke. Defaults to the latest version. Supported versions: ["2.1"]. */
  version?: string | undefined;
  /** Extraction mode. Supported modes: "precision" — more powerful extraction for complex schemas, long documents, and reasoning-heavy extractions. Defaults to none (standard extraction). */
  mode?: string | undefined;
  /**
   * When true, includes citation metadata locating each extracted value in the source. Depending on the type of input, citations can be one of two types:
   *
   * For raw text (STRING) inputs, a citation is a span of text in the original input. Each object in `metadata.citations` has an `id` (integer matching a `citation_ids` entry on a field), a `start` (inclusive 0-based character offset into the input string), and a `stop` (exclusive 0-based character offset into the input string).
   *
   * For PDF documents and images (when using ai_extract downstream of ai_parse_document), a citation is a bounding box in the original input. Each object in `metadata.citations` has an `id` (integer matching a `citation_ids` entry on a field) and a `bbox` (array of {coord, page_id} objects, identical in shape to element.bbox in ai_parse_document output; coord is pixel coordinates on the page image as [x0, y0, x1, y1], and page_id is a 0-based page index).
   */
  enableCitations?: boolean | undefined;
  /** When true, includes a per-field confidence score in the response. */
  enableConfidenceScores?: boolean | undefined;
}

export interface AiExtractRequest {
  /** The text to extract from. It accepts a plain string or the response object of [ai_parse_document](:method:AiFunctions/AiParseDocument). */
  content?: JsonValue | undefined;
  /** The extraction schema defining the fields to extract. Either a JSON array of field names, assumed to be strings (e.g. ["company", "valuation"]), or a JSON object mapping each field to its type/description/nullability (e.g. {"company": {"type": "string", "description": "the company name"}}). Accepts up to 256 fields, 12 levels of nesting, and 500 enum values. Supported field types are string, integer, number, boolean, and enum. */
  schema?: JsonValue | undefined;
  /** Function options. Omitted fields fall back to their documented defaults. */
  options?: AiExtractOptions | undefined;
}

export interface AiExtractResponse {
  /** The function result as a JSON value. When `enable_confidence_scores` and `enable_citations` are true, `confidence` and `citation_ids` are included in each response field, respectively. */
  response?: JsonValue | undefined;
  /** Additional metadata returned by AI Extract. */
  metadata?: AiExtractResponseMetadata | undefined;
}

export interface AiExtractResponseMetadata {
  /** The resolved function version. */
  version?: string | undefined;
  /** The resolved extraction mode; present when a non-default mode was used. */
  mode?: string | undefined;
  /** How the source was chunked for citation offsets (span for text input, bbox for parsed-document input); present when citations are enabled. */
  chunkType?: string | undefined;
  /** Citation objects locating each result in the source; present when citations are enabled. */
  citations?: AiExtractCitation[] | undefined;
}

/** Metadata about the source file; present only for file-path input. */
export interface AiParseDocumentFileMetadata {
  /** Unity Catalog volume path of the source file. */
  filePath?: string | undefined;
  /** Base name of the source file. */
  fileName?: string | undefined;
  /** Size of the source file in bytes. */
  fileSize?: bigint | undefined;
  /** Last-modified timestamp of the source file, as an HTTP date string. */
  fileModificationTime?: string | undefined;
}

/** ai_parse_document */
export interface AiParseDocumentOptions {
  /** The ai_parse_document output schema version. Supported value: "2.0". */
  version?: string | undefined;
  /** Element types for which an AI-generated description is produced. Use "*" (default) to generate descriptions for all supported element types, "figure" to generate them for figures only, or "" (empty string) to generate none. Only figure descriptions are supported for version "2.0", so "*" and "figure" produce the same behavior. */
  descriptionElementTypes?: string | undefined;
  /** Unity Catalog volume path where rendered page and element images are written. */
  imageOutputPath?: string | undefined;
  /** Pages to parse (1-indexed), as a comma-separated list of page numbers or ranges (e.g. "1,3,5-10"). */
  pageRange?: string | undefined;
}

/** A single page that failed to parse while the overall request succeeded. */
export interface AiParseDocumentPageError {
  /** Message describing why the page failed. */
  errorMessage?: string | undefined;
  /** 0-based index of the page that failed. */
  pageId?: bigint | undefined;
}

export interface AiParseDocumentRequest {
  /** The document to parse, given as a Unity Catalog volume path to the source file (the REST API accepts only a UC volume path, not inline binary data). Supported formats: PDF, DOCX, DOC, PPTX, PPT, JPG, JPEG, PNG, TIFF. Accepts up to 100 pages and 100 MB per document. */
  content?: string | undefined;
  /** Function options. Omitted fields fall back to their documented defaults. */
  options?: AiParseDocumentOptions | undefined;
}

export interface AiParseDocumentResponse {
  /** The parsed document as a JSON value, containing the extracted pages and elements. */
  document?: JsonValue | undefined;
  /** Per-page partial-failure details; present when the request succeeds (2xx) but individual pages fail. */
  errorStatus?: AiParseDocumentPageError[] | undefined;
  /** Additional metadata returned by AI Parse Document. */
  metadata?: AiParseDocumentResponseMetadata | undefined;
}

export interface AiParseDocumentResponseMetadata {
  /** Unique identifier for the parse request. */
  id?: string | undefined;
  /** The resolved function version. */
  version?: string | undefined;
  /** Describes the source file; present only for file-path input. */
  fileMetadata?: AiParseDocumentFileMetadata | undefined;
}

export const unmarshalAiClassifyResponseSchema: z.ZodType<AiClassifyResponse> =
  z
    .object({
      response: jsonValueSchema.optional(),
      metadata: z
        .lazy(() => unmarshalAiClassifyResponseMetadataSchema)
        .optional(),
    })
    .transform(d => ({
      response: d.response,
      metadata: d.metadata,
    }));

export const unmarshalAiClassifyResponseMetadataSchema: z.ZodType<AiClassifyResponseMetadata> =
  z
    .object({
      version: z.string().optional(),
    })
    .transform(d => ({
      version: d.version,
    }));

export const unmarshalAiExtractBboxSchema: z.ZodType<AiExtractBbox> = z
  .object({
    coord: z
      .array(
        z.union([z.number(), z.bigint(), z.string()]).transform(v => BigInt(v))
      )
      .optional(),
    page_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    coord: d.coord,
    pageId: d.page_id,
  }));

export const unmarshalAiExtractCitationSchema: z.ZodType<AiExtractCitation> = z
  .object({
    id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    start: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    stop: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    bbox: z.array(z.lazy(() => unmarshalAiExtractBboxSchema)).optional(),
  })
  .transform(d => ({
    id: d.id,
    start: d.start,
    stop: d.stop,
    bbox: d.bbox,
  }));

export const unmarshalAiExtractResponseSchema: z.ZodType<AiExtractResponse> = z
  .object({
    response: jsonValueSchema.optional(),
    metadata: z.lazy(() => unmarshalAiExtractResponseMetadataSchema).optional(),
  })
  .transform(d => ({
    response: d.response,
    metadata: d.metadata,
  }));

export const unmarshalAiExtractResponseMetadataSchema: z.ZodType<AiExtractResponseMetadata> =
  z
    .object({
      version: z.string().optional(),
      mode: z.string().optional(),
      chunk_type: z.string().optional(),
      citations: z
        .array(z.lazy(() => unmarshalAiExtractCitationSchema))
        .optional(),
    })
    .transform(d => ({
      version: d.version,
      mode: d.mode,
      chunkType: d.chunk_type,
      citations: d.citations,
    }));

export const unmarshalAiParseDocumentFileMetadataSchema: z.ZodType<AiParseDocumentFileMetadata> =
  z
    .object({
      file_path: z.string().optional(),
      file_name: z.string().optional(),
      file_size: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      file_modification_time: z.string().optional(),
    })
    .transform(d => ({
      filePath: d.file_path,
      fileName: d.file_name,
      fileSize: d.file_size,
      fileModificationTime: d.file_modification_time,
    }));

export const unmarshalAiParseDocumentPageErrorSchema: z.ZodType<AiParseDocumentPageError> =
  z
    .object({
      error_message: z.string().optional(),
      page_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      errorMessage: d.error_message,
      pageId: d.page_id,
    }));

export const unmarshalAiParseDocumentResponseSchema: z.ZodType<AiParseDocumentResponse> =
  z
    .object({
      document: jsonValueSchema.optional(),
      error_status: z
        .array(z.lazy(() => unmarshalAiParseDocumentPageErrorSchema))
        .optional(),
      metadata: z
        .lazy(() => unmarshalAiParseDocumentResponseMetadataSchema)
        .optional(),
    })
    .transform(d => ({
      document: d.document,
      errorStatus: d.error_status,
      metadata: d.metadata,
    }));

export const unmarshalAiParseDocumentResponseMetadataSchema: z.ZodType<AiParseDocumentResponseMetadata> =
  z
    .object({
      id: z.string().optional(),
      version: z.string().optional(),
      file_metadata: z
        .lazy(() => unmarshalAiParseDocumentFileMetadataSchema)
        .optional(),
    })
    .transform(d => ({
      id: d.id,
      version: d.version,
      fileMetadata: d.file_metadata,
    }));

export const marshalAiClassifyOptionsSchema: z.ZodType = z
  .object({
    instructions: z.string().optional(),
    version: z.string().optional(),
    multilabel: z.boolean().optional(),
    enableConfidenceScores: z.boolean().optional(),
    enableRationales: z.boolean().optional(),
  })
  .transform(d => ({
    instructions: d.instructions,
    version: d.version,
    multilabel: d.multilabel,
    enable_confidence_scores: d.enableConfidenceScores,
    enable_rationales: d.enableRationales,
  }));

export const marshalAiClassifyRequestSchema: z.ZodType = z
  .object({
    content: jsonValueSchema.optional(),
    labels: jsonValueSchema.optional(),
    options: z.lazy(() => marshalAiClassifyOptionsSchema).optional(),
  })
  .transform(d => ({
    content: d.content,
    labels: d.labels,
    options: d.options,
  }));

export const marshalAiExtractOptionsSchema: z.ZodType = z
  .object({
    instructions: z.string().optional(),
    version: z.string().optional(),
    mode: z.string().optional(),
    enableCitations: z.boolean().optional(),
    enableConfidenceScores: z.boolean().optional(),
  })
  .transform(d => ({
    instructions: d.instructions,
    version: d.version,
    mode: d.mode,
    enable_citations: d.enableCitations,
    enable_confidence_scores: d.enableConfidenceScores,
  }));

export const marshalAiExtractRequestSchema: z.ZodType = z
  .object({
    content: jsonValueSchema.optional(),
    schema: jsonValueSchema.optional(),
    options: z.lazy(() => marshalAiExtractOptionsSchema).optional(),
  })
  .transform(d => ({
    content: d.content,
    schema: d.schema,
    options: d.options,
  }));

export const marshalAiParseDocumentOptionsSchema: z.ZodType = z
  .object({
    version: z.string().optional(),
    descriptionElementTypes: z.string().optional(),
    imageOutputPath: z.string().optional(),
    pageRange: z.string().optional(),
  })
  .transform(d => ({
    version: d.version,
    description_element_types: d.descriptionElementTypes,
    image_output_path: d.imageOutputPath,
    page_range: d.pageRange,
  }));

export const marshalAiParseDocumentRequestSchema: z.ZodType = z
  .object({
    content: z.string().optional(),
    options: z.lazy(() => marshalAiParseDocumentOptionsSchema).optional(),
  })
  .transform(d => ({
    content: d.content,
    options: d.options,
  }));
