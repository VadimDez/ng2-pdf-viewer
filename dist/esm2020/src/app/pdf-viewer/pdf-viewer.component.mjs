/**
 * Created by vadimdez on 21/06/16.
 */
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { from, fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import { createEventBus } from '../utils/event-bus-utils';
import { assign, isSSR } from '../utils/helpers';
import * as i0 from "@angular/core";
if (!isSSR()) {
    assign(PDFJS, 'verbosity', PDFJS.VerbosityLevel.INFOS);
}
export var RenderTextMode;
(function (RenderTextMode) {
    RenderTextMode[RenderTextMode["DISABLED"] = 0] = "DISABLED";
    RenderTextMode[RenderTextMode["ENABLED"] = 1] = "ENABLED";
    RenderTextMode[RenderTextMode["ENHANCED"] = 2] = "ENHANCED";
})(RenderTextMode || (RenderTextMode = {}));
export class PdfViewerComponent {
    constructor(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.isVisible = false;
        this._cMapsUrl = typeof PDFJS !== 'undefined'
            ? `https://unpkg.com/pdfjs-dist@${PDFJS.version}/cmaps/`
            : null;
        this._imageResourcesPath = typeof PDFJS !== 'undefined'
            ? `https://unpkg.com/pdfjs-dist@${PDFJS.version}/web/images/`
            : null;
        this._renderText = true;
        this._renderTextMode = RenderTextMode.ENABLED;
        this._stickToPage = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._zoomScale = 'page-width';
        this._rotation = 0;
        this._showAll = true;
        this._canAutoResize = true;
        this._fitToPage = false;
        this._externalLinkTarget = 'blank';
        this._showBorders = false;
        this.resizeTimeout = null;
        this.pageScrollTimeout = null;
        this.isInitialized = false;
        this.destroy$ = new Subject();
        this.afterLoadComplete = new EventEmitter();
        this.pageRendered = new EventEmitter();
        this.pageInitialized = new EventEmitter();
        this.textLayerRendered = new EventEmitter();
        this.onError = new EventEmitter();
        this.onProgress = new EventEmitter();
        this.pageChange = new EventEmitter(true);
        if (isSSR()) {
            return;
        }
        let pdfWorkerSrc;
        const pdfJsVersion = PDFJS.version;
        const versionSpecificPdfWorkerUrl = window[`pdfWorkerSrc${pdfJsVersion}`];
        if (versionSpecificPdfWorkerUrl) {
            pdfWorkerSrc = versionSpecificPdfWorkerUrl;
        }
        else if (window.hasOwnProperty('pdfWorkerSrc') &&
            typeof window.pdfWorkerSrc === 'string' &&
            window.pdfWorkerSrc) {
            pdfWorkerSrc = window.pdfWorkerSrc;
        }
        else {
            pdfWorkerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfJsVersion}/legacy/build/pdf.worker.min.js`;
        }
        assign(PDFJS.GlobalWorkerOptions, 'workerSrc', pdfWorkerSrc);
    }
    set cMapsUrl(cMapsUrl) {
        this._cMapsUrl = cMapsUrl;
    }
    set page(_page) {
        _page = parseInt(_page, 10) || 1;
        const originalPage = _page;
        if (this._pdf) {
            _page = this.getValidPageNumber(_page);
        }
        this._page = _page;
        if (originalPage !== _page) {
            this.pageChange.emit(_page);
        }
    }
    set renderText(renderText) {
        this._renderText = renderText;
    }
    set renderTextMode(renderTextMode) {
        this._renderTextMode = renderTextMode;
    }
    set originalSize(originalSize) {
        this._originalSize = originalSize;
    }
    set showAll(value) {
        this._showAll = value;
    }
    set stickToPage(value) {
        this._stickToPage = value;
    }
    set zoom(value) {
        if (value <= 0) {
            return;
        }
        this._zoom = value;
    }
    get zoom() {
        return this._zoom;
    }
    set zoomScale(value) {
        this._zoomScale = value;
    }
    get zoomScale() {
        return this._zoomScale;
    }
    set rotation(value) {
        if (!(typeof value === 'number' && value % 90 === 0)) {
            console.warn('Invalid pages rotation angle.');
            return;
        }
        this._rotation = value;
    }
    set externalLinkTarget(value) {
        this._externalLinkTarget = value;
    }
    set autoresize(value) {
        this._canAutoResize = Boolean(value);
    }
    set fitToPage(value) {
        this._fitToPage = Boolean(value);
    }
    set showBorders(value) {
        this._showBorders = Boolean(value);
    }
    static getLinkTarget(type) {
        switch (type) {
            case 'blank':
                return PDFJSViewer.LinkTarget.BLANK;
            case 'none':
                return PDFJSViewer.LinkTarget.NONE;
            case 'self':
                return PDFJSViewer.LinkTarget.SELF;
            case 'parent':
                return PDFJSViewer.LinkTarget.PARENT;
            case 'top':
                return PDFJSViewer.LinkTarget.TOP;
        }
        return null;
    }
    ngAfterViewChecked() {
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
                this.initialize();
                this.ngOnChanges({ src: this.src });
            });
        }
    }
    ngOnInit() {
        this.initialize();
        this.setupResizeListener();
    }
    ngOnDestroy() {
        this.clear();
        this.destroy$.next();
        this.loadingTask = null;
    }
    ngOnChanges(changes) {
        if (isSSR() || !this.isVisible) {
            return;
        }
        if ('src' in changes) {
            this.loadPDF();
        }
        else if (this._pdf) {
            if ('renderText' in changes) {
                this.pdfViewer.textLayerMode = this._renderText
                    ? this._renderTextMode
                    : RenderTextMode.DISABLED;
                this.resetPdfDocument();
            }
            else if ('showAll' in changes) {
                this.setupViewer();
                this.resetPdfDocument();
            }
            if ('page' in changes) {
                const { page } = changes;
                if (page.currentValue === this._latestScrolledPage) {
                    return;
                }
                // New form of page changing: The viewer will now jump to the specified page when it is changed.
                // This behavior is introduced by using the PDFSinglePageViewer
                this.pdfViewer.scrollPageIntoView({ pageNumber: this._page });
            }
            this.update();
        }
    }
    updateSize() {
        from(this._pdf.getPage(this.pdfViewer.currentPageNumber))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (page) => {
                const rotation = this._rotation || page.rotate;
                const viewportWidth = page.getViewport({
                    scale: this._zoom,
                    rotation
                }).width * PdfViewerComponent.CSS_UNITS;
                let scale = this._zoom;
                let stickToPage = true;
                // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
                if (!this._originalSize ||
                    (this._fitToPage &&
                        viewportWidth > this.pdfViewerContainer.nativeElement.clientWidth)) {
                    const viewPort = page.getViewport({ scale: 1, rotation });
                    scale = this.getScale(viewPort.width, viewPort.height);
                    stickToPage = !this._stickToPage;
                }
                this.pdfViewer._setScale(scale, stickToPage);
            }
        });
    }
    clear() {
        if (this.loadingTask && !this.loadingTask.destroyed) {
            this.loadingTask.destroy();
        }
        if (this._pdf) {
            this._latestScrolledPage = 0;
            this._pdf.destroy();
            this._pdf = null;
            this.pdfViewer.setDocument(null);
            this.pdfLinkService.setDocument(null, null);
            this.pdfFindController.setDocument(null);
        }
    }
    getPDFLinkServiceConfig() {
        const linkTarget = PdfViewerComponent.getLinkTarget(this._externalLinkTarget);
        if (linkTarget) {
            return { externalLinkTarget: linkTarget };
        }
        return {};
    }
    initEventBus() {
        this.eventBus = createEventBus(PDFJSViewer, this.destroy$);
        fromEvent(this.eventBus, 'pagerendered')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.pageRendered.emit(event);
        });
        fromEvent(this.eventBus, 'pagesinit')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.pageInitialized.emit(event);
        });
        fromEvent(this.eventBus, 'pagechanging')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ pageNumber }) => {
            if (this.pageScrollTimeout) {
                clearTimeout(this.pageScrollTimeout);
            }
            this.pageScrollTimeout = window.setTimeout(() => {
                this._latestScrolledPage = pageNumber;
                this.pageChange.emit(pageNumber);
            }, 100);
        });
        fromEvent(this.eventBus, 'textlayerrendered')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.textLayerRendered.emit(event);
        });
    }
    initPDFServices() {
        this.pdfLinkService = new PDFJSViewer.PDFLinkService({
            eventBus: this.eventBus,
            ...this.getPDFLinkServiceConfig()
        });
        this.pdfFindController = new PDFJSViewer.PDFFindController({
            eventBus: this.eventBus,
            linkService: this.pdfLinkService,
        });
    }
    getPDFOptions() {
        return {
            eventBus: this.eventBus,
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: !this._showBorders,
            linkService: this.pdfLinkService,
            textLayerMode: this._renderText
                ? this._renderTextMode
                : RenderTextMode.DISABLED,
            findController: this.pdfFindController,
            renderer: 'canvas',
            l10n: undefined,
            imageResourcesPath: this._imageResourcesPath,
        };
    }
    setupViewer() {
        assign(PDFJS, 'disableTextLayer', !this._renderText);
        this.initPDFServices();
        if (this._showAll) {
            this.pdfViewer = new PDFJSViewer.PDFViewer(this.getPDFOptions());
        }
        else {
            this.pdfViewer = new PDFJSViewer.PDFSinglePageViewer(this.getPDFOptions());
        }
        this.pdfLinkService.setViewer(this.pdfViewer);
        this.pdfViewer._currentPageNumber = this._page;
    }
    getValidPageNumber(page) {
        if (page < 1) {
            return 1;
        }
        if (page > this._pdf.numPages) {
            return this._pdf.numPages;
        }
        return page;
    }
    getDocumentParams() {
        const srcType = typeof this.src;
        if (!this._cMapsUrl) {
            return this.src;
        }
        const params = {
            cMapUrl: this._cMapsUrl,
            cMapPacked: true,
            enableXfa: true
        };
        if (srcType === 'string') {
            params.url = this.src;
        }
        else if (srcType === 'object') {
            if (this.src.byteLength !== undefined) {
                params.data = this.src;
            }
            else {
                Object.assign(params, this.src);
            }
        }
        return params;
    }
    loadPDF() {
        if (!this.src) {
            return;
        }
        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }
        this.clear();
        if (!this.isInitialized) {
            this.initialize();
        }
        this.setupViewer();
        this.loadingTask = PDFJS.getDocument(this.getDocumentParams());
        this.loadingTask.onProgress = (progressData) => {
            this.onProgress.emit(progressData);
        };
        const src = this.src;
        from(this.loadingTask.promise)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
            next: (pdf) => {
                this._pdf = pdf;
                this.lastLoaded = src;
                this.afterLoadComplete.emit(pdf);
                this.resetPdfDocument();
                this.update();
            },
            error: (error) => {
                this.lastLoaded = null;
                this.onError.emit(error);
            }
        });
    }
    update() {
        this.page = this._page;
        this.render();
    }
    render() {
        this._page = this.getValidPageNumber(this._page);
        if (this._rotation !== 0 ||
            this.pdfViewer.pagesRotation !== this._rotation) {
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
    getScale(viewportWidth, viewportHeight) {
        const borderSize = this._showBorders ? 2 * PdfViewerComponent.BORDER_WIDTH : 0;
        const pdfContainerWidth = this.pdfViewerContainer.nativeElement.clientWidth - borderSize;
        const pdfContainerHeight = this.pdfViewerContainer.nativeElement.clientHeight - borderSize;
        if (pdfContainerHeight === 0 ||
            viewportHeight === 0 ||
            pdfContainerWidth === 0 ||
            viewportWidth === 0) {
            return 1;
        }
        let ratio = 1;
        switch (this._zoomScale) {
            case 'page-fit':
                ratio = Math.min(pdfContainerHeight / viewportHeight, pdfContainerWidth / viewportWidth);
                break;
            case 'page-height':
                ratio = pdfContainerHeight / viewportHeight;
                break;
            case 'page-width':
            default:
                ratio = pdfContainerWidth / viewportWidth;
                break;
        }
        return (this._zoom * ratio) / PdfViewerComponent.CSS_UNITS;
    }
    resetPdfDocument() {
        this.pdfLinkService.setDocument(this._pdf, null);
        this.pdfFindController.setDocument(this._pdf);
        this.pdfViewer.setDocument(this._pdf);
    }
    initialize() {
        if (isSSR() || !this.isVisible) {
            return;
        }
        this.isInitialized = true;
        this.initEventBus();
        this.setupViewer();
    }
    setupResizeListener() {
        if (isSSR()) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(debounceTime(100), filter(() => this._canAutoResize && !!this._pdf), takeUntil(this.destroy$))
                .subscribe(() => {
                this.updateSize();
            });
        });
    }
}
PdfViewerComponent.CSS_UNITS = 96.0 / 72.0;
PdfViewerComponent.BORDER_WIDTH = 9;
PdfViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: PdfViewerComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
PdfViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: PdfViewerComponent, selector: "pdf-viewer", inputs: { src: "src", cMapsUrl: ["c-maps-url", "cMapsUrl"], page: "page", renderText: ["render-text", "renderText"], renderTextMode: ["render-text-mode", "renderTextMode"], originalSize: ["original-size", "originalSize"], showAll: ["show-all", "showAll"], stickToPage: ["stick-to-page", "stickToPage"], zoom: "zoom", zoomScale: ["zoom-scale", "zoomScale"], rotation: "rotation", externalLinkTarget: ["external-link-target", "externalLinkTarget"], autoresize: "autoresize", fitToPage: ["fit-to-page", "fitToPage"], showBorders: ["show-borders", "showBorders"] }, outputs: { afterLoadComplete: "after-load-complete", pageRendered: "page-rendered", pageInitialized: "pages-initialized", textLayerRendered: "text-layer-rendered", onError: "error", onProgress: "on-progress", pageChange: "pageChange" }, viewQueries: [{ propertyName: "pdfViewerContainer", first: true, predicate: ["pdfViewerContainer"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #pdfViewerContainer class="ng2-pdf-viewer-container">
      <div class="pdfViewer"></div>
    </div>
  `, isInline: true, styles: [".ng2-pdf-viewer-container{overflow-x:auto;position:absolute;height:100%;width:100%;-webkit-overflow-scrolling:touch}:host{display:block;position:relative}:host ::ng-deep{--pdfViewer-padding-bottom: 0;--page-margin: 1px auto -8px;--page-border: 9px solid transparent;--spreadHorizontalWrapped-margin-LR: -3.5px;--zoom-factor: 1;--viewport-scale-factor: 1;--shadow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAA1ElEQVQ4jbWUWw6EIAxFy2NFs/8NzR4UJhpqLsdi5mOmSSMUOfYWqv3S0gMr4XlYH/64gZa/gN3ANYA7KAXALt4ktoQ5MI9YxqaG8bWmsIysMuT6piSQCa4whZThCu8CM4zP9YJaKci9jicPq3NcBWYoPMGUlhG7ivtkB+gVyFY75wXghOvh8t5mto1Mdim6e+MBqH6XsY+YAwjpq3vGF7weTWQptLEDVCZvPTMl5JZZsdh47FHW6qFMyvLYqjcnmdFfY9Xk/KDOlzCusX2mi/ofM7MPkzBcSp4Q1/wAAAAASUVORK5CYII=);--viewer-container-height: 0;--annotation-unfocused-field-background: url(\"data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>\");--xfa-unfocused-field-background: url(\"data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>\")}@media screen and (forced-colors: active){:host ::ng-deep{--pdfViewer-padding-bottom: 9px;--page-margin: 9px auto 0;--page-border: none;--spreadHorizontalWrapped-margin-LR: 4.5px}}:host ::ng-deep .textLayer{position:absolute;text-align:initial;left:0;top:0;right:0;bottom:0;overflow:hidden;opacity:.2;line-height:1;-webkit-text-size-adjust:none;text-size-adjust:none;forced-color-adjust:none}:host ::ng-deep .textLayer span,:host ::ng-deep .textLayer br{color:transparent;position:absolute;white-space:pre;cursor:text;transform-origin:0% 0%}:host ::ng-deep .textLayer span.markedContent{top:0;height:0}:host ::ng-deep .textLayer .highlight{margin:-1px;padding:1px;background-color:#b400aa;border-radius:4px}:host ::ng-deep .textLayer .highlight.appended{position:initial}:host ::ng-deep .textLayer .highlight.begin{border-radius:4px 0 0 4px}:host ::ng-deep .textLayer .highlight.end{border-radius:0 4px 4px 0}:host ::ng-deep .textLayer .highlight.middle{border-radius:0}:host ::ng-deep .textLayer .highlight.selected{background-color:#006400}:host ::ng-deep .textLayer ::selection{background:blue}:host ::ng-deep .textLayer br::selection{background:transparent}:host ::ng-deep .textLayer .endOfContent{display:block;position:absolute;left:0;top:100%;right:0;bottom:0;z-index:-1;cursor:default;-webkit-user-select:none;user-select:none}:host ::ng-deep .textLayer .endOfContent.active{top:0}:host ::ng-deep .annotationLayer section{position:absolute;text-align:initial}:host ::ng-deep .annotationLayer .linkAnnotation>a,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>a{position:absolute;font-size:1em;top:0;left:0;width:100%;height:100%}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>canvas{position:relative;top:0;left:0;z-index:-1}:host ::ng-deep .annotationLayer .linkAnnotation>a:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>a:hover{opacity:.2;background:yellow;box-shadow:0 2px 10px #ff0}:host ::ng-deep .annotationLayer .textAnnotation img{position:absolute;cursor:pointer}:host ::ng-deep .annotationLayer .textWidgetAnnotation input,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{background-image:var(--annotation-unfocused-field-background);border:1px solid transparent;box-sizing:border-box;font-size:9px;height:100%;margin:0;padding:0 3px;vertical-align:top;width:100%}:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select option{padding:0}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{border-radius:50%}:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea{font:message-box;font-size:9px;resize:none}:host ::ng-deep .annotationLayer .textWidgetAnnotation input[disabled],:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea[disabled],:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select[disabled],:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled]{background:none;border:1px solid transparent;cursor:not-allowed}:host ::ng-deep .annotationLayer .textWidgetAnnotation input:hover,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea:hover,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:hover{border:1px solid black}:host ::ng-deep .annotationLayer .textWidgetAnnotation input:focus,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea:focus,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select:focus{background:none;border:1px solid transparent}:host ::ng-deep .annotationLayer .textWidgetAnnotation input :focus,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea :focus,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select :focus,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox :focus,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton :focus{background-image:none;background-color:transparent;outline:auto}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before{background-color:#000;content:\"\";display:block;position:absolute}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after{height:80%;left:45%;width:1px}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before{transform:rotate(45deg)}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after{transform:rotate(-45deg)}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before{border-radius:50%;height:50%;left:30%;top:20%;width:50%}:host ::ng-deep .annotationLayer .textWidgetAnnotation input.comb{font-family:monospace;padding-left:2px;padding-right:0}:host ::ng-deep .annotationLayer .textWidgetAnnotation input.comb:focus{width:103%}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0}:host ::ng-deep .annotationLayer .popupWrapper{position:absolute;width:20em}:host ::ng-deep .annotationLayer .popup{position:absolute;z-index:200;max-width:20em;background-color:#ff9;box-shadow:0 2px 5px #888;border-radius:2px;padding:6px;margin-left:5px;cursor:pointer;font:message-box;font-size:9px;white-space:normal;word-wrap:break-word}:host ::ng-deep .annotationLayer .popup>*{font-size:9px}:host ::ng-deep .annotationLayer .popup h1{display:inline-block}:host ::ng-deep .annotationLayer .popupDate{display:inline-block;margin-left:5px}:host ::ng-deep .annotationLayer .popupContent{border-top:1px solid #333333;margin-top:2px;padding-top:2px}:host ::ng-deep .annotationLayer .richText>*{white-space:pre-wrap}:host ::ng-deep .annotationLayer .highlightAnnotation,:host ::ng-deep .annotationLayer .underlineAnnotation,:host ::ng-deep .annotationLayer .squigglyAnnotation,:host ::ng-deep .annotationLayer .strikeoutAnnotation,:host ::ng-deep .annotationLayer .freeTextAnnotation,:host ::ng-deep .annotationLayer .lineAnnotation svg line,:host ::ng-deep .annotationLayer .squareAnnotation svg rect,:host ::ng-deep .annotationLayer .circleAnnotation svg ellipse,:host ::ng-deep .annotationLayer .polylineAnnotation svg polyline,:host ::ng-deep .annotationLayer .polygonAnnotation svg polygon,:host ::ng-deep .annotationLayer .caretAnnotation,:host ::ng-deep .annotationLayer .inkAnnotation svg polyline,:host ::ng-deep .annotationLayer .stampAnnotation,:host ::ng-deep .annotationLayer .fileAttachmentAnnotation{cursor:pointer}:host ::ng-deep .xfaLayer .highlight{margin:-1px;padding:1px;background-color:#efcbed;border-radius:4px}:host ::ng-deep .xfaLayer .highlight.appended{position:initial}:host ::ng-deep .xfaLayer .highlight.begin{border-radius:4px 0 0 4px}:host ::ng-deep .xfaLayer .highlight.end{border-radius:0 4px 4px 0}:host ::ng-deep .xfaLayer .highlight.middle{border-radius:0}:host ::ng-deep .xfaLayer .highlight.selected{background-color:#cbdfcb}:host ::ng-deep .xfaLayer ::selection{background:blue}:host ::ng-deep .xfaPage{overflow:hidden;position:relative}:host ::ng-deep .xfaContentarea{position:absolute}:host ::ng-deep .xfaPrintOnly{display:none}:host ::ng-deep .xfaLayer{position:absolute;text-align:initial;top:0;left:0;transform-origin:0 0;line-height:1.2}:host ::ng-deep .xfaLayer *{color:inherit;font:inherit;font-style:inherit;font-weight:inherit;font-feature-settings:inherit;font-kerning:inherit;letter-spacing:-.01px;text-align:inherit;text-decoration:inherit;box-sizing:border-box;background-color:transparent;padding:0;margin:0;pointer-events:auto;line-height:inherit}:host ::ng-deep .xfaLayer div{pointer-events:none}:host ::ng-deep .xfaLayer svg{pointer-events:none}:host ::ng-deep .xfaLayer svg *{pointer-events:none}:host ::ng-deep .xfaLayer a{color:#00f}:host ::ng-deep .xfaRich li{margin-left:3em}:host ::ng-deep .xfaFont{color:#000;font-weight:400;font-feature-settings:\"kern\" off;font-kerning:none;font-size:10px;font-style:normal;letter-spacing:0;text-decoration:none;vertical-align:0}:host ::ng-deep .xfaCaption{overflow:hidden;flex:0 0 auto}:host ::ng-deep .xfaCaptionForCheckButton{overflow:hidden;flex:1 1 auto}:host ::ng-deep .xfaLabel{height:100%;width:100%}:host ::ng-deep .xfaLeft{display:flex;flex-direction:row;align-items:center}:host ::ng-deep .xfaRight{display:flex;flex-direction:row-reverse;align-items:center}:host ::ng-deep .xfaLeft>.xfaCaption,:host ::ng-deep .xfaLeft>.xfaCaptionForCheckButton,:host ::ng-deep .xfaRight>.xfaCaption,:host ::ng-deep .xfaRight>.xfaCaptionForCheckButton{max-height:100%}:host ::ng-deep .xfaTop{display:flex;flex-direction:column;align-items:flex-start}:host ::ng-deep .xfaBottom{display:flex;flex-direction:column-reverse;align-items:flex-start}:host ::ng-deep .xfaTop>.xfaCaption,:host ::ng-deep .xfaTop>.xfaCaptionForCheckButton,:host ::ng-deep .xfaBottom>.xfaCaption,:host ::ng-deep .xfaBottom>.xfaCaptionForCheckButton{width:100%}:host ::ng-deep .xfaBorder{background-color:transparent;position:absolute;pointer-events:none}:host ::ng-deep .xfaWrapped{width:100%;height:100%}:host ::ng-deep .xfaTextfield:focus,:host ::ng-deep .xfaSelect:focus{background-image:none;background-color:transparent;outline:auto;outline-offset:-1px}:host ::ng-deep .xfaCheckbox:focus,:host ::ng-deep .xfaRadio:focus{outline:auto}:host ::ng-deep .xfaTextfield,:host ::ng-deep .xfaSelect{height:100%;width:100%;flex:1 1 auto;border:none;resize:none;background-image:var(--xfa-unfocused-field-background)}:host ::ng-deep .xfaTop>.xfaTextfield,:host ::ng-deep .xfaTop>.xfaSelect,:host ::ng-deep .xfaBottom>.xfaTextfield,:host ::ng-deep .xfaBottom>.xfaSelect{flex:0 1 auto}:host ::ng-deep .xfaButton{cursor:pointer;width:100%;height:100%;border:none;text-align:center}:host ::ng-deep .xfaLink{width:100%;height:100%;position:absolute;top:0;left:0}:host ::ng-deep .xfaCheckbox,:host ::ng-deep .xfaRadio{width:100%;height:100%;flex:0 0 auto;border:none}:host ::ng-deep .xfaRich{white-space:pre-wrap;width:100%;height:100%}:host ::ng-deep .xfaImage{object-position:left top;object-fit:contain;width:100%;height:100%}:host ::ng-deep .xfaLrTb,:host ::ng-deep .xfaRlTb,:host ::ng-deep .xfaTb{display:flex;flex-direction:column;align-items:stretch}:host ::ng-deep .xfaLr{display:flex;flex-direction:row;align-items:stretch}:host ::ng-deep .xfaRl{display:flex;flex-direction:row-reverse;align-items:stretch}:host ::ng-deep .xfaTb>div{justify-content:left}:host ::ng-deep .xfaPosition{position:relative}:host ::ng-deep .xfaArea{position:relative}:host ::ng-deep .xfaValignMiddle{display:flex;align-items:center}:host ::ng-deep .xfaTable{display:flex;flex-direction:column;align-items:stretch}:host ::ng-deep .xfaTable .xfaRow{display:flex;flex-direction:row;align-items:stretch}:host ::ng-deep .xfaTable .xfaRlRow{display:flex;flex-direction:row-reverse;align-items:stretch;flex:1}:host ::ng-deep .xfaTable .xfaRlRow>div{flex:1}:host ::ng-deep .xfaNonInteractive input,:host ::ng-deep .xfaNonInteractive textarea,:host ::ng-deep .xfaDisabled input,:host ::ng-deep .xfaDisabled textarea,:host ::ng-deep .xfaReadOnly input,:host ::ng-deep .xfaReadOnly textarea{background:initial}@media print{:host ::ng-deep .xfaTextfield,:host ::ng-deep .xfaSelect{background:transparent}:host ::ng-deep .xfaSelect{-webkit-appearance:none;-moz-appearance:none;appearance:none;text-indent:1px;text-overflow:\"\"}}:host ::ng-deep .pdfViewer{padding-bottom:var(--pdfViewer-padding-bottom)}:host ::ng-deep .pdfViewer .canvasWrapper{overflow:hidden}:host ::ng-deep .pdfViewer .page{direction:ltr;width:816px;height:1056px;margin:var(--page-margin);position:relative;overflow:visible;border:var(--page-border);background-clip:content-box;border-image:var(--shadow) 9 9 repeat;background-color:#fff}:host ::ng-deep .pdfViewer .dummyPage{position:relative;width:0;height:var(--viewer-container-height)}:host ::ng-deep .pdfViewer.removePageBorders .page{margin:0 auto 10px;border:none}:host ::ng-deep .pdfViewer.singlePageView{display:inline-block}:host ::ng-deep .pdfViewer.singlePageView .page{margin:0;border:none}:host ::ng-deep .pdfViewer.scrollHorizontal,:host ::ng-deep .pdfViewer.scrollWrapped,:host ::ng-deep .spread{margin-left:3.5px;margin-right:3.5px;text-align:center}:host ::ng-deep .pdfViewer.scrollHorizontal,:host ::ng-deep .spread{white-space:nowrap}:host ::ng-deep .pdfViewer.removePageBorders,:host ::ng-deep .pdfViewer.scrollHorizontal .spread,:host ::ng-deep .pdfViewer.scrollWrapped .spread{margin-left:0;margin-right:0}:host ::ng-deep .spread .page,:host ::ng-deep .spread .dummyPage,:host ::ng-deep .pdfViewer.scrollHorizontal .page,:host ::ng-deep .pdfViewer.scrollWrapped .page,:host ::ng-deep .pdfViewer.scrollHorizontal .spread,:host ::ng-deep .pdfViewer.scrollWrapped .spread{display:inline-block;vertical-align:middle}:host ::ng-deep .spread .page,:host ::ng-deep .pdfViewer.scrollHorizontal .page,:host ::ng-deep .pdfViewer.scrollWrapped .page{margin-left:var(--spreadHorizontalWrapped-margin-LR);margin-right:var(--spreadHorizontalWrapped-margin-LR)}:host ::ng-deep .pdfViewer.removePageBorders .spread .page,:host ::ng-deep .pdfViewer.removePageBorders.scrollHorizontal .page,:host ::ng-deep .pdfViewer.removePageBorders.scrollWrapped .page{margin-left:5px;margin-right:5px}:host ::ng-deep .pdfViewer .page canvas{margin:0;display:block}:host ::ng-deep .pdfViewer .page canvas[hidden]{display:none}:host ::ng-deep .pdfViewer .page .loadingIcon{position:absolute;display:block;left:0;top:0;right:0;bottom:0;background:url(data:image/gif;base64,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) center no-repeat}:host ::ng-deep .pdfViewer .page .loadingIcon.notVisible{background:none}:host ::ng-deep .pdfViewer.enablePermissions .textLayer span{-webkit-user-select:none!important;user-select:none!important;cursor:not-allowed}:host ::ng-deep .pdfPresentationMode .pdfViewer{padding-bottom:0}:host ::ng-deep .pdfPresentationMode .spread{margin:0}:host ::ng-deep .pdfPresentationMode .pdfViewer .page{margin:0 auto;border:2px solid transparent}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: PdfViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'pdf-viewer', template: `
    <div #pdfViewerContainer class="ng2-pdf-viewer-container">
      <div class="pdfViewer"></div>
    </div>
  `, styles: [".ng2-pdf-viewer-container{overflow-x:auto;position:absolute;height:100%;width:100%;-webkit-overflow-scrolling:touch}:host{display:block;position:relative}:host ::ng-deep{--pdfViewer-padding-bottom: 0;--page-margin: 1px auto -8px;--page-border: 9px solid transparent;--spreadHorizontalWrapped-margin-LR: -3.5px;--zoom-factor: 1;--viewport-scale-factor: 1;--shadow: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAA1ElEQVQ4jbWUWw6EIAxFy2NFs/8NzR4UJhpqLsdi5mOmSSMUOfYWqv3S0gMr4XlYH/64gZa/gN3ANYA7KAXALt4ktoQ5MI9YxqaG8bWmsIysMuT6piSQCa4whZThCu8CM4zP9YJaKci9jicPq3NcBWYoPMGUlhG7ivtkB+gVyFY75wXghOvh8t5mto1Mdim6e+MBqH6XsY+YAwjpq3vGF7weTWQptLEDVCZvPTMl5JZZsdh47FHW6qFMyvLYqjcnmdFfY9Xk/KDOlzCusX2mi/ofM7MPkzBcSp4Q1/wAAAAASUVORK5CYII=);--viewer-container-height: 0;--annotation-unfocused-field-background: url(\"data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>\");--xfa-unfocused-field-background: url(\"data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>\")}@media screen and (forced-colors: active){:host ::ng-deep{--pdfViewer-padding-bottom: 9px;--page-margin: 9px auto 0;--page-border: none;--spreadHorizontalWrapped-margin-LR: 4.5px}}:host ::ng-deep .textLayer{position:absolute;text-align:initial;left:0;top:0;right:0;bottom:0;overflow:hidden;opacity:.2;line-height:1;-webkit-text-size-adjust:none;text-size-adjust:none;forced-color-adjust:none}:host ::ng-deep .textLayer span,:host ::ng-deep .textLayer br{color:transparent;position:absolute;white-space:pre;cursor:text;transform-origin:0% 0%}:host ::ng-deep .textLayer span.markedContent{top:0;height:0}:host ::ng-deep .textLayer .highlight{margin:-1px;padding:1px;background-color:#b400aa;border-radius:4px}:host ::ng-deep .textLayer .highlight.appended{position:initial}:host ::ng-deep .textLayer .highlight.begin{border-radius:4px 0 0 4px}:host ::ng-deep .textLayer .highlight.end{border-radius:0 4px 4px 0}:host ::ng-deep .textLayer .highlight.middle{border-radius:0}:host ::ng-deep .textLayer .highlight.selected{background-color:#006400}:host ::ng-deep .textLayer ::selection{background:blue}:host ::ng-deep .textLayer br::selection{background:transparent}:host ::ng-deep .textLayer .endOfContent{display:block;position:absolute;left:0;top:100%;right:0;bottom:0;z-index:-1;cursor:default;-webkit-user-select:none;user-select:none}:host ::ng-deep .textLayer .endOfContent.active{top:0}:host ::ng-deep .annotationLayer section{position:absolute;text-align:initial}:host ::ng-deep .annotationLayer .linkAnnotation>a,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>a{position:absolute;font-size:1em;top:0;left:0;width:100%;height:100%}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>canvas{position:relative;top:0;left:0;z-index:-1}:host ::ng-deep .annotationLayer .linkAnnotation>a:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.pushButton>a:hover{opacity:.2;background:yellow;box-shadow:0 2px 10px #ff0}:host ::ng-deep .annotationLayer .textAnnotation img{position:absolute;cursor:pointer}:host ::ng-deep .annotationLayer .textWidgetAnnotation input,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{background-image:var(--annotation-unfocused-field-background);border:1px solid transparent;box-sizing:border-box;font-size:9px;height:100%;margin:0;padding:0 3px;vertical-align:top;width:100%}:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select option{padding:0}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{border-radius:50%}:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea{font:message-box;font-size:9px;resize:none}:host ::ng-deep .annotationLayer .textWidgetAnnotation input[disabled],:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea[disabled],:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select[disabled],:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled]{background:none;border:1px solid transparent;cursor:not-allowed}:host ::ng-deep .annotationLayer .textWidgetAnnotation input:hover,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea:hover,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:hover{border:1px solid black}:host ::ng-deep .annotationLayer .textWidgetAnnotation input:focus,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea:focus,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select:focus{background:none;border:1px solid transparent}:host ::ng-deep .annotationLayer .textWidgetAnnotation input :focus,:host ::ng-deep .annotationLayer .textWidgetAnnotation textarea :focus,:host ::ng-deep .annotationLayer .choiceWidgetAnnotation select :focus,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox :focus,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton :focus{background-image:none;background-color:transparent;outline:auto}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before{background-color:#000;content:\"\";display:block;position:absolute}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after{height:80%;left:45%;width:1px}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:before{transform:rotate(45deg)}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input:checked:after{transform:rotate(-45deg)}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input:checked:before{border-radius:50%;height:50%;left:30%;top:20%;width:50%}:host ::ng-deep .annotationLayer .textWidgetAnnotation input.comb{font-family:monospace;padding-left:2px;padding-right:0}:host ::ng-deep .annotationLayer .textWidgetAnnotation input.comb:focus{width:103%}:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.checkBox input,:host ::ng-deep .annotationLayer .buttonWidgetAnnotation.radioButton input{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0}:host ::ng-deep .annotationLayer .popupWrapper{position:absolute;width:20em}:host ::ng-deep .annotationLayer .popup{position:absolute;z-index:200;max-width:20em;background-color:#ff9;box-shadow:0 2px 5px #888;border-radius:2px;padding:6px;margin-left:5px;cursor:pointer;font:message-box;font-size:9px;white-space:normal;word-wrap:break-word}:host ::ng-deep .annotationLayer .popup>*{font-size:9px}:host ::ng-deep .annotationLayer .popup h1{display:inline-block}:host ::ng-deep .annotationLayer .popupDate{display:inline-block;margin-left:5px}:host ::ng-deep .annotationLayer .popupContent{border-top:1px solid #333333;margin-top:2px;padding-top:2px}:host ::ng-deep .annotationLayer .richText>*{white-space:pre-wrap}:host ::ng-deep .annotationLayer .highlightAnnotation,:host ::ng-deep .annotationLayer .underlineAnnotation,:host ::ng-deep .annotationLayer .squigglyAnnotation,:host ::ng-deep .annotationLayer .strikeoutAnnotation,:host ::ng-deep .annotationLayer .freeTextAnnotation,:host ::ng-deep .annotationLayer .lineAnnotation svg line,:host ::ng-deep .annotationLayer .squareAnnotation svg rect,:host ::ng-deep .annotationLayer .circleAnnotation svg ellipse,:host ::ng-deep .annotationLayer .polylineAnnotation svg polyline,:host ::ng-deep .annotationLayer .polygonAnnotation svg polygon,:host ::ng-deep .annotationLayer .caretAnnotation,:host ::ng-deep .annotationLayer .inkAnnotation svg polyline,:host ::ng-deep .annotationLayer .stampAnnotation,:host ::ng-deep .annotationLayer .fileAttachmentAnnotation{cursor:pointer}:host ::ng-deep .xfaLayer .highlight{margin:-1px;padding:1px;background-color:#efcbed;border-radius:4px}:host ::ng-deep .xfaLayer .highlight.appended{position:initial}:host ::ng-deep .xfaLayer .highlight.begin{border-radius:4px 0 0 4px}:host ::ng-deep .xfaLayer .highlight.end{border-radius:0 4px 4px 0}:host ::ng-deep .xfaLayer .highlight.middle{border-radius:0}:host ::ng-deep .xfaLayer .highlight.selected{background-color:#cbdfcb}:host ::ng-deep .xfaLayer ::selection{background:blue}:host ::ng-deep .xfaPage{overflow:hidden;position:relative}:host ::ng-deep .xfaContentarea{position:absolute}:host ::ng-deep .xfaPrintOnly{display:none}:host ::ng-deep .xfaLayer{position:absolute;text-align:initial;top:0;left:0;transform-origin:0 0;line-height:1.2}:host ::ng-deep .xfaLayer *{color:inherit;font:inherit;font-style:inherit;font-weight:inherit;font-feature-settings:inherit;font-kerning:inherit;letter-spacing:-.01px;text-align:inherit;text-decoration:inherit;box-sizing:border-box;background-color:transparent;padding:0;margin:0;pointer-events:auto;line-height:inherit}:host ::ng-deep .xfaLayer div{pointer-events:none}:host ::ng-deep .xfaLayer svg{pointer-events:none}:host ::ng-deep .xfaLayer svg *{pointer-events:none}:host ::ng-deep .xfaLayer a{color:#00f}:host ::ng-deep .xfaRich li{margin-left:3em}:host ::ng-deep .xfaFont{color:#000;font-weight:400;font-feature-settings:\"kern\" off;font-kerning:none;font-size:10px;font-style:normal;letter-spacing:0;text-decoration:none;vertical-align:0}:host ::ng-deep .xfaCaption{overflow:hidden;flex:0 0 auto}:host ::ng-deep .xfaCaptionForCheckButton{overflow:hidden;flex:1 1 auto}:host ::ng-deep .xfaLabel{height:100%;width:100%}:host ::ng-deep .xfaLeft{display:flex;flex-direction:row;align-items:center}:host ::ng-deep .xfaRight{display:flex;flex-direction:row-reverse;align-items:center}:host ::ng-deep .xfaLeft>.xfaCaption,:host ::ng-deep .xfaLeft>.xfaCaptionForCheckButton,:host ::ng-deep .xfaRight>.xfaCaption,:host ::ng-deep .xfaRight>.xfaCaptionForCheckButton{max-height:100%}:host ::ng-deep .xfaTop{display:flex;flex-direction:column;align-items:flex-start}:host ::ng-deep .xfaBottom{display:flex;flex-direction:column-reverse;align-items:flex-start}:host ::ng-deep .xfaTop>.xfaCaption,:host ::ng-deep .xfaTop>.xfaCaptionForCheckButton,:host ::ng-deep .xfaBottom>.xfaCaption,:host ::ng-deep .xfaBottom>.xfaCaptionForCheckButton{width:100%}:host ::ng-deep .xfaBorder{background-color:transparent;position:absolute;pointer-events:none}:host ::ng-deep .xfaWrapped{width:100%;height:100%}:host ::ng-deep .xfaTextfield:focus,:host ::ng-deep .xfaSelect:focus{background-image:none;background-color:transparent;outline:auto;outline-offset:-1px}:host ::ng-deep .xfaCheckbox:focus,:host ::ng-deep .xfaRadio:focus{outline:auto}:host ::ng-deep .xfaTextfield,:host ::ng-deep .xfaSelect{height:100%;width:100%;flex:1 1 auto;border:none;resize:none;background-image:var(--xfa-unfocused-field-background)}:host ::ng-deep .xfaTop>.xfaTextfield,:host ::ng-deep .xfaTop>.xfaSelect,:host ::ng-deep .xfaBottom>.xfaTextfield,:host ::ng-deep .xfaBottom>.xfaSelect{flex:0 1 auto}:host ::ng-deep .xfaButton{cursor:pointer;width:100%;height:100%;border:none;text-align:center}:host ::ng-deep .xfaLink{width:100%;height:100%;position:absolute;top:0;left:0}:host ::ng-deep .xfaCheckbox,:host ::ng-deep .xfaRadio{width:100%;height:100%;flex:0 0 auto;border:none}:host ::ng-deep .xfaRich{white-space:pre-wrap;width:100%;height:100%}:host ::ng-deep .xfaImage{object-position:left top;object-fit:contain;width:100%;height:100%}:host ::ng-deep .xfaLrTb,:host ::ng-deep .xfaRlTb,:host ::ng-deep .xfaTb{display:flex;flex-direction:column;align-items:stretch}:host ::ng-deep .xfaLr{display:flex;flex-direction:row;align-items:stretch}:host ::ng-deep .xfaRl{display:flex;flex-direction:row-reverse;align-items:stretch}:host ::ng-deep .xfaTb>div{justify-content:left}:host ::ng-deep .xfaPosition{position:relative}:host ::ng-deep .xfaArea{position:relative}:host ::ng-deep .xfaValignMiddle{display:flex;align-items:center}:host ::ng-deep .xfaTable{display:flex;flex-direction:column;align-items:stretch}:host ::ng-deep .xfaTable .xfaRow{display:flex;flex-direction:row;align-items:stretch}:host ::ng-deep .xfaTable .xfaRlRow{display:flex;flex-direction:row-reverse;align-items:stretch;flex:1}:host ::ng-deep .xfaTable .xfaRlRow>div{flex:1}:host ::ng-deep .xfaNonInteractive input,:host ::ng-deep .xfaNonInteractive textarea,:host ::ng-deep .xfaDisabled input,:host ::ng-deep .xfaDisabled textarea,:host ::ng-deep .xfaReadOnly input,:host ::ng-deep .xfaReadOnly textarea{background:initial}@media print{:host ::ng-deep .xfaTextfield,:host ::ng-deep .xfaSelect{background:transparent}:host ::ng-deep .xfaSelect{-webkit-appearance:none;-moz-appearance:none;appearance:none;text-indent:1px;text-overflow:\"\"}}:host ::ng-deep .pdfViewer{padding-bottom:var(--pdfViewer-padding-bottom)}:host ::ng-deep .pdfViewer .canvasWrapper{overflow:hidden}:host ::ng-deep .pdfViewer .page{direction:ltr;width:816px;height:1056px;margin:var(--page-margin);position:relative;overflow:visible;border:var(--page-border);background-clip:content-box;border-image:var(--shadow) 9 9 repeat;background-color:#fff}:host ::ng-deep .pdfViewer .dummyPage{position:relative;width:0;height:var(--viewer-container-height)}:host ::ng-deep .pdfViewer.removePageBorders .page{margin:0 auto 10px;border:none}:host ::ng-deep .pdfViewer.singlePageView{display:inline-block}:host ::ng-deep .pdfViewer.singlePageView .page{margin:0;border:none}:host ::ng-deep .pdfViewer.scrollHorizontal,:host ::ng-deep .pdfViewer.scrollWrapped,:host ::ng-deep .spread{margin-left:3.5px;margin-right:3.5px;text-align:center}:host ::ng-deep .pdfViewer.scrollHorizontal,:host ::ng-deep .spread{white-space:nowrap}:host ::ng-deep .pdfViewer.removePageBorders,:host ::ng-deep .pdfViewer.scrollHorizontal .spread,:host ::ng-deep .pdfViewer.scrollWrapped .spread{margin-left:0;margin-right:0}:host ::ng-deep .spread .page,:host ::ng-deep .spread .dummyPage,:host ::ng-deep .pdfViewer.scrollHorizontal .page,:host ::ng-deep .pdfViewer.scrollWrapped .page,:host ::ng-deep .pdfViewer.scrollHorizontal .spread,:host ::ng-deep .pdfViewer.scrollWrapped .spread{display:inline-block;vertical-align:middle}:host ::ng-deep .spread .page,:host ::ng-deep .pdfViewer.scrollHorizontal .page,:host ::ng-deep .pdfViewer.scrollWrapped .page{margin-left:var(--spreadHorizontalWrapped-margin-LR);margin-right:var(--spreadHorizontalWrapped-margin-LR)}:host ::ng-deep .pdfViewer.removePageBorders .spread .page,:host ::ng-deep .pdfViewer.removePageBorders.scrollHorizontal .page,:host ::ng-deep .pdfViewer.removePageBorders.scrollWrapped .page{margin-left:5px;margin-right:5px}:host ::ng-deep .pdfViewer .page canvas{margin:0;display:block}:host ::ng-deep .pdfViewer .page canvas[hidden]{display:none}:host ::ng-deep .pdfViewer .page .loadingIcon{position:absolute;display:block;left:0;top:0;right:0;bottom:0;background:url(data:image/gif;base64,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) center no-repeat}:host ::ng-deep .pdfViewer .page .loadingIcon.notVisible{background:none}:host ::ng-deep .pdfViewer.enablePermissions .textLayer span{-webkit-user-select:none!important;user-select:none!important;cursor:not-allowed}:host ::ng-deep .pdfPresentationMode .pdfViewer{padding-bottom:0}:host ::ng-deep .pdfPresentationMode .spread{margin:0}:host ::ng-deep .pdfPresentationMode .pdfViewer .page{margin:0 auto;border:2px solid transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { pdfViewerContainer: [{
                type: ViewChild,
                args: ['pdfViewerContainer']
            }], afterLoadComplete: [{
                type: Output,
                args: ['after-load-complete']
            }], pageRendered: [{
                type: Output,
                args: ['page-rendered']
            }], pageInitialized: [{
                type: Output,
                args: ['pages-initialized']
            }], textLayerRendered: [{
                type: Output,
                args: ['text-layer-rendered']
            }], onError: [{
                type: Output,
                args: ['error']
            }], onProgress: [{
                type: Output,
                args: ['on-progress']
            }], pageChange: [{
                type: Output
            }], src: [{
                type: Input
            }], cMapsUrl: [{
                type: Input,
                args: ['c-maps-url']
            }], page: [{
                type: Input,
                args: ['page']
            }], renderText: [{
                type: Input,
                args: ['render-text']
            }], renderTextMode: [{
                type: Input,
                args: ['render-text-mode']
            }], originalSize: [{
                type: Input,
                args: ['original-size']
            }], showAll: [{
                type: Input,
                args: ['show-all']
            }], stickToPage: [{
                type: Input,
                args: ['stick-to-page']
            }], zoom: [{
                type: Input,
                args: ['zoom']
            }], zoomScale: [{
                type: Input,
                args: ['zoom-scale']
            }], rotation: [{
                type: Input,
                args: ['rotation']
            }], externalLinkTarget: [{
                type: Input,
                args: ['external-link-target']
            }], autoresize: [{
                type: Input,
                args: ['autoresize']
            }], fitToPage: [{
                type: Input,
                args: ['fit-to-page']
            }], showBorders: [{
                type: Input,
                args: ['show-borders']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3BkZi12aWV3ZXIvcGRmLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUtaLFNBQVMsRUFHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxLQUFLLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEtBQUssV0FBVyxNQUFNLDJCQUEyQixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQVlqRCxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDWixNQUFNLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hEO0FBRUQsTUFBTSxDQUFOLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4QiwyREFBUSxDQUFBO0lBQ1IseURBQU8sQ0FBQTtJQUNQLDJEQUFRLENBQUE7QUFDVixDQUFDLEVBSlcsY0FBYyxLQUFkLGNBQWMsUUFJekI7QUFXRCxNQUFNLE9BQU8sa0JBQWtCO0lBd0s3QixZQUFvQixPQUFnQyxFQUFVLE1BQWM7UUFBeEQsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBNUpwRSxjQUFTLEdBQUcsS0FB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Szt1QkFBQyxZQUFZO2dCQVVmLFFBQVE7c0JBRFgsS0FBSzt1QkFBQyxVQUFVO2dCQVdiLGtCQUFrQjtzQkFEckIsS0FBSzt1QkFBQyxzQkFBc0I7Z0JBTXpCLFVBQVU7c0JBRGIsS0FBSzt1QkFBQyxZQUFZO2dCQU1mLFNBQVM7c0JBRFosS0FBSzt1QkFBQyxhQUFhO2dCQU1oQixXQUFXO3NCQURkLEtBQUs7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB2YWRpbWRleiBvbiAyMS8wNi8xNi5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbSwgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgUERGSlMgZnJvbSAncGRmanMtZGlzdC9idWlsZC9wZGYnO1xuaW1wb3J0ICogYXMgUERGSlNWaWV3ZXIgZnJvbSAncGRmanMtZGlzdC93ZWIvcGRmX3ZpZXdlcic7XG5cbmltcG9ydCB7IGNyZWF0ZUV2ZW50QnVzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnQtYnVzLXV0aWxzJztcbmltcG9ydCB7IGFzc2lnbiwgaXNTU1IgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzJztcblxuaW1wb3J0IHR5cGUge1xuICBQREZTb3VyY2UsXG4gIFBERlBhZ2VQcm94eSxcbiAgUERGUHJvZ3Jlc3NEYXRhLFxuICBQREZEb2N1bWVudFByb3h5LFxuICBQREZEb2N1bWVudExvYWRpbmdUYXNrLFxuICBQREZWaWV3ZXJPcHRpb25zXG59IGZyb20gJy4vdHlwaW5ncyc7XG5pbXBvcnQgeyBQREZTaW5nbGVQYWdlVmlld2VyIH0gZnJvbSAncGRmanMtZGlzdC93ZWIvcGRmX3ZpZXdlcic7XG5cbmlmICghaXNTU1IoKSkge1xuICBhc3NpZ24oUERGSlMsICd2ZXJib3NpdHknLCBQREZKUy5WZXJib3NpdHlMZXZlbC5JTkZPUyk7XG59XG5cbmV4cG9ydCBlbnVtIFJlbmRlclRleHRNb2RlIHtcbiAgRElTQUJMRUQsXG4gIEVOQUJMRUQsXG4gIEVOSEFOQ0VEXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BkZi12aWV3ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI3BkZlZpZXdlckNvbnRhaW5lciBjbGFzcz1cIm5nMi1wZGYtdmlld2VyLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInBkZlZpZXdlclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9wZGYtdmlld2VyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGRmVmlld2VyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIHN0YXRpYyBDU1NfVU5JVFMgPSA5Ni4wIC8gNzIuMDtcbiAgc3RhdGljIEJPUkRFUl9XSURUSCA9IDk7XG5cbiAgQFZpZXdDaGlsZCgncGRmVmlld2VyQ29udGFpbmVyJykgcGRmVmlld2VyQ29udGFpbmVyO1xuXG4gIHB1YmxpYyBldmVudEJ1czogUERGSlNWaWV3ZXIuRXZlbnRCdXM7XG4gIHB1YmxpYyBwZGZMaW5rU2VydmljZTogUERGSlNWaWV3ZXIuUERGTGlua1NlcnZpY2U7XG4gIHB1YmxpYyBwZGZGaW5kQ29udHJvbGxlcjogUERGSlNWaWV3ZXIuUERGRmluZENvbnRyb2xsZXI7XG4gIHB1YmxpYyBwZGZWaWV3ZXI6IFBERkpTVmlld2VyLlBERlZpZXdlciB8IFBERlNpbmdsZVBhZ2VWaWV3ZXI7XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGUgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jTWFwc1VybCA9XG4gICAgdHlwZW9mIFBERkpTICE9PSAndW5kZWZpbmVkJ1xuICAgICAgPyBgaHR0cHM6Ly91bnBrZy5jb20vcGRmanMtZGlzdEAkeyhQREZKUyBhcyBhbnkpLnZlcnNpb259L2NtYXBzL2BcbiAgICAgIDogbnVsbDtcbiAgcHJpdmF0ZSBfaW1hZ2VSZXNvdXJjZXNQYXRoID1cbiAgICB0eXBlb2YgUERGSlMgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGBodHRwczovL3VucGtnLmNvbS9wZGZqcy1kaXN0QCR7KFBERkpTIGFzIGFueSkudmVyc2lvbn0vd2ViL2ltYWdlcy9gXG4gICAgICA6IG51bGw7XG4gIHByaXZhdGUgX3JlbmRlclRleHQgPSB0cnVlO1xuICBwcml2YXRlIF9yZW5kZXJUZXh0TW9kZTogUmVuZGVyVGV4dE1vZGUgPSBSZW5kZXJUZXh0TW9kZS5FTkFCTEVEO1xuICBwcml2YXRlIF9zdGlja1RvUGFnZSA9IGZhbHNlO1xuICBwcml2YXRlIF9vcmlnaW5hbFNpemUgPSB0cnVlO1xuICBwcml2YXRlIF9wZGY6IFBERkRvY3VtZW50UHJveHk7XG4gIHByaXZhdGUgX3BhZ2UgPSAxO1xuICBwcml2YXRlIF96b29tID0gMTtcbiAgcHJpdmF0ZSBfem9vbVNjYWxlOiAncGFnZS1oZWlnaHQnIHwgJ3BhZ2UtZml0JyB8ICdwYWdlLXdpZHRoJyA9ICdwYWdlLXdpZHRoJztcbiAgcHJpdmF0ZSBfcm90YXRpb24gPSAwO1xuICBwcml2YXRlIF9zaG93QWxsID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfY2FuQXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHByaXZhdGUgX2ZpdFRvUGFnZSA9IGZhbHNlO1xuICBwcml2YXRlIF9leHRlcm5hbExpbmtUYXJnZXQgPSAnYmxhbmsnO1xuICBwcml2YXRlIF9zaG93Qm9yZGVycyA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RMb2FkZWQ6IHN0cmluZyB8IFVpbnQ4QXJyYXkgfCBQREZTb3VyY2U7XG4gIHByaXZhdGUgX2xhdGVzdFNjcm9sbGVkUGFnZTogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVzaXplVGltZW91dDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcGFnZVNjcm9sbFRpbWVvdXQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBsb2FkaW5nVGFzazogUERGRG9jdW1lbnRMb2FkaW5nVGFzaztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQE91dHB1dCgnYWZ0ZXItbG9hZC1jb21wbGV0ZScpIGFmdGVyTG9hZENvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxQREZEb2N1bWVudFByb3h5PigpO1xuICBAT3V0cHV0KCdwYWdlLXJlbmRlcmVkJykgcGFnZVJlbmRlcmVkID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD4oKTtcbiAgQE91dHB1dCgncGFnZXMtaW5pdGlhbGl6ZWQnKSBwYWdlSW5pdGlhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PigpO1xuICBAT3V0cHV0KCd0ZXh0LWxheWVyLXJlbmRlcmVkJykgdGV4dExheWVyUmVuZGVyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbUV2ZW50PigpO1xuICBAT3V0cHV0KCdlcnJvcicpIG9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnb24tcHJvZ3Jlc3MnKSBvblByb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxQREZQcm9ncmVzc0RhdGE+KCk7XG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmcgfCBVaW50OEFycmF5IHwgUERGU291cmNlO1xuXG4gIEBJbnB1dCgnYy1tYXBzLXVybCcpXG4gIHNldCBjTWFwc1VybChjTWFwc1VybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY01hcHNVcmwgPSBjTWFwc1VybDtcbiAgfVxuXG4gIEBJbnB1dCgncGFnZScpXG4gIHNldCBwYWdlKF9wYWdlKSB7XG4gICAgX3BhZ2UgPSBwYXJzZUludChfcGFnZSwgMTApIHx8IDE7XG4gICAgY29uc3Qgb3JpZ2luYWxQYWdlID0gX3BhZ2U7XG5cbiAgICBpZiAodGhpcy5fcGRmKSB7XG4gICAgICBfcGFnZSA9IHRoaXMuZ2V0VmFsaWRQYWdlTnVtYmVyKF9wYWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYWdlID0gX3BhZ2U7XG4gICAgaWYgKG9yaWdpbmFsUGFnZSAhPT0gX3BhZ2UpIHtcbiAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KF9wYWdlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3JlbmRlci10ZXh0JylcbiAgc2V0IHJlbmRlclRleHQocmVuZGVyVGV4dDogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlbmRlclRleHQgPSByZW5kZXJUZXh0O1xuICB9XG5cbiAgQElucHV0KCdyZW5kZXItdGV4dC1tb2RlJylcbiAgc2V0IHJlbmRlclRleHRNb2RlKHJlbmRlclRleHRNb2RlOiBSZW5kZXJUZXh0TW9kZSkge1xuICAgIHRoaXMuX3JlbmRlclRleHRNb2RlID0gcmVuZGVyVGV4dE1vZGU7XG4gIH1cblxuICBASW5wdXQoJ29yaWdpbmFsLXNpemUnKVxuICBzZXQgb3JpZ2luYWxTaXplKG9yaWdpbmFsU2l6ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29yaWdpbmFsU2l6ZSA9IG9yaWdpbmFsU2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnc2hvdy1hbGwnKVxuICBzZXQgc2hvd0FsbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dBbGwgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnc3RpY2stdG8tcGFnZScpXG4gIHNldCBzdGlja1RvUGFnZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0aWNrVG9QYWdlID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ3pvb20nKVxuICBzZXQgem9vbSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl96b29tID0gdmFsdWU7XG4gIH1cblxuICBnZXQgem9vbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fem9vbTtcbiAgfVxuXG4gIEBJbnB1dCgnem9vbS1zY2FsZScpXG4gIHNldCB6b29tU2NhbGUodmFsdWU6ICdwYWdlLWhlaWdodCcgfCAncGFnZS1maXQnIHwgJ3BhZ2Utd2lkdGgnKSB7XG4gICAgdGhpcy5fem9vbVNjYWxlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgem9vbVNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLl96b29tU2NhbGU7XG4gIH1cblxuICBASW5wdXQoJ3JvdGF0aW9uJylcbiAgc2V0IHJvdGF0aW9uKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIHZhbHVlICUgOTAgPT09IDApKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgcGFnZXMgcm90YXRpb24gYW5nbGUuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcm90YXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnZXh0ZXJuYWwtbGluay10YXJnZXQnKVxuICBzZXQgZXh0ZXJuYWxMaW5rVGFyZ2V0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9leHRlcm5hbExpbmtUYXJnZXQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnYXV0b3Jlc2l6ZScpXG4gIHNldCBhdXRvcmVzaXplKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2FuQXV0b1Jlc2l6ZSA9IEJvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCdmaXQtdG8tcGFnZScpXG4gIHNldCBmaXRUb1BhZ2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXRUb1BhZ2UgPSBCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgnc2hvdy1ib3JkZXJzJylcbiAgc2V0IHNob3dCb3JkZXJzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0JvcmRlcnMgPSBCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRMaW5rVGFyZ2V0KHR5cGU6IHN0cmluZykge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYmxhbmsnOlxuICAgICAgICByZXR1cm4gKFBERkpTVmlld2VyIGFzIGFueSkuTGlua1RhcmdldC5CTEFOSztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICByZXR1cm4gKFBERkpTVmlld2VyIGFzIGFueSkuTGlua1RhcmdldC5OT05FO1xuICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgIHJldHVybiAoUERGSlNWaWV3ZXIgYXMgYW55KS5MaW5rVGFyZ2V0LlNFTEY7XG4gICAgICBjYXNlICdwYXJlbnQnOlxuICAgICAgICByZXR1cm4gKFBERkpTVmlld2VyIGFzIGFueSkuTGlua1RhcmdldC5QQVJFTlQ7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICByZXR1cm4gKFBERkpTVmlld2VyIGFzIGFueSkuTGlua1RhcmdldC5UT1A7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgaWYgKGlzU1NSKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcGRmV29ya2VyU3JjOiBzdHJpbmc7XG5cbiAgICBjb25zdCBwZGZKc1ZlcnNpb24gPSAoUERGSlMgYXMgYW55KS52ZXJzaW9uO1xuICAgIGNvbnN0IHZlcnNpb25TcGVjaWZpY1BkZldvcmtlclVybCA9IHdpbmRvd1tgcGRmV29ya2VyU3JjJHtwZGZKc1ZlcnNpb259YF07XG5cbiAgICBpZiAodmVyc2lvblNwZWNpZmljUGRmV29ya2VyVXJsKSB7XG4gICAgICBwZGZXb3JrZXJTcmMgPSB2ZXJzaW9uU3BlY2lmaWNQZGZXb3JrZXJVcmw7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgncGRmV29ya2VyU3JjJykgJiZcbiAgICAgIHR5cGVvZiAod2luZG93IGFzIGFueSkucGRmV29ya2VyU3JjID09PSAnc3RyaW5nJyAmJlxuICAgICAgKHdpbmRvdyBhcyBhbnkpLnBkZldvcmtlclNyY1xuICAgICkge1xuICAgICAgcGRmV29ya2VyU3JjID0gKHdpbmRvdyBhcyBhbnkpLnBkZldvcmtlclNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgcGRmV29ya2VyU3JjID0gYGh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vcGRmanMtZGlzdEAke3BkZkpzVmVyc2lvblxuICAgICAgICB9L2xlZ2FjeS9idWlsZC9wZGYud29ya2VyLm1pbi5qc2A7XG4gICAgfVxuXG4gICAgYXNzaWduKFBERkpTLkdsb2JhbFdvcmtlck9wdGlvbnMsICd3b3JrZXJTcmMnLCBwZGZXb3JrZXJTcmMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBkZlZpZXdlckNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudDtcblxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSA9PT0gdHJ1ZSAmJiBvZmZzZXQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1Zpc2libGUgPT09IGZhbHNlICYmIG9mZnNldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5uZ09uQ2hhbmdlcyh7IHNyYzogdGhpcy5zcmMgfSBhcyBhbnkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5zZXR1cFJlc2l6ZUxpc3RlbmVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5sb2FkaW5nVGFzayA9IG51bGw7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGlzU1NSKCkgfHwgIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCdzcmMnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMubG9hZFBERigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGRmKSB7XG4gICAgICBpZiAoJ3JlbmRlclRleHQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5wZGZWaWV3ZXIudGV4dExheWVyTW9kZSA9IHRoaXMuX3JlbmRlclRleHRcbiAgICAgICAgICA/IHRoaXMuX3JlbmRlclRleHRNb2RlXG4gICAgICAgICAgOiBSZW5kZXJUZXh0TW9kZS5ESVNBQkxFRDtcbiAgICAgICAgdGhpcy5yZXNldFBkZkRvY3VtZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKCdzaG93QWxsJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuc2V0dXBWaWV3ZXIoKTtcbiAgICAgICAgdGhpcy5yZXNldFBkZkRvY3VtZW50KCk7XG4gICAgICB9XG4gICAgICBpZiAoJ3BhZ2UnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgeyBwYWdlIH0gPSBjaGFuZ2VzO1xuICAgICAgICBpZiAocGFnZS5jdXJyZW50VmFsdWUgPT09IHRoaXMuX2xhdGVzdFNjcm9sbGVkUGFnZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5ldyBmb3JtIG9mIHBhZ2UgY2hhbmdpbmc6IFRoZSB2aWV3ZXIgd2lsbCBub3cganVtcCB0byB0aGUgc3BlY2lmaWVkIHBhZ2Ugd2hlbiBpdCBpcyBjaGFuZ2VkLlxuICAgICAgICAvLyBUaGlzIGJlaGF2aW9yIGlzIGludHJvZHVjZWQgYnkgdXNpbmcgdGhlIFBERlNpbmdsZVBhZ2VWaWV3ZXJcbiAgICAgICAgdGhpcy5wZGZWaWV3ZXIuc2Nyb2xsUGFnZUludG9WaWV3KHsgcGFnZU51bWJlcjogdGhpcy5fcGFnZSB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU2l6ZSgpIHtcbiAgICBmcm9tKFxuICAgICAgdGhpcy5fcGRmLmdldFBhZ2UoXG4gICAgICAgIHRoaXMucGRmVmlld2VyLmN1cnJlbnRQYWdlTnVtYmVyXG4gICAgICApIGFzIHVua25vd24gYXMgUHJvbWlzZTxQREZQYWdlUHJveHk+XG4gICAgKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChwYWdlOiBQREZQYWdlUHJveHkpID0+IHtcbiAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IHRoaXMuX3JvdGF0aW9uIHx8IHBhZ2Uucm90YXRlO1xuICAgICAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPVxuICAgICAgICAgICAgKHBhZ2UgYXMgYW55KS5nZXRWaWV3cG9ydCh7XG4gICAgICAgICAgICAgIHNjYWxlOiB0aGlzLl96b29tLFxuICAgICAgICAgICAgICByb3RhdGlvblxuICAgICAgICAgICAgfSkud2lkdGggKiBQZGZWaWV3ZXJDb21wb25lbnQuQ1NTX1VOSVRTO1xuICAgICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3pvb207XG4gICAgICAgICAgbGV0IHN0aWNrVG9QYWdlID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIFNjYWxlIHRoZSBkb2N1bWVudCB3aGVuIGl0IHNob3VsZG4ndCBiZSBpbiBvcmlnaW5hbCBzaXplIG9yIGRvZXNuJ3QgZml0IGludG8gdGhlIHZpZXdwb3J0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuX29yaWdpbmFsU2l6ZSB8fFxuICAgICAgICAgICAgKHRoaXMuX2ZpdFRvUGFnZSAmJlxuICAgICAgICAgICAgICB2aWV3cG9ydFdpZHRoID4gdGhpcy5wZGZWaWV3ZXJDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdQb3J0ID0gKHBhZ2UgYXMgYW55KS5nZXRWaWV3cG9ydCh7IHNjYWxlOiAxLCByb3RhdGlvbiB9KTtcbiAgICAgICAgICAgIHNjYWxlID0gdGhpcy5nZXRTY2FsZSh2aWV3UG9ydC53aWR0aCwgdmlld1BvcnQuaGVpZ2h0KTtcbiAgICAgICAgICAgIHN0aWNrVG9QYWdlID0gIXRoaXMuX3N0aWNrVG9QYWdlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucGRmVmlld2VyLl9zZXRTY2FsZShzY2FsZSwgc3RpY2tUb1BhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nVGFzayAmJiAhdGhpcy5sb2FkaW5nVGFzay5kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMubG9hZGluZ1Rhc2suZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZGYpIHtcbiAgICAgIHRoaXMuX2xhdGVzdFNjcm9sbGVkUGFnZSA9IDA7XG4gICAgICB0aGlzLl9wZGYuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fcGRmID0gbnVsbDtcbiAgICAgIHRoaXMucGRmVmlld2VyLnNldERvY3VtZW50KG51bGwpO1xuICAgICAgdGhpcy5wZGZMaW5rU2VydmljZS5zZXREb2N1bWVudChudWxsLCBudWxsKTtcbiAgICAgIHRoaXMucGRmRmluZENvbnRyb2xsZXIuc2V0RG9jdW1lbnQobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQREZMaW5rU2VydmljZUNvbmZpZygpIHtcbiAgICBjb25zdCBsaW5rVGFyZ2V0ID0gUGRmVmlld2VyQ29tcG9uZW50LmdldExpbmtUYXJnZXQodGhpcy5fZXh0ZXJuYWxMaW5rVGFyZ2V0KTtcblxuICAgIGlmIChsaW5rVGFyZ2V0KSB7XG4gICAgICByZXR1cm4geyBleHRlcm5hbExpbmtUYXJnZXQ6IGxpbmtUYXJnZXQgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwcml2YXRlIGluaXRFdmVudEJ1cygpIHtcbiAgICB0aGlzLmV2ZW50QnVzID0gY3JlYXRlRXZlbnRCdXMoUERGSlNWaWV3ZXIsIHRoaXMuZGVzdHJveSQpO1xuXG4gICAgZnJvbUV2ZW50PEN1c3RvbUV2ZW50Pih0aGlzLmV2ZW50QnVzLCAncGFnZXJlbmRlcmVkJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucGFnZVJlbmRlcmVkLmVtaXQoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICBmcm9tRXZlbnQ8Q3VzdG9tRXZlbnQ+KHRoaXMuZXZlbnRCdXMsICdwYWdlc2luaXQnKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5wYWdlSW5pdGlhbGl6ZWQuZW1pdChldmVudCk7XG4gICAgICB9KTtcblxuICAgIGZyb21FdmVudCh0aGlzLmV2ZW50QnVzLCAncGFnZWNoYW5naW5nJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHsgcGFnZU51bWJlciB9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBhZ2VTY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucGFnZVNjcm9sbFRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYWdlU2Nyb2xsVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9sYXRlc3RTY3JvbGxlZFBhZ2UgPSBwYWdlTnVtYmVyO1xuICAgICAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHBhZ2VOdW1iZXIpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICBmcm9tRXZlbnQ8Q3VzdG9tRXZlbnQ+KHRoaXMuZXZlbnRCdXMsICd0ZXh0bGF5ZXJyZW5kZXJlZCcpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnRleHRMYXllclJlbmRlcmVkLmVtaXQoZXZlbnQpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQREZTZXJ2aWNlcygpIHtcbiAgICB0aGlzLnBkZkxpbmtTZXJ2aWNlID0gbmV3IFBERkpTVmlld2VyLlBERkxpbmtTZXJ2aWNlKHtcbiAgICAgIGV2ZW50QnVzOiB0aGlzLmV2ZW50QnVzLFxuICAgICAgLi4udGhpcy5nZXRQREZMaW5rU2VydmljZUNvbmZpZygpXG4gICAgfSk7XG4gICAgdGhpcy5wZGZGaW5kQ29udHJvbGxlciA9IG5ldyBQREZKU1ZpZXdlci5QREZGaW5kQ29udHJvbGxlcih7XG4gICAgICBldmVudEJ1czogdGhpcy5ldmVudEJ1cyxcbiAgICAgIGxpbmtTZXJ2aWNlOiB0aGlzLnBkZkxpbmtTZXJ2aWNlLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQREZPcHRpb25zKCk6IFBERlZpZXdlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBldmVudEJ1czogdGhpcy5ldmVudEJ1cyxcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksXG4gICAgICByZW1vdmVQYWdlQm9yZGVyczogIXRoaXMuX3Nob3dCb3JkZXJzLFxuICAgICAgbGlua1NlcnZpY2U6IHRoaXMucGRmTGlua1NlcnZpY2UsXG4gICAgICB0ZXh0TGF5ZXJNb2RlOiB0aGlzLl9yZW5kZXJUZXh0XG4gICAgICAgID8gdGhpcy5fcmVuZGVyVGV4dE1vZGVcbiAgICAgICAgOiBSZW5kZXJUZXh0TW9kZS5ESVNBQkxFRCxcbiAgICAgIGZpbmRDb250cm9sbGVyOiB0aGlzLnBkZkZpbmRDb250cm9sbGVyLFxuICAgICAgcmVuZGVyZXI6ICdjYW52YXMnLFxuICAgICAgbDEwbjogdW5kZWZpbmVkLFxuICAgICAgaW1hZ2VSZXNvdXJjZXNQYXRoOiB0aGlzLl9pbWFnZVJlc291cmNlc1BhdGgsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBWaWV3ZXIoKSB7XG4gICAgYXNzaWduKFBERkpTLCAnZGlzYWJsZVRleHRMYXllcicsICF0aGlzLl9yZW5kZXJUZXh0KTtcblxuICAgIHRoaXMuaW5pdFBERlNlcnZpY2VzKCk7XG5cbiAgICBpZiAodGhpcy5fc2hvd0FsbCkge1xuICAgICAgdGhpcy5wZGZWaWV3ZXIgPSBuZXcgUERGSlNWaWV3ZXIuUERGVmlld2VyKHRoaXMuZ2V0UERGT3B0aW9ucygpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wZGZWaWV3ZXIgPSBuZXcgUERGSlNWaWV3ZXIuUERGU2luZ2xlUGFnZVZpZXdlcih0aGlzLmdldFBERk9wdGlvbnMoKSk7XG4gICAgfVxuICAgIHRoaXMucGRmTGlua1NlcnZpY2Uuc2V0Vmlld2VyKHRoaXMucGRmVmlld2VyKTtcblxuICAgIHRoaXMucGRmVmlld2VyLl9jdXJyZW50UGFnZU51bWJlciA9IHRoaXMuX3BhZ2U7XG4gIH1cblxuICBwcml2YXRlIGdldFZhbGlkUGFnZU51bWJlcihwYWdlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChwYWdlIDwgMSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2UgPiB0aGlzLl9wZGYubnVtUGFnZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wZGYubnVtUGFnZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2U7XG4gIH1cblxuICBwcml2YXRlIGdldERvY3VtZW50UGFyYW1zKCkge1xuICAgIGNvbnN0IHNyY1R5cGUgPSB0eXBlb2YgdGhpcy5zcmM7XG5cbiAgICBpZiAoIXRoaXMuX2NNYXBzVXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcmM7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICBjTWFwVXJsOiB0aGlzLl9jTWFwc1VybCxcbiAgICAgIGNNYXBQYWNrZWQ6IHRydWUsXG4gICAgICBlbmFibGVYZmE6IHRydWVcbiAgICB9O1xuXG4gICAgaWYgKHNyY1R5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwYXJhbXMudXJsID0gdGhpcy5zcmM7XG4gICAgfSBlbHNlIGlmIChzcmNUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKCh0aGlzLnNyYyBhcyBhbnkpLmJ5dGVMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXMuZGF0YSA9IHRoaXMuc3JjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIHRoaXMuc3JjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUERGKCkge1xuICAgIGlmICghdGhpcy5zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0TG9hZGVkID09PSB0aGlzLnNyYykge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuXG4gICAgdGhpcy5sb2FkaW5nVGFzayA9IFBERkpTLmdldERvY3VtZW50KHRoaXMuZ2V0RG9jdW1lbnRQYXJhbXMoKSk7XG5cbiAgICB0aGlzLmxvYWRpbmdUYXNrLm9uUHJvZ3Jlc3MgPSAocHJvZ3Jlc3NEYXRhOiBQREZQcm9ncmVzc0RhdGEpID0+IHtcbiAgICAgIHRoaXMub25Qcm9ncmVzcy5lbWl0KHByb2dyZXNzRGF0YSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNyYyA9IHRoaXMuc3JjO1xuXG4gICAgZnJvbSh0aGlzLmxvYWRpbmdUYXNrLnByb21pc2UgYXMgUHJvbWlzZTxQREZEb2N1bWVudFByb3h5PilcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocGRmKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGRmID0gcGRmO1xuICAgICAgICAgIHRoaXMubGFzdExvYWRlZCA9IHNyYztcblxuICAgICAgICAgIHRoaXMuYWZ0ZXJMb2FkQ29tcGxldGUuZW1pdChwZGYpO1xuICAgICAgICAgIHRoaXMucmVzZXRQZGZEb2N1bWVudCgpO1xuXG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMubGFzdExvYWRlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCkge1xuICAgIHRoaXMucGFnZSA9IHRoaXMuX3BhZ2U7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgdGhpcy5fcGFnZSA9IHRoaXMuZ2V0VmFsaWRQYWdlTnVtYmVyKHRoaXMuX3BhZ2UpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fcm90YXRpb24gIT09IDAgfHxcbiAgICAgIHRoaXMucGRmVmlld2VyLnBhZ2VzUm90YXRpb24gIT09IHRoaXMuX3JvdGF0aW9uXG4gICAgKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wZGZWaWV3ZXIucGFnZXNSb3RhdGlvbiA9IHRoaXMuX3JvdGF0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0aWNrVG9QYWdlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wZGZWaWV3ZXIuY3VycmVudFBhZ2VOdW1iZXIgPSB0aGlzLl9wYWdlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFNjYWxlKHZpZXdwb3J0V2lkdGg6IG51bWJlciwgdmlld3BvcnRIZWlnaHQ6IG51bWJlcikge1xuICAgIGNvbnN0IGJvcmRlclNpemUgPSB0aGlzLl9zaG93Qm9yZGVycyA/IDIgKiBQZGZWaWV3ZXJDb21wb25lbnQuQk9SREVSX1dJRFRIIDogMDtcbiAgICBjb25zdCBwZGZDb250YWluZXJXaWR0aCA9IHRoaXMucGRmVmlld2VyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggLSBib3JkZXJTaXplO1xuICAgIGNvbnN0IHBkZkNvbnRhaW5lckhlaWdodCA9IHRoaXMucGRmVmlld2VyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gYm9yZGVyU2l6ZTtcblxuICAgIGlmIChcbiAgICAgIHBkZkNvbnRhaW5lckhlaWdodCA9PT0gMCB8fFxuICAgICAgdmlld3BvcnRIZWlnaHQgPT09IDAgfHxcbiAgICAgIHBkZkNvbnRhaW5lcldpZHRoID09PSAwIHx8XG4gICAgICB2aWV3cG9ydFdpZHRoID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBsZXQgcmF0aW8gPSAxO1xuICAgIHN3aXRjaCAodGhpcy5fem9vbVNjYWxlKSB7XG4gICAgICBjYXNlICdwYWdlLWZpdCc6XG4gICAgICAgIHJhdGlvID0gTWF0aC5taW4oXG4gICAgICAgICAgcGRmQ29udGFpbmVySGVpZ2h0IC8gdmlld3BvcnRIZWlnaHQsXG4gICAgICAgICAgcGRmQ29udGFpbmVyV2lkdGggLyB2aWV3cG9ydFdpZHRoXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGFnZS1oZWlnaHQnOlxuICAgICAgICByYXRpbyA9IHBkZkNvbnRhaW5lckhlaWdodCAvIHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhZ2Utd2lkdGgnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmF0aW8gPSBwZGZDb250YWluZXJXaWR0aCAvIHZpZXdwb3J0V2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAodGhpcy5fem9vbSAqIHJhdGlvKSAvIFBkZlZpZXdlckNvbXBvbmVudC5DU1NfVU5JVFM7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGRmRG9jdW1lbnQoKSB7XG4gICAgdGhpcy5wZGZMaW5rU2VydmljZS5zZXREb2N1bWVudCh0aGlzLl9wZGYsIG51bGwpO1xuICAgIHRoaXMucGRmRmluZENvbnRyb2xsZXIuc2V0RG9jdW1lbnQodGhpcy5fcGRmKTtcbiAgICB0aGlzLnBkZlZpZXdlci5zZXREb2N1bWVudCh0aGlzLl9wZGYpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmIChpc1NTUigpIHx8ICF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5pbml0RXZlbnRCdXMoKTtcbiAgICB0aGlzLnNldHVwVmlld2VyKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUmVzaXplTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgaWYgKGlzU1NSKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX2NhbkF1dG9SZXNpemUgJiYgISF0aGlzLl9wZGYpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19