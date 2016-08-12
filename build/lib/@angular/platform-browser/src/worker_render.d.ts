/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken, PlatformRef } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @experimental WebWorker support is currently experimental.
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_SCRIPT: OpaqueToken;
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: OpaqueToken;
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const _WORKER_UI_PLATFORM_PROVIDERS: Array<any>;
/**
 * * @deprecated Use `platformWorkerUi()` or create a custom platform factory via
 * `createPlatformFactory(platformWorkerUi, ...)`
 */
export declare const WORKER_UI_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Worker UI only has a platform but no application
 */
export declare const WORKER_UI_APPLICATION_PROVIDERS: Array<any>;
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const platformWorkerUi: (extraProviders?: any[]) => PlatformRef;
/**
 * @deprecated Use {@link platformWorkerUi} instead
 */
export declare const workerUiPlatform: (extraProviders?: any[]) => PlatformRef;
