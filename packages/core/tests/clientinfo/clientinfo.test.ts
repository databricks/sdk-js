import {describe, it, expect} from 'vitest';
// Imports from the internal module rather than the barrel because the
// barrel transitively imports default.ts which uses process.version at
// module-load time and would fail in browser tests.
import {
  ClientInfo,
  ClientInfoError,
  isSemVer,
  isValidSegment,
  sanitize,
} from '../../src/clientinfo/clientinfo';
import type {ClientInfoErrorCode} from '../../src/clientinfo/clientinfo';

describe('ClientInfo', () => {
  describe('with and toString', () => {
    const testCases: {
      name: string;
      base: ClientInfo;
      kvs: string[];
      wantString: string;
      wantErrorCode?: ClientInfoErrorCode;
    }[] = [
      {
        name: 'empty base empty args',
        base: new ClientInfo(),
        kvs: [],
        wantString: '',
      },
      {
        name: 'single pair on empty base',
        base: new ClientInfo(),
        kvs: ['auth', 'pat'],
        wantString: 'auth/pat',
      },
      {
        name: 'multiple pairs on empty base',
        base: new ClientInfo(),
        kvs: ['dataquality', '0.0.1', 'auth', 'pat'],
        wantString: 'dataquality/0.0.1 auth/pat',
      },
      {
        name: 'appends to existing segments',
        base: new ClientInfo([{key: 'sdk', value: '1.0.0'}]),
        kvs: ['auth', 'pat'],
        wantString: 'sdk/1.0.0 auth/pat',
      },
      {
        name: 'no args returns same value',
        base: new ClientInfo([{key: 'sdk', value: '1.0.0'}]),
        kvs: [],
        wantString: 'sdk/1.0.0',
      },
      {
        name: 'preserves insertion order',
        base: new ClientInfo(),
        kvs: ['zzz', '3', 'aaa', '1', 'mmm', '2'],
        wantString: 'zzz/3 aaa/1 mmm/2',
      },
      {
        name: 'exact duplicate silently ignored',
        base: new ClientInfo([{key: 'key', value: 'value'}]),
        kvs: ['key', 'value'],
        wantString: 'key/value',
      },
      {
        name: 'duplicate within batch silently ignored',
        base: new ClientInfo(),
        kvs: ['key', 'value', 'key', 'value'],
        wantString: 'key/value',
      },
      {
        name: 'same key different value allowed',
        base: new ClientInfo([{key: 'partner', value: 'acme'}]),
        kvs: ['partner', 'contoso'],
        wantString: 'partner/acme partner/contoso',
      },
      {
        name: 'odd number of arguments',
        base: new ClientInfo(),
        kvs: ['key'],
        wantString: '',
        wantErrorCode: 'ODD_KEYVALS',
      },
      {
        name: 'invalid key with space',
        base: new ClientInfo(),
        kvs: ['bad key', 'value'],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'invalid key with slash',
        base: new ClientInfo(),
        kvs: ['bad/key', 'value'],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'invalid value with space',
        base: new ClientInfo(),
        kvs: ['key', 'bad value'],
        wantString: '',
        wantErrorCode: 'INVALID_VALUE',
      },
      {
        name: 'invalid value with special chars',
        base: new ClientInfo(),
        kvs: ['key', 'bad!value'],
        wantString: '',
        wantErrorCode: 'INVALID_VALUE',
      },
      {
        name: 'error on first invalid pair returns zero value',
        base: new ClientInfo([{key: 'existing', value: 'value'}]),
        kvs: ['bad key', 'value'],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'error on second pair leaves base unchanged',
        base: new ClientInfo(),
        kvs: ['good', 'value', 'bad key', 'value'],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
    ];

    it.each(testCases)('$name', ({base, kvs, wantString, wantErrorCode}) => {
      if (wantErrorCode !== undefined) {
        try {
          base.with(...kvs);
          expect.fail('Expected ClientInfoError to be thrown.');
        } catch (e: unknown) {
          if (e instanceof ClientInfoError) {
            expect(e.code).toBe(wantErrorCode);
          } else {
            throw e;
          }
        }
      } else {
        expect(base.with(...kvs).toString()).toBe(wantString);
      }
    });
  });

  it('does not mutate the original', () => {
    const base = new ClientInfo().with('foo', 'bar');
    const want = base.toString();
    base.with('extra', 'value');
    expect(base.toString()).toBe(want);
  });
});

describe('isSemVer', () => {
  const testCases: {name: string; input: string; want: boolean}[] = [
    {name: '1.2.3', input: '1.2.3', want: true},
    {
      name: '0.0.0-dev+2e014739024a',
      input: '0.0.0-dev+2e014739024a',
      want: true,
    },
    {name: '1.2.3.4', input: '1.2.3.4', want: false},
    {name: '1.2', input: '1.2', want: false},
  ];

  it.each(testCases)('$name', ({input, want}) => {
    expect(isSemVer(input)).toBe(want);
  });
});

describe('isValidSegment', () => {
  const testCases: {name: string; input: string; want: boolean}[] = [
    {name: 'foo', input: 'foo', want: true},
    {name: 'FOO', input: 'FOO', want: true},
    {name: 'FOO123', input: 'FOO123', want: true},
    {name: 'foo_bar', input: 'foo_bar', want: true},
    {name: 'foo-bar', input: 'foo-bar', want: true},
    {name: 'foo.bar', input: 'foo.bar', want: true},
    {name: 'foo+bar', input: 'foo+bar', want: true},
    {name: 'foo bar', input: 'foo bar', want: false},
    {name: 'foo/bar', input: 'foo/bar', want: false},
    {name: 'empty string', input: '', want: false},
  ];

  it.each(testCases)('$name', ({input, want}) => {
    expect(isValidSegment(input)).toBe(want);
  });
});

describe('sanitize', () => {
  const testCases: {name: string; input: string; want: string}[] = [
    {name: 'foo', input: 'foo', want: 'foo'},
    {name: 'FOO', input: 'FOO', want: 'FOO'},
    {name: 'foo_bar', input: 'foo_bar', want: 'foo_bar'},
    {name: 'foo-bar', input: 'foo-bar', want: 'foo-bar'},
    {name: 'foo+bar', input: 'foo+bar', want: 'foo+bar'},
    {name: 'foo.bar', input: 'foo.bar', want: 'foo.bar'},
    {name: '1.2.3', input: '1.2.3', want: '1.2.3'},
    {name: 'foo bar', input: 'foo bar', want: 'foo-bar'},
    {name: 'foo/bar', input: 'foo/bar', want: 'foo-bar'},
    {name: 'empty string', input: '', want: ''},
  ];

  it.each(testCases)('$name', ({input, want}) => {
    expect(sanitize(input)).toBe(want);
  });
});
