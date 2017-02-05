"use strict";
var core_1 = require('@angular/core');
require('pdfjs-dist/build/pdf.combined');
require('pdfjs-dist/web/pdf_viewer');
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._showAll = true;
        this._renderText = true;
        this._stickToPage = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._rotation = 0;
        this._externalLinkTarget = 'blank';
        this.afterLoadComplete = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter(true);
        PDFJS.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    }
    PdfViewerComponent.prototype.ngOnInit = function () {
        this.setupViewer();
    };
    Object.defineProperty(PdfViewerComponent.prototype, "page", {
        set: function (_page) {
            _page = parseInt(_page, 10);
            if (this._pdf && !this.isValidPageNumber(_page)) {
                _page = 1;
            }
            if (this._page !== _page) {
                this._page = _page;
                this.pageChange.emit(_page);
            }
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
    PdfViewerComponent.prototype.setupViewer = function () {
        PDFJS.disableTextLayer = !this._renderText;
        this.setExternalLinkTarget(this._externalLinkTarget);
        this._pdfLinkService = new PDFJS.PDFLinkService();
        var pdfOptions = {
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: true,
            linkService: this._pdfLinkService
        };
        this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);
        this._pdfLinkService.setViewer(this._pdfViewer);
    };
    PdfViewerComponent.prototype.setExternalLinkTarget = function (type) {
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
    PdfViewerComponent.prototype.loadPDF = function () {
        var _this = this;
        if (!this.src) {
            return;
        }
        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }
        var src = this.src;
        PDFJS.getDocument(src).then(function (pdf) {
            _this._pdf = pdf;
            _this.lastLoaded = src;
            _this.afterLoadComplete.emit(pdf);
            _this.update();
        });
    };
    PdfViewerComponent.prototype.update = function () {
        if (this._pdfViewer) {
            this._pdfViewer.setDocument(this._pdf);
        }
        if (this._pdfLinkService) {
            this._pdfLinkService.setDocument(this._pdf, null);
        }
        this.page = this._page;
        this.render();
    };
    PdfViewerComponent.prototype.render = function () {
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
    PdfViewerComponent.prototype.updateSize = function () {
        var _this = this;
        if (!this._originalSize) {
            this._pdf.getPage(this._pdfViewer._currentPageNumber).then(function (page) {
                var scale = _this._zoom * (_this.element.nativeElement.offsetWidth / page.getViewport(1).width) / PdfViewerComponent.CSS_UNITS;
                _this._pdfViewer._setScale(scale, !_this._stickToPage);
            });
        }
        else {
            this._pdfViewer._setScale(this._zoom, !this._stickToPage);
        }
    };
    PdfViewerComponent.prototype.isValidPageNumber = function (page) {
        return this._pdf.numPages >= page && page >= 1;
    };
    PdfViewerComponent.CSS_UNITS = 96.0 / 72.0;
    PdfViewerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pdf-viewer',
                    template: "<div class=\"ng2-pdf-viewer-container\"><div id=\"viewer\" class=\"pdfViewer\"></div></div>"
                },] },
    ];
    PdfViewerComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    PdfViewerComponent.propDecorators = {
        'afterLoadComplete': [{ type: core_1.Output, args: ['after-load-complete',] },],
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
    };
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map