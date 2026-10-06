# Databricks SDK Authentication for JavaScript

> [!NOTE]
>
> ## Beta
>
> **This SDK is in Beta and is supported for production use cases.** Interfaces might still change slightly before GA (e.g. name standardization and minor ergonomic tweaks). We are keen to hear feedback from early adopters — please [file issues](https://github.com/databricks/sdk-js/issues), and we will address them.

## Supported Authentication

| Method | Default chain | Runtime |
| --- | --- | --- |
| Personal access token (`pat`) | Yes | Node.js, browser |
| OAuth service principal (`oauth-m2m`) | Yes | Node.js, browser |
| Databricks CLI (`databricks-cli`) | Yes | Node.js |
| Environment OIDC (`env-oidc`) | Yes | Node.js |
| File OIDC (`file-oidc`) | Yes | Node.js |
| GitHub Actions OIDC (`github-oidc`) | Explicit composition | Node.js, browser |
| Azure DevOps OIDC (`azure-devops-oidc`) | Explicit composition | Node.js |
| Custom OIDC token (`oidc-token`) | Explicit composition | Node.js, browser |
| Azure CLI (`azure-cli`) | Explicit credentials | Node.js |

The Node.js default chain tries `pat`, `oauth-m2m`, `databricks-cli`, `env-oidc`,
then `file-oidc`. Set `DATABRICKS_AUTH_TYPE` or a profile's `auth_type` to select
one of those five methods. The other rows are not default-chain selectors.
Browser clients require explicit credentials; the browser entry points exclude
environment, file, and CLI access.

Explicit credentials from `@databricks/sdk-auth/credentials`:

- `newPatCredentials(token)`.
- `newM2mCredentials({host, clientId, clientSecret, ...})`.
- `newU2mCredentials({profile, cliPath?})`.
- `newAzureCliCredentials({tenantId?})`.

### OIDC Federation

OIDC federation exchanges an identity provider's ID token for a Databricks
access token. It supports service-principal federation with `clientId`, or
account-wide federation without `clientId`. Federation policies and workspace
permissions must already be configured in Databricks.

For environment or file OIDC, configure the host and explicitly select
`env-oidc` or `file-oidc` when other credentials are also available.

| Environment variable | Profile key | Purpose |
| --- | --- | --- |
| `DATABRICKS_OIDC_TOKEN` | None | Default environment ID token |
| `DATABRICKS_OIDC_TOKEN_ENV` | `oidc_token_env` | Custom ID token variable name |
| `DATABRICKS_OIDC_TOKEN_FILEPATH` | `databricks_id_token_filepath` | ID token file |
| `DATABRICKS_TOKEN_AUDIENCE` | `audience` | Optional ID token audience |

For explicit composition, import ID token providers from
`@databricks/sdk-auth/oidc`:

- `newEnvIdTokenProvider(name)` reads an environment variable on each call.
- `newFileTokenProvider(path)` reads an ID token file on each call.
- `newGithubIdTokenProvider({requestUrl, requestToken, httpClient?})` uses the GitHub
  Actions `ACTIONS_ID_TOKEN_REQUEST_URL` and `ACTIONS_ID_TOKEN_REQUEST_TOKEN`
  values. The workflow needs `permissions: id-token: write`.
- `newAzureDevOpsIdTokenProvider({httpClient?})` reads `SYSTEM_ACCESSTOKEN` and the
  pipeline's `SYSTEM_*` settings. The pipeline must expose its access token.
- `idTokenProviderFn(fn)` adapts a custom ID token source.

Both providers accept an optional `httpClient` from `@databricks/sdk-core/http`
and default to `newFetchHttpClient()`. Azure DevOps also accepts no options.
Compose the ID token provider with
`newDatabricksOidcTokenProvider({host, idTokenProvider, tokenEndpointProvider,
...})`, then wrap it with `newTokenCredentials(name, provider)` from
`@databricks/sdk-auth`. `tokenEndpointProvider` returns the Databricks OAuth
`tokenEndpoint`; the provider obtains an ID token for the configured audience
and sends the OAuth token-exchange grant. These providers fetch tokens on each
call; they do not cache access tokens.

See [Databricks unified authentication][unified-auth]
for authentication type definitions. This package does not implement all
cloud-specific unified-auth methods, such as Azure managed identities, Azure
client-secret authentication, Google credentials, or notebook/context auth.

[unified-auth]: https://docs.databricks.com/aws/en/dev-tools/auth/env-vars
