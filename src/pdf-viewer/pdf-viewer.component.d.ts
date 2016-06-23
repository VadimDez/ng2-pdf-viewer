/**
 * Created by vadimdez on 21/06/16.
 */
import { ElementRef } from '@angular/core';
export declare class PdfViewerComponent {
    private element;
    originalSize: boolean;
    private _src;
    private _pdf;
    private _initialPage;
    constructor(element: ElementRef);
    src: any;
    initialPage: any;
    private fn();
    private isValidPageNumber(page);
    private renderPage(initialPage);
}
