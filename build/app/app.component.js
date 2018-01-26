"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.isLoaded = false;
        this.stickToPage = false;
        this.showAll = true;
        this.autoresize = true;
        this.fitToPage = false;
        this.isOutlineShown = false;
    }
    AppComponent.prototype.setCustomWorkerPath = function () {
        window.PDFJS.workerSrc = '/lib/pdfjs-dist/build/pdf.worker.js';
    };
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
        this.isLoaded = true;
        this.loadOutline();
    };
    AppComponent.prototype.loadOutline = function () {
        var _this = this;
        this.pdf.getOutline().then(function (outline) {
            _this.outline = outline;
        });
    };
    AppComponent.prototype.onError = function (error) {
        this.error = error;
    };
    AppComponent.prototype.onProgress = function (progressData) {
        console.log(progressData);
        this.progressData = progressData;
        this.isLoaded = false;
        this.error = null;
    };
    AppComponent.prototype.getInt = function (value) {
        return Math.round(value);
    };
    AppComponent.prototype.navigateTo = function (destination) {
        this.pdfComponent.pdfLinkService.navigateTo(destination);
    };
    AppComponent.prototype.scrollToPage = function () {
        this.pdfComponent.pdfViewer.scrollPageIntoView({
            pageNumber: 3
        });
    };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'pdf-viewer-app',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.css']
                },] },
    ];
    AppComponent.ctorParameters = function () { return []; };
    AppComponent.propDecorators = {
        'pdfComponent': [{ type: core_1.ViewChild, args: [pdf_viewer_component_1.PdfViewerComponent,] },],
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map