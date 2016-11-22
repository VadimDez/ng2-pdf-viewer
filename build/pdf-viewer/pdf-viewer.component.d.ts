import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';
export declare class PdfViewerComponent extends OnInit {
    private element;
    private _showAll;
    private _originalSize;
    private _src;
    private _pdf;
    private _page;
    private _zoom;
    private wasInvalidPage;
    private _rotation;
    private isInitialised;
    afterLoadComplete: Function;
    constructor(element: ElementRef);
    ngOnInit(): void;
    src: any;
    page: any;
    pageChange: EventEmitter<number>;
    originalSize: boolean;
    showAll: boolean;
    zoom: number;
    rotation: number;
    private fn();
    private renderMultiplePages();
    private isValidPageNumber(page);
    private renderPage(page);
    private removeAllChildNodes(element);
}
