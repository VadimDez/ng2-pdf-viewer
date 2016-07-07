import { PlatformLocation } from '@angular/common';
import { NgZone } from '@angular/core';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 * @experimental
 */
export declare const WORKER_APP_LOCATION_PROVIDERS: ({
    provide: typeof PlatformLocation;
    useClass: typeof WebWorkerPlatformLocation;
} | {
    provide: any;
    useFactory: (platformLocation: WebWorkerPlatformLocation, zone: NgZone) => () => Promise<boolean>;
    multi: boolean;
    deps: (typeof PlatformLocation | typeof NgZone)[];
})[];
