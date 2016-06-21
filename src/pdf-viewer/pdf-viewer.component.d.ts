/**
 * Created by vadimdez on 21/06/16.
 */
import { OnInit } from '@angular/core';
export declare class PdfViewerComponent extends OnInit {
    src: string;
    initialPage: number;
    private pdf;
    ngOnInit(): void;
    private fn();
    private renderPage(initialPage);
}
