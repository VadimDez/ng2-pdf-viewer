/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges, OnInit
} from '@angular/core';
import 'pdfjs-dist/build/pdf.combined';
import 'pdfjs-dist/web/pdf_viewer';

@Component({
  selector: 'pdf-viewer',
  template: `<div class="ng2-pdf-viewer-container"><div id="viewer" class="pdfViewer"></div></div>`
})

export class PdfViewerComponent implements OnChanges, OnInit {
  private static CSS_UNITS: number = 96.0 / 72.0;
  private _showAll: boolean = true; // TODO : _showAll is not working

  private _renderText: boolean = true;
  private _stickToPage: boolean = false;
  private _originalSize: boolean = true;
  private _pdf: PDFDocumentProxy;
  private _page: number = 1;
  private _zoom: number = 1;
  private _rotation: number = 0;

  private _externalLinkTarget: string = 'blank';
  private _pdfViewer: any;
  private _pdfLinkService: any;
  private lastLoaded: string | Uint8Array | PDFSource;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();

  constructor(private element: ElementRef) {
    PDFJS.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    //PDFJS.disableWorker = true;
  }

  ngOnInit() {
    this.setupViewer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('src' in changes) {
      this.loadPDF();
    } else if (this._pdf) {
      if ('renderText' in changes) {
        this.setupViewer();
      }
      this.update();
    }
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

  @Input('stick-to-page')
  set stickToPage(value: boolean) {
    this._stickToPage = value;
  }

  @Input('zoom')
  set zoom(value: number) {
    if (value <= 0) {
      return;
    }

    this._zoom = value;
  }

  @Input('rotation')
  set rotation(value: number) {
    if (!(typeof value === 'number' && value % 90 === 0)) {
      console.warn('Invalid pages rotation angle.');
      return;
    }

    this._rotation = value;
  }

  @Input('external-link-target')
  set externalLinkTarget(value: string) {
    this._externalLinkTarget = value;
  }

  public setupViewer() {
    (<any>PDFJS).disableTextLayer = !this._renderText;

    this.setExternalLinkTarget(this._externalLinkTarget);

    this._pdfLinkService = new (<any>PDFJS).PDFLinkService();
    let pdfOptions: any = {
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: true,
      linkService: this._pdfLinkService
    };

    this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);
    this._pdfLinkService.setViewer(this._pdfViewer);
  }

  public render() {
    if (!this.isValidPageNumber(this._page)) {
      this._page = 1;
    }

    if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
      setTimeout(() => {
        this._pdfViewer.pagesRotation = this._rotation;
      });
    }

    if (this._stickToPage) {
      setTimeout(() => {
        this._pdfViewer.currentPageNumber = this._page;
      });
    }

    this.updateSize();
  }

  public updateSize() {
    this._pdf.getPage(this._pdfViewer._currentPageNumber).then((page: PDFPageProxy) => {
      const scale = this._zoom * (this.element.nativeElement.offsetWidth / page.getViewport(1).width) / PdfViewerComponent.CSS_UNITS;
      this._pdfViewer._setScale(scale, !this._stickToPage);
    });
  }

  public isValidPageNumber(page: number) {
    return this._pdf.numPages >= page && page >= 1;
  }

  private setExternalLinkTarget(type: string) {
    switch (type) {
      case 'blank':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.BLANK;
        break;
      case 'none':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.NONE;
        break;
      case 'self':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.SELF;
        break;
      case 'parent':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.PARENT;
        break;
      case 'top':
        (<any>PDFJS).externalLinkTarget = (<any>PDFJS).LinkTarget.TOP;
        break;
    }
  }

  private loadPDF() {
    if (!this.src) {
      return;
    }

    if (this.lastLoaded === this.src) {
      this.update();
      return;
    }

    const src = this.src;
    PDFJS.getDocument(src).then((pdf: PDFDocumentProxy) => {
      this._pdf = pdf;
      this.lastLoaded = src;

      this.afterLoadComplete.emit(pdf);

      this.update();
    });
  }

  private update() {
    if (this._pdfViewer) {
      this._pdfViewer.setDocument(this._pdf);
    }
    if (this._pdfLinkService) {
      this._pdfLinkService.setDocument(this._pdf, null);
    }

    this.page = this._page;

    this.render();
  }
}
