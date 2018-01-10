"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function isSSR() {
    return typeof window === 'undefined';
}
if (!isSSR()) {
    window['pdfjs-dist/build/pdf'] = require('pdfjs-dist/build/pdf');
    require('pdfjs-dist/web/compatibility');
    require('pdfjs-dist/web/pdf_viewer');
    PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
}
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._renderText = true;
        this._stickToPage = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._rotation = 0;
        this._showAll = true;
        this._canAutoResize = true;
        this._fitToPage = false;
        this._externalLinkTarget = 'blank';
        this.afterLoadComplete = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onProgress = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter(true);
        if (!isSSR() && typeof PDFJS.workerSrc !== 'string') {
            PDFJS.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS.version + "/pdf.worker.min.js";
        }
    }
    PdfViewerComponent.prototype.ngOnInit = function () {
        if (!isSSR()) {
            this.setupViewer();
        }
    };
    PdfViewerComponent.prototype.onPageResize = function () {
        var _this = this;
        if (!this._canAutoResize) {
            return;
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(function () {
            _this.updateSize();
        }, 100);
    };
    PdfViewerComponent.prototype.ngOnChanges = function (changes) {
        if (isSSR()) {
            return;
        }
        if ('src' in changes) {
            this.loadPDF();
        }
        else if (this._pdf) {
            if ('renderText' in changes) {
                this.setupViewer();
            }
            this.update();
        }
    };
    Object.defineProperty(PdfViewerComponent.prototype, "page", {
        set: function (_page) {
            _page = parseInt(_page, 10);
            if (this._pdf && !this.isValidPageNumber(_page)) {
                _page = 1;
            }
            this._page = _page;
            this.pageChange.emit(_page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "renderText", {
        set: function (renderText) {
            this._renderText = renderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "originalSize", {
        set: function (originalSize) {
            this._originalSize = originalSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "showAll", {
        set: function (value) {
            this._showAll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "stickToPage", {
        set: function (value) {
            this._stickToPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (value) {
            if (value <= 0) {
                return;
            }
            this._zoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "rotation", {
        set: function (value) {
            if (!(typeof value === 'number' && value % 90 === 0)) {
                console.warn('Invalid pages rotation angle.');
                return;
            }
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "externalLinkTarget", {
        set: function (value) {
            this._externalLinkTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "autoresize", {
        set: function (value) {
            this._canAutoResize = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "fitToPage", {
        set: function (value) {
            this._fitToPage = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerComponent.prototype.setupViewer = function () {
        PDFJS.disableTextLayer = !this._renderText;
        PdfViewerComponent.setExternalLinkTarget(this._externalLinkTarget);
        this.pdfLinkService = new PDFJS.PDFLinkService();
        var pdfOptions = {
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: true,
            linkService: this.pdfLinkService
        };
        this.pdfViewer = new PDFJS.PDFViewer(pdfOptions);
        this.pdfLinkService.setViewer(this.pdfViewer);
    };
    PdfViewerComponent.prototype.updateSize = function () {
        var _this = this;
        if (!this._showAll) {
            this.renderPage(this._page);
            return;
        }
        this._pdf.getPage(this.pdfViewer.currentPageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var scale = _this._zoom;
            var stickToPage = true;
            if (!_this._originalSize || (_this._fitToPage && viewport.width > _this.element.nativeElement.offsetWidth)) {
                scale = _this.getScale(page.getViewport(1).width);
                stickToPage = !_this._stickToPage;
            }
            _this.pdfViewer._setScale(scale, stickToPage);
        });
    };
    PdfViewerComponent.prototype.isValidPageNumber = function (page) {
        return this._pdf.numPages >= page && page >= 1;
    };
    PdfViewerComponent.setExternalLinkTarget = function (type) {
        switch (type) {
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
    };
    PdfViewerComponent.prototype.loadPDF = function () {
        var _this = this;
        if (!this.src) {
            return;
        }
        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }
        var loadingTask = PDFJS.getDocument(this.src);
        loadingTask.onProgress = function (progressData) {
            _this.onProgress.emit(progressData);
        };
        var src = this.src;
        loadingTask.promise
            .then(function (pdf) {
            _this._pdf = pdf;
            _this.lastLoaded = src;
            _this.afterLoadComplete.emit(pdf);
            _this.update();
        }, function (error) {
            _this.onError.emit(error);
        });
    };
    PdfViewerComponent.prototype.update = function () {
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
    };
    PdfViewerComponent.prototype.render = function () {
        if (this._showAll) {
            this.renderMultiplePages();
        }
        else {
            this.renderPage(this._page);
        }
    };
    PdfViewerComponent.prototype.renderMultiplePages = function () {
        var _this = this;
        if (!this.isValidPageNumber(this._page)) {
            this._page = 1;
        }
        if (this._rotation !== 0 || this.pdfViewer.pagesRotation !== this._rotation) {
            setTimeout(function () {
                _this.pdfViewer.pagesRotation = _this._rotation;
            });
        }
        if (this._stickToPage) {
            setTimeout(function () {
                _this.pdfViewer.currentPageNumber = _this._page;
            });
        }
        this.updateSize();
    };
    PdfViewerComponent.prototype.renderPage = function (pageNumber) {
        var _this = this;
        this._pdf.getPage(pageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var container = _this.element.nativeElement.querySelector('.pdfViewer');
            var scale = _this._zoom;
            if (!_this._originalSize || (_this._fitToPage && viewport.width > _this.element.nativeElement.offsetWidth)) {
                viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width, _this._rotation);
                scale = _this.getScale(page.getViewport(1).width);
            }
            PdfViewerComponent.removeAllChildNodes(container);
            PDFJS.disableTextLayer = !_this._renderText;
            var pdfOptions = {
                container: container,
                removePageBorders: true,
                defaultViewport: viewport,
                scale: scale,
                id: _this._page,
            };
            if (_this._renderText) {
                _this.pdfLinkService = new PDFJS.PDFLinkService();
                pdfOptions.linkService = _this.pdfLinkService;
                PdfViewerComponent.setExternalLinkTarget(_this._externalLinkTarget);
                pdfOptions.textLayerFactory = new PDFJS.DefaultTextLayerFactory();
                pdfOptions.annotationLayerFactory = new PDFJS.DefaultAnnotationLayerFactory();
            }
            var pdfPageView = new PDFJS.PDFPageView(pdfOptions);
            if (_this._renderText) {
                _this.pdfLinkService.setViewer(pdfPageView);
            }
            if (_this._rotation !== 0 || pdfPageView.rotation !== _this._rotation) {
                pdfPageView.rotation = _this._rotation;
            }
            pdfPageView.setPdfPage(page);
            return pdfPageView.draw();
        });
    };
    PdfViewerComponent.removeAllChildNodes = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    PdfViewerComponent.prototype.getScale = function (viewportWidth) {
        var offsetWidth = this.element.nativeElement.offsetWidth;
        if (offsetWidth === 0) {
            return 1;
        }
        return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
    };
    PdfViewerComponent.CSS_UNITS = 96.0 / 72.0;
    PdfViewerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pdf-viewer',
                    template: "<div class=\"ng2-pdf-viewer-container\"><div class=\"pdfViewer\"></div></div>",
                    styles: [
                        "\n.ng2-pdf-viewer-container {\n    overflow-x: auto;\n}\n:host /deep/ .textLayer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  opacity: 0.2;\n  line-height: 1.0;\n}\n\n:host /deep/ .textLayer > div {\n  color: transparent;\n  position: absolute;\n  white-space: pre;\n  cursor: text;\n  -webkit-transform-origin: 0% 0%;\n  -moz-transform-origin: 0% 0%;\n  -o-transform-origin: 0% 0%;\n  -ms-transform-origin: 0% 0%;\n  transform-origin: 0% 0%;\n}\n\n:host /deep/ .textLayer .highlight {\n  margin: -1px;\n  padding: 1px;\n\n  background-color: #002bff;\n  border-radius: 4px;\n}\n\n:host /deep/ .textLayer .highlight.begin {\n  border-radius: 4px 0px 0px 4px;\n}\n\n:host /deep/ .textLayer .highlight.end {\n  border-radius: 0px 4px 4px 0px;\n}\n\n:host /deep/ .textLayer .highlight.middle {\n  border-radius: 0px;\n}\n\n:host /deep/ .textLayer .highlight.selected {\n  background-color: rgb(0, 100, 0);\n}\n\n:host /deep/ .textLayer ::selection { background: #002bff; }\n:host /deep/ .textLayer ::-moz-selection { background: #002bff; }\n\n:host /deep/ .textLayer .endOfContent {\n  display: block;\n  position: absolute;\n  left: 0px;\n  top: 100%;\n  right: 0px;\n  bottom: 0px;\n  z-index: -1;\n  cursor: default;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n}\n\n:host /deep/ .textLayer .endOfContent.active {\n  top: 0px;\n}\n\n\n:host /deep/ .annotationLayer section {\n  position: absolute;\n}\n\n:host /deep/ .annotationLayer .linkAnnotation > a {\n  position: absolute;\n  font-size: 1em;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n:host /deep/ .annotationLayer .linkAnnotation > a /* -ms-a */  {\n  background: url(\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\") 0 0 repeat;\n}\n\n:host /deep/ .annotationLayer .linkAnnotation > a:hover {\n  opacity: 0.2;\n  background: #002bff;\n  box-shadow: 0px 2px 10px #002bff;\n}\n\n:host /deep/ .annotationLayer .textAnnotation img {\n  position: absolute;\n  cursor: pointer;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {\n  background-color: #002bff;\n  border: 1px solid transparent;\n  box-sizing: border-box;\n  font-size: 9px;\n  height: 100%;\n  padding: 0 3px;\n  vertical-align: top;\n  width: 100%;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea {\n  font: message-box;\n  font-size: 9px;\n  resize: none;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input[disabled],\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea[disabled],\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select[disabled],\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {\n  background: none;\n  border: 1px solid transparent;\n  cursor: not-allowed;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input:hover,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea:hover,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select:hover,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input:hover {\n  border: 1px solid #000;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input:focus,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea:focus,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select:focus {\n  background: none;\n  border: 1px solid transparent;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input.comb {\n  font-family: monospace;\n  padding-left: 2px;\n  padding-right: 0;\n}\n\n:host /deep/ .annotationLayer .textWidgetAnnotation input.comb:focus {\n  width: 115%;\n}\n\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n}\n\n:host /deep/ .annotationLayer .popupWrapper {\n  position: absolute;\n  width: 20em;\n}\n\n:host /deep/ .annotationLayer .popup {\n  position: absolute;\n  z-index: 200;\n  max-width: 20em;\n  background-color: #FFFF99;\n  box-shadow: 0px 2px 5px #333;\n  border-radius: 2px;\n  padding: 0.6em;\n  margin-left: 5px;\n  cursor: pointer;\n  word-wrap: break-word;\n}\n\n:host /deep/ .annotationLayer .popup h1 {\n  font-size: 1em;\n  border-bottom: 1px solid #000000;\n  padding-bottom: 0.2em;\n}\n\n:host /deep/ .annotationLayer .popup p {\n  padding-top: 0.2em;\n}\n\n:host /deep/ .annotationLayer .highlightAnnotation,\n:host /deep/ .annotationLayer .underlineAnnotation,\n:host /deep/ .annotationLayer .squigglyAnnotation,\n:host /deep/ .annotationLayer .strikeoutAnnotation,\n:host /deep/ .annotationLayer .fileAttachmentAnnotation {\n  cursor: pointer;\n}\n\n:host /deep/ .pdfViewer .canvasWrapper {\n  overflow: hidden;\n}\n\n:host /deep/ .pdfViewer .page {\n  direction: ltr;\n  width: 816px;\n  height: 1056px;\n  margin: 1px auto -8px auto;\n  position: relative;\n  overflow: visible;\n  border: 9px solid transparent;\n  background-clip: content-box;\n  border-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAA6UlEQVR4Xl2Pi2rEMAwE16fm1f7/r14v7w4rI0IzLAF7hLxNevBSEMEF5+OilNCsRd8ZMyn+a4NmsOT8WJw1lFbSYgGFzF2bLFoLjTClWjKKGRWpDYAGXUnZ4uhbBUzF3Oe/GG/ue2fn4GgsyXhNgysV2JnrhKEMg4fEZcALmiKbNhBBRFpSyDOj1G4QOVly6O1FV54ZZq8OVygrciDt6JazRgi1ljTPH0gbrPmHPXAbCiDd4GawIjip1TPh9tt2sz24qaCjr/jAb/GBFTbq9KZ7Ke/Cqt8nayUikZKsWZK7Fe6bg5dOUt8fZHWG2BHc+6EAAAAASUVORK5CYII=') 9 9 repeat;\n  background-color: white;\n}\n\n:host /deep/ .pdfViewer.removePageBorders .page {\n  margin: 0px auto 10px auto;\n  border: none;\n}\n\n:host /deep/ .pdfViewer.singlePageView {\n  display: inline-block;\n}\n\n:host /deep/ .pdfViewer.singlePageView .page {\n  margin: 0;\n  border: none;\n}\n\n:host /deep/ .pdfViewer .page canvas {\n  margin: 0;\n  display: block;\n}\n\n:host /deep/ .pdfViewer .page .loadingIcon {\n  position: absolute;\n  display: block;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/gif;base64,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') center no-repeat;\n}\n"
                    ]
                },] },
    ];
    PdfViewerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    PdfViewerComponent.propDecorators = {
        'afterLoadComplete': [{ type: core_1.Output, args: ['after-load-complete',] },],
        'onError': [{ type: core_1.Output, args: ['error',] },],
        'onProgress': [{ type: core_1.Output, args: ['on-progress',] },],
        'onPageResize': [{ type: core_1.HostListener, args: ['window:resize', [],] },],
        'src': [{ type: core_1.Input },],
        'page': [{ type: core_1.Input, args: ['page',] },],
        'pageChange': [{ type: core_1.Output },],
        'renderText': [{ type: core_1.Input, args: ['render-text',] },],
        'originalSize': [{ type: core_1.Input, args: ['original-size',] },],
        'showAll': [{ type: core_1.Input, args: ['show-all',] },],
        'stickToPage': [{ type: core_1.Input, args: ['stick-to-page',] },],
        'zoom': [{ type: core_1.Input, args: ['zoom',] },],
        'rotation': [{ type: core_1.Input, args: ['rotation',] },],
        'externalLinkTarget': [{ type: core_1.Input, args: ['external-link-target',] },],
        'autoresize': [{ type: core_1.Input, args: ['autoresize',] },],
        'fitToPage': [{ type: core_1.Input, args: ['fit-to-page',] },],
    };
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map