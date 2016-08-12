import { PlatformRef } from '@angular/core';
/**
 * @deprecated Use `platformWorkerApp()` or create a custom platform factory via
 * `createPlatformFactory(platformWorkerApp, ...)`
 */
export declare const WORKER_APP_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Create a module that includes `WorkerAppModule` instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
export declare const WORKER_APP_APPLICATION_PROVIDERS: Array<any>;
/**
 * @experimental
 */
export declare const platformWorkerApp: (extraProviders?: any[]) => PlatformRef;
/**
 * @deprecated Use {@link platformWorkerApp} instead
 */
export declare const workerAppPlatform: (extraProviders?: any[]) => PlatformRef;
/**
 * The ng module for the worker app side.
 *
 * @experimental
 */
export declare class WorkerAppModule {
}
