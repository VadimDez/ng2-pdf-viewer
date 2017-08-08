/// <reference types="pdf" />
import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';
export declare class PdfViewerComponent implements OnChanges {
    private element;
    private _showAll;
    private _renderText;
    private _originalSize;
    private _pdf;
    private _page;
    private _zoom;
    private _rotation;
    private resizeTimeout;
    afterLoadComplete: EventEmitter<PDFDocumentProxy>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef);
    src: string | Uint8Array | PDFSource;
    page: any;
    pageChange: EventEmitter<number>;
    renderText: boolean;
    originalSize: boolean;
    showAll: boolean;
    zoom: number;
    rotation: number;
    ngOnChanges(changes: SimpleChanges): void;
    private loadPDF();
    private update();
    private render();
    private renderMultiplePages();
    isValidPageNumber(page: number): boolean;
    private renderPage(pageNumber);
    private removeAllChildNodes(element);
    private onPageResize();
}
