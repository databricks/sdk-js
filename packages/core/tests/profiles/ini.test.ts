import {describe, it, expect} from 'vitest';
// The INI module is internal and not exported from the barrel. We import
// directly because these tests verify the parser/writer in isolation.
import {parseIni, formatIni} from '../../src/profiles/ini';

// Shorthand: DEFAULT is always present in parsed output (matching go-ini).
const EMPTY_DEFAULT: [string, [string, string][]] = ['DEFAULT', []];

describe('parseIni', () => {
  const parseCases: {
    name: string;
    input: string;
    want: [string, [string, string][]][];
  }[] = [
    {
      name: 'sections and key-value pairs',
      input: [
        '[DEFAULT]',
        'host = https://default.cloud.databricks.com',
        'token = default-token',
        '',
        '[workspace]',
        'host = https://workspace.cloud.databricks.com',
      ].join('\n'),
      want: [
        [
          'DEFAULT',
          [
            ['host', 'https://default.cloud.databricks.com'],
            ['token', 'default-token'],
          ],
        ],
        ['workspace', [['host', 'https://workspace.cloud.databricks.com']]],
      ],
    },
    {
      name: 'keys before any section go to DEFAULT',
      input: 'host = https://implicit.com\ntoken = tok',
      want: [
        [
          'DEFAULT',
          [
            ['host', 'https://implicit.com'],
            ['token', 'tok'],
          ],
        ],
      ],
    },
    {
      name: 'colon delimiter',
      input: '[test]\nhost: https://example.com',
      want: [EMPTY_DEFAULT, ['test', [['host', 'https://example.com']]]],
    },
    {
      name: 'first delimiter wins over later ones',
      input: '[test]\nurl = https://example.com?a=1&b=2',
      want: [EMPTY_DEFAULT, ['test', [['url', 'https://example.com?a=1&b=2']]]],
    },
    {
      name: 'colon in value after equals delimiter',
      input: '[test]\nhost = https://example.com:8080',
      want: [EMPTY_DEFAULT, ['test', [['host', 'https://example.com:8080']]]],
    },
    {
      name: 'inline comment " #" strips value',
      input: '[test]\ntoken = abc #this is a comment',
      want: [EMPTY_DEFAULT, ['test', [['token', 'abc']]]],
    },
    {
      name: '# without preceding space is preserved in value',
      input: '[test]\ntoken = abc#def#ghi',
      want: [EMPTY_DEFAULT, ['test', [['token', 'abc#def#ghi']]]],
    },
    {
      name: '" #" has precedence over " ;" (go-ini behavior)',
      input: '[test]\nvalue = a ;b #c',
      want: [EMPTY_DEFAULT, ['test', [['value', 'a ;b']]]],
    },
    {
      name: '" ;" is used when " #" is absent',
      input: '[test]\nhost = value ;comment',
      want: [EMPTY_DEFAULT, ['test', [['host', 'value']]]],
    },
    {
      name: '; without preceding space is preserved in value',
      input: '[test]\nhost = abc;def',
      want: [EMPTY_DEFAULT, ['test', [['host', 'abc;def']]]],
    },
    {
      name: 'full-line # comment is skipped',
      input: '[test]\n# This is a comment\nhost = value',
      want: [EMPTY_DEFAULT, ['test', [['host', 'value']]]],
    },
    {
      name: 'full-line ; comment is skipped',
      input: '[test]\n; This is a comment\nhost = value',
      want: [EMPTY_DEFAULT, ['test', [['host', 'value']]]],
    },
    {
      name: 'blank lines are skipped',
      input: '[test]\n\nhost = value\n\ntoken = tok',
      want: [
        EMPTY_DEFAULT,
        [
          'test',
          [
            ['host', 'value'],
            ['token', 'tok'],
          ],
        ],
      ],
    },
    {
      name: 'keys and values are trimmed',
      input: '[test]\n  host  =  https://example.com  ',
      want: [EMPTY_DEFAULT, ['test', [['host', 'https://example.com']]]],
    },
    {
      name: 'empty section creates an entry with no keys',
      input: '[empty]',
      want: [EMPTY_DEFAULT, ['empty', []]],
    },
    {
      name: 'empty input still has DEFAULT section',
      input: '',
      want: [EMPTY_DEFAULT],
    },
    {
      name: 'Windows line endings',
      input: '[test]\r\nhost = value\r\n',
      want: [EMPTY_DEFAULT, ['test', [['host', 'value']]]],
    },
    {
      name: 'section name uses last ] on line',
      input: '[foo]bar]\nkey = val',
      want: [EMPTY_DEFAULT, ['foo]bar', [['key', 'val']]]],
    },
    {
      name: 'section name is not trimmed',
      input: '[ spaces ]\nkey = val',
      want: [EMPTY_DEFAULT, [' spaces ', [['key', 'val']]]],
    },
    {
      name: 'duplicate sections are merged',
      input: '[test]\nhost = a\n\n[test]\ntoken = b',
      want: [
        EMPTY_DEFAULT,
        [
          'test',
          [
            ['host', 'a'],
            ['token', 'b'],
          ],
        ],
      ],
    },
    {
      name: 'duplicate keys in same section take last value',
      input: '[test]\nhost = first\nhost = second',
      want: [EMPTY_DEFAULT, ['test', [['host', 'second']]]],
    },
    {
      name: '# at start of value is not a comment',
      input: '[test]\nkey = #not-a-comment',
      want: [EMPTY_DEFAULT, ['test', [['key', '#not-a-comment']]]],
    },
    {
      name: 'space-hash after trimming still not a comment',
      input: '[test]\nkey =  #still-value',
      want: [EMPTY_DEFAULT, ['test', [['key', '#still-value']]]],
    },
    {
      name: 'space-hash before space-semicolon takes precedence',
      input: '[test]\nval = a #b ;c',
      want: [EMPTY_DEFAULT, ['test', [['val', 'a']]]],
    },
    {
      name: 'first space-hash wins when multiple present',
      input: '[test]\nval = x #y #z',
      want: [EMPTY_DEFAULT, ['test', [['val', 'x']]]],
    },
    {
      name: 'colon as first delimiter before equals',
      input: '[test]\nkey: val=ue',
      want: [EMPTY_DEFAULT, ['test', [['key', 'val=ue']]]],
    },
    {
      name: 'empty value after equals',
      input: '[test]\nkey =',
      want: [EMPTY_DEFAULT, ['test', [['key', '']]]],
    },
    {
      name: 'empty value with trailing space',
      input: '[test]\nkey = ',
      want: [EMPTY_DEFAULT, ['test', [['key', '']]]],
    },
  ];

  it.each(parseCases)('$name', ({input, want}) => {
    const result = parseIni(input);
    const got = [...result.entries()].map(
      ([name, keys]) =>
        [name, [...keys.entries()]] as [string, [string, string][]]
    );
    expect(got).toEqual(want);
  });

  it('should throw on lines without a delimiter', () => {
    const input = '[test]\ninvalid line\nhost = value';
    expect(() => parseIni(input)).toThrow(/key-value delimiter not found/);
  });
});

