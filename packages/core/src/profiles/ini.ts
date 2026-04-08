/**
 * Minimal INI parser and writer for the Databricks config file format.
 *
 * This is intentionally not a general-purpose INI library. It implements only
 * the subset of behavior needed by databrickscfg files. In particular, `#`
 * and `;` are only treated as inline comment delimiters when preceded by a
 * space, because passwords and tokens may contain these characters. No
 * standard npm INI library supports this semantic, so a focused
 * implementation is used instead.
 *
 * @module
 */

/** Parsed INI data as an ordered map of section names to key-value maps. */
export type IniData = Map<string, Map<string, string>>;

/**
 * Parses an INI-formatted string into structured data.
 *
 * Both `=` and `:` are accepted as key-value delimiters. Inline comments are
 * stripped only when `#` or `;` is preceded by a space, because passwords and
 * tokens commonly contain these characters. Matching double or single quotes
 * around values are stripped. Backslash at end of line joins the next line.
 *
 * @throws {Error} If a non-empty, non-comment line has no key-value delimiter.
 */
export function parseIni(content: string): IniData {
  const result: IniData = new Map();
  // Keys before any explicit section header are assigned to DEFAULT,
  // matching standard INI behavior.
  let currentSection = 'DEFAULT';
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and full-line comments.
    if (line === '' || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }

    // Section header. Preserve the raw name including any spaces.
    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.slice(1, -1);
      if (!result.has(currentSection)) {
        result.set(currentSection, new Map());
      }
      continue;
    }

    // Find the key-value delimiter (first = or :).
    const eqIndex = line.indexOf('=');
    const colonIndex = line.indexOf(':');
    let delimIndex: number;
    if (eqIndex >= 0 && colonIndex >= 0) {
      delimIndex = Math.min(eqIndex, colonIndex);
    } else if (eqIndex >= 0) {
      delimIndex = eqIndex;
    } else if (colonIndex >= 0) {
      delimIndex = colonIndex;
    } else {
      throw new Error(`key-value delimiter not found: ${line}`);
    }

    const key = line.slice(0, delimIndex).trim();
    let value = line.slice(delimIndex + 1).trim();

    // Handle backslash line continuation.
    while (value.endsWith('\\') && i + 1 < lines.length) {
      value = value.slice(0, -1);
      i++;
      value += lines[i].trim();
    }

    // Strip inline comments: only when # or ; is preceded by a space.
    for (let j = 1; j < value.length; j++) {
      if ((value[j] === '#' || value[j] === ';') && value[j - 1] === ' ') {
        value = value.slice(0, j - 1).trimEnd();
        break;
      }
    }

    // Strip matching quotes from values.
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }

    if (!result.has(currentSection)) {
      result.set(currentSection, new Map());
    }
    const section = result.get(currentSection);
    if (section !== undefined) {
      section.set(key, value);
    }
  }

  return result;
}

/**
 * Formats structured INI data back into a string.
 *
 * Each section's keys are aligned so that all `=` signs appear in the same
 * column.
 */
export function formatIni(data: IniData): string {
  const sections: string[] = [];

  for (const [name, keys] of data) {
    const lines: string[] = [];
    lines.push(`[${name}]`);

    if (keys.size > 0) {
      const maxKeyLen = Math.max(...[...keys.keys()].map(k => k.length));
      for (const [key, value] of keys) {
        lines.push(`${key.padEnd(maxKeyLen)} = ${value}`);
      }
    }

    sections.push(lines.join('\n'));
  }

  return sections.join('\n\n') + '\n';
}
