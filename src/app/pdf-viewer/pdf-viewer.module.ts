/**
 * Created by vadimdez on 01/11/2016.
 */
import { NgModule } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';
import { PDFJSStatic } from 'pdfjs-dist';
import { CommonModule } from '@angular/common';

declare global {
  const PDFJS: PDFJSStatic;
}

export {
  PDFJSStatic,
  PDFDocumentProxy,
  PDFViewerParams,
  PDFPageProxy,
  PDFSource,
  PDFProgressData,
  PDFPromise
} from 'pdfjs-dist';

@NgModule({
  declarations: [PdfViewerComponent],
  imports: [CommonModule],
  exports: [PdfViewerComponent]
})
export class PdfViewerModule {}
