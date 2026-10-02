# Databricks SDK Authentication for JavaScript

> [!NOTE]
>
> ## Beta
>
> **This SDK is in Beta and is supported for production use cases.** Interfaces might still change slightly before GA (e.g. name standardization and minor ergonomic tweaks). We are keen to hear feedback from early adopters — please [file issues](https://github.com/databricks/sdk-js/issues), and we will address them.

## Azure CLI Authentication

In Node.js, authenticate to Azure Databricks with an existing `az login` session:

```typescript
import {newAzureCliCredentials} from '@databricks/sdk-auth/credentials';

const credentials = newAzureCliCredentials();
```

Pass `credentials` to the client's options alongside the Azure Databricks host.
To select a tenant or subscription, or limit the CLI process timeout:

```typescript
const credentials = newAzureCliCredentials({
  tenantId: '<tenant-id>',
  subscription: '<subscription-name-or-id>',
  processTimeoutInMs: 15_000,
});
```

This uses Microsoft's [`AzureCliCredential`][azure-cli-credential]
to obtain Microsoft Entra tokens for Azure Databricks.
Azure CLI authentication must be passed explicitly; it is not part of the
default credential chain and is not available in browsers.

[azure-cli-credential]:
  https://learn.microsoft.com/en-us/javascript/api/@azure/identity/azureclicredential
