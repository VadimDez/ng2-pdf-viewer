/**
 * Created by vadimdez on 21/06/16.
 */
import { Component } from '@angular/core';
import PDFJS from 'pdfjs-dist';

@Component({
  selector: 'pdf-viewer',
  templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
})

export class PdfViewerComponent {

  constructor() {
    console.log('pdf initialized');
    PDFJS.getDocument('./pdf-test.pdf').then((pdf: any) => {

      pdf.getPage(1).then((page: any) => {
        var scale = 1;
        var viewport = page.getViewport(scale);
        var canvas = document.getElementById('pdf');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    });
  }
}