/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import PDFJS from 'pdfjs-dist';

@Component({
  selector: 'pdf-viewer',
  templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
})

export class PdfViewerComponent extends OnInit{
  @Input() src: string;
  @Input() initialPage: number = 1;

  private pdf: any;

  constructor(private element: ElementRef) {

  }

  ngOnInit() {
    this.fn();
  }

  private fn() {
    PDFJS.getDocument(this.src).then((pdf: any) => {
      this.pdf = pdf;

      if (!this.isValidPageNumber(this.initialPage)) {
        this.initialPage = 1;
      }

      this.renderPage(this.initialPage);
    });
  }

  private isValidPageNumber(page: number) {
    return this.pdf.numPages >= page && page >= 1;
  }

  private renderPage(initialPage: number) {
    this.pdf.getPage(initialPage).then((page: any) => {
      var scale = 1;
      var viewport = page.getViewport(scale);
      var canvas = this.element.nativeElement.querySelector('canvas');
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