/**
 * Created by vadimdez on 21/06/16.
 */
import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
  OnDestroy,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import {
  PDFDocumentProxy,
  PDFViewerParams,
  PDFPageProxy,
  PDFSource,
  PDFProgressData,
  PDFPromise
} from 'pdfjs-dist';

import { createEventBus } from '../utils/event-bus-utils';

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
    <div #pdfViewerContainer class="ng2-pdf-viewer-container">
      <div class="pdfViewer"></div>
    </div>
  `,
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent
  implements OnChanges, OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('pdfViewerContainer', { static: false }) pdfViewerContainer;
  private isVisible: boolean = false;

  static CSS_UNITS: number = 96.0 / 72.0;
  static BORDER_WIDTH: number = 9;

  private pdfMultiPageViewer: any;
  private pdfMultiPageLinkService: any;
  private pdfMultiPageFindController: any;

  private pdfSinglePageViewer: any;
  private pdfSinglePageLinkService: any;
  private pdfSinglePageFindController: any;

  private _cMapsUrl =
    typeof PDFJS !== 'undefined'
      ? `https://unpkg.com/pdfjs-dist@${(PDFJS as any).version}/cmaps/`
      : null;
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
  private _showBorders = false;
  private lastLoaded: string | Uint8Array | PDFSource;
  private _latestScrolledPage: number;

  private resizeTimeout: NodeJS.Timer;
  private pageScrollTimeout: NodeJS.Timer;
  private isInitialized = false;
  private loadingTask: any;

  @Output('after-load-complete') afterLoadComplete = new EventEmitter<
    PDFDocumentProxy
  >();
  @Output('page-rendered') pageRendered = new EventEmitter<CustomEvent>();
  @Output('text-layer-rendered') textLayerRendered = new EventEmitter<
    CustomEvent
  >();
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

  @Input('show-borders')
  set showBorders(value: boolean) {
    this._showBorders = Boolean(value);
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

  constructor(private element: ElementRef) {
    if (isSSR()) {
      return;
    }

    let pdfWorkerSrc: string;

    if (
      window.hasOwnProperty('pdfWorkerSrc') &&
      typeof (window as any).pdfWorkerSrc === 'string' &&
      (window as any).pdfWorkerSrc
    ) {
      pdfWorkerSrc = (window as any).pdfWorkerSrc;
    } else {
      pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
        (PDFJS as any).version
      }/pdf.worker.min.js`;
    }

    (PDFJS as any).GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }

  ngAfterViewChecked(): void {
    if (this.isInitialized) {
      return;
    }

    const offset = this.pdfViewerContainer.nativeElement.offsetParent;

    if (this.isVisible === true && offset == null) {
      this.isVisible = false;
      return;
    }

    if (this.isVisible === false && offset != null) {
      this.isVisible = true;

      setTimeout(() => {
        this.ngOnInit();
        this.ngOnChanges({ src: this.src } as any);
      });
    }
  }

  ngOnInit() {
    if (!isSSR() && this.isVisible) {
      this.isInitialized = true;
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

  get pdfLinkService(): any {
    return this._showAll
      ? this.pdfMultiPageLinkService
      : this.pdfSinglePageLinkService;
  }

  get pdfViewer(): any {
    return this.getCurrentViewer();
  }

  get pdfFindController(): any {
    return this._showAll
      ? this.pdfMultiPageFindController
      : this.pdfSinglePageFindController;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isSSR() || !this.isVisible) {
      return;
    }

    if ('src' in changes) {
      this.loadPDF();
    } else if (this._pdf) {
      if ('renderText' in changes) {
        this.getCurrentViewer().textLayerMode = this._renderText
          ? this._renderTextMode
          : RenderTextMode.DISABLED;
        this.resetPdfDocument();
      } else if ('showAll' in changes) {
        this.resetPdfDocument();
      }
      if ('page' in changes) {
        if (changes['page'].currentValue === this._latestScrolledPage) {
          return;
        }

        // New form of page changing: The viewer will now jump to the specified page when it is changed.
        // This behavior is introducedby using the PDFSinglePageViewer
        this.getCurrentViewer().scrollPageIntoView({ pageNumber: this._page });
      }

      this.update();
    }
  }

  public updateSize() {
    const currentViewer = this.getCurrentViewer();
    this._pdf
      .getPage(currentViewer.currentPageNumber)
      .then((page: PDFPageProxy) => {
        const viewportWidth =
          (page as any).getViewport({
            scale: this._zoom,
            rotation: this._rotation
          }).width * PdfViewerComponent.CSS_UNITS;
        let scale = this._zoom;
        let stickToPage = true;

        // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
        if (
          !this._originalSize ||
          (this._fitToPage &&
            viewportWidth > this.pdfViewerContainer.nativeElement.clientWidth)
        ) {
          scale = this.getScale(
            (page as any).getViewport({ scale: 1, rotation: this._rotation })
              .width
          );
          stickToPage = !this._stickToPage;
        }

        currentViewer._setScale(scale, stickToPage);
      });
  }

  public clear() {
    if (this.loadingTask && !this.loadingTask.destroyed) {
      this.loadingTask.destroy();
    }

    if (this._pdf) {
      this._pdf.destroy();
      this._pdf = null;
      this.pdfMultiPageViewer.setDocument(null);
      this.pdfSinglePageViewer.setDocument(null);

      this.pdfMultiPageLinkService.setDocument(null, null);
      this.pdfSinglePageLinkService.setDocument(null, null);

      this.pdfMultiPageFindController.setDocument(null);
      this.pdfSinglePageFindController.setDocument(null);
    }
  }

  private setupMultiPageViewer() {
    (PDFJS as any).disableTextLayer = !this._renderText;

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

    const eventBus = createEventBus(PDFJSViewer);

    eventBus.on('pagerendered', e => {
      this.pageRendered.emit(e);
    });

    eventBus.on('pagechanging', e => {
      if (this.pageScrollTimeout) {
        clearTimeout(this.pageScrollTimeout);
      }

      this.pageScrollTimeout = setTimeout(() => {
        this._latestScrolledPage = e.pageNumber;
        this.pageChange.emit(e.pageNumber);
      }, 100);
    });

    eventBus.on('textlayerrendered', e => {
      this.textLayerRendered.emit(e);
    });

    this.pdfMultiPageLinkService = new PDFJSViewer.PDFLinkService({ eventBus });
    this.pdfMultiPageFindController = new PDFJSViewer.PDFFindController({
      linkService: this.pdfMultiPageLinkService,
      eventBus
    });

    const pdfOptions: PDFViewerParams | any = {
      eventBus: eventBus,
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: !this._showBorders,
      linkService: this.pdfMultiPageLinkService,
      textLayerMode: this._renderText
        ? this._renderTextMode
        : RenderTextMode.DISABLED,
      findController: this.pdfMultiPageFindController
    };

    this.pdfMultiPageViewer = new PDFJSViewer.PDFViewer(pdfOptions);
    this.pdfMultiPageLinkService.setViewer(this.pdfMultiPageViewer);
    this.pdfMultiPageFindController.setDocument(this._pdf);
  }

  private setupSinglePageViewer() {
    (PDFJS as any).disableTextLayer = !this._renderText;

    PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);

    const eventBus = createEventBus(PDFJSViewer);

    eventBus.on('pagechanging', e => {
      if (e.pageNumber != this._page) {
        this.page = e.pageNumber;
      }
    });

    eventBus.on('pagerendered', e => {
      this.pageRendered.emit(e);
    });

    eventBus.on('textlayerrendered', e => {
      this.textLayerRendered.emit(e);
    });

    this.pdfSinglePageLinkService = new PDFJSViewer.PDFLinkService({
      eventBus
    });
    this.pdfSinglePageFindController = new PDFJSViewer.PDFFindController({
      linkService: this.pdfSinglePageLinkService,
      eventBus
    });

    const pdfOptions: PDFViewerParams | any = {
      eventBus: eventBus,
      container: this.element.nativeElement.querySelector('div'),
      removePageBorders: !this._showBorders,
      linkService: this.pdfSinglePageLinkService,
      textLayerMode: this._renderText
        ? this._renderTextMode
        : RenderTextMode.DISABLED,
      findController: this.pdfSinglePageFindController
    };

    this.pdfSinglePageViewer = new PDFJSViewer.PDFSinglePageViewer(pdfOptions);
    this.pdfSinglePageLinkService.setViewer(this.pdfSinglePageViewer);
    this.pdfSinglePageFindController.setDocument(this._pdf);

    this.pdfSinglePageViewer._currentPageNumber = this._page;
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
    const srcType = typeof this.src;

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

    this.clear();

    this.loadingTask = (PDFJS as any).getDocument(this.getDocumentParams());

    this.loadingTask.onProgress = (progressData: PDFProgressData) => {
      this.onProgress.emit(progressData);
    };

    const src = this.src;
    (<PDFPromise<PDFDocumentProxy>>this.loadingTask.promise).then(
      (pdf: PDFDocumentProxy) => {
        this._pdf = pdf;
        this.lastLoaded = src;

        this.afterLoadComplete.emit(pdf);

        if (!this.pdfMultiPageViewer) {
          this.setupMultiPageViewer();
          this.setupSinglePageViewer();
        }

        this.resetPdfDocument();

        this.update();
      },
      (error: any) => {
        this.onError.emit(error);
      }
    );
  }

  private update() {
    this.page = this._page;

    this.render();
  }

  private render() {
    this._page = this.getValidPageNumber(this._page);
    const currentViewer = this.getCurrentViewer();

    if (
      this._rotation !== 0 ||
      currentViewer.pagesRotation !== this._rotation
    ) {
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
    const pdfContainerWidth =
      this.pdfViewerContainer.nativeElement.clientWidth -
      (this._showBorders ? 2 * PdfViewerComponent.BORDER_WIDTH : 0);

    if (pdfContainerWidth === 0 || viewportWidth === 0) {
      return 1;
    }

    return (
      (this._zoom * (pdfContainerWidth / viewportWidth)) /
      PdfViewerComponent.CSS_UNITS
    );
  }

  private getCurrentViewer(): any {
    return this._showAll ? this.pdfMultiPageViewer : this.pdfSinglePageViewer;
  }

  private resetPdfDocument() {
    this.pdfFindController.setDocument(this._pdf);

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
