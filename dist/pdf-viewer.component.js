"use strict";
var core_1 = require('@angular/core');
require('pdfjs-dist/build/pdf.combined');
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._showAll = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this.wasInvalidPage = false;
        this.pageChange = new core_1.EventEmitter(true);
    }
    Object.defineProperty(PdfViewerComponent.prototype, "src", {
        set: function (_src) {
            this._src = _src;
            this.fn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "page", {
        set: function (_page) {
            _page = parseInt(_page, 10);
            if (!this._pdf) {
                return;
            }
            if (this.isValidPageNumber(_page)) {
                this._page = _page;
                this.renderPage(_page);
                this.wasInvalidPage = false;
            }
            else if (isNaN(_page)) {
                this.pageChange.emit(null);
            }
            else if (!this.wasInvalidPage) {
                this.wasInvalidPage = true;
                this.pageChange.emit(this._page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "originalSize", {
        set: function (originalSize) {
            this._originalSize = originalSize;
            if (this._pdf) {
                this.fn();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "showAll", {
        set: function (value) {
            this._showAll = value;
            if (this._pdf) {
                this.fn();
            }
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
                this.fn();
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerComponent.prototype.fn = function () {
        var _this = this;
        window.PDFJS.getDocument(this._src).then(function (pdf) {
            _this._pdf = pdf;
            if (_this.afterLoadComplete && typeof _this.afterLoadComplete === 'function') {
                _this.afterLoadComplete(pdf);
            }
            if (!_this.isValidPageNumber(_this._page)) {
                _this._page = 1;
            }
            if (!_this._showAll) {
                return _this.renderPage(_this._page);
            }
            return _this.renderMultiplePages();
        });
    };
    PdfViewerComponent.prototype.renderMultiplePages = function () {
        var _this = this;
        var container = this.element.nativeElement.querySelector('div');
        var page = 1;
        var renderPageFn = function (page) { return function () { return _this.renderPage(page); }; };
        this.removeAllChildNodes(container);
        var d = this.renderPage(page++);
        for (page; page <= this._pdf.numPages; page++) {
            d = d.then(renderPageFn(page));
        }
    };
    PdfViewerComponent.prototype.isValidPageNumber = function (page) {
        return this._pdf.numPages >= page && page >= 1;
    };
    PdfViewerComponent.prototype.renderPage = function (page) {
        var _this = this;
        return this._pdf.getPage(page).then(function (page) {
            var viewport = page.getViewport(_this._zoom);
            var container = _this.element.nativeElement.querySelector('div');
            var canvas = document.createElement('canvas');
            if (!_this._originalSize) {
                viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width);
            }
            if (!_this._showAll) {
                _this.removeAllChildNodes(container);
            }
            container.appendChild(canvas);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            });
        });
    };
    PdfViewerComponent.prototype.removeAllChildNodes = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    PdfViewerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pdf-viewer',
                    template: "<div class=\"ng2-pdf-viewer-container\" [ngClass]=\"{'ng2-pdf-viewer--zoom': zoom < 1}\"></div>",
                    styles: ["\n    .ng2-pdf-viewer--zoom {\n        overflow-x: scroll;\n    }"
                    ]
                },] },
    ];
    PdfViewerComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    PdfViewerComponent.propDecorators = {
        'afterLoadComplete': [{ type: core_1.Input, args: ['after-load-complete',] },],
        'src': [{ type: core_1.Input },],
        'page': [{ type: core_1.Input },],
        'pageChange': [{ type: core_1.Output },],
        'originalSize': [{ type: core_1.Input, args: ['original-size',] },],
        'showAll': [{ type: core_1.Input, args: ['show-all',] },],
        'zoom': [{ type: core_1.Input, args: ['zoom',] },],
    };
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map