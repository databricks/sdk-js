# NEXT CHANGELOG

## Release v0.52.0

### New Features and Improvements

- Added environment and file OIDC authentication to the default credential chain.
- Added an Azure DevOps OIDC ID token provider.
- Added a GitHub Actions OIDC ID token provider.
- Added explicit Node.js Azure CLI authentication through
  `newAzureCliCredentials`, with an optional tenant ID. Azure CLI authentication
  is not part of the default credential chain.

### Bug Fixes

### Documentation

- Documented supported authentication methods and default-chain availability.
### Internal Changes

### API Changes
