/**
 * Detects the agent meta-harness (e.g. omnigent) running the current process.
 * A meta-harness orchestrates AI coding agents rather than being one, so it is
 * reported as an independent `meta-harness/<name>` user-agent dimension
 * alongside `agent/<name>`. Kept in sync across the Go, Java, Python, and
 * TypeScript SDKs.
 *
 * @module
 */

interface KnownMetaHarness {
  readonly envVar: string;
  readonly product: string;
}

// Canonical list of known meta-harnesses, detected by env var presence. Keep
// in sync with the Go, Java, and Python SDKs.
const KNOWN_META_HARNESSES: readonly KnownMetaHarness[] = [
  // OMNIGENT is set by the omnigent meta-harness
  // (https://github.com/omnigent-ai/omnigent).
  {envVar: 'OMNIGENT', product: 'omnigent'},
];

/**
 * Checks environment variables for known meta-harnesses. Returns the product
 * name when exactly one is set, `"multiple"` when more than one is set, or `""`
 * when none is set. Detection is by presence, so any value (including empty)
 * counts.
 */
export function lookupMetaHarnessProvider(): string {
  const matches: string[] = [];
  for (const h of KNOWN_META_HARNESSES) {
    if (h.envVar in process.env) {
      matches.push(h.product);
    }
  }
  if (matches.length === 1) {
    return matches[0];
  }
  if (matches.length > 1) {
    return 'multiple';
  }
  return '';
}

let cached: string | undefined;

/**
 * Returns the detected meta-harness name, cached for the process lifetime.
 */
export function metaHarnessProvider(): string {
  cached ??= lookupMetaHarnessProvider();
  return cached;
}

/**
 * Clears the cached meta-harness detection result so that the next call to
 * {@link metaHarnessProvider} re-evaluates the environment. Exported for
 * testing only.
 */
export function clearMetaHarnessCache(): void {
  cached = undefined;
}
