import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {
  agentProvider,
  clearAgentCache,
  lookupAgentProvider,
} from '../../src/clientinfo/agent';

describe('lookupAgentProvider', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    clearAgentCache();
    savedEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = savedEnv;
    clearAgentCache();
  });

  const testCases: {
    name: string;
    env: Record<string, string>;
    want: string;
  }[] = [
    {
      name: 'no agent',
      env: {},
      want: '',
    },
    {
      name: 'amp via AMP_CURRENT_THREAD_ID',
      env: {AMP_CURRENT_THREAD_ID: 'abc123'},
      want: 'amp',
    },
    {
      name: 'antigravity',
      env: {ANTIGRAVITY_AGENT: '1'},
      want: 'antigravity',
    },
    {
      name: 'augment',
      env: {AUGMENT_AGENT: '1'},
      want: 'augment',
    },
    {
      name: 'claude code',
      env: {CLAUDECODE: '1'},
      want: 'claude-code',
    },
    {
      name: 'cline',
      env: {CLINE_ACTIVE: '1'},
      want: 'cline',
    },
    {
      name: 'codex',
      env: {CODEX_CI: '1'},
      want: 'codex',
    },
    {
      name: 'copilot cli',
      env: {COPILOT_CLI: '1'},
      want: 'copilot-cli',
    },
    {
      name: 'vscode-agent',
      env: {VSCODE_AGENT: '1'},
      want: 'vscode-agent',
    },
    {
      name: 'cursor',
      env: {CURSOR_AGENT: '1'},
      want: 'cursor',
    },
    {
      name: 'gemini cli',
      env: {GEMINI_CLI: '1'},
      want: 'gemini-cli',
    },
    {
      name: 'goose via GOOSE_TERMINAL',
      env: {GOOSE_TERMINAL: '1'},
      want: 'goose',
    },
    {
      name: 'kiro',
      env: {KIRO: '1'},
      want: 'kiro',
    },
    {
      name: 'openclaw',
      env: {OPENCLAW_SHELL: 'exec'},
      want: 'openclaw',
    },
    {
      name: 'opencode',
      env: {OPENCODE: '1'},
      want: 'opencode',
    },
    {
      name: 'windsurf',
      env: {WINDSURF_AGENT: '1'},
      want: 'windsurf',
    },
    {
      name: 'empty value still counts as set',
      env: {CLAUDECODE: ''},
      want: 'claude-code',
    },
    {
      name: 'multiple agents stacked (e.g. Cursor CLI subagent invoked by Claude Code)',
      env: {CLAUDECODE: '1', CURSOR_AGENT: '1'},
      want: 'multiple',
    },
    {
      name: 'three stacked agents also report multiple',
      env: {CLAUDECODE: '1', CURSOR_AGENT: '1', AUGMENT_AGENT: '1'},
      want: 'multiple',
    },
    {
      name: 'goose via AGENT',
      env: {AGENT: 'goose'},
      want: 'goose',
    },
    {
      name: 'amp via AGENT',
      env: {AGENT: 'amp'},
      want: 'amp',
    },
    {
      name: 'cursor via AGENT',
      env: {AGENT: 'cursor'},
      want: 'cursor',
    },
    {
      name: 'AGENT with unknown value falls back to unknown',
      env: {AGENT: 'somethingweird'},
      want: 'unknown',
    },
    {
      name: 'AGENT empty string does not trigger fallback',
      env: {AGENT: ''},
      want: '',
    },
    {
      name: 'goose via both GOOSE_TERMINAL and AGENT is not ambiguous',
      env: {GOOSE_TERMINAL: '1', AGENT: 'goose'},
      want: 'goose',
    },
    {
      name: 'explicit GOOSE_TERMINAL wins over AGENT=cursor',
      env: {GOOSE_TERMINAL: '1', AGENT: 'cursor'},
      want: 'goose',
    },
    {
      name: 'explicit CLAUDECODE wins over AGENT=goose',
      env: {AGENT: 'goose', CLAUDECODE: '1'},
      want: 'claude-code',
    },
    {
      name: 'known matcher wins over AGENT fallback to unknown',
      env: {AGENT: 'somethingunknown', CLAUDECODE: '1'},
      want: 'claude-code',
    },
    {
      name: 'VSCODE_AGENT + COPILOT_CLI reports multiple',
      env: {VSCODE_AGENT: '1', COPILOT_CLI: '1'},
      want: 'multiple',
    },
  ];

  it.each(testCases)('$name', ({env, want}) => {
    process.env = env;
    expect(lookupAgentProvider()).toBe(want);
  });
});

describe('agentProvider', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    clearAgentCache();
    savedEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = savedEnv;
    clearAgentCache();
  });

  it('caches the detection result for the process lifetime', () => {
    process.env = {CURSOR_AGENT: '1'};
    expect(agentProvider()).toBe('cursor');

    // Changing the environment after the first call must not change the
    // cached result.
    process.env = {CLAUDECODE: '1'};
    expect(agentProvider()).toBe('cursor');
  });
});
