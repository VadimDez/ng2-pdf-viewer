import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
export declare class ServerStylesHost extends SharedStylesHost {
    private doc;
    private transitionId;
    private head;
    constructor(doc: any, transitionId: string);
    private _addStyle(style);
    onStylesAdded(additions: Set<string>): void;
}
