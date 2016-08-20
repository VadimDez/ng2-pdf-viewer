/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter
} from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';

@Component({
  selector: 'pdf-viewer',
  template: '<div class="ng2-pdf-viewer-container"></div>'
})

export class PdfViewerComponent {
  private _showAll: boolean = false;
  private _originalSize: boolean = true;
  private _src: string;
  private _pdf: any;
  private _page: number = 1;
  private wasInvalidPage: boolean = false;

  constructor(private element: ElementRef) {}

  @Input()
  set src(_src) {
    this._src = _src;

    this.fn();
  }

  @Input()
  set page(_page) {
    _page = parseInt(_page, 10);

    if (!this._pdf) {
      return;
    }

    if (this.isValidPageNumber(_page)) {
      this._page = _page;
      this.renderPage(_page);
      this.wasInvalidPage = false;
    } else if (isNaN(_page)) {
      this.pageChange.emit(null);
    } else if (!this.wasInvalidPage) {
      this.wasInvalidPage = true;
      this.pageChange.emit(this._page);
    }
  }

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

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
    (<any>window).PDFJS.getDocument(this._src).then((pdf: any) => {
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
    let page = 1;
    const renderPageFn = (page: number) => () => this.renderPage(page);

    this.removeAllChildNodes(container);

    let d = this.renderPage(page++);

    for (page; page <= this._pdf.numPages; page++) {
      d = d.then(renderPageFn(page));
    }
  }

  private isValidPageNumber(page: number) {
    return this._pdf.numPages >= page && page >= 1;
  }

  private renderPage(page: number) {
    return this._pdf.getPage(page).then((page: any) => {
      let viewport = page.getViewport(1);
      let container = this.element.nativeElement.querySelector('div');
      let canvas: HTMLCanvasElement = document.createElement('canvas');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width);
      }

      if (!this._showAll) {
        this.removeAllChildNodes(container);
      }

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