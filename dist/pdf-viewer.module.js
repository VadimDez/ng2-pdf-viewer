"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var pdf_viewer_component_1 = require('./pdf-viewer.component');
var PdfViewerModule = (function () {
    function PdfViewerModule() {
    }
    PdfViewerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [platform_browser_1.BrowserModule],
                    declarations: [pdf_viewer_component_1.PdfViewerComponent],
                    exports: [pdf_viewer_component_1.PdfViewerComponent]
                },] },
    ];
    PdfViewerModule.ctorParameters = [];
    return PdfViewerModule;
}());
exports.PdfViewerModule = PdfViewerModule;
//# sourceMappingURL=pdf-viewer.module.js.map