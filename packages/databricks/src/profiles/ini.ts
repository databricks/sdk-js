/**
 * Minimal INI parser and writer for the Databricks config file format.
 *
 * This is intentionally not a general-purpose INI library. It implements only
 * the subset of behavior needed by databrickscfg files, specifically the
 * {@link https://pkg.go.dev/gopkg.in/ini.v1 | go-ini} SpaceBeforeInlineComment
 * semantics where `#` and `;` are only treated as inline comment delimiters
 * when preceded by a space. No standard npm INI library supports this, so a
 * focused implementation is used instead.
 *
 * @module
 */

/** Parsed INI data as an ordered map of section names to key-value maps. */
export type IniData = Map<string, Map<string, string>>;

/**
 * Parses an INI-formatted string into structured data.
 *
 * Keys before any section header are assigned to the "DEFAULT" section.
 * Inline comments are stripped only when `#` or `;` is preceded by a space,
 * matching the Go SDK's SpaceBeforeInlineComment behavior.
 */
export function parseIni(content: string): IniData {
  const result: IniData = new Map();
  let currentSection = 'DEFAULT';

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    // Skip empty lines and full-line comments.
    if (line === '' || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }

    // Section header.
    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.slice(1, -1).trim();
      if (!result.has(currentSection)) {
        result.set(currentSection, new Map());
      }
      continue;
    }

    // Key-value pair.
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    // Strip inline comments: only when # or ; is preceded by a space.
    for (let i = 1; i < value.length; i++) {
      if ((value[i] === '#' || value[i] === ';') && value[i - 1] === ' ') {
        value = value.slice(0, i - 1).trimEnd();
        break;
      }
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
 * column, matching the output format of Go's ini.v1 library.
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
