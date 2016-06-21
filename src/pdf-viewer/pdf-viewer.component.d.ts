/**
 * Created by vadimdez on 21/06/16.
 */
import { OnInit, ElementRef } from '@angular/core';
export declare class PdfViewerComponent extends OnInit {
    private element;
    src: string;
    initialPage: number;
    private pdf;
    constructor(element: ElementRef);
    ngOnInit(): void;
    private fn();
    private isValidPageNumber(page);
    private renderPage(initialPage);
}
