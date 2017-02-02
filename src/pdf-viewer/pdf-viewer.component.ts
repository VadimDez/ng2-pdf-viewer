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
  template: `<div class="ng2-pdf-viewer-container"><div id="viewer" class="pdfViewer"></div></div>`,
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

export class PdfViewerComponent implements OnChanges, OnInit {
  private static CSS_UNITS: number = 96.0 / 72.0;
  private _showAll: boolean = true; // TODO : _showAll is not working

  private _renderText: boolean = true;
  private _renderLink: boolean = true;
  private _stickToPage: boolean = false;
  private _originalSize: boolean = true;
  private _pdf: PDFDocumentProxy;
  private _page: number = 1;
  private _zoom: number = 1;
  private _rotation: number = 0;

  private _enhanceTextSelection: boolean = false;
  private _pageBorder: boolean = false;
  private _externalLinkTarget: string = 'blank';
  private _pdfViewer: any;
  private _pdfLinkService: any;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();

  constructor(private element: ElementRef) {
    PDFJS.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    //PDFJS.disableWorker = true;
  }

  ngOnInit() {
    this.setupViewer();
  }

  @Input()
  src: string | Uint8Array | PDFSource;

  @Input('page')
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
    if (this._pdf) {
      this.setupViewer();
    }
  }

  @Input('render-link')
  set renderLink(renderLink) {
    this._renderLink = renderLink;
    if (this._pdf) {
      this.setupViewer();
    }
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize;
    if (this._pdf) {
      this.updateSize();
    }
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

    if (this._pdf) {
      this.updateSize();
    }
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


  @Input('external-link-target')
  set externalLinkTarget(value: string) {
    this._externalLinkTarget = value;
    if (this._pdf) {
      this.setupViewer();
    }
  }

  @Input('page-border')
  set pageBorder(value: boolean) {
    this._pageBorder = value;
    if (this._pdf) {
      this.setupViewer();
    }
  }

  @Input('enhance-text-selection')
  set enhanceTextSelection(value: boolean) {
    this._enhanceTextSelection = value;
    if (this._pdf) {
      this.setupViewer();
    }
  }

  public setupViewer() {

    PDFJS.disableTextLayer = !this._renderText;

    switch (this._externalLinkTarget) {
      case 'blank':
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
        break;
      case 'none':
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.NONE;
        break;
      case 'self':
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.SELF;
        break;
      case 'parent':
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.PARENT;
        break;
      case 'top':
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.TOP;
        break;
    }

    let pdfOptions: any = {
      container: this.element.nativeElement.querySelector('div')
    };

    if (this._renderLink) {
      this._pdfLinkService = new PDFJS.PDFLinkService();
      pdfOptions.linkService = this._pdfLinkService;
    }

    if (!this._pageBorder) {
      pdfOptions.removePageBorders = true;
    }

    if (this._enhanceTextSelection) {
      pdfOptions.enhanceTextSelection = this._enhanceTextSelection;
    }

    this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);

    if (this._renderLink) {
      this._pdfLinkService.setViewer(this._pdfViewer);
    }

    if (this.src) {
      this.loadPDF();
    }
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

      this._pdfViewer.setDocument(this._pdf);
      this._pdfLinkService.setDocument(this._pdf, null);

      this.update();
    });
  }

  private update() {
    this.page = this._page;

    this.render();
  }


  public render() {
    if (!this.isValidPageNumber(this._page)) {
      this._page = 1;
    }

    if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
      this._pdfViewer.pagesRotation = this._rotation;
    }

    if (this._stickToPage) {
      this._pdfViewer.currentPageNumber = this._page;
    }

    this.updateSize();
  }

  public updateSize() {
    if (!this._originalSize) {
      this._pdf.getPage(this._pdfViewer._currentPageNumber).then((page: PDFPageProxy) => {
        let scale = this._zoom * (this.element.nativeElement.offsetWidth / page.getViewport(1).width) / PdfViewerComponent.CSS_UNITS;
        this._pdfViewer._setScale(scale, !this._stickToPage);
      });
    } else {
      this._pdfViewer._setScale(this._zoom, !this._stickToPage);
    }
  }

  public isValidPageNumber(page: number) {
      return this._pdf.numPages >= page && page >= 1;
    }
}
