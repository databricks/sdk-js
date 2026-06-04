/**
 * Redaction and truncation helpers for debug-level HTTP body and header
 * logging. Ported from the Go SDK's logger/httplog package so debug logs stay
 * secret-safe.
 */

/** Default per-value byte budget for debug HTTP logs. Matches the Go SDK. */
export const DEFAULT_DEBUG_TRUNCATE_BYTES = 96;

// Body field names whose values are replaced wholesale. Ported from the Go
// SDK's body_logger.go redactKeys.
const REDACT_BODY_KEYS = new Set([
  'string_value',
  'token_value',
  'content',
  'access_token',
  'refresh_token',
  'id_token',
  'token',
  'password',
]);

// Token written in place of a redacted body field value.
const BODY_REDACTED = '**REDACTED**';

// Header names redacted regardless of value. Ported from the Go SDK's
// round_trip_stringer.go authorizationHeaders; compared case-insensitively.
const REDACT_HEADER_NAMES = new Set([
  'authorization',
  'x-databricks-azure-sp-management-token',
  'x-databricks-gcp-sa-access-token',
]);

// Token written in place of a redacted header value.
const HEADER_REDACTED = 'REDACTED';

/** Truncates a string to numBytes UTF-8 bytes, appending a byte-count note. */
export function onlyNBytes(s: string, numBytes: number): string {
  const bytes = new TextEncoder().encode(s);
  const diff = bytes.length - numBytes;
  if (diff > 0) {
    // Decode the byte prefix back to text so multi-byte sequences stay intact.
    const head = new TextDecoder().decode(bytes.subarray(0, numBytes));
    return `${head}... (${String(diff)} more bytes)`;
  }
  return s;
}

// Recursively rebuilds a parsed JSON value with secret fields redacted, string
// values truncated, and arrays cut off once the budget is spent.
function recursiveMarshal(
  value: unknown,
  debugTruncateBytes: number,
  budget: {remaining: number}
): unknown {
  if (Array.isArray(value)) {
    return recursiveMarshalSlice(value, debugTruncateBytes, budget);
  }
  if (value !== null && typeof value === 'object') {
    return recursiveMarshalMap(
      value as Record<string, unknown>,
      debugTruncateBytes,
      budget
    );
  }
  if (typeof value === 'string') {
    const truncated = onlyNBytes(value, debugTruncateBytes);
    budget.remaining -= JSON.stringify(truncated).length;
    return truncated;
  }
  budget.remaining -= JSON.stringify(value ?? null).length;
  return value;
}

// Every key is emitted regardless of budget; secret keys have their value
// replaced. Mirrors the Go SDK's recursiveMarshalMap + mask.
function recursiveMarshalMap(
  m: Record<string, unknown>,
  debugTruncateBytes: number,
  budget: {remaining: number}
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(m).sort()) {
    if (REDACT_BODY_KEYS.has(key)) {
      out[key] = BODY_REDACTED;
      budget.remaining -= JSON.stringify(BODY_REDACTED).length;
      continue;
    }
    out[key] = recursiveMarshal(m[key], debugTruncateBytes, budget);
  }
  return out;
}

// The first element is always emitted; later elements are dropped with a
// trailer once the budget is spent. Mirrors the Go SDK's recursiveMarshalSlice.
function recursiveMarshalSlice(
  s: unknown[],
  debugTruncateBytes: number,
  budget: {remaining: number}
): unknown[] {
  const out: unknown[] = [];
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && budget.remaining <= 0) {
      out.push(`... (${String(s.length - out.length)} additional elements)`);
      break;
    }
    out.push(recursiveMarshal(s[i], debugTruncateBytes, budget));
  }
  return out;
}

/** Redacts secret fields and truncates a JSON or plaintext body for logging. */
export function redactedDumpBody(
  text: string,
  debugTruncateBytes: number
): string {
  if (text === '') {
    return '';
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Not JSON: truncate the whole string, matching the Go SDK's fallback.
    return onlyNBytes(text, debugTruncateBytes);
  }
  // Budget defaults to 1024, raised to debugTruncateBytes when larger.
  const budget = {remaining: Math.max(1024, debugTruncateBytes)};
  const redacted = recursiveMarshal(parsed, debugTruncateBytes, budget);
  return JSON.stringify(redacted, null, 2);
}

/** Redacts auth headers and truncates all header values for logging. */
export function redactHeaders(
  headers: Headers,
  debugTruncateBytes: number
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of headers.entries()) {
    if (REDACT_HEADER_NAMES.has(name.toLowerCase())) {
      out[name] = HEADER_REDACTED;
      continue;
    }
    // Strip CR/LF to prevent log injection (CWE-117).
    const sanitized = value.replace(/[\r\n]/g, '');
    out[name] = onlyNBytes(sanitized, debugTruncateBytes);
  }
  // Sort keys so the logged object is deterministic.
  const sorted: Record<string, string> = {};
  for (const name of Object.keys(out).sort()) {
    sorted[name] = out[name];
  }
  return sorted;
}
