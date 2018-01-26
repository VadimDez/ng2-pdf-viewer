"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdf_viewer_component_1 = require("./pdf-viewer.component");
var PdfViewerModule = (function () {
    function PdfViewerModule() {
    }
    PdfViewerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [pdf_viewer_component_1.PdfViewerComponent],
                    exports: [pdf_viewer_component_1.PdfViewerComponent]
                },] },
    ];
    PdfViewerModule.ctorParameters = function () { return []; };
    return PdfViewerModule;
}());
exports.PdfViewerModule = PdfViewerModule;
//# sourceMappingURL=index.js.map