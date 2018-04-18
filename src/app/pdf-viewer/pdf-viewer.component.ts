/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges, OnInit, HostListener
} from '@angular/core';
import { PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise } from 'pdfjs-dist';
let PDFJS: any;
let PDFJSViewer: any;

function isSSR() {
  return typeof window === 'undefined';
}

if (!isSSR()) {
  PDFJS = require('pdfjs-dist/build/pdf');
  PDFJSViewer = require('pdfjs-dist/web/pdf_viewer');

  PDFJS.verbosity = PDFJS.VerbosityLevel.ERRORS;
}

@Component({
  selector: 'pdf-viewer',
  template: `<div class="ng2-pdf-viewer-container"><div class="pdfViewer"></div></div>`,
  styleUrls: ['./pdf-viewer.component.scss']
})

export class PdfViewerComponent implements OnChanges, OnInit {
  static CSS_UNITS: number = 96.0 / 72.0;

  public pdfLinkService: any;
  public pdfViewer: any;
  public pdfFindController: any;

  private _renderText: boolean = true;
  private _stickToPage: boolean = false;
  private _originalSize: boolean = true;
  private _pdf: PDFDocumentProxy;
  private _page: number = 1;
  private _zoom: number = 1;
  private _rotation: number = 0;
  private _showAll: boolean = true;
  private _canAutoResize: boolean = true;
  private _fitToPage: boolean = false;
  private _externalLinkTarget: string = 'blank';
  private lastLoaded: string | Uint8Array | PDFSource;
  private resizeTimeout: NodeJS.Timer;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();
  @Output('page-rendered') pageRendered = new EventEmitter<CustomEvent>();
  @Output('error') onError = new EventEmitter<any>();
  @Output('on-progress') onProgress = new EventEmitter<PDFProgressData>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);

  constructor(private element: ElementRef) {
    if (isSSR()) {
      return;
    }

    let pdfWorkerSrc: string;

    if (window.hasOwnProperty('pdfWorkerSrc') && typeof (window as any).pdfWorkerSrc === 'string' && (window as any).pdfWorkerSrc) {
      pdfWorkerSrc = (window as any).pdfWorkerSrc;
    } else {
      pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (PDFJS as any).version }/pdf.worker.min.js`;
    }

    (PDFJS as any).GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }

  ngOnInit() {
    if (!isSSR()) {
      this.setupViewer();
    }
  }

  @HostListener('window:resize', [])
  public onPageResize() {
    if (!this._canAutoResize || !this._pdf) {
      return;
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateSize();
    }, 100);
  }

  @HostListener('pagerendered', ['$event']) onPageRendered(e: CustomEvent) {
    this.pageRendered.emit(e);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isSSR()) {
      return;
    }

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
    _page = parseInt(_page, 10) || 1;

    if (this._pdf) {
      _page = this.getValidPageNumber(_page);
    }

    this._page = _page;
    this.pageChange.emit(_page);
  }

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
  }

  @Input('autoresize')
  set autoresize(value: boolean) {
    this._canAutoResize = Boolean(value);
  }

  @Input('fit-to-page')
  set fitToPage(value: boolean) {
    this._fitToPage = Boolean(value);
  }

  public setupViewer() {
    (PDFJS as any).disableTextLayer = !this._renderText;

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

    this.pdfLinkService = new PDFJSViewer.PDFLinkService();

    const pdfOptions: PDFViewerParams | any = {
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: true,
      linkService: this.pdfLinkService,
      textLayerMode: this._renderText ? 1 : 0
    };

    this.pdfViewer = new PDFJSViewer.PDFViewer(pdfOptions);
    this.pdfLinkService.setViewer(this.pdfViewer);
    this.pdfFindController = new PDFJSViewer.PDFFindController({ pdfViewer: this.pdfViewer });
    this.pdfViewer.setFindController(this.pdfFindController);
  }

  public updateSize() {
    if (!this._showAll) {
      this.renderPage(this._page);
      return;
    }

    this._pdf.getPage(this.pdfViewer.currentPageNumber).then((page: PDFPageProxy) => {
      const viewport = page.getViewport(this._zoom, this._rotation);
      let scale = this._zoom;
      let stickToPage = true;

      // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
      if (!this._originalSize || (this._fitToPage && viewport.width > this.element.nativeElement.offsetWidth)) {
        scale = this.getScale(page.getViewport(1).width);
        stickToPage = !this._stickToPage;
      }

      this.pdfViewer._setScale(scale, stickToPage);
    });
  }

  private getValidPageNumber(page: number): number {
    if (page < 1) {
      return 1;
    }

    if (page > this._pdf.numPages) {
      return this._pdf.numPages;
    }

    return page;
  }

  static getLinkTarget(type: string) {
    switch (type) {
      case 'blank':
        return (<any>PDFJS).LinkTarget.BLANK;
      case 'none':
        return (<any>PDFJS).LinkTarget.NONE;
      case 'self':
        return (<any>PDFJS).LinkTarget.SELF;
      case 'parent':
        return (<any>PDFJS).LinkTarget.PARENT;
      case 'top':
        return (<any>PDFJS).LinkTarget.TOP;
    }

    return null;
  }

  static setExternalLinkTarget(type: string) {
    const linkTarget = PdfViewerComponent.getLinkTarget(type);

    if (linkTarget !== null) {
      (<any>PDFJS).externalLinkTarget = linkTarget;
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

    let loadingTask: any = (PDFJS as any).getDocument(this.src as any);

    loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.onProgress.emit(progressData);
    };

    const src = this.src;
    (<PDFPromise<PDFDocumentProxy>>loadingTask.promise)
      .then((pdf: PDFDocumentProxy) => {
        this._pdf = pdf;
        this.lastLoaded = src;

        this.afterLoadComplete.emit(pdf);

        this.update();
      }, (error: any) => {
        this.onError.emit(error);
      });
  }

  private update() {
    if (this._showAll) {
      this.setupViewer();

      if (this.pdfViewer) {
        this.pdfViewer.setDocument(this._pdf);
      }
    }

    if (this.pdfLinkService) {
      this.pdfLinkService.setDocument(this._pdf, null);
    }

    this.page = this._page;

    this.render();
  }

  private render() {
    if (this._showAll) {
      this.renderMultiplePages();
    } else {
      this.renderPage(this._page);
    }
  }

  private renderMultiplePages() {
    this._page = this.getValidPageNumber(this._page);

    if (this._rotation !== 0 || this.pdfViewer.pagesRotation !== this._rotation) {
      setTimeout(() => {
        this.pdfViewer.pagesRotation = this._rotation;
      });
    }

    if (this._stickToPage) {
      setTimeout(() => {
        this.pdfViewer.currentPageNumber = this._page;
      });
    }

    this.updateSize();
  }

  private renderPage(pageNumber: number) {
    this._pdf.getPage(pageNumber).then( (page: PDFPageProxy) => {
      let viewport = page.getViewport(this._zoom, this._rotation);
      let container = this.element.nativeElement.querySelector('.pdfViewer');
      let scale = this._zoom;

      // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
      if (!this._originalSize || (this._fitToPage && viewport.width > this.element.nativeElement.offsetWidth)) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width, this._rotation);
        scale = this.getScale(page.getViewport(1).width);
      }

      PdfViewerComponent.removeAllChildNodes(container);

      (<any>PDFJS).disableTextLayer = !this._renderText;

      let pdfOptions: PDFViewerParams | any = {
        container,
        removePageBorders: true,
        defaultViewport: viewport,
        scale,
        id: this._page,
      };

      if (this._renderText) {
        this.pdfLinkService = new PDFJSViewer.PDFLinkService();
        pdfOptions.linkService = this.pdfLinkService;
        PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);
        pdfOptions.textLayerFactory = new PDFJSViewer.DefaultTextLayerFactory();
        pdfOptions.annotationLayerFactory = new PDFJSViewer.DefaultAnnotationLayerFactory();
      }

      let pdfPageView = new PDFJSViewer.PDFPageView(pdfOptions);

      if (this._renderText) {
        this.pdfLinkService.setViewer(pdfPageView);
      }

      if (this._rotation !== 0 || pdfPageView.rotation !== this._rotation) {
        pdfPageView.rotation = this._rotation;
      }

      pdfPageView.setPdfPage(page);
      return pdfPageView.draw();
    });
  }

  static removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  private getScale(viewportWidth: number) {
    const offsetWidth = this.element.nativeElement.offsetWidth;

    if (offsetWidth === 0) {
      return 1;
    }

    return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
  }
}
