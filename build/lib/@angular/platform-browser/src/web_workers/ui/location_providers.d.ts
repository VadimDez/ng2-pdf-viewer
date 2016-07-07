import { Injector } from '@angular/core';
import { BrowserPlatformLocation } from '../../browser/location/browser_platform_location';
import { MessageBasedPlatformLocation } from './platform_location';
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @experimental
 */
export declare const WORKER_UI_LOCATION_PROVIDERS: (typeof MessageBasedPlatformLocation | typeof BrowserPlatformLocation | {
    provide: any;
    useFactory: (injector: Injector) => () => void;
    multi: boolean;
    deps: typeof Injector[];
})[];
