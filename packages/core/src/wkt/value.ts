/**
 * Represents any valid JSON value. Matches the JSON value space used by
 * google.protobuf.Value.
 */
export type JsonValue =
  | null
  | number
  | string
  | boolean
  | JsonObject
  | JsonValue[];

/**
 * Represents a JSON object with string keys and JSON values. Matches the
 * structure used by google.protobuf.Struct.
 */
export interface JsonObject {
  [key: string]: JsonValue;
}
