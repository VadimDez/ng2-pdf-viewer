/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges, OnInit, HostListener, OnDestroy
} from '@angular/core';
import {PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise} from 'pdfjs-dist';

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

export enum RenderTextMode {
  DISABLED,
  ENABLED,
  ENHANCED
}

@Component({
  selector: 'pdf-viewer',
  template: `
    <div class="ng2-pdf-viewer-container">
      <div class="pdfViewer"></div>
    </div>`,
  styleUrls: ['./pdf-viewer.component.scss']
})

export class PdfViewerComponent implements OnChanges, OnInit, OnDestroy {
  static CSS_UNITS: number = 96.0 / 72.0;

  private pdfMultiPageViewer: any;
  private pdfMultiPageLinkService: any;
  private pdfMultiPageFindController: any;

  private pdfSinglePageViewer: any;
  private pdfSinglePageLinkService: any;
  private pdfSinglePageFindController: any;

  private _cMapsUrl = `https://unpkg.com/pdfjs-dist@${ (PDFJS as any).version }/cmaps/`;
  private _renderText = true;
  private _renderTextMode: RenderTextMode = RenderTextMode.ENABLED;
  private _stickToPage = false;
  private _originalSize = true;
  private _pdf: PDFDocumentProxy;
  private _page = 1;
  private _zoom = 1;
  private _rotation = 0;
  private _showAll = true;
  private _canAutoResize = true;
  private _fitToPage = false;
  private _externalLinkTarget = 'blank';
  private lastLoaded: string | Uint8Array | PDFSource;

