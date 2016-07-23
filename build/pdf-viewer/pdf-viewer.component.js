System.register(['@angular/core', 'pdfjs-dist'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, pdfjs_dist_1;
    var PdfViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pdfjs_dist_1_1) {
                pdfjs_dist_1 = pdfjs_dist_1_1;
            }],
        execute: function() {
            PdfViewerComponent = (function () {
                function PdfViewerComponent(element) {
                    this.element = element;
                    this.originalSize = false;
                    this.showAll = true;
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
                PdfViewerComponent.prototype.fn = function () {
                    var _this = this;
                    pdfjs_dist_1.default.getDocument(this._src).then(function (pdf) {
                        _this._pdf = pdf;
                        if (!_this.isValidPageNumber(_this._page)) {
                            _this._page = 1;
                        }
                        if (!_this.showAll) {
                            return _this.renderPage(_this._page);
                        }
                        return _this.renderMultiplePages();
                    });
                };
                PdfViewerComponent.prototype.renderMultiplePages = function () {
                    var _this = this;
                    var container = this.element.nativeElement.querySelector('div');
                    this.element.nativeElement.querySelector('canvas').hidden = true;
                    var i = 1;
                    var renderPage = function (page) {
                        var viewport = page.getViewport(1);
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        if (!_this.originalSize) {
                            viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width);
                        }
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        });
                        container.appendChild(canvas);
                        if (i < _this._pdf.numPages) {
                            i++;
                            _this._pdf.getPage(i).then(renderPage);
                        }
                    };
                    this._pdf.getPage(i).then(renderPage);
                };
                PdfViewerComponent.prototype.isValidPageNumber = function (page) {
                    return this._pdf.numPages >= page && page >= 1;
                };
                PdfViewerComponent.prototype.renderPage = function (initialPage) {
                    var _this = this;
                    this._pdf.getPage(initialPage).then(function (page) {
                        var viewport = page.getViewport(1);
                        var canvas = _this.element.nativeElement.querySelector('canvas');
                        var context = canvas.getContext('2d');
                        canvas.hidden = false;
                        if (!_this.originalSize) {
                            viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width);
                        }
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        });
                    });
                };
                __decorate([
                    core_1.Input('original-size'), 
                    __metadata('design:type', Boolean)
                ], PdfViewerComponent.prototype, "originalSize", void 0);
                __decorate([
                    core_1.Input('show-all'), 
                    __metadata('design:type', Boolean)
                ], PdfViewerComponent.prototype, "showAll", void 0);
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
                PdfViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer',
                        template: '<div class="ng2-pdf-viewer-container"><canvas></canvas></div>'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PdfViewerComponent);
                return PdfViewerComponent;
            }());
            exports_1("PdfViewerComponent", PdfViewerComponent);
        }
    }
});

//# sourceMappingURL=pdf-viewer.component.js.map
