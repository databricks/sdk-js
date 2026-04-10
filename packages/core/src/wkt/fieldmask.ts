// True if any property of T is callable, indicating a class instance (e.g.
// Temporal.Instant, Date) rather than a plain data interface.
type HasMethods<T> = true extends {
  [K in keyof T]-?: NonNullable<T[K]> extends (...args: never[]) => unknown
    ? true
    : never;
}[keyof T]
  ? true
  : false;

/**
 * Utility type that derives all valid dot-separated field paths from a
 * TypeScript interface. Provides compile-time path validation for
 * {@link FieldMask}.
 *
 * Recursion stops at arrays, index signatures (Record/Map), and class
 * instances with methods (e.g. Temporal.Instant, Date). These are treated
 * as leaf nodes.
 *
 * @example
 * ```ts
 * interface Cluster {
 *   name: string;
 *   config: {numWorkers: number; scaling: {min: number}};
 * }
 * // "name" | "config" | "config.numWorkers" | "config.scaling" | "config.scaling.min"
 * type ClusterPaths = FieldPaths<Cluster>;
 * ```
 */
export type FieldPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: NonNullable<T[K]> extends unknown[]
    ? `${Prefix}${K}` // Array field — leaf, do not recurse.
    : NonNullable<T[K]> extends Record<string, unknown>
      ? string extends keyof NonNullable<T[K]>
        ? `${Prefix}${K}` // Index signature (Record/Map) — leaf, do not recurse.
        : HasMethods<NonNullable<T[K]>> extends true
          ? `${Prefix}${K}` // Class instance with methods — leaf, do not recurse.
          : `${Prefix}${K}` | FieldPaths<NonNullable<T[K]>, `${Prefix}${K}.`>
      : `${Prefix}${K}`;
}[keyof T & string];

// Remove duplicates and paths subsumed by a parent (e.g. "config" subsumes
// "config.numWorkers").
function normalize<P extends string>(paths: P[]): P[] {
  const unique = [...new Set(paths)].sort();
  const result: P[] = [];
  for (const path of unique) {
    const isSubsumed = result.some(existing => path.startsWith(existing + '.'));
    if (!isSubsumed) {
      result.push(path);
    }
  }
  return result;
}

/**
 * A type-safe field mask implementing google.protobuf.FieldMask semantics.
 * Provides compile-time path validation via {@link FieldPaths}. Paths are
 * always normalized: duplicates and paths subsumed by a parent are removed.
 *
 * Paths use camelCase matching the TypeScript interface fields. The
 * serialization layer converts to snake_case for the wire format.
 *
 * @example
 * ```ts
 * const mask = FieldMask.of<FieldPaths<Cluster>>(
 *   'displayName',
 *   'config.numWorkers'
 * );
 * ```
 */
export class FieldMask<TPath extends string = string> {
  /** The list of field paths in this mask. */
  readonly paths: TPath[];

  private constructor(paths: TPath[]) {
    this.paths = normalize(paths);
  }

  /** Create a field mask from one or more paths. */
  static of<P extends string>(...paths: P[]): FieldMask<P> {
    return new FieldMask(paths);
  }

  /** Return a new mask with additional paths appended. */
  append(...paths: TPath[]): FieldMask<TPath> {
    return new FieldMask([...this.paths, ...paths]);
  }
}
