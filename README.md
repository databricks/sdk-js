# Databricks Modular SDKs for JavaScript

> [!WARNING]
>
> ## PREVIEW - NOT FOR PRODUCTION USE
>
> **This SDK is in preview and is subject to change without notice.**
>
> - **Do NOT use in production environments**
> - **Breaking changes may occur at any time**
> - **APIs are experimental and unstable**
> - **Use for development and testing only**

The Databricks SDKs for JavaScript provide typed clients for the Databricks REST API. They have a **modular architecture**, with a separate npm package for each API (for example, `@databricks/sdk-postgres`).

## Table of Contents

- [Installation](#installation)
- [Authentication](#authentication)
- [Example](#example)
- [Packages](#packages)
  - [Shared packages](#shared-packages)
- [License](#license)

## Installation

Install the package for each API you need. For example, to work with Postgres:

```bash
npm install @databricks/sdk-postgres
```

## Authentication

By default, a client reads its configuration (host and credentials) from a Databricks configuration profile (`~/.databrickscfg`) and `DATABRICKS_*` environment variables. With those set, no credentials need to be passed in code:

```typescript
import {PostgresClient} from '@databricks/sdk-postgres/v1';

// Resolves the host and credentials from the DEFAULT profile and DATABRICKS_* env vars.
const client = new PostgresClient({});
```

To configure credentials explicitly, import a helper from `@databricks/sdk-auth/credentials` and pass it as `credentials`:

```typescript
import {PostgresClient} from '@databricks/sdk-postgres/v1';
import {newPatCredentials} from '@databricks/sdk-auth/credentials';

const client = new PostgresClient({
  host: 'https://example.cloud.databricks.com',
  credentials: newPatCredentials('<personal-access-token>'),
});
```

## Example

The following lists your Postgres projects, using the default authentication described above. List methods expose an `Iter` variant that pages through results transparently as you iterate:

```typescript
import {PostgresClient} from '@databricks/sdk-postgres/v1';

const client = new PostgresClient({});

for await (const project of client.listProjectsIter({})) {
  console.log(project.name);
}
```

More runnable examples (pagination, long-running operations, error handling, and authentication strategies) are available in [`packages/examples`](packages/examples).

## Packages

Each Databricks API is published as a separate package named `@databricks/sdk-<api>`. Import its client from the package's versioned subpath — for example, `@databricks/sdk-postgres/v1` exports `PostgresClient`.

| Package                                                                                                            | Version                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@databricks/sdk-accessmanagement](https://www.npmjs.com/package/@databricks/sdk-accessmanagement)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-accessmanagement)](https://www.npmjs.com/package/@databricks/sdk-accessmanagement)                 |
| [@databricks/sdk-alerts](https://www.npmjs.com/package/@databricks/sdk-alerts)                                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-alerts)](https://www.npmjs.com/package/@databricks/sdk-alerts)                                     |
| [@databricks/sdk-apps](https://www.npmjs.com/package/@databricks/sdk-apps)                                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-apps)](https://www.npmjs.com/package/@databricks/sdk-apps)                                         |
| [@databricks/sdk-authentication](https://www.npmjs.com/package/@databricks/sdk-authentication)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-authentication)](https://www.npmjs.com/package/@databricks/sdk-authentication)                     |
| [@databricks/sdk-budgetpolicy](https://www.npmjs.com/package/@databricks/sdk-budgetpolicy)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-budgetpolicy)](https://www.npmjs.com/package/@databricks/sdk-budgetpolicy)                         |
| [@databricks/sdk-budgets](https://www.npmjs.com/package/@databricks/sdk-budgets)                                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-budgets)](https://www.npmjs.com/package/@databricks/sdk-budgets)                                   |
| [@databricks/sdk-cleanrooms](https://www.npmjs.com/package/@databricks/sdk-cleanrooms)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-cleanrooms)](https://www.npmjs.com/package/@databricks/sdk-cleanrooms)                             |
| [@databricks/sdk-clusterlibraries](https://www.npmjs.com/package/@databricks/sdk-clusterlibraries)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-clusterlibraries)](https://www.npmjs.com/package/@databricks/sdk-clusterlibraries)                 |
| [@databricks/sdk-clusterpolicies](https://www.npmjs.com/package/@databricks/sdk-clusterpolicies)                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-clusterpolicies)](https://www.npmjs.com/package/@databricks/sdk-clusterpolicies)                   |
| [@databricks/sdk-clusters](https://www.npmjs.com/package/@databricks/sdk-clusters)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-clusters)](https://www.npmjs.com/package/@databricks/sdk-clusters)                                 |
| [@databricks/sdk-commandexecution](https://www.npmjs.com/package/@databricks/sdk-commandexecution)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-commandexecution)](https://www.npmjs.com/package/@databricks/sdk-commandexecution)                 |
| [@databricks/sdk-customllms](https://www.npmjs.com/package/@databricks/sdk-customllms)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-customllms)](https://www.npmjs.com/package/@databricks/sdk-customllms)                             |
| [@databricks/sdk-database](https://www.npmjs.com/package/@databricks/sdk-database)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-database)](https://www.npmjs.com/package/@databricks/sdk-database)                                 |
| [@databricks/sdk-dataclassification](https://www.npmjs.com/package/@databricks/sdk-dataclassification)             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-dataclassification)](https://www.npmjs.com/package/@databricks/sdk-dataclassification)             |
| [@databricks/sdk-dataquality](https://www.npmjs.com/package/@databricks/sdk-dataquality)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-dataquality)](https://www.npmjs.com/package/@databricks/sdk-dataquality)                           |
| [@databricks/sdk-disasterrecovery](https://www.npmjs.com/package/@databricks/sdk-disasterrecovery)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-disasterrecovery)](https://www.npmjs.com/package/@databricks/sdk-disasterrecovery)                 |
| [@databricks/sdk-environments](https://www.npmjs.com/package/@databricks/sdk-environments)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-environments)](https://www.npmjs.com/package/@databricks/sdk-environments)                         |
| [@databricks/sdk-experiments](https://www.npmjs.com/package/@databricks/sdk-experiments)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-experiments)](https://www.npmjs.com/package/@databricks/sdk-experiments)                           |
| [@databricks/sdk-features](https://www.npmjs.com/package/@databricks/sdk-features)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-features)](https://www.npmjs.com/package/@databricks/sdk-features)                                 |
| [@databricks/sdk-featurestore](https://www.npmjs.com/package/@databricks/sdk-featurestore)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-featurestore)](https://www.npmjs.com/package/@databricks/sdk-featurestore)                         |
| [@databricks/sdk-files](https://www.npmjs.com/package/@databricks/sdk-files)                                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-files)](https://www.npmjs.com/package/@databricks/sdk-files)                                       |
| [@databricks/sdk-forecasting](https://www.npmjs.com/package/@databricks/sdk-forecasting)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-forecasting)](https://www.npmjs.com/package/@databricks/sdk-forecasting)                           |
| [@databricks/sdk-genie](https://www.npmjs.com/package/@databricks/sdk-genie)                                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-genie)](https://www.npmjs.com/package/@databricks/sdk-genie)                                       |
| [@databricks/sdk-gitcredentials](https://www.npmjs.com/package/@databricks/sdk-gitcredentials)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-gitcredentials)](https://www.npmjs.com/package/@databricks/sdk-gitcredentials)                     |
| [@databricks/sdk-globalinitscripts](https://www.npmjs.com/package/@databricks/sdk-globalinitscripts)               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-globalinitscripts)](https://www.npmjs.com/package/@databricks/sdk-globalinitscripts)               |
| [@databricks/sdk-instancepools](https://www.npmjs.com/package/@databricks/sdk-instancepools)                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-instancepools)](https://www.npmjs.com/package/@databricks/sdk-instancepools)                       |
| [@databricks/sdk-instanceprofiles](https://www.npmjs.com/package/@databricks/sdk-instanceprofiles)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-instanceprofiles)](https://www.npmjs.com/package/@databricks/sdk-instanceprofiles)                 |
| [@databricks/sdk-jobs](https://www.npmjs.com/package/@databricks/sdk-jobs)                                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-jobs)](https://www.npmjs.com/package/@databricks/sdk-jobs)                                         |
| [@databricks/sdk-keyconfigurations](https://www.npmjs.com/package/@databricks/sdk-keyconfigurations)               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-keyconfigurations)](https://www.npmjs.com/package/@databricks/sdk-keyconfigurations)               |
| [@databricks/sdk-knowledgeassistants](https://www.npmjs.com/package/@databricks/sdk-knowledgeassistants)           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-knowledgeassistants)](https://www.npmjs.com/package/@databricks/sdk-knowledgeassistants)           |
| [@databricks/sdk-lakeview](https://www.npmjs.com/package/@databricks/sdk-lakeview)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-lakeview)](https://www.npmjs.com/package/@databricks/sdk-lakeview)                                 |
| [@databricks/sdk-logdelivery](https://www.npmjs.com/package/@databricks/sdk-logdelivery)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-logdelivery)](https://www.npmjs.com/package/@databricks/sdk-logdelivery)                           |
| [@databricks/sdk-marketplaces](https://www.npmjs.com/package/@databricks/sdk-marketplaces)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-marketplaces)](https://www.npmjs.com/package/@databricks/sdk-marketplaces)                         |
| [@databricks/sdk-modelregistry](https://www.npmjs.com/package/@databricks/sdk-modelregistry)                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-modelregistry)](https://www.npmjs.com/package/@databricks/sdk-modelregistry)                       |
| [@databricks/sdk-modelserving](https://www.npmjs.com/package/@databricks/sdk-modelserving)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-modelserving)](https://www.npmjs.com/package/@databricks/sdk-modelserving)                         |
| [@databricks/sdk-modelservingquery](https://www.npmjs.com/package/@databricks/sdk-modelservingquery)               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-modelservingquery)](https://www.npmjs.com/package/@databricks/sdk-modelservingquery)               |
| [@databricks/sdk-networking](https://www.npmjs.com/package/@databricks/sdk-networking)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-networking)](https://www.npmjs.com/package/@databricks/sdk-networking)                             |
| [@databricks/sdk-notificationdestinations](https://www.npmjs.com/package/@databricks/sdk-notificationdestinations) | [![npm](https://img.shields.io/npm/v/@databricks/sdk-notificationdestinations)](https://www.npmjs.com/package/@databricks/sdk-notificationdestinations) |
| [@databricks/sdk-oauth](https://www.npmjs.com/package/@databricks/sdk-oauth)                                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-oauth)](https://www.npmjs.com/package/@databricks/sdk-oauth)                                       |
| [@databricks/sdk-pipelines](https://www.npmjs.com/package/@databricks/sdk-pipelines)                               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-pipelines)](https://www.npmjs.com/package/@databricks/sdk-pipelines)                               |
| [@databricks/sdk-policyfamilies](https://www.npmjs.com/package/@databricks/sdk-policyfamilies)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-policyfamilies)](https://www.npmjs.com/package/@databricks/sdk-policyfamilies)                     |
| [@databricks/sdk-postgres](https://www.npmjs.com/package/@databricks/sdk-postgres)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-postgres)](https://www.npmjs.com/package/@databricks/sdk-postgres)                                 |
| [@databricks/sdk-queries](https://www.npmjs.com/package/@databricks/sdk-queries)                                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-queries)](https://www.npmjs.com/package/@databricks/sdk-queries)                                   |
| [@databricks/sdk-queryhistory](https://www.npmjs.com/package/@databricks/sdk-queryhistory)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-queryhistory)](https://www.npmjs.com/package/@databricks/sdk-queryhistory)                         |
| [@databricks/sdk-repos](https://www.npmjs.com/package/@databricks/sdk-repos)                                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-repos)](https://www.npmjs.com/package/@databricks/sdk-repos)                                       |
| [@databricks/sdk-scim](https://www.npmjs.com/package/@databricks/sdk-scim)                                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-scim)](https://www.npmjs.com/package/@databricks/sdk-scim)                                         |
| [@databricks/sdk-secrets](https://www.npmjs.com/package/@databricks/sdk-secrets)                                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-secrets)](https://www.npmjs.com/package/@databricks/sdk-secrets)                                   |
| [@databricks/sdk-settings](https://www.npmjs.com/package/@databricks/sdk-settings)                                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-settings)](https://www.npmjs.com/package/@databricks/sdk-settings)                                 |
| [@databricks/sdk-sharing](https://www.npmjs.com/package/@databricks/sdk-sharing)                                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-sharing)](https://www.npmjs.com/package/@databricks/sdk-sharing)                                   |
| [@databricks/sdk-statementexecution](https://www.npmjs.com/package/@databricks/sdk-statementexecution)             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-statementexecution)](https://www.npmjs.com/package/@databricks/sdk-statementexecution)             |
| [@databricks/sdk-storageconfigurations](https://www.npmjs.com/package/@databricks/sdk-storageconfigurations)       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-storageconfigurations)](https://www.npmjs.com/package/@databricks/sdk-storageconfigurations)       |
| [@databricks/sdk-supervisoragents](https://www.npmjs.com/package/@databricks/sdk-supervisoragents)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-supervisoragents)](https://www.npmjs.com/package/@databricks/sdk-supervisoragents)                 |
| [@databricks/sdk-tagassignments](https://www.npmjs.com/package/@databricks/sdk-tagassignments)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-tagassignments)](https://www.npmjs.com/package/@databricks/sdk-tagassignments)                     |
| [@databricks/sdk-tagpolicies](https://www.npmjs.com/package/@databricks/sdk-tagpolicies)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-tagpolicies)](https://www.npmjs.com/package/@databricks/sdk-tagpolicies)                           |
| [@databricks/sdk-tokenmanagement](https://www.npmjs.com/package/@databricks/sdk-tokenmanagement)                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-tokenmanagement)](https://www.npmjs.com/package/@databricks/sdk-tokenmanagement)                   |
| [@databricks/sdk-tokens](https://www.npmjs.com/package/@databricks/sdk-tokens)                                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-tokens)](https://www.npmjs.com/package/@databricks/sdk-tokens)                                     |
| [@databricks/sdk-uc-abacpolicies](https://www.npmjs.com/package/@databricks/sdk-uc-abacpolicies)                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-abacpolicies)](https://www.npmjs.com/package/@databricks/sdk-uc-abacpolicies)                   |
| [@databricks/sdk-uc-artifactallowlists](https://www.npmjs.com/package/@databricks/sdk-uc-artifactallowlists)       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-artifactallowlists)](https://www.npmjs.com/package/@databricks/sdk-uc-artifactallowlists)       |
| [@databricks/sdk-uc-catalogs](https://www.npmjs.com/package/@databricks/sdk-uc-catalogs)                           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-catalogs)](https://www.npmjs.com/package/@databricks/sdk-uc-catalogs)                           |
| [@databricks/sdk-uc-connections](https://www.npmjs.com/package/@databricks/sdk-uc-connections)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-connections)](https://www.npmjs.com/package/@databricks/sdk-uc-connections)                     |
| [@databricks/sdk-uc-credentials](https://www.npmjs.com/package/@databricks/sdk-uc-credentials)                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-credentials)](https://www.npmjs.com/package/@databricks/sdk-uc-credentials)                     |
| [@databricks/sdk-uc-entitytagassignments](https://www.npmjs.com/package/@databricks/sdk-uc-entitytagassignments)   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-entitytagassignments)](https://www.npmjs.com/package/@databricks/sdk-uc-entitytagassignments)   |
| [@databricks/sdk-uc-externallineage](https://www.npmjs.com/package/@databricks/sdk-uc-externallineage)             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-externallineage)](https://www.npmjs.com/package/@databricks/sdk-uc-externallineage)             |
| [@databricks/sdk-uc-externallocations](https://www.npmjs.com/package/@databricks/sdk-uc-externallocations)         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-externallocations)](https://www.npmjs.com/package/@databricks/sdk-uc-externallocations)         |
| [@databricks/sdk-uc-externalmetadata](https://www.npmjs.com/package/@databricks/sdk-uc-externalmetadata)           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-externalmetadata)](https://www.npmjs.com/package/@databricks/sdk-uc-externalmetadata)           |
| [@databricks/sdk-uc-functions](https://www.npmjs.com/package/@databricks/sdk-uc-functions)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-functions)](https://www.npmjs.com/package/@databricks/sdk-uc-functions)                         |
| [@databricks/sdk-uc-grants](https://www.npmjs.com/package/@databricks/sdk-uc-grants)                               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-grants)](https://www.npmjs.com/package/@databricks/sdk-uc-grants)                               |
| [@databricks/sdk-uc-metastores](https://www.npmjs.com/package/@databricks/sdk-uc-metastores)                       | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-metastores)](https://www.npmjs.com/package/@databricks/sdk-uc-metastores)                       |
| [@databricks/sdk-uc-onlinetables](https://www.npmjs.com/package/@databricks/sdk-uc-onlinetables)                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-onlinetables)](https://www.npmjs.com/package/@databricks/sdk-uc-onlinetables)                   |
| [@databricks/sdk-uc-registeredmodels](https://www.npmjs.com/package/@databricks/sdk-uc-registeredmodels)           | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-registeredmodels)](https://www.npmjs.com/package/@databricks/sdk-uc-registeredmodels)           |
| [@databricks/sdk-uc-resourcequotas](https://www.npmjs.com/package/@databricks/sdk-uc-resourcequotas)               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-resourcequotas)](https://www.npmjs.com/package/@databricks/sdk-uc-resourcequotas)               |
| [@databricks/sdk-uc-rfa](https://www.npmjs.com/package/@databricks/sdk-uc-rfa)                                     | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-rfa)](https://www.npmjs.com/package/@databricks/sdk-uc-rfa)                                     |
| [@databricks/sdk-uc-schemas](https://www.npmjs.com/package/@databricks/sdk-uc-schemas)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-schemas)](https://www.npmjs.com/package/@databricks/sdk-uc-schemas)                             |
| [@databricks/sdk-uc-secrets](https://www.npmjs.com/package/@databricks/sdk-uc-secrets)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-secrets)](https://www.npmjs.com/package/@databricks/sdk-uc-secrets)                             |
| [@databricks/sdk-uc-systemschemas](https://www.npmjs.com/package/@databricks/sdk-uc-systemschemas)                 | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-systemschemas)](https://www.npmjs.com/package/@databricks/sdk-uc-systemschemas)                 |
| [@databricks/sdk-uc-tables](https://www.npmjs.com/package/@databricks/sdk-uc-tables)                               | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-tables)](https://www.npmjs.com/package/@databricks/sdk-uc-tables)                               |
| [@databricks/sdk-uc-volumes](https://www.npmjs.com/package/@databricks/sdk-uc-volumes)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-volumes)](https://www.npmjs.com/package/@databricks/sdk-uc-volumes)                             |
| [@databricks/sdk-uc-workspacebindings](https://www.npmjs.com/package/@databricks/sdk-uc-workspacebindings)         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-uc-workspacebindings)](https://www.npmjs.com/package/@databricks/sdk-uc-workspacebindings)         |
| [@databricks/sdk-usagedashboards](https://www.npmjs.com/package/@databricks/sdk-usagedashboards)                   | [![npm](https://img.shields.io/npm/v/@databricks/sdk-usagedashboards)](https://www.npmjs.com/package/@databricks/sdk-usagedashboards)                   |
| [@databricks/sdk-vectorsearch](https://www.npmjs.com/package/@databricks/sdk-vectorsearch)                         | [![npm](https://img.shields.io/npm/v/@databricks/sdk-vectorsearch)](https://www.npmjs.com/package/@databricks/sdk-vectorsearch)                         |
| [@databricks/sdk-warehouses](https://www.npmjs.com/package/@databricks/sdk-warehouses)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-warehouses)](https://www.npmjs.com/package/@databricks/sdk-warehouses)                             |
| [@databricks/sdk-workspaces](https://www.npmjs.com/package/@databricks/sdk-workspaces)                             | [![npm](https://img.shields.io/npm/v/@databricks/sdk-workspaces)](https://www.npmjs.com/package/@databricks/sdk-workspaces)                             |

### Shared packages

Three packages are shared by every API client and provide the pieces you import directly:

- `@databricks/sdk-core` — the HTTP client, configuration-profile resolution, logging, and API error types (`ApiError`).
- `@databricks/sdk-auth` — credential providers (`newPatCredentials`, `newU2mCredentials`, `newM2mCredentials`) and the default credential chain.
- `@databricks/sdk-options` — the option types passed to clients and calls (`ClientOptions`, `CallOptions`).

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
