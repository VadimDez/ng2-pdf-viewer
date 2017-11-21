"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdfjs = require("pdfjs-dist/build/pdf");
window['pdfjs-dist/build/pdf'] = pdfjs;
require("pdfjs-dist/web/compatibility");
require("pdfjs-dist/web/pdf_viewer");
PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        PDFJS.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS.version + "/pdf.worker.min.js";
    }
    PdfViewerComponent.prototype.ngOnInit = function () {
        this.setupViewer();
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
        this._pdfLinkService = new PDFJS.PDFLinkService();
        var pdfOptions = {
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: true,
            linkService: this._pdfLinkService
        };
        this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);
        this._pdfLinkService.setViewer(this._pdfViewer);
    };
    PdfViewerComponent.prototype.updateSize = function () {
        var _this = this;
        if (!this._showAll) {
            this.renderPage(this._page);
            return;
        }
        this._pdf.getPage(this._pdfViewer.currentPageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var scale = _this._zoom;
            var stickToPage = true;
            if (!_this._originalSize || (_this._fitToPage && viewport.width > _this.element.nativeElement.offsetWidth)) {
                scale = _this.getScale(page.getViewport(1).width);
                stickToPage = !_this._stickToPage;
            }
            _this._pdfViewer._setScale(scale, stickToPage);
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
            if (this._pdfViewer) {
                this._pdfViewer.setDocument(this._pdf);
            }
        }
        if (this._pdfLinkService) {
            this._pdfLinkService.setDocument(this._pdf, null);
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
        if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
            setTimeout(function () {
                _this._pdfViewer.pagesRotation = _this._rotation;
            });
        }
        if (this._stickToPage) {
            setTimeout(function () {
                _this._pdfViewer.currentPageNumber = _this._page;
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
            PdfViewerComponent.setExternalLinkTarget(_this._externalLinkTarget);
            _this._pdfLinkService = new PDFJS.PDFLinkService();
            var pdfOptions = {
                container: container,
                removePageBorders: true,
                linkService: _this._pdfLinkService,
                defaultViewport: viewport,
                scale: scale,
                id: _this._page,
                textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
                annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
            };
            var pdfPageView = new PDFJS.PDFPageView(pdfOptions);
            _this._pdfLinkService.setViewer(pdfPageView);
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
        return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponent.CSS_UNITS;
    };
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map