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

interface KnownAgent {
  readonly envVar: string;
  readonly product: string;
}

// Name of the agents.md standard env var. When set to a value that no
// known agent recognizes, detection falls back to "unknown".
const AGENT_ENV_VAR = 'AGENT';

// Canonical list of AI coding agents. Keep this list in sync with the
// Go, Java, and Python SDKs. Agents are listed alphabetically by product
// name.
const KNOWN_AGENTS: readonly KnownAgent[] = [
  // The amp agent also sets AGENT=amp, handled by the central fallback.
  {envVar: 'AMP_CURRENT_THREAD_ID', product: 'amp'},
  {envVar: 'ANTIGRAVITY_AGENT', product: 'antigravity'},
  {envVar: 'AUGMENT_AGENT', product: 'augment'},
  {envVar: 'CLAUDECODE', product: 'claude-code'},
  {envVar: 'CLINE_ACTIVE', product: 'cline'},
  {envVar: 'CODEX_CI', product: 'codex'},
  {envVar: 'COPILOT_CLI', product: 'copilot-cli'},
  // VS Code Copilot terminal, best-effort heuristic, not officially
  // identified.
  {envVar: 'COPILOT_MODEL', product: 'copilot-vscode'},
  {envVar: 'CURSOR_AGENT', product: 'cursor'},
  {envVar: 'GEMINI_CLI', product: 'gemini-cli'},
  // The goose agent also sets AGENT=goose, handled by the central
  // fallback.
  {envVar: 'GOOSE_TERMINAL', product: 'goose'},
  {envVar: 'KIRO', product: 'kiro'},
  {envVar: 'OPENCLAW_SHELL', product: 'openclaw'},
  {envVar: 'OPENCODE', product: 'opencode'},
  {envVar: 'WINDSURF_AGENT', product: 'windsurf'},
];

function agentEnvFallback(): string {
  const v = process.env[AGENT_ENV_VAR];
  if (v === undefined || v === '') {
    return '';
  }
  if (KNOWN_AGENTS.some(a => a.product === v)) {
    return v;
  }
  return 'unknown';
}

/**
 * Checks environment variables for known AI agents and returns the
 * detected product name.
 *
 * Explicit product-specific env vars always take precedence over the
 * generic agents.md `AGENT` env var. `AGENT` is consulted only as a
 * fallback when no explicit matcher fires, so that an explicit signal
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
 * - When no known env var is set and `AGENT` is a non-empty value: the
 *   value itself if it names a known product, otherwise `"unknown"`.
 * - `""` when nothing is set.
 */
export function lookupAgentProvider(): string {
  let matches: string[] = [];
  for (const a of KNOWN_AGENTS) {
    if (a.envVar in process.env) {
      matches.push(a.product);
    }
  }
  // Known BYOK false positive: Copilot CLI users often set COPILOT_MODEL
  // alongside COPILOT_CLI. Treat the pair as a single copilot-cli signal
  // rather than a stacked multi-agent setup.
  if (matches.includes('copilot-cli') && matches.includes('copilot-vscode')) {
    matches = matches.filter(m => m !== 'copilot-vscode');
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
 *   explicit env matchers, or when `AGENT` is set to a known product
 *   name and no explicit matcher fired.
 * - `"multiple"` when multiple explicit matchers fire for different
 *   agents (typically nested agents, e.g. Cursor CLI running as a
 *   Claude Code subagent).
 * - `"unknown"` when no explicit matcher fired and `AGENT` is set to a
 *   value that is not a known product name.
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
