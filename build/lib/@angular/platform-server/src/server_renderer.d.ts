import { NgZone, Renderer2, RendererFactory2, RendererType2 } from '@angular/core';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
export declare class ServerRendererFactory2 implements RendererFactory2 {
    private ngZone;
    private document;
    private sharedStylesHost;
    private rendererByCompId;
    private defaultRenderer;
    private schema;
    constructor(ngZone: NgZone, document: any, sharedStylesHost: SharedStylesHost);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
}
