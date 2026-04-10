import {ClientInfo, sanitize} from './clientinfo';
import {MODULE_NAME, VERSION, getBaseSegments} from './base';

// Abstracts environment variable access for testing.
export type LookupEnv = (key: string) => string | undefined;

interface AgentDef {
  readonly envVar: string;
  readonly product: string;
}

interface EnvCheck {
  readonly name: string;
  readonly expectedValue: string;
}

interface CicdDef {
  readonly name: string;
  readonly envVars: readonly EnvCheck[];
}

const KNOWN_AGENTS: readonly AgentDef[] = [
  {envVar: 'ANTIGRAVITY_AGENT', product: 'antigravity'},
  {envVar: 'CLAUDECODE', product: 'claude-code'},
  {envVar: 'CLINE_ACTIVE', product: 'cline'},
  {envVar: 'CODEX_CI', product: 'codex'},
  {envVar: 'COPILOT_CLI', product: 'copilot-cli'},
  {envVar: 'CURSOR_AGENT', product: 'cursor'},
  {envVar: 'GEMINI_CLI', product: 'gemini-cli'},
  {envVar: 'OPENCODE', product: 'opencode'},
  {envVar: 'OPENCLAW_SHELL', product: 'openclaw'},
];

const CICD_PROVIDERS: readonly CicdDef[] = [
  {
    name: 'github',
    envVars: [{name: 'GITHUB_ACTIONS', expectedValue: 'true'}],
  },
  {
    name: 'gitlab',
    envVars: [{name: 'GITLAB_CI', expectedValue: 'true'}],
  },
  {name: 'jenkins', envVars: [{name: 'JENKINS_URL', expectedValue: ''}]},
  {
    name: 'azure-devops',
    envVars: [{name: 'TF_BUILD', expectedValue: 'True'}],
  },
  {
    name: 'circle',
    envVars: [{name: 'CIRCLECI', expectedValue: 'true'}],
  },
  {name: 'travis', envVars: [{name: 'TRAVIS', expectedValue: 'true'}]},
  {
    name: 'bitbucket',
    envVars: [{name: 'BITBUCKET_BUILD_NUMBER', expectedValue: ''}],
  },
  {
    name: 'google-cloud-build',
    envVars: [
      {name: 'PROJECT_ID', expectedValue: ''},
      {name: 'BUILD_ID', expectedValue: ''},
      {name: 'PROJECT_NUMBER', expectedValue: ''},
      {name: 'LOCATION', expectedValue: ''},
    ],
  },
  {
    name: 'aws-code-build',
    envVars: [{name: 'CODEBUILD_BUILD_ARN', expectedValue: ''}],
  },
  {name: 'tf-cloud', envVars: [{name: 'TFC_RUN_ID', expectedValue: ''}]},
];

/**
 * Returns the name of a single detected AI coding agent, or empty if
 * zero or more than one agent is detected. When multiple agents are
 * present (e.g. Claude from within Cursor), we cannot reliably
 * determine which one initiated the request, so we omit the segment.
 *
 * TODO: support reporting multiple concurrent agents.
 */
export function detectAgent(lookupEnv: LookupEnv): string {
  let detected = '';
  let count = 0;
  for (const a of KNOWN_AGENTS) {
    if (lookupEnv(a.envVar) !== undefined) {
      detected = a.product;
      count++;
      if (count > 1) {
        break;
      }
    }
  }
  return count === 1 ? detected : '';
}

export function detectCicd(lookupEnv: LookupEnv): string {
  for (const p of CICD_PROVIDERS) {
    const allMatch = p.envVars.every(ev => {
      const v = lookupEnv(ev.name);
      return (
        v !== undefined && (ev.expectedValue === '' || v === ev.expectedValue)
      );
    });
    if (allMatch) {
      return p.name;
    }
  }
  return '';
}

/**
 * Converts a Node.js version string (e.g., "v22.0.0") into a bare
 * semver string (e.g., "22.0.0").
 */
export function normalizeNodeVersion(raw: string): string {
  if (!raw.startsWith('v')) {
    return '0.0.0-dev';
  }
  return raw.slice(1);
}

// Computed once at module load because process.version never changes
// during a process lifetime.
export const CACHED_NODE_VERSION = normalizeNodeVersion(process.version);

/**
 * Returns a {@link ClientInfo} populated with SDK metadata, runtime
 * information, segments registered via {@link addToDefault}, and
 * automatically detected environment properties.
 */
export function createDefault(): ClientInfo {
  return defaultWithEnv(key => process.env[key]);
}

export function defaultWithEnv(lookupEnv: LookupEnv): ClientInfo {
  const segments: {key: string; value: string}[] = [
    {key: MODULE_NAME, value: VERSION},
    {key: 'node', value: CACHED_NODE_VERSION},
    {key: 'os', value: process.platform},
    ...getBaseSegments(),
  ];

  // DATABRICKS_SDK_UPSTREAM and DATABRICKS_SDK_UPSTREAM_VERSION are set
  // by tools built on top of this SDK (e.g. Terraform provider, Pulumi)
  // to identify themselves as the upstream product. Both must be present
  // for the upstream segment to be included.
  const upstream = lookupEnv('DATABRICKS_SDK_UPSTREAM');
  if (upstream !== undefined) {
    const upstreamVersion = lookupEnv('DATABRICKS_SDK_UPSTREAM_VERSION');
    if (upstreamVersion !== undefined) {
      segments.push(
        {key: 'upstream', value: sanitize(upstream)},
        {key: 'upstream-version', value: sanitize(upstreamVersion)}
      );
    }
  }

  const cicd = detectCicd(lookupEnv);
  if (cicd !== '') {
    segments.push({key: 'cicd', value: cicd});
  }

  const runtime = lookupEnv('DATABRICKS_RUNTIME_VERSION');
  if (runtime !== undefined && runtime !== '') {
    segments.push({key: 'runtime', value: sanitize(runtime)});
  }

  const agent = detectAgent(lookupEnv);
  if (agent !== '') {
    segments.push({key: 'agent', value: agent});
  }

  return new ClientInfo(segments);
}
