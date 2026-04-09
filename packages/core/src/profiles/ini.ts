/**
 * Minimal INI parser and writer for the Databricks config file format.
 *
 * This matches the behavior of {@link https://pkg.go.dev/gopkg.in/ini.v1 | go-ini}
 * with `SpaceBeforeInlineComment: true`, which is how the Go SDK loads
 * databrickscfg files. Key behavioral details:
 *
 * - Inline comments are only recognized when `#` or `;` is preceded by a
 *   space. The parser checks for `" #"` first; only if absent does it check
 *   for `" ;"`. This matches Go's `strings.Index` precedence.
 * - Both `=` and `:` are key-value delimiters (Go default). Only the first
 *   delimiter on a line splits key from value.
 * - Section names are the raw text between `[` and the last `]` on the line,
 *   with no trimming.
 * - Keys and values are trimmed of surrounding whitespace.
 * - Lines without a delimiter throw an error (matching go-ini default).
 *
 * @module
 */

/** Parsed INI data as an ordered map of section names to key-value maps. */
export type IniData = Map<string, Map<string, string>>;

/**
 * Parses an INI-formatted string into structured data.
 *
 * Keys before any section header are assigned to the "DEFAULT" section.
 */
export function parseIni(content: string): IniData {
  const result: IniData = new Map();
  let currentSection = 'DEFAULT';
  result.set(currentSection, new Map());

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    // Skip empty lines and full-line comments.
    if (line === '' || line.startsWith('#') || line.startsWith(';')) {
      continue;
    }

    // Section header: text between '[' and the last ']'.
    if (line.startsWith('[')) {
      const closeIdx = line.lastIndexOf(']');
      if (closeIdx === -1) {
        throw new Error(`unclosed section: ${line}`);
      }
      const name = line.slice(1, closeIdx);
      if (name === '') {
        throw new Error('empty section name');
      }
      currentSection = name;
      if (!result.has(currentSection)) {
        result.set(currentSection, new Map());
      }
      continue;
    }

    // Key-value pair: first '=' or ':' splits key from value.
    const eqIdx = line.indexOf('=');
    const colonIdx = line.indexOf(':');
    let delimIdx: number;
    if (eqIdx === -1 && colonIdx === -1) {
      throw new Error(`key-value delimiter not found: ${line}`);
    } else if (eqIdx === -1) {
      delimIdx = colonIdx;
    } else if (colonIdx === -1) {
      delimIdx = eqIdx;
    } else {
      delimIdx = Math.min(eqIdx, colonIdx);
    }

    const key = line.slice(0, delimIdx).trim();
    if (key === '') {
      throw new Error(`empty key name: ${line}`);
    }
    let value = line.slice(delimIdx + 1).trim();

    // Strip inline comments matching go-ini's SpaceBeforeInlineComment
    // precedence: try " #" first, then " ;" only if " #" is absent.
    let commentIdx = value.indexOf(' #');
    if (commentIdx === -1) {
      commentIdx = value.indexOf(' ;');
    }
    if (commentIdx !== -1) {
      value = value.slice(0, commentIdx).trimEnd();
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
 * column, matching the output format of go-ini's `PrettyFormat` default.
 * Sections are separated by blank lines (`PrettySection` default).
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
