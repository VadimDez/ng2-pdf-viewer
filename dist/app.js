var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("src/pdf-viewer/pdf-viewer.component", ['@angular/core', 'pdfjs-dist'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                    this._initialPage = 1;
                }
                Object.defineProperty(PdfViewerComponent.prototype, "src", {
                    set: function (_src) {
                        this._src = _src;
                        this.fn();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PdfViewerComponent.prototype, "initialPage", {
                    set: function (_initialPage) {
                        this._initialPage = _initialPage;
                        if (this._pdf && this.isValidPageNumber(_initialPage)) {
                            this.renderPage(_initialPage);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                PdfViewerComponent.prototype.fn = function () {
                    var _this = this;
                    pdfjs_dist_1.default.getDocument(this._src).then(function (pdf) {
                        _this._pdf = pdf;
                        if (!_this.isValidPageNumber(_this._initialPage)) {
                            _this._initialPage = 1;
                        }
                        _this.renderPage(_this._initialPage);
                    });
                };
                PdfViewerComponent.prototype.isValidPageNumber = function (page) {
                    return this._pdf.numPages >= page && page >= 1;
                };
                PdfViewerComponent.prototype.renderPage = function (initialPage) {
                    var _this = this;
                    this._pdf.getPage(initialPage).then(function (page) {
                        var scale = 1;
                        var viewport = page.getViewport(scale);
                        var canvas = _this.element.nativeElement.querySelector('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        });
                    });
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
                ], PdfViewerComponent.prototype, "initialPage", null);
                PdfViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer',
                        templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PdfViewerComponent);
                return PdfViewerComponent;
            }());
            exports_1("PdfViewerComponent", PdfViewerComponent);
        }
    }
});
System.register("src/app/app.component", ['@angular/core', "src/pdf-viewer/pdf-viewer.component"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, pdf_viewer_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (pdf_viewer_component_1_1) {
                pdf_viewer_component_1 = pdf_viewer_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pdfSrc = '/pdf-test.pdf';
                    this.page = 1;
                }
                AppComponent = __decorate([
                    core_2.Component({
                        selector: 'pdf-viewer-app',
                        templateUrl: '/src/app/app.component.html',
                        directives: [pdf_viewer_component_1.PdfViewerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_2("AppComponent", AppComponent);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', "src/app/app.component"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var platform_browser_dynamic_1, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, []);
        }
    }
});
System.register("src/app/index", ["src/app/app.component"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[
            function (app_component_2_1) {
                exports_4({
                    "AppComponent": app_component_2_1["AppComponent"]
                });
            }],
        execute: function() {
        }
    }
});
