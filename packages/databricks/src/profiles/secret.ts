/**
 * Obfuscated string type for secrets in configuration profiles.
 *
 * @module
 */

const OBFUSCATED = '********';

/**
 * A string value that is obfuscated in all string representations to prevent
 * accidental secret leakage in logs, serialization, and debugging output.
 *
 * Use {@link Secret.value} for intentional access to the underlying value.
 */
export class Secret {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  /** Returns the underlying secret value. */
  get value(): string {
    return this.#value;
  }

  /** Returns the obfuscated placeholder instead of the secret. */
  toString(): string {
    return OBFUSCATED;
  }

  /** Returns the obfuscated placeholder when serialized to JSON. */
  toJSON(): string {
    return OBFUSCATED;
  }

  /** Returns the obfuscated placeholder for Node.js `util.inspect` output. */
  [Symbol.for('nodejs.util.inspect.custom')](): string {
    return OBFUSCATED;
  }
}
