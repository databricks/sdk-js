/**
 * Collects information about the client and its environment into an
 * immutable {@link ClientInfo} value.
 *
 * {@link ClientInfo.with} derives a new value with additional key/value
 * segments; it never mutates the original.
 *
 * @module
 */

export type ClientInfoErrorCode =
  | 'ODD_KEYVALS'
  | 'INVALID_KEY'
  | 'INVALID_VALUE'
  | 'INVALID_VERSION';

export class ClientInfoError extends Error {
  readonly code: ClientInfoErrorCode;

  constructor(code: ClientInfoErrorCode, message: string) {
    super(message);
    this.name = 'ClientInfoError';
    this.code = code;
  }
}

interface Segment {
  readonly key: string;
  readonly value: string;
}

const SEMVER_CORE = String.raw`(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)`;

const SEMVER_PRERELEASE = String.raw`(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?`;

const SEMVER_BUILDMETADATA = String.raw`(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?`;

const REGEXP_SEMVER = new RegExp(
  '^' + SEMVER_CORE + SEMVER_PRERELEASE + SEMVER_BUILDMETADATA + '$'
);
const REGEXP_VALID_SEGMENT = /^[-0-9A-Za-z_.+]+$/;
const REGEXP_INVALID_SEGMENT_CHAR = /[^-0-9A-Za-z_.+]/g;

export function isSemVer(s: string): boolean {
  return REGEXP_SEMVER.test(s);
}

export function isValidSegment(s: string): boolean {
  return REGEXP_VALID_SEGMENT.test(s);
}

/**
 * Replaces characters that are not valid in segment values with
 * hyphens. Used for environment-sourced values (runtime version,
 * upstream) that we do not control and cannot reject.
 */
export function sanitize(s: string): string {
  return s.replace(REGEXP_INVALID_SEGMENT_CHAR, '-');
}

/**
 * ClientInfo is an immutable, ordered list of key/value segments. Use
 * {@link ClientInfo.with} to derive new values with additional segments.
 */
export class ClientInfo {
  readonly segments: readonly Segment[];

  constructor(
    segments: readonly {readonly key: string; readonly value: string}[] = []
  ) {
    this.segments = [...segments];
  }

  /**
   * Returns a new {@link ClientInfo} with the given key/value pairs
   * appended. The original is not modified. An odd number of arguments
   * throws an error.
   *
   * Keys and values must contain only alphanumeric characters plus the
   * characters: underscore ('_'), dot ('.'), plus ('+'), or hyphen ('-').
   *
   * Exact key+value duplicates are silently ignored. On error, an
   * exception is thrown (all-or-nothing).
   */
  with(...keyvals: string[]): ClientInfo {
    if (keyvals.length % 2 !== 0) {
      throw new ClientInfoError(
        'ODD_KEYVALS',
        `Odd number of key/value arguments: got ${String(keyvals.length)}.`
      );
    }
    if (keyvals.length === 0) {
      return this;
    }

    const newSegments: Segment[] = [...this.segments];

    for (let i = 0; i < keyvals.length; i += 2) {
      const key = keyvals[i];
      const value = keyvals[i + 1];
      if (!isValidSegment(key)) {
        throw new ClientInfoError('INVALID_KEY', `Invalid key: ${key}.`);
      }
      if (!isValidSegment(value)) {
        throw new ClientInfoError(
          'INVALID_VALUE',
          `Invalid value for "${key}": ${value}.`
        );
      }
      if (newSegments.some(s => s.key === key && s.value === value)) {
        continue;
      }
      newSegments.push({key, value});
    }

    return new ClientInfo(newSegments);
  }

  /**
   * Returns a string representation of the client info suitable for
   * inclusion in HTTP headers. Key/value pairs are formatted as
   * "key/value" and joined by spaces in the order they were inserted.
   */
  toString(): string {
    return this.segments.map(s => `${s.key}/${s.value}`).join(' ');
  }
}
