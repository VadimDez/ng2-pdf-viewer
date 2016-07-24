/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, Input, ElementRef } from '@angular/core';
import PDFJS from 'pdfjs-dist';

@Component({
  selector: 'pdf-viewer',
  template: '<div class="ng2-pdf-viewer-container"></div>'
})

export class PdfViewerComponent {
  private _showAll: boolean = false;
  private _originalSize: boolean = false;
  private _src: string;
  private _pdf: any;
  private _page: number = 1;

  constructor(private element: ElementRef) {}

  @Input()
  set src(_src) {
    this._src = _src;

    this.fn();
  }

  @Input()
  set page(_page) {
    _page = parseInt(_page, 10);

    if (this._pdf && this.isValidPageNumber(_page)) {
      this._page = _page;
      this.renderPage(_page);
    }
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize;

    if (this._pdf) {
      this.fn();
    }
  }

  @Input('show-all')
  set showAll(value: boolean) {
    this._showAll = value;

    if (this._pdf) {
      this.fn();
    }
  }

  private fn() {
    PDFJS.getDocument(this._src).then((pdf: any) => {
      this._pdf = pdf;

      if (!this.isValidPageNumber(this._page)) {
        this._page = 1;
      }

      if (!this._showAll) {
        return this.renderPage(this._page);
      }

      return this.renderMultiplePages();
    });
  }

  private renderMultiplePages() {
    let container = this.element.nativeElement.querySelector('div');
    let i = 1;

    this.removeAllChildNodes(container);

    const renderPage = (page: any) => {
      let viewport = page.getViewport(1);
      let canvas: HTMLCanvasElement = document.createElement('canvas');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width);
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      });

      container.appendChild(canvas);

      if (i < this._pdf.numPages) {
        i++;
        this._pdf.getPage(i).then(renderPage);
      }
    };

    this._pdf.getPage(i).then(renderPage);
  }

  private isValidPageNumber(page: number) {
    return this._pdf.numPages >= page && page >= 1;
  }

  private renderPage(initialPage: number) {
    this._pdf.getPage(initialPage).then((page: any) => {
      let viewport = page.getViewport(1);
      let container = this.element.nativeElement.querySelector('div');
      let canvas: HTMLCanvasElement = document.createElement('canvas');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width);
      }

      this.removeAllChildNodes(container);
      container.appendChild(canvas);

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      });
    });
  }

  private removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}