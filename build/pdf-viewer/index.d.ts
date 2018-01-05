/// <reference types="pdfjs-dist" />
import { PDFJSStatic } from "pdfjs-dist";
declare global  {
    const PDFJS: PDFJSStatic;
}
export { PDFJSStatic, PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise } from 'pdfjs-dist';
export declare class PdfViewerModule {
}
