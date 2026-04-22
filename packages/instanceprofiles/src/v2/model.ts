// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface AddInstanceProfile {
  /**
   * By default, <Databricks> validates that it has sufficient permissions to launch
   * instances with the instance profile. This validation uses AWS dry-run mode for
   * the RunInstances API. If validation fails with an error message that does not
   * indicate an IAM related permission issue,
   * (e.g. “Your requested instance type is not supported in your requested availability zone”),
   * you can pass this flag to skip the validation and forcibly add the instance profile.
   */
  skipValidation?: boolean | undefined;
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   *
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface AddInstanceProfile_Response {}

export interface EditInstanceProfile {
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   *
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface EditInstanceProfile_Response {}

export interface InstanceProfile {
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   *
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListInstanceProfiles {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListInstanceProfiles_Response {
  /** A list of instance profiles that the user can access. */
  instanceProfiles?: InstanceProfile[] | undefined;
}

export interface RemoveInstanceProfile {
  /** The ARN of the instance profile to remove. This field is required. */
  instanceProfileArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface RemoveInstanceProfile_Response {}

export const unmarshalAddInstanceProfileSchema: z.ZodType<AddInstanceProfile> =
  z
    .object({
      skip_validation: z.boolean().optional(),
      instance_profile_arn: z.string().optional(),
      is_meta_instance_profile: z.boolean().optional(),
      iam_role_arn: z.string().optional(),
    })
    .transform(d => ({
      skipValidation: d.skip_validation,
      instanceProfileArn: d.instance_profile_arn,
      isMetaInstanceProfile: d.is_meta_instance_profile,
      iamRoleArn: d.iam_role_arn,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAddInstanceProfile_ResponseSchema: z.ZodType<AddInstanceProfile_Response> =
  z.object({});

export const unmarshalEditInstanceProfileSchema: z.ZodType<EditInstanceProfile> =
  z
    .object({
      instance_profile_arn: z.string().optional(),
      is_meta_instance_profile: z.boolean().optional(),
      iam_role_arn: z.string().optional(),
    })
    .transform(d => ({
      instanceProfileArn: d.instance_profile_arn,
      isMetaInstanceProfile: d.is_meta_instance_profile,
      iamRoleArn: d.iam_role_arn,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEditInstanceProfile_ResponseSchema: z.ZodType<EditInstanceProfile_Response> =
  z.object({});

export const unmarshalInstanceProfileSchema: z.ZodType<InstanceProfile> = z
  .object({
    instance_profile_arn: z.string().optional(),
    is_meta_instance_profile: z.boolean().optional(),
    iam_role_arn: z.string().optional(),
  })
  .transform(d => ({
    instanceProfileArn: d.instance_profile_arn,
    isMetaInstanceProfile: d.is_meta_instance_profile,
    iamRoleArn: d.iam_role_arn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListInstanceProfiles_ResponseSchema: z.ZodType<ListInstanceProfiles_Response> =
  z
    .object({
      instance_profiles: z
        .array(z.lazy(() => unmarshalInstanceProfileSchema))
        .optional(),
    })
    .transform(d => ({
      instanceProfiles: d.instance_profiles,
    }));

export const unmarshalRemoveInstanceProfileSchema: z.ZodType<RemoveInstanceProfile> =
  z
    .object({
      instance_profile_arn: z.string().optional(),
    })
    .transform(d => ({
      instanceProfileArn: d.instance_profile_arn,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRemoveInstanceProfile_ResponseSchema: z.ZodType<RemoveInstanceProfile_Response> =
  z.object({});

export const marshalAddInstanceProfileSchema: z.ZodType = z
  .object({
    skipValidation: z.boolean().optional(),
    instanceProfileArn: z.string().optional(),
    isMetaInstanceProfile: z.boolean().optional(),
    iamRoleArn: z.string().optional(),
  })
  .transform(d => ({
    skip_validation: d.skipValidation,
    instance_profile_arn: d.instanceProfileArn,
    is_meta_instance_profile: d.isMetaInstanceProfile,
    iam_role_arn: d.iamRoleArn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAddInstanceProfile_ResponseSchema: z.ZodType = z.object({});

export const marshalEditInstanceProfileSchema: z.ZodType = z
  .object({
    instanceProfileArn: z.string().optional(),
    isMetaInstanceProfile: z.boolean().optional(),
    iamRoleArn: z.string().optional(),
  })
  .transform(d => ({
    instance_profile_arn: d.instanceProfileArn,
    is_meta_instance_profile: d.isMetaInstanceProfile,
    iam_role_arn: d.iamRoleArn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEditInstanceProfile_ResponseSchema: z.ZodType = z.object(
  {}
);

export const marshalInstanceProfileSchema: z.ZodType = z
  .object({
    instanceProfileArn: z.string().optional(),
    isMetaInstanceProfile: z.boolean().optional(),
    iamRoleArn: z.string().optional(),
  })
  .transform(d => ({
    instance_profile_arn: d.instanceProfileArn,
    is_meta_instance_profile: d.isMetaInstanceProfile,
    iam_role_arn: d.iamRoleArn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListInstanceProfiles_ResponseSchema: z.ZodType = z
  .object({
    instanceProfiles: z
      .array(z.lazy(() => marshalInstanceProfileSchema))
      .optional(),
  })
  .transform(d => ({
    instance_profiles: d.instanceProfiles,
  }));

export const marshalRemoveInstanceProfileSchema: z.ZodType = z
  .object({
    instanceProfileArn: z.string().optional(),
  })
  .transform(d => ({
    instance_profile_arn: d.instanceProfileArn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRemoveInstanceProfile_ResponseSchema: z.ZodType = z.object(
  {}
);

const addInstanceProfileFieldMaskSchema: FieldMaskSchema = {
  iamRoleArn: {wire: 'iam_role_arn'},
  instanceProfileArn: {wire: 'instance_profile_arn'},
  isMetaInstanceProfile: {wire: 'is_meta_instance_profile'},
  skipValidation: {wire: 'skip_validation'},
};

export function addInstanceProfileFieldMask(
  ...paths: string[]
): FieldMask<AddInstanceProfile> {
  return FieldMask.build<AddInstanceProfile>(
    paths,
    addInstanceProfileFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const addInstanceProfile_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function addInstanceProfile_ResponseFieldMask(
  ...paths: string[]
): FieldMask<AddInstanceProfile_Response> {
  return FieldMask.build<AddInstanceProfile_Response>(
    paths,
    addInstanceProfile_ResponseFieldMaskSchema
  );
}

const editInstanceProfileFieldMaskSchema: FieldMaskSchema = {
  iamRoleArn: {wire: 'iam_role_arn'},
  instanceProfileArn: {wire: 'instance_profile_arn'},
  isMetaInstanceProfile: {wire: 'is_meta_instance_profile'},
};

export function editInstanceProfileFieldMask(
  ...paths: string[]
): FieldMask<EditInstanceProfile> {
  return FieldMask.build<EditInstanceProfile>(
    paths,
    editInstanceProfileFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const editInstanceProfile_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function editInstanceProfile_ResponseFieldMask(
  ...paths: string[]
): FieldMask<EditInstanceProfile_Response> {
  return FieldMask.build<EditInstanceProfile_Response>(
    paths,
    editInstanceProfile_ResponseFieldMaskSchema
  );
}

const instanceProfileFieldMaskSchema: FieldMaskSchema = {
  iamRoleArn: {wire: 'iam_role_arn'},
  instanceProfileArn: {wire: 'instance_profile_arn'},
  isMetaInstanceProfile: {wire: 'is_meta_instance_profile'},
};

export function instanceProfileFieldMask(
  ...paths: string[]
): FieldMask<InstanceProfile> {
  return FieldMask.build<InstanceProfile>(
    paths,
    instanceProfileFieldMaskSchema
  );
}

const listInstanceProfilesFieldMaskSchema: FieldMaskSchema = {};

export function listInstanceProfilesFieldMask(
  ...paths: string[]
): FieldMask<ListInstanceProfiles> {
  return FieldMask.build<ListInstanceProfiles>(
    paths,
    listInstanceProfilesFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listInstanceProfiles_ResponseFieldMaskSchema: FieldMaskSchema = {
  instanceProfiles: {wire: 'instance_profiles'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listInstanceProfiles_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListInstanceProfiles_Response> {
  return FieldMask.build<ListInstanceProfiles_Response>(
    paths,
    listInstanceProfiles_ResponseFieldMaskSchema
  );
}

const removeInstanceProfileFieldMaskSchema: FieldMaskSchema = {
  instanceProfileArn: {wire: 'instance_profile_arn'},
};

export function removeInstanceProfileFieldMask(
  ...paths: string[]
): FieldMask<RemoveInstanceProfile> {
  return FieldMask.build<RemoveInstanceProfile>(
    paths,
    removeInstanceProfileFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const removeInstanceProfile_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function removeInstanceProfile_ResponseFieldMask(
  ...paths: string[]
): FieldMask<RemoveInstanceProfile_Response> {
  return FieldMask.build<RemoveInstanceProfile_Response>(
    paths,
    removeInstanceProfile_ResponseFieldMaskSchema
  );
}
