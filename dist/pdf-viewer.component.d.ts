/// <reference types="pdf" />
import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';
export declare class PdfViewerComponent implements OnInit {
    private element;
    private _showAll;
    private _renderText;
    private _originalSize;
    private _src;
    private _pdf;
    private _page;
    private _zoom;
    private wasInvalidPage;
    private _rotation;
    private isInitialised;
    private lastLoaded;
    afterLoadComplete: EventEmitter<PDFDocumentProxy>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    src: any;
    page: any;
    pageChange: EventEmitter<number>;
    renderText: boolean;
    originalSize: boolean;
    showAll: boolean;
    zoom: number;
    rotation: number;
    private update();
    private main();
    private loadPDF(src);
    private onRender();
    private renderMultiplePages();
    private isValidPageNumber(page);
    private buildSVG(viewport, textContent);
    private renderPageOverlay(page, viewport, container);
    private renderPage(pageNumber);
    private removeAllChildNodes(element);
}
