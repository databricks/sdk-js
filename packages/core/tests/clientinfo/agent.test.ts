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
      name: 'AGENT with unrecognized value passes through (sanitized)',
      env: {AGENT: 'someweirdthing'},
      want: 'someweirdthing',
    },
    {
      name: 'AGENT with disallowed chars is sanitized to hyphens',
      env: {AGENT: 'claude code/agent'},
      want: 'claude-code-agent',
    },
    {
      name: 'AGENT longer than the cap is truncated',
      env: {AGENT: 'a'.repeat(100)},
      want: 'a'.repeat(64),
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
      name: 'known matcher wins over unrecognized AGENT fallback',
      env: {AGENT: 'somethingunknown', CLAUDECODE: '1'},
      want: 'claude-code',
    },
    {
      name: 'VSCODE_AGENT + COPILOT_CLI reports multiple',
      env: {VSCODE_AGENT: '1', COPILOT_CLI: '1'},
      want: 'multiple',
    },
    // AI_AGENT fallback (Vercel @vercel/detect-agent convention).
    {
      name: 'AI_AGENT=cursor falls back to cursor',
      env: {AI_AGENT: 'cursor'},
      want: 'cursor',
    },
    {
      name: 'AI_AGENT empty string does not trigger fallback',
      env: {AI_AGENT: ''},
      want: '',
    },
    {
      name: 'known matcher wins over AI_AGENT fallback',
      env: {AI_AGENT: 'somethingunknown', CLAUDECODE: '1'},
      want: 'claude-code',
    },
    // AGENT vs AI_AGENT precedence: AGENT wins when both are non-empty.
    {
      name: 'AGENT wins over AI_AGENT when both are set to known products',
      env: {AGENT: 'claude-code', AI_AGENT: 'cursor'},
      want: 'claude-code',
    },
    {
      name: 'AGENT set to unrecognized non-empty value still wins over AI_AGENT',
      env: {AGENT: 'somethingunknown', AI_AGENT: 'cursor'},
      want: 'somethingunknown',
    },
    {
      name: 'AGENT set, AI_AGENT empty: AGENT value is used',
      env: {AGENT: 'cursor', AI_AGENT: ''},
      want: 'cursor',
    },
    {
      name: 'empty AGENT falls through to AI_AGENT',
      env: {AGENT: '', AI_AGENT: 'cursor'},
      want: 'cursor',
    },
    {
      name: 'both AGENT and AI_AGENT empty returns no agent',
      env: {AGENT: '', AI_AGENT: ''},
      want: '',
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
