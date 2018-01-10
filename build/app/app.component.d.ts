/// <reference types="pdfjs-dist" />
import { PDFProgressData, PDFDocumentProxy } from 'pdfjs-dist';
export declare class AppComponent {
    pdfSrc: string;
    error: any;
    page: number;
    rotation: number;
    zoom: number;
    originalSize: boolean;
    pdf: any;
    renderText: boolean;
    progressData: PDFProgressData;
    isLoaded: boolean;
    stickToPage: boolean;
    showAll: boolean;
    autoresize: boolean;
    fitToPage: boolean;
    outline: any[];
    isOutlineShown: boolean;
    private pdfComponent;
    constructor();
    setCustomWorkerPath(): void;
    incrementPage(amount: number): void;
    incrementZoom(amount: number): void;
    rotate(angle: number): void;
    onFileSelected(): void;
    afterLoadComplete(pdf: PDFDocumentProxy): void;
    loadOutline(): void;
    onError(error: any): void;
    onProgress(progressData: PDFProgressData): void;
    getInt(value: number): number;
    navigateTo(destination: any): void;
}
