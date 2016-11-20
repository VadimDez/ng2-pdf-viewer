import { ElementRef, EventEmitter } from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';
export declare class PdfViewerComponent {
    private element;
    private _showAll;
    private _originalSize;
    private _src;
    private _pdf;
    private _page;
    private _zoom;
    private wasInvalidPage;
    afterLoadComplete: Function;
    constructor(element: ElementRef);
    src: any;
    page: any;
    pageChange: EventEmitter<number>;
    originalSize: boolean;
    showAll: boolean;
    zoom: number;
    private fn();
    private renderMultiplePages();
    private isValidPageNumber(page);
    private renderPage(page);
    private removeAllChildNodes(element);
}
