/**
 * Hand-rolled INI file parser for `.databrickscfg` files.
 *
 * This parser handles the specific INI dialect used by Databricks config
 * files. It correctly preserves values containing `#` or `;` characters
 * (e.g. passwords like `abc#123`) by only treating these as inline comment
 * markers when preceded by a space, matching the Go SDK behavior.
 */

/**
 * A parsed INI file represented as a record of section names to key-value
 * records.
 */
export type IniFile = Record<string, Record<string, string>>;

/**
 * Strips an inline comment from a value string.
 *
 * A `#` or `;` character is only treated as the start of an inline comment
 * when it is preceded by at least one space. This matches the Go SDK's
 * `gopkg.in/ini.v1` behavior and avoids truncating values that contain
 * these characters (e.g. `abc#123`).
 */
function stripInlineComment(value: string): string {
  for (let i = 1; i < value.length; i++) {
    if ((value[i] === '#' || value[i] === ';') && value[i - 1] === ' ') {
      return value.slice(0, i - 1).trimEnd();
    }
  }
  return value;
}

/**
 * Parses an INI-formatted string into a structured record.
 *
 * Sections are delimited by `[section_name]` headers. Key-value pairs
 * within a section are separated by `=`. Lines starting with `#` or `;`
 * are treated as full-line comments and ignored.
 *
 * Global key-value pairs (those appearing before any section header) are
 * excluded from the result since `.databrickscfg` files do not use them.
 *
 * When duplicate section names appear, their keys are merged into a single
 * section. Later keys override earlier ones with the same name, matching
 * the Go SDK (gopkg.in/ini.v1) behavior.
 */
export function parseIni(content: string): IniFile {
  const result: IniFile = Object.create(null) as IniFile;
  let currentSection: string | undefined;

  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines and full-line comments.
    if (line === '' || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }

    // Section header. Strip inline comments so that
    // `[DEFAULT] # comment` is recognized correctly.
    if (line.startsWith('[')) {
      const stripped = stripInlineComment(line);
      if (stripped.endsWith(']')) {
        currentSection = stripped.slice(1, -1).trim();
        // Merge into existing section instead of replacing it, matching
        // the Go SDK (gopkg.in/ini.v1) behavior.
        if (!Object.hasOwn(result, currentSection)) {
          result[currentSection] = Object.create(null) as Record<
            string,
            string
          >;
        }
        continue;
      }
    }

    // Key-value pair. Only record if we are inside a section.
    const eqIndex = line.indexOf('=');
    if (eqIndex !== -1 && currentSection !== undefined) {
      const key = line.slice(0, eqIndex).trim();
      const rawValue = line.slice(eqIndex + 1).trim();
      const value = stripInlineComment(rawValue);
      result[currentSection][key] = value;
    }
  }

  return result;
}
