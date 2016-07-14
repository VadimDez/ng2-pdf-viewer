/**
 * Created by vadimdez on 21/06/16.
 */
import { ElementRef } from '@angular/core';
export declare class PdfViewerComponent {
    private element;
    originalSize: boolean;
    private _src;
    private _pdf;
    private _page;
    constructor(element: ElementRef);
    src: string;
    page: number;
    private fn();
    private isValidPageNumber(page);
    private renderPage(initialPage);
}
