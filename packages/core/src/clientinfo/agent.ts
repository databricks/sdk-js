/**
 * Detects the AI coding agent (e.g. Claude Code, Cursor, Gemini CLI) that
 * is running the current Node.js process. The detected product name is
 * appended to the user-agent header so that Databricks can understand
 * which agents are invoking the SDK.
 *
 * The agent list and precedence rules are kept in sync across the Go,
 * Java, Python, and TypeScript SDKs.
 *
 * @module
 */

import {sanitize} from './clientinfo';

interface KnownAgent {
  readonly envVar: string;
  readonly product: string;
}

// Name of the agents.md standard env var.
const AGENT_ENV_VAR = 'AGENT';

// Name of the Vercel @vercel/detect-agent convention env var. It serves
// the same purpose as AGENT_ENV_VAR; agentEnvFallback consults it only when
// AGENT_ENV_VAR is unset or empty.
const AI_AGENT_ENV_VAR = 'AI_AGENT';

// Caps fallback values to keep the user-agent bounded. Explicit-matcher
// products are short by construction; only the fallback path can carry
// arbitrary lengths.
const MAX_AGENT_FALLBACK_LEN = 64;

// Canonical list of AI coding agents. Keep this list, and the AGENT /
// AI_AGENT fallback handling in agentEnvFallback, in sync with the Go,
// Java, and Python SDKs. Agents are listed alphabetically by product name.
const KNOWN_AGENTS: readonly KnownAgent[] = [
  // The amp agent also sets AGENT=amp, handled by the central fallback.
  {envVar: 'AMP_CURRENT_THREAD_ID', product: 'amp'},
  {envVar: 'ANTIGRAVITY_AGENT', product: 'antigravity'},
  {envVar: 'AUGMENT_AGENT', product: 'augment'},
  {envVar: 'CLAUDECODE', product: 'claude-code'},
  {envVar: 'CLINE_ACTIVE', product: 'cline'},
  {envVar: 'CODEX_CI', product: 'codex'},
  {envVar: 'COPILOT_CLI', product: 'copilot-cli'},
  {envVar: 'CURSOR_AGENT', product: 'cursor'},
  {envVar: 'GEMINI_CLI', product: 'gemini-cli'},
  // The goose agent also sets AGENT=goose, handled by the central
  // fallback.
  {envVar: 'GOOSE_TERMINAL', product: 'goose'},
  {envVar: 'KIRO', product: 'kiro'},
  {envVar: 'OPENCLAW_SHELL', product: 'openclaw'},
  {envVar: 'OPENCODE', product: 'opencode'},
  // Set by VS Code 1.121+ for agent-initiated terminal commands
  // (https://code.visualstudio.com/updates/v1_121).
  {envVar: 'VSCODE_AGENT', product: 'vscode-agent'},
  {envVar: 'WINDSURF_AGENT', product: 'windsurf'},
];

/**
 * Returns a sanitized, length-capped name from `AGENT` or `AI_AGENT`,
 * preferring `AGENT` when both are non-empty. Empty is treated as unset for
 * both. The value is passed through rather than categorized so that new
 * names are propagated without the need to update the list of known agents.
 */
function agentEnvFallback(): string {
  let v = process.env[AGENT_ENV_VAR];
  if (v === undefined || v === '') {
    v = process.env[AI_AGENT_ENV_VAR];
  }
  if (v === undefined || v === '') {
    return '';
  }
  // slice is a no-op when the value is already within the cap.
  return sanitize(v).slice(0, MAX_AGENT_FALLBACK_LEN);
}

/**
 * Checks environment variables for known AI agents and returns the
 * detected product name.
 *
 * Explicit product-specific env vars always take precedence over the
 * generic `AGENT` and `AI_AGENT` env vars, so that an explicit signal
 * (e.g. `CLAUDECODE=1`) always wins over a conflicting `AGENT=<name>`
 * value.
 *
 * Returns:
 *
 * - The product name when exactly one known env var is set.
 * - `"multiple"` when multiple known env vars are set. Agent env vars
 *   can be stacked when one agent invokes another as a subagent (e.g.
 *   Claude Code spawning a Cursor CLI subprocess), so the child process
 *   inherits env vars from multiple layers.
 * - A sanitized, length-capped value from `AGENT` or `AI_AGENT` when no
 *   known env var is set (see {@link agentEnvFallback}).
 * - `""` when nothing is set.
 */
export function lookupAgentProvider(): string {
  const matches: string[] = [];
  for (const a of KNOWN_AGENTS) {
    if (a.envVar in process.env) {
      matches.push(a.product);
    }
  }
  if (matches.length === 1) {
    return matches[0];
  }
  if (matches.length > 1) {
    return 'multiple';
  }
  return agentEnvFallback();
}

let cached: string | undefined;

/**
 * Returns the detected AI agent name, cached for the process lifetime.
 *
 * Returns one of:
 *
 * - The known product name when exactly one agent is detected via
 *   explicit env matchers.
 * - `"multiple"` when multiple explicit matchers fire for different
 *   agents (typically nested agents, e.g. Cursor CLI running as a
 *   Claude Code subagent).
 * - A sanitized, length-capped value from `AGENT` or `AI_AGENT` when no
 *   explicit matcher fired (see {@link agentEnvFallback}).
 * - `""` when no agent is detected.
 */
export function agentProvider(): string {
  cached ??= lookupAgentProvider();
  return cached;
}

/**
 * Clears the cached agent detection result so that the next call to
 * {@link agentProvider} re-evaluates the environment. Exported for
 * testing only.
 */
export function clearAgentCache(): void {
  cached = undefined;
}
