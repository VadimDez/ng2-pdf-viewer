/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';

@Component({
  selector: 'pdf-viewer',
  template: `<div class="ng2-pdf-viewer-container" [ngClass]="{'ng2-pdf-viewer--zoom': zoom < 1}"></div>`,
  styles: [`
.ng2-pdf-viewer--zoom {
  overflow-x: scroll;
}

:host >>> .ng2-pdf-viewer-container > div {
  position: relative;
  z-index: 0;
}

:host >>> .textLayer {
  font-family: sans-serif;
  overflow: hidden;
}
  `]
})

export class PdfViewerComponent implements OnChanges {
  private _showAll: boolean = false;
  private _renderText: boolean = true;
  private _originalSize: boolean = true;
  private _pdf: PDFDocumentProxy;
  private _page: number = 1;
  private _zoom: number = 1;
  private _rotation: number = 0;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();

  constructor(private element: ElementRef) { }

  @Input()
  src: string | Uint8Array | PDFSource;

  @Input()
  set page(_page) {
    _page = parseInt(_page, 10);

    if (this._pdf && !this.isValidPageNumber(_page)) {
      _page = 1;
    }

    if (this._page !== _page) {
      this._page = _page;
      this.pageChange.emit(_page);
    }
  }

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

  @Input('render-text')
  set renderText(renderText: boolean) {
    this._renderText = renderText;
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize;
  }

  @Input('show-all')
  set showAll(value: boolean) {
    this._showAll = value;
  }

  @Input('zoom')
  set zoom(value: number) {
    if (value <= 0) {
      return;
    }

    this._zoom = value;
  }

  get zoom() {
    return this._zoom;
  }

  @Input('rotation')
  set rotation(value: number) {
    if (!(typeof value === 'number' && value % 90 === 0)) {
      console.warn('Invalid pages rotation angle.');
      return;
    }

    this._rotation = value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('src' in changes) {
      this.loadPDF();
    } else if (this._pdf) {
      this.update();
    }
  }

  private loadPDF() {
    if (!this.src) {
      return;
    }

    PDFJS.getDocument(this.src).then(pdf => {
      this._pdf = pdf;

      this.afterLoadComplete.emit(pdf);

      this.update();
    });
  }

  private update() {
    this.page = this._page;

    if (!this._showAll) {
      this.renderPage(this._page);
    } else {
      this.renderMultiplePages();
    }
  }

  private renderMultiplePages() {
    let container = this.element.nativeElement.querySelector('div');
    let page = 1;

    this.removeAllChildNodes(container);

    this.renderPage(page++).then(() => {
      if (page <= this._pdf.numPages) {
        return this.renderPage(page++);
      }
    });
  }

  private isValidPageNumber(page: number) {
    return this._pdf.numPages >= page && page >= 1;
  }

  private buildSVG(viewport, textContent) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(SVG_NS, 'svg:svg');

    svg.setAttribute('width', viewport.width + 'px');
    svg.setAttribute('height', viewport.height + 'px');
    svg.setAttribute('font-size', '1');
    svg.setAttribute('class', 'textLayer');

    textContent.items.forEach(function (textItem) {
      const tx = (<any>window).PDFJS.Util.transform(
          (<any>window).PDFJS.Util.transform(viewport.transform, textItem.transform),
          [1, 0, 0, -1, 0, 0]
      );

      const style = textContent.styles[textItem.fontName];
      const text = document.createElementNS(SVG_NS, 'svg:text');
      text.setAttribute('transform', 'matrix(' + tx.join(' ') + ')');
      text.setAttribute('style', `
      position: absolute;
      fill: transparent;
      line-height: 1;
      white-space: pre;
      cursor: text;
      font-family: ${ textItem.fontName }, ${ style.fontFamily };
      `);
      text.textContent = textItem.str;
      svg.appendChild(text);
    });
    return svg;
  }

  private renderPageOverlay(page: any, viewport: any, container: HTMLElement) {
    page.getTextContent().then(textContent => {
      let index = this._showAll ? page.pageIndex : 0;
      let canvas = container.querySelectorAll('canvas')[index];
      canvas.parentNode.insertBefore(this.buildSVG(viewport, textContent), canvas);
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '-1';
    });
  }

  private renderPage(pageNumber: number): PDFPromise<void> {
    return this._pdf.getPage(pageNumber).then( page => {
      let viewport = page.getViewport(this._zoom, this._rotation);
      let container = this.element.nativeElement.querySelector('div');
      let canvas: HTMLCanvasElement = document.createElement('canvas');
      let div: HTMLElement = document.createElement('div');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width, this._rotation);
      }

      if (!this._showAll) {
        this.removeAllChildNodes(container);
      }

      div.appendChild(canvas);
      container.appendChild(div);

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      });

      if (this._renderText) {
        this.renderPageOverlay(page, viewport, container);
      }
    });
  }

  private removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
