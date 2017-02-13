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
var core_1 = require("@angular/core");
var pdf_viewer_component_1 = require("../pdf-viewer/pdf-viewer.component");
var AppComponent = (function () {
    function AppComponent() {
        this.pdfSrc = './pdf-test.pdf';
        this.page = 1;
        this.rotation = 0;
        this.zoom = 1.0;
        this.originalSize = false;
        this.renderText = true;
    }
    AppComponent.prototype.incrementPage = function (amount) {
        this.page += amount;
    };
    AppComponent.prototype.incrementZoom = function (amount) {
        this.zoom += amount;
    };
    AppComponent.prototype.rotate = function (angle) {
        this.rotation += angle;
    };
    AppComponent.prototype.onFileSelected = function () {
        var _this = this;
        var $img = document.querySelector('#file');
        if (typeof (FileReader) !== 'undefined') {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.pdfSrc = e.target.result;
            };
            reader.readAsArrayBuffer($img.files[0]);
        }
    };
    AppComponent.prototype.afterLoadComplete = function (pdf) {
        this.pdf = pdf;
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild('myPdfViewer'),
    __metadata("design:type", pdf_viewer_component_1.PdfViewerComponent)
], AppComponent.prototype, "pdfViewer", void 0);
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'pdf-viewer-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map