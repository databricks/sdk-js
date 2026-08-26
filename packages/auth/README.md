# Databricks SDK Authentication for JavaScript

> [!NOTE]
>
> ## Beta
>
> **This SDK is in Beta and is supported for production use cases.** Interfaces might still change slightly before GA (e.g. name standardization and minor ergonomic tweaks). We are keen to hear feedback from early adopters — please [file issues](https://github.com/databricks/sdk-js/issues), and we will address them.

## Group role assumption

OAuth M2M credentials can request a token that assumes a group role:

```ts
import {newM2mCredentials} from '@databricks/sdk-auth/credentials';

const credentials = newM2mCredentials({
  host: 'https://my-workspace.cloud.databricks.com',
  clientId: process.env.DATABRICKS_CLIENT_ID ?? '',
  clientSecret: process.env.DATABRICKS_CLIENT_SECRET ?? '',
  groupId: 'group-123',
});
```

OIDC token exchange accepts the same `groupId` option through
`newDatabricksOidcTokenProvider`.

The default credential chain reads the group from `DATABRICKS_GROUP_ID` or
`group_id` in a Databricks configuration profile. With a group configured, it
uses OAuth M2M and skips authentication methods that cannot assume a group,
such as PAT and Databricks CLI authentication. Selecting one of those methods
explicitly with `auth_type` returns an error.

Client options do not have a `groupId` field. A group supplied by a profile or
the environment affects only default credentials; it does not alter explicitly
provided credentials. The group is sent as `assume_group` only when obtaining
an OAuth token and is not added as a header to ordinary API requests.
