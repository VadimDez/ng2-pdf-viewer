"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
require('pdfjs-dist/build/pdf.combined');
var PdfViewerComponent = (function (_super) {
    __extends(PdfViewerComponent, _super);
    function PdfViewerComponent(element) {
        _super.call(this);
        this.element = element;
        this._showAll = false;
        this._renderText = true;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this.wasInvalidPage = false;
        this._rotation = 0;
        this.isInitialised = false;
        this.pageChange = new core_1.EventEmitter(true);
    }
    PdfViewerComponent.prototype.ngOnInit = function () {
        this.main();
        this.isInitialised = true;
    };
    Object.defineProperty(PdfViewerComponent.prototype, "src", {
        set: function (_src) {
            this._src = _src;
            if (this.isInitialised) {
                this.main();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "page", {
        set: function (_page) {
            _page = parseInt(_page, 10);
            if (!this._pdf) {
                this._page = _page;
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
    Object.defineProperty(PdfViewerComponent.prototype, "renderText", {
        set: function (renderText) {
            this._renderText = renderText;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "originalSize", {
        set: function (originalSize) {
            this._originalSize = originalSize;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponent.prototype, "showAll", {
        set: function (value) {
            this._showAll = value;
            this.update();
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
            this.update();
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
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerComponent.prototype.update = function () {
        if (this._pdf) {
            this.main();
        }
    };
    PdfViewerComponent.prototype.main = function () {
        if (this._pdf && this.lastLoaded === this._src) {
            return this.onRender();
        }
        this.loadPDF(this._src);
    };
    PdfViewerComponent.prototype.loadPDF = function (src) {
        var _this = this;
        window.PDFJS.getDocument(src).then(function (pdf) {
            _this._pdf = pdf;
            _this.lastLoaded = src;
            if (_this.afterLoadComplete && typeof _this.afterLoadComplete === 'function') {
                _this.afterLoadComplete(pdf);
            }
            _this.onRender();
        });
    };
    PdfViewerComponent.prototype.onRender = function () {
        if (!this.isValidPageNumber(this._page)) {
            this._page = 1;
        }
        if (!this._showAll) {
            return this.renderPage(this._page);
        }
        this.renderMultiplePages();
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
    PdfViewerComponent.prototype.buildSVG = function (viewport, textContent) {
        var SVG_NS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(SVG_NS, 'svg:svg');
        svg.setAttribute('width', viewport.width + 'px');
        svg.setAttribute('height', viewport.height + 'px');
        svg.setAttribute('font-size', '1');
        svg.setAttribute('class', 'textLayer');
        textContent.items.forEach(function (textItem) {
            var tx = window.PDFJS.Util.transform(window.PDFJS.Util.transform(viewport.transform, textItem.transform), [1, 0, 0, -1, 0, 0]);
            var style = textContent.styles[textItem.fontName];
            var text = document.createElementNS(SVG_NS, 'svg:text');
            text.setAttribute('transform', 'matrix(' + tx.join(' ') + ')');
            text.setAttribute('style', "\n      position: absolute;\n      fill: transparent;\n      line-height: 1;\n      white-space: pre;\n      cursor: text;\n      font-family: " + textItem.fontName + ", " + style.fontFamily + ";\n      ");
            text.textContent = textItem.str;
            svg.appendChild(text);
        });
        return svg;
    };
    PdfViewerComponent.prototype.renderPageOverlay = function (page, viewport, container) {
        var _this = this;
        page.getTextContent().then(function (textContent) {
            var canvas = container.querySelectorAll('canvas')[page.pageIndex];
            canvas.parentNode.insertBefore(_this.buildSVG(viewport, textContent), canvas.nextSibling);
        });
    };
    PdfViewerComponent.prototype.renderPage = function (pageNumber) {
        var _this = this;
        return this._pdf.getPage(pageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var container = _this.element.nativeElement.querySelector('div');
            var canvas = document.createElement('canvas');
            var div = document.createElement('div');
            if (!_this._originalSize) {
                viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width, _this._rotation);
            }
            if (!_this._showAll) {
                _this.removeAllChildNodes(container);
            }
            div.appendChild(canvas);
            container.appendChild(div);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            });
            if (_this._renderText) {
                _this.renderPageOverlay(page, viewport, container);
            }
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
                    styles: ["\n.ng2-pdf-viewer--zoom {\n  overflow-x: scroll;\n}\n\n:host >>> .ng2-pdf-viewer-container > div {\n  position: relative;\n}\n\n:host >>> .textLayer {\n  position: absolute;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  font-family: sans-serif;\n  overflow: hidden;\n}\n  "]
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
        'renderText': [{ type: core_1.Input, args: ['render-text',] },],
        'originalSize': [{ type: core_1.Input, args: ['original-size',] },],
        'showAll': [{ type: core_1.Input, args: ['show-all',] },],
        'zoom': [{ type: core_1.Input, args: ['zoom',] },],
        'rotation': [{ type: core_1.Input, args: ['rotation',] },],
    };
    return PdfViewerComponent;
}(core_1.OnInit));
exports.PdfViewerComponent = PdfViewerComponent;
//# sourceMappingURL=pdf-viewer.component.js.map