  private resizeTimeout: NodeJS.Timer;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<PDFDocumentProxy>();
  @Output('page-rendered') pageRendered = new EventEmitter<CustomEvent>();
  @Output('text-layer-rendered') textLayerRendered = new EventEmitter<CustomEvent>();
  @Output('error') onError = new EventEmitter<any>();
  @Output('on-progress') onProgress = new EventEmitter<PDFProgressData>();
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);
  @Input()
  src: string | Uint8Array | PDFSource;

  @Input('c-maps-url')
  set cMapsUrl(cMapsUrl: string) {
    this._cMapsUrl = cMapsUrl;
  }

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

  @Input('render-text-mode')
  set renderTextMode(renderTextMode: RenderTextMode) {
    this._renderTextMode = renderTextMode;
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

  static removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

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
      this.setupMultiPageViewer();
      this.setupSinglePageViewer();
    }
  }

  ngOnDestroy() {
    if (this._pdf) {
      this._pdf.destroy();
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

  @HostListener('textlayerrendered', ['$event']) onTextLayerRendered(e: CustomEvent) {
    this.textLayerRendered.emit(e);
  }

  get pdfLinkService(): any {
    return this._showAll ? this.pdfMultiPageLinkService : this.pdfSinglePageLinkService;
  }

  get pdfViewer(): any {
    return this.getCurrentViewer();
  }

  get pdfFindController(): any {
    return this._showAll ? this.pdfMultiPageFindController : this.pdfSinglePageFindController;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isSSR()) {
      return;
    }

    if ('src' in changes) {
      this.loadPDF();
    } else if (this._pdf) {
      if ('renderText' in changes) {
        this.pdfMultiPageViewer.textLayerMode = this._renderText ? this._renderTextMode : RenderTextMode.DISABLED;
        this.resetPdfDocument();
      } else if ('showAll' in changes) {
        this.resetPdfDocument();
      }
      if ('page' in changes) {
        this.pdfMultiPageViewer.scrollPageIntoView({pageNumber: this._page});
      }

      this.update();
    }
  }

  public updateSize() {
    const currentViewer = this.getCurrentViewer();
    this._pdf.getPage(currentViewer.currentPageNumber).then((page: PDFPageProxy) => {
      const viewport = page.getViewport(this._zoom, this._rotation);
      let scale = this._zoom;
      let stickToPage = true;

      // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
      if (!this._originalSize || (this._fitToPage && viewport.width > this.element.nativeElement.offsetWidth)) {
        scale = this.getScale(page.getViewport(1).width);
        stickToPage = !this._stickToPage;
      }

      currentViewer._setScale(scale, stickToPage);
    });
  }

  private setupMultiPageViewer() {
    (PDFJS as any).disableTextLayer = !this._renderText;

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

    this.pdfMultiPageLinkService = new PDFJSViewer.PDFLinkService();

    const pdfOptions: PDFViewerParams | any = {
      eventBus: new PDFJSViewer.EventBus(),
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: true,
      linkService: this.pdfMultiPageLinkService,
      textLayerMode: this._renderText ? this._renderTextMode : RenderTextMode.DISABLED
    };

    this.pdfMultiPageViewer = new PDFJSViewer.PDFViewer(pdfOptions);
    this.pdfMultiPageLinkService.setViewer(this.pdfMultiPageViewer);
    this.pdfMultiPageFindController = new PDFJSViewer.PDFFindController({pdfViewer: this.pdfMultiPageViewer});
    this.pdfMultiPageViewer.setFindController(this.pdfMultiPageFindController);
  }

  private setupSinglePageViewer() {
    (PDFJS as any).disableTextLayer = !this._renderText;

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

    this.pdfSinglePageLinkService = new PDFJSViewer.PDFLinkService();

    const pdfOptions: PDFViewerParams | any = {
      eventBus: new PDFJSViewer.EventBus(),
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: true,
      linkService: this.pdfSinglePageLinkService,
      textLayerMode: this._renderText ? this._renderTextMode : RenderTextMode.DISABLED
    };


    this.pdfSinglePageViewer = new PDFJSViewer.PDFSinglePageViewer(pdfOptions);
    this.pdfSinglePageLinkService.setViewer(this.pdfSinglePageViewer);
    this.pdfSinglePageFindController = new PDFJSViewer.PDFFindController({pdfViewer: this.pdfSinglePageViewer});
    this.pdfSinglePageViewer.setFindController(this.pdfSinglePageFindController);
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

  private getDocumentParams() {
    const srcType = typeof(this.src);

    if (!this._cMapsUrl) {
      return this.src;
    }

    const params: any = {
      cMapUrl: this._cMapsUrl,
      cMapPacked: true
    };

    if (srcType === 'string') {
      params.url = this.src;
    } else if (srcType === 'object') {
      if ((this.src as any).byteLength !== undefined) {
        params.data = this.src;
      } else {
        Object.assign(params, this.src);
      }
    }

    return params;
  }

  private loadPDF() {
    if (!this.src) {
      return;
    }

    if (this.lastLoaded === this.src) {
      this.update();
      return;
    }

    const loadingTask: any = (PDFJS as any).getDocument(this.getDocumentParams());

    loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.onProgress.emit(progressData);
    };

    const src = this.src;
    (<PDFPromise<PDFDocumentProxy>>loadingTask.promise)
      .then((pdf: PDFDocumentProxy) => {
        if (this._pdf) {
          this._pdf.destroy();
        }
        this._pdf = pdf;
        this.lastLoaded = src;

        this.afterLoadComplete.emit(pdf);

        if (!this.pdfMultiPageViewer) {
          this.setupMultiPageViewer();
          this.setupSinglePageViewer();
        }

        this.resetPdfDocument();

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
    this._page = this.getValidPageNumber(this._page);
    const currentViewer = this.getCurrentViewer();

    if (this._rotation !== 0 || currentViewer.pagesRotation !== this._rotation) {
      setTimeout(() => {
        currentViewer.pagesRotation = this._rotation;
      });
    }

    if (this._stickToPage) {
      setTimeout(() => {
        currentViewer.currentPageNumber = this._page;
      });
    }

    this.updateSize();
  }

  private getScale(viewportWidth: number) {
    const offsetWidth = this.element.nativeElement.offsetWidth;

    if (offsetWidth === 0) {
      return 1;
    }

    return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
  }

  private getCurrentViewer(): any {
    return this._showAll ? this.pdfMultiPageViewer : this.pdfSinglePageViewer;
  }

  private resetPdfDocument() {
    this.pdfFindController.reset();

    if (this._showAll) {
      this.pdfSinglePageViewer.setDocument(null);
      this.pdfSinglePageLinkService.setDocument(null);

      this.pdfMultiPageViewer.setDocument(this._pdf);
      this.pdfMultiPageLinkService.setDocument(this._pdf, null);
    } else {
      this.pdfMultiPageViewer.setDocument(null);
      this.pdfMultiPageLinkService.setDocument(null);

      this.pdfSinglePageViewer.setDocument(this._pdf);
      this.pdfSinglePageLinkService.setDocument(this._pdf, null);
    }

  }
}
