/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, Input, OnInit } from '@angular/core';
import PDFJS from 'pdfjs-dist';

@Component({
  selector: 'pdf-viewer',
  templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
})

export class PdfViewerComponent extends OnInit{
  @Input() src: string;
  @Input() initialPage: number = 1;

  private pdf: any;

  ngOnInit() {
    this.fn();
  }

  private fn() {
    PDFJS.getDocument(this.src).then((pdf: any) => {
      this.pdf = pdf;

      this.renderPage(this.initialPage);
    });
  }

  private renderPage(initialPage: number) {
    this.pdf.getPage(initialPage).then((page: any) => {
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
  }
}