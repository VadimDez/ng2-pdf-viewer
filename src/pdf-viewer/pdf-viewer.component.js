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
                function PdfViewerComponent() {
                    console.log('pdf initialized');
                    pdfjs_dist_1.default.getDocument('./pdf-test.pdf').then(function (pdf) {
                        pdf.getPage(1).then(function (page) {
                            var scale = 1;
                            var viewport = page.getViewport(scale);
                            var canvas = document.getElementById('pdf');
                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            page.render({
                                canvasContext: context,
                                viewport: viewport
                            });
                        });
                    });
                }
                PdfViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'pdf-viewer',
                        templateUrl: '/src/pdf-viewer/pdf-viewer.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PdfViewerComponent);
                return PdfViewerComponent;
            }());
            exports_1("PdfViewerComponent", PdfViewerComponent);
        }
    }
});
//# sourceMappingURL=pdf-viewer.component.js.map