import { PlatformRef } from './application_ref';
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
export declare const platformCore: (extraProviders?: any[]) => PlatformRef;
/**
 * A default set of providers which should be included in any Angular platform.
 *
 * @deprecated Create platforms via `createPlatformFactory(corePlatform, ...) instead!
 */
export declare const PLATFORM_COMMON_PROVIDERS: any[];
