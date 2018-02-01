/**
 * Created by vadimdez on 01/11/2016.
 */
import { NgModule } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';
import { PDFJSStatic } from "pdfjs-dist";

declare global {
  const PDFJS: PDFJSStatic;
}

export { PDFJSStatic, PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise } from 'pdfjs-dist';

@NgModule({
  declarations: [PdfViewerComponent],
  exports: [PdfViewerComponent]
})
export class PdfViewerModule {
}