describe('formatIni', () => {
  const formatCases: {
    name: string;
    data: [string, [string, string][]][];
    want: string;
  }[] = [
    {
      name: 'single section',
      data: [['test', [['host', 'https://example.com']]]],
      want: '[test]\nhost = https://example.com\n',
    },
    {
      name: 'key alignment within a section',
      data: [
        [
          'test',
          [
            ['host', 'https://example.com'],
            ['token', 'my-token'],
            ['client_id', 'my-client'],
          ],
        ],
      ],
      want: [
        '[test]',
        'host      = https://example.com',
        'token     = my-token',
        'client_id = my-client',
        '',
      ].join('\n'),
    },
    {
      name: 'blank line between sections',
      data: [
        ['first', [['host', 'https://first.com']]],
        ['second', [['host', 'https://second.com']]],
      ],
      want: [
        '[first]',
        'host = https://first.com',
        '',
        '[second]',
        'host = https://second.com',
        '',
      ].join('\n'),
    },
    {
      name: 'empty section',
      data: [['empty', []]],
      want: '[empty]\n',
    },
  ];

  it.each(formatCases)('$name', ({data, want}) => {
    const iniData = new Map(
      data.map(([name, entries]) => [name, new Map(entries)])
    );
    expect(formatIni(iniData)).toBe(want);
  });

  it('should round-trip through parse and format', () => {
    const original = [
      '[DEFAULT]',
      'host  = https://default.com',
      'token = default-token',
      '',
      '[workspace]',
      'host = https://workspace.com',
    ].join('\n');

    const parsed = parseIni(original);
    const formatted = formatIni(parsed);
    const reparsed = parseIni(formatted);

    // Values should be identical after round-trip.
    for (const [section, keys] of parsed) {
      for (const [key, value] of keys) {
        expect(reparsed.get(section)?.get(key), `${section}.${key}`).toBe(
          value
        );
      }
    }
  });
});
