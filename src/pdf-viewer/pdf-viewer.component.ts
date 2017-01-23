/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnInit
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
}

:host >>> .textLayer {
  font-family: sans-serif;
  overflow: hidden;
}
  `]
})

export class PdfViewerComponent extends OnInit {
  private static CSS_UNITS: number = 96.0 / 72.0;

  private _showAll: boolean = true; // TODO : _showAll is not working
  private _renderText: boolean = true;
  private _renderLink: boolean = true;
  private _stickToPage: boolean = false;
  private _originalSize: boolean = true;
  private _src: any;
  private _pdf: any;
  private _page: number = 1;
  private _zoom: number = 1;
  private wasInvalidPage: boolean = false;
  private _rotation: number = 0;
  private isInitialised: boolean = false;
  private lastLoaded: string;
  private _enhanceTextSelection: boolean = false;
  private _pageBorder: boolean = false;
  private _externalLinkTarget: string = 'blank';
  private _pdfViewer: any;
  private _pdfLinkService: any;
  @Input('after-load-complete') afterLoadComplete: Function;

  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() {
    this.setupViewer();
    this.isInitialised = true;
  }

  @Input('src')
  set src(_src) {
    this._src = _src;

    if (this.isInitialised && this._src) {
      this.loadPDF();
    }
  }

  @Input('page')
  set page(_page) {
    _page = parseInt(_page, 10);

    if (!this._pdf) {
      this._page = _page;
      return;
    }

    if (this.isValidPageNumber(_page)) {
      this._page = _page;
      this.render();
      this.wasInvalidPage = false;
    } else if (isNaN(_page)) {
      this.pageChange.emit(null);
    } else if (!this.wasInvalidPage) {
      this.wasInvalidPage = true;
      this.pageChange.emit(this._page);
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

    if (this._pdf) {
      this.render();
    }
  }

  @Input('stick-to-page')
  set stickToPage(value: boolean) {
    this._stickToPage = value;

    if (this._pdf) {
      this.render();
    }
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

    this.update();
  }

  private update() {
    if (this._pdf) {
      this.render();
    }
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

    PDFJS.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    //PDFJS.disableWorker = true;

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

    let container = this.element.nativeElement.querySelector('div');

    var pdfOptions = {
      container: container
    };

    if (this._renderLink) {
      this._pdfLinkService = new PDFJS.PDFLinkService();
      pdfOptions['linkService'] = this._pdfLinkService;
    }

    if (!this._pageBorder) {
      pdfOptions['removePageBorders'] = true;
    }

    if (this._enhanceTextSelection) {
      pdfOptions['enhanceTextSelection'] = this._enhanceTextSelection;
    }

    this._pdfViewer = new PDFJS.PDFViewer({
      container: container
    });

    if (this._renderLink) {
      this._pdfLinkService.setViewer(this._pdfViewer);
    }

    if (this._src) {
      this.loadPDF();
    }
  }

  public loadPDF(src?) {

    if (!src) {
      src = this._src;
    }

    if (src) {

      PDFJS.getDocument(src).then((pdf: PDFDocumentProxy) => {

        this._pdf = pdf;
        this.lastLoaded = src;

        if (this.afterLoadComplete && typeof this.afterLoadComplete === 'function') {
          this.afterLoadComplete(pdf);
        }

        this._pdfViewer.setDocument(this._pdf);
        this._pdfLinkService.setDocument(this._pdf, null);

        this.render();
      });
    }
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
