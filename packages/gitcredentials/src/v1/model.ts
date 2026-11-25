// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateCredentialsRequest {
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including
   * Microsoft Entra ID authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket
   * Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and `awsCodeCommit`.
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /**
   * The personal access token used to authenticate to the corresponding Git provider.
   * For certain providers, support may exist for other types of scoped access tokens.
   * [Learn more](https://docs.databricks.com/repos/get-access-tokens-from-git-provider.html).
   */
  personalAccessToken?: string | undefined;
  /** The ID of the service principal for which the credential will be created. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
  /**
   * The name of the Git credential, used for identification and ease of lookup. It must not
   * exceed 100 characters.
   */
  name?: string | undefined;
  /**
   * Set to true to make the new credential the default for its Git provider, replacing the
   * current default. The first credential created for a provider becomes the default
   * regardless of this value.
   */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface CreateCredentialsResponse {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /** The Git provider associated with the credential. */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** The name of the Git credential, used for identification and ease of lookup. */
  name?: string | undefined;
  /**
   * Whether this credential is the default for its Git provider. The default credential is the
   * fallback that is used when no specific credential is selected.
   */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

/**
 * A Git credential that Databricks uses to authenticate to a Git provider on behalf of a user
 * or service principal. Each user has one default credential per Git provider, which is used
 * when no specific credential is selected.
 */
export interface Credential {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /**
   * The Git provider associated with the credential. One of `gitHub`, `bitbucketCloud`,
   * `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including Microsoft Entra ID
   * authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket Data Center),
   * `gitLabEnterpriseEdition` (GitLab Self-Managed), or `awsCodeCommit`.
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** The name of the Git credential, used for identification and ease of lookup. */
  name?: string | undefined;
  /**
   * Whether this credential is the default for its Git provider. The default credential is the
   * fallback that is used when no specific credential is selected. See
   * https://docs.databricks.com/aws/en/repos/repos-setup#how-default-credentials-work.
   */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface DeleteCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /** The ID of the service principal whose credential will be deleted. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteCredentialsResponse {}

export interface GetCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /** The ID of the service principal whose credential will be returned. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

export interface GetCredentialsResponse {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /** The Git provider associated with the credential. */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** The name of the Git credential, used for identification and ease of lookup. */
  name?: string | undefined;
  /**
   * Whether this credential is the default for its Git provider. The default credential is the
   * fallback that is used when no specific credential is selected.
   */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface ListCredentialsRequest {
  /** The ID of the service principal whose credentials will be listed. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

export interface ListCredentialsResponse {
  /** List of credentials. */
  credentials?: Credential[] | undefined;
}

export interface UpdateCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /**
   * The personal access token used to authenticate to the corresponding Git provider.
   * For certain providers, support may exist for other types of scoped access tokens.
   * [Learn more](https://docs.databricks.com/repos/get-access-tokens-from-git-provider.html).
   */
  personalAccessToken?: string | undefined;
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including
   * Microsoft Entra ID authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket
   * Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and `awsCodeCommit`.
   * Must match the Git provider of the existing credential; the provider cannot be changed.
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** The ID of the service principal whose credentials will be modified. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
  /**
   * The name of the Git credential, used for identification and ease of lookup. It must not
   * exceed 100 characters.
   */
  name?: string | undefined;
  /**
   * Set to true to make this credential the default for its Git provider, replacing the
   * current default. Cannot be set to false; make another credential the default instead.
   */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateCredentialsResponse {}

export const unmarshalCreateCredentialsResponseSchema: z.ZodType<CreateCredentialsResponse> =
  z
    .object({
      credential_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      git_provider: z.string().optional(),
      git_username: z.string().optional(),
      name: z.string().optional(),
      is_default_for_provider: z.boolean().optional(),
      git_email: z.string().optional(),
    })
    .transform(d => ({
      credentialId: d.credential_id,
      gitProvider: d.git_provider,
      gitUsername: d.git_username,
      name: d.name,
      isDefaultForProvider: d.is_default_for_provider,
      gitEmail: d.git_email,
    }));

export const unmarshalCredentialSchema: z.ZodType<Credential> = z
  .object({
    credential_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    git_provider: z.string().optional(),
    git_username: z.string().optional(),
    name: z.string().optional(),
    is_default_for_provider: z.boolean().optional(),
    git_email: z.string().optional(),
  })
  .transform(d => ({
    credentialId: d.credential_id,
    gitProvider: d.git_provider,
    gitUsername: d.git_username,
    name: d.name,
    isDefaultForProvider: d.is_default_for_provider,
    gitEmail: d.git_email,
  }));

export const unmarshalDeleteCredentialsResponseSchema: z.ZodType<DeleteCredentialsResponse> =
  z.object({});

export const unmarshalGetCredentialsResponseSchema: z.ZodType<GetCredentialsResponse> =
  z
    .object({
      credential_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      git_provider: z.string().optional(),
      git_username: z.string().optional(),
      name: z.string().optional(),
      is_default_for_provider: z.boolean().optional(),
      git_email: z.string().optional(),
    })
    .transform(d => ({
      credentialId: d.credential_id,
      gitProvider: d.git_provider,
      gitUsername: d.git_username,
      name: d.name,
      isDefaultForProvider: d.is_default_for_provider,
      gitEmail: d.git_email,
    }));

export const unmarshalListCredentialsResponseSchema: z.ZodType<ListCredentialsResponse> =
  z
    .object({
      credentials: z.array(z.lazy(() => unmarshalCredentialSchema)).optional(),
    })
    .transform(d => ({
      credentials: d.credentials,
    }));

export const unmarshalUpdateCredentialsResponseSchema: z.ZodType<UpdateCredentialsResponse> =
  z.object({});

export const marshalCreateCredentialsRequestSchema: z.ZodType = z
  .object({
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    personalAccessToken: z.string().optional(),
    principalId: z.bigint().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    personal_access_token: d.personalAccessToken,
    principal_id: d.principalId,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalCreateCredentialsResponseSchema: z.ZodType = z
  .object({
    credentialId: z.bigint().optional(),
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    credential_id: d.credentialId,
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalCredentialSchema: z.ZodType = z
  .object({
    credentialId: z.bigint().optional(),
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    credential_id: d.credentialId,
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalDeleteCredentialsRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    principalId: z.bigint().optional(),
  })
  .transform(d => ({
    id: d.id,
    principal_id: d.principalId,
  }));

export const marshalDeleteCredentialsResponseSchema: z.ZodType = z.object({});

export const marshalGetCredentialsRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    principalId: z.bigint().optional(),
  })
  .transform(d => ({
    id: d.id,
    principal_id: d.principalId,
  }));

export const marshalGetCredentialsResponseSchema: z.ZodType = z
  .object({
    credentialId: z.bigint().optional(),
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    credential_id: d.credentialId,
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalListCredentialsRequestSchema: z.ZodType = z
  .object({
    principalId: z.bigint().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
  }));

export const marshalListCredentialsResponseSchema: z.ZodType = z
  .object({
    credentials: z.array(z.lazy(() => marshalCredentialSchema)).optional(),
  })
  .transform(d => ({
    credentials: d.credentials,
  }));

export const marshalUpdateCredentialsRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    personalAccessToken: z.string().optional(),
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    principalId: z.bigint().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    personal_access_token: d.personalAccessToken,
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    principal_id: d.principalId,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalUpdateCredentialsResponseSchema: z.ZodType = z.object({});
