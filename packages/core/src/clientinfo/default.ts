import {ClientInfo, sanitize} from './clientinfo';
import {MODULE_NAME, VERSION, getBase} from './base';
import {agentProvider} from './agent';

interface EnvCheck {
  readonly name: string;
  readonly expectedValue: string;
}

interface CicdDef {
  readonly name: string;
  readonly envVars: readonly EnvCheck[];
}

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

function detectCicd(): string {
  for (const p of CICD_PROVIDERS) {
    const allMatch = p.envVars.every(ev => {
      const v = process.env[ev.name];
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
  const pairs: {key: string; value: string}[] = [
    {key: MODULE_NAME, value: VERSION},
    {key: 'node', value: CACHED_NODE_VERSION},
    {key: 'os', value: process.platform},
    ...getBase().segments,
  ];

  // DATABRICKS_SDK_UPSTREAM and DATABRICKS_SDK_UPSTREAM_VERSION are set
  // by tools built on top of this SDK (e.g. Terraform provider, Pulumi)
  // to identify themselves as the upstream product. Both must be present
  // for the upstream segment to be included.
  const upstream = process.env.DATABRICKS_SDK_UPSTREAM;
  if (upstream !== undefined) {
    const upstreamVersion = process.env.DATABRICKS_SDK_UPSTREAM_VERSION;
    if (upstreamVersion !== undefined) {
      pairs.push(
        {key: 'upstream', value: sanitize(upstream)},
        {key: 'upstream-version', value: sanitize(upstreamVersion)}
      );
    }
  }

  const cicd = detectCicd();
  if (cicd !== '') {
    pairs.push({key: 'cicd', value: cicd});
  }

  const runtime = process.env.DATABRICKS_RUNTIME_VERSION;
  if (runtime !== undefined && runtime !== '') {
    pairs.push({key: 'runtime', value: sanitize(runtime)});
  }

  const agent = agentProvider();
  if (agent !== '') {
    pairs.push({key: 'agent', value: agent});
  }

  return ClientInfo.EMPTY.with(...pairs);
}
