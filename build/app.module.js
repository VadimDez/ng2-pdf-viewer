"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app/app.component");
var mdl_1 = require("./app/mdl");
var index_1 = require("./pdf-viewer/index");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        index_1.PdfViewerModule
                    ],
                    declarations: [mdl_1.MDL, app_component_1.AppComponent],
                    bootstrap: [app_component_1.AppComponent]
                },] },
    ];
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map