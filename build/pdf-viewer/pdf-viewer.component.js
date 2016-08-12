"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('pdfjs-dist/build/pdf.combined');
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._showAll = false;
        this._originalSize = true;
        this._page = 1;
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
            if (this._pdf && this.isValidPageNumber(_page)) {
                this._page = _page;
                this.renderPage(_page);
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
    PdfViewerComponent.prototype.fn = function () {
        var _this = this;
        window.PDFJS.getDocument(this._src).then(function (pdf) {
            _this._pdf = pdf;
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
            var viewport = page.getViewport(1);
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], PdfViewerComponent.prototype, "src", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], PdfViewerComponent.prototype, "page", null);
    __decorate([
        core_1.Input('original-size'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PdfViewerComponent.prototype, "originalSize", null);
    __decorate([
        core_1.Input('show-all'), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PdfViewerComponent.prototype, "showAll", null);
    PdfViewerComponent = __decorate([
        core_1.Component({
            selector: 'pdf-viewer',
            template: '<div class="ng2-pdf-viewer-container"></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PdfViewerComponent);
    return PdfViewerComponent;
}());
exports.PdfViewerComponent = PdfViewerComponent;

//# sourceMappingURL=pdf-viewer.component.js.map
