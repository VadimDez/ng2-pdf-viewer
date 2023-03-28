import { Subject } from 'rxjs';
interface EventBus {
    on(eventName: string, listener: Function): void;
    off(eventName: string, listener: Function): void;
    _listeners: any;
    dispatch(eventName: string, data: Object): void;
    _on(eventName: any, listener: any, options?: null): void;
    _off(eventName: any, listener: any, options?: null): void;
}
export declare function createEventBus(pdfJsViewer: any, destroy$: Subject<void>): EventBus;
export {};
