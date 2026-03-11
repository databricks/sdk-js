/**
 * Minimal INI file parser for `.databrickscfg` files.
 *
 * Parses the standard INI format used by Databricks configuration files.
 * Each section maps to a record of key-value pairs.
 */

/** A parsed INI file represented as section name to key-value map. */
export type IniFile = Map<string, Map<string, string>>;

/**
 * Parses an INI-formatted string into a structured map.
 *
 * Sections are delimited by `[section_name]` headers. Key-value pairs
 * within a section are separated by `=`. Keys and values are trimmed of
 * leading and trailing whitespace. Lines starting with `#` or `;` are
 * treated as comments and ignored.
 */
export function parseIni(content: string): IniFile {
  const result: IniFile = new Map();
  let currentSection: Map<string, string> | undefined;

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();

    // Skip empty lines and comments.
    if (line === '' || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }

    // Section header.
    if (line.startsWith('[') && line.endsWith(']')) {
      const name = line.slice(1, -1).trim();
      currentSection = new Map();
      result.set(name, currentSection);
      continue;
    }

    // Key-value pair.
    if (currentSection !== undefined) {
      const eqIndex = line.indexOf('=');
      if (eqIndex !== -1) {
        const key = line.slice(0, eqIndex).trim();
        const value = line.slice(eqIndex + 1).trim();
        currentSection.set(key, value);
      }
    }
  }

  return result;
}
