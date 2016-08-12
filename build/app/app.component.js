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
var pdf_viewer_component_1 = require('./../pdf-viewer/pdf-viewer.component');
var mdl_1 = require('./mdl');
var AppComponent = (function () {
    function AppComponent() {
        this.pdfSrc = './pdf-test.pdf';
        this.page = 1;
        this.originalSize = false;
        this.showAll = true;
    }
    AppComponent.prototype.incrementPage = function (amount) {
        this.page += amount;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pdf-viewer-app',
            templateUrl: './app/app.component.html',
            styleUrls: ['./app/app.component.css'],
            directives: [mdl_1.MDL, pdf_viewer_component_1.PdfViewerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
