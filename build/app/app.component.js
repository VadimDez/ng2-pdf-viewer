System.register(['@angular/core', './../pdf-viewer/pdf-viewer.component'], function(exports_1, context_1) {
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
    var core_1, pdf_viewer_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pdf_viewer_component_1_1) {
                pdf_viewer_component_1 = pdf_viewer_component_1_1;
            }],
        execute: function() {
            // import { PdfViewerComponent } from 'pdf-viewer';
            AppComponent = (function () {
                function AppComponent() {
                    this.pdfSrc = './pdf-test.pdf';
                    this.page = 1;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer-app',
                        template: "\n    <div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button\">\n        <header class=\"mdl-layout__header\">\n            <div class=\"mdl-layout__header-row\">\n                <span class=\"mdl-layout-title\">ng2-pdf-viewer</span>\n                <div class=\"mdl-layout-spacer\"></div>\n                <nav class=\"mdl-navigation mdl-layout--large-screen-only\">\n                    <a class=\"mdl-navigation__link\" href=\"\">Link</a>\n                    <a class=\"mdl-navigation__link\" href=\"\">Link</a>\n                    <a class=\"mdl-navigation__link\" href=\"\">Link</a>\n                    <a class=\"mdl-navigation__link\" href=\"\">Link</a>\n                </nav>\n            </div>\n        </header>\n        <main class=\"mdl-layout__content\">\n            <div class=\"page-content\">\n                <div>\n                    <label>PDF src</label>\n                    <input type=\"text\" placeholder=\"PDF src\" [(ngModel)]=\"pdfSrc\">\n                </div>\n                <div>\n                    <label>Page:</label>\n                    <input type=\"number\" placeholder=\"Page\" [(ngModel)]=\"page\">\n                </div>\n\n                <pdf-viewer [src]=\"pdfSrc\" [initialPage]=\"page\" [original-size]=\"true\" style=\"display: block;\"></pdf-viewer>\n\n            </div>\n        </main>\n    </div>\n  ",
                        directives: [pdf_viewer_component_1.PdfViewerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
