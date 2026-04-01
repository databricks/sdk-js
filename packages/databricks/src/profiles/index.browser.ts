/**
 * Browser entry point for the profiles module.
 *
 * @packageDocumentation
 */

export {
  ConfigFileNotFoundError,
  EmptyPathError,
  EmptyProfileError,
  InvalidProfileNameError,
  ProfileNotFoundError,
} from './errors';
export type {Profile, ResolveOptions} from './profile';
export {Secret} from './secret';
