// Remove duplicates and paths subsumed by a parent (e.g. "config" subsumes "config.numWorkers").
function normalize(paths: string[]): string[] {
  const unique = [...new Set(paths)].sort();
  const result: string[] = [];
  for (const path of unique) {
    const isSubsumed = result.some(existing => path.startsWith(existing + '.'));
    if (!isSubsumed) {
      result.push(path);
    }
  }
  return result;
}

/**
 * One field entry in a {@link FieldMaskSchema}: its wire-format name and, for message-typed fields, a lazy reference to the nested message's schema. Array, map, enum, and scalar fields omit `children`.
 */
export interface FieldMaskSchemaField {
  readonly wire: string;
  readonly children?: () => FieldMaskSchema;
}

/**
 * Structural description of one message's FieldMask-reachable fields. Maps each typescript field name to its wire-format name and, for message-typed fields, a lazy `() => FieldMaskSchema` reference that lets recursive and mutually-recursive messages describe themselves.
 */
export type FieldMaskSchema = Readonly<Record<string, FieldMaskSchemaField>>;

// Walk a dot-separated typescript field name path against a schema, returning the equivalent wire-format path. Returns `undefined` when any segment fails: a name that isn't a field of the current message, or a non-terminal segment that doesn't reference another message.
function walkFieldMaskPath(
  schema: FieldMaskSchema,
  path: string
): string | undefined {
  const segments = path.split('.');
  const wireSegments: string[] = [];
  let current: FieldMaskSchema = schema;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    // Existence check before lookup: `current[seg]` is typed as FieldMaskSchemaField without noUncheckedIndexedAccess, so an undefined check downstream would be flagged "unnecessary".
    if (!(seg in current)) return undefined;
    const field = current[seg];
    wireSegments.push(field.wire);
    if (i < segments.length - 1) {
      if (field.children === undefined) return undefined;
      current = field.children();
    }
  }
  return wireSegments.join('.');
}

/**
 * A field mask implementing google.protobuf.FieldMask semantics.
 */
export class FieldMask<T = unknown> {
  // Phantom marker: keeps `FieldMask<Alert>` and `FieldMask<Query>` compile-time distinct under TypeScript's otherwise-structural typing. Never set at runtime.
  declare private readonly _tag: T;

  // Stored post-translation, normalized wire-format paths.
  private readonly paths: string[];

  private constructor(paths: string[]) {
    this.paths = paths;
  }

  /**
   * Build a FieldMask from typescript field name paths against the target message's schema. Validates every path by walking each segment through the schema and throws Error when any segment fails.
   *
   * Reserved for generated per-message factories; user code should call the factory (e.g. `alertFieldMask(...)`), which supplies the schema before delegating here.
   *
   * @internal
   */
  static build<T>(paths: string[], schema: FieldMaskSchema): FieldMask<T> {
    const normalized = normalize(paths);
    const wire: string[] = [];
    for (const p of normalized) {
      const w = walkFieldMaskPath(schema, p);
      if (w === undefined) {
        throw new Error(`Unknown field path "${p}"`);
      }
      wire.push(w);
    }
    return new FieldMask<T>(wire);
  }

  /**
   * Serialize the mask to the wire-format string.
   */
  toString(): string {
    return this.paths.join(',');
  }
}
