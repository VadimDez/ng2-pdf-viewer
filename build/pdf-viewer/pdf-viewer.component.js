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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("pdfjs-dist/build/pdf.combined");
PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
var PdfViewerComponent = (function () {
    function PdfViewerComponent(element) {
        this.element = element;
        this._showAll = false;
        this._renderText = true;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._rotation = 0;
        this.afterLoadComplete = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter(true);
    }
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
    PdfViewerComponent.prototype.ngOnChanges = function (changes) {
        if ('src' in changes) {
            this.loadPDF();
        }
        else if (this._pdf) {
            this.update();
        }
    };
    PdfViewerComponent.prototype.onPageResize = function () {
        var _this = this;
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(function () {
            _this.render();
        }, 100);
    };
    PdfViewerComponent.prototype.loadPDF = function () {
        var _this = this;
        if (!this.src) {
            return;
        }
        PDFJS.getDocument(this.src)
            .then(function (pdf) {
            _this._pdf = pdf;
            _this.afterLoadComplete.emit(pdf);
            _this.update();
        }, function (error) {
            _this.onError.emit(error);
        });
    };
    PdfViewerComponent.prototype.update = function () {
        this.page = this._page;
        this.render();
    };
    PdfViewerComponent.prototype.render = function () {
        if (!this._showAll) {
            this.renderPage(this._page);
        }
        else {
            this.renderMultiplePages();
        }
    };
    PdfViewerComponent.prototype.renderMultiplePages = function () {
        var _this = this;
        var container = this.element.nativeElement.querySelector('div');
        this.removeAllChildNodes(container);
        var render = function (page) {
            _this.renderPage(page).then(function () {
                if (page < _this._pdf.numPages) {
                    render(page + 1);
                }
            });
        };
        render(1);
    };
    PdfViewerComponent.prototype.isValidPageNumber = function (page) {
        return this._pdf.numPages >= page && page >= 1;
    };
    PdfViewerComponent.prototype.renderPage = function (pageNumber) {
        var _this = this;
        return this._pdf.getPage(pageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var container = _this.element.nativeElement.querySelector('div');
            if (!_this._originalSize) {
                viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width, _this._rotation);
            }
            if (!_this._showAll) {
                _this.removeAllChildNodes(container);
            }
            return page.getOperatorList().then(function (opList) {
                var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
                return svgGfx.getSVG(opList, viewport).then(function (svg) {
                    var $div = document.createElement('div');
                    $div.classList.add('page');
                    $div.setAttribute('data-page-number', "" + page.pageNumber);
                    $div.appendChild(svg);
                    container.appendChild($div);
                });
            });
        });
    };
    PdfViewerComponent.prototype.removeAllChildNodes = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    return PdfViewerComponent;
}());
__decorate([
    core_1.Output('after-load-complete'),
    __metadata("design:type", Object)
], PdfViewerComponent.prototype, "afterLoadComplete", void 0);
__decorate([
    core_1.Output('error'),
    __metadata("design:type", Object)
], PdfViewerComponent.prototype, "onError", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PdfViewerComponent.prototype, "src", void 0);
__decorate([
    core_1.Input('page'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PdfViewerComponent.prototype, "page", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PdfViewerComponent.prototype, "pageChange", void 0);
__decorate([
    core_1.Input('render-text'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PdfViewerComponent.prototype, "renderText", null);
__decorate([
    core_1.Input('original-size'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PdfViewerComponent.prototype, "originalSize", null);
__decorate([
    core_1.Input('show-all'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], PdfViewerComponent.prototype, "showAll", null);
__decorate([
    core_1.Input('zoom'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PdfViewerComponent.prototype, "zoom", null);
__decorate([
    core_1.Input('rotation'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PdfViewerComponent.prototype, "rotation", null);
PdfViewerComponent = __decorate([
    core_1.Component({
        selector: 'pdf-viewer',
        template: "\n      <div class=\"ng2-pdf-viewer-container\"\n           [ngClass]=\"{'ng2-pdf-viewer--zoom': zoom < 1}\"\n           (window:resize)=\"onPageResize()\"\n      ></div>\n  ",
        styles: ["\n.ng2-pdf-viewer--zoom {\n  overflow-x: scroll;\n}\n\n:host >>> .ng2-pdf-viewer-container .page {\n  background-color: #fff;\n}\n  "]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], PdfViewerComponent);
exports.PdfViewerComponent = PdfViewerComponent;

//# sourceMappingURL=pdf-viewer.component.js.map
