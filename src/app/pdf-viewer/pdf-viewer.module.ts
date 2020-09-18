/**
 * Created by vadimdez on 01/11/2016.
 */
import { NgModule } from '@angular/core'

import { PdfViewerComponent } from './pdf-viewer.component'
import { PagerComponent } from './pager/pager.component'

import { PDFJSStatic } from 'pdfjs-dist'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { OverlayModule } from '@angular/cdk/overlay'

declare global {
  const PDFJS: PDFJSStatic
}

export {
  PDFJSStatic,
  PDFDocumentProxy,
  PDFViewerParams,
  PDFPageProxy,
  PDFSource,
  PDFProgressData,
  PDFPromise,
} from 'pdfjs-dist'

@NgModule({
  imports: [CommonModule, MatIconModule, OverlayModule],
  declarations: [PdfViewerComponent, PagerComponent],
  exports: [PdfViewerComponent],
})
export class PdfViewerModule {}
