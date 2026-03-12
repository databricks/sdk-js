/**
 * INI file parser for `.databrickscfg` files.
 *
 * Delegates to the `ini` npm package for robust parsing that handles edge
 * cases such as inline comments, Windows line endings, and quoted values.
 */

import {parse} from 'ini';

/**
 * A parsed INI file represented as a record of section names to key-value
 * records.
 */
export type IniFile = Record<string, Record<string, string>>;

/**
 * Parses an INI-formatted string into a structured record.
 *
 * Sections are delimited by `[section_name]` headers. Key-value pairs
 * within a section are separated by `=`. Lines starting with `#` or `;`
 * are treated as comments and ignored.
 *
 * Global key-value pairs (those appearing before any section header) are
 * excluded from the result since `.databrickscfg` files do not use them.
 */
export function parseIni(content: string): IniFile {
  const raw = parse(content);
  const result: IniFile = {};

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const section: Record<string, string> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        section[k] = String(v);
      }
      result[key] = section;
    }
  }

  return result;
}
