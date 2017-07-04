"use strict";
var core_1 = require('@angular/core');
require('pdfjs-dist/build/pdf.combined');
require('pdfjs-dist/web/pdf_viewer');
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._showAll = true;
        this._renderText = true;
        this._renderLink = true;
        this._stickToPage = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._rotation = 0;
        this._enhanceTextSelection = false;
        this._pageBorder = false;
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
            if (this._pdf) {
                this.setupViewer();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "renderLink", {
        set: function (renderLink) {
            this._renderLink = renderLink;
            if (this._pdf) {
                this.setupViewer();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "originalSize", {
        set: function (originalSize) {
            this._originalSize = originalSize;
            if (this._pdf) {
                this.updateSize();
            }
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
            if (this._pdf) {
                this.updateSize();
            }
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
            if (this._pdf) {
                this.setupViewer();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "pageBorder", {
        set: function (value) {
            this._pageBorder = value;
            if (this._pdf) {
                this.setupViewer();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "enhanceTextSelection", {
        set: function (value) {
            this._enhanceTextSelection = value;
            if (this._pdf) {
                this.setupViewer();
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerComponent.prototype.setupViewer = function () {
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
        var pdfOptions = {
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
    };
    PdfViewerComponent.prototype.ngOnChanges = function (changes) {
        if ('src' in changes) {
            this.loadPDF();
        }
        else if (this._pdf) {
            this.update();
        }
    };
    PdfViewerComponent.prototype.loadPDF = function () {
        var _this = this;
        if (!this.src || !this._pdfViewer) {
            return;
        }
        PDFJS.getDocument(this.src).then(function (pdf) {
            _this._pdf = pdf;
            _this.afterLoadComplete.emit(pdf);
            _this._pdfViewer.setDocument(_this._pdf);
            if (_this._renderLink) {
                _this._pdfLinkService.setDocument(_this._pdf, null);
            }
            _this.update();
        });
    };
    PdfViewerComponent.prototype.update = function () {
        this.page = this._page;
        this.render();
    };
    PdfViewerComponent.prototype.render = function () {
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
    };
    PdfViewerComponent.prototype.updateSize = function () {
        var _this = this;
        if (!this._originalSize) {
            var containerWidth = _this.element.nativeElement.offsetWidth;
            this._pdf.getPage(this._pdfViewer._currentPageNumber).then(function (page) {
                var viewport = page.getViewport(1, _this._rotation);
                var scale = _this._zoom * (containerWidth / viewport.width) / PdfViewerComponent.CSS_UNITS;
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
                    template: "<div class=\"ng2-pdf-viewer-container\"><div id=\"viewer\" class=\"pdfViewer\"></div></div>",
                    styles: ["\n.ng2-pdf-viewer--zoom {\n  overflow-x: scroll;\n}\n\n:host >>> .ng2-pdf-viewer-container > div {\n  position: relative;\n  z-index: 0;\n}\n\n:host >>> .textLayer {\n  font-family: sans-serif;\n  overflow: hidden;\n}\n  "]
                },] },
    ];
    PdfViewerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    PdfViewerComponent.propDecorators = {
        'afterLoadComplete': [{ type: core_1.Output, args: ['after-load-complete',] },],
        'src': [{ type: core_1.Input },],
        'page': [{ type: core_1.Input, args: ['page',] },],
        'pageChange': [{ type: core_1.Output },],
        'renderText': [{ type: core_1.Input, args: ['render-text',] },],
        'renderLink': [{ type: core_1.Input, args: ['render-link',] },],
        'originalSize': [{ type: core_1.Input, args: ['original-size',] },],
        'showAll': [{ type: core_1.Input, args: ['show-all',] },],
        'stickToPage': [{ type: core_1.Input, args: ['stick-to-page',] },],
        'zoom': [{ type: core_1.Input, args: ['zoom',] },],
        'rotation': [{ type: core_1.Input, args: ['rotation',] },],
        'externalLinkTarget': [{ type: core_1.Input, args: ['external-link-target',] },],
        'pageBorder': [{ type: core_1.Input, args: ['page-border',] },],
        'enhanceTextSelection': [{ type: core_1.Input, args: ['enhance-text-selection',] },],
    };
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map
