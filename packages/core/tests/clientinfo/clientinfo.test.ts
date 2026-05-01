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
      pairs: {key: string; value: string}[];
      wantString: string;
      wantErrorCode?: ClientInfoErrorCode;
    }[] = [
      {
        name: 'empty base empty args',
        base: ClientInfo.EMPTY,
        pairs: [],
        wantString: '',
      },
      {
        name: 'single pair on empty base',
        base: ClientInfo.EMPTY,
        pairs: [{key: 'auth', value: 'pat'}],
        wantString: 'auth/pat',
      },
      {
        name: 'multiple pairs on empty base',
        base: ClientInfo.EMPTY,
        pairs: [
          {key: 'dataquality', value: '0.0.1'},
          {key: 'auth', value: 'pat'},
        ],
        wantString: 'dataquality/0.0.1 auth/pat',
      },
      {
        name: 'appends to existing segments',
        base: ClientInfo.EMPTY.with({key: 'sdk', value: '1.0.0'}),
        pairs: [{key: 'auth', value: 'pat'}],
        wantString: 'sdk/1.0.0 auth/pat',
      },
      {
        name: 'no args returns same value',
        base: ClientInfo.EMPTY.with({key: 'sdk', value: '1.0.0'}),
        pairs: [],
        wantString: 'sdk/1.0.0',
      },
      {
        name: 'preserves insertion order',
        base: ClientInfo.EMPTY,
        pairs: [
          {key: 'zzz', value: '3'},
          {key: 'aaa', value: '1'},
          {key: 'mmm', value: '2'},
        ],
        wantString: 'zzz/3 aaa/1 mmm/2',
      },
      {
        name: 'exact duplicate silently ignored',
        base: ClientInfo.EMPTY.with({key: 'key', value: 'value'}),
        pairs: [{key: 'key', value: 'value'}],
        wantString: 'key/value',
      },
      {
        name: 'duplicate within batch silently ignored',
        base: ClientInfo.EMPTY,
        pairs: [
          {key: 'key', value: 'value'},
          {key: 'key', value: 'value'},
        ],
        wantString: 'key/value',
      },
      {
        name: 'same key different value allowed',
        base: ClientInfo.EMPTY.with({key: 'partner', value: 'acme'}),
        pairs: [{key: 'partner', value: 'contoso'}],
        wantString: 'partner/acme partner/contoso',
      },
      {
        name: 'invalid key with space',
        base: ClientInfo.EMPTY,
        pairs: [{key: 'bad key', value: 'value'}],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'invalid key with slash',
        base: ClientInfo.EMPTY,
        pairs: [{key: 'bad/key', value: 'value'}],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'invalid value with space',
        base: ClientInfo.EMPTY,
        pairs: [{key: 'key', value: 'bad value'}],
        wantString: '',
        wantErrorCode: 'INVALID_VALUE',
      },
      {
        name: 'invalid value with special chars',
        base: ClientInfo.EMPTY,
        pairs: [{key: 'key', value: 'bad!value'}],
        wantString: '',
        wantErrorCode: 'INVALID_VALUE',
      },
      {
        name: 'error on first invalid pair returns zero value',
        base: ClientInfo.EMPTY.with({key: 'existing', value: 'value'}),
        pairs: [{key: 'bad key', value: 'value'}],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
      {
        name: 'error on second pair leaves base unchanged',
        base: ClientInfo.EMPTY,
        pairs: [
          {key: 'good', value: 'value'},
          {key: 'bad key', value: 'value'},
        ],
        wantString: '',
        wantErrorCode: 'INVALID_KEY',
      },
    ];

    it.each(testCases)('$name', ({base, pairs, wantString, wantErrorCode}) => {
      if (wantErrorCode !== undefined) {
        try {
          base.with(...pairs);
          expect.fail('Expected ClientInfoError to be thrown.');
        } catch (e: unknown) {
          if (e instanceof ClientInfoError) {
            expect(e.code).toBe(wantErrorCode);
          } else {
            throw e;
          }
        }
      } else {
        expect(base.with(...pairs).toString()).toBe(wantString);
      }
    });
  });

  it('does not mutate the original', () => {
    const base = ClientInfo.EMPTY.with({key: 'foo', value: 'bar'});
    const want = base.toString();
    base.with({key: 'extra', value: 'value'});
    expect(base.toString()).toBe(want);
  });

  describe('with(ClientInfo) merges segments', () => {
    it('appends segments from another ClientInfo in order', () => {
      const base = ClientInfo.EMPTY.with({key: 'app', value: '1.0.0'});
      const pkg = ClientInfo.EMPTY.with(
        {key: 'sdk-iam', value: '0.1.0'},
        {key: 'sdk-feature', value: 'pagination'}
      );
      expect(base.with(pkg).toString()).toBe(
        'app/1.0.0 sdk-iam/0.1.0 sdk-feature/pagination'
      );
    });

    it('dedups segments already present in base', () => {
      const base = ClientInfo.EMPTY.with({key: 'dup', value: 'v1'});
      const pkg = ClientInfo.EMPTY.with(
        {key: 'dup', value: 'v1'},
        {key: 'fresh', value: 'v2'}
      );
      expect(base.with(pkg).toString()).toBe('dup/v1 fresh/v2');
    });

    it('allows mixing a ClientInfo and pairs in a single call', () => {
      const base = ClientInfo.EMPTY.with({key: 'app', value: '1.0.0'});
      const pkg = ClientInfo.EMPTY.with({key: 'sdk-iam', value: '0.1.0'});
      expect(base.with(pkg, {key: 'auth', value: 'pat'}).toString()).toBe(
        'app/1.0.0 sdk-iam/0.1.0 auth/pat'
      );
    });

    it('returns the same value when the merged ClientInfo is empty', () => {
      const base = ClientInfo.EMPTY.with({key: 'app', value: '1.0.0'});
      expect(base.with(ClientInfo.EMPTY).toString()).toBe('app/1.0.0');
    });
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
