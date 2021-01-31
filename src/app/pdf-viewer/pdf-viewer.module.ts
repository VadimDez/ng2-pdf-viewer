/**
 * Created by vadimdez on 01/11/2016.
 */
import { NgModule } from '@angular/core';

import { PdfViewerComponent } from './pdf-viewer.component';

export * from './typings';

@NgModule({
  declarations: [PdfViewerComponent],
  exports: [PdfViewerComponent]
})
export class PdfViewerModule {}
