import { OpaqueToken, PlatformRef } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 * @experimental
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * @experimental
 */
export declare const WORKER_SCRIPT: OpaqueToken;
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: OpaqueToken;
/**
 * * @experimental
 */
export declare const WORKER_UI_PLATFORM_PROVIDERS: Array<any>;
/**
 * * @experimental
 */
export declare const WORKER_UI_APPLICATION_PROVIDERS: Array<any>;
/**
 * * @experimental
 */
export declare function workerUiPlatform(): PlatformRef;
