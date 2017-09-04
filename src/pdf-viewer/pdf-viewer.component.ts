/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import 'pdfjs-dist/build/pdf.min';
PDFJS.verbosity = (<any>PDFJS).VERBOSITY_LEVELS.errors;

@Component({
  selector: 'pdf-viewer',
  template: `
      <div class="ng2-pdf-viewer-container"
           [ngClass]="{'ng2-pdf-viewer--zoom': zoom < 1}"
           (window:resize)="onPageResize()"
      ></div>
  `,
  styles: [`
.ng2-pdf-viewer--zoom {
  overflow-x: scroll;
}

:host >>> .ng2-pdf-viewer-container .page {
  background-color: #fff;
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
  private resizeTimeout: NodeJS.Timer;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();
  @Output('error') onError = new EventEmitter<any>();
  @Output('on-progress') onProgress = new EventEmitter<PDFProgressData>();

  constructor(private element: ElementRef) {
    PDFJS.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
  }

  @Input()
  src: string | Uint8Array | PDFSource;

  @Input('page')
  set page(_page) {
    _page = parseInt(_page, 10);

    if (this._pdf && !this.isValidPageNumber(_page)) {
      _page = 1;
    }

    this._page = _page;
    this.pageChange.emit(_page);
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

  public onPageResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.render();
    }, 100);
  }

  private loadPDF() {
    if (!this.src) {
      return;
    }

    let loadingTask: any = PDFJS.getDocument(this.src);

    loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.onProgress.emit(progressData);
    };

    (<PDFPromise<PDFDocumentProxy>>loadingTask.promise)
      .then(pdf => {
        this._pdf = pdf;

        this.afterLoadComplete.emit(pdf);

        this.update();
      }, (error: any) => {
        this.onError.emit(error);
      });
  }

  private update() {
    this.page = this._page;

    this.render();
  }

  private render() {
    if (!this._showAll) {
      this.renderPage(this._page);
    } else {
      this.renderMultiplePages();
    }
  }

  private renderMultiplePages() {
    let container = this.element.nativeElement.querySelector('div');

    this.removeAllChildNodes(container);

    // render pages synchronously
    const render = (page: number) => {
      this.renderPage(page).then(() => {
        if (page < this._pdf.numPages) {
          render(page + 1);
        }
      });
    };

    render(1);
  }

  private isValidPageNumber(page: number): boolean {
    return this._pdf.numPages >= page && page >= 1;
  }

  private renderPage(pageNumber: number): PDFPromise<void> {
    return this._pdf.getPage(pageNumber).then( (page: PDFPageProxy) => {
      let viewport = page.getViewport(this._zoom, this._rotation);
      let container = this.element.nativeElement.querySelector('div');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width, this._rotation);
      }

      if (!this._showAll) {
        this.removeAllChildNodes(container);
      }

      return (<any>page).getOperatorList().then( (opList) => {
        let svgGfx = new (<any>PDFJS).SVGGraphics((<any>page).commonObjs, (<any>page).objs);

        return svgGfx.getSVG(opList, viewport).then( (svg) => {
          let $div = document.createElement('div');

          $div.classList.add('page');
          $div.setAttribute('data-page-number', `${ page.pageNumber }`);

          $div.appendChild(svg);

          this.convertAttributeToInlineStyle($div, 'font-family');
          this.convertAttributeToInlineStyle($div, 'font-size');

          container.appendChild($div);
        });
      });
    });
  }

  private removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  private convertAttributeToInlineStyle(parent: HTMLElement, attribute: string) {
    const matchElements = parent.querySelectorAll(`[${attribute}]`);
    for (let i = 0, l = matchElements.length; i < l; i++) {
      const element = matchElements[i];
      const oldStyle = element.getAttribute('style') || '';
      element.setAttribute('style', `${oldStyle} ${attribute}: ${element.getAttribute(attribute)};`);
    }
  }
}
